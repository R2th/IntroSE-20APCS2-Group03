# I. Giới thiệu

Trong [phần 1](https://viblo.asia/p/so-sanh-nhung-diem-giong-va-khac-nhau-giua-swift-va-kotlin-phan-1-maGK7DWLZj2), chúng ta đã cùng tìm hiểu về những điểm tương đồng của Swift và Kotlin về cách khai báo property, các dạng dữ liệu, hàm, closure/lambda function. Trong phần 2 này, chúng ta sẽ tiếp tục tìm hiểu những điểm giống và khác nhau giữa Swift và Kotlin

# II. Nội dung
## 1.  Sự tương đồng
### Optional/Nullable

Nếu các bạn đã từng lập trình Swift hoặc Kotlin thì khái niệm về Optional/Nullable hẳn đã quá quen thuộc rồi. Cả Swift và Kotlin đều là ngôn ngữ lập trình “an toàn”, Swift có optional và Kotlin cũng có Nullable, chỉ các property được gán dạng Optional/Nullable mới có thể có giá trị nil/null. Cách biểu diễn Optional/Nullable trên Swift/Kotlin là giống nhau, đều biểu thị bằng dấu “?”

`Kotlin`
```Kotlin
var name: String? = “Kotlin”
name = null
```

`Swift`
```Swift
var name: String? = “Swift”
name = nil
```

Cách viết optional/nullable của 2 bên là giống hệt nhau, không có gì khác biệt

### Xử lý Optional/Nullable

Trong Swift/Kotlin, chúng ta có nhiều cách để handle optional/nullable. Các cách ở 2 ngôn ngữ cũng gần tương đương nhau:

`Kotlin`
```Kotlin
var name: String? = “Kotlin”
var kotlinName = name ?: “Default name”
```

`Swift`
```Swift
var name: String? = “Swift”
Var swiftName = name ?? “Default name”
```

Như các bạn thấy bên trên, Swift dùng “??” còn Kotlin dùng “?:”

Cả Swift và Kotlin đều có cơ chế safe cast

`Swift`
```Swift
(error as? NSError).localizedDescription
```

Kotlin không có Guard statement, tuy nhiên chúng ta có thể viết tương tự với guard statement trên Swift:

`Kotlin`
```Kotlin
val kotlinName = name as? String ?: return
println(kotlinName)
```

`Swift`
```Swift
guard let swiftName = name as? String else {
	return
}

print(swiftName)
```

Trong khi Swift sử dụng if let để tạo non-optional property, Kotlin không cần làm điều này:

`Kotlin`
```Kotlin
if name != nil {
	print(name)	// trong vòng if name không còn là nullable
}
```

`Swift`
```Swift
if let swiftName = name {
	print(swiftName)
}
```

Như trên chúng ta thấy Swift phải tạo 1 instance mới trong if let, Kotlin không cần làm vậy để bỏ nullable property

### Flow control

#### if - else

cả Swift và Kotlin đều dùng if - else giống nhau, và giống với các ngôn ngữ lập trình khác

`Kotlin`
```Kotlin
if (a < 0) {

} else {

}
```

`Swift`
```Swift
if a < 0 {

} else {

}
```

#### Switch/When

Nếu trong Swift chúng ta có switch thì trong Kotlin chúng ta cũng có when. Cách viết của 2 bên không hẳn giống nhau nhưng ý nghĩa thì giống hệt nhau:

`Kotlin`
```Kotlin
val number = 1
when (number) {
  1 -> println("1")
  2 -> println("2")
else -> { 
  print(“default“)
  }
}
```

`Swift`
```Swift
let number = 3
switch number {
  case 1:
    print("1")
  case 2:
    print("2")
  default:
    print(“default”)
}
```

Cả when và switch đều không cần sử dụng break, vì cả 2 chỉ thực hiện 1 case trong vòng when/switch. Trong switch, chúng ta bắt buộc phải khai báo hết các case có thể sảy ra, hoặc phải thêm default để xử lý case mặc định. when không bắt buộc chúng ta làm việc này, có thể thấy ở đây switch rõ ràng hơn, không bị lack case.

#### vòng for

cả Swift và Kotlin đều có nhiều cách để viết vòng for, và các cách viết của 2 bên cũng gần như giống nhau:

`Kotlin`
```Kotlin
val numbers = arrayOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
for (number in numbers) {
  println(number)
}

for (number in 1..10) {
  println(number)
}
```

`Swift`
```Swift
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
for number in numbers {
  print(number)
}

for number in 1..<10 {
  print(number)
}
```

Như chúng ta thấy bên trên, cách viết vòng for trong Swift và Kotlin rất giống nhau.

### class
#### khai báo
Cách khai báo class của Swift và Kotlin là rất giống nhau:

`Kotlin`
```Kotlin
class MainActivity: AppCompatActivity() {

}
```

`Swift`
```Swift
class ViewController: UIViewController {

}
```

#### hàm khởi tạo
Để viết các hàm khởi tạo, chúng ta sử dụng constructor trong Kotlin:

`Kotlin`
```Kotlin
class Person constructor(_name: String) {
  val name: String

  init {
    name = _name
  }
}
```

`Swift`
```Swift
public class Person {
  let name: String

  init(name: String) {
    self.name = name
  }
}
```

### class extension

Để viết extension cho class, chúng ta viết như sau:

`Kotlin`
```Kotlin
fun Int.square(): Int {
  return this * this
}

println(3.square()) // 9
```

`Swift`
```Swift
extension Int {
  func square() -> Int {
    return self * self
  }
}

print(3.square()) // 9
```

Các bạn thích cách viết extension nào hơn? mình thì thích cách viết của Swift hơn, vì trông có vẻ thân thiện và dễ đọc hơn

### interface/protocol

Trong Kotlin(java) chúng ta có interface, còn trong Swift chúng ta có protocol. Cách viết interface/protocol cũng tương tự nhau:

`Kotlin`
```Kotlin
interface Animal {
  var canFly: Boolean 

  fun makeSound()
}
```

`Swift`
```Swift
protocol Animal {
  var canFly: Bool {get}

  func makeSound()
}
```

## 2. Một số khác biệt cơ bản

### reference  types

Trong Swift, chúng ta có cả 2 dạng value type và reference type (struct và class). Đối với Kotlin, chúng ta chỉ có duy nhất một dạng reference type. Như chúng ta đều biết, value type và reference type về cơ bản là khác nhau. Pass by value và pass by reference đều có những ưu, nhược điểm riêng, nếu dùng không cẩn thận chúng ta sẽ rất dễ bị mất dữ liệu. Việc Kotlin chỉ có reference type là một điểm trừ của Kotlin so với Swift. Chúng ta xét ví dụ dưới đây để thấy sự nguy hiểm khi chúng ta pass by reference không cẩn thận:

`Kotlin`
```Kotlin
data class Person(var name: String)

val personOne = Person("Kotlin")
val personTwo = personOne
personTwo.name = "java"
println(personOne.name) // java
println(personTwo.name) // java
```

Chúng ta thấy là không chỉ persionTwo mà cả persionOne cũng bị đổi giá trị của name. Đối với value type trong Swift trường hợp này sẽ không sảy ra:

`Swift`
```Swift
struct Person {
  let name: String
}

let personOne = Person(name: "Swift")
var personTwo = personOne
personTwo.name = "Objective C"
print(personOne.name) // Swift
print(personTwo.name) // Objective C
```

Khi sử dụng Struct, chúng ta không phải lo sợ dữ liệu của instance này bị thay đổi bởi một instance khác

### val vs let

Trong Kotlin, khi chúng ta khai báo các dạng dữ liệu collection bằng val, chúng ta hoàn toàn có thể sửa dữ liệu đó. Ví dụ:

`Kotlin`
```Kotlin
val numbers = mutableListOf(1, 2, 3, 4)
persons.add(5) // OK
```

Trong khi đó, let của Swift không cho phép chúng ta làm việc này:

`Swift`
```Swift
let numbers = [1, 2, 3, 4]
numbers.append(5) // compile error
```

# III. Tổng kết

Qua 2 bài viết vừa qua, tôi đã giới thiệu đến các bạn một số điểm giống và khác nhau giữa Swift và Kotlin. Cả 2 ngôn ngữ ngày đều là các ngôn ngữ lập trình hiện đại, dễ viết và dễ đọc hiểu code. Swift và Kotlin sở hữu nhiều điểm tương đồng nhau, đây là một điểm rất tuyệt vời để cho lập trình viên chúng ta, những người đang code iOS hoặc Android có thể chuyển sang code hệ điều hành mobile còn lại mà không gặp quá nhiều trở ngại về mặt ngôn ngữ lập trình. Với sự phát triển rất mạnh của cả Swift và Kotlin, trong tương lai chúng ta sẽ có những cải tiến của cả 2 ngôn ngữ để cả 2 hiện đại hơn, dễ học, dễ viết, dễ đọc hơn nữa.

Bài viết của tôi đến đây là kết thúc, tôi xin dừng bài viết tại đây. Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này, have a nice day ^_^!