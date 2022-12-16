Trước khi PHP 8 ra đời, những khi bạn không chắc chắn về kiểu của thuộc tính hay giá trị trả về, chúng ta sẽ bỏ qua, không chỉ định kiểu cho chúng. Nếu bạn sử dụng một IDE như PHPStorm, dockBlock sẽ đánh dấu các thuộc tính đó với kiểu dữ liệu mixed.

## Kiểu dữ liệu mixed
```php
/**
 * Handle an incoming request.
 *
 * @param  mixed  $request
 * @param  \Closure  $next
 * @return mixed
 */
public function handle($request, Closure $next)
{
    return $next($request);
}
```
Điều này cũng có một vài lợi ích. Nhưng về cơ bản, nó không thực sự được kiểm tra kiểu bằng trình biên dịch của PHP.

Để giảm bớt vấn đề này, PHP 8 đã giới thiệu kiểu dữ liệu `mixed`, có thể sử dụng để gán cho thuộc tính hoặc giá trị trả về.

Về cơ bản, kiểu dữ liệu `mixed` sẽ tương đương với: `array` hoặc `bool` hoặc `callable` hoặc `int` hoặc `float` hoặc `null` hoặc `object` hoặc `resource` hoặc `string`. Vì vậy, bất cứ khi nào bạn không chắc chắn về kiểu dữ liệu, hãy sử dụng mixed.

Ví dụ bên trên có thể viết lại thành:
```php
/**
 * Handle an incoming request.
 *
 * @param  mixed  $request
 * @param  \Closure  $next
 * @return mixed
 */
public function handle(mixed $request, Closure $next): mixed
{
    return $next($request);
}
```
Và bây giờ, mọi thứ sẽ rõ ràng hơn. Và trình biên dịch của PHP biết sẽ phải làm gì với những thuộc tính/giá trị này.

## Các quy tắc
### Kiểu `mixed` không thể nullable
Bình thường khi muốn định kiểu dữ liệu hoặc `null`, chúng ta phải thêm dấu `?` trước kiểu dữ liệu. Ví dụ:
```php
function getName(string $text) {}
// $text bắt buộc phải là string

function getName(?string $text) {}
// $text là string hoặc null
```
Nhưng đối với kiểu `mixed` chúng ta không thể sử dụng như vậy. Bởi vì kiểu `mixed` đã bao gồm `null`.
```php
function getName(?mixed $arg) {}
// Fatal error: Mixed types cannot be nullable, null is already part of the mixed type.
 
function getName(): ?mixed {}
// Fatal error: Mixed types cannot be nullable, null is already part of the mixed type.
```
### Phải có giá trị trả về cho return kiểu `mixed`
Khi sử dụng kiểu return là `mixed`, một giá trị phải được trả về.
```php
function getName(): mixed {}
 
getName();

// Uncaught TypeError: Return value of getName() must be of 
// the type mixed, none returned
```
### Kiểu của thuộc tính có thể mở rộng khi kế thừa
Một thuộc tính có kiểu dữ liệu bất kỳ trong class cha có thể mở rộng thành `mixed` trong class con.
```php
class A
{
    public function getName(string $value) {}
}
 
class B extends A
{
    // hoạt động
    public function getName(mixed $value) {}
}
```
Nhưng ngược lại thì không được.
```php
class A
{
    public function getName(mixed $value) {}
}
 
class B extends A
{
    // Fatal error
    public function getName(string $value) {}
}
```
### Kiểu của return có thể thu hẹp khi kế thừa
Ngược lại với kiểu thuộc tính, một method có kiểu trả về là `mixed` trong class cha có thể thu hẹp thành kiểu bất kỳ trong class con.
```php
class A
{
    public function getName(): mixed {}
}
 
class B extends A
{
    // hoạt động
    public function getName(): string {}
}
```
Ngược lại thì không hợp lệ.
```php
class C
{
    public function getName(): string {}
}
 
class D extends C
{
    // Fatal error
    public function getName(): mixed {}
}
```
### Giả định kiểu dữ liệu `mixed` nếu không có kiểu dữ liệu nào được chỉ định
Khi không có kiểu nào được chỉ định, việc kiểm tra kiểu khi kế thừa được thực hiện giống với kiểu `mixed`.
```php
class A
{
    // $value được hiểu là có kiểu mixed
    public function getName($value) {}
}
 
class B extends A
{
    // kiểu mixed được chỉ định, không thay đổi so với class cha
    public function getName(mixed $value) {}
}
 
class C extends B
{
    // không có kiểu dữ liệu nào được chỉ định
    // $value được hiểu là có kiểu dữ liệu mixed giống class cha
    public function getName($value) {}
}
 
class D extends B
{
    public function getName(mixed $value = null) {}
}
```
### Kiểm tra kiểu return nếu không được chỉ định
Khi không có kiểu return nào được chỉ định, việc kiểm tra kiểu khi kế thừa được thực hiện giống với kiểu `mixed` hoặc `void`.
```php
class A
{
    // không chỉ định kiểu return, hiểu là mixed|void
    public function getName() {}
}
 
class B extends A
{
    // chỉ định kiểu return là mixed
    // kiểu mixed được hiểu là thu hẹp của 'mixed|void'
    public function getName(): mixed {}
}
 
class C extends B
{
    // không chỉ định kiểu return, hiểu là 'mixed|void'
    // 'mixed|void' là mở rộng của mixed.
    // Fatal error
    public function getName() {}
}

class D extends B
{
    // void là kiểu dữ liệu khác với mixed
    // Fatal error
    public function getName(): void {}
}
```
Tham khảo:

https://wiki.php.net/rfc/mixed_type_v2

https://wiki.php.net/rfc/mixed-typehint

Cảm ơn các bạn đã đọc bài viết!