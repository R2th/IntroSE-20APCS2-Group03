Như tôi đã giới thiệu trong bài [Tìm hiểu về Deployer](https://viblo.asia/p/tim-hieu-ve-deployer-cong-cu-deploy-huu-ich-cho-cac-du-an-php-WAyK8kV65xX) thì việc deploy là rất cần thiết cho bất kỳ một dự án công nghệ thông tin.
Hôm nay tôi xin sẽ hướng dẫn các bạn deploy một dự án PHP sử dụng Framework Laravel bằng công cụ [Deployer](https://deployer.org).
Vì sao tôi lại chọn Laravel mà không phải một framework khác?
Laravel là một framework PHP rất mạnh và phổ biến trong những năm gần đây, được cộng đồng mã nguồn mở đánh giá rất cao, và được sử dụng nhiều bởi các PHP programmer có kinh nghiệm. Chính vì vậy tôi đã quyết định hướng dẫn việc deploy cho Laravel

Sau khi cài đặt Deployer xong chúng ta sẽ tiến hành khởi tạo file deploy.php (Nếu bạn nào chưa cài đặt được thì có xem hướng dẫn tại [đây](https://viblo.asia/p/tim-hieu-ve-deployer-cong-cu-deploy-huu-ich-cho-cac-du-an-php-WAyK8kV65xX))

```
FRAMGIA\pham.duy.thanh@framgia0166-pc:~/code/my_project_laravel$ dep init

                                            
  Welcome to the Deployer config generator  
                                            


 This utility will walk you through creating a deploy.php file.
 It only covers the most common items, and tries to guess sensible defaults.
 
 Press ^C at any time to quit.

 Please select your project type [Common]:
  [0 ] Common
  [1 ] Laravel
  [2 ] Symfony
  [3 ] Yii
  [4 ] Yii2 Basic App
  [5 ] Yii2 Advanced App
  [6 ] Zend Framework
  [7 ] CakePHP
  [8 ] CodeIgniter
  [9 ] Drupal
  [10] TYPO3

```
Bạn có thể nhìn thấy khi thực hiện câu lệnh init, deployer hỗ trợ chúng ta rất nhiều framework như: Laravel, Symfony, Yii,...
Chúng ta sẽ lựa chọn \[1] để chon framework Laravel mà chúng ta đang sử dụng

```
Repository [https://github.com/user_name/project.git]:
 > https://github.com/user_name/project.git

 Contribute to the Deployer Development
 
 In order to help development and improve Deployer features in,
 Deployer has a setting for collection of usage data. This function
 collects anonymous usage data and sends it to Deployer. The data is
 used in Deployer development to get reliable statistics on which
 features are used (or not used). The information is not traceable
 to any individual or organization. Participation is voluntary,
 and you can change your mind at any time.
 
 Anonymous usage data contains Deployer version, php version, os type,
 name of the command being executed and whether it was successful or not,
 exception class name, count of hosts and anonymized project hash.
 
 If you would like to allow us to gather this information and help
 us develop a better tool, please add the code below.
 
     set('allow_anonymous_stats', true);
 
 This function will not affect the performance of Deployer as
 the data is insignificant and transmitted in separate process.

 Do you confirm? (yes/no) [yes]:
 > yes
Successfully created: /home/pham.duy.thanh/code/my_laravel_project/deploy.php
```
Sau khi đã lựa chọn được framework, tiếp đến chúng ta sẽ cài đặt repository chưa source code của ta trên github. Và quá trình khởi tạo file deploy.php đã thành công

Sử dụng lệnh sau để xem tất cả các command của Deployer
```
FRAMGIA\pham.duy.thanh@framgia0166-pc:~/code/my_laravel_project$ dep list
Deployer 6.0.5

Usage:
  command [options] [arguments]

Options:
  -h, --help               Display this help message
  -q, --quiet              Do not output any message
  -V, --version            Display this application version
      --ansi               Force ANSI output
      --no-ansi            Disable ANSI output
  -n, --no-interaction     Do not ask any interactive question
  -f, --file[=FILE]        Specify Deployer file
      --tag=TAG            Tag to deploy
      --revision=REVISION  Revision to deploy
      --branch=BRANCH      Branch to deploy
  -v|vv|vvv, --verbose     Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug

Available commands:
  autocomplete              
  build                     
  cleanup                   Cleaning up old releases
  deploy                    Deploy your project
  help                      Displays help for a command
  init                      Initialize deployer in your project
  list                      Lists commands
  rollback                  Rollback to previous release
  run                       Run any arbitrary command on hosts
  self-update               Updates deployer.phar to the latest version
  ssh                       Connect to host through ssh
 artisan
  artisan:cache:clear       Execute artisan cache:clear
  artisan:config:cache      Execute artisan config:cache
  artisan:db:seed           Execute artisan db:seed
  artisan:down              Enable maintenance mode
  artisan:migrate           Execute artisan migrate
  artisan:migrate:fresh     Execute artisan migrate:fresh
  artisan:migrate:rollback  Execute artisan migrate:rollback
  artisan:migrate:status    Execute artisan migrate:status
  artisan:optimize          Execute artisan optimize
  artisan:queue:restart     Execute artisan queue:restart
  artisan:route:cache       Execute artisan route:cache
  artisan:storage:link      Execute artisan storage:link
  artisan:up                Disable maintenance mode
  artisan:view:clear        Execute artisan view:clear
 config
  config:current            Show current paths
  config:dump               Print host configuration
  config:hosts              Print all hosts
 deploy
  deploy:clear_paths        Cleaning up files and/or directories
  deploy:copy_dirs          Copy directories
  deploy:lock               Lock deploy
  deploy:prepare            Preparing host for deploy
  deploy:public_disk        Make symlink for public disk
  deploy:release            Prepare release. Clean up unfinished releases and prepare next release.
  deploy:shared             Creating symlinks for shared files and dirs
  deploy:symlink            Creating symlink to release
  deploy:unlock             Unlock deploy
  deploy:update_code        Update code
  deploy:vendors            Installing vendors
  deploy:writable           Make writable dirs

```

Các bạn có để ý thấy trong deployer có một số lệnh có tiền tố là artisan giống giống với các command artisan trong Laravel.
Xin thưa chính là chúng, ở bước khởi tạo file deploy các bạn đã lựa chọn Laravel framework, chính lúc này deployer đã tích hợp sẵn các lệnh artisan trong laravel thành các task trong deployer. Các bạn thấy có tiện lợi và đơn giản không?
Qua đó chúng ta không phải mất thời gian để tạo các task cho việc sử dụng các command artisan trong laravel


Bây giờ ta cần chỉnh sửa một số thông số trong file deploy.php mà ta mong muốn
```php
<?php
namespace Deployer;

require 'recipe/laravel.php';

// Project name
set('application', 'my_project');

// Project repository
set('repository', 'https://github.com/user_name/project.git');

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', true);

// Shared files/dirs between deploys 
add('shared_files', []);
add('shared_dirs', []);

// Writable dirs by web server 
add('writable_dirs', []);


// Hosts

host('project.com')
    ->set('deploy_path', '~/{{application}}');

// Tasks

task('build', function () {
    run('cd {{release_path}} && build');
});

// [Optional] if deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');

// Migrate database before symlink new release.

before('deploy:symlink', 'artisan:migrate');

```
Các bạn cần cài đặt Project name, thay đổi repository, host ...
Sau khi thay đổi ta sẽ được file deploy.php hoàn chỉnh
```php
<?php
namespace Deployer;

require 'recipe/laravel.php';

// Project name
set('application', 'my_laravel_project');

// Project repository
set('repository', 'git@github.com:procode/my_project.git');

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', true);

// Shared files/dirs between deploys 
add('shared_files', []);
add('shared_dirs', []);

// Writable dirs by web server 
add('writable_dirs', []);


// Hosts

host('127.0.0.1')
    ->set('deploy_path', '~/var/www/{{application}}');

// Tasks

task('build', function () {
    run('cd {{release_path}} && build');
});

// [Optional] if deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');

// Migrate database before symlink new release.

before('deploy:symlink', 'artisan:migrate');

```

Và cuối cùng ta chỉ cần sử dụng command để deploy
```
FRAMGIA\pham.duy.thanh@framgia0166-pc:~/code/my_project$ dep deploy --branch=release-xxx
✈︎ Deploying release-xxx on 127.0.0.1
➤ Executing task deploy:prepare
✔ Executing task deploy:lock
✔ Executing task deploy:release
➤ Executing task deploy:update_code
Counting objects: 26832, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (8750/8750), done.
Writing objects: 100% (26832/26832), done.
Total 26832 (delta 16801), reused 26832 (delta 16801)
Connection to 127.0.0.1 closed.
✔ Ok
✔ Executing task deploy:shared
✔ Executing task deploy:vendors
✔ Executing task deploy:writable
✔ Executing task artisan:storage:link
✔ Executing task artisan:view:clear
✔ Executing task artisan:cache:clear
✔ Executing task artisan:config:cache
✔ Executing task artisan:optimize
✔ Executing task deploy:symlink
✔ Executing task deploy:unlock
✔ Executing task cleanup
Successfully deployed!

```
Bạn hãy để ý command deploy, Deployer cho phép chúng ta chỉ định branch mà chúng ta mong muốn deploy. Ngoài ra chúng ta thay vì sử dụng "--branch", chúng ta cũng có thể sử dụng tuy chọn "--tag" cho việc deploy lên production


Như vậy ta đã hoàn thành xong việc cấu hình và deploy cho Laravel project. Hi vọng hướng dẫn này của mình sẽ giúp các bạn cải thiện được quá trình deploy lên các môi trường, đặc biệt là môi trường production sau này