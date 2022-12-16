## 1. HTML minification

Trong quá trình làm việc với HTML, chúng ta thường giữ rất nhiều khoảng trống theo như `coding standard`. Tuy nhiên, trình duyệt không quan tâm đến khoảng trắng đó. Vậy nên khi đưa sản phẩm lên production, chúng ta hoàn toàn có thể loại bỏ các khoảng trống này để giảm kích thước file html mà trình duyệt phải download xuống.

Có khá nhiều cách để thực hiện điều này trong laravel, ở đây mình sẽ sử dụng middleware để unifying html mỗi khi nhận được request

Tạo middleware
```bash
php artisan make:middleware HtmlMifier
```

```php
// HtmlMifier.php
<?php
 
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;

class HtmlMifier
{
    public function handle($request, Closure $next)
    {
  
        $response = $next($request);

        $contentType = $response->headers->get('Content-Type');
        if (strpos($contentType, 'text/html') !== false) {
            $response->setContent($this->minify($response->getContent()));
        }

        return $response;

    }

    public function minify($input)
    {
        $search = [
            '/\>\s+/s',
            '/\s+</s',
        ];

        $replace = [
            '> ',
            ' <',
        ];

        return preg_replace($search, $replace, $input);
    }
}


// kernel.php
protected $routeMiddleware = [
  // ...
  'HtmlMinifier' => '\App\Http\Middleware\HtmlMinifier',
];
```

Sau khi thêm middleware vào kernel, chúng ta có thể sử dụng chúng trong route hoặc trong controller. Dùng trong controller khá là vất khi phải sửa nhiều file nên mình sẽ đặt nó trong route.

```php
Route::group(['middleware'=>'HtmlMinifier'], function() { 
    Route::get('/', 'SiteController@home');
    Route::get('/{slug}', 'SiteController@postDetails');
    // .....
});
```

Vậy là xong, mỗi khi nhận được request dạng `text/html` thì file html của chúng ta sẽ được minify để giảm thiểu dung lượng mà browser phải download xuống.


## 2. Route caching
Trước hết chúng ta sẽ xem lại cách mà route được load trong laravel.

Trong file `config/app.php` các bạn có thể thấy khai báo của `App\Providers\RouteServiceProvider::class`trong danh sách provider mặc định của laravel. Mà thằng này được extends từ `Illuminate\Foundation\Support\Providers\RouteServiceProvider`. Chúng ta cùng xem phương thức `boot()` của 2 thằng này nhé:

```php
// App\Providers\RouteServiceProvider
public function boot()
{
    //

    parent::boot();
}

// Illuminate\Foundation\Support\Providers\RouteServiceProvider
public function boot()
{
    $this->setRootControllerNamespace();

    if ($this->app->routesAreCached()) {
        $this->loadCachedRoutes();
    } else {
        $this->loadRoutes();

        $this->app->booted(function () {
            $this->app['router']->getRoutes()->refreshNameLookups();
            $this->app['router']->getRoutes()->refreshActionLookups();
        });
    }
}
```

