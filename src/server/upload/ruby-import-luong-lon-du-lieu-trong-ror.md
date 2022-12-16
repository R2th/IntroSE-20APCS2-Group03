Trong quá trình phát triển phần mềm, chúng ta chắc hẳn đã từng rất nhiều lần thêm mới hay cập nhập lại dữ liệu nhưng hầu như chỉ với một lượng tương đối ít dữ liệu thay đổi, quá trình này chả mất là bao thời gian.<br/>
Mình đã thật sự sai lầm khi cho rằng như vậy, hãy để ý một chút, thông thường trong rails đang insert dữ liệu kiểu row by row, nghĩa là mỗi một lần tạo mới hoặc thay đổi dữ liệu 1 bản ghi thì sẽ tạo ra 1 câu truy vấn tương ứng. Thử tưởng tượng bạn muốn import khoảng vài triệu bản thì số câu query và thời gian sẽ như thế nào.<br/>
Để giải quyết vấn đề đó trong ruby thì lại không khó, trong quá trình tìm hiểu, mình được biết đến gem **activerecord-import**. Khoan đã, trước đó thì bạn đã từng biết những các nào nào để import dữ liệu chưa.<br/>
### 1. Tạo bản ghi theo cách tạo từng cái một (row by row )
```
users = []
10.times do |i|
  users << User.new(name: "user #{i}")
end
User.import users
```
Ví dụ trên chị hiệu quả với lượng ít dữ liệu thôi, như đã nói ở trên, vấn đề cần giải quyết ở đây là hãy import khoảng vài triệu bản ghi vào database của mình. Theo cách thông thường thì bạn nhập từng hàng một trong **file csv** và sao đó chèn chúng vào trong database của mình thông qua file **seed.rb**
```ruby
# seeds.rb
CSV.foreach('products.csv', headers: true) do |row|
 Product.create(product_name: row['Product Name'])
end
```
Có vẻ cách trên đúng nhưng lại hiệu suất import lại quá chậm, bạn không thể ngồi cả ngày chỉ để import vài triệu dữ liệu thôi đấy chứ.
### 2. Sử dụng câu lệnh SQL INSERT(code khó đọc và không an toàn)
```ruby
# Gán giá trị cho users bằng một mảng gồm các user hash
# like [{ name: "Sam" }, { name: "Charls" }]

sql = "INSERT INTO users VALUES "

sql_values = []
users.each do |user|
  sql_values << "(#{user.values.join(", ")})"
end

sql += sql_values.join(", ")
ActiveRecord::Base.connection.insert_sql(sql)
```
### 3. Sử dụng activerecord-import gem(nhanh hơn)
```ruby
users = []
10.times do |i|
  users << User.new(name: "user #{i}")
end
User.import users
```
**ActiveRecord-import** là một gem của ruby được viết bởi ông Zach Dennis. Nó thì nhanh hơn nhiều so với cách insert row by row thông thường và cũng rất dễ thực hiện.<br/>
Để có thể sử dụng nó bạn cần import `gem "activerecord-import"` vào trong `Gemfile` và nhớ gõ `bundle install` nhé.
Cơ chế hoạt động của gem này là giảm số lượng lớn câu query của bạn thành duy nhất một công query. Thay vì ra tận vào triệu câu query thì giờ đây chỉ có duy nhất 1 câu query.<br/>

