> Bài viết gốc [Source](https://www.rubyguides.com/2018/10/grep-method-with-examples/)

Trong bài viết này sẽ tìm hiểu về phương thức `grep` của ruby.

### Phương thức `grep` có thể giúp làm gì?
Chúng ta có thể dùng `grep` để lọc các đối tượng có thể đếm được như mảng(Arrays) và các dãy(Ranges)
> Nhưng `select` đã làm việc đó!

Thật đó! nhưng grep hoạt động một cách khác và dó cho kết quả khác.

Hãy xem các ví dụ sau.

### Các ví dụ sử dụng phương thức Grep của Ruby

Chúng ta có mảng:
```
objects = ["a", "b", "c", 1, 2, 3, nil]
```

Chúng ta có thể dùng grep để lấy các string.
```
objects.grep(String)
=> ["a", "b", "c"]
```
hoặc tất cả mà không phải nil:
```
objects.grep_v(NilClass)
=> ["a",  "b", "c", 1, 2, 3]
```

Nếu chúng ta có một mảng các từ
```
fruit = ["apple", "orange", "banana"]
```

Chúng ta có thể tìm tất cả các từ bắt đầu bằng "a":
```
fruit.grep(/^a/)
=> ["apple"]
```
hoặc kết thúc với "e"
```
fruit.grep(/e$/)
=> ["apple", "orange"]
```

Nếu chúng ta có một danh sách các số:
```
numbers = [9, 10, 11, 20]
```

Chúng ta có thể lấy một dánh sách của các số nằm trong một khoảng:

```
numbers.grep(5..10)
=> [9, 10]
```
Chúng ta có thể kết hợp phương thức `map` và `select` khi dùng một block
```
numbers.grep(5..10) { |n| n * 2 }
=> [18, 20]
```
Gọn hơn có thể viết
```
times_two = ->(x) { x * 2 }
numbers.grep(5..10, &times_two)
=> [18, 20]
```

### Tìm hiểu sự khác biệt của Grep và Select
- Grep hoạt động thế nào?
Mẹo là phương thức `===` trong Ruby.([tham khảo thêm](https://viblo.asia/p/triple-equals-in-ruby-QpmleL2nZrd))
Grep gọi phương thức trên với bất kỳ đối số mà cho vào nó.
Hóa ra tất cả các class, biểu thức chính quy(Regex) và dãy thực thi `===`.
Nó thực thi phương thức này theo cách có nghĩ với class.

Ví dụ:
- Các class( như `Integer` hoặc `Array`) so sánh với class của object cho trước.
- Các dãy(Ranges) kiểm tra xem nếu số nằm trong khoảng.
- Biểu thức chính quy kiểm tra xem nếu có khợp.

Khi chúng ta dùng 
```
objects.grep(Integer)
```
nó thật sự thực thi
```
objects.select { |obj| Integer === obj }
```

Phương thức `select` lọc một danh sách dựa trên kết quả của [block](https://www.rubyguides.com/2016/02/ruby-procs-and-lambdas/).
Nếu block được định giá là true thì phân tử đó được chọn.
Nhưng với `grep` chỉ dùng `===` để so sánh.
Tóm lại, grep là một phiên bản đặc biệt của select.

Ruby grep mindmap

![](https://images.viblo.asia/4fc8d9d9-6323-4fc0-9882-a3f8cf1ab2d5.png)

### Kết luận
Qua bài viết này đã cho biết thêm về phương thức `grep` của Ruby, nó rất hữu ích khi chúng ta hiểu về cách hoạt động của nó.
Cảm ơn các bạn đã đọc!

#### Tài liệu tham khảo
- [How to Use the Ruby Grep Method (With Examples)](https://www.rubyguides.com/2018/10/grep-method-with-examples/)
- [Ruby Doc Enumberable: select, grep, grep_v](https://ruby-doc.org/core-2.5.1/Enumerable.html)