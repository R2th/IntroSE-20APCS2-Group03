![Mối quan hệ giữa class và singleton class](https://images.viblo.asia/45607857-33b0-4df3-957c-1c1000054301.jpg)

Bài viết dựa theo trang [Module#extend: Understanding Ruby Singleton Classes](https://medium.com/@jeremy_96642/module-extend-understanding-ruby-singleton-classes-9dea718c80f2) của Jem Zornow

Nếu bạn đã học lập trình hướng đối tượng từ những ngôn ngữ như C ++ hoặc Java thì khi bạn chuyển sang Ruby,  bạn sẽ cảm thấy có những thứ của Ruby có vẻ "ảo" và khó hiểu. Sau khi chạy theo cú pháp dành riêng cho meta-programming, bạn bắt đầu gãi đầu (do đầu nhiều gàu) hoặc ít nhất là tự hỏi: "Cái éo gì đang diễn ra vậy?". Và Singleton class (không phải singleton pattern đâu nhá), có thể dễ dàng được đặt vào danh mục "gãi đầu" này.

Bản thân cái tên `Singleton class` rất khó hiểu, nó hay gây nhầm lẫn cho mọi người và dẫn đến việc chúng ta phải tạo một cái tên thay thế khác, chẳng hạn như: `object-specific classes`, `anonymous classes`, `virtual classes` hoặc `eigenclasses`. Mình hay gọi nó là `anonymous classes` nhưng thôi vì ích nước lợi nhà mình sẽ dùng cụm từ `singleton classes` cho dễ hiểu nhé.

### Method Dispatching

Trước khi chúng ta tìm hiểu về `singleton classes`, hãy tìm hiểu về `dynamic dispatch`:

> Với mỗi method được "gọi" (call), trình thông dịch Ruby cần kiểm tra hệ thống phân cấp kế thừa của "người nhận" (receiver) để tìm meothd sẽ được thực thi.

Mình sẽ hỏi bạn: Các phương thức (methods) được định nghĩa ở đâu?

Nếu bạn trả lời: "Dễ ẹt, ở class" thì bạn chỉ trả lời đúng một nửa. Ruby's classes chỉ định nghĩa instance methods, cái mà các bạn hay sử dụng đối với các biến instance variable đó:

```
class Employee
  def validate_id!
    puts "Checking...."
  end
end

some_employee = Employee.new
some_employee.validate_id!

# => "Checkingv..."
```

Nó gọi như thế nào?

Hãy xem xét một ví dụ của class `Employee`:

![](https://images.viblo.asia/58ba5b55-befb-4778-89d6-2f386da2b0c3.png)

instace variable `some_employee` không biết rằng nó có một method. Nó chỉ biết nó là 1 member của class `Employee`. Khi bạn gọi 1 method từ `some_employee`, Ruby lần theo *class* mà nó trỏ đến và tìm method phù hợp trong class đó.

Một cách khá là hay để tiết kiệm bộ nhớ, theo cách đó, các `instance` của mỗi lớp không cần mang theo các bản sao của mọi phương thức cá thể mà chúng trả lời. Nó là một cách tốt để tiết kiệm bộ nhớ trong hệ thống.

### Class Methods —  Nà ní !!
Bạn có bao giờ để ý chỉ có `Module#instance_methods` mà không có `Module#class_methods` không? Theo mình thì nó nằm trong chuyên mục gãi đầu rùi đấy :)

Trong bài viết [Module#extend: Understanding Ruby Singleton Classes](https://medium.com/@jeremy_96642/module-extend-understanding-ruby-singleton-classes-9dea718c80f2) của Jem Zornow, ổng có nói rằng:

> There is no such thing as a Ruby class method, only instance methods that look and smell like class methods.

Khi chúng ta định nghĩa lại `validate_id!` là class method:
```
class Employee
  def self.validate_id!
    puts "Checking...."
  end
end

Employee.validate_id!
# => "Checkingv..."
```
Ruby sẽ chạy theo cái luồng giống như cái ta đã làm trước kia:

![](https://images.viblo.asia/72a5ca25-a9d0-4098-9d12-e53c287c8016.png)

Chúng ta sẽ kiểm tra lớp `Employee` cho instance method. Nếu không tìm thấy nó, chúng ta sẽ theo con trỏ đó tham chiếu đến lớp `Class` và tìm nó ở đó. `Employee`, xét cho cùng, là một instance của lớp `Class`.

Nhưng chờ đã. Nếu chúng ta tìm thấy `validate_id!` trên lớp `Class`, thì phương thức đó sẽ có sẵn cho mọi lớp, không chỉ `Employee` ( Lại một cái gãi đầu nữa?)

### Ruby Singleton Classes

> Singleton class is the class which hold singleton methods and class methods of specific-object (or specific-class)

Bạn có thể thấy một đoạn code như thế này trước đây:

```
some_employee = Employee.new

def some_employee.new_method
  puts "This is me"
end
```

Chúng ta sẽ gọi `new_method` là một `singleton method` của một instance: `some_employee`. Object chứa phương thức đó (`some_employee`) sẽ được gọi là `singleton class`. Hãy thử:

```
clas Employee; end
some_employee = Employee.new

def some_employee.new_method
  puts "This is me"
end

some_employee.singleton_class.instance_methods.include?(:new_method)
# => true

some_employee.class.instance_methods.include?(:new_method)
# => false
```

Nếu việc định nghĩa phương thức ở bên lớp `Employee`, vậy instance method `new_method` đó sẽ mất đi.

### Chốt lại: WTF is Class Method?
Có 2 cách trả lời:
Cách 1: Class method là các method được định nghĩa bên trong class đó.

Cách 2: Class method là cách method được định nghĩa bên trong một `singleton class` của class đó :)

Các bạn cứ hiểu như này nè:

```
# Class method: các method được định nghĩa bên trong class đó.
class ThisIsMe
  def ThisIsMe.call_me_baby
    puts "9.pm at Quat-Lam's hotel"
  end
end

ThisIsMe.call_me_baby
# => 9.pm at Quat-Lam's hotel



#  Class method: các method được định nghĩa bên trong một singleton class của class đó :)
class ThisIsMe; end
def ThisIsMe.call_me_baby
  puts "9.pm at Quat-Lam's hotel"
end

ThisIsMe.call_me_baby
# => 9.pm at Quat-Lam's hotel
```

Vì bài của ông thần Jem Zornow gì gì đó rất là khủng, những đứa nghiệp dư như mình có nội công ít, khó mà có thể hiểu được cảnh giới của vị cao nhân kia, cho nên là "chưa hiểu ý tác giả". Nếu các bạn thấy bài viết (bài dịch đúng hơn) còn chỗ nào sai sót, hoặc sai kiến thức, hệ thống, mong các bạn chỉ giảo ạ.

À còn một việc nữa:

Có 2 loại singleton class trong ruby mà các bạn phải để ý:
```
class ThisIsMe; end

# Singleton class này sử dụng để lưu các class method của lớp ThisIsMe
puts ThisIsMe.singleton_class

# Singleton class này sử dụng để lưu các singleton method của object ThisIsMe.new
puts ThisIsMe.new.singleton_class
```

 Cảm ơn các bạn đã đọc đến đây. Xin cảm ơn!!