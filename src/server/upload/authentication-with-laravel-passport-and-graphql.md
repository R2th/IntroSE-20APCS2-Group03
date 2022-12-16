# Mở đầu
Chào các bạn, giờ đã là 2019 rồi, do Tết ăn nhiều bánh chưng quá nên sợ quên, nên hôm nay mình xin được chia sẻ về Authentication sử dụng Laravel Passport và GraphQL, vừa để nhớ lại kiến thức về GraphQL, vừa tìm hiểu và học thêm những điều mới. Và cũng không hiểu sao mình cứ thấy ấn tượng với anh `GraphQL` này =))<br>Kể từ ngày công bố ra mắt vào năm 2015, tính đến nay GraphQL được Facebook công bố ra đời đã được khoảng 4 năm. Sự mạnh mẽ của GraphQL đã được rất nhiều công ty phần mềm lớn sử dụng, nổi tiếng nhất chắc chắn là Facebook  :D .  Khi nhắc đến GraphQL, điều đầu tiên mình nghĩ đến về nó đó là "Single endpoint". Trước đây mình cũng đã tìm hiểu và có những bài viết về GraphQL kết hợp với Nuxt.js, các bạn có thể tham khảo tại [link này](https://viblo.asia/u/vunguyen10111995), và mình cũng đã up lên heroku để demo tại [đây](https://nuxt-graphql.herokuapp.com/users). Giờ chúng ta bắt đầu vào phần nội dung của bài thôi.

# Nội dung
### 1. Cài đặt Laravel Passport (Laravel 5.7)
Clone project Laravel:
```shell
composer create-project --prefer-dist laravel/laravel passport-graphql
```
```
php artisan key:generate
```
```
composer require laravel/passport
php artisan migrate
php artisan passport:install
```
Sửa file `User.php`:
```php
use Laravel\Passport\HasApiTokens;
{
    use HasApiTokens;
}
```
Sửa file `AuthServiceProvider.php`:
```php
use Laravel\Passport\Passport;

public function boot()
{
    $this->registerPolicies();

    Passport::routes(function ($router) {
        $router->forAccessTokens();
    });
}
```
Sửa file `auth.php`:
```php
'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],

    'api' => [
        'driver' => 'passport', //default is 'token'
        'provider' => 'users',
    ],
],
```
Tạo dữ liệu cho bảng `User`:
```php
php artisan ti
factory(App\User::class, 5)->create();
```
Trước hết mình thử test xem Laravel Passport có hoạt động chưa:
<div align="center">
    
**Mình sẽ test thử bằng postman nhé**


![](https://images.viblo.asia/a586ba7c-9acc-4aa9-8b77-295b12a5eb92.png)

![](https://images.viblo.asia/f31a5a45-ad01-4c1f-9fbf-4d15336a26aa.png)
</div>

Kết quả ok rồi nhé  các bạn. Điều này chứng tỏ mình đã cài đặt và sử dụng được `Laravel Passport`. Giờ mình sẽ sử dụng nó với GraphQL.
### 2. Cài đặt GraphQL kết hợp sử dụng Laravel Passport
Ở bài viết trước đó mình cũng hướng dẫn cài đặt [GraphQL](https://github.com/Folkloreatelier/laravel-graphql) cho Laravel rồi, các bạn có thể xem tại [bài viết này](https://viblo.asia/p/xay-dung-ung-dung-don-gian-voi-laravel-va-nuxtjs-su-dung-graphql-phan-1-Do754J2LZM6). Tuy nhiên lần này mình sẽ sử dụng package [rebing/graphql-laravel](https://github.com/rebing/graphql-laravel).
```
composer require rebing/graphql-laravel
```
Sau khi cài đặt, bạn run `php artisan route:list` lên nếu thấy route của `GraphQL` tức là bạn đã có thể sử dụng rồi. <br>
Ở đây mình sử dụng `GraphQL` sử dụng với `Laravel Passport` nhưng thực chất là route khi cài đặt Passport đã có rồi, vì vậy mục đích ở đây của mình là sẽ gọi đến nó và xử lý. <br>
Trước hết các bạn định nghĩa  `Schema` cho model `User` như sau:
```bash
php artisan make:graphql:type UserType
```
Mở `UserType.php` tại `app\GraphQL\Type\UserType.php`:
```php
<?php

namespace App\GraphQL\Type;

use Rebing\GraphQL\Support\Type as GraphQLType;
use GraphQL\Type\Definition\Type;

class UserType extends GraphQLType
{
    public function fields()
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::int())
            ],

            'name' => [
                'type' => Type::string()
            ],

            'email' => [
                'type' => Type::string()
            ],
        ];
    }
}
```
Tạo query users:
```
php artisan make:graphql:query AllUserQuery
```
Mục đích của mình ở đây đó là nếu người dùng nào đăng nhập thì sẽ có thể xem được tất cả thông tin của các user khác. <br> Có vẻ hơi sai sai nhưng đây chỉ là ví dụ thôi :) <br>
Sau khi run xong command trên, các bạn sửa cho mình file `AllUserQuery.php` tại `app\Query\AllUserQuery.php`:
```php
<?php

namespace App\GraphQL\Query;

use GraphQL\Type\Definition\Type;
use GraphQL;
use App\User;
use Rebing\GraphQL\Support\Query;

class AllUserQuery extends Query
{
    public function type()
    {
        return Type::listOf(GraphQL::type('user'));
    }

    public function args()
    {
        return [
            'id' => ['name' => 'id', 'type' => Type::int()],
            'name' => ['name' => 'name', 'type' => Type::string()],
            'email' => ['name' => 'email', 'type' => Type::string()],
        ];
    }

    public function resolve($root, $args)
    {
        $users = User::all();

        if (isset($args['name'])) {
            $users = $users->where('name', $args['name']);
        }

        if (isset($args['id'])) {
            $users = $users->where('id', $args['id']);
        }
        
        if (isset($args['email'])) {
            $users = $users->where('email', $args['email']);
        }

        return $users;
    }
}
```
Sau đó bạn mở file `config/graphql.php` và config cho mình như sau:
```php
'schemas' => [
        'default' => [
            'query' => [
                
            ],
            'mutation' => [
                // 'example_mutation'  => ExampleMutation::class,
            ],
            'middleware' => [],
            'method' => ['get', 'post'],
        ],

        'secret' => [
            'query' => [
                'currentUser' => \App\GraphQL\Query\AllUserQuery::class,
            ],
            'middleware' => ['auth:api']
        ]
    ],

    // The types available in the application. You can then access it from the
    // facade like this: GraphQL::type('user')
    //
    // Example:
    //
    // 'types' => [
    //     'user' => 'App\GraphQL\Type\UserType'
    // ]
    //
    'types' => [
        'user' => \App\GraphQL\Type\UserType::class,
        // 'example'           => ExampleType::class,
        // 'relation_example'  => ExampleRelationType::class,
    ],
```
Nhìn vào đoạn code trên chắc các bạn cũng hiểu mình đang muốn làm gì rồi phải không. `GraphQL` cho phép bạn có thể config các `router` rất đa dạng mà vẫn đảm bảo đầy đủ những gì mà bạn vẫn thường làm với `RESTful`. Thử với `Postman` nhé. Nếu nó ra lỗi **401 Unauthenticated** tức là mình đã config thành công.

<div align="center">
    
![](https://images.viblo.asia/da6697da-e6ad-4ade-b1dd-bc3587f59cac.png)

</div>

<br>Đúng rồi nè các bạn. Hehe. <br>
Giờ mình sẽ dùng `GraphQL` thông qua Passport để lấy `access_token`. Để làm được điều này, đầu tiên mình tạo một `Mutation` :
```
php artisan make:graphql:mutation LoginMutation
```
Sửa lại file `app\GraphQL\Mutation\LoginMutation.php`:
```php
<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use GraphQL;
use Illuminate\Http\Request;
use Illuminate\Auth\AuthenticationException;

class LoginMutation extends Mutation
{
    protected $attributes = [
        'name' => 'LoginMutation',
        'description' => 'A mutation'
    ];

    public function type()
    {
        return Type::listOf(Type::string());
    }

    public function args()
    {
        return [
            'username' => ['name' => 'username', 'type' => Type::nonNull(Type::string())],
            'password' => ['name' => 'password', 'type' => Type::nonNull(Type::string())],
        ];
    }

    public function resolve($root, $args)
    {
        $credentials = [
            'client_id' => env('PASSPORT_CLIENT_ID'),
            'client_secret' => env('PASSPORT_CLIENT_SECRET'),
            'grant_type' => 'password',
            'username' => $args['username'],
            'password' => $args['password']
        ];

        $token = $this->makeRequest($credentials);

        return $token;
    }

    public function makeRequest(array $credentials)
    {
        $request = Request::create('oauth/token', 'POST', $credentials,[], [], [
            'HTTP_Accept' => 'application/json'
        ]);
        $response = app()->handle($request);
        $decodedResponse = json_decode($response->getContent(), true);
        if ($response->getStatusCode() != 200) {
            throw new AuthenticationException($decodedResponse['message']);
        }
        return $decodedResponse;
    }
}
```
Các bạn nhớ config lại trong file `graphql.php` nhé
```php
'schemas' => [
    'default' => [
        'query' => [

        ],
        'mutation' => [
            'signIn' => \App\GraphQL\Mutation\LoginMutation::class
        ],
        'middleware' => [],
        'method' => ['get', 'post'],
    ],

    'secret' => [
        'query' => [
            'currentUser' => \App\GraphQL\Query\AllUserQuery::class,
        ],
        'middleware' => ['auth:api']
    ]
],
```
<div align="center">
    
**Mình thử test xem sao nhé**

![](https://images.viblo.asia/162f5acd-c582-44a5-aae2-8af3b3a13c81.png)
<br>
**Lại đúng luôn :)**
![](https://images.viblo.asia/08d9e219-3309-40a5-8e3f-51c003d57c1b.png)
<br>
**Lại đúng nữa rồi :D**
</div>

Một lợi ích nữa khi sử dụng `GraphQL` mà các bạn có thể thấy đó là bạn có thể lấy trường nào mà mình muốn, k nhất thiết phải phụ thuộc quá nhiều vào `server` trả về những gì. 
# Kết luận
Với cá nhân mình, mình rất thích `GraphQL`, cũng vì nó ra đời cũng không lâu, vì vậy mình luôn cố gắng để sử dụng nó kết hợp với những gì mình đã biết cũng như muốn tìm hiểu. Mình nghĩ trong tương lại không xa, `GraphQL` sẽ thay thế `RESTful` nhờ sự linh động của nó. 

Đây là link [source code](https://github.com/vunguyen10111995/graphql-laravelpassport) của mình.

Cuối cùng, cảm ơn các bạn đã dành thời gian đọc bài viết này của mình.

<div align="center">
    
   ![](https://images.viblo.asia/7ecd1943-b49b-455c-b1f9-00e968ac8139.gif)
    
</div>