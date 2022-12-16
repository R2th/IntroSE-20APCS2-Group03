Xin chào các bạn lại là mình đây, như các bạn biết đấy nhiều các trang web hay hệ thống bây giờ việc đăng nhập bằng cách nhập tài khoản và mật khẩu rất là mất công, nếu hệ thống có mỗi 2 bước là nhập tài khoản và mật khẩu thì lại kém bảo mật, mà lại cho mấy bước xác thực nữa thì lại người dùng lại mất công. Vì vậy hầu hết bây giờ chúng ta thấy các website hay thiết kế login bằng cách thông qua một bên thứ 3 như Facebook, Google, Twister, Github,... Cơ chế bảo mật của các bên thứ 3 nay vô cùng là bảo mật, nên chúng ta vô cùng yên tâm. Vậy bài viết hôm nay mình sẽ chia sẻ đến mọi người cách đăng nhập bằng bên thứ 3. Vậy đầu tiên chúng mình sẽ đi tim hiểu Laravel Socialite là gì nhé. Vì công cụ này rất hữu ích cho chúng ta khi làm việc với Laravel.

![](https://images.viblo.asia/d6ad8516-7102-451f-b814-38d6b0b17355.png)

# 1. Cài đặt Laravel Socialite
Đầu tiên các bạn cài đặt Laravel Socialite như sau 
```
composer require laravel/socialite
```
Sau đó chúng mình sẽ config một chút nhé trong `config/services`, chúng ta sẽ thêm vào mảng như sau:
```PHP
'google' => [
        'client_id' => env('GOOGLE_CLIENT_ID'),
        'client_secret' => env('GOOGLE_CLIENT_SECRET'),
        'redirect' => env('GOOGLE_REDIRECT_URI', env('APP_URL')) . '/social/google/callback',
    ],
```

Trong file `.env` các bạn cũng phải thêm các config nhé 
```PHP
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
```

Thông số `GOOGLE_CLIENT_ID` và `GOOGLE_CLIENT_SECRET` mình sẽ hướng dẫn các bạn lấy ở phần tiếp theo nhé.
# 2. Đăng nhập bằng GSuite
Sau khi các bạn cài đặt và config như ở phần 1 rồi các bạn sẽ tạo route và controller nhé. Các bạn phải tạo 2 route tương ứng với 2 controller nhé, 1 cái sẽ gọi và xác thực ở bên thứ 3, một cái là sẽ trả và nhận kết quả thông tin mà Google trả về cho mình như name, email, avatar, ...  Trước hết chúng mình phải tạo migration đã nhé
```PHP
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('socialite_id');
            $table->integer('socialite_provider');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('avatar');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}

```
Sau đó chúng ta tạo tiếp đến Route trong web.php
```PHP
Route::namespace('Auth')->group(function () {
    Route::get('social/{provider}', 'SocialLogin');
    Route::get('social/{provider}/callback', 'SocialLoginCallback');
});
```
`SocialLogin` là controller dùng để gọi sang bên thứ 3 để xác thực
```PHP
<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class SocialLogin extends Controller
{
    public function __invoke()
    {
        return Socialite::driver('google')->with(['prompt' => 'select_account'])->redirect();
    }
}

```

`SocialLoginCallback` là controller dùng để nhận callback khi công việc xác thực ở bên thứ 3 xong rồi, đây là nơi để nhận thông tin của user.
```PHP
<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Enums\UserType;

class SocialLoginCallback extends Controller
{
    public function __invoke(Request $request)
    {
        $socialiteProfile = Socialite::driver('google')->user();

        $user = User::where('email', $socialiteProfile->email)->first();

        $data = [
            'name' => $socialiteProfile->name,
            'email' => $socialiteProfile->email,
            'avatar' => $socialiteProfile->avatar,
            'socialite_id' => $socialiteProfile->id,
            'socialite_provider' => 'google'
            'role' => 'user',
        ];

        if (!$user) {
            User::create($data);
        } else {
            $user->update($data);
        }


        Auth::login($user, 1);

        return redirect('home');
    }
}
```
Ở đây như các bạn đã biết đấy, khi dữ liệu trả về chúng ta sẽ xem là email đang xác thực có trong hệ thống của mình hay chưa nếu có rồi thi cập nhật những thông tin mới nhất từ Gsuite về như avatar, name,... Còn nếu email chưa có trong hệ thống của chúng ta thì sẽ tạo mới. Đơn giản đúng không nào các bạn.

Như mình đã đề cập trước đấy, làm thế nào để lấy google nó biết để nó đẩy data về đúng cái đường dẫn callback của mình. Chúng mình phải config đường dẫn config trên GSuite nhé. Phần tiếp theo mình sẽ hướng dẫn các bạn config trên Google Console của Google.
# 3. Config Google Console
Các bạn vào [Google Console](https://console.developers.google.com/projectselector2/apis/library?supportedpurview=project) và làm theo hướng dẫn của mình như sau: 
Các bạn vào giao diện trên và ấn **CREATE A PROJECT**
![](https://images.viblo.asia/bddb1820-dcee-4707-a7f8-00b5cad7b868.png)
![](https://images.viblo.asia/4b455405-758b-42eb-87bf-923d5783cc36.png)
Sau đó các bạn ấn Dashboard nhé
![](https://images.viblo.asia/dcbe2685-0403-459e-8f4e-3209abbf0eda.png)
Rồi tiếp đó click vào **OAuth Client ID**
![](https://images.viblo.asia/922f1825-6dfa-4d42-af82-ed4e9daf0932.png)
Nếu các bạn thấy hiện ra giao diện này thì các bạn phải quay về phía trước và ấn **CONFIG THE AUTHORATION SCREEN**
![](https://images.viblo.asia/11db4284-b451-476c-9ef2-16ed62a8a9f4.png)
Khi ấn chúng ta sẽ ra được giao diện như dưới đây
![](https://images.viblo.asia/29dc342a-c60a-4264-bf00-3680dbcc06d4.png)
![](https://images.viblo.asia/8d90c714-5105-4a54-900f-16518418771d.png)
Cuối cùng khi chúng ta hoàn tất thì chúng ta sẽ lấy được `GOOGLE_CLIENT_ID` và `GOOGLE_CLIENT_SECRET`
![](https://images.viblo.asia/6591a013-0ae9-4c46-92c2-97b4c403ba2e.png)
Rồi chúng ta copy và paste chúng vào file .env nhé

# 4. Tổng kết
Vậy qua đó mình đã chia sẻ cho các bạn về Laravel Socialite và cách login bằng GSuite, mong rằng nó sẽ giúp ích cho các bạn trong các dự án nhé. Cảm ơn các bạn đã đã đọc bài viết của mình.
# 5. Tham khảo
https://laravel.com/docs/7.x/socialite