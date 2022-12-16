## Giới thiệu
Scope là một khái niệm cơ bản và quan trọng trong ngôn ngữ Ruby. Một khi hiểu được scope và những khái niệm xung quanh nó, bạn sẽ hiểu code của mình hơn, biết được tại sao code của mình lại bị lỗi ở đấy và sửa như thế nào. Giúp bạn tiết kiệm thời gian và kĩ năng cũng sẽ lên 1 tầm cao mới. :v 

Ảo tưởng sức mạnh tí thôi. Nào hãy cùng tìm hiểu nhé!

## Local variable trong Ruby
Scope Gates & Flat scope chủ yếu xoay quanh local variable (biến cục bộ). Vì vậy, ta hãy tìm hiểu sơ qua về nó trước đã. 

 Biến cục bộ là biến được liên kết với một phạm vi cụ thể. Chừng nào bạn còn trong phạm vi đó, thì bạn vẫn sẽ có quyền truy cập vào chúng. Khi phạm vi thay đổi, tức là bạn không trong cùng phạm vi khai báo local variable nữa - bạn sẽ không thể truy cập chúng. 
 
 Vậy làm thế nào để biết một phạm vi đã thay đổi? Bạn sẽ có câu trả lời trong phần sau. Đọc tiếp nào ...
 
 ## Scope Gates (dịch tạm là Cổng phạm vi)
 Có một số thứ hay ho xảy ra khi bạn:
 
 * Định nghĩa một Class (**`class PeekABoo`**)
 * Định nghĩa một Method (**`def fight`**)
 * Định nghĩa một Module (**`module SuperCoder`**)

Mỗi lần bạn làm một trong 3 điều trên, bạn đang tạo ra phạm vi mới. Giống như Ruby tạo ra một cánh cổng và ném bạn sang một vùng đất hoàn toàn mới mà ở đó bạn không thể liên lạc hay truy cập vào các biến ở vùng đất cũ nữa. Vì vậy nên chúng ta gọi các định nghĩa **module**, **method**, **class** là những cái cổng phạm vi. 

Xem tiếp ví dụ dưới đây để rõ ràng hơn nào. 

```
v0 = 0
class SomeClass # Cổng phạm vi
  v1 = 1
  p local_variables # In ra tất cả các local variables trong phạm vi 

  def some_method # Cổng phạm vi
    v2 = 2
    p local_variables
  end # kết thúc cổng phạm vi some_method
end # kết thúc cổng phạm vi SomeClass

some_class = SomeClass.new
some_class.some_method
```

Bạn sẽ thấy `[:v1]` và `[:v2]` được in ra trong console. Điều gì đã xảy ra với biến **v1** khi chương trình vào hàm some_method?. **some_method** đã tạo ra cổng phạm vi, và bên trong đó là phạm vi của instance method khác hoàn toàn so với phạm vi của class.  Vì vậy, ở đây ta chỉ có thể thấy và truy cập được biến v2. 

Còn biến v0 thì sao? Nó không xuất hiện ở bất kỳ đâu cả. Chà, khi mà chúng ta định nghĩa class SomeClass thì chúng ta đã tạo ra một phạm vi khác, vậy nên ta sẽ không có quyền truy cập biến v0 nữa. Nếu muốn truy cập biến v0, ta chỉ có thể truy cập nó bên ngoài SomeClass, khi mà phạm vi của SomeClass kết thúc (sau từ khóa end kết thúc class SomeClass).  

## Ý nghĩa của phạm vi

Scopes giúp quy định các phạm vi truy cập của module, class và method. Nếu không có điều này, một method hay class có thể truy cập và thay đổi dữ liệu, trạng thái của hệ thống, điều này làm mất đi tính đóng gói (encapsulation) của OOP. 

Tuy nhiên, trong những dự án lớn và phức tạp, đôi khi chúng ta sẽ cần phá vỡ phạm vi của class, method hoặc module. Chúng ta sẽ đi tìm hiểu cách phá vỡ scope và scope gates. 

## Break scope (hack phạm vi)
Khi nào thì chúng ta cần hack phạm vi?. Đó là khi bạn gặp phải những trường hợp đặc biệt như thế này:

```
conf_file = "myconf.yml"

class DbConnection
  # ...
end
```

`conf_file` được khai báo bên ngoài phạm vi của `class DbConnection`. Hãy giả sử rằng vì một số lý do, chúng ta không thể thay đổi giao diện, cấu trúc của DbConnection. 

