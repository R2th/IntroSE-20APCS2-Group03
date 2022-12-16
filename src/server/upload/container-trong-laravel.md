## Dependency Injection và Binding trong Laravel Service Container
### Dẫn nhập
Container hay còn được biết đến với cái tên
  * Application Container
  * IoC (Inversion of Control) Container
  * Service Container
  * Depedency Injection Container

Tất cả, tuy khác về tên gọi, nhưng đều đề cập về cùng một thứ, đó là Service Container.
Trong bài viết này mình muốn đề cập đến chức năng, cách sử dụng Dependency Injection, Binding của Laravel Service Container.

### Giới thiệu sơ lược về Dependency Injection
Dependency Injection hàm ý rằng, khi khởi tạo một object của class, chúng ta không cần phải khởi tạo những dependencies classes (những class liên quan) bên trong class đó, mà chúng sẽ được inject từ bên ngoài. Và thường gặp nhất là dạng **Constructor injection** , những class sẽ được inject khi khởi tạo object của class.

```php
<?php
class ReservationMailer{
    protected $mailer;
    public function __construct(Mailer $mailer){
      $this->mailer = $mailer;
    }

    public function sendReservationMail($user){
      return $this->mailer->mail($user->email, 'reservation.reserveComplete');
    }
}
?>
```

Đoạn code trên expect khi khởi tạo class `ReservationMailer` chúng ta sẽ truyền một object có kiểu là `Mailer` vào.
Và trong phương thức `sendReservationMail` thì chúng ta có tham chiếu đến object `Mailer` để gọi hàm `mail`
Giả sử, khi sử dụng class `ReservationMailer` chúng ta sử dụng class `MailgunMailer`, thì ta sẽ có đoạn code sample như bên dưới

```php
<?php
$mailer = new MailgunMailer($mailgunKey, $mailgunSecret, $mailgunOptions);
$reservationMailer = new ReservationMailer($mailer);
?>
```

Đó là đoạn code để ta gửi email đã đặt chỗ hoàn tất cho end-user. Giả sử ta không chỉ gửi mail đặt chỗ hoàn tất mà còn muốn gửi notifications đến Slack, lưu vào trong log ta sẽ phải sửa lại

```php
<?php
$mailer = new MailgunMailer($mailgunKey, $mailgunSecret, $mailgunOptions);
$slack = new Slack($slackKey, $slackSecret, $channelName, $channelIcon);
$logger = new Logger($logPath, $logLevel);

$reservationMailer = new ReservationMailer($mailer, $slack, $logger);

$reservationMailer->sendReservationMail($user);
?>
```

Class `ReservationMailer` chỉ mới có 3 class phụ thuộc thôi (dependencies class: class phụ thuộc) mà chúng ta đã thấy để dùng được nó chúng ta phải khổ sở như thế nào rồi.
Rất may laravel có một công cụ để hỗ trợ chúng ta đó là Service Container, và cách nhanh nhất để access Service Container là thông qua global helper `app()`

### Global Helper app()

Cách nhanh nhất để tạo một object (của bất kì class nào) là ta sẽ truyền tên class vào cho `app()` global helper.
Tên class cần truyền có thể ở dạng: Fully Qualified Class Name (FQDN - Tên đầy đủ của class bao gồm cả full namespace) hoặc là shortcut (kiểu `app('log')` chẳng hạn).
Và chúng ta có thể khởi tạo class `Logger` bằng cách

```php
 $logger = app(Logger::class);
```

Chỉ cần truyền như thế ta có 1 object của `Logger` class rồi. Tuy nhiên, để ý kỹ chúng ta có 2 parameters cần truyền vào ở constructor: `$logPath` và `$logLevel`
Vậy thì Service Container có biết là chúng cần phải truyền gì vào 2 parameters đó không ? (Giống như Service Container sẽ đọc được suy nghĩ trong đầu chúng ta đang muốn lưu log tại `storage('s3')\logs` và `$logLevel = INFO` vậy).
Câu trả lời là: **Không**
Tất nhiên là với class `Logger` đơn giản như thế thì chúng ta có thể tự mình khởi tạo object. Còn `app()` sẽ giúp chúng ta đơn giản hoá code khi khởi tạo những object của những class phức tạp (Có tầm gần cả chục dependencies class chẳng hạn).

