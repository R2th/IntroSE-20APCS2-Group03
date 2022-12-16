# Mở đầu:

-----


Ở bài viết này, chúng ta sẽ tìm hiểu về **RxCocoa**. Để thuận tiện cho việc tìm hiểu, các bạn có thể theo dõi bài viết trước đó để có thể nắm được các đặc điểm của **Trait** và **Side Effect** [tại đây](https://viblo.asia/p/rxswift-trait-trong-rxswift-single-completable-maybe-L4x5xk2mlBM).

# I. Giới thiệu:

-----


- **RxCocoa** là một thư viện được xây dựng trên nền tảng là **RxSwift** và nó cũng chính là một phần của **RxSwift**.
- **RxCocoa** thêm các phần mở rộng (extension) vào các thành phần UI của iOS giúp cho chúng ta có thể subscribe để lắng nghe các sự kiện đến từ UI.

Ví dụ: Để lắng nghe sự kiện ON/OFF từ một UISwicth, chúng ta có thể subscribe thông qua phần mở rộng được cung cấp từ RxCocoa đó là `.rx.isOn`.

![](https://images.viblo.asia/14cfc884-3c41-4f2b-9c5f-2a267c948ebb.png)
```swift
toggleSwitch.rx.isOn
  .subscribe(onNext: { enabled in
    print( enabled ? "it's ON" : "it's OFF" )
  }
```

**RxCocoa** bao gồm các thành phần chính:
- Driver.
- ControlProperty.
- ControlEvent.

# II. Driver:

-----


**Driver** là một thành phần của **RxCocoa** và là một **Trait** được hoàn thành đầy đủ nhất. 
Do **Driver** là một **Observable** đặc biệt với những ràng buộc của **Trait** nên nó cũng sẽ mang những **đặc điểm** sau:
- **Không** tạo ra lỗi.
- **Observe** và **Subscribe** trên **Main Scheduler**.
- Có chia sẻ **Side Effect**.

**Driver hoạt động tương tự như Observable, ngoại trừ những điểm khác biệt:**
- **Observable** thì có thể thay đổi **Thread** tuỳ theo cách thực thi của nó. Ví dụ, khi gọi API thì sẽ bị đẩy xuống Background Thread
- **Driver** luôn thục hiện trên **Main Thread** và không emit ra Error nên thích hợp làm việc với UI.

# III. ControlEvent:

-----


- **ControlEvent** là một phần của **Observable**/**ObservableType**. Nó đại diện cho các sự kiện của các thành phần UI.
- **ControlEvent** cho phép chúng ta lắng nghe những sự kiện thay đổi tới từ các **UIComponent** ví dụ như UIButton được bấm, UITextField được nhập text từ người dùng,...
- Do có thể theo dõi và nhận các sự kiện của **UIComponent** thông qua **ControlEvent** nên chúng ta có thể không cần tạo các **IBAction** trong source code mà vẫn có thể handle được các sự kiện đến từ UI. Điều đó giúp cho source code trở nên gọn hơn và dễ dàng bảo trì.

Ví dụ về ControlEvent của UIButton:
```swift
import UIKit
import RxSwift
import RxCocoa

class ViewController: UIViewController {
    @IBOutlet weak var blueButton: UIButton!
    
    let disposeBag = DisposeBag()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        blueButton.rx.tap.asDriver()
            .drive(onNext: { _ in
                print("Button tap !")
            })
            .disposed(by: disposeBag)
    }
}
```
```
Button tap !
Button tap !
Button tap !
Button tap !
Button tap !
```

# IV. ControlProperty:

-----


- **ControlProperty** là một phần của **Observable**/**ObservableType**. Nó đại diện cho các **property** của các thành phần UI.
- **ControlProperty** giúp chúng ta có thể thay đổi giá trị của một **property** trong UIComponent.
- Các **ControlPeroperty** của các thành phần giao diện hầu hết đã được cung cấp bởi RxCocoa.

Ví dụ về ControlProperty của UISegment:
```swift
import UIKit
import RxSwift
import RxCocoa

class ViewController: UIViewController {
    @IBOutlet weak var greenSwitch: UISwitch! // default is ON
    @IBOutlet weak var blueButton: UIButton!
    
    let disposeBag = DisposeBag()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        blueButton.rx.tap.asDriver()
            .map { _ in
                return false
            }
            .drive(greenSwitch.rx.isOn) // change UISwicth's state to OFF
            .disposed(by: disposeBag)
    }
}
```
- Trong ví dụ, `greenSwitch` có trạng thái mặc định là ON, tức là thuộc tính `isOn` của UISwicth có giá trị mặc định là `true`. 
- Sau khi được bấm , `blueButton` sẽ phát ra một element có kiểu dữ liệu là `Void`, sau đó operator `.map` giúp chúng ta biến đổi giá trị của element từ kiểu `Void` thành kiểu `Bool` với giá trị là `false`. 
- ControlProperty giúp chúng ta set giá trị mới là `false` cho property `isOn` của `greenSwicth`. Điều đó giúp `greenSwicth` thay đổi trạng thái từ ON -> OFF.

# V. BindingProperty:

-----


Ngoài việc sử dụng các ControlProperty, chúng ta có thể tạo các BindingProperty để binding dữ liệu.
```swift
// tạo một binding property cho UISwict nằm trong extention của Reactive
extension Reactive where Base: UISwitch {
    var customSwitchBinding: Binder<Bool> {
        return Binder(base) { mySwitch, newState in
            mySwitch.isOn = newState
            print("State has been changed !")
        }
    }
}
```
```swift
import UIKit
import RxSwift
import RxCocoa

class ViewController: UIViewController {
    @IBOutlet weak var greenSwitch: UISwitch!
    @IBOutlet weak var blueButton: UIButton!
    
    let disposeBag = DisposeBag()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        blueButton.rx.tap.asDriver()
            .map { _ in
                return false
            }
            .drive(greenSwitch.rx.customSwitchBinding) // Sử dụng binding property
            .disposed(by: disposeBag)
        
    }
}
```
```
State has been changed !
```

# Tài liệu tham khảo:

-----


- RxSwift - Reactive Programming with Swift v2.0
- https://github.com/ReactiveX/RxSwift/blob/master/Documentation/Traits.md
- http://cocoadocs.org/docsets/RxCocoa/3.2.0/RxCocoa/CocoaUnits.html#/s:V7RxCocoa12ControlEvent