App này có chức năng video call cho 2 người (thực ra có thể cho nhiều người nhưng để đơn giản hóa ta chỉ làm 2).


**Nguyên liệu cần là**: IDE, [Easyrtc framework](https://github.com/priologic/easyrtc), Chrome.

Bạn làm theo hướng dẫn có trong link trên để setup những thứ cần thiết.

Đây là chuyện xảy ra khi bạn vào trang web: app dùng webcam để lấy video của bạn và thả vào thẻ `<video>` ; app sẽ liên tục listen để xem đang có ai vào/ra app và thực hiện hành động tương ứng; nếu trong app đang có người (ngoài bạn ra), tên người đó (dạng id) sẽ hiện ra trong 1 button, bạn nhấn vào đó để connect và 2 người bắt đầu nói chuyện.
    
Tổng cộng cần viết 2 thứ: 1 file html, 1 file javascript. Đối với demo này cần để 2 file trên vào vị trí tương ứng trong folder demos.

## Bắt tay vào làm nào

### Trong trang html nơi để connect tới user kia và hiển thị video

Bạn cần 1 tag `div` cho video, 1 tag `div` cho connection: `<div id="connectControls">, <div id="videos">`.
    
Trong  `div`  video, bạn thả vào đó 2 thẻ `<video>`, 1 cái cho bạn, 1 cái cho người kia (đây là nơi hiển thị video stream)
    
```
<div id="videos">
    <video id="selfVideo" autoplay playsinline muted="muted" volume="0" ></video>
    <video id="callerVideo" autoplay playsinline></video>
</div>
```
    
Trong `div` connection là nơi hiển thị tên của bạn và button để connect tới người kia

```
<div id="connectControls">
    <div id="iam">Not yet connected...</div>
    <br />
    <strong>Connected users:</strong>
    <div id="otherClients"></div>
</div>
```
Trong thẻ `<body>` bạn thêm thuộc tính onload ` <body onload="connect()">`
    
Vậy trang html của bạn sẽ như thế này:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="/socket.io/socket.io.js"></script>
    <script type="text/javascript" src="../easyrtc/easyrtc.js"></script>
    <script src="js/videoCallAppLogic_mywork.js"></script>
</head>
<body onload="connect()">

    <h1>Video Call</h1>

    <div id="connectControls">
        <div id="iam">Not yet connected...</div>
        <br />
        <strong>Connected users:</strong>
        <div id="otherClients"></div>
    </div>

    <div id="videos">
        <video id="selfVideo" autoplay playsinline muted="muted" volume="0" ></video>
        <video id="callerVideo" autoplay playsinline></video>
    </div>
    
</body>
</html>
```

Chú ý 2 thẻ <script> đầu tiên là cần thiết để có thể connect tới server và sử dụng framework.
    
### Trong trang javascript là nơi thực thi logic

Để những chuyện như đã nói ở đầu được xảy ra, bạn cần các function đáp ứng nhu cầu: 

**1. Xử lí video và connect tới server**
```
easyrtc.easyApp("Video_call_app", "selfVideo", ["callerVideo"], loginSuccess, loginFailure);
```
"Video_call_app" là tên app; "selfVideo" là id thẻ `<video>` của bạn, framework sẽ lấy video từ webcam của bạn và thả vào đây; ["callerVideo"] là array các id thẻ `<video>` của những người khác (trong trường hợp app này thì chỉ có 1, nhưng có thể nhiều hơn nếu muốn đồng thời gọi nhiều người); loginSuccess, loginFailure là callback function được gọi trong trường hợp tương ứng.

**2. Theo dõi người ra/vào** 
```
easyrtc.setRoomOccupantListener(convertListToButtons);
```
Bất cứ ai vào app đều được server ghi nhận, và khi sự kiện đó xảy ra, callback function convertListToButtons được gọi.

Nếu có ai đó vào app, tên người đó sẽ hiện ra trong 1 button, nhấn button đó để call.

**3. Thực hiện tác vụ call**
```
easyrtc.call(otherId, successCB, failureCB);
```
Khi function này được gọi, bạn và người ấy được connect trực tiếp với nhau P2P, video 2 bên được trao đổi.

File js hoàn chỉnh sẽ trông như thế này:
```
var selfEasyrtcid = "";

function connect() {
    easyrtc.setRoomOccupantListener(convertListToButtons);
    easyrtc.easyApp("Video_call_app", "selfVideo", ["callerVideo"], loginSuccess, loginFailure);
}

function clearConnectList() {
    var otherClientDiv = document.getElementById('otherClients');
    while (otherClientDiv.hasChildNodes()) {
        otherClientDiv.removeChild(otherClientDiv.lastChild);
    }
}

function performCall(otherId) {
    easyrtc.hangupAll();
    var successCB = function() {};
    var failureCB = function() {};
    easyrtc.call(otherId, successCB, failureCB);
}

function convertListToButtons (roomName, participants, isPrimary) {
    clearConnectList();
    var otherClientDiv = document.getElementById('otherClients');
    for(var id in participants) {
        var button = document.createElement('button');
        button.onclick = function(otherId) {
            return function() {
                performCall(otherId);
            };
        }(id);

        var label = document.createTextNode(easyrtc.idToName(id));
        button.appendChild(label);
        otherClientDiv.appendChild(button);
    }
}


function loginSuccess(easyrtcid) {
    selfEasyrtcid = easyrtcid;
    document.getElementById("iam").innerHTML = "I am " + easyrtc.cleanId(easyrtcid);
}


function loginFailure(errorCode, message) {
    easyrtc.showError(errorCode, message);
}
```

Bây giờ ứng dụng đã hoàn chỉnh, bạn hãy vào localhost:8080 và truy cập đến trang html bạn vừa viết (hãy mở 2 tab). Để connect tới user kia bạn nhấn vào tên người đó và video của người đó sẽ được hiển thị

Vậy là bạn đã build thành công 1 video call app với sự hỗ trợ của framework Easyrtc.