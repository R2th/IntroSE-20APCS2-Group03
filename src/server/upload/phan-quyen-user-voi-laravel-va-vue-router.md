Chào mừng các bạn quay trở lại với bài viết của mình. Ở bài này mình sẽ hướng dẫn các bạn cách phân quyền user theo `role` và `permission` bằng laravel và giới hạn khả năng truy cập và thao tác của user theo từng route trong Vue-router nhé.

Mô tả một chút về những gì ta sẽ làm. Ở bài này, chúng ta sẽ có các routes, mỗi routes sẽ có 1 số chức năng nhất định. Chỉ các user có `role`  tương ứng mới truy cập được vào từng route, và tại mỗi route, user phải có các `permission` nhất định để thực hiện được 1 hành động nào đó. Cùng bắt tay vào làm nhé ;)

# Setup
Đầu tiên ta tạo mới project Laravel, đặt tên tuỳ ý các bạn, ở đây mình đặt là `role_permission_vue` nhé:
```markdown
laravel new role_permission_vue
```
Sau đó ta tiến hành cài đặt npm:
```bash
npm install
```
Cài luôn cả `vue-router` nhé các bạn:
```bash
npm install --save vue-router
```
Ở bài này để đơn giản chúng ta sẽ dùng auth mặc định của Laravel luôn nhé. Các bạn chạy câu lệnh sau:
```html
php artisan make:auth
```

Sau đó sửa lại tên database ở file `.env` theo tên các bạn mong muốn nhé
# Models & Migrations
Đầu tiên chúng ta sẽ tạo các model `Role`, `Permission` nhé:
```html
php artisan make:model Permission -m // -m để tạo luôn migration cho model
php artisan make:model Role -m
```
Tiếp theo ta vào `database/migrations/create_permissions_table` sửa lại hàm `up()` như sau nhé:
```php
public function up()
{
    Schema::create('permissions', function (Blueprint $table) {
        $table->increments('id');
        $table->string('slug');
        $table->string('name');
        $table->timestamps();
    });
}
```
Ở đây ta có 2 trường cần chú ý là `name`: tên của quyền là gì (ví dụ: được xem user, được thêm bài post,...) và `slug` là định danh của quyền đó và là duy nhất, mục đích có trường này để sau này mỗi khi cần check ta sử dụng `can('slug')` trông sẽ thân thiện hơn việc dùng `id`

Tương tự ta sửa migration của `Role` nhé:
```php
public function up()
{
    Schema::create('roles', function (Blueprint $table) {
        $table->increments('id');
        $table->string('slug');
        $table->string('name');
        $table->timestamps();
    });
}
```
Giải thích: trong bài này, ta sẽ tách `role` và `permission` khỏi nhau. Không giống như bình thường: 1 user có 1 `role` (admin, mod,...), mỗi role sẽ có 1 số `permission`, ở đây việc user có `role` nào và `quyền` gì 2 điều đó không liên quan tới nhau, các user với các `role` khác nhau có thể có cùng 1 số `permission`. Bằng cách này, sau này khi ta muốn giới hạn `permission` cho mỗi user sẽ dễ hơn, tránh gán thừa thãi quyền cho mỗi user. Ví dụ: ta muốn userA có thêm quyền để xem toàn bộ hoá đơn trong hệ thống, ta chỉ cần thêm quyền `view-order` thay vì như bình thường ta phải gán cho user đó làm `admin` để có thể xem, nhưng khi làm `admin` thì user lại có thể làm được nhiều việc khác nữa ngoài `view-order`. 

Từ đó, ta cần tạo thêm các bảng trung gian để liên hệ giữa `user-role`, `user-permission`. Ta chạy các câu lệnh sau để làm việc đó:
```bash
php artisan make:migration create_users_permissions_table --create=users_permissions

php artisan make:migration create_users_roles_table --create=users_roles
```
Sau đó ở file migration `users_permissions` các bạn sửa lại hàm `up()` như sau:
```php
public function up()
{
    Schema::create('users_permissions', function (Blueprint $table) {
        $table->integer('user_id')->unsigned();
        $table->integer('permission_id')->unsigned();

     //FOREIGN KEY CONSTRAINTS
        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        $table->foreign('permission_id')->references('id')->on('permissions')->onDelete('cascade');

    //SETTING THE PRIMARY KEYS
        $table->primary(['user_id','permission_id']);
    });
}
```
Bảng này chưa thông tin user sẽ có quyền gì. Do đó ta sẽ có các trường `user_id`, `permission_id`. Đồng thời ta thiết lập thêm khoá ngoại từ bảng này tới các bảng `users` và `permission` theo `id` tương ứng, option `onDelete('cascade')` để khi ở bảng `users` hoặc `permissions` ta xoá thì ở bảng này các record cũng xoá theo nhé.

