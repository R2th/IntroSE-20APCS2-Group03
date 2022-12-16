# Tìm hiểu về Junit trong kiểm thử tự động
## Tổng quan về Junit
Junit là một framwork kiểm thử đơn vị cho ngôn ngữ lập trình Java. JUnit đã rất quan trọng trong việc phát triển phần mềm theo hướng thử nghiệm. Junit là một thể hiện của kiến trúc xUnit cho các khung kiểm thử đơn vị. JUnit thiết lập ý tưởng "thử nghiệm đầu tiên sau codeing", nhấn mạnh vào việc thiết lập dữ liệu thử nghiệm cho một đoạn code có thể được kiểm tra trước và sau đó được triển khai. Cách tiếp cận này giống như "kiểm tra một chút, viết mã một chút, kiểm tra một chút, viết mã một chút.". Junit làm tăng năng suất của lập trình viên và sự ổn định của mã chương trình, do đó làm giảm sự căng thẳng trên lập trình viên và thời gian dành cho việc gỡ lỗi.
*****Các tính năng của Junit*

- JUnit là một framework mã nguồn mở, được sử dụng để viết và chạy thử nghiệm.
- Cung cấp chú thích để xác định phương pháp thử nghiệm.
- Cung cấp xác nhận để kiểm tra kết quả mong đợi
- Cung cấp các trình chạy thử nghiệm để chạy thử nghiệm
- Các bài kiểm tra JUnit cho phép bạn viết mã nhanh hơn, làm tăng chất lượng phần mềm
- JUnit rất đơn giản và tốn ít thời gian hơn
- Các bài kiểm tra JUnit có thể được chạy tự động và họ kiểm tra kết quả của riêng họ và cung cấp phản hồi ngay lập tức. Không cần phải tự tay thông qua một báo cáo kết quả kiểm tra.'
- Các bài kiểm tra JUnit có thể được tổ chức thành các test suites  chứa các test case và thậm chí các test suites  khác.
- JUnit cho thấy tiến trình thử nghiệm trong một thanh có màu xanh lá cây nếu thử nghiệm chạy thành công và nó chuyển sang màu đỏ khi thử nghiệm không thành công.
***Trường hợp kiểm thử đơn vị là gì?***

- Một trường hợp kiểm thử đơn vị là 1 phần của mã nguồn để đảm bảo rằng một phần của mã nguồn hay còn gọi là phương thức hoạt động như mong đợi. Để đạt được kết quả mong muốn một cách nhanh chóng, cần có framewoke kiểm tra bắt buộc. JUnit là một framewoke kiểm thử đơn vị hoàn hảo cho ngôn ngữ lập trình Java. 
- Một trường hợp thử nghiệm đơn vị viết chính thức được đặc trưng bởi một đầu vào được biết đến và một đầu ra dự kiến, được thực hiện trước khi thử nghiệm được thực hiện. Đầu vào đã biết nên kiểm tra điều kiện tiên quyết(precondition) và đầu ra dự kiến sẽ kiểm tra điều kiện sau ( post-condition.).
- Phải có ít nhất hai trường hợp thử nghiệm đơn vị cho mỗi yêu cầu - một thử nghiệm valid data và một thử nghiệm invalid data. Nếu yêu cầu có yêu cầu phụ, mỗi yêu cầu phụ phải có ít nhất hai trường hợp thử nghiệm là valid data và invalid data.

## Các bước cài đặt
***Yêu cầu hệ thống***

| -------- | -------- |
| JDK     | 	1.5 or above.     | 
| -------- | -------- |
| Memory     | 	No minimum requirement.   | 
| -------- | -------- |
| Disk Space     | 	No minimum requirement.   | 
| -------- | -------- |
| Operating System     | 	No minimum requirement.    | 
| -------- | -------- |

***Bước 1: Xác minh cài đặt Java trong máy***

| -------- | -------- | -------- |
| Hệ điều hành     |Tác vụ   | Lệnh |
| -------- | --------| -------- |
| Windows     | 	Open Command Console| c:\> java -version | 
| -------- | -------- | -------- |
| Linux    | 	Open Command Terminal   | $ java -version | 
| -------- | --------| -------- |
| Mac     | 	Open Terminal   | machine:~ joseph$ java -version |
| -------- | -------- | -------- |

***Yêu cầu đầu ra của hệ điều hành***

| -------- | -------- |
| Hệ điều hành     | 	đầu ra    | 
| -------- | -------- |
| Windows     | 	java version "1.8.0_101"
Java(TM) SE Runtime Environment (build 1.8.0_101)  | 
| -------- | -------- |
| Linux   | 	java version "1.8.0_101"
Java(TM) SE Runtime Environment (build 1.8.0_101)  | 
| -------- | -------- |
| Mac | 	java version "1.8.0_101"
Java(TM) SE Runtime Environment (build 1.8.0_101)  | 
| -------- | -------- |
***Bước 2: Cài đặt môi trường JAVA***
Đặt biến môi trường JAVA_HOME để trỏ đến vị trí thư mục cơ sở nơi Java được cài đặt trên máy

| -------- | -------- |
| Hệ điều hành     | 	Output     | 
| -------- | -------- |
| Windows     | 	Đặt biến môi trường JAVA_HOME tới C:\Program Files\Java\jdk1.8.0_101   | 
| -------- | -------- |
| Linux     | 	Xuất JAVA_HOME = /usr/local/java-current  | 
| -------- | -------- |
| Mac    | 	Xuất  JAVA_HOME = /Library/Java/Home   | 
| -------- | -------- |

Nối thêm vị trí trình biên dịch Java vào đường dẫn hệ thống.

