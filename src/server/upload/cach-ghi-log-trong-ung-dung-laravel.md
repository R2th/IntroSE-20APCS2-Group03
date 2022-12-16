![](https://images.viblo.asia/597f39e0-de27-4941-9361-7188e0bcc02f.png)
Xin chào các bạn!
Hôm nay mình sẽ cùng các bạn chia sẽ về 1 việc ghi và tạo ra file log trong laravel nhé.
Ghi Log là một phần quan trọng của phát triển ứng dụng, việc ghi log không những cho chúng ta dễ dàng hơn trong việc debug mà có thể giúp chúng ta ghi lại những lịch sử mong muốn theo nhu cầu của dự án.
Mình lấy 1 ví dụ đơn giản như việc thanh toán trên Line-Pay, thay vì việc phải lưu lại kết quả confirm của việc thanh toán trong db thì các bạn có thể lưu vào file Log để khách hàng có thể check được thông tin của các transaction, và bạn có thể lưu các file log đó theo ngày hoặc trong 1 thời gian cố định hoặc mãi mãi, cứ nghĩ mà xem nếu db của chúng ta lưu lại các transaction mỗi ngày với hàng nghìn user thì chẳng mấy mà db ngập lụt nếu như ban đầu bạn ko ko setting dung lượng trên db đủ lớn, còn việc query để lấy được dữ liệu để show ra nữa..vv
##  Cấu hình
### 1.1 Bật tắt chế độ ghi log lỗi
Tùy chọn debug trong config/app.php xác định thông tin lỗi có được hiển thị cho người dùng hay không. Mặc định, tùy chọn này lấy giá trị biến môi trường APP_DEBUG trong file .env. Với phát triển cục bộ, bạn nên thiết lập biến môi trường APP_DEBUG là true, khi đưa mã nguồn lên máy chủ nên để giá trị này là false.
### 1.2 Thiết lập lưu trữ log
Laravel hỗ trợ ghi thông tin log vào các file đơn lẻ, file log theo ngày hoặc syslog và errorlog. Để cấu hình cơ chế Laravel sử dụng để lưu trữ log, bạn thay đổi tùy chọn log trong config/app.php. Ví dụ, nếu bạn muốn sử dụng cách ghi log ra file theo ngày thay cho một file riêng lẻ thì bạn thiết lập giá trị log trong app.php thành daily:
```
'log' => 'daily'
```
Khi sử dụng chế độ daily, Laravel chỉ giữ lại 5 file log của 5 ngày gần nhất, nếu bạn muốn điều chỉnh số lượng file log được lưu trữ lại, bạn có thể thay đổi giá trị log_max_files trong app.php:
```
'log_max_files' => 30
```
### 1.3 Thiết lập cấp độ lỗi cần ghi log
Khi sử dụng Monolog, các message log có rất nhiều cấp độ với độ nghiêm trọng khác nhau. Mặc định, Laravel ghi tất cả các cấp độ log, tuy nhiên, trong môi trường ứng dụng chạy thực tế, bạn nên thiết lập chỉ ghi log với các cấp độ nghiêm trọng cần thiết thông qua giá trị log_level trong file app.php.
Khi tùy chọn này được cấu hình, Laravel sẽ ghi log tất cả các cấp độ nghiêm trọng hơn hoặc bằng với cấp độ được cấu hình. Ví dụ, mặc định giá trị log_level có giá trị là error do đó Laravel sẽ ghi log các cấp độ là error, critical, alert và emergency:
```
'log_level' => env('APP_LOG_LEVEL', 'error'),
```
### 1.4 Thiết lập cấu hình Monolog riêng
Nếu bạn muốn hoàn toàn kiểm soát cách Monolog được cấu hình trong ứng dụng của bạn, bạn có thể sử dụng phương thức configureMonologUsing và thực hiện gọi đến phương thức này trong file bootstrap/app.php trước khi trả về biến $app:
```
$app->configureMonologUsing(function ($monolog) {
    $monolog->pushHandler(...);
});

return $app;
```
## Quản lý Exception
### 2.1 Phương thức report
Tất cả các exception được quản lý bởi class app\Exceptions\Handler, class này chứa hai phương thức là report và render. Phương thức report được sử dụng để log exception và gửi chúng đến các dịch vụ ngoài như Bugsnag hoặc Sentry. Mặc định, phương thức report chỉ đơn giản truyền exception đến class nơi exception xảy ra. Ví dụ, nếu bạn cần báo cáo các dạng khác nhau của exception theo cách khác, bạn có thể sử dụng toán tử so sánh của PHP là instanceof:
```
/**
 * Report or log an exception.
 *
 * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
 *
 * @param  \Exception  $exception
 * @return void
 */
public function report(Exception $exception)
{
    if ($exception instanceof CustomException) {
        //
    }

    return parent::report($exception);
}
```

### 2.2 Phương thức render
Phương thức này được sử dụng cho mục đích điều hướng, với mỗi exception cụ thể bạn muốn điều hướng người dùng đến một trang HTTP. Mặc định, exception được truyền đến base class nơi sinh ra response, tuy nhiên bạn hoàn toàn có thể kiểm tra dạng exception và trả về một response tùy ý:
```
/**
 * Render an exception into an HTTP response.
 *
 * @param  \Illuminate\Http\Request  $request
 * @param  \Exception  $exception
 * @return \Illuminate\Http\Response
 */
public function render($request, Exception $exception)
{
    if ($exception instanceof CustomException) {
        return response()->view('errors.custom', [], 500);
    }

    return parent::render($request, $exception);
}
```

## HTTP Exception
Một số các exception tương ứng với một mã lỗi HTTP, ví dụ như lỗi "Trang không tìm thấy" tương ứng với mã lỗi 404 hay lỗi "Không được cấp quyền truy nhập" tương ứng với 401... Trong ứng dụng, phương thức abort giúp bạn tạo ra các exception này:

```
abort(404);
```
Helper abort sẽ ngay lập tức bung ra một exception, phương thức này cũng nhận một chuỗi text để hiển thị cho mã lỗi tương ứng.
```
abort(403, 'Unauthorized action.');
```
### Tạo ra view riêng cho mã lỗi HTTP
Laravel cho phép tạo ra các trang thông báo lỗi riêng tương ứng với các mã lỗi. Ví dụ, nếu bạn muốn cá nhân hóa trang báo lỗi 404 "Không tìm thấy trang web" bạn có thể tạo view resources/views/errors/404.blade.php. View này sẽ được sử dụng khi lỗi 404 phát sinh trong ứng dụng. Các view trong thư mục này cần được đặt tên tương ứng với mã lỗi HTTP. Một instance của HttpException sẽ được truyền đến view trong biến $exception khi hàm abort được gọi đến.
```
<h1>{{ $exception->getMessage() }}</h1>
```
## Ghi log
Laravel có một abstraction layer bao phủ thư viện Monolog, mặc định một file log được lưu trong thư mục storage/logs. Bạn hoàn toàn có thể ghi log vào đây sử dụng facade Log:
```
<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return Response
     */
    public function showProfile($id)
    {
        Log::info('Showing user profile for user: '.$id);

        return view('user.profile', ['user' => User::findOrFail($id)]);
    }
}
```
Các nhật ký lỗi được ghi nhận với 8 cấp độ khác nhau theo tiêu chuẩn RFC 5424: emergency, alert, critical, error, warning, notice, info và debug.
```
Log::emergency($message);
Log::alert($message);
Log::critical($message);
Log::error($message);
Log::warning($message);
Log::notice($message);
Log::info($message);
Log::debug($message);
```
Trong quá trình ghi log, bạn muốn ghi thêm các thông tin khác để tăng cường thông tin ngữ cảnh của lỗi, các phương thức của facade Log ở trên đều có tham số thứ hai là một mảng thông tin. Ví dụ:
```
Log::info('Create post fail.', ['id' => $post->id, 'user_id' => $user->id]);
```
Facade Log là một lớp trìu tượng bao phủ Monolog, nếu bạn muốn đối tượng từ Monolog, sử dụng phương thức getMonolog(ếu
```
$monolog = Log::getMonolog();
```
## Tự tạo file Log Riêng
Đôi lúc bạn muốn tự tạo 1 file log riêng để phục cho 1 nhu cầu nào đó của dự án, thì chúng ta sẽ làm như sau:
các bạn vào config/logging.php và khai báo như đoạn code bên dưới :
```
'post_history' => [
            'driver' => 'daily',
            'path' => storage_path('logs/post_history.log'),
            'level' => 'debug',
            'days' => 0,
            'permission' => 777,
        ],
```
và sau đó chỉ cần ghi những thông tin bạn mong muốn vào function cần xử lý ví dụ :
```
public function ceaterPost(Request $request)
    {
        $data = $request->all();
        $newPost = Post::create($data);
        if(!newPost) {
            Log::channel('post_history')->info($this->getDataLog($request, $ddat); 
        }
        return response('success', 200);
    }
```
Trong trường hợp xảy ra lỗi thì trong file log sẽ sinh ra 1 file post_history.log và chứa trong tin của $data.
## Tổng Kết
OK. Bài viết mình dừng ở đây nhé, chúc các bạn thành công.
Mong là với 1 chút chia sẽ nhỏ này của mình có thể giúp các bạn đang có ý định tạo ghi và tạo file log riêng trong dự án laravel tham khảo