Ở thời điểm hiện tại (22.04.2020) aws lambda không hỗ trợ mặc định các trương trình php trên hệ thống của họ, chỉ hỗ trợ các ngôn ngữ như python, nodejs ...
nếu muốn sử dụng được code php trên lambda chúng ta phải tự build runtime của php lên để thực thi code của mình. Bài viết này mình sẽ hướng dẫn các bạn các thao tác cần thiết để chạy được code php trên mỗi trường lambda.

## Build php runtime

Thực hiện các bước sau để build custom runtime php.

1. Khởi tạo EC2 instance [amzn-ami-hvm-2018.03.0.20181129-x86_64-gp2](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html). chú ý các bạn bắt bược phải dùng instance của aws để thực hiện build runtime này, bạn không thể build được ở local hay bất kỳ một server nào khác, nếu build trên môi trường khác đưa vào lambda nó sẽ báo lỗi file.
1. SSh vào server ec2 vừa tạo thực hiện các câu lệnh sau đây.
Cài các package cần thiết:
    ```
    sudo yum update -y
    sudo yum install autoconf bison gcc gcc-c++ openssl-devel libcurl-devel libxml2-devel libjpeg-devel libpng-devel php-mysqlnd php-zip php-devel php-gd php-mcrypt php-mbstring php-curl php-xml php-pear php-bcmath php-json -y
    ```
  
1. Tiến hành Compiling PHP
    1. Tải PHP 7.3 source
        ```
        mkdir ~/php-7.3-bin
        curl -sL https://github.com/php/php-src/archive/php-7.3.0.tar.gz | tar -xvz
        cd php-src-php-7.3.0
        ```
    1. Compiling
        ```
        ./buildconf --force
        ./configure --prefix=/home/ec2-user/php-7.3-bin/ --with-mysqli=mysqlnd --with-pdo-mysql=mysqlnd --with-openssl --with-openssl-dir=/usr/include/openssl --with-curl --with-zlib --enable-mbstring --with-gd --with-jpeg-dir=/usr/lib64
        make install
        ```
   Thao tác build này diễn ra khá lâu, các bạn đợi chút nhé :D
   Sau khi bạn thực hiện các công việc này xong, nó sẽ tạo ra một load các folder trong thưc mục /home/ec2-user/php-7.3-bin/ cho bạn, trong đó có 1 file php trong thư mục `~/php-7.3-bin/bin/php`, đây chính là cái các bạn cần để chạy được php trên mỗi trường lambda. Đến đây bạn có thể download cái `~/php-7.3-bin/bin/php` này về để thực hiện trên local của bạn.
   
 1. Bước tiếp theo bạn tạo 1 thư mục có cấu trúc như sau:
 ```
 /home/ec2-user/php-example/
+-- bin/
|   +-- php* # là cái php đã build được
|-- bootstrap*  # ngang hàng với thư mục bin và src
+-- src/ 
    +-- hello.php
|-- composer.json  # ngang hàng với thư mục bin và src
 
có 2 folder, 4 files tất cả (tý sẽ có thêm folder vendor)
 ```
 
 Các file sẽ có nội dung như sau:
 
 ```php
 // file bootstrap
 #!/opt/bin/php
<?php

// require vendors from layer
require __DIR__.'/vendor/autoload.php';

// require file with function basing on ENV configuration
$handlerFunction = array_slice(explode('.', $_ENV['_HANDLER']), -1)[0];
require_once $_ENV['LAMBDA_TASK_ROOT'] . '/src/' . $handlerFunction . '.php';

// Generate random number to test Lambda Execution Context
$sharedRandom = rand();

$client = new \GuzzleHttp\Client();

while (true) {
    $request = getNextRequest($client);

    try {
        $response = $handlerFunction($request['payload'], $sharedRandom);
    } catch (\Exception $e) {
        // Handle invocation error and notify Runtime API
        handleInvocationError($client, $request['invocationId'], $e);
        continue;
    }

    sendResponse($client, $request['invocationId'], $response);
}

function getNextRequest($client): array
{
    $response = $client->get('http://'.$_ENV['AWS_LAMBDA_RUNTIME_API'].'/2018-06-01/runtime/invocation/next');

    return [
        'invocationId' => $response->getHeader('Lambda-Runtime-Aws-Request-Id')[0],
        'payload' => json_decode((string) $response->getBody(), true)
    ];
}

function sendResponse($client, $invocationId, $response)
{
    $client->post(
        'http://' . $_ENV['AWS_LAMBDA_RUNTIME_API'] . '/2018-06-01/runtime/invocation/' . $invocationId . '/response',
        ['body' => $response]
    );
}

function handleInvocationError($client, $invocationId, \Exception $e)
{
    $client->post(
        'http://' . $_ENV['AWS_LAMBDA_RUNTIME_API'] . '/2018-06-01/runtime/invocation/' . $invocationId . '/error',
        [
            'body' => json_encode([
                'errorType' => 'CustomInvocationError',
                'errorMessage' => $e->getMessage(),
                'stackTrace' => $e->getTraceAsString()
            ]),
            'headers' => [
                "Lambda-Runtime-Function-Error-Type" => "Unhandled"
            ]
        ]
    );
}
 ```
 
 #composer.json
 ```json
 
 {
  "require": {
    "guzzlehttp/guzzle": "^6.3",
    "aws/aws-sdk-php": "^3.99"
  }
}
 ```
 
 cuối cùng là hello.php
 
 ```php
 function hello($data)
{
    return "Hello, {$data['name']}!";
}
 ```
 
