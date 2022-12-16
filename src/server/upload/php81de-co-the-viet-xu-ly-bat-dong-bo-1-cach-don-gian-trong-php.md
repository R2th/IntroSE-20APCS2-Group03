Nguồn: https://qiita.com/rana_kualu/items/6247441f6fdd63c10a06

PHP từ lâu đã được biết đến với phong cách xử lý đồng bộ, tức là làm mọi thứ từ trên xuống dưới.

Tuy nhiên, ví dụ: nếu bạn muốn tìm nạp dữ liệu từ nhiều URL và tóm tắt kết quả, bạn muốn thực hiện các yêu cầu HTTP tốn thời gian cùng một lúc.
Có một thư viện tên là Guzzle cho mục đích này, cho phép bạn thực hiện các yêu cầu cùng một lúc.
Nhưng điều gì sẽ xảy ra nếu bạn muốn truy cập HTTP và truy cập DB cùng một lúc?
Điều gì sẽ xảy ra nếu bạn muốn thực hiện các phép tính tốn thời gian ở background?
Khi bạn bắt đầu nghĩ về vấn đề này, bạn sẽ thấy các thư viện riêng lẻ này không thể xử lý riêng biệt.

Vì vậy, một RFC đã được tạo ra cho phép bạn viết xử lý không đồng bộ có mục đích chung trong PHP.
URL tham khảo: https://wiki.php.net/rfc/fibers

URL Guzzle: https://github.com/guzzle/guzzle

PHP RFC: Fibers

**Introduction**

Từ trước đến nay, hầu như người ta chỉ viết PHP dưới dạng mã đồng bộ.
Chỉ có mã chạy đồng bộ tồn tại, và chúng được gọi một cách đồng bộ.
Các hàm đồng bộ ngừng xử lý cho đến khi hàm trả về một kết quả.

Ngày nay, có một số dự án cho phép bạn viết mã PHP không đồng bộ.
Các hàm không đồng bộ thực thi mã sau khi thu được kết quả, chẳng hạn như bằng cách nhận lệnh Callback, hoặc trả về PlaceHolder có giá trị được cố định sau đó, như Promise.
Điều này cho phép bạn tiếp tục xử lý mà không cần đợi kết quả cuối cùng.
Ví dụ : amphp, ReactPHP và Guzzle.

Những thách thức mà RFC đang cố gắng giải quyết rất khó giải thích, nhưng tôi sẽ cố giải thích về vấn đề này.

Để tóm tắt ngắn gọn các vấn đề được mô tả trong bài viết của wiki URL ở trên:
-Các hàm không đồng bộ "trót lỡ" thay đổi cơ chế gọi các hàm.
-Các hàm không đồng bộ không thể gọi các hàm không đồng bộ. Bạn có thể gọi một chức năng đồng bộ hóa.
-Để gọi một hàm không đồng bộ, toàn bộ call stack phải là không đồng bộ.

Đối với những người đã quen với Promise, thường phải chờ đợi cho quá trình xử lý không đồng bộ, có thể đã nghĩ đến điều này.
"Nếu bạn cố gắng trả lại một Promise ở bất kỳ đâu trong Call Stack, toàn Call Stack sẽ phải trả lại một Promise vì bạn không biết khi nào nó sẽ được giải quyết."

RFC ra đời nhằm mục đích xử lý các số không đồng bộ và các hàm không đồng bộ mà không có sự phân biệt bằng cách đưa vào quá trình xử lý không đồng bộ có thể bị gián đoạn mà không làm ảnh hưởng đến toàn bộ call stack.
Điều này đạt được như sau:

-Hỗ trợ Fiber trong PHP.
-Thêm lớp Fiber và lớp phản xạ tương ứng ReflectionFiber.
-Thêm các lớp FiberError và FiberExit cho các lỗi.

Fiber cho phép bạn triển khai IO non proxy trên các giao diện hiện có như PSR-7 và Doctine ORM.
Điều này là do không sử dụng các Placeholder như Promise.

**Về Fiber**
Fiber cho phép bạn tạo các hàm full stack có khả năng phân tách ra.
Đây còn được gọi là coroutine hoặc green thread.

