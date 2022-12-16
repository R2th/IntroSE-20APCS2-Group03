Hẳn trong thực tế các bạn đã gặp phải trường hợp chia nhiều domain cho một trang web. Ví dụ đơn giản là trang web bán hàng "webbanhang.com" và trang admin cho web bán hàng đó "admin.webbanhang.com".
Trong bài viết này, chúng ta sẽ cùng bàn luận cách để config Virtual Host cho một project Laravel tại local sử dụng Apache làm web server.
# Virtual host là gì?
Virtual host là một định nghĩa chỉ chức năng nhúng nhiều tên miền vào một địa chỉ IP của một Server. Và bằng cách cài đặt riêng, Server sẽ nhận biết được tên miền nào sẽ hoạt động ở một folder nào. Điều này mang ý nghĩa rất lớn vì chúng ta không cần mỗi tên miền một địa chỉ IP mà chỉ cần một server là có thể nhúng hàng trăm tên miền cùng hoạt động.

# Config Apache để sử dụng Virtual host
Chúng ta cần có apache để config 1 virtual host. Nếu bạn chưa cài apache thì có thể làm theo hướng dẫn ở link này: https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-ubuntu-18-04.
<br>
Một trong những khó khăn hay gặp nhất khi config project Laravel trên Apache HTTP Server là `mod_writer` không được enable. Laravel cần `mod_writer` để chuyển đổi URL sang routing của nó thông qua `.htaccess`
<br>
Trong một số nền tảng Ubuntu, `mod_writer` mặc định sẽ được enable, nhưng vì lý do bảo mật mặc định bây giờ sẽ bị disable. Để enbale `mod_writer` chúng ta cần chạy lệnh
```
sudo a2enmod rewrite
sudo service apache2 restart
```
# Tạo virtual host
Để tạo một virtual host mới chúng ta cần tạo một file config mới, trong đó sẽ khai báo tên virtual host của chúng ta. Ở đây mình sẽ vd có 2 trang web: 1 là localdriver.local và 2 là admin.localdriver.local.
<br>
Bạn cần quyền admin để thao tác các tệp đó, vì vậy đừng quên sử dụng sudo nếu bạn không có quyền truy cập root.
```
sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/admin.localdriver.local.conf
sudo nano /etc/apache2/sites-available/admin.localdriver.local.conf
```
## Sửa file config
File config sau khi được tạo ra sẽ như thế này.
```
<VirtualHost *:80>
        # The ServerName directive sets the request scheme, hostname and port t$
        # the server uses to identify itself. This is used when creating
        # redirection URLs. In the context of virtual hosts, the ServerName
        # specifies what hostname must appear in the request's Host: header to
        # match this virtual host. For the default virtual host (this file) this
        # value is not decisive as it is used as a last resort host regardless.
        # However, you must set it for any further virtual host explicitly.
        #ServerName www.example.com
 
        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html
 
        # Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
        # error, crit, alert, emerg.
        # It is also possible to configure the loglevel for particular
        # modules, e.g.
        #LogLevel info ssl:warn
 
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
 
        # For most configuration files from conf-available/, which are
        # enabled or disabled at a global level, it is possible to
        # include a line for only one particular virtual host. For example the
        # following line enables the CGI configuration for this host only
        # after it has been globally disabled with "a2disconf".
        #Include conf-available/serve-cgi-bin.conf
</VirtualHost>
 
# vim: syntax=apache ts=4 sw=4 sts=4 sr noet
```
Các bạn hãy sửa lại như sau:
```
 <VirtualHost *:80>
    ServerAdmin admin@example.com
    ServerName admin.localdriver.local
    ServerAlias www.admin.localdriver.local
    # Đây là đường dẫn đến folder project của bạn
    DocumentRoot /var/www/localdriver/public
 
    <Directory /var/www/localdriver/>
            Options Indexes FollowSymLinks MultiViews
            AllowOverride All
            Order allow,deny
            allow from all
            Require all granted
    </Directory>
 
    LogLevel debug
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```
## Thêm entry vào host
Ở trên bạn đã admin.localdriver.local là tên server. Chúng ta cần config hệ thống để khi chúng ta nhập admin.localdriver.local ở trong trình duyệt thì sẽ chuyển hướng về localhost.
<br>
Để làm điều này chúng ta cần thêm entry vào file host của máy 
```
sudo nano /etc/hosts
```
Thêm dòng này vào cuối file
```
127.0.0.1       admin.localdriver.local
```
Bây giờ config đã xong, chúng ta cần kích hoạt trang web mới.
```
sudo a2ensite admin.localdriver.local.conf
```
Sau đó reload lại apache server
```
sudo service apache2 reload
```
Với trang localdriver.local thì các bạn cũng làm tương tự nhé :D
# Cài đặt project Laravel
## Chuẩn bị file env
Trong file env của project hãy thay đổi `APP_URL` và thêm `APP_ADMIN_URL`  như sau:
```
APP_URL=http://localdriver.local
APP_ADMIN_URL=http://admin.localdriver.local
```
## Khai báo route
Chúng ta có 2 domain khác nhau nên giờ cần chia route theo domain. Ở đây mình đơn giản sẽ group các route theo domain
```
Route::group(['domain' => env('APP_ADMIN_URL')], function() {
    Route::get('/', function() {
        return 'Đây là trang admin';
    }
}
Route::group(['domain' => env('APP_URL')], function() {
    Route::get('/', function() {
        return 'Đây là trang người dùng';
    }
}
```
# Chạy thử
Chúng ta đã chuẩn bị xong rồi. Bây giờ chạy thử nào
![](https://images.viblo.asia/567ed3e6-06b5-4d66-8816-728f6cf11698.gif)