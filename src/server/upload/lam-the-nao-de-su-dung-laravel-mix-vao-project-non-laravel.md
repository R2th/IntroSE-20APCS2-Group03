# I, Giới thiệu
Nếu bạn muốn dự án của mình chạy càng nhanh càng tốt mà lại không muốn dành nhiều thời gian để cấu hình các công cụ xây dựng như Webpack thì đừng lo, Laravel Mix sẽ giải quyết vấn đề này và làm cho việc biên dịch asset trở nên dễ dàng hơn. Vậy trong trường hợp dự án của bạn không phải là dự án Laravel thì phải làm như thế nào? Bài viết này sẽ giúp bạn thực hiện việc đó.
## 1, Laravel Mix là gì
Laravel Mix (trước đây là Elixir) là một công cụ được xây dựng dựa trên Webpack.js, giúp cho việc tối ưu hóa các file css, javascript, giúp giảm kích thước lưu trữ và tối ưu băng thông, dẫn đến tạo trải nghiệm tốt cho người dùng do tốc độ tải trang nhanh chóng hơn.

Laravel Mix giúp xây dựng file css từ các CSS pre-processing như SASS, LESS dễ dàng hơn. Laravel Mix giúp bạn giảm rất nhiều thời gian trong các công việc có thể tự động hóa được. Thiết lập versioning, hot reloading, và xây dựng/biên dịch asset rất đơn giản, chỉ cần 1 tệp cấu hình duy nhất và một vài dòng code.

