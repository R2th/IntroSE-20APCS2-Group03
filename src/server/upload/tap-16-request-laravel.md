Rất vui được gặp lại tất cả các bạn trong series "[Hành trình chinh phục Laravel framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" của mình. Trong tập ngày hôm nay, chúng ta sẽ cùng nhau tìm hiểu về "Request", nói tìm hiểu thì không hợp lý cho lắm vì chắc ai cũng biết nó là gì rồi. Ở bài này, mình sẽ hướng dẫn các bạn cách sử dụng, khai thác một HTTP request trong Laravel.

# I. Truy cập request (Accessing the request)
Để có được object request hiện tại thông qua denpendency injection, bạn cần type-hint `Illuminate\Http\Request` class trên controller method. Object request sẽ tự động inject bởi service container.

```PHP
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function store(Request $request)
    {
        //
    }
}
```

## 1. Dependency injection & Route parameters
Như đã đề cập ở các tập trước, nếu trong method controller có nhận các dữ liệu từ tham số URI, thì nên khai báo chúng sau các dependency class. Chẳng hạn bạn có route sau:

```PHP
Route::put('user/{id}', 'UserController@update');
```

Bạn có thể inject `Illuminate\Http\Request` class và lấy dữ liệu tham số `id` theo cách sau:

```PHP
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function update(Request $request, $id)
    {
        //
    }
}
```

Như bạn thấy, ta sẽ ưu tiên inject dependency class trước các tham số trong route.

## 2. Truy cập request thông qua Route Closure (Accessing the request via route closure)
Nếu việc xử lý logic quá ngắn gọn, bạn có thể inject `Iluminate\Http\Request` tại file route như thế này:

```PHP
use Illuminate\Http\Request;

Route::get('/', function (Request $request) {
    //
});
```

# II. Request path & Method
`Illuminate\Http\Request` cung cấp cho chúng ta rất nhiều method để kiểm tra HTTP request hiện tại. Dưới đây là một số các method quan trọng, hay sử dụng.

## 1. Lấy request path (Retrieving the request path)
Với method `path` sẽ trả về path của request hiện tại. Nếu request hiện tại có url là `http://domain.com/foo/bar` thì method `path` sẽ trả về `foo/bar`.

```PHP:routes/web.php
use Illuminate\Http\Request;

Route::get('/foo/bar', function (Request $request) {
    return $request->path();
});
```

Các bạn có thể dùng đoạn code trên để test.

Method `is` cho phép bạn xác thực rằng request path hiện tại khớp với pattern mà bạn đưa ra. Bạn có thể sử dụng ký tự `*` để làm đại diện cho các thành phần phía sau.

```PHP:routes/web.php
use Illuminate\Http\Request;

Route::get('/admin/post', function (Request $request) {
    if ($request->is('admin/*')) {
        return 'Request path matches with "admin/*" pattern';
    }
});
```

Pattern ở đây chính là `admin/*`, nếu ta truy cập request path `admin/post` thì chắc chắn sẽ trùng khớp.

