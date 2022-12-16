Xin chào các bạn, trong những bài viết trước mình đã chia sẻ với các bạn về [Migration](https://viblo.asia/p/tim-hieu-ve-migration-trong-laravel-bWrZn1MpKxw) và [Seeder](https://viblo.asia/p/tim-hieu-ve-seeder-trong-laravel-bWrZn1MmKxw) trong Laravel -  nó là các công việc cần thiết khi làm việc với DB, giúp cho việc tạo bảng, quản lý phiên bản, chèn dữ liệu một cách thuận tiện nhất. Như vậy sau những bước migration và seeding, thì chúng ta đã có một cơ sở dữ liệu với đầy đủ các bảng và dữ liệu trong bảng đó. Trở lại với bài viết mình muốn chia sẻ trong series **Laravel và những điều thú vị** thì hôm nay mình sẽ chia sẻ cho các bạn cách truy vấn và xử lý dữ liệu đang có trong cơ sở dữ liệu. Trước hết chúng ta sẽ tìm hiểu qua mô hình MVC là gì nhé.
# 1. Mô hình MVC
Chắc hẳn ai bắt đầu với sự nghiệp làm web cũng không thể không biết mô hình MVC. Mình sẽ nói sơ lược lại một chút nhé. MVC(Model- View- Controller) là mô hình phân chia application thành 3 thành phần chính và mỗi thành phần lại có nhiệm vụ riêng của nó:
* Model: chứa các logic nghiệp vụ và thao tác với DB.
* View: thực hiện công việc hiển thị và tương tác với người dùng.
* Controller: làm nhiệm vụ điều hướng giữa các đối tượng tham gia hệ thống. Ví dụ như người dùng có một request lên thì route định tuyến vào controller, thì controller sẽ điều hướng đến cho một Model tương ứng xử lý sau đó kết quả trả về cho Controller , Controller sẽ chuyển đến dữ liệu cho View.
![](https://images.viblo.asia/c0b70245-cecc-4c32-950e-54d8f70b4674.png)
## Ví dụ
Lý thuyết trên khó hiểu ghia, mình sẽ lấy một ví dụ để các bạn dễ hiểu hơn nhé. Chắc hẳn các bạn hay đi uống trà sữa đúng không nào :)))) Một ngày đẹp trời mình đi đến 157 Xã Đàn để uống Lee Tee, khi vào quán thì mình sẽ order đồ uống. Mình là **người dùng**, và trà sữa Ô Long Kem Cheese Size L full topping là **yêu cầu của người dùng** :)))). Nhân viên order vui vẻ tươi vui gật đầu(giả sử quán lúc đó có một nhân viên làm việc vừa order vừa pha chế luôn cho khách). Với bạn nhân viên order, trà sữa là cần làm theo qui trình các bước:
* Lấy cốc
* Gián tem tên đò uống
* Pha trà sữa
* Cho topping
* Đổ lớp kem cheese lên bề mặt
* Đóng hộp
* Đưa đồ cho khách

Não của nhân viên bán trà sữa đong vai trò là **controller**. Ngay khi mình đến order trà sữa thì nhân viên bán trà sữa đã hiểu và bắt đầu công việc. Pha trà sữa bản chất cũng giống như giống như pha các loại nước bình thường, có điều nguyên liệu và công cụ hoàn toàn khác nhau. Bạn nhân viên bán hàng có thể sử dụng công cụ của cửa hàng. Những công cụ đó đóng vai trò là **Model** bao gồm:
* Đôi tay bạn nhân viên
* Nguyên liệu để pha trà sữa
* Máy pha trà
* Đá lạnh
* Máy đóng hộp
* Đường, topping, chân trâu,...