Fiber có thể dừng toàn bộ Execution Stack, vì vậy người gọi hàm không cần thay đổi lệnh gọi.

Bạn có thể sử dụng Fiber :: pause () để tạm dừng  theo ý muốn.
Lời gọi đến Fiber :: Suspements () có thể được lồng sâu trong hàm hoặc nó có thể không ở bất kỳ đâu.

Không giống như các Generator không có Stack, Fiber giữ call stack của riêng nó, vì vậy nó có thể tạm dừng ngay cả khi trong phần call có chứa những hàm đan xen phức tạp.
Không giống như các Generator, phải trả về một Generator Instance, các hàm sử dụng Fiber không cần phải thay đổi kiểu trả về.

Fiber có thể bị tạm dừng với bất kỳ lệnh gọi hàm nào, chẳng hạn như array_map, Iterator foreach hoặc một cuộc gọi từ bên trong một máy ảo PHP.
Để tiếp tục một Fiber bị tạm dừng, hãy tiếp tục với Fiber-> resume () hoặc ném một ngoại lệ với Fiber-> throw (). ,
Giá trị được trả về bằng Fiber :: susu () hoặc một ngoại lệ được ném ra.

Fiber được định nghĩa bằng PHP core、 signature như sau:

```php
final class Fiber
{
    /**
     * @param callable $callback Hàm callback
     */
    public function __construct(callable $callback) {}

    /**
     * Bắt đầu chạy
     *
     * @param mixed ...$args Param được đưa cho hàm callback
     *
     * @return mixed Nếu ngừng tạm thời thì là suspension point。Nếu kết thúc thì là null
     *
     * @throw FiberError Nếu đã được chạy
     * @throw Throwable Others
     */
    public function start(mixed ...$args): mixed {}

    /**
     * Mở lại fiber đang bị gián đoạn.
     *
     * @param mixed $value
     *
     * @return mixed Nếu ngừng tạm thời thì là suspension point。Nếu kết thúc thì là null
     *
     * @throw FiberError Nếu chưa được chạy, hay hiện tại đang tạm ngừng, Hoặc đã kết thúc 
     * @throw Throwable Others
     */
    public function resume(mixed $value = null): mixed {}

    /**
     * Ví dụ 
     *
     * @param Throwable $exception
     *
     * @return mixed 一Nếu ngừng tạm thời thì là suspension point。Nếu kết thúc thì là null
     *
     * @throw FiberError Nếu chưa được chạy, hay hiện tại đang tạm ngừng, Hoặc đã kết thúc 
     * @throw Throwable Others
     */
    public function throw(Throwable $exception): mixed {}

    /**
     * @return bool Đã bắt đầu chạy thì là true
     */
    public function isStarted(): bool {}

    /**
     * @return bool Nếu ngừng tạm thời thì là true
     */
    public function isSuspended(): bool {}

    /**
     * @return bool Nếu đang chạy  thì là true
     */
    public function isRunning(): bool {}

    /**
     * @return bool Nếu việc chạy đã kết thúc thì là true
     */
    public function isTerminated(): bool {}

    /**
     * @return mixed Trả giá trị hoàn lại của hàm callback 
     *
     * @throws FiberError Chưa xong
     */
    public function getReturn(): mixed {}

    /**
     * @return self|null Trả về Fiber Instance đang chạy trong hiện tại
     */
    public static function this(): ?self {}

    /**
     * Tạm ngừng việc chạy. Không gọi ra từ main thread.
     *
     *  Giả trị trả về từ throw() hay @param mixed resume()
     *
     * Giá trị đưa cho @return mixed resume()
     *
     * @throws FiberError Gọi từ main thread chẳng hạn 
     * @throws Throwable Others
     */
    public static function suspend(mixed $value = null): mixed {}
}
```

Tạo một object Fiber bằng cách truyền một hàm gọi lại tùy ý làm Fiber mới ($ callback có thể gọi lại).
Hàm gọi lại không nhất thiết phải gọi Fiber :: Susan ().
Nó có thể nằm sâu bên trong stack lồng nhau hoặc có thể không bao giờ được gọi.

