### Mở đầu:
Hi anh em, cũng lâu lắm không viết bài để chia sẻ cũng như cũng cố những thứ đã học được, hôm nay tình cờ tìm được cái mà bản thân thấy cũng hay hay, ho ho (yay) muốn chia sẻ tới mọi người. Mình đang làm cái dự án cá nhân nho nhỏ cần số lượng ảnh khá nhiều nên cũng mạnh dạng lên Facebook Crawl được khoảng 3000 nghìn ảnh ( bật mí là toàn GIRL XINH thôi ) - Chia sẻ luôn cho anh em cần [LINK FULL HD KHÔNG CHE](https://drive.google.com/drive/folders/1CTJp5e7daewcxqHPCOHvrnXz98Pqf8hQ). À đến chủ đề chính đó là mình cần đẩy hết đống ảnh này lên S3 bằng laravel. Lúc đầu mình chỉ push lên từng cái cảm thấy nó chuối chuối sao ấy ( too slow ).

![](https://images.viblo.asia/04771da0-7982-428c-894d-2d0d13c54441.png)

### Giải pháp:
Thông thường đối với người mới tiếp cận như mình thì sẽ xử lý như sau:

```App\Console\Commands\BatchUploadFile.php
    public function uploadSingleFileToS3()
    {
        $time_start = microtime(true);

        try {
            $this->getLocalFiles()
                ->each(function ($value, $key) {
                    $this->s3Instance->putObject([
                        'Bucket' => env('AWS_BUCKET'),
                        'Key' => $key,
                        'Body' => $value,
                    ]);
                });
        } catch (AwsException $ex) {
            error_log($ex->getMessage());
        }

        echo 'Total execution single upload: ' . (microtime(true) - $time_start);
    }
    
     public function getLocalFiles()
    {
        return collect(Storage::disk('public')->allFiles())
            ->mapWithKeys(function ($fileName) {
                return [$fileName => Storage::disk('public')->get($fileName)];
            });
    }
```

Với cách upload này nếu chúng ta có 3000 file ảnh sẽ tiến hành upload lần lượt 3000 lần lên S3 (Upload one by one khá tốn thời gian phải không nào) . Vậy giải pháp nào sẽ tốt hơn trong trường hợp này:
- Cách 1: Chúng ta có thể Zip tất cả các file lại, rồi upload lên S3 một lần luôn, vấn đề là chúng ta phải sử dụng AWS LAMBDA SERVICE để giải nén file zip sau khi upload lên.
- Cách 2: Upload asynchronously: Upload đồng thời nhiều file lên S3 cùng lúc.
- Sử dụng kết hợp cách 1 và cách 2: ví dụ hệ thống chúng ta lên đến 1000.000 file chẳng hạn thì chúng ta có thể zip theo nhóm 10.000 file rồi thực hiện Upload đồng thời các file zip đó.

### Implement:
Ở đây chỉ có khoảng vài nghìn ảnh nên mình sẽ sử dụng cách Upload đồng thời lên S3 luôn cho nóng nhé, mình sẽ sử dụng CommandPool class trong AWS SDK PHP cho phép chúng ta thực thi nhiều lệnh upload đồng thời.

- Cài đặt SDK:
```
composer require league/flysystem-aws-s3-v3
```
- Tạo bucket trên AWS S3 ( cái này đơn giản mọi người vào AWS S3 SERVICE để tạo nhé)
![](https://images.viblo.asia/8f0b2e2f-1a66-4886-8ec5-7aedf01abc4e.jpg)

- Config AWS key trong .env:

```
//demo thôi :v
AWS_ACCESS_KEY_ID=AKIAZVOCJX2GYQZTDFH
AWS_SECRET_ACCESS_KEY=iiNEjQp+/n24qhTQnsVy1tjMqFTFMFhGxi
AWS_DEFAULT_REGION=us-west-2
AWS_BUCKET=s3-dinhlongit
```

- Code:
```App\Console\Commands\BatchUploadFile.php
    public function batchMultiUploadFileByS3()
    {
        $time_start = microtime(true);

        try {
            $commands = $this->getLocalFiles()
                ->map(function ($value, $key) {
                    return $this->s3Instance->getCommand('PutObject', [
                        'Bucket' => env('AWS_BUCKET'),
                        'Key' => $key,
                        'Body' => $value,
                    ]);
                });

            CommandPool::batch($this->s3Instance, $commands);
        } catch (AwsException $ex) {
            error_log($ex->getMessage());
        }

        echo 'Total execution batch multi upload: ' . (microtime(true) - $time_start);
    }
    
    public function getLocalFiles()
    {
        return collect(Storage::disk('public')->allFiles())
            ->mapWithKeys(function ($fileName) {
                return [$fileName => Storage::disk('public')->get($fileName)];
            });
    }
```

Ở đây chúng ta sẽ không thực hiện việc Push Image lên S3 lần lượt trong vòng lặp nữa mà sẽ sử dụng method getCommand để tạo command putObject và lưu trữ nó trong mảng commands. 
Sau đó, bạn có thể dễ dàng thực hiện các lệnh upload file đồng thời bằng method CommandPool::batch($this->s3Instance, $command).

Vậy Upload đồng thời được thì việc get multiple file trên S3 về đồng thời có được không ? 
Câu trả lời là có nhé, nó cũng tương tự thôi:

```php
$commands = [];
foreach ($keys as $key) {
    $commands[] = $this->s3Instance->getCommand('GetObject', [
        'Bucket'      => ****,
        'Key'         => $key,
    ]);
}
$responses = CommandPool::batch($this->s3Instance, $commands);

$fileContents = [];
foreach ($responses as $response) {
    $data = $response['Body'];
    $fileContents[] = $data->getContents();
}
return $fileContents;
```

### So sánh performence (thời gian thực thi):

Sau khi mình thực thi cách upload thông thường từng file so với việc upload đồng thời thì kết quả thực thi như sau:
###### Total execution single upload: 1247.8137078285 ~ hic tận 20 phút
###### Total execution batch multi upload: 100.81381487846 ~ 1 phút 30 giây

Gấp tận 12 lần (ngon).

### Full Code:

```App\Console\Commands\BatchUploadFile.php
<?php

namespace App\Console\Commands;

use Aws\CommandPool;
use Aws\Exception\AwsException;
use Aws\S3\S3Client;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class BatchUploadFile extends Command
{
    protected $s3Instance;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:batch_upload_file';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Batch Upload Local File To S3';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->s3Instance = new S3Client([
            'version' => 'latest',
            'region'  => env('AWS_DEFAULT_REGION', 'us-west-2')
        ]);
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        //$this->uploadSingleFileToS3();
        $this->batchMultiUploadFileByS3();
    }


    public function batchMultiUploadFileByS3()
    {
        $time_start = microtime(true);

        try {
            $commands = $this->getLocalFiles()
                ->map(function ($value, $key) {
                    return $this->s3Instance->getCommand('PutObject', [
                        'Bucket' => env('AWS_BUCKET'),
                        'Key' => $key,
                        'Body' => $value,
                    ]);
                });

            CommandPool::batch($this->s3Instance, $commands);
        } catch (AwsException $ex) {
            error_log($ex->getMessage());
        }

        echo 'Total execution batch multi upload: ' . (microtime(true) - $time_start);
    }

    public function uploadSingleFileToS3()
    {
        $time_start = microtime(true);

        try {
            $this->getLocalFiles()
                ->each(function ($value, $key) {
                    $this->s3Instance->putObject([
                        'Bucket' => env('AWS_BUCKET'),
                        'Key' => $key,
                        'Body' => $value,
                    ]);
                });
        } catch (AwsException $ex) {
            error_log($ex->getMessage());
        }

        echo 'Total execution single upload: ' . (microtime(true) - $time_start);
    }

    public function getLocalFiles()
    {
        return collect(Storage::disk('public')->allFiles())
            ->mapWithKeys(function ($fileName) {
                return [$fileName => Storage::disk('public')->get($fileName)];
            });
    }

}
```
Link github: [tại đây ](https://github.com/longnd-1038/s3_batch_upload)

### Kết luận:
Hi vọng bài viết sẽ giúp ích cho mọi người trong công việc và học tập. Thank for reading ^^