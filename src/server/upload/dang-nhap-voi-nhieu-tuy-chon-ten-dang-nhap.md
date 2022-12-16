Xin chào các bạn!

Hôm nay chúng ta cùng nhau bàn luận về chủ đề xác thực người dùng trong laravel.
Đối với một website thì việc xác thực người dùng là một công việc rất quan trong và được đặt lên hàng đầu.
Laravel đã hỗ trợ sẵn phương thức xác thực người dùng vô cùng mạnh mẽ và việc thay đổi nó theo mục đích sử dụng của dự án rất dễ dàng.

Khi xây dựng tính năng xác thực người dùng bạn có thể gặp các vấn đề sau:

- Đăng nhập với nhiều tùy chọn tên đăng nhập: đăng nhập bằng email hoặc số điện thoại.
- Có nhiều vai trò người dùng khác nhau trong hệ thống: admin, user
- Chuyến hướng sau khi đăng nhập
- Giới hạn yêu cầu đăng nhập

Trong phạm vi bài viết này chúng ta cùng xây dựng một tính năng đăng nhập với hai tùy chọn tên đăng nhập hoặc là địa chỉ email hoặc là số điện thoại.

## Đặt vấn đề

Một trang đăng nhập thông thường sẽ có một input là email và một input là mật khẩu.
Nhưng khi người dùng có nhiều thông tin có thể xác thực người dùng đó: email, username, số điện thoại.
Tất yếu phải có nhiều lựa chọn hơn để đăng nhập.

Như trang đăng nhập của viblo chẳng hạn.

