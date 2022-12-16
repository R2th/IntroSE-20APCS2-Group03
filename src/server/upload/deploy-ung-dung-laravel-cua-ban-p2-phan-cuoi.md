## 1. Mở đầu
<hr>

Chào mừng các bạn đã quay lại với phần 2 của bạn viết **Deploy ứng dụng Laravel của bạn**. Nếu bạn vẫn chưa đọc phần một rồi thì bạn có thể đọc ở [đây](https://viblo.asia/p/deploy-ung-dung-laravel-cua-ban-p1-gAm5y4zXldb) . Trong phần 2 của bài viết này mình sẽ tiếp tục hướng dẫn các bạn cài đặt thêm một số phần mềm cần thiết cho ứng dụng Laravel của bạn khi deploy lên server. Nào chúng ta cùng bắt đầu.

## 2. Cài đặt phần mềm
<hr>

### a. Nhắc lại

Trong bài viết trước chúng ta đã thực hiện được một bước như sau:
- Tạo và config droplet dùng để deploy ứng dụng Laravel của bạn trên [Digital Ocean](https://m.do.co/c/317ae4174798).
- Cài đặt nginx.
 - Cài đặt PHP phiên bản 7.3.
 - Cài đặt composer.
 - Pull code cho ứng dụng Laravel của bạn từ Github về và chạy lên.

Trong phần 2 này chúng ta sẽ cùng cài đặt thêm một số phần mềm cần thiết khác là:
- MySQL 8
- NodeJS 10

## b. Cài đặt MySQL 8


Thông thường để tiến hành cài đặt `mysql `  ta sẽ sử dụng câu lệnh:
```bash
sudo apt install mysql-server mysql-client
```
Tuy nhiên với cách cài như trên thì server của bạn sẽ là cài đặt `MySQL` version 5.7. Trong trường hợp bạn muốn sử dụng `MySQL 8` thì đầu tiên chúng ta sẽ phải tiến hành tải file `.deb` của phiên bản này như sau:
```bash
sudo wget -c https://dev.mysql.com/get/mysql-apt-config_0.8.13-1_all.deb
```
Tiếp đõ ta sẽ cái đặt `MySQL 8` với lệnh:
```bash
 sudo dpkg -i mysql-apt-config_0.8.13-1_all.deb
```
Sau khi chạy lệnh trên sẽ xuất hiện một màn hình mới. Bạn bấm xuống mục `Ok` và bấm `Enter`:

![](https://images.viblo.asia/5d87de30-8b79-4a6d-a293-b50a9d5f4daf.png)

Sau đó bạn sẽ thoát khỏi màn hình mới này và quay trở lại với terminal của bạn. Lúc này bạn chạy lệnh:
```bash
sudo apt update
```
Sau khi chạy xong lệnh update bạn sẽ thấy package list của bạn đã được update và lúc này sẽ xuất hện `mysql-8`. Cụ thể theo hình dưới đây ở mục GET:7, 8, 9:

![](https://images.viblo.asia/086efe96-c3cd-4594-93f7-b65a26f884de.png)

Tiếp đến ta sẽ chạy lại lệnh mà mình nhắc đến lúc đầu:
```bash
sudo apt install mysql-server
```
Lúc này vì chúng ta đã cập nhật phần package list lên `mysql-8` nên khi gõ lệnh trên thì ta sẽ cài được phiên bản mong muốn. Bạn đợi trong giây lát để quá trình tải hoàn tất thì lúc này sẽ tự động xuất hiện một màn hình mới để bạn nhập password cho tài khoản root của mysql như sau:

![](https://images.viblo.asia/5d91ce91-e340-4181-9680-b31c619cb392.png)

Bạn nhập password mà mình mong muốn sau đó bấm enter sẽ xuất hiện tiếp một màn hình nữa để bạn nhập lại password của mình. Bạn hãy nhập lại chính xác password đã chọn và bấm enter. Sau khi phần chọn password hoàn tất sẽ xuất hiện mục về config password cho mysql như sau:

![](https://images.viblo.asia/751c1a9b-f55b-4e20-b18c-bbb8463c4e9f.png)

Ở đây mình khuyên các bạn nên chọn option thứ 2 vì nó sẽ tương thích với phiên bản 5.x trước đó của mysql và không gây ra lỗi gì khi bạn kết nối từ Laravel. Sau khi chọn option thứ 2 xong bạn bấm enter thì quá trình cài đặt mysql của bạn sẽ tiếp tục diễn ra và bạn hãy đợi trong giây lát. Sau khi quá trình cài đặt hoàn tất bạn tiếp tục thực hiện lệnh:
```bash
mysql_secure_installation
```

Để có theẻ cài đặt thêm một số tham số khác cho mysql. Lý do tại sao cần dùng lệnh này thì bạn có thể tham khảo tại [đây](https://dev.mysql.com/doc/refman/8.0/en/mysql-secure-installation.html). Sau khi chạy lệnh trên thì mysql sẽ yêu cầu chúng ta nhập lại password cho tài khoản root mà chúng ta đã chọn ở bước trước đó. Khi bạn nhập đúng password thì mysql sẽ hỏi chúng ta một số câu hỏi vê việc cài đặt. Ở đây sẽ có 2 phần bạn cần chú ý. Đó là về việc setup validate password cho các các user mysql về sau:

![](https://images.viblo.asia/09b783cb-024a-4572-81c8-05e0c77f699f.png)

Nếu bạn chọn Yes ở đây thì mỗi khi bạn tạo password cho user mới hoặc đổi password cho tài khoản root thì Mysql sẽ yêu cầu rất chặt chẽ về mật khẩu bạn chọn. Tuy nhiên ở đây vì để demo nên mình sẽ chon No. Tiếp đến mysql sẽ cho phép chúng ta đổi lại password cho tài khoản root nếu muốn:

![](https://images.viblo.asia/152628f3-fb52-4c3d-9b3b-2a058fb32bf0.png)

Tiếp đến là một số câu hỏi khác bạn có thể đọc và trả lời lần lượt hoặc có thể trả lời `Yes` như mình dưới đây vì các option `Yes` này đều góp phần làm tăng tính an toàn cho mysql của bạn:

![](https://images.viblo.asia/13514f1e-7d62-40d1-b717-43afde7909f2.png)

Sau khi xong phần này bạn có thể kiểm tra lại bằng cách truy cập vào mysql với username là root với password là mật khẩu bạn chọn như sau:
```bash
myssql -u root -p
```
Sau khi bạn nhập password xong sẽ truy cập vào mysql:
![](https://images.viblo.asia/ec9d6482-e497-4ffb-9807-9d0d4295eb27.png)

Tiếp đên ở đây chúng ta sẽ tiến hành tạo mới một database cho trang web của chúng ta với lệnh:
```bash
CREATE DATABASE [your_choosen_database_name];
```

Sau khi tạo database xong thì chúng ta nên tạo riêng một user mới dành riêng cho databse này và dùng đề làm user kết nối từ Laravel vào mysql thay cho việc dùng trực tiếp user root vì có thể dẫn đến một số vấn đề liên quan đến bảo mật. Để tạo user mới ta thực hiện các lệnh sau:
```bash
CREATE USER '[your_choosen_username]'@'localhost' IDENTIFIED BY '[your_choosen_password]';
```
Tiếp đến ta sẽ cấp đầy đủ quyền thao tác với database mà chúng ta đã tạo ở trên cho user mới tạo này bằng lệnh:
```bash
GRANT ALL PRIVILEGES ON [your_prvious_created_database_name].* TO '[your_previous_created_username]'@'localhost';
```
Sau khi tạo xong thì chúng ta gõ lệnh `exit;` để thoát khỏi mysql. Tiếp đến để kiểm tra xem việc tạo user đã thành công hay chưa thì ta sẽ tiến hành đăng nhập lại vào mysql với lệnh `mysql -u [your_created_ussername] -p` lúc này bạn sẽ truy cập vào bằng username và password mà bạn mới tạo. Nếu bạn nhập đúng thì nó sẽ xuất hiện lại giao diện như khi bạn đăng nhập với tài khoản root. Đến đây là chúng ta đã hoàn thành việc cài đặt `MySQL 8`. Tiếp đến để kết nối Laravel với mysql thì bạn cần chỉnh sửa lại file `.env` trong Laravel với các biến sau ứng với những gì bạn trước đó:
```bash
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```
Sau khi cập nhật xong thì cách đơn giản nhất để kiểm tra việc kết nối đó là bạn thực hiện lệnh `php artisan migrate`. Nếu kết nối thành công bạn sẽ thu được kết quả migrate thành công dạng như sau:

![](https://images.viblo.asia/ef57faec-46bc-4532-a4b1-3b3ce2e151a6.png)
Đến đây là kết thúc toàn bộ quá trình cài đặt cũng như kết nối Laravel với mysqsl.

### c. Cài đặt NodeJS v10

Mặc dù tiêu đề bài viết là deploy ứng dụng Laravel tuy nhiên ở đây mình vẫn hướng dẫn các bạn cài đặt `NodeJS` vì ứng dụng Laravel của bạn có thể dùng đến phần `Laravel Mix` để complie assets vì thể ở đây chúng ta vẫn cần cài đặt `NodeJS`. Việc cài đặt thì vô cùng đơn giản, bạn chỉ cần chạy lần lượt những lệnh như sau:

```bash
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install -y nodejs
```

Bạn đợi giây lát cho quá trình cài đặt diễn ra và sau đó có thể gõ lệnh `node -v` để kiểm tra quá trình cài đặt đã được chưa. Nếu không có vấn đề gì thì bạn sẽ thu được kết quả như sau:

![](https://images.viblo.asia/49e39023-b401-47a5-9f45-5067bcd16e23.png)

## 3. Kết bài
<hr>

Bài viết của mình đến đây là kết thúc. Cảm ơn các bạn đã đón đọc. Và như thường lệ nếu các bạn có bất cứ góp ý hay thắc mắc gì hãy comment ở ngay bên dưới bài viết và nhở để lại 1 update :D.