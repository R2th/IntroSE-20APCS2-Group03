> Chào các bạn,  hiện giờ mình đang tự tìm hiểu và làm chức năng họp trực tuyến cho blog của mình sử dụng WebRTC. Hôm nay mình muốn chia sẻ với mọi người những gì mình biết và cùng nhau tìm hiểu thêm về WebRTC.
# Giới thiệu về WebRTC.
###   1: Sơ lược lịch sử của WebRTC

Ý tưởng phát triển WebRTC được nhóm kỹ sư chịu trách nhiệm cho Google Hangouts đưa ra từ tận năm 2009. Vào thời gian đó, để truyền tải video, hình ảnh trên web thì người ta thường phải xài đến Flash. Nhóm kỹ sơ Hangouts lại không muốn sử dụng công nghệ này, và họ bắt đầu tự làm một chuẩn riêng cho mình. Đến năm 2010, Google thâu tóm hai công ty On2 và Global IP Solutions (GIPS) để lấy công nghệ truyền dữ liệu thời gian thực làm nền tảng cho WebRTC về sau.

Vào tháng 5/2011, Google ra mắt một dự án nguồn mở dành cho việc giao tiếp thời gian thực giữa trình duyệt với nhau, và từ lúc này dự án mang tên WebRTC. Song song đó, Hiệp hội World Wide Web (W3C) và Hiệp hội Kĩ sư quốc tế (IETF) cũng đang phát triển một số giao thức để dùng cho việc việc kết nối thời gian thực, thế nên họ bắt tay nhau tiếp tục hoàn thiện để rồi quyết định kết hợp chung vào WebRTC.

Đến 27/10/2011, W3C ra mắt bản nháp đầu tiên của WebRTC. Tháng 11/2011, Chrome 23 ra mắt, trở thành trình duyệt đầu tiên có tích hợp WebRTC ngay từ bên trong. Và tính đến thời mà mình viết bài này thì WebRTC vẫn còn đang tiếp tục được phát triển chứ chưa hoàn thiện một cách chính thức.
###   2: WebRTC là gì?

