# What is async
Chắc hẳn bạn đã nghe tới cái khác niệm lập trình đồng bộ (synchronous) và lập trình bất đồng bộ (asynchronous), gọi tắt là sync và async.

Lập trình đồng bộ tức là các dòng code được thực hiện tuần tự, đoạn code ở dưới phải đợi cho đến khi đoạn code ở trên kết thúc.

Còn đối với xử lý bất đồng bộ thì đoạn code ở dưới có thể chạy khi mà đoạn code ở trên chưa thực thi xong. Hai function được gọi theo thứ tự, nhưng function được gọi sau không phải chờ function được gọi trước kết thúc, mà có thể thực hiện gần như đồng thời. Các bạn có thể quen thuộc với kiểu lập trình này ở JS qua việc sử dụng `callback` trong `setTimeout`, promise chain hay async/await function.

Có thể kể đến một số ứng dụng của async programming như:

- Xử lý đồng thời các tác vụ độc lập với nhau
- Xử lý các tác vụ tốn thời gian (như network request (network I/O), read file (file I/O)...) mà không block toàn bộ ứng dụng, trong lúc chờ đợi kết quả vẫn có thể xử lý các tác vụ khác

# Async in PHP
Đa số người ta viết PHP code theo cách đồng bộ.

Tuy nhiên cũng có khá nhiều thư viện hỗ trợ lập trình async trong PHP như [amphp](https://amphp.org/), [ReactPHP](https://reactphp.org/), [Swoole](https://www.swoole.co.uk/), [Guzzle](https://guzzlephp.org/), hay thậm chí [ext-curl](https://www.php.net/manual/en/book.curl.php) của PHP và gần đây là [PHP Fibers](https://wiki.php.net/rfc/fibers).

Trong loạt bài viết lần này mình sẽ giới thiệu và thực hành một số use case bằng các thư viện trên.

Bắt đầu với use case đơn giản. Request đồng thời nhiều HTTP requests.

Giả sử bạn muốn lấy data từ 1 list urls, và việc xử lý data của các url này là độc lập với nhau, thay vì phải đợi request và xử lý từng url thì chúng ta có thể tăng tốc bằng cách request đồng thời.

Trước hết, ta sẽ giả lập response trả về bằng 1 đoạn script đơn giản sau (nhận request, sleep random từ 1 - 5 giây và trả về thông tin thời gian bắt đầu request, thời gian kết thúc):
```php:/var/www/html/php-async/test-server.php
<?php
$startAt = (new DateTime)->format('H:i:s.u');
$id = uniqid(microtime(true), true);

$sleepSeconds = random_int(1, 5);
sleep($sleepSeconds);

$endAt = (new DateTime)->format('H:i:s.u');
echo sprintf(
    "Request: %s - %s, start at: %s, end at: %s, sleep: %ss\n",
    $_GET['idx'],
    $id,
    $startAt,
    $endAt,
    $sleepSeconds
);
```

> Lưu ý: để có xử lý nhiều requests đồng thời script trên cần được chạy bằng server Apache hoặc Nginx (PHP_FPM), không dùng được php built-in server `php -S`

# Using `curl_multi_*` functions
Code sẽ trông như thế này, tham khảo ví dụ từ [php.net](https://www.php.net/manual/en/function.curl-multi-init.php#refsect1-function.curl-multi-init-examples):
```php
<?php

$urls = [
    'http://localhost/php-async/test-server.php?idx=0',
    'http://localhost/php-async/test-server.php?idx=1',
    'http://localhost/php-async/test-server.php?idx=2',
    'http://localhost/php-async/test-server.php?idx=3',
    'http://localhost/php-async/test-server.php?idx=4',
];

$mh = curl_multi_init();
$ch = [];

foreach ($urls as $i => $url) {
    $ch[$i] = curl_init($url);
    curl_setopt($ch[$i], CURLOPT_HEADER, 0);
    curl_multi_add_handle($mh, $ch[$i]);
}

$stillRunning = false;
do {
    $status = curl_multi_exec($mh, $stillRunning);
    if ($stillRunning) {
        curl_multi_select($mh);
    }
} while ($stillRunning && $status == CURLM_OK);

foreach ($urls as $i => $url) {
    curl_multi_remove_handle($mh, $ch[$i]);
    curl_multi_remove_handle($mh, $ch[$i]);
}

curl_multi_close($mh);
```

Chạy và đo thời gian:
```sh
$ time php curl-multi.php
Request: 1 - 1621538974.747660a6b89eb68655.36131754, start at: 02:29:34.747604, end at: 02:29:36.747731, sleep: 2s
Request: 0 - 1621538974.747660a6b89eb68655.98181748, start at: 02:29:34.747602, end at: 02:29:37.747731, sleep: 3s
Request: 4 - 1621538974.74860a6b89eb69c53.64626377, start at: 02:29:34.747964, end at: 02:29:37.748057, sleep: 3s
Request: 2 - 1621538974.747660a6b89eb68665.55875691, start at: 02:29:34.747611, end at: 02:29:38.747733, sleep: 4s
Request: 3 - 1621538974.74860a6b89eb69c89.01137781, start at: 02:29:34.747967, end at: 02:29:39.748083, sleep: 5s
php curl-multi.php  3.48s user 1.55s system 99% cpu 5.034 total
```

Các bạn có thể thấy các request được thực hiện bất đồng bộ (response trả về không theo thứ tự url index), gần như là đồng thời và thời gian tổng cả cũng chỉ là 5.034s, trong khi nếu thực hiện chạy đồng bộ lấy từng url thì thời gian ít nhất cần để chạy đó là 2+3+3+4+5=17s.

# Using `stil/curl-easy`

[stil/curl-easy](https://github.com/stil/curl-easy) là một thư viện nhỏ nhằm mục đích đơn giản hoá API khi làm việc với `ext-curl`.

Ngoài việc support HTTP request như thông thường (tức là request url và đợi kết quả trả về), thư viện này còn support *non-blocking* request (sử dụng event và loop :D) và *concurrent* requests (sử dụng request queue...)

Ví dụ đơn giản về *non-blocking request*:
```php:single-non-blocking.php
<?php
require __DIR__ . '/vendor/autoload.php';

$request = new \cURL\Request('http://localhost/php-async/test-server.php?idx=0');

$request->getOptions()
    ->set(CURLOPT_TIMEOUT, 5)
    ->set(CURLOPT_RETURNTRANSFER, true);

$request->addListener('complete', function (\cURL\Event $event) {
    $response = $event->response;
    echo PHP_EOL . $response->getContent();
});

while ($request->socketPerform()) {
    usleep(5000);
    echo '.';
}
```

Đoạn code thực hiện:

- *Lắng nghe* **event** khi request complete
- **Loop** để check trạng thái của request, nếu chưa hoàn thành thì in ra các dấu `.`, ở đây chính là 1 ví dụ nhỏ về *non-blocking*. Tức là việc request url sẽ không block toàn bộ script, trong lúc request ta vẫn có thể thực hiện các lệnh in ra màn hình.

```
$ time php single-non-blocking.php
................................................................................
................................................................................
...............
Request: 0 - 1622390987.839360b3b8cbccebc7.89817479, start at: 23:09:47.839332, end at: 23:09:52.839520, sleep: 1s
php single-non-blocking.php  0.04s user 0.02s system 6% cpu 1.037 total
```

Đối với nhiều request, thư viện cũng support gọi nhiều request đồng thời:
```php:concurrent-non-blocking.php
<?php
require __DIR__ . '/vendor/autoload.php';

$queue = new \cURL\RequestsQueue;

$queue->getDefaultOptions()
    ->set(CURLOPT_TIMEOUT, 10)
    ->set(CURLOPT_RETURNTRANSFER, true);

$queue->addListener('complete', function (\cURL\Event $event) {
    $response = $event->response;
    echo PHP_EOL . $response->getContent();
});


$urls = [
    'http://localhost/php-async/test-server.php?idx=0',
    'http://localhost/php-async/test-server.php?idx=1',
    'http://localhost/php-async/test-server.php?idx=2',
    'http://localhost/php-async/test-server.php?idx=3',
    'http://localhost/php-async/test-server.php?idx=4',
];

foreach ($urls as $url) {
    $queue->attach(new \cURL\Request($url));
}

while ($queue->socketPerform()) {
    usleep(5000);
    echo '.';
}
```

Kết quả cho thấy các request được thực hiện gần như đồng thời, không theo thứ tự:
```
time php concurrent-non-blocking.php
................................................................................
....................
Request: 0 - 1622391224.132560b3b9b8205852.45873521, start at: 23:13:44.132469, end at: 23:13:45.132648, sleep: 1s
............................................................
................................................................................
................................................................................
...........................................................................
Request: 1 - 1622391224.132960b3b9b8207223.73405442, start at: 23:13:44.132887, end at: 23:13:48.133039, sleep: 4s

Request: 2 - 1622391224.133260b3b9b82086f3.76820359, start at: 23:13:44.133222, end at: 23:13:48.133497, sleep: 4s

Request: 4 - 1622391224.133560b3b9b8209985.63173946, start at: 23:13:44.133520, end at: 23:13:48.133657, sleep: 4s
.....
................................................................................
..............
Request: 3 - 1622391224.133260b3b9b8208761.13729419, start at: 23:13:44.133230, end at: 23:13:49.133398, sleep: 5s
php concurrent-non-blocking.php  0.04s user 0.03s system 1% cpu 5.050 total
```

Các bạn có thể xem thêm các ví dụ khác, cách xử lý lỗi, đã được tài liệu rất chi tiết tại [github repo](https://github.com/stil/curl-easy#examples).

# Using Guzzle

Guzzle là một HTTP Client khá phổ biến, có hỗ trợ thực hiện async requests, với API linh hoạt và đơn giản.

Ví dụ 1:
```php
<?php

require_once(__DIR__ . '/vendor/autoload.php');
use GuzzleHttp\Client;
use GuzzleHttp\Promise\Utils;
use Psr\Http\Message\ResponseInterface;
use GuzzleHttp\Exception\RequestException;

$client = new Client;

$urls = [
    'http://localhost/php-async/test-server.php?idx=0',
    'http://localhost/php-async/test-server.php?idx=1',
    'http://localhost/php-async/test-server.php?idx=2',
    'http://localhost/php-async/test-server.php?idx=3',
    'http://localhost/php-async/test-server.php?idx=4',
];

$promises = [];

foreach ($urls as $idx => $url) {
    $promises[] = $client->getAsync($url)
        ->then(
            function (ResponseInterface $response) {
                echo $response->getBody();
                return $response;
            },
            function (RequestException $e) {
                echo $e->getMessage();
            }
        );
}

// Wait for the requests to complete; throws an exception
// if any of the requests fail
// Return array of ResponseInterface object
$results = Utils::unwrap($promises);

// Or: Wait for the requests to complete, even if some of them fail
// $results = Utils::settle($promises)->wait();
```

Ở đây có 2 cách handle requests:

- `unwrap`: Đợt các request hoàn thành nhưng sẽ ném ra exception nếu có 1 request bị lỗi
- `settle`: Đợi tất cả request hoàn thành

Tuy nhiên, lưu ý là do đã handle từng promise thông qua `->then()` nên `unwrap` hay `settle` có tác dụng như nhau. Để nó chạy đúng theo comment thì cần phải bỏ phần handle đó đi:
```diff
foreach ($urls as $idx => $url) {
+    $promises[] = $client->getAsync($url . '?idx=' . $idx);
-        ->then(
-            function (ResponseInterface $response) {
-                echo $response->getBody();
-                return $response;
-            },
-            function (RequestException $e) {
-                echo $e->getMessage();
-            }
-        );
}
```

Hoặc có thể thay `unwrap` hay `settle` bằng vòng for:
```php
foreach ($promises as $promise) {
    $response = $promise->wait();
}
```

Lưu ý tiếp theo là nếu handle promise thông qua `->then()` mà vẫn muốn có kết quả khi gọi `$results = Utils::unwrap($promises);` hoặc `$response = $promise->wait();` thì phải return bên trong function fullfilled:
```diff
foreach ($urls as $idx => $url) {
    $promises[] = $client->getAsync($url . '?idx=' . $idx)
        ->then(
            function (ResponseInterface $response) {
                echo $response->getBody();
+                return $response;
            },
            function (RequestException $e) {
                echo $e->getMessage();
            }
        );
}
```

Promise object được implements theo [Promises/A+](https://promisesaplus.com/) spec, và nằm trong thư viện có thể dùng riêng biệt [Guzzle promises](https://github.com/guzzle/promises).

Trường hợp không xác định được tổng số lượng requests cần thực hiện, chúng ta có thể sử dụng Pool object để gửi tối đa X requests mỗi lần:
```php
<?php

require_once(__DIR__ . '/vendor/autoload.php');
use GuzzleHttp\Client;
use GuzzleHttp\Pool;
use GuzzleHttp\Psr7\Request;
use Psr\Http\Message\ResponseInterface;
use GuzzleHttp\Exception\RequestException;

$client = new Client;

$requests = function ($total) {
    $uri = 'http://localhost/php-async/test-server.php';
    for ($i = 0; $i < $total; $i++) {
        yield new Request('GET', $uri . '?idx=' . $i);
    }
};

$pool = new Pool($client, $requests(9), [
    'concurrency' => 3,
    'fulfilled' => function (ResponseInterface $response, $index) {
        echo $index . ' - ' . $response->getBody();
        return $response;
    },
    'rejected' => function (RequestException $e, $index) {
        echo $index . ' - ' . $e->getMessage();
    },
]);

// Initiate the transfers and create a promise
$promise = $pool->promise();

// Force the pool of requests to complete.
$promise->wait();
```

Ví dụ trên ta có tổng 9 requests tạo bằng `Generator` hoặc cũng có thể là mảng object `Request`, sẽ có tối đa 3 request được thực hiện đồng thời tại 1 thời điểm.

Tuy nhiên, bạn có thể thấy là requests sẽ không được thực hiện cho đến khi bạn gọi các function `wait()`, `unwrap()` hay `settle()`, vốn là các function đồng bộ. Tức là code PHP vốn dĩ là đồng bộ, chỉ có một số PHP extensions support async theo một số use case cụ thể, ví dụ `ext-curl` như trên. Thực tế thì Guzzle cũng sử dụng các function `curl_multi_*` ở bên dưới => [CurlMultiHandler](https://github.com/guzzle/guzzle/blob/master/src/Handler/CurlMultiHandler.php)

Để dễ hình dung hơn, bạn có thể thử đoạn code dưới đây:
```php
<?php

require_once(__DIR__ . '/vendor/autoload.php');
use GuzzleHttp\Client;
use Psr\Http\Message\ResponseInterface;
use GuzzleHttp\Exception\RequestException;

$client = new Client;
$promise = $client->getAsync('http://localhost/php-async/test-server.php?idx=0');
$promise->then(
    function (ResponseInterface $response) {
        echo $response->getBody();
        return $response;
    },
    function (RequestException $e) {
        echo $e->getMessage();
    }
);

$promise->wait();

echo 'I am here!!!' . PHP_EOL;
```

Nếu không gọi `wait()` thì request sẽ không được thực hiện, mà gọi `wait()` thì sẽ function sẽ bị block cho đến khi request thực hiện xong.

> Github thread: https://github.com/guzzle/guzzle/issues/1127

# To be continued
> Có thể bạn đã biết, AWS PHP SDK cũng sử dụng Guzzle làm HTTP Client nên nó cũng support thực hiện async requests.
> > You can send the command asynchronously (returning a promise) by appending the word "Async" to the operation name: $client->commandNameAsync(/* parameters */).
> > https://docs.aws.amazon.com/aws-sdk-php/v3/api/api-s3-2006-03-01.html
>
> Có thể ứng dụng như khi email SES hàng loạt, upload/download S3 files...

> Ngoài ra còn một vài thư viện HTTP Client nữa như [amphp/http-client](https://amphp.org/http-client/), [react/http](https://reactphp.org/http/) tuy nhiên có một số khái niệm liên quan event loop, promise, coroutine,... cần tìm hiểu trước khi sử dụng.

Trên đây là một ví dụ nhỏ về ứng dụng của async programming trong PHP. Trong bài tiếp theo chúng ta sẽ cùng tìm hiểu về thư viện `amphp` và PHP Fiber.