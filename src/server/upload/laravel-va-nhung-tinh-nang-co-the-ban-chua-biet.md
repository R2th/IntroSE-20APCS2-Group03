## Giới thiệu
`Laravel` hiện tại là một framework `PHP` rất phổ biển và được sử dụng nhiều trong các dự án. Những tính năng mà nó mang lại rất mạnh mẽ và giúp quá trình phát triển trở nên nhanh chóng hơn rất nhiều. Và trong bài viết lần này, mình sẽ giới thiệu với các bạn một số tính năng của `laravel` mà có thể bạn chưa biết. Những tính năng này không phải là những tính năng cao siêu hay là những tính năng ẩn, nhưng mình thấy các tính năng này không thường xuyên được sử dụng. Vậy các tính năng đó là gì? Bắt đầu tìm hiểu cùng mình nhé :D
## Laravel features you may not know about
### 'where' query on a couple of columns
Giả sử bạn muốn thực hiện câu truy vấn sau đây với sql:
```sql
SELECT * FROM `users`
WHERE
    `name` = 'phanlyhuynh'
    AND `email` = 'lyhuynh@gmail.com'
LIMIT 1
```
Bạn có thể thực hiện điều này trong laravel bằng cách gọi method `where`:
```php
\App\User::whereNameAndEmail('phanlyhuynh','lyhuynh@gmail.com')->first();
```
và điều quan trọng ở đây là `And` ở giữa `Name` và `Email`. Laravel sẽ tự động tìm ra cột nào mà câu lệnh của bạn đề cập đến
<br>
Cũng tương tự như `And`, bạn cũng có thể thực hiện như vậy với `Or`:
```php
 \App\User::whereNameOrEmail('huynh','huynh@gmail.com')->get();
```
### Eloquent's find() can accept multiple rows
Eloquent's find() có thể thực hiện trên nhiều row. Bạn có thể sử dụng method `find()` với nhiều row bằng cách sau đây:
```php
 \App\User::find([1,2,3]);
```
Nếu `find()` được truyền vào một mảng, nó sẽ trả về một tập hợp các Eloquent Model row với các `id` đó (nếu id đó tồn tại)
<br>
cũng như `find()` thì `findOrFail()` cũng có thể thực hiện như thế. Cả hai, chúng ta chỉ cần gọi `findMany()` nếu truyền vào một mảng `id`
### Default Model if relationship return null
Mình nghĩ nhiều bạn sẽ biết điều này, nhưng mình chỉ mới phát hiện ra điều này thôi :v 
<br>
Nếu bạn có một mối quan hệ (`belongsTo`, `MorphOne` or `HasOne`), đôi khi nó có thể trả về null. Trong trường hợp đó, bạn có thể cung cấp giá trị mặc định với phương thức withDefault ().
<br>
Nó sẽ tự động tìm ra loại đối tượng sẽ trả về, nhưng bạn cũng có thể đặt một số thuộc tính mặc định.
<br>
Sau đây là ví dụ:
```php
public function user()
{
    return $this->belongsTo('App\User')->withDefault();
}
 
    //or
 
public function user()
{
    return $this->belongsTo('App\User')->withDefault([
        'name' => 'Guest Author',
    ]);
}
 
    // or
 
public function user()
{
    return $this->belongsTo('App\User')->withDefault(function ($user) {
        $user->name = 'Guest Author';
    });
}
```
### render() method on Exception
Sử dụng phương thức `render()` trên Exception để hiển thị phản hồi HTTP cho người dùng. 
Bạn thực hiện command sau đây để tạo một `exception class`:
```
php artisan make:exception --render ExceptionName
```
Nó sẽ tạo một `exception class` mới ở trong thư mục Exceptions của bạn, với phương thức `render($request)`
<br>
Nếu một `exception` được ném vào và xử lý bởi `app/Exceptions/Handler.php`, nó sẽ kiểm tra bằng phương thức `method_exists($exception, 'render')`. Nếu nó tồn tại, nó sẽ gọi phương thức đó vào `Exception` và trả về cho người dùng
<br>
Dưới đây là một ví dụ của `render()` method trong môt Exception, nó sẽ phản hồi view cho người dùng:
```php
/**
* Render the exception into an HTTP response.
*
* @param    \Illuminate\Http\Request
* @return  \Illuminate\Http\Response
*/
public function render($request)
{
    response()->view('errors.myexception', [], 500);
}
```
Bạn sẽ sử dụng phương thức này để trả về(chẳng hạn như view) sẽ được hiển thị cho người dùng
### The cache's rememberForever($key, function() { return 'something'; }) function
Nếu bạn đã sử dụng tính năng `cache`, khả năng cao bạn sẽ thực hiện như sau :v :
```php
$value = Cache::remember('users', $minutes, function () {
    return DB::table('users')->get();
});
```
Nhưng bạn cũng có thể thực hiện như sau:
```php
$value = Cache::rememberForever('users', function () {
    return DB::table('users')->get();
});
```
 Điều này sẽ lấy một mục từ `cache` hoặc lưu trữ giá trị mặc định mãi mãi
