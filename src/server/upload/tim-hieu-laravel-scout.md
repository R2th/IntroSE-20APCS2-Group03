![](https://images.viblo.asia/b2738cca-e280-4441-9489-043dea62b210.jpg)

Laravel Scout là `full-text` search dựa trên driver dành cho Eloquent. Ngoài ra, nó còn hỗ trợ Algolia, Elastic Search, và vì nó là full-text search dựa trên driver nên bất cứ ai cũng có thể tạo sự tích hợp của riêng mình với các hệ thông full-text search khác. 

Laravel Scout hoạt động dựa trên nó thêm tính chất `search` vào các model đã có. Sau đó chỉ việc đồng bộ hóa data với các dịch vụ tìm kiếm.

Đầu tiên chúng ta sẽ tải project mới về bằng `composer` nhé
```PHP
composer create-project --prefer-dist laravel/laravel demo_laravel_scout
```
Sau đó chúng ta vào file `.env` để config database
```PHP
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=scout
DB_USERNAME=root
DB_PASSWORD=
```

Sau đó để dùng được `Scout` chúng ta phải cài package nó vào project thì mới chạy được
```PHP
composer require laravel/scout
```

Khi bạn cài thành công `Scout` rồi thì bạn dùng command line để publish  config Scout nhé
```PHP
php artisan vendor:publish --provider="Laravel\Scout\ScoutServiceProvider"
```
Bây giờ bạn tưởng tượng rằng khi chúng ta đang search cũng chính là chúng ta đang tạo HTTP request tới `Algolia`, Chúng có thể làm cho hệ thống của bạn chạy rất là chậm nếu hệ thống Algolia đang quá tải không trả kịp kết quả về cho hệ thống của chúng ta. Vậy phải có cách nào khắc phục chứ nhỉ, chúng ta sẽ mở file `config/scout.php` set queue bằng true hoặc thêm dòng config này vào file `.env` cũng dc nhé
```PHP
SCOUT_QUEUE = true
```
Tiếp theo bạn cài Algolla Driver thông qua  `Composer` hoặc bạn cũng có thể dùng Elastic search nha.
```
composer require algolia/algoliasearch-client-php
```
Sau đó bạn phải khai báo id và secret của Algolia nhé. bạn vào website của Algolia sau đó tạo tài khoản. Sau đó login bạn lấy `id` và `secret` ở link này nhé : https://www.algolia.com/api-keys

Sau đó bạn mở file `.env` ra rồi paste 2 dòng này vào
```PHP
ALGOLIA_APP_ID = Bạn paste Application ID
ALGOLIA_SECRET = Bạn paste Admin API Key
```
Sau đó bạn sẽ import `Laravel\Scout\Searchable` vào Model nào mà bạn muốn sử dụng tìm kiếm theo `Scout`. Ví dụ mình sẽ import vào `Post` Model nhé. Trước đó các bạn phải tạo bảng và seeder cho bảng `posts` rồi đó nhé. Nếu các bạn chưa rõ thì các bạn có thể tham khảo bào viết [Migration](https://viblo.asia/p/tim-hieu-ve-migration-trong-laravel-bWrZn1MpKxw) và [Seeder](https://viblo.asia/p/tim-hieu-ve-seeder-trong-laravel-bWrZn1MmKxw) nhé. Laravel sẽ đồng bộ hóa các record của posts với index Algolia mỗi khi vào bản ghi bài đăng được tạo mới , cập nhật hoặc xóa.
```PHP
<?php
namespace App;
use App\Enums\PostVisibility;
use Laravel\Scout\Searchable;
use Carbon\Carbon;

class Post extends Model
{
    use Searchable;
    
    protected $fillable = [
        'category_id',
        'user_id',
        'hash_id',
        'title_vi',
        'title_en',
        'title_jp',
        'views_count',
        'published_at',
    ];
    
    public function isPublished()
    {
            return $this->published_at !== null;
    }
   
    public function getRouteKeyName()
    {
        return 'hash_id';
    }
  
    /**
     * Get the indexable data array for the model.
     *
     * @return array
     */
    public function toSearchableArray()
    {
        $array = $this->only('title_vi', 'title_en', 'title_jp');
        
        return $array;
    }
}
```

Mình sẽ giới thiệu cho các bạn một số hàm khi dùng `Scout` nhé
ĐỊnh nghĩa tên của chỉ mục Model bằng cách sử dụng ghi đè phương thức `searchableAs()`. Nói một cách khác mỗi chỉ mục này nó giống như một bảng trong MySQL. Còn không mặc định nó sẽ là tên bảng ứng với Model.
```PHP
public function searchableAs()
{
    return 'posts_index';
}
```
Tiếp theo chúng ta sẽ định nghĩa những column nào trong bảng `posts` sẽ có khả năng được tìm kiếm bằng cách sử dụng hàm `toSearchableArray()`
```PHP
 public function toSearchableArray()
{
    $array = $this->only('title_vi', 'title_en', 'title_jp');
    return $array;
}
```
Tiếp theo khi chúng ta chỉ muốn cho người dùng search những bài Post mà nó đã được published rồi thì chúng ta sẽ viết 2 phương thức sau trong model
```PHP
public function isPublished()
{
    return $this->published_at !== null;
}

public function toSearchableArray()
{
    if (! $this->isPublished()) {
        return [];
    }
    
    $array = $this->only('title_vi', 'title_en', 'title_jp');
    
    return $array;
}
```
Nhưng thật may mắn, `Scout` nó đã có phương thức giúp chúng ta có thể tách biệt, không còn phải sử dụng câu lệnh `if` trong phương thức `toSearchableArray()` nữa
```PHP
public function isPublished()
{
    return $this->published_at !== null;
}

public function shouldBeSearchable()
{
    return $this->isPublished();
}

public function toSearchableArray()
{
    $array = $this->only('title_vi', 'title_en', 'title_jp');
    return $array;
}
```
Và đó nếu như mà phương thức `shouldBeSearchable()` trả về giá trị true thì phương thức `toSearchableArray()` sẽ trả về bình thường, nếu như là `false` thì nó sẽ trả về một mảng rỗng.
```PHP
public function getScoutKey()
{
    return $this->hash_id;
}
```
Theo mặc định, Scout sẽ sử dụng khóa chính  của Post Model  như là `unique ID` được lưu trữ trong `search index`. Nếu bạn muốn custom , bạn có thể định nghĩa hàm trên nhé, nhưng nhớ là phải chọn trường nào nó  `unique` nhé.
Tiếp theo này, nếu như bạn cài `Scout` khi bảng `posts` nó có nhiều bản ghi rồi thì bạn cần phải import những bản ghi vào trong `search driver` để nó có thể đánh được index search. `Scout` cung cấp phương thực `import`
```PHP
php artisan scout:import "App\Post"
```
Ngược lại, phương thức `flush` sẽ loại bỏ tát cả các bản ghi của Post Model từ search index
```PHP
php artisan scout:flush "App\Post"
```
Và từ các lần sau, khi bạn add mới bản ghi vào trong bảng `posts` thì Scout sẽ tự động add record đó vào `search index`. 
Rồi ok, tiếp theo là làm thế nào để chúng ta có thể search được này :))

