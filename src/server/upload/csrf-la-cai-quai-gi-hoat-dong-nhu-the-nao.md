**1. CSRF Là gì?**

<br>
CSRF được viết tắt của từ Cros Site Request Forgery và nó là một hình thức tấn công website, buộc người dùng thực hiện những yêu cầu không mong muốn tới ứng dụng web của chúng ta, là kĩ thuật tấn công bằng cách sử dụng quyền chứng thức người dùng đến một website (giả mạo).

Ví dụ đơn giản như sau: 
Chúng ta có 1 trang web gửi tiền đi chẳng hạn. =)) 

![](https://images.viblo.asia/e27b4a9a-494d-4a07-8c7e-f695d38e817d.png)

Giả định rằng bạn có một ứng dụng được sử dụng để gửi tiền tới bạn bè hay người thân. Họ sẽ đăng nhập vào đây và gửi tiền cho bạn bè của họ. 
<br>Điều này sẽ cần email của người nhận và số tiền gửi. Khi bạn nhấn vào nút gửi, Một request POST sẽ được tạo ra và gửi tới server ứng dụng và số tiền sẽ bay vào email của người nhận kia.
Mọi thứ đều ổn định trong quá trình thử nghiệm, đăng nhập account và gửi tiền cho người nhận. Nhưng đời không như là mơ. :v
<br><br>
**2. Cách Tấn công:**
<br><br>
Hacker sẽ nghiên cứu kĩ các URL được request cách thức hoạt động. Trong tường hợp này cũng đơn giản chỉ cần gửi một request POST gồm email và số lượng bạn cần để gửi và gửi request đến server là xong.
Hacker sẽ tạo một chương trình có thể nhúng ảnh hoặc một trang web nào đó và thực thi khi bạn click vào hình ảnh hoặc click vào trang web kia.
<br>
<br>
Khi đoạn script được thực thi, trình duyệt sẽ gửi 1 cookie tới server xác thực người dùng như bình thường và server sẽ thấy rằng nó như một request thông thường khác do người dùng đã đăng nhập trước đó và nó sẽ xử lý bình thường. Và như thông thường nó sẽ gửi đi số tiền mà hacker đã đặt. Người dùng sẽ bay luôn số tiền không mong muốn này.
<br>
<br>
 Ví dụ ta có đường link gửi tiền là như thế này: http://abc.com/sent?from=person1&to=person2&amount=10000 <br>
 và ta sẽ có 1 form như này <br>
 ```html 
 <form  method="post" action="http://abc.com/sentfrom=person1&to=person2&amount=10000">
      <button type="submit">Xem link</button>
</form>
```
<br>
 và bạn sẽ bị lừa như thế này. đại loại là như vậy, có nhiều cách tinh vi hơn nhiều =))
 
 ![](https://images.viblo.asia/22636fe6-05db-432f-892a-9b041c84f10e.png)
 <br> <br>
Vậy là khi click vào link kia bạn sẽ bay ngay 10k (có vẻ hơi ít :v)

Sẽ có nhiều hình thức tấn công khác như thay vì dùng form có thể dùng

```html
<img height="0" width="0" src="http://abc.com/sent?from=person1&to=person2&amount=10000" />

<link href="http://abc.com/sent?from=person1&to=person2&amount=10000" rel="stylesheet"">

<script src="http://abc.com/sent?from=person1&to=person2&amount=10000"></script>

<iframe height="0" width="0" src="http://abc.com/sent?from=person1&to=person2&amount=10000"">
```
Sẽ có nhiều hình thức tinh vi khác mà chúng ta không thể lường trước được...
<br><br>
Những hành động như gửi tiền như trên, sửa hay xóa cái gì đó ta có thể dùng các phương pháp xác thực cao hơn như: sử dụng CSRF Token, nhập lại password trước khi thực thi, recaptcha...
<br><br>
**3. CSRF Token Trong Laravel**
<br><br>
Trong laravel cung cấp cho chúng ta mỗi phiên làm việc với form đều có một _token đi kèm để đảm bảo rằng việc vô tình click vào các link như thế kia là không khả dụng. Mặc định sẽ được tự động kích hoạt. Ngoài ra với các thao tác như sửa và xóa trong laravel cũng đã sử dụng phương thức PUT và PATCH để bảo mật hơn. Dạo qua một chút về CSRF Token trong laravel xem có gì. =))<br><br>

Các bạn vào `app/Http/Middleware/VerifyCsrfToken.php` sẽ thấy code: 
```php
<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * Indicates whether the XSRF-TOKEN cookie should be set on the response.
     *
     * @var bool
     */
    protected $addHttpCookie = true;

    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        //
    ];
}

```
<br>
Khi một request POST được tạo ra `VerifyCsrfToken` sẽ xử lý yêu cầu đó. Chúng ta thấy một array except ở đây để loại trừ các url không dùng `VerifyCsrfToken` Chúng ta có thể thấy class `VerifyCsrfToken` được kế thừa từ `Illuminate\Foundation\Http\Middleware\VerifyCsrfToken`. Đây là phần mà tất cả những logic về `VerifyCsrfToken` được định nghĩa. <br>
Hãy xem một vài phương thức để xem nó hoạt động ra sao.

```php
    public function handle($request, Closure $next)
    {
        if (
            $this->isReading($request) ||
            $this->runningUnitTests() ||
            $this->inExceptArray($request) ||
            $this->tokensMatch($request)
        ) {
            return tap($next($request), function ($response) use ($request) {
                if ($this->addHttpCookie) {
                    $this->addCookieToResponse($request, $response);
                }
            });
        }

        throw new TokenMismatchException;
    }
```
<br>
Trong phương thức handle() sẽ nhận request đến và kiểm tra nếu: <br>

* Rquest đến là một request POST
* Request không được tạo ra từ một unit test
* Route được truy cập được developer không loại trừ trong phương thức except
* Token là chính xác

<br>
Nếu một trong các điều trên không đúng thì lập tức Exception `TokenMismatchException` sẽ được bắt và thực thi. Còn nếu đúng hết thì sẽ tạo cho request tiếp.
<br><br>
Các bạn vào `app/Http/Kernel.php`

```php
protected $middlewareGroups = [
        'web' => [
            ...
            \App\Http\Middleware\VerifyCsrfToken::class,
            ...
        ],
        ...
    ];
```

Mặc định trong laravel `VerifyCsrfToken` sẽ được enable trong đây luôn.
<br>
Vậy là mình đã giới thiệu xong cho các bạn về CSRF và cách thức mà nó hoạt động như nào. Cảm ơn các bạn đã đọc bài của mình :D
<br><br>
*Nguồn tài liệu tham khảo:* <br>
https://blog.pusher.com/csrf-laravel-verifycsrftoken/ <br>
http://laravel.com <br>
https://medium.com/@barryvdh/csrf-protection-in-laravel-explained-146d89ff1357