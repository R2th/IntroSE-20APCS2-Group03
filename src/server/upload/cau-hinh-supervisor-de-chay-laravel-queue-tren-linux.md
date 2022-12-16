Có lẽ mọi người cũng không xa lạ gì về Laravel Queue nên mình sẽ không giới thiệu lại nhé. Mọi người có thể lên [Laravel doc](https://laravel.com/docs/8.x/queues) để đọc nhé! 

Như mọi người cũng biết để Queue được hoạt động, ta phải chạy lệnh:
```
php artisan queue:work
```
Queue chạy liên tục ko ngừng nghỉ nên nếu chúng ta dùng terminal (hoặc cmd) thì khi tắt terminal/cmd đi thì coi như queue cũng tắt luôn (thấy khó chịu phải không mọi người:grin:). Và hôm nay mình sẽ giới thiệu mọi người dùng supervisor để hỗ trợ chúng ta làm điều này. Cùng tìm hiểu nhé!

### 1. Supervisor là gì?
Supervisor là công cụ giúp quản lý các tiến trình chạy trên Linux. Một số ưu điểm mà Supervisor như:
* Đảm bảo một tiến trình  nào đó luôn luôn chạy không ngừng nghỉ. Nếu vì lý do gì mà nó bị tắt, Supervisor sẽ khởi động process đó lại.
* Tự động chạy một tiến trình  khi khởi động hệ thống.
* Quản lý nhiều tiến trình  dưới dạng một group các tiến trình , có thể được bật/tắt cùng lúc.
* Log được lại quá trình chạy Queue Job.
* Trong trường hợp tiến trình mà supervisor thực thi phát sinh lỗi, có thể cấu hình để Supervisor retry lại một số lần nhất định trước khi chính thức báo fail.

### 2. Cài đặt Supervisor
Để cài Supervisor, mọi người chạy lệnh sau trên Linux:
```
sudo apt-get install supervisor
```
Sau khi cài đặt xong supervisor được tạo thư mục /etc của máy.
### 3. Cấu hình cơ bản Supervisor
Mỗi tiến trình do Supervisor giám sát sẽ được cấu hình ở file dạng **.conf** nằm trong thư mục **/etc/supervisor/conf.d**

Cấu trúc 1 file config cơ bản như sau:
```php
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
directory=/path/to/your/project
command=sendmail.sh
autostart=true
autorestart=true
user=forge
numprocs=8
redirect_stderr=true
stdout_logfile=/path/to/your/project/logs/worker.log
```


* **[program: tên-bất-kì]**: tên program. Mọi người có thể đặt tên bất kỳ gì.
* **directory**: đường dẫn tới program cần run.
* **command**: program muốn run.
* **autostart**: quy định tiến trình có tự chạy ngay khi Supervisor được khởi động hay ko. Thường thì Supervisor được chạy khi boot, nên việc quy định tiến trình có tự chạy hay không sẽ phụ thuộc vào boot.
* **autorestart**: quy định tiến trình có tự khởi động ngay sau khi nó bị tắt vì lý do nào đó (đã chạy xong, bị lỗi, bị timeout…) hay ko.
* **user**: user dùng để thực thi tiến trình.
* **numprocs**: số lượng tiến trình mà Supervisor sẽ chạy. Ví dụ để gửi mail, ta để numprocs=4, nghĩa là 4 tiến trình cùng chạy task gửi mail.
* **redirect_stderr**: nếu là true thì stderr sẽ bị redirect để xuất vào file chỉ định ở stdout_logfile
* **stdout_logfile**: đường dẫn tới file log của mình. File này ko cần tạo trước vì supervisor sẽ tự tạo cho mình:grin:

Sau khi cấu hình xong ta chạy lệnh sau để restart lại supervisor
```
systemctl restart supervisord
# or
sudo service supervisor restart
```
**Note:** Mỗi khi thay đổi các thông tin cấu hình Supervisor, mọi người cần phải khởi động lại Supervisor nhé.

### 4. Thực thi Supervisor để chạy Laravel Queue
* Tạo file **laravel-worker.conf** trong thư mục **/etc/supervisor/conf.d** và sửa file
```php
[program:laravel-worker] # mình thường để trùng với tên file cho dễ nhớ :)
process_name=%(program_name)s_%(process_num)02d
directory=/var/www/laravel # mọi người tự thay cho phù hợp nhé
command=php artisan queue:work --sleep=1 --tries=1
autostart=true
autorestart=true
user=root  # user thực hiện command
numprocs=2
redirect_stderr=true
# Nếu có lỗi sẽ được log vào file này
stdout_logfile=/var/www/laravel/storage/logs/worker.log
```
* Khởi động queue
```
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start laravel-worker:*
```

### 5. Một số command thường dùng

| Command | Detail |
| -------- | -------- | -------- |
| sudo service supervisor restart     | Khởi động lại toàn bộ supervisor   |
| sudo supervisorctl start **laravel-worker:***  | Khởi động worker **laravel-worker:***  |
| sudo supervisorctl stop **laravel-worker:***     | Dừng worker **laravel-worker:***   |
|sudo supervisorctl restart **laravel-worker:***| Khởi động lại worker **laravel-worker:***|

### Kết luận
Như vậy với supervisor thì việc quản lý và chạy Laravel Queue đã sẽ trở dễ dàng hơn, chúng ta cũng ít phải bận tâm tới tiến trình của nó đang chạy ra sao, trừ khi có lỗi thì mới phải vào check log thui:grin:

Hi vọng bài viết giúp ích được cho mọi người.

Thanks for reading:sparkling_heart:

**Tài liệu tham khảo**
http://supervisord.org/index.html

https://phambinh.net/bai-viet/cau-hinh-laravel-queue-tren-moi-truong-production/