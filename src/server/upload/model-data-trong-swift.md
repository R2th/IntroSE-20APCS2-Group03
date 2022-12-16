- Việc thiết lập một cấu trúc cơ sở dự liệu(structuring-data-model) vững chắc cho project là một việc làm cần thiết vì developer sẽ dễ dàng làm việc với project hơn. Thuy nhiên để thiết lập được 1 data-model vững chắc để hạn chế các lỗi cũng như sự cố , đủ linh hoạt với các tính năng hiện có cũng nhưu sự thay đổi trong tương lai mà chúng ta muốn có lẽ thực sự khó khăn.

- Điều đó có vẻ rất đúng với các mô hình code(model-code) thứ mà được sử dụng với nhiều đặc điểm khác nhau mà mỗi đặc điểm lại cần có những yêu cầu riêng của chúng. Trong bài viết này, hãy cùng tìm hiểu vài techniques để structuring-data-model và cách sử dụng hiệu quả chúng để mang lại lợi ích project của chúng ta.

# 1/ Thiết lập hệ thống phân cấp:

- Ở đầu project, model thường được lưu giữ khá đơn giản. Do chúng ta chưa implement nhiều tính năng nên các model của chúng ta hầu hết không yêu cầu chứa nhiều data. Tuy nhiên nếu project chúng ta được mở rộng và có nhiều model hơn điều đó dễ dẫn đến việc từ data-model đơn giản ban đầu đến cuối thì trở thành dánh sách tất cả các data liên quan.
- Ví dụ chúng ta dựng 1 email client sử dụng `Message` model để theo dõi mỗi message. Khởi đầu có thể chỉ có mỗi body chứa message nhưng khi app trở nên phức tạp rất có thể chúng ta sẽ có dạng model-data sau:

```swift
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
- Trong khi tất cả các biến trên đều cần để có thể render ra message, việc giữ nguyên cấu trúc với từng `Message` như trên khiến bản thân message và việc khởi tạo chúng trở nên phúc tạp và khó làm việc với chúng.
- Một cách để các giảm rắc rối từ vấn đề trên là chúng ta chia nhỏ data-model chúng ta thành nhiều loại riêng biệt mà chúng ta có thể dễ dàng phân cấp cho chúng. Ví dụ chúng ta giải nén data message trong `Person` struct như message's tag, date trong `Metadata` như sau:

```swift
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

- Bây giờ với điều chỉnh trên chúng ta đã có struct thon gọn hơn của `Message` vì mỗi phần của data không trực tiếp là 1 phần của message:

```swift
struct Message {
    var subject: String
    var body: String
    var metadata: Metadata
    let sender: Person
}
```

- Lợi ích có thể thấy ngay của điều chỉnh trên là chúng ta có thể sử dụng lại dễ dàng những phần của data trong nhiều ngữ cảnh khác nhau. VD chúng ta có thể sử dụng new `Person` để implement feature như contact list, hoặc cho phép user define group vì data không còn liên kết trực tiếp với `Message`.

# 2/ Giảm sự trùng lặp:

- Bên cạnh được sử dụng để tổ chức code tốt hơn, một kiến trúc code tốt còn có thể giảm thiểu sự trùng lặp trong project của chúng ta. Nếu như email app của chúng ta sử dụng `event-driven` để xử lý các action của người dùng, chúng ta sẽ sử dụng enum `Event` như sau:

```swift
enum Event {
    case add(Message)
    case update(Message)
    case delete(Message)
    case move(Message, to: Folder)
}
```

- Sử dụng một enum để định nghĩa các event nhất định để những đoạn code có thể xử lý tốt các luồng dữ liệu trong một ứng dụng, nhưng với implement hiện tại của chúng ta thì mỗi `case` bao gồm `Message` dẫn đến sự trùng lặp trong chính `Event` , và khi chúng ta trích xuất thông tin từ một messeage của event.

- Vì mỗi action của event được thực hiện trên một message, thay vào đó chúng ta tách 2 sự kiện và tạo ra một loại enum đơn giản và chứa các action của chúng ta:

```swift
enum Action {
    case add
    case update
    case delete
    case move(to: Folder)
}
```

