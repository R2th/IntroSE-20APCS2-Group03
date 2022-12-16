Chào mọi người, tiếp tục với seri Kotlin, trong bài viết này chúng ta sẽ tìm hiểu Inline class - loại class mà bạn có thể sẽ bắt gặp thường xuyên. Cùng tìm hiểu nó là gì, cách hoạt động và những tính năng hữu ích mà nó có thể mang lại, bắt đầu thôi! 
### I. Inline class 
- Các Inline class (lớp nội tuyến) đã có sẵn kể từ Kotlin 1.3 với experimental versions, cho đến Kotlin 1.5 thì chúng ta đã có stable versions với rất nhiều thay đổi.
- Các Inline class được định nghĩa là subset (tập con) của các [value-based class](https://github.com/Kotlin/KEEP/blob/master/notes/value-classes.md), chỉ được dùng để lưu giữ giá trị.
- Đặc điểm: các Inline class cung cấp cho chúng ta một cách để wrap một type (bọc một kiểu), do đó ta có thể thêm function và tự tạo một type mới.
- Trái ngược với các wrapper (trình bao bọc) thông thường (non-inlined), chúng ta sẽ được hưởng lợi từ việc cải thiện performance (hiệu suất) - đây là một ưu điểm rất lớn mà Inline class đem lại.
- Sau khi đi qua khái niệm, chúng ta sẽ cùng đi sâu vào tìm hiểu thông qua các ví dụ bên dưới

**1. Use:**

Ex: 
```
@JvmInline
value class InlineCircleRadius(val doubleValue : Double)
   val circleRadius = InlineCircleRadius(5.5)
Run time for the JVM, code is actually just:
   val circleRadius = 5.5
```
Ở ví dụ trên, ta có một inline class là *InlineCircleRadius* wrap một biến *doubleValue* có type là Double, để khai báo ta dùng từ khóa **value** ở trước từ khóa class với anotation(chú thích) **@JvmInline** kèm theo cho mỗi Innner class.

**NOTE:** Ở Kotlin version 1.5, modifier **inline**  của Inline class đã bị depreacated để thay vào đó là modifier **value**. 

Khi chúng ta gán giá trị inline class này cho biến *circleRadius*, trong quá trình run time JVM thay vì sẽ khởi tạo instance class như bình thường thì sẽ chỉ thực hiện gán trực tiếp value cho biến *circleRadius* - điều này giúp chúng ta cải thiện performance rất nhiều. 

**2. Members**:

Các inline class hỗ trợ một số chức năng của các class thông thường. Đặc biệt, chúng được phép khai báo các properties và function, từ Kotlin version 1.5 đã cho phép có thêm block init.

Ex: 
```
@JvmInline
value class Name(val s: String) {
    init {
        require(s.length > 0) { }
    }

    val length: Int
        get() = s.length

    fun greet() {
        println("Hello, $s")
    }
}

fun main() {
    val name = Name("Kotlin")
    name.greet() // method `greet` is called as a static method
    println(name.length) // property getter is called as a static method
}
```
Ở ví dụ trên, ta có thể thấy thêm được, các properties getter và funtion của Inline class có thể được called như một static method. 

Inline class properties không thể có backing fields. Chúng chỉ có thể có simple computable properties (các thuộc tính tính toán đơn giản) (Không có lateinit /delegated properties).

**3. Advantages:** 

Ex:
```
data class Radius(val circle: CircleRadius, val rectangle: RectangleRadius)
@JvmInline
value class CircleRadius(val doubleValue : Double)
```
Ở ví dụ trên, inline class CircleRadius có hai phần: 
- Biến giá trị cơ bản: circle
- Kiểu dữ liệu của biến cơ bản: Double

Ưu điểm của Inline class có hai phần :
- Trong Run Time không bao giờ nhìn thấy được tất cả các Inline class, điều nó chỉ thấy là giá trị cơ bản: circle
- Người ta có thể dễ dàng xác định loại dữ liệu bằng tên mô tả của Inline class và không phải lo lắng về việc vô tình đặt sai giá trị.

**4. Inheritance:**
Inline classes chỉ được phép kế thừa từ các interfaces:

Ex: 
```
interface Drawable {
   fun draw()
}
@JvmInline
value class CircleRadius(private val circleRadius : Double) : Drawable {
   val diameterOfCircle get() = 2 * circleRadius
   fun areaOfCircle() = 3.14 * circleRadius * circleRadius

   override fun draw() {
       println("Draw my circle")
   }
}

fun main() {
    val circle = CircleRadius(10.0)
    println(circle.draw()) 
    println(circle.diameterOfCircle) 
    println(circle.areaOfCircle()) 
}
```

**5. Mangling:** 

Vì các Inline classes được biên dịch theo kiểu cơ bản của chúng, nó có thể dẫn đến các obscure errors (các lỗi khó hiểu) khác nhau, EX: Unexpected platform signature clashes error sẽ xảy ra trong trường hợp xung đột funtion bên dưới:
```
@JvmInline
value class UInt(val x: Int)

// Represented as 'public final void compute(int x)' on the JVM
fun compute(x: Int) { }

// Also represented as 'public final void compute(int x)' on the JVM!
fun compute(x: UInt) { }
```
Để giảm thiểu các vấn đề như vậy, các funtion sử dụng các Inline class được *xoa dịu* bằng cách thêm một stable hashcode vào tên function. Do đó, *fun compute(x: UInt)* sẽ được biểu diễn dưới dạng *public final void compute-<hashcode>(int x)* , điều này giải quyết vấn đề xung đột.


**6. Calling from Java code**:
Để có thể call các funtion chấp nhận Inline class trong Java code, chúng ta cần thêm anotation @JvmName trước khi khai báo funtion. 

Ex:
```
@JvmInline
value class UInt(val x: Int)

fun compute(x: Int) { }

// In Java code
@JvmName("computeUInt")
fun compute(x: UInt) { }

```
**7. Restrictions:** 
- Inline class yêu cầu cần phải chỉ định chính xác một property trong the primary constructor.
- Không thể wrap multiple values trong một inline class.
- Trong Inline class, các properties không thể có backing fields.
- Các Inline classe không thể extend các class khác và chúng phải là final.

### II. Conclusion
Như vậy là chúng ta đã tìm hiểu được Inline class, đặc điểm và các tính năng hữu ích mà nó mang lại bên cạnh một số hạn chế của nó, 

hy vọng các bạn có thể sử dụng được trong các bối cảnh phù hợp và áp dụng vào dự án của riêng mình.

Cảm ơn các bạn vì đã đọc, xin chào tạm biệt và hẹn gặp lại trong các bài viết tiếp theo.

Bài viết có tham khảo [Kotlin docs ](https://kotlinlang.org/docs/inline-classes.html)