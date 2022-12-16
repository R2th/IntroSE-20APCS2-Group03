Như chúng ta đã biết role và permission là một phần rất quan trọng trong hầu hết các website hiện nay. Trong laravel hiện nay có rất nhiều package hỗ trợ cho việc này như '[spatie/laravel-permission](https://github.com/spatie/laravel-permission)'. Nhưng hôm nay mình sẽ chia sẻ với các bạn cách tạo role và permission đơn giản mà không cần dùng đến package. Chúng ta cùng thực hiện qua các bước sau nhé.
  ### Bước 1. Tạo dự án laravel 8
- Tạo một dự án laravel (hiện tại bản mới nhất là 8.*) mới bằng câu lệnh sau, đồng thời bạn cũng vào trong file .env để config cho database dùng cho project này bao gồm tên database,  
````php
composer create-project --prefer-dist laravel/laravel Laravel_Role_Permission
````
- Để cài đặt theo vesion:
````php
composer create-project --prefer-dist laravel/laravel:^8 Laravel_Role_Permission
````
- Trong file .env
````php
DB_DATABASE= laravel_role_permissions //tên database
DB_USERNAME= root         //username
DB_PASSWORD=              //password
````
  ### Bước 2: Tạo Auth
- Tạo laravel authentication bằng câu lệnh sau:
````php
php artisan make:auth
````
  ### Bước 3: Tạo Model và Migration
- Sau khi tạo xong dự án và auth, chúng ta cần tạo model cho  roles và permissions.
````php
php artisan make:model Permission -m
php artisan make:model Role -m
````
  ### Bước 4: Sửa file migration
- Tạo **Users** table
````php
public function up()
{
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
}
````
- Tạo **Permissions** Table
````php
public function up()
{
    Schema::create('permissions', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('slug');
        $table->timestamps();
    });
}
````
- Tạo **Roles** Table
````php
public function up()
{
    Schema::create('roles', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('slug');
        $table->timestamps();
    });
}
````
  ### Bước 5: Thêm pivot table
- Chúng ta sẽ tạo bảng pivot **users_permissions**, sử dụng câu lệnh sau:
````php
php artisan make:migration create_users_permissions_table --create=users_permissions
````
-Thay đổi bảng user_permissions như sau:
````php
public function up()
{
    Schema::create('users_permissions', function (Blueprint $table) {
        $table->unsignedInteger('user_id');
        $table->unsignedInteger('permission_id');

        //FOREIGN KEY
        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        $table->foreign('permission_id')->references('id')->on('permissions')->onDelete('cascade');

        //PRIMARY KEYS
        $table->primary(['user_id','permission_id']);
    });
}

public function down()
{
    Schema::dropIfExists('users_permissions');
}
````
- Tiếp tục  tạo bảng pivot **users_roles**, sử dụng câu lệnh sau :
````php
php artisan make:migration create_users_roles_table --create=users_roles
````
- Thay đổi bảng **users_roles** như sau:
````php
public function up()
{
    Schema::create('users_roles', function (Blueprint $table) {
        $table->unsignedInteger('user_id');
        $table->unsignedInteger('role_id');

     //FOREIGN KEY
       $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
       $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');

     //PRIMARY KEYS
       $table->primary(['user_id','role_id']);
    });
}

public function down()
{
    Schema::dropIfExists('users_roles');
}
````
- Tạo thêm bảng **roles_permissions**. Bảng này được sử dụng để cấp quyền cho người dùng. Ví dụ, người dùng có quyền xem đối với bài đăng còn với tư cách là quản trị viên có quyền chỉnh sửa hoặc xóa bài đăng. Đó là nhiệm vụ của bảng này, sử dụng câu lệnh sau:
````php
php artisan make:migration create_roles_permissions_table --create=roles_permissions
````
- Thay đổi bảng **roles_permissions** như sau:
````php
public function up()
{
    Schema::create('roles_permissions', function (Blueprint $table) {
         $table->unsignedInteger('role_id');
         $table->unsignedInteger('permission_id');

         //FOREIGN KEY
         $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
         $table->foreign('permission_id')->references('id')->on('permissions')->onDelete('cascade');

         //PRIMARY KEYS
         $table->primary(['role_id','permission_id']);
    });
}

public function down()
{
    Schema::dropIfExists('roles_permissions');
}
````
- Run câu lệnh sau để tạo migration :
````php
php artisan migrate
````
  ### Bước 6: Tạo relationships
- Tạo quan hệ giữa hai bảng **roles** và **permissions** như sau:
- Trong file **App/Role.php**
````php
public function permissions() {

   return $this->belongsToMany(Permission::class,'roles_permissions');
       
}

