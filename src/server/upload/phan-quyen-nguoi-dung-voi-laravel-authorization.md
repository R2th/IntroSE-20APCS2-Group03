# 1. Giới thiệu<br>
Bất kể hệ thống website nào cũng có người dùng và đi kèm với nó là việc xác thực (authentication) và phân quyền (authorization) với từng người dùng. Trong 1 website chỉ có một hoặc hai đối tượng người dùng ta có thể viết middleware để phân quyền, nhưng trong các website lớn, nhiều đối tượng người dùng hơn thì việc phân quyền trở nên phức tạp, Authorization được sinh ra để giải quyết đơn giản vấn đề này.<br>
    Có 2 cách chính trong phân quyền, đó là Gates và Policies. Chúng ta sẽ tìm hiểu lần lượt 2 cách này.<br>
# 2. Gates<br>
## 2.1. Writing Gates<br>
Gate là các Closure được xác định nếu một người dùng được xác thực để thực hiện một hành động, nó được định nghĩa trong *App\Providers\AuthServiceProvider* sử dụng facade Gate. Gate luôn nhận một thực thể user là tham số thứ nhất và có thể có các tham số tùy chọn khác như Eloquent Model:<br>
  ```php
  /**
 * Register any authentication / authorization services.
 *
 * @return void
 */
public function boot()
{
    $this->registerPolicies();

    Gate::define('update-post', function ($user, $post) {
        return $user->id == $post->user_id;
    });
}
```
Gate cũng có thể định nghĩa sử dụng dạng callback string giống như Controller:<br>
```php
/**
 * Register any authentication / authorization services.
 *
 * @return void
 */
public function boot()
{
    $this->registerPolicies();

    Gate::define('update-post', 'App\Policies\PostPolicy@update');
}
```
- Resource Gates
    Bạn có thể định nghĩa nhiều Gate sử dụng phương thức resource
`Gate::resource('posts', 'App\Policies\PostPolicy');`<br>
Với phương thức resource nó tương tự như định nghĩa thủ công các phương thức sau:<br>
```php
Gate::define('posts.view', 'App\Policies\PostPolicy@view');
Gate::define('posts.create', 'App\Policies\PostPolicy@create');
Gate::define('posts.update', 'App\Policies\PostPolicy@update');
Gate::define('posts.delete', 'App\Policies\PostPolicy@delete');
```
Mặc định view, create, update và delete được định nghĩa. Bạn có thể override các khả năng này bằng cách truyền vào một mảng như là tham số thứ 3 cho phương thức resource.
Key của mảng này định nghĩa tên khả năng trong khi giá trị định nghĩa tên phương thức.<br>
```php
Gate::resource('posts', 'PostPolicy', [
    'image' => 'updateImage',
    'photo' => 'updatePhoto',
]);
```
## 2.2. Authorizing Actions
 Để phân quyền thực hiện một hành động, bạn có thể sử dụng các phương thức allows và denies, chú ý rằng bạn không cần truyền người dùng đã được xác thực vào các phương thức này. Laravel sẽ tự động xử lý việc đó trong các gate Closure:<br>
```php
if (Gate::allows('update-post', $post)) {
    // The current user can update the post...
}

if (Gate::denies('update-post', $post)) {
    // The current user can't update the post...
}
```
Nếu bạn muốn xác định một người dùng nào đó có được phân quyền để thực hiện một hành động hay không, bạn có thể sử dụng phương thức forUser trên facade Gate:
```php
if (Gate::forUser($user)->allows('update-post', $post)) {
    // The user can update the post...
}

if (Gate::forUser($user)->denies('update-post', $post)) {
    // The user can't update the post...
}
```
- Intercepting Gate Checks:<br>
Đôi khi, bạn muốn cấp tất cả các quyền cho một người dùng cụ thể. Bạn có thể sử dụng phương thức before để xác định 1 callback được chạy trước tất cả các kiểm tra ủy quyền khác:
```php
Gate::before(function ($user, $ability) {
    if ($user->isSuperAdmin()) {
        return true;
    }
});
```
Nếu before callback trả về kết quả không null thì kết quả đó sẽ được coi là kết quả của kiểm tra.
Bạn có thể sử dụng phương thức after để xác định 1 callback sẽ được thực hiện sau khi tất cả các kiểm tra ủy quyền khác:
```php
Gate::after(function ($user, $ability, $result, $arguments) {
    if ($user->isSuperAdmin()) {
        return true;
    }
});
```
# 3. Policy
## 3.1. Creating Policies
Policies là các class tổ chức ủy quyền logic xung quanh model hoặc resource cụ thể. Ví dụ, nếu ứng dụng của bạn là một blog, bạn có thể có một model Post và một policy là PostPolicy để phân quyền các hành động người dùng như tạo hay cập nhật các bài viết.
Bạn có thể tạo ra một policy bằng cách sử dụng câu lệnh Artisan make:policy, các policy được tạo ra sẽ được đặt trong thư mục app\Policies. Nếu thư mục này không tồn tại trong project, Laravel sẽ tự động tạo nó cho bạn:<br>
`php artisan make:policy PostPolicy`<br>
Câu lệnh make:policy sẽ sinh ra một class policy rỗng, nếu muốn sinh ra một CRUD policy bạn cần thêm tham số –model khi thực thi câu lệnh artisan:<br>
`php artisan make:policy PostPolicy --model=Post`
## 3.2. Registering Policies
 Một policy muốn sử dụng cần được đăng ký, AuthServiceProvider được đưa vào trong project Laravel chứa một thuộc tính policies để map Eloquent model với các policy tương ứng. Đăng ký một policy sẽ chỉ dẫn cho Laravel policy nào sẽ được sử dụng để phân quyền hành động cho model nào:
