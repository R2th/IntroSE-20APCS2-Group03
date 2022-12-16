![](https://images.viblo.asia/1606625f-c063-4c50-8e0f-c746069addc6.png)

Hôm nay mình sẽ hướng dẫn viết API làm chức năng gửi e-mail khi Reset Password với Laravel Passport Authentication

**Bước 1: Chỉnh sửa migration**

Chỉnh sửa file migration `database/migrations/xxx_create_password_resets_table.php` như bên dưới
code:

```php
public function up()
{
    Schema::create('password_resets', function (Blueprint $table) {
        $table->increments('id');
        $table->string('email')->index();
        $table->string('token');
        $table->timestamps();
    });
}
```

**Bước 2: Tạo model Password Reset**

Mở terminal chạy lệnh `php artisan make:model Models/PasswordReset`

Vào file `app/Models/PasswordReset.php` được tạo ra ở command trên, thêm đoạn sau vào

code:
```php
protected $fillable = [
        'email',
        'token',
    ];
```

**Bước 3: Tạo Notifications**

Chúng ta tạo ra file `ResetPasswordRequest` để thông báo gửi mail đến người dùng

Mở terminal chạy lệnh `php artisan make:notification ResetPasswordRequest`

Command trên tạo file `app/Notifications/ResetPasswordRequest.php`, thêm đoạn code sau vào

code:
```php
<?php
namespace App\Notifications;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
class ResetPasswordRequest extends Notification implements ShouldQueue
{
    use Queueable;
    protected $token;
    /**
    * Create a new notification instance.
    *
    * @return void
    */
    public function __construct($token)
    {
        $this->token = $token;
    }
    /**
    * Get the notification's delivery channels.
    *
    * @param  mixed  $notifiable
    * @return array
    */
    public function via($notifiable)
    {
        return ['mail'];
    }
     /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
     public function toMail($notifiable)
     {
        $url = url('reset-password/?token=' . $this->token);
        
        return (new MailMessage)
            ->line('You are receiving this email because we received a password reset request for your account.')
            ->action('Reset Password', url($url))
            ->line('If you did not request a password reset, no further action is required.');
    }
}
```

**Bước 4: Tạo route API**

Chúng ta sẽ tạo các route API, vào `routes/api.php` và thêm đoạn code sau vào
code:
```php
Route::post('reset-password', 'ResetPasswordController@sendMail');
Route::put('reset-password/{token}', 'ResetPasswordController@reset');
```

**Bước 5: Thêm thư viện Carbon**

Chạy lệnh `composer require nesbot/carbon`

**Bước 6: Tạo Controller**

Chạy lệnh `php artisan make:controller ResetPasswordController`

Command trên tạo ra file `app/Http/Controllers/ResetPasswordController.php`, và thêm đoạn code sau vào

code:
```php
<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Str;
use app\Models\User;
use Illuminate\Http\Request;
use App\Models\PasswordReset;
use App\Notifications\ResetPasswordRequest;

class ResetPasswordController extends Controller
{
    /**
     * Create token password reset.
     *
     * @param  ResetPasswordRequest $request
     * @return JsonResponse
     */
    public function sendMail(Request $request)
    {
        $user = User::where('email', $request->email)->firstOrFail();
        $passwordReset = PasswordReset::updateOrCreate([
            'email' => $user->email,
        ], [
            'token' => Str::random(60),
        ]);
        if ($passwordReset) {
            $user->notify(new ResetPasswordRequest($passwordReset->token));
        }
  
        return response()->json([
        'message' => 'We have e-mailed your password reset link!'
        ]);
    }

    public function reset(Request $request, $token)
    {
        $passwordReset = PasswordReset::where('token', $token)->firstOrFail();
        if (Carbon::parse($passwordReset->updated_at)->addMinutes(720)->isPast()) {
            $passwordReset->delete();

            return response()->json([
                'message' => 'This password reset token is invalid.',
            ], 422);
        }
        $user = User::where('email', $passwordReset->email)->firstOrFail();
        $updatePasswordUser = $user->update($request->only('password'));
        $passwordReset->delete();

        return response()->json([
            'success' => $updatePasswordUser,
        ]);
    }
}
```

Thế là mình đã hướng dẫn xong viết API, chạy `php artisan serve` và bật postman lên test thôi :D

**Refer**
* https://medium.com/modulr/api-rest-with-laravel-5-6-passport-authentication-reset-password-part-4-50d27455dcca