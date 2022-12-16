<div align="justify">

Trước khi tìm hiểu về PHP-FPM ta cùng tìm hiểu vòng đời của 1 request nhé:
* Khi mà người dùng muốn xử lý dữ liệu trong database (xem, thêm, sửa, xóa) người dùng sẽ thao tác với trình duyệt để sản sinh ra các request, các request này được bắn tới Server PHP, và dựa trên yêu cầu của request mà server sẽ xử lý dữ liệu theo ý người dùng, ví dụ:<br>
    - 1 request yêu cầu xem chi tiết sản phẩm
    - 1 request yêu cầu sửa đổi thông tin sản phẩm
* Nhưng không phải cứ thế là người dùng bắn 1 phát request tới Server PHP luôn được, mà nó cần có 1 WebServer (Nginx, Apache) có trách nhiệm hứng thao tác người dùng và sinh ra các request sau đó quyết định cách connect tới Server PHP và chuyển request này cho Server PHP xử lý tiếp.
* Khi Server PHP xử lý xong nó sẽ gửi response tới WebServer, sau đó WebServer gửi response về cho người dùng (thường sẽ hiển thị trên web)<br>

Dưới đây hình ảnh minh họa cách mà WebServer (Nginx, Apache) và Server PHP (PHP-FPM) hoạt động với nhau
![image.png](https://images.viblo.asia/54b66577-b0d1-420d-b4d7-5c3ccaa59714.png)

Và Server PHP ta nhắc đến ở trên, được sử dụng rộng rãi nhất hiện nay chính là PHP-FPM. Vậy PHP-FPM là gì

### 1. Vai trò của PHP-FPM
* FPM là viết tắt của “FastCGI Process Manager”, mỗi khi có 1 request được gửi đến, nó sẽ được xử lý bởi 1 worker, PHP-FPM có nhiệm điều khiển công việc tải request đến worker, sinh và diệt các worker.
* Tập hợp các worker lại với nhau được gọi là 1 pool. và với 1 Server PHP-FPM có thể có nhiều pool, trong mỗi pool sẽ lại có nhiều worker đang xử lý request.

Dưới đây là ảnh minh họa cách PHP-FPM điều phối request gửi đến, 1 worker chỉ có thể xử lý 1 request tại 1 thời điểm, trong pool này đang có 5 worker chờ để xử lý request, các request sẽ đợi đến khi có worker rảnh sẽ được PHP-FPM điều phối đi để xử lý.
**1 worker được coi như là 1 process (tiến trình).**

![image.png](https://images.viblo.asia/4e91c0db-1f9d-4867-9fad-93b8d873d4f2.png)

Lấy ví dụ, ta có một dây chuyền sản xuất bánh kẹo. Ở đây PHP-FPM có trách nhiệm quản lý các worker, worker là những công nhân, đứng đợi các gói  bánh (request) được chuyển tới bằng dây chuyền (Nginx). sau khi đóng gói bánh vào thùng, công nhân (worker) đưa thùng bánh (respone) trở lại dây chuyền (Nginx) để mang ra bán cho khách hàng. Mỗi công nhân không có 3 đầu 6 tay nên chỉ xử lý 1 gói bánh 1 lúc thôi, khi xong thì mới xử lý đến gói bánh tiếp theo được.

![image.png](https://images.viblo.asia/3f73538e-e7a5-4af9-a338-cef2db23ed0b.png)

### 2. Vai trò của Pool
Vậy với ứng dụng của tôi chỉ cần 1 pool là chạy bình thường rồi vậy tại sao lại sinh ra lắm pool làm gì thế không biết ??? :joy:

Việc tạo ra các pool riêng biệt  trong thực tế là việc chạy nhiều website ở trên cùng 1 Server, ví dụ ta có một hệ thống bán hàng code bằng Magento, có thể chia hệ thống ra làm 2 phần:
* Frontend: nơi khác hàng truy cập và mua hàng
* Backend: nơi Admin quản lý staff, product,...

    
Vì chạy cùng trên 1 Server, nên cả site Frontend và Backend đều dưới quyền của cùng 1 User, như vậy nếu có lỗ hổng từ Frontend thì hacker có thể truy cập vào Backend để lấy cắp dữ liệu khách hàng, gây mất uy tín và ảnh hướng tới thương hiệu của mình.
Khi đó ta nên chia ra, Frontend và Backend nên được xử lý bởi 2 pool riêng biệt, mỗi pool lại có owner User khác nhau làm tăng khả năng bảo mật. Ở mỗi pool ta còn có thể config các thông số để làm tăng perfomance nữa, nhưng ở bài này tôi chỉ giới thiệu về vai trò của PHP-FPM thôi chứ không đi vào mảng turning, vì tôi có biết cái gì đâu mà nói :stuck_out_tongue_closed_eyes: nó liên quan đến mảng DevOps.

![image.png](https://images.viblo.asia/f292678a-1aa7-4c03-a159-317fa9192c60.png)

Việc chia ra thành các pool cũng giống như việc phân chia các bộ phận trong nhà máy, chỗ thì sản xuất bánh, chỗ thì đóng gói dây chuyền.<br>
Tôi là chủ nhà máy, tôi không muốn nhiều người biết tới công thức để làm bánh ngon, nên chỉ cho phép một vài công nhân (worker) làm ở bộ phận này thôi. Những ai mà ko có quyền thì không thể vào được. <br>
Việc chia pool ra như vậy sẽ làm tăng bảo mật, tăng tính tùy chỉnh nhưng tài nguyên sẽ bị vơi bớt, cũng như nhà máy mở rộng hạ tầng vậy, sẽ tốn rất nhiều đất, rồi máy móc thiết bị.

### 3. Config file PHP-FPM cho Docker
```
[www]
user = nginx
group = nginx
listen.owner = nginx
listen.group = nginx
listen = /var/run/php-fpm/strawberry.sock

pm = dynamic
pm.max_children = 50
pm.start_servers = 5
pm.min_spare_servers = 5
pm.max_spare_servers = 35

slowlog = /var/log/php-fpm/strawberry-slow.log

php_admin_value[error_log] = /var/log/php-fpm/strawberry-error.log
php_admin_flag[log_errors] = on

php_value[session.save_handler] = files
php_value[session.save_path]    = /var/lib/php/session
php_value[soap.wsdl_cache_dir]  = /var/lib/php/wsdlcach
```
Với Dockerfile được viết cho dự án này thì đây là config cho 1 pool có các thông số:
* **[www]** định danh cho pool
* **user**/**group**: pool sẽ được chạy dưới quyền của user & group này
*** listen.owner** /** listen.group**: đây là user và group chạy Nginx, giá trị này phải match với user và group mà Nginx được config
* **listen**: giao thức để kết nối giữa PHP-FPM và Nginx, ở đây ta dùng ``unix socket`` sẽ được giải thích ở dưới
* **pm = dynamic** : ý nghĩa số lượng work sẽ được config theo các giá trị sau
* **pm.max_children** = 50 : số lượng worker tối đa cùng tồn tại ở 1 thời điểm
*** pm.start_servers **= 5 : số lượng worker được tạo khi khởi động server
*** pm.min_spare_servers **= 5 : tối thiểu có 5 worker nhàn rỗi đang chill, ăn chơi ngủ nghỉ chờ request (= với start_servers)
* **pm.max_spare_servers** = 35 : tối đa có 35 worker nhàn rỗi đang chill, ăn chơi ngủ nghỉ chờ request (nếu có 39 thằng rảnh háng thì kill 4 thằng đi cho còn 35)
    
### 4. Unix Socket là gì ?
* Unix socket là một điểm giao tiếp để trao đổi dữ liệu giữa các ứng dụng trên cùng một máy tính. Khác với giao thức TCP/IP thực hiện ở giao thức mạng, Unix socket thực hiện ở nhân hệ điều hành, nhờ vậy có thể tránh được cách bước như kiểm tra hoặc routing, đem lại tốc độ kết nối nhanh hơn và nhẹ hơn so với TCP/IP. Nhưng cũng vì thế bắt buộc 2 ứng dụng đó phải kết nối với nhau trên cùng một server.
* Bản chất của Unix Socker là 1 tập tin, với file config trên ta sử dụng file ``strawberry.sock`` là điểm giao tiếp giữa PHP-FPM và Nginx. File này được tạo ra khi build Image
</div>