Xin chào các bạn,

Tiếp tục với series về Testing TDD. Ở phần trước mình có giới thiệu qua về TDD, mục đích sử dụng và benefits cho project cũng như dự án thực tế.
Bài viết này là phần 2 trong *[Testing TDD trong Laravel](https://viblo.asia/p/testing-tdd-trong-laravel-p1-introduction-testing-and-tdd-RQqKLYqMZ7z)*, mình sẽ chia sẻ cách implement TDD sử dụng *[Laravel Framework](https://laravel.com/)* và *[phpunit](https://phpunit.de)*.

# So What's TDD?


-----


Trước khi bắt đầu thì mình muốn recap ngắn gọn lại TDD để cho các bạn có một cái nhìn khái quát nhất. 

Vậy TDD là gì ?

*"TDD (Testing Driven Development) là một phương pháp tiếp cận sử dụng cho việc Testing, lập trình viên sẽ viết test trước khi code...
Sau đó chạy test, tất nhiên lần đầu tiên test đó sẽ fail. Sau đó refactor lại code sao đó test đó pass."*

# Start

-----
## Example

Để implement TDD cho Laravel, mình đưa ra một ví dụ đơn giản về Forum,

Mình có 3 table `users`, `threads` và `channels`. Dựa trên 3 table này, mình sẽ đi viết một số các `Unit Test` và `Feature Test` như: check validation, relationships giữa các table, authentication, create, delete, etc, ...

## Setup Migrations, ModelFactory
### Migrations
`users` table:
```
Schema::create('users', function (Blueprint $table) {
    $table->increments('id');
    $table->string('name');
    $table->string('email')->unique();
    $table->string('password');
    $table->rememberToken();
    $table->timestamps();
});
```

`threads` table:
```
Schema::create('threads', function (Blueprint $table) {
    $table->increments('id');
    $table->unsignedInteger('user_id');
    $table->unsignedInteger('channel_id');
    $table->string('title');
    $table->text('body');
    $table->timestamps();
});
```

`channels` table:
```
Schema::create('channels', function (Blueprint $table) {
    $table->increments('id');
    $table->string('name', 50);
    $table->string('slug', 50);
    $table->timestamps();
    });
```

Mối quan hệ (relationships) của 3 table trên:

`User` - `Thread`: One - Many (Một user có thể có nhiều thread).

`Channel` - `Thread`: One - Many (Một channel có thể có nhiều thread).


### ModelFactory
```
<?php

use Faker\Generator as Faker;
/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Thread::class, function (Faker $faker) {
    return [
        'user_id' => function () {
            return factory(\App\User::class)->create()->id;
        },
        'channel_id' => function () {
            return factory(\App\Channel::class)->create()->id;
        },
        'title' => $faker->sentence,
        'body' => $faker->paragraph,
    ];
});

$factory->define(App\Channel::class, function (Faker $faker) {
    return [
        'name' => $faker->word,
        'slug' => $faker->word,
    ];
});

```

`ModelFactory` này sẽ được dùng để khởi tạo dữ liệu mẫu trong các test case, mình sẽ đề cập ở phần dưới.


## Implementation
Sau khi setup xong `Migrations` và `ModelFactory`, mình sẽ đi vào chi tiết từng test case. Mình chia làm 2 loại test case, `Unit Test` và `Feature Test`.

-----
### Unit Test
Đối với `Unit Test`, loại test case này tập trung test những vấn đề basic nhất như: kiểm tra các trường (field) trong table có tồn tại trong bảng hay không, kiểm tra mối quan hệ của các bảng, ...


`tests/Unit/ThreadTest.php`
```
<?php

namespace Tests\Unit;
use App\Thread;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Collection;
use Tests\TestCase;

class ThreadTest extends TestCase
{
    use RefreshDatabase;

    protected $thread;

    public function setUp()
    {
        parent::setUp();
        $this->thread = factory(Thread::class)->create();
    }


    /** @test */
    public function a_thread_has_creator()
    {
        $this->assertInstanceOf(User::class, $this->thread->creator);
    }


    /** @test */
    public function a_thread_belongs_to_a_channel()
    {
        $thread = create(Thread::class);
        $this->assertInstanceOf('App\Channel', $thread->channel);
    }
}
```


Thay vì mỗi Test Case, chúng ta phải khởi tạo 1 object thread sau đó sử dụng thì với
Function `setUp()`, mình khởi tạo 1 object thread để tất cả các Test Case trong class `ThreadTest` đều có thể sử dụng chung.


`factory(Thread::class)->create();` 

Hàm này sẽ gọi Thread ModelFactory mà mình đã nói ở trên để thực hiện việc khởi tạo Thread.


Ở đây mình có 2 test case. 

Check thread thuộc về một tác giả và thuộc về một channel, kiểm tra xem thằng Thread có phải thuộc về một tác giả nào đó hay không bằng cách sử dụng `assertInstanceOf` (hàm này trong phpunit, các bạn có thể tìm hiểu thêm trong docs phpunit)

(Ví dụ: thread "Testing TDD Laravel" của anh Nguyen Van A, "TDD in Laravel" thuộc channel về Testing)

Oke done, vậy là xong phần viết test, tiếp theo là chạy test sử dụng command:
```
phpunit
```

Lúc này log sẽ show error đối với test case 1 và 2 lần lượt như sau:
```
Failed asserting that null is an instance of class "App\User".
Failed asserting that null is an instance of class "App\Channel".
```

Test case đầu tiên bao giờ cũng sẽ fail, bởi vì chúng ta mới chỉ khởi tạo table chứ chưa khởi tạo các mối quan hệ của chúng.

Bước tiếp theo là thiết tập mỗi quan hệ (relationships) giữa các table và làm sao cho 2 test case trên passed :D.


`Thread.php`
```
/**
* Threads belongs to a user/creator.
*
* @return BelongsTo
*/
public function creator()
{
    return $this->belongsTo(User::class, 'user_id');
}


/**
* Threads can belongs to a channel.
*
* @return BelongsTo
*/
public function channel()
{
    return $this->belongsTo(Channel::class);
}
```


Sau khi khởi tạo các mỗi quan hệ, chúng ta chạy lại lệnh `phpunit` => All tests passed , we done :D



### Feature Test

Đối với `Feature Test`, loại test case này thực hiện những bài kiểm tra có độ phức tạp hơn `Unit Test`.
Thường để kiểm tra một tính năng cụ thể như: check validation, kiểm tra xem thread được tác giả tạo thành công hay không, login register có thành công hay không, permission của user , etc,...

-----

Ví dụ về check user có thể tạo thread nếu như đã login.


`tests/Feature/CreateThreadTest.php`
```
<?php

namespace Tests\Feature;

use App\Activity;
use App\Channel;
use App\Reply;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Thread;

class CreateThreadsTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function an_authenticated_user_can_create_a_thread()
    {
        // Login
        $this->signIn();

        // create a new thread
        $thread = make(Thread::class);

        // sent request to server
        $response = $this->post('/threads', $thread->toArray());

        // assert see in database
        $this->get($response->headers->get('Location'))
        ->assertSee($thread->title)
        ->assertSee($thread->body);
    }
}
```

Sau khi chạy `phpunit` sẽ fail, vì chúng ta chưa có function `signIn()`, chưa khởi tạo `routes` cũng như chưa viết login tạo thread.

Ok, từng bước một, đầu tiên khởi tạo hàm `signIn()`.


`tests/TestCase.php`
```
<?php

namespace Tests;

use App\User;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected function signIn($user = null)
    {
        $user = $user ? : create(User::class);

        $this->actingAs($user);

        return $this;
    }
}
```

Khởi tạo hàm `signIn()` ở đây để mọi Feature Test case có thể sử dụng hàm này, chúng ta có thể thấy class `CreateThreadsTest` đã gọi `$this->signIn();` chính là gọi thằng `signIn()` này.


Tiếp theo là khởi tạo route.


`routes/web.php`
```
<?php

Route::get('/', function () {
return view('welcome');
});
Auth::routes();
Route::post('/threads', 'ThreadsController@store');
```

Tạo logic khởi tạo thread, validation
`ThreadsContoller.php`
```
<?php

namespace App\Http\Controllers;

use App\Filters\ThreadFilters;
use App\Inspections\Spam;
use App\Thread;
use App\Channel;
use Carbon\Carbon;
use Illuminate\Contracts\View\Factory;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\View\View;

class ThreadsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except(['index', 'show']);
    }

    /**
    * Store a newly created resource in storage.
    *
    * @param Request $request
    * @param Spam $spam
    * @return Response
    * @throws \Exception
    */
    public function store(Request $request, Spam $spam)
    {
        $this->validate($request, [
            'title' => 'required',
            'body' => 'required',
            'channel_id' => 'required|exists:channels,id',
        ]);

        $spam->detect(request('body'));

        $thread = Thread::create([
            'user_id' => auth()->id(),
            'channel_id' => request('channel_id'),
            'title' => request('title'),
            'body' => request('body'),
        ]);

        return redirect($thread->path())
    }
}
```

Vậy là đã đầy đủ tính các hàm tính toán của test case. Mình chạy test bằng `phpunit` => All tests passed. :)

