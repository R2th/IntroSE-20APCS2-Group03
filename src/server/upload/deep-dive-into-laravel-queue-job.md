Laravel là 1 php framework out of box được rất nhiều người sử dụng, nó mang cho chúng ta khá nhiều tiện lợi nhưng đôi khi việc đó hạn chế chúng ta hiểu rõ những dòng code mình đang viết.

Queue Job trong Laravel là thứ chúng ta hay sử dụng, nhưng lại có nhiều thắc mắc về nó mà chưa được giải đáp, nếu bạn đang có những câu hỏi giống như mình thì cùng tìm hiểu nhé:

- Queue là gì ? Job là gì ?
- Chúng ta có thể dùng Redis, Mysql ... để lưu Job. Vậy job được lưu như thế nào, dưới dạng gì ? Là cả app instance à, không làm sao nó chạy được :v ? **câu hỏi ngu mình từng hỏi =))
- Tại sao cùng là 1 job đó nếu chạy sync thì có thể truy cập session, request nhưng nếu async thì không truy cập được.

## 1. Queue là gì ? Job là gì ?
### Queue
Queue như các bạn được học ở trường là 1 kiểu cấu trúc dữ liệu, có cơ chế FIFO. Queue job ở đây cũng thế và thứ mà được lưu là Job thôi.

Một điều mà nhiều bạn hay hiểu lầm là Queue Job sẽ thực thi Job (mình từng nghĩ thế :v), điều này là sai lầm, Queue Job đơn giản là 1 Queue để lưu Job.

Và Module Queue ở trong laravel là công cụ giúp ta giao tiếp với Queue Job đó, ví dụ như Redis Queue.

### Job
Job ở đây đơn giản chính là những thông tin như Job Class (chỉ là namespaced name thôi nhé) bạn đã khai báo, các data trong class đó (đối với object job), cùng với construct param mà bạn pass vào sẽ được lưu vào Redis, database, file hay gì tùy driver bạn chọn.

## 2. How Queue Job work
**Phần này sẽ là phần xạo lòng về cách queue job trong laravel hoạt động, được mình tổng hợp từ nhiều nguồn và nhiều người.

Ví dụ: Giả sử có anh A sử dụng chức năng export csv trong hệ thống của chúng ta, thay vì thực thi đồng thời và bắt anh ấy đợi đến cho lúc nhận được response mà không được tắt cái tab đi.

Thì ta sẽ ném cái job xuất csv nặng nề đó vào queue và trả về ngay response với 1 message: "Quá trình xuất file đã bắt đầu, chúng tôi sẽ thông báo khi hoàn thành".

Sau đó khi hoàn thành thì thông báo cho anh A kết quả.

Mình sẽ liệt kê những thành phần chính chúng ta sẽ tìm hiểu:

1. PHP Process - 1 process php được tạo để xử lý request trên, và tất nhiên nó cũng sẽ tạo ra 1 laravel instance

2. Worker - 1 process php khác - chứa 1 laravel app instance khác - điều khác biệt ở đây là nó đã được khởi tạo từ trước, không bị kill khi thực hiện xong 1 yêu cầu.

3. Queue - 1 queue chứa namespace name của job và data, được lưu trong Redis.

4. Job - Class và data khởi tạo.

__Ở đây mình sẽ mô tả cách thức hoạt động của queue job với hệ thống mà process thực thi request http và woker (process thực thi job) cùng 1 server, queue job là redis và cũng cùng 1 server đó luôn.__

Đầu tiên là Worker, là 1 process php, sẽ được khởi chạy đầu tiên, ví dụ chúng ta đang dùng queue ExportCSV để chạy tác vụ xuất csv thì Worker để làm việc với queue sẽ được khởi chạy bằng câu lệnh sau `php artisan queue:work --queue=ExportCSV`

Ở đây, đầu tiên chúng ta sẽ khởi chạy app qua file __artisan__ thay vì __public/index.php__ và thay vì sử dụng Http Kernel như khi xử lý http request thì laravel sẽ dùng Console Kernel, process này chúng ta gọi là worker.

Bạn hãy đọc thêm những bài viết sau trước khi đọc tiếp.

https://divinglaravel.com/queue-workers-how-they-work

https://divinglaravel.com/preparing-jobs-for-queue

https://divinglaravel.com/pushing-jobs-to-queue

Mình bổ sung thêm 1 chút về cách 1 job được worker resolve từ queue và chạy như thế nào. Trong bài "Preparing jobs for queue" tác giả nói sẽ giải thích ở phần tiếp theo nhưng không thấy nhắc đến nữa.

> Why do we pass a different class as the "job" parameter?
> Queue\CallQueuedHandler@call is a special class Laravel uses while running object-based jobs, we'll look into it in a later stage.

Trong laravel chúng ta có thể pass job theo 2 định dạng: object và string

__String__
```
dispatch('ExportCSV@handle', ['filter' => $filter])
```

__Object__
```
dispatch(new ExportCSV($filter))
```

Các bạn hãy xem lại hàm createObjectPayload và createStringPayload trong `vendor/laravel/framework/src/Illuminate/Queue/Queue.php` để xem cách 2 loại data sẽ được format như thế nào.

Và bây giờ các bạn hãy xem hàm fire trong Class Job

```
public function fire()
    {
        $payload = $this->payload();

        list($class, $method) = JobName::parse($payload['job']);

        ($this->instance = $this->resolve($class))->{$method}($this, $payload['data']);
    }
```

và hàm JobName::parse($job)