## 2, Requirements
Ở bài này, mình mặc định là bạn đã có kiến thức quản lý file JSON và bạn đã cài [NPM](https://www.npmjs.com/) và [Node](https://nodejs.org/en/) trên hệ thống.

Nếu bạn muốn sử dụng versioning và hot reload, bạn cần phải sử dụng PHP, và [Composer](https://getcomposer.org/).

Để xác định bạn đã cài NPM và Node hay chưa, thì bạn gõ dòng sau vào terminal:
```
node -v
npm -v
```

Bạn có thể xem version của cả Node và NPM.
# II, Thực hành
Trong demo lần này mình sử dụng [OctoberCMS](https://octobercms.com/), nó free, open-source và dựa trên nền tảng Laravel. 

Nếu bạn không có một dự án nào và muốn bắt đầu một dự án trống, chỉ cần tạo một thư mục trống ở đâu đó trên máy tính của bạn và sử dụng nó làm thư mục dự án của bạn. Bạn không cần bất kỳ tập tin ban đầu nào để bắt đầu.

## 1, Install Laravel Mix và SASS
Bây giờ, bạn sẽ cài đặt Laravel Mix, nhưng bạn cũng cần một dependency khác có tên là `cross-env`, để có thể sử dụng các biến môi trường trên các nền tảng khác nhau. Ngoài ra bạn cũng cần `node-sass` để biên dịch file SASS.
Để thiết lập Laravel Mix, SASS và cross-env, chạy câu lệnh dưới đây:
```
npm install laravel-mix cross-env node-sass --save-dev
```

Nếu cài đặt thành công thì bạn sẽ có một thư mục mới có tên là `node-modules` và tệp `package.json` của bạn cũng sẽ được cập nhật.

Hãy nhớ thêm `node-modules` và file `.gitignore` của bạn nếu bạn muốn kiểm soát version mà bạn đang làm việc.
## 2, Tạo 1 Webpack Mix File
Với Laravel Mix, bạn không cần phải lo lắng về việc tạo file cấu hình Webpack, đó là lí do chính của mình để sử dụng nó trong hầu hết các dự án web. Bạn chỉ cần tạo 1 file xác định asset nào mà bạn muốn biên dịch.
Bắt đầu bằng việc tạo 1 file có tên `webpack.min.js` trong root project của bạn. Thêm đoạn nội dung dưới đây vào trong file:
```js
const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');
```
Nó xác định file Javascript và file SCSS/SASS mà bạn muốn biên dịch bằng Webpack và các thư mục đầu ra. Bạn có thể đặt tên các tập tin và tên đầu ra như bạn muốn. 

## 3, Thêm Scripts vào package.json
Để thực sự sử dụng Mix, bạn sẽ phải include một số scripts vào trong file `package.json`. Với mục đích giữ cho nó giống với Laravel nhất có thể, mình quyết định sao chép chúng trực tiếp từ 1 dự án mới của Laravel 5.4.

Nếu bạn đã có 1 biến scripts bên trong file, bạn có thể xóa nội dung của chúng.

Mở file `package.json` trong code editor, và thêm biến `scripts` và `config` như nội dung dưới đây:
```
"scripts": {
    "dev": "node node_modules/cross-env/dist/bin/cross-env.js NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
    "watch": "node node_modules/cross-env/dist/bin/cross-env.js NODE_ENV=development node_modules/webpack/bin/webpack.js --watch --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
    "hot": "node node_modules/cross-env/dist/bin/cross-env.js NODE_ENV=development node_modules/webpack-dev-server/bin/webpack-dev-server.js --inline --hot --config=node_modules/laravel-mix/setup/webpack.config.js",
    "production": "node node_modules/cross-env/dist/bin/cross-env.js NODE_ENV=production node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js"
  },
```
## 4, Tạo Assets để Compiled
Trong file `webpack.mix.js`, bạn sẽ định nghĩa 1 số file để biên dịch, nhưng rất có thể file đó không tồn tại nếu nó là dự án mới. 
Bạn cần thêm 1 số nội dung bên trong file `resources/sass/app.sass` để test:
```css
body {
    background-color: #000;
    color: #fff;
    text-align: left;
}
```

## 5, Chạy Laravel Mix
Để kiểm tra mọi thứ có hoạt động như mong đợi hay không, thì bạn hãy mở terminal của project và chạy lệnh:
```
npm run dev
```
Bạn sẽ thấy 1 bảng các file được biên dịch và dòng thông báo thành công.
## 6, Set up Cache Busting và Hot Reload
Hot reloading cho phép bạn điều chỉnh assets của mình và có các thay đổi xuất hiện ngay lập tức trong trình duyệt của bạn mà không cần refresh. Điều này đặc biệt hữu ích cho các điều chỉnh về CSS. Nó tự động inject phiên bản mới nhất của file vào mỗi thay đổi.

Laravel Mix sử dụng BrowerSync cho  việc này, cũng có nhiều tính năng ha như xem nội dung trên các thiết bị khác và đồng bộ trạng thái (input, scroll...) giữa các thiết bị.

Cache busting là cách để tránh browser cache, bằng cách dùng hash (băm) vào các assets đã biên dịch, vì vậy `app.js` có thể biến thành `app.b2328beb0372c051d06d.js`. Điều này buộc trình duyệt phải tìm nạp file từ server. 

Để thiết lập cache busting và hot reloading, chúng ta sẽ cần include 1 file php và cung cấp 1 phương thức `mix()`.

Phương thức `mix()` là một basic helper giúp bạn tìm đúng versions của assets, và kiểm tra xem bạn có bật hot reloading hay không.

Tạo 1 file có tên là `mix.php` vào trong root project (hoặc bất cứ nơi nào bạn thích) với nội dung sau:
```php
 if (! function_exists('mix')) {
    /**
     * Get the path to a versioned Mix file.
     *
     * @param string $path
     * @param string $manifestDirectory
     * @return string
     *
     * @throws \Exception
     */
    function mix($path, $manifestDirectory = '')
    {
        static $manifest;
        $publicFolder = '/public';
        $rootPath = $_SERVER['DOCUMENT_ROOT'];
        $publicPath = $rootPath . $publicFolder;
        if ($manifestDirectory && ! starts_with($manifestDirectory, '/')) {
            $manifestDirectory = "/{$manifestDirectory}";
        }
        if (! $manifest) {
            if (! file_exists($manifestPath = ($rootPath . $manifestDirectory.'/mix-manifest.json') )) {
                throw new Exception('The Mix manifest does not exist.');
            }
            $manifest = json_decode(file_get_contents($manifestPath), true);
        }
        if (! starts_with($path, '/')) {
            $path = "/{$path}";
        }
        $path = $publicFolder . $path;
        if (! array_key_exists($path, $manifest)) {
            throw new Exception(
                "Unable to locate Mix file: {$path}. Please check your ".
                'webpack.mix.js output paths and try again.'
            );
        }
        return file_exists($publicPath . ($manifestDirectory.'/hot'))
                    ? "http://localhost:8080{$manifest[$path]}"
                    : $manifestDirectory.$manifest[$path];
    }
}
```
## 7, Autoload với Composer
Mở file `composer.json` hoặc là tạo 1 file mới trong root project.
Chúng ta cần load tự động `mix.php` trước tất cả các request PHP. Thêm đoạn code dưới đây vào phần autoload:
```php
    "autoload": {
        "files": ["mix.php"]
    }
```
File của bạn sẽ trông giống như [thế này](https://github.com/LasseRafn/sitepoint-laravel-mix-without-laravel/blob/master/composer.json).
## 8, Set up Index File để test
Để kiểm tra xem versioning có hoạt động hay không, ta sẽ phải có version trong assets (và tùy chọn có bật hot reloading), vì vậy hãy thay đổi file `webpack.mix.js`:
```js
const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .version()
   .browserSync(); // Hot reloading
```

Và bây giờ bạn cần tạo 1 file `index.php` để phục vụ mục đích demo:
```html
<?php
  require_once 'vendor/autoload.php';
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Use Laravel Mix Non Laravel Projects</title>
    <link rel="stylesheet" href="<?php echo mix('css/app.css'); ?>" />
  </head>

  <body>
    This is my demo.

    <script src="<?php echo mix('js/app.js'); ?>"></script>
  </body>
</html>
```

Nếu bạn muốn sử dụng hot reloading thì hãy chạy lệnh `npm run hot` trong terminal để tạo phiên bản asset và khởi tạo hot reloading. Một webpage sẽ mở ra và hiển thị site của bạn.

Ngược lại, nếu bạn không muốn hot reloading. Bạn có thể chạy lệnh `npm run dev` rồi khởi động PHP server `php -S localhost:8080`  và mở trình duyệt ở cổng 8080 ví dụ như `homestead.app:8080`.

## 9, Kết quả
Bạn sẽ nhìn thấy đoạn CSS mà bạn định nghĩa ở file app.scss.

Đơn giản vậy thôi, bạn sẽ có 1 cấu hình Webpack rất linh hoạt bằng cách sử dụng Laravel Mix mà không cần chính Laravel. 

Trong file `package.json`, thực tế còn có 2 lệnh `production` và `watch`. Cả 2 đều rất hữu ích cho quy trình làm việc của bạn.

Khi bạn deploy project lên production, bạn muốn minify tất cả các assets, bạn chỉ cần chạy lệnh `npm run production`.

Còn nếu chạy `dev` cho mỗi thay đổi nhỏ thì sẽ rất mất thời gian nếu bạn có nhiều file assets. Chỉ cần với `watch` nó sẽ thực hiện giám sát từng thay đổi nhỏ trong file của bạn và biên dịch lại file assets nếu phát hiện có thay đổi.

Có 1 lưu ý nhỏ đó là việc chuẩn đoán lỗi sẽ khó hơn khi `watch` đang chạy. Nếu bạn đang gặp vấn đề, thì tốt nhất vẫn là sử dụng lệnh `dev`.
# III, Tổng kết
Nếu bạn có hứng thú thì code tham khảo [ở đây](https://github.com/LasseRafn/sitepoint-laravel-mix-without-laravel).

Đây có thể coi là cách tối ưu khi bạn muốn sử dụng Laravel Mix cho các dự án nhỏ hơn mà không sử dụng Laravel. Sau khi làm quen rồi thì việc thiết lập chỉ mất vài phút, trong khi cấu hình Webpack mất rất nhiều thời gian. 

Mình thấy bài viết này khá hay ho nên dịch lại. Có gì sai sót thì xin nhận comment ở phía bên dưới. Cảm ơn bạn đã theo dõi bài viết!
## Tham khảo
> https://www.sitepoint.com/use-laravel-mix-non-laravel-projects/