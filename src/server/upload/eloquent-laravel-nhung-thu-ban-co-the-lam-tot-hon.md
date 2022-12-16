![](https://images.viblo.asia/75d7256d-73d4-4c9e-a26b-5ac4464d68bb.jpg)


Hôm nay chúng ta sẽ cùng thảo luận Eloquent Laravel, chắc chắn bạn đã sử dụng rất nhiều Eloquent trong project của mình rồi và nó không phải điều bỡ ngỡ với nhiều Laravel developer nhưng thay vì chúng ta đang biết cách sử dụng nó thì chúng ta có thể cùng nhau nhìn sâu hơn về Eloquent ORM để xem nó có gì đó mà mình có thể làm tốt hơn được không. Nếu bạn đồng ý với mình, chúng ta sẽ đi qua những phần thú vị trong bài viết này nhé, Let's go !

### 1. Where Elegant

Đầu tiên chúng ta thử tìm kiếm data (User) theo email nhé, thông thường với cách đơn giản bạn có thể làm như sau:

`$users = User::where('email', 'anna.girlx@gmail.com')->get();`

Tất nhiên có bạn sẽ nói: Ồ tại sao không validate email được nhập vào bạn đầu mà đã query database nó sẽ không được tối ưu hay chất lượng code không được tốt đâu, v..v ĐÚNG, nhưng trong bài viết này mình sẽ chỉ đề cập đến một vài điều mới theo kinh nghiệm mà mình đã làm thôi, còn khi hoàn thiện trong project sẽ có 1 vài việc phải làm.

À bây giờ bạn hãy thử chuyển đổi câu query trên thành như này xem sao nhé:

`$users = User::whereEmail('anna.girlx@gmail.com')->get(); `

Nó sẽ vẫn trả về user có email : **anna.girlx@gmail.com**

**Bí mật:**

Bạn có thể chuyển đổi 'Email' ở sau **where** bằng bất kỳ cái tên column nào khác trong db của model User.

Thử 1 vài thao tác tìm kiếm khác nhá:

```
User::whereDate('created_at', date('Y-m-d'));
User::whereDay('created_at', date('d'));
User::whereMonth('created_at', date('m'));
User::whereYear('created_at', date('Y'));
```

### 2. Scope dùng dễ dàng

Mở rộng hơn bài toán ở phần 1 chúng ta sẽ cần tìm 1 Order trong DB mà nó đảm bảo đủ 2 điều kiện thì sao nhỉ? Và câu lệnh query này mình có thể dùng nhiều lần vì nó quan trọng.

*Order với 2 điều kiện:*

- Đã giao 
- Đã thanh toán

Cách vẫn hay dùng có thể như sau:

`$orders = Order::where('status', 'delivered')->where('paid', true)->get();`

Nhưng mình thử với 1 cái mới hơn dùng scope:

Trong Order model bạn thêm function mới như sau:

```
class Order extends Model
{
   ...
   public function scopeDelivered($query) {
      return $query->where('status', 'delivered');
   }
public function scopePaid($query) {
      return $query->where('paid', true);
   }
}
```

Để thuận tiện hơn bạn nên thay đổi một chút, thêm giá trị cần tìm cho **status** vì có thể chúng ta sẽ có nhiều status khác nhau.

```
public function scopeStatus($query, string $status) {
      return $query->where('status', $status);
   }
```

Bây giờ bạn có thể test scope trên như sau:

`$orders = Order::status('delivered')->paid()->get();`

Thử nhớ lại 1 chút từ phần 1 bạn có thể áp dụng nó cho phần này và chuyển câu lệnh trên thành:

`Order::whereStatus('delivered')->paid()->get();`

### 3. Order by

Đôi khi bạn muốn site của bạn làm nổi bật một bài viết có chủ đích hoặc đơn giản là đẩy những bài viết mới lên trên đầu, chúng ta có thể làm nó như sau:

```
public function latestPost()
{
    return $this->hasOne(\App\Post::class)->latest();
}
```

Tiếp theo:

`$post = Post::with('latestPost')->get()->sortByDesc('latestPost.created_at');`

Ồ khá đơn giản phải không bạn, bài toán trên đã được giải quyết.

### 4. When - Loại bỏ câu lệnh If - Else như thế nào

Ví dụ: Khi user của bạn cần thực hiện filter như sau:

```
if (request('filter_by') == 'likes') {
    $query->where('likes', '>', request('likes_amount', 0));
}
if (request('filter_by') == 'date') {
    $query->orderBy('created_at', request('ordering_rule', 'desc'));
}
```

**Bạn có thể đổi thành:**

```
$query = Author::query();
$query->when(request('filter_by') == 'likes', function ($q) {
    return $q->where('likes', '>', request('likes_amount', 0));
});
$query->when(request('filter_by') == 'date', function ($q) {
    return $q->orderBy('created_at', request('ordering_rule', 'desc'));
});
```


### 5. BelongsTo Tránh bị lỗi

Trong 1 bài post bạn muốn hiển thị tên tác giả:

`{{ $post->author->name }}`

Sẽ xảy ra vấn đề khi Admin lỡ xóa user này rồi, vậy bạn có thể chuyển câu lệnh trên như sau:

`{{ $post->author->name ?? 'Guest' }}`

Nó có liên quan gì đến Eloquent không và có thể làm thế nào với nó?

Bạn thực hiện function trả về Author như sau:

```
public function author()
{
    return $this->belongsTo('App\Author')->withDefault([
        'name' => 'Guest'
    ]);
}
```

### 6. Tổng kết

Trên đây là những chia sẻ và thảo luận về cách chúng ta có thể làm tốt hơn với Eloquent Laravel, mình hy vọng bài viết có thể mang lại sự ưu ích với ai đó đang cần. Phần thú vị này vẫn còn nhiều và mình có thể sẽ chia sẻ tiếp trong 1 bài viết tới đây bạn có thể theo dõi để được cập nhật mới nhé. Và nếu có đóng góp gì bạn có thể chia sẻ ở dưới comment để mình và các bạn khác cùng được học hỏi nha!