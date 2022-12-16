# Tổng quan
`Spring Framework` từ lâu đã không còn xa lạ gì đối với lập trình viên Java nói chung và Java Web nói riêng, nó cung cấp rất nhiều tính năng giúp xây dựng sản phẩm một cách thuận tiện và nhanh chóng hơn. Spring hiện được sử dụng rất rộng rãi và là một phần gần như không thể thiếu trong các sản phẩm Java EE. Sẽ là không nói quá rằng chúng xa có thể xây dựng được rất nhiều ứng dụng chỉ với "hệ sinh thái" Spring. Cùng với đó, chúng ta cũng bắt gặp không ít lần các ứng dụng được phát triển với `Spring Boot`, `Spring MVC`. Vậy Spring Boot và Spring MVC là gì? Chúng có khác với Spring không?

Chúng ta hãy cùng nhau đi qua bài viết này để hiểu khái quát 3 thuật ngữ trên và điểm khác nhau cơ bản của chúng nhé! Nào cùng bắt đầu thôi.

# Spring Framework

`Spring` là framework mã nguồn mở được phát triển dựa trên nền tảng là **Java**, giúp đơn giản hóa việc xây dựng và phát triển các ứng dụng java doanh nghiệp. Nó cung cấp mô hình lập trình và cấu hình toàn diện cho các ứng dụng doanh nghiệp dựa trên Java hiện đại - trên bất kỳ loại nền tảng triển khai nào. Các tính năng của Spring được chia làm rất nhiều module riêng rẽ, ứng dụng của bạn có thể chọn sử dụng bất kì module nào khi cần thiết và `Spring Boot, Spring MVC` cũng là các module nằm trong thùng chứa Spring Framework. Tính năng chính và nổi bật của Spring Framework đó là **Dependency Injection** và **Inversion of Control (IoC)** giúp bạn phát triển các ứng dụng với khả năng **loosely coupled**.

# Spring Boot

`Spring Boot` là một module nằm trong Spring Framework, nó cung cấp giao diện và khả năng phát triển các ứng dụng độc lập với rất ít các bước cấu hình rườm rà hoặc gần như bằng không. Spring Boot được đóng gói với rất nhiều thư viện phụ thuộc các module nền tảng của Spring Framework nhưng được giảm thiểu đi các mã nguồn dài dòng, phức tạp nhằm cung cấp sự thuận tiện và phù hợp với từng mục đích khi phát triển ứng dụng.

# Spring MVC

Cũng giống như `Spring Boot`, `Spring MVC` cũng là một module nằm trong Spring Framework nhưng mục đích chính của nó là xây dựng các ứng dụng web dựa trên mô hình **MVC** (Model - View - Controller). Spring MVC sử dụng rất nhiều các cầu hình từ Spring do đó cũng chưa rất nhiều các file cấu hình tùy các mục đích khác nhau trong ứng dụng của bạn và nó cung cấp khung phát triển ứng dụng web theo hướng **HTTP**.

# Sự khác nhau

#### Spring vs. Spring Boot


| Spring | Spring Boot |
| -------- | -------- |
| **Spring Framework** là một khung Java EE được sử dụng rộng rãi để xây dựng các ứng dụng.  | Spring Boot Framework được sử dụng rộng rãi để phát triển các **REST APIs.**     |
|Nó nhằm mục đích đơn giản hóa việc phát triển Java EE giúp các nhà phát triển làm việc hiệu quả hơn.|Nó nhằm mục đích rút ngắn độ dài mã và cung cấp cách dễ dàng nhất để phát triển **Web Application.**|
|Tính năng chính của Spring Framework là **dependency injection**.|Tính năng chính của Spring Boot là **Autoconfiguration**. Nó tự động cấu hình các lớp dựa trên yêu cầu. |
|Nó giúp làm cho mọi thứ đơn giản hơn bằng cách cho phép chúng ta phát triển **loosely coupled applications**. | Nó giúp tạo một ứng dụng độc lập với ít cấu hình hơn.|
|Lập trình viên cần viết rất nhiều mã (mã viết sẵn) để thực hiện nhiệm vụ tối thiểu. | Nó làm giảm đi mã viết sẵn.|
|Để kiểm tra dự án Spring, chúng ta cần thiết lập sever một cách rõ ràng.|Spring Boot cung cấp máy chủ nhúng như Jetty và Tomcat, v.v.|
|Các nhà phát triển xác định thủ công các dependencies cho dự án Spring trong pom.xml. | Spring Boot đi kèm với khái niệm khởi động trong tệp pom.xml, bên trong xử lý việc tải xuống các JAR phụ thuộc dựa trên Spring Boot Requirement.|

#### Spring Boot vs. Spring MVC



| Spring Boot | Spring MVC |
| -------- | -------- | 
| **Spring Boot** là một module của Spring để đóng gói ứng dụng dựa trên Spring với các giá trị mặc định hợp lý.| **Spring MVC** model view controller-based web framework dựa trên Spring. |
|Nó cung cấp các cấu hình mặc định để xây dựng **Spring-powered framework**.|Nó cung cấp các tính năng sẵn sàng sử dụng để xây dựng một ứng dụng web.|
|Không có yêu cầu đối với các file mô tả khi triển khai.|Cần có nhiều file mô tả triển khai.|
|Nó tránh mã viết sẵn và kết hợp các dependencies lại với nhau trong một đơn vị duy nhất.|Nó chỉ định từng dependency riêng biệt.|
|Nó làm giảm thời gian phát triển và tăng năng suất.|Cần nhiều thời gian hơn để đạt được điều tương tự.|


# Tổng kết
Trên đây là một số khái niệm và điểm khác biệt giữa 3 framework `Spring`, `Spring Boot` và `Spring MVC`. Hi vọng qua bài viết này, các bạn sẽ có cái nhìn cụ thể và chọn được framework phù với với mục đích và yêu cầu trong ứng dụng của mình!

Tham khảo thêm tại: https://www.javatpoint.com/spring-vs-spring-boot-vs-spring-mvc