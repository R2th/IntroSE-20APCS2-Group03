Khi bắt đầu với lập trình iOS, tôi luôn tò mò về các cách hoạt động tốt nhất ở các công ty lớn, họ cấu trúc project trông như thế nào? Kiến trúc họ đang sử dụng là gì? Thường sử dụng các thư viện nào? Đây là điều mình luôn canh cánh trong lòng để xây dựng dựa trên kinh nghiệm của người khác và không lãng phí thời gian cho những vấn đề đã được giải quyết. 
Hãy bắt tay vào thôi!

### Tránh lạm dụng Reference types

- Nên sử dụng reference type cho các object còn `sống`. `Sống` là như thế nào,  hãy cùng xem ví dụ dưới đây
```Swift
struct Car { 
  let model: String
}
class CarManager { 
  private(set) var cars: [Car]
  func fetchCars()
  func registerCar(_ car: Car)
}
```
🚗 chỉ là một giá trị, nó đại diện cho dữ liệu. Giống như `0`, nó không quản lý bất cứ điều gì. Vì vậy, nó không phải `sống`. Không có điểm nào xác định nó là một reference type.

Mặt khác, `CarManager` cần là 1 object `sống`, bởi vì object đó gọi request tới network và chờ response và lưu trữ các cars đã lấy được từ request. Ta không thể thực hiện bất kỳ hành động bất đồng bộ nào lên một reference type vì có thể chúng sẽ chết. `CarManager` sẽ sống trong phạm vi khi fetch cars từ server tới register new car.

### Không bao giờ sử dụng implicity unwrapped properties

Không nên sử dụng các thuộc tính ngầm mặc định. Vì bạn có thể quên nó ở hầu hết các trường hợp. Nhưng có thể có một số trường hợp đặc biệt khi đó bạn cần khái niệm này để làm hài lòng trình biên dịch. Và nó rất quan trọng để hiểu logic đằng sau nó.

Về cơ bản, nếu một thuộc tính phải `nil` trong quá trình khởi tạo, nhưng sẽ được gán sau đó cho giá trị không phải là `nil`, bạn có thể khai báo thuộc tính ngầm. Bởi vì bạn sẽ không bao giờ truy cập nó trước khi nó được set, do đó bạn sẽ không muốn trình biên dịch cảnh báo về việc nó bị nil

Nếu bạn nghĩ về mối quan hệ view-xib, bạn có thể hiểu hơn. Ví dụ về `nameLabel` outlet ở ví dụ sau

```Swift
class SomeView: UIView {
  @IBOutlet let nameLabel: UILabel
}
```
Nếu khai báo như trên, trình biên dịch sẽ cảnh báo bạn khai báo 1 giá trị khởi gạo và gán cho `nameLabel` 1 giá trị khác `nil`.  Điều này hoàn toàn bình thươngf vì bạn khai báo rằng SomeView sẽ luôn có một `nameLabel`. Nhưng bạn không thể làm điều này vì quá trình binding sẽ thực hiện phía sau scenes trong `initWithCoder`. 

Trong trường hợp này, bạn định nghĩa nó là một thuộc tính ngầm định. Nó giống như ký hợp đồng với trình biên dịch:
> You: “This will never be nil, so stop warning me about it.”
> 
> Compiler: “OK.”
``` Swift
class SomeView: UIView {
  @IBOutlet var nameLabel: UILabel!
}
```

Câu hỏi thường gặp: Có nên sử dụng thuộc tính ngầm định trong khi dequeing một cell từ tableview?

```Swift
guard let cell = tableView.dequeueCell(...) else {
  fatalError("Cannot dequeue cell with identifier \(cellID)")
}
```

### Tránh lạm dụng `AppDelegate`

`AppDelegate` không phải là nơi giữ PersistentStoreCoordinator, global objects, helper functions, manager, ...vv. Nó giống như bất kỳ class nào implement 1 protocol. Hãy tách riêng nó ra và không để các phần khác ảnh hưởng đến nó.

Vẫn biết rằng có nhiều thứ cần phải ném trong `applicationDidFinishLaunching` nhưng nó quá dễ để vượt khỏi tầm kiểm soát khi dự án ngày một lớn. Hãy luôn cố gắng tạo các class(files) riêng biệt để quản lý các chức năng riêng biệt.

Không nên

```Swift
let persistentStoreCoordinator: NSPersistentStoreCoordinator
func rgb(r: CGFloat, g: CGFloat, b: CGFloat) -> UIColor { ... }
func appDidFinishLaunching... {
  Firebase.setup("3KDSF-234JDF-234D")
  Firebase.logLevel = .verbose
  AnotherSDK.start()
  AnotherSDK.enableSomething()
  AnotherSDK.disableSomething()
  AnotherSDK.anotherConfiguration()
  persistentStoreCoordinator = ...
  return true
}
```

Nên

```Swift
func appDidFinishLaunching... {
  DependencyManager.configure()
  CoreDataStack.setup()
  return true
}
```

### Tránh lạm dụng các tham số mặc định

Bạn có thể set các giá trị mặc định cho tham số trong function, nó rất tiện lợi vì nếu không bạn sẽ phải tạo nhiều function chỉ để thêm cú pháp. Ví dụ
``` Swift
func print(_ string: String, options: String?) { ... }
func print(_ string: String) {
  print(string, options: nil)
}
```
Với parameter mặc định thì

