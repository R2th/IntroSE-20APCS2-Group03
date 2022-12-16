# Giới thiệu
Trong bài viết trước [Xây dựng những API đầu tiên sử dụng Vapor framwork
](https://viblo.asia/p/swift-xay-dung-nhung-api-dau-tien-su-dung-vapor-framwork-Eb85oM66Z2G), tôi đã giới thiệu đến các bạn cách xây dựng những API đầu tiên sử dụng Vapor Framwork, ở bài viết đó tôi đã sử dụng hệ cơ sở dữ liệu Sqlite, trong bài tiếp theo này tôi sẽ giới thiệu đến các bạn cách để sử dụng MySQL trong Vapor project.
# Cài đặt MySQL trên Mac
Chúng ta có thể cài đặt MySQL đơn giản thông qua Homebrew, như sau:
```
brew install mysql
```
Khởi động hệ thống mySQL:
```
sudo mysql.server start
```
có thể sẽ xẩy ra lỗi sau:
```
Starting MySQL
. ERROR! The server quit without updating PID file (/usr/local/var/mysql/anhnc.local.pid).
```
Điều này là do các vấn đề về permision
Bạn có thể sử dụng lệnh sau để sửa đổi permision: 
```
sudo chmod -R a+rwx /usr/local/var/mysql
```
Khởi động lại:
```
sudo mysql.server start
```

và kết quả là:
```
Starting MySQL
. SUCCESS!
```
Như vậy là chúng ta đã cài đặt xong MySQL trên mac rồi.
# Tạo cơ sở dữ liệu và config trong Vapor project
Để tạo một cơ sở dữ liệu mới, chúng ta cần phải đăng nhập vào máy chủ mysql của mình:
```
mysql -uroot -proot
```
```
CREATE DATABASE `mydb` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
Note: mydb chính là tên của cơ sở dữ liệu chúng ta tạo ra.

Config MySQL Package trong file Package.swift

```
let package = Package(
    name: "VaporDemo",
    dependencies: [
        // 💧 A server-side Swift web framework.
        .package(url: "https://github.com/vapor/vapor.git", from: "3.0.0"),

        // 🔵 Swift ORM (queries, models, relations, etc) built on SQLite 3.
        //.package(url: "https://github.com/vapor/fluent-sqlite.git", from: "3.0.0-rc.2"),
        
        // MySQL
        .package(url: "https://github.com/vapor/fluent-mysql.git", from: "3.0.0-rc")
        
    ],
    targets: [
        .target(name: "App", dependencies: ["FluentMySQL", "Vapor"]),
        .target(name: "Run", dependencies: ["App"]),
        .testTarget(name: "AppTests", dependencies: ["App"])
    ]
)
```

Bước tiếp theo là thay đổi mọi thứ FluentSQLite liên quan đến FluentMySQL và đăng ký thông tin cơ sở dữ liệu trong configuration.swift:
```
//import FluentSQLite
import Vapor
import FluentMySQL

/// Called before your application initializes.
public func configure(_ config: inout Config, _ env: inout Environment, _ services: inout Services) throws {
    /// Register providers first
    try services.register(FluentSQLiteProvider())

    /// Register routes to the router
    let router = EngineRouter.default()
    try routes(router)
    services.register(router, as: Router.self)

    /// Register middleware
    var middlewares = MiddlewareConfig() // Create _empty_ middleware config
    /// middlewares.use(FileMiddleware.self) // Serves files from `Public/` directory
    middlewares.use(ErrorMiddleware.self) // Catches errors and converts to HTTP response
    services.register(middlewares)

    // Configure a SQLite database
    //    let sqlite = try SQLiteDatabase(storage: .memory)
    //
    //    /// Register the configured SQLite database to the database config.
    //    var databases = DatabasesConfig()
    //    databases.add(database: sqlite, as: .sqlite)
    //    services.register(databases)
    
    try services.register(FluentMySQLProvider())
    let mysqlConfig = MySQLDatabaseConfig(
        hostname: "127.0.0.1",
        port: 3306,
        username: "root",
        password: "root",
        database: "mydb"
    )
    services.register(mysqlConfig)

    /// Configure migrations
    var migrations = MigrationConfig()
    migrations.add(model: User.self, database: .sqlite)
    services.register(migrations)

}
```

Tiếp theo, thay đổi Model User.swift từ SQliteModel -> MySQLModel

```
import Vapor
//import FluentSQLite
import FluentMySQL

final class User: MySQLModel {
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

Run project và check kết quả! 
# Kết luận
Trên đây tôi đã giới thiệu đến các bạn cách kết nối MySQL vào một Vapor prject rồi, cám ơn các bạn đã đọc bài viết!

Project Demo Link:
[Server](https://github.com/anhnc55/vapordemo)
[Client](https://github.com/anhnc55/clientApp)