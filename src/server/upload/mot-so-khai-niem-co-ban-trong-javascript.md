### Giới thiệu
Phần dưới đây mình sẽ giới thiệu và đưa ra các ví dụ minh họa cho các khái nhiệm rất quan trọng trong javascript, nắm vững được các khái niệm cơ bản thì sau đó khi học các framework bậc cao hơn ta sẽ dễ dàng xử lý hơn. Và khi viết bài này thì mình có 2 mục đích chính như sau:
* Chia sẻ kiến thức mà mình tìm hiểu được.
* Giúp bạn một lần kiểm tra lại kiến thức của mình, xem kiến thức của mình tới đâu.
### Scope
Phạm vi trong ngôn ngữ lập trình thể hiện mức độ truy cập và vòng đời của các biến hay tham số. Scope có thể được xác định trên globally hoặc locally. Scope là một trong những khái niệm quan trọng đối với developer vì nó sẽ giúp bạn tránh khỏi gặp bug khi đặt tên biến trùng và quản lý bộ nhớ, giá trị của biến hoặc tham số tại mỗi thời điểm hay ngữ cảnh(context) mà nó đang tham chiếu đến => viết code nhanh hơn dễ bảo trì hơn. 
Vòng đời của một biến trong javascript:
Vòng đời của một biến sẽ được bắt đầu khi nó được khai báo
Biến local sẽ bị xóa đi khi kết thúc một function
Biến global sẽ bị xóa đi khi đóng browser(hoặc tab), lưu ý là biến sẽ duy
In a web browser, global variables are deleted when you close the browser window (or tab), but remain available to new pages loaded into the same window.

Ví dụ:
```
 // example
var foo = function ( ) {
    var a = 3, b = 5;
    var bar = function ( ) {
        var b = 7, c = 11;
        // At this point, a is 3, b is 7, and c is 11
        a += b + c;
        // At this point, a is 21, b is 7, and c is 11
    };
    // At this point, a is 3, b is 5, and c is not defined
    bar( );
    // At this point, a is 21, b is 5
};
```
Trong javascript ta có thể phân loại scope ra thành 3 loại chính như sau: global scope, local scope.
* Global scope
Biến được khai báo ở ngoài function => biến toàn cục 
Các biến toàn cục  có thể được truy cập bởi tất cả các đoạn script trong webpage
```
var carName = " Volvo";

// code here can use carName

function myFunction() {

    // code here can use carName 

}
```
* Local scope
Biến local chỉ có thể được truy cập trong các function mà nó được khai báo
```
// code here can not use carName

function myFunction() {
    var carName = "Volvo";

    // code here can use carName

}
```
### Closure
Thực tế, trong javascript tất cả các function con có thể truy cập tới các biến của function cha. Ví dụ trong nested functions sẽ thể hiện tính chất mà mình vừa nói tới
```
function add() {
    var counter = 0;
    function plus() {counter += 1;}
    plus();    
    return counter; 
}
```
Kết quả trả về là 3. Tuy nhiên bây giờ mình muốn tăng biến counter bằng cách gọi hàm plus bên ngoài nested function thì sẽ làm như thế nào. Do tính chất những function ở ngoài không thể gọi vào các inner function bên trong đó như ví dụ dưới đây:
```
function add() {
    var counter = 0;
    function plus() {counter += 1;}
    return counter; 
}
plus(); //plus is not defined
```
Vậy là chúng ta phải cần đến closure

