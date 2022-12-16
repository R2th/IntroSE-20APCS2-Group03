Trong bài viết này, tôi sẽ hướng dẫn các bạn sử dụng logback trong spring boot và tạo thư mục chứa log file theo định dạng "yyyy-MM-dd" và "yyyy-MM-dd hhmmss":

Công cụ và thư viện được sử dụng trong bài viết:
+ Spring tool suite 4
+ Spring boot 2.7.3
+ Maven 3
+ Java 8
+ Logback 1.2.11

## 1. Cấu trúc thư mục:
![image.png](https://images.viblo.asia/d6f1ff16-9ccd-4887-8c32-7e616034b577.png)

## 2. Nội dung file pom:
Mặc định, trong spring boot khi bạn add "spring-boot-starter-web" -> logback sẽ được bao gồm:
![image.png](https://images.viblo.asia/194a1c1a-4ed5-4273-a790-4586e9b97e13.png)

## 3. Cấu hình logback:
Spring boot sẽ tự động đọc logback config theo những tên bên dưới:
+ logback-spring.xml
+ logback.xml

Trong bài viết này tôi sử dụng "logback-spring.xml":
```xml
<?xml version="1.0" encoding="UTF-8"?>

<configuration>
    
	<!--<timestamp key="byDate" datePattern="yyyy-MM-dd" /> -->
    
	<timestamp key="bySecond" datePattern="yyyy-MM-dd'T'HHmmss" timeReference="contextBirth"/> 
    
    <appender name="Console" class="ch.qos.logback.core.ConsoleAppender">
        <layout class="ch.qos.logback.classic.PatternLayout">
            <Pattern>
                %black(%d{ISO8601}) %highlight(%-5level) [%blue(%t)] %yellow(%C{1.}): %msg%n%throwable
            </Pattern>
        </layout>
    </appender>
    
	<appender name="roleSiftingAppender" class="ch.qos.logback.classic.sift.SiftingAppender">
	<discriminator>
        <key>folderDate</key>
        <defaultValue>${bySecond}</defaultValue>
    </discriminator>
    <sift>
    <appender name="RollingFile"
        class="ch.qos.logback.core.rolling.RollingFileAppender">
        
        <file>${LOG_PATH}/${folderDate}/service-log.log</file>
        
        <encoder
            class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <Pattern>[%-5level] %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %c{1} - %msg%n</Pattern>
        </encoder>

        <rollingPolicy
            class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- rollover daily and when the file reaches x MegaBytes -->
            <fileNamePattern>${LOG_PATH}/${folderDate}/archived/service-log-%d{yyyy-MM-dd}.%i.log
            </fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy
                class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>50MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
        </rollingPolicy>
    </appender>
    </sift>
    </appender>

		<!-- LOG everything at INFO level -->
		<root level="info">
		  <appender-ref ref="roleSiftingAppender" />
          <appender-ref ref="Console" />
		</root>
		<!-- LOG "com.example.logback.*" at TRACE level -->
		<logger name="com.example.logback" level="trace" additivity="false">
			<appender-ref ref="roleSiftingAppender" />
			<appender-ref ref="Console" />
		</logger>
	
</configuration>
```
Tôi sẽ phân tích một vài biến giá trị trong log file config:

+ Biến giá trị "byDate" -> tạo ra folder chứa log file với format "yyyy-MM-dd"
+ Biến giá trị "bySecond" -> tạo ra folder chứa log file với format "yyyy-MM-dd'T'HHmmss"
+ Biến giá trị "${LOG_PATH}" -> mặc định giá trị sẽ được lấy từ application.yml hoặc application.properties:

![image.png](https://images.viblo.asia/2263b036-5ab7-4ff4-97db-bda06fa1d9f5.png)

Tiếp theo tôi sẽ start service:

* Service started success:

![image.png](https://images.viblo.asia/788d3c4a-6d4a-45fc-b41a-33daa318b2c1.png)

* Kiểm tra thư mục chứa log file:

![image.png](https://images.viblo.asia/719d2239-cb46-402a-9d08-516c424cb07e.png)

![image.png](https://images.viblo.asia/0169b83d-b3d8-43f7-8ea6-c204862c86ad.png)

=> Thư mục chứa log và log file được tạo thành công.

Tiếp theo tôi sẽ tạo một controller và khai báo mapping để kiểm tra xem sau khi thực hiện một hành động(truy cập đường dẫn được khai báo trong controller) -> folder chứa log có tự động sinh ra 1 folder mới hay không?

Tôi tạo 1 class như bên dưới:

![image.png](https://images.viblo.asia/e8e0a103-fddc-42f5-bf1d-37f0851592e9.png)

Tôi truy cập vào đường dẫn vừa được tạo trong controller và kết quả:

![image.png](https://images.viblo.asia/7ba2566e-515b-4f4b-9c5b-1b78b83d50ed.png)

Kiểm tra thư mục chứa log:

![image.png](https://images.viblo.asia/753bec08-1661-489b-ba8b-d693d4116706.png)

Kiểm tra nội dung log file:

![image.png](https://images.viblo.asia/455b7bf8-87f5-4047-b266-439a622a7d06.png)

Các bạn thấy có một vấn đề ở đây, thư mục chứa log không được tự động tạo mới sau khi thực hiện một hành động, hệ thống sẽ tự động cập nhật nội dung log file đến thự mục chứa log cũ đã được tạo trước đó trong lần start service đầu tiên. Để hệ thống tạo ra 1 thư mục chứa log file mới thì cần phải restart service. Nguyên nhân là do trong lần start service đầu tiên hệ thống ghi nhớ đường dẫn chứa log file và trong những lần sau log sinh ra hệ thống không tự động cập nhật lại theo thời gian thực.

Tới đây tôi sẽ giải quyết vấn đề bằng việc sử dụng SiftingAppender trong logback:

```xml
    <appender name="roleSiftingAppender" class="ch.qos.logback.classic.sift.SiftingAppender">
	<discriminator>
        <key>folderDate</key>
        <defaultValue>${bySecond}</defaultValue>
    </discriminator>
    <sift>
    <appender name="RollingFile"
        class="ch.qos.logback.core.rolling.RollingFileAppender">
        
        <file>${LOG_PATH}/${folderDate}/service-log.log</file>
        
        <encoder
            class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <Pattern>[%-5level] %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %c{1} - %msg%n</Pattern>
        </encoder>

        <rollingPolicy
            class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- rollover daily and when the file reaches x MegaBytes -->
            <fileNamePattern>${LOG_PATH}/${folderDate}/archived/service-log-%d{yyyy-MM-dd}.%i.log
            </fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy
                class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>50MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
        </rollingPolicy>
    </appender>
    </sift>
    </appender>
```

Trong tag <discriminator> có 2 tag:
+ Tag <key> chứa tên biến, tại đây tôi để tên biến là "folderDate"
+ Tag  <defaultValue> chứa giá trị tên thư mục chứa log. chúng ta cần cập nhật giá trị này theo thời gian thực mỗi lần thực hiện 1 hành động

Đế cập nhật giá trị tag  <defaultValue> tôi sẽ tạo thêm 1 class implement Filter, mục đích là để bắt lấy các hành động.
    
![image.png](https://images.viblo.asia/f27b5b2f-82ff-4750-8c52-40a265aabb0b.png)   
    
Trong class filter tôi sử dụng hàm "doFilter()" để bắt các hành động. Trong hàm "doFilter()" tôi sẽ lấy giá trị thời gian thực và dùng "MDC" để update lại giá trị cho tên thư mục chứa log với tên biến giá trị là "${folderDate}"
    
Khai báo filter class này trong class khởi động "LogBackdemoApplication":
    
![image.png](https://images.viblo.asia/4713b719-91b3-457d-a98e-ac8f39084a0e.png)    
    
Tôi sẽ restart service và kiểm tra lại:
    
* Cho lần đầu start service:
    
![image.png](https://images.viblo.asia/ae431149-c1ac-4fdb-b284-d96bcb068877.png)
    
![image.png](https://images.viblo.asia/33cbeb6e-9a33-477c-8e0b-b89a8329c11a.png)
    
* Cho lần thứ 2 khi thử truy cập đường dẫn khai báo trong controller:
    
![image.png](https://images.viblo.asia/0c83e1ed-ecbf-4e91-bd30-f7074494ae71.png)
    
![image.png](https://images.viblo.asia/f8199e8d-4931-4b7b-b8a1-f06a272f5ffe.png)
    
![image.png](https://images.viblo.asia/8c5026ea-76d5-4f91-84c6-827c59c8a995.png)
    
Như vậy, vấn đề đã được giải quyết. Với cách này có thể tạo thư mục chứa log theo thời gian thực. Trong thực tế có thể áp dụng phương pháp này để mỗi ngày có thể tự tạo thư mục chứa log theo thời gian thực, nếu muốn tạo thư mục chứa log theo định dạng "yyyy-MM-dd" chỉ cần sử dụng biến giá trị "${byDate}" thay vì "${bySecond}".