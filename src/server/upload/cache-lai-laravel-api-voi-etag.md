## Mở đầu

Hiện nay, các ứng dụng web hiện đại thường tách biệt các thành phần frontend và backend, việc này giúp cho bạn chủ động trong việc phát triển từng thành phần, có thể deploy từng thành phần riêng biệt. Khi đó phía frontend sẽ sử dụng dữ liệu từ backend thông qua các API, vì thế dần bạn sẽ phải quan tâm tới các request tới API, khi nào cần fetch dữ liệu từ API, hay khi nào dữ liệu được cache lại đã expired hay chưa ? Để handle việc này, bạn có thể sử dụng tới `ETag` header. 

Trong bài viết này, chúng ta sẽ tìm hiểu về `ETag`, `If-None-Match` và `If-Match` headers làm gì, và cách áp dụng nó vào trong ứng dụng Laravel như nào.

## ETag

Theo như [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag), 

> The ETag HTTP response header is an identifier for a specific version of a resource. It lets caches be more efficient and save bandwidth, as a web server does not need to resend a full response if the content has not changed. Additionally, etags help prevent simultaneous updates of a resource from overwriting each other

`ETag` header là một giá trị đại diện cho giá trị nằm bên trong `response body` , trong nhiều trường hợp, giá trị của `ETag` chính là giá trị hash của content, bởi nó dễ dàng được generate và nó unique cho từng dữ liệu trong response body.

Để khiến cho `ETag` header thực sự hữu dụng, chúng ta cần sử dụng thêm request có điều kiện (conditional requests).  Về `If-None-Match` header, giá trị này thường được sử dụng cho các `GET` request, khi backend nhận được request chưa giá trị này, nó sẽ so sánh nó với giá trị hash của nội dung sắp được trả về, nếu 2 giá trị trùng khớp, status code `304` sẽ được trả về, kết quả trong response thông báo cho bạn biết cần fetch resource về. Cách implement nó khá đơn giản, trong trong request `GET` đầu tiên, bạn sẽ được cấp `ETag` trong header của response, browser sẽ tự động set `If-None-Match` header trong request lấy resource tiếp theo. Như vậy, khi bạn implement `ETag` và `If-None-Match` ở backend, lượng dữ liệu truyền từ API đến frontend sẽ được giảm đi.

Về `If-Match` header, giá trị này được dùng để tránh `mid-air collisions` - Trường hợp khi bạn đang chỉnh sửa 1 dữ liệu, nó sẽ được hash và đưa vào `ETag`, và khi bạn lưu dữ liệu, `POST` request sẽ chứa `If-Match` header để check lại cập nhật của dữ liệu. Nó hoạt động tương tự `If-None-Match`. Sau khi fetch resource chứa giá trị `ETag`, bạn có thể tạo `PATCH` request tới resource và set `If-Match` tương ứng với `ETag` bạn nhận được ở request trước. Backend sẽ kiểm tra nếu giá trị `ETag` của resource ở server trùng với cái request gửi lên, nếu trùng, việc cập nhập của bạn sẽ được chấp nhận. Nếu không trùng nhau, status code `412` sẽ được trả về, frontend sẽ được thông báo.

## Cài đặt

### Init laravel project 

Trước tiên của init 1 project Laravel trước cho chắc =)) 

Công việc này khá là quen thuộc với các bạn đã làm việc với Laravel, chúng ta cần clone Laravel app từ Github về bằng các command dưới đây : 

``` shell
$ git clone git@github.com:laravel/laravel.git my-laravel
$ cd my-laravel
$ cp .env.example .env
$ sudo chmod -R 777 storage/
$ composer install
```

### Conditional request

#### SetEtag middleware 
Với Laravel, chúng ta sẽ implement thông qua `middleware`. Laravel cũng cung cấp option để set `ETag`  header thông qua `SetCacheHeaders` middleware, nhưng nó không hỗ trợ các request method `HEAD`, vì thế ta bổ sung 1 middleware `SetEtag` như bên dưới

```php:app/Http/Middleware/SetEtag.php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SetEtag
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $method = $request->getMethod();

        // Support using HEAD method for checking If-None-Match
        if ($request->isMethod('HEAD')) {
            $request->setMethod('GET');
        }

        $response = $next($request);

        // Setting etag
        $etag = md5($response->getContent());
        $response->setEtag($etag);

        $request->setMethod($method);

        return $response;
    }
}
```

