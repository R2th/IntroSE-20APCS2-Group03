## Giới thiệu
Đây là những nguyên lý kỹ thuật phần mềm, được trích từ cuốn sách [*Clean Code*](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882) của tác giả Robert C. Martin (thường gọi là Uncle Bob) rất thích hợp cho ngôn ngữ PHP. Tài liệu này không phải là sách hướng dẫn về phong cách viết code, mà là hướng dẫn cách làm thế nào để viết phần mềm dễ đọc, dễ sử dụng lại, và dễ cải tiến trong PHP.

Bạn không cần phải tuân theo tất cả các nguyên tắc trong tài liệu này.
Đây chỉ đơn giản là những hướng dẫn, nhưng dù sao nó cũng là đúc kết từ nhiều năm kinh nghiệm của tác giả.

Lưu ý: Dù nhiều lập trình viên còn sử dụng PHP 5, nhưng nhiều ví dụ trong đây chỉ chạy được trên PHP 7.1+.

Vì bài viết khá dài nên mình xin tách thành 2 phần, hi vọng bài viết sẽ có ích :D
## Biến

### Sử dụng tên biến có ý nghĩa và dễ hiểu

**Chưa tốt:**

```php
$ymdstr = $moment->format('y-m-d');
```

**Tốt:**

```php
$currentDate = $moment->format('y-m-d');
```

### Sử dụng cùng từ vựng cho cùng một loại biến

**Chưa tốt:**

```php
getUserInfo();
getUserData();
getUserRecord();
getUserProfile();
```

**Tốt:**

```php
getUser();
```

### Đặt tên sao cho dễ tìm kiếm (phần 1)

Thường thì chúng ta sẽ đọc code nhiều hơn viết code. Nên điều quan trọng là code chúng ta viết ra phải dễ đọc và dễ tìm kiếm.
Nếu *không* đặt tên biến có ý nghĩa và làm chương trình dễ hiểu, chúng ta sẽ gây khó cho những lập trình viên khác. Do đó mỗi khi đặt tên biến, hàm thì hãy đặt có ý nghĩa.

**Chưa tốt:**

```php
// Oh man, 448 là cái gì vậy?
$result = $serializer->serialize($data, 448);
```

**Tốt:**

```php
$json = $serializer->serialize($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
```

### Đặt tên sao cho dễ tìm kiếm (phần 2)

**Chưa tốt:**

```php
// Rồi, 69 nghĩa là cái gì đây? =))
if ($user->access & 69) {
    // ...
}
```

**Tốt:**

```php
class User
{
    const ACCESS_READ = 6;
    const ACCESS_CREATE = 9;
    const ACCESS_UPDATE = 69;
    const ACCESS_DELETE = 96;
}

if ($user->access & User::ACCESS_UPDATE) {
    // edit ...
}
```

### Đặt tên biến dễ hiểu

Tức là đặt tên biến sao cho đọc vô là hiểu nó là gì và nó dùng để làm gì. Không cần phải suy nghĩ, suy diễn.

**Chưa tốt:**

```php
$address = 'One Infinite Loop, Cupertino 95014';
$cityZipCodeRegex = '/^[^,]+,\s*(.+?)\s*(\d{5})$/';
preg_match($cityZipCodeRegex, $address, $matches);

saveCityZipCode($matches[1], $matches[2]);
```

**Không tệ lắm:**

Tốt hơn một chút, nhưng vẫn còn phụ thuộc nhiều vào regex.

```php
$address = 'One Infinite Loop, Cupertino 95014';
$cityZipCodeRegex = '/^[^,]+,\s*(.+?)\s*(\d{5})$/';
preg_match($cityZipCodeRegex, $address, $matches);

[, $city, $zipCode] = $matches;
saveCityZipCode($city, $zipCode);
```

**Tốt:**

Đã giảm phụ thuộc vào regex bằng "naming subpatterns".

```php
$address = 'One Infinite Loop, Cupertino 95014';
$cityZipCodeRegex = '/^[^,]+,\s*(?<city>.+?)\s*(?<zipCode>\d{5})$/';
preg_match($cityZipCodeRegex, $address, $matches);

saveCityZipCode($matches['city'], $matches['zipCode']);
```

### Tránh lồng (nesting) quá nhiều và nên return sớm (phần 1)

