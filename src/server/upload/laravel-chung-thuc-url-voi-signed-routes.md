# Giới thiệu
Chúng ta đều biết Laravel là một framework mạnh mẽ, với khả năng tuỳ biến URL qua ```routes``` , ngoài khả năng bảo vệ URL bằng CSRF Token, từ phiên bản 5.6.12, Laravel cung cấp thêm một phương thức bảo vệ URL nữa là ```Signed routes```. Thực chất của ```Signed routes``` sẽ sinh ra một URL kèm theo một ```signature hash```, sau đó sẽ kiểm tra đoạn hash này bằng một Middleware.
# Ví dụ
Giả sử có một URL ```https://www.laravel.com/articles/96/unsubscribe```
User bỏ theo dõi một bài viết, mọi thứ đều bình thường cho đến khi User sửa giá trị của params   ```$postId```, lúc này với việc sử dụng ```Signed routes``` chúng ta có thể hạn chế được các request lên server từ các URL giả mạo này.

# Thực hiện
## Đăng ký middleware
Để sử dụng, chúng ta cần đăng ký middleware ```ValidateSignature``` tại ```/app/Http/Kernel.php```, với các phiên bản sau 5.6.12, ```Laravel``` đã đăng ký sẵn giúp chúng ta rồi vì vậy có thể bỏ qua bước này.
```php
protected $routeMiddleware = [
        'auth' => \App\Http\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
        'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class,
        'can' => \Illuminate\Auth\Middleware\Authorize::class,
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
        'signed' => \Illuminate\Routing\Middleware\ValidateSignature::class,
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
    ];
```
## Trước khi chứng thực
Trước khi sử dụng ```Signed routes```, chúng ta có một route:
```php
Route::get('articles/{$postId}/unsubscribe', function($postId) {
  //Logic code
})->name('users.unsubscribe');
```
URL Sinh ra bởi Facades:
```php
Url::route('articles.unsubscribe', ['postId' => '96']);
```
là ```https://www.laravel.com/articles/96/unsubscribe```. Như đã trình bày ở trên chúng ta sử dụng 
```Signed routes``` để giảm thiểu những hành động không mong muốn từ những URL không được chứng thực.
Để tạo một URL được chứng thực, chúng ta sử dụng phương thức ```signedRoute``` của facades ```URL```
## Sử dụng
### Sử dụng thông thường
Set middleware vừa đăng ký ở trên cho route
```php
Route::get('articles/{$postId}/unsubscribe', function($postId) {
  //Logic code
})-> name('articles.unsubscribe')->middleware('signed');
```
Sử dụng facades ```URL```
```php
Url::signedRoute('articles.unsubscribe', ['postId' => '96']);
```
URL lúc này sẽ có dạng
```https://www.laravel.com/articles/69/unsubscribe?signature=30b3458d01860dfg0f7ca45fH2c6657ur16a98d23478dgc9789de3c21es13ff3```
### Giới hạn về thời gian
Trong một số trường hợp, ví dụ như gửi URL các sản phẩm được khuyến mãi hay URL reset password, mỗi URL sẽ có hiệu lực trong khoảng thời gian nhất định từ khi được tạo ra. 
Sử dụng method ```temporarySignedRoute``` facades ```URL```
```php
Url::temporarySignedRoute('articles.unsubscribe', now()->addHour(), ['postId' => '96']);
```
```https://www.laravel.com/articles/69/unsubscribe?expires=1524636982signature=30b3458d01860dfg0f7ca45fH2c6657ur16a98d23478dgc9789de3c21es13ff3```
URL mới được tạo ra sẽ có thêm param là ```expires``` có giá trị là một timestamp.
## Xử lý URL
Để hiểu rõ hơn Laravel xử lý thế nào, hãy xem thử nội dung của middleware ```ValidateSignature``` :grinning:
```php
class ValidateSignature
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Illuminate\Http\Response
     *
     * @throws \Illuminate\Routing\Exceptions\InvalidSignatureException
     */
    public function handle($request, Closure $next)
    {
        if ($request->hasValidSignature()) {
            return $next($request);
        }

        throw new InvalidSignatureException;
    }
}
```
Tại middleware này, Laravel sẽ xác thực URL thông qua phương thức ```hasValidSignature()``` của $request. Nếu URL không hợp lệ sẽ throw ra ```InvalidSignatureException``` với code ```403```, tương tự như ```AccessDeniedHttpException``` khi không qua được Policy.
```php
class InvalidSignatureException extends HttpException
{
    /**
     * Create a new exception instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct(403, 'Invalid signature.');
    }
}
```
Vì xác thực URL dựa vào phương thức ```$request->hasValidSignature()``` nên chúng ta có thể kiểm tra được URL từ request ở nhiều nơi thay vì chỉ ở trong middleware.
Ví dụ kiểm tra ngay trong route
```php
Route::get('articles/{$postId}/unsubscribe', function(Request $request, $postId) {
    if (!$request-> hasValidSignature()) {
        abort(403);
    }
})->name('articles.unsubscribe');
```
# Tổng kết
Trên đây là những thông tin cơ bản mình tìm hiểu được, hy vọng mọi người có thể áp dụng vào trong các tình huống thực tế, để tìm hiểu rõ hơn các bạn có thể tham khảo tại [đây] :stuck_out_tongue_winking_eye::grinning:(https://laravel.com/docs/5.8/urls#urls-for-named-routes)