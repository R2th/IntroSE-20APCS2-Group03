- Một trong những điều khác biệt của `SwiftUI` với những người tiền nhiệm như `UIKit`, `AppKit` là các `view` chủ yếu được khai báo dưới dạng `value type` như `struct` thay vì `class`.

- Đây là một trong những thay đổi trong thiết kế kiến trúc khiến `API` `SwiftUI` hoạt động nhẹ nhàng, linh hoạt. Thay đổi này đôi khi khiến cho những `developer` trong đó có tôi thường xuyên nhầm lẫn vì các kiến thức lập trình hướng đối tượng đã sử dụng từ trước.

- Vì vậy trong bài viết này chúng ta hãy cùng dành thời gian để nghiên cữu một cách cẩn thận, kỹ lưỡng hơn về ý nghĩa, cách sử dụng của `SwiftUI` trong cách khai báo, tương tác với UI và hơn nữa là tìm cách để có thể tìm ra các phương pháp mới tốt hơn việc sử dụng `UIKit`, `AppKit` trong các project mới.

## 1/ Vai trò của property body:

- `Property body` trong `View Protocol` có lẽ là điều khó hiểu nhất trong `SwiftUI` đặc biệt là khi nó liên quan mật thiết đến việc `update` của `view` cũng như `rendering cycle`.

- Trong `UIKit`, `AppKit` chúng ta sử dụng những `method` như `viewDidLoad` hay `layoutSubviews` để nhận biết các event của hệ thống cũng như xử lý một đoạn logic trong khi với `SwiftUI` `body property` có thể render lại view mà lại không sử dụng những `method` trên.

- `body property` cho phép chúng ta `render view` dựa trên `state` hiện tại của nó và hệ thống sẽ dựa vào `state` hiện tại của của nó để xem xét việc có cần `render` lại view không. Ví dụ như khi build một `UIKit` `ViewController` chúng ta thường `trigger` các `update`của `model` với `method` `viewWillAppear` để đảm bảo rằng `viewController` luôn luôn `render` lại `view` với `data` mới nhất:

```swift
class ArticleViewController: UIViewController {
    private let viewModel: ArticleViewModel
    
    ...

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        viewModel.update()
    }
}
```

- Khi chuyển sang `S`wiftUI` thay vì ý tưởng `render` lại `view` mỗi khi `viewWillAppear` thì chúng ta triển khai việc `viewModel` sẽ `update` khi xử lý `body property` mới nhất:

```swift
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

- Tuy nhiên có vấn đề với việc triển khai bên trên là `body` của `view` sẽ bị so sánh ngay khi các `viewModel` có sự thay đổi nghĩa là chúng ta sẽ gây ra rất nhiều việc `update` không cần thiết của `model`.

- Dễ nhận thấy rằng `body property` không phải là là nơi thuận tiện để xử lý những việc `update` không cần thiết trên mà thay vào đó `SwiftUI` đã cung cấp một vài tính năng tương tự như trong `UIKit`, `AppKit`. Chúng ta đang nói đến tùy chỉnh `onAppear` tương tự như `viewWillAppear` trong `controlelr`:

```swift
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

## 2/ The initializer problem:

- `Life cycle` là một vấn đề quan trọng mà mỗi `developer` cần lưu tâm khi làm việc với `view`. Thực tế chúng ta dễ nhận thấy các `view` trong `SwiftUI` còn không có một vòng đời đúng nghĩa vì chúng ta sử dụng `value type` mà không phải là `reference type`.

- Khi chúng ta muốn thay đổi một `ArticleView` và update lại viewModel mỗi khi `app` được `resume` mỗi khi chuyển về `background` thay vì mỗi khi `viewappear`. Một cách để chúng ta thực hiện điều đó là theo dõi mỗi đối tượng thông qua `NotificationCenter` khi khởi tạo như sau:

```swift
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

- Triển khai trên hoạt động bình thường cho đến khi chúng ta những `ArticleView` vào các `view` khác. Để diễn đạt trường hợp này chúng ta cùng tạo ra nhiều `ArticleView` `value` như `ArticleListView` bằng việc sử dụng `List` và `NavigationLink`:

```swift
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

- `NavigationLink` sẽ yêu cầu chúng ta cung cấp chi tiết `destination` cho từng `view` đến và chúng ta đã `setup` trong `NotificationCenter` khi khởi tạo `ArticleView`. Các `observation` sẽ được `active` ngay lập tức mặc dù các `view` còn chưa được `render`.

- Do đó chúng ta nên triển khai các `function` càng nhỏ càng tốt và các `ArticleView` sẽ được update khi `app` được chuyển về `foreground` thay vì `update` từng `ArticleViewModel` một.

- Để thực hiện triển khai trên chúng ta cần đến `onReceive` thay vì sử dụng `NotificationCenter` để thao dõi quá trình `view` được khởi tạo. Thêm vào đó chúng ta không còn cần `Combine cancellable` nữa:

```swift
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

- Khi `SwiftUI` view được khởi tạo không đồng nghĩa với việc nó sẽ được hiển thị lên hoặc sử dụng. Đó là lí do tại sao `SwiftUI` yêu cầu chúng ta cần tạo ra các `view` trước thay vì khởi tạo từng view một.

## 3/ Ensuring that UIKit and AppKit views can be properly reused:

- Chúng ta có thể đưa `UIKit`, `AppKit` vào sử dụng cùng SwiftUI thông qua `Protocol` `UIViewPresentable` và chúng ta sẽ chịu trách nghiệm tạo và `update` các `instance` của `view` đang được hiển trị và sử dụng.

- Để minh họa chúng ta cùng `render` `NSAttributedString` bằng cách sử dụng `instance` `UIKit` như `UILabel`:

```swift
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

- Tuy nhiên để sử dụng triển khai bên trên chúng ta cần giải quyết 2 vấn đề lớn
    + Trong trường hợp chúng ta khởi tạo `UILabel` bằng cách `assign` nó cho property nghĩa là chúng ta không thể tái khởi tạo klaij nó mỗi khi `struct` được khởi tạo lại.
    + Không `update` lại view với `updateUIView` `method`, `label` sẽ tiếp tục `render` `attributedText` giống như cũ và `assign` lại cho `makeUIView` mặc dù `string` đã được `update`.

- Cùng khỏi tạo `UILabel` với `makeUIView` method. Chúng ta luôn `assign` lại `string` của `label` với `attributedText` `property` mỗi lần `updateUIView` được gọi:

```swift
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

- Với cách trên thì cuối cùng `UILabel` của chúng ta cũng có thể tái sử dụng và `attributedText` luôn luôn được `update` với `wrapper` `string` `property`.