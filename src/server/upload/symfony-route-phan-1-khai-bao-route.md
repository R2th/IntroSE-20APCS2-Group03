# Symfony Route là gì?
Khi mà ứng dụng của chúng ta nhận Request, thì ứng dụng sẽ gọi đến controller để có thể trả về Response. Việc cấu hình route giúp cho ứng dụng của chúng ta biết sẽ gọi đến controller nào cho mỗi URL khác nhau. Ngoài ra, Symfony Route còn cung cấp cho chúng ta nhưng tính năng hay ho như thân thiện với SEO (ví dụ route là `/blog/create` thay vì `/blog/create.php`).
# Tạo Route
## Sơ lược
Chúng ta có thể cấu hình Symfony Route thông qua nhiều cách, dùng YAML, XML PHP hoặc dùng Annotation trong Controller. Tuy là có nhiều cách khác nhau, nhưng về hiệu năng thì như nhau, vì vậy các bạn nên chọn cách mà mình thích, không cần đắn đo quá nhiều về hiệu năng. 
## Cách tạo route bằng Annotation
Khi tạo route bằng annotation, trước tiên các bạn cần phải cài đặt Doctrine Annotation. Cách cài đặt như sau:
```
composer require doctrine/annotations
```
Để định nghĩa route, đơn giản các bạn chỉ cần thêm annotation ở trên method ở trong Controller. Ví dụ, mình muốn khi người dùng truy cập vào URL: `https://localhost/blog` thì ứng dụng của mình sẽ tìm đến `BlogController` và sử dụng dụng method `list` để có thể xem tất cả những bài blog thì mình sẽ định nghĩa route như sau:
```
// src/Controller/BlogController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class BlogController extends AbstractController
{
    /**
     * @Route("/blog")
     */
    public function list()
    {
        // ...
    }
}
 ```
Một ví dụ khác mình muốn khi người dùng truy cập vào URL: `https://localhost/blog/blog-title` thì ứng dụng của mình sẽ tìm đến `BlogController` và sử dụng method `get` để xem được bài blog với slug xác định:
```
// src/Controller/BlogController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class BlogController extends AbstractController
{
    /**
     * @Route("/blog/{slug}")
     */
    public function get(Request $request)
    {
        // ...
    }
}
```
## Cách tạo route bằng Attribute
Lưu ý khi tạo route bằng Attribute, chúng ta không cần phải cài Doctrine Annotation. Tuy nhiên, chúng ta cần phải dùng PHP phiên bản 8 đổ lên và Symfony 5.2 đổ lên. Tuy nhiên, các bạn cần thêm file annotations.yaml với nội dung như sau:
```
# config/routes/annotations.yaml
controllers:
  resource: ../../src/Controller/
  type: annotation

kernel:
  resource: ../../src/Kernel.php
  type: annotation
```
Đây là cách tạo route bằng Attribute cho 2 URL ví dụ bên trên. 
```
// src/Controller/BlogController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class BlogController extends AbstractController
{
    #[Route('/blog')]
    public function list()
    {
        // ...
    }
}
```
```
// src/Controller/BlogController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class BlogController extends AbstractController
{
     #[Route('/blog/{slug}')]
    public function get(Request $request)
    {
        // ...
    }
}
```
## Cách tạo Route bằng YAML
Lưu ý, từ phiên bản 5.1 của Symfony, mặc định, Symfony chỉ tìm và nạp route được định nghĩa trong tệp tin `routes.yaml` ở trong thư mục `config`. Nếu các bạn muốn định nghĩa route trong XML hay dùng PHP thì cần phải update tệp tin `Kernel.php` ở trong thư mục `src`. 
Cách định nghĩa Route với 2 ví dụ bên trên:
```
# config/routes.yaml
blog_list:
    path: /blog
    controller: App\Controller\BlogController::list

blog_get:
    path: /blog/{slug}
    controller: App\Controller\BlogController::get
```
## Debug Route
Hôm nay, Phú làm quen với Symfony Route. Sau khi đã khai báo các route xong, Phú hứng khởi truy cập vào URL tương ứng để xem thành quả của mình. Tuy nhiên, không có chuyện gì xảy ra cả. Không những vậy, còn có lỗi nữa chứ: không tìm thấy route. Phú cảm thấy lạ lùng, điên cuồng debug. Cuối cùng Phú phát hiện mình đã khai báo nhầm, thay vì `/blog` thì mình đã khai báo là `/blo`, đó là lí do mà Phú không thể truy cần vào URL `/blog`. Phú ước là mình biết cách để xem tất cả những route mình đã khai báo để có thể kiểm tra dễ dàng hơn.

Để giải quyết vấn đề trên, Symfony cung cấp cho chúng ta một command để có thể xem được tất cả những route mà chúng ta đã khai báo. Câu lệnh đó là: 
```
php bin/console debug:router
```
Kết quả sẽ có format như thế này:
```
----------------  -------  -------  -----  --------------------------------------------
Name              Method   Scheme   Host   Path
----------------  -------  -------  -----  --------------------------------------------
blog_list          ANY      ANY      ANY    /blog
blog_get           ANY      ANY      ANY    /blog/{slug}
----------------  -------  -------  -----  --------------------------------------------
```
Từ đây về sau, nếu như ứng dụng của bạn không tìm được route. Bạn có thể dùng command này để kiểm tra xem mình đã khai báo route đúng chưa, route này đã được Symfony nạp vào hay chưa.
Ngoài ra, bạn có thể xem chi tiết hơn bằng cách dùng command + với tên route: 
```
php bin/console debug:router blog_list
```
Kết quả sẽ có format giống như vầy:
```
+-------------+---------------------------------------------------------+
| Property    | Value                                                   |
+-------------+---------------------------------------------------------+
| Route Name  | blog_list                                               |
| Path        | /blog                                                   |
| ...         | ...                                                     |
| Options     | compiler_class: Symfony\Component\Routing\RouteCompiler |
|             | utf8: true                                              |
+-------------+---------------------------------------------------------+
```
Để xem có những route nào giống với route bạn đang tìm, bạn có thể dùng command + route cần tìm:
```
php bin/console router:match /blog/blog-title
```
Kết quả sẽ có format như thế này:
```
[OK] Route "blog_show" matches
```
# Tổng Kết
Chúng ta đã tìm hiểu về:
- Symfony route là gì
- Cách khai báo Route trong Symfony bằng cách dùng Annotation, Attribute và YAML
- Debug route bằng cách dùng command `php bin/console debug:router`

Nếu có gặp lỗi, khó khăn hay bất kì thắc mắc gì, các bạn hãy tham gia cộng đồng [Symfony Vietnam](https://www.facebook.com/groups/532036037329901) để trao đổi thêm cũng như là giải quyết những vấn đề bạn đang gặp phải. Chúc các bạn thành công.