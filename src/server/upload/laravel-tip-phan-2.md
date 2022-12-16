### Tip 11 Không sử dụng các cột thời gian tạm thời.
Nếu trong bảng trong cơ sở dữ liệu (DB) không tồn tại các trường *created_at* và *updated_date* bạn có thể định nghĩa rằng model trong không tồn tại hai field này như sau:
```php
class Company extends Model
{
    public $timestamps = false;
}
```

### Tip 12 Migration fields với timezone
Có thể bạn chưa biết, trong migration, không chỉ có **timestamps()**, mà chúng ta cũng có thể sử dụng **timestampsTz()** để tạo các cột với timezone 
```php
Schema::create('employees', function (Blueprint $table) {
    $table->increments('id');
    $table->string('name');
    $table->string('email');
    $table->timestampsTz();
});
```
Tương tự, chúng ta có thể sử dụng các hàm **dateTimeTz(), timeTz(), timestampTz(), softDeleteTz()** để sinh ra các cột thời gian với timezone.

### Tip 13 Eloquent với hàm has()
Bạn có thể sử dụng hàm **has()** trong Eloquent với 2 tầng relationship. Ví dụ 
```php
// Author -> hasMany(Book::class);
// Book -> hasMany(Rating::class);
$authors = Author::has('books.ratings')->get()
```

### Tip 14 Migration database với các kiểu dữ liệu 
Có một số kiểu cột dữ liệu rất thú vị như 
```php
$table->geometry('positions');
$table->ipAddress('visitor');
$table->macAddress('device');
$table->point('position');
$table->uuid('id');
```
Xem thêm [tại đây](https://laravel.com/docs/master/migrations#creating-columns)

### Tip 15 Câu lệnh artisan với option --help 
Để kiểm tra các tùy chọn có thể có của câu lệnh **artisan** thường dùng, chúng ta có thể sử dụng cờ --help để liệt kê ra toàn bộ những tùy chọn, ý nghĩa và cách sử dụng của nó
```php
php artisan make:model --help
```

### Tip 16 Timestamp mặc định
Trong khi tạo các migrations, bạn có thể sử dụng *->timestamp()* với tùy chọn *->useCurrent()*, nó sẽ lấy **CURRENT_TIMESTAMP**  là giá trị mặc định. 
```php
$table->timestamp('created_at')->useCurrent();
$table->timestamp('updated_at')->useCurrent();
```
### Tip 17 Set logged in user với Observers 
Sử dụng *make:observer* và điền logic vào hàm **creating**, sẽ lấy trường **user_id** là user đang đănh nhập 
```php
class PostObserver
{
    /**
    * Handle to the post "creating" event.
    *
    * @param \App\Post $post
    * @return void
    */
    public function creating(Post $post)
    {
    $post->user_id = auth()->id();
    }
}
```
Trong thực tế, observer không chỉ như vậy. Nó còn sử dụng ở các model event khác, như created, updated, updating, saved, saving, deleted, deleting... Đọc thêm về các model event trong loạt bài của mình về php laravel hoặc tự tìm hiểu thêm.

### Tip 18 Soft-deletes: multiple restore
Khi sử dụng soft-delete (mà tiếng việt chúng ta hay gọi là xóa mềm) thì chúng ta có thể restore lại nhiều record trong 1 lệnh như sau: 
```php
Post::withTrashed()->where('author_id', 1)->restore();
```

### Tip 19. Has Many. Chính xác là bao nhiêu ?
Trong Eloquent, **hasMany()** relationship, bạn có thể gọi chính xác là có bao nhiêu record con khi lấy dữ liệu ra 
```php
// Author -> hasMany(Book::class)
$authors = Author::has('books', '>', 5)->get();
// lấy chính xác những tác giả có hơn 5 cuốn sách.
```
### Tip 20 Image validation 
Trong khi validate những ảnh upload, bạn có thể sử dụng **dimensions** để xác định chính xác kích thước ảnh mong muốn
```php
'photo' => 'dimensions:max_width=4096,max_height=4096'
```

### Tip 21 Wildcard subdomains
Bạn có thể đặt route group với subdomain, nó sẽ lấy giá trị ấy vào mọi route
```php
Route::domain('​ {username}​ .workspace.com')->group(function () {
    Route::get('user/{id}', function (​ $username​ , $id) {
    //
    });
})
```
### Tip 22 Kiểm tra chính xác laravel version
Để xác định xem dự án đang sử dụng laravel version bao nhiêu bạn có thể sử dụng 
```bash
php artisan --version
```

### Tip 23 Testing email với laravel.log 
Nếu bạn muốn kiểm tra nội dung email, mà không muốn sử dụng các thứ bên thứ ba như Mailgun hay Mailstrap, thì bạn có thể sử dụng thay đổi *MAIL_DRIVER=log* trong *.env*. Như vậy, nội dung email sẽ được đẩy vào *storage/logs/laravel.log* thay vì được gửi đi.

### Tip 24 Các page lỗi
Nếu bạn muốn tạo một số trang thông báo lỗi với các mã http status code. Thì chỉ việc tạo ra các file .blade ở thư mục *resources/views/errors/500.blade.php*, hoặc có thể lỗi 404, lỗi 401.blade.php. Về cơ bản thì với mỗi một mã lỗi http status code, thì chỉ cần lấy http status code với *.blade.php* là bạn có thể tạo ra trang báo lỗi của mã http status code tương ứng. 

### Type 25 Factory callbacks
Trong khi sử dụng factories để seed dữ liệu, thì bạn cũng có thể cung cấp các callback, để sau khi tực hiện hành động insert dữ liệu vào database, sẽ thực hiện các callback 
```php
$factory->afterCreating(App\User::class, function ($user, $faker) {
    $user->accounts()->save(factory(App\Account::class)->make());
});
```
Nguồn: http://laraveldaily.com/