Tiếp tục series tìm hiểu về nguyên lý SOLID, hôm nay chúng ta tiếp tục với nguyên lý thứ 3:  Liskov Substitution Principle. Cùng nhau hiểu rõ về nguyên lý này nha.
# Liskov Substitution Principle
>Trong một chương trình, các object của class con có thể thay thế class cha mà không làm thay đổi tính đúng đắn của chương trình
>
Còn bây giờ, để mọi người hiểu rõ hơn thì chúng ta bắt đầu với 1 ví dụ nhé. Đây là ví dụ cơ bản vi phạm về nguyên lý LSP này:
```ruby
class Rectangle
  attr_accessor :height, :width
  
  def calculate_area
    width * height
  end
end

class Square < Rectangle
  def width=(width)
    super(width)
    @height = width
  end
  
  def height=(height)
    super(height)
    @width = height
  end
end

rectangle = Rectangle.new
rectangle.height = 10
rectangle.width = 5
rectangle.calculate_area # => 50

square = Square.new
square.height = 10
square.width = 5
square.calculate_area # => 25
```

Nhìn ví dụ trên ta thấy mọi tính toán đều rất hợp lý, vì width và height của hình vuông Square là bằng nhau nên khi thực hiện thay đổi width, height thì height, width sẽ tương ứng thay đổi theo.
Class Square kế thừa từ class Rectangle nhưng có những hình vi khác, điều đó chứng tỏ lớp cha và lớp dẫn xuất không nhất quán với nhau.
Vậy nên chúng ta mới cần sự nhất quán giữa lớp cha và lớp dẫn xuất, các hành vi của lớp cha và lớp con phải giống nhau, kế thừa tính chất của nhau.
# LSP và đa hình
Tại đây chúng ta cùng đưa ra giải pháp để không vi phạm nguyên lý này. 
Cùng xem ví dụ dưới đây nhé:
```ruby
class Shape
  def draw
    raise NotImplementedError
  end
end
  
 class Rectangle < Shape
   def draw
     # Draws rectangle
   end
 end
  
 class Circle < Shape
   def draw
     # Draws circle
   end
 end
```
Method `draw` được kế thừa từ class Shape có nhiệm vụ vẽ ra những những hình phù hợp với từng lớp dẫn xuất. 
Ở đâu chúng ta không hề thay đổi thêm các hành vi của class dẫn xuất, mà mở rộng thêm các hành vi được kế thừa từ.


Ví dụ trên đã giúp phần nào chúng ta hiểu được nguyên lý LSP như thế nào đúng ko ạ. Vậy thì giải quyết vấn đề còn trong ví dụ 1 bên trên thì chúng ta sẽ chuyển đổi như thế nào để tuân thủ nguyên lý LSP.
Chúng ta sẽ tạo 1 class cha của class Rectangle và Square và có phương thức kế thừa là calculate_area:
```ruby
class Shape
  def calculate_area
    raise NotImplementedError
  end
end

def Rectangle < Shape
  attr_accessor :height, :width
  
  def calculate_area
    height * width
  end
end

def Square < Shape
  attr_accessor :side_length
  
  def calculate_area
    side_length * side_length
  end
end
```

# Những vi phạm về nguyên lý LSP
Chúng ta có thể quan sát một số tín hiệu điển hình có thể chỉ ra rằng LSP đã bị vi phạm:
* Các lớp dẫn xuất có các phương thức ghi đè phương thức của lớp cha nhưng với chức năng hoàn toàn khác
* Các lớp dẫn xuất có phương thức ghi đè phương thức của lớp cha là 1 phương thức rỗng
* Các phương thức bắt buộc kế thừa từ lớp cha ở lớp dẫn xuất nhưng không được sử dụng
* Phát sinh ngoại lệ trong phương thức của lớp dẫn xuất

# Tổng kết
Nguyên lý này là một phần trong SOLID principles, giúp chúng ta có thể sử dụng kế thừa một cách triệt để, dễ hiểu và tránh xảy ra nhưng hiểu lầm trong chính code của mình. Hãy cố gắng đưa ra được những quyết đinh, nhưng phân tính theo nguyên lý này để giúp code của chúng ta khoa học hơn nhé!

Tài liệu tham khảo: https://www.netguru.co/codestories/solid-principles-3-lsp