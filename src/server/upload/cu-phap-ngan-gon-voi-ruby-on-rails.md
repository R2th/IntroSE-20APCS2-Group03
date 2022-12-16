Xin chào tất cả các bạn,
Hôm nay mình sẽ chia sẻ một vài típ nhỏ trong Ruby mà có thể các bạn chưa biết, cũng có thể đã biết. Nhưng riêng đối với mình thì mình cảm thấy thật hay ho, có vài cái đã biết nhưng không dùng thường xuyên nên chúng dần đi vào quên lãng. Hôm rồi tình cờ nhớ lại nên chia sẽ luôn.

## 1. Hash#dig
Đa số chúng ta thường viết như thế này:
```ruby
if params[:user] && params[:user][:address]
  ...
end
```
Nhìn vào thì có ai tưởng tượng đến `&.` không?
Nhưng đối với các object Hash chúng ta có thể dùng `dig` để viết lại như sau:
```ruby
if params.dig :user, :address
  ...
end
```

## 2. Object#presence_in
Tiếp theo:
```ruby
colors = [:red, :green, :blue]
color = colors.include?(params[:color]) ? params[:color] : :pink

#hoặc như thế này
color = (colors.include?(params[:color]) && params[:color]) || :pink
```
Nếu như vậy thì như thế này trông ngon lành hơn rất nhiều :)
```ruby
params[:color].presence_in(colors) || :pink
```

## 3. Object#presence
Mình nhớ lúc trước toàn dùng `presence` thôi, mà tự nhiên nay nhận ra về sau này toàn dùng cái cách cùi bắp khi mới vào nghề, không hiểu là vì sao lại cho nó vào một góc nữa :(

Thay vì như thế này:
```ruby
object.present? ? object : nil
```
thì dùng như thế này nhé
```ruby
object.presence
```

## 4. Module#delegate
Có rất nhiều bài nói về cách sử dụng delegate rồi, nhưng ở đây mình sẽ dùng ví dụ để thấy lợi ích của việc dùng delegate nhé

```ruby
class User < ApplicationRecord
  belongs_to :company
  delegate :name, to: :company
end

...
user = User.first
user.name # thay vì phải viết user.company.name
```

## 5. Array#zip
Giả sử có 2 mảng cùng số phần tử, và muốn biến phần tử của mảng này thành key, còn phần tử mảng kia thành value tương ứng chúng ta làm như sau:
```ruby
a = ["1", "2", "3"]
b = ["a", "b", "c"]

Hash[a.zip b] = {"1" => "a", "2" => "b", "3" => "c"}
```

## 6. Array#all? &:blank?
Kiểm tra array có chứa `nil` hoặc `' '` không:
```ruby
arr = ["a",  "b",  nil, ' ']
arr.all? &:blank? # => true 
```

Cảm ơn các bạn đã dành thời gian để đọc. Thanks all ^.^