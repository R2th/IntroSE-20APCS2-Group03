Hế lồ anh em, lại là mình đây, tình hình là do dự án cũ cũng sắp xong rồi,  chuẩn bị sang dự án mới .

Đợt này , do yêu cầu dự án cần viết unit test và cụ thể là unit test cho Controller nên mình quyết định tìm hiểu chút về test và thế là điều gì đến cũng phải đến -> bài viết này ra đời :sunglasses::sunglasses::sunglasses:

Trong bài viết này, mình sẽ sử dụng ít lí thuyết thôi, chủ yếu là ví dụ về các trường hợp mình đã gặp và tặng  cho anh em chút bí thuật để sử dụng khi gặp các trường hợp viết test.

# Ý tưởng trước khi vô bí thuật :
Ở đây , để chuẩn bị cho anh em những gì mình sắp làm thì mình đang có những thứ như sau : User , Post và Role. User và Post là quan hệ One To Many, User và Role là Many To Many , đơn giản vậy thôi. 
Nghe nhìn thì có vẻ lằng nhằng nhưng mục đích của mình ở đây là chia sẻ về các trường hợp tương tự mình đã gặp phải và cách giải quyết của mình nên mình tạo ra 3 Models như vậy :laughing::laughing::laughing:
```php
<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $guarded = ['id'];

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}

```

```php
<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

     public function roles()
    {
        return $this->belongsToMany(Role::class,'users_roles','user_id','role_id);
    }
}
```

```php
<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $guarded = ['id'];

    public function users()
    {
        return $this->belongsToMany(User::class,'users_roles','role_id','user_id);
    }
}
```

# Chuẩn bị nào :
Okkkk , trước khi bắt đầu thì chúng ta cần phải tạo file test mới bằng lệnh sau :
```cpp
php artisan make:test PostControllerTest //Chạy lệnh này sẽ tạo ra một file test tại thư mục Feature.

php artisan make:test PostControllerTest --unit //Chạy lệnh này sẽ tạo ra một file test tại thư mục Unit.
```
Nhưng ở đây , ví dụ trong dự án, mình cần test nhiều phần , mà cụ thể ở đây mình muốn test Controller đúng không, mình gợi ý anh em nên để thư mục cho nó rõ ràng :
```cpp
php artisan make:test Http/Controllers/PostControllerTest --unit
```
Sau khi chạy lệnh xong, thì tại **app/tests/Unit/Http/Controllers** của anh em đã tạo ra một file **PostControllerTest.php** rồi đấy. Bắt đầu vào việc thôi nhờ :sunglasses:

# Unit Test Controller :
File PostController của mình như sau :
```php
namespace App\Http\Controllers;

use ...;

class PostController extends Controller
{
    protected $postRepository;

    protected $roleRepository;

    protected $userRepository;

    public function __construct(
        PostRepositoryInterface $postRepository,
        RoleRepositoryInterface $roleRepository,
        UserRepositoryInterface $userRepository
    ) {
        $this->postRepository = $postRepository;
        $this->roleRepository = $roleRepository;
        $this->userRepository = $userRepository;
    }

   public function show(Post $post)
    {
        $this->authorize('view', $post);

        $userCurrent = Auth::user();
        $postData = $this->postRepository->listUserWithoutCurrentLogged($post->id);
        $listUserId = $post->users()->pluck('user_id')->toArray();
        $users = $this->userRepository->all();
        $role = $this->roleRepository->findByRole('id', '<>', Role::ADMIN)->get();
        $roleIdUserWithPost = $userCurrent->roles()->pluck('role_id')->first();
        return response()->json([
            'post' => $postData,
            'users'=> $users,
            'role' => $role,
            'roleUserWithPost' => $roleIdUserWithPost,
        ]);
    }  
}
```
Okkkk, tàm tạm vậy đi. Mình thấy đa số các bài viết đều hướng dẫn sơ qua và nói nhiều về định nghĩa nên như mình đã nói từ đầu, mình sẽ chia sẻ trường hợp tương tự mà mình đã gặp để anh em nào chưa biết viết test có thể tham khảo và từ đó tự viết file test của chính mình. 

Tiếp tục nào sau khi tạo ra file test thì file test của anh em sẽ trông như sau : 

