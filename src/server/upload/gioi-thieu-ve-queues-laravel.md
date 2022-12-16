## Introduction
Hiện tại, Laravel cung cấp Horizon, một dashboard  và hệ thống cấu hình cho hàng đợi queues hỗ trợ Redis của bạn. Kiểm tra tài liệu Horizon đầy đủ để biết thêm thông tin.

Laravel queues cung cấp API hợp nhất trên nhiều loại (đa dạng) queues backends khác nhau, như Beanstalk, Amazon SQS, Redis hoặc thậm chí là cơ sở dữ liệu quan hệ. Queues cho phép bạn trì hoãn việc xử lý một task tốn thời gian, như gửi email, cho đến một thời gian sau. Trì hoãn các task tiêu tốn thời gian này sẽ giúp cải thiện tốc độ cho những request từ web đến server.

File cấu hình queue được lưu trữ trong `config / queue.php`. Trong file này, bạn sẽ tìm thấy config kết nối cho từng queue driver được include trong framework, bao gồm database, `Beanstalkd`,` Amazon SQS`, `Redis` và (trình điều khiển đồng bộ) synchronous driver sẽ thực thi những job ngay lập tức (để sử dụng cho môi trường local). Một queue driver `null` cũng được include trong đó loại bỏ các queue job.

### Connections Vs. Queues
Trước khi bắt đầu với Laravel queue, điều quan trọng là phải hiểu sự khác biệt giữa "connections" và "queues". Trong file cấu hình `config / queue.php`, có một option cấu hình `connections`. Option này xác định một kết nối cụ thể đến một backend service như Amazon SQS, Beanstalk hoặc Redis. Tuy nhiên, bất kỳ queue connection nhất định nào cũng có thể có multiple  "queues" có thể được coi là các stack hoặc pile queue jobs khác nhau.

Lưu ý rằng mỗi ví dụ config kết nối trong queue file cấu hình chứa queue attribute. Đây là queue default  mà các jobs sẽ được dispatch đến khi chúng được gửi đến một kết nối nhất định.  Nói cách khác, nếu bạn gửi một job mà không xác định rõ ràng queue nào sẽ được dispatch đến, job sẽ đặt trên queue được xác định trong thuộc tính queue của config kết nối:

```
// This job is sent to the default queue...
Job::dispatch();

// This job is sent to the "emails" queue...
Job::dispatch()->onQueue('emails');
```

Một số ứng dụng có thể không cần phải đẩy job lên nhiều queue, thay vào đó, thay thế vào đó là một simple queue. Tuy nhiên, việc đẩy các job lên nhiều queue có thể đặc biệt hữu ích cho các ứng dụng muốn ưu tiên hoặc phân đoạn cách xử lý các công việc, vì Laravel queue woker cho phép bạn chỉ định queue nào nên xử lý theo mức độ ưu tiên.
```
php artisan queue:work --queue=high,default
```
### Driver Notes & Prerequisites
**Database**

Để sử dụng `database` queue driver, bạn sẽ cần một table để lưu giữ xác định các công việc. Để tạo generate  migration tạo bảng này, hãy chạy lệnh `queue: table` Artisan command. Khi migration đã được tạo, bạn cần migrate database của bạn bằng  `migrate` command.
```
php artisan queue:table

php artisan migrate
```
**Redis**

Để sử dụng `redis` queue driver, bạn nên cấu hình Redis database connection trong file `config/database.php`.

* **Redis Cluster**

    Nếu kết nối queue Redis của bạn sử dụng Redis Cluster, tên queue của bạn phải chứa `key hash tag`. Điều này là required để đảm bảo tất cả các Redis key cho queue đã cho được đặt vào cùng một vị trí hash:
    
     ```
       'redis' => [
            'driver' => 'redis',
            'connection' => 'default',
            'queue' => '{default}',
            'retry_after' => 90,
    ],
    ```
 * **Blocking**
 
     Khi sử dụng Redis queue, bạn có thể sử dụng option config `block_for` để chỉ định thời gian driver sẽ chờ bao lâu để một job có thể available trước khi lặp qua vòng lặp worker và re-polling Redis database. 
 
     Điều chỉnh giá trị này dựa trên queue load của bạn có thể hiệu quả hơn so với việc liên tục thăm dò Redis database cho các job mới. Chẳng hạn, bạn có thể đặt value là 5 để cho biết rằng driver sẽ block trong năm giây trong khi chờ đợi một job available:
 
    ```
     'redis' => [
            'driver' => 'redis',
            'connection' => 'default',
            'queue' => 'default',
            'retry_after' => 90,
            'block_for' => 5,
    ]
    ```
