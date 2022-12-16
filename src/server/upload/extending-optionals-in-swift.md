Một điều mà hầu hết các ngôn ngữ lập trình hiện đại đều có điểm chung là chúng cung cấp một số dạng hỗ trợ ở language-level để thể hiện các giá trị optionals. Thay vì có nguy cơ gặp sự cố hoặc các lỗi runtime khác khi thiếu giá trị, các ngôn ngữ như Swift cho phép chúng ta tận dụng trình biên dịch để xác minh rằng các kiểm tra đúng đã được thực hiện và chúng tôi đã unwrap bất kỳ giá trị nào được xác định là optional.
Một khía cạnh trong việc triển khai các tùy chọn của Swift, đó là một phần lớn tính năng này được triển khai bằng system type - vì tất cả các giá trị optional thực sự được biểu diễn bằng enum Tùy chọn <Wrapping>. Điều đó mang lại cho chúng ta một số khả năng thú vị, vì chúng ta có thể mở rộng enum đó - giống như bất kỳ loại nào khác - để thêm API tiện lợi của riêng chúng ta và các loại chức năng khác.
Trong bài viết này, chúng ta sẽ tìm hiểu cách giải quyết các giá trị optional nhất định theo một cách tốt hơn.
## Converting nil into errors
Khi làm việc với các giá trị optional, một cách rất phổ biến là chuyển đổi một giá trị nil thànhSwift error thích hợp, sau đó có thể được truyền đi và hiển thị cho người dùng. Ví dụ: ở đây chúng ta đang chuẩn bị một hình ảnh sẽ được upload lên máy chủ của chúng ta thông qua một loạt các hoạt động. Vì mỗi thao tác có thể trả về nil, chúng ta sẽ hủy kết quả của từng bước, đưa ra lỗi nếu gặp phải giá trị nil - như thế này:
```
func prepareImageForUpload(_ image: UIImage) throws -> UIImage {
    guard let watermarked = watermark(image) else {
        throw Error.preparationFailed
    }

    guard let encrypted = encrypt(watermarked) else {
        throw Error.preparationFailed
    }

    return encrypted
}
```
Với đoạn code trên, hãy xem liệu chúng ta có thể sử dụng sức mạnh của các extension để làm cho nó ngắn gọn hơn một chút không. Trước tiên, hãy tạo một extension trên loại enum Optional cho phép chúng ta trả về unwraped value hoặc đưa ra error trong trường hợp có chứa nil, như sau:
```
extension Optional {
    func orThrow(
        _ errorExpression: @autoclosure () -> Error
    ) throws -> Wrapped {
        guard let value = self else {
            throw errorExpression()
        }

        return value
    }
}
```
Sử dụng cách trên, cùng với một chút optional chaining bằng cách sử dụng FlatMap, giờ đây chúng ta có thể xây dựng một "chain of operations" cho phép chúng ta xử lý mọi error phát sinh từ các giá trị nil và dễ dàng chuyển đổi bất kỳ giá trị nil nào thành một error thích hợp - như thế này:
```
func prepareImageForUpload(_ image: UIImage) throws -> UIImage {
    return try watermark(image)
        .flatMap(encrypt)
        .orThrow(Error.preparationFailed)
}
```
Với đoạn code như trên có vẻ như là một sự thay đổi hoàn toàn cách xử lý, nhưng nó cho phép chúng ta tăng khả năng dự đoán mã của mình bằng cách mô hình hóa nó như một chuỗi các hoạt động - thay vì phải theo dõi nhiều biến cục bộ.
## Expressive checks
Một kịch bản phổ biến khác khi làm việc với optionals là muốn thực hiện một số loại kiểm tra về unwrapped value. Ví dụ: khi triển khai giao diện người dùng, chúng ta có thể muốn thay đổi border color của từng textfield bất cứ khi nào text của nó thay đổi - tùy thuộc vào việc chuỗi đó hiện có rỗng không:
```
extension FormViewController {
    @objc func textFieldDidChange(_ textField: UITextField) {
        // Vì thuộc tính text của text field là một optional
        // Chúng ta cần cung cấp giá trị mặc định ở đây
        if textField.text?.isEmpty ?? true {
            textField.layer.borderColor = UIColor.red.cgColor
        } else {
            textField.layer.borderColor = UIColor.green.cgColor
        }
    }
}
```
Sử dụng một giá trị mặc định khi một optional là nil, như chúng ta làm ở trên, thường là một giải pháp tốt khi được sử dụng trong một ngữ cảnh rõ ràng - nhưng nó cũng có thể dẫn đến việc code trở nên khó đọc hơn do cú pháp cần thiết phải thêm sau này. Vì việc kiểm tra xem một chuỗi có nil hay không là một hoạt động phổ biến - hãy xem lại nếu chúng ta có thể cải thiện khả năng đọc của code mình bằng cách sử dụng extension trên Optional.
Lần này, chúng tôi sẽ thêm một thuộc tính được gọi là isNilOrEmpty cho tất cả các optionals, trong đó về cơ bản chúng ta thực hiện kiểm tra giống như chúng ta đã làm ở trên:
```
extension Optional where Wrapped: Collection {
    var isNilOrEmpty: Bool {
        return self?.isEmpty ?? true
    }
}
```
Nếu bây giờ chúng ta cập nhật code xử lý trường textfield ở ví dụ trước để sử dụng thuộc tính mới của mình, chúng tôi sẽ có một control flow tốt hơn và dễ đọc hơn:
```
extension FormViewController {
    @objc func textFieldDidChange(_ textField: UITextField) {
        if textField.text.isNilOrEmpty {
            textField.layer.borderColor = UIColor.red.cgColor
        } else {
            textField.layer.borderColor = UIColor.green.cgColor
        }
    }
}
```
Lợi ích của việc sử dụng các extension trên Optional để triển khai các API tiện lợi là chúng ta có thể dễ dàng sử dụng lại các API đó trong nhiều ngữ cảnh khác nhau. Ví dụ: chúng ta có thể muốn kiểm tra xem một tập hợp các bước tutorial đã hoàn thành là nil hoặc rỗng để xác định màn hình ban đầu nào sẽ hiển thị cho người dùng hoặc sử dụng cùng API để kiểm tra xem người dùng có thêm bạn bè nào trong ứng dụng của chúng ta không:
```
let showInitialTutorial = completedTutorialSteps.isNilOrEmpty
let hasAddedFriends = !user.friends.isNilOrEmpty
```
Sử dụng các extension để wrap các biểu thức phổ biến nhất định cũng có thể là một cách tuyệt vời để làm cho code của chúng ta tự dễ hiểu hơn, vì ý định của các biểu thức đó trở nên rõ ràng.
## Matching against a predicate
Tiếp theo, chúng ta hãy xem làm thế nào để có thể thêm các khả năng phù hợp cho các optionals. Giống như cách trước đây chúng tôi đã kiểm tra xem các collection có nil không, thông thường thì ta muốn khớp giá trị của optionals với một biểu thức tùy chỉnh trong khi optional này chưa được unwrapped.
Ví dụ: Ở đây chúng ta muốn unwrap search text của thanh tìm kiếm, sau đó xác minh rằng nó chứa ít nhất 3 ký tự trước khi thực hiện search:
```
guard let query = searchBar.text, query.length > 2 else {
    return
}

performSearch(with: query)
```
Đoạn mã trên hoạt động, nhưng hãy xem liệu chúng ta có thể làm cho nó tốt hơn một chút hay không bằng cách cho phép bất kỳ optional nào được khớp với một predicate truyền vào. Để làm điều đó, hãy thêm một phần optional extension khác. Hàm này thêm một hàm gọi là *matching*, với một predicate dưới dạng closure trả về Bool sau khi được truyền một giá trị optional chưa được unwrap:
```
extension Optional {
    func matching(_ predicate: (Wrapped) -> Bool) -> Wrapped? {
        guard let value = self else {
            return nil
        }

        guard predicate(value) else {
            return nil
        }

        return value
    }
}
```
Với code ở trên, bây giờ chúng ta có thể làm cho code xử lý search bar của chúng ta tốt hơn và dễ đọc hơn, bằng cách xây dựng một chuỗi các biểu thức optional khác. Trước tiên, chúng ta sử dụng *matching* API mới của mình để kiểm tra xem text của search có khớp với yêu cầu về độ dài của chúng ta hay không, và sau đó chúng tôi map kết quả của hoạt động đó vào phương thức PerformanceSearch của chúng ta - như thế này:
```
searchBar.text.matching { $0.count > 2 }
              .map(performSearch)
```
Với cách tiếp cận trên, ta có thể match một optional nhất định với các predicates khác nhau. Sử dụng câu lệnh guard với danh sách điều kiện dài có thể nhanh chóng trở nên lộn xộn, nhưng với chức năng matching mới của chúng ta, giờ đây chúng ta có một cách dễ dàng để xâu chuỗi nhiều predicate lại với nhau - như trong ví dụ này khi chúng ta xác minh rằng bản ghi cơ sở dữ liệu phù hợp với hai yêu cầu khác nhau :
```
let activeFriend = database.userRecord(withID: id)
    .matching { $0.isFriend }
    .matching { $0.isActive }
```
## Assigning reusable views
Cuối cùng, chúng ta hãy xem làm thế nào chúng ta có thể mở rộng optional type để làm việc tốt hơn với reusable views. Một pattern phổ biến trong các Apple's UI frameworks là dành cho các views để cung cấp các "slot" nhất định, trong đó chúng ta với tư cách là người dùng API có thể chèn các custom subviews của riêng mình. Ví dụ: *UITableViewCell* cung cấp thuộc tính accessoryView cho phép chúng ta đặt bất kỳ view nào chúng ta muốn ở trailing edge của cell - cực kỳ tiện lợi khi xây dựng danh sách tùy chỉnh.
Tuy nhiên, vì các slot đó cần hỗ trợ bất kỳ loại view nào, loại mà chúng tôi đang xử lý thường là Optional<UIView> - có nghĩa là chúng ta hầu như luôn phải thực hiện chuyển đổi giá trị của một view nào đó thành loại view của chúng ta, dẫn đến phải sử dụng *if let* trông giống như thế này:
```
if let statusView = cell.accessoryView as? TodoItemStatusView {
    statusView.status = item.status
} else {
    let statusView = TodoItemStatusView()
    statusView.status = item.status
    cell.accessoryView = statusView
}
```
Đây là một tình huống khác trong đó một extension trên optionals có thể có ích rất nhiều. Chúng ta hãy viết một phần extension trên tất cả các optional wrap một UIView và một lần nữa sử dụng sức mạnh của *@autoclosure* để cho phép chúng ta chuyển một biểu thức tạo ra một view mới nếu cần, chỉ được sử dụng trong trường hợp chúng ta có nhiều view cần check:
```
extension Optional where Wrapped == UIView {
    mutating func get<T: UIView>(
        orSet expression: @autoclosure () -> T
    ) -> T {
        guard let view = self as? T else {
            let newView = expression()
            self = newView
            return newView
        }

        return view
    }
}
```
Sử dụng extension ở trên, giờ đây chúng ta có thể tạo ra code cấu hình cell tốt hơn rất nhiều, chuyển đổi nó thành 2 dòng code đơn giản như sau:
```
let statusView = cell.accessoryView.get(orSet: TodoItemStatusView())
statusView.status = item.status
```
Bây giờ ta có thể làm cho code của chúng ta rõ ràng hơn bằng cách thay thế các điều kiện if and else bằng các biểu thức được xác định rõ ràng. Bằng cách wrap expressions và operations phổ biến trong Optional extensions, chúng ta sẽ làm cho code xử lý các tùy chọn rõ ràng và dễ hiểu hơn.

Hy vọng bài viết sẽ có ích với các bạn.

Reference: https://www.swiftbysundell.com/posts/extending-optionals-in-swift