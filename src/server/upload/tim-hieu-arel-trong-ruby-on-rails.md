# Giới thiệu
Hầu hết lập trình viên Ruby On Rails đều biết đến Active Record. Đây là một trong những điểm mạnh nhất của Ruby On Rails. 
Active Record - ORM framework là một layer nằm ở giữa ngôn ngữ lập trình và database, được viết bằng một ngôn ngữ lập 
trình hướng đối tượng (như là Ruby, Python, PHP ...) giúp bạn có thể sử dụng chính ngôn ngữ lập trình đó để thao tác với 
database mà không cần viết các câu lệnh SQL dài dòng. Các object class sẽ tương ứng với các bảng dữ liệu trong database, 
và các object instance sẽ tương ứng với các record trong các bảng dữ liệu đó.

Active Record cũng có nhược điểm: trong mệnh đề WHERE Active Record chỉ hỗ trợ  các toán tử =, IN mà không có các toán tử >, <, >=...
Để khắc phục nhược điểm này mình phải viết lại phần code này bằng SQL thuần. Với nhược điểm này nó đã được khắc phục bởi Arel. 

Bản thân Arel cũng có những điểm mạnh:

* Đơn giản hóa việc tạo ra các truy vấn SQL phúc tạp
* Tương thích với nhiều loại DB

Arel cung cấp những câu truy vấn đầy đủ, dễ sử dụng tận dụng tối đa thời gian để lập trình viên tập trung xây dựng những truy vấn phức tạp.
# Arel là gì
Arel là  một SQL AST(Abstract Syntax Tree-like) cho phép chúng ta xây dựng các câu truy vấn SQL phức tạp và có thể sử dụng lại được.
Arel được thiết kế để tối ưu hoá mô hình hướng đối tượng tương thích với cơ sở dữ liệu. Arel hỗ trợ bạn thực hiện các đại số quan hệ như 
phép chiếu (projection), phép chọn (điều kiện), phép kết (join)... và nhiều phép toán khác. Mỗi ki bạn truyền 1 Hash vào phương thức where, 
nó sẻ đi qua Arel để sinh ra SQL chứ ko thực sự truy cập và truy vấn data từ database. Có thể nói Arel là nền tảng bên dưới của Active Record, 
biến những lời gọi hàm của ActiveRecord trở thành những câu SQL thực sự.


Arel  ánh xạ dữ liệu thành 1 cấu trúc tree-like
```
User.arel_tabel

=> #<Arel::Table:0x007fd42da94350
 @aliases=[],
 @columns=nil,
 @engine=
  User(id: integer, name: string),
 @name="user",
 @primary_key=nil,
 @table_alias=nil>
```


# Arel Table
Instace của class Arel::Table  sẻ trương ứng với các bảng  trong cơ sở dữ liệu. Để tạo 1 instance của Arel::Table ta có 2 cách


* Sử dụng class method của Active Record
```
User.arel_table
```


* Sử dụng constructor của class Arel::Table
```
users = Arel::Table.new(:users)
```
# Arel Attribute
Tương tự Arel Attribute sẽ đại diện cho các cột trong 1 bảng. Arel attributes có thể khởi tạo từ instance của Arel::Table bằng 
cách truyền tên cột là symbol thông qua hàm [] như get value từ hash thông thường:
```
User.arel_table[:name] # trả về instance của Arel::Attributes::Attribute của cột name trong bảng users
```

# Xây dựng query
###  Khi không dùng Arel
Giả sử chúng ta muốn viết một câu query truy vấn database lấy ra những người dùng lớn hơn hoặc bằng 69 tuổi
```
User.where("age >= 61")  
```

Điều gì xãy ra nếu câu query phứt tạp hơn. giả sữ bạn muốn lấy ra những người 69 tuổi trở lên và kèm theo số điện thoại của mỗi người. Và trường hợp người đó không có số điện thoại cũng được liệt kê ra
```
User  
  .select("users.*, phone_numbers.number")
  .joins("LEFT OUTER JOIN users on phone_numbers where user.id = phone_numbers.user_id")
  .where("users.age >= 21")
```

Câu query của chúng ta ngày càng trở nên phứt tạp hơn, chúng ta phải sử dụng ngày càng nhiều câu sql thô. và nó có vài nhược điểm như sau
* Readability: Câu truy vấn nhìn rất khó đọc bởi vì nó khá là dài. Ngoài ra điều đầy có thể dẫn đến lỗi cú pháp trong câu query bởi vì đoạn string này được biên dịch như string của Ruby chứ k phải của trình soạn thảo SQL
* Reusability: Giảm thiểu khả năng sử dụng lại câu truy vấn. Khi có muột chút sự khác biệt trong điều kiện truy vấn chúng ta phải viết lại hoàn toàn câu truy vấn khác.
###   Khi dùng Arel
```
users           = User.arel_table  
phone_numbers   = PhoneNumber.arel_table

left_outer_join = users  
                    .join(phone_numbers, Arel::Nodes::OuterJoin)
                    .on(users[:id].eq(phone_numbers[:user_id]))
                    .join_sources

User  
  .select([users[:name], phone_numbers[:number]])
  .joins(left_outer_join)
  .where(users[:age].gteq(21).and(phone_numbers[:area_code].eq("212")))
```

