# Dropwizard là gì ? 

https://www.dropwizard.io

> Dropwizard is a Java framework for developing ops-friendly, high-performance, RESTful web services

Thân thiện, hiệu năng cao cho các ứng dụng micro services là những mô tả ngắn gọn nhất của Dropwizard. 

```
        <dependency>
            <groupId>io.dropwizard</groupId>
            <artifactId>dropwizard-core</artifactId>
            <version>${dropwizard.version}</version>
        </dependency>
```

Dropwizard cung cấp các java dependencies để sử dụng theo dạng embedded (ứng dụng nhúng). Toàn bộ sẽ được nhúng trong 1 package duy nhất, maven dependency bên trên là 1 ví dụ.

Trong đó sẽ bao gồm một số thành phần như : 

- Embedded Jetty (Jetty for HTTP) :  Bạn không cần sử dụng 1 Servlet Container riêng ( chẳng hạn như Apache Tomcat). Dropwizard đã thực sự có embedded Jetty để làm việc này, giống như embedded Tomcat trong Spring Boot vậy. 
- Jersey for REST (JAX-RS): là một open source framework để phát triển các RESTful Web Services trong Java, sử dụng chuẩn JAX-RS API 
- Jackson for JSON: Thư viện thao tác và làm việc với JSON
- Metrics for metrics: Thư viện hỗ trợ việc monitoring các số liệu trong quá trình vận hành hệ thống, giúp cho việc giám sát và đánh giá tốt hơn khi vận hành hệ thống. 

Và còn một số libraries nữa chẳng hạn như Guava, Logback, Joda Time ..vv

# Setup Dropwizard với maven

Maven được khuyến khích sử dụng trong Dropwizard application, vì vậy demo dưới đây mình cũng sẽ sử dụng maven

Các bước thực hiện : 

1.  Tạo maven project ( sử dụng IDE, maven archetype ..vv)
2.  Tạo file cấu hình `application.yml` và class `HelloWorldConfiguration` với các field sẽ mapping tương ứng với application.yml
3.  Tạo java main application class `HelloWorldApplication` 
4.  Tạo class resource `ApiResource` ( controller) để xử lý các request giữa client <--> server
5.  Đăng ký class `ApiResource` với Jersey Environment (singleton object)
6.  Kiểm thử và demo

### 1. Tạo maven project

