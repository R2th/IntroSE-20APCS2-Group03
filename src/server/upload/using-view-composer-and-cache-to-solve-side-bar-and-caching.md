# 1. Giới thiệu
Trong quá trình làm dự án, mình có tham gia công việc optimize phần loading side bar của web, phần side bar là phần dùng chung cho toàn bộ các page của một web, hiện tại nó sẽ call api để lấy dữ liệu mỗi khi người dùng vào một page nào đó và nhiệm vụ đề ra là chỉ lấy dữ liệu khi người dùng login vào page lưu vào cache, các lần sau sẽ lấy ra từ cache.
# 2. Hướng giải quyết
Để giải quyết bài toán này trong laravel framework mình sử dụng 2 kỹ thuật là **[view composer](https://laravel.com/docs/5.8/views#view-composers)** và **[cache](https://laravel.com/docs/5.8/cache)** thông qua ví dụ bên dưới để cho các bạn có thể hiểu được cách sử dụng chúng.
# 3. Ví dụ bài toán
Khi bạn thiết kế trang web, có thể nó bao gồm side bar (có thể là các bài posts hoặc những thứ khác), Bạn có thể làm như thế này:
```php
<?php
namespace App\Http\Controllers;
use App\Services\CollectionService;
use Illuminate\Http\Request;
class CollectionsController extends Controller
{
    /**
     * @var CollectionService
     */
    private $collectionService;
    public function __construct(CollectionService $collectionService)
    {
        $this->collectionService = $collectionService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $collections = $this->collectionService->all();
        return view('collections.index', compact('collections'));
    }
}
```

Và file blade của bạn sẽ như sau:
```php
@extends('layouts.app')

@section('content')
    <h1>
        All Collections
    </h1>
    <ol>
        @foreach($collections as $collection)
            <li>
                {{ $collection->name }}
            </li>
        @endforeach
    </ol>
    
    @include('posts.all')
@endsection
```
Vấn đề đặt ra, nếu bạn cần side bar với các bài posts, bạn sẽ làm tương tự cho việc này:
```php
<?php
use Illuminate\Http\Request;
class CollectionsController extends Controller
{
    //Same as upon...
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $collection = $this->collectionService->find($id);
      
        $posts = $this->postService->all();
        return view('collections.show', compact('collection', 'posts'));
    }
}
```
Nếu một page khác cũng cần side bar với các bài posts này thì ta cũng phải lấy hết tất cả các posts trong db và gán cho biến $posts, việc làm này sẽ tạo ra sự duplicate code, và khi mà phần side bar chúng ra không lấy ra các bài toàn bộ bài posts mà chỉ lấy ra các bài posts với đk nào đó thì ta cần phải sửa toàn bộ các file lấy những bài posts này (tìm và thay thế nó :))). Các giải quyết ở đây ta sẽ sử dụng view composer, có nhiệm vụ lấy ra những bài posts gán cho biến $posts và là biến dùng chung cho tất cả các page cần sử dụng nó.

Đầu tiên tạo một provider tên là ComposerServiceProvider để handle mọi view composer của chúng ta. 
```php
 php artisan make:provider ComposerServiceProvider`
```
Mọi service provider muốn sử dụng thì phải đk trong phần providers thư mục config/app.php
```php
'provides' => [App\Providers\ComposerServiceProvider::class,]
```
Tiếp theo tạo một file AllPostComposer để lấy tất cả các bài posts trong db:
```php
<?php
namespace App\Http\ViewComposers;
use Illuminate\View\View;
use App\Services\PostService;
use App\Repositories\UserRepository;
class AllPostComposer
{
    protected $postService;
    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }
    public function compose(View $view)
    {
        $view->with('posts', $this->post->all());
    }
}
```
Sau đó trong method boot của file ComposerServiceProvider ta viết như sau
```php
<?php
namespace App\Providers;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
class ComposerServiceProvider extends ServiceProvider
{
    /**
     * Register bindings in the container.
     *
     * @return void
     */
    public function boot()
    {
        // Using Closure based composers...
        // Here is a simple example...
        View::composer('collections.index', function ($view) {
            $view->with('posts', app(\App\Services\AllPostService::class)->all());
        });
    }
    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
```
AllPostService có nhiệm vụ lấy tất cả các bài post trong db, sau đó gán cho biến $posts, ComposerServiceProvider sẽ handle AllPostService do nó được viết trong method boot, trả biến $posts này cho file blade 'collections/index.blade.php'.
Nếu bạn muốn biến $posts này được dùng chung cho tất cả các file balde thì bạn có thể sử dụng ký tự dại diện là '*' để thay thế
```php
/**
     * Register bindings in the container.
     *
     * @return void
     */
    public function boot()
    {
        // Using Closure based composers...
        // Here is a simple example...
        View::composer('*', function ($view) {
            $view->with('posts', app(\App\Services\AllPostService::class)->all());
        });
    }
```
Hoặc sử dụng trong nhiều page khác nhau
```php
/**
     * Register bindings in the container.
     *
     * @return void
     */
    public function boot()
    {
        // Using Closure based composers...
        // Here is a simple example...
        View::composer(['collections.index', 'collections.show'], function ($view) {
            $view->with('posts', app(\App\Services\AllPostService::class)->all());
        });
    }
```
Sử dụng view composer ta mới giải quyết được bài toán tạo một logic chỉ để lấy ra các bài posts cho phần side bar dể dễ dang việc maintain nhưng vẫn phải load nhiều lần, để chỉ load lần đầu tiên ta sẽ sử dụng **cache** như sau:
```php
<?php
namespace App\Http\ViewComposers;
use Illuminate\View\View;
use App\Services\PostService;
use App\Repositories\UserRepository;
class AllPostComposer
{
    protected $postService;
    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }
    public function compose(View $view)
    {
        $view->with('posts', Cache::remember('posts', 60 /* cache expired time(mins) */, function() {
                return $this->post->all();
        });
    }
}
```
Hàm Cache::remember có nhiệm vụ là 

1. Nếu biến $posts chưa có trong Cache nó sẽ lưu biến đấy vào với thời gian expired được set ở tham số thứ 2 (trong ví dụ là 60') và trả về kết quả ở tham số thứ 3
2. Nếu biến $post có trong Cache rồi nó sẽ trả về kết quả ở tham số thứ 3
# 4. Kết luận
Mình vừa trình bày cho các bạn về ví dụ sử dụng view composer và cache trong quá trình mình tìm hiểu được để optimize hệ thống, mong sẽ giúp ích được cho các bạn nếu gặp phải vấn đề này.
# 5. Tài liệu tham khảo
https://laravel.com/docs/5.8/cache

https://laravel.com/docs/5.8/views#view-composers

https://medium.com/yish/using-view-composer-and-cache-to-solve-side-bar-and-caching-e16a562d5900