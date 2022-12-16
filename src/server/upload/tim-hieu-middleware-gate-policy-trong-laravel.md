## Giới thiệu 
Bài toán phân chia quyền cho user là một bài toán rất phổ biến và thường gặp khi làm các dự án web. Đơn giản như với quyền admin thì có thể thực hiện một số thao tác mà user thông thường không thể thực hiện được. Việc phân chia quyền user, cũng đưa đến một nguy cơ chiếm quyền user và đưa quyền user lên mức cao hơn và từ quyền được chiếm, thì họ có thể phá hoại hoàn toàn dự án mà chúng ta đã xây dựng, hoặc lấy các thông tin user, cho một mục đích bất chính nào đó. Như vậy, việc phân chia quyền cho user, phải kiểm soát một cách chặt chẽ, và nếu không thực hiện một cách tỉ mỉ và cẩn thận, có thể dẫn đến vô số những nguy cơ cho sản phẩm mà chúng ta đưa ra.
Thật may, laravel đã cung cấp cho chúng ta ba công cụ hỗ trợ để đơn giản hóa việc phân chia quyền user và định nghĩa các hành động mà user được phép hành động: **Middleware, Gate, Policy**

## Tìm hiểu chi tiết midleware, gate, policy
### Middleware 
- Middleware là giải pháp lọc các Http Request. Việc chủ yếu của middleware, là sẽ định nghĩa rằng request được gửi đến là được phép hay không. Câu hỏi là được phép được định nghĩa như nào? Và được phép để làm gì.
- Nếu sử dụng middleware của laravel, thì chúng ta sẽ không sử dụng bất cứ một thông tin nào khác ngoài thông tin request được target đến. Nghĩa là chúng ta sẽ sử dụng các thông tin như header của request, các dữ liệu trong body của request, để xác định request đến là được phép hay không. Nếu nó được phép, thì chúng ta sẽ tiếp tục tiến trình của request đến, nếu không được phép chúng ta sẽ redirect đến một trang không được phép định nghĩa trước.
- Hiểu nôm na, thì middleware là một bộ lọc, mà đối tượng đề cập đến là các Http request, nếu request chứa các thông tin được coi là hợp lệ, thì sẽ không có điều gì xảy ra với request đó cả, nó vẫn thực hiện các chức năng như một request thông thường mà không có middleware. Nhưng nếu request đó là không được phép, thì nó sẽ được bẻ cong đến một nơi chứa những request không dược phép mà bạn định nghĩa. 
- Trong larvel có sẵn một số middleware như authenticate (xác thực) hoặc csrf protection. Mọi middleware đều được chứa trong thư mục *app/Http/Middleware*

#### Tạo mới một middleware
- Để tạo mới một middleware, chúng ta dùng lệnh make:middleware 
   ```php
   php artisan make:middleware CheckAge
   ```
   Câu lệnh này sẽ tạo ra 1 class mới là **CheckAge** đặt trong thư mục *app/Http/Middleware* mà chúng ta đã đề cập đến ở trên
   ```php
   <?php

    namespace App\Http\Middleware;

    use Closure;

    class CheckAge
    {
        /**
         * Handle an incoming request.
         *
         * @param  \Illuminate\Http\Request  $request
         * @param  \Closure  $next
         * @return mixed
         */
        public function handle($request, Closure $next)
        {
            if ($request->age <= 200) {
                return redirect('home');
            }

            return $next($request);
        }

    }
   ```
   Mục đích của middleware trên là kiểm tra thông tin **age** (số tuổi) trong mỗi request, nếu thuộc tính này mà dưới 200, thì cho trở về trang 'home', nếu không, thì cho request thực hiện tiến trình của nó. 
   Middleware này chủ yếu là tìm những người ngoài hành tinh hoặc những tiên nhân mới được phép sử dụng dịch vụ mà chúng ta cung cấp, tất cả mọi người bình thường thì không được phép dùng dịch vụ.  Nếu diễn tả đơn giản công việc của middleware trên là, nếu có cụ nào sống trên 200 tuổi thì các cụ làm gì thì làm, nếu các cụ mà sống dưới 200 tuổi, thì mời trở về trang chủ đọc lại điều kiện sử dụng dịch vụ. Một middleware đậm chất tấu hài. Nếu số tuổi mà chúng ta đặt mốc là 18 tuổi, chúng ta sẽ có một middleware chỉ giành cho những thành viên trên 18 tuổi trở lên có thể truy cập các nội dung mà chúng ta đưa ra. Điều này nghe có vẻ thì hợp lý hơn nhiều. 
