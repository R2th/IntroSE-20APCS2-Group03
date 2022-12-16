## Mở đầu
Là một iOS developer nói riêng, hoặc một software developer nói chung, chắc chắc chúng ta đều phải giải quyết một bài toán trong mọi project đó là: Làm thế nào để truyền dữ liệu từ Model đến Controller.
Giả định là chúng ta đang áp dụng mô hình MVC hoặc MVVM trong project. Sau đây là ba cách mà chúng ta có thể sử dụng để truyền dữ liệu về Controller:
* Sử dụng Callbacks
* Sử dụng Delegation
* Sử dụng Notifications

Chúng ta sẽ lần lượt đi qua từng ví dụ ứng với từng cách, và đến cuối cùng của bài viết này, bạn sẽ có thể tự chọn một cách mà bạn cảm thấy thích hợp nhất cho project của của mình.

Đầu tiên, chúng ta sẽ tạo một project cơ bản có các ViewController và các DataModel. Tôi sẽ không đề cấp đến việc chúng ta sẽ lấy data source từ đâu, nó có thể là file JSON đặt ở local, ảnh có thể lưu ở thư mục resource của app, hoặc trong CoreData, hay lấy từ API HTTP Response. Dù thế nào đi nữa, mỗi khi lấy được dữ liệu đổ vào DataModel, chúng ta sẽ tìm cách truyền nó đến View Controller.

Chúng ta sẽ tạo các class ViewController và DataModel:

```
class ViewController: UIViewController {
}

class DataModel {
}
```

## Cách 1. Callback as Completion Handler
Cách thức này cực kỳ dễ dàng cài đặt. Đầu tiên, chúng ta xây dựng một phương thức có tên *requestData* có tham số là một callback:

```
class DataModel {
    func requestData(completion: ((_ data: String) -> Void)) {
      
    } 
}
```
Closure có tham số là kiểu String, kiểu trả về là Void. Bên trong phương thức *requestData* chúng ta tiến hành thao tác lấy dữ liệu từ một nguồn bất kỳ về

```
class DataModel {
    func requestData(completion: ((_ data: String) -> Void)) {
       // the data was received and parsed to String
         let data = "Data from wherever"
    }
}
```
Khi thao tác lấy dữ liệu thành công, chúng ta tiến hành gọi đến closure với data vừa nhận được.

```
class DataModel {
   func requestData(completion: ((data: String) -> Void)) {
      // the data was received and parsed to String
      let data = "Data from wherever"
      completion(data)
   }
}
```

Bước tiếp theo chúng ta tạo một đối tượng DataModel trong ViewController và gọi đến phương thức *requestData*. Bên trong callback, chúng ta gọi đến một phương thức private *useData* để xử lý dữ liệu nhận được từ DataModel:

```
class ViewController: UIViewController {
   private let dataModel = DataModel()
   override func viewDidLoad() {
      super.viewDidLoad()
      dataModel.requestData { [weak self] (data: String) in
            self?.useData(data: data)
      }
   }
   private func useData(data: String) {
       print(data)
   } 
}
```

Lưu ý chúng ta nên sử dụng con trỏ weakSelf bên trong closure. 
Rất đơn giản đúng không nào? Bây giờ chúng ta đã nhận được data bên trong ViewController, trong khi tất cả những đoạn code liên quan đến việc xử lý dữ liệu đều nằm trong class DataModel. Build và Run ứng dụng, chúng ta sẽ nhìn thấy dữ liệu được in ra trong log.

### Part 1.5. Callback as a class property
Một cách khác cho việc sử dụng callback để giao tiếp với ViewController là tạo một callback là một thuộc tính của DataModel.

```
class DataModel {
      var onDataUpdate: ((_ data: String) -> Void)?
}
```

Bây giờ, bên trong phương thức *dataRequest*, thay vì truyền vào một closure như là tham số, ta tiến hành sử dụng thuộc tính closure đã được khai báo ở trên:
```

func dataRequest() {
   // the data was received and parsed to String
      let data = "Data from wherever"
      
      onDataUpdate?(data)
}
```
Để sử dụng callback này trong ViewController, chúng ta chỉ cần gán giá trị cho nó (đừng quên sử dụng weak self)

