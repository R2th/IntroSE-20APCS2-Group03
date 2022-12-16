<div align="center">
    
# Lời nói đầu
</div>

Trong xã hội số hiện nay, phần lớn các sản phẩm đều cần định danh khách hàng để có thể dễ dàng kiểm tra được tình hình phát triển của sản phẩm, từ đó đưa ra các chiến lược marketing, phát triển phù hợp. Và cách duy nhất để làm được điều đó chính là yêu cầu người dùng đăng kí tài khoản, bằng cách cung cấp thêm nhiều tính năng chỉ User có mà Guest không có (ví dụ như Viblo, nếu bạn muốn, comment/upvote cho 1 bài viết hay đặt câu hỏi nhờ mọi người trợ giúp, bạn bắt buộc phải đăng kí tài khoản trên Viblo).

Tuy nhiên điều này lại gây ra một vấn đề đó là khi một người sử dụng nhiều phần mềm/website thì họ sẽ cần đăng kí tài khoản nhiều lần gây phiền toái. Để giải quyết vấn đề này, ngoài phương thức đăng nhập tài khoản truyền thống kia thì đăng nhập qua **SNS (Social Network Service)** là một lựa chọn tuyệt vời, khi mà ngày nay mỗi người đều sở hữu cho mình ít nhất 1 tài khoản SNS (Facebook, Google, Twitter, ...)

