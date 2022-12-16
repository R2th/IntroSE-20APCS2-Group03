### phương thức không có đối số
Một phương thức có thể được định nghĩa và được gọi không có đối số như sau:
```
def method_without_arg()
  "without arg"
end
def method_without_arg_and_parentheses
  "without arg & parentheses"
end
irb> method_without_arg
 => "without arg"
irb> method_without_arg()
 => "without arg"
irb> method_without_arg_and_parentheses
 => "without arg & parentheses"
irb> method_without_arg_and_parentheses()
 => "without arg & parentheses"
 ```
 
Chúng ta có thể gọi phương thức `method_without_arg` và `method_without_arg_and_parentheses` có và không có dấu ngoặc đơn đều được kết quả như nhau.

Theo quy ước,hãy gọi phương thức mà không có dấu ngoặc đơn. Trong thực tế, cú pháp này "phù hợp" với cơ chế xử lý message(message handling) được thực hiện bởi Ruby (xem thêm [tại đây](https://medium.com/@farsi_mehdi/private-protected-a-matter-of-message-1a88b10acbf2)).

### Phương thức với đối số
Mặt khác, một phương thức cũng có thể được định nghĩa và được gọi với các đối số
```
def method_with_args arg1
  "with args: #{arg1}"
end
def method_with_args_and_parentheses(arg1)
  "with args & parentheses: #{arg1}"
end
irb> method_with_args 'an argument'
 => "with args: an argument"
irb> method_with_args('an argument')
 => "with args: an argument"
irb> method_with_args_and_parentheses 'an argument'
 => "with args & parentheses: an argument"
irb> method_with_args_and_parentheses('an argument')
 => "with args & parentheses: an argument"
 ```
 
Chúng ta có thể gọi phương thức `method_with_args` và `method_with_args_and_parentheses` có và không có dấu ngoặc đơn.
Một khoảng trống giữa tên phương thức và đối số đầu tiên là bắt buộc khi đối số thứ nhất không được bao quanh bởi dấu ngoặc đơn.

### Giá trị mặc định của đối số
Bạn có thể cung cấp một giá trị mặc định cho một đối số. Trong trường hợp này, nếu giá trị cho đối số không được cung cấp, thì giá trị mặc định sẽ được sử dụng thay thế
```
def method_with_default_value(newsletter = 'ruby.devscoop.fr')
  "The Ruby newsletter is #{newsletter}"
end
irb> method_with_default_value 'awesome'
 => "The Ruby newsletter is awesome"
irb> method_with_default_value
 => "The Ruby newsletter is ruby.devscoop.fr"
 ```
 
Nếu đối số `newsletter` không được cung cấp khi gọi phương thức thì giá trị mặc định `ruby.devscoop.fr` được sử dụng làm giá trị của đối số `newsletter`.

Nếu không, giá trị được cung cấp khi gọi phương thức được sử dụng.

### Đối số variadic(danh sách đối số với độ dài không cố định)
Phương thức Ruby có thể hỗ trợ một danh sách đối số có độ dài thay đổi
```
def method_with_varargs *names
  puts names.class, "\n"
  names.each {|name| puts name}
end
irb> method_with_varargs 'Mehdi', 'John', 'Sam'
Array
Mehdi
John
Sam
```

Trong ví dụ trên, chúng ta có thể thấy rằng bằng cách thêm một tên đối số với một toán tử * (toán tử splat), phương thức được định nghĩa có thể chấp nhận một số đối số variadic.

Tất cả các đối số được truyền khi gọi phương thức sẽ được lưu trữ trong một mảng chứa trong biến đối số - biến `names` trong ví dụ trên.

### đối số keyword (đối số với từ khóa)

Đối số keyword là một thay thế đối với vị trí của các đối số. Chúng khá giống với việc truyền hash vào phương thức, nhưng có nhiều lỗi rõ ràng hơn.

Đây là một ví dụ về cách triển khai và sử dụng đối số keyword:
```
def method_with_keyword_arguments(foo: 'bar')
  "foo is #{foo}"
end
irb> method_with_keyword_arguments foo: 'naughty'
 => "foo is naughty"
irb> method_with_keyword_arguments
 => "foo is bar"
 ```
 
 Ở đây, phương thức mong muốn từ khóa `foo`. Nếu không, nó sẽ sử dụng giá trị mặc định `bar`. Ở đây, từ khóa `foo` là tùy chọn.
Vậy, hãy làm cho nó bị bắt buộc:
```
def method_with_required_ka(foo:)
  "foo is #{foo}"
end
irb> method_with_required_ka foo: 'naughty'
 => "foo is naughty"
irb> method_with_required_ka
ArgumentError (missing keyword: foo)
```
Đối số keyword bắt đầu trở thành bắt buộc khi nó được khai báo mà không có giá trị mặc định.
Trong trường hợp này, nếu đối số không được truyền vào khi gọi phương thức thì `ArgumentError` sẽ được raise lên với tên của keyword bị thiếu.

### block làm đối số
Tham số ampersand & (dấu &) cho phép bạn tự động lưu trữ nội dung của một block trong một instance của Proc được gán cho tham số ampersand(dấu &)
```
def method_with_block &blk
  p blk.class
  blk.call
end
irb> method_with_block { puts 'a block' }
Proc
a block
 => nil
 ```
 Ở đây chúng ta có thể thấy rằng `blk` là một instance của Proc và khi gọi `blk.call` nó sẽ hoạt động giống như gọi `yield` nhưng với các đặc tính của đối tượng Proc.
 
 ### tham khảo
 https://medium.com/@farsi_mehdi/method-arguments-in-ruby-part-i-e033fd6bfd93
 https://medium.com/@farsi_mehdi/method-arguments-in-ruby-part-ii-60b9e406830d