## Introduction Google reCAPTCHA
   Google reCAPCHA là một dịch vụ miễn phí bảo vệ website của bạn khỏi những spam tự động. reCAPCHA sử dụng công cụ phân tích rủi ro tiên tiến và  reCAPTCHA thích ứng để ngăn chặn phần mềm tự động có các hoạt động lạm dụng website của bạn. Nó thực hiện điều này và dễ dàng pass với người dùng hợp lệ.
   
   reCAPTCHA hiện tại có những type sau:
1.  [reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3)
1. reCAPTCHA v2
* [Checkbox ](https://developers.google.com/recaptcha/docs/display)("I'm not a robot" Checkbox)
* [Invisible](https://developers.google.com/recaptcha/docs/invisible) (Invisible reCAPTCHA badge)
* [Android](https://developer.android.com/training/safetynet/recaptcha.html)

    Để bắt đầu sử dụng reCAPTCHA, bạn cần đăng ký API key cho trang web của mình [tại đây ](http://www.google.com/recaptcha/admin).
   Mọi người có thể tùy chọn type reCAPTCHA khi tạo API key. Khi đăng ký thành công bạn sẽ nhận được một cặp key:
   - SITE KEY (key này public bên client)
   - SECRET KEY (key này private và được sử dụng để tạo ReCaptcha class xử lý request từ client)
## render reCAPTCHA
Bạn cần insert Javascript resource sau:
```
    <script src="https://www.google.com/recaptcha/api.js"></script>
```
Tiếp đó để render reCAPTCHA bạn có thể làm như sau:
```
    <form action="?" method="POST">
          <div class="g-recaptcha" data-sitekey="your_site_key"></div>
          <br/>
          <input type="submit" value="Submit">
    </form>
```
Sau khi bạn thực hiện hợp lệ theo yêu cầu của google reCAPTCHA, bạn sẽ nhận được một `g-recaptcha-response` param. Param này sẽ được đẩy lên server khi bạn submit.
## Using reCAPTCHA with PHP
Để sử dụng reCAPTCHA với PHP, bạn có thể tải xuống thư viện [PHP reCAPTCHA.](http://code.google.com/p/recaptcha/downloads/list?q=label:phplib-Latest) Bạn sẽ chỉ cần một file (recaptchalib.php) là đủ.

Việc tiếp theo là bạn tạo một class reCAPTCHA với secret key api và xác nhận g-recaptcha-response là hợp lệ vs reCAPTCHA class vừa được tạo.
  ```
  <?php
      require_once 'recaptchalib.php';
      $reCaptcha = new ReCaptcha(RECAPTCHA_SECRECT_KEY);
      $response = null;
      
      if ($_POST['g-recaptcha-response']) {
          $response = $reCaptcha->verifyResponse(
            $_SERVER['REMOTE_ADDR'],
            $_POST['g-recaptcha-response']
        );
        
        if ($response != null && $response->success) {
            echo 'handle a successful';
        } else {
            echo $response->error;
        }
      }
  ```
Có khá nhiều thư viện reCAPTCHA nên cú pháp xử lý cũng khác nhau, mọi người có thể tùy chọn và xử lý. [Đây](https://github.com/google/recaptcha/tree/1.0.0) là thư viện mình sử dụng.