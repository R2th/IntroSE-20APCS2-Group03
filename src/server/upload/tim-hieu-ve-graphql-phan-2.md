Trong [bài viết trước](https://viblo.asia/p/gioi-thieu-ve-graphql-jvElaaw6lkw) mình đã giới thiệu đến các bạn GraphQL là gì và ưu/nhược điểm của nó. Ở bài viết này chúng ta sẽ cùng tiếp tục tìm hiểu sâu hơn về các khái niệm và cách sử dụng chúng trong GraphQL nhé.

# 1. Schema và Types.

GraphQL cho phép khai báo type để mô tả các field mà Client có thể truy vấn được. Ngôn ngữ truy vấn GraphQL về cơ bản là về việc chọn các field trên các object và format của một truy vấn GraphQL sẽ khớp chặt chẽ với kết quả mà server trả về.  Khi các truy vấn đến, chúng sẽ được xác thực và thực thi dựa trên schema đó sau đó trả lại dữ liệu dựa trên các field mà Client yêu cầu. 

Schema và type của GraphQL có thể phát triển trên bất cứ ngôn ngữ nào vì nó sử dụng cú pháp riêng biệt của GraphQL schema language. GraphQL schema language chúng ta cũng có thể hiểu nó tương tự như các ngôn ngữ truy vấn, cho phép thiết lập schema và cho phép Client đọc ghi dựa trên các schema đó.

Các thành phần cơ bản của một schema trong GraphQL là object-type và field và object type ở đây sẽ đại diện cho một loại đối tượng mà có thể tìm nạp dữ liệu và nó có những field nào. Trên server có thể định nghĩa một object type như dưới đây:

```graphql
type Character {
  name: String!
  appearsIn: [Episode!]!
}
```

- Character: là một GraphQL Object Type hoặc có thể hiểu là một đối tượng mà server sẽ trả về cho Client.
- name và appearsIn: là các field của Character, có nghĩa đây là các field duy nhất có thể xuất hiện trong bất kì phần nào của truy vấn với Character.
- String: là scalar types và không có truy vấn con trong field này.
- String!: có nghĩa là field không thể null và  Server sẽ luôn phải trả về một giá trị khác null cho Client.

Ngoài ra, đôi khi phía Server của chúng ta đôi khi cũng cần tham số do Client truyền lên để làm điều kiện truy vấn đến cơ sở dữ liệu cũng như xử lý các logic tính toán,  GraphQL hoàn toàn có thể hỗ trợ  cho chúng ta yêu cầu này. Ví dụ:

```graphql
type Starship {
  id: ID!
  name: String!
  length(unit: LengthUnit = METER): Float
}
```

- Một field trong kiểu object có thể không có hoặc nhiều đối số.
- Các đối số khi truyền vào phải theo tên cụ thể.
- Đối số có thể là bắt buộc hoặc tùy chọn.
- Khi một đối số là tùy chọn thì có thể xác định một giá trị mặc định.

GraphQL cũng có các kiểu dữ liệu giống như ngôn ngữ lập trình của chúng ta, nó được gọi là Scalar-type và nó là những field không có bất kì sub-field nào. Dưới đây là một số type mặc định của GraphQL:

* Int: Số nguyên 32 bit.		
* Float: Số thập phân.		
* String: Một chuỗi ký tự UTF ‐ 8.		
* Boolean: true hoặc false.		
* ID: Giống như một string, được sử dụng để nhận dạng.

Ngoài ra, GraphQL cho phép custom các Scalar type theo mong muốn và tùy thuộc vào việc triển khai để xác định type đó nên được tuần tự hóa, giải mã hóa và xác thực như thế nào để xác định chúng. 

Đầu tiên xác định tên Scalar type muốn custom như sau:
```graphql
//scalarType.graphqls

scalar Email

```

Sau đó chúng ta cần tạo ra một class để xử lý Scalar type đó. Nó sẽ chịu trách nhiệm validate input/output của dữ liệu cũng như xử lý format hay parse data trước khi xử lý và response về cho Client. Chúng ta sẽ tạo GraphQLEmailScalar để xử lý việc đó:

```kotlin
//GraphQLEmailScalar.kt
class GraphQLEmailScalar: GraphQLScalarType("Email", "Email scalar type", EmailCoercing())

class EmailCoercing: Coercing<String, String> {

    @Throws(CoercingSerializeException::class)
    override fun serialize(input: Any?): String {
        if(input !is String) {
            throw CoercingSerializeException("Expected type 'String' but was ${Kit.typeName(input)}")
        } else if (!isValid(input)) {
            throw CoercingSerializeException("Email invalid!")
        }
        return input.toString()
    }

    @Throws(CoercingParseValueException::class)
    override fun parseValue(input: Any?): String {
        if(input !is String) {
            throw CoercingParseValueException("Expected type 'String' but was ${Kit.typeName(input)}")
        } else if (!isValid(input)) {
            throw CoercingParseValueException("Email invalid!")
        }
        return input.toString()
    }

    @Throws(CoercingParseLiteralException::class)
    override fun parseLiteral(input: Any?): String {
        if(input !is StringValue) {
            throw CoercingParseLiteralException("Expected type 'String' but was ${Kit.typeName(input)}")
        } else if (!isValid(input.value)) {
            throw CoercingParseLiteralException("Email invalid!")
        }
        return input.value
    }

    fun isValid(email: String): Boolean {
        return Pattern.compile(
            "^(([\\w-]+\\.)+[+\\w-]+|([a-zA-Z]|[+\\w-]{2,}))@"
                    + "((([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])\\.([0-1]?"
                    + "[0-9]{1,2}|25[0-5]|2[0-4][0-9])\\."
                    + "([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])\\.([0-1]?"
                    + "[0-9]{1,2}|25[0-5]|2[0-4][0-9]))|"
                    + "([a-zA-Z]+[\\w-]+\\.)+[a-zA-Z]{2,4})$"
        ).matcher(email).matches()
    }
}

```

Cuối cùng để các schema có thể hoạt động và xử lý với type Email trên, chúng ta cần tạo một Bean cho nó. Mình sẽ xử lý luôn trọng phần config nhé:

```kotlin
//GraphQLConfig.kt
@Configuration
class GraphQLConfig {

    @Bean
    fun email(): GraphQLScalarType = GraphQLEmailScalar()
}
```

Sau khi xử lý xong phần custom scalar type bây giờ chúng ta có thể sử dụng nó để định nghĩa các schema của GraphQL:

```graphql
//user.graphqls

type User{
     id: ID,
     name: String,
     addess: String,
     email: Email,
     role: String
}
```


Ngoài ra cũng như nhiều ngôn ngữ lập trình khác, GraphQL cũng hỗ trợ chúng ta Interface. Trong GraphQL, nó  là một kiểu trừu tượng bao gồm một tập hợp các field nhất định mà một type phải bao gồm khi implement nó. 

```graphql
interface Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
}

type Human implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  starships: [Starship]
  totalCredits: Int
}
 
type Droid implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  primaryFunction: String
}
```


Sau khi định nghĩa xong query và resover ( Mình sẽ nói ở bài tới) chúng ta sẽ thực hiện query lấy các đối tượng Charater như sau:

```graphql
query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    ... on Droid {
        primaryFunction
    }
    ... on Human {
        totalCredits
    }
  }
}
```

Và sau đó bạn sẽ nhận được response như sau:
- Đối với dữ liệu trả về là kiểu Droid:
```graphql
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "primaryFunction": "Astromech"
    }
  }
}
```

- Đối với dữ liệu trả về là kiểu Human:

```graphql
{
  "data": {
    "hero": {
      "name": "R10-D10",
      "totalCredits": 100000000
    }
  }
}
```

Trong ví dụ trên các bạn có thể thấy mình đang yêu cầu Client truyền thêm tham số episode có kiểu Episode để thực hiện truy vấn dữ liệu trên Server, GraphQL cũng cho phép chúng ta định nghĩa type các tham số input:
- Chúng ta sẽ định nghĩa type cho input như sau:
```graphql
input ReviewInput {
  stars: Int!
  commentary: String
}
```

- Dưới Client để truyền tham số chúng ta thực hiện query như sau:

```graphql
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}
```


- Tuỳ vào thư viện Client sử dụng để truyền param vào query:

```graphql
{
  "ep": "JEDI",
  "review": {
    "stars": 5,
    "commentary": "This is a great movie!"
  }
}
```

# 2. Query.


Ở trên chúng ta đã tìm hiểu về các kiểu dữ liệu trong GraphQL cũng như các định nghĩa một schema và type. Trong phần này chúng ta sẽ tìm hiểu cách thực hiện truy vấn dữ liệu bằng cú pháp của GraphQL nhé. Trước khi thực hiện demo này, bạn cần nắm rõ các khái niệm về type, field, argument, fragments, operation name nhé. Do bài viết khá dài mà phần này trong document của GraphQL cũng đã có nên mình sẽ không giải thích chi tiết các khái niệm đó, các bạn có thể tìm hiểu trong trang chủ của GraphQL nhé.

Mình sẽ thực hiện demo một query của GraphQL nhé, để làm được các bạn cần thực hiện các step sau:

- Định nghĩa type của dữ liệu trả về và query type:

```graphql
//users.graphqls

extend type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    address: String
    createdDate: Date
    updatedDate: Date
}

type Query {
    getManager: [Manager!]!
    getManagerByWithId(id: ID!): Manager!
}
```

- Định nghĩa entity cho đối tượng User cho việc sử dụng ORM với cơ sở dữ liệu:

```kotlin
//UserEntity.kt

@Entity
@Table(
    name = "user"
)
class UserEntity {
    @Id
    @GeneratedValue(generator = "UUID")
    var id: UUID? = null

    @Column(name= "first_name")
    var firstName: String? = null

    @Column(name= "last_name")
    var lastName: String? = null

    @Transient
    var fullName: String? = null
        get() = "$firstName $lastName"

    @Column(unique = true)
    var email: String? = null

    var address: String? = null

    @Column(name= "created_date")
    var createdDate: ZonedDateTime? = null

    @Column(name= "updated_date")
    var updatedDate: ZonedDateTime? = null

}
```

- Định nghĩa một Repository để thực hiện truy vấn đến bảng user trong cơ sở dữ liệu và trả về data map với UserEntity đã define trước đó.

```kotlin
//UserRepository.kt

@Repository
interface UserRepository: JpaRepository<UserEntity, UUID> {

    @Query("select m from UserEntity as m where m.email = :email")
    fun findUserByEmail(@Param("email") email: String) : UserEntity
}
```

- Vấn sử dụng kiến trúc 3 layer, mình sẽ tạo ra một service để xử lý logic và gọi truy vấn đến data-access layer:

```kotlin
//UserService.kt
@Service
class UserService(private val userRepository: UserSerRepository) {

    fun getUsers(): List<UserEntity> = userRepository.findAll()

    fun getUserWithId(id: UUID): UserEntity {
        try {
            return userRepository.getById(id)
        } catch(e: Exception) {
            throw RequestException(e.message.toString(), HttpStatus.BAD_GATEWAY, e.cause)
        }
    }

}
```

- Cuối cùng mình sẽ tạo một resolver để gọi đến UserService và trả về dữ liệu cho Client. Resolver ở đây bạn có thể hiểu nó là một function logic query mà mutation cho GraphQL. Một field trong GraphQL cũng có thể là một resolver. Dễ hiểu hơn thì có thể coi nó là một RequestMapping trong Controller cũng được. Ví dụ:

```kotlin
//UserResolver.kt
@Component
class UserResolver(private val userService: UserService): GraphQLQueryResolver {

    fun getUser(): List<UserEntity> = userService.getManagers()

    fun getUserByWithId(id: UUID): UserEntity = userService.getUserWithId(id)

}
```

- Để kiểm tra kết quả trả về, bạn hãy thực hiện viết query như sau:

```graphql
query GET_USERS{
    getUser {
        id
        firstName
        lastName
        email
        address
    }
}
```

# 3. Mutation.

Về mặt kỹ thuật, bất kỳ query nào cũng có thể được triển khai để thực hiện việc ghi dữ liệu. Tuy nhiên, GraphQL cho phép thiết lập một quy ước thao tác nào sẽ thực hiện ghi dữ liệu bằng operation type mutation. Giống như query, mutation cũng cho phép trả về dữ liệu theo yêu cầu sau khi thực hiện ghi dữ liệu và cũng có các chức năng tương tự như query. Mình sẽ tiếp tục thực hiện tiếp ví dụ này bằng source code ở trên.

- Đầu tiên chúng ta cần định nghĩa một mutation type để Client có thể thực hiện truy vấn được:

```graphql
//users.graphqls

extend type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, address: String): Manager!
}

```

- Trong UserService mình sẽ thêm một function để xử lý việc đọc ghi dữ liệu:

```kotlin
//UserService.kt

@Service
class UserService(private val userRepository: UserSerRepository) {

   ......
   
    fun createUser(userBody: CreateUserDto): UserEntity {
        val date = ZonedDateTime.now(Clock.systemUTC())
        var userEntity = UserEntity()
        userEntity.firstName = userBody.firstName
        userEntity.lastName = userBody.lastName
        userEntity.address = userBody.address
        userEntity.email = userBody.email
        userEntity.createdDate = date
        userEntity.updatedDate = date

        return userRepository.save(userEntity)
    }

}

```

- Tiếp tục trong resolver của UserResolver chúng ta bổ sung thêm 1 function resolver đồng thời implement `GraphQLMutationResolver`:

```kotlin
//UserResolver.kt
@Component
class UserResolver(private val userService: UserService): GraphQLQueryResolver, GraphQLMutationResolver {

    .....

    fun createUser(firstName: String, lastName: String, email: String, address: String): UserEntity {
        val createUserDto = CreateUserDto(firstName, lastName, email, address)
        return userService.createUser(createUserDto)
    }
    
}
```

- Cuối cùng để kiểm tra kết quả, hãy thực hiện viết truy vấn dưới Client như sau:

```graphql
mutation CREATE_USER {
    createUser(firstName: "Sun", lastName: "Asterisk", email: "user-demo@sun-asterisk.com", address: "Ha Noi - Viet Nam") {
        id
        firstName
        lastName
        email
        address
    }
}
```

**Conclusion.**

Trong bài viết trên mình đã giới thiệu cho các bạn các type trong GraphQL và mutation/query cũng như cách triển khai chúng phía Backend. Ở bài viết tiếp theo mình sẽ hướng dẫn các bạn cách triển khau chúng với các ứng dụng Client để có thể sử dụng GraphQL cũng như các khái niệm nâng cao khác.