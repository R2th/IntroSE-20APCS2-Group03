Viết test dù ở bất kì dự án ứng dụng mobile nào cũng đều không phải là sự lựa chọn ưu tiên và thực tế, đa số các dự án mobile đều muốn tránh việc viết test càng nhiều càng tốt để tăng tốc quá trình phát triển.

Nhưng khi bạn đã là một lập trình viên có kinh nghiệm, bạn sẽ cảm nhận được viết test nó quan trọng như thế nào, không chỉ nó đảm bảo cho việc ứng dụng của bạn chạy nuột nà mà nó còn tránh việc những lập trình viên khác thay đổi code của bạn. Sự liên quan giữa test và code giúp những lập trình viên mới dễ dàng tham gia vào dự án.

# Test-driven Development

**Test-driven Development** **(TDD)** là một loại nghệ thuật của việc viết code. Nó dựa theo vào lặp đệ quy sau:

- Viết test fail.
- Viết code để pass được đoạn test đó.
- Refactor code
- Lặp lại cho đến khi nào hoàn thiện.

Để tôi cho các bạn xem một đoạn ví dụ sau: 

```	swift
func calculateAreaOfSquare(w: Int, h: Int) -> Double { }
```

### Test 1:
Cho w=2, h=2, kết quả sẽ bằng 4. Nhưng trong trường hợp này, test sẽ bị fail vì chúng ta chua implement hàm này.

Vì vậy chúng ta sẽ tiếp tục viết:

```swift
func calculateAreaOfSquare(w: Int, h: Int) -> Double { return w * h }
```

Test 1 đã được pass.

### Test 2:
Cho w=-1, h=-1, kết quả sẽ bằng 0.Trong trường hợp này, kết quả sẽ bằng 1 cho nên test sẽ bị fail dựa vào việc imlement này.

Vì vậy chúng ta phải sửa thành:

```swift
func calculateAreaOfSquare(w: Int, h: Int) -> Double { 
    if w > 0 && h > 0 { 
        return w * h 
    } 
    
    return 0
}
```

Test 2 đã thành công.

Điều này sẽ tiếp tục xảy ra và xảy ra cho đến khi nào chúng ta bao quát được hết tất cả các trường hợp, và phải luôn ghi nhớ việc refactor code để code chạy chuẩn và đẹp hơn.

Dựa vào những điều mà chúng ta đã nói trên, TDD không chỉ giúp ta viết ra đoạn code chất lượng, nó cho phép ta xoay sở trong nhiều trường hợp. Thêm nữa, nó còn cho phép việc pair-programming giữa hai lập trình viên một cách hiệu quả khi một người có thể viết test và một người có thể viết code để pass test đó. 

### Điều kiện ban đầu
Dưới đây là một số điều kiện bạn phải có để có thể bắt đầu:
- Xcode 8.3.3 với Swift3.1
- Kinh nghiện làm việc với Swift và iOS.

### Cài đặt dự án

Giả sử rằng chúng ta được giao cho một nhiệm vụ là phát triển một ứng dụng phim ảnh có thể liệt kê tất cả các bộ phim. Cho nên hãy bật Xcode lên và tạo một Single View Application gọi là MyMovies và chọn Unit Tests.

![](https://images.viblo.asia/93b7bfbe-38a0-4eb0-864b-4c39ac35eda8.png)

Tiếp theo, hãy xoá ViewController và đưa vào một UITableViewController và đặt tên là MoviesTableViewController. Trong Main.storyboard, xoá ViewController và đưa và một TableViewController và đặt class là MoviesTableViewController. Bây giờ, hãy đặt style của prototype cell là Subtitle và identifier là MovieCell để chúng ta có thể show title và genre của movie đó.

![](https://images.viblo.asia/4b974c58-7fb8-4730-8202-204763d77036.png)

Hãy nhớ đặt view controller là Initial view controller.

![](https://images.viblo.asia/e1117a17-1a6e-442a-a21e-b8d27d3e17f5.png)

Đến phần này, code của bạn nên như sau:

```swift
import UIKit
 
class MoviesTableViewController: UITableViewController {
 
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    // MARK: - Table view data source
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 0
    }
}
```

### Movies

Bây giờ, hãy tạo một số data cho movie để chúng ta có thể đưa nó vào trong view.

**Genre enum**

```swift
enum Genre: Int {
    case Animation
    case Action
    case None
}
```

Enum này dùng để xác định dạng phim.

**Movie struct**

```swift
struct Movie {
    var title: String
    var genre: Genre
}
```

Dữ liệu kiểu phim này dùng để đại diện cho một bộ phim.

```swift
class MoviesDataHelper {
    static func getMovies() -> [Movie] {
        return [
            Movie(title: "The Emoji Movie", genre: .Animation),
            Movie(title: "Logan", genre: .Action),
            Movie(title: "Wonder Woman", genre: .Action),
            Movie(title: "Zootopia", genre: .Animation),
            Movie(title: "The Baby Boss", genre: .Animation),
            Movie(title: "Despicable Me 3", genre: .Animation),
            Movie(title: "Spiderman: Homecoming", genre: .Action),
            Movie(title: "Dunkirk", genre: .Animation)
        ]
    }
}
```

Class helper này có hàm "getMovies" giúp chúng ta lấy dữ liệu trực tiếp.
Hãy chú ý rằng ở bước này, chúng ta chưa làm TDD gì cả, mới chỉ ở bước tạo dự án. 

### Quick & Nimble

**Quick** là một framework phát triển test dùng cho Swift và Objective-C dựa trên XCTest. Nó cung cấp một DSL(Domain-specific language) để viết test.

**Nimble** cũng giống như là một người hỗ trợ của Quick khi mà Nimble cung cấp những hàm so sánh như là assertions.

### Cài đặt Quick và Nimble sử dụng Carthage

```
#CartFile.private
github "Quick/Quick"
github "Quick/Nimble"
```

Đoạn trên thuộc CartFile.private. Nếu các bạn chưa có kinh nghiệm làm việc với carthage thì check link sau : [Carthage](https://github.com/Carthage/Carthage)

Đặt CartFile.private vào trong thư mục của dự án và chạy "carthage update". Nó sẽ chạy các framework và đặt vào trong thư mục "Carthage -> Build -> iOS". Sau đó, thêm cả hai framework vào trong tất cả các test target của chúng ta. Bạn cũng cần phải vào "Build Phases", chọn dấu + phía trên và thêm "New Copy Files Phase". Đặt destination là "Frameworks" và thêm các framework vào.

![](https://images.viblo.asia/08ed0694-1ee5-443c-b0e2-3d660ba73764.png)

Ở phần này chúng ta đã hiểu được định nghĩa của TDD và xây dựng xong project, phần sau sẽ tiếp tục đến với việc làm TDD trên project này như thế nào. 

REF: https://www.appcoda.com/tdd-quick-nimble/