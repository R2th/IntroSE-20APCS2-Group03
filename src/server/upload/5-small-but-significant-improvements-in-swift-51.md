Swift 5.1 hiện đã được release chính thức và mặc dù là một bản release nhỏ, nhưng nó chứa một số thay đổi và cải tiến đáng kể - từ các tính năng mới cơ bản, như tính ổn định của module (cho phép các nhà cung cấp SDK gửi pre-compiled Swift frameworks), cho tất cả về các tính năng, cú pháp mới cho SwiftUI và hơn thế nữa.
Bên cạnh các tính năng mới, Swift 5.1 còn chứa một số tính năng nhỏ hơn - nhưng vẫn rất có ý nghĩa - các khả năng mới và cải tiến mới. Nó sắp xếp các loại thay đổi mà thoạt đầu có vẻ rất nhỏ hoặc thậm chí không cần thiết nhưng có thể có tác động khá lớn đến cách chúng ta viết và cấu trúc code Swift. Trong bài viết này, hãy xem xét năm trong số các tính năng đó và các tình huống nào chúng có thể hữu ích.
## Memberwise initializers with default values
Một trong nhiều điều làm cho các struct trở nên hấp dẫn trong Swift là các trình khởi tạo thành viên,  auto-generated “memberwise” initializers - cho phép chúng ta khởi tạo bất kỳ cấu trúc nào (không chứa các private stored properties) chỉ bằng cách chuyển các giá trị tương ứng với từng property của nó, như thế này:
```
struct Message {
    var subject: String
    var body: String
}

let message = Message(subject: "Hello", body: "From Swift")
```
Các trình khởi tạo được tổng hợp này đã được cải thiện đáng kể trong Swift 5.1, vì giờ đây chúng đưa các giá trị thuộc tính mặc định vào account và tự động dịch các giá trị đó thành các đối số của trình khởi tạo mặc định.
Giả sử rằng chúng ta muốn mở rộng struct Message ở trên với sự hỗ trợ cho các tệp đính kèm, nhưng chúng ta muốn giá trị mặc định là một mảng trống - đồng thời, chúng ta cũng muốn cho phép Message được khởi tạo mà không cần khởi tạo body đã được xác định từ trước , vì vậy chúng ta cũng sẽ cung cấp cho các thuộc tính một giá trị mặc định:
```
struct Message {
    var subject: String
    var body = ""
    var attachments: [Attachment] = []
}
```
Ở các phiên bản Swift 5.0 và trước đó, chúng ta vẫn phải pass các đối số khởi tạo cho tất cả các thuộc tính trên, bất kể chúng có giá trị mặc định hay không. Tuy nhiên, trong Swift 5.1, chúng ta có thể khởi tạo Message bằng cách chỉ truyền một thuộc tính, như thế này:
```
var message = Message(subject: "Hello, world!")
```
Điều đó rất tuyệt, và nó làm cho việc sử dụng các struct thậm chí còn thuận tiện hơn trước. Nhưng có lẽ tuyệt vời hơn nữa, giống như khi sử dụng các đối số mặc định tiêu chuẩn, chúng ta vẫn có thể ghi đè bất kỳ giá trị thuộc tính mặc định nào bằng cách pass một đối số cho nó - điều này mang lại cho chúng ta rất nhiều tính linh hoạt:
```
var message = Message(
    subject: "Hello, world!",
    body: "Swift 5.1 is such a great update!"
)
```
Tuy nhiên, mặc dù các công cụ khởi tạo thành viên cực kỳ hữu ích trong một ứng dụng hoặc module, nhưng chúng vẫn không được hiển thị như một phần của module’s public API - có nghĩa là nếu chúng ta xây dựng một library or framework, chúng ta vẫn phải xác định public-facing initializers manually.
## Using Self to refer to enclosing types
Swift’s Self keyword trước đây đã cho phép chúng ta tự động refer một loại trong bối cảnh trong đó loại cụ thể thực tế không được biết đến.  ví dụ: bằng cách refer đến implement type của protocol trong một protocol extension:
```
extension Numeric {
    func incremented(by value: Self = 1) -> Self {
        return self + value
    }
}
```
Phạm vi của Self giờ đã được mở rộng để bao gồm cả các loại cụ thể - như enums, structs và class - cho phép chúng ta sử dụng Self như một loại bí danh đề cập đến một phương thức hoặc enclosing type, như thế này:
```
extension TextTransform {
    static var capitalize: Self {
        return TextTransform { $0.capitalized }
    }

    static var removeLetters: Self {
        return TextTransform { $0.filter { !$0.isLetter } }
    }
}
```
Thực tế là bây giờ chúng ta có thể sử dụng Self phía trên, thay vì tên loại TextTransform đầy đủ - Nó có thể giúp làm cho code của chúng ta gọn hơn một chút, đặc biệt là khi xử lý tên loại dài. Thậm chí chúng ta còn có thể sử dụng Self inline trong một phương thức hoặc thuộc tính:
```
extension TextTransform {
    static var capitalize: Self {
        return Self { $0.capitalized }
    }

    static var removeLetters: Self {
        return Self { $0.filter { !$0.isLetter } }
    }
}
```
Bên cạnh việc refer đến một enclosing type, giờ đây chúng ta cũng có thể sử dụng Self để truy cập các thành viên tĩnh trong một phương thức hoặc thuộc tính - khá hữu ích trong các tình huống khi chúng ta muốn sử dụng lại cùng một giá trị trong tất cả các instance của một type, như cellReuseIdentifier trong ví dụ này:
```
class ListViewController: UITableViewController {
    static let cellReuseIdentifier = "list-cell"

    override func viewDidLoad() {
        super.viewDidLoad()

        tableView.register(
            ListTableViewCell.self,
            forCellReuseIdentifier: Self.cellReuseIdentifier
        )
    }
}
```
Một lần nữa, chúng ta có thể chỉ cần gõ ListViewController ở trên khi truy cập static property của chúng ta, nhưng sử dụng Self sẽ cải thiện khả năng đọc mã của chúng ta - và cũng sẽ cho phép chúng ta đổi tên view controller của mình mà không phải cập nhật cách truy cập vào các static member của nó.
## Switching on optionals
Tiếp theo, hãy xem cách Swift 5.1 giúp thực hiện pattern matching on optionals, điều này thực sự hữu ích khi sử dụng optional value. Ví dụ, giả sử chúng ta đang làm việc trên một ứng dụng âm nhạc có chứa model Song- có thuộc tính downloadState cho phép chúng ta theo dõi xem bài hát đã được tải xuống chưa.
```
struct Song {
    ...
    var downloadState: DownloadState?
}
```
Khả năng advanced pattern matching của swift cho phép chúng ta trực tiếp chuyển sang một giá trị optional - mà không cần phải unwrap trước - tuy nhiên, trước Swift 5.1, muốn làm như vậy yêu cầu chúng ta phải thêm dấu hỏi đánh dấu cho từng trường hợp match, như thế này:
```
func songDownloadStateDidChange(_ song: Song) {
    switch song.downloadState {
    case .downloadInProgress?:
        showProgressIndiator(for: song)
    case .downloadFailed(let error)?:
        showDownloadError(error, for: song)
    case .downloaded?:
        downloadDidFinish(for: song)
    case nil:
        break
    }
}
```
Trong Swift 5.1, các dấu hỏi ở phía sau không còn cần thiết nữa và giờ đây chúng ta có thể chỉ cần refer trực tiếp từng trường hợp - giống như khi switch sabg một giá trị non-optional:
```
func songDownloadStateDidChange(_ song: Song) {
    switch song.downloadState {
    case .downloadInProgress:
        showProgressIndiator(for: song)
    case .downloadFailed(let error):
        showDownloadError(error, for: song)
    case .downloaded:
        downloadDidFinish(for: song)
    case nil:
        break
    }
}
```
Mặc dù ở trên là một thay đổi thực sự đáng hoan nghênh về việc tiếp tục giảm cú pháp cần thiết để implement các pattern phổ biến, nhưng nó đi kèm với một hiệu ứng phụ nhẹ, có khả năng phá vỡ source code đối với một số enums and switch nhất định. Vì Swift optionals được implement sử dụng `Optional` enum under the hood nên chúng ta không thể biết được property có optional hay không
## The Identifiable protocol
Ban đầu được giới thiệu như một phần của initial release SwiftUI. `Identifiable` protocol mới giờ đây được đưa vào swift standard library -  và cung cấp một cách đơn giản và thống nhất để đánh dấu bất kỳ loại nào có stable, unique identifier.
Để conform protocol mới này, bạn đơn giản chỉ cần khai báo một property `id`, có thể chứa bất kỳ `Hashable` type nào - Ví dụ như `String`:
```
struct User: Identifiable {
    typealias ID = String

    var id: ID
    var name: String
}
```
Tương tự như khi `Result` được thêm vào thư viện tiêu chuẩn như một phần của Swift 5.0,  lợi ích chính của việc thay đổi ở swift 5.1 là có thể truy cập `Identifable` đối với bất kỳ module Swift nào và nó có thể được sử dụng để chia sẻ các yêu cầu trên các code base khác nhau.
Ví dụ: bằng cách sử dụng constrained protocol extension,  chúng ta có thể thêm convenience API để chuyển đổi bất kỳ `sequence` nào chứa identifiable elements thành một dictionary - sau đó trả lại extension như một phần của thư viện mà không yêu cầu chúng ta phải define bất kỳ protocol nào cho nó:
```
public extension Sequence where Element: Identifiable {
    func keyedByID() -> [Element.ID : Element] {
        var dictionary = [Element.ID : Element]()
        forEach { dictionary[$0.id] = $0 }
        return dictionary
    }
}
```
Tuy nhiên, trong khi Identifiable protocol trong standard library thực sự hữu ích khi xử lý các collections of values mà mỗi collection có identifier cố định, nhưng nó không làm được gì nhiều để cải thiện sự an toàn của code type thực tế của chúng ta.
Vì tất cả những gì có thể nhận dạng là yêu cầu chúng ta xác định bất kỳ hashable id property nào, nên nó sẽ không bảo vệ chúng ta khỏi việc vô tình trộn lẫn một số nhận dạng - chẳng hạn như trong trường hợp này, khi chúng ta chuyển nhầm `User` ID sang chức năng chấp nhận `Video` ID :
```
postComment(comment, onVideoWithID: user.id)
```
Vì vậy có rất nhiều trường hợp sử dụng mạnh mẽ cho `Identifier` type phù hợp và `Identifier` protocol chẳng hạn như các trường hợp chúng tôi đã xem xét trong [“Type-safe identifiers in Swift”] (https://www.swiftbysundell.com/articles/type-safe-identifiers-in-swift/) để ngăn chặn các loại lỗi có thể xảy ra. Tuy nhiên, hiện tại nó vẫn đang tốt đẹp khi có một số phiên bản của một `Identifier` protocol trong thư viện chuẩn gay cả khi nó bị giới hạn hơn một chút.
## Ordered collection diffing
Cuối cùng chúng ta hãy xem xét standard library API hoàn toàn mới được giới thiệu như 1 phần của swift 5.1 - ordered collection diffing. Khi chúng ta như một cộng đồng, tiến gần hơn đến thế giới của declarative programming với các công cụ như Combine and SwiftUI. Việc có thể tính toán sự khác biệt giữa hai states là điều ngày càng trở nên quan trọng.
Xét cho cùng, sự phát triển declarative UI là liên tục render snapshots của state - và SwiftUI và các [diffable data sources](https://wwdcbysundell.com/2019/diffable-data-sources-first-look/) mới có thể sẽ thực hiện hầu hết các công việc nặng nề để biến điều đó thành hiện thực - có thể tự tính toán độ chênh lệch giữa hai states vô cùng hữu ích.
Ví dụ, giả sử như chúng ta xây dựng một `DatabaseController` cho phép chúng tôi dễ dàng cập nhật cơ sở dữ liệu trên disk của mình với một dãy các model trong bộ nhớ. Để có thể tìm ra liệu một model nên được chèn hoặc xóa, chúng ta có thể gọi new `difference` API để tính toán độ chênh lệch giữa mảng cũ của chúng ta và mảng mới - và sau đó lặp lại thông qua các thay đổi bên trong diff đó để thực hiện các database operations của chúng ta:
```
class DatabaseController<Model: Hashable & Identifiable> {
    private let database: Database
    private(set) var models: [Model] = []
    
    ...

    func update(with newModels: [Model]) {
        let diff = newModels.difference(from: models)

        for change in diff {
            switch change {
            case .insert(_, let model, _):
                database.insert(model)
            case .remove(_, let model, _):
                database.delete(model)
            }
        }

        models = newModels
    }
}
```
Tuy nhiên, việc triển khai ở trên không tính đến các moved model - theo mặc định, các di chuyển sẽ được coi là các phần chèn và xóa riêng biệt. Để khắc phục điều đó, chúng ta sẽ gọi phương thức `inferringMoves` khi tính toán diff của chúng ta -  và sau đó xem xét mỗi lần chèn có liên quan đến việc xóa hay không và thay vào đó, hãy coi nó như một moved, như sau:
```
func update(with newModels: [Model]) {
    let diff = newModels.difference(from: models).inferringMoves()
    
    for change in diff {
        switch change {
        case .insert(let index, let model, let association):
            // If the associated index isn't nil, that means
            // that the insert is associated with a removal,
            // and we can treat it as a move.
            if association != nil {
                database.move(model, toIndex: index)
            } else {
                database.insert(model)
            }
        case .remove(_, let model, let association):
            // We'll only process removals if the associated
            // index is nil, since otherwise we will already
            // have handled that operation as a move above.
            if association == nil {
                database.delete(model)
            }
        }
    }
    
    models = newModels
}
```
Thực tế là diffing hiện được tích hợp vào standard library (và cả UIKit và AppKit) là một tin tuyệt vời - vì việc viết một thuật toán diffing hiệu quả, linh hoạt và mạnh mẽ có thể cực kỳ khó khăn.
## Conclusion
Swift 5.1 không chỉ là một công cụ hỗ trợ chính cho SwiftUI và Combine, nó còn là một tin tức lớn cho bất kỳ team nào cung cấp pre-compiled frameworks,  vì Swift giờ đây không chỉ ABI stable mà còn module stable. Trên hết, Swift 5.1 cũng bao gồm nhiều thay đổi và cải tiến nhỏ nhưng đáng hoan nghênh áp dụng cho hầu hết mọi code base - và chúng ta đã xem xét năm trong số những thay đổi đó trong bài viết này. 

Hy vọng bài viết sẽ có ích với các bạn.

Reference: https://www.swiftbysundell.com/articles/5-small-but-significant-improvements-in-swift-5-1/