Xin chào tất cả các mọi người, bài viết này mình xin trình bày kiến thức về request trong laravel mà mình tìm hiểu được, rất mong được sự theo dõi của mọi người.

### 1) Request là gì?

- Request hiểu một các đơn giản nó là các yêu cầu mà gửi từ client đến server. 
- Để lấy đối tượng của HTTP request hiện tại thông qua dependency injection ta chỉ cần use Illuminate\Http\Request phần đầu của controller hay type-hint phương thức trong controller, đối tượng của request hiện tại sẽ được tự động inject vào bởi service container.

**- ví dụ**

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Store a new user.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $name = $request->email;

        // ...
    }
}
```

- Trong ví dụ trên $request là một instance của Illuminate\Http\Request, có thể lấy dữ liệu được nhập vào trường 'email'

### 2) Các phương thức hỗ trợ của Request

- Đối tượng Illuminate\Http\Request cung cấp một số phương thức để kiểm tra HTTP request và kế thừa từ class cơ sở là Symfony\Component\HttpFoundation\Request. Sau đây là một vài hàm hữu dùng của class:

**2.1)  $request->path()**

- Phương thức trả về thông tin đường dẫn của request.

- Ví dụ:

```php
// ví dụ URL http://localhost:8001/category
$uri = $request->path();
// kết quả trả về  "category"
echo $uri;
```

**2.1) $request->is()**

- Phương thức is() cho phép kiểm tra xem đường dẫn request có khớp với một mẫu hay không, sử dụng ký tự * để trùng khớp tất cả.

- Ví dụ:

```php
if ($request->is('category/*')) {
    // các đường dẫn bắt đầu bằng category/ được xử lý
    // ví dụ http://localhost:8001/category/create, http://localhost:8001/category/update
}
if ($request->is('category/create')) {
    echo "Đường dẫn bạn vừa truy nhập đúng là http://localhost:8001/category/create {$request->path()}";
}
```

**2.3) $request->url()**

- Phương thức url() trả về đường dẫn của URL không chưa query string.

- Ví dụ:

```php
// ví dụ ta có đường dẫn : http://localhost:8001/category?param=laravel (?param=laravel - query string)
$url = $request->url();
// trả về http://laravel.dev/category
```

**2.4) $request->fullUrl()**

- Phương thức này cũng giống như phương thức url() chỉ có điều là nó trả về đẩy đủ URL kể cả query string

- Ví dụ:

```php
// ví dụ ta có đường dẫn : http://localhost:8001/category?param=laravel (?param=laravel - query string)
$url = $request->fullUrl();
// trả về http://laravel.dev/category?param=laravel
```

**2.5) $request->method()**

- Phương thức method() trả về hành động của request là GET hay POST ...
- Ngoài ra bạn cũng có thể sử dụng isMethod để xác định hành động có phải là GET, POST ... hay không?

- Ví dụ:

```php
$method = $request->method();
if ($request->isMethod('get')) {
    echo GET request';
} else {
    echo 'POST request';
}
```

**2.6) $request->route()->getName()**

- Phương thức này nếu ta đặt tên cho Route thì nó sẽ trả cho chúng ta `name` của route đó

- Ví dụ:

```php
// file định nghĩa route: web.php
Route::get('category', 'CategoryController@index')->name('category.index');

//
$nameRoute = $request->route()->getName();
// kết quả là: 'category.index'
```

**2.7) $request->ip()**

- Phương thức này trả về địa chỉ ip của người dùng.

- Ví dụ:

```php
$ipAddress = $request->ip();
echo "Địa chỉ IP người dùng: {$ipAddress}";
```

**2.8 $request->server()**

- Phương thức này trả về các thông tin liên quan đến máy chủ.
- Một số thông tin hay được sử dụng:
    - REQUEST_TIME: thời gian yêu cầu gửi đến máy chủ web
    - QUERY_STRING: query string trong URL
    - URL_REFERER: đường dẫn url tham chiếu
    - SERVER_ADDR: Địa chỉ máy chủ
    - REQUEST_SCHEME: giao thức sử dụng
    - ...

Ví dụ:

```php
$serverAddress = $request->server('SERVER_ADDR');
echo "Địa chỉ IP máy chủ: . {$serverAddress}";
```

**2.9) $request->header()**

- Phương thức này trả về các thông tin header của request như: thông tin về trình duyệt sử dụng user-agent, thông tin về dữ liệu cookie, trong tin về host yêu cầu ...

- Ví dụ:

```php
// file định nghĩa route: web.php
Route::get('category', 'CategoryController@getInfo');

// CategoryController.php