Cuối cùng cốc trà sữa sau khi đóng hộp mà mình cầm trên tay đóng vai trò là **View** được làm nên từ các công cụ trong phần **Model**, chế biến và giao đồ thông qua phần **Controller**(não của bạn nhân viên).
# 2. Eloquent Model
**ORM**(Object Relational Mapping) đây là tên gọi chỉ việc ánh xạ các record dữ liệu trong hệ quản trị cơ sở dữ liệu sang dạng đối tượng mà mã nguồn đang định dạng trong class.
**Eloquent ORM**: Larvel đã sử dụng kỹ thuật ORM giúp lập trình viên thao tác dễ dàng hơn với DB. Trong phần này chúng ta sẽ nói nhiều đến phần kiến thức `Eloquent Model` (Model) - là một phần trong mô hình MVC ở trên. Các Model này sẽ thao tác trực tiếp với DB, xử lý logic nghiệp vụ và trả về dữ liệu cho controller.
## Định nghĩa Model và các thiết lập cơ bản
Chúng ta sẽ định nghĩa ra model bằng câu lệnh `make:model` trong command Artisan.
```go:PHP
php artisan make:model Post
```
Sau khi nhấn lệnh thì trong app/Post.php sẽ sinh ra đoạn code sau:
```php:PHP
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    //
}

```
Để tạo model và migration chúng ta sẽ thêm option `--migration` hoặc `-m`
```shell:PHP
php artisan make:model Post --migration
php artisan make:model Post -m
```
Các bạn chú ý tên model để mapping cho đúng với bảng trong CSDL. Nếu table trong CSDL là `posts` thì tên model đặt đúng theo chuẩn là `Post`.
### Tên bảng
Mặc định nếu như bạn đặt tên model là `Post` thì laravel sẽ mapping với bảng tên `posts`. Những nếu bạn muốn đặt tên bảng khác đi nhưng vẫn phải theo đúng quy chuẩn convention đặt tên trong Laravel nhé(snake case). Ví dụ mình không đặt tên `posts` nữa mà mình đặt tên là `my_posts` chẳng hạn thì biến `$table` trong `Illuminate\Database\Eloquent\Model` sẽ mapping đúng model với tên bảng chúng ta khai báo.
```php:PHP
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'my_posts';
}
```
### Khóa chính của bảng
Theo mặc định trong Laravel thì khóa chính của mỗi bảng sẽ là `id`. Nhưng đôi lúc chúng ta muốn thay đổi trường khóa chính này với tên khác như là `id_post` thì chúng ta có thể khai báo qua biến `$primaryKey`.
```sql:PHP
protected $primaryKey = 'id_post';
```
Các bạn chú ý nhé, kiểu dữ liệu của khóa chính là `int` và nếu các bạn không muốn khóa chính của bạn tự tăng thì `$incrementing = false`. Nếu kiểu dữ liệu của khóa chính không phải là kiểu `int` thì bạn nên set biến `$keyType = 'string'`.
### Timestamps
Mặc định khi các bạn tạo bảng thì sẽ có 2 trường `created_at` và `updated_at`, những khi bạn thêm các bản ghi vào table thì 2 trường này sẽ tự động cập nhật cho nó. để  eloquent không tự cập nhật giá trị cho 2 trường này mỗi khi bạn thêm record thì chúng ta sẽ set trong model như sau:
```objectivec:PHP
public $timestamps = false;
```
Nếu bạn không muốn lưu dữ liệu của timestamp như mặc định của nó bạn có thể thay đổi định dạng của nó trong model như sau:
```sql:PHP
protected $dateFormat = 'd-m-Y';
```
Và nếu bạn muốn custom lại tên cột của `timestamps`, bạn cần set trong model như sau:
```sql:PHP
const CREATED_AT = 'creation_date';
const UPDATED_AT = 'last_update';
```
### Kết nối DB
Tất cả các Eloquent models sẽ sử dụng DB mặc định khai báo trong file .env, nhưng nếu bạn muốn model này kết nối tới một bảng trong CSDL nào đó thì chúng ta sẽ set như sau trong model:
```php:PHP
protected $connection = 'connection-name';
```
### Chú ý
Để chác chắn là model của chúng ta mapping đúng với table trong CSDL hay chưa thì chúng ta sẽ test bằng `Tinker Artisan`. Ví dụ bảng posts có các trường (id, title, content, created_at, updated_at)

