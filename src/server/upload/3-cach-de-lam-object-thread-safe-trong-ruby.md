## Thread Safety là gì ?
Định nghĩa thread safe là code hoạt động chính xác khi có nhiều thread truy cập vào cùng thời điểm đó. Ví dụ: Khi một biến có giá trị nhất đinh, nhưng trong khi đó một thread khác có thể đã thay đổi nó.
```
x = 0

10.times.map do |i|
  Thread.new do
    puts "before (#{ i }): #{ x }"
    x += 1
    puts "after (#{ i }): #{ x }"
  end
end.each(&:join)

puts "\ntotal: #{ x }"
```

chuyện gì xảy ra ở đây thế? Khi các thread bắt đầu, ta sẽ thấy giá trị ban đầu của x. Nhưng khi mỗi thread cố gắng thêm +1, giá trị trở nên khác nhau do tính toán song song. Nếu không có sự đồng bộ thích hợp, trạng thái của x trong mỗi thread là không thể đoán trước.

```
% ruby count.rb
before (2): 0
before (0): 0
before (1): 0
after (1): 3
before (5): 1
before (7): 1
after (2): 1
after (0): 2
before (4): 1
after (5): 4
after (7): 5
before (9): 1before (3): 1
before (8): 1
before (6): 1
after (4): 6

after (9): 10after (3): 7
after (6): 9

after (8): 8

total: 10
```

Khi thread (3) bắt đầu, x bằng 1, nhưng sau khi thêm +1 giá trị của nó là 7.

## 3 cách để làm object thread-safe
### Làm cho object stateless & frozen
Đây là cách tiếp cận cơ bản nhất đôi khi dễ thực hiện nhất và cũng rất an toàn. Làm cho object của bạn stateless. Nói cách khác, cấm một object có bất kỳ trạng thái nội bộ nào. Điều đó có nghĩa là, chỉ sử dụng các biến cục bộ và không sử dụng các biến instance (@ivars).

Để đảm bảo rằng bạn không vô tình thêm trạng thái, bạn có thể đóng băng object. Bằng cách đó, nó sẽ tạo ra một ngoại lệ nếu bạn cố gắng cấu trúc lại nó.
```
class MyCommandHandler
  def initialize
    make_threadsafe_by_stateless
  end

  def call(cmd)
    local_var = cmd.something
    output(local_var)
  end

  private

  def make_threadsafe_by_stateless
    freeze
  end

  def output(local_var)
    puts(local_var)
  end
end

CMD_HANDLER = MyCommandHandler.new
```

Vì object của bạn không có bất kỳ trạng thái cục bộ nào nên nó có thể được sử dụng tự do giữa nhiều thread. Chẳng hạn, bạn có thể sử dụng cùng một instance khi xử lý các yêu cầu khác nhau trong một máy chủ ứng dụng thread chẳng hạn như Puma.

Bạn có thể gán MyCommandHandler.new cho một biến toàn cục hoặc truyền vào các object như một dependency được tạo trong các thread khác nhau và mọi thứ sẽ ổn.

Nếu ai đó trong nhóm của bạn cố gắng cấu trúc lại code để:
```
class MyCommandHandler
  def initialize
    make_threadsafe_by_stateless
  end

  def call(cmd)
    @ivar = cmd.something
    output
  end

  private

  def make_threadsafe_by_stateless
    freeze
  end

  def output
    puts(@ivar)
  end
end
```

họ sẽ nhận được một ngoại lệ không thể sửa đổi MyCommandHandler bị đóng băng trừ khi họ xóa make_threadsafe_by_stateless, trong trường hợp đó, đó là một quyết định có ý thức, không phải là một quyết định ngẫu nhiên.

Hãy tưởng tượng một tình huống như thế này:
```
class MyCommandHandler
  def initialize(repository, adapter)
    @repository = repository
    @adapter = adapter
    make_threadsafe_by_stateless
  end

  def call(cmd)
    obj = @repository.find(cmd.id)
    obj.do_something
    @repository.update(obj)
    @adapter.notify(SomethingHappened.new(cmd.id))
  end

  private

  def make_threadsafe_by_stateless
    freeze
  end
end

CMD_HANDLER = MyCommandHandler.new(Repository.new, Adapter.new)
```

Nếu CMD_HANDLER được sử dụng giữa nhiều thread, thì các dependencies của nó cũng vậy. Điều đó có nghĩa là thread safe là một thuộc tính cho một đồ thị của các object (object và các dependencies của nó và các dependencies của chúng, v.v.) hơn là một thuộc tính của một object.

Trong trường hợp này, MyCommandHandler là không trạng thái và an toàn theo chuỗi là chưa đủ. Các dependencies của nó cũng phải được đảm bảo để toàn bộ code hoạt động bình thường.

