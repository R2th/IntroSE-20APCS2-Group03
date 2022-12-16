Rất vui được gặp lại các bạn trong series "[Hành trình chinh phục Laravel framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" của mình. Ngày hôm nay, chúng ta sẽ cùng nhau tìm hiểu về "Session" trong Laravel, đây là một component hay sử dụng hầu hết ở các ứng dụng hiện nay.

# I. Giới thiệu (Introduction)
Laravel cung cấp cho chúng ta các khuôn mẫu để có thể tương tác với session. Trong Laravel có nhiều driver để lưu trữ session. Các bạn có thể mở file `config/session.php` lên và sẽ thấy các driver mà Laravel cho phép ta sử dụng:

```PHP:config/session.php
/*
|--------------------------------------------------------------------------
| Default Session Driver
|--------------------------------------------------------------------------
|
| This option controls the default session "driver" that will be used on
| requests. By default, we will use the lightweight native driver but
| you may specify any of the other wonderful drivers provided here.
|
| Supported: "file", "cookie", "database", "apc",
|            "memcached", "redis", "dynamodb", "array"
|
*/
```

Trong tập này mình chỉ giới thiệu về các core driver như `file`, `cookie`, `database` và `array`, còn về các package khác thì mình có thể sẽ nói ở các tập sau hoặc bạn có thể tự tìm hiểu chúng.

## 1. Cấu hình (Configuration)
File cấu hình session trong ứng dụng Laravel là `config/session.php`. Dưới đây là một số driver hay sử dụng trong Laravel:
* `file`: các session sẽ được lưu trữ trong file tại thư mục `storage/framework/sessions`. Bạn có thể thay đổi thư mục lưu trữ ở bên dưới:
    ```PHP:config/session.php
    'files' => storage_path('framework/sessions'),
    ```
* `cookie`: session sẽ được lưu trữ trong cookie an toàn, được mã hóa.
* `database`: các session sẽ được lưu trữ trong database.
* `memcached`/ `redis`: session sẽ hoạt động tốt hơn nếu lưu vào các driver này, dựa trên cache.
* `array`: các session sẽ được lưu trữ trong mảng PHP và không được duy trì.

> Mặc định thì Laravel sử dụng driver `file`, nhưng trong thực tế với các ứng dụng lớn thường hay sử dụng các package như `redis` hay `memcached` để tối ưu hiệu năng. Còn đối với driver `array` thường được sử dụng trong quá trình test.

Để chọn driver session cho ứng dụng, bạn chỉ cần thay đổi tại file `.env`.

```.env
SESSION_DRIVER=file
```

Ngoài ra còn có các thiết lập mà bạn cần quan tâm trong session. Chẳng hạn như thiết lập thời gian sống của session thông qua `SESSION_LIFETIME` ở file `.env` (được tính bằng phút).

```
SESSION_LIFETIME=120
```

Bạn có thể thiết lập xóa bỏ các session sau khi trình duyệt kết thúc bằng cách thay đổi giá trị bên dưới thành `true`:

```PHP:config/session.php
'expire_on_close' => false,
```

Nếu bạn muốn tăng tính bảo mật khi lưu trữ các session, đặc biệt với driver `file`, bạn có thể thiết lập giá trị `true` cho cấu hình bên dưới:

```PHP:config/session.php
'encrypt' => false,
```

Với cấu hình này, các session trước khi lưu trữ sẽ được mã hóa.

## 2. Điều kiện tiên quyết của driver (Driver prerequisite)
Có một số driver cần các điều kiện để có thể hoạt động, nhưng ở phần này mình chỉ nói về core driver `database`.

### Database
Khi sử dụng driver `database` cho session, bạn cần phải tạo một table để lưu trữ các session đó. Laravel cung cấp cho chúng ta chuỗi lệnh Artisan để có thể khởi tạo nhanh table `sessions`. 

> php artisan session:table
> 
> php artisan migrate

Do hiện tại chúng ta chưa tìm hiểu về "Database" trong Laravel nên các bạn chỉ cần gõ hai dòng lệnh này thôi, chưa cần phải hiểu quá sâu về nó.

Trước khi thực hiện hai lệnh trên, ta cần phải config database cho ứng dụng. Các bạn mở file `.env` là thiết lập các thông số database.

```.env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=myapp
DB_USERNAME=root
DB_PASSWORD=
```

Sau khi chạy lệnh, kiểm tra database `myapp`, các bạn sẽ thấy có các table bên dưới:

