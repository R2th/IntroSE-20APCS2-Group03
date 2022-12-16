Trong bài viết trước mình có nói đến cách hạn chế sử dụng các tính năng hay ho của Kotlin một cách quá mức, điều này sẽ gây ra các vấn đề không lường trước được về lâu dài. Trong bài này chúng ta sẽ tiếp tục tìm hiểu lại một số thứ hay ho nhé 

# 1. Check if the ‘lateinit’ Variable Is Initialized
Trong Kotlin, chúng ta có thể khai báo các biến bằng` var lateinit`, trong trường hợp đó, hệ thống sẽ không cấp phát bộ nhớ cho chúng cho đến khi chúng được khởi tạo ít nhất một lần.Tính năng này cải thiện hiệu suất của ứng dụng.

Mặt khác, biến `lateinit` không thể được khai báo bằng toán tử Elvis (`? :`), có nghĩa là những biến đó không được rỗng. Vì vậy, câu hỏi làm ta khó chịu là làm thế nào để kiểm tra biến `lateinit` hoặc trạng thái khởi tạo đối tượng. Hóa ra là khá đơn giản
```kotlin
lateinit var foo: Any

fun doSomething() {
    if (::foo.isInitialized) {
       // Use foo
    }
}
```
Nói chung là có thể bạn nhìn nó hơi dài dòng nhưng nó luôn đảm bảo tránh nối Lun Boi Tơ Ích Xép Xừn cho bạn

