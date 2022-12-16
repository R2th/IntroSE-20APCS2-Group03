# Introduction
Pipeline là một khái niệm rất thường xuyên xuất hiện trong công nghệ thông tin và được áp dụng cho nhiều vấn đề khác nhau. Nhưng chính xác nó là gì? Nó có liên quan gì đến Laravel? Trong bài viết này chúng ta sẽ đi vào tìm hiểu điều đó.
# Mục lục
I. Pipeline Design Pattern

II. Laravel sử dụng Pipeline như thế nào?

III. "Tính năng" bí mật Laravel Pipeline

# I. Pipeline Design Pattern
Để dễ dàng hiểu cách hoạt động của Laravel Pipeline chúng ta trước tiên sẽ đi vào tìm hiểu tổng quát về Pipeline design pattern.
## Bài toán:
Trong đời sống thực tế, ta gặp vô số các tình huống mà công việc chúng ta cần làm phải trải qua nhiều bước để thực hiện như một dây truyền sản xuất. Để giải quyết vấn đề thường gặp này, design pattern Pipeline đã ra đời. 
## Ý tưởng:
Như trong bài toán nêu trên, ý tưởng về một "dây truyền sản xuất" này được sử dụng rất nhiều trong việc lập trình. Ý tưởng của Pipeline nhằm mục đích cho phép chúng ta xử lý dữ liệu trong một chuỗi các bước thực thi bằng một đầu vào thông qua các công đoạn và đầu ra sẽ được sử dụng cho bước tiếp theo.
Trong đó, mỗi công đoạn xử lý sẽ trả về kết quả thành công hoặc thất bại. Trong trường hợp một trong các bước thất bại cả chuỗi xử lý sẽ dừng hoàn toàn. Trong trường hợp bước xử lý thành công, đầu ra của bước xử lý đó sẽ được sử dụng làm đầu vào cho công đoạn tiếp theo tới khi toàn bộ các bước đều được thực hiện theo đúng quy trình.

# II. Laravel sử dụng Pipeline như thế nào?
Ví dụ tốt nhất cho việc sử dụng Pipeline trong Laravel đó là Middleware. Middleware của Laravel thực chất là một Pipeline các màng lọc xử lý Request đầu vào trước khi nó được chuyển tới Controller.
Nếu chúng ta đi vào phân tích HttpKernel ta sẽ nhận thấy có các middleware như `TrustHosts`, `TrustProxies`, v.v... Đây có thể hiểu là màng lọc các bước xử lý được thực hiện tuần tự cho từng HttpRequest được gửi đến hệ thống.

```php
namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    ...
    protected $middleware = [
        \App\Http\Middleware\TrustHosts::class,
        \App\Http\Middleware\TrustProxies::class,
        \Fruitcake\Cors\HandleCors::class,
        \App\Http\Middleware\PreventRequestsDuringMaintenance::class,
        \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
        \App\Http\Middleware\TrimStrings::class,
        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
    ];
    ...
}
```
Trong mỗi bước, Laravel sẽ gọi tới hàm handle của các class. Sau mỗi bước thành công, nó sẽ tiếp tục chuyển đầu ra tới class xử lý tiếp theo qua `$next($request);` hoặc trong trường hợp có lỗi hàm sẽ dừng quy trình và trả về lỗi tương ứng.

* **VD:** class Middleware `TrustHosts` của Laravel
```php
namespace Illuminate\Http\Middleware;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\Request;

abstract class TrustHosts
{
    ....
    public function handle(Request $request, $next)
    {
        if ($this->shouldSpecifyTrustedHosts()) {
            Request::setTrustedHosts(array_filter($this->hosts()));
        }

        return $next($request);
    }
    ....
}
```
Chúng ta sẽ không đi quá sâu vào Middleware trong bài viết này. Tuy nhiên, nếu ai muốn đọc thêm về Middleware, mọi người có thể tham khảo trong link mục "References".
# III. "Tính năng" bí mật Laravel Pipeline

