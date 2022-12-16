Nginx Proxy Manager (NPM) là một hệ thống quản lý reverse proxy chạy trên Docker. NPM sử dụng Nginx và cung cấp cho người dùng trình quản lý thông qua giao diện web, giúp người dùng quản lý dễ dàng và hiệu quả hơn.

# Nginx Proxy Manager là gì ?
Nginx Proxy Manager (NPM) là một hệ thống quản lý reverse proxy chạy trên Docker. NPM sử dụng Nginx làm proxy server. Ngoài việc cấu hình Proxy server nó còn cho phép bạn cấu hình redirect domain, kích hoạt và tự động gia hạn SSL Let’s Encrypt. NPM rất phù hợp nếu các bạn đang muốn tìm kiếm một giải pháp proxy server đứng trước server backend của mình.

## Cài đặt Nginx Proxy Manager 
Mình sẽ triển khai Nginx Proxy Manager qua phiên bản đã được đóng gói thành Container. Đồng thời sẽ sử dụng Docker và Docker Compose để khởi tạo dịch vụ.

Trước khi cài các bạn cài cho mình docker và docker-compse trước. 

Sau khi cài xong làm tiến hành cài Nginx Proxy Manager

```
git clone https://github.com/jc21/nginx-proxy-manager.git
cd nginx-proxy-manager/doc/example/
docker-compose up -d
```
## Kết quả
```
[root@whmcs32405284 nginxproxy]# docker-compose up -d
Creating network "nginxproxy_default" with the default driver
Creating nginxproxy_app_1 ... done
Creating nginxproxy_db_1 ... done
```
**Kiểm tra**
```
[root@whmcs32405284 nginxproxy]# docker ps
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
0f5b3c48364a jc21/nginx-proxy-manager:latest "/init" 45 seconds ago Up 44 seconds 0.0.0.0:80-81->80-81/tcp, :::80-81->80-81/tcp, 0.0.0.0:443->443/tcp, :::443->443/tcp nginxproxy_app_1
513d853eea31 jc21/mariadb-aria:latest "/scripts/run.sh" 45 seconds ago Up 44 seconds 3306/tcp
```
**Kiểm tra giao diện Web**

Để kiểm tra, mình sẽ truy cập vào Port 80 và 81. Trong đó Port 80 là Port của Nginx Proxy Server, Port 81 là Port của Nginx Proxy Manager.
![](https://images.viblo.asia/c9e22268-f683-4621-bc21-d46e6bdcd04d.png)

Truy cập với mật khẩu mặc định
```
Email:    admin@example.com
Password: changeme
```
Sau khi đăng nhập thành công, chúng ta thực hiện thao tác cập nhật thông tin. Nhập lại các thông tin Full Name, Nickname và Email. Chọn Save để lưu thông tin và tiếp tục cập nhật mật khẩu mới.
![](https://images.viblo.asia/3f1f82b5-a79e-4ebe-bd24-9ab2d95590b0.png)
Add Proxy Host  thêm mới thông tin máy chủ Apache Web Server.
![](https://images.viblo.asia/bd4c50bc-403b-4e98-95a5-153024933f9f.png)

Nhập Domain Name, Ip, port máy chủ Apache Web Server nằm trong dải mạng Internal. Chọn Save để lưu thông tin.

Truy cập vào domain vừa Add để kiểm tra kết quả.
## Lời kết
Như vậy qua bài viết này mình đã hướng dẫn các bạn cách cài đặt Nginx Proxy Manager và thiết lập bảo mật trang đăng nhập. Nếu có bất kỳ ý kiến đóng góp nào các bạn có thể để lại bình luận ở bên dưới. Chúc các bạn thành công.!

Tham khảo [Xây dựng Web Server Proxy bằng mã nguồn mở dùng Docker](https://vietcalls.com/xay-dung-web-server-proxy-bang-ma-nguon-mo-dung-docker/)