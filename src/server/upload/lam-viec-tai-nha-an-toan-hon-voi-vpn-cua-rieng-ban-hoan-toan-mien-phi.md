# Mở đầu
Lại một đợt dịch mới quay lại với nhiều tin tức xấu hơn sau mỗi lần bùng phát, cũng vì thế là công việc WORK FROM HOME lại quay trở lại với rất nhiều ngành nghề và đặc biệt là anh em IT. Hôm nay mình sẽ giới thiệu với anh em một phần mềm VPN Open Source cài đặt vô cùng đơn giản và hoàn toàn miễn phí giúp anh em làm việc ổn định và an toàn hơn từ nhà trong mùa dịch thế này.

Cụ thể hơn trong bài viết này mình sẽ hướng dẫn các bạn cài đặt và sử dụng OpenVPN trên nền tảng Google Cloud Platform. Google Cloud Platform sẽ cho bạn 300$ miễn phí để sử dụng khi tạo tài khoản mới, thế nên tính ra bạn có thể sử dụng VPN miễn phí tới 30 tháng lận. Việc đăng ký tài khoản và nhận 300$ trên mạng có rất nhiều các bạn tự tìm hiểu nhé! 

# Cài đặt OpenVPN trên GCP
Sau khi đã có tài khoản GCP bạn truy cập vào trang dashboard tại  https://console.cloud.google.com/ và truy cập vào mục Compute Engine để tạo máy ảo.

**Tip:** Nếu bạn vào trang mà bị đổi sang ngôn ngữ khác không phải tiếng anh thì bạn có thể thêm **"&hl=en"** vào phía sau URL, ngôn ngữ sẽ được chuyển về tiếng anh.

![](https://images.viblo.asia/88d5322b-2058-4cff-bbe6-2d0a78f410fe.png)

Tại mục này bạn tiến hành tạo 1 Instance mới **CREATE INSTANCE**. Tại phía bên trái màn hình bạn chọn Marketplace và tìm kiếm từ khóa OpenVPN. Chọn mục đầu tiền "OpenVPN Access Server" và Lanch để khởi tạo.

![](https://images.viblo.asia/ff640752-7ccf-407e-ba75-c3da948acbe3.png)

Tiếp theo ta đến với thông số cấu hình ban đầu cho OpenVPN, về cơ bản thì tất cả đã được cài đặt chuẩn để chạy. Tuy nhiên có 1 vài phần ta phải lưu ý:

* **Zone:** Đây sẽ là vị trí ta đặt máy chủ VPN. Tùy vào nhu cầu sử dụng của các bạn mà có thể chọn các vị trí khác nhau, nhưng hầu hết nên chọn vị trí ở gần mình nhất để tránh delay. Nếu bạn không biết zone đó là vị trí nào thì có thể tra ở đây: https://cloud.google.com/compute/docs/regions-zones
* **Machine Type:** Còn đây là cấu hình tài nguyên của máy chủ, mặc định sẽ là 1 shared CPU và 1,7GB Ram, cấu hình này là vừa đủ cho nhu cầu sử dụng cá nhân < 80Mbps. Nếu có nhu cầu sử dụng nhiều hơn bạn có thể tăng lên hoặc điều chỉnh sau khi khởi tạo.

Các mục còn lại là cấu hình các port cần thiết cho service OpenVPN chúng ta không được tắt. Nhấn **Deploy**    để khởi tạo.

Ta sẽ được chuyển đến 1 trang có địa chỉ VPN Server và các thông tin về tài khoản admin, đừng tắt tab này vội.
![](https://images.viblo.asia/109067e1-5494-41e6-bc17-7ab104a607ed.png)

Vậy là chúng ta đã khởi tạo xong VPN Server. Giờ sẽ đến bước cấu hình 1 chút cho VPN Server này giúp ẩn IP và kết nối mạng.
# Cấu hình OpenVPN
Truy cập Admin URL ở tab trên và đăng nhập với thông tin là  Admin User - Admin Password. Giao diện OpenVPN sẽ như hình - khá đơn giản và thân thiện người dùng.

![](https://images.viblo.asia/72629441-977f-4b65-bb53-1c7a97e55159.png)

Tiếp theo vào mục **CONFIGURATION => VPN Settings**, tại mục **Routing** ta bật chế độ **"Should client Internet traffic be routed through the VPN?"** . Việc này sẽ giúp ẩn IP thật của bạn khi kết nối qua VPN mà thay vào đó là IP của VPN Server. 

Cũng tại trong phần này tại mục **DNS Settings** chọn **"Have clients use specific DNS servers"** và nhập 2 DNS của CloudFlare là **1.1.1.1** và **1.0.0.1** . Sau đó **Save Settings** và kéo lên chọn **Update Running Server**.

![](https://images.viblo.asia/51fb0599-f411-4154-aeab-1fa9f12b67dd.png)

![](https://images.viblo.asia/6348a2b6-6ae8-4a2a-8ff3-86ae6162d880.png)

Vậy là đã cài đặt và cấu hình Server VPN real quick.

# Cài OpenVPN Client để kết nối VPN
Truy cập vào **Site Address** ở tab thông tin Server phía bên trên. Đăng nhập lại với **Admin User** và **Admin Password** , tải về bản phù hợp với hệ điều hành.

![](https://images.viblo.asia/1f8bfe95-2321-40b1-8ccb-075d5d092907.png)

Hoặc bạn có thể chọn tải về **Profile** để import vào phần mềm mà không cần nhập User và Pass khi sử dụng cho tiện.

![](https://images.viblo.asia/9540179f-a364-42cd-9c00-39dc51f6f94e.png)
![](https://images.viblo.asia/ded3ec11-0821-4272-812c-68a8152ff3eb.png)

Nhập Admin User và Password để kết nối. Vậy là bạn đã có VPN Server của riêng mình, miễn phí.

# Tùy chỉnh 
* Bạn có thể tạo nhiều User với các quyền khác nhau trong phần **User Management**.
* Tùy chỉnh dải IP Private, Https certificate, phương thức xác thực,... trong phần **Configuration**.

# Ưu nhược điểm
Ưu điểm:

*    Cài đặt nhanh chóng dễ dàng.
*    Sử dụng trên được hầu hết các nền tảng: Desktop, Mobile

Nhược điểm:
* Bị giới hạn số lượng kết nối 2 Connections

# Kết
Hy vọng bài viết này cho bạn được 1 chút kiến thức mới. Have a nice day.