Nếu chúng ta tra trong Laravel Documentation từ khóa **"Pipeline"** thì có lẽ nhiều người sẽ bối rối không biết "tính năng" này ở đâu. Pipeline thực chất không phải một tính năng chính thức Laravel cung cấp mà nó là một phần của nội bộ hệ thống Laravel sử dụng. Tuy nhiên, lợi dụng nó chúng ta có thể sử dụng Pipeline design pattern một cách dễ dàng mà không cần thiết kế lại.
Vậy "tính năng" bí mật này ở đâu? Chúng ta sẽ đi sâu hơn một chút vào trong `HttpKernel` nêu trên tới các class nền tảng của Laravel `Illuminate\Foundation\Http\Kernel`. Tại đây ta sẽ bắt đầu thấy Pipeline được sử dụng để thực hiện các Middleware.
```php
namespace Illuminate\Foundation\Http;

...
use Illuminate\Routing\Pipeline;
...

class Kernel implements KernelContract
{
    ...
    protected function sendRequestThroughRouter($request)
    {
        $this->app->instance('request', $request);

        Facade::clearResolvedInstance('request');

        $this->bootstrap();

        return (new Pipeline($this->app))
                    ->send($request)
                    ->through($this->app->shouldSkipMiddleware() ? [] : $this->middleware)
                    ->then($this->dispatchToRouter());
    }
    ...
}
```
`Illuminate\Routing\Pipeline` trong `HttpKernel` chính là một thể hiện của `Illuminate\Pipeline\Pipeline` mà chúng ta sẽ sử dụng.
```php
namespace Illuminate\Routing;

...
use Illuminate\Pipeline\Pipeline as BasePipeline;
...

class Pipeline extends BasePipeline
{
    ...
}
```
## Cách sử dụng
Để dễ dàng hình dung cách sử dụng Pipeline chúng ta sẽ lấy ví dụ một bài toán thực tế.
* Bài toán: Giả sử chúng ta có một hệ thống cho phép gửi một bài viết lên hệ thống. Bài viết này khi được gửi lên sẽ cần được chuẩn hóa chuỗi, loại bỏ các script đính kèm, thêm link vào thẻ hashtag trước khi được lưu vào cơ sở dữ liệu.

Trong trường hợp không sử dụng Pipeline, các bước xử lý sẽ được viết trong hàm `store(Request $request)` của PostController. Với rất nhiều các bước xử lý được đưa vào cùng một hàm việc nhầm lẫn là khó tránh khỏi với một hàm phức tạp, việc bảo trì, phát triển sau này cũng sẽ trở nên vô cùng khó khăn. Để xử lý vấn đề này ta có thể tạo ra một Pipeline các màng lọc nội dung đầu vào và thậm chí có thể tái sử dụng những màng lọc đó ở những trường hợp khác nếu cần.

Bây giờ chúng ta sẽ thử thực hiện cùng công việc đó nhưng sử dụng Pipeline.
* **Bước 1**: Tạo một interface cho các Filter.
```php
namespace App\Filters;

use Closure;

interface FilterInterface
{
    public function handle($content, Closure $next);
}
```
* **Bước 2**: Tạo các class Filter cho mỗi bước xử lý.
VD: Tạo filter lọc các thẻ script.
```php
namespace App\Filters;

use Closure;

class ScriptFilter implements FilterInterface
{
    public function handle($content, Closure $next)
    {
        $doc = new DOMDocument();

        // load the HTML string we want to strip
        $doc->loadHTML($content);

        // get all the script tags
        $script_tags = $doc->getElementsByTagName('script');
        $length = $script_tags->length;

        // for each tag, remove it from the DOM
        for ($i = 0; $i < $length; $i++) {
            $script_tags->item($i)->parentNode->removeChild($script_tags->item($i));
        }

        // get the HTML string back
        $content = $doc->saveHTML();

	return $next($content);
    }
}
```
Các bạn có thể thực hiện tạo các Filter khác tương ứng. Để tóm tắt nhanh ở đây ta sẽ giả định các filter khác bao gồm:
- FormatString.
- FormatHashtags.
* **Bước 3**: Build Pipeline. Sau khi đã có đầy đủ các Filter cần thiết bước cuối cùng của chúng ta là sử dụng chúng trong Pipeline.
Trong Controller của chúng ta sẽ thêm `use Illuminate\Pipeline\Pipeline;`
```php
public function store(Request $request)
{
    $pipes = [
	    FormatString::class,
        ScriptFilter::class,
        FormatHashtags::class,
    ];
    $post = app(Pipeline::class)
        ->send($request->content)
        ->through($pipes)
        // ->via('methodName') trong trường hợp ta muốn sử dụng tên phương thức khác handle.
        ->then(function ($content) {
            return Post::create(['content' => 'content']);
        });

    // return any type of response
}
```
Trong ví dụ trên:
`$pipes` là các bước xử lý lọc được thực hiện lần lượt.
`send()` sẽ nhận giá trị đầu vào của Pipeline, trong trường hợp này là nội dung bài post.
`through()` sẽ truyền vào Pipeline muốn sử dụng.
`via()` xác định tên phương thức muốn đi qua thay cho phương thức `handle()` mặc định.	
`then()` sẽ thực hiện trả về kết quả sau khi đi qua Pipeline.

Như ta có thể thấy, toàn bộ xử lý chuẩn hóa chuỗi, lọc thẻ script, v.v... đã được tách ra thành các class màng lọc và cho ta một logic xử lý gọn gàng trong hàm store sử dụng Pipeline.

# Tổng kết
Vậy thông qua bài viết trên ta đã đi vào tìm hiểu khái quát về Pipeline và cách thức sử dụng chúng trong Laravel lợi dụng một "tính năng" có sẵn của hệ thống.

# References
* https://laravel.com/docs/8.x/middleware#defining-middleware
* https://medium.com/@bonnotguillaume/software-architecture-the-pipeline-design-pattern-from-zero-to-hero-b5c43d8a4e60
* https://laravel.com/api/8.x/Illuminate/Pipeline/Pipeline.html