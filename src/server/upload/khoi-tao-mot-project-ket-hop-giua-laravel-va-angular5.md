Xin chào các bạn. Hôm nay mình sẽ giới thiệu cách khởi tạo một project kết hợp giữa Laravel (backend) và Angular (frontend). Mình nói là khởi tạo project nhé, đây là bước đầu tiên để bạn tiếp tục tìm hiểu về Angular. Bài này chỉ giành cho những bạn bên Laravel nhé. Nào chúng ta cùng bắt đầu.
##  Tạo một project laravel.
Để thực hiện bước này máy các bạn phải cài composer. Để khởi tạo project laravel ta thực hiện lệnh sau trong terminal.
```
composer create-project --prefer-dist laravel/laravel LaravelAngular
```
 Ở đây mình đặt tên thưc mục là LaravelAngular. Sau khi khởi tạo các bạn config sever sao cho chạy được view welcome của laravel là xong bước 1.
##  Khởi tạo và copy code của Angular vào thử mục gốc của folder LaravelAngular.
Trước tiên các bạn phải cài Angular CLI bằng lệnh sau:
```
npm install -g @angular/cli
```
Sau khi cài xong Angular CLI thì tạo sẽ chạy lệnh sau bên ngoài thư mục LaravelAngular.
```
ng new AngularFolder
```
Sau khi chạy lệnh trên sẽ sinh ra thư mục chứa code Angular tên là AngularFolder.
Ta vào  thư mục AngularFolder copy tất cả file và folder bên trong và past vào root của folder LaravelAngular. Sau khi hoàn thành xong bước này folder LaravelAngular sẽ có cấu trúc thư mục như sau:
![](https://images.viblo.asia/8fe26253-956f-457d-bf0b-bca58ffbf483.png)
Như các bạn thấy. Thư mục của chúng ta giờ đâu có thêm một số thư mục và file mới so với project laravel đơn thuần như: src/, e2e/, angular-cli.json, ... và một số file khác. Các bạn tự tìm hiểu nhé.
##  Biên dịch
Angular sử dụng syntax typescript, do vậy chúng ta cần biên dịch từ typescript sang javascript để import vào view của chúng ta. Angular CLI đã hổ trợ chúng ta làm điều đó rất dễ dàng bằng cách chạy lệnh:
```
ng build (biên dịch một lần, sau đó nếu bạn thay đổi code phải chạy lại lệnh này)
```
hoặc lệnh
```
ng build --watch (biên dịch và 'quan sát' những thay đổi trong file angular để biên dịch mà không cần chạy lại lệnh này.)
```
Mặc định lệnh này sẽ tạo ra các file sau: 
```
inline.bundle.js
polyfills.bundle.js
styles.bundle.js
vendor.bundle.js
main.bundle.js
scripts.bundle.js
```
trong thư mục dist. Tuy nhiên chúng ta cần phải đưa những file này trong thư mục public của laravel để import vào file welcome.blade.php. Vậy chúng ta phải sữa lại trường "outDir": "public/js"  file angular-cli.json thành "outDir": "public/js". Tức là ta nói cho Angular CLI là 'mày bỏ những file mày biên dịch được vào thư mục public/js/ cho ta nhá'. Bây giờ chạy lại lệnh: 
```
ng build --watch
```
thì những file ở trên sẽ được đặt trong thư mục public/js.
##  Import nhưng file đã biên dịch vào file welcome.blade.php
Bây giờ thử import những file trên vào file welcome.blade.php thử nhé. Sau khi import file welcome.blade.php sẽ như sau:
```
<!DOCTYPE html>
<html>
<head>
    <title>This is Document about Programming</title>
    <base href="/">
</head>
<body>
    <app-root></app-root>
    <script type="text/javascript" src="js/inline.bundle.js"></script>
    <script type="text/javascript" src="js/polyfills.bundle.js"></script>
    <script type="text/javascript" src="js/styles.bundle.js"></script>
    <script type="text/javascript" src="js/vendor.bundle.js"></script>
    <script type="text/javascript" src="js/main.bundle.js"></script>
    <script type="text/javascript" src="js/scripts.bundle.js"></script>
</body>
</html>
```

Các bạn chú ý tag "<app-root></app-root>" là để nói cho Angular biết là render code html vào bên trong.
Giờ chúng ta thử refresh trang welcome laravel  xem  nhé.
Kêt quả là:
![](https://images.viblo.asia/71cefaae-cee7-4cac-9b1c-d4128bf3a33e.png)
Vậy là chúng ta đã kết hợp được laravel và angular. Bây giờ chúng ta có thể gọi api của server với angular để xây dựng một trang web hoàn chỉnh.
Lời kết.
Mong rằng bài hướng dẫn của mình sẽ giúp ích cho các bạn muốn kết hợp giữa laravel và Angular để tiếp tục tìm hiểu angular 5.