## Definition
Factory Method pattern là một creational design pattern , trừu tượng hóa quá trình khởi tạo. Mô hình sáng tạo kiểm soát ai tạo ra một đối tượng và cái gì , như thế nào , khi nào nó được tạo.

**The ‘Factory Method’ pattern  xác định interface để tạo đối tượng và ủy quyền việc tạo đối tượng cho các lớp con.**

### When should we use this pattern?

**Cung cấp interface để tạo đối tượng**

Pattern này nên được sử dụng khi chúng ta có nhiều đối tượng khác nhau mà chúng ta sử dụng theo những cách khác nhau. Khởi tạo của họ có thể phức tạp và cần tính toán để tạo ra chúng. The ‘Factory Method’ pattern đóng gói các phần khởi tạo của chúng để đơn giản hóa các sáng tạo của chúng trên các địa điểm.

**Xác định một nơi duy nhất để khởi tạo**
Pattern này nên được sử dụng khi một lớp không thể lường trước được loại đối tượng mà nó cần tạo. Nếu chúng ta có một đối tượng đã làm những gì chúng ta cần, chúng ta phải sử dụng lại và khởi tạo nó ở đâu đó trong mã. Di chuyển các tức thời này, từ lớp máy khách sang một giao diện, làm cho lớp phụ thuộc vào sự trừu tượng hóa và không làm cho nó phụ thuộc vào các thành phần cấp thấp (Nguyên tắc đảo ngược phụ thuộc). Interface này, được gọi là phương thức nhà máy, có logic để xác định loại đối tượng chúng ta cần khởi tạo. Hơn nữa, việc ủy thác logic tạo cho một lớp con sẽ tránh việc sao chép mã và cung cấp một nơi duy nhất để bảo trì.

**Để tách riêng việc thực hiện một đối tượng khỏi việc sử dụng nó**

Pattern này nên được sử dụng khi logic tạo và khởi tạo được thực hiện bởi máy khách. Một máy khách được liên kết chặt chẽ với một đối tượng nếu loại của nó được sử dụng trong lớp của nó. Bằng cách di chuyển logic và khởi tạo các đối tượng trong một lớp con, chúng tôi bảo vệ mã khỏi các thay đổi API. Nếu một số sửa đổi được thêm vào một lớp cụ thể và API của nó, mã máy khách sẽ không bị ảnh hưởng bởi những thay đổi mà nó không quan tâm. Bằng cách triển khai một giao diện, phương thức xuất xưởng trả về một sự trừu tượng hơn là một kiểu cụ thể để chúng tôi bảo vệ mã khỏi các chi tiết triển khai.

### How should we use this pattern?

Hãy bắt đầu với một cách tiếp cận phổ biến của mô hình này. Trong ví dụ này, chúng ta đang làm việc trên một ứng dụng di động và chúng tôi muốn tạo một phương thức factory method chịu trách nhiệm tạo các thành phần UI.

 ```swift 
 class ComponentFactory {
    private init() {}
    static func createView(component: ComponentType) -> UIView {       
        switch component {
        case .textfield:
            let textfield = UITextField()
            // textfield customatization...
            return textfield
        case .switch:
            let `switch` = UISwitch()
            // `switch` customatization...
            return `switch`
        case .button:
            let button = UIButton()
            // button customatization...
            return button
        case .label:
            let label = UILabel()
            // label customatization...
            return label
        case .image:
            let image = UIImageView()
            // image customatization...
            return image
        }
    }
}
```
 
### Implementation

**Factory Method**
 ```swift 
    protocol ComponentFactory {
    func createView(component: ComponentType) -> UIView
}

class DisneyComponentFactory: ComponentFactory {
    func createView(component: ComponentType) -> UIView {
        switch component {
        case .textfield: return DisneyTextField()
        case .switch: return DisneySwitch()
        case .button: return DisneyButton()
        case .label: return DisneyLabel()
        case .image: return DisneyImageView()
        }
    }
}
 ```
 
**Run code in a Playground**

 ```swift 
 
 // ‼️ This online playground is platform agnostic, so we need to declare a UIView interface and its subclasses.
protocol UIView {}
class UITextField: UIView {}
class UISwitch: UIView {}
class UIButton: UIView {}
class UILabel: UIView {}
class UIImageView: UIView {}
class DisneyTextField: UITextField {}
class DisneySwitch: UISwitch {}
class DisneyButton: UIButton {}
class DisneyLabel: UILabel {}
class DisneyImageView: UIImageView {}
enum ComponentType {
    case textfield
    case `switch`
    case button
    case label
    case image
}
protocol ComponentFactory {
    func createView(component: ComponentType) -> UIView
}
class DisneyComponentFactory: ComponentFactory {
    func createView(component: ComponentType) -> UIView {
        switch component {
        case .textfield:
            print("DisneyTextField created")
            return DisneyTextField()
        case .switch:
            print("DisneySwitch created")
            return DisneySwitch()
        case .button:
            print("DisneyButton created")
            return DisneyButton()
        case .label:
            print("DisneyLabel created")
            return DisneyLabel()
        case .image:
            print("DisneyImageView created")
            return DisneyImageView()
        }
    }
}
// Client
let disneyFactory = DisneyComponentFactory()
disneyFactory.createView(component: .label)

 
  ```