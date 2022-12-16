Chào các bạn, như chúng ta biết thì gửi email là một công việc tốn thời gian và đôi khi người dùng sẽ phải đợi chờ send mail rất khó chịu. Vì vậy, laravel queues cho phép bạn trì hoãn một nhiệm vụ tốn thời gian cho đến một thời gian sau. 

Bằng cách trì hoãn nhiệm vụ tốn thời gian, bạn có thể cải thiện đáng kể hiệu năng của ứng dụng Laravel.

Mình cùng bắt đầu nhé!
## 1. Giới thiệu Laravel Queues
Queues Laravel cung cấp tích hợp nhiều loại hàng đợi khác nhau như Beanstalkd, Amazon SQS, Redis, đồng bộ (đồng bộ hóa) và cơ sở dữ liệu. Bạn có thể tìm thấy các cấu hình hàng đợi trong file config/queue.php. Trong file này, bạn có thể xác định cấu hình của kết nối cho từng trình điều khiển queues. Bạn có thể kiểm tra tài liệu chính thức trên trang chủ laravel để biết thêm chi tiết.
## 2. Yêu cầu
Để bắt đầu, bạn cần tạo 1 project laravel mới bằng lệnh bên dưới trong terminal.
```

composer create-project laravel/laravel laravel_queues
```
Như vậy bạn sẽ có 1 project laravel_queues
## 3.  Database Setup for Laravel Queues

Trong bài viết này, mình sẽ sử dụng queues là database để lưu và xử lý queues, nhưng bạn có thể sử dụng Amazon SQS hoặc Redis nếu bạn đã có thiết lập đó. 

Trước khi sử dụng Queues Laravel, chúng ta cần tạo một jobs bảng trong cơ sở dữ liệu để lưu trữ tất cả các hàng đợi. Laravel cung cấp lệnh tạo bảng bằng migrate, bạn hãy mở terminal lên và chạy lệnh dưới đây:
```

php artisan queue:table
```
Lệnh này sẽ tạo một tệp di chuyển trong thư mục `database/migrations`. File mới được tạo sẽ chứa cấu trúc bảng jobs mà chúng ta cần xử lý queues.
```

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('queue')->index();
            $table->longText('payload');
            $table->unsignedTinyInteger('attempts');
            $table->unsignedInteger('reserved_at')->nullable();
            $table->unsignedInteger('available_at');
            $table->unsignedInteger('created_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jobs');
    }
}
```
    
Ok, để migrate cấu trúc bảng trên, mình sẽ chạy lệnh:
```

php artisan migrate
```
Kiểm tra trong database của bạn đã có thêm 1 bảng jobs, như thế là thành công rồi.

Để thay đổi xử lý queue thành database, Bạn hãy mở file .env và thay đổi QUEUE_DRIVER vào database như dưới đây.
```

QUEUE_DRIVER=database
```
Như vậy mình đã setup xong cơ bản việc thiết lập DB và cấu hình rồi, tiếp theo mình sẽ tạo send mail và template để gửi mail nhé.
## 4. Tạo mail class
Tiếp theo, chúng ta cần tạo một mail để gửi message đơn giản. Bạn hãy chạy lệnh sau để tạo mail mới:
```

php artisan make:mail WelcomeEmail
```
Khi lệnh trên được chạy xong, một thư mục mới có tên Mail cùng với tệp lớp WelcomeEmail sẽ được tạo trong thư mục ứng dụng.

```

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class WelcomeEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.welcome');
    }
}
```
     
Tiếp theo, mình sẽ cập nhật hàm build() để trả về template mail mail.welcome.

## 5. Tạo template mail
Bạn hãy tạo 1 file welcome.blade.php trong thư mục mail như sau.

```

&lt;h1&gt;Welcome To Our App&lt;/h1&gt;
&lt;p&gt;You are welcome to our platform.&lt;/p&gt;
```
OK, như vậy việc tạo template đã xong, giờ tiếp tục mình sẽ tạo 1 queue để thực hiện send mail này.

## 6. Tạo Queue Job
Để tạo queue, Laravel đã cung cấp sẵn 1 lệnh là.
```

php artisan make:job SendWelcomeEmail
```
Khi bạn chạy xon lệnh trên, 1 folder mới với tên là Jobs sẽ được tạo ra trong folder app và có 1 file class là SendWelcomeEmail.
```

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class SendWelcomeEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        //
    }
}
```
    