Tương tự các bạn sửa lại file migration `users_roles` nhé:
```php
public function up()
{
    Schema::create('users_roles', function (Blueprint $table) {
        $table->integer('user_id')->unsigned();
        $table->integer('role_id')->unsigned();

      //FOREIGN KEY CONSTRAINTS
        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');

      //SETTING THE PRIMARY KEYS
        $table->primary(['user_id','role_id']);
     });
}
```


Ổn rồi đó, đến đây ta migrate DB nhé:
```php
php artisan migrate
```
Nếu bạn nào bị lỗi `...key too long` thì mở file `app/providers/AppServiceProvider` sửa lại như sau nhé:
```php
use Illuminate\Support\Facades\Schema;
...
public function boot()
{
    Schema::defaultStringLength(191);
}
```
Sau đó migrate lại nhé.
# Tạo Trait
Ta sẽ tạo 1 trait ở trong thư mục `app`, đặt tên là `HasPermissionsTrait`, với nội dung như sau nhé:
```php
<?php
namespace App;

use App\Permission;
use App\Role;

trait HasPermissionsTrait {

   public function roles() {
      return $this->belongsToMany(Role::class,'users_roles');

   }

   public function permissions() {
      return $this->belongsToMany(Permission::class,'users_permissions');

   }

   public function hasRole(...$roles) {
        foreach ($roles as $role) {
            if ($this->roles->contains('slug', $role)) {
                return true;
            }
        }
        return false;
    }
     
    public function hasPermission($permission) {
        return (bool) $this->permissions->where('slug', $permission->slug)->count();
    }

    protected function getAllPermissions($permissions)
    {
        return Permission::whereIn('slug', $permissions)->get();
    }

    public function givePermissionsTo(...$permissions) {
        $permissions = $this->getAllPermissions($permissions);
        if($permissions === null) {
           return $this;
        }
        $this->permissions()->saveMany($permissions);
        return $this;
    }

    public function deletePermissions(...$permissions) {
        $permissions = $this->getAllPermissions($permissions);
        $this->permissions()->detach($permissions);
        return $this;
    }
}
```
Sau đó ở model `User` ta sẽ sử dụng trait này nhé:
```perl
...
use App\HasPermissionsTrait;

class User extends Authenticatable
{
    use Notifiable, HasPermissionsTrait;
    ...
}
```
Cùng dừng lại 1 chút và xem ta có gì nhé:
- Ở đây mình dùng Trait để nếu sau này các bạn có thêm các loại model khác kiểu `UserTest, Customer,...` thì các bạn có thể dùng lại Trait này luôn.
- Cùng nhìn vào file Trait. Các bạn chú ý `$this` trỏ về model mà chúng ta sử dụng Trait đó, ở đây `$this` chính là `User` nhé. Mọi hàm ở Trait sẽ thao tác trực tiếp trên $user nhé
- Ở đó ta có hàm `roles` thể hiện cho 1 user có nhiều role, id của user và role tương ứng được map trong bảng `users_roles`. Tương tự cho `permissions` nhé :)
- Hàm `hasRole` check xem user có 1 hoặc 1 số role nhất định. Tham số nhận vào các bạn để ý là `...roles`, tức là ở đây các bạn có thể truyền vào bao nhiêu tham số tuỳ ý. Giống như bên Javascript nhé (tuyệt vời <3). Ví dụ `hasRole('create', 'delete', 'view')`
- Hàm `givePermissionsTo` để thêm permission cho user hiện tại.
- Còn các hàm khác các bạn chú ý đọc là có thể hiểu nó làm gì nhé. (nếu không thì comment cho mình được biết nhé :))

