Sau một thời gian tìm hiểu và làm quen với `Mocks` và `Stubs` trong RSpec mình vẫn không thể phân biệt rõ ràng Mocks và Stubs nên thường dùng lẫn lộn giữa chúng. Ở chúng có những điểm tương đồng nhưng cũng có sự khác biệt nên sẽ có những trường hợp sử dụng tối ưu riêng. Hôm nay mình sẽ giải thích giúp các bạn hiểu rõ hơn về sự khác biệt giữ chúng.

## Định nghĩa
Trước tiên chúng ta cùng tìm hiểu sơ qua một chút về định nghĩa của Mocks, Stubs và Double trong RSpec:
### Double
```
It’s a dumb object we create that stands-in for an object we need in order to test something.
```
Có thể hiểu đơn giản là nó đại diện cho một Object bất kỳ nào đó mà chúng ta có thể sử dụng trong quá trình test
### Stubs
```
Stubs allow an object to receive messages/methods. Usually they’re Doubles but we can allow ‘real’ objects to receive messages/methods too.
```
Stubs cho phép một Object nhận một hoặc nhiều message/method. Thông thường thì Object ở đây thường là `Double` nhưng nó cũng có thể là một object "thực sự".
### Mocks
```
Objects with expectations. Key word being expect.
```
Mocks thể hiện những mong muốn dành cho một Object với keyword `expect`.

## Sự khác biệt giữa Mocks và Stubs
Ok, bây giờ chúng ta cùng đi tìm hiểu sự khác biệt giữa Mocks và Stubs.
### Stubs
```
allow(some_object).to receive(some_method).and_return(some_value)
```
### Mocks
```
expect(some_object).to receive(some_method).and_return(some_value)
```
Dựa vào method `allow` và `expect` của Stubs và Mocks ta cũng có thể hình dung được phần nào bản chất của chúng. Mocks thể hiện những sự mong đợi khi gọi đến một method nào đó, nó có thể là kết quả trả về, là đối số truyền vào method đó hay là số lần gọi đến method đó. Trong khi đó Stubs chỉ như là định nghĩa/cho phép một object gọi đến một method và trả về một kết quả nào đó.

Chúng ta cùng đi vào một ví dụ để hiểu rõ hơn về chúng:

```
class DataProcessor
  Error = Class.new(StandardError)

  def process(data, validator)
    raise Error unless validator.valid?(data)

    # simple logic to show the idea
    "#{data} processed"
  end
end
```
Cùng xem chúng ta có gì ở đoạn code trên. Chúng ta có class `DataProcessor` với method `process` với hai đối số là `data` và `validator`. Nếu `validator.valid?(data)` trả về true thì sẽ thêm chuỗi string "processed" vào cuối dãy `data`.

Bây giờ để viết Unit Test cho method `process` trên chúng ta cần kiểm tra hai trường hợp:
* `validator.valid?(data)` trả về true
* `validator.valid?(data)` trả về false

Thông thường để cover được hai trường hợp trên chúng ta sẽ tạo giá trị của `data` và `validator` hai lần để  `validator.valid?(data)` trả về hai giá trị true và false. Nhưng khi sử dụng Stubs chúng ta không cần quan tâm đến việc tạo data.

Trước tiên hãy tạo một file spec cho class `DataProcessor`:
```
require 'spec_helper'

describe DataProcessor do
  let(:processor) { described_class.new }    
end
```
Tiếp theo thêm vào một case đơn giản:
```
require 'spec_helper'

describe DataProcessor do
  let(:processor) { described_class.new }

  it 'adds processed to valid data' do
    expect(processor.process('foo', validator)).to eq('foo processed')
  end
end
```
Tiếp theo tạo thêm một Double để đại điện cho object validator:
```
validator = double(:validator)
```
Ở đây chúng ta thấy công việc trở nên đơn giản hơn rất nhiều. Thay vì phải tạo ra một mới object `validator` để sử dụng thì chúng ta chỉ cần tạo ra một Double để đại diện cho validator. Trong một số trường hợp khi việc tạo mới một object có thể vô cùng khó khăn hoặc thậm chí bạn không biết làm sao để tạo mới một object mong muốn, khi đó bạn sẽ thấy được lợi thế của Double.

Bây giờ chính là lúc chúng ta sử dụng đến Stubs, chúng ta sẽ `allow` validator `receive` method `valid?` và trả về giá trị mà chúng ta mong muốn.
```
allow(validator).to receive(:valid?).and_return(true)
```
Có một cách khác để định nghĩa Stubs, thay vì phải định nghĩa một Double sau đó đến Stub thì chúng ta có thể gộp vào thành một:
```
validator = double(:validator, valid?: true)
```
Nhưng với cá nhân mình thì mình quen với cách ở trên hơn mặc dù nó hơi dài dòng :grin:

Bây giờ đoạn code của chúng ta sẽ như sau:
```
require 'spec_helper'

describe DataProcessor do
  let(:processor) { described_class.new }

  it 'adds processed to valid data' do
    validator = double(:validator, valid?: true)
    expect(processor.process('foo', validator)).to eq('foo processed')
  end
end
```
Ok, bây giờ cùng thêm trường hợp `validator.valid?(data)` trả về false:
```
require 'spec_helper'

describe DataProcessor do
  let(:processor) { described_class.new }

  context 'with valid data' do
    it 'adds processed to data' do
      validator = double(:validator, valid?: true)
      expect(processor.process('foo', validator)).to eq('foo processed')
    end
  end

  context 'with invalid data' do
    it 'raises Error' do
      validator = double(:validator, valid?: false)
      expect { processor.process('foo', validator) }.to raise_error(DataProcessor::Error)
    end
  end
end
```

Để chắc chắn rằng `validator` có gọi đến method `valid?` với argument là `data` chúng ta sẽ thêm một case sử dụng Mocks để kiểm tra:
```
it 'calls validator.valid?' do
    validator = double(:validator)

    expect(validator).to receive(:valid?).with('foo').and_return(true)
    processor.process('foo', validator)
  end
```
Trong case trên chúng ta định nghĩa một Double `validator` và `expect` nó gọi đến method `valid?` với argument là "foo" và trả về `true`. Đó chính là điểm khác biệt chính nhất giữa Mocks và Stubs. Đối với Stubs thì chúng ta "cho phép" một object "nhận" một method và trả về kết quả, trong khi đối với Mocks thì chúng ta "mong muốn" object "nhận" một method. Do đó đối với Stubs thì nó sẽ không kiểm tra số lần object gọi đến method đó, còn đối với Mocks thì nó sẽ kiểm tra số lần object gọi đến method và trả về `error` nếu nó không gọi đến method đó lần nào(nếu không chỉ định thì số lần mong muốn mặc định nó sẽ là 1).

Ví dụ khi chúng ta bỏ đi dòng:
```
raise Error unless validator.valid?(data)
```
khi đó case số 3 sẽ báo lỗi:
```
(Double :validator).valid?("foo")
expected: 1 time with arguments: ("foo")
received: 0 times
```

Như mình đã đề cập, Stub và Mocks không chỉ hoạt động với Double mà còn có thể sử dụng một object thực sự
```
class DataProcessor
  Error = Class.new(StandardError)

  def process(data)
    raise Error unless Validator.new.valid?(data)

    "#{data} processed"
  end
end

class Validator
  def valid?(data)
    true
  end
end
```
Như ví dụ trên, bây giờ method `process` chỉ nhận vào một đối số là `data` và chúng ta sử dụng class `Validator` để check `valid?`. Việc viết RSpec cũng tương tự như trên nhưng thay vì phải tạo một Double của `validator` thì chúng ta có thể `allow` và `expect` trực tiếp một instance của `Validator`.

RSpec cung cấp hai methods:
* `allow_any_instance_of`
* `expect_any_instance_of`
chúng ta có thể sử dụng hai methods trên để Mocks và Stub bất kỳ instance nào của một class:
```
require 'spec_helper'

describe DataProcessor do
  let(:processor) { described_class.new }

  context 'with valid data' do
    it 'adds processed to data' do
      # it works because true is default value for Validator
      expect(processor.process('foo')).to eq('foo processed')
    end
  end

  context 'with invalid data' do
    it 'raises Error' do
      allow_any_instance_of(Validator).to receive(:valid?).and_return(false)
      expect { processor.process('foo') }.to raise_error(DataProcessor::Error)
    end
  end

  it 'calls validator.valid?' do
    expect_any_instance_of(Validator).to receive(:valid?).with('foo').and_return(true)
    processor.process('foo')
  end
end
```

Bên cạnh đó RSpec cũng hỗ trợ rất nhiều method hữu ích khác, bạn có thể tìm hiểu thêm ở [RSpec Mocks](https://github.com/rspec/rspec-mocks)

Hy vọng bài viết của mình đã giúp bạn hiểu được sự khác biệt giữa Mocks và Stub

## Tài liệu tham khảo
http://rubyblog.pro/2017/10/rspec-difference-between-mocks-and-stubs