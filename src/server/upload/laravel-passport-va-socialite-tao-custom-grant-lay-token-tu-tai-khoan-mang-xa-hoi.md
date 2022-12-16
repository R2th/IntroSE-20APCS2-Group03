Bài viết này mình sẽ hướng dẫn các bạn cách lấy `access token` và `refresh token` khi người dùng đăng nhập bằng Google, Facebook, Github...
## Bài toán
#### Passport
Bài toán này mình sử dụng React js làm frontend, backend Laravel cung cấp API và xác thực danh tính bằng access token, refresh token thông qua Laravel Passport.

Hệ thống hoạt động rất trơn tru cho đến khi mình implement thêm chức năng đặng nhập với tài khoản OAuth bên thứ 3 (Google, Facebook, Github ...). Ở bài viết này mình sẽ lấy ví dụ chung là Google cho tiện :grinning:
#### Socialite
Đoạn code xử lý callback từ Google:
```php
public function socialCallback($social)
    {
        //Lấy thông tin Google account
        $socialProvider = Socialite::driver($social)->stateless()->user();
        $socialAccount = SocialAccount::whereSocialProvider($social)
            ->whereSocialId($socialProvider->getId())
            ->first();
    
        if ($socialAccount) {
        //Lấy ra user tương ứng với Google account
            if ($user = $socialAccount->user) {
                //$data chứa các token cần thiết cho việc authenticate API
                $data = ???
                return response->json($data);
            }
        } else {
            //Xử lý với trường hợp tài khoản mới
        }
    }
```

