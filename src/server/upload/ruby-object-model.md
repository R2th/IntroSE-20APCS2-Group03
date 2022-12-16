Ruby là một ngôn ngữ lập trình hướng đối tượng hoàn toàn. Nhưng điều đó thực sự có ý nghĩa gì ?
Trong bài viết này chúng ta sẽ tìm hiểu về nó nhé !!!
## Ancestor Chain
Ancestor Chain trả về một mảng chuổi tổ tiên.
Chuỗi tổ tiên là đại diện của class hierarchy.
Theo thứ tự, Nó bao gồm :
1. Lớp gọi điện
2. Các module được include vào nó
3. Các class cha của nó.
4. Các module được include vào class cha của nó
5. class cha của class cha của nó.
6. ..v.v..
Dưới đây là một ví dụ về ancestors chain của class Array
```
irb> Array.ancestors                   # Array's ancestor chain
 => [Array, Enumerable, Object, Kernel, BasicObject]
irb> Array.included_modules            # Array included modules
 => [Enumerable, Kernel]
irb> Array.superclass                  # the parent class
 => Object
irb> Array.superclass.included_modules # parent's included modules
 => [Kernel]
irb> Array.superclass.superclass       # the grandparent class
 => BasicObject
```

Array :: include_modules trả về một mảng chứa tất cả các mô-đun có trong ancestors chain.

Ancestor Chain và cách gọi method
Khi gọi một method từ một object. Đầu tiên, nó sẽ tìm trong class khởi tạo nên object đó và tiếp đến là class cha của class đó cứ như vậy cho đến khi tìm thấy method đó.

Ví dụ :
```
class Tiger
  def to_s
    "roar"
  end
end
irb> Tiger.new.to_s
 => "roar" # gọi phương thức to_s trong class Tiger
irb> Tiger.inspect
 => "#<Tiger:0x007f>" # gọi phương thức #inspect trong class Object
```
### class Object
Object là lớp gốc mặc định trong ruby. điều đó cúa nghĩa là mặc định tất cả các class được đinh nghĩa mới đều kế thừa từ class Object.

class Person
end

Person.superclass
 => Object

Nếu gọi ancestors từ class Object thì sẽ có kết quả như sau:
```
irb> Object.ancestors
 => [Object, Kernel, BasicObject]
```

### BasicObject
Lớp BasicObject là lớp cha trên cùng của tất cả các lớp. Nó chứa tối thiểu các phương thức để tạo đối tượng và so sánh đối tượng.

### Kernel
Module Kernel được include trong class Object, Nó chứa tất cả logic "thao tác đối tượng". 

### Object
Vì module nhân chứa  phần lớn các phương thức, nên đối tượng được sử dụng nhiều hơn như một interface bởi các con của nó.

### The main object
Khi một chương trình mới bắt đầu Ruby tự đọng tạo một main object nó là một instance của class Object. main là ngữ cảnh cấp cao nhất của bất kỳ chương trình nào.
Đây có lẽ là một điểm nhấn đối với ngôn ngữ C (vì hàm main () là điểm đầu vào của bất kỳ chương trình C nào).
```
irb> self
 => main
irb> self.class
 => Object
```
main là phạm vi cấp cao nhất của bất kỳ chương trình ruby nào. Điều này có nghĩa là bất kỳ lệnh nào ngoài phạm vi class / module đều được thực thi trong context main.
## THAM KHẢO
https://medium.com/rubycademy/ruby-object-model-part-1-4d06fa486bec