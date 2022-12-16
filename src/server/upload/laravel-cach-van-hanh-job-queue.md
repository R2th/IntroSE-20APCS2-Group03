## Giới thiệu 

 Đã bao giờ bạn tự hỏi, queue laravel thật sự hoạt động như thế nào chưa :smile:, vừa rồi có dịp tìm hiểu nên mình cũng muốn giới thiệu chi tiết tới mọi người luôn 
 
## Nhóm để chạy queue:work
### WorkCommand

 Là class sẽ đăng kí comman chạy cho laravel 
 ![](https://images.viblo.asia/539a476d-1a37-43af-9481-b4ef8fa8b133.png)

### Worker

1 đơn vị xử lí, nơi tạo vòng lặp xử lí, bóc tách job ra khỏi queue để xử lí (có thể hiểu giống như 1 process của CPU)

```
    /**
     * Listen to the given queue in a loop.
     *
     * @param  string  $connectionName
     * @param  string  $queue
     * @param  \Illuminate\Queue\WorkerOptions  $options
     * @return int
     */
    public function daemon($connectionName, $queue, WorkerOptions $options)
    {
        if ($this->supportsAsyncSignals()) {
            $this->listenForSignals();
        }

        $lastRestart = $this->getTimestampOfLastQueueRestart();

        [$startTime, $jobsProcessed] = [hrtime(true) / 1e9, 0];

        while (true) {
            // Before reserving any jobs, we will make sure this queue is not paused and
            // if it is we will just pause this worker for a given amount of time and
            // make sure we do not need to kill this worker process off completely.
            if (! $this->daemonShouldRun($options, $connectionName, $queue)) {
                $status = $this->pauseWorker($options, $lastRestart);

                if (! is_null($status)) {
                    return $this->stop($status);
                }

                continue;
            }

            // First, we will attempt to get the next job off of the queue. We will also
            // register the timeout handler and reset the alarm for this job so it is
            // not stuck in a frozen state forever. Then, we can fire off this job.
            $job = $this->getNextJob(
                $this->manager->connection($connectionName), $queue
            );

            if ($this->supportsAsyncSignals()) {
                $this->registerTimeoutHandler($job, $options);
            }

            // If the daemon should run (not in maintenance mode, etc.), then we can run
            // fire off this job for processing. Otherwise, we will need to sleep the
            // worker so no more jobs are processed until they should be processed.
            if ($job) {
                $jobsProcessed++;

                $this->runJob($job, $connectionName, $options);

                if ($options->rest > 0) {
                    $this->sleep($options->rest);
                }
            } else {
                $this->sleep($options->sleep);
            }

            if ($this->supportsAsyncSignals()) {
                $this->resetTimeoutHandler();
            }

            // Finally, we will check to see if we have exceeded our memory limits or if
            // the queue should restart based on other indications. If so, we'll stop
            // this worker and let whatever is "monitoring" it restart the process.
            $status = $this->stopIfNecessary(
                $options, $lastRestart, $startTime, $jobsProcessed, $job
            );

            if (! is_null($status)) {
                return $this->stop($status);
            }
        }
    }
```
- Trong woker tạo một vòng lặp liên tục
- Nếu queue bị pause thì stop job lại 
- Lấy job tiếp theo từ database job (có thể là database, redis, ...)
- Nếu có job sẽ tiến hành xử lí 
- Xử lí xong job, sleep 1 khoảng thời gian, rồi tiến hành chạy lại vòng lặp lấy job ra chạy tiếp

### Queue
Nơi tạo load define job, payload, event, setting connection để lưu trữ queue

```
- createPayload
- createObjectPayload
- getDisplayName
- getJobBackoff
- getJobExpiration
- createStringPayload
- pushOn
- laterOn
- bulk
```

### Job
Đơn vị nhỏ nhất chứa công việc cần được xử lí, sẽ được đẩy vào queue và xử lí dần dần
```
abstract class Job
public function uuid()
public function fire()
public function delete()
public function isDeleted()
public function release($delay = 0)
protected function failed($e)
```

## Nhóm của queue:listen
Thường được dùng để chạy command cho việc phát triển ở local, giống queue:work phía trên nhưng command này giúp lắng nghe thay đổi của source code để reload lại queue để apply code mới của chúng ta mỗi lần chúng ta edit

### ListenCommand
Nơi define command cho queue:listen
![](https://images.viblo.asia/5f4af9df-3d92-467d-a441-2fdaea6135b8.png)

### class Listener
Nơi run process cho command queue:listen, như ta thấy cũng giống trên kia, nó chạy bằng 1 vòng `while (true)`

```
    /**
     * Listen to the given queue connection.
     *
     * @param  string  $connection
     * @param  string  $queue
     * @param  \Illuminate\Queue\ListenerOptions  $options
     * @return void
     */
    public function listen($connection, $queue, ListenerOptions $options)
    {
        $process = $this->makeProcess($connection, $queue, $options);

        while (true) {
            $this->runProcess($process, $options->memory);
        }
    }
```


## Cách supervisor mở các queue để chạy
Dùng supervisor, ta có thể mở số lượng woker tuỳ ý, phù hợp với yêu cầu business và cấu hình server, thông thường đối với 1 server tầm trung mình nghĩ mở tầm 8 => 10 woker là đủ

![](https://images.viblo.asia/bf8e9799-503c-4fdc-a33c-0b7e2395730d.png)

### Mình đã mô tả sơ qua cách vận hành của job và worker trong laravel rồi nhé, hy vọng sẽ giúp ích được cho các bạn :grinning: