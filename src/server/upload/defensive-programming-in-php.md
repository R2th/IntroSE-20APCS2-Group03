# Giới thiệu
[Defensive programming](https://en.wikipedia.org/wiki/Defensive_programming) là một số số practice để chúng ta viết code một chặt chẽ hơn.

Practice này thường thích hợp với những dự án lớn, lâu dài nơi mà có nhiều người tham gia, chẳng hạn là một dự án Open Source, library, nơi mà có rất nhiều người tham gia đóng góp và cả những người sử dụng nó, một thay đổi nhỏ có thể ảnh hưởng đến rất nhiều người.

# Practices
## Be cautious about Everyone's code
Practice này được bắt nguồn từ một kỹ năng trong thực tế thuộc lĩnh vực lái xe đó là [Defensive Driving](https://en.wikipedia.org/wiki/Defensive_driving).

Nôm na có thể hiểu Defensive Driving đó là khi lái xe hãy luôn giả định rằng những lái xe khác có thể mắc lỗi để luôn sẵn sàng đối phó với những tình huống xấu nhất :grin: 
> Driving as if everyone else on the road was drunk.
> 

Chúng ta đều là con người và đều có thể mắc lỗi, đặc biệt là trong lĩnh vực lập trình, có nhiều giả định, nhiều trường hợp logic phức tạp, document không rõ ràng và nhiều người cùng tham gia trong dự án, một thay đổi nhỏ cũng có thể làm hỏng những chức năng khác, một lỗi không được handle có thể làm sập cả hệ thống, một input không được kiểm tra có thể cho phép hacker khai thác và xâm nhập hệ thống...  Vì thế khi viết code ta luôn luôn luôn phải thận trọng với code của người khác và cả code của chính mình (vài ngày sau thôi, bạn đọc lại code của mình xem bạn có hiểu gì không =)).
> Be cautious about Everyone's code, Your Code.
> 

Trong dự án lớn, nơi mà có nhiều người cùng làm việc, chúng ta có thể có nhiều cách để viết và tổ chức source code. Điều này có thể dẫn đến sự lộn xộn, không thống nhất, thậm chí gây ra nhiều bugs hơn. Đó là lý do tại sao chúng ta nên áp dụng một coding styles (conventions) chung để làm cho mọi thứ dễ dàng hơn, code trở nên dễ đọc hơn cho mọi người, bạn cũng có thể tìm kiếm một class dựa vào tên file nhanh chóng hơn...

## Avoid uneccessary public methods
Hạn chế những public methods không cần thiết.
>  A public method is like a child: once you've written it, you are going to maintain it for the rest of its life! - Stefan Priebsch
>  
Một class khi có method public thì ai cũng có thể gọi nó => khi thay đổi thì phải quan tâm cả những nơi gọi method đó nữa => càng nhiều public method thì càng phải quan tâm nhiều, chịu trách nhiệm cho việc thay đổi => practice ở đây là tất cả method/property của object mặc định nên để là private/protected, khi nào có logic xử lý liên quan thì mới refactor và public ra bên ngoài.

## Never trust user input
Luôn giả định rằng bạn sẽ nhận những thứ  không mong đợi, luôn đề phòng input từ user hay những thứ bên ngoài đi vào hệ thống của bạn. Validate user input để chắc chắn nó là những thứ chúng ta mong muốn.

Điều này không có nghĩa là bạn giả định tất cả user là đều là những hacker muốn phá hoại hệ thống của chúng ta với một tập các lệnh để hack vào hệ thống. Nhưng bạn nên nghĩ rằng user hoàn toàn không hiểu gì về code của bạn, họ không hề biết tham số bạn cần, không biết nó có thể dài bao nhiêu, họ không biết những loại file nào họ có thể upload và kích thước. Và thỉnh thoảng họ là bot hay hacker đang cố gắng chạy các script tự động. Làm sao bạn biết khi nào bạn có thể tin tưởng những thứ như authentication hay captcha để tạo ra một hàng rào an toàn cho những form input từ người dùng?

![https://twitter.com/brenankeller/status/1068615953989087232](https://images.viblo.asia/9e4bddec-b245-49c4-8736-417d0aa08b12.png)

Câu trả lời là không bao giờ. Luôn luôn validate user input, cho dù bạn viết api cho đội client (app, frontend) và họ có validate thì trên server bạn vẫn phải validate. Và chắc chắn là bạn sử dụng 1 kỹ thuật phù hợp khi lưu vào database hay lấy data để display.

##  DO NOT assume Method Idempotence
Khi sử dụng kết quả của một method nhiều lần, bạn nên extract kết quả ra biến, không nên giả định rằng kết quả của method khi gọi lần thứ nhất và các lần tiếp theo là giống nhau.
```php
// Bad
$userId = $controller->request()->get('userId');
$userRoles = $controller->request()->get('userRoles');
```
```php
// Good
$request = $controller->request();

$userId = $request->get('userId');
$userRoles = $request->get('userRoles');
```
Điều này không chỉ áp dụng cho method mà cả các biểu thức phức tạp, khi kết quả của nó được sử dụng nhiều lần thì hãy extract nó ra 1 biến / hằng, vừa có 1 kết quả tin cậy, vừa tăng performance vì dữ liệu đã được cache trong biến không phải xử lý nhiều lần.

Tuy nhiên, chúng ta cũng nên đảm bảo biến được extract ra có tính immutable, sử dụng `clone` hoặc các class immuatable (`DateTimeImmutable`), nhất là khi sử dụng các function liên quan đến thời gian (`Carbon\Carbon`), Laravel Query Builder...
```PHP
// Bad
$firstDayMonth = Carbon::createFromDate(2019, 1, 1);
$lastDayMonth = $firstDayMonth->endOfMonth();
var_dump($firstDayMonth === $lastDayMonth); // true, now firstDayMonth is also lastDayMonth
```
```PHP
// Good
$firstDayMonth = Carbon::createFromDate(2019, 1, 1);
$lastDayMonth = $firstDayMonth->copy()->endOfMonth(); // (clone $firstDayMonth)->endOfMonth();
var_dump($firstDayMonth === $lastDayMonth); // false, OK
```

```PHP
// Bad
$baseQuery = User::query();

$activeUsers = $baseQuery->whereNotNull('email_verified_at');
$inActiveUsers = $baseQuery->whereNull('email_verified_at');

$activeUsers->toSql();   // "select * from `users` where `email_verified_at` is not null and `email_verified_at` is null"
$inActiveUsers->toSql(); // "select * from `users` where `email_verified_at` is not null and `email_verified_at` is null"
```
```PHP
// Good
$baseQuery = User::query();

$activeUsers = (clone $baseQuery)->whereNotNull('email_verified_at');
$inActiveUsers = (clone $baseQuery)->whereNull('email_verified_at');
```

## Immutability
Nên nhớ object nói chung trong PHP không có tính immutable và các object đều được truyền theo tham chiếu (pass by reference), vì vậy chúng ta phải cẩn thận khi truyền tham số bằng object, return object hay khi dùng các hàm setter.
Sau đây là một ví dụ không tốt:
```php
// Bad
class Message
{
    protected $content;

    public function setContent($content)
    {
        $this->content = $content;
    }
}

class Mailer
{
    protected $message;
 
    public function __construct(Message $message)
    {
        $this->message = $message;
    }
    
    public function sendMessage()
    {
        var_dump($this->message);
    }
}

$message = new Message();
$message->setContent("bob message");
$joeMailer = new Mailer($message);

$message->setContent("joe message");
$bobMailer = new Mailer($message);

$joeMailer->sendMessage(); // joe message
$bobMailer->sendMessage(); // joe message
```

Refactor ví dụ này bằng cách bỏ đi setter và chuyển tham số content vào constructor, đây cũng là 1 trong những ví dụ cho việc sử dụng `Value Object`:
```php
// Good
class Message
{
    protected $content;
    
    public function __construct($content)
    {
        $this->content = $content;
    }
}

class Mailer
{
    protected $message;
    
    public function __construct(Message $message)
    {
        $this->message = $message;
    }
    
    public function sendMessage()
    {
        var_dump($this->message);
    }
}

$joeMailer = new Mailer(new Message("bob message"));
$bobMailer = new Mailer(new Message("joe message"));
$joeMailer->sendMessage();
$bobMailer->sendMessage();
```

## No mixed parameter type
Parameter của một function không nên thuộc nhiều kiểu dữ liệu khác nhau.

```php
// Bad
class BadExample
{
    /**
     * @param mixed $status
     *                      - int 1 if payment pending
     *                      - int 2 if processing
     *                      - bool false to reset the status
     *                      - null to set max possible status
     */
    public function changeStatus($status)
    {
        // ...
    }
}
```

Ở đây chúng ta tiếp tục áp dụng Value Object để refactor.
```php
class GoodExample
{
    /**
     * @param Status $status
     */
    public function changeStatus(Status $status)
    {
        // ...
    }
}

class Status
{
    public function __construct($status)
    {
        if (!$this->isValid($status)) {
            throw new \InvalidArgumentException('...');
        }
    }
    
    private function isValid($status)
    {
        // ... do stuff
    }
}
```

Value Objects là những object được xác định bởi giá trị của nó, tức là 2 giá trị giống nhau sẽ tạo ra 2 object giống nhau. Sử dụng Value Object để đảm bảo tính nhất quán của dữ liệu và đơn giản hóa việc validate data.
```php
register(new EmailAddress('ocramius@gmail.com')); // No need to re-validate inside register()! 
```

## No mixed return type
Ở đây chúng có thể tiếp tục sử dụng Value Object hoặc define ra 1 type chung (sử dụng interface).

Ví dụ:
```php
// Bad
class BadExample
{
    public function getMarvelHeroByName(string $name)
    {
        $hero = $this->heroRepository->getByName($name);
        if (empty($hero)) {
            return false;
        }
        
        return new MarvelHero($hero);
    }
}
```
```php
// Good
class GoodExample
{
    public function getMarvelHeroByName(string $name): HeroInterface
    {
        $hero = $this->heroRepository->getByName($name);
        if (empty($hero)) {
            return new NullHero();
        }
        
        return new MarvelHero($hero);
    }
}
```

## Avoid un-initialized property
Tránh sử dụng setter, tránh sử dụng un-initialized propery, sử dụng constructor để truyền tham số và dependency cho class.

```php
// Bad
class BankAccount
{
    protected $currency = null;
    
    public function setCurrency($currency) 
    {
        $this->currency = currency;
    }
    
    public function payTo(Account $to, $amount)
    {
        $this->transaction->process($to, $amount, $this->currency);
    }
}

$bankAccount = new BankAccount;
// I forgot to call $bankAccount->setCurrency('GBP');
$bankAccount->payTo($joe, 100);
```

Trong  trường hợp này chúng ta phải nhớ gọi `setCurrency` trước khi thự hiện payment. Và nếu quên sẽ dẫn đến 1 trường hợp không mong muốn. Object không nên ở trong tình trạng state không nhất quán.

Chúng ta có thể refactor bằng cách bắt buộc truyền vào currency trong constructor.
```php
// Good 
class BankAccount
{
    protected $currency = null;
    
    public function __construct($currency) 
    {
        $this->currency = $currency;
    }
    
    public function payTo(Account $to, $amount)
    {
        $this->transaction->process($to, $amount, $this->currency);
    }
}

$bankAccount = new BankAccount('GBP');
$bankAccount->payTo($joe, 100);
```

Hoặc có thể đóng gói logic vào 1 method duy nhất và sử dụng value object để thể hiện currency và amount trong cùng 1 object.
```php
class BankAccount
{
    public function payTo(Account $to, Money $money) { ... }
}

$bankAccount->payTo($joe, new Money(100, new Currency('GBP')));
```

## No Optional Dependencies
Ví dụ chúng ta có 1 class dùng để connect đến database, ngoài việc query database, class còn có chức năng log lại query nếu cần (trong chế độ debug), chúng ta thường implement nó như sau:
```php
class BadExample
{
    private $logger;
    
    public function __construct(...)
    {
        // ...
    }

    public function setLogger(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }
    
    public function query(string $sql, array $params = [])
    {
        ...
        if (isset($this->logger)) {
            $this->logger->log($query);
        }
    }
}

$db = new BadExample;
$db->query(...);
```

Như bạn thấy, optional parameter sẽ tạo ra những logic phức tạp hơn, cứ khi nào muốn dùng lại phải kiểm tra nó được set hay chưa?

Thay vào đó chúng ta nên khai báo dependency rõ ràng trong constructor và sử dụng các implement khác nhau của dependency.
```php
class GoodExample
{
    private $logger;
    
    public function __construct(..., LoggerInterface $logger)
    {
        // ...
        $this->logger = $logger;
    }
    
    public function query(string $sql, array $params = [])
    {
        // ...
        $this->logger->log($query);
    }
}

$localDb = new GoodExample(new FileSystemLogger);
$localDb->query('...');

$productionDb = new GoodExample(new NullLogger);
$productionDb->query('...');
```

## Expect Unexpected
Rule này thường áp dụng cho `switch`: luôn luôn có case `defaut` khi sử dụng switch.

```php
// Bad 
function changeStatus(Booking $booking, string $status)
{
    switch ($status) {
        case 'active':
            $booking->process();
            break;
        case 'overdue':
            $booking->suspend();
            break;
        case 'inactive':
            $booking->disable();
            break;
    }
}
```

```php
// Good
function changeStatus(Booking $booking, string $status)
{
    switch ($status) {
        case 'active':
            $booking->process();
            break;
        case 'overdue':
            $booking->suspend();
            break;
        case 'inactive':
            $booking->disable();
            break;
        default:
            throw new UnknownBookingStatusException($status);
    }
}
```

## Unit test
Test tất cả các kịch bản!!! Cố gắng làm cho chỉ số [CRAP](https://viblo.asia/p/php-unit-test-401-tao-bao-cao-coverage-reports-va-chi-so-crap-ByEZkWXWZQ0) <= 2.

Điều này có thể làm bạn chán nản, và nhưng nó sẽ giúp bạn viết vừa đủ code, giảm feature không cần thiết mà có thể sẽ chẳng bao giờ bạn cần (YAGNI).

Ví dụ về các kịch bản cần test:
```php
interface AuthService {
    /**
     * @return bool
     *
     * @throws InvalidArgumentException
     * @throws IncompatibleCredentialsException
     * @throws UnavailableBackendException
     */
    public function authenticate(Credentials $credentials);
}

class MyLogin
{
    public function __construct(AuthService $auth) 
    {
        $this->auth = $auth;
    }
    
    public function login($username, $password)
    {
        if ($this->auth->authenticate(new BasicCredentials($username, $password)) {
            // ...
            return true;
        }
        
        return false;
    }
}
```
Những kịch bản cần test `login` ở đây là:
- Function trả về true
- Function trả về false
- Exception InvalidArgumentException
- Exception IncompatibleCredentialsException
- Exception UnavailableBackendException

# Kết luận
Trên đây là những **gợi ý** theo tư tưởng defensive programming và nhắc nhở bạn viết code cẩn thận hơn :smile: tùy vào dự án và tình hình cụ thể mà bạn có thể áp dụng một cách phù hợp.

# References
- https://en.wikipedia.org/wiki/Defensive_programming
- https://www.sitepoint.com/more-tips-for-defensive-programming-in-php/
- http://bestpractices.thecodingmachine.com/php/defensive_programming.html
- https://github.com/eeree/defensive-programming-in-php