-   Tạo maven project sử dụng dropwizard-archetype [dropwizard-archetype](https://github.com/dropwizard/dropwizard/tree/master/dropwizard-archetypes) :
``` 
mvn archetype:generate -DarchetypeGroupId=io.dropwizard.archetypes -DarchetypeArtifactId=java-simple -DarchetypeVersion=[REPLACE WITH A VALID DROPWIZARD VERSION]
```
-  Hoặc với với Intelij 

![](https://images.viblo.asia/3ba93113-8afa-4740-9692-c82c4bf9bfa5.jpg)
![](https://images.viblo.asia/033a1495-e31a-4d30-924c-da99b54b9765.jpg)


### 2. Tạo files cấu hình

Mỗi ứng dụng Dropwizard đều có một subclass kế thừa `io.dropwizard.Configuration`, file này sẽ bao gồm các biến môi trường sẽ được sử dụng trong ứng dụng. 

Tuy nhiên thì những biến môi trường này không được thiết lập tại Java subclass đó. Thay vì vậy, chúng sẽ được mô tả và thiết lập trong file `.yml`. 
Trong quá trình startup application các biến môi trường trong `.yml` sẽ được deserialized sang subclass đó.

Tạo file cấu hình `application.yml` tại root workspace của project. 
``` YML
myConfig: Hello dropwizard

logging:
  level: INFO
```

Tạo class `HelloWorldConfiguration` với field sẽ mapping tương ứng với `application.yml`
``` Java
public class HelloWorldConfiguration extends io.dropwizard.Configuration {

    private String myConfig;

    public String getMyConfig() {
        return myConfig;
    }

    public void setMyConfig(String myConfig) {
        this.myConfig = myConfig;
    }
}
```

Trong đó : 
-   `myConfig` : là các config do bạn định nghĩa để sử dụng trong project
-   `logging` : Tùy biến việc logging trong project, đây là config của Dropwizard. 

Ngoài ra, bạn có thể thiết lập các thông số khác như context path, port, protocal 
``` YML
server:
  type: simple
  applicationContextPath: /
  adminContextPath: /admin
  connector:
    type: http
    port: 8080
```

Tham khảo [Dropwizard Configuration Reference](https://www.dropwizard.io/1.3.2/docs/manual/configuration.html) để xem một số thiết lập khác.

### 3. Tạo Application Class 
Mỗi một ứng dụng Dropwizard thì cũng sẽ có một subclass kế thừa `io.dropwizard.Application`, file này sẽ kết hợp với file cấu hình bên trên (`HelloWorldConfiguration`) , với các thông số đã thiết lập để chạy ứng dụng.

Đây cũng là entry point của ứng dụng vì vậy chúng ta cũng sẽ có một `public static void main(String[] args)` method

``` Java
public class HelloWorldApplication extends io.dropwizard.Application<HelloWorldConfiguration> {

    public static void main(String[] args) throws Exception {
        new HelloWorldApplication().run(args);
    }

    public void run(HelloWorldConfiguration helloWorldConfiguration, Environment environment) throws Exception {
        // register providers , resources, etc ...
    }
}
```
Tạm thời để vậy đã, việc đăng ký `ApiResource` sẽ được thực hiện ở bước 5

### 4. Tạo class Resource / Controller

Giống như Spring MVC, sẽ có các `@Controller` được khai báo để xử lý các request giữa client <---> server. 

Thì với Dropwizard , chúng ta cũng sẽ có các resoures được thực hiện bới Jersey for REST, đó là một open source framework để phát triển các RESTful Web Serviecs, sử dụng chuẩn JAX-RS như mình đã giới thiệu ban đầu.

Tạo class `ApiResource` với các thiết lập như sau :
-   Entry point API : `/api/list`
-   `@Produces` : response data về client theo content type  là `application/json`

``` Java
@Path("/api")
@Produces(MediaType.APPLICATION_JSON)
public class ApiResource {

    @GET
    @Path("/list")
    public Response listAllItems() {
        // generate list items ....
        return Response.ok(itemResponse).build();
    }
}
```
Full source code bạn có thể xem tại [ApiResource.java](https://github.com/manhnv118/dropwizard-sample/blob/master/src/main/java/manhnv/dropwizard/resource/ApiResource.java)

### 5. Đăng ký resource với Jersey Environment

Quay trở lại với application class ở bước 3, mở file `HelloWorldApplication` và đăng ký `ApiResource` như bên dưới :

``` Java
    public void run(HelloWorldConfiguration helloWorldConfiguration, Environment environment) throws Exception {
        // register providers , resources, etc ...
        environment.jersey().register(ApiResource.class);
    }
```

Mục đích của việc này là  add class `ApiResource` như là một component của Jersey , được Jersey quản lý. Nó cũng sẽ được tạo như một singleton component. Vì vậy ApiResource phải có một constructor không tham số (`no-args`)


### 6. Kiểm thử và demo 

Run `HelloWorldApplication.main()` như java application và theo dõi  console log.

Bạn sẽ thấy một lỗi như bên dưới. 

```
usage: java -jar project.jar [-h] [-v] {server,check} ...

positional arguments:
  {server,check}         available commands

named arguments:
  -h, --help             show this help message and exit
  -v, --version          show the application version and exit
```

**Nguyên nhân** :  Dropwizard luôn có 1 tham số khi khởi chạy là `server` , tham số này sẽ là đường dẫn đến file cấu hình `.yml` như đã khai báo ở bước 2

#### Thiết lập param `server application.yml` và chạy lại application một lần nữa. 

Chạy bằng Java command : 
> Yêu cầu : 
> 1. Cấu hình maven plugin như hướng dẫn tại đây [Building Fat JARs](https://www.dropwizard.io/1.3.2/docs/getting-started.html#building-fat-jars)
> 2. Sử dụng command `mvn clean package` để build file .jar trước khi chạy

```
java -jar target/dropwizard-sample-1.0-SNAPSHOT.jar server application.yml

```
Hoặc :

Thiết lập lại Program arguments trên Intelij

![](https://images.viblo.asia/184f330b-b550-4db5-848d-3db84b1840b9.jpg)
![](https://images.viblo.asia/04e9c859-adae-4df1-b53b-9e60e72f4683.jpg)

Save và chạy lại ứng dụng, một khi có output server `Started` như bên dưới, quá trình setup đã hoàn tất.

```
INFO  [2018-05-31 18:43:02,391] org.eclipse.jetty.server.AbstractConnector: Started HelloWorldApplication@2b289ac9{HTTP/1.1,[http/1.1]}{0.0.0.0:8080}
INFO  [2018-05-31 18:43:02,391] org.eclipse.jetty.server.Server: Started @4710ms
```

Giờ thì mở URL để thấy thành quả:  [http://localhost:8080/api/list](http://localhost:8080/api/list)

# Tổng kết

Như vậy là mình đã kết thúc phần hướng dẫn và demo nhỏ về **Xây dựng RESTful Web Service trong Java với Dropwizard framework**

Để tìm hiểu nhiều hơn các bạn có thể xem tài liệu tại :

-   Home page : [https://www.dropwizard.io](https://www.dropwizard.io)
-   Source code demo : [https://github.com/manhnv118/dropwizard-sample](https://github.com/manhnv118/dropwizard-sample)