# Tổng quát

Như bạn có thể đã biết, thông thạo API sẽ  giúp code của bạn dễ đọc và dễ bảo trì hơn. Chúng tôi đã thấy một vài bài viết về  designing Page Objects and Business Workflows rất dễ dàng. Trong bài viết này, hãy xem cách mà chúng tôi sử dụng các câu lệnh assert cho  automation test bằng thư viện AssertJ. Hãy xem các ví dụ trong bài viết này. Bạn có thể dễ dàng so sánh điều đó với các  câu lệnh assert JUnit / TestNG của bạn và hiểu được lợi ích của việc sử dụng AssertJ.

## AssertJ:

Đơn giản là một thư viện sẽ giúp bạn verify(xác thực) kết quả trả về so với kết quả mong đợi
Nó cũng cho phép bạn mở rộng thư viện cho các đối tượng tùy chỉnh của bạn

## Maven

Để thêm thư viện Assert vào trong dự án của bạn, hãy add thêm dependency vào trong file POM như sau:

```
<dependency>
    <groupId>org.assertj</groupId>
    <artifactId>assertj-core</artifactId>
    <version>3.9.1</version>
    <scope>test</scope>
</dependency>
```

sau khi add được thư viện vào file pom , thì tự động thư viện Assert sẽ được add vào project của bạn

### Ví dụ:

Hãy bắt đầu với các ví dụ sau nhé:

**boolean check**

```
@Test
public void stringCompare(){

    String expected = "Test Automation Guru";
    String actual   = "test automation guru";

    assertThat(actual).isEqualTo(expected);

}
```

out put:

```
java.lang.AssertionError: 
Expecting:
 <"test automation guru">
to be equal to:
 <"Test Automation Guru">
but was not.
```

ngoài ra bạn cũng có thể sử dụng vài mô tả cho câu lệnh assert cua bạn
```
assertThat(actual).as("AssertJ String Comparison Check").isEqualTo(expected);
```

**Kiểm tra null và blank**

```
assertThat(actual).isNotNull()
                  .isNotBlank();
```

**Kiểm tra các chuỗi khác nhau**

```
assertThat(actual).doesNotStartWith("Test")
                  .doesNotEndWith("Guru")
                  .doesNotContain("automation")
                  .contains("assertj");
```

**So sánh số với kiểu int**

```
assertThat(10).isBetween(5,15);

assertThat(10).isPositive()
                     .isGreaterThan(8)
                     .isLessThan(12);
```

**So sánh Date**

```
LocalDate today = LocalDate.now();
LocalDate yesterday = LocalDate.now().minusDays(1);
LocalDate tomorrow = LocalDate.now().plusDays(1);

assertThat(today).isAfter(yesterday).isBefore(tomorrow);
```

Bạn cũng có thể sử dụng date như định dạng ngày được hiển thị ở dưới đây:

```
assertThat(today).isAfter("2015-01-01").isBefore("2016-12-31");
```

**Xâu chuỗi các ngày để so sánh:**

```
Date today = new Date();
assertThat(today).hasMonth(3)
        .hasDayOfMonth(24)
        .hasHourOfDay(10)
        .hasMinute(15);
```

**So sánh list:**

```
List<String> list = new ArrayList<>();
list.add("test");
list.add("automation");
list.add("guru");

assertThat(list).hasSize(3)  //passes
                .containsAnyOf("automation", "guru")  //passes
                .doesNotContain("test");   //fails as it contains test
```

**So sánh list và thứ tự các phần tử phải giống nhau**

```
//expected
List<String> expected = new ArrayList<>();
expected.add("guru");
expected.add("automation");
expected.add("test");

//actual
List<String> actual = new ArrayList<>();
actual.add("test");
actual.add("automation");
actual.add("guru");

//no change in the order check
assertThat(actual).containsExactly(expected.toArray(new String[expected.size()]));
```

Out put:
```
java.lang.AssertionError: 
Actual and expected have the same elements but not in the same order, at index 0 actual element was:
  <"test">
whereas expected element was:
  <"guru">
```

**So sánh các phần tử có mặt mà không quan tâm đến thứ tự**
```
//any order check
assertThat(actual).containsAll(expected);
//OR
assertThat(actual).containsExactlyInAnyOrder(expected.toArray(new String[expected.size()]));
```

**So sánh nội dung 2 file với nhau**
```
File expected = Paths.get("/home/vins/expected-file.txt").toFile();
File actual = Paths.get("/home/vins/actual-file.txt").toFile();

assertThat(expected).hasSameContentAs(actual);
```

Giả sử rằng bạn có tệp CSV như được hiển thị ở đây ở bên trái. Bạn chạy các bài kiểm tra automation của mình và tải xuống một tệp mới, ’thực tế - nhưng nội dung tệp được hiển thị ở đây ở bên phải. Về cơ bản chúng có các thông tin tương tự. Tuy nhiên thứ tự đã thay đổi một chút. Nếu bạn muốn thực hiện khớp chính xác, hãy sử dụng phương pháp so sánh tệp ở trên. Nếu thứ tự  tin không quan trọng, thì hãy  sử dụng cách dưới đây:

```
List<String > expected = Files.readAllLines(Paths.get("/home/qa/expected-file.csv"));
List<String > actual = Files.readAllLines(Paths.get("/home/qa/actual-file.csv"));

assertThat(actual).containsAll(expected);
```

**So sánh mềm**

```
String expected = "Test Automation Guru";
String actual = "Test Automation Guru";

SoftAssertions.assertSoftly(s -> {
    s.assertThat(actual).doesNotContain("automation");
    s.assertThat(actual).doesNotStartWith("Test");
    s.assertThat(actual).doesNotEndWith("Guru");
    s.assertThat(actual).isEqualTo(expected);
});
```

Output

```
The following 2 assertions failed:
1) 
Expecting:
  <"Test Automation Guru">
not to start with:
  <"Test">

at AssertJTest.lambda$stringCompare$0(AssertJTest.java:31)
2) 
Expecting:
  <"Test Automation Guru">
not to end with:
  <"Guru">

at AssertJTest.lambda$stringCompare$0(AssertJTest.java:32)
```

**Kết luận**

AssertJ là một trong những thư viện thú vị nhất mà chúng ta có trong Java. Nó làm cho kịch bản tự động hóa thử nghiệm của bạn có thể đọc được và dễ dàng duy trì bằng cách kết nối các  assert khác nhau. Nếu bạn đã thực hiện tất cả các so sánh của mình bằng JUnit / TestNg, đừng lo lắng! AssertJ cung cấp một tiện ích để chuyển đổi tất cả các xác nhận của bạn thành các xác nhận assertj.

Link tham khảo :

http://www.vinsguru.com/selenium-webdriver-how-to-improve-your-assertions-using-assertj/