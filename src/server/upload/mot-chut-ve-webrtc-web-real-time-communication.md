Nếu ai có lỡ đọc được bài viết về sử dụng Pusher xây dựng ứng dụng trò chuyện trực tuyến của mình thì đấy chính là đồ án của mình. Và vào một ngày đẹp trời, thầy giáo hướng dẫn bảo mình thầy muốn đồ án của em có thể gọi video (boiroi). Nghĩ đến các ứng dụng gọi video như Skype hay Facebook là đã thấy mệt rồi. Trong lúc quay cuồng tìm kiếm, mình tìm ra WebRTC. Trong bài viết này, mình sẽ giới thiệu một chút về nó. Tuy nhiên, nó có rất nhiều vấn đề mình chưa hiểu rõ nên mình chủ yếu sẽ lấy ví dụ từ một trang Web mà mình tham khảo. Link bài viết mình sẽ đặt ở dưới nhé (thankyou).

**Link demo ở dưới do đặc điểm của WebRTC này hơi có vấn đề nên có thể lúc gọi được lúc không. Mình sẽ cố gắng tìm hiểu và sửa nếu có thể. (bow)**
# WebRTC định nghĩa có gì hay?
> WebRTC (Web Real-Time Communication) là một web API được phát triển bởi World Wide Web Consortium (W3C), khả năng hỗ trợ trình duyệt (browser) giao tiếp với nhau thông qua VideoCall, VoiceCall hay truuyền tải dữ liệu "Peer-to-Peer" (P2P) mà không cần browser phải cài thêm plugins hay phần mềm hỗ trợ nào từ bên ngoài.
> 
Định nghĩa của Wiki tuy ngắn nhưng ý chính thì cũng giống với những định nghĩa ở chỗ khác thôi.

Có cái thuật ngữ `"Peer-to-Peer"` nói rõ ra là `mạng ngang hàng / mạng đồng đẳng`. Một mạng đồng đẳng đúng nghĩa không có khái niệm máy chủ và máy khách, nói cách khác, tất cả các máy tham gia đều bình đẳng và được gọi là peer, là một nút mạng đóng vai trò đồng thời là máy khách và máy chủ đối với các máy khác trong mạng.
# Các khái niệm và sử dụng
WebRTC cung cấp khả năng đa phương tiện một cách mạnh mẽ cho Web, bao gồm hỗ trợ âm thanh, video, trao đổi tệp... Kết nối giữa các peer có thể được thực hiện mà không yêu cầu một trình điều khiển đặc biệt hoặc plugin nào và nó có thể thực hiện mà không cần bất kỳ máy chủ trung gian nào.

Kết nối giữa 2 peer được tạo nên và đại diện bởi interface RTCPeerConnection. Một khi kết nối được thiết lập và mở thì các luồng truyền thông (MediaStreams) hoặc kênh dữ liệu (RTCDataChannels) có thể được thêm vào kết nối.

Các luồng truyền thông có thể bao gồm một số lượng bất kỳ các track của thông tin đa phương tiện. Tracks được đại diện bởi đối tượng dựa vào interface MediaStreamTrack có thể chứa một số loại dữ liệu truyền thông bao gồm âm thanh, video, văn bản. Hầu hết các luồng bao gồm ít nhất một bản âm thanh và có thể cũng là video, cũng có thể được sử dụng để gửi và nhận đa phương tiện truyền thông trực tiếp hoặc thông tin đa phương tiện được lưu trữ.
# Xây dựng ứng dụng gọi video 2 người
Nói lý thuyết nhiều mệt ghê. Mong bạn đọc có thể hiểu hết, mình thì chưa hiểu sâu đâu. Chúng ta hãy bắt đầu xây dựng ứng dụng gọi video đơn giản giữa 2 người nhé.
## Cài đặt Firebase
Vì WebRTC dùng được trên mọi nền tảng ngôn ngữ (nó bị hạn chế bởi một số trình duyệt) nên bạn có thể sử dụng cho trang Web đuổi file HTML hay PHP.