```
public static function parse($job)
    {
        return Str::parseCallback($job, 'fire');
    }
```

hàm Str::parseCallback

```
public static function parseCallback($callback, $default = null)
    {
        return static::contains($callback, '@') ? explode('@', $callback, 2) : [$callback, $default];
    }
```

Nếu là job dạng String với format

```
[
    'displayName' => is_string($job) ? explode('@', $job)[0] : null,
    'job' => $job, 'maxTries' => null,
    'timeout' => null, 'data' => $data,
];
```

Thì câu lệnh `list($class, $method) = JobName::parse($payload\['job']);` sẽ trả về ngay `$class = 'ExportCSV' và $method = 'handle'`, một instance của ExportCSV sẽ được khởi tạo bằng hàm resolve từ container, và hàm handle sẽ đc gọi trực tiếp.

Nhưng với Object thì khác, chúng ta cùng xem lại format của object job:

```
$job = [
            'displayName' => $this->getDisplayName($job),
            'job' => 'Illuminate\Queue\CallQueuedHandler@call',
            'maxTries' => $job->tries ?? null,
            'timeout' => $job->timeout ?? null,
            'timeoutAt' => $this->getJobExpiration($job),
            'data' => [
                'commandName' => get_class($job),
                'command' => serialize(clone $job),
            ],
];
```

Khi `$job->fire();` được gọi thì câu lệnh thực sự được thực hiện là:

`(new Illuminate\Queue\CallQueuedHandle)->call($job, $job['data'])`

Giờ chúng ta hãy cùng nhìn vào hàm call.

```
public function call(Job $job, array $data)
    {
        try {
            $command = $this->setJobInstanceIfNecessary(
                $job, unserialize($data['command'])
            );
        } catch (ModelNotFoundException $e) {
            return $this->handleModelNotFound($job, $e);
        }

        $this->dispatcher->dispatchNow(
            $command, $this->resolveHandler($job, $command)
        );

        if (! $job->hasFailed() && ! $job->isReleased()) {
            $this->ensureNextJobInChainIsDispatched($command);
        }

        if (! $job->isDeletedOrReleased()) {
            $job->delete();
        }
    }
```

Những dòng này:

```
try {
            $command = $this->setJobInstanceIfNecessary(
                $job, unserialize($data['command'])
            );
        } catch (ModelNotFoundException $e) {
            return $this->handleModelNotFound($job, $e);
        }
```

là để set property $job trong Trait InteractsWithQueue, hợp lý đúng không, nhưng tại sao với String Job chúng ta không cần set mà Object Job lại cần ? (Phiên trước mình viết sai, cái này sẽ check lại sau, khả năng đây là bug, InteractsWithQueue khả năng sẽ không hoạt động với String Format).

Thứ mà chúng ta thực sự cần quan tâm là đây:

```
 $this->dispatcher->dispatchNow(
            $command, $this->resolveHandler($job, $command)
        );
```

`$this->resolveHandler($job, $command)` dòng này là để lấy handler của command ( tên cũ của job từ bản 5.0 https://laravel.com/docs/5.0/bus ), bạn có thể hiểu nó là job được tách ra thành 2 phần command (phần dữ liệu) và handler (phần xử lý) ( tìm hiểu ở đây https://martinbean.co.uk/blog/2019/03/21/command-bus-in-laravel/).

Và với mọi Job thông thường bạn hay dùng, không phải "command", thì hàm 

```
public function dispatchNow($command, $handler = null)
    {
        if ($handler || $handler = $this->getCommandHandler($command)) {
            $callback = function ($command) use ($handler) {
                return $handler->handle($command);
            };
        } else {
            $callback = function ($command) {
                return $this->container->call([$command, 'handle']);
            };
        }

        return $this->pipeline->send($command)->through($this->pipes)->then($callback);
    }
```

sẽ luôn chạy vào else và ở đây job đc thực thi ngay tại process hiện tại (worker). Nếu bạn không hiểu dòng cuối cùng, hãy đọc ở đây https://jeffochoa.me/understanding-laravel-pipelines?source=post_page-----a7191f75c351----------------------

**Mình hơi lan man với phần process job, các phần khác về push job vào queue hay pull job từ queue trong worker, các bạn có thể đọc trong những link mình viết ở trên.**

**Đến đây chắc hẳn các bạn đã hiểu rõ ràng về Queue Job System trong laravel, tiếp theo chúng ta sẽ tìm hiểu về vấn đề thứ 3 mà mình nêu ở trên.**

## 3. Access session, request in queue job
Khi bạn viết:

```
public function handle()
    {
        $something = request()->something;
        $userId = auth()->user()->id
    }
```

Vì queue job sẽ được chạy ở process khác nên những object được tạo mỗi lần xử lý request, như request hay session ở trong worker và process mà bạn push job là khác nhau.

Để queue job access được những giá trị đó bạn cần truyền chúng vào. Bạn vẫn có thể dùng type-hint inject bình thường.

```
public function __construct(Request $request, Guard $auth)
    {
        $this->something = $request->something;
        $this->userId = $auth->user()->id
    }
```

__Một điều nữa là làm sao để access file trong request trong queue__

> The file will be deleted from the temporary directory at the end of the request if it has not been moved away or renamed. - https://www.php.net/manual/en/features.file-upload.post-method.php

Do đó, nếu bạn không muốn phải pass cả dữ liệu của file theo định dạng base64 hay gì đó vào queue (sẽ ngốn rất nhiều tài nguyên), thì hãy move file đó.