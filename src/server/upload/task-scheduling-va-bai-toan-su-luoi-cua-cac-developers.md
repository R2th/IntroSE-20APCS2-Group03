Có thể bạn không biết, khoa học đã chứng minh: những người lười biếng sẽ "giải cứu thế giới". Thiệt đó nha :) vì lịch sử đã chứng minh rằng: hầu hết những phát minh mới đều nhằm mục đích thỏa mãn "sự lười" của con người, bằng cách giúp chúng ta tiết kiệm thời gian và sức lực.
<br><br>
Ngay cả tỉ phú Bill Gates cũng từng phát biểu một câu khiến những người lười cảm thấy... nức lòng: "Hãy luôn chọn những người lười biếng để làm việc khó, vì họ sẽ tìm ra cách đơn giản nhất để hoàn thành".
<br><br>
Tất nhiên, điều này không có nghĩa là bạn sẽ được nằm chơi cả ngày, mà là  bạn cần phải làm việc theo cách "lười nhất" có thể mới có cơ hội để thay đổi thế giới.

Dù vậy, vẫn sẽ thật xa vời nếu tôi bảo bạn sử dụng "sự lười" của bạn để giải cứu thế giới đi. Nhưng nếu là giải cứu trang web của bạn thì sao? Hoàn toàn có thể nhé. Hãy cùng tôi tìm hiểu về Task Scheduling để xem cách mà Laravel cho phép bạn lười hiệu quả như thế nào:D
<br>
## 1. Bài toán "sự lười" của các developers
Nếu mỗi chúng ta đều cần phải ăn uống, đi ngủ,... mỗi ngày thì trang web cũng cũng có những task như kiểu, update database, tính toán thống kê,... cần phải thực hiện định kì. Những công việc đấy chả có gì thay đổi, nhưng nó buộc phải lặp lại sau một khoảng thời gian nhất định. Sẽ quá nhàm chán và mất thời gian nếu mỗi ngày, thâm chí mỗi giờ, mỗi phút chúng ta lại phải thực hiện request một cách thủ công, chưa kể bạn có thể quên mất việc đó. Thử tưởng tượng xem, nếu bạn đang đi chơi với bạn gái mà lại phải thực hiện request mỗi phút một lần, có lẽ bạn sẽ bị đá sớm thôi :D. Vì vậy, bài toán đặt ra là cần phải lập lịch cho các tác vụ định kì.
<br><br>
Trước đây, lập trình viên phải tạo ra các dòng cron cho mỗi task cần được đặt lịch. Tuy nhiên, việc này khá đau đầu vì việc đặt lịch không nằm trong source control, và bạn phải SSH vào trong server và thêm vào các nội dung cron. Để giải quyết vấn đề này, Laravel có bộ đặt lịch cho phép bạn định nghĩa các lệnh đặt lịch liền mạnh và rõ ràng, mà tiện nhất là bạn chỉ cần nhúng thêm một dòng lệnh cần thiết vào trong cron của server. Cùng mình thử làm một ví dụ để biết cụ tỉ sẽ như thế nào nhé!

## 2. Từ từ đã nào!
Trước khi thực hành, chúng ta hãy cùng lướt nhanh một số khái niệm nhé. 
### Đầu tiên, Cron là gì vậy?
Crontab (CRON TABLE) là một tiện ích cho phép thực hiện các tác vụ một cách tự động theo định kỳ, ở chế độ nền của hệ thống. Crontab là một file chứa đựng bảng biểu (schedule) của các entries được chạy.

Một cron schedule là một text file. File này thường nằm ở /var/spool/cron. Crontab files không cho phép bạn tạo hoặc chỉnh sửa trực tiếp với bất kỳ trình text editor nào, trừ phi bạn dùng lệnh crontab. Một số lệnh thường dùng là:
```
crontab -e: tạo hoặc chỉnh sửa file crontab 
crontab -l: hiển thị file crontab 
crontab -r: xóa file crontab
service cron start: khởi động lại crontab
```
### Cấu trúc dòng lệnh trong Cron files:
```php
*     *     *     *     *     command to be executed
-     -     -     -     -
|     |     |     |     |
|     |     |     |     +----- day of week (0 - 6) (Sunday=0)
|     |     |     +------- month (1 - 12)
|     |     +--------- day of month (1 - 31)
|     +----------- hour (0 - 23)
+------------- min (0 - 59)
```
Các trường đặt lịch:
```php
| Field | Giải thích       | Giá trị cho phép          |
|-------|------------------|---------------------------|
| MIN   | phút             | 0 to 59                   |
| HOUR  | Giờ              | 0 to 23                   |
| DOM   | Ngày trong tháng | 1-31                      |
| MON   | Tháng            | 1-12                      |
| DOW   | Ngày trong tuần  | 0-6                       |
| CMD   | Lệnh             | Các lệnh có thể thực hiện |
```
Nếu giá trị để là *, có nghĩa là cron sẽ chạy tác vụ với mọi giá trị cho trường đó.
<br>
Ví dụ đặt lịch in xâu "hello world" vào file hello.txt vào lúc 3 giờ sáng mỗi ngày
```
0 3 * * * echo "hello world" >> hello.txt 
```

Tương tự, ta có một số ví dụ khác như:
- Chạy script 30 phút 1 lần:
```
0,30 * * * * command
```
- Chạy script 15 phút 1 lần:
```
0,15,30,45 * * * * command
```
### Tiếp theo là Artisan Console 
Nếu từng sử dụng framework Laravel, chắc hẳn bạn cũng chẳng xa lạ gì với artisan, giao diện command-line của Laravel, bao gồm các câu lệnh hữu ích để phát triển sản phẩm.
>> Sử dụng lệnh: `php artisan list` để xem danh sách câu lệnh có sẵn.

