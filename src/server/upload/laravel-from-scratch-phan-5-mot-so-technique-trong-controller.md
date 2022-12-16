Đây là chuỗi bài viết theo phong thái dễ hiểu, đơn giản, cơ bản, phù hợp với những người bắt đầu với Laravel từ con số 0. 
# Laravel Controller Techniques
   Phần này sẽ đề cập đến một số kỹ thuật trong controller cho mục đích refractoring bao gồm các nội dung sau:
* Auto mapping giữa Route và Model
* Xét những thuộc tính trong bảng dữ liệu được phép gán 
* Đặt tên định danh cho các routes
## Auto mapping giữa Route và Model
Nhận thấy dòng code `$article = Article::findOrFail($articleId);` được lặp lại nhiều trong controller `app/Http/Controllers/ArticlesController.php`. Chúng ta có thể sử dụng model làm tham số thay cho `$articleId` và sẽ loại bỏ được dòng code đó.
```php:app/Http/Controllers/ArticlesController.php
<?php

namespace App\Http\Controllers;

use App\Article;

class ArticlesController extends Controller
{
    ...
    public function show(Article $article) {
        return view('articles.show',['article' => $article]);
    }

    ...

    public function edit(Article $article) {
        return view('articles.edit',compact('article'));
    }

    public function update(Article $article) {
        $article->title = request('title');
        $article->excerpt = request('excerpt');
        $article->body = request('body');
        $article->save();

        return redirect('/articles/' . $article->id);
    }
}
```
Xét routes `Route::get('/articles/{article}', 'ArticlesController@show');`, với **sự giống nhau giữa tên wildcard và tên tham số model** `Article $article` thì Laravel sẽ ngầm hiểu đó là id truyền vào và trả ra `$article` tương ứng (nếu có). Nếu không có, nó sẽ trả về mã 404, khỏi lo chết trang. Điều này giúp chúng ta bỏ đi được các dòng code tìm kiếm.

Vậy nếu chúng ta muốn tìm kiếm theo trường khác không phải trường id mặc định thì có thể override lại hàm sau trong model.
```php:app/Article.php
...
class Article extends Model
{
    public function getRouteKeyName()
    {
        return 'title';
    }
}
```
**Lưu ý** Từ đó cũng sẽ phải thay một số link đường dẫn tới bài viết ở view. Ví dụ: `href="/articles/{{$article->title}}"` thay vì `href="/articles/{{$article->id}}"`
## Xét những thuộc tính trong bảng dữ liệu được phép gán 
Chúng ta có thể refractoring đoạn code ở `app/Http/Controllers/ArticlesController.php` như sau.

Hàm `request()->validate()` luôn trả về những trường thông tin hợp lệ, đã validate. Ta sẽ lấy kết quả đó truyền trực tiếp vào các method của model như class method `Article::create` và instance method `$article->update()`. Tuy nhiên, trong model phải thiết lập thêm để cho phép gán giá trị nào vào thuộc tính của bảng, tránh việc gán hàng loạt.
```php:app/Article.php
class Article extends Model
{
    protected $fillable = ['title', 'excerpt', 'body'];
}
```
Ví dụ ta có `Article::create($data)` nếu như `$data` là một mảng gồm rất nhiều cặp key-value, khi truyền vào method trên thì nó sẽ không cho phép gán hàng loạt thuộc tính (key) với value tương ứng vì người dùng có thể truyền vào những tham số trái phép( ví dụ `['isLogin' => 'true']`). Vì thế chúng ta phải khai báo những thuộc tính (key) cho phép gán dữ liệu.

```php:app/Http/Controllers/ArticlesController.php
<?php

namespace App\Http\Controllers;

use App\Article;

class ArticlesController extends Controller
{
    public function index()
    {
        $articles = Article::latest()->get();
        return view('articles.index', ['articles' => $articles]);
    }

    public function show(Article $article)
    {
        return view('articles.show', ['article' => $article]);
    }

    public function create()
    {
        return view('articles.create');
    }

    public function store()
    {
        Article::create($this->validateArticle());
        return redirect('/articles');
    }

    public function edit(Article $article)
    {
        return view('articles.edit', compact('article'));
    }

    public function update(Article $article)
    {

        $article->update($this->validateArticle());
        return redirect('/articles/' . $article->id);
    }

    protected function validateArticle()
    {
        return request()->validate([
            'title' => ['required', 'min:3', 'max:255'],
            'excerpt' => 'required',
            'body' => 'required'
        ]);
    }
}
```
## Đặt tên định danh cho các routes - Consider Named Routes
Nếu như code trong controller như sau.
```php:app/Http/Controllers/ArticlesController.php
    public function update(Article $article)
    {
        $article->update($this->validateArticle());
        return redirect('/articles/' . $article->id);
    }
```
Thì sẽ phát sinh ra trường hợp nếu như định nghĩa routes của trường hợp xem thông tin chi tiết 1 bài báo thay đổi thì ở trong controller hay ở các view chúng ta sẽ phải cập nhật lại đường link. Để khắc phục điều này chúng ta sẽ đặt tên định danh cho routes hay như một biến đại diện, để chúng ta có thể gọi bất cứ đâu và khi thay đổi chỉ cần thay đổi nội dung bên trong biến.
Ta sẽ định danh một số routes như sau.
```php:routes/web.php
Route::get('/articles', 'ArticlesController@index')->name('articles.index');
...
Route::get('/articles/{article}', 'ArticlesController@show')->name('articles.show');
...
```
Và gọi ra nội dung của các định danh này với các cách sau.
```php:Cách_1
#Chắc mọi người vẫn nhớ Auto mapping giữa Route và Model mặc định là id và thay đổi giá trị mặc định đó như thế nào nhỉ.
route('articles.show', $article);
```
```php:Cách_2
route('articles.show', $article->id);
```
FIle controller sẽ được sửa lại như sau:
```php:app/Http/Controllers/ArticlesController.php
    ...
    public function store()
    {
        Article::create($this->validateArticle());
        return redirect(route('articles.index'));
    }
    ...
    public function update(Article $article)
    {

        $article->update($this->validateArticle());
        return redirect(route('articles.show', $article));
    }
    ...
```
Tương tự áp dụng trong view với cú pháp tương tự. Đừng quên đặt trong `{{ }}` nhé!
Cơ mà cách gọi này có vẻ vẫn còn hơi dài dòng đối với action show nhỉ. Ta sẽ tiếp tục refractoring tiếp bằng cách sửa các file như sau.
```php:app/Article.php
    ...
    public function path()
    {
        return route('articles.show',$this);
    }
    ...
```
Và có thể gọi ra đường path này bằng cách `$article->path()`, chúng ta có thể áp dụng trong controller như sau:
```php:app/Http/Controllers/ArticlesController.php
    ...
    public function update(Article $article)
    {
        $article->update($this->validateArticle());
        return redirect($article->path());
    }
    ...
```
Tương tự áp dụng trong view với cú pháp tương tự. Đừng quên đặt trong `{{ }}` nhé!
> Phần này xin được tạm kết tại đây! 
> Nguồn tham khảo: https://laracasts.com/series/laravel-6-from-scratch/