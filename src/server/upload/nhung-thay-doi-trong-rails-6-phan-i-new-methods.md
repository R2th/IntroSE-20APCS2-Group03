![](https://images.viblo.asia/d1e72a84-bec2-452e-ae78-d2c979f6cc50.png)

Bài viết dưới đây tổng hợp những method thay đổi trong Rails 6 so với các phiên bản cũ hơn.

## 1. create_or_find_by và create_or_find_by!
Rails 6 thêm `ActiveRecord::Base.create_or_find_by/!` thay thế cho `ActiveRecord::Base.find_or_create_by/!`

Cả 2 methods đều dựa trên các ràng buộc duy nhất (unique contraints) của database. Nếu tạo fail, đó là vì unique contraints tại một hay tất cả các cột đã cho và nó sẽ dùng find_by để tìm bản ghi.

**find_or_create_by**

`find_or_create_by` sẽ tìm record đầu tiên với thuộc tính đã cho, sau đó nó sẽ tạo một record với thuộc tính nếu không tìm thấy.

```
# Find the first company with name "Sun"
# or create a new one
Company.find_or_create_by(name: "Sun")
# => #<Company id: 1, name: "Sun">

# Second time we call the same,
# it will return existing record,
# since and existing record exists
Company.find_or_create_by(name: "Sun")
# => #<Company id: 1, name: "Sun">
```

Một trong những vấn đề của phương pháp này là nó không phải là một atomic operation. Đầu tiên, nó chạy `SELECT` và nếu không có kết quả thì sẽ chạy `INSERT`

Trong các ứng dụng chạy quy mô lớn, điều này có thể  gây ra tình trạng [race condition](https://viblo.asia/p/multithreading-race-conditions-critical-sections-va-thread-safety-OEqGj6LlG9bL) (Tình huống tương tranh). Các thread riêng biệt có thể cố gắng `SELECT` và sau đó `INSERT` nhiều bản ghi.

**Khắc phục dupplicate insert**

Một cách để khắc phục race codition là sửa lỗi bản ghi trùng lặp. Là thêm một ràng buộc duy nhất (`unique`) trên một trường

```
# name has a unique constraint in companies table
begin
  Company.transaction(requires_new: true) do
    Company.find_or_create_by(name: 'Sun')
  end
rescue ActiveRecord::RecordNotUnique
  retry
end
# => #<Company id: 1, name: "Sun">
```

Trong đoạn code trên, nếu cố gắng insert thì một ActiveRecord::RecordNotUnique được ném ra. Chúng ta chỉ cần rescue và thử lại lần nữa để lấy bản ghi hiện có.

**create_or_find_by**

```
# Create a new company with name "Sun"
# or return existing one
Company.create_or_find_by(name: 'Sun')
# => #<Company id: 1, name: "Sun">
```
`create_or_find_by` thử tạo mới một record với thuộc tính đã cho, có một ràng buộc duy nhất trên một hoặc một số cột của nó.

Như trong ví dụ trên, nếu một record đã tồn tại với một ràng buộc duy nhất, một exception là điều đầu tiên chúng ta bắt gặp.

Sau đó nó tiến hành sử dụng find_by! và trả về record.

Điều này giúp sử dụng để khắc phục vấn đề đọc cũ gây ra bởi nhiều race conditions.

**Hạn chế**

- Bảng phải có các ràng buộc duy nhất trên các cột có liên quan.
- Vì tất cả cơ chế này phụ thuộc vào việc ném và bắt ngoại lệ, nên có xu hướng tương đối chậm hơn.

## 2. String#truncate_bytes
Rails 6 thêm `truncate_bytes` để truncate một string thành một maximum bytesize mà không phá vỡ các characters hay các cụm grapheme như 👩‍👩‍👦‍👦

Trước đây để truncate strings với multibyte ký tự, chúng ta convert strings thành `mb_chars` trước.
Ví dụ:

```
> string = "🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪"
=> "🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪"

> string.size
=> 20

> string.bytesize
=> 80

> string.mb_chars
=> #<ActiveSupport::Multibyte::Chars:0x0000558578398f48 @wrapped_string="🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪">

> string.mb_chars.limit(30).to_s
=> "🔪🔪🔪🔪🔪🔪🔪"
```


**String#truncate_bytes**

Sử dụng `mb_chars.limit` tương đối chậm và chúng ta phải thực hiện chuyển đổi sang mb_chars trên chuỗi trước.

`String#truncate_bytes` cung cấp một sự thay đổi nhanh và dễ dàng hơn.

Ví dụ:

```
> string = "🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪"
=> "🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪🔪"

> string.bytesize
=> 80

> string.truncate_bytes(30)
=> "🔪🔪🔪🔪🔪🔪…"
```

## 3. Enumerable#index_with
Rails 6 thêm `index_with` vào `Enumerable`. Cho phép tạo một hash từ một enumerable với giá trị từ một block được thông qua hay một argument mặc định.

Trước đây, chúng ta sử dụng `map` với `to_h`

`index_with` lấy cả 2 giá trị hoặc một block parameter.

So sánh ví dụ dưới đây:

Có user như sau:

```
> user = User.first
  SELECT `users`.* FROM `users` ORDER BY `users`.`id` ASC LIMIT 1
=> #<User id: 2, first_name: "Đặng Kha Ngô Hiền", last_name: "Hoàng Hiền", email: "babara@muller.biz", phone_number: "0912345678", gender: "female", avatar: nil, created_at: "2020-01-17 07:36:04", updated_at: "2020-01-17 07:36:04">

> NAME_ATTRIBUTES = [:first_name, :last_name]
=> [:first_name, :last_name]
```

**Rails 5.2:**

```
> NAME_ATTRIBUTES.map { |attr| [attr, user.public_send(attr)] }.to_h
=> {:first_name=>"Đặng Kha Ngô Hiền", :last_name=>"Hoàng Hiền"}
```

**Rails 6.0.1**

```
NAME_ATTRIBUTES.index_with { |attr| user.public_send(attr) }
=> {:first_name=>"Đặng Kha Ngô Hiền", :last_name=>"Hoàng Hiền"}
```

Ngoài ra chúng ta có thể gián giá trị cho key:

```
NAME_ATTRIBUTES.index_with("Tên")
=> {:first_name=>"Tên", :last_name=>"Tên"}
```

## 4. Negative scopes enum values
Rails 6 thêm negative scopes cho tất cả các giá trị của enum

Enum cho phép khai báo các thuộc tính, nơi mà giá trị được map với integer trong database, nhưng có thể truy vấn bằng name.

```
class User < ApplicationRecord
  enum gender: %i[male, female, other]
end
```

Trước đây nếu chúng ta muốn lấy ra User mà gender không phải là male thì sẽ dùng như sau:

```
User.where.not(gender: :male)
```

Bây giờ chúng ta chỉ cần thêm `not` vào mỗi giá trị enum:
```
User.not_male
```

## 5. before? and after? method to Date, DateTime, Time và TimeWithZone

Rails 6 thêm `before?` and `after?` method vào `Date`, `DateTime`, `Time` và `TimeWithZone`. [Source code](https://github.com/rails/rails/pull/32185/files)

Trước đây chúng ta thường dùng toán tử `<` và `>` để so sánh nhỏ hơn và lớn hơn. Method `before?` và `after?` làm cho các so sánh date/time dễ đọc hơn.

Ví dụ:
Chúng ta sử dụng `>` và `<`
```
> Date.today > Date.yesterday
=> true
```

Dùng `before?` và `after?` method:
```
> yesterday = 1.day.ago
=> Tue, 18 Feb 2020 15:10:04 +07 +07:00

> yesterday.before? Date.current
=> true

> yesterday.after? Date.current
=> false
```

## 6. ActiveRecord::Relation#reselect
Rails 6 thêm `reselect` vào Relation. Điều này cho phép chúng ta thay đổi các trường được thêm trước đó.

Rails có phương thức `rewhere` và `reorder` để  thay đổi các thuộc tính điều kiện được đặt trước đó thành các thuộc tính mới được đưa ra làm đối số cho phương thức.

Trước đây, nếu chúng ta muốn thay đổi các thuộc tính câu lệnh được select trước đó thành các thuộc tính mới, ta thực hiện như sau:

```
User.select(:first_name, :last_name).unscope(:select).select(:email)
=>   User Load (0.5ms)  SELECT `users`.`email` FROM `users`
```

Trong rails 6, `reselect` method giống như `rewhere` và `reoder`, `reselect` là cách viết tắt của `unscope(:select).select(fields).`

Ví dụ:
```
User.select(:first_name, :last_name).reselect(:email)
=>   User Load (0.4ms)  SELECT `users`.`email` FROM `users`
```

## 7.Array#including, Array#excluding, Enumerable#including, Enumerable#excluding

### 7.1. #excluding
Trước đây Rails 6 cung cấp `without` cho `Enumerable#excluding` và `Array#excluding` trả về một mảng không chứa các giá trị cần đã cho dưới dạng tham số.

Ví dụ:
Rails 5
```
> [1, 2, 3, 4, 5].without(2, 3)
=> [1, 4, 5]
```
Phương thức `without` được đổi tên thành `excluding`. Tuy nhiên, Rails vẫn giữ `without` như một alias của `excluding`. Nên ta có thể sử dụng cả hai.

Ví dụ:

```
> [1, 2, 3, 4, 5].excluding(2, 3)
=> [1, 4, 5]
```

### 7.2. #including
Rails 6 thêm method `including` để gộp lại các thành phần lại (bao gồm cả các giá trị trùng lặp). Nói một cách khác nó ngược lại với excluding. 

Ví dụ:
```
> [1, 2, 3, 4, 5].including(6, 7)
=> [1, 2, 3, 4, 5, 6, 7]

# Với các giá trị trùng lặp
> [1, 2, 3, 4, 5].including(2, 3)
=> [1, 2, 3, 4, 5, 2, 3]
```

## 8. Cảnh báo sử dụng `update_attributes` và `update_attributes!`
`update_attributes` được đổi tên thành `update` tại [pull request](https://github.com/rails/rails/pull/8705)

Trong rails 6, nếu ta sử dụng update_attributes và `update_attributes!` sẽ ném ra một cảnh báo như sau:

> DEPRECATION WARNING: update_attributes is deprecated and will be removed from Rails 6.1 (please, use update instead) (called from irb_binding at)

Mục đích của lời cảnh báo này giúp cho các nhà phát triển đã sử dụng `update_attributes` chuyển sang dùng `update`. Phương thức `update_attributes` và `update_attributes!` sẽ bị bỏ trong version 6.1.