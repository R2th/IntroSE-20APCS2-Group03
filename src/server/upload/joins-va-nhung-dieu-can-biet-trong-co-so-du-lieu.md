Lần đầu tiên nghe đến JOIN, mình đã nghĩ nó là cái gì đó cao siêu và hoành tráng lắm. Nhưng sau một hồi đọc rồi hiểu các kiểu về JOIN, thì mới nhận ra rằng nó chính là những truy vấn dữ liệu mà mình vẫn hay làm thường ngày, nhưng chỉ có điều là nó làm ngắn gọn và tăng tốc độ truy vấn lên thôi.
"Chỉ có điều" ư? Không đâu! Làm ngắn gọn và tăng tốc độ truy vấn là giải quyết được một vấn đề khá to lớn đấy. 

# Join là gì?
Là một mệnh đề trong SQL, sử dụng để kết nối dữ liệu từ hai hay nhiều bảng trong cơ sở dữ liệu lại với nhau. Khi bạn cần truy vấn các cột dữ liệu từ nhiều bảng khác nhau để trả về trong cùng một tập kết quả, bạn cần dùng JOIN, SQL sẽ tạo ra một bảng tạm thời chứa dữ liệu kết quả từ JOIN.
# Vai trò của join?
Ta xét ví dụ sau: Một mối quan hệ rất đơn giản giữa các thực thể trong một dự án Ruby on Rails:
```
class User
  has_many :books
end
```
```
class Book
  belongs_to :user
end
```
Bây giờ, điều gì sẽ xảy ra khi cố gắng để có được user cho mỗi book?
```
books = Book.all
user_names = books.map { |book| book.user.name }
```
Hãy nhìn vào console để xem điều gì xảy ra:
```
Book Load (0.7ms)  SELECT "books".* FROM "books"
User Load (0.2ms)  SELECT  "users".* FROM "users"  WHERE "users"."id" = ? LIMIT ?  [["id", 1], ["LIMIT", 1]]
User Load (0.1ms)  SELECT  "users".* FROM "users"  WHERE "users"."id" = ? LIMIT ?  [["id", 2], ["LIMIT", 1]]
User Load (0.1ms)  SELECT  "users".* FROM "users"  WHERE "users"."id" = ? LIMIT ?  [["id", 3], ["LIMIT", 1]]
```
Dễ dàng thấy ra đây là vấn đề của N + 1 query. Truy vấn ban đầu của chúng ta (1 trong N +1) trả về collection có kích thước N, và đến lượt nó chạy một truy vấn cho mỗi một trong số chúng trong database (N trong N + 1).

