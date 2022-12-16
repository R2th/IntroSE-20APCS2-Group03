# 1. Giới thiệu
Nếu bạn đang và đã sử dụng Laravel cho một dự án quy mô vừa và lớn, bạn có thể đã gặp phải tình huống bạn muốn thực hiện một số hành động trong mô hình Eloquent bạn đang xử lý. Laravel Eloquent cung cấp một cách thuận tiện để thêm hành động của riêng bạn trong khi mô hình đang hoàn thành hoặc đã hoàn thành một số hành động.

Giả sử bạn có 1 chuỗi các hành động diễn ra lần lượt và phụ thuộc vào nhau ví dụ như: khi bạn xóa 1 bài post thì bạn đồng thời muốn xóa tất cả các comment của nó, hay khi đăng ký thành công một account sẽ tự động gửi mail đến cho người đăng ký nè,... Mặc dù bạn có thể viết toàn bộ logic code đó trong Controller. Nhưng hôm nay mình xin giới thiệu với các bạn về **Observer Events** . Trước tiên chúng ta sẽ đi tìm hiểu qua về  Eloquent Model Events nhé! :D
# 2. Laravel Model Events
Eloquent đã cung cấp các sự kiện để bạn có thể hook vào một số thời điểm trong một vòng đời của nó:
* **retrieved** : sau khi một bản ghi đã được lấy từ database.
* **creating** : trước khi một bản ghi đã được tạo.
* **created** : sau khi một bản ghi đã được tạo.
* **updating** : trước khi một bản ghi được cập nhật.
* **updated** : sau khi một bản ghi đã được cập nhật.
* **saving** : trước khi một bản ghi được lưu (được tạo hoặc cập nhật).
* **saved** : sau khi bản ghi đã được lưu (được tạo hoặc cập nhật).
* **deleting** : trước khi một bản ghi bị xóa hoặc xóa mềm.
* **deleted** : sau khi một bản ghi đã bị xóa hoặc xóa mềm.
* **restoring** : trước khi bản ghi bị xóa mềm sẽ được khôi phục.
* **restored** : sau khi bản ghi bị xóa mềm đã được khôi phục.
# 3. Laravel Model Observers
Như ví dụ ở trên, giả sự bạn muốn xóa 1 bài post đồng thời xóa luôn tất cả các comment của bài post đó. Mặc dù chúng ta có thể xử lý chung tại chính trong PostController, tuy nhiên như vậy nhìn code khá là lộn xộn nhỉ? Rất may vì Laravel đã cung cấp cho chúng ta Observer Events, nó có thể hook vào các thời điểm trong một vòng đời của post.
## 3.2 Create observer
Bạn có thể dễ dàng create observer bằng cách run command:
```
php artisan make:observer NameObserver --model=NameModel
```
Trong ví dụ này mình sẽ tạo 1 PostObserver nhé
```
php artisan make:observer PostObserver --model=Post
```
File PostObserver.php sẽ đc tạo ra ở thư mục app/Observers và sẽ có cấu trúc như sau nạ:
```
namespace App\Observers;

use App\Post;

class PostObserver
{
    /**
     * Handle the post "created" event.
     *
     * @param  \App\Post  $post
     * @return void
     */
    public function created(Post $post)
    {
        //
    }

    /**
     * Handle the post "updated" event.
     *
     * @param  \App\Post  $post
     * @return void
     */
    public function updated(Post $post)
    {
        //
    }

    /**
     * Handle the post "deleted" event.
     *
     * @param  \App\Post  $post
     * @return void
     */
    public function deleted(Post $post)
    {
        //
    }

    /**
     * Handle the post "restored" event.
     *
     * @param  \App\Post  $post
     * @return void
     */
    public function restored(Post $post)
    {
        //
    }

    /**
     * Handle the post "force deleted" event.
     *
     * @param  \App\Post  $post
     * @return void
     */
    public function forceDeleted(Post $post)
    {
        //
    }
}
```
## 3.2 Register observer
Để có sử dụng ta phải đăng ký nó trong function boot() của **AppServiceProvider** 
```
namespace App\Providers;

use App\Post;
use App\Observers\PostObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Post::observe(PostObserver::class);
    }
}
```
## 3.3 Example
Mình sẽ lấy VD khi mình xóa 1 post thì mình sẽ  xóa tất cả các comments của post đó nhé, ở đây mình sẽ sử dụng function deleting để hook sự kiện đó.
Ở đây mình dùng HasMany relationship 
```
namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
```
Bây giờ thì mình có thể thêm deleting hook ở trong PostObserver để xóa tất cả các comment của bài viết đó.
```
namespace App\Observers;

use App\Post;

class PostObserver
{
    /**
     * Handle the post "deleting" event.
     *
     * @param  \App\Post  $post
     * @return void
     */
    public function deleting(Post $post)
    {
        $post->comments()->delete();
    }
}
```
Vậy là bạn đã xóa thành công tất cả các comments r đó :D

Để hiểu rõ hơn mn tham khảo thêm ở [đây](https://laravel.com/docs/6.x/eloquent#observers) nhé hihi