![](https://images.viblo.asia/d1ba4b95-095d-4c16-bd39-629ef991b81a.JPG)

Chắc các bạn rất thắc mắc tại sao lại có thêm 3 table khác ngoài `sessions` phải không? Đừng quá lo lắng, đây chỉ là các table mặc định do Laravel cung cấp khi chạy lệnh, chúng ta sẽ tìm hiểu chúng trong các tập sau. Vậy là chúng ta đã toàn tất điều kiện cho driver `database` rồi đấy.

Nếu như bạn không thích tên table `sessions` mặc định, bạn có thể cấu hình nó tại file `config/session.php` trước khi chạy 2 dòng lệnh trên.

```PHP:config/session.php
'table' => 'sessions',
```

# II. Sử dụng session (Using the session)
Có hai hướng chính để làm việc với session trong Laravel framework:
1. Thông qua lớp khởi tạo `Illuminate\Http\Request`.
2. Sử dụng global helper `session`.

## 1. Lưu trữ dữ liệu (Storing data)
Để lưu trữ một session, bạn có thể cân nhắc lựa chọn method `put` từ object `Illuminate\Http\Request` hoặc sử dụng global helper `session`.

Với method `put` từ object `Illuminate\Http\Request`:

```PHP
$request->session()->put('key', 'value');
```

Với global helper `session`:

```PHP
session(['key' => 'value']);
```

Bạn có thể push một item session vào mảng của nó bằng cách sử dụng dấu `.` để tham chiếu.
trong method `push`:

```PHP
$request->session()->push('user.username', 'lechihuy');
```

hoặc thông qua global helper `session`:

```PHP
session(['user.username' => 'lechihuy']);
```

Bây giờ chúng ta hãy thử kiểm tra xem session có thực sự được lưu trữ hay không?

Hãy thử đăng ký một route để thực hiện store session như bên dưới:

```PHP:routes/web.php
Route::get('/session', function() {
    session(['name' => 'Lê Chí Huy']);
});
```

hoặc 

```PHP:routes/web.php
use Illuminate\Http\Request;

Route::get('/session', function (Request $requets) {
    $request->session()->put('name', 'Lê Chí Huy');
});
```

Nếu bạn đang sử dụng driver `file`, bạn hãy mở các file trong thư mục `storage/framework/sessions`, bạn sẽ tìm ra được session mà bạn vừa lưu trữ.

![](https://images.viblo.asia/7bcb733a-da8f-463b-bbfb-774f9803d124.JPG)

Nếu bạn sử dụng driver `cookie`, các session sẽ được lưu trữ dưới dạng cookie, được mã hóa để người dùng không thể xem hoặc chỉnh sửa.

![](https://images.viblo.asia/ceeaa1b4-991c-40f4-bfdd-46acb060d83b.JPG)

> **Lưu ý:** Bạn có thể tắt chế độ mã hóa session tương tự như một cookie.

Nếu bạn đang sử dụng driver `database`, bạn có thể vào database của mình sau đó truy vấn đến table `sessions`.

![](https://images.viblo.asia/af8b4454-4a6a-4137-aaf0-e961913c2303.JPG)

Như bạn thấy, driver `database` cũng mã hóa các session để tăng tính bảo mật.

Còn nếu bạn sử dụng driver `array` thì như đã nói ở trên, nó không lưu trữ ở bất kỳ đâu cả, các session sẽ biến mất ở request kế tiếp.

## 2. Lấy dữ liệu (Retrieving data)
Cũng như lưu trữ session, ở phần lấy dữ liệu ta cũng có hai cách.

Với cách thông qua lớp khởi tạo `Illuminate\Http\Request`:

```PHP
$request->session()->get('key');
```

Với cách sử dụng global helper `session`:

```PHP
session('key');
```

Nếu session không tồn tại, bạn có thể thiết lập giá trị mặc định cho nó. Bạn có thể truyền giá trị mặc định hoặc một Closure xử lý logic, sau đó trả về giá trị mặc định cần thiết lập.

Với cách thông qua lớp khởi tạo `Illuminate\Http\Request`:

```PHP
$request->session()->get('key', 'default');

$request->session()->get('key', function() {
    return 'default';
});
```

Với cách sử dụng global helper `session`:

```PHP
session('key', 'default');

session('key', function() {
    return 'default';
});
```

### a. Lấy tất cả dữ liệu session (Retrieving all session data)
Với lớp `Illuminate\Http\Request` cho phép chúng ta lấy toàn bộ session được lưu trữ thông qua method `all`.

```PHP
$request->session()->all();
```

### b. Kiểm tra một session có tồn tại (Checking if a session exist)
Để kiểm tra sự tồn tại của một session, ta có thể sử dụng method `has` có trong lớp khởi tạo `Illuminate\Http\Request`. Method `has` sẽ trả về `true` nếu session tồn tại và có giá trị không phải là `null`.

Chẳng hạn mình đăng ký route sau:

```PHP:routes/web.php
use Illuminate\Http\Request;

Route::get('/session', function(Request $request) {
    dd($request->session()->has('foo'));
});
```

Do chúng ta chưa lưu trữ session nào có key là `foo` cả, nên kết quả sẽ là `false`.

Giờ các bạn thử lưu trữ session `foo` này nhưng với giá trị là `null` xem sao.

```PHP:routes/web.php
use Illuminate\Http\Request;

Route::get('/session', function(Request $request) {
    $request->session()->put('foo', null);
    
    dd($request->session()->has('foo'));
});
```

Vâng, kết quả thu được vẫn sẽ là `false`.

Nếu bạn chỉ muốn kiểm tra xem session có tồn tại hay không, dù có giá trị `null` vẫn chấp nhận thì bạn có thể sử dụng method `exists` thay cho `has`.

```PHP:routes/web.php
use Illuminate\Http\Request;

Route::get('/session', function(Request $request) {
    $request->session()->put('foo', null);
    
    dd($request->session()->exists('foo'));
});
```

Lúc này kết quả ta nhận được sẽ là `true`.

### c. Lấy và xóa một mục (Retrieving and deleting an item)
Một số session sau khi lấy xong thì không cần dùng đến nữa, có một method thực hiện chuỗi công việc này. Method `pull` sau khi trả về giá trị của session thì sẽ xóa nó đi.

```PHP
$value = $request->session()->pull('key', 'default');
```

## 3. Flash data
Chắc các bạn đã nghe về flash session data ở trong các tập trước rồi, nên mình sẽ không nói lại nữa. Nếu bạn muốn lưu trữ một số session chỉ trong request kế tiếp, bạn có thể sử dụng method `flash`.

```PHP
$request->session()->flash('status', 'message');
```

Nếu bạn muốn flash data một lần nữa, bạn có thể sử dụng method `reflash` để kéo dài "tuổi thọ" cho các flash data.

```PHP
$request->session()->reflash();
```

Nếu muốn chỉ đích danh flash data cần giữ lại, bạn có thể sử dụng method `keep` và truyền tham số là key flash session mà bạn muốn flash một lần nữa.

```PHP
$request->session()->keep('key');

$request->session()->keep(['foo', 'bar']);
```

## 4. Xóa dữ liệu (Deleteing data)
Method `forget` sẽ giúp chúng ta dễ dàng xóa bỏ một session.

```PHP
$request->session()->forget('key');

$request->session()->forget(['foo', 'bar']);
```

Nếu bạn muốn xóa tất cả các session thì có thể sử dụng method `flush`.

```PHP
$request->session()->flush();
```

## 5. Khởi tạo lại session ID (Regenerating the session ID)
Việc tạo lại session ID sẽ ngăn chặn người dùng tấn công ứng dụng với session fixation. Đây là một hình thức tấn công đơn giản nhưng lại vô cùng hiệu quả. Nó dựa vào việc server không thay đổi session ID sau khi đăng nhập vào hệ thống. Tin tặc sẽ lợi dụng điều này để thông qua session ID người dùng đánh cắp thông tin.

Dễ hiểu như thế này, một website http://unsafe.com chấp nhận các session ID từ request. Hacker sẽ gửi đường dẫn http://unsafe.com?SID=1, với `SID=1` chính là session ID mà server đã cung cấp cho trình duyệt của hắn. Sau khi người dùng bị lừa và đăng nhập vào hệ thống thông qua link http://unsafe.com?SID=1 thì hacker có thể đăng nhập gián tiếp tài khoản người dùng, từ đó thực hiện khai thác thông tin, dữ liệu.

Chính vì thế, Laralve sẽ tự động tạo lại session ID nếu ứng dụng của bạn sử dụng `LoginController` mặc định. Nếu như bạn cần tạo lại session ID thủ công, bạn có thể sự dụng method `regenerate`.

```PHP
$request->session()->regenerate();
```

# III. Thêm session driver tùy chỉnh (Adding custom session driver)
Theo mình nghĩ vấn đề này thực sự không cần thiết vì ngoài các core driver ra thì Laravel đã tích hợp sẵn các package khá phổ biến rồi. Nhưng nếu bạn nào muốn tìm hiểu sâu hơn, hoặc muốn tự xây dựng một custom session driver cho ứng dụng thì có thể tham khảo tại [đây](https://laravel.com/docs/5.8/session#adding-custom-session-drivers).

----

Cảm ơn các bạn đã quan tâm theo dõi. Cùng đồng hành với mình qua những tập tiếp theo tại series "[Hành trình chinh phục Laravel Framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" nhé! Chúc may mắn và hẹn gặp lại.

> Mình đang xây dựng blog riêng là [lechihuy.dev ](https://lechihuy.dev), mong các bạn ghé sang ủng hộ, mình cảm ơn rất nhiều ạ