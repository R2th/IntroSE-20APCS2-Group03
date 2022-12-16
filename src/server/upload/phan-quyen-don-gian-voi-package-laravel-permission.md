Như các bạn đã biết, phân quyền trong một ứng dụng là một phần không thể thiếu trong việc phát triển phần mềm, dù đó là ứng dụng web hay là mobile. Vậy nên, hôm nay mình sẽ giới thiệu một package có thể giúp các bạn phân quyền nhanh và đơn giản trong một website được viết bằng PHP với framework là Laravel. Đó là package laravel-permission.

## 1. Cài đặt Laravel Permission

Laravel permission cho phép chúng ta có thể dễ dàng phân chia các vai trò (roles) và quyền (permissions) dùng để quản lý quyền hạn truy cập trong một trang web. Để cài đặt package này, chúng ta cần:
* Cài đặt Laravel 5.8 hoặc cao hơn
* Nếu bạn đang có sẵn file `config/permission.php` bạn phải đổi tên hoặc xóa ngay, bởi vì khi setup thì package sẽ được publishes vào `config/permission.php`

Nếu thỏa mãn 2 điều kiện trên rồi chúng ta chạy câu lệnh dưới nhé :

```
composer require spatie/laravel-permission
```

Sau đó, trong `config/app.php` chúng ta add service provide cho package như sau:
```
'providers' => [
    // ...
    Spatie\Permission\PermissionServiceProvider::class,
];
```

Sau đó, publish migration thông qua lệnh:
```
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
```
Chạy lệnh `php artisan migrate` và chúng ta sẽ có các bảng như roles, permissions, role_has_permissions, model_has_roles và model_has_permission

## 2. Tạo Roles và Permissions

Đầu tiên add trait của `Spatie\Permission\Traits\HasRoles` vào `User` model(s):
```
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasRoles;

    // ...
}
```
Sau đó chúng ta thêm các vai trò (roles) và quyền (permissions), một role có thể có nhiều permission. Chúng ta làm như sau:
```
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

$role = Role::create(['name' => 'writer']);
$permission = Permission::create(['name' => 'edit articles']);
```
Như trên các bạn đã thấy, mình vừa tạo ra một Role có tên là `writer`  và một Permission là `edit articles`

Để trao quyền `edit articles` cho  vai trò `writer`, chúng ta làm như sau:
```
$role->givePermissionTo($permission);
//hoặc...
$permission->assignRole($role);
```
Để lấy thông tin tất cả các `users` có role là `writer` chúng ta làm như sau:
```
$users = User::role('writer')->get()
```
hoặc trả về các user có quyền truy cập `edit articles`
```
$users = User::permission('edit articles')->get();
```

## 3. Ứng dụng 

### 3.1. Trao quyền trực tiếp cho một user

Bạn có thể giao một quyền cho một user như sau:
```
$user->givePermissionTo('edit articles'); // giao quyền edit articles cho một user nào đó
```
bạn cũng có thể giao nhiều quyền user trong một lần hoặc có thể sử dụng mảng:
```
// You can also give multiple permission at once
$user->givePermissionTo('edit articles', 'delete articles');

// You may also pass an array
$user->givePermissionTo(['edit articles', 'delete articles']);
```

Để xóa một quyền khỏi một `user` nào đó, chúng ta làm như sau :
```
$user->revokePermissionTo('edit articles');
```
hoặc xóa và thêm mới một quyền khác chẳng hạn:
```
$user->syncPermissions(['edit articles', 'delete articles']);
```
Bạn cũng có thể check xem liệu một `user` có một quyền nào đó hay không:
```
$user->hasPermissionTo('edit articles');
```

