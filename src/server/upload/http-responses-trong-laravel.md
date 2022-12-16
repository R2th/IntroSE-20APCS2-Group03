Khi mỗi request từ trình duyệt gửi lên máy chủ web xử lý xong sẽ trả về một response cho trình duyệt để hiển thị các nội dung cho người dùng. Framework Laravel cung cấp rất nhiều cách thức để trả về các response, các response có thể được trả về tại các route hoặc tại các phương thức của Controller.
# Tạo response cơ bản
### 1. Các response cơ bản đơn giản nhất là trả về ở dạng chuỗi hoặc mảng.

Tất cả route và controller sẽ trả về response để gửi cho trình duyệt. Laravel cung cấp 1 vài cách khác nhau để trả về responses. Cách đơn giản nhất là trả về một chuỗi từ một route hoặc controller. Laravel sẽ tự động chuyển chuỗi đó thành 1 HTTP response.
```php
Route::get('/', function () {
    return 'Hello World';
});
```

Ngoài trả về 1 chuỗi từ một route hoặc controller, bạn củng có thể trả về các mảng hoặc laravel collection. Laravel sẽ tự động chuyển mảng hoặc collection đó về Json response.
```php
Route::get('/', function () {
    return ['a' => 1, 'b' =>  2, 'c' => 3];
});
```
### 2. Response Objects

Thông thường bạn không chỉ trả về chuỗi hoặc mảng mà bạn sẽ trả về `Illuminate\Http\Response` instances hoặc 1 view.

Trả về 1 Response instances cho phép bạn tùy chỉnh lại mã trạng thái và header của HTTP response.

Một Response instances được kế thừa từ lớp `Symfony\Component\HttpFoundation\Response`. Lớp này cung cấp nhiều phương thức để xây dựng các phản hồi HTTP.
```php
Route::get('home', function () {
    return response('Hello World', 200)
        ->header('Content-Type', 'text/plain');
});
```
### 3. Gán Header vào Response

Các response khi trả về máy chủ web đều có phần header chứa một số các thông tin để trình duyệt có thể sử dụng trong quá trình tạo nội dung hiển thị cho người dùng.

Các thông tin header này Laravel cho phép thay đổi, gán thêm trước khi gửi đến trình duyệt. Phương thức header() được sử dụng để thêm các thông tin header trước khi gửi response:

Bạn có thể sử dụng phương thức header để thêm 1 loạt các header vào response trước khi gửi lại cho người dùng. 
```php
return response($content)
    ->header('Content-Type', $type)
    ->header('X-Header-One', 'Header Value')
    ->header('X-Header-Two', 'Header Value');
```
Hoặc, bạn có thể sử dụng phương thức withHeaders để chỉ định một mảng các tiêu đề được thêm vào response.
```php
return response($content)
    ->withHeaders([
        'Content-Type' => $type,
        'X-Header-One' => 'Header Value',
        'X-Header-Two' => 'Header Value',
    ]);
```
### 3. Gán Cookie vào Response

Phương thức cookie của Response cho phép gán một giá trị cookie vào response trả về trình duyệt.
```php
return response($content)
    ->header('Content-Type', $type)
    ->cookie('name', 'value', $minutes);
```
Phuơng thức cookie củng cho phép truyền thêm 1 vài đối số.

Các đối số này có cùng mục đích và ý nghĩa như các đối số được cung cấp trong phương thức setcookie của PHP.
```php
    ->cookie($name, $value, $minutes, $path, $domain, $secure, $httpOnly)
```
# Redirects

Redirect response là các instance của lớp `Illuminate\Http\RedirectResponse` dùng để chuyển hướng người dùng đến 1 URL khác. Có nhiều cách để tạo ra RedirectResponse instance, cách đơn giản nhất là dùng phương thức `redirect`.
```php
Route::get('dashboard', function () {
    return redirect('home');
});
```
Đôi khi bạn muốn chuyển hướng người dùng đến trang trước đó của họ. Bạn có thể sử dụng phương thức `back`,
```php
Route::get('dashboard', function () {
    return redirect()->back();
});
```

