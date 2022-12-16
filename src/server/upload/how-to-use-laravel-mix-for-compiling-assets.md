Hôm nay, tôi xin chia sẻ một chút kiến thức nhỏ về **[Laravel Mix](https://laravel.com/docs/5.8/mix)** mà trong quá trình làm việc đã tìm hiểu được.  Nếu bạn đã từng bối rối và choáng ngợp về việc bắt đầu với **[webpack](https://webpack.js.org/)** và compiling assets, bạn sẽ thích Laravel Mix hơn. 

Nó cho phép bạn thiết lập linh hoạt các cấu hình để định nghĩa các bước xây dựng **webpack** cơ bản cho ứng dụng Laravel của bạn bằng cách sử dụng một số bộ xử lý trước CSS và JavaScript phổ biến.

Tìm hiểu webpack [tại đây](https://medium.com/javascript-training/beginner-s-guide-to-webpack-b1f1a3638460).
## Laravel Mix?
### Cài đặt ứng dụng Laravel mới
Sử dụng terminal và gõ command dưới đây:
```
composer create-project laravel/laravel mix --prefer-dist
```
Bây giờ, sau khi cài đặt, đi vào thư mục dự án và mở tệp package.json. Nó có devDependencies như sau.
```CSS
"devDependencies": {
        "axios": "^0.17",
        "bootstrap": "^4.0.0",
        "popper.js": "^1.12",
        "cross-env": "^5.1",
        "jquery": "^3.2",
        "laravel-mix": "^2.0",
        "lodash": "^4.17.4",
        "vue": "^2.5.7"
}
```
Tiếp theo chạy command để cài đặt các dependencies:
```
npm install
```
### Chạy Laravel Mix
Mix là 1 lớp cấu hình bên trên của webpack nên bạn không cần biết bên trong như thế nào chỉ cần chạy lệnh sau là sẽ auto compiles các file assets theo cài đặt như cài đặt trong file `webpack.mix.js` (phần cấu hình compile nói ở dưới)
```
// Run all Mix tasks...
npm run dev

// Run all Mix tasks and minify output...
npm run production
```
Nó sẽ biên dịch các tệp CSS và JS và đưa vào một thư mục public. Các file được tạo ra bao gồm các file đã cấu hình bên trong tệp `webpack.mix.js`. Tệp tin **webpack.mix.js** sẽ nằm trong thư mục gốc của dự án Laravel.
```JS
// webpack.mix.js

let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css');
```
Chúng ta có thể cấu hình và gọi các phương thức khác nhau bằng cách xâu chuỗi các phương thức đó.
## Làm việc với các tập tin Assets
#### Less Files
Phương thức Less để biên dịch Less file thành CSS. Trước tiên, chúng ta hãy tạo một thư mục mới bên trong **resources**  >> thư mục tài **assets** >> **less**. Bây giờ trong thư mục đó thực hiện một cuộc gọi tập tin app.less.
```CSS
@nice-blue: #5B83AD;
@light-blue: @nice-blue + #111;

.title {
  color: @light-blue;
}
```
Tiếp theo chúng ta cần đưa nội dung class này vào **welcome.blade.php** để theo dõi những thay đổi.
```HTML
<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
        
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css"/>
        
        <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css"/>
    </head>
    <body>
        <div class="flex-center position-ref full-height ">
            <div class="content">
                <div class="title">
                    Laravel
                </div>
            </div>
        </div>
    </body>
</html>
```
Thêm đoạn mà sau vào webpack.mix.js
```JS
// webpack.mix.js

mix.js('resources/assets/js/app.js', 'public/js')
   .less('resources/assets/less/app.less', 'public/css');
```
Được rồi, Để tiến hành biên dịch mà Less thành CSS. Bắt đầu quá trình biên dịch webpack bằng cách nhấn lệnh sau.
```
npm run watch
```
Khởi động Laravel và truy cập http://localhost:8000 để xem những thay đổi đó.
```
php artisan serve
```
#### Sass Files
Phương thức sass cho phép bạn biên dịch Sass thành CSS. Bạn có thể sử dụng cách như vậy.
```JS
mix.sass('resources/assets/sass/app.scss', 'public/css');
```
#### Stylus Files
Tương tự như Less và Sass, phương thức stylus cho phép bạn biên dịch stylus thành CSS.
```JS
mix.stylus('resources/assets/stylus/app.styl', 'public/css');
```
#### Javascript
Laravel Mix có thể compiles
* file js thường
* cú pháp es2015
* file vue
* modules
bằng 1 hàm duy nhất
```JS
mix.js('resources/assets/js/app.js', 'public/js');
```
#### React JS
```JS
mix.react('resources/assets/js/app.jsx', 'public/js');
```
## Tùy chỉnh cấu hình Webpack
Như đã nói ở trên Laravel Mix là một lớp phủ bên ngoài webpack và việc biên dịch file vẫn phải chạy trên webpack. Nên hoàn toàn có thể tùy chỉnh cấu hình webpack thông qua file webpack.mix.js. Cái này cần phải có kiến thức về webpack nè 😁😁

#### Sao chép tệp và thư mục
Bạn cần copy file `node_modules/foo/bar.css` ra thư mục `public/css/bar.css` thì:

``` JS
mix.copy('node_modules/foo/bar.css', 'public/css/bar.css');
```

Bạn cần copy thư mục `assets/img` ra thư mục `public/img` thì:

```JS
mix.copyDirectory('assets/img', 'public/img');
```
#### Quản lý phiên bản/Xóa cache
Khi các file assets có sự sửa đổi và build lại, nghiễm nhiên nó sẽ không thay đổi ngay với tất cả mọi người, bởi vì trình duyệt đã cache lại. Cho nên version() chính là giải pháp hoàn hảo, ép trình duyệt phải lấy về file mới nhất.

```JS
mix.js('resources/assets/js/app.js', 'public/js').version();
```
Laravel Mix sẽ generate ra một mã hash tại thời điểm chạy, và bạn sẽ không muốn gõ tay cái mã này đâu 😆😆 hãy dùng Laravel helper function mix() nhé

```HTML
<link rel="stylesheet" href="{{ mix('/css/app.css') }}">
```
Nếu bạn chỉ muốn gắn version khi build production thì:
```JS
// chạy npm run prod sẽ generate ra version
if (mix.inProduction()) {
    mix.version();
}
```
#### Tắt thông báo
Nếu bạn dùng npm run watch thì mỗi khi file thay đổi, webpack sẽ phát hiện và biên dịch lại, biên dịch xong thì phải báo message done hay fail chứ, nếu bạn chỉnh sửa liên tục sẽ rất phiền. Muốn tắt thì:
```JS
// easy
mix.disableNotifications();
```
### Kết luận
Hy vọng sau bài viết này, mọi người có thể áp dụng được Laravel mix vào các dự án Laravel của mình. Mong nhận được nhiều đóng góp để các bài viết sau có thể hoàn thiện hơn ạ.