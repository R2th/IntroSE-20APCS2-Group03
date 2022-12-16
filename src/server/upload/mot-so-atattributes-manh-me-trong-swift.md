> ##### Hiểu và học cách sử dụng các @Attribute đúng và hiệu quả hơn
### @escaping
Thường được sử dụng khi closure là tham số của function. Khi khai báo một optional closure như một property, mặc định nó đã được escaping.

```
class Service {
    var closure: @escaping (() -> Void)? //error: closure is already escaping in optional type argument
}
```

Escaping closure có thể được lưu trữ để sử dụng sau này:
```
class Service {

    var closure: (() -> Void)?

    func storageExample(with completion: @escaping (() -> Void)) {
        closure = completion // Stored for later use
    }
}
```
Hoặc nó có thể được thực thi sau khi function kết thúc:
```
class Service {
    func asyncExample(with completion: @escaping  (() -> Void)) {
        DispatchQueue.global().async { // Excute escaping closure ayncally
            completion()
        }
    }
}
view raw
```

### @unknown
@unkown được giới thiệu với @frozen và @nonfrozen enum. 1 non-frozen enum có thể tăng thêm các case mới sau này. Ví dụ, hiện tại UILayoutConstraintAxis chứa 2 trục:
```
enum UILayoutConstraintAxis: Int { 
  case UILayoutConstraintAxisHorizontal = 0
  case UILayoutConstraintAxisVertical = 1 
}
```
Nó có thể có thêm case axisZ sau này:
```
enum UILayoutConstraintAxis: Int { 
  case UILayoutConstraintAxisHorizontal = 0 
  case UILayoutConstraintAxisVertical = 1
  case UILayoutConstraintAxisZ = 2
}
```
Để tránh bị lỗi khi compile:
` error: switch must be exhaustive`

Chúng ta implement switch với thuộc tính @unknown:
```
switch axis {
case .UILayoutConstraintAxisHorizontal:
    print("")
case .UILayoutConstraintAxisVertical:
    print("")
@unknown default:
    print("")
}
```
### @propertyWrapper
Khi apply một property wrapper cho một property của 1 class, struct, hoặc enum, nó wrap quyền truy cập vào thuộc tính thông qua một instance của kiểu wrapper.

Wrapper phải difine 1 `wrapperValue`. Ví dụ dưới đây trims khoảng trắng và newline từ string:
```
@propertyWrapper
struct WhitespaceTrimmable {
    private(set) var value: String = ""

    var wrappedValue: String {
        get { value }
        set { value = newValue.trimmingCharacters(in: .whitespacesAndNewlines) }
    }

    init(wrappedValue: String) {
        self.wrappedValue = wrappedValue
    }
}
```
Để sử dụng:
```
struct Service {
    @WhitespaceTrimmable var title: String
}

let service = Service(title: "Title    ")
print(service.title) // Title
view raw
```
Property wrapper có thể chứa tham số làm giá trị mặc định:
```
struct Service {
    @WhitespaceTrimmable(wrappedValue: "Default title") var title: String
}

var service = Service()
print(service.title) // Default title
```
Để truy cập wrapped property trực tiếp, sử dụng _ như một prefix name:
```
struct Service {
    @WhitespaceTrimmable(wrappedValue: "Default title") var title: String

    func accessTitle() {
        print("title: \(_title)") //Default title
    }
}
```
### @available
Dùng để chỉ ra các dòng code chỉ available trong version swift hoặc os version cụ thể. Ví dụ, để sử dụng thành phần UICollectionView mà chỉ available trên iOS 13+:
```
public struct CollectionViewCellProvider {
    @available(iOS 13, *)
    public static func compositionalCell() {
        // compositional collection view cell
    }

    public static func collectionCell() {
        // collection view cell
    }
}
```
### @discardableResult
Dùng để bỏ qua result của function mà không bị complie warning.
```
class ParentViewController: UIViewController {
    override func viewDidLoad() {
        presentViewController() // Result of call to 'presentViewController' is unused
    }

    func presentViewController() -> UIViewController {
        return UIViewController()
    }
}
```
Để tắt warning này, sử dụng @discardableResult:
```
class ParentViewController: UIViewController {
    override func viewDidLoad() {
        presentViewController() // No Xcode complains!
    }

    @discardableResult
    func presentViewController() -> UIViewController {
        return UIViewController()
    }
}
```
### @UIApplicationMain
Đây có lẽ là 1 attribute được biết đến nhiều nhất, nó nằm trong `AppDelegate.swift` để chỉ ra main entry point của ứng dụng iOS.
```
@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
}
```
### Tổng kết
Swit tiếp tục thêm vào những @attribute trong những version khác nhau. Hiểu và sử dụng chúng đúng và hiệu quả có thể khiến code clean hơn và app performance tốt hơn.
Tất cả code ở trên có thể tìm thấy ở trong git repo này: [GitHub repo](https://gist.github.com/ericleiyang/14a335601f5046a02e73a0756318a4e9)

Nguồn tham khảo: [10 Powerful @Attributes in Swift](https://medium.com/better-programming/10-powerful-attributes-in-swift-d4e4153a0001)