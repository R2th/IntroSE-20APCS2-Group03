## Mở đầu
**Design patterns** là các giải pháp đã được tối ưu hóa, được tái sử dụng cho các vấn đề lập trình mà chúng ta gặp phải hàng ngày. Nó là một khuôn mẫu đã được suy nghĩ, giải quyết trong tình huống cụ thể rồi.
<br>
**Repository Pattern** là một mẫu thiết kế trong design pattern.
<br>
### Repository Pattern là gì?
**Repository Pattern** là lớp trung gian giữa tầng `Business Logic` và `Data Access`, giúp cho việc truy cập dữ liệu chặt chẽ và bảo mật hơn.
<br>
**Repository** đóng vai trò là một lớp kết nối giữa tầng Business và Model của ứng dụng.
<br>
Hiểu đơn giản thì khi t muốn truy xuất dữ liệu từ database, thay vì viết code xử lý trong controller thì ta tạo ra 1 thư mục là **Repository** rồi viết code xử lý vào đây. Sau đó chúng ta chỉ việc `inject` vào thông qua `__construct`.
<br>
**Những lý do ta nên sử dụng mẫu Repository Pattern:**
* Code dễ dàng maintain.
* Tăng tính bảo mật và rõ ràng cho code.
* Lỗi ít hơn.
* tránh việc lặp code.
<br>
### Repository trong laravel
Để hiểu hơn về `Repository pattern` chúng ta sẽ xây dựng 1 controller trong laravel.
<br>
Chúng ta sẽ có bảng `post` chứa thông tin: id, title, content. Với model như sau: 
<br>
```
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class post extends Model
{
    protected $table = "posts";

     protected $fillable = [
        'title', 'content','view'
    ];
}
```
Chúng ta sẽ tạo ra 1 `PostController` để có thể xử lý tác vụ cơ bản `curd`.
<br>
Thông thường khi chưa áp dụng `repository` thì code của chúng ta sẽ như thế này:

```
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;

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
```

Có vẻ nhìn cũng rất ổn đấy chứ. Tuy nhiên, trong `project` có thêm thằng `CategoryController` và bạn nhận ra rằng chúng ta phải viết lại code y hệt thằng `PostController` chỉ thay đổi mỗi `models` xử lý. Và bạn mới nghĩ rằng tại sao không thể dùng chung code xử lý, Từ đây thằng `repository` ra đời( tất nhiên đây chỉ là 1 ứng dụng của `repository` mình lấy ra để các bạn dễ tiếp cận)
<br>
## Xây dựng Repository cơ bản
**Ý tưởng:** tạo ra 1 class chung đặt tên là `EloquentRepository` để xử lý tác vụ `crud` chung. Sau đó, chúng ta sẽ tạo ra các class con extend class `EloquentRepository` và truyền vào models tương ứng để xử lý.


-----


<br>

