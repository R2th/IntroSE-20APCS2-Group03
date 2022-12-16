Bài viết này dành cho những ai đã từng sử dụng ngôn ngữ Kotlin - không dành cho người mới nha :D

Như mọi người thấy thì kể từ những ngày được công bố là ngôn ngữ phát triển ứng dụng Android chính thức, Kotlin đã phát hành nhiều bản cập nhật khác nhau, mục đích chính là thêm các chức năng mới, cung cấp các tùy chọn tốt cho các developer để phát triển ứng dụng một cách dễ dàng hơn. Vậy chúng ta sẽ cùng xem Kotlin đã thay đổi những gì trong phiên bản 1.5.0 và 1.5.20 nhé,  Ok bắt đầu thôi!

# 1. Kotlin 1.5.0
## 1.1 Language features
### 1.1.1 JVM records support
- Java đang phát triển nhanh chóng và để đảm bảo Kotlin vẫn tương thích với Java thì trong phiên bản này đã giới thiệu hỗ trợ cho một trong những tính năng mới nhất của java - [record classes](https://openjdk.java.net/jeps/395) (là một loại lớp đặc biệt có cú pháp ngắn gọn để xác định các lớp chỉ dữ liệu bất biến. Trình biên dịch Java sẽ tự động tạo các phương thức `getter()`, `toString()`, `hashcode()` và `equals()` cho các trường dữ liệu).
- Hỗ trợ của Kotlin cho các JVM record bao gồm khả năng tương tác hai chiều:

  - Trong Kotlin, bạn có thể sử dụng Java record classes giống như bạn sử dụng typical class với các properties.
  - Để sử dụng một class trong Kotlin làm record class trong Java, hãy đặt lớp đó thành `data` class và thêm anotation `@JvmRecord`.
      ```kotlin
      @JvmRecord
      data class User(val name: String, val age: Int)
### 1.1.2 Sealed interfaces
- Interface trong kotlin giờ đã có thêm `sealed` modifier, nó hoạt động tương tự với class, tất cả các implementations của sealed interface đều được biết tại compile time.
    ```kotlin
    sealed interface Polygon
- Vì là interface nên chúng ta có thể inherit nhiều hơn so với chỉ một class,  giúp tăng tính mở rộng của hệ thống.
### 1.1.3 Package-wide sealed class hierarchies
- Trước đây, tất cả các class con của sealed class phải xuất hiện trong cùng một file.
    ```kotlin
    sealed class MenuItem {
        class Hamburger(val toppings: List<Topping>) : MenuItem()
        class Soda(val size: Size) : MenuItem()
    }
    ```
- Giờ đây, sealed class (và cả sealed interfaces) có thể có các class con trong tất cả các file của cùng một module và cùng một package.
    ```kotlin
    // MenuItem.kt
    sealed class MenuItem

    // Food.kt
    class Hamburger(val toppings: List<Topping>) : MenuItem()

    // Drinks.kt
    class Soda(val size: Size) : MenuItem()
    ```
    Thay vì phải cho hết vào 1 file thì giờ bạn có thể tách ra thành nhiều lớp con khác nhau khiến mọi thứ trở nên clear hơn.
### 1.1.4 Inline classes
- Đã có từ version 1.3, cho đến Kotlin 1.5 thì chúng ta đã có stable versions.
- Inline classes là một tập hợp con của các [value-based class](https://github.com/Kotlin/KEEP/blob/master/notes/value-classes.md), chỉ dùng để lưu các giá trị. Bạn có thể sử dụng class này làm trình bao bọc cho một giá trị của một kiểu nhất định mà không cần thêm chi phí phát sinh từ việc sử dụng cấp phát bộ nhớ.
    ```kotlin
    @JvmInline
    value class Password(val s: String)
    ```
    Được khai báo thêm modifier `value` đằng trước tên của class và kèm theo anotation `@JvmInline` kèm theo.
    
    **NOTE**: Ở Kotlin 1.5, modifier `inline` của Inline class đã bị depreacated để thay vào đó là modifier `value`.
- Inline classes chỉ được phép kế thừa từ các interfaces, nó không thể kế thừa các class khác, bắt buộc phải là final.
- Khi chúng ta gán giá trị inline class, trong quá trình run time JVM thay vì sẽ khởi tạo instance thì sẽ gán trực tiếp giá trị đó - điều này giúp chúng ta cải thiện performance rất nhiều.
    ```kotlin
    val password = Password("123456")
    Run time for the JVM, code is actually just:
    val password = "123456"
    ```
    
## 2.1 Kotlin/JVM
### 2.1.1 Stable JVM IR backend
- [IR-based backend](https://kotlinlang.org/docs/whatsnew14.html#new-jvm-ir-backend): Sau khi chương trình được chạy, phía backend (bao gồm: Kotlin/JVM, Kotlin/JS và Kotlin/Native) sẽ tự tạo ra các file thực thi. Đối với Kotlin/Native, nó dựa trên một cấu trúc mới được xây dựng xung quanh một Internal Representation (IR) cho Kotlin code phục vụ một chức năng tương tự như bytecode trong máy ảo. Trong version này họ đưa Kotlin/JVM và Kotlin/JS sang cùng một IR, điều này giúp triển khai hầu hết các tính năng, tối ưu hóa và sửa lỗi chỉ cần thực hiện một lần cho tất cả các mục tiêu.
- IR-based backend cho trình biên dịch Kotlin/JVM từ Kotlin version 1.4.0 đã có sẵn để sử dụng và giờ nó đã ổn định hơn và được bật theo mặc định.
### 2.1.2 New default JVM target: 1.8
Target version mặc định cho Kotlin/JVM compilations là 1.8,  target version 1.6 đã bị deprecated.
### 2.1.3 SAM adapters, Lambdas via invokedynamic
Kotlin 1.5.0 sử dụng dynamic invocations là `invokedynamic` (nó sẽ generate code lúc runtime, điều này giúp cải thiện performance khi khởi động JVM) cho SAM (Single Abstract Method) và Lambdas.
### 2.1.4 Deprecation of `@JvmDefault` and old Xjvm-default modes
Trước Kotlin 1.4.0, đã có `@JvmDefault` anotation cùng với `-Xjvm-default=enable` và `-Xjvm-default=compatibility`. Chúng phục vụ để tạo phương thức mặc định JVM cho bất kỳ non-abstract member nào trong Kotlin interface. Giờ đây nó đã bị deprecated.
### 2.1.5 Improvements to handling nullability annotations
Ở phiên bản này Kotlin có 1 số cải tiến cho các tính năng như:

- Đọc các nullability annotations trên các tham số trong compiled Java libraries được sử dụng làm thành phần phụ thuộc.
- Hỗ trợ thêm nullability annotations với `TYPE_USE` như: arrays, varargs, fields, type arguments của các class và interface.
- Nếu nullability annotations có nhiều target mà 1 trong số đó có `TYPE_USE`, thì nó sẽ đc ưu tiên hơn.


    VD: `@Nullable String[] f()` sẽ trở thành `fun f(): Array<String?>!` Nếu `@Nullable` hỗ trợ cho cả `TYPE_USE` và `METHOD` (`TYPE_USE` là array sẽ được ưu tiên hơn là method).
    
## 3.1 Kotlin/Native
Kotlin/Native hiện hoạt động tốt hơn và ổn định hơn. Những thay đổi đáng chú ý như là:

- Cải tiến hiệu xuất giúp tăng tốc độ biên dịch và thực thi.
- Trình kiểm tra rò rỉ bộ nhớ Kotlin/Native đã bị tắt theo mặc định. Nó có thể gây ra các sự cố ứng dụng, nên đối với phiên bản này nó đã bị hủy.

## 4.1 Kotlin/JS
Như mình có nói ở trên, trong version này họ đưa Kotlin/JVM và Kotlin/JS sang cùng một IR. Đối với Kotlin/JVM nó đã ổn định nhưng còn [Kotlin/JS](https://kotlinlang.org/docs/whatsnew15.html#kotlin-js) thì vẫn đang cần phải cải tiến ở các bản cập nhật kế tiếp.
## 5.1 Kotlin Multiplatform
Trong Kotlin 1.5.0, việc lựa chọn [testing dependency cho từng nền tảng](https://kotlinlang.org/docs/whatsnew15.html#simplified-test-dependencies-usage-in-multiplatform-projects) đã được đơn giản hóa và hiện nó được thực hiện tự động bởi plugin Gradle.
## 6.1 Standard library
Các thư viện có một loạt các thay đổi và cải tiến, bổ sung các tính năng mới trong phiên bản này.
### 6.1.1 Stable unsigned integer types
Các kiểu [unsigned integer](https://kotlinlang.org/docs/basic-types.html#unsigned-integers) như: `UInt`, `ULong`, `UByte`, `UShort` đã được ổn định. Các unsigned arrays và các operations trên các kiểu này vẫn còn trong bản Beta.
### 6.1.2 Stable locale-agnostic API for upper/lowercasing text
Ở phiên bản này mang lại cho chúng ta các API liên quan đến việc chuyển đổi chữ viết hoa và chữ thường.

- Đối với `String`:

    | Earlier versions | 1.5.0 alternative |
    | -------- | -------- |
    | String.toUpperCase()     | String.uppercase()     |
    | String.toLowerCase()     | String.lowercase()     |
    | String.capitalize()     | String.replaceFirstChar { it.uppercase() }     |
    | String.decapitalize()     | String.replaceFirstChar { it.lowercase() }   |
    
- Đối với `Char`

    | Earlier versions | 1.5.0 alternative |
    | -------- | -------- |
    | Char.toUpperCase()     | Char.uppercaseChar(): Char hoặc Char.uppercase(): String|
    | Char.toLowerCase()     | Char.lowercaseChar(): Char hoặc  Char.lowercase(): String    |
    | Char.toTitleCase()     | Char.titlecaseChar(): Char hoặc  Char.titlecase(): String    |
    
### 6.1.3 Stable char-to-integer conversion API
Bắt đầu từ Kotlin 1.5.0, các chức năng chuyển đổi ký tự sang mã và ký tự mới sẽ hoạt động ổn định.

- Các hàm để chuyển đổi `Char` thành giá trị số của chữ số:
    ```kotlin
    fun Char.digitToInt(radix: Int): Int
    fun Char.digitToIntOrNull(radix: Int): Int?
    ```
- Hàm mở rộng `Int` để chuyển đổi chữ số 
    ```kotlin
    fun Int.digitToChar(radix: Int): Char
    ```
### 6.1.4 Stable Path API
Các Path API với phần mở rộng cho `java.nio.file.Path` giờ đã được ổn định, các bạn có thể xem chi tiết [ở đây](https://kotlinlang.org/docs/whatsnew15.html#stable-path-api).
### 6.1.5 Floored division and the mod operator
Một số toán tử mới được thêm vào trong phiên bản này.

- `floorDiv()`  trả về kết quả của phép chia floor. Nó khác với phép chia thông thường ở chỗ sẽ làm tròn kết quả. Trong khi phép chia sẽ cắt bới kết quả thành số nguyên gần 0 hơn.
    
    VD: `-5 / 3 = -1.6666666` Đối với `floorDiv` sẽ trả về với kết quả là -2 còn phép chia thông thường sẽ trả về -1.
    
- `mod()` trả về phần còn lại của phép chia floor. Nó khá giống với toán tử [`rem()`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-int/rem.html) (hoặc toán tử `%`) nhưng vẫn có sự khác biệt với các số âm.

    VD: Mình vẫn lấy phép tính ở trên, đối với toán tử `%` sẽ cho chúng ta kết quả là -2 nhưng với `mod()` sẽ cho chúng ta kết quả là 1.
    
### 6.1.6 Duration API changes
Ở phiên bản này Duration API có 1 số sự thay đổi sau:

- Các giá trị nội bộ được sử dụng `Long` thay vì `Double` để cung cấp độ chính xác tốt hơn.
- Các API có kiểu trả về giờ sẽ là `Long` thay vì `Double`.
- Thêm 1 số hàm mới có thể tạo ra Duration từ 1 số. VD: `Duration.seconds(Int)` sẽ tạo 1 Duration object từ 1 số nguyên, extesion cũ như `Int.seconds` sẽ bị deprecate trong phiên bản này.

### 6.1.7 New API for getting a char category now available in multiplatform code
Có các sự thay đổi liến quan đến kiểu ký tự Char. Một số chức năng như:

- Kiểm tra xem một ký tự là một chữ cái hay một chữ số: 
  
  - `Char.isDigit()` : trả về true nếu ký tự này là một chữ số.
  - `Char.isLetter()` : trả về true nếu ký tự này là một chữ cái.
  - `Char.isLetterOrDigit` : trả về true nếu ký tự này là một chữ cái hoặc chữ số.
- Kiểm tra trường hợp của một ký tự:

  - `Char.isLowerCase()` : trả về true nếu ký tự này là chữ thường.
  - `Char.isUpperCase()` : trả về true nếu ký tự này là chữ in hoa.
  - `Char.isTitleCase()` : trả về true nếu ký tự này là một ký tự in hoa ở tiêu đề.
- Một số chức năng khác:

  - `Char.isDefined()` : trả về true nếu ký tự này được xác định bằng Unicode.
  - `Char.isISOControl()` : trả về true nếu ký tự này là ký tự ISO control (char nằm trong phạm vi `'\u0000'..'\u001F'` hoặc `'\u007F'..'\u009F'`).

### 6.1.8 New collections function firstNotNullOf()
Trong Kotlin, nó có một tập hợp khổng lồ các extension liên quan đến mảng, danh sách, giúp chúng ta code nhanh và gọn hơn. Ở kotlin 1.5.0 đếm đến cho chúng ta 2 extension nữa đó là
`firstNotNullOf()`  và `firstNotNullOfOrNull()`. 
- `firstNotNullOf()` sẽ trả về giá trị không rỗng đầu tiến trong danh sách, nếu không tồn tại giá trị nào một ngoại lệ sẽ ném ra. Thay vào đó chúng ta sẽ sử dụng `firstNotNullOfOrNull()`, nó sẽ trả về null khi không tìm thấy phần tử thỏa mãn.
    ```kotlin
    val data = listOf("Kotlin", "1.5")
    println(data.firstNotNullOf(String::toDoubleOrNull)) //return 1.5
    println(data.firstNotNullOfOrNull(String::toIntOrNull)) //return null
    ```
    
### 6.1.9 Strict version of String?.toBoolean()
Đã bao giờ các bạn phải check `value == "true"` chưa :v Nếu đã từng thì khỏi lo giờ đã có `String?.toBoolean()`. Nó sẽ trả về `true` nếu chuỗi này không phải `null` và nội dung của nó bằng với từ  "true", bỏ qua chữ hoa và chữ thường, ngược lại sẽ là `false`. Ngoài ra còn có các phiên bản nghiêm ngặt của hàm có sẵn trên chuỗi không nullable.

- `String.toBooleanStrict()` ném một ngoại lệ cho tất cả các đầu vào ngoại trừ các ký tự `true` và `false`.
- `String.toBooleanStrictOrNull()` trả về null cho tất cả các đầu vào ngoại trừ các ký tự `true` và `false`.

### 6.1.10 Kotlin-test library and Kotlinx libraries
 
   ##### a. Kotlin-test library
   - Việc lựa chọn testing dependency cho từng nền tảng đã được đơn giản hóa và hiện nó được thực hiện tự động bởi plugin Gradle.
   - Tự động chọn các testing framework cho Kotlin/JVM source.
   - Các update liên quan đến assertion function:
   
       - Kiểm tra loại giá trị: bạn có thể sử dụng `assertIs<T>` và `assertIsNot<T>`.
           ```kotlin
           @Test
           fun testFunction() {
               val s: Any = "test"
               assertIs<String>(s) //throw AssertionError nếu xác nhận không thành công
           }
           ```
       - So sánh nội dung vùng chứa cho arrays, sequences và arbitrary iterables: bạn có thể sử dụng `assertContentEquals()`.
           ```kotlin
           @Test
            fun test() {
                val expectedArray = arrayOf(1, 2, 3)
                val actualArray = Array(3) { it + 1 }
                assertContentEquals(expectedArray, actualArray) 
            }
           ```
        - `assertEquals()` và `assertNotEquals()` có thể so sánh cho `Float` và `Double`.
            ```kotlin
            @Test
            fun test() {
                val x = sin(PI)

                // precision parameter
                val tolerance = 0.000001

                assertEquals(0.0, x, tolerance)
            }
            ```
         
            Các giá trị lần lượt là: expected, actual, precision (hoặc message)
            
        - Các chức năng mới để kiểm tra nội dung của tập hợp và phần tử: 
            ```kotlin
            @Test
            fun test() {
                val sampleList = listOf<String>("sample", "sample2")
                val sampleString = "sample"
                assertContains(sampleList, sampleString)  // element in collection
                assertContains(sampleString, "amp")       // substring in string
            }
            ```
        - `assertTrue()`, `assertFalse()`, `expect()`, các chức năng hiện nay là inline: ví dụ bạn có thể gọi suspend function trong một biểu thức lambda.
            ```kotlin
            @Test
           fun test() = runBlocking<Unit> {
                val deferred = async { "Kotlin is nice" }
                assertTrue("Kotlin substring should be present") {
                    deferred.await().contains("Kotlin")
                }
            }
            ```
##### b. Kotlinx libraries
Phát hành các phiên bản mới của kotlinx libraries.

- [kotlinx.coroutines 1.5.0-RC](https://kotlinlang.org/docs/whatsnew15.html#coroutines-1-5-0-rc)
- [kotlinx.serialization 1.2.1](https://kotlinlang.org/docs/whatsnew15.html#serialization-1-2-1)
- [kotlinx-datetime 0.2.0](https://kotlinlang.org/docs/whatsnew15.html#datetime-0-2-0)

Mình có đính kèm link, các bạn có thể xem chi tiết hơn.
    
# 2.  Kotlin 1.5.20
Sau phiên bản big update là 1.5.0. Kotlin tiếp tục release version 1.5.20 - nó như một bản vá, sửa lỗi cho các vấn đề phát sinh trong version 1.5.0, đồng thời cũng cải tiến thêm 1 số phần khác.

## 2.1 Kotlin/JVM, Kotlin/Native, Kotlin/JVM improvements
Ở version 1.5.20 đã cải tiến thêm về phía backend:
- Kotlin/JVM: Cung cấp khả năng tương tác tốt hơn với Java bằng cách thêm hỗ trợ cho Lombok và JSpecify của Java.
     
  - [Lombok compiler plugin](https://kotlinlang.org/docs/lombok.html) cho phép sử dụng các khai báo do Java's Lombok đc genarate ra trong Kotlin/Java source. Lombok anotation chỉ hoạt động trong Java source và bị bỏ qua nếu sử dụng trong Kotlin source. Các anotation bao gồm: `@With`, `@Data`, `@Getter`, `@Setter`, `@NoArgsConstructor`, `@RequiredArgsConstructor`, và `@AllArgsConstructor`.
  - [JSpecify](https://jspecify.dev/) bao gồm tập hợp thống nhất của Java nullness annotations. Điều này cho phép bạn cung cấp thông tin về nullability chi tiết hơn để giúp Kotlin duy trì null-safety khi tương tác với Java.
- Kotlin/Native: Sửa lỗi trình biên dịch và cải thiện performance hơn.
- Kotlin/JS: Phiên bản ổn định hơn so với 1.5.0.

## 2.2 Gradle improvements
- Sự cả tiến của Gradle trong version này giúp thực hiện song song các tác vụ Kotlin, [chi tiết](https://docs.gradle.org/current/userguide/performance.html#parallel_execution). 
- Hiện có một tính năng thử nghiệm mới giúp bạn có thể lưu vào bộ đệm các classloaders của bộ xử lý annotation trong kapt. Tính năng này có thể tăng tốc độ kapt cho các lần chạy Gradle liên tiếp, [chi tiết](https://kotlinlang.org/docs/whatsnew1520.html#caching-for-annotation-processors-classloaders-in-kapt).
## 2.3 Standard library
Một số thay đổi cho Char library:

- `isLowerCase()` / `isUpperCase() ` sẽ kiểm tra tất cả các ký tự thay vì chỉ một chữ cái.
- `digitToInt` hỗ trợ tất cả các ký tự chữ số Unicode.
  ```kotlin
  println("" + '\u0661'.digitToInt()) //return 1
  ```
# 3. Update to Kotlin 1.5.20
- Nếu bạn sử dụng IntelliJ IDEA hoặc Android Studio , IDE của bạn sẽ cung cấp cho bạn tùy chọn tự động cập nhật lên bản phát hành Kotlin mới ngay khi có sẵn.
- Bạn cũng có thể cập nhật nó theo cách thủ công bằng cách làm theo các bước sau: **Tools** => **Kotlin** => **Configure Kotlin Plugin Updates**.
- Nếu bạn có các dự án được tạo bằng các phiên bản Kotlin trước đó, hãy thay đổi phiên bản Kotlin trong các dự án của bạn và cập nhật các thư viện kotlinx.

# 4. Tổng kết
- Tóm lại thì ở version 1.5.0 đã có rất nhiều sự thay đổi đáng kể liên quan đến các chức năng mới, thay đổi các API, update phía backend, update các library...Ngoài thay đổi liên quan đến ngôn ngữ thì Kotlin cũng phải update để tương thích với các tính năng mới trong Java, cuộc chiến giữa 2 ngôn ngữ này vẫn chưa có hồi kết :D
- Bạn còn chần trừ gì nữa mà không update Kotlin lên version mới nhất ngay để trải nhiệm những đổi mới trên.


**NOTE**: Là bài viết đầu tay :3 nên nếu mình trình bày chưa được tốt mong có được sự nhận xét, đóng góp tích cực từ phía các bạn <3 Cảm ơn các bạn đã đọc bài viết của mình, hẹn các bạn trong bài viết sớm nhất :D