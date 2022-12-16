# Phần 1: Giới thiệu về test double và cách sử dụng trong RSpec
## Test double là gì ?
> Test Double là một thuật ngữ chung cho bất kỳ trường hợp nào bạn thay thế một đối tượng được sử dụng thực tế cho mục đích kiểm thử.

Mục đích chính của test double là làm giảm sự phụ thuộc và tăng tính độc lập của các test case. Việc này vô cùng quan trọng trong unit test vì chúng ta đều mong muốn test case chạy nhanh, độc lập và ít phụ thuộc vào các "unit" khác nhất có thể.

**Martin Fowler** định nghĩa test double ra làm [5 loại](https://martinfowler.com/bliki/TestDouble.html)  khác nhau tùy thuộc vào mục đích sử dụng:
* **Dummy**: các đối tượng được truyền vào nhưng không bao giờ thực sự được sử dụng. Thông thường chúng chỉ được sử dụng để lấp đầy vào danh sách tham số.
* **Fake**: các đối tượng thực sự có triển khai hoạt động, nhưng không được lưu trữ như trong thực tế ([InMemoryTestDatabase](https://martinfowler.com/bliki/InMemoryTestDatabase.html) là một ví dụ điển hình).
* **Stubs**: các đối tượng chứa dữ liệu được xác định trước và sử dụng nó để trả lại dữ liệu khi call đến những method nhất định.
* **Spies**: các đối tượng cho phép ghi lại cách mà nó hoạt động như số lần được gọi, tham số nhận vào, ...
* **Mocks**: cũng giống như stub có thể trả về những dữ liệu cho trược nhưng kèm theo yêu cầu là phải verify  action đấy được gọi trong test case.

## Dummy
Thường được sử dụng để lấp đầy tham số của một hàm trong những case mà tham số đấy không được sử dụng nhằm tăng tốc test case.

Một ví dụ trong Rspec:
```ruby
class Dummy
  define method1 excute_method2, very_complex_object
    if excute_method2 
      method2 very_complex_object
    end
 end

 define method2 very_complex_object
   # excute some logic
 end
end

# Rspec
# Trong case excute_method2 = false very_complex_object không được sử dụng, 
# method chỉ đơn giản return nil nên việc tạo ra 1 object phức tạp như
# thực tế là không cần thiết
...
describe ".method1" do
  it "should return nil" do
    dummy = double("dummy")
    expect(Dummy.new.method1(false, dummy)).to be_nil
  end
end
...
```

## Fake
Thường ít được sử dụng trong unit test, tuy nhiên bạn có thể tìm hiểu thêm về InMemoryTestDatabase [tại đây](https://martinfowler.com/bliki/InMemoryTestDatabase.html) 

## Stubs
Sử dụng để fake kết quả trả về của một hàm mà mình không thực sự muốn chạy hàm đó. Trong rails mình thường sử dụng để stub những model callback không cần thiết trong test case đặc biệt là các callback tác động vào database hay elasticsearch ...

Rspec cung cấp cú pháp để stub method của một object như sau:
```ruby
book = double("book")
allow(book).to receive(:title) { "The RSpec Book" }
allow(book).to receive(:title).and_return("The RSpec Book")
allow(book).to receive_messages(
    :title => "The RSpec Book",
    :subtitle => "Behaviour-Driven Development with RSpec, Cucumber, and Friends")
```

hoặc có thể dùng cách viết tắt sau:
```javascript
book = double("book", :title => "The RSpec Book")
```

Một ví dụ về sử dụng stub trong Rspec:
```ruby
class Stub
  define method1
    if method2
      return "ok"
    end
 end

 define method2
   if condition
     # excute some logic
     return true
   else
     # excute some logic
     return false
   end
 end
end

# Rspec
# Ở đây mình stub method2 trả về true
...
describe ".method1" do
  it "should return ok" do
    stub = Stub.new
    allow(stub).to receive(:method2) {true}
    expect(stub.method1).to eq "ok"
  end
end
...
```

## Spies
Sử dụng để verify những hành động trong method như ghi log, bắn noti,...
Chúng ta có thể verify method được gọi mấy lần, với tham số nào, ...Cú pháp để sử dụng spy trong Rspec:
```python
invitation = spy('invitation')

user.accept_invitation(invitation)

expect(invitation).to have_received(:accept)

# You can also use other common message expectations. For example:
expect(invitation).to have_received(:accept).with(mailer)
expect(invitation).to have_received(:accept).twice
expect(invitation).to_not have_received(:accept).with(mailer)
```

Một ví dụ sử dụng spies trong Rspec:
```ruby
class SomeCommand
  def call(arg:, other:)
    if arg <= 0
      logger.warn("args should be positive")
    else
      logger.debug("all fine")
    end
    # some logic
  end

  def logger
    Rails.logger
  end
end

describe SomeCommand
  let(:logger) { spy('Logger') }

  # stub method logger trả về spy logger
  before { allow(subject).to receive(:logger) { logger } }

  context 'with negative value' do
    it 'warns' do
      subject.call(arg: -1, other: 6)
      # verify việc ghi log
      expect(logger).to have_received(:warn).with("args should be positive")
      expect(logger).not_to have_received(:debug)
    end
  end

  context 'with positive value' do
    it 'logs as debug' do
      subject.call(arg: 1, other: 6)
      # verify việc ghi log
      expect(logger).not_to have_received(:warn)
      expect(logger).to have_received(:debug).with("all fine")
    end
  end
end
```

## Mock
Theo mình thấy thì mock khá giống stub + spies kết hợp lại. Cú pháp sử dụng mock trong Rspec:
```ruby
person = double("person")
expect(Person).to receive(:find) { person }
expect(Person).to receive(:find).with("abc") { person }
```

Một ví dụ sử dụng mock trong rspec:
```ruby
class Mock
  define test_key key
    if is_valid_key
      open_door key
    end
 end

 define open_door
   # some logic
   return "door is opened"
 end

 define valid_key? key
   # some logic
 end
end

# Rspec
...
describe ".test_key" do
  it "should return door is opened" do
    mock = Mock.new
    # Ở đây mình đang test case key valid nên sẽ mock method valid_key? trả về true
    expect(mock).to receive(:valid_key?).with("key") {true}
    expect(mock).to receive(:open_door).with("key") {"door is opened"}
    mock.test_key("key")
    expect(mock.test_key("key")).to eq "door is opened"
  end
end
...
```

## Tài liệu tham khảo
https://jmauerhan.wordpress.com/2018/10/04/the-5-types-of-test-doubles-and-how-to-create-them-in-phpunit/

https://www.martinfowler.com/articles/mocksArentStubs.html

https://martinfowler.com/bliki/TestDouble.html

https://rubydoc.info/gems/rspec-mocks/frames

https://blog.pragmatists.com/test-doubles-fakes-mocks-and-stubs-1a7491dfa3da