Trước Tiên các bạn tạo ra một thư mục `Repositories` trong thư mục app để quản lý các `Repository`.
<br>
Trong thư mục `Repositories` các bạn tạo ra 1 class `EloquentRepository` với nội dung như sau:
```
<?php

namespace App\Repositories;

abstract class EloquentRepository
{
    /**
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $_model;

    /**
     * EloquentRepository constructor.
     */
    public function __construct()
    {
        $this->setModel();
    }

    /**
     * get model
     * @return string
     */
    abstract public function getModel();

    /**
     * Set model
     */
    public function setModel()
    {
        $this->_model = app()->make(
            $this->getModel()
        );
    }

    /**
     * Get All
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function getAll()
    {

        return $this->_model->all();
    }

    /**
     * Get one
     * @param $id
     * @return mixed
     */
    public function find($id)
    {
        $result = $this->_model->find($id);

        return $result;
    }

    /**
     * Create
     * @param array $attributes
     * @return mixed
     */
    public function create(array $attributes)
    {

        return $this->_model->create($attributes);
    }

    /**
     * Update
     * @param $id
     * @param array $attributes
     * @return bool|mixed
     */
    public function update($id, array $attributes)
    {
        $result = $this->find($id);
        if ($result) {
            $result->update($attributes);
            return $result;
        }

        return false;
    }

    /**
     * Delete
     *
     * @param $id
     * @return bool
     */
    public function delete($id)
    {
        $result = $this->find($id);
        if ($result) {
            $result->delete();

            return true;
        }

        return false;
    }

}
```
Ở trong thư mục `Repositories` chúng ta tạo 1 class post.
```
<?php
namespace App\Repositories\Post;

use App\Repositories\EloquentRepository;

class PostEloquentRepository extends EloquentRepository
{

    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return \App\Models\Post::class;
    }
}
```
Trong class `PostEloquentRepository` chúng ta sẽ khi đè hàm getModel() để thay vào models tương ứng. Ở đây là models `Post`. Tất nhiên là bạn cũng có thể viết thêm các `method` xử lý riêng của thằng `post` vào đây.
<br>
<br>
Quay trở lại thằng `PostController`. Việc cần làm là chúng ta sẽ `inject` thằng `PostRepository` vào `__construct()` của PostController. Rồi sử dụng nó thông qua biến `$postRepository` chúng ta tạo ra.

```
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Post\PostRepository;

class PostController extends Controller
{
    /**
     * @var PostRepositoryInterface|\App\Repositories\Repository
     */
    protected $postRepository;

    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }
    /**
     * Show all post
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = $this->postRepository->getAll();

        return view('home.posts', compact('posts'));
    }

    /**
     * Show single post
     *
     * @param $id int Post ID
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = $this->postRepository->find($id);

        return view('home.post', compact('post'));
    }

    /**
     * Create single post
     *
     * @param $request \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();

        //... Validation here

        $post = $this->postRepository->create($data);

        return view('home.post', compact('post'));
    }

    /**
     * Update single post
     *
     * @param $request \Illuminate\Http\Request
     * @param $id int Post ID
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();

        //... Validation here

        $post = $this->postRepository->update($id, $data);

        return view('home.post', compact('post'));
    }

    /**
     * Delete single post
     *
     * @param $id int Post ID
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->postRepository->delete($id);
        return view('home.post');
    }
}
```
Bạn có thể làm tương tự với thằng CategoryController. Tạo repository tương ứng và gọi sang. Thật đơn giản phải không nào.

### repository thông qua interface
Ở trên chúng ta đã áp dụng repository cơ bản rồi. Tuy nhiên, khi join vào 1 dự án lớn có nhiều người làm việc. Việc áp dụng interface để đảm bảo code chuẩn theo thiết kế cũng như dễ dàng thay đổi, maintain dễ dàng là điều cần thiết.
<br>
Quay trở lại class `EloquentRepository`, Việc cần làm trước khi xây dựng class `EloquentRepository` đó là tạo ra 1 bản thiết kế. Đó là 1 interface mình đặt tên là `RepositoryInterface`
```
<?php

namespace App\Repositories;

interface RepositoryInterface
{
    /**
     * Get all
     * @return mixed
     */
    public function getAll();

    /**
     * Get one
     * @param $id
     * @return mixed
     */
    public function find($id);

    /**
     * Create
     * @param array $attributes
     * @return mixed
     */
    public function create(array $attributes);

    /**
     * Update
     * @param $id
     * @param array $attributes
     * @return mixed
     */
    public function update($id, array $attributes);

    /**
     * Delete
     * @param $id
     * @return mixed
     */
    public function delete($id);
}
```

Đây là khung của `EloquentRepository`. Trong class `EloquentRepository` chúng ta sẽ implements `RepositoryInterface`. Chỉnh lại code trong class `EloquentRepository` 1 tí nào.

