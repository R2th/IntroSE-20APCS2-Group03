Chào mọi người, tiếp tục với seri kotlin, trong bài viết này chúng ta sẽ cùng tìm hiểu 3 loại class trong kotlin là Nested Class, Inner Class, Enum Class, mỗi class có một chức năng riêng để sử dụng trong các bối cảnh cần thiết, cùng bắt đầu thôi!.
### I. Nested Class 
- Trong phần này chúng ta sẽ có 2 khái niệm là Nested class và Outer class 
- Nested class được định nghĩa là một class được khởi tạo bên trong một class khác, vì vậy các thành phần data và funtion của Nested class có thể được truy cập mà không cần khởi tạo một object class.  
- Outer class là class chứa Nested class bên trong nó, và Nested class thì không thể truy cập được thành phần data của Outer class. 
- Có thể hình dung khái niệm môt cách đơn giản theo ví dụ:
```
Ex:
class outerClass{  
   //outer class code  
       class nestedClass{  
           //nested class code  
       }  
}  
``` 
- Khá là đơn giải phải không các bạn, cùng tìm hiểu cách sử dụng qua ví dụ dưới:
```
Ex: 
class outerClass {
   private var name: String = "Ashu"
   class nestedClass {
       var description: String = "code inside nested class"
       private var id: Int = 101
       fun foo() {
           //  print("name is ${name}") // cannot access the outer class member (1)
           println("Id is ${id}")
       }
   }
}

fun main() {
// nested class must be initialize (2)
   println(outerClass.nestedClass().description) // accessing property (3)
   val obj = outerClass.nestedClass() // object creation (4)
   obj.foo() // access member function (5)
}
```
Theo như comment (1,2,3,4,5) ở đoạn code trên có thể thấy được các đặc điểm chính của Nested class.

Vậy chúng ta sẽ sử dụng nó khi nào:

- Trong một số trường hợp khi các bạn muốn tạo một class có các thuộc tính và phương thức riêng, 
nhưng có liên hệ mật thiết với một Outer class khác(không phải là kết thừa), và chỉ muốn Outer class chứa nó sử dụng, 
để có thể thoải mái truy cập các thành phần trong nó mà không cần phải khởi tạo object. 
- Tuy nhiên mình vẫn khuyến khích các bạn tạo ra các class riêng trừ một số case đặc biệt.
### II. Inner Class 
- Inner class cũng là một class được khởi tạo bên trong một class khác nhưng có thêm từ khóa inner
- Inner class giữ một tham chiếu đến một đối tượng của Outer class, để có thể truy cập vào các thành phần của Outer class ngay cả khi nó là private. (Đây là ưu điểm của Inner class so với Nested class)
- Inner class không thể được khai báo bên trong các Interface hoặc các non-inner nested class (các class lồng nhau mà không phải là Inner class).
```
Ex:	
class Outer {
   private val bar: Int = 1
   inner class Inner {
       fun foo() = bar
   }
}

fun main(){
   val demo = Outer().Inner().foo()
   println(demo) // 1
}
```
Theo như ví dụ trên thì chúng ta có thể hình dung cách hoạt động của Inner class, vậy khi nào thì sử dụng Inner class?

Dựa trên khái niệm thì cũng ta cũng có biết được, nó sẽ được sử dụng với mục đích giống Nested class nhưng ngoài ra có thêm option là khi chúng ta muốn truy cập đến các thành phần của Outer class từ Inner class.

### III. Enum Class 
- Enum class là một kiểu dữ liệu (data type) bao gồm một tập các giá trị được đặt tên. 
- Mỗi hằng số enum là một object, được phân cách nhau bởi dấu phẩy.
- Mọi hằng số enum đều có các thuộc tính để lấy tên và vị trí của nó trong khai báo lớp enum, đó là:
```
val name: String
val ordinal: Int
```
```
Ex:	
enum class Direction {
   NORTH, SOUTH, WEST, EAST
}
```
- Kiểu enum cũng có thể có constuctor(hàm khởi tạo) của nó và có thể có dữ liệu tùy chỉnh được liên kết với mỗi hằng số enum
```
Ex: enum class Color(val r: Int,val g: Int, val b:Int){
   RED(255, 0, 0),
   ORANGE(255, 165, 0),
   BLUE(0, 0, 255),
}
fun main(){
   val color = Color.BLUE
   println("value of color BLUE: r = ${color.r}, g = ${color.g}, b = ${color.b}")
} 
// output: value of color BLUE: r = 0, g = 0, b = 255
```
- Enum với Anonymous class: Hằng số Enum cũng có thể khai báo các class ẩn danh của riêng chúng với các phương thức tương ứng của chúng, cũng như override các phương thức cơ sở.
```
Ex: 
enum class ProtocolState {
   WAITING {
       override fun signal() = TALKING
   },
   TALKING {
       override fun signal() = WAITING
   };   							// separate other member definitions with a semicolon.
   abstract fun signal(): ProtocolState
}
// Use  
println(ProtocolState.WAITING.signal()) // TALKING
println(ProtocolState.TALKING.signal()) // WAITING 
```
-  Implementing Interfaces: Một enum class có thể implement một hoặc nhiều interface, cung cấp triển khai một thành viên interface duy nhất cho tất cả các entry hoặc phân tách cho mỗi entry trong lớp ẩn danh của nó.
```
Ex:	
interface TestImplement {
   fun test(a: Int): Int
}

interface TestImplement2 {
   fun test2(b: Int): Int
}

enum class IPL : TestImplement, TestImplement2 {
   T1 {override fun test(a: Int) = a * a } ,
   T2 {override fun test(a: Int) = a * a} ;
   override fun test2(b: Int) = b * b
}
// Use
val ipl = IPL.T1
println(ipl.test(2))   		// 4 
val ipl2 = IPL.T2
println(ipl2.test2(4))		// 16 
``` 
- Kể từ Kotlin 1.1, có thể truy cập các hằng số trong một lớp enum bằng generic,
bằng cách sử dụng các hàm enumValues <T> () và enumValueOf <T> ():
```
Ex:	 
enum class Direction {NORTH, SOUTH, WEST, EAST }
// Parse string into enum
val selectedDirection = Direction.valueOf("NORTH")
println(selectedDirection == Direction.NORTH)
// Kotlin helper method
val selectedDirection2 = enumValueOf<Direction>("NORTH")
println(selectedDirection2 == Direction.NORTH)
// Display all values in Direction enum
for(direction in Direction.values()){
   println("name: ${direction.name}, ordinal: ${direction.ordinal}")}
// Kotlin helper method
for(direction in enumValues<Direction>()){
   println("name: ${direction.name}, ordinal: ${direction.ordinal}")}
    
 Output: 
// true 
// true  
// name: NORTH, ordinal: 0
// name: SOUTH, ordinal: 1
// name: WEST, ordinal: 2
// name: EAST, ordinal: 3
// name: NORTH, ordinal: 0
// name: SOUTH, ordinal: 1
// name: WEST, ordinal: 2
// name: EAST, ordinal: 3   
```
### IV. Conclusion 
Như vậy chúng ta đã tìm hiểu được Nested class, Inner class & Enum class trong kotlin là gì và khi nào thì sử dụng chúng, hy vọng bài viết hữu ích với các bạn, để có thể áp dụng vào các dự án của riêng mình.
    
Bài viết có tham khảo nguồn từ [Kotlin Docs](https://kotlinlang.org/)
    
Cảm ơn vì đã đọc, xin chào tạm biệt và hẹn gặp lại trong các bài viết tiếp theo.