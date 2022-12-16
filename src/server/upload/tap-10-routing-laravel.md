Chào mừng các bạn đã quay trở lại với series "[Hành trình chinh phục Laravel framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)". Cuối cùng sau những tập căng não thì chúng ta đã hoàn thành xong các khái niệm kiến trúc của Laravel. Bắt đầu từ tập này, chúng ta sẽ đi tìm hiểu lần lượt các component từ cơ bản đến nâng cao. Trong tập mở màn này, chúng ta sẽ tìm hiểu về "Routing". 

# I. Giới thiệu (Introduction)
Mình đã có đề cập về routing rồi, chính vì vậy ở phần này mình sẽ tóm gọn lại nội dung chính về nó thôi. Routing hiểu đơn giản là nơi nhận request gửi từ client và tìm route nào có cơ sở đặc trưng giống với request để xử lý.

Ví dụ client gửi một request với phương thức `GET` và url là `/home`. Trong routing của chúng ta đã khai báo sẵn các route như sau:

```PHP
Route GET /home

Route POST /update

Route GET /login

...
```

Nhiệm vụ của routing là sẽ tìm các route đã khai báo ở trên và so sánh với request hiện tại các yếu tố như url, method... để tìm ra route cùng bản chất với request, sau đó tiến hành thực hiện controller/action được khai báo trong route đó. Như ví dụ trên, `Route GET /home` là thỏa mãn cho request.

Để hiểu rõ hơn, ta hãy bắt đầu tìm hiểu cách sử dụng routing ở bên dưới.

# II. Routing cơ bản (Basic routing)
Chắc hẳn các bạn đã biết, để làm việc với routing ta sẽ tương tác các file trong thư mục `routes`, đặc biệt là `web.php`. Các file route này sẽ tự động load bởi framework.

## 1. Simple route

Một cú pháp routing cơ bản Laravel chấp nhận một URI và Closure object:

```PHP:routes/web.php
Route::get('/foo', function() {
    return 'Hello world';
});
```

Để có thể truy cập route trên, từ trình duyệt ta gõ đường dẫn http://locahost:8000/foo. Ta sẽ nhận được kết quả như bên dưới:

