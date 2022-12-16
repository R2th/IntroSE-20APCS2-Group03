Hôm nay mình sẽ đi cùng các bạn việc áp dụng React với Laravel. Việc áp dụng React vào Laravel ta cần đi với các thư viện như ReactDom, ReactRouter, Babel.
### Cài đặt ###
Đầu tiên ta cần cài đặt Laravel, theo như hướng dẫn của trang chủ của [Laravel](https://laravel.com/docs/5.6/installation) thì ta sẽ chạy lệnh sau:
`composer create-project --prefer-dist laravel/laravel create_react`
Sau khi tiến hành cài đặt Laravel như tạo key, tạo DB rồi config, sau đó ta tiến hành cài đặt thư viện của ReactJs.
Để cài đặt các thư viện React ta sửa file package.json
```
"dependencies": {
    "babel-standalone": "6.26.0",
    "react": "15.1.0",
    "react-dom": "15.1.0",
    "react-router": "3.0.2"
}
````

Sau đó ta chạy lệnh `npm install` để lấy thư viện về.
Để đưa các file cần thiết vào folder public ta cần sửa file webpack.mix.js
```
.copy('node_modules/babel-standalone/babel.min.js', 'public/js/')
	.copy('node_modules/react/dist/react.min.js', 'public/js/')
	.copy('node_modules/react-dom/dist/react-dom.min.js', 'public/js/')
	.copy('node_modules/react-router/umd/react-router.min.js', 'public/js/')
```
Sau đó ta chạy lệnh `npm run dev` để đưa các file js về folder public.

### Tạo database ###
Trong bài viết này ta chỉ làm đề bài đơn giản đó là việc tạo sửa xóa các bài Post, với các bài Post có các thông tin cơ bản như tiêu đề (title), nội dung (content). Đầu tiên ta tạo migrate bằng lệnh
`php artisan make:migration create_table_posts --table=posts`
Và nội dung file đó như sau:

```
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTablePosts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->text('content')->nullable();
            $table->integer('user_id');
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
        Schema::drop('posts');
    }
}

```

Sau đó ta tạo database bằng lệnh `php artisan migrate`.
Cuối cùng ta sẽ tạo Model cho Post như sau:

``` PoseModel.php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
	protected $fillable = [
		'title',
		'content',
		'active',
		'user_id',
	];

	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
```

Sau khi làm xong các phần liên quan đến Database, giờ việc tiếp theo ta sẽ tạo dump data cho phần Post.
Ta sẽ tạo 1 seeder cho phần Post như sau:
`php artisan make:seed PostSeeder`
Sau đó ta dùng Factory để tạo sample database

```PostSeeder.php
<?php

use Illuminate\Database\Seeder;
use App\Models\Post;

class PostSeeder extends Seeder
{
    const TOTAL_ITEM = 50;
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();
        $this->command->getOutput()->progressStart($this::TOTAL_ITEM);
        for ($i = 1; $i <= $this::TOTAL_ITEM; $i++) {
        	Post::create([
        		'title' => $faker->name,
        		'content' => $faker->paragraph,
        		'user_id' => 1,
        	]);
        	$this->command->getOutput()->progressAdvance();
        }

        $this->command->getOutput()->progressFinish();
    }
}

```

Sau đó để tạo dump data ta chạy lệnh: `php artisan db:seed --class=PostSeeder`
### Tạo Controller ###
#### Tạo router ####
Đầu tiên ta cần tạo router trong file routes/api.php phần lấy Post.

``` api.php
Route::resource('posts', 'PostContorller', ['only' => ['index', 'store', 'update', 'show', 'delete']]);
```

#### Tạo file PostController ####
Để tạo Post Controller ta có thể tự tạo file mới hoặc dùng lệnh `php artisan make:controller PostsController`
File PostController ta viết như sau:

``` PostController
<?php

namespace App\Http\Controllers;
use App\Models\Post;

use Illuminate\Http\Request;

class PostsController extends BaseController
{
    public function index()
    {
    	
    }
}
```

Ở đây tôi extends BaseController vì tôi muốn viết 1 hàm để dùng chung cho mọi controller đấy là việc trả về định dạng json kiểu format như sau
```
{
    'code' : 200// 200 là thành công,
    'data': {items}
}
```
Do vậy trong BaseController tôi viết 2 hàm return định dạng trả về như sau:

```BaseController
protected function jsonError($returnCode, $message, $statusCode = 200)
    {
        return response()->json([
            'code' => (int) $returnCode,
            'message' => $message,
        ], $statusCode);
    }
    protected function jsonSuccess($data, $statusCode = 200)
    {
        return response()->json(array_merge(['code' => 200], $data), $statusCode);
    }
```

Vậy để lấy 15 bài Post đầu tiên ta có thể sử dụng trong PostController như sau
```PostController.php
public function index()
    {
    	return $this->jsonSuccess(Post::paginate()->toArray());
    }
```

Mở trình duyệt ta gõ localhost:8000/api/posts ta có Api trả về danh sách các bài Post trả về dạng json

Tiếp đến tôi viết thêm 2 function tạo và sửa Post trong Controller như sau
```PostController
<?php

namespace App\Http\Controllers;
use App\Models\Post;

use Illuminate\Http\Request;

class PostsController extends BaseController
{
    public function index()
    {
    	return $this->jsonSuccess(Post::paginate()->toArray());
    }

    public function store(Request $request)
    {
        $post = Post::create($request->only('title', 'content'));

        return $this->jsonSuccess($post->toArray());
    }

    public function update($id, Request $request)
    {
        $post = Post::find($id);
        if (!$post) {
            return $this->jsonError('404', 'Item not found');
        }
        $post->update($request->only('title', 'content'));

        return $this->jsonSuccess([]);
    }

}
```

Trong phần một ta tạm thời đi qua phần Laravel, đó là việc tạo Model, Controller cho việc tạo Post, phần tiếp theo sẽ làm việc đến lớp View cũng như ReactJs liên quan đến phần Laravel này