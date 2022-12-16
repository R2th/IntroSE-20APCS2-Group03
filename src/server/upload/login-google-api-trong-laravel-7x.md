# . Giới thiệu
- Xin chào mọi người hôm nay mình có lang thang và tìm hiểu về cái login bằng google . Bài viết này cũng là mình ghi nhớ lại những gì mình đã làm được và hy vọng bài viết này có ích với các bạn . Mình bắt tay vào luôn nhé .

## Step 1 Install Laravel
1. Via Composer Create-Project  **composer create-project --prefer-dist laravel/laravel blog --auth** ở đây chúng ta dùng bản laravel mới nhất 7.x nhé :D .
2. **php artisan key:generate**
3. **php artisan serve**


## Step 2 Migration DB 
1. **php artisan make:migration add_socialite_fields_to_users_table** 
- Ở đây ta nên tạo mới 1 migration và add thêm các field vào bảng user nhé /
 ``` php
     public function up()
        {
            Schema::table('users', function (Blueprint $table) {
                $table->string('provider_name')->nullable()->after('id');
                $table->string('provider_id')->nullable()->after('provider_name');
                $table->string('password')->nullable()->change();
                $table->string('avatar')->nullable();
            });
        }
```
- Tiếp theo ta thay đổi 1 chút trong Model User nhé 
```php
    protected $hidden = [
        'provider_name', 'provider_id', 'password', 'remember_token',
    ];
```
- Mình thêm provider_name và provider_id vào $hidden vì mình không muốn trả lại chúng khi chuyển thể hiện mô hình dưới dạng mảng hoặc JSON do các vấn đề bảo mật .
# Step 3. Install/Configure Laravel Socialite
1. install package Socialite về nhé 
    - **composer require laravel/socialite**.

     2 . Tiếp theo là thêm
   
```php
    'socialite' => [
        'drivers' => [
            'google',
        ],
    ],
```
trong **config/auth.php**
3. giờ ta đên **config/services.php** và ném chỗ này vào 
```php
    'google' => [
        'client_id'     => env('GOOGLE_CLIENT_ID'),
        'client_secret' => env('GOOGLE_CLIENT_SECRET'),
        'redirect'      => env('GOOGLE_REDIRECT'),
    ],
```
4. Tiếp đến là file . env 
```
    GOOGLE_CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com
    GOOGLE_CLIENT_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX
    GOOGLE_REDIRECT=http://yourdomain.com/google/callback
```

> Về phần tạo webaplication trên gg console các bạn có thể tham khảo tại [đây](https://viblo.asia/p/tao-ung-dung-va-thuc-hien-dang-nhap-ung-dungweb-voi-tai-khoan-linkedin-code-vi-du-jvElaEj4lkw) nhé .

## Step 4. Button with Redirect to Google
Trong **app/Http/Controllers/Auth/LoginController.php** ta xử lý như sau:

```php
    use Socialite;

    /**
     * Redirect the user to the provider authentication page.
     *
     * @return \Illuminate\Http\Response
     */
    public function redirectToProvider($driver)
    {
        return Socialite::driver($driver)->redirect();
    }
```

Tiếp đến ta thêm route : 
```php
Route::get('redirect/{driver}', 'Auth\LoginController@redirectToProvider')
    ->name('login.provider')
    ->where('driver', implode('|', config('auth.socialite.drivers')));
```

- Cuối cùng ta add thêm 1 thẻ : 
```php
    <a href="{{ route('login.provider', 'google') }}" 
      class="btn btn-secondary">{{ __('Google Sign in') }}</a>
```
![](https://images.viblo.asia/0062652d-bc82-4124-89b5-2416029c28cd.png)

## Step 5. Callback to Create User
- Khi bạn nhấp vào nút **Google Sign in** và cấp quyền cho tài khoản Google của bạn với tư cách là người dùng, Google sẽ chuyển hướng bạn trở lại cái gọi là URL callback ( hãy nhớ, mình đã cung cấp nó trong .env trong Bước 3 ở trên ). Bây giờ là lúc để thực sự thực hiện nó nhé . 
- Ở bước này,đang tạo một người dùng mới với thông tin đăng nhập Google .
- Ta thêm nó vào **LoginController.php** nhé mình sẽ giải thích ngay ở dưới : 

```php
use App\User;

/**
 * @return \Illuminate\Http\Response
 */
public function handleProviderCallback($driver)
{
    try {
        $user = Socialite::driver($driver)->user();
    } catch (\Exception $e) {
        return redirect()->route('login');
    }

    $existingUser = User::where('email', $user->getEmail())->first();

    if ($existingUser) {
        auth()->login($existingUser, true);
    } else {
        $newUser                    = new User;
        $newUser->provider_name     = $driver;
        $newUser->provider_id       = $user->getId();
        $newUser->name              = $user->getName();
        $newUser->email             = $user->getEmail();
        $newUser->email_verified_at = now();
        $newUser->avatar            = $user->getAvatar();
        $newUser->save();

        auth()->login($newUser, true);
    }

    return redirect($this->redirectPath());
}
```
1. Ta nhận được người dùng từ Socialite, nếu thất bại - chúng tôi chuyển hướng về đăng nhập;
2. Kiểm tra xem người dùng xem email tồn tại chưa , nếu tồn tại rồi  thì login thôi :D;
3. Nếu đó là người dùng mới - ta đăng ký họ và  đăng nhập luôn; 
4. Cuối cùng  chuyển hướng đến trang chủ đã đăng nhập, như hành động Đăng nhập thông thường .
 ![](https://images.viblo.asia/392f739e-783f-4cc0-a036-b9b5c5463903.png)


## Kết thúc 
- Hy vọng bài viết đem lại cho các bạn nhiều điều hay ho . Có gì thắc mắc thì các bạn hãy comment ở dưới nhé . Và đừng quên upvote để mình có động lực với những bài tiếp theo nhé . thanks for read .