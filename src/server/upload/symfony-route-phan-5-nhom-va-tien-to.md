# Giới thiệu
Hầu hết, khi viết một web app, chúng ta sẽ cần đến CRUD cho một entity nào đó. Lấy ví dụ như mình viết một blogger, mình cần CRUD của post thì route của mình sẽ như thế này:
```
CREATE: /posts/create
READ: /posts/ hoặc /posts/{id}
UPDATE: /posts/{id}/update
DELETE: /posts/{id}/delete
```
Ở đây các bạn sẽ thấy chúng ta lập lại khá nhiều `posts`, hầu như tất cả các route chúng ta không thay đổi phần `posts` này.
Tiếp theo mình muốn CRUD comment của một post nào đó thì mình sẽ có những route như sau:
```
CREATE: /posts/{postId}/comments/create
READ: /posts/{postId}/comments/ hoặc /posts/{postId}/comments/{commentId}
UPDATE: /posts/{postId}/comments/{commentId}/update
DELETE: /posts/{postId}/comments/{commentId}/delete
```
Tương tự như trên, dường như phần `/posts/{postId}/comments` chúng ta không cần thay đổi nhiều. Nhưng nếu khai báo như thế này cho mỗi method trong controller thì chúng ta đã không theo nguyên tắc DRY (Don't Repeat Yourself). 

Các bạn sẽ thấy là nếu để lặp lại như vậy trong route, đến một ngày trời đầy mây mưa giông bão tố, bạn cảm thấy `posts` có vẻ không phù hợp lắm, bạn muốn đổi thành `post`, với 2 ví dụ trên bạn cần thay đổi 8 chỗ, mà bạn biết đó nếu mà chỗ thay đổi nhiều hơn nữa thì có thể bạn sẽ quên không thay đổi một vài chỗ, hoặc là một vài chỗ thay đổi sai (thay vì đổi thành `post` thì bạn đổi thành `pot`). Và tệ hơn là những lỗi này có thể làm cho dự án dừng lại và không chạy nữa. Trời đã đầy mây mưa giông bão tố, nay càng nhiều mây mưa giông bão tố hơn nữa.

Nhóm và tiền tố route được tạo ra để giải quyết vấn đề này cho chúng ta, thay vì phải thay đổi nhiều chỗ trong từng phương thức ở trong controller, bạn chỉ cần thay đổi một chỗ ngay trên Controller đó. Vậy thì làm thể nào để tạo nhóm và tiền tố route trong Symfony, cùng tìm hiểu nhé.

# Cách dùng nhóm và tiền tố route
Các bạn sẽ khai báo nhóm và tiền tố của route ngay trên Controller đối với Attributes và Annotations như sau.
## Annotations
Đối với route CRUD post:
```
/**
 * @Route("/posts")
 */
class PostController extends AbstractController
{
    /**
     * @Route("/", name="posts_list")
     */
    public function index(): Response
    {
        ...
    }

    /**
     * @Route("/create", name="posts_create")
     */
    public function create(): Response 
    {
        ...
    }

    /**
     * @Route("/{id}", name="posts_get")
     */
    public function get(string $id): Response
    {
        ...
    }
}
```
Đối với những route CRUD comment thuộc một post nào đó:
```
/**
 * @Route("/posts/{id}/comments")
 */
class CommentController extends AbstractController
{
    /**
     * @Route("/", name="comments_list")
     */
    public function index(): Response
    {
        ...
    }

    /**
     * @Route("/create", name="comments_create")
     */
    public function create(): Response
    {
       ...
    }
}
```
## Attributes
Đối với route CRUD post:

```
#[Route('/posts')]
class PostController extends AbstractController
{
    #[Route('/', name: 'posts_list')] 
    public function index(): Response
    {
        ...
    }
    
    #[Route('/create', name: 'posts_create')]
    public function create(): Response 
    {
        ...
    }

    #[Route('/{id}', name: 'posts_get')]
    public function get(string $id): Response
    {
         ...
    }
}
```
Đối với những route CRUD comment thuộc một post nào đó:
```
#[Route('/posts/{id}/comments')]
class CommentController extends AbstractController
{
    #[Route('/', name: 'comments_list')]
    public function index(): Response
    {
        ...
    }

    #[Route('/create', name: 'comments_create')]
    public function create(): Response
    {
        ...
    }
}
```
## Lợi ích
Nếu chúng ta dùng nhóm và tiền tố trong Symfony, vào một ngày đẹp trời, bạn muốn thay đổi từ `/posts` thành `/post`, tất cả việc chúng ta cần làm đơn giản là tìm đến nhóm và tiền tố của Controller đó và thay đổi từ `/posts` thành `/post` như vậy tiền tố cho tất cả những route cho phương thức trong Controller đó cũng sẽ tự động thay đổi. Cuộc sống chúng ta sẽ trở nên đơn giản hơn, vui vẻ hơn, bầu trời sẽ trở nên đẹp hơn.
# Kết luận
Qua bài ngày hôm này chúng ta đã tìm hiểu về:
- Vấn đề mà nhóm và tiền tố trong Symfony đã giải quyết
- Cách khai báo cũng như là sử dụng nhóm và tiền tố trong Symfony với Annotations và Attributes

Nếu có gặp lỗi, khó khăn hay bất kì thắc mắc gì, các bạn hãy tham gia cộng đồng [Symfony Vietnam](https://www.facebook.com/groups/532036037329901) để trao đổi thêm cũng như là giải quyết những vấn đề bạn đang gặp phải. Chúc các bạn thành công.