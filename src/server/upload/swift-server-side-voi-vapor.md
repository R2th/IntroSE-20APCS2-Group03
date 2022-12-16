### Giới thiệu

Vapor là một framework để viết Swift phía Server-side với các API dễ sử dụng. Bài viết sẽ vào cách cài đặt, một số feature cơ bản của Vapor

### Cài đặt
**Đối với MacOS**

Đầu tiên ta phải có `Xcode` 9.3 trở lên. Ở đây mình cài đặt Vapor qua HomeBrew:
```
$ brew tap vapor/tap
$ brew install vapor/tap/vapor
```
**Đối với Ubuntu**

Cài đặt Vapor's APT repo:
```
$ eval "$(curl -sL https://apt.vapor.sh)"
```
Cài đặt Swift và Vapor
```
$ sudo apt-get install swift vapor
```

Kiểm tra
```
$ swift --version
Apple Swift version 5.0 (swiftlang-1001.0.69.5 clang-1001.0.46.3)
Target: x86_64-apple-darwin18.5.0
$ vapor --help
```

### Bắt đầu
Để khởi tạo project, ta dùng lệnh `vapor new <tên project>`, ở đây mình dùng flag `--web`:
```
$ vapor new myProject --web
```
Chờ một chút thì sẽ cài đặt xong, `cd` đến thư mục `myProject`, ta sẽ có một thư mục với cấu trúc:
```
./
    cloud.yml
    CONTRIBUTING.md
    Package.resolved
    Package.swift
    README.md
    web.Dockerfile
    Public/
        images/
            it-works.png
        styles/
            app.css
    Resources/
        Views/
            base.leaf
            hello.leaf
            welcome.leaf
    Sources/
        App/
            app.swift
            boot.swift
            configure.swift
            routes.swift
            Controllers/
            Models/
        Run/
            main.swift
   Tests/
       LinuxMain.swift
       AppTests/
           AppTests.swift
```

Trong `Sources/App`, ta có các cần quan tâm là `configure.swift` để đăng ký các `services` và thiết lập `middleware` cho App và `routes` để thiết lập định tuyến.
App sẽ dùng template egine `Leaf` được thể hiện ví dụ khá rõ ràng ở các file `.leaf` nằm trong thư mục `Resources/Views`

Ta thực hiện:
```
$ vapor build
Building Project [Done]
$ vapor run
Running myProject ...
Running default command: .build/debug/Run serve
Server starting on http://localhost:8080
```
Vào `http://localhost:8080` ta thu được kết quả:

![](https://images.viblo.asia/deb433dc-43ed-45ce-b23f-7578dcd06106.png)

Vào `http://localhost:8080/hello/Vapor` ta thu được:

![](https://images.viblo.asia/353c5210-2d84-4bcc-8f07-425da0ed7caa.png)

### Định tuyến

Mở file `routes.swift`, ta thấy các định tuyến đều có nội dung chủ yếu là:
```
router.method(arg1, arg2, ...) {req in ...}
```
Ví dụ:
```
router.post("fullname", String.parameter, String.parameter) {req -> String in
    let firstname = try req.parameters.next(String.self)
    let lastname = try req.parameters.next(String.self)
    return "\(firstname) \(lastname)\n"
}
```

Thêm nội dung trên vào, sau đó thực hiện:
```
$ vapor build
$ vapor run
```

Sau đó gửi một POST request đến địa chỉ `http://localhost:8080/fullname/Vapor/Server` ta thu được:

```
$ curl -X POST http://localhost:8080/fullname/Vapor/Server
Vapor Server
```

Ta có thể chọn kiểu cho parameter, ví dụ:
```
router.get("add", Int.parameter, Int.parameter) {req -> Int in
   let first = try req.parameters.next(Int.self)
   let second = try req.parameters.next(Int.self)
   return first + second
}
```

### Query và Content

Giả sử ta truy cập vào `http://localhost:8080/fullname?firstname=Vapor&lastname=Server`, làm sao ta đọc được các parameter firstname và lastname.

Ta sẽ dùng:
```
req.query.get(Type, at: String)
```

Ta viết một định tuyến như sau:
```
router.get("fullname") {req -> String in
    let firstname = try req.query.get(String.self, at: "firstname")
    let lastname = try req.query.get(String.self, at: "lastname")
    return "\(firstname) \(lastname)\n"
}
```

Truy cập vào địa chỉ trên và ta được kết quả:
```
Vapor Server
```

Giả sử ta có một `request`:
```
POST /login HTTP/1.1
Content-Type: application/json

{
    "email": "user@vapor.codes",
    "password": "dont look!"
}
```

Làm sao ta đọc được `body` của `request` đó. Ta có một cách làm đơn giản:

Đầu tiên ta tạo một `struct`:
```
struct LoginRequest: Content {
    var email: String
    var password: String
}
```

Ta sẽ viết lại định tuyến cho `/login`:
```
router.post("login") {req -> Future<String> in
    return try req.content.decode(LoginRequest.self).map({loginRequest in
        return "\(loginRequest.email) - \(loginRequest.password)\n"
    })
}
```

Ta thử gửi request trên:
```
$ curl -X POST http://localhost:8080/login -H "Content-Type: application/json" --data '{"email": "user@vapor.codes", "password": "dont look"}'
user@vapor.codes - dont look
```

Để trả về một `JSON`, các mà `Vapor` làm là dùng một `struct` kế thừa `Content`:
```
struct Person: Content {
    var firstname: String
    var lastname: String
}
// ..

router.get("person", String.parameter, String.parameter) {req -> Person in
    return try Person(firstname: req.parameters.next(String.self), lastname: req.parameters.next(String.self))
}
```

Truy cập vào `http://localhost:8080/person/Vapor/Server` và ta nhận được:
```
{"firstname":"Vapor","lastname":"Server"}
```

### EventLoopFuture

Hãy đọc file `routes.swift`:
```
import Vapor

/// Register your application's routes here.
public func routes(_ router: Router) throws {
    // "It works" page
    router.get { req in
        return try req.view().render("welcome")
    }
    
    // Says hello
    router.get("hello", String.parameter) { req -> Future<View> in
        return try req.view().render("hello", [
            "name": req.parameters.next(String.self)
        ])
    }
}
```
Hàm `req.view().render(_ path: String, [...])` trả về một kiểu dữ liệu là `EventLoopFuture<View>`. `EventLoopFuture` được tạo ra từ `Promise`, `EventLoopFuture` có các các API dễ sử dụng mà callback không có.

Để khởi tạo một `Promise`, ta dùng:
```
let promise = req.eventLoop.newPromise(of: Type)
```

Để đưa kết quả trả về vào `Promise`, ta sử dụng:
```
promise.succeed(result: result)
```

Để lấy `EventLoopFuture` từ `Promise`, ta dùng:
```
promise.futureResult
```

Ta viết lại định tuyến `fullname/:firstname/:lastname`:
```
router.post("fullname", String.parameter, String.parameter) {req -> Future<String> in
    let firstname = try req.parameters.next(String.self)
    let lastname = try req.parameters.next(String.self)
    let promise = req.eventLoop.newPromise(of: String.self)
    DispatchQueue.global().async {
        let fullname = "\(firstname) \(lastname)\n"
        promise.succeed(result: fullname)
    }
    return promise.futureResult
}
```
Ta thấy rằng `fullname` được tính toán bất đồng bộ trên `DispatchQueue.global()`

Ngoài ra EventLoopFuture còn có các phương thức `map, flatMap, do, tranform` để chuyển đổi về kiểu dữ liệu khác hoặc làm một tác vụ nào đó, tham khảo tài liệu bên dưới.

### Cơ sở dữ liệu MySQL

Mở file `Package.swift`, ta thêm vào:
```
dependencies: [
    // ...
    .package(url: "https://github.com/vapor/fluent-mysql.git", from: "3.0.0")
],
targets: [
    .target(name: "App", dependencies: ["Leaf", "Vapor", "FluentMySQL"]),
    // ...
]
```

Bằng lệnh sau ta sẽ update được các dependencies:
```
$ vapor update
```

Vào thư mục `Model` tạo file `Account.swift` với nội dung:
```
import Vapor
import FluentMySQL

struct Account: MySQLModel {
    var id: Int?
    var email: String
    var password: String
    
    init(email: String, password: String) {
        self.email = email
        self.password = password
    }
}

extension Account: MySQLMigration {}
extension Account: Content {}
extension Account: Parameter {}
```

Mở file `configure.swift` và sửa thành:
```
import Leaf
import Vapor
import FluentMySQL

/// Called before your application initializes.
public func configure(_ config: inout Config, _ env: inout Environment, _ services: inout Services) throws {
    // Register providers first
    try services.register(LeafProvider())
    try services.register(FluentMySQLProvider())
    
    let mysql = MySQLDatabase(config: MySQLDatabaseConfig(hostname: "127.0.0.1", port: 3306, username: "mysql-username", password: "mysql-password", database: "Vapor", transport: .unverifiedTLS))
    var databases = DatabasesConfig()
    databases.add(database: mysql, as: .mysql)
    databases.enableLogging(on: .mysql)
    services.register(databases)
    
    var migrations = MigrationConfig()
    migrations.add(model: Account.self, database: .mysql)
    services.register(migrations)

    // Register routes to the router
    let router = EngineRouter.default()
    try routes(router)
    services.register(router, as: Router.self)
    
    // Use Leaf for rendering views
    config.prefer(LeafRenderer.self, for: ViewRenderer.self)

    // Register middleware
    var middlewares = MiddlewareConfig() // Create _empty_ middleware config
    middlewares.use(FileMiddleware.self) // Serves files from `Public/` directory
    middlewares.use(ErrorMiddleware.self) // Catches errors and converts to HTTP response
    services.register(middlewares)
}
```

Vào `MySQL` tạo dabase `Vapor` và reset password về `caching_sha2_password`:
```
> create database Vapor;
> alter user 'mysql-username'@'localhost' identified with caching_sha2_password by 'mysql-password';
```

Tạo file `AccountController.swift` trong `Controllers` với nội dung:
```
import Vapor
import FluentMySQL

final public class AccountController {
    
    func list(_ req: Request) throws -> Future<[Account]> {
        return Account.query(on: req).all()
    }
    
    func create(_ req: Request, email: String, password: String) throws -> Future<Account> {
        return Account(email: email, password: password).create(on: req)
    }
    
    func delete(_ req, Request, email: String, password: String) throws -> Future<[Account]> {
        return Account.query(on: req).filter(\.email == email).filter(\.password == password).all().do({rows in 
            rows[0].delete(on: req)
        })
    }
    
}
```

Thên nội dung sau vào `routes.swift`:
```
public func routes(_ router: Router) throws {
    // ...
    let accountController = AccountController()
    router.get("account") {req in
        return try accountController.list(req)
    }
    
    router.post("account", String.parameter, String.parameter) {req in
        return try accountController.create(req, email: try req.parameters.next(String.self), password: try req.parameters.next(String.self))
    }
    
    router.delete("account", String.parameter, String.parameter) {req in
        return try accountController.delete(req, email: try req.parameters.next(String.self), password: try req.parameters.next(String.self))
    }
}
```

Chúng ta có các hàm tương ứng với các thao tác cơ bản:
```
Model.query(on: req) // select *
Model.query(on: req).filter(\.property == ...) // where property='...'
Model.delete(on: req) // delete
Model.create(on: req) // insert into
Model.update(on: req) // update
```

Chạy Server và thử tạo một `Account`:
```
$ curl -X POST http://localhost:8080/account/myemail/mypassword
{"id":1,"email":"myemail","password":"mypassword"}
```

Vào `http://localhost:8080/account` và ta thấy:
```
[{"id":1,"email":"myemail","password":"mypassword"}]
```

Vậy là ta đã tạo `Account` thành công. Và giờ thử xóa `Account` đó:
```
$ curl -X DELETE http://localhost:8080/account/myemail/mypassword
```

Vào `http://localhost:8080/account` kiểm tra:
```
[]
```

Vậy là `Account` đó đã được xóa. Các thao tác căn bản của MySQL được thực hiện một cách dễ dàng!

### Tài liệu tham khảo
Vapor Docs: https://docs.vapor.codes/3.0/