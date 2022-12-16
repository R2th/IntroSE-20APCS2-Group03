# Lời nói đầu
Hello Hello!!!  Chào các bác, em đã quay trở lại rồi đây :)) trong bài viết lần này em xin chia sẻ một chút về `API Resources`. Chắc bác nào đang làm việc với Laravel cũng đã nghe đến `API Resources` rồi đúng không.Hiện tại dự án em đang làm cũng ứng dụng kỹ thuật này, nên tiện đó chia sẻ với các bác luôn.Hôm nay em  sẽ đưa ra ví dụ để các bác có thể dễ dàng hình dung ra chức năng của nó là gì.
# API Resources là gì?
Nói qua một chú về khái niệm API Resource như sau: thật chất từ phiên bản Laravel 5.5 thì chức năng Eloquent Resource mới được ra mắt và nó đã hỗ chỗ khá hữu ích trong việc xây dựng API của lập trình viên. Khi chúng ta xây dựng một API, chúng ta có thể cần phải có một lớp chuyển đổi nằm giữa các Eloquent models và JSON responses để trả về cho người dùng. Laravel resource class cho phép chúng ta dễ dàng chuyển đổi các model và model collections thành JSON.
# Khởi tạo project
Lý thuyết chỉ có vậy thôi các bác, giờ bắt tay đi vào ví dụ cụ thể các bác nhé. đầu tiên các bác tạo một project mới như sau:
```shell
composer create-project --prefer-dist laravel/laravel api-resource
```
# To database
 sau khi đã install xong project thì các bác hãy tạo database và models.
 
 ```
php artisan make:model People -mf
php artisan make:model Product -crmf
php artisan make:model Comment -mf
 ```
 ở 3 câu lệnh trên thì các option có ý nghĩa lần lượt là (`cr`) là dùng để tạo resource controller, (`m`) để tạo migration và (`f`) để tạo factory. Tất cả trong 1 câu lệnh, rất tiện đúng không các bác.
 Nội dung của migration như sau:
 ```
 <?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePeopleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('people', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
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
        Schema::dropIfExists('people');
    }
}
 ```
 
 ```
 <?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('people_id')->unsigned();
            $table->string('name');
            $table->string('desc');
            $table->integer('price');
            $table->timestamps();
            $table->foreign('people_id')->references('id')->on('people');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
 ```
 
 ```
 <?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('people_id')->unsigned();
            $table->integer('product_id')->unsigned();
            $table->text('body');
            $table->timestamps();
            $table->foreign('product_id')->references('id')->on('products');
            $table->foreign('people_id')->references('id')->on('people');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comments');
    }
}
 ```
 
 mọi công tác chuẩn bị đã xong, các bác chỉ việc chạy câu lệnh migrate để thực hiện tạo database thôi. Nên nhớ là đừng quên config trong file `.env` các bác nhé.
 ```
 php artisan migrate
 ```
 
 Chúng ta mới chỉ tạo ra database thôi, hoàn toàn chưa có dữ liệu để test. Nên giờ chúng ta phải tạo dữ liệu mẫu bằng cách viết trong các file factory các bác nhé. <br>
 CommentFactory.php
 ```
 <?php

use Faker\Generator as Faker;

$factory->define(App\Comment::class, function (Faker $faker) {
    return [
        'product_id' => function () {
            return factory(App\Product::class)->create()->id;
        },
        'people_id' => function () {
            return factory(App\People::class)->create()->id;
        },
        'body' => $faker->realText($maxNbChars = 200, $indexSize = 2),
    ];
}); 
 ```
 
 PeopleFactory.php
 ```
 <?php

use Faker\Generator as Faker;

$factory->define(App\People::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
    ];
});
  ```
  ProductFactory.php
```php
<?php

use Faker\Generator as Faker;

$factory->define(App\Product::class, function (Faker $faker) {
    return [
        'people_id' => function () {
            return factory(App\People::class)->create()->id;
        },
        'name' => $faker->name,
        'desc' => $faker->text,
        'price' => $faker->numberBetween($min = 1000, $max = 9000),
    ];
});
```

DatabaseSeeder.php
```rust
factory(App\Product::class, 5)
           ->create()
           ->each(function ($u) {
                $u->comments()->save(factory(App\Comment::class)->create());
            }
        );

        // Creates authors with no articles
        factory(App\People::class, 2)->create();

        // Creates Articles without Comments
        factory(App\Product::class, 3)->create();
```

Tuy nhiên để chạy được đoạn seed này thì các bác còn phải tạo eloquent relation trong model nữa nhé :D <br>
Comment.php
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    public function people()
    {
        return $this->belongsTo(People::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
```

Product.php
```
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function people()
    {
        return $this->belongsTo(People::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
 ```
 People.php
 ```
 <?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class People extends Model
{
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
 ```
 # Tạo API Resource
 Và giờ chỉ cần chạy db:seed là các bác đã có được dữ liệu trong database rồi.
 Giờ là vào phần quan trọng nhất của bài viết này.Chúng ta cùng tạo ra resource class, chúng ta sẽ tạo ra 1 resource một cái dùng để xử lý model.
 
 ```
 php artisan make:resource ProductResource
 ```
 Các bác kiểm tra các file được tạo ra trong thư mục `App/Http/Resource`. trong mỗi class sẽ có một phương thức `toArray` nơi mà chúng ra sẽ chuyển đổi Model theo cách chúng ta muốn. Nội dung của `ProductResource` sẽ là:
 ```
 <?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'type'          => 'product',
            'id'            => (string)$this->id,
            'attributes'    => [
                'title' => $this->title,
            ],
        ];
    }
}

 ```
 
Trong Product controller thì `show()` function sẽ được trả về như sau:
```markdown
public function show(Product $product)
    {
        return new ProductResource($product);
    }
```
 config trong route sẽ là:
 ```
 Route::resource('products', 'ProductController');
  ```
  Rồi sau đó các bác vào post man để check xem đã được chưa nhé
  
  ![](https://images.viblo.asia/8a794225-bb86-4560-bc68-3f36e1ad7d81.png)
  
  Tất cả đều đã chạy đúng như chúng ta muốn. Tuy nhiên thì API trả về chúng ta không muốn `data` là key.Vậy để bỏ cái này thì chứng ta gọi đến phương thức `withoutWrapping()`.Khi đó controllẻ sẽ như sau:
  ```
  public function show(Product $product)
    {
        ProductResource::withoutWrapping();

        return new ProductResource($product);
    }
  ```
  và kết quả:
  ![](https://images.viblo.asia/6156bdf4-dce3-4f7c-9894-012feefff011.png)
  # Tổng kết
  Vậy là em đã hoàn thành và demo xong một ví dụ rất đơn giản về chức năng API resource trong laravel. Cảm ơn các bác đã đọc bài viết, có thể bài viết chưa thực sự đầy đủ nhưng đây chỉ là một ví du đơn giản để các bác tham khảo. Để hiểu rõ và đầy đủ hơn nữa thì các bác lên trang chủ của laravel và làm theo các ví dụ trên đó nhé. Thanks