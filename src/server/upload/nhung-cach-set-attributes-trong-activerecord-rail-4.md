Rails 4 cho phép các Dev thay đổi các thuộc tính ActiveRecord theo nhiều cách khác nhau. Mỗi cách lại có một chút khác biệt, đôi khi lại có các hệ quả khá thú vị . Điều quan trọng nhất ở đây là chúng ta phải hiểu được phương pháp thích hợp nhất cho từng tình huống cụ thể. Do đó mình sẽ giới thiệu cho các bạn 1 bảng cheat sheet mà mình dùng cực kì nhiều, kèm theo chi tiết ở bên dưới. (bow)
 
# Cheat Sheet

| Method | Sử dụng Accessor mặc định | Lưu vào  Database | Validate | Callback | Cập nhật updated_at | Check readonly |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| [attribute=](http://apidock.com/rails/ActiveRecord/AttributeMethods/Write/attribute%3D)     | :heavy_check_mark:   | :heavy_multiplication_x:  | - | - | -  | - |
| [write_attribute](http://apidock.com/rails/ActiveRecord/AttributeMethods/Write/write_attribute) |  :heavy_multiplication_x:   | :heavy_multiplication_x:  | - | - | -  | - |
| [update_attribute](http://apidock.com/rails/ActiveRecord/Persistence/update_attribute) |  :heavy_check_mark:   | :heavy_check_mark:  | :heavy_multiplication_x:  | :heavy_check_mark: | :heavy_check_mark:  |:heavy_check_mark:  |
| [update_attributes](https://api.rubyonrails.org/classes/ActiveRecord/Persistence.html#method-i-update_attributes) |  :heavy_check_mark:   | :heavy_check_mark:  | :heavy_check_mark:  | :heavy_check_mark: | :heavy_check_mark:  |:heavy_check_mark:  |
| [attributes=](http://apidock.com/rails/ActiveRecord/AttributeAssignment/attributes%3D) | :heavy_check_mark:   | :heavy_multiplication_x:  | - | - | -  | - |
| [update](http://apidock.com/rails/ActiveRecord/Persistence/update) |  :heavy_check_mark:   | :heavy_check_mark:  | :heavy_check_mark:  | :heavy_check_mark: | :heavy_check_mark:  |:heavy_check_mark:  |
| [update_column](http://apidock.com/rails/ActiveRecord/Persistence/update_column) |  :heavy_multiplication_x:   | :heavy_check_mark:  | :heavy_multiplication_x:  | :heavy_multiplication_x: | :heavy_multiplication_x:  |:heavy_check_mark:  |
| [update_columns](http://apidock.com/rails/ActiveRecord/Persistence/update_columns) |  :heavy_multiplication_x:   | :heavy_check_mark:  | :heavy_multiplication_x:  | :heavy_multiplication_x: | :heavy_multiplication_x:  |:heavy_check_mark:  |
| [User::update](http://apidock.com/rails/ActiveRecord/Relation/update) |  :heavy_check_mark:   | :heavy_check_mark:  | :heavy_check_mark:  | :heavy_check_mark: | :heavy_check_mark:  |:heavy_check_mark:  |
| [User::update_all](http://apidock.com/rails/v4.0.2/ActiveRecord/Relation/update_all) |  :heavy_multiplication_x:   | :heavy_check_mark:  | :heavy_multiplication_x:  | :heavy_multiplication_x: | :heavy_multiplication_x:  |:heavy_multiplication_x:  |

# Chi tiết
Sau đây mình sẽ lấy ví dụ về việc cập nhật attribute `name` cho object `user`.
## `user.name = "Foo"`

Đây là một biểu thức gán hoàn toàn bình thường, dễ hiểu, dễ dùng nhất. Đây là `write accessor` mặc địch được Rails tự động tạo ra. Attribute `name` sẽ được gắn cờ là `dirty` và mọi sự thay đổi đều chưa được lưu vào DB.

Bạn có thể undo thay đổi này bằng việc gọi `reload!` hoặc lưu thay đổi vào DB bằng cách gọi `save`
## `user.write_attribute(:name, "Foo")`

Đây là method được gọi bởi `write accessor` bên trên. Alias của method này chính là `user[:name] = "Foo"`.

Cũng như bên trên,  method này không thay đổi attribute trong DB. Để sử dụng method này bạn phải override lại  `write accessor` bên trên, ví dụ như khi bạn muốn viết lại `write accessor` `attribute=`: 

```ruby
def name=(new_name)
  write_attribute(:name, new_name.upcase)
  # Tương đương với:
  # self[:name] = new_name.upcase 
end
```
=> Tự động uppercase attibute `name` khi được set

## `user.update_attribute(:name, "Foo")`

Method này sẽ thay đổi attribute trong model và đẩy trực tiếp vào DB mà không qua bất cứ `Validation` nào hết. Tuy nhiên vẫn chạy các `callback`, tất cả các thay đổi khác cũng sẽ được lưu vào trong DB.

## `user.attributes = {name: "Foo"}`
Method này sẽ cập nhật tất cả những attribute bạn truyền vào. Tuy nhiên, thay đổi cũng sẽ không được lưu vào DB. Những attributes khác không được truyền vào đều được giữ nguyên. Bạn có thể sử dụng `assign_attributes` để thay thế cho method này.

```ruby
user.attributes = {name: "Foo", age: 25}
user.assign_attributes {name: "Foo", age: 25}

# Hai câu này tương đương nhau. 
```
## `user.update(name: "Foo")`
Method này từng được gọi là `update_attributes` trong Rails 3. Method này sẽ thay đổi attribute trong model, check validate, chạy callback và đẩy trực tiếp vào DB nếu như validate.

Cũng giống như `update_attribute`, method này cũng lưu tất cả những thay đổi khác vào DB
## `user.update_columns(name: "Foo")`
Method này thực thi trực tiếp 1 câu query SQL UPDATE và bỏ qua validate cũng như là callback. Nó chỉ check rằng các cột đó có được đánh `readonly` hay không, nêú có thì sẽ raise exception.
## `user.update_column(:name, "Foo")`
Cũng giống như `update_columns`, tuy nhiên chỉ update được duy nhất 1 attrbute.
## `User.update(1, name: "Foo")`
*Note: Đây là một class method*

Method này tìm Object bằng ID và update attribute của nó bằng hash được truyền vào. Method này sử dụng `User#update` để update cho nên nó vẫn sẽ chạy qua validate và callback, cũng như là cập nhật lại trường `updated_at`

Bạn cũng có thể truyền vào 1 mảng ID và params:

```ruby
User.update(
  [1,2,3],
  [
    {name: "Rob"},
    {name: "David", age: 12},
    {age: 15, location: "London"},
  ]
)
# Tham số thứ hai là một mảng các hash
```

## `User.update_all(name: "Foo")`
Method này giống như `update_columns`, sẽ chạy một câu SQL UPDATE và bỏ qua toàn bộ Validate và Callback, tuy nhiên sẽ không check đến cột có `readonly` hay không. Bạn có thể sử dụng method này trong một scoped relation:

```ruby
User.where(name: "Foo").update_all(name: "FooFighter")
```

Cảm ơn các bạn đã đọc bài viết của mình. (bow)

*nguồn:* [Different Ways to Set Attributes in ActiveRecord (Rails 4)](https://davidverhasselt.com/set-attributes-in-activerecord/)