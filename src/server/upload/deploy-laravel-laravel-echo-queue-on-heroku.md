# Lời nói đầu!
Gần đây dự án mình cần deploy lên heroku để test cũng như sử dụng nhiều tiện lợi của heroku. Thực sự thì đây là một thử thách khá lớn với mình vì trước đây mình chỉ sự dụng heroku cho các project nho nhỏ và đơn giản thì giờ đây việc deploy 1 dự án chạy với nhiều service đặc trưng của laravel như : Queue , Laravel Echo, Schedule ....v...v.... Và ngày hôm nay mình xin phép nói về kinh nghiệm của chính bản thân mình.

<hr>

# Nội Dung
Trước khi đi vào phần nội dung chính, mình xin phép sẽ không trình bày nhiều về các khái niệm cũng như kiến trúc của `Heroku` vì trình bày ra sẽ rất dài dòng và vất vả. Mình sẽ chỉ trình bày bài toán cụ thể và cách mình đã xử lý chúng (Mình sẽ viết về thực tiễn nhiều hơn). Vì vậy trước khi đọc bài của mình , nếu bạn là người quan tâm đến kiến trúc và chưa rõ hoặc muốn hiểu hơn về khái niệm của `Heroku` thì hãy dừng ngay lại và quay về trang chủ của `heroku` đê đọc thêm tại   [đây](https://devcenter.heroku.com/categories/heroku-architecture) 
   
   Còn nếu bạn không quan tâm hoặc đã hiểu rõ rồi thì chúng ta cùng tiếp tục.
<hr>

## Bài toán :
Setup server laravel thông thường đi kèm với các service đi kèm sau :

**1. Setup server web thông thường để chạy web (Sử dụng nginx)**

**2. Setup để chạy queue (Cho gửi mail, run notification)**

**3. Setup schedule để chạy các job hàng ngày**

**4. Setup server laravel echo để chạy socket (Cho realtime notification  ...v...v...v....)**

**5. Setup custom domain cho site**

**6. Setup https cho site**

Ok, nào chũng ta hãy cùng bắt đầu từng phần của bài toán nhé !

<hr>

## Giải quyết  :

**1. Setup server web thông thường để chạy web (Sử dụng nginx)**

Với bài toán này có lẽ mình đã định không nói về nó nữa, vì trên internet nói khá là nhiều rồi, tuy nhiên nó là bài toàn gốc liên quan đến  nhiều vấn đề cho các bài toán sau nên mình vấn cần phải đề cập đến.

Đầu tiên bạn cần tạo 1 file nginx config cho app của bạn trên `heroku` (Tên gì tùy bạn nhé  còn mình sẽ đặt nó là `nginx_app.conf`).  File này sẽ được `heroku` nhúng vào file `nginx` gốc của `heroku` . Bạn có thể tạo nó hoặc ko nhé , nếu không tạo thì sử dụng nginx mặc định của `heroku` cũng được. Tuy nhiên theo quan điểm cá nhân mình thì bạn nên viết nó . File nó sẽ có dạng như sau :

```
location / {
    # try to serve file directly, fallback to rewrite
    try_files $uri @rewriteapp;
}

location @rewriteapp {
    # rewrite all to index.php
    rewrite ^(.*)$ /index.php/$1 last;
}

location ~ ^/(app|app_dev|config)\.php(/|$) {
    try_files @heroku-fcgi @heroku-fcgi;
    internal;
}
```

Để hiểu rõ hơn về cách sử dụng của chúng bạn có thể đọc file config gốc nginx của heroku tại   [đây](https://github.com/heroku/heroku-buildpack-php/blob/master/conf/nginx/heroku.conf.php) nhé .

Tiếp theo bạn cần tạo 1 file có tên là `Procfile` (Bắt buộc phải tên là dư này nhé) để nói với `heroku` rằng bạn sẽ tạo ra server `php` chạy với web server là `nginx` và với các config `nginx` của bạn được cấu hình trong file `nginx_app.conf` như sau:

```
web: vendor/bin/heroku-php-nginx -C nginx_app.conf public/
```
 Với câu lệnh trên bạn đã tạo ra 1 dyno `web` với command là `vendor/bin/heroku-php-nginx -C nginx_app.conf public/` . Như vậy web server của bạn đã sẵn sàng !
 
Ok, xong . H bạn chỉ cần commit code và deploy bằng heroku-cli thôi.

**2. Setup để chạy queue (Cho gửi mail, run notification)**

Bài toán này có lẽ là bài toán rất thông thường với các ae developer rồi. Chắc ae chẳng ai còn lạ với câu lệnh
```
php artisan queue:work 
```

Để chạy các `queue` này rồi. Trên các vps or server thông thường chũng ta cũng sẽ dùng `supervisor` để chạy. Đây có lẽ là cách tốt và ae thường xử dụng nhất rồi. Vậy còn trên `heroku` ta phải làm dư nào để setup như thế nào đây.

Cách của mình cũng sẽ là sử dụng `supervisor` . Tuy nhiên sẽ cần sự lắt léo 1 chút trong quá trình cài đặt. Các bước thứ tự như sau :

* Đầu tiên bạn cần add `buildpacks`  `python` vào app. Bạn có thể add bằng website bằng cách vào setting của app trên `heroku` hoặc dùng `heroku-cli` với cú pháp như sau :

```
heroku buildpacks:add --index 1 heroku/python
```

Note: Mặc định sẽ có 1 `buildpacks` của chúng ta là `php` nhé ae !

* Tiếp theo đó bạn cần tạo file `requirements.txt` để nói với `heroku` bạn sẽ cài `supervisor` vào app của mình. File này có dạng sau 

```
supervisor
```

* Vì `supervisor` không thể chạy tốt trên `Python 3+` vì vậy chúng ta cần set version cho `python` và ở đây mình chọn version `2.7.16`  bằng cách tạo ra 1 file `runtime.txt` với nội dung cụ thể dư sau:
```
python-2.7.16
```

* Bạn tạo ra file config worker của bạn follow theo cấu trúc của [laravel](https://laravel.com/docs/5.4/queues#supervisor-configuration). Mình sẽ tạo ra folder `supervisor` và đặt file này tại đó. File đại khái như sau: (Mình sẽ đặt tên laravel-worker.conf)

```
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /home/forge/app.com/artisan queue:work sqs --sleep=3 --tries=3
autostart=true
autorestart=true
user=forge
numprocs=4
redirect_stderr=true
stdout_logfile=/home/forge/app.com/worker.log
```

* Tiếp theo đó bạn cần tạo ra 1 file config cho dyno `suppervisor` của bạn. Nó sẽ có dạng như sau:

```
[unix_http_server]
file=/tmp/supervisor.sock   ; (the path to the socket file)
chmod=0700                       ; sockef file mode (default 0700)

[supervisord]
logfile=/tmp/supervisord.log ; (main log file;default $CWD/supervisord.log)
pidfile=/tmp/supervisord.pid ; (supervisord pidfile;default supervisord.pid)
childlogdir=/tmp            ; ('AUTO' child log dir, default $TEMP)

[rpcinterface:supervisor]
supervisor.rpcinterface_factory = supervisor.rpcinterface:make_main_rpcinterface

[supervisorctl]
serverurl=unix:///tmp/supervisor.sock ; use a unix:// URL  for a unix socket

[include]
files = /app/supervisor/*.conf
```

**Note:** 

Bạn cần chú ý rằng  mình sử dụng cấu trúc thư mục là  `/app/supervisor/` lý do là project của bạn sau khi lên `heroku` tất cả nó sẽ nằm trong thư mục `app` vậy nên mình cần phải trỏ như trên

* Ok, Bước cuối cùng là bạn cần thêm vào file `Procfile` để thông báo vs `heroku` 1 dyno chạy `supervisor` . File `Procfile` hiện tại có cấu trúc như sau :

```
web: vendor/bin/heroku-php-nginx -C nginx_app.conf public/
worker: supervisord -c /app/supervisor.conf -n
```

Sau khi bạn deploy xong bằng `heroku-cli` nhớ vào `heroku` , vào app của bạn ==> vào tab resource vào enable dyno `worker` lên thì nó mới làm việc nhé !

**3. Setup schedule để chạy các job hàng ngày**

Lại 1 lần nữa chúng ta gặp phải bài toán cực kì quen thuộc. Schedule chạy job hàng ngày. Thực tế thì chắc bạn cũng ko lạ vấn đề này với `laravel` nữa. Vơi việc set Schedule trong laravel và setup cronjob hàng ngày trên server.

Với heroku thì ta ko có cronjob (hoặc mình không biết). `Heroku` support 1 số add-on như [scheduler](https://devcenter.heroku.com/articles/scheduler) hoặc là [process-scheduler](https://elements.heroku.com/addons/process-scheduler) ..v...v...

Ở đây thì mình ko sử dụng các phương pháp này. Mình sẽ tái sử dụng lại `supervisor` đã cài đặt ở trên để xử lý vấn đề này. Cách làm như sau.

* Khởi tạo 1 command như sau có dạng như sau:

```
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class ScheduleOnHeroku extends Command
{
    protected $signature = 'schedule:heroku';

    protected $description = 'Schedule bash on Heroku';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        while(true) {
            Artisan::call('schedule:run');
            sleep(60);
        }
    }
}

```

Mỗi 1p command sẽ chạy 1 lần và run `schedule:run` của laravel. Vậy là ổn

* Tạo thêm 1 file config worker trong thư mục `supervisor` (Ví dụ : `schedule-worker.conf` nhớ tên file cần có kêt thúc `.conf` nhé). Nọi dung cụ thể dư sau :

```
[program:schedule-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /app/artisan schedule:heroku
autostart=true
autorestart=true
numprocs=1
redirect_stderr=true
stdout_logfile=/app/worker_schedule.log
```

Như vậy thôi. Chúng ta đã xử lý được vấn đề rồi ! Deploy code và xem xét thôi :D

Ok, Mình xin kết thúc bài viết ngày hôm nay tại đây ! Còn các bài toán còn lại mình sẽ trình bày trong bai viết sau ! Thank you for reading !

<hr>

# Tài liệu tham khảo

[https://devcenter.heroku.com/articles/custom-php-settings#default-behavior](https://devcenter.heroku.com/articles/custom-php-settings#default-behavior)

[https://devcenter.heroku.com/articles/custom-php-settings](https://devcenter.heroku.com/articles/custom-php-settings)

https://dannyism.com/running-supervisor-with-laravel-workers-on-heroku/

https://devcenter.heroku.com/articles/custom-domains

https://elements.heroku.com/buttons/gregburek/heroku-tls-auth-nginx-sample