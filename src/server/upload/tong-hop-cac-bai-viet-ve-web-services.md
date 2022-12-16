Để dễ dàng cho các bạn theo dõi và tìm hiểu về cách xây dựng web service trong Java. Bài này mình sẽ tổng hợp lại toàn bộ các bài viết về REST và SOAP web service từ lúc xây dựng đến khi deploy ứng dụng lên web server.

## [Tìm hiểu về Web Service](https://gpcoder.com/5572-tim-hieu-ve-web-service/)

Sau khi đọc xong bài này, các bạn sẽ nắm được:

* Web service là gì?
* Các thành phần, kiến trúc của một web service.
* Cách thức hoạt động của web serivce.
* Các loại web service.
* So sánh SOAP với REST web service.

Từ phiên bản JavaEE 6 đã cung cấp sẵn 2 API cho web service là JAX-WS và JAX-RS.

* JAX-WS: dành cho SOAP web service. Có 2 cách để viết ứng dụng JAX-WS: RPC style và Document style. JAX-WS là API Java dựa trên XML để xây dựng ứng dụng Client-Server.
* JAX-RS: dành cho RESTful web service. Có 2 implementation chủ yếu để viết ứng dụng JAX-RS: Jersey and RESTeasy. JAX-RS sử dụng các Annotation để đơn giản hóa việc phát triển và triển khai các web service.

Các bạn sẽ được giới thiệu lần lượt các API này trong các nội dung tiếp theo.
 
## [SOAP Web service](https://gpcoder.com/tag/soap/)

### [Java Web Services – JAX-WS – SOAP](https://gpcoder.com/5615-java-web-services-jax-ws-soap/)

Sau khi đã nắm được một số kiến thức cơ bản về web service, chúng ta sẽ bắt đầu xây dựng ứng dụng SOAP web service sử dụng GUI của Eclipse và sử dụng thư viện chuẩn của java JAX-WS.

Ngoài ra, các bạn cũng sẽ nắm được cách viết chương trình Client để gửi SOAP request và nhận SOAP response từ web service.

### [Giới thiệu SOAP UI và thực hiện test Web Service](https://gpcoder.com/5650-gioi-thieu-soap-ui-va-thuc-hien-test-web-service/)

Trong bài này, các bạn sẽ được giới thiệu một tool rất mạnh mẽ cho việc kiểm thử web Service, bao gồm cả SOAP và REST. Đó chính là SOAP UI.

### [SOAP Web service: Authentication trong JAX-WS](https://gpcoder.com/5701-soap-web-service-authentication-trong-jax-ws/)

Một trong những thành phần không thể thiếu trong phát triển ứng dụng là chứng thực người dùng (chỉ những người có quyền mới được truy xuất tài nguyên của hệ thống). Các bạn sẽ được hướng dẫn cách chứng thực user với SOAP web service trong bài viết này.

### [SOAP Web service: Upload và Download file sử dụng MTOM trong JAX-WS](https://gpcoder.com/5703-soap-web-service-upload-va-download-file-su-dung-mtom-trong-jax-ws/)

Tiếp tục series về SOAP web service, trong bài này chúng ta sẽ cùng tìm hiểu cách upload và download file thông qua phép service sử dụng MTOM – một thành phần đã được tích hợp trong thư viện JAX-WS.

## [REST Web service](https://gpcoder.com/tag/rest/)

### [Java Web Services – Jersey JAX-RS – REST và sử dụng REST API testing tools với Postman](https://gpcoder.com/5677-java-web-services-jersey-jax-rs-rest/)

Trong bài này, chúng ta cùng hiểu hiểu cách xây dựng ứng dụng RESTful web service với JAX-RS sử dụng thư viện Jersey 1.x và cách test RESTful web Service với Postman tool.

### [REST Web service: Tạo ứng dụng Java RESTful Client với Jersey Client 2.x](https://gpcoder.com/5728-rest-web-service-tao-ung-dung-java-restful-client-voi-jersey-client-2-x/)

Phiên bản hiện tại của Jersey là 2.x . Phiên bản này có một số thay đổi so với phiên bản 1.x, trong bài này chúng ta sẽ cùng tìm hiểu cách tạo ra ứng dụng CRUD với Restful web service sử dụng Jersey 2.x .

