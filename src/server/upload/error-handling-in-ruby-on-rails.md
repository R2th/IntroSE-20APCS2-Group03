Trong quá trình viết ruby on rails, ắt hẵn chúng ta bắt gặp vô số các thông báo lỗi, thứ mà mặc định hệ thống sẽ "bắt" và "thông báo" cho chúng ta. Vậy chúng ta sẽ phải làm gì khi muốn làm việc với các "lỗi" đấy. Bài viết sau đây sẽ cho các bạn nắm sơ qua:

1.what’s an error in Ruby ?

2.How to throw & catch an error ?

3.errors & magic variables

4.the retry keywork

5.custom erros
Bắt đầu thôi :-?
# 1. What’s an error in Ruby ?
Ruby là một ngôn ngữ lập trình hướng đối tượng, chính vì vậy các "error" trong Ruby cũng là 1 thể hiện của 1 Class mang tên Exeption. Nó cũng nằm trong chuỗi Class có cha, con, và ông nội...
```
irb> RuntimeError.ancestors.include? Exception
 => true
irb> NoMethodError.ancestors.include? Exception
 => true
```
Đó chính là lý do vì sao các "error" hay được gọi với cái tên gần gũi và dễ biết hơn là các exception.
Do các errors này là thể hiện của lớp Exception nên Ruby cung cấp cho chúng ta nhiều các method để kiểm soát chúng. Các phương thức này được định nghĩa toàn bộ trong Class Exception, và được sử dụng ở tất cả các thể hiện và lớp con của nó.

Ví dụ, phương thức Exception#messagetrả về một thông báo liên quan đến lỗi trong khi phương thức Exception#backtrace trả về error backtrace.

# 2. How to throw & catch an error ?
Phương thức Kernel#raise phụ trách việc đưa ra lỗi trong ruby
```
irb> raise 'an error occurred'
RuntimeError: an error occurred
irb> raise NoMethodError, 'an error occurred'
NoMethodError: an error occurre
```
Trong lần đầu tiên gọi đến Kernel#raise, chúng ta thấy được phương thức raise đưa ra 1 RuntimeError, vì không có lớp lỗi nào được chỉ định rõ ràng như 1 đối số của nó. Ngược lại trong lần gọi thứ 2, chúng ta truyền vào cho nó một đối số NoMethodError và dĩ nhiên, kết quả trả về là một thông báo từ NoMethodError.
Các exceptions này có thể được bắt bởi mệnh đề begin .. end và keyword rescue
```
begin
  raise NoMethodError, 'an error occurred'
rescue NoMethodError => e
  puts "#{e.class}: #{e.message}"
end
```
Kết quả trả về
```
NoMethodError: an error occurred
```
Ở đây, mệnh đề resue bắt ngoại lệ NoMethodError và được phát ra bởi phương thức Kernel#raise trong block begin .. end

Khối Begin .. end này sử dụng để ngăn chặn và cách ly các đoạn mã có thể xãy ra lỗi, ngăn chặn việc phát sinh lỗi tự nhiên do Ruby bắt hộ.
```

begin
  3 / 0
rescue ZeroDivisionError => e
  puts "#{e.class}: #{e.message}"
end

begin
  "my string".odd?
rescue NoMethodError => e
  puts "#{e.class}: #{e.message}"
end
```

Kết quả
```
ZeroDivisionError: divided by 0
NoMethodError: undefined method `odd?' for "my string":String
```

Trong lần gọi phép tính 3/0 , đoạn mã đã dừng lại và raise ra exception ZeroDivisionError thông qua phương thức Integer#/. Tìm hiểu thêm về Numbers and Class Hierarchy của Ruby để hiểu hơn vì sao gây ra lỗi.
Điều này cũng xãy ra tương tự trong lần gọi thứ 2 ở đoạn mã nằm giữa Begin .. end. "my string".odd?, một lỗi NoMethodError được trả ra khi có một cú pháp dạng Object#method_missing ( tìm hiểu thêm về metaprogramming: Ruby Hook method)

# 3. Errors & magic variables
Ruby cung cấp cho chúng ta 2 biến "thần thánh" khi có một ngoại lệ được phát sinh
* The `$!` variable that contains the raised exception
* The `$@` variable that contains the exception backtrace
```
begin
  "my string".odd?
