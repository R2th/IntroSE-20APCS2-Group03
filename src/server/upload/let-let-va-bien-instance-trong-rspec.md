Một câu hỏi thường gặp khi sử dụng Rspec là có nên sử dụng `let`, `let!` hay là một biến instance để lưu trạng thái. Trong bài viết này mình sẽ cố gắng giải thích sự khác biệt giữa các biến `let`, `let!` và biến instance để bạn biết nên chọn cái nào.
![](https://images.viblo.asia/6e762e77-85e9-4715-bb48-9d02dc98089d.png)

### Khi nào sử dụng `let`

Dưới đây mình xin trích dẫn lại định nghĩa của `let` như sau:

> Use `let` to define a memoized h### Khi nào sử dụng `let`
elper method. The value will be cached across multiple calls in the same example but not across examples. Note that `let` is lazy-evaluated: it is not evaluated until the first time the method it defines is invoked.

Có nghĩa là khai báo `let` chỉ có giá trị trong từng `example` (trong Rspec thì được đóng gói trong khối `it`) và nếu như bạn gọi đến một biến `let` nhiều lần trong cùng một `example` thì nó sẽ chỉ khai báo khối `let` một lần duy nhất thôi (ở lần gọi đầu tiên). Đây là khái niệm `lazy evaluation` được nhắc đến trong định nghĩa. Bạn hãy xem thêm ví dụ bên dưới để hiểu rõ hơn:

```ruby
describe GetTime do
  let(:current_time) { Time.now }

  it "gets the same time over and over again" do
    puts current_time # => 2018-07-19 09:35:29 +0300
    sleep(3)
    puts current_time # => 2018-07-19 09:35:29 +0300
  end

  it "gets the time again" do
    puts current_time # => 2018-07-19 09:35:32 +0300
  end
end
```

Như bạn có thể thấy ở ví dụ trên, mặc dù đã bị delay 3s bằng `sleep(3)`, nhưng `current_time` vẫn như trước. Điều này là vì `current_time` đã được gọi ra từ trước, và giá trị được gọi ra ở đây là giá trị đã được cache lại. Và ở những lần gọi sau đó trong cùng khối `it` thì `current_time` vẫn như ban đầu. Có nghĩa là `Time.now` chỉ được gọi đến một lần duy nhất.

Khi được gọi đến trong khối `it` thứ 2, thì `Time.now` sẽ được thực hiện lại. Và tương tự ở trên, giá trị này sẽ được sử dụng cho các lần gọi sau trong cùng khối `it` này.

Tóm lại `lazy evaluation` có nghĩa là `let` chỉ chạy khi và chỉ khi nào được gọi đến. Mặc dù `let` là để định nghĩa một biến, tuy nhiên nó lại gần giống với việc gọi một method hơn.

### Khi nào sử dụng `let!`

Ngó qua định nghĩa về `let!` dưới đây:

> You can use let! to force the method’s invocation before each example.

Nghĩa là `let!` được gọi trong một khối `before` ngầm, do đó kết quả đã được tính toán và cache lại trước khi khổi `it` được thực thi.

```ruby
describe "GetTime" do
  let!(:current_time) { Time.now }

  before(:each) do
    puts Time.now # => 2018-07-19 09:57:52 +0300
  end

  it "gets the time" do
    sleep(3)
    puts current_time # => 2018-07-19 09:57:52 +0300
  end
end
```

Bạn có thể thấy ở đây đã có khoảng thời gian delay 3s trước khi gọi `current_time` nhưng điều đó không còn quan trọng, bởi vì giá trị của `current_time` thực tế đã được tính toán và lưu lại trước đó rồi.

`let!` hữu ích khi bạn cần định nghĩa những trạng thái trước khi khối `it` được thực thi.

### Biến instance
Được khai báo trong khối `before`.

Vấn đề với biến instance là nó được tạo tự động khi được tham chiếu. Vì vậy, nếu bạn gõ sai tên biến, bạn sẽ `không` nhận được lỗi. Thay vào đó, một biến instance mới sẽ được tạo ra với giá trị khởi tạo là `nil`.

Điều này vô tình gây ra những lỗi mà rất khó để theo dõi.

Lưu ý là bạn hoàn toàn có thể bật cảnh báo để bạn được thông báo khi có một lỗi đánh máy trong tên biến của bạn.

Ngược lại, nếu dùng `let`, ta sẽ nhận được lỗi `NameError` khi gọi sai tên.

Một lưu ý khác là nếu bạn khởi tạo một biến instance trong khối `before` nào đó, thì việc khởi tạo đó sẽ  diễn ra cho mọi khối `it`, cho dù bạn không sử dụng biến kia trong khối `it` này.

Do đó, nếu khởi tạo biến instance kia tốn nhiều thời gian, nó sẽ làm cho việc test của bạn bị chậm lại.

### Kết

Chốt lại, bạn nên chọn `let` khi bạn muốn khai báo biến kiểu `lazy evaluation`, không thì bạn nên dùng `let!`. Và theo mình là không nên sử dụng biến `instance` khi viết test Rspec.

Hi vọng bài viết này sẽ có ích với bạn.

***

### Tham khảo
- https://mixandgo.com/learn/let-vs-instance-variables-in-rspec