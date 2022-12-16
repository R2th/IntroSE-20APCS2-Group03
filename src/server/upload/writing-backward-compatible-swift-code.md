Việc thêm các tính năng mới vào code hiện có có thể thực sự khó khăn - đặc biệt nếu code đó được sử dụng nhiều trong một hoặc nhiều dự án. Chúng tôi không chỉ phải hiểu tác động của những thay đổi có thể có trong dự án, nhưng chúng ta cũng có nguy cơ gây ra lỗi nếu chúng tôi thực hiện các thay đổi lớn đối với API hiện tại.
Backward compatibility có thể theo nhiều cách giúp chúng ta thực hiện những thay đổi đó theo cách mượt mà hơn nhiều. Tránh thay thế hoàn toàn các API và quy ước hiện tại có thể cho phép chúng ta di chuyển sang các bản triển khai mới từng phần một - cho phép chúng tôi thêm các tính năng mới mà không vi phạm bất kỳ code hiện có nào của chúng ta.
Đặc biệt trong dự án lớn, điều này có thể thực sự quan trọng - vì nó sẽ cho phép chúng tôi thực hiện các sửa đổi nhỏ mà không thay đổi tất cả các call site cùng một lúc - giúp thay đổi dễ dàng hơn trong việc xem xét, thử nghiệm và tích hợp. Trong bài viết này, chúng ta hãy xem xét một số kỹ thuật khác nhau để có thể thực hiện các thay đổi đối với dự án của chúng ta.
## Discardable results
Đôi khi chúng ta thấy mình trong những tình huống mà ta muốn hàm xử lý của mình trả về một số trạng thái hoặc kết quả nào đó. Ví dụ: giả sử chúng tôi đang sử dụng URLHandler trong ứng dụng của chúng ta để xử lý URL từ nhiều nguồn khác nhau (như deep links hoặc web views):
```
class URLHandler {
    func handle(_ url: URL) {
        ...
    }
}
```
Ngay bây giờ URLHandler của chúng ta không trả về bất cứ thứ gì từ phương thức xử lý của nó - chúng ta chỉ cần yêu cầu nó xử lý một URL đã cho, và nó thành công hay thất bại chúng ta cũng không biết cách nào để biết kết quả.
Cho đến thời điểm này, điều đó là tốt, nhưng chúng ta muốn phản ứng khác nhau tùy thuộc vào việc một URL đã được xử lý thành công hay không trong một tính năng mới mà chúng tôi đang xây dựng (ví dụ: chúng tôi muốn hiển thị lỗi trong trường hợp chúng ta kết thúc bằng một URL không hợp lệ).
Để thực hiện điều đó, chúng ta sẽ bắt đầu bằng cách tạo một enum để biểu thị kết quả URLHandler, như sau:
```
extension URLHandler {
    enum Outcome {
        case handled
        case failed(Error)
    }
}
```
Tuy nhiên, nếu chúng ta chỉ cập nhật phương thức xử lý của mình để trả về Kết quả, chúng tôi sẽ kết thúc với cảnh báo trên toàn bộ dự án của chúng ta cho chúng ta biết rằng kết quả của việc gọi phương thức đó không được sử dụng. Rất may, chúng ta có thể tránh điều đó bằng cách sử dụng @discardableResult.
Bằng cách thêm thuộc tính @discardableResult vào phương thức của chúng ta, về cơ bản chúng ta nói với trình biên dịch rằng nó hoàn toàn tốt để loại bỏ kết quả của nó - cho chúng ta sự linh hoạt để sử dụng kết quả trong coe mới của chúng ta, trong khi vẫn bỏ qua nó trong code cũ của chúng ta.
```
class URLHandler {
    @discardableResult
    func handle(_ url: URL) -> Outcome {
        do {
            try validate(url)
        } catch {
            return .failed(error)
        }

        ...

        return .handled
    }
}
```
Ưu điểm của cách tiếp cận trên là chúng ta đã bổ sung thêm sức mạnh cho URLHandler của mình mà không ảnh hưởng đến bất kỳ code hiện có nào
## Extended enum cases
Enums là một cách tuyệt vời để mô hình hóa một tập hợp các giá trị loại trừ lẫn nhau, nhưng đôi khi chúng ta cần bổ sung thêm vào một enum được sử dụng rộng rãi trong suốt một dự án. Ví dụ, giả sử chúng ta đang sử dụng mẫu Navigator trong một ứng dụng, và chúng ta đang sử dụng một enum để mô hình hóa các đích khác nhau mà người dùng có thể điều hướng đến
```
extension Navigator {
    enum Destination {
        case favorites
        case bookList
        case book(Book)
    }
}
```
Ta muốn thay đổi enum book destination thành như sau
```
extension Navigator {
    enum Destination {
        case favorites
        case bookList
        case bookDetails(Book.Metadata)
    }
}
```
Thay vì phải đi qua code của chúng ta và cập nhật tất cả các .book để thay vào đó sử dụng .bookDetails. Sử dụng phương pháp tĩnh, chúng ta có thể tạo một loại trường hợp enum "giả mạo" khớp với kiểu book cũ, như sau:
```
extension Navigator.Destination {
    static func book(_ book: Book) -> Navigator.Destination {
        return .bookDetails(book.metadata)
    }
}
```
Bằng cách thực hiện ở trên, chúng ta có thể sử dụng đích bookDetails mới trong tất cả code mới của chúng ta, trong khi vẫn giữ nguyên code cũ. Vì suy luận kiểu của Swift cho phép chúng ta sử dụng ký pháp chấm ngay cả đối với những thứ như phương thức tĩnh, tất cả các call site có thể vẫn chính xác giống như trước đây.
## Default arguments
Khi thêm các tham số mới vào một hàm hoặc khởi tạo, sử dụng các đối số mặc định có thể là một cách tuyệt vời để duy trì khả năng tương thích ngược - đặc biệt nếu các thay đổi mà chúng ta muốn thực hiện hoàn toàn là phụ gia. Ví dụ, giả sử chúng ta có một hàm cho phép chúng ta tải dữ liệu từ một URL đã cho:
```
func loadData(from url: URL,
              then handler: @escaping (Result<Data>) -> Void) {
    ...
}
```
Nếu bây giờ chúng ta muốn thêm tùy chọn để tùy chỉnh thời gian cho request timeout - với khả năng tương thích ngược - chúng ta có thể làm như vậy bằng cách sử dụng đối số mặc định khớp với giá trị chúng tôi đã sử dụng trong hàm loadData, như sau:
```
func loadData(from url: URL,
              timeout: TimeInterval = 10,
              then handler: @escaping (Result<Data>) -> Void) {
    ...
}
```
## Protocol extensions
Các giá trị đối số mặc định cũng có thể được sử dụng để thực hiện các thay đổi tương thích ngược đối với các giao thức. Mặc dù chúng ta không thể thêm các giá trị mặc định trực tiếp vào các khai báo hàm giao thức, chúng ta có thể đạt được kết quả tương tự bằng cách sử dụng các phần mở rộng giao thức.

