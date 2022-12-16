Hôm nay mình sẽ viết về 1 topic mà khá là quen thuộc với nhiều người, đó là kỹ thuật `eager load`.
Chắc hẳn thì trước tiên, khi tìm hiểu về một thứ gì đó, bạn sẽ đặt ra câu hỏi là: Nó là gì? Nó làm gì? Tại sao lại là nó mà không phải là cái gì khác? Không có nó thì sẽ ra sao? .vv. Và chúng ta sẽ giải đáp cho các câu hỏi trên.

### Eager load và bản chất của nó.

Có thể nói rằng, Eager load sinh ra là để giải quyết vấn đề về hiệu năng truy vấn dữ liệu trong database. Cùng xem xét đoạn sau

Giả sử ta có 1 lớp students và 1 lớp class có quan hệ như dưới

```
class Class < ActiveRecord::Base
  has_many :students
end

class Student < ActiveRecord::Base
  belongs_to :class
end
```

Và với câu hỏi, liệt kê danh sách 10 sinh viên cùng với tên lớp họp mà sinh viên đó đang tham gia.

Với lazy loading, ta sẽ thực hiện ngay như sau

```
students = Students.limit(10)
students.each do |student|
   puts student.class.name
end
```

Và với đoạn code trên, nó sẽ thực hiện đơn giản đó là lấy ra 10 sinh viên, sau đó lặp từng sinh viên để lấy ra tên lớp mà sinh viên đang học

```
SELECT  `students`.* FROM `students` LIMIT 10
SELECT  `classes`.* FROM `classes` WHERE `classes`.`deleted_at` IS NULL AND `classes`.`id` = 1 LIMIT 1
SELECT  `classes`.* FROM `classes` WHERE `classes`.`deleted_at` IS NULL AND `classes`.`id` = 2 LIMIT 1
SELECT  `classes`.* FROM `classes` WHERE `classes`.`deleted_at` IS NULL AND `classes`.`id` = 3 LIMIT 1
SELECT  `classes`.* FROM `classes` WHERE `classes`.`deleted_at` IS NULL AND `classes`.`id` = 4 LIMIT 1
SELECT  `classes`.* FROM `classes` WHERE `classes`.`deleted_at` IS NULL AND `classes`.`id` = 5 LIMIT 1
SELECT  `classes`.* FROM `classes` WHERE `classes`.`deleted_at` IS NULL AND `classes`.`id` = 6 LIMIT 1
SELECT  `classes`.* FROM `classes` WHERE `classes`.`deleted_at` IS NULL AND `classes`.`id` = 7 LIMIT 1
SELECT  `classes`.* FROM `classes` WHERE `classes`.`deleted_at` IS NULL AND `classes`.`id` = 8 LIMIT 1
SELECT  `classes`.* FROM `classes` WHERE `classes`.`deleted_at` IS NULL AND `classes`.`id` = 9 LIMIT 1
SELECT  `classes`.* FROM `classes` WHERE `classes`.`deleted_at` IS NULL AND `classes`.`id` = 10 LIMIT 1
```

Dĩ nhiên, với đoạn code trên, chúng ta sẽ có kết quả đúng với câu hỏi đặt ra. Nhưng vấn đề là, nếu câu hỏi trên, không phải là liệt kê danh sách 10 sinh viên mà sẽ là 100, 1000.. sinh viên hay toàn bộ sinh viên của trường thì chúng ta còn viết như vậy nữa hay không. Nếu có thì chắc chắn rằng, bạn chưa biết đến `eager load` rồi.

Vậy, nếu dùng eager load thì sẽ thế nào?

```
students = Student.includes(:class).limit(10)
student_names = students.map do |student|
  students.class.name
end
```

Và cùng nhìn kết quả đoạn lệnh trên thực thi nhé

```
SELECT  `students`.* FROM `students` LIMIT 10
SELECT `classes`.* FROM `classes` WHERE `classes`.`deleted_at` IS NULL AND `classes`.`id` IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
```

Ta có thể nhận ra sự khác biệt rõ ràng ở 2 đoạn thực thi tương ứng với 2 đoạn code, với đoạn code không sử dụng eager load, ta sẽ phải mất tới 11 lần truy xuất vào cơ sở dữ liệu để lấy data, còn với eager load, ta chỉ mất có 2 câu query để có thể thực hiện cùng câu hỏi trên. Có thể với 10 sinh viên thì ta sẽ chưa thực sự thấy hiệu năng mà nó mang lại nhưng nếu thay vì là 10 sinh viên, ta cần dữ liệu cho N sinh viên, thì ắt hẳn ràng eager load sẽ giúp ta tránh được việc N+1 câu query cùng thực hiện vào database rồi.

