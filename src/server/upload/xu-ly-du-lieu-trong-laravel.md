# Lời nói đầu
Như chúng ta đều biết, hiện nay hầu hết các MVC frameworks đều có 3 thư mục chính để xử lý dữ liệu: Models, Views và Controllers. Laravel cũng không nằm ngoại lệ. Thông thường, chúng ta sẽ hiểu rằng: Models là nơi chứa dữ liệu, Controllers sẽ xử lý dữ liệu và Views là nơi để hiển thị dữ liệu đó ra cho người dùng. Liệu còn có cách kiểm soát và xử lý dữ liệu nào khác không? Trong bài viết này, mình xin chia sẻ làm thế nào để xử lý chúng một cách hợp lý trong framework Laravel, thông qua 3 cách: 
# Cách 1: Viết toàn bộ code logic vào Controller
Cách dễ dàng nhất để xử lý code logic là "tống" thẳng chúng trực tiếp vào bên trong Controller. Ví dụ, ta có một đoạn code xử lý công việc tạo mới một bài viết và hiển thị chúng:
```PHP
class PostController extends Controller 
{
    public function store(Request $request) 
    {
        // Validation
        $data = $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
        ]);
        
        // Tạo một bài viết mới
        $post = new Post();
        $post->title = $data['title'];
        $post->content = $data['content'];
        $post->save();
        
        return redirect()->route('posts.index');
    }
    
    // Publish "ló" :))
    public function publish(Post $post) 
    {
        $post->published_at = now();
        $post->save();
        
        return back();
    }
}
```
## Ưu điểm
Cách viết này nhanh, gọn và nhẹ khi chúng ta cần xử lý những đoạn code đơn giản. 
## Nhược điểm
1. Khi sử dụng cách này, gần như là Eloquent của bạn không phải xử lý tác vụ gì ngoài việc khai báo những trường được sử dụng và các mối quan hệ giữ các bảng. Ví dụ:
````PHP
class Post extends Model
{
    protected $guarded = ['id'];

    public function category()
    {
        return $this->belongsTo('App\Category');
    }
}
````
2. Khi xuất hiện thêm nhiều nghiệp vụ, nếu sử dụng cách này, Controller của bạn trở nên "phình to" => khó quản lý. 

Về bản chất, **Controller chỉ nên làm nhiệm vụ đúng như tên gọi của nó**. Controller giống như một chiếc điều khiển TV. Khi người dùng bấm nút, Controller sẽ điều hướng tới kênh người dùng mong muốn và việc TV hiển thị ra gì phụ thuộc kết nối của TV với ăng ten hoặc đầu thu, không phải do chiếc điều khiển. Vậy làm thế nào để khắc phục nhược điểm trên?
# Cách 2: Chuyển code logic sang Eloquent
Để Controller đơn thuần là một chiếc điều khiển, chúng ta có thể chuyển toàn bộ code logic sang Eloquent:
````PHP
class Post extends Models
{
    // Khai báo các thuộc tính và quan hệ
    protected $guarded = ['id'];

    public function category()
    {
        return $this->belongsTo('App\Category');
    }
    
    // Triển khai code logic
    public static function savePost($title, $content) 
    {
        $post = new Post();
        $post->title = $title;
        $post->content = $content;
        $post ->save();
    }
    
    public function publish() 
    {
        $this->published_at = now();
        $this->save();
    }
}
````
Controller của chúng ta sẽ trở nên đơn giản hơn:
```PHP
class PostController extends Controller 
{
    public function store(Request $request) 
    {
        // Validation
        $data = $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
        ]);
        
        // Cầm chiếc điều khiển TV và điều hướng tới kênh "Create Post" :))
        Post::savePost($data['title'], $data['content']);
        
        return redirect()->route('posts.index');
    }
    
    // Tương tự, chuyển sang kênh "Publish Post" \m/
    public function publish(Post $post) 
    {
        $post->publish();
        
        return back();
    }
}
```
Ngoài ra, chúng ta có thể sử dụng **Scope**. Trong Laravel, Scope cho phép bạn tạo ràng buộc cho các truy vấn tới Model. Chúng ta có thể viết một Scope để lấy ra những post được active trong Eloquent như thế này:
````PHP
class Post extends Model
{
    // Chấm chấm chấm
    ...
    
    // Khai báo một "Sờ Cốp" :))
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}
````
**Lưu ý:** Scope trong Laravel luôn phải bắt đầu bằng "**scope**NameOfTheScope". Laravel sẽ tự động hiểu "scope" như một alias, kiểu kiểu như là đặt cho nó một bí danh ấy, chẳng hạn như là: scopeEmTenLaAn, scopeMayTuongMoiMinhMayTenLaAnA, etc.