Bạn hãy vào trang Web [Firebase](https://firebase.google.com) để đăng ký một tài khoản và chọn "Create New Project". Sau khi tạo được project xong thì chọn "Add Firebase to your web app", tại đây bạn sẽ có một đoạn mã Javascript có chứa key ứng dung. Bạn cop đoạn ý vào trang của bạn nhé.

Nó sẽ có dạng như sau:
```html
<script>
  // Initialize Firebase
  // TODO: Replace with your project's customized code snippet
  var config = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    projectId: "<PROJECT_ID>",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
  };
  firebase.initializeApp(config);
</script>
```
Bạn nhớ nhúng Javascript của Firebase vào trước đoạn cấu hình trên với nhé. Để đơn giản thì hãy dùng CDN:
`<script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js"></script>`
Bạn còn cần phải lựa chọn mục Rules để thay đổi giá trị `.read` và `.write` chuyển sang thành `true` để bất kỳ người nào cũng có thể đọc và ghi vào cơ sở dữ liệu Firebase của bạn.
# Code nào
Chúng ta hãy bắt đầu với giao diện gọi video. Giao diện này là HTML có 2 thành phần thẻ `<video></video>` chính là một cái hiện mặt mình, một cái hiện mặt của người đang gọi với bạn. Đơn giản thế này nhé:
```html
<html>
     <head>
         <script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js"></script>
         <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
     </head>
     <body onload="showMyFace()">
         <video id="yourVideo" autoplay muted></video>
         <video id="friendsVideo" autoplay></video>
         <br />
         <button onclick="showFriendsFace()" type="button" class="btn btn-primary btn-lg"><span class="glyphicon glyphicon-facetime-video" aria-hidden="true"></span> Call</button>
     </body>
</html>
```
Thêm tí CSS cho đời thêm màu hồng:
```css
video {
 background-color: #ddd;
 border-radius: 7px;
 margin: 10px 0px 0px 10px;
 width: 320px;
 height: 240px;
}
button {
 margin: 5px 0px 0px 10px !important;
 width: 654px;
}
```
Sau đây là từng dòng code:
* Cấp quyền truy cập vào thư mục gốc của cơ sở dữ liệu Firebase mà bạn đã cấu hình ở trên:
```javascript
var database = firebase.database().ref();
```
* Thêm cơ sở dữ liệu vào Firebase thông qua hàm `sendMessage`
`database.on('child_added', readMessage);`
* Tạo yourId ngẫu nhiên:
`var yourId = Math.floor(Math.random()*1000000000);`
* Khai báo máy chủ sử dụng. Hai máy chủ STUN sử dụng ở đây là của Google và Firefox, bạn cũng có thể thêm nhiều STUN khác tùy thích:
```javascript
var servers = {'iceServers': [
    {'urls': 'stun:stun.services.mozilla.com'},
    {'urls': 'stun:stun.l.google.com:19302'}
]};
```
> STUN (Session Traversal Utilities for NAT) là một giao thức mạng cho phép các máy khách tìm ra địa chỉ công khai của mình, loại NAT mà chúng đang đứng sau và cổng phía Internet được NAT gắn liền với cổng nội bộ nào đó. Thông tin này được sử dụng để thiết lập giao tiếp UDP giữa 2 host mà đều nằm sau NAT router. Giao thức STUN được định nghĩa trong RFC 5389.
* Tạo một đối tượng PeerConnection
`var pc = new RTCPeerConnection(servers);`
* Chờ đợi đối tượng ICE Candidate được tạo trên máy tính của bạn:
`pc.onicecandidate = (event => event.candidate ? sendMessage(yourId, JSON.stringify({'ice': event.candidate})) : console.log('Sent All Ice') );`
Chức năng này sẽ được gọi nhiều lần, một lần cho mỗi ICE Candidates được tạo ra. Khi một ICE Candidate được tạo ra thì hàm này sẽ biến đối tượng thành một chuỗi. Sau đó, nó gửi chuỗi này cho bạn bè của bạn thông qua Firebase. Máy tính bạn bè của bạn cũng sẽ thực hiện tương tự như trên.

Khi bạn và bạn bè của bạn nhận được một ICE Candidate dưới dạng chuỗi được gửi từ Firebase, thì đoạn mã `JSON.stringify` sẽ chuyển đổi chuỗi trở lại thành đối tượng ICE Candidate.
* Chờ đợi cho các đối tượng Offer, Answer, ICE Candidates được gửi:
`pc.onaddstream = (event => friendsVideo.srcObject = event.stream);`

Sự kiện `onaddstream` được gọi và đặt `friendsVideo.srcObject` thành đối tượng MediaStream. Thao tác này sẽ hiển thị video người kia trên máy tính của bạn và ngược lại. `friendsVideo` được gọi đến từ phần tử HTML.
* Hàm `sendMessage` thêm dữ liệu vào cơ sở dữ liệu Firebase:
```javascript
function sendMessage(senderId, data) {
    var msg = database.push({ sender: senderId, message: data });
    msg.remove();
}
```
* Hàm `showMyFace`:
```javascript
function showMyFace() {
     navigator.mediaDevices.getUserMedia({audio:true, video:true})
         .then(stream => yourVideo.srcObject = stream)
         .then(stream => pc.addStream(stream));
}
```
Khi bạn gọi đến `getUserMedia`, trình duyệt của bạn yêu cầu quyền truy cập camera. Nó sẽ trả về một đối tượng MediaStream cái mà bạn có thể đặt bằng `yourVideo.srcObject`. Đoạn này có chức năng hiển thị mặt của bạn trên chính máy tính của bạn.  Sau đó, ta cần thêm cùng một đối tượng MediaStream vào đối tượng PeerConnection của bạn. Trên máy tính đối phương thực hiện cuộc gọi cũng thực hiện tương tự. Hàm này được gọi ngay khi tải trang, vì vậy bạn sẽ thấy khuôn mặt của mình ngay khi tải trang.
* Hàm `showFriendsFace`:
```javascript
function showFriendsFace() {
     pc.createOffer()
         .then(offer => pc.setLocalDescription(offer) )
         .then(() => sendMessage(yourId, JSON.stringify({'sdp': pc.localDescription})) );
}
```
Tạo đối tượng Offer bằng cách gọi  `pc.createOffer()`. Đặt local description cho offer này bằng cách gọi `pc.setLocalDescription(offer)`. Cuối cùng gửi đối tượng Offer cho bạn của bạn bằng cách gọi `sendMessage`.
* Hàm `readMessage`:
```javascript
function readMessage(data) {
     var msg = JSON.parse(data.val().message);
     var sender = data.val().sender;
     if (sender != yourId) {
         if (msg.ice != undefined) {
             pc.addIceCandidate(new RTCIceCandidate(msg.ice));
         } else if (msg.sdp.type == "offer") {
             pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
                 .then(() => pc.createAnswer())
                 .then(answer => pc.setLocalDescription(answer))
                 .then(() => sendMessage(yourId, JSON.stringify({'sdp': pc.localDescription})));
         } else if (msg.sdp.type == "answer") {
             pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
         }
     }
};
```
Bạn của bạn có thể đọc được tin nhắn thông qua hàm `readMessage`. Với kiểu tin nhắn là `offer` thì bạn đã gửi cho bạn bè một đối tượng Offer mà bạn đã tạo. Người kia sẽ thiết lập mô tả từ xa (remote decription) của họ cho đối tượng Offer mà bạn đã gửi cho họ bằng cách gọi `pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))`. Người nhận sẽ tạo một đối tượng Answer bằng cách gọi đến `pc.createAnswer()`. Hàm này trả về một đối tượng Answer mà bạn sẽ thiết lập ở mô tả local. Người nhận làm được điều này bằng cách gọi đến `pc.setLocalDescription(answer)`. Sau đó, người nhận lấy đối tượng Answer và gửi nó cho bạn bằng cách gọi `sendMessage`.

Bởi vì kiểu của tin nhắn bây giờ đã là answer nên đoạn sau sẽ thực hiện `pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));`
# Toàn bộ code của phần gọi video
Sau một hồi viết thì loạn quá, nhìn tổng thế toàn bộ code mong mọi người sẽ hiểu hơn:
```javascript
var config = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    projectId: "<PROJECT_ID>",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
  };
  firebase.initializeApp(config);

var database = firebase.database().ref();
var yourVideo = document.getElementById("yourVideo");
var friendsVideo = document.getElementById("friendsVideo");
var yourId = Math.floor(Math.random()*1000000000);
var servers = {'iceServers': [
    {'urls': 'stun:stun.services.mozilla.com'},
    {'urls': 'stun:stun.l.google.com:19302'}
]};
var pc = new RTCPeerConnection(servers);
pc.onicecandidate = (event => event.candidate?sendMessage(yourId, JSON.stringify({'ice': event.candidate})):console.log("Sent All Ice") );
pc.onaddstream = (event => friendsVideo.srcObject = event.stream);

function sendMessage(senderId, data) {
    var msg = database.push({ sender: senderId, message: data });
    msg.remove();
}

function readMessage(data) {
     var msg = JSON.parse(data.val().message);
     var sender = data.val().sender;
     if (sender != yourId) {
         if (msg.ice != undefined) {
             pc.addIceCandidate(new RTCIceCandidate(msg.ice));
         } else if (msg.sdp.type == "offer") {
             pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
                 .then(() => pc.createAnswer())
                 .then(answer => pc.setLocalDescription(answer))
                 .then(() => sendMessage(yourId, JSON.stringify({'sdp': pc.localDescription})));
         } else if (msg.sdp.type == "answer") {
             pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
         }
     }
};

database.on('child_added', readMessage);

function showMyFace() {
     navigator.mediaDevices.getUserMedia({audio:true, video:true})
         .then(stream => yourVideo.srcObject = stream)
         .then(stream => pc.addStream(stream));
}

function showFriendsFace() {
     pc.createOffer()
         .then(offer => pc.setLocalDescription(offer) )
         .then(() => sendMessage(yourId, JSON.stringify({'sdp': pc.localDescription})) );
}

```
Mình có thử cho đoạn này lên heroku và chạy rất tốt. Link heroku: [https://hieubui-video.herokuapp.com/](https://hieubui-video.herokuapp.com/).

Tuy nhiên, một vấn đề của sử dụng đoạn mã như trên là bạn muốn gọi video thì cả 2 người tham gia đều phải truy cập vào cùng 1 đường dẫn. 

**Vì bài viết là mình sử dụng hướng dẫn từ trang Web khác. Vì vây, có đoạn nào mọi người không hiểu mong bạn đọc bỏ qua (bow)**

# Tham khảo
[https://websitebeaver.com/insanely-simple-webrtc-video-chat-using-firebase-with-codepen-demo](https://websitebeaver.com/insanely-simple-webrtc-video-chat-using-firebase-with-codepen-demo)