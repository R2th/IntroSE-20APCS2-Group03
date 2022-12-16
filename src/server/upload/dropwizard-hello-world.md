Dropwizard là một Java framework mã nguồn mở giúp phát triển nhanh các REST API. Nó là một loại hệ sinh thái chứa toàn bộ các dependency như Jersey, Jackson Jetty có thể được đóng gói thành một gói duy nhất hoặc tách ra thành các module riêng biệt. Nếu không sử dụng Dropwizard thì chúng ta phải thu thập các dependency và ta thường gặp phải vấn đề về tải lớn do các phiên bản không khớp giữa các thư viện Java khác nhau. Sử dụng Dropwizard sẽ đảm bảo vấn đề đó được loại bỏ bằng cách pull các gói thư viện bảo đảm và gom chúng vào một gói đơn giản. Ta từng bước tìm hiểu Dropwizard để xây dựng REST API

## Các thư viện bên trong Dropwizard
* **Jersey**: để xây dựng các ứng dụng web RESTful.
* **Jetty**: Dropwizard sử dụng thư viện Jetty HTTP để nhúng HTTP server trực tiếp vào project.
* **Jackson**: giúp cho việc chuyển đổi đối tượng JSON giữa đối tượng tới/từ. Nó cho phép xuất các domain model một cách trực tiếp từ các trú thích JAXB.
* **Hibernate Validator**: một khai báo framework dễ dàng cho việc kiểm tra tính hợp lệ người dùng và tạo ra các thông báo lỗi thân thiện hơn với i18n.
* **Apache HTTPClient**: cho việc tương tác ở cả hai mức thấp và cao với các web service khác.
* **JDBI**: là một cách đơn giản nhất cho việc sử dụng một cơ sở dữ liệu quan hệ với Java.

## Cài đặt Dropwizard với Maven
Khai báo dependency trong file pom.xml của Maven project.
```
<properties>
    <dropwizard.version>1.0.0</dropwizard.version>
</properties>
<dependencies>
    <dependency>
        <groupId>io.dropwizard</groupId>
        <artifactId>dropwizard-core</artifactId>
        <version>${dropwizard.version}</version>
    </dependency>
</dependencies>
```
Thêm các plugin cho việc build và đóng gói dự án là `maven-compiler-plugin`, `maven-shade-plugin`
```
<build>
        <finalName>DropWizardExample-${version}</finalName>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.1</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-shade-plugin</artifactId>
                <version>2.1</version>
                <executions>
                    <execution>
                        <phase>package</phase>
                        <goals>
                            <goal>shade</goal>
                        </goals>
                        <configuration>
                            <transformers>
                                <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                                    <mainClass>com.howtodoinjava.rest.App</mainClass>
                                </transformer>
                                <transformer implementation="org.apache.maven.plugins.shade.resource.ServicesResourceTransformer">
                                </transformer>
                            </transformers>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
```
## Tạo lớp REST Application
Lớp Application là điểm vào cho bất kỳ ứng dụng Dropwizard nào. Nó cần mởi rộng lớp `io.dropwizard.Application` và khai triển các method `initialize(Bootstrap<Configuration>)` và `run(Configuration, Environment)`. Nhiệm vụ của các method này là chuẩn bị môi trường chạy cho ứng dụng.

Để gọi `run()` method, chúng ta cần có method `public static void main(String[] args) {}`, method này sẽ được gọi bởi lệnh java -jar khi chúng ta chạy ứng dụng như là .jar file.

```
package com.howtodoinjava.rest;
 
import io.dropwizard.Application;
import io.dropwizard.Configuration;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
 
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
 
import com.howtodoinjava.rest.controller.EmployeeRESTController;
 
public class App extends Application<Configuration> {
    private static final Logger LOGGER = LoggerFactory.getLogger(App.class);
 
    @Override
    public void initialize(Bootstrap<Configuration> b) {
    }
 
    @Override
    public void run(Configuration c, Environment e) throws Exception {
        LOGGER.info("Registering REST resources");
        e.jersey().register(new EmployeeRESTController(e.getValidator()));
    }
 
    public static void main(String[] args) throws Exception {
        new App().run(args);
    }
}
```

Để thực thi file JAR, chúng ta thêm đối số server vào lệnh khởi chạy HTTP Server đã được nhúng (Jetty) để chạy service của ta.

```
java -jar target\DropWizardExample.jar server
```

