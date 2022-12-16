# GIỚI THIỆU VỀ WEBSOCKETS
Trước khi đi tìm hiểu về Websockets chúng ta cùng ngẫm qua Ajax Polling và  Ajax Long Polling.

Ajax Polling và  Ajax Long Polling  là hai phương thức cho client  <->  server giao tiếp với nhau, chúng sẽ lý giải lý do tồn tại Websockets và giúp các bạn lựa chọn sử dụng tuỳ trường hợp cụ thể khi áp dụng thực tế.

### AJAX POLLING
Cơ chế của phương thức này như sau :
  Client sẽ gửi các request liên tục tới server trong mỗi khoảng thời gian xác định với mục đích cập nhật lại dữ liệu phía người dùng. Server sẽ bị bắt buộc trả về dữ liệu mong muốn ứng với mỗi nhịp request gửi đến, và cũng không quan tâm tới việc liệu có những thay đổi nào, nhiều hay ít hoặc không hề thay đổi. Tất cả dữ liệu yêu cầu được gói lại trả về Client.
 
### AJAX LONG POLLING
Phương thức này cũng tương tự như AJAX POLLING là Client vẫn sẽ gửi request đều đặn tới Server . Tuy nhiên, thay vì trả về ttoafn bộ dữ liệu ứng với mỗi request đến thì khi này , dữ liệu thay đổi được kiểm tra và sẽ chỉ response lại Client những thay đổi (nếu có) . Điều này có nghĩa Server hoàn toàn có thể bỏ qua việc phản hồi lại những request không cần thiết khi dữ liệu người dùng vẫn chính xác ở thời điểm đó.

Với cả 2 phương thức này, chúng đều sử dụng giao thức HTTP. Vì thế mà mỗi gói tin truyền đi bao gồm rất nhiều thông tin header làm tốc độ truyền tải không được tối ưu. Thêm nữa là quá trình xảy ra tuần tự, không hỗ trợ việc giao tiếp song song Client <-> Server.

Những vấn đề trên là lý do cho Websockets ra đời, mục đích là tạo ra khả năng tạo ra môi trường tiệm cận realtime tốt hơn cho giao tiếp Client <-> Server, hỗ trợ giao tiếp song song cho cả Client và Server cùng lúc.

## Websockets

### Đặc điểm :
Websockets thực hiện thông qua giao thức TCP, nó có thể giảm kích thước header của bản tin request tớí vài trăm lần so với bản tin HTTP.  Cũng vì thế mà tốc độ tuỳ trường hợp có thể tăng lên một vài lần, độ trễ thấp và dễ xử lý lỗi.
Các API được cung cấp cũng rất đơn giản , gọn gàng và dễ sử dụng.
Tuy nhiên nhược điểm là không hỗ trợ được toàn bộ các trình duyệt
- Cấu trúc : hỗ trợ chuẩn giao thức mới ws:// và wss:// (chuẩn bảo mật).
- Kiểu dữ liệu : dữ liệu cơ sở là String. Ngoài ra còn có buffer array, blobs.

### Cách sử dụng (trong javascript) :

- Kiểm tra xem môi trường ứng dụng có hỗ trợ Websocket hay không :
Phương thức webSocketSupported trả về kiểu boolean để xác định điều này :
```
function webSocketSupported() {
  return "WebSocket" in window;
}
```

 ```
 if ('WebSocket' in window){
alert('Có hỗ trợ đấy nhé');
} else {
alert('Chúng tôi không biết đây là cái gì, tôi không hỗ trợ !');
}
```

- Tạo một object theo kiểu Websockets để kết nối kèm theo đường dẫn Server của bạn :
 ```
 var  connection = new Websocket('ws://yourServer');
 
hoặc 

var  connection = new Websocket('wss://yourServer'); với dịch vụ bảo mật.
```

- Mở một kết nối tới Server đó :
 ```
 connection.onopen = function(){
alert('Kết nối thành công');
}
```

- Bắt lỗi xảy ra :
 ```
 connection.onerror = function(error){
console.log('Lỗi' + JSON.stringify(error));
alert('Đã xảy ra lỗi');
}
```
 
- Gửi request đến Server kèm theo dữ liệu :
 ```
 var data = {page : 'Viblo',
                   message : 'Hãy nhận lấy thông báo của tôi'
                 }
connection.send(JSON.stringify(data));
```

- Nhận message từ Server gửi về :
 ```
 connection.onmessage = function(e) {
console.log('data response', e.data);
}
```

- Đóng kết nối Websockets tới Server :
 ```
 connection.onclose = function() {
alert('Kết nối đã đóng lại');
}
```
hoặc đơn giản hơn là :
 ```
 connection.close();
 ```
 
 Theo 1 cách khác, chúng ta cũng có thể sử dụng addEventListener để lắng nghe các event :
  ```
 connection.addEventListener('eventName', function(event) {
 console.log(event);
 });
 // eventName : open, close, send, message...
  ```
  
  - Kiểm tra kết nối:
Object Websocket có một thuộc tính trạng thái readyState phản ánh trạng thái kết nối, chúng ta có thể tận dụng nó kết hợp cùng các hằng số của Websocket:
  ``` 
  switch (connection.readyState) {
  case WebSocket.CONNECTING:
    alert('Đang thực hiện kết nối');
    break;
  case WebSocket.OPEN:
    alert('Kết nối đang mở');
    break;
  case WebSocket.CLOSING:
    alert('Đang đóng kết nối');
    break;
  case WebSocket.CLOSED:
    alert('Kết nối đã đóng');
    break;
}
 ```
 
 *Tài liệu tham khảo : https://viblo.asia/p/hieu-hon-ve-websocket-znVGL2r0RZOe*