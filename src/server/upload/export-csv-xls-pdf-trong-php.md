# Mở đầu
&nbsp;&nbsp;&nbsp;&nbsp;Hiện nay việc code và xuất dữ liệu đã khá phổ biến, các dạng file PDF, CSV, XLS và mỗi lần chúng ta có yêu cầu xuất file thì phải tìm khắp nơi các thư viện, hoặc code tay..Hôm nay mình xin giới thiệu và cùng mọi người tìm hiểu một thư viện có thể dùng xuất nhiều dạng file mình mong muốn..cụ thể mình dùng cho framework laravel php.
# Nội dung
### 1. Cài đặt
&nbsp;&nbsp;&nbsp;&nbsp;Bạn di chuyển vào projiect và dùng composer để cài đặt thư viện 
> composer require maatwebsite/excel

&nbsp;&nbsp;&nbsp;&nbsp;Khi cài xong thì bước tiếp theo vào `ServiceProvider` và thêm vào file `config/app.php`
```php
'providers' => [
    /*
     * Package Service Providers...
     */
    Maatwebsite\Excel\ExcelServiceProvider::class,
]

'aliases' => [
    ...
    'Excel' => Maatwebsite\Excel\Facades\Excel::class,
]
```

&nbsp;&nbsp;&nbsp;&nbsp;Rồi sau đó từ terminal chúng ta publish config vừa rồi
```php
php artisan vendor:publish --provider="Maatwebsite\Excel\ExcelServiceProvider"
```

&nbsp;&nbsp;&nbsp;&nbsp;Sau khi publish thành công nó sẽ tạo ra một file config excel trong `config/excel.php` và đến đây mình đã cài đặt xong..giờ sẽ dùng nó nhé
### 2. Một ví dụ đơn giản
&nbsp;&nbsp;&nbsp;&nbsp;Đầu tiên ta tạo ra một class export
```php 
php artisan make:export PostsExport --model=Post
```
&nbsp;&nbsp;&nbsp;&nbsp;Bạn có thể thấy file này nằm ở  `app/Exports` và nơi đây chính là nơi bạn tùy chỉnh file excel hoặc csv ... của mình

```php
<?php

namespace App\Exports;

use App\Post;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class PostsExport implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Post::all();
    }

    public function headings(): array
    {
        return [
            '#',
            'title',
            'body',
            'created_at',
            'updated_at',
        ];
    }
}
```

&nbsp;&nbsp;&nbsp;&nbsp;và Controller
```php
<?php

namespace App\Http\Controllers;

use App\Exports\PostsExport;
use App\Post;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class PostController extends Controller
{
    public function exportCSV()
    {
       return Excel::download(new PostsExport, 'post.csv');
    }
}
```
&nbsp;&nbsp;&nbsp;&nbsp;Bạn cũng có thể lưu lại trên server
```php
return Excel::store(new PostsExport, 'post.csv');
```
> Lưu ý: đối với lưu thì tên file bao gồm cả đường dẫn và nó đc lưu tại `storage/app` vì vậy bạn muốn lưu vào đâu thì hãy thêm `path` chuẩn nhé.

&nbsp;&nbsp;&nbsp;&nbsp;Kết quả khi mình xuất file CSV
![](https://images.viblo.asia/5dcc4923-7130-4d12-9cb1-c253b37c6771.png)

trên là mình thực hiện lưu hoặc xuất thẳng file CSV ra một cách đơn giản..Giờ mình đi nghịch xem nó thế nào một chút nhé.

###  3. Một chút custom

&nbsp;&nbsp;&nbsp;&nbsp;Giờ ta muốn truyền tham số và xuất một file theo số truyền vào nha..ở đây mình truyền và xuất ra file csv có chứa `id` mình truyền vào thôi...mà mình k thích viết logic trong file `PostsExport.php` cho lắm nên mình sẽ tạo và viết trong file `PostService` nha.

`app/Exports/PostsExport.php`
```php
<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class PostsExport implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    protected $id;
    public function __construct($id)
    {
        $this->id = $id;
    }

    public function collection()
    {
        $postService = app()->make('App\PostService');
        $post = $postService->getPostById($this->id);
        return $post;
    }

    public function headings(): array
    {
        return [
            '#',
            'title',
            'body',
            'created_at',
            'updated_at',
        ];
    }
}
```
`PostController`
```php
<?php

namespace App\Http\Controllers;

use App\Exports\PostsExport;
use App\Post;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class PostController extends Controller
{
    public function exportCSV(Request $request)
    {
        if ($id = $request->all('id')) {
            return Excel::download(new PostsExport($id), 'post.csv');
        }

    }
}

```
`PostService`
```php
<?php
namespace App;

class PostService
{
    public function getPostById($id)
    {
        return Post::find($id);
    }
}
```

và kết quả chúng ta nhận được này 

![](https://images.viblo.asia/77ec34fa-9adb-4bf7-baba-f765db694462.png)

&nbsp;&nbsp;&nbsp;&nbsp;Trên đây là custom một chút..mình có thể custom nhiều hơn.
&nbsp;&nbsp;&nbsp;&nbsp;Một ví dụ nữa đó là mình thay vào việc export dữ liệu từ collection thì mình cũng có thế export từ mảng..đơn giản là ta cho mảng đó vào `collect()` của thư viện là được.
```php
 public function collection()
    {
        $postService = app()->make('App\PostService');
        $post = $postService->getPostById($this->id);
        //post is an Array
        return collect($post);
    }
```

### 3. Kết luận

&nbsp;&nbsp;&nbsp;&nbsp;Qua bài viết hi vọng giúp các bạn yêu thích hơn việc code..vì rất nhiều điều thú vị..Qua bài trên giúp bạn có hướng đi khi gặp phải task liên quan tới phần export này.

### 4. Tài liệu tham khảo
[document export](https://docs.laravel-excel.com/3.1/getting-started/)