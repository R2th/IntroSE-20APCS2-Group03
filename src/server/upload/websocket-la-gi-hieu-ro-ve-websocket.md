# Tại sao lại cần websocket

Hiện tại, có 2 phương thức để client – server của web apps có thể giao tiếp được với nhau, đó là:

## AJAX POLLING

Phương thức này có nghĩa là client gửi request liên tục lên server để lấy data thông qua AJAX sau những khoảng thời gian nhất định. Điều này bắt buộc server phải trả data về dữ liệu, cho dù có dữ liệu mới hay không.
![](https://images.viblo.asia/f08158cb-a085-44b1-bfd9-f89c0affad0f.png)
Ví dụ cho các trường hợp này chính là tracking của google, thông thường sẽ được update sau 15’..

## AJAX LONG POLLING

Phương thức này cũng tương tự như phương thức trên, nhưng thay vì server trả về reponse cho client sau khi nhận request thì ở phương thức này, server chỉ trả về response khi có dữ liệu mới.
![](https://images.viblo.asia/00157776-1f73-4a3c-9ff0-436c2d098463.png)
Cả 2 phương thức này đều thông qua giao thức HTTP do đó sẽ bao gồm rất nhiều thông tin header (đồng nghĩa với chậm). Ngoài ra cả phương thức trên đều không hỗ trợ đồng song song giữa client server. Do đó, WebSocket ra đời để mang đến phương thức giao tiếp real time tốt hơn dành cho client – server, hỗ trợ song song – cả client và server đều có thể gửi và nhận request cùng một thời điểm.

# Giới thiệu

WebSockets hỗ trợ phương thức giao tiếp 2 chiều giữa client và server thông qua TCP (port 80 và 443). Theo phân tích từ http://websocket.org/quantum.html, WebSockets có thể giảm kích thước của HTTP header lên đến 500 – 1000 lần, giảm độ trễ của network lên đến 3 lần. Do đó, hỗ trợ tốt hơn đối với các ứng dụng web apps real – time.
![](https://images.viblo.asia/83ed5dc7-ac36-4cf3-b241-8fbdc988cc6a.png)
* [Cách sử dụng Laravel với Socket.IO](https://google.com.vn/url?q=https://topdev.vn/blog/cach-su-dung-laravel-voi-socket-io/)
* [Tuốt tuồn tuột về HTTP Polling và SSE (Server-sent event)](https://viblo.asia/p/tuot-tuon-tuot-ve-http-polling-va-sse-server-sent-event-XL6lAkzAKek)
# Đặc điểm

+ Cấu trúc: hỗ trợ chuẩn giao thức mới: ws:// cho chuẩn thông thường và wss:// cho chuẩn secure (tương tự http:// và https://)

+ Message data types: chuẩn giao tiếp là String, hiện tại đã hỗ trợ buffered arrays (xem bài về protobuf tại đây) và blobs. Vẫn chưa hỗ trợ JSON (tuy nhiên có thể serialize thành String, xem thêm seriablize tại đây)

## WebSockets API

Ở bài viết này, mình sẽ không trình bày cách để tạo một WebSockets mà sẽ giới thiệu WebSockets API (dựa trên JavaScripts API và HTML5).
## Kiểm tra trình duyệt có hỗ trợ WebSockets hay không

Việc đầu tiên cần làm khi làm việc với WebSockets trên client là kiểm tra WebSockets có được trình duyệt hỗ trợ hay không:
```
if ('WebSocket' in window){
   /* WebSocket is supported. You can proceed with your code*/
} else {
   /*WebSocket
```

## Đóng/mở WebSockets

Giả sử trình duyệt hỗ trợ WebSockets, chúng ta bắt đầu khởi tạo và mở socket.

Khởi tạo WebSockets
```
var connection = new WebSocket('ws://example.org:12345/myapp');
```
hoặc với WebSockets secure
```
var connection = new WebSocket('wss://example.org:12345/myapp');
```
Mở connection đến server
```
connection.onopen = function(){
   /*Send a small message to the console once the connection is established */
   console.log('Connection open!');
}
```
Đóng WebSockets
```
connection.onclose = function(){
   console.log('Connection closed');
}
```
hoặc
```
connection.close();
```
Ngoài ra, chúng ta cũng có thể kiểm tra trường hợp có lỗi xảy ra
```
connection.onerror = function(error){
   console.log('Error detected: ' + error);
}
```
## Gửi – nhận message

Gửi message đến server

```
var message = {
'name': 'bill murray',
'comment': 'No one will ever believe you'
};
connection.send(JSON.stringify(message));
```
Nhận message từ server
```
connection.onmessage = function(e){
   var server_message = e.data;
   console.log(server_message);
}
```