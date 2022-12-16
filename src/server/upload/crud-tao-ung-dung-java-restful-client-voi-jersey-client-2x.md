Trong bài trước chúng ta đã cùng tìm hiểu cách [xây dựng ứng dụng Java Restful web service với Jersey 1.x](https://gpcoder.com/5677-java-web-services-jersey-jax-rs-rest). Trong bài này, chúng ta sẽ cùng tìm hiểu cách tạo ra ứng dụng Java Resetful web service với Jersey 2.x và ứng dụng Java RESTful Client sử dụng Jersey Client API để gọi tới RESTful web service.

Link bài viết gốc: https://gpcoder.com/5728-rest-web-service-tao-ung-dung-java-restful-client-voi-jersey-client-2-x/

## Tạo Jersey project

Trong bài trước chúng ta đã tạo Restful web service sử dụng Jersey version 1.x. Trong bài này, chúng ta sẽ tạo Jersey project với version 2.x.

* Jersey 1.x : các thư viện nằm trong package com.sun.
* Jersey 2.x : các thư viện nằm trong package org.glassfish.

Vào Menu File -> New -> Dynamic Web Project -> Finish.

![](https://images.viblo.asia/4b037948-188d-4bd1-89bc-e0c2577e1d7d.png)

Nhấn chuột phải lên project vừa tạo -> Configure -> Convert to Maven Project.

![](https://images.viblo.asia/f8293303-11a0-4789-b354-c7873fb77d61.png)

Nhập thông tin Maven project như sau:

![](https://images.viblo.asia/74797b27-a929-4b35-a110-2b22c7b747b2.png)

Chúng ta có project như sau:

![](https://images.viblo.asia/13b03898-325d-410e-b810-6bbe0096cc4c.png)

Mở file pom.xml và cập nhật lại như sau:

```
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>RestfulWebServiceWithJersey2Example</groupId>
    <artifactId>RestfulWebServiceWithJersey2Example</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>war</packaging>
 
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <jersey.version>2.28</jersey.version>
        <lombok.version>1.16.20</lombok.version>
    </properties>
 
    <dependencies>
        <!-- https://mvnrepository.com/artifact/org.glassfish.jersey.core/jersey-server -->
        <dependency>
            <groupId>org.glassfish.jersey.core</groupId>
            <artifactId>jersey-server</artifactId>
            <version>${jersey.version}</version>
        </dependency>
        <dependency>
            <groupId>org.glassfish.jersey.containers</groupId>
            <artifactId>jersey-container-servlet</artifactId>
            <version>${jersey.version}</version>
        </dependency>
        <dependency>
            <groupId>org.glassfish.jersey.inject</groupId>
            <artifactId>jersey-hk2</artifactId>
            <version>${jersey.version}</version>
        </dependency>
 
        <!-- https://mvnrepository.com/artifact/org.glassfish.jersey.core/jersey-client -->
        <dependency>
            <groupId>org.glassfish.jersey.core</groupId>
            <artifactId>jersey-client</artifactId>
            <version>${jersey.version}</version>
        </dependency>
 
        <!-- https://mvnrepository.com/artifact/org.glassfish.jersey.core/jersey-common -->
        <dependency>
            <groupId>org.glassfish.jersey.core</groupId>
            <artifactId>jersey-common</artifactId>
            <version>${jersey.version}</version>
        </dependency>
 
        <!-- https://mvnrepository.com/artifact/org.glassfish.jersey.media/jersey-media-json-jackson -->
        <dependency>
            <groupId>org.glassfish.jersey.media</groupId>
            <artifactId>jersey-media-json-jackson</artifactId>
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

Lưu ý: đối với project chỉ bao gồm Client (không bao gồm Server), chúng ta chỉ cần 2 thư viện jersey-client và jersey-media-json-jackson.

Sau khi đã cập nhật file pom.xml, chúng ta cần update lại mavent project: Nhấn chuột phải lên project -> Maven -> Update Project… -> OK.

Tạo file jersey config: file này bao gồm config package chứa api và logging.

JerseyServletContainerConfig.java

```
package com.gpcoder.config;
 
import java.util.logging.Level;
import java.util.logging.Logger;
 
import org.glassfish.jersey.logging.LoggingFeature;
//Deployment of a JAX-RS application using @ApplicationPath with Servlet 3.0
//Descriptor-less deployment
import org.glassfish.jersey.server.ResourceConfig;
 
public class JerseyServletContainerConfig extends ResourceConfig {
    public JerseyServletContainerConfig() {
        // if there are more than two packages then separate them with semicolon
        packages("com.gpcoder.api");
        register(new LoggingFeature(Logger.getLogger(LoggingFeature.DEFAULT_LOGGER_NAME), Level.INFO,
                LoggingFeature.Verbosity.PAYLOAD_ANY, 10000));
    }
}
```

Tạo file WebContent/WEB-INF/web.xml với nội dung như sau:

```
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://xmlns.jcp.org/xml/ns/javaee" xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd" version="4.0">
    <display-name>RESTful CRUD Example by gpcoder</display-name>
    <servlet>
        <servlet-name>jersey2-serlvet</servlet-name>
        <servlet-class>org.glassfish.jersey.servlet.ServletContainer</servlet-class>
        <init-param>
            <param-name>javax.ws.rs.Application</param-name>
            <param-value>com.gpcoder.config.JerseyServletContainerConfig</param-value>
        </init-param>
        <init-param>
            <param-name>jersey.config.server.provider.classnames</param-name>
            <param-value>org.glassfish.jersey.jackson.JacksonFeature</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>jersey2-serlvet</servlet-name>
        <url-pattern>/rest/*</url-pattern>
    </servlet-mapping>
</web-app>
```

## Jersey chuyển đổi XML và JSON sang Model Class như thế nào?

Theo mặc định Jersey API sử dụng JAXB là XML-Binding mặc định để chuyển đổi các đối tượng Java thành XML và ngược lại. Chúng ta cần gắn các Annotation của JAXB lên các class model để chú thích cách chuyển đổi cho JAXB. Chi tiết về JAXB Annotation và cách sử dụng các bạn xem lại bài viết: [Hướng dẫn chuyển đổi Java Object sang XML và XML sang Java Object sử dụng Java JAXB](https://gpcoder.com/3220-huong-dan-chuyen-doi-java-object-thanh-xml-va-xml-thanh-java-object-su-dung-java-jaxb/).

![](https://images.viblo.asia/27b569b4-1c77-4387-a482-81d461d15e86.png)

Jersey sử dụng MOXy là JSON-Binding mặc định để Jersey chuyển đổi các đối tượng JSON thành Java và ngược lại. Chúng ta không gần gắn các Annotation lên các class model.

## Tạo Java REST Web service với Jersey2

Tạo data model:

User.java
```
package com.gpcoder.model;
 
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

Tạo Restful CRUD:

UserService.java
```
package com.gpcoder.api;
 
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
 
import com.gpcoder.model.User;
 
// URI:
// http(s)://<domain>:(port)/<YourApplicationName>/<UrlPattern in web.xml>/<path>
// http://localhost:8080/RestfulWebServiceExample/rest/users
@Path("/users")
public class UserCrudService {
 
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
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public boolean delete(@PathParam("id") int id) {
        return USERS.remove(id) != null;
    }
}
```

## Tạo Java REST Client với Jersey2 Client

sonJerseyRestClientExample.java

```
package com.gpcoder.client;
 
import java.io.IOException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
 
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.GenericType;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
 
import org.glassfish.jersey.client.ClientConfig;
import org.glassfish.jersey.logging.LoggingFeature;
 
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gpcoder.model.User;
 
public class UserCrudJerseyRestClientExample {
 
    public static final String API_URL = "http://localhost:8080/RestfulWebServiceExample/rest/users";
 
    public static void main(String[] args) {
        System.out.println("Get User: " + getUser(1));
 
        System.out.println("Get Users: " + getUsers());
 
        Integer insertedId = createUser();
        System.out.println("Created User: " + insertedId);
 
        System.out.println("Updated User: " + updateUser(insertedId));
        System.out.println("After Updated User: " + getUser(insertedId));
 
        System.out.println("Updated User: " + deleteUser(insertedId));
    }
 
    private static Client createJerseyRestClient() {
        ClientConfig clientConfig = new ClientConfig();
 
        // Config logging for client side
        clientConfig.register( //
                new LoggingFeature( //
                        Logger.getLogger(LoggingFeature.DEFAULT_LOGGER_NAME), //
                        Level.INFO, //
                        LoggingFeature.Verbosity.PAYLOAD_ANY, //
                        10000));
 
        return ClientBuilder.newClient(clientConfig);
    }
 
    /**
     * @GET /{id}
     * 
     *      Get one user with the given id
     */
    private static User getUser(Integer id) {
        Client client = createJerseyRestClient();
        WebTarget target = client.target(API_URL).path("" + id);
        return target.request(MediaType.APPLICATION_JSON_TYPE).get(User.class);
    }
 
    /**
     * @GET
     * 
     *      Get all users
     */
    private static List<User> getUsers() {
        Client client = createJerseyRestClient();
        WebTarget target = client.target(API_URL);
        GenericType<List<User>> entity = new GenericType<List<User>>() {
        };
        return target.request(MediaType.APPLICATION_JSON_TYPE).get(entity);
    }
 
    /**
     * @POST
     * 
     *      create user
     */
    private static Integer createUser() {
        User user = new User();
        user.setUsername("gpcoder client");
        String jsonUser = convertToJson(user);
 
        Client client = createJerseyRestClient();
        WebTarget target = client.target(API_URL);
        Response response = target.request(MediaType.APPLICATION_JSON_TYPE)
                .post(Entity.entity(jsonUser, MediaType.APPLICATION_JSON));
        return response.readEntity(Integer.class);
    }
 
    /**
     * @PUT
     * 
     *      Update user
     */
    private static Boolean updateUser(Integer id) {
        User user = getUser(id);
        user.setUsername(user.getUsername() + " edited");
        String jsonUser = convertToJson(user);
 
        Client client = createJerseyRestClient();
        WebTarget target = client.target(API_URL);
        Response response = target.request(MediaType.APPLICATION_JSON_TYPE)
                .put(Entity.entity(jsonUser, MediaType.APPLICATION_JSON));
        return response.readEntity(Boolean.class);
    }
 
    /**
     * @DELETE
     * 
     *      Delete user
     */
    private static Boolean deleteUser(Integer id) {
        Client client = createJerseyRestClient();
        WebTarget target = client.target(API_URL).path("" + id);
        Response response = target.request(MediaType.APPLICATION_JSON_TYPE).delete();
        return response.readEntity(Boolean.class);
    }
 
    private static String convertToJson(User user) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(user);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
```

Ứng dụng Client ở trên gửi và nhận dữ liệu kiểu json. Để gửi dữ liệu và nhận kiểu dữ liệu xml, các bạn đơn giản thay thế MediaType.APPLICATION_JSON sang MediaType.APPLICATION_XML.

Nguồn: https://gpcoder.com/5728-rest-web-service-tao-ung-dung-java-restful-client-voi-jersey-client-2-x/