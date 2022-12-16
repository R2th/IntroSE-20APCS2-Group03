Generics có nghĩa là chúng ta sử dụng một class hoặc một cách implement theo cách rất chung chung. Ví dụ, interface List cho phép chúng ta tái sử dụng code. Chúng ta có thể tạo một danh sách String, danh sách integer và chúng ta sẽ có các hoạt động giống nhau ngay cả khi các kiểu là khác nhau. Vì vậy, danh sách như một chức năng chung cho mỗi lần implement.

Kotlin cho phép bạn sử dụng các parameters cho các methods và attributes, tạo ra các lớp được tham số hóa.

### 1. Type vs Class vs Subtype
* `Type` mô tả các thuộc tính mà một tập hợp các đối tượng có thể chia sẻ.
* `Class` chỉ là một implement của Type đó.
* Một `subtype` phải chấp nhận ít nhất là cùng một loại các types như khai báo supertype của nó.
* Một `subtype` phải trả về tối đa cùng một loại các types như khai báo supertype của nó.

![](https://images.viblo.asia/81d1b436-7c74-4f10-9c93-1c125eb1ee44.png)

### 2. Variance
Variance cho biết cách subtyping giữa các types phức tạp hơn liên quan đến subtyping giữa các thành phần của chúng.

Quy ước: E = element  | T = type | K = key  | V = value

Code Sample:
```
data class Course(val name: String)

class OddList<T>(val list: List<T>) {
    fun oddItems(): List<T> {
        return list.filterIndexed { index, _ -> index % 2 == 1 }
    }
}

fun main() {
 val listOfStrings = listOf("Kotlin", "Java", "C#")
    val resultOfStrings: OddList<String> = OddList(listOfStrings)
    println(resultOfStrings.oddItems())

    val listOfInts = listOf(1, 7, 8, 9, 12, 45)
    val resultOfInts = OddList(listOfInts)
    println(resultOfInts.oddItems())

    val courses = listOf(
        Course("Kotlin"),
        Course("Java"),
        Course("C#"),
        Course("PHP"),
        Course("C++")
    )
    var resultCourses = OddList(courses).oddItems()
    println(resultCourses)
}
```

### 3. Covariance
* Nếu C <T> là kiểu generic có tham số type T và U là kiểu con của T, thì C<U> là kiểu con của C<T> 
* Ví dụ: List<Int> là một kiểu con của List<Number> vì Int là một kiểu con của Number.
* Áp dụng cho các kiểu là "producers", hoặc "source" của T
* T chỉ xuất hiện ở vị trí "out", tức là kiểu trả về của function

![](https://images.viblo.asia/1de4fc2f-cf11-40d1-8065-c6d2730ff2c3.png)

    
Code Sample:
    
```
class CovarianceSample<T>

fun main() {
  val firstSample: CovarianceSample<Any> = CovarianceSample<Int>()  // Error: Type mismatch
  val secondSample: CovarianceSample<out Any> = CovarianceSample<String>() // OK , String is a subtype of Any
  val thirdSample: CovarianceSample<out String> = CovarianceSample<Any>() // Error: Type mismatch
}
```
    
### 4. Contravariance
* Nếu C<T> là kiểu generic có tham số type T và U là subtype của T, thì C<T> là subtype của C<U>
* U là subtype của T ⇒ C<T> là subtype của C<U>
* Ví dụ: Function1<Number, Int> là một subtype của Function1<Int, Int> vì Int là một subtype của Number.
* Áp dụng cho các kiểu là “consumers” của T.
* T chỉ xuất hiện ở vị trí “in”, tức là type của function argument

![](https://images.viblo.asia/38cf288a-9819-455a-8021-69d47c2e2aa7.png)

Code Sample:

```
open class Vehicle
class Bicycle : Vehicle()
class Container<in T>

fun main() {
  var containerBicycle: Container<Bicycle> = Container<Vehicle>() // OK
  var containerVehicle: Container<Vehicle> = Container<Bicycle>() // Error: Type mismatch
}
```
 
### 5. Invariance
* Nếu C<T> là một kiểu subtype của C<U>, thì T = U
* Ví dụ: Array<T> là invariant trong T
* T xuất hiện ở cả hai vị trí "in" và "out"
* Type vừa là producer vừa là consumer của T
* Nhớ rằng: Lambdas là biến thể đối lập(contra-variant) trong các kiểu đối số và biến đổi(covariant) trong kiểu trả về của chúng
    
![](https://images.viblo.asia/698f8417-2b10-4b4b-a6b7-df71cae293a5.png)

### 6. Type projections
* Kiểu projection là một kiểu đã được giới hạn theo một số cách nhất định để có được các đặc điểm variance bằng cách sử dụng use-site variance.
    
### 7. Star projection
* Chúng có ích khi chúng ta không biết gì về kiểu của đối số, nhưng cần sử dụng chúng một cách an toàn.
* Cách an toàn ở đây là định nghĩa một projection của kiểu generic, rằng mọi khởi tạo cụ thể của kiểu generic đó sẽ là một kiểu subtype của projection đó.
* Thay vì sử dụng C<in Nothing> hoặc C<out Any?>, Bạn có thể sử dụng C<*>. Nó tạo ra interface hiệu quả tương tự như hai cách tiếp cận khác:
* Vì vậy, chúng ta có ba cách có thể chấp nhận bất kỳ loại generic nào:
    * in-projection – <in Nothing>
    * out-projection – <out Any?>
    * star-projection – <*>
    
Code Sample:
```
val languages = arrayOf("Kotlin", "Java", "Generics", 1)
printArray(languages)
```

### 8. Type erasure and reified type parameters
* Java có các giới hạn đối với các kiểu được coi là có thể xác định lại(reifiable) - có nghĩa là chúng hoàn toàn có sẵn trong thời gian chạy (xem Java SE về các kiểu reifiable)
* Các kiểm tra an toàn kiểu mà Kotlin thực hiện cho việc sử dụng khai báo generic chỉ được thực hiện tại thời điểm biên dịch. Trong thời gian runtime, các thể hiện của các kiểu generic không chứa bất kỳ thông tin nào về các đối số kiểu thực tế của chúng.
* Thực thi các ràng buộc kiểu chỉ tại thời gian biên dịch và loại bỏ thông tin type phần tử khi runtime.
* Các thông tin type được cho là bị xóa.
* Trong trường hợp các tham số kiểu type trong Kotlin, chúng ta có thể so sánh các type và get các đối tượng Class.
* Reified types parameters:
    * Chỉ hoạt động với các functions (hoặc thuộc tính extension có function get())
    * Làm việc với các functions được khai báo là inline
* Ưu điểm của việc sử dụng các tham số kiểu Reified:
    * kiểm tra kiểu với is
    * casts mà không có cảnh báo unchecked cast
    * gán các đối tượng lớp bằng cách nối thêm ::class.java vào tên tham số. Ví dụ: val a = T::class.java    
    
Code Sample:
```
// single param
inline fun <reified T> Any.isInstanceOf(): Boolean = this is T

fun main() {
  val isStringAString = "String".isInstanceOf<String>()
  val isIntAString = 1.isInstanceOf<String>()
}

// multiple params
inline fun <reified T, reified U> haveSameType(first: T, second: U) = 
        first is U && second is T

// extension properties, but the type parameter is used as the receiver type
inline val <reified T> T.theClass
    get() = T::class.java
```

Ref: https://magdamiu.com/2020/06/21/generics-in-kotlin/