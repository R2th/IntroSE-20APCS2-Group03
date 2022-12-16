Bạn nên xem qua các khái niệm cơ bản về lập trình hướng đối tượng để có thể hiểu các khái niệm và áp dụng chúng vào các ngôn ngữ mà bạn học 1 cách dễ dàng. Ở đây mình sẽ sử dụng ngôn ngữ lập trình Ruby làm ví dụ.

Có thể các bạn đang tự hỏi, tại sao lại là Ruby? Bởi vì nó được "designed to make programmers happy" và cũng bởi vì hầu hết mọi thứ trong Ruby là một đối tượng.

# Hiểu được mô hình hướng đối tượng (OOP)

Trong OOP, ví dụ như là con người, chúng ta nghĩ về "các vật thể" như các đối tượng với các thuộc tính và hành vi, và chúng ta tương tác với mọi thứ dựa trên các thuộc tính và hành vi này. Nó có thể là một chiếc xe hơi, một cuốn sách, v.v. Những thứ như vậy trở thành các lớp (các bản thiết kế của các đối tượng), và chúng ta tạo ra các đối tượng ra từ các lớp này.

Mỗi cá thể (đối tượng - object) chứa instance variable, instance variable là trạng thái của đối tượng (các thuộc tính - attributes). Các hành vi của đối tượng được biểu diễn bằng các phương thức - method.

Hãy lấy ví dụ về chiếc xe hơi. Xe hơi chính là 1 **class** và tên là class Car. Một loại xe cụ thể, nói **BMW** là một **đối tượng - object** của **class Car**. Các **attributes/properties** của một chiếc BMW chẳng hạn như **màu sắc** và **số xe** có thể được lưu trữ trong các ***instance variables***. Và nếu bạn muốn thực hiện một hoạt động của đối tượng, chẳng hạn như lái xe, thì hành động "lái" chính là 1 method mà object BMW sẽ thực hiện



# Nói qua về cú pháp

Cách thức các đối tượng được tạo ra trong Ruby là bằng cách gọi một phương thức mới trên một lớp, như trong ví dụ dưới đây:

```
class Car
  def initialize(name, color)
    @name = name
    @color = color
  end
  
  def get_info
    "Name: #{@name}, and Color: #{@color}"
  end
end

my_car = Car.new("Fiat", "Red")
puts my_car.get_info

```

Để hiểu những gì đang xảy ra trong đoạn code ở trên:

* Chúng ta có một class có tên là Car với hai method, initialize và get_info.
* Các instance variable trong Ruby bắt đầu bằng @ (Ví dụ @name). Instance variable không được khai báo ban đầu. Chúng sẽ trở thành hiện hữu khi được sử dụng lần đầu tiên, và sau đó chúng có sẵn cho tất cả instance methods của class.
* Gọi method **new** sẽ gọi tới **initialize** method. initialize là một method đặc biệt được sử dụng như một hàm khởi tạo.

# Truy cập dữ liệu # 
Các instance variable có quyền truy cập là private và không thể truy cập được từ bên ngoài class. Để truy cập chúng, chúng ta cần tạo các method. Các instance methods có quyền truy cập là public, nó có thể được dùng ở bất cứ đâu. Chúng ta có thể giới hạn sự truy cập của các instance method ở phần sau của bài viết.

Để có được và sửa đổi dữ liệu, chúng ta cần các phương thức “getter” và “setter” tương ứng. Hãy xem xét các phương pháp này lấy cùng một ví dụ về một chiếc xe hơi.

```
class Car
  def initialize(name, color) # "Constructor"
    @name = name
    @color = color
  end
  
  def color
    @color
  end
  
  def color= (new_color)
    @color = new_color
  end
end

my_car = Car.new("Fiat", "Red")
puts my_car.color # Red

my_car.color = "White"
puts my_car.color # White
```

Trong Ruby, *"getter"* và *"setter"* được định nghĩa với cùng tên với instance variable mà chúng ta đang xử lý.

Trong ví dụ trên, khi chúng ta nói my_car.color, nó sẽ gọi method color và lần lượt trả về tên của màu sắc.

