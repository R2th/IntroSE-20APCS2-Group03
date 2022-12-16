### 1. Introduction:
Laravel 5.0 được ra mắt vào tháng 2 năm 2015 và các bản update `5.x` sẽ được ra mắt sau đó mỗi 6 tháng. Như phiên bản `5.7` được ra mắt vào tháng `09/2018` vậy nên chúng ta có thể đoán trước được rằng phiên bản `5.8` sẽ ra mắt khoảng tháng `03/2019`.
<br><br>
Trong bài viết này, chúng ta sẽ xem nhanh một số tính năng mới hoặc các thay đổi quan trọng mà bạn cần lưu ý về việc tạo dự án mới từ đầu hoặc cập nhật dự án hiện có.
<br><br>
Như mọi khi, trước khi nâng cấp phiên bản Laravel, hãy nhớ đọc và hiểu kỹ hướng dẫn nâng cấp để đảm bảo quá trình nâng cấp suôn sẻ.
<br><br>
Vì vậy, ở đây, một vài cập nhật quan trọng sắp tới cho Laravel 5.8.

### 2. Email validation:

Hiện tại, Laravel đã xây dựng quy tắc xác thực cho email trong 5.8 sẽ cho phép các ký tự quốc tế trong địa chỉ email.

Nếu bạn có code xác nhận sau:

```php
$request->validate([
    'email' => 'email',
]);
```

Và cố gắng xác thực một địa chỉ email như `hej@bär.se` trong `5.7`, nó sẽ thất bại. Tuy nhiên, nó sẽ vượt qua xác nhận trong `5.8`.
<br><br>
Trong `5.7`, logic xác thực không khớp với logic được sử dụng bởi `SwiftMailer` (thư viện gửi thư PHP được sử dụng bởi Laravel), nhưng bây giờ cả hai đều tuân thủ tuân thủ `RFC6530`.

### 3. dotenv 3.0:
Laravel 5.8 sẽ hỗ trợ `dotenv 3.0` để quản lý tệp môi trường dự án `.env` dự án của bạn.
<br><br>
Các tính năng mới quan trọng trong `dotenv 3.0` là hỗ trợ cho chuỗi đa dòng và khoảng trắng ở cuối chuỗi trong tệp môi trường của bạn, ví dụ, đại loại như:

```
DEVELOPMENT_APP_KEY="specialstringfor
thisapp"
```

Sẽ chỉ trả về `specialstringfor`, trong khi trong 5,8 toàn bộ chuỗi `specialstringfor thisapp` sẽ được phân tích cú pháp. Nó cũng sẽ giữ lại bất kỳ khoảng trắng nào ở cuối chuỗi, trước đây đã bị loại khỏi các biến môi trường.
<br><br>
Đây là một bản cập nhật tuyệt vời cho các tình huống yêu cầu `API key` nhiều dòng để bảo mật.

### 4. Mailables directory name change:

Đây không phải là một tính năng mới nhưng là một yếu tố quan trọng bạn sẽ `cần phải biết` khi nâng cấp một dự án.
<br><br>
Nếu bạn có thư trong dự án của mình và bạn đã tùy chỉnh các thành phần bằng cách sử dụng lệnh `php artisan vendor:publish`, tên thư mục đã thay đổi một chút, cụ thể là thư mục `/resource/Views/vendor/mail/markdown` hiện được đặt tên `/resource/Views/vendor/mail/text`. Điều này là do cả hai thư mục có thể  code `markdown` dấu để tạo các mẫu `html` đáp ứng tốt với các dự phòng văn bản đơn giản. Nó hợp lý hơn khi gọi văn bản thư mục `markdown`.


### 5. New error page templates:

Laravel 5.8 sẽ ra mắt với các trang lỗi mới có thiết kế rất tối giản, phù hợp hơn cho một loạt các trang web và ứng dụng web mà không cần phải thiết kế lại để phù hợp với chủ đề.
<br><br>
![](https://images.viblo.asia/abb43bea-b9c9-407f-a7df-36810a3788ff.png)

Laravel 5.7 404 (trên cùng) và 5.8 404 (dưới cùng)
<br><br>
Bạn vẫn có thể tùy chỉnh các trang lỗi hoặc nhập các thiết kế trước đó của bạn nếu bạn thích chúng.

### 6. Array and String helper functions are deprecated:

Tất cả các `global helper` array_* và str_* đã không được chấp nhận và sẽ bị xóa trong Laravel 5.9. Chúng ta sẽ dùng `Arr::` và `Str::` facades thay vì các helper trên. Sẽ có các gói có sẵn để duy trì chức năng nếu bạn có thể  muốn hoặc không muốn làm lại code hiện có
<br><br>
Một hàm `array_` hiện có, chẳng hạn như:

`function array_add($array, $key, $value)`
Có thể được thay thế bằng
`Arr::add($array, $key, $value)`
<br><br>
Tương tự với các helper về chuối:

`function str_contains($haystack, $needles)`
Có thể được thay thế bởi
`Str::contains($haystack, $needles);`
<br><br>
Trong thực tế, nếu bạn soi code của phiên bản 5.8 về các global helper `array_*` và `str_*` bạn sẽ thấy nó chỉ đơn giản là sử dụng `facade`.

### 7. Caching — ttl now in seconds instead of minutes:
*ttl: time to live* - bộ nhớ đệm

Nếu bạn đang sử dụng các chức năng bộ nhớ đệm của Laravel, hãy lưu ý rằng nếu bạn chuyển một số nguyên cho hàm bộ đệm trong 5.8 thì nó sẽ áp dụng đơn vị thời gian là giây chứ không phải là phút như hiện 5.7, vì vậy lệnh này:
<br><br>
`Cache::put('foo', 'bar', 30);`
Sẽ lưu trữ trong 30 phút trong Laravel `5.7` và 30 giây trong Laravel `5.8`. Một sự khác biệt đơn giản nhưng quan trọng!

### 8. JSON values in MySQL:
Nếu bạn đang lưu trữ các giá trị `JSON` trong các cột cơ sở dữ liệu `MySQL` hay `MariaDB`, trong 5.7 Laravel sẽ trả về các giá trị được `wrap` trong dấu ngoặc kép. Phiên bản 5.8 trả về cùng các giá trị trong chuỗi gọn hơn.
<br><br>
Sau đây là ví dụ từ hướng dẫn nâng cấp Laravel minh họa cho sự thay đổi:

```php
$value = DB::table('users')->value('options->language');

dump($value);

// Laravel 5.7…
'"en"'

// Laravel 5.8…
'en'
```

### 9. Carbon version 2 support:

Bây giờ bạn sẽ có tùy chọn sử dụng `Carbon 1` hoặc `Carbon 2` cho các chức năng `DateTime` của bạn trong `Laravel 5.8`. Kiểm tra hướng dẫn `upgrade` Carbon nếu bạn có ý định sử dụng `Carbon 2`.


### 10. Nexmo and Slack Notification channels:
Các kênh thông báo Nexmo và Slack đã bị xóa khỏi dự án chính của Laravel và được trích xuất thành các gói của bên thứ nhất (`first-party packages`).

Để tiếp tục sử dụng chức năng Slack hoặc Nexmo trong dự án của bạn, bạn sẽ cần sử dụng:

```bash
composer require laravel/nexmo-notification-channel
composer require laravel/slack-notification-channel
```

Sau đó chúng có thể được cấu hình và sử dụng như trước đây.