> Model-View-Controller là một design pattern cơ bản và phổ biến trong lập trình, đặc biệt là các ứng dụng trong hệ sinh thái của Apple như iOS, macOS. Mặc dù nó là một design pattern đơn giản, nhưng phần lớn các lập trình viên đều ko tuân thủ được đúng hoàn toàn và vô tình biến nó thành "Massive View Controller''.

Nếu như chúng ta hiểu và follow đúng theo kiến trúc của mô hình này, thì nó sẽ là một cấu trúc rất tuyệt, do vậy ở bài viết này, chúng ta sẽ cùng nhau chỉnh sửa và thay đổi lại một chút cách code để đưa đưa MVC về lại đúng bản chất thật sự của nó.
Chúng ta sẽ cùng nhau viết một project nhỏ với một màn hình login cơ bản, user sẽ nhập email và password, sau đó ứng dụng sẽ print trạng thái ra console. Việc đầu tiên cần làm là không sử dụng đến Storyboard. Tại sao?

# Vấn đề của Storyboard
Bên cạnh những ưu điểm và tính trực quan khi lập trình UI, Storyboard còn tồn tại nhiều vấn đề lớn như sau:

*  Làm chậm performance và tốn thời gian compile.
*  Không thân thiện với git, do cơ chế XML, sẽ rất khó xử lý conflict khi nhiều dev cùng chỉnh sửa trong một file Storyboard
*  Nếu build fail, storyboard sẽ fail ở runtime, không phải compile time -> phát sinh ra nhiều bug dị.
*  Và còn nhiều vấn đề nữa

Nếu như không dùng storyboard thì chúng ta phải code UI bằng tay, tuy nhiên nó sẽ khiến View Controller phình to ra -> lại mâu thuẫn với mục đích ban đầu đó là tránh Massive View Controllers. 

# Giải pháp
1. Subclass UIView và UIViewController
2. Chuyển tất cả UI và layout code ra khỏi view controllers.
3. Sử dụng extension để tổ chức lại View Controller
4. Sử dụng các hàm convenience init để khởi tạo và gom các UI element vào chung một chỗ.


Đầu tiên chúng ta sẽ tạo một base class mới có tên là View thay vì UIView:

    
   ```swift
   import UIKit

    class View: UIView {

	override init(frame: CGRect) {
		super.init(frame: frame)

		setViews()
		layoutViews()
	}

	required init?(coder aDecoder: NSCoder) {
		super.init(coder: aDecoder)

		setViews()
		layoutViews()
	}

	/// Set view và subviews ở đây.
	func setViews() {
		backgroundColor = .white
	}

	/// Layout subview ở đây
	func layoutViews() {}
}
```



Tương tự với class View, chúng ta cuxgn tạo một base class ViewController mới, thay vì UIViewController:
import UIKit
```swift
class ViewController<V: View>: UIViewController {

	override func loadView() {
		view = V()
	}

	var customView: V {
		return view as! V
	}

}
```

Kết hợp lại ta có class LoginView như sau:
```swift
protocol LoginViewDelegate: class {
	func loginView(_ view: LoginView, didTapLoginButton button: UIButton)
}

class LoginView: View {

	weak var delegate: LoginViewDelegate?

	var emailAddress: String {
		return emailTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
	}

	var password: String {
		return passwordTextField.text ?? ""
	}

	private lazy var emailTextField: UITextField = {
		let textField = UITextField()
		textField.placeholder = "Email Address"
		textField.keyboardType = .emailAddress
		return textField
	}()

	private lazy var passwordTextField: UITextField = {
		let textField = UITextField()
		textField.placeholder = "Password"
		textField.isSecureTextEntry = true
		return textField
	}()

	private lazy var loginButton: UIButton = {
		let button = UIButton(type: .system)
		button.setTitle("Login", for: .normal)
		return button
	}()

	override func setViews() {
		super.setViews()

		addSubview(emailTextField)
		addSubview(passwordTextField)
		addSubview(loginButton)
		loginButton.addTarget(self, action: #selector(didTapLoginButton(_:)), for: .touchUpInside)
	}

	override func layoutViews() {
		// Ở đây chúng ta sẽ layout các button, textfield. Bạn có thể sử dụng SnapKit
	}

}

// MARK: - Actions
private extension LoginView {

	@objc func didTapLoginButton(_ button: UIButton) {
		delegate?.loginView(self, didTapLoginButton: button)
	}

}
```