Tiếp theo, để nâng cao hơn xíu, ta sẽ tận dụng `can` trong Laravel để check quyền, giờ đây thay vì `$user->hasPermission('view-orders')` ta có thể viết ngắn gọn và ý nghĩa hơn `$user->can('view-orders')` bằng cách như sau. Ta tạo 1 Provider đặt tên là `PermissionsServiceProvider`:
```bash
php artisan make:provider PermissionsServiceProvider
```
Sau đó vào `app/providers/PermissionsServiceProvider` và sửa lại như sau:
```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Permission;
use Illuminate\Support\Facades\Gate;

class PermissionsServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        Permission::get()->map(function($permission){
            Gate::define($permission->slug, function($user) use ($permission){
               return $user->hasPermission($permission);
            });
        });
    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
```
Ở đây trong hàm `boot` ta lấy toàn bộ `Permission`sau đó duyệt qua chúng sử dụng hàm `map` (ôi lại giống javascript :) ). Với mỗi `permission` định nghĩa nó bằng `Gate`. Mình biết đoạn này hơi khó hiểu. Để chi tiết hơn, bên trong khối lệnh `map` sẽ xảy ra như sau với mỗi vòng lặp:
```html
Gate::define('view-orders', function($user) use ($permission){
   return $user->hasPermission($permission);
});
```
Nhờ thế mà sau này ta mới có thể dùng `$user->can('view-orders')`, tức với mỗi quyền ta phải định nghĩa nó lại bằng Gate thì mới dùng với `can` được. Nhưng tin mình đi, đáng để dùng lắm ;)

Sau đó các bạn khai báo `PermissionsServiceProvider` vào file `config/app.php` nhé:
```php
...
'providers' => [
    ...
    App\Providers\PermissionsServiceProvider::class,
]
...
```
# Tạo seeder
Tiếp theo chúng ta tạo các file để seed sẵn dữ liệu nhé
```bash
php artisan make:seeder PermissionTableSeeder
php artisan make:seeder RoleTableSeeder
php artisan make:seeder UserTableSeeder
```
Sửa nội dung các file này như sau:

`PermissionTableSeeder.php`
```php
<?php

use Illuminate\Database\Seeder;
use App\Role;
use App\Permission;

class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $createTasks = new Permission();
        $createTasks->slug = 'create-tasks';
        $createTasks->name = 'Create Tasks';
        $createTasks->save();

        $deleteTasks = new Permission();
        $deleteTasks->slug = 'delete-tasks';
        $deleteTasks->name = 'Delete Tasks';
        $deleteTasks->save();

        $viewUsers = new Permission();
        $viewUsers->slug = 'view-users';
        $viewUsers->name = 'View Users';
        $viewUsers->save();
    }
}
```
Ở trên ta có 3 `permission`: 
- `create-tasks`: để tạo mới 1 task
- `delete-tasks`: xoá task
- `view-users`: xem tất cả user
`RoleTableSeeder.php`
```php
<?php

use Illuminate\Database\Seeder;
use App\Permission;
use App\Role;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $dev_role = new Role();
        $dev_role->slug = 'developer';
        $dev_role->name = 'Front-end Developer';
        $dev_role->save();

        $manager_role = new Role();
        $manager_role->slug = 'manager';
        $manager_role->name = 'Assistant Manager';
        $manager_role->save();
    }
}
```
Ở đây ta có 2 `role`: `developer` và `manager`

`UserTableSeeder.php`
```php
<?php

use Illuminate\Database\Seeder;
use App\Role;
use App\Permission;
use App\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $dev_role = Role::where('slug','developer')->first();
        $manager_role = Role::where('slug', 'manager')->first();
        $dev_create_perm = Permission::where('slug','create-tasks')->first();
        $dev_delete_perm = Permission::where('slug','delete-tasks')->first();
        $manager_perm = Permission::where('slug','view-users')->first();

        $developer_create = new User();
        $developer_create->name = 'I am developer - Create';
        $developer_create->email = 'dev_create@test.com';
        $developer_create->password = bcrypt('secret');
        $developer_create->save();
        $developer_create->roles()->attach($dev_role);
        $developer_create->permissions()->attach($dev_create_perm);

        $developer_delete = new User();
        $developer_delete->name = 'I am developer - Delete';
        $developer_delete->email = 'dev_delete@test.com';
        $developer_delete->password = bcrypt('secret');
        $developer_delete->save();
        $developer_delete->roles()->attach($dev_role);
        $developer_delete->permissions()->attach($dev_delete_perm);

        $developer_full = new User();
        $developer_full->name = 'I am developer - Full';
        $developer_full->email = 'dev_full@test.com';
        $developer_full->password = bcrypt('secret');
        $developer_full->save();
        $developer_full->roles()->attach($dev_role);
        $developer_full->permissions()->attach($dev_create_perm);
        $developer_full->permissions()->attach($dev_delete_perm);

        $manager = new User();
        $manager->name = 'I am manager';
        $manager->email = 'manager@test.com';
        $manager->password = bcrypt('secret');
        $manager->save();
        $manager->roles()->attach($manager_role);
        $manager->permissions()->attach($manager_perm);

        $manager1 = new User();
        $manager1->name = 'I am manager1';
        $manager1->email = 'manager1@test.com';
        $manager1->password = bcrypt('secret');
        $manager1->save();
        $manager1->roles()->attach($manager_role);
    }
}
```
Ở trên các bạn có thể thấy ta có 5 users, mỗi user có 1 hoặc 1 số `permission`, hoặc như user `manager1` dù là `manager` nhưng không có `permission` nào cả.

