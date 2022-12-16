# Giới thiệu
Nói về 1 trong những cái gây khó chịu nhất khi xây dựng website đa ngôn ngữ chắc chính là việc đi kiếm bản dịch cho các ngôn ngữ nhỉ? Thường thì dev sẽ chỉ build 1 ngôn ngữ, sau đó xong xuôi website-ứng dụng mới đi cầm bản keyword cần i18n mang đi kiếm người dịch phải không? Mình cũng toàn làm vậy, tuy nhiên cái khó ở đây chính là việc chờ dịch - tìm bản dịch. Lúc mình làm việc với khách hàng, thì khách có yêu cầu 3 ngôn ngữ tiếng anh, tiếng việt và tiếng nhật, mình làm web bằng tiếng việt trước, sau đấy thì đưa khác để khách dịch ra 2 thứ tiếng kia. Tuy nhiên là khách thì bận, chờ khách lâu quá, mà chờ lâu thì nản, lại chậm thời gian bàn giao (dù chả phải lỗi mình nhưng nó làm mình chậm nhận thanh toán :D ). Trong lúc rảnh thì mình đi dịch hộ sang tiếng anh cho nhanh, vì tiếng anh thì còn dịch được. Nhưng còn tiếng Nhật thì... chịu chết. Thành ra là khi thấy các package mới ra này của Laravel mình thấy đây sẽ là chủ đề hay để tìm hiểu và chia sẻ cho mọi người.
### Chốt lại Tóm lược này:
Bạn làm ứng dụng Laravel cần sử dụng i18n, nhưng bạn lại không có khả năng dịch hết tất cả keyword i18n ra các ngôn ngữ mà bạn cần vì bạn không biết tiếng, hoặc đơn giản vì nó quá nhiều keyword mà bạn thì... lười?

Vậy thì đọc bài hướng dẫn sử dụng Laravel google translate package này nhé! Và đương nhiên, do đây là google dịch, nên nhiều từ dịch sẽ hơi "ngu" đúng kiểu google dịch =)). Tận dụng được bao nhiêu cứ tận dụng, xong chỉ cần đưa bản này cho người có chuyên môn check qua sửa các key word chưa đúng thôi, đỡ hơn nhiều dịch từ A-Z nhé :D
### Vậy cơ chế dùng là gì?
Laravel Google Translate là 1 package sử dụng dòng lệnh command để kích hoạt dịch toàn bộ các file sử dụng i18n trong ứng dụng của bạn với API của Google dịch. Bạn cũng có thể tận dụng [stichoza/google-translate-php](https://github.com/Stichoza/google-translate-php) mà không cần API key hay phải cài đặt API key google dịch của bạn.

Package này sẽ dịch và lưu các file đã dịch vào trong đường dẫn `/resources/lang` hoặc có thể là file `lang.json` nhé, vì vậy sau khi chạy xong các bạn vào đường dẫn này tìm các file kết quả dịch kiểm tra là được.
# Sử dụng
## Tải về

Package này sẽ được tải về thông qua Composer với câu lệnh sau:
```php
composer require tanmuhittin/laravel-google-translate --dev
```
Tuy nhiên là khi mới tải về thì Package vẫn đang bị ẩn, sử dụng lệnh sau để public ra nhé:
```php
php artisan vendor:publish --provider=Tanmuhittin\LaravelGoogleTranslate\LaravelGoogleTranslateServiceProvider
```
Giờ thì clear cache 1 chút nào:
```php
php artisan config:cache
```
Trước khi hướng dẫn mọi người bắt đầu chạy trình dịch, thì mình sẽ nói qua 1 chút xem là nó sẽ dịch những cái gì nhé! Khi chạy câu lệnh dịch phía dưới, package này sẽ quét qua toàn bộ các file của Project, tìm tất cả những chỗ nào có dạng `translate('keyword')` rồi đánh dấu sẽ dịch các 'key word' bên trong kia. Tiếp đó thì dựa vào các ngôn ngữ mà bạn chọn để dịch (ví dụ, tiếng anh + tiếng Nhật), nó sẽ tìm bản dịch tương ứng cho các từ khóa đã được tìm thấy kia, rồi viết dịch vào file ngôn ngữ tương ứng. Vì vậy, để package có thể tìm và dịch được cho đúng, mọi người nhớ chú ý các đoạn cần i18n viết cho đúng cách để có thể dịch được nhé :D

Để bắt đầu tiến hành dịch, chạy lệnh command sau nhé:
```php
php artisan translate:files
```
Giờ sẽ có vài câu hỏi đặt ra và phải điền trả lời:
```bash
What is base locale? [en]: //Ngôn ngữ chính đang build sẵn?
 > en //của mình là tiếng anh

 What are the target locales? Comma seperate each lang key [tr,it]: //chọn ngôn ngữ để dịch sang
 > ja //Mình chọn tiếng nhật. Mặc dù ở đây bảo là điền được nhiều ngôn ngữ, nhưng mình thấy là cứ ngôn ngữ thứ 2 là bị dịch về tiếng anh, nên khuyên mọi nguời làm từng ngôn ngữ thôi

 Force overwrite existing translations? [No]: //Nếu có tồn tại file dịch trước đấy thì cho viết đè lên nhé?
  [0] No
  [1] Yes
 > 1 //ok, đè ko sao

 Use text exploration and json translation or php files? [php]: //chọn dạng file dịch sẽ xuất ra
  [0] json
  [1] php
 > 0 //mình chọn PHP thấy nó có thêm khá nhiều câu hỏi, nên chọn json cho nhanh, mà không hiểu sao chọn php toàn bị lỗi ko dịch được 

 Verbose each translation? [Yes]:
  [0] No
  [1] Yes
 > 1

```
xong là sẽ có quá trình quét tìm các cụm dạng `trans('keyword')` như nãy mình bảo, quét hết 1 lượt là nó bắt đầu dịch sang các ngôn ngữ mà bạn chọn. Kết quả file của mình lưu ở vị trí `resource/lang/en.json`. Vào xem thì đúng là... google dịch, vài chỗ hơi ngu =)).

