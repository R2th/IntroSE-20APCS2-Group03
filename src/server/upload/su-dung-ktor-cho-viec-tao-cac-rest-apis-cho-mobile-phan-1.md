Trong bài viết này chúng ta sẽ cùng nhau đi tìm hiểu về **Ktor** framework. Một framework được xây dựng dựa trên ngôn ngữ **Kotlin** được cung cấp bởi **JetBrains**.
Đây là một framework khá nhẹ cho phép chúng ta xây dựng các server để cung cấp các API mà vẫn duy trì các tính năng cần có như **authentication, sessions, routing, web templates, JSON wrapping**...

Với bài viết này chúng ta sẽ áp dụng nó cho việc xây dựng cái APIs cho mobile, chúng ta cũng có thể dùng nó cho web.
Với mục tiêu này chúng ta sẽ xây dựng mà server có tên là **TestApiServer** với nhiệm vụ là authentication user và cung cấp các api cho việc tạo **User**, danh sách công việc **Todo** của user đó.

## Cài đặt các công cụ cần thiết
Để bắt đầu công việc chúng ta cần các công cụ sau:
1. Cài đặt IntelliJ từ https://www.jetbrains.com/idea/
2. Cài đặt Ktor plugin. Để đi đến khu vực Plugin chúng ta có thể chạy IntelliJ rồi chọn **Configure** -> **Plugin**

