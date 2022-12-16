## Running Raw SQL Queries
Một khi bạn đã cấu hình và connect database đến cơ sở dữ liệu thành công bạn nên chạy query sử dụng DB facade. DB facade cung cấp sẵn cho bạn những method cho từng loại query như: `select`, `update`, `insert`, `delete`, `statement`
### Running A Select Query
Để chạy một query cơ bản, bạn nên sử dụng `select` method trong DB facade
```
<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Show a list of all of the application's users.
     *
     * @return Response
     */
    public function index()
    {
        $users = DB::select('select * from users where active = ?', [1]);

        return view('user.index', ['users' => $users]);
    }
}
```
Tham số đầu tiên của `select` method là một query raw SQL (một đoạn SQL thuần), tham số thứ hai là một mảng những tham số được binding ràng buộc với query. Thông thường đây là những values được ràng buộc ở điều kiện where. Những dữ liệu binding này sẽ được xử lý để tránh SQL injection.

`select` method sẽ trả về một mảng data. Mỗi kết quả trong mảng sẽ là một PHP stdClass object, cho phép bạn có thể truy cập được values của từng mảng data như sau:
```
foreach ($users as $user) {
echo $user->name;
}
```
### Using Named Bindings
Thay vì sử dụng `?` để thể hiện data binding, bạn có thể thực thi query sử dụng named bindings:
```
$results = DB::select('select * from users where id = :id', ['id' => 1]);
```
### Running An Insert Statement
Để thực thi insert statement, bạn nên sử dụng `insert` method của DB facade. Giống như `select`, method này cũng cần một raw SQL cho tham số đầu tiên, và binding giá trị ràng buộc ở tham số thứ hai:
```
DB::insert('insert into users (id, name) values (?, ?)', [1, 'Dayle']);
```
### Running An Update Statement
`update` method được sử dụng để update một hoặc nhiều record đã tồn tại trong database. Số bản ghi được update sẽ được trả về khi thực thi:
```
$affected = DB::update('update users set votes = 100 where name = ?', ['John']);
```
### Running A Delete Statement
`delete` method được sử dụng để xóa những bản ghi trong database. Giống như `update`, kết quả trả về khi thực thi sẽ là số bản ghi đã được xóa:
```
$deleted = DB::delete('delete from users');
```
### Running A General Statement
Một số database statement không trả về giá trị gì khi thực thi, đối với loại hành động này, bận nên sử dụng `statement` method của DB facade:
```
DB::statement('drop table users');
```
## Listening For Query Events
Nếu bạn muốn nhận được những SQL query được thực thi trong ứng dụng của mình, bạn nên sử dụng `listen` method. Method này được sử dụng để ghi log query hoặc để debug. Bạn nên đăng ký query listenter trong `service provider`:
```
<?php

namespace App\Providers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        DB::listen(function ($query) {
            // $query->sql
            // $query->bindings
            // $query->time
        });
    }
}
```
## Database Transactions
Bạn nên sử dụng `transaction` method trong DB facade để chạy một tập hợp các hành động trong một phiên làm việc (database transaction).  Nếu có lỗi exception được thrown trong transaction `closure`, transaction này sữ tự động rollback tất cả những hoạt động đã thực thị trước đó. Nếu `Closure` thực thi thành công, transaction sẽ được commit tự động kết quả. Bạn nên lo lắng về việc rollback hay commit manually khi sử dụng `transaction` method:
```
DB::transaction(function () {
    DB::table('users')->update(['votes' => 1]);

    DB::table('posts')->delete();
});
```
### Handling Deadlocks
`transaction` method chấp nhận tham số mở rộng thứ hai để định nghĩa số lần thực thi transaction khi xảy ra deadlock. Khi đã vượt quá số lần được cho phép, một exception sẽ được thrown:
```
DB::transaction(function () {
    DB::table('users')->update(['votes' => 1]);

    DB::table('posts')->delete();
}, 5);
```
### Manually Using Transactions
Nếu bạn muốn bắt đầu transaction một các manually và có toàn quyền control tất cả những hoạt động commit cũng như rollback, bạn nên sử dụng `beginTransaction` method của `DB` facade:
```
DB::beginTransaction();
```
Bạn có thể rollback transaction thông qua `rollBack` method:
```
DB::rollBack();
```
Cuối cùng, bạn có thể commit transaction thông qua `commit` method:
```
DB::commit();
```
> `transaction` method của DB facade  có thể control transactions cho cả query builder và Eloquent ORM
## References document
https://laravel.com/docs/5.8/database#running-queries