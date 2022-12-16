Đối với lập trình Mobile, việc tối ưu bộ nhớ là việc rất quan trọng. Việc tối ưu bộ nhớ sẽ giúp ứng dụng của mình không lag, chậm, giúp người dùng có trải nghiệm tốt lúc dùng ứng dụng của mình.
Trong bài viết này, mình sẽ nêu một số khái niệm cơ bản mà mình biết về Quản lý bộ nhớ trong iOS. Hy vọng qua bài viết này sẽ giúp mọi người có cái nhìn tổng quan về chủ đề này.
# Stack và Heap
## Stack
* Phân bổ bộ nhớ theo ngăn xếp(LIFO). 
* Khi kết thúc hàm, các biến cục bộ lưu trữ ở stack được tự động giải phóng.
* Kích thước vùng nhớ stack là cố định.
* Thông thường Stack dùng để cấp phát bộ nhớ cho các func parameter hoặc local variables.
## Heap
* Heap được dùng cho việc cấp phát bộ nhớ động, kích thước vùng nhớ heap có thể tăng giảm nhờ cơ chế của Hệ điều hành.
* Khi nhắc tới Heap chúng ta hay liên tưởng đến việc cấp phát bộ nhớ cho các instance của class.
## Khi nào nên dùng Stack và Heap
* Khi biết chính xác lượng dữ liệu cần phân bổ khi biên dịch thì có thể dùng Stack
* Khi không biết chính xác lượng dữ liệu cần phân bổ khi biên dịch hoặc bạn cần phân bổ nhiều dữ liệu thì có thể dùng Heap. 

# Value Type và Reference Type
Trong Swift, kiểu dữ liệu được chia thành 2 loại là Value Type(Tham trị) và Reference Type(Tham chiếu).
## Value Type
Value Type: Khi sao chép một instance thì nó sẽ tạo ra một instance độc lập hoàn toàn. Việc thay đổi dữ liệu của instance này sẽ không ảnh hưởng tới instance khác.
```
// Value type example
struct S { var data: Int = -1 }
var a = S()
var b = a						// a is copied to b
a.data = 42						// Changes a, not b
println("\(a.data), \(b.data)")	// prints "42, -1"
```
## Reference Type
Reference type: Khi sao chép một instance thì cả 2 instance cùng tham chiếu tới một địa chỉ, việc thay đổi dữ liệu ở instance này sẽ ảnh hưởng tới dữ liệu của instance khác.
```
class C { var data: Int = -1 }
var x = C()
var y = x						// x is copied to y
x.data = 42						// changes the instance referred to by x (and y)
println("\(x.data), \(y.data)")
```
# ARC
Swift sử dụng ARC(Automatic Reference Counting) để quản lý việc sử dụng bộ nhớ. Khi tạo một instance của một class. ARC sẽ tự động cung cấp một vùng nhớ để lưu thông tin và dữ liệu của instance. Khi không còn sử dụng, ARC sẽ giải phóng vùng nhớ đó.
* Khi một instance được tạo, thì reference counting sẽ bằng 1. Reference counting này có thể tăng hoặc giảm trong vòng đời của nó. Cuối cùng, khi reference counting bằng 0, đối tượng được giải phóng khỏi bộ nhớ.
Trong một số trường hợp, các đối tượng chúng ta đã không còn sử dụng đến nữa, nhưng nó vẫn có reference đến nhau, do đó số reference counting khác 0, và lúc này chúng ta sẽ bị memory leaks.
# Retain Cycles
Trong Swift, khi một instance có một strong reference với một instance khác, nó sẽ giữ lại nó (retain).
Để hiểu rõ Retain Cycle mình có ví dụ sau: 
```
class A {
   var b: B? = nil
   
   init() {
      print("init A")
   } 
   deinit {
      print("deinit A")
   }
}
class B {
   var a: A? = nil
   
   init() {
      print("init B")
   }
   deinit {
      print("deinit B")
   }
}
var a = new A()
var b = new B()
a?.b = b
b?.a = a
```
Ta thấy instance của class A sẽ có reference tới instance của class B và ngược lại. 
Khi set: 
```
a = nil
b = nil
```
Ở đây hàm `deinit` sẽ không được gọi, bởi vì `b` đang có một strong reference tới `a` và ngược lại. Dẫn đến việc `a` và `b` đều không được giải phóng khỏi bộ nhớ.
> Ta gọi việc các instance của Class có strong reference lẫn nhau là retain cycle.

Vậy có cách nào để `a` và `b` sẽ được giải phóng khỏi bộ nhớ?
> Swift cung cấp hai cách để giải quyết các strong reference: weak reference và unowned reference. weak reference và unowned reference cho phép một instance tham chiếu đến instance khác mà không giữ strong reference trên nó.
* Weak: Một weak reference là khi một biến không sở hữu một đối tượng. Nó luôn được khai báo là optional vì nó có thể là `nil`. Khi instance được giải phóng, ARC sẽ tự động gán tham chiếu weak là `nil`. Cho nên, weak được khai báo với `var`
* Unowned: Unowned khá giống với weak khi nó có thể sử dụng để phá vỡ strong reference. Tuy nhiên, không giống như weak, Unowned luôn có một giá trị.
# Một số cách kiểm tra Memory leak
* Kiểm tra trong hàm deinit() khi ViewController bị đóng.
* Quan sát mức độ bộ nhớ tăng dần trên Xcode.
* Sử dụng tool Xcode Instruments
* Thông thường, các lập trình viên thường sử dụng `[weak self]` là một phương pháp tránh việc Memory leak, tuy nhiên không hẳn lúc nào cũng phải dùng nó, Ví dụ:
1. Khi dùng GCD, nếu không giữ lại nó để dùng sau này thì nó sẽ không gây ra reference cycles
2. Một closure không được lưu trữ vào một biến hay một closure khác, và trong closure đó không sử dụng đến `self`.