![](https://images.viblo.asia/4bf71183-c0a1-4d6c-bb8f-c7aff4bd5e1b.jpg)
# Lời nói đầu
Dạo gần gần đây mình có nhiều hứng thú với bộ môn WebRTC nên mình sẽ làm một vài bài tìm hiểu về WebRTC này.Bài viết trên dựa trên kiến thức hạn hẹp của bản thân mong các a/c/e góp ý thêm cho mình nhé. Nào chúng ta cũng bắt đầu .

[Tìm hiểu về WebRTC - MediaStream](https://viblo.asia/p/tim-hieu-ve-webrtc-mediastream-Az45b4zzZxY)

[Tìm hiểu về WebRTC - PeerConnection](#)
# Nội dung
`PeerConnection` là một phần của trong công nghệ `WebRTC` . Nó có chức năng tạo ra kết nối hai máy tính khác nhau thông qua giao thức `peer-to-peer` (ngang hàng). Chúng ta có thể truyền dữ liệu dạng video, audio hoặc binany data bất kì (thông qua `RTCDataChannel`). Để có thể kết nối 2 máy tính với nhau thì chúng cần cung cấp thông tin về cấu hình ICE Server (Interactive Connectivity Establishment) . Nó bao  một gồm `STUN` và `TURN` server và trách nhiệm của các server này là cung cấp các  `ICE candidates` cho các máy tính khi truyền dữ liệu từ peer gốc cho đến peer địa chỉ . Việc truyền các  `ICE candidates` này thường được gọi là `Signaling`

>  ICE thì nó  phức tạp và nhiều điều cần nói. Nên trong bài viết này mình sẽ không đề cập đến . Nếu bạn nào có hứng thú tìm hiểu thì có thể xem ở [đây](https://kipalog.com/posts/WebRTC-basic---Phan-1--Tim-hieu-ve-NAT--STUN--TURN-vs-ICE). 

## 1: Signaling

Trong `WebRTC` đã chỉ định ra rõ ràng các API cho việc giao tiếp với các ICE  (Interactive Connectivity Establishment) Server , tuy nhiên phần `signaling` thì lại không phải là 1 phần đã của WebRTC. `Signaling` cần thiết đề các máy tính biets được cách mà chúng sẽ kết nối với nhau .

Thông thường thì nó sẽ được định nghĩa bằng các `HTTP - API` thông dụng (là thứ sẽ cung cấp các thông tin cần thiết trước khi bắt đầu kết nối ngang hàng)

```
const signalingChannel = new SignalingChannel(remoteClientId);
signalingChannel.addEventListener('message', message => {
    // New message from remote client received
});

// Send an asynchronous message to the remote client
signalingChannel.send('Hello!');
```

`Signaling` có thể triển khai bằng nhiều cách khác nhau (Http - API , Websocket , ... ... ), WebRTC không chỉ định rõ nên bạn có thể sử dụng các cách phù hợp với ứng dụng của bạn.

> Phần trên mình nói hơi lý thuyết có thể hơi khó hiểu, bạn có thể hiểu `Signaling` là bước chuẩn bị cho một cuộc gọi . Ví dụ A gọi cho B thì đầu tiên A cần gửi tín hiệu muốn call cho B thông qua `Signaling Server`. Server gửi tín hiệu và địa chỉ của A cho B. B accept và bảo server là tôi đồng ý nhận cuộc gọi. `Signaling Server` gửi tín hiểu lại cho B . Đại khái là như vậy.

## 2: Khởi tạo peer connections

Mỗi peer connection đều được xử lý bằng một `RTCPeerConnection` object. Để khởi tạo được class này chúng ta cần một tham số đầu vào 1 input là object `RTCConfiguration`. `RTCPeerConnection` sẽ định nghĩa ra cách mà các kết nối hoạt động và chưa thông tin về `ICE servers` sử dụng.

Một `RTCPeerConnection` sẽ được khởi tạo khi chúng ta khởi tạo 1 yêu cầu kết nối (SDP -  Session Description Protocol  offer) hoặc trả lời một yêu câu , tùy vào bạn là người gọi hay người trả lời . Đương nhiên SDP của caller hay callee sẽ phải được định nghĩa từ các kênh khác nhau (channel). 

Về phía  bạn - người gọi (caller), chúng ta cần 
 - Khởi tạo một `RTCPeerConnection` object` 
 - Khời tạo `RTCSessionDescription` từ `RTCPeerConnection` thông qua cách gọi hàm `createOffer()`
 - `RTCSessionDescription`  là sự đại diện của máy caller 
 - Cuối cùng, chúng ta cần set một nơi để lắng nghe khi bạn gửi yêu cầu call đến partner - parthner đồng ý - gửi tín hiệu đồng ý đến bạn.

Những gì mình miêu tả bạn có thể xem rõ hơn ở ví dụ dưới đây :
```
async function makeCall() {
    const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
    const peerConnection = new RTCPeerConnection(configuration);
    signalingChannel.addEventListener('message', async message => {
        if (message.answer) {
            const remoteDesc = new RTCSessionDescription(message.answer);
            await peerConnection.setRemoteDescription(remoteDesc);
        }
    });
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    signalingChannel.send({'offer': offer});
}
```

Bên phía partner của bạn - Người nghe (callee). Chúng ta cần 
- Khởi tạo một `RTCPeerConnection` object`
- Khởi tạo một hàm để lắng nghe khi bạn gửi yêu cầu call đến partner (gửi 1 `offer`) 
- Nếu đồng ý , partner có thể set `RTCSessionDescription`
-  Sau đó gửi tín hiệu đồng ý đến máy caller 


Những gì mình miêu tả bạn có thể xem rõ hơn ở ví dụ dưới đây :
```
const peerConnection = new RTCPeerConnection(configuration);
signalingChannel.addEventListener('message', async message => {
    if (message.offer) {
        peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        signalingChannel.send({'answer': answer});
    }
});
```

Ok, đến thời điểm này thì cả 2 peer của chúng ta đều đã xác định được `Local session descriptions` và `Remote session descriptions`. Tức là chúng đã có khả nằng kết nối với nhau. Tuy nhiên , nó không có nghĩa là việc kết nối đã hoàn tất. Để làm được điều này , chúng  cần thu thập các `ICE candidates` để transfer dữ liệu audio hoặc video.

## 3: ICE candidates

Trước khi 2 máy có thể kết nối thông qua `WebRTC`, chúng cần trao đổi thông tin kết nối đến nhau. Làm thế nào để các máy tính có thể tìm đến nhau trên internet. Thực tế thì các thiết bị đều kết nối internet thông qua các thiết bị định tuyến NAT (Network Address Traversal) vì vậy chúng không thể nhìn thấy địa chỉ thật của nhau. Vì vậy, một dịch vụ mạng đã được tạo ra với mục đích sử dụng cho mạng ngang hàng. Nó được gọi là ICE.

Một ICE bao gồm 2 thành phần :

- Máy chủ `STUN` là viết tắt của session Traversal Utility cho NAT ==> Hiểu ngán gọn thì nó cho phép một device tìm đến địa chỉ IP thực của chính nó trên internet . Với địa chỉ này thì chúng ta có thể dùng nó để kết nối đến các peer khác.

> Tuy nhiên trường hợp device bị chặn bời tường lửa hoặc lí do nào đó STUN không cung cấp đc IP của nó, thì ICE sẽ dựa vào TURN để thiết lập kết nối. Khi dựa vào TURN server, thì lúc này không còn gọi là peer to peer nữa mà phải là client to host. Tất nhiên webrtc vẫn ưu tiên hướng tới việc kết nối peer to peer hơn tức là sử sử dụng tới STUN thôi, nhưng TURN server vẫn luôn sẵn sàng dự phòng.

- Máy chủ `TURN` (Traversal Sử dụng Relay NAT) là giải pháp tiên tiến hơn kết hợp các giao thức STUN và hầu hết các dịch vụ dựa trên WebRTC thương mại sử dụng máy chủ TURN để thiết lập kết nối giữa các đồng nghiệp. ==> Hiểu một cách cụ thể thì nó là một máy chủ chuyển tiếp và hoạt động như một trung gian để truyền dữ liệu, âm thanh, video khi không thể kết nối trực tiếp giữa hai PC.

> Dữ liệu chảy sử dụng máy chủ TURN, nó tiêu tốn nhiều băng thông và đây thực sự không còn là giao tiếp P2P nữa



 API `WebRTC` hỗ trợ trực tiếp cả STUN và TURN nhằm mục đích ổn định trong nhiều điều kiện kết nối Internet. Khi tạo kết nối `WebRTC`, chúng ta thường cung cấp một hoặc nhiều máy chủ ICE khi khởi tạo đối tượng `RTCPeerConnection` .
 
 ## 4: Trickle ICE
Khi một đối tượng `RTCPeerConnection` được khởi tạo ,  WebRTC sẽ sử dụng các ICE server được chúng ta cung cấp để thiết lập các kết nối. Event `icegatheringstatechange`  trong `RTCPeerConnection` sẽ là nơi thu thập các tín hiệu về trạng thái của ICE (`new`, `gathering` và `complete`)

Khi khởi tạo một `RTCPeerConnection` chúng ta cung cấp một danh sách các ` ICE candidates`. Trong quá trinh xử lý, các peer có thể đợi cho việc thu thập các `ICE` hoàn tất nhưng để hiệu quả hơn , WebRTC sử dụng kĩ thuật `Trickle ICE`  (cho phép thu thập và kiểm tra kết nối peer từng phần thay vì tất cả ứng viên được cung cấp tại thời điểm bắt đầu quá trình ICE.) Điều này sẽ giảm đáng kể thời gian thiết lập cho kết nối ngang hàng và cho phép cuộc gọi video bắt đầu với độ trễ ít hơn.

Để thu thập các `ICE candidates`, chỉ cần thêm một event `icecandidate` . Ở object `RTCPeerConnectionIceEvent`trả ra đó sẽ chứa thuộc tính `candidate` đại diện cho một `candidate` mới  và chúng ta cần gửi `candidate` này thông qua `signaling server` đã nói ở trên:

```
// Listen for local ICE candidates on the local RTCPeerConnection
peerConnection.addEventListener('icecandidate', event => {
    if (event.candidate) {
        signalingChannel.send({'new-ice-candidate': event.candidate});
    }
});

// Listen for remote ICE candidates and add them to the local RTCPeerConnection
signalingChannel.addEventListener('message', async message => {
    if (message.iceCandidate) {
        try {
            await peerConnection.addIceCandidate(message.iceCandidate);
        } catch (e) {
            console.error('Error adding received ice candidate', e);
        }
    }
});
```

 ## 5: Complete Connection
 
 Khi các Peer đã nhận được các ICE, việc còn lại của chúng ta là chờ các kết nối của các peer được thành lập . Để phát hiện ra việc kết nối thành lập chúng ta có `connectionstatechange` event :
 ```
 // Listen for connectionstatechange on the local RTCPeerConnection
peerConnection.addEventListener('connectionstatechange', event => {
    if (peerConnection.connectionState === 'connected') {
        // Peers connected!
    }
});
 ```
# Kết luận.
Ok, vậy là mình đã kết thúc bài tìm hiểu nho nhỏ của mình ngày hôm nay. Bài viết chắc vẫn còn những thiếu sót. Mong mọi người comment góp ý giúp mình nhé. Cám ơn mọi người đã xem hết bài viết của mình :D

# Tài liệu tham khảo
https://webrtc.org/

https://www.tutorialspoint.com/webrtc/webrtc_architecture.htm

https://www.youtube.com/watch?v=p2HzZkd2A40

https://viblo.asia/p/webrtc-va-install-janus-on-ubuntu-1804-gAm5yy885db