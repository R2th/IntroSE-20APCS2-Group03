## 1. Giới thiệu UnitTest
* Cùng với việc viết code thì việc đảm bảo để những dòng code viết ra chạy đúng cũng rất quan trọng. Rất may mắn, Laravel đã cung cấp cho chúng ta các công cụ để việc testing trở nên rất thuận tiện. Trong Laravel có hai loại test là FeatureTest và UnitTest, trong bài viết này ta đề cập đến UnitTest thôi nhé.
* UnitTest: Kiểm thử ở mức đơn vị. Đơn vị ở đây là các đơn vị mã nguồn: class, method,...Trong Laravel là các class Model, Repository,...và các method của những class này.
* Mục tiêu của UnitTest là kiểm tra tính đúng đắn trong xử lý của những đơn vị mã nguồn này.
* Để thực hiện UnitTest chúng ta dùng PHPUnit. Trong Laravel đã tích hợp sẵn PHPUnit nên việc UnitTest trong Laravel tương đối dễ dàng.
## 2. Cấu trúc thư mục test trong Laravel
![](https://images.viblo.asia/da013440-7332-4151-a7e2-312869d71ff4.png)
* Danh sách các thư mục:
    * tests: chứa code dành cho việc test
    * tests/Feature: chứa các file dành cho FeatureTest
    * tests/Unit: chứa các file dành cho UnitTest
    * TestCase: là file bootstrap thiết lập môi trường Laravel cho các tests
    * phpunit.xml: là file cấu hình cho PHPUnit
* Các code dành cho UnitTest nằm trong thư mục tests/Unit. Cấu trúc của thư   mục tests/Unit nên giống với cấu trúc bên trong thư mục app.
* Tên của class test sẽ là tên class cần test và thêm hậu tố Test.
## 3. Tạo mới và chạy UnitTest
* Để tạo mới một class UnitTest ta chạy lệnh sau:
```
// Create UnitTest for Model User in app/Models/User
php artisan make:test Models/UserTest --unit
```
Câu lệnh trên sẽ tạo một file test có đường dẫn tests/Unit/Models/UserTest.php
* Để chạy unit test, ta thực hiện câu lệnh sau:
```
// Run all test
 vendor/bin/phpunit
// Run speical test
vendor/bin/phpunit tests/Unit/Models/UserTest.php
```
## 4. Assertions
* Assertions là những method rất quan trọng trong quá trình test, assertions giúp ta khẳng định output của các test có đúng với kết quả mong muốn không.
* Một số assertion thường dùng như:
    * assertTrue() / assertFalse() : Khẳng định true hoặc false
    * assertEquals() / assertNotEquals() : Khẳng định 2 giá trị có bằng/không bằng nhau
    * assertInstanceOf() / assertNotInstanceOf(): Khẳng định đối tượng có phải/ không phải đối tượng của một class
* Còn rất nhiều các hàm assertions, các bạn có thể tìm hiểu đầy đủ ở đây: https://phpunit.readthedocs.io/en/9.5/assertions.html
## 5. Một số ví dụ về UnitTest
* Unit test cho Model

Ví dụ, ta có Model Post như dưới đây:

```post.php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Post extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'content', 'user_id',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

```
Class test của chúng ta như sau, ở đây ta thực hiện test relationship giữa Post và User:

```PostTest.php
<?php

namespace Tests\Unit\Models;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PostTest extends TestCase
{
    use RefreshDatabase;
    
    public function test_post_be_longs_to_user()
    {
        // Need to create UserFactory and PostFactory before test
        // Use factory to create user and post for test
        $user = factory(User::class)->create();
        $post = factory(Post::class)->create(['user_id' => $user->id]);

        // Check foreign key
        $this->assertEquals('user_id', $post->user()->getForeignKeyName());
        // Check instance of beLongsTo
        $this->assertInstanceOf(BelongsTo::class, $post->user());
        // Check instance of User
        $this->assertInstanceOf(User::class, $post->user);
    }
}

```



* Unit test cho Repository

Ví dụ, ta có một PostRepository với method create như dưới đây:

```PostRepository.php
<?php

namespace App\Repositories;

use App\Models\Post;

class PostRepository
{
    protected $model;

    public function __construct()
    {
        $this->model = app()->make(Post::class);
    }

    public function create($data)
    {
        return $this->model->create($data);
    }
}

```

Class test của chúng ta như sau:

```PostRepositoryTest.php
<?php

namespace Tests\Unit\Repositories;

use App\Models\Post;
use App\Models\User;
use App\Repositories\PostRepository;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Faker\Factory as Faker;

class PostRepositoryTest extends TestCase
{
    protected $postRepository;

    public function setUp() : void
    {
        parent::setUp();
        $this->postRepository = new PostRepository();
    }

    public function test_create_post()
    {
        // create data post
        $faker = Faker::create();
        $postData = [
            'title' => $faker->sentence,
            'content' => $faker->sentence,
            'user_id' => factory(User::class)->create()->id,
        ];

        $post = $this->postRepository->create($postData);
        // Check post created instance of Post
        $this->assertInstanceOf(Post::class, $post);
        // Check data post exists in the database
        $this->assertDatabaseHas('posts', $postData);
    }
}

```

## 6. Reset database sau khi test
* Để kết quả những lần test không ảnh hưởng đến những lần test tiếp theo, Laravel đã cung cấp cách thức để reset lại database sau mỗi lần test, bạn chỉ cần sử dụng trait Illuminate\Foundation\Testing\RefreshDatabase trong class test. 
* Do databse được reset lại kể cả dữ liệu trước khi chạy test nên hãy cẩn thận khi sử dụng reset database, tốt nhất là nên tạo một database riêng cho việc test.

```ExampleTest.php
<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    public function test_basic_example()
    {
        $response = $this->get('/');
        // ...
    }
}

```

## 7. Tổng kết
Hi vọng bài viết này sẽ cung cấp cho mọi người cái nhìn tổng quan về UnitTest trong Laravel và có thể áp dụng được trong công việc của mình. Cảm ơn mọi người đã đọc bài.

Tham khảo: 
* https://laravel.com/docs/5.8/testing
* https://phpunit.readthedocs.io/en/9.5/assertions.html