MVC, một mô hình rất quen thuộc với bất kỳ một lập trình viên nào. Và trong mọi dự án thì luôn có một vấn đề cần giải quyết đó là pass data vào model .
Sau đây mình sẽ giới thiệu cách để pass data vào Controller sử dụng ngôn ngữ swift.
# Chuẩn bị
Đầu tiên các bạn tạo mới một project có 1 ViewController và DataModel.

```swift
class ViewController: UIViewController {
}

class DataModel {
}
```

# 1. Callback với Completion Handler
Tạo một void function trong DataModel với closure Completion có param là string.
```swift
class DataModel {
// Các thuộc tính được khai báo trong model và init

    func requestData(completion: ((_ data: String) -> Void)) {

    } 
}
```

Data sẽ được đưa vào completion.

```swift
class DataModel {
   func requestData(completion: ((data: String) -> Void)) {
      let data = "Data from wherever"
      completion(data)
   }
}
```

Sau đó thực hiện thao tác với data nhận được tại ViewController

```swift
class ViewController: UIViewController {

//Tạo một instance của DataModel()
   private let dataModel = DataModel()

   override func viewDidLoad() {
      super.viewDidLoad()

      //gọi func requestData đểl ấy Data nhận được
      //Chú ý thêm [weak self] để chống leak memory.
      dataModel.requestData { [weak self] (data: String) in

            //Sau đó làm gì thì làm với data đó \m/
            self?.useData(data: data)
      }

   }

   private func useData(data: String) {
       print(data)
   } 
}
```
Các bạn thử chạy đoạn code trên sẽ thấy đoạn string "Data from wherever" trong console log.

### 1-1. Sử dụng Callback như một thuộc tính của class
Tạo callback onDataUpdate trong DataModel.
```swift
class DataModel {
      var onDataUpdate: ((_ data: String) -> Void)?
}
```

Trong func requestData, thay vì sử dùng completion handler mình sử dụng callback vừa tạo như sau.
```swift
func dataRequest() {
      let data = "Data from wherever"
      onDataUpdate?(data)
}
```

Đưa callback đó vào ViewController.
```swift
class ViewController: UIViewController {

   private let dataModel = DataModel()

   override func viewDidLoad() {
      super.viewDidLoad()

      dataModel.onDataUpdate = { [weak self] (data: String) in
          self?.useData(data: data)
      }

      dataModel.requestData()
   }

   private func useData(data: String) {
       print(data)
   } 
}
```

Vậy cách viết ở 1.1 có lợi gì so với cách đầu tiên ?. Đó là mình có thể để callback làm nhiều việc khác nhau (onDataUpdate, onHTTPError, ...) và dễ quản lý callback hơn.

# 2 . Sử dụng Delegation
Đầu tiên tạo protocol cho DataModel như sau:
```swift
protocol DataModelDelegate: class {
    func didRecieveDataUpdate(data: String)
}
```

Tạo weak delegate trong DataModel
```erlang
weak var delegate: DataModelDelegate?
```

Sử dụng delegate tương tự như callback
```swift
class DataModel {
      weak var delegate: DataModelDelegate?
      func requestData() {
         let data = “Data from wherever”
         delegate?.didRecieveDataUpdate(data: data)
      }
}
```

Tương tự như trên, tạo một instance của DataModel trong ViewController và assign delegate cho self. Sau đó requestData
```swift
class ViewController: UIViewController {
      private let dataModel = DataModel()
      override func viewDidLoad() {
         super.viewDidLoad()
         dataModel.delegate = self
         dataModel.requestData()
      }
}
```
Cuối cùng tạo extension của ViewController conform với DataModelDelegate để sử dụng func didRecieveDataUpdate.
```swift
extension ViewController: DataModelDelegate {
      func didRecieveDataUpdate(data: String) {
         print(data)
      }
}
```

Vậy sự khác biệt của delegation so với callback là gì ?
Đó là mình có thể sử dụng Delegation trong toàn app. Tạo Delegate định nghĩa những func cần thiết từ đó tránh được sự rườm rà trong code.
Thế nhưng delegate lại khó thực hiện hơn callback. Mình phải tạo protocol, viết method cho protocol, tạo delegate property, đưa delegate vào ViewController (rofl). Và, toàn bộ method của protocol phải được sử dụng =)).

