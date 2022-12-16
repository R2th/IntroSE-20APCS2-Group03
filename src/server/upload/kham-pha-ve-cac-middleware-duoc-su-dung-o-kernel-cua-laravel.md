***Ở bài viết này mình sẽ cùng các bạn đi tìm hiểu về các Middleware được khai báo trong Kernel (App\Http\Kernel) của Laravel xem cách chúng hoạt động ra sao, bài viết này mình chỉ đề cập đến cách hoạt động của Middleware base còn nếu bạn muốn tìm hiểu khái niệm hay cách tạo Middleware thì có thể đọc trên docs của laravel  https://laravel.com/docs/5.7/middleware.***
### Kernel
Đầu tiên mở file Kernel trong laravel ra chúng ta sẽ thấy như sau (laravel 5.7):
```php
<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * These middleware are run during every request to your application.
     *
     * @var array
     */
    protected $middleware = [
        \App\Http\Middleware\CheckForMaintenanceMode::class,
        \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
        \App\Http\Middleware\TrimStrings::class,
        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
        \App\Http\Middleware\TrustProxies::class,
    ];

    /**
     * The application's route middleware groups.
     *
     * @var array
     */
    protected $middlewareGroups = [
        'web' => [
            \App\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            // \Illuminate\Session\Middleware\AuthenticateSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \App\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        'api' => [
            'throttle:60,1',
            'bindings',
        ],
    ];

    /**
     * The application's route middleware.
     *
     * These middleware may be assigned to groups or used individually.
     *
     * @var array
     */
    protected $routeMiddleware = [
        'auth' => \App\Http\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
        'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class,
        'can' => \Illuminate\Auth\Middleware\Authorize::class,
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
        'signed' => \Illuminate\Routing\Middleware\ValidateSignature::class,
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
    ];
}

```

### Phân loại
Như các bạn thấy trong file này sẽ phân làm 3 loại Middleware
* Global Middleware: Bất cứ request nào cũng sẽ được lọc bởi các Middleware này
* Route Middleware: Là nơi khai báo Middleware với 1 định danh, sau đó có thể sử dụng qua định danh (mình thường hay sử dụng trong route hoặc hàm construct controller để lọc request)
* Middleware Groups: Nhóm các Middleware lại thành 1 Middleware, khai báo bằng namespace hoặc định danh Middleware đã được định nghĩa tại Route Middleware, mặc định laravel đã tạo sẵn 2 Middleware Groups là web và api tương ứng là 2 file web.php và api.php trong thư mục routes (2 Middleware trên được được map với 2 file route tại App\Providers\RouteServiceProvider)

### Cách hoạt động

**CheckForMaintenanceMode**: Kiểm tra xem ứng dụng của ta có đang ở trạng thái bảo trì hay không
- Trong quá trình vận hành một website, sẽ có lúc bạn cần bật chế độ bảo trì, tức là tất cả các đường dẫn đều thông báo website đang bảo trì. Chế độ bảo trì cần thiết cho những mục đích như cập nhật cơ sở dữ liệu hoặc có một số thay đổi trong ứng dụng, với Laravel, việc chuyển sang chế độ bảo trì là rất đơn giản.
- Để chuyển toàn bộ website sang chế độ bảo trì bạn chỉ cần chạy câu lệnh
    ```php
    php artisan down
    ```
- Nếu bạn muốn thay đổi thông báo mặc định, có thể sử dụng tham số –message, nó sẽ hiển thị message này thay thế cho thông báo trên. Tham số thứ hai là –retry giúp thêm giá trị Retry-After vào header khi response, nó giúp cho các bộ máy tìm kiếm như Google chẳng hạn biết để quay lại và crawl dữ liệu.
    ```php
    php artisan down --message="Upgrading Database" --retry=60
    ```
- Khi muốn chuyển toàn bộ website về trạng thái hoạt động bình thường, bạn chỉ cần thực hiện câu lệnh 
    ```php
    php artisan up
    ```
    
**ValidatePostSize**: Kiểm tra post size.
- Thực hiện lấy CONTENT_LENGTH trong mảng $_SERVER từ request gửi lên để kiểm tra
- Hàm đầu tiên được gọi là `ini_get('post_max_size')` để lấy ra postMaxSize cấu hình, nếu hàm này trả về giá trị kiểu byte lập tức sẽ return và sử dụng để so sánh với CONTENT_LENGTH đã lấy được ở trên, nếu CONTENT_LENGTH lớn hơn postMaxSize lập tức 1 Exception sẽ được bắn ra với trạng thái là 413
- Trường hợp postMaxSize lấy ra là kiểu kilobyte, megabyte hay gigabyte sẽ được chuyển đổi về kiểu byte trước khi so sánh, dưới đây là đoạn code xử lí trong core của Laravel
    ```php
        public function handle($request, Closure $next)
        {
            $max = $this->getPostMaxSize();

            if ($max > 0 && $request->server('CONTENT_LENGTH') > $max) {
                throw new PostTooLargeException;
            }

            return $next($request);
        }

        protected function getPostMaxSize()
        {
            if (is_numeric($postMaxSize = ini_get('post_max_size'))) {
                return (int) $postMaxSize;
            }

            $metric = strtoupper(substr($postMaxSize, -1));
            $postMaxSize = (int) $postMaxSize;

            switch ($metric) {
                case 'K':
                    return $postMaxSize * 1024;
                case 'M':
                    return $postMaxSize * 1048576;
                case 'G':
                    return $postMaxSize * 1073741824;
                default:
                    return $postMaxSize;
            }
        }
    ```
 

**TrimStrings**: Toàn bộ request string sẽ được strim hết.

