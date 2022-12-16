Đây là bài dịch từ trang [medium.com](https://medium.com), mời các bạn xem bài gốc tại đây: https://levelup.gitconnected.com/what-is-the-combinelatest-operator-in-rxswift-5a63c555e22b

Hợp nhất một số `observable` thành một.

![](https://images.viblo.asia/15c8a90e-49ce-47a8-8168-a53987371763.jpg)
Trong bài viết này, chúng ta sẽ tìm hiểu về một toán tử rất hữu ích trong `RxSwift`, đó là toán tử `combineLatest`.

Nó cho phép chúng ta hợp nhất nhiều `observable` thành một `observable`có kiểu dữ liệu là 1 `tuple`của các kiểu dữ liệu của các `observable` thành phần.

Ví dụ, chúng ta có thể dùng toán tử này khi muốn xác thực tên và mật khẩu, được người dùng nhập vào các `UITextfield`, sau đó kích hoạt nút “sign in” khi tên và mật khẩu đã thỏa mãn các điều kiện cho trước.

![](https://images.viblo.asia/1acbc78c-fddd-496c-a719-ed44d1a38085.gif)

### Bắt đầu nào
Chúng ta bắt đầu với một `UIViewController`đơn giản chứa 2 `UITextfield` và 1 `UIButton`
```
import UIKit
import RxSwift
import RxCocoa

class ViewController: UIViewController {
  
    // MARK: - Lifecycle Methods
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.setupUI()
    }
    
    // MARK: - UI Elements
    let usernameTextField: UITextField = {
        let textField = UITextField()
        textField.attributedPlaceholder = NSAttributedString(string: "Username",
        attributes: [NSAttributedString.Key.foregroundColor: UIColor.gray])
        textField.textAlignment = .center
        textField.textColor = .black
        textField.layer.borderColor = UIColor.lightGray.cgColor
        textField.layer.borderWidth = 1
        textField.translatesAutoresizingMaskIntoConstraints = false
        return textField
    }()
    
    let passwordTextField: UITextField = {
        let textField = UITextField()
        textField.attributedPlaceholder = NSAttributedString(string: "Password",
        attributes: [NSAttributedString.Key.foregroundColor: UIColor.gray])
        textField.textAlignment = .center
        textField.textColor = .black
        textField.layer.borderColor = UIColor.lightGray.cgColor
        textField.layer.borderWidth = 1
        textField.isSecureTextEntry = true
        textField.translatesAutoresizingMaskIntoConstraints = false
        return textField
    }()
    
    lazy var signInButton: UIButton = {
        let button = UIButton()
        button.layer.cornerRadius = 10
        button.backgroundColor = .lightGray
        button.setTitle("Sign In", for: .normal)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    // MARK:- UI Setup
    private func setupUI() {
        self.view.backgroundColor = .white
        
        self.view.addSubview(usernameTextField)
        self.view.addSubview(passwordTextField)
        self.view.addSubview(signInButton)
        
        NSLayoutConstraint.activate([
            usernameTextField.topAnchor.constraint(equalTo: self.view.topAnchor, constant: 50),
            usernameTextField.leftAnchor.constraint(equalTo: self.view.leftAnchor, constant: 20),
            usernameTextField.rightAnchor.constraint(equalTo: self.view.rightAnchor, constant: -20),
            usernameTextField.heightAnchor.constraint(equalToConstant: 50)
        ])
        
        NSLayoutConstraint.activate([
            passwordTextField.topAnchor.constraint(equalTo: self.usernameTextField.bottomAnchor, constant: 20),
            passwordTextField.leftAnchor.constraint(equalTo: self.usernameTextField.leftAnchor),
            passwordTextField.rightAnchor.constraint(equalTo: self.usernameTextField.rightAnchor),
            passwordTextField.heightAnchor.constraint(equalToConstant: 50)
        ])
        
        NSLayoutConstraint.activate([
            signInButton.centerYAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.centerYAnchor),
            signInButton.leftAnchor.constraint(equalTo: self.passwordTextField.leftAnchor),
            signInButton.rightAnchor.constraint(equalTo: self.passwordTextField.rightAnchor),
            signInButton.heightAnchor.constraint(equalToConstant: 50)
        ])
    }
    
}
```
Giờ chúng ta sẽ thêm 2 thuộc tính sau:
* Một `DisposeBag` để chứa các subscription
* Một `BehaviorRelay` chứa giá trị `Bool` để biểu thị nút “sign in” có được kích hoạt hay không.
```
import UIKit
import RxSwift
import RxCocoa

class ViewController: UIViewController {
    
    // MARK: - Lifecycle Methods
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.setupUI()
    }
    
    // MARK: - Properties
    private let disposeBag = DisposeBag()
    private let isButtonEnabled = BehaviorRelay<Bool>(value: false)
    
    // MARK: - UI Elements
    ...
    
    // MARK:- UI Setup
    ...
    
}
```
Bây giờ nhiệm vụ của chúng ta là quan sát cả tên người dùng và mật khẩu được nhập vào `UITextFields` và thay đổi giá trị của thuộc tính `isButtonEnables` tương ứng. Hãy sử dụng toán tử `combineLatest` để hợp nhất hai observables này:
```
import UIKit
import RxSwift
import RxCocoa

class ViewController: UIViewController {
    
    // MARK: - Lifecycle Methods
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.setupUI()
        
        Observable
            .combineLatest(
                usernameTextField.rx.text.orEmpty,
                passwordTextField.rx.text.orEmpty
            )
            .map { username, password -> Bool in
                username.count > 4 && password.count > 7
            }
            .bind(to: isButtonEnabled)
            .disposed(by: disposeBag)
    }
    
    // MARK: - Properties
    private let disposeBag = DisposeBag()
    private let isButtonEnabled = BehaviorRelay<Bool>(value: false)
    
    // MARK: - UI Elements
    ...
    
    // MARK:- UI Setup
    ...
    
}
```
Như bạn thấy, trong hàm `viewDidLoad()`, chúng ta đã tiến hành đăng kí theo dõi các giá trị `text` của các `UITextfield`.

Sau đó, trong toán tử `.map`, chúng ta thu được giá trị cuối cùng các textfield, và trả ra một giá trị `Bool`. Nếu tên dài hơn 4 kí tự, và mật khẩu dài hơn 7 kí tự, chúng ta sẽ trả ra giá trị `true`.

Cuối cùng, chúng ta dùng toán tử `.bind`để kết nối giá trị đầu ra trên với thuộc tính `isButtonEnabled`.

Viết một lệnh `print()`bên trong toán tử `.map`, để in ra 2 giá trị tên và mật khẩu.
```
import UIKit
import RxSwift
import RxCocoa

class ViewController: UIViewController {
    
    // MARK: - Lifecycle Methods
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.setupUI()
        
        Observable
            .combineLatest(
                usernameTextField.rx.text.orEmpty,
                passwordTextField.rx.text.orEmpty
            )
            .map { username, password -> Bool in
                print(username, password)
                return username.count > 4 && password.count > 7
            }
            .bind(to: isButtonEnabled)
            .disposed(by: disposeBag)
    }
    
    // MARK: - Properties
    private let disposeBag = DisposeBag()
    private let isButtonEnabled = BehaviorRelay<Bool>(value: false)
    
    // MARK: - UI Elements
    ...
    
    // MARK:- UI Setup
    ...
    
}
```
Bây giờ chúng ta thấy cả tên người dùng và mật khẩu được in trong bảng điều khiển khi chúng ta nhập nội dung nào đó vào một trong các `UITextField`.

![](https://images.viblo.asia/ceaa51b7-0fb4-4fb1-9801-8a2f723746c9.png)

Tất cả những gì còn lại cần làm bây giờ là điều chỉnh giao diện người dùng của nút để phản ánh trạng thái của nó:
```
import UIKit
import RxSwift
import RxCocoa

class ViewController: UIViewController {
    
    // MARK: - Lifecycle Methods
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.setupUI()
        
        Observable
            .combineLatest(
                usernameTextField.rx.text.orEmpty,
                passwordTextField.rx.text.orEmpty
            )
            .map { username, password -> Bool in
                username.count > 4 && password.count > 7
            }
            .bind(to: isButtonEnabled)
            .disposed(by: disposeBag)
        
        isButtonEnabled
            .do(onNext: { [unowned self] (isEnabled) in
                self.signInButton.backgroundColor = isEnabled ? .systemOrange : .lightGray
                self.signInButton.isEnabled = isEnabled
            })
            .subscribe()
            .disposed(by: disposeBag)
    }
    
    // MARK: - Properties
    private let disposeBag = DisposeBag()
    private let isButtonEnabled = BehaviorRelay<Bool>(value: false)
    
    // MARK: - UI Elements
    ...
    
    // MARK:- UI Setup
    ...
    
}
```
Chúng tôi đặt màu nền thành `.systemOrange` và `isEnables` thành `true` nếu nút được kích hoạt. Và màu nền được đặt thành `.lightGrey` và nút chưa được phép kích hoạt.

Đó là tất cả những gì chúng ta cần làm để đạt được mục tiêu của mình - chúng ta đã thực hiện thành công xác thực đầu vào của người dùng và ràng buộc giá trị `Bool` với một `UIButton`:

![](https://images.viblo.asia/23d7b502-4406-4658-8d6b-c701a0091859.gif)