# Giới thiệu 
Ở thời kì hậu PC, để đồng bộ giữa các thiết bị và kết nối giữa những website và dịch vụ, người ta dùng webservice.  Ngoài **Web API service** gửi và nhận dữ liệu bằng **JSON** thì **web service ASMX và WCF** cũng đã được các lập trình viên .NET sử dụng rất nhiều để xây dựng các dịch vụ. 
Ở bài viết này mình sẽ nêu rõ sự khác biệt của chúng, những ưu nhược điểm cũng như cách sử dụng chúng được hiệu quả.

# Một số khái niệm
## Web services 
**Web service**, đơn giản là 1 phương thức kết nối giữa 2 ứng dụng hoặc thiệt bị điện tử thông qua WorldWideWeb (www). Web service gồm 2 loại: **SOAP** và **REST**.

## SOAP và REST
![](https://images.viblo.asia/93cb1dd2-9bf6-47d1-87a5-028e3b5f8478.png)

**Simple Object Access Protocol (SOAP) và Representational State Transfer (REST)** là 2 đáp án cho 1 câu hỏi: làm sao để truy cập Web services. Sự lựa chọn ban đầu có thể dễ dàng, nhưng nhiều lúc cũng rất khó khăn với những dự án phức tạp.

**SOAP** là chuẩn protocol để access các Webservice chuẩn, được phát triển bởi **Microsoft**, nó được sử dụng rộng rãi một thời gian khá lâu trước và có những lợi ích nhất định.

**SOAP** định nghĩa 1 phương thức (set of rules) chuẩn để kết nối dựa trên XML để trao đổi thông tin. SOAP sử dụng nhiều phương thức kết nối như HTTP và SMTP. 

-----


**REST** là người đến sau, nó sữa chữa những vấn đề của **SOAP** và đưa ra cách đơn giản hơn để truy cập Web service. Tuy nhiên, đôi lúc thì **SOAP** cũng dễ sử dụng hơn, đôi lúc **REST** cũng có những vấn đề. Cả 2 công nghệ này đều cần cân nhắc trước khi quyết định sử dụng.

**REST** mô tả 1 tập các công thức mà ở đó dữ liệu có thể được trao đổi thông qua 1 chuẩn interface (ví dụ HTTP). REST không chưa tầng message layer để định nghĩa các hàm và ràng buộc dữ liệu, vì vậy mà truyền dữ liệu bằng REST cũng ít tốn băng thông hơn, thường nhận và gửi bằng **JSON**. Client có thể access tài nguyên dựa trên URI và nhận được response cùng với state. 


-----



**ASMX web service** và **WCF service** là những loại **webservice** xây dựng theo chuẩn **SOAP**.
# ASMX web service và WCF service
**WCF Service** ra đời sau **ASMX** và thường hưởng tất cả những tính năng của **ASMX** và mở rộng những tính năng mới.
Điểm khác biệt đơn giản và cơ bản nhất là **ASMX web service** được thiết kế để gửi và nhận message sử dụng **SOAP** trên **HTTP**. Trong khi **WCF service** có thể gửi và nhận nhiều format hơn (nhưng SOAP là default) và trên nhiều protocol (**HTTP, TCP/IP, MSMQ, NamedPipes..**)

![](https://images.viblo.asia/df7f6531-047d-4cf7-8ef1-c666f91c7452.jpg)

* ASMX web service có thể được host chỉ trên IIS trong khi WCF service có nhiều host option là 
    * IIS
    * WAS (Windows Process Activation Services)
    * Console application
    * Windows NT Services
    * WCF provided host
 * ASMX web services chỉ giới hạn ở HTTP trong khi WCF hỗ trợ HTTP, TCP, MSMQ, NamedPipes
 * ASMX security khá giới hạn. Bình thường thì việc authetication và authorization được thực thi bởi IIS và ASP.NET config và lớp transport layer. Với message layer security, WSE có thể được sử dụng.
WCF đưa ra 1 model chung security cho bất kì protocol và hỗ trợ cả IIS và WS-* security protocol. Thêm vào đó nó hỗ trợ phân quyền dễ dàng hơn trên các tài nguyên so với role-based security. WCF security đồng nhất bất kể nó được host ở đâu.
* Một điểm khác biệt nữa là ASMX sử dụng **XmlSerializer** để đồng bộ kiểu dữ liệu trong khi WCF sử dụng **DataContractSerializer**, có performance nhanh hơn XmlSerializer. 

# Kết luận
Qua bài viết này thì chúng ta có một cái nhìn tổng quát về 2 công nghệ web service được sử dụng ở những dự án .NET, từ đó có thể lựa chọn để cân nhắc và sử dụng một cách hợp lí. 

Bài viết tham khảo http://www.topwcftutorials.net/2012/06/wcf-vs-asmx-web-services.html