Xong tất cả các bạn chạy lại DB và seed dữ liệu bằng command:
```bash
php artisan migrate:refresh --seed
```
Option `refresh` để rollback lại toàn bộ các bảng bạn đã migrate từ trước và migrate lại
# Testing
Đến đây ta thử test xem mọi thứ ổn chưa nhé. 

Các bạn mở file `routes/web.php` sửa lại như sau:
```php
Route::get('/', function () {
    $user = request()->user();
    dd($user->can('create-tasks'));
    return view('welcome');
})->middleware('auth');
```
Khởi động app `php artisan serve` đã nhé :-D

Ở đây ta in ra user đăng nhập có quyền `create-tasks` hay không. Thử đăng nhập với user `dev_create@test.com` nhé. Chúng ta sẽ thấy in ra màn hình:

![Laravel_Var_dump](https://images.viblo.asia/7518335a-6797-4d83-a3ac-75c9e72b4446.png)

Tương tự với các user khác, các bạn có thể test thêm nhé.
# Trước khi tới Front-end
Ở bài này ta sẽ giả sử user có một số quyền nhất định có thể thêm Task. Vì thế ta tạo thêm model Task nhé.
```bash
php artisan make:model Task -m
```
Sau đó ở file model `Task` các bạn sửa lại chút như sau:
```php
class Task extends Model
{
    protected $fillable = ['content'];
}
```
Ở file migration của Task các bạn sửa lại như sau:
```php
public function up()
{
    Schema::create('tasks', function (Blueprint $table) {
        $table->increments('id');
        $table->text('content');
        $table->timestamps();
    });
}
```
Sau đó chạy: `php artisan migrate` nhé. Tiếp theo ta tạo `TaskController` nhé:
```php
php artisan make:controller TaskController --resource
```
Ở file TaskController các bạn sửa lại một số hàm như sau:
```php
use Task;
...

public function __construct()
{
   $this->middleware('auth'); //bắt buộc khi sử dụng phải đăng nhập
}

...

public function index(Request $request)
{   
    return response()->json(Task::all());
}

...

public function store(Request $request)
{
    if ($request->user()->can('create-tasks')) {
        $task = new Task();
        $task->content = $request->input('content');
        $task->save();

        return response()->json($task);
    }

    return response([
        'status' => false,
        'message' => 'You don\'t have permission to create task!' 
    ], 200);
}

...

public function destroy(Request $request, $id)
{   
    if ($request->user()->can('delete-tasks')) {
        $task = Task::find($id);
        $task->delete();
        return response([
            'status' => true,
        ], 200);
    }

    return response([
        'status' => false,
        'message' => 'You don\'t have permission to delete task!' 
    ], 200);
}
```
Toàn bộ code ở trên đã `self-explained` tức tự nó đã nói lên nó làm gì các bạn đọc nếu thắc mắc thì comment cho mình nhé. 

Chúng ta tạo luôn `UserController` với nội dung như sau nhé:
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function __construct()
    {
       $this->middleware('auth');
    }
    
    public function index(Request $request) {
        if ($request->user()->can('view-users')) {
            return response()->json(User::all()); 
        } 

        return response([
            'status' => false,
            'message' => 'You don\'t have permission to view users!' 
        ], 200);
    }
}
```

# VueJS
Ở `resources/js/components` ta xoá đi file `Example Component`. Sau đó tạo lần lượt 3 file sau:
`App.vue`:
```html
<template>
    <div class="container">
        <div class="user-login">
            <div class="username">
                User: {{ $root.user.name }}
            </div>
            <div class="logout">
                <a href="#" @click.prevent="logout">Logout</a>
            </div>
        </div>
        <div>
            <ul class="nav nav-pills">
                <li class="nav-item">
                    <router-link exact class="nav-link" to="/">Tasks</router-link>
                </li>
                <li class="nav-item">
                    <router-link exact class="nav-link" to="/user">Users</router-link>
                </li>
            </ul>
        </div>
        <div class="main-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            logout:function(){
                axios.post('logout').then(response => {
                
                }).catch(error => {
                    if (error.status === 302 || 401) {
                        document.location.href = '/login'
                    }
                    else {
                        // throw error and go to catch block
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        margin-top: 50px;
        .user-login {
            text-align: right;
        }
        .main-content {
            margin-top: 50px;
        }
    }
</style>
```
`Task.vue`
```html
<template>
    <div>
        <div class="error" v-if="error.message.length">
            <div class="alert alert-danger" role="alert">
                {{ error.message }}
            </div>
        </div>
        <div class="row">
            <div class="col-9">
                <input type="text" v-model="content" class="form-control" placeholder="Enter task...">
            </div>
            <div class="col-3">
                <button class="btn btn-primary" @click="saveTask">Save</button>
            </div>
        </div>
        <div class="list-tasks">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Content</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(task, index) in tasks" :key="'task-' + index">
                        <th scope="row">{{ task.id }}</th>
                        <td>{{ task.content }}</td>
                        <td>
                            <button @click="deleteTask(task, index)" class="btn btn-sm btn-outline-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                tasks: [],
                content: '',
                error: {
                    message: ''
                }
            }
        },
        created () {
            this.getTasks()
        },
        methods: {
            getTasks () {
                axios.get('/tasks')
                .then(response => {
                    this.tasks = response.data
                })
                .catch(error => {
                    console.log(error)
                })
            },
            saveTask () {
                axios.post('/tasks', {content: this.content})
                .then(response => {
                    if (response.data.status === false) {
                        this.error.message = response.data.message
                        setTimeout(() => {
                            this.error.message = ''
                        }, 3000)
                    } else {
                        this.tasks.push(response.data)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            },
            deleteTask(task, index) {
                axios.delete('/tasks/' + task.id)
                .then(response => {
                    if (response.data.status === false) {
                        this.error.message = response.data.message
                        setTimeout(() => {
                            this.error.message = ''
                        }, 3000)
                    } else {
                        this.tasks.splice(index, 1)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .list-tasks {
        margin-top: 50px;
    }
    .error {
        margin-bottom: 15px;
    }
</style>
```
`User.vue`
```html
<template>
    <div>
        <div class="error" v-if="error.message.length">
            <div class="alert alert-danger" role="alert">
                {{ error.message }}
            </div>
        </div>
        <div>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">User name</th>
                    <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in users" :key="'user-' + index">
                        <th scope="row">{{ user.id }}</th>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                users: [],
                error: {
                    message: ''
                }
            }
        },
        created () {
            this.getUsers()
        },
        methods: {
            getUsers () {
                axios.get('/users')
                .then(response => {
                    if (response.data.status === false) {
                        this.error.message = response.data.message
                    } else {
                        this.users = response.data
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style>

</style>
```
Code của 3 file trên khá đơn giản, chủ yếu CRUD, các bạn tự ngâm cứu nếu có gì thắc mắc thì comment bên dưới nhé.

Tiếp theo ở folder `resources/js` (cùng cấp với `app.js`) ta tạo file `routes.js` với nội dung:
```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'task',
            component: require('./components/Task.vue').default,
        },
        {
            path: '/user',
            name: 'user',
            component: require('./components/User.vue').default,
        }
    ]
})
export default router
```
Ở file `app.js` ta thêm vào:
```js
import router from './routes.js'
Vue.use(router)

Vue.component('app', require('./components/App.vue').default);

const app = new Vue({
    el: '#app',
    data: {
        user: window.__user__
    },
    router
});
```
Các bạn chú ý bên trên mình có `user: window.__user__`. Ở đây khi làm dự án thật, ta muốn khởi tạo sẵn 1 số giá trị trước khi Vue được khởi tạo, ví dụ ở đây ta muốn lấy sẵn user login ngay khi Vue được khởi tạo. Và thường các giá trị này được trả về cùng với `view` Laravel. Ta quay trờ lại file `routes/web.php` sửa lại như sau:
```php
Route::get('/', function () {
    $user = request()->user()->roles[0]; //lấy kèm với role của user (dùng cho vue router sau này)
    return view('welcome', ['user' => $user]);
})->middleware('auth');

Route::resource('tasks', 'TaskController');

Route::get('/users', 'UserController@index');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
```
Ở trên các bạn có thể thấy khi trả về view `welcome` ta trả ra luôn cả user vừa login. Ở file `welcome.blade.php` ta có:
```html
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">

        <link rel="stylesheet" href="/css/app.css">
    </head>
    <body>
        <div id="app">
            <app></app>
        </div>
        <script>
            window.__user__ = @json($user)
        </script>
        <script src="/js/app.js"></script>
    </body>
</html>
```
Các bạn chú ý dòng `window.__user__ = @json($user)`, đó chính là dữ liệu ta khởi tạo trước khi Vue được gọi đến, ta phải đặt nó trước `<script src="/js/app.js"></script>` nhé :)
# Testing
Phù...Nói mãi cũng xong. Ta cùng chạy app lên xem có gì nhé. Các bạn chạy:
```php
php artisan serve
npm run watch
```
Đăng nhập với 1 trong các account ta `seed` ở bên trên. Ở đây ta chọn account `dev_create` nhé. Ở đây các bạn để ý ta có thể thêm thoải mái task, nhưng khi thử xoá thì báo lỗi:

![Vue_permission](https://images.viblo.asia/f386d60c-6d19-4504-8ef4-21dbe53cdafe.png)

Tương tự khi chuyển sang tab `Users`ta lại thấy thông báo sau:

![Vue_permission](https://images.viblo.asia/f0ad55e7-d957-4d1b-8e25-0df6c7c3e9a7.png)
Bởi vì account này chỉ có duy nhất quyền `create-tasks` nên ta không đươc làm các thao tác khác

Các bạn có thể test với các account khác để thấy rõ kết quả hơn nhé.

# Scope Vue Router
Tiếp theo ta muốn giới hạn, chỉ có user có `role` nhất định mới được truy cập vào route nhất định. Ví dụ chỉ có `dev` và `manager` truy cập được vào `Tasks` nhưng chỉ có `manager` được truy cập vào `Users`, `dev` truy cập vào sẽ bị điều hướng lại trang ban đầu

Ta sửa lại file `routes.js` một chút nhé:
```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'task',
            component: require('./components/Task.vue').default,
            meta: {
                requiredRoles: ['developer', 'manager']
            }
        },
        {
            path: '/user',
            name: 'user',
            component: require('./components/User.vue').default,
            meta: {
                requiredRoles: ['manager']
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    let user = window.__user__
    if (to.meta.requiredRoles.includes(user.slug)) {
        next()
    } else {
        alert('You don\'t have permission to access this page.')
        next({
            path: '/'
        })
    }
})
export default router
```
Ở trên các bạn thấy mỗi route mình thêm trường `meta` bên trong require user phải có các quyền nhất định mới được truy cập vào.

Bên dưới mình check, trước khi đi vào mỗi route. Nếu như user có quyền phù hợp với route đó thì chạy tiếp, còn không thì chuyển về route `'/'` (thực ra về route này lại bị check tiếp, nhưng với DB hiện tại thì user nào cũng vào đc route này :))

Sau đó, các bạn thử đang nhập với tài khoản `dev` bất kì và thử truy cập vào route danh sách user xem nhé:

![Vue_router](https://images.viblo.asia/ce4b36cf-a590-450b-96b5-8b63f299a7cc.png)

Sau khi click vào alert các bạn sẽ được redirect lại route `'/'` ngay lập tức.

# Kết thúc
Bài của mình đến đây là kết thúc. Hi vọng qua bài này các bạn có thể biét được cách phân quyền theo `role` và `permission` trong Vue và Laravel, để áp dụng vào công việc của mình.

À có bạn có thể thắc mắc. Cần `role` làm gì, hoặc `permission` làm gì, sao không gộp chung làm 1 thôi. Thì các bạn có thể liên hệ thực tế: mục đích của việc này là phân nhóm/phân cấp các vai trò của các cá nhân trong 1 tổ chức, hệ thống, mỗi cá nhân có 1 chức vụ và 1 số quyền hạn nhất định, chứ không đồng nhất chức vụ của tất cả mọi người sau đó mới gán cho mỗi người 1 vài quyền :).

Cám ơn các bạn đã theo dõi, nếu có gì thắc mắc thì comment bên dưới để mình được biết nhé. Hẹn gặp lại các bạn ở các bài sau <3.