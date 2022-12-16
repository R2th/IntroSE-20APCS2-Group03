Xin chào các bạn lại là tôi đây . Ở bài trước chúng ta đã triển khai Socket.io trên server. Bây giờ chúng ta sẽ tiếp tục với việc triên khai các kết nối dưới client
# Layouts
Layouts của chúng ta bao gồm hai tệp HTML cơ bản chứa chế độ xem video mà sau này sẽ hiển thị luồng video mà chúng ta đang gửi và tệp CSS cho một số kiểu cơ bản.

Tệp index.html chứa một chế độ xem video sẽ hiển thị luồng video từ  broadcaster . Import thư viện socket.io và `watch.js`

```html
<!DOCTYPE html>
<html>
<head>
	<title>Viewer</title>
	<meta charset="UTF-8" />
	<link href="/styles.css" rel="stylesheet">
</head>
<body>
<video playsinline autoplay></video>
<script src="/socket.io/socket.io.js"></script>
<script src="/watch.js"></script>
</body>
</html>
```

 Ở broadcast.html file chúng ta sẻ cấu hình như trên và thay  watch.js băng broadcast.js
```html
<!DOCTYPE html>
<html>
<head>
  <title>Broadcaster</title>
  <meta charset="UTF-8" />
  <link href="/styles.css" rel="stylesheet">
</head>
<body>
<video playsinline autoplay muted></video>
<script src="/socket.io/socket.io.js"></script>
<script src="/broadcast.js"></script>
</body>
</html>
```

Chúng ta sẻ css đơn gian cho nó

```css
html {
  overflow: hidden;
  height: 100%;
}

video {
  width: 100%;
  height: 100%;
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  object-fit: cover;
}

body {
  background-color: black;
  margin: 0;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
RT
```
# RTCPeerConnection

`RTCPeerConnections` giúp chúng ta kết nối hai máy tính nằm trong mạng cục bộ với nhau. 

Trong hướng dẫn này, chúng ta có hai phần khác nhau của kết nối. Một là `broadcaster`  có thể có nhiều kết nối `peer-to-peer` với `client`  và gửi video bằng `stream` . Cái thứ hai là máy `client` chỉ có một kết nối với đài `broadcaster` hiện tại.

# Broadcaster
Đầu tiên, chúng tôi tạo các đối tượng cấu hình cho kết nối `peer-to-peer` và máy ảnh. 

```js
const peerConnections = {};
const config = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302"]
    }
  ]
};

const socket = io.connect(window.location.origin);
const video = document.querySelector("video");

const constraints = {
  video: { facingMode: "user" }
  // audio: true,
};
```


Chúng ta sử dụng máy chủ google  chính thức cho kết nối `peer-to-peer` và  cấu hình máy ảnh của chúng ta bằng một số thuộc tính. Bạn cũng có thể bật âm thanh bằng cách bỏ bỏ comment ở trên.

Trước khi tạo kết nối `peer-to-peer`, trước tiên, chúng ta cần lấy video từ máy ảnh để có thể thêm nó vào kết nối của mình. 

```js
navigator.mediaDevices
  .getUserMedia(constraints)
  .then(stream => {
    video.srcObject = stream;
    socket.emit("broadcaster");
  })
  .catch(error => console.error(error));
```
Tiếp theo, chúng tôi sẽ tạo một `RTCPeerConnection` bằng đoạn mã sau:

```js
socket.on("watcher", id => {
  const peerConnection = new RTCPeerConnection(config);
  peerConnections[id] = peerConnection;

  let stream = video.srcObject;
  stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
    
  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      socket.emit("candidate", id, event.candidate);
    }
  };

  peerConnection
    .createOffer()
    .then(sdp => peerConnection.setLocalDescription(sdp))
    .then(() => {
      socket.emit("offer", id, peerConnection.localDescription);
    });
});

socket.on("answer", (id, description) => {
  peerConnections[id].setRemoteDescription(description);
});

socket.on("candidate", (id, candidate) => {
  peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
});
```

Chúng ta tạo một `RTCPeerConnection` mới mỗi khi một `client` mới tham gia và lưu nó trong đối tượng `peerConnections` của chúng ta.

Sau đó, chúng ta thêm luồng cục bộ vào kết nối bằng phương thức addTrack ().

Sự kiện `peerConnection.onicecandidate` được gọi khi chúng ta nhận được một client và chúng tôi gửi nó đến `server` .

Sau đó, chúng ta gửi một đề nghị kết nối đến máy khách bằng cách gọi `peerConnection.createOffer()` và chúng ta gọi `peerConnection.setLocalDescription()` để định cấu hình kết nối.

Đóng kết nối `client` ngắt kết nối là một phần quan trọng khác của ứng dụng và chúng ta có thể làm như vậy bằng cách sử dụng mã sau:

```js
socket.on("disconnectPeer", id => {
  peerConnections[id].close();
  delete peerConnections[id];
});
```
Cuối cùng, chúng ta sẽ đóng kết nối socket nếu `client` đóng cửa sổ.

```js
window.onunload = window.onbeforeunload = () => {
  socket.close();
};
```
# Watcher (Client)
`Watcher` có khá nhiều chức năng tương tự. Sự khác biệt duy nhất là  chỉ mở một kết nối ngang hàng với đài `broadcaster ` hiện tại và  nhận video thay vì phát trực tuyến.

Chúng ta cũng cần tạo cấu hình cho `RTCPeerConnection` của mình.

```js
let peerConnection;
const config = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302"]
    }
  ]
};

const socket = io.connect(window.location.origin);
const video = document.querySelector("video");
```

Sau đó, chúng ta có thể tạo `RTCPeerConnection` của mình và nhận luồng video từ `broadcaster`. 

```js
socket.on("offer", (id, description) => {
  peerConnection = new RTCPeerConnection(config);
  peerConnection
    .setRemoteDescription(description)
    .then(() => peerConnection.createAnswer())
    .then(sdp => peerConnection.setLocalDescription(sdp))
    .then(() => {
      socket.emit("answer", id, peerConnection.localDescription);
    });
  peerConnection.ontrack = event => {
    video.srcObject = event.streams[0];
  };
  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      socket.emit("candidate", id, event.candidate);
    }
  };
});
```

Sau khi kết nối được thiết lập, chúng ta có thể tiếp tục bằng cách sử dụng luồng video bằng  `ontrack` của đối tượng `peerConnection`.

Chúng ta cũng cần triển khai các chức năng vòng đời khác cho kết nối ngang hàng của chúng ta để giúp chúng ta mở và đóng các kết nối mới.

```js
socket.on("candidate", (id, candidate) => {
  peerConnection
    .addIceCandidate(new RTCIceCandidate(candidate))
    .catch(e => console.error(e));
});

socket.on("connect", () => {
  socket.emit("watcher");
});

socket.on("broadcaster", () => {
  socket.emit("watcher");
});

window.onunload = window.onbeforeunload = () => {
  socket.close();
  peerConnection.close();
};
```

# Lời kết
Tại thời điểm này, ứng dụng đã hoàn tất và bạn có thể tiếp tục thử nghiệm nó trên trình duyệt của mình.
`"Thân ái chào tạm biệt"`

# Tài Liệu Tham Khảo
- https://gabrieltanner.org/blog/webrtc-video-broadcast
- https://webrtc.org/
- https://developer.okta.com/blog/2020/10/21/webrtc-videochat-javascript