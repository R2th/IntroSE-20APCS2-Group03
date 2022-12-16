Tiếp theo loạt bài về Cloud design pattern, kì này mình tìm hiểu và giới thiệu về Mô hình gateway định tuyến.

Gateway routing cho phép client gửi request đến nhiều service chỉ sử dụng một endpoint duy nhất. Mô hình này hữu ích khi bạn muốn trình bày nhiều service trên một endpoint và định tuyến đến service phù hợp dựa trên request.

## Phạm vi và vấn đề
Khi một client muốn sử dụng nhiều service, việt thiết lập từng endpoint riêng cho từng service và có một client quản lý các endpoint này làm một thách thức lớn. Ví dụ, ứng dụng e-commerce cung cấp nhiều service như search, reviews, cart, checkout, và lịch sử order. Mỗi service có một API riêng và client phải tương tác, và client phải biết endpoint nào sẽ tương tác với service nào. Khi đó mỗi khi API thay đổ thì client cũng phải thay đổi theo. Nếu bạn muốn nâng cấp chia một service thành hai nhay nhiều service nhỏ hơn thì bạn phải thay đổi source code ở cả hai phía service và client.

## Giải pháp
Đặt một gateway ở trước các service. Sử dụng định tuyến của tầng ứng dụng (tầng 7 trong mô hình 7 tầng networking) định tuyến (lái) các yên cầu đến các service thích hợp.

Với mô hình này, ứng dụng client chỉ cần biết và giao tiếp với một endpoint duy nhất. Khi có nhiều service được hợp nhất, hay một service được phân tách thì client không cần phải có những cập nhật để tiếp tục truy cập service, nó tiếp tục request đến gateway và chỉ có định tuyến phải thay đổi.

Gateway cũng cho phép ta trừu tượng hóa các service từ các client, nó cho phép ta giữ các yêu cầu (kết nối) từ client trong khi thay đổi các service sau gateway.
![](https://images.viblo.asia/11122e18-aebe-4711-8a57-fd908f5c0015.png)

Như vậy mô hình này cũng hữu ích trong việc triển khai ứng dụng, nó cho phép ta quản lý các cập nhật cho người dùng. Khi triển khai một phiên bản mới cho service, ta có thể deploy nó song song với phiên bản hiện tại. Định tuyến cho phép ta kiểm soát phiên bản nào của service được cung cấp cho client, cho phép ta linh hoạt trong việc sử dụng các chiến lược, kế hoạch triển khai như gia tăng phiên bản, song song, hay hoàn chỉnh. Nếu có bất kì vấn đề gì phát sinh sau khi triển khai phiên bản mới đều dễ dàng được loại bỏ bằng cách thay đổi cấu hình ở gateway mà không ảnh hưởng gì đến phía client.

## Những vấn đề và lưu ý
* Gateway service có thể đưa ra lỗi điểm đơn. Đảm bảo rằng nó được thiết kế phù hợp để đáp ứng yêu cầu về tính khả dụng của bạn. Hãy xem xét kĩ khẳ năng chịu lỗi và phục hồi khi triển khai gateway service.
* Gateway service có thể đưa ra lỗi thắt cổ chai. Đảm bảo rằng gateway có perfomance cao để xử lý tải và phù hợp với nhu cầu mở rộng của bạn.
* Thực hiện test chịu tải cho gateway để đảm bảo rằng bạn không đưa ra các lỗi dây chuyền cho service của bạn.
* Gateway định tuyến thuộc tầng 7 (mô hình 7 tầng networking), nên nó có thể xây dựng trên IP, port, header, hay URL.

## Ví dụ
Ta sẽ xây dựng ứng dụng đơn giản với Maven Spring Boot hồm 2 service là BookService, WeatherService, 1 gateway định tuyến sử dụng bộ fileter ZuulFilter để định tuyến cho request đến đúng service phù hợp.

**Cây thư mục ứng dụng đơn giản của ta**

![](https://images.viblo.asia/52c9ebcc-e989-4f61-9bdf-3790b673806e.png)

**Dependency được khai báo Maven config cho 2 service**
```xml
<dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-test</artifactId>
      <scope>test</scope>
    </dependency>
  </dependencies>
  
  <build>
    <plugins>
      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
      </plugin>
    </plugins>
```
**Khai báo dependency cho gateway**
```xml
<dependencies>
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-zuul</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-test</artifactId>
      <scope>test</scope>
    </dependency>
 </dependencies>
```

**Cấu hình service file Aplication.properties**

Book service chạy trên cổng 8090
```
spring.application.name=book

server.port=8090
```
Weather service chạy trên cổng 8091
```
spring.application.name=weather

server.port=8091
```
Gateway routing chạy trên cổng web 8080
```
zuul.routes.books.url=http://localhost:8090 #định tuyến đến book service
zuul.routes.weathers.url=http://localhost:8091 #định tuyến request đến weather service

ribbon.eureka.enabled=false

server.port=8080
```
**Implement ZuulFilter**
```java
public class SimpleFilter extends ZuulFilter {

  private static Logger log = LoggerFactory.getLogger(SimpleFilter.class);

  @Override
  public String filterType() {
    return "pre"; // type mặc định pre-routing, lọc trước khi thực hiện định tuyến.
  }

  @Override
  public int filterOrder() {
    return 1;
  }

  @Override
  public boolean shouldFilter() {
    return true;
  }

  @Override
  public Object run() {
    RequestContext ctx = RequestContext.getCurrentContext();
    HttpServletRequest request = ctx.getRequest();

    log.info(String.format("%s request to %s", request.getMethod(), request.getRequestURL().toString()));

    return null;
  }

}
```
Sau đây là kết quả của bộ lọc gateway định tuyến đến 2 service.
![](https://images.viblo.asia/5e23df69-0289-49bc-9edc-49e51a342a59.png)

**Tài liệu tham khảo**
* [Microsoft doc - Cloud pattens](https://docs.microsoft.com/en-us/azure/architecture/patterns/gateway-routing)
* [Spring guide - Gs routing and filter](https://spring.io/guides/gs/routing-and-filtering)