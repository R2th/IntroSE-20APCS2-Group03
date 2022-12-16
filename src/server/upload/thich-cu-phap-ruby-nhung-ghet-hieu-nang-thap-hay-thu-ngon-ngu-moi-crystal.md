# Mở bài
Ngôn ngữ Ruby có cú pháp rất ngắn gọn, dễ đọc, dễ viết. Nó là ngôn ngữ thông dịch, kiểu động và hướng đến tính tiện lợi cho lập trình viên lên hàng đầu. Nhưng những điều này phải đánh đổi bằng một phần hiệu năng của ngôn ngữ. Nếu so với các ngôn ngữ bạn bè cùng trang lứa, Ruby không hề là một ngôn ngữ có điểm mạnh về hiệu năng. Nó vẫn "đủ nhanh" nếu dùng cho phát triển Web backend, nơi cần tốc độ phát triển sớm nhất có thể và hiệu năng ngôn ngữ không phải là yếu tố quan trọng hàng đầu.

Nhưng... Hãy thử tưởng tượng bạn muốn xây dựng một dự án Game rất "khủng" bằng Ruby. Việc sử dụng một ngôn ngữ không tận dụng hiệu quả không gian bộ nhớ và lãng phí nhiều chu kỳ CPU chắc chắn sẽ làm game của bạn render được ít đa giác hơn và cho số FPS thấp hơn rất đáng kể. 

