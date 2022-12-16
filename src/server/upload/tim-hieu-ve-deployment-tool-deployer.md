Trong [bài trước](https://viblo.asia/p/OeVKBMny5kW), mình đã tìm hiểu về **Rocketeer**, cũng là một deployment tool. Và trong bài này, mình sẽ tìm hiểu một deployment tool khác, là **Deployer**.  Deployer có gì hay ho và khác gì so với Rocketeer? Chúng ta cùng tìm hiểu nhé :)

### 1. Deployer là gì?

Tương tự như Rocketeer, Deployer cũng là một deployment tool được viết bởi PHP

Một số tính năng nổi bật của Deployer là:

- Dễ học và dễ setup
- Sử dụng **recipes** cho các frameworks
- Thực thi đồng bộ không cần extenssion
- Rollback lại bản release trước nếu gặp sự cố khi deploy
- Xác thực với SSH
- Nói KHÔNG với downtime deployments

>> **recipe** là một file PHP định nghĩa các task cần thực hiện trong quá trình deploy. **recipe** có thể require và extend hoặc override các recipe khác.

Deployer có rất nhiều recipes có sẵn được contribute bởi cộng đồng. Bạn có thể dễ dàng cài đặt bằng cách sử dụng *composer* hay *phar
archive*

>> Có vẻ như Deployer chỉ hỗ trợ các project PHP????


### 2. Cài đặt Deployer
```
$ curl -LO https://deployer.org/deployer.phar
$ mv deployer.phar /usr/local/bin/dep
$ chmod +x /usr/local/bin/dep
```

Sau khi cài đặt, tương tự như Rocketeer, chúng ta sẽ di chuyển đến thư mục dự án và thực thi lệnh:
```
$ dep init
```

Lệnh này sẽ tạo ra một file `deploy.php` trong thư mục hiện tại. File này chính là 1 recipe chứa cấu hình và các task để triển khai trong quá trình deploy. Mặc định, tất cả các recipe đều extends từ các [common recipe](https://github.com/deployphp/deployer/blob/master/recipe/common.php).

Đồng thời, giống như Rocketeer, bạn cũng có thể cài đặt Deployer bằng composer
```
$ composer require deployer/dist --dev
```

và chạy lệnh
```
$ php vendor/bin/dep
```
để init

Một dố lệnh căn bản với Deployer
```js
$ dep // liệt kê danh sách các tasks
$ dep config:dump // lấy danh sách params có sẵn
$ dep config:current // Xem config hiện tại
$ dep <task_name> // Thực thi một task được gọi
$ dep deploy <stage> // Lệnh deploy hệ thống
```
#### 3. set, get và run
Với Deployer, chúng ta sẽ sử dụng các hàm `set` và `get` để thao tác với params. Trong đó, params có thể là giá trị hoặc 1 function.
```php
set('param', 'value');

set('current_path', function () {
    return run('pwd');
});

task('deploy', function () {
    $param = get('param');
});
```

Tiếp theo chúng ta có function `run` để chạy các lệnh:
```php
run('pwd');
```

Bạn có thể sử dụng hai cặp ngoặc nhọn `{{ }}` hoặc sử dụng nối chuỗi và hàm `get` đê bind các params vào command
```php
run('cd {{release_path}} && command');
run('cd ' . get('release_path') . ' && command');
```

### 3. Params

Một số params mà chúng ta cần quan tâm khi cấu hình hệ thống gồm.


| Params | Ý nghĩa|
| -------- | -------- |
| deploy_path     | Định nghĩa đường dẫn tới thư mục được tạo ra trên server khi deploy dự án |
| hostname     | Tên máy chủ |
| user     | Username, mặc định là username account git của bạn. Hoặc bạn có thể setup như [vậy](https://deployer.org/docs/configuration.html#user)     |
| release_path     | Đường dẫn đầy đủ đến thư mục chứa bản release hiện tại|
| previous_release     | Đường dẫn tới bản release trước (nếu có)|
| ssh_multiplexing     |Nên set giá trị là true: `set('ssh_multiplexing', true);`|
| default_stage     |Nếu host của bạn có chứa nhiều stages, bạn cần định nghĩa stage mặc định được deploy khi không chỉ định stage |
| keep_releases     | Số lượng bản release cần lưu lại, mặc định là 5. Giá trị `-1`, tương ứng với việc giữ lại toàn bộ các bản released     |
| repository     | Git repository     |
| git_tty     | Cho phép việc thực hiện lệnh `git clone`, mặc định là `false`. Bạn có thể set true bằng hàm: `set('git_tty', true);`    |
| branch     | Nhánh được deploy     |
| shared_dirs     | Thư mục chứa các dữ liệu bạn muốn cache lại sau khi deploy để theo dõi quá trình vận hành hệ thống. |
| copy_dirs     |Danh sách files cần copy giữa các bản release|
| writable_dirs     | Các thư mục cho phép ghi trên server|
|writable_use_sudo | Lệnh ghi chỉ được thực hiện với `sudo`. Mặc định là `false`|
|clear_paths|Danh sách đường dẫn cần xóa sau khi update|
|clear_use_sudo|Yêu cầu `sudo` với `clear_paths`. mặc định là `false`|
|cleanup_use_sudo|Yêu cầu `sudo` với task `cleanup`. mặc định là `false`|
|use_relative_symlink|Có cho phép sử dụng relative symlinkhay không. Mặc định, deployer sẽ dò xem hệ thống có hỗ trợ các relative symlink hay không để cho phép sử dụng chúng.|
|use_atomic_symlink|Tương tự `use_relative_symlink`. nhưng ở đây là atomic symlink |
|composer_action| Mặc định là `install`|
|composer_options|Danh sách options cho composer|
|env|Danh sách biến môi trường|

### 4. Tasks

Như đã nói ở phần đầu, các repice sẽ định nghĩa các task (tác vụ), sau đó chúng ta có thể sử dụng dep để thực thi các tác vụ này.
Ví dụ, mình định nghĩa 1 task tên là `test`:
```js
desc('Test');
task('test', function () {
    run(...);
});
```

Nội dung task có thể là một function, cũng có thể là một lệnh hoặc chuỗi các lệnh nối tiếp
```php
task('build', 'npm build');
task('build', '
    npm build;
    npm run dev;
 ');
```

Ngoài ra bạn cũng thể định nghĩa một nhóm các lệnh con bằng cú pháp
```php
task('deploy', [
    'deploy:prepare',
    'deploy:update_code',
    'deploy:vendors',
    'deploy:symlink',
    'cleanup'
]);
```
sau đó, định nghĩa từng lệnh nhỏ này.

- before() và after(): chỉ định trước hoặc sau khi thực thi 1 tác vụ
```php
// [Optional] if deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');

// Migrate database before symlink new release.

before('deploy:symlink', 'artisan:migrate');
```
- once(): chỉ thực hiện task duy nhất 1 lần
```php
task('do', ...)->once();
```
- OnStage(): chỉ thực thi trên stage được chỉ định
```php
task('test', function () {
    ...
})->onStage('staging');
``` 
- onRoles(): thực thi lệnh với những luật đã được định nghĩa
Đầu tiên, chúng ta cần tạo một role
```
$ dep deploy --roles db
```
Sau đó, định nghĩa role này và sử dụng nó
```
task('migrate', function () {
    ...
})->onRoles('db');
```
- onHost(): chỉ định host cụ thể
```php
task('migrate', function () {
    ...
})->onHosts('db.domain.com');
```
- local():  Chỉ thực thi tác vụ chỉ một lần với máy cục bộ, độc lập với các host khác.
```php
task('build', function () {
    ...
})->local();
```

### 5. Host
Việc định nghĩa host rất đơn giản, chúng ta sẽ chỉ cần viết một hàm `host` là oke
```php
host('domain.com')
    ->stage('production')
    ->roles('app')
    ->set('deploy_path', '~/app');
```

### 6. Demo deploy 1 Laravel project

Đầu tiên chúng ta cần init một Laravel Project
```
$ composer create-project --prefer-dist laravel/laravel deployer-test
```
Oke giờ thì init Deployer thôi nào
```
$ cd deployer-pj
$ dep init -t Laravel
```
Vậy là chúng ta đã có 1 project Laravel `deployer-test` cùng 1 file `deploy.php`.

![](https://images.viblo.asia/aac375e0-0e03-4ebf-8762-5a312de247ab.png)

Đầu tiên mình sẽ cấu hình Host:
```php
// Hosts

host(<my_host>)
    ->user('deploy')
    ->stage('staging')
    ->set('deploy_path', '~/{{application}}')
    ->set('http_user', 'www-data')
    ->set('writable_mode', 'chmod')
    ->forwardAgent(false);  
```

Tiếp theo là set các params:
```php
// Project name
set('application', 'deploy-test');

// Project repository
set('repository', 'git@domain.com:HaiHaChan/deployer-test.git');

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', true); 

// Shared files/dirs between deploys 
add('shared_files', []);
add('shared_dirs', []);

// Writable dirs by web server 
add('writable_dirs', []);
```

Cuối cùng là định nghĩa một số tác vụ cần thiết:
```php
// Tasks

task('build', function () {
    run('cd {{release_path}} && composer install --dev');
    run('cd {{release_path}} && php artisan migrate --force');
    run('cd {{release_path}} && php artisan view:clear');
});

// [Optional] if deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');

// Migrate database before symlink new release.

before('deploy:symlink', 'artisan:migrate');
```
Vậy là xong. Giờ thì cực kì đơn giản, chúng ta chỉ cần chạy lệnh deploy thôi :)
```
$ dep deploy staging
```

### 8. Kết luận

Về cơ bản thì mình thấy việc tìm hiểu và sử dụng Deployer cũng như Rocketeer tương đối đơn giản. Hai deployment tool này đều yêu cầu cấu hình các thông tin của project kha khá giống nhau. Bên rocketeer thì có vẻ rõ ràng hơn, vì rocketeer phân tách khá rõ các phần, comment hướng dẫn cũng rất đầy đủ. Tất nhiên, chúng ta hoàn toàn có thể tách file và include chúng trong deploy.php với Deployer.
Thêm một điều hơi buồn nữa là Rocketeer đã 2 năm không được cộng đồng contribute. Nhưng mà điều này cũng không thể giúp mình đánh giá là deployment tool nào trong 2 bạn này là tốt hơn. Hiện tại thì mình thấy là tương đối giống nhau.

Hi vọng bài viết này có ích với mọi người. Cảm ơn và hẹn gặp lại các bạn ở các bài viết tiếp theo.

Tài liệu tham khảo:

https://deployer.org/docs/getting-started.html