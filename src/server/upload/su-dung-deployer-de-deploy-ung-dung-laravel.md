Xin chào các bạn, bữa nay lười quá nên giờ mới có bài viết. Hôm nay chúng ta sẽ cùng tìm hiểu 1 công cụ hỗ trợ auto deploy cho các ứng dụng PHP đặc biệt là support rất nhiều với laravel, đó là Deployer.

# 1. Cài đặt Deployer
Bước đầu tiên cũng là bước đơn giản nhất, đó là cài đặt deployer. Cái này trên trang chủ hướng dẫn cũng khá chi tiết nên mình ko đi vào nhiều làm gì, đại khái là sẽ down file về, đưa nó đến thư mục để ta có thể run nó và cho nó quyền execute:
```bash
$ curl -LO https://deployer.org/deployer.phar
$ mv deployer.phar /usr/local/bin/dep
$ chmod +x /usr/local/bin/dep
```
À mà nhớ là mấy lệnh này phải được cài ở nơi mà bạn sẽ chạy lênh deploy (chứ không phải cài trên server nhé =.=)


# 2. Sử dụng Deployer
Ở đây mình giả sử bạn đã có dự án rồi (git giếc các kiểu, coding các thứ đầy đủ) và chỉ muốn thêm chức năng auto deploy.

Ok bước tiếp theo, ta sẽ tạo 1 file deploy.php để chạy deploy. File deploy này sẽ có thể có những chức năng sau:

## 2.1 Config
Để tạo các config param, ta sẽ sử dụng hàm set(), và để lấy ra config ta sẽ dùng hàm get(). Ví dụ:
```php
set('param', 'value');

task('deploy', function () {
    $param = get('param');
});
```
Bạn cũng có thể truyền vào call_back function cho hàm set(): 
```php
set('current_path', function () {
    return run('pwd');
});
```
Một vài config cần lưu ý khi sử dụng là:
* deploy_path: đường dẫn đến thư mục deploy.
* hostname: được set bởi hàm host()

## 2.2 Tasks
Bạn có thể định nghĩa các task cho deployer thực thi sử dụng hàm task(). Bạn cũng có thể tạo 1 mô tả cho task đó bằng cách sử dụng hàm desc() ở phía trên task được định nghĩa. Ví dụ:
```php
desc('My task');
task('my_task', function () {
    run(...);
});
```

Để thực hiện 1 task, bạn chỉ cần chạy:
```bash
$ dep my_task
```

Để show ra list các command, ta dùng lệnh:
```bash
$ dep list
```

Chúng ta cũng có thể gộp nhiều task con thành 1 task lớn hơn:
```php
task('deploy', [
    'deploy:prepare',
    'deploy:update_code',
    'deploy:vendors',
    'deploy:symlink',
    'cleanup'
]);
```
Mặc định các task sẽ được thực hiện theo thứ tự mà bạn định nghĩa ở trên.

Deployer cung cấp cho chúng ta cách nữa để thực hiện thứ tự task mà ta có thể định nghĩa riêng, đó là sử dụng hàm before() và after(). Tất nhiên như tên gọi thì công dụng của nó cũng tương tự, đó là thực hiện trước hoặc sau 1 task nào đó. Ví dụ:
```php
task('deploy:done', function () {
    write('Deploy done!');
});

after('deploy', 'deploy:done');
```

## 2.3 Hosts
Chúng ta có thể định nghĩa ra hosts sử dụng bằng hàm host(). Ví dụ về cách sử dụng:
```php
host('domain.com')
    ->stage('production')
    ->roles('app')
    ->set('deploy_path', '~/app');
```
Trong đó:
* host là IP hoặc domain mà bạn sẽ deploy đến.
* stage là môi trường bạn sẽ deploy (cái này quan trọng khi sử dụng command để deploy).

## 2.4 Flow
Flow đơn giản để thực hiện deploy 1 ứng dụng php sẽ gồm có:
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
Tuy nhiên mỗi ứng dụng sẽ có cách deploy khác nhau (do cài thêm package hay các tool khác phải chạy thêm).
Một vài note về các task cơ bản mà deployer cung cấp cho chúng ta:
* `deploy:prepare`: Chuẩn bị để deploy. Nó sẽ check `deploy_path` có tồn tại hoặc sẽ tạo nó, check các thư mục `releases`, `shared`, `.dep`.
* `deploy:lock`: Khóa quá trình deploy. Nó sẽ kiểm tra sự tồn tại của file `.dep/deploy.lock`. Nếu quá trình deploy bị khóa, ta có thể sử dụng hàm `deploy:unlock` để mở khóa quá trình deploy.
* `deploy:release`: Tạo 1 thư mục release và đọc file .dep/releases để lấy list và số thứ tự release.
* `deploy:update_code`: pull code từ github về.
* `deploy:shared`: tạo thư mục shared chung cho các file mà chúng ta định nghĩa sẽ share qua các phiên bản.
* `deploy:writable`: set quyền ghi cho các file được list trong `writable_dirs`. Ta có thể set quyền cho nó.
* `deploy:vendors`: Chạy `composer install` cho ứng dụng.
* `success`: Tạo thông báo thành công.

