### 3.Tạo URL Schemes của riêng bạn:
- Trong ví dụ QR Codes trên, chúng ta đã sử dụng QR từ ứng dụng của bên thứ ba:
  
  * Facebook - fb://feed
  * Whatsapp - whatsapp://send?text=Hello!
 - URL đầu tiên được sử dụng để mở nguồn cấp dữ liệu tin tức app Facebook của người dùng. URL khác là để gửi tin nhắn  bằng Whatsapp.  Apple cho phép các nhà phát triển tạo URL riêng của họ để giao tiếp giữa các app. Hãy xem cách chúng ta có thể thêm URL tùy chỉnh vào trình đọc QR Reader của app.
- Chúng ta sẽ tạo một app khác có tên TextReader . App này đóng vai trò là app người nhận xác định URL tùy chỉnh và chấp nhận tin nhắn  từ các app khác. URL tùy chỉnh sẽ trông giống như sau: 
  * textreader://Hello!
 - Khi một app (ví dụ: QR Code Reader) khởi chạy URL, iOS sẽ mở app TextReader và chuyển nó cho thông điệp Hello! . Trong Xcode, tạo một project mới bằng cách sử dụng mẫu Single View Application và đặt tên cho nó TextReader. Khi project được tạo, hãy mở rộng thư mục Supporting Files  trong project navigator và chọn Info.plist. Nhấp chuột phải vào bất kỳ vùng trống nào và chọn Add Row để tạo key mới.
 
	![alt](https://www.appcoda.com/wp-content/uploads/2018/01/url-schemes-3.png)
    
- Bạn sẽ được nhắc chọn một key từ drop-down menu. Cuộn xuống dưới cùng và chọn URL types. Chúng ta sẽ tạo ra một  mảng. Bạn có thể tiếp tục nhấp vào disclosure icon để mở rộng nó. Tiếp theo, chọn Item 0. Nhấp vào disclosure icon bên cạnh mục và mở rộng nó để hiển thị dòng định danh URL. Nhấp đúp vào trường giá trị để điền vào identifier của bạn. Thông thường, chúng ta sẽ đặt giá trị giống với ID Bundle (ví dụ: com.appcoda.TextReader).

- Tiếp theo, nhấp chuột phải vào Item 0 và chọn Add Row từ trình context Menu. Trong dropdown Menu, chọn URL Schemes để thêm mục.

![alt](https://www.appcoda.com/wp-content/uploads/2018/01/url-schemes-4.png)
- Một lần nữa, hãy nhấp vào biểu tượng tiết lộ của URL Schemes để mở rộng mục. Nhấp đúp vào hộp giá trị Item 0và nhập bằng textreader. Nếu bạn đã làm theo đúng quy trình,  URL types settings  của bạn sẽ giống như sau:
![alt](https://www.appcoda.com/wp-content/uploads/2018/01/url-schemes-5.png)
- Chúng ta đã định cấu hình lược đồ URL tùy chỉnh trong ứng dụng TextReader. Bây giờ app chấp nhận URL dưới dạng textreader://<message>. Chúng ta vẫn cần phải viết một vài dòng code như vậy để app biết phải làm gì khi một app khác khởi chạy URL tùy chỉnh (ví dụ textreader://Hello!).

- Như bạn đã biết, AppDelegatelớp thực hiện UIApplicationDelegate. Method được xác định trong protocol cho bạn cơ hội tương tác với các sự kiện quan trọng trong suốt thời gian tồn tại của app.

- Nếu có sự kiện Mở URL được gửi đến app của bạn, hệ thống sẽ gọi application(_:open:options:)  của  app được ủy quyền. Do đó, bạn sẽ cần implement method để phản hồi việc khởi chạy URL tùy chỉnh.

 ```javascript
 func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any] = [:]) -> Bool
```
- Mở AppDelegate.swift và thêm đoạn code sau để implement method:
 ```javascript
func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any] = [:]) -> Bool {
    
    let message = url.host?.removingPercentEncoding
    let alertController = UIAlertController(title: "Incoming Message", message: message, preferredStyle: .alert)
    let okAction = UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: nil)
    alertController.addAction(okAction)
    
    window?.rootViewController?.present(alertController, animated: true, completion: nil)
    
    return true
}
```
- Từ các arguments của application(_:open:options:)phương thức, bạn có thể mở URL. Ví dụ: nếu một  app khác khởi chạy textreader://Hello! thì URL sẽ được nhúng vào URL object. Dòng đầu tiên của code trích xuất thông điệp bằng cách sử dụng property của URL structure.

- URL chỉ có thể chứa ký tự ASCII, không được phép sử dụng dấu cách. Đối với các ký tự ngoài bộ ký tự ASCII, chúng phải được mã hóa bằng cách sử dụng mã hóa URL. Mã hóa URL thay thế các ký tự ASCII không an toàn bằng một % theo sau là hai chữ số thập lục phân và một dấu cách %20. Ví dụ: “Hello World!” Được mã hóa thành Hello% 20World! Các  method removingPercentEncoding được sử dụng để giải mã thông điệp bằng cách loại bỏ các mã hóa URL phần trăm. Phần còn lại của code rất đơn giản. Chúng ta khởi tạo UIAlertController và hiển thị thông báo trên màn hình.

- Nếu bạn chạy app, bạn sẽ thấy một màn hình trống. Điều đó là bình thường vì ứng dụng TextReader được kích hoạt bởi một ứng dụng khác bằng cách sử dụng URL tùy chỉnh. Bạn có hai cách để kiểm tra appg. Bạn có thể mở Safari trên thiết bị di động và nhập textreader://Great!%20It%20works!vào thanh địa chỉ - bạn sẽ được nhắc mở app TextReader. Sau khi được xác nhận, hệ thống sẽ chuyển hướng bạn đến app TextReader và hiển thị Great! It works!

- Ngoài ra, bạn có thể sử dụng app QR Code Reader để kiểm tra. Nếu bạn mở app và hướng camera đến mã QR được hiển thị bên dưới, app sẽ có thể giải mã thông báo nhưng không thể mở app TextReader.
![alt](https://www.appcoda.com/wp-content/uploads/2018/01/url-schemes-6.png)
- Bảng điều khiển sẽ hiển thị cho bạn lỗi sau:
 ```javascript
2018-29-04 16:28:52.795789+0800 QRCodeReader[33176:8736098] -canOpenURL: failed for URL: "textreader://Great!%20It%20works!" - error: "This app is not allowed to query for scheme textreader"

```
- Như đã giải thích trước đó, Apple đã thực hiện một số thay đổi đối với method canOpenURL này kể từ iOS 9. Bạn phải đăng ký các URL schemes tùy chỉnh trước khi method  trả về true. Để đăng ký một scheme tùy chỉnh, mở Info.plist của project QRReaderDemo  và thêm một key mới có tên LSApplicationQueriesSchemes. Đặt loại Array và thêm các mục sau:
 * textreader
  * fb
  *   whatapps
 ![alt](https://www.appcoda.com/wp-content/uploads/2018/01/url-schemes-8.png)
- Hơn nữa, nếu bạn quét mã QR của chương trình Facebook hoặc URL Schemes Whatsapp, app sẽ có thể khởi chạy app Facebook / Whatsapp tương ứng.