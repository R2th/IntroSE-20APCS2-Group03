## Lời mở đầu
![](https://images.viblo.asia/acee95a3-c378-494a-b9ae-f199731c7bc5.jpg)

Như chúng ta có thể biết, PHP là một ngôn ngữ phổ biến trong giới lập trình web và Backend. Khi nhắc đến PHP người ta không thể không nhắc đến Laravel Framework.
Laravel là 1 framework open source, được tạo ra bởi [Taylor Otwell](https://twitter.com/taylorotwell). Laravel được thiết kế dựa trên mô hình MVC. Hiện tại Laravel đã ra mắt phiên bản 7.x đã thay đổi rất nhiều so với phiên bản đầu tiên từ ngày 9 tháng 6 năm 2011.

Cá nhân mình thấy rằng khi học bất kỳ một Framework nào đó, điều đầu tiên mà chúng ta phải biết đó chính là Framework đó có những Design Patterns nào. Và Laravel cũng thế, ngay trong phần documents của nó, tác giả cũng khéo sắp xếp 1 số Design Pattern lên ngay đầu sau đó mới là các technicals trong Laravel. Trước khi đi liệt kê một số Design Patterns cần biết trong Laravel. Đảm bảo rằng bạn đã hiểu qua về khái niệm Design Pattern.

Có thể định nghĩa dễ hiểu về Design Pattern như sau:
* Design Pattern là một kỹ thuật trong lập trình hướng đối tượng, được các lập trình viên, các nhà nghiên cứu đúc kết các thiết kế chuẩn cho việc lập trình có khuôn mẫu, kết cấu chung.
* Design Pattern không phải là một ngôn ngữ cụ thể nào cả, tất cả các ngôn ngữ lập trình hay Framework của nó đều có thể áp dụng Design Pattern.
* Design Pattern giúp các dự án dễ mở rộng, hạn chế bug và maintain được hiệu quả.
* Design Pattern giúp thống nhất cách code chung nên các lập trình viên sẽ làm việc nhóm được hiệu quả tránh tình trạng mỗi người code 1 kiểu.

Các bạn chưa hiểu rõ về hướng đối tượng trong PHP có thể tham khảo series [Hướng đối tượng OOP và lập trình PHP](https://viblo.asia/s/huong-doi-tuong-oop-va-lap-trinh-php-jeZ107wYKWz)
## Nội dung chính
### 1. Laravel request lifecycle
![](https://images.viblo.asia/85c206ac-e014-49a3-ae80-de62e2b87f8d.png)
Bất kỳ một trang web nào muốn chạy được đều phải có một web server, có thể là apache, IIS, hay nginx, ... Web server được dùng khá là phổ biến hiện nay đó là Nginx, đây là 1 máy chủ reverse proxy mã nguồn mở cho các giao thức HTTP, HTTPS, SMTP, POP3 và IMAP, cũng như là 1 máy chủ cân bằng tải (load balancer), HTTP cache và web. Bên dưới là một ví dụ về config của nginx để chạy 1 web code bằng PHP - Laravel.
```bash
server {
    root /deploy/blog/current/public;
    index index.php index.html index.htm;
    server_name quy.blog.me;

    try_files $uri $uri/ @rewrite;

    location @rewrite {
        rewrite ^/(.*)$ /index.php?_url=/$1;
    }
}
```
Đa phần trước khi tìm hiểu về Laravel thì mọi người đã biết mô hình MVC rồi (Model - View - Controller). Thì một request của Laravel cũng sẽ hoạt động dựa trên mô hình như vậy. Người dùng thực hiện request trên trình duyệt, web server (nginx) sẽ đẩy request vào ```public/index.php``` bạn có thể nhìn thấy trong config trên. File ```index.php``` sẽ là đầu vào của các request trong project. Các bootstrapper trong folder bootstrap giúp việc cấu hình các việc xử lý lỗi, cấu hình log, nhận biết môi trường ứng dụng, và thực hiện các công việc khác ngay trước khi request được xử lý. Tiếp đến, các request đến được gửi hoặc tới HTTP kernel hay console kernel, phụ thuộc vào kiểu request đi vào ứng dụng. Hai kernel này phục vụ như khu trung tâm điều phối dòng request. Bây giờ, hãy chỉ tập trung vào HTTP kernel, được đặt trong ```app/Http/Kernel.php```. Trong ``Kernel.php``  là nơi khai báo các middleware, là nơi nhận các request và trả ra các response. Một trong những thao tác khởi tạo kernel quan trọng nhất đó là thực hiện load các service providers. Tất cả các service providers được cấu hình trong file config/app.php ở mảng $providers. Đầu tiên, hàm register sẽ được gọi ở tất cả các providers, rồi sau đó, khi mà các providers đã được đăng kí đầy đủ, thì hàm boot sẽ được gọi. Cuối cùng request sẽ được router điều hướng đến controller xử lý và đưa ra views trả kết quả (response) cho người dùng.
### 2. Dependency Injection
![](https://images.viblo.asia/a089d097-7cee-4daf-8486-567f9d712f5c.jpeg)

Dependeny Injection là một kiểu mẫu lập trình (design pattern) được sử dụng để cố gắng đạt được sự không phụ thuộc giữa các object với nhau khi có mối quan hệ phụ thuộc giữa một object này với một object khác.

```php
class User {}
class Comment {}
class Post
{
    protected $user;
    protected $comment;
    public function __construct($user, $comment)
    {
        $this->user = $user;
        $this->comment = $comment;
    }
}

$post = new Post(new User(), new Comment());
```
Chúng ta có thể hiểu đơn giản Dependeny Injection trong trường hợp này rằng là: Thay vì phải khởi tạo nhiều lần instance của các object User và Comment trong object Post, chúng ta chỉ cần inject những instance đó vào class Post thông qua magic function ```__contructor``` hoặc ```__setter```. Những  instance mà class Post sử dụng của User và Comment là các dependency.
### 3. Service Container
![](https://images.viblo.asia/bf3e81af-9ef9-455b-8968-37edefb7aae6.jpg)

Service Container trong Laravel là nơi quản lý class dependency và thực hiện dependency injection

**Binding:** Đăng ký 1 class hay interface với container.

Simple Binding:
```php
$this->app->bind('HelpSpot\API', function ($app) {
    return new \HelpSpot\API($app->make('HttpClient'));
});
```
Binding A singleton:
```php
$this->app->singleton('HelpSpot\API', function ($app) {
    return new \HelpSpot\API($app->make('HttpClient'));
});
```
**Resolving:** Lấy ra các instance từ container.

Các function trong resolve mà ta có thể sử dụng là: ```make``` 
```php
$api = $this->app->make('HelpSpot\API');
```

hoặc ```resolve```
```php
$api = resolve('HelpSpot\API');
```
Trong Service Container cần nắm vững một số khái niệm ```Singleton binding```, ```Instance binding```, ```Interface binding```, ...
**Singleton binding:**
Instance sẽ chỉ được resolve 1 lần, các lần gọi tiếp theo sẽ không tạo ra instance mới mà sử dụng lại instance được resolve từ trước đó.
**Instance binding:**
Giống với ```Singleton binding```, bạn bind 1 instance vào service container. Mỗi lần lấy ra sẽ nhận lại instance đó.
**Interface binding:**
Khi chúng ta type-hint interface ở hàm ```__contruct()``` hay method thì chúng sẽ nhận được implementaion tương ứng khi ta đăng ký trong Service Container. Đó là quá trình bind (đăng ký 1 class hay 1 interface vs Container) và resolve (lấy ra) instance từ Container.
### 4 Service Provider
![](https://images.viblo.asia/dd9672cf-389c-4b57-9391-2b1479025da6.png)

Là nơi khai báo cho việc binding các Service Container. Các Service Provider được khai báo tại ```config/App.php```
Trong Service Provider gồm có 2 function ```register``` và ```boot```.  

**register:** Nơi đăng ký các service container
```php
     /**
     * Register the upload manager.
     *
     * @return void
     */
    protected function register()
    {
        $this->app->singleton('upload', function ($app) {
            return tap(new UploadManager($app), function ($manager) {
                $this->registerHandlers($manager);
            });
        });
    }
```
**boot:** Nơi cho phép truy cập đến các services đã được đăng ký trong register
```php
     /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->make('upload')->cycle(function ($event) {
            $this->callListeners($event);
        });
    }
```

### 5. Facades
![](https://images.viblo.asia/db4de01b-33fa-4fe8-b353-a6969764db8b.png)

Các bạn đã từng thấy và sử dụng rất nhiều các facades. Nó được khai báo trong mảng alias trong ```config/app.php```. Mục đích của việc này giúp ta có thể sử dụng trong project của mình dưới cái tên ngắn gọn, thay vì phải viết đầy đủ namespace của chúng.
### 6. Contracts
Laravel Contracts là một set các interfaces khai báo các core services cung cấp bởi framework. Ví dụ, contract Illuminate\Contracts\Queue\Queue khai báo các phương thức cần thiết cho các job xử lý hàng đợi, còn Illuminate\Contracts\Mail\Mailer khai báo các phương thức cần thiết để gửi email.
Tham khảo các contract tại [illuminate/contracts](https://github.com/illuminate/contracts).
### 7. Repository
![](https://images.viblo.asia/0f40e8a3-b89a-4f9f-9a6c-866c311252de.jpg)

Repository Pattern là lớp trung gian giữa tầng Business Logic và Data Access, giúp cho việc truy cập dữ liệu chặt chẽ và bảo mật hơn.
Repository đóng vai trò là một lớp kết nối giữa tầng Business và Model của ứng dụng.
Hiểu đơn giản thì khi t muốn truy xuất dữ liệu từ database, thay vì viết code xử lý trong controller thì ta tạo ra 1 thư mục là Repository rồi viết code xử lý vào đây. Sau đó chúng ta chỉ việc inject vào thông qua ```__construct```.

Vì sao nên sử dụng repository:
* Code theo thiết kễ mẫu nên dễ dàng maintain.
* Tăng tính bảo mật và rõ ràng cho code.
* Bug sẽ ít xảy ra hơn.
* Tránh việc lặp code giữa các thành viên trong team.

## Tạm kết
Chắc hẳn sau bài viết, các bạn đã nắm rõ được các Design Patterns cần biết trong laravel rồi đúng không. Việc hiểu rõ các Design Patterns này giúp rất nhiều cho ta trong quá trình là dự án với Framework Laravel đó. Rất mong được sự góp ý của các bạn
![](https://images.viblo.asia/44306c29-91cb-43f1-9ca1-b6ebeb10fb48.jpg)