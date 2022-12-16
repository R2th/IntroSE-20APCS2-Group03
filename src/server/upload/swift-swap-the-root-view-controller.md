## Môi trường phát triển: 
- **Swift Language Version:** Swift 5
- **Xcode:** Version 10.2.1 (10E1001)
- **Deployment Target:** 12.0


Hôm nay mình sẽ giới thiệu với anh em một cách đơn giản và thông dụng trong việc xử lý thao tác đăng nhập, đăng xuất giữa các màn hình trong App iOS. Đó chính là Swap the Root View Controller.
## Bước 1: Khởi tạo màn hình login / main
Lần lượt ta sẽ tạo 2 màn hình login và main như hình dưới đây:

![](https://images.viblo.asia/dd6bfe08-a358-43c7-aadf-3cc6dc1b76bc.png)
![](https://images.viblo.asia/f055f3d3-1311-4681-9bc4-4faeb3caf40d.png)

Tiếp theo ta khai báo **loginViewController** và **mainViewController** trong extension UIStoryboard:
```
extension UIStoryboard {
    static var main: UIStoryboard {
        return UIStoryboard(name: "Main", bundle: nil)
    }
}

extension UIStoryboard {
    var loginViewController: LoginViewController {
        guard let vc = UIStoryboard.main.instantiateViewController(withIdentifier: "LoginViewController") as? LoginViewController else {
            fatalError("LoginViewController couldn't be found in Storyboard file")
        }
        return vc
    }
    
    var mainViewController: MainViewController {
        guard let vc = UIStoryboard.main.instantiateViewController(withIdentifier: "MainViewController") as? MainViewController else {
            fatalError("MainViewController couldn't be found in Storyboard file")
        }
        return vc
    }
}
```

## Bước 2: Tạo singleton App class
Ở đây ta sử dụng **UserDefaults** để lưu giá trị bool với mục đích check việc đăng nhập / đăng xuất của user.
```
final class App {
    
    static var shared = App()
    
    var window: UIWindow!
    var mainNavigationController: UINavigationController!
    var loginViewController: UIViewController!
    
    func startInterface() {
        // MARK: Initial MainNavigationController and MainViewController
        mainNavigationController = UINavigationController()
        mainNavigationController.viewControllers = [mainViewController]
        let mainViewController = UIStoryboard.main.mainViewController
   
        // MARK: Initial LoginViewController
        loginViewController = UIStoryboard.main.loginViewController
        
        if UserDefaults.standard.bool(forKey: "LOGGED_IN") { // check whether user logged or not
            window.rootViewController = mainNavigationController
        } else {
            window.rootViewController = loginViewController
        }
        
        window.makeKeyAndVisible()
    }
}
```

## Bước 3: Khởi tạo hàm switchBackToLogin() và switchLoginToMain()
Hàm **switchBackToLogin()** thay đổi rootViewController = loginViewController khi user nhấn nút đăng xuất ở màn MainViewController.
```
func swipeBackToLogin() {
    let snapShot = window.snapshotView(afterScreenUpdates: true)
    if let snapShot = snapShot {
        loginViewController.view.addSubview(snapShot)
    }
    window.rootViewController = loginViewController

    UIView.animate(withDuration: 0.3, animations: {
        snapShot?.layer.opacity = 0
        snapShot?.layer.transform = CATransform3DMakeScale(1, 1, 1)
    }) { finished in
        snapShot?.removeFromSuperview()
    }
}
```

Hàm **switchLoginToMain()** thay đổi rootViewController = mainNavigationController khi user nhấn nút đăng nhập ở màn loginViewController.
```
func swipeLoginToMain() {
    let snapShot = window.snapshotView(afterScreenUpdates: true)
    if let snapShot = snapShot {
        mainNavigationController.view.addSubview(snapShot)
    }
    window.rootViewController = mainNavigationController

    UIView.animate(withDuration: 0.3, animations: {
        snapShot?.layer.opacity = 0
        snapShot?.layer.transform = CATransform3DMakeScale(1, 1, 1)
    }) { finished in
        snapShot?.removeFromSuperview()
    }
}
```

## Bước 4: Hoàn tất
Trong **AppDelegate.cs**, ta gán App.shared.window = window và gọi func **startInterface()** trong singleton App.
```
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    window = UIWindow(frame: UIScreen.main.bounds)

    if let window = window {
        App.shared.window = window
        App.shared.startInterface()
    }
    return true
}
```

Trong **LoginViewController**, ta set giá trị bool trong UserDefaults là true khi user nhấn nút đăng nhập và gọi hàm **switchLoginToMain()** để màn hình chuyển sang **MainViewController**.
```
final class LoginViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    @IBAction func handleLoginButtonTapped(_ sender: Any) {
        UserDefaults.standard.set(true, forKey: "LOGGED_IN")
        App.shared.switchLoginToMain()
    }
}
```

Trong **MainViewController**, ta set giá trị bool trong UserDefaults là false khi user nhấn nút đăng xuất và gọi hàm **switchBackToLogin()** để quay trở về màn hình **LoginViewController**.
```
final class MainViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        navigationItem.title = "Main"
    }

    @IBAction func handleLogoutButtonTapped(_ sender: Any) {
        UserDefaults.standard.set(false, forKey: "LOGGED_IN")
        App.shared.switchBackToLogin()
    }
}
```

và đây là kết quả: 
![](https://images.viblo.asia/0f634b39-9618-41d4-9384-423273970ce9.gif)