## Hash#dig
Có thể bạn đã gặp qua 1 đoạn code tương tự như thế này:
```
... if params[:user] && params[:user][:address] && params[:user][:address][:somewhere_deep]
```
Code như trên đúng là chưa đẹp cho lắm? đó là khi bạn chưa biết đến **dig** rồi, hãy coi **dig**  tương tự toán tử an toàn **&** đối với các đối tượng Hash, bạn có thể viết lại đoạn code trên như thế này.
```
... if params.dig(:user, :address, :where_deep)
```

## Object#presence_in
**presence_in** cho phép bạn thay thế các điều kiện (thường là toán tử bậc 3). Ví dụ: mã của bạn trông giống như:

```
sort_options = [:by_date, :by_title, :by_author] 
```

```
sort = (sort_options.include?(params[:sort]) && params[:sort]) || :by_date

// tương tự 
sort = (sort_options.include?(params[:sort]) && params[:sort]) || :by_date
```

Còn khi dùng **presence_in**
```
params[:sort].presence_in(sort_options) || :by_date
```

## Module#alias_attribute
Cho phép bạn tạo aliases cho các thuộc tính, bao gồm getter, setter và một predicate
```
class Person
  include ActiveModel::AttributeMethods

  attr_accessor :name
  attribute_method_suffix '_short?'
  define_attribute_methods :name

  alias_attribute :nickname, :name

  private

  def attribute_short?(attr)
    send(attr).length < 5
  end
end

person = Person.new
person.name = 'Bob'
person.name            # => "Bob"
person.nickname        # => "Bob"
person.name_short?     # => true
person.nickname_short? # => true
```

## Module#delegate

Delegate giúp dễ dàng gọi các public methods của object khác giống như là của chính mình, đặc biệt với các models có quan hệ phức tạp thì bạn có thể thực hiện gọi từ một class đến nhiều class khác.

Vd:
```
class User < ActiveRecord::Base
  has_one :profile
end
```
```
class Profile < ApplicationRecord
  belongs_to :user
end
```
Thay vì bình thường ta gọi thuộc tính name của user bằng cách
```
user.profile.name
```
Thì giờ với delegate ta có thể lấy bằng cách
```
delegate :name, to: :profile

// và gọi bằng lệnh
user.name 
```
Nếu muốn lấy nhiều thuộc tính của user
```
delegate :name, :email, to: :profile
```

Bạn cũng có thể custom prefix :
```
delegate :name, :email, to: :profile, prefix: :user

// lúc này các sẽ gọi các method bằng cách thêm tiền tố user_ phía trước user_name, user_email
```

## Single *Splat And Double **Splat Operator
### Single *Splat
Toán tử Splat, * để đơn giản hóa gán các toán giá trị của một mảng ứng với từng biến:<br>
Vd: 
```
ex_1
t,o,p,t,a,l = *(1..6) #=> [1, 2, 3, 4, 5, 6]
puts p #=> 3

ex_2
first, *rest, last  = ["a", "b", "c", "d"]

puts first #=> "a"
puts rest #=> ["b", "c"]
puts last #=> "d"
```

chúng ta cũng có thể sử dụng trên các object khác
```
Toptaller = Struct.new(:name, :tech)
toptaller = Toptaller.new("Eqbal", "Ruby")
name, tech = *toptaller
puts tech #=> Ruby
```

### Double **Splat
Với double splat nó hoạt động cũng giống như splat nhưng đối với các keyword, nó trả về một Hash với key: value
```
def doublesplat(args, *others, **hash_args)
  [args, others, hash_args]
end
```
result
```
> doublesplat 10
=> [10, [], {}]
> doublesplat 10, 20, 30
=> [10, [20, 30], {}]
> doublesplat 10, 20, 30, a: 40, b: 50
=> [10, [20, 30], {:a=>40, :b=>50}]
> doublesplat 10, d: 40, e: 50
=> [10, [], {:d=>40, :e=>50}]
```

### Nguồn
https://www.freecodecamp.org/news/rubys-splat-and-double-splat-operators-ceb753329a78/<br>
https://hackernoon.com/5-ruby-on-rails-tips-you-probably-dont-know-8b80b4a0890f<br>
https://api.rubyonrails.org/classes/Module.html#method-i-delegate