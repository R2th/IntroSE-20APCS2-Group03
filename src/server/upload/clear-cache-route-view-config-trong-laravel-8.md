Hello mọi người<br>
Trong dự án thực tế nhiều khi chúng thêm code vào files route hoặc config nhưng chương trình nó vẫn không chạy, không nhận code mình vừa thêm.<br>
Để giải quyết vấn đề này chúng ta có thể sử dụng những laravel command sau để clear Cache of Route, View, Config nhé.<br>
**Clear Cache:**<br>
```
php artisan cache:clear
```
**Clear Route Cache:**<br>
```
php artisan route:cache
```
**Clear View Cache:**<br>
```
php artisan view:clear
```
**Clear Config Cache:**<br>
```
php artisan config:cache
```
Chúng ta cũng có thể sử dụng clear cache thông qua code trong route như dưới nhé.<br>
```
Route::get('/clear-cache-all', function() {
    Artisan::call('cache:clear');
  
    dd("Cache Clear All");
});
```

Hy vọng bài viết này có ích cho các bạn!