rescue NoMethodError => e
  puts "#{$!.class}: #{$!.message}"
  $@.each { |loc| puts loc }
  
  # SAME AS
  # puts "#{e.class}: #{e.message}"
  # e.backtrace.each { |loc| puts loc }
end
```
kết quả 
```
NoMethodError: undefined method `odd?' for "my string":String
/workspace.rb:87:in `eval'
/workspace.rb:87:in `evaluate'
...
/bin/irb:11:in `<main>'
```

2 biến này chỉ tồn tại trong Begin .. end và được xóa hoặc set về nil khi ra khỏi block này.

# 4. The retry keywork
Như ở trên, khi chúng ta bắt lỗi cho một đoạn mã, chúng ta đã phải đưa nó vào 1 block đặt giữa Begin .. end. Từ khóa rescue bắt lỗi sinh ra, và tiếp theo chúng ta có 1 từ khóa mới nữa là retry. Vậy nó làm gì? Retry được đặt ở giữa rescue .. end. Nó giúp chúng ta chạy lại đoạn code được đặt giữa Begin .. rescue nếu đoạn mã này có phát sinh exceptions.
```
i = 0

begin
  i += 1
  puts "retry ##{i}"

  raise RuntimeError
rescue RuntimeError => e
  retry if i < 3
end
```
kết quả 
```
retry #1
retry #2
retry #3
```
Chúng ta cùng theo dõi luồng đi của đoạn mã phía trên cho đến khi kết thúc :
* Biến i nhận giá trị = 1 khi bước vào begin
* retry #1 được in ra sau đó
* một lỗi RuntimeError được raise lên
* rescue bắt lỗi RuntimeError lại
* retry keyword được gọi lại vì i(1) < 3
Đoạn mã này sẽ chạy cho đến khi i = 3 và ra khỏi vòng Begin .. resuce .. end
begin .. rescue .. end có thể gọi được các biến trong phạm vi block
Từ khóa retry chỉ được sử dụng nếu có rescue, nếu không thì :
```
irb> retry
SyntaxError: Invalid retry
```
Dính SyntaxError.
# 5. Custom errors
Như từ đầu, chúng ta biết error cũng chỉ là một thể hiện của Class Exception, vì thế chúng ta có thể tạo mới các loại error và định nghĩa chúng từ các lớp thừa kế của Exception Class
```
class PolicyError < Exception
end

class UserPolicyError < PolicyError
end

begin
  raise PolicyError, 'access not granted'
rescue PolicyError => policy_error
  puts "#{policy_error.class}: #{policy_error.message}"
end

begin
  raise UserPolicyError, 'user unauthorized'
rescue UserPolicyError => user_policy_error
  puts "#{user_policy_error.class}: #{user_policy_error.message}"
end
```

Kết quả
```
PolicyError: access not granted
UserPolicyError: user unauthorized
```

Ở đây, 2 lỗi được raise lên là PolicyError và UserPolicyError, PolicyError được kế thừa trực tiếp từ ExceptionError, còn UserPolicyError được kế thừa từ PolicyError.
Bây giờ chúng ta thử raise ra một lỗi từ lớp không được kế thừa từ Exception xem nhé.
```
class NotAnError
end

raise NotAnError
```
Đương nhiên kết quả sẽ là 
```
TypeError (exception class/object expected)
```
Không hiểu nó là cái gì cả :-?

TypeError được gọi ra nếu phương thức Kernel#raise gọi tới một lớp không phải của Exception

Bài viết trên đây chỉ ra cho chúng ta biết cách bắt lỗi và tự tạo ra các lỗi riêng của mình. Hy vọng có thể giúp đỡ mọi người trong quá trình kiểm soát các thành phần gây lỗi trong mã code. 
Nếu có bất cứ thắc mắc nào, hãy comment bên dưới để chúng ta có thể cùng thảo luận. Chúc mọi người một ngày làm việc hiệu quả.



Link tham khảo : 
*https://medium.com/@farsimehdi/error-handling-in-ruby-part-i-557898185e2f*
*https://medium.com/@farsi_mehdi/error-handling-in-ruby-part-ii-f26c6a575c68*