- Như nội dung đã để cập ở trên middleware sẽ chỉ lấy các thông tin có trong từng request để quyết định là nó có hợp lệ hay không

Tìm hiểu thêm về middleware [tại đây](https://laravel.com/docs/5.8/middleware)\
### Gate
- Gate là một **Closures**, nó định nghĩa cho phép/từ chối thực hiện một hành động cụ thể nào đó hay không của một user. 
- Có thể hiểu Gate là một bộ lọc khác mà laravel cung cấp để thực hiện việc xác thực user có được phép hay không thực hiện một hành động cụ thể. Khác với middleware đề cập ở trên, Gate sử dụng dữ liệu với tham số thứ nhất là user, các tham số khác ở các vị trí tiếp theo.
- Gate sẽ không gắn liên quan đến model nào cả, Gate sẽ chỉ sử dụng thông tin được cung cấp bởi những tham số, và thường, **thường** thôi nhé, Gate sẽ được sử dụng ở tầng Controller, để định nghĩa hành động của user là có được phép hay không. 
- Gate được viết ở **App\Providers\AuthServiceProvider** và sử dung **Gate** facade
#### Viết một gate
```php
<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Auth;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
       
        Gate::define('edit-comment', function ($user, $commment) {
            return $user->id == $comment->user_id;
        });
    }
}
```
- Như ví dụ trên, nội dung logic, là một user chỉ được phép thực hiện hành động **edit-comment**, nếu comment đó có thuộc tính user_id bằng với id của user đang đăng nhập vào. 
- Chú ý rằng, Gate sẽ luôn nhận tham số đầu tiên là một thể hiện của lớp User, tức là mặc định, Gate sẽ nhận diện user đang đăng nhập là tham số thứ nhất, do đó, với các user đang đăng nhập, khi sử dụng Gate, ta sẽ không cần thiết phải truyền user vào. Trong các trường hợp khác, không sử dụng đăng nhập user, thì chúng ta có thể truyền user vào như là tham số đầu tiên. 
- Biến **$comment** không gắn với bất cứ model nào, nó không phải là model **Comment**, nhưng nó nhất thiết phải có thuộc tính user_id, giả sử nó không có thuộc tính user_id hoặc user_id là null,  thì **edit-comment** sẽ luôn và trả về giá trị **false**, điều đó đồng nghĩa với việc sẽ luôn là không được phép với hành động **edit-comment**
#### Sử dụng Gate trong controller
```php
public function index()
{
    $comment = Comment::findOrFail(1); // comment có id = 1 có user_id = 1
    if (Gate::allows('edit-comment', $comment)) {
        echo "Ban co quyen chinh sua comment";
    } else {
        echo "Ban khong co quyen chinh sua comment";
    }
}
```
Chúng ta có thể sử dụng **allows** hoặc **denies** từ **Gate Facade** để định nghĩa việc cho phép hay từ chối hành động của **Gate**, ở ví dụ trên ta cho phép hành động **edit-comment**.
Và như đã đề cập ở trên, mặc định **Gate** sẽ nhận user đang đăng nhập là tham số thứ nhất, user, nên khi sử dụng **Gate**, ta chỉ truyền tham số comment như là tham số thứ 2.

### Policy
- Cùng với middleware, gate, policy là một lựa chọn khác để thực việc xác thực, hành động nào là hành động được phép, hành động nào là không được phép. 
- Policy thường gắn với một model cụ thể
- Giống với **Gate**, **Policy** cũng nhận tham số đầu tiên là một thể hiện của user, và là user đang đăng nhập vào.
- Trong **Policy**, Model User cung cấp 2 phương thức hữu ích cho việc xác thực là *can* và *cant*. Phương thức *can* xác nhận việc user có thể thực hiện một hành động nào đó, trong khi phương thức *cant*, xác nhận việc user không thể thực hiện hành động được chỉ định. 
- **Policy** thường được sử dụng với các hành đông CRUD của một model cụ thể
#### Viết một policy
- Sử dụng make:policy để viết một một policy
```php
php artisan make:policy PostPolicy --model=Post
```
Ta thêm **--model=Post** để báo cho Larvel tự động tạo các phương thức CRUD, ta có thể truy cập mọi policy theo đường dẫn **app/Policies/**
Ta có thể viết PostPolicy như sau
```php
<?php
namespace App\Policies;
 
use App\User;
use App\Post;
use Illuminate\Auth\Access\HandlesAuthorization;
 
class PostPolicy
{
  use HandlesAuthorization;
 
  public function view(User $user, Post $post)
  {
    return TRUE;
  }
 
  public function create(User $user)
  {
    return $user->id > 0;
  }
 
  public function update(User $user, Post $post)
  {
    return $user->id == $post->user_id;
  }
 
  public function delete(User $user, Post $post)
  {
    return $user->id == $post->user_id;
  }
}
```
Để sử dụng class Policy, thì chúng ta sẽ khai báo trong service provider của laravel. 
```php
<?php
namespace App\Providers;
 
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use App\Post;
use App\Policies\PostPolicy;
 
class AuthServiceProvider extends ServiceProvider
{

  protected $policies = [
    'App\Model' => 'App\Policies\ModelPolicy',
    Post::class => PostPolicy::class,
  ];
 
  public function boot()
  {
    $this->registerPolicies();
  }
}
```
Rồi chúng ta có thể viết nó trong controller như sau
```php
<?php
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use App\Post;
use Illuminate\Support\Facades\Auth;
 
class PostController extends Controller
{
  public function view()
  {
    // Người dùng hiện tại
    $user = Auth::user();
     
    // load post
    $post = Post::find(1);
     
    if ($user->can('view', $post)) {
      echo "Người dùng được quyền xem";
    } else {
      echo 'Người dùng không được quyền xem.';
    }
  }
 
  public function create()
  {
// Người dùng hiện tại
    $user = Auth::user();
 
    if ($user->can('create', Post::class)) {
      echo 'Được quyền.';
    } else {
      echo 'Không được quyền';
    }
 
    exit;
  }
 
  public function update()
  {
   // Người dùng hiện tại
    $user = Auth::user();
 
    // load post
    $post = Post::find(1);
 
    if ($user->can('update', $post)) {
      echo "Được quyền";
    } else {
      echo 'Không được quyền.';
    }
  }
 
  public function delete()
  {
   // Người dùng hiện tại
    $user = Auth::user();
     
    // load post
    $post = Post::find(1);
     
    if ($user->can('delete', $post)) {
      echo "Được quyền";
    } else {
      echo 'Không được quyền.';
    }
  }
}

```
Cũng có thể sử dụng **authorize** của controller helpers.
### Tổng kết
- Nay chúng ta đã tìm hiểu 3 công cụ hỗ trợ việc phân quyền trong laravel để xác định một user có thể thực hiện một hành động nào đó hay không, đó là: **Middleware, Gate, Policy**.
- Trong khi **Middleware** đối tượng đề cập đến từng HTTP request, thì **Gate** chỉ quan tâm đến dữ liệu truyền vào và hành động được phép hay không, còn **Policy** thì thường được gắn với một Model cụ thể.
- Cả **Gate** và **Policy** đều nhận tham số đầu tiên là 1 thể hiện của class User, và thường là user đang đăng nhập vào.
- Có thể sử dụng cả **Middleware**, và sử dụng linh hoạt **Gate** và **Policy**. Thực tế, middleware sử dụng trọng routes, **Gate** và **Policy** sử dụng ở tầng controller một cách linh hoạt, một dự án bao giờ cũng có cả middleware, gate, và policy. 
- Bài viết được tham khảo từ nhiều nguồn khác nhau và đang được hoàn thiện dần.