# 3. Thực hành trên laravel

Nội dung file sẽ đơn giản như sau:

```php
<?php
namespace Deployer;

require 'recipe/laravel.php';

// Project name
set('application', 'tên_project');

// Project repository
set('repository', 'git@github.com:framgia/tên_project.git');

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', false);

// Thời gian tối đa để thực hiện 1 task deploy, quá thời gian sẽ fail.
set('default_timeout', 300);

// Shared files/dirs between deploys
add('shared_files', ['.env']);
add('shared_dirs', ['storage']);

// Writable dirs by web server
add('writable_dirs', [
    'bootstrap/cache',
    'storage',
    'storage/app',
    'storage/app/public',
    'storage/framework',
    'storage/logs',
]);

/**
 * npm task
 */
set('bin/npm', function () {
    return run('which npm');
});

// Hosts

host('IP_Server')
    ->user('deploy_user')
    ->stage('development')
    ->set('deploy_path', '~/{{application}}')
    ->forwardAgent(false);

// Tasks
task('build', function () {
    run('cd {{release_path}} && build');
});

task('reload:php-fpm', function () {
    run('sudo /usr/sbin/service php7.2-fpm reload');
});


desc('Install npm packages');
task('npm:install', function () {
    if (has('previous_release')) {
        if (test('[ -d {{previous_release}}/node_modules ]')) {
            run('cp -R {{previous_release}}/node_modules {{release_path}}');
        }
    }

    run('cd {{release_path}} && {{bin/npm}} install');
});

task('npm:run_dev', function () {
    run('cd {{release_path}} && {{bin/npm}} run dev');
});

task('deployer', [
    'deploy:info',
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:update_code',
    'deploy:shared',
    'deploy:vendors',
    'npm:install',
    'npm:run_dev',
    'deploy:writable',
    'artisan:storage:link',
    'artisan:view:clear',
    'artisan:cache:clear',
    'artisan:config:cache',
    'artisan:optimize',
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',
    'reload:php-fpm',
]);

after('deploy:failed', 'deploy:unlock');
after('reload:php-fpm', 'artisan:migrate');

after('deployer', 'success');
```

Oke ta sẽ tạo file deploy.php có nội dung như trên. Và sử dụng lệnh:
```bash
$ dep deployer development
```
-----
> Nó tè 1: Chú ý chút ở đây là các bạn cần tạo ssh key và authorized_key trên máy cá nhân thông được với server nhé. Nếu ko có bước này thì thằng e này của bạn ko thể ssh vào server để deploy đâu.

-----
>Nó tè 2: Bạn cũng nhớ phải cài đầy đủ môi trường: git, composer, npm, node, php, .... cho server của bạn. Để ý ở trên mình phải tìm file exec của npm thì mới chạy được (vì có thể lúc cài bạn sẽ tạo ra file này ở 1 chỗ khác :v)
-----
Để ý ở trên mình truyền vào:
* deployer: task mình cần chạy
* development: stage mà mình sẽ chạy trên host đó.

À mà quên, khi deploy xong thì ta sẽ có cấu trúc thư mục dư lày:
```bash
├── .dep
├── current -> releases/1
├── releases
│   └── 1
└── shared
   ├── .env
   └── storage
```
current sẽ là thư mục mà bạn nên trỏ config tới để show ra web.
# Chốt tộ
Nhìn thì có vẻ loằng ngoằng thôi thực ra lúc config xong bạn thấy dễ òm ý mà. Đây là 1 công cũ rất tốt có thể hỗ trợ bạn trong việc auto deploy.

Điểm mạnh của công cụ này là nó hỗ trợ chúng ta Zero downtime deployments bằng cơ chế rollback đến phiên bản release trước đó, một điều quan trọng khi deploy ứng dụng lên server. Ngoài ra nó cũng tương đối dễ sử dụng cho phần lớn các framework php hiện nay. (mà thậm chí là ko phải php nuôn, sao nào :-?).

Đó là toàn bộ những gì mình muốn trình bày, có gì sai hay config không thành công, các bạn có thể comment phía dưới giúp mình, mình sẽ sẵn lòng giải đáp thắc mắc :D Cảm ơn đã theo dõi bài viết này của mình nhé :D

# Tài liệu tham khảo
- https://deployer.org/