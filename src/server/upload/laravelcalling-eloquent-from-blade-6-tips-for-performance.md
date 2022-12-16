Một trong những vấn đề phổ biến nhất về hiệu suất  mà tôi đã thấy trong Laravel là sử dụng các phương thức (method) và quan hệ (relationship) Eloquent từ Blade, tạo ra các vòng lặp và truy vấn bổ sung không cần thiết. Trong bài viết này, tôi sẽ chỉ ra các kịch bản khác nhau và cách xử lý chúng hiệu quả.

<br>

### Scenario 1: Loading belongsTo() Relationship: don’t forget Eager Loading

<br>

Có lẽ, trường hợp điển hình nhất - bạn looping với ```@foreach``` thông qua các records và trong một số cột bạn cần hiển thị bản ghi gốc của nó với một số trường.

```
@foreach ($sessions as $session)
<tr>
  <td>{{ $session->created_at }}</td>
  <td>{{ $session->user->name }}</td>
</tr>
@endforeach
```

Và, dĩ nhiên, session phụ thuộc (belongs to) vào user, trong ```app/Session.php``` :


```
public function user()
{
    return $this->belongsTo(User::class);
}
```

Bây giờ, Code có thể trông vô hại và chính xác, nhưng tùy thuộc vào controller code, chúng ta có thể có một vấn đề hiệu năng rất lớn ở đây.

Cách sai trong Controller:

```
public function index()
{
    $sessions = Session::all();
    return view('sessions.index', compact('sessions');
}
```

Cách đúng :

```
public function index()
{
    $sessions = Session::with('user')->get();
    return view('sessions.index', compact('sessions');
}
```

