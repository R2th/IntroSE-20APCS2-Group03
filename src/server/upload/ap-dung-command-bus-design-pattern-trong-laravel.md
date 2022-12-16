Là một lập trình viên, chắc hẳn mỗi chúng ta đều không xa lạ với khái niệm Design Pattern. Đó là các mẫu thiết kế chuẩn, những khuôn mẫu cho các vấn đề chung trong thiết kế phần mềm. Trong bài viết này, mình sẽ giới thiệu một design pattern phổ biến - Command Bus và cách triển khai nó trong Laravel.
# **1. Phân biệt Command Pattern và Command Bus Pattern**<br>
**Command Pattern**<br>
Đóng gói tất cả thông tin cần thiết vào 1 đối tượng để thực hiện hành động hay kích hoạt một sự kiện thực hiện sau đó. Command có nghĩa là lệnh. Commander là người ra lệnh, cung cấp một class đóng gói những mệnh lệnh. Và dĩ nhiên, có người ra lệnh thì ắt sẽ có người nhận lệnh và thi hành lệnh.

Ví dụ, khi người dùng đặt mua sản phẩm, có rất nhiều thứ cần phải xảy ra như: chúng ta có thể cần tính phí thẻ tín dụng của người dùng, thêm bản ghi vào cơ sở dữ liệu và gửi e-mail xác nhận giao dịch mua. 
Chúng ta có thể đặt tất cả logic này bên trong một phương thức controller; tuy nhiên, điều này có một số nhược điểm. Nhược điểm đầu tiên khi đặt tất cả các logic nghiệp vụ vào trong controller sẽ khiến nó phình to và khó đọc hơn. Hơn nữa, rất khó để sử dụng lại logic mua sản phẩm ở bên ngoài controller đó. Như vậy, chúng ta sẽ yêu cầu người dùng chỉ cần quan tâm và thực hiện lệnh "Order Product", lệnh này sẽ thực hiện ba hành động đã đề cập ở trên như một quy trình nghiệp vụ được gói gọn.

Tuy nhiên, vì Command Pattern đóng gói tất cả những gì cần thiết (dữ liệu và logic) để thực hiện một số quy trình nghiệp vụ vào trong phương thức execute() để thực thi. Điều này gây ra một số vấn đề như: phải tạo các command có chung logic nghiệp vụ, chỉ khác nhau về mặt dữ liệu đầu vào. Ta khó có thể gom các command có chung logic nghiệp vụ lại thành 1 command.

**Command Bus Pattern**<br>
Như vậy, Command Bus Pattern ra đời để giải quyết hạn chế của Command Pattern đã nêu ở trên. Command Bus áp dụng nguyên tắc: ***tách những gì thay đổi khỏi những gì không thay đổi.*** Ở đây, những gì thay đổi chính là dữ liệu, còn những thứ không thay đổi chính là logic nghiệp vụ.

![image.png](https://images.viblo.asia/c61b18fa-06a3-4932-9fb7-24a7450c111d.png)
- Command: Một class các chứa các dữ liệu cần thiết để thực thi hành động của chúng ta (giống DTO - Data Transfer Object). Trong command, ta có thể thực hiện validate các dữ liệu đầu vào.
- Command Handler: Một class chứa logic để thực thi một hành động cụ thể. Một command sẽ được xử lý bởi một handler, handler sẽ nhận một command object làm đầu vào.
- Command Bus: Khi nhận được một đối tượng command, Command Bus sẽ định tuyến và tìm ra handler phù hợp để xử lý command đó.
# **2. Tactician Command Bus**<br>
[Tactician](https://tactician.thephpleague.com/) là một thư viện command bus, giúp cho việc áp dụng Command Bus Pattern một cách dễ dàng và linh hoạt hơn. Hiểu đơn giản, công việc của Command Bus là lấy một Command object (mô tả những gì người dùng muốn làm) và khớp nó với một Handler tương ứng (thực thi command).

Có một số package Laravel Tactician trên Packagist, tham khảo tại link sau: https://packagist.org/search/?q=laravel%20tactician

Trong phần tiếp theo, mình sẽ sử dụng [jagarsoft/laravel-tactician](https://github.com/jagarsoft/laravel-tactician) để triển khai Command Bus với Laravel.
### **Cài đặt**
```php
composer require jagarsoft/laravel-tactician
```
Để sử dụng command bus, ta có thể resolve từ laravel container như sau: 
```php
use Joselfonseca\LaravelTactician\CommandBusInterface;
$commandBus = app()->make(CommandBusInterface::class);
```

Hoặc có thể inject vào trong class constructer:
```php
use Joselfonseca\LaravelTactician\CommandBusInterface;

class MyController extends BaseController
{
    protected CommandBusInterface $commandBus;
    
    public function __construct(CommandBusInterface $commandBus)
    {
        $this->commandBus = $commandBus;
    }
}
```
# **3. Ví dụ minh họa**<br>
**ProductController**<br>
```php
class ProductController extends Controller
{
    protected CommandBusInterface $commandBus;

    public function __construct(CommandBusInterface $commandBus)
    {
        $this->commandBus = $commandBus;
    }

    public function store(Request $request)
    {
        // Thêm handler cho command CreateProductCommand
        $this->commandBus->addHandler(CreateProductCommand::class, CreateProductHandler::class);

        $createProductCommand = new CreateProductCommand($request->name, $request->price, $request->quantity);
        
        // Dispatch command CreateProductCommand
        // Tham số thứ nhất là tên class của command cần dispatch
        // Tham số thứ hai là mảng data truyền vào command, sẽ được map với các tham số trong phương thức khởi tạo của command. Ở đây mình đã khởi tạo đối tượng command ở bên trên, nên mình truyền vào mảng rỗng
        // Tham số thứ ba là mảng các middleware
        return $this->commandBus->dispatch($createProductCommand, [], [CreateProductValidator::class]);
    }
}
```
**CreateProductCommand**<br>
```php
class CreateProductCommand
{
    protected string $name;
    protected int $price;
    protected int $quantity;

    public function __construct($name, $price, $quantity)
    {
        $this->name = $name;
        $this->price = $price;
        $this->quantity = $quantity;
    }
}
```
**CreateProductHandler**<br>
```php
class CreateProductHandler
{
    public function handle($command)
    {
        try {
            // Handle create product logic here
        } catch (\Exception $e) {
            // throws exception here
        }
    }
}
```
**CreateProductValidator**<br>
```php
use Illuminate\Support\Facades\Validator;
use League\Tactician\Middleware;

class CreateProductValidator implements Middleware
{
    protected array $rules = [
        'name' => 'required',
        'price' => 'required',
        'quantity' => 'required'
    ];

    public function execute($command, callable $next)
    {
        $validator = Validator::make((array) $command, $this->rules);
        if ($validator->fails()) {
            // throws exception
        }

        return $next($command);
    }
}
```