### Other Driver Prerequisites
Các dependencies sau là cần thiết cho queue driver được liệt kê:
* Amazon SQS: `aws/aws-sdk-php ~3.0`
* Beanstalkd: `pda/pheanstalk ~4.0`
* Redis: `predis/predis ~1.0`

## Creating Jobs
### Generating Job Classes

Theo default, tất cả các job có thể xếp hàng cho ứng dụng của bạn được lưu trữ trong thư mục `app/Jobs`. Nếu thư mục `app\Jobs` không tồn tại, hãy chạy command `make:job` Artisan để tạo nó.  Bạn có thể tạo một queue job mới bằng cách sử dụng Artisan CLI:
```
php artisan make:job ProcessPodcast
```
Class được tạo sẽ implement `Illuminate \ Contuces \ Queue \ ShouldQueue` interface, chỉ ra cho Laravel rằng job nên được đẩy lên hàng đợi để chạy (asynchronously) không đồng bộ.

### Class Structure

Các job class rất đơn giản, thông thường chỉ chứa một handle method được gọi khi job được xử lý bởi queue. Để bắt đầu, chúng ta hãy xem một job class mẫu. Trong exam này, chúng tôi sẽ giả vờ rằng chúng tôi quản lý dịch vụ xuất bản podcast và cần xử lý các file podcast đã tải lên trước khi chúng được publish:

```
<?php

namespace App\Jobs;

use App\Podcast;
use App\AudioProcessor;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class ProcessPodcast implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $podcast;

    /**
     * Create a new job instance.
     *
     * @param  Podcast  $podcast
     * @return void
     */
    public function __construct(Podcast $podcast)
    {
        $this->podcast = $podcast;
    }

    /**
     * Execute the job.
     *
     * @param  AudioProcessor  $processor
     * @return void
     */
    public function handle(AudioProcessor $processor)
    {
        // Process uploaded podcast...
    }
}
```

Trong ví dụ này, lưu ý rằng chúng tôi có thể chuyển trực tiếp `Eloquent model` vào queue job constructor. Bởi vì `SerializesModels` trait mà job đang sử dụng, các Eloquent model sẽ được tuần tự hóa và không được xác định khi job đang xử lý. Nếu queue job chấp nhận một  Eloquent model trong constructor của nó, chỉ có identifier cho model sẽ được tuần tự hóa trên hàng đợi. Khi job thực sự được xử lý, queue system sẽ tự động truy xuất lại full instance model từ database. Tất cả đều hoàn toàn minh bạch đối với ứng dụng của bạn và ngăn chặn các vấn đề có thể phát sinh từ việc tuần tự hóa các full Eloquent model instance.

`Handle` method được call khi job được xử lý bởi queue.  Lưu ý rằng chúng tôi có thể type-hint dependencies vào `handle` method của job. Laravel service container tự động injects  các dependency này.

Nếu bạn muốn kiểm soát hoàn toàn cách thức container inject các dependency vào phương thức xử lý, bạn có thể sử dụng `bindMethod` method của container. Method `bindMethod` chấp nhận một callback nhận job và container. Trong callback, bạn có thể gọi `handle` method theo cách bạn muốn. Thông thường, bạn nên gọi method này từ `service provider`:
```
use App\Jobs\ProcessPodcast;

$this->app->bindMethod(ProcessPodcast::class.'@handle', function ($job, $app) {
    return $job->handle($app->make(AudioProcessor::class));
});
```

> Binary data, như raw image contents, phải được chuyển qua hàm `base64_encode` trước khi được chuyển đến một queue job. Mặt khác, job có thể không được tuần tự hóa đúng cách thành JSON khi được đặt trên queue.
> 
## Dispatching Jobs
Khi bạn đã có job class của mình, bạn có thể dispatch nó bằng `dispatch` method trên chính job đó. Các argument được truyền cho `dispatch` method sẽ được trao cho hàm constructor của job class:
```
<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessPodcast;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PodcastController extends Controller
{
    /**
     * Store a new podcast.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        // Create podcast...

        ProcessPodcast::dispatch($podcast);
    }
}
```
### Delayed Dispatching

Nếu bạn muốn delay việc thực hiện một queue job, bạn có thể sử dụng `delay` method khi dispatch một job. Ví dụ: hãy xác định rằng một job không nên available cho processing  cho đến 10 phút sau khi job được dispatch:
```
<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessPodcast;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PodcastController extends Controller
{
    /**
     * Store a new podcast.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        // Create podcast...

        ProcessPodcast::dispatch($podcast)
                ->delay(now()->addMinutes(10));
    }
}
```

>  Amazon SQS queue service có thời gian trễ max là 15 phút.
>  
### Synchronous Dispatching

