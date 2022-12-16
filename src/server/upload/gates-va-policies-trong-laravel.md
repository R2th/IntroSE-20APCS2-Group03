Hệ thống authorization trong laravel bao gồm gates và policies. Khá nhiều người nhầm lẫn về gates và policies và khá bối rối khi phân biệt 2 khái niệm này.
Gates cho phép bạn định nghĩa một authorization rule sử dụng tiếp cận closure-based đơn giản. Nói cách khác, khi bạn muốn cấp quyền một hành động không liên quan đến model cụ thể nào, thì nên dùng gate để triển khai logic đó.
Cùng xem ví dụ dưới đây: 

```php
...
Gate::define('update-post', function ($user, $post) {
  return $user->id == $post->user_id;
});
...
```
Ví dụ trên định nghĩa một quy tắc cấp quyền update-post mà bạn có thể gọi ở bất kì đâu trong ứng dụng.
Mặt khác thì bạn nên sử dụng policies khi bạn muốn nhóm authorization logic của bất kì model nào. Ví dụ, bạn có một model Post trong ứng dụng, và bạn phải cấp quyền hành động CRUD của model đó. Trong trường hợp đó, bạn cần dùng policies để thực hiện.

```php
class PostPolicy
{
  public function view(User $user, Post $post) {};
  public function create(User $user) {};
  public function update(User $user, Post $post) {};
  public function delete(User $user, Post $post) {}
}
```

## Gates
Trong phần này sẽ là ví dụ thực tế để bạn hiểu hơn về khái niệm gates.

Trước tiên hãy định nghĩa gate trong  app/Providers/AuthServiceProvider.php như sau:
```php
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

Trong khi định nghĩa gate, nó sẽ trả về một giá trị TRUE hoặc FALSE dựa trên logic được xác định trong định nghĩa gate. Ngoài ra có nhiều cách khác bạn có thể định nghĩa gate.

Ví dụ như sau gọi hành động của controller thay vì closure function.
```php
Gate::define('update-post', 'ControllerName@MethodName');
```
Trong file routes/web.php, thêm route sau đây.
```php
Route::get('service/post/gate', 'PostController@gate');
```
Tạo controller app/Http/Controllers/PostController.php
```php
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


Trong hầu hết các trường hợp, bạn sẽ kết thúc bằng cách sử dụng phương thức `allows` hoặc `denies` của Gate facade để authorize một hành động nhất định.
## Policies

Như chúng ta đã nói ở trên, khi bạn muốn nhóm một cách hợp lý các hành động authorization model hoặc resource cụ thể nào thì bạn dùng policies.

Trong phần này, chúng tôi sẽ tạo một policy cho model Post được sử dụng để cấp quyền cho tất cả các hành động CRUD. Bạn có thể sử dụng comand sau đây để tạopolicy cho model Post.

```
$php artisan make:policy PostPolicy --model=Post
```


Như bạn có thể thấy, thêm đối số --model = Post để nó tạo ra tất cả các phương thức CRUD. Trong trường hợp không có làm như trên, nó sẽ tạo ra một lớp Policy trống. Bạn có thể vào và tạo các class policy được tạo tại` app/Policies/PostPolicy.php`

```php
<?php
namespace App\Policies;
 
use App\User;
use App\Post;
use Illuminate\Auth\Access\HandlesAuthorization;
 
class PostPolicy
{
  use HandlesAuthorization;
 
  /**
   * Determine whether the user can view the post.
   *
   * @param  \App\User  $user
   * @param  \App\Post  $post
   * @return mixed
   */
  public function view(User $user, Post $post)
  {
    return TRUE;
  }
 
  /**
   * Determine whether the user can create posts.
   *
   * @param  \App\User  $user
   * @return mixed
   */
  public function create(User $user)
  {
    return $user->id > 0;
  }
 
  /**
   * Determine whether the user can update the post.
   *
   * @param  \App\User  $user
   * @param  \App\Post  $post
   * @return mixed
   */
  public function update(User $user, Post $post)
  {
    return $user->id == $post->user_id;
  }
 
  /**
   * Determine whether the user can delete the post.
   *
   * @param  \App\User  $user
   * @param  \App\Post  $post
   * @return mixed
   */
  public function delete(User $user, Post $post)
  {
    return $user->id == $post->user_id;
  }
}
```


Để có thể sử dụng Policy, chúng ta cần đăng ký trong servise provider của Laravel như sau.
```php
<?php
namespace App\Providers;
 
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use App\Post;
use App\Policies\PostPolicy;
 
class AuthServiceProvider extends ServiceProvider
{
  /**
   * The policy mappings for the application.
   *
   * @var array
   */
  protected $policies = [
    'App\Model' => 'App\Policies\ModelPolicy',
    Post::class => PostPolicy::class
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

Thêm ánh xạ Policies vào thuộc tính $policies. Nó báo cho Laravel gọi phương thức policy tương ứng để cấp quyền cho hành động CRUD.

Bạn cũng cần đăng ký các chính sách bằng phương thức registerPolicies, như chúng ta thực hiện trong phương thức boot.

Khai báo route trong routes/web.php

```php
Route::get('service/post/view', 'PostController@view');
Route::get('service/post/create', 'PostController@create');
Route::get('service/post/update', 'PostController@update');
Route::get('service/post/delete', 'PostController@delete');
```

Tạo controller trong `app/Http/Controllers/PostController.php`
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
    // get current logged in user
    $user = Auth::user();
     
    // load post
    $post = Post::find(1);
     
    if ($user->can('view', $post)) {
      echo "Current logged in user is allowed to update the Post: {$post->id}";
    } else {
      echo 'Not Authorized.';
    }
  }
 
  public function create()
  {
    // get current logged in user
    $user = Auth::user();
 
    if ($user->can('create', Post::class)) {
      echo 'Current logged in user is allowed to create new posts.';
    } else {
      echo 'Not Authorized';
    }
 
    exit;
  }
 
  public function update()
  {
    // get current logged in user
    $user = Auth::user();
 
    // load post
    $post = Post::find(1);
 
    if ($user->can('update', $post)) {
      echo "Current logged in user is allowed to update the Post: {$post->id}";
    } else {
      echo 'Not Authorized.';
    }
  }
 
  public function delete()
  {
    // get current logged in user
    $user = Auth::user();
     
    // load post
    $post = Post::find(1);
     
    if ($user->can('delete', $post)) {
      echo "Current logged in user is allowed to delete the Post: {$post->id}";
    } else {
      echo 'Not Authorized.';
    }
  }
}
```

Phương thức `can` được sử dụng để kiểm tra xem người dùng hiện tại có thể thực hiện một hành động nào đó không. Phương thức `cant`, được sử dụng để xác định sự không cho phép của việc thực thi hành động.