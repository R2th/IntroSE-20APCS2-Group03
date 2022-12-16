# 1. Giới thiệu
Tiếp nối bài [part 1](https://viblo.asia/p/graphql-building-graphql-apis-cung-kotlin-spring-boot-va-postgres-part-1-ByEZkjgyKQ0) đã giới thiệu về cài đặt graphql trong kotlin spring boot và thực hành Query thì ở part 2 này mình xin được chia sẻ về thực hành về một operation type khác của graphql bên cạnh Query là Mutation.

Nhắc lại một chút thì Operation type của graphql bao gồm: Query, Mutation, Subscription. Operation type bắt buộc phải khai báo khi muốn truy vấn. Hai operation type được sử dụng nhiều là Query (để truy vấn dữ liệu) và Mutation (làm gì đó thay đổi dữ liệu).

Operation name: Là tên cho operation đó, thường sẽ được mô tả một cách có nghĩa và ngữ cảnh rõ ràng

# 2. Xây dựng API
## Variables 
Như ví dụ ở part 1, ta đã biết format của một truy vấn GraphQL sẽ khớp chặt chẽ với kết quả mà server trả về.
GraphQL có một ngôn ngữ riêng để define GraphQL Schema: The GraphQL Schema Definition Language **(SDL)**. Lợi thế của SDL là đơn giản và trực quan giúp GraphQL có thể phát triển trên bất kỳ ngôn ngữ nào.

Ngoài ra, để truy vấn theo giá trị bất kỳ mà Client gửi lên, GraphQL cho phép truyền giá trị đó vào Query thông qua Variables. Variables sẽ được khai báo ở phía server và Client bắt buộc phải truyền đúng tên cùng type
![](https://images.viblo.asia/689ad6d4-ffef-49d8-9e1a-c0f2e27ac68b.png)
Ở đây: email là variables có kiểu dữ liệu là String và vì ! nên là bắt buộc phải truyền data cho email, nếu để null thì sẽ bị báo lỗi. Tương tự, graphql cũng sẽ báo lỗi nếu bạn:
* truyền sai data type của variables
* không truyền data cho variables requies

![](https://images.viblo.asia/34db5009-d5e9-4940-b786-b4e952d8ccbb.png)
Như vậy, ta có thể hình dung schema của Query có variables và không có variables sẽ được define như sau:
```
type PersonalInformation {
    birthday: String,
    status: String,
}

type User {
    systemCompanyCode: Int,
    userName: String,
    emailAddress: String,
    tel: String,
    personalInformation: PersonalInformation
}

extend type Query {
    findUserInfo: User
    findUserInfoByEmail(email: String!): User
}
```
## Mutations
Về mặt kỹ thuật, bất kỳ Query nào cũng có thể được triển khai để thực hiện việc ghi dữ liệu.  Tuy nhiên, GraphQL cho phép thiết lập một quy ước thao tác nào thực hiện ghi dữ liệu sẽ được khai bằng operation type Mutation. Giống như Query, Mutation cũng cho phép trả về dữ liệu theo yêu cầu sau khi thực hiện ghi dữ liệu và cũng có các chức năng tương tự như Query.

Cũng tương tự như bài trước (thật ra là dùng lại project mn ạ :D) mình sẽ khai báo tiếp ở **schema.graphqls** thêm vào type Mutation:

```
schema {
    query: Query
    mutation: Mutation
}

type Query {
}

type Mutation {
}
```

Tiếp đến là schema cho API mới. Để mô tả việc ghi data user vào DB, mình sẽ tạo ra 1 API dạng Mutation với tên là createUser:
**user.graphqls**

Tại đây, mình mong muốn client sẽ gởi xuống API các field systemCompanyCode, userName là require (khai báo bằng !) và 2 field có thể không gởi xuống là tel và personalInformation.

Như mô tả, field personalInformation sẽ là một object PersonalInformationInput bao gồm 2 field khác là birthday và status. Để phân biệt với object trả về từ API thì ta sẽ khai báo object PersonalInformationInput bằng từ khóa input.

Cuối cùng, sau khi thực thi xong API createUser, mình mong muốn nhận về 1 object Status bao gồm 2 field status và message. vậy schema của mình có thể mô tả như sau:
```
type Status {
    status: Int
    message: String
}

input PersonalInformationInput {
    birthday: String,
    status: String,
}

extend type Mutation {
    createUser(
        systemCompanyCode: Int!,
        userName: String!,
        emailAddress: String!,
        tel: String,
        personalInformation: PersonalInformationInput
    ): Status
}
```

Vẫn là cấu trúc source code gồm resolver, service và model để ví dụ phần mutation này. Bắt đầu từ model, sau khi đã xác định được mong muốn nhận vè object Status, mình sẽ defined models Status tương ứng:

```
data class Status(
    val status: Int,
    val message: String,
)
```

Để phân biệt với Query resolver (UserResolver), mình sẽ đặt tên cho resolver này là UserMutationResolver và implement lại từ GraphQLMutationResolver (thay vì GraphQLQueryResolver).
Tương tự như phần trước, để cho đơn giản, mình sẽ chưa thực hiện validate gì mà sẽ return luôn code logic từ tầng service trả về:
```
class UserMutationResolver(private val userService: UserService) : GraphQLMutationResolver {
    fun createUser(
        systemCompanyCode: Int,
        userName: String,
        emailAddress: String,
        tel: String?,
        personalInformation: PersonalInformationInput?
    ): Status {
        return userService.createUser(
            systemCompanyCode,
            userName,
            emailAddress,
            tel,
            personalInformation)
    }
}
```

Cuối cùng, ở tầng service mình sẽ thực hiện các logic insert data user mà mình đã input vào Database, không quên return về object Status:
```
    override fun createUser(
        systemCompanyCode: Int,
        userName: String,
        emailAddress: String,
        tel: String?,
        personalInformation: PersonalInformationInput?
    ): Status {
        val usersEntity = UsersEntity (
            systemCompanyCode = systemCompanyCode,
            userId = UUID.randomUUID(),
            userName = userName,
            emailAddress = emailAddress,
            tel = tel,
            birthday = personalInformation?.birthday,
            status = personalInformation?.status
        )
        userRepository.save(usersEntity)
        val result = Status(
            status = 200,
            message = "Create user success"
        )
        return result
    }
```
Sau các bước cơ bản thì start code thử để xem hình thù API này như thế nào nhé
# 3. Thử nghiệm
Cũng là http://localhost:8080/graphiql, mình sẽ thực hiện viết request Mutations của mình bằng việc:
- Khai báo operation type là mutation
- Operation name CreateUser
- Thêm các variables mapping với schema đã define
- Chọn lọc data muốn nhận về (chỉ muốn nhận về field status, message hay nhận về cả 2, ở đây mình nhận về cả hai nhé)
- Cuối cùng ở mục query variables, mình sẽ input data mong muốn lưu vào database
![](https://images.viblo.asia/ee201642-0705-4258-8fb9-678841dc8bce.png)

Cùng query thử trong Database
![](https://images.viblo.asia/ee74a2b4-3bc7-4191-9add-84bdb9f3faf8.png)

Như vậy là data mình input từ http://localhost:8080/graphiql đã được lưu vào database và API mutations đã hoàn thành :D

Test thêm một chút, mình sẽ thử bỏ đi data input cho field require userName....
![](https://images.viblo.asia/d6a05b74-d3ad-4815-bfc8-55b25e22d4a4.png)

Oops, lỗi ròi, thôi vậy, mình sẽ thêm lại và bỏ đi data input cho 2 field không require là tel và personalInformation xem sao
![](https://images.viblo.asia/29645a6f-fbb7-4143-9790-aac46c1f109b.png)

Okay, data đã được lưu vào database rồi :D

Tương tự cho các logic update data, delete data, chúng ta cũng sẽ sử dụng Mutation để thực hiện thay vì dùng Query mọi người nhé

## GraphQL vs REST
Qua hai ví dụ về Query và Mutations, chúng ta thử so sánh với RESTful API một chút nhé. Thật ra, việc so sánh GraphQL vs REST theo mình cũng có nhiều điểm chưa hợp lí vì thực tế thì GraphQL là một ngôn ngữ truy vấn trong khi REST lại là architectural style về tiêu chuẩn thiết kế API,  tuy nhiên về sơ bộ thì:

**Giống nhau:**
* Đều là send HTTP request lên server để nhận về data
* Output response đều là JSON
* Đều có sự phân biệt nhất định với việc read/write data

**Khác nhau:**


| Graphql | RESTful |
| -------- | -------- | 
| Chỉ có 1 endpoint | Triển khai nhiều endpoint, trong đó mỗi endpoint tương ứng với một resource|
| client-driven architecture -> Cho phép Client đưa lên 1 datashape để server trả về đúng data mình cần | server-driven architecture -> data response đã được server định nghĩa, Client không thể quyết định được data nhận về khi gọi một endpoint|
| Cho phép đưa nhiều query vào chung 1 request để nhận về data liên quan nhau cùng 1 lúc     | Muốn fetch nhiều data liên quan nhau phải gọi multiple request đến mỗi endpoint liên quan|
| Chỉ dùng HTTP method POST và thay đổi read/write resource thông qua quy ước dùng Mutation | Thay đổi read/write resource bằng HTTP method |
![](https://images.viblo.asia/188ffe38-7462-4609-8813-f795ef62474e.png)

# 4. Tổng kết
Mình xin được dừng bài viết part 2 ở đây. Qua hai phần, hy vọng các bạn đã có thể bước đầu làm quen và xây dựng được cho mình các API Query, Mutations cơ bản. Ở các bài viết tiếp theo, chúng ta sẽ thực nghiệm và đào sâu hơn các phần khác của graphql nhé

Trên đây là những ý kiến của mình trong việc làm quen và build thử graphql kết hợp kotlin và spring boot, hy họng có thể giúp mình cho các bạn ban đầu tiếp xúc và làm việc với graphql. Bài viết ở mức độ basic trên phương diện hiểu biết cá nhân trong quá trình học và làm cũng như vọc vạch đọc thêm các kiểu nên vẫn còn nhiều sai sót. Rất mong các bạn có thể góp ý thêm.

Tham khảo: 

- https://graphql.org/learn/schema/
- https://auth0.com/blog/building-graphql-apis-with-kotlin-spring-boot-and-mongodb/#Defining-Your-GraphQL-Resolvers