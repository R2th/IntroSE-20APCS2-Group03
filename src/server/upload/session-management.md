Mấy hôm trước mình có nhận được một câu hỏi: "Làm sao để logout một user khi mình biết session ID của nó". Mình thấy vấn đề này khá hay ho nên nay viết bài chia sẻ với mọi người.

Để giải quyết được vấn đề mà câu hỏi đưa ra, đầu tiên chúng ta phải biết ngôn ngữ mà ứng dụng của chúng ta đang sử dụng. Và cũng cần phải tìm hiểu cơ chế lưu session mà ngôn ngữ đó dùng. Nếu là **PHP**, theo mặc định thì session của một client sẽ được lưu thành một file trên server. Bạn có thể xem thư mục lưu nó bằng đoạn lệnh sau:

```
php -r "echo session_save_path() . PHP_EOL;"
```

Còn với **Ruby on Rails**, mặc định nó sẽ lưu toàn bộ session ở client (đã được mã hoá theo `secret_key_base` - tham khảo [**Session Storage**](https://guides.rubyonrails.org/security.html#session-storage)) dưới dạng cookie và gửi về cho client. Khi client request lên nó sẽ đọc cookie, giải mã và gắn vào `request.session` (shorthand `session`).

Với thông tin trên, đối với PHP, chúng ta có thể truy cập vào thư mục chứa session và xoá file đó đi (file sẽ có prefix `sess_`) là client sẽ tự logout (do khi request lên, server không tìm thấy file chứa session theo ID client đã gửi lên nữa). Chúng ta cùng thử nhé. Đầu tiên, tạo 1 file PHP bất kỳ (mình lấy tên là `session.php` - hoặc nếu muốn bạn có thể tạo file `index.php` cũng được) với nội dung đơn giản sau:

```php
<?php

session_start();

if (!isset($_SESSION["datetime"])) {
    $now = new DateTime("now");
    $_SESSION["datetime"] = $now->format("Y-m-d H:i:s");
}

echo "Session has created at " . $_SESSION["datetime"];
```

Sau đó bạn thực hiện chạy lệnh dưới ở thư mục hiện hành (chứa file php chúng ta vừa tạo):

```
php -S 127.0.0.1:8080 # Bạn có thể sử dụng cổng khác nếu muốn hoặc cổng 8080 đã được sử dụng
```

Giờ chúng ta sẽ truy cập vào địa chỉ http://localhost:8080/session.php (nếu bạn đặt tên file là `index.php` thì không cần cung cấp file name nữa mà chỉ cần localhost:8080 là đủ). Khi truy cập vào, chúng ta sẽ thấy được message: **Session has created at <Y-m-d H:i:s>** (trong đó **Y-m-d H:i:s** là thời gian hiện tại lúc bạn truy cập). Cho dù bạn F5 bao lần đi chăng nữa thì nó vẫn cố định cái thời gian mà bạn vào (do đã lưu trong session). Giờ chúng ta thử đọc file session trên server xem nó chứa những gì nhá. Để đọc được, bạn cần lấy Session ID từ trình duyệt sau đó bạn dùng lệnh sau:

```
cat $(php -r "echo session_save_path();")/sess_<Session ID>
```

Kết quả của mình:

```
cat $(php -r "echo session_save_path();")/sess_1s7d3vlbu4k1rhdl6i8mjuuft5
datetime|s:19:"2020-06-06 15:14:20";
```

Giờ bạn thử xoá file đó đi bằng lệnh sau:

```
rm $(php -r "echo session_save_path();")/sess_<Session ID>
```

Rồi thử F5 lại trang xem sao. Vâng, thời gian đã được thay đổi rồi :D!

Đấy là đối với PHP, còn đối với RoR thì theo mình là vô phương :v! Muốn logout chúng ta phải invalidate session đó. Mà muốn invalidate thì bạn chỉ có cách đổi `secret_key_base`. Mà một khi `secret_key_base` bị đổi thì toàn bộ session đã tạo trước đó của các user khác cũng bị invalid theo do nó không giải mã được.

Vậy, cách giải quyết câu hỏi ban đầu phải làm như thế nào? Đối với PHP thì không xoắn dù hơi thủ công, còn với RoR thì chúng ta cần phải sử dụng một session storage khác mặc định (thường dùng là Redis). Khi muốn invalidate một session nào đó (đã biết Session ID) thì chỉ cần vào Redis xoá nó đi là xong :D!

Bài viết của mình đến đây là kết thúc. Có thể bài viết tiếp theo mình sẽ thử implement vụ quản lý session của user như bọn Facebook hoặc Github (dạng đơn giản). Hẹn gặp lại mọi người ở bài viết sau :D!

**Bonus**: Mình xin chia sẻ đoạn code dùng để giải mã nội dung cookie do Rails sinh ra (khi dùng Session Storage là mặc định):

https://gist.github.com/namnv609/4080de4d6025bf9ccbf72f8ba46272ae

Bạn có thể decrypt thử với nội dung sau:

* Cookie content:

```
ajN6Z1NvaXRkakxrMGRzcmlEZjlTcUx4TTNGb3hnQzVuL01JMy9ibExrYzRkbXUxbE96YjEwN1BJSjBGdE54bG52Um5wZ1djZHRyNVVUK2xGVXU1Mm5iQzJyV3dTU2hYdnVRU3l1WFpHOEk9LS1BbjhVT3ZtdlY5M3NSK1VxTlpYWkdBPT0%3D--df6e4406c55d58d5bcff9d758577e7daaaf7e5f4
```

* Secret key base:

```
ae29b3cd82990e02ce4ef46799200e2424116452fb59389b460c699fb5e83340268151b722ba938e54af340ea6d99c9211198184d887213167a9fe2f0c3eb7ca
```

* Encrypted cookie salt: `encrypted cookie`
* Encrypted signed cookie salt: `signed encrypted cookie`

Hoặc cho bạn nào lười, copy chạy luôn trong Rails console (Ruby 2.5.1 và Rails ~> 5.1.7) :v:

```ruby
key_generator = ActiveSupport::KeyGenerator.new "ae29b3cd82990e02ce4ef46799200e2424116452fb59389b460c699fb5e83340268151b722ba938e54af340ea6d99c9211198184d887213167a9fe2f0c3eb7ca", iterations: 1000
secret = key_generator.generate_key "encrypted cookie"
salt = key_generator.generate_key "signed encrypted cookie"
encryptor = ActiveSupport::MessageEncryptor.new secret.first(32), salt, serializer: JSON

encryptor.decrypt_and_verify URI.unescape("ajN6Z1NvaXRkakxrMGRzcmlEZjlTcUx4TTNGb3hnQzVuL01JMy9ibExrYzRkbXUxbE96YjEwN1BJSjBGdE54bG52Um5wZ1djZHRyNVVUK2xGVXU1Mm5iQzJyV3dTU2hYdnVRU3l1WFpHOEk9LS1BbjhVT3ZtdlY5M3NSK1VxTlpYWkdBPT0%3D--df6e4406c55d58d5bcff9d758577e7daaaf7e5f4")
```

Kết quả:

```
[1] pry(main)> key_generator = ActiveSupport::KeyGenerator.new "ae29b3cd82990e02ce4ef46799200e2424116452fb59389b460c699fb5e83340268151b722ba938e54af340ea6d99c9211198184d887213167a9fe2f0c3eb7ca", iterations: 1000

=> #<ActiveSupport::KeyGenerator:0x00007f797c054a40
 @iterations=1000,
 @secret="ae29b3cd82990e02ce4ef46799200e2424116452fb59389b460c699fb5e83340268151b722ba938e54af340ea6d99c9211198184d887213167a9fe2f0c3eb7ca">
[2] pry(main)> secret = key_generator.generate_key "encrypted cookie"
=> "\xDA\"\xDBM{\x9E\xBC{P\x82\xF60\e(\x11\xAC\\\x88T\xF5\xAF|\xFC\xE7\xD6\xFF\x8D\xD8\x84\x93vq\xFDMM\x88\x15\x059u\\\xF04\xFE\xD5\x01m\x83$1$\f\x94~\x98\xA9\x8D\xDB\v\xC6+ \xF7\x98"
[3] pry(main)> salt = key_generator.generate_key "signed encrypted cookie"
=> "\xFF\xDEAO\x8F\x17\xC7r\x80\x81?6(\x9F\x9C\x85\xBFyv\xC4n\x11\x16?\x02\x8D\xB9\xA8\x89\xD5\xE7o/\x1A\xFD\xF2\xAC\xCB\x12B\x02\xDBz\xDAze\x7F\xA0f\xBDpq\xD8\xCBM$6\x16\xDBP\xAE\x82\xA5\x1F"
[4] pry(main)> encryptor = ActiveSupport::MessageEncryptor.new secret.first(32), salt, serializer: JSON
=> #<ActiveSupport::MessageEncryptor:0x00000000058701e0
 @aead_mode=false,
 @cipher="aes-256-cbc",
 @digest="SHA1",
 @secret="\xDA\"\xDBM{\x9E\xBC{P\x82\xF60\e(\x11\xAC\\\x88T\xF5\xAF|\xFC\xE7\xD6\xFF\x8D\xD8\x84\x93vq",
 @serializer=JSON,
 @sign_secret=
  "\xFF\xDEAO\x8F\x17\xC7r\x80\x81?6(\x9F\x9C\x85\xBFyv\xC4n\x11\x16?\x02\x8D\xB9\xA8\x89\xD5\xE7o/\x1A\xFD\xF2\xAC\xCB\x12B\x02\xDBz\xDAze\x7F\xA0f\xBDpq\xD8\xCBM$6\x16\xDBP\xAE\x82\xA5\x1F",
 @verifier=
  #<ActiveSupport::MessageVerifier:0x0000000005870050
   @digest="SHA1",
   @secret=
    "\xFF\xDEAO\x8F\x17\xC7r\x80\x81?6(\x9F\x9C\x85\xBFyv\xC4n\x11\x16?\x02\x8D\xB9\xA8\x89\xD5\xE7o/\x1A\xFD\xF2\xAC\xCB\x12B\x02\xDBz\xDAze\x7F\xA0f\xBDpq\xD8\xCBM$6\x16\xDBP\xAE\x82\xA5\x1F",
   @serializer=ActiveSupport::MessageEncryptor::NullSerializer>>
[5] pry(main)> encryptor.decrypt_and_verify URI.unescape("ajN6Z1NvaXRkakxrMGRzcmlEZjlTcUx4TTNGb3hnQzVuL01JMy9ibExrYzRkbXUxbE96YjEwN1BJSjBGdE54bG52Um5wZ1djZHRyNVVUK2xGVXU1Mm5iQzJyV3dTU2hYdnVRU3l1WFpHOEk9LS1BbjhVT3ZtdlY5M3NSK1VxTlpYWkdBPT0%3D--df6e4406c55d58d5bcff9d758577e7daaaf7e5f4")
=> {"session_id"=>"0ddba0e298334237d01e76121f400f48", "lorem"=>"2020-06-20 15:45:06"}
```
    
> Bài viết dựa theo những hiểu biết của bản thân mình. Có thể nó không được chính xác hoàn toàn hoặc có thể sẽ bị thiếu. Có gì mọi người vui lòng để lại comment nhé :wave:!
    
> Original post: https://namnv609.cf/posts/session-management.html