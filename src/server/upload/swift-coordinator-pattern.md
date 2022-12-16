Chào các bạn.

Khi viết một app thì các bạn thường quản lý screen flow như thế nào.

### Bối cảnh
Trong hầu hết các trường hợp với các bạn mới như mình thì sẽ làm kiểu push ViewController từ naviationController như sau:
```swift
extension ViewController: UICollectionViewDelegate {
//Ví dụ tap vào 1 cell để chuyển ViewController
//và truyền data sang ViewController đó.
    func collectionView(_ collectionView: UICollectionView,
                        didSelectItemAt indexPath: IndexPath) {
        let object = objects[indexPath.item]
        let nextVC = NextViewController(object: object)
        navigationController?.pushViewController(nextVC, animated: true)
    }
```

Tất nhiên là mọi thứ vẫn chạy tốt, 2 ViewController Vẫn liên lạc được với nhau. Và đó không phải là vấn đề quá to tát với trường hợp di chuyển qua lại 1:1 ViewController. Vậy nếu gặp trường hợp 1 ViewController có thể push, pop qua lại với nhiều ViewController khác thì rất có thể logic xử lý sẽ bị phình to.

Đó chính là lý do Coordinator ra đời nhằm quản lý flow giữa các ViewController.
### Coordinator là gì
Nó là một object xử lý navigation flow, chung chuyển Data giữa các ViewController và không có liên quan gì đến business logic.
### Tại sao nên dùng Coordinator
Coordinataor giúp giảm gánh nặng cho ViewController. Vì Coordinator là một module riêng nên có tính reusable.
### Demo
 Mình Bắt đầu với demo đơn giản nhé.
 
 App khởi động với màn hình login như hình bên dưới. Trong màn hình có 3 button Login, Signup, Forgot Password.
 
 Các ViewController sẽ được push khi ấn vào mỗi button tương ứng.
