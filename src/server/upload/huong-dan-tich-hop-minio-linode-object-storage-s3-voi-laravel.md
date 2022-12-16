Hòa chung bầu không khí kiếm áo từ **Viblo May Fest 2021**, bài viết này sẽ giới thiệu tới mọi người một opensource là Min.io - Object Storage Server và cách để tích hợp MinIO/Linode Object Storage vào trong ứng dụng Laravel. Mời các bạn cùng đón đọc. :D

## MinIO là gì?

Min.io hay MinIO là một dự án open source, được dùng để dựng Object Storage Server. Cả MinIO và Linode Object Storage đều có API tương thích với AWS S3 nên nếu bạn đang dùng MinIO/Linode Object Storage mà muốn chuyển qua S3 thì sẽ không cần phải sửa lại source code. Ngoài ra, do nó tương thích với S3 nên các driver của S3 cũng sẽ dùng được cho MinIO/Linode Object Storage luôn.

MinIO có các Docker Image được đóng gói sẵn, nên việc setup MinIO server bằng Docker khá nhanh gọn và thuận tiện. Nó cũng có trang dashboard tại http://localhost:9000 giúp bạn có thể xem danh sách các file đã upload lên MinIO server.  Mình đánh giá giao diện trang này đơn giản và dễ dùng.

Với Linode Object Storage/S3 thì bạn phải có tài khoản trả phí và tạo nó trong Dashboard nên bài viết sẽ dùng MinIO để demo. Bạn yên tâm là chỉ code một lần trong Laravel đều có thể chuyển qua lại giữa chúng nha. Khi dùng Linode Object Storage/S3 mình cũng thường dùng MinIO dưới local mà, còn production thì mình dùng account thật. :)

Ở phần tiếp theo, mình sẽ demo cách tích hợp với Laravel, để các bạn hình dung được sơ khai về cách sử dụng MinIO/Linode Object Storage/S3 nhé.

## Cài đặt MinIO bằng Docker

