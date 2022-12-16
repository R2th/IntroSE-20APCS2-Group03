Chào mừng các bạn quay trở lại với series học Laravel với VueJS của mình, ở bài trước mình đã hướng dẫn các bạn cách [phân quyền trong Laravel ](https://viblo.asia/p/bai-17-phan-quyen-trong-laravel-RnB5p0pD5PG) và bài này chúng ta sẽ cùng tìm hiểu cách upload project lên Heroku sau đó setup database nhé. 

Đầu tiên là chúng ta sẽ sử dụng nguyên project như của bài trước nhé, code các bạn có thể lấy ở [đây](https://github.com/maitrungduc1410/viblo-repo)
# Chuẩn bị
Đâù tiên chúng ta cần cài đặt Heroku CLI để có thể dùng command nhé.

Trước hết ta chạy command sau:
```markdown
npm install -g heroku
```
Để test heroku cài đặt thành công chưa, ta chạy command: 
```shell
heroku --version
```
Nếu có kết quả dạng `heroku/7.0.0 (darwin-x64) node-v8.0.0` là ổn rồi đó.

Tiếp theo các bạn lên trang heroku.com và tạo một tài khoản. Sau đó ta mở command line tại thư mục gốc của project và login bằng cách:
```objectivec
heroku login
```
Hoàn tất bước này ta bắt đầu bước sau nhé :)
# Bắt tay vào làm thôi ^^
### Tạo project
Vẫn ở cửa sổ command line ta mở ở thư mục gốc project. Ta chạy lệnh sau:
```go
heroku create
```
Command này sẽ tạo một app tương ứng với project của chúng ta trên hệ thống của heroku. Các bạn có thể xem kết quả trực tiếp sau khi chạy command ở https://dashboard.heroku.com/apps.
### Tạo Procfile
Tiếp theo ta bắt buộc phải tạo một file đặt tên là `Procfile`, file này đặt ở mức ngoài cùng của thư mục gốc. Nội dung của file này đơn giản như sau:
```shell
web: vendor/bin/heroku-php-apache2 public/
```
Các bạn chú ý nhé, ở trên phần hướng dẫn với PHP trên trang chủ Heroku thì code bên trên không phải là `public` mà là `web` nhưng vì ta dùng Laravel nên ta cần phải trỏ tới folder `public` nhé :)
Tiếp theo ta chạy command sau để push toàn bộ project lên heroku:
```shell
git add .
git commit -m update
git push heroku master
```
Hoàn thành ta chạy `git status` để chắc chắn các file đã được push lên.

Sau đó các bạn chạy command sau để mở project trên trình duyệt:
```sql
heroku open
```
### Setup
Sau khi mở trên trình duyệt thì các bạn sẽ thấy lỗi `Something went wrong`, bởi vì app của chúng ta chưa chạy `key:generate` nhưng trên trình duyệt không thấy báo lỗi đó vì file `.env` trên server có biến `APP_DEBUG` đang để là `false` nên ta không debug project được. Để có thể debug ta mở project trên https://dashboard.heroku.com/apps, vào mục `Settings`, click `Reveal config vars`, thêm một biến mới là `APP_DEBUG` có giá trị `true`.

Tiếp theo ta cần fix lỗi `key:generate` bằng cách chạy command: 
```shell
heroku config:set APP_KEY=$(php artisan --no-ansi key:generate --show)
```

