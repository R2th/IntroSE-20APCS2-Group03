### Logging

Spring boot sử dụng [Commons Loggin](https://commons.apache.org/logging) cho tất cả ghi log nội bộ. Các cấu hình mặc định được cung cấp để hỗ trợ cho [Java Util Logging](https://docs.oracle.com/javase/8/docs/api//java/util/logging/package-summary.html), [Log4J2](https://logging.apache.org/log4j/2.x/), [SLF4J](http://www.slf4j.org/index.html) và [Logback](https://logback.qos.ch/). Trong mỗi trường hợp các logger được định nghĩa sẵn để sử dụng console output cũng như ghi vào file.

> Có rất nhiều frameworks sẵn có cho việc ghi log trong Java. Thông thường không cần thay đổi dependencies và Spring boot mặc định vẫn chạy ổn định.
> Khi deploy ứng dụng vào một servlet container hoặc ứng dụng server, ghi log thực thi qua Java Util Logging API mà không định tuyến vào các log của ứng dụng. Điều đó ngăn chặn ghi log thực thi bởi container hoặc các ứng dụng mà đã deploy đến xuất hiện trong các log của ứng dụng.

### Định dạng log 

Log đầu ra mặc định của Spring boot có dạng như sau:
```
2021-08-19 20:50:52.993  INFO 14060 --- [           main] d.h.r.RedisSpringBootApplicationKt       : Starting RedisSpringBootApplicationKt using Java 11 on DESKTOP-UDIN88B with PID 14060 
2021-08-19 20:50:52.995  INFO 14060 --- [           main] d.h.r.RedisSpringBootApplicationKt       : No active profile set, falling back to default profiles: default
2021-08-19 20:50:53.552  INFO 14060 --- [           main] .s.d.r.c.RepositoryConfigurationDelegate : Multiple Spring Data modules found, entering strict repository configuration mode!
2021-08-19 20:50:53.554  INFO 14060 --- [           main] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data Redis repositories in DEFAULT mode.
2021-08-19 20:50:53.589  INFO 14060 --- [           main] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 23 ms. Found 0 Redis repository interfaces.
2021-08-19 20:50:53.873  INFO 14060 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8080 (http)
2021-08-19 20:50:53.879  INFO 14060 --- [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2021-08-19 20:50:53.880  INFO 14060 --- [           main] org.apache.catalina.core.StandardEngine  : Starting Servlet engine: [Apache Tomcat/9.0.46]
2021-08-19 20:50:53.936  INFO 14060 --- [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2021-08-19 20:50:53.936  INFO 14060 --- [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 901 ms
2021-08-19 20:50:54.682  INFO 14060 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
2021-08-19 20:50:54.690  INFO 14060 --- [           main] d.h.r.RedisSpringBootApplicationKt       : Started RedisSpringBootApplicationKt in 2.015 seconds (JVM running for 3.141)
```

Các thông tin đầu ra gồm có:
- Ngày và thời gian: độ chính xác mili giây và có sắp xếp.
- Mức độ log: `ERROR`, `WARN`, `INFO`, `DEBUG` và `TRACE`.
- ID của tiến trình.
- Ký hiệu `---` ngăn cách để phân biệt bắt đầu của các nội dung log cụ thể.
- Tên luông: Bao bởi ngoặc vuông(có thể bị cắt bớt ở đầu ra của console).
- Tên logger: Thường là tên của class nguồn(thường viết tắt khi tên package dài và nằm lòng nhiều tầng).
- Nội dung log.

Đầu ra console
Cầu hình mặc định của log gửi các nội dung ra console khi chúng được ghi ra. Mức `ERROR`, `WARN` và `INFO` là các nội dung được ghi mặc định. 

Hãy xem ví dụ sau sẽ có phân ghi log ở controller và phân service sử dụng `SLF4J`
- Controller
Ở trong controller chỉ log với mức `INFO`
```
import dev.hlk.redis_spring_boot.model.LoggerDto
import dev.hlk.redis_spring_boot.service.LoggerService
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/logs")
class LoggerController(
    private val loggerService: LoggerService
) {
    private val logger = LoggerFactory.getLogger(this.javaClass)

    @PostMapping("sendLog")
    fun sendLog(@RequestBody request: LoggerDto): ResponseEntity<LoggerDto> {
        logger.info("LoggerService will run in 3s")
        Thread.sleep(3000L)
        loggerService.displayLogs(request)
        logger.info("LoggerService done")
        return ResponseEntity.ok(request)
    }
}
```

- Service
Ở trong service ghi các mức log để kiểm tra
```
import dev.hlk.redis_spring_boot.model.LoggerDto
import dev.hlk.redis_spring_boot.service.LoggerService
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class LoggerServiceImpl : LoggerService {
    private val logger = LoggerFactory.getLogger(this.javaClass)

    override fun displayLogs(request: LoggerDto) {
        logger.trace("TRACE of code: ${request.errCode} -- message: ${request.errMsg}")
        logger.debug("DEBUG of code: ${request.errCode} -- message: ${request.errMsg}")
        logger.info("INFO of code: ${request.errCode} -- message: ${request.errMsg}")
        logger.warn("WARN of code: ${request.errCode} -- message: ${request.errMsg}")
        logger.error("ERROR of code: ${request.errCode} -- message: ${request.errMsg}")
    }
}
```

Khi xem xét ở đầu ra console các mức log `TRACE` và `DEBUG` không được ghi ra.
```
2021-08-19 21:41:25.754  INFO 10716 --- [nio-8080-exec-7] d.h.r.controller.api.LoggerController    : LoggerService will run in 3s
2021-08-19 21:41:28.755  INFO 10716 --- [nio-8080-exec-7] d.h.r.service.impl.LoggerServiceImpl     : INFO of code: 1 -- message: Logger
2021-08-19 21:41:28.755  WARN 10716 --- [nio-8080-exec-7] d.h.r.service.impl.LoggerServiceImpl     : WARN of code: 1 -- message: Logger
2021-08-19 21:41:28.755 ERROR 10716 --- [nio-8080-exec-7] d.h.r.service.impl.LoggerServiceImpl     : ERROR of code: 1 -- message: Logger
2021-08-19 21:41:28.755  INFO 10716 --- [nio-8080-exec-7] d.h.r.controller.api.LoggerController    : LoggerService done
```

Có rất nhiều cách để bật lên cho hiển thị mức log
- `java -jar log_app.jar --debug`
- Cấu hình trong `application.properties` hoặc `application.yml` cụ thể `debug=true`

Khi bật chế độ debug một số logger của phần lõi sẽ được chọn ra và in ra thông tin ở đầu ra, trong đó chế độ debug không cấu hình tất cả các nội dung mức `DEBUG`.

- Config logger mức `DEBUG`

``` application.yml
logging:
  level:
    root: DEBUG
```

```
2021-08-19 22:03:25.161 DEBUG 1040 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : POST "/api/logs/sendLog", parameters={}
2021-08-19 22:03:25.163 DEBUG 1040 --- [nio-8080-exec-1] s.w.s.m.m.a.RequestMappingHandlerMapping : Mapped to dev.hlk.redis_spring_boot.controller.api.LoggerController#sendLog(LoggerDto)
2021-08-19 22:03:25.238 DEBUG 1040 --- [nio-8080-exec-1] m.m.a.RequestResponseBodyMethodProcessor : Read "application/json;charset=UTF-8" to [LoggerDto(errCode=1, errMsg=Logger)]
2021-08-19 22:03:25.242  INFO 1040 --- [nio-8080-exec-1] d.h.r.controller.api.LoggerController    : LoggerService will run in 3s
2021-08-19 22:03:28.254 DEBUG 1040 --- [nio-8080-exec-1] d.h.r.service.impl.LoggerServiceImpl     : DEBUG of code: 1 -- message: Logger
2021-08-19 22:03:28.254  INFO 1040 --- [nio-8080-exec-1] d.h.r.service.impl.LoggerServiceImpl     : INFO of code: 1 -- message: Logger
2021-08-19 22:03:28.254  WARN 1040 --- [nio-8080-exec-1] d.h.r.service.impl.LoggerServiceImpl     : WARN of code: 1 -- message: Logger
2021-08-19 22:03:28.254 ERROR 1040 --- [nio-8080-exec-1] d.h.r.service.impl.LoggerServiceImpl     : ERROR of code: 1 -- message: Logger
2021-08-19 22:03:28.254  INFO 1040 --- [nio-8080-exec-1] d.h.r.controller.api.LoggerController    : LoggerService done
```

- Config logger mức `TRACE`
``` application.yml
logging:
  level:
    root: TRACE
```

``` console
2021-08-19 22:02:20.465 DEBUG 13088 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : POST "/api/logs/sendLog", parameters={}
2021-08-19 22:02:20.467 DEBUG 13088 --- [nio-8080-exec-1] s.w.s.m.m.a.RequestMappingHandlerMapping : Mapped to dev.hlk.redis_spring_boot.controller.api.LoggerController#sendLog(LoggerDto)
2021-08-19 22:02:20.538 DEBUG 13088 --- [nio-8080-exec-1] m.m.a.RequestResponseBodyMethodProcessor : Read "application/json;charset=UTF-8" to [LoggerDto(errCode=1, errMsg=Logger)]
2021-08-19 22:02:20.542  INFO 13088 --- [nio-8080-exec-1] d.h.r.controller.api.LoggerController    : LoggerService will run in 3s
2021-08-19 22:02:21.436 DEBUG 13088 --- [80-ClientPoller] org.apache.tomcat.util.net.NioEndpoint   : timeout completed: keys processed=1; now=1629385341436; nextExpiration=1629385341176; keyCount=0; hasEvents=false; eval=false
2021-08-19 22:02:22.437 DEBUG 13088 --- [80-ClientPoller] org.apache.tomcat.util.net.NioEndpoint   : timeout completed: keys processed=1; now=1629385342437; nextExpiration=1629385342436; keyCount=0; hasEvents=false; eval=false
2021-08-19 22:02:23.441 DEBUG 13088 --- [80-ClientPoller] org.apache.tomcat.util.net.NioEndpoint   : timeout completed: keys processed=1; now=1629385343441; nextExpiration=1629385343437; keyCount=0; hasEvents=false; eval=false
2021-08-19 22:02:23.549 TRACE 13088 --- [nio-8080-exec-1] d.h.r.service.impl.LoggerServiceImpl     : TRACE of code: 1 -- message: Logger
2021-08-19 22:02:23.549 DEBUG 13088 --- [nio-8080-exec-1] d.h.r.service.impl.LoggerServiceImpl     : DEBUG of code: 1 -- message: Logger
2021-08-19 22:02:23.549  INFO 13088 --- [nio-8080-exec-1] d.h.r.service.impl.LoggerServiceImpl     : INFO of code: 1 -- message: Logger
2021-08-19 22:02:23.549  WARN 13088 --- [nio-8080-exec-1] d.h.r.service.impl.LoggerServiceImpl     : WARN of code: 1 -- message: Logger
2021-08-19 22:02:23.549 ERROR 13088 --- [nio-8080-exec-1] d.h.r.service.impl.LoggerServiceImpl     : ERROR of code: 1 -- message: Logger
2021-08-19 22:02:23.549  INFO 13088 --- [nio-8080-exec-1] d.h.r.controller.api.LoggerController    : LoggerService done
```

### Mã màu đầu ra
Khi terminal hỗ trợ ANSI, màu sắc đầu ra sử dụng để giúp cho việc đọc. Có thể cấu hình `spring.output.ansi.enabled` với [các giá trị hỗ trợ ](https://docs.spring.io/spring-boot/docs/2.1.18.RELEASE/api/org/springframework/boot/ansi/AnsiOutput.Enabled.html) để ghi đè. Mã màu được ấu hình bằng cách sử dụng từ biến đổi `%clr`. Với dạng đơn giản nhất bộ biến đổi màu đầu ra theo mức độ log như sau
```
%clr(%5p)
```
Bảng dưới mô tả các mức log sẽ tương đương với các màu:

| Mức độ | Màu |Nội dung |
| -------- | -------- |-------- |
| `FATAL`     | Đỏ     | Chỉ định các sự kiện lỗi rất nghiêm trọng có thể khiến ứng dụng bị hủy bỏ hoặc dừng lại.|
| `ERROR`     | Đỏ     | Chỉ định các sự kiện lỗi  có thể xảy ra mà vẫn cho phép ứng dụng tiếp tục chạy.|
| `WARN`     | Vàng     | Chỉ định các tình hướng có thể gây hại cho ứng dụng đang chạy.|
| `INFO`     | Xanh     |Chỉ định các thông báo cung cấp thông tin làm nổi bật tiến trình của ứng dụng ở cấp độ chi tiết.|
| `DEBUG`     | Xanh     | Chỉ định các sự kiện thông tin chi tiết hữu ích để gỡ lỗi ứng dụng. |
| `TRACE`     | Xanh     | Chỉ định các sự kiện thông tin chi tiết hơn cấp độ `DEBUG`.|

![](https://images.viblo.asia/e4300ade-a0ed-4411-9f0a-b8a8f1deee9b.png)

Ngoài ra, có thể chỉ định màu sắc hoặc kiểu mẫu bằng cách cung cấp màu sắc hoặc kiểu mẫu đó như một tùy chọn cho việc biến đổi. Ví dụ: để làm cho văn bản có màu vàng cần sử dụng cài đặt sau:
```
%clr(%d{yyyy-MM-dd HH:mm:ss.SSS}){yellow}
```

### Ghi vào tệp

Mặc định của Spring Boot các log chỉ ghi ra console và không ghi ra các file, khi muốn ghi thêm vào file ngoài hiển thị ở console cần cấu hình `logging.file` hoặc `logging.path` trong `application.properties`
Dưới đây là các thuộc tính có thể sựng với `logging.*`

| `logging.file` | `logging.path` | Ví dụ | Mô tả |
| -------- | -------- | -------- |-------- |
| -     | -     |     |Chỉ hiển thị ở console     |
| Chỉ định tệp     | -     | `dev.log`    |Ghi ra tệp log cụ thể. Các tên có là vị trí cụ thể hoặc thự mục liên quan thư mục hiện tại|
| -     | Thư mục cụ thể     |  /var/log   |Ghi `spring.log` vào thư mục cụ thể.|

Các tệp khi có kích thước 10MB sẽ được xoay vòng(nén/xóa) đồng thời tạo ra file log mới, các nội dung mức `ERROR`, `WARN` vàn `INFO` mặc định ghi vào. Kích thước có thể tùy chỉnh sử dụng thuộc tính `logging.file.max-size`.

VD: Ghi log vào tệp trong thư mục `log/dev.log`
``` application.yml
logging:
  level:
    root: TRACE
  file:
    name: log/dev.log
```
sau khi kiểm tra thư mục đã định nghĩa sẽ thầy mộ file `dev.log` sinh ra trong thư mục `log`.
![](https://images.viblo.asia/d6ef9f2a-8904-4934-aa5a-acc1e4a65aae.png)

### Nhóm log

Trong một số trường hợp việc nhóm lại các log với nhau rất cần mà chúng có thể cấu hình cùng lúc. VD: Khi muốn đổi mức log cho các log liên quan Tomcat mà không thể nhớ các package cấp cao. 
Để giúp cho việc này, Spring Boot cho phép định nghĩa nhóm log trong môi trường Spring. VD: Sau đây sẽ định nghĩa nhóm `tomcat` bằng cách thêm vào `applicaiton.properties`
```
logging.group.tomcat=org.apache.catalina, org.apache.coyote, org.apache.tomcat
```
Sau khi định nghĩa, có thể thay đổi mức log cho các log trong nhóm
```
logging.level.tomcat=TRACE
```
Trong Spring Boot các nhóm log sau được định nghĩa sẵn và sử dụng được luôn
| Tên | Logger |
| -------- | -------- |
| web| `org.springframework.core.codec`, `org.springframework.http`, `org.springframework.web`, `org.springframework.boot.actuate.endpoint.web`, `org.springframework.boot.web.servlet.ServletContextInitializerBeans`|
| sql     | `org.springframework.jdbc.core`, `org.hibernate.SQL`|

#### Kết luận
Trong thực tế rất ít khi dùng đến mức [TRACE](http://www.slf4j.org/faq.html#trace) vì nó chứa cả một số thông tin không cần thiết, kể cả việc lưu trữ thì kích thước tệp log tăng một cách đột biến, khi muốn điều tra cũng khó khăn.
Việc set mức levels cho các môi trường như `dev`, `staging`, `prod` tùy thuộc vào yêu cầu chi tiết của từng môi trường:
- `dev`: Khi phát triển luôn phải xử lý các trường thông thường và bất thường nên xét ở mức `DEBUG` cũng đủ để điều tra và xử lý.
- `stg`: Khi đã phát triển xong cũng có lúc bị thiếu xót do vậy ở môi trường này cần mức `DEBUG` để điều tra các nguyên nhân gây lỗi trong hệ thống.
- `prod`: Trước khi đến môi trường này đã qua hai môi trường `dev` và `stg` nên ở đây mức log có thể dùng `INFO` vì trong đó đã bao gồm `WARN` và `EROROR`, còn tùy thuộc vào yêu cầu có thể dùng mức `WARN` cho môi trường này.

Cảm ơn các bạn đã đọc bài.

#### Tài liệu tham khảo
- [Logging - Spring Boot features](https://docs.spring.io/spring-boot/docs/2.1.18.RELEASE/reference/html/boot-features-logging.html)
- [Logging in Spring Boot](https://www.baeldung.com/spring-boot-logging)
- [Simple Logging Facade for Java (SLF4J)](http://www.slf4j.org/index.html)