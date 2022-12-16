# Giới thiệu
Qua hai bài trước, chúng ta đã biết về cách khai báo route và khai báo tên route. Hôm nay chúng ta sẽ tiếp tục tìm hiểu về cách sử dụng HTTP Method như GET, POST, PUT, PATCH, DELETE, ... trong route.
# Cách dùng HTTP Method trong Route
## Dùng PHP Annotation
```
// src/Controller/BlogApiController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class BlogApiController extends AbstractController
{
     /**
     * @Route("/api/posts", methods={"GET"})
     */
    public function index(): Response
    {
        // ... return a JSON response with the post
    }
    
    /**
     * @Route("/api/posts/{id}", methods={"GET","HEAD"})
     */
    public function show(int $id): Response
    {
        // ... return a JSON response with posts
    }

    /**
     * @Route("/api/posts/{id}", methods={"PUT"})
     */
    public function edit(int $id): Response
    {
        // ... edit a post
    }
}
```
## Dùng PHP Attribute
```
// src/Controller/BlogApiController.php
namespace App\Controller;

// ...

class BlogApiController extends AbstractController
{
     #[Route('/api/posts', methods: ['GET'])]
    public function index(): Response
    {
        // ... return a JSON response with the posts
    }
    
    #[Route('/api/posts/{id}', methods: ['GET', 'HEAD'])]
    public function show(int $id): Response
    {
        // ... return a JSON response with the post
    }

    #[Route('/api/posts/{id}', methods: ['PUT'])]
    public function edit(int $id): Response
    {
        // ... edit a post
    }
}
```
## Dùng YAML
```
# config/routes.yaml
api_post_index:
    path:       /api/posts
    controller: App\Controller\BlogApiController::index
    methods:    GET
    
api_post_show:
    path:       /api/posts/{id}
    controller: App\Controller\BlogApiController::show
    methods:    GET|HEAD

api_post_edit:
    path:       /api/posts/{id}
    controller: App\Controller\BlogApiController::edit
    methods:    PUT
```
## Cách hoạt động của HTTP Method trong Route
Ở ví dụ trên, chúng ta có ba phương thức lần lượt là index, show và edit. Phương thức index chỉ nhận HTTP Method là GET, phương thức show chỉ nhận HTTP Method là GET và HEAD, phương thức edit chỉ nhận HTTP Method là PUT. Khi truyền vào HTTP Method mà route đó không hỗ trợ, thì chúng ta sẽ nhận được lỗi trả ra từ chương trình. Lấy ví dụ như phương thức index ở trên chỉ nhận HTTP Method GET, nếu chúng ta truyền HTTP Method PUT, PATCH thì chương trình sẽ báo lỗi.
# Nhận xét
Với việc khai báo HTTP Method cho route sẽ giúp cho route chúng ta strict hơn, chỉ nhận vào nhưng HTTP Method được hỗ trợ. Ngoài ra, sẽ thuận tiện hơn khi chúng ta sử dụng Symfony Form. Lấy ví dụ nếu không dùng Symfony Form, thì chúng ta cần một phương thức nhận vào HTTP Method là GET để render form và một HTTP Method là POST để lưu dữ liệu nhận được từ form đó.
```
// src/Controller/BlogApiController.php
namespace App\Controller;

// ...

class BlogApiController extends AbstractController
{
     #[Route('/api/posts', methods: ['GET'])]
    public function renderCreateBlogForm(): Response
    {
        // ... render create blog form
    }
    
    #[Route('/api/posts', methods: ['POST'])]
    public function store(): Response
    {
        // ... store data receive from form
    }
}
```
Với việc dùng Symfony Form và việc cho phép nhiều HTTP Method của route, chúng ta có thể viết lại thành như thế này:
```
// src/Controller/BlogApiController.php
namespace App\Controller;

// ...

class BlogApiController extends AbstractController
{
     #[Route('/api/posts', methods: ['GET', 'POST'])]
    public function createBlog(): Response
    {
        // ... render create blog form or store data receive from form
    }
}
```
Tương tự cho PHP Annotation và YAML.
# Kết luận
Qua bài này chúng ta đã tìm hiểu về:
- Cách khai báo HTTP Method cho route dùng PHP Annotation, PHP Attribute, YAML
- Cách hoạt động hoạt động HTTP Method trong route
- Nhận xét về HTTP Method trong route

Nếu có gặp lỗi, khó khăn hay bất kì thắc mắc gì, các bạn hãy tham gia cộng đồng [Symfony Vietnam](https://www.facebook.com/groups/532036037329901) để trao đổi thêm cũng như là giải quyết những vấn đề bạn đang gặp phải. Chúc các bạn thành công.