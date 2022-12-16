Hãy tưởng tượng một dự án Laravel với hơn 100+ routes, chia ra các phần riêng biệt dành cho khách, người dùng, quản trị viên, .... Bạn có thực sự muốn giữ tất cả trong một file không? Làm thế nào bạn có thể nhóm chúng, thêm tiền tố vào các URL? Hãy cùng xem những cách chúng ta có.

### 1. Separate WEB and API Routes

Việc này là dễ dàng, vì trong default của Laravel chúng ta có 2 files:

* [routes/web.php](https://github.com/laravel/laravel/blob/master/routes/web.php)
* [routes/api.php](https://github.com/laravel/laravel/blob/master/routes/api.php)

<br>

Vì vậy, nếu dự án của bạn có cả trang web-pages và API (ngày càng phổ biến hơn), vui lòng đặt các API routes trong file riêng biệt đó.

Ví dụ: nếu bạn có ```/users``` page và sau đó ```/api/users/``` endpoint, việc tách chúng ra các file riêng giúp chúng ta không bị nhầm lẫn giữa cùng name trong cùng file.

Điều đó có nghĩa rằng, gần đây tôi đã thấy ví dụ phản trực quan từ ```offical``` Laravel project. Với Laravel Horizon, Taylor chỉ có các  API routes và anh ấy đã không sử dụng file riêng biệt, thay vào đó anh ấy đưa nó vào ```routes/web.php```:

![](https://images.viblo.asia/fc65d5b8-003d-45c7-b97c-f69345dd49a8.png)

Một bằng chứng khác cho thấy cấu trúc trong Laravel rất cá nhân và không có tiêu chuẩn nào là 100%, ngay cả từ chính Taylor.

### 2. Structure routes/web.php File into Groups

Điều đó cũng xuất phát từ "basic" Laravel - route. Đây là một ví dụ từ [official Laravel documentation](https://laravel.com/docs/5.8/routing#route-groups):
```
Route::middleware(['first', 'second'])->group(function () {
    Route::get('/', function () {
        // Uses first & second Middleware
    });

    Route::get('user/profile', function () {
        // Uses first & second Middleware
    });
});
```

Cách sử dụng cơ bản nhất là ẩn các groups khác nhau dưới các middleware khác nhau. Ví dụ: bạn muốn một group bị hạn chế bởi middleware ```auth``` mặc định, một group khác bằng custom middlware ```admin```, ...

Cùng với đó, bạn cũng có thể sử dụng Route group ```name``` và ```prefix```. Một vài ví dụ khác từ offical documentation:
```
Route::prefix('admin')->group(function () {
    Route::get('users', function () {
        // Matches The "/admin/users" URL
    });
});

Route::name('admin.')->group(function () {
    Route::get('users', function () {
        // Route assigned name "admin.users"...
    })->name('users');
});
```

Tương tự, nếu bạn muốn thêm tất cả các middleware+name+prefix vào 1 group, nó sẽ dễ đọc hơn nếu bạn nhét chúng vào một array:
```
// Instead of chaining like this: 
Route::name('admin.')->prefix('admin')->middleware('admin')->group(function () {
    // ...
});

// You can use an array
Route::group([
    'name' => 'admin.', 
    'prefix' => 'admin', 
    'middleware' => 'auth'
], function () {
    // ...
});
```

Hãy liên kết tất cả lại với nhau thành một ví dụ thực tế với 3 groups:
* “Guest” group with /front/XXXXX URLs and no middleware;
* “User” group with /user/XXXXX URLs and auth middleware;
* “Admin” group with /admin/XXXXX URLs and custom admin middleware.

Đây là cách để nhóm chúng vào trong ```routes/web.php``` file:
```
Route::group([
    'name' => 'admin.',
    'prefix' => 'admin',
    'middleware' => 'admin'
], function () {

    // URL: /admin/users
    // Route name: admin.users
    Route::get('users', function () {
        return 'Admin: user list';
    })->name('users');

});

Route::group([
    'name' => 'user.',
    'prefix' => 'user',
    'middleware' => 'auth'
], function () {

    // URL: /user/profile
    // Route name: user.profile
    Route::get('profile', function () {
        return 'User profile';
    })->name('profile');

});

Route::group([
    'name' => 'front.',
    'prefix' => 'front'
], function () {

    // No middleware here
    // URL: /front/about-us
    // Route name: front.about
    Route::get('about-us', function () {
        return 'About us page';
    })->name('about');

});
```

### 3. Grouping Controllers with Namespaces

Trong ví dụ trên, chúng ta đã không sử dụng Controllers, chúng ta chỉ trả lại static text như một ví dụ. Hãy thêm Controller, với thêm một "twist" - chúng ta sẽ cấu trúc chúng vào các thư mục với các namespaces khác nhau của chúng, như thế này:
![](https://images.viblo.asia/d78c09aa-1998-4a69-97b2-9bde6937289e.png)

Và sau đó chúng ta có thể sử dụng chúng trong Routes file:
```
Route::group([
    'name' => 'front.',
    'prefix' => 'front'
], function () {
    Route::get('about-us', 'Front\AboutController@index')->name('about');
});
```

Nhưng nếu chúng ta có nhiều Controllers trong group đó thì sao? Chúng ta có nên tiếp tục thêm ```Front\SomeController``` mọi lúc không? Tất nhiên là không. Bạn cũng có thể chỉ định namespace là một trong các tham số.
```
Route::group([
    'name' => 'front.',
    'prefix' => 'front',
    'namespace' => 'Front',
], function () {
    Route::get('about-us', 'AboutController@index')->name('about');
    Route::get('contact', 'ContactController@index')->name('contact');
});
```

### 4. Group within a Group

Tình huống trên, với ba groups, được đơn giản hóa, các dự án thực tế có cấu trúc hơi khác nhau - gồm hai group: ```front``` và ```auth```. Và sau đó bên trong ```auth``` có các sub-group: ```user``` và ```admin```. Vì vậy, chúng ta có thể tạo các sub-group trong ```routes/web.php``` và gán các middleware/prefix khác nhau, ...
```
Route::group([
    'middleware' => 'auth',
], function() {

    Route::group([
        'name' => 'admin.',
        'prefix' => 'admin',
        'middleware' => 'admin'
    ], function () {

        // URL: /admin/users
        // Route name: admin.users
        Route::get('users', 'UserController@index')->name('users');

    });

    Route::group([
        'name' => 'user.',
        'prefix' => 'user',
    ], function () {

        // URL: /user/profile
        // Route name: user.profile
        Route::get('profile', 'ProfileController@index')->name('profile');

    });

});
```
Chúng ta có thể làm điều đó ngay cả với hơn hai cấp độ, đây là một ví dụ từ dự án open source [Akaunting](https://github.com/akaunting/akaunting/blob/master/routes/web.php):
```
Route::group(['middleware' => 'language'], function () {
    Route::group(['middleware' => 'auth'], function () {
        Route::group(['prefix' => 'uploads'], function () {
            Route::get('{id}', 'Common\Uploads@get');
            Route::get('{id}/show', 'Common\Uploads@show');
            Route::get('{id}/download', 'Common\Uploads@download');
        });

        Route::group(['middleware' => 'permission:read-admin-panel'], function () {
            Route::group(['prefix' => 'wizard'], function () {
                Route::get('/', 'Wizard\Companies@edit')->name('wizard.index');
        
        // ...
```

Một ví dụ khác từ Laravel CRM phổ biến khác [Monica](https://github.com/monicahq/monica/blob/master/routes/web.php):

```
Route::middleware(['auth', 'verified', 'mfa'])->group(function () {
    Route::name('dashboard.')->group(function () {
        Route::get('/dashboard', 'DashboardController@index')->name('index');
        Route::get('/dashboard/calls', 'DashboardController@calls');
        Route::get('/dashboard/notes', 'DashboardController@notes');
        Route::get('/dashboard/debts', 'DashboardController@debts');
        Route::get('/dashboard/tasks', 'DashboardController@tasks');
        Route::post('/dashboard/setTab', 'DashboardController@setTab');
    });
```

### 5. Global Settings in RouteServiceProvider


Có 1 file phục vụ cho tất cả các routes setting - ```app/Providers/RouteServiceProvider.php```. Nó có method ```map()``` nơi mà bind cả 2 files routes - ```web``` và ```api```.
```
    public function map()
    {
        $this->mapApiRoutes();
        $this->mapWebRoutes();
    }

    protected function mapWebRoutes()
    {
        Route::middleware('web')
             ->namespace($this->namespace)
             ->group(base_path('routes/web.php'));
    }

    protected function mapApiRoutes()
    {
        Route::prefix('api')
             ->middleware('api')
             ->namespace($this->namespace)
             ->group(base_path('routes/api.php'));
    }
```
    
Bạn có nhận thấy **middleware**, **namespace** và **prefix** được đề cập trong các method không? Đó là nơi bạn có thể thiết lập các setting chung cho toàn bộ file, do đó, bạn sẽ phải lặp lại chúng cho mỗi Route group trong file.

Nó chủ yếu được sử dụng cho các API routes, vì các cài đặt của chúng thường giống nhau, như sau:

```
protected function mapApiRoutes()
{
    Route::group([
        'middleware' => ['api'],
        'namespace' => $this->namespace,
        'prefix' => 'api/v1',
    ], function ($router) {
        require base_path('routes/api.php');
    });
}
```

Method này sẽ prefix tất cả API URLs vơi ```api/v1/``` khi bắt đầu.

### 6. Grouping into More Files – is it worth it?

Nếu bạn có số lượng routes lớn và muốn group chúng nhiều hơn, vào các file riêng biệt, thì bạn có thể sử dụng cùng một file được đề cập trong phần trước - ```app/Providers/RouteServiceProvider.php```. Nếu bạn xem xét kỹ hơn các phương thức ```map()``` của nó, bạn sẽ thấy commented out ở cuối:
```
public function map()
{
    $this->mapApiRoutes();

    $this->mapWebRoutes();

    //
}
```

Bạn có thể diễn giải nó như một "invitation" để thêm nhiều files hơn, nếu bạn muốn. Vì vậy, bạn có thể tạo một phương thức khác như ```mapAdminRoutes()``` bên trong file này, sau đó thêm nó vào phương thức ```map()``` và file riêng biệt của bạn sẽ được đăng ký và load tự động.

Nhưng, cá nhân tôi, tôi không thấy nhiều lợi ích trong cách tiếp cận này và tôi không thấy nó được thực hiện thường xuyên. Nó mang lại một chút riêng biệt trong routes, nhưng đôi khi bạn bị lạc trong các file đó và không chắc chắn nơi để tìm thấy các route cụ thể.

### 7. Find Exact Route with Artisan route:list command

Nói về các routes lớn hơn và bị lạc ở đó, chúng ta có một aritsan command giúp xác định vị trí một route nhất định.

Có lẽ tất cả các bạn đều biết rằng ```php artisan route:list``` sẽ cung cấp cho bạn tất cả các routes trong dự án:
![](https://images.viblo.asia/473b1098-3c58-4d08-93d4-cda6aa82f6fa.png)
Nhưng bạn đã biết cách filter để tìm chính xác điều bạn muốn? Hãy thêm parameters ```-method```, hoặc ```-name``` hoặc ```-path```:

Filter by method - ```GET```, ```POST```:
 ![](https://images.viblo.asia/3d865b25-0f33-4c61-b46b-d3a52ca819e5.png)
 Filter by name hoặc URL part:
 ![](https://images.viblo.asia/f6d46a10-d94b-4946-bc0f-ca401d4115ae.png)
 

**Nguồn:** https://laraveldaily.com/how-to-structure-routes-in-large-laravel-projects/