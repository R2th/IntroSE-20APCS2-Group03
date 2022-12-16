Cả Testng và Junit đều là framework testing sử dụng cho Unit Testing . TestNG tương tự như JUnit. Một số chức năng được thêm vào nó làm cho TestNG mạnh hơn JUnit.

Hướng dẫn này chủ yếu tập trung để phân tích các tính năng của JUnit và TestNG. Nó giúp các nhà phát triển quyết định nên sử dụng framework nào cho Unit testing. Trước tiên, hãy phân tích sự tương đồng giữa TestNG và JUnit4.

TestNG là một framework testing được lấy cảm hứng từ JUnit và NUnit.

Dưới đây là bảng hiển thị các tính năng được hỗ trợ bởi JUnit và TestNG.

![](https://images.viblo.asia/db0001f9-fd45-4324-a5d8-7f95fc56656c.png)


Chú thích
Cả JUnit và TestNG đều sử dụng các chú thích và hầu như tất cả các chú thích đều trông giống nhau.

TestNG sử dụng @B BeforeMethod, @ AfterMethod tương tự như @B Before, @ After trong JUnit4.

Cả TestNG và Junit4 đều sử dụng @Test (timeout = 1000) để timeout. Hãy xem bảng bên dưới để biết thêm chi tiết-




| STT | Mô tả |TestNG| JUnit 4 |
| -------- | -------- | -------- |-------- |
| 1   |Chú thích kiểm tra    | @Test   |@Test   |
|2   | Thực thi trước khi phương thức test đầu tiên được gọi trong lớp hiện tại     | @BeforeClass     |@BeforeClass     |
| 3    | Thực thi sau khi tất cả các phương thức test trong lớp hiện tại     | @AfterClass     |@AfterClass     |
| 4     | Thực thi trước mỗi phương thức test    | @BeforeMethod	     |	@Before     |
| 5     | Thực hiện sau mỗi phương thức test   | @AfterMethod     |@After     |
| 6     |Chú thích để bỏ qua một  test     | @Test(enable=false)     |@ignore     |
| 7     | Chú thích cho ngoại lệ     | @Test(expectedExceptions = ArithmeticException.class)     |@Test(expected = ArithmeticException.class)     |
| 8     | Timeout     | @Test(timeout = 1000)     |@Test(timeout = 1000)     |
| 9     | Thực thi trước tất cả các tests trong suite     | @BeforeSuite     |n/a     |
| 10     | Thực thi sau khi tất cả các tests trong suite     | @AfterSuite     |n/a     |
| 11     | Thực thi trước khi test chạy   | @BeforeTest     |n/a     |
| 12     | Thực thi sau khi test chạy   | 	@AfterTest    |n/a     |
| 13     | Thực thi trước khi phương thức test đầu tiên được gọi mà thuộc về bất kỳ nhóm nào trong số này được gọi     | @BeforeGroups    |n/a     |
| 14     | Chạy sau phương thức test cuối cùng thuộc về bất kỳ nhóm nào ở đây     | @AfterGroups     |n/a     |



Suite Test
Suites được sử dụng để thực hiện nhiều test  cùng nhau. Suites có thể được tạo bằng cả TestNG và JUnit4. Tuy nhiên, các bộ phần mềm mạnh hơn trong TestNG vì nó sử dụng phương pháp rất khác nhau để thực hiện các  tests. Hãy hiểu nó bằng cách sử dụng đoạn mã như dưới đây:

Sử dụng JUnit4

Mô tả lớp dưới đây việc sử dụng suite trong khi làm việc với JUnit4:





package guru99.junit;		


import org.junit.runner.RunWith;		


import org.junit.runners.Suite;		



@RunWith(Suite.class)				
@Suite.SuiteClasses({				
    SuiteTest1.class,			
    SuiteTest2.class,			

})		



public class JunitTest {		
 // Lớp này vẫn trống, nó chỉ được sử dụng như một holder cho các chú thích ở trên		
}



Sử dụng TestNG

TestNG sử dụng xml để gói tất cả các tests tại một nơi.xml dưới đây mô tả việc sử dụng suite trong khi làm việc với TestNG:



<!DOCTYPE suite SYSTEM "http://beust.com/testng/testng-1.0.dtd" >
<suite name="My test suite">
<test name="testing">
<classes>
<class name="com.guru99.SuiteTest1" />
<class name="com.guru99.SuiteTest2" />
</classes>
</test>
</suite>


Ignore Test
Sử dụng cả hai chúng ta có thể bỏ qua một test. Hãy xem nó bằng ví dụ mã được đưa ra dưới đây:

Sử dụng JUnit4

Đoạn mã dưới đây mô tả việc sử dụng chú thích @ignore trong khi làm việc với JUnit4:


@Ignore
public void method1() 
{
	System.out.println("Using @Ignore , this execution is ignored");
}

Sử dụng TestNG

Đoạn mã dưới đây mô tả việc sử dụng chú thích @Test (enable = false) trong khi làm việc với TestNG:


@Test(enabled=false)
public void TestWithException()
{  
	System.out.println("Method should be ignored as it's not ready yet");
}

Exception Test
Exception Test có sẵn cả trong TestNG và JUnit4. Nó được sử dụng để kiểm tra, ngoại lệ nào được ném ra từ test?

Sử dụng JUnit4

Đoạn mã dưới đây mô tả việc sử dụng kiểm tra ngoại lệ trong khi làm việc với JUnit4:




@Test(expected = ArithmeticException.class)  
public void divideByZero() 
{  
	Int i = 1/0;
}

Sử dụng TestNG

Đoạn mã dưới đây mô tả việc sử dụng kiểm tra ngoại lệ trong khi làm việc với TestNG:



@Test(expectedExceptions = ArithmeticException.class)  
public void divideByZero()
{  
Int i = 1/0;
}

Timeout
Tính năng này được triển khai cả trong TestNg và JUnit4.Timeout được sử dụng để chấm dứt 1  test mất nhiều thời gian hơn thời gian quy định (tính bằng mili giây).

Sử dụng JUnit4

Đoạn mã dưới đây mô tả việc sử dụng test timeout  trong khi làm việc với JUnit4:



@Test(timeout = 1000)  
public void method1()
{  
	while (true);  
}
Sử dụng TestNG

Đoạn mã dưới đây mô tả việc sử dụng kiểm tra timeout trong khi làm việc với TestNG:

@Test(timeOut = 1000)  
public void method1()
{  
	while (true);  
}

Parameterized Test
JUnit cung cấp một cách tiếp cận dễ dàng và dễ đọc hơn để test được gọi là Parameterized Test. Cả TestNG và JUnit đều hỗ trợ Parameterized Test nhưng khác nhau về cách chúng xác định giá trị tham số. Hãy xem cái này từng cái một.

Sử dụng JUnit4

Các chú thích "@RunWith" và "@Parameter" được sử dụng để cung cấp giá trị tham số cho unit test. Chú thích @Parameter phải trả về Danh sách []. Tham số này sẽ được truyền vào hàm tạo của lớp làm đối số.



@RunWith(value = Parameterized.class)
public class JunitTest{
    
    privateint number;
    
    public JunitTest6(int number)
 {
    this.number = number;
     }

     @Parameters
    public static Collection<Object[]> data() 
{
       Object[][] data = new Object[][] { { 1 }, { 2 }, { 3 }, { 4 } };
    returnArrays.asList(data);
    }
     
     @Test
    public void parameterTest()
 {
    System.out.println("Parameterized Number is : " + number);
     }
}

Sử dụng TestNG

Trong TestNG, tệp XML hoặc "@DataProvider" được sử dụng để cung cấp một tham số để kiểm tra.

Ở đây, chú thích @Parameter được khai báo trong phương thức, cần một tham số để kiểm tra. Dữ liệu được sử dụng làm tham số sẽ cung cấp trong các tệp cấu hình XML của TestNG. Bằng cách này, chúng tôi có thể sử dụng lại một Test Case duy nhất với các bộ dữ liệu khác nhau và chúng tôi có thể nhận được các kết quả khác nhau.



public class Test1 {

    @Test
    @Parameters(value="number")
    public void parameterTest(int number)
	{
    	System.out.println("Parameterized Number is : " + number);
    }
     
}


Xem tập tin xml bên dưới để sử dụng cho lớp trên:




<!DOCTYPE suite SYSTEM "http://beust.com/testng/testng-1.0.dtd" >
<suite name="My test suite">
<test name="testing">
    
<parameter name="number" value="2"/>    

<classes>
<class name="com.guru99.Test1" />
</classes>
</test>
</suite>




Tóm lược :
 TestNG và JUnit đều giống nhau ngoại trừ kiểm tra tham số và kiểm tra phụ thuộc. Nói tóm lại, chúng tôi có thể nói, dựa trên tính linh hoạt và yêu cầu, chúng tôi có thể chọn bất kỳ một trong số chúng cho Unit Testing.
 
 Refer: https://www.guru99.com/junit-vs-testng.html