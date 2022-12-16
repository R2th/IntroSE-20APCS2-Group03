Sử dụng RSpec có thể hiệu quả và thú vị hơn rất nhiều nếu bạn biết rõ bạn có bao nhiêu option theo ý mình. Thông thường, bạn chạy test bằng lệnh sau:
```ruby
rspec spec/your_class_spec.rb
```

xen kẽ với option chạy nhiều tệp cùng một lúc:
```ruby
rspec spec/your_class_spec.rb spec/directory/ spec/another_class_spec.rb
```
Các lệnh trên là tiêu chuẩn, nhưng trong nhiều trường hợp, điều này là đủ. Nhưng trong Ruby, quá nhiều sự tuyệt vời là không đủ. Bài viết này sẽ đề cập đến cách sử dụng nâng cao hơn của lệnh rspec và các option ít được biết đến nhưng vẫn hữu ích.

Nếu bạn chưa làm quen với RSpec, hãy chắc chắn rằng bạn đã xem [bài viết giới thiệu](https://longliveruby.com/articles/introduction-to-rspec), đây là phần giới thiệu nhanh về test code Ruby. Trước khi chúng ta bắt đầu khám phá thế giới RSpec, ta sẽ tạo một test đơn giản mà chúng ta sẽ test các tùy chọn dòng lệnh khác nhau. Một ví dụ thực tế như vậy sẽ cho bạn thấy cách bạn có thể trở nên hiệu quả hơn với việc test bằng cách sử dụng option nâng cao hơn.

Chúng ta có class Person sau:
```ruby
class Person
  def initialize(age:)
    @age = age
  end

  def adult?
    @age > 17
  end
end
```
Và ta có file test `person_spec.rb`
```ruby
require 'spec_helper'

RSpec.describe Person do
  describe '#adult?' do
    it 'returns false if the given person is less than 18 years old' do
      person = Person.new(age: 16)

      expect(person.adult?).to eq(false)
    end

    it 'returns true if the given person is more than 17 years old' do
      person = Person.new(age: 19)

      expect(person.adult?).to eq(true)
    end
  end
end
```

Chúng ta có thể chạy nó bằng lệnh rspec chuẩn:
```ruby
rspec spec/person_spec.rb
```
### Custom đầu ra của test
Khi tôi nói hoặc viết về các case test, tôi thường đề cập rằng các case test là một phần của tài liệu code. Chắc chắn, bạn chỉ có thể mở các file test và xem qua chúng, nhưng nhờ option `--format`, bạn có thể chạy test và nhận đầu ra giống như tài liệu.

Theo mặc định, đầu ra của test bao gồm các dấu chấm cho các case test đã chạy pass, bắt đầu cho các case test đang pending và ký tự F cho những case test fail. Bạn có thể thay đổi hành vi này bằng cách chuyển option `--format`:
```ruby
rspec spec/ --format documentation
```

Nhờ lệnh trên thay vì đầu ra mặc định:

```ruby
..
```
Bạn sẽ nhận được định dạng sau:

```ruby
Person
  #adult?
    returns false if the given person is less than 18 years old
    returns true if the given person is more than 17 years old
```
Tiếp theo, tôi sẽ chỉ cho bạn một sự kết hợp thú vị với option này sẽ cho phép bạn hiển thị 'tài liệu' chỉ cho phương pháp đã cho. Và chỉ trong trường hợp bạn cần lưu phần tài liệu này để sử dụng sau - bạn có thể lưu kết quả đầu ra trong file bằng cách sử dụng option `--out`:
```ruby
rspec spec/ --format documentation --out rspec_documentation.txt
```

### Lọc test theo tên example

Option `--example` cho phép bạn chỉ chạy những test khớp với chuỗi đã cho. Đối số được so khớp với mô tả đầy đủ của ví dụ. Mô tả đầy đủ là sự ghép nối các mô tả của nhóm, bao gồm bất kỳ nhóm và ngữ cảnh lồng nhau nào.

Nếu bạn chỉ muốn chạy những case test có test cho method `#adult?` trả về true, bạn có thể làm như sau:

```ruby
rspec --example ‘#adult? returns true`
```
Với sự kết hợp của option `--format`, bạn thậm chí có thể nhận được danh sách các trường hợp khi method trả về true:

```ruby
rspec --example ‘#adult? returns true` --format documentation
```
Trong trường hợp của chúng tôi, đầu ra sẽ như sau:
```
Person
  #adult?
    returns true if the given person is more than 17 years old
```

Bạn thậm chí không cần phải mở code để trả lời câu hỏi; Tuyệt, phải không?

### Lọc test theo tên Tag

Nếu bạn muốn gắn Tag một số ví dụ thuộc về tính năng đã cho, bạn có thể nhanh chóng chạy tất cả chúng cùng một lúc bằng cách sử dụng option `--tag`. Giả sử rằng spec của chúng ta thuộc về tính năng authentication:

```ruby
RSpec.describe Person do
 describe '#adult?', feature: 'authentication' do
   it 'returns false if the given person is less than 18 years old' do
     person = Person.new(age: 16)

     expect(person.adult?).to eq(false)
   end

   it 'returns true if the given person is more than 17 years old' do
     person = Person.new(age: 19)

     expect(person.adult?).to eq(true)
   end
 end
end
```
Khi bạn có nhiều case test và việc thực hiện chúng mất nhiều thời gian, bạn không muốn chọn tất cả các spec liên quan đến tính năng bạn đang làm theo cách thủ công. Để chỉ chạy test liên quan đến authentication, bạn có thể sử dụng lệnh sau:

```ruby
rspec spec/ --tag feature:authentication
```

Nếu có trường hợp một spec thuộc nhiều hơn một tính năng, thì không cần phải lo lắng; mảng đối số cũng được hỗ trợ:
```ruby
require './person'
require 'spec_helper'

RSpec.describe Person do
 describe '#adult?' do
   it 'returns false if the given person is less than 18 years old', feature: ['authentication', 'other'] do
     person = Person.new(age: 16)

     expect(person.adult?).to eq(false)
   end

   it 'returns true if the given person is more than 17 years old', feature: 'authentication' do
     person = Person.new(age: 19)

     expect(person.adult?).to eq(true)
   end
 end
end
```

Bạn vẫn có thể sử dụng option `--tag` như trước đây và kiểm tra bộ lọc:
```ruby
rspec spec/ --tag feature:authentication # will run two tests
rspec spec/ --tag feature:other # will run one test
```

Việc lọc các tag có giá trị boolean cũng có thể thực hiện được và thậm chí còn dễ dàng hơn. Nếu bạn thường đánh dấu slow test như thế này:
```ruby
it 'returns false if the given person is less than 18 years old', slow: true do
 person = Person.new(age: 16)

 expect(person.adult?).to eq(false)
end
```
Bạn chỉ có thể chạy slow test bằng cách sử dụng cú pháp đặc biệt:
```ruby
rspec spec/ --tag @slow
```

Đó là một phím tắt cho `--tag slow: true`.

Bạn đã thấy một vài ví dụ cho phép bạn lọc các test theo tag của chúng, nhưng còn việc loại trừ một số test có tag slow thì sao? Dễ dàng như thêm `~` trước giá trị tag:

```ruby
rspec spec/ --tag ~@slow
```

Câu lệnh trên sẽ chạy tất cả các spec ngoại trừ những spec được đánh dấu là slow. Hãy thoải mái sử dụng các kết hợp khác của `--tag` với ký tự loại trừ.
### Chạy rpsec... mà không cần chạy test

Lúc đầu, nghe có vẻ hơi kỳ lạ, nhưng có, bạn có thể chạy test mà không cần chạy chúng. Nó được gọi là dry run và bạn có thể gặp thuật ngữ này trước đây trong quá trình phát triển phần mềm. Quá trình dry run có nghĩa là bạn chạy quá trình, nhưng nó không ảnh hưởng gì.


Nếu bạn có một codebase lớn và bạn muốn xem có bao nhiêu case test ở đó hoặc bao nhiêu case test đang chờ xử lý, bạn có thể thực hiện một lần dry run sẽ không kích hoạt các case test, nhưng rspec sẽ hoạt động như chúng ta sẽ chạy chúng:
```ruby
rspec spec/ --dry-run
```

Trong codebase lớn, đầu ra có thể như sau:

```ruby
Finished in 0.10594 seconds (files took 20.68 seconds to load)
1429 examples, 0 failures, 5 pending
```
Tuyệt vời, sẽ thật tuyệt nếu thực hiện gần 1,5 nghìn case test trong vòng chưa đầy một giây. Một ví dụ điển hình khác về cách sử dụng --dry-run là trường hợp bạn muốn xem tài liệu cho một phương pháp nhất định nhưng không chạy test:
```ruby
rspec spec/ --format documentation --dry-run --example “#instance_method”
```

### Failing fast
 
Nếu bạn đang fix các lỗi cho các case test, bạn sẽ đánh giá cao option `--fail-fast`. Nếu bạn tìm thấy lỗi đầu tiên và không muốn tiếp tục sau khi nó xuất hiện, hãy sử dụng lệnh sau:
```ruby
rspec spec/ --fail-fast
```

RSpec sẽ không tiếp tục chạy test sau lần thất bại đầu tiên. Nếu bạn muốn dừng lại sau nhiều lần thất bại, bạn có thể chỉ định số lần case test không thành công mà sau đó test sẽ được dừng lại:
```ruby
rspec spec/ --fail-fast=6
```

Theo mặc định, RSpec sẽ không dừng lại ở lỗi đầu tiên và sẽ tiếp tục chạy test cho đến khi tất cả case test được yêu cầu được thực thi.

### Tập trung vào các case failure

Nếu chúng ta đang nói về sự hỗ trợ của RSpec đối với các case test thất bại, thì cần phải đề cập đến option `--only-failures`. Nếu bạn đang cố gắng fix lỗi, bạn có thể lưu lỗi vào một file và sau đó, với option `--next-fail`, hãy chuyển đến ví dụ lỗi tiếp theo sau khi bạn fix lỗi hiện tại.

Để sử dụng option `--only-failures`, bạn phải thay đổi config của RSpec và chỉ định file nơi thư viện sẽ lưu trữ các lỗi gần đây:
```ruby
RSpec.configure do |c|
  c.example_status_persistence_file_path = "failures.txt"
end
```
Bây giờ, khi bạn thực hiện test của mình, RSpec sẽ lưu các case test không thành công trong file failures.txt:
```ruby
example_id                   | status | run_time        |
---------------------------- | ------ | --------------- |
./spec/person_spec.rb[1:1:1] | failed | 0.01228 seconds |
./spec/person_spec.rb[1:1:2] | failed | 0.00015 seconds |
```
Bây giờ bạn có thể chạy first failing test:

```ruby
rspec spec/ --next-failure
```

Hoặc chạy tất cả các case test fail:
```ruby
rspec spec/ --only-failures
```

### Đối với những cách đối phó với các case test thất bại ngẫu nhiên
Một điều nữa liên quan đến những failures. Đôi khi bạn chạy toàn bộ test, một case test không thành công, nhưng khi bạn chỉ chạy case test này, nó sẽ chạy pass - điều này có thể gây nhầm lẫn, nhưng đó không phải là điều mà những người tạo RSpec không biết.

Với option `--bisect`, RSpec sẽ chạy test của bạn để tìm số lượng ví dụ tối thiểu cần thiết để tái tạo lỗi. Với thông tin như vậy, sẽ dễ dàng tìm thấy vị trí dữ liệu bị ghi đè trong case test và kết quả của case test khác với kết quả nhận được khi một case test được thực hiện.

### Kết luận
Như ta đã tìm hiểu được thêm các câu lệnh liên quan đến Rspec, hy vọng nó có thể giúp bạn viết test tốt hơn :v.

Link tham khảo: https://longliveruby.com/articles/rspec-command-line