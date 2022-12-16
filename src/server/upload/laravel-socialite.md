# Giới thiệu
Ngoài form login cài đặt xinh xinh đáng yêu quen thuộc ra thì laravel có 1 cách để xác thực người dùng khác là sử dụng xác thực người dùng của các nhà cung cấp OAuth. Đó là Laravel Socialite. Thư viện đang hỗ trợ cho xác thực người dùng thông qua Facebook, Twitter, LinkedIn, Google, Bitbucket, GitHub(không biết có loại ...Hub nào khác không nhỉ? :V ) và rất nhiều các nhà cung cấp khác.
# Cài đặt
Chạy lệnh
```
composer require laravel/socialite
```
# Tùy chỉnh
Trước khi sử dụng Socialite, bạn cũng cần thêm thông tin đăng nhập cho các dịch vụ OAuth mà ứng dụng của bạn sử dụng. Các thông tin này nên được đặt trong tập tin cấu hình `config/services.php` của bạn, và nên sử dụng key của `facebook`, `twitter`, `linkedin`, `google`, `github` hoặc bitbucket, tùy thuộc vào nhà cung cấp mà ứng dụng của bạn yêu cầu. Ví dụ:
```php
'github' => [
    'client_id' => env('GITHUB_CLIENT_ID'),         // Your GitHub Client ID
    'client_secret' => env('GITHUB_CLIENT_SECRET'), // Your GitHub Client Secret
    'redirect' => 'http://your-callback-url',
],
```
(Hãy đặt `GITHUB_CLIENT_ID` và `GITHUB_CLIENT_SECRET` trong file `.env`)
# Routing
Tiếp theo, bạn đã sẵn sàng để xác thực người dùng! Bạn sẽ cần hai route: một để chuyển hướng người dùng đến nhà cung cấp OAuth và một route khác để nhận callback từ nhà cung cấp sau khi xác thực. Chúng ta sẽ truy cập Socialite bằng cách sử dụng facade `Socialite`:
```php
<?php

namespace App\Http\Controllers\Auth;

use Socialite;

class LoginController extends Controller
{
    /**
     * Redirect the user to the GitHub authentication page.
     *
     * @return \Illuminate\Http\Response
     */
    public function redirectToProvider()
    {
        return Socialite::driver('github')->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return \Illuminate\Http\Response
     */
    public function handleProviderCallback()
    {
        $user = Socialite::driver('github')->user();

        // $user->token;
    }
}
```
Phương thức `redirect` xử lý việc gửi người dùng đến nhà cung cấp OAuth, trong khi phương thức` user` sẽ đọc yêu cầu gửi đến và truy xuất thông tin của người dùng từ nhà cung cấp.

Tất nhiên, bạn sẽ cần phải xác định các tuyến đường đến các phương pháp điều khiển của bạn:
```php
Route::get('login/github', 'Auth\LoginController@redirectToProvider');
Route::get('login/github/callback', 'Auth\LoginController@handleProviderCallback');
```
# Tham số tùy chọn
Một số nhà cung cấp OAuth hỗ trợ các tham số tùy chọn trong yêu cầu chuyển hướng. Để bao gồm bất kỳ tham số tùy chọn nào trong yêu cầu, hãy gọi phương thức `with` với một mảng kết hợp:
```php
return Socialite::driver('google')
    ->with(['hd' => 'example.com'])
    ->redirect();
```
!CHÚ Ý: khi dùng phương thức `with`, KHÔNG ĐƯỢC sử dụng dụng các keyword như `state` hay `response_type`
# Phạm vi truy cập
Trước khi chuyển hướng người dùng, bạn cũng có thể thêm "các phạm vi" bổ sung vào yêu cầu bằng phương thức `scopes`. Phương pháp này sẽ hợp nhất tất cả phạm vi hiện có với phạm vi bạn cung cấp:
```php
return Socialite::driver('github')
    ->scopes(['read:user', 'public_repo'])
    ->redirect();
```
Ta cũng có thể ghi đè toàn bộ các phạm vi với `setScopes`:
```php
return Socialite::driver('github')
    ->setScopes(['read:user', 'public_repo'])
    ->redirect();
```
# Xác thực stateless
Phương thức `stateless` có thể được sử dụng để vô hiệu hóa xác minh trạng thái phiên. Điều này hữu ích khi thêm xác thực mạng xã hội vào API:
```php
return Socialite::driver('google')->stateless()->user();
```
# Truy xuất thông tin người dùng
Khi bạn có một instance người dùng, bạn có thể lấy thêm một vài chi tiết về người dùng:
```php
$user = Socialite::driver('github')->user();

// OAuth Two Providers
$token = $user->token;
$refreshToken = $user->refreshToken; // not always provided
$expiresIn = $user->expiresIn;

// OAuth One Providers
$token = $user->token;
$tokenSecret = $user->tokenSecret;

// All Providers
$user->getId();
$user->getNickname();
$user->getName();
$user->getEmail();
$user->getAvatar();
```
## Truy xuất thông tin người dùng từ token (OAuth2)
Nếu bạn đã có một token truy cập hợp lệ cho một người dùng, bạn có thể lấy các thông tin của họ bằng cách sử dụng phương thức `userFromToken`:
```php
$user = Socialite::driver('github')->userFromToken($token);
```
## Truy xuất thông tin người dùng từ token và secret(OAuth1)
Nếu bạn có cả cặp token/secret, sử dụng phương thức `userFromTokenAndSecret`:
```php
$user = Socialite::driver('twitter')->userFromTokenAndSecret($token, $secret);
```
# Demo
Mình có làm thử demo nhanh ở đây: https://github.com/BlazingRockStorm/demo-social. Chạy khá tốt.
# Tham khảo
https://laravel.com/docs/5.6/socialite

https://mattstauffer.com/blog/using-github-authentication-for-login-with-laravel-socialite/