Khi nhắc đến log ở trong ứng dụng của Swift hoặc iOS nói chung, thì những API mà thường hay được chúng ta nghĩ đến đầu tiên đó là `print` hoặc `NSLog` . Tuy nhiên, Apple đã giới thiệu một chuẩn mới cho việc log code trở nên thống nhất, đó là `OSLog`. Đây là cách log hiện tại đang được khuyến khích sử dụng nhất, đưa ra một cách tóm gọn thông tin hiệu quả trong toàn bộ ứng dung của chúng ta.

Việc log thống nhất cung cấp một số cải thiện lớn so với các kĩ thuật cũ và một số điểm mà chúng ta đã quen thuộc
1. Mỗi message có thể được log ở một tầng nhất định, bao gồm: default, error, debug và info. Nó ảnh hưởng đến việc message sẽ hiện ra cho chúng ta ra sao.
2. Các message sẽ được gom vào nhóm nằm trong các hệ thống con và các category để tiện cho việc tìm kiếm và lọc.
3. Không cần thiết phải gom các log lại trong các điều kiện, vì hệ thống được thiết kế cho hiệu suất và log được render khi đọc.
4. Bảo mật của người dùng được đặt lên cao, với các chuỗi content động cần thiết sẽ được đánh dấu là public, còn lại sẽ không được xử lý trong bất cứ log nào.

