Trong quá trình làm ứng dụng, chắc hẳn không ít lần bạn phải switch qua lại giữa các môi trường develop, staging hay production để làm việc. Những môi trường này sẽ có những server url khác nhau, app icons và cấu hình khác nhau.

![](https://images.viblo.asia/0e5870d0-0fd1-4e3b-9c13-a756696b6bae.png)

Một số cách thông dụng để quản lý các môi trường:
*   Sử dụng comments
* 	Sử dụng biến global hoặc enums
*   Sử dụng configurations và schemes với global flag
*   Sử dụng configuration và scheme với plist file
*   Sử dụng configuration và scheme với configuration file

Đối với các cách dùng comment hay enums, trước khi tạo build cho một môi trường, cần phải thay đổi server url. Ta có thể thay đổi bằng việc comment các url khác nhau hay dùng flag, tuy nhiên việc làm này sẽ trở nên phức tạp nếu phải thay đổi ở nhiều nơi, hoặc nếu bạn quên không đổi url khi release app thì sẽ khiến bản build không chạy được.

Những công việc thủ công trên có thể hoàn toàn tránh được bằng cách sử dụng schemes và configuration, chỉ cần cấu hình một lần, những lần sau ta chỉ cần chọn môi trường mình muốn build là sẽ build được ứng dụng với những cấu hình phù hợp.

Bài viết này sẽ hướng dẫn các bạn cách quản lý các môi trường build của một app iOS bằng scheme và configuration.

### Tạo môi trường
Đầu tiên hãy tạo mới một ứng dụng và đặt tên là ConfigEnvironments. Ta cần tạo các môi trường Development, Staging và Production. Vào Project/Info/Configuration, đặt lại tên của môi trường hiện tại thành Debug (Development) và Release (Development). Sau đó, duplicate Debug và Release cho các môi trường còn lại như sau:
![](https://images.viblo.asia/b5eb19c2-c1a8-4451-ad6c-243231267001.png)

### Tạo schemes
Chọn Manage Schemes, sau đó tạo mới các schemes và đặt tên là Staging và Production với container là project hiện tại:
![](https://images.viblo.asia/11c90093-a9ac-4e17-b8b0-1a60dd72639d.png)

### Định nghĩa server url
Ta cần định nghĩa các server url cho từng môi trường, trong project build settings, thêm mới giá trị và đặt tên là server_url:
![](https://images.viblo.asia/f50ab4c0-d831-4a15-9743-d63c30607de1.png)

Trong file Info.plist, định nghĩa biến server_url để app gọi tới khi cần lấy giá trị.
![](https://images.viblo.asia/183218d4-fe18-458f-b5dc-317b79009651.png)

### Liên kết schemes với configuration
Đây là bước cuối cùng ta cần thực hiện để báo cho app biết scheme nào sẽ đi với config nào.
![](https://images.viblo.asia/e5ff5d65-fdf1-4c02-b94c-af3b2f96afb7.png)

Ngoài ra, ta còn có thể set những app icon riêng biệt cho từng cấu hình một cách dễ dàng.
![](https://images.viblo.asia/6596132a-ec99-4d47-9e22-f7b5bb8ab237.png)

Và bây giờ, chỉ cần với một cái kích chuột là bạn đã có thể build được ứng dụng trên môi trường mong muốn mà không phải tốn thêm một chút công sức nào nữa.

![](https://images.viblo.asia/0e9096c5-292e-43dc-8f7c-172e5bafc8fd.png)