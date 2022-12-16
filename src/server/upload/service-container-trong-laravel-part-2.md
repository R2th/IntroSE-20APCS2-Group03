Oke anhem, lần trước mình có viết 1 bài về service container dựa trên cuốn **Laravel Up and Running** , *chương 11: The Container*. Mình có dịch đến phần 5 của chương này đó là 2 cách binding class đến container. Hôm nay mình sẽ dịch nốt phần còn lại của chương này. 

## 5. Binding class tới container.
### 5.3 Contextual Binding 
Nhìn cái tên của kiểu binding này chắc chúng ta cũng đoán đoán ra nó sẽ làm gì rồi, đó là binding theo ngữ cảnh. 

Ta có ví dụ như sau: 

```php
public function register()
{
    $this->app->when(FileWrangler::class)
        ->needs(Interfaces\Logger::class)
        ->give(Loggers\Syslog::class);
    $this->app->when(Jobs\SendWelcomeEmail::class)
        ->needs(Interfaces\Logger::class)
        ->give(Loggers\PaperTrail::class);
}
```

Theo ví dụ trên thì ta thấy rằng, cả class FileWrangler và class SendWelcomeEmail đều muốn gọi đến Interface là Logger. Tuy nhiên nhiệm vụ ở mỗi class lại khác nhau. Ông FileWrangler thì muốn ghi Log cho hệ thống, ông SendWelcomeEmail thì muốn ghi Log ra 1 hệ thống bên ngoài, do đó cách trên sẽ giúp ta binding hợp lý cho mỗi class để sử dụng. 

Cú pháp cũng cực kỳ đơn giản:  when(A::class) -> needs (B::class) -> give (C::class).  Kiểu như là : khi thằng A cần lớp B thì cô giáo container làm ơn đưa thằng học sinh C của lớp B cho thằng A dùng.

## 6. Constructor Injection và Method Injection
Chúng ta vẫn thường hay viết theo kiểu sau mà không hiểu rõ bản chất của vấn đề: 
```php
class MyController extends Controller
{
    protected $logger;
    public function __construct(Logger $logger)
    {
        $this->logger = $logger;
     }
    public function index()
    {
        // Do something
        $this->logger->error('Something	happened');
    }
}
```

Chúng ta inject class **Logger** ở trong hàm __construct của Controller. Vậy thì đúng ra khi router gọi đến Controller này thì phải gọi là **MyController(new Logger)** thì mới đúng. Chúng ta lại không thấy việc gọi này ở đâu. Vậy thì thằng Logger kia lấy đâu ra nhỉ :-? . May mắn cho chúng ta là đã có cơ chế tự động resovle này. Bản chất ở đây mỗi controller đều được khởi tạo bởi container. Có nghĩa là chỉ cần typehint Logger class ở trong constructor của controller thì Laravel khi tạo ra controller cũng sẽ tạo ra instance của lớp Logger cho chúng ta (cơ chế autowiring mình đã viết ở bài viết trước [link](https://viblo.asia/p/service-container-trong-laravel-aWj53pXbK6m)). Rất thú vị nhỉ.

Không chỉ controller mà container sẽ resolve bao gồm:  controllers,	middleware,	queue jobs, event listeners, và tất cả các class được tạo tự động bởi Laravel trong vòng đời của nó.

Tương tự như constructor injection là method injection, nhưng lưu ý ở đây là method injection chỉ được áp dụng cho controller, chứ không phải nhiều nơi như constructor injection. 

```php
class MyController extends Controller
{
    // Method dependencies can come after or before route parameters
       public function show(Logger $logger, $id)
        {
            // Do something
            $logger->error('Something happened');
        }
}
```
Như ví dụ trên thì chỉ cần gọi hàm show thôi thì Logger cũng sẽ tự động được khởi tạo.

## 7. Facades và Container
Facades là gì nhỉ? 

Nghe đến đây thì chúng ta thường sẽ đi tra google ngay **[Facade php là gì?](https://www.google.com/search?q=what+is+a+facade+php&oq=what+facade+php&aqs=chrome.1.69i57j0.11389j0j7&sourceid=chrome&ie=UTF-8)**. Nhưng thực ra trong laravel, facades là 1 khái niệm hoàn toàn khác. Đại khái thì **Laravel facades** là những class mà nó cung cấp 1 cách đơn giản để truy cập vào các phương thức bên trong lõi của Laravel. 

Có 2 đặc điểm chính của thanh niên này đó là:
* Ta có thể gọi nó ở bất cứ đâu và ở global namespace ( kiểu như là \Log thay cho việc use \Illuminate\Support\Facades\Log)
* Nó sử dụng phương thức static để gọi hàm.
Ví dụ: 
```php
Log::alert('Something has gone wrong!');
```
tương đương với: 
```
$logger	= app('log');
$logger->alert('Something has gone wrong!');
```

Vậy Facades hoạt động dư thế lào?
Chúng ta sẽ ngó qua class Log facade đẻ xem (file Illuminate\Support\Facades\Log trong vendor):
```php
namespace Illuminate\Support\Facades;
class Log extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'log';
    }
}
```
Mỗi facade có 1 method là *getFacadeAccessor()*. Nó định nghĩa key mà Laravel sử dụng để tìm kiếm facade instance trong container. 
Vậy là mỗi lần gọi đến Log facade là gọi đến instance của Log shorcut. Nó không phải class thật cũng như interface. Nó đơn giản chỉ là 1 bản shorcut (kiểu hay send file to desktop ở window ý) để gọi thay thế cho class thật ở phía dưới core của laravel. 

Nếu bạn thực sự muốn tìm hiểu lớp thực sự đứng sau thằng Facade thì có thể tham khảo cuối bài viết về Facade trên trang chủ laravel => [Facade](https://laravel.com/docs/5.7/facades)

Vài điểm khá quan trọng về facade nhưng không được đề cập đến trong cuốn sách là: 
*  cách gọi static method qua __callStatic
*  cách alias đến các Facade của Laravel cũng như có thể tự tạo facade cho chính project của bạn.

Hai điểm trên các bạn có thể tham khảo bài viết về Facade ở link: [Laravel đơn giản, đẹp và hiệu quả hơn với Laravel Facade](https://allaravel.com/laravel-tutorials/laravel-don-gian-dep-va-hieu-qua-hon-voi-laravel-facade/)


-----
Tóm lại, Container trong laravel thực sự đem lại rất nhiều lợi ích, nó giúp laravel trở thành 1 framework rất mạnh ở thời điểm hiện tại. Nắm được nguyên lý hoạt động của nó cũng giúp ta hiểu rõ hơn về laravel cũng như có thể đi sâu hơn xuống các tầng ở dưới core của nó. Các bạn nếu có gì thắc mắc hay thấy không đúng comment ở dưới bài viết cho mình nhé. 

Cảm ơn mọi người đã đọc, hy vọng bài viết có thể hữu ích 😄

### Nguồn tham khảo: 
- Laravel Up and Running chapter 11.
- [Laravel Facades](https://laravel.com/docs/5.7/facades)
- [Laravel Service Container](https://laravel.com/docs/5.7/container)
- [Laravel đơn giản, đẹp và hiệu quả hơn với Laravel Facade](https://allaravel.com/laravel-tutorials/laravel-don-gian-dep-va-hieu-qua-hon-voi-laravel-facade/)