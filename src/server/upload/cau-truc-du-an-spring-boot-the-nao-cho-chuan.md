Hello mình đã trở lại với series Spring Boot cơ bản, và hiện tại mình đang nhận thêm một kèo khá ngon nên có thể sẽ ra mắt series mới về Java core :D. Tuy vậy, mình sẽ cố gắng giữ tiến độ 2 bài/tuần của series Spring Boot nhé.

Bài hôm nay chúng ta sẽ tiếp tục với cách tổ chức source code thế nào cho chuẩn Spring Boot nhé.

## 1. Cấu trúc ứng dụng

### 1.1. Cấu trúc chung của ứng dụng

Dù cho project được tạo với Maven hay Gradle thì cấu trúc chung vẫn tương tự nhau, do tuân theo một template có sẵn (tên là Archetype):

* Thư mục gốc chứa các file linh tinh như `pom.xml` (của Maven), `build.gradle` và các file khác như `.gitignore`,... dùng để cấu hình dự án.
* Thư mục `.mvn` hoặc `.gradle` là thư mục riêng của Maven và Gradle, đừng nên đụng tới hay exclude nó ra khỏi source code.
* Code được chứa trong thư mục `src`.
* Thư mục build ra chứa các file class, file JAR. Với Maven là `target` còn Gradle là `build`.

Như đã nói ở trên thì source code chứa trong thư mục `src`. Chúng ta sẽ đi sâu hơn trong phần tiếp theo.

### 1.2. Chi tiết cấu trúc source code

![](https://images.viblo.asia/acca4f65-e51c-45e3-9869-1eb93aea4ea5.png)

Như hình, thư mục chính chúng ta cần quan tâm là `src/main/java/<tên package>`. Mọi code java đều nằm trong này:

* Tên package chính được đặt dạng ngược với tên miền. Ví dụ như `tonghoangvu.com` thì đặt thành `com.tonghoangvu`. Cộng thêm tên project nữa.
* Có các package con, mỗi package đại diện cho các class thuộc layer cụ thể (ví dụ như `service`, `controller`,...)
* Thư mục `resources` chứa các tài nguyên của ứng dụng như hình ảnh, static file, properties file,...

Ngoài ra còn có `src/test` dùng để chứa các test class, dùng cho unit test.

## 2. Tổ chức source code theo mô hình 3 lớp

Dành cho các bạn chưa nhớ về mô hình 3 lớp có thể xem lại bài viết này nhé https://viblo.asia/p/luong-di-trong-spring-boot-ORNZqdELK0n. Thực sự thì mô hình 3 lớp cần thiết phải nắm rõ, vì hầu hết các dự án Spring Boot đều tuân theo mô hình này.

![](https://images.viblo.asia/fdbe3b44-aa91-4a88-9202-814c56ef9178.png)

Tương ứng với từng thành phần của mô hình 3 lớp, thì chúng ta sẽ có các thư mục và cách đặt tên tương ứng:

* Controller layer: đặt trong `controller`, các class là controller sẽ có hậu tố Controller (ví dụ `UserController`, `AuthController`,...)
* Service layer: đặt trong `service`, các class có hậu tố là Service và thường tương ứng với controller (ví dụ `UserService`,...)
* Data access layer: ca này khó, bởi vì layer này bao gồm repository (đặt trong `repository` và hậu tố tương tự), DTO, model, entity... chi tiết mình sẽ nói ở các bài sau.

Ngoài ra, với các loại khác thì:

* `util` package chứa các lớp util (xử lý linh tinh), ví dụ như convert end date, tính toán đơn giản,...
* `common` package chứa các class định nghĩa như enum, interface, class dùng chung và đơn giản
* `exception` package chứa các class có nhiệm vụ xử lý exception trong Spring Boot.
* `component` chứa các bean được định nghĩa còn lại nhưng không thuộc layer nào.

Xong, hầu hết ứng dụng Spring Boot có tới 80% cấu trúc tương tự. Khác biệt là rất nhỏ, chỉ đơn giản nằm trong cách đặt tên thôi.

## 3. Tổ chức code theo tính năng

Cách này có hơi khác với cách tổ chức theo mô hình 3 lớp ở trên. Cụ thể thay vì chia thành các package dựa theo layer, thì cách này chia theo tính năng. Nghĩa là mỗi tính năng, ví dụ `user` package thì sẽ chứa nào là `UserController`, `UserService`,...

![](https://images.viblo.asia/1cec4334-cbc8-4deb-a162-24dc8b936c47.png)

Thú thực đây là lần đầu mình thấy kiến trúc kiểu này, nhưng nó khá hay và phù hợp khi dự án có nhiều tính năng.

Nguồn tham khảo ở đây https://shareprogramming.net/wp-content/uploads/2021/01/project-structure-1.png.

---

Vậy là bài viết hôm nay đã kết thúc rồi. Nhấn vote hoặc clip bài viết nếu thấy hay nhé. Mãi thân.