Tiếp nối bài viết [Biến ứng dụng Laravel của bạn trở nên phức tạp hơn với gRPC](https://viblo.asia/p/bien-ung-dung-laravel-cua-ban-tro-nen-phuc-tap-hon-voi-grpc-gGJ59GMpZX2) , trong bài viết trước chúng ta implement xong phía gRPC server rồi. Hôm nay tiếp tục sẽ là phía client. Làm thế nào để client có thể thực thi các method rpc được đặt trên server ?
![](https://images.viblo.asia/retina/c75353d1-a0ab-455b-96fe-b20968f92747.png)

# Implement gRPC client
## Init project
Mình lại init 1 project Laravel cho phía client luôn nhé

```bash
$ composer create-project laravel/laravel grpc-php-server
```
sau đó chúng ta cần cài thêm các package cần thiết như `grpc/grpc`, `spiral/php-grpc`, `google/common-protos`,... thành phẩm chúng ta sẽ có 1 file composer.json như này

```json:composer.json
{
    "name": "laravel/laravel",
    "type": "project",
    "description": "The Laravel Framework.",
    "keywords": ["framework", "laravel"],
    "license": "MIT",
    "require": {
    "php": "^7.4|^8.0",
        "ext-grpc": "*",
        "ext-json": "*",
        "fideloper/proxy": "^4.4",
        "fruitcake/laravel-cors": "^2.0",
        "google/common-protos": "^1.3",
        "grpc/grpc": "^1.36",
        "guzzlehttp/guzzle": "^7.0.1",
        "laravel/framework": "^8.40",
        "laravel/tinker": "^2.5",
        "spiral/php-grpc": "^1.5"
    },
    "require-dev": {
    "facade/ignition": "^2.5",
        "fakerphp/faker": "^1.9.1",
        "laravel/sail": "^1.0.1",
        "mockery/mockery": "^1.4.2",
        "nunomaduro/collision": "^5.0",
        "phpunit/phpunit": "^9.3.3"
    },
    "autoload": {
    "psr-4": {
        "App\\": "app/",
            "Database\\Factories\\": "database/factories/",
            "Database\\Seeders\\": "database/seeders/",
            "": "protos/generated/"
        }
    },
    "autoload-dev": {
    "psr-4": {
        "Tests\\": "tests/"
        }
    },
    "scripts": {
    "post-autoload-dump": [
        "Illuminate\\Foundation\\ComposerScripts::postAutoloadDump",
        "@php artisan package:discover --ansi"
    ],
        "post-root-package-install": [
        "@php -r \"file_exists('.env') || copy('.env.example', '.env');\""
    ],
        "post-create-project-cmd": [
        "@php artisan key:generate --ansi"
    ]
    },
    "extra": {
    "laravel": {
        "dont-discover": []
        }
    },
    "config": {
    "optimize-autoloader": true,
        "preferred-install": "dist",
        "sort-packages": true
    },
    "minimum-stability": "dev",
    "prefer-stable": true
}
```
Trong phần autoload thì trong bài viết trước có đề cập tới rồi, bạn có thể xem lại bài viết trước.

## Tạo file auth.proto
Do là project này là client của server trước, nên chúng ta chỉ cần lấy lại file `auth.proto` của server và đặt vào trong thư mục của project thôi.

Sau đó chúng ta tiến hành compile file này ra thành các file php để sử dụng. Tuy nhiên do sử dụng ở client nên chúng ta không cần `php-grpc` để compile thành interface và override lại logic nữa, mà chúng ta sẽ compile thành `AuthServiceClient` luôn.

Để compile thành Client thì chúng ta vẫn dùng protoc để compile thôi, bạn quay lại bài viết trước để xem phần cài đặt protoc và xem cách cài đặt plugin php cho client ở đây. Hoặc nếu không muốn phức tạp thì dùng docker luôn vậy, image namely/protoc-all đã support kha khá các ngôn ngữ cho client rồi.

Đơn giản bạn chỉ cần chạy command này trong project
```
$ docker run -v `pwd`:/defs namely/protoc-all -f ./protos/auth.proto -l php -o ./protos/generated
```
và kết quả là bạn sẽ có client
```php:protos\generated\Protobuf\Identity\AuthServiceClient.php
<?php
// GENERATED CODE -- DO NOT EDIT!

namespace Protobuf\Identity;

/**
 */
class AuthServiceClient extends \Grpc\BaseStub {

    /**
     * @param string $hostname hostname
     * @param array $opts channel options
     * @param \Grpc\Channel $channel (optional) re-use channel object
     */
    public function __construct($hostname, $opts, $channel = null) {
        parent::__construct($hostname, $opts, $channel);
    }

    /**
     * @param \Protobuf\Identity\SignInRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return \Grpc\UnaryCall
     */
    public function SignIn(\Protobuf\Identity\SignInRequest $argument,
                           $metadata = [], $options = []) {
        return $this->_simpleRequest('/protobuf.identity.AuthService/SignIn',
            $argument,
            ['\Protobuf\Identity\Response', 'decode'],
            $metadata, $options);
    }

    /**
     * @param \Protobuf\Identity\SignUpRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return \Grpc\UnaryCall
     */
    public function SignUp(\Protobuf\Identity\SignUpRequest $argument,
                           $metadata = [], $options = []) {
        return $this->_simpleRequest('/protobuf.identity.AuthService/SignUp',
            $argument,
            ['\Protobuf\Identity\Response', 'decode'],
            $metadata, $options);
    }

}
```
## Implement gRPC service
Để thuận tiện hơn trong việc lấy instance của Client vừa compile trên sử dụng thì chúng ta sẽ viết 1 service return ra instance của gRPC client. Đầu tiên, trong file `config/grpc.php` mình sẽ define cấu hình của gRPC client:

```php:config/grpc.php
<?php

return [
    'services' => [
        'Protobuf\\Identity\\AuthServiceClient' => [
            'host' => env('AUTH_SERVICE_HOST'),
            'authentication' => 'insecure',
            'cert' => env('AUTH_SERVICE_CERT')
        ],
    ],
];
```
đơn giản trong này chứa thông tin về các service mà app sử dụng. host là thông tin của gRPC server trong bài viết trước : `localhost:9001`, `authentication` và `cert` là mô tả giao thức xác thực giữa client và server có sử dụng secure protocol hay không, và giá trị của file cert nếu sử dụng secure protocol.

Tiếp theo đến file Service dùng để tạo instance gRPC client
```php:App\Service\Grpc\ConfigurableClientFactory.php
<?php

namespace App\Service\Grpc;

use App\Service\Grpc\Contracts\ClientFactory;
use Illuminate\Contracts\Config\Repository as Config;

class ConfigurableClientFactory implements ClientFactory
{

    /**
     * @var Config
     */
    protected Config $config;


    /**
     * ConfigurableClientFactory constructor.
     * @param  Config $config
     */
    public function __construct(Config $config)
    {
        $this->config = $config;
    }


    /**
     * @param string $client
     * @return mixed
     */
    public function make(string $client)
    {
        $config = $this->config->get("grpc.services.{$client}");

        $authentication = strtoupper($config['authentication']);
        $authenticationMethod = "create{$authentication}Credentials";

        $credentials = $this->{$authenticationMethod}($config);

        $client = new $client($config['host'], [
            'credentials' => $credentials
        ]);

        return $client;
    }


    /**
     * @param  array $config
     * @return \Grpc\ChannelCredentials
     */
    protected function createTlsCredentials(array $config)
    {
        $cert = file_get_contents($config['cert']);

        return \Grpc\ChannelCredentials::createSsl($cert);
    }


    /**
     * @param  array $config
     * @return \Grpc\ChannelCredentials
     */
    protected function createInsecureCredentials(array $config)
    {
        return \Grpc\ChannelCredentials::createInsecure();
    }
}
```
## Implement controller
Ở phía client, chúng ta sẽ implement nó ở trong controller

```php:App\Http\Controllers\AuthController.php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Service\Grpc\Contracts\ErrorHandler;
use App\Service\Grpc\Contracts\ClientFactory;
use Protobuf\Identity\AuthServiceClient;
use Protobuf\Identity\SignInRequest;
use Protobuf\Identity\SignUpRequest;

class AuthController extends Controller
{
    protected ClientFactory $grpcClientFactory;

    protected ErrorHandler $errorHandler;

    public function __construct(ClientFactory $grpcClientFactory, ErrorHandler $errorHandler)
    {
        $this->grpcClientFactory = $grpcClientFactory;
        $this->errorHandler = $errorHandler;
    }


    public function signUp(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:6',
        ]);

        $client = $this->grpcClientFactory->make(AuthServiceClient::class);

        $signUpRequest = new SignUpRequest();

        $signUpRequest->setEmail($request->input("email"));
        $signUpRequest->setName($request->input("name"));
        $signUpRequest->setPassword($request->input("password"));
        $signUpRequest->setPasswordConfirmation($request->input("password_confirmation"));

        [$response, $status] = $client->SignUp($signUpRequest)->wait();

        $this->errorHandler->handle($status, 3);

        $data = [
            "id" => $response->getId(),
            "token" => $response->getToken()
        ];

        return response()->json($data);
    }


    public function signIn(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $client = $this->grpcClientFactory->make(AuthServiceClient::class);

        $signInRequest = new SignInRequest();

        $signInRequest->setEmail($request->input("email"));
        $signInRequest->setPassword($request->input("password"));

        [$response, $status] = $client->SignIn($signInRequest)->wait();

        $this->errorHandler->handle($status, 3);

        $data = [
            "id" => $response->getId(),
            "token" => $response->getToken()
        ];

        return response()->json($data);
    }
}
```
Khá đơn giản thôi, trong func signIn thì mình tạo instance là gRPC client, sau đó sử dụng instance này để gọi **method rpc SignIn** (được implement logic ở gRPC server), method SignIn trong file `auth.proto` được define nhận vào SignInRequest.

Và giờ sẽ test việc giao tiếp giữa client và server thôi Server
![](https://media.giphy.com/media/qbeL916sxabHrl7Lqu/giphy.gif)

![](https://images.viblo.asia/a2144d33-4627-4ed6-bec5-7d90b769cf8c.png)
**Phía server đã nhận được request từ client**

# Tạm kết
Sau ví dụ này, hy vọng các bạn đã hiểu về cách implement gRPC cho PHP app cả phía server và client. Các bạn có thêm tham khảo source code ở đây:

- https://github.com/daothaison/grpc-php-client
- https://github.com/daothaison/grpc-php-server

Trong bài viết tới chúng ta sẽ đi sâu hơn vào ưu nhược điểm của gRPC, xem điểm mạnh và điểm yếu so với REST hay các protocol khác nhé 😄