# 1. Kiến thức nền tảng
- HTML (viết tắt của từ HyperText Markup Language, hay là "Ngôn ngữ Đánh dấu Siêu văn bản") là một ngôn ngữ đánh dấu được thiết kế ra để tạo nên các trang web trên World Wide Web. Nó có thể được trợ giúp bởi các công nghệ như CSS và các ngôn ngữ kịch bản giống như JavaScript.
- API (Application Programming Interface) là một tập các quy tắc và cơ chế mà theo đó, một ứng dụng hay một thành phần sẽ tương tác với một ứng dụng hay thành phần khác. API có thể trả về dữ liệu mà bạn cần cho ứng dụng của mình ở những kiểu dữ liệu phổ biến như JSON hay XML.
- JSON (JavaScript Object Notation) một định  dạng phổ biến để gửi và yêu cầu dữ liệu thông qua API REST..
Một đối tượng JSON trông giống như một Đối tượng JavaScript. Trong JSON, mỗi thuộc tính và giá trị ở dạng “key” and “value” được đặt trong dấu ngoặc kép.
- XML (Extensible Markup Language): là một ngôn ngữ đánh dấu và định dạng tệp để lưu trữ, truyền và tái tạo lại dữ liệu tùy ý. Nó xác định một tập hợp các quy tắc để mã hóa tài liệu ở định dạng vừa có thể đọc được bởi con người vừa có thể đọc được bằng máy móc. 
# 2. Rest API
# 2.1. Định nghĩa
- REST (REpresentational State Transfer) là một kiến trúc phần mềm được tạo ra để hướng dẫn thiết kế và phát triển kiến trúc cho World Wide Web. Được  định nghĩa như một tập hợp các ràng buộc đối với cách kiến trúc của một hệ thống siêu phương tiện phân tán quy mô Internet, chẳng hạn như Web. Kiến trúc REST nhấn mạnh khả năng mở rộng của các tương tác giữa các thành phần, giao diện thống nhất, triển khai độc lập của các thành phần và tạo ra kiến trúc phân lớp để tạo điều kiện thuận lợi cho các thành phần bộ nhớ đệm nhằm giảm độ trễ do người dùng nhận thấy, thực thi bảo mật và đóng gói các hệ thống kế thừa.
- ![](https://images.viblo.asia/3fb6a672-b374-430b-abd6-5f6c338a26b0.png)



## 2.2. Cách hoạt hoạt động
REST thường hoạt động chủ yếu dựa vào những giao thức HTTP, các cơ sở hoạt động cơ bản nêu trên sẽ được sử dụng những phương thức HTTP.
REST API chia nhỏ một transaction ra thành nhiều module nhỏ khác nhau. Mỗi một module sẽ giải quyết một phần công việc trong transaction đó. Việc chia nhỏ thành các module này giúp các nhà phát triển có thể linh hoạt xử lý hơn. Tuy nhiên, việc chia nhỏ này cũng tạo ra không ít thách thức trong quá trình thiết kế REST API từ đầu đều không đảm bảo bằng SOAP (stateless).
### Các HTTP method:
GET (SELECT): Trả về một Resource hoặc một danh sách Resource.

POST (CREATE): Tạo mới một Resource.

PUT (UPDATE): Cập nhật thông tin cho Resource.

DELETE (DELETE): Xóa một Resource.

HTTP response status codes: HTTP response status codes cho biết một yêu cầu HTTP cụ thể đã được hoàn tất thành công hay chưa. Các câu trả lời được nhóm thành năm lớp:
1. Informational responses (100–199) 
2. Successful responses (200–299)
3.  Redirection messages (300–399) 
4.  Client error responses (400–499) 
5.  Server error responses (500–599)
# 2.3. Nguyên tắc ràng buộc của Rest
**## 6 nguyên tắc ràng buộc của kiến trúc RESTful**
1. Client–server architecture 
2. Cacheability 
3. Statelessness 
4. Layered system 
5. Uniform interface
6.  Code on demand (Optional)

## 2.4. Cấu trúc thông điệp của Rest
![](https://images.viblo.asia/b6099e15-3cae-4664-aa66-1cd54f314900.png)

**Rest Request gồm 4 thành phần chính:**
1. Method - CRUD : POST, PUT, GET, DELETE
2.  Endpoint - Chứa URI ( phổ biến nhất là URL ) 
3.  Header - Chứa thông tin liên quan đến client và server như tên, trạng thái, authentication, ip, … 
4.  Body - Chứa dữ liệu


**Rest Response** - Server gửi đại diện dữ liệu thường được viết ở dạng XML, JSON, …

## 2.5. Khôi xây dựng Rest
**Rest Headers**: Tiêu đề HTTP là một phần quan trọng của yêu cầu và phản hồi API vì chúng đại diện cho siêu dữ liệu được liên kết với yêu cầu và phản hồi API
1. Request and Response 
2. Body Request Authorization 
3. Response Caching  
4. Response Cookies
**Rest Body**: Tạo phần thân dữ liệu cho điểm cuối để kiểm tra. Điều này đôi khi được gọi là tải trọng. Xây dựng một phần thân bất có kỳ định dạng mà API mong muốn. Trường hợp của Rubrik, định dạng phải là JSON, nhưng các API khác có thể sử dụng hoàn toàn XML, YAML…
**Rest Params**: Sử dụng các tham số truy vấn để kiểm soát dữ liệu nào được trả về trong các phản hồi của điểm cuối.
**Rest Authorization** : Chứng minh có quyền truy cập, như kiểu có một cái chìa khóa nhưng chỉ được phép mở một vài cửa trong nhà chứ không được phép mở tất cả các cửa.
## 2.6. Đặc điểm
Có tính nhất quán xuyên suốt các API. 
Tồn tại mà không lưu trạng thái (Stateless existence), 
Sử dụng HTTP status code khi có thể.
Sử dụng URL Endpoint có phân tầng logic.
Đánh version trong URL thay vì trong HTTP Headers.
## 2.7. Ưu, nhược điểm 
### a, Ưu điểm
REST thích ứng tốt với các công nghệ web mới, dễ dàng sử dụng và bảo trì.
Tách biệt rõ ràng giữa server và client, chỉ giao tiếp thông qua các phương thức HTTP và URI (đọc lại bài viết REST 101).
Các thông tin có thể được lưu lại phía client → tránh phải gọi đến resource nhiều lần.
Có thể sử dụng bất kỳ cấu trúc nào (XML, JSON, hoặc cấu trúc do server và client quy ước với nhau).
### b, Nhược điểm
Chỉ hoạt động trên các giao thức HTTP.
Việc bảo mật và xác thực có thể không đảm bảo bằng SOAP (stateless).
# 3. Soap
# 3.1. Khái niệm
SOAP (Simple Object Access Protocol): Là một đặc tả giao thức nhắn tin để trao đổi thông tin có cấu trúc trong việc triển khai các dịch vụ web trong mạng máy tính. Nó sử dụng Tập thông tin XML cho định dạng thông báo và dựa trên các giao thức lớp ứng dụng, thường là Giao thức truyền siêu văn bản (HTTP) hoặc Giao thức truyền thư đơn giản (SMTP), để đàm phán và truyền thông.
## 3.2. Đặc điểm
Khả năng mở rộng (bảo mật và WS-Addressing là một trong những phần mở rộng đang được phát triển).
Tính trung lập (SOAP có thể hoạt động trên bất kỳ giao thức nào như HTTP, SMTP , TCP , UDP).
Độc lập (SOAP cho phép bất kỳ mô hình lập trình nào).
## 3.3. Khối xây dựng SOAP
![](https://images.viblo.asia/447a1dec-1c3c-49ee-9690-050bb7badb29.png)


SOAP Envelope: Xác định tài liệu XML dưới dạng thông báo SOAP.
SOAP Header: Chứa thông tin tiêu đề.
SOAP Body: Chứa thông tin cuộc gọi và phản hồi.
SOAP Fault: Cung cấp thông tin về các lỗi đã xảy ra trong khi xử lý thư.(Không cần thiết)
## 3.4. Ưu và nhược điểm
### Ưu điểm:
1. Tính trung lập của ngôn ngữ: SOAP có thể được phát triển bằng bất kỳ ngôn ngữ nào.
2. Khả năng tương tác và tính độc lập của nền tảng: SOAP có thể được triển khai bằng bất kỳ ngôn ngữ nào và có thể được thực thi trong bất kỳ nền tảng nào.
3. Tính đơn giản: Thông báo SOAP có định dạng XML rất đơn giản.
4. Khả năng mở rộng: SOAP sử dụng giao thức HTTP để truyền tải do đó nó trở nên có khả năng mở rộng.
### Nhược điểm:
Chậm: SOAP sử dụng định dạng XML cần được phân tích cú pháp và cũng dài hơn.
Sự phụ thuộc của WSDL: Nó phụ thuộc vào Web Services Description Language và không có bất kỳ cơ chế tiêu chuẩn hóa nào để khám phá động các dịch vụ.
## 3.5. Mô hình giao tiếp SOAP

Máy khách sẽ định dạng thông tin liên quan đến lệnh gọi thủ tục và bất kỳ đối số nào thành một thông báo SOAP và gửi nó đến máy chủ như một phần của yêu cầu HTTP. Quá trình đóng gói dữ liệu vào một thông điệp SOAP được gọi là Marshalling.
Sau đó, máy chủ sẽ mở gói thông báo do máy khách gửi, xem máy khách yêu cầu gì và sau đó gửi phản hồi thích hợp trở lại máy khách dưới dạng thông báo SOAP. Thực hành mở gói một yêu cầu do khách hàng gửi được gọi là Demarshalling.
## 4. So sánh Soap và Restful
### 4.1 Giống nhau
Hướng dẫn thiết kế và phát triển kiến trúc cho World Wide Web
Xác định cách xây dựng (API), cho phép dữ liệu được giao tiếp giữa các ứng dụng, thành phần với ứng dụng, thành phần khác

### 4.2 Khác nhau 

|               |**SOAP**  |**REST**   |
| --------    | -------- | -------- |
|    1         | Là một giao thức   |Là một cách thiết kế kiến trúc     |
|    2         | SOAP không thể sử dụng REST vì nó là giao thức   |REST có thể dùng các web services sử dụng SOAP vì nó là mẫu kiến trúc     |
|    3         | Cung cấp các giao diện dịch vụ (services interfaces) cho các thành phần bên ngoài sử dụng   |Sử dụng địa chỉ URL để cung cấp các dịch vụ   |
|   4         | Định nghĩa các chuẩn và quy tắc chặt chẽ   |Không định nghĩa nhiều chuẩn như SOAP     |
|   5         | Sử dụng băng thông và tài nguyên nhiều hơn, vì SOAP Messages chứa rất nhiều thông tin bên trong nó    |Sử dụng băng thông và tài nguyên ít hơn, REST Messages chủ yếu chỉ bao gồm các JSON Messages     |
|   6        |Kế thừa chuẩn bảo mật tầng vận tải của giao thức mạng  |Kế thừa chuẩn bảo mật tầng vận tải của giao thức mạng    |
|   7         | Chỉ hỗ trợ định dạng dữ liệu XML  |Hỗ trợ các định dạng dữ liệu khác nhau như text, HTML, XML, JSON,...     |
|   8         |SOAP hỗ trợ cả hai giao thức SMTP và HTTP  |REST gắn với giao thức HTTP    |
|   9         | Stateful    |Stateless  |

## 4.3 Khi nào sử dụng Soap
Chuẩn giao tiếp chung - nếu cả máy khách và máy chủ đều có thỏa thuận về định dạng trao đổi
Stateful -  Sử dụng SOAP nếu server cần lưu dữ liệu của client.
## 4.4 Khi nào sử dụng Rest
Hạn chế về tài nguyên và băng thông - Vì SOAP Messages có nội dung nặng hơn và tiêu thụ băng thông lớn hơn nhiều, REST nên được sử dụng trong các trường hợp băng thông mạng hạn chế.
Stateless - Nếu không cần lưu dữ liệu của client trên server thì REST nên được sử dụng. 
Caching - Nếu cần tăng độ truy xuất dữ liệu và giảm tải cho hệ thống thì REST là giải pháp. Đôi khi, khách hàng có thể yêu cầu cùng một tài nguyên nhiều lần. Điều này có thể làm tăng số lượng yêu cầu được gửi đến máy chủ. Bằng cách triển khai bộ nhớ cache, các kết quả truy vấn thường xuyên nhất có thể được lưu trữ ở một vị trí trung gian. Vì vậy, bất cứ khi nào máy khách yêu cầu một tài nguyên, trước tiên nó sẽ kiểm tra bộ nhớ cache. Nếu tài nguyên tồn tại sau đó, nó sẽ không tiến tới máy chủ. Vì vậy, bộ nhớ đệm có thể giúp giảm thiểu số lượng các chuyến đi được thực hiện đến máy chủ web.
Dễ code - Code REST và việc triển khai tiếp theo dễ dàng hơn nhiều so với SOAP. Vì vậy, nếu web cần hoàn thành nhanh chóng, thì REST là lựa chọn phù hợp.
# 5. Tài liệu tham khảo
1. SOAP Web Services Tutorial: What is SOAP Protocol? EXAMPLE: https://www.guru99.com/soap-simple-object-access-protocol.html
2. SOAP Vs. REST: Difference between Web API Services: https://www.guru99.com/comparison-between-web-services.html
3. What is REST: https://restfulapi.net/
# 6. Lời Kết
Trên đây là những chia sẻ của mình về Rest và Soap. Chắc chắn mình vẫn còn những sai sót trong bài viết. Cảm ơn vì đã dành thời gian đọc bài viết của mình. Nếu có gì comment phía dưới nhé.