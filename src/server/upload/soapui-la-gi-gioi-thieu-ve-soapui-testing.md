# UI SOAP là gì?
* SOAP UI là công cụ test nền tảng mã nguồn mở API hàng đầu.
* SOAPUI cho phép Tester thực hiện test functional, regression, compliance và load testing một cách tự động trên Web API khác nhau.
* SOAPUI hỗ trợ tất cả các giao thức chuẩn và công nghệ để test tất cả các loại API.
* Giao diện SOAPUI đơn giản cho phép cả người dùng kỹ thuật và phi kỹ thuật sử dụng liên tục.

![](https://images.viblo.asia/227d2392-d883-480d-a9c0-56b0c4a5d51b.png)

# Tại sao lại sử dụng SOAPUI?
SOAPUI không chỉ là một công cụ dùng để test functional API mà còn cho phép chúng ta thực hiện các bước test nonfunctional như Performance và security testing.

***5 tính năng quan trọng của SOAPUI***

### 1) functional test
* Một công cụ mạnh mẽ cho phép các Tester test functional API trong SoapUI
* Hỗ trợ tính năng Kéo-thả giúp tăng tốc độ script development
* Hỗ trợ debug và cho phép các Tester thực hiện test data.
* Hỗ trợ Nhiều Môi trường - Dễ dàng chuyển đổi giữa QA, Dev và môi trường Prod
* Hỗ trợ script nâng cao (Tester có thể tùy chỉnh code của họ tùy thuộc vào script )
 
### 2) Security testing
* Có khả năng thực hiện quét các lỗ hổng bảo mật một cách hoàn chỉnh
* Ngăn chặn SQL Injection để bảo vệ cơ sở dữ liệu
* Quét Stack overflows được gây ra bởi các dữ liệu có kích thước rất lớn
* Quét cho Cross Site Scripting, thường xảy ra khi các thông số dịch vụ được hiển thị trong các tin nhắn.
* Thực hiện quét Fuzzing và Boundary để tránh hành vi thất thường của các dịch vụ.
 
### 3) Load testing
* Phân phối Load test trên tất cả các số bất kỳ của loadUI Agents.
* Mô phỏng dữ liệu lớn và thực một cách dễ dàng.
* Cho phép báo cáo tùy chỉnh nâng cao để nắm bắt các thông số hiệu suất.
* Cho phép giám sát hiệu suất End-to-End system
 
### 4) Hỗ trợ các các Giao thức / Công nghệ:
SoapUI hỗ trợ Giao thức toàn diện nhất

![](https://images.viblo.asia/f50d025b-044a-4006-80f4-afb1e8d7c68b.png)

### 5) SOAP-Tích hợp với các công cụ tự động hóa khác nhau:
SoapUI tích hợp rất tốt với các công cụ phổ biến
* Maven

![](https://images.viblo.asia/967dc2e7-5204-44f9-ad4b-08ab70d46e48.png)

Apache  Maven  là một công cụ quản lý dự án phần mềm có thể quản lý một project's build, báo cáo và tài liệu của dự án từ một kho trung tâm. Maven cũng có thể thực hiện các SOAPUI testing trong Maven Build bằng cách sử dụng các lệnh đơn giản.

* HUDSON

![](https://images.viblo.asia/ffff5a7e-3a55-4057-a6c9-6420e498a3ed.png)

HUDSON, một công cụ tích hợp dựa trên nền tảng Java và tích hợp với các công cụ như CVS, Subversion, Git, Perforce, Clearcase và RTC. SOAPUI cũng tích hợp với HUDSON, giúp phát hiện lỗi một cách nhanh chóng.

* JUnit

![](https://images.viblo.asia/7b503391-4447-4c6b-aef7-f84b501eb03a.png)

JUnit là một Unit Testing framework được xây dựng trong Java, có thể kiểm soát flow test từ SOAPUI rất tốt.

* Apache - Ant

![](https://images.viblo.asia/d67cd21f-84e9-4f74-a7e5-2464eaf16d24.png)

Apache Ant, thư viện Java là một công cụ command-line giúp building software. Sử dụng Command line của SOAP UI, chúng ta có thể thực hiện test với ANT Automated Build.

### SOAP UI với Selenium:
Hãy so sánh SoapUI với Selenium

![](https://images.viblo.asia/bcf4aa00-fdf2-4a8e-8edd-30a551c2169a.png)

### SOAP UI Vs SOAP UI PRO
 
Chúng ta biết rằng có hai loại của SOAP UI, một là SOAP UI (phiên bản mã nguồn mở) một loại khác là SOAP UI PRO. Hãy tìm hiểu sự khác biệt giữa hai loại này và cùng thảo luận khi nào thì nên sử dụng loại nào.  

![](https://images.viblo.asia/c5e53a7e-d69b-474b-ae94-918a6ea4d54c.jpg)

### Khi sử dụng phiên bản SoapUI PRO?
* **Data Driven**: Phiên bản PRO, giúp chúng ta làm việc với nguồn data bên ngoài như tệp văn bản, XML, Groovy, Excel, tệp và Cơ sở dữ liệu. Điều này giúp chúng ta test với một loạt các đầu vào thông qua các nguồn nói trên.

* **Test Coverage**: Phiên bản PRO cho phép testers có được một báo cáo thống kê cho thấy các chức năng đã được test tốt và các vùng không được test kỹ lưỡng. Các báo cáo thậm chí còn chỉ ra được chính xác những gì KHÔNG được test và những gì KHÔNG được xác nhận.

* **Test Debugging**: Bạn có thể run test đến điểm bị tạm ngưng đó và xem giá trị hiện tại của thuộc tính SoapUI. Giao diện Test Debugging đơn giản hoá các Test Flow, Các biến số, Thuộc tính, Yêu cầu, Bối cảnh, và nhiều hơn nữa, làm cho việc tạo và test cải tiến được sắp xếp hợp lý hơn.

* **Hỗ trợ đa môi trường**: Làm việc với nhiều môi trường như DEV, QA, Pre-PROD có thể là một nhiệm vụ khó khăn với phiên bản mã nguồn mở vì các tester cần phải thay đổi end points để thực hiện test trong các môi trường khác nhau. Phiên bản PRO giúp chúng ta chuyển đổi giữa các môi trườngmột cách liền mạch.
 
* **Báo cáo**: phiên bản PRO với nhiều tùy chọn để tuỳ chỉnh các báo cáo tạo ra các báo cáo chi tiết ở cấp Dự án, TestSuite, TestCase hoặc LoadTest. Nó cũng tạo ra các báo cáo trong các định dạng khác nhau như PDF, HTML, Word hoặc Excel.
 
* **Security Testing**: Cả hai phiên bản SOAP UI đều có khả năng kiểm tra các lỗ hổng bảo mật như XML bombs, SQL injections, fuzzing, cross-site scripting. Tuy nhiên, chỉ có SOAP UI PRO mới có thể thực hiện quét lỗ hổng bằng cách sử dụng Security Test Generator với 1 cú kích chuột.
 
* **SQL Builder**: Đối với các tester không có nhiều kinh nghiệm về kỹ thuật  thì việc phải viết SQL truy vấn phức tạp có thể là một điều khá khó khăn, gây cảm giác rườm rà. SQL Builder's  của SOAP UI PRO có thể giúp họ tạo ra truy vấn SQL sử dụng giao diện đồ họa của SQL Builder's . Tính năng này giúp chúng ta đẩy nhanh việc thực hiện test dữ liệu đầu vào.
 
* **Hỗ trợ** : SOAP UI Pro có sự hỗ trợ độc quyền ngoài sự hỗ trợ diễn đàn trực tuyến.

### SOAP UI – Version Timelines

![](https://images.viblo.asia/bb361e29-30ef-4899-a3e0-130fbb5872a6.png)

*Bài viết được dịch lại tại nguồn: https://www.guru99.com/introduction-to-soapui.html*