Ngoài ra, các bạn cũng sẽ nắm được cách xây dựng ứng dụng Java RESTful Client sử dụng Jersey Client API để gọi tới một RESTful web service được cung cấp.

### [REST Web service: Upload và Download file với Jersey 2.x](https://gpcoder.com/5726-rest-web-service-upload-va-download-file-voi-jersey-2-x/)

Chúng ta cùng tìm hiểu cách upload/ download file với RESTful sử dụng Jersey version 2.x như thế nào trong bài viết này ở cả 2 phía: Jersey Server và Jersey Client.

Postman là một công cụ mạnh mẽ để test web service, nó cũng sẽ hỗ trợ tính năng cho phép chúng ta có thể upload/ download file dễ dàng thông qua GUI. Các bạn sẽ được hướng dẫn chi tiết cách sử dụng trong bài viết này.

### [REST Web service: HTTP Status Code và xử lý ngoại lệ RESTful web service với Jersey 2.x](https://gpcoder.com/5763-rest-web-service-http-status-code-va-xu-ly-ngoai-le-restful-web-service-voi-jersey-2-x/)

Xử lý ngoại lệ (exception handling) là một phần không thể thiếu trong bất kỳ ứng dụng nào, ứng dụng RESTful web service cũng vậy. Có 2 nguyên nhân dẫn đến ứng dụng REST throw ra một ngoại lệ là lỗi gì đó trên server hoặc client đã gửi yêu cầu không hợp lệ. Trong cả hai trường hợp, chúng ta cần gửi lại phản hồi các thông tin hữu ích cho phía Client hoặc developer biết thông tin để dễ dàng gỡ lỗi khi cần thiết.

Trong bài này, chúng ta sẽ cùng tìm hiểu HTTP Status Code và cách xử lý ngoại lệ RESTful web service với Jersey.

### [Rest Web service: Filter và Interceptor với Jersey 2.x](https://gpcoder.com/5789-rest-web-service-filter-va-interceptor-voi-jersey-2-x-p1/)

Đôi khi chúng ta cần xử lý các vấn đề chung giữa các API như gửi token đã chứng thực của user lên server ở mỗi request, chứng thực user ở mỗi request, hay cần log lại các request/ response, …. Nếu kiểm tra ở mỗi API sẽ tốn rất nhiều công sức, code bị duplicate ở nhiều nơi. Dẫn đến khó bảo trì và mở rộng hệ thống sau này.

Để giải quyết vấn đề trên, chúng ta có thể sử dụng Filter và Interceptor đã được cung cấp bởi Jersey.

Filter và Interceptor có thể được sử dụng ở cả 2 phía Jersey Server và Jersey Client.
Filter có thể được sử dụng để chỉnh sửa các dữ liệu đầu vào/ đầu ra từ các request và response, bao gồm: header, data (entity), parameter.
Interceptor chủ yếu được sử dụng để chỉnh sửa data (entity) của input/ output stream.
Đây là phần rất là hay, nếu áp dụng tốt sẽ giúp chúng ta đỡ tốn công sức rất là nhiều. Mọi thứ đều được xử lý một cách tự động và thống nhất trên tất cả request/ response.

### [Tìm hiểu về xác thực và phân quyền trong ứng dụng](https://gpcoder.com/5825-tim-hieu-ve-xac-thuc-va-phan-quyen-trong-ung-dung/)

Sau bài này các bạn sẽ nắm được:

* Xác thực (Authentication) là gì?
* Authentication được thực hiện như thế nào? Dấu hiệu nhận biết và quá trình authentication.
* Cơ chế lưu giữ đăng nhập người dùng: Basic Authentication, Session-based Authentication, Token-based Authentication. Ở mỗi cơ chế, tôi sẽ giải thích cơ chế hoạt động và trường hợp sử dụng.
* Phân quyền (Authorization) là gì?
* So sánh Authentication với Authorization.

### [REST Web service: Basic Authentication trong Jersey 2.x](https://gpcoder.com/5724-rest-web-service-basic-authentication-trong-jersey-2-x/)

Quay lại series bài viết về xây dựng REST web service với Jersey, trong bài này chúng ta cùng tìm hiểu về xác thực và phân quyền ứng dụng sử dụng cơ chế Basic Authentication trong Jersey 2.x.

Nội dung sẽ được giới thiệu trong bài viết này:

