![](https://images.viblo.asia/7b09ef97-c2da-44d1-b2b0-3261eaa1d2a9.png)
### Bài Toán
Tình hình là thời gian sắp tới mình có dự định làm một ứng dụng App Mobile. Về backend thì mình dự định sử dụng Laravel làm server cung cấp APIs. App thì mình dự định viết cả cho android và IOS.
Khi bắt đầu vào làm mình gặp chút khó khăn về phần Authentication giữa bên app và server. May quá sau khi research mình thấy thằng laravel có cung cấp 1 package là laravel passport với cơ chế Oauth2 có thể cung cấp cho bên app access_token để truy cập vào server để lấy dữ liệu.
- Khởi tạo project
```bash
composer create-project --prefer-dist laravel/laravel project-social
```
- Cài đặt laravel passport
```bash
composer require laravel/passport
```
Chi tiết về laravel passport truy cập vào đây nhé https://laravel.com/docs/5.8/passport.
Sau khi cài đặt xong laravel passport cho project, các bạn có thể dùng postman để test login với form như bên dưới.
![](https://images.viblo.asia/d3997cf8-df6a-4a79-a8db-bad379578e71.png)
Với việc login bằng email và password thì các bạn dùng grant_type là password.
Kết quả nhận được:
```json
{
    "token_type": "Bearer",
    "expires_in": 2592000,
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijk5ZDFlM2YzZmYwZTEyZDhjZDA4MzAyNjNhZjU0OTQwNjkxMWFlZDAxNjQ4Y2JjYjViMWZiNWY1ZDQ0N2RlZDg4OWM2ZTRkN2E2ODhkMjFlIn0.eyJhdWQiOiIyIiwianRpIjoiOTlkMWUzZjNmZjBlMTJkOGNkMDgzMDI2M2FmNTQ5NDA2OTExYWVkMDE2NDhjYmNiNWIxZmI1ZjVkNDQ3ZGVkODg5YzZlNGQ3YTY4OGQyMWUiLCJpYXQiOjE1NjYwNDUwMjIsIm5iZiI6MTU2NjA0NTAyMiwiZXhwIjoxNTY4NjM3MDIyLCJzdWIiOiI1MCIsInNjb3BlcyI6W119.d3SFK5cgyplnLAB0wnhKh56ev3NGqq3X8sA62pGN9vwczKMjOFdMldAE1tnVIdclrdaF6QPs8p7KtK7eHuvoGirzHDLThJq9qfI8iTXa3LujVJmwHwC7sjAVAx9DbGIvSCC9thGNi6V6D4wTimAUSKrhDGM1E6gbmSmxoCSDFI1mhQKnIZ_9okXH0IIRAHafyLtRQjyEDK5aefy2jMapulYHX4z2pcEIHOF5KapSLspyd0X5_y12Ys8P_Mfg1iG4lUEcvtbapXnbze9E6ervJHfX7_cbKhBvpxVALIrcUXcr897pWjgGCNpye4KQ81yHsAF_NrsFvIbfH8nhKM-6NSShgXQh2CACx2tkM0RK5QY6Afu2w8ffE1NjQWg1DCwo82atEpXyTeFGzbws1tn4ekKmlGQ4rKEbkQSGUCY1moaKgwJfh6H00MBSXUW3IAFUn51tqq-hE7dqKhU3jZ6cJ9FHpy5sGxSLjOr17JtnoucQEWGvb6K2pa96qHSDjjzYnbOTAVaKrgZAdNjz_7G_i2-UeIJHKmI59ezN02m4Il_wuQm64pUAO8e2ePL-rCor5h8XgtzJPLZ8HH6kfQ2biFBruchC142OtVetkfrsY3YTL2IMgOU5IJGjzx_58-vIdORUfDJq_T8xCYqAB_Kp7tG6kWQZ1jC3P5W292TuL2I",
    "refresh_token": "def502002e2cb1ed0241b2fff0c7e94ce9f61156d81d352d8d6369fea5d5c6a36112d20e3d5d92aca6970f69ced799857a43d7f5eba444458563bb3868ef8f04116b90ce3e2a62d5ac215f48b6dd6c648bc0d1d959214eeee639a908beba40618a13e4e93d676a1d3bdfd47a7b4671ea529d8f5687e71d8bf56111c9566635e9db8d3429a5ee01185b13ddcefaec4d24de5c8a01fdd763368a720d3b79b20b95722c5a4d1a00a0ab424968dcd3b81e115cfa4ba8caaf44a0d2f07543f676a75d90a1c9b0cde6dda51f11ca22463841777b404ff7b68f6e56696b8ac4e0c5be94a0ded60d61a17d0e5b79dd4321c7b29fc71aafe482477731dbfb9bf76459e703237d8ebde88ee269c42eb0c5cd5c9832513100f24aed998786a11804959e6e5539d851d2c3ea47da87a482c9596064f8efa29db98b9c01136691e6e1c500beb5a3158c2e5cde4db6fff2b44e2626d9dbefe447e410d35f42b560e80d38a1afe05875"
}
```
Với access_token phía app có thể truy cập lên server và lấy dữ liệu được rồi =)).

