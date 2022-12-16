## Mở đầu
Delegate và Data-source xuất hiện ở mọi ngóc ngách trong hệ sinh thái iOS, và phần lớn các developer đơn giản là chỉ copy&paste chúng để dùng mà không biết rõ bản chất hoạt động là ra sao. Bài viết này sẽ chỉ ra cho các bạn bản chất và cách thức hoạt động của 2 pattern trên.
## Giới thiệu
Đầu tiên, delegate là một design pattern dùng để truyền dữ liệu giữa các class hoặc struct. Từ "delegate" ở đây có nghĩa là ủy quyền, uỷ thác, và để dễ hiểu hơn thì tôi sẽ sử dụng những từ ngữ tương tự.
Ở đây nhiệm vụ của chúng ta là truyền dữ liệu từ  FirstVC đến SecondVC. Đầu tiên, chúng ta cần khởi tạo một protocol chứa một method bắt buộc với parameter truyền vào là kiểu String.
```
protocol FirstVCDelegate { 
		func passData(data: String) 
	}
```
Sau đó chúng ta khởi tạo class FirstVC.
```
class FirstVC {
 var delegate: FirstVCDelegate?
}
```
FirstVC có một optional property là delegate thuộc kiểu FirstVCDelegate. Property này sẽ được khởi tạo bởi SecondVC sau đó.
Cuối cùng, chúng ta khởi tạo SecondVC và để nó tuân thủ protocol  FirstVCDelegate.
```
class SecondVC: FirstVCDelegate {
 func passData(data: String) {
  print("Something happened")
 }
}
```
Sau đó chúng ta tạo những objects
```
let firstVC = FirstVC() 
let secondVC = SecondVC() 
```
Đầu tiên chúng ta tạo ra 2 objects. Nếu bạn nhớ không nhầm, thì  FirstVCclass có một property là  delegate. Sau đó chúng ta assign property này cho secondVC.
```
firstVC.delegate = secondVC  // secondVC = delegate
```
Và điều kỳ diệu ở đây, bây giờ bạn đã có thể thực thi method passDatatừ  FirstVC even though the passData method resides in SecondVC.
```
firstVC.delegate?.passData(data: "a bunch of contracts”)
```
Tôi thường liên tưởng mối quan hệ giữa đối tượng ủy quyền/được ủy quyền tới mối quan hệ của CEO và thư ký. Ở đây  delegate/secondVC là thư ký trong khi  delegator/firstVCchính là CEO. CEO có rất nhiều hợp đồng và ông ta chỉ cần bảo người thư ký xử lý bằng cách gửi cho cô ấy tài liệu cần thiết. 
```
firstVC.delegate?.passData(data: "a bunch of contracts”)
```
Bây giờ hãy sử dụng  data được gửi bởi CEO ở trong SecondVC.
```
class SecondVC: FirstVCDelegate {
 func passData(data: String) {
  print("The CEO gave me \(data)")
 }
}
```
Khi CEO gọi tới phương thứcpassData  thì người thư ký sẽ ngay lập tức gọi tới method mà sử dụng  data từ CEO.
```
firstVC.delegate?.passData(data: "a bunch of contracts”)
```
## Ứng dụng
Lý thuyết như vậy là đủ. Chúng ta hãy cùng nhau tìm hiểu xem delegate được sử dụng trong hệ sinh thái iOS như thế nào. Nếu như bạn đã sử dụng UITableView, thì bạn sẽ thấy những đoạn code sau rất thân quen:
```
class BobViewController: UIViewController, UITableViewDelegate {
 override func viewDidLoad() {
  super.viewDidLoad()
  tableView.delegate = self
 }
}
```
Ở trên chúng ta có 2 đối tượng, một là self chính là  BobViewController và tableView. Ở trong trường hợp này, CEO chính là  tableView, và người thư ký self.
CEO sẽ ủy quyền thực thi thao tác  didSelectRowAtIndexPath. Và người thư ký sẽ thực hiện lệnh đó
```
override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
 print("The CEO gave me a bunch of stuff. I need to handle this")
}
```
## Custom Data Source

Delegate được dùng để gửi dữ liệu từ CEO tới thư ký. Với data source, người thư ký có thể giao tiếp lại với CEO.
Thiết kế Protocol
Protocol chứa một method là passDatavà trả lại một dữ liệu kiểu String.
```
protocol FirstVCDelegate {
 func passData(data: String) -> String
}
```
Thiết kế CEO
```
class FirstVC {
 var dataFromSecretary: String?
 var delegate: FirstVCDelegate?
}
```
Để lưu dữ liệu nhận được từ thư ký, chúng ta khởi tạo một biến là  dataFromSecretary.
Thiết kế thư ký
```
class SecondVC: FirstVCDelegate {
 func passData(data: String) -> String {
  print("The CEO gave me \(data)")
  return "Too much work"
 }
}
```
Bây giờ người thư ký sẽ phản hồi lại với CEO khi mà cô ấy thực hiện công việc được ủy quyền.
```
let firstVC = FirstVC() // CEO: delegator
let secondVC = SecondVC() // Secretary: delegate
```
Tiếp theo chúng ta thực hiện gán delegate cho đối tượng được ủy quyền
```
firstVC.delegate = secondVC
```
Sau đó chúng ta tiến hành gọi method trong protocol
```
firstVC.dataFromSecretary = firstVC.delegate?.passData(data: "a bunch of contracts")
```
Và chúng ta sẽ nhận được thông tin từ phía thư ký
```
print(firstVC.dataFromSecretary) // "Too much work"
```
Khi bạn nhìn thấy protocol UITableViewDataSource, sẽ có một required method, numberOfRowsInSection. và tương tự với  passData, method này trả về giá trị Int.
```
func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
 return 1996
}
```
Ở trong trường hợp này self sẽ truyền đạt số lượng rows tới tableView . Và CEO sẽ nhận được thông tin và sẽ tiến hành tạo một Table View đúng với thông tin đã nhận được.
Như vậy là qua ví dụ nhỏ trên, thì các bạn đã có được cái nhìn rõ ràng về bản chất của Delegate trong iOS. Hẹn gặp lại các bạn vào bài viết tiếp theo.