Như bài viết trước mình đã giới thiệu các anh em về <strong><a href="https://hungphamdevweb.com/laravel-vai-phut-tim-hieu-laradock.html">Laradock</a></strong>, một thư viện mạnh mẽ sẽ giúp các anh em rất nhiều trong việc deploy product ( Laravel, CodeIgniter, Wordpress, Drupal, Magento ... )

Bởi vì mình là fan của <strong>Wordpress</strong> nên hôm nay mình sẽ chia sẽ cho các anh em một tutorial nho nhỏ về vấn đề config Docker trong mã nguồn mở <strong>Wordpress</strong>

Qua bài viết này mình nghĩ nó sẽ giúp các anh có thể bổ sung thêm cho mình vài kiến thức về Docker, cách vận hành của Docker, cách sử dụng Laradock và một tí kiến thức về <strong>Devops</strong>

Đây là link bài viết gốc của mình ahihi :smile_cat: :smile_cat:

**[https://hungphamdevweb.com/docker-config-docker-tren-wordpress.html](https://hungphamdevweb.com/docker-config-docker-tren-wordpress.html)**

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/x6dcxzh69i_config-docker-tren-wordpress.jpg)
<h2>Tại Sao Wordpress Lại Cần Docker?</h2>
<ul>
 	<li>Dễ dàng deploy và di chuyển qua server khác.</li>
 	<li>Sử dụng được nhiều tool để tối ưu tốc độ cho <strong>Wordpress</strong> ( php-fpm, varnish cache, nginx, mariadb, webpack, wp-cli ...)</li>
 	<li>Đồng bộ môi trường local của developer với môi trường server.</li>
 	<li>Khiến việc develop <strong>Wordpress</strong> thêm một tầm cao mới.</li>
 	<li>Một tiện ích khác từ docker đó là có thể config môi trường một lần và chạy được nhiều dự án khác nhau.</li>
 	<li>Biết thêm docker thì đi xin việc được nhiều tiền hơn.</li>
</ul>
Đại loại đó là một vài lí do để khiến mình tìm hiểu Docker và spend time cho nó.

Còn các anh em thì sao nhớ để lại bình luận ý kiến của mình bên dưới nhé :smile_cat: :smile_cat: :smile_cat:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/ecej7r48f1_docker-compose.jpg)
<h2>Các Bước Để Config Docker:</h2>
<h3>1.Thiết Lập Môi Trường</h3>
Ở đây mình sẽ sử dụng <a href="https://hungphamdevweb.com/laravel-vai-phut-tim-hieu-laradock.html"><strong>Laradock</strong></a> để config môi trường

Bởi vì mình muốn config một lần và chạy multi-project do đó dưới đây là cấu trúc tổ chức cấp thư mục của mình.
```
+laradock
+wordpress project
+laravel project
+drupal project
```
Sau khi đã nắm rõ cấu trúc trên, trước tiên các anh em cần git clone project <strong>Laradock</strong> về bằng command bên dưới
```
git clone https://github.com/Laradock/laradock.git
```
Sau đó cd vào floder <strong>Laradock</strong> và tạo file .env bằng dòng lệnh sau:
```
cp env-example .env
```
Sau khi đã tạo file .env chúng ta cần nắm rõ vài thứ trước khi bắt đầu run các container trong <strong>Laradock</strong>

Ở đây chúng ta config để run <strong>Wordpress</strong> do vậy chỉ cần run một vài container như sau:
<ul>
 	<li>phpmyadmin để truy cập vào quản lí database</li>
 	<li>nginx web server để run script PHP</li>
 	<li>workpsace nơi để làm việc giữa docker với project, dùng để run composer, wp-cli, npm ...bla...bla</li>
 	<li>mariadb là database dùng để lưu dữ liệu</li>
</ul>
Sau đó chúng ta sửa một tí trong file .env này, vì ở đây mình dùng mariadb thay vì dùng mysql nên các anh em cần tìm dòng <code>PMA_DB_ENGINE</code> và đổi lại như sau:

```
PMA_DB_ENGINE=mariadb
```

Sau khi đã chỉnh sửa file config xong, tiếp theo chúng ta sẽ run các container theo dòng lệnh bên dưới:

```
docker-compose up -d nginx phpmyadmin mariadb workspace
```

<h3>2.Config Wordpress</h3>
Sau khi đã thiết lập môi trường xong, các anh em giải nén mã nguồn <strong>Wordpress</strong> ngang cấp với thư mục <strong>Laradock</strong> như mình đã đề cập ở trên.

Bước cuối cùng cần edit một tí trong file config của Nginx để nhận diện thư mục <strong>Wordpress</strong> của mình.

Các anh em vô thự mục Nginx trong <strong>Laradock</strong>, chọn edit file `default.conf`
```
root /var/www/tên-thư-mục-wordpress
```
Restart lại Nginx bằng dòng lệnh sau:
```
docker-compose restart nginx
```
Truy cập đường dẫn <code>localhost:port-ngix</code> để bắt đầu cài.
Thông số về db để config <strong>Wordpress</strong> như sau:

DB Host: mariadb

DB Name: default

User: default

Pass: secret

Và cuối cùng là enjoy kết quả sau khi đã cất công mày mò cài đặt.

Nếu các anh em nào không hiểu có thể tham khảo cách cài đặt thông qua video của mình bên dưới nhé.

https://www.facebook.com/hungphamdevweb/videos/285697412320415/

Mọi thắc mắc vui lòng để lại bình luận bên dưới, thân chào và quyết thắng :smile_cat: :smile_cat: :smile_cat: