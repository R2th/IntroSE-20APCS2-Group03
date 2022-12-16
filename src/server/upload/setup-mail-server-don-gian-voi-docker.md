# Mở đầu
Gửi email là một tính năng mà gần như dự án web nào cũng có, thường thì chúng ta sẽ sử dụng các dịch vụ email thông dụng hiện nay như gmail, sendgrid, ... hay trong Ruby on Rails thì có các gem hỗ trợ việc test gửi email như letter_opener_web,... cũng khá đơn giản để cài đặt và sử dụng.

Nhưng sử dụng những phương pháp trên đều có những nhược điểm nhất định, ví dụ khi sử dụng gmail hay sendgrid, thì phải sử dụng email thật, cứ cho là bạn có sẵn một email rác test, nhưng mà email người nhận cũng phải là email thật thì mới dùng được, cũng có thể sử dụng email 10 phút để làm mail nhận, cơ mà mỗi lần test là lại phải cập nhật email vào database bằng cơm, hơi cồng kềnh nhỉ =)) còn nếu sử dụng gem thì cũng ok thôi, nhưng có vẻ sẽ ko bắt được các ngoại lệ như not authen, errors server hay smtp gì gì đấy :v 

Hoặc là dự án của bạn làm về quản lý, gửi và nhận email thì các cách trên có vẻ không khả thi trong quá trình phát triển cho lắm, vậy tại sao chúng ta ko tự build một mail server trên máy nhỉ :v tạo tài khoản email tẹt ga, thích dùng domain nào cũng được, hỗ trợ smtp, imap, pop3 các kiểu, không lo tạo ra incident liên quan đến email (à cái mail server mà mình sắp trình bày ở dưới nó cũng có thể forward email ra bên ngoài, mình cũng chưa mò cách tắt, nên có lẽ nhanh nhất là... tắt mạng để chạy local) và cả team có thể dùng chung ở trong mạng LAN, hoặc deploy lên một con vps nào đó rồi sử dụng.

# Cấu trúc một mail server
Một mail server cơ bản sẽ có cấu trúc như sau:

![](https://images.viblo.asia/8784199e-eae7-4109-ad89-b293c03d77a1.png)

- Postfix (MTA) : đây là một SMTP server, phụ trách việc gửi và chuyển tiếp email, có nhiều loại SMTP server nhưng Postfix là đồ free mà dùng cũng khá ổn nên được mọi người lựa chọn khá nhiều.
- Dovecot (LDA): đây là POP3/IMAP server, sử dụng cho việc đọc email, cũng thông dụng khi dùng free như Postfix, Dovecot sẽ truy cập vào nơi mà Postfix lưu trữ email để đọc email =)))
- Roundcube Web Interface: là giao diện quản lí, đọc và gửi email trên trình duyệt, tương tự như trình quản lí email của google hay yahoo (thực ra nó đơn giản hơn nhiều)
- Mailserver-admin: quản lý tài khoản email, domain, ...

Mình giới thiệu qua một chút thôi, bây giờ chuyển qua phần chính nhé

# Cài đặt Mail Server
Mình cũng đọc khá nhiều bài viết hướng dẫn setup mail server nhưng do ngại cài đặt với cấu hình nên mình đã tìm các project docker, cũng may mắn tìm được 1 project mình thấy khá ổn, coi như một mail server hoàn chỉnh chỉ việc bật lên và sử dụng thôi. các bạn có thể tải tại [đây](https://github.com/jeboehm/docker-mailserver)

![](https://images.viblo.asia/8b6bd897-45ea-463c-8a4d-7201da74ec6e.png)

Cách chạy cũng khá đơn giản:

1. Clone project về, sau đó trỏ vào thư mục chứa dự án
2. Tạo file `.env` sau đó sao chép nội dung của file `.env.dist` qua và chỉnh sửa một vài thứ, dưới đây mình chỉnh sửa như sau
``` ruby
MYSQL_DATABASE=mailserver // tên database để lưu thông tin về tài khoản email
MYSQL_USER=mailserver // tài khoản mysql được tích hợp sẵn trong project
MYSQL_PASSWORD=changeme // mật khẩu
MYSQL_ROOT_PASSWORD=changeme // mật khẩu tài khoản root
MAILNAME=mail.example.com // tên mail server, cơ mà sau chủ yếu mình dùng ip loopback hoặc ip private
POSTMASTER=postmaster@example.com // cái này để nguyên
RELAYHOST=false
FILTER_MIME=false // bật bộ lọc thì đổi sang true
FILTER_VIRUS=false // bật tính năng bảo vệ virus thì chuyển sang true
ENABLE_IMAP=true // cho phép sử dụng imap, ko cần thì đặt là false
ENABLE_POP3=false // cho phép sử dụng pop3, mình ko cần dùng là nên để false
CONTROLLER_PASSWORD=changeme
WAITSTART_TIMEOUT=2m
```
3. Chạy `bin/production.sh pull` để pull image docker cần thiết về
4. Chạy `bin/production.sh up -d` để tạo container và chạy chế độ background, nếu muốn tắt thì chạy `bin/production stop`, và nếu muốn bật lại thì chỉ cần chạy `bin/production start`
5. Khi chạy lần đầu thì cần chạy thêm câu lệnh `bin/production.sh run --rm web setup.sh` để tạo 1 root account, sử dụng tài khoản này để tạo ra các email khác và cấu hình mail server như domain, ...
6. Vậy là xong, sử dụng thôi :D 

Các dịch vụ của mail server:
![](https://images.viblo.asia/c325da56-a1ab-4bf7-bb51-49160b8f633e.png)

Giao diện tạo và quản lý tài khoản email:
![](https://images.viblo.asia/7445c3df-a031-469a-9f3c-5461c758e4ec.png)

Giao diện quản lý gửi và nhận email: 
![](https://images.viblo.asia/b3105602-9db7-42ae-b801-658bc1e5f2dd.png)

Sử dụng một thời gian thì mình cũng thấy khá ổn, gửi email thả cửa, cả team dùng chung cũng được =)) nhưng đấy mới chỉ là trên môi trường development, còn mình chưa chạy trên production nên cũng ko biết tính khả thi có cao hay không, các bạn comment góp ý nhiệt tình nhé.

### Tham khảo: [https://github.com/jeboehm/docker-mailserver](https://github.com/jeboehm/docker-mailserver)