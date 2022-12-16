Hầu hết các đối tượng yêu cầu một số hình thức thiết lập trước khi chúng sẵn sàng để được sử dụng trong một ứng dụng. Cho dù đó là chế độ view mà chúng ta muốn tạo kiểu theo thương hiệu của ứng dụng, view controller  mà chúng ta đang định cấu hình hoặc khi tạo giá trị được phân tích trong thử nghiệm - chúng tôi thường thấy cần phải thiết lập code ở đâu đó.

Một nơi rất phổ biến để thiết lập code như vậy là trong một *subclass*. Đơn giản chỉ cần phân lớp các đối tượng bạn cần phải thiết lập, override lên initializer của nó và thực hiện các thiết lập there-done! Trong khi đó chắc chắn là một cách để làm điều đó, bài viết này, chúng ta hãy xem xét một cách tiếp cận khác để viết code mà không yêu cầu bất kỳ hình thức phân lớp nào bằng cách sử dụng các phương thức *static factory methods*.

### Views

Một trong những đối tượng phổ biến nhất mà chúng ta phải thiết lập khi viết UI code là views. Cả UIKit trên iOS và AppKit trên Mac đều cung cấp cho chúng ta tất cả các khối xây dựng cốt lõi cần thiết để tạo giao diện người dùng với giao diện gốc - nhưng chúng ta thường cần tùy chỉnh giao diện phù hợp với thiết kế của chúng ta và xác định bố cục cho chúng.

Một lần nữa, đây là nơi mà nhiều developers sẽ chọn tham gia subclassing và tạo các biến thể tùy chỉnh của các lớp views tích hợp - như ở đây cho nhãn mà chúng tôi sẽ sử dụng để hiển thị tiêu đề:

```
class TitleLabel: UILabel {
    override init(frame: CGRect) {
        super.init(frame: frame)

        font = .boldSystemFont(ofSize: 24)
        textColor = .darkGray
        adjustsFontSizeToFitWidth = true
        minimumScaleFactor = 0.75
    }
}
```

Không có gì thực sự sai với cách tiếp cận trên, nhưng nó tạo ra nhiều types để theo dõi, và chúng ta cũng thường kết thúc với nhiều lớp con cho các biến thể nhỏ của cùng một view như      (TitleLabel, SubtitleLabel, FeaturedTitleLabel, vv).

Mặc dù subclassing là một tính năng ngôn ngữ quan trọng, ngay cả trong thời đại lập trình *Protocol-Oriented Programming*, thật dễ nhầm lẫn với thiết lập tùy chỉnh với hành vi tùy chỉnh. Chúng ta không thực sự thêm bất kỳ hành vi mới nào vào UILabel ở trên, chúng ta chỉ đang thiết lập một phiên bản. Vì vậy, câu hỏi đặt ra là liệu một phân lớp thực sự là công cụ thích hợp cho công việc ở đây?

Thay vào đó, hãy thử sử dụng phương pháp static factory để đạt được điều tương tự. Những gì chúng tôi sẽ làm là thêm một phần mở rộng trên UILabel cho phép chúng ta tạo một thể hiện mới với cùng một thiết lập chính xác như TitleLabel từ trên, như sau:


```
extension UILabel {
    static func makeForTitle() -> UILabel {
        let label = UILabel()
        label.font = .boldSystemFont(ofSize: 24)
        label.textColor = .darkGray
        label.adjustsFontSizeToFitWidth = true
        label.minimumScaleFactor = 0.75
        return label
    }
}
```

Sự tuyệt vời của cách tiếp cận trên (ngoài việc không phụ thuộc vào subclassing hoặc thêm bất kỳ types mới nào), là chúng ta đang phân tách rõ ràng setup code ra khỏi logic thực tế . Ngoài ra, vì các extensions có thể được sắp xếp thành một tệp (bằng cách thêm private), chúng ta có thể dễ dàng thiết lập các extensions cho các phần của ứng dụng cần tạo các views cụ thể chỉ với một tính năng duy nhất:

```
// We'll only use this in a single view controller, so we'll scope
// it as private (for now) as to not add this functionality to
// UIButton globally in our app.
private extension UIButton {
    static func makeForBuying() -> UIButton {
        let button = UIButton()
        ...
        return button
    }
}
```

Sử dụng phương pháp tiếp cận *static factory method* ở trên, bây giờ chúng ta có thể làm cho  UI code trông khá dễ nhìn, vì tất cả những gì chúng ta phải làm là gọi các phương thức để tạo các cá thể được cấu hình đầy đủ cho những gì chúng ta cần:

```
class ProductViewController {
    private lazy var titleLabel = UILabel.makeForTitle()
    private lazy var buyButton = UIButton.makeForBuying()
}
```

Nếu chúng ta muốn làm cho các API tối giản hơn, chúng ta có thể biến các phương thức thành một thuộc tính được tính toán như sau:

```
extension UILabel {
    static var title: UILabel {
        let label = UILabel()
        ...
        return label
    }
}
```


Mà làm cho thuộc tính được gọi đơn giản hơn và clean:

```
class ProductViewController {
    private lazy var titleLabel = UILabel.title
    private lazy var buyButton = UIButton.buy
}

```

Tất nhiên, nếu chúng ta kết thúc việc thêm các đối số vào các API thiết lập của chúng ta, chúng ta sẽ cần chuyển chúng trở lại thành các phương thức - nhưng sử dụng các thuộc tính static theo cách này có thể là một lựa chọn khá tốt cho các trường hợp sử dụng đơn giản hơn.

### View controllers

Hãy chuyển sang view controllers, một loại đối tượng khác rất phổ biến để sử dụng các subclass. Mặc dù chúng ta có thể sẽ không thể loại bỏ hoàn toàn subclassing cho các view controllers (hoặc views cho vấn đề đó), nhưng có một số loại  view controller có thể hưởng lợi từ *factory approach*.

Đặc biệt là khi sử dụng child view controllers, chúng ta thường kết thúc với một nhóm các view controllers chỉ có ở đó để hiển thị một trạng thái nhất định - thay vì có rất nhiều logic trong chúng. Đối với những view controller này, việc chuyển thiết lập của chúng sang static factory API  có thể là một giải pháp khá hay.

Ở đây chúng tôi đang sử dụng phương pháp đó để triển khai thuộc tính được tính toán trả về trình view controller mà chúng ta sẽ sử dụng để tải xuống:


```
extension UIViewController {
    static var loading: UIViewController {
        let viewController = UIViewController()

        let indicator = UIActivityIndicatorView(activityIndicatorStyle: .gray)
        indicator.translatesAutoresizingMaskIntoConstraints = false
        indicator.startAnimating()
        viewController.view.addSubview(indicator)

        NSLayoutConstraint.activate([
            indicator.centerXAnchor.constraint(
                equalTo: viewController.view.centerXAnchor
            ),
            indicator.centerYAnchor.constraint(
                equalTo: viewController.view.centerYAnchor
            )
        ])

        return viewController
    }
}
```

Như bạn có thể thấy ở trên, chúng ta thậm chí có thể thiết lập các ràng buộc trong Auto Layout bên trong các thuộc tính hoặc hàm tĩnh . Đây là một tình huống trong đó tính chất khai báo của Auto Layout thực sự có ích - chúng ta có thể chỉ định tất cả các ràng buộc của chúng ta lên phía trước, mà không cần phải ghi đè lên bất kỳ phương thức nào hoặc trả lời bất kỳ cuộc gọi nào. Giờ đây chúng ta có thể dễ dàng thêm bộ điều khiển chế độ xem tải được định cấu hình trước khi thực hiện thao tác không đồng bộ:

```
class ProductListViewController: UIViewController {
    func loadProducts() {
        let loadingVC = add(.loading)

        productLoader.loadProducts { [weak self] result in
            loadingVC.remove()
            self?.handle(result)
        }
    }
}
```