![](https://images.viblo.asia/121a5bc1-cb8e-498e-af99-faae4a423dca.png)
Ngoài ra bạn cũng có thế áp dụng để chèn mới một cột, thêm mới toàn bộ dữ liệu trong bảng, cập nhật loại toàn bộ dữ liệu, ...
Dưới đây là đoạn code ví dụ về update dữ liệu lớn từ file csv:
```ruby
def update
  return if is_empty_db?
  file_path = "product.csv"
  instances = []
  update_keys = []
  CSV.foreach(file_path, headers: true) do |row|
    object = Product.find_by id: row["id"]
    update_keys = row.to_h.except("id").keys if update_keys.blank?
    next unless object
    object.assign_attributes row.to_h
    instances << object if object
  end

  Product.import instances, on_duplicate_key_update: update_keys, validate: false
end
```
Bằng cách sử dụng activerecord-import, khi import khoảng 500.000 bản ghi từ hơn 1 giờ xuống còn dưới 3 phút, quá nhanh đúng không.<br/>

**Hiểu hơn về việc thao tác với cơ sở dữ liệu**<br/>
Tại thời điểm này thì mình khá là hài lòng khi import với dữ liệu lớn, tuy nhiên bạn có hiểu được tại sao nhiều câu query nhỏ lại chậm hơn rất nhiều so với 1 câu query lớn không. <br/>
Mình chỉ hiểu đơn giản là với một câu query thì khoảng thời thời gian để gọi đến nó khá là mất thời gian, còn việc thực hiện thì tương đối nhanh.<br/>
Đúng vậy, khi ActiveRecord thực hiện thao tác với insert row by row, nó sẽ truy cập vào cơ sở dữ liệu bằng một câu lệnh chèn, và dĩ nhiên việc chạy sql cho một lần chèn là không mất nhiều thời gian nhưng số lần truy nhập vào csdl để mở 1 transaction, sau đó hoàn thành nó thì lại mất tương đối nhiều thời gian. Dẫn đến việc thường xuyên phải hits vào database mà không đem lại tác dụng gì còn khiến giảm perfomance.
### 4. Bulk insert với rails 6
Nếu bạn đang dùng rails 6 thì xin chúc mừng nhé, vấn đề insert lượng lớn dữ liệu đã được hỗ trợ tận răng rồi nhé.<br/>
Bắt đầu từ rails 6 thì đã bổ sung thêm `insert_all`, `insert_all!` và `upsert_all` vào **ActiveRecord::Persistence** <br/>
**insert_all**<br/>
Sử dụng insert_all giúp chúng ta có thể thực hiện chèn số lượng lớn như ví dụ dưới đây<br/>
```ruby
result = User.insert_all(
  [
    {
      name: "Sam",
      email: "sam@gmail.com"
    },
    {
      name: "Sum",
      email: "Sum@gmail.com"
    }
  ]
)
# Bulk Insert (2.3ms) INSERT INTO "users"("name","email")
# VALUES("Sam", "sam@gmail.com"...)
# ON CONFLICT DO NOTHING RETURNING "id"

puts result.inspect
#<ActiveRecord::Result:0x00007fb6612a1ad8 @columns=["id"], @rows=[[1], [2]],
@hash_rows=nil, @column_types=
{"id"=>#<ActiveModel::Type::Integer:0x00007fb65f420078 ....>

puts User.count
=> 2
```
Như đã đề cập ở trên,hãy để ý  `ON CONFLICT DO NOTHING RETURNING "id"` trong truy vấn. Điều này được hỗ trợ bởi cơ sở dữ liệu SQLite và PostgreQuery. Nếu có xung đột hoặc vi phạm khóa duy nhất trong quá trình chèn số lượng lớn, nó sẽ bỏ qua bản ghi xung đột và tiến hành chèn bản ghi tiếp theo.<br/>
**insert_all!**<br/>
Nếu cần đảm bảo tất cả các hàng được chèn, chúng ta có thể sử dụng `insert_all!` <br/>
```ruby
result = User.insert_all(
  [
    {
      name: "Sam",
      email: "sam@gmail.com"
    },
    {
      name: "Sum",
      email: "sum@gmail.com"
    }
  ],
  returning: %w[id name]
)
# Bulk Insert (2.3ms) INSERT INTO "users"("name","email")
# VALUES("Sam", "sam@gmail.com"...)
# ON CONFLICT DO NOTHING RETURNING "id", "name"

puts result.inspect
#<ActiveRecord::Result:0x00007fb6612a1ad8 @columns=["id", "name"],
@rows=[[1, "Sam"], [2, "Sum"]],
@hash_rows=nil, @column_types=
{"id"=>#<ActiveModel::Type::Integer:0x00007fb65f420078 ....>
```
**upsert_all**<br/>
Nếu một bản ghi tồn tại, và ta muốn cập nhật nó hoặc nếu không thì tạo một bản ghi mới thì việc này được gọi là upert.
```ruby
result = User.upsert_all(
  [
    {
      id: 1,
      name: "Sam new",
      email: "sam@example.com"
    },
    {
      id: 1,                  # trùng id
      name: "Sam's new",
      email: "sam@gmail.com"
    },
    {
      id: 2,
      name: "Charles",        # cập nhật tên
      email: "charls@gmail.com"
    },
    {
      id: 3,                  # tạo mới một bản ghi chưa có
      name: "David",
      email: "david@gmail.com"
    }
  ]
)

# Bulk Insert (26.3ms) INSERT INTO `users`(`id`,`name`,`email`)
# VALUES (1, 'Sam new', 'sam@gmail.com')...
# ON DUPLICATE KEY UPDATE `name`=VALUES(`name`)

puts User.count
=> 3
```
Hàng thứ hai trong mảng đầu vào trùng lặp id = 1 nên do đó tên của người dùng sẽ là `Sam's new` thay vì `Sam new`.<br/>
Hàng thứ ba trong mảng đầu vào không bị trùng lặp nên nó chỉ thực hiện việc cập nhật.<br/>
Hàng thứ tư với id = 3 không có trong csdl nên do đó sẽ tạo mới ở đây.
### Nguồn
https://medium.com/@eric_lum/importing-large-datasets-in-ror-why-you-should-use-activerecord-import-26fc915e6fd0 <br/>
https://blog.saeloun.com/2019/11/26/rails-6-insert-all.html