Xem qua phương thức `boot()` thì chúng ta có thể thấy, khi route được cache thì hệ thống sẽ load cache từ file (`bootstrap/cache/routes.php`). Còn không thì nó sẽ phải chạy khá là nhiều bước và tốn khá là nhiều thời gian cho việc load route từ thư mục route lên. Chi tiết hơn thì các bạn có thể đọc thêm ở [đây](https://voltagead.com/laravel-route-caching-for-improved-performance/). Túm lại, có cache thì hệ thống không phải load route ở thư mục route, rồi map, rồi resolve các thứ, nó chỉ cần load 1 file duy nhất lên và chạy.

Tạo cache cho route khá là đơn giản, chúng ta chỉ cần chạy lệnh:

```bash
php artisan route:cache
```

Có một lưu ý khi sử dụng route cache là mỗi khi có sự thay đổi trong route của bạn. Bạn cần phải chạy lại lệnh để tạo mới cache cho route.


Để xóa route cache, chúng ta có thể dùng lệnh
```bash
php artisan route:clear
```

## 3. Query caching

Giả sử chúng ta có 50 posts trên trang web của chúng ta và mỗi ngày có 1000 khách truy cập truy cập trang web. Trong tình huống này, bất cứ khi nào có khách truy cập đọc 1 post nào đó, hệ thống sẽ truy cập cơ sở dữ liệu để lấy nội dung của post. Nếu dữ liệu và query đơn giản thì không sao, tuy nhiên ít có hệ thống nào mà đơn giản được, vậy nên việc thường xuyên lấy dữ liệu trong cơ sở dữ liệu sẽ tốn kha khá thời gian. Để tránh việc thường xuyên truy cập vào csdl để lấy dữ liệu, chúng ta có thể cache dữ liệu của các posts. Khi bất kỳ người dùng nào đọc một post thì nó sẽ lưu trong bộ nhớ cache của chúng ta và tiếp theo nếu ai đó muốn đọc post đó thì post sẽ được load từ cache thay vì lấy từ cơ sở dữ liệu.

```php
// example.com/awesome-post-title
public function postDetails($slug){
    
    $post = Cache::rememberForever('posts.'.$slug, function($slug) use($slug) {
            return Post::where('slug',$slug)->first();
    });

    return view('frontend.posts.post-details',['post'=>$post]);
} 
```

Okie, vậy nếu post được cập nhật thì sao? Thì chúng ta cập nhật lại cache cho post đó thôi. Các bạn có thể cập nhật cho nó sau mỗi khi post được cập nhật. Hoặc đơn giản hơn, sử dụng observer của laravel thôi.

```php
<?php
namespace App;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    
    public static function boot()
    {
        parent::boot();

        static::updating(function ($instance) {
            // update cache content
            Cache::put('posts.'.$instance->slug,$instance);
        });

        static::deleting(function ($instance) {
            // delete post cache
            Cache::forget('posts.'.$instance->slug);
        });
    }
}
```

## 4. Configuration caching

Mỗi project laravel, hầu hết các config đều được đặt trong thư mục `config`, laravel sẽ `parse` tất cả các file này khi chạy. Để giảm thiểu việc parse những file này, chúng ta có thể sử dụng `config:cache`:

```bash
php artisan config:cache
```

Command này sẽ tạo cache cho tất cả các config của hệ thống của bạn và lưu vào `bootstrap/cache/config.php`. Tương tự với cache route, mỗi khi bạn có thêm hoặc cập nhật config, bạn cần chạy lại lệnh ở trên để tạo lại cache cho nó. Còn nếu bạn không muốn cache config thì có thể chạy lệnh dưới đây để clear config cache

```js
php artisan config:clear
```

## 5. Bundle & Minify CSS/JS
Hiện nay, việc minify css/js dường như đã trở thành mặc định mỗi khi chúng ta build/compile js cũng như css. Còn việc gộp (bundle) các file css/js thì tùy vào mục đích sử dụng của chúng mà chúng ta quyết định gộp hay sử dụng lazy load.

Để gộp các file lại, chúng ta có thể sử dụng như dưới
```js
//css bundle
mix.styles([
    'public/css/vendor/bootstrap.min.css',
    'public/css/style.css'
], 'public/bundle/app.css');


//js bundle
mix.scripts([
    'public/js/vendor/jquery-2.1.4.js',
    'public/js/vendor/bootstrap.min.js',
    'public/js/functions.js'
], 'public/bundle/app.js');
```

Để minify sau khi build thì chúng ta sử dụng lệnh:
```bash
npm run production
```

## 6. Optimize images
Hình ảnh, một trong những thành phần không thể thiếu trong mỗi website. Tuy nhiên, việc sử dụng ảnh một cách tối ưu trên trang web của chúng ta lại không dễ dàng. Chúng ta không thể sử dụng ảnh kích thước nhỏ cho mọi size của viewport, hay dùng ảnh lớn khi người dùng sử dụng trình duyệt trên mobile. Chính vì vậy chúng ta cần tối ưu lại ảnh của chúng ta tùy theo viewport.

Để làm việc này, chúng ta cần thực hiện 2 việc
- sử dụng lazy load cho ảnh
- resize ảnh theo viewport

Việc sử dụng lazy load khá là dễ dàng. Còn resize ảnh thì sao. Các bạn có thể tự build một service riêng để thực hiện việc này. Mỗi khi có request một ảnh nào đó kèm theo size, thì service này sẽ resize ảnh và trả về theo size tương ứng. Hoặc đơn giản hơn, sử dụng dịch vụ của bên thứ 3. Như aws chẳng hạn, họ cung cấp dịch vụ resize ảnh hoàn toàn miễn phí, tuy nhiên, bạn sẽ phải trả phí cho việc lưu trữ file ảnh gốc.
 

## 7. Eager Loading
`Eager loading` là cụm từ khá phổ biến mà các laravel developer sử dụng. Nó cho phép chúng ta load trước các dữ liệu cần thiết một cách tự động để tối ưu việc truy xuất vào csdl.

Như ví dụ dưới đây, chúng ta có mối quan hệ 1-n giữa post và comment:

```php
class Comment extends Model
{
    public function post()
    {
      return $this->belongsTo(Post::class);
    }
}

class Post extends Model
{
    public function comments()
    {
      return $this->hasMany(Comment::class);
    }
}
```

Để lấy tất cả post kèm theo comment tương ứng mà không dùng eager loading, thì chúng ta sẽ phải loop như dưới đây
```php
$posts = Post::all();
   
foreach ($posts as $post) {
    echo $post->name;
   
    $comments = $post->comments;
    foreach($comments as $comment){
        // do something
    }
}
```

Mỗi khi chúng ta gọi, `$comments = $post->comments;` thì chúng ta sẽ thực hiện 1 truy vấn vào csdl để lấy comment tương ứng với post này. Ai lại làm thế dúng không, nếu số lượng post lớn, việc này sẽ tốn một mớ thời gian của hệ thống.

Để giải quyết vấn đề này, chúng ta sử dụng `eager loading`. Hệ thống sẽ tự tối ưu lại query cho chúng ta. Thay vì truy vấn liên tục vào csdl để lấy các comments, thì chúng ta chỉ cần truy vấn 1 lần để lấy tất cả.
```php
$posts = Post::with('comments')->get();
   
foreach ($posts as $post) {
    echo $post->name;
   
    $comments = $post->comments;
    foreach($comments as $comment){
        // do something
    }
}
```

Vẫn là đoạn code duyệt post như trước, tuy nhiên khi chạy nó chỉ thực hiện đúng 2 truy vấn như dưới:
```sql
# First query
SELECT * FROM posts;

# Second query
SELECT * FROM comments WHERE post_id IN (1, 2, 3, 4, 5, ...);
```
 

## 8. Kết
Ở trên là 7 cách mà mình thường dùng để tối ưu website chạy bằng laravel của mình. Các cách này đều tối ưu trực tiếp từ laravel.

Ngoài ra chúng ta có thể tối ưu trên server như:
- tối ưu htaccess
- Dùng webserver xịn hơn
- sử dụng CDN (Content Delivery Network)
- ...

Source: https://laravelarticle.com/speed-up-laravel-website