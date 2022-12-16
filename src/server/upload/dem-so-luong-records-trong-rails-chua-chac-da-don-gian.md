Trong Rails, khi bạn muốn đếm số lượng records trả về trong 1 query dường như rất đơn giản, chỉ cần gọi các hàm có sẵn như `.count`, `.size`, `.length` dường như bạn sẽ có kết quả ngay lập tức. Vì sao cùng 1 việc đếm số lượng record mà phải có nhiều hàm như vậy? Bài viết hôm nay mình xin chia sẻ về việc những hàm trên hoạt động như thế nào?

### Hàm `.count`

`count` là một hàm của Ruby, nó trả về số lượng element trong 1 mảng. Tuy nhiên ActiveRecord::Relation override lại hàm `count` để thực hiện một câu lệnh `COUNT()` trong SQL

```ruby
User.all.count
# SELECT COUNT(*) FROM `users`
```

Kết quả trả về sẽ không được cache lại bởi vì mỗi lần chúng ta gọi `.count` là ActiveRecord::Relation tự động thực thi cho chúng ta 1 câu query `COUNT()`

```ruby
users = User.all

users.count
# SELECT COUNT(*) FROM `users`

users.count
# SELECT COUNT(*) FROM `users`
```

### Hàm `.size`

Cũng giống như hàm `.count`, hàm `.size` cũng được định nghĩa ở Ruby (để đếm số element trong 1 mảng) và ActiveRecord::Relation. Tuy nhiên, trong ActiveRecord::Relation hàm `.size` lại có một chút khác biệt.

Khi records chưa được load, hàm `.size` hoạt động giống như `.count`, nó sẽ thực hiện 1 câu query `COUNT()`

```ruby
users = User.all
users.loaded? # => nil
users.size
# SELECT COUNT(*) FROM `users` 
```

Tuy nhiên điểm khác biệt là khi records đã được load trước đó, hàm `.size` sẽ đếm số element mà không thực hiện truy vấn

```ruby
users = User.all
users.load
users.loaded? # => true
users.size
# => Return results
```

Có 1 trường hợp mà mặc dù các records chưa được load nhưng `.size` vẫn trả về kết quả mà không cần thực hiện truy vấn `COUNT()`. Nó xảy ra khi chúng ta sử dụng counter_cache 

```ruby
class Address < ActiveRecord::Base
  belongs_to :user, counter_cache: true
end

class User < ActiveRecord::Base
  has_many :addresses
end

user = User.first
user.addresses.size
# => Result without query
```

Bỏ option counter_cache trong model Address, bạn sẽ thấy hàm `.size` thực hiện truy vấn `COUNT()`

### Hàm `.length`

Hàm `.length` là 1 hàm của Ruby cũng để đếm số element trong 1 mảng, nhưng ActiveRecord::Relation không có hàm này. Hãy cẩn thận khi sử dụng hàm này với một object của ActiveRecord::Relation bởi vì bản chất nó sẽ load toàn bộ records vào 1 array rồi thực hiện đếm số element trong array đó

```ruby
users = User.all
users.loaded? # => nil
users.length
# SELECT `users`.* FROM `users`
# => Results (Không có select COUNT)

users.loaded? # => true
users.length
# => Results (Tuy nhiên sau khi records đã được load thì nó cũng ko thực hiện truy vấn nữa)
```

## Kiểm tra sự tồn tại của records

Bây giờ chúng ta không muốn đếm số records nữa mà chỉ đơn giản là muốn biết kết quả truy vấn dữ liệu có tồn tại record hay không. Chúng ta có các method `.any?`, `.empty?`, `.present?`, hãy tiếp tục xem chúng hoạt động như thế nào?

### Hàm `.any?`

Trong Ruby, `.any?` kiểm tra mỗi phần tử trong mảng, cho đến khi nó gặp 1 giá trị được đánh giá là true thì sẽ return true

