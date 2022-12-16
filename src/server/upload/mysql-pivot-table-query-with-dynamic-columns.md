Hôm nay mình gửi đến mọi người một kỹ thuật giúp chuyển đổi giá trị ở hàng thành cột trong MySQL mà không cần sử dụng đến DB của bên thứ ba (elasticsearch, ..) hỗ trợ cho việc thống kê dữ liệu. 
# Problem
Bài toán đặt ra như sau, bạn cần thống kê rằng từng người đã mượn sách được bao nhiêu lần ứng với mỗi quyển.
Giả sử DB đang lưu những thông tin sau đây:

![](https://images.viblo.asia/6cb09bcc-e916-413d-a7df-4a608cea5772.png)
![](https://images.viblo.asia/bc9a319a-5525-4498-847f-ae5e36dcac6b.png)

Và output sẽ có dạng (để có thể sort theo số lượt mượn sách):
![](https://images.viblo.asia/1afbe531-26be-4a1d-9be4-4498e62bfcdf.png)


# MySQL

Vậy cách làm như thế nào? Ở đây mình sẽ chia thành 2 dạng:

**Dạng 1: Số lượng sách, tên sách là cố định không đổi**
    
   Đầu tiên dựa vào sự quan hệ của các bảng trong DB, tạo ra một bảng mới với các thông tin như sau:

![](https://images.viblo.asia/77464ee8-515a-46ef-be18-bc3221621d19.png)


```sql
SELECT 
    users.id, name, number_of_times_borrowed
FROM
    users
        LEFT OUTER JOIN
    books_renters 
		ON books_renters.deleted_at IS NULL
        AND books_renters.renter_id = users.id
        LEFT OUTER JOIN
    books 
		ON books.deleted_at IS NULL
		AND books.id = books_renters.book_id
WHERE users.deleted_at IS NULL
LIMIT 5
```

   Để có thể custom được tên của một column, sử dụng [aggregate functions](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html)  rồi đặt cho nó một [alias](https://www.mysqltutorial.org/mysql-alias/) như ví dụ ở dưới:
    
![](https://images.viblo.asia/e91af392-ae8d-42b1-8aa9-ac943d883273.png)


Ở đây, thay vì SUM(number_of_times_borrowed) (tên mặc định)  bạn có thể đặt cho nó một cái tên mới bằng cách thêm vào sau một alias
```sql 
SUM(number_of_times_borrowed) AS 'name'
```

Tuy nhiên, để có thể lấy tên của một record làm column chúng ta cần một ít trick :grin:

![](https://images.viblo.asia/31e665c4-2a55-40b8-a5f9-54d6d17f6c87.png)


Sử dụng kết hợp [group_concat()](https://www.w3resource.com/mysql/aggregate-functions-and-grouping/aggregate-functions-and-grouping-group_concat.php) với case when sẽ đưa ra được output mong muốn. Tới đây, việc tạo ra bảng với tạm đã hoàn tất, bạn có thể LEFT JOIN với users để lấy ra thông tin cần thiết :v: 

Câu query cuối cùng (1) sẽ như sau:

```sql
SELECT 
    id, jitu_name, gender, phone_number,
    GROUP_CONCAT(CASE
            WHEN name = 'Behold the Man' THEN number_of_times_borrowed
        END) AS `Behold the Man`,
    GROUP_CONCAT(CASE
            WHEN name = 'The Doors of Perception' THEN number_of_times_borrowed
        END) AS `The Doors of Perception`
FROM
    (SELECT 
        users.id, jitu_name, gender, phone_number, name, number_of_times_borrowed
    FROM
        users
    LEFT OUTER JOIN books_renters ON books_renters.deleted_at IS NULL
        AND books_renters.renter_id = users.id
    LEFT OUTER JOIN books ON books.deleted_at IS NULL
        AND books.id = books_renters.book_id) infos_tbl
GROUP BY id, jitu_name, gender, phone_number
LIMIT 6
```


![](https://images.viblo.asia/1afbe531-26be-4a1d-9be4-4498e62bfcdf.png)


Tuy nhiên, vì đây là tên của record nên thông thường nó sẽ update lúc đó tên của cột cũng cần phải thay đổi theo và hiển nhiên rằng số lượng record cũng vậy. Do đó, bài toán ở đây sẽ mở rộng thành làm sao để các cột có thể thay đổi tên và số lượng khi record được thêm mới hay cập nhạt (khi thêm một cuốn sách mới thì sẽ có cột mới xuất hiện).

**Dạng 2: Thay đổi tên và số lượng sách**

Nôm na câu query trong MySQL sẽ như sau :laughing:

```sql
SELECT 
    GROUP_CONCAT(DISTINCT CONCAT('group_concat(case when name = \'',
                name,
                '\' then number_of_times_borrowed end) AS `',
                name,
                '`'))
INTO @sql FROM
    (SELECT 
        users.id, name, number_of_times_borrowed
    FROM
        users
    LEFT OUTER JOIN books_renters ON books_renters.deleted_at IS NULL
        AND books_renters.renter_id = users.id
    LEFT OUTER JOIN books ON books.deleted_at IS NULL
    WHERE
        books.id = books_renters.book_id) infos_tbl;

SET @sql = CONCAT(
'SELECT id, ', @sql, 'FROM 
	(
		SELECT users.id, name, number_of_times_borrowed FROM users
			LEFT OUTER JOIN books_renters 
				ON books_renters.deleted_at IS NULL
				AND books_renters.renter_id = users.id
			LEFT OUTER JOIN books 
				ON books.deleted_at IS NULL 
				AND books.id = books_renters.book_id
	) infos_tbl
GROUP BY id
LIMIT 5');

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
```

... Thực sự giờ nhìn vào mình cũng muốn :scream: tuy nhiên vì KH là thượng đế nên vẫn phải tiếp tục thôi:joy:. Chia câu query thành 2 phần rồi phân tích nó nào: 

**Phần 1:**

```sql
SELECT 
    GROUP_CONCAT(DISTINCT CONCAT('group_concat(case when name = \'',
                name,
                '\' then number_of_times_borrowed end) AS `',
                name,
                '`'))
INTO @sql FROM
    (SELECT 
        users.id, name, number_of_times_borrowed
    FROM
        users
    LEFT OUTER JOIN books_renters ON books_renters.deleted_at IS NULL
        AND books_renters.renter_id = users.id
    LEFT OUTER JOIN books ON books.deleted_at IS NULL
    WHERE
        books.id = books_renters.book_id) infos_tbl;

SELECT @sql;
```

![](https://images.viblo.asia/2291cc4d-0d1c-4f09-bc42-aae0480ef156.png)


Như vậy, hàm [SELECT INTO](https://quantrimang.com/lenh-select-into-trong-sql-server-148030) sẽ sao chép chuỗi results vào biến @sql bên cạnh việc MySQL cũng tạo ra một chuỗi các câu GROUP_CONCAT ... 

**Phần 2:**
```sql
SET @sql = CONCAT(
'SELECT id, ', @sql, 'FROM 
	(
		SELECT users.id, name, number_of_times_borrowed FROM users
			LEFT OUTER JOIN books_renters 
				ON books_renters.deleted_at IS NULL
				AND books_renters.renter_id = users.id
			LEFT OUTER JOIN books 
				ON books.deleted_at IS NULL 
				AND books.id = books_renters.book_id
	) infos_tbl
GROUP BY id
LIMIT 5');

SELECT @sql;
```

![](https://images.viblo.asia/156ad5a6-765c-4803-b049-500c50bd397d.png)


Vậy là biến @sql là chuỗi kết hợp các string để tạo ra câu query hoàn chỉnh và kết quả là giống hoàn toàn với (1).

Cuối cùng excute @sql nữa là xong. Vậy là bài toán đã được giải quyết triệt để cho cả dữ liệu cứng và động :v:

# Rails 
Áp dụng vào Rails, lần lượt làm theo 2 bước như bài toán dạng 2 trong MySQL: 

+ Tạo một câu tập hợp của group_concat
+ Tạo query hoàn chỉnh

```ruby
class Book::NumberOfTimesBorrowedQuery
  def initialize users = User.all, sort_params = {}
    @users = users
    @sort_params = sort_params
  end

  def all
    generate_select_query
    users.from("(#{query_str}) users")
  end

  def sort
    sort_params.present? ? all.order("book_#{key.to_s.to_i} #{direction}") : all
  end

  private
  attr_reader :users, :sort_params

  def query_str
    <<-SQL
      SELECT #{@select_query.to_s} FROM
      (
        SELECT .. FROM users
        LEFT OUTER JOIN
          (
            ...
      ) users
      INNER JOIN ...
      WHERE ...
      GROUP BY users.id
    SQL
  end

  def key
    sort_params.keys.first
  end

  def direction
    sort_params.values.first
  end

  def generate_select_query
    @select_query = "..."
    book_ids.each do |book_id|
      dynamic_book_id_col = ", GROUP_CONCAT(CASE WHEN book_id = #{book_id} THEN number_of_times_borrowed END) 'book_#{book_id}'"
      @select_query += dynamic_book_id_col
    end
  end
end
```

Trong trường hợp tên của cuốn sách là tiếng Nhật, Trung hay không thuộc Latinh có thể sẽ gặp một số lỗi bất cập (font ...), nên mình sử dụng id để thay thế. 

Tất nhiên cách nào cũng có 2 mặt của nó, cùng đến với ưu, nhược điểm:

Ưu: 

+ Không cần phải sử dụng đến bên thứ 3.
+ Chuyển hóa SQL thành NoSQL.


Nhược:

 + Performance (cần cẩn thận trong việc đánh index) đôi lúc làm request timed out do query cost khá lớn.
 + Viết cần kiểm tra id khi client request lên server phục vụ việc sort vì không tồn tại id phù hợp sẽ dẫn đến query lỗi.

# Tổng kết 

Hi vọng bài viết này sẽ giải quyết được vấn đề bạn gặp phải. Happy coding!