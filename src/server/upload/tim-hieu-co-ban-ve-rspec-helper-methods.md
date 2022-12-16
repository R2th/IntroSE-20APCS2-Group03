# Helper methods
Trong khi sử dụng RSPEC, chắc hẳn các bạn sử dụng rất nhiều **let** và **let!**. Nhiều khi bạn sử dụng let hoặc let! rspec đều chạy đúng, có khi lại phải dùng let! mới được mà khi thì nên dùng let để tốt hơn cho hiệu suất.

Bạn đã hiểu rõ về let và let! chưa? Nếu câu trả lời là chưa thì đây là một tài liệu tham khảo cho bạn, còn ngược lại hãy để lại quan điểm của bạn về let và let! nhé. <3

## let và let! là cái chi chi
Sử dụng [let](https://github.com/rspec/rspec-core/blob/fe3084758857f0714f05ada44a18f1dfe9bf7a7e/features/helper_methods/let.feature) để định nghĩa một memoized helper method (giá trị của method được ghi nhớ). Giá trị trả về của memoized helper method sẽ được cached lại giữa những lần sử dụng nó trong cùng một example nhưng điều này không khả dụng giữa các example khác nhau.

**Chú ý**: let là lazy-evaluated có nghĩa là nó sẽ không được đánh giá cho đến khi method nó định nghĩa được gọi lần đầu tiên. 

Bởi mặc định, let là threadsafe (luồng an toàn), nhưng bạn có thể thiết lập điều này thông qua config.threadsafe, điều này sẽ giúp hiệu suất của let nhanh hơn một chút. 

let! giống với let ngoại trừ việc block của let! sẽ được thực thi trong một before hook ẩn. Điều đó đồng nghĩa với việc let! sẽ được thực thi trước mỗi example trong một group example khai báo nó.

### Sự khác nhau giữa let và biến instance
Có 2 cách tiếp cập như sau: để định nghĩa ra một biến để sử dụng
Với let:

```
require 'rspec'

RSpec.describe User do
  let(:user) { User.new }

  it 'does not have an id when first instantiated' do
    expect(user.id).to be nil
  end
end
```


Với before và instance variable:
```
require 'rspec'

RSpec.describe User do
  before { @user = User.new }

  it 'does not have an id when first instantiated' do
    expect(@user.id).to be nil
  end
end
```

**Điểm khác biệt:**
Với instance variable trong before hook có thể bị mất từ một file này tới file khác. Với instance variable có thể nil nên dẫn đến nhiều lỗi tiềm ẩn.

### Chứng minh let tạo ra một method
Đoạn code dưới đây tạo ra một method **my_name** và giá trị trả về của nó được cached.

```
require 'rspec'

describe 'my_name' do
  let(:my_name) do
    puts 'thinking about what my name is...'
    'Jason Swett'
  end

  it 'returns my name' do
    puts my_name() //Cách gọi một method :))
  end
end
```

Kết quả:

```
$ rspec my_name_spec.rb
thinking about what my name is...
Jason Swett
.

Finished in 0.00193 seconds (files took 0.08757 seconds to load)
1 example, 0 failures
```

### Giá trị trả về của method được tạo bằng let sẽ được cached
Đoạn code dưới đây gọi 2 lần method **my_name** nhưng chỉ in ra *“thinking about what my name is…”* một lần và kết quả trả về của **my_name** được in 2 lần. Tại sao?

```
require 'rspec'

describe 'my_name' do
  let(:my_name) do
    puts 'thinking about what my name is...'
    'Jason Swett'
  end

  it 'returns my name' do
    puts my_name
    puts my_name
  end
end
```

Kết quả:
```
$ rspec my_name_spec.rb
thinking about what my name is...
Jason Swett
Jason Swett
.

Finished in 0.002 seconds (files took 0.08838 seconds to load)
1 example, 0 failures
```

Đoạn code sau đây cho ta thấy method my_name được thực thi 1 lần và giá trị trả về của method đó sẽ được cached. Cho dù chúng ta gọi method my_name n lần thì kết quả cũng sẽ được lấy từ lần đầu tiên chứ không thực hiện n lần method my_name. 

### let là lazy evaluation và let! thì không
**let**
Khi nào method do **let** định nghĩa được gọi thì nó mới thực thi.
Code chứng minh:

```
require 'rspec'

describe 'let' do
  let(:message) do
    puts 'let block is running'
    'VALUE'
  end

  it 'does stuff' do
    puts 'start of example'
    puts message
    puts 'end of example'
  end
end
```

Kết quả:

```
$ rspec let_example_spec.rb
start of example
let block is running
VALUE
end of example
.

Finished in 0.00233 seconds (files took 0.09836 seconds to load)
1 example, 0 failures
```

Từ kết quả in ra dễ dàng thấy rằng đến dòng code *puts message* thì *message* mới được thực hiện.

**let!** 
Đúng theo định nghĩa, let! giống với let ngoại trừ việc block của let! sẽ được thực thi trong một before hook ẩn. Điều đó đồng nghĩa với việc let! sẽ được thực thi trước mỗi example trong một group example khai báo nó.

Code chứng minh:
```
require 'rspec'

describe 'let!' do
  let!(:message) do
    puts 'let! block is running'
    'VALUE'
  end

  it 'does stuff' do
    puts 'start of example'
    puts message
    puts 'end of example'
  end
end
```

Kết quả:
```
$ rspec let_example_spec.rb 
let! block is running
start of example
VALUE
end of example
.

Finished in 0.00224 seconds (files took 0.09131 seconds to load)
1 example, 0 failures
```

**Nhận xét:**
Kết quả của đoạn code cho thấy *“let! block is running”* được in ra đầu tiên đồng nghĩa let! được thực thi trước mỗi example trong example group khai báo nó.

Vì let! được chạy trước mỗi example nên bạn cần chú ý đến vị trí khai báo let! để tránh việc nó chạy trước những example không cần thiết. Trong những file rspec siêu bự thì nó sẽ gây ra hiệu suất rất tồi đó. 

Theo quan điểm cá nhân thì khi các bạn nên dùng let! để tạo ra một method có xử lý tạo mới một record. Vì khi đó chúng ta có thể biết rõ ràng và chắc chắn record đó được tạo ra trước khi sử dụng record đó trong example nào đó. 

# Kết luận
Qua bài viết muốn làm rõ khái niệm và cách let và let! hoạt động, cũng như những sự khác biệt giữa chúng. Để chúng ta có thể viết Rspec không chỉ cho nó chạy đúng mà còn có hiệu suất cao nhất. 

Bài viết tham khảo: 
1. https://www.codewithjason.com/difference-let-let-instance-variables-rspec/
2. https://relishapp.com/rspec/rspec-core/v/3-10/docs/helper-methods/let-and-let