## Hàm trong Kotlin (2)
Tiếp tục chương 2 về Diving Deeper into functions, chúng ta sẽ tiếp tục tìm hiểu về `Returns and Local Returns`, `Tail Recursion `, `Operator Overloading`, `Lambda Extensions`, `Invoking instances`, `Functional Constructs` trong Kotlin. 

### 5. Returns and Local Returns
Cùng theo dõi [ ví dụ](https://kotlinlang.org/docs/reference/returns.html#return-at-labels) lấy từ trang chủ [kotlinlang.org](https://kotlinlang.org):

Vd 1:
```
fun foo() {
    listOf(1, 2, 3, 4, 5).forEach {
        if (it == 3) return
        print(it)
    }
    println("this point is unreachable")
}
```
> Kết quả: `12`

Vd 2:
```
fun foo() {
    listOf(1, 2, 3, 4, 5).forEach lit@{
        if (it == 3) return@lit
        print(it)
    }
    print(" done with explicit label")
}
```
> Kết quả: `1245 done with explicit label`

Vd 3:
```
fun foo() {
    run loop@{
        listOf(1, 2, 3, 4, 5).forEach {
            if (it == 3) return@loop // non-local return from the lambda passed to run
            print(it)
        }
    }
    print(" done with nested loop")
}
```
> Kết quả: `12 done with nested loop`

Quan sát các ví dụ trên, khi ta sử dụng `non-return` trong function sẽ, function sẽ trả về tại `return`.

Nhưng đôi lúc chúng ta cần trả về từ một biểu thức lambda(như ở trong vd 2, chúng ta chỉ không xử lí khi gặp  tham số `= 3`, sau đó forEach vẫn tiếp tục được chạy ) ta cần gắn nhãn cho dãy đó và điều kiện trả về.

Mở rộng hơn, muốn duyệt hết phần tử, theo mình, dạng như break trong Ruby, ta có thể sử dụng `loop@` kết hợp forEach.

### 6. Tail Recursion
Kotlin cũng cho hỗ trợ lập trình đệ quy đệ quy đuôi. 
>  Có 2 loại đệ quy chính là đệ quy đầu và đệ quy đuôi. Đệ quy đầu là một hàm sẽ gọi đệ quy rồi mới thực hiện các phép tính khác trong hàm, có thể sử dụng kết quả của phép đệ quy trước đó. Đệ quy đuôi là tất cả phép tính được thực hiện trước rồi mới gọi đệ quy sau cùng.

>    Để tìm hiểu kĩ hơn về đệ quy và đệ quy đuôi, tham khảo bài [Đệ quy đuôi (Tail Recursive Function) trong Scala](https://viblo.asia/p/de-quy-duoi-tail-recursive-function-trong-scala-zoZVRg9LGmg5) của tác giả [Nguyen Cong Thanh](https://viblo.asia/u/thanhnc)
>  
Cùng theo dõi ví dụ tại [baeldung.com](http://www.baeldung.com/kotlin-tail-recursion) về dãy fibonacci:
```
fun recursiveFactorial(n: Long) : Long {
    return if (n <= 1) {
        n
    } else {
        n * recursiveFactorial(n - 1)
    }
}
```
Và chú ý, phiên bản hiện tại của Kotlin chỉ hỗ trợ đệ quy trong JVM backend.
### 7. Operator Overloading
Trong kotlin và trong mọi ngôn ngữ từng biết , chúng ta luôn phải định nghĩa trước các toán tử để có thể thực hiện các hoạt động nhất định. Đơn giản như các phép cộng, trừ, nhân, chia và một số toán tử cần thiết nữa. Trong Kotlin có lẽ sẽ rõ ràng hơn trong việc định nghĩa và sử dụng các toán tử. 

#### Toán tử đơn nhất
| +a| a.unaryPlus() |
| -------- | -------- |
| -a     | a.unaryMinus()     |
| !a   | a.not()  |
| a++     | a.inc()     |
| a– | a–    |

#### Toán tử nhị phân
| a + b     | a.plus(b)     | 
| -------- | -------- |
| a – b     | a.minus(b)     | 
| a * b     | a.times(b)     | 
| a / b     | a.div(b)     | 
| a % b     | a.mod(b)     | 
| a..b     | a.rangeTo(b)     | 
| a in b     | b.contains(a)     | 
| a !in b     | !b.contains(a)     | 
| a += b	     | a.plusAssign(b)     | 
| a -= b     | a.minusAssign(b)     | 
| a *= b     | a.timesAssign(b)     | 
| a /= b     | a.divAssign(b)     | 
| a %= b     | a.modAssign(b)    | 

#### Toán tử khi làm việc với mảng

| a[i] | a.get(i) |
| -------- | -------- |
| a[i, j] | a.get(i, j) |
| a[i_1, …, i_n] | a.get(i_1, …, i_n) |
| a[i] = b | a.set(i, b) |
| a[i, j] = b | a.set(i, j, b) |
| a[i_1, …, i_n] = b | a.set(i_1, …, i_n, b) |

#### Toán tử so sánh
| a == b | a?.equals(b) ?: b === null |
| -------- | -------- |
| a != b	 | !(a?.equals(b) ?: b === null) |

Trong giới hạn bài viết bạn sẽ có cái nhìn tổng quát về Operator Overloading trong Kotlin, để đi sâu hơn bạn có thể truy cập [Kotlin Operator Overloading](https://www.programiz.com/kotlin-programming/operator-overloading). Đây là một bài viết khá chi tiết và đầy đủ về Kotlin Operator Overloading thông qua các ví dụ.

### 8.  Kotlin's invoke operator
Bài viết được tham khảo tại: [joshskeen.com](http://joshskeen.com/kotlins-invoke-operator/)
Điều thú vị đối với Kotlin là nó có khả năng định nghĩa "invoke operator". Có nghĩa là khi bạn chỉ định toán tử gọi trên một lớp, nó có thể được gọi trên bất kỳ cá thể nào của lớp mà không có tên phương thức! Phương pháp này có vẻ đặc biệt hữu ích cho các lớp thực sự chỉ có một phương pháp được sử dụng.

Theo dõi ví dụ:
```
class Socket  
class UrlScraper(val socket: Socket) {

    inner class ParseResult

    operator fun invoke(url: String): List<ParseResult> {
        //do cool stuff here with the url
        //eventually produces a list of ParseResult objects
        return listOf(ParseResult(), ParseResult())
    }
}
```
Khi bạn sử dụng toán tử `invoke`, `UrlScraper` có thể được sử dụng mà không cần phải gọi bất kì một phương thức nào trên nó, chỉ cần tham số đầu vào đáp ứng kiểu dữ liệu của toán tử `invoke` là quá đủ để sử dụng:

```
fun main(args: Array<String>) {  
    val urlScraper = UrlScraper(Socket())
    urlScraper("www.google.com") //calls the invoke method you specified
}
```
Phương pháp này khá hữu ích đối với các lớp chỉ có 1 phương thức công khai. Khi đó ta chỉ cần truyền tham số vào trong hàm gọi mà không cần phải gọi lại tên function.

### 9.  Functional Constructs
Kotlin có thể có một `primary constructor` và một hoặc nhiều `secondary constructors`. 

**Primary constructor** nằm ở đầu class, ngay sau tên class:
```
class Person constructor(firstName: String) {

}
```
Nếu như primary construtor không có chứa các chú thích (annotations) và các modifiers(private, protected,public) thì có thể loại bỏ từ khóa constructor khỏi khai báo:
```
class Person(firstName: String) {

}
```
**Primary constructor**  không thể chứa bất kỳ mã nào. Mã khởi tạo có thể được đặt trong các khối khởi tạo, được bắt đầu bằng từ khóa **init**.
```
class InitOrderDemo(name: String) {
    val firstProperty = "First property: $name".also(::println)

    init {
        println("First initializer block that prints ${name}")
    }

    val secondProperty = "Second property: ${name.length}".also(::println)

    init {
        println("Second initializer block that prints ${name.length}")
    }
}
```

Lớp này cũng có thể khai báo các hàm tạo thứ cấp(**secondary constructors**), được bắt đầu bằng hàm tạo:
```
class Person {
    constructor(parent: Person) {
        parent.children.add(this)
    }
}
```
Ở ví dụ này **Primary constructor**  được khai báo mặc định là null, **secondary constructors** được định nghĩa với biến khởi tạo `parent: Person`

```
class Person(val name: String) {
    constructor(name: String, parent: Person) : this(name) {
        parent.children.add(this)
    }
}
```
Ở đâynày **Primary constructor**  được khai báo với 1 tham số đầu vào, **secondary constructors** được định nghĩa với 2 tham số.

```
class Constructors {
    init {
        println("Init block")
    }

    constructor(i: Int) {
        println("Constructor")
    }
}
```
Cuối cùng: **Primary constructor** được định nghĩa trong một khối thông qua từ khóa init, **secondary constructors**  được khởi tạo với 1 tham số.

Vậy là tôi đã giới thiệu xong chương 2  [**Diving Deeper into functions**](https://viblo.asia/p/advanced-kotlin-programming-diving-deeper-into-functions-ORNZq9BrZ0n), chúng ta đã hiểu sơ qua về các function, cách khởi tạo và cách sử dụng function trong Kotlin. 

Rất vui khi nhận được sự đóng góp của các bạn. Hẹn gặp mọi người tạị chương tiếp theo [**Class Scenarios**](https://viblo.asia/s/advanced-kotlin-programming-Wj53Omz156m).

Bài viết được tổng hợp từ nhiều nguồn:

https://kotlinlang.org/docs

https://viblo.asia/p/de-quy-duoi-tail-recursive-function-trong-scala-zoZVRg9LGmg5

http://www.baeldung.com/kotlin-tail-recursion

https://www.programiz.com/kotlin-programming/operator-overloading

http://joshskeen.com/kotlins-invoke-operator/