Nếu dùng boilerplate [sun-asterisk-research/docker-php-development](https://github.com/sun-asterisk-research/docker-php-development) thì bạn chỉ cần khai báo thêm service `minio` trong file `services` là được.

Còn không bạn có thể dùng file docker-compose tương tự file  [compose/minio.yml](https://github.com/sun-asterisk-research/docker-php-development/blob/master/compose/minio.yml) để chạy thử.

```yaml:docker-compose.yml
version: "3.5"

networks:
  minio:

services:
  minio:
    image: minio/minio:latest
    restart: always
    command:
      - server
      - /data
    ports:
      - 9000:9000
    networks:
      - minio
    environment:
      MINIO_ACCESS_KEY: ${MINIO_ACCESS_KEY:-minio}
      MINIO_SECRET_KEY: ${MINIO_SECRET_KEY:-miniostorage}
      MINIO_REGION_NAME: ${MINIO_REGION_NAME:-us-east-1}
    volumes:
      - ${PATH_DATA:-./data}/minio:/data

```

Sau đó chạy service MinIO lên bằng lệnh:

```bash
docker-compose up -d
```

Truy cập thử trang dashboard của MinIO tại: https://localhost:9000

## Tích hợp MinIO với Laravel (cách 1)

Với cách này, bạn sẽ có 2 driver là S3 và Minio dùng song song cùng một lúc.

### Cài đặt thêm filesystem driver

Vì MinIO tương thích với AWS S3 nên chúng ta sẽ sử dụng luôn driver AWS S3 đã có Laravel luôn. Link driver: https://packagist.org/packages/league/flysystem-aws-s3-v3.

Bài này sẽ dùng driver v1, câu lệnh cài đặt như sau:

```bash
composer require "league/flysystem-aws-s3-v3:^1.0"
```


### Thêm MinIOServiceProvider.php

```php:app/Providers/MinIOServiceProvider.php
<?php

namespace App\Providers;

use Aws\S3\S3Client;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;
use League\Flysystem\AwsS3v3\AwsS3Adapter;
use League\Flysystem\Filesystem;

class MinIOServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        /**
         * @phpcsSuppress SlevomatCodingStandard.Functions.UnusedParameter.UnusedParameter
         */
        Storage::extend('minio', function ($app, $config) {
            $client = new S3Client([
                'credentials' => [
                    'key'    => $config['key'],
                    'secret' => $config['secret'],
                ],
                'region'      => $config['region'],
                'version'     => 'latest',
                'bucket_endpoint' => false,
                'use_path_style_endpoint' => true,
                'endpoint'    => $config['endpoint'],
            ]);

            $root = $config['root'] ?? null;

            $options = $config['options'] ?? [];

            return new Filesystem(new AwsS3Adapter($client, $config['bucket'], $root, $options));
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
    }
}
```

Sau đó, bạn khai báo thêm `MinIOServiceProvider` vào trong file `config/app.php`  nha.

### Khai báo MinIO trong config/filesystem.php

Bây giờ, chúng ta sẽ khai báo một driver trong file `config/filesystem.php` nhé. Bạn thêm cấu hình như sau:

```php:config/filesystems.php
'minio' => [
    'driver' => 'minio',
    'key' => env('MINIO_ACCESS_KEY'),
    'secret' => env('MINIO_SECRET_KEY'),
    'region' => env('MINIO_REGION', 'us-east-1'),
    'bucket' => env('MINIO_DEFAULT_BUCKET', 'images'),
    'endpoint' => env('MINIO_ENDPOINT', 'http://minio:9000'),
],
```

Trong đó có các biến môi trường để cấu hình kết nối tới MinIO server gồm:
- `MINIO_ACCESS_KEY`: Đây là access key, giống như username vậy, value bạn đặt trùng khớp với `MINIO_ACCESS_KEY` mà bạn đã cấu hình lúc cài đặt MinIO server
- `MINIO_SECRET_KEY`: Đây là secret key, giống như password vậy, value bạn đặt trùng khớp với `MINIO_SECRET_KEY` mà bạn đã cấu hình lúc cài đặt MinIO server
- `MINIO_REGION`: MinIO có thể phân tán thành nhiều zone khác nhau, ở bước cài đặt MinIO server có thiết lập tên zone, value của `MINIO_REGION` bạn cũng đặt trùng khớp với zone đã cài đặt.
- `MINIO_DEFAULT_BUCKET`: Tên bucket, nó tương tự như một folder to vậy. Sau khi chạy MinIO, bạn vào trang dashboard của MinIO vào tạo một bucket rồi điền tên bucket đấy cho biến môi trường `MINIO_DEFAULT_BUCKET`.

Đừng quên đổi biến môi trường `FILESYSTEM_CLOUD` để thực hiện test thử được nhé.

> Bạn thay thế endpoint url của MinIO thành endpoint tới Linode Object Storage/S3 cũng sẽ đều hoạt động được nhé.

### Upload thử nghiệm

Bây giờ bạn chỉ việc upload thử nghiệm một file bằng tinker của Laravel:

```bash
php artisan tinker
```

```php
>>> Storage::cloud()->put('demo/hello.txt', 'Hello Viblo.asia!')
=> true
```

Thử đọc nội dung của file ra:

```php
>>> Storage::cloud()->get('demo/hello.txt')
=> "Hello Viblo.asia!"
```

Bạn mở trang MinIO Dashboard ra sẽ thấy file hello.txt trong thư mục demo:

![](https://images.viblo.asia/ab66b891-2636-4606-8a60-c483f8aa66eb.jpeg)

## Tích hợp MinIO với Laravel (cách 2)

Thực ra, module Filesystem của Laravel đã support sẵn cho chúng ta driver của AWS S3.

```php:config/filesystems.php
    'disks' => [
        ...,
        
        's3' => [
            'driver' => 's3',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION'),
            'bucket' => env('AWS_BUCKET'),
            'url' => env('AWS_URL'),
            'endpoint' => env('AWS_ENDPOINT'),
            'use_path_style_endpoint' => env('AWS_USE_PATH_STYLE_ENDPOINT', false),
        ],
];
```

Mà MinIO thì như mình đề cập, nó được viết để tương thích với AWS S3 nên chúng ta hoàn toàn có thể dùng driver `s3` có sẵn trên để kết nối tới MinIO.

***Note: Đối với các phiên bản Laravel 5.x,*** trong file `config/filesystems.php` bạn sẽ không thấy một số trường như `endpoint`, `use_path_style_endpoint`. Bạn hãy tự tạo thêm các trường trên vào nhé. Vì sao lại như vậy?

```php:laravel/framework/src/Illuminate/Filesystem/FilesystemManager.php#L201
    /**
     * Create an instance of the Amazon S3 driver.
     *
     * @param  array  $config
     * @return \Illuminate\Contracts\Filesystem\Cloud
     */
    public function createS3Driver(array $config)
    {
        $s3Config = $this->formatS3Config($config);

        $root = $s3Config['root'] ?? null;

        $options = $config['options'] ?? [];

        return $this->adapt($this->createFlysystem(
            new S3Adapter(new S3Client($s3Config), $s3Config['bucket'], $root, $options), $config
        ));
    }

    /**
     * Format the given S3 configuration with the default options.
     *
     * @param  array  $config
     * @return array
     */
    protected function formatS3Config(array $config)
    {
        $config += ['version' => 'latest'];

        if ($config['key'] && $config['secret']) {
            $config['credentials'] = Arr::only($config, ['key', 'secret', 'token']);
        }

        return $config;
    }
```

Bạn thấy đấy, Laravel override lại một vài trường rồi dùng luôn toàn bộ phần options được define trong driver `s3`!

### Dùng driver s3 của Laravel

Bạn chỉ cần khai báo các biến environment phù hợp là được:

```
FILESYSTEM_DRIVER=local
FILESYSTEM_CLOUD=s3

AWS_ACCESS_KEY_ID=minio
AWS_SECRET_ACCESS_KEY=miniostorage
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=viblo-images
AWS_ENDPOINT=http://minio:9000
AWS_S3_FORCE_PATH_STYLE=true
```

Biến `AWS_URL` bạn để trống, khai báo phần endpoint tới service MinIO. Lúc này, cái biến `AWS_S3_FORCE_PATH_STYLE` thì bạn phải để nó là true nha. Tới đây bạn có thể lưu file vào MinIO rồi.

```php
>>> Storage::cloud()->put('demo/hello_2.txt', 'Hello Viblo.asia!')
=> true
```

> Bạn thay thế endpoint url của MinIO thành endpoint tới Linode Object Storage/S3 cũng sẽ đều hoạt động được nhé.

## Tổng kết

Như vậy là mình đã thực hiện tích hợp thành công MinIO với Laravel để lưu trữ các file mà người dùng upload lên thành công. Nếu bạn thấy bài này hay và hữu ích, đừng quên upvote cho bài viết, follow mình để đón đọc nhiều bài viết thú vị hơn về Laravel nhé.

Nếu bạn gặp vấn đề gì cần hỗ trợ khi làm theo tut này, cứ comment vào phía dưới bài viết, mình sẽ hỗ trợ nha.

Cảm ơn các bạn đã đọc bài viết của mình! <3 <3 <3

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***