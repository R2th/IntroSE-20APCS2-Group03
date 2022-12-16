Delegation, cũng được biết đến với cái tên Delegate pattern, thường được sử dụng trong iOS development. Hôm nay chúng ta sẽ tìm hiểu cách hoạt động của delegate.
# Thế nào là Delegation?
Trong document của Apple thì delegation được định nghĩa như sau:
> Delegation is a design pattern that enables a class to hand off (or “delegate”) some of its responsibilities to an instance of another class.

Có vẻ hơi khó hiểu. Chúng ta hãy chia nhỏ nó ra.

Hãy nghĩ về delegation trong thế giới thật. Tưởng tượng rằng bạn và tôi là một thành phần của team cung cấp bánh socola cho một sự kiện. Bạn chịu trách nhiệm cho việc nướng bánh, và bạn delegate (uỷ thác) việc tạo bánh cho tôi. Mỗi khi tôi làm xong bánh thì bạn có thể sử dụng nó thể nướng bánh.

Một số điểm chính:
* Bạn chịu trách nhiệm nướng bánh và bạn giao việc tạo bánh cho tôi
* Cũng có thể nói rằng việc làm bánh là trách nhiệm của bạn và bạn đang giao một phần trách nhiệm đó cho tôi
* Và nó diễn ra theo hai cách: Tôi đưa cho bạn bột bánh sau khi tôi hoàn thành

Nó không khác là mấy trong Swift programming. Một class delegates một task cho một class khác, xử lý và phản hồi lại kết quả.
# Delegation: Một vài ví dụ trong Swift
Hãy xem một vài ví dụ trong Swift. Đầu tiên chúng ta định nghĩa một `Cookie` struct:
```Swift
struct Cookie {
    var size:Int = 5
    var hasChocolateChips:Bool = false
}
```
và một class gọi là `Bakery`:
```Swift
class Bakery {
    func makeCookie() {
        var cookie = Cookie()
        cookie.size = 6
        cookie.hasChocolateChips = true
    }
}
```
`Bakery` class có một function gọi là `makeCookie()` nó tạo một `cookie` với `Cookie` struct và set vài properties như `size`

Và chúng ta muốn bán bánh theo 3 cách khác nhau:
* Trong tiệm bánh
* Trên website của tiệm bánh
* Nhà phân phối

Bán bánh không phải trách nhiệm của bánh, nhưng sản xuất bánh quy thì có. Vì vậy chúng tôi cần một cách để phân phối bánh sau khi chúng được nướng mà không cần phải viết hết trong class `Bakery`. Vậy delegation sẽ có mặt.

Đầu tiên chúng ta định nghĩa một protocol bao gồm các chức năng mà chúng ta đang xử lý. Như:
```Swift
protocol BakeryDelegate {
    func cookieWasBaked(_ cookie: Cookie)
}
```
`BakeryDelegate` protocol định nghĩa một function `cookieWasBaked(_:)`. Delegate function này sẽ gọi bất cứ khi nào cookie được nướng xong.

Tiếp theo, chúng ta kết hợp delegation vào `Bakery` class.
```Swift
class Bakery {
    var delegate: BakeryDelegate?

    func makeCookie() {
        var cookie = Cookie()
        cookie.size = 6
        cookie.hasChocolateChips = true

        delegate?.cookieWasBaked(cookie)
    }
}
```
2 điều đã thay đổi trong `Bakery` class:
1. `delegate` property của kiểu `BakeryDelegate` đã được thêm vào
2. Function `cookieWasBaked(_:)` gọi trên delegate trong `makeCookie()` với code: `delegate?.cookieWasBaked(cookie)`

Thêm nữa là:
* Type của `delegate` property là protocol chúng ta đã định nghĩa trước. Bạn có thể gán bất cứ giá trị nào vào delegate property, miễn sao nó tuân theo `BakeryDelegate` protocol.
* `delegate` property là optional, và chúng ta sử dụng optional chaining khi gọi `cookieWasBaked(_:)` function. Khi `delegate` là `nil`, thì function sẽ không được gọi.

