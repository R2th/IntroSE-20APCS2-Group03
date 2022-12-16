Trong các bài viết trước, chúng ta đã cùng tìm hiểu cách xây dựng ứng dụng SOAP web service (WS) với JAX-WS. Trong bài này, chúng ta cùng hiểu hiểu cách xây dựng ứng dụng RESTful web service với JAX-RS thông qua thư viện Jersey.

Link bài viết gốc:  https://gpcoder.com/5677-java-web-services-jersey-jax-rs-rest/

## JAX-RS Annotations

Tương tự như JAX-WS, API JAX-RS sử dụng rất nhiều vào các Annotation. Đây chỉ là một đặc tả một tập hợp các interface và Annotation để xây dựng ứng dụng RESTful WS, vì vậy chúng ta cần chọn một implementation cụ thể để sử dụng. Hiện tại, có 2 thư viện phổ biến cài đặt JAX-WS là Jersey và RESTEasy.

Một vài Annotation quan trọng trong JAX-RS:

* **@Path :** xác định đường dẫn (path) để truy cập web service. Annotation @Path có thể được sử dụng ở mức class và method. Ví dụ:
`http(s)://<domain>:(port)/<YourApplicationName>/<UrlPattern in web.xml>/<path>`

* **@PathParam :** inject các giá trị từ URL vào các tham số của phương thức. Mỗi PathParam được phân cách bởi dấu /. Ví dụ: chúng ta có hai PathParam là java và 1.
`http(s)://<domain>:(port)/<YourApplicationName>/<UrlPattern in web.xml>/<path>/post/java/1`

* **@QueryParam :** inject các giá trị từ query string của URL vào các tham số của phương thức. QueryParam được bắt đầu sau dấu ? và được phân cách bởi dấu &. Ví dụ: chúng ta có hai QueryParram là author và page.
`http(s)://<domain>:(port)/<YourApplicationName>/<UrlPattern in web.xml>/<path>/post/java?author=gpcoder&page=2`

* **@FormParam :** inject các giá trị từ HTML form vào các tham số của phương thức.
* **@Produces** : xác định kiểu dữ liệu trả về (response).
* **@Consumes :** xác định kiểu dữ liệu gửi yêu cầu (request).
@Produces và @Consumes chấp nhận đối số là các chuỗi javax.ws.rs.core.MediaType. Ví dụ: MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.TEXT_PLAIN, …

Ngoài ra, còn một số Annotation tương ứng với hành động của giao thức HTTP:

* **@POST :** chỉ ra rằng phương thức sau chỉ đáp ứng yêu cầu HTTP POST. Nó thường được sử dụng để tạo một tài nguyên trên Server (Create).
* **@GET** : chỉ ra rằng phương thức sau chỉ đáp ứng yêu cầu HTTP GET. Nó thường được sử dụng để truy xuất một tài nguyên (Read).
* **@PUT :** chỉ ra rằng phương thức sau chỉ đáp ứng yêu cầu HTTP PUT. Nó thường được sử dụng để thay đổi trạng thái một tài nguyên hoặc để cập nhật nó (Update).
* **@DELETE** : chỉ ra rằng phương thức sau chỉ đáp ứng yêu cầu HTTP DELETE. Nó thường được sử dụng để huỷ bỏ hoặc xoá một tài nguyên (Delete).
    
## Jersey là gì?
    
Jersey là một thư viện Java mã nguồn mở giúp phát triển ứng dụng RESTful Web service và các ứng dụng REST Client. Jersey cài đặt các đặc tả của JAX-RS.

Jersey cung cấp thư viện thực thi Resful web service trong bộ chứa servlet (Servlet Container).

Khi start ứng dụng, Jersey quét tất cả các class cung cấp tài nguyên REST được đánh dấu bởi các Annotation JAX-RS. Package chứa các class REST phải đăng ký servlet với ứng dụng trong file web.xml.

Ngoài ra, Jersey cũng cung cấp các API để chúng ta có thể dễ dàng viết ứng dụng Client để truy xuất các tài nguyên RESTful web service.
    
## Tạo Jersey project
    
Vào Menu File -> New -> Dynamic Web Project -> Finish.
Nhấn chuột phải lên project vừa tạo -> Configure -> Convert to Maven Project:
    
