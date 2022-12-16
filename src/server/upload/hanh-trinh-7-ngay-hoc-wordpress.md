## 1. Lời mở đầu
 Xin chào tất cả mọi người, hôm nay đến với bài chia sẻ này mình muốn chia sẻ với mọi người một CMS miễn phí tạo website, blog nhanh, dễ dàng với tất cả mọi người.
 
Mình chia sẻ là mình mới học wordpress 1 tuần nhé. Tại sao mình tìm đến nó là do mình dev lập trình web cho công ty. Đối với dự án maintain thì công việc làm cũng không nhiều lắm, đợt này mình cũng thế sau khi làm xong hết task được giao thì mình muốn học thêm một cái gì đó cho đỡ chán.

Lập trình website thì mình cũng làm một số framework, ngôn ngữ lập trình website như PHP với framework Laravel, Ruby với framework Ruby on Rails. Mình thấy các framework đó hỗ trợ rất mạnh lập trình web, từ khi mình làm quen với wordpress thì mình cảm thấy nếu muốn tạo một website giới thiệu của công ty, trang web chia sẻ kiến thức hay blog cá nhận thì thấy wordpress có điểm nổi bật hơn một số các framwork lập trình website khác.

Tại sao mình lại nó wordpress nó lại phù hợp với website nhỏ hay blog thì các bạn đọc tiếp phần dưới nhé!

## 2. Tìm hiểu về wordpress
   Wordpress làm một phần mềm mã nguồn mở viết bằng ngôn ngữ  PHP và quản trị cơ sở dữ liệu MYSQL.
   
   Ưu điểm:
   - Chi phí thấp: bạn mất tiền mua tên miền bà web hosting, còn phần mềm WordPress, theme, plugin đều miễn phí.
   - Dễ cài đặt và cập nhật: bạn có thể dễ dàng cập nhật wordpress thông qua một nút kích chuột. Không giống như các ngôn ngữ khác chúng ta phải sửa code để thay đổi, wordpress có thể sử đổi ngay trên cả giao diện.
   - Quản trị đơn giản: Bạn có thể là lập trình viên hay người không biết lập trình cũng có thể dễ dàng sử dụng thành thạo.
   - Giao diện tùy chỉnh: Với rất nhiều các wordpress themes giao diện sẵn sàng thay đổi của bạn.
   - Cộng đồn hỗ trợ rất đông đảo vì nó là mã nguồn mở nên cho phép mọi người cùng phát triển nó.

   Nhược điểm:
   
   - Vấn đề bảo mật: vì wordpress có trên 30% website trên toàn thế giới nên nó là mục tiêu của các hacker.
   - Khi chúng ta cài một plugin mới thì rất có thể có lỗi vì các plugin này do bên thứ 3, cá nhân khác tạo nên có thể bị lỗi.
   - Nếu bạn cài quá nhiều plugin thì khi tải trang thì rất chậm.
  
 Wordpress thường được sử dụng tạo một số website như: blogs, website doanh nghiệp, cửa hàng online... 
## 3 Cài đặt và sử dụng
### 3.1 Cài đặt xampp
Các bạn tải xampp về máy tính nhé. Muốn tải xampp các bạn vào trang chủ dowload https://www.apachefriends.org/download.html

Sau khi dowload về các bạn chạy file vừa tải về và chúng ta đươc giao diện:

