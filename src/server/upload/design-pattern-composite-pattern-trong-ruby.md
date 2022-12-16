Trong phát triển phần mềm hiện đại, kiến trúc tổng thể của dự án đóng một vai trò quan trọng, đặc biệt với bộ khung (framework) và mẫu thiết kế (design pattern). Hiểu được tầm quan trọng đó, hôm nay mình sẽ giới thiệu tới các bạn về Composite Pattern trong Ruby.
# **Composite**
Giải pháp của mẫu Composite là xây dựng một lớp trừu tượng để biểu diễn cả hai
thành phần nguy n thủy và các lớp chứa chúng. Lớp này cũng xác định các thao tác truy
nhập và quản lý các đối tượng con của nó. Như vậy, Composite là mẫu thiết kế dùng để tạo
ra các đối tượng trong các cấu trúc cây để biểu diễn hệ thống phân lớp: bộ phận – toàn bộ.
Composite cho phép các client tác động đến từng đối tượng và các thành phần của đối
tượng một cách thống nhất. 
 
![](https://images.viblo.asia/68d6c717-6c61-4f26-abb4-4159c9db4dfe.png)

Trong đó: 
- Component: là một giao tiếp interface định nghĩa các phương thức cho tất cả các
phần của cấu trúc cây. Nó có thể được thực thi như một lớp trừu tượng khi ta cần
cung cấp các hành vi cho tất cả các kiểu con. Bình thường, các Component không
có các thể hiện, các lớp con hoặc các lớp thực thi, nhưng nó có thể hiện và được sử
dụng để tạo n n cấu trúc cây.

- Composite: là lớp được định nghĩa bởi các thành phần mà nó chứa. Composite chứa
một nhóm các Component, vì vậy nó có các phương thức để th m vào hoặc loại bỏ
các thể hiện của Component. Những phương thức được định nghĩa trong
Component được thực thi để thực hiện các hành vi đặc tả cho lớp Composite và để
gọi lại phương thức đó trong các đỉnh của nó. Lớp Composite được gọi là lớp
nhánh hay lớp chứa.
- Leaf: là lớp thực thi từ giao tiếp Component. Sự khác nhau giữa lớp Leaf và
Composite là lớp Leaf không chứa các tham chiếu đến các Component khác, lớp
Leaf đại diện cho mức thấp nhất của cấu trúc cây.

Trước khi đi tìm hiểu chi tiết hơn về Composite Pattern, ta cùng xem một ví dụ thú vị về coffee. 

# Coffee Coffee
“Nếu bạn giống tôi, bạn sẽ đồng ý rằng mỗi sang chúng ta cần bắt đầu với một tách cà phê. Và, nếu bạn giống tôi, bạn sẽ cần ít nhất 3 máy pha cà phê khác nhau. Và, nếu bạn giống tôi, bạn sẽ sớm nhận ra rằng bạn có thể đã nghiện cà phê”. 
Mỗi cốc cà phê khác nhau lại yêu cầu một quy trình cụ thể để có thể hoàn thành công việc pha cà phê. Mỗi quy trình gồm nhiều giai đoạn, tốn nhiều thời gian khác nhau, đòi hỏi nhiều bước.
Mỗi tiến trình pha cà phê có thể được miêu tả lại qua một ví dụ đơn giản của Composite Pattern.

# Áp dụng Composite Pattern trong việc pha cà phê
Hãy bắt đầu bằng việc nghĩ rằng mỗi người pha cà phê và các công việc có liên quan tới cà phê như là một subclass của CoffeeRoutine. CoffeeRoutine được hiểu như là 1 component, lớp cơ sở (interface) chứa các đối tượng đơn giản và phức tạp.
CoffeeRoutine#time là một phương thức phổ biến trong tất cả các class có liên quan tới coffee.

```
class CoffeeRoutine
  attr_reader :task

  def initialize(task)
    @task = task
  end

  def time
    0.0
  end
end
```

Tiếp theo, ta sẽ tạo một vài lớp Leaf, một thành phần không thể thiếu của Composite Pattern.
Dưới đây có 2 lớp leaf: GrindCoffee và BoilWater, những bước cơ bản của việc tạo coffee.

```
class GrindCoffee < CoffeeRoutine
  def initialize
    super 'Grinding some coffee!'
  end

  def time
    0.5
  end
end

class BoilWater < CoffeeRoutine
  def initialize
    super 'Boiling some water!'
  end

  def time
    4.0
  end
end

class AddCoffee < CoffeeRoutine
  def initialize
    super 'Adding in the coffee!'
  end

  def time
    1.0
  end
end
g = GrindCoffee.new

g.task    # => 'Grinding some coffee!'
g.time    # => 0.5
```

Một lớp composite là một component chứa các subcomponent. Các lớp Composite có thể được tạo thành từ các lớp composite nhỏ hơn hoặc lớp leaf.
Các máy pha cà phê khác nhau có thể được coi như là các lớp Composite. Ví dụ FrenchPress.
```
class FrenchPress < CoffeeRoutine
  attr_reader :task, :steps

  def initialize(task)
    super 'Using the French press to make coffee'
    @steps = []
    add_step BoilWater.new
    add_step GrindCoffee.new
    add_step AddCoffee.new
  end

  def add_step(step)
    steps << step
  end

  def remove_step(step)
    steps.delete step
  end

  def time_required
    total_time = 0.0
    steps.each { |step| total_time += step.time }
    total_time
  end
end

```

Tuy nhiên, chúng ta có thể đơn giản hóa lớp FrenchPress bằng cách đưa composite function vào trong lớp của nó.
```
class CompositeTasks < CoffeeRoutine
  attr_reader :task, :steps

  def initialize(task)
    @steps = []
  end

  def add_step(step)
    steps << step
  end

  def remove_step(step)
    steps.delete step
  end

  def time_required
    total_time = 0.0
    steps.each { |step| total_time += step.time }
    total_time
  end
end

```
Bây giờ chúng ta có thể tạo ra các composite coffee một cách dễ dàng ... Như thế này:
```
class FrenchPress < CompositeTasks
  def initialize
    super 'Using the FrenchPress to make coffee!!!'
    add_step GrindCoffee.new
    add_step BoilWater.new
    add_step AddCoffee.new
    # ... Omitted actual steps to make coffee from a French press ...
    # ... Imagine PressPlunger class has been defined already ...
    add_step PressPlunger.new
  end
end

class DripMaker < CompositeTasks
  def initialize
    super 'Using the DripMaker to make coffee!!!'
    add_step GrindCoffee.new
    add_step BoilWater
    add_step AddCoffee.new
    # ... Imagine PressStartButton class has been defined already ...
    add_step PressStartButton.new
  end
end

```
Tiếp, ta gọi máy pha cà phê: FrenchPress và DripMaker
```
frenchpress = FrenchPress.new

dripmaker = DripMaker.new

```
Kiểm tra thời gian yêu cầu cho mỗi máy pha cà phê này:
```
frenchpress.time_required # => 12.4
dripmaker.time_required   # => 8.5

```

# Tổng kết
Implement Composite pattern khá đơn giản. 
Ta cần tạo ra một Component class kết hợp nhiều đặc điểm đơn giản và phức tạp lại với nhau. 
Tiếp theo, ta tạo các class Leaf, có cùng đặc điểm với nhau, bản chất của các class này đơn giản. 
Sau đó ta tạo Class Composite xử lý các nghiệp vụ con, chủ yêu xử dụng các lớp con theo ý muốn của nó.
Cảm ơn các bạn đã theo dõi bài viết! 

# Tham khảo: 
https://dockyard.com/blog/2013/10/01/design-patterns-composite-pattern

https://github.com/Integralist/Ruby-Design-Patterns/tree/master/Composite

https://projectramon.wordpress.com/2013/12/29/ruby-interfaces-pt-2-the-composite-pattern/

https://www.thaleang.com/memo/books/design-patterns-in-ruby/chapters/composite-pattern