```Swift
func print(_ string: String, options: String? = nil) { ... }!
```
[](https://images.viblo.asia/3323bca8-c1c8-46d9-ae96-5303622324a3.gif)

Khá đơn giản, nó đơn giản khi đặt màu mặc định cho custom UI component, để tuỳ chọn các option mặc định cho các chức năng parse function hoặc để chỉ định thời gian chờ  mặc định cho thành phần mạng của bạn, nhưng nên cẩn thận khi quá phụ thuộc vào nó.

Hãy xem ví dụ dưới đây
```Swift
class TicketsViewModel {
  let service: TicketService
  let database: TicketDatabase
  init(service: TicketService,
       database: TicketDatabase) { ... }
}
```
Sử dụng trong `App` target

```Swift
let model = TicketsViewModel(
  service: LiveTicketService()
  database: LiveTicketDatabase()
)
```
Sử dụng trong `Test` target

```Swift
let model = TicketsViewModel(
  service: MockTicketService()
  database: MockTicketDatabase()
)
```

Lý do bạn có các protocol cho service(TicketService) và database(TicketDatabase) là để trừu tượng hoá. Điều này cho phép bạn thực hiện bất kỳ implementation nào mà bạn muốn trong `TicketsViewModel`. Vì vậy nếu đưa tham số mặc định vào `TicketsViewModel` điều này sẽ khiến ViewModel phụ phuộc vào LiveTicketService, đây là một loại cụ thể. Nó mâu thuẫn với những gì bên trên ta mới đề cập

Liệu đã đủ thuyết phục chưa?

Hãy tưởng tượng bạn có các target là `App` và `Test`. `TicketsViewModel` thông thường sẽ được thêm vào cả 2 target, sau đó triển khai viewmodel với từng target khác nhau. Nếu bạn tạo ra một sự phụ thuộc giữa `TicketsViewModel` và `LiveTicketService`  Target Test của bạn sẽ không được biên dịch vì nó ko biết gì về `LiveTicketService`

### Sử dụng vardiric parameters

Nó khá là hay, dễ thực hiện

```Swift
func sum(_ numbers: Int...) -> Int {
  return numbers.reduce(0, +)
}
sum(1, 2)       // Returns 3
sum(1, 2, 3)    // Returns 6
sum(1, 2, 3, 4) // Returns 10
```

### Sử dụng nested type

Swift hỗ trợ kiểu inner types để bạn có thể các kiểu lồng bất cứ chỗ nào có ý nghĩa

Không nên:
```Swift
enum PhotoCollectionViewCellStyle {
  case default
  case photoOnly
  case photoAndDescription
}
```
Bạn sẽ không bao giờ sử dụng enum này bên ngoài PhotoCollectionViewCell vì vậy không có điểm nào đặt nó trong global.

Nên:
```Swift
class PhotoCollectionViewCell {
  enum Style {
    case default
    case photoOnly
    case photoAndDescription
  }
  let style: Style = .default
  // Implementation...
}
```

Điều này có ý nghĩa hơn vì Style là một phần của PhotoCollectionViewCell và ngắn hơn 23 ký tự so với PhotoCollectionViewCellStyle.

### `Final` là mặc định

Các class nên được `final` theo mặc định bởi vì bạn thường không thiết kế chúng để có thể mở rộng. Vì vậy, nó thực sự là một lỗi không làm cho họ cuối cùng. Ví dụ: bạn đã phân lớp PhotoCollectionViewCell bao nhiêu lần? 

Bonus: Bạn nhận được thời gian biên dịch tốt hơn một chút.

### Namespace cho constants

Bạn có biết rằng bạn có thể đặt tên cho các constants global của mình đúng cách thay vì sử dụng các tiền tố xấu như PFX hoặc k?

Không nên
```Swift
static let kAnimationDuration: TimeInterval = 0.3
static let kLowAlpha = 0.2
static let kAPIKey = "13511-5234-5234-59234"
```

Nên
```Swift
enum Constant {
  enum UI {
    static let animationDuration: TimeInterval = 0.3
    static let lowAlpha: CGFloat = 0.2  
  }
  enum Analytics {
    static let apiKey = "13511-5234-5234-59234"
  }
}
```
Sở thích cá nhân của tôi là chỉ sử dụng C thay vì Constant vì nó đủ rõ ràng. Bạn có thể chọn bất cứ điều gì bạn thích.

Before: kAnimationDuration or kAnalyticsAPIKey
After: C.UI.animationDuration or C.Analytics.apiKey

Look good đấy nhỉ :D

### Tránh lạm dụng `_`

_ là một biến lưu chỗ chứa các giá trị không sử dụng. Đó là một cách để nói với tôi, tôi không quan tâm đến giá trị này với trình biên dịch để nó không bị warning.

Không nên
```Swift
if let _ = name {
  print("Name is not nil.")
}
```

Nên:
```Swift
Nil-check:
if name != nil {
  print("Name is not nil.")
}
```

Thường không sử dụng
```Swift
_ = manager.removeCar(car) // Returns true if successful.
```
- Completion block

```Swift
service.fetchItems { data, error, _ in 
  // Hey, I don't care about the 3rd parameter to this block.
}
```

### Tránh đặt tên các phương thức mơ hồ

Điều này thực sự áp dụng cho bất kỳ ngôn ngữ lập trình nào cần được hiểu bởi con người. Mọi người không nên nỗ lực nhiều hơn để hiểu ý của bạn, thật khó để hiểu ngôn ngữ máy tính!

Ví dụ, kiểm tra func sau

```Swift
driver.driving()
```

Thực sự nó làm gì? Nó kiểm tra nếu lái xe đang lái xe và trả lại đúng nếu như vậy.

Refs: https://medium.com/nsistanbul/swifty-tips-%EF%B8%8F-8564553ba3ec