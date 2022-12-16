- Đôi lúc cách duy nhất để  tác động đến `state` chung của `code base`  tạo ra những thay đổi lớn  chẳng hạn như thay đổi kiến trúc code, thay đổi cách truyền data  hoặc áp dụng các `framework` mới.

- Ở bài viết này chúng ta cùng xem xét  cách viết các `utility functions` nhỏ  thực hiện các tác vụ phổ biến dễ dàng hơn với các `pattern`   giản hơn để sử dụng.

## 1/ Configuration closures:

- Một phần code trong các dự án  được dành để xác định một số `object` nhất định để sử dụng . Đặc biệt là khi sử dụng `object orient` UI như UIKit. Giống như chúng ta đã xem qua [Encapsulating configuration code in Swift](https://www.swiftbysundell.com/articles/encapsulating-configuration-code-in-swift/) thì việc tìm ra những cách gọn gàng để viết riêng biệt những đoạn code đó  có thể cải thiện sự minh bạch của logic cũng như phạm vi mà đoạn code được sử dụng.

- Ví dụ, chúng ta  đang sử dụng `pattern` phổ biến  bằng cách sử dụng [self-executing closures](https://www.swiftbysundell.com/articles/using-lazy-properties-in-swift/#using-a-self-executing-closure) như sau:

```swift
class HeaderView: UIView {
    let imageView: UIImageView = {
        let view = UIImageView()
        view.translatesAutoresizingMaskIntoConstraints = false
        view.contentMode = .scaleAspectFit
        view.image = .placeholder
        return view
    }()

    let label: UILabel = {
        let view = UILabel()
        view.translatesAutoresizingMaskIntoConstraints = false
        view.numberOfLines = 2
        view.font = .preferredFont(forTextStyle: .headline)
        return view
    }()
    
    ...
}
```

- Cách code trên không có gì sai nhưng sẽ tốt hơn nếu chúng ta có thể giảm số lượng code được liên kết với từng `property` . Có một số cách tiếp cận khác nhau mà chúng ta có thể thực hiện ở đây chẳng hạn như sử dụng các [factory method](https://www.swiftbysundell.com/articles/using-lazy-properties-in-swift/#using-a-factory-method) thay vì tự `self-executing closures` hãy xem liệu chúng ta có thể viết một `simple utility funtion` để giúp chúng ta làm `code` trên gọn hơn trong khi vẫn sử dụng cùng `pattern`.

- Giới thiệu với các bạn chức năng gọi là `configure`, nó sẽ lấy một giá trị mà chúng ta muốn `configure` và `closure`  để thực hiện công việc `configure` đó. Chúng ta có thể gói gọn tất cả `configure` code  của mình cũng như sẽ truyền  tham số từ xa với từ khóa `inout` cho phép chức năng mới của chúng ta được sử dụng với các loại giá trị:

```swift
func configure<T>(
    _ value: T,
    using closure: (inout T) throws -> Void
) rethrows -> T {
    var value = value
    try closure(&value)
    return value
}
```

- Giờ đây chúng ta có thể quay lại `HeaderView` của mình và làm cho`configure` code  `subview` dễ đọc hơn:

```swift
class HeaderView: UIView {
    let imageView = configure(UIImageView()) {
        $0.translatesAutoresizingMaskIntoConstraints = false
        $0.contentMode = .scaleAspectFit
        $0.image = .placeholder
    }

    let label = configure(UILabel()) {
        $0.translatesAutoresizingMaskIntoConstraints = false
        $0.numberOfLines = 2
        $0.font = .preferredFont(forTextStyle: .headline)
    }
    
    ...
}
```

- Một lợi thế của chức năng `configure` code của chúng ta là nó hoàn toàn  có thể được sử dụng với bất kỳ `type` nào từ  `UIView` đến bất kỳ loại `object` .

- Ví dụ, chúng tai sử dụng cùng một `pattern`  như trên khi thiết lập giá trị `URLRequest` được sử dụng để đồng bộ hóa dữ liệu khi người dùng  kết nối  WiFi:

```swift
struct SyncNetworkTask {
    var request = configure(URLRequest(url: .syncEndpoint)) {
        $0.httpMethod = "PATCH"
        $0.addValue("application/json",
            forHTTPHeaderField: "Content-Type"
        )
        $0.allowsCellularAccess = false
    }
    
    ...
}
```

## 2/ Rethrowing functions:

- Một chi tiết của chức năng trên có thể dễ bị bỏ lỡ là  nó được đánh dấu bằng từ khóa `rethrow`. Những gì từ khóa đó làm là  bảo trình biên dịch `Swift` chỉ coi chức năng đó là `throw` nếu `closure` được truyền cho nó cũng `throw`.

```swift
let webView = try configure(WKWebView()) {
    let html = try loadBundledHTML()
    try $0.loadHTMLString(html, baseURL: nil)
    ...
}
```

- Bất cứ khi nào chúng ta thiết kế bất kỳ `AP`I nào chấp nhận các  `synchronous closures` thì  chắc chắn nên xem xét việc đánh dấu các chức năng của chúng ta bằng các lần truy cập lại  cho phép chúng tôi `throw error`  khi cần.

## 3/ Reducing boilerplate:

- Bên cạnh việc chúng ta quy định  các `code convention`  các `utility function` cũng có thể giúp chúng ta tránh các lỗi phổ biến như  thực hiện các tác vụ cụ thể hơn, chẳng hạn như xác định `layout` và `color`.

```swift
let label = UILabel()
label.translatesAutoresizingMaskIntoConstraints = false
view.addSubview(label)

NSLayoutConstraint.activate([
    label.topAnchor.constraint(equalTo: view.topAnchor),
    label.leadingAnchor.constraint(equalTo: view.leadingAnchor),
    ...
])
```

- Chúng ta có thể chọn cách đơn giản như `extension UIView`  tự động chuẩn bị chế độ xem đã cho để sử dụng với `auto layout`  sau đó kích hoạt một loạt các `constraint`:

```swift
extension UIView {
    func layout(using constraints: [NSLayoutConstraint]) {
        translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate(constraints)
    }
}
```

- Chỉ với `extension` nhỏ bé đó, chúng ta thực sự có thể làm cho `source code` của mình dễ đọc hơn:

```swift
let label = UILabel()
view.addSubview(label)

label.layout(using: [
    label.topAnchor.constraint(equalTo: view.topAnchor),
    label.leadingAnchor.constraint(equalTo: view.leadingAnchor),
    ...
])
```

- Hãy cùng xem một ví dụ khác mà chúng ta hướng đến để dễ dàng xác định `dynamic coloe` thích ứng với việc thiết bị của người dùng hiện đang chạy ở `light mode` hay `dark mode`:

```swift
let backgroundColor = UIColor { traitCollection in
    switch traitCollection.userInterfaceStyle {
    case .dark:
        return UIColor(white: 0.15, alpha: 1)
    case .light, .unspecified:
        return UIColor(white: 0.85, alpha: 1)
    }
}
```

- Chúng ta đang tìm cách xác định các cặp màu để sử dụng ở `light mode` hay `dark mode`.  Đặt tên cho chức năng mới `colorPair` của chúng ta và để nó chấp nhận một `UIColor` để sử dụng cho chế độ s`light mode` hay `dark mode`. Sau đó, chúng tôi sẽ gọi API `UIColor`  trả về  màu thích hợp cho từng `UIUserInterfaceStyle` :

```swift
func colorPair(light: UIColor, dark: UIColor) -> UIColor {
    UIColor { traitCollection -> UIColor in
        switch traitCollection.userInterfaceStyle {
        case .dark:
            return dark
        case .light, .unspecified:
            return light
        }
    }
}
```

- Chúng ta  khai báo `backgroundColor` ở trên của chúng ta như sau:

```swift
let backgroundColor = colorPair(
    light: UIColor(white: 0.85, alpha: 1),
    dark: UIColor(white: 0.15, alpha: 1)
)
```

- Kết hợp tính năng trên với một `utility function` khác cho phép chúng ta xác định bất kỳ `UIColor` nào bằng cách sử dụng cú pháp dấu chấm :

```swift
extension UIColor {
    static func grayScale(_ white: CGFloat,
                          alpha: CGFloat = 1) -> UIColor {
        UIColor(white: white, alpha: alpha)
    }
}

let backgroundColor = colorPair(
    light: .grayScale(0.85),
    dark: .grayScale(0.15)
)
```

- Trong khi viết các `utility function` như các function  trên chúng ta có thể tự hỏi mình những câu hỏi như tại sao các `API` mặc định được thiết kế theo cách này? Giống như với hầu hết mọi thứ trong lập trình- các API tuyệt vời thường là về việc cân bằng một tập hợp các sự đánh đổi nhất định.