Tổng kết: bạn định nghịa một `BakeryDelegate` protocol bên trong define một vài nhiệm vụ mà `Bakery` uỷ quyền (delegate), và bạn hiện thực nó trong function `makeCookie()`.

Tiếp theo, hãy tạo một delegate class thực tế.
```Swift
class CookieShop: BakeryDelegate {
    func cookieWasBaked(_ cookie: Cookie) {
        print("Yay! A new cookie was baked, with size \(cookie.size)")
    }
}
```
`CookieShop` tuân theo `BakeryDelegate` protocol, và hiện thực hàm `cookieWasBaked(_:)`.

Cuối cùng ghép lại với nhau:
```Swift
let shop = CookieShop()

let bakery = Bakery()
bakery.delegate = shop

bakery.makeCookie()
// Output: Yay! A new cookie was baked, with size 6
```
Chuyện gì đã xảy ra:
* Đầu tiên, bạn tạo một `CookieShop` object và gán nó vào `shop` constant
* Sau đó bạn tạo một `Bakery` object và gán nó vào `bakery` constant.
* Sau đó bạn gán `shop` vào `bakery.delegate`. Nó làm cho `shop` được uỷ quyền từ `bakery`
* Cuối cùng, khi `bakery` làm ra bánh nó được xử lý bởi `shop`.

Và đó là delegation. Bakery uỷ thác việc bán bánh cho cửa hàng và giao bánh khi nào họ làm xong.

Sức mạnh của delegation là bakery không cần biết bánh của mình sẽ như thế nào, đi đâu. Nó có thể cung cấp cho bất cứ class nào sử dụng protocol `BakeryDelegate`

Bakery không cần biết việc hiện thực của protocol đó, nó chỉ có thể gọi func `cookieWasBaked(_:)` khi nào cần.

Vậy tại sao shop không gọi `makeCookie()` bất cứ khi nào họ cần bán bánh? Câu trả lời nằm ở bản chất của delegate, và class nào điều khiển nó. Bạn sẽ tìm hiểu nó trong phần tiếp theo.
# Delegation trong iOS development
Delegate là một trong những design pattern phổ biến nhất của iOS development.

Một vài class của iOS SDK sử dụng delegation:
* `UITableView` class sử dụng `UITableViewDelegate` và `UITableViewDataSource` protocol để quản lý sự tương tác của tableview, hiển thị cells, và thay đổi layout của table view.
* `CLLocationManager` sử dụng `CLLocationManagerDelegate` để báo cáo dữ liệu liên quan đến vị trí cho ứng dụng của bạn, chặng hạn toạ độ GPS của iPhone.
* `UITextView` sử dụng `UITextViewDelegate` để báo cho bạn về việc thay đổi trong text view, như việc thêm ký tự, thay đổi selection, và khi dừng chỉnh sửa text.

Khi bạn nhìn vào 3 delegate protocol, bạn nhanh chóng thấy một điểm chung: Mỗi event của delegate được khởi tạo bởi class nằm ngoài quyền kiểm soát của bạn, người dùng, sự vận hành của hệ thống hay phần cứng.

Hãy xem:
* Toạ độ GPS được cung cấp bởi GPS chip, và nó delegated cho bạn khi mà chip có sự thay đổi về vị trí GPS
* Một table view sử dụng cơ chế để hiển thị cell trên màn hình, và nó cần bạn cung cấp các cell này khi cần
* Một text view phản hồi thông tin nhập của người dùng và gọi các chức năng delegate tương ứng.

Bạn còn nhớ `Bakery` trong ví dụ trước? Trong ví dụ đó, chúng ta tự gọi `makeCookie()`. Điều này sẽ dẫn đến một tập hợp chuỗi các sự kiện việc tiệm bánh cung cấp bánh quy cho cửa hàng.

Trong iOS development, bakery sẽ tự nướng bánh, Điều đó nằm ngoài tầm kiểm soát của chúng ta, vì vậy chúng ta cần một người được uỷ quyền để phản hồi những sự kiện này.

Nguyên tắc đơn giản này cho thấy sự cần thiết phải delegate, vì nó cho phép bạn tham gia vào các sự kiện và hành động mà bạn không kiểm soát được.

