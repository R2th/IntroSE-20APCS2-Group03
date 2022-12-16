## Giới thiệu
Như chúng ta đã biết trong Java kế thừa là một giải pháp phổ biến cho khả năng tái sử dụng code. Việc một lớp được mở rộng từ một lớp khác sẽ cho lớp con kế thừa được các thành phần đã triển khai như thuộc tính hay các phương thức. Tuy nhiên với **Delegation pattern** hay còn được gọi là kiểu thiết kế **uỷ quyền** là một giải pháp thay thế cho sự kế thừa. Delegation pattern sử dụng thành phần đối tượng để đạt được khả năng tái sử dụng code. Kotlin cung cấp hỗ trợ gốc cho pattern này trong đó một lớp có thể uỷ quyền việc triển khai cho một đối tượng được chỉ định. Trong bài này chúng ta sẽ tìm hiểu về mô hình Delegation này xem nó hoạt động như thế nào.

# 1. Tổng quan

* Chúng ta có một interface **Mode** với chức năng là **display()** và một thuộc tính **color: String**
* Và chúng ta có hai lớp thực thi interface **Mode** này là **DarkMode** và **LightMode**.
![](https://images.viblo.asia/e4e42e79-d00c-4c24-9335-94872115a186.png)

```kotlin
interface Mode{
    val color:String
    fun display()
}

class DarkMode(override val color:String) : Mode{    
    override fun display(){
        println("Displayig dark mode...")
    }
}
class LightMode(override val color:String) : Mode {
    override fun display() { 
        println("Displayig light mode...") 
    }
}
```

Ý định của chúng ta là muốn tạo ra thêm một lớp tuỳ chỉnh khác để sử dụng phương thức **display()** ta sẽ có các cách sau đây :
* Tạo thêm các lớp bằng cách sử dụng kế thừa.
* Uỷ quyền việc triển khai bằng Delegation pattern.

# **2. Mở rộng lớp sử dụng kế thừa**
* Kế thừa cho phép các lớp con sử dụng lại các phương thức triển khai trong lớp cha **DarkMode** & **LightMode**.
* Vì vậy, chúng tôi sẽ tạo hai lớp con mới **MyCustomDarkMode** & **MyCustomLightMode**, mỗi lớp được mở rộng từ một trong các lớp được triển khai interface Mode.

![](https://images.viblo.asia/e8577495-d077-4a8f-a11d-aeb4d3711c12.png)

```kotlin
interface Mode{
    val color:String
    fun display()
}

open class DarkMode(override val color:String) : Mode{    
    override fun display(){
        println("Dark Mode..."+color)
    }
}
open class LightMode(override val color:String) : Mode {
    override fun display() { 
        println("Light Mode..."+color) 
    }
}

class MyCustomDarkMode(override val color:String): DarkMode(color)
class MyCustomLightMode(override val color:String): LightMode(color)

fun main() {
    MyCustomDarkMode("CUSTOM_DARK_BLUE").display() //output : Dark Mode...CUSTOM_DARK_GRAY
}
```

* Mỗi lớp tuỳ chỉnh mới có thể sử dụng lại được phương thức triển khai từ lớp cha của nó.
* Tuy nhiên, lưu ý rằng trong lớp cha của Kotlin nên là *open class* để có thể mở rộng.
* Ngoài ra, một hạn chế của kế thừa là chúng ta cần tạo một lớp tùy chỉnh riêng cho từng lớp cha vì lí do đó người ta sinh ra Delegation pattern để có thể tái sử dụng code hiệu quả.

# **3. Sử dụng Delegation pattern**
*“Delegation pattern là một mẫu thiết kế hướng đối tượng cho phép thành phần đối tượng đạt được việc tái sử dụng mã giống như kế thừa."*
* Sử dụng ủy quyền, chúng ta có thể đạt được khả năng tái sử dụng mã bằng cách sử dụng thành phần đối tượng.
* Chúng ta có thể tạo một lớp tùy chỉnh sử dụng lại hàm display () của mỗi lớp ban đầu.
* Lớp Mode tùy chỉnh sẽ thực hiện interface Mode cũng như lấy một tham số của interface Mode trong phương thức khởi tạo của nó.

![](https://images.viblo.asia/60c907e0-f95c-4d3f-8e65-e09dc1c01136.png)

```kotlin
interface Mode{
    val color:String
    fun display()
}

class DarkMode(override val color:String) : Mode{    
    override fun display(){
        println("Dark Mode..."+color)
    }
}
class LightMode(override val color:String) : Mode {
    override fun display() { 
        println("Light Mode..."+color) 
    }
}

class MyCustomMode(val mode: Mode): Mode{
    override val color:String = mode.color
    override fun display() { 
        mode.display()
    }
}

fun main() {
    MyCustomMode(DarkMode("CUSTOM_DARK_GRAY")).display()
    MyCustomMode(LightMode("CUSTOM_LIGHT_GRAY")).display()
}

/* output:
Dark Mode...CUSTOM_DARK_GRAY
Light Mode...CUSTOM_LIGHT_GRAY
*/
```

### Kotlin hỗ trợ cho Delegation pattern: 
* Kotlin cung cấp theo từ khóa ***by*** chỉ định đối tượng ủy quyền mà lớp tùy chỉnh của chúng ta sẽ ủy quyền.
* Đoạn mã trên có hiệu quả tương tự với từ khoá ***by***
```kotlin
class MyCustomMode(val mode: Mode): Mode by mode

fun main() {
    MyCustomMode(DarkMode("CUSTOM_DARK_GRAY")).display()
    MyCustomMode(LightMode("CUSTOM_LIGHT_GRAY")).display()
}

/* output:
Dark Mode...CUSTOM_DARK_GRAY
Light Mode...CUSTOM_LIGHT_GRAY
*/
```

# **4. Kết luận**

Với Delegation trong kotlin bạn có thể làm  cho việc tối ưu code trở nên dễ dàng hơn, tính tái sử dụng code cao, với những trường hợp đơn giản mình chỉ cần dùng với pattern này mà không cần thiết phải sử dụng đến tính kế thừa một cách dài dòng , như vậy là rất đáng để sử dụng phải không nào!

**Nguồn tham khảo**
https://kotlinlang.org/docs/delegation.html