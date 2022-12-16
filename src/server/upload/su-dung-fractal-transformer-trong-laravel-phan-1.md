# Mở đầu
### Khởi tạo project
``` bash
composer create-project --prefer-dist laravel/laravel laravel_transformer
```
### Tạo database và migration

Ở đây mình tạo database là laravel_transformer

Tiếp theo, tạo migration: 
```bash
php artisan make:migration create_post_table
php artisan make:migration update_table_users --table="users"
```

Mình sẽ tạo thêm 1 bảng `posts` và update thêm 1 số trường của bảng `users`.
Migration của mình như sau:
```php
public function up()
{
    Schema::create('posts', function (Blueprint $table) {
        $table->increments('id');
        $table->unsignedInteger('user_id');
        $table->string('content');
        $table->unsignedInteger('votes');
        $table->unsignedInteger('view_count');
        $table->timestamps();
    });
}
```

và bảng `users`

```php
Schema::table('users', function (Blueprint $table) {
    $table->string('address');
    $table->unsignedInteger('age');
    $table->string('phone');
});
```

Bạn chạy `php artisan migrate` để cập nhật trong database nhé.

### Tạo Relationship
Trước hết bạn tạo Post model:
```bash
php artisan make:model Post
```
và thêm relation cho bảng này:
```php
public function user()
{
    return $this->belongsTo(User::class);
}
```
Relation của bảng `users`:
```php
public function posts()
{
    return $this->hasMany(Post::class);
}
```
### Tạo seeder
Xong rồi bạn có thể thêm trực tiếp vào database bằng tay. Hoặc sẽ tạo bản ghi bằng factory như sau:
Tạo file ModelFactory trong thư mục factories:
```php
<?php

$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;
    
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->email,
        'password' => $password ?: $password = bcrypt('secret'),
        'address' => $faker->address,
        'age' => 23,
        'phone' => '01698675733'
    ];
});

$factory->define(App\Post::class, function (Faker\Generator $faker) {
    
    return [
        'user_id' => function () {
            return App\User::pluck('id')
                ->random(1)
                ->first();
        },
        'content' => $faker->text(30),
        'votes' => 100,
        'view_count' => 100,
    ];
});

```
Tiếp theo chúng ta chạy lệnh `php artisan make:seeder UsersTableSeeder` và `php artisan make:seeder PostsTableSeed` để tạo ra 2 file chứa thông tin về các số lượng bản ghi mà chúng ta muốn tạo. 

PostsTableSeeder:
```php
<?php

use Illuminate\Database\Seeder;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Post::class, 10)->create();
    }
}

```
UsersTableSeeder
```php
<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class, 3)->create();
    }
}

```
Trong file `DatabaseSeeder` ta sẽ làm như sau:
```php
<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UsersTableSeeder::class,
            PostsTableSeeder::class
        ]);
    }
}
```
Cuối cùng ta chạy : 
```bash
php artisan db:seed
```
Đơn giản phải không nào!.
Thế là có dữ liệu để test rồi nhé :D 
###  Xử lý
Vào `web.php` tạo đường dẫn như sau: 
```php
Route::get('/post', 'PostController@getPost');
```
Mục đích của mình ở đây là sẽ lấy ra thông tin của một bài post và user sở hữu nó.

Khi làm việc với Laravel, mình thấy mọi người hay response data cả cục kiểu như thế này.  Ví dụ khi muốn lấy thông tin của một bài Post:

```php
$post = Post::with('user')->first();
return $post;
```
Lại bảo không phải đi =))) Nhiều khi bạn không muốn server trả về 1 cột nào đó trong cục dữ liệu kia thì mọi chuyện sẽ khá là rắc rối. Lại phải đi lấy từng cái một rồi nhóm vào. Đã thế còn sửa trực tiếp trong `Controller` nữa. Cảm giác không được linh hoạt cho lắm.

### Giải quyết
Như tiêu đề bài viết. Ở đây mình sẽ sử dụng Fractal Transformer để xử lý việc này. Bạn muốn lấy bao nhiêu data cũng được. Nhưng sau khi xử lý qua transform nó sẽ trở thành dữ liệu như những gì bạn mong muốn. Ví dụ như trên khi bạn chạy `localhost:8000/post` , bạn sẽ thấy kết quả là một bài post cùng với tất cả thông tin của `user` viết bài post này. Thế nhưng vào một ngày đẹp trời, bạn không muốn lộ số điện thoại của bạn ra nữa. Thì như mình nói ở trên, lại phải tách dữ liệu ra và xử lý. Quá tệ =))

Cài đặt fractal/transformer:
```bash
composer require spatie/laravel-fractal
```
Tiếp theo bạn tạo file PostsTransformers theo đường dẫn App\Transformer\PostsTransformer:
```php
<?php
namespace App\Transformer;

use App\Post;
use League\Fractal\TransformerAbstract;

class PostTransformer extends TransformerAbstract
{
    public function transform(Post $post)
    {
        return [
            'id' => $post->id,
            'user_id' => [
                'name' => $post->user->name
            ],
            'content' => $post->content
        ];
    }
}
```
Ở đây bạn sẽ xử lý data mà bạn cần lấy. Ví dụ của mình thì mình chỉ muốn lấy `content`, còn về thông tin của user thì mình chỉ muốn lấy `name` của user đó thôi. Nghĩa là `Controller` bạn cứ giữ nguyên cái cục data như ban đầu. Mình sẽ xử lý nó ở đây. 
Tiếp theo ta quay lại `PostController` sửa một chút:
```php
<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use App\Transformer\PostTransformer;

class PostController extends Controller
{
    protected $postTransform;

    public function __construct(PostTransformer $postTransform)
    {
        $this->postTransform = $postTransform;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getPost()
    {
        $post = Post::with('user')->first();

        return $this->postTransform->transform($post);
    }
 }
```

Sau đó bạn F5 lại trình duyệt và xem lại :D  Kết quả đã được làm mới đúng không.
### Kết Luận
Loạt bài viết về fractal/transformer của mình vẫn còn khá dài. Mình xin để các phần sau mình sẽ ra tiếp. Đến đây mình nghĩ mình xin dừng lại. Đây là ví dụ rất cơ bản và dễ sử dụng. Hi vọng mọi người không gặp khó khăn gì. Cảm ơn mọi người đã đọc bài viết. Nếu có vấn đề gì hãy để lại comment cho mình nhé :D 

Tạm biệt!