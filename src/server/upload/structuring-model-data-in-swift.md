Việc thiết lập một cấu trúc vững chắc trong một code base là điều cần thiết để làm việc dễ dàng hơn. Tuy nhiên, việc đạt được một cấu trúc vừa đủ để ngăn chặn các bugs và problems, đủ linh hoạt cho các tính năng hiện có và bất kỳ thay đổi nào trong tương lai mà chúng ta muốn thực hiện có thể rất khó khăn.
Xu hướng này đặc biệt đúng đối với model code, thường được sử dụng bởi nhiều tính năng khác nhau, mỗi tính năng có các yêu cầu riêng. Trong bài viết này, chúng ta hãy xem xét một vài kỹ thuật khác nhau để cấu trúc dữ liệu tạo nên các model cốt lõi của chúng ta và cách cải thiện cấu trúc đó có thể có tác động tích cực lớn đến phần còn lại trong code base của chúng ta.
## Forming hierarchies
Khi bắt đầu một dự án, các model thường khá đơn giản. Vì chúng ta chưa thực hiện nhiều tính năng, nên các model của chúng ta hầu như không bắt buộc phải chứa nhiều dữ liệu. Tuy nhiên, khi code base của chúng ta phát triển, các model của chúng ta cũng phát triển theo chiều hướng phức tạp hơn.
Ví dụ, chúng ta đang xây dựng một ứng dụng email sử dụng message model để theo dõi từng message. Ban đầu model chỉ chứa subject line và body cho 1 message nhất định nhưng sau đó đã phát triển để chứa tất cả các loại dữ liệu bổ sung:
```
struct Message {
    var subject: String
    var body: String
    let date: Date
    var tags: [Tag]
    var replySent: Bool
    let senderName: String
    let senderImage: UIImage?
    let senderAddress: String
}
```
Mặc dù tất cả các dữ liệu trên là bắt buộc để hiển thị message, nhưng việc giữ tất cả dữ liệu trực tiếp trong chính message type đã khiến mọi thứ trở nên hơi lộn xộn - và rất có thể sẽ khiến message khó hoạt động hơn, đặc biệt là khi chúng ta đang tạo mới các instance - hoặc khi soạn message mới hoặc khi viết unit tests.
Một cách để giảm thiểu vấn đề trên là chia dữ liệu của chúng ta thành nhiều loại chuyên dụng - sau đó chúng ta có thể sử dụng để tạo thành một hệ thống phân cấp model. Ví dụ: chúng ta có thể trích xuất tất cả dữ liệu về người gửi thư vào struct Person và tất cả metadata - chẳng hạn như tag và ngày của message - vào loại Metadata, như sau:
```
struct Person {
    var name: String
    var image: UIImage?
    var address: String
}

extension Message {
    struct Metadata {
        let date: Date
        var tags: [Tag]
        var replySent: Bool
    }
}
```
Bây giờ, với code trên, chúng ta có thể cung cấp cho message type của mình một cấu trúc rõ ràng hơn nhiều - vì mỗi phần dữ liệu không trực tiếp là một phần của message hiện được bọc bên trong một loại chuyên dụng hơn, phù hợp với ngữ cảnh hơn:
```
struct Message {
    var subject: String
    var body: String
    var metadata: Metadata
    let sender: Person
}
```
Một lợi ích khác của cách tiếp cận trên là giờ đây chúng ta có thể dễ dàng sử dụng lại các phần dữ liệu của mình trong các bối cảnh khác nhau. Ví dụ: chúng tôi có thể sử dụng Person type của mình để triển khai các tính năng như contact list hoặc để cho phép người dùng xác định các nhóm - vì dữ liệu đó không còn bị ràng buộc trực tiếp với message type.
## Reducing duplication
Bên cạnh việc được sử dụng để tổ chức code tốt hơn, một cấu trúc vững chắc cũng có thể giúp giảm trùng lặp trong một dự án. Trong trường hợp, ta ứng dụng email của chúng ta sử dụng cách tiếp cận theo hướng event để xử lý các hành động khác nhau của người dùng - sử dụng một enum event giống như sau:
```
enum Event {
    case add(Message)
    case update(Message)
    case delete(Message)
    case move(Message, to: Folder)
}
```
Sử dụng một enum để xác định một danh sách hữu hạn các event khác nhau cần xử lý có thể là một cách tuyệt vời để thiết lập các luồng dữ liệu rõ ràng hơn trong một ứng dụng - nhưng việc triển khai hiện tại của chúng ta yêu cầu mỗi trường hợp phải chứa Message mà event dành cho - dẫn đến trùng lặp ngay cả trong chính loại event, và cả khi chúng ta muốn trích xuất thông tin từ event message.
Vì mỗi event action được thực hiện với message nên thay vào đó, hãy tách rời event action và message, tạo ra một loại enum đơn giản hơn nhiều mà vẫn sẽ chứa tất cả các hành động của chúng ta:
```
enum Action {
    case add
    case update
    case delete
    case move(to: Folder)
}
```
Sau đó, chúng ta lại một lần nữa tạo thành một hierarchy - lần này bằng cách cấu trúc lại Event type của chúng ta để trở thành một wrapper chứa cả Action và Message mà nó sẽ được áp dụng - như thế này:
```
struct Event {
    let message: Message
    let action: Action
}
```
Cách tiếp cận ở trên mang lại cho chúng ta điều tốt nhất cho cả hai - xử lý một event giờ chỉ đơn giản là vấn đề chuyển đổi trên action của event, và trích xuất dữ liệu từ một event message có thể được thực hiện trực tiếp bằng thuộc tính message.
## Recursive structures
Chúng ta đã tách các thuộc tính của message thành những loại riêng biệt nhưng đó vẫn chưa phải là cách thuận tiện nhất. Giả sử chúng ta làm việc trên ứng dụng hiển thị các loại nội dung khác nhau, ví dụ như text và images, và chúng ta lại một lần nữa sử dụng một enum để xác định từng phần nội dung - như thế này:
```
enum Content {
    case text(String)
    case image(UIImage)
    case video(Video)
}
```
Bây giờ, Giả sử rằng chúng ta muốn cho phép người dùng của mình hình thành các nhóm nội dung - ví dụ: bằng cách tạo danh sách yêu thích hoặc sắp xếp mọi thứ bằng thư mục. Một ý tưởng ban đầu có thể là dành cho group type dành riêng, có chứa tên của nhóm và nội dung thuộc về nó:
```
struct Group {
    var name: String
    var content: [Content]
}
```
Code ở trên có vẻ được cấu trúc tốt nhưng nó cũng có một số nhược điểm. Với việc giới thiệu một loại riêng biệt mới, chúng ta cần phải xử lý các nhóm riêng biệt với từng phần nội dung riêng lẻ - khiến việc xử lý những thứ như danh sách trở nên khó khăn hơn. Vì group không khác gì với các cấu trúc nội dung khác nên ta sẽ tạo một member cho enum Content bằng cách như sau:
```
enum Content {
    case text(String)
    case image(UIImage)
    case video(Video)
    case group(name: String, content: [Content])
}
```
Cái hay của cách tiếp cận này là giờ đây chúng ta có thể sử dụng lại nhiều code để xử lý nội dung của các group và chúng ta có thể tự động hỗ trợ bất kỳ số lượng nested groups nào. Ví dụ: ở đây, cách chúng ta có thể xử lý lựa chọn cell cho table view hiển thị danh sách nội dung:
```
extension ListViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let content = contentList[indexPath.row]

        switch content {
        case .text(let string):
            navigator.showText(string)
        case .image(let image):
            navigator.showImage(image)
        case .video(let video):
            navigator.openPlayer(for: video)
        case .group(let name, let content):
            navigator.openList(withTitle: name, content: content)
        }
    }
}
```
## Specialized models
Mặc dù có thể sử dụng lại code thường là một điều tốt, nhưng đôi khi, việc tạo ra một phiên bản mới chuyên biệt hơn của một model lại là giải pháp tốt hơn, thay vì cố gắng sử dụng lại nó trong một context rất khác. 
Quay trở lại với ví dụ về email app của chúng ta từ trước đó, giả sử chúng ta muốn cho phép người dùng lưu các bản nháp của các message được soạn một phần. Khác với các message hoàn chỉnh, một số yêu cầu dữ liệu không cần thiết cho các bản nháp - chẳng hạn như tên của người gửi hoặc ngày nhận được tin nhắn - thay vào đó, hãy tạo một Draft type đơn giản hơn nhiều, mà chúng ta sẽ lồng bên trong message cho additional context:
```
extension Message {
    struct Draft {
        var subject: String?
        var body: String?
        var recipients: [Person]
    }
}
```
Bằng cách đó, chúng ta có thể giữ các thuộc tính nhất định dưới dạng optional và giảm lượng dữ liệu mà chúng tôi sẽ phải làm việc khi tải và lưu bản nháp - mà không ảnh hưởng đến bất kỳ mã nào của chúng ta liên quan đến các message.
Lựa chọn loại cấu trúc mô hình nào phù hợp nhất cho từng tình huống sẽ phụ thuộc rất nhiều vào loại dữ liệu nào được yêu cầu và cách sử dụng dữ liệu đó - tạo ra sự cân bằng giữa việc có thể sử dụng lại code và không tạo ra các mô hình quá phức tạp. 

Mong bài viết sẽ có ích với các bạn.

Reference: https://www.swiftbysundell.com/posts/structuring-model-data-in-swift