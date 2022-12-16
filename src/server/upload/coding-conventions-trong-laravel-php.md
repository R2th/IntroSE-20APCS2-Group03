Trong bài viết này mình sẽ chia sẻ các quy ước viết code trong Laravel & PHP nhé.<br>
### General PHP Rules
Code style phải theo chuẩn [PSR-1](https://www.php-fig.org/psr/psr-1/), [PSR-2](https://www.php-fig.org/psr/psr-2/) and [PSR-12](https://www.php-fig.org/psr/psr-12/) . Nói chung mọi thứ như là strings cái không được public-facing(hiển thị công khai) thì nên sử dụng quy tắc đặt tên camelCase.

### Void return types
Nếu một phương thức không trả về cái gì, nó nên được trả về kiểu void. Điều này làm cho người khác đọc code của bạn hiểu hơn về code của bạn viết.

### Typed properties
Bạn nên định nghĩa loại thuộc tính bất cứ khi nào có thể. Không sử dụng một docblock.
```php
// good
class Foo
{
    public string $bar;
}

// bad
class Foo
{
    /** @var string */
    public $bar;
}
```
### Docblocks
Không sử dụng docblocks  cho methods cái bạn có thể thêm type hinted đầy đủ( trừ khi bạn cần mô tả). <br>
Chỉ thêm một mô tả khi nó cung cấp nhiều ngữ cảnh.Sử dụng các câu đầy đủ để mô tả, bao gồm cả dấu chấm ở cuối.
```php
// Good
class Url
{
    public static function fromString(string $url): Url
    {
        // ...
    }
}

// Bad: The description is redundant, and the method is fully type-hinted.
class Url
{
    /**
     * Create a url from a string.
     *
     * @param string $url
     *
     * @return \Spatie\Url\Url
     */
    public static function fromString(string $url): Url
    {
        // ...
    }
}
```
Luôn sử dụng tên lớp đầy đủ trong docblock.
```
// Good

/**
 * @param string $url
 *
 * @return \Spatie\Url\Url
 */

// Bad

/**
 * @param string $foo
 *
 * @return Url
 */
```
Docblocks cho các biến lớp là bắt buộc, vì hiện tại không có cách nào khác để gõ các biến này.
```
// Good

class Foo
{
    /** @var \Spatie\Url\Url */
    private $url;

    /** @var string */
    private $name;
}

// Bad

class Foo
{
    private $url;
    private $name;
}
```
Khi có thể, docblock nên được viết trên một dòng.
```
// Good

/** @var string */
/** @test */

// Bad

/**
 * @test
 */
```
Nếu một biến có nhiều kiểu, thì kiểu xuất hiện phổ biến nhất là kiểu đầu tiên.
```
// Good

/** @var \Spatie\Goo\Bar|null */

// Bad

/** @var null|\Spatie\Goo\Bar */
```
### Strings
```
// Good
$greeting = "Hi, I am {$name}.";

// Bad
$greeting = 'Hi, I am ' . $name . '.';
```
### Ternary operators
Mỗi phần của một biểu thức bậc ba phải nằm trên một dòng riêng trừ khi đó là một biểu thức thực sự ngắn.
```php
// Good
$result = $object instanceof Model
    ? $object->name
    : 'A default value';

$name = $isFoo ? 'foo' : 'bar';

// Bad
$result = $object instanceof Model ?
    $object->name :
   'A default value';
```
### If statements
**Bracket position**<br>
Luôn sử dụng dấu ngoặc nhọn.
```php
// Good
if ($condition) {
   ...
}

// Bad
if ($condition) ...
```
**Happy path**<br>
Nói chung, một hàm nên có phần **unhappy path** ở trước và phần **happy path** ở sau cùng. Trong hầu hết các trường hợp, điều này sẽ làm cho phần **happy path** nằm trong một phần không được chú ý của hàm khiến nó dễ đọc hơn.
```php
// Good

if (! $goodCondition) {
  throw new Exception;
}

// do work
```
```php
// Bad

if ($goodCondition) {
 // do work
}

throw new Exception;
```
**Avoid else**<br>
Tránh sử dụng else bởi vì nó làm code khó đọc hơn. Trong hầu hết các trường hợp, nó có thể được cấu trúc lại bằng cách sử dụng trả về sớm. Điều này cũng sẽ khiến phần **happy path** ở cuối cuối cùng, điều đáng mong đợi.
```php
// Good

if (! $conditionBA) {
   // conditionB A failed
   
   return;
}

if (! $conditionB) {
   // conditionB A passed, B failed
   
   return;
}

// condition A and B passed
```
```php
// Bad

if ($conditionA) {
   if ($conditionB) {
      // condition A and B passed
   }
   else {
     // conditionB A passed, B failed
   }
}
else {
   // conditionB A failed
}
```
**Compound ifs**<br>
Nói chung, các câu lệnh if riêng biệt nên được ưu tiên hơn một điều kiện ghép. Điều này làm cho việc gỡ lỗi code dễ dàng hơn.
```php
// Good
if (! $conditionA) {
   return;
}

if (! $conditionB) {
   return;
}

if (! $conditionC) {
   return;
}

// do stuff
```
```php
// bad
if ($conditionA && $conditionB && $conditionC) {
  // do stuff
}
```
### Comments
Nên tránh tối đa nhận xét bằng cách viết mã biểu cảm. Nếu bạn cần sử dụng nhận xét, hãy định dạng nó như sau:
```
// There should be a space before a single line comment.

/*
 * If you need to explain a lot you can use a comment block. Notice the
 * single * on the first line. Comment blocks don't need to be three
 * lines long or three characters shorter than the previous line.
 */
```
### Whitespace
Các câu lệnh phải có hơi thở. Nói chung, luôn luôn thêm các dòng trống giữa các câu lệnh, trừ khi chúng là một chuỗi các thao tác tương đương với một dòng.
```php
// Good
public function getPage($url)
{
    $page = $this->pages()->where('slug', $url)->first();

    if (! $page) {
        return null;
    }

    if ($page['private'] && ! Auth::check()) {
        return null;
    }

    return $page;
}

// Bad: Everything's cramped together.
public function getPage($url)
{
    $page = $this->pages()->where('slug', $url)->first();
    if (! $page) {
        return null;
    }
    if ($page['private'] && ! Auth::check()) {
        return null;
    }
    return $page;
}
```
```php
// Good: A sequence of single-line equivalent operations.
public function up()
{
    Schema::create('users', function (Blueprint $table) {
        $table->increments('id');
        $table->string('name');
        $table->string('email')->unique();
        $table->string('password');
        $table->rememberToken();
        $table->timestamps();
    });
}
```
Không thêm bất kỳ dòng trống nào giữa các dấu ngoặc vuông {}.
```php
// Good
if ($foo) {
    $this->foo = $foo;
}

// Bad
if ($foo) {

    $this->foo = $foo;

}
```
### Configuration
Các tệp cấu hình phải sử dụng quy tắc đặt tên kebab-case(dấu gạch ngang).
```
config/
  pdf-generator.php
```
Các key cấu hình phải sử dụng quy tắc đặt tên snake_case(dấu gạch dưới).
```php
// config/pdf-generator.php
return [
    'chrome_path' => env('CHROME_PATH'),
];
```
Tránh sử dụng trình trợ giúp env bên ngoài tệp cấu hình. Hãy tạo giá trị cấu hình từ biến env như trên.
### Artisan commands
Tất cả các tên được đặt cho các lệnh thủ công đều phải được đặt bằng kebab-cased.
```
# Good
php artisan delete-old-records

# Bad
php artisan deleteOldRecords
```
### Routing
Các url hiển thị công khai(Public-facing urls) phải sử dụng quy tắc đặt tên kebab-case.
```
https://spatie.be/open-source
https://spatie.be/jobs/front-end-developer
```
Route names phải sử dụng camelCase.
```php
Route::get('open-source', 'OpenSourceController@index')->name('openSource');
```
```php
<a href="{{ route('openSource') }}">
    Open Source
</a>
```
Tất cả các routes đều có một  http verb(get, post, put, delete), đó là lý do tại sao chúng tôi thích đặt verb này đầu tiên khi xác định một route. Nó làm cho một nhóm các routes rất dễ đọc. Bất kỳ tùy chọn route nào khác nên đi sau nó.
```php
// good: all http verbs come first
Route::get('/', 'HomeController@index')->name('home');
Route::get('open-source', 'OpenSourceController@index')->name('openSource');

// bad: http verbs not easily scannable
Route::name('home')->get('/', 'HomeController@index');
Route::name('openSource')->get('OpenSourceController@index');
```
Route parameters nên sử dụng quy tắc camelCase.
```php
Route::get('news/{newsItem}', 'NewsItemsController@index');
```
route url không được bắt đầu bằng / trừ khi url là một chuỗi trống.
```php
// good
Route::get('/', 'HomeController@index');
Route::get('open-source', 'OpenSourceController@index');

//bad
Route::get('', 'HomeController@index');
Route::get('/open-source', 'OpenSourceController@index');
```
### Controllers
Controllers phải đặt tên theo số nhiều.
```php
class PostsController
{
    // ...
}
```
Cố gắng giữ cho bộ điều khiển đơn giản và bám vào các từ khóa CRUD mặc định(index, create, store, show, edit, update, destroy). 

Trong ví dụ sau, chúng ta có PostsController@favorite và PostsControlle@unfavorite, hoặc chúng ta có thể giải nén nó vào một FavoritePostsController riêng biệt.
```php
class PostsController
{
    public function create()
    {
        // ...
    }

    // ...

    public function favorite(Post $post)
    {
        request()->user()->favorites()->attach($post);

        return response(null, 200);
    }

    public function unfavorite(Post $post)
    {
        request()->user()->favorites()->detach($post);

        return response(null, 200);
    }
}
```
Ở đây chúng ta quay trở lại các từ CRUD mặc định, store và destroy.
```php
class FavoritePostsController
{
    public function store(Post $post)
    {
        request()->user()->favorites()->attach($post);

        return response(null, 200);
    }

    public function destroy(Post $post)
    {
        request()->user()->favorites()->detach($post);

        return response(null, 200);
    }
}
```
### Views
View files phải sử dụng camelCase.
```
resources/
  views/
    openSource.blade.php
```
```php
class OpenSourceController
{
    public function index() {
        return view('openSource');
    }
}
```
### Validation
Khi sử dụng nhiều quy tắc cho một trường trong một yêu cầu biểu mẫu, hãy tránh sử dụng |, luôn sử dụng ký hiệu mảng. Sử dụng ký hiệu mảng sẽ giúp áp dụng các lớp quy tắc tùy chỉnh cho một trường dễ dàng hơn.
```php
// good
public function rules()
{
    return [
        'email' => ['required', 'email'],
    ];
}

// bad
public function rules()
{
    return [
        'email' => 'required|email',
    ];
}
```
Tất cả các quy tắc xác thực tùy chỉnh phải sử dụng snake_case:
```php
Validator::extend('organisation_type', function ($attribute, $value) {
    return OrganisationType::isValid($value);
});
```
### Blade Templates
Thụt lề bằng cách sử dụng bốn dấu cách.
```
<a href="/open-source">
    Open Source
</a>
```
Không thêm dấu cách sau cấu trúc điều khiển.
```
@if($condition)
    Something
@endif
```
### Authorization
Các chính sách phải sử dụng camelCase.
```php
Gate::define('editPost', function ($user, $post) {
    return $user->id == $post->user_id;
});
```
```
@can('editPost', $post)
    <a href="{{ route('posts.edit', $post) }}">
        Edit
    </a>
@endcan
```
### Translations
Translations phải được hiển thị bằng hàm \__ .  Chúng tôi thích sử dụng cái này hơn @lang trong Blade vì \__  có thể được sử dụng trong cả các chế độ xem Blade và mã PHP thông thường. Dưới đây là một ví dụ:
```
<h2>{{ __('newsletter.form.title') }}</h2>

{!! __('newsletter.form.description') !!}
```

Tham khảo: [https://github.com/spatie/guidelines.spatie.be/blob/master/content/code-style/laravel-php.md](https://github.com/spatie/guidelines.spatie.be/blob/master/content/code-style/laravel-php.md)