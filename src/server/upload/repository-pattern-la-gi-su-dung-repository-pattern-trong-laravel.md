Trong bài viết này chúng ta sẽ cùng tìm hiểu về một vấn đề nói đến khá nhiều trong Laravel đó là Repository Pattern. Với những bạn mới tìm hiểu về Laravel chắc là cũng ít để ý đến vấn đề này. Còn các bạn đi thực tập tại các công ty, các ban trainee thì chắc gặp sẽ được các trainer của mình nói đến từ khóa này. Vậy nó là gì mà, có thực sự cần thiết không, chúng ta cùng tìm hiểu nhé.
## 1. Khái niệm
Đầu tiên để hiểu về khái niệm chúng ta sẽ cùng xem ảnh dưới đây
![](https://images.viblo.asia/fd4b10a0-f1b1-4ed1-9bd1-578c871820ae.png)

Repository Pattern là một cách tổ chức source code trong Laravel. 
Nhìn vào ảnh này các ban có thể hình dung qua qua nó rồi chứ, Repository Pattern là lớp trung gian giữa tầng Data Access và Business Logic, hiểu môm na thì nó là lớp trung gian giữa việc truy cập dữ liệu và xử lý logic. giúp cho việc truy cập dữ liệu chặt chẽ và bảo mật hơn.

Bình thường để lấy dữ liệu gì đó hiển thị ra view thì chúng ta đơn giản viết một Controller query đến Database để lấy ra dữ liệu. Nhưng với Repository pattern như hình trên  chúng ta thấy Repository nó nằm giữa, là trung gian giữa Controller và Model. Hiểu đơn giản thì như thế này, khi có request gọi tới controller, controller gọi tới Repository rồi thằng này gọi tới model lấy data và xử lý, controller lấy dữ liệu thì chỉ việc gọi đến thằng này. 
Lí thuyết thì nói vậy thôi chứ còn để áp dụng nó vào dự án thì chúng ta sẽ xem ví dụ dưới đây nhé
## 2. Sử dụng Repository pattern trong Laravel

Bây giờ giả sử mình có một lớp Post và các bạn muốn lấy ra danh sách sản phẩm sắp xếp theo ID giảm dần? 

Đề bài khá là easy phải không đơn giản là vào **PostController** viết một hàm
```php
public function getPost()
{
    $posts = Post::orderBy('id', 'desc')->get();

    return view('post.index', compact('posts'));
}
```

Vậy là xong easy phải không, Còn nếu viết theo Repository pattern thì chúng ta sẽ phải tạo thêm một lớp là **PostRepository** trong một thư mục tên là Repositories, thư mục này trong app/
```php
namespace App\Repositories;

use App\Models\Post;

class PostRepository
{
    public function getPostById()
    {
        return Post::orderBy('id', 'desc')->get();
    }
}
```
Và trong PostController lúc này chúng ta sẽ viết
```php
class PostController extends Controller
{
    protected $postRepository;

    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }
    
    public function getPost()
    {
        $posts = $this->postRepository->getPostById();

        return view('post.index', compact('posts'));
    }
}
```
Đến đây thì các bạn sẽ tự hỏi, sao lại phải mất công, đang từ một lớp lấy dữ liệu ngon lành lại phải viết thêm một lớp nữa ?? Dữ liệu lấy ra cũng như vậy chả khác gì, mà ban đầu chỉ mất vài dòng code là lấy được, giờ tốn thêm cả chục dòng code nữa, tại sao lại phải như vậy ??.

Mình khi mới tìm hiểu về repository cũng hỏi câu này nhều rồi :). Và mình chắc là cũng một cơ số bạn nữa khi mới tìm hiểu về repository cũng đã từng tự có câu hỏi này.

