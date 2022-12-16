Đối với các website đơn giản có kinh phí nhỏ thì việc sử dụng Shared Hosting là một lựa chọn hoàn toàn hợp lí. Bởi mức chi phí chỉ từ 50k-100k/ tháng (cho 1 website) và sử dụng tương đối dễ dàng và được hỗ trợ nhiệt tình mỗi khi gặp sự cố.

Bạn có thể tham khảo các gói Hosting [tại đây](https://inet.vn/hosting/web-hosting?aff=40803) giá chỉ từ 49k

![](https://images.viblo.asia/a9b7b7af-d996-4cef-a5c6-fa32c1f6830a.png)


Bài viết này sẽ hướng dẫn các bạn đưa một ứng dụng web được lập trình bằng framework laravel lên shared hosting.

# 1. Chuẩn bị 
1. Cấu trúc thư mục của framework laravel: 

![](https://images.viblo.asia/22cbb5a7-7ce9-4ceb-8a34-5cb1d89a80cb.PNG)

3. Sau khi code xong project ở dưới môi trường local thì ta lần lượt chạy các lệnh sau 
*  `php artisan cache:clear`  để xóa bộ nhớ cache của ứng dụng
*  `php artisan config:clear` để xóa phiên bản được lưu trong bộ nhớ cache của file cấu hình nếu có.
*  `composer install / composer update` để composer sẽ tự động cập nhật các package cho bạn. Nếu muốn cập nhật lên các phiên bản mới hơn hoặc các bản release, hãy chỉnh sửa file composer.json.


*Nếu nhà cung cấp hosting cho phép bạn sử dụng SSH (Secured Shell) thì bạn có thể chạy trực tiếp các lệnh trên command thông qua địa chỉ IP hoặc Hostname (`ssh root@server-ip-or-hostname`)  được cung cấp. Tuy nhiên đối với các dịch vụ Shared Hosting thường thì không được phép sử dụng SSH nên chúng ta phải chạy các lệnh trên khi ở môi trường local. Đây là một trong các hạn chế của việc sử dụng Shared Hosting*


4. Sau đó nén toàn bộ project lại ở dạng **qtnv.zip**
5. Sau đó mở shared hosting cPanel ( truy cập  http://your-domain.com:2083 )

![](https://images.viblo.asia/0cae6586-2ef2-475f-ba61-7d3a558c5c1f.PNG)

6. Mở **File Manager** và upload project mà bạn vừa nén **qtnv.zip**  lên thư mục gốc không phải là *public_html*  và giải nén
7. Mở folder **qtnv** rồi di chuyển toàn bộ nội dung trong thư mục public sang *public_html*
![](https://images.viblo.asia/ed92d448-0485-422c-a2b1-1ef3a7e62267.PNG)

Tại sao phải chuyển các file như vậy? Bởi nhà cung cấp dịch vụ Shared Hosting đã mặc định thư mục  *public_html* là thư mục gốc.
# 2. Cấu hình lại project
* trong thư mục *public_html*  mở file **index.php** 
![](https://images.viblo.asia/6bf0933f-8d2e-428c-a16c-493b2ec788f2.PNG)
ở dòng 24 và 38 sửa lại thành 
![](https://images.viblo.asia/56f9e81b-7441-4f6e-ac7e-c929cba02db0.PNG)

Do khi ta di chuyển toàn bộ nội dung trong thư mục *public* sang *public_html* nên đường dẫn bị thay đổi nên ta phải sửa lại cho đúng.
* trong file ***.htaccess***  nếu không thay đổi gì thì nên giữ nguyên như mặc định ban đầu
'

            <IfModule mod_rewrite.c>
                  <IfModule mod_negotiation.c>
                      Options -MultiViews
                  </IfModule>

                  RewriteEngine On

                # Redirect Trailing Slashes…
                  RewriteRule ^(.*)/$ /$1 [L,R=301]

                # Handle Front Controller…
                  RewriteCond %{REQUEST_FILENAME} !-d
                  RewriteCond %{REQUEST_FILENAME} !-f
                  RewriteRule ^ index.php [L]
              </IfModule>'
              
              
# 3. Cấu hình database
nếu như ở môi trường local hay SSH thì ta sử dụng lệnh  `php artisan migrate` để thiết lập cơ sở dữ liệu tuy nhiên khi sử dụng  **shared hosting** thì việc này là không thể. Thay vào đó ta có thể xuất database từ http://localhost/phpmyadmin/ rồi nhập dữ liệu vào cPanel’s PHPMyAdmin.

Tạo cơ sở dữ liệu trên web host
Hầu hết các cPanel đều đi kèm với PHPMyAdmin và Mysql Database Wizard ở đây ta có thể tạo mới database và tạo và phân quyền cho người dùng.
![](https://images.viblo.asia/cd4ce81e-7414-48f5-82cd-ad0b418fdba0.PNG)

sau khi tạo tên cơ sở dữ liệu ta nhập dữ liệu lên web host

![](https://images.viblo.asia/4231b17e-797e-4894-b80a-947e5118106f.PNG)

cách sử dụng tương tự như đối với phpMyAdmin ở môi trường local.
 Tiếp đó ta cấu hình lại trong file **.env** các thông số:

*  `APP_URL=your-domain`  (ban đầu là  `APP_URL=http://localhost`)
* ` 'MYSQL_DATABASE' => 'your-database',`
* ` 'MYSQL_USERNAME' => 'your-username',`
*  `'MYSQL_PASSWORD' => 'your-password',`

Bước cuối cùng ta xem lại phiên bản php đã phù hợp với phiên bản laravel chưa, bằng cách tìm đếm mục Select PHP Version trên cPanel.

![](https://images.viblo.asia/9a31de4e-d1c7-4d4e-a1a4-4f3dc5f125a8.PNG)

# Kết luận 
Như ở đầu bài viết cũng đã nói việc sử dụng Shared Hosting chỉ nên dùng cho các website đơn giản ít sử dụng các công nghệ, bởi dịch dịch vụ này phụ thuộc vào gói dịch vụ và những mặc định từ phía nhà cung cấp dịch vụ .

Trên đây là toàn bộ hướng dẫn để đưa một ứng dụng web được lập trình bằng framework laravel lên shared hosting. Các bước thực hiện khá đơn, chúc các bạn thành công.