Với việc sử dụng joins:
```
books = Book.all
user_names = User.joins(:books)
```
và console:
```
Book Load (0.7ms)  SELECT "books".* FROM "books"
User Load (0.2ms)  SELECT  "users".* FROM "users"  INNER JOIN "books" ON "users"."id" = "books"."id"
```
Vậy là joins trong trường hợp này đã giải quyết được vấn đề N+1 query. Đó mới chỉ là một trường hợp đơn giản ở trong Rails, ngoài ra join còn có giúp ích cho chúng ta rất nhiều nữa trong các truy vấn dữ liệu. Trước tiên, ta cần phải biết có những loại join nào. 
# Các kiểu join trong SQL?
Tùy vào các tình huống khác nhau với các yêu cầu về dữ liệu khác nhau, mà ta sẽ dùng các kiểu join khác nhau. Không có sự khác biệt nhiều giữa chúng, và cũng khá dễ hiểu, cơ bản có các loại như sau:
1. INNER JOIN – trả về hàng khi có một sự phù hợp trong tất cả các bảng được join.
        ![](https://images.viblo.asia/56619ffe-1b36-49c6-8942-24ec7a129fa3.jpg)
        
Ví dụ 1: Lấy ra những Orders của Customers, ta INNER JOIN 2 bảng Orders và Customers như sau:
```
SELECT Orders.OrderID, Customers.CustomerName, Orders.Orderdate
FROM Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;
```
Trong đó bảng Orders là bảng trái vì bên trái từ khóa INNER JOIN, Customers là bảng phải. Biểu thức sau từ khóa ON cụ thể Orders.CustomerID = Customers.CustomerID là biểu thức khớp nối.

Ví dụ 2: Lấy ra các đơn hàng kèm theo tên khách hàng và tên người ship đơn hàng đó, ta INNER JOIN ba bảng Orders, Customers, Shippers: 
```
SELECT Orders.OrderID, Customers.CustomerName, Shippers.ShipperName
FROM ((Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID)
INNER JOIN Shippers ON Orders.ShipperID = Shippers.ShipperID);
```

2. LEFT JOIN
- LEFT JOIN trả về tất cả bản ghi bảng bên trái, ngay cả khi không có sự phù hợp trong bảng bên phải, còn những bản ghi nào của bảng bên phải phù hợp với bảng trái thì dữ liệu bản ghi đó được dùng để kết hợp với bản ghi bảng trái, nếu không có dữ liệu sẽ NULL.
    ![](https://images.viblo.asia/9bd10733-7668-411c-b45d-13edfe111abc.jpg)
```
SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
LEFT JOIN Orders ON Customers.CustomerID = Orders.CustomerID
ORDER BY Customers.CustomerName;
```

3. RIGHT JOIN – trả về tất cả các hàng từ bảng bên phải, ngay cả khi không có sự phù hợp nào ở bảng bên trái.
- Trường hợp này hoạt động giống với LEFT JOIN theo chiều ngược lại.

4. FULL JOIN – trả về hàng khi có một sự phù hợp trong một trong các bảng.
- Xét tất cả các kết quả, với SQLite không hỗ trợ (có thể thay thế bằng LEFT JOIN kết hợp với UNION)
```
SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
FULL OUTER JOIN Orders ON Customers.CustomerID = Orders.CustomerID
ORDER BY Customers.CustomerName;
```

5. SELF JOIN – được sử dụng để tham gia một bảng với chính nó như thể bảng đó là hai bảng, tạm thời đổi tên ít nhất một bảng trong câu lệnh SQL.

Nếu muốn đọc để hiểu rõ hơn, các bạn có thể qua đọc series các bài viết về join sql trên w3chool: https://www.w3schools.com/sql/sql_join.asp
# Ví dụ về join trong Rails app
1. Ví dụ join 2 bảng
```
Client.joins('LEFT OUTER JOIN addresses ON addresses.client_id = clients.id')
SELECT clients.* FROM clients LEFT OUTER JOIN addresses ON addresses.client_id = clients.id
```

2. Ví dụ join nhiều bảng cùng lúc
```
Category.joins(:posts => [{:comments => :guest}, :tags])
 
SELECT categories.* FROM categories
  INNER JOIN posts ON posts.category_id = categories.id
  INNER JOIN comments ON comments.post_id = posts.id
  INNER JOIN guests ON guests.comment_id = comments.id
  INNER JOIN tags ON tags.post_id = posts.id
```

3. Ví dụ lấy ra những User cùng với bookmarks post của user đó:
```
User.joins("LEFT JOIN bookmarks ON bookmarks.bookmarkable_type = 'Post' AND bookmarks.user_id = users.id")
=> SELECT "users".* FROM "users" LEFT JOIN bookmarks ON bookmarks.bookmarkable_type = 'Post' AND bookmarks.user_id = users.id
```
# preload, eager_load, và includes trong Rails
Trong framework Ruby on Rails cung cấp những method query preload, eager_load, includes, references, joins, mỗi một phương pháp có cách hoạt động phù hợp với từng mục đích khác nhau. Việc không nắm rõ cách thức hoạt động, ưu điểm, nhược điểm của những method đó sẽ dẫn đến việc sử dụng sai lầm, tốn tài nguyên cũng như vấn đề performance của ứng dụng. Để hiểu rõ hơn các method trên và để biết được cách thức hoạt động và tốc độ xử lý của chúng, các bạn hãy tham khảo bảo viết: [Tìm hiểu preload, eager_load, includes, references, and joins in Rails](https://viblo.asia/p/tim-hieu-preload-eager-load-includes-references-and-joins-in-rails-roavrwPXGRM)

Còn với vấn để mình đưa ra ở ví dụ đầu, khi sử dụng với preload, eager_load và includes thì nó sẽ như thế này đây:
1. preload
```
books = Book.all
user_names = books.preload(:user).map { |book| book.user.name }
```
```
Book Load (0.3ms) SELECT “books”.* FROM “books”
User Load (0.4ms) SELECT “users”.* FROM “users” WHERE “users”.”id” IN (1, 2, 3)
```
2. eager_load
```
user_names = books.eager_load(:user).map { |book| book.user.name }

#=> SQL (0.4ms) SELECT “books”.”id” AS t0_r0, “books”.”title” AS t0_r1, “books”.”author” AS t0_r2, 
#=> “books”.”books_id” AS t0_r3, “books”.”user_id” AS t0_r4, “books”.”created_at” AS t0_r5, 
#=> “books”.”updated_at” AS t0_r6, “users”.”id” AS t1_r0, “users”.”name” AS t1_r1, 
#=> “users”.”created_at” AS t1_r2, “users”.”updated_at” AS t1_r3 FROM “books” 
#=> LEFT OUTER JOIN “users” ON “users”.”id” = “books”.”user_id”
```
3. includes
```
books.includes(:user).where('users.name="Guava"')
#=>
#=> SELECT "books".”id” AS t0_r0, "books"."title" AS t0_r1, 
#=> "books."author" AS t0_r2, "books"."books_id" AS t0_r3, 
#=> "books"."user_id" AS t0_r4, "books"."created_at" AS t0_r5, 
#=> "books"."updated_at" AS t0_r6, "users"."id" AS t1_r0, 
#=> "users"."name" AS t1_r1, "users"."created_at" AS t1_r2, 
#=> "users"."updated_at" AS t1_r3 FROM "books" 
#=> LEFT OUTER JOIN "users" ON "users"."id"= "books"."user_id" 
#=> WHERE (users.name="Guava")
```

# Tham khảo
https://www.w3schools.com/sql/sql_join.asp

http://guides.rubyonrails.org/active_record_querying.html#joining-tables

https://viblo.asia/p/join-hay-khong-join-mot-hanh-dong-includes-bWrZnNwwZxw

https://viblo.asia/p/tim-hieu-preload-eager-load-includes-references-and-joins-in-rails-roavrwPXGRM