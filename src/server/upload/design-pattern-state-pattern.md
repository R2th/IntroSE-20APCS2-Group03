# I. Giới thiệu:

-----


**State Pattern** là một design pattern thuộc loại **Behavior**. Nó cho phép một đối tượng (object) có thể thay đổi **hành vi** hoặc **trạng thái** của mình trong lúc nó **đang hoạt động** (run time). Nó cho phép mô tả hành động cụ thể của một object tại một thời điểm nhất định.
**State Pattern** gồm các thành phần chính:

![](https://images.viblo.asia/7fea7b3a-5f9f-4c0c-b469-d792c79746ab.png)

- **Context**: là object có chứa trạng thái hoặc hành vi thay đổi.
- **State Protocol**: là protocol được sử dụng để liệt kê và khai báo các property và function cần thiết của State. Bằng cách này, chúng ta có thể xác định được các thuộc tính và các hàm cần phải có trong các Concrete State.
- **Concrete State**: là các object conform State Protocol. Concrete sẽ lưu trữ trạng thái của Context. Có thể có nhiều Concrete State, mỗi Concrete State sẽ đại diện cho một trạng thái của Context.

# II. Cách thức hoạt động:

-----


- Trong **State Pattern**, Context sẽ được khởi tạo cùng với trạng thái mặc định của nó.
- Mỗi khi trạng thái của **Context** thay đổi, nó sẽ lưu lại trạng thái **mới** thay cho trạng thái **cũ**; đồng thời sẽ xử lý các tác cụ theo trạng thái mới của nó. Điều đó có nghĩa là hoạt động của **Context** sẽ thay đổi tùy thuộc theo trạng thái của mình.

![](https://images.viblo.asia/e3b271aa-c3ce-4a02-88c7-90c48b89e4cb.png)

# III. State Pattern được sử dụng khi nào?

-----


- **State Pattern** thường được dùng trong các hệ thống **có nhiều trạng thái** khác nhau và **thay đổi trong suốt quá trình hoạt động**. Số lượng các trạng thái (state) có thể bị giới hạn số lượng hoặc không giới hạn số lượng. Ví dụ, đèn giao thông sẽ có 3 trạng thái là "đỏ", "vàng", "xanh" thay đổi liên tục trong suốt quá trình hoạt động của nó.
- Ngoài ra, **State Pattern** còn được sử dụng để giảm thiểu việc sử dụng các câu lệnh **if-else** lồng nhau một cách phức tạp.

# IV. Ví dụ:

-----


Để hiểu hơn về **State Pattern**, chúng ta sẽ làm một ví dụ nho nhỏ trong **iOS** sử dụng State Pattern để thay đổi trạng thái khi **Device** thay đổi **Orientation**.

Theo cấu trúc, trước tiên chúng ta sẽ khởi tạo StateProtocol. Trong mỗi State, chúng ta sẽ cần lưu lại Context của nó, cụ thể ở đây là `OrientationContext`.
```swift
protocol OrientationState: class {
    var context: OrientationContext? { get set }
    func changeToPortrait()
    func changeToLanscape()
}

extension OrientationState {
    
    func updateContext(by context: OrientationContext) {
        self.context = context
    }
}
```

Tiếp theo, chúng ta sẽ tạo Context. Trong Context, chúng ta cần lưu lại state hiện tại của nó. Ngoài ra, chúng ta cần phải viết hàm chuyển đổi trạng thái cho context, cụ thể trong ví dụ là `func transitionTo(_ state:)`.
```swift
class OrientationContext {
    private var state: OrientationState
    
    init(state: OrientationState) {
        self.state = state
        self.transitionTo(state)
    }
    
    func transitionTo(_ state: OrientationState) {
        print("Context: Transition to " + String(describing: state))
        self.state = state
        self.state.updateContext(by: self)
    }
    
    func changeToPortrait() {
        state.changeToPortrait()
    }
    
    func changeToLanscape() {
        state.changeToLanscape()
    }
}
```

Chúng ta sẽ định nghĩa những State cụ thể  của Context. Vì Orientation của Device có 2 trạng thái là Portrait (chiều dọc) và Landscape (chiều ngang) nên chúng ta sẽ định nghĩa State cho 2 trạng thái này. Landscape state có thể chuyển đổi thành Portrait state, và Portrait state cũng có thể chuyển đổi thành Landscape state.
```swift
class PortraitOrientationState: OrientationState {
    weak var context: OrientationContext?
    
    func changeToPortrait() {
        print("Current orientation is Portrait")
    }
    
    func changeToLanscape() {
        context?.transitionTo(LandscapeOrientationState())
    }
}

class LandscapeOrientationState: OrientationState {
    weak var context: OrientationContext?
    
    func changeToPortrait() {
        context?.transitionTo(PortraitOrientationState())
    }
    
    func changeToLanscape() {
        print("Current orientation is Landscape")
    }
}
```

Sử dụng Context trong ViewController
```swift
class ViewController: UIViewController {
    
    var context: OrientationContext = OrientationContext(state: PortraitOrientationState())

    override func viewDidLoad() {
        super.viewDidLoad()
        
        NotificationCenter.default.addObserver(self, selector: #selector(rotated),
                                               name: UIDevice.orientationDidChangeNotification,
                                               object: nil)
    }
    
    deinit {
        NotificationCenter.default.removeObserver(self,
                                                  name: UIDevice.orientationDidChangeNotification,
                                                  object: nil)
    }
    
    @objc func rotated() {
        if UIDevice.current.orientation.isLandscape {
            context.changeToLanscape()
        } else {
            context.changeToPortrait()
        }
    }
}
```

Build project, sau đó xoay device vài vòng chúng ta có thể quan sát kết quả trên console log của Xcode
```
Context: Transition to StatePattern.PortraitOrientationState
Context: Transition to StatePattern.LandscapeOrientationState
Context: Transition to StatePattern.PortraitOrientationState
Context: Transition to StatePattern.LandscapeOrientationState
Context: Transition to StatePattern.PortraitOrientationState
```

# VI. Tài liệu tham khảo:

-----


- Design Pattern by Tutorials - Raywenderlich
- State Pattern by [refactoring.guru](https://refactoring.guru/design-patterns/state)