```ruby
arr = [nil, false, 1]
arr.any?
# => true

arr = [nil, false]
arr.any?
# => false
```

Trong ActiveRecord::Relation, `.any?` hoạt động tương tự như `.size`. Nếu records chưa được load nó sẽ thực hiện 1 câu query `SELECT LIMIT 1` và trả về kết quả true/false, ngược lại nếu records đã được load thì nó không query nữa

```ruby
users = User.all
users.loaded? # => nil
users.any?
# SELECT 1 AS one FROM `users` LIMIT 1
# => true

users.load
users.loaded? # => true
users.any?
# => true
```

### Hàm `.empty?`

Ngược lại với `.any?`, `.empty?` sẽ return true nếu không tồn tại records

Trong ActiveRecord::Relation, `.empty?` hoạt động giống như `.any?`, để kiểm tra sự tồn tại của record, nó sẽ thực hiện 1 câu query `SELECT LIMIT 1` nếu records chưa được load và nếu records đã được load thì nó trả về luôn kết quả

Tuy nhiên, điểm khác nhau giữa `.empty?` và `.any?` lại đến từ cách chúng hoạt động trong Ruby. Như đã đề cập ở trên `.any?` kiểm tra mỗi phần tử trong mảng, cho đến khi nó gặp 1 giá trị được đánh giá là true thì sẽ return true. Trong khi `.empty?` thì nó không quan tâm lắm tới giá trị của element trong mảng, chỉ cần mảng đó có element là return false

```ruby
arr = [nil, false, 1]
arr.any?
# => true
arr.empty?
# => false

arr = [nil, false]
arr.any?
# => false
arr.empty?
# => false

arr = []
arr.any?
# => false
arr.empty?
# => true
```

### Hàm `.present?`

`.present?` không phải là 1 hàm của Ruby, nó là 1 hàm của Rails kiểm tra 1 mảng có element hay không, 1 string có tồn tại ký tự khác space hay không, 1 biến có nil hay không.

Trong ActiveRecord::Relation, `.present?` hoạt động tương tự như `.length`, nó sẽ load records ra array và kiểm tra sự tồn tại giá trị của record trên array đó. Vì vậy hãy cẩn thận khi sử dụng `.present?` với 1 object của ActiveRecord::Relation (trừ khi bạn chắc chắn records đã được load)

```ruby
users = User.all
users.loaded? # => nil
users.present?
# SELECT `users`.* FROM `users`
# => true

users.loaded?
# => true
users.present?
# => true
```

## Lựa chọn tối ưu

Theo những gì mình đã trình bày ở trên, ở hầu hết trường hợp, khi đếm số lượng records bạn nên sử dụng `.size`, khi kiểm tra sự tồn tại của records, bạn nên sử dụng `.empty?` hoặc `.any?`.

Tuy nhiên, trong một vài trường hợp, không hẳn những lựa chọn trên luôn là tối ưu nhất. Ví dụ:

```ruby
<% if @users.any? %>
  <h1>List of users</h1>
  <% @users.each do |user| %>
    ...
  <% end %>
<% end %>
```

Đoạn code trên đang muốn render ra list users khi chắc chắn rằng users đó có tồn tại records. Với đoạn code trên, bạn sẽ phải thực hiện 2 câu query, đầu tiên là `SELECT COUNT` cho `@users.any?`, sau đó là `SELECT *` để load dữ liệu. Tuy nhiên, nếu bạn sử dụng `.present?` trong trường hợp này, bạn chỉ cần thực hiện đúng 1 câu query `SELECT *` để làm cả 2 việc trên.

Qua bài viết, hi vọng các bạn có thể hiểu được cách hoạt động của 6 methods mà mình đã trình bày, từ đó có thể sử dụng chính xác trong từng trường hợp cụ thể để đạt hiệu quả tối ưu nhất. Cảm ơn các bạn đã đọc bài viết

Nguồn tham khảo: https://longliveruby.com/articles/active-record-counting-records