Trong bài viết trước mình đã giới thiệu cho các bạn tổng quan về giao thức truyền file FTP và nguyên lý hoạt động của giao thức này. Trong bài viết này mình sẽ hướng dẫn các bạn cài đặt FTP server với phần mềm filezila server và cách sử dụng phần mềm FTP client để upload file lên máy chủ.
# Cài đặt FTP server với phần mềm filezila server
## 1. Cài đặt filezilla server
- Bước 1: Tải phần mềm FileZilla Server cho Windows.

- Bước 2: Khi tải hoàn tất, kích đúp chuột vào “FileZilla_Server.exe” để bắt đầu cài đặt.

- Bước 3: Rồi theo sự chỉ dẫn trên màn hình để cài đặt FileZilla Server. Khi bạn đến màn hình bên dưới, chọn cách để khởi động FileZilla Server:  **Start the Filezilla Server with Windows** hoặc là **Start Filezilla Server manually** rồi chọn **Next**
![](https://images.viblo.asia/83964ded-b4b3-4e00-a887-b588fe4a3d57.png)

- Bước 4: Chọn cách bạn muốn khởi động giao diện:

  - For all users (default)
  - Only for the current user.
  - Manually
 ![](https://images.viblo.asia/b47d6a78-27f9-49b8-a3b7-a3497f49ab26.png)
 
- Bước 5: Khi cài đặt kết thúc, chạy ứng dụng FileZilla đã cài đặt , nhấn Connect để bắt đầu thiết lập cấu hình cho FPT Server mới của bạn.
![](https://images.viblo.asia/7f34a6d1-4b0e-4f81-8acd-00922bba52bb.png)
## 2. Thiết lập cấu hình cho fpt server
**Bước 1: Tạo FPT Users** 
1. Ở Menu chính, chọn **Edit -> Users**, nếu bạn muốn tạo 1 loạt các users để truy cập vào FPT Server của bạn, với cùng 1 sự cho phép thì chọn **Edit -> Group**.
![](https://images.viblo.asia/68a835a7-6e8d-4e37-92db-067bf0a43aa3.png)
2. Ở hộp thoại User, chọn **General**, nhấn **Add** để thêm người dung truy cập vào Server của bạn.
![](https://images.viblo.asia/d4768e06-057c-4168-b723-0fb27be0b9ae.png)

3. Nhập tên User mới để thêm vào, VD: “User21” và nhấn **OK**.
![](https://images.viblo.asia/9c3261ce-b225-468c-ad2c-24e673c2938c.png)
4. Tích vào ô **Password** và nhập mật khẩu cho User đó với mục đích bảo mật.
![](https://images.viblo.asia/3a3439c8-cd33-48aa-be7e-fb125f0c1fd8.png)

**Bước 2: Tạo đặt chia sẻ thư mục**
1. Khi bạn hoàn thành việc thêm Users mới , chọn **Shared Folders** ở bên trái, nhấn vào **Add** dưới hộp thoại Shared folders để  để chọn xem thư mục nào trong máy tính của bạn sẽ được chia sẻ thông qua FTP.
![](https://images.viblo.asia/f32f27e4-5fa8-435f-a9a1-17570146433b.png)
2. Chọn thư mục sẽ được sử dụng để truy cập và nhấn **OK**
![](https://images.viblo.asia/8cf7f0d8-a78b-43e6-8e2a-0a47c9b4f371.png)
3. Cuối cùng đặt quyền truy cập người dung cho thư mục đó: ( Đọc, Viết, Xóa , …) rồi nhấn **OK**

Đến đây bạn đã hoàn thành xong việc cài đặt cấu hình cơ bản cho FTP Server.

**Bước 3: Bảo mật Server của bạn**.

Chọn Edit -> Setting.
![](https://images.viblo.asia/7c102a97-84ea-43b2-ba16-5c64cfc0b475.png)
1. Ở hộp thoại, chọn General Setting: chỉ định 1 cổng khác thay vì cổng 21, ví dụ 54557
![](https://images.viblo.asia/dceae112-fc3a-4c01-a074-4229e086deb5.png)
2. Ở IP Filter: chỉ định xem địa chỉ IPs nào sẽ được phép truy cập và ko được phép truy cập vào FTP Server. VD: Ở đây IP 192.168.1.121 k được phép truy cập tới Server
![](https://images.viblo.asia/beec52f8-f552-4982-875f-4000ed7aeb13.png)
3. Cuối cùng bạn có thể làm cho Server bảo mật hơn bằng việc tích Enable the FTP over TLS support và sử dụng private key đặt để mã hóa thông tin..
## 3. Truy cập filezilla server và shared folders từ máy khách.
Sau khi cài đặt xong FTP Server bạn có thể truy cập và chia sẻ file từ bất kể máy tính trong mạng cục bộ và mạng ngoài bằng việc thực hiện các cách sau.

Nếu muốn truy cập từ 1 máy ngoài, thực hiện các bước sau:
1. Chuyển  kết nối FTP tới địa chỉ IP FTP Server's Internal của bạn (and cổng) trên Firewall/Router của bạn
2. Cho phép kết nối FTP trên 1 cổng đã được chỉ định trên Firewall/Router của bạn.
3. Để kết nối tới FTP server qua Internet, bạn phải biết địa chỉ IP Public của mình (http://www.whatismyip.com/). At this case and to make your life easier, it is better to đăng kí 1 tên miền to your Dynamic (Public) IP Address by using a DDNS service (e.g. http://www.noip.com/)

**Truy cập Server từ trình duyệt Internet của bạn:**

Mở trình duyệt Internet của bạn, trên thanh bar địa chỉ, nhập Hostname của FTP Server và số hiệu của cổng FTP  ( nếu như lúc trước bạn đã thay đổi số hiệu từ 21 sang 1 sô nào đó ) 

VD: ftp://10.10.56.36:54557

![](https://images.viblo.asia/34be1369-9461-4498-9923-e2f06943d685.png)

Rồi điền giấy ủy nhiệm theo yêu cầu để đăng nhập vào FTP Server

![](https://images.viblo.asia/2e528588-c080-407d-bd6f-bbe212ea2df5.png)

Sau đó log on là thành công.
# Sử dụng phần mềm FTP client để upload file lên máy chủ
## 1. Cài đặt phần mềm filezilla client
- Bước 1: Tải phần mềm **filezilla client** và chạy file cài đặt vừa tải về
![](https://images.viblo.asia/b2657646-8940-4c7f-81d4-8ef66d0fd78d.png)
- Bước 2: Chọn “**I Agree**”. Sau đó nhấn Next cho đên khi hoàn thành.
![](https://images.viblo.asia/5d6b75eb-a2bf-476d-b919-db1252654cf1.png)
- Bước 3: khi thông báo trên hiện ra nghĩa là bạn đã cài đặt thành công phần mềm **FTP Client FileZilla**. Bạn nhấp **Finish** và khởi động chương trình. Giao diện chính của chương trình như sau:
![](https://images.viblo.asia/8be4c0d2-d473-4485-9780-3dc6cb7f77c6.png)
## 2. Thiết lập cấu hình cơ bản FileZilla để kết nối FTP tới server
Trong trường hợp cần thực hiện kết nối FTP nhanh tới server, ta thực hiện chức năng **Quickconnect**.
![](https://images.viblo.asia/a78cba2a-6bd0-444d-883c-4e30b41d06fb.png)

- Host: Có thể điền IP của host - VPS - Server hoặc hostname (ở đây là ftp://10.10.56.36)

- Username: Tài khoản FTP (User21)

- Password: Mật khẩu FTP (12345678)

- Port: Port kết nối FTP (54557)

Nếu kết nối thành công, sẽ có thông báo "**Status:Directory listing successful**"
![](https://images.viblo.asia/406d020d-8393-4d9e-8562-e13108901a45.png)
## 3. Sử dụng fulezilla để chuyển dữ liệu

Sau khi kết nối FTP thành công tới server, **FileZilla** sẽ có 2 phần đại diện cho việc dữ liệu ở 2 nơi – máy tính (cửa sổ trái) và server (cửa sổ phải, trên internet).
![](https://images.viblo.asia/6df91880-ee95-4d3c-93b5-98510d0a8387.png)

Muốn đưa dữ liệu nào đó (file, folder) từ máy tính lên server, click phải chuột chọn vào dữ liệu đó trên máy tính rồi click chọn Upload (hoặc có thể sử dụng kéo thả chuột).
![](https://images.viblo.asia/362188d1-ec14-4857-a43e-05eb4daa8711.png)
Tương tự để lấy dữ liệu trên server về máy tính (download) thì ta ta chọn các dữ liệu trên server, click chuột phải rồi chọn Download hoặc sử dụng kéo thả chuột.

Sau quá trình tiến hành cài đặt trên server và quá trình upload trên Client, ta được kết quả sau:
![](https://images.viblo.asia/1a82297f-8f15-470c-8bd6-ae1e4152bd87.png)