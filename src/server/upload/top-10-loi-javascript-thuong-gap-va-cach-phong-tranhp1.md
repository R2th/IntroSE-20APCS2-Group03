![](https://images.viblo.asia/e889d7b8-22cd-447d-92ec-2b1f160ab273.png)

Chắc hẳn ai cũng biết về javascript. Và dưới đây là top 10 lỗi javascript thường gặp được [rollbar](https://rollbar.com/) thu thập với hơn 1000 project.

![](https://images.viblo.asia/ac6268f1-7f22-42d0-b33e-7381d13e72d4.png)

### 1. Uncaught TypeError: Cannot read property

Nếu bạn là developer JavaScript, có thể bạn đã nhìn thấy lỗi nhiều như cơm bữa. Điều này xảy ra khi bạn đọc thuộc tính hoặc gọi phương thức trên đối tượng chưa được xác định. Bạn có thể kiểm tra điều này rất dễ dàng trong F12 của trình duyệt.

![](https://images.viblo.asia/0d5431e7-6742-4bf3-a5ea-015d75e33eec.png)

Điều này có thể xảy ra vì nhiều lý do, nhưng một lý do phổ biến là khởi tạo không đúng trạng thái trong khi hiển thị các thành phần giao diện người dùng. Hãy xem xét một ví dụ về cách điều này có thể xảy ra trong một ứng dụng trong thực tế. Tôi sẽ chọn React, nhưng cùng một nguyên tắc khởi tạo không đúng cũng áp dụng cho Angular, Vue hoặc bất kỳ framework khác.

```
 class Quiz extends Component { 
 componentWillMount() { 
 axios.get('/thedata').then(res => { 
 this.setState({items: res.data}); 
 }); 
 } 

  render() { 
 return ( 
 <ul> 
 {this.state.items.map(item => 
 <li key={item.id}>{item.name}</li> 
 )} 
 </ul> 
 ); 
 } 
 } 
 ```
 
 Có hai điều quan trọng nhận ra ở đây:

    1. Trạng thái của một thành phần (ví dụ this.state ) bắt đầu là undefined .
    2. Khi bạn fetch data không đồng bộ, thành phần sẽ render ít nhất một lần trước khi dữ liệu được tải - bất kể nó có được gọi trong hàm hay không, componentWillMount hoặc componentDidMount . Khi Quiz hiển thị lần đầu tiên, this.state.items là không xác định. Điều này có nghĩa là ItemList nhận các mục như undefined, và bạn nhận được một lỗi - "Uncaught TypeError: Cannot read property ‘map’ of undefined" trong console. 

Điều này rất dễ sửa. Cách đơn giản nhất: Khởi tạo trạng thái với các giá trị mặc định hợp lý trong hàm.
```
 class Quiz extends Component { 
 // Added this: 
 constructor(props) { 
 super(props); 

  // Assign state itself, and a default value for items 
 this.state = { 
 items: [] 
 }; 
 } 

  componentWillMount() { 
 axios.get('/thedata').then(res => { 
 this.setState({items: res.data}); 
 }); 
 } 

  render() { 
 return ( 
 <ul> 
 {this.state.items.map(item => 
 <li key={item.id}>{item.name}</li> 
 )} 
 </ul> 
 ); 
 } 
 } 
 ```
 
 Với code thực tế trong ứng dụng của bạn có thể khác, nhưng tôi hy vọng tôi đã cung cấp cho bạn đủ đầu mối để khắc phục hoặc tránh sự cố này trong ứng dụng của bạn. Nếu không, hãy tiếp tục đọc vì tôi sẽ trình bày thêm các ví dụ về các lỗi liên quan bên dưới.
 
###  2. TypeError: ‘undefined’ is not an object

Đây là lỗi xảy ra trong Safari khi bạn đọc thuộc tính hoặc gọi phương thức trên đối tượng không xác định. Bạn có thể kiểm tra điều này rất dễ dàng trong F12 của Safari. Về cơ bản, điều này giống với lỗi trên cho Chrome, nhưng Safari sử dụng thông báo lỗi khác.

### 3. TypeError: null is not an object

Đây là lỗi xảy ra trong Safari khi bạn đọc thuộc tính hoặc gọi phương thức trên đối tượng rỗng. Bạn có thể kiểm tra điều này rất dễ dàng trong F12 của Safari.

Điều thú vị là, trong JavaScript, null và undefined không giống nhau, đó là lý do tại sao chúng ta thấy hai thông báo lỗi khác nhau. Undefined thường là một biến chưa được gán, trong khi null có nghĩa là giá trị trống. Để xác minh chúng không bằng nhau, hãy thử sử dụng toán tử '===':

Một cách mà lỗi này có thể xảy ra trong ví dụ thực tế là nếu bạn thử sử dụng phần tử DOM trong JavaScript của bạn trước khi phần tử được tải. Đó là vì DOM API trả về null cho các tham chiếu đối tượng trống.

Bất kỳ mã JS nào thực hiện và giao dịch với các phần tử DOM sẽ thực thi sau khi các phần tử DOM đã được tạo. Mã JS được diễn giải từ trên xuống dưới như được trình bày trong HTML. Vì vậy, nếu có thẻ trước phần tử DOM, mã JS trong thẻ tập lệnh sẽ thực thi khi trình duyệt phân tích cú pháp trang HTML. Bạn sẽ nhận được lỗi này nếu các phần tử DOM chưa được tạo trước khi tải tập lệnh.

Trong ví dụ này, tôi có thể giải quyết vấn đề bằng cách thêm trình xử lý sự kiện sẽ thông báo cho tôi khi trang đã sẵn sàng. Khi `addEventListener` được kích hoạt, phương thức `init()` có thể sử dụng các phần tử DOM. 

```
<script>
  function init() {
    var myButton = document.getElementById("myButton");
    var myTextfield = document.getElementById("myTextfield");
    myButton.onclick = function() {
      var userName = myTextfield.value;
    }
  }
  document.addEventListener('readystatechange', function() {
    if (document.readyState === "complete") {
      init();
    }
  });
</script>

<form>
  <input type="text" id="myTextfield" placeholder="Type your name" />
  <input type="button" id="myButton" value="Go" />
</form>
```

### 4. (unknown): Script error

Lỗi Tập lệnh xảy ra khi một lỗi JavaScript không được thực hiện vượt qua các ranh giới  của phạm chính sách gốc . Ví dụ: nếu bạn lưu trữ mã JavaScript của mình trên CDN, bất kỳ lỗi không xác định nào (các lỗi bong bóng lên trình xử lý window.onerror, thay vì bị bắt trong try-catch) sẽ được báo cáo đơn giản là "Lỗi tập lệnh" thay vì có chứa hữu ích thông tin. Đây là biện pháp bảo mật của trình duyệt nhằm ngăn chặn truyền dữ liệu trên các tên miền nếu không sẽ không được phép giao tiếp.

Để nhận được thông báo lỗi , hãy làm như sau: 

1. Gửi Access-Control-Allow-Origin header

Đặt header Access-Control-Allow-Origin thành *,   biểu thị rằng tài nguyên có thể được truy cập đúng từ bất kỳ miền nào. Bạn có thể thay thế * bằng tên miền của mình nếu cần: ví dụ: Access-Control-Allow-Origin: www.example.com . Tuy nhiên, việc xử lý nhiều tên miền trở nên phức tạp và có thể không đáng giá nếu bạn đang sử dụng CDN do các vấn đề về bộ nhớ đệm có thể phát sinh. Xem thêm [tại đây](http://stackoverflow.com/questions/1653308/access-control-allow-origin-multiple-origin-domains) .

Dưới đây là một số ví dụ về cách đặt tiêu đề này trong các môi trường khác nhau: 
**Apache**

Trong các thư mục chứa các tệp JavaScript của bạn, hãy tạo `.htaccess` với các nội dung sau:

```
 Header add Access-Control-Allow-Origin "*" 
```

**Nginx**

Thêm chỉ thị add_header vào location block phục vụ các tệp JavaScript của bạn:

```
 location ~ ^/assets/ { 
 add_header Access-Control-Allow-Origin *; 
 } 
```

**Haproxy**

Thêm phần sau vào phần phụ trợ nội dung của bạn nơi tệp JavaScript được phân phối:

```
 rspadd Access-Control-Allow-Origin:\ * 
 ```
 
 2. Đặt crossorigin = "anonymous" trên thẻ script
 Trong code HTML của bạn, đối với mỗi tập lệnh mà bạn đã đặt header Access-Control-Allow-Origin, hãy đặt crossorigin="anonymous" trên thẻ SCRIPT. Đảm bảo rằng bạn xác minh rằng header đang được gửi cho tệp script trước khi thêm thuộc tính crossorigin vào thẻ script. Trong Firefox, nếu thuộc tính crossorigin có mặt trong header  Access-Control-Allow-Origin, kịch bản trên sẽ không xảy ra.
 
###  5. TypeError: Object doesn’t support property

Đây là lỗi xảy ra trong IE khi bạn gọi một phương thức không xác định. Bạn có thể kiểm tra điều này trong F12 của IE.

![](https://images.viblo.asia/464c103d-658a-42d6-81d3-22cf78fabb4a.png)

Điều này tương đương với lỗi “TypeError: ‘undefined’ is not a function” trong Chrome. Các trình duyệt khác nhau có thể có các thông báo lỗi khác nhau cho cùng một lỗi logic.

Đây là một vấn đề phổ biến đối với IE trong các ứng dụng web sử dụng tính năng tạo namespace JavaScript. Trong trường hợp này, vấn đề là 99,9% thời gian là do IE không có khả năng ràng buộc các phương thức trong namespace hiện tại với từ khóa `this` . Ví dụ, nếu bạn có JS namespace  tên `Rollbar` với phương thức `isAwesome`. Thông thường, nếu bạn đang ở trong namespace tên `Rollbar` bạn có thể gọi phương thức `isAwesome` với cú pháp sau: 

```
this.isAwesome(); 
```

Chrome, Firefox và Opera sẽ vui vẻ chấp nhận cú pháp này. IE thì lại không. Do đó, để an toàn nhất khi sử dụng tính năng đặt tên JS là luôn luôn tiền tố với tên namespace thực tế.
```
Rollbar.isAwesome();
```

(còn tiếp)