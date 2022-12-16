Một trong những tính năng độc đáo và thường bị hiểu lầm nhất của Ruby là các khối. Các khối là phiên bản đóng của Ruby và có thể được sử dụng để làm cho mã có thể tái sử dụng nhiều hơn và ít dài dòng hơn. Nhưng các từ khóa như ban đầu `yield` có thể khó hiểu và làm cho chức năng này hơi đáng sợ trong công việc. Bài viết này nhằm mục đích đi qua các yếu tố cần thiết và xây dựng kiến thức của bạn theo từng phần nhỏ.

## Block - Khối là gì?

Các khối là các hàm ẩn danh có giá trị trả về sẽ được áp dụng cho phương thức gọi nó. Đó là một câu có vẻ hơi khó hiểu vì vậy hãy làm việc nhiều hơn để hiểu.

Các khối bao gồm mã giữa một tập hợp các dấu `{}` hoặc một cặp `do/end` . Cái trước là định nghĩa một dòng và cái sau là định nghĩa đa dòng.

```
method { |i| ... }
method do |i|
  ...
end
```

Định nghĩa một dòng chủ yếu được sử dụng cho một lớp. Để thống nhất, tôi đã sử dụng cú pháp `do / end` trong tất cả các ví dụ.

Nếu bạn đã từng làm việc với Ruby trước đây, tôi gần như đảm bảo rằng bạn đã từng thấy một khối. Các phương thức `each` và `map` là hai trong số các trình vòng lặp được sử dụng phổ biến nhất cho việc sử dụng khối.

```
["⭐️", "🌟"].each do |star|
  puts star
end
# Output
⭐️
🌟
```

## Làm thế nào để bạn tạo ra một khối?

Nếu chúng ta muốn tạo một chức năng đơn giản in ra các đầu vào được bọc bởi ⭐️, chúng ta có thể viết một đoạn code đơn giản giống như dưới đây:

```
def star_wrap(el)
  puts "⭐️" + el + "⭐️"
end
star_wrap("💙")
# Output
⭐️💙⭐
```

Nếu chúng ta muốn viết lại chức năng này bằng cách sử dụng ký hiệu khối , chúng ta có thể làm như sau:

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

Như được hiển thị ở trên, giá trị trả về của nội dung khối là những gì được truyền cho `yield` từ khóa trong hàm.


Chúng ta cũng có thể làm cho khối có thể tùy chỉnh nhiều hơn bằng cách chuyển một tham số cho hàm chúng ta đã tạo.


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


Nếu chúng ta muốn tham chiếu các giá trị từ hàm của chúng ta trong khối đính kèm, thì chúng ta có thể truyền đối số `yield` và tham chiếu nó trong các tham số khối ...

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


## Nhưng tại sao sử dụng các blocks trên một chức năng thông thường?

Cho đến nay, có vẻ như chúng ta không làm bất cứ điều gì mà một phương pháp điển hình không thể làm được. Các khối có ích khi chúng ta muốn áp dụng logic tái sử dụng cho các bối cảnh khác nhau theo cách được gói gọn.

Ví dụ: giả sử chúng tôi biết rằng chúng tôi luôn muốn in đầu ra của một loạt các lệnh giữa một tập hợp “⭐️⭐️⭐️". Chúng ta có thể sử dụng các khối để áp dụng logic gói cho các bối cảnh khác nhau mà không phải thực hiện các chức năng phụ trợ.

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

Như được hiển thị ở trên, các ngôi sao luôn được in trước và sau khi mã được thực thi trong một khối. Mặc dù  🧡 được tìm  khá khác so với 💜, ️ `star_wrap` phương pháp này cho phép chúng ta áp dụng logic gói sao cho cả hai bối cảnh theo cách thức một cách kín đáo.

## Xử lý lỗi khối


Bất kỳ phương thức nào cũng có thể chấp nhận một khối, ngay cả khi nó không được tham chiếu trong hàm. Các nội dung khối sẽ không làm gì cả.

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


Chúng ta có thể gọi tất cả các khối trong các ví dụ ở trên vì chúng ta đã sử dụng từ khóa `yield`. Vậy, điều gì sẽ xảy ra nếu chúng ta gọi `yield` và không cung cấp một khối? Một lỗi sẽ được nêu ra.

```
def star_wrap
 puts "⭐️" + yield + "⭐️"
end
star_wrap
# Output
LocalJumpError: no block given (yield)
```


Chúng ta có thể sửa đổi vấn đề này bằng cách sử dụng `block_given?` biểu thức để kiểm tra việc sử dụng khối.

```
def star_wrap
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

## Truyền một khối làm tham số


Nếu chúng ta muốn rõ ràng hơn trong việc gọi một khối và có một tham chiếu đến nó, chúng ta có thể chuyển nó vào một phương thức như một tham số.

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

Trong trường hợp này, khối được biến thành một đối tượng Proc mà chúng ta có thể gọi với `.call`. Sử dụng các khối theo cách này có ích khi bạn muốn truyền các khối qua các chức năng. Chúng tôi chỉ định tham số khối bằng cách chuyển nó làm đối số cuối cùng và thêm vào đó `&`.

Dưới đây, các phương pháp `star_wrap_a` và `star_wrap_b` làm điều tương tự chính xác ...

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

## Khối trong thực tế


Trong ứng dụng Rails mặc định, `application.html.erb` được tải cho mọi trang có trình điều khiển kế thừa từ đó `ApplicationController`. Nếu một bộ điều khiển con của ` ApplicationController` hiện một khung nhìn, nội dung của nó được mang lại `application.html.erb`. Với chức năng này, HTML soạn sẵn phải được áp dụng cho tất cả các trang của ứng dụng có thể được thực hiện dễ dàng.

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

## Và đó là những điều cần thiết!


Các khối không phải chứa logic phức tạp để chúng ta sử dụng chúng. Chúng thường được sử dụng để trừu tượng hóa logic được chia sẻ có thể được áp dụng cho vô số bối cảnh. Nếu được viết cẩn thận, mã có thể được tạo ra gọn gàng hơn và dễ đọc hơn thông qua việc khai thác chức năng của chúng. Để củng cố bất kỳ khái niệm nào được đề cập ở trên, tôi khuyên bạn nên thử các mẫu mã trong bảng điều khiển tương tác hoặc bằng cách viết các ví dụ của riêng bạn. Good luck!

**Tài liệu tham khảo**

https://medium.com/gusto-engineering/ruby-blocks-simplified-397e56d63259