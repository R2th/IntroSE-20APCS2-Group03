Đây là bài dịch tự trang [medium.com](https://medium.com). Bài gốc mời các bạn xem tại [đây](https://medium.com/swlh/useful-swift-extensions-1-964b91ee0312).

Tăng tốc quá trình phát triển và tạo mã sạch hơn.
![](https://images.viblo.asia/df5502ed-7c9a-4acb-9a39-8b9cd49389d5.png)
Lần này chúng tôi sẽ trình bày một số tiện ích mở rộng giúp đơn giản hóa và tăng tốc quá trình phát triển của bạn.
Mã được trình bày ở đây có thể được sử dụng bằng cách sao chép và dán nó vào dự án của bạn.

### 1. `NSError`
Mỗi khi phải tạo một `NSError` đơn giản chỉ với một mô tả, tôi luôn phải tìm trên web để nhớ xem cái nào là khóa liên quan đến **Localized Description**.
Sau khi làm điều này nhiều lần, tôi đã bắt đầu sử dụng tiện ích mở rộng dưới đây.
```
extension NSError {
    
    /// A convenience initializer for NSError to set its description.
    ///
    /// - Parameters:
    ///   - domain: The error domain.
    ///   - code: The error code.
    ///   - description: Some description for this error.
    convenience init(domain: String, code: Int, description: String) {
        self.init(domain: domain, code: code, userInfo: [(kCFErrorLocalizedDescriptionKey as CFString) as String: description])
    }
    
}

// Usage 
let myError = NSError(
  domain: "SomeDomain", 
  code: 123,
  description: "Some description."
)
```

### 2. `NSObject` + Tên lớp
Bạn có cảm thấy mệt mỏi khi phải đặt tên của các `cell`, `xib` và những thứ như vậy bằng một chuỗi không?
```
extension NSObject {
    
    /// String describing the class name.
    static var className: String {
        return String(describing: self)
    }
    
}
```
Một trong những lợi ích nữa của việc sử dụng tiện ích trên là tránh được các lỗi chính tả có thể xảy.

### 3. Dequeuing TableViewCells
Mỗi khi tôi dequeue một `UITableViewCell`, tôi sẽ phải sử dụng `if-let`, `guard-let` hoặc `force-unrap`. Để tránh làm điều đó, tôi đã sử dụng phần mở rộng sau:
```
extension UITableView {
    
    /// Dequeues reusable UITableViewCell using class name for indexPath.
    ///
    /// - Parameters:
    ///   - type: UITableViewCell type.
    ///   - indexPath: Cell location in collectionView.
    /// - Returns: UITableViewCell object with associated class name.
    public func dequeueReusableCell<T: UITableViewCell>(ofType type: T.Type, for indexPath: IndexPath) -> T {
        guard let cell = dequeueReusableCell(withIdentifier: type.className, for: indexPath) as? T else {
            fatalError("Couldn't find UITableViewCell of class \(type.className)")
        }
        return cell
    }
    
}
```

Những thứ như thế này:
```
final class ViewController: UIViewController, UITableViewDataSource {
    
   func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "MyCell", for: indexPath) as? MyCell else {
            return UITableViewCell()
        }
        return cell
    }
    
}
```

Có thể chuyển thành như này:
```
final class ViewController: UIViewController, UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(ofType: MyCell.self, for: indexPath)
        return cell
    }
    
}
```
Khi lập trình viên quên đăng ký cell, ứng dụng sẽ bị crash…
Tôi nghĩ điều này thật tuyệt, vì rất dễ dàng để tìm ra những gì chúng ta đã quên.

Lưu ý: Có thể áp dụng cùng một tiện ích mở rộng trên cho `CollectionViewCells`.

### Bonus: Điều khiển bàn phím trên `ScrollView`
Đây không phải là một phần mở rộng cho một lớp hệ thống, nhưng giúp chúng ta kích hoạt một tình huống rất phổ biến mà chúng ta phải giải quyết trên `ScrollView`: làm cho một thứ gì đó đi theo bàn phím.
```
protocol ScrollableContentKeyboardObserving {
    func observeKeyboardWillShowNotification(_ scrollView: UIScrollView, onShowHandler onShow: ((CGSize?) -> Void)?)
    func observeKeyboardWillHideNotification(_ scrollView: UIScrollView, onHideHandler onHide: ((CGSize?) -> Void)?)
}
extension ScrollableContentKeyboardObserving {
    
    func observeKeyboardWillShowNotification(_ scrollView: UIScrollView, onShowHandler onShow: ((CGSize?) -> Void)? = nil) {
        
        let block: (Notification) -> Void = { notification -> Void in
            
            guard let keyboardFrameEndUserInfoKey = notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] else { return }
            
            let keyboardSize = (keyboardFrameEndUserInfoKey as AnyObject).cgRectValue.size
            let contentInsets = UIEdgeInsets(
                top: scrollView.contentInset.top,
                left: scrollView.contentInset.left,
                bottom: keyboardSize.height,
                right: scrollView.contentInset.right
            
            )
            scrollView.setContentInsetAndScrollIndicatorInsets(contentInsets)
            onShow?(keyboardSize)
        }
        _ = NotificationCenter.default.addObserver(
            forName: UIResponder.keyboardWillShowNotification,
            object: nil,
            queue: nil,
            using: block
        )
    }
    
    func observeKeyboardWillHideNotification(_ scrollView: UIScrollView, onHideHandler onHide: ((CGSize?) -> Void)? = nil) {
        
        let block: (Notification) -> Void = { notification in
            
            guard let keyboardFrameEndUserInfoKey = notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] else { return }
            
            let keyboardSize = (keyboardFrameEndUserInfoKey as AnyObject).cgRectValue.size
            let contentInsets = UIEdgeInsets(
                top: scrollView.contentInset.top,
                left: scrollView.contentInset.left,
                bottom: .zero,
                right: scrollView.contentInset.right
            )
            scrollView.setContentInsetAndScrollIndicatorInsets(contentInsets)
            onHide?(keyboardSize)
        }
        _ = NotificationCenter.default.addObserver(
            forName: UIResponder.keyboardWillHideNotification,
            object: nil,
            queue: nil,
            using: block
        )
    }
}

extension UIScrollView {
    
    func setContentInsetAndScrollIndicatorInsets(_ edgeInsets: UIEdgeInsets) {
        contentInset = edgeInsets
        scrollIndicatorInsets = edgeInsets
    }
    
}
```
Cách sử dụng: chỉ cần `View` của bạn có `ScrollView` và thiết lập các quan sát viên.
```
observeKeyboardWillShowNotification(scrollView) { [weak self] keyboardSize in
    guard let keyboardHeight = keyboardSize?.height else { return }
    self?.someViewYouWantToMoveBottomConstraint?.constant = -keyboardHeight
}

observeKeyboardWillHideNotification(scrollView) { [weak self] _ in
    self?.someViewYouWantToMoveBottomConstraint?.constant = .zero
}
```