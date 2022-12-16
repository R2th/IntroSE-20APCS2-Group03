Trong bài viết này, tôi sẽ hướng dẫn các bạn cách áp dụng Authentication cho server-side Swift Vapor
Đầu tiên bạn tải về source code ở [đây](https://koenig-media.raywenderlich.com/uploads/2020/04/DiningIn.zip)

Trong project này, trong thư mục Models bạn sẽ thấy các class sau:
*- User : Đại diện cho các đối tượng user trong server cuả bạn.
- Dinner: Đại diện cho một bữa tối được book.
- DinnerInvitePivot: Link bữa tôí và các user được mời **

Cơ chế của Authentication :

- **Session Authentication**: Khi đăng nhập, máy chủ tạo ID phiên mà trình duyệt lưu trữ trong cookie. Mọi yêu cầu mà trình duyệt gặp sự cố đều chứa ID session; máy chủ xác nhận cookie này theo mọi yêu cầu. Cơ chế này là "trạng thái" - máy chủ cần theo dõi trạng thái của session để xác thực nó.
- **Basic Authentication**: Điều này bao gồm việc gửi tên người dùng và mật khẩu được mã hóa trong cơ sở 64 làm tiêu đề Ủy quyền. Giá trị của tiêu đề trông giống như Basic <tên người dùng được mã hóa: mật khẩu>. Về lý thuyết, máy chủ có thể sử dụng phương pháp này cho mọi yêu cầu. Tuy nhiên, khách hàng không nên gửi mật khẩu qua mạng, ngay cả khi được mã hóa, trừ khi cần thiết. Một phương pháp hay là sử dụng Xác thực cơ bản để đăng nhập người dùng, sau đó yêu cầu mã thông báo.
- **Bearer**: Điều này bao gồm việc gửi tên người dùng và mật khẩu được mã hóa trong cơ sở 64 làm tiêu đề Ủy quyền. Giá trị của tiêu đề trông giống như Basic <tên người dùng được mã hóa: mật khẩu>. Về lý thuyết, máy chủ có thể sử dụng phương pháp này cho mọi yêu cầu. Tuy nhiên, khách hàng không nên gửi mật khẩu qua mạng, ngay cả khi được mã hóa, trừ khi cần thiết. Một phương pháp hay là sử dụng Xác thực cơ bản để đăng nhập người dùng, sau đó yêu cầu mã thông báo.
- ** Mã thông báo web JSON (JWTs):**  Một phiên bản không trạng thái của mã thông báo Bearer. Máy chủ không lưu giữ hồ sơ về mã thông báo. Thay vào đó, nó sử dụng dữ liệu được mã hóa mà JWT cung cấp cho mọi yêu cầu.
- **OAuth**: Một tiêu chuẩn mở để ủy quyền. Nó cho phép máy chủ ủy quyền, có thể là bên thứ ba như Facebook, Google hoặc GitHub, cung cấp quyền truy cập vào tài nguyên của máy chủ khác thay mặt cho người dùng.

### Thêm Token Model: 

Trong thư mục Models ta thêm class Token :

```
import Vapor
import Fluent

enum SessionSource: Int, Content {
  case signup
  case login
}

//1
final class Token: Model {
  //2
  static let schema = "tokens"
  
  @ID(key: "id")
  var id: UUID?
  
  //3
  @Parent(key: "user_id")
  var user: User
  
  //4
  @Field(key: "value")
  var value: String
  
  //5
  @Field(key: "source")
  var source: SessionSource
  
  //6
  @Field(key: "expires_at")
  var expiresAt: Date?
  
  @Timestamp(key: "created_at", on: .create)
  var createdAt: Date?
  
  init() {}
  
  init(id: UUID? = nil, userId: User.IDValue, token: String, 
          source: SessionSource, expiresAt: Date?) {
          self.id = id
          self.$user.id = userId
          self.value = token
          self.source = source
          self.expiresAt = expiresAt
    }

}
```

### Tạo Migration

Thêm tệp có tên CreateTokens.swift vào thư mục Migrations.  Rồi add đoạn code:
```
import Fluent

// 1
struct CreateTokens: Migration {
  func prepare(on database: Database) -> EventLoopFuture<Void> {
    // 2
    database.schema(Token.schema)
       // 3
      .field("id", .uuid, .identifier(auto: true))
      .field("user_id", .uuid, .references("users", "id"))
      .field("value", .string, .required)
      .unique(on: "value")
      .field("source", .int, .required)
      .field("created_at", .datetime, .required)
      .field("expires_at", .datetime)
      // 4
      .create()
  }

  // 5
  func revert(on database: Database) -> EventLoopFuture<Void> {
    database.schema(Token.schema).delete()
  }
}

```

### Run Migration
Mở file configure.swift và thêm đoạn code sau vào cuối 

```
app.migrations.add(CreateTokens())
```

### Cho phép người dùng Sign up
Mở file UserController chở hàm `create`
Thay đổi return type thành `EventLoopFuture<NewSession>`

thay phần cuối của User.create 

```
User(username: userSignup.username,
  passwordHash: try Bcrypt.hash(userSignup.password))
```

**Tạo token cho người dùng**

Thêm function này vào ngay dưới function User.create(from:)

```
// 1
func createToken(source: SessionSource) throws -> Token {
  let calendar = Calendar(identifier: .gregorian)
  // 2
  let expiryDate = calendar.date(byAdding: .year, value: 1, to: Date())
  // 3
  return try Token(userId: requireID(),
    //4
    token: [UInt8].random(count: 16).base64, source: source,
    expiresAt: expiryDate)
}
```

replace .flatmapThrowing thành: 
```
.flatMap {
  // 1
  guard let newToken = try? user.createToken(source: .signup) else {
    return req.eventLoop.future(error: Abort(.internalServerError))
  }
  // 2
  token = newToken
  return token.save(on: req.db)
}.flatMapThrowing {
  // 3
  NewSession(token: token.value, user: try user.asPublic())
}
```

Chúc mừng bạn đã thành công tạo user và token