Cách đây 4 tháng, mình được phân task viết Unit test cho dự án, đây cũng là khoảng thời gian đầu mình được tiếp xúc với PHPUnit. Trong lúc viết test gặp rất nhiều vấn đề gây khó khăn cho việc viết test, bài này mình xin chia sẻ lại một trong những vấn đề mình gặp phải nhé.

Dự án của mình là dự án Digmee, vì không thể chia sẻ code ra ngoài nên mình sẽ dùng những ví dụ cơ bản nhất để miêu tả.

> Một trong những vấn đề mình gặp phải và mất rất nhiều thời gian dành cho nó, đó là: Làm thế nào để test được một hàm là tham số của một hàm khác?

Mình có tìm hiểu và đó được gọi là Anonymous functions, vậy...

# Anonymous functions là gì?
Trong PHP có một khái niệm được dùng khá nhiều đặc biệt là với các Framework hiện đại như Laravel đó là hàm là tham số của một hàm khác hay còn gọi là [Anonymous functions](https://www.php.net/manual/en/functions.anonymous.php) cũng thường được biết đến với cái tên Closure.

Ví dụ:
```
Route::get('welcome', function() {
    return 'Welcome';
});
```

Hàm get ở trên có 2 tham số, tham số thứ nhất là 1 string còn tham số thứ 2 là một anonymous functions. Vấn đề đặt ra là làm sao để test được cái anonymous functions đó?

Để có thể test được, ta sẽ dùng: ...

# Mockery
Ta sẽ dùng ví dụ này:
```
class PostRepository
{
    public function getPostsByUser(int $userId)
    {

    }
}

class PostService
{
    private $postRepository;

    public function __construct(PostRepository $postRepository) {
        $this->postRepository = $postRepository;
    }

    public function getPostsByUser(int $userId)
    {
        return $this->postRepository->getPostsByUser($userId);
    }
}
```

Bây giờ chúng ta sẽ test `PostService` theo kiểu `Unit test`, khác với `Integration test` phải gọi thực sự cái method của dependency (là PostRepository), phải kết nối database các kiểu hoặc phải chạy qua nhiều hàm của nhiều class. Unit test chỉ đơn giản là đảm bảo method của dependency được gọi và phải được gọi đúng.

Code test sẽ như sau:
```
class PostServiceTest extends TestCase
{
    /** @var PostRepository|MockInterface */
    private $postRepository;

    /** @var PostService */
    private $postService;

    protected function setUp()
    {
        parent::setUp();
        $this->postRepository = Mockery::mock(PostRepository::class);
        $this->postService = new PostService($this->postRepository);
    }

    public function testGetPostsByUser()
    {
        $posts = [
            'post 1',
            'post 2',
        ];
        $userId = 1;

        $this->postRepository->shouldReceive('getPostsByUser')
            ->with($userId)
            ->once()
            ->andReturn($posts);
        $this->assertEquals($posts, $this->postService->getPostsByUser($userId));
    }
}
```

Ở đây ta dùng [Mockery](http://docs.mockery.io/en/latest/) để giả lập một mocked object. Trong ví dụ trên nhờ Mockery mà ta mong muốn method `testGetPostsByUser` của class `PostService` đảm bảo được những điều sau:
* Phải gọi method `getPostsByUser` của `PostRepository`
* Phải gọi đúng chính xác 1 lần
* Phải gọi với chính xác 1 tham số là `$userId`
* Giả sử hàm của `PostRepository` trả về 1 cái abcxyz bất kì, thì hàm của `PostService` cũng phải trả về chính xác cái đó.

Sau này lỡ một người trong team vào thay đổi code hàm trong `PostService`, muốn truyền thêm 1 tham số khác, hoặc muốn gọi hàm đó 69 lần thay vì chỉ gọi một lần... thì mình mong chờ cái test đó phải bị failed để còn biết đường mà tính. Hoặc là tới (tat) cho một phát vì dám thay đổi behaviour của hàm hoặc là năn nỉ người ta lỡ làm con người ta có bầu thì phải đi mà chịu trách nhiệm giải quyết.

Vậy... Mockery kết hợp với Anonymous functions thì sẽ như thế nào?

# Mock anonymos function
Sửa code một tí, `PostService` sẽ dùng thêm cả `CacheService` để lấy dữ liệu post ra từ trong cache. Hàm `getFromCache` sẽ có 2 tham số, tham số thứ nhất là `cacheKey`, tham số thứ 2 là một `Anonymous functions` để lấy dữ liệu, nếu `cacheService` không tìm thấy dữ liệu bởi `cacheKey` thì sẽ gọi hàm này để lấy dữ liệu để lưu vào cache sau đó mới trả về.

Code mới sẽ là:
```
class PostService
{
    private $postRepository;

    /** @var CacheInterface */
    private $cacheService;

    public function __construct(PostRepository $postRepository) {
        $this->postRepository = $postRepository;
    }

    public function getPostsByUser(int $userId)
    {
        $cacheKey = 'user-posts-' . $userId;
        return $this->cacheService->getFromCache($cacheKey, function () use ($userId) {
            return $this->postRepository->getPostsByUser($userId);
        });
    }
}
```

Vấn đề của mình gặp phải trong dự án Digmee chính là đây, mình không biết làm sao để có thể test được cái gọi là Anonymous functions này...

Và mình tìm được Mockery có hỗ trợ cách để validate paramater với Mockery::on và tham số lại cũng là một anonymous functions.

Code test sẽ như thế này:
```
class PostServiceTest extends TestCase
{
    /** @var PostRepository|MockInterface */
    private $postRepository;

    /** @var CacheInterface|MockInterface */
    private $cacheService;

    /** @var PostService */
    private $postService;

    protected function setUp()
    {
        parent::setUp();
        $this->postRepository = Mockery::mock(PostRepository::class);
        $this->cacheService = Mockery::mock(CacheInterface::class);
        $this->postService = new PostService($this->postRepository);
    }

    public function testGetPostsByUser()
    {
        $posts = [
            'post 1',
            'post 2',
        ];
        $userId = 1;

        $this->postRepository->shouldReceive('getPostsByUser')
            ->with($userId)
            ->once()
            ->andReturn($posts);
        $this->cacheService->shouldReceive('getFromCache')
            ->with(
                'user-posts-' . $userId,
                Mockery::on(function ($closure) use ($posts){
                    return $closure() == $posts;
                })
            );
        $this->assertEquals($posts, $this->postService->getPostsByUser($userId));
    }
}
```

Ở đây ta đã mock `PostRepository@getPostsByUser` để trả về một dữ liệu sample của posts, và hàm này lại được gọi trong Anonymous functions của `CacheService`, nên ta sẽ verify bằng cách khi gọi Anonymous functions này thì kết quả sẽ bằng đúng cái dữ liệu post đã mock ở trên.

Mình tham khảo [Link](http://docs.mockery.io/en/latest/reference/argument_validation.html) này.

```
Mockery::on(function ($closure) use ($posts){
    return $closure() == $posts;
})
```

Và cuối cùng là assert dữ liệu trả về của `PostService@getPostsByUser` cũng trả về đúng kết quả như mình muốn.

```
$this->assertEquals($posts, $this->postService->getPostsByUser($userId));
```

# Xàm ngôn
Trên đây là kinh nghiệm thực tế của mình gặp phải khi viết test, và mình đã tìm rất nhiều để có thể giải quyết được nó ([ví dụ](https://stackoverflow.com/questions/19255171/phpunit-testing-with-closures)).

Còn rất nhiều vấn đề khác nữa nhưng mình hơi lười chia sẻ :sweat_smile:, mong các bạn giơ cao đánh khẽ (bow).

Cảm ơn bạn đã đọc !