# 2. Use Underscore With Large Numbers
Trong thời đại ngày nay, rất nhiều dev làm việc với những dữ liệu con số lớn, ví dụ như thương mại điện tử, con số cũng lên đến cả nghìn tỷ :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye: 
```kotlin
class TeslaModelS {
    val finalPrice = 10000000
    val originalPrice = 10050000
    val discount = 50000
}
```
Thật khó để hiểu giá trị, phải không? Các dev mà làm việc trên các ứng dụng tài chính hoặc chứng khoán cũng sẽ phải đối mặt với các con số mơ hồ này ( so sánh thử 2 con số nghìn tỷ xem có hoa mắt chống mặt hay không ). Trong thực tế, chúng ta sử dụng dấu phẩy để phân cách hàng nghìn để có thể hiểu chúng một cách nhanh chóng. Tương tự như vậy, Kotlin có dấu phân cách cho hàng nghìn, nhưng đó là dấu gạch dưới. Hãy xem:
```kotlin
class TeslaModelS {
    val finalPrice = 1_00_00_000
    val originalPrice = 1_00_50_000
    val discount = 50_000
}
```
# 3. ‘takeIf’ & ‘takeUnless’
Kotlin cung cấp trải nghiệm phong phú khi bạn làm việc với `list` thông qua các chức năng mở rộng như `filter`, `map`, v.v. Điều đó thật tuyệt, nhưng bạn có biết chúng ta có thể sử dụng các hàm `takeif` và `takeUnless`, theo sau là `let` ở giữa để thực hiện thêm một số điều kiện. Xem ví dụ này nhé :
```kotlin
fun findMarvelMovies(movies : ArrayList<Movie>){
    movies.filter{ it.type.equals("Marvel",ignoreCase = true) }
        .takeIf (List<Movie>::isNotEmpty)
        .let {
        }
}
```
# 4. Debug With ‘also’
Mỗi developer sẽ có cách deubug code khác nhau.Nhưng bạn đã bao giờ nghe `also` được dùng để debug. Nghe lạ nhỉ. Nhưng thực sự nó rất tuyệt, đặt biệt là khi sử dụng vs các hàm `sorting`, `filter`, và `groupby`
```kotlin
fun findMarvelMovies(movies : ArrayList<Movie>) = 
    movies.filter{ it.type.equals("Marvel",ignoreCase = true) }.also (::println)
        .takeIf (List<Movie>::isNotEmpty).also (::println)
        ?.sortedBy { it.releaseDate }.also(::println)
        ?.groupBy { it.genere }.also(::println)
        ?.count()
```
Chúng ta không cần phải viết một block mới trong mỗi bước thực hiện. Điều này sẽ tiết kiệm rất nhiều thời gian cho các developer, những người mà thích sử dụng `log` nhiều hơn là `breakpoints`. Hãy xem kết quả nhé :
```java
// After filter
System.out: [Movie(releaseDate=3, id=0, rating=1.0, name=1, type=Marvel, isMarvelMoview=false, genere=action),
             Movie(releaseDate=1, id=0, rating=1.0, name=3, type=Marvel, isMarvelMoview=false, genere=Sc-Fi), 
             Movie(releaseDate=4, id=0, rating=1.0, name=4, type=Marvel, isMarvelMoview=false, genere=action)]

// After sorting by release date
System.out: [Movie(releaseDate=1, id=0, rating=1.0, name=3, type=Marvel, isMarvelMoview=false, genere=Sc-Fi), 
             Movie(releaseDate=3, id=0, rating=1.0, name=1, type=Marvel, isMarvelMoview=false, genere=action), 
             Movie(releaseDate=4, id=0, rating=1.0, name=4, type=Marvel, isMarvelMoview=false, genere=action)]

// After group by genere
System.out: {Sc-Fi=[Movie(releaseDate=1, id=0, rating=1.0, name=3, type=Marvel, isMarvelMoview=false, genere=Sc-Fi)], 
             action=[Movie(releaseDate=3, id=0, rating=1.0, name=1, type=Marvel, isMarvelMoview=false, genere=action), 
                     Movie(releaseDate=4, id=0, rating=1.0, name=4, type=Marvel, isMarvelMoview=false, genere=action)]}

```
# 5. Nested Functions
Chúng ta có thể viết một hàm bên trong một hàm khác, tương tự như các hàm lồng nhau trong Python, hay là C#. Phải nói là Kotlin kế thừa quà nhiều ưu điêm của C# luôn ý. Các hàm lồng nhau được áp dụng cho các hàm bên ngoài - chỉ các hàm bên ngoài mới có thể có các hàm lồng nhau. Các function bên trong được bảo vệ khỏi mọi thứ đang xảy ra bên ngoài hàm cha của nó. Hãy xem ví dụ này nào : 
```kotlin
fun loginValidation(username: String, password: String) : Boolean {
    fun validateInput(value: String){
        if (value.isEmpty()) {
            throw IllegalArgumentException("Should not be empty")
        }
    }
    validateInput(username)
    validateInput(password)
    return true
}
```
# 6. Lambda Expressions
Lambda là dạng hàm đơn giản nhất với single line expression (đa số là vậy ). Trong Kotlin, một hàm lambda được bao quanh bởi dấu ngoặc nhọn {}. Các hàm Lambda sẽ không có từ khóa `fun` hoặc bất kỳ access modifiers nào (`public`, `private`, và `protected`)  như các hàm thông thường. Hãy xem:
```kotlin
val message = { println("Hey, This is Kotlin lambda function") }
message() // function invoking value
```
Sẽ không có kiểu trả về trong lamda functions nhưng chúng ta có thể truyền biến vào đó 
```kotlin
val message = { value : String ->  println(value) }
message("custom value") // function invoking with value
```
# 7. ’infix’ Functions
Ký hiệu `infix` cho phép chúng ta gọi các hàm một đối số một cách nhanh chóng như là viết văn xuôi vậy đó. Để tạo một hàm `infix`, cần có hai đối số. Đối số đầu tiên là target object, trong khi đối số thứ hai là đối số thực được truyền cho function
```kotlin
class Fruit {
    var fruitType = "UnKnown"
    
    infix fun type(mType: String): Unit {
        this.fruitType = mType
    }
}
```
Tạo `infix functions` cũng giống như `inline functions `, nhưng nó khác ở điểm khi chúng ta sử dụng thì ta sẽ dùng `infĩx` thay vì việc dùng `inline`
```kotlin
val fruit = Fruit()
fruit type "apple"
```
Khi chúng ta sử dụng các hàm infix đúng chỗ, cú pháp sẽ minh bạch hơn và dễ đọc hơn so với các hàm thông thường. Giống như chữ viết vậy.
# 8. ‘associate’
Kotlin có rất nhiều chức năng mở rộng hữu ích liên quan đến các Collectión, một số có liên kết mở rộng như `To`, `With`, và `By`. `associate` là một  extension function trong `collections`với 3 biến thể : `associate`, `associateTo`, `associateBy`, `associateWith`.

