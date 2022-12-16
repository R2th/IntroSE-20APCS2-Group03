## 1. Giới thiệu Spring Boot

### 1.1. Spring Boot là gì?

Spring là một Java framework siêu to và khổng lồ, làm được đủ mọi thứ. Nó được chia thành nhiều module, mỗi module làm một chức năng, ví dụ Spring Core, Web, Data access, AOP,... Spring được xây dựng dựa trên 2 khái niệm nền tảng là Dependency injection và AOP (Aspect Oriented Programming).

![](https://images.viblo.asia/013a59c2-6f04-4ba0-8b9c-55c079701098.png)

Một rắc rối khi dùng Spring là việc cấu hình (config) dự án quá phức tạp. Bạn phải làm đủ thứ việc chỉ để tạo một web HelloWorld:

* Tạo Maven hoặc Gradle project
* Thêm các thư viện cần thiết
* Tạo XML để cấu hình project, cấu hình các bean
* Code và build thành file WAR
* Cấu hình Tomcat server để chạy được file WAR vừa build

Đấy, Spring khá mạnh mẽ nhưng việc cấu hình nghe thôi cũng mệt rồi. Do đó Spring boot ra đời, với các ưu điểm:

* Auto config: tự động cấu hình thay cho bạn, chỉ cần bắt đầu code và chạy là được
* Xây dựng các bean dựa trên annotation thay vì XML
* Server Tomcat được nhúng ngay trong file JAR build ra, chỉ cần chạy ở bất kì đâu java chạy được

![](https://images.viblo.asia/b831d7fe-158a-4663-b2d3-6680541e0604.png)

So sánh với Spring, thì Spring Boot bạn chỉ cần:

* Dùng Spring Initializr, nhập các info của project, chọn thư viện rồi down code về
* Mở source code ra và bắt đầu code
* Chạy ngay trong IDE, hoặc build thành file JAR để chạy được ngay, không cần cấu hình server

### 1.2. Tại sao nên học Spring Boot?

Trước đây mình đã có tìm hiểu về Node.js và chuyển sang Spring Boot. Cảm nhận của mình là khi code Spring Boot chúng ta sẽ tập trung nhiều hơn vào business logic, nghĩa là mục tiêu của code làm được gì.

Với Node.js, do nó quá linh hoạt nên bạn sẽ phải tập trung nhiều vào code hơn, thay vì mục đích của code. Kiểu như bạn phải tìm "best practice", "cách tốt nhất" để code điều gì đó.

Nhưng với Spring boot thì khác, có nhiều thư viện có sẵn và cấu trúc code cũng thành chuẩn mực rồi, nên bạn không cần quá quan tâm phải viết code thế nào cho tốt nữa, thay vào đó sẽ tập trung vào logic hơn.

![](https://images.viblo.asia/8e9085d3-14b3-4ae6-bb4c-22038ad365e8.gif)

Mình thấy nhiều bạn hỏi câu này: "Nên học Spring hay Spring Boot trước?". Theo mình thì nên học Spring Boot trước.

Mình nghĩ tư tưởng của nhiều bạn vẫn mang nặng kiểu "cái cũ tốt hơn cái mới", "tìm hiểu từ gốc",... nhưng thực sự khi bắt đầu nên tìm hiểu cái dễ dàng hơn. Vừa đỡ nản, vừa làm được sản phẩm thực tế, trong khi với Spring bạn vẫn còn đang phải cấu hình quá nhiều và chưa làm được gì ra hồn cả.

## 2. Cần tìm hiểu những gì

### 2.1. Java Core

Trước khi học Spring Boot thì các bạn cần biết Java. Một số kiến thức cần thiết của Java như sau:

* Java cơ bản: biến, hàm, vòng lặp,...
* Hướng đối tượng (OOP)
* Java 8: các tính năng mới trong java 8 (tối thiểu phải biết)
* Collections API: biết cách dùng các collection thông dụng (quan trọng)

Ngoài ra các bạn có thể tìm hiểu thêm (không biết cũng không sao vì Spring Boot khá ít đụng tới):

* Stream API
* Asynchronous
* Multi threading
* File IO

### 2.2. Package manager

Khi code dự án Spring Boot thì cần có package manager để quản lý các thư viện cài thêm. Bạn nào code Javascript sẽ biết về NPM và Yarn, thì Java cũng có hai package manager tương tự là Maven và Gradle.

* Tìm hiểu cách dùng Maven cơ bản

* Tìm hiểu cách dùng Gradle cơ bản

Phần này khi mới bắt đầu không nên tìm hiểu quá sâu, chỉ cần biết cách cài đặt thư viện, xóa thư viện, chỉnh sửa thông tin project, các build-in tasks là được. Sau này khi đụng tới nhiều thì bạn tự khắc quen thôi.

### 2.3. Spring Boot

Cách học Spring Boot đúng đắn là học thực hành, làm project. Bởi vì nhiều thứ trong Spring Boot rất dễ, hoặc thành chuẩn mực rồi, chủ yếu là bạn đã từng đụng tới chưa thôi.

* [Học Spring Boot bắt đầu từ đâu](https://viblo.asia/p/hoc-spring-boot-bat-dau-tu-dau-6J3ZgN7WKmB): Bài giới thiệu lộ trình học hôm nay.

* [Tạo dự án Spring Boot đầu tiên](https://viblo.asia/p/tao-du-an-spring-boot-dau-tien-gDVK2L0wlLj): Dùng Spring Initializr để generate code, chọn các dependency, chạy, debug, build JAR và chạy file JAR đó.

* [Luồng đi trong Spring Boot](https://viblo.asia/p/luong-di-trong-spring-boot-ORNZqdELK0n): Tìm hiểu một service Spring Boot gồm những thành phần nào, và luồng đi của dữ liệu ra sao.

* [Dependency injection áp dụng vào Spring Boot như thế nào (phần 1)](https://viblo.asia/p/dependency-injection-ap-dung-vao-spring-boot-nhu-the-nao-phan-1-WAyK8AWWZxX)

* [Dependency injection áp dụng vào Spring Boot như thế nào (phần 2)](https://viblo.asia/p/dependency-injection-ap-dung-vao-spring-boot-nhu-the-nao-phan-2-3P0lP1wG5ox)

* [Bean và ApplicationContext là gì trong Spring Boot](https://viblo.asia/p/bean-va-applicationcontext-la-gi-trong-spring-boot-Ljy5Vjwj5ra): Tìm hiểu cơ bản về Bean và ApplicationContext.

* [Vòng đời, các loại bean và cơ chế component scan](https://viblo.asia/p/vong-doi-cac-loai-bean-va-co-che-component-scan-L4x5x6BrZBM): Tìm hiểu sâu hơn về cách các bean được định nghĩa và xử lý.

* [Cấu trúc một dự án Spring Boot thế nào cho chuẩn](https://viblo.asia/p/cau-truc-du-an-spring-boot-the-nao-cho-chuan-ORNZqdwbK0n): Tìm hiểu các thành phần cơ bản như Controller, Services,... và cách tổ chức chúng trong source code.

* [Entity, DTO và Model](https://viblo.asia/p/entity-domain-model-va-dto-sao-nhieu-qua-vay-YWOZroMPlQ0): Ba đối tượng chứa dữ liệu chính và cách convert, mapping qua lại giữa chúng.

* [Spring Boot xử lý request trong controller như thế nào (phần 1)](https://viblo.asia/p/spring-boot-xu-ly-request-trong-controller-nhu-the-nao-phan-1-gGJ59ANj5X2): Cách controller hoạt động, các loại HTTP method và nhận dữ liệu từ request.

* [Spring Boot xử lý request trong controller như thế nào (phần 2)](https://viblo.asia/p/spring-boot-xu-ly-request-trong-controller-nhu-the-nao-phan-2-3P0lP1og5ox)

* Xử lý request trong Controller (phần 2): Trả về lỗi và xử lý chuyên dụng với các loại data đặc biệt.

* [Xử lý exception phát sinh trong ứng dụng Spring Boot](https://viblo.asia/p/xu-ly-exception-phat-sinh-trong-ung-dung-spring-boot-6J3ZgWkLZmB)

* Validation dữ liệu request - luôn luôn cần thiết

* Tổ chức code service trong Spring Boot: bài ngắn gọn nói sơ qua về vai trò của service layer.

* Xử lý exception hiệu quả trong Spring Boot: Cách tạo Aspect để bắt exception dù nó ném ra ở bất cứ đâu.

* Cấu hình Spring Boot trong file application.properties: đó là gì và kĩ thuật chia cấu hình hiệu quả.

* HTML template và static content: Thư mục template và static là gì, có chức năng như thế nào?

* Scheduled job trong Spring Boot: Tạo và thực hiện tác vụ theo lịch trình đặt sẵn.

* Lập trình hướng khía cạnh AOP không khó như bạn nghĩ: Tìm hiểu về AOP, các khái niệm liên quan và thực hiện một demo logging cơ bản.

### 2.4. JPA/MongoDB

Mình chỉ mới làm quen với Spring Boot được 6 tháng, và project mình làm chỉ về MongoDB thôi. Còn về SQL thì mình sẽ làm sau nhé :)

* Cách cấu hình database trong Spring Boot: Tạo DB, thêm các thông số kết nối và kết nối.

* Cấu trúc lớp và interface của JPA: JPA/MongoDB gồm những interface, class nào, phân cấp ra sau và chức năng của chúng.

* CRUD cơ bản: Tìm hiểu các thao tác cơ bản CRUD.

* Query creation: Tự động sinh câu query dựa trên tên method, hoặc bạn có thể custom nó bằng @Query.

* Thực hiện các câu query phức tạp bằng MongoTemplate: Sử dụng MongoTemplate và các đối tượng như Query, Update,... để thực hiện các hành động phức tạp hơn với query.

* Sắp xếp và phân trang data query được: Sort và paging dữ liệu query, đặc biệt là custom paging bằng skip và limit.

* Thực hiện aggregation: Tổng hợp dữ liệu trong MongoDB

### 2.5. Template engine

Template engine xử lý phần View trong ứng dụng MVC, trong Spring Boot thì chúng ta sử dụng template engine để pass dữ liệu vào View và trả về một trang HTML.

* Trả về trang HTML cơ bản trong Spring Boot

* Sử dụng Thymeleaf trong Spring Boot

* Sử dụng JSP trong Spring Boot

### 2.6. Các tool khác

Ngoài ra, trong dự án Spring Boot sẽ cần một số tool khác được embed vào code. Và bạn cần biết cấu hình và sử dụng chúng để nâng cao năng suất code.

* Cấu hình và sử dụng Swagger trong Spring Boot: Swagger là một tool dùng để xem, chạy, test các API tương tự Postman. Đặc biệt là nó được kèm theo trong chính project của bạn, nó sẽ tự động phân tích metadata của code và sinh API. Ngoài ra Swagger còn có thể generate document từ code của bạn.

* Thiết lập Logger cho project Spring Boot

* Lombok - viết code Java ngắn hơn

* Cấu hình Spring Actuator: Công cụ giám sát, theo dõi tình trạng web service Spring Boot. Actuator sẽ thêm 1 số API để bạn dùng, ví dụ /info hoặc /health để check tình trạng hoạt động của project.

* Quarzt - giải pháp thay thế cho Spring Schedule

* Cấu hình Firebase trong Spring Boot: Sử dụng các tính năng của Firebase như Authentication, Firestore, Storage,... trong dự án Spring Boot.

* Cấu hình Spring Boot devtools: Để có được các tính năng như HotReload.

### 2.7. Nâng cao

* Unit testing: Sử dụng JUnit để test ứng dụng Spring Boot.

* Xuất file Excel trong Spring Boot: Sử dụng Apache POI để tạo và xuất file Excel.

* Cách thêm SSL cho Spring Boot: Làm cho API của bạn hỗ trợ HTTPS

* Cách gửi mail trong Spring Boot

* Cách cấu hình trang 404 và white page

### 2.8. What's next?

Sau khi đã nắm được đủ các kiến thức trên, các bạn có thể tìm hiểu thêm một số thứ khác liên quan Spring Boot.

* Tìm hiểu Spring Security cơ bản

* Xác thực người dùng trong Spring Security bằng session

* Xác thực người dùng trong Spring Security bằng JWT

* Spring batch là gì?

* Spring reactive web: Web framework bất đồng bộ tương tự Node.js nhưng là Java.

Spring Boot mặc định sử dụng ngôn ngữ Java, các bạn có thể tìm hiểu thêm về Kotlin cũng khá hay.

## 3. Good resources

Bên cạnh series này còn có rất nhiều nơi khác viết bài về Spring Boot khá ok. Ví dụ như các trang sau:

- [Series "Làm chủ Spring Boot từ Zero đến Hero" của Loda.me](https://loda.me/courses/spring-boot): Trước mình làm quen với Spring Boot ở trang này, viết khá dễ hiểu và phù hợp với người mới.
- [Laptrinhjavaweb.com](https://laptrinhjavaweb.com/hoc-java-web-mien-phi-7): trang này giúp bạn có cái nhìn tổng quan về Java web.
- [Stackjava.com](https://stackjava.com/category/spring-boot): muốn tìm hiểu thêm các khía cạnh khác thì lên trang này đọc nhé.

Thêm các trang tiếng Anh nữa:

- [Baedung.com](https://www.baeldung.com/): bạn nào học lâu chắc biết trang này rồi, nhiều bài hay về Spring, bao phủ khá toàn diện. Hầu như vấn đề nào gặp phải đều có bài viết trên đây.
- [Vlad Mihalcea](https://vladmihalcea.com/): ông này chuyên về xử lý database trong Java, muốn tìm hiểu sâu thì đọc.

Còn vài trang nữa như Dzone,... mà mình không liệt kê hết ở đây.

À quên nữa, nếu các bạn có thắc mắc hoặc có gì đó cần bổ sung vào series thì hãy comment bên dưới nhé. Nó sẽ giúp mình hoàn thiện series cũng như kiến thức nữa.