Hiện nay thì các thiết bị di động thông minh rất phổ biến. Với vô vàn ứng dụng miễn phí và những trải nghiệm tuyệt vời thì android là một trong những hệ điều hành phổ biến được sử dụng cho các thiết bị này. Là một web developer thì mình cũng tập tành học làm một ứng dụng android đơn giản. Trong bài viết này mình giới thiệu một số kiến thức cơ bản về android mà mình đã tìm hiểu. Bắt đầu nào :D
## Giới thiệu về hệ điều hành Android
### Hệ điều hành di động
- Là phần mềm hệ thống chạy trên thiết bị di động, dùng để điều hành, quản lý các phần cứng và tài nguyên phần mềm của thiết bị di động,
- Các thiết bị di động chạy hệ điều hành di động như điện thoại thông mình, máy tính bảng, đồng hồ thông minh...
### Lịch sử hệ điều hành Android
- Tổng công ty Android được thành lập tại Palo Alto, California vào tháng 10 năm 2003 bởi Andy Rubin, Rick Miner, Nick Sears và Chris White
- 17/8/2005 Google mua lại tổng công ty Android và biến nó trở thành một bộ phận trực thuộc Google.
- 5/11/2007 Liên minh thiết bị cầm tay mở được thành lập bởi nhiều công ty và trong đó có goolge.
- 22/10/2008: chiếc điện thoại đầu tiên được phát hành là HTC Dream.
- Từ 2008 đến nay android rất phát triển và cập nhật qua nhiều phiên bản điện thoại khác nhau.
### Các đặc trưng cơ bản của hệ điều hành Android
- Kết nối: GSM/EDGE, IDEN, CDMA, EV-DO, UMTS, Bluetooth, Wifi. LTE, NFC, WiMax
- Lưu trữ: Sử dụng cơ sở dữ liệu SQLite, lưu trữ dữ liệu trong bộ nhớ thiết bị, lưu trữ dữ liệu kiểu key-value
- Hỗ trợ media: Theo chuẩn H.263, H.264, MPEG-4 SP, AMR, AMR-WB, AAC, HE-AAC, AAC 5.1, MP3, MIDI, Ogg Vorbis, WAV, JPEG, PNG, GIF, BMP
- Tin nhắn: SMS, MMS
- Web brower: Dựa trên bộ thư viện mã nguồn mở Webkit
- Hỗ trợ thiết bị phần cứng: Accelerometer sensor, camera, digital compass, Proximitty sensor, GPS
- Đa chạm: Hỗ trợ màn hình đa chạm
- Đa nhiệm: Ứng dụng có khả năng hoạt động đa nhiệm
- Chia sẻ kết nối internet: Hỡ trợ chia sẻ kết nối internet như điểm truy cập có dây / không dây
- Hỗ trợ flash
- Hỗ trợ widget tùy biến: Widget có khả năng tùy biến cho phép người dùng mở rộng hoặc thu nhỏ lại để xem thông tin cho phù hợp
- Đa ngôn ngữ: Hỗ trợ hiển thị đa ngôn ngữ
### Kiến trúc hệ điều hành Android

![](https://images.viblo.asia/69ed2458-b4a1-493c-a53e-1221ac483109.png)

- Linux Kernel:
    + Android sử dụng nhân Linux
    + Tầng này cung cấp chức năng hệ thống cơ bản như giao tiếp với tầng trên, bảo mật, quản lý bộ nhớ, quản lý các tiến trình, ngăn xếp mạng và trình điều khiển thiết bị (máy ảnh, bàn phím, màn hình hiển thị, giao tiếp USB, giao tiếp hồng ngoại, không đây, v.v…).
    + Ngoài ra, nhân Linux này cũng có vai trò như một lớp trừu tượng giữa phần cứng và phần mềm
- Libraries:
    + Android cung cấp một tập hợp các thư viện C/C++ như:
    <br>
    • OpenGL: thư viện dùng để tạo ra các đồ họa 3D dựa vào chuẩn OpenGLES 1.0
    <br>
    • FreeType: thư viện hỗ trợ xử lý bitmap, font, vector.
<br>
    • SGL: thư viện cơ bản cung cấp các engine đồ họa 2D.
<br>
    • Libc : thư viện C chuẩn, được tối ưu cho các thiết bị Linux-based.
<br>
    • SQLite: thư viện thao tác với cơ sở dữ liệu quan hệ nhỏ gọn SQLite.
<br>
    • SSL : thư viện hỗ trợ sử dụng giao thức mã hóa SSL (Secure Sockets Layer) trong bảo mật truyền thông Internet.
<br>
- Android Runtime:
    + Android runtime cung cấp một tập các thư viện lõi cho phép các nhà phát triển viết các ứng dụng Anroid sử dụng ngôn ngữ lập trình Java. Ngoài ra, Android runtime cung cấp máy ảo Dalvik – một loại máy ảo Java được thiết kế đặc biệt và tối ưu hóa cho Android. Máy ảo Dalvik sử dụng các tính năng cốt lõi của Linux như quản lý bộ nhớ và đa luồng. Máy ảo Dalvik cũng cho phép tất cả các ứng dụng Android chạy trong tiến trình riêng của nó.
- Application Framework:
    + Application Framework cung cấp các service cấp cao hơn cho ứng dụng cho các lớp java
    + Activity Manager: Điều khiển các khía cạnh của vòng đời ứng dụng và Activity Stack 
    + Content Provider: Cho phép các ứng dụng publish và chia sẻ dữ liệu với các ứng dụng khác
    + Resource manager: Cung cấp truy cập tới các resource như chuỗi, cài đặt màu sắc hay bố cục UI
    + Notifications Manager: Cho phép các ứng dụng hiển thị thông báo tới người dùng
    + View System: Một tập hợp các view được sử dụng để tạo UI cho ứng dụng
- Applications:
    + Đây là tâng trên cùng trong kiến trúc của hệ điều hành Android. Mặc định Android tích hợp sẵn một số ứng dụng cần thiết cơ bản như: home, contacts, phone, browser, camera,...
    + Tất cả ứng dụng được viết bằng ngôn ngữ Java và được quản lý bởi máy ảo Dalvik
    + Ứng dụng được phát hành trên các kho ứng dụng (ví dụ: Google Play, Amazon Appstore), người dùng đầu cuối có thể vào kho tải ứng dụng về máy.
### Quá trình khởi động HĐH vào điện thoại Android
![](https://images.viblo.asia/07879515-d3bc-401a-967f-ca710a5be378.png)
- Phần Daemons làm nhiệm vụ quản lý phần cứng cấp thấp (ví dụ: usb, adb,debuger,radio…).
- Tiến trình mồi Zygote được gọi nhằm khởi động máy ảo Dalvik (Dalvik VM) để chạy các ứng dụng.
- Tiến trình Runtime được gọi nhằm khởi động trình quản lý dịch vụ (Service Manager). Bất cứ một dịch vụ chạy ngầm nào đều phải được đăng ký với Service Manager (Ví dụ: Surface Manager, Audio Manager…)
## Kết luận
Trong bài viết này mình đã giới thiệu với các bạn một số kiến thức cơ bản về hệ điều hành android. Trong bài viết sau mình tìm hiểu về Activity và vòng đời của ứng dụng android. Cảm ơn các bạn đã theo dõi bài viết của mình <3