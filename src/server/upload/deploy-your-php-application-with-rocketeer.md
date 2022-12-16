- Rocketeer là một công cụ hiện đại mang lại một cách tiếp cận tuyệt vời cho nhu cầu deployment của bạn. Đó là để chạy các tác vụ và quản lý ứng dụng của bạn trên các môi trường và server khác nhau. Nó được lấy cảm hứng từ `Capistrano` và framework `Laravel`.

## **1. Cài đặt** 
- Bạn có thể cài đặt Rocketeer theo hai cách khác nhau. Hoặc bạn  [tải xuống tệp phar](http://rocketeer.autopergamene.eu/versions/rocketeer.phar)  và làm cho tệp thực thi hoặc bạn cài đặt nó thông qua Composer.
- Download file rocketeer.phar
    ```
    $ wget http://rocketeer.autopergamene.eu/versions/rocketeer.phar
    $ chmod +x rocketeer.phar
    $ mv rocketeer.phar /usr/local/bin/rocketeer
    ```
- Hoặc cài đặt với Composer:
    ```
    $ composer require anahkiasen/rocketeer --dev
    ```
- Tôi không khuyên bạn nên cài đặt nó global. Giữ nó ở cấp độ kho lưu trữ sẽ đảm bảo rằng mỗi người triển khai đang chạy cùng một phiên bản. Những gì tôi làm đề nghị là bạn thêm  `vendor/bin` vào `PATH` của bạn. Sau đó, bạn có thể sử dụng nó bằng cách gõ `rocketeer` vào thư mục gốc dự án của bạn.

## **2. Bắt đầu**

 - Trước tiên, bạn khởi động các thư mục và tập tin để cấu hình. Bạn làm điều này bằng cách chạy  `rocketeer ignite` trong thư mục gốc của dự án của bạn.

- Khi ứng dụng của bạn kích hoạt, công cụ sẽ tạo một thư mục `.rocketeer` trong dự án của bạn. Nội dung của thư mục sẽ trông như sau:

    ```
    | .rocketeer
    | -- config.php
    | -- hooks.php
    | -- paths.php
    | -- remote.php
    | -- scm.php
    | -- stages.php
    | -- strategies.php
    ```

- Đây là tất cả các tệp cấu hình bạn cần để bắt đầu thiết lập triển khai của bạn. Bất cứ khi nào tôi tham khảo một tập tin cấu hình từ đây trở đi, nó tồn tại trong thư mục `.rocketeer/`.

## **3. Cấu trúc thư mục trên server** 
- Điều quan trọng là phải hiểu cách Rocketeer quản lý cấu trúc thư mục của nó ở phía máy chủ, vì nó hơi khác một chút so với thiết lập thông thường. Nó sử dụng một vài thư mục để quản lý các khía cạnh nhất định của việc triển khai, vì vậy nó có thể có hiệu quả ở những gì nó làm. Bạn chỉ định đường dẫn đến nơi bạn muốn triển khai ứng dụng của mình trên máy chủ của mình và công cụ sẽ xử lý phần còn lại. Thư mục đó sẽ trông như thế này, nếu bạn có `/var/www/app` như thư mục ứng dụng của bạn.
    ```
    | /var/www/app
    |  | -- current => /var/www/app/releases/20160103183754
    |  | -- releases
    |  |  | -- 20160101161243
    |  |  |  |-- uploads => /var/www/app/shared/uploads
    |  |  | -- 20160103183754
    |  |  |  |-- uploads => /var/www/app/shared/uploads
    |  | -- shared
    |  |  | -- uploads
    ```

- Thư mục quan trọng nhất là thư mục `current` trỏ đến bản phát hành mới nhất của bạn. Đó là nơi gốc tài liệu của máy chủ web của bạn nên được đặt thành. Vậy điều gì xảy ra khi bạn triển khai?
    - Công cụ tạo thư mục có dấu thời gian trong thư mục `releases` .
    - Hoàn thành tất cả các tác vụ để tạo bản phát hành sẵn sàng.
    - Cập nhật symbolic link `current` cho bản release mới.
- Quá trình này làm cho việc triển khai của bạn trở nên minh bạch đối với người dùng. Sự chuyển đổi giữa các bản phát hành gần như ngay lập tức, thường được gọi là atomic deployments.

- Một số dữ liệu nên được giữ liên tục giữa các lần triển khai của bạn. Ví dụ: đây có thể là file upload, sessions và logs. Những tệp hoặc thư mục đó đi vào thư mục `shared`. Công cụ tạo ra các symbolic link bên trong mỗi bản phát hành cho các bản phát hành bạn đã định cấu hình.

## **4. Events** 

- Sự kiện thúc đẩy công cụ và tất cả các chiến lược và nhiệm vụ kích hoạt  trước  và  sau  sự kiện khi chúng chạy. Họ cũng cung cấp một  sự kiện dừng đặc biệt  khi một nhiệm vụ không thành công. Điều này có thể là ví dụ `dependencies.halt`, hoặc `deploy.halt` cho thất bại chung. Điều này cho phép chúng ta nối vào quá trình mà chúng ta cần.

- Các sự kiện mặc định xảy ra trong quá trình triển khai là:

    - `deploy.before`: trước khi bất cứ điều gì xảy ra.
    - `create-release.before`: trước khi nó tạo một thư mục release mới.
    - `create-release.after`: sau khi tạo thư mục bản release mới.
    - `dependencies.before`: trước khi cài đặt hoặc cập nhật các phụ thuộc.
    - `dependencies.after`: sau khi cài đặt hoặc cập nhật các phụ thuộc.
    - `test.before`: trước khi chạy test.
    - `test.after`: sau khi chạy test.
    - `migrate.before`: trước khi chạy migrate DB. Có lẽ bạn muốn sao lưu cơ sở dữ liệu của bạn?
    - `migrate.after`: sau khi chạy migrate DB.
    - `deploy.before-symlink`: trước khi symlinking bản release là bản release hiện tại.
    - `deploy.after`: đã hoàn thành. Bạn có thể thông báo deploy hoàn thành.
- Chúng ta cũng có thể tạo ra những sự kiện riêng của mình mà chúng ta có thể fire và listen. Nhưng từng trên cũng đã là quá đủ rồi đúng không?

## **5. Tasks** 
- Task có thể là một tập hợp các hướng dẫn để thực hiện như một bước trong triển khai. Nếu chúng ta nhìn vào một số các class mà công cụ này cung cấp như  `Deploy`,  `Setup`,  `Migrate`,  `Rollback`, và  `Dependencies`. Khi bạn triển khai, lệnh deploy là một task với các sub-task.

#### Types of Tasks
- Đây là nơi bạn sẽ bắt đầu thấy cách tích hợp công cụ này với PHP, vì bạn sẽ viết các tác vụ bằng ngôn ngữ. Bạn có thể tạo các tác vụ của riêng mình theo ba cách khác nhau:

#### Arbitrary terminal commands
- Chẳng hạn như bạn có thể chạy  `gulp build  ---production`.

#### Closures
- Nếu bạn cần một chút linh hoạt hoặc phức tạp hơn, bạn có thể viết một task như một closure (hàm ẩn danh). Giả sử bạn muốn tạo tài liệu cho API trong quá trình triển khai.

    ```
    function($task) {
        return $task->runForCurrentRelease('apigen generate  source src  destination api');
    }
    ```

#### Classes
- Đối với các task phức tạp hơn, bạn nên sử dụng tùy chọn để tạo các class cho các tác vụ. Bạn tạo một class và extend `Rocketeer\Abstracts\AbstractTask`. Sau đó, bạn phải cung cấp ít nhất một mô tả và một  `execute()` phương pháp. Ví dụ:
    ```
    namespace MyDeployableApp\Deploy\Tasks;

    class HelloWorld extends \Rocketeer\Abstracts\AbstractTask
    {
        /**
         * Description of the Task
         *
         * @var string
         */
        protected $description = 'Says hello to the world';

        /**
         * Executes the Task
         *
         * @return void
         */
        public function execute() {
            $this->explainer->line('Hello world!');

            return true;
        }
    }
    ```

- Lưu ý rằng bạn phải tự đăng ký các lớp nhiệm vụ. Hoặc là bạn làm điều này thông qua file `hooks.php` và thêm nó vào `custom` mảng ...
    ```
    'custom' => array('MyDeployableApp\Deploy\Tasks\HelloWorld',),
    ```
- ... hoặc bạn có thể làm điều này thông qua facade:
    ```
    Rocketeer::add('MyDeployableApp\Deploy\Tasks\HelloWorld');
    ```
- Một khi bạn đăng ký nó, bạn có thể thực hiện nó:
    ```
    $ rocketeer hello:world
    staging/0 | HelloWorld (Says hello to the world)
    staging/0 |=> Hello world!
    Execution time: 0.004s
    ```
#### Defining Tasks
- Cách dễ nhất để định nghĩa task của bạn là trong file `hooks.php`. Nó cung cấp hai mảng cho điều này, chỉ định thực hiện nhiệm vụ trước hoặc sau một số sự kiện nhất định.

    ```
    'before' => [
        'setup' => [],
        'deploy' => ['hello:world'],
        'cleanup' => [],
    ],
    ```

## **6. Strategies** 
- Đây là nơi  các strategies đi vào hoạt động. Một strategies là việc thực hiện cụ thể một nhiệm vụ, chẳng hạn như chạy Gulp. Nhiệm vụ có strategies mặc định với tùy chọn chạy các strategies khác thông qua CLI. Chúng tôi có thể liệt kê các Strategies có sẵn như sau:
    ```
    $ rocketeer strategies
    +--------------+----------------+-----------------------------------------------------------------------+
    | Strategy     | Implementation | Description                                                           |
    +--------------+----------------+-----------------------------------------------------------------------+
    | check        | Php            | Checks if the server is ready to receive a PHP application            |
    | check        | Ruby           | Checks if the server is ready to receive a Ruby application           |
    | check        | Node           | Checks if the server is ready to receive a Node application           |
    | deploy       | Clone          | Clones a fresh instance of the repository by SCM                      |
    | deploy       | Copy           | Copies the previously cloned instance of the repository and update it |
    | deploy       | Sync           | Uses rsync to create or update a release from the local files         |
    | test         | Phpunit        | Run the tests with PHPUnit                                            |
    | migrate      | Artisan        | Migrates your database with Laravel's Artisan CLI                     |
    | dependencies | Composer       | Installs dependencies with Composer                                   |
    | dependencies | Bundler        | Installs dependencies with Bundler                                    |
    | dependencies | Npm            | Installs dependencies with NPM                                        |
    | dependencies | Bower          | Installs dependencies with Bower                                      |
    | dependencies | Polyglot       | Runs all of the above package managers if necessary                   |
    +--------------+----------------+-----------------------------------------------------------------------+
    ```

## **7. Connections & Stages** 
- Connections là một máy chủ mà bạn deploy ứng dụng của bạn lên. Nó thường được gọi là một môi trường, ví dụ production và staging. Cấu hình các kết nối này rất dễ dàng. Bạn có thể làm điều đó thông qua một mảng lồng nhau hoặc bằng cách giữ các tệp riêng biệt cho mỗi kết nối. Mỗi kết nối cũng có thể có nhiều máy chủ trong đó.

- Stages giống như các Connections bên trong các Connections, một loại "Connections". Bạn có thể thiết lập staging và môi trường production trên một máy chủ duy nhất với việc sử dụng các Stages. Vì vậy, thay vì có hai connections riêng biệt, bạn có một kết nối với hai giai đoạn trong đó.

## **8. Plugins** 
- Một tính năng tuyệt vời là chúng tôi có thể mở rộng quy trình của mình bằng cách sử dụng plugin. Có một vài cái chính thức để tích hợp với  Laravel ,  Slack ,  HipChat  và  Campfire . Nhưng không phải là nhiều trên [Packagist](https://packagist.org/search/?q=rocketeer) . Cài đặt plugin thông qua CLI:

    ```
    $ rocketeer plugin:install rocketeers/rocketeer-slack
    ```
- Mặc dù có một số giới hạn các plugin, nhưng nó vẫn còn chỗ cho việc phát triển các plugin trong tương lai. Nó nói về một triết lý tốt. Và tại sao không phát triển một của riêng bạn?

## **9. Setting**
- Để ứng dụng của bạn không hoạt động, bạn cần một số cấu hình cơ bản. Bạn cần phải nói với Rocketeer nơi để tìm ứng dụng của bạn và nơi nó sẽ triển khai nó. Hãy bắt đầu bằng cách đặt tên ứng dụng và định cấu hình máy chủ sản xuất `config.php`.

    ```
    'application_name' => 'my-deployable-app',

    // [...]

    'connections' => [
        'staging' => [
            'host' => 'staging.my-deployable-app.com',
            'username' => '',
            'password' => '',
            'key' => '/Users/yourname/.ssh/id_rsa',
            'keyphrase' => '',
            'agent' => '',
            'db_role' => true,
        ],
        'production' => [
            'host' => 'www.my-deployable-app.com',
            'username' => '',
            'password' => '',
            'key' => '/Users/yourname/.ssh/id_rsa',
            'keyphrase' => '',
            'agent' => '',
            'db_role' => true,
        ],
    ],
    ```
- Bây giờ bạn có một tên ứng dụng và một máy chủ để triển khai ứng dụng của bạn. Thiết lập này sử dụng xác thực khóa SSH, nhưng bạn cũng có thể kết nối với tên người dùng và mật khẩu. Để được nhắc nhập tên người dùng và mật khẩu, hãy đặt `'key' => ''`. Công cụ sẽ lưu trữ thông tin đăng nhập trên máy cục bộ của bạn và sử dụng chúng mỗi lần sau này. Tôi không khuyên bạn nên thiết lập một tên người dùng và mật khẩu trong tập tin cấu hình, bởi vì bạn không bao giờ muốn thông tin đăng nhập cam kết vào kho lưu trữ của bạn.

- Những gì bạn nên làm là thay đổi default connection mà bạn deploy. Việc thiết lập mặc định cho production không phải là lý tưởng. Bạn không muốn deploy production một cách tình cờ. Vì vậy, thay đổi giá trị thành `staging`.
    ```
    'default' => ['staging'],
    ```
- Theo mặc định, gốc được đặt thành `/home/www`. Với tên ứng dụng này, nó sẽ triển khai nó  `/home/www/my-deployable-app`. Nếu bạn muốn thay đổi thư mục gốc của mình, bạn có thể thay đổi thư mục này `remote.php`.

    ```
    // Deploys to /var/www/my-deployable-app/
    'root_directory' => '/var/www/',
    ```

- Trong cùng một tệp, bạn có khả năng ghi đè tên ứng dụng và chỉ định một thư mục cho ứng dụng của bạn.

    ```
    // Deploys to /var/www/tutsplus-tutorial
    'app_directory' => 'tutsplus-tutorial',
    ```
- Thiết lập repo lưu trữ source code của bạn `scm.php`. Theo mặc định, nó sử dụng `Git`, nhưng nó cũng hỗ trợ `SVN`. Bạn nói với nó địa chỉ của kho lưu trữ của chúng tôi và cung cấp thông tin đăng nhập nếu cần thiết. Tôi đề nghị bạn sử dụng xác thực khóa SSH ở đây là tốt, và để trống tên người dùng và mật khẩu.
    ```
    'repository' => 'git@github.com:owner/name.git',
    'username'   => '',
    'password'   => '',
    'branch'     => 'master',
    ```

## **10. Connection & Stages Specific Configuration**
- Trong hầu hết các trường hợp, bạn không muốn có cùng một tùy chọn cấu hình cho tất cả các connection hoặc các stages của bạn. Ví dụ, bạn muốn deploy một nhánh khác cho môi trường test. Rocketeer cho phép bạn ghi đè các giá trị cấu hình cho các connection và các stages sử dụng `config.php`. Để triển khai một nhánh được gọi là `staging` trên connection staging của bạn, bạn thực hiện điều này:

    ```
    'on' => [
        'connections' => [
            'staging' => [
                'scm' => [
                    'branch' => 'staging',
                ]
            ]
        ],
    ],
    ```
- Nó sử dụng một mảng lồng nhau để ghi đè lên các giá trị cấu hình. Bên dưới `staging` khóa, tìm khóa tương ứng trong tệp bạn muốn thay đổi. Trong trường hợp này nó `branch` ở trong `scm.php`.

## **11. Deploy**
- Bây giờ bạn có mọi thứ được thiết lập để triển khai thành công. Bạn chưa đáp ứng các yêu cầu của mình để triển khai hoàn chỉnh, nhưng nó đủ để ứng dụng của bạn được nhân bản vào máy chủ của bạn và phục vụ cho người dùng cuối. Trước tiên, bạn có thể thực hiện check để xem máy chủ của bạn có đáp ứng các yêu cầu hay không.

    ```
    $ rocketeer check
    ```
- Nếu mọi thứ đều ổn, bạn có thể triển khai bằng cách chạy:
    ```
    $ rocketeer deploy
    ```
    
- Vì đây là lần triển khai đầu tiên của bạn, Rocketeer sẽ đảm bảo rằng mọi thứ đều tăng lên. Công cụ này tạo ra các thư mục cần thiết và ứng dụng của chúng ta sẽ sống. Nếu mọi thứ đều trôi chảy, bạn sẽ có một bản dựng đầy đủ ứng dụng của bạn trên máy chủ.

- Nếu bạn thay đổi default connection để thành staging trong phần trước, nó sẽ luôn deploy lên staging. Đó là, tất nhiên, trừ khi bạn nói với nó để deploy đến một nơi khác. Khi bạn muốn deploy trên một connection khác hoặc nhiều connections, bạn sử dụng đối số `--on`.
    ```
    # Deploy to production
    $ rocketeer deploy --on="production"

    # Deploy to staging and production
    $ rocketeer deploy --on="staging,production"
    ```
- Bạn muốn có một cái nhìn vào những gì sẽ xảy ra trên server của bạn một khi bạn nhấn nút? Sử dụng `--pretend` cờ để cho phép công cụ cho bạn biết những gì nó sẽ thực thi trên máy chủ.
    ```
    $ rocketeer deploy --pretend
    ```
    
## **12. Rollback.**
- Khi bạn cần rollback về bản release trước đó, bạn chỉ cần chạy lệnh:
    ```
    $ rocketeer rollback
    ```

- Vì nó lưu trữ một số bản build nên việc thực hiện quay lại nhanh. Nó thay đổi symbolic link của  current bản phát hành trước đó.

## **13. Shared Directories**
- Việc thiết lập các thư mục chia sẻ rất đơn giản - chỉ cần thêm chúng vào mảng `shared` tìm thấy trong đó `remote.php`. Rocketeer sẽ tạo và liên kết các thư mục này cho bạn trong các triển khai sau. Các đường dẫn được chỉ định phải liên quan đến thư mục gốc của bạn.
    ```
    'shared' => [
        'storage/logs',
        'storage/sessions',
        'storage/uploads',
        '.env',
    ],
    ```
    
## **14. Writable Directories**
- Hầu hết các thư mục được chia sẻ cũng sẽ cần máy chủ web để có thể ghi vào chúng. Ghi logs, session hoặc file upload thường là tác vụ được thực hiện bởi bất kỳ ứng dụng nào. Những bạn thêm vào mảng `permissions.files` trong `remote.php`.

    ```
    'permissions' => [
        'files' => [
            'storage/sessions',
            'storage/logs',
            'storage/uploads',
        ],
        // [...]
    ],
    ```

## **15. Install or Update Dependencies**
- Bạn muốn cài đặt tất cả các dependencies vào `staging` và công cụ sử dụng flag `--no-dev`. Trong `strategies.php`, bạn có thể tìm thấy key `composer`, cho công cụ biết cách thực thi Composer. Sau đó, bạn có thể ghi đè điều này trong `config.php`:

    ```
    use Rocketeer\Binaries\PackageManagers\Composer;

    // [...]

    'on' => [
        // [...]
        'connections' => [
            'staging' => [
                'strategies' => [
                    'composer' => [
                        'install' => function (Composer $composer, $task) {
                            return $composer->install([], ['--no-interaction' => null, '--prefer-dist' => null]);
                        }
                    ],
                ],
            ]
        ],
    ],
    ```
## **16. Database Migrations**
- Migrating databases thường là điều bạn muốn làm khi bạn có bản release hoàn chỉnh, ngay trước khi nó liên kết đến hiện tại. Dù bạn sử dụng công cụ nào, bạn có thể yêu cầu nó chạy trước `deploy.before-symlink`. Bạn có thể làm điều này trong `events.php`, mà bạn có thể tạo ra nếu nó không tồn tại.

    ```
    use Rocketeer\Facades\Rocketeer;

    // Laravel
    Rocketeer::addTaskListeners('deploy', 'before-symlink', function ($task) {
        $task->runForCurrentRelease('php artisan migrate');
    });

    // Symfony2
    Rocketeer::addTaskListeners('deploy', 'before-symlink', function ($task) {
        $task->runForCurrentRelease('php app/console doctrine:migrations:migrate');
    });

    // Stand-alone Doctrine
    Rocketeer::addTaskListeners('deploy', 'before-symlink', function ($task) {
        $task->runForCurrentRelease('doctrine migrations:migrate --no-interaction');
    });
    ```

## **17. Running Tests**
- Chạy test trong một quá trình deploy là một cách tuyệt vời để đảm bảo rằng ứng dụng không có lỗi. Theo mặc định, công cụ này sử dụng `PHPUnit` và bạn có thể cấu hình như sau:

    ```
    'after' => [
        'setup'        => [],
        'deploy'       => [],
        'dependencies' => ['test'],
        'cleanup'      => [],
    ],
    ```
- Bây giờ chúng ta sẽ thấy nó đang thực hiện PHPUnit trên mỗi lần deploy và trong trường hợp có bất kỳ test lỗi nào, nó sẽ hủy bỏ.

    ```
    staging/0 |---- Test (Run the tests on the server and displays the output) fired by dependencies.after
    staging/0 |------ Test/Phpunit (Run the tests with PHPUnit)
    $ cd /var/www/my-deployable-app/releases/20160129220251$ /var/www/my-deployable-app/releases/20160129220251/vendor/bin/phpunit --stop-on-failure
    [deploy@staging.mydeployableapp.com] (staging) PHPUnit 4.8.21 by Sebastian Bergmann and contributors.
    [deploy@staging.mydeployableapp.com] (staging)
    [deploy@staging.mydeployableapp.com] (staging) .
    [deploy@staging.mydeployableapp.com] (staging) Time: 4.79 seconds, Memory: 6.00Mb
    [deploy@staging.mydeployableapp.com] (staging) OK (1 test, 1 assertion)
    [deploy@staging.mydeployableapp.com] (staging)staging/0 |=====> Tests passed successfully
    ```

## **18. Front-End Build Tools**
- Thường thì các ứng dụng của chúng ta không chỉ có back end, trừ khi chúng là một API REST chẳng hạn. Chạy các công cụ xây dựng cho giao diện người dùng của chúng tôi là một task phổ biến với các công cụ như  `Grunt`, `Gulp` hoặc `Webpack` .Làm cho phần này của quá trình deploy của chúng tôi không có gì là quan trọng hơn là sử dụng một hook để chạy các lệnh như:

    ```
    'after' => [
        'setup'        => [],
        'deploy'       => [],
        'dependencies' => ['gulp build'],
        'cleanup'      => [],
    ],
    ```

- Giao diện người dùng cũng thường dựa vào các dependencies, vì vậy hãy chạy các công cụ sau khi install hoặc update chúng.

    > **Tài liệu tham khảo**
    > 
    > [ROCKETEER](http://rocketeer.autopergamene.eu/)
    >
    > [Deploy Your PHP Application With Rocketeer](https://code.tutsplus.com/articles/deploy-your-php-application-with-rocketeer--cms-25838)