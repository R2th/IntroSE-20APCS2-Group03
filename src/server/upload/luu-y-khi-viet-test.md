# Đôi điều về mock
**Mock object ?**

Mock object là một đối tượng giả nhưng mô phỏng, giả lập hành vi của một đối tượng thật.

**Khi nào cần phải mock dữ liệu**

Khi viết test mà function đó có inject các class, interface khác. Trong trường hợp đó bạn cần phải giả lập đối tượng đó.
Ví dụ
```php
namespace App;

use App\Friend;

class User
{
    protected $friend;

    public function __construct(Friend $friend)
    {
        $this->friend = $friend;
    }

    public function newFriend()
    {
        $isNewFriend = $this->friend->add();
        return $isNewFriend ? 'Nice!' : 'Bad mood';
    }
}
```
Như đã thấy, Friend là class được inject vào, nó chính là đối tượng cần mock khi viết test. Dưới đây mình có viết test để m.n xem và dễ hình dung hơn.
```
use Mockery as m;
use App\User;
use App\Friend;

class UserTest extends TestCase
{
    protected $user;
    
    protected $friend;

    public function setUp()
    {
        parent::setUp
        $this->friend = m::mock(Friend::class)->makePartial();
        $this->user = new User($this->friend);
    }

    public function test_new_friend()
    {
        $this->friend->shouldReceive('add')->andReturn(true);
        $result = $this->user->newFriend();
        $this->assertEquals($result, 'Nice!');
    }
}
```
> Mình đang viết test cho dự án sử dụng framework laravel và mình có dùng Mockery để mock dữ liệu. Nều ai muốn biết rõ hơn về Mockery có thể tham khảo [tại đây](http://docs.mockery.io/en/latest/)

# Hướng dẫn mock dữ liệu

Ở đây mình sử dụng Mockery để mock dữ liệu.
### Mock class

* Mock cả một class mà không chỉ định gì.

`$mock = \Mockery::mock('App\Friend')->makePartial();`

Đây là giả lập default mà mọi người hay dùng, tuy nhiên giả lập đối tượng này không cho phép class được giả lập truy cập sử dụng các method protected. Để giải quyết điều này ta cần dùng đến `shouldAllowMockingProtectedMethods()`.

```cpp
$mock = \Mockery::mock('App\Friend')
    ->shouldAllowMockingProtectedMethods()
    ->makePartial();
```
* Mock class và chỉ định method. Tức là đối tượng giả lập chỉ có thể giả lập hành vì `add()`
 
```ruby
$mock = \Mockery::mock('App\Friend[add]');
```
### Mock method
Một method có các thành phần
 - name
 - paramater
 - return value
 
Tương ứng với các thành phần trên mock (Mockery) sẽ giả lập method đó như sau
```erlang
$mock->shouldReceive('name')
    ->with(paramater)
    ->andReurn($returnValue)
```
Ở đây, nếu method có nhiều argument thì cú pháp mock như sau
```swift
$mock->shouldReceive('name')
    ->with($arg1, $arg2)
    ->andReurn($returnValue)
// or
$mock->shouldReceive('name')
    ->withArgs([$arg1, $arg2])
    ->andReurn($returnValue)
```
Nếu method không có paramater có thể bỏ đi không dùng `with()`.
Cũng có thể function không có return về kết quả ngon lành mà lại bắn ra một ngoại lệ thì hãy mock như sau:

```cpp
$mock->shouldReceive('name')
    ->with($arg1, $arg2)
    ->andThrow(new Exception());
```

Tùy trường hợp test, ví dụ có trường hợp bạn cần run test một method mock nhiều lần, bạn có thể chỉ định method đó được giả lập nhiều lần:

```perl
$mock->shouldReceive('name')
    ->with($arg1, $arg2)
    ->times($numberCall);
```

# Test function private/protected

Phần này không nằm trong phần mock, thực ra giới thiệu vào đây mình thấy nó chả liên quan, mà thấy nó cần thiết với hay quá nên giới thiệu luôn cho mọi người biết.

Khi viết test, mình gặp phải mấy function private/protected mà call kiểu gì cũng không được để test (đúng rồi, call bằng niềm tin, oop đã bảo vậy).

Tuy nhiên không call được thì chẳng lẽ bỏ ko test, cũng không được, sau một hồi google thì nhìn thấy ReflectionClass. Rồi tham khảo thấy có bạn đã viết test dùng ReflectionClass rồi nên làm theo, và cũng hiểu hiểu ra.
Ví dụ cũng class User ở trên có thêm function sau
 ```
 // class App\User
    private function getPassword('daibanggoichimcu')
    {
        return 'chimcungherogatgu';
    }
 ```
Việc viết test cho function trên được tiến hành như sau

```php
    public function test_get_password()
    {
        $class = new ReflectionClass('App\User');
        $method = $class->getMethod('getPassword');
        $method->setAccessible(true);
        $result = $method->invoke($this->user, 'daibanggoichimcu); // $this->user được khởi tạo ở phần setUp
        $this->assertEquals($result, 'chimcungherogatgu');
    }
```

**Chào ^.^:**
Đây là kiến thức mình thu lượm được khi viết test, có thể có chỗ mình dùng từ sai, hoặc đâu đó mình hiểu sai, m.n có phát hiện thì đừng có gạch đá hay down vote gì mình, hãy nhẹ nhàng hay mạnh mẽ comment ở dưới cũng được. Đội ơn bà con. Mai được đi du lịch rồi.