1. Bạn vào thưc mục này để cài đặt nội dung tiếp theo
1. Cài đặt composer, nhiều máy có rồi thì bỏ qua bước này
    ```
    curl -sS http://getcomposer.org/installer | php
    ```
1. Install dependencies
    ```
    php composer.phar install
    ```
1. Tạo zip file để deploy code
    ```
    zip -r runtime.zip bin/ bootstrap
    zip -r vendor.zip vendor/
    zip -r hello.zip src/*
    ```
    
    mình giải thích cụ thể từng file zip này một chút:
    1. cái runtime.zip chính là php runtime để cho lambda chạy được code php
    2. vendor.zip là các package của php như guzzlehttp, aws-sdk-php, bạn có thể thêm bất cứ package nào cho việc code vào đây.
    3. hello.zip chính là source của các bạn.

    ==> cái runtime và vendor mình sẽ upload nó vào phần layer của lambda, còn hellp.zip thì pload vào phần function.
    
 Đến bước này nếu ai đã biết cách deploy lambda thì cũng có thể tự deploy được rồi, mình sẽ hướng dẫn tiếp các bạn mới deploy lambda sử dụng aws cli nhé.
 
 
1. Đầu tiên bạn phải tạo role cho lambda function **AWSLambdaBasicExecutionRole** and **S3FullAccess** policies
1. Configure [AWS CLI tool](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) 
1. Tạo layers
    1. Custom runtime layer
        ```
        aws lambda publish-layer-version --layer-name php-custom-runtime --zip-file fileb://runtime.zip
        ```
    1. Layer with vendor
        ```
        aws lambda publish-layer-version --layer-name php-custom-runtime-vendor --zip-file fileb://vendor.zip
        ```
        
  sau khi chạy xong mỗi câu lệnh ở trên nó sẽ trả cho bạn một cái là `version arn` các bạn lưu cái này lại để tạo function nhé:
  
4. Create function
    ```
    aws lambda create-function \
    --function-name hello \
    --zip-file fileb://hello.zip \
    --handler hello \
    --role "{ARN_OF_CREATED_ROLE}" \
    --runtime provided \
    --layers "{ARN_OF_RUNTIME_LAYER}" "{ARN_OF_VENDOR_LAYER}"
    ```
    
    ok đến bước này là các bạn đã deploy xong fucntion lambda của mình rồi, bây giờ bạn cần login vào aws console để add trigger hoặc thực hiện thao tác add tương ứng.
    
    
    ## Tài liệu
    
    - https://aws.amazon.com/blogs/apn/aws-lambda-custom-runtime-for-php-a-practical-example/