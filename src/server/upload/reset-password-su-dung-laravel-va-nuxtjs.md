Bài viết này mình sẽ sử dụng laravel và nuxtjs làm client để reset password.

Mình giả sử bạn đã cài đặt được laravel và nuxtjs rồi

### API laravel

1. Tạo model
Tạo table reset password
```
php artisan make:migration create_resets_password_table
```

với nội dung như sau:

```php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePasswordResetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('password_resets', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email')->index();
            $table->string('token')->index();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('password_resets');
    }
}
```

Bạn cần tạo thêm models PasswordReset.php có nội dung như sau:

```php
<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class PasswordReset extends Model
{
    protected $fillable = [
        'email',
        'token',
    ];
}
```

Tiếp theo cần có một cái notifications để gửi email tới users

Bạn tạo một file ResetPasswordRequest.php trong thư mục `app/Notifications`:
```php
<?php
// app/Notifications/ResetPasswordRequest.php
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
     * @param mixed $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param mixed $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $url = env('APP_FE_URL') . '/reset-password/?token=' . $this->token;

        return (new MailMessage)
            ->line('You are receiving this email because we received a password reset request for your account.')
            ->action('Reset Password', url($url))
            ->line('If you did not request a password reset, no further action is required.');
    }
}
```

> Trong đó phần `APP_FE_URL` chính là domain của nuxtjs của bạn.

Tiếp theo chúng ta cần một controller để xử lý logic của phần reset này, controller này sẽ có 2 hàm là sendMail và resetPassword:

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Api\ResetPasswordValidate;
use Carbon\Carbon;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use App\Http\Models\User;
use Illuminate\Http\Request;
use App\Http\Models\PasswordReset;
use App\Notifications\ResetPasswordRequest;
use Exception;

class ResetPasswordController extends ApiController
{

    const VALID_TOKEN = 60; // 60 minutes

    public function sendMail(ResetPasswordValidate $request)
    {
        try {
            $user = User::where('email', $request->email)->first();
            $passwordReset = PasswordReset::updateOrCreate([
                'email' => $user->email,
            ], [
                'token' => Str::random(60),
            ]);

            if ($passwordReset) {
                $user->notify(new ResetPasswordRequest($passwordReset->token));
            }

            return response()->json([
                'status' => true,
                'message' => __('We have e - mailed your password reset link!')
            ]);
        } catch (Exception $exception) {
            return [
                'status' => false,
                'message' => __('something went wrong!')
            ];
        }
    }

    public function resetPassword(Request $request, $token)
    {
        $passwordReset = PasswordReset::where('token', $token)->first();

        if (!$passwordReset) {
            return response()->json([
                'message' => __('The token is invalid.')
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if (Carbon::parse($passwordReset->updated_at)->addMinutes(self::VALID_TOKEN)->isPast()) {
            $passwordReset->delete();
            return response()->json([
                'message' => 'The token is invalid.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $user = User::where('email', $passwordReset->email)->firstOrFail();
        $user->password = bcrypt($request->get('new_password'));
        $user->save();
        $passwordReset->delete();

        return response()->json([
            'success' => true,
            'message' => __('change password success, please login!')
        ]);
    }
}
```

Trong controller này mình có sử dụng phần ResetPasswordValidate để validate một chút dữ liệu được submit lên từ client:

```php
// app\Http\Requests\Api\ResetPasswordValidate.php
<?php
namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordValidate extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|exists:users,email',
        ];
    }
}
```

Cuối cùng cần thêm vào file api.php đoạn code sau:

```php
Route::post('reset-password', 'ResetPasswordController@sendMail');
Route::post('reset-password/{token}', 'ResetPasswordController@resetPassword');
```

> để API này có thể chạy bạn cần config email trong file .env, nếu chưa có mail server bạn có thể dùng email cá nhân, mật `app password` lên để có thể gửi mail được, tham khảo bật app password của gmail ở đây: https://support.google.com/accounts/answer/185833?hl=en

```
// .env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=gmail@gmail.com
MAIL_PASSWORD=app_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=gmail@gmail.com
MAIL_FROM_NAME="${APP_NAME}"
```

## Client

Phía client mình cần cài 2 thư viện là:
```json
"@nuxtjs/axios": "^5.12.2",
 "vee-validate": "^3.4.5"
```

bạn có thể sửa trực tiếp trong file `package.json` rồi chạy `npm install` để lấy thư viện này về:

Trong thư mục `plugins` bạn thêm 1 file là `vee-validate.js`  với nội dung như sau:

```js
import { extend } from 'vee-validate'
import { email, min, required, max, confirmed } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This field is required'
})

extend('email', {
  ...email,
  message: 'enter the format of the email'
})

extend('min', {
  ...min,
  message: 'Please enter at least 6 characters'
})

extend('max', {
  ...max,
  message: 'Please enter 20 characters or less'
})

extend('confirmed', {
  ...confirmed,
  message: 'please enter same password'
})
```

trong file `nuxt.config.js` thêm một số config như sau:

```js
export default {
...
plugins: [
    '~/plugins/vee-validate.js',
  ],
  
modules: ['@nuxtjs/axios'],
axios: {
    baseURL: process.env.BASE_API_URL
 },
  build: {
    transpile: ['vee-validate/dist/rules']
  }
...
}
```

OK code thôi, phần này mình có sử dụng thêm thư viện bootstrap để css cho nhanh, bạn cần có thể cài thêm nhé:

Bạn tạo một file index.vue trong thưc mục `pages/forget-password` với nội dung như sau:

```vue
<template>
  <main>
    <div class="container">
      <div class="login-form">
        <h2 class="text-center title-login">
          Reset password
        </h2>
        <ValidationObserver v-slot="{ invalid }" ref="form">
          <form @submit.prevent="forgetPassword">
            <div class="form-group">
              <ValidationProvider v-slot="{ errors }" vid="email" rules="required|email">
                <input
                  v-model="userForm.email"
                  type="email"
                  class="form-control"
                  name="email"
                  placeholder="email"
                >
                <span class="form-error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <success :success="success"/>

