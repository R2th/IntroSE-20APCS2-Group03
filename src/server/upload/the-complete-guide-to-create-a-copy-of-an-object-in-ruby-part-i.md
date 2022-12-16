Tại sao chúng ta lại cần copy các Object? Nhu cầu này xuất hiện khi chúng ta muốn thay đổi hoặc di chuyển chúng mà vẫn phải đảm bảo được tính nguyên bản của các Object này.

Trong bài viết này, chúng ta cùng nhau tìm hiểu các chủ đề sau:

- shallow copy và deep copy
- dup và clone trong ruby
- so sánh giữa dup và clone

# Introduction

Nguyên tắc copy một giá trị hay một đối tượng là khái niệm chính của bất kì ngôn ngữ lập trình nào

Có rất nhiều nguyên tắc để copy các đối tượng hay các giá trị đã được thực hiện theo thời gian.

Trong khuôn khổ bài viết này, chúng ta sẽ tập trung vào shallow copy và deep copy

Chúng ta sẽ cùng nhau khám phá xem, ngôn ngữ Ruby đã cung cấp những gì để có thể sử dụng các nguyên tắc này

# Shallow copy vs. Deep copy

- Shallow copy dựa trên một thực tế rằng: nó tạo ra một bản copy thông minh của một đối tượng cho trước. Đối tượng vừa được tạo ra này chứa chính xác các giá trị của đối tượng được copy. Nếu một biến của đối tượng được sao chép là tham chiếu đến đối tượng khác, thì chỉ địa chỉ tham chiếu của đối tượng được sao chép.

- Deep copy là một shallow copy, thêm vào đó, tất cả các đối tượng được trỏ bởi tham chiếu trong đối tượng được sao chép cũng sẽ được sao chép.Một deep copy xảy ra khi một đối tượng được copy cùng với các đối tượng mà nó refer đến

# dup and clone methods

Bây giờ, chúng ta đã hiểu hơn về các nguyên tắc của shallow copy và deep copy. Bây giờ, hãy cùng nhau khám phá cách thức mà Ruby cung cấp để sao chép các đối tượng

### Object#dup

Method Object#dup return một shallow copy của đối tượng đang gọi:

```
 obj1 = 'Hello world!'

collection1 = [obj1, 42]
collection2 = collection1.dup

obj1.object_id              # => 70092096927380
collection1.first.object_id # => 70092096927380
collection2.first.object_id # => 70092096927380

obj1.gsub!(' ', "\t")

obj1              # => "Hello\tworld!"
collection1.first # => "Hello\tworld!"
collection2.first # => "Hello\tworld!"
```

Ở ví dụ trên, một shallow copy của đối tượng collection1 được lưu trữ trong đối tượng collection2 bằng việc assign collection2 bằng collection1.dup.

Chúng ta có thể nhìn thấy collection2.first chứa một tham chiếu(địa chỉ vùng nhớ) đến obj1. Vì vậy, khi obj1 thay đổi, collection2.first cũng bị tác động thay đổi này vì lúc này obj1, collection1.first và collection2.first trỏ về cùng một địa chỉ vùng nhớ.

Thêm vào đó,  Object#dup cũng sẽ gọi ra method initialize_copy dành cho các đối tượng được copy mới, bạn có thể implement method này để tương tác với các đối tượng copy mới đó

```
require 'forwardable'

class Collection
  attr_reader :collection

  extend Forwardable

  def_delegator :@collection, :first, :obj

  def initialize(collection)
    @collection = collection
  end

  def initialize_copy(other_obj)
    puts 'initiliaze copy'
    super
  end
end

obj1 = 'Hello world!'

collection1 = Collection.new([obj1, 42])
collection2 = collection1.dup
```

Ta có thể thấy method initialize_copy được gọi ra khi method collection1.dup được gọi

### Object#clone

Method Object#clone cũng trả về một shallow copy của đối tượng đang gọi

```
obj1 = 'Hello world!'

collection1 = [obj1, 42]
collection2 = collection1.clone

obj1.object_id              # => 70092096927380
collection1.first.object_id # => 70092096927380
collection2.first.object_id # => 70092096927380

obj1.gsub!(' ', "\t")

obj1              # => "Hello\tworld!"
collection1.first # => "Hello\tworld!"
collection2.first # => "Hello\tworld!"
```

Ở ví dụ trên, một shallow copy của collection1 được lưu trữ trong collection2 bằng việc gán collection2 = collection1.clone.

Chúng ta có thể thấy, collection2.first là một tham chiếu đến obj1(tức collection2.first và obj1 có cùng địa chỉ ô nhớ), vì vậy khi obj1 thay đổi, lập tức collection2.first cũng thay đổi theo. 

Tương tự Object#clone cũng gọi hook method initialize_copy trên đối tượng đang gọi, vậy sự khác nhau giữa 2 method này là gì?

# clone vs dup

Mặc dù gần giống nhau, #clone có 3 điều khác biệt so với #dup

### Object#freeze

Với #clone, thì trạng thái frozen của đối tượng cũng được copy, còn #dup thì không

```
hello_world = 'hello world!'.freeze

hello_world.object_id                # => 70172035954580
hello_world.frozen?                  # => true

clone_with_frozen_state = hello_world.clone
clone_with_frozen_state.object_id    # => 70172035953860
clone_with_frozen_state.frozen?      # => true

clone_without_frozen_state = hello_world.clone(freeze: false)
clone_without_frozen_state.object_id # => 70172035953620
clone_without_frozen_state.frozen?   # => false

hello_world_dup = hello_world.dup
hello_world_dup.object_id            # => 70172035954080
hello_world_dup.frozen?              # => false
```

Bạn có thể tránh việc copy cả trạng thái frozen bằng việc truyền vào tham số frozen: false đến method Object#clone

### Object#extend

Khi sử dụng Object#clone, bất kì modules nào mà đối tượng được extend vẫn sẽ được copy, còn với Object#dup thì không:

```
class Hello
end

module World
  def hello_world
    puts 'Hello world!'
  end
end

hello = Hello.new
hello.extend World

hello.hello_world       # => Hello world!
hello.clone.hello_world # => Hello world!
hello.dup.hello_world   # => NoMethodError: undefined method `hello_world' for #<Hello:0x401b3a38>
```

### Object-level methods

Khi sử dụng Object#clone, tất cả những method object-level của đối tượng ban đầu đều sẽ được copy, còn Object#dup thì không:

```
class Hello end

hello = Hello.new

def hello.hello_world
  puts 'Hello world!'
end

hello.hello_world       # => Hello world!
hello.clone.hello_world # => Hello world!
hello.dup.hello_world   # => NoMethodError: undefined method `hello_world' for #<Hello:0x401b3a38>
```

Tham khảo:

https://medium.com/rubycademy/the-complete-guide-to-create-a-copy-of-an-object-in-ruby-part-i-91be8b9daafd