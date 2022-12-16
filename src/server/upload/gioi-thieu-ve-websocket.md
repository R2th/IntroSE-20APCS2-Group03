## WebSockets là gì?
Giao  thức WebSocket là một giao thức được sử dụng rộng rãi cho việc phát triển ứng dụng real-time.

Những phương thức trước đó để mô phỏng kết nối full-duplex được dựa trên polling, một phương thức đồng bộ mà client gửi request đến server để xem có thông tin không. Client nhận response từ server cả khi mà không có thông tin có sẵn. Polling chỉ hoạt động tốt khi khoảng thời gian message có sẵn có thể biết trước được. Trên thực tế, ở hầu hết ứng dụng real-time, tần suất xuất hiện message thường là không thể dự đoán trước. Thêm vào đó polling khiến client mở và đóng nhiều kết nối không cần thiết.

Long polling (hay Comet) là một phương thức giao tiếp phổ biến mà trong đó client mở kết nối đến server trong một giai đoạn nhất định. Nếu server không có thông tin gì, nó sẽ giữ kết nối đến khi có thông tin để trả về cho client hoặc đến khi đạt giới hạn thời gian cho kết nối đó. Về bản chất, Long polling trì hoãn sự hoàn thành của HTTP response cho đến khi server có gì đó để trả về client, kỹ thuật này thường đường gọi là hanging-GET hay pending- POST. Thực tế là việc client phải thường xuyên reconnect đến server khiến long polling không phải là một sự lựa chọn tối ưu cho các ứng dụng real-time.

Giao thức WebSocket được bao hàm ở mục Connectivity trong specification của HTML5. Nó cho phép tạo kết nối full-duplex, hai chiều giữa client và server. Nó cung cấp một cách thức để tạo những kết nối bền bỉ, độ trễ thấp để hỗ trợ giao tiếp giữa client và server. Sử dụng WebSockets, bạn có thể tạo một ứng dụng real-time đúng nghĩa như ứng dụng chat, phối hợp soạn thảo văn bản, giao dịch chứng khoán hay game online nhiều người chơi cùng lúc.

## WebSocket API
WebSocket API cho phép ứng dụng của bạn kiểm soát giao thức WebSocket và phản hồi lại với những sự kiện được trigger bởi server. Vì API là hướng sự kiện nên khi kết nối full-duplex được khởi tạo, nếu server có data để gửi về client hoặc khi resource mà ứng dụng quan tâm thay đổi state, nó lập tức gửi thông báo về phía client.

### Tạo một kết nối WebSocket
Để kết nối đến remote host, ta tạo một object WebSocket mới và truyền vào URL của endpoint đích.
```javascript
// Connecting to the server with a protocol called myProtocol
var ws = new WebSocket("ws://echo.websocket.org", "myProtocol");
```

### Handshake
Khi tạo một kết nối WebSocket, bước đầu tiên là một handshake thông qua TCP mà ở đó client và server đều đồng ý để sử dụng giao thức WebSocket.

Handshake từ phía client có dạng
```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
```

Handshake từ phía server có dạng
```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
Sec-WebSocket-Protocol: chat
```

Kết nối WebSocket được khởi tạo bằng việc nâng cấp từ giao thức HTTP sang giao thức WebSocket trong quá trình handshake giữa client và server thông qua cùng một kết nối TCP. Header **Upgrade** được bao gồm trong request nhằm thông báo cho server rằng client muốn tạo lập một kết nối WebSocket.