            <div class="form-group">
              <button type="submit" :disabled="invalid || startSubmit" class="btn btn-success btn-block login-btn">
                Confirm
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </main>
</template>
<script>
import {ValidationObserver, ValidationProvider} from 'vee-validate'
import Success from '@/components/message/success'

export default {
  components: {
    Success,
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      userForm: {
        email: ''
      },
      success: '',
      startSubmit: false
    }
  },
  head: {
    title: 'reset password'
  },

  methods: {
    async forgetPassword() {
      try {
        this.startSubmit = true
        const response = await this.$axios.post('reset-password', this.userForm)
        this.success = response.data.message
      } catch (error) {
        this.$refs.form.setErrors(error.response.data.errors)
      }
    }
  }
}
</script>
```

Tiếp theo cần tạo 1 file index.vue trong thư mục `pages/reset-password` với nội dung như sau:

```vue
<template>
  <main>
    <div class="login-form">
      <h2 class="text-center title-login">
        Enter your new password
      </h2>

      <ValidationObserver v-slot="{ invalid }" ref="form">
        <form @submit.prevent="resetPassword">
          <div class="form-group">
            <ValidationProvider v-slot="{ errors }" vid="new_password" rules="required|min:6">
              <input
                v-model="userForm.new_password"
                type="password"
                class="form-control"
                name="new_password"
                placeholder="new password"
              >
              <span class="form-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <ValidationProvider
              v-slot="{ errors }"
              vid="confirm_new_password"
              rules="required|min:6|confirmed:new_password"
            >
              <input
                v-model="userForm.confirm_new_password"
                type="password"
                class="form-control"
                name="confirm_new_password"
                placeholder="confirm new password"
              >
              <span class="form-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <success :success="success" />
          <error :error="error" />

          <div class="form-group">
            <button type="submit" :disabled="invalid || startSubmit" class="btn btn-success btn-block login-btn">
              Confirm
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </main>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Success from '@/components/message/success'
import Error from '@/components/message/error'

export default {
  components: {
    Error,
    Success,
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      userForm: {
        new_password: '',
        confirm_new_password: ''
      },
      error: '',
      success: '',
      startSubmit: false
    }
  },
  head: {
    title: 'reset password'
  },

  methods: {
    async resetPassword () {
      try {
        this.startSubmit = true
        const response = await this.$axios.post('reset-password/' + this.$route.query.token, this.userForm)
        this.success = response.data.message
      } catch (error) {
        this.error = error.response.data.message
      }
    }
  }
}
</script>
```

ở đây mình có tạo 2 components để hiển thị message lỗi, bạn có thể tham khảo nội dung như sau:

```vue
// components/message/error.vue
<template>
  <div>
    <div v-if="error" class="error text-danger">
      <div class="alert alert-danger">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: {
    error: {
      type: String,
      required: true
    }
  }
}
</script>
```

```vue
// components/message/success.vue
<template>
  <div>
    <div v-if="success" class="error text-success">
      <div class="alert alert-success">
        {{ success }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Success',
  props: {
    success: {
      type: String,
      required: true
    }
  }
}
</script>
```

OK như vậy là xong rồi, chúng ta đã hoàn thành phần reset password từ api đến client. 
Bạn vào phần http://127.0.0.1:3000/forget-password để nhập email rồi submit gửi mail nhé, khi có email thì click vào link trong email để reset pasword


Nếu bạn có thắc mắc nào vui lòng để lại comment phía dưới nhé.

### Tài liệu Tham khảo
- https://viblo.asia/p/reset-password-voi-laravel-passport-authentication-api-rest-V3m5Wbr7lO7
- https://nuxtjs.org/docs/2.x/get-started/installation