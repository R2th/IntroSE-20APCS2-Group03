# Giới thiệu
**1. UnitTest là gì?**

* **UnitTest**: Kiểm thử ở mức đơn vị mã nguồn. Một đơn vị mã nguồn là thành phần nhỏ nhất trong mã nguồn mà chúng ta có thể kiểm tra như. Trong Unit Test ta sẽ kiểm thử các class, method,...Mục tiêu của unit testing là kiểm tra tính đúng đắn trong các xử lý của từng đơn vị mã nguồn.

* Hiểu đơn giản đây là công việc viết code để test code chúng ta viết ra.

* Để thực hiện công việc này chúng ta cần PHPUnit và trong Laravel tích hợp sẵn PHPUnit.

Trong bài viết này mình sẽ demo 1 ví dụ về unit test
# Tạo model và migration
Các bạn chạy lệnh để tạo ra model và migration **Category**
```
php artisan make:model Category -m
```
Ở file Model App\Category.php : 
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name',
        'description',
    ];
}

```

Viết migrate tạo table categories:
```php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categories');
    }
}

```

Vậy là tạo xong model và migration chạy lệnh
```
php artisan migrate
```
để thực thi file migration vừa tạo.

Tiếp theo , tạo các chức năng CRUD cho Category , ở đây mình dùng repository nhé!
# Tạo các crud function trong repository
Ở đây mình tập trung nhiều vào phần test lên mình tạo file repository đơn giản. 

Các bạn tạo file App\Repositories\CategoryRepository.php và tạo các function CRUD như sau: 
``` php
<?php

namespace App\Repositories;

use App\Category;

class CategoryRepository
{
    protected $model;

    public function __construct()
    {
        $this->model = $this->model = app()->make(Category::class);
    }

    // Tạo category
    public function storeCategory($data) : Category
    {
        $category = $this->model->create($data);

        return $category;
    }

    // Update category
    public function updateCategory($data, $category) : bool
    {
        return $category->update($data);
    }

    // Show category
    public function showCategory($category_id) : Category
    {
        return $this->model->findOrFail($category_id);
    }

    // Destroy category
    public function destroyCategory($category) : bool
    {
        return $this->model->delete();
    }
}

```

Vậy là đã xong các chức năng thêm sửa xóa rồi. bắt đầu viết test thôi !!! :100::100:
# Tiến hành tạo CRUD Unit Testing
Để tạo 1 test, ta sử dụng câu lệnh:

```
// Tạo 1 test trong thư mục Feature
    php artisan make:test CategoryTest
// Tạo 1 test trong thư mục Unit
    php artisan make:test CategoryTest --unit
```
> Lưu ý: Nội dung bên trong thư mục Feature hay Unit có cấu trúc giống thư mục app/ ví dụ app/Repositories/CategoryRepository.php thì trong thư mục Unit là test/Unit/Repositories/CategoryRepository.php cho dễ quản lý nhé

Ở đây mình tạo unit test lên chạy lệnh: 
```
php artisan make:test Repositories/CategoryTest --unit
```

Trước khi viết test mình lưu ý 2 function sau: 
> **setUp()** :  Chạy trước mỗi method test. Sử dụng khi muốn khởi tạo biến, mở kết nối file,... chuẩn bị môi trường để test

> **tearDown()**: Chạy sau mỗi method test. Sử dụng để hủy các biến, kết nối,...

Ví dụ :

```php
<?php

namespace Tests\Unit\Repositories;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CategoryTest extends TestCase
{
    public function setUp() : void
    {
        parent::setUp();
    }

    public function tearDown() : void
    {
        parent::tearDown();
    }

    /**
     * A basic unit test example 1.
     *
     * @return void
     */
    public function testExample1()
    {
        $this->assertTrue(true);
    }

     /**
     * A basic unit test example 2.
     *
     * @return void
     */
    public function testExample2()
    {
        $this->assertTrue(true);
    }
}

```

Việc test sẽ lần lượt chạy như sau:

1. Method: setUp()
2. Method: testExample1()
3. Method: tearDown()
4. Method: setUp()
5. Method: testExample2()
6. Method: tearDown()

## Test chức năng tạo (store)
Trong file CategoryTest.php
```php
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Repositories\CategoryRepository;
use App\Category;
use Faker\Factory as Faker;

