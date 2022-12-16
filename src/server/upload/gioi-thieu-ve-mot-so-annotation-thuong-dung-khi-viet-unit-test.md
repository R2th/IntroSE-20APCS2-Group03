# Annotation
Khi viết unit test có một điều rất hay mình muốn giới thiệu đến các bạn đó là `@annotation arguments`. Vậy Annotation là gì?

Hiểu đơn giản thì nó là một tag argument được định nghĩa ở trong phần document comment của function. Mỗi annotation sẽ có một nhiệm vụ nhất định, chúng được thực thi thông qua method `getDocComment()` của class Reflection. 

`@annotation argument` phải được định nghĩa trong doc comment có format như sau
```
    /**
     * @annotation
     */
```
Mọi `@annotation` được đặt trong comment có format khác đều bị bỏ qua.
# Một số `@annotation` thường dùng
## `@test`
Như chúng ta đã biết thì khi tạo một function test bất kỳ đều phải có tiền tố `test`. Điều này định nghĩa đây là một function test. 
```
    public function test_index()
    {
        // do test
    }
```
Tuy nhiên với `@test` annotation thì ta có thể  bỏ tiền tố test đi ngắn gọn như sau
```
    /**
     * @test
     * /
    public function index()
    {
        // do test
    }
```
## `@testWith`
Cùng một function test nhưng chúng ta muốn test với nhiều tập dữ liệu để clear hơn, độ chính xác test cao hơn, chúng ta có thể dùng `@testWith` để định nghĩa những tập dữ liệu này
```
    /**
     * @param string    $input
     * @param int       $expectedLength
     *
     * @test
     * @testWith        ["test", 4]
     *                  ["string", 6]
     */
    public function string_length(string $input, int $expectedLength)
    {
        $this->assertEquals($expectedLength, strlen($input));
    }
```
> Note: Đối với dữ liệu kiểu string, dữ liệu chỉ có thể được chấp nhận khi đặt trong cặp nháy kép `""`
>
## `@dataProvider`
Cũng có chung một ý nghĩa tương tự như `@testWith` đó là `@dataProvider`. Tuy nhiên nó khác một chút so với `@testWith` là `@testWith` sẽ định nghĩa dữ liệu test ngay phần comment, còn `@dataProvider` sẽ định nghĩa dữ liệu test trong một public function.
```
    public function dataStringProvider()
    {
        return [
            ['test', 4],
            ['string', 6],
        ];
    }
    
    /**
     * @param string    $input
     * @param int       $expectedLength
     *
     * @test
     * @dataProvider    dataStringProvider
     */
    public function string_length(string $input, int $expectedLength)
    {
        $this->assertEquals($expectedLength, strlen($input));
    }
```
## `@after`
`@after` định nghĩa một function sẽ được call sau khi thực thi mỗi function test
```
    /**
     * @after
     */
    public function truncateTable()
    {
        return DB::update('TRUNCATE users;');
    }
```
## `@before`
Nếu như sử dụng `@after` để call function sau khi test, vậy để call function trước khi thực thi mỗi function test ta có `@before`.
```
    protected $users;
    
    /**
     * @before
     */
    public function initData()
    {
        $data = [
            'username' => 'Test name',
            'password' => '123456',
        ];
        $this->users = factory(User::class, 3)->create($data);
    }
```
## `@expectedException`
Khi test với mỗi function trường hợp throw exception. Ta dùng `@expectedException` để assert exception
```
class UserRepository {
    /**
     * @param array $data
     * /
    public function create($data)
    {
        return User::create($data);
    }
}

class UserRepositoryTest {
    /**
     * @test
     * /
    public function create()
    {
        UserRepository::create('string');
    }
}
```
Khi thực thi function test ta sẽ thấy màn hình output ra lỗi sau
```
There was 1 failure:

1) UserRepositoryTest::UserRepositoryTest
Expected exception TypeError

FAILURES!
Tests: 1, Assertions: 1, Failures: 1.
```
Khi test function create với trường hợp dữ liệu type bị sai và nó sẽ throw ra 1 exception. Với `@expectedException` nó sẽ bắt exception và assert exception.
```
    /**
     * @test
     * @expectedException TypeError
     * /
    public function create()
    {
        UserRepository::create('string');
    }
```
output khi test
```
OK (1 test, 1 assertion)
```
Tùy trường hợp test throw ra exception mà ta muốn, sẽ trả ra 1 instance exception riêng. Trường hợp trên đó là instance TypeError.
Tương tự với `@expectedException` ta có:

* `@expectedExceptionCode` để bắt và assert exception code
   
* `@expectedExceptionMessage` để bắt và assert exception message
# Lời kết
Trên đây là một số annotation thường dùng khi viết unit test mà mình muốn giới thiệu, còn có nhiều annotation nữa nếu mọi người có thể tham khảo [tại đây](https://phpunit.readthedocs.io/en/7.3/annotations.html) .