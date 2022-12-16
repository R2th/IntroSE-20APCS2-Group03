Khi lập trình web ắt hẳn các bạn sẽ dùng đến một trường 'status' (trạng thái). Nhưng với một trường là status thì làm sao để có thể lưu được nhiều trạng thái khác nhau, chắc sẽ có bạn sẽ nghĩ tới trường hợp sử dụng kiểu dữ liệu là boolean, nhưng với kiểu dữ liệu là boolean chúng ta chỉ có thể lưu trữ 2 loại trạng thái đó là `true` hoặc `false`, với lại cảm giác nó cũng không rõ ràng lắm nhỉ. Ví dụ bạn muốn nhiều hơn 2 trạng thái ví dụ như `[:pending, :accept, :reject]` chả hạn. Thì ở bài viết lần này mình xin giới thiệu với các bạn một kĩ thuật trong rails để có thể xử lý tình huống này đó chính là `Enum`.
<br>
Để sử dụng `Enum` thì bạn cần khai báo kiểu dữ liệu ở đây là `integer` thay vì kiểu dữ liệu `boolean` hay `string`. Enum cho phép bạn map các giá trị strings với các giá trị integer. Để khai báo dùng `Enum` rất đơn giản bạn chỉ cần viết đoạn code sau trong model.
```ruby
class Order < ApplicationRecord
      enum status: [:pending, :accept, :reject]
end
```
Nhìn ví dụ trên ta có thể tóm tắt định nghĩa của `Enum` là `Enum` là một tập hợp các giá trị có thể có của một thuộc tính. 
Để sử dụng `Enum`, rất đơn giản chỉ cần gọi đến các giá trị mà bạn khai báo đối với thuộc tính bạn khai báo là `Enum`. Bạn có thể truy cập `Enum` bởi một đối tượng, mở console lên và test nhé.

Ví dụ :
```ruby
order = Order.first
=> #<Order id: 1, status: "pending", created_at: "2020-03-17 09:07:05", updated_at: "2020-03-17 09:07:05", user_id: 2>

# để kiểm tra trạng thái của order có phải đang pending không, ta làm như sau
order.pending?
=> true
order.accept?
=> false
order.reject?
=> false
```

Hay là bạn muốn lấy tất cả các record mà có status là `pending`:
```ruby
Order.pending
# tương tự nếu muốn lấy các status khác
Order.accept
Order.reject
```
Bạn có thể lấy tất cả các giá trị của status bằng cách
```ruby
Order.statuses # gọi đến số nhiều của trường bạn đặt tên.
=> {"pending"=>0, "accept"=>1, "refuse"=>2}
```
mặc định rails sẽ lưu các giá trị của enum lần lượt từ 0 trở lên. Bạn có thể đặt lại các giá trị đó bằng cách khai báo
```ruby
class Conversation < ActiveRecord::Base
  enum status: { active: "a", archived: "b" }
end

Conversation.statuses 
=> {"active"=> "a", "archived"=> "b"}
```

## Sử dụng prefix và suffix trong enum
Nếu bạn không muốn gọi đến các giá trị của `Enum` theo mặc định, mà thay vào đó muốn thêm các tiền tộ hậu tố khác đứng trước cái giá trị đó cho tường minh thì trong Rails chúng ta rất dễ dàng khai báo như sau. Ví dụ với `suffix`:
```ruby
class RegisterCourse < ApplicationRecord
    enum status: {pending: 0, approve: 1, discard: 2, block: 3}, _suffix: true
end
```
bình thường để lấy ra các record có trạng thái là `pending` ta chỉ cần `RegisterCourse.pending`. Thế nhưng nếu ta khai báo như thế kia và cố tình truy cập sẽ dẫn đến một thông báo lỗi :
```ruby
NoMethodError (undefined method `pending' for #<Class:0x00007f1f9977f5f0>)
```
Vì có khai báo `_suffix: true` nên để gọi đến nó ta phải gọi như sau
```ruby
RegisterCourse.pending_status

```
Mặc định rails sẽ lấy hậu tố là tên trường, ở trong trường hợp này nó là `status`.
Nếu không muốn sẽ dụng theo mặc định ta có thể khai báo và đặt một tên khác như sau:
```ruby
class RegisterCourse < ApplicationRecord
    enum status: {pending: 0, approve: 1, discard: 2, block: 3}, _suffix: "hello"
end

# để truy cập
RegisterCourse.pending_hello
```
Tương tự ta sử dụng nó với `prefix`
```ruby
class RegisterCourse < ApplicationRecord
    enum status: {pending: 0, approve: 1, discard: 2, block: 3}, _prefix: true
end

# để truy cập 
RegisterCourse.status_pending
```
hay đặt một cái tên tiền tố khác
```ruby
class RegisterCourse < ApplicationRecord
    enum status: {pending: 0, approve: 1, discard: 2, block: 3}, _prefix: "hello"
end

# để truy cập
RegisterCourse.hello_pending
```

Như vậy đó là những gì mà mình muốn giới thiệu với các bạn trong bài viết lần này. 

Tài liệu tham khảo https://api.rubyonrails.org/v5.2.4.1/classes/ActiveRecord/Enum.html