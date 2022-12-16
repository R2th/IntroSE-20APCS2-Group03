Nguồn: http://laraveldaily.com/
## Tip 26 Tham số câu lệnh artisan. 
Trong quá trình tạo mới một lệnh câu lệnh với **artisan**, bạn có thể yêu câu input bằng một số cách như **$this->confirm(), $this->anticipate(), $this->choice()**
Code ví dụ sẽ như sau
```php
// Yes or no?
if ($this->confirm('Do you wish to continue?')) {
}

// Open question with auto-complete options
$name = $this->anticipate('What is your name?', ['Taylor', 'Dayle']);

// One of the listed options with default index
$name = $this->choice('What is your name?', ['Taylor', 'Dayle'],
$defaultIndex);
```

## Tip 27 Xem trước mailables. 
Nếu bạn sử dụng Mailables để gửi email, bạn có thể xem trước kết quả mà không phải gửi mail đi, mà có thể  nhận dạng trên brosser, 
```php
Route::get('/mailable', function () {
    $invoice = App\Invoice::find(1);
    return new App\Mail\InvoicePaid($invoice);
});
```

## Tip 28 Route::view(), đừng tạo Controller. 
Nếu trong function Controller của bạn, chỉ trả về view, thì có thể không sử dụng controller. 
```php
// Instead of this
Route::get('about', 'TextsController@about');
// And this
class TextsController extends Controller
{
public function about()
{
return view('texts.about');
}
}
// Do this
Route::view('about', 'texts.about');
```
Thực tế thì trong dự án, tất cả phải viết vào controller, vì hiện tại, có thể chỉ trả về view, tuy nhiên, nếu thêm một số xử lý logic, như thêm policy, thì lại mất công viết vào controller. 
## Tip 29 Blade @auth 
Thay vì việc sử dụng cấu trúc if để check điều kiện user đã login hay chưa, ở blade có thể sử dụng directive @auth 
Cách viết thông thường 
```php
@if(auth()->user())
// The user is authenticated.
@endif
```

Cách viết ngắn hơn
```php
@auth
// The user is authenticated.
@endauth
```

Ngoài ra cũng có @guest directive,  phần cho riêng user chưa login 
```php
@guest
// The user is not authenticated.
@endguest
```

## Tip 30 Model all: columns 
Trong khi sử dụng ::all của Model, chúng ta có thể sử chỉ định cột nào được lấy ra 
```
$users = User::all(); // normal case
$users = User::all(['id', 'name', 'email']);
```
Chú ý: típ này cũng được sử dụng với function *get()* của Eloquent Model

## Tip 31 Localhost trong .env 
Đừng quên đổi biến *APP_URL* trong file .env từ *http://localhost* thành URL thật sự. Nó là nguyên nhân chính dẫn đến một số lỗi của các trường hợp đường dẫn không hợp lệ. 
```php
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:9PHz3TL5C4YrdV6Gg/Xkkmx9btaE93j7rQTUZWm2MqU=
APP_DEBUG=true
APP_URL= http://localhost
```

## Tip 32 Có gì đằng sau các routes ?
Nếu bạn muốn biết các xử lý đằng sau các routes, và thực sự muốn hiểu cơ chế thực hiện đằng sau các dòng lệnh routes cơ bản.  Ví dụ như đằng sau **Auth::routes** là gì. 
Đối với các phiên bản từ **Laravel 7** trở lên thì hãy kiểm tra file **/vendor/laravel/ui/src/AuthRouteMethods.php**
```php
public function auth()
{
    return function ($options = []) {
        // Authentication Routes...
        $this->get('login', 'Auth\LoginController@showLoginForm')->name('login');
        $this->post('login', 'Auth\LoginController@login');
        $this->post('logout', 'Auth\LoginController@logout')->name('logout');
        // Registration Routes...
        if ($options['register'] ?? true) {
            $this->get('register',
                'Auth\RegisterController@showRegistrationForm')->name('register');
                $this->post('register', 'Auth\RegisterController@register');
        }
        // Password Reset Routes...
        if ($options['reset'] ?? true) {
            $this->resetPassword();
        }
        // Password Confirmation Routes...
        if ($options['confirm'] ??
            class_exists($this->prependGroupNamespace('Auth\ConfirmPasswordController'))) {
            $this->confirmPassword();
        }
        // Email Verification Routes...
        if ($options['verify'] ?? false) {
            $this->emailVerification();
        }
    };
}
```
Ở các phiên bản thấp hơn **Laravel 7.0** có thể kiểm tra ở file **/vendor/laravel/framework/src/illuminate/Routing/Router.php**

## Tip 33 To Fail
Cùng với phương thức **findOrFail()**, Eloquent cũng cung cấp phương thức **firstOrFail()**, sẽ trả về record đầu tiên thỏa mãn điều kiện, hoặc trả về trang 404 nếu không có bản ghi nào thỏa mãn. 
Điểm khác biệt giữa chúng là trong khi **findOrFail** yêu cầu tham số là id, thì **firstOrFail()** thường được sử dụng trong các câu query 
```php
$user = User::findOrFail(1); // trả về user có id = 1 hoặc trang 404 nếu không có bản ghi nào thỏa mãn. 
$user = User::whereEmail('test@example.com')->firstOrFail(); // trả về bản ghi đầu tiên thỏa mãn điều kiện có email là test@example.com hoặc trả về trang 404 nếu không có bản ghi nào thỏa mãn. 
```

## Tip 34 Thay đổi tên cột 
Trong Eloquent Query Builder để thay đổi tên cột trả về, giống SQL có thể sử dụng **as**. 
```php
$users = DB::table('users')
->select('name', 'email as user_email')
->get();
```

## Tip 35 Ghi log với các tham số. 
Có thể sử dụng Log::info với tham số truyền vào để biết rõ hơn chính xác chuyện gì đã xảy ra.
```php
Log::info('User failed to login.', ['id' => $user->id]);
```