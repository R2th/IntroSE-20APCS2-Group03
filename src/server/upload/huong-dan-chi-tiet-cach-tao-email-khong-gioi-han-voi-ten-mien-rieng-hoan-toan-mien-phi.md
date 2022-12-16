Theo như tiêu đề ,bài viết này em xin được mạn phép hướng dẫn mọi người cách tạo cho mình một email có tên miền riêng và bên cạnh đó.. mọi người có thể tạo không giới hạn email 

### Email có tên miền riêng là gì ?!
Chắc mọi người cũng đã từng thấy rất nhiều ,email có tên miền riêng thường được xuất hiện từ những công ty ,trường học ,.. nhìn thực sự rất chuyên nghiệp và khác biệt . Ví dụ : admin@tuilathanh.com thay vì admin@gmail.com ,@live.com

### Có thể tạo không giới hạn email ?! 

Nếu mọi người đã có ai từng có nhu cầu và thử tạo nhiều tài khoản gmail một lúc thì sẽ hiểu rằng : điều đó là không thể .Google sẽ chặn mọi người lại ngay lập tức, do hành động đó được xem như là một việc spam.

Nhưng với việc sở hữu một tên miền riêng và sử dụng dịch vụ Yandex Mail thì mọi chuyện lại hoàn toàn có thể giải quyết.