### Eloquent: get a fresh version (fresh()) of the current model and duplicate rows (replicate())
Sử dụng `fresh()` để truy vấn database và lấy phiên bản mới của item hiện tại
```php
$user = \App\User::first();
$user->name = "Something new";
$user = $user->fresh(); // chú ý rằng nó sẽ trả về giá trị mới, nó không ảnh hưởng tới model hiện tại
dump($user->name); // nó sẽ trả về tên gốc, gốc phải "Something newm"
```
Nếu bạn muốn `rehydrate` model đã tồn tại, chúng ta sử dụng refresh():
```php
 $flight = App\Flight::where('number', 'FR 999')->first();
        $flight->number = 'FR 111';
        $flight->refresh();
        $flight->number; // "FR 999"
```
Nếu bạn cần sao chép một Eloquent object, hãy sử dụng:
```php
$new = SomeModel::first()->replicate();
$new->save()
```
Phương thức `replicate` cho phép bạn cung cấp một mảng các thuộc mà bỏ qua không sao chép, ví dụ:
```php
$new = User::first()->replicate(['password']);
$new->save(); // $new sẽ có tất cả các thuộc tính như first User row, nhưng thuộc tính 'password' sẽ không có
```
### Redirecting URLs from within your routes file (web.php)
Thay vì chuyển hướng ở trong controller, bạn có thể chuyển hướng trực tiếp trong file route:
```php
// Nếu ai đó truy cập vào /here, chúng sẽ trả về đường dẫn HTTP tới /there
Route::redirect('/here', '/there', 301); // 301: di chuyển vĩnh viễn
```
Lưu ý: thông số thứ ba là tùy chọn và nó mặc định là chuyển hướng 302 (tạm thời).
### Fallback Routes
Bạn có thể sử dụng Route::fallback(...), sẽ được sử dụng nếu không có route nào khớp. Điều này thường được sử dụng để hiển thị lỗi 404, nhưng cũng có thể hữu ích trong các tình huống khác
### Auth::id()
Mình cũng đã thấy và chính mình cũng rất thường xuyên sử dụng Auth::user()->id, nhưng có cách nhau hơn để thực hiện điều đó là `Auth::id()` để lấy ID của người dùng (hoặc null nếu không đăng nhập)
<br>
Thay vì thực hiện \ Auth :: user (), bạn chỉ có thể thực hiện auth () và sử dụng helper function auth. (Ví dụ đầy đủ: auth () -> id ())
### Simple Pagination
Phân trang(Pagination) thông thường sẽ tính tổng số hàng có bao nhiêu và tính số trang tối đa. Trên các tập dữ liệu lớn, đây không phải là một ý tưởng tốt. Simple pagination sẽ chỉ hiển thị một liên kết trước đó và tiếp theo và thực hiện truy vấn nhanh hơn nhiều trên cơ sở dữ liệu của bạn (vì nó không cần tổng số lượng hàng).
<br>
Bạn sử dụng nó theo cách tương tự như phân trang Laravel bình thường, nhưng chỉ cần gọi SimplePaginate () thay vì paginate ().
```php
$users = DB::table('users')->simplePaginate(15);
```
### Quickly log things with logger() and info()
Sử dụng `info("log some info message")` và `logger("log a debug message")`. Nó trông cleaner hơn `app('log')->debug($message)` or `\Log::debug($message)`... :v
### Set model properties
Trong các Eloquent model của bạn thường chỉ có các thộc tính như: $fillable or $guarded, $casts 
<br>
Nhưng hiếm khi mình thấy các thuộc tính khác được đặt ở model, như:
<br>
- $perPage: Đặt số lượng hàng (mặc định) trên mỗi trang, khi bạn sử dụng phân trang(Paginate) của Eloquent. Tất nhiên, bạn có thể ghi đè lên điều này trong khi call paginate.
```php
/**
     * The number of models to return for pagination.
     *
     * @var  int
     */
    protected $perPage = 15;
```
- $incrementing: Nếu bạn có một bảng không muốn các hàng có ID tăng tự động thì bạn sẽ  đặt các mục sau thành false:
```php
/**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var  bool
     */
    public $incrementing = true;
```
### Eloquent Relationships: Only return models if they actually have a relationship row with has()
Nếu bạn có 2 model là Post và Comment. Chúng có quan hệ OneToMany. Nếu bạn muốn lấy tất cả các bài Post với Comment, bạn có thể thực hiện bằng cách:
```php
$postComments = Post::with('comments)->get();
```
Tuy nhiên, nó sẽ trả về cả các Post mà có 0 comments. Nếu bạn chỉ muốn lấy các Post >0 comments, bạn có thể thực hiện nó với `has()`:
```php
$postComments = Post::with('comments')->has('comments')->get();
```
## Kết luận
Trên đây là một số tính năng mà mình giới thiệu với các bạn. Và những tính năng này chắc chắn sẽ có nhiều bạn sẽ biết một hay nhiều cái mà mình đã giới thiệu và cũng có thể là tất cả. Nhưng có thể một số bạn sẽ tìm thấy được một số tính năng mới từ danh sách trên. 
<br>
Cảm ơn các bạn đã xem bài viết của mình. Nếu thấy bài viết hữu ích hãy upvote giúp mình nhé :D <3