Arel cho phép chúng t chia nhỏ câu query thành nhiều sub-queries để tái sử dụng ở nhiều nơi khác.
Tiếp theo chúng ta sẻ lướt qua một số điểm hửu ích nữa của Arel
* So sánh với toán tử: >=, <=, >, <

```
users.where(users[:age].gteq(69)) # SELECT * FROM users WHERE users.age >= 69

users.where(users[:age].lteq(69)) # SELECT * FROM users WHERE users.age <= 69

users.where(users[:age].gt(69)) # SELECT * FROM users WHERE users.age > 69

users.where(users[:age].lt(69)) # SELECT * FROM users WHERE users.age < 69
```
* Toán tử OR

```
users.where(users[:age].gt(10)).or(users[:age].lt(20))
```
* Join bảng
```
# Inner join
users.join(posts).on(users[:id].eq(posts[:user_id])) # => SELECT * FROM users INNER JOIN posts ON users.id = posts.user_id

# Left join
users.join(posts, Arel::Nodes::OuterJoin).on(users[:id].eq(posts[:user_id])) # => SELECT FROM users LEFT OUTER JOIN photos ON users.id = posts.user_id
```

* Các function AVG, SUM, COUNT, MIN, MAX, HAVING

```
posts.group(posts[:user_id]).having(posts[:id].count.gt(5)) # => SELECT FROM posts GROUP BY posts.user_id HAVING COUNT(posts.id) > 5

users.project(users[:age].sum) # => SELECT SUM(users.age) FROM users

users.project(users[:age].average) # => SELECT AVG(users.age) FROM users

users.project(users[:age].maximum) # => SELECT MAX(users.age) FROM users

users.project(users[:age].minimum) # => SELECT MIN(users.age) FROM users

users.project(users[:age].count) # => SELECT COUNT(users.age) FROM users
```

* LIMIT và OFFSET
```
users.take(5) # SELECT  FROM `users` LIMIT 5

users.skip(5).take(5) # SELECT  FROM `users` LIMIT 5 OFFSET 5 
```
* Truy vấn với &, |, ^, <<, >>
```
users.where((users[:age] & 21).gt(0)))
# => SELECT * FROM "users"  WHERE ("users"."age" & 21) > 0

users.where((users[:age] | 21).gt(0)))
# => SELECT * FROM "users"  WHERE ("users"."age" | 21) > 0

users.where((users[:age] ^ 21).gt(0)))
# => SELECT * FROM "users"  WHERE ("users"."age" ^ 21) > 0

users.where((users[:age] << 1).gt(0)))
# => SELECT * FROM "users"  WHERE ("users"."age" << 1) > 0

users.where((users[:age] >> 1).gt(0)))
# => SELECT * FROM "users"  WHERE ("users"."age" >> 1) > 0

users.where((~ users[:age]).gt(0)))
# => SELECT * FROM "users" WHERE  ~ "users"."age" > 0
```
* LIKE
```
User.where(User.arel_table[:name].lower.matches("Bob".downcase))
```

# Ưu điểm của Arel
* Tính đáng tin cậy: Khi join nhiều bảng có nhiều cột trùng tên (vd: id, created_at, updated_at,..) rất dễ xảy ra lỗi “ambiguous column reference”. Arel giảm thiểu tối đa việc xảy ra lỗi này.
* Tính đơn giản: Arel cho phép câu query được chia nhỏ thành những đoạn code ngắn và dễ maintenance hơn
* Tính linh hoạt: Việc build các câu query bằng các method đã được tạo sẵn của Arel sẽ đơn giản và dễ dàng nhẹ nhàng hơn rất nhiều cho người viết so với việc ngồi cộng chuỗi (string concatenation) hay nội suy chuỗi ( string interpolation) để tạo nên chuỗi raw SQL
# Kết luận
Có thể thấy viết query sử dụng Arel khá dễ dàng và minh bạch. Lập trình viên hoàn toàn có thể quên đi những câu SQL dài dòng và phức tạp, tận dụng thời gian để xây dựng những câu query lớn hơn. 
Nguồn tham khảo http://radar.oreilly.com/2014/03/just-enough-arel.html