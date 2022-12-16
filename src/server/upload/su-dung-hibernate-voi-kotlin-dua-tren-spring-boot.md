Trong bài viết sẽ mô phỏng các bước để sử dụng hibernate với Kotlin. Hibernate là một framework phụ vụ object-relational-mapping(ORM) trên JVM sử dụng để lưu trữ liên tục các Plain Old Java Object (POJOs) trong quan hệ cơ sở dữ liệu. Hibernate thực thi [Java Persistance API](https://en.wikipedia.org/wiki/Java_Persistence_API) một đặc tả mô tả việc quản lý dữ liệu quan hệ trên JVM.

### Các dependencies cần thiết

- Plugin biên dịch `kotlin-noarg` để sinh ra các hàm tạo không đối số cho các thực thể Hibernate.
- Plugin `kotlin-jpa` làm việc trên `kotlin-noarg` cho phép việc sinh ra no-arg cho các class annotated Hibernate.
-  Plugin biên dịch `kotlin-allopen` và config nó sang class `open` với annotation thực thể vì Hibernate không nên dùng với các class `final`.  Cùng với đó config thêm phần sau:

```
allOpen {
    annotation("javax.persistence.Entity")
    annotation("javax.persistence.MappedSuperclass")
    annotation("javax.persistence.Embeddable")
} 
```

-  Trừu tượng thực thi `hashCode/equals` trong một lớp trừu tượng và định nghĩa thực thể là các lớp bình thường kế thừa từ lớp trừu tượng cơ sở.

### Kiểu thực thể cảu Hibernate

Việc quan trọng khi tích hợp hibernate vào một ứng dụng là định nghĩa kiểu thực thể muốn tồn tại. Vd: Định nghĩa ánh xạ giữa các bảng và lớp. Trong [tài liệu](http://docs.jboss.org/hibernate/orm/5.3/userguide/html_single/Hibernate_User_Guide.html#entity) của Hibernate mô tả như sau:

> Kiểu thực thể mô tả ánh xạ giữa miền đối tượng mô hình tồn tại thực tế và hàng bảng cơ sở dữ liệu. Để tránh bất kỳ sự nhầm lẫn nào với chú thích đánh dấu một loại thực thể nhất định, chú thích sẽ được trỏ thêm là `@Entity`.

Hãy tìm hiểu làm sao để viết một lớp thực thể hợp lệ.

#### Các yêu cầu của Hibernate cho các lớp thực thể

Hibernate áp đặt các yêu cầu nhất định đối với loại thực thể hợp lệ: Một thực thể
- Phải được `chú thích` với chú tích `javax.persistence.Entity`
- Phải có một hàm tạo không đối số public hoặc protected (hoặc package-private). Nó cũng có thể định nghĩa các hàm tạo khác
- Không nên là `final`. Không có các phương thức hoặc các biến tức thời tồn tại nào của lớp thực thể là `final` (thực tế vẫn có thể nhưng khuyên không nên)
- Có thể mở rộng các lớp không phải thực thể cũng như các lớp thực thể và các lớp không phải thực thể có thể mở rộng các lớp thực thể. Cả các lớp `abstract` và `concrete` có thể là thực thể.
- Có thể cùng cấp kiểu thuộc tính `JavaBean`. Đây không phải là bắt buộc vd: setters là không cần thiết
- Phải cung cấp một thuộc tính `identifier`(chú thích `@Id` ), khuyên dùng nullable, non-primitive, types
- Cần cung cấp các thực thi có ích cho `equals` và `hashCode`

Nếu chúng ta nghĩa loại lớp nào của Kotlin phù hợp nhất các yêu cầu trên, đó là lớp `data`. Nhưng vẫn có vài nhược điểm như phân tích sau.

#### Tình trạng khó xử `equals/hashCode`: Không sử dụng các lớp dữ liệu làm các thực thể Hibernate

Có vẻ là một ý tưởng hay khi sử dụng các lớp dữ liệu để xác định các thực thể Hibernate: Về cơ bản chúng chỉ cần một hàm tạo chính ngắn gọn với các tham số được chú thích, cung cấp những thứ gọn gàng như `hashCode, equals, copy, toString` và có thể bất biến(immutable) (thực sự chúng không thể với Hibernate).
Tuy nhiên, có một vấn đề cần phải rất cẩn thận với các hàm `hashCode/equals` được tạo tự động khi làm việc với Hibernate, đặc biệt là vì mã định danh thực thể có thể được đặt sau khi đối tượng đã được xây dựng. Trên thực tế, sử dụng ID được tạo tự động có nghĩa là các lớp của chúng ta không bao giờ có thể thay đổi được. Hãy xem xét tình huống sau:

1. Tạo một đối tượng của thực thể `Person`
2. Biến đối tượng thành một `HashSet`
3. Tồn tại đối tượng qua Hibernate (dẫn đến sinh và cập nhận `Person::id` và nó sẽ thay đổi `hashCode`)
4. Kiểm tra nếu đối tượng vẫn tồn tại trong `HashSet` sẽ cho `false` vì hash code bị thay đổi

Tình trạng khó xử này có thể khắc phục bằng cách sử dụng các khóa tự nhiên (hay còn gọi là khóa nghiệp vụ) tức là cần tìm một tổ hợp các thuộc tính xác định rõ ràng một thực thể. Đối với một người, đây có thể là tên và địa chỉ của họ, vẫn có thể không đủ. Thực ra không có khóa tự nhiên cho mọi thực thể. Ngoài ra, sẽ hơi phức tạp khi thực hiện hành vi như vậy với các lớp dữ liệu vì chúng ta phải đặt các phần khóa tự nhiên vào phương thức khởi tạo chính và mọi thứ khác trong phần thân của lớp, người gọi sẽ phải thiết lập các thuộc tính sau khi xây dựng. Điều này cảm thấy không ổn, vì vậy chúng ta đừng làm điều đó ...

#### Đề xuất của Hibernate

Các đề xuất trong tài liệu [Hibernate](http://docs.jboss.org/hibernate/orm/5.3/userguide/html_single/Hibernate_User_Guide.html#entity):

> Việc sử dụng id tự nhiên là phương pháp tốt cho `equals` và `hashCode`, đôi khi chúng ta chỉ có thực thể xác định mà cung cấp một hạn chế duy nhất. `Nó có thể dùng thực thể xác định cho việc kiểm tra bằng` nhưng nó cần một số thứ khác:

- Cần cung cấp một `giá trị cố định cho hashCode` vậy giá trị hash code không đổi sau khi thực thể bị flushed.
- Cần so sánh thực thể xác định bằng chỉ dành cho các thực thể không nhất thời.

Chúng ta có thể sử dụng Hibernate-generated ID cho việc kiểm tra bằng chỉ khi cung cấp một giá trị cố định cho `hashCode`. Từ ví dụ trên hash code không nên đổi với một đối tượng khi đặt vào một tập hàm băm. Sử dụng một giá trị cố định cho `hashCode` được khôi phục và vẫn là một thực thi hợp lệ từ rút ngắn.([Oracle JavaDocs](https://docs.oracle.com/javase/7/docs/api/java/lang/Object.html#hashCode()))

##### `hashCode` rút ngắn

Trong rút ngắn tổng thể của `hashCode` là:

- Khi nào nó `thực thi một đối tượng giống nhau` hơn một lần trong khi thực thi của ứng dụng Java, phương thức `hashCode` phải liên tục trả về cùng một số nguyên, miễn là không có thông tin nào được sử dụng trong các so sánh bằng trên đối tượng được sửa đổi. Số nguyên này không cần phải nhất quán từ một lần thực thi một ứng dụng đến một lần thực thi khác cùng một ứng dụng.
- Nếu 2 đối tượng `bằng` nhau dựa theo phương thức `equals(Object)` sau đó gọi đến phương thức `hashCode` `trên mỗi đối tượng phải tạo ra số nguyên giống nhau`.
- Không cần thiết nếu 2 đối tượng không bằng theo phương thức `equals(Object)`, khi gọi phương thức `hashCode` mỗi 2 đối tượng phỉa sinh ra số nguyên khác biệt. 

> Tùy nhiên, người lập trình cần nhận ra rằng sinh ra số nguyên khác biệt cho các đối tượng không bằng có thể cải thiệu hiệu năng của hash tables.*

##### Hiệu năng ngầm của `hashCode`

Nếu quyết định mang lại các giá trị không đổi từ `hashCode` cho bất kỳ đối tượng nào của một lớp, hiệu suất sẽ bị ảnh hưởng. Bạn không thể mong đợi các bộ sưu tập băm hoạt động hiệu quả như với mã băm được phân phối đúng cách:

> [HashMap](https://docs.oracle.com/javase/7/docs/api/java/util/HashMap.html) cung cấp hiệu suất thời gian không đổi cho các hoạt động cơ bản (`get` và `put`), giả sử hàm băm phân tán các phần tử đúng cách giữa các nhóm.

Nếu có thể giải quyết những tác động về hiệu suất này nên làm theo cách tiếp cận được mô tả.

Do đó, muốn các giá trị `equals` của các thực thể dựa trên mã định danh của chúng và cung cấp một giá trị không đổi cho `hashCode`. Ngoài ra, vì các lớp dữ liệu dường như không phải là một giải pháp thích hợp, chúng tôi sẽ sử dụng các lớp thông thường, linh hoạt hơn.

### Thực thi Hibernate thực thể với Kotlin

Đầu tiên cung cấp một lớp generic cơ bản cho các thực thể định nghĩa xác định tự động sinh và dựa vào đó thực thi `equals` và số cố định `hashCode`:
```kotlin
@MappedSuperclass
abstract class AbstractJpaPersistable<T : Serializable> {

    companion object {
        private val serialVersionUID = -5554308939380869754L
    }

    @Id
    @GeneratedValue
    private var id: T? = null

    override fun getId(): T? {
        return id
    }

    override fun equals(other: Any?): Boolean {
        other ?: return false

        if (this === other) return true

        if (javaClass != ProxyUtils.getUserClass(other)) return false

        other as AbstractJpaPersistable<*>

        return if (null == this.getId()) false else this.getId() == other.getId()
    }

    override fun hashCode(): Int {
        return 31
    }

    override fun toString() = "Entity of type ${this.javaClass.name} with id: $id"

}
```

Lớp `AbstractJpaPersistable`: nó định nghĩa một thuộc tính generic nullable `@Id` sẽ tự động sinh bới Hibernate. `equals` và `hashCode` giống như thảo luận trên. Tiếp đến có thể định nghĩa các thực thể dựa trên lớp đó như sau:

```kotlin
@Entity
class Person(
    val name: String,
    @OneToOne(cascade = [(CascadeType.ALL)], orphanRemoval = true, fetch = FetchType.EAGER)
    val address: Address
) : AbstractJpaPersistable<Long>()

@Entity
class Address(
    val street: String,
    val zipCode: String,
    val city: String
) : AbstractJpaPersistable<Long>()
```

Như thấy 2 thực thể: Một `Person` có quan hệ với `Address`. Cả 2 lớp `@Entity` mở rộng `AbstractJpaPersistable<Long>` và nó dựa trên tự động sinh id của kiểu `Long`.

### Tạo một ứng dụng mẫu

Chúng ta sẽ sử dụng Spring boot base cho ứng dụng HibernateDemo mà có thể tạo qua [start.spring.io](https://start.spring.io/) và config như sau:

![](https://images.viblo.asia/e547be40-65cd-49c5-8201-6c5423d14b43.png)

#### Tệp build.gradle.kts

```kotlin
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    val kotlinVersion = "1.4.21"
    id("org.springframework.boot") version "2.4.3-SNAPSHOT"
    id("io.spring.dependency-management") version "1.0.11.RELEASE"
    kotlin("jvm") version kotlinVersion
    kotlin("plugin.spring") version kotlinVersion
    kotlin("plugin.jpa") version kotlinVersion
    kotlin("plugin.allopen") version kotlinVersion
    kotlin("plugin.noarg") version kotlinVersion
}

allOpen {
    annotation("javax.persistence.Entity")
    annotation("javax.persistence.Embeddable")
    annotation("javax.persistence.MappedSuperclass")
}

group = "com.hlk"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_1_8

repositories {
    mavenCentral()
    maven { url = uri("https://repo.spring.io/milestone") }
    maven { url = uri("https://repo.spring.io/snapshot") }
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")

    // Database Drivers
    runtimeOnly("com.h2database:h2")

    //Jackson Kotlin
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")

    testImplementation("org.springframework.boot:spring-boot-starter-test") {
        exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
    }
    testImplementation("org.junit.jupiter:junit-jupiter-api")
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine")


}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "1.8"
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}
```

#### Repository mẫu
Với Spring thực thi một repository expose thực thể `Person`
```kotlin
package com.hlk.hibernatedemo.repository

import com.hlk.hibernatedemo.model.Person
import org.springframework.data.jpa.repository.JpaRepository

interface PersonRepository : JpaRepository<Person, Long> {
    fun getByAddressStreet(street: String): Person?
}
```

Interface `org.springframework.data.jpa.repository.JpaRepository` định nghĩa CRUD hành động thông dung và thêm một phương thức `getByAddressStreet`.

Tiếp đến sẽ inject repository vào controller và expose CRUD API cho người dùng. Hãy xem test case sau:

```kotlin
package com.hlk.hibernatedemo

import com.hlk.hibernatedemo.model.Address
import com.hlk.hibernatedemo.model.Person
import com.hlk.hibernatedemo.repository.PersonRepository
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit.jupiter.SpringExtension

@ExtendWith(SpringExtension::class)
@SpringBootTest
class HibernatedemoApplicationTests(@Autowired val repo: PersonRepository) {

    @Test
    fun `basic entity checks`() {
        val p = Person("Paul", Address("HelloStreet", "A-55", "Paris"))
        val hashCodeBefore = p.hashCode()
        val personSet = hashSetOf(p)
        repo.save(p)
        val hashCodeAfter = p.hashCode()
        assertThat(repo.findAll()).hasSize(1)
        assertThat(personSet).contains(p)
        assertThat(hashCodeAfter).isEqualTo(hashCodeBefore)
    }
}
```

Test trên chạy trên JUnit5 cho phép hàm tạo inject các đối tượng cụ thể. Sử dụng `SpringExtension` để hỗ trợ autowired các dependencies và như kết quả `PersonRepository` được inject vào trong class test.

Trong test case, tạo một đối tượng `Person`, tồn tại nó và sử dụng repository and xác nhận rằng có thể tìm fqua `findAll`. Giả sử dựa trên `org.assertj.`
Ngoài ra, trong test xác nhận rằng `hashCode` cho một `Person` không đổi sau khi tồn tại thông qua Hibernate và một `HashSet` làm việc đúng với các thực thể.

![](https://images.viblo.asia/c04b3eb4-d56c-4f56-915a-63b2c6fa169e.png)

Đây kết quả chạy test đã qua. 

Các bạn có thể tham khảo source code [tại đây](https://github.com/kotlin-dev-studio/hibernatedemo).

Cảm ơn các bạn đã đọc bài viết. :D