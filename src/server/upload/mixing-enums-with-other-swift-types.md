Một trong những vấn đề phổ biến nhất trong công nghệ phần mềm nói chung là logic mà dựa vào nhiều nguồn khác nhau về sự thật cho một mảnh nhất định của dữ liệu - đặc biệt là khi những nguồn có thể kết thúc mâu thuẫn với nhau, mà có xu hướng dẫn đến trạng thái không xác định.

Ví dụ, chúng ta hãy nói rằng chúng tôi đang làm việc trên một ứng dụng để viết các bài báo, và rằng chúng ta muốn sử dụng các mô hình dữ liệu tương tự để biểu diễn bài báo đã được công bố, cũng như dự thảo chưa được công bố.

Để xử lý hai trường hợp, chúng tôi có thể cung cấp mô hình dữ liệu data model là isDraft cho biết cho dù đó là đại diện cho một dự thảo, và chúng tôi cũng sẽ cần phải biến bất kỳ dữ liệu duy nhất để bài báo xuất bản vào optionals - như thế này:
```
struct Article {
    var title: String
    var body: Content
    var url: URL? // Only assigned to published articles
    var isDraft: Bool // Indicates whether this is a draft
    ...
}
```

Lúc đầu, nó có thể không có vẻ giống như mô hình trên có nhiều nguồn của sự thật - nhưng nó thực sự không, vì dù một bài báo cần được xem xét công bố cả hai có thể được xác định bằng cách nhìn vào dù nó có một url được gán cho nó, hoặc cho dù isDraft là true.

Điều đó có thể không có vẻ như một vấn đề lớn, nhưng nó có thể khá nhanh chóng dẫn đến mâu thuẫn trên cơ sở mã của chúng tôi, và nó cũng đòi hỏi soạn sẵn không cần thiết - như mỗi trang web cuộc gọi có cả kiểm tra cờ isDraft, và Unwrap thuộc tính url tùy chọn, theo thứ tự để đảm bảo rằng logic của nó là đúng.

Đây chính là loại tình huống trong đó enums Swift thực sự tỏa sáng - kể từ khi họ để chúng tôi mô hình các loại trên các biến thể như trạng thái rõ ràng, mỗi trong số đó có thể mang theo thiết lập riêng của dữ liệu một cách không bắt buộc - như thế này:

```
extension Article {
    enum State {
        case published(URL)
        case draft
    }
}
```

Có gì enum trên cho phép chúng ta làm là để thay thế url và isDraft của chúng tôi tính trước đó với một thuộc tính state mới - mà sẽ hoạt động như một nguồn duy nhất của chân lý để xác định tình trạng của mỗi bài viết:
```
struct Article {
    var title: String
    var body: Content
    var state: State
}
```

Với trên tại chỗ chúng tôi bây giờ có thể chỉ đơn giản là bật thuộc tính state mới của chúng tôi bất cứ khi nào chúng ta cần phải kiểm tra xem một bài báo đã được công bố - và cần những con đường mã cho bài báo xuất bản không còn để đối phó với bất kỳ URL bắt buộc. Ví dụ, dưới đây là cách chúng tôi bây giờ có thể có điều kiện tạo ra một UIActivityViewController cho việc chia sẻ các bài báo được công bố:

```
func makeActivityViewController(
    for article: Article
) -> UIActivityViewController? {
    switch article.state {
    case .published(let url):
        return UIActivityViewController(
            activityItems: [url],
            applicationActivities: nil
        )
    case .draft:
        return nil
    }
}
```

Tuy nhiên, khi thực hiện các loại trên của sự thay đổi cấu trúc để một trong những mô hình dữ liệu cốt lõi của chúng tôi, rất có thể chúng ta cũng sẽ cần phải cập nhật khá nhiều mã mà sử dụng mô hình - và chúng ta có thể không có khả năng thực hiện tất cả những thông tin cập nhật một lần.

Rất may, nó thường tương đối dễ dàng để giải quyết loại vấn đề thông qua một số hình thức của lớp tương thích ngược tạm thời - trong đó sử dụng nguồn duy nhất mới của chúng ta về sự thật phía dưới, trong khi vẫn để lộ API giống như chúng ta đã có trước khi tới phần còn lại source code .

Ví dụ, dưới đây là cách chúng ta có thể để cho lưu trữ url của nó cho đến khi chúng ta đang thực hiện chuyển tất cả các mã của chúng tôi để API trạng thái mới của nó:

```
#warning("Temporary backward compatibility. Remove ASAP.")
extension Article {
    @available(*, deprecated, message: "Use state instead")
    var url: URL? {
        get {
            switch state {
            case .draft:
                return nil
            case .published(let url):
                return url
            }
        }
        set {
            state = newValue.map(State.published) ?? .draft
        }
    }
}
```

