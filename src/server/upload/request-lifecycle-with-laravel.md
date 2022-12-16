# Lời nói đầu.

Khi sử dụng bất kỳ công cụ nào , chúng ta đều cảm thấy tự tin hơn nếu chúng ta có thể  hiểu cách công cụ đó hoạt động. Việc phát triển ứng dụng cũng vậy.  Khi bạn hiểu các công cụ phát triển hoạt động như thế nào, bạn cảm thấy thoải mái và tự tin hơn khi sử dụng chúng.

Mục đích của bài viết  này là cung cấp cho bạn một cái nhìn tổng quan cách  hoạt động của Laravel. Bằng cách có 1 cái nhìn tổng thể  hơn,bạn sẽ cảm thấy mọi thứ cảm thấy ít "huyền diệu"  hơn và tự tin hơn khi xây dựng các ứng dụng của mình. Ok, Let start !

# Lifecycle Overview
## First Things
Giống như mọi loại framework khác, mọi request của một ứng dụng Laravel đều được bắt đầu từ  file `public/index.php`. Tất cả các request chuyển đến file này đều được chuyển đến từ Web Server của bạn (`Apache / Nginx`). Trong file `index.php` sẽ không bao gồm nhiều đoạn code . Thay vào đó nó là điểm khởi đầu để loading phần còn lại của framework.

Nhìn vào source code của file này chúng ta sẽ thấy nó sẽ load ra 3 phần :
- `bootstrap/autoload.php` ==> Khởi tạo Auto Loader để  load ra các package được install từ `composer` 
- `bootstrap/app.php` ==> Khợi tạo bộ khung làm việc của framwork bao gồm 
    - `Http Kernel`  => xử lý các request từ brower lên server
   - `Console Kernel`  => xử lý các request từ các lệnh comand  (Vd : `php artisan`, `php artisan migrate` , .v.v....v)
   - `ExceptionHandler` => xử lý lỗi.
- Khởi tạo ra `Kernel` để làm tiếp tục đi tiếp

## HTTP / Console Kernels

Tiếp theo, các request sẽ được gửi đến `Http Kernel`   hoặc `Console Kernel` tùy thuộc vào loại yêu cầu đang cập nhật ứng dụng  (Dùng browser hay command). 2 `Kernel` này sẽ như là trung tâm điều khiển mà tất cả các yêu cầu sẽ phải đi qua tuy nhiên trong bài viết này chúng ta hãy chỉ tập trung vào tìm hiểu  `Http Kernel` thôi nhé . Vị trí của nó nằm ở `app/Http/Kernel.php`.

- `Http Kernel` được extends từ class `Illuminate\Foundation\Http\Kernel`. Nó định nghĩa một mảng `bootstrapper` sẽ được chạy trước khi request được thực thi. Những bootstrappers cấu hình việc xử lý lỗi, cấu hình `logs` ,[phát hiện môi trường ứng dụng](https://laravel.com/docs/5.4/configuration#environment-configuration)  (`develop`, `staging`, 'production`) và thực hiện các tác vụ khác cần được thực hiện trước khi request thực sự được xử lý.


- `Http Kernel` cũng định nghĩa một danh sách  [HTTP middleware](https://laravel.com/docs/5.4/middleware) mà tất cả các `request` phải đi qua trước khi được ứng dụng xử lý. Các [HTTP middleware](https://laravel.com/docs/5.4/middleware) này xử lý việc đọc và ghi  [HTTP  session](https://laravel.com/docs/5.4/session), xác định xem ứng dụng có đang ở chế độ bảo trì hay không, [xác minh token CSRF](https://laravel.com/docs/5.4/csrf) và hơn thế nữa.

- Hãy suy nghĩ về `Http Kernel` như là một trung tâm điều hành đại diện cho toàn bộ ứng dụng của bạn. Cung cấp cho nó các request HTTP và nó sẽ trả về các response HTTP.

### Service Providers

- Một trong những hành động khởi động hạt nhân quan trọng nhất là tải các [Service Providers](https://laravel.com/docs/5.4/providers) cho ứng dụng của bạn.

- Tất cả các nhà cung cấp dịch vụ cho ứng dụng được cấu hình trong `config / app.php` trong mảng `providers`. Đầu tiên, phương thức `register` sẽ được gọi trên tất cả các `providers` sau đó, khi tất cả các`providers` đã được đăng ký, phương thức `boot` sẽ được gọi để nap tất cả các `providers`

- Các `Service Providers` chịu trách nhiệm khởi động tất cả các thành phần khác nhau của Framework như : `database`, `queue`, `validation` và các thành phần định tuyến (`routing`). Vì chúng khởi động và cấu hình mọi tính năng được cung cấp bởi framework nên Service Providers` là thành phần quan trọng nhất của toàn bộ quá trình khởi động Laravel.

### Dispatch Request

Khi ứng dụng đã được khởi động xong và tất cả các `Service Providers` đã được khởi tạo thành công. Các `Request` sẽ được đưa đến  các bộ định tuyến ( `router`). Ở đây, các yêu cầu sẽ được được kiểm tra xem có tồn tại hay không , có cần chạy qua  [HTTP middleware](https://laravel.com/docs/5.4/middleware) đặc biệt  nào hay không và cuối cùng sẽ được điểu chuyển đến các `Controller` hoặc `router` (Các function tự định nghĩ trong router)

Đến đây thì chắc mình không cần viết thêm chúng nó tiếp tục chạy ntn nữa rồi nhỉ, vì ai cũng biết rồi =)) . 

# Kêt luận.
Ok, vậy là trên đây là mình đã miêu tả vòng đời của request nó như thế nào rồi. Mong rằng bài viết sẽ hữu ích với các bạn. Thank you for read!

# Tài liệu tham khảo
[https://laravel.com/docs/5.4/lifecycle](https://laravel.com/docs/5.4/lifecycle)