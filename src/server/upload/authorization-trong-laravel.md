Xin chào tất cả mọi người, chả là gần đây mình có tìm về phần **Authorization** để phục vụ công việc, nên bài viết này mình xin chia sẻ một chút kiến thức mà mình tìm hiểu được về **Authorization**.

### **1. Authorization là gì?**

Như các bạn đã biết thì service **authentication** dùng để xác thực người dùng khi đăng nhập vào một hệ thống website nào đó (nếu bạn chưa biết **authentication** là gì thì bạn có thể tham khảo [tại đây](https://viblo.asia/p/tim-hieu-ve-authentication-trong-laravel-Ljy5VoG3Kra). Ngoài authentication thì Laravel còn cung cấp cho chúng ta Authorization (phân quyền) chi tiết từng hành động của người dùng được phép làm gì và không được phép làm gì.

### **2. Sử dụng Authorization**
Có hai cách để làm việc với **Authorization** đó là thông qua  **Gate** và **Policy**.

***2.1 - Gate***

**Gate** là Closure xác định người dùng đã ủy quyền để thực hiện một hành động nhất định. nó được định nghĩa trong App\Providers\AuthServiceProvider sử dụng Facade Gate.
Gate luôn nhận một thức thể user làm tham số thứ nhất và có thể có các tham số khác ví dụ như một thức thể của Model nào đó:

```php
<?php
//App\Providers\AuthServiceProvider.php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        \App\Post::class => \App\Policies\PostPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define('edit-profile', function ($user) {
            // $user là tài khoản đang đăng nhập hiện tại
            return true; 
        });
    }
}

```

Để phân quyền thực hiện một hành động, bạn có thể sử dụng các phương thức allows (cho phép nếu kết quả trong Closure trả về giá trị là true) và denies (ngược lại với allows) (ở trên bạn thấy trong Closure chúng ta có nhận một tham số  $user nhưng khi gọi để sử dụng thì chúng ta không cần truyền bởi vì Laravel sẽ tự động xử lý việc đó trong Gate Closure)

```php
if (Gate::allows('edit-profile')) {
    // Bạn có quyền thực hiện hành động này
}

if (Gate::denies('edit-profile')) {
    // Bạn không có quyền để thực hiện hành động này
}
```

Nếu bạn muốn xác định một người dùng nào đó có được quyền để thực hiện một hành động hay không thì bạn có thể sử dụng phương thức forUser trên Facade Gate:

```php
if (Gate::forUser($user)->allows('edit-profile')) {
    // $user có quyền thực hiện hành động này
}

if (Gate::forUser($user)->denies('edit-profile')) {
    // $user không có quyền thực hiện hành động này
}
```

***2.2 - Policy***

*2.2.1 - tạo Policy*

Policy là các class quản lý logic trong phân quyền liên quan đến một Model hoặc tài nguyên nào đó. Ví dụ, nếu ứng dụng của bạn là một blog, bạn có thể có một model Post và một policy là PostPolicy để phân quyền các hành động người dùng như xem, thêm, sửa, xóa các bài viết.
Bạn có thể tạo ra một policy thông qua câu lệnh Artisan make:policy:

> php artisan make:policy PostPolicy
> 

Sau khi chạy lên trên thư mục app\Policies sẽ dược tạo ra, thư mục này sẽ chứa toàn bộ các policies của chúng ta.

Câu lệnh trên sẽ sinh ra cho chúng ta một class policy rỗng, nếu chúng ta muốn sinh ra một CRUD policy thì chỉ cần thêm tham số -m <tên model>
> php artisan make:policy PostPolicy --m Post
> 

```php
<?php
// App\Policies\PostPlicy

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
        // 
    }

    /**
     * Determine whether the user can create posts.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
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
        //
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
        //
    }
}

```

*2.2.2 - Đăng ký Policy*

Muốn sử dụng được class policy thì chúng ta phải đăng ký nó trong AuthServiceProvider tại thuộc tính policies để map Eloquent model với các policy tương ứng:

```php
<?php
// App\Providers\AuthServiceProvider

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        \App\Post::class => \App\Policies\PostPolicy::class,
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

Khi đã đăng ký policy xong, ta có thể thêm các phương thức cho mỗi hành động cần cấp quyền. ví dụ như trong phương thức view trong PostPolicy để xác định một user có thể xem được bài viết không. Hoặc là user đó có được phép cập nhật bài viết không.

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
        // Chỉ có admin hoặc là người viết bài này thì mới có thể xem bài viết này
        return $user->role === 'admin' or $user->id === $post->user_id;
    }

    /**
     * Determine whether the user can create posts.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
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
        // Chỉ có người viết bài viết này mới có quyền sửa bài viết
        return $user->id === $post->user_id;
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
        //
    }
}
```

ở trên mình chỉ định nghĩa hai phương thức view và update để ví dụ, Bạn hoàn toàn có thể  định nghĩa các phương thức khác trên policy này nếu cần phần quyền cho các hành động đó. Và các tên phương thức trong policy bạn có thể đặt thoải mái nếu thích.

Có những policy chỉ nhận người dùng xác thực hiện tại mà không cần một thực thể của Model nào cả. Tình huống này dùng khi ta phân quyền một hành động create.

```php
/**
 * Determine if the given user can create posts.
 *
 * @param  \App\User  $user
 * @return bool
 */
public function create(User $user)
{
    // nếu tài khoản này hoạt động thì có thể tạo được bài viết
    $user->status === true;
}
```

Để gọi sử dụng policy thông qua User Model, Model User được tạo sẵn trong project Laravel chứa hai phương thức có sẵn là can và cannot. Phương thức can nhận hành động bạn muốn cấp phép (nếu kết quả trong phương thức mà nó gọi tới là True), còn phương thức cannot sẽ là ngược lại của phương thức can.

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;

class PostController extends Controller
{
    public function show(Post $post)
    {
        if ($user->can('view', $post)) {
             return view('post_show', compact('post'));
        }
    }
}

```

ở trên là các sử dụng policy trong trong controller ngoài ra ta còn có thể:

- gọi ở middleware

```php
Route::put('/post/{post}', 'PostController@show')->middleware('can:update,post');
```

- Gọi ở giao diện view Blade Template

```php
@can('view', $post)
// Được phép
@endcan

@cannot('view', $post)
// Không được phép
@endcannot

// hoặc là bạn có thể kết hợp với @else
@can('view', $post)
// Được phép
@else
// Không được phép
@endcan
```

 - ngoài ra Laravel còn hỗ trợ phương thức authorize, khi sử dụng authorize nếu phương thức không thỏa mãn thì nó sẽ throw exception 403.

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;

class PostController extends Controller
{
    public function show(Post $post)
    {
        $this->authorize('view', $post);

        return view('post_show', compact('post'));
    }
}

```

*2.2.3 - Bỏ qua bộ kiểm tra*
Đôi khi bạn muốn trong một số trường hợp chúng ta có thể chặn việc kiểm tra trong gate hoặc policy bằng hàm before. Phương thức before sẽ thực thi trước bất kỳ phương thức nào trong gate hoặc policy, nó cho bạn cơ hội để cho phép thực hiện hành động trước khi phương thức của policy mong muốn được gọi. Tính năng này rất thông dụng để cho phép các administrator có thể thực hiện bất kỳ hành động nào.

- trong policy:

```php
<?php

namespace App\Policies;

use App\User;
use App\Post;
use Illuminate\Auth\Access\HandlesAuthorization;

class PostPolicy
{
    use HandlesAuthorization;
    
    public function before (User $user)
    {
        if ($user->role === 'admin') { // nếu user có id === 'admin' thì là supper admin
             return true;
        }
    }
}

```

- trong gate

```php
<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        \App\Post::class => \App\Policies\PostPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::before(function ($user) {
            if ($user->role === 'admin') { // nếu user có id === 'admin' thì là supper admin
                    return true;
            }
        });
    }
}

```

Ngoài ra bạn có thể sử dụng phương thức after để định nghĩa một callback thực thi sau mỗi authorization check. Tuy nhiên bạn không thể thay đổi kết quả của việc kiểm tra authorization từ after callback.

```php
Gate::after(function ($user, $ability, $result, $arguments) {
    //
});
```

**Kết luận**

Trên đây là một chút kiến thức mà mình tìm hiểu được về authorization trong laravel, rất mong được sự góp ý của mọi người. Cảm ơn mọi người đã theo dõi bài viết của mình.

**Nguồn tham khảo**

- https://viblo.asia/p/authorization-trong-laravel-Qpmleneo5rd
- https://allaravel.com/laravel-tutorials/
- https://laravel.com/docs/5.7/authorization