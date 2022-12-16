Hí anh em! Chắc hẳn mọi người khi phát triển ứng dụng web dù là PHP, Ruby hay Nodejs cũng đã ít nhiều nghe qua, sử dụng và tìm hiểu về khái niệm Job Queue. 

Trong bài viết này chúng ta hãy thử tìm hiểu xem Queue Worker cụ thể trong 1 ứng dụng **Laravel** hoạt động ra sao nhé.

# Khái niệm
Như các bạn đã biết thì **Hàng đợi (Queue)** là một danh sách những việc cần làm (**Job**) được quản lý theo thứ tự (**FIFO**). 

> Trong Laravel để thêm một công việc (**Job**) vào hàng đợi, **Job** phải implement interface **Illuminate\Contracts\Queue\ShouldQueue**.

**Job** ở đây đơn giản chính là những thông tin như **Job Class** (chỉ là *namespaced* name thôi nhé) bạn đã khai báo, các data trong class đó (đối với object job), cùng với construct param mà bạn pass vào sẽ được lưu vào `redis, database, file` hay gì tùy driver bạn chọn.

# Vậy thì Queue Workers hoạt động như thế nào ?

## Điểm bắt đầu
Chắc nhiều bạn không còn xa lạ gì với command này phải không ?
```
php artisan queue:work
```
Đây là ***command*** bắt buộc phải chạy để Queue của chúng ta hoạt động, tất nhiên mình bỏ qua trường hợp các bạn để `QUEUE_CONNECTION=sync` nhé.

> Ở đây mình không để cập tới `queue:listen`, vì bản chất nó chỉ call `queue:work --once` command trong vòng lập vô hạn, cụ thể hơn mình có giải thích thêm ở phần dưới.

Okay đây là điểm bắt đầu, chúng ta bắt tay vào việc thôi nào!

Không gặp chút khó khăn nào khi chúng ta tìm ngày ra được class `Queue\Console\WorkCommand` trong thư mục `vendor` của **Laravel**, đây chính là class định nghĩa cho command trên, tạm thời bỏ qua các thứ râu ria khác chúng ta hãy tập trung vào method `handle()` vì đây chính là method sẽ được `Execute` khi chạy command `php artisan queue:work`

```
public function handle()
{
    if ($this->downForMaintenance() && $this->option('once')) {
        return $this->worker->sleep($this->option('sleep'));
    }

    $this->listenForEvents();

    $connection = $this->argument('connection')
                    ?: $this->laravel['config']['queue.default'];

    $queue = $this->getQueue($connection);

    $this->runWorker(
        $connection, $queue
    );
}
```

Đầu tiên, chúng ta thấy ngay 1 đoạn `if` check `maintenance mode` và option `--once`, đoạn này tạm hiểu là sẽ không thực hiện job nào cả mà để cho anh công nhân (worker) `ngủ` 1 lúc, đến khi nào cặp điều kiện kia `sai` thì tiếp tục làm việc.

> Vậy tại sao không return `null` trong `handle()` để kết thúc `Command` ?

Như đã để cập ở phía trên command `queue:listen` thực chất chỉ là gọi `WorkCommand` trong vòng lặp vô hạn, cụ thể các bạn có thể xem đoạn code sau trong class `Queue\Console\ListenCommand`

```
while (true) {
     // Đây thực chất là chạy command 'php artisan queue:work --once'
    $this->runProcess($process, $options->memory);
}
```

## Listening for events
Sau khi điều kiện phía trên thoả mãn, chúng ta call đến method `listenForEvents()`

```
protected function listenForEvents()
{
    $this->laravel['events']->listen(JobProcessing::class, function ($event) {
        $this->writeOutput($event->job, 'starting');
    });

    $this->laravel['events']->listen(JobProcessed::class, function ($event) {
        $this->writeOutput($event->job, 'success');
    });

    $this->laravel['events']->listen(JobFailed::class, function ($event) {
        $this->writeOutput($event->job, 'failed');

        $this->logFailedJob($event);
    });
}
```

Có vẻ như ở đây chúng ta lắng nghe các sự kiện mà `Worker` bắn ra trong quá trình làm việc, sau đó thực hiện in ra cho người dùng các thông tin của tiến trình xử lý công việc (Job), chắc các message này không quá xa lạ với chúng ta rồi.

