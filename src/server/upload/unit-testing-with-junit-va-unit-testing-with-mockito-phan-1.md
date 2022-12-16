## I. Unit Testing with JUnit
### 1. JUnit Framework
JUnit là một framework dành cho việc Kiểm thử, nó sử dụng annotation để xác định các method đc chỉ định cho việc test   
### 2. Cách xác định 1 function test trong Junit
Một JUnit test là một method đc chứa trong một lớp mà lớp đó chỉ đc sử dụng cho việc test (hay còn đc gọi là Test class)   
Để định nghĩa một method là một method test bạn chú thích nó với từ khóa @Test  
Method này sẽ thực thi code bên trong annation @Test. Và bạn cũng có thể sử dụng các method assert đc cung cấp bởi Junit để kiểm tra kết quả trả về mong đợi   
**Example**
```javascript
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class MyTests {

    @Test
    public void multiplicationOfZeroIntegersShouldReturnZero() {
        MyClass tester = new MyClass(); // MyClass is tested

        // assert statements
        assertEquals(0, tester.multiply(10, 0), "10 x 0 must be 0");
        assertEquals(0, tester.multiply(0, 10), "0 x 10 must be 0");
        assertEquals(0, tester.multiply(0, 0), "0 x 0 must be 0");
    }
}
```