public function users() {

   return $this->belongsToMany(User::class,'users_roles');
       
}
````
- Trong file **App/Permission.php**
````php
public function roles() {

   return $this->belongsToMany(Role::class,'roles_permissions');
       
}

public function users() {

   return $this->belongsToMany(User::class,'users_permissions');
       
}
````
  ### Bước 7: Tạo Trait
- Tạo một thư mục mới và đặt tên là Permissions và tạo một tên tệp mới HasPermissionsTrait.php. Đây là xử lý quan hệ người dùng. Trở lại trong model User chúng ta chỉ cần import trait này vào là được.
- Trong file app/User.php
````php
namespace App;

use App\Permissions\HasPermissionsTrait;

class User extends Authenticatable
{
    use HasPermissionsTrait; //Import The Trait
}
````
- Trong file **HasPermissionsTrait.php**
````php
namespace App;

use App\Permissions\HasPermissionsTrait;

class User extends Authenticatable
{
namespace App\Permissions;

use App\Permission;
use App\Role;

trait HasPermissionsTrait {

   public function givePermissionsTo(... $permissions) {

        $permissions = $this->getAllPermissions($permissions);
        if($permissions === null) {
          return $this;
        }
        $this->permissions()->saveMany($permissions);
        return $this;
      }

      public function withdrawPermissionsTo( ... $permissions ) {

        $permissions = $this->getAllPermissions($permissions);
        $this->permissions()->detach($permissions);
        return $this;

      }

      public function refreshPermissions( ... $permissions ) {

        $this->permissions()->detach();
        return $this->givePermissionsTo($permissions);
      }

      public function hasPermissionTo($permission) {

        return $this->hasPermissionThroughRole($permission) || $this->hasPermission($permission);
      }

      public function hasPermissionThroughRole($permission) {

        foreach ($permission->roles as $role){
          if($this->roles->contains($role)) {
            return true;
          }
        }
        return false;
      }

      public function hasRole( ... $roles ) {

        foreach ($roles as $role) {
          if ($this->roles->contains('slug', $role)) {
            return true;
          }
        }
        return false;
      }

      public function roles() {

        return $this->belongsToMany(Role::class,'users_roles');

      }
      public function permissions() {

        return $this->belongsToMany(Permission::class,'users_permissions');

      }
      protected function hasPermission($permission) {

        return (bool) $this->permissions->where('slug', $permission->slug)->count();
      }

      protected function getAllPermissions(array $permissions) {

        return Permission::whereIn('slug',$permissions)->get();

      }

    }
}
````
-Ở đây chúng ta có thể debug như sau để kiểm tra.
````php
$user = $request->user(); //getting the current logged in user
dd($user->hasRole('admin','editor')); // and so on
````
  ### Bước 8: Tạo custom Provider
- Trong bước này, chúng ta sử dụng lệnh Laravel directive **“can”** để kiểm tra xem User có quyền hay không  thay vì sử dụng hàm $user-> hasPermissionTo ().
- Để sử dụng giống như $user-> can(), chúng ta cần tạo PermissionsServiceProvider mới để ủy quyền.  Sử dụng câu lệnh sau:
````php
php artisan make:provider PermissionsServiceProvider
````
- Đăng ký trong method **boot** như sau:
````php
namespace App\Providers;

use App\Permission;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class PermissionsServiceProvider extends ServiceProvider
{
   
    public function register()
    {
        //
    }

    public function boot()
    {
        try {
            Permission::get()->map(function ($permission) {
                Gate::define($permission->slug, function ($user) use ($permission) {
                    return $user->hasPermissionTo($permission);
                });
            });
        } catch (\Exception $e) {
            report($e);
            return false;
        }

        //Blade directives
        Blade::directive('role', function ($role) {
             return "if(auth()->check() && auth()->user()->hasRole({$role})) :"; //return this if statement inside php tag
        });

        Blade::directive('endrole', function ($role) {
             return "endif;"; //return this endif statement inside php tag
        });

    }
}
````
 - Tiếp đến đăng ký **PermissionsServiceProvider**. Trong file **app.php** chúng ta làm như sau :
````php
//config\app.php
'providers' => [

        App\Providers\PermissionsServiceProvider::class,
    
 ],
````
 - Bạn có thể test như sau:
````php
dd($user->can('permission-slug'));
````
 ### Bước 9: Tạo dữ liệu để test
 - Tạo route:
 ````php
Route::get('/roles', [PermissionController::class,'Permission']);
````
 - Tạo **App\Http\Controllers\PermissionController.php**
 ````php
namespace App\Http\Controllers;

use App\Permission;
use App\Role;
use App\User;
use Illuminate\Http\Request;