Quá nhiều if else lồng nhau sẽ khiến code tăng độ phức tạp, khó debug. Giảm sự phức tạp bằng cách giảm số if else lồng nhau xuống ít nhất có thể. Return sớm chính là một cách giảm số lần lồng nhau.

**Chưa tốt:**

```php
function isShopOpen($day): bool
{
    if ($day) {
        if (is_string($day)) {
            $day = strtolower($day);
            if ($day === 'friday') {
                return true;
            } elseif ($day === 'saturday') {
                return true;
            } elseif ($day === 'sunday') {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}
```

**Tốt:**

```php
function isShopOpen(string $day): bool
{
    if (empty($day)) {
        return false;
    }

    $openingDays = [
        'friday', 'saturday', 'sunday'
    ];

    return in_array(strtolower($day), $openingDays, true);
}
```

### Tránh lồng (nesting) quá nhiều và nên return sớm (phần 2)

**Chưa tốt:**

```php
function fibonacci(int $n)
{
    if ($n < 50) {
        if ($n !== 0) {
            if ($n !== 1) {
                return fibonacci($n - 1) + fibonacci($n - 2);
            } else {
                return 1;
            }
        } else {
            return 0;
        }
    } else {
        return 'Not supported';
    }
}
```

**Tốt:**

```php
function fibonacci(int $n): int
{
    if ($n === 0 || $n === 1) {
        return $n;
    }

    if ($n > 50) {
        throw new \Exception('Not supported');
    }

    return fibonacci($n - 1) + fibonacci($n - 2);
}
```

### Tránh hack não người đọc

Đừng khiến người đọc code phải khó khăn để hiểu ý nghĩa của biến. Tên biến càng rõ ràng càng tốt.

**Chưa tốt:**

```php
$l = ['Austin', 'New York', 'San Francisco'];

for ($i = 0; $i < count($l); $i++) {
    $li = $l[$i];
    doStuff();
    doSomeOtherStuff();
    // ...
    // ...
    // ...
    // Đợi đã, `$li` là cái gì?
    dispatch($li);
}
```

**Tốt:**

```php
$locations = ['Austin', 'New York', 'San Francisco'];

foreach ($locations as $location) {
    doStuff();
    doSomeOtherStuff();
    // ...
    // ...
    // ...
    dispatch($location);
}
```

### Đừng thêm những nội dung không cần thiết

Nếu tên của class/object đã rõ ràng, không nên lặp lại chúng trong tên biến.

**Chưa tốt:**

```php
class Car
{
    public $carMake;
    public $carModel;
    public $carColor;

    //...
}
```

**Tốt:**

```php
class Car
{
    public $make;
    public $model;
    public $color;

    //...
}
```

### Sử dụng đối số mặc định thay vì phải kiểm tra bằng biểu thức điều kiện

**Chưa tốt:**

Chưa tốt vì `$breweryName` có thể bị `NULL`.

```php
function createMicrobrewery($breweryName = 'Hipster Brew Co.'): void
{
    // ...
}
```

**Không tệ lắm:**

Cái này tốt hơn cái trước, nhưng nó nên quản lý được giá trị của biến thì tốt hơn.

```php
function createMicrobrewery($name = null): void
{
    $breweryName = $name ?: 'Hipster Brew Co.';
    // ...
}
```

