Phần 2 này là 1 phần trong serie bài hướng dẫn của việc sử dung linh hoạt view controller
1. How to use the coordinator pattern in iOS apps
2. How to move data sources and delegates out of your view controllers
3. How to move view code out of your view controllers

1 cách đơn giản để tạo nên rắc rối và khó hiểu view controller là việc bỏ qua nguyên tắc trách nhiệm duy nhất - nghĩa là mỗi phần của phần mềm của bạn nên chịu trách nhiệm 1 thứ vào 1 thời điểm.
Dễ nhận ra rằng bạn đang bỏ qua điều này với việc code như thế này

```
class MegaController: UIViewController, UITableViewDataSource, UITableViewDelegate, UIPickerViewDataSource, UIPickerViewDelegate, UITextFieldDelegate, WKNavigationDelegate, URLSessionDownloadDelegate {
```

Nếu tôi hỏi bạn view controller đang làm gì, có thể bạn sẽ mất thời gian để suy nghĩ?
Tôi đang không nói rằng bạn phải đem mọi thứ sử dụng trách nhiệm đơn - thỉnh thoảng phát triển từng phần sẽ ngăn cho điều đó xáy ra, bạn sẽ sớm biết thôi.

Tuy nhiên, không lý do nào khiến cho view controller nên sử dụng như nhiều delegate và data souirce, trong thực tế đều đó sẽ khiến view controlle của bạn ít tổ hợp và tái sử dụng hơn. Nếu bạn tách các giao thức đó thành các đối tượng riêng biệt thì bạn có thể sử dụng lại các đối tượng đó trong các view controllerc hoặc sử dụng các đối tượng khác nhau trong cùng một view controller nhìn để có xử lý khác nhau trong thời gian chạy - đó là một bước tiến lớn.

Trong bài viết này tôi muốn hướng dẫn bạn qua các ví dụ về việc lấy các data source phổ biến và các delegate ra khỏi view controller theo cách mà bạn có thể áp dụng cho các dự án của riêng bạn mà không gặp nhiều khó khăn.
Trước khi bắt đầu, hãy sử dụng Xcode tạo 1 ứng dụng iOS sử dụng mẫu Master-Detail. Điều này tạo nên mẫu ứng dụng khá tệ vì nhiều lý do và nó là nền tảng chắp vá khó sử dụng cho bất cứ công việc nào của bạn. 

Tôi có thể viết nhiều bài viết về việc xử lý vấn đề mà nó mang lại, nhưng ở đây chúng ta sẽ cố gắng xử lý ít công việc cần thiết để khắc phụ 2 vấn đề của nó: View controller chính đóng vai trò data source và delegate của tableview.

Bài viết này sẽ chứa 1 số nội dung từ cuốn sách của tôi Swift Design Pattens - nó sẽ chỉ cho bạn cách viết mã MVC, nhưng cũng chỉ ra lý do mọi thứ hoạt động như cách họ làm và bằng cách nào bạn có thể sử dụng các kỹ thuật này, đã được kiểm tra thời gian ứng dụng.

## Tách data source

Mẫu mặc định của Apple có mã trong MasterViewController.swift để thực hiện hoạt động đó với tư cách là delegate của tableview. Mặc dù điều này tốt cho các ứng dụng đơn giản hoặc trong khi bạn học, nhưng đối với các ứng dụng 
thực sự, bạn nên luôn luôn (luôn luôn) tách nó thành lớp riêng để có thể sử dụng lại khi cần.

Quá trình ở đây khá đơn giản, hãy từng bước thực hiện  nó.

Đầu tiên, vào menu File và chọn New> File. Chọn Cocoa Touch Class từ danh sách mà Xcode cung cấp cho bạn, sau đó nhấn Next. Tạo nó là một lớp con của `NSObject`, đặt tên là ObjectDataSource, sau đó nhấn Next và Create.

**Lưu ý**: Tôi đã gọi nó là "ObjectDataSource", vì mã mẫu Apple Apple đã cho chúng ta `var object = [Any] ()` cho dữ liệu ứng dụng. Đây là một trong nhiều luật mà chúng ta không được thay đổi.

Bước tiếp theo là chuyển tất cả data source của MasterViewController.swift sang ObjectDataSource.swift. Vì vậy, chọn tất cả mã này và cắt nó vào clipboard của bạn:

```
// MARK: - Table View

override func numberOfSections(in tableView: UITableView) -> Int {
    return 1
}

override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return objects.count
}

override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath)

    let object = objects[indexPath.row] as! NSDate
    cell.textLabel!.text = object.description
    return cell
}

override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
    // Return false if you do not want the specified item to be editable.
    return true
}

override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
    if editingStyle == .delete {
        objects.remove(at: indexPath.row)
        tableView.deleteRows(at: [indexPath], with: .fade)
    } else if editingStyle == .insert {
        // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view.
    }
}
```
 
