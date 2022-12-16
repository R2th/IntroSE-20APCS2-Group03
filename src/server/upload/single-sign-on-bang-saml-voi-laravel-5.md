# Giới thiệu
Đây là những memo khi sử dụng Single sign-on bằng SAML cho Laravel 5.

Phần lớn nội dung là giống với README của laravel-saml2.

# Môi trường
Hoạt động từ Laravel 5.4 trở về sau.

# Cài đặt
## Cài đặt laravel-saml2
`composer require aacotroneo/laravel-saml2`

Với các phiên bản Laravel trước 5.5, thì cần thêm Service Provider vào `config\app.php` như bên dưới:

config\app.php
```
'providers' => [
        ...
        Aacotroneo\Saml2\Saml2ServiceProvider::class,
]

'alias' => [
        ...
        'Saml2' => Aacotroneo\Saml2\Facades\Saml2Auth::class,
]
```

Thực hiện vendor:publish
`php artisan vendor:publish --provider="Aacotroneo\Saml2\Saml2ServiceProvider"`
`app\config\saml2_settings.php` sẽ được tạo ra.

## Tạo Laravel authenticataion
Tạo Auth cho Laravel
```
php artisan make:auth
php artisan migrate
```

# Cài đặt SAML
## Đăng ký metadata vào Idp
Xác nhận metadata SAML của phía Laravel (SAML SP) theo link bên dưới, sau đó đăng ký vào phía IdP.

`http://localhost/Laravel-app-name/public/saml2/metadata`

## Thiết lập metadata IdP cho Laravel
Thiết lập metadata IdP vào `saml2_settings.php` của phía Laravel.

Chỉ định các biến môi trường entityId, singleSignOnService, singleLogoutService, x509cert.

Chỗ này là đang sử dụng IdP Google.

app\config\saml2_settings.php
```
// Identity Provider Data that we want connect with our SP
    'idp' => array(
        // Identifier of the IdP entity  (must be a URI)
        'entityId' => 'https://accounts.google.com/o/saml2?idpid=****',
        // SSO endpoint info of the IdP. (Authentication Request protocol)
        'singleSignOnService' => array(
            // URL Target of the IdP where the SP will send the Authentication Request Message,
            // using HTTP-Redirect binding.
            'url' => 'https://accounts.google.com/o/saml2/idp?idpid=****',

        ),
        // SLO endpoint info of the IdP.
        'singleLogoutService' => array(
            // URL Location of the IdP where the SP will send the SLO Request,
            // using HTTP-Redirect binding.
            'url' => 'https://accounts.google.com/Logout',
        ),
        // Public x509 certificate of the IdP
        'x509cert' => '****',
        /*
         *  Instead of use the whole x509cert you can use a fingerprint
         *  (openssl x509 -noout -fingerprint -in "idp.crt" to generate it)
         */
        // 'certFingerprint' => '',
```

## Thay đổi routesMiddleware
Vì Login session chưa được tạo ra khi thêm VerifyCsrfToken, nên phải thay đổi routesMiddleware của `saml2_settings.php` như bên dưới:

app\config\saml2_settings.php
`'routesMiddleware' => ['saml'],`


Thêm Middle ware group SAML mới vào Kernel.php.

Nội dung của saml group sau khi bỏ VerifyCsrfToken ra khỏi web group.

app\Http\Kernel.php
```
protected $middlewareGroups = [
        'web' => [
            \App\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            // \Illuminate\Session\Middleware\AuthenticateSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \App\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        'api' => [
            'throttle:60,1',
            'bindings',
        ],

        // samlグループを追加
        'saml' => [
            \App\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
    ];
```

# Tạo phần authentication
## Tạo Event listen cho SAML login và logout
Mô tả event khi SAML login và logout.

Vì liên kết với Auth của Laravel nên sẽ làm như sau:

*   Khi SAML login thì Auth cũng login
*   Khi SAML logout thì Auth cũng logout
  
Thêm method boot vào `EventServiceProvider.php`
app\Providers\EventServiceProvider.php
```
 Event::listen('Aacotroneo\Saml2\Events\Saml2LoginEvent', function (Saml2LoginEvent $event) {
            $messageId = $event->getSaml2Auth()->getLastMessageId();
        // your own code preventing reuse of a $messageId to stop replay attacks
        $user = $event->getSaml2User();

        // 属性からUserモデルを取得する
        $userData = [
            'id' => $user->getUserId(),
            'attributes' => $user->getAttributes(),
            'assertion' => $user->getRawSamlAssertion()
        ];
        $laravelUser = \App\User::where('email', $userData['attributes']['emailAddress'])->first();

        //if it does not exist create it and go on  or show an error message
        if ($laravelUser) {
            Auth::login($laravelUser);
        } else {
            abort(401, 'Authorization Required');
        }
        });

Event::listen('Aacotroneo\Saml2\Events\Saml2LogoutEvent', function ($event) {
            Auth::logout();
            Session::save();
        });
```
Đồng bộ các thuộc tính thu được với môi trường.
Nếu xảy ra lỗi 401 khi xác thực thì sử dụng view 401 tương ứng như link ở dưới:
`app\resources\views\errors\401.blade.php`

## Tạo Middleware SAML authentication
Tạo Middleware để xác thực SAML.
Bằng việc sử sụng Middleware này, cần login SAML để truy cập đến các pages.

Sử dụng lênh artisan để tạo Middleware tên SamlAuth.

`php artisan make:middleware SamlAuth`

Chỉnh sửa SamlAuth.php như sau:

app\Http\Middleware\SamlAuth.php
```
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use Aacotroneo\Saml2\Facades\Saml2Auth;

class SamlAuth
{

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        // SAMLログイン認証
        if (Auth::guest()) {
            if ($request->ajax()) {
                return response('Unauthorized.', 401);
            } else {
                Saml2Auth::login(URL::full());
            }
        }
        return $next($request);
    }

}
```


Đăng ký SamlAuth vào routeMiddleware của Kernel.php.

app\Http\Kernel.php
```
    protected $routeMiddleware = [
        'auth' => \Illuminate\Auth\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
        'can' => \Illuminate\Auth\Middleware\Authorize::class,
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        // 追加
        'samlauth' => \App\Http\Middleware\SamlAuth::class,
    ];
```

# Sử dụng authentication
Sử dụng Middleware authentication.

Bên dưới là 1 ví dụ của việc sử dụng middleware cho route group.
```
Route::middleware(['samlauth'])->group(function () {
    Route::get('/home', 'HomeController@index');
});
```

# Kiểm tra hoạt động
Tạo data user có email và IdP tại table Users.

Truy cập vào /home, sẽ xuất hiện màn hình login IdP.

Tiến hành login bằng email address.

# Tham khảo
[Laravel 5 でSAMLシングルサインオンする](https://qiita.com/kumapo0313/items/b32daf108d250555382f)