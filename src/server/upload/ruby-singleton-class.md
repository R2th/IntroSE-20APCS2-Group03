Khi mới tiếp cận với Ruby, chúng ta thường hay gặp phải những khái niệm như `metaclasses`,  `singleton class`, `singleton method`. Chúng là những khái niệm khá mơ hồ và hiếm thấy khi ta code với `Ruby`.
# Singleton class là gì?
## Khái niệm
>  Singleton classes là những class chứa các singleton method và class method của một đối tượng (hoặc một class)
>  
Ta đã quen làm việc với class trong Ruby (định nghĩa class, định nghĩa các biến, method)

Những method thông thường (instance methods) sẽ thuộc về object (class) định nghĩa ra chúng, còn đối vơi những class methods, chúng thuộc về singleton class của object (class) định nghĩa chúng

Khi khởi tạo một object (hay class), Ruby sẽ tự động khởi tạo một singleton class ứng với object (class) đó, đây sẽ là nơi chứa những class methods và singleton methods của object (class) đó

Lý thuyết không thì sẽ khó hiểu, ta đi vào ví dụ minh họa để hiểu rõ hơn nhé.
# Ví dụ
Giả sử ta định nghĩa một class Animal, với một instance variable là `@name`, tạo một instance `tom` của Animal.
```ruby
class Animal
  def initialize name
    @name = name
  end

  def run
    p "#{@name} is running"
  end
end

tom = Animal.new("Tom")
```
Ruby sẽ tự động định nghĩa ra hai singleton class, một tương ứng với `tom`, còn lại tương ứng với `Animal`. Ta có thể hình dung như sau:
![](https://images.viblo.asia/530429e5-613f-4ccf-b81f-c991e77c4b4b.png)
(Ở đây ta ký hiệu singleton class với dấu # phía trước)

Lúc này nếu ta gọi method `run()` từ `tom`: `tom.run()` thì Ruby sẽ tìm kiếm `run()` bắt đầu từ singleton class `#tom`, nếu không thấy thì tiếp tục theo superclass trỏ tới `Animal`  (superclass của `#tom`), ở đây `run()` được định nghĩa, ruby sẽ thực thi `run()` với đối tượng gọi `tom`

## class method
Tiếp theo ta sẽ định nghĩa một class methods trong `Animal`.  Có 3 cách để định nghĩa 1 class method trong `Ruby`, ở đây ta sẽ dùng:

```ruby
class << self
    def intro
        p "I'm animal"
    end
end
```
`Ruby` sẽ lưu những class method trong singleton class của class định nghĩa ra nó, trong trường hợp này là `#Animal`:
![](https://images.viblo.asia/7c0c7c87-2a08-4ede-a7df-b9d6878d2e76.png)
## singleton method
Chắc hẳn ta đã từng gặp đoạn code sau:
```ruby
tom = Animal.new("Tom")
def tom.tom_method
  p "Catch Jerry"
end

# hoặc

class << tom
  def tom_method
    p "Catch Jerry"
  end
end
```
Cả hai cách đều trên đều định nghĩa singleton method cho `tom`, chỉ có object `tom` mới có quyền thực thi method này
![](https://images.viblo.asia/26defa5d-bcf3-4a64-b3b8-341a2bb23dee.png)
Để ý thì cách viết thứ 2 giống với cách định nghĩa class method ở phần trên. Khi viết `class << object; end` thực ra ruby định nghĩa những method được viết bên trong vào singleton class của object đó.

Ở phần trên ta viết `class << self` với `self` thay cho `Animal` bởi ta đang định nghĩa trong thân class, nếu định nghĩa ở ngoài thì ta phải dùng `Animal`

Qua ví dụ trên ta có thể hiểu được ý nghĩa của cái tên `singleton`, những method trong singleton class đều chỉ dùng được cho 1 đối tượng duy nhất. `tom_method()` chỉ dùng cho object `tom`, `intro()` chỉ dùng cho object `Animal` (trong `Ruby`, mọi thứ đều là object)
## Kế thừa trong singleton class
Ta thêm đoạn code sau:
```ruby
class Cat < Animal 
end

Cat.intro
```
Ta định nghĩa một class mới `Cat` kế thừa `Animal` và gọi class method `intro()` của `Animal`. Và ta có thể gọi được method `intro()` này.

Nhưng, như đã nói ở trên `intro()` được định nghĩa trong singleton class của `Animal` (#Animal) và chỉ có thể truy cập với `Animal` thì tại sao ta có thể gọi `intro()` thông qua `Cat`?

Câu trả lời là khi đó, `Ruby` sẽ tìm kiếm `intro()` qua `#Cat`, **và `#Cat` kế thừa `#Animal`** , từ đó tìm thấy và thực thi method `intro()`.

Sẽ dễ hiểu hơn nhiều nếu ta khái quát qua hình sau:
![](https://images.viblo.asia/c87efe4a-82a4-4a9a-a7b1-20c977870fc4.png)

Trên đây là một số tìm hiểu của mình về `singleton class` trong `Ruby`, cảm ơn các bạn đã quan tâm! :grinning: