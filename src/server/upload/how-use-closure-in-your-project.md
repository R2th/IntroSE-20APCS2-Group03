Part 1: https://viblo.asia/p/gioi-thieu-ve-closure-trong-swift-ios-1Je5E8z0lnL

Hello mọi người.

> Do có bạn comment hỏi thêm về closure ở bài [Part 1](https://viblo.asia/p/gioi-thieu-ve-closure-trong-swift-ios-1Je5E8z0lnL) nên mình mạn phép viết thêm 1 chút nữa về closure.

# Uỷ thác sự kiện trong Uitableview
> Bạn có một sự kiện nhấn vào button ở trong 1 cell trong 1 uitableViewController để gọi một API show detail video chẳng hạn sao đó sẽ redirect đến màn videoDetailViewController.

```swift
# Trong cell bạn đặt một closure để uỷ thác cho uitableView
# VideoModel là model chứa thông tin của video trong 1 cell
class ExampleCell {
    var didSelectDetailVideoButton: ((VideoModel?) -> Void)?
    
    //Mark: Sự kiện action click của button trong cell
    @IBAction private func didSelectDetailButton(_ sender: UIButton) {
        didSelectDetailVideoButton?(video)
    }
}

// Trong uitableView. Trong datasource của UITableViewDataSource
func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    guard let cell = tableView.dequeueReusableCell(withIdentifier: "CELL", for: indexPath) as? ExampleCell else {
        return UITableViewCell()
    }
    cell.didSelectDetailVideoButton = { [weak self] video in
        // TODO: Giờ bạn có thể thực hiện code chuyển màn hình ở đây với video được truyền ra bởi cell rồi.
    }

    return cell
}
```

> Chú ý: Bạn có để ý Chỗ closure mình để weak self không. Là bởi vì khi thực hiện closure thì cell và uitableview sẽ có một liên kết strong để có thể truyền tải dữ liệu callback. Nếu bạn k để weak self ở đây thì sẽ có thể xảy ra retain cycles dẫn đến uitablview or cell không được giải phóng.

```swift
cell.didSelectDetailVideoButton = { [weak self] video in
    // TODO: Giờ bạn có thể thực hiện code chuyển màn hình ở đây với video được truyền ra bởi cell rồi.
}
```

> Ngoài ra bạn có thể áp dụng với các trường hợp với collectview hay với viewDetail hay một view popup uỷ thác cho view cha của nó thực hiện 1 tác vụ nào đó.
> Tuy nhiên có một cách khác là bạn sử dụng Protocol để có thể thực hiện tác vụ y hệt như trên.

## Sử dụng Protocol
### Trong cell. Ta khai báo protocol là SendBackDataProtocol

> Trong cell có 1 button. Khi ấn vào button đó ta sẽ truyên dữ liệu vào func sendBackDataFunc

```swift
import UIKit

protocol SendBackDataProtocol: class {
    func sendBackDataFunc(data: String?)
}

class testProtocolCell: UITableViewCell {
    var delegate: SendBackDataProtocol?

    @IBAction func handleSendBackData(_ sender: Any) {
        self.delegate?.sendBackDataFunc(data: "Send back data")
    }    
}
```

### Trong uitableView
```swift
import UIKit
import AVFoundation

class ViewController: UIViewController, UITableViewDelegate, UITableViewDataSource, SendBackDataProtocol {
    @IBOutlet weak var uitableView: UITableView!

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "testProtocolCell") as! testProtocolCell
        cell.delegate = self
        return cell
    }

    // Mark: Thực hiện protocol func
    func sendBackDataFunc(data: String?) {
        print("SEnd back data: \(data)")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        uitableView.delegate = self
        uitableView.dataSource = self
        uitableView.register(UINib(nibName: "testProtocolCell", bundle: nil), forCellReuseIdentifier: "testProtocolCell")
    }    
}
```
> Các bạn để ý. Chúng ta implement SendBackDataProtocol ở bên trên class.
> Thực hiện func protocol sendBackDataFunc in ra print("SEnd back data: \(data)")
> Trong *cellForRowAt* chúng ta thực hiện
 
```swift
cell.delegate = self
```

Để có thể nhận delegate trong class uitableView

Kêt quả: Khi bấm 2 lần button 
```swift
SEnd back data: Optional("Send back data")
SEnd back data: Optional("Send back data")
```
 
# Uỷ thác khi bạn thực hiện tác vụ gọi API hoặc một tác vụ dưới thread background

> Các bạn sử dụng Alamofire hoặc tự code network gọi API của apple. Ở đây mình sử dụng Alamofire để ví dụ.

> Ví dụ mình thực hiện 1 action đăng kí tài khoản.


## Định nghĩa URL sử dụng Alamofire advance 
Các bạn có thể đọc bài của mình về Rxswift [Build base Network using Rxswift](https://viblo.asia/p/build-base-request-network-with-alamofire-rxswift-and-swiftyjson-using-crud-authorization-alamofire-gDVK28EAlLj) hoặc các bạn đọc trên [Document Alamofire advance using](https://github.com/Alamofire/Alamofire/blob/master/Documentation/AdvancedUsage.md) để hiểu câu lệnh dưới.

```swift
func register(with email: String, password: String, success: (() -> Void)?, fail: ((String?) -> Void)?) {
    let parameters: Parameters = [
        "email": email,
        "password": password
    ]
    Alamofire.request("https://localhost:3000/sign_up", method: .post, parameters: parameters).responseJSON { response in
        switch response.result {
        case .success(let value):
            // TODO: Bạn xử lý register thành công ở đây như setAccessToken cho những request sau đó.
            success?()
        case .failure(let error):
             // TODO: Nếu có lỗi trả về 1 closure báo lỗi để xử lý.
            fail?("Register Fail")
        }    
    }
}
```

> Như các bạn thấy. Ở đây mình xử dụng 2 closure chờ kết quả là success và fail để đảm nhiểm truyền trả dữ liệu tuỳ theo trường hợp trả về của API để xử lý.

### Goi api ở RegisterViewController 
> RequestManager.shared là một struct singletons Network chưa các func gọi API. register func chỉ là 1 trong số rất nhiều func. 
```swift
RequestManager.shared.register(with: registerData, success: { [weak self] in
    print("Register success or Redirect to Main screen ")
}) { [weak self] (err) in
    print("Has error: \(err)")
}
```

Và ở trong viewController chúng ta sẽ sử lý dữ liệu được báo về thông qua closure một cách đơn giản như vậy.

# Sử dụng closure để action trong UIAlertView
> Sử dụng alert thì các bạn sử dụng rất phổ biến trong các trường hợp thông báo cho người dùng. Nhưng đôi sử dụng lại nhiều lần thì ta nên viết thành 1 extension dùng chung để đỡ phải viết đi viết lại nhiều lần

```swift
extension UIViewController {
    func showAlert(_ title: String, _ message: String, _ okTitle: String, _ okAction: (() -> Void)?, _ cancelTitle: String?, _ cancelAction: (() -> Void)? = nil) {
        let alertVC = UIAlertController(title: title, message: message, preferredStyle: .alert)
        let okAction = UIAlertAction(title: okTitle, style: .default) { _ in
            okAction?()
        }
        alertVC.addAction(okAction)
        if cancelTitle != nil {
            let cancelAction = UIAlertAction(title: cancelTitle!, style: .default) { _ in
                cancelAction?()
            }
            alertVC.addAction(cancelAction)
        }
        self.present(alertVC, animated: true, completion: nil)
   }
}
```

> Ở đây mình implement 2 closure là okAction và cancelAction để xử lý trường hợp người dùng bâm ok và bấm cancel trên alert

```swift
// Trong viewController chúng ta có. 

self.showAlert("Title of alert", "Content of alert", "Ok", { [weak self] in
    print("User click ok")
}, "Cancel") { [weak self] in
    print("User click cancel")
}
```

# Sử dụng closure pass data giữa các controller.
Các bạn có thể tham khảo các pass data giữa các màn hình ở bài viết của Anh Tình (Master ios) [Pass data between viewController](https://viblo.asia/p/mot-so-ky-thuat-passing-data-giua-cac-view-controllers-phan-2-Az45bNWg5xY)
# Kết luận
> Trên đây thường là các trường hợp bạn sử dụng closure mà mình biết. Ví dụ còn sơ sài do nếu viết hoàn chỉnh thì nó thuộc phần build code base nên sẽ rất dài nên mình như đưa ra các ví dụ cụ thể. Nếu chưa hiểu hay còn gì sai xót bạn có thể comment bên dưới.

> Theo mình đánh giá các ưu nhược điểm của closure như sau:

## Ưu điểm:
- Ngắn gọn, dễ sử dụng.
- Làm code clear hơn hơn về mặt syntax.
- Xử lý các tình huống dữ liệu bất đồng bộ như gọi API hay xử lý background job.
- Code ít hơn so với sử dụng protocol.

## Nhược điểm:
- Một nhược điểm là khó debug và maintain đối với code non tay như mình chẳng hạn. Đó là mình thấy thế không biết các bạn sao.
- Có thể xảy ra retain cycles nếu bạn không cẩn thận.

> Tuy nhiên closure rất hữu ích trong các project và đặc biết gần như không thể thiếu (Gần như thối nhé ^^!)
> Trên đây nhận đinh ngắn của mình. Mình cũng chưa sử dụng quá nhiều closure nên cũng chưa thể hiểu được nó. Tuy nhiên mong các bạn có thể ít ra là sử dụng được closure trong project của mình.

> Có gì thắc mắc các bạn cứ comment ở dưới nhé. Thanks for watching.