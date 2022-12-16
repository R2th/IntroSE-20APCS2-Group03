Trong các bài trước chúng ta đã cùng tìm hiểu về [kiểm thử (Testing)](https://gpcoder.com/5194-tim-hieu-ve-kiem-thu-tesing-trong-phat-trien-phan-mem/) trong phát triển phần mềm và [Unit Testing](https://gpcoder.com/5202-unit-testing-trong-phat-trien-phan-mem-hien-dai/), TDD. Trong bài này, chúng ta sẽ cùng tìm hiểu về cách viết Unit Test trong Java với JUnit Framework.

## JUnit là gì?

Trong Java, để thực hiện viết code cho Unit Test chúng ta có thể sử dụng một trong hai Framework: JUnit và TestNG.

JUnit là một framework mã nguồn mở, miễn phí, đơn giản dùng để unit test cho ngôn ngữ lập trình Java. Trong Java, chúng ta thường sẽ sử dụng method để làm unit test.

Hiện tại, hầu hết trong các dự án chúng ta vẫn đang sử dụng JUnit 4, nhưng JUnit 5 đã được phát hành và có lẽ nó sẽ trở thành xu hướng trong thời gian sắp tới. Chúng ta có thể sử dụng JUnit để viết code test cho cả unit testing và integration testing.

## Các tính năng của JUnit

* JUnit là một framework mã nguồn mở, được sử dụng để viết và chạy kiểm thử.
* Cung cấp các annotation để định nghĩa các phương thức kiểm thử.
* Cung cấp các Assertion để kiểm tra kết quả mong đợi.
* Cung cấp các test runner để thực thi các test script.
* Test case JUnit có thể được chạy tự động.
* Test case JUnit có thể được tổ chức thành các test suite.
* JUnit cho thấy kết quả test một cách trực quan: pass (không có lỗi) là màu xanh và fail (có lỗi) là màu đỏ.
* ….

## Một số khái niệm cần biết trong Unit Test

* **Unit Test case**: là 1 chuỗi code để đảm bảo rằng đoạn code được kiểm thử làm việc như mong đợi. Mỗi function sẽ có nhiều test case, ứng với mỗi trường hợp function chạy.
* **Setup**: Đây là hàm được chạy trước khi chạy các test case, thường dùng để chuẩn bị dữ liệu để chạy test.
* **Teardown**: Đây là hàm được chạy sau khi các test case chạy xong, thường dùng để xóa dữ liệu, giải phóng bộ nhớ.
* **Assert**: Mỗi test case sẽ có một hoặc nhiều câu lệnh Assert, để kiểm tra tính đúng đắn của hàm.
* **Mock**: là một đối tượng ảo, mô phỏng các tính chất và hành vi giống hệt như đối tượng thực được truyền vào bên trong khối mã đang vận hành nhằm kiểm tra tính đúng đắn của các hoạt động bên trong. Giả sử chương trình của chúng ta được chia làm 2 module: A và B. Module A đã code xong, B thì chưa. Để test module A, ta dùng mock để làm giả module B, không cần phải đợi tới khi module B code xong mới test được.
* **Test Suite** : Test suite là một tập các test case và nó cũng có thể bao gồm nhiều test suite khác, test suite chính là tổ hợp các test.

## Cài đặt JUnit

Ngày nay, JUnit được tích hợp sẵn trong hầu hết các Java IDE (Eclipse, NetBeans và IntelliJ). Nếu không có sẵn, các bạn có thể tạo một [project Maven](https://gpcoder.com/2916-huong-dan-su-dung-apache-maven-voi-eclipse/) và thêm thư viện JUnit vào file pom.xml như sau:

```
<!-- https://mvnrepository.com/artifact/junit/junit -->
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
    <scope>test</scope>
</dependency>
```
Trong bài viết này, chúng ta sẽ sử dụng phiên bản JUnit 4. Đối với JUnit 5, chúng ta sẽ cùng tìm hiểu ở một bài viết khác.

## Ví dụ sử dụng JUnit trên Eclipse

Giả sử chúng ta có một class util có 2 phương thức devide() và add().

* Phương thức divide() : thực hiện chia phần nguyên của 2 số. Phương thức này nhận 2 đối số: số bị chia (dividend) và số chia (divisor). Nếu số chia là 0 thì chương trình sẽ throw một ngoại lệ, ngược lại chương trình sẽ trả về kết quả sau khi thực hiện chia nguyên.
* Phương thức add() : sẽ thực hiện tính tổng của 2 số nguyên.

Chương trình của chúng ta như sau:

```
package com.gpcoder.junit.util;
 
public class MathUtil {
 
    private MathUtil() {
        throw new UnsupportedOperationException("Cannot call constructor directly!");
    }
 
    public static int divide(int dividend, int divisor) {
        if (divisor == 0) {
            throw new IllegalArgumentException("Cannot divide by zero (0).");
        }
        return dividend / divisor;
    }
 
    public static int add(int number1, int number2) {
        return number1 - number2;
    }
}
```

Bây giờ chúng ta sẽ sử dụng JUnit để kiểm tra phương thức trên với các đầu vào khác nhau.

![](https://images.viblo.asia/89479f0c-fe04-4720-8e71-ed103c81e5ca.png)

Đầu tiên chúng ta sẽ tạo một class mới với suffix là xxxTest. Đây là một naming convention cho Unit Test. Class này nên được đặt trong thư mục test, cùng package name với tên của class cần viêt unit test để dễ dàng quản lý.

Tiếp theo, chúng ta sẽ tạo test case để test các trường hợp có thể có của một phương thức. Mỗi test case nên tạo một phương thức để kiểm tra:
* Phương thức devide() có thể có một số trường hợp test sau: trường hợp kết quả phép chia ra một số nguyên, trường hợp kết quả phép chia ra số lẻ, trường hợp số chia là số 0.
* Phương thức add() : chỉ đơn giản kiểm tra kết quả cộng 2 số.

```
package com.gpcoder.junit.util;
 
import org.junit.Assert;
import org.junit.Test;
 
public class MathUtilTest {
 
    @Test
    public void divide_SixDividedByTwo_ReturnThree() {
        final int expected = 3;
 
        final int actual = MathUtil.divide(6, 2);
 
        Assert.assertEquals(expected, actual);
    }
 
    @Test
    public void divide_OneDividedByTwo_ReturnZero() {
        final int expected = 0;
 
        final int actual = MathUtil.divide(1, 2);
 
        Assert.assertEquals(expected, actual);
    }
 
    @Test(expected = IllegalArgumentException.class)
    public void divide_OneDividedByZero_ThrowsIllegalArgumentException() {
        MathUtil.divide(1, 0);
    }
 
    @Test
    public void add_SixAddedByTwo_ReturnEight() {
        final int expected = 8;
 
        final int actual = MathUtil.add(6, 2);
 
        Assert.assertEquals(expected, actual);
    }
}
```

Để chạy kiểm tra các test case trên, chúng ta sẽ chọn chuột phải trên class tương ứng cần test, sau đó chọn **Run As** –> **Unit Test**. Tương tự, chúng ta cũng có thể thực thi test cho một phương thức hoặc cả project.

Chúng ta có kết quả như sau:

![](https://images.viblo.asia/66516a17-5d8f-4166-b9f6-963d29e8073c.png)

Trên kết quả test, chúng ta có thể thấy được tổng thời gian thực hiện tất cả các test case (0.055 seconds), thời gian thực thi mỗi test case, kết quả các test case tương ứng.

Như trong ví dụ trên, chúng ta có 3 phương thức pass (có màu xanh) cho phương thức divide(). Điều này có nghĩa là code logic của phương thức devide() đã đúng như mong đợi.

Phương thức add_SixAddedByTwo_ReturnEight() có màu đỏ, điều này có nghĩa là logic của phương thức add() đã có gì đó không đúng như mong đợi. Khi chúng ta click chuột vào test case bị lỗi, IDE sẽ hiển thị một vài thông tin chi tiết tại sao kết quả lại fail. Như hình bên trái, chúng ta có thể thấy là phương thức add() đang mong muốn là 8 nhưng kết quả là 4. Từ đó, chúng ta có thể kiểm tra lại code của chương trình để tìm nguyên nhân xảy ra kết quả không mong đợi.

## Kiểm tra độ bao phủ của Unit Test với plugin EclEmma

Trong bài viết [Hướng dẫn sử dụng plugin EclEmma trong Eclipse](https://gpcoder.com/1943-huong-dan-su-dung-plugin-eclemma-trong-eclipse/), tôi đã giới thiệu với các bạn plugin EclEmma (Coverage – Jacoco), một công cụ để kiểm tra độ bao phủ của code Unit Testcase trong chương trình. EclEmma có thể đánh dấu những đoạn code nào mà testcase chưa đáp ứng được, tính tỷ lệ phần trăm độ bao phủ của testcase trên từng file, package, project. Từ đó chúng ta có thể đánh giá được chất lượng của Unit Testcase, cũng như dễ dàng bổ sung testcase cho những đoạn code còn thiếu.

![](https://images.viblo.asia/263be5ea-ff1c-4041-aec7-38dc25672f36.png)

EclEmma sử dụng màu để đánh dấu kết quả bao phủ của code Unit Test. Từ đó có thể bổ sung một số trường hợp còn thiếu nếu cần thiết.

* Màu đỏ: code Unit Test chưa bao phủ (chưa kiểm tra) được dòng code này.
* Màu vàng: chưa bao phủ hết trường hợp.
* Màu xanh: đã được kiểm tra.

Lời kết: Trên đây là một số thông tin cơ bản về JUnit trong Java. Trong các bài viết tiếp theo, chúng ta sẽ cùng tìm hiểu sâu hơn về cách thực hiện unit test với JUnit cho các trường hợp phức tạp và giải thích các annotation của JUnit đã sử dụng trong bài viết này.

Link bài viết gốc: https://gpcoder.com/5234-kiem-thu-voi-junit-trong-java/