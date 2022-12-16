Nguồn: https://laraveldaily.com
## Tip 51 Đừng filter giá trị NULL trong Collections. 
Trong Eloquent, chúng ta có thể filter (lọc) giá trị theo giá trị **Null**. Tuy nhiên, trong collection, sẽ không thể lọc theo giá trị null nữa, mà thay vào đó sẽ là kí tự rỗng. 
```php
// Code sẽ hoạt động
$messages = Message::where('read_at is null')->get();
// Cái này sẽ không hoạt động, trả về 0 
$messages = Message::all();
$unread_messages = $messages->where('read_at is null')->count();
// Sẽ hoạt động
$unread_messages = $messages->where('read_at',  '')->count();
```

## Tip 52 Giá trị mặc định tiêu đề Email của các thông báo Laravel
Nếu bạn gửi Laravel notification và không đặt giá trị cho tiêu đề trong hàm **toMail()**, thì gái trị mặc định của thông báo của bạn là tên của class, in hoa từng chữ (CamelCased) và cách nhau bởi dấu cách. 
Ví dụ nếu chúng ta có một class 
```php
class UserRegistrationEmail extends Notification { // ...
```
thì khi bạn nhận email thông báo, tiêu đề mặc định của email là **User Registration Email**

## Tip 53 Composer: kiểm tra xem có version mới.
Nếu bạn muốn biết, trong các package (gói cài đặt) trong **package.json**, package nào có bản release mới, thì bạn có thể chạy lệnh **composer outdated**. Bạn sẽ lấy thông tin của tất cả các gói có version mới đã được release. 
```bash
phpdocumentor/type-resolver 0.4.0 0.7.1
phpunit/php-code-coverage 6.1.4 7.0.3 Library that provides collection, processing, and rende...
phpunit/phpunit
7.5.9 8.1.3 The PHP Unit Testing framework.
ralouphie/getallheaders 2.0.5 3.0.3 A polyfill for getallheaders.
sebastian/global-state 2.0.0 3.0.0 Snapshotting of global state
```

## Tip 54 Route Fallback- Khi đường dẫn không phù hợp với bất kỳ route nào đã được định nghĩa. 
Trong trường hợp nhập một đường dẫn bất kỳ mà không phù hợp với bất kỳ một route nào đã được định nghĩa trước đó. Thông thường sẽ tung ra trang 404. Tuy nhiên, bạn cũng có thể định nghĩa lại điều này bằng cách sử dụng route fallback. route fallback cho phép đinh nghĩa logic xử lý trong đường dẫn url không phù hợp với bất kỳ một route nào thay vì việc tung ra trang 404.
```php
Route::fallback(function() {
    return 'Hm, why did you land here somehow?';
});
```

## Tip 55 Tạo *blade directive* của chính bạn. 
Thực hiện điều này khá dễ dàng. Bạn chỉ thêm method (phương thức, hàm) vào trong file **app/Providers/AppServiceProvider.php**. 
Ví dụ, nếu bạn thay thế thẻ **<br>** bằng dòng mới, có thể làm như sau: 
```php
    <textarea>@br2nl($post->post_text)</textarea>
```
và thêm directive trong phương thức **boot** trong **AppServiceProvider**
```php
public function boot()
{
Blade::directive('br2nl', function ($string) {
    return "<?php echo preg_replace('/\<br(\s*)?\/?\>/i', \"\n\",
    $string); ?>";
   });
}
```

## Tip 56 Sử dụng **withCount()** để đếm số lượng các bản ghi con. 
Trong quan hệ **hasMany()**, nếu bạn muốn tính toán xem có bao nhiêu bản ghi con, mà không cần các thông tin của các bản ghi con. thì hãy sử dụng **withCount()**. 
Ví dụ, bạn muốn đếm số lượng bài viết (posts) và số lượng bình luận (comments) của từng users. 
```php
public function index()
{
    $users = User::withCount(['posts', 'comments'])->get();
    return view('users', compact('users'));
}
```

Như vậy ở trên .blade bạn có thể sử dụng **[relatioship]_count**  
```blade
@foreach ($users as $user)
    <tr>
         <td>{{ $user->name }}</td>
        <td class="text-center">{{ $user->posts_count }}</td>
        <td class="text-center">{{ $user->comments_count }}</td>
   </tr>
@endforeach
```

## Tip 57 Sử dụng groupBy trong Collections với tùy chọn callback function
Nếu bạn muốn nhóm kết quả theo một số điều kiện mà không có trực tiếp trong database, thì có thể sử dung closure function
Ví dụ, bạn muốn nhóm các users theo ngày đăng ký. 
```php
$users = User::all()->groupBy(function($item) {
    return $item->created_at->format('Y-m-d');
});
```

