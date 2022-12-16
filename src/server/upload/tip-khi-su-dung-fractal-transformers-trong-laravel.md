### 1. Mở đầu
<hr>

Chắc hẳn đối với các bạn lập trình back-end thì không còn xa lạ gì với việc phát triển một hệ thống API với ouput của nó là các chuỗi JSON cho bên client sử dụng. Và chắc hẳn các bạn cũng khôn còn lạ với việc trước khi chúng ta output dữ liệu thì sẽ cần đi qua một bước xử lý là biến đổi dử liệu thu được từ database về một dạng nhất định rồi mới trả ra. Với các bạn làm việc với `Laravel` thì chắc không còn lạ gì với việc sử dụng package [spatie/laravel-fractal](https://github.com/spatie/laravel-fractal) để thực hiện công việc biến đổi này. Bài viết này của mình muốn chia sẻ với các bạn một số tip mà mình đã làm cho việc biến đổi dữ liệu với package nói trên.

### 2. Custom Transformer Ouput
<hr>

Giả sử ở đây chúng ta có một API với nhiệm vụ trả về danh sách các bài viết có trong blog của chúng ta và đi kèm với nó là user đã viết bài đó. Với giả định trên thì ta sẽ có 2 model là:
```php
class User extends Authenticatable
{
    protected $fillable = [
        'id',
        'username',
        'email',
        'avatar',
        'role',
    ];
    ...
}
```
và
```php
class Post extends Model
{
    protected $fillable = [
        'id',
        'title',
        'slug',
        'content',
    ];
    ...
}
```
Và tất nhiên nếu bạn dùng `spatie/laravel-fractal` thì ta cũng sẽ có 2 class tương ứng để biến đổi 2 model này là:
```php
class UserTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(User $user)
    {
        return [
            'id' => $user->id
            'username' => $user->username,
            'email' => $user->email,
            'avatar' => $user->avatar,
        ];
    }
}
```
Và
```php
class PostTransformer extends TransformerAbstract
{
    protected $defaultIncludes = [
        'owner',
    ];
    
    public function transform(Post $post)
    {
        return [
            'id' => $post->id,
            'title' => $post->title,
            'slug' => $post->slug,
            'content' => $post->content,
            'createdAt' => $post->publish_at,
        ];
    }

    public function includeOwner(Post $post)
    {
        return $this->item($post->owner, new UserTransformer);
    }
}
```
Như bạn thấy ở trên mặc định khi lấy một bài post ra thì mình sẽ đính kèm cả user đã viết bài đó hay ở đây mình đang đặt là `owner`. Và trong code ta sẽ xử lý như sau:
```php
public function index()
{
    $posts = Post::with(['owner'])->paginate();
    
    return fractal($posts, new PostTramsformer);
}
```
Và đây là kết quả đầu ra:
```json
{
    "data": [
        {
            "id": "1",
            "title": "Demo post title 1",
            "slug": "demo-post-title-1",
            "content": "Demo post content 1",
            "createdAt": "2019-07-26 22:15:00",
            "owner": {
                "data": {
                    "id": 1,
                    "username": "foo",
                    "email": "foo@gmail.com",
                    "avatar": "https://png.pngtree.com/svg/20161212/f93e57629c.svg"
                }
            }
        },
        {
            "id": "2",
            "title": "Demo post title 2",
            "slug": "demo-post-title-2",
            "content": "Demo post content 2",
            "createdAt": "2019-07-26 22:15:00",
            "owner": {
                "data": {
                    "id": 2,
                    "username": "bar",
                    "email": "bar@gmail.com",
                    "avatar": "https://png.pngtree.com/svg/20161212/f93e57629c.svg"
                }
            }
        },
  
    ],
    "meta": {
        "pagination": {
            "total": 2,
            "count": 2,
            "per_page": 15,
            "current_page": 1,
            "total_pages": 1,
            "links": {}
        }
    }
}
```
Với kết quả như trên thì thì bên client ta hoàn toàn có thể sử dụng được bình thường tuy nhiên nếu muốn hiển thị `username` của `owner` của bài viết thì bên client, ở đây là `javascript` thì ta sẽ phải viết như sau:
```js
const username = post.owner.data.username
```
Không biết các bạn thấy sao nhưng với mình thì mình không thoải mái lắm với việc toàn bộ dữ liệu của chúng ta đều nằm trong một cái key là `data` (mặc dù không phải là một mảng) như ví dụ trên. Phải chăng nếu ta có thể viết thành:
```js
const username = post.owner.username
```
Thì có lẽ sẽ ngắn gọn và hay hơn là tất cả cứ phải thông qua `data` rồi mới đến nội dung chính. Tất nhiên để viết được như trên thì output của API của chúng ta phải có dạng:
```json
{
            "id": "1",
            "title": "Demo post title 1",
            "slug": "demo-post-title-1",
            "content": "Demo post content 1",
            "createdAt": "2019-07-26 22:15:00",
            "owner": {
                "id": 1,
                "username": "foo",
                "email": "foo@gmail.com",
                "avatar": "https://png.pngtree.com/svg/20161212/f93e57629c.svg"
            }
        },
 }
```
Hay đúng hơn là bỏ từ khóa 'data' đối với kết quả trả về không phải là một mảng. Để làm được điều này thi ta chỉ cần custom lại phần `default_serializer` nằm trong file `config/fractal.php`.
<br>

*Lưu ý: bạn cần chạy lệnh `php artisan vendor:publish --provider="Spatie\Fractal\FractalServiceProvider"` để có file này*

Mặc định thì dữ liệu của chúng ta sẽ được biến đổi có từ khóa `data` là do nó sẽ được đi qua class này:
```php
// vendor/league/fractal/src/Serializer/DataArraySerializer.php
class DataArraySerializer extends ArraySerializer
{
    public function collection($resourceKey, array $data)
    {
        return ['data' => $data];
    }

    public function item($resourceKey, array $data)
    {
        return ['data' => $data];
    }

    public function null()
    {
        return ['data' => []];
    }
}
```
Như bạn thấy ở đây trong transformer khi ta sử dụng:
```php
public function includeOwner(Post $post)
{
    return $this->item($post->owner, new UserTransformer);
}
```
Thì hàm `$this->item()` ở đây trong class `DataArraySerializer` sẽ mặc định lồng nó trong một cái key là `data`. Chính vì thế việc ta cần làm là tạo ra một class mới tương tự và sửa lại hàm `item` như sau:
```php
// app/Blog/Serializer
<?php

namespace App\Blog\Serializer;

use League\Fractal\Serializer\ArraySerializer;

class CustomSerializer extends ArraySerializer
{
    public function collection($resourceKey, array $data)
    {
        return ['data' => $data];
    }

    public function item($resourceKey, array $data)
    {
        return $data;
    }

    public function null()
    {
        return ['data' => []];
    }
}
```
Tiếp đó trong file `config/fractal.php` ta sửa lại như sau:
```php
<?php

return [
    /*
     * The default serializer to be used when performing a transformation. It
     * may be left empty to use Fractal's default one. This can either be a
     * string or a League\Fractal\Serializer\SerializerAbstract subclass.
     */
    'default_serializer' => \App\Blog\Serializer\CustomSerializer::class,
    ...
```
Với việc thay đổi như trên thì giờ đây mỗi lần ta dùng `fractal` nó sẽ sử dụng class `CustomSerializer` mà chúng ta tạo thay vì dùng `DataArraySerializer` như mặc định. Sau đó chạy lại API thì chúng ta sẽ thu được kết quả như mong muốn:
```json
{
    "data": [
        {
            "id": "1",
            "title": "Demo post title 1",
            "slug": "demo-post-title-1",
            "content": "Demo post content 1",
            "createdAt": "2019-07-26 22:15:00",
            "owner": {
                "id": 1,
                "username": "foo",
                "email": "foo@gmail.com",
                "avatar": "https://png.pngtree.com/svg/20161212/f93e57629c.svg"
            }
        },
        {
            "id": "2",
            "title": "Demo post title 2",
            "slug": "demo-post-title-2",
            "content": "Demo post content 2",
            "createdAt": "2019-07-26 22:15:00",
            "owner": {
                "id": 2,
                "username": "bar",
                "email": "bar@gmail.com",
                "avatar": "https://png.pngtree.com/svg/20161212/f93e57629c.svg"
            }
        },
  
    ],
    "meta": {
        "pagination": {
            "total": 2,
            "count": 2,
            "per_page": 15,
            "current_page": 1,
            "total_pages": 1,
            "links": {}
        }
    }
}
```

### 3. Default data
<hr>

Giả sử với mỗi bài viết của chúng ta sẽ có thêm một cái ảnh gọi là ảnh cover với model như sau:
```php
class Image extends Model
{
    protected $fillable = [
        'uuid',
        'full_name',
    ];

    public function getPath()
    {
        return env('APP_URL') . '/storage/images/' . $this->full_name;
    }
}
```
Và tất nhiên một cái transformer tương ứng:
```php
class ImageTransformer extends TransformerAbstract
{
    public function transform(Image $image)
    {
        return [
            'url' => $image->getPath(),
        ];
    }
```
Bên `PostTransformer` ta sẽ thêm vào như sau:
```php
class PostTransformer extends TransformerAbstract
{
    protected $defaultIncludes = [
        'owner',
        'coverImage',
    ];
    
    public function transform(Post $post)
    {
        return [
            'id' => $post->id,
            'title' => $post->title,
            'slug' => $post->slug,
            'content' => $post->content,
            'createdAt' => $post->publish_at,
        ];
    }

    public function includeOwner(Post $post)
    {
        return $this->item($post->owner, new UserTransformer);
    }
    
    public function includeCoverImage(Post $post)
    {
        return $this->item($post->coverImage, new ImageTransformer);
    }
}
```
Và đây sẽ là kết quả mới cho mỗi bài viết từ API của chúng ta:
```json
 {
    "id": "1",
    "title": "Demo post title 1",
    "slug": "demo-post-title-1",
    "content": "Demo post content 1",
    "createdAt": "2019-07-26 22:15:00",
    "owner": {
        "id": 1,
        "username": "foo",
        "email": "foo@gmail.com",
        "avatar": "https://png.pngtree.com/svg/20161212/f93e57629c.svg"
    },
    "coverImage": {
        "url": "https://atiinc.org/wp-content/uploads/2017/01/cover-default.jpg"
    }
}
```
Tuy nhiên trong trường hợp bài viết cũ của bạn hoặc bạn quên chưa đặt `coverImage` cho bài viết hoặc bất cứ trường hợp nào dẫn đến `$post->coverImage == null` thì đầu ra API của bạn sẽ cho kết quả như sau:
```json
 {
    "id": "1",
    "title": "Demo post title 1",
    "slug": "demo-post-title-1",
    "content": "Demo post content 1",
    "createdAt": "2019-07-26 22:15:00",
    "owner": {
        "id": 1,
        "username": "foo",
        "email": "foo@gmail.com",
        "avatar": "https://png.pngtree.com/svg/20161212/f93e57629c.svg"
    },
    "coverImage": null
},
```
Ở bên client nếu bạn đang sử dụng ảnh cover dạng:
```js
const coverImage = post.coverImage.url
```
Thì rất có thể nó sẽ gặp lỗi `Uncaught TypeError: Cannot read property 'url' of null` dẫn đến ứng dụng của chúng ta có thể bị crash. Chính vì thế ở đây ta có thể sửa lại phần `includeCoverImage()` thành như sau:
```php
use League\Fractal\Resource\Primitive;

...

public function includeCoverImage(Post $post)
{
    return $post->coverImage
        ? $this->item($post->coverImage, new ImageTransformer)
        : new Primitive([
            'url' => 'some-default-image-url',
        ])
}
```
Với cách viết trên thì trong trường hợp `$post->coverImage == null` thì nó sẽ chạy trả về phần `new Primitive()` với dữ liệu mặc định mà chúng ta cung cấp. Kết quả cụ thể sẽ như sau:
```json
 {
    "id": "1",
    "title": "Demo post title 1",
    "slug": "demo-post-title-1",
    "content": "Demo post content 1",
    "createdAt": "2019-07-26 22:15:00",
    "owner": {
        "id": 1,
        "username": "foo",
        "email": "foo@gmail.com",
        "avatar": "https://png.pngtree.com/svg/20161212/f93e57629c.svg"
    },
    "coverImage": {
        "url": "some-default-image-url"
    }
}
```
Đồng nghĩa với việc client sẽ không gặp lỗi như mình nói ở trên nữa.  Ở đây các bạn có thể thấy mình dùng một class là `Primitive` để bọc ngoài dữ liệu mà ta mong muốn là do ở đây bên trong thư viện này thì các hàm `include` của chúng ta sẽ phải trả về kiểu dữ liệu có dạng `League\Fractal\Resource\ResourceInterface` nên nếu ta truyền vào `Array` hay bất cứ gì khác sẽ dẫn tới lỗi:
```
Exception: Invalid return value from League\Fractal\TransformerAbstract::includeCoverImage(). Expected League\Fractal\Resource\ResourceInterface, received array`
```
Vì thế bất cứ dữ liệu gì bạn muốn return được trong hàm `include` thì phải bọc vào class `Primitive` mà thư viện cung cấp cho chúng ta.

### 4. Kết bài
<hr>

Bài viết của mình đến đây là kết thúc. Nếu bạn có bất cứ thắc mắc gì hãy comment ở dưới mình sẽ trả lời. Cảm ơn các bạn đã đọc bài :D