### 1. Redirecting To Named Routes

Khi bạn gọi phương thức `redirect` mà không truyền tham số, 1 instance của  `Illuminate\Routing\Redirector` sẽ được trả về, cho phép bạn gọi các hàm của `Redirector`.

Để chuyển hướng đến các route bạn có thể sử dụng phương thức `route` .
```php
    return redirect()->route('login');
```
Nếu route chứa các đối số, bạn có thể truyền thêm chúng vào phương thức `route`.
```php
    return redirect()->route('profile', ['id' => 1]);
```
Nếu bạn đang chuyển hướng tới 1 route với đối số là id thuộc 1 Eloquent model, bạn có thể truyền model của nó. Id sẽ được tự động lấy.
```php
// url:  profile/{id}

    return redirect()->route('profile', [$user]);
```
Nếu bạn muốn tùy chỉnh giá trị được đặt trong tham số của route, bạn nên ghi đè phương thức `getRouteKey` trên model Eloquent của nó.
```php
public function getRouteKey()
{
    return $this->name;
}
```
```php
// url:  profile/{name}

    return redirect()->route('profile', [$user]);
```
### 2. Redirecting To Controller Actions

Bạn củng có thể chuyển hướng đến 1 function trong controller nếu sử dụng phương thức `action`.
```php
    return redirect()->action('HomeController@index');
```
Có thể truyền thêm tham số nếu có.
```php
return redirect()->action(
    'UserController@profile', ['id' => 1]
);
```
### 3. Redirecting To External Domains

Chuyển hướng đến 1 tên miền nào đó sử dụng phương thức `away`.
```php
    return redirect()->away('https://www.google.com');
```
### 4. Redirecting With Flashed Session Data

Thông thường, điều này được thực hiện sau khi thực hiện thành công hay thất bại một hành động nào đó và bạn muốn gửi thông báo kèm theo redirect response.
```php
Route::post('user/profile', function () {
    // Update the user's profile...

    return redirect('dashboard')->with('status', 'Profile updated!');
});
```
Sau khi người dùng được chuyển hướng, bạn có thể hiển thị thông báo.
```php
@if (session('status'))
    <div class="alert alert-success">
        {{ session('status') }}
    </div>
@endif
```
# Một số loại Response khác

### 1. View Responses

```php
return response()
    ->view('hello', $data, 200)
    ->header('Content-Type', $type);
```
### 2. JSON Responses

Phương thức json sẽ tự động đặt header Content-Type thành `application/json` và nó cũng chuyển đổi mảng thành JSON bằng cách sử dụng hàm json_encode của PHP.
```php
return response()->json([
    'name' => 'Abigail',
    'state' => 'CA'
]);
```
### 3. JSON ResponsesFile Downloads

Phương thức `download` có thể được sử dụng để tạo 1 response buộc trình duyệt của người dùng tải xuống tệp ở đường dẫn đã cho. Nó gồm có 3 đối số, đường dẩn đến file (bắt buộc) , tên tệp khi tải xuống (không bắt buộc) và mảng header (không bắt buộc).

```php
    return response()->download($pathToFile);

    return response()->download($pathToFile, $name, $headers);
```
### 4. File Responses

Phương thức `file` có thể được sử dụng để hiển thị tệp, chẳng hạn như hình ảnh hoặc PDF, trực tiếp trong trình duyệt của người dùng thay vì bắt đầu tải xuống. Phương thức này gồm 2 đối sô, đối số đầu tiên là đường dẫn đến tệp của nó và đối số thứ 2 không bắt buộc là một mảng các header.
```php
    return response()->file($pathToFile);

    return response()->file($pathToFile, $headers);
```

##  Link tham khảo
>  https://laravel.com/docs/5.6/responses