![](https://images.viblo.asia/74e4b3aa-7e0b-4b09-874a-e112439e29f8.png)
Nếu trả về `true` thì chứng tỏ Eloquent đã mapping đúng model với table trong CSDL rồi.
## Lấy dữ liệu từ DB
### all
Khi chúng ta đã thiết lập những tham số như trên xong, thì chúng ta bắt tay vào lấy dữ liệu từ DB về. Để lấy tất cả các bản ghi trong 1 table chúng ta dùng `all()`:
```php:PHP
<?php

use App\Post;

$flights = App\Post::all();

foreach ($posts as $post) {
    echo $post->title. "<br>";
}
```
### Thêm rằng buộc cho câu truy vấn
Có những trường hợp mà chúng ta không cần thiết lấy tất cả các record của table ra, nó làm hiệu năng chương trình của chúng ta kém. Nên thêm những rằng buộc cho câu truy vấn là rất quan trọng để giảm bớt query không cần thiết và tăng hiệu năng chương trình.
```rust:PHP
use App\Post;

$post = Post::where('published', true)
             ->orderBy('title', DESC)
             ->take(5)
             ->get();
```
### Collections
Vì các hàm của Eloquent như `all` và `get` đều trả về nhiều kết quả, hay đó là một instance từ `Illuminate\Database\Eloquent\Collection` sẽ được trả về. Class `collection` cũng cấp các hàm hữu ích để làm việc với các kết quả Eloquent trả về. Các bạn có thể tham khảo các collection [ở đây](https://laravel.com/docs/5.6/eloquent-collections). Mình sẽ lấy một ví dụ về cách sử dụng collections nhé.
```perl:PHP
use App\Post;
$posts = Post::all();
$posts = $posts->reject(function ($post) {
    return $post->publish;
});
//Giải thích: câu lệnh trên mang ý nghĩa lấy ra tất cả các bài post chưa publish
```
### Chunk
Nếu bạn muỗn xử lý hàng ngán kết quả từ Eloquent, sử dụng `chunk` sẽ tiết kiệm được memory khi thao tác với tập dữ liệu kết quả lớn. hàm này sẽ lấy từng `chunk` của Eloquent models, cung cấp chúng thông qua `Closure` để xử lý.
```javascript:PHP
Post::chunk(200, function ($posts) {
    foreach ($posts as $post) {
        echo $post->title. "<br>";
    }
    echo "Hết một chunk";
});
```
### Cursors
Hàm `cursor` cho phép bạn duyetj qua records bằng cách sử dụng một cursor(con trỏ), nó chỉ thực thi cho một truy vấn. Khi dữ liệu lớn, hàm `cursor` có thể được sử dụng để giảm memory sử dụng.
```rust:PHP
foreach(Post::where('publish', true)->cursor() as $post) {
    //code
};
```
## Lấy dữ liệu một Model/Aggregates
Ngoài việc lấy tất cả các records của table bằng hàm `all()`, chúng ta có thể lấy model instance bằng hàm `find` hoặc `first`
```rust:PHP
use App\Post;

$post = Post::find(1); // trả về một model instance
// hoặc lấy về một bản ghi đầu tiên trong list model instance trả về
$post = Post::where('publish', true)->first();
```
### NotFound Exception
Nhưng có lúc mà bạn muốn bắn ra một exception nếu instance model không tìm thấy. Hàm `findOrFail` và `firstOrFail` sẽ trả kết quả đầu tiên của query, tuy nhiên nếu không có kết quả, thì `Illuminate\Database\Eloquent\ModelNotFoundException` sẽ được bắn ra cho người dùng. Chúng ta nên đặt trong `try catch`.
```rust:PHP
use App\Post;
use Illuminate\Database\Eloquent\ModelNotFoundException;

try {
    $post = Post::findOrFail(1);
    //hoặc
    $posts = Post::where('publish', true)->firstOrFail();
} catch (ModelNotFoundException $e) {
    echo $e->getMessage();
}
```
Nếu exception mà không được bắt thì một HTTP response 404 sẽ tự động được gửi lại cho user.
### Aggregates
bạn cũng có thể sử dụng các `aggregate method` như `count, sum, max`.
```rust:PHP
$count = Post::where('publish', true)->count();
```
## Insert và Update Models
### Insert
Để tạo một bản ghi mới trong table, thì chúng ta sẽ tạo một model instance, sau đó chúng ta set giá trị của thuộc tính, sau đó dùng phương thức `save()`.
```php:PHP
<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Session;

class PostController extends Controller
{
    public function store(Request $request)
    {

        $post = new Post;
        $post->title = $request->title;
        $post->content = $request->content;
        $post->save();
        Session::flash('success', 'Bạn tạo bài post thành công');
        return redirect()->route('posts')
    }
}
```
Trong ví dụ trên chúng ta không tạo 2 trường `created_at` và `updated_at` mà khi `save()` sẽ tự động fill dữ liệu hai trường đó trong CSDL.
### Updates
Hàm `save()` cũng được dùng để cập nhật model đã tồn tại trong database, dầu tiên bạn cần lấy model instance ra trước, bạn thay đổi các thuốc tính trong model instance, rồi gọi hàm `save()`. Giá trị hàm `updated_at` sẽ tự động được cập nhật, bạn không cần thay đổi thủ công giá trị này.
```php:PHP
<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Session;

class PostController extends Controller
{
    public function store(Request $request)
    {
        $post = Post::find(1);
        $post->title = "Title bài viết thứ 2";
        $post->save();
        Session::flash('success', 'Bạn thay đổi post thành công');
        return redirect()->route('posts')
    }
}
```
### Mass Updates
Nhiều khi chúng ta cần update nhiều bản ghi một lúc thì chúng ta sẽ làm sau đây. Ví dụ như tất cả các các bài post chưa pulish thì sẽ được pulish hết.
```rust:PHP
use App\Post;

Post::where('pulish', false)
    ->update(['publish' => true]);
```
Hàm `update` sẽ nhận một mảng `key => value`, với key chính là tên trường cần update và value chính là giá trị update.
### Mass Assignment
`Mass Assignment` là tính năng cho phép lập trình một cách tự đọng gán các tham số của một HTTP request vào các biến hoặc đối tượng trong lập trình.Ví dụ chúng ta có một form đang ký sản phẩm của người dùng như sau:
```rust:PHP
{!! Form::open(['method' => 'POST', 'route' => 'products.store']) !!}
    {!! Form::label('name') !!} : {!! Form::text('name') !!}
    {!! Form::label('price') !!} : {!! Form::text('price') !!}
    {!! Form::submit('Create') !!}
{!! Form::close() !!}
```
Sau kh i submit form dữ liệu lên chúng ta có thể ghi dữ liệu này vào CSDL bằng đoạn code như sau(ta bỏ qua vấn đề validate dữ liệu nhập vào):
```perl:PHP
use App\Product;

public function store(Request $request)
{
    $data = $request->all();
    $product = Product::create($data);
    if ($product) {
        echo "Tạo mới sản phẩm thành công";
    } else {
        echo "Tạo mới sản phẩm không thành công";
    }
}
```
Thật ngắn gọn và đơn giản đúng không các bạn, tính năng này gọi là Mass Assignment. Tuy nhiên có một lỗ hổng bảo mật xảy ra nếu một người truy cập cố tính gửi dữ liệu `role = 'admin'` trong bảng users chẳng hạn để người đó có quyền là admin. Để xử lý lỗ hổng trong Mass Assignment, Laravel đưa ra thêm hai thuộc tính cho Model là `$fillable` và `$guarded`. Ví dụ
```php:PHP

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 
        'price',
    ];
}
```
`$fillable` cho phép thiết lập các cột trong một bảng có thể sử dụng tính năng Mass Assignment, khi đó ta có thể thực hiện
```perl:PHP
use App\Product;

public function store(Request $request)
{
    $data = $request->all();
    $product = Product::create($data);
    // hoặc 
    $product = new Product($data);
    if ($product) {
        echo "Tạo mới sản phẩm thành công";
    } else {
        echo "Tạo mới sản phẩm không thành công";
    }
}
```
Khi đó kẻ muốn phá hệ thống của chúng ta khổng thể gửi thêm input `role` là trường không có trong `$fillable`. Như vậy lỗ hổng trong Mass Assignment đã được Laravel đã được xử lý. Trái ngược lại với `$fillable` là `$guarded`. Chú ý rằng chúng ta không khai báo cả hai thuộc tính nãy đồng thời lần nhau. Và một vấn đề là `$fillable` và `guarded` chỉ có tác dụng với các phương thức của Eloquent Model, với các phương thức của Query Buider thì nó không có tác dụng.
<br>Có hai phương thức tạo bản ghi mới sử dụng Mass Assignment khác là `firstOrCreate` và `firstOrNew`. Như ngay tên phương thức thì các bạn cũng đoán ra chức năng của từng phương thức.
* `firstOrCreate`: sẽ tìm các bản ghi sử dụng cặp cột và giá trị, nếu không tìm thấy, một bản ghi sẽ được tạo ra với các thuộc tính này.
* `firstOrNew`: nó không ghi vào CSDL mà trả về một instance của model, chỉ ghi dữ liệu vào CSDL sau khi gọi phương thức `save()`.
```cpp:PHP
// Tìm sản phẩm trong CSDl nếu không có thì thêm bản ghi mới vào bảng.
$product = Product::firstOrCreate($request->all());
// Tìm sản phẩm trong CSDL nếu không có thì trả về một instance
$product = Product::firstOrNew($request->all());
$product->save();// Lúc này sản phẩm mới được lưu trong CSDL.
```
Một phương thức nữa cũng rất hay dùng đó là : `updateOrCreate`
```perl:PHP
$product = Product::updateOrCreate([
    'name' => 'Sản phẩm 1',
    'price' => 150000,
]);
//Dùng để update hoặc tạo bản ghi mới.
```
## Deleting Model
Để xóa bản ghi dữ liệu đơn gainr bằng cách chúng ta gọi đến phương thức `delete()`
```rust:PHP
$post = Post::find(1);
$post->delete();
//hoặc
$post = Post::where('id', 1)->delete();
```
### Soft Deleting
Bây giờ bài toán đặt ra là khi chúng ta lỡ tay đã xóa bản ghi khỏi table, bây giờ chúng ta muốn lấy lại nó(khoc). Nhưng không sao, Laravel có cơ chế hỗ trợ người dùng khi lỡ tay xóa một bản ghi có thể lấy lại được đó chính là soft delete (xóa mềm). Tức là tưởng xóa những thực chất không xóa :). Thực chất là chúng ta chỉ thêm một trường `deleted_at` để đánh dấu bản ghi này đã được xóa. Để cho phép một Model có thể thực hiện được đánh dấu bản ghi đã xóa, chúng ta sử dụng trait `Illuminate\Database\Eloquent\SoftDeletes` và thêm `deleted_at` vào thược tính `$dates` của nó.
```php:PHP
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'title',
        'content',
        'publish'
    ];
    protected $dates = ['deleted_at'];
}
```
Trong file migration tạo bảng `posts` bạn nhớ thêm `$table->softDeletes()`.
Khi đó, nếu bạn thực hiện phương thức `delete()` thay vì nó sẽ xóa triệt để trong CSDL thì nó sẽ cập nhật thời gian hiện tại vào trường `deleted_at`, và như vậy bản ghi này coi như là đã xóa khỏi table. Để xem xem bản ghi này đã được đánh dấu là xóa tạm thời hay chưa các bạn sử dụng phương thức `trashed()`.
```markdown:PHP
if ($post->trashed()) {
    echo "bản ghi này đã dánh dấu là xóa mềm";
}
```
Để truy vấn những bản ghi đã xóa thì chúng ta sử dụng `withTrashed()`
```cpp:PHP
$post = Post::withTrashed()
            ->where('id', 1)
            ->get();
// Trả về kết quả bài Post người dùng có id = 1 đã bị xóa mềm.
```
Ngược lại nếu bạn muốn truy vấn kết quả từ những bản ghi mà đã xóa mêm thì bạn sử dụng phương thức `onlyTrashed()`.

Đôi lúc bạn sẽ muốn tất cả các bạn ghi đã xóa mềm rồi quay lại như trước. sử dụng phương thức `restore()`.
```cpp:PHP
Post::withTrashed()
    ->where('id', 1)
    ->restore();
// Bài post có id = 1 sẽ được restore
```
Chú ý, để xóa vĩnh viễn bản ghi dùng phương thức `forceDelete()`.
## Query  Scope
Vấn đề đặt ra là, nhiều khi một rằng buộc nào đó được sử dụng rất nhiều trong các câu truy vấn ở nhiều controller. Vì thế `Scope` sinh ra để giải quyết vấn đề này. Có 2 loại Scope: `Global` và `Local`.
### Global Scope
Với phạm vi biến cục thì định nghĩa scope này sẽ áp dụng cho một Model và những truy vấn liên quan đến nó sẽ được áp dụng thêm rằng buộc. Sau đây mình sẽ lấy một ví dụ cho các bạn xem cách khai báo `global scope` như thế nào nhé.
Đầu tiên ta sẽ tạo thư mục app/Scopes và tạo file PriceScope.php.
```php:PHP
<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class PriceScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @return void
     */
    public function apply(Builder $builder, Model $model)
    {
        $builder->where('price', '>', 200000);
    }
}
```
Để đăng ký global scope thì chúng ta sẽ override lại phương thức `boot()` trong Model.
```php:PHP
<?php

namespace App;

use App\Scopes\PriceScope;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope(new PriceScope);
    }
}
```
Và khi ta sử dụng truy vấn `Product::all()` thì chỉ những product nào có price > 200000 mới được lấy ra. Ngoài ra các bạn còn có thể định nghĩa global scope bằng Closure.
```php:PHP
<?php

namespace App;

use App\Scopes\PriceScope;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('price', function (Builder $builder) {
            return $builder->where('price', '>', 200000);
        });
    }
}
```
Nếu bạn muốn truy cập mà không bị ảnh hưởng nào từ global scope thì chúng ta có thể sử dụng phương thức `withoutGlobalScope`. Nếu ta không truyền tham số nào vào trong phương thức này thì mặc định Laravel sẽ tự hiểu là bỏ hết tất cả các global scope đi.
```cpp:PHP
$product = Product::withoutGlobalScopes()->get();
//hoặc
$product = Product::withoutGlobalScopes(PriceScope::class)->get();
//hoặc
$product = Product::withoutScopes('price')->get();
//hoặc
$product = Product::withoutScopes([
    PriceScope::class, StatusScope::class
])->get();
```
### Local Scope
`Local Scope` định nghĩa ra để phục vụ cho chính Model đó thôi. Các bạn hãy xem ví dụ nhé.
```php:PHP
<?php

namespace App;

use App\Scopes\PriceScope;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected $fillable = [
        'name',
        'price',
        'quantity',
    ];

    public function scopePrice($query)
    {
        return $query->where('price', '>', 200000);
    }
}
```
Khi các bạn dùng chỉ cần gọi đến `price()` là nó sẽ tự hiểu.
```erlang:erlang:PHP
$product = Product::where('quanlity', '>', 10)->price()->get();
```
## Events
Eloquent bắn ra một số các events: creating, created, updating, updated, saving, saved,  deleting, deleted, restoring, restored. Các bạn có thể tìm thấy trong `class Model` có sử dụng `trait HasEvents` trong đó hàm `getObservableEvents()` chứa rất nhiều các events mà Eloquent sẽ bắn ra:
```javascript:PHP
public function getObservableEvents()
    {
        return array_merge(
            [
                'retrieved', 'creating', 'created', 'updating', 'updated',
                'saving', 'saved', 'restoring', 'restored',
                'deleting', 'deleted', 'forceDeleted',
            ],
            $this->observables
        );
    }
```
Sử dụng các events của Eloquent này rất tiện dụng, ví dụ như khi bạn tạo ra một chương trình quảng cáo, thi sau khi bạn `save()` thì events `created` có thể bắn ra notification cho người dùng biết là có một chương trình quảng cáo mới.
### Observers
Nếu chúng ta cần listen nhiều event trong model thì bạn cần tạo một `observer` - nơi chứa tất cả mọi lắng nghe từ event của Eloquent bắn ra.
```php:PHP
<?php

namespace App\Observers;

use App\User;

class UserObserver
{
    /**
     * Listen to the User created event.
     *
     * @param    User  $user
     * @return  void
     */
    public function created(User $user)
    {
        //
    }

    /**
     * Listen to the User deleting event.
     *
     * @param    User  $user
     * @return  void
     */
    public function deleting(User $user)
    {
        //
    }
}
```
Và bạn cần đăng ký trong `AppServiceProvider`.
```php:PHP
<?php

namespace App\Providers;

use App\User;
use App\Observers\UserObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        User::observe(UserObserver::class);
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
```
Ví dụ nhé. Tạo một route đơn giản lưu bài viết mới như sau:
```PHP
Route::get('/create', function () {
	$post = new App\Post;
	$post->title = "Bai viet so 1";
	$post->content = "Day la noi dung bai viet so 1";
	$post->save();
});
```
Tạo thư mục app/Observers và tạo file PostObserver.php như sau:
```php:PHP
<?php

namespace App\Observers;

use App\Post;

class UserObserver
{
    /**
     * Listen to the User created event.
     *
     * @param    User  $user
     * @return  void
     */
    public function created(Post $post)
    {
        echo "Bài viết :". $post->title . "đã được tạo";
    }
}
```
Nhưng các bạn đừng quên đăng ký nó trong `AppServiceProvider` nhé.
```php:PHP
<?php

namespace App\Providers;

use App\Post;
use App\Observers\PostObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Post::observe(PostObserver::class);
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
```
# 3. Kết luận
Bài viết này khá dài nhỉ :))) Mong rằng những phần kiến thức trên đã giúp bạn phần nào thẩm thấu được Eloquent Model. Cảm ơn các bạn đã đọc bài viết của mình.
# 4. Tham khảo
https://laravel.com/docs/5.6/eloquent