### Mở đầu:
- Khi viết các thư viện liên quan đến call API từ client, thường chúng ta nghe nhắc đến nổi tiếng nhất là **Guzzle, an extensible PHP HTTP client**(https://github.com/guzzle/guzzle), việc viết thư viện quan trọng hàng đầu chính là viết test case, guzzle còn hổ trợ việc viết test bằng cách mocking fake response.
### Mock Handler
- Khi testing http client, chúng ta thường cần fake response trả về, guzzle giúp ta tạo response dạng mảng, và việc call api sẽ theo order của mảng, rất đơn giản với mock handler: 
````
use GuzzleHttp\Client;
use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Exception\RequestException;

// Create a mock and queue two responses.
$mock = new MockHandler([
    new Response(200, ['X-Foo' => 'Bar']),
    new Response(202, ['Content-Length' => 0]),
    new RequestException("Error Communicating with Server", new Request('GET', 'test'))
]);

$handler = HandlerStack::create($mock);
$client = new Client(['handler' => $handler]);

// The first request is intercepted with the first response.
echo $client->request('GET', '/')->getStatusCode();
//> 200
// The second request is intercepted with the second response.
echo $client->request('GET', '/')->getStatusCode();
//> 202

````

- Khi không còn response trong mảng queue, một exception OutOfBoundsException sẽ được trả lại .
### History Middleware
- Trong khi mock handler respond giúp ta tạo các kết quả theo trình tự dự tính, thì history middleware giúp ta dễ dàng check lịch sử request trong client.
````
use GuzzleHttp\Client;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Middleware;

$container = [];
$history = Middleware::history($container);

$stack = HandlerStack::create();
// Add the history middleware to the handler stack.
$stack->push($history);

$client = new Client(['handler' => $stack]);

$client->request('GET', 'http://httpbin.org/get');
$client->request('HEAD', 'http://httpbin.org/get');

// Count the number of transactions
echo count($container);
//> 2

// Iterate over the requests and responses
foreach ($container as $transaction) {
    echo $transaction['request']->getMethod();
    //> GET, HEAD
    if ($transaction['response']) {
        echo $transaction['response']->getStatusCode();
        //> 200, 200
    } elseif ($transaction['error']) {
        echo $transaction['error'];
        //> exception
    }
    var_dump($transaction['options']);
    //> dumps the request options of the sent request.
}

````

###  Vẫn chưa hài lòng, chuyển qua dùng "Using the test server".
Thay vì chỉ fake response bằng cách gán trước, cách này dùng nodejs tạo real local server và queue fake response trong server này.
````
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Tests\Server;

// Start the server and queue a response
Server::enqueue([
    new Response(200, ['Content-Length' => 0])
]);

$client = new Client(['base_uri' => Server::$url]);
echo $client->request('GET', '/foo')->getStatusCode();
// 200
````

### Testing is so easy, happy coding