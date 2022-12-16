# I. Giới thiệu
* [Exhaustive](https://github.com/cashapp/exhaustive) được tạo ra bởi [JakeWharton](https://github.com/JakeWharton). Nó đóng vai trò vừa là **annotation** và vừa là  plugin trình biên dịch Kotlin để đảm bảo thực thi đầy đủ các rẽ nhánh của câu lệnh **when**. 
```
enum class RouletteColor { Red, Black, Green }

fun printColor(color: RouletteColor) {
  @Exhaustive
  when (color) {
    Red -> println("red")
    Black -> println("black")
  }
}
```
```
e: Example.kt:5: @Exhaustive when is not exhaustive!
Missing branches:
- RouletteColor.Green
```
* Plugin này có khả năng kiểm tra tất cả các rẽ nhánh của câu lệnh **when** mà không cần phải tạo ra biến local hoặc tham chiếu các hàm vô nghĩa. Khi sử dụng plugin thì nhánh **else** sẽ bị cấm:
```
fun printColor(color: RouletteColor) {
  @Exhaustive
  when (color) {
    Red -> println("red")
    Black -> println("black")
    else -> println("green")
  }
}
```
```
e: Example.kt:5: @Exhaustive when must not contain an 'else' branch
```
* Sự hiện diện của nhánh **else** sẽ cung cấp một hành động mặc định và làm cho **exhaustive** luôn đúng, do đó nhánh **else** sẽ không được thừa nhận.
* Sealed class cũng được hỗ trợ với **exhaustive**
```
sealed class RouletteColor {
  object Red : RouletteColor()
  object Black : RouletteColor()
  object Green : RouletteColor()
}

fun printColor(color: RouletteColor) {
  @Exhaustive
  when (color) {
    RouletteColor.Red -> println("red")
    RouletteColor.Black -> println("black")
  }
}
```
```
e: Example.kt:9: @Exhaustive when is not exhaustive!
Missing branches:
- RouletteColor.Green
```
# II. Cách sử dụng
```
buildscript {
  dependencies {
    classpath 'app.cash.exhaustive:exhaustive-gradle:0.1.1'
  }
  repositories {
    mavenCentral()
  }
}

apply plugin: 'org.jetbrains.kotlin.jvm' // or .android or .multiplatform or .js
apply plugin: 'app.cash.exhaustive'
```
* **@Exhaustive** annotation sẽ có trong code của main và test source nhưng sẽ không phải là một dependency của module. Mỗi phiên bản của **Exhaustive** chỉ có thể làm việc với một phiên bản Kotlin nhất định.

| Kotlin | Exhaustive | 
| -------- | -------- |
| 1.4.10 - 1.4.20     | 0.1.1     |

# III. So sánh với các giải pháp thay thế
## 1. Sử dụng warning suppression
```
fun printColor(color: RouletteColor) {
  @Suppress("UNUSED_VARIABLE")
  val exhaustive = when (color) {
    RouletteColor.Red -> println("red")
    RouletteColor.Black -> println("black")
  }
}
```
* Ưu điểm:
    - Không cần lib mà vẫn chạy tốt.
    - Không overhead hoặc ảnh hưởng đến mã đã biên dịch.
* Nhược điểm:
    - Yêu cầu warning suppression cần được đưa vào khuôn mẫu chung.
    - Yêu cầu sử dụng tên duy nhất (không được phép sử dụng **_** )
## 2. Xây dựng trailing property hoặc gọi làm
```
fun printColor(color: RouletteColor) {
  when (color) {
    RouletteColor.Red -> println("red")
    RouletteColor.Black -> println("black")
  }.javaClass // or .hashCode() or anything else...
}
```
* Ưu điểm:
    - Có thể chạy bất kỳ đâu mà không cần lib hoặc plugin
* Nhược điểm:
    - Không mô tả về ảnh hưởng của **when** và ý tưởng của người phát triển khi tạo ra nó.
    - Tác động đến mã đã biên dịch dưới dạng lệnh gọi thuộc tính, lệnh gọi hàm.
    - Nghèo nàn tính cục bộ của các thuộc tính cách xa **when**.
## 3. Library trailing property
```
@Suppress("unused") // Receiver reference forces when into expression form.
inline val Any?.exhaustive get() = Unit
fun printColor(color: RouletteColor) {
  when (color) {
    RouletteColor.Red -> println("red")
    RouletteColor.Black -> println("black")
  }.exhaustive
}
```
 * Ưu điểm:
    - Mô tả rõ ràng tác động của **when**
    - Không ảnh hưởng đến code đã biên dịch
* Nhược điểm:
    - Yêu cầu lib
    - Nghèo nàn tính cục bộ của các thuộc tính cách xa **when**.
    - Gây rối loạn cách quản lý tên của các tiện ích mở rộng bằng cách áp dụng cho mọi thứ không chỉ mỗi **when**.
## 4. Library leading expression
```
@Suppress("NOTHING_TO_INLINE", "ClassName", "UNUSED_PARAMETER") // Faking a soft keyword.
object exhaustive {
  inline operator fun minus(other: Any?) = Unit
}

fun printColor(color: RouletteColor) {
  exhaustive-when (color) {
    RouletteColor.Red -> println("red")
    RouletteColor.Black -> println("black")
  }
}
```
* Ưu điểm:
    - Linh hoạt trong cách đặt tên và sửa đổi các từ khóa.
* Nhược điểm:
    - Yêu cầu lib
    - Mã được định dạng sẽ chèn một khoảng trắng trước và sau dấu **–** làm phá vỡ cấu trúc.
## 5. Sử dụng soft keyword trong trình biên dịch
```
fun printColor(color: RouletteColor) {
  sealed when (color) {
    RouletteColor.Red -> println("red")
    RouletteColor.Black -> println("black")
  }
}
```
* Ưu điểm:
    - Không ảnh hưởng đến mã đã biên dịch.
    - Là một phần của ngôn ngữ thực tế.
* Nhược điểm:
    - Yêu cầu tạo trình biên dịch và plugin IDE.