```
class ViewController: UIViewController {
   private let dataModel = DataModel()
   override func viewDidLoad() {
      super.viewDidLoad()
      dataModel.onDataUpdate = { [weak self] (data: String) in
          self?.useData(data: data)
      }
      dataModel.requestData()
   }
}
```

Chúng ta cũng có thể khai báo nhiều callback làm thuộc tính trong DataModel (onDataUpdate, onHTTPError, ...), việc sử dụng chúng như thế nào tùy vào từng mục đích cụ thể, nếu không cần thiết, chúng ta có thể không gọi đến chúng, đó là điểm khác biệt với các khai báo closure ở đầu mục bên trên.

## Cách 2. Delegation
Delegate được biết đến là cách thông dụng nhất để giao tiếp giữa DataModel và ViewController.

```
protocol DataModelDelegate: class {
    func didRecieveDataUpdate(data: String)
}
```
Một điểm lưu ý khi sử dụng delegate đó là chúng ta cần sử dụng delegate là một con trỏ weak để tránh retain cycle giữa delegate và đối tượng sở hữu nó. Đoạn code dưới đây để khai báo một tham chiếu weak của delegate:

```
weak var delegate: DataModelDelegate?
```

Khi sử dụng delegate, chúng ta sử dụng nó tương tự như cách mà chúng ta làm với callback:

```
class DataModel {
      weak var delegate: DataModelDelegate?
      func requestData() {
         // the data was received and parsed to String
         let data = “Data from wherever”
         delegate?.didRecieveDataUpdate(data: data)
      }
}
```

Tạo một biến kiểu DataModel bên trong ViewController, sau đó gán thuộc tính delegate của nó bằng chính ViewController ấy, sau đó gọi phương thức *requestData*:

```
class ViewController: UIViewController {
      private let dataModel = DataModel()
      override func viewDidLoad() {
         super.viewDidLoad()
         dataModel.delegate = self
         dataModel.requestData()
      }
}
```

Cuối cùng, chúng ta tạo một extension của ViewController, conform các phương thức của DataModelDelegate protocol:

```
extension ViewController: DataModelDelegate {
      func didRecieveDataUpdate(data: String) {
         print(data)
      }
}
```

Mỗi khi conform các phương thức của delegate, mặc định thì chúng ta cần cài đặt tất cả các phương thức của protocol. Tuy nhiên để có thể cài đặt một các tùy chọn từng phương thức tùy ý, chúng ta sử dụng từ khóa @objc.

## Cách 3. Notification

Trong khi hai cách bên trên được sử dụng khá nhiều thì ở cách này, Notification không được sử dụng nhiều trong các trường hợp cho lắm.
Sau đây là một trường hợp mà chúng ta có thể cần sử dụng đến Notification để giao tiếp giữa DataModel và ViewController. Giả sử chúng ta có một dữ liệu và chúng ta cần sử dụng nó trên toàn app.

Ví dụ, nếu chúng ta muốn nhận rất nhiều user image được lưu ở local và sử dụng nó trên một vài ViewController. Với cách sử dụng delegate chúng ta sẽ cần phải conform các protocol ở tất các ViewController ấy.

Trong trường hợp này, chúng ta có thể sử dụng callback và delegate cũng không vấn đề gì, tuy nhiên sử dụng Notification sẽ là một lựa chọn đúng đắn hơn cả.
Đầu tiên, chúng ta sẽ thay đổi DataModel thành một singleton.

```
class DataModel {
   static var sharedInstance = DataModel()
   private init() { }
}
```

Tiếp theo, chúng ta thêm một local variable trong DataModel là nơi lưu dữ liệu:

```
class DataModel {
   static var sharedInstance = DataModel()
   private init() { }
   
   private (set) var data: String?
}
```

Chúng ta để biến data ở dạng private, chỉ có phương thức *requestData()* mới có quyền thay đổi giá trị của data.
Cuối cùng chúng ta implement phương thức requestData như sau: 

```
class DataModel {
   static var sharedInstance = DataModel()
   private init() { }
   
   private (set) var data: String?
   func requestData() {

   }
}
```

Trong phương thức *requestData* chúng ta tiến hành lưu lại dữ liệu nhận được:

```
func requestData() {
   // the data was received and parsed to String
   self.data = “Data from wherever”
}
```

Sau khi update giá trị data, chúng ta cần gửi một Notification đến các ViewController để tiến hành update lên UI.

