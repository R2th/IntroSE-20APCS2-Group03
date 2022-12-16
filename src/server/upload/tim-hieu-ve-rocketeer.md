![](https://images.viblo.asia/06041a5e-9a73-48f0-9b11-c3bc61a94b84.png)

**Rocketeer** Rocketeer là một deploying tool nhanh chóng và dễ dàng cho các developer. Rocketeer là một package PHP, lấy cảm hứng từ framework Laravel. Không chỉ dừng lại ở việc hỗ trợ các dự án PHP, Rocketeer còn có thể deploy bất kỳ dự án nào từ các trang web HTML/CSS nhỏ đến các ứng dụng Rails lớn,...

**Ưu điểm của Rocketeer**

-  Đa năng (Versatile): khả năng hỗ trợ multiple connections, multiserver connections, multiple stages cho mỗi server, etc.
-  Nhanh chóng (Fast): xử lý các tác vụ theo hàng đợi và chạy chúng song song trên tất cả các server và stages.
-  Linh hoạt (Modulable): có thể thêm các custom tasks và components, đồng thời mọi phần core của Rocketeer đều có thể hoán đổi, mở rộng,...
-  Cấu hình sẵn (Preconfigured): Rocketeer được tạo ra để hỗ trợ deploy hệ thống với các cấu hình mặc định thông minh và các tác vụ được tích hợp từ trước như cài đặt các phần phụ thuộc cho ứng dụng của bạn.
-  Mạnh mẽ (Powerful): releases management, server checks, rollbacks, etc. Mọi tính năng bạn mong đợi từ một *deployment tool* đều được hỗ trợ bởi Rocketeer.

### 1. Cài đặt rocketeer

```bash
$ wget http://rocketeer.autopergamene.eu/versions/rocketeer.phar
$ chmod +x rocketeer.phar
$ mv rocketeer.phar /usr/local/bin/rocketeer
```

Ngoài ra, bạn cũng có thể cài riêng rocketeer cho dự án với composer bằng lệnh:
```bash
$ composer require anahkiasen/rocketeer
```

### 2. Các lệnh cơ bản

```bash
$ php rocketeer
  check        Check if the server is ready to receive the application
  cleanup      Clean up old releases from the server
  current      Display what the current release is
  deploy       Deploys the website
  flush        Flushes Rocketeer's cache of credentials
  help         Displays help for a command
  ignite       Creates Rocketeer's configuration
  list         Lists commands
  rollback     Rollback to the previous release, or to a specific one
  setup        Set up the remote server for deployment
  strategies   Lists the available options for each strategy
  teardown     Remove the remote applications and existing caches
  test         Run the tests on the server and displays the output
  update       Update the remote server without doing a new release
```

### 3. Init Rocketeer

Cấu hình Rocketeer cho dự án tương đối đơn giản. Đầu tiên, bạn hãy di chuyển đến thư mục dự án và gõ lệnh:
```bash
$ rocketeer ignite
```
Lệnh này sẽ init ra thư mục cấu hình rocketeer  sau khi bạn trả lời những câu hỏi sau:
```bash
1. No connections have been set, please create one: (production)
// Hỏi tên kết nối, ví dụ như "prodution" hoặc "staging". Mặc định: production
2. No host is set for [production/0], please provide one:
//Hỏi cách kết nối tới server, là tên miền hoặc địa chỉ IP cho kết nối ở câu hỏi 1.
3. No username is set for [production/0], please provide one:
4. No password or SSH key is set for [production/0], which would you use? (key) [key/password]
Please enter the full path to your key (/home/tran.thi.hai.ha/.ssh/id_rsa)
If a keyphrase is required, provide it
// Câu 3 và 4 là cách thức để đăng nhập server, có thể sử dụng ssh thay cho username và password
5. No repository is set for [repository], please provide one:
// Hỏi repository của dự án
6. No username is set for [repository], please provide one:
7. No password is set for [repository], please provide one:
Câu 6 và 7 là cách thức xác thực cho repository
8. What is your application's name ? (my-app)
// Hỏi tên ứng dụng cần cấu hình, mặc định là tên thư mục dự án.
```

Sau khi bạn trả lời hết các câu hỏi trên, một thư mục `.rocketeer` sẽ được sinh ra, với cấu trúc thư mục như vầy:
```
| .rocketeer
| -- config.php
| -- hooks.php
| -- paths.php
| -- remote.php
| -- scm.php
| -- stages.php
| -- events.php
| -- strategies.php
```

### 4. Các files cấu hình Rocketeer
**config.php**

Đây là tệp cài đặt cấu hình chính, định nghĩa các kết nối tới server. Phần quan trọng nhất bạn cần chú ý trong file này là config connections.
```php
// The various connections you defined
// You can leave all of this empty or remove it entirely if you don't want
// to track files with credentials : Rocketeer will prompt you for your credentials
// and store them locally
'connections' => array(
  'production' => array(
    'host'      => 'my-server.com',
    'username'  => 'johndoe',
    'password'  => '',
    'key'       => '/Users/johndoe/.ssh/id_rsa',
    'keyphrase' => '',
  ),
),
```

Có 2 cách kết nối tới server là dùng `password` hoặc `SSH key`. Nếu bạn kết nối bằng `password`, bạn có thể để trống `key` và `keyphrase`. Ngược lại, bạn có thể để trống `password`.

Rocketeer cũng hộ trợ bạn config nhiều kết nối và cả kết nối tới nhiều servers:
```php
'connections' => array(
  'production' => array(
    'servers' => array(
      array(
        'host'      => 'first-server.com',
        'username'  => 'johndoe',
        'password'  => '',
        'key'       => '/Users/johndoe/.ssh/id_rsa',
        'keyphrase' => '',
      ),
      array(
        'host'      => 'second-server.com',
        'username'  => 'johndoe',
        'password'  => '',
        'key'       => '/Users/johndoe/.ssh/id_rsa',
        'keyphrase' => '',
      ),
  ),
  'staging' => array(
    'host' => 'staging.my-server.com',
  ),
),
```
Nếu bạn muốn, bất cứ khi nào bạn thực thi một tác vụ, Rocketeer sẽ thực thi nó trên tất cả các kết nối, thì bạn có thể sửa config thành: 
```php
// The default remote connection(s) to execute tasks on
'default' => array('production', 'staging'),
```

Và để chỉ rõ kết nối được thực thi khi thực hiện tác vụ thì bạn có thể thêm options `--on=<connection_name>` sau câu lệnh. Ví dụ, lệnh deploy sau đây sẽ chỉ được thực thi trên mỗi staging:

```bash
$ rocketeer deploy --on="staging"
```

**remote.php**

Đây là file chứa config đường dẫn tới thư mục dự án sẽ deploy trên server và những file/folder mà chúng ta muốn cache lại sau mỗi lần deploy, ví dụ như vendor, node_modules, storage, ...

Trường `root_directory` định nghĩa đường dẫn tới thư mục được tạo ra trên server khi deploy dự án:
```php
 // The root directory where your applications will be deployed
 // This path *needs* to start at the root, ie. start with a /
'root_directory' => '/home/deployed/my-project/',
```

Trường `shared` thì giúp bạn định nghĩa các thư mục bạn muốn cache lại sau khi deploy để theo dõi quá trình vận hành hệ thống:
```php
'shared' => [
    'logs',
    'tmp/sessions',
    'config/app.php'
],
```

**scm.php**

Đây là file chứa thông tin đường dẫn tới repository, nơi có thể clone source dự án của bạn, ví dụ như repo github hoặc gitlab.

```php
// The SSH/HTTPS address to your repository
// Example: https://github.com/vendor/website.git
 'repository' => 'https://github.com/vendor/website.git',
```

Branch deploy được config mặc định là `master`, bạn có thể sửa lại nếu bạn muốn deploy một nhánh khác của repo:
```php
// The branch to deploy
'branch' => 'master',
```

Ngoài ra bạn cũng có thể chỉ định branch bằng cách sử dụng options `--branch=<branch_name>`. Ví dụ như bạn muốn deploy code trên nhánh develop chẳng hạn:
```bash
$ rocketeer deploy --branch=develop  
```
**events.php**

File này config những câu lệnh mà để bạn setup được project, ví dụ với một project Vue:
```php
Rocketeer::after('deploy', function ($task) {
    $task->runForCurrentRelease(['yarn install', 'grunt']);
});
```

**hooks.php**

Tệp này dùng để xác định các tác vụ (lệnh) sẽ chạy trên server trước và sau khi bạn chạy một tác vụ Rocketeer như setup hoặc deploy, tương tự như events.php

**paths.php**

Rocketeer sẽ thử tìm php và composer trên server nếu không được chỉ định. Tuy nhiên, bạn có thể config đường dẫn này trong tệp path.php, để định nghĩa đường dẫn đến PHP, ví dụ như vầy:
```php
'php' => '/usr/local/bin/php/7.4',
```

**stages.php**

Trong Rocketeer, stages là các môi trường độc lập trên một connection. Nếu bạn không tách riêng các stages trên các connections (được định nghĩa trong file config.php), thì bạn có thể bỏ qua phần này.

Nếu trên 1 server, dự án của bạn chỉ có 1 stages duy nhất, Đây là cấu trúc dự án trên server đó sau khi deploy:
```
| my-app
| -- current
| -- releases
| ----- 20140119010101
| -- shared
```

Còn nếu bạn có 2 stages trên 1 server, ví dụ như testing và productions, thì cấu trúc thư mục của bạn trên server đó sẽ có dạng như vậy:
```
| my-app
| -- testing
| ----- current
| ----- releases
| -------- 20140119010101
| ----- shared
| -- production
| ----- current
| ----- releases
| -------- 20140519413121
| ----- shared
```

Có 2 trường để bạn config, là `stages` và `default`. `stages` là danh sách các stages mà bạn định nghĩa.

```php
'stages' => array('testing', 'production'),
```

Giống như connections, `default` sẽ định nghĩa stages mặc định được thực thi khi một tác vụ được rocketeer thực hiện.

```php
'default' => array('testing'),
```


**strategies.php**

Tệp cuối cùng này cho phép bạn định config các tác vụ sẽ sử dụng để thực thi các core khác nhau trong quy trình deploy dự án. Ví dụ như các kiểm tra mã (test code: phpcs,...) hoặc migrate database.

Trên đây là một số thông tin mình tìm hiểu được về Rocketeer, hi vọng sẽ có ích với bạn. Cảm ơn và hẹn gặp lại bạn ở những bài viết tiếp theo.

Tài liệu tham khảo:

[Rocketeer](http://rocketeer.autopergamene.eu)

[Getting Started with Rocketeer to Simplify Deployments](https://andy-carter.com/blog/getting-started-with-rocketeer-to-simplify-deployments)

[Auto deploy dự án Laravel với Rocketeer và Sun*CI](https://viblo.asia/p/yMnKMMqAK7P)