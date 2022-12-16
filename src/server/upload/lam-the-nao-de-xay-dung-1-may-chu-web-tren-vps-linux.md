## Dẫn chuyện
OK, bắt đầu nào, ngày xửa ngày xưa, thôi dẹp đi, có một ngày đẹp trời, cũng chả nhớ lắm nhưng cho là đẹp trời đi. Mình có một anh bạn và cậu ta khá là giỏi chuyện quan hệ cũng như là các chuyện tuts nọ tuts kia. Cậu ta có khoe với mình 1 con `vps` mới reg được trên `AWS`, khá là thú vị :v, mình thì sinh viên chả có đủ tiền trọ thì tiền đâu ra cày cấy `vps`, thế là bằng một cách thần kỳ nào đó mình thương lượng kỳ kèo với cậu bạn và cậu ta chỉ cách đăng kí `VPS AWS`.

## Suy nghĩ
Vậy bắt đầu mình nghĩ, VPS bây giờ mình có rồi, có thể làm vào việc gì và làm những gì ?
Ưm...`search google` 1 chút, rắc một chút `muối` chút `mắm lam ngư` vào 1 chút, ngon! À quên mới đầu mình reg `VPS WIN2016` cơ không phải là `ubuntu 18.04` dâu, mình vọc vạch hàng tháng trời với cái VPS win, sau đó mình lại nghĩ, hay là bây giờ mình đăng 1 con `VPS Linux` coi sao, à ở đây có hỗ trợ cái mà mình rành nhất :33 không cả đống nhân linux, đó là `ubuntu` :3 Và ở đây mình đã chọn là `ubuntu 18.04`. Tuy nhiên ở bài này mình sẽ hướng dẫn trên  `Ubuntu 16.04`  và `Ubuntu 18.04` nhé :laughing:

## Suy nghĩ giải pháp
Có vẻ mình nghĩ quá nhiều nhỉ :rofl::rofl::rofl: hừm, VPS AWS mình đăng kí ấy, RAM có 1GB thôi, mình đã search google 2 tiếng đồng hồ để đắn đo xem chọn cái nào cái nào, chốt lại mình đã chọn `OpenLiteSpeed` tada :joy:.

## Vậy OpenLiteSpeed là quần què gì ?
Hừm, `OpenLiteSpeed`, là một máy chủ web mã nguồn mở được phát triển bởi `Công nghệ LiteSpeed…` Một phiên bản nguồn mở của `LiteSpeed Web Server Enterprise…`.
`OpenLiteSpeed` ​​được thiết kế gọn nhẹ với giao diện web thân thiện với người dùng để giúp quản trị viên web tạo và quản lý trang web của họ `dễ dàng`… Người dùng mới và sinh viên như mình thì máy chủ web này khá hữu ích và thuận tiện…
Khi nói đến `máy chủ web`, hầu hết đã nghe về `Apache2, Nginx` và những cái ít phổ biến khác… tuy nhiên,` OpenLiteSpeed` ​​nên ở vị trí đầu tiên vì nó kết hợp tốc độ, bảo mật, khả năng mở rộng, tối ưu hóa và đơn giản trong một `giao diện web thân thiện`…
Hướng dẫn ngắn gọn này sẽ cho sinh viên và người dùng mới cách cài đặt `OpenLiteSpeed ​​với MariaDB và PHP 7.1 hoặc PHP 7.2`.
Các bạn hiểu rồi chứ :hugs: .

## Các bạn đã mở VPS của mình nên chưa ? thực hành nhé ?
**Bước 1: Cập Nhật Máy Chủ Ubuntu**

Trước khi cài đặt OpenLiteSpeed ​​và các ứng dụng khác, vui lòng cập nhật máy chủ Ubuntu. Để làm điều đó, hãy chạy các lệnh bên dưới.

`sudo apt update && sudo apt dist-upgrade && sudo apt autoremove`


**Bước 2: Cài Đặt OpenLiteSpeed ​​Dependencies**

Sau khi cập nhật máy chủ, hãy cài đặt các gói cần thiết bên dưới để cài đặt cho OpenLiteSpeed.

`sudo apt install build-essential libexpat1-dev libgeoip-dev libpcre3-dev libudns-dev zlib1g-dev libssl-dev libxml2 libxml2-dev rcs libpng-dev libpng-dev openssl`


