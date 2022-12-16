# Một số cách cơ bản để truyền dữ liệu từ model tới controller trong mô hình MVC
Như chúng ta đã biết hiện nay có khá nhiều mô hình được xây dựng và áp dụng trong quá trình phát triển phần mềm như:
1. MVVM
2. MVP
3. MVC
4. VIPER
...
###
Mỗi một mô hình lại có các ưu nhược điểm khác nhau nhưng phần lớn các ứng dụng iOS theo định hướng của Apple đều được xây dựng theo mô hình MVC nên trong khuân khổ bài viết này tôi sẽ chỉ nói về một số cách truyền dữ liệu từ model tới controller trong MVC.
## Trước tiên chúng ta cần xem lại xem mô hình MVC là gì?
MVC là viết tắt của Model – View – Controller. Là một kiến trúc phần mềm hay mô hình thiết kế được sử dụng trong kỹ thuật phần mềm. Nói cho dễ hiểu, nó là mô hình phân bố source code thành 3 phần, mỗi thành phần có một nhiệm vụ riêng biệt và độc lập với các thành phần khác.
![](https://images.viblo.asia/f54298a3-9ff2-4093-b0dc-48829c2b89b0.png)
### Các thành phần
Trong đó Controller đóng vai trò kết nối giữa View và Model do đó View và Model không biết lẫn nhau. Controller là thành phần khó sử dụng lại nhất và nó là nơi chúng ta lưu các code liên quan tới business. Mô hình này có nhược điểm là Controller đôi lúc trở nên quá lớn khi chứa toàn bộ code logic, đồng thời nó kiêm luôn vai trò quản lý vòng đời của View khiến View và Controller khó có thể tách rời
### Ưu, nhược điểm:
1. Phân phối: View và Model được tách rời nhưng View và Controller bị liên kết chặt với nhau.
2. Khả năng test: Chỉ có thể test được Model.
3. Tính dễ dùng: Số lượng code ít nhất trong số các mô hình, ngoài ra do tất cả mọi người đều biết về mô hình này nên nó dễ dàng bảo trì ngay cả với những lập trình viên ít kinh nghiệm.
###
Sau khi đã hiểu cơ bản về MVC, chúng ta sẽ đi vào một số cách để truyền dữ liệu giữa model và Controller trong MVC với ngôn ngữ Swift. Cụ thể ở đây tôi đề cập đến 3 cách đó là:
1. Sử dụng delegate
2. Sử dụng notifications
3. Sử dụng callback
###
Để tiện cho việc triển khai ở đây tôi đã khởi tạo 2 class là *ViewController* và *ViewModel*
```Swift
class ViewController: UIViewController {
}

class DataModel {
}
```
## Sử dụng CallBack
### callback dưới dạng completion Handle
Đầu tiên chúng ta tạo một function requestData trong *DataModel* và khai báo giá trị data như bên dưới hay bất cứ một giá trị nào bạn muốn sau đó kết thúc hàm bằng completion.
```Swift
class DataModel {
    func requestData(completion: ((_ data: String) -> Void)) {
        let data = "framgia"
        completion(data)
    } 
}
```
Chắc các bạn đang hỏi completion xuất hiện trong phần tham số của hàm *requestData* ở trên đó là gì..? và tại sao phải gọi completion ở trong thân hàm.
Completion ở đây hiểu một cách đơn giản là phương thức truyền vào một String và có kiểu trả về là Void trong Swift có thể gọi nó là Completion Closure. Chúng ta truyền vào một giá trị trong Completion để trả về giá trị sau khi thực hiện hàm trên.
### 
Bước tiếp theo là tạo một instance của DataModel trong lớp ViewController và gọi phương thức requestData. Khi hoàn thành, chúng ta gọi một phương thức riêng là useData:
```Swift
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
### callback dưới dạng class property
Trong class DataModel chúng ta khai báo thuộc tính onDataUpdate và trong hàm requestData thay vì sử dụng Completion handle chúng ta sử calback như sau:
```Swift
class DataModel {
      var onDataUpdate: ((_ data: String) -> Void)?
      
      func dataRequest() {
      let data = "framgia"
      onDataUpdate?(data)
      }
}
```
Và để dử dụng chúng ta chỉ cần đưa một phương thức thích hợp cho nó trong class *ViewController*
```Swift
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
## Sử dụng Delegate
Đây là cách rất phổ biến trong giao tiếp giữa model và controller
### 
Đầu tiên khởi tạo một protocol *DataModelDelegate* 
```Swift
protocol DataModelDelegate: class {
    func didRecieveDataUpdate(data: String)
}
```
việc sử dụng từ khoá class khi khai báo protocol để giới hạn việc sử dụng protocol chỉ dành cho các class.
### 
Tiến hành khai báo  delegate trong DataModel sau đó tạo một instance của DataModel trong ViewController, gán delegate cho nó và gọi hàm requestData:
```Swift
class DataModel {
      weak var delegate: DataModelDelegate?
      func requestData() {
         // the data was received and parsed to String
         let data = “framgia”
         delegate?.didRecieveDataUpdate(data: data)
      }
}

class ViewController: UIViewController {
      private let dataModel = DataModel()
      override func viewDidLoad() {
         super.viewDidLoad()
         dataModel.delegate = self
         dataModel.requestData()
      }
}
```
Bước cuối cùng, tạo một extension của ViewController có conform DataModelDelegate và sử dụng phương thức ủy nhiệm didRecieveDataUpdate:
```Swift
extension ViewController: DataModelDelegate {
      func didRecieveDataUpdate(data: String) {
         print(data)
      }
}
```
## Sử dụng Notifications
Thêm một cách khác để giao tiếp giữa controller và model.Đầu tien sử DataModel thành singleton và tạo biến local lưu trữ dữ liệu và thay đổi giá trị data trong hàm *requestData*
```Swift
class DataModel {
   static var sharedInstance = DataModel()
   private init() { }
   private (set) var data: String?
   
   func requestData() {
   // the data was received and parsed to String
   self.data = “framgia”
   }
}
```
Sau khi chúng ta cập nhật data, chúng ta muốn gửi một notification. Cách tốt nhất để làm điều này là đặt một cái tên ý nghĩa cho nó và sử dụng một property observer.
Thêm property observer didSet vào biến data:
```Swift
let dataModelDidUpdateNotification = “dataModelDidUpdateNotification”

private (set) var data: String? {
   didSet {
      NotificationCenter.default.post(name:  
NSNotification.Name(rawValue: dataModelDidUpdateNotification), object: nil)
   }
}
```
Property observer (giống như tên của nó) sẽ quan sát bất kỳ sự thay đổi nào trong variable. Khi những thay đổi xuất hiện, chúng ta sẽ gửi một notification. Bây giờ chúng ta chỉ cần thêm một listener ở mọi nơi mà ViewController sử dụng data này. ViewController sẽ lắng nghe thông báo và thực hiện hàm *getDataUpdate*
```Swift
class ViewController: UIViewController {
     override func viewDidLoad() {
         super.viewDidLoad()
         NotificationCenter.default.addObserver(self, selector: #selector(getDataUpdate), name: NSNotification.Name(rawValue: dataModelDidUpdateNotification), object: nil)
     }
     
     @objc private func getDataUpdate() {
      if let data = DataModel.sharedInstance.data {
         print(data)
      }
    }
    deinit {
      NotificationCenter.default.removeObserver(self, name: NSNotification.Name(rawValue: dataModelDidUpdateNotification), object: self)
    }
} 
```
-----

Tham khảo:https://medium.com/@stasost/ios-three-ways-to-pass-data-from-model-to-controller-b47cc72a4336