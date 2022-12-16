Laravel 5.0 đã được phát hành vào tháng 2 năm 2015 và bản cập nhật 5.x đã được phát hành khoảng sáu tháng kể từ đó. Vì 5.7 đã được phát hành vào tháng 9 năm 2018, chúng ta có thể mong đợi được xem phiên bản phát hành đầu tiên của Laravel 5.8 vào khoảng tháng 3 năm 2019.

Trong bài viết này, chúng tôi sẽ xem xét nhanh một số tính năng mới hoặc các thay đổi quan trọng mà bạn cần biết về việc tạo dựng một dự án mới từ đầu hoặc cập nhật dự án hiện có lên phiên bản mới nhất 5.8.

Như mọi khi, trước khi nâng cấp phiên bản Laravel, hãy nhớ đọc và hiểu kỹ [hướng dẫn nâng cấp](https://laravel.com/docs/master/upgrade) để đảm bảo quá trình nâng cấp suôn sẻ.

Dưới đây là một vài cập nhật quan trọng sắp tới của Laravel 5.8.

### Email Validation

Validation Rule được xây dựng cho email của Laravel trong 5.8 giờ sẽ cho phép các ký tự international trong địa chỉ email.

Nếu bạn có đoạn code validattion sau:

`$request->validate([ 'email' => 'email', ]);`

Và cố gắng xác thực một địa chỉ email như `hej@bär.se` trong 5.7, nó sẽ thất bại. Tuy nhiên, nó sẽ pass validation trong 5.8 và là một địa chỉ email hợp lệ.

Trong 5.7, logic validation không khớp với logic được sử dụng bởi SwiftMailer (thư viện PHP mailer được sử dụng bởi Laravel), nhưng bây giờ cả hai đều tuân thủ tuân thủ [RFC6530](https://tools.ietf.org/html/rfc6530) .

### dotenv 3.0:

Laravel 5.8 sẽ hỗ trợ [relatively new](https://github.com/vlucas/phpdotenv/releases) `dotenv 3.0` để quản lý tệp môi trường **.env** trong project của bạn.

Các tính năng mới quan trọng trong dotenv 3.0 là hỗ trợ cho multiline strings and white space ở cuối string trong file môi trường .env của bạn, ví dụ, đại loại như:

```
TEST_VAR="specialstringfor 
 this app"

```

Sẽ chỉ  return `specialstringfor`, trong khi `specialstringfor thisapp` sẽ được phân tích cú pháp trong laravel 5.8. Nó cũng sẽ tôn trọng bất kỳ white space nào ở cuối string, trước đây đã bị tước khỏi các biến môi trường.

Đây là một bản cập nhật tuyệt vời cho các tình huống yêu cầu API KEY là multiline để bảo mật.

### Thay đổi tên thư mục Mailables

Đây không phải là một tính năng mới nhưng là một yếu tố quan trọng bạn sẽ cần phải biết khi nâng cấp một dự án.

Nếu bạn có các thư trong dự án của bạn và bạn đã tùy chỉnh các thành phần bằng command `php artisan vendor:publish`, tên thư mục đã thay đổi một chút, cụ thể là `/resources/views/vendor/mail/markdown` hiện được đặt tên `/resources/views/vendor/mail/text`.

### Template mới cho Error page

Laravel 5.8 sẽ xuất xưởng với các trang lỗi mới có thiết kế rất tối giản, phù hợp hơn cho một loạt các trang web và ứng dụng web mà không cần phải thiết kế lại để phù hợp với chủ đề.

Trang 404 của Laravel 5.7 ở trên. Trang 404 của Laravel 5.8 ở dưới
![](https://cdn-images-1.medium.com/max/800/1*t3uCynhyE1VxWvkUdefyAw.png)


Bạn vẫn có thể tùy chỉnh các trang lỗi hoặc nhập các thiết kế trước đó của bạn nếu bạn thích chúng.

### Array and String helper functions are deprecated

Tất cả function helper `array_*`và `str_*` sẽ không còn được chấp nhận và sẽ bị xóa trong Laravel 5.9. Các facades `Arr::`và `Str::` được sử dụng thay thế. Sẽ có các packages available để maintain chức năng nếu bạn không thể hoặc không muốn viết lại code đã tồn tại nhưng nên làm quen với các lệnh mới ngay bây giờ nếu bạn cần sử dụng chúng.

Một hàm `array_` hiện có, chẳng hạn như:

```function array_add($array, $key, $value)```

Nên thay thế bằng:

```Arr::add($array, $key, $value)```

Tương tự như các string helper function:

```function str_contains($haystack, $needles)```

Nên thay thế bằng:

```Str::contains($haystack, $needles);```


### Caching - ttl bây giờ tính bằng giây thay vì phút

Nếu bạn đang sử dụng các chức năng caching của Laravel, hãy lưu ý rằng nếu bạn chuyển một số nguyên cho cache function trong 5,8 thì nó sẽ áp dụng live time trong vài giây chứ không phải vài phút như hiện tại là 5.7, vì vậy lệnh này:

```Cache::put('foo', 'bar', 30);```

Sẽ lưu trữ data trong 30 phút trong Laravel 5.7 và 30 giây trong Laravel 5.8. Một sự khác biệt đơn giản nhưng quan trọng!

### JSON values trong MySQL

Nếu bạn đang lưu trữ JSON values trong column của MySQL và MariaDB, trong 5.7 Laravel sẽ trả về các giá trị được wrapped trong dấu ngoặc kép. 5.8 sẽ trả về giống như thế nhưng clear hơn.

Sau đây là ví dụ từ hướng dẫn nâng cấp Laravel minh họa cho sự thay đổi:
```
$value = DB::table('users')->value('options->language');

dump($value);

// Laravel 5.7…
'"en"'

// Laravel 5.8…
'en'
```

### Hỗ trợ phiên bản Carbon 2

Bây giờ bạn sẽ có tùy chọn sử dụng `Carbon 1` hoặc `Carbon 2` cho các chức năng `DateTime` của bạn trong Laravel 5.8. Xem hướng dẫn [Carbon migration](https://carbon.nesbot.com/docs/#api-carbon-2) nếu bạn có ý định sử dụng Carbon 2.

### Nexmo và Slack Notification channels

Các chanel notification Nexmo và Slack đã bị xóa khỏi main project của Laravel và được trích xuất thành các first-party packages.

Để tiếp tục sử dụng chức năng Slack hoặc Nexmo trong dự án của bạn, bạn sẽ cần sử dụng:
```
composer require laravel/nexmo-notification-channel 
composer require laravel/slack-notification-channel
```
Sau đó chúng có thể được cấu hình và sử dụng như trước đây.

Trên đây là nhưng thay đổi chính trong Laravel 5.8 mà tôi đã đề cập, hy vọng giúp ích được cho các bạn

Bài viết được sưu tầm và lược dịch từ: https://medium.com/@welcm/whats-new-in-laravel-5-8-f1116c379f65