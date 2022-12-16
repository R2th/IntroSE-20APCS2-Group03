Chúng ta điều biết trong 1 hệ thống thì việc cấp quyền cho các hành động truy cập tài nguyên đối với từng người dùng là rất cần thiết. Tùy vào từng dự án mà chúng ta sẽ cấp quyền tĩnh hoặc động. 

Hôm nay mình sẽ cùng với các bạn tìm hiểu các cách thức để phân phân quyền trong laravel. Và cuối cùng là tạo một hệ thống phân quyền động đơn giản nhưng khá đầy đủ.

### **1.Middleware** 
Middleware được hiểu như 1 bộ lọc các Http Request. Một số loại middleware  : before middleware, after middleware, terminable middleware. Thông dụng nhất đối với đa số mọi người sẽ là before middleware, nó sẽ được sử dụng để lọc request trước khi request đi vào controller.

Tạo mới middleware như sau : 
```
php artisan make:middleware Role
```

Vào trong app/Http/Middleware bạn sẽ thấy 1 file tương ứng với middleware vừa tạo. 
```
<?php

namespace App\Http\Middleware;

use Closure;

class Role
{
    public function handle($request, Closure $next, ... $roles)
    {
        foreach ($roles as $role) {
            if ($request->user()->hasRole($role)) {
                return $next($request);
            }
        }

        return abort(403);
    }
}
```

Sau đó chúng ta sẽ đăng kí  định danh cho middleware trong app/Http/Kernel.php là xong.

**Sử dụng middleware như thế nào ?**

+ Thường được gán kèm với router 
```
Route::resource('users', 'UserController')->middleware('role:admin');
```

+ Có thể dùng trong  __construct của controller 
```
public function __construct() 
{
    $this->middleware('auth');
}
```

### **2.Gate**
Gate là một bộ lọc để thực hiện việc xác thực user có được phép hay không thực hiện một hành động cụ thể.

**Phân biệt gate với middleware**
+ Gate là một Closures
+ Gate sử dụng dữ liệu với tham số thứ nhất luôn là user, các tham số khác ở các vị trí tiếp theo.

**Tạo mới Gate**

Gate được viết ở App\Providers\AuthServiceProvider 
```
use Illuminate\Support\Facades\Gate;
```
```
public function boot()
{
    Gate::define('edit-comment', function ($user, $comment) {
            return $user->id === $comment->user_id;
        });

    Gate::define('delete-comment', function ($user, $comment) {
        return $user->id === $comment->user_id;
    });
}
```
Gate hoàn toàn có thể được viết ở 1 provider khác trong  App\Providers\ do dev tự định nghĩa và đăng kí trong  /config/app.php

