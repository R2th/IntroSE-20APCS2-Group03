# Giới thiệu
**JUnit** là một framework mã nguồn mở dành cho việc viết Unit Test đối với ngôn ngữ Java. Các cú pháp của JUnit cũng rất đơn giản, giúp cho việc viết Unit Test trở nên dễ dàng và giảm được effort khi code.

Khi viết Unit Test, chúng ta thường xuyên phải tạo ra những đối tượng mới để gọi function trong đó. Đây cũng là một bài toán đau đầu trong việc quản lí những đối tượng, mối quan hệ giữa các đối tượng trong khi viết test. Ngoài ra, để đảm bảo UT không phụ thuộc vào nhau, mỗi UT độc lập được thực thi đúng, chúng ta phải giả định rằng phương thức đó thực thi đúng. **Mockito** hoàn toàn có thể giúp chúng ta giả lập những đối tượng, phương thức sẽ trả ra kết quả đúng để tập trung viết test cho phương thức hiện tại.
# Một số khái niệm cơ bản
## 1. JUnit
Tạo một Class test đơn giản:
```
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { DemoApplicationTestConfig.class })
public class DemoApplicationTest {

    @Autowired
    private UserService userService;

    @Autowired
    private UserDAO userDAO;

    @Before
    public void setUp() {
        User user1 = new User();
        user1.setId(1);
        user1.setUserName("user1");
        user1.setPassWord("123");
        user1.setFullName("John Cena");
        User user2 = new User();
        user2.setId(2);
        user2.setUserName("user2");
        user2.setPassWord("abc");
        user2.setFullName("Jack");
        when(userDAO.getAllUser()).thenReturn(Arrays.asList(user1, user2));
    }

    @Test
    public void test_getAllUser_normal() throws Exception {
        List<User> users = userService.getAllUser();
        assertSame(2, users.size());
    }
}
```
Các annotations trước phương thức test:
* `@RunWith`: Định nghĩa class chạy Unit Test
* `@ContextConfiguration`: Định nghĩa các config, các bean
* `@Test`: Định nghĩa phương thức chạy test (Ứng với 1 test case)
* `@Before`: Thiết lập các logic để test
* `@After`: Định nghĩa những việc cần làm sau khi chạy test xong

Các hàm test trong JUnit:
* `assertEquals()`: So sánh 2 giá trị để kiểm tra bằng nhau. Test sẽ được chấp nhận nếu các giá trị bằng nhau.
* `assertFalse()`: Test sẽ được chấp nhận nếu biểu thức sai.
* `assertNotNull()`: Test sẽ được chấp nhận nếu tham chiếu đối tượng khác null.
* `assertNotSame()`:  Test sẽ được chấp nhận nếu cả 2 đều tham chiếu đến các đối tượng khác nhau
* `assertNull()`: Test sẽ được chấp nhận nếu tham chiếu là null.
* `assertSame()`:  Test sẽ được chấp nhận nếu cả 2 đều tham chiếu đến cùng một đối tượng.
* `assertTrue()`: Test sẽ được chấp nhận nếu biểu thức đúng fail()

Nếu test của chúng ta expect sẽ throw một Exception thì có thể sử dụng `@Test(expected = java.lang.Exception)` cho method test.
## 2. Mockito
Có thể dùng để giả lập các đối tượng, hoặc kết quả trả về từ các method, không cần phải đi vào implement chi tiết. Sau đây là một vài annotation, method để giả lập đối tượng:
* `@Mock`: tương đương với Mockito.mock(class). Tạo ra một đối tượng giả lập, khi gọi method default thì sẽ không thực hiện gì cả.
*  `@Spy`: tương đương với Mockito.spy(object). Tương đương với chúng ta tạo ra một đối tượng thật, mặc định khi chạy các method sẽ thực hiện theo đúng implement của object được spy.
* `@InjectMock`: về cơ bản giống với `@Mock` nhưng sẽ sử dụng để inject đối tượng này vào những đối tượng được mock hoặc spy

Giả lập kết quả cho phương thức:
* `Mockito.when`: dùng để giả lập một lời gọi hàm nào đó được sử dụng bên trong method đang được kiểm thử. Thường đi kèm với thenReturn(), thenAnswer(), thenThrow() để chỉ định kết quả trả về.
* `thenReturn`: Trả về kết quả
* `thenThrows`: Trả về một Error hoặc Exception
* `thenAnswer`: Thực hiện một đoạn method sau khi gọi hàm
# Demo
## 1. Viết class Config:
```
@Configuration
public class DemoApplicationTestConfig {

    @Bean
    public UserService userService() {
        return spy(new UserServiceImpl());
    }

    @Bean
    public UserDAO userDAO() {
        return mock(UserDAO.class);
    }
}
```
## 2. Viết class test
```
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {DemoApplicationTestConfig.class})
public class DemoApplicationTest {

    @Autowired
    private UserService userService;

    @Autowired
    private UserDAO userDAO;

    @Before
    public void setUp() {
        User user1 = new User();
        user1.setId(1);
        user1.setUserName("user1");
        user1.setPassWord("123");
        user1.setFullName("John Cena");
        User user2 = new User();
        user2.setId(2);
        user2.setUserName("user2");
        user2.setPassWord("abc");
        user2.setFullName("Jack");
        when(userDAO.getAllUser()).thenReturn(Arrays.asList(user1, user2));
        when(userDAO.getUserById(1)).thenReturn(user1);
    }

    @Test
    public void test_getAllUser_normal() {
        List<User> users = userService.getAllUser();
        assertSame(2, users.size());
    }

    @Test(expected = NullPointerException.class)
    public void test_getUserById_null() {
        userService.getUserById(null);
    }

    @Test
    public void test_getUserById_normal() {
        User user = userService.getUserById(1);
        assertEquals("user1", user.getUserName());
    }
}
```
Sau khi chạy test với JUnit ta được kết quả như sau:
![](https://images.viblo.asia/7d6681fa-a007-4519-992b-a2ad6e4656e7.PNG)
# Kết luận
Như vậy, trong bài viết này đã trình bày một cách để implement Unit Test đơn giản bằng JUnit và Mockito. Nếu muốn tìm hiểu kĩ hơn về chúng, bạn có thể tham khảo document trên trang chủ. Và  [đây](https://github.com/vannn-1601/demo-junit) là link source code demo. Cảm ơn mọi người đã đọc bài viết!