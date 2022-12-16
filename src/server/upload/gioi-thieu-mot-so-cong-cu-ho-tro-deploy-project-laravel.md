Trong quá trình phát triển phần mềm, chúng ta phải trải qua rất nhiều giai đoạn. Bài viết này mình sẽ giới thiệu đến mọi người một vài công cụ hữu ích giúp cho việc deploy một project Laravel lên server trở nên dễ dàng hơn. Mình sử dụng nginx làm web server nhé. Cùng bắt đầu thôi. 
# 1. Rocketeer
> Ôi giời, tưởng cái gì, hóa ra là <b> Rocketeer </b> :D 

Đấy, một thằng bạn giấu tên của mình đã nói với mình như thế. Rocketeer được dụng rộng rãi cách đây khá lâu rồi nên mình nghĩ rất nhiều bạn đã biết và sử dụng nó. Thú thật là bản thân mình chưa đụng chạm nhiều đến việc deploy chứ chưa nói đến việc xử lý các thứ trên server. Và đến bây giờ, mình thấy mọi người vẫn sử dụng công cụ này rất nhiều. Dưới đây mình sẽ giới thiệu cách cài đặt và hướng dẫn cơ bản về rocketeer. 
Install:
```shell
$ wget http://rocketeer.autopergamene.eu/versions/rocketeer.phar
$ chmod +x rocketeer.phar
$ mv rocketeer.phar /usr/local/bin/rocketeer
```
Để bắt đầu, bạn cần đi đến folder chứa code Laravel và chạy lệnh sau:
```shell
$ rocketeer ignite
```
Các bạn cứ ấn enter để tiếp tục nhé, sau khi xong nó sẽ hiện ra cho bạn một thông báo
```
production/0 | Ignite (Creates Rocketeer's configuration)
```
Tiếp tục Enter:
```
The Rocketeer configuration was created at your-project/.rocketeer
```
Như vậy là các bạn đã cài đặt thành công Rocketeer rồi. Mở project của bạn ra và xem trong thư mục .rocketeer có gì nào. <br>
Config:

- config.php: Đây là nơi chứa các thông tin config cần thiết như tên ứng dụng, thiết lập connection cho việc deploy.

Việc config cũng không gặp nhiều khó khăn gì cả. Chúng ta sẽ tạo các connection mà chúng ta muốn. Các bạn có thể tạo thêm các connection nếu muốn. Ví dụ:
```php
'default'          => ['staging'],
'connections'      => [
    'staging' => [
        'host'      => 'x.x.x.x',
        'username'  => 'deploy',
        'password'  => '',
        'key'       => '~/.ssh/id_rsa',
        'keyphrase' => '',
        'agent'     => '',
        'db_role'   => true,
    ],
],
```
- hooks.php: Đây là nơi các tác vụ sẽ được thực hiện. After và before đã chỉ rõ cho chúng ta biết khi nào tác vụ được thực thi. Ví dụ nếu bạn muốn update trước khi Rocketeer chạy thì bạn làm như sau:
```shell
'before' => [
    'setup'   => ['sudo apt-get update'],
    'deploy'  => [],
    'cleanup' => [],
],
```
- path.php: Đặt đường dẫn cho một số lệnh của Rocketeer khi chạy. Nếu không, rocketeer sẽ tự tìm đến thư mục gốc là đường dẫn gốc mặc định
- remote.php: Chứa nơi để settings các thông tin mà khi deploy nó sẽ được tạo trên server

Ví dụ:
```php
'root_directory' => '/home/www/', // đường dẫn đến project trên server
'shared'         => [ // thư mục sẽ được chia sẻ (dùng chung) sau mỗi lần bạn deploy
        'storage',
        '.env',
    ],
'sudoed' => ['deploy'], // user được chạy dưới quyền sudo
'permissions'    => [
    'files'    => [
        'storage',
        'bootstrap/cache',
    ],
    'callback' => function ($task, $file) { // tùy chọn các command cho việc xử lý các file trên
        return [
            sprintf('chmod -R 777 %s', $file),
            sprintf('chown -R deploy:deploy %s', $file),
        ];
    },
],
```
- scm.php: Chứa thông tin về repository github của bạn cùng branch, username, password. Nếu bạn sử dụng SSH hoặc public repository thì có thể bỏ qua phần username và password. 
Ví dụ:
```php
'scm'        => 'git',
'branch'     => 'production',
'username'   => null,
'password'   => null,
'shallow'    => true,
'submodules' => true,
```
- stages.php: Trong trường hợp bạn có nhiều stages khi deploy thì bạn sẽ định nghĩa tại file này.