### Sử dụng cấu trúc thread-safe cho local state
Nếu bạn biết rằng một object có thể được sử dụng giữa nhiều thread, bạn có thể phân chia trạng thái của nó trên mỗi thread. Để làm việc này bạn có thể sử dụng ThreadLocalVar từ concurrent-ruby:
> ThreadLocalVar: Shared, mutable, isolated variable which holds a different value for each thread which has access. Often used as an instance variable in objects which must maintain different state for different threads

```
class Subscribers
  def initialize
    @subscribers = Concurrent::ThreadLocalVar.new{ [] }
  end

  def add_subscriber(subscriber)
    @subscribers.value += [subscriber]
  end

  def notify
    @subscribers.value.each(&:call)
  end

  def remove_subscriber(subscriber)
    @subscribers.value -= [subscriber]
  end
end

SUBSCRIBERS = Subscribers.new
```

SUBSCRIBERS có thể được sử dụng từ bên trong các thread khác nhau vì trạng thái của nó là khác nhau đối với mọi thread sử dụng nó. @subscribe.value là một mảng khác nhau cho mọi thread.

### Bảo vệ state với mutexes
Trong cách tiếp cận này, trạng thái của object được chia sẻ giữa tất cả các thread nhưng quyền truy cập bị giới hạn ở một thread duy nhất cùng một lúc.
```
require 'thread'

class Subscribers
  def initialize
    @semaphore = Mutex.new
    @subscribers = []
  end

  def add_subscriber(subscriber)
    @semaphore.synchronize do
      @subscribers += [subscriber]
    end
  end

  def notify
    @semaphore.synchronize do
      @subscribers.each(&:call)
    end
  end

  def remove_subscriber(subscriber)
    @semaphore.synchronize do
      @subscribers -= [subscriber]
    end
  end
end

SUBSCRIBERS = Subscribers.new

```

Mặc dù thành thật mà nói, tôi không chắc liệu có cần đồng bộ hóa cho một method không thay đổi state như là notify… ([thảo luận trên reddit](https://www.reddit.com/r/ruby/comments/9gvn48/3_ways_to_make_your_ruby_object_threadsafe/e67cemw/))

Nhưng thay vì đi theo cách đó, bạn có thể thích sử dụng các lớp đã có sẵn như Concurrent :: Array cùng với method trên.
> A thread-safe subclass of Array. This version locks against the object itself for every method call, ensuring only one thread can be reading or writing at a time. This includes iteration methods like #each.

```
require 'concurrent'

class Subscribers
  def initialize
    @subscribers = Concurrent::Array.new
  end

  def add_subscriber(subscriber)
    @subscribers << subscriber
  end

  def notify
    @subscribers.each(&:call)
  end

  def remove_subscriber(subscriber)
    @subscribers.delete(subscriber)
  end
end

SUBSCRIBERS = Subscribers.new
```

## Bonus
object của bạn không cần phải được tạo thread safe nếu:
* bạn không chia sẻ nó giữa các thread ;)
* I E. bằng cách luôn tạo instance mới khi cần thiết

```
class MyCommandHandler
  def initialize(repository, adapter)
    @repository = repository
    @adapter = adapter
  end

  def call(cmd)
    @obj = @repository.find(cmd.id)
    @obj.do_something
    @repository.update(@obj)
    @adapter.notify(SomethingHappened.new(cmd.id))
  end
end

CMD_HANDLER = -> (cmd) { MyCommandHandler.new(Repository.new, Adapter.new).call(cmd) }
```

Ở đây, trong trường hợp các thread của chúng ta sử dụng CMD_HANDLER.call (...) thì chúng ta không cần phải lo lắng về độ an toàn của thread vì mỗi khi chúng ta cần MyCommandHandler, chúng ta khởi tạo một object mới với toàn bộ cây phụ thuộc. Các phần phụ thuộc (repository, adapter) có thể sử dụng bất kỳ kỹ thuật nào đã đề cập bên trên để an toàn cho thread hoặc chúng cũng có thể là các instance mới.

Và đây là lý do mà nhiều class không thread safe trong Ruby. Chúng chỉ đơn giản là không được tạo ra cho chác ứng dụng multiple threading. Các tác giả có thể đã không hình dung trường hợp sử dụng như vậy cho họ. Vấn đề lớn nhất là rất khó để biết được gem mà chúng ta định sử dụng có thread safe hay không.

## Tham khảo
https://lucaguidi.com/2014/03/27/thread-safety-with-ruby/

https://blog.arkency.com/3-ways-to-make-your-ruby-object-thread-safe/