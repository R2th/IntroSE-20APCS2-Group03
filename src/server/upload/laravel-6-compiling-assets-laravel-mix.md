# 1. Giới thiệu
[Laravel Mix](https://github.com/JeffreyWay/laravel-mix) cung cấp fluent API để định nghĩa [Webpack](https://webpack.js.org/concepts/) xây dựng từng bước cho ứng dụng Laravel của bạn bằng cách sử dụng một số bộ tiền xử lý trước CSS và JavaScript phổ biến. Thông qua chuỗi các phương, bạn định nghĩa các asset pipeline của bạn. Ví du: 
```js
mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');
```
# 2. Cài đặt và thiết lập
Trước khi kích hoạt Mix, bạn phải cài node.js và npm (thường thì bạn chỉ cần node.js là sẽ có npm luôn)
Cuối cùng là cài đặt laravel mix:
```js
npm install
```
# 3. Chạy Mix
Mix là một tầng cấu hình phía trên đầu của [Webpack](https://webpack.js.org/concepts/), vì vậy, để chạy các Mix tasks của bạn, bạn chỉ cần thực thi một trong các tập lệnh NPM được bao gồm trong tệp Laravel pack.json mặc định:
```js
// chạy tất cả các Mix tasks
npm  run dev
// chạy hết tất cả các Mix tasks và tối giản đầu ra
npm run production

// tự động recompile flie asets của bạn khi phát hiện nó thay đổi
npm run watch

// một số môi trường nhất định webpack không thể  recompile khi file assets của bạn thay đổi thì ta có thể sử dụng command sau
npm run watch-poll
```
# 4. Làm việc với stylesheets
Tệp webpack.mix.js là điểm vào của bạn cho tất cả quá trình asset compilation. Hãy nghĩ về nó như một trình bao bọc cấu hình nhẹ xung quanh Webpack. Các Mix tasks có thể được kết nối với nhau để xác định chính xác cách asset của bạn sẽ được biên dịch.
## 4.1. Less
Method less có thể sử dụng để compile Less vào trong CSS, compile file app.less vào trong folder public/css/app.css
```js
mix.less('resources/less/app.less', 'public/css');
```
Để compile nhiều file ta gọi nhiều method less
```js
mix.less('resources/less/app.less', 'public/css')
    .less('resources/less/admin.less', 'public/css');
```
Nếu bạn muốn thay đổi tên của file sau khi được compile, bạn có thể pass vào tham số thứ 2 của method less với tên mong muốn
```js
mix.less('resources/less/app.less', 'public/stylesheets/styles.css');
```
Nếu bạn cần ghi đè underlying [Less plug-in options](https://github.com/webpack-contrib/less-loader#options), bạn có thể chuyển một đối tượng làm đối số thứ ba cho mix.less ():
```js
mix.less('resources/less/app.less', 'public/css', {
    strictMath: true
});
```
## 4.2. Sass
Method sass có thể sử dụng để compile Sass vào trong CSS, Bạn có thể sử dụng method như vậy:
```js
mix.sass('resources/sass/app.scss', 'public/css');
```
Một lần nữa, giống như phương thức less, bạn có thể biên dịch nhiều tệp Sass thành các tệp CSS tương ứng của riêng họ và thậm chí tùy chỉnh thư mục đầu ra của CSS kết quả:
```js
mix.sass('resources/sass/app.sass', 'public/css')
    .sass('resources/sass/admin.sass', 'public/css/admin');
```
Bổ sung [Node-Sass plug-in options](https://github.com/sass/node-sass#options) có thể được cung cấp làm đối số thứ ba:
```js
mix.sass('resources/sass/app.sass', 'public/css', {
    precision: 5
});
```
## 4.3. Stylus
Tương tự như Less và Sass, phương thức stylus cho phép bạn biên dịch bút stylus vào trong CSS:
```js
mix.stylus('resources/stylus/app.styl', 'public/css');
```
Bạn cũng có thể cài đặt các bổ sung Stylus plug-ins, chẳng hạn như [Rupture](https://github.com/jescalan/rupture). Đầu tiên, cài đặt nó thông qua NPM (npm install rupture) và sau đó yêu cầu nó trong lệnh gọi mix.stylus ()
```js
mix.stylus('resources/stylus/app.styl', 'public/css', {
    use: [
        require('rupture')()
    ]
});
```
## 4.4. PostCSS
```js
mix.sass('resources/sass/app.scss', 'public/css')
    .options({
        postCss: [
            require('postcss-css-variables')()
        ]
    });
```
## 4.5. Plain CSS
```js
mix.styles([
    'public/css/vendor/normalize.css',
    'public/css/vendor/videojs.css'
], 'public/css/all.css');
```
## 4.6. URL Processing
Hãy tưởng tượng rằng chúng tôi muốn biên dịch Sass bao gồm một URL tương đối thành một hình ảnh:
```css
.example {
    background: url('../images/example.png');
}
```
Theo mặc định, Laravel Mix và Webpack sẽ tìm example.png, sao chép nó vào thư mục public/image của bạn, sau đó viết lại url () trong biểu định kiểu được tạo của bạn. Như vậy, CSS đã biên dịch của bạn sẽ là
```css
.example {
    background: url(/images/example.png?d41d8cd98f00b204e9800998ecf8427e);
}
```
Để disable url rewriting bạn có thể làm như sau:
```js
mix.sass('resources/app/app.scss', 'public/css')
    .options({
        processCssUrls: false
    });
```
## 4.7. Source Maps
Mặc định bị disable, nhưng bạn vẫn có thể activaed nó bằng việc gọi mix.sourceMaps() bên trong file webpack.mix.js, mặc dù nó sẽ tốn chi phí khi compile nhưng sẽ có lợi khi chúng ta debugging trên tool của browser khi compiled assets
```js
mix.js('resources/js/app.js', 'public/js')
    .sourceMaps();
```
Theo mặc định style của source map là eval-source-map, cái mà cung cấp việc thời gian rebuild nhanh, nếu bạn muốn thay đổi style of source map bnaj có thể làm như sau:
```js
let productionSourceMaps = false;

mix.js('resources/js/app.js', 'public/js')
    .sourceMaps(productionSourceMaps, 'source-map');
```
# 5. Làm việc với JavaScript
Mix cung cấp một số tính năng để giúp bạn làm việc với các tệp JavaScript của mình, chẳng hạn như biên dịch ECMAScript 2015, gói mô-đun, thu nhỏ và ghép các tệp JavaScript đơn giản. Thậm chí tốt hơn, tất cả đều hoạt động trơn tru, không đòi hỏi một ounce cấu hình tùy chỉnh
```js
mix.js('resources/js/app.js', 'public/js');
```
## 5.1 React
Mix có thể tự động cài đặt các trình cắm Babel cần thiết cho hỗ trợ React. Để bắt đầu, hãy thay thế gọi mix.js () của bạn bằng mix.react ()
```js
mix.react('resources/js/app.jsx', 'public/js');
```
Đằng sau đó, Mix sẽ tải xuống và bao gồm plugin Babel-preset-Reac-Babel thích hợp
## 5.2 Vanilla JS
Tương tự như kết hợp stylesheets với mix.ststyle (), bạn cũng có thể kết hợp và thu nhỏ bất kỳ số lượng tệp JavaScript nào với phương thức scripts ():
```js
mix.scripts([
    'public/js/admin.js',
    'public/js/dashboard.js'
], 'public/js/all.js');
```
Tùy chọn này đặc biệt hữu ích cho các dự án cũ, nơi bạn không yêu cầu biên dịch Webpack cho JavaScript của mình
# 6. Tủy chỉnh lại cấu hình webpack
Có 2 cách để bạn tùy chỉnh lại cấu hình webpack
## 6.1 Gộp tùy chỉnh cấu hình
Mix cung cấp một phương thức webpackConfig hữu ích cho phép bạn hợp nhất bất kỳ phần ghi đè cấu hình Webpack ngắn nào. Đây là một lựa chọn đặc biệt hấp dẫn, vì nó không yêu cầu bạn sao chép và duy trì bản sao của tệp webpack.config.js. Phương thức webpackConfig chấp nhận một đối tượng, trong đó có chứa bất kỳ cấu hình dành riêng cho Webpack nào mà bạn muốn áp dụng
```js
mix.webpackConfig({
    resolve: {
        modules: [
            path.resolve(__dirname, 'vendor/laravel/spark/resources/assets/js')
        ]
    }
});
```
## 6.2 Tùy chỉnh file cấu hình
Bạn phải copy file node_modules/laravel-mix/setup/webpack.config.js đến thư mục root của project, tiếp theo trỏ tham chiếu --config ở trong file package.json đến file bạn mới copy xong.

Nhược điểm là khi có tính năng mới của webpack.config.js, bạn cần phải copy lại
# 7. Copying Files & Directories
Phương pháp copy có thể được sử dụng để sao chép tệp và thư mục vào vị trí mới. Điều này có thể hữu ích khi một asset cụ thể trong thư mục node_modules của bạn cần được chuyển đến thư mục public của bạn
```js
// copy 1 file
mix.copy('node_modules/foo/bar.css', 'public/css/bar.css');
// copy 1 floder
mix.copyDirectory('resources/img', 'public/img');
```
# 8. Versioning / Cache Busting
Trước đó việc load assets khi mà có sự thay đổi code sau khi compiled khá khó khăn, tuy nhiên Mix có thể làm được điều này dễ dàng với phương thức version.

Phương thức version sẽ tự động thêm một hàm băm duy nhất vào tên tệp của tất cả các tệp được biên dịch, cho phép tạo bộ đệm cache thuận tiện hơn
```js
mix.js('resources/js/app.js', 'public/js')
    .version();
```
Và trong view ta chỉ cần gọi như sau để include file tương ứng khi được compiled
```js
<script src="{{ mix('/js/app.js') }}"></script>
```
Vì các tệp được phiên bản thường không cần thiết trong quá trình develop, bạn có thể hướng dẫn quy trình tạo phiên bản chỉ chạy trên production:
```js
mix.js('resources/js/app.js', 'public/js');

if (mix.inProduction()) {
    mix.version();
}
```
# 9. Tài liệu tham khảo
https://laravel.com/docs/6.x/mix