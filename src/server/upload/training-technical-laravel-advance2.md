![](https://images.viblo.asia/6b584cef-789d-4597-8c66-81cc99ffe5ea.png)

# Magic function, Trait, CLosure, Composer
## Magic Function
## Magic methods là gì.
- Magic methods là các phương thức đặc biệt được tạo ra nhằm giải quyết các vấn đề về sự kiện trong chương trình (cụ thể là với class), và đối với PHP cũng thế.
### Ưu điểm
- Từ khái niệm trên thì các bạn chắc cũng có thể nhận ra các ưu điểm của nó rồi chứ? nó gồm có các ưu điểm như sau:
    Giúp cho chúng ta tùy biến được các hành vi.
    Nó giúp cho chúng ta có thể khởi tạo một đối tượng theo cách mình muốn.
### Nhược điểm
Một magic methods có tốc độ chậm hơn các phương thức bình thường.
## Các magic method trong PHP.
- Trong PHP có hỗ trợ chúng ta 15 magic method với từng chức năng khác nhau:

    + __construct(): gọi khi khởi tạo đối tượng.

    + __destruct(): goij khi hủy đối tượng.

    + __set(): gọi khi ta truyền dữ liệu cho một thuộc tính không được phép truy cập.

    + __get(): khi đọc dữ liệu từ một thuộc tính không được phép truy cập.

    + __isset(): được gọi khi gọi hàm isset() hoặc empty() trên một thuộc tính không được phép truy cập.

    + __unset(): được gọi khi hàm unset() được sử dụng trong một thuộc tính không được phép truy cập.

    + __call():được gọi khi ta gọi một phương thức không được phép truy cập trong phạm vi của một đối tượng.

    + __callstatic(): được kích hoạt khi ta gọi một phương thức không được phép truy cập trong phạm vi của một phương thức tĩnh.

    + __toString(): phương thức này giúp class chỉ định xem sẽ in ra cái gì khi nó được dùng.

    + __invoke():phương thức này được gọi khi một lệnh cố gắng gọi một đối tượng như một hàm.

    + __sleep(): được gọi khi serialize() một đối tượng.

    + __wakeup: được gọi khi unserialize() đối tượng.

    + __set_state():

    + __clone(): được sử dụng khi chúng ta clone một object.

    + __debugInfo(): được gọi khi chúng ta sử dụng hàm vardump().

> + https://viblo.asia/p/php-magic-methods-qzaGzLzdkyO
> + https://viblo.asia/p/php-magic-methods-la-gi-PaLkDymdvlX
> + https://toidicode.com/magic-methods-trong-php-106.html
> + https://viblo.asia/p/laravel-and-php-magic-methods-157G5o7ORAje
> 
##  Trait
PHP là ngôn ngữ chỉ hỗ trợ đơn kế thừa trong hướng đối tượng thế nên bạn muốn sử dụng lại source code một cách nhiều lần là rất khó khăn. Và để khắc phục điều đó thì từ PHP 5.4 trở lên, PHP đã hỗ trợ chúng ta Traits. Một khái niệm được dùng rất là nhiều trong các framework PHP hiện nay, điển hình là Laravel.
## Traits là gì?
- Traits là một module giúp cho chúng ta có thể sử dụng lại các phương thức được khai báo trong trait  vào các class khác nhau một cách đơn giản hơn là kế thừa như trước.

- Các đặc điểm của Traits:
    + Traits có chức năng gom lại các phương thức và thuộc tính mà chúng ta muốn sử dụng lại nhiều lần.
    + Traits như một abstract class ( đều không thể khởi tạo được) nhưng không hoàn toàn giống nhau.
    + Các phương thức trong Traits có thể bị override lại trong class sử dụng nó.
- Ưu điểm của Traits: 
     + Giảm việc lặp code đáp ứng được nguyên tắc(DRY - Don't Repeat Yoursefl).
    + Khắc phục được điểm yếu đơn kế thừa của PHP.
- Nhược điểm của Traits: Nhược điểm duy nhất mà mình thấy được khi sử dụng traits đó là sẽ gây khó khăn có chúng ta đọc được các phương thức từ một class có sử dụng traits

> + https://toidicode.com/traits-trong-php-108.html
> + https://toidicode.com/traits-trong-php-phan-2-109.html

# Hàm ẩn danh Lambda và Closure trong PHP
## Lambda

### Lambda là gì?
- Lambda là một anonymous function (hàm ẩn danh) nó có thể khai báo,định nghĩa ở bất kỳ đâu và không có khả năng tái sử dụng.
- Lambda chỉ tồn tại trong phạm vi của biến mà nó được định nghĩa, vì vậy nếu như biến đó vượt ra ngoài phạm vi thì hàm này cũng không còn tác dụng nữa.
- Lambda thường được dùng để gán vào biến, hay được gán vào hàm,class như một tham số.
## CLosure
### Closure là gì?
-Thực ra thì một closure cũng là một lambda, nhưng closure có thêm chức năng là có thể sử dụng các biến bên ngoài phạm vi mà nó được tạo ra.

> https://toidicode.com/ham-an-danh-lambda-va-closure-trong-php-110.html

# Composer trong PHP
Composer là một công cụ quản lý các thư viện trong các project, bạn chỉ cần khai báo nó, composer sẽ tự động tải code của các thư viện.

Composer được gọi là **Dependency management**, nghĩa là nó giúp bạn quản lý các thư viện, nhưng không giống như Yum hoặc Apt trong linux, nó không cho các project của bạn dùng chung một đoạn code của thư viện, mà ở mỗi project, nó sẽ tải code của thư viện về và inject vào thư mục gốc trong project của bạn, và bạn hoàn toàn được auto update các thư viện và sử dụng cho project.

> https://viblo.asia/p/quan-li-cac-thu-vien-php-voi-composer-7rVRqpr9v4bP
# Dependency Injection
+ Dependency Inversion là một nguyên lý để thiết kế và viết code trong[ 5 nguyên lý S.O.L.I.D](https://toidicodedao.com/2015/03/24/solid-la-gi-ap-dung-cac-nguyen-ly-solid-de-tro-thanh-lap-trinh-vien-code-cung/) do Robert C.Martin viết. Các khái niệm tiếp theo đều được phát triển để thực hiện hóa nguyên lý này.
+  Inversion of Control (IoC) là một design pattern được tạo ra có thể tuân thủ nguyên lý Dependency Inversion trong thiết kế và code. Có nhiều cách hiện thực pattern này: ServiceLocator, Event, Delegate, … Dependency Injection là một trong các cách đó.
+ Dependency Injection là một phương thức để thực hiện design partern Inversion of Control, tức là một phương thức để viết code tốt hơn.
+ Dependency injection container là một tool để giúp DI tốt hơn, đơn giản hơn , phổ biết trong PHP như là PHP-DI, Dice, Symfony-dependency,  Pimple.
Và nó có 3 kiểu DI:

    1. Constructor Injection: Các dependency sẽ được container truyền vào (inject vào) 1 class thông qua constructor của class đó. Đây là cách thông dụng nhất.
    1. Setter Injection: Các dependency sẽ được truyền vào 1 class thông qua các hàm Setter.
    1. Interface Injection: Class cần inject sẽ implement 1 interface. Interface này chứa 1 hàm tên Inject. Container sẽ injection dependency vào 1 class thông qua việc gọi hàm Inject của interface đó. Đây là cách rườm rà và ít được sử dụng nhất.
    
Cũng có ý kiến cho rằng Inversion of Control và Dependency Injection là một, và chúng chỉ là 2 cái tên được dùng cho một mục đích. Tuy nhiên, phần nhiều thì cho rằng Dependency Injection là một phần nhỏ của Inversion of Control, và nó là một trong những giải pháp để thực hiện Inversion of Control. Nhìn chung ta có thể hiểu đơn giản như sau:


Dependency Injection: Mình đã từng đề cập ở bài viết trước. Nếu một Class A hoạt động phụ thuộc vào một vài Class khác, thì thay vì khởi tạo các instance của các Class kia bên trong Class A, ta sẽ inject những instance đó vào thông qua constructor hay setter. Những instance của các Class mà Class A cần để hoạt động đó được gọi là dependency. Ví dụ:
```php
class Monitor {}
class Keyboard {}
class Computer
{
    protected $monitor;
    protected $keyboard;
    public function __construct($monitor, $keyboard)
    {
        $this->monitor = $monitor;
        $this->keyboard = $keyboard;
    }
}

$computer = new Computer(new Monitor(), new Keyboard());
```

Như ở ví dụ trên ta có thể thấy class Computer cần các dependency là instance của Monitor và Keyboard. Thay vì khởi tạo các dependency này bên trong constructor của class Computer, ta sẽ inject chúng vào khi gọi new Computer.

> https://viblo.asia/p/dependency-injection-trong-php-1Je5EMYj5nL
# Tìm hiểu về Service Container trong Laravel
+ Hiểu được Dependency Injection là gì ??
+  Inversion of Control là gì?

==> IoC Container ở phiên bản Laravel 4.2 đã được đổi tên lại thành Service Container ở phiên bản 5, với nhiều tính năng mới, tiện dụng hơn được thêm vào. Nhưng nhìn chung thì tư tưởng và cách hoạt động của nó không thay đổi. **Service Container vẫn là một nơi quản lý class dependency và thực hiện dependency injection.**

> + https://viblo.asia/p/tim-hieu-ve-service-container-trong-laravel-Qbq5QLw3lD8
> + https://viblo.asia/p/laravel-beauty-tim-hieu-ve-service-container-3KbvZ1wLGmWB
> + https://giaphiep.com/docs/5.3/container
# Tìm hiểu về Service Provider
+ Service providers là trung tâm của việc khởi tạo tất cả các ứng dụng Laravel. Ứng dụng của bạn, cũng như các thành phần core của Laravel được khởi tạo từ service providers.
+ Đơn giản, ý là đăng ký, bao gồm đăng kí các liên kết tới service container, event listeners, middleware, và thậm chí các route. Service providers là trung tâp để cấu hình ứng dụng của bạn.


> + https://viblo.asia/p/laravel-beauty-tim-hieu-ve-service-provider-zb7vDVJnMjKd
> + https://giaphiep.com/docs/5.3/providers
> 
# Repository
> + https://viblo.asia/p/viet-repository-sach-hon-trong-laravel-Qbq5QA6z5D8
> + https://viblo.asia/p/curd-voi-repository-trong-laravel-5-part-1-PDOkqLJMejx

# Authorization trong Laravel
Như các bạn đã biết thì service authentication dùng để xác thực người dùng khi đăng nhập vào một hệ thống website nào đó . Ngoài authentication thì Laravel còn cung cấp cho chúng ta Authorization (phân quyền) chi tiết từng hành động của người dùng được phép làm gì và không được phép làm gì.

+ Có hai cách để làm việc với Authorization đó là thông qua Gate và Policy.
https://viblo.asia/p/authorization-trong-laravel-1Je5Exy1lnL
# Laravel đã xử lý một request như thế nào?
> + https://viblo.asia/p/laravel-da-xu-ly-mot-request-nhu-the-nao-bJzKmG7Ol9N