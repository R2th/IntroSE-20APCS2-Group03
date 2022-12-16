# Lời nói đầu
Dạo gần gần đây mình có nhiều hứng thú với bộ môn `WebRTC` nên mình sẽ làm một vài bài tìm hiểu về WebRTC này.Bài viết trên dựa trên kiến thức hạn hẹp của bản thân mong các a/c/e góp ý thêm cho mình nhé. Nào chúng ta cũng bắt đầu .

[Tìm hiểu về WebRTC - MediaStream](#)

[Tìm hiểu về WebRTC - PeerConnection](https://viblo.asia/p/tim-hieu-ve-webrtc-peerconnection-4P856nDA5Y3)
# Nội dung
`WebRTC` là viết tắt của cụm từ `Web Real-Time Communication` rất được các lập trình viên ưa chuộng. WebRTC cho phép các trình duyệt giao tiếp với nhau theo thời gian thực .Ví dụ như: gọi điện, video, chơi game,… Ngoài ra, WebRTC là một sản phẩm của World Wide Web Consortium (W3C). Nó có khả năng hỗ trợ trình duyệt giao tiếp thời gian thực thông qua Video Call, Voice Call hay transfer data P2P(peer-to-peer), không cần đến plugin, phần mềm khác. 

Nhìn chung thì `WebRTC` có rất nhiều điều cần xem xét và nghiên cứu. Nên bài viết ngày hôm nay mình sẽ chỉ giới thiệu một trong các thành phần chính của `WebRTC`.

![](https://images.viblo.asia/4bf71183-c0a1-4d6c-bb8f-c7aff4bd5e1b.jpg)

## MediaStream APIs
Để bắt đầu một cuộc Video call, trước tiên chúng ta cần có quyền truy cập vào webcam (để thu hình video), micro (để thu audio) . Và để làm được điều này `WebRTC` cung cấp cho chúng ta  `MediaStream` API . Nó được thiết kế để dễ dàng truy cập các media stream của máy tính hoặc điện thoại chúng ta đang sử dụng . Thông thường chúng được gọi qua `navigator.mediaDevices` object . Từ object này chúng ta có thể liệt kê tất cả các thiết bị được kết nối, lắng nghe các thay đổi của thiết bị (khi thiết bị được kết nối hoặc ngắt kết nối) và sử dụng một thiết bị để truy xuất Media Stream (xem bên dưới).

```js
const constraints = {
    'video': true,
    'audio': true
}
navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
        console.log('Got MediaStream:', stream);
    })
    .catch(error => {
        console.error('Error accessing media devices.', error);
    });
```

Việc gọi function `getUserMedia` sẽ xin user (những người dùng của hệ thống) xin phép được truy cập vào camera và micro của thiết bị. 
- Nếu user cho phép thì `promise` sẽ được thông qua cùng với một `MediaStream` bao gồm cả video và audio track 
- Nếu user không cho phép thì 1 lỗi `PermissionDeniedError` sẽ được bắn ra 
- Nếu device không có phần cứng video or audio thì lỗi `NotFoundError` sẽ được bắn ra .

### 1: Querying media devices
Trong các ứng dụng phức tạp hơn hoặc các device có nhiều thiết bị media (Ví dụ như điện thoại có 2 camera là camera trước và sau chẳng hạn) . Chúng ta sẽ nhận được quyền truy cập nhiều các phần cứng và việc của chúng ta là đưa cho user chọn phần cứng thích hợp. Việc này có thể được thực hiện bằng cách sử dụng hàm `enumerateDevices()`. 

```js
function getConnectedDevices(type, callback) {
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            const filtered = devices.filter(device => device.kind === type);
            callback(filtered);
        });
}

getConnectedDevices('videoinput', cameras => console.log('Cameras found', cameras));
```

Nó sẽ trả ra một promise và đi kém với một mảng các `MediaDevicesInfo` (Mỗi object này sẽ miêu tả các thông tin của Media Device mà user cung cấp). Và từ các thông tin này chúng ta có thể đưa cho phép user chọn media device mà họ muốn sử dụng. Mỗi `MediaDevicesInfo` chứa thuộc tính có tên là `kind` có giá trị là `audioinput`, `audiooutput`, `videoinput` để định danh cho loại media device.

### 2: Lắng nghe sự thay đổi các devices.
Hầu hết các máy tính hiện tại đều hỗ trợ việc cắm nhiều thiết bị media cùng một luchs. Nó có thể là webcam thông qua USB , Micro and headphone thông qua Bluetooth hoặc thiết bị nghe nhìn cắm rời. Để support cho điều này , web app có thể lắng nghe sự thay đổi cảu các media devices. Chúng ta có thể thực hiện việc này bằng cách sử dụng event `devicechange` trong `navigator.mediaDevices` :

```js
// Updates the select element with the provided set of cameras
function updateCameraList(cameras) {
    const listElement = document.querySelector('select#availableCameras');
    listElement.innerHTML = '';
    cameras.map(camera => {
        const cameraOption = document.createElement('option');
        cameraOption.label = camera.label;
        cameraOption.value = camera.deviceId;
    }).forEach(cameraOption => listElement.add(cameraOption));
}

// Fetch an array of devices of a certain type
async function getConnectedDevices(type) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === type)
}

// Get the initial set of cameras connected
const videoCameras = getConnectedDevices('videoinput');
updateCameraList(videoCameras);

// Listen for changes to media devices and update the list accordingly
navigator.mediaDevices.addEventListener('devicechange', event => {
    const newCameraList = getConnectedDevices('video');
    updateCameraList(newCameraList);
});
```

### 3: Media constraints.
Trong một vài ứng dụng phức tạp, có thể sẽ cần các media device có nhiều đặc điểm kĩ thuật khác nhau. Object này là được xây dựng dựa trên `MediaStreamConstraints`. Object này được sử dụng như một param trong `getUserMedia()` cho phép chúng ta request các device đúng theo yêu cầu của app. 

Yêu cầu có thể rất lỏng lẻo cơ bản như là bao gồm audio và cideo hoặc rất phức tạp (device ID phải là gì hay độ phân giải của camera). Cụ thể như sau :

```js
async function getConnectedDevices(type) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === type)
}

// Open camera with at least minWidth and minHeight capabilities
async function openCamera(cameraId, minWidth, minHeight) {
    const constraints = {
        'audio': {'echoCancellation': true},
        'video': {
            'deviceId': cameraId,
            'width': {'min': minWidth},
            'height': {'min': minHeight}
            }
        }

    return await navigator.mediaDevices.getUserMedia(constraints);
}

const cameras = getConnectedDevices('videoinput');
if (cameras && cameras.length > 0) {
    // Open first available video camera with a resolution of 1280x720 pixels
    const stream = openCamera(cameras[0].deviceId, 1280, 720);
}
```

### 4: Local playback
Khi user đã cấp quyền cho chúng ta sử dụng media device, Web Browser đã được phép khởi động và sử dụng device. Khi đó chúng ta có một `MediaStream` có thể được sử dụng. Và việc của chúng ta là đưa chúng vào tag video và audio trên browser và phát nó trên browser:

```js
async function playVideoFromCamera() {
    try {
        const constraints = {'video': true, 'audio': true};
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const videoElement = document.querySelector('video#localVideo');
        videoElement.srcObject = stream;
    } catch(error) {
        console.error('Error opening video camera.', error);
    }
}
```

Phần HTML cần một video điển hình thông qua hàm `getUserMedia`. Chúng ta nên sử dụng 2 attribute : 

- `autoplay` : Để video auto được chạy mỗi khi có một luồng stream mới được add vào chính element đó
- `playsinline`: Cho phép video phát nội tuyến, thay vì chỉ ở chế độ toàn màn hình, trên một số trình duyệt dành cho thiết bị di động

Bạn cũng nên sử dụng `control = "false"` cho các luồng live strean, trừ khi người dùng có thể tạm dừng chúng:
```html
<html>
<head><title>Local video playback</video></head>
<body>
    <video id="localVideo" autoplay playsinline controls="false"/>
</body>
</html>
```

# Kết luận.
Ok, vậy là mình đã kết thúc bài tìm hiểu nho nhỏ của mình ngày hôm nay. Bài viết chắc vẫn còn những thiếu sót. Mong mọi người comment góp ý giúp mình nhé. Cám ơn mọi người đã xem hết bài viết của mình :D

# Tài liệu tham khảo
[https://webrtc.org/](https://webrtc.org/)

[https://www.tutorialspoint.com/webrtc/webrtc_architecture.htm](https://www.tutorialspoint.com/webrtc/webrtc_architecture.htm)

[https://www.youtube.com/watch?v=p2HzZkd2A40](https://www.youtube.com/watch?v=p2HzZkd2A40)