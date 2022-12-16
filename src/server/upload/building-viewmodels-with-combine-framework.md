### ViewModels là gì?

> ViewModel is a layer between your view and data. ViewModels usually fetch the data using service objects, format it, and provide a formatted version to your view.

Nó chính là tầng giữa của view và data. Nó được sử dụng để lấy dữ liệu bằng các service, định dạng dữ liệu và cung cấp cho view.

Gần đầy Apple có vẻ như đang chuyển dần sang MVVM. Thực tế tôi nhận thấy vài điều khá thú vị từ Apple, họ đang dần chuyển ObservableObject protocol sang framework Combine. Hãy cùng xem Apple làm gì với MVVM pattern bằng cách xem ObservableObject nó thế nào.

```
/// A type of object with a publisher that emits before the object has changed.
public protocol ObservableObject : AnyObject {

    /// The type of publisher that emits before the object has changed.
    associatedtype ObjectWillChangePublisher : Publisher = ObservableObjectPublisher where Self.ObjectWillChangePublisher.Failure == Never

    /// A publisher that emits before the object has changed.
    var objectWillChange: Self.ObjectWillChangePublisher { get }
}
```

Giao thức ObservableObject chỉ có 1 nhiệm vụ duy nhất đó là phát ra (emits) sự kiện trước khi object đó thay đổi. Giờ chúng ta cùng viết một ViewModel conforms giao thức ObservableObject nhé.


```
final class PostsViewModel: ObservableObject {
    let objectWillChange = PassthroughSubject<Void, Never>()

    private (set) var posts: [Post] = []

    func fetch() {
        // fetch posts
        objectWillChange.send()
        // assign new data to the posts variable
    }
}
```

Ở đây chúng ta có ViewModel, nó sẽ lấy các posts, lưu trữ ở biến và phát ra thông báo objectWillChange. Hãy cùng xem sử dụng nó thế nào ở ViewController nhé.

```
final class PostsViewController: UIViewController {
    let viewModel: PostsViewModel

    override func viewDidLoad() {
        super.viewDidLoad()
        bindViewModel()
        viewModel.fetch()
    }

    private func bindViewModel() {
        viewModel.objectWillChange.sink { [weak self] in
            guard let self = self else {
                return
            }
            self.renderPosts(self.viewModel.posts)
        }
    }
}
```

Như bạn có thể thấy từ ví dụ trên, PostsViewController sẽ start observing từ ViewModel, sau đó ViewModel sẽ lấy dữ liệu. Ngay sau đó có data thì nó sẽ phát ra (đại khái bạn hiểu là một sự kiện hay một cái gì đó để nhận biết dữ liệu sẽ thay đổi). ViewController sẽ render các post từ func renderPosts và hiển thị các bài post đó.


### Published property wrapper

Chúng ta có thể sử dụng property Published, nó cho phép chúng ta wrap bất kể thuộc tính nào sẽ phát ra giá trị hiện tại khi thay đổi. Và tất nhiên khi đó chúng ta không còn cần định nghĩa **objectWillChange**. Công việc đó giờ swift compiler sẽ đảm nhận.

Lúc này ViewModel sẽ như sau:
```
final class PostsViewModel: ObservableObject {
    @Published private(set) var posts: [Post] = []

    func fetch() {
        // fetch posts and assign them to `posts` variable
    }
}
```
Nó sẽ gọn hơn rất nhiều. Trong ví dụ trên thì chúng ta không cần phải emits giá trị ra một cách thử công như bên trên nữa. Các công việc còn lại được compiler xử lý giúp rồi nhé. Và tất nhiên PostViewController vẫn sẽ giữ nguyên (tuy nhiên chúng ta có 1 cách khác để viết và ngắn gọn hơn, hãy cùng tham khảo nhé).

```
final class PostsViewController: UIViewController {
    let viewModel: PostsViewModel

    override func viewDidLoad() {
        super.viewDidLoad()
        bindViewModel()
        viewModel.fetch()
    }

    private func bindViewModel() {
        viewModel.$posts.sink { [weak self] posts in
            self?.renderPosts(posts)
        }
    }
}
```

### Kết luận 

Chúng ta có thể dễ dàng thực hiện logic tương tự bằng cách sử dụng RxSwift, ReactiveSwift hoặc bất kỳ framework nào. Nhưng tôi cảm thấy như MVVM sẽ là một lựa chọn mặc định trong việc kiến trúc các ứng dụng iOS. Ít nhất là bây giờ, khi Apple cung cấp cho chúng ta tất cả các công cụ cần thiết để xây dựng nó. Tôi hy vọng bạn thích bài viết. 

Tham khảo: https://swiftwithmajid.com/2020/02/05/building-viewmodels-with-combine-framework/