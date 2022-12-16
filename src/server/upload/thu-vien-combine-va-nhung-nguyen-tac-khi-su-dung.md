- Tiếp nối bài trước mình sẽ tiếp tục chia sẻ về thư viện Combine mà Apple đã public tại WWDC 2019.


# 1. Thư viện Combine 
- Như chúng ta cũng đã biết về các thư viện RxSwift và ReactiveSwift (nó được biết tới với cái tên ReactiveCocoa). Và bây giờ các bạn cũng có thể so sánh Combine với chúng. Nó cho phép các bạn viết code theo kiểu **functional reactive** (tức là xử lý các giá trị theo thời gian). Ví dụ như response network, tương tác với người dùng và các loại dữ liệu bất đồng bộ khác...

# 2. Các nguyên tắc cơ bản
- Các nguyên tắc cơ bản sẽ giúp cho bạn hiểu cách hoạt động và cách sử dụng nó. Trước khi thử nó với một vài ví dụ thì chúng ta hãy cùng xem một vài thông tin cơ bản về nó trước để hiểu thêm về nó nhé.

### 2.1 Publishers và subscribers
- Thư viện Combine nó tương tự RxSwift 
    - Publishers thì giống với Observables
    - Subscribers thì giống với Observers

- Cả 2 thư viện này nó chỉ khác nhau về tên gọi nhưng cả hai đều có mục đích như nhau. Một Publishers sẽ đưa ra các giá trị có thể thay đổi mà theo đó Subscribers có thể đăng ký để nhận tất cả các giá trị được thay đổi đó. Các bạn hãy ghi nhớ điều đó trước khi chuyển sang một ví dụ về nó nhé.

### 2.2 Foundation và Combine
- Foundation chứa các extension để có thể làm việc chung với Combine. Ví dụ như
    - URLSessionTask
    - Operators để decode json
    - Notification.Name để publish các thông tin notification

- Mình có tạo 1 ví dụ các bạn có thể tham khảo (các bạn có thể sử dụng Playgound cho nhanh):

```
import Foundation
import UIKit
import Combine

extension Notification.Name {
    static let newVibloPost = Notification.Name("new.viblo.post")
}

struct VibloPost {
    let title: String
    let url: URL
}

let vibloPostPublisher = NotificationCenter.Publisher(center: .default,
                                                      name: .newVibloPost,
                                                      object: nil)
```

- Bên trên mình có tạo 1 extension Notification.Name khi có một bài post của viblo chẳng hạn.
- Một struct để lưu thông tin bài post (bao gồm title và url)
- Một Publisher để lắng nghe các thông báo khi có bài post và tất nhiên nó chỉ xảy ra với các đăng ký của nó. Tức là ví dụ chúng ta sẽ tạo ra đăng ký như sau:

```
let lastVibloPostLabel = UILabel()
let lastVibloPostLabelSubscriber = Subscribers.Assign(object: lastVibloPostLabel,
                                                      keyPath: \.text)
vibloPostPublisher.subscribe(lastVibloPostLabelSubscriber)
```

- Nhưng nếu bạn dừng ở đây thì sẽ gặp lỗi. Publisher thì có kiểu là một notification, subcriber thì sẽ assign text. Vì vậy chúng ta cần sửa một chút như sau:

```
import Foundation
import UIKit
import Combine

extension Notification.Name {
    static let newVibloPost = Notification.Name("new.viblo.post")
}

struct VibloPost {
    let title: String
    let url: URL
}

let vibloPostPublisher = NotificationCenter.Publisher(center: .default,
                                                      name: .newVibloPost,
                                                      object: nil)
    .map { notification -> String? in
        return (notification.object as? VibloPost)?.title
    }

let lastVibloPostLabel = UILabel()
let lastVibloPostLabelSubscriber = Subscribers.Assign(object: lastVibloPostLabel,
                                                      keyPath: \.text)
vibloPostPublisher.subscribe(lastVibloPostLabelSubscriber)
```

- Như bạn thấy, tôi đã map notification sang một string (title của bài post)
- Nhưng nó hoạt động chưa? chưa đâu. Chúng ta cần tạo 1 bài post mới xong post thông báo thì mới hoàn chỉnh một stream.
- Code full sẽ như sau:

```

import Foundation
import UIKit
import Combine

extension Notification.Name {
    static let newVibloPost = Notification.Name("new.viblo.post")
}

struct VibloPost {
    let title: String
    let url: URL
}

let vibloPostPublisher = NotificationCenter.Publisher(center: .default,
                                                      name: .newVibloPost,
                                                      object: nil)
    .map { notification -> String? in
        return (notification.object as? VibloPost)?.title
    }

let lastVibloPostLabel = UILabel()
let lastVibloPostLabelSubscriber = Subscribers.Assign(object: lastVibloPostLabel,
                                                      keyPath: \.text)
vibloPostPublisher.subscribe(lastVibloPostLabelSubscriber)

// Action

let vibloPost = VibloPost(title: "Hello world, hello Combine framework",
                          url: URL(string: "https://developer.apple.com/documentation/combine")!)
NotificationCenter.default.post(name: .newVibloPost, object: vibloPost)

// Result
print("Last viblo post is: \(lastVibloPostLabel.text!)")
```

- Kết quả sẽ là:

**Last viblo post is: Hello world, hello Combine framework**

### 2.3 Sử dụng @Published để bind giá trị thay đổi

- Chúng ta hãy cùng xem một ví dụ sau nhé:

```
final class LoginViewController: UIViewController {
    @Published var isSubmitable: Bool = false
    
    @IBOutlet private weak var acceptTermSwitch: UISwitch!
    @IBOutlet private weak var submitButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        $isSubmitable.receive(on: DispatchQueue.main).assign(to: \.isEnabled, on: submitButton)
    }
    
    @IBAction func didChangeSwitch(_ sender: UISwitch) {
        isSubmitable = sender.isOn
    }
}
```

- Đây là một viewcontroller đảm nhiệm chức vụ login.
- UISwitch sẽ tạo một trigger mỗi khi giá trị thay đổi và cập nhật vào **isSubmitable**
- Giá trị **isSubmitable** sẽ được assigned vào isEnable của submitButton.
- Có một điểm đặc biệt bạn có thể thấy ở đây đó là trong func viewDidLoad() có sử dụng ký hiệu **$** nó sẽ cho phép bạn truy cập vào giá trị của Publishers.

# 3. Quản lý memory trong Combine
- Các bạn sử dụng RxSwift thì cũng sẽ biết về DisposeBag để làm gì đúng ko? Ấy vậy Combine nó cũng thế, chỉ khác cái tên đó là AnyCancellable
- Để tạo ra nó chúng ta viết code như sau
```
private var subscriber: AnyCancellable?
```

- Với phần code login bên trên chúng ta có thể viết như sau:
```
final class LoginViewController: UIViewController {
    @Published var isSubmitable: Bool = false
    private var switchSubscriber: AnyCancellable?
    
    @IBOutlet private weak var acceptTermSwitch: UISwitch!
    @IBOutlet private weak var submitButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        switchSubscriber = $isSubmitable.receive(on: DispatchQueue.main).assign(to: \.isEnabled, on: submitButton)
    }
    
    @IBAction func didChangeSwitch(_ sender: UISwitch) {
        isSubmitable = sender.isOn
    }
}
```

- Bonus thêm các operator khác cho các bạn nè: [Combine-Operators](https://usercontent.one/wp/www.avanderlee.com/wp-content/uploads/2019/06/combine-operators-1024x573.png)

# 4. Sử dụng Combine với mô hình MVVM
- Trong bài hướng dẫn lần trước mình có hướng dẫn qua rồi nên ở bài viết này mình không nói chi tiết nữa. Với ví dụ login bên trên thì chúng ta tách một view model là được.
- Code đầy đủ sẽ như sau:

```
struct LoginViewModel {
    @Published var isSubmitable: Bool = false
}

final class LoginViewController: UIViewController {
    private var switchSubscriber: AnyCancellable?
    private var viewModel = LoginViewModel()
    
    @IBOutlet private weak var acceptTermSwitch: UISwitch!
    @IBOutlet private weak var submitButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        switchSubscriber = viewModel.$isSubmitable.receive(on: DispatchQueue.main).assign(to: \.isEnabled, on: submitButton)
    }
    
    @IBAction func didChangeSwitch(_ sender: UISwitch) {
        viewModel.isSubmitable = sender.isOn
    }
}
```

# 5. Khi nào nên sử dụng Combine ?
- Như bác Cook có nói thì cái framework này vừa dễ đọc lại vừa dễ maintain nên hãy dùng luôn đi các bạn nhé :D

- Trên đây là một vài chia sẻ về thư viện Combine, sắp tới có lẽ chúng ta không sử dụng Rx nữa rồi các bạn ạ. Mình chỉ chém gió tí thôi, nhưng khả năng lớn đó. 
Hàng chính hãng thì thường sẽ ngon và được support tới răng mà. Các bạn có thể tham khảo một vài discussion tại đây [Combine-will-kill-Rxswift](https://medium.com/flawless-app-stories/will-combine-kill-rxswift-64780a150d89)