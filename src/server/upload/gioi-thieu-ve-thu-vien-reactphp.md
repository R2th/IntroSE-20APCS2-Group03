Chả là trong cái thời gian dịch bài về [PSR-7](https://viblo.asia/p/psr-7-interface-cua-cac-thong-diep-http-LzD5dBWYZjY), mình có đọc qua về 1 thư viện không theo SAPI tên là ReactPHP. Và thế là tháng vừa rồi mình quyết định bỏ ra tí thời gian để xem qua rốt cục thư viện này có cái gì hay. Kết quả thu được của mình là hối hận vì đã học Lập trình mạng quá sớm (cry an ocean).

# Định nghĩa chung
Theo định nghĩa ở trên doc thì nó là:
> ReactPHP là một thư viện cấp thấp cho lập trình hướng sự kiện trong PHP. Tại lõi của nó là một vòng lặp sự kiện, trên đó nó cung cấp các tiện ích mức thấp, như: trừu tượng hóa các luồng, xử lý DNS không đồng bộ, mạng client/server, client/server HTTP và tương tác với các tiến trình. Thư viện của bên thứ ba có thể sử dụng các thành phần này để tạo client/server mạng không đồng bộ và nhiều hơn nữa.

Tức là sử dụng nó thì bạn cần kèm với các thư viện/framework khác để nó có thể là sản phẩm hoàn chỉnh chạy bằng browser mà chúng ta đã quen với việc dùng để chạy sản phẩm. Và nó thực sự tốt cho những ai đang học lập trình mạng hoặc mạng máy tính cần hiểu về các port cũng như giao thức TCP/IP,... Và nó cũng mang tính linh hoạt của PHP, giúp cho bạn có thể nhanh chóng hoàn thành 1 project lập trình liên quan tới port và socket chỉ trong 2 giờ!(ôi ký ức ác mộng đời mình. Chật vật trắng cả đêm với C cho môn Network Programming trong tình trạng bị 2 tên khóa trên bỏ học giữa chừng và phải đi báo cáo 1 mình(khoc) May mà qua môn. Qua đó thì mình thực sự ghét những thằng khốn nào bỏ mặc đồng đội đối phó với khó khăn 1 mình)
# Cài đặt và sử dụng
Sorry các bạn vì mấy dòng xàm le yếu lòng bên trên. Ok, chúng ta sẽ bước vào phần cài đặt.

Thực chất thì ReactPHP gồm nhiều component khác nhau, thế nên cái gọi là cài "framework" ReactPHP thực chất là bạn pick những component cần thiết. Và vì là thư viện PHP nên cách bạn cài nó đơn giản nhất là thông qua Composer:
```
$ composer require react/event-loop react/http
```
Và đây là kết quả câu lệnh trên:

![](https://images.viblo.asia/a9e0759b-95e1-440f-84b6-d691c357a127.jpg)
# Một số khái niệm cơ bản
## Event Loop và Timer
> Event Loop chính là cái core cơ bản nhất của ReactPHP nhằm tạo ra các sự kiện I/O.

Để gọi tới event loop, ta sẽ code như sau:
```php
$loop = React\EventLoop\Factory::create();
```
Sau đó ta sẽ gọi hàm
```php
$loop->run();
```
Như vậy là chương trình sẽ chạy.

Trong `EventLoop` sẽ có rất nhiều function mà bạn có thể sẽ nghiên cứu thêm ở doc chính mình nêu bên dưới. Tuy nhiên các function quan trọng nhất chính là việc xử lý timer.

Vậy khái niệm timer là gì?

> Timer là thời gian bạn đặt để cho ứng dụng chạy

Để cài đặt timer cho ứng dụng, ta sử dụng phương thức `addTimer(float $interval, callable $callback): TimerInterface`. Ví dụ minh họa:
```php
$loop->addTimer(1, function () {
    echo 'Quan that dep trai!';
});
```
Câu lệnh trên được thực thi sẽ cho kết quả 1 giây sẽ in ra 1 dòng `Quan that dep trai` trên server và nó sẽ in mãi cho tới đk nhất định(nếu bạn định nghĩa đk ấy) hoặc ngắt bằng Javascript.

Và cảm tưởng đầu tiên là nó hao hao cái lệnh được dùng và tùy chỉnh khi viết C++ ở mạch Arduino.(với `addTimer()` giống với `setup()` và `$loop->run` như `loop()` của Arduino C++ vậy)
## Streams
Tiếp tới là khái niệm các luồng dữ liệu. Theo như giải thích đơn giản từ các nguồn tutorial cho thư viện này trên mạng thì gói stream của ReactPHP sẽ có những interface xử lý cho non-block I/O bất đối xứng. Và rất hữu hiệu khi bạn làm 1 ứng dụng phim có khả năng download mà không gây tổn hại bộ nhớ hệ thống của bạn.
## Promises
Cái này thì giống hệt như Javascript vậy. Tuy nhiên nhảy ra 2 khái niệm nhỏ.
### Deffered
Deffered đại diện cho một tính toán hoặc đơn vị công việc có thể chưa hoàn thành. Thông thường (nhưng không phải luôn luôn), tính toán đó sẽ là một cái gì đó thực hiện không đồng bộ và hoàn thành tại một số điểm trong tương lai.
### Promise
Trong khi một Deffered đại diện cho tính toán chính nó, một Promise đại diện cho kết quả của tính toán đó. Do đó, mỗi Deffered có một Promise đóng vai trò như một placeholder cho kết quả thực tế của nó.
```php
$deferred = new React\Promise\Deferred();

$promise = $deferred->promise();

$deferred->resolve(mixed $value = null);
$deferred->reject(mixed $reason = null);
```
# Demo với ứng dụng chat
Mình chỉ demo nhanh tới ví dụ đầu theo như video list bên dưới. Còn lại tới demo vụ download thì thôi nhé. Các bạn tự mày mò tiếp. Mình lúc đầu vừa code vừa bắn CoD:MW2 nên lúc chạy ớ người là Windows chặn stream data. Thế là phải bật tạm C9 lên demo vì lý do máy chạy Linux cũng đang đi nghỉ mát ở cửa hàng sửa chữa.
Tạm lại thì đây là 3 cái source code chính.
## server
```php
<?php

require 'vendor/autoload.php';
require 'ConnectionsPool.php';

use React\Socket\ConnectionInterface;

$loop = React\EventLoop\Factory::create();
$socket = new React\Socket\Server('127.0.0.1:8000', $loop);
$pool = new ConnectionsPool();
$socket->on('connection', function (ConnectionInterface $connection) use ($pool) {
    $pool->add($connection);
});
echo "Listening on {$socket->getAddress()}\n";
$loop->run();

```
## client
```php
<?php

use Clue\React\Stdio\Stdio;
use React\Socket\ConnectionInterface;
use React\Socket\Connector;

require 'vendor/autoload.php';

$loop = \React\EventLoop\Factory::create();
$input = new \React\Stream\ReadableResourceStream(STDIN, $loop);
$output = new \React\Stream\WritableResourceStream(STDOUT, $loop);

$connector = new Connector($loop);
$connector->connect('127.0.0.1:8000')
    ->then(
        function (ConnectionInterface $connection) use ($input, $output) {
            $input->pipe($connection)->pipe($output);
        },
        function (Exception $exception) {
            echo $exception->getMessage() . PHP_EOL;
        }
    );

$loop->run();

```
## ConnectionPool
```php
<?php

use Colors\Color;
use React\Socket\ConnectionInterface;

final class ConnectionsPool
{
    private $connections;

    public function __construct()
    {
        $this->connections = new SplObjectStorage();
    }

    public function add(ConnectionInterface $connection)
    {
        $connection->write((new Color("Welcome to chat\n"))->fg('green'));
        $connection->write('Enter your name: ');
        $this->initEvents($connection);
        $this->setConnectionData($connection, []);
    }

    /**
     * @param ConnectionInterface $connection
     */

    private function initEvents(ConnectionInterface $connection)
    {
        // On receiving the data we loop through other connections
        // from the pool and write this data to them
        $connection->on('data', function ($data) use ($connection) {
            $connectionData = $this->getConnectionData($connection);
            // It is the first data received, so we consider it as
            // a users name.
            if (empty($connectionData)) {
                $this->addNewMember($data, $connection);
                return;
            }
            $name = $connectionData['name'];
            $this->sendAll((new Color("$name:"))->bold() . " $data", $connection);
        });
        // When connection closes detach it from the pool
        $connection->on('close', function () use ($connection) {
            $data = $this->getConnectionData($connection);
            $name = $data['name'] ?? '';
            $this->connections->offsetUnset($connection);
            $this->sendAll((new Color("User $name leaves the chat\n"))->fg('red'), $connection);
        });
    }

    private function addNewMember(string $name, ConnectionInterface $connection)
    {
        $name = str_replace(["\n", "\r"], '', $name);
        $this->setConnectionData($connection, ['name' => $name]);
        $this->sendAll((new Color("User $name joins the chat\n"))->fg('blue'), $connection);
    }
    private function setConnectionData(ConnectionInterface $connection, $data)
    {
        $this->connections->offsetSet($connection, $data);
    }
    private function getConnectionData(ConnectionInterface $connection)
    {
        return $this->connections->offsetGet($connection);
    }

    /**
     * Send data to all connections from the pool except
     * the specified one.
     *
     * @param mixed $data
     * @param ConnectionInterface $except
     */
    
    private function sendAll($data, ConnectionInterface $except)
    {
        foreach ($this->connections as $conn) {
            if ($conn != $except) {
                $conn->write($data);
            }
        }
    }
}

```
## Video demo
OK. Quay hơi fail nên mong các bạn thông cảm. Và vì vừa trải qua 1 cảm xúc đau buồn của game nên mình demo bằng đoạn này
{@embed: https://www.youtube.com/embed/fqoAVMDNJZE}
# Cảm nhận cá nhân
Mình chỉ mất tầm 1 tiếng để có thể code được cái app chat trên. Qủa thật nó đơn giản và nhanh kinh lên được. Tới độ mà giờ mình muốn gỡ điểm B môn Network Programming năm xưa lên điểm A(giải thích thêm: Hồi bị bỏ 1 mình ấy mình đã phải vật lộn 1 đống big cho cái sp lởm khởm bằng C. May mà demo được. Cơ mà lại thành đổi đề tài không được phân công như ban đầu nên mình B. Ngoài 2 thằng cha tự bỏ học bắt mình báo cáo 1 mình thì cả lớp đều A. Thế nên dù qua môn nhưng mình vẫn tiếc rẻ là giá như hồi đó biết cái này sớm hơn thì đã nâng được CPA rồi).
 
 Cảm ơn các bạn đã theo dõi bài viết
# Tham khảo
- Doc chính của [ReactPHP](https://reactphp.org/)
- Hướng dẫn tạo app đơn giản bằng video: https://www.youtube.com/playlist?list=PLKIEFFgNQYpVmUAKUjT_BRYYOdMHwGt0v