**Bước 3: Tải Xuống Và Cài Đặt OpenLiteSpeed**

Bây giờ tất cả các gói cần thiết đã được cài đặt, hãy truy cập và tìm phiên bản mới nhất của OpenLiteSpeed. Các lệnh dưới đây sẽ tải phiên bản 1.4.34 về máy chủ của bạn ..

`cd /tmp/ && wget https://openlitespeed.org/packages/openlitespeed-1.4.34.tgz`

Tiếp theo, chạy các lệnh dưới đây để giải nén gói đã tải xuống.

`tar -xvzf openlitespeed-1.4.34.tgz`

Thay đổi vào thư mục được trích xuất thư mục

`cd openlitespeed-1.4.34/`

Sau đó chạy các lệnh dưới đây để cài đặt OpenLiteSpeed.

```
sudo ./configure
sudo make
sudo make install
```
Sau đó OpenLiteSpeed được cài đặt và sẵn sàng để sử dụng.

**Bước 4: Định Cấu Hình OpenLiteSpeed**

Cuối cùng, cấu hình mật khẩu quản trị cho giao diện web. Chạy các lệnh dưới đây để thực hiện điều đó.

`sudo /usr/local/lsws/admin/misc/admpass.sh`

Sau đó, tạo tên người dùng và mật khẩu quản trị viên web.

```
Please specify the user name of administrator.
This is the user name required to login the administration Web interface.

User name [admin]: openliteadmin

Please specify the administrator's password.
This is the password required to login the administration Web interface.

Password: new_password
Retype password: retype_password
Administrator's username/password is updated successfully!
```

Sau đó, chạy các lệnh dưới đây để khởi động máy chủ web.

`sudo /etc/init.d/lsws start`

Mở trình duyệt của bạn và duyệt đến IP máy chủ hoặc tên máy chủ theo sau là **8088** để xem trang trang mặc định. **http: // localhost: 8088**

Để truy cập cổng phụ trợ quản trị viên, hãy sử dụng cổng **7078**

**https://192.168.1.2: 7080**

**Bước 5: Cài Đặt MariaDB Database Server**

Máy chủ cơ sở dữ liệu MariaDB là một nơi tuyệt vời để bắt đầu khi nhìn vào các máy chủ cơ sở dữ liệu nguồn mở để sử dụng với OpenLiteSpeed… Để cài đặt MariaDB bạn chạy các lệnh bên dưới…

`sudo apt-get install mariadb-server mariadb-client`

Sau khi cài đặt MariaDB, các lệnh dưới đây có thể được sử dụng để dừng, khởi động và kích hoạt dịch vụ MariaDB luôn khởi động khi máy chủ khởi động ..

**Chạy trên Ubuntu 16.04 LTS**

```
sudo systemctl stop mysql.service
sudo systemctl start mysql.service
sudo systemctl enable mysql.service
```

**Chạy trên Ubuntu 18.04  và 18.10  LTS**

```
sudo systemctl stop mariadb.service
sudo systemctl start mariadb.service
sudo systemctl enable mariadb.service
```

Sau đó, chạy các lệnh bên dưới để bảo vệ máy chủ MariaDB bằng cách tạo mật khẩu gốc và không cho phép truy cập root từ xa.

`sudo mysql_secure_installation`

Khi được hỏi, hãy trả lời các câu hỏi bên dưới bằng cách làm theo hướng dẫn.

```
Enter current password for root (enter for none): Just press the Enter
Set root password? [Y/n]: Y
New password: Enter password
Re-enter new password: Repeat password
Remove anonymous users? [Y/n]: Y
Disallow root login remotely? [Y/n]: Y
Remove test database and access to it? [Y/n]:  Y
Reload privilege tables now? [Y/n]:  Y
```

Khởi động lại máy chủ MariaDB
Để kiểm tra nếu MariaDB được cài đặt, hãy nhập các lệnh bên dưới để đăng nhập vào máy chủ MariaDB

`sudo mysql -u root -p`

Sau đó nhập mật khẩu bạn đã tạo ở trên để đăng nhập ... nếu thành công, bạn sẽ thấy thông báo chào mừng MariaDB.

**Bước 6: Cài Đặt PHP 7.1 Và Modules**

PHP là bắt buộc để cho phép các ứng dụng PHP hoạt động… .. chạy các lệnh bên dưới để thêm kho lưu trữ OpenLiteSpeed ​​vào hệ thống của bạn…