> “Returns a Map containing key-value pairs provided by transform function applied to elements of the given array. ”— Kotlin documentation
>
Bạn có nhớ về `Pair`, nơi chúng ta có thể nối hai giá trị dưới dạng cặp  key-value không? `associate` tương tự như vậy, nhưng ở đây chúng ta hoạt động trên các giá trị bên trong `ArrayList` thay vì các giá trị ngẫu nhiên
```kotlin
data class Data(val id: Int, val name: String)
val list = listOf(
     Data( 1, "Tom"), 
     Data( 2, "Caleb"), 
     Data( 3, "Jessica"))
     
val associate = list.associate { Pair(it.id, it.name) }
println(associate)

// Output is a map of id and name.
// {1=Tom, 2=Caleb, 3=Jessica}
```
Tương tự như `associate`, `associateTo`, `associateBy` và `associateWith` tạo các loại `maps` khác nhau , như được hiển thị ở trên. Tóm lại  thì chúng đều tương tự nhau, nhưng mỗi cái có cách riêng để hữu ích trong một số trường hợp sử dụng.
# 9. Scope Functions Official Guide
Scope and extensions  thực sự rất phức tạp nhưng nó cũng là những  tính năng mạnh mẽ nhất trong Kotlin. Tôi đã nói về chúng trong các bài viết trước đây của loạt bài này. Nhưng cách đây vài ngày, mình vô tình xem được bài viết [này](https://www.droidcon.com/news-detail?content-id=/repository/collaboration/Groups/spaces/droidcon_hq/Documents/public/news/android-news/Kotlin%20scope%20and%20extension%20functions.%20How%20to%20not%20harm%20your%20code.) của tác giả Dmitry Sitnikov .  Và minh muốn chia sẻ một số nội dung hay ho của nó ở đây
![](https://miro.medium.com/max/700/1*SKs92b7rp34Lv2CMhREQjg.jpeg)

Nếu bạn đọc thật kỹ càng , ta có thể thấy là : theo mặc định, `let` trả về một hàm lambda không `null` nếu chúng ta sử dụng `?` , vì vậy sẽ hợp lý khi sử dụng nó khi có hàm tác động vào value của nó trong scope.

Không giống như `let`, `apply` trả về scope nơi chúng ta có thể gán các giá trị trên object  mà nó được áp dụng. Vì vậy, nó là hợp lý để sử dụng nó cho các config của object
```kotlin
val employee = Employee("Krish").apply {
    id = 150
    position = "developer"        
}
```
Tương tự như `apply`, `run` cũng trả về một phạm vi nơi chúng ta có thể config object  và hơn nữa có thể thực thi object 
```kotlin
val service = MultiportService("https://example.org", 67)

val result = service.run {
    port = 6767
    query(request() + " to port $port")
}
```
Cuối cùng với `with`, scope được thiết kế để thực thi nhiều thao tác trên đó. Ví du nè :
```kotlin
val numbers = mutableListOf("one", "two", "three")
with(numbers) {
    println("'with' is called with argument $this")
    println("It contains $size elements")
}
```
# Improve Readability
Trong một ngôn ngữ như Kotlin, chúng ta có nhiều cách để làm cùng một điều. Rất nhiều con đường để tới đích nhưng đi đường nào cho để không vi phạm Luật giao thông thì lại cần sự lựa chọn đúng đắn =)) . Hai chỉ số tạo nên sự khác biệt đó là đường nào nhanh hơn và lại dễ đi hơn . À đùa thôi đó là hiệu suất và tính dễ đọc. Nhiều developer tập trung vào hiệu suất và bỏ qua phần dễ đọc. Đi được con đường tắt lại gập  gềnh sỏi đó thì đi đường xa mà nhăn nhụi còn hơn phải không nòa .
Khi sản phẩm của bạn phát triển, nhóm của bạn cũng vậy, trong trường hợp đó, điều cần thiết là làm cho mã của bạn rõ ràng và dễ đọc nhất. Hãy xem một ví dụ đơn giản trong đó chúng ta đang gọi một hàm trong một lớp trả về một đối tượng có hai trường sau đó gán các giá trị đó cho các dạng xem. Một cách để thực hiện việc này như hình dưới đây:
```kotlin
with(avenger.getAvangerTeams()){
  tvAvangerOne = first
  tvAvangerTwo = second
}
```