object Fiber được tạo được bắt đầu bằng cách truyền Fiber-> start (mixed ... $ args) và các đối số.

Fiber :: pause () tạm dừng việc thực thi Fiber hiện tại và trả lại quá trình cho trình gọi của Fiber-> start (), Fiber-> resume (), Fiber-> throw ().
Bạn có thể coi nó như một cái gì đó tương tự như năng suất trong Generator.

Finer đã bị treo có thể được nối lại bằng hai cách sau.
--Khởi động lại bằng cách chuyển một giá trị cho Fiber-> resume ().
--Exception bằng cách truyền một giá trị cho Fiber-> throw ().

Từ Fiber đã xử lý, bạn có thể nhận giá trị trả về của hàm gọi lại với Fiber-> getReturn ().
Lỗi FiberError được đưa ra khi quá trình thực thi không được hoàn thành hoặc một ngoại lệ xảy ra.

Fiber :: this () trả về cá thể Fiber hiện đang chạy.
Điều này cho phép bạn đưa một tham chiếu Fiber đến một vị trí khác, chẳng hạn như một cuộc gọi lại event loop hoặc một mảng các cá thể Fiber bị treo.

**Reflection Fiber**
Reflection Fiber là phương thức kiểm tra Fiber đang chạy.
Bạn có thể tạo Reflection Fiber từ bất kỳ object Fiber nào, cho dù nó được thực thi trước hay hoàn tất.
ReflectionFiber rất giống với ReflectionGenerator.

```php

final class ReflectionFiber
{
    /**
     * @param Fiber Fiber object
     */
    public function __construct(Fiber $fiber) {}

    /**
     * @return Fiber Fiber object
     */
    public function getFiber(): Fiber {}

    /**
     * @return string  Tên file của Fiber đang chạy 
     */Nếu tạm dừng thì là 
    public function getExecutingFile(): string {}

    /**
     * @return int Số dòng của Fiber đang chạy 
     */
    public function getExecutingLine(): int {}

    /**
     * Giống với tham số của @param int $options debug_backtrace()
     *
     *  @return array Backtrace của Fiber 。Giống debug_backtrace() và ReflectionGenerator::getTrace().
     */
    public function getTrace(int $options = DEBUG_BACKTRACE_PROVIDE_OBJECT): array {}

    /**
     * @return bool Nếu đã bắt đầu thì là true
     */
    public function isStarted(): bool {}

    /**
     * @return bool Nếu tạm dừng thì là true
     */
    public function isSuspended(): bool {}

    /**
     * @return bool Nếu đang chạy thì là true
     */
    public function isRunning(): bool {}

    /**
     * @return bool Nếu chưa xong thì là true
     */
    public function isTerminated(): bool {}
}
```

**Fiber chưa hoàn thành**
Fiber, giống như một đối tượng thông thường, bị hủy khi không còn tham chiếu đến đối tượng.

Khi đó, Fiber chưa được thực thi sẽ bị hủy giống như Generator chưa được thực thi.
Không thể gọi lại Fiber bị phá hủy bằng Fiber :: Susan ().

**Fiber stack **

Mỗi thread  được gán một stack C riêng biệt và stack VM trên heap.
C stack được phân bổ bằng mmap khi có sẵn.
Đó là, bộ nhớ vật lý được sử dụng theo yêu cầu trên hầu hết các nền tảng.
Mỗi stack Fiber được cấp phát tối đa 8M theo mặc định và có thể được thay đổi với thiết lập ini fiber.stack_size.
Lưu ý rằng bộ nhớ này được cấp cho stack C và không liên quan gì đến bộ nhớ được PHP sử dụng.

stack VM phân bổ bộ nhớ và CPU theo cách giống như Trình tạo.
Vì stack VM có thể được thay đổi động nên chỉ 4K được sử dụng ở trạng thái ban đầu.

Các thay đổi ngược lại không tương thích
Các lớp Fiber / FiberError / FiberExit / ReflectionFiber được thêm vào không gian tên chung.
Không có thay đổi không tương thích ngược nào khác.

