Laravel v9 là phiên bản LTS tiếp theo của Laravel và ra mắt vào tháng 2 năm 2022. Trong bài viết này, mình xin giới thiệu một vài tính năng mới trong Laravel trong Laravel 9.0
# PHP Version
Laravel 9 yêu cầu sử dụng phiên bản tối thiểu là PHP 8 và Symfony 6.0

# Route:list
Lệnh `routes:list` đã được đưa vào Laravel từ lâu, nhưng có một số vấn đề đôi khi nảy sinh khi bạn xác định một route lớn và phức tạp, nó có thể trở nên khó kiểm soát. Nhờ có Nuno Maduro nên `route:list` đã trở nên dễ dàng và đẹp mắt hơn.
![](https://images.viblo.asia/7a3dacbb-83f0-4f85-b30e-509e09949c8d.jpg)

# artisan test --coverage
Câu lệnh `artisan test --coverage` sẽ hiển thị phạm vi kiểm tra trực tiếp trên thiết bị đầu cuối. Nó cũng bao gồm một `--min` tùy chọn mà bạn có thể sử dụng để chỉ ra mức thực thi ngưỡng tối thiểu cho phạm vi kiểm tra.
![](https://images.viblo.asia/4640ed21-1d30-4be4-aa6c-59c26f3da94d.jpg)

# Anonymous trong Migrations
Trước đây, mỗi khi bạn chạy lệnh `make:migration` thì sẽ tạo ra một class có tên dựa theo tên mà bạn đặt, điều này dễ xảy ra xung đột khi vô tình bạn đặt trùng tên với tên migration đã tạo trước đó. 
Ở phiên bản 8.x Laravel đã ra mắt với một tính năng mới được gọi là **Anonymous Stub** giúp ngăn chặn xung đột tên của class migration. 
Kể từ bây giờ, khi bạn chạy make:migration thì nó sẽ return về là một class Anonymous thay vì một class có tên.

```
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
 
return new class extends Migration {
 
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('people', function (Blueprint $table) {
            $table->string('first_name')->nullable();
        });
    }
};
```

# Query Builder Interface
Ở phiên bản trước đây, khi chúng ta sử dụng `QueryBuilder` ở trong các câu lệnh `where` nên khó khăn khi nó là `Query\Builder` hay đôi khi là `Eloquent\Builder`.
Bạn có thể tham khảo thêm tại https://github.com/laravel/framework/pull/37956:
```
return Model::query()
	->whereNotExists(function($query) {
		// $query is a Query\Builder
	})
	->whereHas('relation', function($query) {
		// $query is an Eloquent\Builder
	})
	->with('relation', function($query) {
		// $query is an Eloquent\Relation
	});
```
Ở phiên bản Laravel 9 tính năng này bổ sung một `Illuminate\Contracts\Database\QueryBuilder` mới  và một `Illuminate\Database\Eloquent\Concerns\DecoratesQueryBuilder` đặc điểm thực hiện thay cho `__call` hiện tại. Giúp cho IDE hay VS Code đồng nhất.

# PHP 8 String Functions
Vì mức tối thiểu là PHP 8, nên một số function trước đây bị bỏ đi nên **Tom Schlick** đã gửi PR để chuyển sang sử dụng `str_contains()` và `str_starts_with()` các `str_ends_with()` chức năng nội bộ trong lớp `\Illuminate\Support\Str`.

# SwiftMailer to Symfony Mailer
Các bản phát hành trước của Laravel đã sử dụng thư viện [Swift Mailer](https://swiftmailer.symfony.com/docs/introduction.html) để tạo object mail và gửi email. Tuy nhiên, thư viện đó không còn được duy trì và đã được thay bởi Symfony Mailer. Vui lòng xem lại [hướng dẫn nâng cấp](https://laravel.com/docs/master/upgrade#symfony-mailer) để tìm hiểu thêm về cách đảm bảo ứng dụng của bạn tương thích với Symfony Mailer.

# Flysystem 3.x
Laravel 9.x nâng cấp phụ thuộc vào hệ thống Flysystem để lên Flysystem 3.x. Flysystem cung cấp cho tất cả các giao tiếp hệ thống tệp được cung cấp bởi `Storage`.

# Improved Eloquent Accessors / Mutators
**Accessors** và **Mutators** là những phương thức, khi chúng ta đặt nó thì các bạn có thể gọi properties từ một model, khi properties không có trong model thì nó sẽ tìm **Accessors** bằng phương thức GET, ngược lại với **Accessors**, **Mutators** là phương thức SET.
Laravel 9.x cung cấp một cách mới để xác định các [trình truy cập và trình đột biến Eloquent](https://laravel-news.com/docs/%7B%7Bversion%7D%7D/eloquent-mutators#accessors-and-mutators).
```
public function getNameAttribute($value)
{
    return strtoupper($value);
}
 
public function setNameAttribute($value)
{
    $this->attributes['name'] = $value;
}
```
Ở trên gồm 2 function là `getNameAttribute` trả về `value` in HOA và `setNameAttribute` trả về `attributes name` là `value` 
Tuy nhiên, trong Laravel 9.x, bạn có thể xác định bằng một phương thức duy nhất và trả về `Illuminate\Database\Eloquent\Casts\Attribute`:
```
use Illuminate\Database\Eloquent\Casts\Attribute;
 
public function name(): Attribute
{
    return new Attribute(
        get: fn ($value) => strtoupper($value),
        set: fn ($value) => $value,
    );
}
```
Ngoài ra, cách tiếp cận mới này để xác định trình truy cập sẽ lưu vào bộ nhớ cache các giá trị đối tượng được trả về bởi thuộc tính, giống như [các lớp truyền tùy chỉnh](https://laravel-news.com/docs/%7B%7Bversion%7D%7D/eloquent-mutators#custom-casts):
```
use App\Support\Address;
use Illuminate\Database\Eloquent\Casts\Attribute;
 
public function address(): Attribute
{
    return new Attribute(
        get: fn ($value, $attributes) => new Address(
            $attributes['address_line_one'],
            $attributes['address_line_two'],
        ),
        set: fn (Address $value) => [
            'address_line_one' => $value->lineOne,
            'address_line_two' => $value->lineTwo,
        ],
    );
}
```

# Implicit Route Bindings With Enums
PHP 8.1 giới thiệu hỗ trợ cho [Enums](https://www.php.net/manual/en/language.enumerations.backed.php). Laravel 9.x giới thiệu khả năng gõ-gợi ý một Enum trên định nghĩa tuyến của bạn và Laravel sẽ chỉ gọi tuyến nếu đoạn tuyến đó là một giá trị Enum hợp lệ trong URI. Nếu không, phản hồi HTTP 404 sẽ được trả về tự động. Ví dụ:
```
enum Category: string
{
    case Fruits = 'fruits';
    case People = 'people';
}
```
Bạn có thể xác định một tuyến sẽ chỉ được gọi nếu` {category}` đoạn tuyến là `fruits` hoặc `people`. Nếu không, phản hồi HTTP 404 sẽ được trả về:
```
Route::get('/categories/{category}', function (Category $category) {
    return $category->value;
});
```

# Controller Route Groups
Bây giờ bạn có thể sử dụng phương pháp `controller` để xác định bộ điều khiển chung cho tất cả các `route` trong nhóm. Sau đó, khi xác định các `route`, bạn chỉ cần cung cấp phương thức `controller` mà chúng gọi:
```
use App\Http\Controllers\OrderController;
 
Route::controller(OrderController::class)->group(function () {
    Route::get('/orders/{id}', 'show');
    Route::post('/orders', 'store');
});
```

# Enum Eloquent Attribute Casting
Eloquent hiện cho phép bạn truyền các giá trị thuộc tính của mình sang các `enum` PHP. Để thực hiện điều này, bạn có thể chỉ định thuộc tính và enum mà bạn muốn truyền trong `$casts` mảng thuộc tính của mô hình:
```
use App\Enums\ServerStatus;
 
/**
 * The attributes that should be cast.
 *
 * @var array
 */
protected $casts = [
    'status' => ServerStatus::class,
];
```
Khi bạn đã xác định kiểu truyền trên mô hình của mình, thuộc tính được chỉ định sẽ tự động được truyền đến và đi từ một `enum` khi bạn tương tác với thuộc tính:

```
if ($server->status == ServerStatus::provisioned) {
    $server->status = ServerStatus::ready;
 
    $server->save();
}
```

# Forced Scoped Bindings
Tính này mới này khá thú vị và hữu ích. Forced Scoping Of Route Bindings tạm hiểu là ràng buộc định tuyến.
**Ví dụ:** hãy xem xét định nghĩa tuyến đường này truy xuất một bài đăng trên blog bằng slug cho một người dùng cụ thể
```
use App\Models\Post;
use App\Models\User;
 
Route::get('/users/{user}/posts/{post:slug}', function (User $user, Post $post) {
    return $post;
});
```
Với route này thì** $post** và **$user** sẽ không có sự ràng buộc nào lẫn nhau. Có nghĩa là *$post* sẽ được lấy từ **id** ở đường dẫn và gọi query vào Model **Post**.
Nhưng khi sử dụng thêm **scopeBindings()** như thế này thì **$post** sẽ được ràng buộc thêm điều kiện **user_id** bằng với id của **$user**.
```
use App\Models\Post;
use App\Models\User;
 
Route::get('/users/{user}/posts/{post}', function (User $user, Post $post) {
    return $post;
})->scopeBindings();
```
Hoặc, bạn có thể hướng dẫn toàn bộ nhóm định nghĩa tuyến sử dụng liên kết theo phạm vi:
```
Route::scopeBindings()->group(function () {
    Route::get('/users/{user}/posts/{post}', function (User $user, Post $post) {
        return $post;
    });
});
```

Điều này sẽ rất hữu ích khi bạn làm việc với các dữ liệu quan hệ. 
# Route Controller Group
Như laravel 8 việc khai báo controller sẽ thực hiện bằng cách:
```
use App\Http\Controllers\ExampleController;

Route::get('/examp/{id}', [ExampleController::class, 'show']);
Route::post('/examp', [ExampleController::class, 'store']);
```
Cái này cũng là một cải tiến rất hữu ích, nếu như trước đây khi viết route mà gặp controller có nhiều phương thức thì chúng ta sẽ phải lặp đi lặp lại code khá là dài dòng. Giờ đây thì chúng ta có thể viết lại nó một cách ngắn gọn và dễ hiểu hơn.
```
use App\Http\Controllers\ExampleController;

Route::controller(ExampleController::class)->group(function() {
    Route::get('/examp/{id}', 'show');
    Route::post('/examp', 'store');
});
```

# Laravel Breeze API & Next.js
Bộ khởi động Laravel Breeze đã nhận được chế độ giàn giáo "API" và triển khai [giao diện người dùng Next.js miễn phí](https://github.com/laravel/breeze-next) . Bộ khởi động này có thể được sử dụng để khởi động các ứng dụng Laravel của bạn đang đóng vai trò là chương trình phụ trợ, API được xác thực Laravel Sanctum cho giao diện người dùng JavaScript.

# Laravel Scout Database Engine
Nếu ứng dụng của bạn tương tác với cơ sở dữ liệu có kích thước vừa và nhỏ hoặc có khối lượng công việc nhẹ, giờ đây bạn có thể sử dụng công cụ "cơ sở dữ liệu" của Scout thay vì dịch vụ tìm kiếm chuyên dụng như Algolia hoặc MeiliSerach. Công cụ cơ sở dữ liệu sẽ sử dụng các mệnh đề "nơi thích" và chỉ mục văn bản đầy đủ khi lọc kết quả từ cơ sở dữ liệu hiện có của bạn để xác định kết quả tìm kiếm thích hợp cho truy vấn của bạn.

# Full Text Indexes / Where Clauses
Khi sử dụng MySQL hoặc PostgreSQL, phương thức `fullText` hiện có thể được thêm vào định nghĩa cột để tạo chỉ mục văn bản đầy đủ:
```
$table->text('bio')->fullText();
```
Ngoài ra, các phương thức `whereFullText` và `orWhereFullText` có thể được sử dụng để thêm văn bản đầy đủ mệnh đề **"where"** vào truy vấn cho các cột có chỉ mục văn bản đầy đủ. Các phương thức này sẽ được Laravel chuyển thành SQL thích hợp cho hệ thống cơ sở dữ liệu bên dưới. Ví dụ: mệnh đề **MATCH AGAINST** sẽ được tạo cho các ứng dụng sử dụng MySQL:
```
$users = DB::table('users')
           ->whereFullText('bio', 'web developer')
           ->get();
```

# Rendering Inline Blade Templates
Tính năng này mình đã tìm kiếm rất lâu rồi, và bây giờ nó đã được tích hợp vào trong bản cập nhật này.
Trước đây, thỉnh thoảng mình có một số task cần render một đoạn text thành HTML. Và mình đã phải rất cực khổ chỉ để render một dòng text. Nào là phải khai báo rất nhiều, hoặc là phải tạo ra một file blade tạm chỉ để render nội dung ra. Nhưng giờ đây nó đã được đơn giản hoá bằng một dòng code như sau:
```
use Illuminate\Support\Facades\Blade;
 
return Blade::render('Hello, {{ $name }}', ['name' => 'Julian Bashir']);
```

# Soketi Echo Server
Mặc dù không dành riêng cho Laravel 9.x, nhưng gần đây Laravel đã hỗ trợ tài liệu về Soketi, một máy chủ Web Socket tương thích với [Laravel Echo](https://laravel-news.com/docs/%7B%7Bversion%7D%7D/broadcasting) được viết cho Node.js. Soketi cung cấp một giải pháp thay thế mã nguồn mở tuyệt vời cho Pusher và Ably cho những ứng dụng thích quản lý máy chủ Web Socket của riêng họ.

# Bootstrap 5 Pagination Views
Laravel hiện bao gồm các dạng xem phân trang được xây dựng bằng Bootstrap 5. Để sử dụng các dạng xem này thay vì các dạng xem Tailwind mặc định, bạn có thể gọi phương thức của `useBootstrapFive` trình phân trang trong phương thức `boot` của lớp `App\Providers\AppServiceProvider` của bạn:
```
use Illuminate\Pagination\Paginator;
 
/**
 * Bootstrap any application services.
 *
 * @return void
 */
public function boot()
{
    Paginator::useBootstrapFive();
}
```

# Improved Ignition Exception Page
Ignition, trang gỡ lỗi ngoại lệ nguồn mở do Spatie tạo, đã được thiết kế lại từ đầu. Ignition mới, cải tiến đi kèm với Laravel 9.x và bao gồm các chủ đề sáng / tối, chức năng "mở trong trình chỉnh sửa" có thể tùy chỉnh và hơn thế nữa.
![](https://images.viblo.asia/df90f2a0-955b-490d-a095-a5485497ffe3.png)

# New Helpers
Laravel 9.x giới thiệu hai chức năng trợ giúp mới, tiện lợi mà bạn có thể sử dụng trong ứng dụng của riêng mình.
## str
Hàm `str` trả về một thể hiện mới `Illuminate\Support\Stringable` chuỗi đã cho. Hàm này tương đương với phương thức `Str::of`:
```
$string = str('Taylor')->append(' Otwell');
 
// 'Taylor Otwell'
```
Nếu không có đối số nào được cung cấp cho hàm `str`, hàm sẽ trả về một thể hiện của `Illuminate\Support\Str`:
```
$snake = str()->snake('LaravelFramework');
 
// 'laravel_framework'
```
## to_route
Hàm `to_route` phản hồi HTTP chuyển hướng cho một `route` được đặt tên nhất định, cung cấp một cách chuyển hướng rõ ràng đến các `route` được đặt tên từ các `route` và `controller` của bạn:
```
return to_route('users.show', ['user' => 1]);
```
Nếu cần, bạn có thể chuyển mã trạng thái HTTP sẽ được gán cho chuyển hướng và bất kỳ tiêu đề phản hồi bổ sung nào làm đối số thứ ba và thứ tư cho phương thức `to_route`:
```
return to_route('users.show', ['user' => 1], 302, ['X-Framework' => 'Laravel']);
```

# server.php removed
Một tính năng nhỏ nhưng bây giờ bạn có thể xóa **server.php** tệp khỏi dự án của mình. Tập tin này chỉ được sử dụng cho `php artisan serve`.

# Checked / Selected Blade Directives
Trước đây mình đã phải tự viết một helper để kiểm tra trạng thái **checked** hoặc **selected** của thẻ **input** và **select**, Nhưng giờ đây  đã có thể sử dụng **@checked** và **@selected** để đơn giản hoá việc đó.
```
<input type="checkbox"
        name="active"
        value="active"
        @checked(old('active', $user->active)) />
```

# And More...
Xem thêm tại: [Trang chính thức Laravel Releases](https://laravel.com/docs/master/releases)