Bài viết xuất phát từ quá trình làm việc thực tế. Chắc hẳn khi làm việc với `Laravel`, không ít người trong chúng ta hay gặp trường hợp như sau.


> Anh ơi từ từ đã, chờ chút em chạy 
```php
php artisan config:clear
php artisan cache:clear
```

> Anh ơi không hiểu sao em sửa file blade rồi mà trên trình duyệt vẫn không có sự thay đổi

Hoặc là 
> À có thể cái này do nó bị cache ở đâu đó, em vừa clear thì nó chạy được rồi 

Nhưng khi mình hỏi tại sao phải chạy lệnh này? mục đích chạy lệnh này làm việc gì ? Hay các file nó được cache ở thư mục nào thì thường không nhận được câu trả lời.

Trong bài viết này, mình sẽ giới thiệu qua về 1 số cơ chế cache **sẵn có** mà Laravel cung cấp. Mò mẫm hơn một chút để chúng ta hiểu khi chạy các lệnh 
* cache:clear
* config:clear || config:cache
* route:clear || route:cache
* view:clear  || view:cache

thực sự chúng giải quyết vấn đề gì cho chúng ta.

Việc hiểu kĩ về những lệnh trên sẽ giúp bạn **debug code** dễ hơn, **apply** vào dự án giúp hệ thống chạy nhanh hơn. Bắt đầu thôi nào !!!


