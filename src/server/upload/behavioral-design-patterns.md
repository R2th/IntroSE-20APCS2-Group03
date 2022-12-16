# Giới thiệu
Xin chào, Trong phần này mình sẽ giải thích về 10 loại trong `Behavioral  Design Patterns`.

Link bài viết: 
- [Phần 1: Design Patterns Là gì](https://viblo.asia/p/design-patterns-phan-1-bJzKmJpPZ9N)
- [Phần 2: Creational Design Patterns](https://viblo.asia/p/creational-design-patterns-ORNZqLrnK0n)
- [Phần 3: Structural Design Patterns](https://viblo.asia/p/structural-design-patterns-Eb85ok6052G)
- Phần 4: Behavioral Design Patterns

# Nội dung
## Chain of Responsibility
**Ví dụ thực tế:** bạn có ba phương thức thanh toán (`A`, `B` và `C`) trong tài khoản của mình, mỗi người có một số tiền khác nhau trong đó. `A` có 100 USD, `B` có 300 USD và `C` có 1000 USD và ưu tiên thanh toán được chọn là `A` rồi `B` rồi `C`. Bạn cố gắng mua thứ gì đó trị giá 210 USD. Sử dụng Chain of Responsibility, trước hết, tài khoản `A` sẽ được kiểm tra nếu có thể mua hàng, nếu có, việc mua hàng sẽ được thực hiện và chain sẽ bị phá vỡ. Nếu không, yêu cầu sẽ chuyển tiếp đến tài khoản `B` để kiểm tra số tiền nếu chain có sẽ bị phá nếu không yêu cầu sẽ tiếp tục chuyển tiếp cho đến khi tìm thấy trình xử lý phù hợp. Ở đây `A`, `B` và `C` là các liên kết của chain và toàn bộ hiện tượng là Chain of Responsibility.

**Nói ngắn gọn:** Nó giúp xây dựng chain của object. Yêu cầu nhập từ một đầu và tiếp tục đi từ object này sang object khác cho đến khi tìm thấy trình xử lý phù hợp.

> Wiki: In object-oriented design, the chain-of-responsibility pattern is a design pattern consisting of a source of command objects and a series of processing objects. Each processing object contains logic that defines the types of command objects that it can handle; the rest are passed to the next processing object in the chain.

### Ví dụ
Trước hết chúng ta sẽ cạo base account có chứa logic cho việc liên kết tài khoản với nhau.
```php
abstract class Account
{
    protected $successor;
    protected $balance;

    public function setNext(Account $account)
    {
        $this->successor = $account;
    }

    public function pay(float $amountToPay)
    {
        if ($this->canPay($amountToPay)) {
            echo sprintf('Paid %s using %s' . PHP_EOL, $amountToPay, get_called_class());
        } elseif ($this->successor) {
            echo sprintf('Cannot pay using %s. Proceeding ..' . PHP_EOL, get_called_class());
            $this->successor->pay($amountToPay);
        } else {
            throw new Exception('None of the accounts have enough balance');
        }
    }

    public function canPay($amount): bool
    {
        return $this->balance >= $amount;
    }
}

class Bank extends Account
{
    protected $balance;

    public function __construct(float $balance)
    {
        $this->balance = $balance;
    }
}

class Paypal extends Account
{
    protected $balance;

    public function __construct(float $balance)
    {
        $this->balance = $balance;
    }
}

class Bitcoin extends Account
{
    protected $balance;

    public function __construct(float $balance)
    {
        $this->balance = $balance;
    }
}
```
Bây giờ chuẩn bị chain bằng cách sử dụng liên kết đã được viết ở trên (ngân hàng, paypal, bitcoin)
```php
// Let's prepare a chain like below
//      $bank->$paypal->$bitcoin
//
// First priority bank
//      If bank can't pay then paypal
//      If paypal can't pay then bit coin

$bank = new Bank(100);          // Bank with balance 100
$paypal = new Paypal(200);      // Paypal with balance 200
$bitcoin = new Bitcoin(300);    // Bitcoin with balance 300

$bank->setNext($paypal);
$paypal->setNext($bitcoin);

// Let's try to pay using the first priority i.e. bank
$bank->pay(259);

// Output will be
// ==============
// Cannot pay using bank. Proceeding ..
// Cannot pay using paypal. Proceeding ..:
// Paid 259 using Bitcoin!
```

## Command
**Ví dụ thực tế:** Một ví dụ là bạn đặt món ăn tại một nhà hàng. Bạn (tức là `Client`) yêu cầu người phục vụ (tức là `Invoker`) mang một ít thức ăn (tức là `command`) và người phục vụ chỉ cần chuyển tiếp yêu cầu tới Đầu bếp (tức là `Receiver`), người có kiến thức về cách nấu. Một ví dụ khác là bạn (tức là `Client`) đang chuyển kênh (tức là `Command`) truyền hình (tức là `Receiver`) bằng điều khiển từ xa (`Invoker`).

**Nói ngắn gọn:** Cho phép bạn đóng gói các hành động trong các đối tượng. Ý tưởng chính đằng sau mô hình này là cung cấp các phương tiện để tách rời `Client` khỏi `Receiver`.

> Wiki: In object-oriented programming, the command pattern is a behavioral design pattern in which an object is used to encapsulate all information needed to perform an action or trigger an event at a later time. This information includes the method name, the object that owns the method and values for the method parameters.
 
### Ví dụ
Trước hết chúng ta có receiver có việc thực hiện mọi hành động có thể được thực hiện
```php
// Receiver
class Bulb
{
    public function turnOn()
    {
        echo "Bulb has been lit";
    }

    public function turnOff()
    {
        echo "Darkness!";
    }
}
```
sau đó chúng ta có một interface mà mỗi lệnh sẽ thực hiện và sau đó chúng ta có một bộ lệnh.
```php
interface Command
{
    public function execute();
    public function undo();
    public function redo();
}

// Command
class TurnOn implements Command
{
    protected $bulb;

    public function __construct(Bulb $bulb)
    {
        $this->bulb = $bulb;
    }

    public function execute()
    {
        $this->bulb->turnOn();
    }

    public function undo()
    {
        $this->bulb->turnOff();
    }

    public function redo()
    {
        $this->execute();
    }
}

class TurnOff implements Command
{
    protected $bulb;

    public function __construct(Bulb $bulb)
    {
        $this->bulb = $bulb;
    }

    public function execute()
    {
        $this->bulb->turnOff();
    }

    public function undo()
    {
        $this->bulb->turnOn();
    }

    public function redo()
    {
        $this->execute();
    }
}
```
Sau đó, chúng ta có một `Invoker` mà client sẽ tương tác để xử lý bất kỳ lệnh nào
```php
// Invoker
class RemoteControl
{
    public function submit(Command $command)
    {
        $command->execute();
    }
}
```
Done, bây giờ là xem cách nó chạy
```php
$bulb = new Bulb();

$turnOn = new TurnOn($bulb);
$turnOff = new TurnOff($bulb);

$remote = new RemoteControl();
$remote->submit($turnOn); // Bulb has been lit!
$remote->submit($turnOff); // Darkness!
```

Command pattern cũng có thể được sử dụng để thực hiện một hệ thống giao dịch, nơi mà user tiếp tục duy trì lịch sử của các lệnh ngay khi thực hiện chúng. Nếu lệnh cuối cùng được thực thi thành công, tất cả đều ổn nếu chỉ lặp qua lịch sử và tiếp tục thực hiện `undo` trên tất cả các lệnh đã thực hiện.

## Iterator
**Ví dụ thực tế:** Một bộ radio cũ sẽ là một ví dụ tốt về iterator, người dùng có thể bắt đầu tại một số kênh và sau đó sử dụng các nút next hoặc previous để đi qua các kênh tương ứng. Hoặc lấy ví dụ về máy nghe nhạc MP3 hoặc TV, nơi bạn có thể nhấn các nút next và previous để đi qua các kênh liên tiếp hoặc nói cách khác, tất cả chúng đều cung cấp giao diện để lặp qua các kênh, bài hát hoặc đài phát thanh tương ứng.

**Nói ngắn gọn:** Nó trình bày một cách để truy cập các phần tử của một đối tượng mà không làm lộ.

> Wiki: In object-oriented programming, the iterator pattern is a design pattern in which an iterator is used to traverse a container and access the container's elements. The iterator pattern decouples algorithms from containers; in some cases, algorithms are necessarily container-specific and thus cannot be decoupled.

### Ví dụ 
Trong php khá dễ để implatement sử dụng SPL (Standard PHP Library). Từ ví dụ về radio bên trên, chúng ta sẽ có class  `RadioStation`
```php
class RadioStation
{
    protected $frequency;

    public function __construct(float $frequency)
    {
        $this->frequency = $frequency;
    }

    public function getFrequency(): float
    {
        return $this->frequency;
    }
}
```
Tiếp theo là iterator
```php
use Countable;
use Iterator;

class StationList implements Countable, Iterator
{
    /** @var RadioStation[] $stations */
    protected $stations = [];

    /** @var int $counter */
    protected $counter;

    public function addStation(RadioStation $station)
    {
        $this->stations[] = $station;
    }

    public function removeStation(RadioStation $toRemove)
    {
        $toRemoveFrequency = $toRemove->getFrequency();
        $this->stations = array_filter($this->stations, function (RadioStation $station) use ($toRemoveFrequency) {
            return $station->getFrequency() !== $toRemoveFrequency;
        });
    }

    public function count(): int
    {
        return count($this->stations);
    }

    public function current(): RadioStation
    {
        return $this->stations[$this->counter];
    }

    public function key()
    {
        return $this->counter;
    }

    public function next()
    {
        $this->counter++;
    }

    public function rewind()
    {
        $this->counter = 0;
    }

    public function valid(): bool
    {
        return isset($this->stations[$this->counter]);
    }
}
```
Sử dụng
```php
$stationList = new StationList();

$stationList->addStation(new RadioStation(89));
$stationList->addStation(new RadioStation(101));
$stationList->addStation(new RadioStation(102));
$stationList->addStation(new RadioStation(103.2));

foreach($stationList as $station) {
    echo $station->getFrequency() . PHP_EOL;
}

$stationList->removeStation(new RadioStation(89)); // Will remove station 89
```

## Mediator
**Ví dụ thực tế:** Một ví dụ thường thấy là khi bạn nói chuyện với ai đó trên điện thoại di động của bạn, có một nhà cung cấp mạng ở giữa bạn và họ, cuộc trò chuyện của bạn đi qua đó thay vì được gửi trực tiếp. Trong trường hợp này nhà cung cấp mạng là Mediator.

**Nói ngắn gọn:** Mediator pattern một đối tượng bên thứ ba (được gọi là mediator) để kiểm soát sự tương tác giữa hai đối tượng (được gọi là colleagues). Nó giúp giảm sự ghép nối giữa các lớp giao tiếp với nhau.

> Wiki: In software engineering, the mediator pattern defines an object that encapsulates how a set of objects interact. This pattern is considered to be a behavioral pattern due to the way it can alter the program's running behavior.
> 
### Ví dụ
Giả sử trong chat room (tức là mediator) và người dùng (tức là colleages) gửi tin nhắn cho nhau.

Đầu tiên chúng ta sẽ có mediator là chat room
```php
interface ChatRoomMediator 
{
    public function showMessage(User $user, string $message);
}

// Mediator
class ChatRoom implements ChatRoomMediator
{
    public function showMessage(User $user, string $message)
    {
        $time = date('M d, y H:i');
        $sender = $user->getName();

        echo $time . '[' . $sender . ']:' . $message;
    }
}
```
Tiếp theo colleages là người dùng 
```php
class User {
    protected $name;
    protected $chatMediator;

    public function __construct(string $name, ChatRoomMediator $chatMediator) {
        $this->name = $name;
        $this->chatMediator = $chatMediator;
    }

    public function getName() {
        return $this->name;
    }

    public function send($message) {
        $this->chatMediator->showMessage($this, $message);
    }
}
```
Và sử dụng như sau
```php
$mediator = new ChatRoom();

$john = new User('John Doe', $mediator);
$jane = new User('Jane Doe', $mediator);

$john->send('Hi there!');
$jane->send('Hey!');

// Output
// Feb 14, 10:58 [John]: Hi there!
// Feb 14, 10:58 [Jane]: Hey!
```

## Memento
**Ví dụ thực tế:** Lấy ví dụ về máy tính cầm tay (tức là originator), trong đó bất cứ khi nào bạn thực hiện một số phép tính, phép tính cuối cùng được lưu trong bộ nhớ (tức là memento) để bạn có thể quay lại và có thể khôi phục nó bằng một số nút nào đó (tức là caretaker).

**Nói ngắn gọn:** Memento pattern là về việc nắm bắt và lưu trữ trạng thái hiện tại của một đối tượng theo cách mà sau này nó có thể được khôi phục một cách smooth.

> Wiki: The memento pattern is a software design pattern that provides the ability to restore an object to its previous state (undo via rollback).

Hữu dụng khi chúng ta cần chức năng `undo` (hoàn tác).

### Ví dụ
Hãy lấy một ví dụ về text editor giúp lưu trạng thái và bạn có thể khôi phục nếu muốn.

Trước hết, chúng ta có đối tượng memento có thể giữ trạng thái.
```php
class EditorMemento
{
    protected $content;

    public function __construct(string $content)
    {
        $this->content = $content;
    }

    public function getContent()
    {
        return $this->content;
    }
}
```
Sau đó, editor tức là originator sẽ sử dụng đối tượng memento
```php
class Editor
{
    protected $content = '';

    public function type(string $words)
    {
        $this->content = $this->content . ' ' . $words;
    }

    public function getContent()
    {
        return $this->content;
    }

    public function save()
    {
        return new EditorMemento($this->content);
    }

    public function restore(EditorMemento $memento)
    {
        $this->content = $memento->getContent();
    }
}
```
Sử dụng
```php
$editor = new Editor();

// Type some stuff
$editor->type('This is the first sentence.');
$editor->type('This is second.');

// Save the state to restore to : This is the first sentence. This is second.
$saved = $editor->save();

// Type some more
$editor->type('And this is third.');

// Output: Content before Saving
echo $editor->getContent(); // This is the first sentence. This is second. And this is third.

// Restoring to last saved state
$editor->restore($saved);

$editor->getContent(); // This is the first sentence. This is second.
```

## Observer
**Ví dụ thực tế:** Một ví dụ điển hình là những người tìm việc, nơi họ đăng ký vào một số trang đăng việc và họ được thông báo bất cứ khi nào có cơ hội việc làm phù hợp.

**Nói ngắn gọn:** Xác định một sự phụ thuộc giữa các đối tượng để bất cứ khi nào một đối tượng thay đổi trạng thái của nó, tất cả các phụ thuộc của nó được thông báo.

> Wiki: The observer pattern is a software design pattern in which an object, called the subject, maintains a list of its dependents, called observers, and notifies them automatically of any state changes, usually by calling one of their methods.
 
### Ví dụ
Trước hết chúng ta có những người tìm việc cần được thông báo cho một công việc.
```php
class JobPost
{
    protected $title;

    public function __construct(string $title)
    {
        $this->title = $title;
    }

    public function getTitle()
    {
        return $this->title;
    }
}

class JobSeeker implements Observer
{
    protected $name;

    public function __construct(string $name)
    {
        $this->name = $name;
    }

    public function onJobPosted(JobPost $job)
    {
        // Do something with the job posting
        echo 'Hi ' . $this->name . '! New job posted: '. $job->getTitle();
    }
}
```
Sau đó, chúng ta có bài đăng job mà người tìm việc sẽ đăng ký.
```php
class EmploymentAgency implements Observable
{
    protected $observers = [];

    protected function notify(JobPost $jobPosting)
    {
        foreach ($this->observers as $observer) {
            $observer->onJobPosted($jobPosting);
        }
    }

    public function attach(Observer $observer)
    {
        $this->observers[] = $observer;
    }

    public function addJob(JobPost $jobPosting)
    {
        $this->notify($jobPosting);
    }
}
```
Sử dụng
```php
// Create subscribers
$johnDoe = new JobSeeker('John Doe');
$janeDoe = new JobSeeker('Jane Doe');

// Create publisher and attach subscribers
$jobPostings = new EmploymentAgency();
$jobPostings->attach($johnDoe);
$jobPostings->attach($janeDoe);

// Add a new job and see if subscribers get notified
$jobPostings->addJob(new JobPost('Software Engineer'));

// Output
// Hi John Doe! New job posted: Software Engineer
// Hi Jane Doe! New job posted: Software Engineer
```

## Visitor
**Ví dụ thực tế:** giả sử ai đó đi du lịch Dubai. Họ cần visa để vào Dubai. Sau khi đến, họ có thể tự mình ghé thăm bất kỳ nơi nào ở Dubai mà không cần phải xin phép, chỉ cần cho họ biết về một nơi và họ có thể ghé thăm nó. Visitor pattern cho phép bạn làm điều đó, nó giúp bạn thêm địa điểm để truy cập để họ có thể truy cập nhiều nhất có thể mà không phải thực hiện bất kỳ công việc nào.

**Nói ngắn gọn:** Visitor pattern cho phép bạn thêm các hoạt động tiếp theo vào các đối tượng mà không phải sửa đổi chúng.

> Wiki: In object-oriented programming and software engineering, the visitor design pattern is a way of separating an algorithm from an object structure on which it operates. A practical result of this separation is the ability to add new operations to existing object structures without modifying those structures. It is one way to follow the open/closed principle.
 
### Ví dụ
Lấy một ví dụ về vườn thú có nhiều loại động vật khác nhau, và chúng ta cần tạo ra tiếng kêu của chúng
```php
// Visitee
interface Animal
{
    public function accept(AnimalOperation $operation);
}

// Visitor
interface AnimalOperation
{
    public function visitMonkey(Monkey $monkey);
    public function visitLion(Lion $lion);
    public function visitDolphin(Dolphin $dolphin);
}
```
Sau đó chúng ta có implementations cho animals
```php
class Monkey implements Animal
{
    public function shout()
    {
        echo 'Ooh oo aa aa!';
    }

    public function accept(AnimalOperation $operation)
    {
        $operation->visitMonkey($this);
    }
}

class Lion implements Animal
{
    public function roar()
    {
        echo 'Roaaar!';
    }

    public function accept(AnimalOperation $operation)
    {
        $operation->visitLion($this);
    }
}

class Dolphin implements Animal
{
    public function speak()
    {
        echo 'Tuut tuttu tuutt!';
    }

    public function accept(AnimalOperation $operation)
    {
        $operation->visitDolphin($this);
    }
}
```
Implement cho visitor
```php
class Speak implements AnimalOperation
{
    public function visitMonkey(Monkey $monkey)
    {
        $monkey->shout();
    }

    public function visitLion(Lion $lion)
    {
        $lion->roar();
    }

    public function visitDolphin(Dolphin $dolphin)
    {
        $dolphin->speak();
    }
}
```
Sử dụng
```php
$monkey = new Monkey();
$lion = new Lion();
$dolphin = new Dolphin();

$speak = new Speak();

$monkey->accept($speak);    // Ooh oo aa aa!    
$lion->accept($speak);      // Roaaar!
$dolphin->accept($speak);   // Tuut tutt tuutt!
```

Chúng ta có thể đã làm điều này đơn giản bằng cách có một hệ thống phân cấp thừa kế cho các loài động vật nhưng sau đó chúng ta sẽ phải sửa đổi các con vật bất cứ khi nào chúng ta muốn thêm các hành động mới cho động vật. Nhưng bây giờ chúng ta sẽ không phải thay đổi chúng. Ví dụ: giả sử chúng ta được yêu cầu thêm hành vi nhảy cho động vật, chúng ta chỉ cần thêm bằng cách tạo một visitor mới, tức là:
```php
class Jump implements AnimalOperation
{
    public function visitMonkey(Monkey $monkey)
    {
        echo 'Jumped 20 feet high! on to the tree!';
    }

    public function visitLion(Lion $lion)
    {
        echo 'Jumped 7 feet! Back on the ground!';
    }

    public function visitDolphin(Dolphin $dolphin)
    {
        echo 'Walked on water a little and disappeared';
    }
}
```
Sử dụng
```php
$jump = new Jump();

$monkey->accept($speak);   // Ooh oo aa aa!
$monkey->accept($jump);    // Jumped 20 feet high! on to the tree!

$lion->accept($speak);     // Roaaar!
$lion->accept($jump);      // Jumped 7 feet! Back on the ground!

$dolphin->accept($speak);  // Tuut tutt tuutt!
$dolphin->accept($jump);   // Walked on water a little and disappeared
```

## Strategy
**Ví dụ thực tế:** chẳng hạn như sorting, chúng ta implemented  bubble sort nhưng data bắt đầu nhiều hơn và bubble sort bắt đầu chậm. Để giải quyết vấn đề này, chúng ta implemented thuật toán quick sort. Nhưng bây giờ mặc dù thuật toán quick sort đã làm tốt hơn cho các bộ dữ liệu lớn, nhưng nó rất chậm đối với các bộ dữ liệu nhỏ hơn. Để xử lý việc này, chúng ta sẽ implemented một Strategy trong đó đối với các bộ dữ liệu nhỏ, bubble sort sẽ được sử dụng, và với datasets lớn hơn thì chúng ta sẽ dùng quick sort.

**Nói ngắn gọn:** Strategy pattern cho phép bạn chuyển đổi thuật toán hoặc Strategy (chiến lược) dựa trên tình huống.

> Wiki: In computer programming, the strategy pattern (also known as the policy pattern) is a behavioural software design pattern that enables an algorithm's behavior to be selected at runtime.

### Ví dụ
Trước hết chúng tôi có Strategy interface và implementations các strategy khác nhau.
```php
interface SortStrategy
{
    public function sort(array $dataset): array;
}

class BubbleSortStrategy implements SortStrategy
{
    public function sort(array $dataset): array
    {
        echo "Sorting using bubble sort";

        // Do sorting
        return $dataset;
    }
}

class QuickSortStrategy implements SortStrategy
{
    public function sort(array $dataset): array
    {
        echo "Sorting using quick sort";

        // Do sorting
        return $dataset;
    }
}
```
Và sau đó client sẽ sử dụng bất kỳ strategy nào
```php
class Sorter
{
    protected $sorter;

    public function __construct(SortStrategy $sorter)
    {
        $this->sorter = $sorter;
    }

    public function sort(array $dataset): array
    {
        return $this->sorter->sort($dataset);
    }
}
```
Sử dụng
```php
$dataset = [1, 5, 4, 3, 2, 8];

$sorter = new Sorter(new BubbleSortStrategy());
$sorter->sort($dataset); // Output : Sorting using bubble sort

$sorter = new Sorter(new QuickSortStrategy());
$sorter->sort($dataset); // Output : Sorting using quick sort
```

## State
**Ví dụ thực tế:** Hãy tưởng tượng bạn đang sử dụng một số app vẽ, bạn chọn cọ vẽ để vẽ. Bây giờ, cọ thay đổi hành vi của nó dựa trên màu đã chọn, tức là nếu bạn đã chọn màu đỏ, nó sẽ vẽ màu đỏ, nếu màu xanh thì nó sẽ có màu xanh, v.v.

**Nói ngắn gọn:** Nó cho phép bạn thay đổi hành vi của một lớp khi trạng thái thay đổi.

> Wiki: The state pattern is a behavioral software design pattern that implements a state machine in an object-oriented way. With the state pattern, a state machine is implemented by implementing each individual state as a derived class of the state pattern interface, and implementing state transitions by invoking methods defined by the pattern's superclass. The state pattern can be interpreted as a strategy pattern which is able to switch the current strategy through invocations of methods defined in the pattern's interface.
> 
### Ví dụ
Lấy một ví dụ về text editor, nó cho phép bạn thay đổi trạng thái văn bản được nhập, tức là nếu bạn đã chọn in đậm, nó sẽ bắt đầu viết đậm, nếu in nghiêng thì in nghiêng, v.v.

Trước hết chúng ta có state interface và một số state implementations
```php
interface WritingState
{
    public function write(string $words);
}

class UpperCase implements WritingState
{
    public function write(string $words)
    {
        echo strtoupper($words);
    }
}

class LowerCase implements WritingState
{
    public function write(string $words)
    {
        echo strtolower($words);
    }
}

class DefaultText implements WritingState
{
    public function write(string $words)
    {
        echo $words;
    }
}
```
Tiếp theo là editor
```php
class TextEditor
{
    protected $state;

    public function __construct(WritingState $state)
    {
        $this->state = $state;
    }

    public function setState(WritingState $state)
    {
        $this->state = $state;
    }

    public function type(string $words)
    {
        $this->state->write($words);
    }
}
```
Sử dụng
```php
$editor = new TextEditor(new DefaultText());

$editor->type('First line');

$editor->setState(new UpperCase());

$editor->type('Second line');
$editor->type('Third line');

$editor->setState(new LowerCase());

$editor->type('Fourth line');
$editor->type('Fifth line');

// Output:
// First line
// SECOND LINE
// THIRD LINE
// fourth line
// fifth line
```

## Template Method
**Ví dụ thực tế:** Giả sử chúng ta đang xây dựng một số ngôi nhà. Các bước để xây dựng:
- Chuẩn bị vật liệu
- Thêm các tầng
- Thêm mái nhà
- Xây tường

Thứ tự của các bước này không bao giờ có thể thay đổi, tức là bạn không thể xây dựng mái nhà trước khi xây móng nhà, nhưng mỗi bước có thể được sửa đổi, ví dụ tường có thể được làm bằng gỗ hoặc đá.

**Nói ngắn gọn:** Template method xác định skeleton về cách thực hiện một thuật toán nhất định, nhưng trì hoãn việc implementation các bước đó cho các lớp con.

> Wiki: In software engineering, the template method pattern is a behavioral design pattern that defines the program skeleton of an algorithm in an operation, deferring some steps to subclasses. It lets one redefine certain steps of an algorithm without changing the algorithm's structure.
> 
### Ví dụ
Hãy tưởng tượng chúng ta có một build tool giúp chúng ta test, lint, build, tạo build reports và triển khai ứng dụng trên test server.

Trước hết chúng ta có base class chỉ skeleton  cho build algorithm
```php
abstract class Builder
{

    // Template method
    final public function build()
    {
        $this->test();
        $this->lint();
        $this->assemble();
        $this->deploy();
    }

    abstract public function test();
    abstract public function lint();
    abstract public function assemble();
    abstract public function deploy();
}
```
Tiếp theo là implementations
```php
class AndroidBuilder extends Builder
{
    public function test()
    {
        echo 'Running android tests';
    }

    public function lint()
    {
        echo 'Linting the android code';
    }

    public function assemble()
    {
        echo 'Assembling the android build';
    }

    public function deploy()
    {
        echo 'Deploying android build to server';
    }
}

class IosBuilder extends Builder
{
    public function test()
    {
        echo 'Running ios tests';
    }

    public function lint()
    {
        echo 'Linting the ios code';
    }

    public function assemble()
    {
        echo 'Assembling the ios build';
    }

    public function deploy()
    {
        echo 'Deploying ios build to server';
    }
}
```
Sử dụng
```php
$androidBuilder = new AndroidBuilder();
$androidBuilder->build();

// Output:
// Running android tests
// Linting the android code
// Assembling the android build
// Deploying android build to server

$iosBuilder = new IosBuilder();
$iosBuilder->build();

// Output:
// Running ios tests
// Linting the ios code
// Assembling the ios build
// Deploying ios build to server
```

# Tổng kết
Đến đây là hết 4 bài giải thích về 23 design pattern cơ bản (GoF), hy vọng sẽ giúp ích cho bạn. Happy coding !!! <3 <3 <3