Ở đây chúng tôi đang sử dụng giao thức Canvas để tạo giao diện trừu tượng cho hệ thống hiển thị tùy chỉnh cho phép chúng ta vẽ các hình dạng khác nhau:
```
protocol Canvas {
    func draw(_ shape: Shape, at point: Point)
}
```
Bây giờ chúng ta muốn thêm hỗ trợ cho việc áp dụng một biến đổi cho bất kỳ hình dạng nào mà chúng ta đang vẽ. Để thực hiện điều đó, chúng ta sẽ thêm một tham số biến đổi vào phương thức vẽ của chúng ta, và để làm cho sự thay đổi đó hoàn toàn tương thích ngược, chúng ta đi kèm với thay đổi đó với một phần mở rộng giao thức. - như thế này:
```
protocol Canvas {
    func draw(_ shape: Shape, at point: Point, transform: Transform)
}

extension Canvas {
    func draw(_ shape: Shape, at point: Point) {
        draw(shape, at: point, transform: .identity)
    }
}
```
Phần mở rộng ở trên không chỉ phục vụ như một cách để duy trì khả năng tương thích ngược, nó còn cung cấp cho chúng ta một API tiện lợi tốt đẹp khi chúng ta không quan tâm đến việc thêm biến đổi khi vẽ một hình dạng
## Deprecations
Khả năng tương thích ngược có thể là một "con dao hai lưỡi" - trong đó chúng ta có thể thêm nhiều mã hơn để có thể tiếp tục phục vụ các call site hiện tại, thay vì chỉ cập nhật chúng trong một lần. Đôi khi, chúng ta muốn mã bổ sung đó cần lưu ý, để thuận tiện hoặc đơn giản tránh yêu cầu người dùng API thay đổi mã của họ chỉ vì chúng tôi cần thêm tính năng mới, nhưng đôi khi chúng tôi muốn làm rõ ràng API cũ sẽ biến mất.
Sử dụng thuộc tính @available cùng với deprecated keyword, chúng tôi có thể chính thức từ chối API cũ của chúng tôi đồng thời cung cấp gợi ý về API đã thay thế nó, như thế này:
```
extension Navigator.Destination {
    @available(*, deprecated, renamed: "bookDetails")
    static func book(_ book: Book) -> Navigator.Destination {
        return .bookDetails(book.metadata)
    }
}
```
Chúng ta cũng có thể sử dụng deprecated với protocol và thậm chí sử dụng thông báo tùy chỉnh trong trường hợp chúng tôi muốn thực hiện điều gì đó như hướng các đồng nghiệp hoặc người dùng API tới tài liệu chi tiết cách di chuyển từ API cũ sang API mới:
```
extension Canvas {
    @available(*, deprecated, message: "See docs/MigratingToTransforms.md")
    func draw(_ shape: Shape, at point: Point) {
        draw(shape, at: point, transform: .identity)
    }
}
```
Thực hiện thêm một vài bước để làm cho các thay đổi API tương thích ngược có thể có vẻ như một nỗ lực không cần thiết lúc đầu, nhưng nó thường có thể làm cho các việc rafactor code và bổ sung API nhanh hơn và dễ dàng hơn. Đặc biệt là trong một nhóm lớn hơn hoặc khi làm việc trên nguồn mở, tránh phá vỡ các API với mọi thay đổi hoặc bổ sung có thể giúp cải thiện quy trình làm việc giữa các nhà phát triển và khả năng tương thích ngược cũng có thể là một công cụ giao tiếp tuyệt vời.
Hy vọng bài viết sẽ có ích với các bạn