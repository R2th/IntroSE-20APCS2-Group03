* Trước khi đến với Spring Boot chúng ta sẽ cần biết Sping là gì:
    * Spring là một Java framework  rất lớn và khổng lồ, làm được rất nhiều thứ.
    * Spring là một framework mãnh mẽ và phổ biến dành cho doanh nghiệp. 
    * Spring được chia làm nhiều module khác nhau, tùy theo mục đích phát triển ứng dụng mà ta dùng 1 trong các module đó (Spring Core, Web, Data access, AOP,...)
    * Spring được xây dựng dựa trên 2 nguyên tắc design chính là: Dependency Injection và Aspect Oriented Programming
* Spring có nhược điểm là cấu hình (config) dự án quá phức tạp, phải làm rất nhiều thứ cho dù đó là chương trình đơn giản nhất:
    * Tạo Maven hoặc Gradle project
    * Thêm các thư viện cần thiết
    * Tạo XML để cấu hình project, cấu hình các bean
    * Code và build thành file WAR
    * Cấu hình Tomcat server để chạy được file WAR vừa build
=> Đó là lý do Spring Boot ra đời.

## 1. Spring Boot
* Spring Boot được phát triển dựa trên Spring Framework, nó giảm tối đa các cấu hình của Spring trong ứng dụng, tích hợp tự động, giúp developer chỉ tập trung vào việc phát triển business logic cho ứng dụng:
    * Spring Boot tự động cấu hình, chúng ta chỉ cần bắt đầu code và chạy là được.
    * Xây dựng các bean dựa trên annotation thay vì XML.
    * Server Tomcat được nhúng ngay trong file JAR build ra, chỉ cần chạy ở bất kì đâu java chạy được.
* Spring boot có nhiều thư viện có sẵn và cấu trúc code cũng thành chuẩn mực rồi, nên không cần quá quan tâm phải viết code thế nào cho tốt nữa, thay vào đó sẽ tập trung vào logic nhiều hơn.
* Spring boot dễ dàng để phát triển các ứng dụng dựa trên Spring với Java hoặc Groovy.
* Spring boot sở hữu đầy đủ các tính năng của Spring Framework.

## 2. Kiến thức nền
### 2.1 Java cơ bản
* Trước khi tìm hiểu Spring Boot bạn cần biết về một số kiến thức về Java:
    * Java cơ bản
    * Hướng đồi tượng
    * Collections API
    * Java 8

### 2.2 Package manager
* Java cũng có hai package manager để quản lý các thư viện cài thêm là Maven và Gradle.
* Hãy tìm hiểu về Maven và Gradle.