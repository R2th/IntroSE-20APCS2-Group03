**Data Class** là từ khóa mà có lẽ ai học kotlin cũng đều biết vì tính gọn nhẹ và hữu ích của nó. Chúng ta thường xuyên tạo các class có mục đích chính là lưu trữ dữ liệu, trong Java chúng ta gọi là các POJO class. 

Để hoạt động tốt, trong những class như vậy, chúng ta vẫn phải cài đặt một cách máy móc lặp đi lặp lại các phương thức như `getter, setter, equals, ...  ` để đối tượng được sinh ra đảm bảo tính OOP.
Khi chuyển sang Kotlin, thì những việc làm như vậy có lẽ trở nên dư thừa khi có **Data Class**. Vậy thì cụ thể như thế nào thì chúng ta cùng tìm hiểu tiếp nhé. 

## 1. Cú pháp khai báo một Data Class

Ở Kotlin, một  **Data Class**  được khai báo như sau: 
``` Kotlin
data class User(val name: String, val age: Int)
```
Mỗi khi chúng ta khai báo như vậy. Class `User` sẽ được trình biên dịch tự động sinh ra các đoạn code cho các hàm:
- `getter/setter`
- `equals()/hashCode()`
- `toString() `
- `componentN()`
- `copy()`

Tuy nhiên, về mặt cú pháp, khi sử dụng data class cũng yêu cầu một số quy tắc nhất định để đảm bảo những đoạn code sinh ra có tính nhất quán và thực hiện đúng ý nghĩa:    
- Hàm `constructor` chính phải có ít nhất một tham số truyền vào
- Tất cả các tham số truyền vào trong hàm `constructor` chính phải được khai báo là val hoặc var 
- Những data class không thể là `abstract`, `open`, `sealed` hay là `inner`
- Nếu sử dụng Kotlin phiên bản trước 1.1, `Data class` chỉ có thể implement các `interface`.
- Từ Kotlin 1.1 trở đi, `Data class` có thể kế thừa những class khác

Nếu so sánh với JVM, khi `data class` cần có một hàm `constructor` rỗng (không có tham số nào) thì hãy thêm những giá trị mặc định cho tất cả thuộc tính
``` Kotlin
data class User(val name: String = "", val age: Int = 0)
```

## 2. Khai báo thuộc tính bên trong Data Class có gì khác ? 

Với những thuộc tính khi chúng ta khai báo ở trong hàm constructor của data class, trình biên dịch sẽ tự động sinh ra cho chúng ta những phương thức tự động. Còn những thuộc tính khi khai báo bên trong class sẽ không được sinh tự động như vậy.  

Vì trình biên dịch chỉ sử dụng các thuộc tính được xác định bên trong hàm `constructor` chính cho các hàm được tạo tự động. Với những thuộc tính không cần có nhu cầu sinh code tự động, hãy viết ở trong thân class:

``` Kotlin
data class Person(val name: String) {
    var age: Int = 0
}
```

Theo như cách cài đặt trên, chỉ có name sẽ được sử dụng bên trong những phương thức `toString(), equals(), hashCode(), copy()`, ...
Trong khi hai đối tượng `Person` có thể có `age` khác nhau, nhưng chúng vẫn sẽ được coi là bằng nhau. 
``` Kotlin
val person1 = Person("John")
val person2 = Person("John")
person1.age = 10
person2.age = 20
```

## 3. Cách để copy một đối tượng của Data Class 
Đôi khi chúng ta cần `clone` một đối tượng đã có nhưng có sự thay đổi ở một vài thuộc tính. Vậy thì với **Data Class** , từ khóa `copy` đã giải quyết cho chúng ta vấn đề này. 
Thông thường chúng ta cần sao chép một đối tượng thay đổi một số thuộc tính của nó nhưng giữ cho phần còn lại không thay đổi. Đây là function `copy()` được tạo. Đối với lớp `Person` ở trên, việc triển khai của nó sẽ như sau:
``` Kotlin
fun copy(name: String = this.name, age: Int = this.age) = User(name, age)
```

Điều đó sẽ cho phép chúng ta viết: 
``` Kotlin
val jack = User(name = "Jack", age = 1)
val olderJack = jack.copy(age = 2)
```

## 4. Tối giản việc khai báo với một Data Class 

Các `Component functions` đã sinh ra cho `data class` chp phép tiêu giảm trong việc khai báo: 
``` Kotlin
val jane = User("Jane", 35) 
val (name, age) = jane
println("$name, $age years of age") // prints "Jane, 35 years of age"
```

