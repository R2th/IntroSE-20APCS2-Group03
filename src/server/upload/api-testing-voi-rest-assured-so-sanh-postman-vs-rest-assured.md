### 1. API testing với REST Assured
**a. REST Assured là gì?**

Rest Assured cho phép bạn kiểm tra các API REST bằng thư viện java và tích hợp tốt với Maven. Với các kỹ thuật đối sánh hiệu quả giúp cho việc khẳng định expected results khá dễ dàng. Rest Assured có các phương thức để tìm nạp dữ liệu từ hầu hết mọi phần của yêu cầu và phản hồi bất kể cấu trúc JSON phức tạp đến mức nào.

Đối với cộng đồng tester, API automation testing vẫn còn khá mới mẻ bởi sự phức tạp của JSON. Nhưng điều đó không làm cho nó kém quan trọng trong quá trình thử nghiệm. Rest Assured.io framework làm cho nó trở nên đơn giản bằng cách sử dụng các khái niệm cơ bản về java core, khiến Rest Assured trở thành một kiến thức rất đáng để học hỏi.

**b. Hướng dẫn cài đặt Rest Assured**

Trước tiên ta cần setup: 
- Cài đặt [Java](https://www.guru99.com/install-java.html)

- [ Download IDE](https://www.eclipse.org/downloads/) 

- Cài đặt [Maven](https://www.guru99.com/maven-jenkins-with-selenium-complete-tutorial.html) và setup eclipse
1. Setup Rest Assured

- Tạo một Dự án Maven trong IDE. (Ở đây mình dùng Intellij)
- Mở POM.xml của bạn
![](https://images.viblo.asia/1b936402-ce1f-491e-8363-60bbffa4d9a0.png)

TH: Rest Assured.io: Java version < 9 users:

```
<dependency>
<groupId>io.rest-assured</groupId>
<artifactId>json-path</artifactId>
<version>4.2.0</version>
<scope>test</scope>
</dependency>


<dependency>
<groupId>io.rest-assured</groupId>
<artifactId>xml-path</artifactId>
<version>4.2.0</version>
<scope>test</scope>
</dependency>


<dependency>
<groupId>io.rest-assured</groupId>
<artifactId>json-schema-validator</artifactId>
<version>4.2.0</version>
<scope>test</scope>
</dependency>
```

TH: Rest Assured.io : Java version 9+ users :
```
<dependency>
<groupId>io.rest-assured</groupId>
<artifactId>rest-assured-all</artifactId>
<version>4.2.0</version>
<scope>test</scope>
</dependency>
```
2. Xử lý sự cố

Trong trường hợp bạn gặp lỗi và không chắc dependencies có được tải xuống tốt hay không.

- Thực hiện clean maven sau đó cài đặt maven và nó sẽ được xây dựng lại mà không gặp bất kỳ lỗi nào.
-  Có thể thêm các dòng dưới đây vào lớp java của mình và không thấy lỗi biên dịch nào.

```
import io.restassured.RestAssured.*;
import io.restassured.matcher.RestAssuredMatchers.*;
import org.hamcrest.Matchers.*;
```
### 2. So sánh Postman vs REST Assured
**a. Postman**

**Ưu điểm**

- Dễ học nên có thể nhanh chóng sử dụng 
- Dễ sử dụng, dễ dàng tạo request trên UI
- Dễ dàng sử dụng với người chưa biết code từ trước
- Dễ dàng tạo API flow
- Dễ dàng debug
- Dễ dàng view response
- Có thể dùng để manual test, automation test
- Dễ dàng tích hợp trong CI khi dùng Newman
- Phạm vi người dùng rộng hơn, có nhiều hướng dẫn khi sử dụng Postman 

**Nhược điểm**
- Khó khăn trong việc share code cho team 
- Support parameterized test: một tính năng chưa tốt của Postman
- Không thể tùy biến được báo cáo 
- Khó sử dụng library 
- Mỗi collection chỉ có thể cung cấp được 1 tệp data cho nên hạn chế khi thiết kế automation framework hướng dữ liệu

**b. REST Assured**

**Ưu điểm**
- Cung cấp DLS để kiểm tra để test được hướng Behaviour 
- Sử dụng thư viện Java nên có thể tát sử dụng code -> Chi phí bảo trì thấp
- Dễ dàng tạo API flow nếu biết code
- Dễ dàng sử dụng library nếu biết code 
- Dễ dàng debug
- Dễ dàng tích hợp trong CI khi build tool như Maven hoặc Gradle
- Dễ dàng support parameterized test nếu biết code
- Dễ dàng share code cho team git và dễ dàng review code
- Có thể sử dụng được với bất kì tool mã nguồn mở báo cáo nào
- Không giới hạn khi khi thiết kế automation framework hướng dữ liệu
- Có thể sử dụng excel hoặc csv để import dữ liệu 

**Nhược điểm**
- Phải có kiến thức tốt về Java/BDD mới làm việc được trong REST Assured
- Khó sử dụng khi tạo request khi mới bắt đầu 
- View response phải nhìn qua console 
----------------------
*Từ những thông tin trên ra được một số điểm giống và khác nhau của Postman vs REST Assured sau đây*

**Giống nhau:**
* Đều là HTTP client, gửi request và nhận response, extract response.
* Cung cấp đủ loại HTTP method và những config header cần thiết

**Khác nhau:**


| Tiêu chí | POSTMAN| REST-ASSURED |
| -------- | -------- | -------- |
| Ngôn ngữ lập trình     | Tool UI – được viết bằng javascript     | Java Library – được viết bằng Java và Groovy     |
| Dễ dàng tạo request	     | Rất dễ, tạo trên UI	     | 	Khá loằng ngoằng khi bắt đầu     |
| View response     | Tuyệt vời     | Phải view qua console log     |
| Debug     | Dễ     | Dễ     |
| Tạo API flow     | Dễ dàng, chỉ cần xếp đúng thứ tự các request    | Đã code được thì dễ dàng      |
| Support parameterized test     | Tính năng tồi tệ     | Đã code được thì dễ dàng     |
| Share code     | Tất cả các requests nằm trong 1 file json rất rất lớn (không tính sharing của Postman Pro)     | Share qua git và dễ dàng review code     |
| Muốn sử dụng thêm library từ bên ngoài	     | Khó     | Đã code được thì dễ dàng     |
| Sử dụng trong CI	     | Không khó, sử dụng Newman	     | Sử dụng build tool như Maven hoặc Gradle |



-------------------------------

Nguồn: https://www.guru99.com/rest-assured.html