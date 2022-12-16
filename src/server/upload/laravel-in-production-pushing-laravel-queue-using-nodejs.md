Tiếp nối series [Laravel in production](https://viblo.asia/s/laravel-in-production-zD5dB8O4ZjY), bài viết này của mình sẽ chia sẻ về việc làm việc với laravel queue thông qua `nodejs`

Hầu hết các bạn code laravel đều đã sử qua (không ít thì nhiều) tính năng `Queue` của nó. Việc đẩy 1 `queue` vào hàng chờ queue được `laravel` đơn giản hóa rất nhiều và rất dễ thực hiện. Ví dụ:

```php
Queue::push(new InvoiceEmail($order));

Bus::dispatch(new InvoiceEmail($order));

dispatch(new InvoiceEmail($order));

(new InvoiceEmail($order))->dispatch();
```

Hay một số cách `phức tạp` hơn như:
```php
// Push the job on a specific queue
Queue::pushOn('emails', new InvoiceEmail($order));

// Push the job after a given number of seconds
Queue::later(60, new InvoiceEmail($order));

// Push the job on a specific queue after a delay
Queue::laterOn('emails', 60, new InvoiceEmail($order));

// Push multiple jobs
Queue::bulk([
    new InvoiceEmail($order),
    new ThankYouEmail($order)
]);

// Push multiple jobs on a specific queue
Queue::bulk([
    new InvoiceEmail($order),
    new ThankYouEmail($order)
], null, 'emails');
```

Cho dù vậy, bạn cũng chỉ cần 2-3 dòng code là có thể đẩy 1 queue vào hàng chờ rồi.
Tuy nhiên, nếu bạn muốn đẩy 1 queue vào hàng chờ nhưng không sử dụng laravel mà sử dụng nodejs thì sao? Chúng ta phải đẩy nó vào như thế nào???

Xuất phát từ một bài toán thực tế của mình. Project của mình có nhận `callback` chứa action của user, đôi khi số lượng `callback` trong 1 khoảng thời gian tăng đột biến (có thể tới hơn x000 callback / 1 phút - x không baby).

Theo cách cũ thì mỗi khi nhận được `callback` mình sẽ xử lý qua dữ liệu và đẩy nó vào `queue `để xử lý tuần tự. Tuy nhiên, khi số lượng callback tăng đột biến thì laravel xử lý không có kịp và dẫn đến việc thất thoát dữ liệu. Chính vì đó, sếp của mình đã yêu cầu tách riêng việc nhận callback và xử lý dữ liệu từ user ra, không dùng laravel mà sử dụng 1 ngôn ngữ khác.

Do khá vội nên mình đã quyết định sử dụng nodejs (vì mình code js khá là quen tay :lol:).
Việc xử lý dữ liệu hay nhận callback thì khá là đơn giản rồi. Công việc của mình chỉ là đẩy dữ liệu vào queue để laravel lấy ra và xử lý thôi.
Lúc đó mình nghĩ khá là đơn giản, chỉ cần xem khi thằng laravel push một queue vào redis thì dữ liệu được nó format như thế nào thì mình làm tương tự thôi.
Tuy nhiên, mình khá là `ngạc nhiên` khi dữ liệu nó push vào redis không hề `dễ đọc` một chút nào, và việc format tương tự nó bằng tay gần như bất khả thi :cry:

Bắt đầu tìm hiểu sâu hơn, thì dữ liệu của một queue trước khi khi được đẩy vào redis sẽ có dạng:
```php
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
    'id' => RAMDOM_STRING_LEN_32,
    'attempts' => 0,
];
```

sau đó nó được `stringify` và đẩy vào redis.

Vậy công việc bây giờ chỉ là xác định phương thức `serialize(clone $job)` hoạt động như nào và kết quả của nó là gì nữa là được.

Xem trong document của php thì kết quả của `serialize` là 1 string
> A string that contains a byte-stream representation of value. The string can be stored anywhere

Ví dụ:
```php
$data = serialize(["Red", "Green", "Blue"]);
// a:3:{i:0;s:3:"Red";i:1;s:5:"Green";i:2;s:4:"Blue";}
```

Bạn có thể thấy 1 số thứ khá là lạ, `a:3`, `i:0;s:3`,... là sao, nó có ý nghĩa gì nhỉ? :lol:

Để hiểu được nó, bạn nên tham khảo 2 bảng bên dưới:

Bảng dưới đây chứa các ký tự và kiểu dữ liệu tương ứng với nó:
| Symbol | Type |
|---|---|
| B | `[01]` |
| D | `[0-9]` |
| S | `[a-zA-Z0-9_]` |
| K | `integer|string` |
| V | `integer|string+|float|boolean|null|class|array|object` |

Bảng dưới đây là format dữ liệu, bạn có thể xem dữ liệu dạng nào sẽ được format như thế nào.
| Type | Format | Note |
|---|---|---|
| integer | `i:<D+>;` | `i:<value>;` |
| float | `d:<D+.D+>;` | `d:<value>;` |
| string | `s:<D+>:"<S+>";` | `s:<length of string>:"<string>";` |
| boolean | `b:<B>;` | `b:<true of false>;` notice that it can only be either 1 or 0; |
| null | `n;`|  |
| class | `c:<D+>:"<S+>":<D+>:{<S+>}` | `c:<length of class name>:<class name>:<length of value>:{<value>}` |
| array | `a:<D+>:{<[KV]+>}` | `a:<size of properties>:{<property_key><property_value>......}` |
| object | `o:<D+>:"<S+>":<D+>:{<[KV]+>}` | `o:<length of object/class name>:"<object/class name>":<size of properties>:{<property_key><property_value>......}` |
| resource | `r:<D+>;` | `r:<resource id>;` |

Nhìn lại ví dụ trên:
```php
$data = serialize(["Red", "Green", "Blue"]);
// a:3:{i:0;s:3:"Red";i:1;s:5:"Green";i:2;s:4:"Blue";}

// Phân tích 1 chút
// a:3 => array có size là 3
// i:0;s:3:"Red"; => <property_key><property_value>
// i:0 => giá trị integer 0
// s:3;"Red" => string có độ dài là 3
// i:0;s:3:"Red"; => 0 => "Red"
```

Tiếp theo, chúng ta cùng đi `serialize(clone $job)`.
Như các bạn đã biết, một `job` trong laravel sẽ bao gồm các thành phần mặc định sau:
```php
$job // protected - trait InteractsWithQueue
$connection
$queue
$chainConnection
$chainQueue
$delay
$chained
```

Ngoài ra, bạn còn có các variables và các functions được khai báo thêm nữa.

Ví dụ, mình có 1 job sau:
```php
<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class Demo implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $testSting;
    
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
        //
    }
}
```

Bây giờ mình tạo 1 job và xem cấu trúc dữ liệu của nó như nào nhé.
```php
use App\Jobs\Demo;
$demo = new Demo();

/*
=> App\Jobs\Demo {#5800
    +connection: null,
    +queue: null,
    +chainConnection: null,
    +chainQueue: null,
    +delay: null,
    +chained: [],
}
*/
```

Các bạn có thể thấy, job này có 6 dữ liệu (public) => khi mình `serialize` job này, ngoài các dữ liệu public này, mình sẽ phải `convert` thêm 1 biến protected tên là `$testString` có độ dài là 12 và 1 biến protected có tên là `$job` với độ dài là 6 (do kí tự `$` sẽ được convert nên độ dài của `$job` là 6 chứ không phải là 4).

```php
serialize(clone $demo);

// "O:13:"App\Jobs\Demo":8:{s:12:"\0*\0testSting";N;s:6:"\0*\0job";N;s:10:"connection";N;s:5:"queue";N;s:15:"chainConnection";N;s:10:"chainQueue";N;s:5:"delay";N;s:7:"chained";a:0:{}}"
```

Okie, vậy là hiểu qua cách mà php nó làm rồi, giờ chúng ta cần thực hiện trên nodejs. 

Sau khi loay hoay với các câu `if-else` để convert dữ liệu thì mình tìm ra 1 thư viện hỗ trợ mình trong việc này :smile: [php-serialization](https://www.npmjs.com/package/php-serialization) - thư viện này siêu cũ luôn (Published 5 years ago) - tuy nhiên nó đáp ứng đủ nhu cầu mà mình cần.

Sau khi cài cắm xong, mình bắt đầu sử dụng nó để convert job.
Nhắc lại 1 chút, một job trong laravel trước khi được `stringify` và đưa vào redis thì nó có dạng
```php
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
    'id' => RAMDOM_STRING_LEN_32,
    'attempts' => 0,
];
```

Vậy nên khi chuyển qua `nodejs`, chúng ta sẽ có:
```js
// For serialize php class
const serialize = require('php-serialization').serialize;
const Class = require('php-serialization').Class;

// Push callback event to queue
const pushToQueue = () => {
    const job = new Class(CALLBACK_HANDLER_CLASS);

    // Class attr
    job.__addAttr__('testString', 'string', data, 'string', 'protected');

    // Default data
    job.__addAttr__('job', 'string', '', 'null', 'protected');
    job.__addAttr__('connection', 'string', '', 'null');
    job.__addAttr__('queue', 'string', '', 'null');
    job.__addAttr__('chainConnection', 'string', '', 'null');
    job.__addAttr__('chainQueue', 'string', '', 'null');
    job.__addAttr__('delay', 'string', '', 'null');
    job.__addAttr__('chained', 'string', '{}', 'array');

    // Serialize job before push into queue
    const result = {
        displayName: CALLBACK_HANDLER_CLASS,
        job: 'Illuminate\\Queue\\CallQueuedHandler@call',
        maxTries: null,
        timeout: null,
        timeoutAt: null,
        data: {
            commandName: CALLBACK_HANDLER_CLASS,
            command: serialize(job, 'object')
        },
        id: generateUid(32),
        attempts: 0
    };

    const channel = CALLBACK_CHANNEL;
    queue.RPUSH(channel, JSON.stringify(result));
};
```

Vậy là xong, chúng ta đã đẩy được một job của laravel từ nodejs vào redis :smile:

Một lưu ý nho nhỏ khi xử lý dữ liệu trước khi đẩy vào redis, các bạn cần convert dữ liệu dạng string/text sang unicode trước nhé.
```js
// Add prototype for convert text to unicode
String.prototype.toUnicode = function () {
    let result = "";
    for (let i = 0; i < this.length; i++) {
        result += "\\u" + ("000" + this[i].charCodeAt(0).toString(16)).substr(-4);
    }

    return result;
};
```