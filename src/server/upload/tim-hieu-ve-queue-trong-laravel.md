&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Laravel cung cấp cho chúng ta rất nhiều loại queue để sử dụng như **Beanstalk, Amazon SQS, Redis, hoặc Database**.  **Hàng đợi - Queue** cho phép chúng ta trì hoãn xử lý 1 tác vụ tốn thời gian. Chẳng hạn gửi email, việc trì hoãn các tác vụ này sẽ giúp tăng đáng kể tốc độ request tới ứng dụng.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; File cấu hình được lưu trong **config/queue.php**. Trong file này ta sẽ cấu hình connection cho các queue driver **database, Beanstalkd, Amazon SQS, Redis hoặc là 1 driver synchronous** mà các job sẽ được thực thi ngay lập tức. Một queue driver **null** cũng có thể sử dụng để từ chối sử dụng queue job (coi nhu ko sử dụng queue).
# 1. Connections Vs. Queues
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mỗi 1 cấu hình connection trong file cấu hình **queue** có chứa 1 thuộc tính queue. Đây là queue mặc định mà các job sẽ được **gửi đi - dispatched** khi chúng được gửi đến 1 connection. Nói cách khác, nếu ta dispatch 1 job mà không chỉ ra cụ thể queue nào sẽ được gửi vào thì job này mặc định sẽ được đặt trong queue mà đã được chỉ ra trong cấu hình connection đó

```
// This job is sent to the default queue...
Job::dispatch();

// This job is sent to the "emails" queue...
Job::dispatch()->onQueue('emails');
```


# 2. Driver Notes & Prerequisites

## 2.1 Database

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Để sử dụng queue driver **database**, ta cần phải có 1 table để giữ các jobs. Như vậy trong app ta cần tạo ra 1 migration mà tạo ra bảng này. Ta có thể chạy lệnh **queue:table** như sau:


```
php artisan queue:table

php artisan migrate
```


## 2.2 Redis
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Để sử dụng queue driver Redis, ta cần cấu hình connection sẽ là redis trong file **config/database.php**


# 3. Creating Jobs

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Mặc định tất cả các job trong app được lưu trong file **app/Jobs**. Ta có thể tạo ra 1 job mới thông qua câu lệnh
```
php artisan make:job ProcessPodcast
```

## 3.1 Class Structure

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Các class job này rất đơn giản chỉ chứa duy nhất 1 method handle, nơi sẽ được thực thi khi job được xử lý bởi queue. Giả sử ta có 1 class job mà ta quản lý dịch vụ xuất bản các podcast và  cần phải upload các podcast files trước khi nó được xuất bản:

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

## 3.2 Dispatching Jobs


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Khi đã có 1 job class, ta có thể dispach (gửi) nó vào hàng đợi bằng cách sử dụng method **dispatch**. Arguments mà được truyền vào method dispatch sẽ được nhận bởi contructor của job class

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

## 3.3 Delayed Dispatching

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nếu ta muốn làm trễ việc thực thi 1 job được đưa vào queue, ta có thể sử dụng method **delay** khi dispatch job đó. Ví dụ, để chỉ ra 1 job nên được xử lý sau 10s kể từ khi được dispatch

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
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Đối với dịch vụ  queue của Amazon SQS chỉ có tối đa 15 phút được phép delay cho 1 job

## 3.4 Synchronous Dispatching

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nếu ta muốn dispatch một job nào đó và muốn nó chạy ngay lập tức (đồng bộ) thì ta sẽ sử dụng method **dispatchNow**. Khi dùng method này, job sẽ được đưa vào queue mà sẽ chạy ngay lập tức trong tiến trình hiện tại

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


## 3.5 Job Chaining
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Job chining cho phép ta chỉ ra 1 list các job queue mà sẽ chạy theo thứ tự, nếu 1 trong các job đó bị fail, các job còn lại sẽ không chạy nữa. Để sử dụng job chain, ta dùng method **withChain**

```
ProcessPodcast::withChain([
    new OptimizePodcast,
    new ReleasePodcast
])->dispatch();
```

## 3.6 Specifying Max Job Attempts / Timeout Values

### 3.6.1 Max Attempts

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Để chỉ ra số lần tối đã các job cố gắng được thực hiện ta sử dụng **--tries** trong  Artisan command line

```
php artisan queue:work --tries=3
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hoặc có 1 cách khác có độ ưu tiên hơn cách trên đó là ta sử dụng thuộc tính** $tries** trong job class:

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

### 3.6.2 Time Based Attempts

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Chúng ta cũng có thể chỉ ra thời gian tối đa cho phép 1 job cố gắng được xử lý trước khi nó bị đánh là fail - timeout. Chúng ta sử dụng method **retryUntil** trong job class

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

### 3.6.3 Timeout

Thời gian chạy tối đa cho 1 job có thể chỉ ra trong Artisan command line thông qua **--timeout**:

```
php artisan queue:work --timeout=30
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Một cách khác ta cũng có thể làm là chỉ ra trong job class và cách này sẽ ưu tiên hơn cách chỉ ra trong command ở trên:

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

### 3.6.4 Rate Limiting

Nếu app của chúng ta tương tác với **Redis**, ta có thể **throttle** các job bởi thời gian và độ chính xác. Ví dụ, ta có thể sử dụng method **throttle** để throttle 1 job chỉ có thể chạy 10 lần trong vòng 60s. Nếu 1 lock không thể đạt được, ta sẽ đưa lại job đó vào queue để nó có thể thử lại vào lần sau

```
Redis::throttle('key')->allow(10)->every(60)->then(function () {
    // Job logic...
}, function () {
    // Could not obtain lock...

    return $this->release(10);
});
```

Ở trên, '**key**' có thể là bất kì chuỗi nào để định danh duy nhất loại job nên được rate limit.
<br>

> Chú ý: Nếu đưa trở lại 1 job bị throttle vào queue thì job này vẫn sẽ bị tính vào tổng số lần attempts

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ngoài ra, ta có thể chỉ ra số **worker** đồng thời có thể xử lý 1 job. Điều này rất hữu ích khi 1 job trong queue đang chỉnh sửa 1 tài nguyên mà tài nguyên đó chỉ nên bị chỉnh sửa bởi duy nhất 1 job tại 1 thời điểm. Ta có thể sử dụng method **funnel**, nó cho phép ta giới hạn các job thuộc 1 loại nào đó chỉ nên được xử lý bởi 1 worker tại 1 thời điểm.

```
Redis::funnel('key')->limit(1)->then(function () {
    // Job logic...
}, function () {
    // Could not obtain lock...

    return $this->release(10);
});
```

# 4. Error Handling
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Nếu 1 **exception** nào đó được **thrown** ra trong khi job đang được xử lý, job đó sẽ tự động được đưa trở lại vào queue để job đó có thể được cố gắng xử lý lại. Job đó sẽ tiếp tục được đưa trở lại queue cho đến khi vượt quá số lần được cho phép bởi app. Số lần tối đa cố gắng thực hiện 1 job được chỉ ra bởi **--tries** trong câu lệnh queue:work của Artisan command. Ngoài ra, nó cũng có thể được chỉ trong job class

<br>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Trên đây, ta đã xem xét qua về Queue trong Laravel, đối với queue thì ta thường hay sử dụng driver connection là database hoặc Redis là chính

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tài liệu tham khảo: https://laravel.com/docs/5.8/queues