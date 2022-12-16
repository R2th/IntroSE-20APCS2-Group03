Xin chào mọi người, như tiêu đề bài viết này mình sẽ viết về Gates Policies trong laravel, cái này anh em làm về laravel thì sớm hay muộn cũng phải biết và sẽ dùng tới. Bắt tay vào tìm hiểu thôi.
![](https://images.viblo.asia/16905d73-7c39-49cc-9c3c-97517c741191.jpeg)

# Giới thiệu Gates Policies
Laravel định nghĩa Gate và Policy để thực hiện việc xác thực hành động của người dùng. 
Policy sử dụng xác thực một nhóm các hành động gắn liền với model hoặc resource còn gate thì cũng dùng để xác thực hành động nhưng không gắn với bất kỳ model nào.
# Sử dụng Gates 
Gate được định nghĩa cho phép hoặc từ chối một hành động nào đó của user.

Gate sử dụng dữ liệu với tham số thứ nhất là user, các vị trí khác lần lượt ở vị trí tiếp theo

Gate sẽ không gắn với model nào cả, Gate chỉ sử dụng thông tin được cung cấp bởi những tham số, Gate thường sẽ được sử dụng ở tầng Controller, để định nghĩa hành động của user là có được phép hay không.

Gate được viết ở App\Providers\AuthServiceProvider và sử dung Gate facade

## Tạo Gate
Ta định nghĩa gate trong app/Providers/AuthServiceProvider.php 
``` php
<?php
namespace App\Providers;
 
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
 
class AuthServiceProvider extends ServiceProvider
{
  /**
   * The policy mappings for the application.
   *
   * @var array
   */
  protected $policies = [
    'App\Model' => 'App\Policies\ModelPolicy',
  ];
 
  /**
   * Register any authentication / authorization services.
   *
   * @return void
   */
  public function boot()
  {
    $this->registerPolicies();
     
    Gate::define('update-post', function ($user, $post) {
      return $user->id == $post->user_id;
    });
  }
}
```
Gate được định nghĩa trả về True hoặc False dự theo điều kiện bạn viết trong gates.
## Sử dụng trong controller
Tạo Postcontroller.php

``` php
<?php
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use App\Post;
use Illuminate\Support\Facades\Gate;
 
class PostController extends Controller
{
  /* Make sure you don't user Gate and Policy altogether for the same Model/Resource */
  public function gate()
  {
    $post = Post::find(1);
 
    if (Gate::allows('update-post', $post)) {
      echo 'Allowed';
    } else {
      echo 'Not Allowed';
    }
     
    exit;
  }
}
```
Sử dụng Gate::allows để kiểm tra xem user có quyền thực  hiện hành động đó hay không
# Sử dụng Policies
* Policy nhận tham số đầu tiên là user đang đăng nhập

* Trong policy, Model User cung cấp hai phương thức hữu ích cho việc xác thực là can và cant. Phương thức can xác nhận việc user có thể thực hiện một hành động nào đó, còn cant xác nhận việc user không thể thực hiện hành động được chỉ định.

* Policy thường được sử dụng với các hành động thao tác dữ liệu với các model như thêm sửa xóa dữ liệu.

## Tạo Policies
Sử dụng câu lệnh Artisan make:policy để tạo policy cần thiết, các policy được tạo ra sẽ được đặt trong thư mục *app\Policies*.

`php artisan make:policy PostPolicy`

câu lệnh make:policy sẽ sinh ra một class policy rỗng, nếu bạn muốn sinh ra một CRUD policy bạn cần thêm tham số –model khi thực thi câu lệnh artisan:

`php artisan make:policy PostPolicy --model=Post`

Ta có thể viết PostPolicy như sau

``` php
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

## Đăng ký Policies
Ta phải đăng ký thì mới có thể sử dụng được policy, AuthServiceProvider được đưa vào trong project Laravel chứa một thuộc tính policies để map Eloquent model với các policy tương ứng. Đăng ký một policy để chỉ dẫn cho Laravel policy nào sẽ được sử dụng để phân quyền hành động cho model nào:

 Ví dụ mình đăng ký 3 policy với 3 model
 
``` php
<?php

namespace App\Providers;

use App\Models\Office;
use App\Models\Post;
use App\Models\User ;
use App\Policies\OfficePolicy;
use App\Policies\PostPolicy;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
         User::class => UserPolicy::class,
        Office::class => OfficePolicy::class,
        Post::class => PostPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
    }
}

```

## Sử dụng Policies trong controller

Ta kiểm tra trường hợp user có quyền tạo bài viết hay không

``` php
<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Post;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
  public function create()
  {
// User đang đăng nhập
    $user = Auth::user();

    if ($user->can('create', Post::class)) {
      echo 'Có quyền tạo bài viết.';
    } else {
      echo 'Không có quyền';
    }

    exit;
  }
}

```

Ở đây ta sử dung hàm can để kiểm tra, ngoài ra còn các cách kiểm tra khác như

**Ở controller sử dụng**

`$this->authorize('update', $post);`

**Ở model**

``` php
if ($user->can('update', $post)) {
  //
}
```

**Sử dụng ở Moddleware**

``` php
use App\Post;

Route::put('/post/{post}', function (Post $post) {
   // The current user may update the post...
})->middleware('can:update,post');
```
**Sử dụng ở Blade Templates:**
``` php
@can('update', $post)
<!-- The Current User Can Update The Post -->
@elsecan('create', App\Post::class)
    <!-- The Current User Can Create New Post -->
@endcan
```
**Hoặc sử dụng kết hợp middleware**
``` php
<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PostPolicy
{
    use HandlesAuthorization;

    public function create(User $user)
    {
        return $user->hasPermission('create_post');
    }
}
```
# Kết bài
Qua bài viết này chúng ta đã tìm hiểu về công cụ Policy hỗ trợ phân quyền trong laravel.
Trên thực tế chúng ta sẽ sử dụng kết hợp cả gate - policy và middleware để xác thực và phân quyền. Cảm ơn mọi người.