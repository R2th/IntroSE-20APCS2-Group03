Mình sẽ mô tả 3 cách cơ bản để pass data về controller của bạn:
* Sử dụng Callbacks
* Sử dụng Delegation
* Sử dụng Notifications

Đầu tiên, chúng ta sẽ tạo một basic project có class ViewController và DataModel. Lúc này chưa quan tâm data source của bạn là gì, nó có thể là file Json local, một image được save trong core data hay từ một response HTTP. Bạn nhận được data trong DataModel, và muốn chuyển nó tới ViewController của bạn:

```
class ViewController: UIViewController {
}

class DataModel {
}
```

##  Callback
Đây là cách rất đơn giản, đầu tiên, chúng ta tạo một phương thức requestData, có param là một closure completion:

```
class DataModel {
    func requestData(completion: ((_ data: String) -> Void)) {
      
    } 
}
```

Trong phương thức requestData, chúng ta viết code để lấy data:

```
class DataModel {
    func requestData(completion: ((_ data: String) -> Void)) {
       // the data was received and parsed to String
         let data = "Data from wherever"
    }
}
```

Tất cả những gì chúng ta cần làm bây giờ là gọi completion với dữ liệu mà chúng ta vừa nhận được:

```
class DataModel {
   func requestData(completion: ((data: String) -> Void)) {
      // the data was received and parsed to String
      let data = "Data from wherever"
      completion(data)
   }
}
```

Bước tiếp theo là tạo một instance của DataModel trong lớp ViewController, và gọi phương thức requestData. Trong completion, chúng ta gọi phương thức private useData:

```
class ViewController: UIViewController {
   private let dataModel = DataModel()
   override func viewDidLoad() {
      super.viewDidLoad()
      dataModel.requestData { [weak self] (data: String) in
            guard let strongSelf = self else { return }
            strongSelf.useData(data: data)
      }
   }
   private func useData(data: String) {
       print(data)
   } 
}
```

Bây giờ trong ViewController của bạn đã có data, trong khi tất cả các dòng code liên quan đến get data đều nằm trong class DataModel. Nếu bạn run project, sẽ thấy data được in ra.

Một cách khác sử dụng Callback để giao tiếp với ViewController là tạo một property callback trong class DataModel:

```
class DataModel {
      var onDataUpdate: ((_ data: String) -> Void)?
}
```

Bây giờ, trong phương thức dataRequest, thay vì sử dụng một completion handler, chúng ta có thể sử dụng callback như sau:

```
func dataRequest() {
   // the data was received and parsed to String
      let data = "Data from wherever"
      
      onDataUpdate?(data)
}
```

Để sử dụng callback này trong class ViewController, chúng ta chỉ cần gán một phương thức thích hợp cho nó:

```
class ViewController: UIViewController {
   private let dataModel = DataModel()
   override func viewDidLoad() {
      super.viewDidLoad()
      dataModel.onDataUpdate = { [weak self] (data: String) in
          guard let strongSelf = self else { return }
          strongSelf.useData(data: data)
      }
      dataModel.requestData()
   }
}
```

Bạn có thể tạo nhiều thuộc tính callback.

## Delegation
Delegation là cách phổ biến nhất để giao tiếp giữa DataModel và ViewController

```
protocol DataModelDelegate: class {
    func didRecieveDataUpdate(data: String)
}
```

Từ khóa "class"trong Swift protocol giới hạn việc áp dụng giao thức cho kiểu class (mà không phải struct hay enum). Điều này rất quan trọng nếu chúng ta muốn sử dụng một weak reference để delegate. Chúng ta cần chắc chắn rằng sẽ không tạo một retain cycle giữa delegate và delegating objects, vì vậy chúng ta cần sử dụng weak reference delegate:

```
weak var delegate: DataModelDelegate?
```

Gọi delegate như sau:

```
class DataModel {
      weak var delegate: DataModelDelegate?
      func requestData() {
         // the data was received and parsed to String
         let data = "Data from wherever"
         delegate?.didRecieveDataUpdate(data: data)
      }
}
```

Tạo một instance của DataModel trong ViewController, gán delegate của nó là self, và gọi requestData:

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

Cuối cùng, tạo một ViewController extension, conform DataModelDelegate protocol:

```
extension ViewController: DataModelDelegate {
      func didRecieveDataUpdate(data: String) {
         print(data)
      }
}
```

Bây giờ, bạn run project sẽ thấy data được in ra.
So sánh với cách dùng callback, mô hình delegation dễ dàng tái sử dụng hơn trên các ứng dụng: bạn có thể tạo một class cơ bản và nó tuân theo protocol. Tuy nhiên, delegation là khó khăn hơn khi thực hiện: bạn cần tạo một protocol, thiết lập các method trong protocol, tạo ra delegate property, gán delegate cho ViewController, và làm cho ViewController phù hợp với protocol. Ngoài ra, mặc định là delegate phải thực hiện mọi method trong protocol.