Viết các phương thức **getter/setter** này cho phép chúng ta có nhiều quyền kiểm soát hơn. Tuy nhiên, viết như trên thì khá là dài dòng và Ruby cho phép chúng ta dùng getter/setter 1 cách dễ dàng hơn rất nhiều :D


Bằng cách sử dụng `attr_*`, chúng ta có thể lấy giá trị hiện tại và đặt giá trị mới.

`attr_accessor`: getter và setter

`attr_reader`: chỉ getter

`attr_writer`: chỉ setter

Hãy xem đoạn code này lấy cùng ví dụ về một chiếc xe hơi.

```
class Car
  attr_accessor :name, :color
end

car1 = Car.new
puts car1.name # => nil

car1.name = "Suzuki"
car1.color = "Gray"
puts car1.color # => Gray

car1.name = "Fiat"
puts car1.name # => Fiat
```

# Class Methods và Class Variables #
Các class method được gọi trên một class, không phải trên một instance của một class. Chúng tương tự như các phương thức tĩnh trong Java.

Bây giờ, có ba cách để định nghĩa các phương thức lớp trong Ruby

**Bên trong class**

1. Sử dụng từ khóa self với tên của phương thức:

```
class MathFunctions
  def self.two_times(num)
    num * 2
  end
end

# No instance created
puts MathFunctions.two_times(10) # => 20

```
2.  Sử dụng << self
```
class MathFunctions
  class << self
    def two_times(num)
      num * 2
    end
  end
end

# No instance created
puts MathFunctions.two_times(10) # => 20
```
**Bên ngoài class**

3. Sử dụng tên lớp với tên phương thức
```
class MathFunctions
end

def MathFunctions.two_times(num)
  num * 2
end

# No instance created
puts MathFunctions.two_times(10) # => 20
```
# Kế thừa
Trong Ruby, mọi class đều được thừa kế hoàn toàn từ lớp Object. Hãy xem một ví dụ.

```
class Car
  def to_s
    "Car"
  end
  
  def speed
    "Top speed 100"
  end
end

class SuperCar < Car
  def speed # Override
    "Top speed 200"
  end
end

car = Car.new
fast_car = SuperCar.new
puts "#{car}1 #{car.speed}" # => Car1 Top speed 100
puts "#{fast_car}2 #{fast_car.speed}" # => Car2 Top speed 200
```

Trong ví dụ trên, class SuperCar ghi đè phương thức **speed** được thừa kế từ class Car. Ký hiệu < biểu thị kế thừa.

Lưu ý: Ruby không hỗ trợ đa thừa kế và do đó các mix-ins được sử dụng thay thế. Chúng ta sẽ thảo luận sau.

# Module trong Ruby # 
Module của Ruby là một phần quan trọng của ngôn ngữ lập trình Ruby. Đó là một tính năng hướng đối tượng chính của ngôn ngữ và hỗ trợ đa kế thừa gián tiếp.

Module là vùng chứa cho các class, method, hằng số hoặc thậm chí các module khác. Giống như một class, một module không thể được khởi tạo, nhưng phục vụ hai mục đích chính:
* Namespace
* Mix-in

**Modules as Namespace**

Rất nhiều ngôn ngữ như Java có ý tưởng về cấu trúc gói, chỉ để tránh va chạm giữa hai lớp. Hãy xem xét một ví dụ để hiểu cách hoạt động của nó.
```
module Patterns
  class Match
    attr_accessor :matched
  end
end

module Sports
  class Match
    attr_accessor :score
  end
end

match1 = Patterns::Match.new
match1.matched = "true"
match2 = Sports::Match.new
match2.score = 210
```

Trong ví dụ trên, vì chúng ta có hai lớp có tên là Match, chúng ta có thể phân biệt giữa chúng và ngăn ngừa va chạm bằng cách đơn giản đóng gói chúng thành các module khác nhau.

**Modules as Mix-in**

Trong mô hình hướng đối tượng, chúng ta có khái niệm về Interfaces. Mix-in cung cấp cách chia sẻ code giữa nhiều class khác nhau. Không chỉ vậy, chúng ta cũng có thể bao gồm các module tích hợp như Enumerable và làm cho task dễ dàng hơn nhiều. Hãy xem một ví dụ.

