## Ruby Câu Lệnh Case
Syntax
```
case expression
[when expression [, expression ...] [then]
   code ]...
[else
   code ]
end
```

So sánh biểu thức được chỉ định theo câu lệnh case, sử dụng toán tử **===** để so sánh, và thực khi **code** khi so sánh khớp với nhau.

Ví dụ:
```
age =  5
case age
when 0 .. 2
   puts "baby"
when 3 .. 12
   puts "little child"
when 13 .. 18
   puts "youth"
else
   puts "adult"
end
```

**outputs: little child** <br>

Có thể thấy việc sử dụng câu lệnh **case** trông rất đơn giản, bạn có thể thay thế nó cho câu lệnh điều kiện **if** để code của bạn trông gọn hơn:
```
if (a%3 == 0) then puts "%3"
elsif (a%4 == 0) then puts "%4"
elsif (a%7 == 0 && a%13 == 0) then puts "%%"

// case statement
case
  when (a % 3).zero? then puts "%3"
  when (a % 4).zero? then puts "%4"
  when (a % 7).zero? && (a % 13).zero? then puts "%%"
end
```

#### Nhưng Trên thực tế các case statement trong Ruby rất phong phú và phức tạp hơn bạn tưởng. 
Ví dụ: 
```
case "Hi there"
when String
  puts "case statements match class"
end
```

**outputs: "case statements match class"** <br>

Ví dụ trên cho thấy câu lệnh case ở trên không chỉ khớp với giá trị mà còn khớp với Class của nó. Điều này là có thể vì Ruby sử dụng toán tử "===" để so sánh. <br>
Khi bạn viết **x === y** bằng Ruby thì tương tự như  bạn hỏi "**y có thuộc nhóm đại diện của x không?**". Điều này cho ra kết quả chung chung, ở đây ví dụ khi so sánh: **Class === item** nó sẽ trả về **true** nếu item là một thể hiện của **Class** này.
```
String === "hello"  # true
String === 1        #false
Integer === 1       #true
```

### Khớp trong phạm vi
Bạn có thể sử dụng phạm vi: `range === n chỉ trả về giá trị true, false của range.includes?(n)` [xem thêm](https://ruby-doc.org/core-2.2.0/Range.html#method-i-3D-3D-3D)
```
case 5
when (1..10)
  puts "case statements match inclusion in a range"
end
```
**outputs "case statements match inclusion in a range"** <br>

### Khớp với  regular expression
Có thể sử dụng regexes trong câu lệnh case vì `/regexp/ === "string"` trả về true nếu chuỗi này khớp với regular expression. [xem thêm](https://ruby-doc.org/core-2.2.0/Regexp.html#method-i-3D-3D-3D)
```
case "FOOBAR"
when /BAR$/
  puts "they can match regular expressions!"
end
```
**outputs "they can match regular expressions!"**
### Khớp với procs và lambdas
Ví dụ này hơi đặc biệt, khi bạn sử dụng Proc#===(item) giống như làm Proc#call(item). Điều này có nghĩa là bạn có thể sử dụng lambda và procs trong câu lệnh case này.
```
case 40
when -> (n) { n.to_s == "40" }
  puts "lambdas!"
end
```
**outputs "lambdas"**
### Thử viết lớp để so sánh trong câu lệnh case
Như ban đầu đã nói câu lệnh case so sánh sử dụng toán tử "===" nên có thể dùng nó so sánh khớp với Class.  Cho nên ta có thể tạo câu lệnh case xác định cho riêng mình.
```
class Success
  def self.===(item)
    item.status >= 200 && item.status < 300
  end
end

class Empty
  def self.===(item)
    item.response_size == 0
  end
end

case http_response
when Empty
  puts "response was empty"
when Success
  puts "response was a success"
end
```

### Nguồn
https://www.tutorialspoint.com/ruby/ruby_if_else.htm<br>
https://www.honeybadger.io/blog/rubys-case-statement-advanced-techniques/<br>