Nếu bạn muốn dispatch một job ngay lập tức (đồng bộ - synchronous), bạn có thể sử dụng method `dispatchNow`. Khi sử dụng method này, job sẽ không được xếp hàng và sẽ được run ngay lập tức trong process hiện tại:
```

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Jobs\ProcessPodcast;
use App\Http\Controllers\Controller;

class PodcastController extends Controller
{
    /**
     * Store a new podcast.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        // Create podcast...

        ProcessPodcast::dispatchNow($podcast);
    }
}
```

### Job Chaining
Job chaining cho phép bạn chỉ định một list các job được xếp hàng sẽ được run theo trình tự sau khi primary job thực hiện thành công. Nếu một job trong chuỗi thất bại, các job còn lại sẽ không được chạy. Để thực hiện queue job chaining, bạn có thể sử dụng method `withChain` cho bất kỳ job có thể dispatch:

```
ProcessPodcast::withChain([
    new OptimizePodcast,
    new ReleasePodcast
])->dispatch();
```

> Xóa các job bằng method  `$this-> delete()` sẽ không ngăn các chained job được xử lý. Chuỗi sẽ chỉ dừng thực thi nếu một job trong chuỗi thất bại.
> 
* **Chain Connection & Queue**
    Nếu bạn muốn chỉ định default connection  và queue nên được sử dụng cho các chained job, bạn có thể sử dụng các method `allOnConnection` và `allOnQueue`. Các method này chỉ định queue connection và queue name nên được sử dụng trừ khi queue job được gán rõ ràng một connection / queue khác nhau:
   ```
     ProcessPodcast::withChain([
            new OptimizePodcast,
            new ReleasePodcast
    ])->dispatch()->allOnConnection('redis')->allOnQueue('podcasts');
    ```
###     Customizing The Queue & Connection
* **Dispatching To A Particular Queue**

    Bằng cách push các job đến các queue khác nhau, bạn có thể "phân loại" các queue job của mình và thậm chí ưu tiên số lượng worker bạn chỉ định cho các queue khác nhau. Điều này không push cáccjob đến các "connection" queue khác, mà chỉ đến các queue cụ thể trong một connection. Để chỉ định queue, sử dụng method `onQueue` khi dispatch job:
   ```
     <?php

        namespace App\Http\Controllers;

        use App\Jobs\ProcessPodcast;
        use Illuminate\Http\Request;
        use App\Http\Controllers\Controller;

        class PodcastController extends Controller
        {
            /**
             * Store a new podcast.
             *
             * @param  Request  $request
             * @return Response
             */
            public function store(Request $request)
            {
                // Create podcast...

                ProcessPodcast::dispatch($podcast)->onQueue('processing');
            }
        }
    ```
 * **Dispatching To A Particular Connection**
 
     Nếu bạn đang làm việc với multi queue connection, bạn có thể chỉ định connection nào sẽ đẩy job sang. Để chỉ định kết connection, sử dụng method `onConnection` khi dispatch job:
    ```
         <?php

        namespace App\Http\Controllers;

        use App\Jobs\ProcessPodcast;
        use Illuminate\Http\Request;
        use App\Http\Controllers\Controller;

        class PodcastController extends Controller
        {
            /**
             * Store a new podcast.
             *
             * @param  Request  $request
             * @return Response
             */
            public function store(Request $request)
            {
                // Create podcast...

                ProcessPodcast::dispatch($podcast)->onConnection('sqs');
            }
        }
    ```
    Bạn có thể xâu chuỗi các method `onConnection` và `onQueue` để chỉ định connection và queue cho một job:
    ```
        ProcessPodcast::dispatch($podcast)
                  ->onConnection('sqs')
                  ->onQueue('processing');
    ```
    Ngoài ra, bạn có thể chỉ định connection là một attribute trên job class:
    ```
    <?php

    namespace App\Jobs;

    class ProcessPodcast implements ShouldQueue
    {
        /**
         * The queue connection that should handle the job.
         *
         * @var string
         */
        public $connection = 'sqs';
    }
    ```