```php
'stages' => array('testing', 'production', 'develop'),
```

- strategies.php: Cho phép bạn config các module để chạy trong quá trình deploy. Có thể xem các tác vụ và các tùy chọn hiện có bằng cách chạy `rocketeer:strategies` 

Rocketeer cũng cho phép bạn đăng kí các events, quản lý các queues và tasks. Tạo file `events.php` trong `./rocketeer` và đăng ký các event bạn muốn. Ví dụ:
```php
<?php
use Rocketeer\Facades\Rocketeer;

Rocketeer::addTaskListeners('deploy', 'before-symlink', function ($task) {
    $task->runForCurrentRelease('php artisan migrate --force');
    $task->runForCurrentRelease('php artisan storage:link');
    $task->runForCurrentRelease('php artisan config:cache');
    $task->runForCurrentRelease('php artisan view:cache');
});
```

Danh sách các events:
- deploy.before
- create-release.before
- create-release.after
- dependencies.before
- dependencies.after
- test.before
- test.after
- migrate.before
- migrate.after
- deploy.before-symlink
- deploy.after

Deploy:
Sau bước này là chúng ta đã có thể deploy được rồi. Sử dụng command như dưới để deploy theo branch bạn muốn:
```shell
rocketeer deploy --on="branch"
```
Nếu bạn muốn rollback lại cũng rất dễ dàng:
```
rocketeer rollback
```

# 2.  Deployer
So với Rocketeer thì có vẻ deployer đang nổi bật hơn. Trên github rockerteer đã không còn thấy commit từ cuối năm 2017 trở lại đây, trong khi deployer vẫn đang nhận được sự ủng hộ nhiệt tình của các contributor trong quá trình phát triển. 
##### Install
```shell
curl -LO https://deployer.org/deployer.phar
mv deployer.phar /usr/local/bin/dep
chmod +x /usr/local/bin/dep
```
Sau khi cài đặt, các bạn di chuyển đến project và chạy:
```
dep init -t Laravel
```
Config:
Kiểm tra lại các bạn sẽ thấy có một file `deploy.php`. Chú ý cho mình những phần quan trọng sau:
```php
set('application', 'your-name-app'); // đặt tên cho app của bạn
set('repository', 'git@github.com:username/project-name');
host('x.x.x.x')
    ->user('deploy')
    ->set('deploy_path', '/path-to-project-in-server'); // cấu hình host và đường dẫn
```

Nếu muốn tự động migrate sau khi deploy thì các bạn thêm dòng sau phía dưới
```php
after('deploy:update_code', 'artisan:migrate');
```

Ngoài ra thì deployer cho phép bạn có thể thực thi các tác vụ cũng như bên rocketeer. Các bạn có thể xem chi tiết tại [link này](https://deployer.org/docs/tasks.html).
Nhớ cấu hình file `~/.ssh/config` tại máy của bạn chứa host như trong config để có thể kết nối tới host. <br>
Deploy:
Cuối cùng là bước quan trọng nhất. Cũng như rocketeer các bạn có thể lựa chọn branch để deploy:
```shell
dep deploy --branch=production 
```
# 3. Kết
Đến đây mình đã giới thiệu và hướng dẫn cơ bản với mọi người 2 công cụ hỗ trợ deploy một project Laravel lên host rồi. Mỗi cái sẽ có một mặt lợi và một mặt bất lợi. Hãy cũng thử và trải nghiệm, đưa ra đánh giá cho nó. Bản thân mình thì thích deployer hơn vì nó ngắn hơn và vẫn tiếp tục được contribute. Trong khi rocketeer cũng hỗ trợ hầu hết cho chúng ta các config và các file cần thiết. Chọn cái nào, là do mỗi người :D, bài viết này mình xin được dừng lại ở đây. Cảm ơn các bạn đã theo dõi. Hẹn gặp lại. 

# 4. Tài liệu tham khảo
- rocketeer: http://rocketeer.autopergamene.eu/
- deployer: https://deployer.org/docs/getting-started.html