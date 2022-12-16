# Giới thiệu
Laravel giúp cho việc thực hiện việc xác thực vô cùng đơn giản. Chỉ với một câu lệnh:
```
php artisan make:auth
```
Laravel sẽ generate ra các controllers và routes tương ứng:
![](https://images.viblo.asia/eced7cf1-85a2-43cf-ad64-b0bba012f962.png)

![](https://images.viblo.asia/6835f733-1a35-4f13-982c-34d752fb509c.png)

Ngoài cách sử dụng phần auth được xây dựng sẵn của Laravel, chúng ta có thể tùy chỉnh chúng sao cho phù hợp. Có tổng cộng 7 cách được liệt kê trong bài viết này:
# Tùy chỉnh Laravel Authentication
## 1. Tắt tính năng Registration
Đối với một số hệ thống không public phần đăng ký, từ **Laravel 5.7**, chúng ta có thể tắt phần auth đi bằng cách thêm đoạn code
```
Auth::routes(['register' => false]);
```
vào trong file **routes/web.php**.

Trên thanh top của trang chủ sẽ mất đi link Register, đồng thời url trỏ đến /register cũng hiển thị ra page 404.
## 2. Bật tính năng Email Verification
Từ phiên bản **5.7**, Laravel cho phép người dùng xác thực qua email thông qua việc thêm đoạn code
```
Auth::routes(['verify' => true]);
```
vào trong file **routes/web.php**.

Mã xác thực người dùng sẽ được lưu vào trường 
```
users.email_verified_at
```
của table **users** trong database.
Nếu chúng ta muốn tùy chỉnh chỉ cho phép những người dùng đã xác thực email được truy cập vào route, chúng ta có thể sử dụng
```
middleware('verified')
``` 
mà Laravel đã xây dựng sẵn và được định nghĩa trong
```
Illuminate\Auth\Middleware\EnsureEmailIsVerified
``` 
Middleware này đã được đăng ký trong HTTP Kernel, vì vậy chúng ta có thể sử dụng chúng trực tiếp:
```
Route::get('profile', function () {
    // Only verified users may enter...
})->middleware('verified');
```
## 3. Tắt tính năng Reset Pasword
```
Auth::routes(['reset' => false]);
```
Ngoài ra, chúng ta có thể gộp lại việc bật / tắt các tính năng của auth trong **routes/web.php**:
```
Auth::routes([
  'register' => false,
  'verify' => true,
  'reset' => false
]);
```
## 4. Chuyển hướng trang sau khi Registration
Mặc định, Laravel điều phối người dùng đến url **/home** sau khi họ đăng ký thành công. Nếu muốn thay đổi, chúng ta vào file **app/Http/Controllers/Auth/RegisterController.php** và chỉnh sửa:
```
class RegisterController extends Controller
{
    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    // protected $redirectTo = '/home';
    protected $redirectTo = '/lalalalalalalalalala';
```
Nếu có logic phức tạp hơn, ví dụ với đăng ký user với role là Admin thì di chuyển đến trang /admin, chúng ta thêm hàm ```redirecTo()``` (override lại ```$redirectTo```) trong RegisterController:
```
protected function redirectTo()
{
    if (auth()->user()->role_id == 1) {
        return '/admin';
    }
    return '/home';
}
```
## 5. Tùy chỉnh Validation Rules
Trong file **app/Http/Controllers/Auth/RegisterController.php**, chúng ta có thể tùy chỉnh sao cho phù hợp:
```
protected function validator(array $data)
{
    return Validator::make($data, [
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        'password' => ['required', 'string', 'min:6', 'confirmed'],
    ]);
}
```
## 6. Thêm trường trong form Đăng ký
**Bước 1**: Thêm trường vào trong database. Ví dụ: mình muốn thêm trường **nickname**:
```
php artisan make:migration add_nickname_to_users_table
```
```
$table->string(‘nickname’);
```
**Bước 2**: Thêm nickname vào **fillable** trong model **User**:
```
protected $fillable = [
    'name', 'nickname', 'email', 'password',
];
```
**Bước 3**: Chỉnh sửa view của form Đăng ký. Mở file **resources/views/auth/register.blade.php** và thêm đoạn code này cho phần hiển thị input của nickname:
```
<div class="form-group row">
    <label for="nickname" class="col-md-4 col-form-label text-md-right">Nick Vujicic Name</label>

    <div class="col-md-6">
        <input id="nickname" type="text" class="form-control{{ $errors->has('nickname') ? ' is-invalid' : '' }}" name="nickname" value="{{ old('nickname') }}" required autofocus>

        @if ($errors->has('nickname'))
            <span class="invalid-feedback" role="alert">
                <strong>{{ $errors->first('nickname') }}</strong>
            </span>
        @endif
    </div>
</div>
```
**Bước 4**: Tùy chỉnh hàm **create()** trong trong **RegisterController**:
```
protected function create(array $data)
{
    return User::create([
        'name' => $data['name'],
        'nickname' => $data['nickname'],
        'email' => $data['email'],
        'password' => Hash::make($data['password']),
    ]);
}
```
## 7. Login bằng Username thay vì Email
Mở file **app/Http/Controllers/Auth/LoginController**:
```
class LoginController extends Controller
{
    use AuthenticatesUsers;
    // ... All other code

    public function username()
    {
        // return 'email';
        return 'username';
    }
}
```
# Tổng kết
Ở trên mình đã hướng dẫn một số cách để tùy chỉnh Authentication trong Laravel. Hi vọng bài viết giúp ích cho các bạn :D
# Tài liệu tham khảo
https://medium.com/@sadhakbj/laravel-5-5-activate-account-after-registration-using-laravel-notification-fd5dc7fa05ad

https://laraveldaily.com/9-things-you-can-customize-in-laravel-registration/

https://laravel.com/docs/5.7/verification