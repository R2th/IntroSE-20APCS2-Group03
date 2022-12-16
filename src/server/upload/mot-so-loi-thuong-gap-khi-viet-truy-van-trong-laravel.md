# Mở đầu:
`Laravel` là một `framework` khá phổ biến và rất mạnh mẽ. Nó sẽ hỗ trợ tận răng cho chúng ta các chức năng để xây dựng nên `application` cơ bản một cách rất linh động. 
Nhưng `framework` vẫn luôn là **con dao hai lưỡi**. Nó sẽ trở thành công cụ tuyệt vời với người hiểu và biết cách sử dụng. Nhưng cũng chứa những cái bẫy làm cho **hệ thống chậm chạp thậm chí là quá tải và chết server** :( . Hôm nay tôi xin giới thiệu 1 số lỗi thường gặp khi truy vấn trong `laravel`.
# orWhere:
`orWhere` trong `laravel` khi được biên dịch thành `sql` thì nó chính là mệnh đề `AND`. Đến đây có thể nhiều bạn sẽ nghĩ: "Xì! Đơn giản v~ có gì đâu mà sợ". Từ từ đã hãy xem ví dụ sau của tôi đã nhé.
Tôi có bảng `users` như sau:

| name | status |created_at |
| -------- | -------- | -------- | -------- |

Bây giờ tôi muốn lấy ra tất cả `users`  có `status = 0`  hoặc là user có  `status = 1`  và  `created_at` phải nhỏ hơn hiện tại.
Có lẽ sẽ có bạn hì hục viết query  sau: 
```
    User::where(status, 0)
        ->orWhere(status, 1)
        ->orWhere('created_at', '<', now());
```
Vẫn chạy bình thường và cho ra kết quả chưa thấy có lỗi gì. Nhưng...Một ngày đẹp trời không nắng không mưa, QA log một bug liên quan đến việc data hiện thị sai. Bạn còn chưa hiểu chuyện gì xảy ra (khoc2). 

Quay lại câu hỏi nhé `status = 0`  hoặc là user có  `status = 1`  và  `created_at` phải nhỏ hơn hiện tại. Nếu chúng ta chuyển câu này thành một  **biểu thức logic** thì nó có nghĩ như sau: 
```
status == 0 || (status == 1 && created_at < now())
```
Cùng nhìn lại câu query ta vừa mới viết dưới góc độ  một **biểu thức logic** nhé :
```
status == 0 || status == 1 || created_at < now().
```

*Sai quá sai rồi...! (khoc)*. Rất may chúng ta có khái niệm `closure`, sử dụng `closure` để viết  câu query bằng cách nhóm các điều kiện cùng `level` lại với nhau.

Truy vấn đúng: 
``` 
 User::where(status, 0)
     ->orWhere(function ($query) {
            return $query->where('status', 1)
                ->where('created_at', '<', now());
      });
```

**Kết luận**: *Để viết điều kiện `where`  một cách chính xác, chúng ta nên xác định được `level` của các điều kiện `where`, `AND`, `OR` bằng cách chuyển chúng thành một biểu thức logic trước khi viết query*.
# WhereHas:
Đầu tiên, hãy trả lời cho câu hỏi `whereHas` là gì ? Nếu bạn từng sử dụng nó chắc hẳn cũng biết `whereHas`  là câu lệnh `where exists()` trong `sql`. Nó rất tiện lợi khi có thể kết hợp với `relation` trong `laravel`.

VD:
Giả sử chúng ta có 2 bảng là `users` và `posts`. Trong đó, `user` với `post` quan hệ `1-n` (*1 user có thể có n post*). Yêu câu bây giờ là viết query lấy ra các bản ghi `user` đã tồn tại bài `post`.
```
User::whereHas('posts')->get();
```
Easy game nhỉ :D. Mọi chuyện vẫn ổn cho đến khi chúng ta có khoảng 50k  ghi trong bảng `posts`. Trang load chậm như :turtle: vậy. Nếu có nhiều truy cập tới server cùng lúc thậm chí có thể gây quá tải server. Vậy vấn đề ở đây là gì ?

Nếu debug query (có thể dùng tool như `debugbar`), ta có thể dễ dàng thấy câu  vấn `sql` có dạng như sau: 

`select * from users where exists(select * from post where user_id = ?)`

Dễ dàng có thể thấy được mỗi lần lấy ra 1 bản ghi `user` thì chúng ta lại phải duyệt qua bảng `posts` một lần để xem có tồn tại bản ghi `post` nào thoả mãn với điều kiện trên không. Dẫn đến thời gian query lâu và `performance` thật tệ.

Giải pháp cho vấn đề này là gì ?
Sử dụng `join` để thay thế cho `whereHas`. Tối ưu lại query như sau : 

`User::join(posts, 'posts.user_id', '=', 'users.id')->get()`

**Kết luận**: *Không bao giờ sử dụng `whereHas` thay vào đó hay sử dụng `join`*.

# ORM:
ORM(Object Relational Mapping) bản chất là 1 object được maping từ database chứa các attribute và operations.
Chi tiết các bạn có thể đọc thêm [tại đây](https://viblo.asia/p/object-relational-mapping-djeZ1PQ3KWz).

Vì chúng ta luôn phải mất thêm 1 quá trình khởi tạo `object` nên dù ít dù nhiều cũng sẽ ảnh hưởng tới `performance`. Và nó thực sự là 1 vấn đề nếu lượng  liệu bạn cần xử lý lớn.

**Kết luận**: *Bỏ qua `QRM` cho những truy vấn với lượng  liệu lớn, thay vào đó nên sử dụng `query builder`.*
# N+1 Query:
Và vấn đề cuối cùng tôi muốn nhắc đến chính là `n+1` query. Đây là một vấn đề có thể nói là **kinh điển**  gây ra hiệu năng tệ cho một `aplication`. 
Cùng tìm hiểu ví dụ sau nhé: 
```
$users = User::all()

foreach($users as user) {
    $user->posts();
}
```
Mỗi lần dòng lệnh `$user->posts();` được thực thi thì hệ thống sẽ gọi 1 truy vấn `select * from post where id = ?` để lấy  dữ liệu. 

Và nếu có n vòng lặp thì cần `n+1`  truy vấn để lấy ra liệu cần hiển thị.

Giải pháp: Chúng ta sẽ sử dụng tính năng [eager loading](https://laravel.com/docs/5.8/eloquent-relationships#eager-loading) khi lấy hết tất cả bản ghi `post` cần thiết trước với câu lệnh `with`:

`$users = User::with('posts')->all()`

Trong ví dụ trên, `Laravel` sẽ thực thi đúng 2 câu truy vấn, bất kể số lượng bài viết. Truy vấn đầu tiên sẽ vẫn lâý ra hết các `user` và truy vấn thứ hai sẽ tìm lấy ra cả các `post` có liên quan.
Bây giờ, thay vào đó, truy vấn của lấy ra posts sẽ giống như sau:
```
select * from post where id in (?, ?, ?, ?...)
```
**Kết luận**: *Nên suy nghĩ `output` cần những thông tin gì ? Sử dụng `eager load` để load chúng ra trước*.
# Lời kết:
Bằng kiến thức hạn hẹp của mình, tôi đã đưa ra 1 số lỗi thường gặp trong viết truy vấn trong laravel. Nếu có gì thiếu sót mong các bạn comment để tôi có thể bổ sung, cải thiện chất lượng baì viết. Xin cảm ơn và hẹn gặp lại.