Tưởng tượng bạn không thể thay đổi code trong `Bakery` class, giống với bạn không thể thay đổi code trong `CLLocationManager` class. Bạn không thể nói nó nướng bánh, giống với việc bạn không thể nói `CLLocationManger` để lấy toạ độ GPS của người dùng. Bạn sẽ phải bắt đầu quy trình nướng bánh quy và khởi động dịch vụ định vị, sau đó đợi dữ liệu đến. Bạn nắm bắt dữ liệu này bằng cách sử dụng delegation.
# Một ví dụ với UITextView
Hãy xem ví dụ sau. Bạn tạo một view controller đơn giản để ghi chú. Nó gồm một text view và textview đó sử dụng delegation
```Swift
class NoteViewController: UIViewController, UITextViewDelegate {
    var textView: UITextView =  ...

    func viewDidLoad() {
        textView.delegate = self
    }
}
```
Trong đoạn code trên, chúng ta đang định nghĩa một lớp con của `UIViewController` được gọi là `NoteViewController`. Nó thông qua protocol `UITextViewDelegate` và thiết lập một text view đơn giản với thuộc tính textView. Bạn có thể cho rằng textView này được khởi tạo đúng cách trong `init()`.

Trong func `viewDidLoad()`, bạn đang gán `self` cho property delegate của textView. Nói cách khác, phiên bản hiện tại của `NoteViewController` là delegate của text view.

Theo protocol `UITextViewDelegate`, bây giờ chúng ta có thể triển khai một số function delegate để nhận các sự kiện diễn ra trong text view. Một số function này là:
* textViewDidBeginEditing(_: )
* textViewDidEndEditing( _: )
* textView(_: shouldChangeTextIn: replacementText:)
* textViewDidChange( _: )

Ví dụ: khi việc chỉnh sửa text view bắt đầu và kết thúc, chúng ta có thể biết rằng việc chỉnh sửa đang diễn ra. Khi textViewDidChange (_ :) được gọi, chúng ta có thể cập nhật số lượng ký tự được hiện thị trong textview.

Điều thú vị là `textView (_: shouldChangeTextIn: ReplaceText :)` có thể cung cấp giá trị trả về kiểu Bool. Function delegate này được gọi trước khi một hoặc nhiều ký tự được nhập vào dạng xem văn bản. Nếu bạn trả về true, mục nhập được phép, và nếu bạn trả về false, thì không được phép nhập. Bạn có thể sử dụng cái này để:
* Giới hạn số lượng văn bản có thể được nhập
* Thay thế các từ, cụm từ hoặc ký tự cụ thể bằng một thứ khác
* Cấm người dùng sao chép text vào text view

Điều này cho thấy rằng delegate class có thể truyền dữ liệu trở lại class gọi delegate function (tức là text view hoặc cookie bakery), điều này làm cho nó trở thành một con đường hai chiều. 

