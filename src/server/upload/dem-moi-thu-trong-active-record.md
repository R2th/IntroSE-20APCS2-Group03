- Bài viết được dịch từ bài [Counting things in Active Record](https://longliveruby.com/articles/active-record-counting-records) của tác giả [Paweł Dąbrowski]().
-----

![](https://longliveruby.com/assets/images/count-things-in-active-record.svg)

-----
Có vẻ như việc đếm các bản ghi trong cơ sở dữ liệu với ActiveRecord là quá quen thuộc và đơn giản. Trong thực tế, nó hơi phức tạp hơn 1 chút. Như các phương thức `.count`, `.size`, và `.length` thì chức năng không giống nhau. Nếu không hiểu rõ hành vi của từng phương thức có thể dẫn đến vấn đề về hiệu suất.

---
## Phương thức count
Ruby thực hiện phương thức count của riêng ruby, phương thức này đếm số phần tử trong mảng đã cho. Tuy nhiên, class ActiveRecord::Relation thực hiện phương thức count của chính nó. Gọi nó trên quan hệ sẽ thực hiện truy vấn COUNT():
```ruby
User.all.count
# (4.8ms)  SELECT COUNT(*) FROM `users` WHERE `users`.`deleted_at` IS NULL
# => 20000
```
Kết quả như vậy không được ghi nhớ, để nó sẽ thực hiện truy vấn COUNT() mỗi lần chúng ta gọi `.count`:
```ruby
users = User.all

users.count
# (4.8ms)  SELECT COUNT(*) FROM `users` WHERE `users`.`deleted_at` IS NULL
# => 20000

users.count
# (4.3ms)  SELECT COUNT(*) FROM `users` WHERE `users`.`deleted_at` IS NULL
# => 20000
```
Ruby thực hiện phương thức đếm của riêng nó, vì vậy nếu chúng ta muốn sử dụng nó trên quan hệ, trước tiên chúng ta phải chuyển đổi quan hệ ActiveRecord::Relation sang mảng Array và gọi `count` trên đó:
```ruby
User.all.to_a.count
# User Load (18.8ms)  SELECT `users`.* FROM `users` WHERE `users`.`deleted_at` IS NULL
# => 20000
```
Gọi như vậy gần như **chậm hơn bốn lần** so với số lần được gọi trên mối quan hệ, vì vậy hãy lưu ý điều đó.

---
## Phương thức size
Giống như phương thức count, phương thức `size` có cách thực thi của nó trong cả Ruby và Active Record. Lần này, việc sử dụng ActiveRecord::Relation phức tạp hơn một chút vì nó hoạt động khác nhau tùy từng trường hợp.

**Các record không được load**

Khi records chưa được load, phương thức size thực hiện truy vấn COUNT() trên records:
```ruby
users = User.all; nil
users.loaded? # => nil
users.size
# (4.8ms)  SELECT COUNT(*) FROM `users` WHERE `users`.`deleted_at` IS NULL
# => 20000
```
**Các record đã load**

Trong trường hợp ngược lại, khi các records đã được load, phương thức size sẽ hoạt động giống như việc implement Ruby 1 cách tiêu chuẩn và đếm các đối tượng mà không cần thực hiện truy vấn:
```ruby
users = User.all; nil
users.loaded? # => nil
users.load # User Load (0.2ms)  SELECT `users`.* FROM `users`
users.loaded? # => true
users.size
# => 20000
```
**Bản ghi từ liên kết association với bộ nhớ counter cache**

Có một trường hợp trong đó phương thức size được gọi trên các bản ghi chưa được load sẽ không thực hiện truy vấn COUNT() trên cơ sở dữ liệu. Điều này xảy ra khi liên kết association có tùy chọn counter_cache được xác định:
```ruby
class Address < ActiveRecord::Base
  belongs_to :user, counter_cache: true
end

class User < ActiveRecord::Base
  has_many :addresses
end
```
User Model cũng phải xác định cột addresses_count, cột này chứa số lượng bản ghi addresses được liên kết với user nhất định. Bây giờ, khi phương thức size được gọi trên liên kết association mà nó không được load, truy vấn COUNT() không được thực hiện:
```ruby
user = User.last
user.addresses.size
# => 5
```
Không có tùy chọn counter_cache, truy vấn sẽ được thực hiện:
```ruby
user = User.last
user.addresses.size
# (0.3ms)  SELECT COUNT(*) FROM `addresses` WHERE `addresses`.`user_id` = 14
# => 5
```

---
## Phương thức length
ActiveRecord::Relation không implement phương thức .length riêng vì vậy kết quả luôn được chuyển đổi thành mảng và sau đó được tính:
```ruby
users = User.all; nil
users.loaded? # => nil
users.length
# User Load (18.7ms)  SELECT `users`.* FROM `users` WHERE `templates`.`deleted_at` IS NULL
# => 20000

users.loaded? # => true
users.length
# => 20000
```
Bạn không nên gọi length trên các record chưa được tải vì nó sẽ tải tất cả các đối tượng vào bộ nhớ.

**Kiểm tra xem có bất kỳ bản ghi nào để đếm không**

Điều gì sẽ xảy ra nếu chúng ta không muốn đếm bản ghi nhưng xác minh xem có bản ghi nào không? Chúng ta cũng nên cẩn thận ở đây. Rất có thể, chúng ta có một số cách để thực hiện hành động này:
* Sử dụng `any?` để xác minh xem có bất kỳ phần tử nào trong bộ sưu tập không
* Đang sử `empty?` để xác minh xem bộ sưu tập không chứa bất kỳ phần tử nào
* Sử dụng `present?` để xác minh xem các phần tử của bộ sưu tập có hiện diện không
* Sử dụng các biểu thức `.size == 0`, `.count == 0` và `.length == 0`