Để ý sự khác biệt? Chúng ta đang loading relationship với truy vấn main Eloquent, nó được gọi là [Eager Loading](https://laravel.com/docs/5.8/eloquent-relationships#eager-loading)

Nếu chúng ta không làm điều đó, vòng lặp foreach trong Blade của chúng ta sẽ gọi một truy vấn SQL cho mỗi session, yêu cầu user của nó trực tiếp từ cơ sở dữ liệu trong mỗi vòng lặp. Vì vậy, nếu bạn có một bảng có 100 session, thì bạn sẽ có 101 truy vấn - 1 cho session list và 100 cho user related.

Vì vậy, đừng quên sử dụng ```Eager Loading```.

<br>

### Scenario 2: Loading hasMany() Relationship

<br>

Một kịch bản điển hình khác là bạn cần liệt kê tất cả các mục con trong vòng lặp của các bản ghi cha.

```
@foreach ($posts as $post)
<tr>
  <td>{{ $post->title }}</td>
  <td>
    @foreach ($post->tags as $tag)
      <span class="tag">{{ $tag->name }}</span>
    @endforeach
  </td>
</tr>
@endforeach
```

Đoán xem - điều tương tự áp dụng ở đây. Nếu bạn không sử dụng Eager Loading, thì mỗi post sẽ có một request đến cơ sở dữ liệu.

Vì vậy, trong Controller của bạn, bạn nên làm điều này:

```
public function index()
{
    $posts = Post::with('tags')->get(); // not just Post::all()!
    return view('posts.index', compact('posts'));
}
```

### Scenario 3. NOT Using Brackets in hasMany() Relationship

<br>

Hãy để tưởng tượng bạn có một Poll với votes và muốn hiển thị tất cả các polls với votes họ có.

Tất nhiên, bạn đang thực hiện Eager Loading trong Controller:

```
public function index()
{
    $polls = Poll::with('votes')->get();
    return view('polls', compact('polls'));
}
```

Và sau đó trong Blade file bạn đang hiển thị nó như sau:

```
@foreach ($polls as $poll)
    <b>{{ $poll->question }}</b> 
    ({{ $poll->votes()->count() }})
    <br />
@endforeach
```

Có vẻ ổn, phải không? Nhưng để ý ```->votes()```, với dấu ngoặc. Nếu bạn để nó như thế này, thì **VẪN** sẽ có một query cho mỗi poll. Bởi vì nó không nhận được dữ liệu relationship được tải, thay vào đó, nó gọi method từ Eloquent một lần nữa.

Vì vậy hãy thực hiện việc này: ```{{$ poll-> phiếu-> Count ()}}```. Không có dấu ngoặc.

Và, nhân tiện, cùng áp dụng cho ```belongsTo``` relationship. Không sử dụng dấu ngoặc trong khi load các relationships trong Blade.

**Offtopic**: trong khi lướt StackOverflow, tôi đã thấy các ví dụ thực sự thậm chí còn tồi tệ hơn về nó. Giống như: ```{{ $poll->votes()->get()->count() }}``` hoặc ```@foreach ($poll->votes()->get() as $vote) …```. Hãy thử điều đó với [Laravel Debugbar](https://github.com/barryvdh/laravel-debugbar) và xem số lượng SQL query.


### Scenario 4. What if Relationship May Be Empty?

<br>

Một trong những lỗi phổ biến nhất trong Laravel là ```“trying to get property of non-object”```, bạn đã thấy nó trước đây trong các dự án của mình chưa? (thôi nào, đừng nói dối)

Thông thường nó đến từ một cái gì đó như thế này:

```
<td>{{ $payment->user->name }}</td>
```

Không có gì đảm bảo rằng ```user``` của ```payment``` đó tồn tại. Có lẽ nó đã bị ```soft-deleted```? Có thể thiếu ```foreign key``` trong cơ sở dữ liệu, cho phép ai đó xóa người dùng vĩnh viễn?

Bây giờ, giải pháp phụ thuộc vào phiên bản ```Laravel/PHP```. Trước Laravel 5.7, cú pháp điển hình hiển thị default value là:

```
{{ $payment->user->name or 'Anonymous' }}
```

Từ Laravel 5.7, [nó thay đổi syntax](https://laravel-news.com/blade-templates-null-coalesce-operator) theo PHP operator thông thường đã được giới thiệu trong PHP 7:

```
{{ $payment->user->name ?? 'Anonymous' }}
```

Nhưng bạn có biết bạn cũng có thể gán giá trị mặc định ở cấp độ Eloquent không?

```
public function user()
{
    return $this->belongsTo(User::class)->withDefault();
}
```

Phương thức ```withDefault()``` này sẽ trả về empty model của class User, nếu relationship không tồn tại.

Không chỉ vậy, bạn cũng có thể fill vào default model đó bằng các giá trị!

```
public function user()
{
    return $this->belongsTo(User::class)
      ->withDefault(['name' => 'Anonymous']);
}
```

### Scenario 5. Avoiding Where Statements in Blade with Extra Relationships

<br>

Đã bao giờ bạn thấy code trong Blade như sau:

```
@foreach ($posts as $post)
    @foreach ($post->comments->where('approved', 1) as $comment)
        {{ $comment->comment_text }}
    @endforeach
@endforeach
```

Vì vậy, bạn có thể filter các comment (eager loading, dĩ nhiên, phải không?) Với một điều kiện khác ```where(‘approved’, 1)```

Nó hoạt động và nó không gây ra bất kỳ vấn đề nào về hiệu năng, nhưng sở thích cá nhân của tôi (và cả nguyên tắc MVC) nói rằng logic phải nằm ngoài View, ở đâu đó, tốt, "logic" layer. Đó có thể là Eloquent model, nơi bạn có thể chỉ định ```separate``` relatopnship cho các approved comments trong ```app/Post.php```.

```
public function comments()
{
    return $this->hasMany(Comment::class);
}

public function approved_comments()
{
    return $this->hasMany(Comment::class)->where('approved', 1);
}
```

Và sau đó bạn load relationship đặc biệt này trong ```Controller/Blade```

```
$posts = Post::with(‘approved_comments’)->get();
```

### Scenario 6. Avoiding Very Complex Conditions with Accessors

<br>

Gần đây trong một dự án tôi có một task: liệt kê các jobs, với envelope icon cho các mesage và với price cho job nên được lấy **LAST** message có chứa price đó. Nghe có vẻ phức tạp. Nhưng này, đời thực cũng khá phức tạp!

Trong code đầu tiên tôi đã viết một cái gì đó như thế này:

```
@foreach ($jobs as $job)
    ...
    @if ($job->messages->where('price is not null')->count())
        {{ $job->messages->where('price is not null')->sortByDesc('id')->first()->price }}
    @endif
@endforeach
```
Oh, kinh hoàng. Tất nhiên, bạn cần kiểm tra xem price có tồn tại hay không, sau đó lấy last message với price đó, nhưng, nó không nên có trong Blade.

Vì vậy, tôi đã kết thúc bằng cách sử dụng [Accessor method](https://laravel.com/docs/5.8/eloquent-mutators#defining-an-accessor) trong Eloquent và định nghĩa nó trong ```app/Job.php```:

```
public function getPriceAttribute()
{
    $price = $this->messages
        ->where('price is not null')
        ->sortByDesc('id')
        ->first();
    if (!$price) return 0;

    return $price->price;
}
```

Dĩ nhiên, với những tình huống phức tạp như vậy, nó cũng dễ dàng dẫn tới vấn đề query N + 1 hoặc chỉ tình cờ khởi động các query nhiều lần. Vì vậy, vui lòng sử dụng Laravel Debugbar để tìm lỗ hổng.

Ngoài ra, tôi có thể đề xuất một package có tên là  [Laravel N+1 Query Detector](https://laravel-news.com/laravel-query-detector).

**Bonus**. Tôi muốn để lại cho bạn ví dụ tồi tệ nhất về code mà tôi đã thấy trên Laracasts, trong khi nghiên cứu chủ đề này. Ai đó muốn lời khuyên cho code dưới đây. Thật không may, code như thế này được nhìn thấy trong các dự án live quá thường xuyên. Bởi vì, tốt, nó hoạt động được (Đừng thử nó ở nhà)

```
@foreach($user->payments()->get() as $payment)
<tr>
    <td>{{$payment->type}}</td>
    <td>{{$payment->amount}}$</td>
    <td>{{$payment->created_at}}</td>
    <td>
        @if($payment->method()->first()->type == 'PayPal')
            <div><strong>Paypal: </strong> 
            {{ $payment->method()->first()->paypal_email }}</div>
        @else
            <div><strong>Card: </strong>
            {{ $payment->payment_method()->first()->card_brand }} **** **** **** 
            {{ $payment->payment_method()->first()->card_last_four }}</div>
        @endif
    </td>
</tr>
@foreach
```

Nguồn: https://laraveldaily.com/calling-eloquent-from-blade-6-tips-for-performance/