![](https://images.viblo.asia/aac5c6f2-512d-4702-9697-c32dfd7e0efa.png)
    
Chúng ta có project như sau:
    
![](https://images.viblo.asia/1a1479e2-7351-4a42-a928-34eb1b1ed440.png)
    
Mở file pom.xml và cập nhật lại như sau:

```
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>RestfulWebServiceExample</groupId>
    <artifactId>RestfulWebServiceExample</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>war</packaging>
 
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <jersey.version>1.19.4</jersey.version>
        <lombok.version>1.16.20</lombok.version>
    </properties>
 
    <dependencies>
        <dependency>
            <groupId>com.sun.jersey</groupId>
            <artifactId>jersey-servlet</artifactId>
            <version>${jersey.version}</version>
        </dependency>
        <dependency>
            <groupId>com.sun.jersey</groupId>
            <artifactId>jersey-client</artifactId>
            <version>${jersey.version}</version>
        </dependency>
        <dependency>
            <groupId>com.sun.jersey</groupId>
            <artifactId>jersey-json</artifactId>
            <version>${jersey.version}</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>${lombok.version}</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>
     
    <build>
        <sourceDirectory>src</sourceDirectory>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.0</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-war-plugin</artifactId>
                <version>3.2.1</version>
                <configuration>
                    <warSourceDirectory>WebContent</warSourceDirectory>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```
    
Nhấn chuột phải lên project -> Maven -> Update Project… -> OK.

Tạo file WebContent/WEB-INF/web.xml với nội dung như sau:
    
```
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://xmlns.jcp.org/xml/ns/javaee" xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd" version="4.0">
 
    <display-name>RESTful CRUD Example by gpcoder</display-name>
 
    <servlet>
        <servlet-name>jersey-serlvet</servlet-name>
        <servlet-class>com.sun.jersey.spi.container.servlet.ServletContainer</servlet-class>
        <init-param>
            <param-name>com.sun.jersey.config.property.packages</param-name>
            <param-value>com.gpcoder</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
 
    <servlet-mapping>
        <servlet-name>jersey-serlvet</servlet-name>
        <url-pattern>/rest/*</url-pattern>
    </servlet-mapping>
 
</web-app>
```

## Tạo RESTful Web Service class – CRUD
    
User.java
```
package com.gpcoder;
 
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
 
package com.gpcoder;
 
import javax.xml.bind.annotation.XmlRootElement;
 
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
 
@Data
@AllArgsConstructor
@NoArgsConstructor
@XmlRootElement(name = "user")
public class User {
 
    private Integer id;
    private String username;
}
```
    
UserService.java

```
package com.gpcoder;
 
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
 
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
 
// URI:
// http(s)://<domain>:(port)/<YourApplicationName>/<UrlPattern in web.xml>/<path>
// http://localhost:8080/RestfulWebServiceExample/rest/users
@Path("/users")
public class UserService {
 
    private static final Map<Integer, User> USERS = new HashMap<>();
    static {
        // Create dummy data
        for (int i = 1; i <= 10; i++) { USERS.put(i, new User(i, "dummy " + i)); } } private int generateUniqueId() { return USERS.keySet().stream().max((x1, x2) -> x1 - x2).orElse(0) + 1;
    }
 
    @GET
    @Path("/{id}")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public User get(@PathParam("id") int id) {
        return USERS.getOrDefault(id, new User());
    }
 
    @GET
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public List<User> getAll() {
        return new ArrayList<>(USERS.values());
    }
 
    @POST
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public int insert(User user) {
        Integer id = generateUniqueId();
        user.setId(id);
        USERS.put(id, user);
        return id;
    }
 
    @PUT
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public boolean update(User user) {
        return USERS.put(user.getId(), user) != null;
    }
 
    @DELETE
    @Path("/{id}")
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public boolean delete(@PathParam("id") int id) {
        return USERS.remove(id) != null;
    }
}
```
    
Trong lớp Service trên, chúng ta cung cấp các URI liên quan tới CRUD (Create, Read, Update, Delete).
    
Chạy ứng dụng: Nhấn chuột phải lên Project -> Run As -> Run on Server -> Chọn Tomcat server và project -> Finish
    
Truy cập địa chỉ: http://localhost:8080/RestfulWebServiceExample/rest/users
Chúng ta có kết quả sau:
    
    ![](https://images.viblo.asia/0118583f-15c8-4cc7-9e0e-a337332b9256.png)
    
## Test RESTful Web Service với Postman
    
Trong bài trước, chúng ta đã cùng tìm hiểu [SOAP UI](https://gpcoder.com/5650-gioi-thieu-soap-ui-va-thuc-hien-test-web-service/), một tool rất mạnh mẽ để test Web service bao gồm cả SOAP và REST. Trong bài này, chúng ta sẽ sử dụng một tool khác, rất đơn giản và thường được sử dụng để test RESTful Web Service.

Tải và cài đặt Postman tại địa chỉ: https://www.getpostman.com/downloads/
    
### Test @POST
    
Thêm một user: Địa chỉ resource: PUT http://localhost:8080/RestfulWebServiceExample/rest/users

![](https://images.viblo.asia/9bcc032c-265e-4ec3-a1a5-f169f7414255.png)
    
* (1) : Chọn loại request: POST.
* (2) : Nhập địa chỉ resource.
* (3) : Chọn raw.
* (4) : Chọn data gửi lên có định dạng json.
* (5) : Data gửi lên.
* (6) : Gửi request.
* (7) : Kết quả trả về.
    
### Test @Get
    
Lấy thông tin một user có id là 1 và mong muốn kết quả trả về là xml.

Địa chỉ resource: GET http://localhost:8080/RestfulWebServiceExample/rest/users/1
    
![](https://images.viblo.asia/acc646f8-717d-4e65-939d-79d5bdb4bd25.png)
    
* (1) : Chọn loại request: GET.
* (2) : Nhập địa chỉ resource.
* (3) : Thêm header để chỉ định kết quả trả về là XML (Accept: application/xml). Nếu muốn kết quả trả về là json thì thay đổi giá trị Acccept: application/json.
* (4) : Gửi request.
* (5) : Kết quả trả về.
    
Tương tự, lấy tất cả users:

Địa chỉ resource: GET http://localhost:8080/RestfulWebServiceExample/rest/users
    
![](https://images.viblo.asia/a0267ba9-e04d-4418-ae55-135f8f18be54.png)
    
### Test @PUT
    
Cập nhật một user: Địa chỉ resource: PUT http://localhost:8080/RestfulWebServiceExample/rest/users

Tương tự như @POST, chúng ta thực hiện như sau:
    
![](https://images.viblo.asia/68a2d5d0-21db-4859-83c7-80b6e0ef90d4.png)
    
### Test @DELETE
    
Xóa một user: Địa chỉ resource: DELETE http://localhost:8080/RestfulWebServiceExample/rest/users/1
    
![](https://images.viblo.asia/31148b02-f5ea-4360-9138-460b29dfe6cc.png)
    
Nguồn: https://gpcoder.com/5677-java-web-services-jersey-jax-rs-rest/