### Các cách thực thi eager load

Trong đoạn code ở trên, ta có sử dụng `includes` để giải quyết bài toán N+1 câu query, và ta sẽ điểm qua 3 phương pháp thực thi để xem sự khác biệt giữa từng loại và ta nên sử dụng cách thực thi nào để phù hợp với từng trường hợp.

**includes()**

Sử dụng:

```
User.includes(:addresses)
```

Câu query thực hiện trong database:

```
SELECT "users".* FROM "users"
SELECT "addresses".* FROM "addresses" WHERE "addresses"."user_id" IN (1, 2)
```

**preload()**

Sử dụng:

```
User.preload(:addresses)
```

Câu query thực thi:

```
SELECT "users".* FROM "users"
SELECT "addresses".* FROM "addresses" WHERE "addresses"."user_id" IN (1, 2)
```

**eager_load()**

Sử dụng:

```
User.eager_load(:addresses)
```

Câu query thực hiện:

```
SELECT "users"."id" AS t0_r0, "users"."name" AS t0_r1, "users"."email" AS t0_r2, "users"."created_at" AS t0_r3, "users"."updated_at" AS t0_r4, "addresses"."id" AS t1_r0, "addresses"."user_id" AS t1_r1
FROM "users"
LEFT OUTER JOIN "addresses" ON "addresses"."user_id" = "users"."id"
```

Cùng xem các câu query mà 3 cách trên thực thi thì có thể thấy rằng:

* includes() và preload() cùng có cách thức thực thi như nhau, đó là thực hiện 2 câu query riêng biệt.

* trong khi eager_load() lại gộp chung vào 1 câu truy vấn để thực hiện đồng thời bởi vì bản chất của eager_load() hoạt động dựa trên [Left outer join](https://www.w3schools.com/sql/sql_join_left.asp)

Vậy là có sự khác biệt giữa eager_load() so với includes() và preload() rồi, nhưng còn includes() và preload() thì sao, chúng có thực sự hoạt động giống nhau không? Nếu có thì tại sao phải sinh ra cả 2 loại để làm gì?

Xem thử ví dụ sau xem kết quả của ta sẽ có là như thế nào:

```
User.includes(:addresses).where("addresses.name = ?", "Ha Noi").references(:addresses)
=>>

SELECT `users`.`id` AS t0_r0, `users`.`name` AS t0_r1, `users`.`created_at` AS t0_r2, `users`.`updated_at` AS t0_r3, `addresses`.`id` AS t1_r0, `addresses`.`name` AS t1_r1, `employees`.`deleted_at` AS t1_r2 FROM `users` LEFT OUTER JOIN `addresses` ON `addresses`.`user_id` = `users`.`id` WHERE (addresses.name = 'Ha Noi')
```

và 

```
User.preload(:addresses).where("addresses.name = ?", "Ha Noi").references("addresses")
=>>

SELECT `users`.* FROM `users` WHERE (addresses.name = 'Ha Noi')
Mysql2::Error: Unknown column 'addresses.name' in 'where clause': SELECT `users`.* FROM `users` WHERE (addresses.name = 'Ha Noi')
ActiveRecord::StatementInvalid: Mysql2::Error: Unknown column 'addresses.name' in 'where clause': SELECT `users`.* FROM `users` WHERE (addresses.name = 'Ha Noi')
```

Vậy là sau khi thêm điều kiện cho câu truy vấn sử dụng includes() thì câu query được thực thi giống với cách thức mà eager_load() hoạt động đó là sử dụng Left outer join và chỉ mất 1 câu truy vấn. Còn preload() đã không thể thực hiện được câu truy vấn trên vì bản chất của nó vẫn là thực thi 2 câu query độc lập nhau ==> có cách nào khắc phục cho preload(), câu trả lời dĩ nhiên là có và không có gì xa lạ vì nó là `join`

```
User.joins(:addresses).where("addresses.name = ?", "Ha Noi").preload(:addresses)
==>

SELECT users.* FROM users INNER JOIN addresses ON addresses.user_id = users.id WHERE addresses.name = 'Ha Noi'
```

Và phải nhớ rằng, joins() hoạt động trên cơ chế Inner join chứ không phải là Left outer join như eager_load() đã từng làm.

**Tổng kết một chút**

Nếu kiên trì đọc đến đây, ắt hẳn bạn đã có khái niệm về eager load và mục đích sinh ra của nó. Việc của bạn bây giờ là là trực tiếp áp dụng nó vào trong chính những dòng code của mình một cách thật phù hợp để ứng dụng của bạn trở nên mượt mà hơn.