Lưu ý với mọi người vài điểm:
* Từ khóa ký hiệu ngôn ngữ dịch: mình thấy 1 số từ nó không được giống với chuẩn viết tắt tên ngôn ngữ lắm, nhưng có vài cái test ra chuẩn rồi cho mọi người này: vi - tiếng việt, ja - tiếng nhật (ko phải jp nhé), fr - tiếng pháp, ko - tiếng Hàn.
* Dịch nhiều ngôn ngữ: Trong quấ trình test package này thì như đã nói ở trên, khi yêu cầu dịch ra 2 ngôn ngữ trở lên thì ngôn ngữ thứ 2 sẽ bị dịch về tiếng anh. Vì vậy mọi người nên dịch từng ngôn ngữ, mỗi lần chạy lệnh từ đầu nhé :D
* Chọn kiểu file dịch xuất ra: với việc chọn PHP thì gặp khá nhiều cản trở, và mình chưa rõ lắm fix như nào, nhưng có dạng json dễ dùng rồi thì mọi người cứ dùng đi nhé :)
* Có thể đọc xong các bạn thấy package này không hữu ích lắm, vì đằng nào cũng dịch nhiều chỗ chưa chuẩn, lại còn làm từng ngôn ngữ 1. Nhưng các bạn cứ làm mà có quá nhiều chỗ, lại lười đi tìm ấy, thì cứ dùng cái này, khi đấy chỉ cần đi sửa chỗ chưa đúng thôi, chứ ko cần mắc công làm 100% nữa. Và kể cả google dịch không được chuẩn xác, nhưng mọi người vẫn dùng khi bí dịch mà :D, nên ko phải là package vô dụng đâu nhé
![](https://images.viblo.asia/531aa9e0-ecfa-4ffe-b3be-2eb054da0819.png)
![](https://images.viblo.asia/969591a8-d5ff-4b09-af7d-079a110bfa27.png)
# Lời kết
Phía trên mình đã giới thiệu sơ qua cho mọi người về package khá hay ho này, nếu ai thấy muốn tìm hiểu thêm thì tham khảo bài gốc ở đây nhé: https://github.com/tanmuhittin/laravel-google-translate
Cảm ơn mọi người đã đọc :D