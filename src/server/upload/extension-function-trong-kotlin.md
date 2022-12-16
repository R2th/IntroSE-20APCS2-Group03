Kotlin, tương tự như C # và Gosu, cung cấp khả năng mở rộng một class với function mới mà không phải kế thừa từ class hoặc sử dụng bất kỳ loại mẫu thiết kế nào như Decorator. Điều này được thực hiện thông qua các tuyên bố đặc biệt được gọi là *extensions*. Kotlin hỗ trợ các *extension functions* và *extension properties*.

Extension function trong Kotlin là function có thể được khai báo trong class/file hiện tại mà không sửa đổi các class tùy chỉnh xác định trước khác.
Để hiểu chi tiết, hãy để một ví dụ trong đó chúng ta có một class để kiểm tra xem **greaterthanTen**() đã cho có lớn hơn 10 hay không:
```java
class CheckNumber {

    fun greaterthanTen(x: Int): Boolean {
        return x > 10
    }

}
```
Nên, chúng ta sẽ gọi function này như thế này:
```java
fun main(args: Array<String>) {

    var x = 13

    var checkNumber = CheckNumber()
    println(checkNumber.greaterthanTen(x))

}
```
Và cuối cùng, output là : **true**

Nhưng nếu chúng ta muốn check number ít hơn 10 và cho ý định này trình bày, chúng ta sẽ tạo ra function kiểm tra number nhỏ hơn 10. Đối với điều này, chúng ta sẽ không sửa đổi class **CheckNumber** nhưng mình sẽ tạo function trong **Main.kt**, đây sẽ là một phần của **CheckNumber** như thế này:
```java
fun CheckNumber.lessthanten(x: Int): Boolean{
    return x<10
}
```
Và chúng ta sẽ gọi function này giống như này: 
```java
fun main(args: Array<String>) {

    var x = 9

    var checkNumber = CheckNumber()
    println(checkNumber.lessthanten(9))

}

fun CheckNumber.lessthanten(x: Int): Boolean{
    return x<10
}
```
Không có sự khác biệt, chúng ta đã gọi nó giống như chúng ta đã gọi function **greaterthanTen()**

Để làm cho khái niệm này rõ ràng hơn, chúng ta hãy lấy một ví dụ string concatenation (nối chuỗi) để thêm 3 string mà chúng ta biết ở đó không có function nào có sẵn trong Java/Kotlin, chúng ta có thể addcombine nhiều hơn 3 string, nên, để thực hiện điều này, chúng ta sẽ thêm function trong **Main.kt** mà không sửa đổi class String và đó sẽ là một phần trong class String:
```java
fun main(args: Array<String>) {

    var str1 = "I "
    var str2 = "love "
    var str3 = "kotlin"

    print(str1.add(str2, str3))
}

fun String.add(str2: String, str3: String): String {
    return this + str2 + str3
}
```
Và, cuối cùng, output là : **I love kotlin**

Vì thế, từ ví dụ bên trên, chúng ta đã quan sát thấy các function mới được add vào trong **Main.kt** hoạt động giống như function static bởi vì chúng ta đang gọi chúng bằng **Classname.fun_name**.
Những lợi ích chính của extention function là:
- Giảm lượng code.
- Code trở lên dễ hiể hơn và dễ dàng đọc hơn.
- Chúng ta có thể dễ dàng modify các khả năng của các class sẵn có.

Tôi hi vọng bạn sẽ thích bài viết này :)

Tài liệu tham khảo:

https://medium.com/mindorks/extension-function-in-kotlin-d52d1525550

https://kotlinlang.org/docs/reference/extensions.html