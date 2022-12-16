Quay trở lại với series về PHP nói chung và Laravel nói riêng, mình sẽ đem đến cho các bạn một "bản collab" giữa `Laravel` và `MailCatcher` nha. 
Gọi là "bản collab" cho "sang mõm" là vậy, thực ra nó chỉ là việc sử dụng `MailCatcher` trong project `Laravel` mà thôi =)) 

Thôi chúng ta cùng đi vào nội dung chính nha. Let's go!

![](https://images.viblo.asia/eec860be-6828-4848-9255-9f7132bdb87c.png)

# 1. MailCatcher là gì?
Như các bạn cũng đã biết thì khi project của chúng ta có chức năng gửi email. Để tránh việc chúng ta bắt buộc phải nhập chính xác email thực, cũng như việc gửi quá nhiều mail dẫn đến tình trạng spam không đáng có ở những môi trường như local, develop,... thì các service SMTP server được tạo ra dành cho developer. 

Mặc định trong project `Laravel` cũng đã tích hợp cho chúng ta [MailTrap](https://mailtrap.io/), nhưng MailTrap là một service online - bắt buộc chúng ta phải connect với internet mới có thể sử dụng được. Ngoài ra còn có rất nhiều các SMTP server free nữa nhưng bài viết này mình muốn giớ thiệu với các bạn `MailCatcher`, nó được cài đặt trên server, rất nhẹ và dễ sử dụng.

MailCatcher là một máy chủ SMTP miễn phí được viết bằng Ruby, nó được xây dựng để giúp việc kiểm tra email dễ dàng hơn. Sau khi cài đặt xong [Mailcatcher](https://mailcatcher.me/), nó sẽ cung cấp cho bạn 2 phương thức để tương tác. Đó là SMTP và HTTP. Phương thức SMTP giúp bạn chạy SMTP Server để gửi mail (smtp://127.0.0.1:1025). Còn HTTP, giúp bạn xem được các mail được gửi đến/gửi đi thông qua giao diện web (http://127.0.0.1:1080).

# 2. Cài đặt MailCatcher
- ##### Cài đặt Ruby

Vì `MailCatcher` là một Ruby Gem nên bắt buộc phải cài đặt `Ruby` trên máy tính của bạn. 
Để cài đặt `Ruby` các bạn chỉ cần gõ một số command sau:
```java
$ sudo apt install curl
$ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
$ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
$ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

$ sudo apt-get update
$ sudo apt-get install git-core zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev software-properties-common libffi-dev nodejs yarn
```
- ##### Cài đặt MailCatcher
```
$ sudo gem install mailcatcher
```
- ##### Khởi động MailCatcher
```java
$ mailcatcher
Starting MailCatcher v0.8.1
==> smtp://127.0.0.1:1025
==> http://127.0.0.1:1080
*** MailCatcher runs as a daemon by default. Go to the web interface to quit.
```
**Fact:** Bạn có thể xem thêm các lệnh liên quan tới Mailcatcher bằng cách gõ mailcatcher --help trên Terminal

```java
$ mailcatcher --help                        
Usage: mailcatcher [options]
        --ip IP                      Set the ip address of both servers
        --smtp-ip IP                 Set the ip address of the smtp server
        --smtp-port PORT             Set the port of the smtp server
        --http-ip IP                 Set the ip address of the http server
        --http-port PORT             Set the port address of the http server
        --messages-limit COUNT       Only keep up to COUNT most recent messages
        --http-path PATH             Add a prefix to all HTTP paths
        --no-quit                    Don't allow quitting the process
    -f, --foreground                 Run in the foreground
    -b, --browse                     Open web browser
    -v, --verbose                    Be more verbose
    -h, --help                       Display this help information
        --version                    Display the current version
```

Sau đó chúng ta có thể bắt đầu sử dụng Mailcatcher. Nhưng chúng ta sẽ cần làm thêm 1 bước nữa để có thể truy cập webmail thông qua IP để ở mạng nào cũng đều xem webmail được.
```ruby
$ mailcatcher --foreground --http-ip=0.0.0.0
```
- ##### Khởi động MailCatcher cùng server
Tính năng này rất cần thiết giúp bạn chạy `MailCatcher` mỗi khi server được khởi động. Điều này giúp bạn không cần phải quan tâm đến việc mỗi khi khởi động server phải vào để bật `MailCatcher`. <br>
**Tạo mới hoặc sửa file `/etc/init/mailcatcher.conf`**
```java
description "Mailcatcher"

start on runlevel [2345]
stop on runlevel [!2345]

respawn

exec /usr/bin/env $(which mailcatcher) --foreground --http-ip=0.0.0.0
```
Cuối cùng, bạn có thể sử dụng `MailCatcher` như một service của server:
```java
sudo service mailcatcher status
sudo service mailcatcher start
sudo service mailcatcher restart
sudo service mailcatcher stop
```
Bạn có thể mở trình duyệt và truy cập vào `ip` của bạn ở `port 1080` (http://your-ip:1080/) để xem giao diện của `MailCatcher`. 

![](https://images.viblo.asia/2f902eff-b78b-475a-8fb9-ca95d471b568.png)
# 3. Setup cho Project Laravel
Sau khi cài đặt `MailCatcher` đã xong xuôi. Mở file `.env` trong project lên và bạn có thể sửa phần thông tin gửi email bằng thiết lập dưới đây
```.env
MAIL_MAILER=smtp
MAIL_HOST=127.0.0.1
MAIL_PORT=1025
```

# 4. Test email
Trước đây mình đã có bài viết:  [Gửi email qua mini project](https://viblo.asia/p/huong-dan-tinh-nang-gui-mail-trong-laravel-qua-mini-project-OeVKBvjJKkW), nên mình sẽ dùng luôn source code này để test luôn. 

Và output mình nhận được: 

![](https://images.viblo.asia/24b453b3-0e70-4e33-8d00-87a727edff3e.png)

Giống hệt với output trong bài viết đúng không nào :D

# 5. Một số lỗi thường gặp
* mailcatcher.service could not be found.

Lỗi này xảy ra khi chúng ta sử dụng các command:
```java
sudo service mailcatcher status
sudo service mailcatcher start
sudo service mailcatcher restart
sudo service mailcatcher stop
```
Với lỗi này, cách đơn giản nhất để fix là chúng ta khai báo nó như một service:
```
$ sudo nano /lib/systemd/system/mailcatcher.service
```
tiếp theo dán đoạn text sau vào trong đó và save file.
```
[Unit]
Description=Mailcatcher Service
After=network.service vagrant.mount
[Service]
Type=simple
ExecStart=/usr/local/bin/mailcatcher --foreground --ip 0.0.0.0
Restart=always
[Install]
WantedBy=multi-user.target
```

## Lời kết
Đôi lời tâm sự mình xin được gửi vào cuối bài viết. Sau một thời gian dài vắng bóng trên "sàn diễn" mang tên `Laravel` thì hôm nay mình đã comeback và hứa hẹn sẽ đem đến cho các bạn thật nhiều bài viết chất lượng cũng như thú vị nhất. Hãy chờ đón những bài viết tiếp theo của mình nha <3

## Tham khảo
- GitHub: https://github.com/nguyenhuuhai98/send_email