![](https://images.viblo.asia/e4b53ca2-1ed8-4662-b4d7-d4732ff9ed9b.jpg)
## Problem
Trong phát triển phần mềm, một trong những "best practice" là tạo ra những đoạn code có thể tái sử dụng được ở trong các phần khác nhau của ứng dụng đó nếu cần.
Hãy tưởng tượng bạn có một blog và bạn cần hiển thị các menu "highlights" ở thanh sidebar.
Các mục hihglights đó sẽ hiển thị lên dựa vào response của API trả về. Vì vậy, ở trong HomepageController có thể bạn sẽ có một đoạn tương tự như sau:

```php
<?php

class HomeController extends Controller {

    protected $blog;

    public function __construct(BlogRepository $blog)
    {
        $this->blog = $blog
    }

    public function index()
    {
        return view('blog', [
            'posts' => $blog->latest(),
            'highlights' => $blog->highlights()
        ]);
    }
}
```
Có vẻ khá gọn gàng và dễ hiểu đúng không ạ, nhưng cách tiếp cận này bắt đầu trở thành vấn đề khi bạn cần truyền cùng một biến “highlights” cho mọi trang trong web của bạn; ví dụ: trang liên hệ:
Nice and clean, but this approach starts to become a problem when you need to pass the same “highlights” variable to every page of your site. Ví dụ ở trang Contact:
```php
<?php

class ContactPageController extends Controller {

    protected $blog;

    public function __construct(BlogRepository $blog)
    {
        $this->blog = $blog
    }

    public function index()
    {
        return view('contact', [
            'highlights' => $blog->highlights()
        ]);
    }
}
```
Hãy tưởng tượng điều gì sẽ xảy ra nếu bạn có 20 Controllers khác nhau? Bạn có thể sẽ phải copy code rất nhiều và khi ứng dụng của bạn phát triển nó sẽ khó để maintain hơn.
## Using Laravel’s view composers
*View composer* cho phép bạn di chuyển logic bên ngoài Controller của mình và truyền dữ liệu đến các views được chỉ định.
```php
<?php

class HighLightsComposer
{

    protected $users;

    public function __construct(BlogRepository $blog)
    {
        $this->blog = $blog
    }

    public function compose(View $view)
    {
        $view->with('highlights', $this->blog->highlights());
    }
}
```
Sau đó ở *Service Provider*, chúng ta sẽ có đoạn tương tự như sau:
```php
<?php

class ComposerServiceProvider extends ServiceProvider
{
    public function boot()
    {
        View::composer(
            'highlights', 'App\Http\ViewComposers\HighlighsComposer'
        );
    }
}
```
Tại thời điểm này, bạn có thể refactor lại Controller như sau:
```php
<?php

class HomeController extends Controller {

    protected $blog;

    public function __construct(BlogRepository $blog)
    {
        $this->blog = $blog
    }

    public function index()
    {
        return view('blog', [
            'posts' => $blog->latest()
        ]);
    }
}

class ContactPageController extends Controller {

    public function index()
    {
        return view('contact');
    }

}
```
## Thinking about the product
Sau đây là một cách mà mình đang sử dụng trong một trong những dự án mình đang làm. Những gì mình muốn là có thể tái sử dụng những view chung, những view đó được dựng ra để có thể hiển thị đối với những dữ liệu động, nghĩa là nó có thể phù hợp để hiển thị với nhiều loại response data trả về.
Giờ hãy tạo Highlights component class:
Những "View component" class này có thể  chia sẻ một *interface* hoặc *contract* để chỉ định loại data mà chúng ta muốn trả về. Ở trường hợp này, contract của Laravel's Html sẽ rất phù hợp.
This “View Component” classes could share an interface or contract to specify the type of data we want to return.
```php
<?php

namespace App\ViewComponents;

use Illuminate\Support\Facades\View;
use Illuminate\Contracts\Support\Htmlable;

class HighlightsComponent implements Htmlable
{
    protected $blog;

    public function __construct(BlogRepository $blog)
    {
        $this->blog = $blog;
    }

    public function toHtml()
    {
        return View::make('highlights')
            ->with('highlights', $this->blog->highlights())
            ->render();
    }
}
```
Chúng ta sẽ tạo một [blade directive](https://laravel.com/docs/5.7/blade) để render ra *view components*
Vì chúng ta đang sử dụng [Denpenency Injection](https://laravel.com/docs/5.6/container) ở class bên trên, sẽ rất phù hợp khi sử dụng IOC để  *resolved* những *dependencies* này cho chúng ta.
```php
<?php

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        Blade::directive('render', function ($component) {
            return "<?php echo (app($component))->toHtml(); ?>";
        });
    }
}
```
Cuối cùng, bạn có thể render được view component, nó sẽ trả ra một phần HTML, ở bất kỳ view nào.
```php
// home.blade.php

@render(\App\ViewComponents\HighlightsComponent::class)
```
## Sumary
Sử dụng phương pháp này, bạn có thể tái sử dụng các components phức tạp bằng cách sử dụng dữ liệu động trên bất kỳ view nào trong ứng dụng của bạn. Logic của component sẽ chỉ hoạt động thông qua blade directive @render.
Nếu bạn làm việc với một nhóm lớn các nhà phát triển, bạn có thể chắc chắn rằng hiệu suất của ứng dụng của bạn sẽ không bị ảnh hưởng nếu có ai thay đổi việc implement các menu ở view mà không cập nhật code ở phần backend.

## Reference:
https://laravel-news.com/introducing-view-components-on-laravel-an-alternative-to-view-composers