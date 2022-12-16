- Được giới thiệu từ những bản iOS SDK đầu tiên, chúng ta có thể nhận thấy ngay ở UserDefaults API sự đơn giản dễ sử dụng nhưng kèm theo nhiều hạn chế. Đơn giản trong cách sử dụng ở việc lưu trữ giá trị ở trong file plist, nhưng chính điều này lại trở nên hạn chế trong việc sử dụng những databases lớn hơn dẫn đến việc nhiều developers dễ bị bỏ qua một số đặc tính của databases hoặc khó áp dụng một số biểu mẫu của khách hàng.

- Với những mô tả ban đầu ta khó có thể đánh giá chính xác được về UserDefaults. Thật sự thì UserDefaults rất hữu dụng, vượt lên trên việc save and load data. Đó cũng chính là mục đích của bài viết chúng ta sẽ tìm hiểu sau đây!

# 1/ Dùng database hay là không?

- UserDefaults rất hay được chỉ định là phương án thay thế chi các database-solution như là CoreData hay SQLite. Chúng ta không phủ nhận là UserDefaults có thể hoặt động như là một database ở mặt lưu các tuỳ chỉnh của người dùng(user-preferences) nhưng nếu nhìn một cách cẩn thận hơn thì nó sẽ hữu dụng cho công việc sử dụng lượng database hạn chế - một nơi lưu các setting tuỳ chỉnh tuyệt vời.

- Cùng bắt đầu với việc tạo một example. Chúng ta sẽ có một ThemeController nhận trách nghiệm theo dỗi các Theme mà app chúng ta sẽ sử dụng để hiển thị UI. Cho tới khi các users có thể lựa chọn chúng, UserDefaults sẽ thực hiện rất nhiều công đoạn để với các user-preferences để lưu trữ chúng như là một giá trị.

- Để thực hiện điều đó, chúng ta sẽ cùng nhau implement ThemeController(mặc định sẽ gán giá trị standar -> default) và sử dụng nó để save and load các giá trị Theme:
```swift 
enum Theme: String {
    case light
    case dark
    case black
}

class ThemeController {
    private(set) lazy var currentTheme = loadTheme()
    private let defaults: UserDefaults
    private let defaultsKey = "theme"

    init(defaults: UserDefaults = .standard) {
        self.defaults = defaults
    }

    func changeTheme(to theme: Theme) {
        currentTheme = theme
        defaults.setValue(theme.rawValue, forKey: defaultsKey)
    }

    private func loadTheme() -> Theme {
        let rawValue = defaults.string(forKey: defaultsKey)
        return rawValue.flatMap(Theme.init) ?? .light
    }
}
```
- Đoạn code trên trông có vẻ rất đơn giản, nhưng với việc chúng ta sử dụng UserDefaults cho những setting loại này sẽ giúp chúng ta khám phá ra những điều mới mẻ và thú vị, cho cả user lẫn developer.

# 2/ Chia sẻ data trong app group.	[Link](https://www.atomicbird.com/blog/sharing-with-app-extensions)

- Điều đầu tiên khi sử dụng UserDefaults là chúng ta sẽ dễ dàng chia sẻ data giữa các app, appextension với nhau. VD: Chúng ta đang cùng lúc sử dụng 2 app( nếu chúng ta build và chia sẻ service, một app cho người phát triển, một cho khách hàng) hoặc là một app đơn lẻ chúng ta xây dụng bao gồm các extension để hiển thị các UI:

- Để cho phép các user có thể chọn từng tuỳ chỉnh của cá nhân một và gán nó với các UI - chúng ta có thể set up các default-suite. VD: Nếu chúng ta xây dựng 2 app để cả 2 trong app group, say đó chúng ta tạo một UserDefault với một cái tên khớp với app group identifier.
```swift 
extension UserDefaults {
    static var shared: UserDefaults {
        return UserDefaults(suiteName: "group.johnsundell.app")!
    }
}
```
- Một lựa chọn khác là chúng ta có thể add vào app group sử dụng standar-default để tạo liên kết với UserDefault như sau:
``` swift 
extension UserDefaults {
    static var shared: UserDefaults {
        let combined = UserDefaults.standard
        combined.addSuite(named: "group.johnsundell.app")
        return combined
    }
}
```

- Điều khác biệt giữa hai lựa chọn trên là với lựa chọn cuối thì value với standar default sẽ luôn override một giá trị từ shared-suite. Điều đó có thể sẽ hữu dụng trong trường hợp chúng ta muốn override cho từng app, nhưng việc đó đồng nghĩa sẽ làm các tuỳ chỉnh setting khác trở nên khó khăn.

- Không kể những điều trên, tất cả chúng ta đều sử dụng suite-based mới cho UserDefault để thay thế .standard với .shared trong ThemeController:
```swift 
class ThemeController {
    ...

    init(defaults: UserDefaults = .shared) {
        self.defaults = defaults
    }

    ...
}
```
- Điều tuyệt vời của UserDefaults là 100% synchronous API, mặc dù thay đổi diễn ra ở nhiều app bất đồng bộ trong background. Việc đó cho phép chúng ta ngay lập tức công việc sau khi update giá trị mà không phải hi sinh hệ thống để đợi toàn bộ các instances được update.

