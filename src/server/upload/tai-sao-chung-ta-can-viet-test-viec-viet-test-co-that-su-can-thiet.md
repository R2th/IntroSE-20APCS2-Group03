# 1. Mở đầu
Có lẽ các bạn không còn quá lạ lẫm với việc test code nữa. Trước đây mình nghĩ test là công việc của bên QA, và nghĩ đơn giản code mình chạy lên sau đó họ tìm một số ngoại lệ, hoặc một số chức năng chạy sai với dự tính ban đầu đó gọi là test. Nhưng khi đi làm rồi mình mới biết sau mỗi dòng code của bạn viết ra nó phải đảm bảo một số tính chất, và sẽ phải đảm bảo một số một số yêu cầu khắt khe bắt buộc, nếu bạn không muốn vào một ngày đẹp trời nó lăn ra chết và bạn tìm mỏi mắt không biết tại sao. Hay phát triển một tính năng code cũ và không hiểu tại sao nó báo bugs. Để khắc phục tình trạng này laravel đã cung cấp cho chúng ta có 2 loại Testing là UnitTest và FeatureTest. Bài viết này mình sẽ tập trung vào những khái niệm và công việc đơn giản nhất mà UnitTest thực hiện.
# 2. UnitTest là gì
**PHPUnit** là gì: Các bạn có thể hiểu đơn giản php unit sẽ đi soát từng dòng code của các bạn, từng phần gọi repositories ... để kiểm tra chắc chắn những gì mà bạn đang thực hiện. Nó hỗ trợ phần lớn những PHP framework bao gồm Laravel.

