## I. Mở đầu
### 1. Giới thiệu

![](https://i.imgur.com/JgS1RrY.png)

Chúng ta hiện đang sống trong một thời đại với công nghệ thông tin vô cùng phát triển. Cuộc cách mạng 4.0 đang biến đổi toàn thế giới nói chung và làm thay đổi từng thói quen, sinh hoạt sống của mỗi chúng ta nói riêng, đồng thời nó cũng tác động mạnh mẽ tới từng ngóc ngách của xã hội loài người. Những khái niệm mới được sinh ra có thể kể đến như công dân số, doanh nghiệp số, văn phòng điện tử, chính phủ điện tử, thành phố thông minh, ... tất cả trở nên phổ biến, dẫn gần gũi và trở thành xu hướng tất yếu của loài người.

Các thông tin cá nhân, sở thích, thói quen sinh hoạt của mỗi con người, hay xa hơn nữa có thể kể đến như các dữ liệu trường học, y tế, doanh nghiệp, chính phủ, ... đã trở thành một loại "tài sản" vô cùng giá trị và nhạy cảm. Đối với mỗi ứng dụng, sản phẩm web cũng vậy, chúng cũng chứa những thông tin "nhạy cảm" mà một khi bị tiết lộ cho kẻ xấu, có thể gây nên những tổn hại không thể lường trước.

### 2. Những thông tin nào được coi là "nhạy cảm"?

Có nhiều cách tiếp cận và khai thác các thông tin, dữ liệu từ một trang web. Để bạn đọc dễ hình dung, chúng ta có thể chia chúng theo các dạng:

- Thông tin liên quan tới con người: Các thông tin cá nhân của người dùng (người dùng thông thường, quản trị viên, hoặc một số người dùng vai trò khác) như: họ tên, số điện thoại, ngày sinh, địa chỉ, số thẻ ngân hàng, tên đăng nhập, mật khẩu, ...
- Thông tin liên quan tới các công nghệ web được sử dụng: mã nguồn trang web, các ngôn ngữ sử dụng, thông tin, phiên bản các framework, database, ... Ví dụ sử dụng extension Wappalyzer trong Google Chrome phát hiện một số công nghệ web đang sử dụng:

![](https://i.imgur.com/08EzUR8.png)

- Thông tin liên quan trực tiếp ứng dụng web: các đường dẫn nhạy cảm, các file log, file backup (tệp tin sao lưu), ...

## II. Những dữ liệu nhạy cảm thường "bị lộ" trong trường hợp nào?

### 1. Trực tiếp trong mã nguồn web

Một trong những nơi đầu tiên có thể tìm kiếm một số "thông tin thú vị" chính là mã nguồn các trang web. Tất nhiên đây chỉ là phần mã nguồn front-end cho phép hiển thị với người dùng chứ không phải toàn bộ mã nguồn. Tuy nhiên, chúng có thể chứa một số thông tin nhạy cảm của trang web như phiên bản công nghệ hiện đang sử dụng, hoặc một số lời nhắc, thông tin chú thích được các lập trình viên trao đổi với nhau mà ... quên chưa xóa! Ví dụ trường hợp sau, để tiện cho cả team developer sử dụng, tài khoản admin được comment trực tiếp trong source code nhưng chưa kịp xóa bỏ khi public sản phẩm tới người dùng:

![](https://i.imgur.com/DyKvIu0.png)

Điều này hoàn toàn có thể xảy ra trong thực tế. Và để xem mã nguồn của một trang web, các bạn có thể sử dụng tổ hợp phím **Ctrl + U**, hoặc sử dụng DevTools với tổ hợp phím **Ctrl + Shift + I**, ... Ngoài mã nguồn trang web, DevTools có thêm nhiều tùy chọn và thu được các thông tin khác.

![](https://i.imgur.com/FMeqgB2.png)

### 2. Từ các công nghệ web sử dụng

Mỗi công nghệ web thường có những thư mục mặc định cũng như các thông báo lỗi riêng. Chẳng hạn, khi sử dụng công nghệ Wordpress để xây dựng trang web thì mặc định đường dẫn tới trang đăng nhập admin có thể là:

- https://tenmiencuaban.com/wp-admin
- https://tenmiencuaban.com/admin
- https://tenmiencuaban.com/login
- https://tenmiencuaban.com/wp-login.php

![](https://i.imgur.com/WNicCoh.png)

Hoặc một số thông báo lỗi trong các công nghệ web sử dụng, ví dụ thông báo lỗi sau để lộ template được sử dụng là Handlebars, giúp kẻ tấn công thu hẹp phạm vi trong dạng tấn công **Server-side Template Injection**.

![](https://i.imgur.com/20WZ04a.png)

### 3. Từ chính cách hoạt động của trang web

Một số thông báo trả về cho người dùng có thể chứa những thông tin nhạy cảm. Chẳng hạn việc một người dùng nhập sai tên đăng nhập hoặc mật khẩu, dòng thông báo trả về chính xác như "Bạn đã nhập sai tên đăng nhập", "Bạn đã nhập sai mật khẩu", giúp kẻ tấn công có thể suy luận chính xác thông tin đang tìm kiếm. Các bạn có thể xem thêm tại chủ để **Authentication Vulnerabilitis**.

![](https://i.imgur.com/rR1H8B7.png)

## Các tài liệu tham khảo

- [https://portswigger.net/web-security/information-disclosure](https://portswigger.net/web-security/information-disclosure)