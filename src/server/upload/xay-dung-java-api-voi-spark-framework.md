### 1. Giới thiệu

Trong bài viết này, tôi sẽ giới thiệu nhanh về Spark framework. Spark framework là framework phát triển nhanh được lấy cảm hứng từ Sinatra framework cho Ruby và được xây dựng xung quanh triết lý biểu thức Java 8 của Lambda, làm cho nó ít chi tiết hơn so với hầu hết các ứng dụng được viết trong các framework Java khác.

Đó là một lựa chọn tốt nếu bạn muốn có trải nghiệm giống như Node.js khi phát triển API web hoặc microservices trong Java. Với Spark, bạn có thể có sẵn một API REST để phân phối JSON trong ít hơn mười dòng mã.

Chúng ta sẽ bắt đầu nhanh chóng với ví dụ “Hello World”, tiếp theo là một API REST đơn giản.

### 2. Maven Dependencies
    
    
2.1. Spark Framework
    
Thêm thư viện Maven sau trong tệp pom.xml của bạn:
```
<dependency>
    <groupId>com.sparkjava</groupId>
    <artifactId>spark-core</artifactId>
    <version>2.5.4</version>
</dependency>
```
        
Bạn có thể tìm thấy phiên bản Spark mới nhất trên [Maven Central](https://mvnrepository.com/artifact/com.sparkjava/spark-core).
    
Để đưa Gson vào dự án của bạn, hãy bao gồm sự phụ thuộc này vào tệp pom.xml của bạn:

```
<dependency>
    <groupId>com.google.code.gson</groupId>
    <artifactId>gson</artifactId>
    <version>2.8.0</version>
</dependency>
```
Bạn có thể tìm thấy phiên bản Gson mới nhất trên [Maven Central](https://mvnrepository.com/artifact/com.google.code.gson/gson).
### 3. Bắt đầu với Spark Framework

3.1. Routes.
    
Web services trong Spark Java được xây dựng trên các routes và bộ xử lý của chúng. Các routes là các yếu tố thiết yếu trong Spark.
Theo tài liệu, mỗi route được tạo thành từ ba phần đơn giản - một động từ, một đường dẫn và một cuộc gọi lại.

VD:

```
get("/your-route-path/", (request, response) -> {
    // your callback code
});
```
        
3.2. Hello World API.
    
Hãy tạo một web service đơn giản có hai routes cho các yêu cầu GET và trả về "Hello" trong respone. Các routes này sử dụng phương thức get, là một phép nhập tĩnh từ lớp spark.Spark:
VD:
```
import static spark.Spark.*;

public class HelloWorldService {
    public static void main(String[] args) {

        get("/hello", (req, res)->"Hello, world");

        get("/hello/:name", (req,res)->{
            return "Hello, "+ req.params(":name");
        });
    }
}
```

* Đối số đầu tiên cho phương thức get là đường dẫn cho route. Route đầu tiên chứa một đường dẫn tĩnh biểu diễn chỉ một URI đơn (“/ hello”).

* Đường dẫn của route thứ hai (“/ hello /: name”) chứa một trình giữ chỗ cho tham số “name”, được biểu thị bằng cách mở đầu tham số bằng
dấu hai chấm (“:”). Route này sẽ được gọi để đáp ứng yêu cầu GET đối với URI chẳng hạn như “/ hello / Joe” và “/ hello / Mary”.

* Đối số thứ hai cho phương thức get là một biểu thức lambda đưa ra một **functional programming**  cho framework này.
        
3.3. Kiểm tra API Hello World.
   
Sau khi chạy class HelloWorldService như một lớp Java bình thường, bạn sẽ có thể truy cập dịch vụ trên cổng mặc định của nó là 4567 bằng
cách sử dụng các route được định nghĩa với phương thức get ở trên.
       
Hãy kiểm tra request và response cho route đầu tiên:

**Request:**
>GET http://localhost:4567/hello

**Response:**
>Hello, world
       
Hãy kiểm tra route thứ hai, chuyển tham số tên trong đường dẫn của nó:

**Request:**
>GET http://localhost:4567/hello/framgia

**Response:**
>Hello, framgia
      
### 4. Thiết kế một RESTful Service

Chúng ta sẽ thiết kế một dịch vụ web REST đơn giản cho đối tượng User sau:

```
public class User {
    private String id;
    private String firstName;
    private String lastName;
    private String email;

    // constructors, getters and setters
}
```

4.1. Routes.

Hãy liệt kê các route tạo nên API :
1. GET /users — Lấy danh sách tất cả người dùng
2. GET /users/:id — Lấy user với tham số id
3. POST /users/:id — thêm mới một user
4. PUT /users/:id — cập nhật một user
5. OPTIONS /users/:id — kiểm tra một user tồn tại với id
6. DELETE /users/:id — xóa một user
4.2. Khời tạo User Service.

Dưới đây là interface UserService khai báo các hoạt động CRUD cho thực thể  User:

```
public interface UserService {
   public void addUser (User user);
   public Collection<User> getUsers ();
   public User getUser (String id);
   public User editUser (User user) 
     throws UserException;
   public void deleteUser (String id);
   public boolean userExist (String id);
}
```

4.3. Cấu trúc JSON Response 

Dưới đây là cấu trúc JSON của các response được sử dụng trong REST service của chúng ta:

```
{
   status: <STATUS>
   message: <TEXT-MESSAGE>
   data: <JSON-OBJECT>
}
```

Giá trị trường status có thể là SUCCESS hoặc ERROR. Trường data sẽ chứa biểu diễn JSON của dữ liệu trả về, chẳng hạn như User hoặc 
bộ sưu tập Users.

Khi không có dữ liệu được trả lại hoặc nếu trạng thái là ERROR, sẽ điền vào trường thông báo để truyền đạt lý do cho lỗi hoặc thiếu
dữ liệu trả về.

Hãy đại diện cho cấu trúc JSON ở trên bằng cách sử dụng một lớp Java:
```
public class StandardResponse {

    private StatusResponse status;
    private String message;
    private JsonElement data;

    public StandardResponse(StatusResponse status) {

    }
    public StandardResponse(StatusResponse status, String message) {

    }
    public StandardResponse(StatusResponse status, JsonElement data) {

    }

    // getters and setters
}

public enum StatusResponse {
    SUCCESS ("Success"),
    ERROR ("Error");

    private String status;       
    // constructors, getters
}
```
Trong đó StatusResponse là một enum.

### 5. Triển khai các RESTful Service

5.1. Khởi tạo các Controller

```
public class SparkRestExample {
    public static void main(String[] args) {
        post("/users", (request, response) -> {
            //...
        });
        get("/users", (request, response) -> {
            //...
        });
        get("/users/:id", (request, response) -> {
            //...
        });
        put("/users/:id", (request, response) -> {
            //...
        });
        delete("/users/:id", (request, response) -> {
            //...
        });
        options("/users/:id", (request, response) -> {
            //...
        });
    }
}
```
5.2. Thêm User

Dưới đây là post method thực thi việc thêm mới một User:
```
post("/users", (request, response) -> {
    response.type("application/json");
    User user = new Gson().fromJson(request.body(), User.class);
    userService.addUser(user);

    return new Gson()
    .toJson(new StandardResponse(StatusResponse.SUCCESS));
});
```
Hãy kiểm tra route:

**Request:**
```
POST http://localhost:4567/users
{
    "id": "1012", 
    "email": "your-email1@framgia.com", 
    "firstName": "test1",
    "lastName": "demo1"
}
```

**Response:**
```
{
    "status":"SUCCESS"
}
```
5.3. Lấy toàn bộ Users

Dưới đây là get method thực thi việc trả về tất cả người dùng từ UserService:
```
get("/users", (request, response) -> {
    response.type("application/json");
    return new Gson().toJson(
    new StandardResponse(StatusResponse.SUCCESS,new Gson()
    .toJsonTree(userService.getUsers())));
});
```
Hãy kiểm tra route:

**Request:**
```
GET http://localhost:4567/users
```

**Response:**
```
{
    "status":"SUCCESS",
    "data":[
        {
            "id":"1014",
            "firstName":"test",
            "lastName":"demo",
            "email":"your-email@framgia.com"
        },
        {
            "id":"1012",
            "firstName":"test1",
            "lastName":"demo1",
            "email":"your-email1@framgia.com"
        }
    ]
}
```
5.4. Lấy User bằng id

Dưới đây là get method thực thi việc trả về 1 người dùng bằng id đã cho từ UserService:
```
get("/users/:id", (request, response) -> {
    response.type("application/json");
    return new Gson().toJson(
    new StandardResponse(StatusResponse.SUCCESS,new Gson()
    .toJsonTree(userService.getUser(request.params(":id")))));
});
```
Hãy kiểm tra route:

**Request:**
```
GET http://localhost:4567/users/1012
```

**Response:**
```
{
    "status":"SUCCESS",
    "data":{
        "id":"1012",
        "firstName":"test1",
        "lastName":"demo1",
        "email":"your-email1@framgia.com"
    }
}
```
5.5. Cập nhật User

Dưới đây là put method thực thi việc cập nhật thông tin 1 user bằng id đã cho từ UserService:
```
put("/users/:id", (request, response) -> {
    response.type("application/json");
    User toEdit = new Gson().fromJson(request.body(), User.class);
    User editedUser = userService.editUser(toEdit);

    if (editedUser != null) {
        return new Gson().toJson(
        new StandardResponse(StatusResponse.SUCCESS,new Gson()
        .toJsonTree(editedUser)));
    } else {
        return new Gson().toJson(
        new StandardResponse(StatusResponse.ERROR,new Gson()
        .toJson("User not found or error in edit")));
    }
});
```
Hãy kiểm tra route:

**Request:**
```
PUT http://localhost:4567/users/1012
{
    "lastName": "test1"
}
```

**Response:**
```
{
    "status":"SUCCESS",
    "data":{
    "id":"1012",
    "firstName":"test1",
    "lastName":"demo1",
    "email":"your-email1@framgia.com"
}
}
```
5.6. Xóa User

Dưới đây là delete method thực thi việc xóa thông tin 1 user bằng id đã cho từ UserService:
```
delete("/users/:id", (request, response) -> {
    response.type("application/json");
    userService.deleteUser(request.params(":id"));
    return new Gson().toJson(
    new StandardResponse(StatusResponse.SUCCESS, "user deleted"));
});
```
Hãy kiểm tra route:

**Request:**
```
DELETE http://localhost:4567/users/1012
```

**Response:**
```
{
    "status":"SUCCESS",
    "message":"user deleted"
}
```
5.7. Kiểm tra User tồn tại.

Dưới đây là trình xử lý phản hồi của phương thức tùy chọn sẽ kiểm tra xem User có id đã tồn tại chưa:
```
options("/users/:id", (request, response) -> {
    response.type("application/json");
    return new Gson().toJson(
    new StandardResponse(StatusResponse.SUCCESS, 
    (userService.userExist(
    request.params(":id"))) ? "User exists" : "User does not exists" ));
});
```
Hãy kiểm tra route:

**Request:**

> OPTIONS http://localhost:4567/users/1012

**Response:**
```
{
    "status":"SUCCESS",
    "message":"User exists"
}
```
### 6. Tổng kết.

Spark là một framwork nhỏ để tạo các ứng dụng web trong Kotlin và Java 8 với nỗ lực tối thiểu, rất thuận tiện để tạo các microservices trong
java.
### 7. Tài liệu tham khảo

https://www.baeldung.com/spark-framework-rest-api

http://sparkjava.com/documentation