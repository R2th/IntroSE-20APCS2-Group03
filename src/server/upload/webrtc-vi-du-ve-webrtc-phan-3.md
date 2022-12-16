# Overview
Chúng ta sẽ phát triển ứng dụng demo WebRTC bằng NodeJS.

## Nội dung chính 
- Lấy được video từ webcam 
- Stream video với  RTCPeerConnection
- Stream data với RTCDataChannel
- Cài đặt một  signaling service để trao đổi  messages
- Kết hợp peer connection và signaling
- Chụp ảnh và chia sẻ nó qua một kênh dữ liệu (data channel)

## Các service cần cài đặt trước
-  Chrome 47 trở lên 
-  NodeJS, npm
-  Hiểu biết cơ bản về HTML, CSS và JavaScript
- Text editor 

# Stream video từ webcam
Thêm một thẻ `video` và một thẻ `script` vào file `index.html` trong thư mục chính như sau:
```
<!DOCTYPE html>
<html>

<head>

  <title>Realtime communication with WebRTC</title>

  <link rel="stylesheet" href="css/main.css" />

</head>

<body>

  <h1>Realtime communication with WebRTC</h1>

  <video autoplay></video>

  <script src="js/main.js"></script>

</body>

</html>
```` 


Thêm đoạn code sau vào file `main.js` trong thư mục `js`:
```
'use strict';

var constraints = {
  video: true
};

var video = document.querySelector('video');

function handleSuccess(stream) {
  video.srcObject = stream;
}

function handleError(error) {
  console.error('getUserMedia error: ', error);
}

navigator.mediaDevices.getUserMedia(constraints).
  then(handleSuccess).catch(handleError);
``` 
## Giải thích 
Khi  `getUserMedia` được gọi, trình duyệt sẽ yêu cầu quyền truy cập camera của người dùng. Nếu thành công, một `MediaStream` sẽ được trả về và được sử dụng  như một thẻ `media ` thông qua  thuộc tính `srcObject`: 
```
navigator.mediaDevices.getUserMedia(constraints).
  then(handleSuccess).catch(handleError);

function handleSuccess(stream) {
  video.srcObject = stream;
}
``` 

Tham số `constraints` cho phép chỉ định cái mà media sẽ  lấy (có thể là video hoặc audio)  
``` 
var constraints = {
  video: true
};
```

Có thể sử dụng `constaints` cho các options khác như `video resolution` chẳng hạn: 
``` 
const hdConstraints = {
  video: {
    width: {
      min: 1280
    },
    height: {
      min: 720
    }
  }
}
``` 
[MediaTrackConstraints specification](https://w3c.github.io/mediacapture-main/getusermedia.html#media-track-constraints) liêt kê tất cả `constraint types`. Nếu resolution  yêu cầu không được hỗ trợ bởi camera hiện tại `getUserMedia()` sẽ từ chối với một lỗi `OverconstrainedError` và người dùng sẽ không có quyền truy cập camera.

Nếu `getUserMedia()` thành công,  `video stream`  từ webcam sẽ được cài đặt làm `source` của thẻ `video`.
```
function handleSuccess(stream) {
  video.srcObject = stream;
}
``` 
Như vậy chúng ta đã biết được cách:
-  Lấy video từ webcam
-  Cài đặt media constraints.
- Hiển thị video với thẻ `video`. 
Một vài chú ý: 
Đừng quên thêm thuộc tính `autoplay` cho thẻ `video`.
Thông tin thêm về `getUserMedia() constraints` xem thêm [ở đây](https://webrtc.github.io/samples/src/content/peerconnection/constraints/)
Có thể thêm CSS cho thẻ video để  hiện video ko bị tràn màn hình:
```
video {
  max-width: 100%;
  width: 320px;
}
``` 

# Stream video với RTCPeerConnection
## RTCPeerConnection là gì?
RTCPeerConnection là một API của WebRTC call để stream video và audio và trao đổi dữ liệu.
Ví dụ này sẽ cài đặt một connection giữa 2 đối tượng RTCPeerConnection (được biết như peers) trên cùng một trang.

Thêm một thẻ video và các button điều khiển.
Trong file `index.html` thay thế thẻ `video` bằng 2 thẻ `video` mới và 3 button: 
```
<video id="localVideo" autoplay></video>
<video id="remoteVideo" autoplay></video>

