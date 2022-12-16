Trong thời gian gần đây, Design Pattern là một chủ đề được bàn luận rất sôi nổi trong giới lập trình. Phần lớn cho rằng vì các lập trình viên sử dụng nó quá mức dẫn đến việc code trở nên càng khó hiểu, phức tạp và khó quản lý. Tuy nhiên chúng ta cũng không thể phủ nhận những điều tích cực mà Design Pattern mang lại trong code. Hôm nay chúng ta sẽ cùng tìm hiểu Design Pattern nhé

### Design Pattern Là Gì
**Design pattern** là các giải pháp tổng thể đã được tối ưu hóa, được tái sử dụng cho các vấn đề phổ biến trong thiết kế phần mềm mà chúng ta thường gặp phải hàng ngày. Bạn không thể chỉ tìm một mẫu và sao chép nó vào code của mình, theo cách bạn có thể làm với các chức năng hoặc thư viện có sẵn. **Design Pattern** không phải là một đoạn mã cụ thể, mà là một khái niệm chung để giải quyết một vấn đề cụ thể. Bạn có thể làm theo các chi tiết mẫu và triển khai một giải pháp phù hợp với thực tế của chương trình của riêng bạn. 

Các **Design Pattern** thường bị nhầm lẫn với các thuật toán, vì cả hai khái niệm đều mô tả các giải pháp điển hình cho một số vấn đề đã biết. Trong khi một thuật toán luôn xác định một tập hợp các hành động rõ ràng có thể đạt được một số mục tiêu, thì một **Design Pattern** là một mô tả cấp cao hơn về một giải pháp. Code của cùng một mẫu được áp dụng cho hai chương trình khác nhau có thể khác nhau.

### Tại sao nên tìm hiểu Design Pattern
Các **Design Pattern** là một bộ công cụ gồm các giải pháp đã được thử và kiểm tra cho các vấn đề thường gặp trong thiết kế phần mềm. Ngay cả khi bạn không bao giờ gặp phải những vấn đề này, việc biết các mẫu vẫn hữu ích vì nó dạy bạn cách giải quyết tất cả các loại vấn đề bằng cách sử dụng các nguyên tắc của thiết kế hướng đối tượng.

Các **Design Pattern** xác định một ngôn ngữ chung mà bạn và đồng đội của bạn có thể sử dụng để giao tiếp hiệu quả hơn. Bạn có thể nói, “Ồ, chỉ cần sử dụng Singleton cho điều đó,” và mọi người sẽ hiểu ý tưởng đằng sau đề xuất của bạn. Không cần giải thích singleton là gì nếu bạn biết mẫu và tên của nó.

### Lợi ích của Design Pattern
- Giúp sản phẩm của chúng ta linh hoạt, dễ dàng thay đổi và bảo trì hơn.
- Có một điều luôn xảy ra trong phát triển phần mềm, đó là sự thay đổi về yêu cầu. Lúc này hệ thống phình to, các tính năng mới được thêm vào trong khi performance cần được tối ưu hơn.
- Design pattern cung cấp những giải pháp đã được tối ưu hóa, đã được kiểm chứng để giải quyết các vấn đề trong software engineering. Các giải pháp ở dạng tổng quát, giúp tăng tốc độ phát triển phần mềm bằng cách đưa ra các mô hình test, mô hình phát triển đã qua kiểm nghiệm.
- Những lúc khi bạn gặp bất kỳ khó khăn đối với những vấn đề đã được giải quyết rồi, design patterns là hướng đi giúp bạn giải quyết vấn đề thay vì tự tìm kiếm giải pháp tốn kém thời gian.
Giúp cho các lập trình viên có thể hiểu code của người khác một cách nhanh chóng (có thể hiểu là các mối quan hệ giữa các module chẳng hạn). Mọi thành viên trong team có thể dễ dàng trao đổi với nhau để cùng xây dựng dự án mà không tốn nhiều thời gian.

### Những chú ý trước khi áp dụng Design Pattern
Việc sử dụng các **design pattern** sẽ giúp chúng ta giảm được thời gian và công sức suy nghĩ ra các cách giải quyết cho những vấn đề đã có lời giải. Lợi ích của việc sử dụng các mô hình **Design Pattern** vào phần mềm đó chính là giúp chương trình chạy uyển chuyển hơn, dễ dàng quản lý tiến trình hoạt động, dễ nâng cấp bảo trì, …

Tuy nhiên điểm bất cập của **design pattern** là nó luôn là một lĩnh vực khá khó nhằn và hơi trừu tượng. Khi bạn viết code mới từ đầu, khá dễ dàng để nhận ra sự cần thiết phải có mẫu thiết kế. Tuy nhiên, việc áp dụng mẫu thiết kế cho code cũ thì khó khăn hơn.

Khi sử dụng những mẫu **design pattern** có sẵn thì chúng ta sẽ đối mặt với một vấn đề nữa là perfomance của product (code sẽ chạy chậm chẳng hạn). Cần phải chắc chắn là bạn đã hiểu toàn bộ mã nguồn làm việc như thế nào trước khi đụng vào nó. Việc này có thể là dễ dàng hoặc là đau thương, phụ thuộc vào độ phức tạp của code.