![](https://images.viblo.asia/644ec0fe-a813-4512-af47-3d00dcd56a74.png)

#### Bắt đầu
##### AppCoordinator
Mỗi một ViewController sẽ có một coordinator quản lý. Khi coordinator được gọi thì viewController tương ứng cũng sẽ được push.

Tất cả các coordinator sẽ phải conform Protocol Coordinator dưới.
```swift
protocol Coordinator {
    func start()
}
```

Đầu tiên mình tạo AppCoordinator tương ứng với coordinator gốc khi khởi động app.
```swift
class AppCoordinator: Coordinator {
    
    //window được lấy từ AppDelegate.(code bên dưới)
    private let window: UIWindow
    
    //Vì màn hình đầu tiên bắt gặp khi khởi động app là màn login
    //Nên cần khai báo coordinator của màn login.
    private var loginCoordinator: LoginCoordinator?
    private let navigationController: UINavigationController
    
    private let loginVC = LoginVC()
    
    init(window: UIWindow) {
        self.window = window
        let navigationController = UINavigationController()
        //Khi AppCoordinato được khởi tạo thì loginCoordinato cũng được khởi tạo 
        //vì đây là màn đầu tiên user được nhìn thấy.
        self.loginCoordinator = LoginCoordinator(navigator: navigationController)
        self.navigationController = navigationController
    }
    
    //set rootController là navigationController
    func start() {
        window.rootViewController = self.navigationController
        loginCoordinator?.start()
        window.makeKeyAndVisible()
    }
}
```

Sử dụng AppCoordinator trong AppDelegate như sau.
```swift
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        window = UIWindow(frame: UIScreen.main.bounds)
        //init appCoordinator với param window.
        let appCoordinator = AppCoordinator(window: window!)
        appCoordinator.start()
        
        return true
    }
}
```
###
##### LoginCoordinator 
Tương tự appCoordinator. LoginCoordinator cũng phải conform protocol Coordinator.

```swift
class LoginCoordinator: Coordinator {
   
    fileprivate let navigator: UINavigationController

    init(navigator: UINavigationController) {
        self.navigator = navigator
    }
    
    func start() {
        let loginVC = LoginVC()
        navigator.pushViewController(loginVC, animated: true)
    }
}
```
Sau khi function start() được gọi, navigationController sẽ push loginViewController.

Vì màn hình login có 3 button. ViewController sẽ được navigationController push sau khi ấn vào từng button tương ứng.
```swift
class LoginVC: UIViewController {
    
    let loginView = LoginView()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        addView()
        title = "Login"
    }
    
    
    private func addView() {
        //add loginView
    }
 
    @objc func didTapLogin(_ sender: UIButton) {
        navigationController?.pushViewController(HomeVC(), animated: true)
    }
    
    @objc func didTapSignup(_ sender: UIButton) {
        navigationController?.pushViewController(SignupVC(), animated: true)
    }
    
    @objc func didTapForgotPassword(_ sender: UIButton) {
        navigationController?.pushViewController(ForgotPasswordVC(), animated: true)
    }
}
```
#####
Tất nhiên là không ổn rồi. Vì mình đang sử dụng Coordinator để điều hướng nên công việc này phải được  LoginCoordinator xử lý.

Vậy LoginViewController sẽ liên lạc với LoginCoordinator kiểu gì ?

Trường hợp này mình sử dụng delegate. Và toàn bộ logic điều hướng sẽ được đưa vào LoginCoordinator như sau.
```swift
//Nhận tap event thông qua protocol này.
protocol LoginVCNavigationDelegate: class {
    func navigateHome()
    func navigateSignup()
    func navigateForgotPassword()
}

class LoginVC: UIViewController {
    
    let loginView = LoginView()
    var delegate: LoginVCNavigationDelegate?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        addView()
        title = "Login"
    }
    
    
    private func addView() {
        view.addSubview(loginView)
        loginView.loginBtn.addTarget(self, action: #selector(didTapLogin(_:)), for: .touchUpInside)
        loginView.signupBtn.addTarget(self, action: #selector(didTapSignup(_:)), for: .touchUpInside)
        loginView.forgotPasswordBtn.addTarget(self, action: #selector(didTapForgotPassword(_:)), for: .touchUpInside)
        loginView.backgroundColor = .white
        loginView.frame = view.frame
    }
 
    @objc func didTapLogin(_ sender: UIButton) {
        delegate?.navigateHome()
    }
    
    @objc func didTapSignup(_ sender: UIButton) {
        delegate?.navigateSignup()
    }
    
    @objc func didTapForgotPassword(_ sender: UIButton) {
        delegate?.navigateForgotPassword()
    }
}
```

Và delegate của LoginViewController được thực hiện tại LoginCoordinator như sau.
```swift
extension LoginCoordinator: LoginVCNavigationDelegate {
    
    func navigateHome() {
        let homeCoordinator = HomeCoordinator(navigator: navigator)
        self.homeCoordinator = homeCoordinator
    }

    func navigateSignup() {
        let signupVC = SignupVC()
        navigator.pushViewController(signupVC, animated: true)
    }

    func navigateForgotPassword() {
        let forgotPasswordVC = ForgotPasswordVC()
        navigator.pushViewController(forgotPasswordVC, animated: true)
    }
}
```

Và các bạn đừng quên uỷ thác LoginVCNavigationDelegate cho class này nhé.
```swift
class LoginCoordinator: Coordinator {
   ...
    func start() {
        let loginVC = LoginVC()
        loginVC.delegate = self //uỷ thác LoginVCNavigationDelegate cho LoginCoordinator.
        navigator.pushViewController(loginVC, animated: true)
    }
}
```

### Kết 
Mình vừa giới thiệu cách làm đơn giản nhất về Coordinator pattern. Tương tự với các viewController khác sẽ có các coordinator tương ứng để thực hiện nhiệm vụ điều hướng nha.

Source: https://github.com/nguyentienhoang810/SimpleCoordinatorDemo