Và còn một số option khác, các bạn có thể tham khảo thêm [tại đây](https://docs.spatie.be/laravel-permission/v3/basic-usage/direct-permissions/).

### 3.2. Trao quyền thông qua roles

Một roles có thể được trao cho bất cứ `users` nào bằng cách :
```
$user->assignRole('writer');
```
bạn cũng có thể giao nhiều `roles` cho `user` trong một lần hoặc có thể sử dụng mảng:
```
// You can also assign multiple roles at once
$user->assignRole('writer', 'admin');
// or as an array
$user->assignRole(['writer', 'admin']);
```
Hoặc để xóa một role khỏi một user, chúng ta chỉ cần làm như sau:
```
$user->removeRole('writer');
```
Bạn cũng có thể check xem liệu `user` có phải là `role` đang cần tìm bằng cách :
```
$user->hasRole('writer');
```
hoặc liệu có ít nhất một trong các roles trên thì chúng ta chỉ việc truyền mảng vào như sau:
```
$user->hasRole(['editor', 'moderator']);
```
Và còn một số option thông dụng khác các bạn có thể tham khảo thêm [tại đây.](https://docs.spatie.be/laravel-permission/v3/basic-usage/role-permissions/)

### 3.3. Sử dụng với middleware

Bạn có thể sử dụng `can` như một mặc định để giới hạn quyền truy cập cho trang web bằng cách :
```
Route::group(['middleware' => ['can:publish articles']], function () {
    //
});
```
Hoặc nếu bạn không muốn sử dụng mặc định, Laravel permission mang đến cho chúng ta các middleware `RoleMiddleware`, `PermissionMiddleware` and `RoleOrPermissionMiddleware`. Để sử dụng, bạn cần thêm vào `app/Http/Kernel.php` file như sau:
```
protected $routeMiddleware = [
    // ...
    'role' => \Spatie\Permission\Middlewares\RoleMiddleware::class,
    'permission' => \Spatie\Permission\Middlewares\PermissionMiddleware::class,
    'role_or_permission' => \Spatie\Permission\Middlewares\RoleOrPermissionMiddleware::class,
];
```
Sau đó sử dụng chúng để kiểm tra các route thôi nào :
```
// Chỉ có role là super-admin mới có thể truy cập vào các route của group này
Route::group(['middleware' => ['role:super-admin']], function () {
    //
});

// Chỉ có permission là publish articles thì mới có thể truy cập vào các route của group  này
Route::group(['middleware' => ['permission:publish articles']], function () {
    //
});

// Chỉ có role là super-admin hoặc permission là publish articles thì mới có thể truy cập vào các route của group này 
Route::group(['middleware' => ['role:super-admin','permission:publish articles']], function () {
    //
});

Route::group(['middleware' => ['role_or_permission:super-admin|edit articles']], function () {
    //
});
```
Tất cả những quyền không được phép truy cập sẽ mặc định trả về page 403:
![](https://images.viblo.asia/f67b240e-16dd-4ad7-90b1-ba0e2bfd8bf6.jpg)
Chúng ta cũng có thể tham khảo thêm các option khác khi làm việc với middleware [tại đây.](https://docs.spatie.be/laravel-permission/v3/basic-usage/middleware/)

### 3.4. Sử dụng trực tiếp trên Blade

Đối với phần view, để hiển thị view tương ứng cho các vai trò, chúng ta có thể sử dụng `@can`, `@cannot`, `@canany`, and `@guest` để kiểm tra việc xem thông tin hiển thị trên một trang web. Chúng ta làm như sau:
```
@can('edit articles')
  //
@endcan
```
hoặc
```
@if(auth()->user()->can('edit articles') && $some_other_condition)
  //
@endif
```

Bạn cũng có thể dùng `role` để check việc này:
```
@role('writer')
    I am a writer!
@else
    I am not a writer...
@endrole
```
hoặc
```
@hasrole('writer')
    I am a writer!
@else
    I am not a writer...
@endhasrole
```

Chúng ta có thể linh hoạt trong việc check nhiều `roles` hơn như sau:
```
@hasanyrole($collectionOfRoles)
    Tôi có một hoặc nhiều roles trong điều kiện này
@else
   Tôi không thuộc roles nào ở trên
@endhasanyrole

// hoặc

@hasanyrole('writer|admin')
    Tôi là một writer hoặc admin hoặc cả hai :D
@else
   Tôi không là writer cũng không là admin
@endhasanyrole
```
Bạn có thể xem thêm những option khác để đa dạng việc sử dụng roles và permissions trong blade [tại đây.](https://docs.spatie.be/laravel-permission/v3/basic-usage/blade-directives/)

## 4. Kết luận
Vừa rồi, mình đã giới thiệu và hướng dẫn sử dụng một số tính năng mà mình cho là quan trọng, cơ bản và cần có nhất trong việc sử dụng package `spatie/laravel-permission` để phân quyền trong một ứng dụng web chạy bằng framework Laravel. Hy vọng qua bài viết này, các bạn có thể dễ dàng hình dung hơn để áp dụng vào việc phân quyền cho trang web của mình một cách đơn giản và nhanh chóng nhất. Cảm ơn các bạn đã đọc bài viết này, hẹn gặp lại các bạn vào những bài viết tiếp theo

## Tài liệu tham khảo :
https://docs.spatie.be/laravel-permission/v3/introduction/