```php
<?php

namespace Tests\Unit\Http\Controllers;

use Tests\TestCase;

class PostControllerTest extends TestCase
{
// Mạnh dạn xóa hết phần này đi nhé =))
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->assertTrue(true);
    }
}
```
Khi viết test mà function đó có inject các class, interface khác. Trong trường hợp đó anh em cần phải giả lập đối tượng đó, chính vì vậy mà chúng ta cần phải  **Mock dữ liệu** . Nếu anh em muốn tìm hiểu thêm về Mockery thì có thể tham khảo [tại đây.](http://docs.mockery.io/en/latest/)

 Một method có các thành phần: name, paramater và return value, tương tự với các thành phần trên thì Mockery sẽ sử dụng để giả lập method đó như sau :
*  **shouldReceive** .
*  **once** .
*  **andReturn** .
*  **with**.

Để setup cho construct, anh em cần sử dụng đến **setUp()**, sẽ chạy trước mỗi method test. Cơ bản thì mình sẽ làm như sau, anh em chịu khó kéo lên trên xem Controller để hiểu nhé :

P/s : Trong từng phần mình sẽ comment để anh em dễ theo dõi hơn.
```php
use Mockery as m;

protected function setUp(): void
    {
        $this->afterApplicationCreated(function () 
            $this->posttRepositoryMock = m::mock(ProjectRepositoryInterface::class)->makePartial();
            $this->roleRepositoryMock = m::mock(RoleRepositoryInterface::class)->makePartial();
            $this->userRepositoryMock = m::mock(UserRepositoryInterface::class)->makePartial();
            $this->postController = new PostController(
                $this->app->instance(PostRepositoryInterface::class, $this->postRepositoryMock),
                $this->app->instance(RoleRepositoryInterface::class, $this->roleRepositoryMock),
                $this->app->instance(UserRepositoryInterface::class, $this->userRepositoryMock)
            );

            // Ở đây mình đang Mock một ông user có quyền là Admin để pass qua policy này "$this->authorize('view', $post);"
            $collection = m::mock(Collection::class)->makePartial();
            $user = m::mock(User::class)->makePartial();
            $user->shouldReceive('getAttribute')->with('id')->andReturn(1);
            $user->shouldReceive('getAttribute')->with('name')->andReturn('Wibu');
            $this->actingAs($user);
        });
        parent::setUp();
    }

```

 Thử test cho function show nhé  :) , anh em nên đặt tên vậy nhé, cũng không biết tại sao nhưng mình thấy mấy ông anh hay viết vậy :)

```php
  public function test_it_can_show()
 {
       // muốn pass qua câu đầu này "$postData = $this->postRepository->listUserWithoutCurrentLogged($post->id);" ,
       anh em cần phải xem function mình viết return lại gì, ở đây mình trả về một list projects nên cần phải Mock.

       $postMock = m::mock(Post::class)->makePartial();
       $postMock->shouldReceive('getAttribute')->with('id')->andReturn(1);
       $this->shouldReceive('postRepository')->once()->andReturn($postMock);

        $listUserId = $post->users()->pluck('user_id')->toArray();
        // Ở đây anh em thấy Post của mình đang thuộc về một user đúng không, vậy bắt buộc mình lại Mock một relationship
        $belongsTo = m::mock(BelongsTo::class)->makePartial();
        $postMock->shouldReceive('users')->once()->andReturn($belongsTo);
        $objectReturn = m::mock(\stdClass::class)->makePartial();
        $belongsTo->shouldReceive('pluck')->once()->andReturn($objectReturn);
        $objectReturn->shouldReceive('toArray')->andReturn([]);

        // Tương tự với những dòng dưới, anh em thử practice xem như thế nào nhé =))
        $users = $this->userRepository->all();
        $role = $this->roleRepository->findByRole('id', '<>', Role::ADMIN)->get();
        $roleIdUserWithPost = $userCurrent->roles()->pluck('role_id')->first();

        //và cuối cùng để gọi đến function mình đang test 
        $res = $this->postController->show($postMock);
        $this->assertInstanceOf(JsonResponse::class, $res);
 }

 ```
Bảo anh em practice mà lại quên không đưa command chạy , thế là không được rồi, sau khi viết xong , anh em có thể chạy câu lệnh sau:
```shell
vendor/bin/phpunit --filter=test_it_can_show //với filte để chạy function mình đang test
```
Để chạy được câu lệnh, anh em cần setup PHPUnit nhé, có thể tham khảo [tại đây](https://viblo.asia/p/co-ban-ve-unittest-trong-laravel-gDVK29Mj5Lj).

Và nếu Success thì như thế này nhé: 
![](https://images.viblo.asia/7c3d99ac-42d2-4e85-a660-ac6ead316cc7.png)

#  Tổng hợp :
Tại đây thì mình sẽ tổng hợp lại cho anh em như sau :
```php
$mock->shouldReceive('name')
    ->with(paramater)
    ->andReurn($returnValue)
```
Nếu method có nhiều argument thì ta làm như sau :
```php
$mock->shouldReceive('name')
    ->with($arg1, $arg2)
    ->andReurn($returnValue)
```
Function không có return về kết quả ngon lành mà lại bắn ra một ngoại lệ thì hãy mock như sau:
```php
$mock->shouldReceive('name')
    ->with($arg1, $arg2)
    ->andThrow(new Exception());
```
Thêm nữa này trong project mình làm có trường hợp như sau, ví dụ nhé :

Khi gặp relationship như $user->posts thì mình lại phải làm như sau :

```php
$belongsTo = m::mock(BelongsTo::class)->makePartial();
$userMock->shouldReceive('getAttribute')->with('posts')->andReturn($belongsTo);
```

Có người lại viết $user->posts() , thi mình lại viết :
```php
$belongsTo = m::mock(BelongsTo::class)->makePartial();
$userMock->shouldReceive('posts')->once()->andReturn($belongsTo);
```
# Kết thúc :
Chà chà, mình thấy bài viết cũng khá dài rồi đấy :laughing::laughing::laughing:

Trên đây là một phần những gì mình học được sau khi tham gia viết test. Hi vọng là có thể giúp ích cho anh em mới tiếp xúc với Laravel hoặc có hứng thú cũng như quan tâm đến việc viết test cho code của mình.  Mong là bí thuật này sẽ được anh em chia sẻ nhiều hơn nữa, để mình có động lực chia sẻ thêm nhiều bài viết hơn nữa nhé. Cảm ơn mọi người đã quan tâm :100::100::100::100::100:

Shinobi