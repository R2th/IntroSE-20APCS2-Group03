# URLSession 
Mình đã có bài viết về URLSession là gì, khi nào cần sử dụng và cách tạo một session để fetch data từ internet. Nếu là người mới tiếp cận với URLSession thì bạn nên đọc [bài viết này](https://viblo.asia/p/urlsession-networking-trong-swift-ORNZqVwLl0n) trước khi tiến sâu vào tìm hiểu: **sự khác biệt giữa shared session và default session**
> **URLSession** là một framework được chính **Apple** phát triển và implement sẵn trong iOS, nó cung cấp **API** giúp người dùng tải xuống và upload dữ liệu thông qua các đường dẫn URLs.
-----
Cùng đi xem 2 cách phổ biến nhất tạo ra URLSession để thấy sự khác biệt của chúng nhé
# Sử dụng shared session
Cách đơn giản nhất để tạo một session là dùng **shared session** hay tên gọi khác là **shared singleton session**
```Swift
let session = URLSession.shared
let url = URL(string: "...")!
let task = session.dataTask(with: url, completionHandler: { data, response, error in
    // handle result in completion handler
})
task.resume()
```
Cách xử lí `data`, `response`, `error` như thế nào mình đã đề cập ở  [bài trước](https://viblo.asia/p/urlsession-networking-trong-swift-ORNZqVwLl0n)

##  1.  **Ưu điểm** : an toàn, nhanh gọn lẹ.
1. Là một **singleton** đảm bảo việc lớp này chỉ có một instance duy nhất được khởi tạo và ứng dụng của bạn thực sự chỉ dùng duy nhất instance đó.
2. Với cấu hình mặc định, nó phù hợp với các request cơ bản, không yêu cầu cài đặt cấu hình và khởi tạo với vài dòng code ở trên

##  2. **Nhược điểm** : 
1. Không thể thay đổi cấu hình có sẵn
2. Không thể đặt delegate cho session, nghĩa là không can thiệp vào được hành vi kết nối, lấy và trả dữ liệu của session
3. Không tạo được các request tải xuống hoặc upload dữ liệu khi ứng dụng của bạn chạy dưới background.

Shared session có cấu hình sẵn sử dụng shared `URLCache`, `HTTPCookieStorage`, and `URLCredentialStorage` objects dựa trên một cấu hình mặc định

##  3. **Quản lý** : 
Shared session thực sự rất phù hợp với những request đơn giản và nhanh, nhưng vì hướng phát triển của dự án, bạn thấy liệu shared session còn phù hợp với các request lâu hơn và phức tạp hơn ? Hãy xem trong shared `URLCache`, `HTTPCookieStorage`, and `URLCredentialStorage` có đáp ứng đủ yêu cầu không nhé

* VD truy xuất vào không giạn bộ nhớ cache được cung cấp bởi `shared URLCache`, từ đó giúp bạn điều chỉnh hành vi trong quá trình request
```Swift
let sharedSession = URLSession.shared
let urlCache = URLSession.shared.configuration.urlCache
let diskCapacity = urlCache?.diskCapacity
let memoryCapacity = urlCache?.memoryCapacity
let currentMemoryUsage = urlCache?.currentMemoryUsage
let currentDiskUsage = urlCache?.currentDiskUsage

print("disk Capacity: \(diskCapacity!)")
print("memory Capacity: \(memoryCapacity!)")
print("current Memory Usage: \(currentMemoryUsage!)")
print("current Disk UsageL \(currentDiskUsage!)")

/*
Kết quả: (đơn vị :byte)
disk Capacity: 10000000
memory Capacity: 512000
current Memory Usage: 0
current Disk UsageL 81920
/*
```
Túm lại, khi bạn chắc chắn rằng không phải quan tâm đến việc cấu hình lại cache, cookies, storage, xác thực, header, protocols ... (tất cả mọi thứ nằm trong configuration) thì cứ shared session mà tang. Ngược lại, default session là sự thay thế `hảo hán`, à nhầm hoàn hảo 🤟
# Sử dụng default session
> Sự khác biệt lớn nhất giữa **shared session** và **default session** là bạn có thể **cấu hình lại** nó


Khởi tạo:
```Swift
let configuration = URLSessionConfiguration.default
/*
NOTE: tất cả cấu hình phải nằm trước khi gán configuration cho session, 
nếu bất cứ thay đổi configuration nào nằm sau sẽ không có tác dụng
*/
let session = URLSession(configuration: configuration)
```
## Delegate và queue
Với delegate và optional queue, bạn có thể hoàn toàn nắm quyền kiểm soát session. Với delegate, bạn có thể thực hiện các hàm callbacks khi xác thực authentication lỗi, chuyển hướng hay cập nhập tiến trình, ...
```Swift
let session = URLSession(configuration: configuration,
                              delegate: delegate,
                         delegateQueue: nil)
```
## URLSessionConfiguration Options
Configuration cho phép bạn thay đổi những option sau:
### 1. Cache
Cách truy xuất vào URLCache
```Swift
let shared = URLCache.shared //

print(shared.memoryCapacity) // 512000 (512Kb)
print(shared.diskCapacity)   // 10000000 (10Mb)

// Nếu chừng đó là chưa đủ, có thể thay đổi
shared.memoryCapacity = 500_000_000 // 500Mb
```
Hoặc bạn chẳng cần cache:
```Swift
configuration.urlCache = nil
```
Hoặc bạn muốn thay đổi cache:
```Swift
let cache = URLCache(memoryCapacity: 500_000_000, 
                       diskCapacity: 1_000_000_000)
configuration.urlCache = cache
```
### 2. HTTP Headers
Bạn muốn thay đổi HTTP Headers cho tất cả request, cách thêm một `key - value` vào `httpAdditionalHeaders` dictionarys. Điển hình là `"User-Agent": "MyApp 1.0"`
```Swift
configuration.httpAdditionalHeaders = ["User-Agent": "MyApp 1.0"]
```
### 3. Request timeout
```Swift
configuration.timeoutIntervalForRequest = 30
```
Đây là khoảng thời gian 1 tác vụ đợi dữ liệu đến và được tính bằng giây. Mặc định `timeoutIntervalForRequest = 60`. Hãy cân nhắc không để thời gian quá nhỏ phòng trường hợp mạng bị bóp băng thông hoặc kết nối kém
### 4. Resource Timeout
```Swift
configuration.timeoutIntervalForResource = 300
```
Đây là khoảng thời gian một session sẽ đợi cho tất cả yêu cầu được hoàn thành, tính bằng giây. Giá trị mặc định là ` 7 ngày ` - có vẻ ngoài mong đợi của bạn
### 5. Chờ kết nối (iOS 11)
```Swift
configuration.waitsForConnectivity = true
```
Từ iOS 11 có thêm `waitsForConnectivity` cho phép đợi việc kết nối thiết lập hoàn tất, VD kết nối qua VPN. Giá trị mặc định là `false`
### 6. Cho phép truy cập mạng di động
```Swift
configuration.allowsCellularAccess = false
```
Giá trị mặc định là `true`. Lựa chọn là của bạn!!!
### 7. Cho phép truy cập chế độ dữ liệu tốc độ thấp (iOS 13)
```Swift
configuration.allowsConstrainedNetworkAccess = false
```
Giá trị mặc định là `true`. Người dùng có thể cho phép `Low Data Mode` hay `Truy cập dữ liệu tốc độ thấp` trong cài đặt của device
### 8. Cho phép truy cập mạng "đắt tiền" 
Giá trị mặc định là `true` cho phép ssesion truy cập vào mạng "đắt tiền". Hệ thống sẽ quyết định như thế nào là "đắt tiền" - như kiểu chuyển vùng dữ liệu di động trong Settings của device cũng có ><, cái này mình không chắc 😂

Để ngăn cản điều đó, hãy dùng 
```Swift
configuration.allowsConstrainedNetworkAccess = false
configuration.allowsExpensiveNetworkAccess = false
```
# Túm lại: 
* Shared session là singleton, khởi tạo nhanh gọn lẹ, phù hợp request cơ bản. Không cấu hình lại được
* Default session cho phép bạn cấu hình lại và hoàn toàn kiểm soát hành vi với delegate 
# Tài liệu tham khảo:
https://viblo.asia/p/urlsession-networking-trong-swift-ORNZqVwLl0n
https://developer.apple.com/documentation/foundation/urlsession
https://developer.apple.com/documentation/foundation/urlsession/1409000-shared
https://useyourloaf.com/blog/urlsessionconfiguration-quick-guide/