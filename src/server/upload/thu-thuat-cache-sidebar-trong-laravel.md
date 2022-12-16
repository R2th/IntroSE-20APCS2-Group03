Nếu là một lập trình viên web chắc hẳn các bạn cũng đã từng gặp phải những trường hợp cần phải cache một hoặc nhiều phần của một trang web. Đó thường là những phần ít thay đổi hoặc chứa lượng dữ liệu lớn. Điều này giúp cho trang web chạy nhanh hơn và góp phần giảm tải cho server. Một ví dụ đơn giản nhưng thường gặp đó là việc cache sidebar hay navbar, đây là một thành phần mà hầu như bất kỳ trang web nào cũng có và chúng cũng rất ý khi thay đổi. Để minh họa cho ví dụ này, mình sẽ sử dụng Laravel để thực hiện các bước. Nào hãy cùng bắt đầu thôi.

## Cache trong Laravel
Cũng như rất nhiều framework khác, Laravel hỗ trợ rất tốt cho các thao tác liên quan đến caching. Bằng việc sử dụng một API thống nhất làm cho việc thao tác trên các trên các cache driver khác nhau là hoàn toàn giống nhau.

Các cache driver mà Laravel hỗ trợ có thể kể đến như:
* Database caching: Có ưu điểm là dễ quản lý, thường được sử dụng khi nội dung cần cache là tương đối lớn.
* Memcache: Có tốc độ nhanh, chỉ sử dụng khi dữ liệu cache là nhỏ.
* Redis: Giống như memcache vì đều sử dụng RAM, hạn chế nhược điểm của Database caching và Memcache.

Trong Laravel, để thao tác với cache, chúng ta sử dụng `Illuminate\Support\Facades\Cache`.
## Cache sidebar
Để thực hiện việc cache sidebar trước tiên chúng ta sẽ chuẩn bị file `sidebar.blade.php` có nội dung như sau:
```html
<aside class="sidebar">
    <ul class="main-menu">
        @foreach($categories as $category)
            <li class="{{ active_class_for($category) }}">
                {{ $category->name }}
            </li>
        @endforeach
    </ul>
</aside>
```
Chúng ta sử dụng một helper method để xác định xem menu nào đang active:
```php
function active_class_for($category)
{
    $routeName = Route::currentRouteName();
    
    return $routeName == $category->route_name ? 'active' : '';
}
```
Sidebar sẽ được include vào trong layout `app.blade.php`:
```html
<!DOCTYPE html>
<html lang="en">
@include('layouts.includes.head')
<body>
<div class="page-container">
    @include('layouts.includes.header')
    @include('layouts.includes.sidebar')
    
    <div class="main-container">
        @yield('content')
    </div>
    
    @include('layouts.includes.footer')
</div>
</body>
</html>
```

#### Sử dụng view composer
Như các bạn đã thấy, mỗi lần sidebar được render, chúng ta sẽ lại phải lấy ra danh sách các categories. Sẽ là rất thích hợp nếu như sử dụng một view composer là `SidebarComposer` để xử lý vấn đề này:
```php
<?php

namespace App\Http\ViewComposers;

use App\Models\Category;
use Illuminate\View\View;

class SidebarComposer
{
    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $categories = Category::all();

        $view->with(compact('categories'));
    }
}
```
#### Lưu nội dung sidebar vào cache
* Chúng ta sử dụng thêm một helper method nữa để thực hiện lấy nội dung của sidebar và lưu vào trong cache:
```php
function cache_sidebar()
{
    $cacheKey = 'sidebar';
    
    if (!Cache::has($cacheKey)) {
        $htmlContent = View::make('layouts.includes.sidebar')->render();
        Cache::forever($cacheKey, $htmlContent);
    }

    return Cache::get($cacheKey);
}
```
* Hàm `cache_sidebar` sẽ có nhiệm vụ là kiểm tra xem sidebar đã được cache lại hay chưa, nếu chưa nó sẽ thực hiện điều đó và cuối dùng là trả về nội dung đã được lưu trong cache. Sau bước này, trong layout `app.blade.php` chúng ta sẽ thay:
```php
@include('layouts.includes.sidebar')
```
thành dòng code sau:
```php
{!! cache_sidebar() !!}
```
* Sau khi sidebar được cache chúng ta cũng không cần phải load categories mỗi khi render sidebar nữa. Điều này xử lý đơn giản trong method compose của `SidebarComposer` :

```php
public function compose(View $view)
{
      if (Cache::has('sidebar') {
          return;
      }
      
      $categories = Category::all();

      $view->with(compact('categories'));
}
```
#### Xử lý active menu
Đến đây mọi thứ có vẻ đã hoạt động tốt, tuy nhiên có một vấn đền là sidebar chỉ được render một lần, những lần sau nó sẽ được lấy ra từ trong cache. Điều này đồng nghĩa với việc những đoạn code trong `sidebar.blade.php` cũng chỉ được chạy một lần duy nhất.
Vậy làm thế nào chúng ta có thể active một menu tương ứng với từng route name?
* Đầu tiên chúng ta sửa lại một chút code trong `sidebar.blade.php`:
```html
<li data-active="{{ $category->route_name }}">
    {{ $category->name }}
</li>
```
* Tiếp theo là sử dụng regex để replace phần `data-active` thành class active mà chúng ta muốn, trong hàm `cache_sidebar` chúng ta sửa lại như sau:
```php
function cache_sidebar($user)
{
    $cacheKey = 'sidebar';
    $routeName = Route::currentRouteName();
    $regexRoute = "/data-active=\"$routeName\"/";

    if (!Cache::has($cacheKey)) {
        $htmlContent = View::make('layouts.includes.sidebar')->render();
        Cache::forever($cacheKey, $htmlContent);
    }

    return preg_replace($regexRoute, 'class="active"', Cache::get($cacheKey));
}
```
Sau đó, nhớ clear cache và reload lại page để xem thay đổi nhé.

## Summary
Vừa rồi mình đã chia sẻ với các bạn một thủ thuật nhỏ để thực hiện cache sidebar trong Laravel. Bài viết đã cung cấp cho các bạn một số kiến thức cơ bản về cache và sử dụng cache trong Laravel. Hi vọng nó cũng sẽ hữu ích cho nhưng bạn đang tìm kiếm giải pháp cho vấn đề này.

Blog: https://www.dnlblog.com/posts/thu-thuat-cache-sidebar-trong-laravel