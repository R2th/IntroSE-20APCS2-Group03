# Xcode UI Tests with Embassy and Succulent
Làm thế nào để ghi lại (record) và phát lại (replay) các yêu cầu API để làm việc cho UI Tests.
Tôi đã tích hợp [Embassy](https://github.com/envoy/Embassy) và [Succulent](https://github.com/cactuslab/Succulent) trong các thực hiện UI Tests.
Nếu bạn cần chạy các kiểm tra giao diện người dùng (UI Tests) cho một ứng dụng dựa vào dữ liệu API, hướng dẫn này có thể cung cấp cho bạn một giải pháp thay thế cho mocks / stubs.
# The problem(s)
* Ứng dụng phụ thuộc vào dữ liệu API để update UI 
* Sử dụng stub có thể yêu cầu viết và duy trì rất nhiều tập tin 
* Khi sử dụng mocks, logic được sử dụng trong ứng dụng có thể khác với thực hiện gọi API thực tế
* Sử dụng một kết nối API thật thì không thể, nó quá nhiều biến và có thể kết nối thất bại
# The Embassy + Succulent solution
Giải pháp bao gồm tạo ra một máy chủ cục bộ để đưa ứng dụng của bạn đến (Embassy) và ghi lại khi gọi API (Network) (Succulent).

Lần đầu tiên bạn sẽ chạy test, các cuộc gọi mạng tiêu chuẩn sẽ được thực hiện và ghi lại trong một file (.trace)
Lần tiếp theo, các cuộc gọi mạng tương tự sẽ được phát lại tự động. 

Làm thế nào có thể như vậy được? Không cần phải viết dữ liệu mocks, thậm chí bạn có thể mô phỏng lỗi và tất cả chạy bên trong một XCtest! 🤙
# How to use it?
1. Tải về và cài đặt Succulent pod, tại thời điểm viết không có pod trên cocoapods.com vì vậy bạn phải tải về nguồn và thêm nó vào podfile của bạn theo cách này:

```
target “UI Tests” do
   inherit! :search_paths
   pod ‘Succulent’, :path => ‘Succulent/’
end
```

Succulent yêu cầu Embassy và nó sẽ được cài đặt tự động.

Embassy sẽ được cài đặt tự động vì Embassy là yêu cầu khi bạn cái đặt Succulent
2. Tạo một tệp UI Test mới và copy / paste các hướng dẫn từ  [GitHub Succulent](https://github.com/cactuslab/Succulent), nó sẽ trông giống như dưới đây:

```
import Succulent

@testable import TestAppUITests

class SucculentTestUITest: XCTestCase {
 
    private var succulent: Succulent!
    var session: URLSession!
    var baseURL: URL!
    
    /// The name of the trace file for the current test
    private var traceName: String {
        return self.description.trimmingCharacters(in: CharacterSet(charactersIn: "-[] ")).replacingOccurrences(of: " ", with: "_")
    }
    
    /// The URL to the trace file for the current test when running tests
    private var traceUrl: URL? {
        let bundle = Bundle(for: type(of: self))
        return bundle.url(forResource: self.traceName, withExtension: "trace", subdirectory: "Traces")
    }
    
    /// The URL to the trace file for the current test when recording
    private var recordUrl: URL {
        let bundle = Bundle(for: type(of: self))
        let recordPath = bundle.infoDictionary!["TraceRecordPath"] as! String
        return URL(fileURLWithPath: "\(recordPath)/\(self.traceName).trace")
    }
    
    override func setUp() {
        super.setUp()
        continueAfterFailure = false
        
        if let traceUrl = self.traceUrl {  // Replay using an existing trace file
            succulent = Succulent(traceUrl: traceUrl)
        } else {    // Record to a new trace file
            succulent = Succulent(recordUrl: self.recordUrl, baseUrl: URL(string: "https//base-url-to-record.com/")!)
        }
        
        succulent.start()
        
        let app = XCUIApplication()
        
        app.launchEnvironment["succulentBaseURL"] = "http://localhost:\(succulent.actualPort)/"
        
        app.launch()
    }
    
    override func tearDown() {
        super.tearDown()
    }
}
```

Khi khởi chạy Succulent, bạn có tùy chọn để chỉ định một URL cơ sở, điều này sẽ làm cho tất cả các yêu cầu bao gồm url cơ sở đó sẽ được ghi lại, trong khi những URL khác sẽ bị bỏ qua.

3. Add the following line in your UI Tests’ target Info.plist:

```
<key>TraceRecordPath</key>
<string>$(PROJECT_DIR)/Succulent/Traces</string>
```

4. Chỉ định ứng dụng của bạn đến máy chủ cục bộ của bạn.
Để thực hiện việc này trong ứng dụng chính của bạn, bạn phải kiểm tra xem biến môi trường "succulentBaseURL" có tồn tại hay không.
Điều này cho biết url của máy chủ web cục bộ của bạn và nó được đặt trong chức năng setUp mà bạn đã sao chép từ bước **2**.

```
#if DEBUG
if let localServerUrl = ProcessInfo.processInfo.environment[“succulentBaseURL”] {
    return URL(string: localServerUrl)!
}
#endif
```

Đơn giản phải không nào! 🙌

Bây giờ nếu bạn viết một UI Test đơn giản và chạy nó nó, Succulent sẽ ghi lại yêu cầu của api và tạo một tệp tin *.trace*  bên trong thư mục *Traces* trong thư mục ***UI Test***.

Lần tiếp theo bạn chạy thử nghiệm tương tự, nó sẽ kiểm tra xem tệp có tồn tại và chạy lại không.

Bạn có thể mở các tệp tin .*traces* trực tiếp từ Xcode, xem tất cả các yêu cầu mạng và sửa đổi chúng nếu cần. 😮

Tham khảo bài viết gốc: https://medium.com/@timefrancesco/xcode-ui-tests-with-embassy-and-succulent-808e068ee4e8