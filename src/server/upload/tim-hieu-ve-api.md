# 1. API
API là chữ viết tắt của cụm từ Application Programming Interface hay còn được gọi là giao diện lập trình ứng dụng trong tiếng Việt.
API là tập các định nghĩa phương thức, giao thức và công cụ xây dựng phần mềm ứng dụng, nó là phương thức để trao đổi dữ liệu giữa các hệ thống. 

![](https://images.viblo.asia/852f7505-9ab4-4168-b012-ab164c39faae.png)
# 2. API testing
Kiểm tra API là một quá trình đảm bảo chất lượng của hệ thống,  kiểm tra API được sử dụng trong phần mềm bằng cách áp dụng toàn bộ các thử nghiệm chức năng và phi chức năng của hệ thống đó.

Những người kiểm thử phần mềm kiểm tra kỹ các API để kiểm tra các yếu tố khác nhau như:

- Độ chính xác

- Tính hiệu quả

- Tỷ lệ phản hồi

- Bảo mật

Ngoài ra nếu bạn sử dụng SOAP thì nó còn hỗ trợ 
- Interoperability testing: Kiểm tra độ tương thích với cấu hình web
- WS-* compliance testing: Kiểm tra độ tuân thủ các tiêu chuẩn WS như WS-Addressing, WS-Discovery, WS-Federation, WS-Policy, WS-Security, and WS-Trust.

Cũng như các kiểm thử khác, tester sẽ viết testcase để test API với kết quả thực tế và kết quả mong muốn.

![](https://images.viblo.asia/c613889d-024f-47d2-a896-be19a387a917.png)

# 3. Các công cụ hỗ trợ để test API
![](https://images.viblo.asia/d93510c1-5535-432c-972f-056e704ba5d7.png)
                                                                      Top 5 tool test API năm 2018

### 3.1. SoapUI

Soap UI là một công cụ test API hàng đầu, nó cho phép người dùng dễ dàng test REST, SOAP APIs và Web Services một cách dễ dàng.

Free package: Với gói SoapUI miễn phí user có thể lấy full source code và build các feature mà họ muốn như:
- Tạo test nhanh chóng và dễ dàng với thao tác drag & drog, Point & click.
-  Reusability of Scripts: load test và security scan có thể tái sử dụng các functional test case chỉ trong một vài bước.
Pro package: 
- Tạo custom code nhanh chóng sử dụng Groovy
-. Powerful data-driven testing: Load data từ file, database, Excel để mô phỏng cách người dùng tương tác với API.
- Hỗ trợ tích hợp CI/CD, kiểm tra không đồng bộ.

Website: https://www.soapui.org/

Price: Free - $659/năm.

### 3.2. Katalon Studio

Katalon Studio là một công cụ test API, Web và App mobile free. Nó đang nổi lên như một công cụ hàng đầu để kiểm tra các dịch vụ API/ Web, vị trí của nó như một giải pháp tự động hóa toàn diện cho cả developer và tester.
Katalon Studio hỗ trợ cả hai yêu cầu SOAP và REST với các command các tham số chức năng khác nhau. Hơn nữa, khả năng kết hợp của UI và API/Web service  cho các môi trường (Windows, Mac OS, Linux) là một lợi thế của Katalon Studio.

Tính năng nổi bật: 
- Hỗ trợ cả SOAP và Rest.
- All-in-one shop cho API, WebUI và Mobile testing, và khả năng kết hợp giữa các shop đó.
- Hỗ trợ tiếp cận data driven.
- Hỗ trợ tích hợp CI/CD .
-  Hỗ trợ AssertJ - một trong những thư viện mạnh nhất để tạo sự xác nhận thông thạo với BDD style.
-  Nó thích hợp cho những người không chuyên về kỹ thuật thông qua Manual và Groovy Scripting mode.

Website: https://www.katalon.com

Price: Free

### 3.3. Postman

Ban đầu Postman chỉ là một plugin trên trình duyệt Chrome, hiện tại nó đã mở rộng giải pháp với Mac và Windows.
Postman là một lựa chọn tốt cho API testing dành cho những người không muốn sử dụng cùng một ngôn ngữ lập trình với developer.
Ưu điểm của Postman:
- Dễ dàng sử dụng REST client.
- Giao diện dễ dàng sử dụng.
- Có thể sử dụng để nghiên cứu và kiểm thử tự động.
- Hỗ trợ trên Mac, Windows, Linux, và Chrome.
- Hỗ trợ dịnh dạng Swagger và RAML.
- Tính năng: Run, test, Document và Monitoring.
-  Không yêu cầu học ngôn ngữ mới.
-  User có thể dễ dàng chia sẻ kiến thức với team bằng cách tạo package chứa tất cả request và expected responses.

Website: https://www.getpostman.com/

Price: Free - $21/user/ tháng

### 3.4. Tricentis Tosca

Tricentis Tosca là một platform kiểm thử liên tục cho Agile và DevOps.
Lợi ích của Tricentis Tosca là:
- Hỗ trợ nhiều mảng giao thức: HTTP(s) JMS, AMQP, Rabbit MQ, TIBCO EMS, SOAP, REST, IBM MQ,NET TCP.
- Tích hợp vào Agile and DevOps Cycle.
- Có thể tái sử dụng và bảo trì  dựa trên mô hình test automation.
-  API testing có thể sử dụng trên mobile, cross- browser, app,..
-  Giảm thời gian kiểm thử hồi quy.

Website: https://www.tricentis.com/

Price: Contact Sales

### 3.5. Apigee

Apigee là một công cụ kiểm thử cross- cloud API, nó cho phép người dùng đo lường và test API performance, hỗ trợ và build API sử dụng editor như Swagger.
Ưu điểm:
- Nó chia ra nhiều step và hỗ trợ bởi Javascript.
- Cho phép thiết kế monitor, triển khai và theo dõi API.
- Xác định các vấn đề về performance bằng việc tracking API traffic, tỷ lệ lỗi và thời gian phản hồi.
- Dễ dàng tạo API proxy từ Open API Specification và triển khai chúng trên cloud.
- Apigee được xây dựng cho các digital business, và các ứng dụng nhiều data và mobile-driven API.

Website: https://apigee.com/api-management/

Price: Free trial - $2,500/tháng.


Tham khảo: 

https://blog.qamentor.com/api-testing-quick-guide-software-testers

https://en.wikipedia.org/wiki/APItesting

https://www.katalon.com/resources-center/blog/top-5-free-api-testing-tools/

https://medium.com/@alicealdaine/top-10-api-testing-tools-rest-soap-services-5395cb03cfa9