![](https://images.viblo.asia/ebe29743-8049-401e-91a7-e78335711bc7.png)

*/ Tất nhiên mọi người hoàn toàn có thể dùng email này để đăng ký những dịch vụ như : facebook, netflix, steam,.. /*

Tạm dừng việc lan man ,em xin phép được đi thẳng vào hướng dẫn chi tiết cách tạo email không giới hạn với tên miền riêng :

### Bước 1 : Đăng ký tài khoản Yandex
Trước hết ,để sử dụng dịch vụ Yandex Mail mọi người bắt buộc phải có một tài khoản Yandex ạ :

![](https://images.viblo.asia/b929def8-792c-47eb-81da-5efae9a765c0.png)

Link đăng ký tài khoản Yandex :https://passport.yandex.com/registration 

### Bước 2 : Đăng ký Yandex Mail
Sau khi có một tài khoản Yandex và đăng nhập sẵn ,để sử dụng dịch vụ Yandex Mail .Mọi người cần truy cập đường link này :

https://business.yandex.ru/mail

![](https://images.viblo.asia/3005928d-c2f8-4f36-af66-770dc24e89a1.jpg)

Tiếp theo :mọi người chọn ‘**Enable**‘ tại cột ‘**Free**‘ . Yandex sẽ tự động chuyển hướng mọi người tới trang ‘**Welcome**’ như hình dưới :

![](https://images.viblo.asia/e9c246d4-a2e5-46dd-a8fc-4a80b47c586b.jpg)

Tiếp theo :mọi người nhập tên miền mà mọi người muốn tạo cho email ,sau đó ‘**Accept and connect**’

Tiếp theo :sau khi nhập tên miền và kết nối thành công .Yandex sẽ tự động chuyển hướng mọi người tới trang ‘**Domain Verification**‘ như hình dưới :

![](https://images.viblo.asia/81907f6f-f479-4997-8731-eea4205171ef.png)

Vậy là mọi người đã đăng ký tên miền riêng cho email thành công rồi ạ ! Bây giờ mọi người chỉ cần xác nhận quyền sở hữu tên miền đó nữa thôi là hoàn tất.

### Bước 3 : Xác nhận tên miền
Đầu tiên ,mọi người truy cập vào trang quản lý DNS của tên miền → Sau đó mọi người tạo một TXT Record mới ,với Name là: ‘**@**‘ và Content là :’**yandex-verification..**‘ .

Mọi người copy đoạn text ở dưới hình :

![](https://images.viblo.asia/2a15e344-0fc4-4208-b6d7-c95ead44ad2c.jpg)

Sau đó mọi người copy vào phần ‘**Content**‘ của Record

![](https://images.viblo.asia/7bf6b973-ff89-46c2-a8d2-c011c04b268a.png)

*/ Lưu ý : Đôi khi ,quá trình ‘**Verifying domain**’ nhiều lúc sẽ phải mất một chút thời gian chờ đợi .Có thể mọi người sẽ không verify được ngay nhưng như vậy không có nghĩa là không thành công nha. Mọi người có thể đợi một lúc rồi ‘**Verify again**‘ /*

Sau khi ‘**verify domain**‘ thành công ,mọi người cần phải làm thêm 1 bước đó là: cấu hình ‘**Record MX**‘

![](https://images.viblo.asia/1041b3d3-2541-4536-b8bc-26914641efd6.png)

Để cấu hình MX Record cũng khá đơn giản ạ ,mọi người làm theo hình dưới :

*/ Nếu trong trang quản lý DNS của mọi người có sẵn MX Record rồi ,.. thì mọi người bắt buộc phải xoá hết đi /*

![](https://images.viblo.asia/55a4a514-3026-4556-a14d-4a2c2f51710e.png)

Sau khi thêm thành công MX Record trong trang quản lý DNS .Hệ thống của Yandex sẽ tự động cập nhật .. nếu không mọi người có thể cập nhật thủ công lại bằng cách click vào nút ‘**Check again**’

![](https://images.viblo.asia/1cd65864-62ca-4d0f-acb8-5b2a83dd48f7.png)

Khi hệ thống hiển thị như thế này :

![](https://images.viblo.asia/b41dddf8-7d86-4be8-8187-f84994480e82.png)

có nghĩa là mọi người đã hoàn toàn có thể sử dụng email với tên miền riêng được rồi !

### Bước 4 : Hoàn thiện
Khi hoàn thành 3 bước trên ,mọi người hoàn toàn có thể sử dụng 'email riêng' của mọi người được rồi .Nhưng để hoàn thiện cho chỉnh chu như :

* Tạo link đăng nhập riêng cho dễ nhớ
* Cấu hình DKIM để tránh mail gửi đi bị chuyển vào Spam

..thì mong mọi người bớt chút thời gian để làm nốt bước này ,rất nhanh thôi !

Đầu tiên ,để tạo link đăng nhập riêng cho dễ nhớ ,mọi người hoàn toàn có thể thêm Record CNAME như sau :

![](https://images.viblo.asia/d307bb7e-2969-4e1f-ab65-e9fe17405090.png)

* Type : CNAME
* Name : mail
* Target : domain.mail.yandex.net

Vậy là lần tới mọi người có thể đăng nhập mail bằng đường link sau : mail.domain-cua-moi-nguoi.com

Ví dụ ,domain của em là [bongdaplus](https://bongdaplus.fun/).fun thì link đăng nhập sẽ là : mail.[bongdaplus.fun](https://bongdaplus.fun/)

Thêm cấu hình DKIM để email gửi đi không bị di chuyển vào Spam :

Sau khi cấu hình thành công MX Record ,Yandex sẽ tiếp tục hiển thị thêm một tuỳ chọn đó là cấu hình chữ ký DKIM (không bắt buộc)

![](https://images.viblo.asia/e54f6f28-a987-497b-9063-80e2bfc3d375.png)

Để cấu hình chữ ký DKIM cũng rất đơn giản thôi, mọi người tiếp tục mở trang quản lý DNS ra ,và thêm như hình dưới :

![](https://images.viblo.asia/9c9e4c09-7d85-4179-9e76-45e43abf174c.png)

* Type : TXT
* Name : `mail._domainkey`
* Content : chữ kỹ DKIM của mọi người 

Như vậy là mọi người yên tâm gửi mail mà không bị chuyển mail vào Spam rồi !

Bonus : Tạo email không giới hạn như thế nào ?!
Yandex có một chức năng rất hay đó là “**Mailbox for lost emails**” :

![](https://images.viblo.asia/3f382192-bba2-40c5-95f0-6e0ced087801.png)

Mọi người chỉ cần điền vào một ’email mặc định’ .Sau đó khi đăng ký các dịch vụ như :facebook ,netflix ,.. Đến form điền email ,mọi người có thể điền bừa abc@tuilathanh.com ,xyz@tuilathanh.com . Tất cả mail của những ’email không tồn tại’ này đều được gửi tới ’email mặc định’.