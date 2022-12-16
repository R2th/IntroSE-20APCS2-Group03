DSL là một cách tuyệt vời để cho mã / cấu hình trở nên dễ học hơn, nhưng làm thế nào để viết chúng đối với những cấu trúc dữ liệu phức tạp theo 1 cách clean, immutable?

Trước hết, chúng ta có data class:

```java
data class Business(
    val name: String, 
    val address: Address,
    val employees: List<Employee>
)

data class Address(
    val street: String,
    val city: String
)

data class Employee(
    val name: String,
    val id: String,
    val title: String,
    val salary: Int
)
```

Đây là dữ liệu chúng ta muốn đại diện, nhưng như vậy DSL sẽ như thế nào? Luôn luôn có ý tưởng về những gì bạn muốn xây dựng trước khi bạn bắt đầu xây dựng nó. Đây là những gì tôi đang hình dung:

```java
val business = business {
    name { "Generic.io" }

    address {
        street { "Agile St" }
        city { "Disruptville" }
    }

    employees {
        employee {
            name { "Grace Elliot" }
            id { "12345" }
            title { "VP Engineering" }
            salary { 125_000 }
        }

        employee {
            name { "Jeff Jefferson" }
            id { "54321" }
            title { "Chief Jeff Officer" }
            salary { 100_000 }
        }
    }
}
```

Khá ổn. Bây giờ chúng ta chỉ cần build nó! Hãy phân tích DSL này để xem liệu chúng ta có thể trả lại logic được không. Điều đầu tiên bạn sẽ nhận thấy là đầu vào của DSL, method business. Phương thức này lấy một lambda như một tham số được biểu thị bằng ký hiệu {}. Ban đầu có thể khó hiểu vì phương pháp này không chứa các dấu ngoặc truyền thống bao quanh đối số. Khi cung cấp một đối số lambda duy nhất cho một hàm, các dấu ngoặc đơn có thể được bỏ qua hoàn toàn (và thực sự nên bỏ qua, theo cảnh báo của IDE Kotlin: các đối số Lambda được chuyển ra khỏi dấu ngoặc đơn). .

Vì vậy, method business có thể trông giống như sau:

```java
fun business(lambda: () -> Unit) : Business
```

Điều này có nghĩa là method business có một lambda không trả lại một cách tường minh bất kỳ thứ gì hữu ích (Unit), nhưng cần phải trả ra một object Business bằng cách nào đó. Vậy làm thế nào để chỉ làm việc với class Address lúc đầu?

Một lần nữa, class Address trông như thế nào và DSL tương ứng sẽ trông như thế nào:

```java
data class Address(
    var street: String = "",
    var city: String = ""
)
//
val address = address {
    street = "Agile St"
    city = "Disruptville"
}
```

```java
fun address(lambda: () -> Unit) : Address
```

Nhưng làm thế nào để có thể trả về một đối tượng Address cho một lambda chỉ trả về Unit? Bí quyết là chỉ định receiver biểu thức lambda! Kotlin cho phép loại hành vi này bằng cách sử dụng cú pháp sau:

```java
fun address(lambda: Address.() -> Unit) : Address
```

Phương thức này chấp nhận một biểu thức lambda được chạy trong context của class Address! Điều này cho phép chúng ta truy cập vào các biến street và city mà đã được tiếp xúc trong lớp Address trong lambda. Hãy implement function:

```java
fun address(lambda: Address.() -> Unit) : Address {
    val address = Address()
    address.apply(lambda)
    return address
}
```

Tất cả những gì chúng ta phải làm là tạo một đối tượng Address rỗng, áp dụng lambda đã cho, và đã được chỉ định để trả về kiểu Address! Chúng ta đã xây dựng DSL Kotlin chính thức đầu tiên. Nhưng tất nhiên chúng ta vẫn chưa hài lòng. Hãy thêm lại những thứ đã xóa cho ví dụ đơn giản này. Đây là mục tiêu:

```java
data class Address(
    val street: String,
    val city: String
)
//
val address = address {
    street { "Agile St" }
    city { "Disruptville" }
}
```

Điều này cho chúng ta lợi thế của việc có một class immutable Address, và sử dụng cú pháp {} thay vì =. Một lần nữa, chúng ta sẽ bắt đầu với method signature address:

```java
fun address(lambda: Address.() -> Unit) : Address
```

Rõ ràng điều này sẽ không hoạt động. Chúng ta không thể chỉ tạo một lớp Address trống và áp dụng lambda để thiết lập các giá trị vì nó bây giờ immutable. Chúng ta cần một lớp khác để giữ dữ liệu được đặt trong lambda, sau đó tạo và trả về immutable Address ở cuối. Hãy sử dụng Builder pattern! Nó chứa dữ liệu, và có thể tạo ra một immutable class theo yêu cầu. Giống như thế này:

```java
class AddressBuilder {
    private var street = ""
    private var city = ""

    fun street(lambda: () -> String) { this.street = lambda() }
    fun city(lambda: () -> String) { this.city = lambda() }
    fun build() = Address(street, city)
}
```

Bây giờ với builder class đã tạo, hãy quay lại method address. Vì vẫn muốn sử dụng các phương thức street và city, nên chúng ta sẽ chuyển một lambda với AddressBuilder như 1 receiver. Bây giờ, chúng ta có thể reimplement các function như sau:

```java
fun address(lambda: AddressBuilder.() -> Unit) : Address {
    return AddressBuilder().apply(lambda).build()
}
```

Việc implement mới này cho phép chúng ta sử dụng DSL với cú pháp {} và duy trì tính bất biến của lớp Address! Chính xác những gì chúng ta muốn. Đây là mẫu cơ bản cho phép chúng ta xây dựng các cấu trúc dữ liệu phức tạp hơn.

Để hoàn thành ví dụ, tất cả những gì chúng ta phải làm là build tất cả mọi thứ.

```java
class BusinessBuilder {
    private var name = ""
    private var address = Address("", "")
    private val employees = mutableListOf<Employee>()

    fun name(lambda: () -> String) { name = lambda() }
    
    fun address(lambda: AddressBuilder.() -> Unit) {
        address = AddressBuilder().apply(lambda).build()
    }
    
    fun employees(lambda: EmployeeListBuilder.() -> Unit) {
       employees.addAll(EmployeeListBuilder().apply(lambda).build())
    }
    
    fun build() = Business(name, address, employees)
}

class EmployeeListBuilder {
    private val employeeList = mutableListOf<Employee>()

    fun employee(lambda: EmployeeBuilder.() -> Unit {
        employeeList.add(EmployeeBuilder().apply(lambda).build()) 
    }

    fun build() = employeeList
}
                 
class EmployeeBuilder {
    private var name: String = ""
    private var id: String = ""
    private var title: String = ""
    private var salary: Int = 0

    fun name(lambda: () -> String) { this.name = lambda() }
    fun id(lambda: () -> String) { this.id = lambda() }
    fun title(lambda: () -> String) { this.title = lambda() }
    fun salary(lambda: () -> Int) { this.salary = lambda() }
    fun build() = Employee(name, id, title, salary)
}
```

Nguồn: https://proandroiddev.com/writing-kotlin-dsls-with-nested-builder-pattern-66452476d5ef