Vì vậy, đó là một ví dụ về cách chúng tôi có thể kết hợp cấu trúc và các loại khác với enums để thiết lập một nguồn duy nhất của sự thật cho states khác nhau của chúng tôi. Tiếp theo, chúng ta hãy xem làm thế nào chúng ta có thể đi theo con đường khác xung quanh, và tăng thêm một số enums của chúng tôi để làm cho nó mạnh hơn rất nhiều - trong khi cũng làm giảm số lượng tổng thể của chúng ta về báo cáo chuyển đổi trong quá trình này.

### Enums so với protocols

Sau khi ý tưởng trên của việc sử dụng enums để mô hình hóa các quốc gia khác nhau - chúng ta hãy nói rằng chúng tôi đang làm việc trên một ứng dụng bản vẽ, và rằng chúng ta đã hiện triển khai mã lựa chọn công cụ của chúng tôi sử dụng một enum có chứa tất cả các công cụ vẽ mà hỗ trợ ứng dụng của chúng tôi :

```
enum Tool: CaseIterable {
    case pen
    case brush
    case fill
    case text
    ...
}
```

Bên cạnh các khía cạnh quản lý state, một trong những lợi ích bổ sung của việc sử dụng một enum trong trường hợp này là giao thức CaseIterable, loại công cụ chiếu theo của chúng tôi để. Ví dụ để xây dựng một hộp công cụ xem có chứa các nút cho mỗi người trong số các công cụ vẽ của chúng tôi:

```
func makeToolboxView() -> UIView {
    let toolbox = UIView()

    for tool in Tool.allCases {
        // Add a button for selecting the tool
        ...
    }

    return toolbox
}
```

Tuy nhiên, như gọn gàng vì nó là để có tất cả các công cụ của chúng tôi thu thập được trong một loại duy nhất, thiết lập mà không đi kèm với một bất lợi khá lớn trong trường hợp này.

Vì tất cả các công cụ của chúng tôi có khả năng sẽ cần một số tiền hợp lý của logic, và sử dụng một enum đòi hỏi chúng ta phải thực hiện tất cả điều đó logic trong một nơi duy nhất, chúng ta có lẽ sẽ kết thúc với hàng loạt các báo cáo chuyển đổi ngày càng phức tạp - tìm kiếm cái gì đó như điều này:


```
extension Tool {
    var icon: Icon {
        switch self {
        case .pen:
            ...
        case .brush:
            ...
        case .fill:
            ...
        case .text:
            ...
        ...
        }
    }
    
    var name: String {
        switch self {
        ...
        }
    }

    func apply(at point: CGPoint, on canvas: Canvas) {
        switch self {
        ...
        }
    }
}
```

Một vấn đề với cách tiếp cận hiện nay của chúng tôi là nó làm cho nó khá khó khăn để lưu trữ quốc gia công cụ cụ thể - kể từ enums rằng phù hợp với CaseIterable không thể thực hiện bất kỳ giá trị đi kèm.

Để giải quyết tất cả những điều trên hai vấn đề, chúng ta hãy thay cố gắng thực hiện mỗi công cụ của chúng tôi sử dụng một giao thức - mà sẽ cung cấp cho chúng ta một giao diện chung, trong khi vẫn cho phép mỗi công cụ được khai báo và thực hiện trong sự cô lập:

```
// A protocol that acts as a shared interface for each of our tools:
protocol Tool {
    var icon: Icon { get }
    var name: String { get }
    func apply(at point: CGPoint, on canvas: Canvas)
}

// Simpler tools can just implement the required properties, as well
// as the 'apply' method for performing their drawing:
struct PenTool: Tool {
    let icon = Icon.pen
    let name = "Draw using a pen"

    func apply(at point: CGPoint, on canvas: Canvas) {
        ...
    }
}

// More complex tools are now free to declare their own state properties,
// which could then be used within their drawing code:
struct TextTool: Tool {
    let icon = Icon.letter
    let name = "Add text"

    var font = UIFont.systemFont(ofSize: UIFont.systemFontSize)
    var characterSpacing: CGFloat = 0

    func apply(at point: CGPoint, on canvas: Canvas) {
        ...
    }
}
```

Tuy nhiên, trong khi sự thay đổi trên cho phép chúng ta hoàn toàn tách triển khai cụ khác nhau của chúng tôi, chúng tôi cũng bị mất một trong những lợi ích chính của phương pháp enum dựa trên của chúng tôi - chúng ta có thể dễ dàng lặp trên mỗi công cụ bằng cách sử dụng Tool.allCases.


```
func allTools() -> [Tool] {
    return [
        PenTool(),
        BrushTool(),
        FillTool(),
        TextTool()
        ...
    ]
}
```

Nhưng nếu chúng ta không phải thực hiện một sự lựa chọn giữa các giao thức và sự đếm, và thay vào đó có thể trộn chúng để sắp xếp của đạt được tốt nhất của cả hai thế giới?

### Enum ở bên ngoài, protocol bên trong:

