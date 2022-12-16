Module `Enumerable` thì đã rất phổ biến trong Ruby. Nó đóng gói rất nhiều những method tuyệt vời bên trong và thật khó để tìm ra ứng dụng nào đó không sử dụng nó. Bài viết này mình xin trình bày những khái niệm cơ bản của `Enumerable`![](https://images.viblo.asia/ea97993b-ff39-4ef3-93cf-f4b4d883284f.png)

Vì tính kế thừa trong Ruby bị giới hạn trong một lớp cha duy nhất thôi nên các module cho phép bạn chia sẻ chức năng giữa các class không liên quan đến nhau.

`Enumerable` là một module như thế, một trong số các chức năng đó sẽ được bạn tích hợp bên trong class của mình.

Hãy xem các module được tích hợp trong các lớp `Array` và `Hash`
```
[10] pry(main)> Array.included_modules
=> [ActiveSupport::ToJsonWithActiveSupportEncoder,
 JSON::Ext::Generator::GeneratorMethods::Array,
 MessagePack::CoreExt,
 Enumerable,
 ActiveSupport::ToJsonWithActiveSupportEncoder,
 RequireAll,
 PP::ObjectMixin,
 JSON::Ext::Generator::GeneratorMethods::Object,
 ActiveSupport::Tryable,
 ActiveSupport::Dependencies::Loadable,
 Kernel]
```

```
[10] pry(main)> Hash.included_modules
=> [ActiveSupport::ToJsonWithActiveSupportEncoder,
 DeepMerge::DeepMergeHash,
 JSON::Ext::Generator::GeneratorMethods::Hash,
 MessagePack::CoreExt,
 Enumerable,
 ActiveSupport::ToJsonWithActiveSupportEncoder,
 RequireAll,
 PP::ObjectMixin,
 JSON::Ext::Generator::GeneratorMethods::Object,
 ActiveSupport::Tryable,
 ActiveSupport::Dependencies::Loadable,
 Kernel]
```

#### Tại sao nên sử dụng `Enumerable` trong class của bạn

Module `Enumerable` cung cấp sẵn cho bạn những method để tìm kiếm, duyệt qua và sắp xếp tập hợp. Nên khi cần làm việc với tập hợp, bạn có thể đơn giản là sử dụng luôn `Enumerable`.

#### Tạo class `Enumerable` của bạn
Do đó, để sử dụng module `Enumerable`, bạn đơn giản chỉ cần khai báo `include` trong class của mình và cung cấp một method `each` như sau:
```ruby
class Person
  attr_accessor :name, :emails

  include Enumerable

  def initialize(name)
    @name = name
  end

  def each
    yield name
  end
end

me = Person.new("Cezar").to_a # => ["Cezar"]
me.emails = ["home@gmail.com", "work@gmail.com", "newsletters@gmail.com"]
me.emails.sort
# => ["home@gmail.com", "newsletters@gmail.com", "work@gmail.com"]
```

Ruby phiên hiện tại đã mặc định tích hợp sẵn `Enumerable` trong class của mình.

```
[10] pry(main)> Person.class
=> Class
[11] pry(main)> Person.included_modules
=> [Enumerable,
 ActiveSupport::Dependencies::ZeitwerkIntegration::RequireDependency,
 ActiveSupport::ToJsonWithActiveSupportEncoder,
 RequireAll,
 PP::ObjectMixin,
 JSON::Ext::Generator::GeneratorMethods::Object,
 ActiveSupport::Tryable,
 ActiveSupport::Dependencies::Loadable,
 Kernel]
```

Do đó bạn có thể sử dụng luôn các method như `to_a`, `sort` như bên trên mà không cần phải định nghĩa

#### `Enumerable` khác gì `Enumerator`?

Mặc dù có vẻ gần giống nhau nhưng có một khác biệt lớn giữa 2 khái niệm này.

- Module `Enumerable` là thứ bạn tích hợp trong class của mình để sử dụng tất cả những method `Enumerable`.
- `Enumerator` là một `class` có tích hợp sẵn module `Enumerable`, cũng giống như các class khác của bạn.

```
[10] pry(main)> e = [1, 2, 3].map
=> #<Enumerator: ...>
[11] pry(main)> a.class
=> Enumerator
[12] pry(main)> e.class.included_modules
=> [Enumerable,
 ActiveSupport::Dependencies::ZeitwerkIntegration::RequireDependency,
 ActiveSupport::ToJsonWithActiveSupportEncoder,
 RequireAll,
 PP::ObjectMixin,
 JSON::Ext::Generator::GeneratorMethods::Object,
 ActiveSupport::Tryable,
 ActiveSupport::Dependencies::Loadable,
 Kernel]
[12] pry(main)> e.each_with_index { |n, i| n * i }
=> [0, 2, 6]
[13] pry(main)> e.next
=> 1
[14] pry(main)> e.next
=> 2
```

####  Xây dựng module `Enumerable` của bạn.

Cách tốt nhất để tìm hiểu là tạo một module từ đầu:

```ruby
module Reduceable
  def reducer(accumulator)
    each do |value|
      accumulator = yield(acc, value)
    end
    accumulator
  end
end

class Person
  attr_accessor :emails
  include Reduceable

  def number_of_emails
    reducer(0) { |total, email| total + email.size }
  end

  def each
    yield emails
  end
end

me = Person.new
me.emails = ["home@gmail.com", "work@gmail.com", "newsletters@gmail.com"]
me.number_of_emails # => 3
```

Method `reducer` nhận vào giá trị ban đầu `accumulator` (trong ví dụ trên là `0`), và với mỗi giá trị đó, nó truyền cả hai `accumulator` và `email` đến block mà nó vừa nhận được. Cuối cùng, nó trả về giá trị `accumulator`.

Bạn có thể làm bất cứ điều gì bạn muốn với các đối số đó bên trong block.

#### Tìm giá trị min/max

Với `Enumerable` thì bạn sẽ có thể làm rất đơn giản như sau:

```
[10] pry(main)> [1, 2, 3].min
=> 1
[11] pry(main)> [1, 2, 3].max
=> 3
```

`min`/`max` method cũng có thể nhận vào các đối số

```
[10] pry(main)> [1, 2, 3].min(2)
=> [1, 2]
[11] pry(main)> [1, 2, 3].max
=> [3, 2]
```

#### Reset một enumerable

Một mẹo nhỏ mà bạn có thể thực hiện với `Enumerator` là method `rewind` - dịch về phần tử đầu tiên.

```
[10] pry(main)> e = [1, 2, 3].map
=> #<Enumerator: ...>
[11] pry(main)> e.next
=> 1
[12] pry(main)> e.next
=> 2
[13] pry(main)> e.rewind
=> #<Enumerator: ...>
[14] pry(main)> e.next
=> 1
```

#### Đảo một enumerable

Method `reverse_each` sẽ trả về một `Enumerator` với các phần tử đã bị đảo ngược.

```
[10] pry(main)> [1, 2, 3].reverse_each.to_a
=> [3, 2, 1]
```

#### Method `count`, `size` và `length`

Method `size` chỉ là cách viết khác của `length` mà thôi, còn method `count` sẽ hơi khác một chút. `count` có thể dùng với a block. Nếu truyền vào block cho method `count`, nó chỉ đếm những phần tử mà block trả về giá trị tin cậy (không phải `nil` hay là `false`)

```
[10] pry(main)> [1, :a, "b", nil, false].length
=> 5
[11] pry(main)> [1, :a, "b", nil, false].count { |n| n }
=> 3
```

***

### Kết

Trên đây là những kiến thức cũng như cách sử dụng cơ bản module `Enumerable`. Hi vọng nó sẽ có ích với bạn.

### Tham khảo
- https://mixandgo.com/learn/what-is-a-ruby-enumerable-and-why-would-you-use-it