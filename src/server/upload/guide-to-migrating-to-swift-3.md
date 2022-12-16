Migrating to Swift 3 có vẻ hơi khó khăn tuỳ thuộc vào size của dự án, nhưng với các bước và phương pháp thích hợp thì việc migrating swift 3 sẽ dễ dàng hơn. Xcode 8.2 là phiên bản cuối cùng hỗ trợ swift 2.3, và đây cũng là công cụ để migrating swift 3.
Tất cả những thay đổi lớn của Swift 3 có thể được tìm thấy trên trang [web Swift 3](https://swift.org/blog/swift-3-0-released/). Xcode 8 được tích hợp sẵn Swift migration tool để giúp tự động chuyển đổi. Trước khi bạn sử dụng tool này thì có một số điều quan trọng cần xem xét.
* Bạn phải đảm bảo rằng tất cả test của bạn đều pass và dự án của bạn compiles thành công
* Đảm bảo mọi thư viện của third-party đã sẵn sàng cho Swift 3 (Nếu bạn đang sử dụng [CocoaPods](https://cocoapods.org), bạn sẽ muốn kiểm tra xem liệu chúng đã được cập nhật lên Swift 3 chưa)
* Theo Swift Migration Guide, bạn nên có một scheme để build tất cả các targets của dự án.
## Running the Migrator
Bước đầu tiên để bắt đầu quá trình chuyển đổi Swift 3 là khởi động Migrator.
Khi bạn lần đầu tiên khởi chạy dự án Swift 2.2 trong Xcode 8, bạn sẽ được nhắc run migrator. Nếu bạn đã cập nhật lên Swift 2.3, bạn sẽ cần phải vào Edit> Convert> To Current Swift Syntax ...
![](https://images.viblo.asia/efc6e2f0-85e8-4561-a878-aca5dfed685a.png)

Từ đó chọn Convert to Swift 3, chọn scheme của bạn và hoàn tất các bước trong assistant migrator ..

![](https://images.viblo.asia/21b73f4f-8e34-42f7-bfa3-8f0aaa157b56.png)
## Swift 3 Migration Complete?
Migration tool không quá hoàn hảo, rất có thể sẽ có một số error và warning mà bạn gặp phải và phải giải quyết thủ công.
Có một điều cần nhớ là có nhiều lỗi tương tự nhau mà migration tool bị miss - Sử dụng “Find and Replace” sẽ giúp bạn giảm thời gian cho những thay đổi lặp đi, lặp lại.
## Private & FilePrivate
Điều đầu tiên bạn cần làm là thay thế "private" bằng "fileprivate". fileprivate trong swift 3 có cùng ngữ nghĩa với private của phiên bản swift trước đó. Do đó migration tool sẽ thay đổi "private" thành "fileprivate". Tuy nhiên, phần lớn ta thường muốn dùng private. Đó là hạn chế hơn fileprivate vì vậy tốt hơn là mặc định để sử dụng private và sau đó chỉ sử dụng fileprivate khi cần thiết.
## Public vs Open
* Open class có thể truy cập, subclassable và overridable bên ngoài module định nghĩa class đó.
* Public classes có thể truy cập nhưng không thể subclassable hoặc overridable bên ngoài module định nghĩa class đó.
Nếu bạn muốn class của bạn conform public mà không cần subclassed or overridden ở ngoài module thì bạn nên dùng public, nếu không thì sử dụng open khi cần thiết.
Open access là cấp độ truy cập cao nhất và ít hạn chế nhất, còn private quyền truy cập hạn chế nhất. Tham khảo thêm ở [Apple's Developer Site](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AccessControl.html)
## Unused Results Warning
Nếu bạn có một method trả về giá trị, nhưng giá trị đó lại không được sử dụng - bạn sẽ nhận được warning này. Hãy thử một trong những cách sửa lỗi dưới đây
* Thêm "@discardableResult" trước khai báo hàm nếu giá trị trả về của hàm là có tầm quan trọng thứ yếu.
* Bạn không cần phải thêm "@discardableResult" vào hàm. Thay vào đó, hãy gán giá trị trả về cho dấu gạch dưới. Điều này làm cho nó rõ ràng rằng bạn biết rằng phương thức trả về một giá trị nhưng bạn không cần sử dụng giá trị đó:
```
 _ = someMethodThatReturnsSomething()
```
## Other Common Errors
Dưới đây là một số mục phổ biến khác mà bạn có thể “Find and Replace” nếu migration tool bỏ qua nó. Đây chỉ là vài ví dụ. Khi bạn bắt đầu thực hiện cập nhật, bạn sẽ gặp các trường hợp khác mà bạn có thể sử dụng “Find and Replace”
![](https://images.viblo.asia/f2c16e16-e8dc-4a6c-b425-51861ca087d3.png)
## Method Parameters
Trong Swift 2.2, tham số đầu tiên của chúng ta trong một method có thể là optional, sau khi chuyển sang Swift 3 không còn trường hợp này nữa. Mỗi thông số được yêu cầu phải được chỉ định, bạn có thể xem ví dụ dưới đây:
```
// Pre-Swift 3:
func numberOfSectionsInTableView(tableView: tableView) -> Int
NSTimer.scheduledTimerWithTimeInterval(1, target: self, selector:#selector(kitchenTimer) ,userInfo: nil, repeats: false)

// Swift 3:
func numberOfSections(in tableView: tableView) -> Int
Timer.scheduledTimer(timeInterval: 1, target: self, selector:#selector(kitchenTimer), userInfo: nil, repeats: false)
```
## Incorrectly Migrated OptionSet Types
Migration tool có thể đã không thay đổi vị trí của các OptionSets được sử dụng. Ví dụ:
```
UIView.animateWithDuration(1.0, delay: 0.0, options: .CurveEaseInOut, animations: { ... }, completion: nil)
```
Function đúng phải là:
```
UIView.animate(withDuration: 1.0, delay: 0.0, options: UIViewAnimationOptions(), animations: { ... }, completion: nil)
```
## Additional Changes
Có thể có nhiều thay đổi mà bạn gặp phải khi migrate swift 3. Bạn có thể tham khảo [official Swift Migration Guide](https://swift.org/migration-guide-swift4/)  , ở đó bạn có thể tìm thấy thông tin về thư viện, các vấn đề migration và thông tin về từng bản cập nhật đối với ngôn ngữ Swift.
Hy vọng bài viết sẽ có ích với các bạn.