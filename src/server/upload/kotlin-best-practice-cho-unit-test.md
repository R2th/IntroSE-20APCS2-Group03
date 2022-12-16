Viết Unit test trong kotlin có một chút khác với java. Tận dụng lợi thế của kotlin, unit test ngắn gọn, dễ hiểu nhưng cũng mang lại một chút khó khăn. Sau đây là những best practice trong quá trình viết code bằng kotlin để unit test dễ dàng hơn.

1. TL;DR

* Sử dụng JUnit5 và @TestInstance (Lifecycle.PER_CLASS) để tránh các thành phần static, những thứ non-idiomatic và rườm rà trong Kotlin.
* Test fixtures
- Sử dụng lại một instance của class test cho mọi method test (bằng cách sử dụng @TestInstance (Lifecycle.PER_CLASS))
- Khởi tạo các đối tượng cần thiết trong constructor (init) hoặc trong một khai báo field (nên sử dụng apply ()). Bằng cách này, các field có thể không thay đổi (val) và không có giá trị.
- Không sử dụng @BeforeAll. Nó buộc chúng ta phải sử dụng các loại endinit hoặc nullable.
* Thay vì chú thích mọi class với @TestInstance (Lifecycle.PER_CLASS), chúng ta có thể thay đổi vòng đời mặc định bằng file junit-platform.properties.
* Đặt tên của các method test trong các backstick và sử dụng các class bên trong @Nested để cải thiện khả năng đọc và cấu trúc của class test.
* Mocks
- Các lớp *open* và các method tường minh hoặc sử dụng các interface để làm cho chúng có thể mock được.
- Sử dụng Mockito-Kotlin hoặc MockK để tạo mocks một cách thuận tiện và "idiomatic".
- Để có hiệu suất tốt hơn, hãy thử tạo mocks chỉ một lần và đặt lại chúng trong @BeforeEach.
* AssertJ vẫn khẳng định là thư viện mạnh mẽ nhất.
* Tận dụng các lớp dữ liệu
- Tạo một đối tượng tham chiếu và so sánh nó trực tiếp với đối tượng thực tế bằng cách sử dụng equality assertion.
- Viết các phương thức helper với các đối số mặc định để dễ dàng tạo các instance với một cấu trúc phức tạp. Tránh sử dụng copy () cho mục đích này.
- Sử dụng các data class để mang test dât (đầu vào và đầu ra dự kiến) trong một @ParameterizedTest.

2. Thế nào là "idiomatic Kotlin Code"?

- Immutability. Chúng ta nên sử dụng tham chiếu immutable với val thay vì var.
- Non-Nullability. Chúng ta nên ưu tiên các loại không phải null (String) trên các kiểu nullable (String?).
- Không có quyền truy cập tĩnh. Nó cản trở thiết kế và kiểm thử theo hướng đối tượng thích hợp. Kotlin mạnh mẽ khuyến khích chúng ta tránh static access bằng cách đơn giản là không cung cấp một cách dễ dàng để tạo các thành phần static.

3. Tránh Static and Reuse các Test Class Instance

Trong JUnit4, một Instance mới của class test được tạo ra cho mọi method test. Vì vậy, initial setup code (được sử dụng bởi tất cả các method test) phải là tĩnh. Nếu không, setup code sẽ được thực hiện lại lại mỗi lần cho mỗi method test. Trong JUnit4, giải pháp là làm cho các thành viên đó tĩnh. Đó là ok cho Java vì nó có một từ khóa tĩnh. Kotlin không có khai báo trực tiếp này - vì những lý do tốt vì truy cập tĩnh cơ bản là một anti-pattern.

```kotlin
//JUnit4. Don't:
class MongoDAOTestJUnit4 {

    companion object {
        @JvmStatic
        private lateinit var mongo: KGenericContainer
        @JvmStatic
        private lateinit var mongoDAO: MongoDAO

        @BeforeClass
        @JvmStatic
        fun initialize() {
            mongo = KGenericContainer("mongo:3.4.3").apply {
                withExposedPorts(27017)
                start()
            }
            mongoDAO = MongoDAO(host = mongo.containerIpAddress, port = mongo.getMappedPort(27017))
        }
    }

    @Test
    fun foo() {
        // test mongoDAO
    }
}
```

May mắn thay, JUnit5 cung cấp annotation @TestInstance (Lifecycle.PER_CLASS). Bằng cách này, một íntance của class test được sử dụng cho mọi phương thức. Do đó, chúng ta có thể khởi tạo các đối tượng cần thiết một lần và gán chúng cho các trường bình thường của class test. Điều này xảy ra chỉ một lần vì chỉ có một thể hiện của class test.

```kotlin
//Do:
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class MongoDAOTestJUnit5 {
    private val mongo = KGenericContainer("mongo:3.4.3").apply {
        withExposedPorts(27017)
        start()
    }
    private val mongoDAO = MongoDAO(host = mongo.containerIpAddress, port = mongo.getMappedPort(27017))

    @Test
    fun foo() {
        // test mongoDAO
    }
}
```

Đầu tiên, cách tiếp cận này ngắn gọn hơn. Thứ hai, đó là code Kotlin idiomatic khi chúng ta đang sử dụng các tham chiếu non-nullable val và có thể loại bỏ lateinit. Xin lưu ý rằng apply() của Kotlin thực sự hữu ích ở đây. Nó cho phép khởi tạo và cấu hình đối tượng mà không có một hàm tạo. Nhưng việc sử dụng một hàm tạo (init {}) đôi khi thích hợp hơn nếu code initial ngày càng phức tạp.

```kotlin
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class MongoDAOTestJUnit5Constructor {
    private val mongo: KGenericContainer
    private val mongoDAO: MongoDAO

    init {
        mongo = KGenericContainer("mongo:3.4.3").apply {
            withExposedPorts(27017)
            start()
        }
        mongoDAO = MongoDAO(host = mongo.containerIpAddress, port = mongo.getMappedPort(27017))
    }
}
```

Trên thực tế, chúng ta không cần @JeforeAll của JUnit5 (tương đương với @BeforeClass của JUnit4) trong Kotlin nữa. Với @TestInstance (Lifecycle.PER_CLASS), chúng ta có thể sử dụng các phương tiện lập trình hướng đối tượng để khởi tạo các test fixtures.

Nguồn: https://blog.philipphauer.de/best-practices-unit-testing-kotlin/