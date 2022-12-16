Xin chào mn, dev PHP mà viết về PHP thì nó quá là bình thường phải ko nào, vậy còn dev RoR viết thì sẻ thế nào đây. Mình dev RoR đây, mình mới chuyển qua học Laravel được mấy tháng. Hôm nay mình mạn phép chia sẻ với mọi người về policy trong Laravel.

### 1. Tổng thể về policy
#### *Policy là gì?*
- Theo bản thân mình nhận thấy rằng Laravel là một trong những framwork hỗ trợ mạnh mẽ nhất mà mình từng biết, mọi thứ bạn hay dùng đều đã được tích hợp sẳn vào core laravvel hoặc các package. Một trong số đó có authentication, và đi đôi với authentication(xác thực) không ai khác ngoài authorization(phân quyền). 
- Có 2 cách đơn giản để bạn phân quyền cho hệ thống của mình được Laravel hỗ trợ sẳn là Gate và Policy. Cả 2 cách này đều được sử dụng rộng rải và thông thường thì sẻ sử dụng Gate khi mà bạn phân quyền những thứ không liên quan đến bất kì model hay resource nào cả ví dụ xem một trang admininistrator dashboard. Ngược lại, thì đối với Policy thì sử dụng bạn phân quyền liên quan đến model hoặc resource.
- Ở bài viết này mình tập trung chia sẻ mn cách sử dụng Policy nhé!

### 2. Làm việc với policy
Vậy để tạo cho mình một policy thì phải làm những gì, mn hãy following những step sau nhé:

#### *a) Khởi tạo policy:*
- Đầu tiên các bạn generate ra file policy tương ứng, Laravel có hỗ trợ cú pháp `make:policy` để giúp bạn trong việc này rồi.
- Ở trong phạm vi bài viết này thì mình muốn authorize cho model Post. Cú pháp như sau:
   ```
        php artisan make:policy PostPolicy
   ```
- Mn chú ý là một policy bắt buộc phải có hậu tố là `Policy` đi theo sau model hoặc resource nhé.
- Nếu như muốn generate ra một file có cả CRUD thì mn chạy lệnh sau:
   ```
        php artisan make:policy PostPolicy --model=Post
   ```

#### *b) Đăng kí Policy:*
- Bước tiếp theo bạn phải đăng kí policy. Việc đăng kí này giúp App mapping được giữa model của bạn với policy một cách tự động. 

    ```php
    <?php

    namespace App\Providers;

    use App\Policies\PostPolicy;
    use App\Post;
    use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
    use Illuminate\Support\Facades\Gate;

    class AuthServiceProvider extends ServiceProvider
    {
        /**
         * The policy mappings for the application.
         *
         * @var array
         */
        protected $policies = [
            Post::class => PostPolicy::class,
        ];

        /**
         * Register any application authentication / authorization services.
         *
         * @return void
         */
        public function boot()
        {
            $this->registerPolicies();

            //
        }
    }
    ```

#### *c) Triển khai policy*
* ##### Policy methods

    Vừa rồi chúng ta chỉ mới setup một số thứ cơ bản, bây giờ mới đến lúc chúng thiết lập policy theo mong muốn của mình. 
    Giả sử mình muốn phân quyền là User chỉ có quyền update những bài Post của User đó mà thôi:

     - Chúng ta mở file `PostPolicy.php`, và thêm method `update` vào như dưới:

    ```php
      <?php
        namespace App\Policies;

        use App\Post;
        use App\User;

        class PostPolicy
        {
            /**
             * Determine if the given post can be updated by the user.
             *
             * @param  \App\User  $user
             * @param  \App\Post  $post
             * @return bool
             */
            public function update(User $user, Post $post)
            {
                return $user->id === $post->user_id;
            }
        }
    ```

    Tên method ở policy bạn có thể đặt theo tùy thích không nhất thiết phải giống với method ở controller.
    
    - Trường hợp không có model
    ```
        /**
         * Determine if the given user can create posts.
         *
         * @param  \App\User  $user
         * @return bool
         */
        public function create(User $user)
        {
            //
        }
    ```
    
    Ở ví dụ trên là trường hợp create Post, lúc này không có đối tượng post thì mình chỉ cần 1 tham số là instance của class User cho method create.
    
    - Policy filter:
        
        Đối với một số user nhất định, bạn muốn họ được toàn quyền trong policy, thì lúc này bạn sử dụng method `before` ở đầu class Policy. Method này sẽ thực thi trước khi các hàm khác trong Policy
        
        ```
        public function before($user, $ability)
        {
            if ($user->isSuperAdmin()) {
                return true;
            }
        }
        ```
    
    Dưới đây là bảng mapping giữa các method trong policy với controller:
    
    
#### *d) Các cách sử dụng policy* 
  - Sử dụng trong **Model**:
      ```
      if ($user->can('update', $post)) {
        //
      }
      ```

 - Sử dụng trong **Middleware**:
     ```
     use App\Post;

    Route::put('/post/{post}', function (Post $post) {
        // The current user may update the post...
    })->middleware('can:update,post');
     ```
   
  - Sử dụng trong **Controller**:
      ```
        <?php

        namespace App\Http\Controllers;

        use App\Http\Controllers\Controller;
        use App\Post;
        use Illuminate\Http\Request;

        class PostController extends Controller
        {
            /**
             * Update the given blog post.
             *
             * @param  Request  $request
             * @param  Post  $post
             * @return Response
             * @throws \Illuminate\Auth\Access\AuthorizationException
             */
            public function update(Request $request, Post $post)
            {
                $this->authorize('update', $post);

                // The current user can update the blog post...
            }
        }
      ```
     
 - Sử dụng **Authorizing Resource** trong Controller: Thay vì phải viết ` $this->authorize('update', $post);` ở trừng action trong Controller thì Laravel hỗ trợ cho chúng 1 method cực hay `authorizeResource`. Method này sẽ add authorization tương ứng giữa Policy và Controller với nhau. Dưới đây là bảng mapping giữa các method trong 2 class Policy và Controller
      
      | Controller method | Policy method |
      | -------- | -------- |
    | index     | viewAny     |
    | show     | view     |
    | create     | create     |
    | store     | create     |
    | edit     | update     |
    | destroy     | delete     |
    
- Có một điểm mn cần lưu ý, hiện tại hàm index ở controller không thể mapping với viewAny ở policy được. Mình search gg thì bảo là index đã remove. Mn có thể tham khảo cách fix như dưới hoặc [ở đây](https://github.com/laravel/ideas/issues/772):

    ```
    class PostController extends Controller
    {
        public function __construct()
        {
            $this->authorizeResource(Post::class);
        }

        protected function resourceAbilityMap()
        {
            return array_merge(parent::resourceAbilityMap(), ['index' => 'view']);
        }
    }
    ```

- Sử dụng ở **Blade Templates**:
    ```
    @can('update', $post)
    <!-- The Current User Can Update The Post -->
    @elsecan('create', App\Post::class)
        <!-- The Current User Can Create New Post -->
    @endcan

    @cannot('update', $post)
        <!-- The Current User Cannot Update The Post -->
    @elsecannot('create', App\Post::class)
        <!-- The Current User Cannot Create A New Post -->
    @endcannot
    ```
    
    
### Tổng kết
Qua bài chia sẽ trên mình hy vọng mn có thể nắm sơ qua được policy là gì và cách sử dụng policy hợp lí.

Cảm ơn MN đã đọc!

Happy Coding!