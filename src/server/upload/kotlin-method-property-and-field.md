Như các bạn đã biết khi dự án sử dụng kotlin thì bạn sẽ giảm được LOC (lines of code) nhưng bù lại có thể số method sẽ bị tăng lên. Android chỉ support tối đa 65,536 method (nếu không dùng multidex).
Vậy lý do là ở đâu? Chúng ta hãy cùng tìm hiểu trong bài viết này nhé.

### 1. Method count

Không giống ngôn ngữ Java, với Kotlin thì bạn sẽ không có cách nào để tạo ra 1 field trống cả. Và bạn sẽ dùng khai báo val hay var thay cho việc tạo các property. Với điều này thì bạn có thể tạo ra các định nghĩa get/set cho một property bất cứ khi nào bạn muốn mà không phá vỡ cấu trúc reference của property đó.

Điều này thật là tuyệt và nó sẽ giúp bạn bớt nhàm chán trong việc tạo ra các method get/set như bạn thường làm với Java.

Tuy nhiên thì tính năng này cũng có cái giá của nó., với mỗi khai báo public val thì Kotlin sẽ tự tạo 1 field để reference và 1 method getter và method này có thể được gọi từ Java. Và mỗi khai báo public var nó cũng sẽ tạo ra 2 method tương ứng getter/setter. Thật may mắn là mỗi một private property với khai báo mặc định nó không tạo ra các method getter/setter. Nếu như bạn có thói quen tạo rất nhiều public field ở Java trước đó ( các giá trị constant chẳng hạn) thì có nghĩa là bạn đã tạo ra rất nhiều method tương ứng ở trong Kotlin rồi đấy nhé.

Nếu bạn bị litmit số method trong android, thì tôi khuyên bạn nên áp dụng thêm annotation @JvmField cho các public constants để tránh tạo ra các method getter mà bạn không muốn custom sau này.  Điều này cũng tránh việc tự động tạo ra các method getters và giảm số method xuống.
Và bạn cũng có thể sử dụng modifier const thay vì annotation @JvmField để đạt được hiệu quả tương tự.

Với những ứng dụng sử dụng 100% Kotlin, thì những thư viện Kotlin tiêu chuẩn cũng có kích thước nhỏ và có thể dùng để thay thế một số thư viện common của Java, những cái mà công kềnh và không cần thiết nữa. Cũng xin cảm ơn những thư viện chuẩn của Kotlin, đã làm giảm số method không cần thiết sau khi được convert từ java qua. Tuy nhiên đôi khi việc tính toán quá chi li cho việc giảm số method lại khiến bạn đau đầu sau này đấy.

### 2. Khai báo property và field

Các class trong Kotlin có thể chứa các property. Những thuộc tính này có thể được khai báo như một thuộc tính có thể thay đổi được giá trị với từ khóa var hoặc không thay đổi giá trị với từ khóa val. 

Ví dụ
```
class Address {
    var name: String = ...
    var street: String = ...
    var city: String = ...
    var state: String? = ...
    var zip: String = ...
}
```
Để sử dụng một thuộc tính, chúng ta đơn giản là truy xuất đến nó qua tên như là field trong Java thôi:
```
fun copyAddress(address: Address): Address {
    val result = Address() // there's no 'new' keyword in Kotlin
    result.name = address.name // accessors are called
    result.street = address.street
    // ...
    return result
}
```

### 3. Compile-Time Constants

Các giá trị của thuộc tính tại thời điểm compile được đánh dâu như là các giá trị constant khi sử dụng phụ tố const. Và chúng cần thỏa mãn một số điều kiện sau:

- Trực thuộc (top-level) hoặc là member của đối tượng
- Được khởi tạo với giá trị là 1 chuỗi hoặc một giá trị nguyên thủy
- Ko định nghĩa lại phương thức getter

Những thuộc tính này có thể được sử dụng trong annotation:

```
const val SUBSYSTEM_DEPRECATED: String = "This subsystem is deprecated"

@Deprecated(SUBSYSTEM_DEPRECATED) fun foo() { ... }
```

### 4. Late-Initialized Properties và Variables (khởi tạo sau)

Thông thường thì các thuộc tính sẽ không được null (non-null) và phải được khởi tạo trong constructor. Tuy nhiên, điều này nhiều khi cũng không thích hợp lắm. Ví dụ, những thuộc tính có thể được khởi tạo độc lập khi sử dụng, hoặc trong thiết lập của kiểm thử (unit-test). Trong trường hợp này, bạn không thể cung cấp giá trị khởi tạo trong constructor, nhưng bạn muốn tránh việc kiểm tra null khi reference đến thuộc tính trong thân hàm của class.

Để thực hiện việc này bạn cần đánh dấu thuộc tính bằng phụ tố lateinit:

```
public class MyTest {
    lateinit var subject: TestSubject

    @SetUp fun setup() {
        subject = TestSubject()
    }

    @Test fun test() {
        subject.method()  // dereference directly
    }
}

```

### Kết Luận

Nói chung là việc sử dụng Kotlin thú vị mà đôi khi cũng phức tạp vì chúng ta chưa quen cú pháp của nó. Và đặc biệt là chúng ta đã bị quá quen với Java. Tuy nhiên thì Kotlin thật là tuyệt vời.
 
Hẹn gặp lại các bạn trong bài chia sẻ tới nhé.