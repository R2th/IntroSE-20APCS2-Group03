Được giới thiệu trong Swift 5.1, opaque return types là một tính năng ngôn ngữ có lẽ được liên kết nhiều nhất với SwiftUI và một số loại View được sử dụng khi xây dựng views sử dụng nó. Nhưng cũng giống như các tính năng khác của Swift, nó cung cấp năng lượng cho[ power SwiftUI’s DSL](https://www.swiftbysundell.com/articles/the-swift-51-features-that-power-swiftuis-api/), opaque return types là một tính năng có mục đích chung có thể được sử dụng trong nhiều context khác nhau.
Trong bài viết này, chúng ta hãy xem xét kỹ hơn về opaque return types - cách chúng có thể được sử dụng cả khi có và không có SwiftUI, và cách chúng so sánh với các kỹ thuật lập trình chung tương tự, chẳng hạn như type erasure.
## Inferred, hidden return types
Opaque return types về cơ bản cho phép chúng ta làm 2 việc. Đầu tiên, nó cho phép chúng ta tận dụng các khả năng suy luận kiểu của Swift compiler để tránh phải khai báo chính xác loại mà hàm đã cho hoặc computed property sẽ trả về, và thứ hai, chúng ẩn các inferred types khỏi các trình gọi của các API đó.
Hãy cùng xem xét trong thực tế, giả sử chúng ta đã xây dựng SwiftUI view sau, render 2 `Text` view vertically bằng cách sử dụng `VStack`:
```
struct TextView: View {
    var title: String
    var subtitle: String

    var body: some View {
        VStack(alignment: .leading) {
            Text(title).bold()
            Text(subtitle).foregroundColor(.secondary)
        }
    }
}
```
Ở trên, chúng tôi sử dụng opaque return type, `some View`, cho `body` của chúng ta, đây là quy ước phổ biến khi xây dựng các SwiftUI views.
Lý do cho điều đó là SwiftUI sử dụng rất nhiều type system của Swift để thực hiện các tác vụ như diffing và để đảm bảo full type safety trong view hierarchy của chúng ta - điều đó có nghĩa là chúng ta sẽ kết thúc với các kiểu trả về khá phức tạp, ngay cả đối với các views đơn giản, vì toàn bộ view hierarchy của chúng ta về cơ bản được mã hóa vào chính type system.
Ví dụ, kết quả view `body` ở trên như sau:
```
VStack<TupleView<(Text, Text)>>
```
Vì vậy, việc chúng ta không phải chỉ định rõ ràng các loại chính xác của SwiftUI views là một điều thực sự tốt, vì nếu không, chúng ta phải sửa đổi loại trả về body của mỗi view mỗi khi chúng tôi thay đổi hierarchy, điều này sẽ khiến SwiftUI khó khăn hơn nhiều trong việc sử dụng.
## Single return types required
Tuy nhiên, việc sử dụng opaque return type yêu cầu tất cả các code branches trong một hàm hoặc thuộc tính nhất định phải luôn trả về cùng một kiểu - vì nếu không trình biên dịch sẽ không thể suy ra kiểu đó cho chúng ta. Điều đó có thể dẫn đến một số tình huống phức tạp bất cứ khi nào chúng ta xử lý một số dạng logic có điều kiện, chẳng hạn như để xác định xem nên hiển thị loading spinner hay nội dung thực tế của SwiftUI view - như trong `ProductView` này:
```
struct ProductView: View {
    @ObservedObject var viewModel: ProductViewModel

    var body: some View {
        switch viewModel.state {
        case .isLoading:
            return Wrap(UIActivityIndicatorView()) {
                $0.startAnimating()
            }
        case .finishedLoading:
            return TextView(
                title: viewModel.productName,
                subtitle: viewModel.formattedPrice
            )
        }
    }
}
```
Cố gắng biên dịch mã trên sẽ cho chúng ta lỗi sau:
```
Function declares an opaque return type, but the return
statements in its body do not have matching underlying types.
```
Một cách để khắc phục lỗi đó là sử dụng tính năng [type erasure](https://www.swiftbysundell.com/articles/different-flavors-of-type-erasure-in-swift/) để cung cấp cho mỗi trường hợp trong số hai `switch` case của chúng ta cùng một kiểu trả về - `AnyView` trong trường hợp này - là một built-in wrapper cho phép chúng ta xóa kiểu cơ bản của SwiftUI view, như thế này:
```
struct ProductView: View {
    @ObservedObject var viewModel: ProductViewModel

    var body: some View {
        switch viewModel.state {
        case .isLoading:
            return AnyView(Wrap(UIActivityIndicatorView()) {
                $0.startAnimating()
            })
        case .finishedLoading:
            return AnyView(TextView(
                title: viewModel.productName,
                subtitle: viewModel.formattedPrice
            ))
        }
    }
}
```
Code của chúng ta hiện đã được biên dịch thành công, nhưng luôn phải thực hiện loại ở trên bất cứ khi nào chúng ta có một số dạng điều kiện ở một trong các view của chúng tôi có thể hơi tẻ nhạt, vì vậy hãy cũng khám phá một vài cách khác.
Trong Swift 5.3, là bản beta của Xcode 12, hai thay đổi quan trọng đã được thực hiện đối với [function builders feature](https://www.swiftbysundell.com/articles/the-swift-51-features-that-power-swiftuis-api/#function-builders) mà SwiftUI sử dụng để cho phép nhiều biểu thức riêng biệt được kết hợp thành một kiểu trả về duy nhất. Đầu tiên, chúng ta có thể sử dụng các câu lệnh `switch` trong một hàm, thuộc tính hoặc closure do function builder cung cấp - và thứ hai, mỗi `body` của view giờ đây kế thừa thuộc tính `@ViewBuilder` từ khai báo của chính `View` protocol.
Điều đó có nghĩa là trong bối cảnh này là khi chúng ta đã sẵn sàng nâng cấp lên Swift 5.3 và Xcode 12, chúng ta sẽ có thể cấu trúc lại `ProductView` ở trên bằng cách xóa cả cách sử dụng của `AnyView` và từ `return` keyword - Như thế này:
```
struct ProductView: View {
    @ObservedObject var viewModel: ProductViewModel

    var body: some View {
        switch viewModel.state {
        case .isLoading:
            ProgressView()
        case .finishedLoading:
            TextView(
                title: viewModel.productName,
                subtitle: viewModel.formattedPrice
            )
        }
    }
}
```
Điều đó thực sự tuyệt vời, nhưng điều thú vị hơn có lẽ là chúng ta cũng có thể thực sự tái tạo ít nhiều hành vi giống hệt nhau trong Swift 5.2. Bằng cách thêm thủ công thuộc tính `@ViewBuilder` vào thuộc tính `body` của view, chúng ta có thể sử dụng câu lệnh `if / else` kết hợp để triển khai cùng một loại logic có điều kiện:
```
struct ProductView: View {
    @ObservedObject var viewModel: ProductViewModel

    @ViewBuilder var body: some View {
        if viewModel.state == .isLoading {
            Wrap(UIActivityIndicatorView()) {
                $0.startAnimating()
            }
        } else {
            TextView(
                title: viewModel.productName,
                subtitle: viewModel.formattedPrice
            )
        }
    }
}
```
Vì vậy, trong context của SwiftUI, các kiểu trả về không rõ ràng được sử dụng để cho phép chúng ta trả về bất kỳ biểu thức `View` nào từ các triển khai `body` của chúng ta mà không cần phải chỉ định bất kỳ kiểu rõ ràng nào - miễn là mỗi code branch trả về cùng một kiểu, điều này trong nhiều trường hợp có thể được thực hiện bằng `ViewBuilder`.
## Type erasure beyond SwiftUI
Bây giờ chúng ta hãy bước ra ngoài lĩnh vực SwiftUI và khám phá cách các opaque return types cũng có thể được sử dụng trong các context khác. Một trường hợp sử dụng ban đầu mà chúng tôi có thể nghĩ đến có thể là sử dụng opaque return type để thực hiện xóa kiểu tự động - ví dụ: để có thể trả lại `some Publisher` khi xây dựng [Combine](https://www.swiftbysundell.com/basics/combine/) powered data pipeline, thay vì phải chỉ định chính xác loại nào của publisher được trả về, như sau:
```
struct ModelLoader<Model: Decodable> {
    var urlSession = URLSession.shared
    var decoder = JSONDecoder()
    var url: URL

    func load() -> some Publisher {
        urlSession.dataTaskPublisher(for: url)
            .map(\.data)
            .decode(type: Model.self, decoder: decoder)
    }
}
```
Mặc dù trường hợp sử dụng ở trên, bề ngoài, cực kỳ giống với cách các opaque return types được sử dụng trong context của SwiftUI, nhưng chúng ta sẽ gặp phải một vấn đề khá nghiêm trọng trong trường hợp này.
Một cách quan trọng mà các opaque types khác với type erasure  thông thường là chúng không lưu giữ bất kỳ thông tin nào về các loại cơ bản của chúng, có nghĩa là publisher trả về từ phương pháp `load` ở trên sẽ không có bất kỳ nhận thức nào về loại Model chung đang được load.
Vì vậy, trong trường hợp chúng ta muốn lưu giữ loại thông tin loại đó, điều mà chúng ta chắc chắn làm trong trường hợp này, thì tốt hơn nên sử dụng type erasure thay thế - có thể được thực hiện bằng `AnyPublisher` và `eraseToAnyPublisher` khi sử dụng Combine:
```
struct ModelLoader<Model: Decodable> {
    var urlSession = URLSession.shared
    var decoder = JSONDecoder()
    var url: URL

    func load() -> AnyPublisher<Model, Error> {
        urlSession.dataTaskPublisher(for: url)
            .map(\.data)
            .decode(type: Model.self, decoder: decoder)
            .eraseToAnyPublisher()
    }
}
```
Tuy nhiên, cũng có những tình huống mà chúng ta có thể muốn loại bỏ generic type ở trên và trong những loại tình huống đó, opaque return types có thể tỏ ra vô cùng hữu ích.
## Using protocol types directly
Hãy xem một ví dụ cuối cùng, trong đó chúng ta đã xác định một `Task` protocol được sử dụng để lập mô hình một loạt các tasks không đồng bộ có thể thành công hoặc thất bại mà không trả về bất kỳ giá trị cụ thể nào:
```
protocol Task {
    typealias Handler = (Result<Void, Error>) -> Void
    func perform(then handler: @escaping Handler)
}
```
Với cách tiếp cận trên, chúng ta hiện có thể sử dụng trực tiếp Task protocol của mình và tham chiếu nó giống như bất kỳ kiểu nào khác, chẳng hạn bằng cách trả về một instance phù hợp từ một phương thức, như sau:
```
struct DataUploader {
    var fileManager = FileManager.default
    var urlSession = URLSession.shared

    func taskForUploading(_ data: Data, to url: URL) -> Task {
        let file = File(data: data, manager: fileManager)

        return FileUploadingTask(
            file: file,
            url: url,
            session: urlSession
        )
    }
}
```
Tuy nhiên, nếu chúng ta muốn thêm bất kỳ yêu cầu nào về `Self` hoặc associated type vào `Task` protocol của mình, thì chúng ta sẽ bắt đầu gặp sự cố. Ví dụ: chúng ta có thể muốn yêu cầu tất cả các tasks cũng phải tuân theo `Identifiable` protocol được tích hợp sẵn, để có thể theo dõi từng task dựa trên ID của nó:
```
protocol Task: Identifiable {
    typealias Handler = (Result<Void, Error>) -> Void
    func perform(then handler: @escaping Handler)
}
```
Khi thực hiện thay đổi ở trên, bây giờ chúng ta sẽ bắt đầu nhận được loại lỗi compiler error sau đây bất cứ khi nào chúng ta reference trực tiếp `Task`, ví dụ: trong `DataUploader` ở trên:
```
Protocol 'Task' can only be used as a generic constraint
because it has Self or associated type requirements.
```
Đây là trường hợp mà sử dụng opaque return type có thể là một lựa chọn tuyệt vời, vì chỉ cần thêm `some` keyword vào trước Task, chúng ta sẽ có thể tiếp tục sử dụng triển khai giống hệt như trước đây:
```
struct DataUploader {
    ...

    func taskForUploading(_ data: Data, to url: URL) -> some Task {
        ...
    }
}
```
Một giải pháp thay thế cho cách tiếp cận ở trên là thay vào đó sử dụng kiểu cụ thể mà chúng ta thực sự đang trả về làm kiểu trả về của phương thức (`FileUploadingTask` trong trường hợp trên), nhưng điều đó không phải lúc nào cũng thực tế hoặc có thứ gì đó mà chúng tôi muốn tiết lộ như một phần của public API.
Ví dụ bổ sung, giả sử chúng ta muốn thêm một API tiện lợi cho phép chúng ta dễ dàng xâu chuỗi nhiệm vụ này sang nhiệm vụ khác. Để điều đó xảy ra, chúng ta có thể tạo một loại private `ChainedTask`, có hai instance `Task` và gọi chúng theo thứ tự khi thực hiện - như sau:
```
private struct ChainedTask<First: Task, Second: Task>: Task {
    let id = UUID()
    var first: First
    var second: Second

    func perform(then handler: @escaping Handler) {
        first.perform { [second] result in
            switch result {
            case .success:
                second.perform(then: handler)
            case .failure:
                handler(result)
            }
        }
    }
}
```
Sau đó, để tạo một public API cho kiểu `ChainedTask` mới của mình, chúng ta có thể sử dụng một thiết kế rất giống SwiftUI và mở rộng chính `Task` protocol bằng một phương thức trả về một instance `ChainedTask` ẩn sau một opaque `some Task` return type:
```
extension Task {
    func chained<T: Task>(to nextTask: T) -> some Task {
        ChainedTask(first: self, second: nextTask)
    }
}
```
Với những điều trên, giờ đây chúng ta có thể kết hợp hai nhiệm vụ riêng biệt thành một, tất cả mà không cần phải biết bất cứ điều gì về các loại cơ bản đang thực sự thực hiện công việc của chúng ta:
```
let uploadingTask = uploader.taskForUploading(data, to: url)
let confirmationTask = ConfirmationUITask()
let chainedTask = uploadingTask.chained(to: confirmationTask)

chainedTask.perform { result in
    switch result {
    case .success:
        // Handle successful outcome
    case .failure(let error):
        // Error handling
    }
}
```
Vì vậy, các opaque return types cũng có thể được sử dụng để ẩn thông tin generic type đằng sau một public API, đây có thể là một kỹ thuật tuyệt vời cần ghi nhớ, đặc biệt là khi xây dựng các [thư viện Swift có thể tái sử dụng](https://www.swiftbysundell.com/articles/designing-reusable-swift-libraries/).
## Conclusion
Opaque return types chắc chắn có thể được mô tả như một tính năng ngôn ngữ hơi thích hợp bên ngoài lĩnh vực SwiftUI, nhưng việc học cách chúng hoạt động vẫn có thể thực sự có giá trị - để có thể dễ dàng hiểu các vấn đề mà chúng ta có thể gặp phải khi sử dụng chúng trong các  SwiftUI view, và chúng còn có thể thực sự hữu ích khi làm việc với các generic protocols.

Hy vọng bài viết sẽ có ích với các bạn.

Reference: https://www.swiftbysundell.com/articles/opaque-return-types-in-swift/