![](https://images.viblo.asia/3c9e51e6-2b55-4742-9f53-41275e9fc155.JPG)

## 2. Lấy request URL (Retrieving the request URL)
Để lấy đầy đủ URL của request hiện tại, bạn có thể sử dụng method `url` hoặc `fullUrl`. Tuy nhiên method `url` sẽ trả về URL không chứa query string, còn đối với `fullUrl` sẽ trả về URL kèm với query string.

Để có thể hiểu hơn về sự khác biệt này, các bạn đăng ký route fallback như sau:

```PHP:routes/web.php
use Illuminate\Http\Request;

Route::fallback(function (Request $request) {
    return dd([
        $request->url(),
        $request->fullUrl()
    ]);
});
```

Ở đây mình đăng ký route fallback để có thể test với bất kỳ đường dẫn nào. Mình truyền hai method `url` và `fullUrl` vào trong một mảng rồi sau đó dump ra trình duyệt để dễ dàng quan sát.

Các bạn nạp server và truy cập đường dẫn http://localhost:8000/post?id=1 chẳng hạn, đây là kết qua chúng ta thu nhận được:

![](https://images.viblo.asia/0bc418bd-b106-4d81-928b-08225b66414a.JPG)

## 3. Lấy request method (Retrieving the request method)
Cái này thì khá dễ hiểu, ta chỉ cần sử dụng phương thức `method` để lấy method HTTP hiện tại của request. Ngoài ra, ta có thể kiểm tra method HTTP của request hiện tại bằng phương thức `isMethod` với tham số truyền vào là method HTTP bạn muốn khớp với method HTTP của request hiện tại.

```PHP:routes/web.php
use Illuminate\Http\Request;

Route::get('/', function (Request $request) {
    echo 'Current method HTTP: ' . $request->method() . '<br>';
    
    if ($request->isMethod('get')) {
        echo 'This is GET method HTTP';
    }
});
```

Một kết quả mong đợi:

![](https://images.viblo.asia/19cf6c68-a6bc-4c2d-91fb-a7441bcd8757.JPG)

# III. Chuẩn hóa input (Input normalization)
Mặc định thì Laravel đã kết nối hai middleware `TrimStrings` và `ConvertEmptyStringsToNull ` trong ứng dụng. Các middleware này được liệt kê trong lớp `App\Http\Kernel`, cụ thể tại `$middleware`. Các middleware này có chức năng sẽ tự động `trim` tất cả các trường chứa chuỗi trên request, hơn thế nữa là chuyển đổi bất kỳ trường trống nào về giá trị `null`. Với nó, bạn sẽ không cần phải quá lo lắng về việc chuẩn hóa input trong route hay controller nữa.

Nếu bạn muốn vô hiệu hóa hai middleware này, bạn có thể xóa nó khỏi `$middleware` tại class `App\Http\Kernel`.

![](https://images.viblo.asia/00c2a6d6-ed43-4167-a1f4-050127a8c9d9.png)

# IV. Lấy dữ liệu input (Retrieving input data)

Đầu tiên các bạn tạo controller `FormController` để ta tiến hành lấy dữ liệu input trong đó. Trong `FormController` bạn định nghĩa hai method dưới:

```PHP:app/Http/Controllers/FormController.php
public function show()
{
    return view('form');
}

public function post(Request $request)
{
    //
}
```

Trong method `post` mình đã inject `Illuminate\Http\Request` để có thể lấy dữ liệu input từ request hiện tại. Tạm thời ta sẽ để đây, lát ta sẽ tiến hành test sau.

Tiếp đến là đăng ký 2 route:

```PHP:routes/web.php
Route::get('/', 'FormController@show');

Route::post('/post', 'FormController@post');
```

Cuối cùng là tạo blade view `form` để build các form HTML cho việc gửi data từ input. Thế là việc chuẩn bị đã hoàn tất, giờ ta tiến hành test các method hay sử dụng để lấy input từ `Illuminate\Http\Request`.

## 1. Lấy tất cả dữ liệu input (Retriveing all input data)
Tại blade view `form`, các bạn tạo form như sau:

```PHP:resources/views/form.blade.php
<form action="/post" method="POST">
    @csrf

    <p>Username</p>
    <div>
        <input type="text" name="username">
    </div>
    
    <p>Password</p>
    <div>
        <input type="password" name="password">
    </div>

    <br>

    <div>
        <button type="submit">Login</button>
    </div>
</form>
```

Tiếp theo tại method `post` của `FormController`, ta sẽ thử lấy dữ liệu của tất cả input được gửi từ request bằng cách:

```PHP:app/Http/Controllers/FormController.php
public function post(Request $request)
{
    dd($request->all());
}
```

Chúng ta sử dụng method `all` để thực thi việc này. Đây là kết quả:

![](https://images.viblo.asia/d9591357-1801-4901-a771-a7d611cbfb7f.JPG)

> **Chú ý:** Bạn có thể sử dụng method `input` để thay thế cho `all`.

## 2. Lấy dữ liệu của một input (Retriveing an input data)
Vẫn giữ nguyên blade view `form`, tại method `post` của `FormController` ta dump lệnh sau:

```PHP:app/Http/Controllers/FormController.php
public function post(Request $request)
{
    dd($request->input('username'));
}
```

Để có thể lấy dữ liệu của một input nào đó trong request hiện tại, ta chỉ cần sử dụng method `input` với tham số là tên của input cần lấy trong HTML. Kết quả thu được là:

![](https://images.viblo.asia/315c411c-be59-4865-8d02-52a11f35e9a5.JPG)

Ngoài ra, bạn có thể gán giá trị mặc định cho một input nào đó nếu như nó không xác định trong request hiện tại. Chẳng hạn lấy form trên thì mình chẳng có cái input nào tên là `remember` cả. Nhưng mình muốn kể cả khi không nó không tồn tại thì vẫn có được giá trị là `true`. Để làm thế, mình chỉ cần thêm tham số thứ hai của method `input` là giá trị mặc định mà mình muốn gán cho nó.

```PHP:app/Http/Controllers/FormController.php
public function post(Request $request)
{
    dd($request->input('remember', true));
}
```

![](https://images.viblo.asia/19ab054f-ddd9-426c-bba0-9714c41cf801.JPG)

Nếu bạn làm việc với các array input, sử dụng ký hiệu `.` để tham chiếu đến các phần tử của nó.
Chẳng hạn giờ mình sẽ thay đổi blade view `form` như sau:

```PHP:resources/views/form.blade.php
<form action="/post" method="POST">
    @csrf
    
    <div>
        Name: <input type="text" name="products[][name]">
        Price: <input type="text" name="products[0][price]">
    </div>
    <div>
        Name: <input type="text" name="products[][name]">
        Price: <input type="text" name="products[1][price]">
    </div>

    <br>

    <div>
        <button type="submit">Submit</button>
    </div>
</form>
```

Đây là form mô phỏng đăng các sản phẩm lên shop online. Như bạn thấy, các thông tin của sản phẩm đều chứa name là `products` dạng mảng.

Giờ ta thử dump data của input `products` này bằng cách:

```PHP:app/Http/Controllers/FormController.php
public function store(Request $request)
{
    dd($request->input('products'));
}
```

Chúng ta sẽ nhận được một mảng dữ liệu trả về của các input sau khi nhập thử dữ liệu:

![](https://images.viblo.asia/93c8ac69-44dc-4075-b936-72a2ad1af456.JPG)

Nếu bạn muốn lấy thông tin của sản phẩm có index `0` thì bạn sử dụng cú pháp tham chiếu sau:

```PHP
$request->input('products.0'); // Lấy toàn bộ thông tin sản phẩm có index "0"

$request->input('products.0.name'); // Lấy name của sản phẩ có index "0"
```

Nếu bạn chỉ muốn lấy `name` của tất cả sản phẩm trong `products` thì có thể là như sau:

```PHP
$request->input('products.*.name');
```

## 3. Lấy dữ liệu input từ chuỗi truy vấn (Retriveing input data from query string)
Trong khi method `input` dùng để lấy dữ liệu từ input trong request hiện tại (bao gồm cả query string) thì method `query` chỉ lấy giá trị từ query string.

Các bạn thay đổi blade view `form` như sau:

```PHP:resources/views/form.blade.php
<form action="/post?id=1" method="POST">
    @csrf
    
    <div>
        <button type="submit">Submit</button>
    </div>
</form>
```

Các bạn thấy mình đã truyền query string `id=1` cho `action`. Để lấy query `id`, tại method `post` của `FormController` ta thực hiện cú pháp sau:

```PHP:app/Http/Controllers/FormController.php
public function store(Request $request)
{
    dd($request->query('id'));
}
```

Và đây là kết quả:

![](https://images.viblo.asia/d0cc4593-ab79-469a-b78a-0472686bf110.JPG)

## 4. Lấy dữ liệu input thông qua thuộc tính động (Retrieving input via dynamic properties)
Bạn có thể lấy các dữ liệu input thông qua các thuộc tính trên lớp khởi tạo `Illuminate\Http\Request`. 
Thay vì:

```PHP
$request->input('name');
```

Bạn có thể sử dụng cú pháp:

```PHP
$request->name;
```

Nếu như không tồn tại input có được tham chiếu thì nó sẽ lấy giá trị tham số route có tên trùng với tên thuộc tính, còn nếu không tồn tại cả hai thì nó sẽ trả về giá trị là `null`.

## 5. Lấy giá trị JSON input (Retrieving JSON input value)
Chẳng hạn chúng ta có blade view `form` như sau:

```PHP:resources/views/form.blade.php
<form action="/post" method="POST">
    @csrf

    <div>
        <button type="submit">Submit</button>
    </div>
</form>

<script src="https://code.jquery.com/jquery.min.js"></script>
<script>
    $('form').submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: '/post',
            type: 'POST',
            data: {
                _token: $('input[name=_token]').val(),
                user: {
                    name: 'Lê Chí Huy',
                    age: 18
                }
            }, success: function(res) {
                console.log(res);
            }
        });
    });
</script>
```

Như đoạn code trên thì sau khi click "Submit", chúng ta sẽ thực thi ajax đã gửi request có kèm data json `user` tới controller.

Tại controller `FormController`, để tham chiếu data json `user` này, ta thực hiện như sau:

```PHP:app/Http/FormController.php
public function post(Request $request)
{
    return $request->input('user.name');
}
```

Chúng ta tham chiếu đến các phần tử trong JSOn như là array input ở phần trên.

![](https://images.viblo.asia/4ba1ee1c-ae73-432b-b38d-b14585634878.JPG)

## 6. Lấy một phần dữ liệu input (Retrieving a portion of input data)
Ta có thể dùng phương thức `only` hoặc `except` để lấy một phần dữ liệu input tại request, các phương thức này vừa chấp nhận liệt kê tham số, cũng vừa chấp nhận mảng.

```PHP
// Chỉ lấy input có name là "username" và "password"
$request->only(['username', 'password']);

$request->only('username', 'password');

// Lấy tất cả input ngoại trừ input có name là "credit_card"
$request->except(['credit_card']);

$request->except('credit_card');
```

## 7. Kiểm tra nếu có giá trị input (Checking if has input value)

Bạn có thể sử dụng method `has` để kiểm tra sự tồn tại của một input trên request. Nếu có tồn tại sẽ trả về `true`.

```PHP
if ($request->has('name')) {
    //
}
```

> **Lưu ý:** Trường hợp có tồn tại input trong HTML nhưng có giá trị `null` thì method `has` vẫn chấp nhận và trả về `true`.

Bạn có thể kiểm tra nhiều input cùng lúc như sau:

```PHP
if ($request->has(['name', 'email'])) {
    //
}
```

Còn nếu bạn muốn kiểm tra input gửi đến có rỗng hay không thì dùng method `filled`.

```PHP
if ($request->filled('name')) {
    //
}
```

Trong trường hợp này nếu input có giá trị `null` hoặc không tồn tại thì sẽ trả về `false`.

## 8. Old input
Laravel cho phép chúng ta giữ input data của request trong request kế tiếp. Tính năng này cực kỳ hữu ích cho việc điền lại các form khi submit gặp lỗi.

Trước khi tìm hiểu thì ta hãy phân tích thuật ngữ "flash session" đã. Thông thường các session sẽ được giới hạn bởi thời gian nhất định, hoặc kéo dài cho tới khi kết thúc phiên làm việc của trình duyệt... Nhưng đối với flash session, "tuổi thọ" của nó chỉ kéo dài trong một request. Tức là tại request nào đó, flash session sẽ được khởi tạo, tới request tiếp theo, nó được sử dụng làm việc gì đó rồi sau đó bị xóa bỏ.  

### a. Flash input đến session (Flash input to the session)
Method `flash` trong lớp `Illuminate\Http\Request` sẽ flash input data trong request hiện tại đến session để có thể sử dụng lại trong request kế tiếp. Nếu bạn muốn tất cả input đều flash thì có thể cho dòng code này trước khi bắt đầu xử lý logic trong controller.

```PHP
$request->flash();
```

Bạn có thể sử dụng hai method `flashOnly` và `flashExcept` để có thể lọc các input mà bạn muốn flash session.

```PHP
// Chỉ flash session hai input "username" và "email" trong request
$request->flashOnly(['username', 'email']);

// Flash session tất cả input, ngoại trừ input "password" trong request
$request->flashExcept('password');
```

### b. Flash input rồi chuyển hướng (Flash input then redirecting)
Thông thường khi cho user điền một form nào đó quá dài, nhưng nếu xảy ra lỗi, bạn muốn quay trở lại và thông báo một lỗi nào đó mà không phải mất hết các dữ liệu của form. Laravel cung cấp một lệnh chuyển hướng kèm theo flash input để ta có thể giải quyết yêu cầu này.

```PHP
return back()->withInput();
```

Method `back` sẽ giúp ta chuyển hướng đến url đã truy cập trước đó, còn phương thức `withInput` có chức năng tương tự như `flash`, sẽ flash session các input từ request. Chính vì thế bạn có thể thực hiện lọc các flash input trong method `withInput`.

```PHP
return back()->withInput(
    $request->except('password')
);
```

Nếu bạn muốn redirect một đường dẫn bất kì thì có thể sử dụng method `redirect` để thay thế cho `back`. Method `redirect` sẽ nhận tham số là URI mà bạn muốn chuyến hướng đến.
 
```PHP
return redirect('form')->withInput();
```

### c. Lấy old input (Retrieving old input)
Đế lấy old input từ request trước, sử dụng method `old` có trong `Illuminate\Http\Request`. Phương thức này sẽ lấy flash session đã lưu trữ ở request trước với tham số nhận vào là tên input.

```PHP
$request->old('username');
```

Ngoài ra, Laravel còn cung cấp cho ta global helper function `old`. Với nó, ta có thể lấy bất kỳ flash input nào ngay cả trong Blade template. Nếu flash input không tồn tại, nó sẽ trả về giá trị `null`.

```PHP
<input type="text" name="username" value="{{ old('username') }}">
```

Nói nãy giờ mình nghĩ ta nên thực hành một chút. Chúng ta sẽ sử dụng các route và controller đã đăng ký ở trước. Tại blade view `form`, mình có HTML form như sau:

```PHP:resources/views/form.blade.php
<form action="/post" method="POST">
    @csrf

    <p>Username</p>
    <div>
        <input type="text" name="username" value="{{ old('username') }}">
    </div>
    
    <p>Password</p>
    <div>
        <input type="password" name="password">
    </div>

    <br>

    <div>
        <button type="submit">Login</button>
    </div>
</form>
```

Mục đích mình muốn là sau khi nhấn nút "Login" thì sẽ quay trở lại form này và truyền flash input chỉ cho input "username". Chính vì thế mình chỉ khai báo `old` ở trong input "username" thôi.

Rồi bây giờ chúng ta qua code xử lý logic trong controller `FormController` tại hàm `post`.

```PHP:app/Http/Controllers/FormController.php
public function post(Request $request)
{
    return back()->withInput(
        $request->only('username')
    );
}
```

Như bạn thấy, mình sử dụng method `back` để trở về lại trang form, tiếp theo là setup flash input với method `withInput`, cuối cùng là lọc flash input mà mình muốn. Các bạn thử điền username và password, sau đó nhấn nút "Login", và đây là kết quả:

![](https://images.viblo.asia/72ed6438-221f-4ea0-84fd-ab369fcf611d.JPG)

Input data của "username" đã được giữ lại sau khi trở về trang form, nếu các bạn refresh trang form lần nữa, thì các flash input sẽ biến mất.

## 8. Cookie
Tất cả cookie được tạo bởi framework đã mã hóa và đăng ký bằng các mã chứng thực, chính vì vậy nó sẽ được coi là không hợp lệ nếu người dùng cố tình thay đổi.

### a. Lấy cookie từ request (Retrieving cookie from request)
Để nhận một giá trị cookie từ request, bạn có thể sử dụng method `cookie` trong lớp khởi tạo `Illuminate\Http\Request`.

```PHP
$value = $request->cookie('name');
```

Ngoài ra, bạn có thể sử dụng `Cookie` facade để thay thế.

```PHP
use Illuminate\Support\Facades\Cookie;

$value = Cookie::get('name');
```

### b. Đính kèm cookie đến response (Attaching cookie to response)
Bạn có thể đính kèm mộ cookie đến object `Illuminate\Http\Response`bằng cách sử dụng method `cookie`. Bạn nên truyền đầy đủ tham số tên, giá trị cookie và thời gian tồn tại của cookie (tính theo phút). Nếu bạn bỏ qua tham số thời gian, Laravel sẽ coi cookie tồn tại như một session.

```PHP
return response('Hi')->cookie('name', 'Lê Chí Huy', $minutes);
```

Method `cookie` hoạt động tương tự hàm `setcookie` mặc định của PHP. Chính vì vậy nó cũng có thể nhận một số tham số tùy chọn khác.

```PHP
return response('Hi')->cookie(
    'name', 'value', $minutes, $path, $domain, $secure, $httpOnly
);
```

Ngoài ra bạn có thể sử dụng method `queue` trong `Cookie` facade. Nói một chút về "queue", nó có nghĩ đen là "xếp hàng". Hiểu một cách đơn giản, thì set cookie "queue" sẽ thực hiện cuối cùng khi đã hoàn tất cả xử lý khác trong request hiện tại. Để hiểu hơn thì chúng ta sẽ đi đến thử nghiệm.

Tại blade view `form`, các bạn thay đổi nội dung như sau:

```PHP:resources/views/form.blade.php
@inject('cookie', 'Illuminate\Support\Facades\Cookie')

<p>Hello, {{ $cookie->get('name') }}</p>

<form action="/post" method="POST">
    @csrf

    <div>
        <button type="submit">Set cookie</button>
    </div>
</form>
```

Mình đã inject `Cookie` facade để có thể lấy cookie tại blade template. Ngoài ra bên dưới còn có form đển thực thi set cookie thông qua method `post` trong `FormController`.

```PHP:app/Http/Controllers/FormController.php
use Illuminate\Support\Facades\Cookie;

public function post(Request $request)
{
    Cookie::queue('name', 'Lê Chí Huy', 5);
    
    echo $request->cookie('name');
}
```

Bây giờ các bạn thử đoán xem khi mình click vào nút "Set cookie" thì có hiển thị cookie với tên `name` tại route `/post` không? Đáp án là "Không", như mình đã nói ở trên, cookie `name` được thiết lập bằng phương thức "queue", chính vì vậy nó sẽ thực hiện sau cùng, sau cả lệnh `echo` cookie. Nhưng nếu bạn đi đến đường dẫn http:/localhost:8000 thì tại blade view `form`, sẽ render cookie mà ta vừa set.

![](https://images.viblo.asia/e5c7d746-acd0-45d8-9064-4c415d4eeae9.JPG)

### c. Generating cookie instances
Mục này mình không biết đặt tên như thế nào nên lấy theo Laravel Docs. Đại khái nếu bạn muốn set cookie chỉ khi cookie đó trả về cùng với response thì đăng ký cookie với method `cookie`. Cách này rất giống với cách đăng ký ở trên nhưng chúng ta có thể chèn một tham số object thay vì các tham số riêng lẻ như trên.

```PHP
$cookie = cookie('name', 'value', $minutes);

return back()->cookie($cookie);
```

# V. File
## 1. Lấy file được upload (Retrieving uploaded file)
Bạn có thể truy cập tới các file được upload từ lớp `Illuminate\Http\Request` thông qua method `file`, hoặc theo cú pháp thuộc tính (nếu input đó có type là `file`). Phương thức này sẽ trả về lớp khởi tạo `Illuminate\Http\UploadedFile`, lớp này sẽ kế thừa class `SplFileInfo` của PHP, cung cấp một số phương thức để tương tác với file.

Để bắt đầu thử nghiệm các phương thức bên dưới, ta cần build một HTML form đã. Mình sẽ lấy blade view `form` và controller `FormController` ở trên. Tại blade view `form`,  các bạn xây dựng form HTML như thế này:

```PHP:resources/views/form.blade.php
<form action="/post" method="POST" enctype="multipart/form-data">
    @csrf 

    <div>
        <p>Avatar</p>
        <input type="file" name="avatar">
    </div>

    <br>

    <div>
        <button type="submit">Upload</button>
    </div>
</form>
```

Nên nhớ phải thêm `enctype="multipart/form-data"` để có thể gửi input data file.

Tiếp theo là code xử lý logic tại `post` của `FormController`. Đầu tiên ta hãy thử dump xem dữ liệu ta nhận được từ request là gì.

```PHP:app/Http/Controllers/FormController.php
public function post(Request $request)
{
    dd($request->all());
}
```

Rồi nạp server và thử đính kèm một tệp ảnh rồi nhấn "Upload" xem, kết quả bạn sẽ nhận được sẽ là:

![](https://images.viblo.asia/fc4d26a3-0254-4af5-a7d2-28b4c531f846.JPG)

Như các bạn thấy, ngoài `_token` ra, chúng ta còn nhận được `avatar` gán với object `UploadedFile` giống như ta đã đề cập ở trên.

Bạn có thể sử dụng multiple upload file, thay vì sẽ chứa một object `UploadedFile` thì nó sẽ là mảng chứa các object `UploadedFile`.

![](https://images.viblo.asia/97804c73-3e5f-4c0a-9a1c-e887bc4c0154.JPG)

### a. Kiểm tra một file có tồn tại trong request (Determining if a file is present on the request)

Bạn có thể sử dụng method `hasFile` để kiểm tra sự tồn tại của một file trong request hiện tại.

```PHP:app/Http/Controllers/FormController.php
public function post(Request $request)
{
    if ($request->hasFile('avatar') {
        echo 'Avatar exists';
    }
}
```

![](https://images.viblo.asia/fb3d566e-5587-40ac-9dba-c1525abf7a86.JPG)

### b. Xác thực upload thành công (Validation successful upload)
Ngoài việc xác định file có tồn tại không, bạn có thể xác thực có lỗi gì trong quá trình upload hay không thông qua method `isValid`, nếu không có vấn đề gì, sẽ trả về `true`.

```PHP
if ($request->file('avatar')->isValid()) {
    //
}
```

Ngoài ra để xem lỗi của file trong quá trình upload, bạn có thể dùng method `getErrorMessage` từ `Illuminate\Http\UploadedFile`.

```PHP
$request->file('avatar')->getMessageError();
```

> **Lưu ý:** Mình có test hàm này, nhưng dù không có lỗi nó vẫn trả về một chuỗi với nội dung "The file "image.jpg" was not uploaded due to an unknown error.". Vì vậy, dù có gặp lỗi này cũng không quá lo lắng. Nếu không chắc, bạn có thể xem method `getErrorMessage` tại [đây](https://github.com/symfony/symfony/blob/3.0/src/Symfony/Component/HttpFoundation/File/UploadedFile.php). Trong đó có liệt kê các lỗi mà Laravel có thể khai báo, đồng thời bạn cũng có thể sẽ hiểu lý do vì sao upload thành công như nó vẫn trả về một câu thông báo lỗi. 

Nếu muốn chính xác trong quá trình xác thực, bạn nên sử dụng method `getError` để trả về mã lỗi trong quá trình upload, nếu trả về `0` thì không có lỗi.

### c. Lấy một số thuộc tính của file (Retrieving some properties of file)

Dưới đây mình sẽ liệt kệ các method khai khác các thông tin/thuộc tính của file có trong `Illuminate\Http\UploadedFile`.

| Phương thức | Công dụng | 
| -------- | -------- | 
| getClientOriginalName     | Trả về tên đầy đủ của file. Ví dụ: image.jpg     | 
| getClientOriginalExtension | Trả về đuôi mở rộng của file. Ví dụ: jpg |
| getClientMimeType | Trả về MIME của file. Ví dụ: image/jpeg |
| guessClientExtension | Dự đoán đuôi mở rộng dựa trên MIME của file |
| getClientSize | Trả về dung lượng của file (byte) |
| getMaxFilesize | Trả về dung lượng tối đa trong một lần upload tại cấu hình `php.ini` |

## 2. Lưu trữ file upload (Storing uploaded file)
Laravel cung cấp cho chúng ta một số disk lưu trữ các file upload như `local`, `ftp`, `s3`..., các cấu hình đó được thực hiện tại `config/filesystem.php`. Nhưng tại bài này mình chỉ giới thiệu về disk `local` thôi, các disk khác chúng ta sẽ tìm hiểu ở những tập sau. 

Với disk `local`, các file khi upload sẽ được lưu trữ ngay trên hệ thống tại thư mục `storage/app`. Nếu bạn không thích thư mục mặc định này, bạn có thể thay đổi trong file cấu hình.

Để lưu trữ một file đã upload bất kỳ, ta sử dụng method `store`. 

```PHP
$request->photo->store('images');

$request->photo->store('images', 's3');
```

Method `store` này sẽ nhận hai tham số:
* Tham số thứ nhất là path chứa file, tức là `storage/app/{path}`. Nếu path chưa tồn tại, Laravel sẽ tự khởi tạo thư mục cho chúng ta.
* Tham số thứ hai (tùy chọn) sẽ là tên disk lưu trữ file, nếu không khai báo framework sẽ tự hiểu ta đang sử dụng disk `local`.

Sau khi thực thi method `store` này, nếu kiểm tra source bạn sẽ thấy các file lưu trữ đã bị đổi tên theo mã token nào đó.

![](https://images.viblo.asia/1c95f801-6d71-4750-b4b0-b5463e5f35be.JPG)

Nếu bạn không muốn như thế, bạn có thể sử dụng method `storeAs` thay thế cho `store` để upload file với tên theo ý muốn.

```PHP
$request->photo->storeAs('images', 'filename.jpg');

$request->photo->storeAs('images', 'filename.jpg', 's3');
```

> **Lưu ý:** Hai method `store` và `storeAs` sẽ trả về path file vừa lữu trữ.

# VI. Cấu hình proxy tin cậy (Configuring trusted proxy)

Khi chạy ứng dụng với TLS/SSL, đôi khi ứng dụng sẽ không tạo đường dẫn HTTPS. Thông thường điều này là do ứng dụng của bạn đang được chuyển tiếp lưu lượng truy cập từ bộ cân bằng tải của bạn trên cổng 80 và không biết nó sẽ tạo ra các liên kết an toàn.

Để giải quyết vấn đề này, bạn có thể sử dụng middleware có trong Laravel, cho phép bạn nhanh chóng tùy chỉnh các bộ cân bằng tải hoặc proxy tin cậy. Các proxy tin cậy sẽ được liệt kê ở mảng `$proxies` trong middleware `TrustProxies`.

```PHP:app/Http/Middleware/TrustProxies.php
<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Fideloper\Proxy\TrustProxies as Middleware;

class TrustProxies extends Middleware
{
    /**
     * The trusted proxies for this application.
     *
     * @var array
     */
    protected $proxies = [
        '192.168.1.1',
        '192.168.1.2',
    ];

    /**
     * The headers that should be used to detect proxies.
     *
     * @var string
     */
    protected $headers = Request::HEADER_X_FORWARDED_ALL;
}
```

> **Lưu ý:** Nếu bạn đang sử dụng AWS, `$header` sẽ nhận giá trị của `Request::HEADER_X_FORWARDED_AWS_ELB`.

Nếu bạn đang sử dụng Amazon AWS hoặc nhà cung cấp cân khác, bạn có thể không biết địa chỉ IP của bộ cân bằng thực tế của mình. Trong trường hợp này, bạn có thể sử dụng `*` để tin tưởng tất cả các proxy:

```PHP:app/Http/Middleware/TrustProxies.php
 protected $proxies = '*';
```

----

Cảm ơn các bạn đã quan tâm theo dõi. Cùng đồng hành với mình qua những tập tiếp theo tại series "[Hành trình chinh phục Laravel Framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" nhé! Chúc may mắn và hẹn gặp lại.

> Mình đang xây dựng blog riêng là [lechihuy.dev ](https://lechihuy.dev), mong các bạn ghé sang ủng hộ, mình cảm ơn rất nhiều ạ