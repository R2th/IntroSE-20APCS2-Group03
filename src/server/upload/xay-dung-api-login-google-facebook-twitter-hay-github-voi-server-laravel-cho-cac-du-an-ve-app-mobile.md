### Lời nói đầu
Trong những năm gần đây, sự thông dụng của smartphone cũng làm ngành Lập trình phát triển ứng dụng di động (Mobile Application Development) có những bước tiến lớn. Ngày càng nhiều các ứng dụng mobile app được ra đời cùng với sự tiện ích hơn, dễ sử dụng hơn (đăng nhập thuận tiện hơn, giao diện dễ dùng, tốc độ nhanh hơn,...)

![](https://images.viblo.asia/d68d9592-4139-43b8-9f05-7067cdc3a9e7.jpg)

### Cách các app đăng nhập

May mắn cho mình cũng được làm việc trong team phát triển app mobile với vai trò là backend developer. Tuy nhiên vấn đề chính mà mình đang hướng đến tại đây là *"Xây dựng API login Google, Facebook, Twitter hay Github với server laravel cho các dự án về App Mobile"*. Với việc đăng nhập bằng Google, Facebook, Twitter hay Github, ... bạn sẽ không phải mất thời gian làm công đoạn đăng ký phức tạp, nhập 1 đống input thông tin, rồi còn phải chờ email để active tài khoản bla...bla như trước đây nữa. Để đăng nhập vào app chỉ cần chọn mạng xã hội mà bạn muốn đăng nhập. Ví dụ bạn muốn kết nối với mạng xã hội Facebook chẳng hạn. Bấm vào icon Facebook rồi đồng ý chuyển hướng đến trang đăng nhập của facebook

![](https://images.viblo.asia/7b09ef97-c2da-44d1-b2b0-3261eaa1d2a9.png)

Sau khi đăng nhập thành công thì cũng đồng nghĩa bạn đã đăng nhập thành công vào ứng dụng. :hugs:

### Ý tưởng đăng nhập cho app và server
- Bên app sẽ setup package **Facebook SDK** , **Google SDK**. Các package đều hỗ trợ cho hệ điều hành Android và Ios
    * Facebook: https://developers.facebook.com/docs/ios/ và https://developers.facebook.com/docs/android/
    * Google: https://developers.google.com/identity/sign-in/android/start và https://developers.google.com/identity/sign-in/ios/start
 - Sau khi bên app cài đặt và sử dụng các package cho các mạng xã hội. Tiến hành đăng nhập tại app, response trả về sẽ gồm có: **access_token**, **profile user**, .... Nhưng cái quan trọng nhất mà bên server cần ở đây chỉ là **access_token**.
 - Bên server viết 1api authentication cho app và yêu cầu 1 request từ bên app là **access_token** mà bên app vừa nhận được ở trên. Tại server sẽ gửi lại 1 request lên trên facebook, google,... để xác định đúng phiên đăng nhập cũng như lấy lại thông tin user từ các mạng xã hội. Sau đó sẽ check email (facebook, google) xem email này đã được đăng ký từ hệ thống chưa. Nếu đăng ký rồi => tự động đăng nhập app, nếu chưa tồn tại, tự động đăng ký cho user dựa vào thông tin nhận được từ mạng xã hội (tên, avatar,...).
### Xây dựng API
- **Chuẩn bị:** 
    -  Laravel Passport: https://laravel.com/docs/5.7/passport
    -  GuzzleHttp: http://docs.guzzlephp.org/en/stable/
    -  OAuth: 
        -  Facebook: https://developers.facebook.com/docs/graph-api/using-graph-api
        -  Google: https://developers.google.com/identity/protocols/OAuth2InstalledApp
      
     .....
 - **Xây dựng API**
     - Cài đặt Laravel Passport:
     ```bash
     composer require laravel/passport
    ```
    Sau khi tải laravel/passport về project trong migration sẽ tạo các table của nó, nên chúng ta hãy tiếp tục chạy  `migrate` để thêm vào database.
    
    ```
    php artisan migrate
    ```
    Tiếp theo chúng ta cần chạy command `passport:install`, command  này sẽ tạo một encryption keys dùng để bảo mật cho access token. Nó sẽ tạo ra "personal access" and "password grant" clients là 2 lựa chọn cho bảo mật access token.
    ```
    php artisan passport:install
    ```
    Trong Models User thêm như bên dưới.
    ```php
    <?php

    namespace App;

    use Laravel\Passport\HasApiTokens;
    use Illuminate\Notifications\Notifiable;
    use Illuminate\Foundation\Auth\User as Authenticatable;

    class User extends Authenticatable
    {
        use HasApiTokens, Notifiable;
    }
    ```
    Trong `config/auth.php` sửa lại driver api là `passport`.
    
    ```php
        'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'api' => [
            'driver' => 'passport',
            'provider' => 'users',
        ],
    ],
    ```
    Dưới đây sẽ là function login của chúng ta. Request nhận vào chính là access_token và provider chúng ta cũng có thể gửi thẳng qua url cũng được.
    ```php
        /**
         * @param  $provider
         * @param  \Illuminate\Http\Request  $request
         * @return \Illuminate\Http\JsonResponse
         */
        public function login(Request $request, $provider)
        {
            if ($provider == 'google') {
                return $this->checkGoogle($request->social_token);
            }

            if ($provider == 'facebook') {
                return $this->checkFacebook($request->social_token);
            }
        }
    ```
    Đăng nhập với google, server sẽ gửi 1 request ứng với access_token của nó và lấy ra profile của user.
    ```php
        /**
         * @param String $social_token
         * @return void
         */
        public function checkGoogle($social_token)
        {
            try {
                $checkToken = $this->client->get("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=$social_token");
                $responseGoogle = json_decode($checkToken->getBody()->getContents(), true);

                return $this->checkUserByEmail($responseGoogle);
            } catch (\Exception $e) {
                return $this->responseBadRequest(['message' => $e->getMessage()]);
            }
        }
    ```
    Tương tự facebook cũng vậy, nó cũng trả về các thông tin mà ta cần.
    ```php
        /**
         * @param String $social_token
         * @return void
         */
        public function checkFacebook($social_token)
        {
            try {
                $checkToken = $this->client->get("https://graph.facebook.com/v3.1/me?fields=id,name,email&access_token=$social_token");
                $responseFacebook = json_decode($checkToken->getBody()->getContents(), true);

                return $this->checkUserByEmail($responseFacebook);
            } catch (\Exception $e) {
                return $this->responseBadRequest(['message' => $e->getMessage()]);
            }
        }
    ```
    Sau khi lấy được profile của user trên các mạng xã hội, việc còn lại là kiểm tra xem email của user đã được đăng ký tại hệ thống của chúng ta chưa.
    
    **Tổng kết:**
    
    ```php
    <?php

    namespace App\Http\Controllers\Api\Auth;

    use App\Models\User;
    use Illuminate\Http\Request;
    use App\Http\Controllers\Controller;
    use Illuminate\Support\Facades\Auth;
    use Carbon\Carbon;
    use GuzzleHttp\Client;

    class SocialsController extends Controller
    {
        public function __construct()
        {
            $this->client = new Client();
        }

        /**
         * @param  $provider
         * @param  \Illuminate\Http\Request  $request
         * @return \Illuminate\Http\JsonResponse
         */
        public function login(Request $request, $provider)
        {
            if ($provider == 'google') {
                return $this->checkGoogle($request->social_token);
            }

            if ($provider == 'facebook') {
                return $this->checkFacebook($request->social_token);
            }

        }

        /**
         * @param String $social_token
         * @return void
         */
        public function checkGoogle($social_token)
        {
            try {
                $checkToken = $this->client->get("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=$social_token");
                $responseGoogle = json_decode($checkToken->getBody()->getContents(), true);

                return $this->checkUserByEmail($responseGoogle);
            } catch (\Exception $e) {
                return $this->responseBadRequest(['message' => $e->getMessage()]);
            }
        }

        /**
         * @param String $social_token
         * @return void
         */
        public function checkFacebook($social_token)
        {
            try {
                $checkToken = $this->client->get("https://graph.facebook.com/v3.1/me?fields=id,name,email&access_token=$social_token");
                $responseFacebook = json_decode($checkToken->getBody()->getContents(), true);

                return $this->checkUserByEmail($responseFacebook);
            } catch (\Exception $e) {
                return $this->responseBadRequest(['message' => $e->getMessage()]);
            }
        }

        /**
         * @param $profile
         * @return void
         */
        public function checkUserByEmail($profile)
        {
            $user = User::where('email', $profile['email'])->first();
            if (!$user) {
                $user = User::create([
                    'name' => $profile['name'],
                    'email' => $profile['email'],
                    'password' => bcrypt(str_random(8)),
                ]);
            }

            $user->forceFill([
                'verified' => true,
                'email' => $user['email'],
                'activated_at' => Carbon::now(),
            ])->save();
            $tokenResult = $user->createToken('Personal Access Client');
            $token = $tokenResult->token;
            $token->expires_at = Carbon::now()->addMonth();
            $token->save();

            return response()->json([
                'access_token' => $tokenResult->accessToken,
                'token_type' => 'Bearer',
                'expires_at' => Carbon::parse(
                    $tokenResult->token->expires_at
                )->toDateTimeString()
            ]);
        }
    }
    ```
    
### Kết luận
Việc xây dựng API login Google, Facebook, Twitter hay Github với server laravel cho các dự án về App Mobile cũng khá đơn giản nhưng nó mang lại vô cùng tiện lợi cho người dùng :thumbsup::thumbsup::thumbsup: