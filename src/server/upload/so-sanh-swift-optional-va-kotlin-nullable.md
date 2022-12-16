Xử lý sai lầm triệu đô, null reference là một điều bắt buộc trong những ngôn ngữ hiện đại. Cả Swift và Kotlin đều có cách tiếp cận tương tự nhưng có những điểm khác nhau.

Có lẽ chia sẽ cả 2 cách xử lý cùng với nhau sẽ cho một người có một cái nhìn khác về cách xử lý của cái kia.

#  Mặc định tất cả các biến điều KHÔNG THỂ NULL

Trong Java, nếu khi một đối tượng đợc khởi tạo, nó có thể là null hoặc có một vài giá trị

```java
Integer number = null; // Valid
String letter = null; // Valid
```

## Điều này không đúng đối với Kotlin và Swift

Trong Kotlin

```kotlin
val number: Int = null; // Invalid
val letter: String = null; // Invalid
```

Và trong Swift

```swift 
let number: Int = nil; // Invalid
let letter: String = nil; // Invalid
```

# Cả hai giới thiệu một kiểu mới để lưu trữ NULL

## Option trong Swift

Trong Swift,  kiểu mới được gọi là *Optional*. Cách khai báo như bên dưới:

```swift
let number: Int? = nil
let letter: String? = nil
print(number) // print `nil`
print(letter) // print `nil`
```

Nếu bạn chỉ định một giá trị cho nó

```swift
let number: Int? = 10
let letter: String? = "abc"

print(number) // print `Optional(10)`
print(letter) // print `Optional("abc")`
```

Nói cách khác bạn, nó chỉ là một kiểu bao bọc (hoặc tưởng tượng một chiếc hộp) trên kiểu dữ liệu ban đầu (trông giống như Optional<T> của Java nhưng khai báo một cách đẹp hơp sử dụng `?`) .
 
Nếu muốn thể hiện Optional trong một diagram, nó sẽ trông như sau: 
    
![](https://images.viblo.asia/fffceadc-7b5f-4eda-9d44-eaca990af8c6.png)
    
Vì vậy, bạn thực sự có thể làm như sau:

```swift
let number: Int? = 10
let letter: String? = "abc"
prlet number: Int??? = 10
let letter: String??? = "abc"
    
print(number) // print `Optional(Optional(Optional(10)))`
print(letter) // print `Optional(Optional(Optional("abc")))`int(number) // print `Optional(10)`
print(letter) // print `Optional("abc")`
```
##    Nullable trong Kotlin
    
Trong Kotlin, kiểu mới được gọi là Nullable. Cách để khai báo nó như sau: (Nó khá giống với Swift, ngoại trừ việc không có nil)
    
```
val number: Int? = null
val letter: String? = null
    
print(number) // print `null`
print(letter) // print `null`
```
    
Tuy nhiên, nếu chúng ta gán giá trị cho nó, nó sẽ giống như dưới đây, hoạt động giống non-null version của nó.
    
```
val number: Int? = 10
vak letter: String? = "abc"
print(number) // print `10`
print(letter) // print `abc`
```
Làm sao nó có thể như thế được? Điều này là do non-null version là một phiên bản của nullable version
    ![](https://images.viblo.asia/442a7da6-5bf5-44d0-a501-5945f0dc5355.png)
    
Khi bạn khai báo `Int???` hoặc `String`, mặc dù bạn có thể làm như vậy nhưng compiler sẽ phàn nàn rằng *Redundant "?"*.
   
Nó không có ý nghĩa để có một nullabel-nullable-..., nullable-nullable... thực sự chỉ là nullable. Và giá trị in ra vẫn như giá trị của non-nullable form như dưới đây:
    
  ```
val number: Int??? = 10 // Warning Redundant ‘?’
vak letter: String??? = "abc" // Warning Redundant ‘?’
    
print(number) // print `10`
print(letter) // print `abc`
 ```
# Accessing nullable object's function
    
## ? - Swift Optional Chanining, Kotlin Safe Call
    
Cần có kí tự "?" trước nullable object's function để có thể truy cập. Không nó nó, nó sẽ tạo ra một lỗi biên dịch, bới vì nó tiềm ẩn nghuy cơ Null Pointer Exception (NPE) có thể xuất hiện.
    
Khi "?" được sử dụng, khi object không null, chỉ function của nó được thực thi. Thay vào đó, một null sẽ được return.
    
Trong Kotlin:
    
```
// Kotlin Safe call
val string: String? = "ABC"
val nothing: String? = null
print(string.toLowerCase()) // Compile error
print(string?.toLowerCase()) // print `abc`
print(nothing?.toLowerCase()) // print `null`
```
    
Trong Swift:
```
let string: String? = "ABC"
let nothing: String? = nil
print(string.lowercased()) // Compile error
print(string?.lowercased()) // print `Optional("abc")`
print(nothing?.lowercased()) // print `nil`
```
    
# Non-null to nullable type asignment: Legal
    
## Swfit: Wrapping into Optional
Nó cho phép bạn chỉ định một non-null vào Optional varriable  cùng một kiểu trong Swift.  Nó như wrapping variable trong Optional type
    
```swift
let actualNumber: Int = 10
let actualLetter: String = "abc"
    
print(actualNumber) // print `10`
print(actualLetter) // print `abc`
    
let number: Int? = actualNumber
let letter: String? = actualLetter
    
print(number) // print `Optional(10)`
print(letter) // print `Optional("abc")`
```
    
## Kotlin: Casting into Nullable
Nó cho phép chỉ định một non-null vào một nullable variable của cùng một kiểu trong Kotlin. Nó như casting variable thành kiểu dữ liệu cha của nó, điều này được cho phép:
    
```kotlin
val actualNumber: Int = 10
val actualLetter: String = "abc"
    
print(actualNumber) // result in `10`
print(actualLetter) // result in `abc`

val number: Int? = actualNumber
val letter: String? = actualLetter
    
print(number) // result in `10`
print(letter) // result in `abc`
```
# Nullable thành no-null type assignment: Error
    
## In both languages, such assignment is not permitted
    
Trong Swift:
    
```swift
let number: Int? = 1
let letter: String? = "1"
let actualNumber: Int = number // Compile error
let actualLetter: String = letter // Compile error
```
    
Trong Kotlin:
    
```kotlin
val number: Int? = 10
val letter: String? = "abc"
val actualNumber: Int = number // Compile error
val actualLetter: String = letter // Compile error
```
Điều này để đảm bảo rằng Null Pointer Exception (NPE) không xảy ra khi có ai đó vô tình gán một giá trị null cho kiểu dữ liệu non-null

# Force assigne nullable to non-null type
 
## Swift: Unconditional unwrapping
    
Để force một Optionanl thành kiểu dữ liệu gốc của nó, người ta có thể unwrap bằng cách sử dụng `as!`
    
```swift
let number: Int? = 10
let actualNumber: Int = number as! Int
```
Chúng ta có thể viết ngắn gọn hơn như dưới đây:
```swift
val number: Int? = 10
val actualNumber: Int = number as Int
```
 Nhưng điều này là không an toàn, nó có thể bị crash trong trường hợp `number  == nil`

## Kotlin: Force casting, double bang!

Để force casting thành một non-null value, người ta có thể sử dụng `as`

```kotlin
val number: Int? = 10
val actualNumber: Int = number as Int
```
Hoặc có thể viết ngắn gọi hơn:

```kotlin
let number: Int? = 10
let actualNumber: Int = number!!
```
    
Nhưng điều này là không an toàn, nó có thể bị crash trong trường hợp `number  == null`

# Graceful handling of null value

Để làm điều này an toàn người ta có thể làm như dưới đây:

Trong Swift:
    
```Swift
let number: Int? = 10
if number != nil {
   let actualNumber: Int = number!
}
```

Trong Kotlin:
    
```Kotlin
val number: Int? = 10
if (number != null) {
   let actualNumber: Int = number!!
}
```
Nhưng nếu chúng ta làm thế này thì rất giống Java và thực sự thiếu đi sự tiện lợi, chúng ta phải so sánh giá trị với null một cách tường minh.

Hãy xem cách tiện lợi chúng ta có thể làm với cả 2 ngôn ngữ:
    
## Swift Optional Binding
    
Với Optional Binding, không check null một cách tường minh. CHú ý rằng actualNumber chỉ có phạm vi bên trong dấu ngoặc:
    
```Swift
let letter: String? = "ABC"
if let actualLetter = letter {
    print(actualLetter.lowercased())
}
```
Trong Swift, cũng có một `guard` mà có thể xử lý gracefully một cách tiền lợi, ở đây nó sẽ bị hủy bỏ nếu `nil` được tìm thấy, hoặc tiếp tục. Trong trường hợp này actualNumber được set ngoài phạm vi `guard`.
```Swift
let letter: String? = "ABC"
guard let actualLetter = letter else { return }
print(actualLetter.toLowerCase())
```
## Kotlin: Standard function.
Trong Kotlin không có một cú pháp cụ thể để xử lý điều này. Nhưng có một generic functions được cung cấp (hay còn được gọi là standard function) mà thực sự tiện dụng.

Một trong số đó là `let` như ở dưới, ngoài ra có thể sử dụng các function khác như `apply`, `run` etc.
    
```kotlin
val letter: String? = 10
letter?.let { 
    print(it.toLowerCase()) 
}
```
    
Trong ví dụ trên, it thực sự là một no nullable của letter mà có thể sử dụng bên trong scope.

# Graceful handling of null value

Trong Java, chúng ta thường là như sau:

```Java
int messageLength = -1; // -1 to indicate not set
if (message != null) {
    messageLength = message.length;
} else {
    messageLength = 0;
}
```

## Swift: Nil coalescing
    
Trong Swift, điều này được làm đẹp hơn rất nhiều với ??(Nil coalescing) operator:

```Swift
let messageLength = message?.count ?? 0
```

## Kotlin: Elvis expression

Trong Kotlin chúng ta có thể sử dụng ?: (Elvis expression) operator:
    
```Kotlin
val messageLength = message?.length ?: 0
```

# Safe casting: as?
    
Cả Swift và Kotlin đều cho phép việc cố gắng cast kiểu này sang kiểu khác. Nếu casting thành công, nó sẽ dẫn đến một kiểu ullable (optional trong Swift) của kết quả cast:
Trong Swift:

```swift
let number: Int = 10
let x = number as? Int // x = Optional(10), x is Int?
let x = number as? String // x = nil, x is String?
```
    
Trong Kotlin:
    
```Kotlin
val number: Int = 10
let x = number as? Int // x = 10, x is Int?
let x = number as? String // x = null, x is String?
```
    
# "After I know it í not null" handling
Thỉnh thoảng sau khi chúng ta có thể chắc chắng rằng Optional hoặc Nullable object không null, có một rắc rối khi tiếp tục sử dụng `?` trên object. Làm thế nào để các ngôn ngữ có thể xử lý kịch bản như vậy?
    
## Swfit: Implicit Unwraping:
Khác với Optional type, Swift cung cấp một kiểu khác để biểu thị Unwrapping type là kiểu với kết thúc bằng `!`
    
```Swift
let letter: String? = "ABC"
let unwrapLetter: String! = letter
print(letter) // print `Optional("ABC")`
print(letter?.lowercased()) // print `Optional("abc")`
print(unwrapLetter) // print `Optional("ABC")`
print(unwrapLetter.lowercased()) // print `abc`; no "?" needed
```
    
`unwrapLetter` ở trên là một kiểu unwrapped không tường mình. Nó thật sự là một optional type, nhưng có thể được sử dụng mà không có `?` type như trong `print(unwrapLetter.lowercased())`. Cũng cần chú ý rằng kết quả là `abc` chứ không phải là `Optional("abc")`.
    
Đổi với kiểu này việc có `?` là không cần thiết.
    
Tuy nhiên, kiểu dữ liệu này có thể gây nguy hiểm, bởi vì nó không đảm bảo rằng `nil` sẽ không xuất hiện, và ứng dụng của bạn sẽ bị crash khi điều này xảy ra.
    
## Kotlin: Smart casting
Không như Swift, Kotlin không có một kiểu khác để làm điều này. Nhưng nó có một feature được gọi là smart casting rất tiện dụng trong trường hợp này:
    
Smart casting là một feature dựa trên sự hiểu biết rằng một object là một loại subclass cụ thể, nó sẽ tự động cast thành kiểu dữ liệu không cần coder phải cast nó một cách rõ ràng.

```Kotlin
val actualLetter: String? = "ABC"
if (actualLetter == null) return
print(actualLetter.toLowerCase()) // no `?` needed
```

Ví dụ ở trên là trường hợp rất đơn giản, nếu `actualLetter` là null, function sẽ dừng lại. Điều này có nghĩa là sau dòng này, chúng ta biết rằng `actualLetter` chắc chắn là không null.
    
Vì lí do này `actualLetter` bây giờ sẽ tự động cast thành `String`, và có thể gọi `toLowerCase()` mà không safe call `?` operator.
    
Smart casting chỉ xử lý nếu variable được xác nhận là không thể thay đổi giữa check và sử dụng. Do đó nó an toàn
    
# Kết: 
Tôi hi vọng bài viết này hữu ích với bạn.
    
Cảm ơn các bạn đã đọc bài viết.
    
# Tham khảo:
    
https://medium.com/@elye.project/swift-optional-and-kotlin-nullable-a-comparison-773227f277c3