| -------- | -------- |
| Hệ điều hành     | 	Output     | 
| -------- | -------- |
| Windows     | 	Nối chuỗi***C:\Program Files\Java\jdk1.8.0_101\bin*** ở cuối biến hệ thống, ***Path***. | 
| -------- | -------- |
| Linux     | 		Xuất  PATH = $PATH:$JAVA_HOME/bin/ | 
| -------- | -------- |
| Mac    | 	Không yêu cầu | 
| -------- | -------- |


***Bước 3: Tải xuống lưu trữ JUnit***
Tải xuống phiên bản mới nhất của tệp JUnit jar từ http://www.junit.org. 
***Bước 4: Cài đặt môi trường JUnit***
Đặt biến môi trường JUNIT_HOME để trỏ đến vị trí thư mục cơ sở nơi JUNIT jar được lưu trữ trên máy của bạn


| -------- | -------- |
| Hệ điều hành     | 	Mô tả     | 
| -------- | -------- |
| Windows     | 	Đặt biến môi trường JUNIT_HOME thành C: \ JUNIT | 
| -------- | -------- |
| Linux     | 		Xuất JUNIT_HOME = / usr / local / JUNIT | 
| -------- | -------- |
| Mac    | 	Xuất JUNIT_HOME = /Library/JUNIT  | 
| -------- | -------- |
***Bước 5: Đặt biến CLASSPATH***
Đặt biến môi trường CLASSPATH để trỏ đến vị trí JUNIT jar.
| -------- | -------- |
| Hệ điều hành     | 	Mô tả     | 
| -------- | -------- |
| Windows     | 	Đặt biến môi trường CLASSPATH thành% CLASSPATH%;% JUNIT_HOME% \ junit4.12.jar; (Với file Junit jar là phiên bản junit4.12) | 
| -------- | -------- |
| Linux     | 		Xuất CLASSPATH = $CLASSPATH:$JUNIT_HOME/junit4.12.jar:| 
| -------- | -------- |
| Mac    | 	Xuất CLASSPATH = $CLASSPATH:$JUNIT_HOME/junit4.12.jar  | 
| -------- | -------- |
## Đặc điểm của Framework kiểm thử Junit
JUnit là một khung kiểm thử hồi quy được sử dụng bởi các nhà phát triển để thực hiện kiểm thử đơn vị trong Java và đẩy nhanh tốc độ lập trình và tăng chất lượng code. JUnit Framework có thể được tích hợp dễ dàng với các bộ công cụ sau: Eclipse, Ant, Maven...
### Junit cung cấp các tính năng quan trọng sau: 
***Fixtures***
Là trạng thái cố định của một tập hợp các đối tượng được sử dụng làm đường cơ sở để chạy thử nghiệm. Mục đích của test fixture là để đảm bảo rằng có một môi trường phổ biến và cố định trong đó các bài kiểm tra được chạy để kết quả có thể lặp lại.
Fixtures bao gồm 2 phương thức chính: 
    + setup(): chạy trước mỗi lời gọi thử nghiệm
    + tearDown(): chạy sau mỗi phương pháp thử nghiệm
***Test suites***
Một bộ test bao gồm một vài trường hợp thử nghiệm đơn vị và chạy chúng cùng nhau. Trong JUnit, cả chú thích @RunWith và @Suite đều được sử dụng để chạy bộ thử nghiệm.
***Test runners***
Test runner được sử dụng để thực hiện các trường hợp thử nghiệm. 
***JUnit classes***
Các lớp JUnit là các lớp quan trọng, được sử dụng trong viết và kiểm tra các JUnits. Một số lớp quan trọng là:
Assert: Chứa một tập hợp các phương thức thẩm định.
TestCase - Chứa một trường hợp kiểm tra xác định fuxture để chạy nhiều bài kiểm tra
TestResult - Chứa các phương pháp để thu thập kết quả thực hiện một trường hợp thử nghiệm

## Ví dụ
**Fixture: **

import junit.framework.*;

public class JavaTest extends TestCase {
   protected int value1, value2;
   
   //gán giá trị
   protected void setUp(){
      value1 = 2;
      value2 = 3;
   }

   // phương thức test để thêm 2 giá trị
   public void testAdd(){
      double result = value1 + value2;
      assertTrue(result == 5);
   }
   
}
**Test Suites**
*Lớp JunitTestSuit: *

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

//JUnit Suite Test
@RunWith(Suite.class)

@Suite.SuiteClasses({ 
   TestJunit1.class ,TestJunit2.class
})

public class JunitTestSuite {
}

*Lớp TestJunit1 *

import org.junit.Test;
import org.junit.Ignore;
import static org.junit.Assert.assertEquals;
public class TestJunit1 {

   String message = "Robert";	
   MessageUtil messageUtil = new MessageUtil(message);
   
   @Test
   public void testPrintMessage() {	
      System.out.println("Inside testPrintMessage()");    
      assertEquals(message, messageUtil.printMessage());     
   }
}
*Lớp TestJunit2 *

import org.junit.Test;
import org.junit.Ignore;
import static org.junit.Assert.assertEquals;

public class TestJunit2 {

   String message = "Robert";	
   MessageUtil messageUtil = new MessageUtil(message);
 
   @Test
   public void testSalutationMessage() {
      System.out.println("Inside testSalutationMessage()");
      message = "Hi!" + "Robert";
      assertEquals(message,messageUtil.salutationMessage());
   }
}
**Test Runners**

import org.junit.runner.JUnitCore;
import org.junit.runner.Result;
import org.junit.runner.notification.Failure;

public class TestRunner {
   public static void main(String[] args) {
      Result result = JUnitCore.runClasses(TestJunit.class);
		
      for (Failure failure : result.getFailures()) {
         System.out.println(failure.toString());
      }
		
      System.out.println(result.wasSuccessful());
   }
}