Vậy liệu có ngôn ngữ nào vượt trội về hiệu năng trong khi vẫn giữ được cú pháp quen thuộc như khi bạn dùng Ruby hay không? Câu trả lời rất có thể là [Crystal](https://crystal-lang.org/).

# Giới thiệu Crystal
![Crystal](https://i.imgur.com/gqjN5MY.png)
Nói ngắn gọn nhất, Crystal là ngôn ngữ biên dịch, kiểu tĩnh, hướng đến hiệu năng trong khi vẫn giữ cú pháp thật quen thuộc với Ruby. Dưới đây, mình xin chia sẻ một vài đặc trưng cơ bản nhất của Crystal.

## Cú pháp
Cú pháp của Crystal gần như y hệt Ruby. Tuy nhiên Crystal không hướng đến tương thích ngược với Ruby:

```crystal
# A very basic HTTP server
require "http/server"

server = HTTP::Server.new do |context|
  context.response.content_type = "text/plain"
  context.response.print "Hello world, got #{context.request.path}!"
end

puts "Listening on http://127.0.0.1:8080"
server.listen(8080)
```

## Kiểu dữ liệu
Nếu kiểu dữ liệu đã hiển nhiên thì bộ biên dịch của Crystal có thể tự suy ra kiểu dữ liệu từ đoạn code trong quá trình biên dịch. Nhờ vậy, trong đa số trường hợp, bạn có thể bỏ qua chỉ rõ kiểu dữ liệu và thoải mái viết code như mọi khi bạn viết bằng Ruby/Python.

```crystal
def shout(x)
  # Notice that both Int32 and String respond_to `to_s`
  x.to_s.upcase
end

foo = ENV["FOO"]? || 10

typeof(foo) # => (Int32 | String)
typeof(shout(foo)) # => String
```

## Chạy đồng thời nhiều tác vụ
Crystal hỗ trợ chạy đồng thời nhiều tác vụ (concurrency) với Fiber. Khái niệm Fiber của Crystal rất giống với Goroutine trong Golang. Mỗi Fiber là một dạng green thread, khá giống với OS thread nhưng rất nhỏ nhẹ. Điều này giúp bạn có thể tạo ra một lượng khủng Fiber (vài triệu cái chẳng hạn) mà không tốn mấy bộ nhớ. Mọi Fiber đều chạy trên cùng một OS thread, như vậy chúng không chạy song song cùng thời điểm (parallelism). Các Fiber có thể giao tiếp với nhau theo bằng cơ chế channel (khác với sử dụng vùng bộ nhớ chung như OS thread).

Fiber không bao giờ bị dừng thực thi giữa chừng như OS thread (pre-emptive). Chỉ khi nào một Fiber đang chạy bị block ở một tác vụ nào đó hoặc bản thân Fiber đang chạy cho phép, hệ thống lên lịch mới chuyển sang chạy Fiber khác. VÍ dụ một vài trường hợp bị Fiber được chuyển là:

- Đợi một tác vụ I/O nào đó hoàn thành
- Đợi client nhận dữ liệu
- Sử dụng phương thức `sleep`
- Hoặc nếu bản thân Fiber cho phép với class method `Fiber.yield`

Ở đây, mình tạo 2 fiber và sử dụng `sleep` để sau mỗi lần in ra màn hình, Fiber sẽ ngủ một thời gian ngẫu nhiên.

```crystal
channel = Channel(Nil).new

spawn do
  (0..10).each do |n|
    puts "Tam: #{n}"
    sleep Random.rand(3000).milliseconds
  end
  channel.send(nil)
end

spawn do
  (0..10).each do |n|
    puts "Cam: #{n}"
    sleep Random.rand(3000).milliseconds
  end
  channel.send(nil)
end

channel.receive
channel.receive
```

Dưới đây là kết quả của đoạn code trên:

```
$ crystal run app.cr
Tam: 0
Cam: 0
Cam: 1
Tam: 1
Cam: 2
Tam: 2
Cam: 3
Tam: 3
Cam: 4
Cam: 5
Tam: 4
Cam: 6
Cam: 7
Cam: 8
Tam: 5
Cam: 9
Tam: 6
Tam: 7
Cam: 10
Tam: 8
Tam: 9
Tam: 10
```

Có thể dễ thấy rằng 2 fiber mình tạo ra đang được thực thi cùng lúc (concurrency). Khi thực thi 2 fiber này, mỗi khi một fiber bị chặn thực thi bởi hàm `block`, hệ thống đặt lịch sẽ chuyển sang thực thi fiber kia. Như vậy, mặc dù chúng được thực thi đồng thời (concurrency) nhưng không phải là song song (parallel). Mình cũng dùng thêm channel để giúp fiber chính chờ cho đến khi nào 2 fiber con của mình đã chạy xong. Nếu không sử dụng channel, chương trình trên của mình sẽ bị đóng lại ngay lập tức.

Bản mới nhất của Crystal (0.31.0) mới được ra mắt khoảng 1 tuần trước (tính ở thời điểm publish bài) đã hỗ trợ multi threading thử nghiệm. Điều này tức là những fiber có thể được phân bổ qua nhiều OS thread khác nhau và đạt được parallel thực thụ 😍 Nhưng cũng có nghĩa là bạn sẽ phải tuân thủ sử dụng channel để giao tiếp với các Fiber, nhằm tránh bị condition race.

Hiểu thêm về Fiber và concurrency tại https://crystal-lang.org/reference/guides/concurrency.html

## Macros
Một trong những điểm mạnh nhất của Ruby so với mọi ngôn ngữ khác là meta-programming, thứ giúp những framework với cú pháp ngắn gọn như Rails trở thành hiện thực. Câu trả lời của Crystal cho điều này là tính năng macro.

```crystal
macro define_method(name, content)
  def {{name}}
    {{content}}
  end
end

# This generates:
#
#     def foo
#       1
#     end
define_method foo, 1

foo #=> 1
```

## Ruby có gems, Crystal có shards 👍
Các package của Crystal được gọi là shard.

Để sử dụng một shard nào đó trong project, ví dụ như shard `kemal` chẳng hạn, thì ở thư mục gốc của project, bạn chỉ cần tạo thêm file `shard.yml` như thế này:

```yml
dependencies:
  kemal:
    github: kemalcr/kemal
```

Sau đó bạn chỉ cần chạy lệnh `shard install` là xong. Lệnh `shard` cũng được đi kèm luôn với gói phân phối của Crystal.

# Crystal rất có tiềm năng
Từ trước đến giờ, bạn thường phải chọn giữa việc:

- Viết nhanh một chương trình chỉ với vài dòng mã đơn giản với cú pháp dễ chịu bằng Ruby/Python nhưng phải chịu đánh đổi hiệu năng; hoặc
- Sử dụng ngôn ngữ cho hiệu suất cao như C, C++ hay Java, tuy nhiên phải viết bằng cú pháp dài dòng, phức tạp, khó debug.

Crystal đã giúp xóa mờ ranh giới này, đây là điểm mà ít ngôn ngữ nào mới ra mắt gần đây làm được. Những người lập trình đã biết sẵn Ruby có thể nhanh chóng bắt đầu làm việc với Crystal (gần như) ngay lập tức. Những ai chưa biết Ruby từ trước cũng sẽ dễ dàng làm quen với cú pháp đơn giản của Crystal trong thời gian ngắn.

Tuy nhiên, ở thời điểm hiện tại, Crystal vẫn chưa được khuyến khích dùng trong production vì nhiều lý do:

- Crystal chưa trưởng thành và vẫn còn nhiều thay đổi lớn sắp tới
- Crystal hỗ trợ đa nền tảng, tuy nhiên hiện vẫn chưa có hỗ trợ cho Windows. Nhưng theo nhà phát triển thì Crystal sẽ sớm có mặt trên WIndows.
- Hiện tại Fiber của Crystal đã hỗ trợ parallelism (làm việc ở nhiều core của CPU) nhưng mới chỉ ở mức thử nghiệm.
- Lượng package (shard) chưa có nhiều. Nhưng với cú pháp thân thuộc với Ruby, điều này có lẽ không hề là vấn đề lớn.
# Tham khảo thêm
- [Trang chủ crystal-lang.org](https://crystal-lang.org/)
- [Why Crystal is the most promising programming language of 2018](https://medium.com/@DuroSoft/why-crystal-is-the-most-promising-programming-language-of-2018-aad669d8344f)
- [The Highs & Lows of Crystal - an Introduction to Crystal Lang](https://auth0.com/blog/an-introduction-to-crystal-lang/)
- [The Crystal Language](http://www.oequacki.com/programming/2018/03/05/crystal.html)