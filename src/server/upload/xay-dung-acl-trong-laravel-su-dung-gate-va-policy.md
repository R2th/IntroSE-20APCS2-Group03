# Lời giới thiệu

Việc xác thực của Laravel (Authentication ) cung cấp 1 giải pháp đơn giản hóa cho việc đăng ký, đăng nhập, đăng xuất, và reset mật khẩu cũng như triển khai nó một cách nhanh chóng và dễ dàng hơn cho ứng dụng web.

Tuy nhiên nếu bạn cần kiểm soát quyền truy cập vào một số phần của trang web, hoặc bật tắt từng phần cụ thể của một trang cho người không phải quản trị viên, hoặc đảm bảo một người nào đó chỉ có thể chỉnh sửa danh bạ của riêng mình. Với tư cách là một lập trình viên, có lẽ đây là bài toàn mà chúng ta sẽ gặp ở mọi dự án.

Ở các phiên bản trước của Laravel, việc xây dựng một ACL: Access Control Lists khá là khó khăn. Nhưng từ sau phiên bản 5.1.11 với sự tích hợp của Gate và Policy, công việc tưởng chừng như khó khăn đấy, nay lại trở lên rất dễ dàng.

## 1. Gate

**Gates** là **Closures** khai báo xem người dùng có được phép thực hiện một hành động cụ thể hay không. Nói cách khác, khi bạn một khai báo một quyền nào đó mà không gắn liền với bất cứ một Model nào, Gate là sự lựa chọn dành cho bạn.

Đây là một ví dụ sử dụng Gate:
```php
Gate::define('update-post', function ($user, $post) {
  return $user->id == $post->user_id;
});
```

Dòng lệnh trên để khai báo một quyền lệnh là **update-post** mà bạn có thể gọi ở bất cứ đâu trong ứng dụng của bạn.

## 2. Policy

Bên cạnh **Gate**, Laravel 5.1 còn xây dựng thêm **Policy** để ta có thể gắn quyền thực thi vào một đối tượng cụ thể nào đó.

```php
class PostPolicy
{
  public function view(User $user, Post $post) {}
  public function create(User $user) {}
  public function update(User $user, Post $post) {}
  public function delete(User $user, Post $post) {}
}
```

Ta có thể dễ dang nhận ra, đây là một lớp Policy định nghĩa cho các hành động CRUD của **Post** model.

## 3. Sử dụng Gate và Policy

Ở phần này, tôi sẽ giúp các bạn xây dựng một ACL cơ bản sử dụng Gate và Policy
### 1. Trước tiên chúng ta cần khai báo Gate

Chúng ta có thể định nghĩa Gate theo đường dẫn 
> app/Providers/AuthServiceProvider.php
> 
với những câu lệnh như sau:
```php
<?php
namespace App\Providers;
 
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
 
class AuthServiceProvider extends ServiceProvider
{
  
  public function boot()
  {
    $this->registerPolicies();
     // Khai báo các gate của chúng ta ở đây
    Gate::define('update-post', function ($user, $post) {
         return $user->id == $post->user_id;
    });
  }
}
```

Trong khi định nghĩa một Gate, kết quả trả về sẽ là hoặc **TRUE** hoặc **FALSE** phụ thuộc vào biểu thức logic mà chúng ta khai báo.

Ngoài việc viết hàm logic, ta có thể sử dùng controller action.
```php
Gate::define('update-post', 'TênController@TênPhươngThức');
```

Sau khi khai báo Gate thành công, chúng ta vào Controller sử dụng **allows** hay **denies** từ **Gate Facade**  để cho phép người dùng có thể thực thi các hành động tiếp theo hay không.
Trong File Controller 
> app/Http/Controllers/PostController.php
> 
```php
<?php
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use App\Post;
use Illuminate\Support\Facades\Gate;
 
class PostController extends Controller
{
  //Chúng ta không được dùng Cả Gate Và Policy trong cùng một Model
  public function update()
  {
    $post = Post::find(1);

    if (Gate::allows('update-post', $post)) {
            echo 'Được phép';
    } else {
            echo 'Không được phép';
    }
  }
}
```

