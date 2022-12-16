### Assets Bundling
Laravel Mix được cài mặc định với tất cả các ứng dụng Laravel. Sử dụng một số bộ tiền xử lý CSS và JavaScript phổ biến, Laravel Mix cung cấp API hiệu quả để xác định bản dựng Webpack cho các ứng dụng PHP của bạn. Để compile các asset ứng dụng bao gồm script, style và các thứ khác, tôi sẽ sử dụng Laravel Mix để biên dịch. Với thực tiễn đó, chúng ta có thể ghép một số stylesheets thành một tệp một cách hiệu quả.
```
mix.styles([
'public/css/vendor/normalize.css',
'public/css/styles.css'
], 'public/css/all.css');
```
Nó sẽ tạo ```all.css``` chứa các styles từ ```normalize.css``` và ```style.css```. Bằng cách này, chúng ta có thể dễ dàng sử dụng ```all.css``` trong HTML của mình, thay vì bao gồm cả ```normalize.css``` và ```style.css``` riêng lẻ. Điều này sẽ lần lượt giảm số lượng yêu cầu HTTP cần thiết để truy xuất các file riêng lẻ. Bởi vì bây giờ nó chỉ cần một yêu cầu thay vì hai để lấy một file. Và kết quả là, chúng ta nhận thấy tốc độ ứng dụng của chúng ta tăng nhẹ.

<br>

### Assets minifying
Biên dịch tất cả các assets ở một nơi có thể kết thúc bằng một file kích thước lớn. Do đó, thực tiễn này sẽ không cho phép ứng dụng của chúng ta có lợi từ việc biên soạn được đề xuất. Do đó, để giải quyết vấn đề này, chúng ta có thể giảm thiểu assets của mình bằng cách sử dụng Laravel Mix.
```
npm run production
```
Điều này sẽ chạy tất cả các Mix task và đảm bảo các assets của chúng ta là production bằng cách giảm thiểu chúng. Khi được thu nhỏ, các assets sẽ có kích thước nhỏ hơn, do đó sẽ được truy xuất nhanh hơn, điều này sẽ tăng tốc hiệu suất của ứng dụng của chúng ta.

<br>

### Running the latest version of PHP
Phiên bản mới nhất của PHP đã mang lại những cải tiến đáng kể trong hiệu suất của nó. Do đó, đảm bảo rằng ứng dụng Laravel của bạn đang chạy phiên bản PHP mới nhất, để bạn có thể chạm vào tất cả các cải tiến hiệu suất được giới thiệu trong phiên bản mới trong ứng dụng của bạn.

<br>

Cloudways cũng có PHP7.2 được tích hợp mặc định trong platform của nó. Vì vậy, người dùng có thể tối ưu hóa các ứng dụng của mình với tốc độ và hiệu suất hoàn hảo bằng cách sử dụng các chức năng nâng cao của platform.

<br>

Platform cho phép bạn dễ dàng thay đổi các phiên bản PHP trước đây của mình thành PHP7.2 mới hơn chỉ trong một cú click chuột

<br>

### Laravel Debugbar
Mặc dù không phải là một kỹ thuật tối ưu hóa, nhưng là một package. Laravel Debugbar là một package để tích hợp PHP Debug Bar với Laravel 5. Nó bao gồm ```ServiceProvider``` để đăng ký thanh gỡ lỗi và gắn nó vào output. Nó là một package có thể được sử dụng như một màn hình hiệu suất của Laravel. Bạn nên sử dụng package này trong khi phát triển ứng dụng của mình. Bởi vì với nó, bạn có thể dễ dàng kiểm tra cách ứng dụng của bạn đang chạy, và sau đó cải thiện tương ứng.

<br>

### General Performance Tuning Tips for Laravel
Laravel thường được sử dụng để tạo các websites và webportals. Trong nhiều trường hợp, tối ưu hóa hiệu suất của website chỉ là vấn đề thực hiện một số điều chỉnh, chẳng hạn như:
1. Laravel page speed composer package
2. Update provider details
3. Publish the package
4. Register your Middleware
5. Make route over page
6. Create Blade File
7. Run app

<br>

**Laravel page speed composer package**

<br>

Download và giải nén ```renatomarinho/laravel-page-speed package``` bằng Composer. Chỉ cần thêm tên package với chi tiết phiên bản trong file ```composer.json``` và chạy lệnh ```composer update```: 
```
"require": {
   ......
   ......
   "renatomarinho/laravel-page-speed": "^1.8"
},
```
Tiếp theo, chạy câu lệnh ```composer update```:
```
composer update
```

<br>

**Update Provider Details**

<br>

Sau khi giải nén thành công package, vào file ```config/app.php```. Thêm service provider và alias detail với specific class.
```
'providers' => [
....
....
RenatoMarinho\LaravelPageSpeed\ServiceProvider::class,
],
```

<br>

**Publish the package**

<br>

Sau khi thêm provider detail, chúng ta cần public package cụ thể để triển khai trong ứng dụng của mình. Lệnh sau giúp chúng ta public package sau khi thực hiện command chúng ta có thể sử dụng package: 
```
php artisan vendor:publish --provider="RenatoMarinho\LaravelPageSpeed\ServiceProvider"
```

<br>

**Adding middleware for web access**

<br>

Sau khi public package chúng ta cần thêm middleware detail trong file ```Kernel.php```.  Chỉ cần copy và paste code dưới ```$middlewaregroup```,

```
protected $middlewareGroups = [
   'web' => [
       ........
       ........
       \RenatoMarinho\LaravelPageSpeed\Middleware\InlineCss::class,
\RenatoMarinho\LaravelPageSpeed\Middleware\ElideAttributes::class,
\RenatoMarinho\LaravelPageSpeed\Middleware\InsertDNSPrefetch::class,
\RenatoMarinho\LaravelPageSpeed\Middleware\RemoveComments::class,
\RenatoMarinho\LaravelPageSpeed\Middleware\TrimUrls::class,
\RenatoMarinho\LaravelPageSpeed\Middleware\RemoveQuotes::class,
\RenatoMarinho\LaravelPageSpeed\Middleware\CollapseWhitespace::class,
  ]
]
Define Route
I  going to add a route to check Optimized Website Speed and Performance in Laravel 5.5
Route::get('/listView', function () {
return view('listView');
});
```

<br>

**View page details**

<br>

Cuối cùng, tạo file blade và include chúng vào để hiển thị.

<br>

Tài liệu: https://www.cloudways.com/blog/laravel-performance-optimization/#staticass