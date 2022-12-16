Trong bài viết này mình sẽ chia cách sử dụng orderBy  với một trường trong bảng có quan hệ. Bạn có thể dễ dàng sử dụng orderby theo asc và desc với một trường trong bảng quan hệ.<br>
Các bạn hãy xem các ví dụ để hiểu hơn nhé:<br>
> Example 1:

<br>
Ví dụ này mình sẽ sử dụng phương thức order by để sort tất cả dữ liệu trong bảng author theo chiều asc hoặc desc với trường name:<br>

**Laravel Orderby Belongsto Relationship ASC**<br>
```php
$posts = Post::with(['author' => function ($q){
                        $q->orderBy('name');
                    }])
                    ->get();
```

**Laravel Orderby Belongsto Relationship DESC**<br>
```php
$posts = Post::with(['author' => function ($q){
                        $q->orderBy('name', 'DESC');
                    }])
                    ->get();
```

> Example 2:

<br>
Ví dụ này mình sẽ sử dụng phương thức sortBy() và sortByDesc() để sắp sếp dữ liệu của bảng post theo kiểu ASC hoặc DESC dựa vào trường name trong bảng author nhé.<br>

**Laravel Orderby Relation Column using Collection ASC**<br>
```php
$posts = Post::get()->sortBy(function($query){
                               return $query->author->name;
                            })
                            ->all();
```
Hoặc<br>

```php
$posts = Post::get()->sortBy('author.name')->all();
```
<br>
Chú ý: các phương thức sortBy, sortByDesc phải đặt sau hàm get() nhé, vì chúng ta chỉ sort được khi dữ liệu trả về là kiểu collection.<br>

```php
$posts = Post::query()->sortBy(
            Author::select('name')
                ->whereColumn('id', 'posts.author_id')
                ->orderByDesc('name')
                ->limit(1)
        )->paginate(10);
```

**Laravel Orderby Relation Column using Collection DESC**<br>
```php
$posts = Post::get()->sortByDesc(function($query){
                               return $query->author->name;
                            })
                            ->all();
```
Hoặc<br>
```php
$posts = Post::get()->sortByDesc('author.name')->all();
```
<br>
Chú ý: các phương thức sortBy, sortByDesc phải đặt sau hàm get() nhé, vì chúng ta chỉ sort được khi dữ liệu trả về là kiểu collection.<br>

```php
$posts = Post::query()->sortByDesc(
            Author::select('name')
                ->whereColumn('id', 'posts.author_id')
                ->orderByDesc('name')
                ->limit(1)
        )->paginate(10);
```

> Example 3:

<br>
Bây giờ chúng ta sẽ sử dụng inner join và order by với một trường trong bảng quan hệ authors nhé:<br><br>

**Laravel Orderby Relation Column using Join ASC**<br>
```php
$posts = Post::select('*')
                 ->join('authors', 'posts.author_id', '=', 'authors.id')
                 ->orderBy('authors.name', 'ASC')
                 ->paginate(10);
```

**Laravel Orderby Relation Column using Join DESC**<br>
```php
$posts = Post::select('*')
                 ->join('authors', 'posts.author_id', '=', 'authors.id')
                 ->orderBy('authors.name', 'DESC')
                 ->paginate(10);
```