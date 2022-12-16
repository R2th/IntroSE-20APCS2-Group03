Nếu ứng dụng của bạn đang chạy chậm hoặc thực hiện nhiều truy vấn cơ sở dữ liệu, thì các tip tối ưu hóa hiệu suất bên dưới đây sẽ giúp bạn cải thiện thời gian tải ứng dụng phần nào đó.
### 1. Truy xuất tập dữ liệu lớn
Tip này chủ yếu tập trung vào việc cải thiện việc sử dụng bộ nhớ của ứng dụng của bạn khi xử lý các tập dữ liệu lớn.
Nếu ứng dụng của bạn cần xử lý nhiều bản ghi, thay vì truy xuất tất cả cùng một lúc, bạn có thể truy xuất một tập hợp con các kết quả và xử lý chúng theo nhóm.

Vd: Để lấy nhiều kết quả từ bảng 'posts', chúng ta thường làm như sau:
```
$posts = Post::all(); // when using eloquent
$posts = DB::table('posts')->get(); // when using query builder
 
foreach ($posts as $post){
 // Process posts
}
```
Ví dụ trên sẽ lấy tất cả các bản ghi từ bảng 'posts' và xử lý chúng. Điều gì sẽ xảy ra nếu bảng này có 1 triệu bản ghi? Chúng ta sẽ nhanh chóng hết bộ nhớ.

Để tránh các vấn đề khi xử lý các tập dữ liệu lớn, chúng ta có thể sử dụng chunk để truy xuất một tập hợp con các kết quả và xử lý chúng như sau.
 ```
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
 Ví dụ trên lấy 100 bản ghi từ bảng 'posts', xử lý chúng, truy xuất 100 bản ghi khác và xử lý chúng. Việc lặp lại này sẽ tiếp tục cho đến khi tất cả các bản ghi được xử lý.

Cách tiếp cận này sẽ tạo ra nhiều truy vấn cơ sở dữ liệu hơn nhưng tiết kiệm bộ nhớ hơn.

### 2. Chỉ chọn những column bạn cần
Thông thường để lấy kết quả từ một bảng cơ sở dữ liệu, chúng ta sẽ làm như sau:
```
$posts = Post::find(1); //When using eloquent
$posts = DB::table('posts')->where('id','=',1)->first(); //When using query builder
```
Đoạn code này sẽ tạo ra truy vấn như sau:
```
select * from posts where id = 1 limit 1
```
Như bạn có thể thấy, truy vấn đang thực hiện select *. Điều này có nghĩa là nó đang truy xuất tất cả các cột từ bảng cơ sở dữ liệu.
Nếu chúng ta chỉ cần các cột cụ thể (id, title), chúng ta chỉ có thể lấy các cột đó như bên dưới.
```
$posts = Post::select(['id','title'])->find(1); //When using eloquent
$posts = DB::table('posts')->where('id','=',1)->select(['id','title'])->first(); //When using query builder
```
Và đoạn truy vấn lúc này sẽ là:
```
select id,title from posts where id = 1 limit 1
```
### 3. Count rows bằng cách sử dụng truy vấn thay vì collection
Để count tổng số rows trong một bảng, chúng ta thường làm:
```
$posts = Post::all()->count(); //When using eloquent
$posts = DB::table('posts')->get()->count(); //When using query builder
```
Nó sẽ tạo ra truy vấn sau:
```
select * from posts
```
Cách tiếp cận trên sẽ lấy tất cả các rows từ bảng, tải chúng vào một collection object và counts kết quả. Điều này hoạt động tốt khi có ít rows trong bảng cơ sở dữ liệu. Nhưng chúng ta sẽ nhanh chóng hết bộ nhớ khi mà bảng có nhiều rows.

Thay vì cách tiếp cận ở trên, chúng ta có thể trực tiếp counts tất cả các rows trên chính cơ sở dữ liệu.
```
$posts = Post::count(); //When using eloquent
$posts = DB::table('posts')->count(); //When using query builder
```
Cách này nó sẽ tạo ra câu  truy vấn như sau:
```
select count(*) from posts
```
### 4. Tránh N + 1 truy vấn bằng eager loading relationship
Bạn có thể đã nghe nói về tip này rất rất nhiều lần. Vì vậy, mình sẽ lướt qua ngắn gọn và đơn giản nhất. Giả sử bạn có tình huống sau:
```
class PostController extends Controller
{
    public function index()
    {
        $posts = Post::all();
        return view('posts.index', ['posts' => $posts ]);
    }
}
```
```
class PostController extends Controller
{
    public function index()
    {
        $posts = Post::all();
        return view('posts.index', ['posts' => $posts ]);
    }
}
```
Đoạn code trên đang truy xuất tất cả các bài đăng và hiển thị title bài đăng và tác giả của nó trên trang web và nó giả định rằng bạn có relationship tên là `author` trên model post của mình.

Việc thực thi đoạn mã trên sẽ dẫn đến việc chạy các truy vấn sau.
```
select * from posts // Assume this query returned 5 posts
select * from authors where id = { post1.author_id }
select * from authors where id = { post2.author_id }
select * from authors where id = { post3.author_id }
select * from authors where id = { post4.author_id }
select * from authors where id = { post5.author_id }
```
Như bạn có thể thấy, mình có một truy vấn để truy xuất bài đăng và 5 truy vấn để truy xuất tác giả của bài đăng (Vì mình giả định rằng mình có 5 bài đăng.) Vì vậy, đối với mỗi bài đăng mà nó được truy xuất, nó sẽ thực hiện một truy vấn riêng biệt để truy xuất tác giả của nó.

Vì vậy, nếu có N số lượng bài post, nó sẽ tạo ra N + 1 truy vấn (1 truy vấn để lấy bài viết và N truy vấn để lấy tác giả cho mỗi bài đăng). Đây thường được gọi là vấn đề truy vấn N + 1.

Để tránh điều này, hãy tải relationship `author` vào các bài đăng như bên dưới.
```
$posts = Post::all(); // Avoid doing this
$posts = Post::with(['author'])->get(); // Do this instead
```
Việc thực thi đoạn code trên sẽ dẫn đến việc chạy các truy vấn sau.
```
select * from posts // Assume this query returned 5 posts
select * from authors where id in( { post1.author_id }, { post2.author_id }, { post3.author_id }, { post4.author_id }, { post5.author_id } )
```
### 5. Eager load nested relationship
Từ ví dụ trên, hãy coi tác giả thuộc về một team và bạn cũng muốn hiển thị tên của team. Vì vậy, trong file blade bạn sẽ làm như dưới đây:
```
@foreach($posts as $post)
    <li>
        <h3>{{ $post->title }}</h3>
        <p>Author: {{ $post->author->name }}</p>
        <p>Author's Team: {{ $post->author->team->name }}</p>
    </li>
