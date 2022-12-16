## I. Lời mở đầu
Mình là một newbie, đang muốn tạo một trang web cho riêng mình. Nên mình có tập tọe học một vài ngôn ngữ để có thể tự viết code. Sau khi tìm hiểu trên Viblo mình biết được căn bản rằng là để xây dựng một trang web thì mình cần học một ngôn ngữ Backend, CSDL, Javascript,... bla.bla. Mình có đọc được bài khá bổ ích [Cái nhìn tổng quan về một dự án web](https://viblo.asia/p/cai-nhin-tong-quan-ve-mot-du-an-web-oOVlYzaz58W). Và rồi mình cũng tự phân tích thiết kế, coding, setup server các thứ. Công nghệ mà mình sử dụng cho trang web cụ thể như sau:
- Backend: PHP
- CSDL: Mysql
- Frontend: Html, javascript.
- Webserver: Nginx v1.19

Cuối cùng mình cũng có một trang web cho riêng mình. Trang web vẫn hoạt động ngon lành cho đến một ngày. Trang web đã bị hacker tấn công, hacker đe dọa và đòi mình một số tiền lớn.

![](https://images.viblo.asia/13cadc45-fcee-4376-9773-4fa1748f5123.jpg)

## II. Nội dung chính
Mình là một người khá tỉ mỉ, trước đó mình có tìm hiểu cả phần security cho web nữa. Mình cũng có đọc và tham khảo các bài [Hacker đã tấn công trang web của tôi như thế nào](https://viblo.asia/p/hacker-da-tan-cong-trang-web-cua-toi-nhu-the-nao-naQZR9kAKvx) hay [Sử dụng HTML Purifier để ngăn chặn tấn công XSS trong PHP](https://viblo.asia/p/su-dung-html-purifier-de-ngan-chan-tan-cong-xss-trong-php-Qpmlerzr5rd). Ngoài ra mình cũng có tìm đọc các tài liệu về Secure Coding để áp dụng cho dự án nữa.

Với những kiến thức về coding cũng như security đã học được, mình rất tự tin về sản phẩm của mình. Chuyện kẻ xấu xâm nhập hệ thống của mình cũng không phải là chuyện dễ dàng vậy mà ... lại có ngày này (khoc).

Bằng một cách nào đó hacker đã xâm nhập được vào hệ thống và đánh cắp dữ liệu trang web. Hacker cho hạn mình trong 48h mà không chuyển tiền sẽ public CSDL và phá sập hệ thống.

Sau 48h gian khổ tìm lỗ hỏng, cuối cùng mình cũng biết được rằng hacker thông qua lỗ hỏng của nginx để xâm nhập vào server website của mình. Một bài học đáng giá mình đã phải đánh đổi bằng tiền mặt :(

### Giới thiệu về Nginx
![](https://images.viblo.asia/c1dbcabd-3af8-4306-978a-56048596c9d1.png)

- Trong hệ thống mạng thông tin, reverse proxy là một loại proxy server trung gian giữa một máy chủ và các clients gửi tới các yêu cầu. Nó kiểm soát yêu cầu của các clients, nếu hợp lệ, sẽ luân chuyển đến các servers thích ứng. Trái ngược với một proxy chuyển tiếp (forward proxy), là một trung gian cho các clients liên hệ với nó liên lạc với bất kỳ máy chủ nào, Reverse proxy là một trung gian cho các máy chủ liên hệ với nó được liên lạc bởi bất kỳ clients nào.

Ưu điểm lớn nhất của việc sử dụng Reverse proxy là khả năng quản lý tập trung. Nó giúp kiểm soát mọi requests do clients gửi lên các servers mà được bảo vệ.
**Nginx** là một chương trình server HTTP, một reverse proxy cũng như IMAP/POP3 proxy server miễn phí, mã nguồn mở.
>NGINX được phát âm là “engine-ex”, là một máy chủ dịch vụ web (web server) mã nguồn mở. Nginx khởi đầu thành công với vai trò là máy chủ web, nhưng bây giờ với các tính năng mở rộng Nginx cũng được sử dụng phổ biến như một máy chủ proxy (reverse proxy server), HTTP cache hoặc dùng làm cân bằng tải (load balancer). Những công ty lớn sử dụng NGINX bao gồm: Autodesk, Atlassian, Intuit, TMobile, GitLab, DuckDuckGo, Microsoft, IBM, Google, Adobe, Salesforce, VMWare, Xerox, LinkedIn, Cisco, Facebook, Target, Citrix Systems, Twitter, Apple, Intel và nhiều công ty khác.
### Cài đặt Nginx cho server
**1. Cài đặt Nginx**
- Cài đặt các gói cần thiết
```
sudo apt install curl gnupg2 ca-certificates lsb-release -y
```
Chạy lệnh để thiết lập kho apt cho gói Nginx stable:

echo "deb http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" \
    | sudo tee /etc/apt/sources.list.d/nginx.list
    
Nhập Nginx key để xác minh tính xác thực của gói
```
curl -fsSL https://nginx.org/keys/nginx_signing.key | sudo apt-key add -
```
Sau đó chạy lệnh update package và install nginx:
```
sudo apt update
sudo apt install nginx -y
```
**2. Cấu hình tường lửa**
```
sudo ufw allow http
sudo ufw allow https
```
**3. Kiểm tra trạng thái của nginx**
- Khởi động nginx
```
sudo systemctl start nginx
```
- Kiểm tra trạng thái của nginx
```
systemctl status nginx
```
### Một số lưu ý khi cài đặt và sử dụng Nginx
- Chỉ nên cài những modules được yêu cầu.
- Không cài đặt module HTTP WebDAV
- Tắt module gzip
- Tắt module autoindex
- Khóa NGINX service account
- Tất cả các thư mục, tập tin (files) được sở hữu bởi quyền root
- Nginx process ID (PID cần được bảo mật
- Nginx chỉ lắng nghe các kết nối mạng trên các port được phân quyền
- Thiết lập timeout 10s hoặc thấp hơn (Thời gian trễ khi kết nối đến nginx bị lỗi) tuyệt đối không để là 0
- Đảm bảo version của nginx không được bật (tránh việc hacker phát hiện version hiện tại của nginx để tìm cách xâm nhập)
- Các page error hoặc index.html không nên để nguồn từ nginx
- ....
## III. Tạm kết
Chắc hẳn sau bài viết các bạn đã có những lưu ý quan trọng để server tránh khỏi việc bị hacker xâm nhập qua lỗ hổng Nginx rồi đúng không nào. Rất mong được sự góp ý từ mọi người.
![](https://images.viblo.asia/c9a98922-9b9c-4ceb-9516-6c6b67a3cb01.gif)