Chúng ta cùng xem thử ví dụ bên dưới

```php
<?
class Alpha{
  public function __construct(){

  }
}

class Beta{
  public function __construct(){

  }
}

class Gamma{
  public function __construct(Alpha $alpha, Beta $beta){

  }
}

$gm = app(Gamma::class);
```

Chúng ta nhìn thấy có vẻ giống ví dụ khi chúng ta tạo class `Logger` tuy nhiên, chúng ta có thể thấy trong constructor của `Gamma` chúng ta đã typehinting class type ở trước từng parameters.
Service Container sẽ kiểm tra typehint trong constructor, biết các class nào nó phải khởi tạo, khởi tạo chúng và inject vào trong instance của class `Gamma` khi khởi tạo.
Chúng ta không cần phải thực hiện `new Beta` cũng như `new Alpha` trước khi khởi tạo `Gamma`.
Vậy thì với việc typehinting chúng ta có thể nhờ Service Container thực hiện resolve dependencies và thay ta khởi tạo object đó (trong trường hợp này là `Alpha` và `Beta`). Vậy còn những class cần có parameter như `Logger` class thì sao ? Chúng ta sẽ tiếp tục với Binding classes vào Container

*Typehinting: Typehinting là việc đặt tên của class ở trước tên parameter trong method signature (vd ở trên ta có `__construct(Alpha $alpha, Beta $beta)`)*

### Binding class vào container
Binding class vào container đơn giản là trả lời câu hỏi: "Nếu một developer yêu cầu một instance của class `Logger` thì hãy chạy đoạn code này để trả về class `Logger` cho đúng.". Nói cách khác chúng ta dạy cho container cách trả về một instance nếu có ai đó yêu cầu instance của class tương ứng

#### Binding Closure

Chúng ta có đoạn code bên dưới để binding vào closure

```php
<?php
// Service Provider
public function register(){
  $this->app->bind(Logger::class, function($app){
    return new Logger(storage_path('reserve'), 'info');
  })
}
```

Mỗi service provider đều có thể tự động access vào `$this->app`. Sau đó chúng ta sẽ gọi method `bind` của `app`.
Trong đó, parameter đầu tiên là tên FQCN của class, tiếp theo là một closure để dạy cho Container cách resolve và trả về 1 instance của `Logger`, ở đây mình truyền vào tham số là đường dẫn và log level của log.
Và bây giờ bất cứ ai chạy đoạn code `app(Logger::class)` họ cũng sẽ lưu log vào trong thư mục `storage_path('reserve')` và có log level là `info`.
Nên nhớ mỗi khi chúng ta chạy câu lệnh này `app(Logger::class)` thì sẽ có một object mới được khởi tạo và return cho chúng ta. Tiếp theo chúng ta sẽ tìm hiểu cách binding singleton

#### Binding Singleton
Để thực hiện binding singleton chúng ta có thể thực hiện như bên dưới

```php
// Service Provider
public function register(){
  $this->app->singleton(Logger::class, function(){
    return new Logger(storage_path('reserve'), 'info');
  })
}
```

Đoạn binding singleton này hầu như giống như đoạn binding vào closure ngoại trừ việc chúng ta sử dụng hàm `singleton()` của `app` helper
Một cách khác là cứ khởi tạo instance rồi truyền vào trong `singleton()`

```php
//Service Provider
public function register(){
  $logger = new Logger(storage_path('reserve'), 'info');
  $this->app->singleton(Logger::class, $logger);
}
```

Cuối cùng chúng ta có thể alias một class, hoặc bind một class vào một shortcut như bên dứơi
```php
//Bind a class to another class
$this->bind(Logger::class, OtherLogger::class);
//Bind a shortcut to a class
$this->bind('log', Logger::class);
//Bind a class to a shortcut
$this->bind(Logger::class, 'log');
```

