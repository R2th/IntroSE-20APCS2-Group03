Chúng ta lại gặp nhau trong series Design Patterns in Ruby các bạn có thể đọc bài về Creational Patterns của mình ở  [đây](https://viblo.asia/p/design-patterns-in-ruby-creational-pattern-Do7544J45M6). Trong bài viết này mình sẽ đi sâu về mẫu Composite một mẫu tiêu biểu trong  Structural Patterns  và cách cài đặt nó trong ruby. Về mục lục các bạn xem bên phải màn hình nhớ vì viblo tự động đánh link các phần giúp mình rồi :sweat_smile:  vào phần đầu tiên thôi :

##  Mục đích

Composite Pattern giúp  kết hợp các đối tượng thành các cấu trúc cây và sau đó làm việc với các cấu trúc này như thể chúng là các đối tượng riêng lẻ.

## bài toán

Composite Pattern chỉ có ý nghĩa khi mô hình cốt lõi của ứng dụng có thể được biểu diễn dưới dạng cây. 
Giả sử ta có hai loại đối tượng:  `Products` và `Boxes` (Sản phẩm và Hộp). Một hộp có thể chứa một số sản phẩm cũng như một số hộp nhỏ hơn. Những hộp nhỏ này cũng có thể chứa một số sản phẩm hoặc thậm chí là hộp nhỏ hơn nữa, v.v. Bài toán đặt ra là tạo một hệ thống đặt hàng sử dụng các lớp này. Đơn đặt hàng có thể chứa các sản phẩm đơn giản mà không cần gói, cũng như các hộp được nhồi bằng các sản phẩm ... và các hộp khác. Làm thế nào để xác định tổng giá của một đơn đặt hàng như vậy?

![](https://images.viblo.asia/953000a6-cc81-4067-8fd5-a4f333f53da2.png)

Cùng thử cách tiếp cận trực tiếp: mở ra tất cả các hộp, xem qua tất cả các sản phẩm và sau đó tính tổng. Điều đó sẽ có thể làm được trong thế giới thực, nhưng trong một chương trình, nó không đơn giản như chạy một vòng lặp. Chương trình phải biết các `Products`  và `Boxes`  đã duyệt qua, mức độ lồng nhau của các hộp và các chi tiết khó chịu khác nữa. Tất cả điều này làm cho cách tiếp cận trực tiếp hoặc quá vụng về hoặc thậm chí là không thể
## Giải pháp

Composite pattern gợi ý rằng chúng ta nên làm việc với `Products` và `Boxes` thông qua một interface chung khai báo phương thức tính tổng giá.
Phương thức này sẽ hoạt động như sau:
Đối với một sản phẩm, nó chỉ đơn giản là trả lại giá sản phẩm. Đối với một hộp, nó sẽ duyệt qua từng mục mà hộp chứa, hỏi giá của nó và sau đó trả lại tổng giá cho hộp này. Nếu một trong những vật phẩm này là một hộp nhỏ hơn, thì hộp đó cũng sẽ bắt đầu duyệt qua nội dung của nó và cứ thế, cho đến khi giá của tất cả các thành phần bên trong được tính toán. Một hộp thậm chí có thể thêm một số chi phí thêm vào giá cuối cùng, chẳng hạn như chi phí đóng gói
## Mô hình trong thực tế
Quân đội của hầu hết các quốc gia được cấu trúc như một hệ thống phân cấp. Một đội quân bao gồm nhiều bộ phận; một sư đoàn là một tập hợp các lữ đoàn, và một lữ đoàn bao gồm các trung đội, có thể được chia thành các đội. Cuối cùng, một đội là một nhóm nhỏ những người lính thực sự. Các đơn đặt hàng được đưa ra ở đầu phân cấp và được truyền xuống từng cấp cho đến khi mọi người lính biết mình cần phải làm gì.
## Cấu trúc
![](https://images.viblo.asia/70edd057-50f3-4000-9852-334894a28036.png)
1. Component interface mô tả các hoạt động phổ biến cho cả các yếu tố đơn giản và phức tạp của cây.
2. Leaf là một yếu tố cơ bản của cây tất nhiên là không chứa các yếu tố phụ. Thông thường, các thành phần Leaf  thực hiện hết các công việc, vì chúng không có thằng nào để nhờ làm hộ. 
3. Container (hay còn gọi là composite) là một thành phần có các thành phần phụ: Leaf hoặc các composite khác. Một container không biết class cụ thể của phần phụ chứa trong nó. Nó hoạt động với tất cả các thành phần phụ chỉ thông qua Component interface. Khi nhận được yêu cầu, một container ủy thác công việc cho các thành phần phụ của nó, xử lý các kết quả trung gian và sau đó trả về kết quả cuối cùng cho client.

## Ứng dụng khi 
**Sử dụng Composite Pattern khi cấu trúc đối tượng của bạn là cấu trúc cây.**

 **Sử dụng Composite pattern khi muốn client xử lý đồng nhất cả hai yếu tố đơn giản và phức tạp thông qua một  đoạn code duy nhất**
 
##  Làm thế nào để cài đặt ?
1. Đảm bảo rằng mô hình cốt lõi của ứng dụng có thể được biểu diễn dưới dạng cấu trúc cây. Cố gắng chia nó thành các yếu tố đơn giản và container. Hãy nhớ rằng các container phải có khả năng chứa cả các yếu tố đơn giản và các container khác.

2. Khai báo `Component interface `với một danh sách các phương thức có ý nghĩa cho cả các thành phần đơn giản và phức tạp.

3. Tạo` Leaf` class  để đại diện cho các yếu tố đơn giản. Một chương trình có thể có nhiều leaf class khác nhau.

4. Tạo `Container `class để biểu diễn các phần tử phức tạp. Trong class này, cung cấp một trường mảng để lưu trữ các tham chiếu đến các thành phần phụ. Mảng phải có khả năng lưu trữ cả lá và Container, vì vậy hãy chắc chắn rằng nó được khai báo với `Component interface`.

5. Cuối cùng,viết các phương thức để thêm và loại bỏ các phần tử con trong container.

## Ví dụ sử dụng trong ngôn ngứ Ruby

**main.rb:**

### Component class khai báo các hoạt động chung cho cả các đối tượng đơn giản và phức tạp.
```
class Component
  # @return [Component]
  def parent
    @parent
  end

  def parent=(parent)
    @parent = parent
  end

  def add(component)
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end

  def remove(component)
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end

  def composite?
    false
  end

  def operation
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end
end
```

###    Leaf class đại diện cho các đối tượng kết thúc của một tác phẩm. Một leaf thì không có con.
    
```
class Leaf < Component
  def operation
    'Leaf'
  end
end
```
### Composite class biểu thị các thành phần phức tạp có thể có con. Thông thường, các đối tượng composite ủy thác công việc thực tế cho con  của chúng và sau đó "tổng hợp" kết quả.
```
class Composite < Component
  def initialize
    @children = []
  end

  def add(component)
    @children.append(component)
    component.parent = self
  end

  def remove(component)
    @children.remove(component)
    component.parent = nil
  end

  def composite?
    true
  end

  def operation
    results = []
    @children.each { |child| results.append(child.operation) }
    "Branch(#{results.join('+')})"
  end
end
```
### Code ở client
```
def client_code(component)
  puts "RESULT: #{component.operation}"
end

def client_code2(component1, component2)
  component1.add(component2) if component1.composite?

  print "RESULT: #{component1.operation}"
end


simple = Leaf.new
puts 'Client: I\'ve got a simple component:'
client_code(simple)
puts "\n"

tree = Composite.new
branch1 = Composite.new
branch1.add(Leaf.new)
branch1.add(Leaf.new)

branch2 = Composite.new
branch2.add(Leaf.new)

tree.add(branch1)
tree.add(branch2)

puts 'Client: Now I\'ve got a composite tree:'
client_code(tree)
puts "\n"

puts 'Client: I don\'t need to check the components classes even when managing the tree:'
client_code2(tree, simple)
```
### Và đây là kết quả:
 **output.txt**
```
Client: I've got a simple component:
RESULT: Leaf

Client: Now I've got a composite tree:
RESULT: Branch(Branch(Leaf+Leaf)+Branch(Leaf))

Client: I don't need to check the components classes even when managing the tree:
RESULT: Branch(Branch(Leaf+Leaf)+Branch(Leaf)+Leaf)
```

## Tham khảo
[refactoring.guru](https://refactoring.guru/design-patterns/composite)