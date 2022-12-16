# WebRTC là gì

**WebRTC(Web Real-Time Communication)** là các **API** viết bằng javascript giúp giao tiếp theo thời gian thực mà không cần cài plugin hay phần mềm hỗ trợ. WebRTC có khả năng hỗ trợ trình duyệt giao tiếp thời gian thực thông qua Video Call, Voice Call hay transfer data P2P (peer-to-peer),mà không cần đến plugin hay phần mềm khác.

# Lịch sử WebRTC

![history](https://ren0503.github.io/assets/img/webrtc/history.jpg)

WebRTC đã được hình thành ý tưởng từ những năm 2009 bởi nhóm kỹ sư Google Hangouts. Thay vì sử dụng Flash để truyền video, hình ảnh trên web, họ quyết định tự tạo ra một sản phẩm của riêng mình.

Năm 2010, khi hai công ty On2 và Global IP Solutions (GIPS) chính thức bị Google thâu tóm, công nghệ truyền dữ liệu thời gian thực cũng được lấy làm nền tảng cho WebRTC. Đến tháng 5 năm 2011, dự án nguồn mở hỗ trợ giao tiếp thời gian thực giữa trình duyệt mang tên WebRTC mới chính thức được ra mắt.

Cùng lúc đó, W3C và Hiệp Hội Kỹ Sư Quốc Tế (IETF) cũng phát triển các giao thức kết nối thời gian thực. Vì thế, họ đã quyết định bắt tay để cùng nhau xây dựng sản phẩm này. Tháng 10 năm 2011, phiên bản đầu tiên của WebRTC chính thức ra mắt, đến tháng 11, Chrome 23 ra đời và trở thành trình duyệt đầu tiên tích hợp sẵn WebRTC.

# WebRTC dùng để làm gì

![uses](https://ren0503.github.io/assets/img/webrtc/uses.png)

Tính năng nổi bật nhất của WebRTC chắc chắn chính là khả năng truyền tải video, âm thanh, gửi dữ liệu theo thời gian thực giữa hai hay nhiều thiết bị mà không qua trung gian, không cần cài thêm plugin.

Trang web Appear.in từng là một trong những trang web sử dụng WebRTC khá nổi tiếng. Trang này cung cấp dịch vụ tạo phòng chat video nhanh chóng mà không cần cài đặt thêm bất kì plugin nào, không cần đăng nhập tài khoản.

Không chỉ các ứng dụng mà WebRTC còn được sử dụng cho việc tạo ra các tựa game trên trình duyệt. Người chơi chỉ cần sử dụng trình duyệt có hỗ trợ WebRTC để chơi, không cần cài đặt rườm rà.

# Lợi ích 

- **Mã nguồn mở miễn phí**: WebRTC là một dự án mã nguồn mở miễn phí. Google cho biết đây là một công cụ truyền thông thời gian thực hoàn toàn miễn phí và có sẵn trên mọi trình duyệt.
- **Hỗ trợ đa nền tảng**: Mặc dù WebRTC vẫn trong giai đoạn phát triển nhưng nó đã hoạt động tốt trên hầu hết mọi trình duyệt của các hệ điều hành bất kì. Cho phép lập trình viên viết các đoạn mã HTML làm việc với máy tính hoặc thiết bị di động.
- **Bảo mật voice và video**: Giao thức **SRTP (Secure Real-Time Transport Protocol)** được dùng để mã hóa và xác thực dữ liệu media. Chống lại các khả năng bị nghe trộm trong quá trình thực hiện tác vụ video hay voice.
- **Không cần plugin hay phần mềm hỗ trợ**: Yếu tố quan trọng giúp WebRTC được đánh giá rất cao chính là khả năng hoạt động không cần đến plugin bên thứ ba mang đến sự tiện lợi, tối ưu tốc độ, tiết kiệm chi phí,…
- **Tương đối dễ sử dụng**: WebRTC có thể được tích hợp trong các dịch vụ web bằng cách dùng JavaScript APIs, các Framework có sẵn.
Sử dụng bằng thông hiệu quả: Hỗ trợ nhiều kiểu media và các thiết bị đầu cuối khác nhau, WebRTC sử dụng băng thông hiệu quả hơn, hoạt động tốt trong mọi điều kiện đường truyền mạng.

# Ưu và nhược điểm của WebRTC
WebRTC có khá nhiều những ưu điểm. Tuy nhiên nó vẫn tồn tại một số những nhược điểm. Hãy cùng Mắt Bão tìm hiểu chi tiết về ưu và nhược điểm của WebRTC bên dưới đây!

## Ưu điểm của WebRTC

![media](https://ren0503.github.io/assets/img/webrtc/media.png)

- Được viết bằng ngôn ngữ javascript nên dễ dàng tiếp cận và sử dụng.
- Hoàn toàn miễn phí.
- Có thể hỗ trợ đa nền tảng, đa trình duyệt web trên laptop, PC, các thiết bị di động….
- Tính bảo mật cao.
- Không cần cài đặt, không cần plugin, phần mềm hỗ trợ.
- Dùng được trong nhiều điều kiện đường truyền mạng.

## Nhược điểm của WebRTC

![browser](https://ren0503.github.io/assets/img/webrtc/browser.png)

- WebRTC bị cản bởi NAT và tường lửa khi cố gắng thực hiện kết nối P2P.
- Không có cơ chế báo hiệu cài sẵn khi WebRTC tạo kết nối P2P giữa các trình duyệt.
- WebRTC vẫn chưa chính thức hoàn thiện, một số trình duyệt như IE, Safari chưa thực sự được hỗ trợ tốt nhất.
- Các hãng trình duyệt chưa thống nhất được chuẩn video sử dụng cho WebRTC.
- Số lượng hàm API WebRTC hỗ trợ cho mỗi trình duyệt là khác nhau, tăng rủi ro phát sinh lỗi khi sử dụng trên các trình duyệt khác nhau.

# Các thành phần của WebRTC

## MediaStream

**MediaStream** là một stream dữ liệu âm thanh và hình ảnh, bằng cách gọi hàm `getUserMedia` để khởi tạo khi làm việc cục bộ. MediaStream sẽ cho phép truy cập vào stream của một máy tính sau khi một kết nối WebRTC được thiết lập với một máy tính khác.

Một MediaStream sẽ có **input** và **output**. Với input dùng để lấy dữ liệu hình ảnh và âm thanh của local trong khi output dùng để hiển thị các dữ liệu này lên view hoặc được RTCPeerConnection sử dụng.

## RTCDataChannel

Đúng với cái tên của mình, RTCDataChannel là một kênh hai chiều chịu trách nhiệm trao đổi dữ liệu thời gian thực. RTCDataChannel sẽ trao đổi các dữ liệu dạng text, chia sẻ tệp P2P và các loại khác mà không chứa các dữ liệu nghe nhìn(âm thanh, hình ảnh). Khả năng trao đổi thông tin nhanh chóng, an toàn, đáng tin khiến RTCDataChannel được khai thác để xây dựng các giải pháp mới và hiệu quả về chi phí.

## RTCPeerConnection

Là phần quan trọng giúp kết nối MediaStream và RTCDataChannel trở thành WebRTC. RTCPeerConnection là API giúp kết nối giữa hai trình duyệt, cung cấp các phương thức để kết nối, duy trì kết nối và đóng kết nối khi không còn nhu cầu sử dụng.

# Xây dựng kết nối

Trước khi thực hiện cuộc gọi peer-to-peer, kết nối giữa hai máy client cần phải được thiết lập. Để thiết lập ta sử dụng **signaling (tín hiệu)**. 

## Signaling

Signaling cho phép hai endpoint (bên gửi, bên nhận hoặc cả hai) thực hiện trao đổi metadata để cùng nhau giao tiếp nhằm thiết lập cuộc gọi. Ví dụ: trước khi hai endpoint bắt đầu cuộc gọi, sẽ có một bên gọi bên còn lại, bên được gọi sẽ thực hiện lại phản hồi. Luồng thông điệp call-and-response (còn được gọi là offer-answer) này sẽ chứa các chi tiết quan trọng về quá trình truyền tải trực tuyến (streaming), bao gồm số lượng và kiểu luồng (stream), cách phương tiện được mã hoá,...và thường được định dạng bằng giao thức SDP (Session Description Protocol), tiêu chuẩn được sử dụng bởi nhiều hệ thống như, như VoIP hay WebRTC.

Lý do phải có signaling là vì:

- Mạng ngang hàng không thể biết khả năng(capabilities) của máy khác.
- Mạng ngang hàng không thể biết địa chỉ IP của máy khác.

![signal](https://ren0503.github.io/assets/img/webrtc/signaling.gif)

## NAT Traversal - ICE, TURN, STUN

Mỗi khi signaling khởi tạo cho kết nối truyền tải trực tiếp diễn ra, hai endpoint sẽ bắt đầu quá trình truyền qua **NAT (Network Address Translation)**. 
Lý do chúng phải cần NAT là trừ trường hợp hai endpoint nằm chung mạng cục bộ, thì khi kết nối với internet hầu hết máy tính đều không có IP tĩnh. Chúng cần NAT dịch địa chỉ IP private bên trong mạng cục bộ thành địa chỉ IP public. Để hiểu cách hoạt động của NAT ta có ví dụ như sau:

> Nếu như bạn đang ở trong môi trường công cộng và kết nối vào mạng WiFi, máy tính của bạn sẽ được gán 1 địa chỉ IP mà nó chỉ tồn tại đằng sau NAT. Giả sử IP là 172.0.23.4, tuy nhiên, với thế giới bên ngoài, địa chỉ IP của bạn có thể mang giá trị khác, ví dụ 164.53.27.98. Vì vậy, thế giới bên ngoài sẽ thấy các request của bạn đến từ địa chỉ 164.53.27.98 nhưng thiết bị NAT sẽ đảm bảo các response cho những request (được gửi từ máy của bạn) sẽ trả về đúng chỗ là 172.0.23.4 bằng các bảng ánh xạ (mapping table). 

Cũng vì vậy mà nó sẽ gây khó khăn cho kết nối real-time video, vì vậy ta sẽ cần phương thức để hỗ trợ ta vượt rào:

- **Interactive Connectivity Establishment (ICE)** - là một giao thức được dùng để thiết lập media session dựa trên UDP đi qua NAT một cách nhanh nhất. Nó sẽ tìm đường tốt nhất để kết nối giữa các endpoint, nó thử tất cả khả năng có thể kết nối một cách song song và lựa chọn con đường hiệu quả nhất. Nó sử dụng hai giao thức - **STUN** và **TURN**.
- **Session Traversal Utilities for NAT (STUN)** - là một phương pháp nhẹ và đơn giản cho truyền NAT. STUN cho phép các client WebRTC biết được địa chỉ IP và Port mà NAT sử dụng, từ đó mà biết IP và Port của các endpoint khác, bằng cách gửi yêu cầu đến server STUN.
- **Traversal Using Relays around NAT (TURN)** - tương tự như STUN, tuy nhiên dữ liệu thay vì được gửi trực tiếp tới các endpoint thì các endpoint sẽ gửi dữ liệu tới các TURN server và TURN server sẽ đóng vai trò trung gian vận chuyển gói tin.

![nat](https://ren0503.github.io/assets/img/webrtc/nat.png)

## Codecs

Trước khi gửi media trong kết nối ngang hàng chúng cần phải được nén lại. Các tệp video, mp3 dạng raw sẽ rất lớn cho việc truyền tải dữ liệu trong hạ tầng mạng. Đồng thời sau khi nhận media qua kết nối ngang hàng, chúng cũng cần giải nén. Bộ codec media (coder-decoder) thực hiện chính xác điều này. 

WebRTC bắt buộc 3 codec cho audio và 2 codec cho video:

1. Audio - PCMU (G.711μ) chạy ở 8,000Hz với kênh đơn (mono).
2. Audio - PCMA (G.711a) chạy ở 8,000Hz với kênh đơn (mono).
3. Audio - Opus chạy ở 48,000Hz với hai kênh (stereo).
4. Video - VP8.
5. Video - H.264/AVC sử dụng Constrained Baseline Profile Level 1.2.

Các codec media trong tương lai như VP9 và H.265 có thể được thêm vào tiêu chuẩn WebRTC tại một số thời điểm trong tương lai, nhưng hiện tại chúng không bắt buộc.

Ta có kết nối tổng quát của WebRTC như sau:

![flow](https://ren0503.github.io/assets/img/webrtc/flow.png)

# Bảo mật

Có rất nhiều cách mà 1 ứng dụng hoặc plugin giao tiếp real-time có thể bị ảnh hưởng về bảo mật. Ví dụ:

- Dữ liệu hoặc media không được mã hóa có thể bị chặn trên đường đi giữa các trình duyệt hay giữa trình duyệt và server
- Một ứng dụng có thể ghi chép và phân phối âm thanh, hình ảnh mà user hoàn toàn không biết
- Malware hoặc virus máy tính có thể được cài đặt cùng với 1 ứng dụng hoặc plugin vớ vẩn.

WebRTC có nhiều tính năng để tránh các vấn đề trên:

- WebRTC triển khai sử dụng các giao thức bảo mật chẳng hạn như DTLS và SRTP
- Mã hóa là điều cần thiết đối với tất cả các component của WebRTC, bao gồm cả cơ chế signaling.
- WebRTC không phải là 1 plugin: các component của nó chạy trong sandbox của trình duyệt và không chạy ở luồng riêng, các component không yêu cầu cài đặt riêng lẻ và được cập nhật mỗi khi trình duyệt được cập nhật.
- Truy xuất camera và microphone phải được cấp quyền rõ ràng và khi camera hoặc microphone đang hoạt động thì phải được thể hiện ra ở phía giao diện người dùng.

# Tổng kết

WebRTC là 1 công nghệ cực kỳ thú vị & mạnh mẽ dành cho các sản phẩm cần làm việc với mô hình truyền tải real-time giữa các trình duyệt. Hy vọng bài viết trên sẽ đem đến những thông tin cần thiết cho những ai đang tìm hiểu.

# Tham khảo

[**matbao.net**](https://wiki.matbao.net/webrtc-la-gi-cach-viet-ung-dung-goi-video-bang-webrtc-va-firebase/)

[**liveswitch.io**](https://www.liveswitch.io/ultimate-guide-to-webrtc)

[**nthung2112.github.io**](https://nthung2112.github.io/2019/01/Cach-Javascript-hoat-dong-P18-WebRTC-co-che-mang-peer-to-peer.html)