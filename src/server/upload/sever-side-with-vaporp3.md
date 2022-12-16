# 1.Creating futures:
  Như các phần trước chúng ta đã làm quen với khái niệm futures và trong quá trình sử dụng đôi khi chúng ta cần tạo những futures cho riêng chúng ta. Nếu trong if-statement trả về non-Future và trong else-block trả về Future thì trình complier sẽ yêu cầu chúng ta phải đồng bộ dạng cho 2 giá trị trả về này. Để khắc phục điều này chúng ta sẽ phải convert non-future thành Future bằng cách sử dụng Future.map(on:). Ví dụ
  ```swift 
  // 1
func createTrackingSession(for request: Request)
  -> Future<TrackingSession> {
  return request.makeNewSession()
}

// 2
func getTrackingSession(for request: Request)
  -> Future<TrackingSession> {
  // 3
  let session: TrackingSession? =
    TrackingSession(id: request.getKey())
  // 4
  guard let createdSession = session else {
    return createTrackingSession(for: request)
  }
  // 5
  return Future.map(on: request) { createdSession }
}
  ```
  
   - Đây là những điều chúng ta vừa thực hiện:
     - 1. Khai báo func khởi tạo 1 TrackingSession từ request. Func này trả về Future<TrackingSession>.
     - 2. Khai báo func lấy tracking session từ request.
     - 3. Thử tạo tracking session từ request sử dụng key request. Trả về nil nếu tracking session không thể khởi tạo.
     - 4. Đảm bảo session được khởi tạo thành công để có thể khởi tạo tracking session mới.
     - 5. Tạo một Future<TrackingSession> từ session đã được khởi tạo bằng Future.map(on:). 
# 2.Fluent và Persisting Models”
1. Fluent: là một công cụ Vapor ORM(object relational mapping). Nó là một layer ở giữa Vapor appplication và database. Nó được thiết kế để chúng ta làm việc với database dễ dàng hơn. Sử dụng ORM như là Fluent có một số lợi ích sau:
  - Không phải làm việc trực tiếp với database. Khi chúng ta tương tác trực tiếp với database, chúng ta viết database queries dưới dạng string. Đó không phải là safe-type và có thể bị từ chối bởi Swift. 
  - Fluent cho bạn sử dụng bất kì database engine nào kể cả trong cùng 1 app.
  - Bạn không cần biết cách viết queries như thế nào với việc sử dụng models trong ngôn ngữ Swift.
2. Models: là cách biểu diễn data của bạn thông qua Fluent. Models có thể là object như user profiles mà bạn save và access trong database. Fluent sẽ trả về cho bạn type-safe models khi bạn tương tác với database. 
# 3. Another Vapor App(Acronyms):
   - Để vận dụng kiến thức đã nói trên, chúng ta sẽ cùng tạo 1 app để lưu trữ các từ viết tắt và ý nghĩa của chúng. Để khởi tạo project mới, sử dụng Vapor Toolbox. Trong terminal, chúng ta gõ những dòng lệnh sau:
```swift
cd ~/vapor
vapor new TILApp
```
   - Dòng command đầu tiên đưa bạn tới nơi chứa vapor folder trong máy tính của bạn - nơi bạn đã hoàn thành vapor app đầu tiên của bạn "Hello, Vapor!". Dòng command thứ 2 sẽ khởi tạo Vapor 3 project tên gọi TILApp sử dụng template mặc định.