Đoạn code trên  sử dụng `with` để hoàn thành công việc. Không có gì sai vớ nó cả. Nhưng khi các thành viên khác nhìn thấy code, trông nó thật thiếu ý nghĩa  vì họ không biết đầu ra của `getAvangerTeams` là gì hoặc `first` và `second` là cái của nợ gì.
Để nó có thể clear hơn chút thì ra sẽ sử dung `let`  để thể hiện được output mà ta đề cập đến là gì : 
```kotlin 
avenger.getAvangerTeams().let{ (startTeam, captainTeam)
  tvAvangerOne = startTeam
  tvAvangerTwo = captainTeam
}
```
Với cách tiếp cận này, những người còn lại trong team sẽ dễ dàng hiểu rõ  là  sẽ có hai đầu ra một cái tên phù hợp, rõ nghĩa, đủ để clean .
Điều này tốt hơn nhưng vẫn chưa đủ . Hoặc, nói thẳng ra: Nó quá `Kotlin-y`. Mình nghĩ không cần thiết phải sử dụng hàm lambda. Lạm dụng lạm dụng quá à giống như bài viết trước mình cũng có nói .Chúng ta có thể lấy các kết quả đầu ra trong câu lệnh đầu tiên và sử dụng chúng trong các bước sau. Hãy xem nè: 
```kotlin
val(startTeam, captainTeam) = avenger.getAvangerTeams()
tvAvangerOne = startTeam
tvAvangerTwo = captainTeam
```
Theo quan điểm của cá nhân mình, nó trông chính xác và dễ đọc hơn, ngay cả đối với một người mới trong team của bạn. Kotlin có những tính năng mạnh mẽ nhất để làm điều này, nhưng không có nghĩa là chúng ta phải sử dụng chúng. Đôi khi đơn giản hơn là đào sâu
Đi đường nhanh  rồi thì đừng cố chạy tốc độ khủng khiếp quá, Kẻo đến đích rồi lại không kịp phanh và bay đi tận xa nha (hihi).

Bài viết hôm nay lại khá dài rồi, hy vọng là mọi người khi đọc những dòng viết này đều đã đọc hết phần nội dung bên. Dù nó là bài viết đi dịch thôi nhưng dù sao nó cũng chứa đựng những kiến thức quý báu . Đã mất công xem thì xem cho kỹ, đã mất công đọc thì đọc cho đủ. Hihi. Bài viết được mình xào bới từ [Medium](https://medium.com/better-programming/advanced-programming-in-kotlin-part-5-b674ce9e692f) . Hy vọng là bạn hứng thú với nó.
Các bạn cũng có thể đọc qua các bài viết khác trong seri Kotlin của mình nhé : https://viblo.asia/s/kotlin-cac-tinh-nang-doc-quyen-ma-ban-nen-su-dung-P0lPmrXv5ox