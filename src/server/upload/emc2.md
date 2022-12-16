###### Năm 1905 một định luật vật lý kinh điển được Enstein giới thiệu và được cả thế giới công nhận sau đó: e=mc^2. Hơn một thế kỉ sau, có lẻ ở nơi tiên cảnh Enstein cũng không thể ngờ được rằng định lý của mình lại một lần nửa chính xác trong ngành công nghiệp IT đầy "cạm bẫy" hiện nay (lol).
 ![alt](https://image.ibb.co/dEXB5T/Screen_Shot_2018_06_24_at_9_34_39_PM.png)
# error = more * code^2
 ###### Có một sự thật là càng nhiều code thì nguy cơ xảy ra bugs trong ứng dụng càng lớn, ngoài ra nó còn gây khó khăn trong việc testing và maintenance sau này . Một trong những nguyên nhân chính dẫn đến dư thừa code mà mình thường mắc phải lúc mới tiếp cận với iOS đó là việc viết nhiều code cùng chức năng cùng nhiều vụ ở nhiều component khác nhau. Sau đây mình xin giới thiệu một số cách giúp code gọn gàn hơn, loại bỏ những đoạn code dư thừa hay gặp trong ứng dụng iOS.

## TableView
###### Trong các ứng dụng iOS, TableView là một trong những UI được sử dụng phổ biến nhất và khi làm việc với tableView thì chúng ta thường gặp các đoạn code như sau: 
```swift
 let nib = UINib.init(nibName: "TestCell", bundle: nil)
 tableView.register(nib, forCellReuseIdentifier: TestCell)
      
 guard let cell = tableView.dequeueReusableCell(withIdentifier: "TestCell", for: indexPath) as? TestCell else {
   return UITableViewCell()
 }
```
Chúng ta có thể làm gọn đọan code trên bằng cách sử dụng Protocol và Generic như sau:
```swift
protocol TableViewCellProtocol {
  static func getIdentifier() -> String
  static func getNib() -> UINib
}

extension TableViewCellProtocol  where Self: UIView {
  static func getIdentifier() -> String {
    return String(describing: self)
  }
  static func getNib() -> UINib {
    return UINib(nibName: self.getIdentifier(), bundle: nil)
  }
}

extension UITableView: TableViewCellProtocol {
  func register<T:TableViewCellProtocol>(type: T.Type) {
    self.register(T.getNib(), forCellReuseIdentifier: T.getIdentifier())
  }

  func dequeueCell<T:TableViewCellProtocol>(type: T.Type,indexPath: IndexPath) -> T {
    guard let cell = self.dequeueReusableCell(withIdentifier: T.getIdentifier(), for: indexPath) as? T else { return UITableView()
    }
    return cell
  }
 }
```

###### Bây giờ khi muốn register hay dequeue TableViewCell ta chỉ cần:
```swift
tableView.register(type: TestCell.self)
tableView.dequeueCell(for: indexPath, cellType: TestCell.self)
```
###### **Lưu ý :** với cách trên thì chúng ta phải define cell identifier củng như UINib trùng với tên với className của TableViewCell.
## Init ViewController
###### Khi muốn init 1 ViewController từ Storyboard ta thường dùng:
```swift
let storyBoard = UIStoryboard(name: "Register", bundle: nil)
let register1 = storyBoard.instantiateViewController(withIdentifier: "Register1ViewController") as!  Register1ViewController
```
###### Ta có thể tạo một enum cho các Storyboard và dùng generic để init ViewController:
```swift
enum StoryBoard: String {
  case Main
  case Register
  ...
  var name: String {
    return rawValue
  }
}

extension UIViewController {
  static func initFrom(storyboard : StoryBoard) -> Self? {
    func instanceFromNib<T: UIViewController>() -> T? {
      let storyBoard = UIStoryboard(name: storyboard.name, bundle: nil)
      return storyBoard.instantiateViewController(withIdentifier: "\(self)") as? T
    }
    return instanceFromNib()
  }
}
```

###### Bây giờ ta chỉ cần:
```swift
let register1 = Register1ViewController.initFrom(storyboard: .Register)
```
## UserDefaults
###### Tương tự với init ViewController ta tạo một enum chứa các UserDefaults Key:
```swift
enum UserDefaultsKey: String {
  case isLoggin
  ...
}

extension UserDefaults {
  static func set(_ value: Bool,forKey key: UserDefaultsKey) {
      let key = key.rawValue
      UserDefaults.standard.set(value, forKey: key)
  }

  static func bool(forKey key: UserDefaultsKey) -> Bool {
    let key = key.rawValue
    return UserDefaults.standard.bool(forKey: key)
  }
}
```
###### Bây giờ chỉ cần:
```swift
UserDefaults.set(true, forKey: .isLoggin)

UserDefaults.bool(forKey: .isLoggin)
```
###### Chúng ta có thể dùng getter setter để làm việc với UserDefault :
```swift
var isLoggin: Bool {
    get {
        return UserDefaults.bool(forKey: .isLoggin)
    }
    set {
        UserDefaults.set(newValue, forKey: .isLoggin)
    }
}
```
## Optional
###### Nếu bạn đã chán dùng như này:
```swift
var a: Int? = nil
let b = a ?? 0
```
###### có thể dùng:
```swift
extension Optional {
  func or(_ defaultValue: Wrapped) -> Wrapped {
    return self ?? defaultValue
  }
}

let b = a.or(0)
```
###### Nếu không muốn dùng if let hoặc guard let:
```swift
extension Optional {
  func then(_ completionHandle: (Wrapped) -> Void) {
    switch self {
    case .some(let wrappedValue):
      return completionHandle(wrappedValue)
    case .none: break
    }
  }
}

var phoneNumber: String? = "113"
phoneNumber.then { self.phoneLabel.text = $0 }
```
self.phoneLabel.tex sẽ được execute khi phoneNumber khác nil.
# Kết
###### Trên đây là một số cách giúp loại bỏ một số code dư thừa mình hay gặp. Ngoài ra còn có một số thư viện mình hay dùng để viết code rõ ràng, ngắn gọn hơn:
[Then](https://github.com/devxoul/Then)

[Reusable](https://github.com/AliSoftware/Reusable)

Hi vọng bài viết sẽ có ích với các bạn.