public function getInfo(Request $request){
    $ipAddress = $request->ip();
    echo "Địa chỉ IP người dùng: {$ipAddress}";

    $serverAddress = $request->server('SERVER_ADDR');
    echo "Địa chỉ IP máy chủ: {$serverAddress}";

    $urlReferer = $request->server('URL_REFERER');
    echo "Đường dẫn xuất phát: ' . {$urlReferer}";

    $userAgent = $request->header('User-Agent');
    echo "Thông tin về trình duyệt: {$userAgent}";
}
```

**2.99) $request->route('category')**
- Phương thức này sẽ trả ra instance của Category. Khi đường dẫn bạn gửi lên http://localhost:8001/category/1 thì ở trong controller ta sử dụng $request->route('category') thì nó trả ra cho ta category có id = 1 nếu trong database có.

- Ví dụ:

```php
// file định nghĩa route: web.php
Route::get('category/{category}', 'CategoryController@update')->name('category.update');


//
 public function update(Category $category, Request $request)
    {
       $category = $request->route('category');
       
       // $category này chính là category có id = 1 trong database
    }
```

### 3) Một số cách lấy thông tin từ trong Form từ Request

**3.1) Nhận giá trị input**

- Ta có thể lấy input từ người dùng qua Illuminate\Http\Request

- Ví dụ:

```php
$name = $request->input('email');
```
- Ta có thể truyền vào giá trị mặc định ở đối số thứ hai trong hàm input. Nếu giá trị trong input không có trong request thì giá trị này sẽ được lấy:

```php
$name = $request->input('email', 'email@gmail.com');
```
- Đối với dữ liệu trên form là một mảng dữ liệu ta có thể sử dụng '.' để truy cập vào mảng

```
$name = $request->input('categories.0.name');

$names = $request->input('categories.*.name');
```

**3.2) Nhận giá trị input từ JSON**

- Khi yêu cầu gửi lên dưới đạng JSON, ta có thể truy xuất dữ liệu trong JSON thông qua hàm input với điều kiện header của request Content-Type phải là application/json. Ta có thể sử dụng cú pháp "." để truy xuất sâu hơn vào trong mảng JSON:

```php
$name = $request->input('categories.name');
```

**3.3) Kiểm tra sự tồn tại giá trị của input**

- Để kiểm tra một giá trị input có tồn tại trên request hay không, ta có thể sử dụng hàm has. Hàm has trả về true nếu như giá trị tồn tại và không phải là chuỗi rỗng:

- Ví dụ:

```php
if ($request->has('email')) {
    //
}
```

**3.4) Nhận tất cả dữ liệu của form**

- Để nhận tất cả dữ liệu từ form ta dử dụng method all():

- Ví dụ:

```php
$input = $request->all();
```

**3.5) Nhận một phần của dữ liệu input**
- Khi muốn nhận một phần nhỏ dữ liệu trong form ta có thể sử dụng hàm only hoặc except, Cả hai hàm đều nhận một array hoặc một danh sách các đối số:

- Ví dụ:

```php
$input = $request->only(['email', 'password']);

$input = $request->only('email', 'password');

$input = $request->except(['username']);

$input = $request->except('username');
```

**3.6) Thuộc tính động**

- Ta có thể truy xuất vào input sử dụng thuộc tính động trên đối tượng Illuminate\Http\Request. Ví dụ, nếu một trong các form có chứa trường là email, ta có thể lấy giá trị được post lên như sau:

```php
$email = $request->email;
```

### 4) Input cũ trong form

- Laravel cho phép ta giữ giá trị input từ một request sang request tiếp theo. Đặc điểm này đặc biệt hữu dụng khi bạn muốn thiết lập lại form sau khi phát hiện có lỗi.

**4.1) Flash input tới session**

- Hàm flash trong Illuminate\Http\Request sẽ flash input hiện tại vào trong session nên nó có thể sử dụng trong request tiếp theo của user tới ứng dụng:

```php
$request->flash();
```

**4.2) Flash input vào trong session rồi chuyển trang**

- nếu muốn flash input cùng với chuyển trang vào trang trước đó, bạn có thể dễ dàng tạo móc nối input vào trong một redirect sử dụng hàm withInput:

```php
return redirect('form')->withInput();

return redirect('form')->withInput($request->except('password'));
```

**4.3) Lấy dữ liệu cũ**

- Để lấy dữ liệu đã flash từ request trước đó, ta có thể sử dụng hàm old() cảu request.

```php
$username = $request->old('username');
```

### Kết luận

Trên đây là một chút kiến thức mà mình tìm hiểu được về request trong laravel, rất mong được sự góp ý của mọi người. Cảm ơn mọi người đã theo dõi bài viết của mình.

### Nguồn tham khảo

- https://laravel.com/docs/5.8/requests
- https://allaravel.com