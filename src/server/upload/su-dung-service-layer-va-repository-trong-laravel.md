## Giới thiệu
`Repository` thường là nơi các bạn viết các câu truy vấn database. Trong một ứng dụng, ta thường phải xử lý dữ liệu trước khi lưu vào database hoặc trước khi trả về. Thông thường ta viết luôn các đoạn xử lý đó ở trong `controller` dẫn đến tình trạng controller bị phình to ra và rất khó đọc nếu ta có quá nhiều đoạn xử lý logic đó. Ta có một giải pháp đó là xử dụng `Service Layer`.
>  "Service Layer" nằm ở giữa phần UI và phần backend lưu dữ liệu. Nó phụ trách việc biến đổi và thông dịch dữ liệu giữa 2 tầng với nhau

về cơ bản thì, Service Layer nằm ở giữa tầng trình diễn và tầng dữ liệu. Vậy nên, đây là nơi bạn viết logic của ứng dụng. Trong bài này, ứng dụng của chúng ta sẽ có 5 tầng:
```markdown
UI > Controller > Service > Repository > Model/Database
```

### Bắt đầu
Chúng ta sẽ cùng nhau xây dựng một ứng dụng CRUD `post` sử dụng  cả Service Layer và Repository. <br>
Chúng ta có 2 model là `Post` và `Tag` được định nghĩa như sau <br>
**Post Model** <br>
định nghĩa các trường có thể fillable
```php
<?php

namespace App;

use App\Tag;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $filable = [
        'title',
        'content',
    ];

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
}

```

**Tag Model**
```php
<?php

namespace App;

use App\Post;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $filable = [
        'name',
    ];

    public function posts()
    {
        return $this->belongsToMany(Post::class);
    }
}

```

**PostRepositoty**
```php
<?php

namespace App\Repositories;

use App\Post;

class PostRepository
{

    protected $post;

    public function __construct(Post $post)
    {
        $this->post = $post;
    }
    public function create($attributes)
    {
        return $this->post->create($attributes);
    }
}
```
**TagRepository**
```php
<?php

namespace App\Repositories;

use App\Tag;

class TagRepository
{

    protected $tag;

    public function __construct(Tag $tag)
    {
        $this->tag = $tag;
    }

    public function insert(array $values)
    {
        return $this->tag->insert($values);
    }

    public function findByName(array $names)
    {
        return $this->tag->whereIn('name', $names)->get();
    }
}

```

**PostService** <br>
Giả sử, khi tạo 1 post mới ta sẽ cho phép người dùng nhập tag cho post, dữ liệu truyền sang serve là biến `names` có dạng là `array`. Chúng ta sẽ phải kiểm tra xem tag đã có trong csdl chưa và chỉ lưu vào những tag mới.
```php
<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Repositories\TagRepository;
use App\Repositories\PostRepository;

class PostService
{
    public function __construct(PostRepository $postRepository, TagRepository $tagRepository)
    {
        $this->postRepository = $postRepository;
        $this->tagRepository = $tagRepository;
    }

    public function create(Request $request)
    {
        $attributes = $request->except('names');
        $names = $request->names;
        $count = count($names);
        $tags = $this->tagRepository->findByName($names); // lấy các tag dựa vào name
        $duplicateNames = [];
        for ($i = 0; $i < $count; $i++) { // lấy các tag đã tồn tại trong csdl
            foreach ($tags as $tag) {
                if ($names[$i] === $tag->name) {
                    array_push($duplicateNames, $names[$i]);
                }
            }
        }
        $newNames = array_diff($names, $duplicateNames); // loại bỏ các tag đã tồn tại

        $this->tagRepository->insert($newNames); // lưu các tag mới vào csdl

        $post = $this->postRepository->create($attributes); // lưu post
        $tagIds = $this->tagRepository->findByName($names)->pluck('ids')->toArray();
        $post->sync($tagIds); // cập nhật tag cho post

        return $post;
    }
}

```

**PostController** <br>
khi đã đẩy phần xử lý logic ở trong `PostService` thì `controller` của bạn sẽ cực kì thon gọn.
```php
<?php

namespace App\Http\Controllers;

use App\Services\PostService;
use App\Http\Requests\PostRequest;

class PostController
{
    protected $postservice;

    public function __construct(PostService $postservice)
    {
        $this->postService = $postService;
    }

    public function create(PostRequest $request)
    {

        $this->postService->create($request);

        return back()->with(['status' => 'Post created successfully']);
    }
}

```

### Tài liệu tham khảo
[https://m.dotdev.co/design-pattern-service-layer-with-laravel-5-740ff0a7b65f](https://m.dotdev.co/design-pattern-service-layer-with-laravel-5-740ff0a7b65f)
[https://medium.com/@smayzes/how-do-you-work-in-laravel-5a763fe5c5a0](https://medium.com/@smayzes/how-do-you-work-in-laravel-5a763fe5c5a0)