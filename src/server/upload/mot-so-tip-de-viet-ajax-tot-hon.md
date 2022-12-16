# Nói một chút về định nghĩa AJAX
AJAX - Asynchronous JavaScript and XML hoặc nghĩa tiếng việt là `Javascript và XML không đồng bộ`. Nó là một nhóm các công nghệ phát triển Web được sử dụng để tạo các ứng dụng Web động hay các ứng dụng giàu tính Internet (Wikipedia).

Ajax được sử dụng trong các trường hợp mà bạn không muốn tải lại trang Web có chứa gồm nhiều nội dung. Ajax được sử dụng để thực hiện tải lại một số thành phần được yêu cầu từ đó làm giảm dung lượng băng thông và thời gian nạp trang. Việc sử dụng Ajax có thể làm giảm các kết nối đến server, do các mã kịch bản và các stylesheet chỉ phải yêu cầu một lần duy nhất lại lần tải trang đầu tiên.
# Một số nhược điểm thường gặp khi viết Ajax
Cách viết thông thường để sử dụng Ajax sử dụng jQuery như sau:

```js
$.ajax({
    dataType: 'json',
    url: '/path/to/script',
    success: function(data, textStatus, jqXHR) {
        // When AJAX call is successfuly
        console.log('AJAX call successful.');
        console.log(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
        // When AJAX call has failed
        console.log('AJAX call failed.');
        console.log(textStatus + ': ' + errorThrown);
    },
    complete: function() {
        // When AJAX call is complete, will fire upon success or when error is thrown
        console.log('AJAX call completed');
    };
});
```


Trên đây là cách đơn giản nhất mà mọi người vẫn thường viết Ajax một cách đơn giản. Mặc dù đoạn code trên vẫn chạy đúng những yêu cầu. Tuy nhiên, nó có một số nhược điểm sau:

* Các hàm và sự kiện phục thuộc vào dữ liệu Ajax được trả về phải được bao bọc trong `success`. Điều này làm giảm khả năng đọc mã của bạn.
* Khó và phức tạp để đánh giá kết quả của nhiều yêu cầu Ajax. Chúng ta không thể dự đoán được bao lâu cho tất cả các yêu cầu Ajax để trả về một phản hồi.
* Từ phiên bản 1.8 trở lên, `jqXHR.success(), error() và complete()` đã chính thức ngừng sử dụng.
# Đối tượng Promises và Defferred
Đối tượng Promises và Defferred đã được triển khai trong phương thức $.ajax()

* `.done()` thay thế cho `.success()`
* `.fail()` thay thế cho `.error()`
* `.always()` thay thế cho `.complete()`
Tương ứng với đoạn code ở trên, ta có thể viết lại như sau:

```js
$.ajax({
    data: someData,
    dataType: 'json',
    url: '/path/to/script'
}).done(function(data) {
    // If successful
   console.log(data);
}).fail(function(jqXHR, textStatus, errorThrown) {
    // If fail
    console.log(textStatus + ': ' + errorThrown);
});
```
# Gán phương thức `$.ajax()`
Gán phương thức `$.ajax()` cho một biến mà bạn có thể gọi các callback promise đến. Chuỗi kết nối luôn là dấu hiệu của jQuery, cho phép một người sử dụng lại bộ chọn được lưu trong bộ nhớ cache.
```js
var ajaxCall = $.ajax({
    context: $(element),
    data: someData,
    dataType: 'json',
    url: '/path/to/script'
});

ajaxCall.done(function(data) {
    console.log(data);
});
```
Với cách viết như trên thì việc gọi `.done()` có cùng cấp với Ajax mà không cần lồng ghép phức tạp. Cách viết này cải thiện đáng kể khả năng đọc code của bạn, đặc biệt trong môi trường production nơi mà code của bạn có khả năng bị xáo trộn với nhiều callback không đồng bộ.

Nó cũng cho phép bạn chèn mã giữa chính các lần gọi Ajax và giải quyết promise, cho phép mã linh hoạt hơn.
# Gọi nhiều phương thức Ajax

