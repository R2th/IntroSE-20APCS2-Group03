![](https://images.viblo.asia/57103c9b-f0cd-44f1-9a4d-2da1349aad53.jpg)

## Giới thiệu

Framework [Ruby on Rails](https://rubyonrails.org/) cung cấp một thư viện mang tên [Active Record](https://guides.rubyonrails.org/active_record_querying.html), nó đóng vai trò như một [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping), trong đó có xây dựng hàng loạt phương thức giúp cho việc truy cập cơ sở dữ liệu một cách dễ dàng hơn.

Những query methods trong `ActiveRecord` cần phải được sử dụng một cách cẩn thận, đặc biệt là những query methods nhận tham số là param gửi lên từ client, đó có thể là những unsafe user input, và có thể gây ra những lỗ hổng để khai thác lỗi SQL Injection.

Sau đây mình sẽ liệt kê ra những query methods hay options đi cùng với ví dụ để minh họa cách ActiveRecord interface sẽ bị khai thác như thế nào nếu được sử dụng không an toàn. Đây không nhất thiết phải là những khai thác xấu nhất, chúng chỉ đại diện cho những gợi ý nhỏ về những gì có thể xảy ra nếu như một developer không cẩn thận. Những ví dụ dưới đây được test với Rails `5.2.1` và SQLite 3.

## Dữ liệu test

Trước tiên mình tạo dữ liệu test gồm 2 bảng `users` và `orders`, với quan hệ `User` has many  `Order`:

Bảng `users`:

| Id | name | username | password | age |admin|
| -------- | -------- | -------- |-------- |-------- |-------- |
| 1     | Hung     | vuonghung     | vuonghung123 |26|true|
| 2     | Chien     | vanchien     | vanchien456 |24|false|
| 3    | Dat     | thanhdat     | thanhdat789 |25|false|

**Note:** Ở đây, giả sử rằng hệ thống được thiết kế với độ bảo mật không cao, khi không mã hóa trường `password`.

Bảng `orders`:

| Id  | user_id | total |
| -------- | -------- | -------- |
| 1    | 3     | 800     |
| 2   | 2     | 400     |


## Calculate methods

Có một số methods dựa trên `ActiveRecord::Calculations#calculate`, `calculate` sẽ nhận một operation và một column name. Column name đó cũng chấp nhận SQL.

Một số Caculation methods:
- average
- calculate
- count
- maximum 
- minimum 
- sum

Ví dụ: Giả sử bạn muốn tính tổng số tiền của tất cả các `Order`, query sẽ như sau:

```
Order.calculate(:sum, :total)
```

```
Query:
	SELECT SUM("orders"."total") FROM "orders"
    
Result:
	1200
```

Nhưng nếu không sử dụng cẩn thận, một lỗ hổng SQL Injection sẽ được khai thác như sau:

```
params[:order_column] = "age) FROM users WHERE name = 'Hung';" // order_column là query string được gửi lên từ client 
Order.calculate(:sum, params[:order_column])
```

```
Query:
	SELECT SUM(age) FROM users WHERE name = 'Hung';) FROM "orders"
    
Result:
	26
```

Client sẽ lấy được tuổi của user tên `Hung` thay vì tổng số tiền của tất cả `Order`


## Exists? method

`exists?` method được sử dụng để check xem một record cụ thể nào đó có tồn tại hay không. Argument của method này thường là một primary key. Nếu argument là một string, nó sẽ được escape. Nếu argument là một array hay một hash, nó sẽ được coi như một lựa chọn điều kiện.

Giả sử ta muốn kiểm tra một user với `name` được truyền từ user input có tồn tại hay không chẳng hạn:

```
params[:name] = "') or (SELECT 1 AS one FROM 'orders' WHERE id> 0 AND ''='"
User.exists? ["name = '#{params[:name]}'"]
```

```
Query:
	SELECT  1 AS one FROM "users" WHERE (name = '') or (SELECT 1 AS one FROM 'orders' WHERE id > 0 AND ''='') LIMIT ?  [["LIMIT", 1]]
    
Result:
	true

```
Kết quả sẽ luôn luôn trả về là `true `

**Cách khắc phục:**

```
params[:name] = "') or (SELECT 1 AS one FROM 'orders' WHERE total > 0 AND ''='"
User.exists? name: params[:name]
```

```
Query:
	SELECT  1 AS one FROM "users" WHERE "users"."name" = ? LIMIT ?  [["name", "') or (SELECT 1 AS one FROM 'orders' WHERE id > 0 AND ''='"], ["LIMIT", 1]]
    
Result:
	false
```

## Where method
`where` method có thể được truyền thẳng vào một SQL string, và nó có thể vô tình tạo ra một lỗ hổng cho SQL injection.

Ví dụ, bạn đang muốn search các users có name giống hệt như user input:

```
params[:name] = "' or '1'='1"
User.where("name = '#{params[:name]}'")
```

```
Query:
    SELECT  "users".* FROM "users" WHERE (name = '' or '1'='1') LIMIT ?  [["LIMIT", 11]]
    
Result:
    #<ActiveRecord::Relation [#<User id: 1, name: "Hung", username: "vuonghung", password: "vuonghung123", age: 26, is_admin: true, created_at: "2018-10-09 08:35:07", updated_at: "2018-10-09 08:35:07">, #<User id: 2, name: "Chien", username: "vanchien", password: "vanchien456", age: 24, is_admin: false, created_at: "2018-10-09 08:35:07", updated_at: "2018-10-10 02:03:16">, #<User id: 3, name: "Dat", username: "thanhdat", password: "thanhdat789", age: 25, is_admin: false, created_at: "2018-10-09 08:35:07", updated_at: "2018-10-10 02:03:26">]>
```
Như bạn có thể thấy, câu query ở trên sẽ trả về tất cả users đang có trong bảng users thay vì chỉ những users có name giống như user input.

**Cách khắc phục:**

```
params[:name] = "' or '1'='1"
User.where(name: params[:name])

hoặc User.where("name = ?", params[:name])
```

```
Query:
    SELECT  "users".* FROM "users" WHERE "users"."name" = ? LIMIT ?  [["name", "' or '1'='1"], ["LIMIT", 11]]
   
Result:
    #<ActiveRecord::Relation []>
```

## Find by method
`find_by`/`find_by!` method đơn giản là việc gọi `where(*args).take`, do đó việc khai thác lỗ hổng cũng như cách khắc phục sẽ giống như đối với `where` method ở trên.

`find_by` method thường được sử dụng để kiểm xác thực người dùng khi sử dụng cơ chế basic authentication.

## Group method
`group` method sẽ chấp nhận bất kể SQL string nào.

Ví dụ, query sau đây có mục đích là group tất cả non-admin users theo một cột cụ thể nào đó.

```
params[:group] = "name UNION SELECT * FROM users"
User.where(is_admin: false).group(params[:group])
```

```
Query:
    SELECT  "users".* FROM "users" WHERE "users"."is_admin" = ? GROUP BY name  union select * from users LIMIT ?  [["is_admin", 0], ["LIMIT", 11]]
Result:
    #<ActiveRecord::Relation [#<User id: 1, name: "Hung", username: "vuonghung", password: "vuonghung123", age: 26, is_admin: true, created_at: "2018-10-09 08:35:07", updated_at: "2018-10-09 08:35:07">, #<User id: 2, name: "Chien", username: "vanchien", password: "vanchien456", age: 24, is_admin: false, created_at: "2018-10-09 08:35:07", updated_at: "2018-10-10 02:03:16">, #<User id: 3, name: "Dat", username: "thanhdat", password: "thanhdat789", age: 25, is_admin: false, created_at: "2018-10-09 08:35:07", updated_at: "2018-10-10 02:03:26">]>
```

Ta có thể thấy rằng, query trên trả về tất cả users trong bảng users, kể cả các admin users.

## Pluck method

`pluck` method được sử dụng để lấy ra một hoặc một số column trong bảng csdl. Nó chấp nhận bất cứ SQL string truyền vào trực tiếp. Do đó, nó có thể cho phép kẻ tấn công hoàn toàn kiểm soát query từ câu lệnh `SELECT`  trở đi.

Ví dụ, bạn muốn select một trường nào đó trong bảng order:

```
params[:column] = "password FROM users--"
Order.pluck(params[:column])
```

```
Query:
	SELECT password from users-- FROM "orders"

Result:
	["vuonghung123", "vanchien456", "thanhdat789"]
```


## Update All method

`update_all` method sẽ chấp nhận tất cả SQL string. Do đó nó cũng vô tình tạo ra một lỗ hổng khai thác SQL Injection

Ví dụ, khi bạn muốn update một user có tên nhập từ user input trở thành một admin:

```
params[:name] = "'' OR 1=1;"
User.update_all("is_admin = 1 WHERE name = #{params[:name]}")
```

```
Query:
	UPDATE "users" SET is_admin = 1 where name = '' OR 1=1;

Result:
	User.pluck :is_admin 
	=> [true, true, true]
```

## Lời khuyên

Ruby on Rails có tích hợp cơ chế filter cho những kí tự SQL đặc biệt, nó sẽ escape những kí tự `'`, `"`, `null` và line break. Sử dụng `Model.find(id)` hoặc `Model.find_by_something` sẽ tự động áp dụng cơ chế bảo vệ đó khỏi SQL Injection. Tuy nhiên đối với các đoạn SQL string, đặc biệt là trong những câu lệnh điều kiện `where("...")`, `connection.execute()` hay `Model.find_by_sql()`, nó phải được thực hiện thủ công.

Thay vì truyền thẳng một string value vào câu điều kiện, bạn có thể sử dụng một array để làm sạch những đoạn string đã bị nhiễm độc như:

```
Model.find_by("username = ? AND password = ?", entered_user_name, entered_password)
``` 

Như các bạn có thể thấy, phần đầu tiên của array sẽ là một SQL string có chứa dấu `?`. Những biến trong phần thứ hai của array sẽ được "khử độc" trước khi thay thế vào các dấu `?` đó. Bạn cũng có thể truyền tham số điều kiện vào một hash như sau:

```
Model.find_by(login: entered_user_name, password: entered_password)
```

Cuối cùng, các bạn có thể cài đặt gem [Brakeman](https://github.com/presidentbeef/brakeman), nó sẽ quét toàn bộ ứng dụng Rails của bạn để phân tích và phát hiện ra những lỗ hổng về bảo mật, trong đó có cả những lỗ hổng liên quan đến SQL Injection.


## Tài liệu tham khảo

1. https://rails-sqli.org/rails5
2. https://guides.rubyonrails.org/security.html#sql-injection