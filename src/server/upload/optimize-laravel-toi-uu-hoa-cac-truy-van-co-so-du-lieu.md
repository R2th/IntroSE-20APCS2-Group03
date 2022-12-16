Đã bao giờ mà mọi người code xong 1 tính năng, test với dữ liệu ít thì chạy ngon choét nhưng với dữ liệu lớn thì chạy rất chậm (hoặc lỗi) mà nguyên nhân chính lại do câu truy vấn chưa? hôm nay mình sẽ chia sẻ cho mọi người 1 vài vấn đề và cách tối ưu câu truy vấn trong laravel.

## 1. Truy xuất bộ dữ liệu lớn dẫn tới tràn bộ nhớ
```php
$posts = Post::all(); // when using eloquent
$posts = DB::table('posts')->get(); // when using query builder

foreach ($posts as $post){
 // Process posts
}
```
Bình thường để lấy tất cả danh sách bài viết ra chúng ta sẽ code như bên trên. Dữ liệu trả về ít thì không sao, nhưng nếu kết quả câu query trả về 1 triệu bản ghi thì PHP server rất dễ bị tràn bộ nhớ. Nếu bị lỗi tràn bộ nhớ thì chúng ta sẽ có 1 vài cách xử lý sau:

- Tăng `memory_limit` trong file `php.ini`, nhưng cách này chỉ là giải pháp tạm thời, rõ ràng chúng ta đang nhận thấy một vấn đề ở đây là chỉ cần một đoạn code nhỏ đã có thể chiếm trọn tài nguyên bộ nhớ. Điều đó thật sự là một điều không thể chấp nhận được và chúng ta cần đi tối ưu đoạn code trên.

