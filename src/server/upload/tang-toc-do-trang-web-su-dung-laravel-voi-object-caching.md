# Giới thiệu
Xin chào các bạn! Đối với một hệ thống có dữ liệu khá lớn thì việc thực hiện một câu truy vấn vào cơ sở dữ liệu mất khá nhiều thời gian. Do đó quá trình tải trang web sẽ rất chậm.
Vậy làm sao để tăng tốc độ đó lên.

Một số biện pháp bạn có thể làm lúc này là:

- Tối ưu hóa cơ sở dữ liệu, tối ưu hóa truy vấn
- Sử dụng bộ nhớ truy xuất nhanh hơn để lưu tạm dữ liệu trả về của câu truy vấn. Khi truy vấn sau sẽ lấy trong bộ nhớ cache. (Database caching)
- Nâng cấp máy chủ cơ sở dữ liệu: nâng cấp phần cứng của máy chủ, tăng cpu, tăng ram
- Mở rộng nhiều máy chủ cơ sở dữ liệu

Trong đó cách đơn giản mà lại khá hiệu quả là database caching. Kết quả các câu truy vấn sau khi thực hiện sẽ được lưu tạm vào bộ nhớ truy cập nhanh hơn (cache). Các yêu cầu khác khi xử lý nếu truy vấn đến cơ sở dữ liệu là truy vấn cũ có trong cache thì hệ thống sẽ lấy trong cache mà không cần phải thực hiện truy vấn đến cơ sở dữ liệu nữa. Do đó yêu cầu được xử lý nhanh hơn. Trong laravel ta có thể cấu hình cache với nhiều hệ thống lưu trữ dữ liệu khác nhau như `Database`, `Memcached`, `Redis`. Và việc thao tác với chúng rất dễ dàng.

Bài viết hôm nay mình xin giới thiệu đến các bạn cách sử dụng redis cache để lưu tạm kết quả truy vấn của database.

Trong bài mình sẽ sử dụng:

- Laravel 5.7
- Bộ nhớ cache là Redis
- Cơ sở dữ liệu Mysql 5.7.24

Server sử dụng là laptop của mình:

- Dell vostro 2420 core i 5, RAM 8Gb, SSD 250Gb
- Hệ điều hành Ubuntu 16.04

# Cài đặt và cấu hình

