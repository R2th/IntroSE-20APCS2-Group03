## DSLs trong kotlin (Phần 1)
Kotlin mang đến nhiều tính năng cho các nhà phát triển tập trung vào việc làm cho mã dễ đọc hơn và tiết kiệm thời gian và công sức hơn. Một trong những điều tuyệt vời mà chúng tôi có thể làm là thiết kế domain-specific language hay còn gọi là DSL.
![](https://images.viblo.asia/cc0fe07a-fe22-4e84-bb1d-36443ff5f9fd.jpeg)

### domain-specific language là gì?
Trước hết, DSL chính xác là gì và tại sao chúng ta nên sử dụng chúng? Chúng ta hãy xem định nghĩa của Wikipedia về DSL:
> A domain-specific language (DSL) is a computer language specialized to a particular application domain. This is in contrast to a general-purpose language (GPL), which is broadly applicable across domains.
> 

Cơ bản thì ta hiểu thì domain-specific language (DSL) là một ngôn ngữ máy tính chuyên biệt cho application domain cụ thể. Điều này trái ngược với một ngôn ngữ có mục đích chung (GPL), được áp dụng rộng rãi trên các application domain.

Về cơ bản, DSL là ngôn ngữ chỉ tập trung vào một phần cụ thể của ứng dụng. Một ngôn ngữ có mục đích chung, chẳng hạn như Kotlin hoặc Java, mặt khác có thể được sử dụng trong nhiều phần của một ứng dụng. Có một số ngôn ngữ cụ thể theo miền mà chúng tôi đã quen thuộc, chẳng hạn như SQL chẳng hạn. Nếu chúng ta xem xét một câu lệnh trong SQL, chúng ta nhận thấy rằng nó gần giống như một câu trong tiếng Anh, làm cho nó trở nên đơn giản và dễ đọc:

> SELECT Person.name, Person.age FROM Person ORDER BY Person.age DESC
> 

Không có tiêu chí cụ thể phân biệt một DSL từ một API bình thường nhưng hầu hết thời gian chúng ta thấy sự khác biệt: Việc sử dụng một cấu trúc hoặc cú pháp nhất định. Điều này làm cho code dễ đọc hơn, dễ hiểu hơn, không chỉ cho các nhà phát triển mà còn cho những người không chuyên về kỹ thuật.
### DSLs with Kotlin
Vậy làm thế nào chúng ta có thể tạo ra DSL với một vài tính năng của Kotlin và những lợi thế mà nó mang lại cho chúng ta là gì?

Khi chúng ta tạo DSL bằng một ngôn ngữ đa năng như Kotlin. Chúng ta không tạo cú pháp độc lập nhưng chúng ta đang thiết lập một cách cụ thể để sử dụng ngôn ngữ hiện taị. Điều này mang lại cho chúng ta lợi thế khi sử dụng code mà chúng ta đã biết và cho phép chúng ta thêm các câu lệnh Kotlin khác như các vòng lặp cho DSL của chúng ta.

Bên cạnh đó, Kotlin cung cấp một số cách để tạo một cú pháp rõ ràng hơn và tránh sử dụng quá nhiều ký hiệu không cần thiết. Trong phần đầu tiên này, tôi sẽ tập trung vào ba tính năng cụ thể:
* Cách sử dụng lambdas outside of method parentheses
* Lambdas with receivers
* Extension functions

Hãy cùng theo dõi những ví dụ dưới đây để hiểu rõ thêm nhé.
Để làm ví dụ dễ hiểu hơn thì tôi sẽ đưa ra những ví dụ đơn giản về DSL.Chúng ra không nên tạo ra các DSLs mỗi khi tạo class vì nó là điều không cần thiết. Việc sử dụng hiệu quả nhất DSL thì bạn nên dùng nó để config cấu hình hoặc giao diện, những thứ mà người dùng không biết và nhận thức được nó.
### Bắt đầu với DSL nào
Trong phần này, chúng ta sẽ tạo một DSL đơn giản có thể khởi tạo một đối tượng của lớp Person. Lưu ý rằng đây chỉ là một ví dụ. Dưới đây là một ví dụ về những gì chúng ta sẽ có được ở phần cuối của hướng dẫn này.
```
val person = person {
    name = "John"
    age = 25
    address {
        street = "Main Street"
        number = 42
        city = "London"
    }
}
```
Như bạn có thể thấy, đoạn code trên rất dễ hiểu. Ngay cả những người không có kiến thức về code sẽ có thể đọc và thậm chí điều chỉnh được nó. Để hiểu được vì sao có thể làm như thế thì chúng ta cần trải quả 1 vài bước.

```
data class Person(var name: String? = null,
                  var age: Int? = null,
                  var address: Address? = null)


data class Address(var street: String? = null,
                   var number: Int? = null,
                   var city: String? = null)
```

Rõ ràng đây không phải là cách code tối ưu nhất mà chúng ta có thể viết. Nếu ta muốn có những biến vals bất biến thì sao. Hãy cũng theo dõi tiếp.

Đầu tiên tôi sẽ tạo ra 1 file mới. Tôi sẽ giữ cho DSL tách biệt với các class model. Hãy bắt đầu bằng những hàm khởi tạo cho class Person.Bạn có thể thấy các thuộc tính của Person được định nghĩa trong 1 code block, những dấu ngoặc nhọn này định nghĩa là các lambda, một khái niệm đã quá quen thuộc với ai từng làm việc với kotlin phải không. Ở đây lambda được sửa dụng ngoài dấu ngoặc đơn.

Nếu là tham số cuối cùng của lambda chúng ta có thể đặt nó bên ngoài dấu ngoặc đơn. Khi bạn chỉ có 1 tham số lambda thì bạn có thể bỏ hoàn toàn các dấu ngoặc đơn. Điều đó có nghĩa là person {…} sẽ tương tự person({…})

```
fun person(block: (Person) -> Unit): Person {
    val p = Person()
    block(p)
    return p
}
```

Như vậy ta đã có hàm tạo ra 1 đối tượng Person. Nó yêu cầu 1 lambda là 1 object mà ta tạo ra ở dòng 2. Khi lệnh ở dòng 3 được thực hiện chúng ta có được đối tượng có các thuộc tính cần thiết trước khi ta gọi dòng 4. Dưới đây là cách sử dụng hàm này:
```
val person = person {
    it.name = "John"
    it.age = 25
}
```
Vì lambda này chỉ nhận được một đối số, chúng ta có thể gọi đối tượng Person với nó. Điều này có vẻ khá tuyệt, nhưng đây không phải là điều chúng tôi muốn thấy trong DSL của tôi. Đặc biệt là khi chúng ta sẽ bổ sung thêm các lớp đối tượng trong đó. Điều này đưa chúng ta đến tính năng Kotlin được đề cập tiếp theo của chúng ta: *Lambdas with receivers*

Trong định nghĩa hàm của Person, chúng ta có thể thêm một receiver vào lambda. Bằng cách này, chúng ta chỉ có thể truy cập các functions của receiver đó trong lambda. Vì các hàm trong lambda nằm trong phạm vi của receiver, chúng ta có thể chỉ cần thực hiện lambda trên receiver thay vì cung cấp nó như một đối số.
```
fun person(block: Person.() -> Unit): Person {
    val p = Person()
    p.block()
    return p
}
```

Khi viết gọn lại thì có thể thành như sau:
```
fun person(block: Person.() -> Unit): Person = Person().apply(block)
```
Giờ ta có thể bỏ *it* trong DSL:

```
val person = person {
    name = "John"
    age = 25
}
```

Trông khá tuyệt vời phải không. Chúng ta sắp đến đích rồi. Nhưng chúng ta còn thiếu 1 thứ đó là class Address. Chúng ta phải gán thuộc tính address của Person. Để làm được điều này thì chúng ta cần sử dụng **Extension functions**.
Extension functions cho phép chúng ta thêm các hàm vào các class mà không cần truy cập mà nguồn của class đó. Điều đó là cơ sở cho việc tạo ra 1 đối tượng Address và gán trực tiếp nó cho thuộc tính address của class Person.

```
fun person(block: Person.() -> Unit): Person = Person().apply(block)

fun Person.address(block: Address.() -> Unit) {
    address = Address().apply(block)
}
```
Chúng ta thêm address function cho class Person cho phép chấp nhận 1 lambda với Address như 1 receiver, giống như việc ta viết hàm khởi tạo cho Person. Sau khi xong các bước trên giờ ta đã có thể tạo ra 1 domain-specific language để tạo ra model như sau:
```
val person = person {
    name = "John"
    age = 25
    address {
        street = "Main Street"
        number = 42
        city = "London"
    }
}
```
Đây là phần đầu tiên của loạt bài viết về viết DSL trong Kotlin. Trong phần thứ hai, chúng ta sẽ nói về việc thêm các Collection, sử dụng cleaner Builder pattern và @DslMarker annotation. Ngoài ra còn có một ví dụ về GsonBuilder.
Hy vọng bài viết này hữu ích cho bạn.

Nguồn : [Writing DSLs in Kotlin](https://proandroiddev.com/writing-dsls-in-kotlin-part-1-7f5d2193f277)