> Bài viết gốc [String Concatenation & Interpolation in Ruby](https://www.rubyguides.com/2019/07/ruby-string-concatenation/)

Kết hợp các chuỗi với nhau là thứ hay làm trong Ruby. Việc này thực hiện bằng cách nào?

### Hai phương pháp để để kết hợp chuỗi:
1. Ruby chuỗi kết hợp
2. Ruby chuỗi nội suy 

### Kết hợp chuỗi sẽ thực hiện như sau:
```ruby
a = "Rất vui được gặp bạn
b = ","
c = "bạn có thích ăn chuối không?"
```

Chúng ta có thể dùng toán tư `+` để nối thêm một chuỗi với chuỗi khác.

Trong trường hợp này `a + b + c` tạo ra một chuỗi mới, thế nhưng chúng ta không cần dùng các biến để làm việc này.
Ví dụ:

```ruby
puts "Tôi thích ăn" + " " + "chuối"
# Tôi thích ăn chuối
```

Một lựa chọn khác là sử dụng toán tư `+=`

Ví dụ:

```ruby
a = ""
a += "chuối"
a += "chuối"
a += "chuối"
a
# "chuốichuốichuối"
```

Chúng ta bắt đầu với chuỗi rỗng và chúng ta nối tất cả với nhau. Nhưng chúng ta gặp một vấn đề đó là `Tốc độ xử lý rất chậm`. Giải pháp sẽ đưa ở dưới này.

### Phương thức Concat Ruby 
Chúng ta có thể dùng phương thức `concat` của Ruby để nối chuối một cách hiệu quả như sau:

```ruby
str= ""

str.concat "x"
str.concat "y"

str
# "xy"
```

Nó nhanh hơn vì nó sẽ thay đổi chuối `str` thay vì tạo mới. Thế nhưng nó cũng không tốt giống như `+=`. Vậy có cách nào không vậy?

Tất nhiên có! chúng ta có thể dùng phương thức `<<` là một bí danh của `concat`.

> Chú ý: Bắt đầu từ Ruby 2.4 có sự khác biệt với `concat` đó là chúng ta có thể truyền nhiều đối số, với `<<` chúng ta chỉ có thể truyền một đối số tại một thời điểm.

Ví dụ:
```ruby
str = ""
str << "x"
str << "y"
```

Chúng ta cũng có thể làm như sau:

```ruby
str = ""
str << "x" << "y"
```

Vẫn còn một vấn đề nữa, nếu chúng ta muốn kết hợp một chuỗi với các biến nhưng một trong số các biến đó không phải là `chuỗi` chúng ta sẽ nhận kết quả không mong muốn.

Hãy xem xét:

```ruby
"" + 1
# TypeError: no implicit conversion of Fixnum into String

"" << 1
# "\x01"
```

Do vậy giải pháp là gì?
-> Sử dụng phương thức `to_s` để biến đổi tất cả đối tượng thành các chuỗi.
```ruby
"" + 1.to_s
```

Rõ ràng nhìn cách việt này là không tốt cho nên chúng ta có công cụ khác để dùng.

### Cách sử dụng chuỗi nội suy Ruby
Nội suy hay hợp nhất các biến thành chuỗi là một kỹ thuật mạnh mẽ. Nó cho phép dựng mẫu chuỗi.

Ví dụ:
```ruby
age = 30
name = "Anh"

"Xin chào, tên tôi là #{name}, năm nay tôi #{age} tuổi."
```

Chúng ta có đưa vào bất kỳ `name` và `age` bằng đặt chúng là biến trước chuỗi.

#### Đặc điểm
Ruby sẽ xử lý cho việc biến đổi các gía trị đó thành chuỗi. Do vậy chúng ta không cần gọi `to_s` nữa. :v 

### Thêm tiên tố chuỗi
Còn có một cách nữa để kết hợp chuỗi với nhau. Thay vì kiết hợp các biến và đoạn chuỗi nhỏ thành một thứ mới với "Nội suy chuỗi" hoặc chèn vào đằng sau với `<<` và `concat` chúng ta có thể sử dụng `prepend`.

Ví dụ:
```ruby
str  = ""
str.prepend "1"
str.prepend "2"
str.prepend "3"

# "321"
```

Bạn sẽ nghĩ rằng có phương thức `append`, nhưng thực tế không có đâu ạ. :D chỉ có thể áp dụng với mảng thôi.

### Kết luận
Chúng ta đã đi qua các ví dụ kết nối chuỗi, chèn sau, chèn trước và nội suy trong Ruby cho phép kết hợp các chuỗi với nhau.

Cảm ơn bạn đã đọc :)