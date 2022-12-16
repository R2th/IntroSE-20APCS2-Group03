**4. Use Backticks and @Nested Inner Classes**

*     Đặt tên của method test trong backticks. Điều này cho phép các "spaces" trong tên phương thức cải thiện khả năng đọc. Bằng cách này, chúng ta không cần thêm annotation @DisplayName.
*     @Nested của JUnit5 rất hữu ích để nhóm các method test. Các nhóm có thể là một số type test nhất định (như InputIsXY, ErrorCases) hoặc một nhóm cho từng method được test (GetDesign và UpdateDesign).

```java
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class TagClientTest {
    @Test
    fun `basic tag list`() {}

    @Test
    fun `empty tag list`() {}

    @Test
    fun `empty tag translations`() {}

    @Nested
    inner class ErrorCases {
        @Test
        fun `server sends empty body`() {}

        @Test
        fun `server sends invalid json`() {}

        @Test
        fun `server sends 500`() {}

        @Test
        fun `timeout - server response takes too long`() {}

        @Test
        fun `not available at all - wrong url`() {}
    }
}
```

**5. Mockito-Kotlin**

    Mockito-Kotlin được khuyến khích sử dụng vì nó cung cấp API  thuận tiện và idiomatic. Ví dụ Ví dụ, nó tạo điều kiện cho các type reified của Kotlin. Vì vậy, type có thể được infer và chúng ta không phải chỉ định rõ ràng.

```java
//plain Mockito
val service = mock(TagService::class.java)
setClient(mock(Client::class.java))

//Mockito-Kotlin
val service: TagService = mock()
setClient(mock())
```

**6. Tạo các mock**

    Việc tạo lại các mock trước mỗi test rất chậm và yêu cầu việc sử dụng lateinit.
    
 ```java
 /Don't
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class DesignControllerTest_RecreatingMocks {

    private lateinit var dao: DesignDAO
    private lateinit var mapper: DesignMapper
    private lateinit var controller: DesignController

    @BeforeEach
    fun init() {
        dao = mock()
        mapper = mock()
        controller = DesignController(dao, mapper)
    }

    // takes 1,5 s!
    @RepeatedTest(300)
    fun foo() {
        controller.doSomething()
    }
}
 ```
 
 Thay vào đó, hãy tạo mock instance một lần và đặt lại chúng trước hoặc sau mỗi test. Nó nhanh hơn đáng kể (1,5 giây so với 220 ms trong ví dụ) và cho phép sử dụng các trường không thay đổi với val.
 
 ```java
 // Do:
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class DesignControllerTest {

    private val dao: DesignDAO = mock()
    private val mapper: DesignMapper = mock()
    private val controller = DesignController(dao, mapper)

    @BeforeEach
    fun init() {
        reset(dao, mapper)
    }

    // takes 210 ms
    @RepeatedTest(300)
    fun foo() {
        controller.doSomething()
    }
}
 ```
 
** 7. Xử lý các Class với State**

Phương pháp tạo một lần đã được trình bày cho test fixture chỉ hoạt động nếu chúng không có bất kỳ trạng thái nào hoặc có thể được đặt lại dễ dàng (như mocks). Trong các trường hợp khác, việc tạo lại trước mỗi test là không thể tránh khỏi.

```java
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class DesignViewTest {

    private val dao: DesignDAO = mock()
    // the class under test has state
    private lateinit var view: DesignView

    @BeforeEach
    fun init() {
        reset(dao)
        view = DesignView(dao)
    }

    @Test
    fun changeButton() {
        assertThat(view.button.caption).isEqualTo("Hi")
        view.changeButton()
        assertThat(view.button.caption).isEqualTo("Guten Tag")
    }
}
```

Nguồn: https://blog.philipphauer.de/best-practices-unit-testing-kotlin/