Ngoài việc sử dụng các câu lệnh có sẵn, Laravel cho phép bạn có thể tạo ra các câu lệnh riêng để sử dụng cho trang web của mình. Mình sẽ nói rõ hơn về phần này trong phần tiếp theo. Nếu bạn muốn tìm hiểu thêm, đọc [bài viết](https://viblo.asia/p/laravel-console-command-rNkKxxvkKlm) này để nắm rõ hơn nhé.

## 3. Cùng thử lười nào!
### Cách 1: Định nghĩa trực tiếp trong file app\Console\Kernel.php
**Bước 1: Khởi động schedule:**

Thực hiện lệnh `crontab -e` để mở file cron và thêm dòng lệnh có dạng:
```
* * * * * php ~/project-path/artisan schedule:run
```
Dòng lệnh này sẽ đặt lịch gọi tới lệnh schedule:run mỗi phút. 
>> Chú ý: project-path là đường dẫn tới thư mục chứa project của bạn.

![](https://images.viblo.asia/2e866e20-3439-4ad9-84b2-ef99a67ec7df.png)

Lệnh `php artisan schedule:run` là lệnh được cung cấp bởi Laravel. Khi lệnh này được gọi tới, hàm schedule() sẽ được thực thi.
<br><br>
Cụ thể, mình có 1 project đặt tại thư mục Documents/example, và mình muốn kiểm tra việc đặt lịch trong schedule mỗi phút 1 lần, và in ra kết quả trong file test.txt. Mình sẽ thếm dòng lệnh sau:
```
* * * * * php ~/Documents/example/artisan schedule:run >> test.txt
```
**Bước 2: Định nghĩa schedule**

Schedule được định nghĩa trong function schedule() của file Kernel.php. Bạn có thể đặt lịch cho cả Closure và Artisan Commands.

Ví dụ sau sẽ giúp mình đặt lịch in ra dòng chữ "Hello" 5 phút 1 lần:
```php
protected function schedule(Schedule $schedule)
{
    $schedule->call(function () {
        echo "Hello \n"
    })->everyFiveMinutes();
}
```
Và đây là kết quả của file test.txt trong vòng 10 phút:
![](https://images.viblo.asia/a50ee5b1-ab50-4627-9e51-9261db8a8d03.png)

Trong 10 phút này, mỗi phút Cron sẽ thực thi `schedule:run` một lần. Nhưng do schedule() định nghĩa in ra "Hello" 5 phút 1 lần, nên sau 10 phút, ta chỉ in được 2 chữ "Hello".

Bạn cũng có thể đặt lịch cho artisan commands trong hàm schedule(). Ví dụ như, đặt lịch thực hiện `config:cache` mỗi ngày 1 lần:
```php
protected function schedule(Schedule $schedule)
{
    $schedule->command('config:cache')->everyFiveMinutes();
}
```
**Các tùy chọn tần suất Schedule**

https://laravel.com/docs/5.5/scheduling#schedule-frequency-options

-----
### Cách 2: Tạo command và sử dụng Cron để đặt lịch
**Bước 1: Tạo command**
Để có thể đặt lịch rõ ràng cho từng tác vụ, chúng ta sẽ tạo command để cron thực hiện định kì.

Ví dụ, mình sẽ sử dụng lệnh make:command sau để tạo command HelloWorld:
```
php artisan make:command HelloWorld
```
Câu lệnh sẽ tạo ra một file **HelloWorld.php** trong thư mục **app\Console\Commands**. 

Trong đó, **\$signature** để định nghĩa cú pháp gọi đến lệnh và **\$description** sẽ mô tả tác vụ được thực thi khi lệnh được gọi đến. Hàm **handle()** thì dùng để định nghĩa nội dung tác vụ, hàm này sẽ được gọi đến khi lệnh được thực thi. Dưới đây là một ví dụ:
```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class HelloWorld extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'hello:run';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'printf hello world';

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
        $this->info("Hello World");
    }
}

```
Giờ thì chỉ cần đăng kí command trong file **app\Console\Kernel.php**
```php
protected $commands = [
    Commands\HelloWorld::class
];
```
Sử dụng lệnh `php artisan list` để xem command mới tạo. Nếu có command hello là ok. Bạn cũng có thể chạy lệnh `php artisan hello:run` để kiểm tra lệnh chúng ta vừa tạo.
**Bước 2: Cấu hình lịch Cron**

Thay vì gọi đến lệnh `schedule:run`, mình sẽ đặt lịch cho Cron gọi thẳng đến command riêng bằng cú pháp:
```
* * * * * php ~/project-path/artisan <command:name>
```
Ví dụ, mình sẽ đặt lịch gọi tới command `hello:run` cho project trong Documents/example 12 tiếng 1 lần:
```
0 12 * * * php ~/Documents/example/artisan helle:run
```
Vậy là xong.

## 4. Lười cũng thú vị mà nhỉ!
Trên đây là những chia sẻ của mình về  Artisan Console và Task Scheduling. Để dễ hiểu thì mình sử dụng một ví dụ rất quen thuộc là "Hello world", tất nhiên bạn có thể làm việc với Database và nhiều hơn nữa. 

Dưới đây là một số tài liệu cho những bạn muốn tìm hiểu thêm nhé:

https://laravel.com/docs/5.6/scheduling
https://laravel.com/docs/5.6/artisan#writing-commands

Hi vọng bài viết này có ích với các bạn. 
Nói chung là 'lười' cũng không phải là xấu, nhưng mà hãy 'lười' để giải cứu thế giới chứ đừng nằm chơi cả ngày nhé. Chúc các bạn sẽ ngày càng 'lười' một cách hiệu quả và chúng ta sẽ cùng nhau giải cứu thế giới ahihi :D