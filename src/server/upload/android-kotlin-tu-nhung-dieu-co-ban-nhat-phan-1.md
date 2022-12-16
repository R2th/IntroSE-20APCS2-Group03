# I. Giới thiệu
Kotlin là một ngôn ngữ lập trình được tạo ra bởi JetBrains. Cũng giống như Java, ngôn ngữ lập trình mặc định cho Android, Kotlin chạy trên nền tảng Java Virtual Machine. Khả năng tương tác mạnh mẽ giữa Kotlin và Java đã làm cho ngôn ngữ lập trình này trở thành một sự lựa chọn phổ biến của các nhà phát triển.
Kotlin đã được Google đã công nhận sẽ là ngôn ngữ lập trình đứng đầu cho hệ điều hành Android và chúng ta có thể thấy từ Android studio 3.0. Kotlin cũng đã được thêm vào tùy chọn khi bạn bắt đầu một project mới. 
Hiện nay, có thể nói "Kotlin" là một từ khóa đang rất hot cho các lập trình viên Android
# II. Một số ưu điểm của Kotlin
* Kotlin code rất gọn gàng so với java, có người còn nói dùng kotlin có thể ngắn gọn code 40 %
* Được Google support nên cộng đồng Kotlin cũng rất đông, bạn không phải lo ngại về việc tìm kiếm các câu hỏi trên các diễn đàn hay StackOverFlow,...
* Viết một lần, chạy mọi nơi: cũng như Java, Kotlin cũng biên dịch mã nguồn thành mã bytecode, và có thể chạy được trên các thiết bị đã cài sẵn JVM (Java Virtual Machine).
* Tương thích với java, bộ thư viện dành cho kotlin đang ngày càng được phát triển.

# III. Bắt đầu với Kotlin
## 1. Kiểu dữ liệu
Mỗi ngôn ngữ lập trình đều cung cấp một số kiểu dữ liệu có sẵn để ta lưu trữ xử lý. Kotlin cũng vậy, nó cung cấp hàng loạt kiểu dữ liệu như: số thực, số nguyên, ký tự, chuỗi,... 
Cũng như các ngôn ngữ lập trình khác, nếu bạn nắm chắc được ý nghĩa của từng kiểu dữ liệu sẽ gúp ta có một sự lựa chọn đúng đắn khi khai báo biến, tối ưu hóa hệ thống
![](https://images.viblo.asia/a837ec3e-475e-46a7-93b8-5103611fa508.png)
## 2. Khai báo biến
Chắc hẳn nếu bạn đang code bằng java mà khi chuyển sang kotlin sẽ có chút "bối rôi" cú pháp sẽ ngược một chút so với java
Trong kotlin có 2 từ khóa để khai báo biến là var và val
* Từ khóa var sử dụng cho biến, trong khi đó val sử dụng khi là hằng số
* Có thể dễ hiểu từ khóa val giống như final trong java
Ví dụ 
```
var a : Int = 5
var isBoolean : Boolean = true

val PI : Double = 3.14
```
## 3. Null Safety
Khi bạn lập trình với java, chắc chắn bạn đã từng bị lỗi NullPoiterException, điều này gây cho các lập trình viên cảm giác khó chịu và gây nguy hiểm cho hệ thống của bạn.
Nhưng đối với Kotlin thì điều này có thể được khắc phục khi Kotlin hỗ trợ tính năng này. Nhằm mục đích xóa bỏ NullPoiterException trong code của chúng ta. Ngay khi khai báo biến trong kotlin, chúng ta có thể chỉ rõ biến đang khai báo có được phép null hay không.
Để cho phép 1 biến null ta dùng "?" sau kiểu dữ liệu
Ví dụ:
*  Khai báo biến không được phép null
```
var name : String = "thanh"

name = null //compile error
```
*  Khai báo biến được phép null
```
var name :String? = "thanh"
name = null //compile ok
```
Có thể thấy Kotlin đã khắc phục được NullPoiterException trong java. Các biến có thể được null hay không đã được kiểm soát trong quá trình khai báo biến, IDE phát hiện sớm lỗi ngay khi compile giúp phát hiện ra lỗi sớm hơn khi lỗi đó được phát hiện thi runtime.

## 4. String template

String trong kotlin có thể chứa các biểu thức template, tức là những kết quả trả về hoặc biến có thể được nối vào trong 1 String. Một biểu thức template bắt đầu với ($$ và tên :
Ví dụ:
```
val name : String "thanh"

println("My name $name)
```
## 5. Ép kiểu
Trong quá tính tính toán đôi khi kết quả trả về không còn giống với kiểu dữ liệu ban đầu nên ta cần ép kiểu, khi ép kiểu thường gặp 2 trường hợp:
* Ép kiểu rộng
Đưa kiểu có vùng lưu trữ nhỏ lên kiểu có vùng lưu trữ lớn thì không sợ mất dữ liệu
Ví dụ: Byte =>Short=>Int=>Long=>Float=>Double
* Ép kiểu hẹp
Đưa kiểu có vùng lưu trữ lớn về kiểu có vùng lưu trữ nhỏ hơn thì có thể mất dữ liệu
Ví dụ: Double=>Float=>Long=>Int=>Short=>Byte
Trong Kotlin, bất kỳ kiểu dữ liệu number nào cũng có sẵn các phương thức
* toByte() : Byte
* toShort() :Short
* toInt() :Int
* toLong(): Long
* toFloat():Float
* toDouble():Double
* toChar():Char
Trên đây là kiểu éo kiểu trường minh, chỉ đích thị kiểu dữ liệu nào sẽ được ép về
Ngoài ra, Kotlin còn có ép kiểu không tường minh, tức là Kotlin tự nội suy ra kiểu dữ liệu để gán cho biến, ví dụ:
```
var sum = 2L+1
println(sum)
```
Vì 2L là kiểu Long, 1 có kiểu Int ==> Kotlin tự lấy kiểu dữ liệu lớn nhất làm chuẩn, do đó sum sẽ có kiểu Long
# IV. Kết luận
Như vậy, mình đã giới thiệu qua về kotlin và những điều cơ bản nhất với kotlin. Ở phần sau, mình sẽ giới thiệu thêm về, for, while hay các lệnh điều kiện trong kotlin.
Cảm ơn các bạn đã theo dõi bài viết của mình!