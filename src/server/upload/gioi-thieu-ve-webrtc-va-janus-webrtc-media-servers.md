Hi các bạn, Mình đang làm trong một dự án về streaming và đang sử dụng WebRTC và hôm nay mình sẻ chia sẻ với mọi nguời những gì mình biết về WebRTC .

**WebRTC là cái gì?**

WebRTC là một dự án mở, miễn phí, cung cấp các trình duyệt và ứng dụng di động với khả năng Truyền thông thời gian thực (RTC) 
thông qua các API đơn giản. 
Các thành phần WebRTC đã được tối ưu hóa để phục vụ tốt nhất cho mục đích này.

**Ứng dụng của WebRTC ?** 
WebRTC được sử dụng trong các ứng dụng khác nhau như WhatsApp, Facebook Messenger, xuất hiện và các nền tảng như TokBox. 
WebRTC cũng đã được tích hợp với các ứng dụng gốc WebKitGTK + và Qt.
WebRTC có khả năng hỗ trợ trình duyệt (browser) giao tiếp với nhau thông qua VideoCall, VoiceCall hay transfer data Peer-to-Peer (P2P) 
mà không cần browser phải cài thêm plugins hay phần mềm hỗ trợ nào từ bên ngoài.
WebRTC hiện tại đã hỗ trợ các native apps.(android, ios)

**Các thành phần của WebRTC**

WebRTC cung cấp 3 API sau

**MediaStream**:
	API MediaStream đại diện cho các luồng phương tiện được đồng bộ hóa. 
	cho phép trình duyệt web truy cập vào camera và/hoặc microphone để lấy dữ liệu hình ảnh âm thanh cho việc truyền tải.
	 
**RTCPeerConnection**
	RTCPeerConnection là thành phần WebRTC xử lý giao tiếp truyền dữ liệu(âm thanh và video) ổn định và hiệu quả giữa các client
	
**RTCDataChannel**
Cũng như âm thanh và video, WebRTC hỗ trợ giao tiếp thời gian thực cho các loại dữ liệu khác peer-to-peer.

Để tìm hiểu thêm các chức năng về WebRTC các bạn có thể truy cập https://webrtc.org để xem chi tiết

Ở bài này tôi sẽ giới thiệu về  **WebRTC media servers**

**WebRTC media servers là gì?**

WebRTC là một tập hợp các giao thức, cơ chế và API cung cấp trình duyệt và ứng dụng di động với Real-Time Communications (RTC) 
thông qua kết nối peer-to-peer. Nó đã được hình thành như một công nghệ cho phép trình duyệt để giao tiếp trực tiếp mà không cần
qua trung gian của bất kỳ loại cơ sở hạ tầng nào. Tuy nhiên, mô hình này chỉ đủ để tạo các ứng dụng web cơ bản; các tính năng như liên lạc nhóm, ghi dòng phương tiện, phương tiện truyền thông phát sóng, hoặc chuyển mã phương tiện rất khó thực hiện. Vì lý do này,
nhiều ứng dụng yêu cầu một máy chủ phương tiện trung gian.
Về mặt khái niệm, WebRTC media servers chỉ là một phần mềm trung gian đa phương tiện, nơi lưu lượng phương tiện truyền thông đi qua khi di chuyển từ nguồn đến đích.

**Vì sao phải sử dụng WebRTC media servers ?** 

WebRTC như được triển khai hiện tại chỉ hỗ trợ giao tiếp một-một, nhưng có thể được sử dụng trong các tình huống mạng phức tạp hơn:
ví dụ: với nhiều máy ngang hàng truyền thông trực tiếp với nhau, ngang hàng hoặc thông qua Thiết bị điều khiển đa điểm (MCU) ,
một máy chủ có thể xử lý số lượng lớn người tham gia và thực hiện chuyển tiếp luồng chọn lọc và trộn hoặc ghi âm thanh và video.

**Các WebRTC media servers phổ biến**

Một số media server đang được sử dụng khá phổ biến hiện tại có thể kể tên

* Jitsi 
* Kurento
* Janus


Ở bài này tôi sẽ giới thiệu về **janus**

Janus là một máy chủ WebRTC mã nguồn mở, mục đích chung được thiết kế và phát triển bởi Meetecho. 
Janus là một máy chủ nhẹ đa năng thực hiện các phương tiện để thiết lập truyền thông phương tiện WebRTC giữa các peer-to-peer
Phiên bản máy chủ này được thiết kế riêng cho các hệ thống Linux, mặc dù nó có thể được biên dịch và cài đặt trên các máy MacOS. 
Windows không được hỗ trợ, nhưng nếu đó là một yêu cầu, Janus được biết là hoạt động trong "Hệ thống con Windows cho Linux" trên Windows 10.

Để có thể cài đặt được Janus Server các bạn có thể làm theo các bước ở đây https://github.com/meetecho/janus-gateway

Janus cực kỳ mạnh mẽ ở chỗ nó có khả năng tùy biến cao và cung cấp một số tính năng độc đáo thông qua các plugin như 

* EchoTest plugin documentation

* Streaming plugin documentation

* VideoCall plugin documentation

* SIP plugin documentation

* SIPre plugin documentation

* NoSIP plugin documentation

* AudioBridge plugin documentation

* VideoRoom plugin documentation
 
* Janus TextRoom documentation
 
* Record&Play plugin documentation

* VoiceMail plugin documentation

* Lua plugin documentation

* JavaScript (Duktape) plugin documentation

		
Để làm việc được với Janus server thì janus cung cấp các service dưới dạng Restfull API
Ngoài ra cung cấp các cách làm việc bằng WebSockets, RabbitMQ, MQTT, Nanomsg and UnixSockets API 

Chi tiết có thể tham khảo ở https://janus.conf.meetecho.com/docs/