**Future Scope**

Việc triển khai hiện tại không cung cấp API Fiber nội bộ cho các phần mở rộng PHP.
RFC này tập trung vào API Fiber Userspace.
Các nhà phát triển dự định thêm API Fiber nội bộ với sự cộng tác của các nhà phát triển module tiện ích mở rộng khác.
Họ sẽ nhận được phản hồi từ các devloper của phần mở rộng PHP như Swoole để cho phép phần mở rộng kiểm soát Fiber.

Các module mở rộng có thể có triển khai giống như Fiber của riêng chúng, nhưng nếu một API nội bộ được cung cấp, chúng sẽ có thể sử dụng triển khai Fiber của PHP Core .

(Các) phiên bản PHP được đề xuất
PHP 8.1.

Các ví dụ
Ví dụ đơn giản
Sau đây là một ví dụ đơn giản về Fiber được dừng bởi chuỗi kí tự là fiber.
Chuỗi này được trả về từ $ fiber-> start ().
Sau đó, giá trị được truyền để tiếp tục được gửi đến Fiber :: pause ().

```perl

$fiber = new Fiber(function (): void {
    $value = Fiber::suspend('fiber');
    echo "Đã resume。$value: ", $value, "\n";
});

$value = $fiber->start();

echo "Đã tạm dừng。$value: ", $value, "\n";

$fiber->resume('test');

// Kết quả chạy
Đã tạm dừng。$value: fiber
Đã resume。$value: test
```

**Eventloop**

Sau đây là một ví dụ về một event loop rất đơn giản.
Thăm dò soclet để nhận dữ liệu, rồi gọi callback khi có thể.
event loop này chỉ cho phép khởi động lại Fiber khi có dữ liệu trên Socket, tránh bị chặn đọc.

```php
class EventLoop
{
    private string $nextId = 'a';
    private array $deferCallbacks = [];
    private array $read = [];
    private array $streamCallbacks = [];

    public function run(): void
    {
        while (!empty($this->deferCallbacks) || !empty($this->read)) {
            $defers = $this->deferCallbacks;
            $this->deferCallbacks = [];
            foreach ($defers as $id => $defer) {
                $defer();
            }

            $this->select($this->read);
        }
    }

    private function select(array $read): void
    {
        $timeout = empty($this->deferCallbacks) ? null : 0;
        if (!stream_select($read, $write, $except, $timeout, $timeout)) {
            return;
        }

        foreach ($read as $id => $resource) {
            $callback = $this->streamCallbacks[$id];
            unset($this->read[$id], $this->streamCallbacks[$id]);
            $callback($resource);
        }
    }

    public function defer(callable $callback): void
    {
        $id = $this->nextId++;
        $this->deferCallbacks[$id] = $callback;
    }

    public function read($resource, callable $callback): void
    {
        $id = $this->nextId++;
        $this->read[$id] = $resource;
        $this->streamCallbacks[$id] = $callback;
    }
}

[$read, $write] = stream_socket_pair(
    stripos(PHP_OS, 'win') === 0 ? STREAM_PF_INET : STREAM_PF_UNIX,
    STREAM_SOCK_STREAM,
    STREAM_IPPROTO_IP
);

// Đưa stream vào chế độ non proxy 
stream_set_blocking($read, false);
stream_set_blocking($write, false);

$loop = new EventLoop;

// Khi có thể đọc stream, lại khởi động việc đọc data bằng 1 cái Fiber khác nữa 
$fiber = new Fiber(function () use ($loop, $read): void {
    echo "Waiting for data...\n";

    $fiber = Fiber::this();
    $loop->read($read, fn() => $fiber->resume());
    Fiber::suspend();

    $data = fread($read, 8192);

    echo "Received data: ", $data, "\n";
});

// Chạy Fiber。
$fiber->start();

// Đọc data bằng call back 
$loop->defer(fn() => fwrite($write, "Hello, world!"));

// Chạy event loop
$loop->run();
```

Kết quả

```markdown
Waiting for data...
Received data: Hello, world!
```

