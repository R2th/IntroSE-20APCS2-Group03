# Giới thiệu  Laravel Model Events
Nếu bạn đã sử dụng Laravel cho các dự án quy mô vừa và lớn, bạn có thể đã gặp phải tình huống đó là bạn muốn thực hiện một số hành động trong lúc Eloquent đang xử lý.  Bạn có thể thực hiện thủ công bằng cách nào đó nhưng bạn không biết được rằng  Laravel Eloquent cung cấp một cách đơn giản để thêm vào trong model trong lúc model đang hoàn thành hoặc đã hoàn thành một số hành động :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye:
Ví dụ như bạn có một model là `Post` và bạn muốn nó tự động add thêm slug từ title trong lúc bạn đang thực hiện thao tác là thêm vào 1 post mới. Bạn có thể thực hiện bằng cách thiết lập cho model của bạn khi có post mới được thêm mới với sự kiện `saving` như thế này :+1::+1::
```
namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = 'posts';

    protected $fillable = ['title', 'slug', 'content'];

    protected static function boot()
    {
        parent::boot();
        static::saving(function ($model) {
            $model->slug = str_slug($model->title);
        });
    }
}
```
Eloquent cung cấp đầy đủ các sự kiện khi chúng ta thao tác với model như sau:
* retrieved : sau khi một bản ghi đã được lấy từ database.
* creating : trước khi một bản ghi đã được tạo.
* created : sau khi một bản ghi đã được tạo.
* updating : trước khi một bản ghi được cập nhật.
* updated : sau khi một bản ghi đã được cập nhật.
* saving : trước khi một bản ghi được lưu (được tạo hoặc cập nhật).
* saved : sau khi bản ghi đã được lưu (được tạo hoặc cập nhật).
* deleting : trước khi một bản ghi bị xóa hoặc xóa mềm.
* deleted : sau khi một bản ghi đã bị xóa hoặc xóa mềm.
* restoring : trước khi bản ghi bị xóa mềm sẽ được khôi phục.
* restored : sau khi bản ghi bị xóa mềm đã được khôi phục.

# Laravel Model Observers
Bạn hãy thử tưởng tượng rằng ứng dụng của bạn phát triển và bự lên từng ngày bạn sẽ rất mệt mỏi hoặc phải xử lý rất rất nhiều sau mỗi lần bạn thao tác với model :tired_face::tired_face::tired_face:, nhưng nếu bạn sử dụng Observer thì mọi chuyện sẽ rất đơn giản :100::100:.
Sử dụng model observers, bạn có thể nhóm tất cả cả events của bạn vào trong 1 cái class. Tất cả các tên methods trong observer class sẽ tự động `reflect` trên mỗi sự kiện mà mình đã list ra ở trên. Bạn có thể tạo một class model observer bằng cách dùng `php artisan` như thế này:
```
php artisan make:observer PostObserver --model=Post
```
Lệnh trên sẽ tạo ra một class mới trong thư mục project như thế này `app/Observers` :
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
Bây giờ bạn cần phải add cái class mới tạo ở trên vào file `AppServiceProvider` trong phương thức `boot()` để nói cho model `Post`là cứ mỗi lần có bất kì event nào (như mình đã list ra bên trên) tác động lên model `Post` thì hãy thực hiện các method đã được define ra trong observe là `PostObserver` như thế này :rofl::rofl::
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
Rồi như  đã nói ở trên chúng ta muốn add thêm cái slug mỗi khi chúng ta tạo post mới, chúng ta sẽ thực hiện với method on `saving` như sau:
```
namespace App\Observers;

use App\Post;

class PostObserver
{
    /**
     * Handle the post "saving" event.
     *
     * @param  \App\Post  $post
     * @return void
     */
    public function saving(Post $post)
    {
        $post->slug = str_slug($post->title);
    }
}
```
Bây giờ cứ mỗi lần mà bạn tạo mới một post thì nó sẽ tự động lấy cái title chuyển về slug và add nó vào cái attribute `slug` rất hay đúng không nào :blush::blush::blush:

# Kết luận 
Trên đây là bài hướng dẫn về cách sử dụng observer với model, trên thực tế thì khi chúng ta code dự án lớn thì khi sẻ dụng observer thì thực sự đây là một cách rất tối ưu và tiết kiệm thời gian rất tốt, chúc các bạn thành công :ok_hand::ok_hand: 
# Tài liệu Tham khảo
* https://laravel.com/docs/5.8/eloquent
* https://medium.com/@secmuhammed/laravel-observers-e68c69a8c8c6