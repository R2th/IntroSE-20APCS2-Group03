Resource watcher cho phép bạn xem resources (files) thay đổi. Điều này có nghĩa là bạn có thể xem một thư mục và sau đó lắng nghe mọi thay đổi đối với các tệp trong thư mục đó.
Ví dụ như bạn có thể create, modify hay delete một file có trong thư mục.

## Cài đặt
Trong thư mục source của laravel bạn chạy lệnh sau để cài đặt:

```php
composer require jasonlewis/resource-watcher
```

thêm dòng này vào provider trong file app.php của laravel

```php
JasonLewis\ResourceWatcher\Integration\LaravelServiceProvider::class,
```

## Viết code nào

Mình sẽ dùng command của laravel để watcher và supervisor để start command này

```php
php artisan make:command WatcherCommand
```

Lệnh này sẽ tạo ra một file WatcherCommand.php trong thư mục command của probject.

thay đổi:

```php
protected $signature = 'watcher';
```

trong file kernal thêm dòng sau:

```php
 protected $commands = [
        WatcherCommand::class // thêm dòng này vào trong $commands
    ];
```

trong đó bạn thay đổi hàm handle như sau:

```php
try {
        Log::info('starting listen file change ...');
        $folderListen = 'path_folder_to_listen'; // folder cần listen thay đổi
        $watcher = app('watcher');
        $listener = $watcher->watch($folderListen);
        // xử lý thay đổi ở đây


        $watcher->start();
    } catch (\Exception $exception) {
        report($exception);
        Log::error('fail to listen mess= ' . $exception->getMessage());
    }

    return;
}      
```

sau khi listen một folder, chúng ta có biến $listener, biến này có các function như sau:


```php
modify, create,delete và anything
```

ví dụ lắng nghe file thay đổi:

```php
$listener->modify(function($resource, $path) {
    echo "{$path} has been modified.".PHP_EOL;
});
```

lắng nghe file dc create:

```php
$listener->create(function($resource, $path) {
    echo "{$path} has been modified.".PHP_EOL;
});
```

hoàn toàn tương tự với hàm delete.

Riêng anything có chút khác biệt:

```php
$listener->anything(function($event, $resource, $path) {
    $event->getCode(); //1 = create, 2= modify, 0 = delete
});
```

từ đó các bạn có thể sử lý những bước tiếp theo trong function để làm gì với file thay đổi.


> Chú ý:
1. Khi hệ thống tự động sinh file, đầu tiên file đó sẽ là create, sau đó là modify, event modify sẽ sinh ra liên tục, bạn cần chú ý chỗ này, cần check xem Last Modified của file để biết file đã hoàn toàn được tạo thành công.

```php
public function checkLastModify($path)
{
    // run after 1 min
    Log::debug('start check last modify file = ' . $path);
    $time = time();
    $filemtime = filemtime($path);

    Log::debug("time = $time, filemtime = $filemtime");
    if ($time - $filemtime > 60) { // cách 60s
        return true;
    }

    return false;
}
```

Hàm này sẽ check file đó dc tạo cách hiện tại 1 phút (60s).

Tiếp theo để test các bạn chạy lệnh sau:

```php
php artisan watcher
```

Sau đó thay đổi file trong thư mục mà bạn watcher ở trên để xem kết quả.

## Installing Supervisor

Tiếp theo ta phải install Supervisor để keep cái watcher kia khi deploy lên server, vì trên server khi chạy `php artisan watcher`  các bạn thoát terminal ra nó sẽ stop lệnh lại, lên không thể watcher cái gì dc cả. Cũng không nên dùng nophp để chạy lệnh, vì khi code có exeption hay có lỗi gì đó nó sẽ kill process watcher đi, sẽ gay ra lỗi cho những xử lý sau này.

ubuntu:
```bash
sudo apt-get install supervisor 
```

tạo file `laravel-worker.conf` trong thư mục `/etc/supervisor/conf.d`

điền nội dung sao vào file:

```bash
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /path_to_project/artisan watcher // thay đổi path đến project của bạn.
autostart=true
autorestart=true
user=nginx // thay đổi username phù hợp với server của bạn.
numprocs=1
redirect_stderr=true
stdout_logfile=/patch_to_logs/worker.log
```

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start laravel-worker:*
```

centos:

```php
yum install -y python-setuptools
easy_install supervisor
yum install supervisor
```

```php
vim /etc/supervisord.conf
```

cho nội dung tương tự như ubuntu ở trên vào.

```bash
systemctl start supervisord
```

Vậy là xong rồi đó.

## Tài liệu

- https://github.com/jasonlewis/resource-watcher
- https://laravel.com/docs/5.8/queues#supervisor-configuration