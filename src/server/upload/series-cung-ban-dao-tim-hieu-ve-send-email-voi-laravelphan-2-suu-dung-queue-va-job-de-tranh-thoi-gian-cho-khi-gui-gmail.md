## Giới thiệu: 
Nếu bạn đã xem và thực hiện bài trước thì các bạn sẽ dễ dàng nhận ra khi bạn tiến hành gửi email, đó là một khoản thời gian tương đối lâu. Vấn đề đó là các bạn đang thực hiện gửi một email mà nó đã chiếm nhiều thời gian như vậy, bạn thắc mắc nếu hệ thống có hàng trăm người truy cập vấn đề gì sẽ diễn ra. Từ khóa cho câu hỏi đó là queue(Hàng chờ)
## Nội dung
### 1. Jobs:
Câu lệnh để tạo một job là:
```js
php artisan make:job SendEmailJob
```
Khi các bạn thực hiện câu lệnh trên. 1 file `SendEmailJob` sẽ được tạo trong thư mục **App/Jobs** sẽ có nội dung như sau
```js
<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendEmailJob implements ShouldQueue
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
### Dispatch job
Mặc định, job có thể gọi tới hàm` static dispatch()`, ở bất kỳ đâu để đẩy job vào queue, các tham số được truyền vào hàm `dispatch() `được định nghĩa ở `constructor().`
```js
NameJob::dispatch();
```
Nếu bạn cần trì hoãn việc thực hiện job trong queue, bạn có thể sử dụng hàm `delay()`:
```js
NameJob::dispatch()->delay(now()->addMinutes(10));
```
Ngoài ra bạn có thể tùy chọn việc xử lý job trên Queue nào, và sử dụng DB nào bằng hàm `onConnection()` và `onQueue()`:
```js
NewJob::dispatch()->onQueue('processing')->onConnection('sqs');
```
**Chú ý:** Các bạn cũng có thể gọi riêng job này mà không phục vụ mục đích đưa vào queue bằng câu lệnh:
```js
$result = dispatch_now(new App\Jobs\SendEmails);
```
## 2. Queue
**Queue là gì**

Một hàng đợi **queue** là một danh sách những việc cần làm **job** được quản lý theo thứ tự. Khi chúng ta muốn thêm một **job** vào **queue** thì bạn cần `dispatch($job)` và để **job** hoạt động bạn cần implements từ class `Illuminate\Contracts\Queue\ShouldQueue `
**Laravel Queue driver** được sử dụng để quản lý các **job** như thêm **job** vào hàng đợi, lấy **job** ra khỏi hàng đợi. Laravel có thể làm việc với nhiều các driver khác nhau như database, Redis, Amazon SQS…

**Làm sao để tạo một queue**

Các bạn thực hiện câu lệnh sau:

```js
php artisan queue:table

php artisan migrate
```
Câu lệnh sẽ tạo ra 2 bảng **failed_jobs** và **jobs** trong migration của bạn. Bạn có thể sử dụng **Database** để lưu trữ hoặc bạn hoàn toàn có thể sử dụng **redis**. Bạn chú ý bạn sử dụng cái nào thì nhớ chuyển **QUEUE_CONNECTION** trong file **.env**, ví dụ mình dùng database thì mình sẽ viết **QUEUE_CONNECTION=database**
### 3. Áp dụng vào bài toán gửi Gmail ở ví dụ trước
Để áp dụng vào bài toán gửi mail của chúng ta mình sẽ thực hiện hơi khác một chút. Mình sẽ đưa phần gửi mail của chúng ta vào hàng chờ **queue** bằng cách implements từ **Illuminate\Contracts\Queue\ShouldQueue** chứ không tạo một **job** để thực hiện gửi email. Đoạn code của mình sẽ nhìn như sau.
```js
<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendEmailMailable extends Mailable implements ShouldQueue
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
       return $this->markdown('welcome');
   }
}
```
Và mình gửi email như bình thường ở ctroller cần sử dụng tới chỉ cần gọi.
```js
Mail::to('...')->send(new SendEmailMailable());
```
Chú ý: Mặc dù ở đây mình không tạo một job nhưng nếu để nó đưa vào queue được thì các bạn vẫn triển khai **worker** bình thường nhé :)
### 4. Tạo các worker lắng nghe việc gọi job

Để lắng nghe các **job** trong **Queue**, bạn sử dụng command :
```js
php artisan queue:work
```
**Chú ý:** Nếu sau khi các bạn chạy **work** mà nó hiển thị tương tự như thế này
```js
[2019-10-24 04:16:05][13t9Lo9XhvdfgckaQ9JochWArhxTwXNE] Processing: App\Mail\SendEmailMailable
[2019-10-24 04:16:08][13t9Lo9XhvdfgckaQ9JochWArhxTwXNE] Processed:  App\Mail\SendEmailMailable
```
Thì bạn đã sử dụng queue thành công, và bây giờ các bạn test lại thì các bạn có thể thấy sẽ không có thời gian chờ khi gửi email nữa đúng không nào. Nếu chưa có thì bạn check lại nhé  :)

**Các tham số trong work:**

* --tries=3: Định nghĩa số lần xử lý job trước khi job bị fail.
* --timeout=30: Định nghĩa thời gian tối đa job có thể chạy trong queue
* --once: Định nghĩa worker chỉ lắng nghe và xử lý 1 job duy nhất.
* --queue=name: Chỉ rõ tên queue mà worker sẽ nghe.


**Chú ý:**
**Worker** là một process tồn tại lâu dài, nên trong quá trình deploy, nó sẽ không tự nhận biết và thích nghi với sự thay đổi của source code, vì vậy bạn cần restart nó trong quá trình deploy, bằng lệnh:
```js
php artisan queue:restart
```
## Lời kết
Bần đạo đã cùng các hạ trao đổi về chương send email từ cơ bản tới nâng cao. Đây là cách bần đạo tu hành chắc còn nhiều khiếm quyết vậy xin những huynh đài qua đây chỉ giáo để chúng ta cùng thăng tiến về nội công :). Lời cuối bần đạo cảm ơn rất nhiều các huynh đài đã theo dõi bài đăng của mình, chúc các huynh đài một ngày tốt lành và sớm tu thành đạo!!!