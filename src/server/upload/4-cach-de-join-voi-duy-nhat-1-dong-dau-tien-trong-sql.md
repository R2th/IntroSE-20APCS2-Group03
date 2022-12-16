Để dễ hình dung, chúng ta có bài toán sau: lấy ra danh sách các user và widget gần nhất mà mỗi user đó tạo ra. Ta sẽ có bảng users và bảng widgets, mỗi user sẽ có nhiều widget. `users.id` là khóa chính của bảng users, `widgets.user_id` khóa ngoại tương ứng trong bảng widgets.
Để giải quyết vấn đề trên, chúng ta cần join với duy nhất 1 dòng đầu tiên, có nhiều cách để làm được việc đó. Dưới đây là 1 vài kỹ thuật khác nhau và khi nào nên sử dụng chúng.

### Sử dụng các truy vấn tương quan khi khóa ngoại được lập chỉ mục. 

Các truy vấn con tương quan là các truy vấn con phụ thuộc vào truy vấn bên ngoài. Nó giống như một vòng lặp for trong SQL. Truy vấn con sẽ chạy một lần cho mỗi hàng trong truy vấn bên ngoài:

```
select * from users join widgets on widgets.id = (
    select id from widgets
    where widgets.user_id = users.id
    order by created_at desc
    limit 1
)
```

Lưu ý widget.user_id = users.id trong truy vấn con. Nó truy vấn bảng widget một lần cho mỗi hàng user và chọn hàng widget gần đây nhất của user đó. Sẽ rất hiệu quả nếu user_id được lập chỉ mục và có ít user.

![](https://images.viblo.asia/d76b0acb-47a3-4114-b2c4-e8ef006fd435.png)

### Sử dụng một truy vấn hoàn chỉnh khi bạn không có chỉ mục

Các truy vấn con tương quan bị phá vỡ khi khóa ngoại không được lập chỉ mục, bởi vì mỗi truy vấn con sẽ yêu cầu quét toàn bộ bảng.
Trong trường hợp đó, chúng ta có thể tăng tốc mọi thứ bằng cách viết lại truy vấn để sử dụng một truy vấn con duy nhất, chỉ quét bảng widget một lần:

```
select * from users join (
    select distinct on (user_id) * from widgets
    order by user_id, created_at desc
) as most_recent_user_widget
on users.id = most_recent_user_widget.user_id
```

Truy vấn con mới này trả về một danh sách các widget gần đây nhất, một widget tương ứng với 1 user. Sau đó chúng ta join vào bảng user để lấy danh sách mình cần.

![](https://images.viblo.asia/d1be1911-8216-4e77-91d7-32cf8491c963.png)

Chúng ta đã sử dụng cú pháp [DISTINCT ON](http://www.postgresql.org/docs/9.3/static/sql-select.html#SQL-DISTINCT) của Postgres để dễ dàng truy vấn chỉ một widget cho mỗi user_id . Nếu cơ sở dữ liệu của bạn không hỗ trợ một cái gì đó như DISTINCT ON , bạn có hai tùy chọn sau:

### Sử dụng các truy vấn con lồng nhau nếu bạn có cột ID đã được order

Trong ví dụ của chúng ta, hàng gần đây nhất luôn có giá trị `id` cao nhất. Điều này có nghĩa là ngay cả khi không có `DISTINCT ON` , chúng ta vẫn có thể gian lận với các truy vấn con lồng nhau như thế này:

```
select * from users join (
    select * from widgets
    where id in (
        select max(id) from widgets group by user_id
    )
) as most_recent_user_widget
on users.id = most_recent_user_widget.user_id
```

Chúng ta bắt đầu bằng cách chọn danh sách ID đại diện cho widget gần đây nhất của mỗi user. Sau đó, chúng ta lọc bảng widget chính cho các ID đó. Điều này mang lại cho chúng ta kết quả tương tự như `DISTINCT ON` do việc sắp xếp theo `id` và `created_at` xảy ra tương đương nhau.

![](https://images.viblo.asia/78a99795-defe-46e5-b9de-4e13271d877a.png)

### Sử dụng Window Functions nếu bạn cần kiểm soát nhiều hơn

Nếu bảng của bạn không có cột `id` hoặc bạn không thể phụ thuộc vào mức tối thiểu hoặc tối đa của nó là hàng gần đây nhất, hãy sử dụng `row_number` với window function. Nó phức tạp hơn một chút, nhưng linh hoạt hơn rất nhiều:

```
select * from users join (
    select * from (
        select *, row_number() over (
            partition by user_id
            order by created_at desc
        ) as row_num
        from widgets
    ) as ordered_widgets
    where ordered_widgets.row_num = 1
) as most_recent_user_widget
on users.id = most_recent_user_widget.user_id
order by users.id
```

Điều thú vị ở đây là:

```
select *, row_number() over (
    partition by user_id
    order by created_at desc
) as row_num
from widgets
```

`over (partition by user_id order by created_at desc)` chỉ định một bảng phụ, được gọi là window, mỗi `user_id` và sắp xếp các window đó theo `created_at desc` .  `row_number ()` sẽ trả về vị trí của một hàng trong window của nó. Do đó, widget đầu tiên cho mỗi `user_id` sẽ có `row_number 1`.
Trong truy vấn con bên ngoài, chúng ta chỉ chọn các hàng có `row_number` là 1. Với một truy vấn tương tự, bạn có thể nhận được hàng thứ 2 hoặc thứ 3 hoặc thứ 10 thay thế.

![](https://images.viblo.asia/8638a057-bf54-4abd-80ed-801e4469dea6.png)

Trong một bài viết trong tương lai, chúng ta sẽ đi sâu hơn về window functions và làm thế nào nó có thể thực hiện các truy vấn như thế này thậm chí còn mạnh mẽ hơn!

Mong rằng bài viết này sẽ giúp ích cho mọi người khi gặp phải bài toán tương tự

source: [https://www.periscopedata.com](https://www.periscopedata.com)