**Tốt:**

 Bạn có thể sử dụng [type hinting](http://php.net/manual/en/functions.arguments.php#functions.arguments.type-declaration) và chắc chắn `$breweryName` sẽ không bị `NULL`.

```php
function createMicrobrewery(string $breweryName = 'Hipster Brew Co.'): void
{
    // ...
}
```

## So sánh

### Sử dụng [identical comparison](http://php.net/manual/en/language.operators.comparison.php)

**Chưa tốt:**

Sử dụng *simple comparison* (so sánh đơn giản)

```php
$a = '42';
$b = 42;
Sử dụng simple comparison thì nó sẽ tự chuyển kiểu string qua kiểu int

if ($a != $b) {
   //Biểu thức này sẽ trả về `false`
}
```
Phép so sánh $a != $b trả về `false` nhưng trong thực tế thì nó phải là `true`.
**Chuỗi** '42' thì phải khác **số** 42 chứ đúng không.

**Tốt:**

Sử dụng *identical comparison* (so sánh giống hệt nhau) để so sánh cả kiểu dữ liệu và giá trị

```php
if ($a !== $b) {
    //Biểu thức này trả về `true`
}
```

## Hàm

### Đối số của hàm (ít hơn hoặc bằng 2 là lý tưởng)

Giới hạn số lượng đối số (parameters) của hàm vô cùng quan trọng bởi vì nó giúp dễ test hơn.
Có nhiều hơn 3 đối số dẫn đến một tổ hợp rất nhiều trường hợp khác nhau cần phải test.

Lý tưởng nhất là khi hàm không có đối số nào. Một hoặc hai đối số là ok, còn ba thì nên hạn chế.
Bất cứ khi nào hàm có nhiều hơn 3 đối số thì cần phải xem xét tìm cách giảm bớt lại.
Bởi vì nếu hàm có nhiều hơn hai đối số thì nó phải xử lý rất nhiều.

**Chưa tốt:**

```php
function createMenu(string $title, string $body, string $buttonText, bool $cancellable): void
{
    // ...
}
```

**Tốt:**

```php
class MenuConfig
{
    public $title;
    public $body;
    public $buttonText;
    public $cancellable = false;
}

$config = new MenuConfig();
$config->title = 'Foo';
$config->body = 'Bar';
$config->buttonText = 'Baz';
$config->cancellable = true;

function createMenu(MenuConfig $config): void
{
    // ...
}
```

### Hàm chỉ thực hiện một chức năng

Đây là nguyên tắc quan trọng nhất trong phát triển phần mềm.
Khi hàm thực hiện nhiều hơn một chức năng, chúng khó biên dịch, kiểm tra và biết được nguyên nhân lỗi.
Khi bạn tạo hàm chỉ với một chức năng, sẽ dễ dàng refactor hơn và code sẽ dễ đọc hơn.
Nếu làm được điều này thì bạn sẽ tốt hơn nhiều lập trình viên khác.

**Chưa tốt:**
```php
function emailClients(array $clients): void
{
    foreach ($clients as $client) {
        $clientRecord = $db->find($client);
        if ($clientRecord->isActive()) {
            email($client);
        }
    }
}
```

**Tốt:**

```php
function emailClients(array $clients): void
{
    $activeClients = activeClients($clients);
    array_walk($activeClients, 'email');
}

function activeClients(array $clients): array
{
    return array_filter($clients, 'isClientActive');
}

function isClientActive(int $client): bool
{
    $clientRecord = $db->find($client);

    return $clientRecord->isActive();
}
```

### Tên hàm nên thể hiện chức năng của hàm

**Chưa tốt:**

```php
class Email
{
    //...

    public function handle(): void
    {
        mail($this->to, $this->subject, $this->body);
    }
}

$message = new Email(...);
// Hàm này dùng làm gì? Có phải nó xử lý mail? Nó có đang ghi gì vào file không?
$message->handle();
```

**Tốt:**

```php
class Email 
{
    //...

    public function send(): void
    {
        mail($this->to, $this->subject, $this->body);
    }
}

$message = new Email(...);
// Rõ ràng và minh bạch, hàm này gửi mail
$message->send();
```

### Hàm chỉ nên có độ trừu tượng một cấp

Khi bạn có độ trừu tượng nhiều hơn một cấp thì hàm thường phải làm quá nhiều việc.
Hãy chia tách hàm ra thành nhiều phần để dễ sử dụng lại và dễ test.

**Chưa tốt:**

```php
function parseBetterJSAlternative(string $code): void
{
    $regexes = [
        // ...
    ];

    $statements = explode(' ', $code);
    $tokens = [];
    foreach ($regexes as $regex) {
        foreach ($statements as $statement) {
            // ...
        }
    }

    $ast = [];
    foreach ($tokens as $token) {
        // lex...
    }

    foreach ($ast as $node) {
        // parse...
    }
}
```

**Cũng chưa tốt:**

Chúng ta đã thực hiện tách ra vài hàm, nhưng hàm `parseBetterJSAlternative()` vẫn còn khá phức tạp và khó test.

```php
function tokenize(string $code): array
{
    $regexes = [
        // ...
    ];

    $statements = explode(' ', $code);
    $tokens = [];
    foreach ($regexes as $regex) {
        foreach ($statements as $statement) {
            $tokens[] = /* ... */;
        }
    }

    return $tokens;
}

function lexer(array $tokens): array
{
    $ast = [];
    foreach ($tokens as $token) {
        $ast[] = /* ... */;
    }

    return $ast;
}

function parseBetterJSAlternative(string $code): void
{
    $tokens = tokenize($code);
    $ast = lexer($tokens);
    foreach ($ast as $node) {
        // parse...
    }
}
```

**Tốt:**

Giải pháp tốt nhất là chuyển các phần thành các dependencies của hàm `parseBetterJSAlternative()`

```php
class Tokenizer
{
    public function tokenize(string $code): array
    {
        $regexes = [
            // ...
        ];

        $statements = explode(' ', $code);
        $tokens = [];
        foreach ($regexes as $regex) {
            foreach ($statements as $statement) {
                $tokens[] = /* ... */;
            }
        }

        return $tokens;
    }
}

class Lexer
{
    public function lexify(array $tokens): array
    {
        $ast = [];
        foreach ($tokens as $token) {
            $ast[] = /* ... */;
        }

        return $ast;
    }
}

class BetterJSAlternative
{
    private $tokenizer;
    private $lexer;

    public function __construct(Tokenizer $tokenizer, Lexer $lexer)
    {
        $this->tokenizer = $tokenizer;
        $this->lexer = $lexer;
    }

    public function parse(string $code): void
    {
        $tokens = $this->tokenizer->tokenize($code);
        $ast = $this->lexer->lexify($tokens);
        foreach ($ast as $node) {
            // parse...
        }
    }
}
```

### Đừng sử dụng cờ như là một đối số của hàm

Cờ dùng để nói rằng hàm này thực hiện nhiều hơn một công việc. Nhưng hàm thì chỉ nên xử lý một công việc mà thôi.
Do đó hãy chia tách hàm của bạn nếu như chúng có nhiều luồng code phân biệt bằng boolean(true/false).

**Chưa tốt:**

```php
function createFile(string $name, bool $temp = false): void
{
    if ($temp) {
        touch('./temp/'.$name);
    } else {
        touch($name);
    }
}
```

**Tốt:**

```php
function createFile(string $name): void
{
    touch($name);
}

function createTempFile(string $name): void
{
    touch('./temp/'.$name);
}
```

### Tránh tác dụng phụ

Một hàm sinh ra tác dụng phụ nếu nó thực hiện thêm việc khác ngoài việc lấy giá trị vào và trả về một hoặc nhiều giá trị khác.
Tác dụng phụ có thể là viết vào một file nào đó, sửa đổi biến global, hoặc vô tình chuyển hết tiền của bạn cho người lạ nào đó.

Vậy nếu bây giờ bạn cần hàm thực hiện các tác dụng phụ đó thì sao. Giống như ví dụ trước, bạn cần ghi vào file. Điều bạn cần làm
là tập trung những việc này lại một chỗ. Đừng viết vài hàm và vài lớp chỉ để ghi vào vài file cụ thể.
Hãy viết một service để làm điều đó. Một và chỉ một service.

Hãy tránh những sai lầm phổ biến như: chia sẻ trạng thái giữa các object mà không tuân theo cấu trúc nào,
sử dụng kiểu dữ liệu có thể thay đổi/bị thay đổi dễ dàng, không tổng hợp các tác dụng phụ có thể xảy ra khi viết hàm.

**Chưa tốt:**

```php
// Biến glabal được tham chiếu bởi hàm bên dưới.
// Nếu ta tạo một function khác sử dụng chính biến name, ví dụ bên dưới cho thấy nó biến thành array và đã bị phá vỡ.
$name = 'Ryan McDermott';

function splitIntoFirstAndLastName(): void
{
    global $name;

    $name = explode(' ', $name);
}

splitIntoFirstAndLastName();

var_dump($name); // ['Ryan', 'McDermott'];
```

**Tốt:**

```php
function splitIntoFirstAndLastName(string $name): array
{
    return explode(' ', $name);
}

$name = 'Ryan McDermott';
$newName = splitIntoFirstAndLastName($name);

var_dump($name); // 'Ryan McDermott';
var_dump($newName); // ['Ryan', 'McDermott'];
```

### Đừng viết hàm global

Dùng nhiều hàm global là bad practice với nhiều ngôn ngữ bởi vì có thể gây xung đột với thư viện khác 
và người sử dụng API của bạn không hề hay biết gì cho đến khi nhận được thông báo lỗi.

Hãy xem xét ví dụ sau: bạn sẽ làm gì nếu muốn trả về một mảng.

Bạn có thể viết hàm global như `config()`, nhưng nó có thể xung đột với thư viện khác thực hiện cùng chức năng.

**Chưa tốt:**

```php
function config(): array
{
    return  [
        'foo' => 'bar',
    ]
}
```

**Tốt:**

```php
class Configuration
{
    private $configuration = [];

    public function __construct(array $configuration)
    {
        $this->configuration = $configuration;
    }

    public function get(string $key): ?string
    {
        return isset($this->configuration[$key]) ? $this->configuration[$key] : null;
    }
}
```

Tạo instance của lớp `Configuration` 

```php
$configuration = new Configuration([
    'foo' => 'bar',
]);
```

Và bây giờ sử dụng instance `Configuration` trong ứng dụng của bạn.

### Đừng sử dụng Singleton pattern

Singleton là một [anti-pattern](https://en.wikipedia.org/wiki/Singleton_pattern). Trích đoạn từ Brian Button:
 1. Chúng thường được sử dụng như **global instance**, vì sao lại Chưa tốt? Bởi vì **bạn ẩn dependencies** của ứng dụng bên trong code của bạn,
  thay vì thông qua interfaces
 2. Chúng vi phạm [single responsibility principle](#single-responsibility-principle-srp): bởi vì thực tế là **chúng điều khiển những gì chúng tạo ra và vòng đời của nó**
 3. Chúng đã tạo ra kiểu code [coupling](https://en.wikipedia.org/wiki/Coupling_%28computer_programming%29). Đây là một sự giả mạo và được giấu bằng cách tạo ra nhiều trường hợp **test khó khăn hơn**.
 4. Chúng giữ trạng thái suốt vòng đời của ứng dụng. Bạn nên kết thúc sớm testing khi lỗi. Nhưng Singleton thì lại duy trì trạng thái nên nó Chưa tốt.

Đây là một ý kiến khác của [Misko Hevery](http://misko.hevery.com/about/) về [gốc rễ của vấn đề](http://misko.hevery.com/2008/08/25/root-cause-of-singletons/).

**Chưa tốt:**

```php
class DBConnection
{
    private static $instance;

    private function __construct(string $dsn)
    {
        // ...
    }

    public static function getInstance(): DBConnection
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    // ...
}

$singleton = DBConnection::getInstance();
```

**Tốt:**

```php
class DBConnection
{
    public function __construct(string $dsn)
    {
        // ...
    }

     // ...
}
```

Tạo instance của lớp `DBConnection` và cấu hình chúng với [DSN](http://php.net/manual/en/pdo.construct.php#refsect1-pdo.construct-parameters).

```php
$connection = new DBConnection($dsn);
```

Và bây giờ sử dụng instance `DBConnection` cho ứng dụng của bạn.

### Đóng gói điều kiện

**Chưa tốt:**

```php
if ($article->state === 'published') {
    // ...
}
```

**Tốt:**

```php
if ($article->isPublished()) {
    // ...
}
```

### Tránh điều kiện phủ định

**Chưa tốt:**

```php
function isDOMNodeNotPresent(\DOMNode $node): bool
{
    // ...
}

if (!isDOMNodeNotPresent($node))
{
    // ...
}
```

**Tốt:**

```php
function isDOMNodePresent(\DOMNode $node): bool
{
    // ...
}

if (isDOMNodePresent($node)) {
    // ...
}
```

### Tránh dùng điều kiện

Điều này có vẻ không khả quan. Hầu hết mọi người sẽ thắc mắc,
"làm sao có thể làm gì đó mà không có `if`?" Bạn có thể dùng tính đa hình để hoàn thành việc đó trong khá nhiều trường hợp.
Câu hỏi thứ hai là, "ồ ngon nhưng tại sao phải làm thế?"
Bởi vì khái niệm clean code mà ta đã học trước đây: một hàm chỉ nên thực hiện một chức năng.
Khi bạn có một lớp hoặc hàm chứa `if`, tức là bạn đang muốn nó thực hiện nhiều việc. Luôn nhớ, chỉ một mà thôi.

**Chưa tốt:**

```php
class Airplane
{
    // ...

    public function getCruisingAltitude(): int
    {
        switch ($this->type) {
            case '777':
                return $this->getMaxAltitude() - $this->getPassengerCount();
            case 'Air Force One':
                return $this->getMaxAltitude();
            case 'Cessna':
                return $this->getMaxAltitude() - $this->getFuelExpenditure();
        }
    }
}
```

**Tốt:**

```php
interface Airplane
{
    // ...

    public function getCruisingAltitude(): int;
}

class Boeing777 implements Airplane
{
    // ...

    public function getCruisingAltitude(): int
    {
        return $this->getMaxAltitude() - $this->getPassengerCount();
    }
}

class AirForceOne implements Airplane
{
    // ...

    public function getCruisingAltitude(): int
    {
        return $this->getMaxAltitude();
    }
}

class Cessna implements Airplane
{
    // ...

    public function getCruisingAltitude(): int
    {
        return $this->getMaxAltitude() - $this->getFuelExpenditure();
    }
}
```

### Tránh kiểm tra kiểu dữ liệu (phần 1)

PHP là một ngôn ngữ không ràng buộc kiểu dữ liệu, nghĩa hàm có thể nhận bất kỳ kiểu nào.
Thỉnh thoảng thì chúng ta bị ảnh hưởng bởi sự tự do này và nó trở thành điều kiện để phải kiểm tra kiểu dữ liệu trong hàm.
Có nhiều cách để tránh phải làm việc đó.

Điều đầu tiên cần làm là tạo ra những API nhất quán.

**Chưa tốt:**

```php
function travelToTexas($vehicle): void
{
    if ($vehicle instanceof Bicycle) {
        $vehicle->pedalTo(new Location('texas'));
    } elseif ($vehicle instanceof Car) {
        $vehicle->driveTo(new Location('texas'));
    }
}
```

**Tốt:**

```php
function travelToTexas(Traveler $vehicle): void
{
    $vehicle->travelTo(new Location('texas'));
}
```

### Tránh kiểm tra kiểu dữ liệu (phần 2)

Nếu bạn đang làm việc với các kiểu dữ liệu nguyên thủy như strings, integers, và arrays,
và sử dụng PHP 7+ và bạn không thể sử dụng tính đa hình nhưng bạn vẫn cảm thấy cần kiểm tra kiểu dữ liệu, hãy xem
[type declaration](http://php.net/manual/en/functions.arguments.php#functions.arguments.type-declaration)
hoặc strict mode. Nó cung cấp cho bạn kiểu static trên PHP standard.
Vấn đề thông thường khi kiểm tra kiểu dữ liệu là sẽ khiến code khó đọc nên tóm lại mất nhiều hơn là được.

Hãy giữ PHP nguyên thủy, viết tests cho tốt, và code reviews cẩn thận là được.
Nếu không thì chỉ còn cách định nghĩa theo kiểu nghiêm ngặt(strict type declaration) hoặc dùng strict mode.

**Chưa tốt:**

```php
function combine($val1, $val2): int
{
    if (!is_numeric($val1) || !is_numeric($val2)) {
        throw new \Exception('Must be of type Number');
    }

    return $val1 + $val2;
}
```

**Tốt:**

```php
function combine(int $val1, int $val2): int
{
    return $val1 + $val2;
}
```

### Xóa dead code

Dead code thì cũng củ chuối giống như duplicate code. Không có lý do gì để giữ chúng.
Nếu đoạn code nào đó không được gọi, hãy xóa đi!
Sau này cần thì chỉ cần tìm lại phiên bản trước bằng git là được.

**Chưa tốt:**

```php
function oldRequestModule(string $url): void
{
    // ...
}

function newRequestModule(string $url): void
{
    // ...
}

$request = newRequestModule($requestUrl);
inventoryTracker('apples', $request, 'www.inventory-awesome.io');
```

**Tốt:**

```php
function requestModule(string $url): void
{
    // ...
}

$request = requestModule($requestUrl);
inventoryTracker('apples', $request, 'www.inventory-awesome.io');
```
## Tham khảo và nguồn
[Clean Code concepts adapted for PHP](https://github.com/jupeter/clean-code-php)

https://github.com/henryonsoftware/clean-code-php