Hello anh em. Bài này mình xin giới thiệu 1 vài cái hay ho với việc gửi mail trong laravel.<br>
**Nội dung có trong bài viết này**
1. Đăng ký tài khoản sendgrid tạo sendgrid key free 30 ngày với 100 email/day
2. Gửi mail sử dụng sendgrid key
3. Gửi mail với dynamic key sendgrid
4. Gửi mail kèm hình ảnh nội tuyến (inline image)<br>
Bắt đầu thôi !
# Đăng ký tài khoản sendgrid tạo sendgrid key
## Tạo tài khoản gửi Email
1. Bạn cần truy cập [SendGrid](https://signup.sendgrid.com/) để đăng ký một tài khoản. Bạn cần phải nhập thông tin tài khoản đăng ký và tiếp tục nhập các thông tin khác 1 lần nữa, hãy nhập chính xác vì sendgrid kiểm tra rất kỹ, nếu thông tin không trung thực sẽ không thể đăng ký được.
![](https://images.viblo.asia/e905a18d-d41d-4ef6-856f-65574a7cd2e0.png)
2. Khi bạn đăng ký thành công thì sẽ có 1 email xác nhận gửi đến mail bạn vừa đăng ký.<br>
![](https://images.viblo.asia/6cb239be-f249-470c-ad20-4311668d277f.png)
<br>Confirm email để hoàn tất.
## Tạo sendgrid key
Sendgrid API Key là một chuỗi ký tự xác thực thay cho tài khoản gửi mail của bạn.
Tại trang Dashboard của Sendgrid bạn chọn mục API keys -> ở góc phải màn hình bạn chọn Create API key. Click vào General API key.
![](https://images.viblo.asia/805f6d19-9edf-45ba-a305-b0cd2ff5deca.png)
Chuỗi key được tạo ra và bạn cần lưu lại nó để sử dụng.
# Gửi mail sử dụng sendgrid key

Để demo phần này thì mình tạo project laravel 
1. Tạo project laravel
   `composer create-project --prefer-dist laravel/laravel sendmail`
2. Tạo file .env từ .env.exemple
3. Tạo controller để sử lý việc gửi mail
   ` php artisan make:controller MailController`
4. Thêm route ở file web.php 
`Route::get('/send', 'MailController@sendMail');`
5. Viết function sendMail() ở trong MailController<br>
Đến bước này thì run server lên và test gọi route xem vào được function sendMail chưa nhé, ok rồi thì mình bắt đầu viết phần send mail<br>
**Send Mail**<br>
Trước hết ta cần cài thư viện https://github.com/sendgrid/sendgrid-php để gửi mail nhé.<br>
Thư viện này giúp chúng ta gửi mail bằng sendgrid key hỗ trợ inline image và cả sử dụng sendgrid key động nữa => 1 trong 3 rồi, ngon ghê.<br>
*   Đầu tiên bạn cần cài bằng lệnh thông qua Composer.<br>
  `sudo composer require sendgrid/sendgrid`<br>
  Chạy xong lệnh thì kiểm tra phiên bản sendgrid trong file composer.json.
  ![](https://images.viblo.asia/633e65e8-067a-4d0e-ac73-c852c9254478.png)
  Cài thư viện xong rồi thì chúng ta cần viết code gửi mai ở function sendMail.
``` php
      public function sendMail() {
        $emailFrom = "abc@sun-asterisk.com";
        $nameFrom = "Name abc";
        $subject = "Đây là tiêu đề!";

        $emailTo = "nguyenthinhhn98@gmail.com";
        $nameTo = "Nguyễn Thịnh";
        $template = "<h1>hello </h1>";
        $key = "Add your Sendgrid Key here";


        $email = new \SendGrid\Mail\Mail();
        $email->setFrom($emailFrom, $nameFrom);
        $email->setSubject($subject);
        $email->addTo($emailTo, $nameTo);
        $email->addContent('text/html', $template);
        $sendgrid = new \SendGrid($key);
        $response = $sendgrid->send($email);
        return $response;
    }
```
Giải thích code:
- $emailFrom, $nameFrom: Đây là tên mà email ngửi sẽ hiển thị ở email gửi đi.
- $subject : tiêu đề email
- $emailTo, $nameTo:  email và name người nhận
- $template : nội dung email gửi đi ở đây mình để định dang text/html là có thể gửi đi dạng text và các thẻ html cũng sẽ hiển thị
- $key : key sendgrid mà mình đã đăng ký ở trên. <br>
Vậy là gửi được mail rồi.
# Gửi mail với dynamic key sendgrid
Về việc gửi mail key động. Chúng ta chỉ việc thay đổi giá trị biến $key, khi đó $email tạo ra sẽ phụ thuộc vào key đó, không giống như các phương pháp gửi mail khác thì chúng ta sẽ phải set lại key trong config.
# Gửi mail kèm hình ảnh nội tuyến (inline image)
Thư viện trên https://github.com/sendgrid/sendgrid-php đã tích hợp inline image cho chúng ta sử dung CID
Việc inline image sẽ giúp các hình ảnh gửi đi có thể thích hợp với nhiều trình duyệt hơn, linh ảnh sẽ khác ban đầu do sử dụng CID.<br>
1 hình ảnh được gửi đi có link như dưới đây


  ![](https://images.viblo.asia/9870f82c-a79b-4500-9f77-d930eb132fe0.png)

Cảm ơn mọi người đã theo dõi, phần sau mình sẽ viết thêm về 1 số kỹ thuật nho nhỏ về gửi mail trong laravel nữa, cùng theo dõi nhé.