Sau đó ta chạy lại `heroku open` để mở app một lần nữa, và ta sẽ thấy kết quả hiện trên màn hình. Oops, nhưng mà form bị lỗi css tùm lum rồi @@. Mở console thì thấy báo lỗi `mixed content... was load over HTTPS....`, lỗi này bởi vì các resources(js, css...) của chúng ta chưa được load bằng https. Để fix lỗi đó ta làm như sau. Mở `app/Providers/AppServiceProvider` và sửa lại như sau:
```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Contracts\Routing\UrlGenerator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(UrlGenerator $url)
    {
        Schema::defaultStringLength(191);
        if(env('REDIRECT_HTTPS')) {
            $url->formatScheme('https');
        }
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if(env('REDIRECT_HTTPS')) {
            $this->app['request']->server->set('HTTPS', true);
        }
    }
}
```
Sau đó quay lại app của chúng ta ở trên trang https://dashboard.heroku.com/apps, mở Settings và Reveal config vars. Thêm 2 biến mới tên: 
* `REDIRECT_HTTPS` giá trị `true`
* `APP_URL` giá trị là tên đường dẫn app của bạn khi chạy `heroku open` ví dụ của mình là `https://boiling-waters-95127.herokuapp.com/`
Sau đó ta cần commit lại project vì khi nãy có sửa code phần `AppServiceProvider` nhé:
```shell
git add .
git commit -m "fix https"
git push heroku master
```
Sau đó chạy `heroku open` một lần nữa và ta đã thấy không còn lỗi css nữa. Thử đăng nhập thì bị báo lỗi `connection refused` vì ta chưa setup database. Cùng sang phần sau nhé ;)
### Setup database
Vì hiện tại trên Heroku không cung cấp phpmyadmin nên ta sẽ sử dụng postgre sql nhé :), cách setup và migrate không khác gì mysql thông thường và quan trọng là nó FREE nhé các bạn 8-)

 Để cài đặt postgre sql cho project ta chạy command sau:
 ```
 heroku addons:create heroku-postgresql:hobby-dev
 ```
 Sau đó để kiểm tra cài đặt thành công hay chưa ta vào config vars của app trên trang heroku.com nếu thấy có thêm một biến mới là `DATABASE_URL` và có giá trị là ok rồi đó 8-). 
![heroku](https://images.viblo.asia/9a470a7d-18a0-459f-86d4-c55756e4043a.png)

Tiếp theo ta quay trở lại project mở `config/database.php` và thêm vào phần đầu file như sau:
```php
<?php

$url = parse_url(getenv('DATABASE_URL'));
$host = $url['host'] ?? null;
$username = $url['user'] ?? null;
$password = $url['pass'] ?? null;
$database = substr($url['path'], 1) ?? null;

return [
........
```
Đoạn code trên đơn giản là ta lấy thông tin về database từ biến `DATABASE_URL`.

Tiếp theo scroll xuống dưới ta có thể thấy Laravel định nghĩa sẵn cho chúng ta các loại DB, ta thêm mới một loại nữa như sau:
```php
...
'pgsql_production' => [
    'driver' => 'pgsql',
    'host' => $host,
    'port' => env('DB_PORT', '5432'),
    'database' => $database,
    'username' => $username,
    'password' => $password,
    'charset' => 'utf8',
    'prefix' => '',
    'schema' => 'public',
    'sslmode' => 'prefer',
],
...
```
Sau đó lại scroll lên đầu phần `default` ta sửa lại như sau để sử dụng connection ta vừa khai báo làm connection mặc định:
```sql
'default' => env('DB_CONNECTION', 'pgsql_production'),
```
Tiếp theo ta cần commit lại code nhé:
```shell
git add .
git commit -m "setup db"
git push heroku master
```
OK chạy app thôi nào, `heroku open`, sau đó ta đăng nhập và bị báo lỗi `table doesn't exist...`, WTFFFFFFFFFF . 

Ta đã quên một bước quan trọng đó là `migrate` và `seed` data. Chạy command sau nhé:
```objectivec
heroku run php artisan migrate
```
Nhớ chọn `yes` nếu bị hỏi nhé.
Cuối cùng là F5 lại page và đăng nhập thử nhé các bạn. Bùm, kết quả cuối cùng :-D
![laravel_heroku](https://images.viblo.asia/1fdb83b0-9aee-42cb-90bf-3799328b0d64.png)

# Kết thúc
Sau bài này ta đã biết cách upload một project Laravel và VueJS lên heroku. Từ đó sau này đã có thêm một nơi để test free :). Vì bây giờ muốn test project kiểu này ta thường cần phải có VPS mà cái đó chả bao giờ dễ kiếm cả :-D.

Cám ơn các bạn đã theo dõi, nếu có vấn đề gì ở bước nào các bạn cứ comment bên dưới cho mình nhé ^^!