Jetty server được nhúng của Dropwizard sẽ sử dụng cổng mặc định là 8080 và 8081. Cổng 8080 được server sử dụng để phân phối các HTTP request tới ứng dụng. Trong khi đó cổng 8081 được sử dụng cho giao diện addmin của Dropwizard.

## Tạo REST Resource và các API
Chúng ta sẽ sử dụng Jersey trong classpath để build các REST API.

```
package com.howtodoinjava.rest.controller;
 
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Set;
 
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
 
import com.howtodoinjava.rest.dao.EmployeeDB;
import com.howtodoinjava.rest.representations.Employee;
 
@Path("/employees")
@Produces(MediaType.APPLICATION_JSON)
public class EmployeeRESTController {
 
    private final Validator validator;
 
    public EmployeeRESTController(Validator validator) {
        this.validator = validator;
    }
 
    @GET
    public Response getEmployees() {
        return Response.ok(EmployeeDB.getEmployees()).build();
    }
 
    @GET
    @Path("/{id}")
    public Response getEmployeeById(@PathParam("id") Integer id) {
        Employee employee = EmployeeDB.getEmployee(id);
        if (employee != null)
            return Response.ok(employee).build();
        else
            return Response.status(Status.NOT_FOUND).build();
    }
 
    @POST
    public Response createEmployee(Employee employee) throws URISyntaxException {
        // validation
        Set<ConstraintViolation<Employee>> violations = validator.validate(employee);
        Employee e = EmployeeDB.getEmployee(employee.getId());
        if (violations.size() > 0) {
            ArrayList<String> validationMessages = new ArrayList<String>();
            for (ConstraintViolation<Employee> violation : violations) {
                validationMessages.add(violation.getPropertyPath().toString() + ": " + violation.getMessage());
            }
            return Response.status(Status.BAD_REQUEST).entity(validationMessages).build();
        }
        if (e != null) {
            EmployeeDB.updateEmployee(employee.getId(), employee);
            return Response.created(new URI("/employees/" + employee.getId()))
                    .build();
        } else
            return Response.status(Status.NOT_FOUND).build();
    }
 
    @PUT
    @Path("/{id}")
    public Response updateEmployeeById(@PathParam("id") Integer id, Employee employee) {
        // validation
        Set<ConstraintViolation<Employee>> violations = validator.validate(employee);
        Employee e = EmployeeDB.getEmployee(employee.getId());
        if (violations.size() > 0) {
            ArrayList<String> validationMessages = new ArrayList<String>();
            for (ConstraintViolation<Employee> violation : violations) {
                validationMessages.add(violation.getPropertyPath().toString() + ": " + violation.getMessage());
            }
            return Response.status(Status.BAD_REQUEST).entity(validationMessages).build();
        }
        if (e != null) {
            employee.setId(id);
            EmployeeDB.updateEmployee(id, employee);
            return Response.ok(employee).build();
        } else
            return Response.status(Status.NOT_FOUND).build();
    }
 
    @DELETE
    @Path("/{id}")
    public Response removeEmployeeById(@PathParam("id") Integer id) {
        Employee employee = EmployeeDB.getEmployee(id);
        if (employee != null) {
            EmployeeDB.removeEmployee(id);
            return Response.ok().build();
        } else
            return Response.status(Status.NOT_FOUND).build();
    }
}
```

Về dữ liệu, để đơn giản ta tạo lớp `EmployeeDB` để lưu trữ vài record employee và cập nhật trong bộ nhớ.

```
package com.howtodoinjava.rest.dao;
 
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
 
import com.howtodoinjava.rest.representations.Employee;
 
public class EmployeeDB {
     
    public static HashMap<Integer, Employee> employees = new HashMap<>();
    static{
        employees.put(1, new Employee(1, "Lokesh", "Gupta", "India"));
        employees.put(2, new Employee(2, "John", "Gruber", "USA"));
        employees.put(3, new Employee(3, "Melcum", "Marshal", "AUS"));
    }
     
    public static List<Employee> getEmployees(){
        return new ArrayList<Employee>(employees.values());
    }
     
    public static Employee getEmployee(Integer id){
        return employees.get(id);
    }
     
    public static void updateEmployee(Integer id, Employee employee){
        employees.put(id, employee);
    }
     
    public static void removeEmployee(Integer id){
        employees.remove(id);
    }
}
```