## Cài đặt laravel
Bạn tải phiên bản [laravel 5.7](https://github.com/laravel/laravel) mới nhất và cài đặt bằng cách sử dụng lệnh ```composer install```. Cách cài đặt chi tiết bạn có thể xem trên trang [Laravel Document](https://laravel.com/docs/5.7).

## Cài đặt redis
Để cài đặt redis bạn có thể thực hiện theo hướng dẫn trên trang [redis.io](https://redis.io/topics/quickstart) hoặc hướng dẫn cài đặt và cấu hình trên trang [digitalocean.com](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-redis).

## Cài đặt predis/predis
Laravel sử dụng gói predis/predis để thao tác với redis nên ta phải cài đặt bằng composer như sau:

```composer require predis/predis```

## Cấu hình laravel cache
Để sử dụng cache bằng redis ta sửa file cấu hình `.env`. Thay đổi giá trị `CACHE_DRIVER` thành `redis`. Bạn có thể thay đổi luôn giá trị `SESSION_DRIVER` thành `redis` nếu muốn.

```
CACHE_DRIVER=redis
SESSION_DRIVER=redis
```

Tiếp đó ta cần cấu hình Redis (nếu cần thiết). Ở đây mình cài redis và laravel vào cùng 1 máy nên sẽ để cấu hình mặc định

```
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

# Chuẩn bị
Laravel đã hỗ trợ sẵn các thao tác lưu cache, xóa cache sử dụng redis. Ta chỉ cần cài `predis/predis` cấu hình một số biến môi trường như trên là đã có thể sử dụng được redis cache cho project của mình.

Để có được một lượng dữ liệu vừa đủ để test mình sử dụng `factory` và `seeder` bạn có thể tìm và đọc trên trang [document của laravel](https://laravel.com/docs/5.7).

Cơ sở dữ liệu của mình gồm 2 bảng chính:

- Bảng users: Lưu thông tin người dùng (id, name, email, password)
- Bảng posts: Lưu thông tin bài viết (id, user_id, title, content)

Mình đã tạo sẵn dữ liệu cho bảng posts với 444697 dòng, dung lượng của bảng là 590MiB

![](https://images.viblo.asia/4ce094c4-4540-4441-806a-b0a34348b419.png)

# Lưu cache dữ liệu truy vấn
Mình sẽ tạo trang chủ hiển thị tất cả các bài viết có phân trang.

**Controller**

```php
// app/Http/Controllers/HomeController.php

    public function index(Request $request)
    {
        $posts = Post::with('user')->orderBy('created_at', 'desc')->paginate();
        return view('home', ['posts' => $posts]);
    }
```

**View của trang chủ**

```html
<!-- resources/views/home.blade.php -->
@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        {{ $posts->render() }}

        @foreach ($posts as $post)
            <div class="col-md-8" style="margin-bottom: 10px">
                <div class="card">
                    <div class="card-header"><b>({{ $post->id }})</b> {{ $post->title }}</div>
                    <div class="card-body">
                        {{ $post->content }}
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</div>
@endsection
```

## Truy vấn bình thường không sử dụng cache 
Thời gian tải trang ở mấy trang đầu mất khoảng 800ms đến 1000ms, những trang cuối thì thời gian này tăng lên đến 3s.

![](https://images.viblo.asia/91cb2704-f140-49c1-a751-77cfabad8c08.gif)

Thời gian xử lý lâu nhất chính là truy vấn cơ sở dữ liệu. Nó chiếm đa số thời gian tải trang khoảng hơn 90%. Đây mới chỉ là một người dùng. Nếu nhiều người dùng hơn thì truy vấn sẽ lâu hơn và có thể bị lỗi trong quá trình thực hiện.

Bây giờ ta thử sử dụng cache để xem hiệu quả như thế nào.

## Sử dụng cache lưu kết quả truy vấn

Cách sử dụng cache trong laravel rất đơn giản, trong [Laravel Document](https://laravel.com/docs/5.7/cache) cũng nói khá chi tiết nên mình không nói lại nữa nhé.

Mình sẽ sử dụng hàm `Cache::remember($key, $time, $function)` để lưu kết quả truy vấn trả về. Hàm này có tác dụng lấy mục có khóa là `$key` trong bộ nhớ cache, nếu cache không tồn tại thì sẽ lấy giá trị trả về từ hàm `$function`. Thời gian lưu cache sẽ là `$time` phút.

Ở trang này mình tạo `$key` bằng cách mã hóa `md5` các thông tin như tên controller, tên hàm, mã số trang. 

```php
$key = md5(vsprintf('%s.%s.%s', [
    'HomeController',
    'index',
    $request->get('page', 1),
]));
```

Việc tạo key phải hết sức cẩn thận. Nếu hệ thống của bạn có phân biệt người dùng khi truy cập trang, giả sử như người dùng bình thường chỉ xem được những bài bình thường người dùng vip sẽ xem được thêm các bài viết vip thì bạn cho thêm id của người dùng đã đăng nhập vào $key hoặc quyền của người dùng đó. Tránh trường hợp người dùng bình thường truy cập những dữ liệu được lấy trong cache là của người dùng vip.

 Hàm `index` trong `HomeController` sẽ được viết lại như sau:

```php
// app/Http/Controllers/HomeController.php
    public function index(Request $request)
    {
        $key = md5(vsprintf('%s.%s.%s', [
            'HomeController',
            'index',
            $request->get('page', 1),
        ]));

        // Mình sẽ lưu dữ liệu vào bộ nhớ cache trong 1 phút
        $posts = Cache::remember($key, 1, function () {
            return Post::with('user')->orderBy('created_at', 'desc')->paginate();
        });

        return view('home', ['posts' => $posts]);
    }
```

Kết quả: với lần đầu truy cập trang thì trang được tải hơi lâu nhưng những lần sau thì tốc độ khá ấn tượng. Chỉ **20ms** đến **30ms**. Nhanh hơn rất nhiều lần so với ban đầu.

![](https://images.viblo.asia/d1b6f891-41ba-4d95-a70b-05c81ee95718.gif)

Bạn để ý thì các truy vấn vào cơ sở dữ liệu để lấy ra các bài viết (posts) cùng người viết bài đó sẽ không được thực hiện nếu cache vẫn còn tồn tại. Mình để thời gian lưu vào cache là 1 phút. Sau một phút thì truy vấn sẽ được thực hiện và dữ liệu trong cache sẽ được cập nhật. Tùy mục đích của bạn, bạn có thể tăng thời gian cache lên hoặc cho nó cache mãi mãi. Ví dụ như truy vấn lấy thông tin user đang đăng nhập (`select * from 'users' where 'id' = ? limit 1`) . Mỗi request câu truy vấn đó lại được thực hiện 1 lần. Bạn có thể cho nó lưu vào cache mãi mãi. Khi nào người dùng thay đổi thông tin thì xóa dữ liệu trong cache đi để cập nhật dữ liệu mới.

Như ở trên thì mỗi phương thức trong controller mình sẽ tạo một cache. Nhược điểm là các controller khác nhau nhưng cùng truy vấn 1 câu query vào cơ sở dữ liệu, như vậy sẽ phải lưu 2 đối tượng vào cache cùng dữ liệu. Đối tượng mình lưu vào cache ở đây là các `Model` hoặc các `collection` của các `Model`. Nó sẽ tốn nhiều bộ nhớ cache hơn là khi ta lưu một mảng hoặc một `std object`.

Vậy làm thế nào để lưu cache được hiệu quả hơn? Ta cùng tìm hiểu cách tạo cache với QueryBuilder nhé!

# Caching câu truy vấn dùng QueryBuilder
Như chúng ta đã biết `Eloquent` trong laravel sử dụng  `Eloquent builder` để thực hiện truy vấn. `Eloquent builder` lại sử dụng  `Query Builder`. Như vậy ta chỉ cần lưu cache với mỗi kết quả `select` của `QueryBuilder` là ta đã lưu cache được toàn bộ truy vấn vào cơ sở dữ liệu của mình.

## Tạo QueryBuilder với cache
Ta sẽ tạo một class `QueryBuilderWithCache` mới, mở rộng từ `Illuminate\Database\Query\Builder` và sử dụng cache cho mỗi truy vấn lấy dữ liệu sử dụng hàm `get()`. Class này mình sẽ lưu tại thư mục `app/Core`. Trong `QueryBuilderWithCache` sẽ có thêm thuộc tính `$cacheTime` dùng để lưu thời gian giữ cache. Mặc định biến này là `0` nghĩa là không lưu vào cache.

```php
// app/Core/QueryBuilderWithCache.php

namespace App\Core;

use Cache;
use Illuminate\Database\ConnectionInterface;
use Illuminate\Database\Query\Grammars\Grammar;
use Illuminate\Database\Query\Processors\Processor;
use Illuminate\Database\Query\Builder as QueryBuilder;

class QueryBuilderWithCache extends QueryBuilder
{
    protected $cacheTime;
    
    // Viết lại hàm __construct() để truyền thêm biến $cacheTime
    public function __construct(
        ConnectionInterface $connection,
        Grammar $grammar = null,
        Processor $processor = null,
        int $cacheTime = 0
    ) {
        $this->cacheTime = $cacheTime;
        parent::__construct($connection, $grammar, $processor);
    }
}
```

Phân tích hàm `get()` trong `Illuminate/Database/Query/Builder`.

```php
//vendor/laravel/framework/src/Illuminate/Database/Query/Builder.php

    public function get($columns = ['*'])
    {
        return collect($this->onceWithColumns($columns, function () {
            return $this->processor->processSelect($this, $this->runSelect());
        }));
    }
```

Trong hàm `get()` ta có thể thấy nó trả về một `collect()` với giá trị trả về của hàm `onceWithColumns($columns, $callback)`.  

Xem trong `onceWithColumns($columns, $callback)` có gì nào.

```php
//vendor/laravel/framework/src/Illuminate/Database/Query/Builder.php

    protected function onceWithColumns($columns, $callback)
    {
        $original = $this->columns;

        if (is_null($original)) {
            $this->columns = $columns;
        }

        $result = $callback();

        $this->columns = $original;

        return $result;
    }
```

Hàm `onceWithColumns($columns, $callback)` có nhiệm vụ là nó sẽ gán `$this->columns` bằng giá trị `$columns` truyền vào nếu `$this->columns` rỗng rồi thực hiện `$callback` xong sẽ trả lại giá trị `$this->columns` như ban đầu. Nó sẽ trả về giá trị sau khi thực hiện hàm `$callback`. Có nghĩa là giá trị trả về của `onceWithColumns($columns, $callback)` sẽ là gía trị trả về của cái `function ()` trong hàm `get()` kia. Tức là `$this->processor->processSelect($this, $this->runSelect());`.

Bây giờ xem `$this->processor` là cái gì nhé.

Ở trên `__construct()` bạn sẽ thấy `$processor` là một object của `Illuminate\Database\Query\Processors\Processor`. Vào trong `Illuminate\Database\Query\Processors\Processor` ta sẽ thấy hàm `processSelect(Builder $query, $results)`.

```
// vendor/laravel/framework/src/Illuminate/Database/Query/Processors/Processor.php

    public function processSelect(Builder $query, $results)
    {
        return $results;
    }
```

Hàm này sẽ trả về tham số truyền vào thứ 2. Nếu thực hiện hàm `$this->processor->processSelect($this, $this->runSelect());` thì `$this->runSelect()` sẽ được trả về.

Cuối cùng sau một hồi vất vả lục code thì hàm `get()` ở đâu đó trên kia sẽ trả về một `collection` của giá trị trả về của hàm `runSelect()`. Hàm `runSelect()` sẽ trả về một mảng. Mình sẽ lưu cache giá trị trả về của hàm `runSelect()` là hợp lý.

Phân tích một chút hàm `runSelect()`

```php
// vendor/laravel/framework/src/Illuminate/Database/Query/Builder.php

    protected function runSelect()
    {
        return $this->connection->select(
            $this->toSql(), $this->getBindings(), ! $this->useWritePdo
        );
    }
```

Hàm này sẽ gọi hàm `$this->connection->select()` với giá trị truyền vào là câu query (`$this->toSql()`), các tham số trong câu query (`$this->getBindings()`) và cuối cùng là `!$this->useWritePdo` (Trong `Connection` hai kết nối đọc ghi riêng biệt được tạo ra. Biến này có nghĩa là sử dụng kết nối read.). Mình sẽ sử dụng hàm `md5` để mã hóa các tham số truyền vào hàm `$this->connection->select()` để tạo key lưu dữ liệu vào cache.

```php
// app/Core/QueryBuilderWithCache.php

    public function cacheKey()
    {
        return md5(vsprintf('%s.%s.%s', [
            $this->toSql(),
            implode('.', $this->getBindings()),
            !$this->useWritePdo,
        ]));
    }
```

Cuối cùng sẽ là viết lại hàm `runSelect()` sử dụng biến `$cacheTime` để quyết định kết quả thực hiện câu truy vấn có lưu vào cache hay không.

```php
// app/Core/QueryBuilderWithCache.php

    protected function runSelect()
    {
        if ($this->cacheTime) {
            return Cache::remember($this->cacheKey(), $this->cacheTime, function () {
                return parent::runSelect();
            });
        }

        return parent::runSelect();
    }
```

Class `QueryBuilderWithCache` full không che sẽ thế này nhé:

```php
// app/Core/QueryBuilderWithCache.php

namespace App\Core;

use Cache;
use Illuminate\Database\ConnectionInterface;
use Illuminate\Database\Query\Grammars\Grammar;
use Illuminate\Database\Query\Processors\Processor;
use Illuminate\Database\Query\Builder as QueryBuilder;

class QueryBuilderWithCache extends QueryBuilder
{
    protected $cacheTime;

    public function __construct(
        ConnectionInterface $connection,
        Grammar $grammar = null,
        Processor $processor = null,
        int $cacheTime = 0
    ) {
        $this->cacheTime = $cacheTime;
        parent::__construct($connection, $grammar, $processor);
    }

    public function cacheKey()
    {
        return md5(vsprintf('%s.%s.%s', [
            $this->toSql(),
            implode('.', $this->getBindings()),
            !$this->useWritePdo,
        ]));
    }

    protected function runSelect()
    {
        if ($this->cacheTime) {
            return Cache::remember($this->cacheKey(), $this->cacheTime, function () {
                return parent::runSelect();
            });
        }

        return parent::runSelect();
    }
}
```

## Thay đổi  BaseQueryBuilder cho Model
Trong class `Model` có sử dụng hàm `newBaseQueryBuilder()` để tạo `Query Builder` cơ sở và truyền vào `Eloquent builder`.

```php
// vendor/laravel/framework/src/Illuminate/Database/Eloquent/Model.php

    protected function newBaseQueryBuilder()
    {
        $connection = $this->getConnection();

        return new QueryBuilder(
            $connection, $connection->getQueryGrammar(), $connection->getPostProcessor()
        );
    }
```

 Mình sẽ viết lại hàm này và thay `QueryBuilder` thành `QueryBuilderWithCache`. Hãy nhớ rằng trong `__construct()` có thêm thuộc tính `$cacheTime` nữa mình sẽ tạo hàm `cacheTime()` trước lấy thuộc tính `$cacheTime` của model để truyền vào `QueryBuilderWithCache`. Nếu thuộc tính này không có thì trả về giá trị mặc định là `0`.
 
 ```php
    protected function cacheTime()
    {
        return property_exists($this, 'cacheTime') ? $this->cacheTime : 0;
    }
 ```
 
 Hàm `newBaseQueryBuilder()` được viết lại như sau:
 
 ```php
    protected function newBaseQueryBuilder()
    {
        $connection = $this->getConnection();

        return new QueryBuilderWithCache(
            $connection,
            $connection->getQueryGrammar(),
            $connection->getPostProcessor(),
            $this->cacheTime()
        );
    }
 ```

Thêm 2 hàm này vào model cần sử dụng `QueryBuilderWithCache` là sẽ chạy ngon lành cành đào rồi. Đừng quên thêm thuộc tính `$cacheTime` cho model nhé.

Trong `HomeController` chỉ cần truy vấn bình thường và dữ liệu truy vấn vẫn sẽ được lưu cache.

```php
// app/Http/Controllers/HomeController.php

    public function index(Request $request)
    {
        $posts = Post::with('user')->orderBy('created_at', 'desc')->paginate();

        return view('home', ['posts' => $posts]);
    }
```

## Tạo trait Cacheable
Để thuận tiện cho việc sử dụng mình tạo `trait` Cacheable đặt trong thư mục `app/Models/Traits` như sau:

```php
// app/Models/Traits/Cacheable.php

namespace App\Models\Traits;

use App\Core\QueryBuilderWithCache;

trait Cacheable
{
    protected function newBaseQueryBuilder()
    {
        $connection = $this->getConnection();

        return new QueryBuilderWithCache(
            $connection,
            $connection->getQueryGrammar(),
            $connection->getPostProcessor(),
            $this->cacheTime()
        );
    }

    protected function cacheTime()
    {
        return property_exists($this, 'cacheTime') ? $this->cacheTime : 0;
    }
}
```

Model nào cần sử dụng cache mình chỉ cần `use Cacheable` và thêm thuộc tính `$cacheTime` là xong. Ví dụ: `Post` model

```php
// app/Models/Post.php

namespace App\Models;

use App\Models\User;
use App\Models\Traits\Cacheable;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use Cacheable;

    protected $cacheTime = 10;
    protected $table = 'posts';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'content',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```

Mình thử thêm `Cacheable` vào tất cả các models xem thế nào nhé.

![](https://images.viblo.asia/bb7722a0-7d6d-4266-b83b-26f310f145f2.gif)

Thật tuyệt vời tất cả các truy vấn đều được lưu vào cache. Kể cả câu truy vấn lấy người dùng đang đăng nhập cũng được lưu vào cache luôn. Thời gian tải trang rất là nhanh.

Trên đây là cách tạo QueryBuilder cache một cách đơn giản nhất. Một điều chú ý là bạn phải đảm bảo các dữ liệu lưu vào cache phải vừa đủ không sẽ làm quá tải máy chủ cache. Nhược điểm của cách này là khi dữ liệu được cập nhật nhưng cache vẫn tồn tại thì dữ liệu trong cache không được cập nhật ngay lập tức. 

Để hệ thống hoạt động chính xác hơn bạn có thể tạo thêm một biến cache để lưu các bảng và các cache key ảnh hưởng dạng như sau:

```php
$cacheKeys = [

    // Lưu các queries liên quan đến bảng posts
    'posts' => [
    ],
    
    // Lưu các queries liên quan đến bảng users
    'users' => [
    ],
    
    // Lưu các cache keys get user đăng nhập
    'auth' => [
    ],
];
```

Khi cập nhật bảng nào thì xóa toàn bộ cache liên quan đến bảng đó đi để khi vào lại các trang liên quan dữ liệu trong cache sẽ được cập nhật.

# Trường hợp cần sử dụng database cache
Như bạn đã thấy sử dụng cache lưu lại các kết quả của câu truy vấn giúp cho tốc độ của trang web tăng lên đáng kể. Chỉ khi truy vấn thực hiện lần đầu (dữ liệu của câu truy vấn chưa được cache trước đó hoặc cache hết hạn) thì tốc độ khá là thấp nhưng các truy vấn sau đó lại thực hiện với tốc độ rất nhanh đem lại trải nghiệm rất tốt cho người dùng. Tuy nhiên không phải lúc nào ta lưu cache cũng tốt. Như các bạn đã thấy thì dữ liệu chỉ được cập nhật khi cache hết thời gian hiệu lực. Tức là các thay đổi của bạn vào cơ sở dữ liệu người dùng sẽ không nhận được ngay thay đổi nếu cache vẫn còn. Như vậy chúng ta không được lưu cache trong trường hợp dữ liệu thay đổi nhiều trong thời gian. Ví dụ như dữ liệu chat chẳng hạn hai người nói chuyện với nhau không thể chờ đến những 1 phút để nhận được tin nhắn của nhau. Như vậy chúng ta chỉ nên sử dụng cache database trong các trường hợp:

- Dữ liệu thay đổi ít ví dụ như thông tin cá nhân của người dùng, như ví dụ trên là thông tin bài viết mới nhất hay thông tin quảng cáo,...
- Người dùng không cần nhận được sự thay đổi ngay lập tức
- Dữ liệu tĩnh. Ví dụ như danh mục sản phẩm, tên các tỉnh thành trong nước, các trường đại học,...

# Tài liệu tham khảo
- [https://laravel.com/docs/5.7/cache](https://laravel.com/docs/5.7/cache)
- [https://laravel.com/docs/5.7/redis](https://laravel.com/docs/5.7/redis)

# Kết luận
Lưu cache cho dữ liệu truy vấn thật là dễ dàng và hiệu quả phải không các bạn. Tuy nhiên đối với một dữ liệu quá lớn thì việc truy vấn lần đầu vẫn rất chậm. Lúc này bạn cần phải  nghĩ đến việc nâng cấp server hiện tại hoặc nhân bản nhiều server lưu trữ cơ sở dữ liệu.

Bài viết của mình xin kết thúc tại đây. Hi vọng sẽ giúp ích được cho các bạn. Nếu bạn thấy hay thì hãy upvote và chia sẻ cho bạn bè cùng đọc. Đừng quên Follow mình để nhận được thông báo khi mình có bài viết mới nhé. Chúc các bạn có một ngày tốt lành!