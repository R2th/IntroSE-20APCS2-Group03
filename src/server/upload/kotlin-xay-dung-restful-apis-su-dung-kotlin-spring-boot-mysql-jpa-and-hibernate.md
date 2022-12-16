# 1. Các khái niệm cơ bản
> `Trong giới hạn bài viết mình xin phép được phép nói qua các khái niệm cơ bản mà tập trung vào ví dụ tạo restful api sử dụng Kotlin, spring. Để hiểu chi tiết các vấn đề mình nêu ra, bạn vui lòng truy cập vào các đường dẫn mình đưa kèm.`

-----


## 1.1. Kotlin
`Kotlin` - đứa con của JetBrains, cái tên lạ mà lại quen và đang mới nổi trong thời gian gần đây rất được cộng đồng, nhất là `fan` của `Java` và `Android` chú ý tới. Đặc biệt hơn là khi sự kiện Google I/O 2017 diễn ra từ ngày 17-19/5/2017 tại California, Mỹ, Google đã công bố tới giới lập trình viên việc hỗ trợ Kotlin như là một ngôn ngữ chính thức để xây dựng ứng dụng cho hệ điều hành Android bên cạnh Java và C/C++.

Để nói về `Kotlin` trước hết phải nhắc đến `Java`. 
> Suy nghĩ viết đi viết lại nhưng trên #viblo đã có rất nhiều bài viết tìm hiểu thú vị và chi tiết về so sánh hệ giữa `Kotlin` và `Java`. 
> 
> Bạn vui lòng đọc trong hai bài viết dưới đây tôi thấy đã quá chi tiết cho một newbee `Kotlin`:
> 
> (Tiếng việt) 
> 
> https://viblo.asia/p/kotlin-phien-ban-nang-cap-cua-java-Do754NLXZM6
> 
> https://viblo.asia/p/cung-tim-hieu-ve-kotlin-phan-1-bJzKm1NPK9N
> 
> hoặc (Tiếng Anh):
> 
> https://clearbridgemobile.com/java-vs-kotlin-which-is-the-better-option-for-android-app-development/
> 