Ở đây chúng ta chú ý tới mehod `logFailedJob` 1 chút thôi, đọc tên method thì cũng có thể đoán được chương trình rồi. Nhưng cứ thử xem cụ thể chút nhé 

```
protected function logFailedJob(JobFailed $event)
{
    $this->laravel['queue.failer']->log(
        $event->connectionName, $event->job->getQueue(),
        $event->job->getRawBody(), $event->exception
    );
}
```

Ở đây chúng ta để ý tới container alias `queue.failer` được đăng ký (register) tại `Queue\QueueServiceProvider::registerFailedJobServices()` 

```
/**
 * Register the failed job services.
 *
 * @return void
 */
protected function registerFailedJobServices()
{
    $this->app->singleton('queue.failer', function ($app) {
        $config = $app['config']['queue.failed'];

        if (isset($config['driver']) && $config['driver'] === 'dynamodb') {
            return $this->dynamoFailedJobProvider($config);
        } elseif (isset($config['table'])) {
            return $this->databaseFailedJobProvider($config);
        } else {
            return new NullFailedJobProvider;
        }
    });
}

/**
 * Create a new database failed job provider.
 *
 * @param  array  $config
 * @return \Illuminate\Queue\Failed\DatabaseFailedJobProvider
 */
protected function databaseFailedJobProvider($config)
{
    return new DatabaseFailedJobProvider(
        $this->app['db'], $config['database'], $config['table']
    );
}

/**
 * Create a new DynamoDb failed job provider.
 *
 * @param  array  $config
 * @return \Illuminate\Queue\Failed\DynamoDbFailedJobProvider
 */
protected function dynamoFailedJobProvider($config)
{
    $dynamoConfig = [
        'region' => $config['region'],
        'version' => 'latest',
        'endpoint' => $config['endpoint'] ?? null,
    ];

    if (! empty($config['key']) && ! empty($config['secret'])) {
        $dynamoConfig['credentials'] = Arr::only(
            $config, ['key', 'secret', 'token']
        );
    }

    return new DynamoDbFailedJobProvider(
        new DynamoDbClient($dynamoConfig),
        $this->app['config']['app.name'],
        $config['table']
    );
}
```

Trong trường hợp config `queue.failed` trong file `config/queue.php` của application được cài đặt. Các thông tin của `failed job` sẽ được lưu trữ vào database.

## Running the worker

```
    $this->runWorker(
        $connection, $queue
    );
```

Để `công nhân` của chúng ta có thể làm việc thì cần 2 thứ

* Nơi mà công nhân có thể lấy công việc về (như kiểu redmine vậy) ở đây là `connection`
```
    $connection = $this->argument('connection')
                    ?: $this->laravel['config']['queue.default'];
```
> `queue.default` thông thường chúng ta sẽ sử dụng là `database` hoặc `redis` 
* Hàng đợi (queue) mà công nhân sẽ tìm công việc hay gọi là `queue name`
```
$queue = $this->getQueue($connection);
```
> Tương tự như trên tham số `queue` nếu không truyền vào bằng options `--queue={queue_name}` thì mặc định sẽ được config trong file `config/queue.php`

Và sau khi có đủ *thiên thời, địa lợi, nhân hoà*, chúng ta đến với bước cuối cùng, làm việc thôi 

```
protected function runWorker($connection, $queue)
{
    $this->worker->setCache($this->laravel['cache']->driver());

    return $this->worker->{$this->option('once') ? 'runNextJob' : 'daemon'}(
        $connection, $queue, $this->gatherWorkerOptions()
    );
}
```

## Kết bài

Mehod `runWorker()` được gọi sau cùng để `công nhân` thực hiện công việc cụ thể nào đó (Job). Tuy nhiên chúng ta sẽ thắc mắc răng công việc đó sẽ được thực hiện như thế nào ? Đến khi nào thi công việc hoàn thành, và chuyện gì sẽ xảy ra nếu công việc không thể hoàn thành hoặc sau khi hoàn thành thì sao ? Có được thưởng hay không ? 

Để giải đáp các thắc mắc đó, xin hẹn các bạn ở bài viết sau nhé!