<div>
  <button id="startButton">Start</button>
  <button id="callButton">Call</button>
  <button id="hangupButton">Hang Up</button>
</div>
``` 

Một thẻ `video` sẽ hiển thị stream từ `getUserMedia()` và thẻ kia sẽ hiện thị video giống hệt được stream qua RTCPeerconnection. Trong thực tế, một thẻ hiện thị `local stream` (camera của mình) , thẻ kia hiển thị `remote stream` (camera của đối tác)

## Thêm file `adapter.js shim`
Thêm một link để thêm file `adapter.js` version hiện tại vào file `index.html`:
```
<script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
``` 

Thêm thông tin về [adapter.js](https://github.com/webrtc/adapter)

File `index.html` trông như sau:
```
<!DOCTYPE html>
<html>

<head>

  <title>Realtime communication with WebRTC</title>

  <link rel="stylesheet" href="css/main.css" />

</head>

<body>

  <h1>Realtime communication with WebRTC</h1>

  <video id="localVideo" autoplay></video>
  <video id="remoteVideo" autoplay></video>

  <div>
    <button id="startButton">Start</button>
    <button id="callButton">Call</button>
    <button id="hangupButton">Hang Up</button>
  </div>

  <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
``` 

File `main.js`  như sau: 
```
'use strict';

// Set up media stream constant and parameters.

// In this codelab, you will be streaming video only: "video: true".
// Audio will not be streamed because it is set to "audio: false" by default.
const mediaStreamConstraints = {
  video: true,
};

// Set up to exchange only video.
const offerOptions = {
  offerToReceiveVideo: 1,
};

// Define initial start time of the call (defined as connection between peers).
let startTime = null;

// Define peer connections, streams and video elements.
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

let localStream;
let remoteStream;

let localPeerConnection;
let remotePeerConnection;


// Define MediaStreams callbacks.

// Sets the MediaStream as the video element src.
function gotLocalMediaStream(mediaStream) {
  localVideo.srcObject = mediaStream;
  localStream = mediaStream;
  trace('Received local stream.');
  callButton.disabled = false;  // Enable call button.
}

// Handles error by logging a message to the console.
function handleLocalMediaStreamError(error) {
  trace(`navigator.getUserMedia error: ${error.toString()}.`);
}

// Handles remote MediaStream success by adding it as the remoteVideo src.
function gotRemoteMediaStream(event) {
  const mediaStream = event.stream;
  remoteVideo.srcObject = mediaStream;
  remoteStream = mediaStream;
  trace('Remote peer connection received remote stream.');
}


// Add behavior for video streams.

// Logs a message with the id and size of a video element.
function logVideoLoaded(event) {
  const video = event.target;
  trace(`${video.id} videoWidth: ${video.videoWidth}px, ` +
        `videoHeight: ${video.videoHeight}px.`);
}

// Logs a message with the id and size of a video element.
// This event is fired when video begins streaming.
function logResizedVideo(event) {
  logVideoLoaded(event);

  if (startTime) {
    const elapsedTime = window.performance.now() - startTime;
    startTime = null;
    trace(`Setup time: ${elapsedTime.toFixed(3)}ms.`);
  }
}

localVideo.addEventListener('loadedmetadata', logVideoLoaded);
remoteVideo.addEventListener('loadedmetadata', logVideoLoaded);
remoteVideo.addEventListener('onresize', logResizedVideo);


// Define RTC peer connection behavior.