Và trong bài viết này, chúng ta sẽ cùng tìm hiểu cách đăng nhập qua Google trong một project Laravel thông qua [Laravel Socialite](https://laravel.com/docs/8.x/socialite) nhé!

<div align="center">
    
# Nội dung
</div>

Để làm được chức năng này, chúng ta cần thực hiện 2 việc:
+ 1 là tạo một application trên [Google](https://console.cloud.google.com/projectselector2/apis/library)
+ 2 là code xử lí trong project 

<div align="center">
    
## Tạo application Google

(phần này để dễ cho các bạn nhất thì mình sẽ để hơi nhiều ảnh, kiểu step by step, các bạn thông cảm nha)    

</div>

- Giao diện tạo project google
 
![](https://images.viblo.asia/88ed1cbc-4bba-4860-be8b-e28001c25725.png)

- Trong màn hình quản lí project, chọn `APIs & Services -> Credentials` từ sidebar

![](https://images.viblo.asia/19bdbb2d-80a5-4df8-9bb2-9923bbbdf83a.png)

- Từ màn hình `Credentials`, chọn `Create credentials -> OAuth client ID`

![](https://images.viblo.asia/c1251e86-ca17-4a53-abc0-23b9c7c805cb.png)

- Để tạo OAuth CLIENT ID, bạn sẽ phải tạo product trong màn `OAuth consent screen` như bên dưới:

    ![](https://images.viblo.asia/7e9dcfa6-0596-4395-ae76-a7d584d6c6b5.png)

    - Thiết lập scopes: 

    ![](https://images.viblo.asia/529d6f9e-f3b2-44a4-871e-f613158bc33b.png)

    - Thêm/sửa danh sách user test
    
    ![](https://images.viblo.asia/a380b20a-4ce8-4032-8e8d-a9b5c08d6c88.png)

    - Bước cuối cùng

    ![](https://images.viblo.asia/8d36ea9a-d36e-494a-b950-ba1c742085cb.png)

    
- Và sau 7749 bước râu ria, giờ thì chúng ta đã có thể tạo client ID, ở phần `Application type` thì chọn Web application và để ý cái chỗ `Authorized redirect URIs` nhé

![](https://images.viblo.asia/4a8bdf64-8015-48dd-b649-22a0b1b5924a.png)


- Giờ thì bạn đã có được client ID và secret cho riêng mình rồi, lưu lại để dùng ở bước tiếp theo nhé (2 ô đấy trắng là do mình xóa đi đấy, ko phải lỗi đâu, bạn có id và secret của bạn rồi, còn cần của mình nữa làm gì dúng không :laughing::laughing::laughing::laughing:)

![](https://images.viblo.asia/c90c74a4-cce5-4313-a57e-ecc98ae52e4b.png)


<div align="center">
    
## Code Laravel
</div>

### Bước 1: sửa đổi trong database

- Ở đây mình sẽ làm theo hướng đơn giản là 1 account trên hệ thống chỉ tương ứng với 1 social account (tức là bạn login qua google và login qua facebook thì sẽ tạo thành 2 account khác nhau). Với trường hợp này chúng ta chỉ cần thêm 2 trường là `social_provider` và `social_id` vào trong bảng `users`
    ```add_social_column_to_users_table.php
     public function up()
       {
           Schema::table('users', function (Blueprint $table) {
               $table->string('social_provider')->default('google'); //ở đây mình đặt default là google luôn, các bạn có thể bỏ hoặc đặt là cái khác tùy vào project của bạn
               $table->string('social_id')->nullable()->after('social_provider');
           });
       }
    ```

- Còn nếu bạn muốn 1 account trên hệ thống có thể liên kết nhiều social account (dù bạn login google hay facebook hay tk mạng xã hội nào đi nữa thì vẫn vào 1 account của bạn) thì bạn sẽ cần phải thêm 1 bảng `social_accounts` (liên kết `users` - `social_accounts` là liên kết `1-n`). Cấu trúc của bảng `social_accounts` thì cũng tương tự như trên, có trường `social_provider`, `social_id` và thêm `user_id` để liên kết với bảng `users` (hướng làm là như thế các bạn tự triển khai nhé, mình lười lắm :D :D :D :D)

### Bước 2: cấu hình Socialite

- Trước hết bạn sẽ phải cài đặt Socialite vào trong project của mình thông qua câu lệnh:
    ```bash
    composer require laravel/socialite
    ```

- Sau khi chạy câu lệnh phía trên kia xong thì bạn sẽ cần phải tiến hành config trong file `config/services.php` và `config/auth.php`  như sau: 
    ```services.php
    //có rất nhiều key ứng vs các mạng xã hội mà  bạn có thể sử dụng là facebook, twitter, linkedin, google, github, gitlab, bitbucket, ...
    'google' => [
        'client_id'     => env('GOOGLE_CLIENT_ID'),
        'client_secret' => env('GOOGLE_CLIENT_SECRET'),
        'redirect'      => env('GOOGLE_REDIRECT'),
    ],
    ```
    
    ```auth.php
     'socialite' => [
        'drivers' => [
            'google',
        ],
    ],
    ```
    
- Tiếp theo là thêm GOOGLE CLIENT ID và SECRET vào trong file `.env`
    ```.env
    (ở đây điền ID và secret key mà bạn đã lấy khi tạo app ở trên nhé)
    GOOGLE_CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    GOOGLE_CLIENT_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX
    GOOGLE_REDIRECT=https://localhost:8000/social/google/callback
    ```

### Bước 3: Logic login
- Đầu tiên thì tạo 2 controller là `SocialLogin` và `SocialLoginCallback` (hoặc viết chung 2 function vào trong 1 controller cũng được, ở đây mình THÍCH tách ra 2 cái cho rõ ràng)
    ```SocialLogin.php
    <?php

    namespace App\Http\Controllers\Auth;

    use App\Http\Controllers\Controller;
    use Illuminate\Http\Request;
    use Laravel\Socialite\Facades\Socialite;
    use Session;

    class SocialLogin extends Controller
    {
        /**
         * Handle the incoming request.
         *
         * @param  \Illuminate\Http\Request  $request
         * @return \Illuminate\Http\Response
         */
        public function __invoke()
        {
            return Socialite::driver('google')->redirect();
        }
    }
    ```

    ```SocialLoginCallback.php
    <?php

    namespace App\Http\Controllers\Auth;

    use App\Http\Controllers\Controller;
    use App\Models\User;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Auth;
    use Laravel\Socialite\Facades\Socialite;
    use Session;

    class SocialLoginCallback extends Controller
    {
        /**
         * Handle the incoming request.
         *
         * @param  \Illuminate\Http\Request  $request
         * @return \Illuminate\Http\Response
         */
        public function __invoke(Request $request)
        {
            $socialiteProfile = Socialite::driver('google')->user();
            $user = User::where('email', $socialiteProfile->email)->first();
            //lấy thông tin username, email, avatar, social_id để lưu vào bảng users (nếu bạn cần thêm thông tin gì thì có thể lấy thêm)
            $data = [
                'name' => $socialiteProfile->name,
                'email' => $socialiteProfile->email,
                'avatar_url' => optional($user)->avatar_url ? $user->avatar_url : $socialiteProfile->avatar,
                'socialite_id' => $socialiteProfile->id,
            ];
            $user = User::updateOrCreate(['email' => $socialiteProfile->email], $data);
            Auth::login($user, true);

            return redirect();
        }
    }
    ```

- Thêm routes ứng với 2 controller phía trên vào trong `routes/web.php`
    ```web.php
    Route::namespace('Auth')->group(function () {
        Route::get('social/{provider}', 'SocialLogin')->name(`social.login`);
        Route::get('social/{provider}/callback', 'SocialLoginCallback');
    })
    ```

- Bước cuối cùng, trên giao diện login, thêm 1 nút Login via Google là xong. Chúc các bạn thành công!
    ```php
    <a href="{{ route('social.login', 'google') }}" 
        class="btn btn-secondary">{{ __('Login via Google') }}
    </a>
    ```


<div align="center">
    
# Lời kết
</div>

- Mong rằng bài viết đã cung cấp cho các bạn thông tin hữu ích và các bạn có thể thực hiện thành công chức năng login social nói chung cũng như là google nói riêng. 
- Nếu có vấn đề gì trong quá trình làm theo bài viết, hãy comment xuống dưới để mình có thể hỗ trợ các bạn một cách tốt nhất hoặc có thể [đặt câu hỏi](https://viblo.asia/questions/ask) để được nhiều người hỗ trợ hơn nhé!

<div align="center">
    
# Tài liệu tham khảo
</div>

+ Laravel document: https://laravel.com/docs/8.x/socialite
+ Github: https://github.com/laravel/socialite