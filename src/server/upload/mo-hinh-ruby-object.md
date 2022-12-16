- Bài viết được dịch từ bài [Ruby Object Model](https://medium.com/rubycademy/ruby-object-model-part-1-4d06fa486bec) của tác giả [Mehdi Farsi](https://medium.com/@farsi_mehdi).
-----

![](https://miro.medium.com/max/2560/1*BjFlAa52VRyPdrHkEtSwxw.jpeg)

-----
*Ruby là một ngôn ngữ lập trình hướng đối tượng hoàn toàn. Nhưng điều đó thực sự có ý nghĩa gì ?*

Trong loạt bài viết này, chúng ta sẽ cố gắng làm sáng tỏ Mô hình đối tượng Ruby để hiểu tư tưởng của ngôn ngữ hướng đối tượng.

---
### The Ancestor Chain (mô hình chuỗi tổ tiên)
Phương thức `ancestors` trả về một Mảng đại diện cho ancestor chain.
Ancestor chain là đại diện của hệ thống phân cấp class trong Ruby.
Theo thứ tự, nó chứa:
* calling class (Lớp gọi)
* included modules(các module được included)
* parent class (lớp cha)
* included modules of its parents class (các module được included vào lớp cha)
* parent class of its parent class (lớp cha của lớp cha)
* vân vân... tiếp tục như trên

Đây là một ví dụ về ancestor chain của lớp `Array`
```ruby
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
`Array::include_modules` trả về một mảng chứa tất cả các modules có trong toàn bộ *chuỗi tổ tiên*. Đây là lý do tại sao module Kernel được bao gồm trong 1 mảng cho `Array.included_modules`.

---
### Ancestor Chain và gọi phương thức 
Khi bạn gọi một phương thức bên trong đối tượng của mình, những gì Ruby làm là trước tiên kiểm tra xem phương thức này có tồn tại bên trong ngữ cảnh `self` không. Nếu nó không tìm thấy phưởng thức ở đó, nó sẽ tiếp tục *lên chuỗi tổ tiên* cho đến khi nó tìm thấy phương thức.
```ruby
class Tiger
  def to_s
    "roar"
  end
end
irb> Tiger.new.to_s
 => "roar" # calls the #to_s method defined in the Tiger class
irb> Tiger.inspect
 => "#<Tiger:0x007f>" # calls the #inspect method defined in Object
```
---
### Object class hierarchy (Hệ thống phân cấp lớp cho các loại đối tượng trong ruby)
`Object` là lớp gốc mặc định trong Ruby. Điều này có nghĩa là **bất kỳ lớp mới nào cũng kế thừa từ Object theo mặc định**!
```ruby
class Child
end
Child.superclass
 => Object
 ```
 Vậy, mục đích của class này là gì?
 Nếu chúng ta gọi phương thức `ancestors` trên `Object`, nó sẽ trả về **chuỗi tổ tiên của Object**:
 ```ruby
 irb> Object.ancestors
 => [Object, Kernel, BasicObject]
 ```
 
**BasicObject**
> Lớp **BasicObject là lớp cha trên cùng của tất cả các lớp**. Nó chứa các phương thức tối thiểu để *"tạo đối tượng và so sánh đối tượng"*.

**Kernel**
> Module **Kernel được included trong lớp Object**. Nó chứa tất cả logic* "thao tác đối tượng"*.
 
**Object**

Vì module Kernel chứa phần lớn các phương thức, `Object` được sử dụng nhiều hơn như một interface (với cái tên *"Object"* của nó) bởi tất cả các *con* của nó.

---
### The main object

> Khi một *chương trình* mới bắt đầu, Ruby sẽ tự động tạo `main` object là một instance của lớp `Object`. `main` chính là *ngữ cảnh cấp cao nhất* (top-level context) của bất kỳ chương trình nào.

Đây có lẽ là một cái *"gật đầu"* đồng thuận với logic của **ngôn ngữ C**. Vì hàm main() là điểm đầu vào của bất kỳ chương trình C nào và Matz(Yukihiro Matsumoto - nhà thiết kế chính của ngôn ngữ lập trình Ruby ) yêu thích C. Và tất nhiên, bản thân Ruby là ngôn ngữ lập trình bậc cao được viết bằng C (giống như mysql được viết bởi C và 1 ít C++).
```ruby
irb> self
 => main
irb> self.class
 => Object
 ```
**`main` là top-level scope của bất kỳ chương trình ruby nào.**
> *Điều này có nghĩa là bất kỳ lệnh nào ngoài phạm vi class hoặc module đều được thực thi trong ngữ cảnh `main`.*
```ruby
irb> puts "main context"
 => main context
 ```
 Ở đây, phương thức `puts` đề cập đến phương thức **private** `Kernel#puts`. Chúng ta có quyền truy cập vào phương thức này vì `main` là một instance của Object (Object lại included module Kernel).
 
 Bây giờ, chúng ta hãy thử truy cập rõ ràng vào phương thức `puts` thông qua `self` (tham chiếu đến `main` object instance).
 ```ruby
 irb> self.puts "main context"
NoMethodError: private method `puts' called for main:Object
```
gọi `self.puts` bị oẳng luôn vì một phương thức private không thể được [gọi với một receiver](https://medium.com/rubycademy/private-protected-a-matter-of-message-1a88b10acbf2) (trong trường hợp này là `self` đang đại diện(trỏ đến) **bên trong** 1 class nào đó, hoặc trong 1 đoạn code nào đó trong 1 file nào đó .... nói chung ko phải là top-level scope).

Thực tế, khi gọi `self.puts` thì ta lại thấy giống như gọi `main.puts`. Vì vậy, chúng ta sẽ cố gắng gọi `puts` ở **bên ngoài ngữ cảnh** class của nó.

Nói cách khác, chúng ta cố gắng gọi một phương thức private như một phương thức public.

---
### Phần kết luận
Ruby là một ngôn ngữ hướng đối tượng hoàn toàn bởi vì: ngay từ điểm khởi đầu chương trình - entry point (ngữ cảnh `main`) cho đến cuối chương trình của bạn, ít nhất bạn sẽ được xác định phạm vi trong đối tượng chính.

p/s: Nếu bạn không biết rằng module là một instance của lớp Class, được lưu trữ trong một hằng số và không thể khởi tạo các instance của chúng (module) thì có thể bạn sẽ học được điều gì đó từ bài viết [module trong ruby](https://medium.com/rubycademy/modules-in-ruby-part-ii-41466945e810) :)