Nếu câu chuyện dừng lại tại đây thì đã khá là đơn giản đúng không ạ :D.
Như các bạn cũng biết rồi đấy, hiện nay để đơn giản hóa trải nghiệm người dùng, và giảm tải thao tác người dùng ngày càng được chú trọng. Bên việc đăng nhập bằng tài khoản và mật khẩu nhưng cách truyền thống. Hiện tại các website và ứng dụng hầu hết đã cho người dùng đăng nhập qua mạng xã hội: Facebook, google, twitter, github, ...

Mình cũng khá đau đầu chưa biết làm thế nào thì tình cờ search được thằng này: **passport-social-grant**.
Một package tích hợp cơ chế Oauth2, tạo ra 1 grant_type mới, đang để Identifier là 'social'.

Login bằng grant_type 'password' server cần email và password chính xác của người dùng để có cho phép bạn truy cập để lấy access_token.

Còn grant_type social thì có khác một chút. Cụ thể là:

- Cài đặt package **passport-social-grant**:
```bash
composer require adaojunior/passport-social-grant
```

```php
// config/app.php
'providers' => [
    ...
    Adaojunior\Passport\SocialGrantServiceProvider::class,
    ...
];
```

```php
...

use Adaojunior\Passport\SocialGrantException;
use Adaojunior\Passport\SocialUserResolverInterface;

class SocialUserResolver implements SocialUserResolverInterface
{

    /**
     * Resolves user by given network and access token.
     *
     * @param string $network
     * @param string $accessToken
     * @return \Illuminate\Contracts\Auth\Authenticatable
     */
    public function resolve($network, $accessToken, $accessTokenSecret = null)
    {
        switch ($network) {
            case 'facebook':
                return $this->authWithFacebook($accessToken);
                break;
            default:
                throw SocialGrantException::invalidNetwork();
                break;
        }
    }
    
    
    /**
     * Resolves user by facebook access token.
     *
     * @param string $accessToken
     * @return \App\User
     */
    protected function authWithFacebook($accessToken)
    {
        ...
    }
}
```
Đăng ký trong AppServiceProvider:
```php
    $this->app->singleton(SocialUserResolverInterface::class, SocialUserResolver::class);
```
Request login
```php
$response = $http->post('http://your-app.com/oauth/token', [
    'form_params' => [
        'client_id' => 'client-id',
        'client_secret' => 'client-secret',
        'grant_type' => 'social',
        'network' => 'facebook', /// or any other network that your server is able to resolve.
        'access_token' => 'A_ACCESS_TOKEN_PROVIDED_BY_THE_SOCIAL_LOGIN_PROVIDER',
    ],
]);
```
Và chúng ta cũng lấy được access_token cho app:
```json
{
    "token_type": "Bearer",
    "expires_in": 2592000,
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijk5ZDFlM2YzZmYwZTEyZDhjZDA4MzAyNjNhZjU0OTQwNjkxMWFlZDAxNjQ4Y2JjYjViMWZiNWY1ZDQ0N2RlZDg4OWM2ZTRkN2E2ODhkMjFlIn0.eyJhdWQiOiIyIiwianRpIjoiOTlkMWUzZjNmZjBlMTJkOGNkMDgzMDI2M2FmNTQ5NDA2OTExYWVkMDE2NDhjYmNiNWIxZmI1ZjVkNDQ3ZGVkODg5YzZlNGQ3YTY4OGQyMWUiLCJpYXQiOjE1NjYwNDUwMjIsIm5iZiI6MTU2NjA0NTAyMiwiZXhwIjoxNTY4NjM3MDIyLCJzdWIiOiI1MCIsInNjb3BlcyI6W119.d3SFK5cgyplnLAB0wnhKh56ev3NGqq3X8sA62pGN9vwczKMjOFdMldAE1tnVIdclrdaF6QPs8p7KtK7eHuvoGirzHDLThJq9qfI8iTXa3LujVJmwHwC7sjAVAx9DbGIvSCC9thGNi6V6D4wTimAUSKrhDGM1E6gbmSmxoCSDFI1mhQKnIZ_9okXH0IIRAHafyLtRQjyEDK5aefy2jMapulYHX4z2pcEIHOF5KapSLspyd0X5_y12Ys8P_Mfg1iG4lUEcvtbapXnbze9E6ervJHfX7_cbKhBvpxVALIrcUXcr897pWjgGCNpye4KQ81yHsAF_NrsFvIbfH8nhKM-6NSShgXQh2CACx2tkM0RK5QY6Afu2w8ffE1NjQWg1DCwo82atEpXyTeFGzbws1tn4ekKmlGQ4rKEbkQSGUCY1moaKgwJfh6H00MBSXUW3IAFUn51tqq-hE7dqKhU3jZ6cJ9FHpy5sGxSLjOr17JtnoucQEWGvb6K2pa96qHSDjjzYnbOTAVaKrgZAdNjz_7G_i2-UeIJHKmI59ezN02m4Il_wuQm64pUAO8e2ePL-rCor5h8XgtzJPLZ8HH6kfQ2biFBruchC142OtVetkfrsY3YTL2IMgOU5IJGjzx_58-vIdORUfDJq_T8xCYqAB_Kp7tG6kWQZ1jC3P5W292TuL2I",
    "refresh_token": "def502002e2cb1ed0241b2fff0c7e94ce9f61156d81d352d8d6369fea5d5c6a36112d20e3d5d92aca6970f69ced799857a43d7f5eba444458563bb3868ef8f04116b90ce3e2a62d5ac215f48b6dd6c648bc0d1d959214eeee639a908beba40618a13e4e93d676a1d3bdfd47a7b4671ea529d8f5687e71d8bf56111c9566635e9db8d3429a5ee01185b13ddcefaec4d24de5c8a01fdd763368a720d3b79b20b95722c5a4d1a00a0ab424968dcd3b81e115cfa4ba8caaf44a0d2f07543f676a75d90a1c9b0cde6dda51f11ca22463841777b404ff7b68f6e56696b8ac4e0c5be94a0ded60d61a17d0e5b79dd4321c7b29fc71aafe482477731dbfb9bf76459e703237d8ebde88ee269c42eb0c5cd5c9832513100f24aed998786a11804959e6e5539d851d2c3ea47da87a482c9596064f8efa29db98b9c01136691e6e1c500beb5a3158c2e5cde4db6fff2b44e2626d9dbefe447e410d35f42b560e80d38a1afe05875"
}
```
Tư tưởng hoạt động: Khi ứng dụng laravel được chạy khi đi qua AppServiceProvider, trong packge đã đăng ký một grant_type mới có tên là 'social'. grant_type: passsword yêu cầu email và password còn grant_type: social thì cần network và access_token.

