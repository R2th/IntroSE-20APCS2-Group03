# 1. Giới thiệu
Sau một thời gian có cơ hội làm việc cùng graphql kết hợp Kotlin và Spring Boot thì hôm nay mình xin được viết một bài nhỏ chia sẻ cũng như giới thiệu với mọi người cách thức build 1 API dùng graphql + kotlin + spring boot nhé
## Graphql là gì
Graphql là ngôn ngữ truy vấn dữ kiệu dành cho các API, cung cấp cho phía client truy vấn và nhận về chính xác những gì client cần và không cần, giúp cho việc phát triển API dễ dàng hơn theo thời gian.
Graphql được Facebook phát triển từ năm 2012 và chính thức phát hành công khai vào năm 2015. 

Như phần lớn mọi người đã biết, trước khi graphql ra đời, REST được xem như là tiêu chuẩn phát triển API, mình từng có 1 bài biết chia sẻ về việc thiết kế RESTful API ở [đây](https://viblo.asia/p/mot-so-chia-se-khi-thiet-ke-api-bWrZn6gOZxw), mọi người có thể ghé sang nhé.
Tuy nhiên từ khi ra mắt cho đến những năm trở lại đây, sự phổ biến của graphql gần như đang đe dọa đển sự "thống trị" của REST. Tranh luận về việc sử dụng REST hay graphql diễn ra ngày càng gay gắt và gần như đều có sự phân vân giữa một bên là tiêu chuẩn đã được công nhận rộng rãi và một bên là công nghệ mới có khả năng khắc phục các thiếu xót của REST

Chi tiết về cấu trúc graphql đã có nhiều bài cơ bản, ở bài viết này, mình xin phép không đi lại các phần cơ bản này mà chúng ra sẽ vào ngay với phần chính là buiding graphql API cùng kotlin và spring boot như thế nào nhé!

# 2. Xây dựng API
## Cài đặt
Mình sử dụng Gradle để build, spring boot mình chọn là veriosn 2.4.5
```
plugins {
	id("org.springframework.boot") version "2.4.5"
}
```

các dependencies cần thiết ở đây gồm có:
```
dependencies {
	implementation("org.springframework.boot:spring-boot-starter")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("com.graphql-java-kickstart:graphql-spring-boot-starter:7.0.1")
	implementation("com.graphql-java-kickstart:graphiql-spring-boot-starter:7.0.1")
	implementation("com.graphql-java:graphql-java-extended-scalars:1.0.1")
	runtimeOnly("org.postgresql:postgresql")
}
```

## Xây dựng các thành phần
Phần 1 mình sẽ chi sẻ việc mình xây dựng graphql API thuộc loại Query (Phân biệt dạng Query và Mutations bạn có thể đọc thêm ở [đây](https://graphql.org/learn/schema/#the-query-and-mutation-types) nhé)

Cũng tương tự như cấu trúc RESTful API, graphql cũng có cấu trúc như sau:
![](https://images.viblo.asia/14954d70-abb6-47dd-80dd-c76a500eedd0.png)

Phần resources > graphql bao gồm:

**1. File .graphql.config**

Tại đây, sẽ là nơi config các thông tin schema của API, ngoài ra có thể định nghĩa địa chỉ url schema mà phía client sẽ gọi đến để fetch schema về, cơ bản file config sẽ như sau
```
{
  "name": "Demo GraphQL Schema",
  "schemaPath": "schema.graphql",
  "extensions": {
    "endpoints": {
      "Default GraphQL Endpoint": {
        "url": "http://localhost:8080/graphql/",
        "headers": {
          "user-agent": "JS GraphQL"
        },
        "introspect": false
      }
    }
  }
}
```

**2, File schema.graphqls**

Tại đây sẽ khai báo schema type được dùng trong project, ban đầu mình chỉ khai báo schema query với type là Query như sau:
```
schema {
    query: Query
}

type Query {
}
```
**3. File schema dùng cho API**

File này có thể đặt tên theo ý muốn phù hợp với nghiệp vụ của API, vd mình đang mong muốn tạo ra 1 API để truy vấn về thông tin user nên mình sẽ đặt tên file là user.graphqls và bên trong sẽ là định nghĩa schema của mình
```
type User {
    systemCompanyCode: Int,
    userName: String,
    emailAddress: String,
    tel: String,
    agreeFlag: Boolean,
    screen: Int
}

extend type Query {
    findUserInfo: User
}
```
Mình đang cho phép phía client gọi đển API có tên là `findUserInfo` không cần có request param và API này sẽ cho phép trả về 1 object User bao gồm các field:
```
    systemCompanyCode: Int,
    userName: String,
    emailAddress: String,
    tel: String,
    agreeFlag: Boolean,
    screen: Int
```

Có thể hiểu nôm na, việc define schema cho graphql cũng giống như việc viết swagger bên RESTful API, nó giúp server và client thống nhất với nhau về tên API, request param gởi lên và respone mà server gởi về

Sau khi đã xác định được thông tin trả về cơ bản của API, mình sẽ bắt đầu đến phần xử lý logic
Ở đây mình sẽ tạo ra package cần thiết cho 1 API
1. Resolver
2. Service
3. Models

Dễ dàng nhận thấy, 3 package cơ bản này tương đối mapping với RESTful API là controller, service và dto đúng không nào :D

Đầu tiên, đi từ schema user.graphqls đang trả về 1 object User thì mình cũng sẽ khai báo trong package models 1 class User với các filed và type mapping hoàn toàn như sau:
```
data class User(
    val systemCompanyCode: Int?,
    val userName: String?,
    val emailAddress: String?,
    val tel: String?,
    val agreeFlag: Boolean?,
    val screen: Int?
)
```

Tiếp đến, ở tầng resolver, mình tạo ra 1 class có tên là UserResolver và implement lại từ GraphQLQueryResolver, trong này mình sẽ tạo ra 1 fun với tên cũng mapping hoàn toàn với schema user.graphqls. Để cho đơn giản, mình sẽ chưa thực hiện validate gì mà sẽ return luôn code logic từ tầng service trả về:
```
class UserResolver(private val userService: UserService) : GraphQLQueryResolver {
    fun findUserInfo(): User {
        return userService.findUserInfo()
    }
}
```

Cuối cùng, ở tầng service mình sẽ thực hiện các logic nghiệp vụ cần thiết cho API này nhưng trước tiên để test nhanh API mình sẽ chỉ set cứng data trả về như sau:
```
class UserServiceImpl () : UserService {

    override fun findUserInfo(): User {
        return User(
            systemCompanyCode = 1,
            userName = "trinhlvtq_demo",
            emailAddress = "le.vu.thi.quynh.trinh@sun-asterisk.com",
            tel = "0794543244",
            agreeFlag = true,
            screen = 1
        )
    }
}
```
Sau các bước cơ bản thì start code thử để xem hình thù API này như thế nào nhé

# 3. Thử nghiệm
Sau khi start source code, mình sẽ  test API của mình bằng cách dùng graphiql với địa chỉ http://localhost:8080/graphiql 

Có thể hiểu graphiql là 1 công cụ có thể giao tiếp với bất kỳ server GraphQL nào và thực thi các query/mutation đối với nó. Để sử dụng các bạn có thể khai báo trong dependencies `com.graphql-java-kickstart:graphiql-spring-boot-starter:7.0.1` như ở trên nhé
![](https://images.viblo.asia/215f2ae3-bdea-4671-a19b-09d65d6b6a6c.gif)

Không giống như RESTful API, response từ API mà server trả về thì phía client không hề quản lý được, đôi lúc có thể sẽ phải nhận về nhiều field hơn mong muốn. Còn với graphql, ngay từ phía client đã có thể lựa chọn những data nào mà client cần lấy. Như trong hình, mình lần lượt thêm các filed mình cần lấy về và data từ server trả về cũng sẽ chỉ trả về nhưng field mà client gởi lên chỉ cần filed đó đã được define trong schema

Còn đây là data mình gởi lên đầy đủ các field đã define trong schema user.graphqls
![](https://images.viblo.asia/ec454855-fa6e-4c26-9473-8133c6721a88.png)

Ngoài ra nếu không sử dụng graphiql, các bạn cũng có thể gọi trực tiếp API từ postman như sau với method POST url: http://localhost:8080/graphql

Đây là khi mình chỉ mong muốn lấy về thông tin user name và email address:
![](https://images.viblo.asia/b8060b72-a90d-4115-a4f6-6a13b81d9c9c.png)

Đây là khi mình muốn lấy về tất cả thông tin user mà server cho phép lấy:
![](https://images.viblo.asia/6973478e-7d56-4a04-86f5-840d42281128.png)

Nếu lấy thêm field không được define trong schema thì sẽ bị báo lỗi:
![](https://images.viblo.asia/f3bdc446-8205-4bfb-abfb-e313d9e306e2.png)


# 4. Tổng kết
Phần 1 mình sẽ dừng lại ở đây sau khi đã xây dựng xong 1 API grapqh dạng Query, ở bài viết sau mình sẽ gởi đến các bạn phần API grapqh dạng Mutations và kết nối DB để thực hiện các nghiệp cụ create/update/delete nhé

Trên đây là những ý kiến của mình trong việc làm quen và build thử graphql kết hợp kotlin và spring boot, hy họng có thể giúp mình cho các bạn ban đầu tiếp xúc và làm việc với graphql. Bài viết ở mức độ basic trên phương diện hiểu biết cá nhân trong quá trình học và làm cũng như vọc vạch đọc thêm các kiểu nên vẫn còn nhiều sai sót. Rất mong các bạn có thể góp ý thêm.

Tham khảo: 

- https://graphql.org/learn/schema/
- https://auth0.com/blog/building-graphql-apis-with-kotlin-spring-boot-and-mongodb/#Defining-Your-GraphQL-Resolvers