class PermissionController extends Controller
{   

    public function Permission()
    {   
    	$user_permission = Permission::where('slug','create-tasks')->first();
		$admin_permission = Permission::where('slug', 'edit-users')->first();

		//RoleTableSeeder.php
		$user_role = new Role();
		$user_role->slug = 'user';
		$user_role->name = 'User_Name';
		$user_role->save();
		$user_role->permissions()->attach($user_permission);

		$admin_role = new Role();
		$admin_role->slug = 'admin';
		$admin_role->name = 'Admin_Name';
		$admin_role->save();
		$admin_role->permissions()->attach($admin_permission);

		$user_role = Role::where('slug','user')->first();
		$admin_role = Role::where('slug', 'admin')->first();

		$createTasks = new Permission();
		$createTasks->slug = 'create-tasks';
		$createTasks->name = 'Create Tasks';
		$createTasks->save();
		$createTasks->roles()->attach($user_role);

		$editUsers = new Permission();
		$editUsers->slug = 'edit-users';
		$editUsers->name = 'Edit Users';
		$editUsers->save();
		$editUsers->roles()->attach($admin_role);

		$user_role = Role::where('slug','user')->first();
		$admin_role = Role::where('slug', 'admin')->first();
		$user_perm = Permission::where('slug','create-tasks')->first();
		$admin_perm = Permission::where('slug','edit-users')->first();

		$user = new User();
		$user->name = 'Test_User';
		$user->email = 'test_user@gmail.com';
		$user->password = bcrypt('1234567');
		$user->save();
		$user->roles()->attach($user_role);
		$user->permissions()->attach($user_perm);

		$admin = new User();
		$admin->name = 'Test_Admin';
		$admin->email = 'test_admin@gmail.com';
		$admin->password = bcrypt('admin1234');
		$admin->save();
		$admin->roles()->attach($admin_role);
		$admin->permissions()->attach($admin_perm);

		
		return redirect()->back();
    }
}
````
- Chạy url route bạn có thể nhìn thấy một số dữ liệu giả từ các bảng.
 ````php
$user = $request->user();
dd($user->hasRole('user')); //sẽ return true, nếu user có role
dd($user->givePermissionsTo('create-tasks'));// sẽ return về permission, không thì trả về null
dd($user->can('create-tasks')); // sẽ return true, nếu user có  permission
````
- Trong file **blade** bạn có thể dùng nó như sau:
 ````php
@role('user')

 This is user role

@endrole

@role('admin')

 This is admin role

@endrole
````
- Bạn có thể sử dụng nhiều role nếu bạn muốn.

 ### Bước 10: Cài đặt Middleware
 - Sử dụng câu lệnh sau:
  ````php
php artisan make:middleware RoleMiddleware
````
 - Để add middleware vào file **kernel** và setup như sau:
 - Trong file **App\Http\Middleware\RoleMiddleware.php**
````php
namespace App\Http\Middleware;

use Closure;

class RoleMiddleware
{
    public function handle($request, Closure $next, $role, $permission = null)
    {
        if(!$request->user()->hasRole($role)) {
             abort(404);
        }

        if($permission !== null && !$request->user()->can($permission)) {
              abort(404);
        }

        return $next($request);
    }
}
````
 - Đăng ký **RoleMiddleware** vào file **Kernel.php**
 - **App\Http\Kernel.php**
 ````php
protected $routeMiddleware = [
    
    'role' => \App\Http\Middleware\RoleMiddleware::class,
];
````
 - Và bây giờ trong file routes chúng ta đã có thể sử dụng:

 ````php
Route::group(['middleware' => 'role:user'], function() {

   Route::get('/user', function() {

      return 'Welcome...!!';
      
   });

});
````
 - Bây giờ bạn có thể sử dụng trong **Controller** của mình như bên dưới để cấp quyền và truy cập cho người dùng.

 ````php
public function __construct()
{
   $this->middleware('auth'); 
}


public function store(Request $request)
{
    if ($request->user()->can('create-tasks')) {
        ...
    }
}

public function destroy(Request $request, $id)
{   
    if ($request->user()->can('delete-tasks')) {
      ...
    }

}
````

 - Các kiến thức các bạn có thể tìm hiểu thêm 
   -  Laravel Gate facade at [Laravel Documentation.](https://laravel.com/docs/8.x/authorization#gates)
   -  [Trai](https://viblo.asia/p/tim-hieu-ve-trait-trong-php-bxjeZWENkJZ)t trong php.
   
** TRÊN ĐÂY LÀ NHỮNG CHIA SẺ CỦA MÌNH, CẢM ƠN CÁC BẠN ĐÃ ĐỌC BÀI VIẾT .**😘