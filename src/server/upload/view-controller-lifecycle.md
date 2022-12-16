View controller là một thành phần cơ bản trong ứng dụng iOS. View controller đại diện cho một màn hình trong ứng dụng, ứng dụng thông thường có rất nhiều màn hình, nên sẽ có nhiều view controller được tạo ra. UIViewController là 1 class view controller cơ bản, ngoài ra cũng có nhiều loại view controler khác ví dụ như: UITableviewController, UITabbarController, UINavigationController…

View controller là nơi chứa và quản lý các view (bao gồm hiển thị và nội dung). Nó cũng có nhiệm vụ phản ứng lại với tác động của người dùng lên view.

## Vòng đời ViewController

![](https://images.viblo.asia/c996ba76-adb5-41f1-900d-0d602dbbf5f2.png)

### 1. init()

Là function cội nguồn của mọi class trong Swift. Nên nó hiển nhiên là sẽ chạy đầu tiên. Tuy nhiên, bạn cũng không cần quan tâm nhiều lắm vì 99.99% là chúng ta không đụng tới function này.

### 2. loadview()

Khi bạn là dev cá tính, thích code chay và không sử dụng kéo thảo giao diện. Đồng nghĩa là UIViewController của bạn được tạo ra mà không dùng tới bất kì Storyboard hay file *.xib nào cả. Thì function loadView sẽ là function chạy đầu tiên (không tính hàm  init trên) thực thi.

Nhiệm vụ của nó là bạn hãy tạo ra 1 view cho ViewController của bạn. Tất nhiên, view đó sẽ phải có frame. Sau đó, việc còn lại của bạn sẽ là code chay giao diện. Bạn có thể tham khảo code sau:

```
import UIKit
 
class HomeViewController: UIViewController {
 
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func loadView() {
        let view = UIView(frame: UIScreen.main.bounds)
        view.backgroundColor = .white
        
        self.view = view
    }
}
```

### 3. viewDidLoad()
Sau khi chạy loadView xong thì function viewDidLoad sẽ chạy. Hoặc nếu bạn sử dụng Storyboard hay *.xib thì nó sẽ được chạy đầu tiên. Một số lưu ý như sau:

- Khi ViewController đã được nạp vào bộ nhớ ( điều kiện là cái ViewController này chưa tồn tại trong bộ nhớ), thì hàm viewDidLoad được gọi.
- Chỉ được gọi một lần duy nhất trong chu kỳ sống của view đó thôi.
- Thường dùng để chuẩn bị data hoặc là khởi tạo các giá trị mặc định cho các object cũng như UI trên màn hình.

### 4. viewDidUnload()
Đây là thế lực đối nghịch với function viewDidLoad.

- Khi app của bạn nhận được cảnh báo từ hệ thống về trạng thái bộ nhớ đang gần hết thì hàm này sẽ được gọi
- Tại hàm này sẽ giải phóng bớt các property không cần dùng, gán nil chúng để giải phóng bộ nhớ. 

> Nó đã được khai tử từ thời iOS 6.0. Nên giờ không thể gọi được trong code. Tuy nhiên, nó sử dụng ở low level.

### 5. viewWillAppear()
Trước mỗi lần ViewController bạn xuất hiện thì nó sẽ được gọi. Và nó sẽ được gọi nhiều lần nếu ViewController của bạn cứ ẩn hiện liên tục hay nhiều lần. Ví dụ cho các kiểu xuất hiện:

- Là root của 1 cái gì đó, như: window
- Được push từ navigation vào
- App từ background được bật lên lại
- Đang sử dụng thì kéo các Notification Center hay Control Center và ẩn tụi nó đi
…

Công dụng:

- Biết trước được sự xuất hiện của View Controller
- Chuẩn bị dữ liệu cho ViewController hay custom để làm cho ứng dụng mượt mà hơn

### 6. viewDidAppear()
Sau mỗi lần ViewController xuất hiện. Nó với viewWillAppear là một cặp đôi. Giúp bạn xác định  ViewController đã xuất hiện xong rồi. Mục đích làm gì thì tuỳ ý bạn quyết.

### 7. viewWillDisappear()
Function sẽ được gọi khi ViewController sắp bị ẩn đi/ mất đi/ bị ViewController khác đè …. Ý nghĩa và mục đích sử dụng thì cũng khác tương tự 2 method ở trên

### 8. viewDidDisappear()
Khi ViewController đã mất đi thì function này sẽ được gọi. Nó với viewWillDisappear là một cặp đôi. Còn lại thì tương tự 3 đồng chí ở trên.

### 9. deinit()
Bí lắm mới sử dụng function này, nó sẽ được gọi khi ViewController bị remove khỏi bộ nhớ. Công việc của mình sẽ là dọn dẹp bộ nhớ ở đây. Tuy nhiên, với nền tảng iOS hiện tại thì tất cả được thiết kế theo ARC rồi, do đó bạn không cần bận tâm nhiều về việc giải phóng bộ nhớ.

### 10. didReceiveMemoryWarning()
Khi mà ứng dụng của mình sài hết RAM và bộ nhớ không đủ để cấp phát cho chương trình hoạt động. Thì function này sẽ được triệu hồi. Lúc đó:

Bản thân ViewController đang hiển thị sẽ phải làm công tác dọn dẹp lại bộ nhớ

Các ViewController đang ẩn thì sẽ được kích hoạt function didReceiveMemoryWarning của nó

Sau đó các ViewController sẽ được chạy function viewDidUnload, bạn phải gán nil cho các đối tưởng giao diện, giải phóng các biến …

Cuối cùng sẽ vào lại viewDidLoad mọi thứ lại bắt đầu lại


Ngoài ra còn 1 số function nữa trong vòng đời của ViewController, đây chỉ mới là một số function thường thấy và cần phải biết.