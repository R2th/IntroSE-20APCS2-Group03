## Mở đầu

Trong bất kỳ ngôn ngữ lập trình nào, chúng ta đều dùng các hàm để biểu diễn một hành động cụ thể. Ví dụ, nếu bạn muốn thêm các chi tiết về những sinh viên của một trường đại học thì thay vì phải viết những dòng code giống hệt nhau, bạn có thể định nghĩa chúng thành các hàm. Sau đó, bạn có thể gọi hàm đó nhiều lần nếu muốn. Cái hay của một hàm là nó có thể trả về giá trị nào đó. Ví dụ như là bạn có một hàm cộng 2 số thì nó sẽ trả về một số kiểu Integer bằng tổng của 2 số được nhập vào.

Nhưng các hàm có một vài hạn chế (khi được dùng theo cách thông thường). Thử nghĩ về một trường hợp khi bạn muốn lấy cả tên và tuổi của một sinh viên nào đó trong một trường đại học, thì nếu như bạn muốn theo cách dùng hàm, bạn sẽ chỉ có thể trả về duy nhất một giá trị mỗi lần. Nếu bạn muốn trả về nhiều hơn một giá trị cho các kiểu dữ liệu khác nhau (trong ví dụ này, tên sẽ là kiểu String, trong khi tuổi lại là kiểu Integer), thì bạn sẽ phải tận dụng một class dummy để khai báo tất cả các biến mà bạn muốn trả về từ hàm đó và sau đó phải tạo một object của class đó rồi lấy giá trị trả về trong một List nào đó.

Nhưng vấn đề ở đây đó là nếu bạn có quá nhiều thứ phải làm, ví dụ như có quá nhiều hàm để làm việc mà trả về nhiều hơn một giá trị thì bạn sẽ phải tạo từng class riêng biệt cho tất cả các hàm này để dùng. Điều này thật sự phức tạp và dài dòng.

Hiểu được tình trạng này, Kotlin đã ra mắt khái niệm **Pair** và **Triple**. Nhờ có Pair và Triple, bạn có thể trả về nhiều hơn một giá trị (2 trong trường hợp dùng Pair và 3 trong trường hợp dùng Triple) của các kiểu dữ liệu khác nhau.

Vì vậy, trong bài viết này, chúng ta sẽ cùng tìm hiểu về cách sử dụng Pair và Triple trong Kotlin. Bắt đầu thôi nào.

## Pair và cách dùng Pair

**Pair** là một lớp được định nghĩa sẵn trong Kotlin được dùng để lưu trữ và trả về 2 biến cùng một lúc. 2 biến này có thể có cùng kiểu hoặc khác kiểu với nhau. Vì vậy, bất cứ khi nào bạn muốn trả về nhiều hơn một biến từ một hàm thì bạn có thể dùng Pair trong hàm của mình. Nhưng dùng Pair như thế nào nhỉ ? Cùng xem nhé:

```Kotlin
Pair("Hello", "Kotlin") // Cả 2 biến đều có cùng kiểu String
Pair("Kotlin", 1) // Biến thứ nhất là String, biến thứ hai là Int
Pair(2, 20) // Cả 2 biến đều là kiểu Int
```

Bạn có thể sử dụng **Pair** theo cách như trên, ngoài ra bạn cũng có thể định nghĩa một biến nào đó rồi truyền biến đó vào trong **Pair**. Đoạn code dưới đây là một ví dụ:

```Kotlin
val variable1 = "Declaring String variable"
val variable2 = 1 // Khai báo một biến Int
Pair(variable1, variable2) // Sử dụng biến được khai báo trong class Pair
```

### Sử dụng thuộc tính first và second

Để truy xuất các giá trị được lưu trữ trong Pair, chúng ta có thể dùng các thuộc tính `first` và `second` của lớp Pair.

```Kotlin
val variable1 = "Declaring String variable"
val variable2 = 1 // Khai báo một biến Int
val variableName = Pair(variable1, variable2) // Sử dụng biến được khai báo trong class Pair
println(variableName.first) // In ra giá trị của variable1
println(variableName.second) // In ra giá trị của variable2
```

