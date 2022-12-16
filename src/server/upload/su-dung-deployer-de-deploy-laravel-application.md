Hôm nay chúng ta sẽ cùng tìm hiểu một công cụ hỗ trợ auto deploy ứng dụng PHP và đặc biệt là với Laravel, đó là Deployer.

**1. Cài đặt Deployer**

- Để cài đặt Deployer thì cũng khá đơn giản, trên trang chủ [Deployer](https://deployer.org/docs/getting-started.html) cũng đã hướng dẫn rồi, bạn chỉ cần  chạy các câu lệnh sau:

```php
$ curl -LO https://deployer.org/deployer.phar
$ mv deployer.phar /usr/local/bin/dep
$ chmod +x /usr/local/bin/dep
```

Sau khi cài xong, bạn di chuyển vào thư mục chứa project (ở dưới local) và chạy

```php
$ dep init
```

thì nó sẽ sinh ra file `deploy.php` ở project của bạn :D

**2. Sử dụng Deployer**

- Tiếp theo thì chúng ta config với file `deploy.php`

*1. Configuration*

- Để sử dụng biến cấu hình, ta sử dụng hàm `set()`, để lấy nó ra ta sử dụng hàm `get()`.

```php
set('param', 'value');

task('deploy', function () {
    $param = get('param');
});
```

*2. Task*

- Để định nghĩa các task thực thi, bạn sử dụng hàm `task()`, ngoài ra bạn cũng có thể mô tả cho các task bằng hàm `desc()`, ví dụ:

```php
desc('My task');
task('my_task', function () {
    run(...);
});
```

- Để thực hiện 1 task:

```php
dep my_task
```

- Để hiển thị ra các command có sẵn:

```php
dep list
```

- Bạn cũng có thể gộp nhiều task lại thành 1 task :

```php
task('deploy', [
    'deploy:prepare',
    'deploy:update_code',
    'deploy:vendors',
    'deploy:symlink',
    'cleanup'
]);
```

- Bạn có thể định nghĩa các task có thể chạy trước hoặc sau task khác:

```php
task('deploy:done', function () {
    write('Deploy done!');
});

after('deploy', 'deploy:done');
```

*3. Host*

- Bạn có thể định nghĩa `host` bằng hàm `host()`, ví dụ:

```php
host('domain.com')
    ->stage('production')
    ->set('deploy_path', '~/app');
```

Trong đó: 
+ `domain.com`: là domain hoặc IP bạn sẽ deploy

+ `stage`: Tên môi trường bạn sẽ deploy (staging, production) - Bạn để tên gì cũng được miễn sao khi gõ command phải gõ đúng tên stage :D
          
*4. Flow*

- Luồng triển khai chung sẽ như thế này:

```php
task('deploy', [
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:update_code',
    'deploy:shared',
    'deploy:writable',
    'deploy:vendors',
    'deploy:clear_paths',
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',
    'success'
]);
```

Trong đó:
-  `deploy:prepare`: Chuẩn bị deploy,  kiểm tra `deploy_path` tồn tại, nếu không thì  tạo nó. Nó cũng kiểm tra tồn tại của các path:
    + `relesases` : Trong thư mục này, sẽ lưu trữ các bản releases
    + `shared`: Chia sẻ file trên tất cả các bản releases
     + `.dep`: metadata được sử dụng bởi `Deployer`
- `deploy:lock`: Khóa deploy để chỉ chạy 1 quá trình deploy đồng thời, kiểm tra sự tồn tại của file `.dep/deploy.lock`, nếu quá trình deply bị hủy bởi `Ctrl + C` thì hãy chạy `deploy:unlock` để xóa tệp này đi. Trong trường hợp deploy thất bại, thì `deploy:unlock` sẽ tự động kích hoạt
- `deploy:release`: Tạo một thư mục `release` mới dựa trên cấu hình `release_name`, đồng thời đọc file `.dep/releases` để lấy danh sách các bản releases đã tạo trước đó.Ngoài ra, nếu trong `deploy_path` có symlink bản release trước đó, nó sẽ bị xóa
- `deploy:update_code`: pull code từ github về
-  `deploy:shared`: tạo các tệp và thư mục shared chung cho các file mà chúng ta định nghĩa sẽ share qua các phiên bản. Bạn có thể chỉ định các thư mục và file shared tại `shared_dirs` và `shared_files`, quá trình này được chia thành các bước:
       + Copy thư mục từ `release_path` sang `shared` nếu không tồn tại.
       + Xóa thư mục `release_path`
       + symlink thư mục từ `shared` sang `release_path`.
- `deploy:writable`: Set quyền ghi cho các file đã được list trong `writable_dirs`.
- `deploy:vendors`: Chạy `composer install` cho ứng dụng.
-  `deploy:clear_paths`: Xóa các thư mục được chỉ định trong `clear_paths`
-  `deploy:symlink`: symlink bản hiện tại sang `release_path`.
-  `cleanup`: Clean các bản release cũ
-  `success`: In ra thông báo thành công.

- Và đây là file cấu hình mình đã config ở file `deploy.php`:

```php
<?php
namespace Deployer;

require 'recipe/laravel.php';

// Project name
set('application', 'deploy_project');

// Project repository
set('repository', 'git@github.com:name_organizations/name_project.git');

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', false);

// Default branch
set('branch', 'develop');

// Shared files/dirs between deploys 
add('shared_files', [
	'.env',
]);
add('shared_dirs', [
	'storage',
	'bootstrap/cache',
]);

// Writable dirs by web server 
add('writable_dirs', [
	'bootstrap/cache',
    'storage',
    'storage/app',
    'storage/app/public',
    'storage/framework',
    'storage/framework/cache',
    'storage/framework/sessions',
    'storage/framework/views',
    'storage/logs',
]);

// Hosts

host('IP_server_or_domain')
	->user('deploy')
	->stage('zizou')
    ->set('deploy_path', '~/{{application}}')
    ->forwardAgent(false);    
    
// Tasks

task('build', function () {
    run('cd {{release_path}} && build');
});

task('npm:install', function () {
    run('cd {{release_path}} && npm install');
});

task('npm:run_dev', function () {
    run('cd {{release_path}} && npm run dev');
});

task('reload:php-fpm', function () {
    run('sudo /etc/init.d/php7.3-fpm reload');
});

task('deploy', [
	'deploy:info',
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:update_code',
    'deploy:shared',
    'npm:install',
    'npm:run_dev',
    'deploy:writable',
    'deploy:vendors',
    'artisan:storage:link',
    'artisan:view:clear',
    'artisan:cache:clear',
    'artisan:config:cache',
    'deploy:clear_paths',
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',
    'success'
]);
// [Optional] if deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');

// Migrate database before symlink new release.

before('deploy:symlink', 'artisan:migrate');

after('cleanup', 'reload:php-fpm');

```

Và để chạy thì chúng ta chạy:
```php
dep deploy zizou
```
^^ hoặc bạn cũng có thể chạy
```php
dep deploy zizou -vvv
```
để xem chi tiết quá trình deploy nó chạy những gì nhé.

**Chú ý:**
- Để chạy được thằng deploy này thì bạn cần có `ssh key` connect được lên server nhé 
- Khi chạy lần đầu tiên thì bạn không cho chạy task `migrate` nhé , những lần chạy deploy tiếp theo thì có thể chạy task `migrate`, và mỗi lần code được merge thì bạn chỉ cần chạy
```php
dep deploy
```
- Nếu muốn rollback về bản release trước đó thì chỉ cần chạy
```php
dep rollback
```
- Trên là những gì mình thử với `Deployer` và thành công nhé :D

**Tham khảo**

[Deployer](https://deployer.org/docs/getting-started.html)

[Sử dụng deployer để deploy ứng dụng laravel](https://viblo.asia/p/su-dung-deployer-de-deploy-ung-dung-laravel-L4x5x1AmKBM#_3-thuc-hanh-tren-laravel-6)