Nếu tinh ý, trong câu lênh **Gate::allows** ta đã chỉ truyền vào tham số thứ hai là `$post` Tham số thứ nhất là người dùng hiện tại đang log-in được **Gate Facade** tự động thêm vào.

### 2. Khai báo Policy

Như đã đề cập bên trên, khi ta muốn khai báo nhiều hành động cho một Model cụ thể, ta sử dụng Policy.

Ở ví dụ này, ta sẽ tạo một Post sử dụng tất cả các hành độn CRUD. Ta có thể khởi tạo một Policy bằng câu lệnh Laravel **artisan**
```
php artisan make:policy PostPolicy --model=Post
```

Ta thêm **--model=Post** báo hiệu cho Laravel tự động tạo các phương thức CRUD. Ta có thể truy cập PostPolicy mới tạo theo đường dẫn
> app/Policies/PostPolicy.php
> 

Ví dụ ta có một class PostPolicy như sau

```php
<?php
namespace App\Policies;
 
use App\User;
use App\Post;
use Illuminate\Auth\Access\HandlesAuthorization;
 
class PostPolicy
{
  use HandlesAuthorization;
 
  public function view(User $user, Post $post)
  {
    return TRUE;
  }
 
  public function create(User $user)
  {
    return $user->id > 0;
  }
 
  public function update(User $user, Post $post)
  {
    return $user->id == $post->user_id;
  }
 
  public function delete(User $user, Post $post)
  {
    return $user->id == $post->user_id;
  }
}
```

Để có thể sử dụng class Policy, chúng ta phải khai báo trong service provider của Laravel như sau
```php
<?php
namespace App\Providers;
 
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use App\Post;
use App\Policies\PostPolicy;
 
class AuthServiceProvider extends ServiceProvider
{

  protected $policies = [
    'App\Model' => 'App\Policies\ModelPolicy',
    Post::class => PostPolicy::class
  ];
 
  public function boot()
  {
    $this->registerPolicies();
  }
}
```
Giờ đây chúng ta có thể sử dụng Policy trong Controller 

```php
<?php
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use App\Post;
use Illuminate\Support\Facades\Auth;
 
class PostController extends Controller
{
  public function view()
  {
    // Người dùng hiện tại
    $user = Auth::user();
     
    // load post
    $post = Post::find(1);
     
    if ($user->can('view', $post)) {
      echo "Người dùng được quyền xem";
    } else {
      echo 'Người dùng không được quyền xem.';
    }
  }
 
  public function create()
  {
// Người dùng hiện tại
    $user = Auth::user();
 
    if ($user->can('create', Post::class)) {
      echo 'Được quyền.';
    } else {
      echo 'Không được quyền';
    }
 
    exit;
  }
 
  public function update()
  {
   // Người dùng hiện tại
    $user = Auth::user();
 
    // load post
    $post = Post::find(1);
 
    if ($user->can('update', $post)) {
      echo "Được quyền";
    } else {
      echo 'Không được quyền.';
    }
  }
 
  public function delete()
  {
   // Người dùng hiện tại
    $user = Auth::user();
     
    // load post
    $post = Post::find(1);
     
    if ($user->can('delete', $post)) {
      echo "Được quyền";
    } else {
      echo 'Không được quyền.';
    }
  }
}
```

User model tạo ra 2 phương thúc để xác thực quyền là **can** và **cant**. Phương thức can dùng để kiểm tra xem người dùng có quyền thực hiện hay không. Và đối nghịch với **can** là **cant**.
 
Ngoài việc sử dụng gọi tới User Model, ta có thể sử dụng **Controller Helper**

Ta có thể thay thế phương thức delete theo cách sử dụng Controller Helper như sau.

```php
 public function delete()
  {
    // load post
    $post = Post::find(1);
     
    $this->authorize('delete', $post);
    
    //Thực hiện Delete Post
  }
```

# Tổng kết

Hiện nay Laravel đã tạo ra các công cụ khiến cho việc xây dựng ACL khó khăn ngày xưa nay cực kì đơn giản bằng Gate và Policy. 

# Tài liệu tham khảo

[https://laravel.com/docs/5.6/authorization](https://laravel.com/docs/5.6/authorization)