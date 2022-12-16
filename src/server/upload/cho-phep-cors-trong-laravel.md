CORS là cơ chế sử dụng việc thêm HTTP headers để nói cho trình duyệt biết một ứng dụng này có thể truy cập đến tài nguyên của một ứng dụng web khác không cùng một domain hay không. Hay nói cách khác một ứng dụng web được gọi là thực thi cross-origin HTTP request khi nó có thể lấy được tài nguyên trên một origin khác (domain, protocol hoặc porrt) từ chính nó.

> Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin. A web application executes a cross-origin HTTP request when it requests a resource that has a different origin (domain, protocol, or port) from its own.

# Ý nghĩa của CORS
Như các bạn biết  [same-origin policy](https://www.w3.org/Security/wiki/Same_Origin_Policy) là một chính sách bảo mật mà tất cả trình duyệt hiện nay đều tuân thủ. Chính sách này giúp cho việc ngăn chặn truy cập tài nguyên trái phép từ các domain khác với mục đích xấu.

Chúng ta hãy hình dung một kịch bản như sau:
- Một hacker sử dụng code javascript viết một ajax request để lấy thông tin danh bạ của bạn từ gmail trên một website mã độc abc.example.com. Giả sử api lấy danh bạ là https://api.gmail.com/contacts
- Bạn đang đăng nhập gmail trên cùng một trình duyệt với trang web mã độc abc.example.com

Same-origin policy sinh ra chính là để ngăn chặn những kịch bản như trên để bảo vệ người dùng, giúp an toàn hơn khi lướt web. Nếu như bạn cố tình thực hiện truy cập vào dữ liệu trái phép thì sẽ nhận được lỗi như bên dưới
```
$.get('https://api.gmail.com/contacts')
Access to XMLHttpRequest at ' https://api.gmail.com/contacts' from
origin 'abc.example.com' has been blocked by CORS policy: No
'Access-Control-Allow-Origin' header is present on the requested
resource.
```

Tuy nhiên, trong thực tế có những bài toán mà bạn cần cho phép truy cập tài nguyên từ một domain khác. Tôi ví dụ, bạn có một site user.example.com là nơi người dùng đăng kí và đăng nhập, site thứ 2 là blog.example.com là một trang blog người dùng cần đăng nhập mới đọc được các nội dung ở trang blog này. Đồng thời, bạn không muốn phải xây dựng hai nơi lưu trữ thông tin người dùng. Để giải quyết bài toán này bạn cần cho phép site thứ hai có thể biết được trạng thái đăng nhập của site thứ nhất. Bài viết này tôi sẽ giới thiệu tới các bạn các bước thực hiện điều này trên một website Laravel.

# Cài đặt CORS trên Laravel
## Phần site server
### Rotute
Tôi sẽ cấu hình một url api thực hiện kiểm trạng thái login:
```php
Route::group(['prefix' => 'api', 'as' => 'api.', 'middleware' => 'validate_api_token'], function () {
    Route::post('api/checkLogin', 'ApiController@getLoginStatus')->name('check_login_status');
});
```

Đây cũng chỉ là một thiết lập route thông thường. Ở đây tôi thêm một middleware 'validate_api_token', middleware này có tác dụng validate token truyền đến từ site blog, bạn cần token này để xác nhận rằng nó được tạo từ một secret key và một thuật toán mà cả hai bên đã biết trước, các site khác không thể có được token này, điều này làm tăng tính bảo mật. Bạn có thể sử dụng bất kì thuật toán mã hóa nào để là sinh ra token. Tôi sẽ không đi vào chi tiết về vấn đề này.

### Controller

Trong controller, chúng ta cần viết một function để trả về trạng thái login và một số thông tin người dùng khác. Có bạn có thể xem code như bên dưới:

```php
public function getLoginStatus(Request $request)
{
        $loginInfo = ['isLogin' => false];
        if ($user = auth()->user()) {
            $loginInfo = [
                'isLogin' => true,
                'userId' => $user->id,
                'email' => 'test@example.com',
                'name' => 'User1'
            ];
        }

        return response()->json($loginInfo);
}
```

Ở hàm ```getLoginStatus```, tôi chỉ đơn giản lấy thông tin user từ hepler ```auth()->user()``` của laravel, nếu đối tượng này khác null thì tức là đang login ngược lại là không. Tôi sẽ trả về kiểu dữ liệu json để có thể gọi chúng trong hàm ajax,

### Middleware
Phần đáng chú ý nhất là ở đây. Bạn cần phải thiết lập response trả về để nói cho trình duyệt biết ứng dụng cho phép domain nào, method nào và cách thức nào có thể truy cập vào tài nguyên của site user.example.com. Để làm điều đó tôi tạo ra một middleware như bên dưới

```php
 public function handle($request, Closure $next)
 {
        return $next($request)
            ->header('Access-Control-Allow-Origin', 'http://blog.example.com')
            ->header('Access-Control-Allow-Methods', '*')
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Access-Control-Allow-Headers', 'X-CSRF-Token');
 }
```
Tôi sẽ giải thích từng thành phần với các bạn:
- ```Access-Control-Allow-Origin```: Thiết lập này cho biết site nào được phép truy cập CORS, giá trị ở đây có thể là một chuỗi, một mảng. Nếu là một mảng bạn thiết lập thành `header('Access-Control-Allow-Origin', ['http://blog.example.com', ;'http://127.0.0.1:8000'])`. Bạn có thể thấy, chúng ta hoàn toàn có thể chỉ định một địa chỉ local cho CORS.
- `Access-Control-Allow-Methods`: Chỉ định HTTP Method nào được phép thực hiện. `*` có nghĩa là tất cả các phương thức. Bạn có thể chỉ rõ phương thức cụ thể mà ứng dụng cho phép, ví dụ: GET, POST, PUT, HEAD,...
- `Access-Control-Allow-Credentials`: Cấu hình này nói với trình duyệt rằng, nó có thể đính kèm các cookie của site user.example.com trong các request Cors của site blog.example.com hay không. Lưu ý rằng, header này chỉ hoạt động nếu phía client cũng đặt giá trị `withCredentials = true`
- `Access-Control-Allow-Headers`: Cho phép phần header nào được đính kèm cùng request CORS. Vì ứng dụng laravel sẽ yêu cầu một csrf_token với một request POST, vì vậy ta thiết lập giá trị `X-CSRF-Token`

### Kernel
Tôi sẽ thiết lập middleware vừa tạo ở trên ở group `middleware` trong Kernel.php. Khi bạn thiết lập middleware trong group này có nghĩa là mọi request đều cho phép CORS

```php
protected $middleware = [
    ...
    \App\Http\Middleware\Cors::class,
    ...
];
```

Nếu không muốn như vậy, bạn có thể config chỉ riêng cho url cho phép CORS. Bạn sẽ cấu hình middleware ở `routeMiddlewares` ở Kernel

```php
protected $routeMiddleware = [
    ...
    \App\Http\Middleware\Cors::class,
    ...
];
```
Đồng thời thiết lập lại route như sau:
```php
Route::group(['prefix' => 'api', 'as' => 'api.', 'middleware' => ['cors', 'validate_api_token']], function () {
    Route::post('api/checkLogin', 'ApiController@getLoginStatus')->name('check_login_status');
});
```

Ok. phần api server (user.example.com) đã xong. Tiếp đến, chúng ta cần tạo một request bên phía client (blog.example.com)

## Phía site client
### Html
Ta tạo một button đơn giản để kiểm tra trạng thái login:
```html
<button type="button" id="btn-check-login">Checklogin</button>
```

### Kiểm tra CORS site server
Để biết được site server có cho phép CORS hay không, các bạn thực hiện lệnh sau:
```powershell
curl -i -X OPTIONS -H "Origin: http://blog.example.com" \
    -H 'Access-Control-Request-Method: POST' \
    -H 'Access-Control-Request-Headers: X-CSRF-Token' \
    "http://user.example.com/api/checkLogin"
```

Request không thực hiện một request trực tiếp để kiểm trạng thái login mà nó là một tiền request (preflight). Có nghĩa là nó sẽ gửi một request để kiểm tra xem server có cho phép CORS hay không. Nếu có server sẽ trả về response chứa các thành phần như sau:

```powershell
Access-Control-Allow-Origin:  http://blog.example.com
Access-Control-Allow-Methods: POST
Access-Control-Allow-Headers: X-CSRF-Token
```

Ngược lại, bạn sẽ không thể thực hiện một CORS với method POST trên.
### Tạo một ajax request
Tôi tạo ra một request jquery ajax đơn giản như sau:

```js
$('#btn-check-login').click(function() {
    $.ajax({
        url: "http://user.example.com/api/checkLogin",
        type: 'POST',
        dataType: 'json',
        data: {
            'API_TOKEN': 'api_token' // Một chuỗi mã hóa bất kì mà bạn tạo ra
        },
        xhrFields: {
            withCredentials: true
        },
    }).done(function(response) {
       console.log(response);
    }).fail(function(err) {
        console.log(err);
    });
 });
```

Bạn có thể thấy, nó chỉ là một hàm quen thuộc với chúng ta, duy chỉ có một cấu hình cần chú ý đó là `xhrFields: { withCredentials: true }`. Với cấu hình này, request của chúng ta sẽ gửi kèm cookie của site user.example.com trong option. Chúng ta đều biết trạng thái login của site được thiết lập bởi session và cookie và chỉ khi chúng ta gửi được cookie này thì mới xác nhận được user đang login hay không. Tuy nhiên, để thiết lập này hoạt động thì phía server cần thiết lập `header('Access-Control-Allow-Credentials', 'true')`, nếu không nó sẽ không có ý nghĩa gì cả. Lưu ý, cookie trong trường hợp này là third-party cookie và việc lưu trữ, truy cập cookie vẫn hoàn toàn tuân theo `same-origin policy`. Do đó, chúng ta không thể truy cập cookie bằng `document.cookie` được. Nó hoàn toàn được xử lý tự động bởi trình duyệt.

Sau khi thực thi request trên ta nhận được kết quả thành công như sau:

```json
{
    "isLogin": true,
    "userId": 12345,
    "email": "test@example.com",
    "name": "User1"
}
```

Ok, như vậy tất cả đã hoàn thành. Chúng ta đa có thể thực hiện một request CORS hoàn chỉnh.

# Thảo luận
Bài viết này, tôi muốn giới thiệu với các bạn về CORS là gì, ý nghĩa của nó cũng như các thiết lập để tạo một request CORS đơn giản trong Laravel. Hy vọng, các mang đến cho các bạn một cái nhìn cơ bản cũng như có thể áp dụng được trong bài toán của các bạn. Cảm ơn các bạn đã theo dõi bài viết.

#### Tham khảo:
https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141