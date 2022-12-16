Trong bài này mình sẽ giới thiệu lại sự tiện lợi và tại sao phải dùng SAM interface. 
[<img src="http://i.ytimg.com/vi/pCzVZuz1VEo/hqdefault.jpg">](https://youtu.be/pCzVZuz1VEo) 
## Functional (SAM) interface (Kotlin 1.4)
Để chạy được Kotlin 1.4 chúng ta cần cài đặt IntelliJ IDEA 2020.1+ hoặc Android Studio 4.1+
Vậy SAM interface là gì? Đây là một khái niệm mới của Kotlin có từ phiên bản 1.4 vừa được release vào ngày 17/8/2020.
SAM được viết tắt từ Single Abstract Method
SAM interface tức là một interface với một một hàm abstract duy nhất. SAM interface có thể có nhiều hàm đã được hiện thực và duy nhất một hàm abstract
```
Ví dụ về SAM interface
fun interface Sam {
    fun doSomething()
}
```
Sam interface được khai báo với từ khoá fun ở trước interface.
Nếu Ịntellij của bạn chỉ hỗ trợ Kotlin 1.3 thì bạn cần phải upgrade lên phiên bản mới để hỗ trợ SAM interface.
Trước khi upgrade:
![Image](https://miro.medium.com/max/1400/0*qljcfM6_tNr4Nd4R)
Vào Preference > Language & Frameworks > Kotlin > Early Access Preview 1.4.x
Sau khi Upgrade:
![Image](https://miro.medium.com/max/1400/0*gUxuOLrvgdj4rPAj)
## Sự chuyển biến của SAM (SAM conversions)
Với các hàm interface, bạn có thể dùng SAM conventions sẽ giúp code của bạn rõ ràng và dễ đọc hơn nếu dùng biểu thức lambda (đây là một thuật ngữ được gọi về sự rút gọn trong hàm, có thể bạn đã biết trong lập trình Java nhưng nếu chưa biết thì có thể hiểu về nó trong những bài học sau của loạt bài giảng này)
Thay vì phải tạo một lớp để hiện thực SAM interface, chúng ta có thể dùng biểu thức lambda. Với sự chuyển biến của SAM,
Với SAM interface ở trên nếu không dùng SAM conversions thì bạn cần phải hiện thực như sau:
```
val sam = object : Sam {
    override fun doSomething() {
        println("hello")
    }
}

fun main() {
    sam.doSomething()
}
```
Kết quả sẽ cho dòng chữ hello
Với sự tiện lợi của sự chuyển đổi của SAM, phần code trên có thể được viết lại như sau.
Bạn cũng có thể dùng SAM với Java interfaces sẽ được giới thiệu ở phần Kotlin với Java.
## So sánh SAM interface với type aliases (sẽ được biết đến phần Type Alias)
Chúng có những mục đích khác nhau. Type aliases chỉ là cách đặt tên cho một kiểu dữ liệu đã được tồn tại. Trong khi SAM interfaces là tạo ra một loại dữ liệu mới.
`typealias SetInt = Set<Int>`
Type aliases chỉ có có một thành viên, trong khi SAM interfaces có thể có nhiều hàm đã hiện thực và một hàm trừu tượng. SAM interfaces có thể kế thừa và mở rộng từ interface khác.
```
interface ABC {
    fun a()
}
fun interface Sam : ABC {
    fun doSomething()
    override fun a() {
    }
}
```
Từ những điều trên, SAM interface là uyển chuyển và cung cấp nhiều tiện lợi hơn type aliases.

Nguồn: https://bit.ly/325BZO1