Ngoài ra, khi sử dụng Scope, code của chúng ta cũng trở nên gọn gàng hơn. Rõ ràng là, khi phải get dữ liệu ở nhiều nơi, việc dùng Scope tiện hơn nhiều so với Eloquent ORM hay Query Builder.
Ví dụ, thay vì phải dùng Eloquent ORM để lấy những post được active:
````PHP
$activePosts = Post::where('status', 'active')->get();
````
Chúng ta có thể thay thế bằng:
````PHP
// Chúng ta có "Sờ Cốp" scopeActive đã khai báo ở trên
$activePosts = Post::active()->get();
````
## Ưu điểm
1. Giảm tải code logic ở Controller.
2. Code gọn gàng hơn. 
3. Có thể tái sử dụng được. Về cơ bản, Scope trả về dữ liệu "gần cuối", tức là chưa đến bước ->get() hoặc là ->first(). Vì vậy, chúng ta có thể "nối đuôi" các scopes khi truy vấn dữ liệu. Ví dụ, sau khi khai báo 2 scopes là scopeGetName và scopeGetAddress, chúng ta có thể cho chúng chơi trò "tàu hỏa" (smile):
````PHP
$customPosts = Post::getName('An')->getAddress('Vietnam')->get();
````
## Nhược điểm
1. Giống như Controller, việc sử dụng quá nhiều functions hay scopes khiến cho code khó kiểm soát và quản lý. 
2. Việc thay đổi code ở một Scope có thể gây ra phát sinh lỗi ở nhiều nơi. Rõ ràng là trong một scope scopeActive chúng ta thay đổi status từ 'active' thành 'inactive' thì bản chất của scope đó cũng thay đổi hoàn toàn rồi.
3. Việc sử dụng quá nhiều functions hay scopes trong một Model khiến Model đó không thuần nhất là một Model nữa. Một Model chỉ nên có 3 phần:
- Khai báo các thuộc tính.
- Khai báo các quan hệ.
- Khai báo các Scopes ràng buộc dữ liệu đơn giản, có thể tái sử dụng được.
# Cách 3: Sử dụng Repository Pattern
Tùy vào hoàn cảnh và nghiệp vụ của bài toán, chúng ta có thể áp dụng linh hoạt 1 trong 2 cách trên. 

