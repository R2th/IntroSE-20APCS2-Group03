Trong bài viết này mình xin được tổng hợp một số chủ đề từ cơ bản đến nâng cao khi lập trình web với Java.

# Mở đầu: Java

Để trở thành một lập trình viên Java, tất nhiên bạn phải biết Java. Java có cú pháp đơn giản, trong sáng, tương đối dễ học. Một số nguồn tài liệu tham khảo cho các bạn mới bắt đầu hoặc muốn chuyên sâu hơn:
- Sách ["Java: A Beginner's Guide"](https://www.amazon.com/Java-Beginners-Eighth-Herbert-Schildt/dp/1260440214): đây là cuốn sách chi tiết và đầy đủ nhất về Java cho người mới học. Cách tiếp cận đơn giản, tương đối dễ hiểu. Ngày xưa thì mình đọc bản dịch tiếng Việt của trường FPT Polytechnic (hồi mới lên đại học vẫn còn lười đọc sách tiếng Anh 😅). Hiện tại các bạn có thể tìm bản tiếng Việt tại thư viện đại học FPT ở Q9.
- [Baeldung.com](https://www.baeldung.com/java-tutorial): đây là chuyên trang công nghệ dành cho developer Java. Có đầy đủ các tutorial từ cơ bản đến nâng cao.
- [Website học Java của Oracle](https://dev.java/learn): cung cấp đầy đủ các bài giảng về Java ở các đợt release mới nhất, đồng thời các tin tức sự kiện liên quan đến Java.
# 1. Spring Core (MVC or Boot)
Spring là hệ sinh thái lớn nhất và mạnh mẽ nhất trong cộng đồng Java. Dù cho dự án Java của bạn không dùng Spring, nhưng bạn cũng nên học về Spring, bởi đây là công nghệ luôn được săn đón bởi rất nhiều công ty trên thị trường.

Một số nguồn tài liệu học Spring:
- Khóa học [Spring & Hibernate trên Udemy](https://www.udemy.com/course/spring-hibernate-tutorial): các bạn có thể canh các đợt sale trên Udemy, khi đấy mỗi khóa học sẽ vào khoảng 9-12 đô (200,000đ - 300,000đ). Đây là một cái giá quá rẻ để đổi lấy một nghề có thu nhập 10-20tr/tháng.
- Tài liệu [Spring Boot miễn phí của Techmaster](https://github.com/TechMaster/SpringBootBasic): sau khi tham khảo nhiều trung tâm thì mình thấy ở Techmaster có bộ giáo trình ổn nhất. Bên cạnh các khóa học có phí thì họ cũng cung cấp tài liệu miễn phí trên Github.
- [Baeldung.com](https://www.baeldung.com/spring-boot): vẫn là Baeldung. Trang này thì mình sẽ còn trích dẫn nhiều lần trong bài viết này.

Dưới đây là một vài chủ đề quan trọng liên quan đến Spring:

_(Chú thích: ✔️ phải nắm vững; 👍 biết cũng được, không biết cũng không sao)_

_(Mình sẽ bỏ qua các kĩ thuật liên quan đến server render như JSP & Thymeleaf, và chỉ tập trung vào Rest API)_

**1. Dependency Injection & Auto-configuration** ✔️

Dependency Injection (DI) và Inversion of Control (IoC) là hai khái niệm quan trọng để hiểu được bản chất & nguyên lý hoạt động của Spring. Từ đó hiểu được nguyên tắc chia business layers 2 lớp hay 3 lớp (controller, service, repository) tùy vào dự án.

Đối với Spring Boot, cần nắm được các cài đặt configuration, bởi mục đích ra đời của Spring Boot là nhằm đơn giản hóa công việc đó hết mức có thể.

**2. [Binding property](https://www.baeldung.com/properties-with-spring) từ biến môi trường và file YAML** ✔️

Mục đích của việc này là để **tránh hard-code**. Mỗi lần có thay đổi gì liên quan đến thông số, chỉ cần sửa lại biến môi trường và restart app, không cần phải compile và deploy lại app.

**3. Validate DTO với Jakarta Bean Validation** ✔️

**4. Handle REST exception với [@ControllerAdvice](https://www.baeldung.com/exception-handling-for-rest-with-spring)** ✔️

Việc xử lý exception cẩn thận ở mức abstract có thể giúp giảm bớt code dư thừa trùng lặp (boilerplate code).

**5. Xử lý multipart-file** ✔️

Xử lý file dữ liệu dạng binary là một kĩ thuật tương đối "lằng nhằng", đòi hỏi việc ghi nhớ các thông số header khi xử lý từ phía client cho đến lúc tiếp nhận request và gửi trả response ở phía server.

Ở chủ đề này thì còn có một vài chủ đề con quan trọng khác như:
- Nhập/xuất dữ liệu dưới dạng file Word/Excel/PDF bằng cách sử dụng JasperReport hoặc Apache POI.
- Xử lý hình ảnh hoặc file để tải lên cloud blobstore như Amazon S3.

**6. Gửi mail với [Spring Mail](https://www.baeldung.com/spring-email)** ✔️

**7. Tạo cronjob tĩnh và động (dynamically) với [@Scheduler, SchedulingConfigurer](https://www.baeldung.com/spring-scheduled-tasks) và [ExecutorService](https://www.baeldung.com/java-executor-service-tutorial)** 👍

Một số nghiệp vụ đòi hỏi phải lên lịch theo nhu cầu người dùng (ví dụ hệ thống đặt lịch hẹn, tự đếm giờ để chuyển trạng thái, tự động gửi thông báo theo thời gian người dùng cài đặt), yêu cầu phải biết kĩ thuật tạo cronjob động theo data của người dùng.

**8. Xử lý bất đồng bộ với [Spring Event](https://www.baeldung.com/spring-events) và [@Async](https://www.baeldung.com/spring-async)** 👍

# 2. Spring Data

Công việc chính của 1 backend là cung cấp API và xử lý dữ liệu. Việc hiểu rõ và hiểu sâu về ORM bên dưới để viết code chuẩn chỉnh, tối ưu performance cũng như giảm thiểu sai sót là một điều hết sức cần thiết.

Bên cạnh những kiến thức cơ bản như:
- Phân biệt được Hibernate và JPA, biết được JDBC là gì
- Biết cách setup datasource cho CSDL tương ứng phù hợp
- Phân biệt được các annotation JPA và biết cách sử dùng Repository với [các loại query khác nhau (JPQL, interface query, native query)](https://www.baeldung.com/spring-data-jpa-query)

Thì còn những chủ đề sau:

**1. Sorting & Pagination** ✔️

Đây là 2 kĩ thuật cơ bản của lập trình web. Tưởng dễ nhưng không dễ chút nào, kể cả với những người đã làm lâu năm.

Khi gặp phải những tình huống như số lượng parameters quá nhiều, các điều kiện query cần join ở bảng khác, hoặc cần sort theo nhiều cấp độ level, thì đòi hỏi các kĩ thuật nâng cao hơn để code abstract và ít boilerplate.

**2. N + 1 problem** ✔️

Đây là vấn đề cực kì quan trọng. Tại sao lại gọi là "N + 1 problem"? Hãy tưởng tượng, khi thiết kế DTO, ta lưu thông tin của một chiếc xe như sau.

```java
@Entity
class Car {
    ...
    @ManyToOne
    Brand brand;
}
```

Khi ta đọc từ database một danh sách các xe, thì truy xuất vào field `car.brand` sẽ có luôn thông tin của hãng xe. Theo lẽ thường tình, chúng ta cho rằng câu query đó chỉ tốn 1 lần truy cập DB với lệnh `JOIN...ON`, hoặc cùng lắm là 2 lần truy cập riêng lẽ danh sách `car` và `brand`.

Nhưng không. Mặc định, JPA sẽ tốn tổng cộng **1 + N lần truy xuất**, trong đó, lần đầu tiên lấy lên n chiếc xe, sau đó tốn thêm **n lần nữa** để lấy lên thông tin của hãng ứng với mỗi xe. Mỗi lần chỉ trả về duy nhất một record. Một pha xử lý cồng kềnh đến bất ngờ. Số lượng xe càng lớn thì performance càng đi vào lòng đất.

Hiểu được bản chất và [cách khắc phục](https://vladmihalcea.com/n-plus-1-query-problem/) sẽ giúp developer bước lên một tầm cao mới.

**3. Dynamic Query với Criteria API và JPA Specification** 👍

Đôi khi chúng ta muốn custom câu query một cách linh động (dynamically), như kiểu thay đổi mệnh đề `WHERE` trong query dựa vào params do client gửi xuống, thì [JPA Criteria API](https://www.baeldung.com/hibernate-criteria-queries) là giải pháp giúm chúng ta làm điều đó. Bộ API này cung cấp việc tạo query bằng code, custom các mệnh đề `FROM`, `WHERE`, `GROUP BY`... hoàn toàn bằng code.

[JPA Specification](https://www.baeldung.com/rest-api-search-language-spring-data-specifications) cũng là một trong số giải pháp mà Spring Data cung cấp. Nó được dùng kết hợp với Criteria API ở những tình huống cụ thể hơn.

**4. Multiple datasource config** 👍

**5. JPA Alternatives** 👍

Hibernate và JPA không phải là giải pháp ORM duy nhất. Chúng ta có các thư viện khác như [MyBatis](https://mybatis.org/mybatis-3/java-api.html) và [QueryDSL](https://github.com/querydsl/querydsl) cũng rất tiện lợi. Đặt biệt là MyBatis, hướng tiếp cận đơn giản của nó hoàn toàn có thể thay thế bộ Criteria API phức tạp mà vẫn giải quyết được vấn đề cấu hình động câu query. Đơn giản như vậy tại sao lại không thử một lần, đúng không?

# 3. Spring Security

Phần này thì không đòi hỏi quá nhiều ở developer, bởi đây là một trong những chủ đề khó nhất khi nhắc đến hệ sinh thái Spring.

Bên cạnh việc authentication, thì authorization (phân quyền) sẽ phụ thuộc vào logic nghiệp vụ và ảnh hưởng đến cách thiết kế database.

**1. CORS, CSRF** ✔️

**2. OAuth - JWT** ✔️

**3. Filter chains** 👍

Đôi khi thay vì dùng cấu hình có sẵn thì chúng ta cần custom một vài thứ liên quan đến luồng đi của request. Khi đó sử dụng `Filter` sẽ là lựa chọn hợp lý. Hơn nữa, bản chất bên dưới của Spring là `HttpServlet`. Nếu đã từng học qua lập trình web với servlet, hẳn bạn sẽ biết kiến trúc cốt lõi của nó đều dựa vào việc build `Filter`.

# Tạm kết

Trên đây là 3 chủ đề chính khi làm việc với Spring.

Phần lớn các tutorial đều có thể tìm thấy trên trang [**Baeldung.com**](https://www.baeldung.com/start-here). Nơi đây quả là "thánh địa" của người chơi hệ Java, chủ đề nào cũng có, level nào cũng có.

Mình sẽ tổng hợp các chủ đề còn lại trong bài tiếp theo. Hẹn gặp lại các bạn.