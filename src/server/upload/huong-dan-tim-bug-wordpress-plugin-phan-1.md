**[Viblo May Fest 2021](https://mayfest.viblo.asia/)** là sự kiện nhằm thúc đẩy việc chia sẻ kiến thức, chung tay phát triển cộng đồng IT Việt Nam. Những người tham gia sự kiện sẽ nhận được những phần quà hấp dẫn đến từ ban tổ chức.

![](https://images.viblo.asia/f7faff70-54f2-4964-9716-b42f89e7d9ec.png)

Mình tham gia sự kiện với loạt bài viết về cách tìm bug wordpress plugin. Bài viết được đúc kết từ quá trình tìm bug của mình và hy vọng rằng nó phần nào hữu ích với bạn đọc (những bạn muốn tìm bug mà chưa biết bắt đầu từ đâu và tiến hành như thế nào). Qua loạt bài này các bạn sẽ biết được cách nên bắt đầu từ đâu và tiến hành tìm bug như thế nào.

Loạt bài mình tạm thời chia làm 3 phần:
+ Phần 1: Tìm hiểu wordpress, cài đặt môi trường, các chức năng cơ bản nên biết.
+ Phần 2: Tìm hiểu plugin wordpress.
+ Phần 3: Tìm lỗi SQL injection.

# Wordpress là gì?
Những bài viết dạng trả lời câu hỏi này có rất nhiều trên mạng như:
+ Tổng quan về wordpress
+ Wordpress là gì và để làm gì
+ Ưu và nhược điểm của wordpress
+ So sánh với những CMS khác như Drupal, Joomla

Mình sẽ không nhắc lại lý thuyết về phần này nữa các bạn có thể lên google tìm đọc. Trong phần này mình chỉ nêu tổng quát sao cho các bạn chưa tiếp cận wordpress bao giờ có thể hiểu được.

> **[Wordpress](https://wordpress.org/)** là một phần mềm quản trị nội dung (**CMS**) mã nguồn mở và được code bằng **PHP**. Wordpress cho phép người dùng quản trị website mà không cần biết code là gì. Người quản trị chỉ cần vào đó viết bài theo ý mình còn lại đã có wordpress lo.

![](https://images.viblo.asia/08c7c1f1-3c5f-4880-857a-ba60c305f119.png)

Wordpress có cộng đồng sử dụng lớn nên các vấn đề gặp phải khi cài đặt và sử dụng sẽ được giải quyết một cách dễ dàng. Không chỉ vậy, wordpress có một kho các plugin khổng lồ với gần 60 nghìn plugin. Với số lượng lớn như vậy, nó có thể giải quyết hầu hết các vấn đề mà người quản trị gặp phải.

![](https://images.viblo.asia/e831cc4a-b73a-477c-a43a-105c8f0388b4.png)

# Cài đặt môi trường
Sau khi có cái nhìn tổng quan về wordpress giờ là lúc cài môi trường để tìm bug. Trong bài mình thực hiện cài đặt trên **Ubuntu 20.04 LTS**. Để bài viết có tính chính xác nhất mình đã tạo một server Ubuntu mới tinh trên Google Cloud. Khi tạo xong server mình SSH tới server và tiến hành cập nhật hệ thống.

![](https://images.viblo.asia/2324a02c-ee01-4a52-8496-410c844afcd1.png)

```bash
sudo apt update -y
sudo apt upgrade -y
```

Sau khi cập nhật hệ thống xong mình bắt đầu cài các dịch vụ cho web server: Apache, MySQL, PHP.

## Cài đặt Apache
Chạy lệnh sau để cài đặt apache
```bash
sudo apt install apache2 -y
```

![](https://images.viblo.asia/cf2c350a-6fad-4093-ac23-0b3411a057e7.png)

Đợi quá trình cài đặt chạy xong mình truy cập vào địa chỉ IP server để kiểm tra apache đã chạy chưa.

![](https://images.viblo.asia/80396e05-500e-4e43-8f73-6bd4ead368c0.png)

Nếu kết quả hiện ra như hình trên là apache đã hoạt động bình thường.

## Cài đặt MySQL
**Cài đặt MySQL**
```bash
sudo apt install mysql-server -y 
```

**Cài đặt bảo mật cho MySQL**
```bash
sudo mysql_secure_installation
```

**Cặt đặt độ mạnh mật khẩu cho MySQL**

Chọn **y** để chọn mức độ mạnh của mật khẩu đăng nhập vào MySQL.

![](https://images.viblo.asia/230b7e1d-f312-4012-a868-60e87a105e82.png)

Tiếp đó là chọn mức độ mạnh của mật khẩu. Trong trường hợp này mình chọn độ mạnh ở mức thấp nhất (tức là **0**).
```text
There are three levels of password validation policy:

LOW    Length >= 8
MEDIUM Length >= 8, numeric, mixed case, and special characters
STRONG Length >= 8, numeric, mixed case, special characters and dictionary file

Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG: 0
```

Sau khi chọn độ mạnh xong, hệ thống yêu cầu nhập mật khẩu cho **root** user.

![](https://images.viblo.asia/6c005587-09af-4f8e-af2c-d9313fcc710e.png)

**Xóa bỏ tài khoản nặc danh**
Sau khi cài xác nhận mật khẩu cho **root** user. Hệ thống hỏi có muốn xóa tài khoản nặc danh không ta chọn **y** để xóa tất cả tài khoản nặc danh khỏi MySQL.

![](https://images.viblo.asia/ff3f492c-cf40-4415-a5b6-3f4f22d4c12b.png)

**Từ chối tài khoản root đăng nhập remote**

![](https://images.viblo.asia/0a07771a-b008-48c9-a1f5-163944256871.png)

**Xóa database test**

![](https://images.viblo.asia/e9c5ca68-9793-4641-a400-9586cb1a48c8.png)

**Cập nhật quyền**

Sau khi thực hiện các bước cài đặt trên cuối cùng là cập nhật lại quyền MySQL.

![](https://images.viblo.asia/121be7c3-562c-4a50-a4c4-8f778ffb31ef.png)

**Kiểm tra MySQL**
Sau khi cài đặt thành công tiến hành kiểm tra xem MySQL có hoạt động bình thường không bằng cách truy cập vào MySQL thông qua terminal.
```bash
sudo mysql
```

![](https://images.viblo.asia/d1717d2d-a2c6-4c27-af40-3e53deaf8675.png)

Kết quả như trên hình là đã cài đặt thành công.

### Thêm tài khoản MySQL
Thông thường mình không dùng tài khoản root để đăng nhập mà mình sẽ tạo thêm một tài khoản nữa và cấp quyền cho tài khoản này.

**Thêm tài khoản MySQL**
```sql
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin123123';
```

**Gán quyền**
```sql
GRANT ALL PRIVILEGES ON * . * TO 'admin'@'localhost';
```

**Cập nhật lại quyền**
```sql
FLUSH PRIVILEGES;
```

Kết quả

![](https://images.viblo.asia/ea9a01d5-d54d-4f54-b4a3-e7446127ba45.png)

### Thêm database
Ta sẽ tạo thêm database để lát nữa cài wordpress.
```sql
create database wordpress;
```

Vậy là đã cài đặt xong MySQL.

## Cài đặt PHP
Chạy lệnh dưới đề cài đặt các gói cần thiết.
```bash
sudo apt install php libapache2-mod-php php-mysql -y
```

Đợi đến khi cài đặt xong ta kiểm tra PHP.
```bash
php -v
```

![](https://images.viblo.asia/f607f800-38a8-43f4-b3b5-12f52a85179e.png)

**Cài đặt Apache tải file .php trước**

Sửa file `dir.conf`
```bash
sudo vim /etc/apache2/mods-enabled/dir.conf
```

Thêm `index.php` vào file để được nội dung như dưới.
```text
<IfModule mod_dir.c>
	DirectoryIndex index.php index.html index.cgi index.pl index.php index.xhtml index.htm
</IfModule>
```

**Reload lại apache**
```bash
sudo systemctl reload apache2
```

**Tạo info.php**

Trước tiên cần phải cài lại quyền sở hữu cho thư mục `/var/wwww/html`.
```bash
sudo chown -R www-data:$USER /var/www/html/
```

Cấp lại quyền
```bash
sudo chmod -R 775 /var/www/html/
```

**Tạo file info.php**
```bash
echo '<?= phpinfo();?>' > /var/www/html/info.php
```

**Kiểm tra kết quả**
Sau khi tạo file **info.php** ta truy cập vào địa chỉ `http://IP/info.php` nếu có kết quả như hình dưới là đã cài PHP thành công.

![](https://images.viblo.asia/222ed2f6-3b4c-46c8-9740-ec28c896ecc1.png)

## Cài đặt Wordpress
Sau khi cài các gói cần thiết biến server thông thường thành web server. Tiếp đến ta tải và cài đặt wordpress, công việc cài đặt này rất đơn giản.

**Tải wordpress**
Để tải wordpress ta có thể truy cập vào https://wordpress.org/download/ và chọn bản mới nhất. Trên server của mình không có giao diện nên mình sẽ thực hiện tải bằng lệnh.

**Di chuyển vào thư mục DocumentRoot**.
```bash
cd /var/www/html
```

Nếu không biết **DocumentRoot** của mình ở đâu thì chạy lệnh.
```bash
cat /etc/apache2/sites-enabled/000-default.conf  | grep DocumentRoot
```

![](https://images.viblo.asia/5545aec0-d817-491a-8a14-6292b219f7e1.png)

**Tải Wordpress bản mới nhất**
```bash
wget https://wordpress.org/latest.zip
```

**Giải nén**
```bash
unzip latest.zip
```

nếu hệ thống báo không tìm thấy `unzip` thì chạy lệnh dưới.
```bash
sudo apt install unzip -y
```

![](https://images.viblo.asia/b85b7e43-c22a-4891-b397-3dae6d3986a6.png)

**Chuyển tất cả file ra thư mục Root**
```bash
rm -f index.html; mv wordpress/* .; rm -rf wordpress
```

**Phân quyền cho thư mục**
```bash
sudo chown -R www-data:$USER /var/www/html/; sudo chmod -R 775 /var/www/html/
```

### Cài đặt wordpress
Để cho không phải nhớ địa chỉ IP mình sẽ sử dụng DNS local. Sửa file `/etc/hosts` (**file trên máy tính của mình không phải trên server**).
```bash
sudo vim /etc/hosts
```

Thêm dòng vào file hosts
```text
35.220.200.32 wordpress.lab
```

![](https://images.viblo.asia/374ae748-e6a5-4163-b789-e61f9d88ab86.png)

Truy cập vào `http://wodpress.lab` sẽ hiện ra màn hình cài dặt.

![](https://images.viblo.asia/13236725-cf5a-4cac-a758-8c8b90d3e33b.png)

**Cấu hình database**

Tại bước này ta điền thông tin database đã cài đặt ở trên.

![](https://images.viblo.asia/8c9c5995-6007-44f2-a583-3df675840ea1.png)

**Cấu hình Site**

![](https://images.viblo.asia/c7b34b49-29c9-4f9d-824d-0922dc9e54f5.png)

Bước này điền thông tin tùy ý, sau khi điền sau chọn nút **Install WordPress**.

*Lưu ý: Mật khẩu wordpress mặc định là mật khẩu phức tạp. Nếu muốn mật khẩu không an toàn thì phải tích vào ô "**Confirm use of weak password**"*

Sau khi cài đặt xong màn hình thông báo thành công sẽ hiện ra.

![](https://images.viblo.asia/fa8f8011-3dc3-4915-9110-625f1d28895b.png)

## Giới thiệu tính năng
Để truy cập vào trang quản trị ta truy cập vào đường dẫn http://wordpress.lab/wp-login.php và đăng nhập với thông tin đã tạo ra ở bước cài đặt. Khi đăng nhập thành công màn hình quản trị của admin sẽ hiện ra.

![](https://images.viblo.asia/f3142311-4b19-4be5-b2bb-df4542f3ae0d.png)

Trong phần này mình sẽ không nêu toàn bộ tính năng mà chỉ tập trung vào các tính năng phục vụ cho quá trình tìm bug. Còn lại các bạn nên google tìm đọc thêm.

Các tính năng nên biết:
1. Plugins: Thêm mới, kích hoạt, hủy plugin.
2. User: Thêm mới, xóa, các vài trò của tài khoản.
3. Post: Tạo mới, xóa, sửa.

### Tính năng Plugins
Khi tìm bug trong wordpress plugin thì tính năng đầu tiên cần biết đó là plugins. Ta cần biết tìm cài đặt và sử dụng plugin thì mới có thể tìm bug trong plugin đó được.

![](https://images.viblo.asia/dd1900f3-6cfa-417c-a4e0-dec1a12c4a47.png)

Khi mới cài đặt wordpress mặc định sẽ có 2 plugin được cài theo nhưng chúng không được kích hoạt. Để thêm mới plugin ta chọn vào **Add New** và tìm kiếm plugin muốn cài đặt. Để cài đặt plugin nào đó ta chọn **Instal Now**.

![](https://images.viblo.asia/123db1a4-a094-42ab-99a7-99678113b2d2.png)

Trong ví dụ này mình cài **My Calendar**

![](https://images.viblo.asia/c8b0a650-81e1-4726-84be-7c554e63c358.png)

Sau khi cài xong ta active lên để plugin có thể hoạt động.

### Tính năng User
Wordpress cho phép quản trị viên tạo nhiều tài khoản để quản trị trang web, với mỗi user có thể có các quyền khác nhau. Wordpress cung cấp 6 vai trò khác nhau.
1. Super Administrator: Có quyền truy cập vào trang quản trị network và tất cả các tính năng khác.
2. Administrator: Có quyền dùng tất cả các tính năng không có quyền truy cập vào network.
3. Editor:  Publish post và quản lý bài viết của các người dùng trong wordpress.
4. Author: Publish post và quản lý bài biết của chính người này tạo ra.
5. Contributor: Viết và quản lý bài viết của mình nhưng không được publish.
6. Supscriber: Chỉ quản lý profille của chính họ.

### Tính năng Post
Wordpress cho phép người dùng viết nội dung sau đó sẽ publish lên trang web.

![](https://images.viblo.asia/9e183639-bd58-45f7-bff9-f300f12fa6a4.png)

![](https://images.viblo.asia/6845f32c-3aa9-49b5-af7e-23b8cbb9309e.png)

Đến đây thì phần 1 cũng đã kết thúc. Mong rằng qua phần này các bạn mới hiểu được các tạo một web server, tạo database, cài đặt wordpress và dùng một số tính năng cơ bản.