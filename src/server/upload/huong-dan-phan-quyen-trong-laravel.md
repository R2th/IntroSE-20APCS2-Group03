Trong bất kỳ hệ thống nào, việc phân quyền là một điều hết sức quan trọng. Việc phân quyền sẽ quy định người dùng có thể truy cập những chức năng nào, thực hiện những tác vụ nào trong hệ thống.

Hôm nay mình sẽ hướng dẫn các bạn tạo một hệ thống phân quyền đơn giản nhưng khá đầy đủ, sử dụng trong Laravel.

## 1. Bài toán
Phân quyền quản lý các bài viết trong blog: create, view, update, delete, restore, force delete.

Một user có nhiều role, một role có nhiều permission.
## 2. Chuẩn bị
### 2.1 Database Struct
Chúng ta sẽ cần các bảng: users, roles, permissions, role_user và permission_role

```php
Schema::create('users', function (Blueprint $table) {
    $table->bigIncrements('id');
    $table->string('name');
    $table->string('email')->unique();
    $table->timestamp('email_verified_at')->nullable();
    $table->string('password');
    $table->rememberToken();
    $table->timestamps();
});

Schema::create('roles', function (Blueprint $table) {
    $table->increments('id');
    $table->string('name');
});

Schema::create('permissions', function (Blueprint $table) {
    $table->increments('id');
    $table->string('name');
});

Schema::create('role_user', function (Blueprint $table) {
    $table->unsignedInteger('user_id');
    $table->unsignedInteger('role_id');

    $table->foreign('user_id')->references('id')->on('users')
        ->onDelete('cascade');
    $table->foreign('role_id')->references('id')->on('roles')
        ->onDelete('cascade');
});

Schema::create('permission_role', function (Blueprint $table) {
    $table->unsignedInteger('permission_id');
    $table->unsignedInteger('role_id');

    $table->foreign('permission_id')->references('id')->on('permissions')
        ->onDelete('cascade');
    $table->foreign('role_id')->references('id')->on('roles')
        ->onDelete('cascade');
});

Schema::create('posts', function (Blueprint $table) {
    $table->bigIncrements('id');
    $table->unsignedInteger('user_id');
    $table->string('title');
    $table->text('content');
    $table->string('status');
    $table->timestamps();

    $table->foreign('user_id')->references('id')->on('users')
        ->onDelete('cascade');
});
```
### 2.2 Trait HasPermissions
app/Traits/HasPermissions.php
```php
<?php
namespace App\Traits;

use App\Models\Role;

trait HasPermissions
{
    protected $permissionList = null;

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function hasRole($role)
    {
        if (is_string($role)) {
            return $this->roles->contains('name', $role);
        }

        return false;
    }

    public function hasPermission($permission = null)
    {
        if (is_null($permission)) {
            return $this->getPermissions()->count() > 0;
        }

        if (is_string($permission)) {
            return $this->getPermissions()->contains('name', $permission);
        }

        return false;
    }

    private function getPermissions()
    {
        $role = $this->roles->first();
        if ($role) {
            if (! $role->relationLoaded('permissions')) {
                $this->roles->load('permissions');
            }

            $this->permissionList = $this->roles->pluck('permissions')->flatten();
        }

        return $this->permissionList ?? collect();
    }
}
```
### 2.3 Models
#### Role model
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    public $timestamps = false;

    public function permissions()
    {
        return $this->belongsToMany('App\Models\Permission');
    }
}
```
#### Permission model
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    public $timestamps = false;
}
```
#### Post model
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use SoftDeletes;

    const STATUS_DRAFT = 'draft';
    const STATUS_UNPUBLISHED = 'unpublished';
    const STATUS_PUBLISHED = 'published';

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}
```
#### User model
```php
<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Traits\HasPermissions;