#### Từ java tới Kotlin
> Một vòng tìm kiếm và tìm hiểu, mình xin chia sẻ một bài viết rất hay làm quen với Kotlin của tác giả [Fabio Santana
> ](https://github.com/fabiomsr): [From Java to Kotlin](https://fabiomsr.github.io/from-java-to-kotlin/)
> Bằng cách đưa ra các ví dụ so sánh cụ thể, rất dễ để có thể làm quen với ngôn ngữ này đối với những lập trình viên đã `biết` tới `Java`
## 1.2. Spring boot
`Spring` là một framework dựa trên ngôn ngữ JAVA giúp các nhà phát triển xây dựng những hệ thống và ứng dụng chạy trên JVM (Java virtual machine) một cách đơn giản, tiện gọn, nhanh chóng và mềm dẻo. Mà hẳn lập trình viên nào cũng đã từng nghe qua. 
Để hiểu chi tiết về Spring, bạn vui lòng truy cập: https://kipalog.com/posts/Gioi-thieu-Spring-Framework

Spring Boot là một dự án khá nổi bật trong hệ sinh thái Spring Framework. Nếu như trước đây, công đoạn khởi tạo một dự án Spring khá vất vả từ việc khai báo các dependency trong file pom.xml cho đến cấu hình bằng XML hoặc annotation phức tạp, thì giờ đây với Spring Boot, chúng ta có thể tạo dự án Spring một cách nhanh chóng và cấu hình cũng đơn giản hơn.
Dưới đây là một số tính năng nổi bật của Spring Boot:
* Tạo các ứng dụng Spring độc lập
* Nhúng trực tiếp Tomcat, Jetty hoặc Undertow (không cần phải deploy ra file WAR)
* Các starter dependency giúp việc cấu hình Maven đơn giản hơn
* Tự động cấu hình Spring khi cần thiết
* Không sinh code cấu hình và không yêu cầu phải cấu hình bằng XML ...
Tham khảo:
>  https://projects.spring.io/spring-boot/
## 1.3. RESFUL API
Khái niệm đã quá quen thuộc đối với các lập trình viên hiện nay, vui lòng tham khảo: 
> https://viblo.asia/p/thiet-ke-restful-api-GrLZD98Vlk0
## 1.4. JPA
JPA (Java Persistence API) là 1 giao diện lập trình ứng dụng Java, nó mô tả cách quản lý các mối quan hệ dữ liệu  trong ứng dụng sử dụng Java Platform.

JPA cung cấp một mô hình POJO persistence cho phép ánh xạ các table/các mối quan hệ giữa các table trong database sang các class/mối quan hệ giữa các object.

Ví dụ: table Users với các column (Id, name, age…) sẽ tương ứng với class Users.java với các field Id, name, age… từ đó mỗi khi truy vấn table hay các column ta sẽ truy vấn trực tiếp trên các class, các field của class mà không cần quan tâm tới việc đang dùng loại database nào, dữ liệu database ra sao…
Tham khảo: 
> https://docs.spring.io/spring-data/jpa/docs/current/reference/html/

-----
Và trên đây, nếu các bạn đã đọc qua phần Giới thiệu về Kotlin, hẳn sẽ hiểu vì sao JPA được nêu nên ở đây, bởi sự tiên lợi của `Kotlin` trong việc có thể hoàn toàn kế thừa và sử dụng các class của Java đã được định xây dựng từ trước đó.


-----




## 1.5. Hibernate
Hibernate là 1 ORM (Object Relational Mapping) framework cho phép người lập trình thao tác với database một cách hoàn toàn tự nhiên thông qua các đối tượng. Lập trình viên hoàn toàn không cần quan tâm đến loại database sử dụng, SQL…

Hay nói cách khác, Hibernate chính là cài đặt của JPA (JPA là 1 tập các interface, còn Hibernate implements các interface ấy 1 cách chi tiết).
> https://stackjava.com/faq/jpa-la-gi-su-khac-nhau-giua-jpa-voi-hibernate.html
# 2. Xây dựng Restful APIs đơn giản sử dụng Kotlin, Spring Boot, Mysql, JPA and Hibernate

## 2.1. Giới thiệu cấu trúc của ứng dụng
Sau đây mình xin xây dựng một ứng dụng nhỏ xây dựng một restful api sử dụng Kotlin và Spring với các chứng năng theo chuẩn [Restful](http://searchmicroservices.techtarget.com/definition/RESTful-API)

Trong project, tôi sẽ xây dựng một API cho phép tạo bài viết gồm các trường `title`, `content`

Ứng dụng gồm các chức năng: 
1. POST /api/articles - Tạo bài viết
2. GET /api/articles - Lấy tất cả các bài viết
3. Get /api/articles/{id} - Lấy một bài viết dựa vào id
4. PUT /api/articles/{id} - Chỉnh sửa bài viết
5. DELETE /api/articles/{id} - Xóa một bài viết
## 2.2. Xây dựng ứng dụng 
### 2.2.1. Khởi tạo ứng dụng
Một điều rất tuyệt vời để khởi tạo một ứng dụng Spring sử dụng Kotlin, mình xin giới thiệu http://start.spring.io/, trang web cho phép bạn khởi tạo ứng dụng Spring cùng Java hoặc Kotlin với các Dependencies cần thiết cho project của bạn.

1. Truy cập http://start.spring.io
2. Nhập tên projec.VD: kotlin-demo
3. Lựa chọn ngôn ngữ, ở đây tôi chọn Spring + Kotlin 
4. Lựa chọn phiên bản Spring Boot.
5. Cuối cùng thêm các dependencies cho project, ở đây chỉ cần Web, Jpa và MySQL
6. Generate Project để tạo project và tải xuống.

![](https://images.viblo.asia/6a136341-7e97-4220-9118-0344167e8982.png)

Sau khi mở với Intelij, đợi một chút cho việc tiến hành tải các gói dependences. Ta sẽ thấy project có cấu trúc như sau: 

![](https://images.viblo.asia/c29e8934-878d-4a21-b6ea-4c70101f3075.png)



### 2.2.2. Cấu hình kết nối cơ sở dữ liệu MySQL

Trước tiên, bạn cần tạo  bảng để lưu trữ cơ sở dữ liệu. Sau đó là các cấu hình về tên bảng, đường dẫn, tên người dùng và mật khẩu để cho `Spring boot` có thể kết nối và tạo dữ liệu trong DB.

> Mở  `src/main/resources/application.properties` và thêm đoạn code:
```
## Spring DATASOURCE (DataSourceAutoConfiguration & DataSourceProperties)
spring.datasource.url = jdbc:mysql://localhost:3306/kotlin_demo_app?autoReconnect=true&useUnicode=true&characterEncoding=UTF-8&allowMultiQueries=true&useSSL=false
spring.datasource.username = root
spring.datasource.password = root


## Hibernate Properties

# The SQL dialect makes Hibernate generate better SQL for the chosen database
spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.MySQL5InnoDBDialect

# Hibernate ddl auto (create, create-drop, validate, update)
spring.jpa.hibernate.ddl-auto = update
```

> Lưu ý thay đổi tên cơ sở dữ liệu, username và password cơ sở dữ liệu của bạn. Ở đây tôi đặt tên csdl là `kotlin_demo_app`, username, password là `root`
### 2.2.3. Tạo Model
Bây giờ chúng ta tiến hành tạo model Article. 

Tạo packe model bên trong com.example.kotlindemo
Trong package model tạo file Article.kt với nội dung: 
```
package com.example.kotlindemo.model

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.validation.constraints.NotBlank

@Entity
data class Article (
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @get: NotBlank
    val title: String = "",

    @get: NotBlank
    val content: String = ""
)
```

Sử dụng @Entity cho phép định nghĩa một lớp có thể được ánh xạ bởi một bảng trong cơ sở dữ liệu. Để tìm hiểu chi tiết, vui lòng truy cập: 
> https://docs.jboss.org/hibernate/annotations/3.5/reference/en/html/entity.html
> 
Ở đây, tôi cũng sử dụng  [`data class`](https://kotlinlang.org/docs/reference/data-classes.html), [`data class`](https://kotlinlang.org/docs/reference/data-classes.html) - một điều tiện lợi của Kotlin, nó cho phép định nghĩa sẵn các hàm equals(), hashcode(), toString() và copy() có thể sử dụng ngay.

### 2.2.4. Tạo  [Repository](https://docs.spring.io/spring-data/data-commons/docs/1.6.1.RELEASE/reference/html/repositories.html)(JPA)

Tiếp theo chúng ta sẽ tiến hành tạo repository để có thể truy cập dữ liệu từ database.
1. Tạo package `repository` bên trong package `com.example.kotlindemo` 
2. Tạo file ArticleRepository.kt bên trong package `repository` với nội dung:
```
package com.example.kotlindemo.repository

import com.example.kotlindemo.model.Article
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ArticleRepository : JpaRepository<Article, Long>
```

Việc kế thừa JpaRepository interface cho phép sử dụng các phương thức [CRUD](https://docs.microsoft.com/en-us/iis-administration/api/crud) đã được định nghĩa sẵn để sử dụng trong Article mà không phải mất công xây dựng lại. Một trong những tính năng nổi bật của Spring boot.

### 2.2.5. Xây dựng controller End-points
Tiếp theo, chúng ta sẽ tiến hành tạo controller end-points để thực hiện các thao tác [CRUD](https://docs.microsoft.com/en-us/iis-administration/api/crud) cho Article API

1. Tạo package `controller`
2. Tạo file ArticleController.kt và thực hiện đoạn code:
```
package com.example.kotlindemo.controller

import com.example.kotlindemo.model.Article
import com.example.kotlindemo.repository.ArticleRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*
import javax.validation.Valid

@RestController #Sử dụng ResController của Spring boot
@RequestMapping("/api") #Khai báo map api trên Url. VD: localhost:8080/api
class ArticleController(private val articleRepository: ArticleRepository) {

    @GetMapping("/articles") #Khai báo map api trên Url. VD: localhost:8080/api/articles
    fun getAllArticles(): List<Article> =
            articleRepository.findAll()


    @PostMapping("/articles") # Phương thức POST lên API
    fun createNewArticle(@Valid @RequestBody article: Article): Article =
            articleRepository.save(article)


    @GetMapping("/articles/{id}") #GET article theo id
    fun getArticleById(@PathVariable(value = "id") articleId: Long): ResponseEntity<Article> {
        return articleRepository.findById(articleId).map { article -> 
            ResponseEntity.ok(article)
        }.orElse(ResponseEntity.notFound().build())
    }

    @PutMapping("/articles/{id}") #Chỉnh s article theo id
    fun updateArticleById(@PathVariable(value = "id") articleId: Long,
                          @Valid @RequestBody newArticle: Article): ResponseEntity<Article> {

        return articleRepository.findById(articleId).map { existingArticle ->
            val updatedArticle: Article = existingArticle
                    .copy(title = newArticle.title, content = newArticle.content)
            ResponseEntity.ok().body(articleRepository.save(updatedArticle))
        }.orElse(ResponseEntity.notFound().build())

    }

    @DeleteMapping("/articles/{id}") #Xóa article theo id
    fun deleteArticleById(@PathVariable(value = "id") articleId: Long): ResponseEntity<Void> {

        return articleRepository.findById(articleId).map { article  ->
            articleRepository.delete(article)
            ResponseEntity<Void>(HttpStatus.OK)
        }.orElse(ResponseEntity.notFound().build())

    }
}
```

ArticleController đã định nghĩa các API cho các thao tác CURD. Sau khi đã đọc qua [From Java to Kotlin](https://fabiomsr.github.io/from-java-to-kotlin/) tôi nêu ở trên, đọc tới các method này giường như các cú pháp không còn là vấn đề nữa đúng không :D 
### 2.2.6. Test ứng dụng
Trước tiên bạn nên kiểm tra lại các `dependences`, `modules` và `JDK`: Sử dụng tổ hợp phím tắt `SHIFT + Ctrl + Alt + S` để bật cửa sổ `Project Structure` và tiến hành kiểm tra.
​
> Kiểm tra phiên bản sdk sử dụng
![](https://images.viblo.asia/a081ef1a-3975-4181-b396-d04556ca5c06.png)
​
![](https://images.viblo.asia/f2cf8221-90a3-479b-b286-3c2b6b3badc7.png)
​
> Kiểm tra cấu trúc modules, nếu Maven/Gradle chưa load đủ hoặc bị lỗi các dependences, cần import lại modules
![](https://images.viblo.asia/86cad54b-7587-44de-b57f-066fbbdb0d20.png)
​
> Cuối cùng là kiểm tra thư viện
![](https://images.viblo.asia/b7bd8a0b-0ae2-4695-8280-ed5d411ee061.png)



Ở đây tôi sử dụng [POST MAN](https://blog.bluematador.com/posts/postman-how-to-install-on-ubuntu-1604/) - hiện đã có bản cài đặt trên UBUNTU để test ứng dụng.
​
1. POST /api/articles - Create an Article
​
![](https://images.viblo.asia/9d49bc3b-db49-49c4-a034-492aa9f23593.png)
​
![](https://images.viblo.asia/b7dafcd4-c433-4485-8572-c637f7b0ea5f.png)
​
2. GET /api/articles - Get all Articles
​
![](https://images.viblo.asia/25f99e51-306d-4eed-be2c-632bf223931a.png)
​
3. Get /api/articles/{id} - Get an Article by id
​
![](https://images.viblo.asia/62785fa5-07f7-4404-b247-541be9cb93bf.png)
​
4. PUT /api/articles/{id} - Update an Article 

![](https://images.viblo.asia/2020418f-d79a-47a2-87ab-a17dc961e0cd.png)

5. DELETE /api/articles/{id} - Delete an Article 

![](https://images.viblo.asia/a461b27f-eb95-48bd-b2be-e81c302ad0e4.png) 

![](https://images.viblo.asia/2342fc44-0ba1-49a6-9fa5-855c401dce1a.png)

# 3. Kết luận
Như vậy chúng ta đã xây dựng được một API đơn giản sử dụng Kotlin + Spring boot với các phương thức CRUD có thể sử dụng được.

Bài viết trên dựa trên sự tìm hiểu và tham khảo của nhiều nguồn trong những ngày đầu làm quen với `Kotlin` rất mong nhận được comment cùa mọi người về kiến thức cũng như cách trình bày. 
# 4. Tham khảo
[CRUD](https://docs.microsoft.com/en-us/iis-administration/api/crud) 

[Cùng tìm hiểu về Kotlin ](https://viblo.asia/p/cung-tim-hieu-ve-kotlin-phan-1-bJzKm1NPK9N)

[Java vs. Kotlin: Which is the Better Option for Android App Development?](https://clearbridgemobile.com/java-vs-kotlin-which-is-the-better-option-for-android-app-development/)

[Kotlin – Phiên bản nâng cấp của Java](https://viblo.asia/p/kotlin-phien-ban-nang-cap-cua-java-Do754NLXZM6)

[From Java to Kotlin](https://fabiomsr.github.io/from-java-to-kotlin/)

[Building Restful APIs with Kotlin, Spring Boot, Mysql, JPA and Hibernate](https://www.callicoder.com/kotlin-spring-boot-mysql-jpa-hibernate-rest-api-tutorial/)