![](https://images.viblo.asia/b5bef5c4-dd8f-43ac-931c-36e1c2130fa5.gif)

# 1. Cache Route
**Routing** trong Laravel thường rất chậm, lí do bởi nó phải thực hiện các tính toán khác nhau ví dụ như **registering route**, **mapping controllers với actions**, xử lí **middlewares**, **matching** các request sao cho khớp với các router, cho dù đó là web hay api.

Khi bạn dùng lệnh 

```php
php artisan route:cache -h
Description:
  Create a route cache file for faster route registration
```
Trong description của command đã giải thích khi chạy lệnh này sẽ tạo ra một **file route cache** làm cho đăng kí route nhanh hơn. Cụ thể hơn thì khi bạn sử dụng **route cache**. Laravel sẽ tạo cho bạn 1 file trong thư mục **bootstrap/cache/routes.php**

File này lưu trữ tất cả các **route** để Laravel không phải "tính toán" lại xem nó chạy như thế nào, các class được mapping ra sao. Vì vậy nó tăng giúp chúng ta tăng tốc độ của một website vì tiết kiệm được thời gian tính toán lại tất cả những điều này.

Như chúng ta có thể thấy việc caching dạng **key-value** giúp application đọc cách **path** nhanh hơn so với việc phải qua quá trình biên dịch code từ các hàm **namespace**, **prefix** ....
```php
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'xxx/xxx/{xxx}/xxx',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'check_login',
          2 => 'has_role:admin',
        ),
        'as' => 'xxx.xxx.xx',
        'uses' => 'App\\Http\\Controllers\\Admin\\XXXController@edit',
        'controller' => 'App\\Http\\Controllers\\Admin\\XXXXController@edit',
        'namespace' => 'App\\Http\\Controllers\\Admin',
        'prefix' => '/admin',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
```

# 2. Config Cache
Toàn bộ các `file config` của Laravel framework tầng application được đặt trong thư mục config. Laravel cung cấp cho chúng ta câu lệnh để gộp toàn bộ các file config lại thành **một single file** nằm tại đường dẫn **bootstrap/cache/config.php**. 
```php
php artisan config:cache
Description: Create a cache file for faster configuration loading
```
Việc đọc **single file** so với **multi file** trong thư mục config làm tăng tốc độ của của application lên vì 

* Single file chỉ cần biên dịch 1 file duy nhất khiến tốc độ hơn
* Việc config **value** dạng **string** giúp chúng ta không phải **excute** thêm để lấy các biến trong file env


Để chi tiết hơn về việc **load** các file **config**. Chúng ta có thể xem thêm [tại đây](https://github.com/laravel/framework/blob/7.x/src/Illuminate/Foundation/Bootstrap/LoadConfiguration.php#L20). Quá trình `bootstrap` được đinh nghĩa rất rõ ràng, khi nào load từ cache, khi không có cache thì xử lí ra sao. Từ logic có thể giải thích được tại sao quá trình load single file lại có `performance` tốt hơn.

>P/S: Nếu bạn thực thi "config:cache" trong khi quá trình deploy, bạn nên chắc chắn rằng bạn chỉ gọi hàm env từ những files cấu hình của mình. Một khi cấu hình được **cached**, file .env sẽ không được load và tất cả kết quả gọi đến env function sẽ trả về null.

Chúng ta cùng ngó qua 1 xíu về file `cache/config.php` và cách hoạt động của command line này nhé.

File `cache/config.php` là tổng hợp của tất cả các config được đặt trong thư mục **config**, lưu dưới dạng **array**.
![](https://images.viblo.asia/503c2049-407e-491a-bc75-dc58d87e8f24.png)


Command **config:cache** được đặt trong thư mục `vendor/laravel/framework/src/Illuminate/Foundation/Console` với cái tên **ConfigCacheCommand.php**.
Toàn bộ logic của `command` thường đặt trong file handle, và trường hợp này cũng không ngoại lệ.

Nhìn vào command chúng ta thấy có 3 việc mà command này thực hiện.
1. Gọi 1 command `php artisan config:clear` để xóa cache cũ, đây cũng là lí do khi chạy config:cace chúng ta nhận về 2 thông báo. Thực chất khi chạy `config:cache`, Laravel còn gọi thêm command line `config:clear` vì vậy có hai thông báo ra màn hình.

```text
Configuration cache cleared! // Thông báo của lệnh config:clear
Configuration cached successfully! Thông báo của lệnh config:cache
```
2. `$config = $this->getFreshConfiguration();`  Lấy config từ `Illuminate/Config/Repository.php` thông qua hàm `all()`.
3. `$configPath = $this->laravel->getCachedConfigPath();` Lấy ra đường dẫn thư mục để tiến hành `caching`. Trên thực tế TH này configPath sẽ là **bootstrap/cache/config.php**.

# 3. Cache view

Laravel cung cấp cho chúng template engine vô dùng đơn giản và tiện dụng với các cú pháp về `foreach`, `if else` ... Tuy nhiên để đánh đổi lấy sự tiện dụng đó. Ứng dụng của chúng ta phải **compile** từ file **blade** về **php** trước khi render thành các text html trả về cho client.

Việc này có thể khiến ứng dụng trở nên **chậm chạp** hơn. Để giải quyết vấn đề này, các nhà phát triển đã tạo **cache** lại các **view** một cách tự động trong các ứng dụng Laravel.

Để thấy được các file cache view này. Bạn mở đường dẫn **storage/framework/views** trong thư mục của dự án Laravel. Tại đây bạn sẽ nhìn thấy rất nhiều các file php với tên **loằng ngoằng** do đã được hash bằng **sha**.

![](https://images.viblo.asia/de6a3cb3-1e55-40e9-8925-386467853aed.png)

Thực ra bạn có thể **customize** được việc lưu trữ các file view ở thư mục nào thông qua **config/view.php**. Thay vì để mặc định như các nhà phát triển Laravel đang cung cấp.

```php
    'compiled' => env(
        'VIEW_COMPILED_PATH',
        realpath(storage_path('framework/views'))
    ),
```
Khi Laravel cố gắng **biên dịch(compiling)** một file view, nó sẽ check xem thời gian thay đổi của nó với file **đã biên dịch(complied)**. Nếu file đã biên dịch bị **outdate**. Tức là trong quá trình code, dev đã thay đổi file ở thư mục **resources/view**. Nhưng file đã **complited** chưa có sự thay đổi. Lúc này quá trình **compile** sẽ diễn ra. Ngược lại, nếu file đã biên dịch không bị outdate, quá trình **compile không diễn ra**. Giúp ứng dụng cuả chúng ta tiết kiệm được thời gian thực thi.

Hàm check thời gian hết hạn thì bạn có thể kiểm tra [tại đây ](https://github.com/laravel/framework/blob/7.x/src/Illuminate/View/Compilers/Compiler.php#L60)


```php
    public function isExpired($path)
    {
        
        $compiled = $this->getCompiledPath($path);
        // If the compiled file doesn't exist we will indicate that the view is expired
        // so that it can be re-compiled. Else, we will verify the last modification
        // of the views is less than the modification times of the compiled views.
        if (! $this->files->exists($compiled)) {
            return true;
        }

        return $this->files->lastModified($path) >=
               $this->files->lastModified($compiled);
    }
```

Còn muốn xem quá trình compile thế nào, check isExpired ra sao thì xem thêm [tại đây](https://github.com/laravel/framework/blob/7.x/src/Illuminate/View/Engines/CompilerEngine.php#L43)



Trong một số trường hợp muốn xóa bỏ cache view bạn có thể dùng lệnh
```php
php artisan view:clear
```

# 4. Cache query
Thực ra mình đề cập đến cache query vì có liên quan đến command `php artisan cache:clear`. Một câu lệnh mà mọi người thường hay nhầm lẫn với **config:clear**. Với lí do là chạy cho nó chắc chắn =))

Vậy khi nào thì cần **cache:clear**. Là khi bạn sử dụng **Illuminate\Support\Facades\Cache** để cache lại dữ liệu nào đó, chẳng hạn như cache lai query chẳng hạn.

Laravel cung cấp cho chúng ta rất nhiều các **Cache Store**:  `"apc", "array", "database", "file", "memcached", "redis", "dynamodb"`

Nhưng mọi người hay sử dụng nhất chắc là file vì nó là **mặc định** =)) Ví dụ chúng ta cache lại query với logic sau

```php
        $key = md5(vsprintf('%s.%s.%s', [
            'UserController',
            'index',
            $request->get('page', 1),
        ]));
        $users = Cache::remember($key, 10000000, function () {
            return User::with('comments')->orderBy('created_at', 'desc')->paginate(10);
        });
```
Lúc này kết quả của câu query sẽ được lưu vào file nằm trong thư mục **framework/cache/data**


# 5.Tổng kết 
![](https://images.viblo.asia/7fc6f2ac-baca-42d7-8629-7a97617477ee.gif)

Tổng kết lại thì chúng ta có thể rút ra được kết luận như sau

| Đặc điểm |  Cache config | Cache route | Cache view | Cache query
| -------- | -------- | -------- | -------- | -------- |
| Câu lệnh     | php artisan config:cache     | php artisan route:cache     |php artisan view:cache     |N/A     |
| Dấu hiệu nhận biết    | bootstrap/cache/config.php    |   bootstrap/cache/routes.php  | storage/framework/views   |storage/framework/cache/data     |
| Lưu ý  | Chỉ dùng cho production   |Chỉ dùng cho production   |Chỉ dùng cho production   |Chỉ dùng cho production   |



Ngoài ra cách bạn có thể tham khảo silde của mình ở đây.

{@embed: https://docs.google.com/presentation/d/1NDOvTcXEo9-oysjmxho8YGgflTFezzocQQ16SjObRag/edit?usp=sharing}

Cảm ơn các bạn đã theo dõi bài viết của mình. Nếu thấy bài viết hữu ích thì cho mình xin **upvote** và đừng quên nhấn **follow** để nhận được thông báo mỗi khi mình ra bài viết mới nhé.