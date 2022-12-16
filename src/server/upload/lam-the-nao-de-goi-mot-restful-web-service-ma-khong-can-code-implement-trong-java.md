Trong Java để gọi một Restful web service, chúng ta có thể sử dụng lớp [java.net](https://gpcoder.com/5942-tao-ung-dung-java-restful-client-khong-su-dung-3rd-party-libraries/) để gửi request và nhận response từ server gửi về  theo các bước sau:

* Tạo 1 java.net.URL object.
* Mở HttpURLConnection từ URL trên.
* Set các Request property cần thiết.
* Gửi Request data lên server (nếu có).
* Nhận Response từ server gửi về (nếu có).

Trong các dự án thực tế người ta thường ít sử dụng cách này do viết khá dài dòng và phức tạp. Thay vào đó, người ta sử dụng các thư viện rất đơn giản và hiệu quả để tạo ứng dụng Java RESTful Client như [Jersey client](https://gpcoder.com/5728-rest-web-service-tao-ung-dung-java-restful-client-voi-jersey-client-2-x/), [OkHttp](https://gpcoder.com/5903-tao-ung-dung-java-restful-client-voi-thu-vien-okhttp/), [Retrofit](https://gpcoder.com/5911-tao-ung-dung-java-restful-client-voi-thu-vien-retrofit/), .... Với các thư viện này, chúng ta cũng cần phải implement một số bước để xử lý kết quả từ server gửi về. Một ý tưởng khá là hay, mới mẻ và dễ dàng sử dụng trong ứng dụng Restful client là không cần phải implement bất kỳ dòng code nào, chúng ta chỉ việc định các các request và response tương ứng và phần còn lại, thư viện này sẽ làm việc giúp chúng ta. Thư viện mà tôi muốn giới thiệu với các bạn đó chính là **Feign**.

# Feign là gì?

[Feign](https://github.com/OpenFeign/feign/) là một HTTP client cho Java, được phát triển bởi Netflix. Mục tiêu của Fiegn là giúp đơn giản hóa HTTP API Client.

Tương tự với các thư viện khác, Feign giúp bạn dễ dàng xử lý dữ liệu JSON hoặc XML sau đó phân tích cú pháp thành Plain Old Java Objects (POJOs). Tất cả các yêu cầu GET, POST, PUT, và DELETE đều có thể được thực thi.

Feign được xây dựng dựa trên một số thư viện mạnh mẽ và công cụ khác để xử lý các request/ response trên mạng bao gồm OkHttp, JAX-RS, Gson, Jackson, JAXB, Ribbon, Hystrix, SOAP, … Các bạn xem thêm các thư viện khác: https://mvnrepository.com/artifact/io.github.openfeign

Feign hỗ trợ một số tính năng mạnh mẽ khác như: Error Handling, Retry, hỗ rợ default method, static method với interface trong java 8.

# Sử dụng Feign như thế nào?

Ý tưởng của Feign tương tự như Retrofit là sử dụng interface và các annotation để định nghĩa các phương thức request đến API. Với Retrofit, chúng ta còn gặp một chút phiền phức khi phải gọi xử lý Call<Respone>. Sử dụng Feign chúng ta sẽ không thấy sự khác biệt giữa call các method trong interface thông thường và call thông qua Feign.

Để sử dụng Feign chúng ta thực hiện các bước sau:

* Một class object tương ứng với JSON/ XML data.
* Một interface dùng để định nghĩa các các phương thức request đến API.
* Sử dụng Annotations để mô tả yêu cầu HTTP.
* Tạo một Feign.builder() để khởi tạo các phương thức trong interface đã được định nghĩa.
    
## Các Annotations để mô tả yêu cầu HTTP
    
**Request method**

Mỗi phương thức phải có Annotation HTTP cung cấp request method và URL. Feign sử dụng @RequestLine để mô tả các thông tin này.

```
@RequestLine("GET /api/v1/users?sort=desc")
List<User> getUsers();
```
    
**Header manipulation**

Chúng ta có thể set thông tin static header bằng cách sử dụng annotation @Header ở mức method.
    
```
@Headers({
    "Cache-Control: max-age=640000",
    "Accept: application/vnd.github.v3.full+json",
    "User-Agent: Retrofit-Sample-App"
})
@RequestLine("GET /api/v1/users?sort=desc")
List<User> getUsers();
 
@RequestLine("DELETE /api/v1/users/{id}")
@Headers("Authentication: Bearer {token}")
void deleteUser(@Param("id") int id, @Param("token") String token);
```

Đối với các kết hợp tham số truy vấn phức tạp, có thể sử dụng @HeaderMap.

```
@RequestLine("GET /api/v1/users?sort=desc")
List<User> getUsers(@HeaderMap Map<String, String> headers);
```

**Url manipulation**
    
URL request có thể được cập nhật tự động bằng cách sử dụng các khối thay thế và tham số trên phương thức.

Chúng ta có thể sử dụng URL 1 cách động dựa vào biến truyền vào, bằng cách sử dụng anotation @Path.
    
```
@RequestLine("GET /api/v1/users/{id}")
User getUser(@Path("id") int userId);
```
    
Đối với các kết hợp tham số truy vấn phức tạp, có thể sử dụng @QueryMap.
    
```
@RequestLine("GET /api/v1/users?page=1&limit=10&sortBy=createdAt&order=desc")
List<User> getUsers(@QueryMap Map<String, String> options);

```
    
**Request body**
    
Một đối tượng có thể được chỉ định để sử dụng làm phần thân yêu cầu HTTP với Annotation @Body.
    
```
@RequestLine("POST /api/v1/users")
@Headers("Content-Type: application/json")
@Body("%7B\"username\": \"{gpcoder}\", \"password\": \"{gpcoder}\"%7D")
Call<User> createUser(@Body User user);
```

**Form encoded and Multipart**
    
Để gửi dữ liệu form: application/x-www-form-urlencoded và multipart/form-data chúng ta cần sử dụng thêm thư viện feign-form.

Chúng ta cần cung cấp Content-Type trong @Headers và field name trong @Field.
    
```
@RequestLine("POST /api/v1/auth")
@Headers("Content-Type: application/x-www-form-urlencoded")
Call<String> getToken(@Field("username") String username, @Field("password") String password);
```

Các yêu cầu multipart được sử dụng khi @Multipart xuất hiện trên phương thức. Các phần được khai báo bằng cách sử dụng @Part. @Multipart thường được sử dụng để truyền tải file.
    
```
@Multipart
@POST("/api/v1/files/upload")
Call<String> uploadFile(@Part("uploadFile") RequestBody uploadFile, @Part("description") RequestBody description);
 
@RequestLine("POST /send_photo")
Headers("Content-Type: multipart/form-data")
void sendPhoto (@Param("isPublic") Boolean isPublic, @Param("photo") FormData photo);
```
    
# Ví dụ CRUD Restful Client với Feign
    
## Tạo project
    
Tạo maven project và khai báo dependency sau trong file pom.xml.
    
```
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
 
    <groupId>com.gpcoder</groupId>
    <artifactId>RestfulClientWithFeignExample</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>jar</packaging>
 
    <name>RestfulClientWithFeignExample</name>
    <url>http://maven.apache.org</url>
 
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <lombok.version>1.16.20</lombok.version>
    </properties>
 
    <dependencies>
        <!-- https://mvnrepository.com/artifact/io.github.openfeign/feign-okhttp -->
        <dependency>
            <groupId>io.github.openfeign</groupId>
            <artifactId>feign-okhttp</artifactId>
            <version>10.2.3</version>
        </dependency>
 
        <!-- https://mvnrepository.com/artifact/io.github.openfeign/feign-gson -->
        <dependency>
            <groupId>io.github.openfeign</groupId>
            <artifactId>feign-gson</artifactId>
            <version>10.2.3</version>
        </dependency>
 
        <!-- https://mvnrepository.com/artifact/io.github.openfeign/feign-slf4j -->
        <dependency>
            <groupId>io.github.openfeign</groupId>
            <artifactId>feign-slf4j</artifactId>
            <version>10.2.3</version>
        </dependency>
 
        <!-- Support for encoding application/x-www-form-urlencoded and multipart/form-data form -->
        <!-- https://mvnrepository.com/artifact/io.github.openfeign.form/feign-form -->
        <dependency>
            <groupId>io.github.openfeign.form</groupId>
            <artifactId>feign-form</artifactId>
            <version>3.8.0</version>
        </dependency>
 
        <!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>${lombok.version}</version>
            <scope>provided</scope>
        </dependency>
 
    </dependencies>
</project>
```
    
Trong project này, tôi sử dụng thư viện gson để convert request/ response data giữa client và server.
    
## Tạo CRUD Restful Client với Feign
    
Trong ví dụ này, chúng ta sẽ gọi lại các Restful API chúng ta đã tạo ở bài viết trước “[JWT – Token-based Authentication trong Jersey 2.x](https://gpcoder.com/5883-rest-web-service-jwt-token-based-authentication-trong-jersey-2-x/)“.

Đầu tiên, chúng ta cần gọi API /auth để lấy token và sau đó chúng ta sẽ attach token này vào mỗi request để truy cập resource.

AuthService.java
```
package com.gpcoder.service;
 
import feign.Headers;
import feign.Param;
import feign.RequestLine;
 
public interface AuthService {
 
    @RequestLine("POST /auth")
    @Headers({ 
        "Accept: application/json; charset=utf-8", 
        "Content-Type: application/x-www-form-urlencoded" })
    String getToken(@Param("username") String username, @Param("password") String password);
}
```
    
OrderService.java

```
package com.gpcoder.service;
 
import java.util.ArrayList;
import java.util.List;
 
import com.gpcoder.model.Order;
 
import feign.Headers;
import feign.Param;
import feign.RequestLine;
 
@Headers({
    "Accept: application/json; charset=utf-8",
    "Content-Type: application/json" })
public interface OrderService {
 
    @RequestLine("GET /orders/{id}")
    String getOrder(@Param("id") int id);
 
    @RequestLine("POST /orders")
    String createOrder(Order order);
 
    @RequestLine("PUT /orders")
    String updateOrder(Order order);
 
    @RequestLine("DELETE /orders/{id}")
    String deleteOrder(@Param("id") int id);
 
    default List<String> getOrders(int... ids) {
        List<String> orders = new ArrayList<>();
        for (int id : ids) {
            orders.add(this.getOrder(id));
        }
        return orders;
    }
}
```
    
Tương tự Retrofit, chúng ta có thể sử dụng Interceptor – một tính năng của OkHttp để tự động thêm Authentication Token vào mỗi request, chúng ta không cần thêm nó một cách thủ công trong từng request.

Có một vài cách để gửi Authentication Header token lên server: sử dụng @Header, tạo custom Target, sử dụng Interceptor của Feign, sử dụng Interceptor của OkHttp.

Ví dụ bên dưới sử dụng 2 Interceptor:

* AuthInterceptor : thêm Token vào mỗi request.
* LoggingInterceptor : log trước khi gửi request và sau khi nhận response.

AuthInterceptor.java
    
```
package com.gpcoder.interceptor;
 
import java.io.IOException;
 
import com.gpcoder.helper.FeignClientCreator;
import com.gpcoder.service.AuthService;
 
import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;
 
public class AuthInterceptor implements Interceptor {
     
    private static String token = null;
 
    @Override
    public Response intercept(Chain chain) throws IOException {
        /*
         * chain.request() returns original request that you can work with(modify,
         * rewrite)
         */
        Request originalRequest = chain.request();
 
        // Here we can rewrite the request
        // We add an Authorization header if the request is not an authorize request and already had a token
        Request authRequest = originalRequest;
        if (!originalRequest.url().toString().contains("/auth") && getToken() != null) {
            authRequest = originalRequest.newBuilder()
                    .header("Authorization", "Bearer " + getToken())
                    .build();
        }
         
        /*
         * chain.proceed(request) is the call which will initiate the HTTP work. This
         * call invokes the request and returns the response as per the request.
         */
        Response response = chain.proceed(authRequest);
         
        // Here we can rewrite/modify the response
         
        return response;
    }
 
    private String getToken() throws IOException {
        if (token != null) {
            return token;
        }
 
        // Create an implementation of the API endpoints defined by the service interface
        AuthService authService = FeignClientCreator.getService(AuthService.class);
 
        // Sends a request to a webserver and return its response
        return authService.getToken("gpcoder", "gpcoder");
    }
}
```
    
Tương tự chúng ta sẽ tạo LoggingInterceptor:

LoggingInterceptor.java
    
```
package com.gpcoder.interceptor;
 
import java.io.IOException;
 
import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;
 
public class LoggingInterceptor implements Interceptor {
    @Override
    public Response intercept(Interceptor.Chain chain) throws IOException {
        Request request = chain.request();
 
        long t1 = System.nanoTime();
        System.out.println(
                String.format("Sending request %s on %s%n%s", request.url(), chain.connection(), request.headers()));
 
        Response response = chain.proceed(request);
 
        long t2 = System.nanoTime();
        System.out.println(String.format("Received response for %s in %.1fms%n%s", response.request().url(),
                (t2 - t1) / 1e6d, response.headers()));
 
        return response;
    }
}
```
    
Để sử dụng Interceptor, chúng ta cần đăng ký với Client thông qua phương thức addInterceptor() hoặc addNetworkInterceptor(). Chương trình bên dưới, tôi đăng ký AuthInterceptor ở mức Application và LoggingInterceptor cho cả 2 mức Application và Network.

Chúng ta sẽ tạo một lớp hỗ trợ cấu hình Feign, đăng ký các Interceptor và tạo instance của Feign service.

FeignClientCreator.java
    
```
package com.gpcoder.helper;
 
import com.gpcoder.interceptor.AuthInterceptor;
import com.gpcoder.interceptor.LoggingInterceptor;
import com.gpcoder.service.OrderService;
 
import feign.Feign;
import feign.Logger;
import feign.form.FormEncoder;
import feign.gson.GsonDecoder;
import feign.gson.GsonEncoder;
import feign.okhttp.OkHttpClient;
import feign.slf4j.Slf4jLogger;
 
public class FeignClientCreator {
 
    public static final String BASE_URL = "http://localhost:8080/RestfulWebServiceExample/rest/";
     
    public static <T> T getService(Class<T> clazz) {    
        okhttp3.OkHttpClient okHttpClient = new okhttp3.OkHttpClient.Builder()
                .addInterceptor(new LoggingInterceptor())
                .addInterceptor(new AuthInterceptor())
                .addNetworkInterceptor(new LoggingInterceptor())
                .build();
         
        OkHttpClient feignOkHttp = new OkHttpClient(okHttpClient);
         
        return Feign.builder()
                  .client(feignOkHttp)
                  .encoder(new FormEncoder(new GsonEncoder()))
                  .decoder(new GsonDecoder())
                  .logger(new Slf4jLogger(clazz))
                  .logLevel(Logger.Level.FULL)
                  .target(clazz, BASE_URL);
    }
}
```
    
Tiếp theo chúng ta sẽ sử dụng Feign service để call các API.

FeignClientExample.java
    
```
package com.gpcoder;
 
import java.io.IOException;
 
import com.gpcoder.helper.FeignClientCreator;
import com.gpcoder.model.Order;
import com.gpcoder.service.OrderService;
 
public class FeignClientExample {
 
    private static OrderService orderService;
 
    public static void main(String[] args) throws IOException {
        orderService = FeignClientCreator.getOrderService(OrderService.class);
 
        createOrder();
        retrieveOrder();
        updateOrder();
        deleteOrder();
        retrieveOrders();
    }
 
    /**
     * @POST http://localhost:8080/RestfulWebServiceExample/rest/orders
     */
    private static void createOrder() throws IOException {
        System.out.println("createOrder: " + orderService.createOrder(new Order()));
    }
 
    /**
     * @GET http://localhost:8080/RestfulWebServiceExample/rest/orders/1
     */
    private static void retrieveOrder() throws IOException {
        System.out.println("retrieveOrder: " + orderService.getOrder(1));
    }
 
    /**
     * @PUT http://localhost:8080/RestfulWebServiceExample/rest/orders
     */
    private static void updateOrder() throws IOException {
        System.out.println("updateOrder: " + orderService.updateOrder(new Order()));
    }
 
    /**
     * @DELETE http://localhost:8080/RestfulWebServiceExample/rest/orders/1
     */
    private static void deleteOrder() throws IOException {
        System.out.println("deleteOrder: " + orderService.deleteOrder(1));
    }
 
    private static void retrieveOrders() {
        System.out.println("retrieveOrders: " + orderService.getOrders(1, 2));
    }
}
```
    
Như bạn thấy, Feign là một thư viện rất mạnh mẽ nhưng rất đơn giản để sử dụng. Chúng ta có thể dễ dàng tạo một restful client chỉ với vài dòng config trong interface, mọi việc còn lại đều được Feign xử lý giúp chúng ta.
    
Giải thích dài dòng vậy, nhưng cách khai báo và sử dụng chỉ gói gọn chủ yếu trong 2 class sau:
    
![](https://images.viblo.asia/b9f64dc0-956b-4dc6-985d-a548563f753b.png)
    
![](https://images.viblo.asia/6ebd1ccd-cf4a-4b6d-9dd7-6352e180a773.png)
    
Link bài viết gốc: https://gpcoder.com/5922-gioi-thieu-feign-tao-ung-dung-java-restful-client-khong-can-code-implement/