# Mục đích 

Trong quá trình research trong hệ sinh thái viblo nói riêng và hệ sinh thái của Việt Nam nói chung có khá ít bài nói về xử lý lỗi trong SocketIO, 
nên bài viết này của mình muốn đóng góp thêm kiến thức về SocketIO trong hệ sinh thái bài viết của viblo.
Bài viết cũng xin phép dành cho mọi người nào đã tìm hiểu về SocketIO rồi nhé.

# Server Side

### 1. Event "disconnect"
```SQL
io.on('connection', (socket) => {
  socket.on('disconnect', (reason) => {
    // ...
  });
});
```

Về phía server khi đang hoạt động có một sự cố về disconnect xảy ra thì sẽ bay vào event "disconnect" này.

Ở Event này có cung cấp cho chúng ta 1 biến reason giúp chúng ta có thể biết được nguyên nhân do đâu mà server bị "disconnect".

Chẳng hạn như: 
* "transport error " : bị ngắt kết nối bị động ví dụ như mất đường truyền.
* "server namespace disconnect" : bị ngắt kết nối chủ động ví dụ như trường hợp một socket thừa không sử dụng nữa mình muốn disconnect nó đi thì có thể dùng lệnh "socket.disconnect()" trên server và sau khi chạy qua dòng lệnh này connection sẽ bị ngắt và sẽ nhảy vào event "disconnect" này với reason "server namespace disconnect".
* "client namespace disconnect" : Khi client bị ngắt kết nối.
* "transport close" : Khi client dừng việt gửi data lên server.
* "ping timeout" : Quá thời gian Ping từ client, cái này có thể tái hiện bằng cách khi bạn giữ debug trong một thời gian dài thì server sẽ bắn ra lỗi này.


### 2. Event "disconnecting"
```SQL
io.on('connection', (socket) => {
  socket.on('disconnecting', (reason) => {
    let rooms = Object.keys(socket.rooms);
    // ...
  });
});
```

Event "disconnecting" này cũng tương tự event "disconnect" chỉ khác ở chỗ là event này chưa left room của socket đó. Tức là khi server xảy ra lỗi thì nó sẽ vào event "disconnecting" này trước. Chúng ta có thể dùng event này để biết socket bị lỗi nằm ở những room nào.

Sau khi chạy xong event "disconnecting" thì mới nhảy qua event "disconnect" ở phía trên bài viết mình vừa nói. Thì khi qua event "disconnect" này rồi socket đã left tất cả room rồi. Tuy nhiên điểm chung của 2 events này là object socket vẫn còn hoạt động. Chúng ta có thể ghi log của socket đó ở cả 2 events này.

### 3. Event "error"
```SQL
io.on('connection', (socket) => {
  socket.on('error', (error) => {
    // ...
  });
});
```

Ngoài 2 events chính ở trên thì server còn có event là "error", event này sẽ đón tất cả lỗi xảy ra và trả vào object error, chúng ta có thể ghi log lỗi tại event này. 

# Client Side

Về phí client thì có nhiều events hơn để cho chúng ta handle.

### 1. Event "disconnect"
```SQL
socket.on('disconnect', (reason) => {
  if (reason === 'io server disconnect') {
    // the disconnection was initiated by the server, you need to reconnect manually
    socket.connect();
  }
  // else the socket will automatically try to reconnect
});
```
Event này đón lỗi khi client bị disconnect với 3 reason:
* "io server disconnect" : lỗi từ phía server.
* "io client disconnect" : lỗi từ phía client.
* "ping timeout"            : lỗi time out.

### 2. Event "reconnect"
```SQL
socket.on('reconnect', (attemptNumber) => {
  // ...
});
```

Event này là kết nối lại thành công.

*attemptNumber* là số lần kết nối lại.

### 3. Event "reconnecting"
```SQL
socket.on('reconnecting', (attemptNumber) => {
  // ...
});
```

Event này là đang có một kết nối lại.

*attemptNumber* là số lần kết nối lại.
### 4. Event "reconnect_error"
```SQL
socket.on('reconnect_error', (error) => {
  // ...
});
```

Event này là bị lỗi khi kết nối lại.

*error* là object đón lỗi.
### 5. Event "reconnect_failed"
```SQL
socket.on('reconnect_failed', () => {
  // ...
});
```

Event này không thể reconect được nữa.
### 6. Event "connect_error"
```SQL
socket.on('connect_error', (error) => {
  // ...
});
```

Event này là kết nối đã bị lỗi.

*error* là object đón lỗi.

### 7. Event "connect_timeout"
```SQL
socket.on('connect_timeout', (timeout) => {
  // ...
});
```

Event này là lỗi kết nối quá lâu. Sau khi client bị lỗi này thì server sẽ nhảy vào event disconnect và disconnecting với reason là "ping timeout".
### 8. Event "error"
```SQL
socket.on('error', (error) => {
  // ...
});
```

Event này là client xảy ra lỗi.

*error* là object đón lỗi.

# Lời kết
Nhìn chung SocketIO cung cấp cho ta đẩy đủ và chi tiết những events để chúng ta có thể handle một cách cụ thể nhất. Tùy trường hợp chúng ta hãy lựa chọn events cho chuẩn để xử lý lỗi thật hiệu quả. Chúc mọi người làm việc tốt nhé :grinning::+1:.

Link tham khảo: 
https://socket.io/docs/server-api/

https://socket.io/docs/client-api