![](https://images.viblo.asia/01055ce5-9a44-4937-b838-d739260e0e1d.png)
    - Template bao gồm các file examples cho models và controllers. Chúng ta sẽ cùng xây dựng template riêng nên hãy xóa đi các examples file này. Cùng gõ trong Terminal như sau:
```swift
cd TILApp
rm -rf Sources/App/Models/*
rm -rf Sources/App/Controllers/*
```
   - Để phòng trường hợp Xcode project bị thiếu file khi sử dụng Vapor. Cách đảm bảo nhất là có thể tạo project ở bên ngoài Xcode bằng cách sử dụng terminal. Chúng ta sẽ sử dụng Swift Package Manager-Vapor Toolbox để đẩm bảo chúng link đến đúng targer. Cùng khởi tạo Acronym model:
```swift
touch Sources/App/Models/Acronym.swift
```
   - Câu lệnh này sẽ khởi tạo Swift file trong App Models module với tên gọi Acronym.swift. Tiếp theo chúng ta sẽ khởi tạo Xcode project:
```swift
vapor Xcode -y
```
   - Mở configure.swift, tìm đến Configure migrations group và xóa những dòng sau:
```swift
migrations.add(model: Todo.self, database: .sqlite)
```
   - Tiếp đến, mở routes.swift và xóa những dòng sau:
```swift
// Example of configuring a controller
    let todoController = TodoController()
    router,get("todos", use: todoController.index)
    router,post("todos", use: todoController.create)
    router,delete("todos", use: Todo.parameter, use: todoController.delete)
```
   - Chúng ta vừa xóa bỏ những references cần thiết đến template example model và controller.
   - Mở Acronym.swift và thay thế content bằng việc khởi tạo basic model cho acronym
```swift
import Vapor
import FluentSQLite

final class Acronym: Codable {
    var id: Int?
    var short: String
    var long: String

    init(short: String, long: String) {
        self.short = short
        self.long = long
    }
}
```
   - Model bao gồm 2 String properties để lưu trữ Acronym và ý nghĩa của những acronym. Model có thể bao gồm optional id property để lưu ID của model nếu nó có tồn tại. Tất cả Fluent models phải tuân thủ Codeable.
   - Tiếp theo cùng thực hiện Acrinym tuân thủ theo Fluent's Model. Add thêm những dòng code sau vào cuối file:
```swift
    extension Acronym: Model {
    // 1
    typealias Database = SQLiteDatabase
    // 2
    typealias ID = Int
    // 3
    public static var idKey: IDKey = \Acronym.id
    }
```
   - Đây là điều chúng ta vừa thực hiện:
1.    Chỉ định cho Fluent chúng ra sẽ sử dụng database gì cho model này. Template đã được configure mặc định cho SQLite.
2.    Chỉ định ID type.
3.    Khai báo key path cho model ID property.
   - Chúng ta có thể cải thiện code như sau
```swift
    extension Acronym: SQLiteModel {}
```
   - Để lưu giữ model trong database, bạn phải khởi tạo table cho nó. Fluent làm việc đó trong migration. Migration cho phép bạn thay thế, test model trong database. Hầu hết chúng sử dụng database schema hoặc sử dụng table description. Cùng add thêm vào cuối file Acronym.swift để làm model conform với Migration:
```swift
    extension Acronym: Migration {}
```
   - Bây giờ chúng ta có thể tạo table khi app được khởi động. Mở configure.swift tìm đến // Configure migrations và thêm vào trước services.register(migrations):
```swift
    migrations.add(model: Acronym.self, database: .sqlite)
```
   - Chỉnh active scheme to Run with My Mac rồi Build and Run. Check console bạn sẽ thấy những output sau:
 
![](https://images.viblo.asia/cc982c33-f4b8-4712-86ff-8530027659a4.png)

# 4. Saving Models:
   - Khi chúng ta nhập vào một acronym mới, chúng ta cần phương án để lưu trữ chúng. Vapor sử dụng Content, Codeable cho phép bạn chuyển đổi model dưới các format khác nhau. 
   - Mở Acronym.swift và thêm vào cuối file dòng code sau để Acronym conform với Content:
```swift
    extension Acronym: Content {}
```
- Aconym đã sẵn sàng conforms Codeable, bạn không phải thực hiện thêm bất kì điều gì. Để tạo acronym, chúng ta sẽ gửi một POST request bao gồm JSON dưới dạng:
```swift
    "short": "OMG",
    "long": "Oh My God"
```
   - Chúng ta sẽ cần xử lý POST request này và save acronym mới. Mở routes.swift và thêm vào cuối file:
```swift
    // 1
router.post("api", "acronyms") { req -> Future<Acronym> in
  // 2
  return try req.content.decode(Acronym.self)
    .flatMap(to: Acronym.self) { acronym in
    // 3
    return acronym.save(on: req)
  }
}
```
- Chúng ta vừa thực hiện kha khá công việc đó:
1. Đăng ký route mới tại /api/acronyms để accept một POST request và trả về Future<Acronym>.
2. Decode JSON thành Acronym model với việc sử dụng Codeable. Trả về Future<Acronym> nên chúng ta sử dụng flatMap(to:) để extract acronym khi decoding hoàn thành.
3. Save model sử dụng Fluent. Trả về Future<Acronym>.
- Build and Run để test. Công cụ tốt để sử dụng là RESTed. Trong RESTed, chúng ta configure request như sau:
   - URL: http:/localhost:8080/api/acronyms/
   - method: POST
   - Paramater encoding: JSON-encoded
- Thêm 2 paramaters với names và values:
   - short: OMG
   - long: Oh My God
- Ấn Send request và bạn sẽ thấy kết quả trả về như sau:
![](https://images.viblo.asia/d3976d74-e775-432e-9ea9-2c741acfd522.png)
- Chúng ta sẽ cùng thực hiện việc Deploy tới Vapor Cloud sau:D.