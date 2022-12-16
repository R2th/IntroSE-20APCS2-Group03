## 1. Giới thiệu HikariCP
Ở bài [trước](https://viblo.asia/p/mysql-issue-too-many-connections-Do754dxX5M6), mình có nói về max_connections. 
Bài viết này, mình sẽ nói chi tiết hơn vấn đề mà mình đã gặp phải, cách khắc phục nó.
Để hiểu về HikariCP là gì có thể tham khảo 1 bài viết [này](https://viblo.asia/p/cau-hinh-hikari-connection-pool-trong-spring-boot-nhu-the-nao-eW65Gey6ZDO)

Trong bài viết này, mình sẽ giải thích chi tiết từng tham số trong đó, những ảnh hưởng của tham số qua các ví dụ thực tế.
Trong ví dụ của mình, mình sẽ sử dụng **Project Spring Boot** làm ví dụ.
Như chúng ta đã biết từ Spring Boot 2.0x thì HikariC là **Datasource Implement** mặc định. 
Mặc định là gì:
* Không cần khai báo trong pom.xml, nó được import khi chúng ta sử dụng 
```
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
```

Muốn xem chi tiết có thể xem từ lệnh
```
mvn dependency:tree
```

```
[INFO] \- org.springframework.boot:spring-boot-starter-data-jpa:jar:2.4.4:compile
[INFO]    +- org.springframework.boot:spring-boot-starter-aop:jar:2.4.4:compile
[INFO]    |  \- org.aspectj:aspectjweaver:jar:1.9.6:compile
[INFO]    +- org.springframework.boot:spring-boot-starter-jdbc:jar:2.4.4:compile
[INFO]    |  +- com.zaxxer:HikariCP:jar:3.4.5:compile

```

* Các tham số trong HikariCP cũng là mặc định, trong quá trình dev, lượng connection ít, không cần phải custome lại các tham số đó.
Nhưng khi đẩy lên production thì cần phải custome lại để phù hợp với yêu cầu thực tế, đáp ứng được lượng người dùng lớn hơn, hệ thống ổn định hơn.
Xem danh sách các thông số ở [đây](https://github.com/brettwooldridge/HikariCP) 

Thực ra có quá nhiều tham số, dùng đến tham số nào thì nghiên cứu rõ để sử dụng cho hiệu quả. 
## 2. Một số thuộc tính cần lưu ý
Mình sẽ đi sâu 1 số các tham số 
### maximumPoolSize
```
This property controls the maximum size that the pool is allowed to reach, including both idle and in-use connections. Basically this value will determine the maximum number of actual connections to the database backend. A reasonable value for this is best determined by your execution environment. When the pool reaches this size, and no idle connections are available, calls to getConnection() will block for up to connectionTimeout milliseconds before timing out. Please read about pool sizing. Default: 10
```

Ta có thể thấy số lượng tối đã cho phép là 10 connections tại 1 thời điểm, nếu có lớn hơn 10 connections thì các connections tiếp theo sẽ phải đợi. 
Điều này chúng ta không hề mong muốn. 
***Ban đầu mình nghĩ cứ tăng lên đi tăng cao 1 chút, khi nào cần thì nó tạo ra, không cần thì nó hủy đi vì đây là maximum mà. ***

Mình tăng lên 100 và cái kết. 
```
spring.datasource.hikari.maximum-pool-size=100
```

Vì mình chỉ khai báo **maximumPoolSize** mà không khai báo **minimumIdle** 
### minimumIdle
```
This property controls the minimum number of idle connections that HikariCP tries to maintain in the pool. If the idle connections dip below this value and total connections in the pool are less than maximumPoolSize, HikariCP will make a best effort to add additional connections quickly and efficiently. However, for maximum performance and responsiveness to spike demands, we recommend not setting this value and instead allowing HikariCP to act as a fixed size connection pool. Default: same as maximumPoolSize
```

Nên khi chạy ứng dụng, nó sẽ lấy bằng **maximumPoolSize**. Nghĩa là nó sẽ khởi tạo luôn 100 connections đến databases. 
Khi đó database đã đạt đến giới hạn về số lượng connections dẫn đến lỗi như bài [này](https://viblo.asia/p/mysql-issue-too-many-connections-Do754dxX5M6).
Có thể kiểm tra trong databases

```
show processlist ;
```

![](https://images.viblo.asia/8284fe52-4bef-4cb2-87fe-ad74bdc38ecc.png)


-> Đây là 1 cặp, thông thường mình sẽ config đi kèm với nhau.
```
spring.datasource.hikari.minimum-idle= 10
spring.datasource.hikari.maximum-pool-size=100
```

Ngoài ra mình cũng hay config thêm 1 số các thông số khác.
### connectionTimeout
```
This property controls the maximum number of milliseconds that a client (that's you) will wait for a connection from the pool. If this time is exceeded without a connection becoming available, a SQLException will be thrown. Lowest acceptable connection timeout is 250 ms. Default: 30000 (30 seconds)
```

Tùy theo mục đích sử dụng, có thể config lớn hơn (đợi lâu hơn, nhưng có thể trả về kết quả) hoặc nhỏ hơn (trả về lỗi nhưng không phải đợi quá lâu). Tùy theo từng trường hợp.

### idleTimeout
```
This property controls the maximum amount of time that a connection is allowed to sit idle in the pool. This setting only applies when minimumIdle is defined to be less than maximumPoolSize. Idle connections will not be retired once the pool reaches minimumIdle connections. Whether a connection is retired as idle or not is subject to a maximum variation of +30 seconds, and average variation of +15 seconds. A connection will never be retired as idle before this timeout. A value of 0 means that idle connections are never removed from the pool. The minimum allowed value is 10000ms (10 seconds). Default: 600000 (10 minutes)
```

Khi 1 connections không được sử dụng, nó chuyển sang trạng thái **Idle**, nếu số lượng connections hiện tại lớn hơn nó sẽ được xóa khỏi pool sau 1 khoảng thời gian để giảm thiểu số lượng connections trong pool. 

Có rất nhiều thuộc tính hay, mình chỉ nêu qua 1 vài thuộc tính mà mình thấy cần thiết và cần phải lưu ý. 

Nếu cần trao đổi, mọi người hãy comment bên dưới.