![](https://images.viblo.asia/2b06337f-0373-478a-a18b-42652d933054.png)

Tiếp đến chúng ta search Ktor và cài đặt plugin này.

![](https://images.viblo.asia/680d1c74-d1a2-472d-8326-af9b53fe5a0a.png)

## Khởi tạo project với IntelliJ
Đầu tiên chúng ta khởi chạy IntelliJ. Ở màn hình Welcome, chúng ta chọn **Create New Project** từ danh sách menu.
Kế tiếp ở danh sách menu bên trái ta chọn **Ktor** và thiết lập các tính năng như hình

![](https://images.viblo.asia/eb5c4917-97b6-4b27-89bc-32e395bf6a57.PNG)
Cụ thể như sau:
* Project: chọn **Gradle**
* Using: chọn **Netty**
* Server:
    * Feature: chọn **Locations**, **Sessions** và **Routing**. Locations và Routing sẽ quản lý việc định tuyến của các API, trong khi đó Sessions có nhiệm vụ lưu giữ phiên làm việc hiện tại của user giúp giảm bớt các lượt chứng thực hoặc yêu cầu quyền đăng nhập
    * Authentication: chúng ta chọn **Authentication JWT**, một phương pháp chứng thực dựa trên JSON Web Token
    * Content Negotiation: chọn **GSON**, một thư viện cho việc serialize và deserialize các đối tượng Java đến JSON và ngược lại.

Tiếp theo ta nhấn Next để đi đến màn hình thiết lập package và version cho dự án, tại đây chúng ta có thể đặt tên tuỳ chọn cho dự án chúng ta đang xây dựng, hình bên dưới là một minh hoạ

![](https://images.viblo.asia/b7706cf4-1eb1-4275-8423-ccd70492dc2e.PNG)

Sau khi thiết lập xong tiếp tục nhấn **Next** để đi đến màn thiết lập tên dự án, ở đây ta đang build một server để test việc chạy các API nên tạm đặt là **TestApiServer**

![](https://images.viblo.asia/52810ebf-0dc0-45ae-b8df-1fde87a70071.PNG)

Cuối cùng nhấn **Finish** để cho IDE bắt đầu chạy và tạo dự án.

Sau khi tạo xong chúng ta truy cập vào menu **Build** chọn **Build Project** hoặc ta có thể nhấn Ctrl + F9 để kiểm tra dự án có thể build thành công, nếu không cần kiểm tra lại các thiết lập đã trình bày ở trên

![](https://images.viblo.asia/a6d3d5ba-bbeb-46e7-bdf9-fcffb00fef4f.png)

Kế đến chúng ta sẽ xoá bỏ một số code không cần dùng đến hiện tại. Truy cập vào file Application.kt, xoá bỏ tất cả các dòng code trong phần routing, xoá bỏ các dòng code liên quan đến MyLocation và Type.
Thực hiện build lại để đảm bảo dự án vẫn còn chạy đúng.
## Danh sách các API cần cài đặt
Bước kế tiếp chúng ta xác định là cần thiết lập 2 API: một cho chứng thực user và một cho việc tạo danh sách công việc Todo của user.
Chúng sẽ có dạng như sau:
* **v1/users/create** với phương thức **POST**: tạo một một user. Thông tin cần cho một user là địa chỉ email, tên và mật khẩu của user đó.
* **v1/users/login** với phương thức **POST**: dùng cho việc login của user. Thông tin đòi hỏi là địa chỉ email và mật khẩu của user đó
* **v1/todos** với phương thức **POST**: tạo một công việc mới cho user. Thông tin cần truyền vào là tên công việc và trạng thái hoàn thành hay chưa.
* **v1/todos** với phương thức **GET**: lấy về danh sách công việc hiện tại của user đó.

Ở đây ta đang dùng tiền tố **v1** để cho việc thay đổi API về sau được linh hoạt, chúng ta có thể chuyển sang một phiên bản mới **v2** chẳng hạn như nâng cấp chức năng mới mà không phá vỡ hay gây ảnh hưởng đến các api ở v1.

## Định nghĩa các Routes
Trong Ktor, một **Route** được xem như là một đường dẫn tới server của chúng ta. Cái này có thể là một API mà chúng ta đang dự định tạo. Ktor sử dụng các phương thức như **GET, POST, PUT, DELETE, REST** cùng với một đường dẫn. Ví dụ như sau:
```kotlin
get("/todos") {
    call.respondText("WRITE A POST ON VIBLO!", contentType = ContentType.Text.Plain)
}
```
Ta có thể hiểu ở đây là một API sử dụng phương thức **GET** để truy cập đến server với đường dẫn là **"/todos"** và sẽ nhận được một chuỗi nội dung trả về là **"WRITE A POST ON VIBLO!"**

Ở đây ta cần phân biệt 2 loại route khác nhau:
* **String Route**: sử dụng đường dẫn là một chuỗi string ví dụ như */learn/framework/ktor*.
* **Class Route**: sử dụng một **class** thay vì **string**. Điều này làm nó dễ dàng hơn để đọc và cho phép chúng ta có thể tạo ra các chức năng cần có của route đó trong một lớp riêng biệt, giúp cho việc thiết lập và bảo trì dễ dàng hơn.

Trong bài viết này chúng ta sẽ sử dụng Class Route. Bên dưới là một ví dụ về sử dụng Class Route, ta có thể thấy được ta cần định nghĩa một class và **annotate** nó với **@Location("path_of_route")**. Kế đến là tạo một **extension function** từ Route và định nghĩa các phương thức cần thiết như **GET, POST, DELETE** từ bên trong nó.

```kotlin
@KtorExperimentalLocationsAPI
@Location("/todos")
class TodoRoute

@KtorExperimentalLocationsAPI
fun Route.todos(db: Repository) {
    authenticate("jwt") {
        post<TodoRoute> {
           // implement post function
        }

        get<TodoRoute> {
           // implement get function
        }
    }
}
```


## Thiết lập và cài đặt cơ sở dữ liệu với Postgres
Ktor hỗ trợ thiết lập kết nối với cơ sở dữ liệu **Postgres**. Hiện có nhiều công cụ để chạy một Postgres server.

Chúng ta có thể cài đặt tương ứng với hệ điều hành đang sử dụng: 
* Trên Mac: chúng ta có thể cài đặt Postgres từ https://postgresapp.com/. 
* Trên Windows: ta có thể cài đặt dựa theo hướng dẫn như tài liệu https://www.postgresqltutorial.com/install-postgresql/
* Trên Linux: ta có thể cài đặt dựa theo hướng dẫn từ đây http://www.codebind.com/linux-tutorials/install-postgresql-9-6-ubuntu-18-04-lts-linux/

Sau khi cài đặt xong, chúng ta tiến hành tạo một database cho dự án chúng ta đang tạo có tên là testapiserver.
Ví dụ trên Linux chúng ta sẽ chạy câu lệnh sau để khởi chạy postgres

```
sudo su - postgres
```

Tiếp đến ta tạo database với tên như trên

```
create database testapiserver;
```
Hiện tại chúng ta chỉ cần tạo database, các thiết lập tạo table, chúng ta sẽ tạo trưc tiếp từ code của dự án.

## Thiết lập và cài đặt các thư viện hỗ trợ cho việc truy cập cơ sở dữ liệu
Để truy cập đến database chúng ta vừa tạo ở bước trên, chúng ta sẽ cần thêm một số thư viện bên ngoài để thực hiện công việc đó:
1. **Exposed**: là một thư viện của JetBrains được sử dụng cho việc truy xuất database
2. **Hikari**: thư viện để khởi tạo các cấu hình cần thiết cho cơ sở dữ liệu Postgres
3. **Postgresql**: cung cấp JDBC driver, cái mà cho phép chúng ta tương tác với database

Để thêm các thư viện này, chúng ta mở file **gradle.properties** và thêm như bên dưới:

```
exposed_version=0.18.1
hikaricp_version=3.3.1
postgres_version=42.2.4.jre7
```

Việc này sẽ khai báo các thư viện và phiên bản cần sử dụng. Tiếp đến chúng ta mở file **build.gradle** và bắt đầu khai báo sử dụng cho dự án, tại khu vực **dependencies** ta thêm các dòng sau:
```
compile "org.jetbrains.exposed:exposed-core:$exposed_version"
compile "org.jetbrains.exposed:exposed-dao:$exposed_version"
compile "org.jetbrains.exposed:exposed-jdbc:$exposed_version"
compile "org.postgresql:postgresql:$postgres_version"
compile "com.zaxxer:HikariCP:$hikaricp_version"
```

Sau đó, ở tab **Gradle**, chúng ta chọn **sync** để IntelliJ bắt đầu tải các thư viện cần thiết về.
Đến đây, chúng ta có thể bắt đầu chạy server.

## Khởi chạy server
Chúng ta sẽ sử dụng **System.getEnv()** để đọc tất cả các giá trị tham số mà sever sẽ sử dụng để kết nối đến database postgres.

Đầu tiên, chọn **Add Configuration...** từ thanh công cụ. Sau đó ở menu bên trái ta chọn **Kotlin**. 
![](https://images.viblo.asia/af6741d2-5173-4526-80e9-fccfe3429a2b.png)

Bắt đầu các thiết lập như sau:
* **Name**: ta điền tên của thiết lập này, ở đây có thể đặt là Server. 
* **Main class**: click nút "..." và chọn AplicationKt 
* **Use classpath of module**: chọn là testapiserver.main
* **Environment variables**: click vào nút Browser và điền các thông tin bên dưới
    
    ```kotlin
    JDBC_DRIVER=org.postgresql.Driver
    JDBC_DATABASE_URL=jdbc:postgresql:testapiserver?user=postgres;
    SECRET_KEY=123456789012345678
    JWT_SECRET=123456789012345678
    ```
    
    Các thông tin có ý nghĩa lần lượt là
    
    *    **JDBC_DRIVER**: thiết lập driver cho Postgres.
    *    **JDBC_DATABASE_URL**: đường dẫn kết nối đến database, với testapiserver là database chúng ta cần kết nối.
    *    **SECRET_KEY**: sử dụng cho việc hashing.
    *    **JWT_SECRET**: sử dụng cho việc chứng thực

            Sau khi thiết lập màn hình **Environment Variables** sẽ như bên dưới
![](https://images.viblo.asia/717223a9-63a9-4c29-ae9f-bcfe2df9b9bf.png)

Cuối ta chạy lại dự án bằng cách nhấn vào nút Run trên thanh công cụ để đảm bảo dự án có thể chạy đúng và không xuất hiện lỗi.
![](https://images.viblo.asia/fe9d0297-e552-4fe7-b170-0741fde50099.png)

Đến đây là hết phần 1 về các thiết lập và chạy server với Ktor sử dụng IntelliJ. Phần 2 chúng ta sẽ đi sâu vào các thiết lập từ code để cấu hình server làm việc với các API thực tế.