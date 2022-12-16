Việc deploy code lên server luôn là một việc làm dev tốn khá nhiều thời gian, mỗi khi có pull request được merge là lại ssh lên server để chạy một loạt tác vụ:
```
    git pull
    composer install
    yarn install/npm install 
    yarn run production/npm run production
    php artisan clear-compiled
    composer dump-autoload
    php artisan migrate --force
    .....bla.bla..
```
Nếu bạn là người giữ lấy 2 server (staging và production) mà ngày có lấy tầm hơn 10 pull request được merged thì cũng khá vui. Để giải quyết vấn đề này đã có khá nhiều công cụ giúp ta thao tác những command khi deploy này. Rocketeer là một trong số đó mà hôm nay mình sẽ giới thiệu với mọi người.

# ROCKETEER
 Rocketeer là deployment package xây dựng trên PHP rất nhanh chóng, manh mẽ, và dễ dàng cho các developer. 
 Rocketeer yêu cầu kết nối SSH. Rocketeer là một trình chạy tác vụ SSH cơ bản, nó xác định các server qua public key,private key (public key được lưu trên server (giống như ổ khóa), khi ssh đến server sẽ đính kèm private key để xác nhận (giống như chìa khóa)), và thực thi các command được định nghĩa trước.
 Với rocketeer bạn có thể triển khai dự án từ xa.

## Main features
* **Versatile**: hỗ trợ cho nhiều connect, connect đến nhiều server, nhiều stage trên mỗi server, v.v.
* **Fast**: queue các tác vụ và chạy chúng song song trên tất cả các server và các stage của bạn
* **Modulable**: bạn không chỉ có thể thêm các tác vụ và các component, mọi phần cốt lõi của Rocketeer đều có thể được hoán đổi, mở rộng, hacked thành bit, v.v.
* **Preconfigured**: Mệt mỏi vì định nghĩa cùng một routines lặp đi lặp lại? Rocketeer được tạo ra để phát triển hiện đại và đi kèm với các mặc định thông minh và các tác vụ tích hợp sẵn như install các dependency của ứng dụng của bạn.
* **Powerful**: quản lý các phiên bản deploy, kiểm tra server, rollback, v.v ... Mọi tính năng bạn mong đợi từ một công cụ deployment đều có.
## Installation
```
$ wget http://rocketeer.autopergamene.eu/versions/rocketeer.phar
$ chmod +x rocketeer.phar
$ mv rocketeer.phar /usr/local/bin/rocketeer
```
## Usage

Các lệnh có sẵn trong Rocketeer là:
```
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

## Core folders
Trước khi thực thi auto deploy, bạn cần cung cấp cho Rocketeer một `root_folder` (được định nghĩa trong file /.rocketeer/remote.php) trên server để Rocketeer biết path đến vị trí dự án. Đồng thời bạn cần định nghĩa `application_name`  trong file /.rocketeer/config.php để Rocketeer tạo thư mục application_name  trong `root_folder` nơi sẽ thực hiện deploy.

Ví dụ:
`root_folder` của bạn là: /home/deploy

`application_name` của bạn là: my-app

Vậy rocketeer sẽ tạo ra 1 folder my-app có path: /home/deploy/my-app/ và thực hiện deploy project tại đây.

## The strategy
 Kiến trúc thư mục của Rockerer được lấy cảm hứng từ Capistrano. Trong folder được đề cập ở trên (/home/deploy/my-app/), Rocketeer sẽ tạo ba thư mục:
 
*  **current**: là nơi cập nhật phiên bản mới nhất của ứng dụng  và sẽ luôn luôn như vậy. Bất kể điều gì xảy ra trong các thư mục khác, đó là thư mục bạn muốn serve online. Sẽ không phục vụ bất kỳ thư mục nào khác ngoài thư mục này, nếu bạn cần phục vụ một bản phát hành không phải là thư mục mới nhất (vì bản release mới nhất bị lỗi theo ví dụ) thì bạn cần sử dụng các công cụ của Rockerer để quay lại. 

   Tại đây, bạn cần config nginx hoặc apache directory như sau:
    ```   
        /home/deploy/my-app/current/public/
    ```
*  **releases** :  Đây là nơi lịch sử của việc deploy ứng dụng được lưu trữ. Mỗi khi bạn thực thi deploy , một thư mục được đánh dấu thời gian sẽ được tạo trong releases  (20130721010101 cho ví dụ 2013-07-21 01:01:01). . Bạn có thể định config số phiên bản release được lưu trữ: theo default , nó `keep_releases` sẽ giữ bốn phiên bản mới nhất. Khi một bản rphát hành mới được tạo và sẵn sàng để được phục vụ, Rocketeer sẽ cập nhật `symlink` của thư mục current để làm cho nó trỏ đến.
*  **shared** : là nơi các file được chia sẻ giữa mỗi bản phát hành được lưu trữ (ví dụ như public/, bootstrap/cache, storage/ .env).

Thư mục code của bạn trên server khi sử dụng rocketeer để auto deploy sẽ có format như sau:
```
| home
|-- deploy
  |-- my-app
    |-- current => /var/www/facebook/releases/20130721000000
    |-- releases
    |  |-- 20130721000000
    |  |  |-- app
    |  |     |-- storage
    |  |       |-- logs => /var/www/facebook/shared/app/storage/logs
    |  | 20130602000000
    |-- shared
      |-- app
        |-- storage
          |-- logs
 
```
## References doc
http://rocketeer.autopergamene.eu/