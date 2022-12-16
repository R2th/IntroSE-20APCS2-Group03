# Giới thiệu
Thời gian tới ở công ty mình có về 1 dự án web sử dụng ngôn ngữ kotlin, xuất thân từ 1 dev java và có thời gian dài làm việc với php thì mình được sếp giao cho tìm hiểu về ngôn ngữ kotlin để chuẩn bị cho dự án mới, tranh thủ vọc vạch được chút nên mình viết bài này để chia sẻ lại cho mọi người :yum:
- Kotlin - phiên bản nâng cấp của Java: bắt đầu được phát triển vào năm 2010 bởi 1 công ty rất nổi tiếng về các IDE là [JetBrains](https://vi.wikipedia.org/wiki/JetBrains)
- Học hỏi nhiều từ những ngôn ngữ khác, là tập hợp của những cái hay, cái mới nhất của những ngôn ngữ đó như: java, python, swift, javascript, …
- Tại sự kiện `Google I/O 2017` kotlin đã được Google thông báo là `Android official language`
- Ngoài việc hỗ trợ mạnh cho android ra thì kotlin còn hỗ trợ các nền tảng khác như: `mobile cross-platform`, `native`, `data science`, `server-side`, `web development`
- Trong bài này thì mình sẽ hướng dẫn mọi người bắt đầu với nền tảng `server-side`
- Ở trên tại sao mình lại nói "kotlin là phiên bản nâng cấp của java" bởi kotlin sử dụng các thư viện của java để phát triển (1 số thư viện hiện nay đã phát triển bằng kotlin) và chạy trên máy ảo java (jvm), vì vậy trong code kotlin thì chúng ta có thể sử dụng java
- Theo nhận định thì kotlin được dự đoán sẽ thay thế hoàn toàn java trong tương lai
- Để thực hiện phát triển kotlin trên nền tảng `server-side` thì mình có sử dụng 1 framework phát trển java web khá nổi tiếng là `spring`, hiện tại thì framework này cũng đã hỗ trợ kotlin, ngoài ra mọi người có thể sử dụng các framework khác như: Javalin, KTor, Spark, Vert

# Cài đặt môi trường
- `IDE`: `IntelliJ`
- `CSDL`: `MySQL`
- Công cụ làm việc với API: `Postman`

# Cài đặt dự án
- Ấn vào link [start.spring](https://start.spring.io/#!type=gradle-project&language=kotlin&platformVersion=2.3.1.RELEASE&packaging=jar&jvmVersion=1.8&groupId=com.example&artifactId=crud_kotlin&name=crud_kotlin&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.crud_kotlin&dependencies=web,data-jpa,devtools,mysql) (mình đã chọn sẵn các dependencies cơ bản nếu thích mọi người có thể tùy chỉnh lại hoặc thêm vào file `build.gradle.kts`  sau khi đã tải src code về)
- Chọn `generate` để tải về sau đó giải nén, mở bằng `IntelliJ` đã cài đặt ở trên và đợi cho `IDE` cài đặt xong các gói cần thiết

# Kết nối MySQL
Tạo database `crud_kotlin` sau đó mở file **src/main/resources/application.properties** và thêm vào nội dung bên dưới (sửa lại username và password nếu bạn không dùng tài khoản mặc định)
```kotlin
spring.datasource.url=jdbc:mysql://localhost:3306/crud_kotlin
spring.datasource.username=root
spring.datasource.password=
```

# Hello world
- Tạo class controller `HomeController` **src/main/kotlin/com/example/crud_kotlin/HomeController.kt** và thay nội dung bên dưới vào 
    ```kotlin
    package com.example.crud_kotlin

    import org.springframework.web.bind.annotation.GetMapping
    import org.springframework.web.bind.annotation.RestController

    @RestController
    class HomeController {

        @GetMapping
        fun index(): String {
            return "Hello world"
        }
    }
    ```
- Mở file **src/main/kotlin/com/example/crud_kotlin/CrudKotlinApplication.kt**, ấn vào biểu tượng hình tam giác bên trái hàm main và chọn `Run 'CrudKotlinApplication'` để chạy ứng dụng, khi run nếu IDE yều cầu cài thêm 1 số thành phần để hỗ trợ việc build như JDK, JVM, JRE, ...thì mọi người cứ thực hiện cài đặt thêm bình thường
- Mặc định khi chạy sẽ dùng cổng 8080, nếu trên máy đang dùng cổng này rồi thì trên console của IDE sẽ báo lỗi thì mọi người mở file **src/main/resources/application.properties** để cấu hình lại cổng 
    ```kotlin
    server.port=9999
    ```
- Sau đó truy cập vào địa chỉ để test: http://localhost:8080
- **Trong quá trình code thì có 1 lưu ý mọi người phải nhớ là khi thực hiện sửa bất cứ đoạn code nào mà muốn trình duyệt nhận mới thì đều phải thực hiện `Run 'CrudKotlinApplication'` lại để IDE build lại code mới**
# CRUD
### Model
- Mỗi model (entity) trong spring tương ứng với 1 table, mỗi thuộc tính tương ứng với 1 column trong database
- Để demo mình sẽ thiết kế bảng `user` bao gồm 3 cột `id, name, phone`
- Tương ứng với bảng đã thiết kế ở trên thì mình sẽ tạo 1 model có tên là `User` và bao gồm 3 thuộc tính
- Tạo class model `User` **src/main/kotlin/com/example/crud_kotlin/User.kt** và thay nội dung bên dưới vào
    ```kotlin
    package com.example.crud_kotlin

    import javax.persistence.*

    @Entity
    data class User(
            @Id
            @GeneratedValue(strategy = GenerationType.IDENTITY)
            val id: Long? = null,
            val name: String,
            val phone: Int
    )
    ```
- Mặc định trong spring không có cơ chế quản lý migration, mọi người sẽ tự tạo bảng thủ công hoặc dùng cơ chế tự động thêm-xoá bảng cột tương ứng với model khi khởi tạo ứng dụng
- Để bật cơ chế tự động thêm-xoá thì mọi người mở file **src/main/resources/application.properties** và thêm vào nội dung bên dưới
    ```kotlin
    spring.jpa.hibernate.ddl-auto=create-drop
    ```
- Ngoài ra nếu mọi người không thích cơ chế tự động này của spring thì có thể cài thêm package flyway để quản lý lịch sử sửa đổi

### Repository
- Ở bước trên mình đã tạo được bảng và model tương ứng, giờ chúng ta sẽ tạo `repository` để thực hiện truy vấn vào `database`, trong spring đã xây dựng các hàm cơ bản để thao tác với database nên mọi người sẽ extends interface `JpaRepository` và truyền vào model tương ứng
- Tạo interface repository `UserRepository` **src/main/kotlin/com/example/crud_kotlin/UserRepository.kt** và thay nội dung bên dưới vào
    ```kotlin
    package com.example.crud_kotlin

    import org.springframework.data.jpa.repository.JpaRepository
    import org.springframework.stereotype.Repository
    import javax.transaction.Transactional

    @Repository
    @Transactional(Transactional.TxType.MANDATORY)
    interface UserRepository: JpaRepository<User, Long>
    ```
- Ngoài các hàm đã được hỗ trợ trong `JpaRepository` mọi người có thể khai báo các hàm tuỳ chỉnh ở đây theo cú pháp `JpaRepository`, phần này mọi người tìm hiểu thêm trong bài này mình chỉ demo các hàm cơ bản nên không cần khai báo thêm gì

### Service
- Để xử lý logic trong ứng dụng cũng như lấy query dữ liệu thông qua repository mình sẽ tạo 1 class service
- Tạo class service `UserService` **src/main/kotlin/com/example/crud_kotlin/UserService.kt** và thay nội dung bên dưới vào
    ```kotlin
    package com.example.crud_kotlin

    import org.springframework.http.HttpStatus
    import org.springframework.http.ResponseEntity
    import org.springframework.stereotype.Service

    @Service
    class UserService(private val userRepository: UserRepository) {
        fun index(): List<User> {
            return userRepository.findAll()
        }

        fun store(user: User): ResponseEntity<User> {
            return ResponseEntity.ok(userRepository.save(user))
        }

        fun show(userId: Long): ResponseEntity<User> {
            return userRepository.findById(userId).map { user ->
                ResponseEntity.ok(user)
            }.orElse(ResponseEntity.notFound().build())
        }

        fun update(userId: Long, newUser: User): ResponseEntity<User> {
            return userRepository.findById(userId).map { currentUser ->
                val updatedUser: User =
                        currentUser
                                .copy(
                                        name = newUser.name,
                                        phone = newUser.phone
                                )
                ResponseEntity.ok().body(userRepository.save(updatedUser))
            }.orElse(ResponseEntity.notFound().build())
        }

        fun destroy(userId: Long): ResponseEntity<Void> {
            return userRepository.findById(userId).map { user ->
                userRepository.delete(user)
                ResponseEntity<Void>(HttpStatus.ACCEPTED)
            }.orElse(ResponseEntity.notFound().build())
        }
    }
    ```

### Controller
- Cuối cùng để định nghĩa các router và các đoạn xử lý tương ứng với router mình sẽ tạo 1 class controller, xử lý thì mình sẽ gọi từ controller vào service đã định nghĩa phía trên
- Phía dưới thì mình có định nghĩa router có dạng `/users` để thực hiện CRUD theo đúng chuẩn `RESTful API` (nếu bạn nào chưa biết thì có thể google đọc thêm nhé ^^)
- Tạo class controller `UserController` **src/main/kotlin/com/example/crud_kotlin/UserController.kt** và thay nội dung bên dưới vào
    ```kotlin
    package com.example.crud_kotlin

    import org.springframework.http.ResponseEntity
    import org.springframework.web.bind.annotation.*

    @RestController
    @RequestMapping("users")
    class UserController(private val userService: UserService) {

        /**
         * Read
         */
        @GetMapping
        fun index(): List<User> {
            return userService.index()
        }

        /**
         * Create
         */
        @PostMapping
        fun store(
                @RequestBody user: User
        ): ResponseEntity<User> {
            return userService.store(user)
        }

        /**
         * Read
         */
        @GetMapping("/{id}")
        fun show(
                @PathVariable(value = "id") userId: Long
        ): ResponseEntity<User> {
            return userService.show(userId)
        }

        /**
         * Update
         */
        @PutMapping("/{id}")
        fun update(
                @PathVariable(value = "id") userId: Long,
                @RequestBody newUser: User
        ): ResponseEntity<User> {
            return userService.update(userId, newUser)
        }

        /**
         * Delete
         */
        @DeleteMapping("/{id}")
        fun destroy(
                @PathVariable(value = "id") userId: Long
        ): ResponseEntity<Void> {
            return userService.destroy(userId)
        }
    }
    ```
- Test thì mọi người có thể sử dụng tool `postman` để thao tác và truyền dữ liệu qua đường dẫn `/users` theo đúng chuẩn `RESTful API`, phần này chắc anh em làm web biết rồi nên mình xin phép không dài dòng ^^

# Đọc thêm 
- Java to kotlin: https://fabiomsr.github.io/from-java-to-kotlin
- Migration: flyway
- Authorization: spring security + jwt
- Template engine: mustache

# Tài liệu tham khảo
- https://spring.io/guides/tutorials/spring-boot-kotlin
- https://spring.io/guides/gs/accessing-data-mysql
- https://dev.to/grekz/tutorial-creating-a-rest-api-with-kotlin-springboot-jpa-flyway-15j5