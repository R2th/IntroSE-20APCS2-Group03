# Giới thiệu
Đã bao giờ bạn phải code và xử lý logic quá nhiều ở ```Controller``` sau đó truyền biến qua ```View``` không ạ? Với những trường hợp không quá phức tạp thì không sao, nhưng với View cần quá nhiều dữ liệu mà cần phải xử lý logic trong ```Controller``` trước thì thật kinh khủng (x_X). Rất may ở đây chúng ta có một package là ```Laravel View Model```. Thực chất ```View Model``` một ```class``` trung gian giữa ```Controller``` và ```View```, ```class``` này sẽ chứa logic biến đổi dữ liệu theo dạng phù hợp với View (không hẳn là giống MVVM Pattern).
# Cài đặt
Cài đặt thông qua composer

```composer require spatie/laravel-view-models```
# Sử dụng như thế nào?
Thay vì viết toàn bộ logic xử lý cho ```View``` ở ```Controller``` ta sẽ viết ở ```View Model```, điều này giúp cho ```Controller``` không quá cồng kềnh. Chúng ta có thể tạo 1 view model bằng cách extends từ ```php Spatie\ViewModels\ViewModel```.
Dưới đây là một ví dụ:
```php
class PostsController
{
    public function create()
    {
        $viewModel = new PostViewModel(
            current_user()
        );
        
        return view('blog.form', $viewModel);
    }
    
    public function edit(Post $post)
    {
        $viewModel = new PostViewModel(
            current_user(), 
            $post
        );
    
        return view('blog.form', $viewModel);
        //hoặc như thế này
        //return (new PostViewModel($post))->view('blog.form');
    }
}
```

Thay vì truyền biến thẳng qua ```view```, chúng ta truyền một ```view model``` qua ```view```, trong view model này sẽ chứa logic xử lý dữ liệu cho ```view```.
```php
class PostViewModel extends ViewModel
{
    public $indexUrl = null;

    public function __construct(User $user, Post $post = null)
    {
        $this->user = $user;
        $this->post = $post;
        
        $this->indexUrl = action([PostsController::class, 'index']); 
    }
    
    public function post(): Post
    {
        return $this->post ?? new Post();
    }
    
    public function categories(): Collection
    {
        return Category::canBeUsedBy($this->user)->get();
    }
    public function formatDate(Carbon $date): string
    {
        return $date->format('Y-m-d');
    }
}
```
Ở ```view``` có thể truy cập vào tất cả các thuộc tính và phương thức public của ```view model``` và xử lý như bình thường với Blade Template :D,  . 
```html <input type="text" value="{{ $post->title }}" />
<input type="text" value="{{ $post->body }}" />
<select>
    @foreach ($categories as $category)
        <option value="{{ $category->id }}">{{ $category->name }}</option>
    @endforeach
</select>

//truyền params vào phương thức trong view model
<span>{{ $formatDate($post->created_at) }}</span>

<a href="{{ $indexUrl }}">Back</a>
```
Lưu ý: Trong trường hợp HTTP Header set ```Content-Type``` là ```JSON``` response sẽ trả về định dạng ```JSON``` thay vì ```view``` đã đc render :D 

## Với JSON response
Mặc định ```view model``` sẽ trả về dữ liệu theo định dạng ```JSON```, ta có thể set response là 1 instance của ```View Model```.
```php
class PostsController
{
    public function update(Request $request, Post $post)
    {
        // …
        
        return new PostViewModel($post);
    }
}
```
hoặc 
```php
class PostViewModel
{
    // …
    
    public function values(): array
    {
        return PostResource::make(
            $this->post ?? new Post()
        )->resolve();
    }
}
```
## Tạo view model thế nào?
Tạo một ```view model``` bằng artisan CLI:

```php artisan make:view-model HomepageViewModel```.

Mặc định HomepageViewModel sẽ có namespace là ```App\ViewModels```.

# Kết luận
Với ```view model``` chúng ta có thể làm cho ```Controller``` clean hơn, một phần nào đó có thể giúp quá trình maintenance sau này bớt khổ cực :D