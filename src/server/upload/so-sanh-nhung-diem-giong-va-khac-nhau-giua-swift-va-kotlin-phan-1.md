# I. Giới thiệu
Cả Swift và Kotlin đều là những ngôn ngữ lập trình rất mới:

* Swift xuất hiện từ năm 2014, được phát triển bởi Apple. Swift chính thức trở thành ngôn ngữ Open source từ 03/12/2015, và mặc dù chúng ta có thể dùng Swift code web, nhưng nổi bật hơn cả vẫn là dùng Swift để code iOS/Mac OS.

* Kotlin xuất hiện từ năm 2011 và ban đầu được phát triển bởi một nhóm phát triển người Nga. Kotlin chạy trên nền JVM để tương tác với Java, xứ mệnh ra đời của ngôn ngữ này là để thay thế cho ngôn ngữ Java. Năm 2017 thì Google đã chính thức hỗ trợ Kotlin, và coi Kotlin như một ngôn ngữ phát triển cho Android.

Swift và Kotlin sở hữu khá nhiều điểm tương đồng trong ngôn ngữ, đặc biệt chúng lại là 2 ngôn ngữ để code 2 hệ điều hành mobile mạnh mẽ nhất thời điểm hiện tại. Chính vì vậy, cả 2 ngôn ngữ được rất nhiều người đặt lên bàn cân để so sánh. Trong bài viết này, tôi xin nêu một vài điểm khác biệt và tương đồng cơ bản trên cả 2 ngôn ngữ, để các bạn có cái nhìn tổng quan hơn về sự giống/khác nhau giữa 2 ngôn ngữ này

# II. Nội dung

## 1. Sự tương đồng

Cả Swift và Kotlin đều có rất nhiều điểm tương đồng nhau và chúng ta sẽ đi tìm hiểu ngay sau đây

### a. Khai báo property

#### Kotlin: Mutable property

Khai báo với type rõ ràng:
```Kotlin
var number: Int = 10
```
Khai báo với inference type 
```Kotlin
var  name = “Kotlin”
```
#### Swift: Mutable property


Khai báo với type rõ ràng:
```Swift
var number: Int = 10
```
Khai báo với inference type 
```Swift
var  name = “Swift”
```
Như các bạn thấy, việc khai báo biến số trong Swift và Kotlin là giống hệt nhau, không có sự khác biệt

#### Kotlin: Immutable property
Khai báo với type rõ ràng:
```Kotlin
val number: Int = 10
```
Khai báo với inference type 
```Kotlin
val name = “Kotlin”
```
#### Swift: Immutable property

Khai báo với type rõ ràng:
```Swift
let number: Int = 10
```
Khai báo với inference type 
```Swift
let name = “Swift”
```

Trong trường hợp này, khai báo hằng số giữa Swift và Kotlin chỉ khác nhau ở keyword “val” và “let”

### b. Các dạng cấu trúc dữ liệu

#### Array

Cả Swift và Kotlin đều cố định kiểu của các element trong Array, tức là các element trong cùng 1 Array phải có chung 1 kiểu dữ liệu (String, Int,…)

Swift chỉ có 1 kiểu Array, còn Kotlin có Array và List.  Trong Kotlin, Array bị giới hạn số lượng element ngay từ khi khởi tạo, còn List thì không. Các bạn có thể tưởng tượng rằng Array trong Swift giống List trong Kotlin, còn Array trong Kotlin thì cũng giống Array trong Swift, chỉ có điều nó bị giới hạn số lượng element ngay từ khi được khởi tạo

Swift Array:
```Swift
var names = Array<String>()
names.append(“Swift”) // index 0
names.append(“Kotlin”) // index 1
```

Kotlin Array:
```Kotlin
val names = Array<String>(3){“Kotlin”}
names[0] = Swift // Array [“Swift”, “Kotlin”, “Kotlin”]
```
Kotlin List:
```Kotlin
var names = ArrayList<String>()
names.add("Swift") //index 0
names.add("Kotlin") //index 1
names.add("Kotlin") // index 2
```
#### Dictionary/Map

Dictionary trong Swift và Map trong Kotlin có chức năng tương đương nhau, chỉ khác nhau về tên gọi. Cả Dictionary và Map đều có thể khai báo để thêm nhiều element hoặc khai báo với số lượng element cố định để tăng performance