Các bạn có thấy không, theo cách viết không dùng repository thì Controller sẽ gắn chặt và làm việc trực tiếp mới model. Nếu khi mà Model có sự thay đổi hay tái cấu trúc bảng gì đó ví dụ như cột **title** ở bảng posts chúng ta cần thay lại là **title_post** chẳng hạn thì chúng ta sẽ gặp rắc rối khi phải tìm code trong Controller xem chỗ nào dùng đến chỗ đó để sửa. Hoặc đau đớn hơn là, nhu cầu khách hàng thay đổi vào cái ngày trời nắng to ông ấy yêu cầu chúng ta lấy theo ID giảm dần thế kia, rồi vào một ngày mưa to ông ấy lại yêu cầu lấy theo lượt view giảm dần :D. Biết làm sao được phải chiều ý khách hàng thôi. 

Easy thôi, vào Controller tìm chỗ nào orderBy ID desc sửa thành orderBy view desc là xong. Nhưng vấn đề ở một dự án chúng ta sẽ sử dụng function đó nhiều lần và có thể là trong nhiều Class khác nhau. Khi đó thì chúng ta sẽ phải lần mò các Class trong Controller xem chỗ nào có để sửa như vậy thì quá mất thời gian, chưa kể trong khi sửa không may xóa nhầm hay thêm bớt gì đó trong code hoặc sửa thiếu một vài chỗ, rồi lại ngồi mò bug thì rất là phiền phức. Lúc này chính là lúc Repository phát huy tác dụng.

Khi viết theo repository thì đơn giản các bạn chỉ cần vào Repositories vừa tạo lúc nãy tìm chỗ cần sửa, chỉ cần sửa một chỗ, các controller gọi và sử dụng repository này cũng sẽ thay đổi như mình mong muốn. Đến đây các bạn bắt đầu thấy repository có ích rồi phải không.

Chưa hết đâu. Tiếp nhé, giờ không nắng cũng không mưa nữa rồi, trời bắt đầu có gió thì ông khách hàng kia lại đưa ra yêu cầu là dùng MongoDB hoặc Redis để lưa dữ liệu :D. Thôi đành chiều ý ông kia vậy. Chúng ta sẽ phải tìm  **PostRepository** vừa rồi và đổi lại thành các **PostRepositoryRedis** hay **PostRepositoryMongo**... Ok, không sao sửa thôi,sửa xong vài ngày thì thì ông kia lại không lại muốn quay trở lại như cũ. Đến đây là có vấn đề rồi. Vậy giải pháp là gì?

Để giải quyết vấn đề trên chúng ta sẽ tạo ra một Interface chung cho các loại repositories. Để làm được điều này chúng ra sẽ tạo thêm một thư mục là **Contracts** và bên trong tạo thêm một thư mục tên là **Repositories** để viết Interface chung như đã nói trên vào đó, sau đó tạo một interface tên là **PostRepositoryInterface** ở trong đó. Tên mình đặt kia là không bắt buộc nhé các bạn có thể đặt tên khác. Hoặc viết thư mục Contracts bên trong thư mục Repositories tạo ban đầu cũng được. Tất nhiên là với một dự án thì chúng ta phải xây dựng nhiều Interface ví dụ này mình xây dựng cho Post. Ví dụ một blog thì chúng ta còn phải xây dựng Interface cho Tag, Question... các Interface này sẽ đặt hết trong **App\Contracts\Repositories** nhé. 
```php
namespace App\Contracts\Repositories;

interface PostRepositoryInterface
{
    public function getPostById();
    ...
}
```

Và bây giờ chúng ta đã có 1 interface như một khuôn mẫu chúng để cho các Repositories ở trên implement. Nếu trong project chúng ta có không chỉ PostRepositoryInterface mà còn có các Interface khác như **TagRepositoryInterface**, **QuestionRepositoryInterface**. Và chúng ta nhận ra là trong các Interface này có những function tương tự nhau như **all(), update(), create()**.... Các function mà Interface nào cũng thấy có thì các bạn nên xây dựng một **Interface chung** để khai báo các hàm chung trong đó, và lúc này **PostRepositoryInterface, TagRepositoryInterface, QuestionRepositoryInterface** sẽ **extend** từ cái Interface chung vừa nói trên đặt nó là **AbstractRepositoryInterface** 
```php
namespace App\Contracts\Repositories;

interface AbstractRepositoryInterface
{
    public function model();

    public function all();

    public function store(array $data);

    public function show($id);

    public function edit($id);
    ....
}
```