**ConvertEmptyStringsToNull**: Chuyển string thành null hết, kết hợp với TrimStrings là cặp bài trùng.

**TrustProxies**: Dùng cho load balance, liệt danh sách proxy tin tưởng.

Nếu trang web của bạn nằm ở phía sau một proxy ví dụ như là một load balancer, ứng dụng của bạn có thể gặp phải một số vấn đề sau:
* Redirects và PHP-generated URLs có thể không chính xác về địa chỉ website, protocol hoặc port.
* Các Unique session có thể không được tạo cho mỗi user, dẫn đến việc truy cập các tài khoản không chính xác hoặc không có khả năng đăng nhập. 
* Việc ghi log dữ liệu hoặc thu thập dữ liệu có thể xuất phát từ cùng một vị trí (chính bản thân proxy) khiến bạn không có cách nào phân biệt giữa lượng truy cập hoặc hành động thực hiện bởi các client khác nhau.

Chúng ta có thể giải quyết vấn đề trên bằng cách lắng nghe các X-Forwarded-* header. Các header này thường được thêm bởi các proxy để cho phép ứng dụng web của bạn biết chi tiết về người khởi tạo yêu cầu. Thông thường gồm có:
* X-Forwarded-For - Địa chỉ IP của client.
* X-Forwarded-Host - Tên máy chủ được sử dụng để truy cập web trên trình duyệt.\
* X-Forwarded-Proto - The schema/protocol (http/https) được sử dụng bởi client.
* X-Forwarded-Port - Port được sử dụng bởi client (thường là 80 hoặc 443).

Laravel sử dụng Symfony để xử lý các Request và Response. Các class này có các phương thức để xử lý các proxy. Tuy nhiên, vì lý do an ninh, chúng phải được thông báo về các proxy được "tin tưởng" trước khi đọc các X-Forwarded-* header. Bạn cần nói cho Laravel biết các địa chỉ IP của proxy của bạn, ứng dụng sẽ biết để "tin tưởng" chúng. Nếu nó nhận thấy địa chỉ IP nhận được là đáng tin cậy, nó sẽ tìm các X-Forwarded-* header. Nếu không, nó sẽ bỏ qua.

**EncryptCookies**: Mã hóa cookie

**AddQueuedCookiesToResponse**: Thêm cookie vào response

**StartSession**: Khởi động session

**ShareErrorsFromSession**: chia sẻ lỗi từ session ra view (ở view chúng ta hay sử dụng biến $errors để xuất lỗi thì nó được tạo ra từ đây)

**VerifyCsrfToken**: kiểm tra csrf token (khi gửi dữ liệu lên qua các phương thức như post, put, patch, delete ... thì chúng ta cần phải thêm 1 trường hidden là _token hoặc set header "X-CSRF-TOKEN" có giá trị được lấy qua hàm csrf_token())

**SubstituteBindings**: route sử dụng Eloquent model bindings, sẽ tự động thay thế paramete thành Eloquent model.

* Bình thường ta thường hay sử dụng model binding trong controller resource như sau

    Route
    ```php
    Route::resource('products', 'ProductController');
    ```
    
    Controller
    ```php
   public function show(Product $product)
   {
       return view('products.show', compact('product'));
   }

   public function edit(Product $product)
   {
       return view('products.edit', compact('product'));
   }

   public function destroy(Product $product)
   {
       $product->delete();
   }
    ```
    
    Blade
    ```php
    route('products.show', $product->id)
    route('products.edit', $product->id)
    route('products.destroy', $product->id)
    ```
    
    Khi sử dụng route resource chúng ta truyền tham số lên ngoài cách lấy đúng param truyền lên ta còn có thể sử dụng cơ chế DI của laravel để map với model, mặc định thì laravel để field là id chúng ta có thể tùy chỉnh tham số này trong model, ví dụ mình đổi thành slug.
    ```php
    public function getRouteKeyName()
    {
        return 'slug';
    }
    ```
    
* Ngoài cách trên ta còn có những cách sau để sử dụng model binding
    
    Khai báo tham số route giống tên model, ví dụ
    ```php
    Route::post('product/trash/{product}', 'ProductController@trash')->name('product.trash');
    ```
    
    Trường hợp tham số không trùng tên model mà vẫn muốn sử dụng model binding thì ta cần thêm ràng buộc, ta sử dụng phương thức model của biến $router trong phương thức RouteServiceProvider::boot để xác định lớp cần ràng buộc cho một tham số
    ```php
    use App\Models\Product;
    
    public function boot(Router $router)
    {
        parent::boot($router);
        
        $router->model('product', Product::class);
    }
    ```
    Tùy chỉnh Not Found
    ```php
    use App\Models\Product;
    
    public function boot(Router $router)
    {
        parent::boot($router);
        
        $router->model('product', Product::class, function() {
           throw new NotFoundHttpException;
        });
    }
    ```
    
    Tùy chỉnh logic model binding
    ```php
    use App\Models\Product;
    
    public function boot(Router $router)
    {
        parent::boot($router);
        
        $router->bind('product', function ($value) {
            return Product::find($value)
                ->whereStatus('published')
                ->first();
        });
    }
    ```
    
**ThrottleRequests**: giới hạn số lượng request gửi lên trong 1 khoảng thời gian, mặc định là 60 request trong 1 phút

### Tài liệu tham khảo
* https://laravel.com/docs/5.7/middleware
* https://chungnguyen.xyz/posts/laravel-request-lifecycle-laravel-hoat-dong-nhu-the-nao-ban-biet-chua
* https://laravel.com/docs/5.7/routing#route-model-binding