- Sau đó, chúng ta một lần nữa phân cấp lại model, lần này chúng ta cấu trúc lại `Event` để có thể chứa cả `Action` và `Message` như sau:

```swift
struct Event {
    let message: Message
    let action: Action
}
```

- Cách xử lý này giúp chúng ta giải quyết các vấn đề trên - xử lý một event giờ trở nên đơn giản bằng cách chuyển đổi các action của sự kiện trong `Action` và trích xuất dữ liệu từ message của event có thể dùng trên chính thuộc tính của `message`.

# 3/ Cấu trúc đệ quy:

- Chúng ta đã hình thành việc phân cấp cho các model mà trong đó mỗi model nhỏ và model chứa nó hoàn toàn riêng biệt nhưng điều đó không phải lúc nào cũng là giải pháp tối ưu, thuận tiện nhất. Nếu chúng ta làm việc trong một app mà cần hiện thị nhiều lại `content` như `text`, `image` và khi đó chúng ta lại cần sử dụng enum để định nghĩa từng loại:

```swift
enum Content {
    case text(String)
    case image(UIImage)
    case video(Video)
}
```

- Bây giờ chúng ta muốn cho phép `user` tạo cáo nhóm `content` như ví dụ tạo một list favorite, hoặc tổ chức sắp xếp các thứ bằng thư mục. Một ý tưởng xuất hiện là sử dụng các `Group` riêng chứa tên các nội dung thuộc về nó:

```swift
struct Group {
    var name: String
    var content: [Content]
}
```

- Tuy nhiên trong khi cách triển khai trên có vẻ rất gọn gàng, rõ ràng nhưng nó vẫn có khuyết điểm trong trường hợp này. Việc sử dụng một type riêng biệt chúng ta sẽ yêu cầu xử lý các group riêng biệt khiến việc xây dựng danh sách trở nên khó khăn, và khó có thể hỗ trợ các nhóm lồng nhau:

- Vì các nhóm không khác gì một cách để cấu trúc `content` trong trường hợp này, hãy cùng biến nó thành một class member của `Content` enum:

```swift
enum Content {
    case text(String)
    case image(UIImage)
    case video(Video)
    case group(name: String, content: [Content])
}
```

- Những gì chúng ta vừa thực hiện ở trên là để biến `Content` trở thành dữ liệu đệ quy. Cách tiếp cận của chúng ta bây giờ là có thể sử dụng lại nhiều code giống như chúng ta dử dụng để xử lý `content` , `group` và chúng ta có thể tự động hỗ trợ các nhóm lồng nhau:

```swift
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

- Vì `Content` bây giờ là dữ liệu đệ quy, việc gọi `navigator.openList` khi xử lý các `group` trở nên đơn giản tạo một instance `ListViewController` với các list content của group, cho phép người dùng thoải mái tạo các điều hướng đến các phân cấp `content` với ít tốn công của chúng ta.

# 4/ Model chuyên biệt:

- Trong một số bối cảnh chúng ta sẽ không tránh được việc phải sự dụng một số model đặc biệt thay vì phải cố gắng sử dụng lại nó trong một bối cảnh khác.

- Trở lại ví dụ email app từ trước, chúng ta cho phép người dùng có thể nhớ bản ghi của một message đang soạn. Thay vì tính năng xử lý các message hoàn chỉnh, yêu cầu dữ liệu được soạn sẵn cho các bản nháp như tên người gửi, ngày tháng gửi...:

```swift
extension Message {
    struct Draft {
        var subject: String?
        var body: String?
        var recipients: [Person]
    }
}
```

- Bằng cách này, chúng ta thoải mái giữ các thuộc tính ở dạng `optional` và giảm data chúng ta cần làm việc khi ở trạng thái soạn thảo mà không gây ảnh hưởng gì đến các message.

# 5/ Tổng kết:

- Mặc dù việc model-data cho phù hợp với các tình huống phụ thuộc vào việc loại data nào được sử dụng và sử dụng ra sao. Việc tạo ra cân bằng giữa việc tạo ra các mô hình không quá phức tạp và có thể sử dụng lại code là điều quan trọng chúng ta cần đặc biệt lưu ý.