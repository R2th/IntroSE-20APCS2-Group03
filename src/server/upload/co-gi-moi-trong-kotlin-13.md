Kotlin 1.3 đã được phát hành với một số sự nâng cấp và tính năng mới. Hãy xem những gì mà kotlin 1.3 mang đến cho chúng ta.
# Coroutines release.
Sau một thời gian thử nghiệm, couroutine đã được phát hành. Điều này có nghĩa là từ phiên bản kotlin 1.3 coroutine sẽ được hỗ trợ và API ổn định. 
####
Couroutine cung cấp một mô hình mạnh mẽ để thiết kế không đồng bộ, không blocking programs. Bản chất của các couroutine là các lightweight threads cho phép lập trình không đồng bộ (non-blocking).
####
Couroutine API đã xuất hiện trong Kotlin 1.1 và sau đó được thử nghiệm.  Tuy nhiên, JeBrains cuối cùng cũng đã phát hành couroutines API và từ phiên bản 1.3 nó sẽ vẫn ổn định cùng với các chứng năng khác được release. Về cơ bản, điều đó có nghĩa là API sẽ không thay đổi trong tương lại và có thể sử dụng trong phát triền ứng dụng. 
####
Bạn có thể xem thêm về couroutine ở  [đây](https://kotlinlang.org/docs/reference/coroutines-overview.html)

# Contracts
Kotlin 1.3 thử nghiệm một feature gọi là *contracts*. Một trong những tính năng đáng ý là nơi contracts được sử dụng là Kotlin's smart cast.

Xem đoạn code dưới đây:
```kotlin
fun foo(s: String?) {
    if (s != null) s.length
}
```

Ở đây compiler tự động casts s thành string. Tuy nhiên, khi thực hiện việc này ngoài phạm vi của funtion:

```kotlin
fun String?.isNotNull(): Boolean = this != null
fun foo(s: String?) {
    if (s.isNotNull()) s.length // No smartcast :(
}
```

Contracts cho phép miêu tả hành vi của các funtions sẽ được compiler hiểu. Nghe ngầu phết nhỉ.

Kotlin stdlib đã sử dụng contracts và quan trong hơn, nó ổn định. Xem đoạn code dưới dây:
```kotlin
fun bar(x: String?) {
    if (!x.isNullOrEmpty()) {
        println("length of '$x' is ${x.length}") // Smartcast to not-null!
    }
}
```

```isNullOrEmpty``` là một phần của stdlib và đã áp dụng contract trong funtion:
```kotlin
public inline fun CharSequence?.isNullOrEmpty(): Boolean {
    contract {
        returns(false) implies (this@isNullOrEmpty != null)
    }
return this == null || this.length == 0
}
```

Có thể khai báo custom contracts cho các funtion riêng của bạn nhưng hãy nhớ rằng chức năng này đang đươc
**thử nghiệm**. Ngoài ra, Kotlin compiler hiện tại chưa xác minh contract và bạn phải có trách nhiệm viết đúng contracts. Bạn có thể  tham khảo thêm về contract ở [đây](https://github.com/Kotlin/KEEP/blob/master/proposals/kotlin-contracts.md)

# Capturing when subject in a variable
Từ Kolin 1.3 bạn có thể giữ đối tượng của when trong một variable và làm điều gì đó như thế này:
```kotlin
when (val statusCode = request.statusCode) {
    in 200..204 -> println("Response code is success: $statusCode")
    in 400..451 -> println("Client error response: $statusCode")
    else -> println("Unknown HTTP status code")
}
```

Chú ý rằng phạm vi của biến được giới hạn trong phần thân của when.

Đây có thể chỉ là một chức năng nhỏ, nhưng nó có thể tiết kiệm cho bạn một vài khai báo không cần thiết và hạn chế phạm vi của biến nếu cần.
# Annotaion classes can have nested declaration
Trước đây, annotation classes trong Kotlin không thể chứa nested declaration. Kể từ Kotlin 1.3, nested classes, interface, object và companion object đã được hỗ trợ. Đây là một tính năng tuyệt vời vì cuối cùng chúng ta cũng có thể đặt một vài logic bên trong annotation classes như thế này:
```kotlin
annotation class Foo {
    enum class Direction { UP, DOWN, LEFT, RIGHT }
    
    annotation class Bar
companion object {
        fun foo(): Int = 42
        val bar: Int = 42
    }
}
```

# Main without parameter.
Kotlin 1.3 giới thiệu một dạng đơn giản của hàm main mà ở đó không có giá trị truyền vào. Nhiều ứng dụng không sử dụng tham số truyền vào từ main do đó bạn có thể tiết kiệm cho mình một vòi động tác gõ phím.

```kotlin
fun main() {
    println("Hello, world!")
}
```

# Inline classes
Một tính năng thú vị khác là inline classes, trong nhiều trường hợp bạn nên tối ưu hóa hiệu năng của ứng dụng của bạn.

Nếu bạn khai báo class của bạn ở dạng inline class, về cơ bản nó là một phiên bản giới hạn của class thông thường. Kotlin compiler sẽ cố gắng optimize runtime representation của class và thay thế thể hiện của nó bằng ...
```kotlin
inline class Name(val name: String)
fun main() {
    val name = Name("Kotlin")
    println(name.s) 
}
```
Ở đây không có contructor hoạt động khi một thể hiện của Name được tạo, và tại thời điểm runtime name chứa chỉ chuỗi  "Kotlin".
# Improvement to stdlib
Có một vài nâng cấp đáng chú cho stdlib. Trong giới hạn bài viết này tôi không thể nêu chi tiết về chúng được. Bạn có thể xem ở [đây](https://kotlinlang.org/docs/reference/whatsnew13.html#standard-library) để biết thêm thông tin
# Tooling updates
### Code style hỗ trợ chính thức trong IDE
Cuối cùng kotlin cũng có một code style được hỗ trợ sẵn trong IDE.  Điều đó có nghĩa là bạn có thể follow theo code style này mà không cần vào cài đặt và thay đổi nó một cách thủ công, hoặc sử dụng một số cách cỉa bên thứ 3. Code style đã có sẵn trong phần cài đặt của IDE và việc chuyển qua Kotlin Coding Conventions code style có thể được thực hiện trong `Settings → Editor → Code Style → Kotlin` dialog. Bạn có thể tham khảo [code style mogration guide](https://kotlinlang.org/docs/reference/code-style-migration-guide.html) để biết thêm thông tin.

### Hỗ trợ Scratches
Từ Kotlin 1.3 bạn có thể chạy Kotlin *scratch files* (script file với một phần mở rộng .kts) có thể chạy trực tiếp trong IDE.
# Kết
Đây chỉ là một số tính năng nổi bật trong Kotlin 1.3, tôi chỉ đưa ra một số sự thay đổi nổi bật trong bản release lần này.

Để biết toàn bộ sự thay đổi có thể tham khảo trang chính thức của Kotlin ở [đây](https://kotlinlang.org/docs/reference/whatsnew13.html)

Cảm ơn các bạn đã theo dõi bài viết.

# Tham khảo
https://kotlinlang.org/docs/reference/whatsnew13.html

https://medium.com/@sergio.igwt/kotlin-1-3-is-near-heres-what-s-coming-2d83a4f1eccb