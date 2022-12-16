Ngày nay trong sự phát triển web, các dự án dựa trên API là mô hình phổ biến để tạo ra dịch vụ có thể được truy cập qua nhiều nền tảng như điện thoại di động hoặc trang web. 
Laravel là một trong những framework tốt nhất để tạo dự án API-based, nó cung cấp tốc độ phát triển với một cộng đồng lớn trên toàn thế giới. 
Laravel được built in bao gồm composer cho phép bạn cài đặt thêm một số packages để phát triển nhanh hơn. 
Dưới đây là một số package hữu ích mà bạn phải cài đặt khi bạn quyết định bắt đầu dự án.

### 1. Barryvdh/laravel-debugbar

Debugging là một quá trình quan trọng trong quá trình phát triển, bằng cách xác định một vấn đề, cô lập source của vấn đề và sau đó sửa lỗi. 
Laravel debugbar là một package cho phép bạn nhanh chóng và dễ dàng debug ứng dụng của bạn trong quá trình phát triển. 
Đây là package đã tích hợp PHP Debug Bar với Laravel 5. Nó bao gồm một ServiceProvider để register debugbar và gắn nó vào output. Package có thể được tìm thấy ở đây (https://github.com/barryvdh/laravel-debugbar).

### 2. Tymondesign/jwt-auth

Authentication là quá trình xác minh bạn là ai, xác định danh tính người dùng sau quá trình đăng nhập. 
Để đơn giản, bạn nên sử dụng JWT như một phương pháp nổi bật để xác thực quy trình. 
JWT (JSON Web Token) là một phương tiện nhỏ gọn, an toàn cho URL để thể hiện các khiếu nại được chuyển giao giữa hai bên. Đây là package phổ biến cho jwt trong laravel (https://github.com/tymondesigns/jwt-auth).

### 3. Zizaco/entrust

ACL (Access Control List) là một hoạt động được thiết lập cho một hệ thống có quyền truy cập cho mỗi người dùng. 
ACL chứa các vai trò và quyền để quản lý quyền truy cập cho người dùng cụ thể. 
Laravel đi kèm với ACL mặc định có tên Gate. Gate là tên của class và facades, nhưng theo tôi thì Gate hơi khó dùng một chút, vì vậy hãy đi đến packagist(https://packagist.org/) và tìm một số package đơn giản để quản lý ACL. 
Có rất nhiều package cho ACL, zizaco/entrust (https://github.com/Zizaco/entrust)  là package ACL phổ biến nhất cho laravel

### 4. Spatie/laravel-fractal

Điều quan trọng trong dự án dựa trên API là API response output. Laravel đi kèm với package ORM có tên Eloquent,có đầu ra dữ liệu mặc định là json hoặc array. 
Nếu bạn tạo response từ một hoặc hai table thì điều đó không thành vấn đề, nhưng nếu response của bạn xuất hiện từ năm table trở lên thì thật đau đớn. 
Fractal là giải pháp để tạo ra response đẹp cho API của bạn. Fractal cung cấp một transformation layer cho dữ liệu phức tạp. Spatie/laravel-fractal (https://github.com/spatie/laravel-fractal) đi kèm với facades để dễ dàng tích hợp vào dự án laravel.

### 5. Webpatser/laravel-uuid

UUID (Universally Unique IDentifier) là một bộ gồm 128 bit character, chứa các chữ cái và số. Mỗi bộ là duy nhất, đảm bảo tính duy nhất trong không gian và thời gian, bạn có thể đọc thêm về nó ở (https://tools.ietf.org/html/rfc4122). UUID có thể bảo mật hệ thống của bạn khi người dùng truy cập dữ liệu. Webpatser/laravel-uuid là package laravel để tạo UUID theo tiêu chuẩn RFC 4122, bạn có thể tìm thấy dự án này tại (https://github.com/webpatser/laravel-uuid).

### 6. Intervention/image

Intervention Image (https://github.com/Intervention/image) là một thư viện xử lý và xử lý hình ảnh trong PHP cung cấp một cách dễ dàng để create, edit, and compose images. Package này bao gồm ServiceProviders và Facades để tích hợp dễ dàng trong laravel.

### 7. Davibennun/laravel-push-notification

Push notification là tin nhắn văn bản tức thời được gửi trực tiếp đến màn hình hiển thị di động của người dùng. 
Push notification cũng tăng tỷ lệ tương tác và cải thiện tỷ lệ duy trì người dùng. Do đó, nó không chỉ có thể giúp thúc đẩy hoạt động về chủ đề tin nhắn của bạn, mà nó còn giúp tăng lợi nhuận bạn nhìn thấy từ ứng dụng của mình. Davibennun/laravel-push-notify (https://github.com/davibennun/laravel-push-notification) là package dễ nhất để gửi thông báo tới các thiết bị. Chúng hỗ trợ push notification service trong APNS (apple) và GCM (google).

### 8. Spatie/laravel-backup

Điều quan trọng cuối cùng trong dự án của bạn là luôn sao lưu dữ liệu của bạn. Trong laravel có package là laravel-backup(https://github.com/spatie/laravel-backup) tạo bản sao lưu cho ứng dụng của bạn. Bản sao lưu là một tệp zip chứa tất cả các tệp trong các thư mục bạn chỉ định cùng với kết xuất cơ sở dữ liệu của bạn. Bản sao lưu có thể được lưu trữ trên bất kỳ hệ thống tập tin nào bạn đã cấu hình trong dự án của bạn. Bạn có thể sao lưu ứng dụng của mình vào nhiều hệ thống tập tin cùng một lúc.

Bài viết được sưu tầm và lược dịch từ: https://medium.com/skyshidigital/8-laravel-must-have-packages-to-install-when-you-start-a-new-api-based-project-18d690f24d0e