Ngoài ra, chúng ta có thể áp dụng một cách khác, cái mà có thể khắc phục nhược điểm của cả 2 cách trên, nhưng bù lại sẽ phức tạp hơn và khó làm quen hơn. (Of course là như vậy rồi, ít cái vừa ngon vừa dễ ăn lắm :">). Đó là sử dụng một Design Pattern. Nôm na theo sách dịch thì Design Pattern là một loại kỹ thuật lập trình cung cấp cho chúng ta các mẫu thiết kế nhằm áp dụng vào các trường hợp cụ thể để giải quyết các bài toán dễ dàng hơn (boiroi). Ở đây cụ thể mình xin giới thiệu Repository Pattern.

Ý tưởng cơ bản thì **Repository là cầu nối trung gian giữa Model và Controller.** 

Theo quan điểm của mình, chúng ta chỉ nên sử dụng Repository Pattern khi code logic trở nên phức tạp. Ví dụ, đối với trường hợp không áp dụng Repository Pattern, chúng ta phải viết code điều hướng controller và xử lý lấy dữ liệu từ database chung một chỗ, điều này rất khó để kiểm soát và có thể phải viết đi viết lại code nhiều lần (ở User Panel, Post Panel, etc. trong Admin Panel chẳng hạn). Chúng sẽ như thế này:
````PHP
class PostController extends Controller
{
    public function index()
    {
        $posts = Post::all();

        return view('home.posts', compact('posts'));
    }

   public function show($id)
   {
        $post = Post::findOrFail($id);

        return view('home.post', compact('post'));
   }

   public function store(Request $request)
   {
        $data = $request->all();

        //... Validation here

        $post = Post::createOrFail($data);

        return view('home.post', compact('post'));
   }

   public function update(Request $request, $id)
   {
        $data = $request->all();

        //... Validation here

        $post = Post::findOrFail($id);
        $post->update($data);

        return view('home.post', compact('post'));
   } 

   public function destroy($id)
   {
        $post = Post::findOrFail($id);
        $post->delete();

        return view('home.post', compact('post'));
   }
}
````
Ở ví dụ trên, ta thấy mỗi lần lấy một bài viết bất kỳ ta đều dựa trên Model, bây giờ lỡ như khách hàng yêu cầu chỉ lấy bài Post có status là 'active' thôi thì sao? Sure là chúng ta có phải sửa tất cả phần lấy ra Post trong các functions ở trên rồi.
May mắn là Repository Pattern khắc phục được nhược điểm đó. Cụ thể, chúng ta sẽ đi sâu vào quy trình áp dụng Repository Pattern:
### Step 1: Tạo thư mục quản lý các Repository
Ở bước này, ta sẽ tạo một thư mục **Repositories** trong thư mục **app** để quản lý các Repository.
### Step 2: Tạo RepositoryInterface 
Ta sẽ tạo một interface mang tên **RepositoryInterface** bắt buộc các repository theo một chuẩn chung:
````PHP
namespace App\Repositories;

interface RepositoryInterface
{   
    public function getAll();

    public function find($id);

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function delete($id);
}
````
### Step 3: Tạo RepositoryEloquent
Ta sẽ xây dựng một abstract class tên là **RepositoryEloquent** cho driver Eloquent implements từ **RepositoryInterface**. Abstratct class này đưa ra các phương thức cơ bản bắt buộc Repository nào cũng phải có (sẽ có nhiều class driver khác nhau để lấy cơ sở dữ liệu như MongoDB, Redis, v.v..).
````PHP
namespace App\Repositories;

abstract class RepositoryEloquent implements RepositoryInterface
{
    protected $model;

    public function __construct()
    {
        $this->setModel();
    }

    abstract public function getModel();

    public function setModel()
    {
        $this->_model = app()->make($this->getModel());
    }
    
    public function getAll()
    {
        return $this->_model->all();
    }

    public function find($id)
    {
        $result = $this->_model->find($id);
        
        return $result;
    }
    
    public function create(array $attributes)
    {
        return $this->_model->create($attributes);
    }

    public function update($id, array $attributes)
    {
        $result = $this->find($id);
        if($result) 
        {
            $result->update($attributes);
            return $result;
        }
        
        return false;
    }

    public function delete($id)
    {
        $result = $this->find($id);
        if($result) 
        {
            $result->delete();   
            return true;
        }

        return false;
    }
}
````
### Step 4: Tạo PostRepositoryInterface
Bây giờ, tạo một mẫu Post\PostRepositoryInterface để định nghĩa các phương thức chỉ có trong Post Repository. Ví dụ, ngoài các phương thức bắt buộc phải có thì Post cần có thêm method findOnlyPublished và getAllPublished để lọc các bài đã đăng:
````PHP
namespace App\Repositories\Post;

interface PostRepositoryInterface
{
    public function getAllPublished();
    
    public function findOnlyPublished();
}
````
### Step 5: Tạo PostRepositoryEloquent
Tiếp tục, tạo Repository Eloquent cho Post. Nó extends từ abstract class RepositoryEloquent (Step 3) và implements từ interface PostRepositoryInterface (Step 4):
````PHP
namespace App\Repositories\Post;

use App\Repositories\RepositoryEloquent;

class PostRepositoryEloquent extends RepositoryEloquent implements PostRepositoryInterface
{
    public function getModel()
    {
        // Có thể bớ cái scopeActive zô đây được này
        // => Sửa duy nhất ở đây là đủ rồi :D
        return \App\Models\Post::class;
    }

    public function getAllPublished()
    {
        $result = $this->_model->where('is_published', 1)->get();

        return $result;
    }

    public function findOnlyPublished($id)
    {
        $result = $this
            ->_model
            ->where('id', $id)
            ->where('is_published', 1)
            ->first();

        return $result;
    }
}
````
### Step 6: Inject
Chúng ta sẽ mở tập tin **/app/Providers/AppServiceProvider.php** và thêm vào method **register()** như sau:
````PHP
public function register()
{
    $this->app->singleton(
        \App\Repositories\Post\PostRepositoryInterface::class,
        \App\Repositories\Post\PostRepositoryEloquent::class
    );
}
````

### Step 7: Áp dụng Repository vào Controller
````PHP
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Post\PostRepositoryInterface;

class PostController extends Controller
{
    protected $postRepository;

    public function __construct(PostReposiotoryInterface $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    public function index()
    {
        $posts = $this->postRepository->getAll();

        return view('home.posts', compact('posts'));
    }

    public function show($id)
    {
        $post = $this->postRepository->find($id);

        return view('home.post', compact('post'));
    }

    public function store(Request $request)
    {
        $data = $request->all();

        //... Validation here

        $post = $this->postRepository->create($data);

        return view('home.post', compact('post'));
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();

        //... Validation here

        $post = $this->postRepository->update($id, $data);

        return view('home.post', compact('post'));
    }

    public function destroy($id)
    {
        $this->postRepository->delete($id);
        return view('home.post');
    }
}
````
## Ưu điểm
GIảm việc lặp code.

Code dễ dàng maintain.
## Nhược điểm
Mất thời gian để tìm hiểu và thích ứng.
# Tổng kết
Trong bài viết này mình đã chia sẻ với các bạn các cách xử lý dữ liệu trong framework Laravel.
Ngoài ra, các bạn có thể fork một Repository Pattern chay (chưa có code logic gì) từ repo của mình:

https://github.com/hoangvietan96/repository_pattern

Hi vọng bài viết giúp ích cho các bạn. Hẹn gặp lại các bạn ở các bài viết sau :D
# Tham khảo
https://kipalog.com/posts/Repository-Pattern-trong-Laravel

https://medium.com/@mantasd/proper-way-to-use-laravel-eloquent-3ca194e2b766

Mình kết nhất bài viết này, đối với mình nó gần như là một cuốn mini book gối đầu rồi =)):

https://viblo.asia/p/laravel-design-patterns-series-repository-pattern-part-3-ogBG2l1ZRxnL