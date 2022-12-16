Callback là một khái niệm không mới. Tuy nhiên, nó là một trong những khái niệm khá lằng ngoằng và dễ nhầm lẫn trong lập trình. Mình xin giới thiệu callback trong javascript. Lý do chọn javascript là vì Callback trong javascript là đơn giản, dễ hiểu nhất. Bài viết nhắm tới đối tượng là các bạn beginner nên mình sẽ cố gắng viết đơn giản nhất có thể.
## Call back là gì

Nói một cách đơn giản: Gọi lại là một function sẽ được thực thi sau khi một function khác đã được thực thi xong - do đó nó có tên là callback(gọi lại).

Nói một cách phức tạp hơn : Trong Javascript, functions là objects,do đó nó có thể nhận tham số là function, và cũng có thể trả về một function. Vì vậy bất cứ function nào được truyền vào như một tham số và được gọi sau đó sẽ có tên là callback function.

Đó có vẻ rất nhiều từ, vậy hãy xem xét một số ví dụ để giải thích điều này một chút.

## Tại sao lại cần callbacks

Lý do rất quan trọng là bởi vì Javascript là một ngôn ngữ điều hành các sự việc,vì vậy mỗi lần thực thi thay vì chờ đợi phản hồi, Javascript vẫn sẽ tiếp tục thực thi các lệnh tiếp theo, đồng thời chờ đợi phản hồi từ các sự việc khác. Xem xét ví dụ sau:
```
function first(){
  console.log(1);
}
function second(){
  console.log(2);
}
first();
second();
```
Đúng như bạn mong muốn,function đầu tiên được thực thi đầu tiên, và function thứ hai được thực thi thứ hai. màn hình console của trình duyệt in ra kết quả là:
```
// 1
// 2
```
Tất cả đều tốt cho đến lúc bạn đặt ra câu hỏi sẽ thế nào nếu function thứ nhất chứa đoạn code mà không thể thực thi ngay tại thời điểm được gọi, ví dụ như function thứ nhất phải thực hiện API call và mất một khoảng thời gian mới nhận được kết quả phản hồi ? Để mô phỏng hành động này, ở đây tôi sẽ sử dụng setTimeout và để delay 500 mili giây. Đoạn code mới sẽ trông như sau:
```
function first(){
  // Simulate a code delay
  setTimeout( function(){
    console.log(1);
  }, 500 );
}
function second(){
  console.log(2);
}
first();
second();
```
Hiện tại quan trọng là bạn không cần quan tâm cách hàm setTimeout () hoạt động như thế nào . Hãy chú trọng đến việc chúng tôi đã thêm vào bên trong console.log (1); độ trễ 500 mili giây . Vậy điều gì sẽ xảy ra khi chúng ta gọi các hàm của mình?
```
first();
second();
// 2
// 1
```
Như các bạn thấy, mặc dù chúng ta gọi hàm first trước nhưng nó lại trả về kết quả sau hàm second.

Không phải là Javascript không thực hiện theo thứ tự mà ta mong muốn, vấn đề là Javascript sẽ không đợi function first thực hiện xong mà sẽ thực hiện luôn function second. Để đảm bảo Js thực hiện đúng thứ tự ta định sẵn, ta cần sử dụng đến khái niệm callback function. Callback là cách đảm bảo code sẽ không hoạt động trước khi các code khác hoàn thành việc thực thi.
##  Tạo một CallBack

Việc đầu tiên hãy mở Chrome Developer Console trong máy bạn ra. (Windows: Ctrl + Shift + J)(Mac: Cmd + Option + J), và nhập khai báo hàm sau vào Console.log của bạn:
```
function doHomework(subject) {
  alert(`Starting my ${subject} homework.`);
}
```
Ở trên, chúng ta đã tạo function doHomework(). Function của chúng ta có một biến, là đối tượng mà ta làm việc trên đó. Gọi function của bạn bằng cách nhập thông tin sau vào console.log :
```
doHomework('math');
// Alerts: Starting my math homework.
```
Giờ chúng ta hãy add thêm callback vào như là một tham số của function . Callback sau đó được định nghĩa là đối số thứ hai bên trong lệnh gọi function doHomework () .
```
function doHomework(subject, callback) {
  alert(`Starting my ${subject} homework.`);
  callback();
}

doHomework('math', function() {
  alert('Finished my homework');
});
```
Như bạn sẽ thấy, nếu bạn nhập code ở trên vào console.log, bạn sẽ nhận lại hai cảnh báo: cái đầu tiên là "Starting my math Homework" , tiếp theo là ‘Finished my homework’ . 

Tuy nhiên callback functions không phải lúc nào cũng phải được xác định bên trong lệnh gọi Function . Chúng có thể được định nghĩa ở nơi khác trong code của chúng ta như sau:
```
function doHomework(subject, callback) {
  alert(`Starting my ${subject} homework.`);
  callback();
}
function alertFinished(){
  alert('Finished my homework');
}
doHomework('math', alertFinished);
```
Kết quả hoàn toàn giống nhau, nhưng về thiết lập có một chút khác biệt. Như bạn thấy, chúng ta đã chuyển định nghĩa thông báo chức năng alertFinished làm đối số bên trong lệnh gọi Function doHomework () .
## Multiple Callback Functions
Bạn có thể tạo ra một hàm có nhiều calback function bằng cách tạo ra nhiều tham số và mỗi tham số là một callback function. Xem ví dụ khi xử lý ajax bằng jQuery dưới đây.
```
function successCallback() {
    // Do something
}
​
​function successCallback() {
    // Do something
}
​
​function completeCallback() {
    // Do something
}
​
​function errorCallback() {
    // Do something
}
​
$.ajax({
    url     :"google.com",
    success :successCallback,
    complete:completeCallback,
    error   :errorCallback
});
```

## Một vài lưu ý

Callback phải là một function Callback là một function nên bạn nhất định phải truyền vào là một function, nếu bạn truyền một type khác thì bạn sẽ nhận được error notice: "Callback is function" trong console.
Từ khóa this trong callback Như đã nói ở trên thì callback là một hàm bình thường nên khi sử dụng từ khóa this trong hàm thì nó sẽ hiểu this lúc này chính là đối tượng Window, nếu bạn dùng debuger trong hàm callback rồi vào console gõ this, thì sẽ được Window {external: Object, chrome: Object, result: undefined,...... Vì vậy cho dù bạn định nghĩa hàm callback nằm trong một object thì không thể truy cập đến dữ liệu của object thông qua từ khóa this.
## Kết bài

Trên đây là kiến thức cơ bản về callback mà những người làm việc với Js hay gặp gặp phải. Mong rằng nó sẽ giúp các bạn có thể hiểu được callback là gì và nó hoạt động như thế nào. Tuy nhiên nó vẫn chỉ là chút đỉnh của cả một tảng băng trôi về callback, còn rất nhiều cái để bạn suy nghĩ và tìm hiểu. Chúc các bạn thành công và may mắn!