![](https://images.viblo.asia/f46fad0a-204d-4c91-b8f9-52f8faf35737.JPG)

Nếu request mà không thỏa mãn route nào thì Laravel sẽ trả về trang lỗi 404.

## 2. Một số phương thức route (Some route methods)

Router cho phép bạn đăng ký một route với bất kì phương thức HTTP nào.

|  HTTP |  Mục đích | Method | Mức độ an toàn
| -------- | -------- | -------- | -------------------- |
| GET           | Lấy tài nguyên   | `get`     | Có
| POST         | Tạo tài nguyên   | `post`     | Không
| PUT           | Cập nhật tài nguyên     | `put`     | Không
| PATCH      | Cập nhật một phần tài nguyên     | `patch`     | Không
| DELETE     | Xóa tài nguyên    | `delete`     | không
| OPTIONS  | *(Hiện tại mình chưa rõ về vấn đề này...)*  | `options`     | Có

Về mức độ an toàn, nói một các dễ nhớ là các phương thức HTTP nào không làm thay đổi bất kì điều gì liên quan tới server thì được coi là an toàn và ngược lại.

> Chính vì có một số phương thức HTTP không an toàn, để tăng tính bảo mật, Laravel yêu cầu mỗi request được gửi với những phương thức `POST`, `PUT`, `PATCH` hoặc `DELETE`  trong các route `web` phải có CSRF token. Nếu không có token này, các request sẽ bị từ chối. 

Trong trường hợp hợp một request có thể truy cập theo nhiều phương thức HTTP khác nhau thì Laravel cung cấp cho chúng ta method `match` có thể đáp ứng yêu cầu trên.

```PHP
Route::match(['get', 'post'], $uri, $callable);
```

Hoặc nếu request có thể thực thi thông qua bất kì phương thức HTTP nào, ta có thể sử dụng method `any` để khai báo route.

```PHP
Route::any($uri, $callable);
```

Chẳng hạn mình có một route `POST` như sau:
```PHP:routes/web.php
Route::post('create', function() {
    return 'Created';
});
```

Mình dùng Postman để gửi request đến route này, và đây là kết quả nhận được:

![](https://images.viblo.asia/63bcecac-c08d-40fe-852a-08e6cb04c40f.JPG)

Chắc chắn rồi, vì đây là một phương thức HTTP không an toàn nên Laravel trả về lỗi 419 với trang có title là "Page Expired". Vậy cách làm thế nào để gửi request với các phương thức HTTP được bảo mật bởi CSRF token thì chúng ta sẽ tìm hiểu ở những tập sau, mình chỉ tản mạn tới đây thôi. Các bạn có thể tự kiếm chứng các method trên vào những tập sau nhé!

## 3. Route chuyển hướng (Redirect route)
Nếu bạn muốn định nghĩa một route chuyển hướng đến URI khác, bạn có thể sử dụng phương thức `Route::redirect`. Phương pháp này cung cấp một cú pháp đơn giản thay vì khai báo một route đầy đủ hay một controller để thực hiện việc chuyển hướng.

```PHP:routes/web.php
Route::redirect('/here', '/there');
```

Bạn có thể nạp server và kiểm chứng kết quả.

Mặc định, `Route::redirect` trả về mã 302 nhưng Laravel cho phép bạn có thể thay đổi mã này bằng cách thêm tham số thứ ba.

```PHP:routes/web.php
Route::redirect('/here', '/there', 301);
```

Nếu bạn không thích thêm quá nhiều tham số như cách trên, bạn có thể sử dụng `Route::permanentRedirect` để trả về mã 301.

```PHP:routes/web.php
Route::permanentRedirect('/here', '/there');
```

Nói tới mã chuyển hướng 301 và 302 mình xin tản mạn một chút về vấn đề này. Khi nào chúng ta redirect với 301, khi nào redirect với 302?

* Redirect với 301 thông báo rằng trang web này đã chuyển hướng vĩnh viễn, thường là thay đổi domain mới.

* Redirect với 302 thông báo rằng trang web này chỉ chuyển hướng tạm thời, thường là do bảo trì.

> Việc lựa chọn mã redirect phù hợp sẽ giúp cho việc SEO tốt hơn.

## 4. View route
Nếu route bạn khai báo chỉ nhằm mục đích trả về `View` thì bạn có thể sử dụng method `Route::view` thay vì phải định nghĩa một route đầy đủ hoặc controller. `Route::view` sẽ nhận tối đa 3 tham số:
* Tham số thứ nhất: URI
* Tham số thứ hai: tên file view (không chứa đuôi `.php` hoặc `.blade.php`)
* Tham số thứ ba (nếu có): truyền một mảng các giá trị cho view.

```PHP:routes/web.php
Route::view('/welcome', 'welcome');
```

Ở đây mình đã sử dụng một file view có sẵn trong source, đó là `resources/views/welcome.blade.php`. Các bạn có thể truy cập đường dẫn http://localhost:8000/welcome để test.

Để ví dụ cho tham số thứ ba trong method `Route::view`, mình sẽ thêm mảng dữ liệu sau:

```PHP:routes/web.php
Route::view('/welcome', 'welcome', ['name' => 'Lê Chí Huy']);
```

Mình đã truyền một mảng dữ liệu vào file view `resources/views/welcome.blade.php`. Các bạn mở file đó lên, tìm đến dòng code có chứa từ "Laravel" và code thêm để có thể nhận dữ liệu và in ra màn hình.

Mặc định:
```PHP:resources/views/welcome.blade.php
<div class="title m-b-md">
    Laravel
</div>
```

Sửa lại:
```PHP:resources/views/welcome.blade.php
<div class="title m-b-md">
    Hello 
    <?php
        if (isset($name)) {
            echo $name;
        } else {
            echo 'Laravel';
        }
    ?>
</div>
```

Lúc này, key `name` trong mảng dữ liệu đã được Laravel đổi thành tên biến `$name` chứa giá trị tương ứng.

Và đây là kết quả:

![](https://images.viblo.asia/86e1c133-f689-45ed-be0e-9f8bdca295fc.JPG)

# III. Tham số route (Route parameter)
URI thì có thể chứa cả tham số, nhưng chẳng lẽ ta phải khai báo từng giá trị mặc định trong routing? Không, Laravel cung cấp cú pháp giúp ta có thể định nghĩa một route chứa tham số.

## 1. Required parameters
Chẳng hạn bạn có một URI `/user` sẽ nhận tham số `id` để show profile của user. Bạn có thể định nghĩa route như sau:

```PHP:routes/web.php
Route::get('user/{id}', function($id) {
    return 'User ' . $id;
});
```
> Từ đó ta có thể rút ra được cú pháp chung cho route parameter:
> * Để khai báo tham số trong URI, ta đặt nó nằm trong cặp `{}`
> * Tên tham số chỉ chứa ký tự chữ cái và không chứa `-`, bạn có thể thay thế `-` bằng `_`
> * Để nhận giá trị từ tham số, ta khai báo trong Closure object/Controller method

Bạn có thể thêm nhiều tham số trong cùng một URI.

```PHP:routes/web.php
Route::get('/user/{id}/post/{post}', function($id, $idPost) {
    return "This is post $idPost of user $id'; 
});
```

Quan sát đoạn code trên ta có thể thấy `$id` sẽ nhận giá trị từ `{id}`, cũng như `$idPost` nhận giá trị từ `{post}`. Ngoài ra, ta có thể đặt tên biến nhận giá trị khác với tên tham số khai báo trong URI. 

Từ đó ra rút ra thê một số đặc điểm:
> * Thứ tứ các biến nhận giá trị tham số phải tuân theo thứ tự khái báo tham số trong URI.
> * Tên tham số và tên biến nhận giá trị tham số có thể khác nhau.

## 2. Optional paramters
Giả sử khách hàng yêu cầu bạn thiết lập tùy chọn cho đường dẫn `/user`, tức là khi có thêm tham số `id` thì sẽ show thông tin của user theo `id` đó, còn nếu không có thì sẽ show danh sách user. Bạn có thể làm như sau:

```PHP:routes/web.php
Route::get('user/{id?}', function($id = null) {
    if ($id == null) {
        return 'List users';
    }
    
    return "User $id";
});
```

Bạn có nhận thấy có dấu `?` bên phải tham số `id` không? Vâng, cú pháp đó sẽ giúp ta định nghĩa rằng tham số đó có thể tồn tại hoặc không. Và một điều đặc biệt nữa là biến nhận giá trị tham số được gán giá trị `null` trước. 

> Để khai báo một tham số tùy chọn (có thể có hoặc không)
> * Thêm dấu `?` sau tên tham số
> * Gán giá trị mặc định cho biến chứa giá trị tham số (có thể `null`)

Lấy một ví dụ nữa, chẳng hạn mình có đường dẫn `/post` có chức năng show nội dung post theo tham số `id`, nếu không có thì mình sẽ show nội dung post với id bằng 1.

```PHP:routes/web.php
Route::get('post/{id?}', function($id = 1) {
    return "Post $id";
});
```

Bây giờ chúng ta thử đi kiểm chứng đoạn code sau:

```PHP:routes/web.php
Route::get('post/{id?}/comment/{comment}', function($id = 1, $idComment) {
    return "Post $id with comment $idComment";
});
```

Các bạn nạp server và chạy thử đường dẫn http://localhost:8000/post/comment/1 thử xem, chắc chắn sẽ báo lỗi 404. Tại sao vậy? Nếu không truyền id cho post thì nó sẽ tự nhận là 1 mà, vậy sao lại lỗi? Vâng, Laravel không thần thánh tới mức ấy, chính vì vậy khi khai báo một optional parameter nào đó thì phải thuân theo 2 điều liện:

> * Phải đặt nó ở cuối URI
> * Trong một URI chỉ chứa duy nhất một optional parameter.

## 3. Regular expression constraint
Chắc hẳn khi học PHP các bạn đã quá quen thuộc với thuật ngữ này rồi. Khi áp dụng với route thì Laravel sẽ ràng buộc các tham số theo những pattern mà chúng ta khai báo với cú pháp rất ngắn gọn, dễ hiểu bằng method `where`.

Chẳng hạn đối với tham số `name`, chúng ta quy định nó chỉ được chứa các ký tự alphabet. Để khai báo route có thể làm việc đó, bạn tham khảo đoạn code sau:

```PHP:routes/web.php
Route::get('user/{name}', function($name) {
    //
})->where('name', '[A-Za-z]+');
```

Ta có thể thấy tham số thứ nhất mà `where` sẽ nhận là tên tham số cần ràng buộc, tham số thứ hai sẽ là chuỗi pattern do ta định nghĩa. Nếu tham số không phù hợp với ràng buộc sẽ trả về lỗi 404.

Bạn cũng có thể ràng buộc nhiều tham số khác nhau trong cùng một route, chẳng hạn:

```PHP:routes/web.php
Route::get('user/{name}/post/{id}', function($name, $id) {
    //
})->where(['name' => '[A-Za-z]+', 'id' => '[0-9]+']);
```

Lúc này `where` sẽ nhận một mảng chứa các ràng buộc cho từng tham số.

Thử nghĩ trong một ứng dụng có rất nhiều tham số `id`, chẳng lẽ phải ràng buộc ở từng route sao, rồi sau này có thay đổi gì cũng phải chỉnh từng route một chăng? Chính vì vấn đề đó, Laravel cung cấp cho chúng ta một giải pháp để có thể giải quyết nó, gọi là "Global constraints".

Việc global constraint này sẽ được thực hiện tại file `app/Providers/RouteServiceProvider.php`, cụ thể là method `boot`.

```PHP:app/Providers/RouteServiceProvider.php
public function boot()
{
    Route::pattern('id', '[0-9]+');
    // Route::pattern('name', '[A-Za-z]+');
    //
    
    parent::boot();
}
```
Lúc này, mọi tham số `id` trong routing chỉ nhận được là số.

## 4. Mã hóa '/' (Encoded forward Slashes)
Giả sử mình khai báo một route để tìm kiếm như sau:

```PHP:routes/web.php
Route::get('search/{search}', function ($search) {
    return $search;
});
```

Một bài viết có tiêu đề là "About controller/closure object", giờ mình muốn tìm kiếm bài viết này thông qua route trên thì phải vào đường dẫn http://localhost:8000/search/About%20controller/closure%20object nhưng lại báo lỗi 404, một kết quả mình không mong muốn chút nào. 

Lý do xảy ra lỗi trên chính là vì giá trị tham số `search` có chứa ký tự `/`, làm cho framework hiểu là ta đang truy cập và một cấp con trong URI, chứ không là là giá trị bình thường của tham số `search`. Laravel đã khắc phục lỗi này bằng cách ràng buộc tham số chứa `/` với pattern là `.*`. Bây giờ bạn chỉ cần sửa đoạn code trên như sau:

```PHP:routes/web.php
Route::get('search/{search}', function ($search) {
    return $search;
})->where('search', '.*');
```

Đây chính là kết quả mà mình mong muốn: 

![](https://images.viblo.asia/d8e9e2df-243b-4bc8-8696-eb338d113a37.JPG)

> **Chú ý:** Thông thường trường hợp này dùng để làm chức năng tìm kiếm, khuyến cáo nên để route này cuối cùng để tránh trường hợp trùng URI với các route khác.

# IV. Đặt tên route (Set name for route)
Thay vì nhớ các URI của từng route thì bạn có thể đặt tên cho nó để dễ dàng tương tác bằng phương thức `name`.

```PHP:
Route::get('home', function () {
    //
})->name('home');
```

Với việc đặt tên sẽ dễ dàng lấy url từ route:
```PHP
$url = route('home');
```

hay cũng như chuyển hướng đến route đó:

```PHP
return redirect()->route('home');
```

Nếu route được đặt tên có chứa tham số, ta có thể dễ dàng truyền giá trị cho tham số bằng cách:

```PHP
Route::get('profile/{id}', function ($id) {
    //
})->name('profile');

$url = route('profile', ['id' => 1]); // /profile/1
```

# V. Nhóm route (Route group)
Các route nằm trong cùng một nhóm sẽ được chia sẻ các thuộc tính route như namespace, middleware, tiền tố tên, tiền tố URI,...

## 1. Middleware route
Để gán middleware cho các route chung một nhóm, bạn có thể sử dụng phương thức `middleware` để lồng các route con.

```PHP:
Route::middleware(['first', 'second'])->group(function () {
    Route::get('/', function () {
        // Uses first & second Middleware
    });

    Route::get('user/profile', function () {
        // Uses first & second Middleware
    });
});
```

## 2. Namespace route
Với method `namespace` bạn sẽ khai báo namespace cho tất cả các route con nằm trong nó, chẳng hạn:

```PHP
Route::namespace('Admin')->group(function () {
    // Controllers Within The "App\Http\Controllers\Admin" Namespace
});
```
(Mọi controller được gọi trong nhóm này sẽ được thêm namespace `App\Http\Controllers\Admin`)

> Mặc định `RouteServiceProvider` đã kết nối các file route trong một group, cho phép bạn đăng ký các controller mà không cần đến đầy đủ namespace `App\Http\Controllers`. Vì vậy để khai báo một controller, bạn chỉ cần khai báo namespace do bạn phân cấp cùng với tên của controller.

## 3. Sub-domain route
Laravel còn cung cấp cho chúng ta nhóm sub-domain. Nhóm này có thể chỉ định tham số như một URI, cho phép ta có thể giữ một phần sub-domain để sử dụng trong các route con. 

Để khai báo nhóm sub-domain, bạn sử dụng method `domain` như sau:

```PHP
Route::domain('{account}.myapp.com')->group(function () {
    Route::get('user/{id}', function ($account, $id) {
        //
    });
});
```

Tham số `{account}` đóng vai trò như một thành phần của từng URI route con, nên thứ tự phải được đứng trước vì toàn bộ URI sẽ là `{account}.myapp.com/user/{id}`.

> **Lưu ý:** Để đảm bảo các route sub-domain có thể hoạt động, bạn nên khai báo các route này trước các route domain gốc, điều này sẽ ngăn không cho domain gốc ghi đè lên các sub-domain có cùng URI.

## 4. Tiền tố URI route (Route prefix)
Giả sử ứng dụng của bạn có admin cpanel để quản lý nội dung, nhưng có rất nhiều route có URI chứa `admin`. Để gom chúng lại thành một nhóm, ta sử dụng method `prefix` do Laravel cung cấp.

```PHP
Route::prefix('admin')->group(function () {
    Route::get('users', function () {
        // Matches The "/admin/users" URL
    });
});
```
Dấu `/` sẽ tự động thêm nên bạn không cần phải lo lắng vì điều đó.

## 5. Tiền tố tên route (Route named prefix)
Cũng như route prefix, route named prefix sẽ thêm tiền tố tên chung cho mỗi route con nằm trong nhóm.

```PHP
Route::name('admin.')->group(function () {
    Route::get('users', function () {
        // Route assigned name "admin.users"...
    })->name('users');
});
```

Bạn có thể thay thế ký tự ngăn cách `.` bằng ký tự khác, miễn sao phù hợp cú pháp code PHP.

Nếu như có một nhóm route có cùng chung namespace, prefix, name chẳng hạn thì ta có thể gom các thuộc tính này vào `Route::group`.

```PHP
Route::group([
    'namespace' => 'Admin', 
    'prefix' => 'admin', 
    'name' => 'admin.'
], function() {
    //
});
```

> **Chú ý:** Khi bạn build app với `routes/api.php` thì các route được khai báo sẽ tự động đưa vào trong một route group có prefix là `/api`.
# VI. Route model binding
Khi bạn inject một model instance theo ID nào đó vào route hoặc controller action, thông thường ta sẽ phải truy vấn đến model theo ID đã cho. Nhưng Laravel route model binding cung cấp cho chúng ta một cú pháp thoải mái để có thể tự động inject các model object trong route. Tức là thay vì chỉ inject ID của `User` rồi mới khởi tạo model thì ta sẽ inject luôn cả model object thông qua ID nhận từ tham số URI.

## 1. Binding ngầm (Implicit binding)
Laravel sẽ tự động resolve model được định nghĩa trong route hoặc controller action bằng cách type-hint và khai báo biến có tên trùng với tên tham số.

```PHP
Route::get('api/users/{user}', function (App\User $user) {
    return $user->email;
});
```

Đoạn code trên có nghĩa là khi chúng ta truy cập đường dẫn http://localhost:8000/api/user/1 chẳng hạn thì một model object sẽ được khởi tạo với ID bằng 1 từ database, sau đó inject vào route và trả về `$user->email`. Nếu không tồn tại user với ID bằng 1, thì ta sẽ nhận kết quả là lỗi 404. 

Vì chúng ta chưa tìm hiểu đến "Model Laravel" nên không thể test cho các bạn xem được. Các bạn có thể tự kiểm chứng sau khi tới tập đó nhé!

Mặc định thì route model binding sẽ dùng ID để truy vấn vào database. Bạn có thể thay đổi thiết lập này bằng cách khai báo method `getRouteKeyName` trong model mà bạn muốn thay đổi.

```PHP
/**
 * Get the route key for the model.
 *
 * @return string
 */
public function getRouteKeyName()
{
    return 'username';
}
```

## 2. Binding rõ ràng (Explitcit binding)
Nếu bạn muốn code trở nên rõ ràng, có thể sử dụng explitcit binding trong `RouteServiceProvider` tại `boot` bằng cách sử dụng method `Route::model`.

```PHP:app/Provider/RouteServiceProvider.php
public function boot()
{
    parent::boot();

    Route::model('user', App\User::class);
}
```

**Trong đó:**
* Tham số thứ nhất sẽ là tên tham số URI
*  Tham số thứ hai là class model.

Sau đó inject bình thương như implitcit binding:

```PHP
Route::get('profile/{user}', function (App\User $user) {
    // 
});
```

Nếu bạn muốn sử dụng cách xử lý logic riêng, bạn có thể sử dụng phương thức `Route::bind`. Closure object được truyền vào sẽ nhận giá trị của tham số trên URI và sẽ trả về model object cần để inject nếu thỏa mãn điều kiện mà bạn đưa ra.

```PHP:app/Provider/RouteServiceProvider.php
public function boot()
{
    parent::boot();

    Route::bind('user', function ($value) {
        return App\User::where('name', $value)->first() ?? abort(404);
    });
}
```

Ở dòng ```return App\User::where('name', $value)->first() ?? abort(404);``` bạn không cần phải hiểu quá sâu sắc, chỉ là xử lý logic kiểm tra xem có tồn tại user có trường `name` bằng giá trị `$value` không, nếu có thì return model object của user đó, còn không thì trả về lỗi 404.

Hình thức này áp dụng khi bạn muốn thay vì báo lỗi 404 thì thay thế/thêm một hành động nào đó thông qua sử dụng tùy chỉnh logic riêng này.

Ngoài ra nếu bạn không muốn code quá nhiều trong `RouteServiceProvider`, bạn có thể định nghĩa xử lý logic riêng này vào model class mà bạn muốn thông qua method `resolveRouteBinding`.

```PHP
/**
 * Retrieve the model for a bound value.
 *
 * @param  mixed  $value
 * @return \Illuminate\Database\Eloquent\Model|null
 */
public function resolveRouteBinding($value)
{
    return $this->where('name', $value)->first() ?? abort(404);
}
```

# VII. Route dự phòng (Fallback route)
Với fallback route này, bạn có thể thực hiện một xử lý nào đó khi không có bất kì route nào thỏa mãn với request, thường thì sử dụng để báo lỗi 404 và xử lý thêm vài công việc nào đó.

```PHP
Route::fallback(function () {
    //
});
```

> **Lưu ý:** Fallback route phải được định nghĩa cuối cùng, sau cả các route mã hóa `/`.

# VIII. Giới hạn truy cập (Rate limit)
Thông thường ta hay ứng dụng giới hạn truy cập cho REST API, hoặc ngăn chặn tấn công DDoS. Laravel cung cấp cho chúng ta một middleware có thể làm được việc này, đó là `throttle`. Bạn có thể tìm thấy nó được khai báo ở `app/Http/Kernel.php`.

```PHP:app/Http/Kernel.php
protected $routeMiddleware = [
// ..

    'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
    
// ..
];
```

Chẳng hạn giờ các bạn muốn client chỉ truy xuất được dữ liệu từ API chỉ 5 lần trong 1 phút thì bạn có thể định nghĩa route như sau:
```PHP:routes/web.php
Route::middleware('throttle:5,1')->group(function () {
    Route::get('api/user', function () {
        //
    });
});
```

**Trong đó:** `throtte:5,1` có nghĩa là chỉ cho phép gửi request 5 lần/1 phút.

Giờ các bạn thử truy cập http://localhost:8000/api/user và refresh quá 5 lần xem, một trang lỗi 429 sẽ được trả về.

![](https://images.viblo.asia/500d81bf-a5ec-4c1c-873b-67f7f47b6030.JPG)

Các bạn thử đợi trong 1 phút, ta có thể truy cập lại được đấy.

Bạn có thể thay thế số lần truy cập giới hạn bằng một tham số khi model `User` đã được xác thực (tức là đã đăng nhập) bằng cách khai báo trong model `User` thuộc tính `rate_limit`, lúc này bạn có thể thay thế số lần cho phép truy cập bằng `rate_limit`. 

```PHP:app/User.php
public $rate_limit = 5;
```

```PHP
Route::middleware('auth:api', 'throttle:rate_limit,1')->group(function () {
    Route::get('/user', function () {
        //
    });
});
```

Ứng dụng của trường hợp này nếu bạn đang xây dựng trang API có phí, tức là tài khoản dùng thử sẽ giới hạn 10/1 phút và tài khoản có trả phí được 100/1 phút chẳng hạn.

Do hiện giờ ta chưa học "Middleware" và "Authentication" nên không thể test được vì yêu cầu phải thực hiện login user. Các bạn có thể tự kiểm chứng vấn đề này trong những tập sau.

# IX. Truy cập route hiện tại
Bạn có thể lấy một số thông tin về route hiện hiện từ các phương thức trong facade `Route`.

```PHP
// Toàn bộ thông tin về route hiện tại
$route = Route::current(); 

// Tên route hiện tại
$name = Route::currentRouteName();

// Lấy controller action của route hiện tại
$action = Route::currentRouteAction();

// ...
```

Bạn có thể tham khảo một số API trong [Route facade](https://laravel.com/api/5.8/Illuminate/Routing/Router.html) và [Route instance](https://laravel.com/api/5.8/Illuminate/Routing/Route.html).

---- 

Cảm ơn các bạn đã quan tâm theo dõi. Cùng đồng hành với mình qua những tập tiếp theo tại series "[Hành trình chinh phục Laravel Framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" nhé! Chúc may mắn và hẹn gặp lại.

> Mình đang xây dựng blog riêng là [lechihuy.dev ](https://lechihuy.dev), mong các bạn ghé sang ủng hộ, mình cảm ơn rất nhiều ạ