NHƯNG: để tránh sử dụng lại toàn bộ method trong protocol thì chỉ cần thêm @objc vào trước func trong protocol. Ví dụ như dưới.
```swift
protocol DataModelDelegate: class {
    @objc func didRecieveDataUpdate(data: String)
}
```

# 3 . Sử dụng Notification
Ví dụ nhé, bạn có một bức ảnh ở local và muốn tái sử dụng nó trong toàn app, nếu sử dụng delegation thì sẽ phải gọi nó trong từng ViewController để conform đến protocol, nhưng nếu sử dụng notification thì sẽ sáng sủa hơn đó.
Đầu tiên, thay đổi DataModel thành singleton.
```swift
class DataModel {
   static var sharedInstance = DataModel()
   private init() { }
}
```
Tạo biến private để lưu data.
```swift
class DataModel {
   static var sharedInstance = DataModel()
   private init() { }

   private (set) var data: String?
}
```
Sau đó thêm func requestData quen thuộc.
```swift
class DataModel {
   static var sharedInstance = DataModel()
   private init() { }

   private (set) var data: String?
   func requestData() {

   }
}
```
Khi nhận được data thì lưu lại vào biến trên.
(set) trong biến data nghĩa là read-only nhé.
```swift
func requestData() {
   self.data = “Data from wherever”
}
```
Sau khi update dữ liệu cho biến mình cần post vào Notification sử dụng thuộc tính didSet cho biến.
```css
private (set) var data: String? {
   didSet {

   }
}
```
Tạo một dummy string thông báo có notification bên ngoài class DataModel
```swift
let dataModelDidUpdateNotification = “dataModelDidUpdateNotification”
```
Và đưa vào didSet để sẵn sàng post Notification
```swift
private (set) var data: String? {
   didSet {
      NotificationCenter.default.post(name:  
NSNotification.Name(rawValue: dataModelDidUpdateNotification), object: nil)
   }
}
```
Điều gì sảy ra ở đây vậy ?
Cái didSet kia là một property observer, nó sẽ theo dõi những thay đổi của biến data. Khi có thay đổi thì sẽ post Notification. Và bây giờ mình cần nhận cái notification đó ở các ViewController để sử dụng data.
```swift
class ViewController: UIViewController {
     override func viewDidLoad() {
         super.viewDidLoad()
         NotificationCenter.default.addObserver(self, selector: #selector(getDataUpdate), name: NSNotification.Name(rawValue: dataModelDidUpdateNotification), object: nil)
     }
} 
```
Cái observer mình nói bên trên sẽ theo dõi sự thay đổi của DataModel và gọi đến getDataUpdate bên dưới.
```swift
@objc private func getDataUpdate() {
      if let data = DataModel.sharedInstance.data {
         print(data)
      }
}
```
Dùng Notification thì mình không cần khai báo instance đến DataModel vì DataModel là một singleton class. Khi đó sử dụng thuộc tính và func thông qua sharedInstance.

Khi nhận được data và không có thay đổi gì thì lúc đó bạn không cần observer didSet, có nghĩa là bạn cần giải phóng nó.
```swift
deinit {
      NotificationCenter.default.removeObserver(self, name: NSNotification.Name(rawValue: dataModelDidUpdateNotification), object: self)
}
```
Ví dụ nhé. Bạn present một ViewController2 đè lên ViewController, khi này bạn không cần theo dõi cái ViewController bị đè lên nữa đúng không. Khi đó ở cái ViewController bị đè lên ý bạn đặt observer vào func viewWillAppear và giải phóng ở viewWillDisapear. Khi đó sẽ đảm bảo được việc ViewController chỉ theo dõi thay đổi khi nó đang được present.

Và cuối cùng gọi requestData thông qua sharedInstance của DataModel:
```swift
class View Controller: UIViewController {
   override func viewDidLoad() {
        super.viewDidLoad()
         NotificationCenter.default.addObserver(self, selector: #selector(getDataUpdate), name: NSNotification.Name(rawValue: dataModelDidUpdateNotification), object: nil)
        DataModel.sharedInstance.requestData() 
    }
}
```

Các bạn thử làm và trải nghiệm nhé :D
link gốc: https://medium.com/@stasost/ios-three-ways-to-pass-data-from-model-to-controller-b47cc72a4336