## Xây dựng Resource
Khi sử dụng `Jersey` và `Jackson` cho phép ta xây dựng tài nguyên là một bean POJO thuần Java. Jackson khởi dựng chuỗi JSON đệ quy theo các phương thức `getter` của mỗi lớp và kiểu trả về của chúng.

```
package com.howtodoinjava.rest.representations;
 
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
 
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;
 
public class Employee {
     
    @NotNull
    private Integer id;
    @NotBlank @Length(min=2, max=255)
    private String firstName;
    @NotBlank @Length(min=2, max=255)
    private String lastName;
    @Pattern(regexp=".+@.+\\.[a-z]+")
    private String email;
     
    public Employee(){
    }
 
    public Employee(Integer id, String firstName, String lastName, String email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
 
    public Integer getId() {
        return id;
    }
 
    public void setId(Integer id) {
        this.id = id;
    }
 
    public String getFirstName() {
        return firstName;
    }
 
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
 
    public String getLastName() {
        return lastName;
    }
 
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
 
    public String getEmail() {
        return email;
    }
 
    public void setEmail(String email) {
        this.email = email;
    }
 
    @Override
    public String toString() {
        return "Emplyee [id=" + id + ", firstName=" + firstName + ", lastName="
                + lastName + ", email=" + email + "]";
    }
}
```

Nếu được yêu cầu trong một số trường hợp, ta có thể ngăn một thuộc tính là một phần của biểu diễn JSON bằng cách thêm chú thích `@JsonIgnore` vào trình getter của nó.

## Xác thực request
Khi chấp nhật các request `PUT` và `POST`, ta cần xác thực nội dung mà người dùng gửi lên trong request body. Dropwizard dùng Hibernate validator cho mục đích này. Việc xác thực yêu cầu theo các bước sau.

### 1. Thêm các trú thích xác nhận trong lớp biểu diễn.
```
@NotNull
private Integer id;
 
@NotBlank @Length(min=2, max=255)
private String firstName;
 
@NotBlank @Length(min=2, max=255)
private String lastName;
 
@Pattern(regexp=".+@.+\\.[a-z]+")
private String email;
```

### 2. Tiêm `Environment.getValidator()` trong REST resource từ Application.
```
@Override
public void run(Configuration c, Environment e) throws Exception
{
    LOGGER.info("Registering REST resources");
    e.jersey().register(new EmployeeRESTController(e.getValidator()));
}
```

### 3. Sử dụng xác nhận trong REST resource.
```
public class EmployeeRESTController {
 
    private final Validator validator;
 
    public EmployeeRESTController(Validator validator) {
        this.validator = validator;
    }
 
    @POST
    public Response createEmployee(Employee employee) throws URISyntaxException
    {
        Set<ConstraintViolation<Employee>> violations = validator.validate(employee);
        Employee e = EmployeeDB.getEmployee(employee.getId());
        if (violations.size() > 0) {
            ArrayList<String> validationMessages = new ArrayList<String>();
            for (ConstraintViolation<Employee> violation : violations) {
                validationMessages.add(violation.getPropertyPath().toString() + ": " + violation.getMessage());
            }
            return Response.status(Status.BAD_REQUEST).entity(validationMessages).build();
        }
         
        //Create Employee code here
    }
}
```

## Build và kiểm tra các REST API
Đóng gói project bằng lệnh sau.
```
> mvn clean package
```

Chạy với Jetty server.
```
> java -jar target\DropWizardExample-0.0.1-SNAPSHOT.jar server
```

Truy cập `URI http://localhost:8080/employees` và xem danh sách employee trả về cùng  các hearder.
![](https://images.viblo.asia/74ae5f17-4847-416d-8e32-f0f7514ea339.png)

Chi tiết employee với id=1.
![](https://images.viblo.asia/9d345411-2910-47a6-8bbe-53eac5216c88.png)
Thực hiện một request lỗi param và xem thông báo lỗi `PUT http://localhost:8080/employees/1`
![](https://images.viblo.asia/d8230f67-fc0d-4fb4-8ba9-29f1dc410004.png)

Giờ thì tạo mới thành công một employee.
![](https://images.viblo.asia/a24da254-475c-4808-9ce6-2e7031c93a4a.png)

## Tài liệu tham khảo
* [Dropwizard](https://www.dropwizard.io/1.3.5/docs/getting-started.html)
* [howtodoinjava.com - Dropwizard tutorial](https://howtodoinjava.com/dropwizard/tutorial-and-hello-world-example/)