Hé lô xin chào tất cả các bạn! Lại là mình đây, vậy là 4 năm đại học đã kết thúc tốt đẹp với báo cáo khóa luận tốt nghiệp và một tin tốt nữa là mình đã được nhận vào công ty FPT Information System (FIS). Mừng 2 chuyện tuyệt vời này nên nhân đây viết series mình đã ấp ủ khá lâu đó là về Spring Framework. Các series trước đều là ấp ủ nhưng không được thực hiện chắc chắn là lỗi của mình rồi nhưng mình hứa sẽ bù đắp sau cho mọi người nha ^^. Thời gian đúng là không bỏ sót một ai thấm thoát nhanh thật đấy giờ mình phải cố gắng nhiều hơn nữa về các kế hoạch, việc học kĩ năng cứng, kĩ năng mềm, ngôn ngữ,… Mọi thứ sẽ nằm trên giấy nếu chúng ta không bắt tay vào thực hiện đúng không nào, bắt đầu bài viết ngay thôi!
![](https://images.viblo.asia/3e5d8dff-fede-4168-ad20-8d140ff2730a.png)
Phiên bản mới nhất của Spring Framework là 5.1.9 RELEASE. Spring khiến cho việc xây dựng ứng dụng quy mô doanh nghiệp trở nên dễ dàng hơn, nó cung cấp mọi thứ chúng ta cần để sử dụng ngôn ngữ Java trong môi trường doanh nghiệp với hỗ trợ ngôn ngữ Groovy và Kotlin như ngôn ngữ thay thế chạy trên JVM. Và Spring 5.1 yêu cầu JDK 8+ (Java SE 8+) và cung cấp một số tính năng nổi bật hỗ trợ cho phiên bản JDK 11 LTS.

1.  Định nghĩa “Spring” thế nào cho đúng?
Theo các nhà phát triển Spring, khái niệm “Spring” có nghĩa những điều khác biệt trong những ngữ cảnh khác biệt. Nó có thể được sử dụng để kết luận những dự án Spring Framework được xây dựng on top của chính nó. Khi mọi người nói “Spring” có nghĩa toàn bộ các framework trong hệ sinh thái của nó. Spring Framework ý tưởng từ chính nó và xây dựng cũng dựa vào phần lõi của nó, những module mới ra đời dựa trên dự án Spring trước nhằm cải tiến chức năng, nâng cấp tự động hơn, cấu hình mạnh mẽ hơn trong các hoàn cảnh khác nhau cũng là ý tưởng đó.
Spring Framework được chia thành nhiều modules. Dự án có thể chon những modules cần thiết và thêm vào, phần trung tâm của các modules chính là Spring Core container, nó bao gồm các mẫu cấu hình và mô hình tiêm sự phụ thuộc (dependency injection mechanism). Spring Framework cung cấp các kiến trúc ứng dụng khác nhau bao gồm: truyền tin, thao tác với dữ liệu và web. Nó cũng bao gồm framework Sping MVC dựa trên Servlet song song với việc phát triển Spring WebFlux cho ứng dụng web.

2. Lịch sử của Spring Framework
Sping xuất hiện lần đầu năm 2003 làm việc với J2EE, trải qua nhiều giai đoạn phát triển các tính năng core:
– Servlet API
– WebSocket API
– Concurrency Utilities
– JSON Binding API
– Bean Validation
– JPA
– JMS
– JTA, JCA được thêm vào khi cần thiết
Tiếp nối sau đó là Dependency Injection và Common Annotations một trong những khái niệm trung tâm của Spring Framework. Vê sau để tiện cho mọi việc cấu hình thì Spring Boot ra đời kéo theo đó là các anh em Spring Security, Spring Data,… Một dự án đều được phát triển với phần mã nguồn riêng biệt và đôi ngũ phá triển với thơi gian và tên phiên bản khác nhau.

3. Triết lý thiết kế của Spring Framework
Khi chúng ta học về 1 framework, quan trọng phải biết đến quy tắc nó tuân thủ, ở đây là các quy tắc của Spring Framework:
– Cung cấp sự lựa chọn ở mọi cấp độ. Spring cho phép bạn trì hoãn các quyết định thiết kế để lựa chọn càng muộn càng tốt. Ví dụ: bạn có thể chuyển đổi cơ sở dữ liệu truy vấn thông qua cấu hình mà không thay đổi mã của mình. Điều này cũng đúng với nhiều mối quan tâm và tích hợp cơ sở hạ tầng khác với API của bên thứ ba.
– Có quan điểm đa dạng. Spring lấy sự linh hoạt làm nền tảng và không quan tâm về cách mọi thứ được thực hiện. Nó hỗ trợ một loạt các nhu cầu ứng dụng với các quan điểm khác nhau.
– Duy trì khả năng tương thích ngược mạnh mẽ. Sự phát triển của Spring Framework đã được quản lý cẩn thận để có một vài thay đổi đột phá giữa các phiên bản. Spring hỗ trợ một loạt các phiên bản JDK và thư viện của bên thứ ba được lựa chọn cẩn thận để tạo điều kiện bảo trì các ứng dụng và thư viện phụ thuộc vào Spring.
– Quan tâm về thiết kế API. Nhóm Spring đặt rất nhiều suy nghĩ và thời gian để tạo ra các API trực quan và giữ được nhiều phiên bản và nhiều năm.
– Đặt tiêu chuẩn cao cho chất lượng mã. Spring Framework tập trung mạnh vào javadoc có ý nghĩa, có tính cập nhật và chính xác. Đây là một trong số rất ít các dự án có thể yêu cầu cấu trúc mã sạch mà không phụ thuộc giữa các dự án với nhau.

4. Kiến trúc Spring Framework
![](https://images.viblo.asia/b4d808e3-f70c-4c4d-9341-ec2c0518df0f.png)
*  Như các bạn thấy trong hình trái tim cũng như cơ sở lý thuyết của Spring Framework đó chính là phần Core nơi 2 khái niệm IoC và DI mình sẽ nói trong bài sau lấy làm trung tâm bên cạnh đó có có các khái niệm khác như Events, Resources, Validation, Data Binding,… cũng rất hay sử dụng đó đều là các khái niệm cực kì quan trọng chúng ta nên nắm vững.
* Tiếp theo là phần tổ chức Web Servlet và Web Reactive bao gồm các project chúng ta tạo ra một dự án Spring cơ bản như MVC, WebSocket, WebClient hay khái niệm mới hơn là WebFlux chúng ta sẽ đi sâu sau này.
* Phần Data Access chính là một trong những con đường soi sáng trong việc làm việc với đa loại cơ sở dữ liệu và theo lý luận Spring đó là có thể chọn và thay đổi cơ sở dữ liệu muộn nhất có thể tùy theo yêu cầu của chúng ta các bạn sẽ tìm hiểu về Transactions, Repository, JPA, NoSQL Data hay khái niệm cao cấp O/R Mapping.
* Testing và Integration đó chính là 2 công đoạn cuối cùng để kiểm thử và đưa dự án vào thực teestichs hợp các thao tác tự động, dọn dẹp gửi thư email, các tác vụ cho người dùng.
* Ngoài ra Spring còn hỗ trợ các ngôn ngữ Kotlin, Groovy nên nếu mọi người muốn tìm hiểu sâu hơn có thể theo dõi các phần này trong mục Languages.

Trên đây là các bước đầu tiên để làm quen với Spring Framework nó tuy chỉ là lý thuyết nhưng cũng là bài học vỡ lòng cho các bạn hiểu về khai niệm Spring, lịch sử phát triển và triết lý thiết kế của Spring Framewok. Nếu có thời gian hãy tìm hiểu thêm thật nhiều nhé chứ bài blog không thể thay thế sách và tài liệu phải không. Cảm ơn mọi người đã đọc bài viết của mình nha!

Tài liệu tham khảo: 
1. https://docs.spring.io/spring/docs/5.1.9.RELEASE/spring-framework-reference/overview.html#overview
2. https://gociter.wordpress.com/2019/08/10/sping-oi-minh-hoc-tu-dau-the-phan-1-tong-quan-ve-spring-framework/