Việc sửa đổi duy nhất được thực hiện cho API tiện lợi hơn là làm cho nó trả về child view controller được thêm vào, làm cho nó có thể nhận được một tham chiếu đến nó trong khi sử dụng dot syntax. Thêm @discardableResult cũng như loại bỏ bất kỳ cảnh báo nào khi tính năng mới đó không được sử dụng.

### Test stubs

Nó không chỉ trong main app code của chúng ta mà phải thực hiện rất nhiều thiết lập, chúng ta cũng thường phải làm điều đó khi viết test. Đặc biệt khi test mã dựa trên cấu hình mô hình cụ thể, thật dễ dàng để kết thúc với các test có đầy đủ các bản mẫu - khiến chúng khó đọc và gỡ lỗi hơn nhiều.

Giả sử chúng ta có một User model trong ứng dụng của chúng ta có chứa các loại quyền mà người dùng đã cho và có rất nhiều testslà xác minh logic dựa trên quyền của người dùng hiện tại. Thay vì phải tự tạo giá trị người dùng với dữ liệu bản mẫu trong tất cả các tests của chúng ta, hãy tạo phương thức static factory trả về một người dùng dựa trên một tập hợp các quyền, như sau:

```
extension User {
    static func makeStub(permissions: Set<User.Permission>) -> User {
        return User(
            name: "TestUser",
            age: 30,
            signUpDate: Date(),
            permissions: permissions
        )
    }
}
```

Bây giờ chúng ta có thể loại bỏ bất kỳ mã thiết lập người dùng nào, cho phép chúng ta tập trung vào những gì đang thực sự test - như ở đây, nơi chúng tôi xác minh rằng người dùng có quyền deleteFolders có thể xóa thư mục:

```
class FolderManagerTests: XCTestCase {
    func testDeletingFolder() throws {
        // We can now quickly create a user with the required permissions
        let user = User.makeStub(permissions: [.deleteFolders])
        let manager = FolderManager(user: user)
        let folderName = "Test"

        try manager.addFolder(named: folderName)
        XCTAssertNotNil(manager.folder(named: folderName))

        try manager.deleteFolder(named: folderName)
        XCTAssertNil(manager.folder(named: folderName))
    }
}
```


Khi bộ test của chúng ta phát triển và chúng tôi bắt đầu xác minh nhiều thứ liên quan đến các User models, chúng ta cũng có thể cần phải đặt các thuộc tính bổ sung khi tạo sơ khai. Một cách dễ dàng để thêm hỗ trợ cho điều đó, mà không cần phải tạo các phương thức bổ sung, là sử dụng các đối số mặc định:

```
extension User {
    static func makeStub(age: Int = 30,
                         permissions: Set<User.Permission> = []) -> User {
        return User(
            name: "TestUser",
            age: age,
            signUpDate: Date(),
            permissions: permissions
        )
    }
}
```

Bây giờ chúng ta có thể cung cấp một độ tuổi, một tập hợp quyền hạn hoặc cả hai - và thậm chí chúng ta có thể dễ dàng tạo một người dùng trống với User.makeStub () trong trường hợp những gì chúng ta đang test không dựa vào bất kỳ trạng thái người dùng cụ thể nào.

Bằng cách đặt tên cho phương thức makeStub ở trên, chúng ta cũng làm cho nó rõ ràng là mã này chỉ có nghĩa là để test, để nó không vô tình được thêm vào mục tiêu ứng dụng chính của chúng ta trong tương lai.

### Kết luận

Sử dụng các phương thức và đặc tính của static factory để thực hiện thiết lập các đối tượng có thể là cách tuyệt vời để tách biệt setup code khỏi logic thực, để cho phép các tính năng cú pháp đẹp và dễ dàng viết test hơn.

Trong khi phân lớp vẫn là công cụ quan trọng trong hộp công cụ của chúng ta - đặc biệt khi chúng ta muốn thêm logic vào một type - loại bỏ các subclasses thực sự chỉ thực hiện cấu hình có thể làm cho cơ sở mã của chúng ta dễ điều hướng hơn và giảm số lượng chúng tôi có để maintain.

Bài viết được tham khảo [tại](https://www.swiftbysundell.com/posts/static-factory-methods-in-swift).