![](https://images.viblo.asia/5bdd7546-4cf2-4cb0-98ce-10dad54802f9.png)

Ta có có thể nhập email hoặc username để đăng nhập.

Hay là facebook ta có thể nhập địa chỉ email hoặc số điện thoại để đăng nhập vào hệ thống.

![](https://images.viblo.asia/94e0c210-929f-474d-adfc-7bfbab60da6f.png)

## Giải pháp

- Sử dung regex để xác định định dạng dữ liệu tên đăng nhập mà người dùng nhập vào xem đó là số điện thoại hay email
- Sau đó đăng nhập bằng loại dữ liệu xác định được

## Cách thực hiện

Chúng ta cần chuẩn bị một project laravel mới. Ở đây mình dùng laravel phiên bản 5.7.

Chạy lệnh tạo view và route auth mặc định của laravel

```bash
php artisan make:auth
```

### Thêm các thông tin người dùng

Thêm thông tin số điện thoại vào bảng người dùng.

```php
// database/migrations/2014_10_12_000000_create_users_table.php
//................................
    Schema::create('users', function (Blueprint $table) {
        $table->increments('id');
        $table->string('name');
        $table->string('email')->unique()->nullable();
        $table->string('phone', 20)->unique()->nullable();
        $table->timestamp('email_verified_at')->nullable();
        $table->string('password');
        $table->rememberToken();
        $table->timestamps();
    });
//................................
```

Mình thêm một cột số điện thoại `phone` và có sửa cột `email` để có thể có giá trị.

Mục đích của việc này là giúp cho việc đăng ký chỉ cần một trong hai thông tin email hoặc số điện thoại là được.

Bạn chạy `php artisan migrate` hoặc `php artisan migrate:refresh` để cập nhật bảng cơ sở dữ liệu nếu lỡ tay chạy migrate trước đó rồi.

**Chú ý:** Khi chạy lệnh `php artisan migrate:refresh` thì tất cả các dữ liệu của bảng sẽ bị xóa hết.

Cuối cùng là thêm cột phone vào User model

```php
// app/Models/User.php
//................................
    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
    ];
//................................
```

**Chú ý:** Mình di chuyển tất cả models vào thư mục Models để đễ quản lý.
Nếu bạn làm như mình thì hay chắc chắn rằng đã đổi namespace của model từ `namespace App;` thành `namespace App\Models;` và sửa trong `config/auth.php`.

```php
// config/auth.php
//................................
    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => \App\Models\User::class,
        ],
    ],
//................................
```

### Các hàm bổ trợ

Số điện thoại thì có rất nhiều dạng thù hình khác nhau: 0912345678, 84912345678, +84912345678, 0912 345 678, 0912-345-678,...
Ta cần phải chuyển chúng vào cùng một dạng duy nhất là: 84912345678 (đây là số điện thoại Việt Nam, nước khác thì sẽ có mã quốc gia khác, trong phần này mình chỉ nói về số điện thoại Việt Nam cho đơn giản).

Mình sử dụng một hàm helper tự thêm như sau:

```php
// app/Helper/GlobalFunction.php
//................................
if (!function_exists('format_phone_number')) {
    function format_phone_number($phoneNumber, $country = null)
    {
        if (!$phoneNumber || (!is_string($phoneNumber) && !is_integer($phoneNumber))) {
            return null;
        }

        $countryCodes = config('country.codes');
        $defaultCountry = 'VN';

        //Remove any parentheses and the numbers they contain:
        $phoneNumber = preg_replace('/\([0-9]+?\)/', '', $phoneNumber);

        //Strip spaces and non-numeric characters:
        $phoneNumber = preg_replace('/[^0-9]/', '', $phoneNumber);

        //Strip out leading zeros:
        $phoneNumber = ltrim($phoneNumber, '0');

        if (!$phoneNumber) {
            return $phoneNumber;
        }

        //Look up the country dialling code for this number:
        if ($country && array_key_exists($country, $countryCodes)) {
            $pfx = $countryCodes[$country];
        } else {
            $pfx = $countryCodes[$defaultCountry];
        }

        //Check if the number doesn't already start with the correct dialling code:
        if (!preg_match('/^' . $pfx . '/', $phoneNumber)) {
            $phoneNumber = $pfx . $phoneNumber;
        }

        return $phoneNumber;
    }
}
```

Trong hàm này mình có sử dụng config `country.codes`. Nội dung file `config/country.php` như sau

```php
// config/country.php
return [
    'codes' => [
        'AC' => '247',
        'AD' => '376',
        'AE' => '971',
        'AF' => '93',
        'AG' => '1268',
        //.................
        'VN' => '84'
        //.................
    ],
];
```

**Chú ý:** để thêm helper cho project laravel bạn cần phải khai báo trong phần loader của composer.json và chạy `composer dump-autoload` hoặc `composer install`

```
// composer.json
//................................
    "autoload": {
        "classmap": [
            "database/seeds",
            "database/factories"
        ],
        "psr-4": {
            "App\\": "app/"
        },
        "files": [
            "app/Helper/GlobalFunction.php"
        ]
    },
//................................
```

### Lập trình phần đăng ký

#### Phần hiển thị (view)

Thêm trường số điện thoại vào dưới email trong form đăng ký:

```html
<!-- resources/views/auth/register.blade.php -->
<!-- ................................ -->
    <div class="form-group row">
        <label for="phone" class="col-md-4 col-form-label text-md-right">{{ __('Phone number') }}</label>

        <div class="col-md-6">
            <input id="phone" type="text" class="form-control{{ $errors->has('phone') ? ' is-invalid' : '' }}" name="phone" value="{{ old('phone') }}">

            @if ($errors->has('phone'))
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $errors->first('phone') }}</strong>
                </span>
            @endif
        </div>
    </div>
<!-- ................................ -->
```

Hiển thị lên trình duyệt sẽ như sau:

![](https://images.viblo.asia/74f3a004-7c4b-4bf8-b80e-7a9cb2f31fbb.png)

### Phần điều khiển (controller)

Phần kiểm tra dữ liệu đăng ký đầu vào. Sửa hàm `validator` trong `RegisterController`.

```php
// app/Http/Controllers/Auth/RegisterController.php
//................................
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required_without:phone|string|email|max:255|unique:users',
            'phone' => 'required_without:email|max:20|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
    }
//................................
```

Dữ liệu đăng ký phải có một trong hai trường hoặc có `email` hoặc có `phone`. Nên mình để  điều kiện `email` phải `required_without:phone` và ngược lại.

Ta phải thêm trường `phone` trong hàm tạo người dùng (`create`). `phone` phải được format đúng định dạng trước khi thêm vào.

```php
// app/Http/Controllers/Auth/RegisterController.php
//................................
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => format_phone_number($data['phone']),
            'password' => Hash::make($data['password']),
        ]);
    }
//................................
```

### Lập trình phần đăng nhập

### Phần hiển thị

Thay trường nhập `email` thành nhập email hoặc số điện thoại tên của trường này mình sẽ để là `username`

```html
<!-- app/Http/Controllers/Auth/RegisterController.php -->
<!-- ................................ -->
    <div class="form-group row">
        <label for="username" class="col-sm-4 col-form-label text-md-right">{{ __('E-Mail Address or Phone number') }}</label>

        <div class="col-md-6">
            <input id="username" type="username" class="form-control{{ $errors->has('username') ? ' is-invalid' : '' }}" name="username" value="{{ old('username') }}" required autofocus>

            @if ($errors->has('username'))
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $errors->first('username') }}</strong>
                </span>
            @endif
        </div>
    </div>
<!-- ................................ -->
```

Hiển thị ra sẽ như sau:

![](https://images.viblo.asia/9021edf4-bf42-4da3-93ae-5e411986ed19.png)

### Phần điều khiển (controller)

Phần điều khiển của chức năng đăng nhập sẽ nằm tòan bộ ở `app/Http/Controllers/Auth/LoginController.php`. Controller này sẽ sử dụng trait `Illuminate\Foundation\Auth\AuthenticatesUsers`.

Khi mở `AuthenticatesUsers` trait ra thì có rất nhiều hàm xử lý. Luồng xử lý khi đăng nhập sẽ như sau:

- Validate dữ liệu
- Kiểm tra xem người dùng có đăng nhập quá nhiều lần thất bại không
- Thực hiện đăng nhập
- Khi người dùng đăng nhập thành công thì tạo lại session, xóa bộ đếm số lần đăng nhập không thành công, chuyến hướng người dùng mặc định là đến trang chủ.
- Khi người dùng đăng nhập thất bại thì sẽ tăng biến đếm số lần đăng nhập nếu người dùng đăng nhập không thành công đồng thời chuyến hướng người dùng lại trang đăng nhập kèm thông báo lỗi.

Đầu tiên ta phải viết lại hàm `username`. Thay đổi giá trị trả về của nó thành `username` vì trường gửi lên sẽ có tên là `username`.
Để thực hiện được đăng nhập bằng nhiều kiểu dữ liệu chúng ta cần xử lý ở hàm `credentials`.
Đầu tiên sẽ kiểm tra username có phải là email không qua regex. Mình sử dụng email regex trên trang [https://emailregex.com](https://emailregex.com)

```php
const EMAIL_REGEX = '/^(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))$/iD';
```

Nếu không phải email thì có thể là số điện thoại.

Hàm `credentials` sẽ như sau:

```php
// app/Http/Controllers/Auth/LoginController.php
//................................
    protected function credentials(Request $request)
    {
        $username = $request->get($this->username(), '');
        $usernameField = 'email';
        preg_match(self::EMAIL_REGEX, $username, $matches);
        // Nếu không phải địa chỉ email thì sẽ có thể là số điện thoại
        if (empty($matches)) {
            $usernameField = 'phone';
            $username = $this->validatePhoneNumber($username);
        }

        return [
            $usernameField => $username,
            'password' => $request->get('password'),
        ];
    }

    protected function validatePhoneNumber($username)
    {
        $username = format_phone_number($username);

        if ($username) {
            return $username;
        }

        // nếu không phải số điện thoại thì trả về thông báo lỗi
        throw ValidationException::withMessages([
            $this->username() => [trans('auth.failed')],
        ]);
    }
//................................
```

Như vậy là xong rồi. Bạn thử kiểm tra xem có thể đăng nhập bằng địa chỉ email hoặc số điện thoại không nhé.

Cảm ơn bạn đã đọc bài viết của mình. Hi vọng bài viết có thể giúp ích cho bạn.