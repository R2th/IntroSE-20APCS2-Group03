Trong thời đại công nghệ ngày càng phát triển, điện thoại không chỉ dùng để nghe và gọi, bên cạnh đó máy tính cũng chỉ có thể giới hạn sử dụng trong một số lĩnh vực, một số nhóm người hay tổ chức nhất định. Giờ đây, nhờ có mạng không dây, sự kết hợp của 2 thiết bị này mang đến cho người dùng khả năng vượt trội và trong thời gian tới, có thể nó sẽ làm thay đổi tương lai của thế giới.
<br>
Vì sự thiết yếu của nó, để đảm bảo chất lượng thì ngành kiểm thử phần mềm cũng dần được triển khai rộng rãi trên thiết bị di động. 
<br>
### I. Thiết bị di động và một số nền tảng di động hiện nay
**1. Thiết bị di động**<br>
Thiết bị di động là một thiết bị máy tính kích thước nhỏ gọn có thể bỏ túi, điển hình là với màn hình hiển thị với các phím cảm ứng hoặc các bàn phím nhỏ<br>
**2. Một số nền tảng di động hiện nay**<br>
Hiện nay trên thế giới có một số loại nền tảng như: 
- iOS (được sử dụng trên dòng máy iPhone, ipad)
- Android (sử dụng trên dòng máy Samsung, Sony,...)
- WindowPhone (Sử dụng trên dòng máy Nokia, HTC,...)<br>

