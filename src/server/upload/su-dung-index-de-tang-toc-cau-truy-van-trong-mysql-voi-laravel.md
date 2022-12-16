# Giới thiệu
Xin chào các bạn!

Vẫn trong chuyên đề cải thiện hiệu năng trang web. Hôm nay chúng ta cùng tìm hiểu cách sử dụng index trong mysql để tăng tốc các câu truy vấn đến cơ sở dữ liệu của mình.

Mình nói qua một chút về index. Index là một cấu trúc dữ liệu giúp cải thiện tốc độ truy vấn trong một bảng. Nó giống như những trang **mục lục** trong một cuốn sách vậy. Dựa vào mục lục thì ta sẽ biết được số trang của phần mà mình cần tìm và ngay lập tức lật đến trang đó mà không cần xem nội dung của những phần trước. Cũng giống như vậy index sẽ giúp cơ sở dữ liệu của bạn không cần phải duyệt qua tất cả các bản ghi trong bảng mà có thể trực tiếp tìm ra các giá trị phù hợp.

Bài viết hôm nay chúng ta sẽ cùng nhau tìm hiểu cách sử dụng index trong một project laravel sao cho hiệu quả nhé!

# Chuẩn bị

Trong bài mình sẽ dùng:
- Laravel 5.7
- Cơ sở dữ liệu Mysql 5.7.24

Cơ sở dữ liệu trong bài sẽ gồm 3 bảng:
- Bảng users: Lưu thông tin người dùng (id, name, email, password)
- Bảng posts: Lưu thông tin bài viết (id, user_id, title, content)
- Bảng comments: Lưu các comments của người dùng cho bài viết (id, user_id, post_id, content)

Migration của từng bảng sẽ như sau:

```php
// database/migrations/2014_10_12_000000_create_users_table.php
Schema::create('users', function (Blueprint $table) {
    $table->increments('id');
    $table->string('name');
    $table->string('email')->unique();
    $table->timestamp('email_verified_at')->nullable();
    $table->string('password');
    $table->rememberToken();
    $table->timestamps();
});
```

```php
// database/migrations/2018_11_14_145642_create_posts_table.php
Schema::create('posts', function (Blueprint $table) {
    $table->increments('id');
    $table->string('title');
    $table->unsignedInteger('user_id');
    $table->text('content');
    $table->timestamps();
});
```

```php
// database/migrations/2019_02_19_182318_create_comments_table.php
Schema::create('comments', function (Blueprint $table) {
    $table->increments('id');
    $table->unsignedInteger('user_id');
    $table->unsignedInteger('post_id');
    $table->text('content');
    $table->timestamps();
});
```