Chúng ta có Google account và cả User của người dùng, bây giờ hãy tìm cách trả về `access_token` và `refresh_token` nào:
```php
//Access token quá đơn giản
$access_token = $user->createToken('Token Name')->accessToken;
//Còn refresh token thì sao?
$refresh_token = $user->createToken('Token Name')->refreshToken; //làm gì có :D
```
Làm sao để lấy được `refresh_token` đây? Lội lại docs của Laravel thì Passport chỉ hỗ sẵn các loại *Grant* để lấy token qua chính **refresh token** hoặc  **username** và **password**. Vậy thì mình tạo một *Custom Grant* mới thôi :D
## Tạo Custom Grant
Soi vào code của Laravel một chút
#### Password Grant
Bạn có thể tìm thấy file `PasswordGrant.php` tại `vender/league/oauth2-server/src/Grant`. Nhìn tên thôi cũng thấy đúng cái chúng ta cần tìm rồi :D
```php
<?php
/**
 * OAuth 2.0 Password grant.
 *
 * @author      Alex Bilbie <hello@alexbilbie.com>
 * @copyright   Copyright (c) Alex Bilbie
 * @license     http://mit-license.org/
 *
 * @link        https://github.com/thephpleague/oauth2-server
 */

namespace League\OAuth2\Server\Grant;

use DateInterval;
use League\OAuth2\Server\Entities\ClientEntityInterface;
use League\OAuth2\Server\Entities\UserEntityInterface;
use League\OAuth2\Server\Exception\OAuthServerException;
use League\OAuth2\Server\Repositories\RefreshTokenRepositoryInterface;
use League\OAuth2\Server\Repositories\UserRepositoryInterface;
use League\OAuth2\Server\RequestEvent;
use League\OAuth2\Server\ResponseTypes\ResponseTypeInterface;
use Psr\Http\Message\ServerRequestInterface;

/**
 * Password grant class.
 */
class PasswordGrant extends AbstractGrant
{
    /**
     * @param UserRepositoryInterface         $userRepository
     * @param RefreshTokenRepositoryInterface $refreshTokenRepository
     */
    public function __construct(
        UserRepositoryInterface $userRepository,
        RefreshTokenRepositoryInterface $refreshTokenRepository
    ) {
        $this->setUserRepository($userRepository);
        $this->setRefreshTokenRepository($refreshTokenRepository);

        $this->refreshTokenTTL = new DateInterval('P1M');
    }

    /**
     * {@inheritdoc}
     */
    public function respondToAccessTokenRequest(
        ServerRequestInterface $request,
        ResponseTypeInterface $responseType,
        DateInterval $accessTokenTTL
    ) {
        // Validate request
        $client = $this->validateClient($request);
        $scopes = $this->validateScopes($this->getRequestParameter('scope', $request, $this->defaultScope));
        $user = $this->validateUser($request, $client);

        // Finalize the requested scopes
        $finalizedScopes = $this->scopeRepository->finalizeScopes($scopes, $this->getIdentifier(), $client, $user->getIdentifier());

        // Issue and persist new access token
        $accessToken = $this->issueAccessToken($accessTokenTTL, $client, $user->getIdentifier(), $finalizedScopes);
        $this->getEmitter()->emit(new RequestEvent(RequestEvent::ACCESS_TOKEN_ISSUED, $request));
        $responseType->setAccessToken($accessToken);

        // Issue and persist new refresh token if given
        $refreshToken = $this->issueRefreshToken($accessToken);

        if ($refreshToken !== null) {
            $this->getEmitter()->emit(new RequestEvent(RequestEvent::REFRESH_TOKEN_ISSUED, $request));
            $responseType->setRefreshToken($refreshToken);
        }

        return $responseType;
    }

    /**
     * @param ServerRequestInterface $request
     * @param ClientEntityInterface  $client
     *
     * @throws OAuthServerException
     *
     * @return UserEntityInterface
     */
    protected function validateUser(ServerRequestInterface $request, ClientEntityInterface $client)
    {
        $username = $this->getRequestParameter('username', $request);

        if (\is_null($username)) {
            throw OAuthServerException::invalidRequest('username');
        }

        $password = $this->getRequestParameter('password', $request);

        if (\is_null($password)) {
            throw OAuthServerException::invalidRequest('password');
        }

        $user = $this->userRepository->getUserEntityByUserCredentials(
            $username,
            $password,
            $this->getIdentifier(),
            $client
        );

        if ($user instanceof UserEntityInterface === false) {
            $this->getEmitter()->emit(new RequestEvent(RequestEvent::USER_AUTHENTICATION_FAILED, $request));

            throw OAuthServerException::invalidGrant();
        }

        return $user;
    }

    /**
     * {@inheritdoc}
     */
    public function getIdentifier()
    {
        return 'password';
    }
}

```
Nhìn qua ta có thể thấy `PasswordGrant.php` extend từ `AbstractGrant.php` và override 3 hàm `respondToAccessTokenRequest()`, `validateUser()`, `getIdentifier()`. Phân tích qua 3 hàm này:
```php
//Hàm này trả về tên của grant
public function getIdentifier()
    {
        return 'password';
    }
```
```php
//Tìm kiếm và trả về người dùng bằng các thông tin query từ request
protected function validateUser(ServerRequestInterface $request, ClientEntityInterface $client)
    {
        ...
        $user = $this->userRepository->getUserEntityByUserCredentials(
            $username,
            $password,
            $this->getIdentifier(),
            $client
        );
        ...
        // Các bạn chú ý ở đây $user là instance của Laravel\Passport\Bridge\User;
        return $user;
    }
```
```php
//Trả lại access_token, refresh_token và một số thông tin khác của $user
   public function respondToAccessTokenRequest(...) {
          ...
        //Lấy user từ request
        $user = $this->validateUser($request, $client);
        //Lấy access token và refresh token
        ...
        $accessToken = $this->issueAccessToken($accessTokenTTL, $client, $user->getIdentifier(), $finalizedScopes);
        $responseType->setAccessToken($accessToken);
        ...
        $refreshToken = $this->issueRefreshToken($accessToken);
        $responseType->setRefreshToken($refreshToken);
        ...
        return $responseType;
    }
```
OK, phân tích xong ta thấy chỉ cần tạo 1 **Custom grant** override 3 hàm này, lấy ra `Laravel\Passport\Bridge\User` qua các thông tin từ `$request` mà chúng ta muốn. Để tạo được `$user` này từ `App\Model\User` cảu chúng ta chỉ đơn giản
```php
use Laravel\Passport\Bridge\User;
$user = new User($ourUser->getAuthIdentifier());
```

#### Custom Grant
Ở đây mình sẽ demo **Custom grant** `username` và `password` đã được hash lấy từ `$user` mà chúng ta có trong `socialCallback()`. 

Tại sao không lấy ngay `social_id` của `$socialAccount` cho đơn giản? Bởi vì `social_id` của người dùng không thay đổi được, nếu lỡ may bị lộ thì kẻ gian sẽ dễ dàng cướp được quyền của user :cry: 