## 5. Một số Data Class tiêu chuẩn

Thư viện tiêu chuẩn cung cấp `Pair` và `Triple`. Tuy nhiên, chúng ta vẫn khuyến khích việc đặt tên cho những `data class` vì như vậy sẽ làm cho những đoạn code của chúng ta dễ đọc và dễ bảo trì hơn. 
Ngoài ra đối tượng của class `Pair` đôi khi được khởi tạo nhanh bằng từ khóa `to` kết nối 2 giá trị 
``` Kotlin 
println(Triple<Int, Int, String>(3, 2019, "Sun Asterisk")) // (3, 2019, Sun Asterisk)
println(Pair<Int, String>(2019, "Sun Asterisk")) // (2019, Sun Asterisk)
println(2019 to "Sun Asterisk") // (2019, Sun Asterisk)
```

## 6. Data Class and Builder Design Pattern

Ở bài trước, mình đã giới thiệu với các bạn về chủ đề [Builder Pattern](https://viblo.asia/p/builder-design-pattern-6J3ZgjwgKmB). 

Nhìn chung Builder Pattern giải quyết cho chúng ta 2 bài toán: 
* Quá nhiều tham số truyền vào trong một hàm constructor, đôi khi không cần thiết
* Thứ tự các tham số hàm constructor quá nhiều, khó để nhớ được thứ tự tham số 

Với 2 bài toán trên, Builder Pattern đã giải quyết cho chúng ta một cách triệt để, tuy nhiên ở trong Kotlin thì sao? 

Trong Kotlin, ` Data Class` đã hỗ trợ chúng ta trong việc xây dựng những class  có nhiều trường, đôi khi không cần dùng đến` Builder Pattern` nữa. 

Thực sự là như vậy, các bạn hãy thử xem `Data Class` đã giải quyết 2 vấn đề của chúng ta như thế nào nhé!

### 6.1 Bài toán đầu tiên: Quá nhiều tham số truyền vào trong một hàm constructor, đôi khi không cần thiết

Để giải quyết vấn đề này, `Data class` đã hỗ trợ chúng ta trong việc xây dựng những giá trị mặc định 

Với việc khai báo một `class` như này: 
``` Kotlin
data class Student(
    val id: String, 
    val name: String, 
    val gender: String = "Male", 
    val country: String = "Vietnam",
    val address: String? = null
)
```

Nếu như không cần quan tâm tới các trường như `gender`, `country` hay `address`, ta có thể không cần phải truyền những tham số liên quan tới chúng.
``` Kotlin
val student = Student("1234", "Tran Quang Huy")
println(student) // Student(id=1234, name=Tran Quang Huy, gender=Male, country=Vietnam)
```

Như vậy bài toán thứ nhất đã giải quyết xong, vậy bài toán thứ 2 thì sao nhỉ? 

### 6.2 Bài toán thứ hai: Thứ tự các tham số hàm constructor quá nhiều, khó để nhớ được thứ tự tham số.

Như mình đã giới thiệu ở phần trên, chúng ta hoàn toán có thể định nghĩa rõ ràng những tham số truyền vào thuộc về trường nào mà không cần quan tâm tới thứ tự của chúng trong data class.

Ví dụ, cùng một việc khởi tạo đối tượng Student như trên, mình có thể viết như này: 
``` Kotlin
val student = Student(name = "Tran Quang Huy", id = "1234", country = "Japan")
println(student)// Student(id=1234, name=Tran Quang Huy, gender=Male, country=Japan)
```
Như vậy, với `data class`, không những không cần quan tâm thứ tự các tham số truyền vào, mà khi đọc code, chúng ta lại có thể hiểu được những tham số ấy thuộc về trường nào. 

Đến đây, bạn thử tưởng tượng việc thiết kế `Builder Pattern` đồ sộ so với những dòng code ngắn gọn của `data class`, bạn sẽ thích cái nào hơn?

Tuy nhiên việc gì cũng có ưu và nhược điểm của nó, cụ thể mình đã viết khá đầy đủ ở [bài viết](https://viblo.asia/p/data-class-hay-builder-design-pattern-L4x5x6WmZBM), mời các bạn đọc thêm nếu có hứng thú. 

## Reference
Bài viết được dịch từ docs của Kotlin: https://kotlinlang.org/docs/reference/data-classes.html

Cảm ơn bạn [Lê Hồng Phúc](https://viblo.asia/u/phucynwa) đã giúp dỡ để mình có thể hoàn thành bài viết.