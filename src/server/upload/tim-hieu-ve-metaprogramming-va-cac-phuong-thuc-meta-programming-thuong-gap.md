Mình vừa ôn lại một vài khái niệm chuyên sâu trong ruby sau một thời gian không đụng tới, hôm nay mình xin viết một bài về metaprogramming
# Khái niệm Metaprogramming:
Theo Wikipedia: 
> Metaprogramming is the writing of computer programs that write or manipulate other programs (or themselves) as their data, or that do part of the work at compile time that would otherwise be done at runtime. In many cases, this allows programmers to get more done in the same amount of time as they would take to write all the code manually, or it gives programs greater flexibility to efficiently handle new situations without recompilation. Or, more simply put: Metaprogramming is writing code that writes code during runtime to make your life easier.

Tóm tắt lại, metaprogramming là một kĩ thuật giúp code chúng ta linh hoạt hơn, động hơn. Nghĩa là nó sẽ cho phép định nghĩa các method và class trong thời gian runtime, giúp code ngắn gọn và tránh bị trùng lặp.
#  Các  method thường gặp trong metaprogramming
## Send
Bất kể khi nào bạn gọi một phương thức của một đối tượng, tức là bạn đang gửi một "message" đến đối tượng đó. Và "message" chính là tên của phương thức. Tham số đầu tiên chính là tên method mà mình muốn gọi, các đối số khác là các tham số truyền vào tương ứng với các tham số truyền vào của hàm mà mình đã định nghĩa bên dưới.
Ví dụ như sau:
```

class LearnSendMethod
  def dogs name
    puts "My name is " + name 
  end
end

a = LearnSendMethod.new
a.send(:dogs, "alsaka")
```
## respond_to?
Phương thức này sẽ trả về true nếu đối tượng đáp ứng với tên phương thức truyền vào, nó  là một symbols (nếu bạn truyền string vào thì nó cũng sẽ tự convert sang symbol)
```

class LearnSendMethod
  def dogs name
    puts "My name is " + name 
  end
end

a = LearnSendMethod.new

if a.respond_to? :dogs
  a.send(:dogs, "alsaka")
else
  puts "No method invalid"
end
```
Tuy nhiên nếu viết như trên thì nó chỉ tìm được các method public mà thôi, để tìm được các method protected và private, thì các bạn phải truyền thêm tham số thứ 2 vào. ưu ý rằng tham số thứ hai của method respond_to? rất quan trọng ở đây, nó biểu thị rằng respond_to? có thể tìm tất cả các method mà phạm vị bao gồm cả các method protected và private
Trong ví dụ trên nếu dogs là một method private thì ta sẽ gọi như sau:
```
class LearnSendMethod

private
  def dogs name
    puts "My name is " + name 
  end
end

a = LearnSendMethod.new

if a.respond_to? :dogs, true
  a.send(:dogs, "alsaka")
else
  puts "No method invalid"
end
```
##  instance_eval
Mình viết lại đoạn code trên một xíu cho đầy đủ như sau:
```

class InstanceEvalMethod
  def initialize name
    @name = name
  end
  def dogs
    puts "My name is " + name 
  end

  attr_reader :name
end

dog = InstanceEvalMethod.new "alaska"

if dog.respond_to? :dogs, true
  dog.send(:dogs)
else
  puts "No method invalid"
end
```
Hiện tại mình đã gọi được method dogs để in ra tên của giống chó, nhưng giả sử trong trường hợp mình không muốn gọi đến method dogs, mình chỉ muốn biết cái instance variable name của object a nó là gì thôi, tức là tên của giống chó được truyền vào. Lúc này mình sẽ sử dụng instance_eval. Method này được gọi dưới dạng block hoặc string.
```
class InstanceEvalMethod
  def initialize name
    @name = name
  end
  def dogs
    puts "My name is " + name 
  end

  attr_reader :name
end

dogs = InstanceEvalMethod.new "alaska"

if dog.respond_to? :dogs, true
   dog.instance_eval do 
       puts @name
   end
else
  puts "No method invalid"
end
```
## module_eval, class_eval
Những methods module_eval và class_eval được dùng trên các module và class chứ ko phải trên object. class_eval là 1 alias của module_eval.
Những method này được sử dụng để thêm/bớt giá trị của các class variables từ bên ngoài class đó.
```
class Dogs
  @@name = "alaska"
end
puts Dogs.class_eval("@@name") # => alaska
```
Module_eval và class_eval có thể được dùng để thêm instance methods vào 1 module hoặc class. Mặc dù 2 method này có tên khác nhau nhưng chức năng thì giống hệt nhau.
```
class Dogs
end
Dogs.class_eval do
  def who
    "Pecgie"
  end
end
obj = Dogs.new
puts obj.who # => Pecgie
```
**Note: class_eval định nghĩa instance methods, còn instance_eval định nghĩa class_methods**
## method_missing
Method_missing là một phương thức mà ruby cho phép bạn truy cập vào bên trong một đối tượng và xử lý trong trường hợp bạn gọi tới một phương thức không tồn tại. Nó là một method được xây dựng sẵn của class BasicObject trong Ruby
Method_mising nhận 3 tham số:
 - Tham số đầu tiên là tên của phương thức mà bạn đang cố gọi tới
- Tham số thứ hai là những đối số (*args) được truyền khi gọi tới phương thức đó
- Tham số thứ ba là một block (&block) những tham số của phương thức Tham số thứ hai và ba có thể rỗng nếu phương thức gọi tới không tryền tham số
```
 class MethodMissing
  def method_missing(m, *args, &block)
    puts "Called #{m} with #{args.inspect} and #{block}"
  end
end

MethodMissing.new.anything # => Called anything with [] and
MethodMissing.new.anything(3, 4) { something } # => Called anything with [3, 4] and #<Proc:0x02efd664@tmp2.rb:7>
```
# Tổng kết
Trên đây là bài giới thiệu tổn quan vể metaprogramming và một số method, sẽ còn rất nhiều method khác nữa nhưng trong phạm vi bài viết này mình chỉ viết một số method thường gặp khi làm dự án. Mong mọi người đóng góp ý kiến để bài viết được hoàn thiện!
# Tài liệu tham khảo
http://ruby-metaprogramming.rubylearning.com/html/ruby_metaprogramming_3.html