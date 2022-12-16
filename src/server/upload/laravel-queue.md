# 1. Đặt vấn đề

Giả sử bạn tạo ra một website, website của bạn có nhiều người vào xem và có thể đăng ký tài khoản, người đó đang ở trang đăng ký và nhập các thông tin vào form đăng ký. Khi đó chúng ta muốn thực hiện các công việc sau:
* Kiểm tra thông tin nhập và lưu vào CSDL.
* Gửi một email Chào mừng đến thành viên mới này.
* Trả về trang Thankyou.

Sau khi kiểm tra và lưu thông tin vào CSDL, tiếp tục đến phần việc gửi email do mã PHP thực hiện tuần tự từ trên xuống. Người dùng sẽ thấy trang Thankyou nếu email đã được gửi đi, quá trình gửi email có thể mất thời gian, người dùng phải đợi chờ việc này, vậy tại sao phải bắt người dùng chờ? Laravel Queue sẽ là giải pháp cho tình huống này.

# 2. Laravel Queue

* Một hàng đợi (queue) là một danh sách những việc cần làm (job) được quản lý theo thứ tự.
* Khi chúng ta muốn thêm một công việc (job) vào hàng đợi, job phải implement interface **Illuminate\Contracts\Queue\ShouldQueue**.

* Laravel Queue driver được sử dụng để quản lý các job như thêm job vào hàng đợi, lấy job ra khỏi hàng đợi. Laravel có thể làm việc với nhiều các driver khác nhau như database, Redis, Amazon SQS… và bạn có thể tự tạo riêng một driver nếu muốn. 

Trong bài viết này, chúng ta sẽ lưu trữ các job trong database, để thực hiện việc này, thực hiện các câu lệnh artisan để tạo ra các bảng lưu trữ trong database như sau:
```
php artisan queue:table
php artisan queue:failed-table
```

Các câu lệnh này sẽ tạo ra bảng jobs và failed_jobs trong cơ sở dữ liệu. Ngoài ra, cần phải thiết lập
> QUEUE_DRIVER=database

trong file cấu hình biến môi trường .env ở thư mục gốc project.

Mặc định, các job được lưu trong app\Jobs, nếu thư mục app\Jobs không có trong project bạn cũng đừng lo, câu lệnh tạo job sẽ tự động tạo ra thư mục này nếu chưa có. Thực hiện tạo một job mới bằng câu lệnh:
```
php artisan make:job SendWelcomeEmail
```
Nó sẽ tự động sinh ra job SendWelcomeEmail được implement interface Illuminate\Contracts\Queue\ShouldQueue. Class này chứa phương thức handle() sẽ được gọi đến khi job được xử lý trong hàng đợi. Chúng ta hãy xem khung của một job:
```php
<?php

namespace App\Jobs;

use App\User;
use App\AudioProcessor;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendWelcome Email implements ShouldQueue
{
    use InteractsWithQueue, Queueable, SerializesModels;

    protected $user;

    /**
     * Create a new job instance.
     *
     * @param  User  $user
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Execute the job.
     *
     * @param  AudioProcessor  $processor
     * @return void
     */
    public function handle(AudioProcessor $processor)
    {
        // Process uploaded user...
    }
}
```
Trong ví dụ trên chúng ta truyền một **Eloquent Model User** vào phương thức contruct của job. Để thêm job vào một queue, sử dụng phương thức **dispatch()**: trong controller **RegisterController**
```php
<?php
namespace App\Http\Controllers\Auth;
use App\User;
use App\Http\Controllers\Controller;****
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use App\Jobs\SendWelcomeEmail;
class RegisterController extends Controller
{
    ...
    protected function create(array $data)
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
        $job = (new SendWelcomeEmail($user))->delay(Carbon::now()->addMinutes(10));
        dispatch($job);
        return $user;
    }
}
```
Phương thức **delay()** sẽ dừng lại trước khi thực hiện job trong queue. Nó sẽ delay thêm 10 phút

# 3. Thực thi các jobs trong queue

## 3.1 Số lần thử thực hiện job

Mặc định job sẽ được thực hiện 1 lần, nếu lỗi sẽ được bỏ qua, để thiết lập số lần thử thực hiện lại một job chúng ta có hai cách: hoặc sử dụng câu lệnh artisan cho tất cả các job
```
php artisan queue:work --tries=3
```
hoặc đưa vào thuộc tính `$`tries của từng job
```php
<?php
namespace App\Jobs;

class SendWelcome implements ShouldQueue
{
    /**
     * Số lần job sẽ thử thực hiện lại
     *
     * @var int
     */
    public $tries = 3;
}
```
## 3.2 Thiết lập thời gian timeout của job trong queue

Bạn có thể thiết lập thời gian timeout của các job bằng cách sử dụng câu lệnh artisan
```
php artisan queue:work --timeout=60
```
hoặc thiết lập trong thuộc tính $timeout của từng job
```php
<?php
namespace App\Jobs;

class SendWelcome implements ShouldQueue
{
    /**
     * Số giây job có thể chạy trước khi timeout
     *
     * @var int
     */
    public $timeout = 60;
}
```
## 3.3 Queue worker, thực thi các job trong queue

Laravel có một queue worker để thực thi các job đang có trong hàng đợi, bạn có thể chạy worker này bằng câu lệnh artisan:
```
php artisan queue:work
```
Chú ý, câu lệnh này khi đã thực hiện sẽ chạy cho đến khi đóng cửa sổ dòng lệnh hoặc dừng nó bằng một câu lệnh. Queue worker là các tiến trình có thời gian sống dài do đó nó sẽ không cập nhật code khi có thay đổi, khi bạn thay đổi code chương trình, bạn cần khởi động lại queue worker bằng câu lệnh
```
php artisan queue:restart
```
Thiết lập thời gian nghỉ giữa các lần xử lý job
Các job trong hàng đợi được xử lý liên tục mà không có sự dừng lại nào, tùy chọn sleep sẽ xác định worker dừng lại sau bao lâu trước khi tiếp tục xử lý job tiếp theo:
```
php artisan queue:work --sleep=3
```
# 4. Source Code

Để thấy được sự khác biệt giữa gửi mail thông thường với gửi mail sử dụng laravel queue, tôi đã cài đặt project demo bên dưới, các bạn có thể clone.
https://github.com/quanghv96/laravel-queue-demo

# 5. Tài liệu tham khảo

Laravel queue doc: https://laravel.com/docs/5.7/queues