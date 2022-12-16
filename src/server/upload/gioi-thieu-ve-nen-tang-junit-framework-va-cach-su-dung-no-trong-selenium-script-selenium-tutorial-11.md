Về cơ bản, JUnit là một công cụ kiểm tra đơn vị (Unit Testing) nguồn mở và được sử dụng để kiểm tra các đơn vị mã lớn/nhỏ. Để chạy thử nghiệm JUnit, bạn không cần phải tạo class object (đối tượng lớp) hoặc định nghĩa main method nào. JUnit cung cấp sẵn thư viện assertion - cái được sử dụng để đánh giá kết quả test. Các Annotation của JUnit được sử dụng để chạy method test. JUnit cũng được sử dụng để chạy bộ Automation có nhiều trường hợp kiểm thử ( nhiều testcase).

Sau đây chúng  ta cùng tìm hiểu kỹ hơn về cách sử dụng JUnit nhé.

### Thêm thư viện JUnit vào dự án Java

Đầu tiên chúng ta sẽ học cách thêm thư viện JUnit vào dự án Java:

**Bước 1:** Chuột phải vào Java project->Build Path->Configure Build path

**Bước 2:** Click Libraries->Add Library

![](https://images.viblo.asia/f3ba06be-f136-4e33-8725-1e460bd215b7.jpg)

**Bước 3:** Sau khi cửa sổ Add Library mở ra, chọn mục JUnit

![](https://images.viblo.asia/e40afe91-fdb6-4087-9264-bb8d81c53c38.jpg)

**Bước 4:** Chọn version  Junit4->Finish

![](https://images.viblo.asia/6c082004-4efd-4650-8e2e-0d4e9a88d795.jpg)

**Bước 5:** Click OK

![](https://images.viblo.asia/e0ce4a46-993c-4307-91cb-dd9b167a91cf.jpg)

Có nhiều nền tảng như Data Driven Framework, Keyword Driven Framework, Hybrid Framework.... sử dụng công cụ JUnit làm trình chạy test và giúp ích trong việc thực hiện khởi chạy và báo cáo hàng loạt.

### Sử dụng JUnit Annotation trong kịch bản test của Selenium

Có rất nhiều Annotation có sẵn trong Junit. Dưới đây là 1 vài JUnit Annotation được sử dụng thường xuyên trong các tập lệnh và nền tảng của Selenium.

**#1. @Test**

Annotation này biểu thị rằng method này là method test. `@Test` là 1 annotation được sử dụng để chạy Junit test.

**Ví dụ :**

```
@Test
public void junitTest()
{
System.out.println("Running Junit test");
Assert.assertEquals(1,1);
}
```

**Cách chạy 1 JUnit test:**

Điều hướng đến `Run` -> `Run as JUnit test`

**#2. @Before:**

Annotation này biểu thị rằng phương thức được chú thích (trong @Before) phải được thực hiện trước mỗi annotation khác trong lớp hiện tại. (Tương tự với @BeforeEach trong JUnit 5)

**Ví dụ :**

```
public class Junttest {
@Before
public void beforeTest(){
System.out.println("Running before test");
}
 
@Test
public void junitTest(){
System.out.println("Running Junit test");
}
}
```

**Output:**

Running `beforeTest()`
Running `junitTest()`

**Ví dụ về sử dụng before annotation với nhiều junit test method :**

```
public class Junttest {
@Before
public void beforeTest(){
System.out.println("Running before test");
}
 
@Test
public void junitTest(){
System.out.println("Running Junit test");
}
 
@Test
public void secondJunitTest(){
System.out.println("Running second Junit test");
}
}
```

**Output:**

Running `beforeTest()`
Running `junitTest()`
Running `beforeTest()`
Running `secondJunitTest()`

Chạy method beforeTest trước mỗi khi chạy 1 JUnit test.

**#3. @BeforeClass**

Annotation này biểu thị rằng phương thức được chú thích (trong @BeforeClass) phải được thực hiện 1 lần duy nhất trước tất cả các annotation khác trong lớp hiện tại. (Chỉ thực hiện 1 lần duy nhất trước khi thực hiện tất cả các annotation khác trong class thay vì được thực hiện trước mỗi khi thực hiện 1 annotation giống @Before trên. Tương tự với @BeforeAll trong JUnit 5)

Phương thức trong @BeforeClass phải là 1 phương thức tĩnh. Các phương thức như khởi tạo các file thuộc tính, DB ... sẽ được thực hiện trong method kiểu này.

```
public class Junttest {
@BeforeClass
public static void beforeClassTest(){
System.out.println("Executed before class method");
}
 
@Test
public void junitTest(){
System.out.println("Running Junit test");
}
 
@Test
public void secondJunitTest(){
System.out.println("Running second Junit test");
}
}
```

**Output:**

Running `beforeClassTest()`
Running `junitTest()`
Running `secondJunitTest()`

**#4. @After**

Annotation này biểu thị rằng phương thức được chú thích (trong @After) được thực hiện sau mỗi phương thức của các annotation khác.

```
public class Junttest {
@Test
public void junitTest(){
System.out.println("Running Junit test");
}
 
@Test
public void secondJunitTest(){
System.out.println("Running second Junit test");
}
 
@After
public void afterTest(){
System.out.println("Running after method");
}
}
```

**Output:**

Running `junitTest()`
Running `afterTest()`
Running `secondJunitTest()`
Running `afterTest()`

**#5. @AfterClass**

Giống như @BeforeClass, @AfterClass được thực hiện 1 lần duy nhất sau khi chạy tất cả các annotation khác trong lớp hiện tại.
Phương thức trong @AfterClass cũng là phương thức tĩnh.

```
public class Junttest {
 
@Test
public void junitTest(){
System.out.println("Running Junit test");
}
 
@Test
public void secondJunitTest(){
System.out.println("Running second Junit test");
}
 
@AfterClass
Public static void afterClassTest(){
System.out.println("Running afterclass method");
}
}
```

**Output:**

Running `junitTest()`
Running `secondJunitTest()`
Running `afterTest()`

Các JUnit assertion được sử dụng để validate một số điều kiện nhất định, và dừng chương trình thực thi nếu không thỏa mãn các điều kiện này.

**#6. Tham số hóa JUnit class:**

Để sử dụng khi cần chạy 1 kịch bản giống  nhau với nhiều tập data.

Thẻ annotation `@Parameters` được sử dụng để pass multi-data. Trong ví dụ dưới đây, chúng ta có mảng 2 chiều 2*2  để lưu trữ data :

![](https://images.viblo.asia/71bf77b6-e6ff-45ab-bfb5-4dc87be9391b.jpg)

Chúng ta sẽ sử dụng @Parameters để tạo phương thức khởi tạo mảng 2 chiều để xử lý kiểu dữ liệu mảng trên :

```
@RunWith(Parameterized.class)
public class Junttest {
public String name;
public int age;
public Junttest(String name,int age){
this.name=name;
this.age=age;
}
 
@Test
public void testMethod(){
System.out.println("Name is: "+name +" and age is: "+age);
}
 
@Parameters
public static Collection<Object[]> parameter(){
Object[][] pData=new Object[2][2];
pData[0][0]="Tom";
pData[0][1]=30;
pData[1][0]="Harry";
pData[1][1]=40;
return Arrays.asList(pData);
}
}
```

### Các JUnit Assertion

**1. JUnit assertEquals:**

Dùng để so sánh phép bằng giữa 2 giá trị (True nếu 2 giá trị bằng nhau, fail nếu 2 giá trị không bằng nhau).
Dùng so sánh các giá trị kiểu : Boolean, int, String, float, long, char .........

**Syntax**:
`Assert.assertEqual(“excepted value”, ”actual value”);`

**Ví dụ**:
```
Assert.assertEqual(“ABC”,”ABC”); //2 chuỗi này giống nhau nên assertion sẽ pass.
Assert.assertEqual(“ABC”,”DEF”); //2 chuỗi này khác nhau nên assertion sẽ fail.
Assert.assertEqual(“Strings are not equal”, “ABC”,”DEF”); //message “Strings are not equal” sẽ được hiển thị (bắn ra) nếu điều kiện equal không thoản mãn (fail, 2 giá trị được so sánh không bằng nhau).
```

**Dưới đây là ví dụ về việc sử dụng JUnit assertion trong Selenium:**

```
String username=driver.findElement(By.id(“username”)).getText();
String password=driver.findElement(By.id(“password”)).getText();
Assert.assertEqual(“Mismatch in both the string”, username, password);
```

Trong ví dụ trên assertion sẽ fail vì cả hai chuỗi username, password không bằng nhau. Một là văn bản của trường tên người dùng và một là văn bản của trường mật khẩu.

**2. JUnit assertTrue:**

Trả về true nếu điều kiện là đúng, ngược lại assertion fail nếu điều kiện là sai.

```
Assert.assertTrue(“message”, condition);
Assert.assertTrue(“Both the strings are not equal”, (“HelloWorld”).equals(“HelloWorld”));
```

Trong ví dụ trên, sẽ trả về true (assertion pass) vì condition true (2 string giống nhau) => Message “Both the strings are not equal” không được hiển thị.

**2. JUnit assertFalse:**

Trả về true nếu điều kiện là sai, ngược lại assertion fail nếu điều kiện là đúng.

```
Assert.assertFalse(“message”, condition);
Assert.assertFalse(“Both the strings are equal”, (“HelloWorld”).equals(“HelloWorld”));
```

Trong ví dụ trên, sẽ trả về fail (assertion fail) vì 2 string giống nhau => Message “Both the strings are equal”  được hiển thị ra.

Còn trong ví dụ dưới đây, sẽ trả về assertion true (vì condition trả về false) :

```
Assert.assertFalse(“message”, condition);
Assert.assertFalse(“Both the strings are equal”, (“Hello”).equals(“HelloWorld”));
```

JUnit hay được sử dụng bên developer nhiều hơn là bên tester, tester chúng ta không nhất thiết cần biết lĩnh vực này, khuyến khích đọc thêm để thuận tiên hơn khi cần sử dụng đến, 

Bài dịch trên có thể vẫn còn chỗ chưa rõ ràng, nếu bản quan tâm có thể theo dõi bài viết gốc tại đây : 
https://www.softwaretestinghelp.com/selenium-junit-framework-selenium-tutorial-11/