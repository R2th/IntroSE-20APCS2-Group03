# gRPC là gì ?
![](https://images.viblo.asia/d057b46c-1f18-4e53-a0c8-f80f22f60f2b.jpeg)

Chắc hẳn khi mới đọc tiêu đề, nhiều bạn thắc mắc tại sao lại biến ứng dụng đơn giản trở nên phức tạp để làm gì không biết, nhưng thực ra việc phức tạp này sẽ mang lại cho chúng ta rất nhiều lợi ích, với những ứng dụng nhỏ thì gRPC chưa thực sự cần thiết, tuy nhiên áp vào các ứng dụng lớn, cần được mở rộng trong tương lai, việc chuyển đổi từ REST sang gRPC đem lại hiệu quả rất lớn.


## RPC 
![](https://images.viblo.asia/c75353d1-a0ab-455b-96fe-b20968f92747.png)

RPC, đó là chữ viết tắt của Remote Procedure Calls (tạm dịch là các cuộc gọi thủ tục từ xa), là một khái niệm nhằm cố gắng khái quát một lời gọi thủ tục thông thường trong trường hợp mà caller và receiver không cùng nằm trong một process - và được phân tán trên các máy riêng biệt. Việc này có ý nghĩa rất quan trọng vì trong các hệ thống phân tán (distributed system), application code ở nhiều server hơn là một server. Ví dụ thường thấy nhất chính là kiến trúc Microservice.

## gRPC
Tối ưu cho việc "giao tiếp" giữa các server là lý do gRPC ra đời.

gRPC là một RPC framework gíup bạn kết nối giữa các service trong hệ thống, nó hỗ trợ load balancing, tracing, health checking và authentication, hỗ trợ từ ứng dụng mobile, trình duyệt cho tới back-end service, do Google phát triển.

![](https://images.viblo.asia/419792bf-30a2-4cf2-8b4b-b74222825509.jpeg)

Để giải bài toán trên, gRPC đã sử dụng binary để truyền đi thay vì phải encode chúng thành các ngôn ngữ trung gian JSON/XML. Việc này rõ ràng đã làm tăng tốc giao tiếp các servers lên rất nhiều, giảm overhead cho CPUs. 

Thứ giúp gRPC giao tiếp binary ngon vậy chính là http/2, đây vốn là giao thức có rất nhiều cải tiến so với http/1.1

# Sử dụng gRPC trong PHP

Không giống như Java, Go, hay Ruby,... PHP hiện tại chưa được chính Google hỗ trợ xây dựng SDK để dựng thành 1 gRPC server. Vì thế chúng ta muốn sử gRPC cho server thì cần thông qua 1 framework gọi là RoadRunner.

> RoadRunner là 1 framework ở tầng infrastructure cho các ứng dụng PHP, nó được viết bằng Golang. Công việc của RoadRunner  là chạy PHP dưới dạng các worker

Golang sẽ giúp RoadRunner chạy PHP app trên goroutine và hỗ trợ cân bằng tải trên các worker.
![](https://images.viblo.asia/72807a60-7db9-4997-8fcd-0e3b3f096a02.png)

RoadRunner sẽ giữ các PHP worker luôn alive giữa các request, tránh việc tái khởi đọng lại app và tăng tốc cho các ứng dụng lớn. PHP worker được đặt trong resident memory, và luôn sẵn sàng cho request tiếp theo. RoadRunner còn sử dụng Goridge RPC sẽ giúp đẩy nhanh tốc độ load của ứng dụng lên server.

## Cài đặt gRPC 

Trước khi bắt đầu implement gRPC cho ứng dụng Laravel thì chúng ta setup môi trường development cho đủ các công cụ cần thiết

- gRPC PHP extension
- Google Protobuf
- Google Protobuf compiler cho PHP server
- Roadrunner

### gRPC PHP extension

Việc cài thêm extension khá đơn giản, bạn chỉ cần sử dụng PECL và chạy lệnh 

```bash
$ sudo pecl install grpc
```

Tuy nhiên nếu máy bạn có cài nhiều version PHP thì sẽ phức tạp hơn chút, mình đã gặp issue khi cài grpc là extension được build xong, khi sử dụng trong `php.ini` thì PHP không tìm thấy extension. Mình khắc phục bằng cách gỡ bỏ extension cũ và cài bằng lệnh này 

```bash
$ sudo pecl php_suffix=7.4 install grpc 
```
thật (magic) PECL sẽ compile extension cho đúng phiên bản PHP mà bạn đang chọn là PHP 7.4

Cuối cùng bạn tìm file `php.ini` và thêm dòng này vào `extension=grpc.so`

### Google Protobuf
Protocol buffer còn được biết như protobuf là language-neutral, platform-neutral của google phiên bản nội bộ được công bố vào năm 2001 và phiên bản công khai đầu tiên được giới thiệu vào năm 2008 ( Repository ), về cơ bản nó được sủ dụng để Serialized object, có vẻ nó khá giống XML hoặc JSON. Nó lưu trữ dữ liệu có cấu trúc có thể được Serialize hoặc De-Serialized tự động bưởi nhiều ngôn ngữ khác nhau. Nó được thiết kế để trở thành language/platform neutral và có thể mở rộng.

Việc cài protobuf cũng tương tự gRPC , bạn chạy command sau và rồi thêm dòng `extension=protobuf.so` vào `php.ini`

```bash
$ sudo pecl install protobuf
```

### Google Protobuf compiler cho PHP server

Bởi vì gRPC chưa trực tiếp hỗ trợ các server viết bằng PHP nên với PHP chúng ta sử dụng 1 plugin để compile các file .proto cho PHP server

``` bash
$ go get github.com/spiral/php-grpc/cmd/protoc-gen-php-grpc
```

để protoc có thể tìm thấy plugin mà bạn vừa kéo về thì bạn thêm vào file `.zshrc` (nếu đang dùng zsh) hoặc `.bashrc` 2 dòng này
```
export GO_PATH=~/go
export PATH=$PATH:/$GO_PATH/bin
```

đây là 1 pre-build binary để gen proto file, để sử dụng nó ta chỉ cần thêm plugin đó trong command compile ví dụ:

```bash
$ protoc --php_out=target-dir/ --php-grpc_out=target-dir/ sample.proto
```

### Roadrunner 

RoadRunner sẽ hỗ trợ bạn serve ứng dụng lên, tương tự nhưng `artisan` trong Laravel ý, bạn chỉ cần tải file `rr-grpc` về và để vào thư mục root của app 

RoadRunner sẽ hỗ trợ bạn serve ứng dụng lên, tương tự nhưng `artisan` trong Laravel ý, bạn chỉ cần tải file `rr-grpc` về và để vào thư mục root của app 
- https://github.com/spiral/php-grpc/releases

## Implement gRPC server

Trong bài viết này mình sẽ implement gRPC cho phía server bằng PHP, và sử dụng luôn framework Laravel chọn xịn xò =)) 

### Init project
Đầu tiền chúng ta cần init project

```bash
$ composer create-project laravel/laravel grpc-php-server
```

sau đó chúng ta cần cài thêm các package cần thiết như `spiral/php-grpc`, `google/common-protos`,... thành phẩm chúng ta sẽ có 1 file composer.json như này
```json:composer.json
{
    "name": "laravel/laravel",
    "type": "project",
    "description": "The Laravel Framework.",
    "keywords": ["framework", "laravel"],
    "license": "MIT",
    "require": {
        "php": "^7.4|^8.0",
        "ext-grpc": "^1.37",
        "fideloper/proxy": "^4.4",
        "fruitcake/laravel-cors": "^2.0",
        "google/common-protos": "^1.3",
        "google/protobuf": "^3.16",
        "grpc/grpc": "^1.36",
        "guzzlehttp/guzzle": "^7.0.1",
        "laravel/framework": "^8.12",
        "laravel/tinker": "^2.5",
        "nyholm/psr7": "^1.4",
        "spiral/php-grpc": "^v1.5.0",
        "spiral/roadrunner": "^1.9",
        "spiral/roadrunner-laravel": "^3.7",
        "ext-json": "*"
    },
    "require-dev": {
        "facade/ignition": "^2.5",
        "fakerphp/faker": "^1.9.1",
        "laravel/sail": "^1.0.1",
        "mockery/mockery": "^1.4.2",
        "nunomaduro/collision": "^5.0",
        "phpunit/phpunit": "^9.3.3",
        "spiral/dumper": "^1.1.7"
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
        "sort-packages": true,
        "platform": {
            "php": "7.4.18"
        }
    },
    "minimum-stability": "dev",
    "prefer-stable": true
}
```

Trong file `composer.json` này mình có bổ sung thêm 
```json:composer.json
"autoload": {
        "psr-4": {
            "App\\": "app/",
            "Database\\Factories\\": "database/factories/",
            "Database\\Seeders\\": "database/seeders/",
            "": "protos/generated/"
        }
    },
``` 
mục đích là để load thêm các file được compile từ Protobuf vào project.

### Tạo auth.proto

Mục đích của file này là giúp define ra các service và cấu trúc request/response. File này sẽ được viết bằng Protobuf hay Protocols Buffer, là một ngôn ngữ dùng để mô tả các cấu trúc dữ liệu, chúng ta dùng protoc để biên dịch chúng thành mã nguồn của các ngôn ngữ lập trình khác nhau có chức năng serialize và deserialize các cấu trúc dữ liệu này thành dạng binary stream. 

```protobuf:protos/auth.proto
syntax = "proto3";

package protobuf.identity;

option php_metadata_namespace = "Protobuf\\Identity\\Metadata";

service AuthService {
    rpc SignIn (SignInRequest) returns (Response) {}
    rpc SignUp (SignUpRequest) returns (Response) {}
}

message SignInRequest {
    string email = 1;
    string password = 2;
}

message SignUpRequest {
    string name = 1;
    string email = 2;
    string password = 3;
    string password_confirmation = 4;
}

message Response {
    int64 id = 1;
    string token = 2;
}
```

Trong file này đơn giản chỉ định nghĩa service AuthService sẽ có 2 method rpc là SignIn và SignUp, chúng nhận vào tham số message được define theo cấu trúc ở bên dưới.

Sau khi đã tạo file `auth.proto` chúng ta cần phải compile chúng ra thành các file để sử dụng trong project, bằng command:

```bash
$  protoc --php_out=./protos/generated/ --php-grpc_out=./protos/generated/ ./protos/auth.proto
```
như vậy là chúng ta sẽ có file source code nằm trong thư mục `protos/generated` như sau: 
![](https://images.viblo.asia/e5183fac-960a-417a-8761-1dcaf073213e.png)

đây cũng là thư mục mà mình bổ sung vào trong file `composer.json` ở trên đấy

### Implement logic cho AuthServiceInterface

Sau khi sử dụng protoc để có được file AuthServiceInterface, chúng ta đơn giản chỉ cần tiến hành implement logic cho các func trong service thôi

```php:App\Grpc\Controllers\AuthController.php
<?php

namespace App\Grpc\Controllers;

use Protobuf\Identity\AuthServiceInterface;
use Protobuf\Identity\Response;
use Protobuf\Identity\SignInRequest;
use App\Grpc\Contracts\Validator;
use Illuminate\Contracts\Hashing\Hasher;
use Spiral\GRPC\Exception\InvokeException;
use Spiral\GRPC\StatusCode;
use Protobuf\Identity\SignUpRequest;
use Throwable;
use Spiral\GRPC\ContextInterface;

class AuthController implements AuthServiceInterface
{
    /**
     * Input validator
     *
     * @var Validator
     */
    protected Validator $validator;

    /**
     * Hasher
     *
     * @var Hasher
     */
    protected Hasher $hasher;

    /**
     * Create new instance.
     *
     * @param  Validator $validator
     * @param  Hasher $hasher
     */
    public function __construct(Validator $validator, Hasher $hasher)
    {
        $this->validator = $validator;
        $this->hasher = $hasher;
    }

    /**
     * @param ContextInterface $ctx
     *
     * @param  SignUpRequest $request
     * @return Response
     * @throws Throwable
     */
    public function SignUp(ContextInterface $ctx, SignUpRequest $request): Response
    {
        $data = json_decode($request->serializeToJsonString(), true);

        $this->validator->validate($data, [
            'email' => 'bail|required|email',
            'name' => 'required|max:255',
            'password' => 'required|confirmed',
        ]);

        $response = new Response();

        $response->setId(1);
        $response->setToken("token"); //TODO use jwt to handle token base auth

        return $response;
    }

    /**
     * @param ContextInterface $ctx
     * @param SignInRequest $in
     * @return Response
     * @throws Throwable
     */
    public function SignIn(ContextInterface $ctx, SignInRequest $in): Response
    {
        $data = json_decode($in->serializeToJsonString(), true);

        $this->validator->validate($data, [
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        $response = new Response();

        $response->setId("1");
        $response->setToken("token"); //TODO using jwt to handle token base auth

        return $response;
    }
}
```
đơn giản vậy thôi là chúng ta đã xong phần logic cho các method rpc của app rồi

### Implement PHP worker
Phần quan trọng nhất đây rồi.

Chúng ta sử dụng RoadRunner để serve các PHP worker lên và lắng nghe các rpc nên PHP worker là 1 thành phần quan trọng trong ứng dụng của bạn

```php:worker.php
<?php

use Spiral\RoadRunner\Worker;
use Spiral\Goridge\StreamRelay;

ini_set('display_errors', 'stderr');

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';

$app->singleton(
    App\Grpc\Contracts\Kernel::class,
    App\Grpc\Kernel::class
);

$app->singleton(
    App\Grpc\Contracts\ServiceInvoker::class,
    App\Grpc\LaravelServiceInvoker::class
);

$kernel = $app->make(App\Grpc\Contracts\Kernel::class);

$kernel->registerService(Protobuf\Identity\AuthServiceInterface::class);

$w = new Worker(new StreamRelay(STDIN, STDOUT));

$kernel->serve($w);
```

Khi đã có PHP worker rồi, chúng ta sẽ sử dụng `rr-grpc` đã tải về ở trên để serve app lên thôi. `rr-grpc` có yêu cầu file config như sau:

```yaml:.rr.yaml
grpc:
  listen: "tcp://127.0.0.1:9001"  # Define host cho service
  proto: "protos/auth.proto"      # Define rõ file proto ở đâu
  workers:
    command: "php worker.php"      # Start worker từ file worker vừa tạo ở trên
    pool:                          # Cấu hình số lượng worker và số lượng job tối đa
      maxJobs: 1
      numWorkers: 1

```

Bây giờ chúng ta chạy command: `./rr-grpc -c .rr.yaml serve -v -d` là xong 
![](https://images.viblo.asia/be616cc6-53d5-4c01-ace8-20e64ddd73ad.png)

server đã sẵn sàng lắng nghe các yêu cầu từ client rồi

### Cấu trúc thư mục hoàn chỉnh
![](https://images.viblo.asia/31d1e457-3d34-445d-b65d-ec5447703b3a.png)


# Tạm kết

Như vậy là chúng ta đã implement được phía server, do bài viết đã dài nên mình tạm kết ở đây, trong bài viết tới mình sẽ tiếp tục implement phía client, làm cách nào để client có thể giao tiếp với server thông qua gRPC.

# Demo

- https://github.com/daothaison/grpc-php-server
- https://github.com/daothaison/grpc-php-client