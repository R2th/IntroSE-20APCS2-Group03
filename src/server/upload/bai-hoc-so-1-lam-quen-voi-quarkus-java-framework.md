## Giới thiệu
Chào các bạn tới với series về Quarkus, ở trong series này chúng ta sẽ tìm hiểu cơ bản về Quarkus thông qua các ví dụ.

Ở bài đầu tiên thì chúng ta sẽ xem qua Quarkus là gì và cách tạo một ứng dụng Quarkus đơn giản.

Do những mặt hạn chế của JVM khi chạy trong các container (tốn bộ nhớ + thời gian khởi động chậm). Quarkus đã ra đời - Một framework được mô tả là Supersonic Subatomic giúp Java application chạy tương thích trong các container trên môi trường cloud.

Sự kết hợp giữa Quarkus framework và GraalVM là một giải pháp thay  thế các ứng dụng Java truyền thống giúp đưa Java gần hơn với các môi trường đám mây.

**Các ưu điểm chính của Quarkus framework**

***Supersonic***

Quarkus hỗ trợ build ứng dụng java thành file native executable giúp thời gian khởi động ứng dụng nhanh đáng kinh ngạc cùng bộ nhớ RSS cực thấp. Bên cạnh đó, nó còn cung cấp hàng ngàn thư viện native.

 Quarkus còn khuyến mãi một số tính năng như Hot Reload và Build Time Boot. 

***Subatomic***

Quarkus được phát triển dựa trên sự kết hợp giữa Imperative programming và Reactive programming.

Quarkus hướng developers đến với Event-Driven Programming.

***Kube-Container***

Quarkus cũng hỗ trợ các công nghệ ảo hóa như Container và Kubernetes rất tốt, cung cấp môi trường build & deployment: scalable, fast, và lightweight.

### 1. Cách tạo một Quarkus project:

Set up môi trường:
* JDK 11+ & Cấu hình biến env JAVA_HOME 
* Inteliji IDEA & Plug-in Maven 3.8.1+

Cách đơn giản nhất để tạo một Quarkus project là sử dụng web-based tool do chính Quarkus cung cấp [Nhấn vào đây](https://code.quarkus.io/)

Tìm thư viện `quarkus-resteasy-reactive`
![image.png](https://images.viblo.asia/3c6657bd-8c02-45d4-9748-51319bac62e2.png)

Sau khi chọn thư viện xong, bạn có thể review lại các extension đã thêm vào project.
![image.png](https://images.viblo.asia/a547fdc7-698d-4a77-bae9-15cf342715b2.png)

Cuối cùng là `Generate your application` để download source code về máy

Dùng IDE để mở project
![image.png](https://images.viblo.asia/9aa6553c-a86b-4f66-abd9-507effc4a8dc.png)

Bên trong thư mục ./getting-started bao gồm:

* Một file pom.xml (khi sử dụng mvn) dùng để quản lý các extension
* Một class org.acme.GreetingResource expose ở đường dẫn /hello
* Một file Dockerfile dùng để chạy ứng dụng Quarkus bằng cả 2 mode là native và jvm trong thư mục src/main/docker
* Một file application.properties dùng để cấu hình cho ứng dụng khi chạy (VD: cấu hình kết nối đến cơ sở dữ liệu)

Thêm vào file src/main/java/org/acme/GreetingResource.java những dòng sau:
```
package org.acme;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/hello")
public class GreetingResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "Hello from RESTEasy Reactive";
    }
}
```

Đây là một REST endpoint đơn giản, nó trả về "Hello from RESTEasy Reactive" cho request ở "localhost:8080/hello".

Chạy ứng dụng bằng câu lệnh sau:
`mvnw quarkus:dev`
![image.png](https://images.viblo.asia/21e86f4f-7556-45c1-ad6d-86b467446f2b.png)

![image.png](https://images.viblo.asia/3b45c108-9224-45ff-8a0e-5e0d365d4301.png)

### 2. Sử Dụng Injection:

Dependency injection trong Quarkus dựa trên ArC (CDI-based dependency injection được thiết kế riêng cho kiến trúc Quarkus)

ArC xuất hiện dưới dạng extension `quarkus-resteasy-react`, mà ta đã thêm vào lúc đầu.

Chỉnh sửa ứng dụng và thêm vào cho nó một companion bean như sau:
![image.png](https://images.viblo.asia/56886027-af25-4787-970d-5fb439028461.png)

Tạo file src/main/java/org/acme/GreetingService.java file với nội dung như sau:
```
package org.acme;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GreetingService {

    public String greeting(String name) {
        return "hello " + name;
    }

}
```

Chỉnh sửa class GreetingResource để inject class GreetingService và tạo một endpoint mới:
```
package org.acme;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/hello")
public class GreetingResource {

    @Inject
    GreetingService service;

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/greeting/{name}")
    public String greeting(String name) {
        return service.greeting(name);
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "hello";
    }
}
```

Chạy lại ứng dụng
![image.png](https://images.viblo.asia/6def2a85-1e8c-4d29-ba05-94ceb86cfaf8.png)

## Kết luận
Vậy là ta đã tìm hiểu xong cơ bản về Quarkus 😁. Quarkus là một framework rất hữu dụng trong việc viết nên một ứng dụng Java với performance cao và cú pháp đơn giản hơn so với Spring framework, và hỗ trợ cho ta rất nhiều thư viện và công cụ hướng tới Cloud Native & Event-Driven Programming.