#### Binding một class vào interface
Chúng ta sẽ thấy sức mạnh của việc binding một class vào interface.
Đây chính là sức mạnh của Service Container khi ta chỉ cần typehint tên interface thay vì là class name như ví dụ bên dưới

```php
use Interface\LoggerInterface;

class ReservationMailer{
  protected $logger;

  public function __construct(LoggerInterface $logger){
    $this->logger = $logger;
  }
}

//Service provider
public function register(){
  $this->app->bind(Interface\LoggerInterface::class, function(){
    return new S3Logger(); //We will use AWS S3 Logger class instead of Local directory logger;
  })
}

```

Chúng ta có thể typehint `LoggerInterface` trên code, và chọn class chúng ta muốn sử dụng trong Service Provider.
Vậy là sau này chúng ta có thể thay đổi nơi xuất log chẳng hạn mà không cần thay đổi lớp `ReservationMailer` nữa. Đây gọi là **Inversion Of Control**

*Inversion Of Control: Định nghĩa ngắn gọn là, khi lập trình theo flow thông thường, các đoạn code ở level thấp, như các  lớp đặc trưng, các thực thể của các lớp đó,  các đoạn mã tuần tự, thì các đoạn code ở level thấp này chịu trách nhiệm chọn class Logger mà chúng sẽ sử dụng, nói cách khác, nếu theo flow lập trình thông thường thì ở đoạn code trên class `ReservationMailer` sẽ biết nó sử dụng `S3Logger` hay `LocalLogger`. Inversion of Control thì ngược lại, nó đảo ngược qui trình khi class `ReservationMailer` không biết nó sẽ sử dụng class `S3Logger` hay `LocalLogger`. Component chịu trách nhiệm chọn lớp Logger nào không nằm ở đoạn code level thấp này nữa mà nằm ở tầng trên của Application (ở đây là Service Provider). Vì vậy đây gọi là Inversion of Control (Kiểm soát ngược).*

#### Binding theo ngữ cảnh

Giả sử chúng ta muốn log đặt chỗ của khách hàng lên Amazon S3 để dễ kiểm soát nhưng chúng ta muốn log access log chẳng hạn vào LocalLogger thì ở đây chúng ta có thể sử dụng Binding theo ngữ cảnh (Contextual Binding).
Chúng ta sẽ có 2 class một class là `ReservationMailer` và  một class là `DangerAccessMailer`

```php
// Service Provider
public function register(){
  $this->app->when(ReservationMailer::class)
         ->needs(Interface\LoggerInterface::class)
         ->give(S3Logger::class);

  $this->app->when(DangerAccessMailer::class)
        ->needs(Interface\LoggerInterface::class)
        ->give(LocalLogger::class);

}
```

Tuỳ theo ngữ cảnh, chúng ta sẽ binding Logger class tương ứng và việc thiết lập binding như thế nào sẽ nằm bên trong ServiceProvider chứ không nằm ở lớp `ReservationMailer` hay `DangerAccessMailer` nữa

### Injection

Có rất nhiều những class cốt lõi của Laravel được Service Container resolve và inject sẵn cho chúng ta. Ví dụ như Controller class. Ắt hẳn cũng có nhiều lần các bạn làm như bên dưới

```php
class MyController extends Controller{
  public function __construct(){

  }

  public function saveToDB(Request $request){
    //Do something here
  }
}
```
Mặc dù chúng ta không typehint trong constructor của Controller, chúng ta vẫn có thể typehint trong method của Controller và sử dụng class `Request` như thường.
Và chúng ta có thể gọi bất kì hàm nào thông qua `app()` như bên dưới


```php
class Test{
  public function doSomething($param1, $param2){

  }
}

$test = new Test;
//call doSomething on test /
app()->call($test, 'doSomething', ['param1' => $parameter1, 'param2' => $parameter2]);
```

Rất dễ dàng và đẹp :-)
Chúng ta có thể đào sâu hơn thông qua bài blog bên dưới (mình thấy tác giả viết cực kì hay và chi tiết)
*Tham khảo*:
https://gist.github.com/davejamesmiller/bd857d9b0ac895df7604dd2e63b23afe
