Khi phát triển ứng dụng di động, chúng ta thường xuyên gặp những trường hợp mà một phần chức năng có thể được sử dụng ở các view controller khác nhau. Ví dụ điển hình nhất là việc hiển thị trạng thái loading hoặc hiển thị thông báo lỗi. Trong một ứng dụng, có thể có nhiều hơn một view controller cần thực hiện ngầm việc tải dữ liệu và hiển thị thông báo lỗi khi tác vụ thất bại. Những chức năng này cần được viết theo một cách nào đó để tránh tình trạng lặp mã nguồn, đồng thời giúp các view controller không còn bị phình to quá mức.

Thông thường, rất nhiều lập trình viên chọn cách tạo một `BaseViewController` có chứa các chức năng chung, và các view controller khác kế thừa từ `BaseViewController` này:

```swift
class BaseViewController: UIViewController {
    func showActivityIndicator() {
        ...
    }

    func hideActivityIndicator() {
        ...
    }

    func handle(_ error: Error) {
        ...
    }
}
```

Cách làm này thoạt nhìn thì có vẻ tiện lợi và giải quyết được bài toán sử dụng chung mã nguồn. Tuy nhiên, BaseViewController sẽ chứa tất cả các chức năng cần chia sẻ, gây nên tình trạng khó bảo trì và phát triển thêm. Một vấn đề nữa với cách giải quyết này là nó làm thu hẹp lựa chọn cho việc viết view controller mới, vì một class con chỉ có thể kế thừa một class cha trong Swift.

Với việc sử dụng child view controller như các plug-in, chúng ta có thể giải quyết vấn để trên.

Chúng ta có thể tạo một view controller mà ta có thể thêm vào bất cứ lúc nào cần hiển thị tiến trình loading:

```swift
class LoadingViewController: UIViewController {
    private lazy var activityIndicator = UIActivityIndicatorView(activityIndicatorStyle: .gray)

    override func viewDidLoad() {
        super.viewDidLoad()

        activityIndicator.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(activityIndicator)

        NSLayoutConstraint.activate([
            activityIndicator.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            activityIndicator.centerYAnchor.constraint(equalTo: view.centerYAnchor)
        ])
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)

        // We use a 0.5 second delay to not show an activity indicator
        // in case our data loads very quickly.
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) { [weak self] in
            self?.activityIndicator.startAnimating()
        }
    }
}
```

# Thêm và xoá child view controller

Để sử dụng một child view controller, chúng ta cần thêm nó vào parent view controller thông qua các bước sau:

```swift
// 1
parent.view.addSubview(child.view)

// 2
parent.addChild(child)

// 3
child.didMove(toParent: parent)
```

1. Đưa view của child view controller vào view của parent view controller.
2. Thêm child view controller vào parent view controller.
3. Thông báo với child view controller rằng nó đã được thêm vào parent view controller.

Khi không cần sử dụng chức năng của child view controller nữa, ta loại bỏ nó theo các bước sau:

```swift
// 1
child.willMove(toParent: nil)

// 2
child.removeFromParent()

// 3
child.view.removeFromSuperview()
```

1. Thông báo với child view controller rằng nó sắp được xoá khỏi parent view controller.
2. Xoá child view controller khỏi parent view controller.
3. Xoá view của child view controller khỏi view của parent view controller.

Để tiện lợi hơn, chúng ta tạo extension cho `UIViewController` tránh việc lặp lại mã nguồn mỗi khi thêm hoặc xoá child view controller:

```swift
extension UIViewController {
    func add(_ child: UIViewController) {
        addChild(child)
        view.addSubview(child.view)
        child.didMove(toParent: self)
    }

    func remove() {
        // Just to be safe, we check that this view controller
        // is actually added to a parent before removing it.
        guard parent != nil else {
            return
        }

        willMove(toParent: nil)
        view.removeFromSuperview()
        removeFromParent()
    }
}
```

# Sử dụng child view controller

Có một điều rất hay là `UIKit` sẽ tự động gọi đầy đủ các phương thức trong vòng đời của child view controller. Việc chúng ta cần làm chỉ là thêm và xoá nó đi mà thôi:

```swift
class ListViewController: UITableViewController {
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        loadItems()
    }

    private func loadItems() {
        let loadingViewController = LoadingViewController()
        add(loadingViewController)

        dataLoader.loadItems { [weak self] result in
            loadingViewController.remove()
            self?.handle(result)
        }
    }
}
```

# Kết luận

Việc sử dụng các child view controller riêng biệt cho các chức năng thường dùng thay vì tạo một class chung và kế thừa từ nó sẽ giúp mã nguồn của chúng ta được tổ chức tốt hơn, dễ dàng bảo trì và mở rộng. Tuy nhiên, sẽ có những trường hợp mà chúng ta bắt buộc phải sử dụng kế thừa.

# Tài liệu tham khảo

https://www.swiftbysundell.com/articles/using-child-view-controllers-as-plugins-in-swift/