- Sử dụng PHP Generators, laravel đã hỗ trợ sẵn phương thức `cursor`, nếu logic phức tạp mà bạn muốn code thuần sử dụng `yield` thì có thể tham khảo bài [này](https://viblo.asia/p/su-dung-php-generators-trong-cai-thien-hieu-nang-cua-ung-dung-web-MLzGObXxvpq)
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
- Tách câu truy vấn, thay vì dùng 1 câu để lấy dữ liệu thì sẽ tách thành nhiều câu nhỏ
    + Dùng hàm `chunk`, cách này thì câu truy vấn sẽ dùng `offset` và `limit` để phân trang
        ```sql
        select * from posts offset 0 limit 100

        select * from posts offset 101 limit 100
        ```
        ```php
        // when using eloquent
        Post::chunk(100, function($posts){
            foreach ($posts as $post){
             // Process posts
            }
        });

        // when using query builder
        DB::table('posts')->chunk(100, function ($posts){
            foreach ($posts as $post){
             // Process posts
            }
        });
        ```
     + Dùng hàm `chunkById` (hỗ trợ từ phiên bản laravel 5.7), cách này sẽ dựa vào `id` để phân trang
        ```sql
        select * from posts order by id asc limit 100

        select * from posts where id > 100 order by id asc limit 100
        ```
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

## 2. Truy xuất dư thừa dữ liệu không dùng tới
Thông thường để lấy kết quả từ một bảng cơ sở dữ liệu, chúng ta sẽ code như sau
```php
$posts = Post::find(1); //When using eloquent
$posts = DB::table('posts')->where('id','=',1)->first(); //When using query builder
```
Đoạn code trên sẽ dẫn đến một truy vấn như bên dưới
```sql
select * from posts where id = 1 limit 1
```
Như bạn có thể thấy, truy vấn đang thực hiện một select *. Điều này có nghĩa là nó đang truy xuất tất cả các cột từ bảng cơ sở dữ liệu, và nếu chúng ta chỉ cần cột id và title thì sửa lại như bên dưới thay vì dùng select * gây dư thừa dữ liệu
```php
$posts = Post::select(['id','title'])->find(1); //When using eloquent
$posts = DB::table('posts')->where('id','=',1)->select(['id','title'])->first(); //When using query builder
```
```sql
select id,title from posts where id = 1 limit 1
```

## 3. Đếm số bản ghi trong `sql` thay vì `collection`
Để đếm tổng số hàng trong một bảng, chúng ta thường làm
```php
$posts = Post::all()->count(); //When using eloquent
$posts = DB::table('posts')->get()->count(); //When using query builder
```
Điều này sẽ tạo ra truy vấn sau
```sql
select * from posts
```
Nếu chỉ cần lấy tổng số bản ghi và không cần thông tin gì thì chúng ta có thể trực tiếp đếm bằng câu lệnh `count` trong `sql`
```php
$posts = Post::count(); //When using eloquent
$posts = DB::table('posts')->count(); //When using query builder
```
```sql
select count(*) from posts
```
**CHÚ Ý**: Nếu trong câu truy vấn của mọi người có sử dụng `group by` thì sẽ có trường hợp 2 cách trên sẽ ra kết quả khác nhau, nguyên nhân mọi người có thể tìm hiểu ở [đây](https://github.com/laravel/framework/issues/28931), cách xử lý là mình sẽ cho câu query sử dụng `group by` làm subquery sau đó mới `count` trên kết quả câu đó
```sql
select count(*) as count from (select * from posts group by user_id) as sub
```
Code bằng laravel thì mọi người có thể tham khảo ở [đây](https://github.com/laravel/framework/issues/22883#issuecomment-402572610)

## 4. Tránh query N + 1 bằng eager loading relationship
Đoạn code dưới mình đang giả định quan hệ trong model, 1 author có nhiều post, 1 post thuộc về 1 author, đoạn code bên dưới mình sẽ lấy ra tiêu đề bài viết cùng với tên tác giả bài viết
```php
$posts = Post::all(); // when using eloquent
$posts = DB::table('posts')->get(); // when using query builder

foreach ($posts as $post){
    echo "{$post->title}: {$post->author->name}";
}
```
Việc thực thi đoạn mã trên sẽ dẫn đến việc chạy các truy vấn sau.
```sql
select * from posts // Assume this query returned 5 posts
select * from authors where id = { post1.author_id }
select * from authors where id = { post2.author_id }
select * from authors where id = { post3.author_id }
select * from authors where id = { post4.author_id }
select * from authors where id = { post5.author_id }
```
- Như bạn có thể thấy, sẽ có một truy vấn để lấy ra danh sách bài post và 5 truy vấn để lấy tác giả của bài post (mình giả định rằng trong DB của mình có 5 bài post)
- Vì vậy, đối với mỗi bài post, sẽ có thêm 1 câu truy vấn để lấy tác giả bài post. Nếu có N số lượng bài post, sẽ tạo ra N + 1 truy vấn để lấy tác giả bài post
- Để tránh điều này, chúng ta sẽ dùng hàm with (hoặc hàm load), laravel sẽ chỉ tạo ra 2 câu truy vấn
```php
$posts = Post::with(['author'])->get();
```
```sql
select * from posts // Assume this query returned 5 posts
select * from authors where id in( { post1.author_id }, { post2.author_id }, { post3.author_id }, { post4.author_id }, { post5.author_id } )
```

## 5. Hợp nhất query tương tự nhau
Giả sử chúng ta cần thực hiện các truy xuất để lấy các loại trạng thái khác nhau từ cùng một bảng.
```php
$published_posts = Post::where('status','published')->get();
$featured_posts = Post::where('status','featured')->get();
$scheduled_posts = Post::where('status','scheduled')->get();
```
```sql
select * from posts where status = 'published'
select * from posts where status = 'featured'
select * from posts where status = 'scheduled'
```
Cấu trúc 3 câu trên giống nhau và chỉ khác giá trị status, chúng ta có thể gộp lại bằng 1 câu query để lấy ra 3 loại sau đó dùng collection để lọc
```php
$posts =  Post::whereIn('status',['published', 'featured', 'scheduled'])->get();
$published_posts = $posts->where('status','published');
$featured_posts = $posts->where('status','featured');
$scheduled_posts = $posts->where('status','scheduled');
```
```sql
select * from posts where status in ( 'published', 'featured', 'scheduled' )
```

## 6. Đánh index cho cột được truy vấn thường xuyên
```php
$posts = Post::where('status','=','published')->get();
```
Trong ví dụ trên, mình đang truy vấn các bản ghi bằng cách thêm điều kiện status. Chúng ta có thể cải thiện hiệu suất truy vấn bằng cách đánh index cho cột đó
```php
Schema::table('posts', function (Blueprint $table) {
   $table->index('status');
});
```

## 7. Sử dụng simplePaginate thay vì Paginate
Khi cần phân trang, bình thường mọi người sẽ code như sau
```php
$posts = Post::paginate(20);
```
- Đoạn code trên sẽ tạo ra 2 câu truy vấn. 1 câu để lấy ra tổng số bản ghi, 1 câu lấy kết quả phân trang. Câu truy vấn lấy tổng số bản ghi sẽ ảnh hưởng đến hiệu xuất
- Tại sao laravel phải thực thi 2 câu truy vấn? vì để tạo ra liên kết phân trang, laravel bắt buộc phải lấy tổng số bản ghi sau đó chia cho số lượng bản ghi ở mỗi trang (ở trên là 20) sẽ ra được là có bao nhiêu trang
- Trường hợp dùng liên kết phân trang để tạo ra các số 1,2,3 ở dưới footer thì dùng paginate
- Còn trường hợp phân trang khi scroll xuống thì chỉ cần dùng simplePaginate

## 8. Tránh sử dụng like %keyword nếu bạn biết chính xác từ bắt đầu
```sql
select * from table_name where column like %keyword%
```
Truy vấn trên sẽ dẫn đến việc quét toàn bộ bảng. Nếu các bạn biết chính xác từ bắt đầu thì sẽ chỉ cần như dưới
```sql
select * from table_name where column like keyword%
```

## 9. Lấy bản ghi mới nhất theo id thay vì created_at
Khi cần truy xuất bản ghi mới nhất từ một bảng, mọi người thường code như sau
```php
$posts = Post::latest()->get();
// or $posts = Post::orderBy('created_at', 'desc')->get();
```
```sql
select * from posts order by created_at desc
```
- Truy vấn trên sẽ sắp xếp các hàng theo thứ tự giảm dần dựa trên cột create_at. Vì cột create_at là một cột kiểu chuỗi, nên việc sắp xếp kết quả theo cách này thường chậm hơn.
- Nếu bảng cơ sở dữ liệu của mọi người có id khóa chính tăng tự động, thì trong hầu hết các trường hợp, hàng mới nhất sẽ luôn có id cao nhất. Vì trường id là trường số nguyên và cũng là khóa chính, nên việc sắp xếp các kết quả dựa trên khóa này sẽ nhanh hơn nhiều.
```php
$posts = Post::latest('id')->get();
// or $posts = Post::orderBy('id', 'desc')->get();
```
```sql
select * from posts order by id desc
```

## Để hỗ trợ việc kiểm tra và đo đạt câu truy vấn mình có suggest một vài package bên dưới
- [Laravel Debugbar](https://github.com/barryvdh/laravel-debugbar)
- [Clockwork](https://github.com/itsgoingd/clockwork)
- [Laravel Telescope](https://laravel.com/docs/8.x/telescope)
- [Laravel Tail DB](https://viblo.asia/p/laravel-tail-db-lang-nghe-truy-van-sql-thoi-gian-thuc-va-hien-thi-ket-qua-tren-terminal-gGJ59MP15X2)

## Tham Khảo
- https://viblo.asia/p/su-dung-php-generators-trong-cai-thien-hieu-nang-cua-ung-dung-web-MLzGObXxvpq
- https://dudi.dev/optimize-laravel-database-queries/