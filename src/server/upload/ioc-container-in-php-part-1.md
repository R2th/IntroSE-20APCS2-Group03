Trong chuỗi bài viết này, chúng ta sẽ tự tay implement một cái **IoC Container** (*Inversion of Control Container*), sử dụng ngôn ngữ lập trình **PHP**. Nhưng trước khi implement **IoC Container**, chúng ta cần bàn một chút về **Dependency Injection (DI)**

# 1. Dependency Injection & Inversion of Control (IoC).
Xem qua đoạn code này:

```php
public function __construct()
{
  $this->connection = new MySqlConnection('127.0.0.1');
}
```
Thay vì **tạo** một instance của MySqlConnection **ngay bên trong constructor của class** như ví dụ trên.

Ta muốn **truyền** một instance của MySqlConnection **vào trong class** này.

```php
public function __construct(MySqlConnection $connection)
{
  $this->connection = $connection;
}
```

Làm như này, nó chính là **Dependency Injection** rồi đấy!

---

**But Why?**

Tại sao chúng ta lại muốn code như vậy ?

Hãy cùng xem qua một ví dụ khác:

```php
public function __construct(Mailer $mailer)
{
  $this->mailer = $mailer;
}
```
Giả sử chúng ta muốn thực hiện việc gửi mail ở trong một class, chúng ta sẽ truyền một **instance** của **Mailer** vào trong class này. Việc này sẽ giúp chúng ta test dễ dàng hơn.

```php
$mailer = Mockery::mock('Illuminate\Contracts\Mail\Mailer');
$mailer->shouldReceive('send')->once();
$instance = new Service($mailer);
```

Ở đây chúng ta có thể mock một mailer, rồi thiết lập expectation cho nó, và truyền nó vào một class. Rồi thực hiện test cái function mà có sử dụng mailer instance trong class đó,...

Đó là lợi ích đầu tiên của DI, **Easy To Test.**

Một lợi ích thứ hai nữa là **Easy To Swap Implementation**.

Nói về **swap implementation**, nó xứng đáng có một bài viết riêng để bàn về. Về bản chất cốt lỗi, là các thành phần code của chúng ta, sẽ liên kết và phụ thuộc vào nhau thông qua **Interface** thay vì **Implementation**. 

Lấy một ví dụ, một ứng dụng cần có tính năng lưu thông tin người dùng. Ta định nghĩa ra một class **FileSystemUserRepository** có các phương thức cơ bản như **read** và **write**. Tới đây, ta đã biết và đã quen áp dụng **Dependency Injection**, Ta inject một instance của class FileSystemUserRepository này vào và sử dụng. 

Nhưng vài tuần sau, yêu cầu thay đổi, thay vì lưu thông tin người dùng vào file text như hiện tại. Ta sẽ phải lưu nó vào database. Vậy là ta định nghĩa một class **PostgresqlDatabaseUserRepository**. Và phải thay thế tất cả các **FileSystemUserRepository** này.

Mà quan trọng, là nếu viết có cấu trúc tốt, thì đổi còn đơn giản. Còn như, trong hai class đó mà function tên gọi, tham số khác nhau, thì refactor điên mất, căng thẳng lắm. b

---

Nhưng giả sử, giờ ta viết ra một **Interface**, ví dụ, **UserRepositoryInterface**, sau đó Implement cái interface này, rồi ta thay vì **DI** cái class name vô, thì giờ ta **DI** cái **Interface**.

```php

$container->bind('UserRepositoryInterface', 'PostgreSQLImplementation');

class Something {
  public function __construct(UserRepositoryInterface $repository) {
    $this->repository = $repository;
  }
}

```

Rồi nhờ có **IoC Container**, ta sẽ có thể **map** cái **Interface** với cái **Implementation** và **DI** khi cần.

Việc code của chúng ta phụ thuộc (**depend**) vào **Interface** thay vì **Implementation** là một best pratice quan trọng khi thực hiện **DI**.

*Note: việc này chỉ có thể thực hiện khi có sự giúp sức của IoC Container.*

Nếu chỉ là Dependency Injection, thì đoạn code sau đã là Dependency Injection.

```php
$discountBroker = new DiscountBroker(
  new ProductRepository, new EventDispatcher, new Logger(
    new EmailLoggingDriver(
      new SmtpTransport(
         $emailServerCredentials
      )
    )
  )
)
```
Ta đã **tiêm** instance vào constructor của các class như thế, nó đã áp dụng đúng DI. Tuy nhiên, nếu cứ viết như này, thì cái codebase của chúng ta sẽ như nào ? sẽ rất dài và khó maintain :hankey:

Đó là lúc, chúng ta cần sự trợ giúp của IoC Container, và vận dụng **Reflection** in PHP

# 2. IoC Container and Reflection base implementation

... to be continue