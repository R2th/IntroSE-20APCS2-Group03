Trong Laravel framework, đối tượng Illuminate Request và Response kế thừa các ưu điểm từ [symfony/http-foundation](https://github.com/symfony/http-foundation)  và cung cấp những API tuyệt vời, dễ dàng sử dụng cho các core classes.

Trong bài viết này, chúng ta sẽ khám phá một vài method hữu ích mà Laravel cung cấp thông qua đối tượng Request.

Lớp Illuminate\Http\Request tổ chức các phương thức theo chức năng trong 3 Trait mà chúng ta sẽ tìm hiểu chi tiết sau đây:
* InteractsWithContentTypes
* InteractsWithInput
* InteractsWithFlashData

Trong bài viết này mình sẽ không nói về các phương thức mới hay hướng dẫn về cách sử dụng, nhưng hi vọng các bạn sẽ tìm thấy một vài method hữu ích. Còn đối với các developers mới làm việc với Laravel framework có thể tìm hiểu sâu hơn về source của những class quan trọng này.
    
## Interacts With Content Types
Trong vòng đời Request/Response, đôi khi bạn cần xác định yêu cầu của Request thông qua Content-Type HTTP header. Với header này, InteractsWithContentTypes cung cấp cho chúng ta nhiều công cụ cho những thứ hay sử dụng thay vì kết hợp nhiều method khác nhau trong HTTP foundation request.

Ví dụ, chúng ta có thể sử dụng các phương thức JSON sau đây để kiểm tra xem client có yêu cầu JSON  hay không, giá trị trả về là boolean:
```php
$request->wantsJson();
$request->expectsJson();
$request->isJson();
$request->acceptsJson();
```
Phương thức thứ nhất, `isJson()` kiểm tra `/json` và `+json` trong Content-Type header.  Phương thức này sử dụng khi muốn kiểm tra xem dữ liệu client gửi lên có phải là JSON hay không.

Sự khác biệt giữa `isJson()` và `wantsJson()`: `wantsJson()` sử dụng Accept header để tạo Response phù hợp với Request gửi lên, trong khi `isJson()` được sử dụng để xác định định dạng của Request gửi lên.

Tương tự, phương thức `expectsJson()` xác định xem client có mong muốn JSON Response không bằng một trong các điều kiện sau:
* Request gửi lên là AJAX, không phải PJAX, và accept bất cứ Content-Type nào `(*/*)`
* Lấy theo giá trị `wantsJson()` nếu điều kiện trên không đúng

Phương thức cuối cùng, `acceptsJson()` được sử dụng để kiểm tra **application/json** có nằm trong các Response types được chấp nhận hay không. Phương thức `acceptsJson()` sử dụng một phương thức tổng quát hơn trong cùng Trait có tên là `accepts()`,  phương thức này nhận vào giá trị là một hoặc một mảng content types:
```php
$request->accepts(['application/xml', 'text/xml']);
```
Phương thức cuối cùng mình muốn giới thiệu trong Trait này là `format()`, sử dụng để xác định định dạng Response mong muốn (với giá trị mặc định tùy ý):
```php
// Xác định format dựa vào Request
// Trả về `json` nếu không thể xác định format trong Accept content types
$request->format('json');
```
## Interacting with Input
Sự tiện lợi khi làm việc với HTTP input là phần mình thích nhất ở Illuminate Request.

Phần đặc biệt nhất của Trait InteractsWithInput là phương thức `input()`. Phương thức này khá đơn giản:
```php
/**
 * Retrieve an input item from the request.
 *
 * @param  string|null  $key
 * @param  mixed  $default
 * @return mixed
 */
public function input($key = null, $default = null)
{
    return data_get(
        $this->getInputSource()->all() + $this->query->all(), $key, $default
    );
}
```
Nhìn vào đoạn code trên, bạn sẽ thấy helper `data_get()` được sử dụng trong phương thức này để nhận đầu vào từ nhiều nguồn khác nhau:
* Input ParameterBag
* Request query

Chúng ta thường sử dụng phương thức này để lấy giá trị input của POST|PUT|PATCH, và bạn cũng có thể sử dụng để lấy giá trị input từ query string:
```php
$email = $request->input('email');
```
Ngay cả class Request cũng sử dụng phương thức `all()` từ Trait InteractsWithInput để truy cập nhanh đến giá trị input:
```php
// Gọi đến $request->all() và lấy giá trị input từ Request
$request->email
```

Một phương thức thường dùng khác là `only()`, được dùng để lấy giá trị từ các trường mong muốn và loại trừ các trường khác:
```php
// Variadic arguments với func_get_args()
$request->only('email', 'password');

// Hoặc mảng
$request->only(['email', 'password']);
```
Hãy sử dụng phương thức `only()` khi bạn muốn lấy từ Request các trường cần sử dụng và tránh nhận vào các trường ngoài ý muốn, như khi lưu vào DB chẳng hạn.

Một phương thức thú vị khác là nhận giá trị input kiểu boolean, rất hữu ích khi bạn muốn xác định một trường nhập vào là  true hay false:
```php
// Kiểm tra giá trị "accept" theo kiểu boolean, mặc định là false
// Trả về true nếu giá trị input là:
// "1", "true", "on", hoặc "yes"
$request->boolean('accept', false);
```
Trait này cũng có những phương thức hữu ích khi làm việc với HTTP headers:
```php
// Lấy token từ Authorization header
// Xóa bỏ tiền tố "Bearer " nếu có.
// Ví dụ: "Authorization: Bearer 1234", sẽ trả về 1234.
$request->bearerToken();

$request->hasHeader('X-Custom-Header');

$request->header('X-Custom-Header');
```
Các phương thức này giúp bạn thuận tiện hơn và tránh sử dụng các phương thức từ Symfony request:
```php
// Tương đương với $request->header('X-Custom-Header');
$request->headers->get('X-Custom-Header');

// Tương đương với $request->hasHeader('X-Custom-Header')
! is_null($request->headers->get('X-Custom-Header'));
```
Một số phương thức hữu ích khác:
```php
// Tất cả input ngoại trừ password
$request->except('password');

// Kiểm tra nếu Request chứa key được chỉ định
$request->has('age');

// Kiểm tra nếu Request chứa một trong các key được chỉ định
$request->hasAny('age', 'height', 'weight');

// Lấy tất cả key của input và file
$request->keys();

// Kiểm tra nếu Request không chứa key
$request->missing('age');

// Kiểm tra nếu giá trị nhập vào không rỗng
$request->filled('age');

// Kiểm tra nếu một trong các giá trị chỉ định không rỗng
$request->anyFilled('age', 'height', 'weight');

// Lấy giá trị từ query string (?id=12345)
$request->query('id');

// Lấy ra mảng gồm tất các các file từ Request
$request->allFiles();

// Kiểm tra nếu Request có chứa file với name chỉ định
$request->hasFile('avatar');

// Lấy file từ Request
$request->file('avatar');
```
## Interacting with Flash Data
Một nhu cầu khác của ứng dụng server-side là lưu trữ thông tin request trong session khi có lỗi nào đó như là lỗi validation xảy ra. Việc flash data vào session đảm bảo người dùng có thể sử dụng các dữ liệu mình đã nhập vào để chỉnh sửa các input không phù hợp và gửi lại các input hợp lệ trong lần Request tiếp theo.

Bạn có thể đã từng dùng qua helper `old()` trong các file blade, để lấy dữ liệu input trong flash session từ lần Request trước:
```php
<input type="email" value="{{ old('email') }}" required />
```
Helper `old()` đơn giản là gọi đến phương thức `old()` trong Trait này:
```php
function old($key = null, $default = null)
{
    return app('request')->old($key, $default);
}
```

**Trước hết, làm cách nào để chúng ta lấy được dữ liệu từ session**

Nếu bạn mới làm quen với Laravel thì chỉ cần hiểu là Validation trong Laravel sẽ tự động làm việc này. Khi một lỗi validation xảy ra, framework sẽ throw một ValidationException, nơi xử lý lưu trữ flash data vào session của Response thông qua exception Handler:
```php
/**
 * Convert a validation exception into a response.
 *
 * @param  \Illuminate\Http\Request  $request
 * @param  \Illuminate\Validation\ValidationException  $exception
 * @return \Illuminate\Http\Response
 */
protected function invalid($request, ValidationException $exception)
{
    return redirect($exception->redirectTo ?? url()->previous())
                ->withInput(Arr::except($request->input(), $this->dontFlash))
                ->withErrors($exception->errors(), $exception->errorBag);
}
```
**Chú ý rằng `$this->dontFlash` được sử dụng để đảm bảo *password* và *password_confirmation* không được lưu vào session.**

Validators sẽ luôn xử lý để flash data vào session, tuy nhiên bạn cũng có thể flash input vào session thông qua Request:
```php
// Flash dữ liệu từ $request->input() vào session
$request->flash();
```
Hãy cẩn thận khi sử dụng phương thức này để không lưu các giá trị nhạy cảm vào session. Để an toàn hơn, bạn có thể sử dụng phương thức `flashOnly()`:
```php
$request->flashOnly('email', 'first_name', 'last_name');
```
Hoặc ngược lại:
```php
$request->flashExcept('password', 'secret_input');
```
## Kết
Hãy nhớ rằng Illuminate Request kế thừa từ HTTP Foundation Request, bạn có thể sử dụng  mọi thứ mà Foundation Request có. Nếu các bạn muốn tìm hiểu sâu hơn thì có thể click vào các liên kết ở cuối bài.

Ngoài ra, bạn có thể extend Request của Laravel thông qua macros giống như cách Laravel làm với phương thức `Request::validate()`:
```php
Request::macro('validate', function (array $rules, ...$params) {
    return validator()->validate($this->all(), $rules, ...$params);
});
```
Hi vọng bài viết này sẽ hữu ích với các bạn.

Một số nguồn tham khảo:
* [The HttpFoundation Component (Symfony Docs)](https://symfony.com/doc/current/components/http_foundation.html)
* [HTTP Requests – Laravel – The PHP Framework For Web Artisans](https://laravel.com/docs/7.x/requests)
* [Illuminate/Http at 7.x · laravel/framework · GitHub](https://github.com/laravel/framework/tree/7.x/src/Illuminate/Http)