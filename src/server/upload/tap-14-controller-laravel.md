Xin chào tất cả các bạn, rất vui được gặp lại các bạn trong series "[Hành trình chinh phục Laravel framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" của mình. Chúng ta đã tìm hiểu "View", một thành phần của mô hình MVC. Trong tập này, mình sẽ giúp các bạn tìm hiểu đến một thành phần trong MVC nữa, đó chính là "Controller".

# I. Giới thiệu (Introduction)
Về cơ chế hoạt động thì mình đã nói ở trong các tập trước rồi. Ở phần này mình chỉ nhấn mạnh lợi ích khi dùng controller. Thay vì định nghĩa các xử lý logic trong Closure khi đăng ký route thì ta có thể đưa các xử lý logic đó vào một single class, tại đây ta có thể định nghĩa nhiều method, dễ dàng inject dependency nào cần thiết... đó chính là các controller. Các file controller được lưu trữ tại thư mục `app/Http/Controllers`.

# II. Controller cơ bản (Basic controller)
Trước tiên ta hãy thực hiện các thao tác cơ bản với controller.

## 1. Định nghĩa controller (Defining controller)
Để tạo một controller, ta sử dụng lệnh Artisan sau:

> php artisan make:controller HomeController

Các bạn mở file controller vừa tạo lên và quan sát nội dung của nó. 

```PHP:app/Http/Controllers/HomeController.php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    //
}
```

Mỗi controller có thể `extends` với class `App\Http\Controllers\Controller`. Base controller này cung cấp rất nhiều method thuận tiện, chẳng hạn method `middleware`, cho phép ta đăng ký middleware cho cả controller hoặc từng method.

> **Lưu ý:** Controller không bắt buộc phải `extends` base controller `App\Http\Controllers\Controller`. Tuy nhiên bạn sẽ không thể truy cập các phương thức tiện ích như `middleware`, `validation` và `dispatch` tại controller đó. Trong tập này ta chỉ tìm hiểu về method `middleware`, các method còn lại sẽ được đề cập ở những tập sau.

Chúng ta hãy thử định nghĩa một method trong `HomeController` xem sao:

```PHP:app/Http/Controllers/HomeController.php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function show()
    {
        return 'Home page';
    }
}
```

Sau đó ta chỉ cần đăng ký controller ngay tại route như thế này:

```PHP:routes/web.php
Route::get('/', 'HomeController@show');
```

Ở tham số thứ hai của `Route::get`, thay vì truyền một Closure như trước kia, ta sẽ truyền một chuỗi có cú pháp `Namespace\NameController@method`. Khi request có URI `/` với phương thức `GET` thì method `show` trong `HomeController` class sẽ được thực thi. 

