## 1. Giới thiệu
### 1.1  Ngôn ngữ Kotlin
Kotlin là ngôn ngữ lập trình được phát triển bởi JetBrains. Nó xuất hiện lần đầu năm 2011 khi JetBrains công bố dự án của họ mạng tên "Kotlin". 
Đây là một ngôn ngữ mã nguồn mở. Về cơ bản, cũng như Java, C hay C++ , Kotlin cũng là "ngôn ngữ lập trình kiểu tĩnh".
Nghĩa là các biến không cần phải định nghĩa trươc khi sử dụng. Kiểu tĩnh thực hiện việc kê khai nghiêm ngặt hoặc khởi tạo các biến trước khi chúng được sử dụng
Kiểu tĩnh không có nghĩa chúng ta phải khai báo tất cả các biến lúc đầu trước khi sử dụng chúng. Các biến có thể được khởi tạo bất cứ nơi nào trong chương trình và chúng ta có thể sử dụng chúng bất cứ nơi nào khi cần.
có thể tham khảo thêm tại [đây](https://viblo.asia/p/kotlin-phien-ban-nang-cap-cua-java-Do754NLXZM6)
#### Điểm mạnh của Kotlin
* Kotlin biên dịch thành JVM bytecode hoặc JavaScript - Giống như Java, Bytecode cũng là format biên dịch cho Kotlin. Bytecode nghĩa là một khi đã biên dịch, các đoạn code sẽ chạy thông qua một máy ảo thay vì một bộ xử lý. Bằng cách này, code có thể chạy trên bất kỳ nền tảng nào, khi nó được biên dịch và chạy thông qua máy ảo. Khi Kotlin được chuyển đổi thành bytecode, nó có thể truyền được qua mạng và thực hiện bởi JVM
* Kotlin có thể sử dụng tất cả các nền tảng và thư viện Java hiện có - Bất kể là nền tảng cao cấp dựa trên xử lý annotation. Điều quan trọng là Kotlin dễ dàng tích hợp với Maven, Gradle hay các hệ thống build khác. 
* Chuyển đổi tự động Java thành Kotlin - JetBrains tích hợp chức năng mới vào IntelliJ để chuyển đổi Java thành Kotlin và điều này tiết kiệm một lượng thời gian rất lớn. Nó cũng giúp chúng ta không phải code lại kiểu tay to
* Review code không còn là vấn đề - Kotlin tập trung nhiều hơn vào việc cú pháp dễ hiểu, dễ đọc để review, chúng có thể hoàn thành bởi những thành viên team chưa quen với ngôn ngữ này.
### 1.2 Spring boot
Spring là một framework dựa trên ngôn ngữ JAVA giúp các nhà phát triển xây dựng những hệ thống và ứng dụng chạy trên JVM (Java virtual machine) một cách đơn giản, tiện gọn, nhanh chóng và mềm dẻo
Spring Boot là một dự án khá nổi bật trong hệ sinh thái Spring Framework. Nếu như trước đây, công đoạn khởi tạo một dự án Spring khá vất vả từ việc khai báo các dependency trong file pom.xml cho đến cấu hình bằng XML hoặc annotation phức tạp, thì giờ đây với Spring Boot, chúng ta có thể tạo dự án Spring một cách nhanh chóng và cấu hình cũng đơn giản hơn. Dưới đây là một số tính năng nổi bật của Spring Boot:
* Tạo các ứng dụng Spring độc lập
* Nhúng trực tiếp Tomcat, Jetty hoặc Undertow (không cần phải deploy ra file WAR)
* Các starter dependency giúp việc cấu hình Maven đơn giản hơn
* Tự động cấu hình Spring khi cần thiết
để tìm hiểu sâu hơn về framework này, mọi người có thể tham khảo thêm tại [đây](https://kipalog.com/posts/Gioi-thieu-Spring-Framework)
### 1.3 JPA
JPA (Java Persistence API) là 1 giao diện lập trình ứng dụng Java, nó mô tả cách quản lý các mối quan hệ dữ liệu trong ứng dụng sử dụng Java Platform.

JPA cung cấp một mô hình POJO persistence cho phép ánh xạ các table/các mối quan hệ giữa các table trong database sang các class/mối quan hệ giữa các object.

Ví dụ: table Users với các column (Id, name, age…) sẽ tương ứng với class Users.java với các field Id, name, age… từ đó mỗi khi truy vấn table hay các column ta sẽ truy vấn trực tiếp trên các class, các field của class mà không cần quan tâm tới việc đang dùng loại database nào, dữ liệu database ra sao
## 1.4 Hibernate
Hibernate là 1 ORM (Object Relational Mapping) framework cho phép người lập trình thao tác với database một cách hoàn toàn tự nhiên thông qua các đối tượng. Lập trình viên hoàn toàn không cần quan tâm đến loại database sử dụng, SQL…
Hay nói cách khác, Hibernate chính là cài đặt của JPA (JPA là 1 tập các interface, còn Hibernate implements các interface ấy 1 cách chi tiết)
## 2. Xây dựng Restful APIs đơn giản sử dụng Kotlin, Spring Boot, Mysql, JPA and Hibernate
### 2.1 Giới thiệu ứng dụng
Đây là phần chính bài viết của mình. Mình sẽ viết một app nhỏ xây dựng một Restful API bằng ngôn ngữ Kotlin và framework Sping boot.
Trong app này, mình sẽ xây dựng một API cho phép tạo các sản phẩm gồm các trường name và description
các chức năng cơ bản mà mình sẽ viết:
1. POST /api/products - Tạo sản phẩm
2. GET /api/products - Lấy danh sách sản phẩm
3. GET /api/products/{id} - Lấy một sản phẩm dựa vào `id`
4. PUT /api/products/{id} - Chỉnh sửa sản phẩm dựa vào `id`
5. DELETE /api/products/{id} - Xóa một sản phẩm dựa vào `id`
### 2.2 Xây dựng ứng dụng
#### 2.2.1 Khởi tạo ứng dụng
 Để khởi tạo một ứng dụng Spring sử dụng Kotlin, chúng ta truy cập vào trang web sau: http://start.spring.io/. Trang này cho phép bạn khởi tạo ứng dụng Spring cùng Java hoặc Kotlin với các Dependencies cần thiết cho project của bạn.
Các bước để tạo một ứng dụng mới:
1. Truy cập http://start.spring.io
2. Nhập tên projec.VD: kotlin-demo
3. Lựa chọn ngôn ngữ, ở đây ta chọn Gradle và Kotlin, phiên bản Java sẽ là Java 8
4. Lựa chọn phiên bản Spring Boot.
5. Generate Project để tạo project và tải xuống.

![](https://images.viblo.asia/6c30bb1f-10bd-4235-859c-0d39e57447ea.png)

Sau khi giải nén folder vừa tải về và mở với Intelij, IDE sẽ tự động tải và cài đặt các gói dependences. 

![](https://images.viblo.asia/73ad62f2-4be4-4c1e-b177-a81b6c37268f.png)

Sau khi hoàn thành, ta sẽ có cấu trúc project như sau:

![](https://images.viblo.asia/0fc69af5-49d7-44f7-abfb-4186fdd6a4bd.png)

Bên trong file build.gradle.kts chúng ta thêm các dependencies như sau:

```
implementation("org.springframework.boot:spring-boot-starter-data-jpa")
implementation("org.springframework.boot:spring-boot-starter-web")
implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
implementation("org.jetbrains.kotlin:kotlin-reflect")
implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
implementation("org.springframework.boot:spring-boot-starter-validation")
runtimeOnly("mysql:mysql-connector-java")
testImplementation("org.springframework.boot:spring-boot-starter-test")	
```


### 2.2.2 Kết nối cơ sở dữ liệu MySQL
Trước tiên, bạn cần tạo bảng để lưu trữ cơ sở dữ liệu. Sau đó là các cấu hình về tên bảng, đường dẫn, tên người dùng và mật khẩu để cho Spring boot có thể kết nối và tạo dữ liệu trong DB.
mở file `src/main/resources/application.properties` và thêm đoạn code sau:
```
## Spring DATASOURCE (DataSourceAutoConfiguration & DataSourceProperties)
spring.datasource.url = jdbc:mysql://localhost:3306/kotlin_demo_app?autoReconnect=true&useUnicode=true&characterEncoding=UTF-8&allowMultiQueries=true&useSSL=false
spring.datasource.username = root
spring.datasource.password = 12345678


## Hibernate Properties

# The SQL dialect makes Hibernate generate better SQL for the chosen database
spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.MySQL5InnoDBDialect

# Hibernate ddl auto (create, create-drop, validate, update)
spring.jpa.hibernate.ddl-auto = update
```
`kotlin_demo_app` là tên DB
`spring.datasource.username và spring.datasource.password` lần lượt là tài khoản đăng nhập vào MySQL của bạn.

### 2.2.3 Tạo Model
Bây giờ chúng ta tiến hành tạo model Products.

Trước tiên ta tạo packet `model` bên trong `com.example.kotlindemo`. Trong package `model` tạo file Product.kt với nội dung:

```
package com.example.kotlindemo.model

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.validation.constraints.NotBlank

@Entity
@Table(name = "products")
data class Product(
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  val id: Long = 0,

  @NotBlank
  @Column
  var name: String? = "",

  @NotBlank
  @Column
  var description: String? = "",
)
```

Sử dụng `@Entity` cho phép định nghĩa một lớp có thể được ánh xạ bởi một bảng trong cơ sở dữ liệu.
Ở đây mình sử dụng `data class` nó cho phép định nghĩa sẵn các hàm
* equals()/hashCode()
* toString()
* componentN()
* copy()
và các hàm này có thể sử dụng ngay.
### 2.2.4 Tạo Repository (JPA)
Repository cho phép chúng ta có thể truy cập dữ liệu từ database.
Đầu tiên ta cần tạo một packet có tên repository trong thư mục `com.example.kotlindemo`. Sau đó tạo file ProductRepository.kt bên trong package repository với nội dung: 

```
package com.example.kotlindemo.repository

import com.example.kotlindemo.model.Product
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ProductRepository : JpaRepository<Product, Long>
```

Việc kế thừa JpaRepository interface cho phép sử dụng các phương thức CRUD đã được định nghĩa sẵn để sử dụng trong Product mà không phải mất công xây dựng lại. Một trong những tính năng nổi bật của Spring boot.

### 2.2.5 Tạo Controller
Tiếp theo, chúng ta sẽ tiến hành tạo controller end-points để thực hiện các thao tác CRUD cho model Product
Trong thư mục `com.example.kotlindemo` chúng ta tạo thêm packet `controller`. Sau đó tạo thêm file `ProductController.kt` và thêm vào đoạn code sau: 

```
package com.example.kotlindemo.controller

import com.example.kotlindemo.model.Product
import com.example.kotlindemo.repository.ProductRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*
import javax.validation.Valid

@RestController #Sử dụng RestController của Spring boot
@RequestMapping("/api")
class ProductController(private val productRepository: ProductRepository) {

    @GetMapping("/products")
    fun getAllProducts(): List<Product> =
            productRepository.findAll()

    @PostMapping("/products")
    fun createNewProduct(@Valid @RequestBody product: Product): Product =
            productRepository.save(product)

    @GetMapping("/products/{id}")
    fun getProductById(@PathVariable(value = "id") productId: Long): ResponseEntity<Product> {
        return productRepository.findById(productId).map { product -> 
            ResponseEntity.ok(product)
        }.orElse(ResponseEntity.notFound().build())
    }

    @PutMapping("/products/{id}")
    fun updateProductById(@PathVariable(value = "id") productId: Long,
            @Valid @RequestBody newProduct: Product): ResponseEntity<Product> {

        return productRepository.findById(productId).map { existingProduct ->
            val updatedProduct: Product = existingProduct
                    .copy(name = newProduct.name, description = newProduct.description)
            ResponseEntity.ok().body(productRepository.save(updatedProduct))
        }.orElse(ResponseEntity.notFound().build())

    }

    @DeleteMapping("/products/{id}")
    fun deleteProductById(@PathVariable(value = "id") productId: Long): ResponseEntity<Void> {

        return productRepository.findById(productId).map { product  ->
            productRepository.delete(product)
            ResponseEntity<Void>(HttpStatus.OK)
        }.orElse(ResponseEntity.notFound().build())

    }
}
```

Như vậy chúng ta đã định nghĩa các API trong ProductController cho các thao tác CURD cơ bản.

Cấu trúc thư mục lúc này sẽ như sau: 

![](https://images.viblo.asia/19fa36cb-67cb-4908-a023-b89f6bf9ea0a.png)

### 2.2.6 Kiểm tra các End-points có hoạt động hay không
Mình sẽ sử dụng Postman để test các end-points này. Trước hết cần chạy Project xem có lỗi gì không. Ta ấn tổ hợp phím Shift + F10
Kết quả:

![](https://images.viblo.asia/3ae365c8-8c37-4f45-b969-9724060f44d2.png)

Vậy là ứng dụng đã chạy thành công ở port 8080.
Tiếp theo chúng ta sử dụng lệnh Curl để thử tạo một Product
1.  POST localhost:8080/api/products - Tạo một sản phẩm

```
   curl -X POST 'http://localhost:8080/api/products' -H 'Content-Type: application/json' -d '{"name" : "sample product", "description" : "blabla"}'
```
được kết quả: 

![](https://images.viblo.asia/e8509e79-4b18-4544-addf-5e8e0718941d.png)


Api create Product đã tạo thành công 1 Product có `id` là `3` với các thông tin name và description

2. GET localhost:8080/api/products - Lấy danh sách sản phẩm

```
    curl -X GET 'http://localhost:8080/api/products' -H 'Content-Type: application/json'
```
kết quả:

![](https://images.viblo.asia/5532853f-17be-4484-91d5-dc7646a85bdc.png)

3. GET localhost:8080/api/products/{id} - Lấy một sản phẩm dựa vào `id`

```
    curl -X GET 'http://localhost:8080/api/products/1' -H 'Content-Type: application/json'
```

kết quả:

![](https://images.viblo.asia/40c46fa2-cd38-4452-ab7d-39ea87de7775.png)


4. PUT localhost:8080/api/products/{id} - Chỉnh sửa sản phẩm dựa vào `id`

```
curl -X PUT 'http://localhost:8080/api/products/1' -H 'Content-Type: application/json' -d '{"name" : "new product", "description" : "bloblo"}'
```

kết quả:

![](https://images.viblo.asia/3fcb1980-c8f2-4693-9e56-c598c5500454.png)

# 3. Kết luận
Như vậy chúng ta đã xây dựng được một API đơn giản nhất sử dụng Kotlin + Spring boot với các phương thức CRUD cơ bản có thể chạy được.
Bài viết trên dựa trên sự tìm hiểu và tham khảo của nhiều nguồn trong những ngày đầu làm quen với Kotlin. Vì vậy sẽ không tránh khỏi những thiếu sót. Cám ơn mọi người đã đọc bài viết của mình.

# Nguồn tham khảo
https://spring.io/guides/tutorials/spring-boot-kotlin/
https://codebrains.io/build-a-crud-todolist-api-with-spring-5-and-kotlin/
https://github.com/dbgjerez/spring-kotlin-crud