Ngoài ra mình có viết thêm một số test case, flow tương tự như trên:

`tests/Feature/CreateThreadTest.php`
```
// validation field 
/** @test */
public function a_thread_require_a_title()
{
    $this->publishThread(['title' => null])
    ->assertSessionHasErrors('title');
}

/** @test */
public function a_thead_require_body()
{
    $this->publishThread(['body' => null])
    ->assertSessionHasErrors('body');
}


/** @test */

public function a_thread_require_a_valid_channel()
{
    $channels = factory(Channel::class, 2)->create();
    $this->publishThread(['channel_id' => null])
    ->assertSessionHasErrors('channel_id');
    $this->publishThread(['channel_id' => 90])
    ->assertSessionHasErrors('channel_id');
}


// Create new thread function
public function publishThread($overrides = [])
{
    $this->signIn();
    $thread = make(Thread::class, $overrides);
    return $this->post('/threads', $thread->toArray());
}
```

# Conclusion


-----
Vậy là mình đã giới thiệu qua về cách implement TDD cho Laravel Framework sử dụng phpunit.

Bài viết mình đã lược bỏ đi một số phần dài dòng, chỉ để lại những step chính, các bạn cũng có thể lại tất cả các test case thông qua [repo](https://github.com/phuongthuan/forum) này của mình:

Nếu như có bất kì thắc mắc nào các bạn vui lòng cho mình comment bên dưới. 

Cảm ơn các bạn đã đọc bài!


-----



*"Happy Coding!"*