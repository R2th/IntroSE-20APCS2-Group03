![](https://images.viblo.asia/44e02f2c-f7c5-4cb2-a523-96d5720e1507.gif)

Chào các bạn, hôm nay mình sẽ giới thiệu và triển khai Google reCAPTCHA, 1 công cụ chúng ta có thể gặp hàng ngày mỗi khi lướt web.
Bắt đầu luôn nhé... :smile: 

# Captcha là gì?

Bạn có để ý khi đăng kí tài khoản hay điền thông tin vào một form mẫu nào đó đôi khi ta phải làm một việc khá phiền và mất thời gian: nhìn vào một hình nhỏ có chữa các chữ cái và số - thông thường chúng sẽ méo mó khó nhìn để bạn khó nhận dạng hơn. Sau đó bạn cần phải gõ lại các chữ cái và số trong hình đó một cách chính xác nhất sau đó mới submit form. Vậy những thứ đó là gì? và tại sao người ta lại phải làm như thế. Vâng nó chính là Captcha đấy. Captcha là viêt tắt của  "**C**ompletely **A**utomated **P**ublic **T**uring test to tell **C**omputers and **H**umans **A**part", dịch ra có nghĩa là Phép thử Turing công cộng hoàn toàn tự động để phân biệt máy tính với người. Đó cơ bản là một bài kiểm tra về mức độ chính xác trong phản hồi (các giao thức bao gồm một bên đặt câu hỏi và một bên đưa ra câu trả lời hợp lệ và được xác thực) nhằm phân biệt người dùng (người đang cố gắng truy cập vào trang web) là con người hay robot. Captcha thông thường con người sẽ rất dễ để giải nhưng lại khó khăn với máy tính vì nó dựa trên khả năng nhận biết các tín hiệu hình ảnh và âm thanh của con người.
Sơ sơ là vậy... Định nghĩa thì có thể mang tính chất hàn lâm một chút nhưng chúng ta đều hiểu nó là gì đúng không anh em? :v: 

# Google reCAPTCHA là gì?
Vâng, trước hết thì đây là một sản phẩm của gã khổng lỗ Google. Với captcha truyền thống ta cần phải gõ vào một tập chữ hoặc số để vượt qua nhưng nó ngày càng dễ bị qua mặt bởi hacker, spammer .... Do đó một loại Captcha mới ra đời gọi là no-Captcha. Thay vì phải nhìn và gõ đống kí tự khó nhận biết kia thì ta chỉ cần ấn vào nút "Tôi không phải là người máy" - thế là xong. Nghe đơn giản quá nhỉ?  Nhưng thật ra thì chưa hẳn đâu, vì nếu Google vẫn chưa đủ tin tưởng bạn là "con người" thì nó sẽ tiếp tục sử dụng hệ thống nhận biết hình ảnh. Đại loại là nó đưa ra 9 bức hình và hỏi bạn đâu là hình của gái xinh chẳng hạn =)) Mọi thứ nghe có vẻ rất đơn giản nhưng sâu bên trong là hệ thống theo dõi và đánh giá hành vi người dùng từ đó phân biệt được đâu là người dùng thật đâu là công cụ spam. Thôi lòng vòng đủ rồi mình qua phần triển khai cho nó hứng thú hơn tí nhé... (go)

# Triển khai Google reCAPTCHA
Để có thể bắt đầu implements Google reCaptcha trước hết ta cần phải tạo 1 API key. Truy cập vào trang https://www.google.com/recaptcha/admin?hl=en#list bạn sẽ được yêu cầu đăng kí website của bạn và version của reCAPTCHA.

