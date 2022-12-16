### Trong bài viết này, tôi sẽ hướng dẫn các phần chính sau:

+ Tải và sử dụng Kaizen
+ Phân loại user theo role. User với role admin sau khi login sẽ truy cập Admin dashboard page, user thường thì sẽ truy cập đến page khác
+ Tạo 1 token đơn giản sau mỗi lần đăng nhập và lưu token này vào trong database, không sử dụng JWT Token
+ Tạo 1 function kiểm token đã hết hạn hoặc chưa. Nếu token đã hết hạn -> call api bất kỳ -> báo lỗi 401
+ Tạo các function xử lý Thêm - Xoá - Sửa thông tin user tại Admin dashboard


### Nội dung nâng cao:

+ Tạo 1 function tự động tại FE sau một thời gian nhất định -> được call để kiểm tra token hết hạn hoặc chưa và sẽ tự động xin cấp mới token và remove token cũ

Vui lòng tham khảo lại những bài viết sau để biết cách tạo 1 project với Spring Boot - Thymeleaf - Elasticsearch:

https://viblo.asia/p/tao-mot-project-voi-spring-boot-va-elasticsearch-841-su-dung-thu-vien-spring-data-elasticsearch-huong-dan-cai-dat-va-su-khac-nhau-giua-2-phien-ban-8xx-voi-7xx-elasticsearch-Rk74aRXvJeO

https://viblo.asia/p/tao-mot-project-voi-spring-boot-thymeleaf-elasticsearch-su-dung-http2-tao-service-run-elasticsearch-yZjJYjolLOE

https://viblo.asia/p/ma-hoa-thong-tin-password-trong-qua-trinh-login-register-voi-base64-su-dung-spring-boot-thymeleaf-elasticsearch-khong-su-dung-form-bXP4WPoBJ7G

Nguồn templates html: https://templatemo.com/tag/bootstrap-5

### Công cụ và thư viện được sử dụng trong bài viết:

+ Spring boot 2.7.4
+ Spring tool suite 4
+ Spring data elasticsearch 4.4.2
+ Maven 3
+ Java 11
+ Elasticsearch 7.17.6
+ Elasticsearch head extension
+ Kaizen Elastic

## 1. Tải và sử dụng Kaizen:

Trong những bài viết trước đó tôi sử dụng extension "Elasticsearch head", vì nó nhẹ và cài đặt nhanh chóng, giao diện Elasticsearch Head:

