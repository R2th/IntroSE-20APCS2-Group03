> *Chào tất cả các bạn, đây là bài đầu tiên trong series dài nhiều tập "[Hành trình chinh phục Laravel Framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)". Để không phải nhiều rắc rối sau này, đây là những kinh nghiệm, tư liệu, trải nghiệm đúc kết trong quá trình học, có tham khảo tại [Laravel Documents](https://laravel.com/docs/5.8/), nếu có sai sót mong các bạn hãy để lại phản hồi bên dưới mỗi bài để cùng nhau học tập, chia sẻ kiến thức. Cảm ơn các bạn.*

Ở bài đầu tiên mình sẽ không giới thiệu về Laravel Framework là gì nữa, vì giờ có rất rất nhiều người đã nói về vấn đề này rồi. Và khi các bạn định học về Laravel cũng đã tìm hiểu nó là gì rồi phải không? Nên tập hôm này mình sẽ hướng dẫn các bạn làm thể nào để cài đặt một ứng dụng sử dụng Laravel.

# I. Những yêu cầu 
Vì đây là một framework lập trình theo hướng đối tượng nên có rất nhiều thuật ngữ, cũng như cơ chế rất mới lạ nên thiết yếu bạn phải nắm chắc được:
* PHP OOP 
* Mô hình MVC
* Biết sử dụng commander
* Rất tuyệt vời nếu bạn hiểu được khái niệm design pattern

# II. Cài đặt
Có rất nhiều cách để cài đặt Laravel framework, nhưng mình xin hướng dẫn 2 cách cơ bản mình đã sử dụng trong quá trình học. Những cách dưới đây vô cùng đơn giản, nhanh chóng cho những người mới bắt đầu.

Trước tiên bạn cần phải cài đặt:
* Composer
* Xampp (các bạn có thể chọn phần mềm khác)
* Một phần mệnh để chạy command line (thường là Command Prompt của Windows hay Terminal của Mac...)

> **Lưu ý**: PHP nên cài đặt ở phiên bản 7+ sẽ giúp ứng dụng Laravel chạy nhanh hơn.

Những cái trên chắc hẳn các bạn đều đã từng nghe qua hoặc đã từng cài đặt rồi nên mình không đi sâu chi tiết nhé!

Bây giờ chúng ta sẽ đi qua từng cách cài đặt Laravel.

## 1. Với Laravel Installer (Via Laravel Installer)
Đầu tiên, ta phải download Laravel Installer thông qua Composer với lệnh:

> composer global laravel/installer

Tiếp theo, gõ tiếp lệnh bên dưới

> laravel new blog

Sau khi cửa sổ lệnh báo hoàn tất thì chúng ta đã khởi tạo thành công một project với tên *"blog"*. 

## 2. Với Composer Create-Project (Via Composer Create-Project)
Gõ dòng lệnh bên dưới và đợi ít thời gian

> composer create-project --prefer-dist laravel/laravel blog

Sau khi lệnh hoàn tất, chúng ta cũng thu được một kết quả tương tự như cách ở trên.

Qua một trong hai cách trên, chúng ta đã có thể khởi tạo một ứng dụng Laravel framework rồi, tiếp theo chúng ta sẽ tìm hiểu cách để khởi động ứng dụng.

# III. Nạp máy chủ dành cho phát triển (Load local development server)
Nếu máy tính bạn đã cài đặt PHP thì có thể chạy dòng lệnh sau để khởi động server:

> php artisan serve

Sau khi chạy dòng lệnh, mở trình duyệt và truy cập địa chỉ http://localhost:8000, chúng ta sẽ thu được kết quả như hình bên dưới:

![](https://images.viblo.asia/c5122d21-0786-47ca-bc93-b990a72fdab9.JPG)

Mặc định, Laravel khi khởi động chạy ở port 8000, nếu muốn thay đổi thiết lập này có thể thêm tham số `port` vào lệnh:

> php artisan serve --port=8080

Ngoài ra, Homestead và Valet có hỗ trợ cho sever ảo để chạy Laravel tốt hơn cách trên, mình sẽ không nói ở đây, các bạn có thể tự tìm hiểu hoặc nếu có dịp mình sẽ có bài riêng về phần này.

-----

Cảm ơn các bạn đã quan tâm theo dõi. Cùng đồng hành với mình qua những tập tiếp theo tại series "[Hành trình chinh phục Laravel Framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" nhé! Chúc may mắn và hẹn gặp lại.

> Mình đang xây dựng blog riêng là [lechihuy.dev ](https://lechihuy.dev), mong các bạn ghé sang ủng hộ, mình cảm ơn rất nhiều ạ