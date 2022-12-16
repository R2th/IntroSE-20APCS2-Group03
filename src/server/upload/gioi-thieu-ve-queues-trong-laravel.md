Trong cuộc sống, bạn sẽ thường gặp phải những tình huống phải triển khai nhiều công việc đồng thời, và dân gian thường nói rằng: Việc dễ thì làm trước, khó làm sau. `Queue` của Laravel được xây dựng như vậy, Queue giúp chúng ta phân phối các task, cân bằng không gây trì trệ cho các task sắp tới.

`Queue` của Laravel cung cấp cho chúng ta đa dạng các `across api` khác nhau như: **Beastalk**, **Amazon sqs**, **Redis**,... `Queue` cho phép hoãn lại các task tiêu thụ nhiều thời gian, ví dụ như gửi mail, giúp tăng tốc độ phản hồi cho ứng dụng web.
## Cài đặt connection với Queues.

Trong file `config/queue.php`, chứa các lựa chọn connection với `Queues`. Các dịch vụ được định nghĩa mặc định như  Amazon SQS, Beanstalk, hay Redis.

``` PHP 
'connections' => [
        'sync' => [
            'driver' => 'sync',
        ],
        'database' => [
            'driver' => 'database',
            'table' => 'jobs',
            'queue' => 'default',
            'retry_after' => 90,
        ],
        'beanstalkd' => [
            'driver' => 'beanstalkd',
            'host' => 'localhost',
            'queue' => 'default',
            'retry_after' => 90,
        ],
        'sqs' => [
            'driver' => 'sqs',
            'key' => env('SQS_KEY', 'your-public-key'),
            'secret' => env('SQS_SECRET', 'your-secret-key'),
            'prefix' => env('SQS_PREFIX', 'https://sqs.us-east-1.amazonaws.com/your-account-id'),
            'queue' => env('SQS_QUEUE', 'your-queue-name'),
            'region' => env('SQS_REGION', 'us-east-1'),
        ],
        'redis' => [
            'driver' => 'redis',
            'connection' => 'default',
            'queue' => 'default',
            'retry_after' => 90,
            'block_for' => null,
        ],
    ],
```
## Điều kiện tiên quyết
### Sử dụng Queues với Database.

Để sử dụng Queues với Database bạn cần tạo bảng để lưu giữ `jobs`. Laravel đã xây dựng sẵn command để tạo tự động bảng trong DB. Bạn chỉ cần chạy command

``` bash
php artisan queue:table

php artisan migrate
```
### Sử dụng Queues với Redis.
Cấu hình để sử dụng với Redis DB, bạn cần sửa trong `config/queue.php`. Nếu Redis của bạn sử dụng 1 Redis Cluster, tên của Queues phải có `key hash tag`, nó bắt buộc để đảm bảo rằng tất cả Redis key cho các cụm queue được đặt cùng vị trí của hash.
``` PHP
'redis' => [
    'driver' => 'redis',
    'connection' => 'default',
    'queue' => '{default}',
    'retry_after' => 90,
],
```
### Ngoài ra
Ngoài ra bạn cần cài thêm các package:
- Amazon SQS: `aws/aws-sdk-php ~3.0`
- Beanstalkd: `pda/pheanstalk ~3.0`
- Redis: `predis/predis ~1.0`

## Tạo Job

Mặc định các Job trên queue được đặt trong thư mục `app/Jobs`, nó sẽ được tạo mặc định khi bạn chạy command `make:job`. Để tạo 1 job bằng Artisan CLI bạn chạy lệnh:

```
php artisan make:job NewJob
```

### Cấu trúc của class Job

Sau khi sử dụng Artisan CLI, bạn sẽ có 1 file như sau
``` PHP 
<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class NewJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // Process...
    }
}
```

Để có thể sử dụng `Eloquent model` trong job, `SerializesModels` được định nghĩa trong job, nó giúp bạn có thể sử dụng `Eloquent model` một cách động bộ hoặc không, khi job được xử lý. 

Hàm `handle()` đượcc gọi khi job được xử lý trong queue.

### Dispatch job

Mặc định, job có thể gọi tới hàm static `dispatch()`, ở bất kỳ đâu để đẩy job vào queue, các tham số được truyeèn vào hàm `dispatch()` được định nghĩa ở `constructor()`. 

``` PHP 
NewJob::dispatch();
```

Nếu bạn cần trì hoãn việc thực hiện job trong queue, bạn có thể sử dụng hàm `delay()`:
``` PHP
NewJob::dispatch()->delay(now()->addMinutes(10));
```

Ngoài ra bạn có thể tùy chọn việc xử lý job trên Queue nào, và sử dụng DB nào bằng hàm `onConnection()` và `onQueue()`:

``` PHP 
NewJob::dispatch()->onQueue('processing')->onConnection('sqs');
```

## Tạo các worker lắng nghe việc gọi job.

Để lắng nghe các job trong Queue, bạn sử dụng command :
```
php artisan queue:work
```

Các tham số:
- `--tries=3`: Định nghĩa số lần xử lý job trước khi job bị fail.
- `--timeout=30`: Định nghĩa thời gian tối đa job có thể chạy trong queue
- `--once`: Định nghĩa worker chỉ lắng nghe và xử lý 1 job duy nhất.
- Bạn có thể truyền cụ thể driver mà worker này sẽ lắng nghe như : `redis`, `sqs`, ...
- `--queue=name`: Chỉ rõ tên queue mà worker sẽ nghe.

**Note:** 

Worker là một process tồn tại lâu dài, nên trong quá trình deploy, nó sẽ không tự nhận biết và thích nghi với sự thay đổi của source code, vì vậy bạn cần restart nó trong quá trình deploy, bằng lệnh:
```
php artisan queue:restart
```

## Sử dụng Supervisor để control nhiều worker.
Cách cài đặt Supervisor bạn có thể tham khảo ở [đây](http://supervisord.org/installing.html). 
Trên `Linux`, file cấu hình có supervisor được đặt ở thư mục `/etc/supervisor/conf.d`, bạn có thể tạo `laravel-worker.conf` để điều khiển `queue:work`:
```
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command=php <đường dẫn tới artisan> queue:work redis --daemon --timeout=0 --tries=1
autostart=true
autorestart=true
user=forge
numprocs=8
redirect_stderr=true
stdout_logfile=/home/app/worker.log
```

Số process được control bởi supervisor định nghĩa ở: numprocs=8.

Khởi động Supervisor:
```
sudo supervisorctl reread

sudo supervisorctl update

sudo supervisorctl start laravel-worker:*
```

## Tạm kết
Vừa rùi mình đã giới thiệu về Queues trong Laravel được sử dụng như thế nào. Trong bài tiếp theo, mình sẽ chia sẻ ví dụ thực tế, vài problem và solution của mình. Hẹn gặp lại các bạn trong các bài viết tiếp theo.