// Connects with new peer candidate.
function handleConnection(event) {
  const peerConnection = event.target;
  const iceCandidate = event.candidate;

  if (iceCandidate) {
    const newIceCandidate = new RTCIceCandidate(iceCandidate);
    const otherPeer = getOtherPeer(peerConnection);

    otherPeer.addIceCandidate(newIceCandidate)
      .then(() => {
        handleConnectionSuccess(peerConnection);
      }).catch((error) => {
        handleConnectionFailure(peerConnection, error);
      });

    trace(`${getPeerName(peerConnection)} ICE candidate:\n` +
          `${event.candidate.candidate}.`);
  }
}

// Logs that the connection succeeded.
function handleConnectionSuccess(peerConnection) {
  trace(`${getPeerName(peerConnection)} addIceCandidate success.`);
};

// Logs that the connection failed.
function handleConnectionFailure(peerConnection, error) {
  trace(`${getPeerName(peerConnection)} failed to add ICE Candidate:\n`+
        `${error.toString()}.`);
}

// Logs changes to the connection state.
function handleConnectionChange(event) {
  const peerConnection = event.target;
  console.log('ICE state change event: ', event);
  trace(`${getPeerName(peerConnection)} ICE state: ` +
        `${peerConnection.iceConnectionState}.`);
}

// Logs error when setting session description fails.
function setSessionDescriptionError(error) {
  trace(`Failed to create session description: ${error.toString()}.`);
}

// Logs success when setting session description.
function setDescriptionSuccess(peerConnection, functionName) {
  const peerName = getPeerName(peerConnection);
  trace(`${peerName} ${functionName} complete.`);
}

// Logs success when localDescription is set.
function setLocalDescriptionSuccess(peerConnection) {
  setDescriptionSuccess(peerConnection, 'setLocalDescription');
}

// Logs success when remoteDescription is set.
function setRemoteDescriptionSuccess(peerConnection) {
  setDescriptionSuccess(peerConnection, 'setRemoteDescription');
}

// Logs offer creation and sets peer connection session descriptions.
function createdOffer(description) {
  trace(`Offer from localPeerConnection:\n${description.sdp}`);

  trace('localPeerConnection setLocalDescription start.');
  localPeerConnection.setLocalDescription(description)
    .then(() => {
      setLocalDescriptionSuccess(localPeerConnection);
    }).catch(setSessionDescriptionError);

  trace('remotePeerConnection setRemoteDescription start.');
  remotePeerConnection.setRemoteDescription(description)
    .then(() => {
      setRemoteDescriptionSuccess(remotePeerConnection);
    }).catch(setSessionDescriptionError);

  trace('remotePeerConnection createAnswer start.');
  remotePeerConnection.createAnswer()
    .then(createdAnswer)
    .catch(setSessionDescriptionError);
}

// Logs answer to offer creation and sets peer connection session descriptions.
function createdAnswer(description) {
  trace(`Answer from remotePeerConnection:\n${description.sdp}.`);

  trace('remotePeerConnection setLocalDescription start.');
  remotePeerConnection.setLocalDescription(description)
    .then(() => {
      setLocalDescriptionSuccess(remotePeerConnection);
    }).catch(setSessionDescriptionError);

  trace('localPeerConnection setRemoteDescription start.');
  localPeerConnection.setRemoteDescription(description)
    .then(() => {
      setRemoteDescriptionSuccess(localPeerConnection);
    }).catch(setSessionDescriptionError);
}


// Define and add behavior to buttons.

// Define action buttons.
const startButton = document.getElementById('startButton');
const callButton = document.getElementById('callButton');
const hangupButton = document.getElementById('hangupButton');

// Set up initial action buttons status: disable call and hangup.
callButton.disabled = true;
hangupButton.disabled = true;


// Handles start button action: creates local MediaStream.
function startAction() {
  startButton.disabled = true;
  navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
    .then(gotLocalMediaStream).catch(handleLocalMediaStreamError);
  trace('Requesting local stream.');
}

