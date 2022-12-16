Bất cứ ai viết iOS app đều đã sử dụng delegate parttern. Đây là một trong những parttern được sử dụng nhiều nhất trong phát triển iOS.

Tuy nhiên, đôi khi khi bạn viết các custom class của riêng mình thì bạn có thể sẽ thấy phiền phức, phức tạp khi muốn thông báo một delegate về một điều gì đó đã xảy ra.

### Publishing Actions

Hiện tại mình đang sử dụng Publishers để thông báo về một action khi người dùng thực hiện hành động như dưới đây

```
import UIKit
import Combine

final class MyCollectionViewController: UIViewController {

    enum Action {
        case selected(Item)
        case showFilterSettings
    }

    public var publisher = PassthroughSubject<Action, Never>()

    // .. code for setting up collection views etc.

    // the action of a keyboard command or navbar button
    @objc private func showFilterSettings() {
        publisher.send(.showFilterSettings)
    }
}

extension MyCollectionViewController: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        let item = // .. fetch item from data source based on index path
        publisher.send(.selected(item))
    }
}
```

### Subscribing to Actions

Bây giờ khi bạn tạo view controller mới, bạn có thể trực tiếp đăng ký tiếp nhận các hành động này và đưa ra phản hồi hành động tương ứng. 

```
let viewController = MyCollectionViewController()
let subscription = viewController.publisher.sink { action in
    switch action {
    case let .selected(item):
        let newViewController = MyDetailViewController(for: item)
        navigationController.show(newViewController)
    case .showFilterSettings:
        let filterSettingsController = FilterSettingsController()
        navigationController.present(filterSettingsController, animated: true)
    }
}
```

Bạn có thể đưa việc xử lý sự kiện sang một hàm riêng để thuận tiện cho việc Unit test hơn.

### Communicating Back### 

Bây giờ, lý do mà tiêu đề bài đăng này đọc bổ sung, không thay thế, các đại biểu là vấn đề giao tiếp trở lại bộ điều khiển xem gửi hành động trở thành một hairier nhỏ.

Một trong những lợi thế của cách tiếp cận như thế này là bạn có thể có nhiều subscriber cho cùng một publisher. Vì vậy, nếu bạn vì một số lý do cần phải phản hồi theo nhiều cách khác nhau đối với một mục được chọn, bạn có thể phân chia trách nhiệm đó giữa các đối tượng khác nhau.

Mặt khác, điều đó cũng có nghĩa là không có cách rõ ràng nào thay thế delegate methods mà yêu cầu delegate "Tôi có nên hiện thứ này?" hay tương tự. Bạn có thể truyền một callback như một phần của published action. Nhưng điều gì xảy ra nếu nhiều subscriber phản hồi? Chờ đợi tất cả subscriber phản hồi có thể yêu cầu bạn thiết lập một số timeout waiting parttern. Nó giúp chúng ta giảm bớt được khối lượng công việc khi chỉ thực hiện mỗi delegate protocol.

### Trước khi chúng ta bắt đầu 

Một thay đổi nhỏ mà chúng ta có thể thực hiện để cải thiện API của mình là biến chính view controller thành publisher. Chúng tôi có thể giữ PassthroughSubject nhưng đặt ở chế độ riêng tư. Sau đó, trong các phương thức cần thiết của publisher protocol, chúng ta có thể delegaet tới PassthroughSubject.

```
    enum Action {
        case selected(Item)
        case showFilterSettings
    }

    // publisher can now be private
    private var publisher = PassthroughSubject<Action, Never>()
}

extension MyCollectionViewController: Publisher {
    typealias Output = Action
    typealias Failure = Never

    func receive<S>(subscriber: S)
        where S : Subscriber,
        MyCollectionViewController.Failure == S.Failure,
        MyCollectionViewController.Output == S.Input
    {
        publisher.subscribe(subscriber)
    }
}
```

Sau khi làm điều đó, chúng ta có thể thả .publisher và chỉ cần đăng ký trực tiếp vào view controller vừa tạo:

```
let viewController = MyCollectionViewController()
let subscription = viewController.sink { action in
    switch action {
    case let .selected(item):
        let newViewController = MyDetailViewController(for: item)
        navigationController.show(newViewController)
    case .showFilterSettings:
        let filterSettingsController = FilterSettingsController()
        navigationController.present(filterSettingsController, animated: true)
    }
}
```