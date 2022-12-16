Một project Xcode hoàn toàn mới sẽ có 2 cấu hình build đó là **Debug** và **Release**. Hầu hết các project xác định một hoặc nhiều cấu hình build bổ sung vì nhiều lý do. Đây không phải là mới và đó là một cách thực hành tốt để sử dụng các cấu hình build để điều chỉnh bản build theo nhu cầu cụ thể của môi trường mà nó sẽ được triển khai.

Trong bài viết này, tôi chỉ cho bạn cách quản lý an toàn dữ liệu dành riêng cho cấu hình build, chẳng hạn như API keys, thông tin đăng nhập và dữ liệu nhạy cảm khác. Có một số cách để quản lý cấu hình build, nhưng có những khác biệt quan trọng bạn cần xem xét, đặc biệt là trong bối cảnh bảo mật.

## Thêm một cấu hình
Bật Xcode và tạo một project mới bằng cách chọn **Single View App** từ **iOS > Application**.
![](https://images.viblo.asia/566cba4b-2091-4928-9909-9c998c4c8595.png)

Đặt tên cho project là **Configurations**, đặt **Language** thành **Swift** và đảm bảo các hộp kiểm ở phía dưới không được chọn và cuối cùng nhấp vào **Create** để hoàn thành việc tạo mới.
![](https://images.viblo.asia/f0377c97-0b5b-469b-9b13-10a33f0ff339.png)

Mở **Project Navigator** bên trái và nhấp vào project ở trên cùng. Chọn project trong phần **Project** để hiển thị chi tiết project. Một project Xcode hoàn toàn mới xác định hai cấu hình build, **Debug** và **Release**.
![](https://images.viblo.asia/fd2e16c1-16cf-45b0-a01f-8a6096a02760.png)

Bạn thường sử dụng cấu hình **Debug** trong quá trình phát triển trong khi cấu hình **Release** được sử dụng để tạo các bản build App Store hoặc TestFlight. Điều này có lẽ không phải là mới đối với bạn.

Nhiều ứng dụng giao tiếp với backend và đó là một thực tế phổ biến mà ta cần phải tạo thêm môi trường **Staging** và **Production**. Môi trường **Staging** được sử dụng trong quá trình phát triển. Nháy đúp vào cấu hình **Debug** và đổi tên thành **Staging**.
![](https://images.viblo.asia/86942bb1-a3f6-4787-bdb4-d625f350753d.png)

Hãy thêm một cấu hình thứ ba cho môi trường **Production**. Nhấp vào nút + ở cuối cùng, chọn **Duplicate "Staging" Configuration** và đặt tên cho cấu hình **Production**.
![](https://images.viblo.asia/68f79228-de02-481f-84f4-932342df62d1.png)
![](https://images.viblo.asia/6ef8f7f0-3c3a-4687-80f0-61beb7127016.png)

Hãy tạo một scheme cho từng cấu hình để giúp dễ dàng chuyển đổi nhanh giữa các môi trường. Chọn scheme ở trên cùng và chọn **Manage Scheme ...** từ menu. Chọn scheme có tên **Configurations** và nhấp vào nó một lần nữa. Đổi tên nó thành **Staging**.

![](https://images.viblo.asia/3b453a68-bca3-4942-a5a9-d8979af842a7.png)

Với scheme được chọn, nhấp vào biểu tượng bánh răng ở phía dưới và chọn **Duplicate**. Đặt tên cho scheme là **Production**. Chọn **Run** ở bên trái và đặt **Build Configuration** thành **Production**.
![](https://images.viblo.asia/01e71d58-fca0-4e7c-90e8-df540db2fccb.png)

Bây giờ chúng ta có một cấu hình build cho staging và production. Các scheme sẽ làm nhanh chóng và dễ dàng để chuyển đổi giữa các cấu hình build.

## User-Defined Build Settings
Như tôi đã nói từ trước, có nhiều giải pháp để quản lý data cho từng cấu hình build cụ thể. Trong bài viết này, tôi chỉ ra một giải pháp tôi sử dụng trong bất kỳ dự án nào có một số phức tạp đối với nó. Trước khi tôi đưa ra giải pháp tôi có trong đầu, tôi muốn chỉ cho bạn một giải pháp khác thường được các nhà phát triển sử dụng.

Lựa chọn project trong **Project Navigator** ở bên trái. Chọn mục tiêu **Configations** từ phần **Targets** và nhấp vào tab **Build Settings** ở trên cùng.
![](https://images.viblo.asia/82421e33-afe9-44df-b91d-129b4ce99b39.png)
Tab **Build settings** hiển thị cài đặt build cho mục tiêu **Configurations**. Có thể mở rộng danh sách này với các cài đặt bản dựng mà bạn tự định nghĩa. Nhấp vào nút + ở trên cùng và chọn **Add User-Defined Setting.**

![](https://images.viblo.asia/a6dd8134-5375-4038-b6c9-4843092a71fd.png)

Thêm 1 định nghĩa người dùng có tên là **BASE_URL**. Định nghĩa 1 base URL là việc làm phổ biến đối với những ứng dụng làm việc với backend.
![](https://images.viblo.asia/38ccbac0-a2b0-45b2-ab23-1ab9cc4a49d0.png)

Lợi ích của việc thêm định nghĩa người dùng là gì? Việc thêm định nghĩa người dùng cho phép chúng ta thay đổi giá trị **BASE_URL** cho từng cấu hình build cụ thể. Nhấp vào nút tam giác bên trái định nghĩa người dùng để hiển thị danh sách cách cấu hình build.
![](https://images.viblo.asia/0003d779-8a3f-43fb-aa0a-c8c76e844b4a.png)
Đặt giá trị cho **Production** và **Release** là  https://cocoacasts.com và đặt giá trị cho **Staging** là **https://staging.cocoacasts.com.**
Cái tên nói lên tất cả, một cấu hình build sẽ có hiệu lực trong quá trình build. Và code của bạn không thể truy cập vào cấu hình build mà bạn đã định nghĩa. Đó là một qua niệm sai lầm tương đối phổ biến. Có 1 giải pháp cho điều này. Mở **Info.plist** và thêm 1 cặp key/value. Đặt key là **BASE_URL** và có giá trị là $(BASE_URL).
![](https://images.viblo.asia/0f990d23-a500-4131-bbda-1b4a5c7c067e.png)

Việc thêm key/value như trên vào dự án thì có giá trị gì? Value của cặp key/value sẽ được cập nhật trong quá trình build. Xcode sẽ kiểm tra build settings cho từng cấu hình build và đặt giá trị cho key **BASE_URL** trong **Info.plist**.

Mở Appdelegate.swift tìm đến function application(:didFinishLaunchingWithOptions:). Chúng ta cần truy cập vào Info.plist bằng cách thông qua thuộc tính infoDictionary của Bundle. 
```
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    print(Bundle.main.infoDictionary?["BASE_URL"])
    return true
}
```
Lựa chọn Production scheme và chạy thử ứng dụng trên simulator. Quan sát output trong console :
```
Optional(https://cocoacasts.com)
```
Lựa chọn Staging scheme chạy simulator và quan sát output trong console :
```
Optional(https://staging.cocoacasts.com)
```
## Vấn đề về bảo mật
Hầu hết các nhà phát triển thấy giải pháp trên rất hiệu quả. Và đúng vậy. Tuy nhiên có 1 vấn đề ở đây. Chúng ta có thể dễ dàng trích xuất file Info.plist khi tải 1 ứng dụng từ App Store xuống. Điều gì sẽ xảy ra nếu bạn lưu các API key, thông tin đăng nhập, hoặc 1 số thông tin nhạy cảm khác trong **Info.plist**? Điều này cho chúng ta thấy một vấn đề về bảo mật mà chúng ta nên tránh.

Tôi muốn cho bạn thấy một giải pháp đơn giản mang lại sự linh hoạt, loại an toàn và tính bảo mật được cải thiện. Tạo 1 file swift có tên là **Configuration.swift**:
![](https://images.viblo.asia/405d7780-5c20-4fc6-b2a0-ad402a3b932a.png)
![](https://images.viblo.asia/516bf041-56fa-4727-92bd-183291e929c4.png)

Định nghĩa 1 enum cũng có tên là **Configuration** và có kiểu là *String*. Chúng ta định nghĩa các trường hợp cho các mỗi cấu hình build, staging, production và release:
```
import Foundation 

enum Configuration: String {

    // MARK: - Configurations

    case staging
    case production
    case release

}
```
Trước khi chúng ta tiếp tục implementation **Configuration** enum, chúng ta cập nhật file **Info.plist**. Mở **Info.plist** và thêm 1 cặp key/value. Key có tên là **Configuration** và value là $(CONFIGURATION). Giá trị của **CONFIGURATION** sẽ tự động được đặt. Chúng ta không cần lo lắng về điều này. Như cái tên, value sẽ giống như tên của cấu hình build khi build được tạo.
![](https://images.viblo.asia/e087e76b-b1bd-42a9-8a8f-28d490cb53ee.png)
Quay trở lại **Configuration.swift**. Chúng ta có thể dễ dàng truy cập vào cấu hình build và các giá trị được lưu trữ trong file Info.plist. Định nghĩa 1 thuộc tính static và 1 hằng số current Configuration. 
```
import Foundation

enum Configuration: String {

    // MARK: - Configurations

    case staging
    case production
    case release

    // MARK: - Current Configuration

    static let current: Configuration = {
        guard let rawValue = Bundle.main.infoDictionary?["Configuration"] as? String else {
            fatalError("No Configuration Found")
        }
    }()

}
```
Chúng ta sử dụng các value được định nghĩa trong **Info.plist** để tạo các thực thể **Configuration**. Chúng tôi ném một lỗi nghiêm trọng khác nếu khởi tạo thất bại. 
```
import Foundation

enum Configuration: String {

    // MARK: - Configurations

    case staging
    case production
    case release

    // MARK: - Current Configuration

    static let current: Configuration = {
        guard let rawValue = Bundle.main.infoDictionary?["Configuration"] as? String else {
            fatalError("No Configuration Found")
        }

        guard let configuration = Configuration(rawValue: rawValue.lowercased()) else {
            fatalError("Invalid Configuration")
        }

        return configuration
    }()

}
```
Tiếp tục mở file **Appdelegate.swift** và in ra current configuration. Chọn **Staging** scheme để chạy , quan sát output trong console:
```
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    print(Configuration.current)
    return true
}
```
```
staging
```
## Extending Configuration
Bạn có thể biết rằng tôi thích sử dụng enum để tạo namespace. Để tôi chỉ cho bạn việc chúng ta có thể cải thiện việc triển khai Configuration enum. 
```
import Foundation

enum Configuration: String {

    // MARK: - Configurations

    case staging
    case production
    case release

    // MARK: - Current Configuration

    static let current: Configuration = {
        guard let rawValue = Bundle.main.infoDictionary?["Configuration"] as? String else {
            fatalError("No Configuration Found")
        }

        guard let configuration = Configuration(rawValue: rawValue.lowercased()) else {
            fatalError("Invalid Configuration")
        }

        return configuration
    }()

    // MARK: - Base URL

    static var baseURL: URL {
        switch current {
        case .staging:
            return URL(string: "https://staging.cocoacasts.com")!
        case .production, .release:
            return URL(string: "https://cocoacasts.com")!
        }
    }

}
```
Có một số chi tiết tôi muốn chỉ ra. Đầu tiên tôi không sử dụng trường hợp default. Tôi chỉ ra rõ ràng các giái trị trả về cho mỗi cấu hình build. Điều này giúp dễ dàng phát hiện các vấn đề hơn và nó làm cho code dễ đọc và trực quan hơn. Thứ hai, tôi sử dụng dấu chấm than để buộc hủy bỏ giá trị được trả về bởi trình khởi tạo của cấu trúc **URL**. Đây là một trong những tình huống hiếm hoi trong đó tôi sử dụng dấu chấm than để buộc mở ra một giá trị. Thật tiện lợi, nhưng, quan trọng hơn, **URL** base không bao giờ bằng nil.

Mở **Appdelegate.swift** và in ra giá trị của **baseURL**. 
```
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    print(Configuration.baseURL)
    return true
}
```
```
https://staging.cocoacasts.com
```
## Tổng kết
Vậy là xong , tuy là khá dài nhưng nó rất đơn giản để ứng dụng vào các ứng dụng của bạn. 
Xin chào và hẹn gặp lại trong các bài viết sau.
Nguồn tham khảo: https://cocoacasts.com/tips-and-tricks-managing-build-configurations-in-xocde