```php
<?php

namespace App\Providers;

use App\Post;
use App\Policies\PostPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

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
## 3.3. Writing Policies
- Policy Methods:<br>
Khi Policy được đăng ký, bạn có thể thêm các phương thức cho mỗi hành động cần cấp quyền. Ví dụ, định nghĩa phương thức update trên PostPolicy để xác định một user có thể cập nhật một thực thể Post. Phương thức update sẽ nhận được một User và Post như là tham số và nó trả về true hoặc false để nhận diện xem người dùng này có được phân quyền để cập nhật Post không? Trong ví dụ dưới đây, chỉ có người dùng đã viết bài mới có quyền cập nhật bài viết
```php
<?php

namespace App\Policies;

use App\User;
use App\Post;

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

Bạn có thể tiếp tục định nghĩa các phương thức khác trên policy này nếu cần phân quyền cho các hành động. Ví dụ, bạn có thể định nghĩa phương thức view hoặc delete để phân quyền các hành động Post khác và nhớ rằng tên các phương thức trong policy là hoàn toàn bạn có thể đặt thoải mái nếu thích.<br>
- Methods Without Models<br>
    Có những phương thức policy chỉ nhận người dùng được xác thực hiện tại và không cần một thực thể của một Model. Tình huống này dùng khi phân quyền một hành động create. Ví dụ, nếu bạn tạo một blog, bạn có thể muốn kiểm tra nếu một người dùng có được phân quyền để tạo một post bất kỳ không.
Khi định nghĩa phương thức trong policy nó sẽ không nhận một thực thể của Model, như phương thức create, nó sẽ không nhận một thực thể của model. Thay vào đó, bạn nên định nghĩa phương thức chỉ với người dùng đã được xác thực.
```php
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

- Policy Filters:<br>
Với người dùng hiện tại, bạn muốn cấp quyền thực hiện các hành động trong một chính sách, để thực hiện bạn định nghĩa phương thức before trong policy. Phương thức before sẽ thực thi trước bất kỳ phương thức nào trong policy, nó cho bạn cơ hội để cho phép thực hiện hành động trước khi phương thức của policy mong muốn được gọi. Tính năng này rất thông dụng để cho phép các administrator có thể thực hiện bất kỳ hành động nào:
```php
public function before($user, $ability)
{
    if ($user->isSuperAdmin()) {
        return true;
    }
}
```
Nếu bạn muốn một user không được phép thực hiện bất kỳ gì bạn chỉ cần trả về false trong phương thức before. Nếu trả về null, người dùng sẽ được cấp quyền như đã viết trong phương thức policy.<br>
## 3.4. Authorizing Actions Using Policies<br>
- Thông qua Model:<br>
Model User được tạo sẵn trong project Laravel chứa hai phương thức có sẵn là can và can't. Phương thức can nhận hành động bạn cho phép và model liên quan. Ví dụ, để xác định một người dùng được phép cập nhật model Post không?
```php
if ($user->can('update', $post)) {
    //
}
```
- Thông qua Middleware:
```php
use App\Post;

Route::put('/post/{post}', function (Post $post) {
    // The current user may update the post...
})->middleware('can:update,post');
```
- Thông qua Controller Helpers:
```php
<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
- Thông qua Blade Templates:<br>
```html
@can('update', $post)
    <!-- The Current User Can Update The Post -->
@elsecan('create', App\Post::class)
    <!-- The Current User Can Create New Post -->
@endcan

@cannot('update', $post)
    <!-- The Current User Can't Update The Post -->
@elsecannot('create', App\Post::class)
    <!-- The Current User Can't Create New Post -->
@endcannot
    
```
Nguồn tham khảo:<br>
https://laravel.com/docs/5.7/authorization#creating-policies