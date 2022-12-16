### I. Lời mở đầu
Sau một thời gian tìm hiểu về [Laravel](https://laravel.com/) và [VueJS](https://vuejs.org/), cũng như áp dụng hai em nó vào một số ```project```. Nói vậy thôi chứ mấy project cũng nhỏ nhỏ thôi ạ (nguong) =)). Mình cũng đúc kết ra được một số kinh nghiệm khi xây dựng website có kết hợp Laravel với VueJS. Trong loạt series này mình sẽ hướng dẫn các bạn xây dựng nó với kiến trúc và công nghệ mà mình đã từng áp dụng.
Trước khi đọc các phần bên dưới đảm bảo rằng các bạn đã có các kiến thức nhất định về Laravel cũng như VueJS. Nếu bạn là người mới học có thể tham khảo thêm một số bài viết dưới đây:

**Laravel:**
1. [Hoàng Hữu Hợi: Laravel và những điều cần biết phần 1, 2, 3](https://viblo.asia/p/laravel-va-nhung-dieu-can-biet-XQZGxolmvwA)
2. [Hoàng Nguyễn: Laravel và những điều thú vị](https://viblo.asia/s/laravel-va-nhung-dieu-thu-vi-o754jLreZM6)

3. [Đinh Tài: Những method thông dụng của Collection trong Laravel, bạn đã sử dụng hết chưa?](https://viblo.asia/p/nhung-method-thong-dung-cua-collection-trong-laravel-ban-da-su-dung-het-chua-07LKXOzp5V4)
4. [Vũ Nguyễn: Sử dụng Fractal - Transformer trong Laravel - Phần 1, 2](https://viblo.asia/p/su-dung-fractal-transformer-trong-laravel-phan-1-bWrZnNYwZxw)

**VueJS:**
1. [Nguyễn Văn Quy: 2018 - Cùng nhau học VueJS](https://viblo.asia/s/2018-cung-nhau-hoc-vuejs-b85ogvV252G)
2. [Vương Minh Thái: Cùng học VueJS từ con số 0](https://viblo.asia/s/cung-hoc-vuejs-tu-con-so-0-L6lAyeBrlek)

### II. Đôi chút về công nghệ áp dụng
Trong một lần lang thang trên web, mình từng được đọc một câu danh ngôn như này:
![](https://images.viblo.asia/a816901f-38d8-4d6d-ad6d-355bb497cefc.jpg)
> Viết code có lương tâm, dễ đọc dễ hiểu, nhớ comment đầy đủ. Hãy thương người maintain code của bạn (Đôi khi chính bạn phải maintain code của mình đấy, phải tự thương mình thôi).

Chính vì vậy trước khi bắt tay vào code, đảm bảo rằng bạn đã chọn cho mình những công nghệ phù hợp, một kiến trúc, và cách viết code sạch, "hợp lý" (hợp lý ở đây cũng khá khó để nói, tuy nhiên khi bạn và team của bạn cảm thấy đồng nhất và hiểu được code của nhau thì cũng "hợp lý" rồi). 

### 1. Back-End:
Với một project không quá phức tạp các lựa chọn bên dưới là khá cần thiết cho 1 project sắp tới.
- **Resource Controller:**
Để triển khai các chức năng ```CRUD``` thì Resource Controller là lựa chọn không thể thiếu. Tại sao vậy ??? 

Để tạo PostController chỉ với command đơn giản như thế này:
```
php artisan make:controller PostController --resource
```
Là đã tạo ra được một ```PostController``` với đầy đủ các actions (functions) cho chức năng ```CRUD``` rồi.
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
   /**
    * Show all post
    *
    * @return \Illuminate\Http\Response
    */
    public function index()
    {
        //
    }

    /**
    * Show single post
    *
    * @param $id int Post ID
    * @return \Illuminate\Http\Response
    */
   public function show($id)
   {
        //
   }
   /**
    * Create single post
    *
    * @param $request \Illuminate\Http\Request
    * @return \Illuminate\Http\Response
    */
   public function store(Request $request)
   {
        //
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
       //
   } 

   /**
    * Delete single post
    *
    * @param $id int Post ID
    * @return \Illuminate\Http\Response
    */
   public function destroy($id)
   {
       //
   }
}
```
Sau khi tạo xong ```Resource Controller``` đăng ký resources trong Routes:
```php
Route::resources(['posts' => 'PostController']);
```
Từng action (function) cùng các route chi tiết có thể tham khảo rõ hơn tại đây: https://laravel.com/docs/5.7/controllers#resource-controllers
- **Model Binding:**

Cách làm thông thường
```php
   /**
    * Show single post
    *
    * @param $id int Post ID
    * @return \Illuminate\Http\Response
    */
   public function show($id)
   {
        $post = Post::findOrFail($id)
   }
```
Với Model Binding
```php
   /**
    * Show single post
    *
    * @param $post Post
    * @return \Illuminate\Http\Response
    */
   public function show(Post $post)
   {
        dd($post);
   }
```
- **Repository Pattern:**
Repository Pattern là lớp trung gian giữa tầng Business Logic và Data Access, giúp cho việc truy cập dữ liệu chặt chẽ và bảo mật hơn.Nó vai trò là một lớp kết nối giữa tầng Business và Model của ứng dụng. Các phần truy xuất, giao tiếp với database năm rải rác ở trong code, khi bạn muốn thực hiện một thao tác lên database thì phải tìm trong code cũng như tìm các thuộc tính trong bảng để xử lý. Điều này gây lãng phí thời gian và công sức rất nhiều, vì thế với Repository design pattern, thì việc thay đổi ở code sẽ không ảnh hưởng quá nhiều công sức chúng ta chỉnh sửa.
- **Fratal - Transformer:** Thay vì trả response APIs trực tiếp từ model, dùng Fratal - Transformer để tả về những dữ liệu tùy chỉnh theo lựa chọn của chúng ta. Chính vì vậy khi model có sự thay đổi, front-end sử dụng API của model đó sẽ không bị thay đổi theo.

Một ví dụ Fratal - Transformer trong Laravel:
```php
<?php

namespace App\Models\Transformers;

use App\Models\Posts;
use League\Fractal\TransformerAbstract;

class PostTransformer extends TransformerAbstract
{
    /**
     * @param  Post $post
     * @return array
     */
    public function transform(Post $post)
    {
        return [
            'id' => $post->id,
            'title' => $post->title,
            'description' => $post->description,
        ];
    }
```

- **PostRepository:**
```php
<?php

namespace App\Repositories;

use App\Models\Post;
use App\Models\Transformers\PostTransformer;
use Illuminate\Database\Eloquent\Collection;

/**
 * Class PostRepository
 * @package App\Repositories
 */
class PostRepository extends AbstractRepository
{
    /**
     * @var Post
     */
    protected $model;
    
    /**
     * PostRepository constructor.
     * @param Post $model
     */
    public function __construct(Post $model)
    {
        $this->model = $model;
    }

    /**
     * Get list Post
     * @param int|null $paginate
     * @return Collection
     */
    public function getListPosts($paginate = null)
    {
        $paginate = min($paginate ?: config('pagination.post.per_page'), 100);
        $posts = $this->model->->orderBy('created_at', 'desc')
                     ->paginate($paginate);
        $posts['data'] = $this->refactorTransformer(
            $posts['data'],
            new PostTransformer()
        )->toArray();
        
        return $posts;
    }
}
```
- **PostController:**
```php
<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Repositories\PostRepository;
use Illuminate\Http\Request;
use App\Models\Transformers\PostTransformer;

class PostController extends Controller
{
    /**
     * Entity of Controller
     * @var PostRepository
     */
    protected $entity;
    
    /**
     * @param PostRepository $postRepository
     */
    public function __construct(PostRepository $postRepository)
    {
        $this->entity = $postRepository;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->responseOk($this->entity->getListPosts($request->perPage);
    }
}
```
Cách mà mọi người hay làm:
```php
<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $paginate = min($request->paginate ?: config('pagination.post.per_page'), 100);
        $posts = $this->model->->orderBy('created_at', 'desc')
                     ->paginate($paginate);
                     
        return $posts;
    }
}
```
Khi bắt đầu code có sử dụng Fratal - Transformer và repository chỉ một action bạn có thể thấy mệt mỏi khi phải viết tận mấy file thay vì viết trực tiếp trong controller như trên. Tuy nhiên, khi dự án lớn dần và đòi hỏi nhiều chức năng hơn, bạn sẽ thấy nó thật tuyệt vời không chỉ việc sử dụng lại các function dễ dàng mà khi specs thay đổi việc sửa code cũng như refactor, maintain lại cực kỳ nhẹ nhàng.
Đặc biệt khi code bên Back-end nên comment đầy đủ và chính xác đảm bảo cho việc maintain sau này.
* **Laravel-mix:**
Có thể sử dụng ```npm``` hoặc ```yarn```. Cá nhân thì mình hay dùng ```yarn```
### 2. Front-End:
* **Vue, Vuex:**
    * Vue component
    * Vue router
    * Vuex
    
* **Element-UI (or Vue material):**
   - Element-ui: https://element.eleme.io/#/en-US (Khuyên dùng)
   - Vue-material: https://vuematerial.io/
* **SCSS và flexbox:**
    * Flexbox: là một kiểu dàn trang (layout mode) mà nó sẽ tự cân đối kích thước của các phần tử bên trong để hiển thị trên mọi thiết bị. Nói theo cách khác, bạn không cần thiết lập kích thước của phần tử, không cần cho nó float, chỉ cần thiết lập nó hiển thị chiều ngang hay chiều dọc, lúc đó các phần tử bên trong có thể hiển thị theo ý muốn.
    ![](https://images.viblo.asia/12eb94e2-bd35-493b-b000-c665ce24554a.gif)
    * SCSS: Cú pháp của SCSS dựa trên cú pháp của CSS, bắt đầu sử dụng {} và ; như CSS, không còn quá quan trọng việc thụt lề hay các khoảng trắng.
```css
.menu {
    ...

    &__item {
        ...
    }

    &--fixed {
        ...
    }
}
```
### Tạm kết
Phần 1 tạm dừng lại ở đây, hy vọng bạn đã có đủ kiến thức nhất định để bắt đầu xây dựng project ở phần sau nhé.