```
module PrintName
  attr_accessor :name
  def print_it
    puts "Name: #{@name}"
  end
end

class Person
  include PrintName
end

class Organization
  include PrintName
end

person = Person.new
person.name = "Nishant"
puts person.print_it # => Name: Nishant

organization = Organization.new
organization.name = "freeCodeCamp"
puts organization.print_it # => Name: freeCodeCamp 
```

Mix-in cực kỳ mạnh mẽ, vì chúng ta chỉ viết code một lần và sau đó có thể đưa chúng vào bất cứ đâu theo yêu cầu.

# Phạm vi trong Ruby
Chúng ta sẽ thấy scope hoạt động như thế nào cho:

* biến
* hằng số
* block

**Phạm vi của variables**

Các method và các class xác định lại phạm vi cho các biến, các biến bên ngoài class sẽ có phạm vi khác với các biên bên trong class. Hãy xem điều này có nghĩa là gì.
```
name = "Nishant"

class MyClass
  def my_fun
    name = "John"
    puts name # => John
  end
  
puts name # => Nishant
```

Biến **name** bên ngoài và biến **name** bên trong MyClass không giống nhau. Biến **name** bên ngoài không được chuyển sang phạm vi bên trong class. Điều đó có nghĩa là nếu bạn cố gắng in nó trong bên trong mà không định nghĩa lại nó thì sẽ báo lỗi là biến không tồn tại

**Phạm vi của hằng số**

Hằng số trong 1 class có thể thấy các hằng số được định nghĩa trong phạm vi bên ngoài và cũng có thể ghi đè các hằng số bên ngoài class. Nhưng điều quan trọng cần nhớ là ngay cả sau khi ghi đè giá trị hằng số trong class, giá trị của hằng số trong phạm vi bên ngoài vẫn class không thay đổi. Hãy xem nó hoạt động.

```
module MyModule
  PI = 3.14
  class MyClass
    def value_of_pi
      puts PI # => 3.14
      PI = "3.144444"
      puts PI # => 3.144444
    end
  end
  
  puts PI # => 3.14
end
```
**Phạm vi của block**

Các block kế thừa phạm vi bên ngoài class. Hãy hiểu nó bằng cách sử dụng một ví dụ
```
class BankAccount
  attr_accessor :id, :amount
  def initialize(id, amount)
    @id = id
    @amount = amount
  end
end

acct1 = BankAccount.new(213, 300)
acct2 = BankAccount.new(22, 100)
acct3 = BankAccount.new(222, 500)
accts = [acct1, acct2, acct3]
total_sum = 0
accts.each do |eachAcct|
  total_sum = total_sum + eachAcct.amount
end
puts total_sum # => 900
```

Trong ví dụ trên, nếu chúng ta sử dụng một phương thức để tính tổng total_sum, biến total_sum sẽ là một biến hoàn toàn khác bên trong phương thức. Đó là lý do tại sao đôi khi sử dụng các block có thể tiết kiệm cho rất nhiều thời gian.

# Kiểm soát truy cập
Khi tạo 1 class, điều quan trọng là phải suy nghĩ xem bạn sẽ tiết lộ bao nhiêu thứ bạn sẽ phơi bay ra. Điều này được gọi là Encapsulation - Đóng gói, dùng để ẩn đi các (data) dữ liệu và (logic) method bên trong một ứng dụng mà người dùng ko cần thiết phải biết đến, để cho người dùng có thể sử dụng ứng dụng một cách dễ dàng .

Có ba cấp độ kiểm soát truy cập trong Ruby:

* Public - không có quyền kiểm soát truy cập nào được thực thi. Ai cũng có thể gọi những phương pháp này.

* Protected - có thể được gọi bởi các đối tượng của các lớp đã xác định hoặc các lớp con của nó.

* Private - không thể được gọi trừ một người nhận rõ ràng.
# Kết luận
Đây là những điều cơ bản về lập trình hướng đối tượng trong Ruby. Bây giờ, khi biết những khái niệm này, bạn có thể đi sâu hơn và tìm hiểu chúng bằng cách tạo ra những thứ thú vị hơn.


> Nguồn bài viết: https://medium.freecodecamp.org/an-introduction-to-object-oriented-programming-with-ruby-73531e2b8ddc
>