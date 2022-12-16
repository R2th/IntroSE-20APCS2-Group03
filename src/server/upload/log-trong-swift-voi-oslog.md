Khi cần phải sử dụng Log trong swift, điều đầu tiên chúng ta nghĩ đến thường là print và NSLog. Tuy nhiên, gần đây Apple đã giới thiệu 1 chuẩn mới cho việc Log khi lập trình dưới dạng [unified loggin](https://developer.apple.com/documentation/os/logging), bằng cách sử dụng OSLog. Đây là cách Log hiện đang được đề xuất, cung cấp một cách hiệu quả để capture các thông tin cần thiết khi code.

###### Unified loggin cung cấp một số cải thiện so với các kỹ thuật trước đây và cũng có một số khác biệt so với những gì chúng ta đã quen.
1. Mỗi message sẽ được Log lại ở 1 level thích hợp, bao gồm: default, error, debug và info. Giúp xác định cách mà message được show và được lưu giữ.
1. Các message được nhóm lại trong các subsystems và categories để cho phép tìm kiếm và lọc hiệu quả hơn.
1. Không cần phải bọc Log trong các điều kiện.
1. Bảo mật của người dùng được đặt lên cao, với các chuỗi content động cần thiết sẽ được đánh dấu là public, còn lại sẽ không được xử lý trong bất cứ log nào.

# Cùng Log nào

Sử dụng unified loggin trong Swift cũng đơn giản như cách sử dụng hàm os_log, chúng ta có thể nhanh chóng nhận thấy rằng StaticString là một argument thay vì một String thông thường. Cách dễ nhất để log các message là đặt String constant trực tiếp trong function. Có thể trích xuất message ra thành một property, tuy nhiên nó vẫn phải là một StaticString

```
os_log("User signed in")

let errorMessage: StaticString = "404 - NOT FOUND"
os_log(errorMessage)
```

Do sử dụng StaticString là bắt buộc, thay vì sử dụng một string đơn giản, chúng tà cần formart các arguments. Điều này có thể khiến ta bối rối khi mới sử dụng, tuy nhiên, không quá khó để sử dụng và mang lại lợi ích cho quyền riêng tư của user mà chúng ta sẽ thảo luận sau. Chúng ta có thể truy cập vào tất cả các kí hiệu tham số thông thường, cũng như các decoder.

```
let responseCode = "404 - NOT FOUND" 
os_log("HTTP response: %@", responseCode) 

let logMessage = "HTTP response: \(responseCode)" 
os_log("%@", logMessage)

// error: cannot convert value of type 'String' 
// to expected argument type 'StaticString' 
os_log("HTTP response: \(responseCode)")
```

# Tổ chức các Log
Gọi đến os_log có thể chỉ định OSLog để sử dụng, chứa một subsystem và category cụ thể. Thông tin này là không thể đánh giá khi lọc, tìm kiếm và đọc hiểu log sau này. Khi một log argument không được chỉ định, một đối số mặc định được sử dụng, không có subsystem hoặc category được cấu hình.

```
let uiLog = OSLog(subsystem: "com.lordcodes.chat.ChatApp", category: "UI") 
os_log("Contact selected", log: uiLog)

let networkLog = OSLog(subsystem: "com.lordcodes.chat.ChatKit", category: "Network") 
os_log("HTTP response: %@", log: networkLog, responseCode)
```

Hệ thống con sẽ gom lại tất cả các log cho một ứng dụng hoặc một module cụ thể, cho phép chúng ta lọc những gì thuộc về log của chúng ta. Từ đánh giá log của Apple, convention cho hệ thống con làreverse domain style, giống như là Bundle Identifier của ứng dụng hoặc framework. Nếu ứng dụng được module hoá thành các framework thì kiểu log này vô cùng cần thiết để phân biệt.

Các category được sử dụng thành từng nhóm log vào trong những vùng liên quan, để giúp ta khoanh vùng được scope của message log. Convention của category sử dụng là human-readable namegiống như là UI hoặc User. Chúng ta có thể nhóm log thành các layer xuyên suốt các hệ thống hoặc các chức năng, như là Networkhoặc Contacts. Hoặc thay vì cách trên, chúng ta có thể nhóm thành các class như là Contacts Repository. Tất cả phụ thuộc vào việc chúng ta đi theo hướng nào để hiểu được project của chúng ta dễ nhất.

Chúng ta có thể thêm các category và các hệ thống con như là extension của OSLog, làm cho chúng dễ truy cập hơn trong toàn ứng dụng. Lưu chúng vào một nơi tránh cho việc tạo chúng tràn lan khó kiểm soát.

```
extension OSLog { 
  private static var subsystem = Bundle.main.bundleIdentifier! 
  
  static let ui = OSLog(subsystem: subsystem, category: "UI") 
  static let network = OSLog(subsystem: subsystem, category: "Network") 
}
 
os_log("Contact selected", log: .ui) 
os_log("HTTP response: %@", log: .network, responseCode)
```
# Logging levels
Hệ thống log tổng hợp chứa đựng một set những tầng log mà ở đó sẽ hiện lên những message mà chúng ta hướng đến. Các tầng log sẽ điều khiển việc log sẽ hiện lên cho chúng ta như thế nào và khi nào với từng môi trường khác nhau. Hệ thống quản lý log có thể được tuỳ chỉnh dễ dàng dựa vào command-line .
1. Default: Tóm tất cả mọi thứ liên quan đến việc không thành công hoặc một cách fall-back nếu như không có tầng nào đảm nhiệm. Trừ khi thay đổi, message sẽ được lưu lại trong memory và vẫn giữ khi đầy.
1. Info: Tóm tất cả những gì hữu dụng, nhưng không dành cho việc chuẩn đoán và sửa chữa lỗi. Trừ khi thay đổi, message không được lưu lâu, khi memory đầy nó sẽ khi giải thoát.
1. Debug: Tóm lại thông tin trong quá trình phát triển để chuẩn đoán một lỗi cụ thể và lúc debugging. Tầng này sẽ không được hoạt động trừ khi thay đổi config.
1. Error: Tóm lại các lỗi của hệ thống. Message luôn được lưu lại, để đảm rằng nó không bị mất.
1. Fault: Tốm lại tầng của hệ thống hoặc lỗi đa luồng, thường là lỗi không phải do ứng dụng của chúng ta. Giống như tầng Error, message luôn được lưu lại. 

###### Đặc tả các tầng của log bằng các sử dụng OSLogType chính là một tham số của os_log
```
os_log("Contact selected", log: .ui, type: .info) 
os_log("Saving contact failed", log: .database, type: .error)
 
```

# User privacy
Để đảm bảo rằng thông tin bảo mật người dùng một cách chặt chẽ trong hệ thống log của ứng dụng, hệ thống log thống nhất có một tham số để phân biệt public và private. Mặc định, chỉ có scalar(boolean, integer) là được gom và các string động hoặc đối tượng động phức tạp là được ghi lại. Nếu cần thiết , tham số string động có thể được đặc tả thành public và tham số scalar có thể đặc tả thành private.
```
os_log("Contact %ld selected", 2) 
os_log("Contact %{private}ld selected", 2) 
 
os_log("HTTP response: %@", responseCode) 
os_log("HTTP response: %{public}@", responseCode)
```
Tránh tạo các public arguments bởi vì nó có thể dễ dàng gây lộ thông tin qua log của thiết bị.
# Reading logs
Trong lúc debugging, message log sẽ được hiện trong Xcode. Nhưng cách tốt nhất đọc log chính là ở trong console của MacOS. Ở đây chúng ta sẽ sắp xếp, loc và tìm kiếm log, cùng với việc xem chúng dễ hơn.
* Hiển thị log trong bảng, đọc dữ liệu dễ hơn
* Tìm kiếm và lọc bằng hệ thống con và category
* Hiển thị hoặc giấu các trường cho mỗi message log
* Tắt hoặc bug tầng debug và infor
* Lưu lại cấu trúc search để tìm lại trong tương lai dễ hơn.

###### Nguồn tham khảo: https://medium.com/swift-programming/clear-and-searchable-logging-in-swift-with-oslog-eadc97b1a9b8