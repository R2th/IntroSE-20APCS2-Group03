# Lời nói đầu
![](https://images.viblo.asia/55b95151-85ab-42de-8b9a-9d7fd9e8bf55.jpg)

Trong đời sống thực chúng ta có rất nhiều ví dụ về hàng đợi, chẳng hạn như hàng xe ô tô trên đường một chiều (đặc biệt là khi tắc xe), trong đó xe nào vào đầu tiên sẽ thoát ra đầu tiên. Một vài ví dụ khác là xếp hàng học sinh, xếp hàng mua vé, …
![](https://images.viblo.asia/d6e8992f-d1ae-44bc-b0a7-e3a1cad4daf2.jpg)

Tuy nhiên khi chúng ta xếp hàng để chờ nhận người yêu trong một sự kiện "phát người yêu miễn phí tại phố đi bộ chẳng hạn", chúng ta cứ "đợi, đợi và đợi" và chẳng biết bao giờ đến lượt.
> Hàng đợi (Queue) là một cấu trúc dữ liệu trừu tượng, là một cái gì đó tương tự như hàng đợi trong đời sống hàng ngày (xếp hàng).

# Laravel queue là gì?
Mình sử dụng laravel queue cho khá nhiều dự án. không chỉ vì queue cho phép dự án trì hoãn một công việc mất nhiều thời gian đến một thời điểm nào nó mới xử lý, mà nó còn giúp cho việc thực thi các công việc theo ý của mình. Những công việc mình cần dùng queue như:
* Gửi mail: xác minh tài khoản, reset password, chúc mừng tham gia hệ thống,...
* Hay cụ thể hơn thì muốn các công việc thực hiện tuần tự: Đăng ký tài khoản xong để thông tin lưu trong DB thành công, "delay" một khoảng thời gian mới cho người dùng xác nhận chẳng hạn,...
* ...

Muốn thêm job vào queue thì job phải implements interface Illuminate\Contracts\Queue\ShouldQueue.
```php
<?php
namespace App\Notifications\Mail\Account;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
class VerifyEmail extends Notification implements ShouldQueue
{
    use Queueable;
    /**
     * @var string
     */
    protected $token;
    /**
     * Create a new notification instance.
     *
     * @param string $token
     */
    public function __construct($token)
    {
        $this->token = $token;
    }
    /**
     * Get the notification's delivery channels.
     *
     * @return array
     */
    public function via()
    {
        return ['mail'];
    }
    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $confirmationUrl = url("/account/activation/{$this->token}");
        return (new MailMessage)
            ->subject('Confirm your Viblo account')
            ->greeting("Hello {$notifiable->name}!")
            ->line('You are just one step away from creating your account on Viblo. Click on the button below to confirm your email address and get started.')
            ->action('Confirm E-Mail Address', $confirmationUrl);
    }
}
```
Bây giờ thì chúng ta có thể đưa job vào queue một cách dễ dàng và theo ý muốn của chúng ta
```php
<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\Registration;
use App\Http\Requests\User\ResendEmailRegister;
use App\Notifications\Mail\Account\VerifyEmail;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Exception;

class RegistrationController extends Controller
{
    /**
     * Creates new RegistrationController instance.
     */
    public function __construct()
    {
        $this->middleware(['api', 'guest']);
    }

    /**
     * Registers new user account.
     *
     * @param  \App\Http\Requests\User\Registration $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Registration $request)
    {
        $credentials = $request->validated();

        array_set(
            $credentials,
            'password',
            bcrypt(array_get($credentials, 'password'))
        );

        DB::beginTransaction();

        try {
            $user = User::create($credentials);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            return $this->responseBadRequest(['message' => 'These credentials do not match our records.']);
        }

        $this->sendEmailActive($user);

        return $this->responseCreated(['message' => 'Your account has been registered successfully. Please activate your via email first.']);
    }

    public function resendActive(ResendEmailRegister $request)
    {
        try {
            $user = User::where('email', $request->email)->first();
            if($user->isVerified()) {
                return $this->responseForbidden(['message' => 'Your account has been activated!']);
            }

            $this->sendEmailActive($user);
        } catch (Exception $e) {
            return $this->responseBadRequest(['message' => $e->getMessage()]);
        }

        return $this->responseOk(['message' => 'Resend activation email successfully, please activate your via email.']);
    }

    private function sendEmailActive(User $user)
    {
        return $user->notify(new VerifyEmail($user->generateToken($user->getAttribute('email'))));
    }
}

```
Sau khi user đăng ký thành công, chúng ta muốn sau 10 phút hệ thống mới gửi mail cho người dùng thì phải làm sao =))
Chỉ cần trỏ đến hàm delay và chỉ việc ngồi "đợi" thôi nhé (cuoituthien)
```php
private function sendEmailActive(User $user)
    {
        return $user->notify(new VerifyEmail($user->generateToken($user->getAttribute('email')))->delay(now()->addMinutes(10)));
    }
```
Đừng quên chạy job background để thực thi queue:
```bash
nohup php artisan queue:listen --tries=5
```
* --tries=3: Số lần thử thực hiện job 
* --timeout=60: Thiết lập thời gian timeout của job trong queue
* --sleep=5: Các job trong hàng đợi được xử lý liên tục mà không có sự dừng lại nào, tùy chọn sleep sẽ xác định worker dừng lại sau bao lâu trước khi tiếp tục xử lý job tiếp 

Cài đặt supervisor nếu bạn đang sử dụng ubuntu:
```bash
sudo apt-get install supervisor
```

Supervisor có file cấu hình nằm trong thư mục /etc/supervisor/conf.d, trong này bạn có thể tạo nhiều file để bắt supervisor giám sát các xử lý. Ví dụ tạo file laravel–worker.conf để giám sát cho queue:worker với nội dung:

```bash
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command=php artisan queue:work queue:work --sleep=3 --tries=3 --daemon
autostart=true
autorestart=true
user=forge
numprocs=8
redirect_stderr=true
stdout_logfile=/home/worker.log
```

```bash
$supervisorctl reread
$supervisorctl update
$supervisorctl start laravel-worker:*
```

Có đôi lúc đăng nhập lên server rất nhiều bạn gặp phải trường hợp không có quyền tạo file.conf. Lúc này, các bạn vào thẳng file supervisord.conf và thêm thông tin như trên vào.

Có khá nhiều drivers để lựa chọn khi sử dụng queue, một số driver phổ biến: database, Redis,...
```php
php artisan migrate
Migrating: 2018_11_13_092441_create_jobs_table
Migrated:  2018_11_13_092441_create_jobs_table
Migrating: 2018_11_13_093058_create_failed_jobs_table
Migrated:  2018_11_13_093058_create_failed_jobs_table
```

Mỗi job chạy lỗi job sẽ được đẩy vào bảng failed_jobs và supervisor sẽ giúp chạy lại các jobs failed đó. Vì vậy khi sử dụng laravel queue nhớ migrate đủ cả hai bảng jobs và failed_jobs.

# Tạm kết
Theo cá nhân mình thì trong dự án, laravel queue là một sự lựa chọn hữu ích cho những công việc có nhiều xử lý cùng lúc hay xử lý song song. Hy vọng bài viết này sẽ phần nào giúp ích cho các bạn đang muốn sử dụng queue. Rất mong nhận được ý kiến đóng góp của mọi người.