// Handles call button action: creates peer connection.
function callAction() {
  callButton.disabled = true;
  hangupButton.disabled = false;

  trace('Starting call.');
  startTime = window.performance.now();

  // Get local media stream tracks.
  const videoTracks = localStream.getVideoTracks();
  const audioTracks = localStream.getAudioTracks();
  if (videoTracks.length > 0) {
    trace(`Using video device: ${videoTracks[0].label}.`);
  }
  if (audioTracks.length > 0) {
    trace(`Using audio device: ${audioTracks[0].label}.`);
  }

  const servers = null;  // Allows for RTC server configuration.

  // Create peer connections and add behavior.
  localPeerConnection = new RTCPeerConnection(servers);
  trace('Created local peer connection object localPeerConnection.');

  localPeerConnection.addEventListener('icecandidate', handleConnection);
  localPeerConnection.addEventListener(
    'iceconnectionstatechange', handleConnectionChange);

  remotePeerConnection = new RTCPeerConnection(servers);
  trace('Created remote peer connection object remotePeerConnection.');

  remotePeerConnection.addEventListener('icecandidate', handleConnection);
  remotePeerConnection.addEventListener(
    'iceconnectionstatechange', handleConnectionChange);
  remotePeerConnection.addEventListener('addstream', gotRemoteMediaStream);

  // Add local stream to connection and create offer to connect.
  localPeerConnection.addStream(localStream);
  trace('Added local stream to localPeerConnection.');

  trace('localPeerConnection createOffer start.');
  localPeerConnection.createOffer(offerOptions)
    .then(createdOffer).catch(setSessionDescriptionError);
}

// Handles hangup action: ends up call, closes connections and resets peers.
function hangupAction() {
  localPeerConnection.close();
  remotePeerConnection.close();
  localPeerConnection = null;
  remotePeerConnection = null;
  hangupButton.disabled = true;
  callButton.disabled = false;
  trace('Ending call.');
}

// Add click event handlers for buttons.
startButton.addEventListener('click', startAction);
callButton.addEventListener('click', callAction);
hangupButton.addEventListener('click', hangupAction);


// Define helper functions.

// Gets the "other" peer connection.
function getOtherPeer(peerConnection) {
  return (peerConnection === localPeerConnection) ?
      remotePeerConnection : localPeerConnection;
}

// Gets the name of a certain peer connection.
function getPeerName(peerConnection) {
  return (peerConnection === localPeerConnection) ?
      'localPeerConnection' : 'remotePeerConnection';
}

// Logs an action (text) and the time when it happened on the console.
function trace(text) {
  text = text.trim();
  const now = (window.performance.now() / 1000).toFixed(3);

  console.log(now, text);
}
``` 

## Tạo một cuộc gọi
Mở file `index.html`, click button `Start` để get video từ webcam và click `Call` to tạo một `peer connection`. Chúng ta sẽ thấy 2 video giống nhau.
WebRTC sử dụng RTCPeerConnection API to cài đặt một connection to stream video giữa các WebRTC clients được biết như `peers`.
Trong ví dụ này, 2 RTCPeerConnection object ở cùng 1 trang: pc1 và pc2

Cài đặt một cuộc gọi giữa 2 WebRTC peers bao gồm 3 bước sau:
- Tạo một RTCPeerConnection cho mỗi client và  thêm `local stream` từ getUserMedia()`.
- Lấy và chia sẻ thông tin `potential connection endpoint` được biết như là `ICE candidate`
- Lấy và chia sẻ local và remote description, metadata về local media in SDP format

Tưởng tượng rằng Alice và Bob muốn sử dụng RTCPeerConnection để cài đặt một cuộc gọi video:
Đầu tiên, Alice và Bob trao đổi  các thông tin về network. `finding candidates` chính là quá trình tìm kiếm `network interface` và `port` sử dụng ICE framework.