Mình sẽ dùng [factory](https://laravel.com/docs/5.7/database-testing#writing-factories) và [seeder](https://laravel.com/docs/5.7/seeding#using-model-factories) để tạo ra một lượng dữ liệu đủ lớn: gần 1.000 users, gần 200.000 posts và hơn 2.000.000 comments. Dữ liệu của toàn bộ database khoảng 519.8MB.

![](https://images.viblo.asia/09620e51-9a9c-4612-b2a3-0e5494e86783.png)

# Cài đặt và cấu hình

Để debug các câu truy vấn database một cách dễ dàng ta sẽ sử dụng gói [`barryvdh/laravel-debugbar`](https://github.com/barryvdh/laravel-debugbar). Cài đặt bằng `composer` như sau:

```bash
composer require barryvdh/laravel-debugbar --dev
```

Đối với phiên bản laravel 5.7 thì mình không cần phải làm thêm gì cả. Các gói khi cài thêm sẽ được tự động kích hoạt vào project laravel của mình.

Để biết thêm nhiều thông tin hơn về cách thực hiện câu truy vấn thì mình sẽ thêm `EXPLAIN` vào trước mỗi câu truy vấn. Laravel debug bar đã hỗ trợ chúng ta  `EXPLAIN` câu truy vấn. Chỉ cần bật nó lên trong file cấu hình debug bar là xong.

Đầu tiên phải publish file cấu hình lên thư mục config:

```bash
php artisan vendor:publish --provider="Barryvdh\Debugbar\ServiceProvider"
```

Trong file cấu hình `debugbar` chuyển trạng thái `enabled` của `explain` db từ `false` sang `true`

```php
//config/debugbar.php

//.....................
        'db' => [
            'with_params'       => true,   // Render SQL with the parameters substituted
            'backtrace'         => true,   // Use a backtrace to find the origin of the query in your files.
            'timeline'          => true,  // Add the queries to the timeline
            'explain' => [                 // Show EXPLAIN output on queries
                'enabled' => true,
                'types' => ['SELECT'],     // // workaround ['SELECT'] only. https://github.com/barryvdh/laravel-debugbar/issues/888 ['SELECT', 'INSERT', 'UPDATE', 'DELETE']; for MySQL 5.6.3+
            ],
            'hints'             => true,    // Show hints for common mistakes
        ],
//.....................
```

Sau khi bật `explain` query lên thì khi thực hiện truy vấn sẽ có thông tin chi tiết cách mà query được thực hiện như thế nào hiển thị trong thanh debug.

![](https://images.viblo.asia/81ee7a3e-de4a-458f-9201-84a2df7bc781.png)

Ý nghĩa từng thành phần của kết quả trả về bạn có thể đọc bài viết [Sử dụng EXPLAIN để tối ưu câu lệnh MySQL](https://viblo.asia/p/su-dung-explain-de-toi-uu-cau-lenh-mysql-BYjv44gmvxpV) để biết thêm chi tiết. Ở đây mình cần quan tâm các thuộc tính:
- `type`  cách MySQL sử dụng các bảng để thực hiện truy vấn.
- `possible_keys` keys có thể được dùng bởi MySQL để tìm dòng trong bảng
- `rows` số lượng bản ghi đã được duyệt để trả về kết quả

#  Sử dụng index
## Index mặc định
Các trường khóa chính (id), trường unique (email trong bảng users) sẽ được mặc định tạo index.

Như trong bảng `users` của mình có 2 index

![](https://images.viblo.asia/d96ed76c-5ae6-4cbd-94aa-121f79c6f6cb.png)

Khi một người dùng đăng nhập, laravel sẽ sử dụng `email` để thực hiện truy vấn lấy ra một bản ghi sau đó kiểm tra `password` nhập vào có khớp với mã trong trường `password` của bản ghi thu được không.

![](https://images.viblo.asia/7cece500-6b92-4cf5-b3e6-c021fe3f9fc3.png)

Do trường `email` đã được tạo index nên khi xem `explain` của truy vấn ta sẽ thấy:

- **type: const** có duy nhất 1 dòng đã được đánh chỉ mục khớp với điều kiện tìm kiếm
- **possible_keys: users_email_unique** tên chỉ mục đã được dùng cho việc tìm kiếm
- **rows: 1** thể hiện là chỉ có 1 bản ghi được duyệt qua khi thực hiện truy vấn này

Thời gian thực hiện truy vấn rất nhanh chỉ có *1.24ms*

Bây giờ thử xóa `index` của cột `email` đi nhé

Kết quả một truy vấn đăng nhập: thời gian thực hiện truy vấn tăng lên rất nhiều. Mysql phải duyệt toàn bộ dữ liệu của bảng `users` để tìm ra bản ghi phù hợp.

![](https://images.viblo.asia/7997dab9-e9f0-42d3-9fee-fdc1e9888802.png)

Đây mới là bảng người dùng có hơn 1000 bản ghi. Đối với những bảng lớn hơn thì con số này quả thực là rất lớn. 

Có một truy vấn, request nào cũng được thực hiện (đối với những request phải qua middle `auth` nhé) khi người dùng đã đăng nhập. Mỗi request gửi lên, Laravel sẽ thực hiện một truy vấn sử dụng `id` được lưu trong phiên đăng nhập để lấy thông tin người dùng đó từ cơ sở dữ liệu. Bạn có thể thấy truy vấn thực hiện với `id` rất nhanh. Mysql đã sử dụng index `PRIMARY` để thực hiện truy vấn.

![](https://images.viblo.asia/e0e8cd2e-4be8-4cf8-aa86-927f6ad24b08.png)

Mình xin nói thêm một chút về những hàm lấy người dùng đang đăng nhập trong laravel `Auth::user()`, `$request->user()`. Khi gọi các hàm này thì truy vấn lấy người dùng có được thực hiện lại không? Câu trả lời là không nhé. Nó còn là một object đấy. Tức là khi bạn thay đổi thông tin `$user` trong bất kỳ cách gọi nào thì kết quả trả về của hàm kia cũng thay đổi theo.

Giả sử mình làm như sau:

```php
    public function index(Request $request)
    {
        $userFromRequest = $request->user();
        $userFromRequest->name = 'Hoang Hoi';
        $userFromAuth = Auth::user();
        dd($userFromRequest, $userFromAuth);
    }
```

Kết quả không có truy vấn lấy người dùng nào được thực hiện thêm. Và chúng được in ra có dữ liệu giống nhau mặc dù mình chưa `save()` lại.

Lan man một chút thôi. Bây giờ bạn đã biết index quan trọng đến mức nào rồi phải không. Nếu không có `index` các trường `id`, `email` thì hệ thống của bạn chạy chậm đi rất nhiều rồi. Nhưng bạn không cần quan tâm đến những trường dữ liệu như thế này. Nó đã được tạo index theo mặc định. Bây giờ chúng ta phải tìm hiểu khi nào cần tạo `index` sẽ là hợp lý.

## Tạo index khi cần thiết
Vậy khi nào cần thiết cần tạo index?

Đây là một câu hỏi tưởng chừng như đơn giản nhưng vô cùng hóc búa. Vì chúng ta phải cần bằng giữa cái lợi và hại khi tạo `index`. Index sẽ giúp truy vấn đọc (SELECT) nhanh hơn nhưng những truy vấn ghi (CREATE, UPDATE, DELETE) sẽ bị chậm đi vì phải thêm thao tác cập nhật lại dữ liệu `index`.

**Xét trong trường hợp cụ thể:** trang xem chi tiết một bài viết có `load` thêm `comments` và `user` đã comment.

```php
// app/Http/Controllers/HomeController.php
    public function post(Post $post)
    {
        $comments = $post->comments()->with('user')->paginate();
        return view('post', [
            'post' => $post,
            'comments' => $comments,
        ]);
    }
```

Có 4 truy vấn được thực hiện (mình bỏ truy vấn lấy người dùng đang đăng nhập) để lấy dữ liệu.

![](https://images.viblo.asia/d84068e7-298d-45a0-8a70-a9340a2ed586.png)

Để ý truy vấn tốn nhiều thời gian nhất là truy vấn lấy nội dung `comments` của bài viết. Truy vấn này đã sử dụng khóa ngoại `post_id` trong bảng `comments` để so sánh với id của bài viết hiện tại. 

![](https://images.viblo.asia/7d18e153-d44b-42e4-8a9b-e7cbe58d7f0b.png)

Xem xét `explain` của truy vấn ta có thể thấy:
- **type: all** toàn bộ bảng được duyệt
- **possible_keys: null** không có chỉ mục được dùng
- **rows: 2476184** tất nhiên số bản ghi được duyệt qua là toàn bộ số bản ghi của bảng

Thời gian truy vấn thì rất chậm, những **2.39s**.

`post_id` chính là điều kiện để duyệt và lấy các bản ghi phù hợp. Nếu nó được tạo chỉ mục để việc tìm kiếm nhanh hơn thì tốc độ thực hiện truy vấn sẽ nhanh. Bây giờ chúng ta thử tạo index cho `post_id` xem sao.

Cú pháp để tạo index cho bảng như sau:

```sql
CREATE INDEX index_name ON table_name (column_list)
```

Trong trường hợp này mình sẽ chạy câu lệnh:

```sql
CREATE INDEX idx_comments_post_id ON comments (post_id)
```

Kiểm tra các index trong bảng comments ta sẽ thấy xuất hiện `idx_comments_post_id` là `index` đã được tạo thành công.

![](https://images.viblo.asia/5c6ed402-b9b7-40b9-9a20-07610fe27e92.png)

Bây giờ tải lại trang thông tin chi tiết một bài viết xem kết quả thế nào

![](https://images.viblo.asia/4ce06014-ff51-4be8-a6eb-d78a2f42932a.png)

Truy vấn lấy nội dung `comments` của bài viết đã được thực hiện nhanh hơn rất nhiều. Xem chi tiết có thể thấy mysql đã sử dụng index mình vừa tạo ra (`idx_comments_post_id`) để thực hiện truy vấn nên chỉ phải duyệt **10** bản ghi để lấy ra dữ liệu phù hợp.

Bạn có thể đánh index tất cả các khóa ngoại của mình `post_id` trong bảng `comments`, `user_id` trong bảng `posts` và `user_id` trong bảng `comments`. Nhưng bạn phải cân nhắc khi tạo nhiều index. Các truy vấn làm thay đổi dữ liệu (CREATE, UPDATE, DELETE) khiến dữ liệu index phải được tạo và sắp xếp lại sẽ trở lên chậm đi. Ở đây mình không tạo index cho `user_id` trong bảng `comments` vì mình không có ý định lọc comments của người dùng nào cả mà sẽ hiển thị hết luôn.

**Một trường hợp khác:** Mình cho thêm bộ lọc vào trang danh sách bài viết

![](https://images.viblo.asia/c380b731-d42d-42e1-ae5d-2dc9d26fb3be.png)

Tại controller xử lý thêm các điều kiện lọc nếu có

```php
// app/Http/Controllers/HomeController.php
    public function index(Request $request)
    {
        $conditions = [
            'user_id' => $request->get('user_id'),
            'created_at' => $request->get('created_at'),
        ];
        $posts = Post::with('user');

        if ($conditions['user_id']) {
            $posts->where('user_id', $conditions['user_id']);
        }
        if ($conditions['created_at']) {
            $posts->where('created_at', $conditions['created_at']);
        }

        $posts = $posts->orderBy('created_at', 'desc')->paginate();

        return view('home', [
            'posts' => $posts,
            'users' => User::all(),
            'conditions' => $conditions,
        ]);
    }
```

Mình sẽ chọn một người đăng bất kì (Ví dụ: `Janick Lowe`).

![](https://images.viblo.asia/0683ba71-1f5a-4ea6-a94d-ea7c536a3606.png)

Chú ý câu truy vấn lấy các bài viết sẽ thêm điều kiện ``user_id` = '545'` và mysql đã sử dụng index có khóa là `idx_posts_user_id` (index mình đã tạo ở trên với các khóa ngoại) để thực hiện truy vấn. Tốc độ truy vấn khá nhanh chỉ `4.19ms`.

![](https://images.viblo.asia/ea36075e-1e10-4f48-8936-e875497d356b.png)

Khi mình chỉ nhập `thời gian` thì thời gian truy vấn nó lại tăng lên thành `646ms`. 

![](https://images.viblo.asia/558094a8-712b-4d16-9f23-5e4c0fca2cb5.png)

Lý do lại cột `created_at` chưa được tạo index nên mysql phải duyệt toàn bộ bản ghi của bảng để tìm các giá trị phụ hợp với ngày ta nhập vào. Tạo thêm index cho cột `created_at` thì tốc độ lại được cải thiện hơn.

Khi mình vừa chọn user vừa nhập thời gian thì tốc độ truy vấn cũng rất nhanh chỉ mất `1.63ms`. Không phải cứ nhiều điều kiện thì tốc độ sẽ giảm đâu nhé. :). Xem trong `explain` câu truy vấn thì cả 2 index (`idx_posts_user_id`, `idx_posts_created_at`) mình tạo trong bảng posts đều được sử dụng. Vậy có thể nhanh hơn nữa không? Tất nhiên là có. Mình sẽ tạo `index` cho cả 2 cột `user_id` và `created_at`.

```sql
CREATE INDEX idx_posts_user_id_created_at ON posts (user_id, created_at)
```

Kết quả chúng ta nhận được

![](https://images.viblo.asia/42d56551-bf02-4c28-b249-68ff48226896.png)

Câu truy vấn chỉ còn `680us` để thực hiện (chưa đến 1ms). Nếu bỏ tất cả index đi thì câu truy vấn phải mất `766ms` để hoàn thành. Kết quả thật khả quan phải không các bạn. Tuy nhiên như mình nói ở trên. Nếu tạo nhiều index thì thời gian để thực hiện các câu truy vấn ghi dữ liệu sẽ lâu do mysql phải làm thêm một thao tác nữa là cập nhật lại dữ liệu index. Tùy theo yêu cầu thực tế của dự án mà bạn có thể sử dụng index cho phù hợp. Thông thường các trường cần tạo index sẽ là các điều kiện trong mệnh đề where của câu truy vấn.

## Tạo index trong laravel

Trong laravel việc tạo index rất đơn giản. 

Để tạo index cho một cột

```php
Schema::table('posts', function(Blueprint $table) {
    $table->unsignedInteger('user_id')->index();
});
```

Tạo index cho nhiều cột thì ta dùng cú pháp

```php
Schema::table('posts', function(Blueprint $table) {
    $table->index(['user_id', 'created_at']);
});
```

# Kết luận
Trên đây là chia sẻ của mình về lợi ích của index và cách sử dụng index để tăng tốc câu truy vấn. Bài viết của mình xin kết thúc tại đây. Hi vọng sẽ giúp ích được cho các bạn. Nếu bạn thấy hay thì hãy upvote và chia sẻ cho bạn bè cùng đọc. Đừng quên Follow mình để nhận được thông báo khi mình có bài viết mới nhé. Chúc các bạn có một ngày tốt lành!