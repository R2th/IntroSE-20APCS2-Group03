## 1. Chuẩn bị

Đối với Spring Boot thì các bạn có thể chọn một trong hai IDE là Eclipse (miễn phí) và IntelliJ IDEA Ultimate (bản Community không có hỗ trợ Spring). Tải xuống tại đây:

* Eclipse: https://www.eclipse.org/downloads/
* IntelliJ IDEA: https://www.jetbrains.com/idea/download/

Mình khuyến khích các bạn dùng IntelliJ, vì code rất sướng và ít lỗi vặt như Eclipse. Với IntelliJ thì có plugin sẵn rồi, không cần cài nhiều. Còn Eclipse bạn cần cài thêm STS (Spring tool suite). Có thể download JAR tại đây, hoặc tìm trong Marketplace của Eclipse.

Trong phần sau, mình sẽ sử dụng IntelliJ để demo nhé.

## 2. Spring initializr

Spring Boot có một công cụ giúp chúng ta nhanh chóng khởi tạo project gọi là Spring Initializr. Spring Initializr có thể truy cập trên web tại http://start.spring.io/, hoặc với IntelliJ thì có tích hợp luôn vào khi tạo project luôn.

![](https://images.viblo.asia/1b4d1cbd-0296-45a7-b565-83f03dd0981a.png)

### 2.1. Khai báo thông tin project

Như hình trên, ở ngăn bên trái là nơi chúng ta khai báo một số thông tin project như:

* Loại project: là chọn loại package manager nào, Maven hoặc Gradle.
* Language: chọn ngôn ngữ code, ở đây mình chọn Java
* Phiên bản Spring Boot: Các version có SNAPSHOT là bản chưa ổn định, không nên chọn
* Loại file build ra: với Spring Boot thì nên chọn JAR để đỡ cấu hình Tomcat server
* Phiên bản Java: chọn java 11 để ổn định

Ngoài ra cũng cần khai báo thêm các metadata như tên project, tên package, artifact,...

### 2.2. Chọn dependency

Ngăn bên phải là chọn các dependency, có thể hiểu là các thư viện phụ trợ. Để code được web service bạn cần có Spring web. Các thư viện khác có ý nghĩa như sau:

* Lombok: nên chọn, nó giúp code Java ngắn hơn, nhưng cần cài thêm plugin Lombok vào IDE nữa
* Thymeleaf: chưa cần, Thymeleaf sẽ giúp pass data vào view của mô hình MVC, trả về trang HTML có data cho client
* Spring configuration processor, Spring devtools là các tool hỗ trợ thêm khi code thôi

Trong phần này, mình khuyến  khích các bạn chọn gồm: Spring Web, Lombok, Thymeleaf.

![](https://images.viblo.asia/5fdbcf68-9720-4985-866f-ab5d8d75f949.png)

### 2.3. Hoàn tất

Sau khi xong, các bạn nhấn nút Generate là xong. Một file zip chứa source ban đầu sẽ được tải về, chỉ cần giải nén và bắt đầu code.

Cấu trúc project được khởi tạo sẵn như sau.

![](https://images.viblo.asia/c6f05fac-6eec-48ce-9fa5-67d2ec783bc6.png)

## 3. Code chương trình đơn giản

Phần này mình sẽ hướng dẫn tạo một web trả về HTML đơn giản khi người dùng truy cập.

**B1. Tạo Controller đơn giản**

Controller là thành phần đầu tiên để bắt URL người dùng truy cập. Ví dụ bạn vào trang chủ của web, thì controller method có mapping tới URL / sẽ được gọi.

Các bạn chuột phải vào entry bên trái có tên là `com.abc.xyz`, chọn New > Java class. Đặt tên là `HomeController` và gõ code sau vào.

```java
package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;

@Controller  // Chỉ định HomeController là Controller
public class HomeController {
    // Khi user truy cập vào endpoint / thì homepage() được gọi
    @GetMapping("/")
    public String homepage() {
        return "index";  // Trả về trang index.html
    }
    
    // Có thể mapping thêm các endpoint khác nữa...
}
```

Web này khá đơn giản, chỉ có 1 endpoint là / (trang chủ). Spring Boot sử dụng các `@Annotation` để chỉ định ý nghĩa một số thành phần trong code, theo mình nó khá là hay và giúp code dễ hiểu hơn.

**B2. Tạo trang HTML để trả về**

Như trên chúng ta có `HomeController`, khi truy cập vào `/` sẽ trả về trang `index.html`. Các bạn chuột phải vào thư mục `resources/template`, chọn `New > HTML file` và gõ tên `index.html` vào.

Nếu bạn chưa biết HTML thì hãy gõ theo như sau, còn biết rồi thì có thể tự do custom tùy ý.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Spring Boot web</title>
</head>
<body>
    Hello World!
</body>
</html>
```

Bước này các bạn cần chú ý phải cài thư viện Thymeleaf nhé nếu không nó không nhận đâu.

**B3. Chạy và xem kết quả**

Nhấn nút màu xanh ở trên cùng bên phải IDE để chạy chương trình. Việc khởi động tùy vào kích thước dự án, nếu project trống thì sẽ khởi động rất nhanh.

Do bạn chưa cấu hình port cho web, nên mặc định Spring Boot sẽ lấy port 8080 để chạy, hoặc port trống khác trên máy bạn. Có thể xem trong console của IDE là web đang chạy port nào (dòng `Tomcat started on port(s): 8080`)

Sau đó mở trình duyệt và truy cập `localhost:8080` hoặc thay bằng port của bạn. Kết quả là đây.

![](https://images.viblo.asia/06876f0e-1bed-4f01-aa09-46a1c70a6c79.png)

## 4. Chạy chương trình

### 4.1. Chạy trong IDE

Phần này khỏi nói đi ha, quá cơ bản rồi. Chỉ cần nhấn một trong hai nút màu xanh ở trên bên phải là được :D

### 4.2. Build thành file JAR

Để build thành file JAR, cần chạy các task tương ứng với package manager đã chọn. Nếu project dùng Maven cần chạy task **jar**, còn Gradle thì là **bootJar**.

![](https://images.viblo.asia/2e6d323d-95aa-43d0-9a4e-6afb86a982f1.png)

Sau khi đợi một lúc thì Maven hoặc Gradle sẽ build ra thư mục chứa các file class và JAR:

* Maven là thư mục target, ngay bên trong có file JAR luôn
* Gradle là thư mục build, file JAR nằm bên trong thư mục con libs

### 4.3. Chạy file JAR

Sau khi đã có file JAR, các bạn dùng command sau để chạy. Quá trình chạy diễn ra tương tự khi Run trong IDE.

```shell
java -jar ABC.jar
```

File JAR này có thể chạy ở mọi nơi chạy được java, trên máy bạn hoặc server đều chạy giống nhau. Lý do bởi vì bên trong file JAR đã được nhúng sẵn server Tomcat luôn rồi.