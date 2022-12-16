# Mở Đầu: 
Bạn là người mới bước vào nghề lập trình, hay bạn là một deverloper web muốn học thêm về ruby hay chỉ đơn giản và muốn học một ngôn ngữ mới để thử thách bản thân mình.
Mình cũng là người mới bắt đầu học ruby và bản thân mình cũng đã học về một số ngôn ngữ lập trình khác như c/c++, php... Và hôm nay mình sẽ chia sẽ cho các bạn một số vấn đề và tính năng quan trọng của ngôn ngữ ruby. Điều này sẽ giúp bạn phần nào hình dung được sự tương đồng và khác nhau giữa Ruby và các ngôn ngữ khác.
Dưới đây là một số ghi chú và gợi ý về tính năng của Ruby mà bạn sẽ thấy khi học Ruby.

# Trong ruby tất cả mọi thứ đều là đối tượng
Trong ruby  không có sự khác nhau giữa biểu thức và mệnh đề.
Tất cả đều có giá trị thậm chỉ cả nil. Ở trong NilClass nil được trả về giá trị true
```RUBY
irb
>> x = nil
>> x.nil?
x # => true
```
# Trong ruby các symbol không phải là một string
Các symbol không phải là string.
Symbol có thể được mô tả như là một định danh.
Symbol giống với String ở chỗ là đều có một số phương thức như: length, upcase, downcase...
Sau đây là một số điểm khác nhau cơ bản giữa symbol và string:
    1. string có thể thay đổi được còn symbol thì không
    2. hiệu suất xử lý của symbol nhanh hơn
   Sau đây là cách để khai báo một string trong rails:
```RUBY
symbol = :hello
```
# Các biến hằng số (Constant)
Các hằng số không thực sự cố định. Nếu bạn chỉnh sửa một hằng số đã được khởi tạo, nó sẽ kích hoạt cảnh báo, nhưng không ngăn chương trình thực thi. Nó sẽ không báo rằng bạn cần định nghĩa lại hằng số.
Trong ruby hằng số có thể thay đổi được . nhưng khi thay đổi bạn vẫn sẽ nhận được một thông báo 
```RUBY
irb
>> x= 1
>> x= 2
>> 2: warning: already initialized constant x
```

# Những quy tắc chung
Trong ruby có các loại biến sau:

  1. Biến cục bộ 
    
      ```RUBY
           x = 5
      ```
  2. Biến toàn cục 
    
      ```RUBY
        $x = 5
     ```
    
  3. Biến đối tượng
    
       ```RUBY
       @x = 5
   
        
  4. Biến lớp 
     ```RUBY
     @@x = 5
   
    
# Các biến có đối số
Trong ruby có thể khai báo biến có đối số, không đối số hoặc để một giá trị mặt đinh
Ví dụ sau sẽ làm rõ:

```RUBY
a = 2
def classA
    a
end

def classB a
    a
end

def classC a=10
    a
end

```

# Phạm vi truy cập của các biến trong ruby
public, protected và private đề cập đến khả năng truy cập của các phương thức.
Mặc định, tất cả phương thức đều ở trạng thái public. Nếu không chỉ định khả năng truy cập của phương thức, nó sẽ là public.
Phương thức protected và private không thể truy cập một cách tự do, và do đó khi có một thể hiện của đối tượng, bạn sẽ không thể gọi được các phương thức đó.
Phương thức protected và private cũng có sự khác biết xung quanh cách bạn có thể sử dụng chúng trong ngữ cảnh của đối tượng.

# Trong ruby các lớp đều mở
Các lớp trong Ruby đều mở. 
Chúng ta có thể thay đổi trong các class . Thậm chí các lớp lõi, như Fixnum hoặc thậm chí là Object, lớp chính của mọi đối tượng.
 Ruby on Rails định nghĩa một loạt các phương thức để xử lý thời gian trên Fixnum. Xem bên dưới:
```RUBY
class Fixnum
  def hours
    self * 3600
  end
  alias hour hours
end
Time.mktime(2006, 01, 01) + 14.hours # => Sun Jan 01 14:00:00
```

# Các phương thức đơn
Các phương thức đơn là các phương thức cho từng đối tượng mà chúng ta khai báo và nó chỉ thuộc phạm vị sử dụng trong class đó 
ví dụ:
```RUBY

class Car
  def color
    "green"
  end
end

porsche = Car.new
porsche.color 
>> green

```


# Toán tử 
Một số toán tử thường hay sử dụng trong ruby
Thao tác mảng	[ ] [ ]=
Lấy lũy thừa	**
Toán tử phủ định, đảo bit, tăng, giảm	! ~ + -
Toán tử nhân, chia, chia lấy phần dư	* / %
Toán tử cộng, trừ	+ -
Toán tử dịch bit	<< >>
Toán tử thao tác bit AND	&
Toán tử thao tác bit OR	^ |
Toán tử so sánh hơn kém	> >= < <=
Toán tử so sánh bằng	<=> == === != =~ !~
Toán tử logic AND	&&
Toán tử logic OR	||
Toán tử tạo phạm vi	.. ...
Toán tử điều kiện	?:
Toán tử gán	= += -= *= **= /= %= &= |= ^= <<= >>= ||= &&=


### Kết luận : 
Đó là những thứ mình đã học được trong quá trình làm quen và học với ruby . Mình hy vọng qua bài viết này sẽ giúp ích cho các bạn <3 
Bài viết được tổng hợp được từ những thứ mình học và được dịch ra từ https://www.ruby-lang.org/en/documentation/ruby-from-other-languages/ các bạn có thể kham khảo thêm.