![](https://images.viblo.asia/fe8b6b86-4b3e-4321-a154-fccda6416287.png)

# Làm sao để Log
Việc sử dung log thống nhất trong Swift cực kỳ đơn giản bằng cách sử dụng hàm `os_log`, và chúng ta sẽ thấy rằng hàm này sẽ sử dụng `StaticString` làm tham số thay vì sử dụng `String` như bình thường. Cách đơn giản nhất để log một message đó chính là đưa thẳng `String` vào trong hàm để gọi. Có thể trích xuất message ra thành một property, tuy nhiên nó vẫn phải là một `StaticString`
```swift
os_log("User signed in")

let errorMessage: StaticString = "404 - NOT FOUND"
os_log(errorMessage)
```
Bởi vì yêu cầu là phải đưa vào một `StaticString`, thay vì dùng một string đơn giản, chúng ta phải sử dụng các tham số được format. Điều này có thể gây khó chịu, tuy nhiên nó không quá khó để sử dụng và cung cấp lợi ích cho việc bảo mật người dùng mà chúng ta sẽ đề cập đến sau này. Chúng ta có thể truy cập vào tất cả các [kí hiệu tham số thông thường ](https://developer.apple.com/library/archive/documentation/CoreFoundation/Conceptual/CFStrings/formatSpecifiers.html#//apple_ref/doc/uid/TP40004265) và các [decoder](https://developer.apple.com/documentation/os/logging#1682416). 
```swift
let responseCode = "404 - NOT FOUND" 
os_log("HTTP response: %@", responseCode) 

let logMessage = "HTTP response: \(responseCode)" 
os_log("%@", logMessage)

// error: cannot convert value of type 'String' 
// to expected argument type 'StaticString' 
os_log("HTTP response: \(responseCode)")
```

# Tổ chức Log
Gọi đến `os_log` sẽ đặc tả một đối tượng là `OSLog` để sử dụng, chứa bên trong nó là thông tin về hệ thống con và category. Thông tin này là vô giá cho việc tìm kiểu, lọc và đọc hiểu log sau này. 
```swift
let uiLog = OSLog(subsystem: "com.lordcodes.chat.ChatApp", category: "UI") 
os_log("Contact selected", log: uiLog)

let networkLog = OSLog(subsystem: "com.lordcodes.chat.ChatKit", category: "Network") 
os_log("HTTP response: %@", log: networkLog, responseCode)
```
Hệ thống con sẽ gom lại tất cả các log cho một ứng dụng hoặc một module cụ thể, cho phép chúng ta lọc những gì thuộc về log của chúng ta. Từ đánh giá log của Apple, convention cho hệ thống con là  `reverse domain style`, giống như là `Bundle Identifier` của ứng dụng hoặc framework. Nếu ứng dụng được module hoá thành các framework thì kiểu log này vô cùng cần thiết để phân biệt.

Các category được sử dụng thành từng nhóm log vào trong những vùng liên quan, để giúp ta khoanh vùng được scope của message log. Convention của category sử dụng là `human-readable name` giống như là `UI` hoặc `User`. Chúng ta có thể nhóm log thành các layer xuyên suốt các hệ thống hoặc các chức năng, như là `Network` hoặc `Contacts`. Hoặc thay vì cách trên, chúng ta có thể nhóm thành các class như là `Contacts Repository`. Tất cả phụ thuộc vào việc chúng ta đi theo hướng nào để hiểu được project của chúng ta dễ nhất.

Chúng ta có thể thêm các category và các hệ thống con như là extension của `OSLog`, làm cho chúng dễ truy cập hơn trong toàn ứng dụng. Lưu chúng vào một nơi tránh cho việc tạo chúng tràn lan khó kiểm soát.

```swift
extension OSLog { 
  private static var subsystem = Bundle.main.bundleIdentifier! 
  
  static let ui = OSLog(subsystem: subsystem, category: "UI") 
  static let network = OSLog(subsystem: subsystem, category: "Network") 
}

os_log("Contact selected", log: .ui) 
os_log("HTTP response: %@", log: .network, responseCode)
```
# Các tầng Log
Hệ thống log tổng hợp chứa đựng một set những tầng log mà ở đó sẽ hiện lên những message mà chúng ta hướng đến. Các tầng log sẽ điều khiển việc log sẽ hiện lên cho chúng ta như thế nào và khi nào với từng môi trường khác nhau. Hệ thống quản lý log có thể được tuỳ chỉnh dễ dàng dựa vào [command-line ](https://developer.apple.com/documentation/os/logging#2878594). 
1. Default: Tóm tất cả mọi thứ liên quan đến việc không thành công hoặc một cách fall-back nếu như không có tầng nào đảm nhiệm. Trừ khi thay đổi, message sẽ được lưu lại trong memory và vẫn giữ khi đầy.
2. Info: Tóm tất cả những gì hữu dụng, nhưng không dành cho việc chuẩn đoán và sửa chữa lỗi. Trừ khi thay đổi, message không được lưu lâu, khi memory đầy nó sẽ khi giải thoát.
3. Debug: Tóm lại thông tin trong quá trình phát triển để chuẩn đoán một lỗi cụ thể và lúc debugging. Tầng này sẽ không được hoạt động trừ khi thay đổi config.
4. Error: Tóm lại các lỗi của hệ thống. Message luôn được lưu lại, để đảm rằng nó không bị mất.
5. Fault: Tốm lại tầng của hệ thống hoặc lỗi đa luồng, thường là lỗi không phải do ứng dụng của chúng ta. Giống như tầng Error, message luôn được lưu lại.

Đặc tả các tầng của log bằng các sử dụng `OSLogType` chính là một tham số của `os_log`
```swift
os_log("Contact selected", log: .ui, type: .info) 
os_log("Saving contact failed", log: .database, type: .error)
```
# Bảo mật người dùng
Để đảm bảo rằng thông tin bảo mật người dùng một cách chặt chẽ trong hệ thống log của ứng dụng, hệ thống log thống nhất có một tham số để phân biệt public và private. Mặc định, chỉ có scalar(boolean, integer) là được gom và các string động hoặc đối tượng động phức tạp là được ghi lại. Nếu cần thiết , tham số string động có thể được đặc tả thành public và tham số scalar có thể đặc tả thành private.
```swift
os_log("Contact %ld selected", 2) 
os_log("Contact %{private}ld selected", 2) 

os_log("HTTP response: %@", responseCode) 
os_log("HTTP response: %{public}@", responseCode)
```

# Đọc Log
Trong lúc debugging, message log sẽ được hiện trong Xcode. Nhưng cách tốt nhất đọc log chính là ở trong console của MacOS. Ở đây chúng ta sẽ sắp xếp, loc và tìm kiếm log, cùng với việc xem chúng dễ hơn.
* Hiển thị log trong bảng, đọc dữ liệu dễ hơn
* Tìm kiếm và lọc bằng hệ thống con và category
* Hiển thị hoặc giấu các trường cho mỗi message log
* Tắt hoặc bug tầng debug và infor
* Lưu lại cấu trúc search để tìm lại trong tương lai dễ hơn.

Trên đây là cách để tạo ra những dòng log thực sự là hưu hiệu và đem lại hiệu quả cao nhất cho quá trình phát triển của chúng ta. Cảm ơn các bạn đã đón xem.
REF : https://medium.com/swift-programming/clear-and-searchable-logging-in-swift-with-oslog-eadc97b1a9b8