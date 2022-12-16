- Những đặc điểm của thiết kế chặt chẽ, mạnh mẽ linh hoạt của `API` là nhẹ nhàng mà dễ sử dụng đang là yếu tố quyết định để người dùng có thể tuỳ chỉnh. Mặc khác thì chúng ta càng thêm `config` cấu hình nhiều thì `API` càng trở nên linh hoạt hơn nhưng đồng thời nó cũng trở nên phức tạp hơn và khó hiểu hơn.
- Điều đó khiến `default arguments` trở nên hữu dụng trong `Swift` bằng việc cho phép chúng ta thêm các mặc định sẵn có một cách chắc chắn và trực quan hơn. Chúng ta sẽ đạt được sự cân bằng tốt giữa tính linh hoạt và dễ sử dụng. Chúng ta sẽ cùng xem xét những ví dụ dưới đây:

### 1/ Lựa chọn phương án tối ưu dễ dàng:
- Một trong những phương án quan trọng mà dự án có thể thực hiện việc bảo trì dễ dàng hơn(khi mà dự án tăng về kích thước, vể cả `code` lẫn `developer`) là đảm bảo thực hiện các phương án `code` tối ưu đúng đắn nhất, dễ dàng nhất. Các chức năng phổ biến sẽ phải hạn chế được triển khai lại nhiều lần bởi các `developer` khác nhau bằng việc triển khai có sự trừu tượng hoá, dễ sử dụng lại.

```Swift
extension UIResponder {
    // Here we use a default argument to define what we want
    // our unified, default animation duration to be:
    func animate(withDuration duration: TimeInterval = 0.3,
                 animations: @escaping () -> Void) {
        UIView.animate(withDuration: duration,
                       animations: animations)
    }
}
```

- Với đoạn `code` trên, hầu hết các `animation` sẽ trở nên giống như sau:

```Swift
animate {
    button.frame.size = CGSize(width: 100, height: 100)
}
```

- Điều đó khá tốt, dễ đọc và vì chúng ta chỉ một một `source` duy nhất trong quá trình các `animation` mặc định chạy. Tuy nhiên có một điều quan trọng không kém là mặc định mới của chúng ta dễ dàng bị `override` lại:

```Swift
animate(withDuration: 2) {
    button.frame.size = CGSize(width: 100, height: 100)
}
```

- Bên cạnh việc cung cấp các chuẩn hoá các giá trị khác nhau trên `source code`, chúng ta có thể thiết kế `API` để có thể mở rộng, băng việc thêm các trường hợp phức tạp và các `config` có thể mà không cần yêu cầu tất cả người dùng `API` sử dụng tất cả những `config`, trường hợp phức tạp đó.
- Ví dụ như cách chúng ta có thể mở rộng `API animation` để hỗ trợ những trường hợp sử dụng khác mà vẫn sử dụng những mặc định đơn giản có thể:

```Swift
extension UIResponder {
    func animate(withDuration duration: TimeInterval = 0.3,
                 delay: TimeInterval = 0,
                 options: UIView.AnimationOptions = .curveEaseInOut,
                 animations: @escaping () -> Void) {
        UIView.animate(withDuration: duration,
                       delay: delay,
                       options: options,
                       animations: animations)
    }
}
```

### 2/ Tầm quan trọng của việc định danh rõ ràng:
- Khi quyết định những giá trị nào trở thành mặc định, điều quan trọng là xem xét một mặc định cụ thể có thể trở nên trực quan với người dùng `API` của chúng ta hay không. Những giá trị mặc định tốt nhất là những giá trị được định danh rõ ràng tránh gây cho chúng ta những hiểu lầm là lỗi do API gây ra những lỗi không mong đợi.
- Ví dụ, giả sử chúng ta khai báo chúng ta đã viết 1 hàm để lưu giá trị trong `database` và chúng ta cho phép người dùng `API` quyết định cách xử lý những xung đột khi có một giá trị tương tự tồn tại trong `database`:

```Swift
enum ConflictResolution {
    case overwriteExisting
    case stopIfExisting
    case askUser
}

func store<T: Storable>(
    _ value: T,
    conflictResolution: ConflictResolution = .stopIfExisting
) throws {
    ...
}
```

