UI Testing là phương pháp tuyệt vời để đảm bảo rằng, các tương tác UI vẫn hoạt động tốt sau khi add thêm các tính năng mới hoặc refactoring code. Đây cũng là một cách hay để tự động hóa các tác vụ lặp đi lặp lại khi làm việc trên UI code (khi bạn phải điều hướng sâu vào ứng dụng của mình để test một cái gì đó bạn đang làm việc).
Viết và chạy UI Test khác so với Unit Test, vì bạn thực hiện tương tác với ứng dụng, so với việc kiểm tra theo chương trình với một API nhất định. Cả hai đều có rất nhiều ý nghĩa, nên tốt nhất là dùng cả hai cho các task khác nhau.
Xcode đính kèm với UI Testing trong XCTest framework, là framework bạn đã sử dụng cho Unit test. Những feature của UI Testing này đã có vài năm, nhưng thường bị các developer bỏ qua vì thiếu ổn định, và khó sử dụng. Tuy nhiên, bây giờ chúng đã tốt hơn rất nhiều và chung ta có thể sử dụng nó một cách hiệu quả.

# Setting things up
Nếu ứng dụng chưa có một UI Testing target, tất cả những gì bạn phải làm là **File > New > Target..** và chọn “UI testing bundle”. Sau đó sửa app scheme để chạy UI test các các bước **Product > Scheme > Edit Scheme..** và add UI Testing Bundle bên dưới “Test”.

# Let’s write a test
Một ví dụ về cách sử dụng UI Testing có lẽ là một giải pháp tuyệt nhất, khi đó bạn muốn test user flow.
Giả sử onboard flow bao gồm 4 màn hình mà bạn phải vuốt qua để hoàn thành. Cuối cùng, nút "Done" xuất hiện ở góc trên bên phải màn hình, cần được tapped để đóng onboarding flow, giống như thế này
![](https://cdn-images-1.medium.com/max/800/1*HtgbQIb_VuhnqRgoDt7dvw.jpeg)

Hãy viết đoạn test được thực hiện chính xác như sau:
```
class OnboardingUITests: XCTestCase {
    var app: XCUIApplication!
    
    // MARK: - XCTestCase
    
    override func setUp() {
        super.setUp()
        
        // Since UI tests are more expensive to run, it's
        // usually a good idea to exit if a failure was encountered
        continueAfterFailure = false
        
        app = XCUIApplication()
        
        // We send a command line argument to our app,
        // to enable it to reset its state
        app.launchArguments.append("--uitesting")
    }
    
    // MARK: - Tests
    
    func testGoingThroughOnboarding() {
        app.launch()
        
        // Make sure we're displaying onboarding
        XCTAssertTrue(app.isDisplayingOnboarding)
        
        // Swipe left three times to go through the pages
        app.swipeLeft()
        app.swipeLeft()
        app.swipeLeft()
        
        // Tap the "Done" button
        app.buttons["Done"].tap()
        
        // Onboarding should no longer be displayed
        XCTAssertFalse(app.isDisplayingOnboarding)
    }
}

```
Như bạn thấy ở trên, chúng ta thực hiện UI Testing bằng cách thực hiện các tương tác giao diện người dùng, thực hiện swipes và tap chứ không phải gọi các API. Trong thực tế, các Test case được thực hiện theo các quy trình khác nhau, vậy không thể can thiệp được vào đoạn mã của chính chúng ta, theo quy trình của chương trinh. Vì thê, chúng ta phải thực hiện test thực sự chứ k thể giảo mạo được chúng.
Chúng ta hãy xem xét kỹ hơn hai dòng trên, bắt đầu bằng một trong những cách sau:
```
app.launchArguments.append("--uitesting")
```
Như đã đề cập, chúng ta cho phép ứng dụng chạy UI Test và nó có thể reset các trạng thái. Đây thường là một thực hành tốt, vì nếu không bạn sẽ kết thúc với các bài kiểm tra sẽ chỉ vượt qua trong điều kiện nhất định (= flakiness).

# Resetting your app’s state
Vậy làm thế nào để reset lại các trạng thái? Cách đơn giản nhất là kiểm application(didFinishLaunchingWithOptions:)
```
func application(_ application: UIApplication,
                 didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey : Any]?) -> Bool {
    if CommandLine.arguments.contains("--uitesting") {
        resetState()
    }
    
    // ...Finish setting up your app
    
    return true
}
```
Chính xác những gì cần làm trong resetState () sẽ khác nhau tùy thuộc vào trạng thái ứng dụng của bạn vẫn tồn tại. Ở đây bạn muốn xóa các giá trị mặc định của người dùng, cơ sở dữ liệu và bất kỳ thứ gì bạn đã lưu (ví dụ các tệp trên đĩa). Ví dụ: dưới đây là cách đặt lại UserDefaults:
```
let defaultsName = Bundle.main.bundleIdentifier!
UserDefaults.standard.removePersistentDomain(forName: defaultsName)
```

# Verifying state in a UI test
Trở lại với chương trình test, một câu lệnh khác mà tôi muốn đi sâu hơn là:
```
XCTAssertTrue(app.isDisplayingOnboarding)
```
Đây là dòng lệnh để xác minh rằng, chúng ta đang ở đúng trạng thái và UI hoạt động theo đúng mong đợi. Nó được cài đặt như một thuộc tính mở rộng của XCUIApplication. Tôi khuyên bạn nên sử dụng pattern này, bởi vì nó cho phép giữ các test case ngắn gọn, đơn giản và dễ dàng sử dụng lại.

Cài đặt *isDisplayingOnboarding* được thực hiện thế nào?
```
extension XCUIApplication {
    var isDisplayingOnboarding: Bool {
        return otherElements["onboardingView"].exists
    }
}
```
Đoạn code trên thực hiện một test là tìm kiếm UIView có *accessIdentifier* bằng *onboardingView*. Tất cả những gì cần làm là thêm định danh này vào view của OnboardingViewController.
```
final class OnboardingViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        view.accessibilityIdentifier = "onboardingView"
    }
}
```