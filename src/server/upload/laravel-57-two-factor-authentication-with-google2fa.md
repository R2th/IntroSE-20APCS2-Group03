![](https://images.viblo.asia/74f87eac-5c6f-4305-bbf0-bca22db91220.png)
- Là một trong những công ty hàng đầu trong lĩnh vực CNTT nên cty mình rất quan tâm và chú trọng đến security. Vì vậy gần đây cty mình đã quyết định thực hiện việc yêu cầu bật xác thực 2 lớp (Two factor authentication) cho toàn bộ tài khoản Github và Gsuite.
- Và mình cũng nhận ra rằng đây ra việc rất cần thiết nhằm bảo vệ tài khoản của chính bạn, bảo vệ tài sản cty, đồng thời tạo dựng niềm tin nơi khách hàng. Nếu bạn muốn bật xác thực 2 lớp có thể thực hiện theo hướng sau nhé:
    - Github: https://help.github.com/articles/securing-your-account-with-two-factor-authentication-2fa/
    - Gsuite: https://support.google.com/accounts/answer/185839?co=GENIE.Platform%3DDesktop&hl=en
- Chính vì vậy mình nảy sinh ra ý tưởng thêm xác thực 2 lớp sử dụng [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=vi) vào các dự án hiện tại của mình. Cụ thể ở đây là project sử dụng laravel 5.7

## **I. Tạo project Laravel** 
- Ta sử dụng phiên bản laravel 5.7 mới nhất tại thời điểm viết bài.
- Bước 1: Tạo project laravel bằng 1 trong 2 lệnh sau: `laravel new google2fa-laravel` hoặc `composer create-project google2fa-laravel`
- Bước 2: Set quyền ghi cho thư mục **storage** và **cache**
    ```
    sudo chmod -R 777 laravel-2fa/storage laravel-2fa/bootstrap/cache
    ```
- Bước 3: Sửa cấu hình kết nối database trong file **.env**:
    ```
    # .env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=google2fa
    DB_USERNAME=root
    DB_PASSWORD=root
    ```
    - Và chạy lệnh `php artisan migrate` để tạo database.
- Bước 4: Chạy lệnh `php artisan make:auth` để tạo mẫu signup, login, logout.
- Đến đây bạn có thể chạy thử server với câu lệnh:
    ```
    php artisan serve --port=8000
    ```
    - Và xem kết quả tại `http://localhost:8000`
## **II. Tạo và hiển thị Secret**
- Cài đặt `google2fa-laravel` và `bacon-qr-code` bằng composer:
    ```
    composer require pragmarx/google2fa-laravel
    composer require bacon/bacon-qr-code 1.0.3
    ```
    - Lưu ý ở đây ta dùng `bacon-qr-code` bản 1.0.3 vì bản 2.* hiện tại đang gặp lỗi `Class 'BaconQrCode\Renderer\Image\Png' not found`
- Sau khi chạy xong ta sẽ thấy package được thêm vào file **composer.json** như sau:
    ```JSON
    ...
    "require": {
        "php": "^7.1.3",
        "bacon/bacon-qr-code": "1.0.3",
        "fideloper/proxy": "^4.0",
        "laravel/framework": "5.7.*",
        "laravel/tinker": "^1.0",
        "pragmarx/google2fa-laravel": "^0.2.0"
    },
    ....
    ```
- Tạo file config **google2fa.php** bằng câu lệnh:
    ```
    php artisan vendor:publish --provider=PragmaRX\\Google2FALaravel\\ServiceProvider
    ```
- Thêm cột `google2fa_secret` kiểu text vào bảng `users`: `php artisan make:migration add_google2fa_column_to_users --table=users`
    ```PHP
    use Illuminate\Support\Facades\Schema;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Database\Migrations\Migration;

    class AddGoogle2faColumnToUsers extends Migration
    {
        /**
         * Run the migrations.
         *
         * @return void
         */
        public function up()
        {
            Schema::table('users', function (Blueprint $table) {
                $table->text('google2fa_secret');
            });
        }

        /**
         * Reverse the migrations.
         *
         * @return void
         */
        public function down()
        {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('google2fa_secret');
            });
        }
    }
    ```
    - Và chạy lệnh sau để thêm cột vào bảng:
    ```
    php artisan migrate
    ```
- Cập nhật model *User*:
    ```PHP
    // app/User.php
    
    protected $fillable = [
        'name', 'email', 'password', 'google2fa_secret',
    ];

    protected $hidden = [
        'password', 'remember_token', 'google2fa_secret',
    ];

    public function setGoogle2faSecretAttribute($value)
    {
         $this->attributes['google2fa_secret'] = encrypt($value);
    }
    
    public function getGoogle2faSecretAttribute($value)
    {
        return decrypt($value);
    }
    ```
- Tiếp theo ta sẽ định nghĩa phương thức `register`  và `completeRegistration` trong class `RegisterController`:
    ```PHP
    // app/Http/Controllers/Auth/RegisterController.php
    use Illuminate\Http\Request;

    ...
    
    use RegistersUsers {
     // change the name of the name of the trait's method in this class
     // so it does not clash with our own register method
        register as registration;
    }
    
    ...
    
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'google2fa_secret' => $data['google2fa_secret'],
        ]);
    }
    
    public function register(Request $request)
    {
        //Validate the incoming request using the already included validator method
        $this->validator($request->all())->validate();

        // Initialise the 2FA class
        $google2fa = app('pragmarx.google2fa');

        // Save the registration data in an array
        $registrationData = $request->all();

        // Add the secret key to the registration data
        $registrationData['google2fa_secret'] = $google2fa->generateSecretKey();

        // Save the registration data to the user session for just the next request
        $request->session()->flash('registration_data', $registrationData);

        // Generate the QR image. This is the image the user will scan with their app
        // to set up two factor authentication
        $qrImage = $google2fa->getQRCodeInline(
            config('app.name'),
            $registrationData['email'],
            $registrationData['google2fa_secret']
        );

        // Pass the QR barcode image to our view
        return view('google2fa.register', ['qrImage' => $qrImage, 'secret' => $registrationData['google2fa_secret']]);
    }
    
    public function completeRegistration(Request $request)
    {
        // add the session data back to the request input
        $request->merge(session('registration_data'));

        // Call the default laravel authentication
        return $this->registration($request);
    }
    ```
- Thêm route để để gọi đến phương thức register mặc định của laravel
    ```PHP
    // routes/web.php 

    Route::get('/complete-registration', 'Auth\RegisterController@completeRegistration');
    ```
- Ta sẽ tạo view **register.blade.php** để hiển thị QR code trong thư mục **resources/views/google2fa/**:
    ```HTML
    @extends('layouts.app')

    @section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading">Set up Google Authenticator</div>

                    <div class="panel-body" style="text-align: center;">
                        <p>Set up your two factor authentication by scanning the barcode below. Alternatively, you can use the code {{ $secret }}</p>
                        <div>
                            <img src="{{ $qrImage }}">
                        </div>
                        <p>You must set up your Google Authenticator app before continuing. You will be unable to login otherwise</p>
                        <div>
                            <a href="/complete-registration"><button class="btn-primary">Complete Registration</button></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @endsection
    ```
- Kết quả sau khi bạn nhập thông tin và bấm nút Register sẽ hiển thị màn hình QR code như bên dưới:
    ![](https://images.viblo.asia/1afdf166-789f-4dbd-9cdf-8be49e540241.png)
- Bạn nhớ tại ửng dụng `Authenticator` có sẵn trên google play và app store về điện thoại để quét mã QR code nhé. Kết quả quét của mình sẽ như sau:

![](https://images.viblo.asia/d8421d5f-5ddf-4ff2-b0c2-86ed87027487.PNG)
## **III. Xác thực 2 lớp khi đăng nhập**
- Ta cần thêm middleware vào file **app/Http/Kernel.php** như sau:
    ```PHP
    ...
    // app/Http/Kernel.php

    protected $routeMiddleware = [
        ...
        '2fa' => \PragmaRX\Google2FALaravel\Middleware::class,
    ];
    ...
    ```
- Và tạo view để nhập mã code từ ứng dụng Authenticator:
    ```HTML
    @extends('layouts.app')

    @section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading">Register</div>

                    <div class="panel-body">
                        <form class="form-horizontal" method="POST" action="{{ route('2fa') }}">
                            {{ csrf_field() }}

                            <div class="form-group">
                                <label for="one_time_password" class="col-md-4 control-label">One Time Password</label>

                                <div class="col-md-6">
                                    <input id="one_time_password" type="number" class="form-control" name="one_time_password" required autofocus>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-md-6 col-md-offset-4">
                                    <button type="submit" class="btn btn-primary">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @endsection
    ```
- Update file **routes/web.php**:
    ```PHP
    // routes/web.php

    Route::post('/2fa', function () {
        return redirect(URL()->previous());
    })->name('2fa')->middleware('2fa');
    ```

- Cuối cùng ta cần sửa `HomeController` để mỗi lần login là phải nhập code xác thực 2 bước:
    ```PHP
    // app/Http/Controllers/HomeController.php

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['auth', '2fa']);
    }
    ```
- Và kết quả thu được:
    ![](https://images.viblo.asia/556fe5e1-c7f8-4ac6-8ccd-8c341d4769e0.png)
- Đây là link source code mình thực hiện thành công: https://github.com/Giangnv2014/google2fa-laravel
- Nếu có bất cứ khó khăn gì có thể liên hệ trực tiếp với mình hoặc tham khảo tài liệu bên dưới.

    
    > **Tài liệu tham khảo**
    > 
    > [Google2FA Package](https://packagist.org/packages/pragmarx/google2fa-laravel)
    >
    > [How to Add Google's Two Factor Authentication to Laravel](https://scotch.io/tutorials/how-to-add-googles-two-factor-authentication-to-laravel)
    > 
    > [Two Factor Authentication in Laravel 5 with Google2FA](https://www.5balloons.info/two-factor-authentication-google2fa-laravel-5/)