Bây giờ, mình sẽ cập nhật class để gửi email. Đầu tiên chúng ta cần thêm các không gian tên Mail và SendWelcomeEmail trong đó.
```

use Mail;
use App\Mail\WelcomeEmail;
```

Tiếp theo, chúng ta cần thiết lập quy trình gửi email bên trong hàm handle().
```

/**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $email = new WelcomeEmail();
        Mail::to('info@larashout.com')->send($email);
    }
```
    
Trong chức năng handle, mình đã khởi tạo class WelcomeEmail để gửi email.
Tiếp theo, mình sẽ tạo ra một route và controller mới để test job này. Khi mình vào route đó, một job mới sẽ được tạo trong bản jobs và sẽ được xử lý vào thời gian của mình chỉ định.

## 7. Setup Route
Để test, mình thêm route mới trong file routes/web.php.
```

Route::get('test-email', 'JobController@processQueue');
```

## 8. Create Controller
Bây giờ, chúng ta sẽ tạo một bộ điều khiển mới có tên là JobContoder , nó sẽ có một hàm processQueue để gửi queue. Chạy bên dưới lệnh artisan để controller này.
```

php artisan make:controller JobController
```

Bây giờ mình sẽ cập nhật JobContoder code bên dưới để xử lý queue.

```
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Jobs\SendWelcomeEmail;

class JobController extends Controller
{
    /**
     * Handle Queue Process
     */
    public function processQueue()
    {
        $emailJob = new SendWelcomeEmail();
        dispatch($emailJob);
    }
}
```
      
    
Bây giờ nếu bạn truy cập /test-email, một jobs mới sẽ được thêm vào bảng jobs.

## 9. Chạy Queue Worker
Điều cuối cùng để xử lý queue này, bạn phải chạy lệnh sau để queue có thể lắng nghe.
```

php artisan queue:work
```
Khi đó job của bạn sẽ được xử lý, bạn sẽ có thể thấy trạng thái sẽ thay đổi từ xử lý sang xử lý với tên công việc.

**Chú thích:**

Nếu bạn muốn xử lý tất cả các công việc của mình khi ứng dụng của bạn ở chế độ production, hãy thêm lệnh trên vào các công việc crob.

## 10. Delay Dispatch
Nếu bạn muốn trì hoãn một job, có nghĩa là muốn gửi email sau một thời gian nhất định, bạn có thể sử dụng hàm delay() này bằng cách chuyển thời gian bạn muốn trì hoãn như dưới đây:
```

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Jobs\SendWelcomeEmail;

class JobController extends Controller
{
    /**
     * Handle Queue Process
     */
    public function processQueue()
    {
        $emailJob = new SendWelcomeEmail()->delay(Carbon::now()->addMinutes(5));
        dispatch($emailJob);
    }
}
```
Trong ví dụ mã ở trên, mình sử dụng thư viện Carbon để xử lý delay 5 phút. Thư viện Carbon này đã được install sẵn trong Laravel. Vì vậy, bạn chỉ cần sử dụng nó chứ không cần cài nữa.

Mình đã trì hoãn queue trong năm phút bằng hàm delay().
Như vậy, sau năm phút, Laravel sẽ xử lý queue này và job này sẽ bị xóa khỏi bảng Jobs trong database và email sẽ được gửi.

**Chú thích**

Trước khi chạy lệnh queue:work, bạn phải thiết lập cấu hình chính trong file .env, với mục đích để test, bạn có thể cài đặt log mail để ghi nhật ký như thế này MAIL_DRIVER=log. Khi hàng đợi Laravel sẽ xử lý công việc và gửi email xem vào file storage/logs/laravel.log và bạn sẽ tìm thấy email của mình ở đó.

## 11. Kết luận
Trong bài viết này, mình đã làm mọi thứ rất đơn giản để bạn có thể hiểu rõ hơn về cách thức hoạt động của Laravel Queues. Mình hy vọng nếu bạn đã làm theo tất cả các bước trên, bạn sẽ hiểu về queue rõ ràng. 

Hãy chắc chắn là lệnh queue:work đã được chạy trên server. 

Như vậy, mình đã hướng dẫn xong các bạn cách tạo queue để send mail, nếu có thắc mắc gì các bạn để lại comment bên dưới nhé. 

Cảm ơn các bạn đã theo dõi bài viết của mình.

### Tài liệu tham khảo
[Laravel Queue 5.8](https://laravel.com/docs/5.8/queues)