Nếu muốn biết tại sao lại có grant_type: social và vì sao lại truyền lên param: network và access_token của network, các bạn cần đi sâu và trong package để xem nó hoạt động như thế nào https://github.com/adaojunior/passport-social-grant/tree/master/src

### Thực Hiện
Các bạn có thể dừng lại tại đây là đã có thể login và lấy ra được access_token rồi. Nhưng mình vẫn thấy chưa ổn và muốn tìm hiểu xem package họ code như thế nào và mình có thể thay đổi các params được không nên mình có customize thử.

Cũng khá là đơn giản thôi bạn chỉ cần tạo 1 file SocialGrant.php, mở trong package chắc rằng bạn cũng thấy họ có 1 file như thế này, dễ hiểu thôi vì mình cũng extends **League\OAuth2\Server\Grant\AbstractGrant** giống như họ, để tạo thêm 1 grant_type mới. Mình để có để trong folder app\Auth
Import đầy đủ Package Laravel Passport, Oauth2 gồm RequestEvent, Grant, Exception, ...
```php
use DateInterval;
use Laravel\Passport\Passport;
use Illuminate\Contracts\Auth\Authenticatable;
use Laravel\Passport\Bridge\User as UserEntity;
use Psr\Http\Message\ServerRequestInterface;
use League\OAuth2\Server\RequestEvent;
use League\OAuth2\Server\Grant\AbstractGrant;
use League\OAuth2\Server\Exception\OAuthServerException;
use League\OAuth2\Server\ResponseTypes\ResponseTypeInterface;
use League\OAuth2\Server\Repositories\RefreshTokenRepositoryInterface;
```
Và chúng ta cần extends class với AbstractGrant để tạo một grant_type mới
```php
class SocialGrant extends AbstractGrant
{
    //
}
```
Đăng ký Identifiercho grant_type, mình vẫn để tên là social. Các bạn có thể đổi thành grant_type khác vẫn okie nhé =)).
```php
    /**
     * {@inheritdoc}
     */
    public function getIdentifier()
    {
        return 'social';
    }
```
Validate params, kiểm tra user và trả ra access_token cho user, validate như thế nào mình sẽ nói chi tiết ở ngay phần bên dưới.
```php
    /**
     * {@inheritDoc}
     */
    public function respondToAccessTokenRequest(
        ServerRequestInterface $request,
        ResponseTypeInterface $responseType,
        DateInterval $accessTokenTTL
    ) {
        // Validate request
        $client = $this->validateClient($request);
        $scopes = $this->validateScopes($this->getRequestParameter('scope', $request));
        $user = $this->validateUser($request);
        // Finalize the requested scopes
        $scopes = $this->scopeRepository
            ->finalizeScopes($scopes, $this->getIdentifier(), $client, $user->getIdentifier());
        // Issue and persist new tokens
        $accessToken = $this->issueAccessToken($accessTokenTTL, $client, $user->getIdentifier(), $scopes);
        $refreshToken = $this->issueRefreshToken($accessToken);
        // Inject tokens into response
        $responseType->setAccessToken($accessToken);
        $responseType->setRefreshToken($refreshToken);
      
        return $responseType;
    }
```
Như mình có nói ở trên là mình muốn thay đổi một số params của request. Mình có thay 2 params là service và token. Service chính là tên các mạng xã hội: facebook, google chẳng hạn. Token chính là access_token để truy cập lên mạng xã hội của user mà app đã lấy ra được.
```php
    /**
     * @param ServerRequestInterface $request
     * @return UserEntityInterface
     * @throws OAuthServerException
     */
    protected function validateUser(ServerRequestInterface $request)
    {
        $user = $this->resolver->resolve(
            $this->getParameter('service', $request),
            $this->getParameter('token', $request),
        );
        if($user instanceof Authenticatable)
        {
            $user = new UserEntity($user->getAuthIdentifier());
        }
        if ($user instanceof UserEntityInterface === false) {
            $this->getEmitter()->emit(new RequestEvent(RequestEvent::USER_AUTHENTICATION_FAILED, $request));
            throw OAuthServerException::invalidCredentials();
        }
        return $user;
    }
  
    protected function getParameter($param, ServerRequestInterface $request, $required = true)
    {
        $value = $this->getRequestParameter($param, $request);
        if (is_null($value) && $required) {
            throw OAuthServerException::invalidRequest($param);
        }
        return $value;
    }
```

