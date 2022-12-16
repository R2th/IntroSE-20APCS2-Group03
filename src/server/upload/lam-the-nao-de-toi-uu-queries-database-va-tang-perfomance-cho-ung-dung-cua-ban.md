![](https://images.viblo.asia/c3390fca-b51b-4429-84c1-cfe02d9e2c80.jpg)

# Đặt vấn đề
Nếu thấy ứng dụng của bạn đang chạy chậm, thì có một số nguyên nhân dẫn đến tình trạng này ví dụ như :
- Không sử dụng bộ nhớ đệm (cache)
- Hình ảnh chất lượng cao, dung lượng nặng
- Cài đặt plugin, script.. từ bên thứ 3
- Chưa tối ưu HTML, JS
- Không sử dụng Queue Job
- Chưa tối ưu query database
- .....

Ở bài viết này, mình sẽ chia sẻ một số tip khi `query database` giúp cải thiện tốc độ và tăng perfomance cho web của bạn.

# 1. Truy xuất dữ liệu lớn
- Mẹo này chủ yếu tập trung vào việc cải thiện sử dụng bộ nhớ ứng dụng khi xử lý các tập dữ liệu lớn. Nếu ứng dụng cần xử lý một số lượng lớn record, thì thay vì lấy tất cả ra cùng 1 lúc, bạn có thể lấy ra một tập hợp con của kết quả và xử lý chúng theo nhóm.

Ví dụ : Để lấy ra tất cả bản ghi trong bảng posts, chúng ta có thể làm như sau :

```php
$posts = Post::all(); // when using eloquent
$posts = DB::table('posts')->get(); // when using query builder

foreach ($posts as $post){
 // Process posts
}
```

Ví dụ trên, chúng ta sẽ lấy ra tất cả bản ghi từ bảng `posts` . Sau đó, với kết quả nhận được, chúng ta `foreach` ra và xử lý. Nếu dữ liệu ít có thể sẽ không sao, tuy nhiên nếu có hàng triệu bản ghi thì sẽ làm tràn bộ nhớ.

Để tránh các vấn đề khi xử lý các tập dữ liệu lớn, thì chúng ta có thể truy xuất một tập hợp con của kết quả và xử lý từng tập con này .

**Option 1 : Using chunk**

```php
// when using eloquent
$posts = Post::chunk(100, function($posts){
    foreach ($posts as $post){
     // Process posts
    }
});

// when using query builder
$posts = DB::table('posts')->chunk(100, function ($posts){
    foreach ($posts as $post){
     // Process posts
    }
});
```

Cách xử lý trên sẽ lấy 100 bản ghi từ bảng `posts`, cung cấp chúng thông qua `Closure` để xử lý, sau đó truy xuất tiếp 100 bản ghi khác và xử lý chúng, cứ như thế cho đến khi tất cả bản ghi được xử lý .

**Option 2 : Using cursor**

```php
// when using eloquent
foreach (Post::cursor() as $post){
   // Process a single post
}

// when using query builder
foreach (DB::table('posts')->cursor() as $post){
   // Process a single post
}
```

Cách xử lý trên đó là hàm `cursor` cho phép bạn duyệt qua records bằng cách sử dụng một cursor(con trỏ), nó chỉ thực thi cho một truy vấn. Khi dữ liệu lớn, hàm `cursor` có thể được sử dụng để giảm memory sử dụng. Cách làm này sử dụng [PHP Generator](https://www.php.net/manual/en/language.generators.overview.php) để tối ưu hóa việc sử dụng bộ nhớ.

*Lưu ý [Cursor](https://laravel.com/docs/8.x/eloquent#cursors)*
- Mặc dù method `cursor` sử dụng ít bộ nhớ hơn nhiều so với truy vấn thông thường (bằng cách chỉ giữ một mô hình eloquent duy nhất trong bộ nhớ tại một thời điểm), nhưng cuối cùng nó vẫn sẽ hết bộ nhớ. Điều này là do trình điều khiển [PDO](https://www.php.net/manual/en/mysqlinfo.concepts.buffering.php) của PHP trong bộ đệm ẩn tất cả các kết quả truy vấn thô trong bộ đếm của nó. Thế nên nếu trình điều khiển cơ sở dữ liệu của bạn không có đủ bộ nhớ thì tốt hơn là bạn nên sử dụng `chunk`.

**Option 3 : Using chunkById**

```php
// when using eloquent
$posts = Post::chunkById(100, function($posts){
    foreach ($posts as $post){
     // Process posts
    }
});

// when using query builder
$posts = DB::table('posts')->chunkById(100, function ($posts){
    foreach ($posts as $post){
     // Process posts
    }
});
```

Sự khác biệt chính giữa `chunk` và `chunkById` là à cách xây dựng truy vấn. `chunkById` sử dụng `id` và `limit` trong khi `chunk` sử dụng `limit` và `offset`

*chunk*

```sql
select * from posts offset 0 limit 100
select * from posts offset 101 limit 100
```

*chunkById*

```sql
select * from posts order by id asc limit 100
select * from posts where id > 100 order by id asc limit 100
```

Việc sử dụng `limit` và `offset` sẽ chậm hơn và chúng ta nên cố gắng tránh sử dụng nó. Hiểu đơn giản thì `offset` thường được sử dụng để phục vụ trong việc phân trang hoặc để `query` toàn bộ các bản ghi trong Table một cách tuần tự và có giới hạn. Theo lý thuyết thì `offset` sẽ ra lệnh cho `DB` phải loại bỏ `N` kết quả đầu tiên NHƯNG thực tế thì `DB` vẫn phải đọc và sắp xếp lại toàn bộ bản ghi. Nếu trong trường hợp có quá nhiều dữ liệu dẫn tới việc tham số `N` của `offset` sẽ rất lớn dẫn tới việc `DB` phải tìm hết toàn bộ các bản ghi phù hợp sắp xếp lại và loại bỏ `N` bản ghi điều này sẽ ảnh hưởng rất lớn `performance` của hệ thống. [Bài viết này](https://use-the-index-luke.com/no-offset) giả thích chi tiết hơn về vấn đề sử dụng `offset`.

Vì `chunkById` đang sử dụng trường `id` để sử dụng mệnh đề `where` nên truy vấn sẽ nhanh hơn nhiều.

Khi bảng cơ sở dữ liệu của bạn có cột `id` (khóa chính) tăng tự động thì bạn nên sử dụng `chunkById`.


# 2. Chỉ chọn những cột bạn cần
Thông thường để lấy kết quả từ 1 bảng, chúng ta có thể làm như sau :

```php
$posts = Post::find(1); //When using eloquent
$posts = DB::table('posts')->where('id','=',1)->first(); //When using query builder
```

Câu query bên trên tương ứng sẽ là 

```sql
select * from posts where id = 1 limit 1
```

Như bạn có thể thấy , truy vấn trên đang thực hiện `select *`, điều này có nghĩa là nó đang lấy ra hết tất cả các cột của table `posts`. Nếu bạn thực sự cần tất cả cột này thì không có vấn đề gì. Nhưng nếu chúng ta chỉ cần các cột cụ thể (id, title), thì nên lấy ra các cột như bên dưới 

```php
$posts = Post::select(['id','title'])->find(1); //When using eloquent
$posts = DB::table('posts')->where('id','=',1)->select(['id','title'])->first(); //When using query builder
```

Câu query bên trên tương ứng sẽ là

```sql
select id,title from posts where id = 1 limit 1
```

# 3. Sử dụng `pluck` khi cần chính xác một hoặc hai cột từ `database`

*Mẹo naỳ tập trung nhiều hơn vào thời gian sau khi kết quả được truy xuất từ database. Điều này không ảnh hưởng đến thời gian truy vấn thực tế*

Như cách bên trên đã đề cập, để truy xuất các cột cụ thể, chúng ta làm như sau :

```php
$posts = Post::select(['title','slug'])->get(); //When using eloquent
$posts = DB::table('posts')->select(['title','slug'])->get(); //When using query builder
```

Khi chạy đoạn code trên, nó sẽ thực hiện những điều sau :
- Excutes select `title`, `slug` từ truy vấn của bảng `posts` trên databse.
- Tạo một đối tượng `Post` mới cho mỗi hàng nó đã truy xuất.
- Tạo một `Collection` mới với các `Post` model.
- Return `Collection`.

Để truy cập vào kết quả bên trên, chúng ta làm như sau :

```php
foreach ($posts as $post){
    // $post is a Post model or php standard object
    $post->title;
    $post->slug;
}
```

Cách xử lý trên có thêm một `Post` model bổ sung cho mỗi hàng và tạo một `Collection` cho các đối tượng này . Điều này sẽ thích hợp nếu bạn thực sự cần `Post` model intance thay vì dữ liệu.

Nhưng nếu cần output chỉ là hai giá trị `title` và `slug` , chúng có thể làm như sau:

```php
$posts = Post::pluck('title', 'slug'); //When using eloquent
$posts = DB::table('posts')->pluck('title','slug'); //When using query builder
```

Khi chạy đoạn code trên, nó sẽ thực hiện những điều sau :
- Excutes select `title`, `slug` từ truy vấn của bảng `posts` trên databse.
- Tạo một mảng với `title` là value còn `slug` là key.
- Return array .

```php
[
    slug => title,
    slug => title,
]
```

Để truy cập vào kết quả bên trên, chúng ta làm như sau :

```php
foreach ($posts as $slug => $title){
    // $title is the title of a post
    // $slug is the slug of a post
}
```

Nếu chỉ muốn truy xuất một cột, chúng ta làm như sau :

```php
$posts = Post::pluck('title'); //When using eloquent
$posts = DB::table('posts')->pluck('title'); //When using query builder
foreach ($posts as  $title){
    // $title is the title of a post
}
```

Cách xử lý trên loại bỏ việc tạo các `Post` object trên mỗi hàng. Do đó, giảm việc sử dụng bộ nhớ và dành thời gian để xử lý kết quả sau khi truy vấn.

# 4. Đếm số lượng bản ghi bằng truy vấn thay vì `Collection`

Để đếm tổng số bản ghi trong 1 bảng, chúng ta thường làm như sau :

```php
$posts = Post::count(); //When using eloquent
$posts = DB::table('posts')->count(); //When using query builder
```

Câu query tương ứng :

```sql
select count(*) from posts
```

# 5. Tránh `N+1 query` bằng `eager loading`

Chắc hẳn nói về `N+1 query` thì có rất nhiều bài viết đã nói về vấn đề này rồi, bài viết này mình sẽ nói ngắn gọn thôi .

Ví dụ :

```php
class PostController extends Controller
{
    public function index()
    {
        $posts = Post::all();
        return view('posts.index', ['posts' => $posts ]);
    }
}
// posts/index.blade.php file

@foreach($posts as $post)
    <li>
        <h3>{{ $post->title }}</h3>
        <p>Author: {{ $post->author->name }}</p>
    </li>
@endforeach
```

Câu query tương ứng

```sql
select * from posts // Assume this query returned 5 posts
select * from authors where id = { post1.author_id }
select * from authors where id = { post2.author_id }
select * from authors where id = { post3.author_id }
select * from authors where id = { post4.author_id }
select * from authors where id = { post5.author_id }
```

Theo như bên trên chúng ta có thể thấy, có `1 query` để lấy data từ table `posts` và có `5 query` để lấy tên tác giả (giả sử có 5 post). Vì vậy, nếu có `N bài post` thì nó sẽ tạo ra `N+1 query` (1 query để lấy post ra và N query để lấy tác giả bài post). Vì thế nên đây thường được gọi là `N+1 query`.

Để tránh gặp vấn đề này, chúng ta sẽ làm như sau :

```php
$posts = Post::all(); // Avoid doing this
$posts = Post::with(['author'])->get(); // Do this instead
```

Câu query tương ứng

```sql
select * from posts // Assume this query returned 5 posts
select * from authors where id in( { post1.author_id }, { post2.author_id }, { post3.author_id }, { post4.author_id }, { post5.author_id } )
```

# 6. Eager loading lồng nhau

Từ ví dụ bên trên, giả sử author thuộc team có quan hệ `belongsTo`, bạn muốn hiển thị tên team, thì ngoài view bạn sẽ làm như sau :

```php
@foreach($posts as $post)
    <li>
        <h3>{{ $post->title }}</h3>
        <p>Author: {{ $post->author->name }}</p>
        <p>Author's Team: {{ $post->author->team->name }}</p>
    </li>
@endforeach
```

Câu query tương ứng :

```sql
select * from posts // Assume this query returned 5 posts
select * from authors where id in( { post1.author_id }, { post2.author_id }, { post3.author_id }, { post4.author_id }, { post5.author_id } )
select * from teams where id = { author1.team_id }
select * from teams where id = { author2.team_id }
select * from teams where id = { author3.team_id }
select * from teams where id = { author4.team_id }
select * from teams where id = { author5.team_id }
```

Như bên trên chúng ta có thể thấy vẫn bị N+1 query do khi không load relationship với team.

Để xử lý vấn đề trên chúng ta làm như sau :

```php
$posts = Post::with(['author.team'])->get();
```

Khi đó câu query tương ứng :

```sql
select * from posts // Assume this query returned 5 posts
select * from authors where id in( { post1.author_id }, { post2.author_id }, { post3.author_id }, { post4.author_id }, { post5.author_id } )
select * from teams where id in( { author1.team_id }, { author2.team_id }, { author3.team_id }, { author4.team_id }, { author5.team_id } )
```

Bằng cách sử dụng eager loading chúng ta đã giảm số câu truy vấn từ 11 xuống còn 3 câu.

# 7. Tránh các truy vấn không cần thiết

Ví dụ :

```php
<?php

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::all();
        $private_posts = PrivatePost::all();
        return view('posts.index', ['posts' => $posts, 'private_posts' => $private_posts ]);
    }
}
// posts/index.blade.php

@if( request()->user()->isAdmin() )
    <h2>Private Posts</h2>
    <ul>
        @foreach($private_posts as $post)
            <li>
                <h3>{{ $post->title }}</h3>
                <p>Published At: {{ $post->published_at }}</p>
            </li>
        @endforeach
    </ul>
@endif

<h2>Posts</h2>
<ul>
    @foreach($posts as $post)
        <li>
            <h3>{{ $post->title }}</h3>
            <p>Published At: {{ $post->published_at }}</p>
        </li>
    @endforeach
</ul>
```


Như ví dụ trên chúng ta có thể thấy, có 2 truy vấn đó là lấy tất cả bản ghi ở bảng `posts` và lấy tất cả bản ghi ở bảng `private_posts` . Ở ngoài view thì các bản ghi ở bảng `private_posts` chỉ được hiển thị khi người dùng là admin. Thế nên ở Controller chúng ta vẫn đang query mặc dù nó không hiển thị với người dùng bình thường.

Để tránh vấn đề này, sửa lại logic như sau :

```php
$posts = Post::all();
$private_posts = collect();
if( request()->user()->isAdmin() ){
    $private_posts = PrivatePost::all();
}
```


Bằng cách trên, chúng ta đang thực hiện 2 query cho người dùng là admin và 1 query cho người dùng bình thường.

# 8. Gộp các câu `query` tương tự nhau

Đôi khi để truy vấn lấy bản ghi theo các điều kiện khác nhau từ một bảng, chúng ta làm như sau :

```php
$published_posts = Post::where('status','=','published')->get();
$featured_posts = Post::where('status','=','featured')->get();
$scheduled_posts = Post::where('status','=','scheduled')->get();
```

Đoạn code trên lấy các bản ghi của bảng `posts` với điều kiện `status` khác nhau , dẫn đên câu query sau :

```sql
select * from posts where status = 'published'
select * from posts where status = 'featured'
select * from posts where status = 'scheduled'
```

Theo như bên trên, chúng ta thấy nó đang thực hiện 3 câu query khác nhau cho cùng một bảng. Để thực hiện một câu query chúng ta sửa lại như sau :

```php
$posts =  Post::whereIn('status',['published', 'featured', 'scheduled'])->get();
$published_posts = $posts->where('status','=','published');
$featured_posts = $posts->where('status','=','featured');
$scheduled_posts = $posts->where('status','=','scheduled');
```


```sql
select * from posts where status in ( 'published', 'featured', 'scheduled' )
```

Đoạn code trên thực hiện một câu query để lấy các bài `post` ở bất kỳ `status` nào được chỉ định và trả về `collection` riêng biệt bằng cách filter theo từng status.

# 9. Đánh `index` cho các column được truy vấn thường xuyên

Nếu bạn thường xuyên thực hiện truy vấn `where` theo điều kiện của column thì để cải thiện tốc độ truy vấn nên đánh `index` cho `column` đấy

```php
$posts = Post::where('status','=','published')->get();
Schema::table('posts', function (Blueprint $table) {
   $table->index('status');
});
```

*Lưu ý: Khi nào nên đánh index ? *

Đây là một câu hỏi tưởng chừng như đơn giản nhưng vô cùng hóc búa. Vì chúng ta phải cân bằng giữa cái lợi và hại khi tạo `index`. Index sẽ giúp truy vấn đọc (SELECT) nhanh hơn nhưng những truy vấn ghi (CREATE, UPDATE, DELETE) sẽ bị chậm đi vì phải thêm thao tác cập nhật lại dữ liệu `index`.

# 10. Sử dụng `simplePaginate` thay thế cho `paginate`

Khi phân trang kết quả, chúng ta thường làm như sau :

```php
$posts = Post::paginate(20);
```

Việc phân trang như bên trên sẽ thực hiện 2 truy vấn , truy vấn đầu tiên để lấy kết quả được phân trang và truy vấn thứ 2 để đếm tổng số `rows` trong bảng. Đếm `rows` trong bảng là một phép tính gây chậm và ảnh hưởng đến hiệu suất truy vấn .

*Tại sao Laravel lại tính rows ?* 

- Đó là để tạo link cho các page khi phân trang, thì Laravel đếm tổng số rows để biết trước được sẽ có bao nhiêu `page`, và `previous page`. Vì vậy việc chuyển đến page trước, sau hay page số bao nhiêu sẽ rất dễ dàng.

Mặt khác, khi thực hiện `simplePaginate` sẽ không tính tổng số `rows` và truy vấn sẽ nhanh hơn nhiều so với `paginate`. Nếu bạn chỉ cần hiển thị hai link đơn giản `Next` và `Previous` trên pagination view, bạn có thể sử dụng hàm `simplePaginate` để thực hiện một query hiệu quả hơn. Cách này rất hữu dụng với một tập dữ liệu lớn nếu bạn không cần hiển thị một link cho mỗi số trang khi thực hiện render.

```php
$posts = Post::paginate(20); // Generates pagination links for all the pages
$posts = Post::simplePaginate(20); // Generates only next and previous pagination links
```


Khi nào sử dụng `paginate` vs `simplePaginate`

Nhìn vào bảng so sánh dưới đây để xác định xem bạn nên sử dụng paginate hay simplePaginate cho phù hợp



| Đặc điểm | paginate / simplePaginate
| -------- | -------- |
| 
Bảng dữ liệu chỉ có vài hàng và ít insert thêm vào     | paginate / simplePaginate     |
| Bảng dữ liệu có nhiều hàng và insert nhiều vào sau này     | simplePaginate     |
| Bắt buộc phải có link đến các page cụ thể     | paginate     |
| Bắt buộc phải hiển thị cho người dùng tổng số rows     | paginate     |
| Không cần các link phân trang     | simplePaginate     |
| UI/UX không ảnh hưởng khi chuyển các link từ các số của page sang link next previous     | simplePaginate     |
| Sử dụng button `load more` hoặc `infinite scrolling` để phân trang     | simplePaginate     |

# 11. Tránh sử dụng các ký tự đại diện ở đầu (like keyword)

Khi truy vấn kết quả phù hợp với 1 mẫu cụ thể nào đó, chúng ta thường sử dụng :

```sql
select * from table_name where column like %keyword%
```

Truy vấn trên sẽ dẫn đến việc quét toàn bộ bảng. Nếu chúng ta biết được từ khóa xuất hiện ở đầu giá trị column, thì chúng ta nên sử dụng :

```sql
select * from table_name where column like keyword%
```

# 12. Tránh sử dụng `SQL function` trong mệnh đề `where`

Tốt hơn hết là bạn nên tránh sử dụng các hàm SQL trong mệnh đề `where` vì chúng sẽ dẫn đến việc quét toàn bộ bảng.

Ví dụ để truy vấn lâý ra kết quả của ngày hôm này, chúng ta có thể làm :

```php
$posts = Post::whereDate('created_at', '>=', now() )->get();
```

Câu query tương ứng :

```sql
select * from posts where date(created_at) >= 'timestamp-here'
```

Truy vấn trên sẽ dẫn đến việc quét toàn bộ bảng vì điều kiện `where` không được áp dụng cho đến khi hàm `date` được thực hiện.

Chúng ta có thể sửa lại như sau :

```php
 $posts = Post::where('created_at', '>=', now() )->get();
 ```
 
 ```sql
select * from posts where created_at >= 'timestamp-here'
```

# 13. Tránh thêm quá nhiều cột vào một bảng

Tốt hơn, nếu được thì nên giới hạn tổng số cột trong một bảng và chia các bảng có rất nhiều cột thành nhiều bảng . Chúng có thể được kết hợp với nhau bằng cách sử dụng khóa ngoại

Thêm quá nhiều cột vào bảng sẽ làm tăng độ dài bản ghi riêng lẻ và sẽ làm chậm quá trình quét bảng . Khi bạn đang thực hiện một truy vấn `select *`, bạn sẽ truy xuất một loạt các cột mà bạn thực sự không cần.

# 14. Cách tốt nhất để lấy bản ghi mới nhất trong bảng

Thông thường để lấy bản ghi mới nhất ra chúng ta thường làm :

```php
$posts = Post::latest()->get();
// or $posts = Post::orderBy('created_at', 'desc')->get();
```

Câu query tương ứng

```sql
select * from posts order by created_at desc
```

Về cơ bản, truy vấn sắp xếp các `row` theo thứ tự giảm dần của cột `created_at`, vì cột `created_at` là `string`, nên việc sắp xếp theo column này thường chậm hơn .

Nếu bảng của bạn có `id` khóa chính tự động tăng thì trong hầu hết các trường hợp , bản ghi mới nhất luôn có `id` lớn nhất. Vì `id` là số nguyên và cũng là khóa chính nên việc sắp xếp kết quả theo `id` sẽ nhanh hơn.Vì thế nên cách tốt nhất để lấy ra bản ghi mới nhất đó là :

```php
$posts = Post::latest('id')->get();
// or $posts = Post::orderBy('id', 'desc')->get();
```

```sql
select * from posts order by id desc
```

# 15. Kiểm tra và tối ưu các truy vấn

Kiểm tra các câu truy vấn của ứng dụng sẽ giúp bạn xác định và giảm số câu query được thực hiện . Dưới đây là một số công cụ giúp bạn kiểm tra các truy vấn được thực hiện trên mỗi trang

*Lưu ý : Chỉ nên chạy các công cụ kiểm tra này ở môi trường local thôi nhé , đừng chạy trên production :v*
- [Laravel Debugbar](https://github.com/barryvdh/laravel-debugbar) : Hẳn khi làm việc với Laravel thì không ai là không biết đến công cụ này , nó sẽ hiển thị tất các các truy vấn được thực hiện khi truy cập một trang nào đó.
- [Clockwork](https://github.com/itsgoingd/clockwork) : Nó cũng giống như Laravel Debugbar , nhưng thay vì xem truy vấn ở ngay trang bạn đang truy cập , thì nó sẽ hiển thị thông tin trong cửa sổ dành cho developer hoặc dưới dạng giao diện người dùng bằng cách truy cập yourappurl/clockwork
- [Laravel Telescope](https://laravel.com/docs/8.x/telescope) : Sau khi install xong thì bạn truy cập yourappurl/telescope, trong bảng điều khiển, bạn chuyển đến tab queries và nó sẽ hiển thị tất cả các truy vấn đang được ứng dụng của bạn thực hiện.

# Kết

Trên đây là một số `tips` mình rút ra được trong quá trình làm việc thực tế, hi vọng nó giúp bạn tối ưu được query và tăng perfomance khi phát triển ứng dụng của mình.

## Tham khảo

[Optimize Database Queríes](https://laravel-news.com/18-tips-to-optimize-your-laravel-database-queries)

[Laravel Database](https://laravel.com/docs/8.x/database)

[Laravel Eloquent](https://laravel.com/docs/8.x/eloquent)