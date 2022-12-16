Trong tình trạng bùng nổ internet như hiện nay, cùng với việc ra đời của rất nhiều công nghệ thì các trang web hay các app ra đời ngày càng nhiều. Đặc biệt là xu thế kinh doanh online, các shop đang dần chuyển mình qua kinh doanh online dẫn đến hình thành nhiều trang web bán hàng.
    Nếu bạn đang nhận code cho một trong các trang web đó và đang cần chức năng gửi **email xác nhận** đến cho người dùng thì mình xin phép giới thiệu với bạn cách gửi email đơn giản trong laravel như sau.

## 1. Cài đặt tài khoản gửi email . 
OK giờ mình sẽ thiết lập tài khoản gmail để có thể gửi email đi từ tài khoản này nhé.
Đầu tiên, truy cập vào Quản lý tài khoản -> Bảo mật (1) -> Xác minh hai bước (2) (Do ở đây mình bật rồi nên nó xanh nhé, các bạn chỉ cần làm theo hướng dẫn tiếp theo sẽ ổn thôi)
->Mật khẩu ứng dụng (3)
![](https://images.viblo.asia/7c7676f0-b250-47f1-8dac-de4516240991.png)
Tiếp theo mình sẽ tạo một ứng dụng để gửi email.
Chọn ứng dụng  : thư
Thiết bị thì có thể tùy bạn nhé 
![](https://images.viblo.asia/b42a70d0-a907-4271-94ee-fcb8d14da0d9.png)
Cuối cùng nhấn Tạo là xong.
À nhớ lưu lại mật khẩu ở cái ô màu vàng nhé!!
![](https://images.viblo.asia/99a6a8fa-acd1-4730-86cd-01a4ad21c661.png)

## 2.  Setup file .env
Tiếp theo truy cập vào project của bạn, đến file .env và chỉnh sửa phẩn MAIL nhé 
![](https://images.viblo.asia/a3ffae2c-27b6-4a20-88e2-8063b5e2cb71.png)

phần MAIL_PASSWORD chính là cái ô màu vàng phía trên đấy các bạn !!
## 3.  Tạo font email
OK bây giờ mình sẽ tạo phần nội dung trong email sẽ gửi đi nhé.
vào resources -> views và tạo file mail.blade.php 
![](https://images.viblo.asia/efb1a009-983c-4b85-bf17-60df29cc017a.png)
Đại khái nó sẽ gửi 1 cái link qua cho người dùng, nếu người dùng click vào nó thì hệ thống sẽ xác nhận tài khoản đấy có hoạt động.
## 4.  Gửi email thôi nào
Chuẩn bị xong rồi !! Giờ mình sẽ xử lý phần gửi email nhé. Các bạn chạy lệnh này để tạo file tạo email nhé :
`php artisan make:mail UserActivationEmail`
Đây là file UserActivationEmail của mình.
![](https://images.viblo.asia/0a9bfe20-4a3f-42f8-989b-ff29ca2efb24.png)
Ở đây mình chỉ gửi token qua để xác nhận.

À quên mất !! mình chưa thêm bến để xác định xem acount đấy được active chưa
Tạo file migration để thêm trường is_actived cho user nhé.

`php artisan make:migration add_active_to_users --table=users`

Thêm trường is_actived 

`Schema::table('users', function (Blueprint $table) {
        $table->boolean('is_actived')->default(false);
    });`
    
 Tiếp tục nào , Bây giờ mình sẽ tạo token bằng chính email của người dùng
 
 `$email = $request['email'];
   $token = Hash::make($email);
 `
như vậy thì bạn có thể có được token nhanh mà vẫn đảm bảo tính bảo mật.

Tiếp theo trong phần đăng ký mình sẽ gửi token này vào email. Mình sẽ dùng `Illuminate\Support\Facades\Mail` của laravel 

`Mail::to($email)
        ->send(new \App\Mail\UserActivationEmail($token));`
        
  Như vậy mình đã gửi mail chứa link kèm theo token qua cho người dùng.

  Tiếp theo mình sẽ tạo một router để active người dùng 
  `Route::get('/users/vertify/{token}',[UserController::class,'verify']);`
  Tạo function verify trong UserController :
  ![](https://images.viblo.asia/2a9f12d0-c633-4226-a23f-892443125b48.png)
  OK vậy là mình đã xử lý xong phần gửi verify email và xác nhận tài khoản nhé !!

###        Chúc các bạn thành công !!