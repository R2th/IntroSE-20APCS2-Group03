# Tên Route
Ở bài trước, chúng ta đã tìm hiểu về cách khai báo route. Ở bài này, chúng ta sẽ tiếp tục tìm hiểu về cách đặt tên cho route. Tuy nhiên, việc đặt tên cho route để làm gì và có cần thiết không? Trước khi trả lời câu hỏi này, chúng ta cùng tìm hiểu về cách đặt tên route trước nhé.
# Cách đặt tên Route
## Dùng PHP Annotation
```
// src/Controller/BlogController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class BlogController extends AbstractController
{
    /**
     * @Route("/blog", name="blog_list")
     */
    public function list(Request $request): Response
    {
        $routeName = $request->attributes->get('_route');
        $routeParameters = $request->attributes->get('_route_params');

        // use this to get all the available attributes (not only routing ones):
        $allAttributes = $request->attributes->all();

        // ...
    }
}
```
Các bạn để ý tham trị name trong Route Annotation, ở đây, route name của chúng ta là `blog_list`.
## Dùng PHP Attribute
```
// src/Controller/BlogController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class BlogController extends AbstractController
{
   
    #[Route('/blog', name: 'blog_list')]
    public function list(Request $request): Response
    {
        $routeName = $request->attributes->get('_route');
        $routeParameters = $request->attributes->get('_route_params');

        // use this to get all the available attributes (not only routing ones):
        $allAttributes = $request->attributes->all();

        // ...
    }
}
```
## Dùng YAML
```
# config/routes.yaml
blog_list:
    path:     /blog
    controller: App\Controller\BlogController::list
```
Ở trong file YAML, bạn sẽ thấy route bắt đầu với tên route (blog_list). Ở bên trong là URI của route đó. Tiếp đến là controller và method trong controller được dùng khi truy cập route `/blog`.
# Tại sao cần tên Route
# Vấn đề
Thông thường, khi chúng ta đã định nghĩa route thì chúng ta sẽ có thể dùng truy cập route đó ở trong Twig chỉ đơn giản là dùng những thuộc tính của HTML:
```
{% templates/index.html.twig %}
<a href="/blog">Blogs</a>
```
Mọi chuyện rất đơn giản và dễ dàng. Một ngày đẹp trời sếp bạn bước vào và yêu cầu bạn đổi từ route `/blog` sang `/myblog`. Bạn thầm nghĩ chỉ cần 1p30s đổi route trong Controller là xong. Nhưng again, đời không như mơ, sau khi đổi route xong, mọi thứ không chạy nữa. Sau khi đọc lỗi bạn chợt phát hiện cần phải đổi luôn mấy cái URI trong Twig mà ngặt nỗi có tận 1001 template có cái route này (một tiếng thở dài). Đây là mô phỏng những gì bạn cần thay đổi:
```
// src/Controller/BlogController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class BlogController extends AbstractController
{
   
    #[Route('/myblog')]
    public function list(Request $request): Response
    {
        $routeName = $request->attributes->get('_route');
        $routeParameters = $request->attributes->get('_route_params');

        // use this to get all the available attributes (not only routing ones):
        $allAttributes = $request->attributes->all();

        // ...
    }
}
```
```
{% templates/index.html.twig %}
<a href="/myblog">Blogs</a>
```
```
{% templates/about.html.twig %}
<a href="/myblog">Blogs</a>
```
```
{% templates/contact.html.twig %}
<a href="/myblog">Blogs</a>
```
```
{% templates/signin.html.twig %}
<a href="/myblog">Blogs</a>
```
```
... To Be Continued
```
# Cách giải quyết
May thay, anh đồng nghiệp đến mời bạn một cốc cà phê tán gẫu, sau khi nghe được vấn đề của bạn, anh đề nghị dùng tên Route trong Symfony, như vậy khi route thay đổi, việc bạn cần làm là thay đổi route trong Controller là xong. Easy Life. Sau khi dùng tên Route, Twig của bạn sẽ trong giống như thế này:
```
{% templates/index.html.twig %}
<a href="{{ path('blog_list') }}">Blogs</a>
```
Khi cần thay đổi từ `/blog` sang `/myblog`. Việc bạn cần thay đổi duy nhất là thay đổi URI Route trong Controller:
```
// src/Controller/BlogController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class BlogController extends AbstractController
{
   
    #[Route('/myblog', name: 'blog_list')]
    public function list(Request $request): Response
    {
        $routeName = $request->attributes->get('_route');
        $routeParameters = $request->attributes->get('_route_params');

        // use this to get all the available attributes (not only routing ones):
        $allAttributes = $request->attributes->all();

        // ...
    }
}
```
Sau khi thay đổi, ở trong tất cả các tệp tin Twig sẽ tự động tìm đến route với tên là `blog_list` và điền route vào cho chúng ta, trong trường hợp này là `/myblog`. Như vậy, với việc sử dụng tên Route, khi chúng ta cần thay đổi thì mọi việc sẽ dễ dàng hơn, không cần phải thay đổi ở quá nhiều file và ngoài ra, việc khai báo tên route giúp cho việc đọc route dễ dàng hơn.
# Tổng kết
Qua bài này chúng ta đã tìm hiểu về:
- Cách khai báo tên route dùng PHP Annotation, PHP Attribute, YAML
- Lí do vì sao chúng ta nên dùng tên route.

Nếu có gặp lỗi, khó khăn hay bất kì thắc mắc gì, các bạn hãy tham gia cộng đồng [Symfony Vietnam](https://www.facebook.com/groups/532036037329901) để trao đổi thêm cũng như là giải quyết những vấn đề bạn đang gặp phải. Chúc các bạn thành công.