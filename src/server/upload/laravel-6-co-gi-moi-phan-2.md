### Upgrading to 6.0

[Laravel documentation](https://laravel.com/docs/6.x/upgrade) ước tính sẽ mất khoảng một giờ để nâng cấp từ 5,8 lên 6,0. Dự án của bạn có thể có các dêpndencies và các external package có thể tăng thêm thời gian đó, vì vậy hãy ghi nhớ điều đó khi bạn quyết định upgrade.

**How to upgrade to Laravel 6.0**

Trong file ```composer.json```, thay đổi Laravel framework dependency từ ```5.8.*``` thành ```^6.0```. Nếu bạn đang dùng phiên bản trước 5,8, bạn nên [upgrade up to 5.8](https://laravel.com/docs/5.8/upgrade) trước khi chuyển sang 6.0.

```
// In composer.json
"laravel/framework": "^6.0",
```

Sau đó bạn chạy terminal command:

```
composer update
```

<br>

**Laravel Shift**

Một cách tuyệt vời khác để quản lý các bản upgrades của bạn, đặc biệt đối với các ứng dụng lớn hơn, là sử dụng [Laravel Shift](https://laravelshift.com/). Shift là một tool tự động sẽ upgrade cho bạn.


***It works like this:***

* Cấp cho Shift quyền truy cập Laravel repository của bạn
* Chọn phiên bản Laravel mà bạn muốn upgrade
* Shift tạo một branch mới và sửa đổi những gì cần thay đổi trong code của bạn
* Shift tạo một pull request để bạn có thể kiểm tra và quyết định xem có nên merge không

Quá trình này rất đơn giản và là một lựa chọn tuyệt vời nếu chỉ đơn giản là thay đổi package version trong ```composer.json``` không phù hợp với bạn. Dịch vụ này không miễn phí, nhưng phí một lần rất thấp.

<br>

Bạn có thể tìm cấu trúc upgrade cho 6.0 [tại đây](https://laravelshift.com/upgrade-laravel-5.8-to-laravel-6.0)

<br>

**Do I need to Upgrade?**

Laravel 6.0 là phiên bản ```Long Term Support release``` muộn nhất, có nghĩa là bug fix sẽ được đảm bảo trong hai năm và security fix trong ba năm. Bản phát hành LTS trước đó với những đảm bảo này là Laravel 5.5.

Bảng này từ website của Laravel phác thảo lịch trình hỗ trợ hiện tại:

![](https://images.viblo.asia/f2eb916c-a0ac-41db-afd0-a8630a163edc.png)

Với các bản sửa lỗi cho bản phát hành LTS trước đó sẽ kết thúc sớm, có thể đáng để nâng cấp lên 6.0 để bạn biết rằng dự án của bạn sẽ được hỗ trợ thêm vài năm nữa.

### Aside: Securing Laravel APIs with Auth0

Việc bảo mật Laravel API bằng Auth0 rất dễ dàng và mang lại rất nhiều tính năng tuyệt. Với Auth0, chúng ta chỉ phải viết một vài dòng code để nhận:

* A solid [identity management solution](https://auth0.com/user-management), include [single sign-on](https://auth0.com/docs/sso/current)
* [User management](https://auth0.com/docs/users/concepts/overview-user-profile)
* Support for [social identity providers (like Facebook, GitHub, Twitter, etc.)](https://auth0.com/docs/identityproviders)
* [Enterprise identity providers (Active Directory, LDAP, SAML, etc.)](https://auth0.com/enterprise)
* Our [own database of users](https://auth0.com/docs/connections/database/mysql)

**Sign Up for Auth0**

Bạn sẽ cần một tài khoản [Auth0](https://auth0.com/) để quản lý authentication. Bạn có thể đăng ký một [tài khoản miễn phí tại đây](https://auth0.com/signup). Tiếp theo, cài đặt một Auth0 API.

**Set Up an API**

Chuyển đến [APIs](https://manage.auth0.com/#/apis) trong Auth0 dashboard của bạn và nhấp vào nút "Create API". Nhập tên cho API. Đặt **Identifier** thành một URL (URL tồn tại hoặc không tồn tại). **Signing Algorithm** phải là ```RS256```.

![](https://images.viblo.asia/d5e06fe6-6c64-4b26-9817-b7cd11b927e6.png)https://images.viblo.asia/d5e06fe6-6c64-4b26-9817-b7cd11b927e6.png

*Create API on Auth0 dashboard*

Bây giờ chúng ta đã sẵn sàng để implement Auth0 authentication trên Laravel backend API của chúng ta.

**Dependencies and Setup**

Cài đặt package ```laravel-auth0``` qua composer như sau:

```
composer require auth0/login:"~5.0"
```

Tạo configl file cho package ```laravel-auth0``` như sau:


```
php artisan vendor:publish
```

Sau khi file được tạo, nó sẽ được đặt tại ```config/laravel-auth0.php```. Chắc chắn rằng bạn thay thế các giá trị ```placeholder``` bằng các giá trị xác thực từ Auth0 Admin Dashboard. Kiểm tra kỹ giá trị của bạn với [laravel-auth0](https://github.com/auth0-samples/auth0-laravel-api-samples/blob/master/01-Authorization-RS256/config/laravel-auth0.php).

File ```.env``` của bạn nên có các giá trị ```AUTH0_DOMAIN```, ```AUTH0_CLIENT_ID```, ```AUTH0_CLIENT_SECRET``` và ```AUTH0_CALLBACK_URL``` như sau:

```
AUTH0_DOMAIN=kabiyesi.auth0.com
AUTH0_CLIENT_ID=xxxxxxxxxxxxxxxxxx
AUTH0_CLIENT_SECRET=xxxxxxxxxxxxxxxxx
AUTH0_AUDIENCE=http://mylaravelapi.com
AUTH0_CALLBACK_URL=null
```

**Activate Provider and Facade**

Package ```laravel-auth0``` đi kèm với một provider có tên là ```LoginServiceProvider```. Thêm phần này vào danh sách các nhà ```providers``` của ứng dụng.

```
// config/app.php
'providers' => array(
    // ...
    \Auth0\Login\LoginServiceProvider::class,
);
```

Nếu bạn muốn sử dụng ```Auth0``` Facade, thêm nó vào danh sách ```aliases```.

```
// config/app.php
'aliases' => array(
    // ...
    'Auth0' => \Auth0\Login\Facade\Auth0::class,
);
```

Thông tin người dùng có thể được truy cập bằng gọi ```Auth0::getUser()```. Cuối cùng, bạn cần liên kết một class cung cấp người dùng (người dùng mô hình ứng dụng của bạn) mỗi khi người dùng đăng nhập hoặc ```access_token``` được decode. Bạn có thể sử dụng ```Auth0UserRepository``` được cung cấp bởi package này hoặc bạn có thể xây dựng class của riêng mình.

Để sử dụng ```Auth0UserRepository```, thêm các dòng sau vào ```AppServiceProvidder``` của bạn:

```
// app/Providers/AppServiceProvider.php
public function register()
{
    $this->app->bind(
      \Auth0\Login\Contract\Auth0UserRepository::class, 
      \Auth0\Login\Repository\Auth0UserRepository::class
    );
}
```

**Configure Authentication Driver**

Package ```laravel-auth0``` đi kèm với một authentication driver được gọi là ```auth0```. Driver này xác định cấu trúc user bao bọc user profile được chuẩn hóa được xác định bởi Auth0. Nó không thực sự tồn tại object mà chỉ đơn giản là lưu trữ nó trong session cho các lần gọi trong tương lai.

Điều này là đủ cho basic testing hoặc nếu bạn không có yêu cầu để duy trì user. Tại bất kỳ nơi nào, bạn có thể gọi ```Auth::check ()``` để xác định xem có user nào đã đăng nhập và ```Auth::user()``` để truy xuất thông tin user.

Config driver trong ```config/auth.php``` để sử dụng ```auth0```.

```
// app/config/auth.php
// ...
'providers' => [
    'users' => [
        'driver' => 'auth0'
    ],
],
```

**Secure API Routes**

API routes của bạn được định nghĩa trong ```routes/api.php``` cho các ứng dụng Laravel 5.3+.

```
// routes/api.php

<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/public', function (Request $request) {
  return response()->json(["message" => "Hello from a public endpoint! You don't need any token to access this URL..Yaaaay!"]);
});

Route::get('/wakanda', function (Request $request) {
  return response()->json(["message" => "Access token is valid. Welcome to this private endpoint. You need elevated scopes to access Vibranium."]);
})->middleware('auth:api');
```

Bây giờ, bạn có thể gửi request đến enpoint được bảo vệ của bạn trong đó bao gồm ```access_token```.

```
curl --request GET \
  --url http://localhost:8000/api/wakanda \
  --header 'authorization: Bearer <ACCESS TOKEN>'
```

Mỗi khi người dùng chạm vào ```api/wakanda``` endpoint, một JWT ```access_token``` hợp lệ sẽ được yêu cầu trước khi resource được release. Với điều này, các private routes sẽ được bảo vệ.

**More Resources**

Đó là nó! Chúng ta có một authenticated Laravel API với các routes bảo vệ. Để tìm hiểu thêm, hãy xem các resource sau:

* [Why You Should Always Use Access Tokens to Secure an API](https://auth0.com/blog/why-should-use-accesstokens-to-secure-an-api/)
* [Laravel backend Quickstart](https://auth0.com/docs/quickstart/backend/laravel)
* [Navigating RS256 and JWKS](https://auth0.com/blog/navigating-rs256-and-jwks/)
* [Access Token](https://auth0.com/docs/tokens/access-tokens)
* [Verify Access Tokens](https://auth0.com/docs/api-auth/tutorials/verify-access-token)
* [Call APIs from Client-side Web Apps](https://auth0.com/docs/api-auth/grant/implicit)
* [How to implement the Implicit Grant](https://auth0.com/docs/api-auth/tutorials/implicit-grant)
* [Auth0.js Documentation](https://auth0.com/docs/libraries/auth0js/v9)
* [OpenID Standard Claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)

### Recap

Laravel đã mang lại rất nhiều sự hứng thú cho thế giới PHP và thật tuyệt khi thấy Framework và các sản phẩm đi kèm tiếp tục được cải thiện.

Với việc giới thiệu phiên bản semantic, bạn có thể upgrade giữa các phiên bản chính mà không phải lo lắng về những thay đổi lớn. Sự thay đổi này nhiều hơn là chỉ phiên bản, nó cho thấy rằng sau tất cả các cải tiến xuất hiện trong 5.x, framework hiện đang ở một điểm ổn định trong tương lai!

Ngoài phiên bản semantic, 6.0 còn mang đến những cải tiến về tốc độ khi truy cập các collection, bổ sung cho các lựa chọn subquery Eloquent, giới thiệu job middleware, ...

[Tài liệu đầy đủ](https://laravel.com/docs/6.x/installation) hiện đã có, vì vậy hãy xem nếu bạn muốn biết thêm thông tin về bản phát hành mới!

Và nếu bạn quan tâm đến việc thêm authentication vào ứng dụng Laravel 6.0 của mình, Auth0 cung cấp một [SDK cực kỳ đơn giản](https://auth0.com/docs/quickstart/webapp/laravel/01-login) có thể được tích hợp trong vài phút.


***Tài liệu:*** https://auth0.com/blog/whats-new-in-laravel-6/