# 1. Giới thiệu
Tại sự kiện WWDC 2019 vừa qua của Apple, họ đã giới thiệu với chúng ta hệ điều hành iOS 13 với chế độ DarkMode toàn hệ thống, với việc các điện thoại cao cấp của Apple hiện nay đều sử dụng màn hình OLED, việc hệ điều hành iOS có chế độ DarkMode sẽ giúp giảm đáng kể lượng tiêu thụ pin của thiết bị và việc sử dụng chế độ DarkMode sẽ giúp cho đỡ hại mắt của chúng ta hơn, đặc biệt khi sử dụng điện thoại vào ban đêm. Vậy còn các ứng dụng bên thứ 3, chúng ta có cần phải có DarkMode cho đồng bộ với hệ điều hành hay không? Theo tôi nghĩ điều này là cần thiết, và trong bài viết này tôi sẽ giới thiệu đến các bạn cách thức để xây dựng một ứng dụng có thể switch giữa Dark và Light Mode sử dụng thư viện [RxTheme](https://github.com/RxSwiftCommunity/RxTheme).

![](https://images.viblo.asia/17f06b5d-3c54-4461-807b-66e118df995a.png)  ![](https://images.viblo.asia/30d70189-afe7-46dc-bfdd-c54ca73c1038.png)

# 2. Xây dựng ứng dụng demo
Trong bài viết này tôi sẽ cùng các bạn thực hiện một ứng dụng demo: 

    1. Ứng dụng có 2 theme là Dark và Light
    
    2. Khi bấm vào Switch thì sẽ thực hiện việc thay đổi theme
    
    3. Thay đổi các thành phần trong theme như: Navigationbar, background, Button, Switch
    
![](https://images.viblo.asia/2b95ac73-fbf9-41aa-828b-1a7aa2f7b61a.png)    ![](https://images.viblo.asia/4f2069c1-2cce-4b36-91a7-dee316fee7b5.png)

Việc đầu tiên là chúng ta sẽ khởi tạo project, ở đây tôi gọi tên project là DarkModeDemo, tiếp theo ta add *pod 'RxTheme'* vào trong Podfile của chúng ta và install nó.

## Config Theme Manager
Chúng ta tạo ra một file đặt tên là ThemeManager:
```
protocol Theme {
    var backgroundColor: UIColor { get }
    var textColor: UIColor { get }
    var onTintColor: UIColor { get }
}

struct LightTheme: Theme {
    let backgroundColor = UIColor.white
    let textColor = UIColor.black
    let onTintColor = UIColor.white
}

struct DarkTheme: Theme {
    let backgroundColor = UIColor.black
    let textColor = UIColor.white
    let onTintColor = UIColor.red
}

enum ThemeType: ThemeProvider {
    case light, dark
    var associatedObject: Theme {
        switch self {
        case .light: return LightTheme()
        case .dark: return DarkTheme()
        }
    }
}

let themeService = ThemeType.service(initial: .dark)

public extension Reactive where Base: UISwitch { // Binder cho UISwitch
    var onTintColor: Binder<UIColor?> {
        return Binder(self.base) { view, attr in
            view.onTintColor = attr
        }
    }
}
```

Chúng ta thực hiện config Theme bao gồm Dark và Light, trong ví dụ này ta sẽ có 3 tham số *backgroundColor, textColor, onTintColor*, còn trong ứng dụng của các bạn, các bạn có thể thêm những tham số cần thiết cho việc config nhé.

## Xử lý việc update theme
Trong ViewController, các bạn thực hiện việc setup theme cho các control:

```
class ViewController: UIViewController {
    let disposeBag = DisposeBag()
    
    @IBOutlet weak var themeSwitch: UISwitch!
    @IBOutlet weak var button: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Update navigationBar Theme
        if let navigationBar = navigationController?.navigationBar {
            themeService.rx
                .bind({ $0.backgroundColor }, to: navigationBar.rx.barTintColor)
                .bind({ $0.backgroundColor }, to: navigationBar.rx.tintColor)
                .bind({ [NSAttributedString.Key.foregroundColor: $0.textColor] }, to: navigationBar.rx.titleTextAttributes)
                .disposed(by: disposeBag)
        }
        
        // Update background Theme
        themeService.rx
            .bind({ $0.backgroundColor }, to: view.rx.backgroundColor)
            .disposed(by: disposeBag)
        
        // Update Switch Theme
        themeService.rx
            .bind({ $0.onTintColor }, to: [themeSwitch.rx.onTintColor])
            .disposed(by: disposeBag)
        
        // Update Button Theme
        button.layer.borderWidth = 1.0
        
        themeService.rx
            .bind({ $0.backgroundColor }, to: button.rx.backgroundColor)
            .bind({ $0.textColor }, to: button.rx.titleColor(for: .normal))
            .bind({ $0.textColor.cgColor }, to: button.layer.rx.borderColor)
            .disposed(by: disposeBag)
        
        // Handle change your theme
        themeSwitch.rx.controlEvent(UIControl.Event.allEvents)
            .withLatestFrom(themeService.typeStream)
            .map { $0 == .dark ? .light : .dark }
            .bind(to: themeService.switcher)
            .disposed(by: disposeBag)
    }
}
```

Chạy ứng dụng, các bạn sẽ được kết quả như bên trên, khá đơn giản phải không nào.

# Kết luận
Trên đây tôi đã giới thiệu đến các bạn cách để thực hiện việc update Theme cho ứng dụng iOS sử dụng [RxTheme](https://github.com/RxSwiftCommunity/RxTheme).
Chúng ta không phải là Apple hay Google, chúng ta đang đi cùng họ, vậy nên khi họ thay đổi thì chúng ta ắt hẳn cũng phải thay đổi cùng để tồn tại :v: 

Cám ơn các bạn đã đọc bài viết!

[Demo](https://github.com/anhnc55/DarkModeDemo)