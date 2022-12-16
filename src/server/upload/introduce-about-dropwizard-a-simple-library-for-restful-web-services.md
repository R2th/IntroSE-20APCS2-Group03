Mình đang tham gia một dự RESTful API khách hàng chọn Dropwizard để phát triển, nó khá lạ lẫm với chúng ta. Tìm hiểu trên github hay trang chủ cũng chỉ có thông tin cơ bản.
Github: https://github.com/dropwizard/dropwizard
Doc: https://www.dropwizard.io
Nhưng trải qua thời gian nghiên cứu và làm mình nhận ra những điểm rất thú vị của framework này. 

**1. Tản mạn**
Dropwizard đang trong quá trình phát triển và hoàn thiện rất mạnh mẽ, hiện nó đang ở version 1.3.5. Thực ra gọi nó là 1 framework cũng không đúng mà 1 library thì cũng không. Nó đứng giữa 2 khái niệm này. Mục đích nó hướng tới là giúp bạn build 1 Java web application nhanh và performace tốt nhất. Nó bao gồm rất nhiều module được đánh giá tốt tại thời điểm hiện tại. Nó tạo ra 1 công cụ hoàn chỉnh cho việc phát triển RESTful service hoặc microservice. 

**2. Thành phần chính của Dropwizard.**
- HTTP build in với Jetty: đây là thành phần không thể thiếu với bất kì 1 web application nào. Jetty đã được chứng mình về độ tin cậy và performance. Khi bạn start ứng dụng thông qua hàm main, Jetty server sẽ được tự động start. Việc chạy ứng dụng theo 1 cách đơn giản sẽ loại bỏ 1 số phần ko được yêu thích thường có của Java application (no PermGen issues, no application server configuration and maintenance, no arcane deployment tools, no class loader troubles, no hidden application logs, no trying to tune a single garbage collector to work with multiple application workloads). Nhờ đó bạn dễ dàng control ứng dụng thông qua Unix shell. 
Tham khảo https://www.eclipse.org/jetty/

- RESTful với Jeysey: được implement theo chuẩn JAX-RS. Không có library nào đánh bại được nó về khía cạnh feature và performance. Có thể tìm hiểu thêm tại:https://jersey.github.io/ 

- Json với jackson: đây là lib mạnh mẽ giúp bạn xử lý những vấn đề liên quan đến json.

- Hibernate: cái này khỏi phải nói bởi nó đã quá phổ biến và nổi tiếng
 
- Metrics: đây là công cụ giúp bạn thống kê và tối ưu hệ thống. Nó đo được thời gian chạy của từng Rest API
  
- Joda Time: giúp bạn xử lý vấn đề liên quan đến date và time
 
- Logback: xử lý log
Và còn nhiều thứ khác nữa, tham khảo tại: https://www.dropwizard.io/1.3.5/docs/getting-started.html#overview

**3. Cách setup 1 project với maven.**
Tôi khuyên bạn nên dùng maven, nó support việc tạo 1 template project, chỉ cần làm theo các bước:
a. Create a project using dropwizard-archetype:
`mvn archetype:generate -DarchetypeGroupId=io.dropwizard.archetypes -DarchetypeArtifactId=java-simple -DarchetypeVersion=[REPLACE WITH A VALID DROPWIZARD VERSION]`
b. Project được tạo ra sẽ có cấu trúc thư mục giống như sau:
![](https://images.viblo.asia/d8dd17fa-e949-485f-a3f3-733708fd1d90.png)

Đây là cấu trúc không bắt buộc, có nghĩa bạn có thể thay đổi tùy theo project của bạn. Tuy nhiên nó cũng rất tốt bởi thể hiện được 1 số thành phần cốt lõi phải có trong 1 project Dropzirad đó là:
- auth: chứa class cho phần xử lý xác thực
- filter: chứa class filter, bất cứ web application nào đều có
- resource: chứa Rest Controller
- health: chứa HealthCheck class
- views: chứa phần xử lý cho giao diện

Cách tạo 1 Configuration file: dropwizard xử dụng file yaml để cấu hình, file đó sẽ được map sang Java Object tương ứng, class này bắt buộc phải kế thừa từ Configuration.
Ví dụ: bạn có class:
```
public class HelloWorldConfiguration extends Configuration {
    
    private String defaultName = "";

    @JsonProperty
    public void setDefaultName(String name) {
        this.defaultName = name;
    }
}
```

thì trong file yaml bạn cũng phải có tham số tương ứng dạng:
`defaultName: Stranger`

Cách tạo 1 Application class. Đây là class kế thừa từ Application class, nó chưa làm main cũng là điểm chạy đầu tiên vào 1 ứng dụng. Cú pháp như sau:
```
package com.example.helloworld;

import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import com.example.helloworld.resources.HelloWorldResource;
import com.example.helloworld.health.TemplateHealthCheck;

public class HelloWorldApplication extends Application<HelloWorldConfiguration> {
    public static void main(String[] args) throws Exception {
        new HelloWorldApplication().run(args);
    }

    @Override
    public String getName() {
        return "hello-world";
    }

    @Override
    public void initialize(Bootstrap<HelloWorldConfiguration> bootstrap) {
        // nothing to do yet
    }

    @Override
    public void run(HelloWorldConfiguration configuration,
                    Environment environment) {
        // nothing to do yet
    }
}
```
Hàm initialize sẽ được gọi trước khi hàm run được chạy.

**4. Cách chạy ứng dụng**
Sau khi build ứng dụng của bạn thành file jar, việc chạy trở lên đơn giản bằng lệnh:
***java -jar target/hello-world-0.0.1-SNAPSHOT.jar server hello-world.yml***
Trong đó: 
- target/hello-world-0.0.1-SNAPSHOT.jar: đây là tên gói jar của bạn
- server: là từ khóa giúp Dropwizard sẽ chạy ứng dụng của bạn với 1 HTTP server (Jetty sẽ được chạy)
- hello-world.yml: đây là file cấu hình, chưa những thông tin cấu hình cho hệ thống của bạn: cấu hình Jetty server, cấu hình Hibernate, cấu hình logback ...