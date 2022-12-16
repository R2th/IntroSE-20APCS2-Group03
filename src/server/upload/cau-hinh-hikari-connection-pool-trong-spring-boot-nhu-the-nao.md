Trong bài trước, mình đã có giới thiệu qua **HikariCP** (Hikari Connection Pool) và một số thư viện giúp tạo connection pool khác. ([Bạn có thể xem lại tại đây](https://viblo.asia/p/hikaricp-va-tomcat-dbcp2-c3p0-bonecp-vibur-ke-tam-lang-nguoi-chua-toi-nua-gam-vyDZOYOk5wj))

Bài này, mình sẽ đi sâu hơn một tý về HikariCP, cụ thể là đi trả lời câu hỏi: "Cấu hình Hikari Connection Pool trong Spring Boot như thế nào?"
## Giới thiệu
Trước khi cấu hình, mình xin nhắc lại đôi chút về HikariCP nhé.

HikariCP là một thể hiện (implementation) của JDBC DataSource, cung cấp cơ chế connection pooling. Dùng nó thì đỉnh rồi, rất nhẹ và có hiệu năng cao.

![](https://images.viblo.asia/c9846942-bf16-4aff-b042-96f19a8e6104.png)

## Cấu hình HikariCP với Spring Boot 2.x
Trong Spring Boot 2.x, Hikari là datasource mặc định được sử dụng. Vậy nên một khi đã và đang sử dụng Spring Boot 2.x thì bạn chả cần làm gì cả :stuck_out_tongue_winking_eye:
## Cấu hình HikariCP với Spring Boot 1.x
Nếu ứng dụng của bạn đã lỡ sử dụng Spring Boot 1.x và vì một số lý do nào đó không thể nâng cấp lên 2.x thì mới cần cấu hình thủ công HikariCP nhé ;)

Trong Spring Boot 1.x, Tomcat JDBC là datasource được sử dụng mặc định, nó đã được thêm vào *spring-boot-starter-data-jpa*. Do vậy, nếu cứ thế (không cấu hình gì) thì bạn đang sử dụng Tomcat connection pool đấy.

Còn để sử dụng HikariCP, phải thực hiện một số công đoạn sau

### 1. Thêm HikariCP dependency
Đầu tiên, bạn cần include Hikari dependency vào file pom.xml:
```
<dependency>
    <groupId>com.zaxxer</groupId>
    <artifactId>HikariCP</artifactId>
    <version>3.3.1</version>
</dependency>
```

Bạn có thể theo dõi thêm dependency version của HikariCP tại [mvnrepository](https://mvnrepository.com/artifact/com.zaxxer/HikariCP)
### 2. Xóa Tomcat JDBC Dependency
**Nếu Spring Boot (1.x) không tìm thấy Tomcat DataSource trong classpath, nó sẽ tự động sử dụng HikariCP** (nếu HikariCP khả dụng trong classpath)
(Thuật toán được mô tả tại [tài liệu của Spring 1.x](https://docs.spring.io/spring-boot/docs/1.5.15.RELEASE/reference/htmlsingle/#boot-features-connect-to-production-database))

Như vậy, để có thể sử dụng HikariCP, bạn phải loại bỏ Tomcat JDBC khỏi classpath. Thế thì, cần exclude nó khỏi pom.xml:
```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.apache.tomcat</groupId>
            <artifactId>tomcat-jdbc</artifactId>
         </exclusion>
     </exclusions>
</dependency>
```
Vậy là xong, test thử xem ứng dụng của bạn đã chuyển sang dùng HikariCP chưa nhé ;)
## Một số tham số cấu hình nên biết
Một trong những thứ đặc biệt của HikariCP so với những thư viện connection pool khác là việc cung cấp nhiều tham số cấu hình hữu ích.

Bạn có thể thiết lập giá trị cho các tham số cấu hình trong spring bằng việc sử dụng tiền tố ***spring.datasource.hikari*** và nối theo sau là ***tên của tham số*** mà Hikari cung cấp:
```
spring.datasource.hikari.connectionTimeout=30000 // Thời gian tính bằng mili giây mà client sẽ chờ một connection từ pool
spring.datasource.hikari.idleTimeout=600000 // Thiết lập thời gian tối đa mà kết nối được phép để ở chế độ chờ trong pool
spring.datasource.hikari.maxLifetime=1800000 // Tuổi thọ tối đa của một connection trong pool
...
```
Vâng, còn rất nhiều, bạn có thể tham khảo chi tiết những tham số đó tại [github của HikariCP](https://github.com/brettwooldridge/HikariCP#configuration-knobs-baby).
## Ngoài lề
Đến đây chắc hẳn bạn đã có đáp án cho câu hỏi "**Cấu hình Hikari Connection Pool trong Spring Boot như thế nào?**" rồi nhỉ :sweat_smile:

Trên đây là cách ***cấu hình HikariCP đơn giản với Spring Boot***, có thể bài viết chỉ dành cho những người mới hoặc dân ngoại đạo, còn các cụ "ngành" thì em xin được nhận chỉ giáo ạ (bow)

![](https://images.viblo.asia/155f3206-e244-4c94-bcce-31cd4b81aac9.gif)
Hẹn gặp lại!