Bạn cũng có thể thử sử dụng `access_token` của `$socialAccount` hay bất cứ thông tin nào mà bạn muốn :+1:
```php
<?php

namespace App\Http\Grant;

use DateInterval;
use League\OAuth2\Server\Entities\ClientEntityInterface;
use League\OAuth2\Server\Entities\UserEntityInterface;
use League\OAuth2\Server\Exception\OAuthServerException;
use League\OAuth2\Server\Repositories\RefreshTokenRepositoryInterface;
use League\OAuth2\Server\Repositories\UserRepositoryInterface;
use League\OAuth2\Server\RequestEvent;
use League\OAuth2\Server\ResponseTypes\ResponseTypeInterface;
use Psr\Http\Message\ServerRequestInterface;
use Laravel\Passport\Bridge\User;
use League\OAuth2\Server\Grant\AbstractGrant;


class YourGrant extends AbstractGrant
{
     /**
     * @param UserRepositoryInterface         $userRepository
     * @param RefreshTokenRepositoryInterface $refreshTokenRepository
     */
     public function __construct(
        UserRepositoryInterface $userRepository,
        RefreshTokenRepositoryInterface $refreshTokenRepository
    ) {
        $this->setUserRepository($userRepository);
        $this->setRefreshTokenRepository($refreshTokenRepository);

        $this->refreshTokenTTL = new DateInterval('P1M');
    }

    /**
     * {@inheritdoc}
     */
    public function respondToAccessTokenRequest(
        ServerRequestInterface $request,
        ResponseTypeInterface $responseType,
        DateInterval $accessTokenTTL
    ) {
        // Validate request
        $client = $this->validateClient($request);
        $scopes = $this->validateScopes($this->getRequestParameter('scope', $request, $this->defaultScope));
        $user = $this->validateUser($request, $client);

        // Finalize the requested scopes
        $finalizedScopes = $this->scopeRepository->finalizeScopes($scopes, $this->getIdentifier(), $client, $user->getIdentifier());

        // Issue and persist new access token
        $accessToken = $this->issueAccessToken($accessTokenTTL, $client, $user->getIdentifier(), $finalizedScopes);
        $this->getEmitter()->emit(new RequestEvent(RequestEvent::ACCESS_TOKEN_ISSUED, $request));
        $responseType->setAccessToken($accessToken);

        // Issue and persist new refresh token if given
        $refreshToken = $this->issueRefreshToken($accessToken);

        if ($refreshToken !== null) {
            $this->getEmitter()->emit(new RequestEvent(RequestEvent::REFRESH_TOKEN_ISSUED, $request));
            $responseType->setRefreshToken($refreshToken);
        }

        return $responseType;
    }

    /**
     * @param ServerRequestInterface $request
     * @param ClientEntityInterface  $client
     *
     * @throws OAuthServerException
     *
     * @return UserEntityInterface
     */
    protected function validateUser(ServerRequestInterface $request, ClientEntityInterface $client)
    {
        $username = $this->getRequestParameter('username', $request);

        if (\is_null($username)) {
            throw OAuthServerException::invalidRequest('username');
        }

        $password = $this->getRequestParameter('password', $request);

        if (\is_null($password)) {
            throw OAuthServerException::invalidRequest('password');
        }

        $user = $this->getUser($username, $password);

        if ($user instanceof UserEntityInterface === false) {
            $this->getEmitter()->emit(new RequestEvent(RequestEvent::USER_AUTHENTICATION_FAILED, $request));

            throw OAuthServerException::invalidGrant();
        }

        return $user;
    }

    private function getUser($username, $password){
        $user = App/Models/User::whereUsernamer($username)
        ->wherePassword($pasword)->first();
        if(!$user) return;
        return new User($user->getAuthIdentifier());
    }

    /**
     * {@inheritdoc}
     */
    public function getIdentifier()
    {
        return 'your_grant_name';
    }
}
```
Vậy là chúng ta đã có grant mong muốn :grinning: Xong chưa nhỉ? Chưa đâu, để sử dụng được grant này ta phải đăng ký nó trong `service provider`.

#### Service Provider
Tạo một `service provider`
```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Passport\Bridge\RefreshTokenRepository;
use Laravel\Passport\Bridge\UserRepository;
use Laravel\Passport\Passport;
use League\OAuth2\Server\AuthorizationServer;
use App\Http\Grant\YourGrant;


class SocialAuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
        app()->afterResolving(AuthorizationServer::class, function (AuthorizationServer $server) {
            $grant = $this->makeGrant();
            $server->enableGrantType($grant, Passport::tokensExpireIn());
        });
    }

    private function makeGrant(){
        $grant = new YourGrant(
            $this->app->make(UserRepository::class),
            $this->app->make(RefreshTokenRepository::class),
        );
        $grant->setRefreshTokenTTL(Passport::refreshTokensExpireIn());
        return $grant;
    }
}

```
Và đăng ký nó trong `config/app.php`
```php
 'providers' => [
     ...
     App\Providers\SocialAuthServiceProvider::class,
 ]
```
Done! Bây giờ ta hoàn toàn có thể lấy các token và thông tin như với `password` hoặc `refresh_token` grant. Ở bài toán của mình, mình tạo một `AuthenticateProxy` làm trung gian để thêm một số thông tin như `oauth_client`... gửi api cho passport, lấy lại response và trả về token cho user. Request có dạng:
```js
POST DOMAIN/oauth/token
body: {
        client_id: client_id,
        client_secret: client_secret,
        grant_type: 'your_grant_name',
        username: username,
        password: hashed_password
    }
```

## Kết bài
Vậy là mình đã hướng dẫn xong các bạn cách tạo một *custom grant* rồi. Mong nhận được sự góp ý của mọi người để cải tiến xịn xò hơn :smile:!