WebRTC là viết tắt của cụm từ Web Real-Time Communication. Là một web API được phát triển bởi World Wide Web Consortium (W3C), khả năng hỗ trợ trình duyệt (browser) giao tiếp với nhau thông qua VideoCall, VoiceCall hay transfer data [Peer-to-Peer](https://en.wikipedia.org/wiki/Peer-to-peer) (P2P) mà không cần browser phải cài thêm plugins hay phần mềm hỗ trợ nào từ bên ngoài.
###   3: Các phần chính của WebRTC và chức năng của WebRTC API.
Các phần chính của WebRTC bao gồm:

* getUserMedia, cho phép trình duyệt web truy cập vào camera và/hoặc microphone để lấy dữ liệu hình ảnh âm thanh cho việc truyền tải.
* RTCPeerConnection dùng để cài đặt videocall/voicecall dùng cho việc truyền tải.
* RTCDataChannel cho phép trình duyệt chia sẻ dữ liệu peer-to-peer.

WebRTC API bao gồm chức năng:

* getStats cho phép ứng dụng web lấy tập hợp các số liệu thống kê về các session WebRTC.
###   4: WebRTC dùng để làm gì ?

WebRTC có thể được sử dụng cho truyền tải video, âm thanh cho đến gửi dữ liệu theo thời gian thực giữa hai hoặc nhiều thiết bị với nhau mà không nhất thiết phải đi qua server trung gian.
# Giới thiệu về Kurento.
###   1: Kurento là gì?

Kurento là một máy chủ truyền thông WebRTC và một bộ API khách hàng giúp đơn giản hóa việc phát triển các ứng dụng video nâng cao
cho các nền tảng web và điện thoại thông minh. Các tính năng của nó bao gồm liên lạc nhóm, chuyển mã, ghi âm, trộn, phát sóng và định tuyến của dòng nghe nhìn.
Kurento cung cấp một khung đa phương tiện giúp giảm bớt nhiệm vụ xây dựng các ứng dụng đa phương tiện với những tính năng, đặc điểm sau đây:
* **Dynamic WebRTC Media pipelines**: Kurento cho phép media pipelines tùy chỉnh được kết nối với các peers WebRTC
như trình duyệt web và ứng dụng di động. Các media pipelines này dựa trên các yếu tố có thể kết hợp như người chơi,
máy ghi âm, máy trộn, v.v ... có thể được trộn và kết hợp, kích hoạt hoặc hủy kích hoạt tại bất kỳ thời điểm nào.
* **Client/Server Architecture**: Các ứng dụng được phát triển với Kurento tuân theo kiến trúc client/server.  Kurento Media
Server (KMS) là máy chủ và cung cấp giao diện WebSocket thực hiện giao thức Kurento, cho phép ứng dụng client để xác định cấu trúc liên kết pipelines.
* **Java and JavaScript Client Applications**: Trường hợp sử dụng điển hình của việc triển khai KMS bao gồm một trình duyệt
kiến trúc, nơi trình duyệt người dùng tương tác với máy chủ KMS bằng Máy khách trung gian ứng dụng. Có một số thư viện Kurento chính thức, hỗ trợ việc sử dụng Java và JavaScript cho ứng dụng client. Các client cho các ngôn ngữ khác có thể dễ dàng thực hiện theo giao thức WebSocket.
* **Third party Modules**: Kurento Media Server có kiến trúc mở rộng dựa trên các plugin, cho phép các bên thứ ba để thực hiện các mô-đun có thể được thêm vào đường ống truyền thông của họ. Điều này cho phép tích hợp phương tiện truyền thông
xử lý các thuật toán cho bất kỳ ứng dụng WebRTC nào, như tích hợp Thị giác máy tính, Công nghệ thực tế ảo, Video, và phân tích giọng nói. Tất cả cần thiết là tạo ra một yếu tố Kurento mới và sử dụng nó trong bất kỳ media pipelines hiện có.

###   2: WebRTC media servers là gì?

WebRTC là một tập hợp các giao thức, cơ chế và API cung cấp trình duyệt và ứng dụng di động với Real-Time
Communications (RTC)  thông qua kết nối **[peer-to-peer](https://en.wikipedia.org/wiki/Peer-to-peer)**. Nó đã được hình thành như một công nghệ cho phép trình duyệt để giao tiếp trực tiếp mà không cần qua trung gian của bất kỳ loại cơ sở hạ tầng nào. Tuy nhiên, mô hình này chỉ đủ để tạo các ứng dụng web cơ bản; các tính năng như liên lạc nhóm, ghi dòng phương tiện, phương tiện truyền thông
phát sóng, hoặc chuyển mã phương tiện rất khó thực hiện. Vì lý do này, nhiều ứng dụng yêu cầu một máy chủ phương tiện trung gian.

![](https://images.viblo.asia/c8dbf05d-088b-470c-ac7f-0b3b3045439b.png)
Về mặt khái niệm, WebRTC media servers chỉ là một phần mềm trung gian đa phương tiện, nơi lưu lượng phương tiện truyền thông đi qua khi di chuyển từ nguồn đến đích.

Media servers có khả năng xử lý các luồng phương tiện đến và cung cấp các kết quả khác nhau, chẳng hạn như:
* Group Communications: Phân phối giữa một số người nhận luồng phương tiện mà một người ngang hàng tạo ra, tức là hoạt động như một đơn vị nhiều hội nghị (NGÀY MCU).
* Mixing: Chuyển đổi một số luồng đến thành một luồng tổng hợp duy nhất.
* Transcoding: Thích ứng nhanh chóng các codec và định dạng giữa các máy khách không tương thích.
* Recording: Lưu trữ một cách liên tục các phương tiện truyền thông trao đổi giữa các đồng nghiệp.
###   3: Kurento media server là gì?
Thành phần chính của Kurento là Kurento media server (KMS), chịu trách nhiệm truyền, xử lý phương tiện,
ghi âm và phát lại. KMS được xây dựng trên thư viện đa phương tiện GStreamer tuyệt vời và cung cấp các tính năng, đặc điểm sau :
* Các giao thức truyền phát được nối mạng, bao gồm HTTP, RTP và WebRTC.
* Truyền thông nhóm (chức năng MCU và SFU) hỗ trợ cả trộn phương tiện và định tuyến / gửi phương tiện.
* Hỗ trợ chung cho các bộ lọc thực hiện thuật toán Thị giác máy tính và Công nghệ thực tế ảo.

![](https://images.viblo.asia/969c8628-a8d6-46d6-9251-fe611d3a3edd.png)
* Bộ nhớ phương tiện hỗ trợ các thao tác ghi cho WebM và MP4 và phát ở tất cả các định dạng được hỗ trợ bởi
GStreamer.
* Tự động transcoding phương tiện giữa bất kỳ codec nào được GStreamer hỗ trợ, bao gồm VP8, H.264, H.263,
AMR, OPUS, Speex, G.711, v.v.

# Ví dụ về kurento với ứng dụng web livestream sample.
Đầu tiên các bạn phải cài đặt Kurento Media Server (KMS).
1. Chắc chắn rằng GnuPG đã được cài đặt.

```
 sudo apt-get update \
  && sudo apt-get install --no-install-recommends --yes \
     gnupg
```
2. Xác định phiên bản Ubuntu nào được cài đặt trong hệ thống của bạn.

```
# Chạy một trong những dòng sau:
DISTRO="xenial"  # KMS for Ubuntu 16.04 (Xenial)
DISTRO="bionic"  # KMS for Ubuntu 18.04 (Bionic)
```
3. Thêm Kurento repository cấu hình hệ thống của bạn.

Chạy hai lệnh này trong cùng một thiết bị đầu cuối bạn đã sử dụng ở bước trước:

```
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 5AFA7A83
```
```
sudo tee "/etc/apt/sources.list.d/kurento.list" >/dev/null <<EOF
# Kurento Media Server - Release packages
deb [arch=amd64] http://ubuntu.openvidu.io/6.10.0 $DISTRO kms6
EOF
```
4. Cài đặt KMS.

```
sudo apt-get update \
  && sudo apt-get install --yes kurento-media-server
```
sử dụng command sau để start, stop KMS.
```
sudo service kurento-media-server start
sudo service kurento-media-server stop
```
5. Kiểm tra cài đặt của bạn.

```
ps -ef | grep kurento-media-server

> nobody  1270  1  0 08:52 ?  00:01:00  /usr/bin/kurento-media-server
```
```
sudo netstat -tupan | grep kurento

> tcp6  0  0 :::8888  :::*  LISTEN  1270/kurento-media-server
```
Các bạn thực hiện theo các bước sau:
```
git clone https://github.com/hoaronal/livestream-demo.git
```
```
cd kurento-tutorial-java/kurento-one2many-call
```
```
mvn clean install
```
```
mvn spring-boot:run
```
Bây giờ các bạn có thể mở trình duyệt lên và nhập đường dẫn https://localhost:8443/, kết quả sẽ như sau.

![](https://images.viblo.asia/088f98f4-852a-4958-933e-ee4d043e7c68.png)

Click button "Presenter" để bắt đầu livestream, click button "Viewer" để xem livestream.

> Trên đây là một số kiến thức mình tìm hiểu được về WebRTC nói chung cũng như Kurento nói riêng, mong rằng có thể giúp ích được cho các bạn trong việc tìm hiểu về WebRTC.