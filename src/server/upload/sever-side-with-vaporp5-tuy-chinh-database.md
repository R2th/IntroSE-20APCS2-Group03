# 1.Tại sao phải sử dụng database:
* Database được xây dựng dựa trên tính xác thực, an toàn, dễ dàng cho việc lưu trữ cũng như truy xuất của data. Nếu application của chúng ta lưu trữ thông tin trong memory thì việc đánh mất thông tin khi ngừng sử dụng application chắc chắc sẽ xảy ra.
# 2.Lựa chọn database:
* Vapor chính thức hỗ trợ các database cho Swift-native như:
    - SQLite
    - PostgreSQL
    - MySQL
* Có hai loại database: relational-SQL database và non-relational-NoSQL database. 
    - Relational database lưu trữ data trong các cấu trúc bảng và cột được định danh. Chúng
hữu dụng cho việc lưu trữ và truy xuất data. Chúng ta có thể sử dụng các lệnh structured query language(SQL) để truy vẫn cũng như truy xuất data từ nhiều bảng có liên quan với nhau. VD: Chúng ta có một danh sách thú cưng trong một bảng và danh sách các người chủ ở một bảng khác. Chúng ta hoàn toàn có thể lấy ra thông tin của pet cũng như tên chủ sở hữu của nó chỉ với một câu lệnh query. HIện tại, Vapor chỉ hỗ trợ cho relational(SQL) databases nhưng điều này sẽ thay đổi trong tương lai.
   - Trong khi relational databases thể hiện rất tốt trong việc lưu trữ các dữ liệu theo mẫu có sẵn  - điều này đồng nghĩa bạn sẽ gặp vấn đề khi phải thay đổi cấu trúc data. Hiện tại NoSQL databases đang dần trở nên phổ biến trong việc lưu trữ số lượng lớn data không theo cấu trúc có sẵn.
# 3.Tùy chỉnh database:
* Tùy chỉnh Vapor application để sử dụng database sẽ tuân theo một số bước như sau:
    - Thêm Fluent Provider cho database đến application services.
    - Tùy chình database.
    - Tùy chỉnh sự sắp xếp trong database cho phù hợp nhu cầu sử dụng.
* **SQLITE**: Template mẫu sẵn của Vapor Toolbox đang sử dụng SQLite. Acronym model trong các bài viết trước cũng đang sử dụng SQLite.Tuy nhiên để hiểu rõ hơn cơ chế hoạt động của database, cùng mở Package.swift trong project directory.

```swift
// swift-tools-version:4.0
import PackageDescription

let package = Package(
  name: "TILApp",
  dependencies: [
    //  A server-side Swift web framework.
    .package(url: "https://github.com/vapor/vapor.git",
             from: "3.0.0"),

    //  Swift ORM framework (queries, models, and relations)
    // for building NoSQL and SQL database integrations.
    .package(url: "https://github.com/vapor/fluent-sqlite.git",
             from: "3.0.0-rc"),
  ],
  targets: [
    .target(name: "App", dependencies: ["FluentSQLite",
                                        "Vapor"]),
    .target(name: "Run", dependencies: ["App"]),
    .testTarget(name: "AppTests", dependencies: ["App"]),
  ]
)
```
* Chúng ta có thể thấy rằng application đang sử dụng FluentSQLite. Chúng ta đang phân vân không biết có thể tùy chỉnh database ở đâu? Sources/App/configure.swift chính là câu trả lời:
```swift
// 1
try services.register(FluentSQLiteProvider())

// 2
var databases = DatabasesConfig()
try databases.add(database: SQLiteDatabase(storage: .memory),
                  as: .sqlite)
services.register(databases)

// 3
var migrations = MigrationConfig()
migrations.add(model: Acronym.self, database: .sqlite)
services.register(migrations)
```
* Chúng ta đã thực hiện các bước sau:
    - 1.Đăng ký FluentSQLiteProvider services cho phép application tương tác với SQLite.
    - 2.Tạo DatabaseConfig type để đăng ký khởi tạo cho SQLiteDatabase. Định dạng .sqlite được thấy trong app. Lưu ý là sử dụng .memory để lưu trữ. Điều này có nghĩa là database được lưu trong memory sẽ không được lưu trữ tới disk và sẽ mất khi app bị gián đoạn.
    - 3.Tạo một MigrationConfig type để xác định cho application loại database nào sẽ được sử dụng.
* Nếu chúng ta muốn lưu trữ data với SQLite, cùng chuẩn bị SQLiteDatabase với đường dẫn:
```swift
let database = SQLiteDatabase(storage: .file(path: "db.sqlite")
try databases.add(database: database), as: .sqlite) 
```
* Điều này tạo ra file database với đường dẫn chỉ định nếu file đó chưa tồn tại. Còn nếu file database đã tồn tại, SQLiteDatabase sẻ dử dụng nó.