Việc kết hợp các lần gọi phương thức Ajax được thực hiện dễ dàng hơn với promise. Bạn chỉ cần lắng nghe tình trạng của chúng thông qua `$.when()`.
```js
var a1 = $.ajax({...}),
    a2 = $.ajax({...});

$.when(a1, a2).done(function(r1, r2) {
    // Each returned resolve has the following structure:
    // [data, textStatus, jqXHR]
    // e.g. To access returned data, access the array at index 0
    console.log(r1[0]);
    console.log(r2[0]);
});
```
# Chuỗi phục thuộc của các yêu cầu Ajax
Một ví dụ thương gặp về việc phục thuộc của các yêu cầu Ajax là việc gọi Ajax thức 2 phụ thuộc vào kết quả trả về của lần gọi Ajax thứ nhất.
```js
var a1 = $.ajax({
             url: '/path/to/file',
             dataType: 'json'
         }),
    a2 = a1.then(function(data) {
             // .then() returns a new promise
             return $.ajax({
                 url: '/path/to/another/file',
                 dataType: 'json',
                 data: data.sessionID
             });
         });

a2.done(function(data) {
    console.log(data);
});
```
# Mô-đun hóa các yêu cầu Ajax
Một việc thường xuyên nữa là bạn có thể muốn mô-đun hóa code của bạn và ủy thác một hàm duy nhất để tạo các yêu cầu Ajax động. Bằng cách nào bạn nên gọi các phương thức Ajax cá nhân và truy cập vào promise trở lại trong trường hợp này?
Giả sử chúng ta muốn thực hiện hai hàm Ajax, về cơ bản chúng sử dụng thông số giống nhau ngoại trừ các tham số về dữ liệu và url:
```js
// Generic function to make an AJAX call
var fetchData = function(query, dataURL) {
    // Return the $.ajax promise
    return $.ajax({
        data: query,
        dataType: 'json',
        url: dataURL
    });
}

// Make AJAX calls 
// 1. Get customer order
// 2  Get customer ID
var getOrder = fetchData(
    {
        'hash': '2528ce2ed5ff3891c71a07448a3003e5',
        'email': 'john.doe@gmail.com'
    }, '/path/to/url/1'),
    getCustomerID = fetchData(
    {
        'email': 'john.doe@gmail.com'
    }, '/path/to/url/2');
    
// Use $.when to check if both AJAX calls are successful
$.when(getOrder, getCustomerID).then(function(order, customer) {
    console.log(order.data);
    console.log(customer.data);
});
```
Không còn nhận thấy sự lộn xộn trong code nữa và tuyệt vời hơn khi không phải lặp lại phương thức $.ajax().
# Xử lý mảng của các đối tượng deferred trả về
Đôi khi bạn muốn sử dụng `$.when()` trên một mảng các đối tượng deffered. Ví dụ là thực hiện một loạt các hàm gọi Ajax, và sau đó kiểm tra khi tất cả chúng được thực hiện.

Có 2 lựa chọn:

1. Xây dựng một mảng trống và sử dụng `$.each() `để thực hiện các lần gọi Ajax lặp đi lặp lại và sau đó đẩy promise trả về mảng.
2. Sử dụng` .map() `xây dựng một đối tượng chứa các promise trả về, sau đó chúng ta sử dụng `.get()` để trả về một mảng.

Và sau đó sử dụng `$.when.apply($, array)`
```js
// Let's say we have a click handler and fires off a series of AJAX request
$selector.on('click', function() {
    // Construct empty array
    var deferreds = [];
    
    // Loop using .each
    $(this).find('div').each(function() {
        var ajax = $.ajax({
            url: $(this).data('ajax-url'),
            method: 'get'
        });
        
        // Push promise to 'deferreds' array
        deferreds.push(ajax);
    });
    
    // Use .apply onto array from deferreds
    $.when.apply($, deferreds).then(function() {
        // Things to do when all is done
    });
});
```
```js
// Let's say we have a click handler and fires off a series of AJAX request
$selector.on('click', function() {
    // Map returned deferred objects
    var deferreds = $(this).find('div').map(function() {
        var ajax = $.ajax({
            url: $(this).data('ajax-url'),
            method: 'get'
        });
        
        return ajax;
    });
    
    // Use .apply onto array from deferreds
    // Remember to use .get()
    $.when.apply($, deferreds.get()).then(function() {
        // Things to do when all is done
    });
});
```
# Ghi chú cuối cùng
Những promises nói trên và các đối tượng deferred cũng có thể sử dụng cho các phương thức `$.get()` và `$.post()`. Đó làm các hàm viết tắt cơ bản được tối giản cho phương thức `$.ajax()`.

Trên đây là một số những ghi chú để bạn có thể viết và sử dụng Ajax một cách khoa học và tối ưu tốt hơn. Hãy sử dụng Ajax một cách khôn ngoan.

# Tham khảo
https://medium.com/coding-design/writing-better-ajax-8ee4a7fb95f