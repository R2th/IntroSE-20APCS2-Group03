## Giới thiệu
[Arel](https://github.com/rails/arel) là công cụ quản lý SQL abstract syntax tree (AST) cho Ruby với mục đích:

1.  Đơn giản hóa việc tạo ra các truy vấn SQL phức tạp, và
2.  Thích ứng với các RDBMS khác nhau.

Với Arel, chúng ta có thể sử dụng đầy đủ sức mạnh của SQL, mà không cần phải viết những câu query bằng string thông thường dễ gây nhầm lẫn.
Arel có rất nhiều tính năng mạnh mẽ mà có lẽ đã có nhiều người từng sử dụng như **select manager**, **comparison operators**  (`=`,` !=`, `<`,` >`, `<=`, `>=`, `IN`),  **join**,  **like**, ...  Trong bài viết này mình sẽ giới thiệu thêm cho mọi người làm thế nào chúng ta có thể gọi một hàm native trong database và cách xây dựng câu truy vấn với `union` và `intersects` với **Arel**
## Named Functions

Với rất nhiều helper method được cung cấp bởi framework, chúng ta thường quên mất sức mạnh của cơ sở dữ liệu. Nó thường mang lại hiệu năng cao hơn khi để cho cơ sở dữ liệu xử lí các công việc tính toán và biến đổi, nhưng chỉ với **ActiveRecord** thuần túy có lẽ là không đủ. Tuy vậy **Arel** đã mang lại cho ta giải pháp.

Giả sử chúng ta cần trường `title` dưới dạng MD5 của tất cả các bản ghi từ bảng `posts`. Đây là SQL cuối cùng mà ta mong đợi:
```
SELECT posts.*, md5(posts.title) AS md5_title FROM posts;
```

Để làm làm được như này với **Arel** chúng ta cần sử dụng `Arel::Nodes::NamedFunction`. Lớp `NamedFunction` cần 3 tham số là tên database function, danh sách tham số dưới dạng mảng để truyền vào function ấy, cuối cùng bí danh cho trường

Code Ruby tạo ra lệnh SQL gọi hàm md5 sau:
```rb
Arel::Nodes::NamedFunction.new("md5", [Post.arel_table[:title]], "md5_title")
```

Khi dùng `to_sql` kết quả đoạn code trên sẽ là:
```
md5("posts"."title") AS md5_title
```

Chức năng đặt tên cũng có thể được lồng vào nhau để thực hiện một loạt thao tác trên dữ liệu. Ví dụ: nếu chúng ta muốn thực hiện chuyển `title` của bảng `posts` thành chữ thường sau đó mới MD5, điều đó có thể làm như sau:
```rb
lower_title = Arel::Nodes::NamedFunction.new("lower", [Post.arel_table[:title]])
 
Arel::Nodes::NamedFunction.new("md5", [lower_title], "md5_title")
```

Và đây là đoạn SQL kết quả:
```
md5(lower("posts"."title")) AS md5_title
```

Sử dụng phương thức `select` trên `Post` , chúng ta có thể xác định các trường chúng ta muốn lấy ra - trong trường hợp này tất cả các trương và kết quả của trường được MD5 . Và đây là kết quả:
```rb
Post.select(
  Post.arel_table[Arel.star],
  Arel::Nodes::NamedFunction.new("md5", [Post.arel_table[:title], "md5_title")
)
```
## Unions
Chắc hẳn đã có nhiều lần bạn cần kết hợp dữ liệu của 2 câu truy vấn lại với nhau(ví dụ như `union`) hoặc dữ liệu chung của 2 câu truy vấn(ví dụ như `intersect`). Giống như SQL, Arel có thể làm điều đó.

Trong cả hai trường hợp, sử dụng `union` hoặc `intersect` là đơn giản, dễ dàng, quá trình thực hiện chia thành hai phần: định nghĩa `union`, và thực thi `union`.

### Defining the Union
Để tạo `union`, chúng ta cần phải biết hai đối tượng `ActiveRecord :: Relation` mà chúng ta muốn thực hiện. Đối tượng đầu tiên sẽ gọi phương phức `union` với đối số là đối tượng `ActiveRecord::Relation` thứ 2

```rb
# Đây chỉ là ví dụ cho việc sử dụng union. Thực tế trong trường hợp này các bạn thể sử dụng or để thay thế
new_and_updated = Post.where(:published_at => nil).union(Post.where(:draft => true))
```
Những gì được trả về không phải là đối tượng `ActiveRecord :: Relation`, đó là một đối tượng `Arel :: Nodes :: Union`, vì vậy các thao tác xử lý như `each` hoặc gọi scope chain đi sau sẽ không được thực hiện. Chúng ta sẽ chuyển sang bước thư 2.

### Executing the Union
Khi mà ta đã có `union` đối tượng , ta cần thực thi nó để truy cập vào dữ liệu. Để làm điều đó chúng ta phải truyền đối tượng này sang mô hình Post như một "table alias".

```
post = Post.arel_table
Post.from(post.create_table_alias(new_and_updated, :posts))
```
Bước cuối cùng này trả về đối tượng `ActiveRecord :: Relation` mà chúng ta muốn, cho phép chúng ta lặp nó.
Khi không muốn loại bỏ các bản ghi trùng lặp ở 2 câu truy vấn, chúng ta có thể truyền `:all` như là tham số đầu tiên của phương thức `union`, để đưa ra câu lệnh `UNION ALL`
```
new_and_updated = Post.where(:published_at => nil).union(:all, Post.where(:draft => true))
```
Ngoài ra, thực hiện giao giữa 2 câu truy vấn thay vì hợp chỉ đơn thay đổi `union` thành `intersect`.
```
new_and_updated = Post.where(:published_at => nil).intersect(Post.where(:draft => true))
```
## Lời kết
Mục đích của thư viện Arel là "đơn giản hóa việc tạo ra các truy vấn SQL phức tạp" với Ruby. Nó có thể dễ dàng thực hiến các tính năng như so sánh, `join` nhiều bảng, xây dựng `union` và `intersect`. **Arel** cung cấp hầu như tất cả mọi thứ thiếu từ **ActiveRecord**. 
Hi vọng với những lợi ích mà Arel mang lại sẽ giúp các mọi người có thêm sự lựa chọn khi đối mặt với các vấn đề khi làm việc với **Rails** và **ActiveRecord**

## References
http://radar.oreilly.com/2014/05/more-than-enough-arel.html