```
private (set) var data: String? {
   didSet {
      
   }
}
```

Đoạn code sau sẽ giúp chúng ta sẽ gửi một notification:

```
let dataModelDidUpdateNotification = “dataModelDidUpdateNotification”

private (set) var data: String? {
   didSet {
      NotificationCenter.default.post(name:  
NSNotification.Name(rawValue: dataModelDidUpdateNotification), object: nil)
   }
}
```

Sau đây là những gì xảy ra phía sau đoạn code trên: observer didSet của property sẽ lắng nghe tất cả những thay đổi đến từ thuộc tính data. Mỗi khi có một thay đổi diễn ra, chúng ta sẽ tiến hành post một notification. Việc cần làm tiếp theo là tiến hành lắng nghe các notification trên ViewController để update dữ liệu lên UI.

```
class ViewController: UIViewController {
     override func viewDidLoad() {
         super.viewDidLoad()
         NotificationCenter.default.addObserver(self, selector: #selector(getDataUpdate), name: NSNotification.Name(rawValue: dataModelDidUpdateNotification), object: nil)
     }
} 
```

Bây giờ observer sẽ tiến hành lắng nghe tất cả những thay đổi trên DataModel và gọi đến phương thức *getDataUpdate* sau mỗi thay đổi.

```
@objc private func getDataUpdate() {
      if let data = DataModel.sharedInstance.data {
         print(data)
      }
}
```

Trong phương thức này chúng ta sẽ lấy dữ liệu được lưu trong *DataModel.sharedInstance.data*. Lưu ý rằng chúng ta không được tạo một biến mới của DataModel ở ViewController, bởi vì DataModel là một singleton, chúng ta chỉ có thể thao tác đến dữ liệu cũng như gọi đến các phương thức của nó dựa trên *sharedInstance*.

So sánh với hai cách sử dụng Callback và Delegate, cách sử dụng Notification thực tế không truyền bất cứ dữ liệu nào từ DataModel đến ViewController, thay vào đó nó thông báo đến các ViewController rằng dữ liệu mới đã sẵn sàng. Thay vì DataModel sẽ phải đến nói với tất cả các ViewController rằng "Đây là dữ liệu mà anh cần", nó sẽ ngồi yên một chỗ và nói với các ViewController "Này, tôi có dữ liệu mới đấy, các anh có thể đến và lấy".

Khi sử dụng notification, chúng ta cần nhớ một điều: cần phải remove một observer khi nó không còn cần thiết để lắng nghe notification nữa. Trong trường hợp này, chúng ta cần remove observer tương ứng mỗi khi ViewController bị hủy:

```
deinit {
      NotificationCenter.default.removeObserver(self, name: NSNotification.Name(rawValue: dataModelDidUpdateNotification), object: self)
}
```

Trong một số trường hợp, chúng ta không cần phải lắng nghe notification khi ViewController vẫn nằm trong Navigation nhưng đang không được hiển thị. Ví dụ khi chúng ta present một ViewController thứ hai lên trên một ViewController trước đó thì việc update dữ liệu cho ViewController thứ nhất (đang không được hiển thị) là không cần thiết. Cách xử lý đơn giản trong trường hợp này là tiến hành add observer trong phương thức *viewWillAppear* và tiến hành remove nó trong phương thức *viewWillDisappear*. Điều này sẽ đảm bảo là ViewController sẽ chỉ lắng nghe Notification khi nó đang được hiển thị trên màn hình.

Bước cuối cùng là gọi đến phương thức *requestData* thông qua *sharedInstance* của DataModel

```
class View Controller: UIViewController {
   override func viewDidLoad() {
        super.viewDidLoad()
         NotificationCenter.default.addObserver(self, selector: #selector(getDataUpdate), name: NSNotification.Name(rawValue: dataModelDidUpdateNotification), object: nil)
        DataModel.sharedInstance.requestData() 
    }
}
```

Build và chạy project chúng ta sẽ nhận được giống như hai cách Delegate và Callback. 

## Tổng kết
Trên đây là ba cách mà chúng ta có thể sử đụng để tương tác giữa DataMode và ViewController. Bạn thường sử dụng những cách nào để truyền data bên trong project của mình, đừng ngại chia sẻ bằng cách để lại comment/câu hỏi/ý kiến/lời khuyên bên dưới bài viết. Cảm ơn đã theo dõi.