Không còn xử lý bất cứ điều gì bên trong view controller, nên hãy mở ObjectDataSource.swift và dán nó bên trong lớp.

Chúng ta cần làm 3 thay đổi nhỏ tới `ObjectDataSource` trước khi chúng ta sử dụng:
1. Bỏ `override`khỏi tất các phương thức định nghĩa. Trước đây chúng là yêu cầu với view controller của chúng ta bởi vì chúng ta kế thừa từ `UITableViewController`, nhưng giờ thì không.
2. Khiến lớp phù hợp với `UITableViewDataSource`bằng việc thêm bên phải `NSObject` ví dụ như `class ObjectDataSource: NSObject, UITableViewDataSource {`.
3. Chuyển `var objects = [Any]()` từ là thuộc tính trong `MasterViewController ` thành thuộc tính của `ObjectDataSource`

Vậy là đã hoàn thành `ObjectDataSource`, nhưng trong `MasterViewController` vẫn còn vấn đề bởi nó vẫn truy vấn 1 mảng `objects` không còn tồn tại nữa.

Để sửa điều này chúng ta phải thay đổi 2 thứ bên trong `MasterViewController` đem lại cho nó 1 thuộc tính data source được sử dụng lớp `ObjectDataSource`, sau đó truy vấn data source bất cứ khi nào  `object` được sử dụng.

Đầu tiên, mở MasterViewController.swift và thêm 1 thuộc tính mới 

```
var dataSource = ObjectDataSource()
```

Sau đó, thay đổi 2 truy vấn tới `objects` thành `dataSource.objects`. Điều nghĩa là thay đổi `insertNewObject` thành:

```
dataSource.objects.insert(NSDate(), at: 0)
```

Và thay đổi phương thức `prepare()` :

```
let object = dataSource.objects[indexPath.row] as! NSDate
```

Mẫu code của Apple khá nghèo nàn, nhưng nhớ rằng chúng ta đang cố gắng xử lý ít nhất phần lớn công việc yêu cầu việc xử lý 2 vấn đề này.

Ở điểm này, code biên dịch khá sạch, nhưng nó vẫn chưa thực sự chạy. Chúng ta cần thay đổi cuối cùng bên trong phương thức `viewDidLoad()` trong `MasterViewController`. Thêm dòng này:

```
tableView.dataSource = dataSource
```

Sự khác biệt là bộ điều khiển khung nhìn đã giảm từ 84 dòng mã xuống còn 54 dòng mã, cộng với bây giờ bạn có thể sử dụng nguồn dữ liệu đó ở nơi khác

## Tách delegate

Bạn đã thấy cách thức của nó khá đơn giản để có được data source table view của object nó, vì vậy bạn rất có thể nghĩ rằng chúng tôi sẽ tạo một đối tượng khác làm delegate của tableview.. Tuy nhiên, đây là vấn đề phức tạp hơn vì hai lý do:

1. Delegate thường cần liên kết với datasource để làm bất cứ điều gì. Ví dụ, khi một ô được chạm, bạn cần lấy datasoucre để xử lý tiếp bên trong.

2. Sự phân chia giữa `UITableViewDataSource` và `UITableViewDelegate` rất kỳ cục và khó kiểm soát. Ví dụ: data source có `titleForHeaderInSection` trong khi delegate có `viewForHeaderInSection` và `heightForRowAt`.

Nghĩa là việc tách `UITableViewDelegate` khỏi lớp của nó sẽ gây ra khó khăn. Để giải quyết, tôi gợi ý 2 giải pháp:
1.  Kết hợp  `UITableViewDataSource` và `UITableViewDelegate` xử lý bên trong 1 lớp đơn. Nó đi ngược lại với quy tắc trách nhiệm đơn, nhưng nó sử xử lý vấn đề lớn hơn 1 cách mượt mà.
2.  Đưa delegate vào bên trong view controller của bạn. Nó không thực sư là 1 giải pháp tệ miễn là triển khai phương thức không quan trọng - không khác gì việc trả về các giá trị hoặc gọi cho coordinator. Nếu bạn định thêm các logic công việc, bạn nên nghĩ lại. 

Nó phụ thuộc vào phong cách làm việc cá nhân của bạn, nhưng trong dự án của tôi tôi khuyến nghị giữ view controllers đơn giản nhất có thể. Nghĩa là chúng ta sẽ xử lý sự kiện vòng đời  (`viewDidLoad()`, etc), lưu giữ `@IBOtlets` và `IBActions` và lưu trữ mô hình dữ liệu tùy vào việc đang làm.