###     Specifying Max Job Attempts / Timeout Values
* **Max Attempts**

    Một cách tiếp cận để chỉ định số lần tối đa mà một job có thể được thực hiện là thông qua `--tries` switch trên Artisan CLI:
    ```
    php artisan queue:work --tries=3
    ```
    Tuy nhiên, bạn có thể thực hiện một cách tiếp cận chi tiết hơn bằng cách xác định số lần thử tối đa trên chính job class. Nếu số lần thử tối đa được chỉ định trong job, nó sẽ được ưu tiên hơn giá trị được cung cấp trên  Artisan CLI:
    ```
    <?php

    namespace App\Jobs;

    class ProcessPodcast implements ShouldQueue
    {
        /**
         * The number of times the job may be attempted.
         *
         * @var int
         */
        public $tries = 5;
    }
    ```
 * **Time Based Attempts**

    Thay thế cho việc xác định số lần một job có thể được thử trước khi nó fail, bạn có thể xác định thời gian mà job nên timeout. Điều này cho phép một job được thử bất kỳ số lần trong một khung thời gian nhất định. Để xác định thời gian mà một job nên timeout, hãy thêm một method `retryUntil` vào job class:
    ```
    /**
     * Determine the time at which the job should timeout.
     *
     * @return \DateTime
     */
    public function retryUntil()
    {
        return now()->addSeconds(5);
    }
    ```
    
    >     Bạn cũng có thể định nghĩa một method `retryUntil` trên các trình lắng nghe event được xếp hàng của bạn.
    >     
* **Timeout**

    >     Tính năng timeout được tối ưu hóa cho `PHP 7.1+` và phần mở rộng `PHP pcntl`.
    >
    Tương tự, số giây tối đa mà các job có thể chạy được chỉ định bằng cách sử dụng `--timeout` switch trên Artisan CLI:
    ```
    php artisan queue:work --timeout=30
    ```
    Tuy nhiên, bạn cũng có thể xác định số giây tối đa mà một job sẽ được phép chạy trên chính job class đó. Nếu thời gian chờ được chỉ định trong job, nó sẽ được ưu tiên hơn bất kỳ thời gian chờ nào được chỉ định trên Artisan CLI:
    ```
    <?php

    namespace App\Jobs;

    class ProcessPodcast implements ShouldQueue
    {
        /**
         * The number of seconds the job can run before timing out.
         *
         * @var int
         */
        public $timeout = 120;
    }
    ```
###     Rate Limiting
> Tính năng này yêu cầu ứng dụng của bạn có thể tương tác với `[Redis server](https://laravel.com/docs/5.8/redis)`.
> 
Nếu ứng dụng của bạn tương tác với Redis, bạn có thể điều tiết các queue job theo thời gian hoặc đồng thời. Tính năng này có thể hỗ trợ khi các queue job của bạn đang tương tác với các API cũng bị giới hạn về tỷ lệ.

Ví dụ: sử dụng method `throttle`, bạn có thể điều tiết một loại job nhất định để chỉ chạy 10 lần sau mỗi 60 giây. Nếu không thể lấy được khóa, bạn thường nên giải phóng job trở lại queue để có thể thử lại sau:
```
Redis::throttle('key')->allow(10)->every(60)->then(function () {
    // Job logic...
}, function () {
    // Could not obtain lock...

    return $this->release(10);
});
```
> 
> Trong ví dụ trên, `key` có thể là bất kỳ chuỗi nào xác định duy nhất loại job bạn muốn xếp hạng rate limit. Ví dụ, bạn có thể muốn xây dựng khóa dựa trên class name của job và ID của các Eloquent model mà nó hoạt động.

> Phát hành một throttled  job trở lại vào queue vẫn sẽ tăng tổng số lần thử `attempts`.
> 
Ngoài ra, bạn có thể chỉ định số lượng woker tối đa có thể xử lý đồng thời một job nhất định. Điều này có thể hữu ích khi một queue job đang sửa đổi một tài nguyên chỉ nên được sửa đổi bởi một job tại một thời điểm. Ví dụ: sử dụng `funnel` method, bạn có thể giới hạn các job thuộc loại đã cho chỉ được xử lý bởi một woker tại một thời điểm:
```
Redis::funnel('key')->limit(1)->then(function () {
    // Job logic...
}, function () {
    // Could not obtain lock...

    return $this->release(10);
});
```

> Khi sử dụng rate limiting, số lần thử job của bạn sẽ cần chạy thành công có thể khó xác định. Do đó, rất hữu ích khi kết hợp giới hạn tỷ lệ với `time based attempts`.
> 
### Error Handling
Nếu một exception được thrown trong khi job đang được xử lý, job sẽ tự động được giải phóng trở lại vào queue để có thể thử lại lần nữa. Job sẽ tiếp tục được release cho đến khi nó đã được thử số lần tối đa cho phép của ứng dụng của bạn. Số lần thử tối đa được xác định bởi  `--tries` switch được sử dụng trên `queue: work` Artisan CLI. Ngoài ra, số lần thử tối đa có thể được xác định trên chính job class. Thông tin thêm về việc chạy queue woker có thể được tìm thấy [dưới đây](https://laravel.com/docs/5.8/queues#running-the-queue-worker).

## References document
https://laravel.com/docs/5.8/queues