Tổng hợp lại:
```php
<?php

namespace App\Auth;

use DateInterval;
use Laravel\Passport\Passport;
use Laravel\Passport\Bridge\User as UserEntity;
use Psr\Http\Message\ServerRequestInterface;
use League\OAuth2\Server\RequestEvent;
use League\OAuth2\Server\Grant\AbstractGrant;
use League\OAuth2\Server\Exception\OAuthServerException;
use League\OAuth2\Server\ResponseTypes\ResponseTypeInterface;
use League\OAuth2\Server\Repositories\RefreshTokenRepositoryInterface;

class SocialGrant extends AbstractGrant
{
    /**
     * @var SocialUserRepository
     */
    protected $socialUserRepository;
    
    public function __construct(
        SocialUserRepository $socialUserRepository,
        RefreshTokenRepositoryInterface $refreshTokenRepository
    ) {
        $this->socialUserRepository = $socialUserRepository;
        $this->setRefreshTokenRepository($refreshTokenRepository);
        $this->refreshTokenTTL = Passport::refreshTokensExpireIn();
    }
    
    /**
     * {@inheritDoc}
     */
    public function respondToAccessTokenRequest(
        ServerRequestInterface $request,
        ResponseTypeInterface $responseType,
        DateInterval $accessTokenTTL
    ) {
        // Validate request
        $client = $this->validateClient($request);
        $scopes = $this->validateScopes($this->getRequestParameter('scope', $request));
        $user = $this->validateUser($request);
        // Finalize the requested scopes
        $scopes = $this->scopeRepository
            ->finalizeScopes($scopes, $this->getIdentifier(), $client, $user->getIdentifier());
        // Issue and persist new tokens
        $accessToken = $this->issueAccessToken($accessTokenTTL, $client, $user->getIdentifier(), $scopes);
        $refreshToken = $this->issueRefreshToken($accessToken);
        // Inject tokens into response
        $responseType->setAccessToken($accessToken);
        $responseType->setRefreshToken($refreshToken);
      
        return $responseType;
    }
    
    /**
     * @param ServerRequestInterface $request
     * @return UserEntityInterface
     * @throws OAuthServerException
     */
    protected function validateUser(ServerRequestInterface $request)
    {
        $user = $this->resolver->resolve(
            $this->getParameter('service', $request),
            $this->getParameter('token', $request),
        );
        if($user instanceof Authenticatable)
        {
            $user = new UserEntity($user->getAuthIdentifier());
        }
        if ($user instanceof UserEntityInterface === false) {
            $this->getEmitter()->emit(new RequestEvent(RequestEvent::USER_AUTHENTICATION_FAILED, $request));
            throw OAuthServerException::invalidCredentials();
        }
        return $user;
    }
  
    protected function getParameter($param, ServerRequestInterface $request, $required = true)
    {
        $value = $this->getRequestParameter($param, $request);
        if (is_null($value) && $required) {
            throw OAuthServerException::invalidRequest($param);
        }
        return $value;
    }
 
    /**
     * {@inheritdoc}
     */
    public function getIdentifier()
    {
        return 'social';
    }
}
```
Tiếp theo tạo một Service Provider có tên
```php
<?php

namespace App\Providers;

use Laravel\Passport\Passport;
use App\Auth\SocialGrant;
use App\Auth\SocialUserRepository;
use Illuminate\Support\ServiceProvider;
use League\OAuth2\Server\AuthorizationServer;
use Laravel\Passport\Bridge\RefreshTokenRepository;

class OAuthGrantServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->app->afterResolving(AuthorizationServer::class, function (AuthorizationServer $server) {
            $server->enableGrantType($this->makeSocialGrant(), Passport::tokensExpireIn());
        });
    }
    
    protected function makeSocialGrant()
    {
        return new SocialGrant(
            $this->app->make(RefreshTokenRepository::class)
        );
    }
}
```
Đăng ký trong config/app.php
```php
App\Providers\OAuthGrantServiceProvider::class,
```
Done, giờ các bạn test thử trên postman
![](https://images.viblo.asia/1c92176d-8d91-4a6e-be03-50e72287abf4.png)
### Kết Luận
Vậy là đã giải quyết xong vấn đề login social cho app với server laravel rồi đúng không nào. Các bạn hoàn toàn có thể sử dụng luôn package hoặc customize lại như mình vừa chia sẻ. Mong được sự góp ý của mọi người
![](https://images.viblo.asia/de712910-d0ef-4e55-aaf8-d7cffca1e892.jpg)