### 3. Junit Naming Conventions
Có một vài quy ước đặt tên ngầm cho Junit test. Cách đc sử dụng rộng rãi và phổ biến nhất cho các lớp là việc dùng hậu tố “Test” ở cuối tên Class  
Theo một nguyên tắc chung thì tên funtion test sẽ mô tả tóm tắt nội dung mà funtion test đó sẽ làm.  
refer [JUnitNamingConvention](https://stackoverflow.com/questions/155436/unit-test-naming-best-practices)
### 4. Using Junit4
**4.1 ĐỊnh nghĩa các method test**  
JUnit sử dụng annotaion để đánh dấu method như là một method test và sau đó config chúng.  
Bảng dưới đây mô tả tổng quan những annotation đc sử dụng rộng rãi nhất trong JUnit (version 4.x và 5.x)    
* Table1: Annotaion  


|  JUnit 4 | Description |
| -------- | -------- | -------- |
| import org.junit.*     | Import statements cho việc sử dụng annotation  |
| @Test     | Đánh dấu method test    | Text     |
| @Before     | Đc thực thi trc khi thực thi mỗi funtion test, nó đc sử dụng để chuẩn bị môi trường cho việc test (đọc, input data, khởi tạo class,...)
| @After     | Đc thực thi sau mỗi funtion test. nó đc sử dụng để làm sạch môi trường test ( 
| @BeforeClass     |Đc thực thi một lần trc khi bắt đầu thực thi tất cả các funtion test. Các phương thức đc đánh dấu bằng annotaion này thì cần đc xác định là static để làm việc vs JUnit      | 
| @AfterClass     | Đc thực thi một lần, sau khi tất cả các funtion test kết thúc, nó đc sử dụng để dọn dẹp một số thứ đã chuẩn bị trc đó cho việc test (connect database,...).  Các phương thức đc đánh dấu bằng annotaion này thì cần đc xác định là static để làm việc vs JUnit    | 
| @Ignore or @Ignore("Why disabled")     | Đánh dấu test đó là disabled. Nó hữu ích trong trường hợp code thay đổi mà funtion test vẫn chưa đc điều chỉnh     | 
| @Test (expected = Exception.class)     | Failed nếu method không ném ra đc tên một exeption     |
| @Test(timeout=100)     | Failed nếu method test đó chạy quá 100 ms      |   
  
4.2 Assert Statement  (Các khẳng định mong đợi)

|  Statement |  Description | 
| -------- | -------- | -------- |
| assertTrue(message, boolean condition)     | Đánh giá biểu thức luận lý. Test sẽ được chấp nhận nếu biểu thức đó đúng     |
| assertFalse(message, boolean condition)     | Đánh giá biểu thức luận lý. Test sẽ được chấp nhận nếu biểu thức đó sai.     |
| assertNull(message, object)     | So sánh tham chiếu của một đối tượng với giá trị null. Test sẽ được chấp nhận nếu tham chiếu đối tượng đó là null.     |
| assertNotNull(message, object)     | So sánh tham chiếu của một đối tượng với null. Test sẽ được chấp nhận nếu tham chiếu đối tượng đó khác null.     |
| assertSame(message,expected, actual)     |  So sánh địa chỉ vùng nhớ của 2 tham chiếu đối tượng bằng cách sử dụng toán tử ==. Test sẽ được chấp nhận nếu cả 2 đều tham chiếu đến cùng một đối tượng.     |
| assertNotSame(message,expected, actual)     | So sánh địa chỉ vùng nhớ của 2 tham chiếu đối tượng bằng cách sử dụng toán tử ==. Test sẽ được chấp nhận nếu cả 2 đều tham chiếu đến các đối tượng khác nhau.     |
| assertThat()     | So sánh một giá trị thực tế có thõa mãn với 1 Matcher được xác định hay không. Với matchers có thể kiểm tra kết quả của một string, number, collections…     |
| fail()     | Phương thức này làm cho test hiện hành thất bại, phương thức này thường được sử dụng khi xử lý các ngoại lệ. Mặc dù chúng ta có thể chỉ cần sử dụng phương thức assertTrue() cho gần như hầu hết các test case, tuy nhiên thì việc sử dụng một trong các phương thức assertXXX() cụ thể sẽ làm cho các test dễ hiểu hơn và cung cấp các thông điệp khi một test bị fail rõ ràng hơn.     |

## II. Unit test with Mockito ##

### 1. Mục tiêu và thử thách của unit testing
Unit test (kiểm tra đơn vị) nên kiểm tra các function một cách độc lập. Các yếu tố bên ngoài đc sinh ra từ các class khác hoặc do hệ thống nên đc loại bỏ trc khi thực hiện test nếu có thể  
Và điều này có thể đc thực hiện thông qua việc sử dụng test replacement (test doubles) cho các phụ thuộc đc sinh ra. Test double có thể phân ra như sau :  
- A dummy object: một đối tượng giả được truyền xung quanh nhưng ko bao giờ đc sử dụng tức là các phương thức của nó ko bao giờ đc sử dụng  
- Fake object: các đối tượng gỉa đc implenment đc sử dụng nhưng thường đc đơn giản hóa  
- **A mock object**: là một đối tượng giả đại diện một interface hoặc một class mà trong đó bạn có thể xác định output của các method xác định. Mock object đc cấu hình để thực hiện một số hành vi nhất định trong quá trình kiểm tra. Nó thường ghi lại sự tương tác với hệ thống  
  
Test Double đảm bảo rằng các funtion test của bạn ko bị ảnh hưởng bởi bất kì yếu tố bên ngoài nào  
### 2. Using mockito for mocking objects
Mockito là một framework phổ biến có thể sử dụng cùng với Junit. Mockito cho phép bạn khởi tạo và configure các đối tượng mock. Việc sử dụng Mockito sẽ làm đơn giản hóa hơn rất nhiều cho việc phát triển các test case mà các lớp có phụ thuộc bên ngoài.  
Nếu bạn sử dụng Mockito trong các test thường sẽ thực hiện như sau :
- Giả lập các đối tượng bên ngoài bằng việc sử dụng annotation @Mock rồi chèn các đối tượng đó vào function test
- Thực thi function test
- Validate code đã đc thực thi  
![](https://images.viblo.asia/a352445d-935c-4066-a2f9-0930c8117e4b.png)



### 3. Add dependency Mockito in Project
```javascript
dependencies {
    // ... more entries
    testCompile 'junit:junit:4.12'

    // required if you want to use Mockito for unit tests
    testCompile 'org.mockito:mockito-core:2.7.22'
    // required if you want to use Mockito for Android tests
    androidTestCompile 'org.mockito:mockito-android:2.7.22'
}
```
### 4. Sử dụng Mockito 
**4.1 Khởi tạo đối tượng mock với với Mockito**  
Mockito cung cấp một vài method cho việc khởi tạo đối tượng mock  
- Sử dụng static mock() method
- sử dụng annotation @mock

Nếu sử dụng @Mock thì bạn phải kích hoạt việc khởi tạo các annotation đó bằng việc sử dụng MockitoRule (MockitoAnnotation.initMocks(this). Hoặc có thể sử dụng @RunWith(MockitoJUitRunner.class)   
Ví dụ sau sử dụng @Mock    
```javascript
import static org.mockito.Mockito.*;

public class MockitoTest  {

    @Mock
    (1) MyDatabase databaseMock; 

    (2) @Rule public MockitoRule mockitoRule = MockitoJUnit.rule(); 

    @Test
    public void testQuery()  {
    (3)    ClassToTest t  = new ClassToTest(databaseMock); 
    (4)   boolean check = t.query("* from t"); 
    (5)  assertTrue(check); 
    (6) verify(databaseMock).query("* from t"); 
    }
}

```
(1) : Yêu cầu Mockito gỉa lập một database instance  
(2): Khởi tạo các đối tượng giả  
(3): Khởi tạo lớp đang đc kiểm tra bằng cách sử dụng biến đã đc khai báo với annotation @Mock  
(4): Thực thi code  
(5): khẳng định method đó trả về true  
(6): validate method truy vấn đã đc gọi trên đối tượng giả lập MyDataBase  
4.2 Cấu hình Mock  

Mockito cho phép chỉ định cấu hình các giá trị trả về thông qua API. Các method không xác định trả về giá trị “rỗng”   
- null for object
- 0 for numbers
- false for boolean
- empty collections for collections

## III. Tài liệu tham khảo
https://www.vogella.com/tutorials/JUnit/article.html 
https://www.vogella.com/tutorials/Mockito/article.html