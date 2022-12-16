Các phương pháp hay nhất về phát triển phần mềm quy định việc tách biệt cấu hình khỏi mã một cách chặt chẽ. Tuy nhiên, các nhà phát triển trên nền tảng của Apple thường phải vật lộn để giải quyết các nguyên tắc này với quy trình làm việc nhiều dự án của Xcode. 

Hiểu mỗi thiết lập dự án làm gì và tất cả chúng tương tác với nhau như thế nào là một kỹ năng có thể mất nhiều năm để trau dồi. Và thực tế là phần lớn thông tin này được chôn sâu trong GUI của Xcode khiến chúng tôi không ủng hộ. 

Điều hướng đến tab “Build Settings” của trình chỉnh sửa dự án và bạn sẽ được chào đón bởi hàng trăm cài đặt bản dựng trải dài trên các lớp dự án, mục tiêu và cấu hình - và đó là không nói gì đến các tab còn lại! 

![](https://images.viblo.asia/ee7b191d-34c5-4405-b300-9a6e7cc70bb9.png)

May mắn thay, có một cách tốt hơn để quản lý tất cả cấu hình này mà không liên quan đến việc nhấp qua mê cung các tab và mũi tên tiết lộ.

Tuần này, chúng tôi sẽ chỉ cho bạn cách bạn có thể sử dụng tệp xcconfig dựa trên văn bản để ngoại hóa cài đặt bản dựng từ Xcode nhằm làm cho các dự án của bạn nhỏ gọn, dễ hiểu và mạnh mẽ hơn. 

> Hãy xem XcodeBuildSettings.com để có tài liệu tham khảo đầy đủ về mọi cài đặt bản dựng được hỗ trợ cho phiên bản mới nhất của Xcode 

[Xcode build configuration files](https://help.apple.com/xcode/mac/8.3/#/dev745c5c974):, thường được biết đến nhiều hơn bởi phần mở rộng tệp xcconfig, cho phép cài đặt bản dựng cho ứng dụng của bạn được khai báo và quản lý mà không cần Xcode. Chúng là văn bản thuần túy, có nghĩa là chúng thân thiện hơn nhiều với hệ thống kiểm soát nguồn và có thể được sửa đổi bằng bất kỳ trình chỉnh sửa nào. 

Về cơ bản, mỗi tệp cấu hình bao gồm một chuỗi các phép gán khóa-giá trị với cú pháp sau: 
```
BUILD_SETTING_NAME = value
```

Ví dụ: để chỉ định phiên bản ngôn ngữ Swift cho một dự án, bạn phải chỉ định cài đặt bản dựng SWIFT_VERSION như sau: 

```
SWIFT_VERSION = 5.0
```

Thoạt nhìn, các tệp xcconfig có nét giống với tệp .env, với cú pháp đơn giản, được phân tách bằng dòng mới. Nhưng có nhiều thứ để xây dựng các tệp cấu hình Xcode hơn là bắt mắt. Hãy chứng kiến! 

### Giữ lại các giá trị hiện có 

Để nối thay vì thay thế các định nghĩa hiện có, hãy sử dụng biến $(inherited) như sau: 

```
BUILD_SETTING_NAME = $(inherited) additional value
```

Bạn thường làm điều này để tạo danh sách các giá trị, chẳng hạn như các đường dẫn trong đó trình biên dịch tìm kiếm các khuôn khổ để tìm các tệp tiêu đề được bao gồm (FRAMEWORK_SEARCH_PATHS): 

```
FRAMEWORK_SEARCH_PATHS = $(inherited) $(PROJECT_DIR)
```

Xcode chỉ định các giá trị kế thừa theo thứ tự sau (từ ưu tiên thấp nhất đến cao nhất): 
* Platform Defaults
* Xcode Project xcconfig File
* Xcode Project File Build Settings
* Target xcconfig File
* Target Build Settings

### Giá trị tham chiếu 

Bạn có thể thay thế các giá trị từ các cài đặt khác bằng tên khai báo của chúng theo cú pháp sau: 

```
BUILD_SETTING_NAME = $(ANOTHER_BUILD_SETTING_NAME)
```

Thay thế có thể được sử dụng để xác định các biến mới theo các giá trị hiện có hoặc nội dòng để xây dựng các giá trị mới một cách động. 

```
OBJROOT = $(SYMROOT)
CONFIGURATION_BUILD_DIR = $(BUILD_DIR)/$(CONFIGURATION)-$(PLATFORM_NAME)
```

### Đặt giá trị dự phòng cho cài đặt bản dựng được tham chiếu 

Trong Xcode 11.4 trở lên, bạn có thể sử dụng toán tử đánh giá mặc định để chỉ định giá trị dự phòng để sử dụng nếu cài đặt bản dựng được tham chiếu đánh giá là trống. 

```
$(BUILD_SETTING_NAME:default=value)
```

### Điều kiện hóa cài đặt bản dựng 

Bạn có thể điều kiện hóa cài đặt bản dựng theo SDK (sdk), kiến trúc (arch) và / hoặc cấu hình (config) của chúng theo cú pháp sau: 

```
BUILD_SETTING_NAME[sdk=sdk] = value for specified sdk
BUILD_SETTING_NAME[arch=architecture] = value for specified architecture
BUILD_SETTING_NAME[config=configuration] = value for specified configuration
```

Đưa ra sự lựa chọn giữa nhiều định nghĩa của cùng một cài đặt xây dựng, trình biên dịch sẽ giải quyết theo tính cụ thể. 

```
BUILD_SETTING_NAME[sdk=sdk][arch=architecture] = value for specified sdk and architectures
BUILD_SETTING_NAME[sdk=*][arch=architecture] = value for all other sdks with specified architecture
```

Ví dụ: bạn có thể chỉ định cài đặt bản dựng sau để tăng tốc bản dựng cục bộ bằng cách chỉ biên dịch cho kiến trúc đang hoạt động: 

```
ONLY_ACTIVE_ARCH[config=Debug][sdk=*][arch=*] = YES
```

### Bao gồm cài đặt bản dựng từ các tệp cấu hình khác 

Tệp cấu hình bản dựng có thể bao gồm cài đặt từ các tệp cấu hình khác bằng cách sử dụng cú pháp #include giống như lệnh C tương đương mà chức năng này dựa trên: 

```
#include "path/to/File.xcconfig"
```

Như chúng ta sẽ thấy ở phần sau của bài viết, bạn có thể tận dụng lợi thế này để tạo danh sách xếp tầng các cài đặt bản dựng theo những cách thực sự mạnh mẽ. 

### Tạo tệp cấu hình xây dựng 

Để tạo tệp cấu hình bản dựng, hãy chọn mục menu File > New File…” (⌘n), cuộn xuống phần có nhãn “Other” và chọn mẫu Configuration Settings File. Tiếp theo, lưu nó ở đâu đó trong thư mục dự án của bạn, đảm bảo thêm nó vào mục tiêu mong muốn của bạn 

![](https://images.viblo.asia/b97fb4ac-3efa-4fc6-814d-868e44fdfbb1.png)

Khi bạn đã tạo tệp xcconfig, bạn có thể gán tệp đó cho một hoặc nhiều cấu hình bản dựng cho các mục tiêu liên quan. 

![](https://images.viblo.asia/dd4f9e1d-eb20-4fd4-b7d7-5df93df8a79a.png)

Bây giờ chúng ta đã trình bày những kiến thức cơ bản về việc sử dụng tệp cấu hình bản dựng Xcode, hãy cùng xem xét một số ví dụ về cách bạn có thể sử dụng chúng để quản lý môi trường phát triển, giai đoạn và sản xuất. 

### Tùy chỉnh tên và biểu tượng ứng dụng cho các công trình nội bộ 

Việc phát triển ứng dụng iOS thường bao gồm việc kết hợp nhiều bản dựng nội bộ khác nhau trên trình mô phỏng và thiết bị thử nghiệm của bạn (cũng như phiên bản mới nhất từ App Store, để sử dụng làm tài liệu tham khảo).

Bạn có thể tự mình làm mọi thứ dễ dàng hơn với các tệp xcconfig gán cho mỗi cấu hình một tên riêng và biểu tượng ứng dụng. 

```
// Development.xcconfig
PRODUCT_NAME = $(inherited) α
ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon-Alpha

//////////////////////////////////////////////////

// Staging.xcconfig
PRODUCT_NAME = $(inherited) β
ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon-Beta
```

### Quản lý các hằng số trên các môi trường khác nhau

Nếu các nhà phát triển phụ trợ của bạn tự biên soạn theo triết lý [12 Factor App](https://12factor.net/config) đã nói ở trên, thì họ sẽ có các điểm cuối riêng biệt cho môi trường phát triển, giai đoạn và sản xuất. 

Trên iOS, có lẽ cách tiếp cận phổ biến nhất để quản lý các môi trường này là sử dụng các câu lệnh biên dịch có điều kiện với cài đặt xây dựng như DEBUG. 

```
import Foundation

#if DEBUG
let apiBaseURL = URL(string: "https://api.staging.example.com")!
#else
let apiBaseURL = URL(string: "https://api.example.com")!
#endif
```

Điều này sẽ hoàn thành công việc, nhưng gây ra lỗi phân tách mã / cấu hình.

Một cách tiếp cận thay thế lấy các giá trị dành riêng cho môi trường này và đặt chúng ở nơi chúng thuộc về - vào các tệp xcconfig. 

```
// Development.xcconfig
API_BASE_URL = api.staging.example.com

//////////////////////////////////////////

// Production.xcconfig
API_BASE_URL = api.example.com
```

Tuy nhiên, để lấy các giá trị này theo chương trình, chúng tôi sẽ cần thực hiện thêm một bước: 

### Truy cập Cài đặt bản dựng từ Swift 

Cài đặt bản dựng được xác định bởi tệp dự án Xcode, tệp xcconfig và các biến môi trường, chỉ khả dụng tại thời điểm xây dựng. Khi bạn chạy ứng dụng đã biên dịch, không có ngữ cảnh xung quanh nào khả dụng.

Nhưng chờ một chút - bạn có nhớ mình đã xem một số cài đặt xây dựng đó trước đây ở một trong những tab khác không?

Khi nó xảy ra, tab thông tin đó thực sự chỉ là một bản trình bày lạ mắt của tệp Info.plist của mục tiêu. Tại thời điểm xây dựng, tệp Info.plist đó được biên dịch theo cài đặt bản dựng được cung cấp và sao chép vào gói ứng dụng kết quả. Do đó, bằng cách thêm các tham chiếu vào $(API_BASE_URL), bạn có thể truy cập các giá trị cho các cài đặt đó thông qua thuộc tính infoDictionary của Foundation’s Bundle API. 

![](https://images.viblo.asia/1c9f9e5c-a350-4641-9190-5282ee1660e9.png)

Theo cách tiếp cận này, chúng tôi có thể thực hiện một số việc như sau: 

```
import Foundation

enum Configuration {
    enum Error: Swift.Error {
        case missingKey, invalidValue
    }

    static func value<T>(for key: String) throws -> T where T: LosslessStringConvertible {
        guard let object = Bundle.main.object(forInfoDictionaryKey:key) else {
            throw Error.missingKey
        }

        switch object {
        case let value as T:
            return value
        case let string as String:
            guard let value = T(string) else { fallthrough }
            return value
        default:
            throw Error.invalidValue
        }
    }
}

enum API {
    static var baseURL: URL {
        return try! URL(string: "https://" + Configuration.value(for: "API_BASE_URL"))!
    }
}
```

Khi xem từ trang web cuộc gọi, chúng tôi thấy rằng cách tiếp cận này kết hợp hài hòa với các phương pháp hay nhất của chúng tôi - không tồn tại một hằng số được mã hóa cứng nào! 

```
let url = URL(string: path, relativeTo: API.baseURL)!
var request = URLRequest(url: url)
request.httpMethod = method
```

Các dự án Xcode là nguyên khối, dễ vỡ và mờ đục.

May mắn thay, các tệp xcconfig đi một chặng đường dài để giải quyết những điểm đau này. Di chuyển cấu hình ra khỏi Xcode và sang các tệp xcconfig mang lại vô số lợi ích và cung cấp một cách để tách dự án của bạn khỏi các chi tiết của Xcode mà không rời khỏi “con đường hạnh phúc” đã được Cupertino phê duyệt. 

Link: https://nshipster.com/xcconfig/