Chúng ta hãy trở lại Công cụ loại trở lại của chúng tôi để trở thành một enum, nhưng thay vì một lần nữa thực hiện tất cả các logic của chúng tôi như các phương pháp và tài sản đầy đủ các báo cáo chuyển đổi - Hãy thay vì giữ những triển khai giao thức định hướng, chỉ có thời gian này, chúng tôi sẽ làm cho họ điều khiển cho các công cụ của chúng tôi , chứ không phải là cơ quan đại diện mô hình của các công cụ tự.

Sử dụng giao thức cụ trước của chúng tôi như là một điểm bắt đầu, hãy định nghĩa một giao thức mới gọi là ToolController, - cùng với yêu cầu trước đó của chúng tôi - bao gồm một phương pháp cho phép mỗi công cụ cung cấp và quản lý tùy chọn riêng của mình xem. Bằng cách đó, chúng ta có thể kết thúc với một kiến trúc thực sự tách rời, trong đó mỗi bộ điều khiển hoàn toàn quản lý logic và giao diện người dùng cần thiết cho mỗi công cụ đưa ra:

```
protocol ToolController {
    var icon: Icon { get }
    var name: String { get }

    func apply(at point: CGPoint, on canvas: Canvas)
    func makeOptionsView() -> UIView?
}
```

Trở lại với thực hiện TextTool của chúng tôi từ trước, dưới đây là cách chúng ta có thể sửa đổi nó để thay vào đó trở thành một TextToolController rằng chiếu theo giao thức mới của chúng tôi:
```
class TextToolController: ToolController {
    let icon = Icon.letter
    let name = "Add text"

    private var font = UIFont.systemFont(ofSize: UIFont.systemFontSize)
    private var characterSpacing: CGFloat = 0

    func apply(at point: CGPoint, on canvas: Canvas) {
        ...
    }

    func makeOptionsView() -> UIView? {
        let view = UIView()

        let characterSpacingStepper = UIStepper()
        view.addSubview(characterSpacingStepper)

        // When creating our tool-specific options view, our
        // controller can now reference its own instance methods
        // and properties, just like a view controller would:
        characterSpacingStepper.addTarget(self,
            action: #selector(handleCharacterSpacingStepper),
            for: .valueChanged
        )
        
        ...

        return view
    }
    
    ...
}
```

Sau đó, thay vì phải cụ của chúng tôi enum chứa bất kỳ logic thực tế, chúng tôi sẽ chỉ cung cấp cho nó một phương pháp duy nhất cho việc tạo ra một ToolController tương ứng với trạng thái hiện tại của nó - tiết kiệm chúng tôi những rắc rối của việc phải viết tất cả những tuyên bố chuyển đổi mà chúng tôi đã có trước đó, trong khi vẫn cho phép chúng tôi tận dụng tối đa CaseIterable:

```
enum Tool: CaseIterable {
    case pen
    case brush
    case fill
    case text
    ...
}

extension Tool {
    func makeController() -> ToolController {
        switch self {
        case .pen:
            return PenToolController()
        case .brush:
            return BrushToolController()
        case .fill:
            return FillToolController()
        case .text:
            return TextToolController()
        ...
        }
    }
}
```


Cuối cùng, đặt tất cả các phần lại với nhau, chúng tôi sẽ bây giờ có thể cho cả hai dễ dàng lặp trên mỗi công cụ để xây dựng quan điểm toolbox view và kích hoạt logic công cụ hiện tại bằng cách giao tiếp với ToolController của nó - như thế này:

```
class CanvasViewController: UIViewController {
    private var tool = Tool.pen {
        didSet { controller = tool.makeController() }
    }
    private lazy var controller = tool.makeController()
    private let canvas = Canvas()
    
    ...
    
    private func makeToolboxView() -> UIView {
        let toolbox = UIView()
    
        for tool in Tool.allCases {
            // Add a button for selecting the tool
            ...
        }
    
        return toolbox
    }

    private func handleTapRecognizer(_ recognizer: UITapGestureRecognizer) {
        // Handling taps on the canvas using the current tool's controller:
        let location = recognizer.location(in: view)
        controller.apply(at: location, on: canvas)
    }
    
    ...
}
```

### Kết luận

Sự tuyệt vời của phương pháp trên là nó cho phép chúng ta hoàn toàn tách logic, trong khi vẫn xây dựng một nguồn duy nhất của chân lý cho tất cả các tiểu state và các biến thể. Chúng ta có thể cũng đã chọn để chia code của chúng ta lên một chút khác nhau, ví dụ như để giữ biểu tượng của từng công cụ và tên trong enum của chúng ta, và chỉ di chuyển logic thực tế của chúng ta ra để triển khai ToolController - nhưng đó là luôn luôn một cái gì đó chúng ta có thể tinh chỉnh trong tương lai.

Bài viết được dịch theo [bài viết cùng tên của tác giả John Sundell.](https://www.swiftbysundell.com/articles/mixing-enums-with-other-swift-types/)