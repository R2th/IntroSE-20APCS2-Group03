Chúng ta đều biết Mockito là một thư viện vô cùng hữu ích trong Unit Test. Nó là cách tốt nhất để tạo ra các mock (mô phỏng/giả lập) và sử dụng nó trong Java và Kotlin. Nhưng do là một thư  viện được xây dựng cho Java, bởi thế nên nó sẽ có những hạn chế nhất định khi sử dụng cho Kotlin. Đó cũng là lý do cho sự ra đời của **MockK** - một mocking framework được viết hoàn toàn bằng Kotlin và dành riêng cho Kotlin.

Giống như Mockito, MockK cho phép bạn tạo và stub các đối tượng bên trong test code của mình.

Việc mock các object cho phép bạn test trên các đối tượng độc lập. Bất kỳ sự phụ thuộc vào object nào khi test đều có thể được mock để cung cấp các điều kiện cố định, do đó, đảm bảo các test luôn ổn định và rõ ràng.

Mockito là một framework phổ biến được dùng bởi các Java developer và vô cùng mạnh mẽ. Nhưng nó lại có một vài khó chịu khi được áp dụng cho Kotlin. MockK, được thiết kế đặc biệt cho Kotlin, sẽ mang lại cho chúng ta một trải nghiệm thoải mái hơn nhiều.

Đối với Kotlin 1.3 trở lên, ta cần khai báo dependency (Kotlin DSL) cho MockK như sau:
```kotlin
testImplementation("io.mockk:mockk:1.10.0")
```
Phiên bản MockK mới nhất tính đến thời điểm này là 1.10.0.

Một đoạn mã mẫu là:
```kotlin
class User {
    var address: Adddress
    var contact: Contact
}

class MyTest {
    @MockK
    private lateinit var addressMock: Address
    @MockK
    private lateinit var contactMock: Contact
    @InjectMockks
    val user: User = User()

    @Before
    fun setUp() = MockkAnnotations.init(this, relaxUnitFun = true) 

    @Test
    fun testFunction() {
        ......
        ......
    }
}
```

Bây giờ hãy xem thư viện **MockK** này có gì đặc biệt nhé.

**1. Chained mock:**

Final result có thể được return bằng cách chỉ định chuỗi lệnh gọi hoàn chỉnh. Không cần phải mô phỏng từng đầu ra của phương thức.
```kotlin
val product: Product = mockk() 
every { product.currentOffer.isAcive } returns true
```
Giả sử phiếu mua hàng có nhiều loại khác nhau và kiểu return của nó là generic thì `hint` sẽ giúp đưa ra gợi ý để mock đúng kiểu mà chúng ta cần.

```kotlin
val product: Product = mockk() 
every { 
    product.currentOffer.hint(Offer.SpecialOffer::class).isAcive
} returns true
```

**2. Đối tượng Mock:**

Một điều rất thú vị về MockK đó các object cũng có thể được mock.

```kotlin
object Calculator { 
    fun add(a: Int, b: Int): Int {
        ...
    } 
    .....
    .....
}

@Test 
fun testMethod() { 
    mockkObject(Calculator) 
    every { Calculator.add(any(), any()) } returns 0 
    assertEquals(0, Calculator.add(1, 2))
    unmockkAll() // Hoặc unmockkObject(Calculator)
}
```

Một điều thú vị khi mock một object đó là mặc dù object chỉ có một thể hiện (instance) duy nhất nhưng `mockk<Calculator>()` lại có thể có nhiều thể hiện khác nhau. Thậm chí các enum cũng có thể được mock theo cách này.

**3. Capturing**

Các giá trị/thuộc tính của đối tượng có thể được capture bằng cách sử dụng `slot` hoặc `mutableList`.
```kotlin
val product: Product = mockk()
val slot = Slot<Date>()
every {
   product.getCommentsPostedBy(capture(slot)) 
} answers {
   println(slot)
}
val today: Date = Date()
val calendar = Calendar.getInstance()
calendar.add(Calendar.DAY_OF_YEAR, -daysAgo)
val yesterday = calendar.time
verify(exactly = 2) { 
    product.getCommentsPostedBy(or(today, yesterday))
}
```

**4. Mocking cả suspend function:**

Mockk cũng hỗ trợ mock các hàm suspend.

```kotlin
// Repository.kt
suspend fun getDataFromServer(
  productId: String
): ServerData = withContext(Dispatchers.IO) {
   ......
}
// Test.kt
@Test
fun testData() {
  val repository: Repository = mockk()
  val serverData: ServerData = ServerData()
  coEvery { respository.getDataFromServer("p1") } retuns serverData
}
```

**5. Mocking cả Extension function**

Mocking extension function.

```kotlin
class Product {
    .....
}
class Experiment {
     fun Product.newFunc(): Int {
         ....
     }
}

// Test
val experimentMock = mockk<Experiment>()
with(experimentMock) {
    every { Product().newFunc() } returns 5
    assertEuals(5, Product().newFunc())
    verify { Product().newFunc() }
}
```

**6. Mocking mô-đun:**

Vì Kotlin cho phép viết các hàm trực tiếp trong tệp mà không cần khai báo lớp nào, nên trong những trường hợp như vậy, chúng ta cần phải mock toàn bộ tệp với `mockStatic`.
```kotlin
class Product {
}
// package.File.kt
fun Product.newFunc() {
    .....
}
// Test
mockStatic("package.FileKt")
every { Product().newFunc() } returns 5
assertEquals(5, Product().newFunc())
verify(Product().newFunc())
```

**7. Mock private function:**

MockK giúp cho việc mock các private method rất dễ dàng.
```kotlin
class Product {
    fun firstFunc():Int = secondFunc()
    fun secondFunc(): Int = 5
}
// Test
val product = spyk<Product>()
every { product["secondFunc"]() } returns 10
assertTrue(10, product.firstFunc())
```
Nếu bạn muốn verify các lần gọi tới các phương thức private thì bạn cần phải set `recordPrivateCalls=true` trong khi tạo `spy`.
```kotlin
val product = spyk<Product>(recordPrivateCalls = true)
every { product["secondFunc"]() } returns 10
assertTrue(10, product.firstFunc())
verifySequence { 
    product.firstFunc()
    product["secondFunc"]()
}
```

**8. Ngay cả constructor cũng có thể được mock:**

Việc unit test sẽ trở nên rất nản nếu mã gốc tạo ra các đối tượng của một lớp và sau đó thực hiện các lệnh gọi hàm trong hàm mục tiêu kiểm tra. Nó có thể được giải quyết bằng cách sử dụng mock constructor.
```kotlin
class Product {
   fun getNewClass(): Int = NewClass().get()
}
// Test
val product = spyk<Product>()
mockkContructor(NewClass::class)
every { anyContructed<NewClass>().get() } returns 5
assertTrue(5, product.getNewClass())
verify { anyConstructed<NewClass>().get() }
```

Nguồn: https://medium.com/@prashantspol/mockk-better-to-way-to-mock-in-kotlin-than-mockito-1b659c5232ec