class User extends Authenticatable
{
    use Notifiable, MustVerifyEmail, HasPermissions;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
```
### 2.3 Seeder Data
```php
DB::table('users')->insert([
	[
		'name' => 'admin',
		'email' => 'admin@gmail.com',
		'password' => bcrypt('123456'),
		'created_at' => now(),
		'updated_at' => now(),
		'email_verified_at' => now(),
	],
	[
		'name' => 'user',
		'email' => 'user@gmail.com',
		'password' => bcrypt('123456'),
		'created_at' => now(),
		'updated_at' => now(),
		'email_verified_at' => now(),
	],
]);

DB::table('permissions')->insert([
	['name' => 'review_post'],
	['name' => 'update_post'],
	['name' => 'delete_post'],
	['name' => 'restore_post'],
	['name' => 'force_delete_post'],
]);

DB::table('roles')->insert([
	['name' => 'admin'],
]);
DB::table('role_user')->insert([
	'role_id' => 1,
	'user_id' => 1,
]);
DB::table('permission_role')->insert([
	['permisison_id' => 1, 'role_id' => 1],
	['permisison_id' => 2, 'role_id' => 1],
	['permisison_id' => 3, 'role_id' => 1],
	['permisison_id' => 4, 'role_id' => 1],
	['permisison_id' => 5, 'role_id' => 1],
]);
```
## 3 Phân quyền
Chúng ta sẽ sử dụng Policy trong Laravel để kiểm tra quyền truy cập của user vào Controller.
### 3.1 Tạo policy
```php artisan make:policy PostPolicy --model=Post```
```php
<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Post;
use Illuminate\Auth\Access\HandlesAuthorization;

class PostPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the post.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Post  $post
     * @return mixed
     */
    public function view(?User $user, Post $post)
    {
        return (
            $post->status == Post::STATUS_PUBLISHED ||
            ($user && (
                $user->id == $post->user_id
                || $user->hasPermission('review_post')
            ))
        );
    }

    /**
     * Determine whether the user can create posts.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->hasVerifiedEmail()
    }

    /**
     * Determine whether the user can update the post.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Post  $post
     * @return mixed
     */
    public function update(User $user, Post $post)
    {
        return ($user->id == $post->user_id || $user->hasPermission('update_post'));
    }

    /**
     * Determine whether the user can delete the post.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Post  $post
     * @return mixed
     */
    public function delete(User $user, Post $post)
    {
        return ($user->id == $post->user_id || $user->hasPermission('delete_post'));
    }

    /**
     * Determine whether the user can restore the post.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Post  $post
     * @return mixed
     */
    public function restore(User $user, Post $post)
    {
        return ($user->id == $post->user_id || $user->hasPermission('restore_post'));
    }

    /**
     * Determine whether the user can permanently delete the post.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Post  $post
     * @return mixed
     */
    public function forceDelete(User $user, Post $post)
    {
        return ($user->id == $post->user_id || $user->hasPermission('force_delete_post'));
    }
}
````
### 3.2 Gán Policy cho Model
Trong file **app/Providers/AuthServiceProvider.php**, chúng ta gán **PostPolicy** cho model **Post**:
```php
protected $policies = [
    \App\Models\Post::class => \App\Policies\PostPolicy::class,
];
```

### 3.3 Check Policy
Chúng ta có thể check Policy ở bất kỳ đâu có thể sử dụng Authorization.
#### Ở controller:
```php
<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function show(Post $post)
    {
        $this->authorize('view', $post);
        
        // Logic to show post
    }
```

Trong đoạn code `$this->authorize('view', $post);`
- `view` chính là tên method trong `PostPolicy`
- `$post` (Post Model) là paramter thứ 2 được truyền vào method `view` trong `PostPolicy` sau `$user`.
#### Thông qua User model
```php
if ($user->can('view', $post)) {
        // Logic to show post
}
```
`view` và `$post` tương tự như ví dụ bên trên.
#### Ở Middleware
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:view,post')->only('show');
    }

    public function show(Post $post)
    {
        // Logic to show post
    }
}
```
Trong đoạn code `$this->middleware('can:view,post')->only('show');` 
- `view` chính là tên method trong `PostPolicy`
- `$post` được lấy từ parameter của method `show`, là paramter thứ 2 được truyền vào method `view` trong `PostPolicy` sau `$user`.
## 4 Kết
Trên đây là cách đơn giản để phân quyền cho User. Nếu có thắc mắc, vui lòng để lại comment.