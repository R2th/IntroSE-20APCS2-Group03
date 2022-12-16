![](https://images.viblo.asia/d1e72a84-bec2-452e-ae78-d2c979f6cc50.png)

Bài viết trước [Những thay đổi trong Rails 6? (Phần I - New Methods)](https://viblo.asia/p/nhung-thay-doi-trong-rails-6-phan-i-new-methods-Qbq5Q3X4ZD8) mình có tổng hợp những method thay đổi trong rails 6. Tuy nhiên vẫn còn khá nhiều method mà Rails 6 đã bổ sung vào bản update này nên mình viết tiếp bài này để tổng hợp thêm cho đầy đủ hơn. 

## 1. Relation#extract_associated
Trước đây, nếu chúng ta muốn trích xuất các record từ một ActiveRecord::Relation, chúng ta sử dụng `preload` và `collect`

Ví dụ, chúng ta muốn lấy ra thông báo của vài users. Câu truy vấn sẽ như sau:

**Rails 5.2**
```
> User.where(gender: "male").preload(:notifications).collect(&:notifications)

User Load (1.3ms)  SELECT `users`.* FROM `users` WHERE `users`.`gender` = 0
UserNotification Load (1.4ms)  SELECT `user_notifications`.* FROM `user_notifications` WHERE `user_notifications`.`user_id` IN (1, 2, 4)
Notification Load (1.1ms)  SELECT `notifications`.* FROM `notifications` WHERE `notifications`.`id` IN (1, 2, 3)
```

**Rails 6**

`#extract_associated` được giới thiệu như một cách viết ngắn gọn cho `preload` và `collect`.

Chúng ta thay câu truy vấn ở trên như sau:

```
User.where(gender: "male").extract_associated(:notifications)
```

## 2. Array#extract!
Rails 6 thêm `Array#extract` loại bỏ và trả về giá trị thỏa mãn điều kiện truyền vào.

Ví dụ:
```
> numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9]
=> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9]

> odd_numbers = numbers.extract! { |number| number.odd? }
=> [1, 3, 5, 7, 9, 9]

> numbers
=> [0, 2, 4, 6, 8]
```

## 3. ActiveRecord::Relation#touch_all
Trước khi bắt đầu, chúng ta cùng tìm hiểu `touch` method làm gì? `touch` được sử dụng để cập nhật `update_at` bằng thời gian hiện tại. Nó cũng mất thời gian tùy chỉnh hoặc các cột khác như parameters.

Rails 6 thêm touch_all vào ActiveRecord::Relation để sinh ra nhiều records trong một lần chạy. Trước Rails 6, chúng ta cần lặp lại tất cả records bằng cách sử dụng một vòng lặp để đạt được kết quả mong muốn.

Theo dõi ví dụ dưới đây:

**Rails 5.2**
```
> User.count
SELECT COUNT(*) FROM "users"

=> 3

> User.all.touch_all

=> Traceback (most recent call last):1: from (irb):2
NoMethodError (undefined method 'touch_all' for #<User::ActiveRecord_Relation:0x00007fe6261f9c58>)

>> User.all.each(&:touch)
SELECT "users".* FROM "users"
begin transaction
  UPDATE "users" SET "updated_at" = ? WHERE "users"."id" = ?  [["updated_at", "2020-03-03 08:15:10.231211"], ["id", 1]]
commit transaction
begin transaction
  UPDATE "users" SET "updated_at" = ? WHERE "users"."id" = ?  [["updated_at", "2020-03-03 08:15:10.231211"], ["id", 2]]
commit transaction
begin transaction
  UPDATE "users" SET "updated_at" = ? WHERE "users"."id" = ?  [["updated_at", "2020-03-03 08:15:10.231211"], ["id", 3]]
commit transaction

=> [#<User id: 1, name: "Sam", created_at: "2019-03-05 16:09:29", updated_at: "2019-03-05 17:45:51">, #<User id: 2, name: "John", created_at: "2019-03-05 16:09:43", updated_at: "2019-03-05 17:45:51">, #<User id: 3, name: "Mark", created_at: "2019-03-05 16:09:45", updated_at: "2019-03-05 17:45:51">]
```

Điều này dẫn đến `N + 1` query

Rails 6.0
```
> User.count
   (0.9ms)  SELECT COUNT(*) FROM `users`
=> 3

> User.all.touch_all
  User Update All (5.8ms)  UPDATE `users` SET `users`.`updated_at` = '2020-03-03 08:15:10.231211'
=> 3
```

So sánh với ví dụ với `touch` ở trên, kết quả này dùng 1 query thay vì N + 1 query.

`touch_all` trả về số lượng bản ghi

`touch_all` cũng thay đổi thời gian hay các cột khác nhau làm tham số

Tóm lại: `touch_all` nhanh và đơn giản hơn.

## 4. Hash#deep_transform_values và Hash#deep_transform_values!
Ruby 2.4, giới thiệu `Hash#transform_values` và `Hash#transform_values!` để tranform giá trị của hash. Phương thức này trả về một hash mới với tất cả các giá trị được convert bởi điều kiện cho trước trong block.

- `Hash#transform_values` trả về  kết quả là một hash thỏa mãn điều kiện cho trước.
- `Hash#transform_values!` trả về kết quả là một hash thỏa mãn điều kiện cho trước và cập nhật hash đó.

Ví dụ:

**`Hash#transform_values`**
```
> hash_numbers = {a: "1.2", b: "1.32", c: "5"}
=> {:a=>"1.2", :b=>"1.32", :c=>"5"}

> hash_numbers.transform_values {|a| a.to_i}
=> {:a=>1, :b=>1, :c=>5}

> hash_numbers
=> {:a=>"1.2", :b=>"1.32", :c=>"5"}
```

**`Hash#transform_values!`**
```
> hash_numbers = {a: "1.2", b: "1.32", c: "5"}
=> {:a=>"1.2", :b=>"1.32", :c=>"5"}

> hash_numbers.transform_values! {|a| a.to_i}
=> {:a=>1, :b=>1, :c=>5}

> hash_numbers
=> {:a=>1, :b=>1, :c=>5}
```

Ví dụ với nested object với hash và array:
```
hash_numbers = {a: 1.2, b: 1.32, c: [5, 6.4]}
=> {:a=>1.2, :b=>1.32, :c=>[5, 6.4]}

> hash_numbers.transform_values {|a| a.to_i}
NoMethodError: undefined method `to_i' for [5, 6.4]:Array
Did you mean?  to_s
               to_a
               to_h
```
Như chúng ta thấy, trong ví dụ thứ 3, khi chúng ta có một nested object với hash và array, thì nó không hoạt động theo cách mà chúng ta mong muốn.

Rails 6 thêm phương thức `Hash#deep_transform_values` và `Hash#deep_transform_values!`

- `Hash#deep_transform_values` trả về kết quả là một hash thỏa mãn điều kiện cho trước.
- `Hash#deep_transform_values!` trả về kết quả là một hash thỏa mãn điều kiện cho trước và cập nhật hash đó.

**NOTE: 2 phương thức này chỉ khả dụng trên rails 6.0** bạn có thể kiểm tra trên source code của Rails:
[Rails 6.0](https://github.com/rails/rails/blob/master/actionpack/lib/action_controller/metal/strong_parameters.rb#L712) , [Rails 6.0.2.1](https://github.com/rails/rails/blob/v6.0.2.1/actionpack/lib/action_controller/metal/strong_parameters.rb)

Ví dụ:
**`Hash#deep_transform_values`**
```
> hash_numbers = {a: 1.2, b: 1.32, c: [5, 6.4]}
=> {:a=>1.2, :b=>1.32, :c=>[5, 6.4]}

> hash_numbers.deep_transform_values {|a| a.to_i}
=> {:a=>1, :b=>1, :c=>[5, 6]}

> hash_numbers
=> {:a=>1.2, :b=>1.32, :c=>[5, 6.4]}
```
**`Hash#deep_transform_values!`**
```
> hash_numbers = {a: 1.2, b: 1.32, c: [5, 6.4]}
=> {:a=>1.2, :b=>1.32, :c=>[5, 6.4]}

> hash_numbers.deep_transform_values! {|a| a.to_i}
=> {:a=>1, :b=>1, :c=>[5, 6]}

> hash_numbers
=> {:a=>1, :b=>1, :c=>[5, 6]}
```

## 5. ActionDispatch::Request::Session#dig
Rails 6 thêm phương thức `dig` cho `ActionDispatch::Request::Session`. Nó hoạt động giống với [Hash#dig](https://ruby-doc.org/core-2.4.0_preview1/Hash.html#method-i-dig) Nó trích xuất dữ liệu lồng nhau bởi các keys khi chúng ta muốn truy cập dữ liệu hay nested hashes trong session của mình.

Trước đây, chúng ta có thể làm bằng cách chuyển đổi session sang một hash và sau đó gọi `Hash#dig`.

Ví dụ:

**Rals 5.2**
```
>> session[:user] = {first_name: "Ánh", last_name: "Nguyễn Nhật", email: "abc@example.com", book: {title: "Làm bạn với bầu trời", author: "NNA"}}

=> {:first_name=>"Ánh", :last_name=>"Nguyễn Nhật", :email=>"abc@example.com", :book=>{:title=>"Làm bạn với bầu trời", :author=>"NNA"}}

>> session.to_hash

=> {"session_id"=>"5fe8cc73c822361e53e2b161dnnbb0e47", "_csrf_token"=>"gyFd5nEEkFvWTnl6XeVbJ7kljhL923hJt8PyHVCH/DA=", "return_to"=>"http://localhost:3000", "user"=>{:first_name=>"Ánh", :last_name=>"Nguyễn Nhật", :email=>"abc@example.com", :book=>{:title=>"Làm bạn với bầu trời", :author=>"NNA"}}}


>> session.to_hash.dig("user", :book, :title)

=> "Làm bạn với bầu trời"
```

**Rails 6**
```
>> session[:user] = {first_name: "Ánh", last_name: "Nguyễn Nhật", email: "abc@example.com", book: {title: "Làm bạn với bầu trời", author: "NNA"}}

=> {:first_name=>"Ánh", :last_name=>"Nguyễn Nhật", :email=>"abc@example.com", :book=>{:title=>"Làm bạn với bầu trời", :author=>"NNA"}}

>> session.dig("user", :book, :title)

=> "Làm bạn với bầu trời"
```

## 6. Relation#pick
Trước đây, việc lấy giá trị đầu tiên của một cột từ một tập các record khá cồng kềnh.

Ví dụ chúng ta muốn lấy title của tất cả các article có thể loại với id là 2

```
> Article.where(category_id: 2).limit(1).pluck(:title).first
  SELECT `articles`.`title` FROM `articles` WHERE `articles`.`category_id` = 2 LIMIT 1

=> "Gem Pagy - Làm thế nào để custom HTML pagination trên RoR application?"
```
Rails 6 thêm `ActiveRecord::Relation#pick` để cung cấp một cách ngắn hơn để lấy gía trị đầu tiên
```
> Article.where(category_id: 2).pick(:title)
   SELECT `articles`.`title` FROM `articles` WHERE `articles`.`category_id` = 2 LIMIT 1

=> "Gem Pagy - Làm thế nào để custom HTML pagination trên RoR application?"
```
Phương thức này [áp dụng](https://github.com/rails/rails/blob/45b898afc07dca936df13795dd5179bff5ae9a90/activerecord/lib/active_record/relation/calculations.rb#L203-L219) `limit(1)` cho quan hệ trước khi chọn giá trị đầu tiên. Vì thế nó rất hữu ích khi quan hệ đã được thu lại thành một hàng.

Ta cũng có thể select nhiều giá trị của nhiều cột.
```
> Article.where(category_id: 2).pick(:title, :content)
  SELECT `articles`.`title`, `articles`.`content` FROM `articles` WHERE `articles`.`category_id` = 2 LIMIT 1
=> ["Gem Pagy - Làm thế nào để custom HTML pagination trên RoR application?", "Pagy là gem dùng để phân trang"]
```

## 7.  ActionController::Parameter#each_value
Rails 6 thêm each_value trên ActionController::Parameter

Nó khác với `Hash#each_value` ở chỗ nó chuyển tất cả các giá trị hash thành đối tượng `ActionController::Parameters` trước khi đưa các giá trị thành block, thay vì chỉ trả về giá trị.

Ví dụ:
Trước tiên chúng ta định nghĩa `ActionController::Parameters` cho user như sau:
```
params = ActionController::Parameters.new({
  name: {
    first: "Mai",
    last: "Dao"
  },
  gender: "Female",
})

=> <ActionController::Parameters {"name"=>{"first"=>"Mai", "last"=>"Dao"}, "gender"=>"Female"} permitted: false>
```
Bây giờ chúng ta thêm một đối tượng hash khác vào params:
```
params[:socials] = {
  twitter: "https://twitter.com/DaoMai",
}

=> {:twitter=>"https://twitter.com/DaoMai"}
```
Bây giờ chúng ta sử dụng với ActionController::Parameters#each_value:
```
params.each_value do |value|
  puts value.inspect
end

<ActionController::Parameters {"first"=>"Mai", "last"=>"Dao"} permitted: false>
"Female"
<ActionController::Parameters {"twitter"=>"https://twitter.com/DaoMai"} permitted: false>
```
Như bạn thấy ở trên `socials` trong params là một Hash. Nhưng trong `each_value` block nó được convert sang `ActionController::Parameters`

## 8. ActiveRecord::Relation#annotate
Rails thêm phương thức `annotate`cho phép tạo comment trong câu lệnh SQL.

Ví dụ:
```
name = "Na"
=> "Na"

> User.where("first_name LIKE ?", name).annotate("users with first name starting with #{name}").to_sql
=> "SELECT `users`.* FROM `users` WHERE `users`.`deleted_at` IS NULL AND (first_name LIKE 'Na') /* users with first name starting with Na */"
```
Trên đây là một số thay đổi mình tổng hợp lại. Hy vọng sẽ giúp ích cho các bạn. (bow