![](https://images.viblo.asia/f62b6f3d-9146-48d6-9545-76e61baf6222.JPG)

Bạn có thể truyền dữ liệu cho method controller thông qua tham số trên URI. Chẳng hạn mình có thêm route:

```PHP:routes/web.php
Route::get('/page/{page?}', 'HomeController@page');
```

Vậy làm thế nào để phương thức `page` trong `HomeController` có thể nhận dữ liệu của tham số `page`trong URI? Các bạn cần đăng ký thêm method `page` tại `HomeController` như sau:

```PHP:app/Http/Controllers/HomeController.php
public function page($page = 1)
{
    return "Page $page";
}
```

Chúng ta cũng sẽ khai báo biến nhận dữ liệu như khi sử dụng Closure object, không khác một chút gì cả, bao gồm các tính chất như thứ tự biến dữ liệu, tham số tùy chọn...

## 2. Controller &  Namespace
Như đã nói ở những tập trước, khi đăng ký một controller trong route thì `RouteServiceProvider` sẽ tự động load base namespace `App\Http\Controllers` cho mỗi controller. Đó là lý do vì sao khi nãy đăng ký `HomeController` trong route, ta không cần phải viết namespace `App\Http\Controllers`.

Trong trường hợp có quá nhiều controller trong một ứng dụng, bạn muốn phân nhóm chúng trong từng thư mục con. Chẳng hạn mình muốn các controller xử lý phía admin-side sẽ nằm trong thư mục `Admin`. Đầu tiên thì trong `app/Http/Controllers` ta chưa có thư mục `Admin` nào cả, nhưng điều này không có nghĩa là bạn phải tạo nó bằng cách thủ công. Thay vào đó bạn sẽ tạo một controller đầu tiên xử lý admin-side với lệnh Artisan như sau:

> php artisan make:controller Admin/SettingController

Rồi, giờ bạn thử kiểm tra xem, thư mục `Admin` đã tự động tạo ra, bên trong có chứa file `SettingController.php` luôn.

![](https://images.viblo.asia/9383df2b-3ea8-4b41-96a0-6ed9d604aa07.JPG)

Các bạn mở `Admin\SettingController` lên và sẽ thấy namespace của file này đã thêm `\Admin` vào sau cùng, có nghĩa là Laravel đã tự động điều chỉnh namespace khi tạo các deep controller (tức là các controller nằm trong sub-directory). Rồi, giờ các bạn đăng ký method sau:

```PHP:app/Http/Controllers/Admin/SettingController.php
namespace App\Http\Controllers\Admin;

public function show()
{
    return 'Setting admin';
}
```

Tiếp theo là phần quan trọng, đó là làm cách nào để đăng ký controller vừa tạo trong route. Các bạn quan sát cách đăng ký route bên dưới:

```PHP:routes/web.php
Route::get('/admin/setting', 'Admin\SettingController@show');
```

Chúng ta chỉ cần thêm namespace `Admin` đằng trước tên class controller thôi. Vì trước đó `RouteServiceProvider` đã load cho chúng ta namespace `App\Http\Controllers` rồi. Rất đơn giản phải không nào.

## 3. Single action controller
Nếu controller của bạn chỉ làm một hành động nhất định, khó đặt tên phương thức để gọi. Laravel cho phép chúng ta tạo một single action controller với lệnh Artisan:

> php artisan make:controller ShowDashboard --invokable

Đây là nội dung của controller `ShowDashboard` mà chúng ta vừa khởi tạo:

```PHP:app/Http/Controllers/ShowDashboard.php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ShowDashboard extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        //
    }
}
```

Chúng ta chỉ cần code xử lý logic trong method `__invoke`, mình sẽ code thêm để test.

```PHP:app/Http/Controllers/ShowDashboard.php
public function __invoke(Request $request)
{
    return 'Dashboard page';
}
```

Để gọi single action controller trong route thì cũng khá đơn giản, bạn có thể làm như sau:

```PHP:routes/web.php
Route::get('/dashboard', 'ShowDashboard');
```

Khác với controller thông thường, single action controller đăng ký với cú pháp `Namespace\NameSingleActionController`, ta không cần phải khai báo method nữa.

# III. Controller middleware
Thông thường khi đăng ký middleware trong file route, ta làm như sau:

```PHP
Route::get('profile', 'UserController@show')->middleware('auth');
```

Tuy nhiên sẽ thuận tiện hơn khi bạn đăng ký middleware trong hàm khởi tạo của controller.  Sử dụng phương thức `middleware` trong `__construct` của class controller để đăng ký.

```PHP
class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
}
```

Laravel cung cấp cho chúng ta hai method `except` và `only` để mở rộng tính linh hoạt cho controller middleware.

Với method `except` thì middleware đã đăng ký ở trước sẽ áp dụng trên tất cả các method có trong controller đó "ngoại trừ" method đã tham chiếu trong `except`.

```PHP
class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except('logout');
    }
}
```

Trong trường này tất cả các method có trong `UserController` đều được đăng ký middleware `auth` ngoại trừ `logout`.

Còn với method `only` thì nó sẽ "chỉ" áp dụng lên method mà ta đã tham chiếu.

```PHP
class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->only('show');
    }
}
```

Trong trường này chỉ có method  `show` trong `UserController` được đăng ký middleware `auth`.

Ngoài ra, bạn có thể tự định nghĩa một middleware trong controller với dạng Closure object.

```PHP
$this->middleware(function ($request, $next) {
    // ...

    return $next($request);
});
```

Với cách này giúp chúng ta code nhanh chóng khi cần xử lý một số logic nhỏ.

> **Lưu ý:** Trong trường hợp có quá nhiều nhóm method được đăng ký các middleware khác nhau trong một controller thì bạn nên nghĩ đến việc phân chia controller đó thành nhiều controller nhỏ để dễ quản lý. Không nên xử lý logic quá nhiều để đăng ký middleware trong hàm khởi tạo của controller class.

# IV. Resource controller
Resource controller được sử dụng khi bạn muốn thực thi CRUD với một tài nguyên nào đó, chẳng hạn như bài viết, chuyên mục, thư viện ảnh... Bạn không cần phải cất công khai báo từng route thêm, sửa, xóa... Hay là tạo controller xử lý, định nghĩa khung cho các method. Bởi các điều đó đã được resource controller lo hết. 

Chẳng hạn giờ mình muốn tạo một resource controller để thao tác với tài nguyên bài viết của ứng dụng. Đầu tiên, ta sẽ chạy lệnh Artisan sau để khởi tạo một resource controller:

> php artisan make:controller PostController --resource

Với lệnh này, framework sẽ khởi tạo controller `App\Http\Controllers\PostController` cho chúng ta, nhưng điều đặc biệt là đã được viết sẵn khung các method cần thiết để thực thi CRUD. Các bạn có thể mở controller `PostController` lên để kiểm chứng, chẳng hạn ta có method `show`:

```PHP:app/Http/Controllers/PostController.php
/**
 * Display the specified resource.
 *
 * @param  int  $id
 * @return \Illuminate\Http\Response
 */
public function show($id)
{
    //
}
```

Việc tiếp theo ta chỉ cần khai báo route cho resource controller vừa tạo. Bạn gõ cú pháp sau:

```PHP:routes/web.php
Route::resource('posts', 'PostController');
```

Ta sử dụng method `Route::resource` để đăng ký resource controller. Trong đó:
* Tham số thứ nhất sẽ là tên tài nguyên, đồng thời cũng là prefix của các resource route. Ta sẽ có các resource route mặc định sau:
    ![](https://images.viblo.asia/f46b9c8a-0187-4696-b1b2-83a19e27a771.JPG)
* Tham số thứ hai sẽ là tên resource controller dưới dạng `Namespace/NameResourceController`.

> **Lưu ý**: Tên tài nguyên nên đặt ở dạng số nhiều, chẳng hạn như `posts`, `photos`...

Hiện tại ta chưa học về các bài liên quan đến database nên ở tập này ta chỉ nói khái quát về các method trong resource controller thôi, chưa thể test chi tiết được.

Nếu trong ứng dụng bạn có nhiều resource controller, bạn có thể đăng ký route với dạng mảng.

```PHP
Route::resources([
    'photos' => 'PhotoController',
    'posts' => 'PostController'
]);
```

Khi làm việc với resource controller, có thể ta sẽ cần đến model để tương tác với database. Chính vì vậy, Laravel cung cấp một lệnh Artisan giúp ta vừa tạo resource controller, vừa tạo luôn model cho nó.

> php artisan make:controller PhotoController --resource --model=Photo

Nếu tạo resource controller có kèm model thế này thì trong các method có chứa `$id` của `PhotoController` sẽ được inject dependency model `Photo`. Chẳng hạn method `show`:

```PHP:app/Http/Controllers/PhotoController
/**
 * Display the specified resource.
 *
 * @param  \App\Photo  $photo
 * @return \Illuminate\Http\Response
 */
public function show(Photo $photo)
{
    //
}
```

## 1. Các tuyến tài nguyên một phần (Partial resource routes)
Đôi khi có một số trường hợp ta không cần đăng ký đầy đủ các resource route mặc định. Ta có thể bỏ bớt các resource route không cần đến với `except`, hoặc chỉ lấy những resource route cần thiết với `only`.

```PHP
// Chỉ đăng ký resource route index, show trong PostController
Route::resource('posts', 'PostController')->only([
    'index', 'show'
]);

// Đăng ký tất cả các resource route trong PhotoController ngoại trừ destroy
Route::resource('photos', 'PhotoController')->except([
    'destroy'
]);
```

## 2. API resouce route
Khi khai báo các API route cho resource controller, bạn thường muốn bỏ các route có method `create` và `edit`. Laravel cung cấp cho chúng ta method `Route::apiResource` để tự động loại bỏ hai route chứa method `create` và `edit`.

```PHP
Route::apiResource('posts', 'PostController');
```

Các bạn có thể chạy lệnh Artisan `route:list` để kiểm chứng.

![](https://images.viblo.asia/6f9f2e2b-28e6-4a92-a6a5-4985e6322e29.png)

Như các bạn thấy, chẳng có route nào có name là `posts.create` và `posts.edit` cả.

Bạn cũng có thể đăng ký nhiều API resource route cùng lúc với cú pháp:

```PHP
Route::apiResources([
    'photos' => 'PhotoController',
    'posts' => 'PostController'
]);
```

Để tạo nhanh chóng API resource controller không bao gồm hai phương thức `create` và `edit`, bạn có thể chạy lệnh Artisan sau:

> php artisan make:controller API/PhotoController --api

Mình tạo sub-directory `API` không phải vì bắt buộc mà chỉ là phân chia cho dễ quản lý thôi, bạn có thể tự tổ chức theo ý của mình.

## 3. Đặt tên các tuyến tài nguyên (Naming resource routes)
Theo như bảng mà mình cung cấp ở trên thì mặc định các resource route đều được đặt tên theo cú pháp `name_resource.name_method`. Tuy nhiên, bạn có thể thay đổi bằng method `names` với tham số là mảng chứa các dữ liệu thay đổi.

```PHP
Route::resource('photos', 'PhotoController')->names([
    'create' => 'photos.build' // 'name_method' => 'new_name_resource_route'
]);
```

## 4. Đặt tên tham số tuyến tài nguyên (Naming resource route parameters)
Mặc định, `Route:resource` sẽ tạo tham số dựa trên tên của resource ở dạng số ít trong tiếng Anh, tức là bỏ đi ký tự "s" cuối cùng. Nhưng đôi khi có một số từ khi viết ở dạng số nhiều sẽ thay đổi từ đó. Chẳng hạn như `category` khi viết số nhiều sẽ là `categories`, chính vì thế tham số resource route sẽ thành `categorie`, điều này không hợp lý cho lắm. Laravel cho phép ta có thể đổi tên tham số resource route thông qua method `parameters`.

```PHP
Route::resource('categories', 'CategoryController')->parameters([
    'categories' => 'category' //'name_resource' => 'new_name_parameter'
]);
```

Lúc này URI của route có method `show` sẽ có dạng `/categories/{category}` và một số route khác nữa.

## 5. Localizing Resource URIs
`Route::resource` mặc định sẽ tạo URI resource bằng các động từ trong tiếng Anh như `create`, `edit`. Nếu bạn cần thay đổi thiết lập đó, bạn có thể sử dụng method `Resource::resourceVerbs`. Việc này nên được thiết lập tại method `boot` của `AppServiceProvider`.

```PHP:app/Providers/AppServiceProvider.php
use Illuminate\Support\Facades\Route;

public function boot() 
{
    Route::resourceVerbs([
        'create' => 'tao',
        'edit' => 'sua',
    ]);
}
```

Ta sẽ `use` facade `Route` để có thể sử dụng phương thức `resourceVerbs`. Lúc này, tất cả các URI resource có chứa `create`sẽ đổi thành `tao` và `edit` sẽ đổi thành `sua`.

## 6.Bổ sung cho bộ điều khiển tài nguyên (Supplementing resource controller)
Nếu bạn cần bổ sung thêm route cho resource ngoài các route mặc định, bạn cần định nghĩa các route đó trước khi gọi `Route::resource`

```PHP
Route::get('posts/popular', 'PostController@popular');

Route::apiResource('posts', 'PostController');
```

# V. Dependency injection & Controller
Lấy lại ví dụ tại phần single action controller, các bạn có để ý một sự khác biệt là hàm `__invoke` được inject dependency `Illuminate\Http\Request` class. `$request` này sẽ nhận tất cả các giá trị dữ liệu từ tham số trên URI mà không cần phải khai báo tại method `__invoke`. Để hiểu hơn thì chúng ta sẽ tùy chỉnh đoạn code trên một chút. Tại route, chúng ta truyền thêm tham số `page` vào trên URI như thế này:

```PHP:routes/web.php
Route::get('/dashboard/{page}', 'ShowDashboard');
```

Phương thức `__invoke` trong `ShowDashboard` controller ta sẽ lấy tham số `page` như sau:

```PHP:app/Http/Controllers/ShowDashboard.php
public function __invoke(Request $request)
{
    return 'Dashboard page ' . $request->page;
}
```

Cách lấy tham số URI thông qua `$request` này hoàn toàn giống với tập [Middleware](https://viblo.asia/p/tap-11-middleware-laravel-maGK74e9Zj2). Không chỉ hạn chế ở method `__invoke`, ta có thể sử dụng cách này cho toàn bộ method trong controller class nếu có quá nhiều tham số được truyền đến.

Ngoài ra bạn vẫn có thể vừa inject dependency class, vừa có thể khai báo biến nhận dữ liệu của tham số như sau:

```PHP:app/Http/Controllers/ShowDashboard.php
public function __invoke(Request $request, $page = 1)
{
    return 'Dashboard page ' . $page;
}
```

```PHP:routes/web.php
Route::get('/dashboard/{page?}', 'ShowDashboard');
```

Cách này thông thường sử dụng khi bạn cần sử dụng tham số tùy chọn, chứ không ai rảnh mà đi khai báo lại biến nhận dữ liệu khi `$request` đã có mọi thứ phải không nào.


> **Lưu ý:** Bạn có thể inject bất kỳ dependency class nào bạn cần cho controller class.

# VI. Route Caching

> **Lưu ý:** Bạn không thể nào sử dụng route caching nếu có một route trong ứng dụng của bạn sử dụng Closure object thay vì controller.

Chính vì vậy nếu ứng dụng của các bạn có tất cả các route đều đăng ký controller method thì bạn nên tận dụng route caching của Laravel. Sử dụng route caching sẽ giảm thiểu thời gian để đăng ký các route, để thực hiện routing cache, bạn gõ lệnh sau:

> php artisan route:cache

Sau khi chạy lệnh này, các đăng ký route sẽ dựa vào cache lưu trữ. Vì vậy nếu bạn có thay đổi gì trong các thiết lập đăng ký route, bạn nên tạo mới lại cache với lệnh:

> php artisan route:clear

Bạn chỉ chạy lệnh `route:cache` khi nào chuẩn bị deloy ứng dụng.

---- 

Cảm ơn các bạn đã quan tâm theo dõi. Cùng đồng hành với mình qua những tập tiếp theo tại series "[Hành trình chinh phục Laravel Framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" nhé! Chúc may mắn và hẹn gặp lại.

> Mình đang xây dựng blog riêng là [lechihuy.dev ](https://lechihuy.dev), mong các bạn ghé sang ủng hộ, mình cảm ơn rất nhiều ạ