Kotlin mutable Map:
```Kotlin
var namesAndAges = HashMap<String, Int>()	   // Khởi tạo
var namesAndAges = HashMap<String, Int>(10) // khởi tạo với capacity

namesAndAges.put(“Kotlin”, 8)	// gán giá trị
namesAndAges[“Swift”] = 5		// gán giá trị
```

Kotlin immutable Map:
```Kotlin
val namesAndAges = mapOf("Kotlin" to 8, "Swift" to 5)
```
Swift mutable Dictionary:
```Swift
var namesAndAges : [String: Int] = [:] 	// Khởi tạo
namesAndAges.reserveCapacity(20) 		// khởi tạo với capacity

namesAndAges[“Swift”] = 5	// gán giá trị
```
Swift immutable Dictionary:

```Swift
Let namesAndAges = ["Swift" : 5, "Kotlin" : 8]
```

### c. Function

Cách viết function, gọi function của Swift và Kotlin cũng có nét tương đồng dựa dựa giống nhau:

Kotlin function prototype:
```Kotlin
fun functionName(parameterName: DataType): ReturnType {
  //function body
}
```
Swift function prototype:
```Swift
func functionName(parameterName: DataType) -> ReturnType {
  //function body
}
```
Kotlin sample function:
```Kotlin
fun sayHello(name: String): String {
  return "Hello ${name}!"
}
```
Swift sample function:
```Swift
func sayHello(name: String) -> String {
  return "Hello \(name)!"
}
```
Kotlin default argument
```Kotlin
fun sayHello(name: String = “Kotlin”): String {
  return "Hello ${name}!"
}
```

Swift default argument
```Swift
func sayHello(name: String = “Swift”) -> String {
  return "Hello \(name)!"
}
```
Kotlin gọi hàm
```Kotlin
sayHello() //  Hello Kotlin!
```
Swift gọi hàm
```Swift
sayHello() //  Hello Swift!
```

### d. Swift Closure/Kotlin Lambda function

Closure trong Swift và lambda trong Kotlin là giống nhau. cả 2 đều là những block code. Thực chất, cả 2 là các function không được đặt tên, chúng có thể gán cho các biến và có thể được gán giữa các biến khác nhau. Khả năng coi function là variable là một trong những đặc trưng của dạng lập trình chức năng (functional programming)

#### Kotlin Lambda
```Kotlin
val square = { a:Int ->
  a * a
}

println(square(4)) //16
```

Kiểu trả về của Lambda được biểu thị bởi dấu “->”

Đối với các Lambda chỉ gồm 1 parameter như trên, chúng ta có thể sử dụng “it” để thay thế cho parameter “a” bên trong lambda
```Kotlin
val square = { a:Int ->
  it * it
}
```
#### Swift Closure
```Swift
var square = { (a: Int) -> Int in
  return a * a
}
print(square(4)) //16
```
Cũng giống Lambda, kiểu trả về của Closure  cũng được biểu thị bởi dấu “->”

Chúng ta cũng có thể viết gọn lại Swift bằng cách sử dụng placeholder parameter. Closure hơn Lambda ở chỗ Lambda chỉ có thể sử dụng “it” khi chỉ gồm 1 parameter, còn Closure thì có thể dùng với nhiều parameter bằng cách sử dụng “$0”, “$1”, “$2”,… Và thậm chí, chúng ta còn có thể bỏ luôn cả khai báo parameter trong closure
```Swift
square = {
  $0 * $0
}
print(square(4)) //16
```

# III. Tạm kết

Trên đây, tôi đã giới thiệu đến các bạn những điểm tương đồng giữa Swift và Kotlin trong cả cách viết biến, hàm, closure/lambda, các cấu trúc dữ liệu,... Trong phần sau của bài viết này, tôi sẽ giới thiệu tiếp các nét tương đồng của 2 ngôn ngữ về optional/nullable variable, class, class extension, control flow,... và cả những điểm khác biệt giữa Swift và Kotlin nữa. Các bạn nhớ đón đọc phần sau của bài viết này nhé.
Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này, have a nice day ^_^!