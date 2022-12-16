Một trong những điểm khác biệt chính giữa SwiftUI và các phiên bản tiền nhiệm của nó, UIKit và AppKit, là các views chủ yếu được khai báo dưới dạng các value types, chứ không phải là các tham chiếu cụ thể đến những gì đang được vẽ trên màn hình.
Sự thay đổi đó trong thiết kế không chỉ đóng một vai trò quan trọng trong việc làm cho API của SwiftUI trở nên nhẹ nhàng mà còn có thể thường xuyên trở thành nguồn gây nhầm lẫn, đặc biệt là đối với các nhà phát triển (như tôi) đã quen với các quy ước hướng đối tượng mà Apple’s UI frameworks đã được sử dụng cho đến thời điểm này.
Vì vậy, trong bài viết này, chúng ta hãy xem xét kỹ lưỡng hơn ý nghĩa của việc SwiftUI trở thành một UI framework định hướng giá trị, và cách chúng ta có thể cần phá vỡ một số giả định nhất định và các phương pháp hay nhất trước đây dựa trên UIKit và AppKit khi bắt đầu áp dụng SwiftUI trong các dự án của chúng ta.
## The role of the body property
`View` protocol’s `body` property có lẽ là nguồn hiểu lầm phổ biến nhất về SwiftUI nói chung, đặc biệt là khi nói đến mối quan hệ của thuộc tính đó với chu kỳ cập nhật và hiển thị của view.
Trong UIKit và AppKit, chúng ta có các phương thức như `viewDidLoad` và `layoutSubviews`, về cơ bản hoạt động như các hook cho phép chúng ta phản hồi với một sự kiện hệ thống nhất định bằng cách thực thi một đoạn logic. Mặc dù có thể dễ dàng xem `body` property của SwiftUI như một sự kiện khác (cho phép chúng ta re-render view của mình), nhưng thực sự không phải vậy.
Thay vào đó, `body` property cho phép chúng ta mô tả cách chúng ta muốn view của mình được hiển thị với trạng thái hiện tại của nó và sau đó hệ thống sẽ sử dụng mô tả đó để xác định xem liệu view của chúng ta có thực sự nên được hiển thị hay không.
Ví dụ: khi xây dựng UIKit-based view controller, việc kích hoạt cập nhật model trong phương thức `viewWillAppear` thực sự phổ biến để đảm bảo rằng view controller luôn hiển thị dữ liệu mới nhất hiện có:
```
class ArticleViewController: UIViewController {
    private let viewModel: ArticleViewModel
    
    ...

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        viewModel.update()
    }
}
```
Sau đó, khi chuyển sang SwiftUI, ý tưởng ban đầu về cách sao chép mẫu ở trên có thể thực hiện như sau và thực hiện cập nhật view model khi tính toán view `body` của chúng ta - như sau:
```
struct ArticleView: View {
    @ObservedObject var viewModel: ArticleViewModel

    var body: some View {
        viewModel.update()

        return VStack {
            Text(viewModel.article.text)
            ...
        }
    }
}
```
Tuy nhiên, vấn đề với cách tiếp cận ở trên là phần view `body` sẽ được đánh giá lại bất cứ khi nào view model được thay đổi và cũng như mỗi khi bất kỳ parent views nào được cập nhật - có nghĩa là việc triển khai ở trên rất có thể sẽ dẫn đến nhiều cập nhật model không cần thiết (hoặc thậm chí cả chu kỳ cập nhật).
Vì vậy, hóa ra view `body` không phải là nơi tuyệt vời để gây ra các tác dụng phụ. Thay vào đó, SwiftUI cung cấp một số modifier khác nhau hoạt động rất giống với những hook mà chúng ta đã truy cập trong UIKit và AppKit. Trong trường hợp này, chúng ta có thể sử dụng `onAppear` modifier để có được hành vi tương tự như khi sử dụng phương thức `viewWillAppear` trong view controller:
```
struct ArticleView: View {
    @ObservedObject var viewModel: ArticleViewModel

    var body: some View {
        VStack {
            Text(viewModel.article.text)
            ...
        }
        .onAppear(perform: viewModel.update)
    }
}
```
## The initializer problem
Đồng thời, chúng ta cũng nên cẩn thận không đưa ra bất kỳ giả định nào về lifecycle của views. Trên thực tế, có thể lập luận rằng các SwiftUI view thậm chí không có vòng đời thích hợp, vì chúng là giá trị, không phải tham chiếu.
Ví dụ: bây giờ giả sử chúng tôi muốn sửa đổi `ArticleView` ở trên để làm cho nó cập nhật view model bất cứ khi nào ứng dụng được tiếp tục sau khi được chuyển xuống background, thay vì mỗi khi view đó xuất hiện. Một cách để biến điều đó thành hiện thực là một lần nữa thực hiện theo cách tiếp cận hướng đối tượng và quan sát `NotificationCenter` mặc định của ứng dụng từ bên trong view initializer - như sau:
```
struct ArticleView: View {
    @ObservedObject var viewModel: ArticleViewModel
    private var cancellable: AnyCancellable?

    init(viewModel: ArticleViewModel) {
        self.viewModel = viewModel

        cancellable = NotificationCenter.default.publisher(
    for: UIApplication.willEnterForegroundNotification
)
.sink { _ in
    viewModel.update()
}
    }

    var body: some View {
        VStack {
            Text(viewModel.article.text)
            ...
        }
    }
}
```
Tuy nhiên, mặc dù việc triển khai ở trên sẽ hoạt động hoàn toàn tốt khi hoạt động một mình, nhưng ngay sau khi chúng tôi bắt đầu nhúng `ArticleView` của mình vào các views khác, nó sẽ bắt đầu có nhiều vấn đề.
Để minh họa, ở đây chúng ta đang tạo nhiều giá trị `ArticleView` trong một `ArticleListView`, sử dụng các thành phần `List` và `NavigationLink` tích hợp để cho phép người dùng điều hướng đến từng article được hiển thị trong scrollable list:
```
struct ArticleListView: View {
    @ObservedObject var store: ArticleStore

    var body: some View {
        List(store.articles) { article in
            NavigationLink(article.title,
                destination: ArticleView(
    viewModel: ArticleViewModel(
        article: article,
        store: store
    )
)
            )
        }
    }
}
```
Vì `NavigationLink` yêu cầu chúng ta chỉ định từ trước từng `destination` (điều này ban đầu có vẻ khá lạ, nhưng có ý nghĩa rất nhiều khi chúng ta bắt đầu nghĩ về các SwiftUI views của mình như các giá trị đơn giản) và vì chúng ta hiện đang thiết lập các `NotificationCenter` observations của mình khi khởi tạo giá trị `ArticleView`, tất cả những observations đó sẽ được kích hoạt ngay lập tức - ngay cả khi những view đó chưa thực sự được hiển thị.
Vì vậy, thay vào đó, chúng ta hãy triển khai chức năng đó theo cách chi tiết hơn nhiều để chỉ có `ArticleView` hiện đang hiển thị mới được cập nhật khi ứng dụng chuyển sang foreground, thay vì cập nhật từng `ArticleViewModel` cùng một lúc, điều này sẽ không hiệu quả.
Để làm điều đó, chúng ta sẽ lại sử dụng một modifier chuyên dụng, `onReceive`, thay vì định cấu hình thủ công `NotificationCenter` observation như một phần của view’s initializer. Như một phần thưởng bổ sung, khi làm điều đó, chúng ta không cần phải tự mình duy trì một [Combine cancellable](https://www.swiftbysundell.com/basics/combine/) nữa - vì hệ thống hiện sẽ thay mặt chúng ta quản lý subscription đó:
```
struct ArticleView: View {
    @ObservedObject var viewModel: ArticleViewModel

    var body: some View {
        VStack {
            Text(viewModel.article.text)
            ...
        }
        .onReceive(NotificationCenter.default.publisher(
    for: UIApplication.willEnterForegroundNotification
)) { _ in
    viewModel.update()
}
    }
}
```
Vì vậy, chỉ vì một SwiftUI view được tạo không có nghĩa là nó sẽ được hiển thị hoặc sử dụng theo cách khác, đó là lý do tại sao hầu hết các API SwiftUI yêu cầu chúng ta tạo tất cả các view của chúng ta từ trước, thay vì từng view sắp được hiển thị. Một lần nữa, chúng tôi chỉ tạo ra các mô tả về view, thay vì thực sự tự render chúng - vì vậy, giống như cách lý tưởng chúng ta nên giữ các đặc tính body không có side effects, điều tương tự cũng đúng với các view initializer).
## Ensuring that UIKit and AppKit views can be properly reused
Việc tuân theo đúng thiết kế dự kiến của SwiftUI có lẽ đặc biệt quan trọng khi đưa các views UIKit hoặc AppKit vào SwiftUI bằng các protocol như `UIViewRepresentable`, vì khi làm như vậy, trên thực tế, chúng ta chịu trách nhiệm tạo và cập nhật các trường hợp cơ bản cho các views được hiển thị.
Tất cả các biến thể của các bridging protocols khác nhau của SwiftUI đều bao gồm hai phương pháp - một để creating (hoặc, theo cách nói của phương pháp gốc, making) phiên bản cơ bản và một để updating nó. Tuy nhiên, ban đầu có vẻ như `update` method chỉ cần thiết cho các dynamic, interactive components, và `make` method có thể chỉ cần cấu hình lại một instance đang được tạo ở nơi khác.
Ví dụ: ở đây, chúng ta đang làm điều đó để hiển thị một `NSAttributedString` bằng cách sử dụng một instance của UIKit’s `UILabel`, mà chúng ta đang quản lý bằng cách sử dụng private property:
```
struct AttributedText: UIViewRepresentable {
    var string: NSAttributedString

    private let label = UILabel()

    func makeUIView(context: Context) -> UILabel {
        label.attributedText = string
        return label
    }

    func updateUIView(_ view: UILabel, context: Context) {
        // No-op
    }
}
```
Tuy nhiên, có hai vấn đề khá lớn đối với việc triển khai trên:
* Đầu tiên, thực tế là chúng ta đang tạo `UILabel` cơ bản của mình bằng cách gán nó cho một thuộc tính có nghĩa là chúng tôi sẽ kết thúc việc recreate instance đó mỗi khi cấu trúc của chúng ta được recreate (điều này, như chúng ta đã khám phá, có thể xảy ra vì một số lý do, bao gồm cả thời điểm một trong các parent views của chúng ta được cập nhật).
* Thứ hai, bằng cách không cập nhật view trong method `updateUIView`, label sẽ tiếp tục hiển thị cùng một `attributedText` mà nó đã được chỉ định trong `makeUIView`, ngay cả khi thuộc tính `string` của chúng ta đã được sửa đổi.
Để khắc phục hai vấn đề đó, thay vào đó, chúng ta hãy tạo `UILabel` lazily trong method `makeUIView` và thay vì retaining nó, chúng ta sẽ để hệ thống quản lý nó cho chúng ta. Sau đó, chúng ta sẽ luôn chỉ định lại `string` cho thuộc tính `attributedText` của label mỗi khi `updateUIView` được gọi - điều này mang lại cho chúng ta cách triển khai sau:
```
struct AttributedText: UIViewRepresentable {
    var string: NSAttributedString

    func makeUIView(context: Context) -> UILabel {
        UILabel()
    }

    func updateUIView(_ view: UILabel, context: Context) {
        view.attributedText = string
    }
}
```
Với những điều trên, `UILabel` của chúng ta giờ đây sẽ được reused một cách chính xác và `attributedText` của nó sẽ luôn được cập nhật với thuộc tính string của wrapper.
Điểm hay của những thay đổi trên là chúng thực sự đã làm cho code của chúng ta đơn giản hơn nhiều, vì chúng ta một lần nữa tận dụng các quy ước và state management mechanisms, thay vì phát minh ra code của riêng chúng ta. Trên thực tế, đó có lẽ là điều quan trọng nhất là khi làm việc với SwiftUI, đó là cố gắng luôn tuân theo cách mà nó được thiết kế và sử dụng hợp lý các cơ chế tích hợp của nó - điều này có thể yêu cầu chúng ta phải "unclear" các pattern nhất định. mà chúng ta đã quen khi làm việc với các framework như UIKit và AppKit.
## Conclusion
Điều làm cho việc trở thành một nhà phát triển vừa thú vị nhưng đôi khi khá mệt mỏi là thực tế là chúng ta chưa bao giờ học xong. Hàng năm, hàng tháng hoặc đôi khi thậm chí hàng tuần, có một số form trong framework, tool hoặc API mới mà chúng ta cần phải học và mặc dù kiến thức đó có xu hướng khá gia tăng khi làm việc với một nền tảng duy nhất (chẳng hạn như iOS), SwiftUI vẫn còn phải thay đổi khi so sánh với những người tiền nhiệm của nó.
Vì vậy, việc sử dụng SwiftUI một cách hiệu quả nhất - trong một dự án hiện có hoặc khi xây dựng một dự án hoàn toàn mới - thường yêu cầu chúng ta sử dụng các patterns và kỹ thuật mới cho phép chúng ta sử dụng đầy đủ ngữ nghĩa và vòng đời của các view mà chúng ta sẽ tạo. 

Hy vọng bài viết sẽ có ích với các bạn.

Reference: https://www.swiftbysundell.com/articles/the-lifecycle-and-semantics-of-a-swiftui-view/