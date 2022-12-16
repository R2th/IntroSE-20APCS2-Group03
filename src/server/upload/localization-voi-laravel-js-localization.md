# Giới thiệu
Trong thời đại công nghệ số ngày nay, thông tin được biểu hiện dưới nhiều hình thức. Trong đó, nội dung văn bản luôn là yếu tố cốt lõi quan trọng nhất.
Với xu hướng toàn cầu hóa, thành phần tìm kiếm thông tin càng trở nên đa dạng. Việc truyền đạt thông tin trên diện rộng đòi hỏi nội dung thông tin phải phù hợp với từng thành phần người sử dụng khác nhau.
Yếu tố ngôn ngữ phù hợp, thân thiện với người sử dụng luôn được đặt lên hàng đầu. Rào cản ngôn ngữ sẽ khiến người sử dụng sẽ không cảm thấy tin tưởng khi họ không hiểu những gì họ đang làm, không biết sẽ phải làm gì.
Website đa ngôn ngữ ra đời giải quyết vấn đề này bằng cách địa phương hóa nội dung. Làm cho nội dung phù hợp với đa số người sử dụng ở các vùng miền khác nhau.
# Package Laravel-JS-Localization
Nếu đã làm việc với laravel thì hẳn bạn cũng biết việc đa ngôn khá là dễ dàng với sự hỗ trợ tận răng của laravel. Bạn chỉ việc viết mesage ở /resources/lang và gọi ra message bằng @lang() directive hoặc trans() function.
Nhưng nếu bạn muốn hiển thị các message tương ứng khi bạn sử dụng js để validate hay hiển thị message khi xử lý dữ liệu khi dùng ajax thì sao. Rmariuzzo đã đơn giản hóa vấn đề đó bằng cách tạo ra package [Laravel-JS-Localization](https://github.com/rmariuzzo/Laravel-JS-Localization).
# Cài đặt
Để sử dụng laravel-js-localization bạn cần cài nó bằng dòng lệnh với composer:
```
composer require mariuzzo/laravel-js-localization
```
Sau khi Composer tiến hành cài đặt hoàn tất bạn cần thêm providers vào file config/app.php
```
Mariuzzo\LaravelJsLocalization\LaravelJsLocalizationServiceProvider::class
```
# Cách dùng
Để tiến hành publish package cho việc sử dụng thì bạn chạy dòng lệnh:
```
php artisan vendor:publish --provider="Mariuzzo\LaravelJsLocalization\LaravelJsLocalizationServiceProvider"
```
Sau khi thực hiện các bước cơ bản trên để cài đặt thì trong thư mục config sẽ có thêm một file mới là localization-js.php.
Đây chính là file cấu hình cho package. 
```
return [

    /*
     * Set the names of files you want to add to generated javascript.
     * Otherwise all the files will be included.
     *
     * 'messages' => [
     *     'validation',
     *     'forum/thread',
     * ],
     */
    'messages' => [
     //
    ],

    /*
     * The default path to use for the generated javascript.
     */
    'path' => public_path('messages.js'),
];
```
Ở đây bạn có thế đặc tả các file lang mà bạn cần biên dịch để có thể lấy các message bằng js.
Ví dụ bạn cần dùng các message dùng cho việc validation bằng js thì hãy thêm vào mảng messages:
Example
```
   'messages' => [
     'validation',
    ],
```
Giờ thì generate file messages.js bằng cách chạy dòng lệnh
```
php artisan lang:js
```
Tuy nhiên mỗi lần viết thêm message trong file lang thì bạn lại phải chạy lại dòng lệnh trên một cách thủ công.
Tuy nhiên nếu sử dụng Laravel's Mix hoặc Laravel's elixir thì bạn có thể thêm dòng lệnh để chạy tự động mỗi khi bạn biên dich lại assets
### Với Laravel's Mix:
Hãy cài đặt webpack-shell-plugin
```
npm i webpack-shell-plugin
```
Và sau đó thêm vào file webpack.mix.js
```
const WebpackShellPlugin = require('webpack-shell-plugin');

// Add shell command plugin configured to create JavaScript language file
mix.webpackConfig({
    plugins:
    [
        new WebpackShellPlugin({onBuildStart:['php artisan lang:js --quiet'], onBuildEnd:[]})
    ]
});
```
### Với  Laravel's elixir
Cần thêm vào file gulp
Phiên bản Elixir 4.0 hoặc nhỏ hơn:
```
elixir.extend('langjs', function(path) {
    gulp.task('langjs', function() {
        gulp.src('').pipe(shell('php artisan lang:js ' + (path || 'public/js/messages.js')));
    });

    return this.queueTask('langjs');
});
```
Phiên bản Elixir 4.0+:
```
var Task = elixir.Task;
elixir.extend('langjs', function(path) {
    new Task('langjs', function() {
        gulp.src('').pipe(shell('php artisan lang:js ' + (path || 'public/js/messages.js')));
    });
});
```
Và thêm vào
```
elixir(function(mix) {
    mix.langjs();
});
```

## Cách lấy message
 Vậy là một file messages.js đã được tạo ra trong thư mục public của project. Nào bây giờ thì bạn chỉ cần import nó vào master layout:
 `    {{ Html::script('messages.js') }}
`
Giờ đây mỗi khi cần get message nào bạn chỉ cần gọi: Lang.get('messages.home'); y như cách gọi với @lang directive và trans() function vậy
Example
```
Lang.get(validation.accepted');
```
## Thay đổi locale
```
Lang.setLocale('vi');
```
## Kiểm tra message key có tồn tại hay không
```
Lang.has('messages.foo');
```
Còn một số phương thức hữu ích nữa bạn hãy tìm hiểu tại https://github.com/rmariuzzo/Laravel-JS-Localization
# Tham khảo
https://github.com/rmariuzzo/Laravel-JS-Localization