class CategoryTest extends TestCase
{
    protected $category;
    
    public function setUp() : void
    {
        parent::setUp();
        $this->faker = Faker::create();
        // chuẩn bị dữ liệu test
        $this->category = [
            'name' => $this->faker->name,
            'description' => $this->faker->name,
        ];
        // khởi tạo lớp CategoryRepository
        $this->categoryRepository = new CategoryRepository();
    }

     /**
     * A basic unit test store
     *
     * @return void
     */
    public function testStore()
    {
        // Gọi hàm tạo
        $category = $this->categoryRepository->storeCategory($this->category);
        // Kiểm tra xem kết quả trả về có là thể hiện của lớp Category hay không
        $this->assertInstanceOf(Category::class, $category);
        // Kiểm tra data trả về
        $this->assertEquals($this->category['name'], $category->name);
        $this->assertEquals($this->category['description'], $category->description);
        // Kiểm tra dữ liệu có tồn tại trong cơ sở dữ liệu hay không
        $this->assertDatabaseHas('categories', $this->category);
    }
}

```

vậy là xong . sau đó chúng ta chạy lệnh để test: 
```
vendor/bin/phpunit
```
Nếu trả về như này là đã pass hết trường hợp:
```
PHPUnit 7.5.13 by Sebastian Bergmann and contributors.

...                                                                 3 / 3 (100%)

Time: 373 ms, Memory: 18.00 MB

OK (3 tests, 6 assertions)
```

Tương tự với các chức năng show, update, destroy

```php
<?php

namespace Tests\Unit\Repositories;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Repositories\CategoryRepository;
use App\Category;
use Faker\Factory as Faker;

class CategoryTest extends TestCase
{
    protected $category;

    public function setUp() : void
    {
        parent::setUp();
        $this->faker = Faker::create();
        $this->category = [
            'name' => $this->faker->name,
            'description' => $this->faker->name,
        ];
        $this->categoryRepository = new CategoryRepository();
    }

     /**
     * A basic unit test store
     *
     * @return void
     */
    public function testStore()
    {
        $category = $this->categoryRepository->storeCategory($this->category);
        $this->assertInstanceOf(Category::class, $category);
        $this->assertEquals($this->category['name'], $category->name);
        $this->assertEquals($this->category['description'], $category->description);
        $this->assertDatabaseHas('categories', $this->category);
    }

    public function testShow()
    {
        $category = factory(Category::class)->create();
        $found = $this->categoryRepository->showCategory($category->id);
        $this->assertInstanceOf(Category::class, $found);
        $this->assertEquals($found->name, $category->name);
        $this->assertEquals($found->description, $category->description);
    }

    public function testUpdate()
    {
       // Tạo dữ liệu mẫu
        $category = factory(Category::class)->create();
        $newCategory = $this->categoryRepository->updateCategory($this->category, $category);
        // Kiểm tra dữ liệu trả về
        $this->assertInstanceOf(Category::class, $newCategory);
        $this->assertEquals($newCategory->name, $this->category['name']);
        $this->assertEquals($newCategory->description, $this->category['description']);
        // Kiểm tra xem cơ sở dữ liệu đã được cập nhập hay chưa
        $this->assertDatabaseHas('categories', $this->category);
    }

    public function testDestroy()
    {
        $category = factory(Category::class)->create();
        $deleteCategory = $this->categoryRepository->destroyCategory($category);
        // Kiểm tra dữ liệu có trả về true hay không
        $this->assertTrue($deleteCategory);
        // kiểm tra xem dữ liệu đã được xóa trong cơ sở dữ liệu hay chưa
        $this->assertDatabaseMissing('categories', $category->toArray());
    }
}

```
# Tổng kết
Hy vọng qua bài viết này các bạn có thể hiểu hơn về unit test

Tham khảo: 

https://medium.com/@jsdecena/crud-unit-testing-in-laravel-5-ac286f592cfd
https://laravel.com/docs/5.8/testing