1. Alice tạo một `RTCPeerConnection object` với một `onicecandidate handler`: 
```
pc1 = new RTCPeerConnection(servers);
trace('Created local peer connection object pc1');
pc1.onicecandidate = function(e) {
  onIceCandidate(pc1, e);
};
``` 
2. Alice gọi getUserMedia() và thêm `stream` thông qua:
```
pc1.addStream(localStream);
```
3. Đối tượng `onicecandidate handler` từ bước 1 được gọi khi `network candidates`  available. 
4. Alice gửi dữ liệu candidate đã được mã hóa cho Bob. Trên thực tế , quá trình này (được biết  như là signaling) xảy ra thông quá một tin nhắn dịch vụ (messaging service). Ở đây 2 RTCPeerConnection object trên cùng một page nên nó có thể kết nối trực tiếp mà không cần một external messaging service.
5. When Bob nhận được một `candidate message` từ Alice, anh ấy sẽ gọi `addIceCandidate()` để thêm candidate vào remote peer description: 
``` 
function onIceCandidate(pc, event) {
  if (event.candidate) {
    getOtherPc(pc).addIceCandidate(
      new RTCIceCandidate(event.candidate)
    ).then(
      function() {
        onAddIceCandidateSuccess(pc);
      },
      function(err) {
        onAddIceCandidateError(pc, err);
      }
    );
    trace(getName(pc) + ' ICE candidate: \n' + event.candidate.candidate);
  }
}
``` 
WebRTC peers cũng cần tìm và trao đổi  thông tin local và remote audio và video media như resolution, dung lượng codec.  Signaling trao đổi thông tin media configuration  bởi trao đổi metadata được gọi là một `offer` và một `answer` sử dụng `Session Description Protocol` format, gọi tắt là SDP

Alice run phương thức  `RTCPeerConnection createOffer()` . Promise trả về một  `RTCSessionDescription` (Alice's local session description):

```
pc1.createOffer(
    offerOptions
  ).then(
    onCreateOfferSuccess,
    onCreateSessionDescriptionError
  );
``` 
2. Nếu thành công, Alice sẽ set một `local description` sử dụng  `setLocalDescription()`  và sau đó gửi  `session description` này tới  Bob thông qua  `signaling channel`.
3. Bob sẽ set `description` mà Alice đã gửi như một  `remote description`  sử dụng  `setRemoteDescription()`.
4. Bob run phương thức  `RTCPeerConnection createAnswer()`,  truyền tham số là `remote description`  mà nhận được từ Alice, Sau đó một `local session`  thích hợp được sinh ra. `createAnswer() promise`   truyền một `RTCSessionDescription` : Bob sets nó như ` local description` và gửi nó cho Alice.
5. Khi Alice nhận  session description của Bob, cô ấy set   nó như một `remote description`  với phương thức `setRemoteDescription()`.
 ```
function onCreateOfferSuccess(desc) {
  pc1.setLocalDescription(desc).then(
    function() {
      onSetLocalSuccess(pc1);
    },
    onSetSessionDescriptionError
  );
  pc2.setRemoteDescription(desc).then(
    function() {
      onSetRemoteSuccess(pc2);
    },
    onSetSessionDescriptionError
  );
  // Since the 'remote' side has no media stream you need
  // to pass in the right constraints in order for it to
  // accept the incoming offer of audio and video.
  pc2.createAnswer().then(
    onCreateAnswerSuccess,
    onCreateSessionDescriptionError
  );
}

function onCreateAnswerSuccess(desc) {
  pc2.setLocalDescription(desc).then(
    function() {
      onSetLocalSuccess(pc2);
    },
    onSetSessionDescriptionError
  );
  pc1.setRemoteDescription(desc).then(
    function() {
      onSetRemoteSuccess(pc1);
    },
    onSetSessionDescriptionError
  );
}
``` 
Như vậy chúng ta đã hiểu rõ các bước kết nối và thiết lập các kết nối peer trong WebRTC. Phần sau mình sẽ giới thiệu  cách stream qua  ` RTCDataChannel`.