**3. Ứng dụng trên thiết bị di động**<br>
Đối với ứng dụng di động có thể chia làm 3 loại:
- Ứng dụng gốc (Native app): Là những ứng dụng viết riêng cho một loại nền tảng như iOS, android,... bằng các ngôn ngữ lập trình tương đương với mỗi nền tảng đó
- Ứng dụng Web (Web app): Là ứng dụng chạy trên nền web, người dùng thiết bị di động có thể có thể sử dụng các trình duyệt khác nhau như Chrome, FireFox,... để truy cập vào web server để sử dụng
- Ứng dụng lai (Hybrid app): Là sự kết hợp giữa ứng dụng gốc và ứng dụng web, có thể chạy offline và online và thường sử dụng kỹ thuật làm web như HTML5, CSS,...
### II. Kiểm thử ứng dụng cho thiết bị di động
**1. Định nghĩa**
- Là kiểm tra các ứng dụng cho các thiết bị di động cầm tay về chức năng, tính khả dụng và nhất quán
- Như với bất kỳ ứng dụng nào, thử nghiệm ứng dụng trên thiết bị di động cũng rất quan trọng, vì nếu để xảy ra lỗi sẽ gây ra hậu quả vô cùng nghiêm trọng như: ảnh hưởng đến hình ảnh công ty, tổn thất về tiền bạc và có thể liên quan đến một số vấn đề về pháp lý.
![](https://images.viblo.asia/97ad36e9-1ec3-45f3-b6be-921c19cc648a.png)


**2. Sự khác biệt về kiểm thử di động so với các loại kiểm thử khác**<br>
*2.1. Sự đa dạng về thiết bị*<br>
Không giống như kiểm thử trên máy tính, các ứng dụng mobile có thể tích hợp trên rất nhiều loại thiết bị với cấu hình khác nhau:
- Đa dạng các hãng sản xuất thiết bị như HTC, SamSung, Apple, Nokia... với các kích thước màn hình và cấu hình phần cứng khác nhau...
- Đa nền tảng (iOS 6,7,8; Android 4.2; 4.3; 4.4,...)
- Các thiết bị di động có thời gian chạy ứng dụng khác nhau<br>
![](https://images.viblo.asia/7eb8d7dd-499a-4a11-b879-282a460f7075.jpg)

*2.2. Sự khác biệt về phần cứng*<br>
Đối với máy tính có rất nhiều không gian để thiết kế, song trên thiết bị di động rất hạ chế về không gian, các linh kiện nhỏ, nên đặt ra thách thức về phần cứng đối với thiết bị:
- Giới hạn tốc độ xử lý
- Giới hạn dung lượng thiết bị
- Sự khác biệt về giao thức<br>
![](https://images.viblo.asia/79be2e7e-c20a-4688-ad68-67c4367edc93.png)

*2.3. Đường truyền mạng*<br>
Với máy tính để bàn/Laptop có thể dùng đường truyền có dây, tốc độ nhanh và ổn định thì với thiết bị di động lại sử dụng kết nối không dây nên có một số thách thức như:
- Đa dạng các loại mạng (GSM/GPRS/WIFI/3G/4G…)
- Không dự đoán được thời gian cho truyền tải dữ liệu
- Khác biệt về tốc độ kết nối thông qua vật lý
- Đa dạng các nhà điều hành mạng với những tính năng mạng khác nhau<br>
![](https://images.viblo.asia/69a084f5-9e09-496f-9828-36490d23e60e.jpg)

**3. Một số testcase đặc biệt cho kiểm thử các ứng dụng di động**<br>
Điều này rất quan trọng đối với những người kiểm thử trên nền tảng Android và iOS bởi vì chúng có sự khác biệt rất lớn: khác biệt về giao diện, lượt xem ứng dụng, tiêu chuẩn mã hóa, hiệu suất,…<br>
- **Đối với giao diện (Test UI):** vì có rất nhiều thiết bị có sẵn trên thị trường và tất cả chúng đều có độ phân giải và kích thước màn hình khác nhau nên với một ứng dụng kiểm thử viên sẽ phải kiểm tra trên nhiều thiết bị có kích thước và độ phân giải màn hình khác nhau<br>
***Ví dụ:*** Trên Android, các nhà phát triển phải sử dụng hình ảnh 1x, 2x, 3x, 4x và 5x để hỗ trợ độ phân giải hình ảnh cho tất cả các thiết bị, trong khi iOS chỉ sử dụng 1x, 2x và 3x. Tuy nhiên, trách nhiệm của người kiểm thử là đảm bảo rằng hình ảnh và các thành phần UI khác được hiển thị chính xác trên tất cả các thiết bị.<br>
Bạn có thể tham khảo sơ đồ bên dưới để hiểu khái niệm về độ phân giải hình ảnh:
![](https://images.viblo.asia/08d36453-4422-4436-96d9-22ca43831b72.jpg)
<br>

Ngoài ra, trên thiết bị di động người dùng còn có thể xoay ngang màn hình, người kiểm thử cũng cần đảm bảo khi thiết bị xoay ngang/dọc màn hình thì các hình ảnh và các thành phần UI khác không xảy ra vấn đề gì. Bên cạnh đó, còn cần kiểm tra màu sắc, phong cách Menu, nhất quán của giao diện người dùng trên các thiết bị khác nhau,...

**- Kiểm thử chức năng (Test Function)**: Kiểm tra các chức năng chính của ứng dụng di động theo đặc điểm kĩ thuật của thiết bị. Kiểm thử chức năng trên mobile thường bao gồm kiểm thử tương tác người dùng và kiểm thử giao dịch. Những yếu tố khác liên quan đến kiểm thử chức năng là:
- Loại ứng dụng (Ứng dụng cho lĩnh vực ngân hàng, trò chơi, kinh doanh,...)
- Đối tượng (doanh nghiệp, người tiêu dùng, người quản lý,...)
- Xác nhận trên thiết bị (thông báo với người dùng, khi khởi động, khi tạm dừng app, liên kết các tài khoản xã hội,...)
- Hoạt động của app khi liên tục chọn một chức năng hoặc bấm vào màn hình (hiển thị 1 trang liên kết tùy theo yêu cầu của khách hàng, app không bị crash,...)
- Kiểm tra khi load data (vuốt màn hình, reload khi đường truyền kém,...)
![](https://images.viblo.asia/66887b80-1431-47c6-a9b4-fcf0494369b5.jpg)

**- Khác:** Ngoài những case cần lưu ý trên, trên thiết bị di động khi test còn cần lưu ý một số trường hợp sau:
- Sự hao tổn pin: Việc theo dõi sự hao tổn pin khi chạy ứng dụng trên thiết bị di động rất quan trọng.
- Tốc độ chạy ứng dụng: Theo dõi thời gian respond time trên các thiết bị khác nhau với các dung lượng bộ nhớ khác nhau, tốc độ mạng khác nhau...
- Yêu cầu bộ nhớ: Khi tải và cài đặt app, chạy app..
- Kiểm tra các chức năng của ứng dụng: Để đảm bảo ứng dụng không bị crash khi mất kết nối mạng hoặc các tác động ngoại vi khác.

**Nguồn tham khảo:** <br>
https://techblog.vn/tim-hieu-ve-mobile-app-testing