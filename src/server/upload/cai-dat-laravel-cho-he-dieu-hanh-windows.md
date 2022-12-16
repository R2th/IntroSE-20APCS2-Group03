## Bước 1: Cài đặt gói phần mềm XAMPP bao gồm webserver Apache, PHP, MySQL
Tải gói phần mềm XAMPP tại https://www.apachefriends.org/index.html

Cài đặt  XAMPP tên máy tính, khi cài xong nó sẽ có biểu tượng trong system tray, click đúp vào sẽ xuất hiện XAMPP Control Panel, click vào Start để chạy Apache MySQL như hình dưới:
![](https://images.viblo.asia/271b9b32-2426-4e08-bf26-81c63f93db7b.PNG)

Ok, bạn mở trình duyệt và kiểm tra đường dẫn http://localhost. Nếu chạy ra giao diện như hình dưới đây là mọi thứ đã ổn.

Nếu bạn thay đổi cổng port bạn phải đến đường dẫn có cổng port thay đổi đó. Ví dụ mh thay đổi port thành 8080 như hình. 
![](https://images.viblo.asia/f53707f6-44bd-4020-81f2-4b92460a797d.PNG)


## Bước 2: Cài đặt Composer
Để hiểu hơn về Composer bạn tham khảo bài viết Composer là gì và Hướng dẫn sử dụng Composer cơ bản. Tải bộ cài Composer  tại https://getcomposer.org/download/ Tải xuống và chạy Composer-Setup.exe về cài đặt trên máy tính. 

Sau khi cài đặt xong, kiểm tra xem việc cài đặt đã ok chưa: mở màn hình command line của Windows hoặc Git Bash gõ composer nếu xuất hiện như hình dưới đây là đã cài đặt xong.
![](https://images.viblo.asia/d838e6d7-6e25-474a-a8f6-3e9d970436be.PNG)

## Bước 3: Cài đặt Laravel và tạo một project laravel test
Trong cửa sổ command line hoặc Git Bash ở bước 2, chuyển về thư mục xampp/htdocs là thư mục mặc định chứa mã nguồn các website của Apache thực hiện lệnh cài đặt Laravel và tạo project laravel-test
```
$ composer create-project --prefer-dist laravel/laravel Test

```

Kết quả như màn hình dưới đây

![](https://images.viblo.asia/86753ec9-2e3e-47fd-b357-34dda810dcf7.PNG)

Sau khi cài xong, mở trình duyệt chạy http://localhost/Test/public sẽ là màn hình trang chủ của project laravel-test

Mình đã thay đổi cổng port nên mình sẽ truy cập vào http://localhost:8080/test/public/

![](https://images.viblo.asia/abe9a72d-08ad-463a-b449-cc069b812ae4.PNG)