Nếu chúng ta không thể tạo một method mới để nhận biến `conf_file`, làm thế nào để có thể truyền nó vào trong class DbConnection?. Tin vui là chúng ta có thể sử dụng blocks, procs hoặc lambdas để làm như vậy.    

Có thể bạn chưa biết, tôi thì cũng mới biết đây thôi. Blocks, procs và lambdas có quyền truy cập vào tất cả các biến trong phạm vi chúng đã được định nghĩa, ví dụ: 

```
x = "test"
3.times { puts x }
# test
# test
# test
```

Biến x có thể truy cập bên trong 1 block, bởi vì block có quyền truy cập đến phạm vi nơi nó được định nghĩa. Procs, lambdas cũng vậy:

```
x = "test"
l = -> { puts x }
l.call # => test
```

Quay trở lại ví dụ trước, làm sao để truyền `conf_file` vào `class DbConnection`. Ý tưởng chính là sử dụng blocks, vì blocks có thể truy cập vào các biến trong phạm vi nó được định nghĩa. 

Vì vậy, nếu chúng ta có thể chuyển định nghĩa class thành block và bỏ đi từ khóa class. Chúng ta sẽ có thể làm điều đó. Ví dụ:  

```
conf_file = "myconf.yml"

DbConnection = Class.new do
  puts conf_file # => myconf.yml
end
```

Thật tuyệt vời, chúng ta không chỉ có thể định nghĩa class thông qua keyword **`class`** mà còn có thể sử dụng `Class.new`. Nếu bạn cần sử dụng kế thừa, chúng ta có thể viết như sau:

```
class Vehicle
end

Car = Class.new Vehicle do
end
```

class Car đã kế thừa từ Vehicle. Bằng cách định nghĩa class với block, chúng ta đã hack phạm vi. Điều này làm phá vỡ tính chất đóng gói (encapsulation) của OOP.  

Nếu bạn muốn truyền biến vào một class đang tồn tại, chúng ta có thể sử dụng `class_eval`:

```
class Connector
end

config = "config.yml"

Connector.class_eval do
  puts config # config.yml
end
```

Chúng ta cũng có thể sử dụng block để định nghĩa các Modules:

```
outer = "test"

MyModule = Module.new do
  puts outer # test
end
```

Cuối cùng, hãy xem cách áp dụng break scope với method như thế nào?  Ví dụ, chúng ta có một biến mà muốn truyền vào method: 

```
class Connector
  config = "config.yml"

  def connect
    # i need a config
  end
end
```

Method `connect` cần truy cập biến `config` nhưng chúng ta không thể sửa cấu trúc method này để chấp nhận `config` như một tham số. Vì điều này sẽ ảnh hưởng đến những đoạn code đang sử dụng method này. 

Hãy thay đổi định nghĩa method connect theo kiểu dùng block để khai báo, chúng ta sẽ có quyền truy cập biến `config` này bên trong method. 

```
class Connector
  config = "config.yml"

  define_method :connect do
    puts config
  end
end

Connector.new.connect # config.yml
```

## Tổng kết

Khi chúng ta sử dụng giải pháp phá vỡ scope, chúng ta đang làm sai đi tính chất đóng gói (encapsulation) của OOP. Nhưng thật tuyệt bởi vì ta có thể làm điều đó khi ta muốn như vậy. 

Thông thường chúng ta muốn mã của mình biết càng ít càng tốt về class và các module khác, đó là cách dùng ta có thể tránh các tác dụng phụ và ít phụ thuộc hơn. 

Phá vỡ scope đôi khi là một lựa chọn tốt, đặc biệt là trên các dự án lớn với các mối quan hệ phức tạp giữa các classes. 

Bây giờ hãy nhớ rằng, các class và method nên biết càng ít càng tốt, nhưng nếu bạn cần phá luật thì bạn vẫn có thể làm. 

## Tài liệu tham khảo

http://rubyblog.pro/2017/02/scope-gates-and-flat-scope-ruby

https://www.sitepoint.com/understanding-scope-in-ruby/

https://gaacode.github.io/blog/2019/ruby-scope-gates-flat-scope/

Bài viết cũng khá dài, cảm ơn bạn đã đọc đến tận đây! Nếu bạn có nhận xét hay câu hỏi gì? Để lại dưới phần comment nhé.

**Write the code as a pleasure ^_^**