```
sudo bash 
wget -O - http://rpms.litespeedtech.com/debian/enable_lst_debain_repo.sh | bash
```
Sau khi thêm kho lưu trữ, hãy chạy các lệnh **PHP 7.1** và các mô-đun liên quan.

`sudo apt install lsphp71 lsphp71-common lsphp71-mysql lsphp71-tidy lsphp71-recode lsphp71-recode lsphp71-opcache`

Để cài đặt **PHP 7.2** và các gói liên quan, hãy chạy các lệnh dưới đây:

`sudo apt install lsphp72 lsphp72-common lsphp72-mysql lsphp72-tidy lsphp72-recode lsphp72-recode lsphp72-opcache`

Tiếp theo, chạy các lệnh dưới đây để tạo một liên kết tượng trưng cho **PHP 7.1**

`sudo ln -sf /usr/local/lsws/lsphp71/bin/lsphp /usr/local/lsws/fcgi-bin/lsphp71`

Để sử dụng **PHP 7.2** , hãy chạy các lệnh bên dưới…

`sudo ln -sf /usr/local/lsws/lsphp72/bin/lsphp /usr/local/lsws/fcgi-bin/lsphp72`

Sau đó, mở trình duyệt của bạn và duyệt đến cổng phụ trợ OpenLiteSpeed ​​..

**http://example.com:7080**

Đi tới Dashboard và chọn  **Server Configuration** ==> **External App…** sau đó nhấp vào  **EXIT**  như được hiển thị trong hình bên dưới…

![](https://images.viblo.asia/fcb9a3d2-4a15-4d42-a06e-5b2bc3b1ba6e.png)

Sau đó di chuyển đến  Command , sau đó thay đổi lệnh để phản ánh liên kết tượng trưng được tạo ở trên cho **PHP 7.1** và lưu lại.

`$SERVER_ROOT/fcgi-bin/lsphp71`

Đối với **PHP 7.2** , sử dụng dòng dưới đây:

`$SERVER_ROOT/fcgi-bin/lsphp72`
 
 ![](https://images.viblo.asia/4c0bb926-61f6-45e5-8811-32ba38d4f07d.png)
 
 Tiếp theo, vào **Virtual Hosts** ==> **General page ….** và nhấp vào chỉnh sửa phần Index File và thêm index.php vào danh sách như hình dưới đây.
 
 ![](https://images.viblo.asia/f13cf83b-3e92-477f-a206-2be81fa97a55.png)
 
 Tiếp theo, chọn tab **Rewrite** và bật **Rewrite Control**
 
 ![](https://images.viblo.asia/388ec613-f202-49f6-9b98-421d2bc5039a.png)
 
 Tiếp theo chỉnh sửa Quy tắc Rweire và thay thế mã bằng quy tắc bên dưới, sau đó lưu ..

```
RewriteRule ^ index \ .php $ - [L] 
RewriteCond% {REQUEST_FILENAME}! -F 
RewriteCond% {REQUEST_FILENAME}! -D 
RewriteRule. /index.php [L]
```

![](https://images.viblo.asia/e5380be1-cc1f-41bc-9d1a-4c5487c74f7c.png)

Lưu lại và tiếp tục.
Cuối cùng, nhấp vào **Listeners** từ menu bên trái, sau đó chỉnh sửa để thay đổi cổng hiện tại từ** 8088 thành 80** . Lưu sau đó.

![](https://images.viblo.asia/23c494a2-5646-469b-ad04-952819b38266.png)

Đi tới Dashboard và restart máy chủ từ góc trên cùng bên phải…
Để xác nhận xem PHP có đang hoạt động hay không, hãy mở URL bên dưới… **http://localhost/phpinfo.php**

Tất cả những gì bạn phải làm bây giờ là đặt ứng dụng PHP của bạn vào thư mục gốc mặc định: **/usr/local/lsws/Example/html**

Nhân tiện em vừa tạch đầu vào vị trí intern của framgia :( buồn sâu sắc , sau hôm làm bài test thì 2 ngày sau em nhận thư cảm ơn tham gia test và thông báo tạch luôn :worried: không biết là do năm 1 nên bị thế hay là do sao nữa :worried:
Chúc các bác có một đầu tuần suôn sẻ :heart: ^^ .
Enjoy!