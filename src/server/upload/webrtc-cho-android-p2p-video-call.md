![](https://images.viblo.asia/3b7d6f4f-3caa-4de7-8e9f-c4eb16794804.png)

Các ứng dụng call video đang trở nên ngày càng phổ biến, mình viết bài này để những bạn mới bắt đầu có thêm nguồn tài liệu tham khảo.

Source code bạn có thể tham khảo ở [WebRTC Codelabs](https://codelabs.developers.google.com/codelabs/webrtc-web/#0)

Phần hướng dẫn này chủ yếu dựa trên Step-2 của code-lab trên, sử dụng PeerConnection trong WebRTC để truyền dữ liệu âm thanh và video.

### Kịch bản:
Một chàng trai muốn gọi cho bạn gái của mình qua video call, và chàng trai đã chọn ứng dụng của chúng ta. Sau đây là kịch bản:

![](https://images.viblo.asia/bd76ecc6-d9ac-4845-86eb-41e955e0dceb.jpeg)

- Đầu tiên, app của chúng ta sẽ tạo một kết nối ngang hàng và một offer SDP. Offer này chứa data về cuộc gọi và được sử dụng để nhận dạng các codec và các đối tượng khác của kết nối ngang hàng.
- Offer này sau đó sẽ được lưu lại như là một 'dữ liệu về local' tại thời điểm kết nối và sau đó gửi đến người nhận qua một cơ chế thông báo (có thể sử dụng socket)
- Khi bên cô gái nhận được tín hiệu, ứng dụng bên đó sẽ biết được có một cuộc gọi được thiết lập, nó sẽ lưu offer như là một 'dữ liệu remote' và tạo một Answer SDP.
- Answer SDP này tương tự như Offer SDP của người gọi, chứa các dữ liệu chi tiết cho người dùng ngang hàng.
- Ứng dụng tại phía cô gái lưu Answer SDP như là 'dữ liệu về local' của nó và gửi nó thông qua các tín hiệu thông báo (socket) cho chàng trai.
- Chàng trai nhận được câu trả lời và lưu nó là 'dữ liệu remote'.
- Chàng trai và cô gái sau đó truyền các Ice Candidate liên quan đến họ thông qua các kênh báo hiệu. Khi nhận được các Ice Candidate này, kết nối sẽ thêm vào PeerConnection.
- Sau khi việc truyền các Candidate hoàn thành, hai bên sẽ bắt đầu truyền media data với nhau. Việc truyền data này thông qua RTP và WebRTC framework.
### Vòng lặp kết nối ngang hàng:
Nếu như bạn đã đọc Step-2 trong codelab, bạn có thể thấy họ tạo một vòng lặp giữa người gọi và người nhận.

```
public void start() {
    //Initialize PeerConnectionFactory globals.
    //Params are context, initAudio,initVideo and videoCodecHwAcceleration
    PeerConnectionFactory.initializeAndroidGlobals(this, true, true, true);

    //Create a new PeerConnectionFactory instance.
    PeerConnectionFactory.Options options = new PeerConnectionFactory.Options();
    peerConnectionFactory = new PeerConnectionFactory(options);

    //Now create a VideoCapturer instance. Callback methods are there if you want to do something! Duh!
    VideoCapturer videoCapturerAndroid = getVideoCapturer(new CustomCameraEventsHandler());

    //Create MediaConstraints - Will be useful for specifying video and audio constraints.
    audioConstraints = new MediaConstraints();
    videoConstraints = new MediaConstraints();

    //Create a VideoSource instance
    videoSource = peerConnectionFactory.createVideoSource(videoCapturerAndroid, videoConstraints);
    localVideoTrack = peerConnectionFactory.createVideoTrack("100", videoSource);

    //create an AudioSource instance
    audioSource = peerConnectionFactory.createAudioSource(audioConstraints);
    localAudioTrack = peerConnectionFactory.createAudioTrack("101", audioSource);
    localVideoView.setVisibility(View.VISIBLE);

    //create a videoRenderer based on SurfaceViewRenderer instance
    localRenderer = new VideoRenderer(localVideoView);
    // And finally, with our VideoRenderer ready, we
    // can add our renderer to the VideoTrack.
    localVideoTrack.addRenderer(localRenderer);
}

private void call() {
    //we already have video and audio tracks. Now create peerconnections
    List<PeerConnection.IceServer> iceServers = new ArrayList<>();

    //create sdpConstraints
    sdpConstraints = new MediaConstraints();
    sdpConstraints.mandatory.add(new MediaConstraints.KeyValuePair("offerToReceiveAudio", "true"));
    sdpConstraints.mandatory.add(new MediaConstraints.KeyValuePair("offerToReceiveVideo", "true"));

    //creating localPeer
    localPeer = peerConnectionFactory.createPeerConnection(iceServers, sdpConstraints, new CustomPeerConnectionObserver("localPeerCreation") {
        @Override
        public void onIceCandidate(IceCandidate iceCandidate) {
            super.onIceCandidate(iceCandidate);
            onIceCandidateReceived(localPeer, iceCandidate);
        }
    });

    //creating remotePeer
    remotePeer = peerConnectionFactory.createPeerConnection(iceServers, sdpConstraints, new CustomPeerConnectionObserver("remotePeerCreation") {

        @Override
        public void onIceCandidate(IceCandidate iceCandidate) {
            super.onIceCandidate(iceCandidate);
            onIceCandidateReceived(remotePeer, iceCandidate);
        }

        @Override
        public void onAddStream(MediaStream mediaStream) {
            super.onAddStream(mediaStream);
            gotRemoteStream(mediaStream);
        }
    });

    //creating local mediastream
    MediaStream stream = peerConnectionFactory.createLocalMediaStream("102");
    stream.addTrack(localAudioTrack);
    stream.addTrack(localVideoTrack);
    localPeer.addStream(stream);

    //creating Offer
    localPeer.createOffer(new CustomSdpObserver("localCreateOffer"){
        @Override
        public void onCreateSuccess(SessionDescription sessionDescription) {
            //we have localOffer. Set it as local desc for localpeer and remote desc for remote peer.
            //try to create answer from the remote peer.
            super.onCreateSuccess(sessionDescription);
            localPeer.setLocalDescription(new CustomSdpObserver("localSetLocalDesc"), sessionDescription);
            remotePeer.setRemoteDescription(new CustomSdpObserver("remoteSetRemoteDesc"), sessionDescription);
            remotePeer.createAnswer(new CustomSdpObserver("remoteCreateOffer") {
                @Override
                public void onCreateSuccess(SessionDescription sessionDescription) {
                    //remote answer generated. Now set it as local desc for remote peer and remote desc for local peer.
                    super.onCreateSuccess(sessionDescription);
                    remotePeer.setLocalDescription(new CustomSdpObserver("remoteSetLocalDesc"), sessionDescription);
                    localPeer.setRemoteDescription(new CustomSdpObserver("localSetRemoteDesc"), sessionDescription);
                }
            },new MediaConstraints());
        }
    },sdpConstraints);
}


private void hangup() {
    localPeer.close();
    remotePeer.close();
    localPeer = null;
    remotePeer = null;
}

private void gotRemoteStream(MediaStream stream) {
    //we have remote video stream. add to the renderer.
    final VideoTrack videoTrack = stream.videoTracks.getFirst();
    AudioTrack audioTrack = stream.audioTracks.getFirst();
    runOnUiThread(new Runnable() {
        @Override
        public void run() {
            try {
                remoteRenderer = new VideoRenderer(remoteVideoView);
                remoteVideoView.setVisibility(View.VISIBLE);
                videoTrack.addRenderer(remoteRenderer);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    });
}

public void onIceCandidateReceived(PeerConnection peer, IceCandidate iceCandidate) {
    //we have received ice candidate. We can set it to the other peer.
    if (peer == localPeer) {
        remotePeer.addIceCandidate(iceCandidate);
    } else {
        localPeer.addIceCandidate(iceCandidate);
    }
}
```

Ở đoạn code trên, có 3 methods.

`Method start() ` về cơ bản tạo ra nguồn âm thanh và video ở local và thêm chúng vào SurfaceViewRenderer.

`Method hangup()` chỉ là một đoạn code đơn giản xóa tất cả các thực thể PeerConnection.

`Method call()` là nơi cuộc gọi diễn ra:

- Chúng tạo ra 2 cá thể kết nối ngang hàng (local peer và remote peer). Khi một peer được tạo, chúng ta sử dụng một local peer để tạo một Offer được đặt làm 'dữ liệu Local' của nó và cũng là 'dữ liệu Remote' của đầu dây bên kia.

- Sau đó chúng ta làm cho remote peer tạo Answer được đặt làm 'dữ liệu Local' của nó và là 'dữ liệu remote' của đầu bên này.

Ngoài ra chúng ta cũng có `method onIceCandidateReceived()` được dùng để thiết lập các Ice Candidate nhận được từ peer này tới peer kia.

Như vậy việc cơ bản đã xong, ta có một peer ngang hàng, giờ cả 2 có thể truyền dữ liệu cho nhau qua WebRTC framework. 

Hy vọng bài viết giúp ích các bạn một phần nào đó. Cảm ơn!

[Nguồn tài liệu](https://vivekc.xyz/peer-to-peer-video-calling-webrtc-for-android-4132fd0ac54)