* Cơ chế Basic Authentication trong Jersey REST API.
* Cách xây dựng Basic Authentication trong Jersey Server.
* Cách client gửi thông tin chứng thực lên server và sử dụng các resource sau khi đã chứng thực với Jersey Client.

### [Giới thiệu Json Web Token (JWT)](https://gpcoder.com/5827-gioi-thieu-json-web-token-jwt/)

Authentication là phần không thể thiếu trong bất kỳ hệ thống nào. Phương pháp authentication đơn giản và hay được sử dụng trong các ứng dụng web đó là user gửi thông tin username và password lên server. Sau khi server chứng thực thành công sẽ tạo ra một chuỗi session_id và lưu vào session hay database ở phía server. Sau đó, gửi session_id này về client và được client lưu trên cookie.

Nhưng với các ứng dụng trên mobile và các ứng dụng web SPA (Single Page Application) thì cần có cơ chế authentication tốt hơn khi mà chúng ta phải thiết kế các RESTful api (stateless) thì server không thể đảm nhiệm việc lưu trạng thái phiên làm việc của user. Một trong những phương pháp tốt để giải quyết vấn đề này là sử dụng JSON Web Token (JWT).

Sau bài này các bạn sẽ nắm được:

* JWT là gì?
* JWT gồm những thành phần nào?
* JWT hoạt động như thế nào?
* Khi nào nên dùng JSON Web Token?
* Tại sao sử dụng JWT?

### [REST Web service: JWT – Token-based Authentication trong Jersey 2.x](https://gpcoder.com/5883-rest-web-service-jwt-token-based-authentication-trong-jersey-2-x/)

Sau khi đã có kiến thức cơ bản về JWT, chúng ta tiếp tục tìm hiểu về cơ chế Token-based Authentication sử dụng tiêu chuẩn JSON Web Token (JWT) như thế nào trong Jersey project.

Nội dung sẽ được giới thiệu trong bài viết này:

* Cơ chế Token-based Authentication trong Jersey REST API.
* Token-based Authentication trong Jersey Server.
* Cách client gửi thông tin chứng thực lên server và sử dụng các resource sau khi đã chứng thực với Jersey Client.

### Tạo ứng dụng Java RESTful Client

Có nhiều cách để tạo ứng dụng Java RESTful Client, tùy vào dự án và yêu cầu cụ thể chúng ta có thể sử dụng một trong các cách sau:

* **[Không cần sử dụng bất kỳ 3rd party libraries nào](https://gpcoder.com/5942-tao-ung-dung-java-restful-client-khong-su-dung-3rd-party-libraries/)** : đôi khi dự án không cho phép sử dụng bất kỳ thư viện nào khác hoặc vì lý do nào đó bạn không được phép sử dụng thư viện của bên thứ 3, khi đó chúng ta có thể vẫn gọi và sử dụng REST ws một cách bình thường thông qua các API đã được hỗ trợ sẵn trong JDK. Các bạn sẽ được hướng dẫn chi tiết trong bài viết này.
* Sử dụng thư viện **[Jersey Client](https://gpcoder.com/5728-rest-web-service-tao-ung-dung-java-restful-client-voi-jersey-client-2-x/)**: như đã giới thiệu ở các bài viết trên.
* Sử dụng thư viện **[OkHttp](https://gpcoder.com/5903-tao-ung-dung-java-restful-client-voi-thu-vien-okhttp/)**: OkHttp là một thư viện Java mã nguồn mở, được thiết kế để trở thành một HTTP Client hiệu quả với tốc độ tải nhanh và giảm băng thông đường truyền. OkHttp giúp bạn dễ dàng xử lý dữ liệu JSON hoặc XML sau đó phân tích cú pháp thành Plain Old Java Objects (POJOs). Tất cả các yêu cầu GET, POST, PUT, và DELETE đều có thể được thực thi. Thư viện này được sử dụng chủ yếu trong các ứng dụng Android.
* Sử dụng thư viện **[Retrofit](https://gpcoder.com/5911-tao-ung-dung-java-restful-client-voi-thu-vien-retrofit/)** : Retrofit là một type-safe HTTP client cho Java và Android được phát triển bởi Square. Retrofit giúp dễ dàng kết nối đến một dịch vụ REST trên web bằng cách chuyển đổi API thành Java Interface. Retrofit được xây dựng dựa trên OkHttp để xử lý các request/ response trên mạng.
* Sử dụng thư viện **[Feign](https://gpcoder.com/5922-gioi-thieu-feign-tao-ung-dung-java-restful-client-khong-can-code-implement/)** : Thư viện này giúp chúng ta dễ dàng hơn nữa trong phát triển ứng dụng Rest Client. Ý tưởng của Feign tương tự như Retrofit là sử dụng interface và các annotation để định nghĩa các phương thức request đến API. Với Retrofit, chúng ta còn gặp một chút phiền phức khi phải gọi xử lý Call<Respone>. Sử dụng Feign chúng ta sẽ không thấy sự khác biệt giữa call các method trong interface thông thường và call thông qua Feign.
    
### [Giới thiệu HATEOAS](https://gpcoder.com/5946-gioi-thieu-hateoas/)
    
Với mong muốn phía client không cần biết chút nào về cấu trúc phía server, client chỉ cần request đến một URL duy nhất, rồi từ đó mọi đường đi nước bước tiếp theo sẽ do chỉ dẫn của phía server trả về. Đó là lý do mà HATEOAS (Hypermedia As The Engine Of Application State) ra đời.

Trong bài này các bạn sẽ được giới thiệu một số kiến thức cơ bản về HATEOAS, cách xây dựng ứng dụng REST web service theo chuẩn HATEOAS trong dự án JAX-RS và một số vấn đề gặp phải với HATEOAS.

### [Giới thiệu Swagger – Công cụ document cho RESTfull APIs](https://gpcoder.com/5967-gioi-thieu-swagger-cong-cu-document-cho-restfull-apis/)
    
Đến đây thì chúng ta đã biết cách xây dựng các ứng dụng RESTful API. Một công việc tiếp theo chúng ta cần làm là cung cấp tài liệu hướng dẫn sử dụng API để bên thứ ba có thể sử dụng. Trong bài này, chúng ta sẽ cùng tìm hiểu về Swagger – một công cụ rất mạnh mẽ để tạo một trang quản lý document cho API.

Sau bài này các bạn sẽ nắm được:

* Tài liệu hướng dẫn sử dụng API là gì?
* Tại sao tài liệu hướng API lại quan trọng?
* Chuẩn OpenAPI là gì?
* Giới thiệu về Swagger.
* Cấu trúc cơ bản của Swagger bao gồm những gì?
* [Cài đặt và sử dụng Swagger UI](https://gpcoder.com/5993-cai-dat-va-su-dung-swagger-ui/)
    
### [Sử dụng Swagger UI trong jersey REST WS project](https://gpcoder.com/6006-su-dung-swagger-ui-trong-jersey-rest-ws-project/)
    
Trong thực tế, các API thường được thay đổi bởi các developer và họ ít khi mở Swagger editor để cập nhật lại các document hoặc vì lý do nào đó mà họ không cập nhật document mới nhất theo source code. Một vấn đề đặt ra là có cách nào để API document có thể cập nhật một cách tự động mỗi khi code thay đổi và đặt cùng một nơi trong code để developer dễ dàng cập nhật hay không? Câu trả là là có và các bạn sẽ được giải đáp trong bài viết này.

[Làm thế nào để Test Jersey Rest API với JUnit?](https://gpcoder.com/6028-lam-the-nao-de-test-jersey-rest-api-voi-junit/)
    
Bất kỳ ứng dụng nào cũng vậy, sau khi code xong thì chúng ta cần phải test để đảm bảo chương trình của chúng ta hoạt động đúng. Chúng ta có thể sử dụng các tool để test SOAP WS sử dụng SOAP UI tool hay test REST WS sử dụng SOAP UI, Postman. Sử dụng tool bên ngoài để test API cũng là một giải pháp tốt. Đối với developer, chúng ta có thể viết code Unit Test để test API một cách tự động và dễ dàng.

Trong bài này tôi sẽ hướng dẫn các bạn cách viết Unit Test để test Jersey REST API sử dụng Jersey Test. Sau bài này các bạn sẽ nắm được:

* Test REST API cần test những gì?
* Cách viết test REST API sử dụng Jersey Test.
    
### [Test REST Web Service đơn giản hơn với REST Assured](https://gpcoder.com/6038-test-rest-webservice-don-gian-hon-voi-rest-assured/)
    
Ở bài viết trên, tôi đã giới thiệu với các bạn cách test REST API trong Jersey project. Giả sử bây giờ chúng ta cần sử dụng API của bên thứ 3 (không phải source code trong jersey project của chúng ta), khi đó ta không thể sử dụng Jersey Test. Khi đó, chúng ta cần một thư viện khác có thể giúp chúng ta gửi một request thật để verfiy kết quả trả về.

Trong bài này tôi sẽ giới thiệu với các bạn một thư viện rất mạnh mẽ để test web service, đó chính là REST Assured. Nó cho phép chúng ta gửi một HTTP request thật và verify trên kết quả trả về một cách dễ dàng.

[Giới thiệu Castle Mock – Mock REST APIs và SOAP web-services](https://gpcoder.com/6070-gioi-thieu-castle-mock-mock-rest-apis-va-soap-web-services/)
    
Trong quá trình phát triển hệ thống hoặc quá trình testing, một trong những vấn đề khó khăn là khi hệ thống của bạn cần tích hợp với một bên thứ ba (3rd party). Do sử dụng API của bên thứ ba nên chúng ta có thể gặp một số vấn đề sau:

* Bên thứ ba không có hoặc không cung cấp hệ thống test cho chúng ta.
* Bên thứ 3 đang phát triển API song song với chúng ta hoặc chưa hoàn thành API cho chúng ta sử dụng.
* Không thể gọi API thật để test: gặp vấn đề về chi phí và bảo mật.
* Gọi service của bên thứ ba để viết Unit Test rất chậm và đôi khi service của họ die dẫn đến Unit Test của chúng ta failed không mong muốn.
    
Để giải quyết vấn đề này, mình cần thu thập API document của họ, và dựng nên con mock service, trả về đúng những trường hợp cần sử dụng trong requirement API document và để team tích hợp.

Trong bài viết này mình sẽ giới thiệu về 1 Mock service rất dễ sử dụng là Castle Mock.

Sau bài này các bạn sẽ nắm được:

* Castle Mock là gì?
* Một số tính năng nỗi bật của Castle Mock.
* Cách cài đặt Castle Mock.
* Cách sử dụng Castle Mock để tạo mock serivces cho REST và SOAP project.
    
[Triển khai ứng dụng Jersey REST Web service lên Tomcat Server](https://gpcoder.com/6084-trien-khai-ung-dung-jersey-rest-web-service-len-tomcat-server/)
    
Mục đích cuối cùng của phát triển ứng dụng là cung cấp cho user sử dụng. Để client có thể gọi và sử dụng API, chúng ta cần phải deploy ứng dụng lên web server. Đối với Java, chúng ta có thể deploy ứng dụng lên Tomcat, jboss, glassfish, … Để đơn giản tôi sẽ hướng dẫn các bạn một web server rất phổ biến và thường được sử dụng là Tomcat.

Tomcat là một phần mềm mã nguồn mở được cung cấp bởi Apache. Tomcat là một ứng dụng máy chủ (Application Server). Tomcat nổi tiếng vì gọn nhẹ và thường được sử dụng trong quá trình phát triển một ứng Web trên nền tảng Java Servlet.

Tomcat được sử dụng để triển khai các ứng dụng Java Web trong thực tế và hoàn toàn có thể tin tưởng vào sự ổn định của nó.

Sau bài này, các bạn sẽ nắm được:

* Cách cài đặt và cấu hình Tomcat server.
* Cách triển khai ứng dụng Jersey REST Web service lên Tomcat Server.
    
Lời kết:

Trên đây là toàn bộ các bài viết về web service mà mình muốn giới thiệu với các bạn. Trong dự án thực tế có thể bạn sẽ không sử dụng các thư viện này, nhưng đây là một trong những kiến thức mà mình nghĩ rất quan trọng và nền tảng để các bạn dễ dàng tìm hiểu thêm ở các thư viện hay framework khác để xây dựng ứng dụng web service.

Bài viết đến đây là hết, cảm ơn các bạn đã quan tâm và theo dõi toàn bộ series bài viết!

Link bài viết gốc: [https://gpcoder.com/6149-tong-hop-cac-bai-viet-ve-web-services/](https://gpcoder.com/6149-tong-hop-cac-bai-viet-ve-web-services/)