WebRTC (Web Real-Time Communication) là một web API được phát triển bởi World Wide Web Consortium (W3C), khả năng hỗ trợ trình duyệt (browser) và các ứng dụng mobile, giao tiếp với nhau thông qua VideoCall, VoiceCall hay truuyền tải dữ liệu "Peer-to-Peer" (P2P)

Trong bài viết này chúng ta sẻ cùng nhau tìm hiểu những khái niêm cơ bản và cá tính năng của WebRTC . Để mường tượng ra được cách hoạt động của nó , chúng ta sẻ xay dựng một ứng dụng nho nhỏ sử dụng Node.js
# WebRTC basics
WebRTC cho phép chúng ta có thể giao tiếp với nhau trực tiếp với nhau thông qua internet . Được sử dụng để truyền tải video và audio dử liệu . Trước khi code chúng ta hãy cùng nhau tìm hiểu những khái niệm quan trọng của nó

### 1 ) Signaling :
WebRTC được sử dụng cho các luồng giao tiếp (Stream)  trong trình duyệt nhưng cũng cần một cơ chế để điều phối giao tiếp và gửi các thông điệp điều khiển, một quá trình được gọi là Signaling.
Signaling được sử dụng cho các nhiệm vụ sau:
- Để khởi tạo và đóng giao tiếp
- Chia sẻ cấu hình mạng (Địa chỉ IP, Cổng)
- Báo cáo lỗi trong kết nối
###  2 ) STUN và TURN servers:
STUN và TURN server được sử dụng như một phương pháp dự phòng trong trường hợp kết nối “ peer-to-peer” WebRTC gặp sự cố. STUN server được sử dụng để lấy địa chỉ IP của máy tính ,TURN server hoạt động như một bộ chuyển tiếp trong trường hợp kết nối không thành công.

Bây giờ chúng ta đã biết các khái niệm cơ bản về WebRTC, hãy tiếp tục về phần ứng dụng

###  3 ) Peer-to-peer:
> Peer connections is the part of the WebRTC specifications that deals with connecting two applications on different computers to communicate using a peer-to-peer protocol

Có thể hiểu đơn giản là một kết nối đồng hạng . Sẻ không có kết nối dửa client và server , chỉ đơn giản kết nối giửa 2 máy tính với nhau




# Signaling bằng Socket.io
Trước khi chúng ta có thể gửi phát video qua kết nối `peer-to-peer` bằng cách sử dụng WebRTC, trước tiên chúng tôi cần khởi tạo kết nối bằng phương pháp Signaling  (trong trường hợp này là Socket.IO).
```js
const express = require("express");
const app = express();

const port = 4000;

const http = require("http");
const server = http.createServer(app);

const io = require("socket.io")(server);
app.use(express.static(__dirname + "/public"));

io.sockets.on("error", e => console.log(e));
server.listen(port, () => console.log(`Server is running on port ${port}`));
```

Sau đó, chúng ta cần triển khai kết nối client và server . Id socket  được lưu vào một biến để  chúng ta biết được nơi mà client cần kết nối.

```js
let broadcaster

io.sockets.on("connection", socket => {
  socket.on("broadcaster", () => {
    broadcaster = socket.id;
    socket.broadcast.emit("broadcaster");
  });
  socket.on("watcher", () => {
    socket.to(broadcaster).emit("watcher", socket.id);
  });
  socket.on("disconnect", () => {
    socket.to(broadcaster).emit("disconnectPeer", socket.id);
  });
});

```

Sau đó, chúng ta sẽ triển khai các sự kiện socket.io để khởi tạo kết nối WebRTC. Những sự kiện này sẽ được `"watcher"`theo  dõi và `"broadcaster"` dùng để tạo `peer-to-peer`.

Ở đây chúng ta  có thể thấy có 2 channel là `"watcher"` và `"broadcaster"` . Đối với các với các client được coi là `"watcher"` sẻ lắng nghe sự kiên này và nhận được id của điểm phát (`"broadcaster"`)

```js
socket.on("offer", (id, message) => {
    socket.to(id).emit("offer", socket.id, message);
});
socket.on("answer", (id, message) => {
  socket.to(id).emit("answer", socket.id, message);
});
socket.on("candidate", (id, message) => {
  socket.to(id).emit("candidate", socket.id, message);
});
```

Đó là tất cả cho việc triển khai Socket.io trên server  bây giờ chúng tôi có thể tiếp tục với việc triên khai các kết nối dưới client . `Hẹn các bạn tiếp tục ở phần 2 "Thân ái chào tạm biệt"`

# Tài Liệu Tham Khảo
- https://gabrieltanner.org/blog/webrtc-video-broadcast
- https://webrtc.org/
- https://developer.okta.com/blog/2020/10/21/webrtc-videochat-javascript