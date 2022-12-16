Có rất nhiều middleware hữu ích đã được đăng ký bên trong Laravel, như cơ chế authentication, authorization, throttler và kể cả cơ chế route model binding. Ngoài ra còn có một middleware ít được nhắc đến là `SetCacheHeaders`, có alias là `cache.headers`. Middleware này có thể được sử dụng để thêm cache headers vào Response.

## Cache headers là gì?

Nếu bạn chưa biết đến cache headers, nghĩa là bạn chưa biết HTTP Cache Control là gì.

> Hiểu một cách đơn giản, Cache Control là cách để thông báo cho trình duyệt biết Response mà ứng dụng đã gửi có nên được lưu vào bộ nhớ đệm hay không và trong những điều kiện nào. Qua đó xác định xem có nên yêu cầu lại một Response đầy đủ hay không.

Đây là một cơ chế lấy trình duyệt làm trung tâm. Bạn sẽ hiểu lý do sau khi đọc xong bài này.

Khi bạn đã hiểu sơ bộ về HTTP Cache Control và công việc mà middleware `SetCacheHeaders` thực hiện, cùng tìm hiểu chi tiết ở phần tiếp theo nhé.

## SetCacheHeaders middleware hoạt động như thế nào?

Hãy xem qua [source code](https://github.com/laravel/framework/blob/8.x/src/Illuminate/Http/Middleware/SetCacheHeaders.php) nào:
```
<?php

namespace Illuminate\Http\Middleware;

use Closure;
use Illuminate\Support\Carbon;

class SetCacheHeaders
{
    /**
     * Add cache related HTTP headers.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|array  $options
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \InvalidArgumentException
     */
    public function handle($request, Closure $next, $options = [])
    {
        $response = $next($request);

        if (! $request->isMethodCacheable() || ! $response->getContent()) {
            return $response;
        }

        if (is_string($options)) {
            $options = $this->parseOptions($options);
        }

        if (isset($options['etag']) && $options['etag'] === true) {
            $options['etag'] = md5($response->getContent());
        }

        if (isset($options['last_modified'])) {
            if (is_numeric($options['last_modified'])) {
                $options['last_modified'] = Carbon::createFromTimestamp($options['last_modified']);
            } else {
                $options['last_modified'] = Carbon::parse($options['last_modified']);
            }
        }

        $response->setCache($options);
        $response->isNotModified($request);

        return $response;
    }

    /**
     * Parse the given header options.
     *
     * @param  string  $options
     * @return array
     */
    protected function parseOptions($options)
    {
        return collect(explode(';', $options))->mapWithKeys(function ($option) {
            $data = explode('=', $option, 2);

            return [$data[0] => $data[1] ?? true];
        })->all();
    }
}
```

Như bạn có thể thấy, có 6 câu lệnh chính trong phương thức `handle()` của middleware này. Phân tích chúng một chút nhé:

1. Kiểm tra xem request có phải là GET hoặc HEAD không. Bạn không thể cache một POST response, vì method này có nghĩa là có gì đó đã bị thay đổi.
2. Kiểm tra xem bạn có truyền tham số nào vào middleware hay không và phân tích chúng cho Response headers bằng phương thức `parseOptions()`.
3. Nếu có tuỳ chọn `etag`, nó sẽ hash nội dung response để có thể so sánh với etag mà Request đã gửi.
4. Nếu có tuỳ chọn `last_modified`, nó sẽ thêm `last_modified` vào header.
5. Gán các tuỳ chọn Cache-Control vào Response headers.
6. Cuối cùng, nó sẽ kiểm tra xem response có thay đổi không. Nếu không, nó sẽ bỏ qua nội dung phản hồi và chỉ trả về `etag`.

Bước thứ 3 và 6 là những bước quan trọng nhất. Trình duyệt sẽ gửi Request tới ứng dụng với `etag` của response đã được cache, nếu như response ban đầu có chứa `etag`. Ứng dụng của bạn sẽ nhận `etag`, **xử lý request**, và cuối cùng hash nội dung thành `etag` mới. Bằng cách so sánh 2 `etag` nói trên, ứng dụng của bạn có thể biết có nên gửi lại response hay chỉ cần gửi lại `etag` , để thông báo với trình duyệt rằng nội dung của response không thay đổi.

![](https://images.viblo.asia/7e27e6ef-eaea-4d16-8bba-a6effca020a7.png)

Việc **xử lý request** cũng là một phần quan trọng. Bởi vì ứng dụng hay trình duyệt sẽ không thể biết được nội dung phản hồi có thay đổi hay không cho đến khi response sẵn sàng, nghĩa là tất các các logic trong ứng dụng vẫn phải được chạy từ đầu đến cuối.

Nếu bạn muốn triển khai cache cho ứng dụng của mình, bạn có thể nghĩ đến việc cache response ở server và đồng thời sử dụng `etag` header để tối ưu cho cả server và client.

## Sử dụng SetCacheHeaders middleware

Chúng ta đã biết middleware này có tác dụng gì. Hãy làm, một ví dụ đơn giản về nó nhé.

Dưới đây là sơ đồ của Google về cache-control policy:

![](https://images.viblo.asia/6f07cb6b-02e6-4172-b638-740deceedccc.png)

Dưới đây là ví dụ từ trang chủ của Laravel:

* `etag` cho phép người dùng refresh trang mà không cần tải lại nội dung nếu nội dung không thay đổi.
* `public` cho phép response được lưu trong bất kỳ bộ nhớ đệm nào, kể cả khi bình thường không thể lưu ở bộ nhớ đệm ([xem thêm](https://developer.mozilla.org/en-US/docs/Glossary/cacheable)). 
* max-age=2592000 sẽ đặt thời gian hết hạn cache là 30 ngày, kể từ lần cuối cache được tạo.

```
Route::middleware('cache.headers:public;max_age=2592000;etag')->group(function () {
    Route::get('/privacy', function () {
        // ...
    });

    Route::get('/terms', function () {
        // ...
    });
});
```

Xem thêm về [Cache-Control header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control).

Đó là tất cả những gì mình muốn truyền tải trong bài viết này. Bạn không cần phải tự tạo middleware hay config ở Apache hoặc NGINX. Cảm ơn các bạn đã đọc.