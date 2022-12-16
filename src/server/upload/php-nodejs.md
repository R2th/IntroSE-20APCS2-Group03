Chào mọi người, có lẽ mới đọc cái tiêu đề `PHP == NodeJS` mọi người nghĩ cú lừa chăng, và trả lời ngay là không thể có chuyện đó ngoại trừ việc cả PHP và nodeJS đều có thể code backend. Còn riêng việc xử lý bất đồng bộ (async) thì PHP tuổi gì so với NodeJS. Mình cũng đã nghĩ như thế, và các dự án PHP đã và đang làm cũng đều nghĩ ngay đến javascript để làm mấy việc realtime, bất đồng bộ, hay đa luồng này kia. Nhưng sự thực PHP và những thư viện hỗ trợ cho nó còn nhiều điều mạnh mẽ mà ta chưa biết, mạnh và kín tiếng khiến người ta quên nó là ai và nó đang ở đâu.

Hôm nay mình cùng các bạn chúng ta sẽ cùng tìm hiểu, đào bới lại xem sao. Mình cũng sẽ cố gắng viết vài bài, coi như vừa làm vừa tìm hiểu để xem tại sao người ta lại dùng `Nó` ít vậy. Vậy  `Nó` là cái gì ?

![](https://images.viblo.asia/9af689e8-9881-4834-af1b-813ff57428a1.png)

Đây là chủ đề hôm nay mình muốn bàn tới và đang cố gắng tìm hiểu, thật ra mình đã biết đến nó vài năm trước qua một người bạn tuy nhiên chưa nhận ra điều đặc biệt nên cũng chưa bao giờ áp dụng trong dự án, cho đến khi đọc được một bài thấy mấy anh Mẽo nhận xét `reactPHP = NodeJS` thì mình mới ngớ ra trước giờ chúng ta phụ thuộc vào `JS` quá. Nào cùng xem nó có gì mà bọn USA lại nó vậy.

> ReactPHP cơ bản chỉ là tập các thư viện PHP được dùng kết hợp với framework có sẵn hoặc php app để tạo ra một ứng dụng hoàn chỉnh, cốt lõi của nó là Event loop cung cấp các tiện ích, ví dụ như : Streams abstraction, xử lý DNS bất đồng bộ, network client/server, HTTP client/server và tương tác với các process.
> 

Nghe đến khái niệm `Event loop` lại làm chúng ta nghĩ ngay ra JS. Nó là cơ chế giúp javascript thực hiện nhiều tác vụ cùng lúc, nó có tên gọi như vậy là vì có một vòng lặp vô hạn trong javascript runtime để lắng nghe các Events. ReactPHP cũng có nhé.
## ReactPHP có gì ?
### Core components
#### Event loop
#### Stream
#### Promise
### Network Components
#### Socket
#### Datagram
### Protocol Components
#### HTTP
#### HTTPClient
#### DNS
### Utility Components
#### Cache
#### ChildProcess
#### PromiseStream
#### PromiseTimer

Trong khuôn khổ của bài viết hôm nay mình sẽ tập trung giới thiệu về `Event loop` và `Timer` trong phần core component nhé.

Trước khi bắt đầu chúng ta cần lưu ý rằng, `bất đồng bộ` không có nghĩa là `song song` chỉ là chúng ta không xử lý php theo kiểu blocking như trước mà là non-blocking.
## Event loop

![](https://images.viblo.asia/7cd19c4b-ac14-49d3-8a68-b939bd795e4f.jpg)

Event loop là thành phần cốt lõi của reactPHP, implement từ Reator pattern, nó là thành phần cấp thấp nhất và mọi thành phần khác đều phải sử dụng nó. Event loop chạy trên một thread và chịu trách nhiệm lập lịch cho những xử lý bất đồng bộ.

Để sử dụng event loop khá đơn giản
```javascript
composer require react/event-loop:^1.1.0
```

Tiếp theo là khởi tạo một `loop`
```PHP
<?php
$loop = React\EventLoop\Factory::create();

// Code sử dụng $loop

$loop->run();
```
Trong đoạn code trên chúng ta sử dụng implementations `Factory` để khởi tạo một loop. Trong factory đơn giản là lựa chọn những tiện ích có sẵn và chọn ra cái phù hợp với loop của chúng ta.

Ví dụ một chút về khả năng xử lý interval với `event loop` chúng ta tạo file test.php
```php
<?php

require __DIR__ . '/../vendor/autoload.php';

$loop = React\EventLoop\Factory::create();

$loop->addTimer(0.8, function () {
    echo 'world!' . PHP_EOL;
});

$loop->addTimer(0.3, function () {
    echo 'hello ';
});

$loop->run();
```

Chạy file trên khá đơn giản chỉ cần 
```php
php test.php
```
output
> hello world!

Chúng ta có thể thấy hàm addTimer cho phép định nghĩa thời gian khi nào thì chạy lệnh nào, nên ở đây hello sẽ được chạy trước vì thời gian set delay là 0.3s còn world! sẽ chạy sau vì delay 0.8s.
## Timer
![](https://images.viblo.asia/0940bde8-3ed7-4f8a-8e2e-dbea27c5338f.jpg)

Timer có thể xử lý code trước hoặc sau một khoảng thời gian, tương tự interval và timeout trong javascript. 

Như theo ví dụ trên thì chúng ta có thể set thời gian thực thi cho một đoạn code nào đó, xác định thành phần nào cần chạy trước và thành phần nào cần chạy sau.

Ngoài ra chúng ta có thể set cho đoạn code chạy đến khi nào thì dừng lại, giống như `break` trong vòng lặp vậy.
```php
<?php

require __DIR__ . '/../../../../vendor/autoload.php';

$loop = React\EventLoop\Factory::create();
$count = 0;

$timer = $loop->addPeriodicTimer(0.1, function () use (&$count) {
    echo ++$count. PHP_EOL;
});

$loop->addTimer(1.0, function () use ($loop, $timer) {
    $loop->cancelTimer($timer);
    echo 'OK Done' . PHP_EOL;
});

$loop->run();

```
và kế quả 
> 1
2
3
4
5
6
7
8
9
OK Done
>

Ở đây chúng ta sử dụng `addPeriodicTimer` để lặp đi lặp lại 0.1s một lần việc in ra biến $count sau khi đã tăng lên 1 đơn vị. sau đó trong function `addTimer` được chạy vào thời điểm delay 1s, tại đây có gọi function `cancelTimer` sẽ có nhiệm vụ dừng việc đếm bên trên lại và in ra `OK Done`.

Cả 2  ví dụ trên chúng ta đều thực thi loop đơn giản với việc gọi function 
```php
$loop->run();
```

Để dừng một loop lại chúng ta có thể gọi :
```php
$loop->stop();
```

## Kết luận
Trên đây là một vài giới thiệu của mình về thư viện reactPHP và một số tác dụng của nó, chỉ là một phần nhỏ trong những thứ mà reactPHP có thể làm được, trong bài viết sau mình sẽ cố gắng đi sau vào nhiều ví dụ cụ thể hơn để làm rõ liệu PHP có thực sự so sánh với NodeJS trong việc xử lý bất đồng bộ được hay không. Hy vọng reactPHP sẽ không làm mình và các bạn thất vọng!

## Tham khảo
https://reactphp.org/event-loop/

https://medium.com/@kornatzky/reactphp-is-node-js-in-php-82830c71004e