Và nếu cần một function riêng nào đó không có trong **AbstractRepositoryInterface** thì chúng ta chỉ cần khai báo thêm trong các **Interface** **extend**
```php
namespace App\Contracts\Repositories;

interface PostRepositoryInterface extends AbstractRepositoryInterface
{
    public function pending($id);

    public function getTags($id);
    .....
}
```

Lúc này thì **PostRepository** chúng ta vừa viết lúc nãy sẽ implements từ **PostRepositoryInterface** sẽ phải có chút thay đổi như sau
```php
namespace App\Repositories;
​
use App\Models\Post;
​
class PostRepository implements PostRepositoryInterface
{
{
    //override
    public function getPostById()
    {
        return Post::orderBy('id', 'desc')->get();
    }
}
```
Redis hay Mongo thì tương tự cũng sẽ implements từ PostRepositoryInterface.
Và bây giờ trong **PostsController** chúng ta sẽ thay đổi
```php
class PostsController extends Controller
{
    protected $postRepository;

    public function __construct(PostRepositoryInterface $postRepository)
    {
        $this->PostRepository = $postRepository;
    }

    public function getPost()
    {
        $post = $this->postRepository->getPostById();

        return $post;
    }
}
```
Nhớ thêm namspaces **PostRepositoryInterface** nữa nhé.

Các bạn có nhận ra điều gì không, khi chúng ta thay đổi PostsController thế kia thì khi chạy chắc chắc sẽ bị báo lỗi vì PostRepositoryInterface là một Interface và tất nhiên Interface thì không thể tạo instance được, chúng ta không thể inject Interface vào Controller. Nhưng với Laravel thì được đấy, với [Service container](https://viblo.asia/p/tim-hieu-ve-service-container-trong-laravel-Qbq5QLw3lD8) nó có thể giúp chúng ta bind một interface vào một implement của nó. Các bạn có thể tìm hiểu [Service container và Denpendency Injection](https://viblo.asia/p/tim-hieu-ve-service-container-trong-laravel-Qbq5QLw3lD8) để hiểu rõ hơn các làm việc của nó nhé. 

Tiếp theo chúng ta phải vào thư mục **Providers** và tìm đến **AppServiceProvider** để đăng kí. Trong phương thức **register()** chúng ta sẽ thêm.
```php
public function register()
{
    $this->app->bind(
        'App\Contracts\Repositories\PostRepositoryInterface',
        'App\Repositories\PostRepository'
    );
}
```
Như vậy là chúng ta đã đăng kí xong và có thể inject **PostRepositoryInterface** trong **PostController**. Nếu dự án chúng ta cần bind nhiều Interface thì tốt nhất là nên tạo ra một file riêng trong **app/Providers** chứ không nhất thiết phải dùng **AppServiceProvider**. Nếu dung cách tạo ra file mới, thì phải khai báo file đó config/app.php và thêm vào **providers** nhé
```php
'providers' => [
...
    App\Providers\RepositoryServiceProvider::class,
],
```

Quay trở lại với **PostController** giờ thì **PostController** của chúng ta sẽ chỉ làm việc với **PostRepositoryInterface**, các bạn đã thấy lợi ích của Repository Pattern rồi chứ. Trong **PostRepositoryInterface** chúng ta sẽ xây dựng những phương thức chung cho các Repostories implements để thực hiện chúng, trong Controller thì chúng ta sẽ tiến hành gọi như trên để lấy dữ liệu. 

Vậy là qua bài này mình đã giới thiệu xong cho các bạn về **Repository Pattern** trong Laravel. Hy vọng có thể giúp các bạn đang muốn tìm hiểu và muốn clean code có thể phần nào hiểu được và áp dụng.

link tham khảo:

https://viblo.asia/p/laravel-design-patterns-series-repository-pattern-part-3-ogBG2l1ZRxnL
https://viblo.asia/p/tim-hieu-ve-service-container-trong-laravel-Qbq5QLw3lD8
http://phpviet.net/repository-pattern-trong-laravel/