Nhớ rằng: Chìa khóa ở đay là khiến cho thiết kế ứng dụng của bạn đơn giản, duy trì tốt hơn và linh hoạt hơn - nếu bạn khiến cho phức tạp chỉ để tránh thay đổi, bạn sẽ lại gặp vấn đè.

## Delegate đơn giản hơn

Mặc dù `UITableViewDelegate` và `UITableViewDataSource` rất klhos để phân tách rõ ràng, nhưng không phải delegate nào cũng thế. Thay vào đó, rất nhiều delegate dễ dàng xử dụng bên trong các lớp, và ngay lập tức bạn sẽ thấy được lợi ích việc tái sử dụng mà bạn đã thấy.

Hãy cùng làm 1 ví dụ: Bạn muốn nhúng 1 `WKWebView` để cho phép quyền truy cập để xử lý nhưng website an toàn cho bọn trẻ. Đơn giản bạn thêm `WKNavigationDelegate` cho view controller của bạn, đem mảng `childFriendlySites` như 1 thuộc tính, sau đó viết 1 phương thức delegate kiểu như này:

```
func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
    if let host = navigationAction.request.url?.host {
        if childFriendlySites.contains(where: host.contains) {
            decisionHandler(.allow)
            return
        }
    }

    decisionHandler(.cancel)
}
```

(Nếu bạn chưa từng sử dụng `contains(where:)` trước đó, bạn nên thực sự đọc cuốn sách của tôi [Pro Swift](https://www.hackingwithswift.com/store/pro-swift).)

Để nhắc lại, cách tiếp cận đó hoàn toàn tốt khi bạn xây dựng một ứng dụng nhỏ, bởi vì bạn vừa học vừa cần khuôn mẫu, hoặc vì bạn đã xây dựng một nguyên mẫu và chỉ muốn xem những gì hoạt động.

Tuy nhiên, đối với bất kỳ ứng dụng lớn nào - đặc biệt là những ứng dụng bị điều khiển bởi view controller phức tạp - bạn nên phân tách mã này thành loại riêng:

1. Tạo một lớp Swift mới gọi là `ChildFriendlyWebDelegate`. Nó cần kế thừa từ NSObject để nó có thể hoạt động với WebKit và tuân thủ `WKNavlationDelegate`.
2. Thêm một nhập khẩu cho WebKit vào tệp.
3. Đặt thuộc tính `conFriendlySites` của bạn và delegate điều hướng hướng trong đó.
4. Tạo một đối tượng của `ChildFriendlyWebDelegate` trong view controller của bạn và biến nó thành delegate điều hướng của web view của bạn.

Đây là ví dụ đơn giản về những điều trên:
```
import Foundation
import WebKit

class ChildFriendlyWebDelegate: NSObject, WKNavigationDelegate {
    var childFriendlySites = ["apple.com", "google.com"]

    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        if let host = navigationAction.request.url?.host {
            if childFriendlySites.contains(where: host.contains) {
                decisionHandler(.allow)
                return
            }
        }

        decisionHandler(.cancel)
    }
}
```

Nó đã giải quyết vấn đề tương tự, trong khi giải quyết phần phức tạp khỏi view controller của chúng ta. Nhưng ban có thể - và nên - tiến 1 bước xa hơn, như này: 

```
func isAllowed(url: URL?) -> Bool {
    guard let host = url?.host else { return false }

    if childFriendlySites.contains(where: host.contains) {
        return true
    }

    return false
}

func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
    if isAllowed(url: navigationAction.request.url) {
        decisionHandler(.allow)
    } else {
        decisionHandler(.cancel)
    }
}
```

Điều này tách biệt logic công việc của bạn (Trang web này có được phép sử dụng không? Tôi đã nói điều đó trước đây nhưng nó quan trọng để nhắc lại: bất kỳ mã điều khiển nào đóng gói bất kỳ knowledge nào - bất cứ điều gì ngoài việc gửi lại một giá trị đơn giản trong một phương thức - sẽ khó kiểm tra hơn khi chạm vào giao diện người dùng. Trong mã được cấu trúc lại này, tất cả các kiến thức được lưu trữ trong phương thức `isALLowed()`, do đó, nó dễ dàng kiểm tra.

Thay đổi này đã giới thiệu một cải tiến khác, ứng dụng hơn nhưng không kém phần quan trọng đối với ứng dụng của chúng ta: nếu bạn muốn người giám hộ của trẻ nhập mật mã của họ để mở khóa toàn bộ web, giờ đây bạn có thể kích hoạt điều đó chỉ bằng cách đặt `webView.navlationDelegate` thành `nil` để tất cả các trang web được cho phép.

Kết quả cuối cùng là một view controller đơn giản hơn, mã dễ kiểm tra hơn và chức năng linh hoạt hơn.

Vậy là đã hết bài phần 2. Hẹn gặp các bạn ở phần 3.