![](https://images.viblo.asia/a002b160-b974-435e-b705-56c6b17e0cbf.png)

Một khi được tạo lập các message WebSocket có thể được truyền đến và đi thông qua các method của WebSocket.

### WebSocket Events

Bản chất bất đồng bộ của WebSocket có nghĩa là một khi một kết nối WebSocket được mở, ứng dụng sẽ lắng nghe những sự kiện. Để bắt đầu lắng nghe các sự kiện, bạn có thể thêm hàm callback vào object WebSocket hoặc sử dụng DOM method **addEventListener()** để thêm event listener.

Object WebSocket phát đi 4 sự kiện:

**Open:** Server phản hồi lại request để mở kết nối WebSocket. Event này thông báo rằng handshake thành công và kết nối Websocket được khởi tạo. Callback của sự kiện này là **onopen**.

*websockets.js*
```javascript
// Event handler for the WebSocket connection opening
ws.onopen = function(e) {
   console.log("Connection established");
};
```

**Message:** Client nhận được data chứa trong message từ server. Callback tương ứng của sự kiện này là **onmessage**.

*websockets.js*
```javascript
// Event handler for receiving text messages
ws.onmessage = function(e) {
      console.log("Message received", e, e.data);
};
```

**Error:** Sự kiện xảy ra khi có bất kỳ lỗi nào trong kết nối WebSocket. Callback với sự kiện này là **onerror**.

*websockets.js*
```javascript
// Event handler for errors in the WebSocket object
ws.onerror = function(e) {
   console.log("WebSocket Error: " , e);
   //Custom function for handling errors
   handleErrors(e);
};
```

*Lưu ý: Lỗi cũng khiến kết nối WebSocket bị đóng.*

**Close:** Kết nối được đóng lại. Callback tương ứng với sự kiện này là **onclose**.

websockets.js
```javascript
// Event handler for closed connections
ws.onclose = function(e) {
   console.log("Connection closed", e);
};
```

### Các methods của WebSocket

WebSocket cung cấp 2 method:

**send():** method send(data) truyền data trên kết nối. Nếu vì lý do nào đó, kết nối không tồn tại hoặc bị đóng, method này sẽ trả về exception về tình trạng không hợp lệ của kết nối.
 ```javascript
// Send a text message
ws.send("This is a message using WebSockets.");
```

**close()**: Method close() dùng để đóng kết nối hiện tại. Nếu kết nối đã bị đóng từ trước đó (có thể do lỗi kết nối), nó không gây ảnh hưởng gì. Method này nhận hai argument tùy chọn: **code** (dạng số) và **reason** (dạng text)
```javascript
// Close the WebSocket connection
ws.close(1000, "Closing Connection Normally");
```

### Những thuộc tính của WebSocket object

Object WebSocket có những thuộc tính sau:

**readyState:** Đây là một thuộc tính read-only thể hiện trạng thái của kết nối với những giá trị sau:

* **0:** Kết nối đang trong tiến trình được khởi tạo
* **1:** Kết nối được khởi tạo và bạn có thể gửi message giữa client và server
* **2:** Kết nối đang trong quá trình đóng handshake
* **3:** Kết nối đã được đóng và không thể mở lại

**bufferedAmount:** Thuộc tính read-only thể hiện số lượng bytes của UTF-8 text được queued bằng method **send()**. Ví dụ dưới đây sử dụng thuộc tính này nhằm chắc chắn rằng message chỉ được gửi khi buffer chưa bị đầy.
```javascript
// 6400 max buffer size.
var THRESHOLD = 6400;

// Create a New WebSocket connection
var ws = new WebSocket("ws://echo.websocket.org");

// Listen for the opening event
ws.onopen = function () {
   // Attempt to send update every second.
   setInterval( function() {
      // Send only if the buffer is not full
      if (ws.bufferedAmount < THRESHOLD) {
     	ws.send(getApplicationState());
      }
   }, 1000);
};
```

**protocol:** Cho server biết giao thức nào client hiểu và có thể sử dụng trên WebSocket.
```javascript
// Connecting to the server with multiple protocol choices

var ws = new WebSocket("ws://echo.websocket.org", [ "protocol", "another protocol"])

echoSocket.onopen = function(e) {
   // Check the protocol chosen by the server
   console.log( ws.protocol);
}
```

Như vậy chúng ta đã cùng tìm hiểu tổng quan về WebSocket object, cách nó được khởi tạo, các sự kiện, method, thuộc tính có thể sử dụng với nó. Mong các bạn cảm thấy kiến thức này hữu ích.

## Tham khảo
[Introduction to WebSockets](https://www.linode.com/docs/development/introduction-to-websockets/#websocket-events)

[WebSockets](http://stevelacey.github.io/websocket-examples/)