![image.png](https://images.viblo.asia/41acf7c7-d293-4957-90dd-e0ae0f0ee785.png)

Hôm nay tôi giới thiệu thêm 1 công cụ tương tự như Elasticsearch Head như hỗ trợ nhiều tính năng hơn là Kaizen Elastic

Link: https://elastic-kaizen.com/download

![image.png](https://images.viblo.asia/bf1e6707-a488-4bcc-8b7d-a2e8b33aafc0.png)

Tải về phiên bản phù hợp, ở đây tôi tải về bản mới nhất

Sau khi tải xong, giải nén được thư mục như hình:

![image.png](https://images.viblo.asia/e5dc51b3-d696-4b57-b1b9-7db3ef3c99e5.png)

Bên trong thư mục, sẽ có 1 file **"kaizen.bat"**, chạy file này lên sẽ có giao diện:

![image.png](https://images.viblo.asia/21141241-7cad-4137-b7bb-8df95fd6247b.png)

Trên giao diện, click vào icon hình đám mây hoặc click "Server" -> click "Connect" hoặc nhấn tổ hợp phím "Alt + O":

![image.png](https://images.viblo.asia/679d5141-fc48-4db6-ab84-dbb77816cbbf.png)

Tại giao diện "Connections", mặc định đã có 1 host được tạo sẵn, chỉ cần click chọn host được tạo sẵn và click icon đám mây(Connect):

![image.png](https://images.viblo.asia/f8754eae-9a58-4cc0-a934-2a2ed6e2ee6e.png)

=> Kết nối thành công

Với những tính năng khác các bạn có thể tự tìm hiểu vì trong bài viết này tôi không đi sâu vào công cụ này

## 2. Cấu trúc project:

![image.png](https://images.viblo.asia/c8769b47-66c8-49b5-8650-e9afa5ed939e.png)

**### Nội dung file "pom.xml":**

    <?xml version="1.0" encoding="UTF-8"?>
    <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
        <modelVersion>4.0.0</modelVersion>
        <parent>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-parent</artifactId>
            <version>2.7.4</version>
            <relativePath/> <!-- lookup parent from repository -->
        </parent>
        <groupId>com.example</groupId>
        <artifactId>Token</artifactId>
        <version>0.0.1-SNAPSHOT</version>
        <name>Thymeleafs</name>
        <description>Demo project for Spring Boot</description>
        <properties>
            <java.version>11</java.version>
        </properties>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-data-elasticsearch</artifactId>
            </dependency>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-thymeleaf</artifactId>
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

        <build>
            <plugins>
                <plugin>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-maven-plugin</artifactId>
                </plugin>
            </plugins>
        </build>

    </project>


## 3. Tạo 1 package "com.example.token.application":

**Nội dung class "TokenApplication":**

![image.png](https://images.viblo.asia/90e64b1b-ddb6-4fad-9d3d-13f465d6bb7c.png)

## 4. Tạo 1 package "com.example.token.model":

**Nội dung class "User":**

![image.png](https://images.viblo.asia/a4c5f233-471f-4224-9f56-e6b8aac9cc9b.png)

**Nội dung class "Token":**

![image.png](https://images.viblo.asia/5997c787-a3d6-4efa-99c6-cc5c0b8edbab.png)

## 5. Tạo 1 package "com.example.token.repository":

**Nội dung class "UserRepository":**

![image.png](https://images.viblo.asia/6fc79b43-288c-40af-9446-ae552faef833.png)

Trong class này tôi có khai báo thêm 1 phương thức là **"findByUserId"**, tôi muốn nhắc nhở các bạn không phải muốn đặt tên phương thức như nào cũng được

Tôi lấy ví dụ để các bạn dễ hiểu, trong class này tôi sẽ sửa lại tên phương thức **"findByUserId"** đến **"findByPhone"** và nó sẽ báo lỗi khi bạn start project:

![image.png](https://images.viblo.asia/96eb8fd5-c974-44a3-b386-e4d769e9fa7d.png)

![image.png](https://images.viblo.asia/88be9806-e483-4d06-ba04-17bd739942e8.png)

Nguyên nhân là do khi đặt tên phương thức các bạn cần lưu ý điều này, ví dụ trong model **"User"** tôi không có thuộc tính tên "phone" nên khi tôi khai báo 1 phương thức với tên **"findByPhone"** -> lỗi

Bây giờ tôi sẽ quay lại class model "User" và thêm 1 thuộc tính là **"phone"**:

![image.png](https://images.viblo.asia/1e2fd544-6439-4363-9ec6-9fddf09d9400.png)

Restart lại project và thấy không có lỗi:

![image.png](https://images.viblo.asia/8c224aff-c28a-4e9a-8c1b-e1f67b27bab3.png)

Như vậy, kết luận để khai báo thêm 1 phương thức trong interface repository, cần đặt tên phương thức theo quy tắc:

**Ví dụ: findBy + "tên thuộc tính có khai báo trong class model"**

**Nội dung class "TokenModel":**

![image.png](https://images.viblo.asia/5365f272-b783-4efc-a6d4-fbc6ca0c437f.png)

## 6. Tao 1 package "com.example.token.controller":

**Nội dung "UserController":**

Tôi sẽ tạo trước 1 mapping để load trang đăng nhập "index.html":

![image.png](https://images.viblo.asia/4b777ecb-b3a8-46af-838f-e0c7cbd24c69.png)

Restart project và truy cập url "https://localhost:8080/". Cần chú ý do trong bài viết trước tôi đã có hướng dẫn enable SSL và tạo certificate nên bài viết này tôi không nói lại, bạn nào không muốn sử dụng SSL thì vào "application.yml" và update lại giá trị "true" thành "false" cho SSL

![image.png](https://images.viblo.asia/9ce4baa1-c120-40ea-9303-2fe4baa8cc9a.png)

=> Page đăng nhập load thành công

Tôi tạo 1 mapping trong controller để load page dashboard:

![image.png](https://images.viblo.asia/11167e7f-3bf1-47de-b793-caff944de3fe.png)

![image.png](https://images.viblo.asia/d63977bb-1983-4a17-a17c-ee5dff0c6942.png)

Với user thường không phải admin khi đăng nhập sẽ cho chuyển hướng đến page khác, ở đây là "user.html":

![image.png](https://images.viblo.asia/245f90ce-7da4-4f97-b521-34d95b26117c.png)


![image.png](https://images.viblo.asia/b8062c7b-d99e-44f5-9640-e75a7a3702b0.png)

## 7. Tạo 1 package "com.example.token.service":

**Nội dung class "UserService":**

![image.png](https://images.viblo.asia/223619b9-112f-40e1-a7e3-9f94e5af7489.png)

**Nội dung interface "IUserService":**

![image.png](https://images.viblo.asia/0652e241-ff83-4a20-8732-1cacdc6c371e.png)

Tôi có sử dụng mã hoá Base64 cho mã hoá thông tin password khi gửi dữ liệu từ FE và khai báo 1 phương thức giúp giải mã(decode) về lại utf8. Nếu bạn không muốn sử dụng có thể tuỳ chỉnh lại code

Sau khi hoàn thành các thành phần cần thiết. Tiếp theo, tôi xử lý tự động tạo 1 token mỗi lần user login

## 8. Tạo token mỗi lần user login:

Tôi giả định tôi là admin và tài khoản admin của tôi đã có trong hệ thống. Nhưng tôi sẽ tạo 1 api để tạo user và dùng postman để call api này

Trong UserController tôi thêm mapping **"/createUser"**:

![image.png](https://images.viblo.asia/6043b3b5-5d8f-43fc-9d75-eb914a9b1411.png)

Tôi mở Postman và call api "https://localhost:8080/createUser", method = "POST":

Phần body data:

![image.png](https://images.viblo.asia/31cab299-a4a9-4f1e-a82c-048c799dd6e5.png)

Kết quả:

![image.png](https://images.viblo.asia/e0213170-5120-460c-af6b-b8aa1382a763.png)

=> Tạo user thành công. Tôi mở Kaizen lên để kiểm tra:

![image.png](https://images.viblo.asia/f8d516b0-382f-4671-9ca4-d6c0e9cae042.png)

Thông tin đã được tạo thành công và password được mã hoá

Tiếp theo, tôi sử dụng tài khoản admin vừa tạo để đăng nhập vào trang dashboard:

Tôi tạo 1 mapping "/login" trong controller:

![image.png](https://images.viblo.asia/d502e765-a540-4a55-bcab-0776477bc2ac.png)

Vui lòng tham khảo bài viết bên dưới tôi đã có hướng dẫn tạo function xử lý tại FE:

https://viblo.asia/p/ma-hoa-thong-tin-password-trong-qua-trinh-login-register-voi-base64-su-dung-spring-boot-thymeleaf-elasticsearch-khong-su-dung-form-bXP4WPoBJ7G

Đây là script file tôi xử lý cho login page **"index.html"**:

![image.png](https://images.viblo.asia/2d559479-63aa-4118-b9cb-659796efb84d.png)

Tôi tiến hành đăng nhập với tài khoản admin:

![image.png](https://images.viblo.asia/9b3158ac-88e4-4c41-80bf-3d264cf7ba6c.png)

=> Login thành công

Tiếp theo, tôi sẽ tạo tự động token cho mỗi user sau khi xác thực thành công user có trong hệ thống. Trong bài viết này tôi không sử dụng JWT token hay oauth2 bởi vì tôi muốn các bản hiểu 1 cách đơn giản nhất có thể về token

Thông thường nếu không tạo token, khi bạn call 1 api bất kỳ nó sẽ không yêu cầu bạn xác thực thông tin gì cả nhưng nếu có token cho mỗi lần call api nó sẽ yêu cầu phải có token, nếu không cung cấp token hợp lệ -> failed

Trong một vài dự án dùng multiservice thì token sẽ được quản lý bởi ouath2 service và mỗi lần call api việc đầu tiên là sẽ kiểm tra token có tồn tại hay không và token đã hết hạn chưa, nếu token hết hạn -> văng lỗi

Trước tiên tôi tạo 1 phương thức sử dụng **"UUID"** để random ra token, tôi sẽ khai báo trong **"IUserService"** và **"UserService"**:


**Tại "IUserService" tôi khai báo:**

![image.png](https://images.viblo.asia/6449e378-e923-493b-acdb-3da17cd1400f.png)

**Tại "UserService":**

![image.png](https://images.viblo.asia/5c0aeb81-6bd0-4dad-9c7b-b8d511921ac8.png)

Tôi restart lại project và thử đăng nhập để kiểm tra token được sinh ra:

![image.png](https://images.viblo.asia/e5f521ac-26ce-4a4a-b7d4-5eaadbc13a97.png)

=> Token được tạo thành công

Tại **UserController**, phương thức **"checkInfoUserLogin"** với mapping **"/login"** tôi sửa code lại để lưu token vào database:

![image.png](https://images.viblo.asia/b0c0f934-c9a6-45f2-8cce-290ab171d3ed.png)

Restart lại project và đăng nhập lại lần nữa để kiểm tra xem token có được lưu vào database thành công không:

![image.png](https://images.viblo.asia/93dab740-70e2-44dc-b4bd-44950bc1f290.png)

![image.png](https://images.viblo.asia/397162ff-dbee-4b82-ae8b-e256687a23da.png)

=> Token được lưu thành công, các bạn thấy hiện tại trong database có 2 token, do trước đó tôi đã có đăng nhập. Nếu muốn xoá record token nào thì chỉ cần click chọn record đó rồi click button **"Remove"**

Sau khi tạo token thành công, tôi tạo 1 function **"getUser"**, trong function này tôi sẽ lấy giá trị token trên header để kiểm tra trong database có tồn tại không:

![image.png](https://images.viblo.asia/e90ae2fc-e490-4e3c-8c76-5497bb563745.png)

Tôi dùng postman để kiểm tra với 1 số kịch bản:

 **Kịch bản 1: Không set header**

![image.png](https://images.viblo.asia/cc458232-54b4-4ccb-aea5-867f1505ef27.png)

=> Trả về lỗi

**Kịch bản 2: Set header nhưng nhập token không đúng**

![image.png](https://images.viblo.asia/637e5125-7c0f-4111-bc89-34391b26e292.png)

=> Trả về lỗi

**Kịch bản 3: Set header với token đúng**

![image.png](https://images.viblo.asia/327e3390-fde5-4b6b-89a6-30c24b6b770f.png)

![image.png](https://images.viblo.asia/e73eef90-8ad8-4757-9550-49b051bb3ad1.png)

=> Trả về data user thành công

Tiếp theo, trong model class **"Token"** tôi khai báo thêm 1 thuộc tính là **"tokenExpiredAt"**, thuộc tính này dùng để lưu thời gian mà token được tạo ra, và mỗi lần call api khi check token sẽ cần kiểm tra xem token này còn hạn hay hết hạn:

![image.png](https://images.viblo.asia/9503cd1e-8f66-4bfe-8f00-c01a257ad3d4.png)

Tôi khai báo 1 thuộc tính **"token.expired.in"** in **application.yml** với đơn vị tính là bằng phút. Ví dụ, tôi muốn sau 1 phút thì token mới hết hạn nghĩa là thời gian sống của token là 1 phút, tôi thiết lập giá trị như bên dưới:

    token:
      expired:
        in: 1

![image.png](https://images.viblo.asia/c88d3e0b-4f4e-4071-8d1d-6a72cc3c3aa7.png)

Tôi tạo 1 phương thức để tính toán thời gian token sẽ hết hạn:

**Trong IUserService:**

![image.png](https://images.viblo.asia/5b3bb4d0-f997-4de7-8dc5-4f500dcac983.png)

**Trong UserService:**

![image.png](https://images.viblo.asia/dd41ac2c-0552-48fa-a41d-078d0d067f28.png)

Trong class **"UserService"** tôi cần lấy giá trị thuộc tính vừa tạo trong application.yml để sử dụng trong phương thức **"getTokenExpiredAt"**:

![image.png](https://images.viblo.asia/c36f7521-8a44-469e-bcab-40518ac368f9.png)

Thời gian sống của token sẽ bằng thời gian token được tạo ra(ở đây tôi lấy theo thời gian hiện tại) + thời gian mà tôi chỉ định token này sẽ sống trong bao lâu(ở đây chính là giá trị thuộc tính khai báo trong **application,yml** trước đó được tính bằng phút và tôi quy đổi ra thành milisecond)

    long currentTime = new Date().getTime() + TimeUnit.MINUTES.toMillis(tokenExpiredIn);
    
Tiếp theo, tôi tạo thêm phương thức để kiểm tra token mỗi khi user đăng nhập

Ví dụ, user đăng nhập lần 1 -> generate new token -> user không logout và close tab hiện tại -> user vào lại thì sẽ kiểm tra xem token của user này đã hết hạn chưa, nếu chưa thì không cần tạo mới token và login đến dashboard, nếu token đã hết hạn -> redirect về lại trang đăng nhập

**Trong IUserService:**

![image.png](https://images.viblo.asia/cc7313b9-97d5-4724-a9c4-9b852cddd870.png)

**Trong UserService:**

Tôi cần khai báo **TokenRepository**, tôi dùng annotation **"@AutoWired"**:

![image.png](https://images.viblo.asia/df52b0f0-29a4-4435-bb78-d94e4088caa8.png)

Phương thức **"checkToken"**:

![image.png](https://images.viblo.asia/9bff8931-52e8-4e17-92cf-fc78f5d8ead9.png)

Trong phương thức này, cần quan tâm vấn đề tính thời gian hết hạn cho token:

                long tokenExpiredAt = obj.getTokenExpiredAt();
                long currentTime = new Date().getTime();
                if(tokenExpiredAt - currentTime > 0) {
                    // not expired yet
                    return true;
                }else {
                    // token existed but expired -> delete token expired
                    // remove old token
                    tokenRepo.delete(obj);
                }
                
+ Giá trị "tokenExpiredAt": Chính là giá trị thời gian khi token được sinh ra + thời gian sống của token
+ Giá trị "currentTime": Lấy ra thời gian hiện tại

Và để tính thời gian token hết hạn hay chưa tôi lấy **"tokenExpiredAt - cuurentTime"**. Để cho dễ hiểu, tôi lấy ví dụ như bên dưới:

Giả sử tôi có token được sinh ra vào lúc **"10:00 AM"** và tôi chỉ định token sống trong 5 phút -> có nghĩa là sau **"10:05 AM"** token sẽ hết hạn và sau 1 khoảng thời gian 6 phút thì thời gian hiện tại là **"10:06 AM"**, theo công thức tính ở trên:

Lấy "10:05 AM" - "10:06 AM" -> giá trị sẽ nhỏ hơn 0 -> token hết hạn

Tiếp theo, sau khi tạo phương thức **"checkToken"**, tôi tạo tiếp 2 phương thức **"createCookie"** và **"getValueCookie"** , lưu giá trị "token" và "tokenExpiredAt" tại cookie, lý do tôi sẽ nói ở phần sau:

**Phương thức "createCookie":**

***Trong "IUserService":***

![image.png](https://images.viblo.asia/66367ade-9989-482c-be6a-3eecdfad25b9.png)

***Trong "UserService":***

![image.png](https://images.viblo.asia/27f43324-d956-4fc7-a56c-afa03bdfbf22.png)

**Phương thức "getValueCookie":**

***Trong "IUserService":***

![image.png](https://images.viblo.asia/b494b74f-ad19-4b5a-b7c8-d664a033c7f5.png)

***Trong "UserService":***

Tôi cần khai báo **"HttpServletRequest"**:

![image.png](https://images.viblo.asia/155aa35e-159d-452a-841e-ef5279331d97.png)

![image.png](https://images.viblo.asia/77e1dc0f-2f43-4f47-b5ee-4aa708702573.png)

Sau khi chuẩn bị xong, tôi quay lại **UserController** và sửa lại phương thức **"checkInfoUserLogin"** với mapping name "/login":

![image.png](https://images.viblo.asia/494339d1-0ed7-4acc-a83a-fa5a528e93cc.png)

Bây giờ, tôi restart lại project mà kiểm tra với 1 số kịch bản:

**Kịch bản 1: User đăng nhập lần đầu -> tạo new token, trước tiên tôi kiểm tra database xem có token nào không:**

![image.png](https://images.viblo.asia/6bd93fd7-17ce-4585-b73a-8f144190910a.png)

=> Không có token nào

Tôi tiến hành đăng nhập với user "admin"

![image.png](https://images.viblo.asia/d1980516-8cd4-4bd0-b62f-1eab6b0ec8e6.png)

=> Token và "tokenExpiredAt" được thêm vào cookie thành công

Kiểm tra database:

![image.png](https://images.viblo.asia/f9e8fccf-b091-4264-b8d6-af73443e2af1.png)

=> "Token" và "tokenExpiredAt" được lưu thành công

**Kịch bản 1: User close tab và mở lại -> sẽ kiểm tra token hết hạn hoặc chưa, ở đây tôi đang chỉ định token sống trong 1 phút**

Tôi thử đăng nhập lại vào page dashboard -> sẽ check token, tôi xử lý thêm tại mapping "/dashboard":

![image.png](https://images.viblo.asia/58d4a80f-4938-48a1-942d-0ec951b5ced4.png)

Tôi lấy giá trị token được lưu tại cookie trước đó và gọi function kiểm tra token để kiểm tra:

![image.png](https://images.viblo.asia/56118d7a-ebfe-4419-88d7-378f4992d234.png)

=> Sau khi token hết hạn sẽ bị remove ra khỏi database

## Tiếp theo, tại trang dashboard admin tôi xứ lý tiếp tính năng như Thêm - Xoá - Sửa user:

![image.png](https://images.viblo.asia/17096833-578c-4fe1-a4d5-9d843b2eb9b5.png)

Đây là giao diện dashboard dành cho admin, tại page này tôi sửa lại thông tin 1 vài field cho phù hợp với User model của tôi

![image.png](https://images.viblo.asia/8054e402-dda7-4897-a7ee-1cd43b8410a8.png)

Sau khi thay đổi, tôi có 6 fields là "UserId"**(required)** - "Email" - "First Name"**(required)** - "Last Name" - "Address" - "Birth Day"**(required)**

Trước khi đi vào xử lý các chức năng Thêm - Xoá - Sửa user, tôi tạo thêm 2 package **"com.example.token.filter"** và **"com.example.token.config"** cho mục đích filter tất cả request url:

**Trong package "com.example.token.filter":**

Tôi tạo 1 class "UserFilter" với annotation "@Component":

![image.png](https://images.viblo.asia/65cb8b68-a36f-4ebf-80ed-c5fc229afa86.png)

**Trong class "UserFilter" tôi khai báo 3 thành phần "HttpServletRequest" - "HttpServletResponse" - "IUserService" và tôi implements "Filter", tôi chỉ cần sử dụng phương thức "doFilter" để đọc tất cả request gửi đến:**

![image.png](https://images.viblo.asia/a5df575a-cb30-452e-9639-62f79c3fdc5f.png)

**Trong phương thức "doFilter" tôi chỉ lọc 3 mapping tương ứng với Thêm - Xoá - Sửa và xem thông tin user": **

+ "/updateUser" để xử lý cho cập nhật và tạo mới user
+ "/getUser" để xử lý xem thông tin user
+ "/deleteUser" để xử lý xoá user

Ở đây tôi dùng "startsWith" nghĩa là nếu request url gửi đến có dạng " /getUser/** " -> đều được đi vào

Sau khi tạo xong class **UserFilter**, tôi tạo tiếp class **UserConfig** trong package **"com.example.token.config"**:

![image.png](https://images.viblo.asia/3b5a9675-5d59-463c-b4e0-e6c9b23c5b74.png)

Xong phần chuẩn bị tại BE, tôi qua FE và tạo 1 script file **"script.js"** trong thư mục **"static"** để xử lý phần gửi data đến BE và thêm token trong request headers. Tại html page "dashboard.html" tôi thêm script file "script.js":

![image.png](https://images.viblo.asia/377fc6d2-4a8f-4739-bd5e-241a51ead1ad.png)

**Cấu trúc project:**

![image.png](https://images.viblo.asia/1e8867c2-c9df-4a49-b67b-25fb8fac5e7d.png)

Trong script file, tôi cần tạo 3 phương thức chính:

+ getCookie(): Trong phần trên tôi đã thêm token vào cookie nên tại đây khi gửi data đến BE tôi cần lấy ra giá trị token này để kiểm tra token hết hạn hoặc không tại BE

![image.png](https://images.viblo.asia/aa31759e-1d41-4c3e-be5c-b8f4a1b862bf.png)

Tham khảo thêm về cookie tại đây: https://www.w3schools.com/js/js_cookies.asp

+ getToken(): Phương thức chỉ để trả về giá trị token từ phương thức ở trên, tôi không muốn dùng chung với "getCookie()"

![image.png](https://images.viblo.asia/e3ece84f-6169-40a8-9bdd-0538662fdf7e.png)

+ updateUser(): Phương thức này để validate các fields bắt buộc, gửi data đến BE và sau khi lấy được token từ cookie -> thêm 1 header với định dạng **{"Authorization": "Bearer " + token}** hoặc **{"Authorization":token}** hoặc với bất kỳ tên nào miễn là có thể lấy ra giá trị token trong request headers 

![image.png](https://images.viblo.asia/d77fdc83-9dbb-4107-8ce7-d7157131712e.png)

Cập nhật phương thức **"updateUser()"** tại button **"Save changes"** trong **"dashboard.html"**:

![image.png](https://images.viblo.asia/ada2c567-e9af-47fe-a1b3-3d0ac6dad397.png)

**Trong phương thức "updateUser" có 3 vấn đề quan trọng**:

+ Validate data, có 3 fields bắt buộc cần validate là **"UserId" - "First Name" - "Birth Day"**:

![image.png](https://images.viblo.asia/4638b5b2-6b60-4d99-8b6a-3881ce8f0848.png)

Ở đây tôi đã tạo 3 html tag với nội dung **"<span style="color:red" name = "message"></span>"** tại 3 vị trí fields cần validate:

![image.png](https://images.viblo.asia/da68a3cc-d302-4af0-9bce-1dd70489f561.png)

+ Tạo 1 password theo 1 pattern cụ thể: **"P@ssword" + "birthDate"(yyyymmdd)**. Ví dụ: user có birthDate là **01-01-1990** -> password sẽ là **"P@ssword19900101"**:

![image.png](https://images.viblo.asia/2c09e987-b6d6-4e54-9d47-d7b1166f1d60.png)

+ Gửi data đến BE, tại đây tôi lấy ra giá trị token lưu trong cookie từ phương thức **"getToken()"** và add headers đến request headers:

![image.png](https://images.viblo.asia/313bbabd-eb3f-4d59-bec0-eb172b17e342.png)

Vậy là phần chuẩn bị tại FE đã xong, tôi sẽ kiểm tra 1 kịch bản tại FE cho trường hợp validate data:

Tôi bỏ trống những fields bắt buộc và click button **"Save changes"**, kiểm tra kết quả:

![image.png](https://images.viblo.asia/4b675de8-8a75-4813-89e1-ec612cae7cee.png)

![image.png](https://images.viblo.asia/0ba79ab3-8ae9-4477-a790-534c1bd5a987.png)

=> Validate data thành công

Tiếp theo, xử lý tại BE cho Thêm và Cập nhật user:

## Thêm - Cập nhật User:

Tại **UserController** tạo phương thức **"updateUser"**:

![image.png](https://images.viblo.asia/83370c81-d82f-41e7-ad99-6e93ed4bc3c9.png)

**Tiến hành kiểm tra cho kịch bản tạo mới user:**

![image.png](https://images.viblo.asia/3a948bc0-acee-40c1-8f72-ce020eaaac2b.png)

=> Tạo mới user thành công

Tiếp theo, tôi kiểm tra cho kịch bản nếu token user admin hết hạn -> sẽ không thể call đến api **"updateUser"** và văng lỗi **"401"**. Tôi chờ cho qua 1 phút bởi vì tôi chỉ định thời gian token sống là 1 phút:

![image.png](https://images.viblo.asia/a66a57de-9219-4c74-a857-0cd685a3b887.png)

=> Cho lần thứ 2 call api **"updateUser"** -> token expired -> văng lỗi

Lần thứ 3:

![image.png](https://images.viblo.asia/3ed7dda5-4cb1-4b34-b4fd-6d319e1ff6f6.png)

Kiểm tra database:

![image.png](https://images.viblo.asia/2b6a40d7-6bff-42e9-a2f8-6cacb2830e84.png)

=> User mới được thêm thành công

**Tôi thử đăng nhập với user vừa tạo(user thường) -> sẽ không thể load trang dashboard admin:**

![image.png](https://images.viblo.asia/db6116e7-2419-405c-9fd3-1caf68364487.png)

=> Với user thường sẽ chỉ load page "user.html"

**Kiểm tra database với token được tạo mới:**

![image.png](https://images.viblo.asia/dcd34944-baea-4810-93d3-9616be2e588a.png)

=> Token được tạo mới và lưu thành công

**Phương thức "getUserPage" mapping "/user":**

![image.png](https://images.viblo.asia/9d34d1e0-642b-413a-98a7-042de2833910.png)

Tiếp theo, tôi qua tính năng Xoá user:

## Xoá thông tin User:

**Thêm phương thức "deleteUser()" trong script file:**

![image.png](https://images.viblo.asia/260b456f-1f21-43a4-a42a-19baaf5f02b5.png)

**Khai báo phương thức này trong html:**

![image.png](https://images.viblo.asia/a4f6a90e-91c2-45c0-8f06-7bfedbb1f3ec.png)

**Tạo 1 phương thức "deleteUser" với mapping "/deleteUser" trong UserController:**

![image.png](https://images.viblo.asia/0db30eaa-a997-416a-ac89-73e391a6fba4.png)

**Kiểm tra với kịch bản delete user không tồn tại:**

![image.png](https://images.viblo.asia/b00bd27a-ce28-4a0e-9523-d5e1df35b1ca.png)

=> User này không có trong system nên sẽ báo lỗi

**Kiểm tra với kịch bản delete user đã có:**

![image.png](https://images.viblo.asia/1957f85c-8efe-4fde-bccc-bcfe3d7cda5d.png)

=> User deleted success

**Kiểm tra với kịch bản delete user nhưng token hết hạn:**

![image.png](https://images.viblo.asia/80fb9789-b703-4080-b192-6204fed3b7c2.png)

=> Trả về lỗi 401 

Tiếp theo, tôi xử lý thêm 1 vài tính năng nâng cao, tại FE tôi tạo 1 function trigger sau thời gian chỉ định call đến BE để xin cấp mới token

Ví dụ, tôi đăng nhập và token được tạo ra với thời gian sống là 2 phút, thì tôi xử lý tại FE sau thời gian 1 phút sẽ tự động call đến BE để xin cấp mới token, nghĩa là khi token còn 1 phút nữa là hết hạn thì functione sẽ được gọi để call đến BE

## Tạo 1 function tự động tại FE sau một thời gian nhất định call đến BE để xin cấp mới token:

Trước tiên tôi tạo 1 mapping xử lý việc xin cấp mới token tại BE **UserController**, các bạn có thể tạo riêng 1 controller khác như **"TokenController"** cho xử lý chỉ về token để dễ quản lý:

![image.png](https://images.viblo.asia/4435b6f1-77d8-4113-8f24-126f4ffdefea.png)

Tiếp theo, tôi tạo 1 phương thức trong script file:

![image.png](https://images.viblo.asia/ad6a7014-8e11-4a1b-9163-055de6616ded.png)

**Các phần xử lý chính:**

+ Lấy ra giá trị "tokenExpiredAt" tại cookie(milisecond)
+ Lấy giá trị thời gian hiện tại(milisecond)
+ Thời gian thực thi, tôi dùng công thức như bên dưới:

        let executeAfter = Number(tokenExpiredAt) - Number(currentTimeInMillis) - 60 * 1000;
        
Tôi lấy ví dụ cho dễ hiểu công thức trên:

Ví dụ: Tôi đăng nhập và vào thời điểm "09:00 AM" token được tạo và tôi chỉ định token này sống trong 2 phút -> thời gian hết hạn của token(tokenExpiredAt) sẽ vào khoảng "09:02 AM lẻ 2 giây". Để tính ra thời gian thực thi, tôi lấy giá trị "tokenExpiredAt" là "09:02 AM" - thời gian hiện tại ví dụ là "09:00 AM lẻ 10 giây", thời gian thì chắc chắn có chênh lệch tầm 1-2s. Và theo công thứ ở trên sẽ là: 

**"09:02 AM lẻ 2 giây" - "09:00 AM lẻ 10 giây" - 60*1000** 

Ở đây 60 chính là 60 giây và tôi muốn quy đổi ra thành milisecond -> tôi lấy 60 * 1000

Ta có thể tính rợ theo phút như: **2phút - 0phút - 1phút = 1 phút** => nghĩa là sau 1 phút(thực sự khoảng 58-59 giây) nữa phương thức **"extendToken"** sẽ được gọi để thực hiện việc request BE generate 1 token mới

**Tôi tiến hành kiểm tra cho kịch bản xin cấp mới token khi token còn khoảng 1 phút nữa là hết hạn:**

Sau khi đăng nhập thành công, kiểm tra thông tin token:

![image.png](https://images.viblo.asia/6c40f5c3-3657-49a9-a621-7b10d274061a.png)

Thời gian thực thi tính bằng milisecond, tôi có in ra giá trị này:

![image.png](https://images.viblo.asia/062ee610-8210-4e3c-b7b0-f4dd39d6ec4d.png)

Sau thời gian 1 phút, phương thức "extendToken" được thực thi:

![image.png](https://images.viblo.asia/af0dbe36-a5c7-45ce-9306-fc06297b03cf.png)

Tôi kiểm tra lại database xem dữ liệu đã được cập nhật lại chưa:

![image.png](https://images.viblo.asia/2282291d-4608-4ce9-bfe9-1055816bfe98.png)

=> Dữ liệu được cập nhật thành công

Tôi kiểm tra lại xem cookie đã được cập nhật giá trị mới chưa:

![image.png](https://images.viblo.asia/cf9a3e38-416b-4526-ba02-5c632ca9224d.png)

=> Cookie không cập nhật lại giá trị token mới mặc dù tôi đã create cookie. Kiểm tra lại phương thức "createCookie":

Phương thức "createCookie":

![image.png](https://images.viblo.asia/5fc82d25-70b2-45c1-bfd5-4f4c6271c68b.png)

Trong phương thức "extendToken" tôi đã gọi lại phương create cookie nhưng tại browser nó không cập nhật lại theo giá trị mới:

![image.png](https://images.viblo.asia/34df7ccf-9300-4a31-8df4-80e740b0ba92.png)

Để xử lý vấn đề này, tôi thêm khai báo "path" khi tạo cookie:

![image.png](https://images.viblo.asia/33d6d965-cf70-4716-9abe-6516757b7527.png)

Bây giờ, tôi restart lại project và kiểm tra lại xem cookie có cập nhật lại giá trị mới chưa:

![image.png](https://images.viblo.asia/87160a6d-9347-4c36-830f-89543f495186.png)

Database lưu dữ liệu thành công và đường dẫn "path" được cập nhật mới

Sau 1 phút, phương thức "extendToken" thực thi:

![image.png](https://images.viblo.asia/2948e97a-8dbc-447c-8d2d-b8be2cded7bd.png)

Kiểm tra lại thông tin cookie:

![image.png](https://images.viblo.asia/a00c6364-3d6f-462c-9a06-d06cab2c9276.png)

=> Được cập nhật thành công

Như vậy xong phần xử lý để tự động call request BE cấp mới token, phương thức "extendToken" sẽ call liên tục cứ sau mỗi 1 phút:

![image.png](https://images.viblo.asia/4affe1e9-f4ab-4023-8b42-4ff0577a2671.png)

Để tối ưu, tôi có cập nhật lại 1 số phương thức chính:

## UserController:

**1. Phương thức "updateUser": Dùng chung cho cả tạo mới và cập nhật user**

![image.png](https://images.viblo.asia/438f99b7-5174-4116-b036-1dfc899fd87b.png)

**2. Phương thức "deleteUser":**

![image.png](https://images.viblo.asia/3164719b-bfaa-46d4-ba9c-8099162eeea0.png)

**3. Phương thức "checkInfoUserLogin": Dùng để xử lý khi user đăng nhập:**

![image.png](https://images.viblo.asia/1f526cf3-ec74-4998-aecc-c9f6028bc37c.png)

**4. Phương thức "getDashboardPage": Dùng để xử lý khi load dashboard page:**

![image.png](https://images.viblo.asia/7d85f1f9-a784-40f6-8bb4-80381d24d416.png)

**5. Phương thức "extendToken": Dùng để xử lý khi FE gửi request cấp mới token:**

![image.png](https://images.viblo.asia/2beaa15c-9b8c-4530-a8b5-63a941520c2b.png)

## IUserService:
![image.png](https://images.viblo.asia/265bc67c-94a6-4678-aadd-ccc2ac7d1a6a.png)

## UserService:

![image.png](https://images.viblo.asia/ec8bdd66-2c95-41a6-bab8-c1df5ec5bc27.png)

![image.png](https://images.viblo.asia/8c213f9e-8b74-40f2-bf5f-9381db704eec.png)

## UserFilter:

![image.png](https://images.viblo.asia/4d5b58e6-dc3f-4813-bed0-e9031d2ff66b.png)

## FE - Nội dung script file:

![image.png](https://images.viblo.asia/92908ccc-bad4-4892-94dd-89905fb5f1c2.png)

**1. Phương thức "requestData": Dùng để xử lý khi user đăng nhập và đăng ký. Cho phần đăng ký tôi có hướng dẫn trong bài viết trước, bài viết này tôi không sử dụng phương thức đăng ký**

![image.png](https://images.viblo.asia/5eb0f4ad-3ba7-4ffa-b591-e37ff7f9e17f.png)

**2. Phương thức "updateUser": Dùng để xử lý cho cả 2 tạo mới và cập nhật user**

![image.png](https://images.viblo.asia/ff5b4d64-169b-4e47-8614-f7032a83d2fd.png)

**3. Phương thức "deleteUser": Dùng để xử lý cho xoá thông tin user**

![image.png](https://images.viblo.asia/9f92c5f9-6879-4c81-8a50-4f57e219b398.png)

**4. Phương thức "extendToken": Dùng để xử lý tự động trigger call request BE cấp mới token**

![image.png](https://images.viblo.asia/15786db2-9f46-4752-8c9d-3fa91ed01df8.png)