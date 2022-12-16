Một trong những tính năng độc đáo nhất và thường bị hiểu lầm của Ruby là các `blocks`. Các `blocks` là [closures](https://viblo.asia/q/javascripts-closures-i-need-your-help-please-J3ZgP4jLlmB#answer-4x5xXNxg5BM) của Ruby và có thể được sử dụng để làm cho mã có thể tái sử dụng nhiều hơn và ít dài dòng hơn. Nhưng những từ khóa như `yield` có thể khó tìm hiểu lúc đầu và làm cho chức năng này hơi đáng sợ khi hoạt động. Bài viết này nhằm mục đích đi qua các yếu tố cơ bản của `blocks` và xây dựng kiến thức của bạn từng phần.

## Blocks là gì?
Các `blocks` là các hàm ẩn danh có giá trị trả về sẽ được áp dụng cho phương thức gọi nó. Điều đó khá thú vị 😳 vì vậy chúng ta hãy cùng tìm hiểu sâu hơn.

Các `blocks` bao gồm mã giữa một tập hợp các dấu ngoặc nhọn hoặc một cặp do / end.

```
method { |i| ... }

method do |i|
  ...
end
```

Nếu bạn đã từng làm việc với Ruby, tôi đảm bảo rằng bạn đã thấy `blocks`. Các phương thức `each` và `map` là hai trong số các trình vòng lặp được sử dụng phổ biến nhất để gọi việc sử dụng `blocks`.

```
["⭐️", "🌟"].each do |star|
  puts star
end

# Output
⭐️
🌟
```

## Tạo 1 block như nào?
Nếu bạn muốn tạo một hàm đơn giản in một đầu vào được bao bọc trong "⭐️", chúng tôi có thể viết một cái gì đó như thế này…

```
def star_wrap(el)
  puts "⭐️" + el + "⭐️"
end

star_wrap("💙")

# Output
⭐️💙⭐
```

Nếu chúng tôi muốn viết lại hàm này bằng cách sử dụng `blocks`, chúng tôi có thể làm như vậy…

```
def star_wrap
  puts "⭐️" + yield + "⭐️"
end

star_wrap do
  "💜"
end

# Output
⭐️💜⭐
```

Như được hiển thị ở trên, giá trị trả về của `blocks` là giá trị được chuyển cho từ khóa `yield` trong hàm.

Chúng ta cũng có thể làm cho `blocks` có thể tùy chỉnh hơn bằng cách chuyển một tham số cho hàm.

```
def wrap_with(el)
  puts el + yield + el
end

wrap_with("⭐️") do
  "💚"
end

# Output
⭐️💚⭐️
```


Nếu chúng ta muốn tham chiếu đến các giá trị từ hàm của chúng ta trong `blocks`, thì chúng ta có thể truyền các đối số vào `yield` và tham chiếu nó trong các tham số `blocks`…

```
def wrap_with(el)
  puts el * 5
  puts yield(el * 2)
  puts el * 5
end

wrap_with("⭐️") do |els|
  els + "🖤" + els
end

# Output
⭐️⭐️⭐️⭐️⭐️
⭐️⭐️🖤⭐️⭐️
⭐️⭐️⭐️⭐️⭐️
```

## NTại sao lại sử dụng các `blocks` thay vì một hàm thông thường?
Cho đến nay, có vẻ như chúng ta không thực sự đang làm bất cứ điều gì mà một hàm thông thường không thể làm được. Các `blocks` rất hữu ích khi chúng ta muốn áp dụng logic được chia sẻ vào các ngữ cảnh khác nhau theo cách đóng gói.

Ví dụ: giả sử chúng ta biết rằng chúng ta luôn muốn in đầu ra của một loạt lệnh giữa một tập hợp các "⭐⭐⭐". Chúng ta có thể sử dụng các `blocks` để áp dụng logic vào các ngữ cảnh khác nhau mà không cần phải thực hiện các hàm phụ trợ.

```
def star_wrap
  puts "⭐⭐⭐"
  puts yield
  puts "⭐⭐⭐"
end

star_wrap do
  server = ServerInstance.new
  data = server.get("orange/heart/endpoint")
  data.to_s
end

star_wrap do
  fetcher = DatabaseFetcher.new
  data = fetcher.load("purple_heart_data")
  data.exists? data : "no heart data"
end

# Output (hypothetical)
⭐⭐⭐
🧡
⭐⭐⭐

⭐⭐⭐
💜
⭐⭐⭐
```

Như hình trên, các dấu sao luôn được in trước và sau khi mã được thực thi trong một khối. Mặc dù "🧡" được tìm nạp khá khác so với "💜" ️, phương thức star_wrap cho phép chúng ta áp dụng logic dấu sao cho cả hai ngữ cảnh.

## Xử lý lỗi
Bất kỳ phương thức nào cũng có thể chấp nhận một `block`, ngay cả khi nó không được tham chiếu trong hàm. Nội dung khối chỉ đơn giản là sẽ không làm gì cả.
```
def stars
 puts "⭐⭐⭐"
end

stars do
  puts "💙"
end

# Output
⭐⭐⭐
```

Chúng ta có thể gọi tất cả các `blocks` trong các ví dụ ở trên bởi vì chúng tôi đã sử dụng `yield`. Vì vậy, điều gì sẽ xảy ra nếu chúng ta gọi là `yield` và không cung cấp một `block`? Một lỗi sẽ được raise.

```
def star_wrap
 puts "⭐️" + yield + "⭐️"
end

star_wrap

# Output
LocalJumpError: no block given (yield)
```

Chúng tôi có thể sửa vấn đề này bằng cách sử dụng `block_given?` để kiểm tra việc sử dụng `block`.

```
ef star_wrap
  if block_given?
    puts "⭐️" + yield + "⭐️"
  else
    puts "⭐️⭐️⭐️"
  end
end

star_wrap

# Output
⭐️⭐️⭐️
```

## Truyền `block` làm tham số
Nếu chúng ta muốn rõ ràng hơn trong việc gọi một `block` và có tham chiếu đến `block` đó, chúng ta có thể chuyển nó vào một phương thức dưới dạng tham số.
```
def star_wrap(&block)
  puts "⭐️" + block.call + "⭐️"
end

star_wrap do
  puts "💛"
end

# Output
⭐💛⭐
```

Trong trường hợp này, `block` được trở thành một đối tượng Proc mà chúng ta có thể gọi bằng `call`. Sử dụng các `block` theo cách này rất hữu ích khi bạn muốn chuyển các `block` qua các hàm. Chúng ta chỉ định tham số khối bằng cách chuyển nó làm đối số cuối cùng và thêm `&`.

Bên dưới, các phương thức `star_wrap_a` và `star_wrap_b` thực hiện điều tương tự…
```
def star_wrap_a(&block)
 puts "⭐" + block.call("✨") + "⭐"
end

def star_wrap_b
 puts "⭐" + yield("✨") + "⭐"
end

star_wrap_a do |el|
 el + "💙" + el
end

star_wrap_b do |el|
 el + "💚" + el
end

# Output
⭐✨💙✨⭐
⭐✨💚✨⭐
```

## Blocks in the real world
Trong một ứng dụng Rails mặc định,  `application.html.erb` được load cho mọi trang có `controller` kế thừa từ `ApplicationController`. Nếu một `controller` con của `ApplicationController` render ra view, nội dung của nó sẽ được chuyển đến `application.html.erb`. Với chức năng này, HTML soạn sẵn phải được áp dụng cho tất cả các trang của ứng dụng có thể được thực hiện một cách dễ dàng.

```
<!DOCTYPE html>
<html>
  <head>
    <title>Block Investigation</title>
  </head>
  <body>
    <%= yield %>
  </body>
</html>
```

## And those are the essentials!
Các `block` không cần phải chứa logic phức tạp để sử dụng chúng. Chúng thường được sử dụng để trừu tượng hóa logic được chia sẻ có thể được áp dụng cho vô số ngữ cảnh. Nếu được viết cẩn thận, mã có thể được làm `DRY` hơn và dễ đọc hơn thông qua việc khai thác chức năng của chúng. Để củng cố bất kỳ khái niệm nào được đề cập ở trên, tôi khuyên bạn nên thử các code mẫu trong `interactive console`hoặc bằng cách viết các ví dụ của riêng bạn. Chúc bạn vui vẻ.

REF: https://engineering.gusto.com/ruby-blocks-simplified/#:~:text=One%20of%20the%20most%20unique,bit%20intimidating%20to%20work%20with.