Cuối cùng thì ở LoginViewController chúng ta chỉ cần gán delegate và code đã trở nên gọn gàng hơn rất nhiều.

```swift
import UIKit

class LoginViewController: ViewController<LoginView> {

	override func viewDidLoad() {
		super.viewDidLoad()

		customView.delegate = self
	}

}

// MARK: - LoginViewDelegate
extension LoginViewController: LoginViewDelegate {

	func loginView(_ view: LoginView, didTapLoginButton button: UIButton) {
		print("Email Address: \(customView.emailAddress)")
		print("Password: \(customView.password)")
	}

}
```

# Convenience initializer
Để tránh việc lặp đi lặp lại code, chúng ta có thể tạo một hàm convenience init dùng chung cho các tác vụ giống nhau:

```swift
extension UITextField {

	convenience init(
		placeholder: String,
		keyboardType: UIKeyboardType = .default,
		isSecureTextEntry: Bool = false) {
		
		self.init()

		self.placeholder = placeholder
		self.keyboardType = keyboardType
		self.isSecureTextEntry = isSecureTextEntry
	}

}

extension UIButton {

	convenience init(
		type: UIButtonType = .system,
		title: String?,
		image: UIImage?) {
		
		self.init(type: type)

		self.setTitle(title, for: .normal)
		self.setImage(image, for: .normal)
	}

}
```

và LoginView sẽ gọn hơn:

```swift
import UIKit

protocol LoginViewDelegate: class {
	func loginView(_ view: LoginView, didTapLoginButton button: UIButton)
}

class LoginView: View {
    
	weak var delegate: LoginViewDelegate?

	var emailAddress: String {
		return emailTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
	}

	var password: String {
		return passwordTextField.text ?? ""
	}

	private lazy var emailTextField: UITextField = {
		return UITextField(placeholder: "Email Address", keyboardType: .emailAddress)
	}()

	private lazy var passwordTextField: UITextField = {
		return UITextField(placeholder: "Password", isSecureTextEntry: true)
	}()

	private lazy var loginButton: UIButton = {
		return UIButton(title: "Login", image: nil)
	}()

	override func setViews() {
		super.setViews()

		addSubview(emailTextField)
		addSubview(passwordTextField)
		addSubview(loginButton)
		loginButton.addTarget(self, action: #selector(didTapLoginButton(_:)), for: .touchUpInside)
	}

	override func layoutViews() {
		// layout your subviews here, consider using SnapKit, it is amazing!
	}

}
```

# Tổng kết
Như vậy sau ví dụ trên, chúng ta có thể đi tới kết luận các  như sau

1. Tách code layout, UI ra khỏi View Controller 

2. Đặt các toán tử private để đảm bảo code UI không bị truy cập từ các View Controller.
3. Tạo các class base UIView và UIViewController, đồng thời kết hợp generics và protocol, việc này sẽ làm cho viewDidLoad trở nên sạch sẽ và gọn gàng.
4. Cuối cùng là dùng các hàm convenience init để khởi tạo các UI element và set up các property của chúng.

Hy vọng là với ví dụ trên sẽ giúp các bạn tối ưu được code của mình và tận dụng được tối đa mô hình MVC rất tuyệt vời này.

Nguồn bài viết: https://medium.com/@omaralbeik/making-mvc-great-again-829ef9461ec2