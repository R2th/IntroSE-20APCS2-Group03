Đối với mỗi lập trình viên thì việc cài đặt máy chủ để chạy các mã nguồn mình lập trình là hết sức cần thiết. Như qua các bài viết trước mình đã hướng dẫn các bạn mua domain tại NameCheap: https://viblo.asia/p/huong-dan-dang-ky-ten-mien-domain-tai-namecheap-va-tro-ve-hosting-3Q75wXwQKWb và mua VPS tại Digital Ocean: https://viblo.asia/p/huong-dan-mua-vps-tai-digitalocean-m68Z0L1XZkG
Trong bài viết này mình sẽ hướng dẫn các bạn cài đặt Plesk trên VPS của Digital Ocean. Nếu bạn là một người chưa có nhiều kinh nghiệm quản trị Server thì Plesk là một công cụ rất hữu ích và tiện lợi.
## Plesk control panel là gì
Cùng với cPanel, DirectAdmin, Plesk control panel là một trong những phần mềm quản trị hosting phổ biến nhất hiện nay.
Plesk là một trong những Bảng điều khiển (Control Panel) rất phổ biến và chuyên nghiệp dành cho người quản trị Web Hosting với giao diện trực quan, dễ sử dụng. Plesk mang đến cho Khách hàng là nhà cung cấp dịch vụ rất nhiều hệ thống phần mềm hữu ích, tin cậy, ổn định. Plesk là công cụ quản trị Web Hosting có bản quyền và được phát hành bởi hãng Plesk Inc, có thể cài đặt được cả trên hệ điều hành Windows và Linux.
Đây là giải pháp về Control Panel toàn diện nhất dành cho Web Hosting bao gồm các dịch vụ như web, thư điện tử, cơ sở dữ liệu, tên miền … Plesk là phần mềm quản lý hosting duy nhất tích hợp với tính năng thiết kế web, giao diện storefront SaaS và phân hệ Billing. Plesk mang đến lợi nhuận tối đa để cho nhà cung cấp dịch vụ Web Hosting. Vì vậy Plesk là sự lựa chọn hàng đầu của các nhà cung cấp hosting, thiết kế web, chuyên viên tin học và các đối tác kinh doanh.
## Đối tượng sử dung Plesk
Với những tính năng nổi bật của mình, Plesk được đánh giá rất cao hiện nay từ các chuyên viên tin học, chuyên viên thiết kế web, các nhà cung cấp hosting đến các đối tác kinh doanh,…
Mỗi phiên bản của Plesk phù hợp với những đối tượng riêng:
* Quản trị hệ thống: phiên bản Web Admin Edition
* Nhà phát triển ứng dụng Web hoặc Đơn vị quản lý site của khách hàng: Web Pro Edition
* Công ty Web Hosting cung cấp bán lại cho Reseller và Khách lẻ: Web Host Edition
## Cài đặt Plesk trên VPS DigitalOcean
Sau khi mua xong VPS như hướng dẫn ở trên thì bạn có thể tiến hành cài đặt máy chủ .
Hiện có 2 cấu hình sẵn có giúp bạn có thể dễ dàng cài đặt Plesk.
* Plesk Web Admin Edition SE (Ubuntu 18.04): Recommended set (Fail2Ban, ModSecurity, Plesk Firewall, and WordPress Toolkit are installed by default). Additionally, the DigitalOcean DNS extension is installed by default.
* Plesk Web Admin Edition SE (CentOS 7): Recommended set (Fail2Ban, ModSecurity, Plesk Firewall, and WordPress Toolkit are installed by default). Additionally, the DigitalOcean DNS extension is installed by default.
Tuỳ vào nhu cầu sử dụng bạn có thể lựa chọn cấu hình phù hơp. Ở đây mình sẽ lựa chọn Plesk cho Unbuntu.

Bước 1: Đăng nhập vào tài khoản của bạn tại DigitalOcean

Bước 2: Click Marketplace > (ở dưới “DISCOVER” trong menu bên trái) và đi đến “Blogs & Forums” tab.
![](https://images.viblo.asia/03f37d99-24f8-482f-98d2-2f9cf0ece6ff.png)

Bước 3: Hover lên Plesk và click Create Droplet
![](https://images.viblo.asia/c32e04c5-d203-40ed-bd12-36fb1b177264.png)

Bước 4: Lựa chọn Plan cho Droplet để khởi tạo
![](https://images.viblo.asia/c2d73c74-3237-4f37-97d4-3955f0746555.png)

## Truy cập vào Plesk
Nếu bạn sử dụng **root** username và password, bạn có thể đăng nhập vào Plesk một cách nhanh nhất: không dùng truy cập vào droplet sử dụng command line.
### Truy cập vào Plesk không sử dụng command line: 
* Đi đến đường dẫn https://<your-droplet-IP>:8443
* Ở trang đăng nhập Plesk, sử dụng root username và  password bạn nhận được trong email từ DigitalOcean.
* Bạn sẽ được chuyển hướng đến màn hình chào mừng. Bạn cần cung cấp tên và địa chỉ email, chấp nhận End-User License , và cài đặt mật khẩu cho tài khoản administrator (dùng để sử dụng đăng nhập Plesk).
* Sau khi hoàn thành, click Enter Plesk để đăng nhập vào Plesk.
### Truy cập vào Plesk  sử dụng command line:
* Truy cập vào droplet command line sử dụng
SSH
SSH client như PuTTY hoặc iTerm2
DigitalOcean console
* Thay đổi root password 
* Chạy lệnh
`sudo plesk login`
*  Plesk sẽ tạo ra 2 link để đăng nhập, hãy sử dụng link tương tự sau: https://{public-ip-address}:8443/ . Ví dụ https://192.0.2.1:8443/login?secret=hlHH450sx%2FAlSJHj1VWJC2qKxK6gqVxtsMkYG6bf6wc%3D
*  Tương tự bạn sẽ được chuyển đến màn hình chào mừng và điền các thông tin tương tự trên.
* Click Enter Plesk để đăng nhập
* Chú ý: nếu Plesk vẫn đang trong quá trình Deploy bạn sẽ thấy màn hình bảo trì như sau:
  ![](https://images.viblo.asia/7a7c3673-b6ce-41c5-8b1e-ed08d6537705.png)
    Hãy kiên nhẫn chờ đợi 1 chút đến khi cài đặt xong.
## Kết luận
Như vậy qua bài viết trên mình đã hướng dẫn các bạn cài đặt Plesk Control Panel trên VPS của DigitalOcean. Đây là một cách đơn giản và thuận tiện nhất cho những người không chuyên về quản trị và cài đặt Server để chạy các mã nguồn của chính mình. Trong bài viết sau mình sẽ hướng dẫn các bạn sử dụng Plesk cũng như cài đặt DNS Hosting.
Nguồn tham khảo: 

    https://docs.plesk.com/en-US/onyx/deployment-guide/plesk-installation-and-upgrade-on-public-cloud-services/installing-plesk-on-digitalocean.79699/
    https://blog.tinohost.com/plesk-control-panel-la-gi/