Hình dưới đây cho thấy luồng thực thi giữa Main thread và Fiber
Luồng thực thi đi qua lại mỗi khi bạn gọi Fiber :: pause () và Fiber-> resume ().

![](https://images.viblo.asia/d5c1f322-b23e-41ce-906b-10ad3da6ccbb.png)

**amphp**
Phần sau sử dụng framework không đồng bộ amphp v3, và tôi sẽ viết 1 ví dụ mà code không đồng bộ được ghi như code đồng bộ.

amphp v3 xây dựng một Coroutine  để thực hiện nhiều chức năng khác nhau và Promise, mã để xử lý không đồng bộ trên ,, Fiber API bằng cách sử dụng event loop. 
Người dùng amphp v3 không cần trực tiếp sử dụng API thread .
Framework sẽ thực hiện việc xử lý đăng ký đó và tạm dừng đối với Fiber, nếu cần.
Do đó, trong khuôn khổ tương tự khác, bạn có thể phải tạo và sử dụng như thế nào khác nhau một chút.

Hàm defer (có thể gọi lại $ callback, mixed ... $ args) đăng ký Fiber sau sẽ được thực thi khi Fiber hiện tại đã bị dừng hoặc kết thúc tạm thời.
delay (int $ millisecond), milli giây khi FIber hiện tại được ngắt quãng.

```javascript

use function Amp\defer;
use function Amp\delay;

// defersẽ tạo fiber mới, Fiber đang chạy mà xong thì tự động tạo cái tiếp theo 
defer(function (): void {
    delay(1500);
    var_dump(1);
});

defer(function (): void {
    delay(1000);
    var_dump(2);
});

defer(function (): void {
    delay(2000);
    var_dump(3);
});

// Tạm đình chỉ main thread
delay(500);
var_dump(4);
```

**amphp phần 2**

Để hiển thị cách event loop chạy trong khi main thread bị tạm dừng, tôi sẽ đưa ra một ví dụ khác bằng cách sử dụng amphp v3.
await (Promise $ promise) sẽ ngừng thực thi cho đến khi đối số Promse được giải quyết.
Và async (có thể gọi lại $ callback, mixed ... $ args) trả về một đối tượng Promise.

```javascript

use function Amp\async;
use function Amp\await;
use function Amp\defer;
use function Amp\delay;

// Lưu ý rằng giá trị trả về là một int và được thực thi dưới dạng một coroutine không giống như Promises và Generator.
function asyncTask(int $id): int {
    // CHỗ này ko làm gì cả. Chỉ thay IO không đồng bộ
    delay(1000); // Chỉ dừng  giây
    return $id;
}

$running = true;
defer(function () use (&$running): void {
    // Tôi chỉ muốn cho thấy là không bị block bởi các Fiber khác 
    while ($running) {
        delay(100);
        echo ".\n";
    }
});

// asyncTask() sẽ trả về int sau 1 giây 
$result = asyncTask(1);
var_dump($result);

// Chạy cùng lúc 2 Fiber。Chờ cho đến khi toàn bộ await() mới ngưng Fiber.
$result = await([  // 1 giây là xong
    async(fn() => asyncTask(2)), // async() tạo FIber và trả về Promise
    async(fn() => asyncTask(3)),
]);
var_dump($result); // Chạy sau 2 giây
$result = asyncTask(4); // Tốn 1 giây
var_dump($result);

// array_map() tốn hai giây. Cái này hiển thị việc gọi ra không đồng bộ 
$result = array_map(fn(int $value) => asyncTask($value), [5, 6]);
var_dump($result);

$running = false; // Ngừng cái defer ở trên 
```

**Generator**

Fiber cũng có thể bị tạm dừng trong khi gọi PHP VM, vì vậy bạn cũng có thể tạo các trình tạo và trình lặp không đồng bộ.
Ví dụ dưới đây sử dụng amphp v3 để tạm ngưng Fiber trong Generator.
Khi lặp qua Generator, vòng lặp foreach tạm dừng trong khi chờ giá trị trả về của Generator.

```markdown

use Amp\Delayed;
use function Amp\await;

function generator(): Generator {
    yield await(new Delayed(500, 1));
    yield await(new Delayed(1500, 2));
    yield await(new Delayed(1000, 3));
    yield await(new Delayed(2000, 4));
    yield 5;
    yield 6;
    yield 7;
    yield await(new Delayed(2000, 8));
    yield 9;
    yield await(new Delayed(1000, 10));
}

// Generator đã chạy lại như bình thường, tùy vào mức độ cần thiết mà có thể phải ngừng loop
foreach (generator() as $value) {
    printf("Generator yielded %d\n", $value);
}

// unpack function cũng vậy
var_dump(...generator());
```

**ReactPHP**
Cuối cùng là một ví dụ về việc xác định một hàm await bằng cách sử dụng ReactPHP.

```perl

use React\EventLoop\LoopInterface;
use React\Promise\PromiseInterface;

function await(PromiseInterface $promise, LoopInterface $loop): mixed
{
    $fiber = Fiber::this();
    if ($fiber === null) {
        throw new Error('Promises can only be awaited within a fiber');
    }

    $promise->done(
        fn(mixed $value) => $loop->futureTick(fn() => $fiber->resume($value)),
        fn(Throwable $reason) => $loop->futureTick(fn() => $fiber->throw($reason))
    );

    return Fiber::suspend();
}
```

Bản demo tích hợp ReactPHP và Fiber được thực hiện trong trowski / react-fiber.

**FAQ
**Mục tiêu của tính năng này là ai?

Fiber là một tính năng nâng cao mà hầu hết người dùng không sử dụng trực tiếp.
Nó chủ yếu nhắm mục tiêu đến các tác giảFramwork Library , những người cung cấp các event loop  và các API không đồng bộ.
Fiber cho phép bạn triển khai liền mạch mã không đồng bộ vào mã đồng bộ hiện có của mình tại bất kỳ thời điểm nào mà không cần thay đổi call stack  của ứng dụng hoặc thực hiện các thay đổi mã lớn.

Fiber  không nhằm mục đích sử dụng trực tiếp ở cấp độ ứng dụng.
Fiber là một API kiểm soát luồng cấp thấp cung cấp mức độ trừu tượng cao để sử dụng trong mã ứng dụng.
Trong một trường hợp tương tự, FFI là một phần của một tính năng được thêm vào PHP gần đây, nhưng hầu hết người dùng không sử dụng trực tiếp.
Tuy nhiên, người dùng có thể được hưởng lợi rất nhiều từ các thư viện mà họ đang sử dụng.

**Còn về hiệu suất thì sao?**

Chuyển đổi giữa các Fibers nhẹ và tùy thuộc vào nền tảng, chỉ thay đổi khoảng 20 pointer .
Việc chuyển đổi ngữ cảnh thực thi trên máy ảo PHP tương tự như Generator, nó cũng chỉ hoán đổi một vài pointer .

**Những nền tảng nào hỗ trợ?**

Fiber được hỗ trợ hầu hết trên các CPU hiện đại như x86, x86_64, ARM, PPC, MIPS, Windows (bất kỳ kiến ​​trúc nào vì nó cung cấp API Fiber) và Posix cũ hơn với hỗ trợ ucontext.

**Các stack  thực thi được hoán đổi như thế nào?**

Mỗi thread  giữ các pointer  đến stack  C và stack  VM.
Nhập Fiber sẽ hoán đổi stack  C hiện tại.
stack  VM được sao lưu trong bộ nhớ và sẽ được khôi phục khi Fiber thoát.
debug_backtrace () và backtrace ngoại lệ chỉ theo dõi Fiber hiện tại.
Nó không theo dõi Fiber  bên trong Fiber .

**Mã chặn ảnh hưởng như thế nào đến thread ?**
Tác động của mã chặn trên Fiber.

Mã chặn (chẳng hạn như file_get_contents ()) sẽ tiếp tục chặn toàn bộ quá trình, ngay cả với các thread  khác.
Để đạt được cả hiệu suất và tính đồng thời, bạn cần viết mã của mình để sử dụng IO không đồng bộ, event loop  và thread .
Đã có một số thư viện IO không đồng bộ, nhưng chúng có thể được tích hợp với mã đồng bộ bằng cách tận dụng Fiber.

Fiber có thể sử dụng IO không đồng bộ một cách rõ ràng, vì vậy bạn có thể thay thế triển khai chặn bằng triển khai không chặn.
Nó không ảnh hưởng đến toàn bộ call stack .
Khi event loop  nội bộ được triển khai trong tương lai, có thể đặt các chức năng nội bộ như sleep () không chặn theo mặc định.

**Làm thế nào để các thread  khác nhau truy cập vào cùng một bộ nhớ?
Tại sao nhiều Fiber truy cập vào cùng một bộ nhớ?**

Tất cả các thread  đều nằm trong một thread .
Chỉ một thread  có thể chạy tại một thời điểm, vì vậy không giống như các luồng có thể thay đổi bộ nhớ cùng một lúc, nhiều thread  không thể truy cập hoặc thay đổi bộ nhớ cùng một lúc.

Khi Fiber bị tạm ngừng / tiếp tục, nhiều Fiber đang truy cập vào cùng một bộ nhớ sẽ được xen kẽ.
Do đó, một Fiber đang chạy có thể thay đổi bộ nhớ được sử dụng riêng bởi một Fiber bị treo khác.
Có các phương pháp như mutexes, semaphores, gói bộ nhớ và các kênh để giải quyết vấn đề này.
Chúng không được cung cấp trong RFC này vì chúng có thể được triển khai dựa trên người dùng bằng Fiber API.

**Tại sao lại thêm điều này vào PHP Core ?**

Bằng cách thêm tính năng này trực tiếp vào PHP Core , tất cả các máy chủ cung cấp PHP sẽ có thể sử dụng nó.
Trong nhiều trường hợp, người dùng không biết máy chủ đang cung cấp tiện ích mở rộng nào, hoặc người dùng không thể hoặc không muốn thêm bất kỳ tiện ích mở rộng nào theo ý muốn.
Nếu Fiber được bao gồm trong PHP Core , bất kỳ tác giả thư viện nào cũng có thể sử dụng Fiber mà không cần lo lắng về tính di động.

Tại sao không thêm một event loop  và API async / await vào lõi?
Bạn có muốn thêm một event loop  và cả async / await không?

RFC này chỉ đề xuất chức năng tối thiểu cho phép mã người dùng cung cấp các chuỗi điều chỉnh và chuỗi màu xanh lá cây đầy đủ stack .
Có một số khung công tác cung cấp event loop , lời hứa và các API không đồng bộ khác của riêng chúng, nhưng các thiết kế API của chúng rất đa dạng và có các thông số kỹ thuật khác nhau.
Các API không đồng bộ được thiết kế cho những nhu cầu cụ thể đó có thể không được bao phủ bởi các event loop  được triển khai trong PHP Core .

RFC tuyên bố rằng tốt nhất là cung cấp chức năng tối thiểu ở cốt lõi và cho phép người dùng triển khai bất kỳ thành phần nào theo ý muốn.
Nếu nhiều khuôn khổ được tổng hợp thành một API event loop  hoặc nếu có yêu cầu có một event loop  trong PHP Core , chúng tôi có thể giới thiệu chúng trong RFC tiếp theo.
RFC này không ngăn bạn thêm async / await hoặc các event loop  vào PHP Core  của bạn trong tương lai.

**Đề xuất này khác với đề xuất Fiber trước đây như thế nào?
Nó khác với Fiber RFC cũ như thế nào?**

Các Fiber RFC được xuất bản trước đây không hỗ trợ chuyển đổi ngữ cảnh trong các hàm nội bộ (array_map, preg_replace_callback, v.v.) hoặc các trình xử lý opcache (foreach, output, v.v.).
Do đó, việc sử dụng mã người dùng được gọi từ mã C hoặc tiện ích mở rộng ghi đè zend_execute_ex, chẳng hạn như Xdebug, có thể bị lỗi.