![](https://images.viblo.asia/6aa33a0e-c7ff-4c36-8d47-8648b2be44fe.png)

**Sử dụng gate như thế nào ?**

+ Sử dụng trong controller với  allows, denies, any, none, authorize, …
![](https://images.viblo.asia/a219e5f2-3caf-4b61-af77-74fdbdc35917.png)
+ Có thể sử dụng method can trong route 
+ Sử dụng thông qua middleware

    Sau khi viết middleware để xử lí request
```
public function handle($request, Closure $next, $permission)
    {
        if (!$request->user()->can($permission)) {
            return abort(403);
        }

        return $next($request);
    }
```

Ta sẽ dùng nó trong route như sau 
```
Route::get('projects', 'ProjectController@index')->name('projects.index')
    ->middleware('permission:view-project');
```

+ Sử dụng trong blade template với @can, @cannot, @canany 

![](https://images.viblo.asia/642f17b7-0d1c-4d30-90be-5835ccd16a1c.png)

+ Sử dụng trong Form Requests
![](https://images.viblo.asia/eb7c151c-b67b-47cc-89f9-a774fc0a5ce8.png)

+ Cũng có thể sử dụng trong Policy thông qua method  can, ...

### **3.Policy**
Giống với gate, policy cũng là một bộ lọc để thực việc xác thực, hành động nào là hành động được phép, hành động nào là không được phép. Nhận tham số đầu tiên là một thể hiện của user, và là user đang đăng nhập vào.

**Phân biệt với gate**
+ Policy thường gắn với các hành đông CRUD một model cụ thể
+ Policy thường chỉ nhận tối đa 2 tham số ( user & model gán kèm)

**Tạo mới 1 policy**

Gõ lệnh terminal sau trong project hiện tại

```
php artisan make:policy PostPolicy --model=Post
```

Sau đó khai báo tại \Providers\AuthServiceProvider hoặc provider tự tạo

```
protected $policies = [
    'App\Model' => 'App\Policies\ModelPolicy',
    Post::class => PostPolicy::class,
]
```

**Ví dụ viết policy**

![](https://images.viblo.asia/26ad23a1-aacd-4d9e-b138-85a90dc7cf52.png)

![](https://images.viblo.asia/717c8144-5fb9-4d73-a9fc-936634df0bcf.png)

![](https://images.viblo.asia/c96fe2d0-e45d-4096-b36e-de16fc7773aa.png)

**Cách sử dụng policy**

+ Thông qua User model : model User cung cấp 2 phương thức xác thực là can và cant 

```
if ($user -> can('update', $post)) {
    //
}
```

+ Thông qua Middleware

```
use App\Post;
Route::put('/post/{post}', function (Post $post) {
    //The current user may update post
})->middleware('can:update,post');
```

+ Thông qua controller helper với phương thức  authorize

```
public function update(Request $request, Post $post) {
    $this->authorize('update', $post);
    //The current user may update post
}
```

+ Thông qua blade template

```
@can('update', $post)
    //The current user may update post
@elsecan('create', App\Post::class)
    //The current user may create new post
@endcan
```


Như vậy là chúng ta đã tìm hiểu qua  về middleware, gate và policy. Bây giờ chúng ta sẽ áp dụng chúng để thực hiện phân quyền động thôi nào.

### **4.Phân quyền động**

+ Thiết Kế Database

![](https://images.viblo.asia/d47dd0ae-3871-44ba-8b78-a508c9c751a9.png)

Theo đó ta sẽ có các quan hệ sau : 

1 **user** has  n **role**

1 **role** has n **permission**

1 **permission**  has  n **role**

+ Tạo customProvider 
```
php artisan make:provider PermissionServiceProvider
```
```
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Permission;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Gate;
use Exception;

class PermissionProvider extends ServiceProvider
{
    public function register()
    {
        //
    }
    
    public function boot()
    {
        Gate::before( function ($user,$ability) {
            if ($user->hasRole('admin')) {
                return true;
            }
        });
        try {
            Permission::all()->map(function ($permission, $course_id = null) {
                Gate::define($permission->slug, function ($user) use ($permission, $course_id)
                {
                    return $user->hasPermissionTo($permission, $course_id);
                });
            });
        } catch (Exception $e) {
            return false;
        }
        Gate::define('edit-comment', function ($user, $comment) {
            return $user->id === $comment->user_id;
        });

        Gate::define('delete-comment', function ($user, $comment) {
            return $user->id === $comment->user_id;
        });
    }
}
```
Đăng kí provider trong config\app.php
```
'provider' => [
    App\Providers\PermissionServiceProvider::class,
],
```
Tiếp theo, tạo và đăng kí các policy cần thiết trong  App\Providers\AuthServiceProvider
```
php artisan make:policy policyName --model=modelName
```
```
<?php

namespace App\Policies;

use App\Models\Group;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class GroupPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function before(User $user, $ability)
    {
        if ($user->hasRole('admin')) {
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Group  $group
     * @return mixed
     */
    public function view(User $user, Group $group)
    {
        if ($user->groups->contains($group)) {
            return true;
        }

        foreach ($user->teaches as $course) {
            if ($course->groups->contains($group)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user, Group $group)
    {
        foreach ($user->groups as $gr) {
            if ($gr->id == $group->id && $gr->pivot->is_leader == true) {
                return true;
            }
        }

        return false;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Group  $group
     * @return mixed
     */
    public function update(User $user, Group $group)
    {
        $courses = $user->teaches;
        foreach ($courses as $course) {
            if ($course->groups->contains($group)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Group  $group
     * @return mixed
     */
    public function delete(User $user, Group $group)
    {
        foreach ($user->teaches as $course) {
            if ($course->groups->contains($group)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Group  $group
     * @return mixed
     */
    public function restore(User $user, Group $group)
    {
        foreach ($user->teaches as $course) {
            if ($course->groups->contains($group)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Group  $group
     * @return mixed
     */
    public function forceDelete(User $user, Group $group)
    {
        foreach ($user->teaches as $course) {
            if ($course->groups->contains($group)) {
                return true;
            }
        }

        return false;
    }
}
```
```
protected $policies = [
        Group::class => GroupPolicy::class,
    ];
```
Cuối cùng mình sẽ sử dụng middleware để phân quyền, các bạn sẽ cần tạo các middleware tương ứng 
```
<?php

namespace App\Http\Middleware;

use Closure;

class Permission
{
    public function handle($request, Closure $next, $permission)
    {
        if (!$request->user()->can($permission)) {
            return abort(403);
        }

        return $next($request);
    }
}
```
```
Route::post('add-group/{course}/groups', 'GroupController@store')->name('courses.groups.store')
    ->middleware('permission:create-group');
Route::get('show-detail-group/{group}', 'GroupController@show')->name('groups.show')
    ->middleware('permission:view-group', 'can:view,group');
```

Trên đây là cách đơn giản để phân quyền động sử dụng cả gate, policy và middleware. Bài viết còn nhiều thiếu sót, mn có thể góp ý dưới cmt nha.

Nguồn tham khảo 
1. https://www.codechief.org/article/user-roles-and-permissions-tutorial-in-laravel-without-packages#gsc.tab=0
2. https://laravel.com/docs/7.x/authorization
3. https://viblo.asia/p/middleware-trong-laravel-58-oOVlYBja58W#_before-va-after-middleware-2
4. https://viblo.asia/p/gates-va-policies-trong-laravel-924lJE20ZPM
5. https://viblo.asia/p/laravel-tim-hieu-ve-middleware-djeZ1ajmZWz