- Điều trên trông có vẻ tốt nhưng khi chúng ta suy nghĩ về nó, nó không thực sự rõ ràng khi chúng ta gọi chức năng không xác định rõ ràng `ConflicResolution` sẽ hiển thị không giá trị nào được lưu nếu `database` của chúng ta không tồn tại 1 giá trị.  Đơn giản với việc gọi `try store(value)`, chúng ta mong muốn một giá trị thực sự được lưu giữ nhưng đồng thời chúng ta muốn ghi đè lên giá trị mặc định hiện tại -> điều đó gây mất dữ liệu không mong muốn.

- Trong tình huống này, khi không tìm thấy giá trị mặc định rõ ràng thì chúng ta nên xác định chức năng riêng nếu chúng ta muốn cung cấp `API`.

```Swift
func storeIfNeeded<T: Storable>(_ value: T) throws {
    try store(value, conflictResolution: .stopIfExisting)
}
```

### 3/ Thêm các ràng buộc:### 
- Các đối số mặc định có thể cho phép trang bị thêm một `type` hoặc `func` với các ràng buộc thêm `dependency injection`. Như chúng ta đã biết về `dependency injection` thì thay vì phụ thuộc vào `singleton`, chúng ta có cách để viết code với cấu trúc tốt hơn và có thể kiểm tra. Tuy nhiên hoàn toàn chỉnh sửa code để giới thiệu các ràng buộc là một nhiệm vụ lớn nhưng nhờ `default argument` thì việc đó được thực hiện từng bước một.

- Nếu như chúng ta sử dụng `FileLoader` class cũng như việc sử dụng `Cache` như `singleton`. Điều đó mang lại cho chúng ta chút lợi ích trong việc đơn giản hoá việc khởi tạo `FileLoader` từ bất kì đâ mà không cần quan tâm đến các ràng buộc những sẽ gây khó khăn cho việc unit test cũng như việc đánh giá loại ràng buộc nào.

- Tin tốt là bằng việc biến đổi đơn giản chúng ta có thể dễ sử dụng các `singleton`:

```Swift
class FileLoader {
    private let fileManager: FileManager
    private let cache: Cache

    init(fileManager: FileManager = .default,
         cache: Cache = .shared) {
        self.fileManager = fileManager
        self.cache = cache
    }
}
```

- Vì chúng ta đã truyền tham số cho các ràng buộc của các trình tải tập tin nên chúng ta có thể dễ dàng kiểm tra:

```Swift
let loader = FileLoader(cache: .autoEmptyingForTests)
```

### 4/ Sử dụng giá trị liên kết trong enum:

- Ví dụ chúng ta đang xây dựng một `lib` sử dụng XML. Với XML như một cây với dạng các dât sẽ được sử dụng `node` với biến thể hữu hạn, chúng ta có thể chọn các `model` sử dụng `XMLNode` như sau:

```Swift
enum XMLNode {
    // A standard element, which can contain child elements:
    case element(
        name: String,
        attributes: [Attribute],
        children: [XMLNode]
    )
    // A "void" element that closes itself, and can't have children:
    case voidElement(
        name: String,
        attributes: [Attribute]
    )
    // An inline piece of text, defined as a child node:
    case text(String)
}
```

- Trước `Swift 5.1` việc sử dụng cách trên đi kèm với sự rủi ro lớn là không có đối số mặc định nào có thể được xác định.

```Swift
let emptyItems = XMLNode.element(
    name: "items",
    attributes: [],
    children: []
)
```

- Mặc dù chúng ta có thể giới thiệu `XMLNode` để mở rộng `API` với việc điển các giá trị mặc định trống. Chúng ta có thể xác định các đối số mặc định cho các giá trị `enum` liên kết:

```Swift
enum XMLNode {
    case element(
        name: String,
        attributes: [Attribute] = [],
        children: [XMLNode] = []
    )
    case voidElement(
        name: String,
        attributes: [Attribute] = []
    )
    case text(String)
}
```

- Với sự thay đổi trên, API của `XMLNode` trở nên linh động hơn nhiều và chúng ta có thể xác định các loại `node` chỉ với việc sử dụng loại `enum` trên.

```Swift
let emptyItems = XMLNode.element(name: "items")
let link = XMLNode.element(name: "link", children: [.text(url)])
let metadata = XMLNode.voidElement(name: "meta", attributes: metadataAttributes)
```