![](https://images.viblo.asia/b10a57b6-0391-4cf6-8f34-34891bbe49b6.jpg)

Các bạn cứ nhấn nút "Next" từ đầu đến cuối nhé, sau khi cài xong chúng ta mở xampp lên và start 2 cổng apache và MySql nhé.

![](https://images.viblo.asia/c134ce63-5d46-4a26-91b4-ecfbf02e46de.PNG)

Công việc cài đặt xampp hoàn thành và bạn chỉ cần cài đặt wordpress nữa là chúng ta có thể thực hiện tạo một blog cho riêng mình rùi. Hãy theo dõi tiếp phần dưới nhé.

### 3.2 Cài đặt project wordpress
 Đầu tiên các bạn cần có một source code wordpress để chạy ứng dụng trên localhost của mình các bạn vào địa chỉ dưới đây để dowload về nhé:
 https://wordpress.org/download/
 
 Sau khi dowload thư mục wordpress về bạn giải nén và để nó trong thư mục htdocs ở trong thư mục xampp mình hướng dẫn cài ở trên.
 
 Và đây là forder có thư mục wordpress:
![](https://images.viblo.asia/aab53d65-348e-4507-8d49-7c9027a17aba.png)

Cài đặt project wordpress theo những bước dưới đây nhé:

B1: Ở trình duyệt bạn gõ http://localhost/wordpress/    -> lưu ý ở đây file bạn sau khi giải nén bạn có thể đặt tên thư mục khác với mặt định là wordpress nhé, nếu bạn thay tên thì với đường dẫn trên bạn thay cụm từ wordpress bằng tên thư mục bạn đặt nhé.

 - Giao diện đầu tiên bạn nhìn thấy đó là cấu hình database trên website:
 ![](https://images.viblo.asia/e6e57e1c-ebe3-42e1-8b37-826a8f06c54c.png)
 - Mình tiến hành cấu hình database trên website.
 - Ở đây mình giải thích một số trường:
 
```
    Database Name: tên database bạn muốn đặt
    Username: Tên đăng nhập database(phpMyAdmin)
    Password: password của database
    Database Host: Đây là host chạy database
    Table Prefix: Tên bắt đầu của các bảng trong database
```
B2: Tạo database các bạn truy cập vào địa chỉ http://localhost/phpmyadmin/ ở đó lưu trữ các database để chạy wordpress:

 - Các bạn tạo mới một database có tên trùng với tên bạn đặt Database Name ở phần cài đặt website:
 ![](https://images.viblo.asia/d96fe2e2-bc56-424c-bd48-679b98a0176b.png)
 
 - Các bạn chọn ngôn ngữ mà website hiển thị nhé:
 
 ![](https://images.viblo.asia/73f92e9d-6eff-4aa3-b343-fcaefcb4e4d2.png)
 
 -  Bạn nhập tên website ban đầu, username, password, email đăng nhập trang quản trị:
 
 ![](https://images.viblo.asia/798896b3-c352-4ef9-9607-3608e2c400a9.png)
 
Ok sau khi bạn chạy đến bước này cơ bản là đã cài đặt xong website wordpress rùi đó, các bạn nhấn install và đăng nhập vào tài khoản bạn vừa đặt nhé. Giao diện đầu tiên mà bạn nhìn thấy là trang quản trị:

![](https://images.viblo.asia/2ba55155-7066-464e-a75a-3ba21d68788f.png)

Đây là trang chủ ban đầu sau khi cài đặt nhé:

![](https://images.viblo.asia/bd2784a5-4175-46a9-9294-b2a010ba916f.png)
 
 
## 4. Tìm hiểu về trang admin
Phần này thì mình giới thiệu về trang admin cho các bạn nhé: 
![](https://images.viblo.asia/f05143fb-ec3e-4c2f-8f09-b4ee94c138d9.png)

Chức năng của từng phần:

- Posts: đây là trang quản lý bài viết của bạn.
- Media: Đây là thư viện lưu các ảnh bạn upload lên trong mỗi bài post.
- Pages: Đây là các trang tĩnh bạn thường để tạo những trang như là trang liên hệ, chính sách, giới thiệu website blog.
- Comments: Đây là trang quản lý comment của bạn đọc.
- Appearance: Đây là trang để bạn chỉnh sửa giao diện hiển thị ra trang ngoài màu sắc, ảnh nền, ẩn hiện các phần của theme
- Plubgins: Đây là chức năng quan trọng trong cấu hình wordpress, ở đây các bạn có thể cài đặt các plubgin sử dụng trên trang website của bạn như giao diện, dịch ngôn ngữ, plubgin hỗ trợ đăng nhập, gửi mail...
- Users: Đây là trang quản lý các user đăng nhập trên trang web, wordpress cung cấp rất nhiều loại user đăng nhập như: thành viên đăng ký, cộng tác viên, tác giả, biên tập viên, người quản trị. Đối với mỗi lại user có một quyền riêng.
- Tools: Đây là phần import, export dữ liệu trên trang web, kiểm tra hệ thống...
- Settings: Đây là phần cấu hình tổng thể như tên website, cấu hình bài post, media...

Đối  với những bạn mới học wordpress thì mình đưa ra một số plubgin hỗ trợ việc sử dụng:

 - Classic Editor: Plugin hỗ trợ trình soạn thảo văn bản nhiều tính năng
 - Loco Translate: Dịch ngôn ngữ hiển thị trên trang web
 - WP SMTP: Hỗ trợ gửi mail
 - Google Apps Login: Hỗ trợ đăng nhập bằng google
 ...
## 5. Chuyển website chạy từ localhost lên host
Ở đây mình desploy code lên host demo nên mình dùng host miễn phí nhé(000webhost).

Các bạn cần đăng ký một tài khoản trên trang 000webhost để có thể upload web lên host miễn phí nhé.

![](https://images.viblo.asia/84382e5a-9616-45ed-8667-5ac494125f88.PNG)

Đây là trang quản trị website của bạn bạn chọn vào vào nút upload file trong khung Create New Website ô thứ 4.

Các bạn zipcode thư mục website wordpress của bạn ở local sau đó chọn nút upload file thanh trình duyệt bên trên. Sau khi upload thành công thì bạn tiến hành giải nén thư mục vào forder public_html nhé.

Kết quả chúng ta đã upload thành công code lên website

![](https://images.viblo.asia/c0e89142-e26b-4772-bbaf-78895d1745e3.PNG)

Bây giờ mình sẽ hướng dẫn các bạn tạo database nhé. Các bạn vào trang quản trị website và chọn nút Công cụ -> Quản lý database.

Ở đây bạn nhất nút tạo database mới và nhập các thông tin như DB Name, DB User, DB Host, password. Kết quả sau khi bạn tạo được như dưới, các bạn nhớ thông số vừa rồi nhé, chúng ta cần phải config một chút ở file wp-config.php để có thể kết nối với database chạy trên trang web.

![](https://images.viblo.asia/9186f794-840a-477c-9089-8487a8e70ef8.PNG)

Bạn vào thư mục vừa giải nén upload code lên chọn vào file wp-config.php và điền DB Name, DB User, DB Host, password vào rùi nhấn Save nhé.

![](https://images.viblo.asia/b2559e7c-66e4-482b-ac49-5e99f6b698c3.PNG)

Sau bước này là cơ bản các bạn đã hoàn thành một website hay blog cá nhân cho riêng mình rồi nhé. Rất đơn giản phải không nào còn chần chờ gì mà không thử.

 Đây là thành quả mình đã học làm wordpress 7 ngày nhé:
 
![](https://images.viblo.asia/8a485e0d-0c04-4c36-b779-73175cc2340c.png)

Các bạn nếu học wordpress và có những blog, website riêng thì có thể comment cho mình biết nhé, nếu bạn nào biết nhiều về wordpress thì cùng nhau chia sẻ để mọi người cùng biết.

## 6. Kết luận
Dựa trên những bước cài đặt cũng như sử dụng wordpress ở trên mình đã chia sẻ thì rất dễ phải không nào. Còn chờ gì nữa mà các bạn không tạo một website, blog của riêng mình. Cám ơn bạn đã đọc bài chia sẻ của mình!!!!

Link học wordpress cho những bạn mới bắt đầu nhé:

+ https://www.tutorialspoint.com/wordpress/
+ https://thachpham.com/series/hoc-wordpress-co-ban
+ https://thachpham.com/tong-hop-serie/wordpress-nang-cao