```
<?php

namespace App\Repositories;

use App\Repositories\RepositoryInterface;

abstract class EloquentRepository implements RepositoryInterface
{
    /**
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $_model;

    /**
     * EloquentRepository constructor.
     */
    public function __construct()
    {
        $this->setModel();
    }

    /**
     * get model
     * @return string
     */
    abstract public function getModel();

    /**
     * Set model
     */
    public function setModel()
    {
        $this->_model = app()->make(
            $this->getModel()
        );
    }

    /**
     * Get All
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function getAll()
    {

        return $this->_model->all();
    }

    /**
     * Get one
     * @param $id
     * @return mixed
     */
    public function find($id)
    {
        $result = $this->_model->find($id);

        return $result;
    }

    /**
     * Create
     * @param array $attributes
     * @return mixed
     */
    public function create(array $attributes)
    {

        return $this->_model->create($attributes);
    }

    /**
     * Update
     * @param $id
     * @param array $attributes
     * @return bool|mixed
     */
    public function update($id, array $attributes)
    {
        $result = $this->find($id);
        if ($result) {
            $result->update($attributes);
            return $result;
        }

        return false;
    }

    /**
     * Delete
     *
     * @param $id
     * @return bool
     */
    public function delete($id)
    {
        $result = $this->find($id);
        if ($result) {
            $result->delete();

            return true;
        }

        return false;
    }

}
```
Chúng ta sẽ thiết kế thêm chức năng riêng cho class `PostEloquentRepository`. Ví dụ ở đây mình muốn thêm 1 method lấy 5 post nhiều lượt xem nhất trong vòng 1 tháng chẳng hạn. Chúng ta sẽ tạo ra 1 bản thiết kế cho `PostEloquentRepository`. Mình đặt tên là 
```
<?php
namespace App\Repositories\Post;

interface PostRepositoryInterface
{
    /**
     * Get 5 posts hot in a month the last
     * @return mixed
     */
    public function getPostHost();
}
```

Ở bên `PostEloquentRepository` chúng ta sẽ implements `PostRepositoryInterface`
```
<?php
namespace App\Repositories\Post;

use App\Repositories\EloquentRepository;
use Illuminate\Support\Carbon;

class PostEloquentRepository extends EloquentRepository implements PostRepositoryInterface
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return \App\Models\Post::class;
    }

    /**
     * Get 5 posts hot in a month the last
     * @return mixed
     */
    public function getPostHost()
    {
        return $this->_model::where('created_at', '>=', Carbon::now()->subMonth())->orderBy('view', 'desc')->take(5)->get();
    };
    
}
```
Như đã nói ở trên, chúng ta sẽ làm việc thông qua interface. Mà các bạn đã biết chúng ta không thể sử dụng 1 đối tượng là interface. Do đó, chúng ta phải đăng kí với laravel để nó có thể hiểu rằng interface bạn sử dụng là của class cụ thể nào.
<br>
 Các bán sẽ mở tập tin app/Providers/AppServiceProvider.php và thêm vào method register() như sau:
```
public function register()
{
    $this->app->singleton(
        \App\Repositories\Post\PostRepositoryInterface::class,
        \App\Repositories\Post\PostEloquentRepository::class
    );
}
```
Bây giờ thì ta có thể sử dụng `PostRepositoryInterface` khi này nó sẽ hiểu là bạn sử dụng `PostEloquentRepository`.
Bây giờ trong PostController thay vì `inject` `PostEloquentRepository` thì bạn sẽ `inject` `PostRepositoryInterface`.
```
  public function __construct(PostRepositoryInterface $postRepository)
    {
        $this->postRepository = $postRepository;
    }
```
### kết luận
Việc áp dụng `Repository design pattern` cũng như các mẫu `design pattern` sẽ giúp các bạn tiết kiệm thời gian đồng thời cũng tăng hiệu suất, chất lượng code. Các mẫu `design pattern` không ràng buộc bởi ngôn ngữ lập trình dó đó nó có thể áp dụng ở mọi ngôn ngữ. Trên đây là bài tìm hiểu về `Repository design pattern` của minh. Cảm ơn các bạn đã theo dõi.