@endforeach
```
Bây giờ làm như bên dưới:
```
$posts = Post::with(['author'])->get();
```
Sẽ dẫn đến các truy vấn sau:
```
select * from posts // Assume this query returned 5 posts
select * from authors where id in( { post1.author_id }, { post2.author_id }, { post3.author_id }, { post4.author_id }, { post5.author_id } )
select * from teams where id = { author1.team_id }
select * from teams where id = { author2.team_id }
select * from teams where id = { author3.team_id }
select * from teams where id = { author4.team_id }
select * from teams where id = { author5.team_id }
```
Như bạn có thể thấy, mặc dù chúng ta đang mong muốn tải relationship `author`, nó vẫn đang thực hiện nhiều truy vấn hơn. Bởi vì chúng ta không tải relationship team trên `author`.
Chúng ta có thể khắc phục điều này bằng cách làm như sau:
```
$posts = Post::with(['author.team'])->get();
```
Việc thực thi đoạn mã trên sẽ dẫn đến việc chạy các truy vấn sau:
```
select * from posts // Assume this query returned 5 posts
select * from authors where id in( { post1.author_id }, { post2.author_id }, { post3.author_id }, { post4.author_id }, { post5.author_id } )
select * from teams where id in( { author1.team_id }, { author2.team_id }, { author3.team_id }, { author4.team_id }, { author5.team_id } )
```
Bằng eager loading the nested relationship, chúng ta đã giảm tổng số truy vấn từ 11 xuống 3 đó.

Hôm nay mình giới thiệu cho các bạn một số tips này thôi. Còn các tips khác nữa mình sẽ giới thiệu ở phần sau nhé :D

Các bạn có thể tham khảo link bài viết gốc ở đây:
https://laravel-news.com/18-tips-to-optimize-your-laravel-database-queries