* **PostgreSQL**:
* Để test khả năng làm việc với PostgreSQL, chúng ra sẽ chạy Postgre server trong Docker container. Cùng mở terminal và gõ dòng lệnh sau:
```swift
docker run --name postgres -e POSTGRES_DB=vapor \
  -e POSTGRES_USER=vapor -e POSTGRES_PASSWORD=password \
  -p 5432:5432 -d postgres
```
* Điểm qua chúng ta đã làm gì với lệnh trên:
    - Chạy container mới với tên postgres.
    - Chỉ rõ tên database, username, password thông qua môi trường varible.
    - Cho phép application truy cập với Postgres server trong port mặc định: 5342
    - Chạy server trong background.
    - Sử dụng Docker image tên postgres cho container này. Nếu image không được tái hiện trên thiết bị của bạn, Docker sẽ tự động download nó.
    - Để check rằng database của bạn đang chạy, terminal sẽ hiện lên các thông số sau:
  ![](https://images.viblo.asia/a32b1319-d66f-44a1-a6dd-72132ae44e70.png)
* Để kiểm tra lại chúng ta cùng gõ
```swift
docker ps
```
![](https://images.viblo.asia/829af8cf-2338-4cf1-a3c3-c69a46c81e21.png)https://images.viblo.asia/829af8cf-2338-4cf1-a3c3-c69a46c81e21.png
* Vậy là Postgres đã chạy. Để cài đặt cho Vapor Application, mở file Package.swift, thay thế contents bên trong theo mẫu sau:
```swift
// swift-tools-version:4.0
import PackageDescription

let package = Package(
  name: "TILApp",
  dependencies: [
    .package(url: "https://github.com/vapor/vapor.git",
             from: "3.0.0"),

    // 1
    .package(
      url: "https://github.com/vapor/fluent-postgresql.git",
      from: "1.0.0-rc"),
  ],
  targets: [
    // 2
    .target(name: "App", dependencies: ["FluentPostgreSQL",
                                        "Vapor"]),
    .target(name: "Run", dependencies: ["App"]),
    .testTarget(name: "AppTests", dependencies: ["App"]),
  ]
)
```
- Cùng điểm qua những gì chúng ta vừa thực hiện:
    1.Chỉ rõ FluentPostgreSQL như là một package độc lập.
    2.Chỉ rõ App target phụ thuộc vào FluentPostgreSQL để đảm bảo link chính xác.
- Cùng mở Xcode, configure.swift. Để chuyển sang sử dụng PostgreSQL chúng ta thay thế content theo mẫu sau:
```swift
// 1
import FluentPostgreSQL
import Vapor

public func configure(
  _ config: inout Config,
  _ env: inout Environment,
  _ services: inout Services
) throws {
  // 2
  try services.register(FluentPostgreSQLProvider())
  let router = EngineRouter.default()
  try routes(router)
  services.register(router, as: Router.self)

  var middlewares = MiddlewareConfig()
  middlewares.use(ErrorMiddleware.self)
  services.register(middlewares)

  // Configure a database
  var databases = DatabasesConfig()
  // 3
  let databaseConfig = PostgreSQLDatabaseConfig(
    hostname: "localhost",
    username: "vapor",
    database: "vapor",
    password: "password")
  let database = PostgreSQLDatabase(config: databaseConfig)
  databases.add(database: database, as: .psql)
  services.register(databases)

  var migrations = MigrationConfig()
  // 4
  migrations.add(model: Acronym.self, database: .psql)
  services.register(migrations)
}
```

- Những thay đổi xảy ra ở đây là:
    1. Import FluentPostgreSQL
    2. Đăng ký FluentPostgreSQLProvider.
    3. Set up tùy chỉnh PostgreSQL database sử dụng tên giống với variable Docker.
    4. Thay đổi Acronym migration thành .psql để sử dụng.
- Cuối cùng thay đổi Acronym model để phù hợp với PostgreSQLModel. Mở Acronym.swift và thay đổi content bên trong thành:
```swift
import Vapor
import FluentPostgreSQL

final class Acronym: Codable {
  var id: Int?
  var short: String
  var long: String

  init(short: String, long: String) {
    self.short = short
    self.long = long
  }
}

extension Acronym: PostgreSQLModel {}
extension Acronym: Migration {}
extension Acronym: Content {}
```
- Chúng ta kiểm tra kết quả migration với messeage như sau:
![](https://images.viblo.asia/4840a912-227b-4b35-a0c7-21fe715c9523.png)https://images.viblo.asia/4840a912-227b-4b35-a0c7-21fe715c9523.png