![](https://images.viblo.asia/e1127bba-3bcd-4131-aec8-76cdd093817a.png)

Sau khi submit thì Google sẽ cung cấp cho bạn 1 Site key và 1 Secret key:
![](https://images.viblo.asia/b9cf5049-845e-42d7-96ac-f8009abb32cd.png)

**Chú ý chọn loại reCAPTCHA:** 
1. reCAPTCHA v3: Đây lòa loại mới nhất và với kiểu captcha này sẽ không cần bất cứ một thao tác nào của người dùng  mà Google sẽ tự xác minh và trả về 1 token cho site. Ta gửi token đó lên server để verify xem người dùng có hợp lệ hay không
2. reCAPTCHA v2: Đây là version cũ của reCAPTCHA mà ta vẫn hay thường gặp. reCAPTCHA v2 yêu cầu người dùng click vào một checkbox xác minh "Tôi không phải là người máy". Hoặc có 1 cách vẫn ẩn được checkbox đó là option "Invisible" ở phía trên. Khi đó sẽ dựa vào button submit form để đồng thời gửi lên cả token lên server để xác minh.


### reCAPTCHA v3
Tiếp theo mình sẽ demo reCAPTCHA v3 trước nhé:

Và việc tiếp theo bạn cần làm là tích hợp reCAPTCHA vào trang web của bạn ở client.
Thêm đoạn script sau:
```javascript
<script src='https://www.google.com/recaptcha/api.js?render=6LfGv3wUAAAAAG1AvsBtfcss7FPsBPTFnGFQt4yZ'></script>
```
```javascript
<script>
grecaptcha.ready(function() {
	grecaptcha.execute('6LfGv3wUAAAAAG1AvsBtfcss7FPsBPTFnGFQt4yZ', {action: 'register'})
		.then(function(token) {
            alert(token);
            // Verify the token on the server.
	});
});
</script>
```

Flow của nó sẽ diễn ra như sau: 
1. Thêm Javascript api với site key của bạn
2. Gọi hàm grecaptcha.execute trên một hành động hoặc khi tải trang
3. Gửi token được generate từ server google cho backend để verify

Để minh họa mình sẽ thử với 1 trang đăng kí người dùng viết bằng Laravel nhé. 
Tạo nhanh trang đăng nhập đăng kí bằng command: `php artisan make:auth`.
Ở file `rescources/views/auth/register.blade.php` ta thêm đoạn script đã viết ở trên. Chú ý để chạy được bạn cần tạo virtual host cho project đang chạy giống như site mà bạn đã set trên trang admin recaptcha nhé. Ví dụ mình đã setup virtual host của mình là http://test-recaptcha-quanvh.com.  Sau khi đã thêm và chạy thử ta có 
![](https://images.viblo.asia/49a3a6a0-5f2a-4576-9f87-097e81c66fcb.png)

Như vậy sau khi đã có token thì việc tiếp theo cần làm là gửi token đó lên server và xác nhận xem đó có phải là token hợp lệ hay không. Để xử lý việc này bên backend mình sẽ sử dụng thư viện [google/recaptcha](https://github.com/google/recaptcha).
Cài đặt bằng cách dùng composer
```
composer require google/recaptcha "^1.2"
```

Và hàm check token recaptcha như sau:
```php
public function verify(Request $request)
{
    $token = $request->get('token');
    $recaptcha = new \ReCaptcha\ReCaptcha('6LfGv3wUAAAAADQxyh5cTOo4hp5QugwEI1LOMO0V');
    $resp = $recaptcha->setExpectedHostname($request->getHost())
        ->setExpectedAction('register')
        ->verify($token, $request->ip());
    if ($resp->isSuccess()) {
        // Verified!
    } else {
        $errors = $resp->getErrorCodes();
    }
}
```

Như vậy nếu token hợp lệ thì action tiếp tục được thực hiện còn nếu không thì mình sẽ trả lỗi về cho client là "Mày là 1 thằng spammer" =)) 
Done. 

### reCAPTCHA v2
Tiếp tục mình sẽ thử implements reCAPTCHA v2.
Quay lại bước đăng kí API key ở trên bạn nhớ chọn loại reCAPTCHA v2 nhé.

Sau khi đã có Site key và Secret key mới ta chỉnh sửa 1 chút ở file `register.blade.php`:
Thêm script load api:
```javascript
<script src='https://www.google.com/recaptcha/api.js'></script>
```
Thêm div để generate checkbox
```html
<div class="g-recaptcha" data-sitekey="6LeCyXwUAAAAAENIyDkZM5ZpNglmqrgjmdrDSVtv"></div>
```

Ta có kết quả như sau:
![](https://images.viblo.asia/37152a40-7198-4927-b050-0428a34051bb.png)
Sau khi click vào ô checkbox thì form register sẽ tự động thêm 1 input là `g-recaptcha-response` chính là token mà google trả về khi click vào checkbox. Mình gửi kèm token này lên server để check. Bên server side thì xử lý như ở trên. Done. :smiley:

# Kết luận
Như vậy mình vừa giới thiệu và demo Google reCAPTCHA xong xuôi. Qua đây ta thấy việc sử dụng nó cũng rất đơn giản phải không nào. Nếu cảm thấy có ích với bạn thì hãy upvote bài viết nhé. 

Cảm ơn các bạn đã theo dõi bài viết. :smile:

### Tham khảo
* https://developers.google.com/recaptcha/
* https://recaptcha-demo.appspot.com/
* https://github.com/google/recaptcha