## Giới Thiệu
Khi nói đến ACL (Access Control List), chúng ta thường thấy nó rất phức tạp, bằng cách tạo ra nhiều vai trò và bảng user_role và nhiều mối quan hệ và thứ tư như vậy. Vâng, hãy để tôi chỉ cho bạn cách dễ nhất mà KHÔNG cần tạo thêm các bảng và mối quan hệ.

Note:
Nếu bạn chưa biết về ACL! Thì đó chỉ là kiểm soát cấp độ truy cập của những người dùng khác nhau. Hãy nghĩ đến Hệ thống quản lý nội dung, nơi bạn có quản trị viên có thể làm mọi thứ, tác giả chỉ có thể tạo bài đăng và biên tập viên có thể chỉnh sửa bài đăng. ACL cho phép bạn giới hạn quyền của người dùng. Thật đơn giản

### Bước 1: Tạo mới 1 users table

```php
public function up()
{
    Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('user_type')->default('user')->nullable();
            $table->rememberToken();
            $table->timestamps();
    });
}
```
Giờ chạy migrate thôi nào: `php artisan migrate`

`
Chúng ta sẽ có các user type là ('admin', 'author', 'editor', 'user')
`

### Bước 2: Tạo Policy cho Users.
Mở và edit file này "app/Providers/AuthServiceProvider.php"

```php
public function boot(GateContract $gate)
    {
        $this->registerPolicies($gate);

        $gate->define('isAdmin', function ($user) {
            return $user->user_type == 'admin';
        });

        $gate->define('isAuthor', function ($user) {
            return $user->user_type == 'author';
        });

        $gate->define('isEditor', function ($user) {
            return $user->user_type == 'editor';
        });
        
    }
```

Đừng quên import GateContract ở trên cùng nhé.
```php
use Illuminate\Contracts\Auth\Access\Gate as GateContract;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
```

### Bước 3: Sử dụng 
Đã xong!!!!!! 

Bây giờ, đã đến lúc sử dụng chúng
#### Sử dụng trong Views file
Trong Views , bạn có thể sử dụng `@can` và `@cannot` để set điều kiện có thể hoặc không thể.

Bạn có thể sử dụng nó để hiển thị hoặc ẩn một phần nhất định trong Views cho các user type khác nhau.
```php
@can('isAdmin')
    <li>
        <a href="#dashboard">Dashboard</a>
    </li>
    <li>
        <a href="#member">Member</a>
    </li>
    <li>
        <a href="#post">Post</a>
    </li>
@endcan
```
```php
@can('isAuthor')
    <li>
        <a href="#dashboard">Dashboard</a>
    </li>
    <li>
        <a href="#post">Post</a>
    </li>
@endcan
```
```php
@can('isEditor')
    <li>
        <a href="#dashboard">Dashboard</a>
    </li>
    <li>
        <a href="#edit-post">Edit Post</a>
    </li>
@endcan
```
Hy vọng bạn đã hiểu nó. Chỉ với một số thay đổi nhỏ, bạn có thể điều chỉnh nó cho dự án của mình.
#### Sử dụng trong Controller
Back-end là phần quan trọng. hãy xem cách giới hạn quyền truy cập vào các chức năng và logic của Controller.
```php
    public function index()
    {
        if (!\Gate::allows('isAdmin')) {
            abort(403, "Sorry, You can't do this action");
        }

        return view('dashboard.index', compact('memberInfo'));
    }
```
Chấm hết mất rồi !!!!!!
## Kết luận
Tôi hy vọng bài viết này sẽ cung cấp thêm 1 thông tin hữu ích cho bạn. Thành thật mà nói, ACL không bao giờ có thể đơn giản hơn thế này.
Nếu muốn tìm hiểu kỹ hơn về Laravel Authorization bạn có thể vào document của laravel và tìm hiểu thêm.

Xin chân thành cảm ơn.

Bài viết tham khảo :

[https://medium.com/@hujjatnazari/the-easiest-way-to-create-acl-for-laravel-projects-1bafe371e7e1](https://medium.com/@hujjatnazari/the-easiest-way-to-create-acl-for-laravel-projects-1bafe371e7e1)