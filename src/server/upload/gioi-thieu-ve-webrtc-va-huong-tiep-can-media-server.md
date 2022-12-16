> Chào các bạn trước mình có nghiên cứu về ứng dụng Multimedia dựa trên WebRTC, hôm nay mình xin một số kiến thức mình biết về WebRTC.

# 1. Giới thiệu về WebRTC
WebRTC (Web Real-Time Communication) [1] là một tiêu chuẩn định nghĩa tập hợp các giao thức truyền thông và các giao diện lập trình ứng dụng cho phép truyền tải thời gian thực trên các kết nối [peer-to-peer](https://en.wikipedia.org/wiki/Peer-to-peer). Điều này cho phép các trình duyệt web không chỉ yêu cầu tài nguyên từ máy chủ mà còn truyền thông tin thời gian thực với trình duyệt khác. Về bản chất, WebRTC là tập hợp các chuẩn và giao thức cho phép trình duyệt web thực hiện trực tiếp các tính năng truyền thông đa phương tiện thời gian thực như gọi điện, truyền hình, truyền dữ liệu, gửi tin nhắn bằng các APIs Javascripts. 
## 1.1 Quá trình phát triển
WebRTC bắt đầu từ lúc Google muốn xây dựng một chuẩn nhằm thực hiện thời gian thực trên tất cả các trình duyệt.Vì vậy trong năm 2010 Google đa mua lại Global IP Solutions (GIPS), đây là một công ty phần mềm về VoIP và video hội họp (công ty này cũng  phát triển nhiều thành phần được yêu cầu cho RTC (Real Time Communication) như codecs và các công nghệ echo cancellation ).Google đưa GIPS thành một mã nguồn mở và bắt đầu tham gia vào IETF và W3C. Tháng 5/2011 Google bắt đầu đưa ra một dự án mã nguồn mở cho phép thực hiện cái ứng dụng thời gian thực cho trình duyệt được biết tới như WebRTC.Nhưng công ty hỗ trợ WebRTC tích cực nhất gồm có Google, Mozilla, Opera. Sự phát triển của WebRTC qua các năm gần đây trên các trình duyệt có thể kể đến như [1]:
* **27/10/2011:** WebRTC bắt đầu được công bố. 
* **11/2011:**  WebRTC bắt đầu hỗ phần trên Chrome 23.
* **1/2013:** WebRTC hỗ trợ trên firefox. 
* **7/2013:** Phiên bản beta của Chrome 29 trên Android hỗ trợ WebRTC.
* **10/2013:** WebRTC bắt đầu hỗ trợ trên phiên bản Opera beta.
* **3/2014:** Bắt đầu hỗ trợ phiên bản Opera 20 trên Android.
* **2/2015:** WebRTC 1.0 working draft chính thức công bố, đến nay đã hỗ trợ bởi các trình duyệt Chrome (phiên bản 23 trở lên), Firefox ( phiên bản 22 trở lên), Opera ( phiên bản 18 trở lên) và hỗ trợ trình duyệt trên nền tảng Android (Chrome 29 trở lên, Firefox 24 trở lên, Opera Mobile 12 trở lên, Google Chrome OS).
## 1.2 Một số lợi ích của WebRTC
Trước kia muốn xây dựng một ứng dụng đa phương tiện người ta cần phải dùng Flash, Java Applet và tích hợp plugins từ các nhà cung cấp thứ ba để thực hiện.Vì thế WebRTC ra đời để giải quyết vấn đề này dưới đây là một số lợi ích và đặc tính mà WebRTC cung cấp. 

Một số lợi ích của WebRTC : 
* **Miễn phí:** WebRTC là một dự án mã nguồn mở được được Google giới thiệu trong năm 2011. Mục đích của Google là cung cấp một công cụ truyền thông thời gian thực dựa trên tiêu chuẩn là miễn phí và có sẵn trên tất cả các trình duyệt.
* **Hỗ trợ mọi nền tảng thiết bị:** Bất kì trình trình duyệt nào với hệ điều hành bất kì có thể tạo trực tiếp một real-time voice hoặc video kết nối tới thiết bị WebRTC khác.Lập trình viên có thể viết các đoạn mã HTML làm việc với máy tính hoặc thiết bị di động. 
* **An toàn trong voice và video** [2]:  WebRTC sử dụng giao thức SRTP (Secure Real Time Communication) nhằm mục đích mã hóa và xác thực dữ liệu media.Điều này tránh được việc nghe trộm khi người dùng thực hiện các tác vụ media như là video hay voice. 
* **Không Plugins :** Như đề cập ở trên WebRTC không cần phải cài các plugin của bên thức ba để sử dụng các ứng dụng đa phương tiện.Việc làm làm cho ứng dụng đa phương tiện còn phải phụ thuộc vào các nền tàng khác nhau.Với WebRTC thì không cần quan tâm đến vấn đề này. 
* **Dễ sử dụng:** Có thể tích hợp các tính năng của WebRTC trong các dịch vụ web bằng cách sử dụng JavaScript APIs,những Framework có sẵn. 
* **Thích ứng với các điều kiện mạng khác nhau** [2]:WebRTC hỗ trợ việc thương lượng với nhiều kiểu media và các thiết bị đầu cuối khác nhau. Điều này các ứng dụng tương tác video hoặc gọi thoại của chúng ta sử dụng băng thông hiệu quả hơn.Các APIs WebRTC và signaling  có thể thỏa thuận kích thức và định dạng cho môi thiết bị đầu cuối. 
## 1.3 Một số giao thức trong WebRTC
Do các đặc điểm cần thời gian thực cao hơn tính tin cậy, giao thức UDP được sử dụng trong WebRTC là giao thức vận chuyển.Nhưng để thỏa mãn yêu cầu của trình duyệt phải hỗ trợ giao thức và dịch vụ ở lớp khác nữa.Về cơ bản các giao thức chính sử dụng trong WebRTC được thể hiện ở hình dưới:
![](https://images.viblo.asia/73854335-ef20-4556-b6cf-2bd7cb097754.png)
Protocol stack trong WebRTC [3]
### SRTP
[SRTP](https://tools.ietf.org/html/rfc3711) (Secure Real Time Protocol) được sử dụng để mã hóa và chuyển các gói tin media giữa các WebRTC client.Sau khi thiết lập thành công PeerConnection,kết nối SRTP sẽ được thiết lập giữa các trình duyệt và máy chủ.Với dữ liệu non-audio hay video, SRTP không được sử dụng, thay vào đó là SCTP.
### SCTP
WebRTC sử dụng [SCTP](https://tools.ietf.org/html/rfc4960) (Stream Control Tranmission Protocol)  để truyền dữ liệu non-media giữa các peer. Giao thức SCTP là giao thức vận chuyển tương tự như TCP và UDP,có thể chạy trực tiếp trên giao thức IP. SCTP được lựa chọn do có những tính năng tốt của TCP và UDP như message-oriented transmission, khả năng cấu hình tùy biến tính tin cậy và thứ tự gói tin, có cơ chế quản lý lưu lượng và chống nghẽn.
### DTLS
Datagram Transport Layer Security- [DTLS](https://tools.ietf.org/id/draft-ietf-tls-dtls13-01.html)  giao thức này cung cấp tính năng bảo mật và toàn vẹn dữ liệu. Tất cả các dữ liệu truyền P2P đều được bảo mật sử dụng DTLS.
### STUN
[NAT](https://tools.ietf.org/html/rfc1631) cung cấp một địa chỉ IP để sử dụng trong mạng nội bộ. Nhưng địa chỉ này không được sử dụng bên ngoài mạng. Không biết địa chỉ công khai sẽ không có cách nào để hai Peer có thể tương tác. Để giải quyết vấn đề đó WebRTC sử dụng STUN (Session Traversal Utilities for NAT) [8]. STUN server tồn tại trên mạng internet và chỉ có nhiệm vụ duy nhất là kiểm tra địa chỉ IP và cổng của yêu cầu vừa đến và gửi trở lại IP và cổng đó.Các ứng dụng sử dụng STUN server để cung cấp IP và cổng công khai từ internet. Từ đó một WebRTC peer có thể tự lấy được địa chỉ IP và cổng công khai và đưa nó cho các peer khác thông qua cơ chế signaling.Hình bên dưới mô tả về cách làm việc của STUN server:

![](https://images.viblo.asia/c14895bb-99ee-4fe0-a261-c31ccecec74c.jpg)
Mô tả cách thức hoạt động của STUN
### TURN
Traversal Using Relays around NAT ([TURN](https://tools.ietf.org/html/rfc5389)) . Được xây dựng nhằm vượt qua symmetric NAT bằng cách mở một kết nối tới TURN server và đáp lại tất cả thông tin thông qua server này (dữ liệu audio/video/data streaming giữa các peer, không phải signaling data).Turn server làm được điều này vì nó có một public địa chỉ, vì thế nó có thể liên lạc với các peer thậm chí peer có tường lửa hoặc proxy đứng sau. Hình dưới mô tả hoạt động của TURN server.

![](https://images.viblo.asia/7246c0f8-890b-43cb-925a-10982790ff73.jpg)

Mô tả cách thức hoạt động của TURN
### SDP
[Session Description Protocol](https://tools.ietf.org/html/rfc4566)  là một chuẩn mô tả các thông số của mỗi kết nối như là độ phân giải, định dạng, codecs, mã hóa… Điều này làm cho mỗi peer có thể hiểu nhau khi dữ liệu được truyền. Đây thực chất là meta-data miêu tả nội dung chứ không phải là dữ liệu media.
### ICE
[Interactive Connectivity Establishment](https://tools.ietf.org/html/rfc5245) là một chuẩn được sử dụng để thiết lập kết nối giữa các các peer trên internet.Mặc dù WebRTC là kết nối trực tiếp Peer-to-Peer, nhưng thực tế nó vẫn gặp phải vấn đề NAT (Network Address Translation) gây khó khăn khi kết nối.ICE sẽ cố gắng thiết lập kết nối bằng cách tìm đường đi tốt nhất cho kết nối.Bằng cách thử hết các khả năng song song nhau, ICE có thể chọn ra được lựa chọn hiệu quả nhất cho kết nối. Đầu tiên ICE cố gắng kết nối sử dụng địa chỉ host lấy được từ hệ điều hành hoặc card mạng. Nếu thất bại nó sẽ lấy địa chỉ IP public thông qua STUN server.Nếu vẫn thất bại, lưu lượng được gửi thông qua TURN server. Các cách để kết nối này được gọi là “candidate”, cách thức trao đổi sẽ được mô tả ở các phần bên sau. 
## 1.4 Một số kiến trúc của hệ thống WebRTC
Kiến trúc của một ứng dụng web cơ bản khá đơn giản.Vận chuyển thông tin giữa browser và web server chúng ta sử dụng HTTP chạy trên giao thức TCP hoặc có thể nâng cao hơn là trên Websocket. Thông tin được đặt trong các đoạn mã Hyper-Text Markup Language, HTML. Các đoạn mã này có thể bao gồm Javascript và Cascading Style Sheets (CSS). Trường hợp phổ biến là browser gửi một yêu cầu HTTP tới webserver, tiếp đó server sẽ xử lý yêu cầu mà browser cung cấp và đáp lại yêu cầu đó tới browser. Trong một số trường hợp phức tạp khác là server gửi server gửi Javascript chạy trên browser.Server sẽ tương tác với browser thông qua APIs còn lại người dùng sẽ tương tác với browser thông qua các sự kiện. Browser trao đổi thông tin với server thông qua HTTP mở hoặc WebSocket .
![](https://images.viblo.asia/8bbfba5b-d6b6-4994-86e0-5db6f261ee55.jpg)
Kiến trúc của hệ thống web truyền thống

WebRTC có sự khác biệt với mô hình truyền thống là sử dụng P2P giữa các trình duyệt. Mặc dù sử dụng mô hình P2P xong cái ứng dụng WebRTC vẫn cần một server đứng trung gian để có trao đổi các thông tin cần thiết để hai trình duyệt có thể kết nối với nhau. Server này được gọi là signaling server, nó cần phải là một với chức năng thời gian thực (Real Time Communication hay RTC).Ngoài ra WebRTC cũng cung cấp cấp một số APIs để tương tác cũng như tận dụng khả năng của các trình duyệt.Hình mô tả kiến trúc của đơn giản WebRTC  

![](https://images.viblo.asia/28e655b4-4e0c-4764-8f77-5c3a1c5e90dd.jpg)

Kiến trúc phổ biến của hệ thống WebRTC

WebRTC không giới hạn kết nối giữa hai người dùng. Chúng ta có khả năng kết nối từ một người dùng đến nhiều người dùng khác.Hình mô tả có nhiều hơn hai peer được kết nối với nhau.

![](https://images.viblo.asia/dcfd0759-c9d6-4dc5-b5b8-aedacebcff60.jpg)
Minh họa hệ thống WebRTC khi có nhiều người dùng kết nối với nhau

Như ta thấy ở hình trên, bất cứ khi nào ta muốn kết nối tới một user khác ta cần tạo peer thêm peer để kết nối với hai bên. Theo hình trên, như ta thấy ở trên mỗi peer sẽ có 2 luồng kết nối.Chúng ta cho là  khi ta có 10 peer kết nối với nhau với một, chúng ta kiểm tra là mỗi peer kết nối mất khoảng 500kbps, nếu vậy 10 kết nối sẽ tốn chi phí là gần 5mbps. Nếu ta sử dụng mạng ADSL với băng tần 3mbps, chúng ta không thể kết nối đến tận 10 peer. Thêm vào đó với sự phát triển về công nghệ như hiện nay, việc tăng trải nghiệm của người dùng khi thực hiện các kết nối là điều cần thiết (ví dụ như là ứng dụng Computer Vision hay AR trong việc stream video…).Với giới hạn về thiết bị hiện nay thật khó để các kết nối có thể thực hiện những điều trên. Với nhu cầu đó, người ta đưa ra một ý tưởng là có một server riêng, server này có trách nhiệm trung gian chuyển/nhận các luồng dữ liệu tới các peer. Với điều này các peer chỉ cần nhận/truyền stream từ server đó. Điều này làm giảm gánh nặng cho bên phía người dùng bên bị giới hạn bởi thiết bị của mình (như là thiết bị di động, trình duyệt web…), nhất là khi có rất nhiều peer kết nối với nhau.Server này được gọi là media server, hình dưới minh hóa kiến trúc của hệ thống WebRTC khi thêm media server.
![](https://images.viblo.asia/ca963a96-d767-400d-8a19-aecfce80159f.jpg)
Kiến trúc đơn giản của WebRTC khi thêm vào Media Server

Với việc thêm vào Media Server ta thấy rõ sự giảm tải giữa các peer kết nối. Mỗi peer bây giờ chỉ cần giữ kết nối tới một Media Server. Điều này giải quyết được vấn đề đề cập đến trước đó với 10 peer kết nối.Và với thời đại công nghệ phát triển như hiện nay, việc tăng trải nghiệm cho người dùng là một rất cần thiết và quan trọng.Vì thế với một server riêng biệt chúng ta có nhiều sức mạnh hơn trong việc thực hiện các tác vụ video nâng cao tăng tương tác với người dùng.Hiện tại thì có hai loại Media Server phổ biến được dùng là MCU và SFU.

### MCU

Multipoint Controller Unit là một kiểu chiến lược cho phép tối ưu việc nhiều peer kết nối với nhau.Với MCU thay vì các peer được thiết lập kết nối với tất cả các peer khác,nó chỉ cần thiết lập kết nối với một media server trung gian. Media server này có trách nghiệm nhận/chuyển tới các peer khác.Dưới đây hình minh họa của MCU:
![](https://images.viblo.asia/3c53c3e6-03fa-4a90-9374-c414edae160f.jpg)
Minh họa cách thức hoạt động của mô hình MCU

| Người dùng | Streams/người dùng  | Tổng cộng |
| -------- | -------- | -------- |
| n    | 2n     | 2n     |
Bảng thống kê các peer và luồng stream tham gia khi hoạt động theo mô mình MCU

Với một media server ở giữa ta có thể nhận thấy sự giảm phụ thuộc vào các peer kết nối với nhau.Về cơ bản MCU nhận tất cả stream từ tất cả các peer, giải mã các stream này và sau đó tạo một layout trộn lẫn tất cả các stream này. Cuối cùng nó giải mã và gửi đến tất cả các peer khác. Ưu điểm của MCU là đơn giản và tránh được vấn đề về hiệu suất khi có nhiều peer kết nối.Nhưng một điều ta có thể nhận thấy ở đây là MCU trộn lẫn các luồng stream với nhau, điều này dẫn đến việc chúng ta khó có thể có được những luồng stream nguyên dạng ban đầu ( có thể chất lượng video kém hơn) hoặc có một vài độ trễ khi sử dụng. Một điều không tránh khỏi là thêm một server đứng giữa rất tốn kém. Bên cạnh đó media server phải mã hóa và giải mã lên tốn khá nhiều tài nguyên hệ thống như băng thông,CPU.
### SFU
Một cách tiếp cận khác ở đây là Select Forwarding Unit (SFU). Tương tự như MCU có một server trung gian ở giữa, nhưng SFU có phần cải tiến hơn. Thay vì phải xử lý nhiều công đoạn như giải mã, trôn, sau đó giải mã, SFU đơn giản chỉ giải mã và gửi tới các peer khác khi người dùng gửi một luồng stream tới.Việc này làm làm cho các luồng stream có thể chất lượng tốt hơn do không phải trộn như media server.Và độ trễ thấp hơn khi không phải trải qua nhiều giai đoạn như MCU. Hình dưới mô tả SFU:
![](https://images.viblo.asia/c2cd2c73-77d5-4725-95a5-c3e7be4c8927.jpg)
Mô tả cách thức hoạt động của mô hình SFU

| Người dùng | Streams/người dùng  | Tổng cộng |
| -------- | -------- | -------- |
| n    | n     | n^2     |
Bảng thống kê các peer và luồng stream tham gia khi hoạt động theo mô mình SFU.

# Kết luận
Vừa rồi về bài giới thiệu qua về WebRTC và media server. Sử dụng WebRTC tương đối hiệu quả với các ứng dụng yêu cầu ít peer kết nối cũng như là các ứng dụng không yêu cầu nhiều tính toán hiêu năng cao. Để xử lý các ứng dụng **nặng** như AR, nhận diện khuông mặt hoặc các ứng dụng yêu cầu nhiều peer kết nối như video conference ta cần sử dụng media server. Nhưng việc xây dựng một media server rất tốn kém do ta phải có hiểu biết nhất định các luồng stream và xư lý chúng. Chính vì thế có một số open source giúp cho ta có thể xây dựng hệ thống WebRTC dễ dàng có thể kể đến như  Intel Collaboration Suite for WebRTC (Intel CS for WebRTC), Janus WebRTC gateway, Jitsi VideoBridge, Lincode, MediaSoup, Kurento Media Server… 
# Tài liệu tham khảo
[1]“WebRTC.” [Online]. Available: https://en.wikipedia.org/wiki/WebRTC. 

[2]B. J. Alan and C. B. Daniel, WebRTC: APIs and RTCWEB Protocols of the HTML5 Real-Time Web. 2007. 

[3]S. Loreto and R. S. Pietro, Real-time Communicate with WebRTC. 2007.