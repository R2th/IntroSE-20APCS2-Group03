***Xin chào tất cả mọi người, mình sẽ hướng dẫn mọi người làm chức năng gửi gmail xác thực người dùng bằng mã OTP giống như Facebook bằng Laravel 8x.Bài viết này dành cho người đã từng học qua Laravel cơ bản nên mọi người tự set up project Laravel nhé***

### 1. Tạo mật khẩu ứng dụng trong gmail
**B1**.Đầu tiên bạn hãy đăng nhập vào gmail ấn vào avatar và  vào mục quản lí ứng dụng
![image.png](https://images.viblo.asia/0d0d4232-d86a-41d4-b3aa-cd6e0535ae54.png)

**B2**.Chọn tab bảo mật và chọn mật khẩu ứng dụng

![image.png](https://images.viblo.asia/31c2157a-af75-4694-ae87-a1e52abcda4e.png)

**B3**.Chọn options như sau sẽ giúp bạn đăng nhập gmail mà không cần mật khẩu gốc

![image.png](https://images.viblo.asia/0f154e05-042b-4f4a-8a5d-3c4536ee7da4.png)

Một mật khẩu ứng dụng được sinh ra,chúng ta sẽ dùng mật khẩu này để thay thế cho mật khẩu gốc 

![image.png](https://images.viblo.asia/9c370dda-554c-45cc-a6b3-2d3fb8bdb356.png)
### 2.Cấu hình file mail.php trong folder config và sửa .env
```PHP
'smtp' => [
            'transport' => 'smtp',
            'host' => env('MAIL_HOST', 'smtp.gmail.com'),
            'port' => env('MAIL_PORT', 587),
            'encryption' => env('MAIL_ENCRYPTION', 'tls'),
            'username' => env('MAIL_USERNAME'),
            'password' => env('MAIL_PASSWORD'),
            'timeout' => null,
            'auth_mode' => null,
        ],
```
```PHP
'from' => [
        'address' => env('MAIL_FROM_ADDRESS', 'yourmail@gmail.com'),
        'name' => env('MAIL_FROM_NAME', 'Facebook'),
    ],
```
Ở đây bạn đã cấu hình laravel để gửi mail theo giao thức smtp và ở đoạn code dưới.Bạn đã xác nhận tất cả các thư gửi đi từ ứng dụng này là từ mail của bạn với tên mặc định là Facebook

Tiếp theo ở file env. hãy sửa 2 dòng này với mail là mail của bạn và password là password được tạo từ mật khẩu ứng dụng ở trên
**sửa**
```PHP
MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=yourmail
MAIL_PASSWORD=password
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=null
MAIL_FROM_NAME="${APP_NAME}"
```

**thành**

```PHP
MAIL_USERNAME=yourgmail@gmail.com
MAIL_PASSWORD=yourpass
```

### 3.Tạo database với migration
```PHP
 Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('gender');
            $table->string('url')->default('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjYmlp9JDeNMaFZzw9S3G1dVztGqF_2vq9nA&usqp=CAU&fbclid=IwAR2SQAloFwGL7-bZGs_T9QGN3INYsQXs1krNAuofn0qt7-vjfu-GPgIjYuA');
            $table->string('background_url')->default('https://gamehot24h.com/wp-content/uploads/2019/12/photo-3-15705517650541283685351_1575536037.jpg');
            $table->date('birth');
            $table->string('email')->unique()->default(NULL);
            $table->string('number_phone')->unique()->default(NULL);
            $table->timestamp('email_verified_at')->nullable();
            $table->boolean('confirm');
            $table->string('confirmation_code')->default(NULL);
            $table->dateTime('confirmation_code_expired_in')->default(NULL);
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
```

Ở đây bạn chỉ cần quan tâm tới 3 trường là ***confirm*** là để kiểm tra xem tài khoản đã được xác thực hay chưa hay nói cách khác là người dùng đã nhập OTP xác thực thành công khi nhận đc từ mail chưa,thứ 2 là trường ***confirmation_code*** là đoạn mã nhận được sau khi người dùng đăng ký gmail và ***confirmation_code_expiredin*** là thời gian OTP hết hạn
### 4.Viết api trong file api.php

```PHP
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/re_register', [AuthController::class, 're_register']);
    Route::get('email/verify/{id}',[VerificationController::class,'verify'])->name('verification.verify');
    Route::post('email/verify_OTP',[VerificationController::class,'verify_OTP']);
    Route::post('email/logout_OTP',[VerificationController::class,'logout_OTP']);
```

**/register**: Khi người dùng ấn đăng ký sau khi nhập thông tin từ form

**/re_register**: Khi người dùng ấn gửi lại mã OTP

**/email/verify_OTP**: Sau khi người dùng ấn mã OTP

**/email/logout_OTP**: Hủy đăng ký

![image.png](https://images.viblo.asia/7da36d53-8f17-4a6b-ab39-3f231ffaa2aa.png)
### 5.Tạo VerificationController.php
```PHP
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class VerificationController extends Controller
{
    public function verify_OTP(Request $request)
    {
        $user = User::findOrFail($request->input('user_id'));
        if (!$user) {
            return response()->json(["status" => 400, "message" => "User doenst exist"], 400);
        }
        if (Carbon::now()->gt($user->confirmation_code_expired_in)) {
            return response()->json(["status" => 400, "message" => "Your OTP expired"], 400);
        } else {
            if ($request->input('OTP_token') != $user->confirmation_code) {
                return response()->json(["status" => 400, "message" => "Your OTP is invalid"], 400);
            }
            $user->confirm = true;
            $user->save();
            return response()->json(["status" => 200, "message" => "Succesfully verified"], 200);
        }
    }
    public function logout_OTP(Request $request)
    {
        $user = User::findOrFail($request->input('user_id'));
        if (!$user) {
            return response()->json(["status" => 400, "message" => "User doenst exist"], 400);
        }
        if ($user->confirm == false) {
            $result = $user->delete();
            if ($result)
                return response()->json(["status" => 200, "message" => "Succesfully logout in OTP screen"], 200);
            else {
                return response()->json(["status" => 400, "message" => "Logout failed in OTP screen"], 400);
            }
        }
        return response()->json(["status" => 400, "message" => "Unauthorized"], 400);
    }
}
```
### 5.2 Tạo AuthController.php
```PHP
<?php

namespace App\Http\Controllers;

use App\Mail\UserVerification;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Validator;
use Carbon\Carbon;



class AuthController extends Controller
{
   public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|between:2,100',
            'last_name' => 'required|string|between:2,100',
            'number_phone' => 'string|between:10,20',
            'birth' => 'required|string|between:10,20',
            'gender' => 'required|string',
            'email' => 'required|string|email|max:100',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }
        $user = User::where('email', $request->email)->first();
        if ($user) {
            if ($user['confirm'] == true)
                return response()->json([
                    'message' => 'Email existed',
                ], 401);
            else {
                 return response()->json([
                        'message' => 'This api just use for registering the first time.Please use api re_register to reregister',
                    ], 400);
            }
        }
        $user = User::create(array_merge(
            $validator->validated(),
            [
                'password' => bcrypt($request->password),
                'confirm' => false,
                'confirmation_code' => rand(100000, 999999),
                'confirmation_code_expired_in' => Carbon::now()->addSecond(60)
            ]
        ));
        try {
            Mail::to($user->email)->send(new UserVerification($user));
            return response()->json([
                'message' => 'Registered,verify your email address to login',
                'user' => $user
            ], 201);
        } catch (\Exception $err) {
            $user->delete();
            return response()->json([
                'message' => 'Could not send email verification,please try again',
            ], 500);
        }
        return response()->json([
            'message' => 'Failed to create',
        ], 500);
    }
    public function re_register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:100',
            // 'password' => 'string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }
        $user = User::where('email', $request->email)->first();
        if ($user) {
            if ($user['confirm'] == true)
                return response()->json([
                    'message' => 'Email existed',
                ], 401);
            else {
                $user->confirmation_code = rand(100000, 999999);
                $user->confirmation_code_expired_in = Carbon::now()->addSecond(60);
                $user->save();
                try {
                    Mail::to($user->email)->send(new UserVerification($user));
                    return response()->json([
                        'message' => 'Registered again,verify your email address to login ',
                        'user' => $user
                    ], 201);
                } catch (\Exception $err) {
                    $user->delete();
                    return response()->json([
                        'message' => 'Could not send email verification,please try again',
                    ], 500);
                }
            }
        }
        return response()->json([
            'message' => 'Failed to re_register',
        ], 500);
    }

}
```


Mặc định mã OTP sẽ có 6 số và thời gian hết hạn là 60s hàm re_register để reset lại OTP nhé
### 6.Tạo file markdown

Hãy chạy câu lệnh

```PHP
php artisan make:mail UserVerification
```

trong đó :
```PHP
<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserVerification extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $user;
    public function __construct(User $user)
    {
        $this->user=$user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('email.name')->with(['OTP'=>$this->user->confirmation_code,'OTP_expired'=>$this->user->confirmation_code_expired_in]);
    }
}
```

Ở đây dòng quan trọng nhất nằm ở function build :
```PHP
$this->markdown('email.name')->with(['OTP'=>$this->user->confirmation_code,'OTP_expired'=>$this->user->confirmation_code_expired_in]);
```

email.name là đường dẫn của file markdown khi gửi mail  với thư mục gốc là resources/views và hàm with để truyên mã OTP và expired _time vào file markdown .Ở đây là 

![image.png](https://images.viblo.asia/2ada45fb-93bb-4f44-b3c2-ed80df7df8c2.png)


Ở trong file resources/views/name.blade.php:

```PHP
@component('mail::message')
# New generation

The body of your message.<br>
Welcome {{$user->last_name}}<br>
Your OTP is <strong style="color:'blue'">{{$OTP}}</strong>  will be expired for 60 seconds
@component('mail::button')
Button Text
@endcomponent

Thanks,<br>
<strong style="color:'red'">Huy Tú and Mai Lâm</strong>
@endcomponent
```
File này sử dụng template của laravel nếu muốn sửa lại bạn hãy sử dụng php blade như thường nhé
### 7.Hưởng thụ thành quả nào
Phù !!,quả là vất vả đúng không nào giờ chúng ta sẽ sử dụng Postman để test xem sao nhé

![image.png](https://images.viblo.asia/50fd6aff-874e-4369-85d0-1e96765dbfa7.png)

![image.png](https://images.viblo.asia/3098562e-b9e3-41fd-a365-d1982bc4e661.png)


-----

###  Cảm ơn các bạn đã đọc đến đây.Sau bài viết này mình sẽ hướng dẫn các bạn làm thêm chức năng đăng nhập xác thực người dùng với JWT Laravel nhé