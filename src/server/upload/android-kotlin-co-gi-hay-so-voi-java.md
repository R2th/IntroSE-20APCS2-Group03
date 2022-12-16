# Kotlin là gì ?
Đơn giản chỉ là ngôn ngữ lập trình thôi... Còn chuyện nó là ngôn ngữ mã nguồn mở, offical release năm 2016 bởi JetBrains hay là một ngôn ngữ kiểu tĩnh như Java, C/C++ hay hỗ trợ OOP như thế nào thì mình không đề cập ở bài viết này các bạn có thể tìm hiểu thêm [ở đây](https://developer.android.com/kotlin/overview) 😆.
> **A modern programming language that makes developers happier.**
# Kotlin dùng để làm gì ?
Thật sự thì Kotlin có thể dùng để làm rất nhiều thứ, bao gồm cả Server-side, Web Frontend, Multiplatform Mobile (Android & iOS).  Nhưng trong bài viết này mình chỉ chia sẻ thông tin dưới khía cạnh là người sử dụng Kotlin để lập trình Android.
![image.png](https://images.viblo.asia/c6e7cb56-2afe-4cbf-9921-4e9d25adde47.png)
Việc sử dụng Kotlin trong lập trình Android không còn xa lạ với mọi người lập trình viên ngày nay nữa, đến năm 2017, thông qua sự kiện Google I/O, Google chính thức thông báo sử dụng Kotlin làm ngôn ngữ chính và recommend người dùng sử dụng nó. Một số chia sẻ từ Google cho sự lựa chọn và mức độ hữu ích của ngôn ngữ này:
> We reviewed feedback that came directly from developers at conferences, our Customer Advisory Board (CAB), Google Developers Experts (GDE), and through our developer research. Many developers already enjoy using Kotlin, and the request for more Kotlin support was clear

Gần như toàn bộ Ứng dụng của Google đều chuyển sang sử dụng Kotlin và thay vì là Java như trước đó.
>  Today over 60 of Google's apps are built using Kotlin. This includes apps like Maps, Home, Play, Drive, and Messages

Cuối cùng hãy xem Kotlin có gì khác biệt mà lại được recommend bởi Google nhé.
# Kotlin và sự khác bọt
Kotlin được phát triển dựa trên Java, đa số người dùng Java chuyển sang dùng Kotlin sẽ có thời gian làm quen nhanh và cảm thấy có nhiều sự tiện lợi hơn. Một số điểm nổi bật có thể kể đến như:
## Null safety
Kotlin chia hệ thống kiểu gồm `nullable types` và `non-nullable types` điều này giảm thiểu tham chiếu rỗng (null references)
### Initialize
Ví dụ về khai báo `non-nullable`
```kotlin
var a: String = "abc" // Biến a khởi tạo kiểu String và giá trị là 'abc'
a = null // Phép gán a = null sẽ bị lỗi compile vì a là kiểu String non-nullable
```
Sửa một tí về cú pháp biến `a` đã có thể giữ giá trị `null`
```kotlin
var a: String? = "abc"
a = null // Phép gán a = null thành công vì a là kiểu String nullable
```
### Safe calls
Tiếp tục ví dụ trên khi `a` là `String nullable type` ta có thể gọi các lệnh của một String thông qua operator `?.` mà không lo `NullPointerException`
```kotlin
val a: String? = null
a?.length // Trả về giá trị null
```
Phép gọi thông qua operator `?.` sẽ trả về giá trị mong muốn (`a.length`) khi  `a != null` hoặc `null` trong trường hợp còn lại.
### Elvis operator
Khi bạn muốn thể hiện biểu thức `nếu x null thì thay x bằng một giá trị y nào đó không null`
Ví dụ bạn muốn tìm độ dài chuỗi của một xâu `s`:
```kotlin
val s: String ? = "abc"
...
var l: Int = 0
if (s != null) l = s.length
...
// Hoặc dùng if else
val l: Int = if (b != null) b.length else 0
```
Làm điều trên với  `elvis operator` (`?:`):
```kotlin
val l: Int = s?.length ?: 0
```
Ta nhận được kết quả tương đương chỉ với 1 dòng code 😆
### The !! operator
Với xâu `s: String?` ta có thể gọi trực tiếp `s.length` bằng cách sử dụng:
```kotlin
s!!.length // gây NullPointerException khi s null
```
## Extension function
Kotlin cho phép bạn có thể thêm một function bất kì vào class hay interface thông qua `extentions`
Ví dụ xây dựng hàm đổi chỗ 2 thành phần có trong list:
```kotlin
fun MutableList<Int>.swap(index1: Int, index2: Int) {
    val tmp = this[index1] // 'this' corresponds to the list
    this[index1] = this[index2]
    this[index2] = tmp
}
```
Sau đó bạn có thể gọi hàm này từ bất kì `MutableList` nào:
```kotlin
val list = mutableListOf(1, 2, 3)
list.swap(0, 2) // list sẽ có giá trị là [3, 2, 1]
```
## Data class
Với Java khi tạo class để biểu diễn cho thực thể, ví dụ:
```java
public class Intern {
  String name;
  public String role;
  private double salary;
  
  public Intern(String name, String role, double salary) {
    this.name = name;
    this.role = role;
    this.salary = salary;
  }

  public String getName() {
    return name;
  }

  public String getRole() {
    return role;
  }

  public Double getSalary() {
    return salary;
  }
}
```
Thay vì phải sử dụng 1 POJO class Java dài dòng như trên, Kotlin cung cấp `data class` với mục tiêu đơn giản dùng để chứa data:
```kotlin
data class Intern (
    var name: String,
    var role: String,
    var salary: Double,
)
```
## Sealed Class
Ngoài cách sử dụng `enum` giống như Java, Kotlin còn cung cấp thêm `sealed class` . Khác biệt chính của `sealed class` nằm ở việc bạn có thể tạo được nhiều instance của các subclass bên trong `sealed class` cha thay vì chỉ chứa đúng một instance đại diện cho mỗi constant như `enum` hay một cách nói khác thì `sealed class` là kết quả của việc kết hợp `abstract class` và `enum`.  Nhờ điều đó mà `sealed class` có thể chứa đựng được thêm thông tin của các instance. Hơi dài dòng 😵, ta cùng xem ví dụ nhé:
- Với `enum class` ta tạo được các constant để đại diện cho các hình vẽ:
```kotlin
enum class Shape(size: Int) {
    Shape(2), Shape(4), Size(6), Shape(8)
}
// Không thể tạo được Shape(8, 2) hay Shape("Square") trong cùng 1 enum
```
- Với `sealed class` ta cũng có thể đại diện cho các hình vẽ, thậm chí thêm các properties kích thước khác nhau:
```kotlin
sealed class Shape {
    class Circle(val radius: Float): Shape()
    class Square(val c: Int): Shape()
    class Rectangle(val length: Int, val breadth: Int): Shape()
}
```
Với kết quả của `sealed class` như trên, ta có thể dễ dàng truy xuất được thông tin và phiên biệt một `Shape` thông qua `when`
```kotlin
// shape là một Shape
when(shape) {
    is Circle -> println("Is a circle with r = ${shape.radius}")
    is Square -> println("Is a Square with c = ${shape.length}")
    is Rectangle -> println("Is a Rectangle with l = ${shape.length} and b = ${shape.breadth}")
}
```
## String template
Với Kotlin, ta có thể tạo một chuỗi có chứa biểu thức thông qua dấu `$`
```kotlin
val s = "abc"
println("$s.length is ${s.length}") // abc.length is 3 
```
## Collections, Sequences, Coroutines
Phần này hơi dài và rộng, mọi người tìm hiểu thêm ở đây nhé:
* [Colections](https://kotlinlang.org/docs/collections-overview.html)
* [Sequences](https://kotlinlang.org/docs/sequences.html)
* [Coroutines](https://kotlinlang.org/docs/coroutines-overview.html)
# Lời kết
Hi vọng bài viết có thể giúp các bạn thấy được một số sự nổi bật của Kotlin. Tuy nhiên nó chưa phải là tất cả, mọi người có thể tham khảo thêm ở [đây](https://kotlinlang.org/docs/comparison-to-java.html#what-kotlin-has-that-java-does-not).