Hiện nay chúng ta đang áp dụng rất nhiều design pattern vào công việc lập trình của mình. Nếu bạn thường tải và cài đặt các thư viện, packages hoặc module nào đó thì đó là lúc bạn thực thi một design pattern vào hệ thống.

Tất cả các framework cho ứng dụng web như Laravel, Codeigniter… đều có sử dụng những kiến trúc design pattern có sẵn và mỗi framework sẽ có những kiểu design pattern riêng.

### Một số Design Pattern phổ biến trong Laravel

 **Dependency Injection** là một design pattern được sử dụng phổ biến trong các Framework hiện đại. Hiểu đơn giản có nghĩa là nếu một Class A hoạt động phụ thuộc vào một vài Class khác, thì thay vì khởi tạo các instance của các Class kia bên trong Class A, ta sẽ inject những instance đó vào thông qua constructor hay setter. Những instance của các Class mà Class A cần để hoạt động đó được gọi là dependency.

```
// Non Dependency Injection
Class A
{
    protected $classB;
    public function __construct()
    {
        $this->classB = new ClassB();
    }
}

// Dependency Injection
Class A
{
    protected $classB;
    public function __construct(ClassB $classB)
    {
        $this->classB = $classB;
    }
}
```

Laravel cung cấp cho chúng ta một công cụ cực mạnh tên là Service Container. Đó là nơi quản lý Class Dependency, tức xem một Class có những Class phụ thuộc nào. Ngoài ra nó cũng giúp chúng ta thực hiện Dependency Injection một cách hiệu quả thông qua class constructor. Service Container của Laravel có thể giúp bạn inject dependency vào rất nhiều loại Class, từ Controller, Event listeners, cho đến Queue Jobs, Middleware, Console Command ...

 **Repository Design Pattern** iện là một phương pháp làm việc với project Laravel rất phổ biến. Hiểu một cách đơn giản đó là bạn sẽ tạo ra một tầng Repository ở giữa Controller và Model (ORM Layer), với nhiệm vụ là thực hiện các business logic xử lý DB, từ đó tránh được việc viết Business Logic ở cả Controller lẫn Model, tạo ra những hàm có thể được sử dụng lại ở nhiều nơi khác nhau.
Với Repository Pattern, Controller sẽ không còn làm việc trực tiếp với Model nữa, nó cần xử lý liên quan đến DB, nó sẽ làm việc với Repository.

Các bạn có thể tìm hiểu thêm về Repository Design Pattern thông qua mốt số bài viết sau:

The Repository Design Pattern @ Viblo
Using Repository Pattern in Laravel 5
Ngoài ra bạn có thể implement Repository Pattern trong project Laravel của mình một cách dễ dàng với package Laravel 5 Repositories
```
class CategoryController extends BaseController
{
    private $categoryRepository;

    // Sử dụng Dependency Injection để inject instance của CategoryRepository
    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function show($id)
    {
        // Làm việc với DB thông qua Repository, không dùng Model nữa
        $category = $this->categoryRepository->find($id);
    }
}
```

**Facades**  Các bạn đã từng thấy và sử dụng rất nhiều các facades. Nó được khai báo trong mảng alias trong config/app.php. Mục đích của việc này giúp ta có thể sử dụng trong project của mình dưới cái tên ngắn gọn, thay vì phải viết đầy đủ namespace của chúng.
![](https://images.viblo.asia/d22ba542-da14-4d26-b251-228e405456a9.png)

**Service Provider** Là nơi khai báo cho việc binding các Service Container. Các Service Provider được khai báo tại config/App.php Trong Service Provider gồm có 2 function register và boot. 

Register: Nơi đăng ký các service container
```
     /**
     * Register the upload manager.
     *
     * @return void
     */
    protected function register()
    {
        $this->app->singleton('upload', function ($app) {
            return tap(new UploadManager($app), function ($manager) {
                $this->registerHandlers($manager);
            });
        });
    }
```

boot: Nơi cho phép truy cập đến các services đã được đăng ký trong register
```
     /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->make('upload')->cycle(function ($event) {
            $this->callListeners($event);
        });
    }
```


### Tổng Kết 
**Design Pattern** có thể cực kỳ hữu ích nếu được sử dụng trong các tình huống phù hợp và đúng lý do. Khi được sử dụng một cách chiến lược, chúng có thể làm cho một lập trình viên hiệu quả hơn đáng kể bằng cách cho phép họ tránh phát minh lại bánh xe tục ngữ, thay vào đó sử dụng các phương pháp đã được những người khác tinh chỉnh. Họ cũng cung cấp một ngôn ngữ chung hữu ích để khái niệm hóa các vấn đề và giải pháp lặp đi lặp lại khi thảo luận với những người khác hoặc quản lý mã trong các nhóm lớn hơn. Các bạn hãy cân nhắc thật kỹ trước khi sử dụng nó nhé.