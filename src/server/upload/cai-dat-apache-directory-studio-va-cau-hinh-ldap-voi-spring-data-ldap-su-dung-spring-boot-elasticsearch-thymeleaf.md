Trong bài viết này tôi hướng dẫn các bạn cấu hình LDAP với Spring Boot:

## Công cụ và thư viện được sử dụng trong bài viết:
+ Spring boot 2.7.4
+ Spring tool suite 4
+ Spring data elasticsearch 4.4.2
+ Spring data Ldap
+ Maven 3
+ Java 11
+ Elasticsearch 7.17.6
+ Kaizen Elastic
+ Apache Directory Studio(2.0.0-M17)
+ ApacheDS(2.0.0.AM26)

## 1. Cấu trúc project:

![image.png](https://images.viblo.asia/c6b4019b-0412-4064-8bf0-a845ede3e7fa.png)

## 2. Cấu trúc file pom:

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
        <artifactId>ldap</artifactId>
        <version>0.0.1-SNAPSHOT</version>
        <name>ldap</name>
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
                <artifactId>spring-boot-starter-data-ldap</artifactId>
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
            <dependency>
                <groupId>org.springframework.ldap</groupId>
                <artifactId>spring-ldap-core</artifactId>
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


## 3. Apache Directory Studio:

Đầu tiên, cần tải về "Apache Directory Studio". Link download:

https://directory.apache.org/studio/download/download-windows.html

Ở đây tôi tải bản mới nhất cho window, tôi chọn file mở rộng là ".exe"

Sau khi cài đặt thành công **Apache Directory Studio** -> mở ứng dụng lên. Nếu bạn nào gặp thông báo lỗi **"Incompatible JVM"** thì có nghĩa là hiện tại phiên bản java các bạn đang sử dụng thấp hơn yêu cầu mà Apache Directory Studio yêu cầu. Phiên bản mới nhất yêu cầu Java tối thiểu là **version 11**

Để giải quyết vấn đề này các bạn cần cài đặt Java version 11 trở lên, ở đây tôi tải bản Java 11 và chọn file mở rộng là ".exe":

**Link download:** https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html

Sau khi cài đặt thành công -> đường dẫn mặc định là: **"C:\Program Files\Java\jdk-11.0.16\bin"**

Các bạn tiến hành cập nhật lại biến môi trường cho Java phiên bản mới, xong mở Command Prompt lên và kiểm tra version đúng chưa:

![image.png](https://images.viblo.asia/bb35ae7e-eabc-4e77-bbd6-4a01362324ac.png)

Nhưng nếu bạn nào gặp vấn đề sau khi nâng cấp thành công, kiểm tra version cũng thấy đã cập nhật đến Java phiên bản mới nhưng khi mở ứng dụng Apache Directory Studio vẫn bán lỗi "Incompatible JVM" thì xử lý như sau:

Các bạn vào thư mục của Apache Directory Studio, mặc định là: **"C:\Program Files\Apache Directory Studio"**

![image.png](https://images.viblo.asia/0e269450-91da-4633-baf2-651d7d2f9cea.png)

Trong thư mục Apache Directory Studio, mở file **"ApacheDirectoryStudio.ini"**, tìm tới dòng:

    #-vm
    #/usr/lib/jvm/java-11-openjdk/bin/java
    
Cập nhật lại dòng **"/usr/lib/jvm/java-11-openjdk/bin/java"** -> đường dẫn chứa Java:

**"/usr/lib/jvm/java-11-openjdk/bin/java" -> "C:\Program Files\Java\jdk-11.0.16\bin"**

![image.png](https://images.viblo.asia/8838d0d7-b800-4639-8a00-378cad7aeaaf.png)

Sau khi cập nhật lại đường dẫn -> bỏ comment ra để sử dụng

Tôi mở Apache Directory Studio lên:

![image.png](https://images.viblo.asia/5c1be9ef-996f-4ab0-91e9-6931892f866a.png)

=> Mở ứng dụng thành công

Tiếp theo, tôi tạo 1 new "Connection", trong mục **"Connections"** click phải chuột và chọn **"New Conection..."**:

![image.png](https://images.viblo.asia/cd235a87-8ad5-441e-806c-114e417a6dd7.png)

Tại giao diện "Connection" -> cấu hình các mục như bên dưới:

+ Connection name: Tuỳ ý. Ở đây tôi để là **"LdapProject"**
+ Hostname: Tôi để **"localhost"**
+ Port: Tôi để **"10389"**
+ Connection timeout (s): Tôi để **"300"**

![image.png](https://images.viblo.asia/413912d3-b5f8-4e12-89b6-4cd74ea7cb78.png)

Giao diện "Authentication":

+ Bind Dn or user: Tôi để **"uid=admin,ou=system"**
+ Password: Tôi để **"secret"**

![image.png](https://images.viblo.asia/a170e32d-5b4b-466a-ba0a-33a135e46cc0.png)

Tiếp theo, click "Finish" -> nó sẽ báo lỗi "cannot_connect_to_server" lý do là chưa cài đặt ApacheDS, tiến hành cài đặt ApacheDS:

Link download: https://directory.apache.org/

Ở đây tôi tải bản mới nhất version **"2.0.0.AM26"**, tôi chọn tải bản **".zip"**:

![image.png](https://images.viblo.asia/f2edf713-9775-4bc1-8583-3b3df92cc861.png)

Sau khỉ tải về, tiến hành giải nén và trong thư mục vừa giải nén tìm đến file "apacheds.bat: -> run file này để start:

![image.png](https://images.viblo.asia/27a393b3-0eb6-4c4f-a715-2d30b1027657.png)

Sau khi start xong, quay lại giao diện LDAP, click phải chuột vào "Connection" vừa tạo -> chọn **"Open connection"** hoặc double click vào tên connection

![image.png](https://images.viblo.asia/2467cb73-79be-45f4-b80a-749878c1a916.png)

=> Start thành công

Sau khi chuẩn bị xong cho phần cài đặt Apache Directory Studio, tôi qua tiếp phần cấu hình Ldap trong Spring Boot

## 4. Nội dung file application:

![image.png](https://images.viblo.asia/b0022984-25bb-494d-b1ae-cba225275932.png)

Ở đây, tôi có enable SSL để cấu hình sử dụng HTTP/2, trong bài viết này không cần cấu hình SSL, các bạn có thể tham khảo làm thế nào để enable SSL và HTTP/2:

https://viblo.asia/p/tao-mot-project-voi-spring-boot-thymeleaf-elasticsearch-su-dung-http2-tao-service-run-elasticsearch-yZjJYjolLOE

## 5. Package "com.example.ldap.application":

![image.png](https://images.viblo.asia/51b96211-0de2-4561-8d52-be5e039b9643.png)

## 6. Package "com.example.ldap.model":

Trong package này tôi tạo 1 class **"User"**:

**Nội dung class "User": Class này tôi sử dụng để khai báo repository cho Elasticsearch**

![image.png](https://images.viblo.asia/51049c89-6186-4d6e-bbb5-9bf86a3256e6.png)

## 7. Package "com.example.ldap.repository":

Trong package này tôi tạo 1 class "UserESRepository" :

**Nội dung class "UserESRepository": **

![image.png](https://images.viblo.asia/a6fc5847-97b1-4d9c-8bfa-2770b0c364da.png)

## 8. Package "com.example.ldap.service":

**Nội dung class "ILdapService":**

![image.png](https://images.viblo.asia/7ccead0f-a8e3-452a-b04b-7b522f0e9945.png)

**Nội dung class "LdapService":**

![image.png](https://images.viblo.asia/1d6b72a4-e463-4363-a5ce-04db647b44a2.png)

![image.png](https://images.viblo.asia/3697aa26-a9f5-47aa-8bb6-e018515b6edf.png)

![image.png](https://images.viblo.asia/d44e7254-bed1-4bc8-a9e2-f1bd95acd64a.png)

## 9. Package "com.example.ldap.controller":

Trong controller, đầu tiên tôi tạo 1 mapping để load page đăng nhập:

![image.png](https://images.viblo.asia/f217c537-ba39-4730-aefd-6b4dbdc0fc9f.png)

Tiếp theo, tôi cần tạo 1 mapping **"/createUser"** để xử lý việc thêm mới user và lưu dữ liệu trong Elasticsearch database và Ldap. Tại Ldap tôi cũng lưu những thông tin cơ bản của user gồm **"userId - firstName - lastName - email - password"**. Tôi không lưu thông tin password trong database ES nữa, thay vào đó tôi dùng Ldap để quản lý thông tin password

Phương thức **"createUser"** trong LdapService:

![image.png](https://images.viblo.asia/bbcdfddf-e508-490f-86f2-27a4509cf9f1.png)

Trước tiên, tôi giới thiệu qua 1 vài thuộc tính phổ biến trong Ldap mà tôi sử dụng trong bài viết này:

+ CN(Common Name): Firstname + Lastname và thuộc tính này là bắt buộc
+ DN(distinguishedName): Trong file application.xml tôi có khia báo 1 thuộc tính **"spring.ldap.base"** với giá trị mặc định là **"dc=example,dc=com"** -> đây là DN. Ví dụ, tôi có 1 **"ou=users"** -> DN sẽ là **"ou=users,dc=example,dc=com"**
+ SN(Lastname)
+ OU(Organizational unit): Tôi lấy ví dụ đơn giản như này. Bạn tạo 1 OU là "useraccounts" trong "dc=example,dc=com" và trong OU đó quản lý nhiều tài khoản user

        dc=example,dc=com
            ou=useraccounts
                cn=user001
                
Tôi đi phân tích những phần chính trong phương thức **"createUser"**:

![image.png](https://images.viblo.asia/4d909c43-f3a4-482b-88fc-bdeb4c37a4d9.png)

Trong đoạn code ở trên, tôi khai báo đường dẫn DN mà tôi sẽ thêm user vào:

    dc=example,dc=com
        ou=users
             cn=user001(đây là user tôi sẽ tạo)
                    
![image.png](https://images.viblo.asia/9e42a9a0-1833-48cd-9334-d1e591dd5d5a.png)

Trong đoạn code trên, tôi thêm thuộc tính **"objectclass"** là **"person"**, tôi lấy ví dụ trực tiếp trên Apache Directory Studio cho dễ hiểu:

Tại **Apache Directory Studio**, tại màn hình **"Attribute Description"** tôi phải chuột và chọn "New Attribute...":

![image.png](https://images.viblo.asia/e916a635-351a-48cc-973e-ecefa04928d1.png)

Tại mục **"Attribute type"** tôi chọn **"objectClass"** -> click **"Finish"**:

![image.png](https://images.viblo.asia/83261e47-5c5d-499a-82aa-aa849b872005.png)

Tại mục **"Available object classes"** tôi chọn "person" như trong code tôi khai báo và tôi click "Add" -> click "Next":

![image.png](https://images.viblo.asia/6623eabc-ca0e-4c92-9d95-bf6960baa1b8.png)

![image.png](https://images.viblo.asia/1610430e-0b41-4c14-b502-5b5f847eb0e5.png)

Tại giao diện **"Attributes"**, các bạn thấy có thêm 2 thuộc tính cần phải nhập dữ liệu là "CN" và "SN" nên trong phương thức "createUser" tôi có thêm 2 thuộc tính đó, giá trị "CN" tôi lấy theo giá trị userId

![image.png](https://images.viblo.asia/7eb77574-b4c8-4ebd-b260-164335f1814a.png)

Tiếp theo, tôi lấy ví dụ cho 1 loại object class khác là **"account"**, quay về giao diện **"Object classes"** tôi remove **"person"** đã thêm trước đó ra và chọn "account" -> click "Add" -> click "Next":

![image.png](https://images.viblo.asia/62482677-ac2c-453b-8457-03cd1a0da16b.png)

![image.png](https://images.viblo.asia/aa7c0245-f39a-47dc-8a99-a1d083fed7d5.png)

=> Các bạn thấy, với object class là **"account"** -> nó không có 2 thuộc tính là bắt buộc là "CN" và "SN" thay vào đó là thuộc tính "UID", nên tuỳ theo lạoi objectClass mà cần phải khai báo các thuộc tính bắt buộc cho phù hợp

Trong phương thức **"createUser"** tôi có khai báo thuộc tính **"userPassword"**, thuộc tính này dùng để lưu thông tin password user và tôi đã có mã hoá password truyền vào với phương thức **"encodeToSHA"**:

![image.png](https://images.viblo.asia/58f0ee89-5bf5-4a51-b066-02d065a9ecb7.png)

Trong class **"LdapService"** tôi sử dụng phương thức **"getUserLdap"** dùng để lấy ra thông tin user lưu trong Ldap dựa vào DN:

![image.png](https://images.viblo.asia/c2f4adb9-5766-473e-ba71-8b016b39f75c.png)

Tôi sử dụng **"ldapTemplate.lookup(dn)"** tìm kiếm theo DN -> nó sẽ trả về 1 single object nếu tìm thấy, ví dụ tôi đang có thông tin user001 như bên dưới:

    dc=example,dc=com
        ou=users
            cn=user001
            
Nếu tôi muốn tìm user001 -> DN lúc này là **"cn=user001,ou=users,dc=example,dc=com"** nghĩa là tìm trong **"dc=example,dc=com"** trong **"ou=users"** có thông tin user nào với **"cn=user001"** hay không

Trong controller, tôi tạo phương thức **"getUserLdap"**:

![image.png](https://images.viblo.asia/1c4a328b-d10f-4b13-9242-3872a185d370.png)

Tiếp theo, tôi quay lại Controller với mapping **"/createUser"**:

![image.png](https://images.viblo.asia/d8fb995b-48e4-4b53-9726-46e3b5f6c0b5.png)

Trong phương thức này, tôi lưu thông tin user đến ES và Ldap

Thông tin password tôi thiết lập theo mẫu: **"P@ssword" + birthDate(yyyyMMdd)**, ví dụ birthDate của user là **"01-01-1986"** -> password sẽ là **"P@ssword19860101"**

Bây giờ, tôi tiến hành kiểm tra với kịch bản tạo 1 user với nội dung:

    {
        "userId":"user001",
        "firstName":"visible",
        "lastName":"mask",
        "email": "abc@example.com",
        "address": "tphcm",
        "birthDate":"1986-01-01
    }
    
Tôi dùng Postman call api "https://localhost:8080/createUser", method là "POST":

![image.png](https://images.viblo.asia/4e8b15fc-5f5c-488f-bcbb-735f8f5741fa.png)

=> Kết quả không tạo được user

Tôi kiểm tra console log, thấy báo lỗi này:

![image.png](https://images.viblo.asia/82c5ec37-8533-481a-9e0d-5e67555f9b76.png)

Nguyên nhân gây ra lỗi này là do trong code tôi có khai báo **"ou=users"** nhưng hiện tại kiểm tra trong DN **"dc=example,dc=com"** không có **"ou=users"**.Tôi chạy Apache Directory Studio kiểm tra lần nữa:

![image.png](https://images.viblo.asia/1d1b244f-8e54-41d3-9071-bb7696916973.png)

=> Không có **"ou=users"** trong DN **"dc=example,dc=com"**

Vậy tôi chỉ cần tạo 1 "ou=users" là xong, tôi giới thiệu 2 cách để thêm "ou=users":

***Cách 1:*** Nhanh nhất, các bạn thấy mặc định có "ou=system", bung cây thư mục ra và tìm đến bất kỳ ou nào, ở đây tôi thấy có "ou=users" -> copy entry này và paste đến DN **"dc=example,dc=com"**:

![image.png](https://images.viblo.asia/4f2f52d7-87d2-404c-abda-d45053c1bb83.png)

Khi paste entry vào, sẽ có thông báo hỏi, các bạn chọn option đầu tiên:

![image.png](https://images.viblo.asia/1d47d72f-b1c8-423f-b3b3-1239558062b2.png)

![image.png](https://images.viblo.asia/461c975c-4065-44f6-95c4-f6da007e2a8f.png)

Như vậy, đã có "ou=users" trong DN **"dc=example,dc=com"**:

***Cách 2:*** Tạo 1 file định dạng "*.ldif" với nội dung:

Tại Apache Directory Studio -> chọn **File -> New** hoặc nhấn tổ hợp phím **"Ctrl + N"**.Tại giao diện **"Select a wizard"** -> bung cây thư mục **"LDAP Bowser"** ra và chọn **"LDIF File"** -> click **"Finish"**:

![image.png](https://images.viblo.asia/6e71af6f-86ae-423d-ab9d-1207305d7d4d.png)

Tôi tạo nội dung như bên dưới và save file này

    dn: ou=users,dc=example,dc=com
    objectClass: organizationalUnit
    ou: users
    
![image.png](https://images.viblo.asia/769ebec3-333f-4c4f-a76e-821b4d726ee2.png)

Tôi khai báo "ou=users" nghĩa là khi tôi import file này đến DN **"dc=example,dc=com"** -> "ou=users" sẽ được tạo, các bạn có thể tuỳ ý tạo ou với tên khác nhau

Để import ldif file, click phải chuột vào DN **"dc=example,dc=com"** -> chọn **"Import"** -> chọn **"LDIF Import..."** -> chọn đến nơi chứa file ldif vừa tạo -> click **"Finish"**:

Các bạn cần chú ý 1 vấn đề, nếu những lần sau các bạn import lại chính file trước đó đã import -> sẽ báo lỗi và lúc này chỉ cần check chọn option **"Overwrite existing logfile"** rồi click **"Finish"**:

Tôi call api **"https://localhost:8080/createUser"** để kiểm tra:

![image.png](https://images.viblo.asia/74303d99-6505-4462-9b0f-3918d945989a.png)

=> Tạo user thành công trong Es và Ldap

Kiểm tra trong Elasticsearch:

![image.png](https://images.viblo.asia/bb399f7f-5f23-46f0-8271-1052f82f1585.png)

Kiểm tra trong Ldap, để reload entry nhấn **"F5"** hoặc chuột phải DN -> chọn **"Reload Entry"**:

![image.png](https://images.viblo.asia/f5398586-d34b-42d5-bb31-1db7768e630e.png)

=> user001 được lưu thành công đến Ldap

Sau khi tạo user thành công, tôi xử lý tiếp cho phương thức **"checkInfoUserLogin"** trong controller:

![image.png](https://images.viblo.asia/27eef32f-3be6-4eef-81ba-e18749b88d10.png)

Trong phương thức **"checkInfoUserLogin"** tôi có sử dụng phương thức **"authenticate"** từ class **"LdapService"** để kiểm userId với password có trong Ldap không:

![image.png](https://images.viblo.asia/7c81e562-86c0-401b-8ac5-41a05863e9d2.png)

Để kiểm tra, tôi phải khai báo đường dẫn DN, ở đây DN là **"cn={userId},ou=users,dc=example,dc=com"**

Tôi thử đăng nhập trang web với thông tin **userId: "user001**" và **password là "P@ssword19860101"**:

![image.png](https://images.viblo.asia/73144a9b-1d56-413b-855a-cb2739ce8afa.png)

=> Đăng nhập thành công và redirect đến dashboard

**Tôi kiểm tra với kịch bản tạo mới với userId đã có:**

![image.png](https://images.viblo.asia/185d0e64-69dc-4d23-b568-03f4f74e11e9.png)

=> Tạo mới không thành công

**Kiểm tra tiếp với kịch bản tạo 1 user khác, ở đây tôi tạo "user002":**

    {
        "userId":"user002",
        "firstName":"mr",
        "lastName":"bear",
        "email": "bear@example.com",
        "address": "tphcm",
        "birthDate":"1988-04-01"
        }
 
![image.png](https://images.viblo.asia/6285ca80-8f13-4696-9967-29b3d22074f5.png)

=> Tạo mới thành công

**Kiểm tra trong ES:**

![image.png](https://images.viblo.asia/754cb7d9-ba49-4b9f-86ab-11c7107f4f80.png)

=> Lưu data thành công

**Kiểm tra trong Ldap:**

![image.png](https://images.viblo.asia/6ee343f4-7faa-4ad8-9300-3c7d6a0eb985.png)

=> Lưu data thành công

**Tôi thử đăng nhập với userId là user002:**

![image.png](https://images.viblo.asia/4d585db3-d6b9-498c-8711-cd3338becbf7.png)

![image.png](https://images.viblo.asia/25010be2-7025-417a-8d2f-40294e377f8b.png)

=> Đăng nhập thành công