Ngoài ra, bạn cũng có thể gán các biến của Pair cho một biến khác và sử dụng các biến đó như dưới đây:

```Kotlin
val (firstVariable, secondVariable) = Pair("Hello", 1)
println(firstVariable)
println(secondVariable)
```

### Sử dụng componentN()

Ngoài cách sử dụng `first` và `second` như đã nói ở trên, chúng ta cũng có thể dùng phương thức componentN() với N là thứ tự của thuộc tính trong Pair.

```Kotlin
println(pair.component1()) // Tương đương với println(pair.first)
println(pair.component2()) // Tương đương với println(pair.second)
```


### Sử dụng infix "to"

Trong Kotlin, chúng ta có thể phân tách (destructure) khai báo biến bằng cách sử dụng hàm infix `to`.

```Kotlin
fun getWebsite() : Pair<String, String> {
  return "viblo.asia" to "the Website is"
}
```

và khai báo hàm `getWebsite()` như sau:

```Kotlin
val (url: String, website: String) = getWebsite()
println(url) // In ra "viblo.asia"
println(website) // In ra "the Website is"
```

### Sử dụng hàm toString()

`toString()` là một hàm được dùng để chuyển đổi các biến của *Pair* thành *String* và dùng các biến này như *String*.

```Kotlin
val variableName = Pair(variable1, variable2)
print(variableName.toString())
```

### Sử dụng hàm toList()

Hàm `toList()` chuyển đổi biến kiểu *Pair* về dạng *List*, ví dụ như bạn có thể dùng các biến *Pair* như các phần tử trong *List*.

```Kotlin
val variable1 = "Declaring String variable"
val variable2 = 1

val variableName = Pair (variable1, variable2)
val list = variableName.toList()

println(list[0]) // In ra giá trị của variable1
println(list[1]) // In ra giá trị của variable2
```

##  Triple và cách dùng Triple

**Triple** cũng là một class được định nghĩa sẵn trong Kotlin. Với việc sử dụng Triple, bạn có thể trả về 3 biến với cùng kiểu hoặc khác kiểu từ một hàm. Bạn cũng có thể dùng Triple để lưu trữ 3 biến với cùng kiểu.

Việc sử dụng Triple cũng giống như Pair trong Kotlin. Ví dụ dưới đây trình bày cách dùng Triple trong Kotlin:

```Kotlin
val variable1 = "Declaring String variable"
val variable2 = 1
val variable3 = "Declaring second string value"

val variableName = Triple (variable1, variable2, variable3)

println(variableName.first) // In ra giá trị của variable1
println(variableName.second) // In ra giá trị của variable2
println(variableName.third) // In ra giá trị của variable3
```

### Sử dụng toString() và toList()

Triple cũng có các hàm như `toString()` và `toList()` tương tự như **Pair**. Ví dụ dưới đây cho thấy các sử dụng `toString()` và `toList()` trong **Triple**.
```Kotlin
val variable1 = "Declaring String variable"
val variable2 = 1
val variable3 = "Declaring second string value"

val variableName = Triple (variable1, variable2, variable3) // Sử dụng biến được khai báo trong class Pair

println(variableName.toString())

val list = variableName.toList()
println(list[0])
println(list[1])
println(list[2])
```

## Tổng kết

Trong bài viết này, chúng ta đã học được cách dùng các lớp **Pair** và **Triple** trong Kotlin. Chúng ta thấy rằng nếu cần phải trả về nhiều hơn một giá trị từ cùng một hàm, chúng ta có thể dùng Pair (trong trường hợp có 2 biến) và Triple (trong trường hợp có 3 biến). Các biến được trả về của các lớp Pair và Triple có thể có cùng kiểu hoặc khác kiểu. Nếu bạn muốn trả về nhiều hơn 3 biến, bạn vẫn sẽ phải áp dụng phương pháp cũ trước đây. Có thể là tạo một class, định nghĩa các biến và dùng các biến bằng cách tạo mới một object của class đó.

Chúc các bạn thành công.

-----

Source: [MindOrks](https://blog.mindorks.com/pair-and-triple-in-kotlin), [Medium](https://medium.com/@agrawalsuneet/pair-and-triple-in-kotlin-c76c1d23c0ea)