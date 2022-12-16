Hiện nay hầu hết các lập trình viên android đã chuyển từ java sang kotlin và những công ty IT cũng bắt đầu định hướng cho những thực tập sinh học ngôn ngữ kotlin ngay từ những buổi đầu thực tập. Không phải các lập trình viên quay đầu với java, java quả thật là bầu trời bao la để học tập nó làm được mọi thứ từ web, mobile, mạng, game, ... mà do kotlin đã khá tối ưu trong việc phát triển android mobile. Với hàng loạt tính năng kotlin đem lại giúp chúng ta code ngắn gọn, dễ hiểu và ít bug hơn.

Ở bài viết này, mình muốn cùng các bạn tìm hiểu và đi sâu vào một trong những tính năng mà kotlin đem lại cho chúng ta. Đó chính là tiêu đề của bài viết. 

Chắc chắn một ai khi học kotlin cũng đã nghe qua định nghĩa này và ít nhiều cũng xem qua. Nhưng chưa hẳn đã nắm rõ và còn phân vân khi nào sẽ sử dụng loại nào. Vậy thì hãy cùng mình tìm hiểu nào ! 
## 1. Scoped function trong kotlin là gì ?
Có 5 loại scoped function trong kotlin: let, run, with, also và apply. Chúng ta sẽ tìm hiểu kỹ chúng trong phần tiếp theo.

Vậy chúng là gì ?

Những function này nó cung cấp cho chúng ta một cách để truy cập vào phạm vi tạm thời của đối tượng đang được xem xét, nơi các hoạt động cụ thể có thể được áp dụng cho đối tượng trong khối mã. 

Ở đây mình lấy một ví dụ vui chỉ để các bạn dễ hiểu là: Hãy thử tưởng tượng là bạn dùng những scoped function để vào một ngôi nhà, sử dụng đồ đạc trong ngôi nhà đó. Tuỳ thuộc vào từng cái scoped function mà bạn sẽ làm gì trong đó. Phần còn lại thì các bạn tự tưởng tượng trong phần tiếp theo nhé.

Để vào phần tiếp theo có hai từ khoá các bạn cần nên hiểu đó là **it** và **this**. Cả hai keyword này bạn sẽ hơi khó hiểu nhưng đừng lo lắng. Chúng ta cùng vào những ví dụ để hiểu rõ nó ngay bên dưới.
## 2. Tìm hiểu các loại scoped thông qua ví dụ:
Chúng ta có một class như sau:
```
class Person(var name : String, var age: Int, var address: String) {
    override
    fun toString(): String {
        return "Name: ${name}, age: ${age}, address: ${address}"
    }
}
```
### let
```
    val person = Person("Nguyen Van A", 23, "Quang Nam")
    val value = person.let {
        it.name
    }
    println(value)
    // output = Nguyen Van A
```
Mặc dù let thao tác trong đối tượng person nhưng output lại là tên của person. Điều này có nghĩa **let** cung cấp cho ta quyền truy cập vào đối tượng và trả về một giá trị bất kỳ tuỳ vào use case của ta. Rất thuận lợi phải không nào. Ví dụ trường hợp ta cần truy cập vào đối tượng nào đó và thực hiện một số logic để lấy giá trị cần thiết dựa vào thuộc tính trong đối tượng. Như ví dụ đơn giản bên dưới:
```
    val person = Person("Nguyen Van A", 23, "Quang Nam")
    val value = person.let {
        if (it.age >= 18) {
            true
        } else {
            false
        }
    }
    println(value)
    // output: true
```

Lưu ý nó sẽ trả về dòng lệnh không gán dưới cùng trong scope.

Trong trường hợp bên trong scope dòng cuối cùng là một dòng gán dữ liệu thì giá trị trả về sẽ là kiểu Unit trong kotlin.
```
    val person = Person("Nguyen Van A", 23, "Quang Nam")
    val value = person.let {
        it.name = "Tran Van C"
    }
    println(value)
    // output: kotlin.Unit
```

Những lợi ích khác của **let** phải kể đến là: 
* Nó tham chiếu tới đối tượng person bằng từ khoá **it**. Và có ta hoàn toàn có thể thay thế giá trị của person thông qua **it**. Còn đối với trường hợp sử dụng **let** lồng nhau ta có thể dễ dàng thay từ khoá **it** bởi một keyword khác như ví dụ bên dưới:
```
    val person = Person("Nguyen Van A", 23, "Quang Nam")
    val value = person.let {
        it.name.let { name ->
            "Nested let $name"
        }
    }
    println(value)
```
* Nó giúp chúng ta dễ dàng kiểm tra null. Nếu null thì bỏ qua, còn không null thì sẽ vào khối scope của nó như ví dụ.
```
    // edit class Person -> var address: String?
    val person = Person("Nguyen Van A", 23, "Quang Nam")
    val value = person.address?.let {
        it
    }
    println(value)
    // output: "Quang Nam"
```
*  Nó giúp chúng ta tham chiếu tới kết quả của một đoạn code liên kết như bên dưới: 
```
    val numbers = mutableListOf("One","Two","Three","Four","Five")
    val resultsList = numbers.map { it.length }.filter { it > 3 }
    print(resultsList)
```
Chúng ta thường gán kết quả tính toán được cho một biến rồi sau đó lại hiển thị nó ra. Còn đối với let nó giúp chúng ta tham chiếu ngay tới kết quả tìm được như sau: 
```
    val numbers = mutableListOf("One","Two","Three","Four","Five")
    numbers.map { it.length }.filter { it > 3 }.let {
        print(it)
    }
```
Sẽ không cần phải khai báo thêm biến để nhận kết quả trả về cả.