Closure có thể hiểu như một bao đóng trong bao đóng đó chứa các biến để có thể truy xuất được các biến đó cần có một function xử lý truy xuất. Miễn là function còn tồn tại thì các biến bên trong Closure sẽ không bị thu dọn, để cho function có thể truy xuất chúng bất cứ khi nào nó muốn. 
![](https://images.viblo.asia/3b356a49-a8a8-4435-a753-e9177bdeaa96.png)
Quay trở lại với bài toán counter trước thì mình sẽ thiết kế một function bên trong add để có chức năng tương tự với function plus như sau:
```
function add() {
   var counter = 0;
   return function () {return counter += 1;}
}
var plusOne =  add();
plusOne();
plusOne();
plusOne();
// Result : 3
```
Ngoài ra chúng ta còn thể nâng cao hơn bằng cách truyền tham số vào để cộng n lần mà ta mong muốn :
```
function add() {
   var counter = 0;
   return function (n) {return counter += n;}
}
var plusNumber =  add();
plusNumber(4);
// Result : 4
```

### Promises
Khi làm việc với các function asynchronous do đó chương trình sẽ nhảy bước, do đó để lấy kết quả của hàm ajax, ta phải truyền cho nó 1 callback. Sau khi hàm AJAX lấy được kết quả, nó sẽ gọi hàm callback với kết quả thu được => không có quy trình, khó khăn trong việc kiểm soát, thiếu tính chặt chẽ. Giả sử bài toán đặt ra ta cần gọi 2 API để lấy dữ liệu, và giao diện chỉ được sinh ra khi có đủ kết quả từ 2 API. Theo cách thông thường thì ta sẽ thực hiện như sau:
```
$("button").click(function() {
  $.ajax({
    url: "api_1.json", 
    success: function(result_1) {
      $.ajax({
        url: "api_2.json", 
        success: function(result_2) {
          renderView(result_1, result_2);
        }
      });
  }});
});
```
Tuy nhiên cách làm này có gì không ổn? Sử dụng callback chồng chéo sẽ làm code trở nên rối rắm, khó đọc; việc bắt exception, hiển thị lỗi trở cũng nên phức tạp. Để giải quyết vấn đề này mình sẽ giới thiệu 1 kĩ thuật đó là `promise`
Promise là một đối tượng đặc biệt dùng cho các xử lý bất đồng bộ. Nó đại diện cho một xử lý bất đồng bộ và chứa kết quả cũng như các lỗi xảy ra từ xử lý bất đồng bộ đó. Tại mỗi thời điểm Promise sẽ có thể ở một trong các trạng thái sau:
* pending: Trạng thái chờ xử lý kết thúc. Trạng thái này chính là trạng thái ban đầu của Promise, nó thể hiện rằng thao tác xử lý của ta chưa kết thúc.
* fulfilled: Trạng thái xử lý thành công. Trạng thái này thể hiện rằng thao tác xử lý của ta đã kết thúc và thành công.
* rejected: Trạng thái xử lý thất bại. Trạng thái này thể hiện thao tác xử lý đã kết thúc và thất bại.
![](https://images.viblo.asia/98f775b7-88f4-43c7-b0a8-6dd61103ca3e.png)
Mình sẽ áp dụng promise để giải quyết một bài toán thực tế như sau: xây dựng một ứng dụng để get thông tin thời tiết tại địa điểm mà mình gửi tới. Từ đầu vào là thành phố muốn kiểm tra tình hình thời tiết mình sẽ gọi lần lượt tới API để lấy thông tin cụ thể của thàn phố. Sau đó từ các thông tin đó ta sẽ gửi tiếp đến API để lấy thông tin về thời tiết của địa điểm đó ví dụ như sau:

```
function loadLocation = function(city) {
  return new Promise(function(resolve, reject) {
    $.ajax({
    url: "api_location.json",
    json:true ,
    data: city,
    success: function(response) {
      resolve(JSON.stringify(response, null, 2));
    },
    error: function(error) {
      reject(error);
    }
  });
}

function loadWeather = function(location) {
  return new Promise(function(resolve, reject) {
    $.ajax({
    url: "api_weather.json",
    json:true ,
    data: location,
    success: function(response) {
      resolve(JSON.stringify(response, null, 2));
    },
    error: function(error) {
      reject(error);
    }
  });
}

var location = loadLocation('HaNoi');
location()
    .then(function(location) {
      return loadWeather(location);
    })
    .catch(function(error) {
      console.log(error);
    })
```