Đầu tiên, ta cần lấy thông tin method request đang sử dụng, nếu là method `HEAD` update lại method về GET để chắc chắn content sẽ được load, hash tương ứng sẽ được tạo. Sau đó, chúng ta lấy response và tạo hash, rồi set giá trị đó vào `ETag` header và đổi lại method về method ban đầu.

#### IfNoneMatch middleware
```php:app/Http/Middleware/IfNoneMatch.php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IfNoneMatch
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $method = $request->getMethod();

        if ($request->isMethod('HEAD')) {
            $request->setMethod('GET');
        }

        //Handle response
        $response = $next($request);

        $etag = '"'.md5($response->getContent()).'"';
        $noneMatch = $request->getETags();

        if (in_array($etag, $noneMatch)) {
            $response->setNotModified();
        }

        $request->setMethod($method);

        return $response;
    }
}
```

Đầu tiên cũng giống như `SetEtag` middleware, chúng ta cần xử lý `HEAD` request và sau đó generate hash dựa trên response content.

> Lưu ý : Trong trường hợp này, ta cần đặt hash bên trong ngoặc kép `"`

Sau khi đã có ETag hash, chúng ta cần so sánh nó với `If-None-Match` header. Bởi vì `If-None-Match` có thể chứa nhiều hash vì thế hàm `getETags()` sẽ trả về giá trị là array, ta cần kiểm tra xem trong array có tồn tại giá trị mà ta vừa generate ở trên không ? Nếu trùng khớp, ta dùng `setNotModified()` method để response về status code `304`.

#### IfMatch middleware

Việc xử lý `If-Match` header sẽ phức tạp hơn khi chúng ta cần phải tìm cách để có được thông tin về version hiện tại của nội dung cần cập nhập qua các cách

- Ta có thể dùng 1 HTTP client và tạo 1 request external tới chính resource đó
- Sử dụng trực tiếp action được thực thi bởi request và thay vì gọi 1 `GET` request 
- Dùng HTTP client và tạo 1 request internal tới resource

Chúng ta sẽ dùng cách tạp 1 request để lấy về version hiện tại của resource.

```php:app/Http/Middleware/IfMatch.php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IfMatch
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Next unless method is PATCH and If-Match header is set
        if (!($request->isMethod('PATCH') && $request->hasHeader('If-Match'))) {
            return $next($request);
        }

        // Create new GET request to same endpoint,
        // copy headers and add header that allows you to ignore this request in middlewares
        $getRequest = Request::create($request->getRequestUri(), 'GET');
        $getRequest->headers = $request->headers;
        $getRequest->headers->set('X-From-Middleware', 'IfMatch');
        $getResponse = app()->handle($getRequest);

        // Get content from response object and get hashes from content and etag
        $getContent = $getResponse->getContent();
        $getEtag = '"'.md5($getContent).'"';
        $ifMatch = $request->header('If-Match');

        // Compare current and request hashes
        if ($getEtag !== $ifMatch) {
            return response(null, 412);
        }

        return $next($request);
    }
}
```

Đầu tiên, middleware sẽ bỏ qua tất cả những request không phải method `PATCH` và không được set `If-Match` header. Tiếp theo, chúng ta tạo 1 request GET tới chính endpoint hiện tại và copy headers của request hiện tại qua `GET` request  để nó có thể pass qua các middleware cần thiết. Sử dụng response của `GET` request mới để tạo hash và so sánh với hash bên trong `PATCH` request vừa được gửi lên. Nếu hash này trùng nhau,`PATCH` request sẽ vượt qua middleware và thực hiện các  thay đổi, còn không thì status code `412` được trả về.

#### Sử dụng package được xây dựng sẵn

Để sử dụng conditional request trong Laravel, bạn cần cài thêm package này

```shell
$ composer require werk365/etagconditionals
```

như vậy là bạn có thể add thêm `etag` middleware cho các route mà có thể bỏ qua các bước ở trên =))


## Nguồn tham khảo

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Conditional_requests#conditional_headers
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag