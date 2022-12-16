# 1. Giới thiệu
Chào các bạn, trong bài viết trước [Bắt đầu với Vapor](https://viblo.asia/p/bat-dau-voi-vapor-web-framework-cho-swift-OeVKBROrKkW) tôi đã giới thiệu đến các bạn web framwork Vapor cực kì mạnh mẽ trên nền tảng ngôn ngữ swift. Phần tiếp theo trong phần giới thiệu về Vapor framwork này tôi sẽ giới thiệu đến các bạn cách xây dựng API sử dụng nó.

App demo, xây dựng các API:
- Get list user
- Tạo mới user
- Sửa user
- Xoá user
- Viết app iOS

# Xây dựng API
Chúng ta tạo project với [Bắt đầu với Vapor](https://viblo.asia/p/bat-dau-voi-vapor-web-framework-cho-swift-OeVKBROrKkW), và và tiếp tục với [ProjectDemo](https://github.com/anhnc55/vapordemo) tôi đã thực hiện trong phần trước.

## Tạo model User
```swift
import Vapor
import FluentSQLite

final class User: SQLiteModel {
    var id: Int?
    var name: String?
    var age: Int?
    
    var postision: String?
    
    init(id: Int? = nil, name: String?, age: Int?, postision: String?) {
        self.id = id
        self.name = name
        self.age = age
        self.postision = postision
    }
}

extension User: Migration { }

extension User: Content { }

extension User: Parameter { }
```

## Configure migrations
Bạn phải thực hiện config các service mà bạn dùng, như ở đây tôi sử dụng DB là sqlite.
```swift
    var migrations = MigrationConfig()
    migrations.add(model: User.self, database: .sqlite)
    services.register(migrations)
```
## Controller
Controller chính là nơi bạn thực hiện các logic request và respone của API.
```swift
final class UserViewController {
    func index(_ req: Request) throws -> Future<[User]> {
        return User.query(on: req).all()
    }
    
    /// Saves a decoded `User` to the database.
    func create(_ req: Request) throws -> Future<User> {
        return try req.content.decode(User.self).flatMap { todo in
            return todo.save(on: req)
        }
    }
    
    /// Deletes a parameterized `User`.
    func delete(_ req: Request) throws -> Future<HTTPStatus> {
        return try req.parameters.next(User.self).flatMap { user in
            return user.delete(on: req)
            }
            .transform(to: .ok)
    }
}
```
## Router
Router chính là nơi các bạn khai báo các path của API, ở đây tôi thực hiện thiết kết API  theo chuẩn RESTful.
```swift
let userController = UserViewController()
    router.get("users", use: userController.index)
    router.post("users", use: userController.create)
    router.delete("users", User.parameter, use: userController.delete)
```

Build Project và bây giờ các bạn đã thực hiện tạo các API get, post và delete User rồi đó, bạn có thể sử dụng Postman để test các API của mình trước khi đi vào sử dụng chúng.
Sau khi build thì các bạn sẽ test trên môi trường locahost, khi test tất cả ok rồi thì mới nên thực hiện việc deploy lên cloud, như ở đây tôi đã deploy lên server [](https://vapordemo-dev-vapordemo.vapor.cloud/users)
# Xây dựng Client App
Chủ yếu phần xây dựng App này là để chúng ta cùng kiểm tra các API mình đã thực hiện phía trên, cho nên phần này tôi sẽ nói qua thôi.

Get API:
![](https://images.viblo.asia/d839b87b-76f4-41bf-99c7-a3f487ca3186.png)

![](https://images.viblo.asia/a2897866-72f1-4124-ac39-eee852eae2c8.png)

```swift
import Foundation
import ObjectMapper
import RxSwift

protocol GetUserServiceProtocol {
    func getUserList(_ input: GetUserServiceInput) -> Observable<GetUserServiceOutput>
}

class GetUserService: APIService, GetUserServiceProtocol {
    func getUserList(_ input: GetUserServiceInput) -> Observable<GetUserServiceOutput> {
        return requestParseJSONToArrayModel(input)
            .map({ (userList) -> GetUserServiceOutput in
                return GetUserServiceOutput(userList: userList)
            })
    }
}

class GetUserServiceInput: APIInputBase {
    init() {
        let url = APIURLs.shared.getFullFormatUrl(pathUrl: APIURLs.login) // https://vapordemo-dev-vapordemo.vapor.cloud/users
        super.init(urlString: url, requestMethod: .get, parameters: nil)
    }
}

class GetUserServiceOutput: APIOutputBase {
    var userList = [User]()
    
    init(userList: [User]) {
        self.userList = userList
        super.init()
    }
    
    required init?(map: Map) {
        super.init(map: map)
    }
}
```
Post API:

![](https://images.viblo.asia/e08fbe8e-24f9-47b7-a037-05ded2fca9f0.png)

```swift
protocol CreateUserServiceProtocol {
    func createUserList(_ input: CreateUserServiceInput) -> Observable<CreateUserServiceOutput>
}

class CreateUserService: APIService, CreateUserServiceProtocol {
    func createUserList(_ input: CreateUserServiceInput) -> Observable<CreateUserServiceOutput> {
        return requestParseJSONToModel(input)
    }
}

class CreateUserServiceInput: APIInputBase {
    init(name: String?, age: Int?, postision: String?) {
        var params: [String: Any] = [:]
        if let name = name {
            params["name"] = name
        }
        
        if let age = age {
            params["age"] = age
        }
        
        if let postision = postision {
            params["postision"] = postision
        }
        let url = APIURLs.shared.getFullFormatUrl(pathUrl: APIURLs.login)
        super.init(urlString: url, requestMethod: .post, parameters: nil)
    }
}

class CreateUserServiceOutput: APIOutputBase {
    var userList = [User]()
    
    init(userList: [User]) {
        self.userList = userList
        super.init()
    }
    
    required init?(map: Map) {
        super.init(map: map)
    }
}
```

# Tổng kết
Trên đây tôi đã giới thiệu cách để tạo một API sử dụng Vapor Framwork, giờ đây các bạn có thể chỉ sử dụng một ngôn ngữ duy nhất là Swift mà có thể làm được cả client và server, điều này càng tuyệt vời hơn khi mà Android cũng dần chuyển sang ngôn ngữ Kotlin, điều này có nghĩa là các bạn chỉ các viết app Swift mà có thể convert sang Kotlin để sử dụng cho app android, thật là tuyệt vời phải không nào.
Ở ví dụ trên của tôi, tôi sử dụng DB là Sqlite, trong phần tiếp theo, tôi sẽ cùng các bạn tìm hiểu làm sao để kết nối đến Database sử dụng MySQL.
Cám ơn các bạn đã đọc bài
Project Demo Link:
[Server](https://github.com/anhnc55/vapordemo)
[Client](https://github.com/anhnc55/clientApp)