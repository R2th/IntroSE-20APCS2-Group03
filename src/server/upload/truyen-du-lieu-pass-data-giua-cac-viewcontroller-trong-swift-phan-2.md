# Passing Data ngược lại với Properties và Functions (A ← B)
Bây giờ ... nếu bạn muốn truyền data ngược lại từ ViewController thứ 2 tới MainViewController thì sao?

Passing data giữa ViewController sử dụng property trên ViewController thứ 2 thì đã được trình bày ở Phần 1[](https://viblo.asia/p/truyen-du-lieu-pass-data-giua-cac-viewcontroller-trong-swift-phan-1-3Q75w8oeKWb), nó khá là đơn giản. Vậy làm sao để truyền dữ liệu ngược lại từ ViewController thứ 2 sang ViewController thứ nhất. Bạn có thể làm nó với nhiều cách khác, bạn có thể tìm thấy nó trong những phần sau.

Dưới đây là thao tác của người dùng:
* Người dùng ứng dụng của bạn đã chuyển từ ViewController A sang ViewController B.
* Trong ViewController B, người dùng tương tác với data và bạn muốn data đó truyền ngược lại ViewController A.
Hay:
* Thay vì truyền data từ A sang B thì bạn muốn từ B ngược lại A
Cách dễ nhất để truyền ngược lại là tạo một reference tới ViewController A ở bên trong ViewController B, và gọi hàm từ ViewController A bên trong ViewController B

Ví dụ:

Ở view B:
```Swift
class SecondaryViewController: UIViewController
{
    var mainViewController:MainViewController?

    @IBAction func onButtonTap()
    {
        mainViewController?.onUserAction(data: "The quick brown fox jumps over the lazy dog")
    }
}
```
Ở view A:
```Swift
func onUserAction(data: String)
{
    print("Data received: \(data)")
}
```
Khi ViewController được push vào navigation stack, giống như ví dụ trước, mốt kết nối giữa 2 ViewController được tạo ra.
```Swift
let vc = SecondaryViewController(nibName: "SecondaryViewController", bundle: nil)
vc.mainViewController = self
```
Trong ví dụ ở trên, `self` được gán cho property `mainViewController`. Bây giờ ViewController thứ 2 đã biết `mainViewController` nên nó có thể gọi hàm của `mainViewController` ví dụ như `onUserAction(data:)`

Vậy là xong. Nhưng gửi data bằng cách này không phải là tốt nhất. Cách này có một vài vấn đề:
* Bây giờ `MainViewController` và `SecondaryViewController` là liên kết chặt chẽ (tightly coupled). Bạn sẽ muốn tránh tightly coupled trong app của bạn. Phần lớn vì nó làm giảm tính modularity của code. Cả 2 class trở nên quá phụ thuộc nhau và phải dựa vào nhau để hoạt động đúng. Và thường dẫn đến spaghetti code.
* Ở ví dụ phía trên tạo ra một retain cycle. `SecondaryViewController` không thể bị gỡ bỏ cho đến khi `MainViewController` được gỡ bỏ khỏi memory, nhưng `SecondaryViewController` thì cũng lại không thể bị gỡ bở cho đến khi `SecondaryViewController` bị gỡ bỏ. (Giải pháp là sử dụng `weak` property)
* 2 dev không thể dễ dàng làm việc riêng biệt trên 2 ViewController. Bởi vì cả 2 ViewController đều cần phải hiểu rõ về ViewController còn lại.

Bạn muốn tránh referencing trực tiếp các class, instances và function như thế này. Code như vậy sẽ trở thành ác mộng cho việc bảo trì.
# Passing data với delegation
Delegation là rất quan trọng và thường xuyên được sử dụng trong iOS SDK. Hiểu nó là rất quan trọng nếu bạn viết iOS app.

Với delegation, một base class có thể chuyển chức năng cho một secondary class. Như vậy coder có thể implement secondary class này và phản hồi event cho base class bằng cách sử dụng protocol.
![](https://images.viblo.asia/c8afbb86-10bd-49c9-97e2-6be47859278b.jpg)
Dưới đây là ví dụ nhanh:
* Hãy tưởng tượng bạn làm trong một cửa hàng pizza và bạn có một thợ làm bánh pizza 
* Khách hàng có thể làm bất cứ điều gì họ muốn với pizza, như ăn nó, cho vào tủ lạnh hoặc chia sẻ với bạn bè.
* Người làm bánh pizza thường quan tâm đến những gì bạn làm với chiếc bánh pizza của họ, nhưng bây giờ anh ấy đã tách mình ra khỏi quy trình ăn pizza và chỉ ném cho bạn một chiếc bánh pizza khi nó sẵn sàng. Anh ta ủy thác quy trình xử lý chiếc pizza và chỉ quan tâm đến việc nướng pizza!

Trước khi bạn và người làm bánh pizza có thể hiểu nhau, bạn cần xác định một protocol:
```Swift
protocol PizzaDelegate
{
    func onPizzaReady(type: String)
}
```
Nếu một class tuân thủ protocol, thì một protocol là một thỏa thuận về những func mà một class nên implement. Bạn có thể thêm nó vào một class như thế này:
```Swift
class MainViewController: UIViewController, PizzaDelegate
{
    ...
```
Việc definition class này nói rằng:
* Tên của class là `MainViewController`
* Mở rộng (hoặc sub class) của class `UIViewController`
* Implement (or conform) the PizzaDelegate class

Nếu bạn nói rằng bạn muốn conform một protocol, bạn cũng phải implement nó. Bạn thêm chức năng này vào `MainViewController`
```Swift
func onPizzaReady(type: String)
{
    print("Pizza ready. The best pizza of all pizzas is... \(type)")
}
```
Khi bạn tạo Secondary ViewController, bạn cũng phải tạo liên kết delegation, giống như property trong ví dụ trước:
```Swift
vc.delegate = self
```
Và đây là khía cạnh chính của delegation. Bây giờ bạn có thể thêm property và code của hàm delegate vào class, giống Secondary ViewController.

Đầu tiên, property:
```Swift
weak var delegate:PizzaDelegate?
```
Và sau đó là code:
```Swift
@IBAction func onButtonTap()
{
    delegate?.onPizzaReady(type: "Pizza di Mama")
}
```
Hãy nói rằng func `onButtonTap()` sẽ được gọi khi người làm pizza hoàn thành pizza. Nó sẽ gọi `onPizzaReady(type:)` trong `delegate`.

Người làm pizza không cần quan tâm nếu nó là delegate hay không. Nếu nó không là delegate, chỉ cần kết thúc và thrown. Nếu nó là delegate, người làm pizza chỉ cần đưa pizza và bạn có thể làm gì với nó bạn muốn.

Vậy, hãy xem thành phần chính của delegation:
* Bạn cần delegate protocol
* Bạn cần delegate property
* Class mà bạn muốn xử lý dữ liệu cần phải conform giao thức
* Class mà bạn muốn delegate, cần gọi hàm được định nghĩa trong protocol

Điều này khác với ví dụ trước với việc truyền dữ liệu trở lại qua các properties như thế nào?
* Các dev làm việc trên các class riêng biệt chỉ cần conform về protocol và các func mà nó có. Dev có thể chọn conform và implement bất cứ điều gì họ muốn.
* Ở đó, không có kết nối trực tiếp nào giữa MainViewController và SecondaryViewController, điều đó có nghĩa là chúng được ghép nối yếu hơn so với ví dụ trước.
* Protocol có thể được thực hiện bởi bất kỳ class nào, không chỉ `MainViewController`
# Passing Data Back With A Closure
Sử dụng closure để truyền data giữa các ViewController cũng không khác mấy so với sử dụng property hoặc delegation.

Lợi ích lớn nhất của việc sử dụng closure là nó tương đối dễ sử dụng, và bạn có thể định nghĩa nó ở cục bộ, không cần thêm protocol hay func
![](https://images.viblo.asia/e4037af9-ec32-4769-896b-973c59922c03.jpg)
Để bắt đầu bạn hãy tạo một property ở `SecondaryViewController` giống như thế này:
```Swift
var completionHandler:((String) -> Int)?
```
property `completionHandler` có kiểu closure. Closure này là optional, ký hiệu bởi `?` và có `(String) -> Int` nghĩa là closure này có một parameter có kiểu là `String` và return `Int`

Một lần nữa, trong `SecondaryViewController`, chúng ta gọi closure này khi button được tap vào:
```Swift
@IBAction func onButtonTap()
{
    let result = completionHandler?("FUS-ROH-DAH!!!")

    print("completionHandler returns... \(result)")
}
```
Chuyện gì đã xảy ra?
* Closure `completionHandler` được gọi với một argument `String`, kết quả được gán cho `result`
* Kết quả được in ra ngoài với `print()`

Sau đó trong `MainViewController` bạn có thể định nghĩa một closure như thế này:
```Swift
vc.completionHandler = { text in

    print("text = \(text)")

    return text.characters.count
}
```
Đây là closure chính nó. Nó khai báo cục bộ, vì vậy bạn có thể sử dụng tất cả các biến, thuộc tính và hàm cục bộ.

Trong closure parameter `text` được in ra, và sau đó độ dài của string được trả về như kết quả của func.

Đây là nơi nó sẽ trở nên thú vị. Closure cho phép bạn truyền data 2 chiều. Bạn có thể định nghĩa closure, làm việc với data vào và trả ra kết quả với closure.

Bạn có thể nghĩ ở đây là một lệnh gọi func, với delegate hoặc property trực tiếp, cũng cho phép bạn trả về một giá trị cho func.

Closure có thể có ích trong các tình huống sau:
* Bạn không cần một delegate, protocol, bạn chỉ cần tạo một hàm nhanh
* Bạn muốn gọi closure trong nhiều class. Không có closure bạn sẽ phải tạo ra một chuỗi các lệnh gọi hàm. Nhưng với closure bạn có thể truyền vào block code.
* Bạn cần định nghĩa một block code với một closure, bởi vì data bạn muốn làm việc chỉ tồn tại ở cục bộ.

Một trong những rủi ro của việc sử dụng các closure để truyền dữ liệu giữa các ViewController làm code của bạn có thể trở nên dense. Tốt nhất là sử dụng closure cho việc truyền data giữa các ViewController.

Vậy nếu bạn muốn truyền data giữa các ViewController nhưng nó lại không có hoặc không thể có kết nối giữa chúng.
# Passing Data Between View Controllers With NotificationCenter
Bạn có thể truyền dữ liệu giữa các ViewController với NotificationCenter, thông qua class NotificationCenter.

Notification Center xử lý các notifications, và chuyển tiếp notifications tới components nơi mà nó được lắng nghe. Notification Center là iOS SDK tiếp cận Observer-Observable software design pattern. 

### Trong Swift 3+, nó gọi là `NotificationCenter` và không có `NS` phía trước và hãy nhớ rắng `notifications` không phải là push notifications.
![](https://images.viblo.asia/1a829e17-9349-4470-abc7-b0ce1978388d.jpg)
Làm việc với NotificationCenter có 3 ý chính:
* Observing notification
* Gửi notification
* Responding tới notification

Trước tiên hãy bắt đầu với observing notification. Trước khi bạn phản hồi tới notification, bạn cần nói với NotificationCenter rằng nó cần observe nó. Sau đó NotificationCenter nói bới bạn rằng nó notifications nào sẽ được thông qua, bởi vì bạn đã chỉ ra cho bạn rằng bạn đang tìm kiếm nó.

Tất cả notification có tên để định danh nó. Trong `MainViewController` bạn định nghĩa một static property trên đầu của class:
```Swift
static let notificationName = Notification.Name("myNotificationName")
```
Static property này, còn được gọi là class property, nó available bất cứ đâu trong code bằng cách gọi `MainViewController.notificationName`. Đây là cách bạn xác định notification với một hằng số duy nhất. Bạn sẽ không muốn trộn lẫn các notification của mình bằng cách nhập sai ở đâu đó!

Đây là cách bạn observe notification:
```Swift
NotificationCenter.default.addObserver(self, selector: #selector(onNotification(notification:)), name: MainViewController.notificationName, object: nil)
```
Bạn thường thêm nó trong `viewDidLoad()` hoặc `viewWillAppear()` để observation được đăng ký khi ViewController được đưa lên màn hình. Đây là những gì xảy ra trong mẫu mã ở trên:
* Bạn sử dụng `NotificationCenter.default`, dó là default của Notification Center. Bạn cũng có thể tạo riêng Notification Center cho chính bạn, ví dụ cho một loại notification nhất định, nhưng dafault vẫn ổn định hơn.
* Sau đó bạn gọi `addObserver(_:selector:name:object:)`
*  * Argument đầu tiên là instance observation, và nó gần như luôn luôn `self`
* * Argument thứ hai là `selector` bạn muốn gọi khi notification được observed và đây hầu như luôn là một func của class hiện tại.
* * Parameter thứ 3 là tên của notification, nên bạn sẽ truyền vào static constant `notificationName`.
* * Parameter thứ 4 là object nơi mà notifications bạn muốn nhận được. Bạn thường truyền `nil` ở đây nhưng bạn có thể sử dụng nó để chỉ observe notifications từ một object cụ thể.

Tại một thời điểm sau, bạn có thể ngừng observe notifications bằng cách này:
```Swift
NotificationCenter.default.removeObserver(self, name: MainViewController.notificationName, object: nil)
```
Bạn cũng có thể ngừng observe tất cả các notifications với:
```Swift
NotificationCenter.default.removeObserver(self)
```
Hãy nhớ rằng các notifications là rõ ràng, vì vậy bạn luôn observe một loại notification dẫn đến gọi một func trên một object (thường là `self`) khi notification xảy ra.
Func sẽ được gọi khi notification xảy ra là `onNotification (notification:)`, vì vậy, hãy để thêm điều đó vào class:
```Swift
@objc func onNotification(notification:Notification)
{
    print(notification.userInfo)
}
```
`@objc` là từ khoá được yêu cầu đối với Swift 4 +, bởi vì `NSNotificationCenter` là framework Objective-C. Trong func, bạn sẽ chỉ in ra thông báo với `notification.userInfo`.
Sau đó, gửi notification là dễ dàng. Đây là cách bạn làm điều đó:
```Swift
NotificationCenter.default.post(name: MainViewController.notificationName, object: nil, userInfo:["data": 42, "isImportant": true])
```
Lần nữa hay xem lại điều gì xảy ra:
* Bạn gọi func `post(name:object:userInfo:)` trong default NotificationCenter, chính xác cùng một center như bạn đã sử dụng trước đây.
* Argument đầu tiên là tên của notification, static constant mà bạn đã định nghĩa trước đó.
* Argument thứ 2 là object gửi notification. Bạn thường để nó `nil`, nhưng nếu bạn dùng object argument khi observing notification bạn có thể truyền cùng một object ở đây để chỉ observe và gửi cho object.
* Argument thứ 3 là notification payload gọi là `userInfo`. Bạn có thể truyền một dictionary với bất kỳ data ở đây. Trong ví dụ, bạn truyền một vài data và giá trị boolean.

Đó là tất cả để làm nó.

NotificationCenter có ích trong một vài tình huống:
* Các ViewController hoặc các class khác mà bạn muốn truyền dữ liệu mà giữa chúng không có liên kết với nhau.
* Các ViewController không nhất thiết phải tốn tại trước. Nó có thể xảy ra khi REST API và nhận được data trước khi table view đi vào màn hình. Observing notification là optional, nó là một lợi thế.
* Nhiều ViewController có thể phản hồi một notification, hoặc một ViewController muốn phản hồi nhiều notification. NotificationCenter là many-to-many.

Bạn có thể nghĩ về NotificationCenter như một đường cao tốc về thông tin, nơi các notification liên tục được gửi qua các làn đường của nó, theo nhiều hướng và cấu hình.

Nếu bạn muốn sử dụng `local traffic` giữa các ViewController, thì không cần phải sử dụng NotificationCenter, đơn giản là bạn chỉ cần dùng delegate, property hoặc closure. Nhưng nếu bạn muốn liên tục và thường xuyên gửi dữ liệu từ một phần của ứng dụng này sang phần khác, NotificationCenter là một giải pháp tốt.
Phần 1: https://viblo.asia/p/truyen-du-lieu-pass-data-giua-cac-viewcontroller-trong-swift-phan-1-3Q75w8oeKWb

Nguồn: https://learnappmaking.com/pass-data-between-view-controllers-swift-how-to/