Ngoài việc kiểm thử chất lượng code, theo mình thấy nó còn rất tuyệt vời để các bạn kiểm soát được những gì mình đã viết, ví dụ như kiểu dữ liệu trả về, hay qua từng bước nó sẽ truy cập như thế nào và trả về những cái gì. Nó sẽ giúp bạn đào sâu hơn về code tương đối nhiều :D
# 3. Cấu trúc thư mục test
![](https://images.viblo.asia/d6338357-5d1a-43c9-aac0-d28e37ed99aa.png)

trong đây các bạn sẽ thấy tương đối nhiều file nhưng các bạn chỉ cần quan tâm đến những phần chính:

**1:** **tests/Feature** chứa code sử dụng cho FeatureTest

**2:** **tests/Unit** chứa code sử dụng cho UnitTest

**3:** **TestCase**: là 1 bootstrap file để thiết lập môi trường Laravel cho các tests

**4:** **phpunit.xml** là file cấu hình cho PHPUnit

# 4. Cú pháp để tạo một test
Để tạo 1 test, ta sử dụng câu lệnh:
```
// Tạo 1 test trong thư mục Feature
    php artisan make:test UserTest
// Tạo 1 test trong thư mục Unit
    php artisan make:test UserTest --unit
```
# 5. Một số ví dụ test
mình đang sử dụng packit, để hỗ trợ viết test
```php
use Tests\TestCase;
```
Để run đoạn test bạn vừa viết các bạn có thể chạy lệnh
```php
vendor/bin/phpunit --filter=test_it_can_show //với filte để chạy function mình đang test
```
**Các bạn để ý đến dòng**:
```php
$response = $this->controllerMock->index($request);
```
Nó sẽ trỏ đến chính xác hàm mà các bạn đang thực thi test. Nếu không có phần này các bạn sẽ không thể test được đúng phần mình cần :D.

Với một controller bình thường các bạn sẽ thấy có phần construct vậy làm sao để test đoạn này:
```php
protected $mediaRepository;

public function __construct(MediaRepositoryIf $mediaRepository)
{
        $this->mediaRepository = $mediaRepository;
}
```
với đoạn code trên mình sẽ viết test như sau:
```php
protected $mediaRepositoryTest;
protected $controllerMock;
public function setUp(): void
{
        $this->afterApplicationCreated(function () {
            $this->mediaRepositoryTest = Mockery::mock(MediaRepositoryIf::class);
            $this->controllerMock = new UploadMediaController($this->mediaRepositoryTest);
        });
        parent::setUp();
}
```
các bạn có thể hiểu đơn giản ở `$this->afterApplicationCreated` đang gọi controller và setup các biến toàn cục hoặc, khởi tạo một số biến mà các bạn thấy lặp đi lặp lại

Ví dụ: vì mình check quyền policies, middleware vì vậy mỗi lần muốn truy cập vào một controller mình sẽ cần phải đăng nhập. thay vì với mỗi một function test mình là phải gõ lại đoạn đăng nhập thì mình có thể viết thẳng trên `$this->afterApplicationCreated` một lần và sử dụng luôn được như sau.
```php
$user = new User;
$user->id = 1;
$user->role = 'admin';
$this->actingAs($user);
```
Mình nghĩ thường với các controller bình thường các bạn chắc hẳn sẽ có các request đầu vào, vậy làm sao để test các request này:
```php
$request = new Request();
$request->headers->set('content-type', 'application/json');
```
trong trường hợp bạn có thêm các param truyền vào thì có thể thêm đoạn sau:
```php
$request->initialize([
            'user_id' => 1,
            'role_id' => 1,
        ]);
```
Ok giời đến một đoạn test controller bình thường:
```php
public function index(Request $request)
{
        $user = $request->user();
        $media = $user->media()->get();

        return response()->json([
            'data' => $media,
        ]);
}
```
với đoạn code đơn giản ở phái trên mình sẽ có đoạn test sau:
```php
use Mockery;
public function test_it_can_index_upload_media()
    {
        $request = new Request();
        $request->headers->set('content-type', 'application/json');
        $hasManyMock = Mockery::mock(HasMany::class);
        $userMock = Mockery::mock(User::class)->makePartial();
        $request->setUserResolver(function () use ($userMock) {
            return $userMock;
        });

        $userMock->shouldReceive('media')->andReturn($hasManyMock);
        $hasManyMock->shouldReceive('get')->andReturn(response()->json([], 200));

        $response = $this->controllerMock->index($request);
        $this->assertInstanceOf(JsonResponse::class, $response);
    }
```
Bây giời mình sẽ giải thích để các bạn có thể hiểu đoạn code trên đang chạy như thế nào:

với đoạn:
```php
$user = $request->user();
```
có nghĩa là request của bạn đã đăng nhập và chưa thông tin của user. Để test đoạn trên mình có đoạn code sau:
```php
$request->setUserResolver(function () use ($userMock) {
            return $userMock;
        });
```
tiếp theo mình có đoạn
```php
$user->media()->get()
```
vậy `$user->media()` này sẽ trả về quan hệ relationships của **Models User** với **Models Media**, của mình là **hasMany** lên mình sẽ có đoạn test:
```php
$hasManyMock = Mockery::mock(HasMany::class);
$userMock->shouldReceive('media')->andReturn($hasManyMock);
```
sau đó `->get()` thì nó sẽ trả về một list trong bảng media thỏa mãn điều kiện, vì vậy mình sẽ trả về một mảng data. Nhưng các bạn có thể thấy code của chúng ta đang mong muốn trả về
```php
response()->json([
            'data' => $media,
        ]);
```
vì vậy mình có đoạn test:
```php
$hasManyMock->shouldReceive('get')->andReturn(response()->json([], 200));
```
Câu cuối:
```php
$this->assertInstanceOf(JsonResponse::class, $response);
```
ám chỉ bạn đang check xem kiểu dữ liệu trả về có đúng với dữ liệu bạn cần test hay không.
# 6. Làm thế nào để các bạn biết UnitTest của mình đạt yêu cầu
Chúng ta viết unittest đạt yêu cầu khi đủ ba yếu tố sau:
* Arrange: thiết lập trạng thái, khởi tạo Object, giả lập mock
* Act: Chạy unit đang cần test 
* Assert: So sánh expected với kết quả trả về.
# 7. Kết Luận
Đọc tới đây chắc các bạn cũng đã hình dung được unit test và một số hàm cơ bản trong unit test là gì cũng như cách sử dụng đúng không ạ. Cảm ơn bạn đã đọc bài viết của mình, nếu các bạn có thắc mắc, hay có phần nào chưa hiểu các bạn có thể bình luận dưới phần comment để chúng ta cùng tìm hiểu dõ hơn nhé. Và đặc biệt đừng quên cho mình một like và một share nhé :D!