Tiếp theo chúng ta tạo 1 file view `blade` có 1 ô nhập từ khóa chúng ta search, và ở ngay dưới là danh sách trả về kết quả sau khi search.
![](https://images.viblo.asia/773d0054-ef08-459d-b6e4-d975d9f12844.png)
Tiếp theo tạo controller và route
```PHP
php artisan make:controller PostController
```
```PHP
Route::get('index', 'PostController@index);
```

file `PostController.php`
```PHP
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;

class PostController extends Controller
{
    public function search(Request $request)
    {
        if ($request->has('search')) {
            $posts = Post::search($request->get('search'))->get();
        } else {
            $posts = Post::get();
        }
        return view('index', compact('posts'));
    }
}
```
Hàm `search()` nó nhận tham số đầu vào là giá trị mà chúng ta muốn tìm kiếm, thật dễ dãng phải không nào.

Giả sử 

VD chúng ta đã sử dụng hàm `searchableAs` ở trong model để quy định chỉ search theo `title_vi` chẳng hạn thì chúng ta sẽ có thể thay đổi được nó khi sử dụng hàm `within()`
```PHP
 $posts = Post::search($request->get('search'))
         ->within('title_en')
         ->get();
// Lúc này nó sẽ search theo title_en
```
Sử dụng mệnh đề `where()`
```PHP
 $posts = Post::search($request->get('search'))
             ->where('category_id', 1)
             ->get();
```
`paginate()`
```PHP
 $posts = Post::search($request->get('search'))->paginate(10);
```
Nếu như trong trường hợp mà chúng ta muốn search cả những bản ghi mà chúng ta đã xóa mềm thì các bạn nhớ config trong file `config/scout.php` như sau:
```PHP
'soft_delete' => true
```
Khi đó các bạn mới dùng được các phương thức `withTrashed()` và `onlyTrashed()` trong truy vấn
```PHP
// Khi chúng ta muốn lấy tất cả các bản ghi bao gồm đã xóa mềm
 $posts = Post::search($request->get('search'))
             ->withTrashed()
             ->get();

// Khi chúng ta chỉ muốn lấy những bản ghi đã bị xóa mềm
$posts = Post::search($request->get('search'))
             ->onlyTrashed()
             ->get();
```

file `web.php`
```PHP
<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('index', 'PostController@search');
```

Vậy qua ví dụ nho nhỏ ở trên cũng phần nào sương sương giới thiệu đến các bạn `Laravel Scout` nó làm cái gì. Cảm ơn các bạn đã đọc bài chia sẻ của mình.