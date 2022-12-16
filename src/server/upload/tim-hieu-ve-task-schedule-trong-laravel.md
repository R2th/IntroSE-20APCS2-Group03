<div align="center">
    
# Lời mở đầu 
    
</div>

Xin chào các bạn, mình lại quay trở lại rồi đây!

Có thể các bạn biết (nếu chưa biết thì giờ biết này) câu nói nổi tiếng của Bill Gates:
> **“I choose a lazy person to do a hard job. Because a lazy person will find an easy way to do it.”**

Vì lười nó là bản chất của con người rồi, cũng vì lười mà mình đã bỏ bê cái [series Laravel](https://viblo.asia/s/nhung-dieu-can-tim-hieu-khi-bat-dau-lam-project-php-laravel-Wj53OmjP56m) này lâu lắm rồi. Và cũng nhờ cái sự lười ấy mình quyết định lựa chọn viết về Task Scheduling để hướng dẫn anh em newbie giải quyết cái "sự lười" khi làm project.

Văn vở thế thôi, bắt đầu thôi nào!

<div align="center">
    
# Nội dung
    
</div>

<div align="center">
    
## Task Schedule là gì
    
</div>

Cái tên Task Schedule chắc đủ để nói lên chức năng của nó là gì rồi nhỉ **"Lập kế hoạch công việc"**. Tức là bạn sẽ lên sẵn những công việc cần làm lặp đi lặp lại theo 1 chu kì nhất định và giao cho server thực hiện thay vì phải chạy bằng "cơm".

Nếu các bạn đã đăng kí sim điện thoại chính chủ thì đến ngày sinh nhật chắc chắn bạn sẽ nhận được một tin nhắn quan tâm thân thương như thế này 

![](https://images.viblo.asia/a3e263c6-8638-4fda-ad65-9ed11129f5b5.jpg)

Và bài toán đặt ra là, mỗi ngày đều có hàng trăm ngàn khách hàng có sinh nhật, và việc này sẽ phải lặp đi lặp lại hằng ngày cho đến khi "không còn ai dùng nhà mạng ấy nữa".

Và lời giải để giải quyết bài toán ấy chính là **Task Schedule**!

<div align="center">
    
## Sử dụng Task Schedule như thế nào
    
</div>

<div align="center">
    
### Cronjob
    
</div>

Trước hết để sử dụng được Task Schedule thì bạn phải nắm được khái niệm **Cron (Cronjob)** đã (nó giống như kiểu muốn biết **chạy** thì phải biết **đi** trước, muốn biết **đi** thì phải biết **bò** vậy).

Cronjob là một công cụ giúp thực hiện ngầm các job/task một cách tự động theo một chu kì nhất định trên hệ thống, cụ thể ở đây là trên server (Unix/Linux). 

Và những job/task để chạy tự động được khai báo trong 1 file được gọi là crontab, và để thao tác được với crontab này bạn sẽ cần những câu lệnh sau:

```bash
crontab -e: tạo hoặc chỉnh sửa file crontab 
crontab -l: hiển thị file crontab 
crontab -r: xóa file crontab
service cron start: khởi động lại crontab
```

Sau khi tạo/mở được file crontab rồi thì ta cần hiểu được cấu trúc/cú pháp của crontab. Nó sẽ có dạng như sau:
```bash
* * * * * command/job cần thực hiện
# Trong đó ý nghĩa các dấu * lần lượt từ trái sang phải như sau:
# 1. phút thực hiện (từ 0 đến 59 và *)
# 2. giờ thực hiện (từ 0 đến 23 và *)
# 3. ngày thực hiện (ngày trong tháng, từ 1 đến 31 và *)
# 4. tháng trong năm (từ 1 đến 12 và *)
# 5. thứ trong tuần (từ 0 đến 6 và *)
```

Nếu các bạn hỏi mình  tại sao có cái bắt đầu từ 0 mà có cái lại bắt đầu từ 1 thì mình cũng không biết đâu, đơn giản là vì người làm ra nó quy định thế :D :D :D

Còn nếu các bạn hỏi tại sao nó ngoài giá trị số thì nó lại nhận cả giá trị `*` thì mình giải thích được, khi sử dụng `*` tức là nó sẽ nhận tất cả các giá trị có thể, ví dụ * ở vị trí đầu tức là command/job đó sẽ chạy mỗi phút một lần.

<div align="center">
    
### Task Schedule trong project Laravel
    
</div>

Rồi, trình bày nhiều thế cũng đã đủ rồi. Bây giờ chúng ta sẽ đến với phần chính của bài viết, đó là sử dụng Task Schedule trong project Laravel.

Để chạy được một command thì trước hết ta phải tạo được 1 command đã, và câu lệnh thần thánh `php artisan` lại một lần nữa xuất hiện :D 

```bash
php artisan make:command TenCommand
```

Sau khi tạo xong, hãy vào đường dẫn `app/Console/Commands/TenCommand` và thêm code mà bạn muốn chạy vào nhé, nó sẽ có dạng như bên dưới

```php:TenCommand
<?php
 
namespace App\Console\Commands;
 
use Illuminate\Console\Command;
 
class TenCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:name'; //tên để gọi thực thi command
 
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description'; //mô tả chi tiết công việc mà command sẽ thực hiện
 
    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }
 
    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        // xử lí logic khi mà command được thực thi
    }
}
```

Sau khi đã có command thì sẽ cần khai báo nó trong file Kernel.php, cụ thể là ở trong `function schedule()`, tại đây bạn sẽ khai báo luôn tần suất chạy lệnh như sau:

```php:Kernel.php
protected function schedule(Schedule $schedule)
{
    $schedule->command('command:name')->everyMinutes(); // command sẽ chạy mỗi phút 1 lần
}
```

Ngoài ra thì để khai báo tần suất chạy command, có một số lựa chọn thông dụng như 
- `daily()`: chạy command hàng ngày vào lúc 0h00
- `hourly()`: chạy command hàng giờ
- `cron('* * * * *')`: chạy command theo lịch trình tuỳ chỉnh, giống như khai báo ở phía trên
- ...

Để tìm hiểu thêm những tần suất khai báo khác (phù hợp với nhu cầu của các bạn) thì các bạn có thể tham khảo tại [đây](https://laravel.com/docs/6.x/scheduling#schedule-frequency-options) nhé


Việc khai báo command trong project đã xong, giờ thì hãy khai báo cho server nào:
- Chạy lệnh 
```bash
crontab -e #tạo hoặc edit crontab
```

- Thêm vào dòng
```
* * * * * php ~/đường-dẫn-đến-project/artisan schedule:run
```

Nếu các bạn hiều phần mình viết ở trên thì sẽ hiểu rằng dòng này thông báo cho server biết rằng cần thực hiện `schedule:run` mỗi phút 1 lần.

Và như vậy thì tất cả các command được khai báo trong `function schedule()` cũng sẽ được thực thi theo đúng với tần suất mà bạn khai báo.

Quá đơn giản phải không nào!

<div align="center">
    
# Lời kết
    
</div>

Nói tóm lại, mình tin chắc rằng task schedule sẽ đóng góp rất nhiều trong Website của bạn, cho dù là sản phẩm thực tế hay chỉ là project để học tập. 

Và nếu thấy bài viết có ích, hãy upvote hoặc clip để dễ dàng xem lại nhé, còn nếu bài viết vẫn chưa thỏa mãn được bạn, hãy để lại comment để mình giải đáp và hoàn thiện hơn ở những bài viết sau nhé!

Hẹn gặp lại các bạn trong các bài viết tiếp theo trong [series Laravel](https://viblo.asia/s/nhung-dieu-can-tim-hieu-khi-bat-dau-lam-project-php-laravel-Wj53OmjP56m) này, mình hứa sẽ update thêm bài viết thường xuyên hơn!

Cảm ơn các bạn rất nhiều!

<div align="center">
    
# Tài liệu tham khảo
    
</div>

- Laravel Document: https://laravel.com/docs/6.x/scheduling