Chú ý, groupBy này được thực hiện trên collections, và nó được lấy sau khi lấy kết quả từ database về. 

## Tip 58. Blade directive: IncludeIf, IncludeWhen, IncludeFirst
Nếu bạn không chắc chắn là một **blade partial** có tồn tại hay không, thì bạn có thể sử dụng chúng với các điều kiện 
Sẽ load header nếu file .blade tồn tại 
```php
@includeIf('partials.header')
```
Load file header cho user có role_id là 1
```php
@includeWhen(auth()->user()->role_id == 1, 'partials.header')
```
Cố gắng load adminlte.header, nếu không có, load default.header
```php
@includeFirst('adminlte.header', 'default.header')
```

## Tip 59 Thay đổi trường Timestamp
Nếu muốn thay đổi trường created_at và updated_at thành một trường nào đó thì chúng ta có thể thay đổi nó trong model
```php
class Role extends Model
{
     const CREATED_AT = 'create_time';
     const UPDATED_AT = 'update_time';
```

## Tip 60 Sắp xếp nhanh theo created_at
Thay vì sử dụng 
User::orderBy('created_at', 'desc')->get();
Bạn có thể sử dụng 
User::latest()->get();. 
Mặc định, **latest()** sẽ sắp xếp theo **created_at**. 
Ngược lại, ta cũng có **oldest()** để sắp xếp theo trường **created_at** giảm dần. 
```php
User::oldest()->get();
```
Nếu sử dụng  một trường nào đó để sắp xếp, ví dụ như trường updated_at, bạn có thể làm nó như sau
```php
$lastUpdatedUser = User::newest('updated_at')->first();
```

## Tip 61 Generate Images với Seed/Factories
Khi sử dụng faker (factories/seed) để thêm dữ liệu mẫu, Faker có hỗ trợ chúng ta kiểu **avatar** để có thể generate ảnh với kích thước kèm theo. Ví dụ, ta lấy ảnh 50x50
```php
$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
       'password' => bcrypt('password'),
       'remember_token' => Str::random(10),
        'avatar' => $faker->image(storage_path('images'), 50, 50)
    ];
});
```

## Tip 62 Eloquent: Update Parent trong 1 dòng. 
Trong quan hệ **belongsTo()**, chúng ta có thể sử dụng Eloquent để có thể update dữ liệu trong một dòng. 
Ví dụ, ta có Project -> belongsTo(User::class), ta sẽ cập nhật email của user bằng câu lệnh như sau
```php
$project->user->update(['email' => 'some@gmail.com']);
```

## Tip 63 Eloquent: Laravel 7+ khóa ngoại (Foreign Keys)
Từ Laravel 7, trong migrations, bạn không cần thiết phải viết 2 dòng để định nghĩa khóa ngoại nữa. Laravel đã hỗ trợ phương thức foreignId() để định nghĩa khóa ngoại.
```php
// Trươc bản Laravel 7
Schema::table('posts', function (Blueprint $table)) {
    $table->unsignedBigInteger('user_id');
    $table->foreign('user_id')->references('id')->on('users');
}
// Từ bản Laravel 7 trở đi
Schema::table('posts', function (Blueprint $table)) {
     $table->foreignId('user_id')->constrained();
}
// Từ bản Laravel 7, định nghĩa cụ thể tên cột, tên bảng
Schema::table('posts', function (Blueprint $table)) {
     $table->foreignId('created_by_id')->references('id')->on('users');
}
```
## Tip 64 Sử dụng các method với Collection.
Với những câu query lấy hết dữ liệu với **all()** hoặc **get()**, thì thay vì việc query nhiều lần, ta nên sử dụng các method với collection là kết quả query ban đầu để tăng hiệu năng/hiệu xuất. 
Ví dụ.
```php
$users = User::all();
echo 'Max ID: ' . $users->max('id');
echo 'Average age: ' . $users->avg('age');
echo 'Total budget: ' . $users->sum('budget');
```

## Tip 65 Thêm các sự kiện khi đăng ký user (người dùng)
Nếu bạn muốn thêm một số action, sau khi một người dùng mới đăng ký, đầu tiên hãy vào **app/Providers/EventServiceProvider.php** và thêm vào các lớp (class) listener, sau đó cài đặt hàm **handle()** của method với đối tượng **$event->user**
```php
class EventServiceProvider extends ServiceProvider
{
protected $listen = [
    Registered::class => [
         SendEmailVerificationNotification::class,
        // You can add any Listener class here
       // With handle() method inside of that class
    ],
];
```