Đọc tới đây chắc hẳn bạn cảm thấy khá dài phải không ? Yên tâm rằng với những operator sau cũng sẽ tương tự như let, mình chỉ chỉ ra những điểm khác biệt mà thôi.

### run 
Toán tử run tương như toán tử let là cho truy cập vào đối tượng và trả về kết quả mong muốn khác với đối tượng.
```
    val person = Person("Nguyen Van A", 23, "Quang Nam")
    val value = person.run {
        name = "Tran Van C"
        address = "Da Nang"
        address
    }
    println(value)
    // output: "Da Nang"
```
### let & run
Vậy điểm khác biệt là gì ?

Đó là **run** tham chiếu tới đối tượng thông qua toán tử **this**. Trong scope của toán tử **run** ta cũng sẽ không cần dùng this để truy cập tới thuộc tính mà chỉ cần ghi tên thuộc tính ra là đủ. Ngoài ra thì nó không thể đặt lại tên cho **this** như toán tử **let**.

**run** cũng cung cấp cho ta một phương thức kiểm tra null tương tự như **let**.
Vì vậy, tuỳ vào trường hợp mà chúng ta cần chọn lựa một trong hai toán tử hữu dụng này.

### with
Toán tử **with** tương đối giống với toán tử **run** chúng ta đã bàn luận ở trên. Nó cũng tham chiếu tới đối tượng bằng từ khoá this. Nhưng điều khác biệt là nó không cung cấp cho ta phương thức kiểm tra null.
```
    val person = Person("Nguyen Van A", 23, null)
    with(person) {
        this?.name = "Tran Van C"
        this?.address = "Da Nang"
    }
```
Thay vì phải check null từng dòng 1 như vậy, hãy chuyển qua dùng **run** như bên dưới :
```
    val person = Person("Nguyen Van A", 23, null)
    person?.run{
        name = "Tran Van C"
        address = "Da Nang"
        toString()
    }
```
Sẽ tiện lợi và gọn gàng hơn phải không nào !
### apply
Toán tử apply lại cũng tương tự như toán tử **run** phía trên. Nó tham chiếu tới đối tượng thông qua từ khoá **this** và không thể đổi nó bằng một tên gọi khác.
```
    val person : Person? = null
    person?.apply{
        name = "Tran Van C"
        address = "Da Nang"
        toString()
    }
    //output: Không hiển thị gì cả vì object ta đang null
```
Và còn cung cấp cho ta cách kiểm tra null.
### run & apply 
Điểm khác biệt đó là toán tử apply không cho phép chúng ta trả về bất kỳ giá trị nào khác đối tượng mà ta đang tham chiếu tới.
```
    val person = Person("Nguyen Van A", 23, "Quang Nam")
    val value = person.apply{
        name = "Tran Van C"
        address = "Da Nang"
    }
    println(value)
    println(person)
    // output: đều giống nhau là: Name: Tran Van C, age: 23, address: Da Nang
```
### also 
Toán tử **also** khá giống với let. Nó tham chiếu tới đối tượng thông qua từ khoá it. Và cung cấp cho ta khả năng check null.
```
    val person = Person("Nguyen Van A", 23, "Quang Nam")
    val value = person?.also {
        it.name = "Tran Van C"
    }.run {
        this
    }
    println(value)
    //output: Name: Tran Van C, age: 23, address: Quang Nam
```
### let & also
Điểm khác biệt giữa 2 toán tử này là **also** cho phép ta truy cập tới đối tượng và chỉnh sửa đối tượng nhưng không cho phép ta trả về giá trị nào khác đối tượng như **let**. 

## 3. Tổng kết:
Để tổng kết lại bài viết, sẽ có một vài mô tả thể hiện ngắn gọn kiến thức mình đã nói đến như sau:
![](https://images.viblo.asia/7d0b8565-c1db-4298-b30d-d5406bad21ac.png)

Về cách chọn lựa từng toán tử này thì tuỳ vào mục đính và trường hợp sử dụng, hình bên dưới sẽ giúp bạn tìm ra được một toán tử phù hợp với bài toán của mình như sau:
![](https://images.viblo.asia/fa23670a-038f-4a3e-b6be-c9405ffeb6d2.png)


Hi vọng bài viết này sẽ giúp ích cho bạn đọc. Nếu có thắc mắc hay đóng góp gì xin hãy để lại bình luận bên dưới.
Cảm ơn các bạn !

### Tham khảo: 
https://blog.mindorks.com/using-scoped-functions-in-kotlin-let-run-with-also-apply