Từ đó ta có phần tiếp theo:
# Passing Data ngược trở lại với Delegation
Bạn có thể xem cách truyền data với delegate trong [bài viết](https://viblo.asia/p/truyen-du-lieu-pass-data-giua-cac-viewcontroller-trong-swift-phan-1-3Q75w8oeKWb)
# Tại sao lại sử dụng Delegation?
Tại sao lại sử dụng delegate? Nó có vẻ quá phức tạp, chỉ cần chuyển dữ liệu qua lại trong code của bạn.

Một số lý do ủng hộ việc sử dụng delegate:
* Delegation, và mô hình delegation, là một cách tiếp cận gọn nhẹ để chuyển giao các nhiệm vụ và tương tác từ class này sang class khác.
* Bạn chỉ cần một protocol để giao tiếp các yêu cầu giữa các class. Điều này làm giảm đáng kể việc [ghép nối](https://learnappmaking.com/why-app-architecture-is-important/) giữa các class.
* Và nó phân tách các nhiệm vụ của class tạo ra các tương tác với class phản hồi các nhiệm vụ này.

Nói tóm lại, delegation là một cách tuyệt vời để “tham gia” vào các sự kiện xảy ra trong code mà bạn không kiểm soát, mà không liên kết chặt chẽ code của bạn hoặc giảm khả năng kết hợp.
# Delegation vs. Subclassing
Một sự thay thế cho delegation là subclassing. Thay vì sử dụng người được ủy quyền để nhận cập nhật vị trí GPS từ `CLLocationManager`, bạn chỉ cần subclass manager class đó và phản hồi trực tiếp các cập nhật vị trí.

Điều này có một bất lợi lớn: bạn kế thừa toàn bộ class `CLLocationManager`, cho một thứ đơn giản như lấy một chút dữ liệu vị trí. Bạn sẽ cần override một số function mặc định của nó, mà bạn phải gọi trực tiếp bằng `super` hoặc thay thế hoàn toàn.

Và cuối cùng, subclassing ra một hệ thống phân cấp class kết hợp chặt chẽ, điều này không có ý nghĩa gì trừ khi subclass của bạn có bản chất tương tự như class mà bạn đang subclassing. Điều này sẽ không xảy ra nếu bạn chỉ phản hồi với các cập nhật vị trí GPS.
# Delegation vs. Notification Center
Còn Observer pattern, như trong `NotificationCenter`, như một sự thay thế cho delegate? Nó có thể hoạt động: chẳng hạn như bạn sẽ phản hồi những thay đổi có thể quan sát được trong một đối tượng Vị trí.

Observer pattern hữu ích khi code của bạn cần giao tiếp với nhiều thành phần, với mối quan hệ một-nhiều hoặc nhiều-nhiều. Một thành phần trong ứng dụng của bạn phát tín hiệu mà nhiều thành phần khác phản hồi. Và ngoài một loại truyền phát và một số dữ liệu liên quan, bạn không thể chính thức hóa các yêu cầu đối với giao tiếp như một protocol có thể.
# Delegation vs. Closures
Một thay thế khả thi cho mô hình delegate chỉ đơn giản là sử dụng các closure. Thay vì gọi một delegation function, class delegate gọi một closure đã được xác định trước như một property trên lớp delegation.

Ngày càng có nhiều class và thành phần SDK iOS hiện đang cung cấp closure thay thế cho việc delegate và [target-action](https://learnappmaking.com/target-action-swift/), chẳng hạn như Timer.

Sử dụng closure function để chuyển giao có những lợi thế tương tự như sử dụng delegate (linh hoạt, nhẹ, tách rời). Nhưng sử dụng closure có một nhược điểm chính: chúng khó quản lý và tổ chức nếu bạn sử dụng quá nhiều. [Promise](https://learnappmaking.com/promises-swift-how-to/) hoặc `async / await` là một cách tiếp cận hữu ích để quản lý nhiều async closure.

Và, một điều cuối cùng trước khi bạn bắt đầu ... Một sai lầm điển hình của người mới bắt đầu là đặt ViewController làm delegate của mọi thứ. Bạn không cần phải làm như vậy!

Một số lựa chọn thay thế:
* Tạo một class delegate riêng biệt, một controller, chịu trách nhiệm phản hồi các delegate function
* Sử dụng các extension của Swift để phân tách code của bạn, tạo mỗi delegate là một extension
* Tóm tắt nhiều delegate function vào một controller (hoặc "manager") và sử dụng các closure function để phản hồi dữ liệu chi tiết mà bạn thực sự cần.

Vậy, tóm tắt:
* Delegation nhẹ hơn subclassing, vì bạn không phải kế thừa một class hoặc struct
* Delegation hữu ích cho các mối quan hệ 1-1, trong khi mẫu Observer phù hợp hơn cho các mối quan hệ một-nhiều và nhiều-nhiều.
* Delegation rất linh hoạt, vì nó không yêu cầu class ủy quyền biết bất cứ điều gì về class được ủy quyền - chỉ rằng nó tuân thủ một protocol
* Closure là một thay thế khả thi cho việc delegation nếu base class hỗ trợ chúng, miễn là bạn giữ closure đơn giản.
* Đừng đặt view controller làm delegate của mọi thứ; sử dụng một class riêng biệt hoặc extension hoặc một class trợ giúp để phân tách function delegation

Bài viết đến đây là kết thúc

Source: https://learnappmaking.com/delegation-swift-how-to/