- Giá trị được lưu trữ cho đến khi tất cả app group được xoá khỏi device.

# 3/ Overriding values lúc bật app:

- Lấy VD, trong trường hợp chúng ta muốn viết test để xác minh các setting screen themes picker có chính xác không? Để thực hiện điều đó , chúng ta sẽ truyền cho theme một launch-agrument ở XCUIApplication và xác minh nó với theme chúng ta chọn thay vì đánh dấu UI chúng ta đã chọn như sau:
```swift 
class ThemingUITests: XCTestCase {
    func testThemePickerShowingCurrentTheme() {
        let app = XCUIApplication()
        app.launchArguments = ["-theme", "dark"]
        app.launch()

        // Querying our theme picker table view by its
        // accessibility identifier.
        let picker = app.tables["Theme.Picker"]

        // Here we give each cell a different accessibility
        // identifier both depending on what theme it represents,
        // and also whether or not it's selected.
        let cells = (
            light: picker.cells["Theme.Light"],
            dark: picker.cells["Theme.Dark.Selected"],
            black: picker.cells["Theme.Black"]
        )

        XCTAssertTrue(cells.light.exists)
        XCTAssertTrue(cells.dark.exists)
        XCTAssertTrue(cells.black.exists)
    }
}
```
- Values được override bằng cách này không ảnh hưởng gì đến values mà chúng ta đã lưu trước đó, điều đó đơn giản hoá việc trở lại trạng thái trước đó của app - xoá đi launch agruments.

# 4/ Mock-free test thế nào?

- Tiếp tục ở mục testing, một cách hữu dụng để tuỳ chỉnh UserDefaults suites là cho phép unit test code lưu data mà không gây ra những result trả về có sai số.

- Chúng ta sẽ viết code để test việc xác minh gọi changeTheme method ở trong ThemeController có update chính xác cho current theme không? Ý tưởng ban đầu cho việc này là tạo một instance cho controller của chúng ta:
```swift 
class ThemeControllerTests: XCTestCase {
    func testChangingTheme() {
        let controller = ThemeController()
        controller.changeTheme(to: .dark)
        XCTAssertEqual(controller.currentTheme, .dark)
    }
}
```

- Đoạn code trên hoạt động hiệu quả và successfully pass. Tuy nhiên nó sẽ ra ở lần đầu tiên chúng ta chạy, nó đã không test gì cả. Cho đến khi chúng ta lưu theme đã chọn, thì test mới tiếp tục để chạy.

- Chúng ta cùng điều chỉnh để giúp việc xác nhận state có thể trở nên dễ test và maintain hơn. Add thêm một assert để xác minh theme ban đầu là những gì chúng ta cần, ngay sau khi chúng ta khởi tạo ThemeController instance:

```swift 
class ThemeControllerTests: XCTestCase {
    func testChangingTheme() {
        let controller = ThemeController()
        XCTAssertEqual(controller.currentTheme, .light)

        controller.changeTheme(to: .dark)
        XCTAssertEqual(controller.currentTheme, .dark)
    }
}
```

- Với việc thêm một assert, test sẽ bị fail- đây là tín hiệu tốt. Cái chúng ta cần làm là đảm bảo bất kỳ theme được lưu giữ đều được sẵn sàng khi chúng ta test -> điều đó dẫn đến việt lần đầu test yêu cầu một số form mẫu đã được tạo sẵn.

- Để làm điều đó, chúng ta cần thêm extension ở UserDefaults để cho phép chúng ta tạo instance đã có những values đã được lưu trữ hoàn chỉnh.

```swift 
extension UserDefaults {
    static func makeClearedInstance(
        for functionName: StaticString = #function,
        inFile fileName: StaticString = #file
    ) -> UserDefaults {
        let className = "\(fileName)".split(separator: ".")[0]
        let testName = "\(functionName)".split(separator: "(")[0]
        let suiteName = "com.johnsundell.test.\(className).\(testName)"

        let defaults = self.init(suiteName: suiteName)!
        defaults.removePersistentDomain(forName: suiteName)
        return defaults
    }
}
```

- Với đoạn code trên, chúng ta đã update lại test của chúng ta với việc xác minh các functionality, tốt hơn cho việc phản hồi các value được lưu trữ:

```swift
class ThemeControllerTests: XCTestCase {
    func testChangingTheme() {
        let controller = ThemeController(defaults: .makeClearedInstance())
        XCTAssertEqual(controller.currentTheme, .light)

        controller.changeTheme(to: .dark)
        XCTAssertEqual(controller.currentTheme, .dark)
    }
}
```

- UserDefaults có nhiều tác dụng hơn với ấn tượng ban đầu chúng ta. Vậy câu hỏi đặt ra là giới hạn của UserDefaults? Loại data nào thì sử dụng loại database nào? Với cá nhân tôi thì câu trả lời đến từ việc trả lời các câu hỏi như: Kích thước data? Data là loại đơn giản như Bool, Int, String hay những array objects dễ dàng tăng số lượng phụ thuộc vào user. See you next time:D