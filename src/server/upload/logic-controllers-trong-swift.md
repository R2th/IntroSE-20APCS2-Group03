Có Một thách thức lớn mà hầu hết các Swift developers phải đối mặt theo thời gian, là làm thế nào để đối phó với **Massive View Controllers**. Cho dù chúng ta đang nói về các subclasses của **UIViewController** trên iOS và tvOS hoặc **NSViewController** trên Mac, loại class này có xu hướng phát triển rất lớn - cả về phạm vi và số dòng code.

Vấn đề với việc triển khai nhiều view controller là chúng đơn giản có quá nhiều trách nhiệm. Chúng quản lý views, thực hiện layout và xử lý sự kiện - nhưng cũng quản lý kết nối, tải hình ảnh, lưu vào bộ nhớ cache và nhiều việc khác. Một số có thể lập luận rằng vấn đề này là cố hữu với cách thiết kế mẫu MVC được cấu trúc - nó khuyến khích các lớp điều khiển lớn, vì chúng là điểm trung tâm giữa view và model.

Mặc dù các mô hình khác với MVC mặc định của Apple chắc chắn có vị trí của nó, và có thể trong nhiều tình huống là một công cụ tuyệt vời để phá vỡ các view controller lớn, cũng có nhiều cách giải quyết vấn đề này mà không cần chuyển đổi hoàn toàn mô hình. Tuần này, chúng ta hãy xem một cách như vậy - bằng cách sử dụng **Logic Controllers**.

Các ví dụ trong bài viết này sẽ sử dụng UIViewController và code dựa trên iOS, nhưng cũng có thể được áp dụng với NSViewController trên macOS.

### Composition vs extraction

Nói chung, có hai cách tiếp cận mà chúng ta có thể thực hiện khi chúng ta muốn chia nhỏ một loại lớn thành nhiều phần - **Composition vs extraction**

Sử dụng **Composition**, chúng ta có thể kết hợp nhiều loại với nhau để tạo thành chức năng mới. Thay vì tạo các loại lớn có nhiều trách nhiệm, chúng ta tạo ra các khối xây dựng mô-đun có thể được kết hợp để cung cấp cho chúng tôi các tính năng mà chúng tôi cần, chúng ta sử dụng bố cục để tạo các view controler nhỏ, có thể tái sử dụng có thể dễ dàng được đẩy vào những chức năng khác. Dưới đây là một mẫu code,  chúng ta thêm một LoadViewController như một child view để hiển thị một chỉ số tải:

```
class ListViewController: UITableViewController {
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        loadItems()
    }

    private func loadItems() {
        let loadingViewController = LoadingViewController()
        add(loadingViewController)

        dataLoader.loadItems { [weak self] result in
            loadingViewController.remove()
            self?.handle(result)
        }
    }
}
```

Trong khi tạo view controllers tổng hợp, có mục đích là rất tốt cho những thứ như loading views và reusable list. Đôi khi phá vỡ một view controller thành những thứ nhỏ, modular child không phải là rất thực tế - và có thể thêm rất nhiều phức tạp nhưng đạt được rất ít. Trong các tình huống như thế này, việc trích xuất chức năng thành một kiểu riêng biệt, chuyên dụng có thể là một lựa chọn tốt hơn.

Sử dụng **extraction** chúng ta có thể kéo ra các phần của một type lớn thành một type riêng biệt mà vẫn còn được kết hợp chặt chẽ với bản gốc. Đây là điều mà một số mẫu kiến trúc tập trung vào - bao gồm những thứ như **MVVM** (Model-View-ViewModel) và **MVP** (Model-View-Presenter). Trong trường hợp **MVVM**, một kiểu View Model được giới thiệu để xử lý phần lớn logic chuyển đổi Model-> View - và khi sử dụng **MVP**, một Presenter được sử dụng để chứa tất cả logic trình bày view.

Trong khi chúng ta sẽ xem xét kỹ hơn cả MVVM và MVP (cùng với các mẫu kiến trúc khác) trong các bài viết sau, chúng ta hãy xem cách khai thác có thể được sử dụng trong khi vẫn gắn bó với MVC như thế nào.

### Logic và views

Một điều khiến cho kiểu ViewController hơi khó khăn là nó thuộc về cả lớp view lẫn lớp controller cùng một lúc (nó nằm ngay trong tên ViewController). Nhưng giống như cách child view controller  đã cho chúng ta thấy rằng không có gì ngăn cản chúng ta sử dụng nhiều view controller để tạo thành một UI, thực sự không có gì ngăn cản chúng ta có *multiple controller types*.

Một cách để làm điều đó là chia view controller thành ***view part*** và ***controller part***. Mộtview controller sẽ vẫn là một lớp con của UIViewController và chứa tất cả các chức năng liên quan đến view, trong khi một view controller khác có thể bị tách rời khỏi giao diện người dùng và thay vào đó tập trung vào xử lý logic.

Ví dụ, giả sử chúng ta đang xây dựng một **ProfileViewController**, mà chúng ta sẽ sử dụng để hiển thị profile của người dùng hiện tại trong app. Đó là một phần UI tương đối phức tạp, ở chỗ nó cần thực hiện một số tác vụ khác nhau:

* Tải hồ sơ của người dùng và hiển thị nó.

* Cho phép người dùng thay đổi tên hồ sơ và tên hiển thị của họ.

* Cho phép người dùng đăng xuất khỏi ứng dụng.

Nếu chúng ta đặt tất cả các chức năng trên vào chính loại **ProfileViewController**, chúng ta biết khá nhiều rằng nó sẽ trở nên khá lớn và phức tạp. Thay vào đó, hãy tạo hai controller cho màn hình Profile của chúng ta - một **ProfileViewController** và một **ProfileLogicController**.

### Logic controllers

Hãy bắt đầu bằng cách xác định bộ điều khiển logic của chúng ta. API của nó sẽ bao gồm tất cả các hành động có thể được thực hiện trong quan điểm của chúng ta và đối với mỗi hành động, một trạng thái mới được trả về như một phần của trình xử lý hoàn thành. Điều đó có nghĩa là bộ điều khiển logic của chúng ta có thể trở nên không trạng thái nhiều hơn hoặc ít hơn, có nghĩa là nó sẽ dễ dàng hơn nhiều để kiểm tra. Dưới đây là những gì **ProfileLogicController** của chúng ta sẽ kết thúc như sau:

```
class ProfileLogicController {
    typealias Handler = (ProfileState) -> Void

    func load(then handler: @escaping Handler) {
        // Load the state of the view and then run a completion handler
    }

    func changeDisplayName(to name: String, then handler: @escaping Handler) {
        // Change the user's display name and then run a completion handler
    }

    func changeProfilePhoto(to photo: UIImage, then handler: @escaping Handler) {
        // Change the user's profile photo and then run a completion handler
    }

    func logout() {
        // Log the user out, then re-direct to the login screen
    }
}
```

Ở trên, loại trạng thái cho màn hình Profile của chúng ta được gọi là **ProfileState**. Đó là những gì chúng tôi sẽ sử dụng để nói cho **ProfileViewController** của chúng tôi những gì để render. Chúng ta sẽ sử dụng kỹ thuật này từ "*Modeling state in Swift*" và tạo một **enum** với các trường hợp riêng biệt cho mỗi trạng thái, như sau:

```
enum ProfileState {
    case loading
    case presenting(User)
    case failed(Error)
}
```


Mỗi khi một sự kiện xảy ra trong giao diện người dùng, **ProfileViewController** của chúng ta sẽ gọi **ProfileLogicController** để xử lý sự kiện đó và trả về một **ProfileState** mới cho trình view controller để hiển thị. Ví dụ, khi khung nhìn profile sắp xuất hiện trên màn hình, chúng ta sẽ gọi load () trên bộ điều khiển logic để lấy trạng thái của khung nhìn - sau đó chúng ta sẽ render:

```
class ProfileViewController: UIViewController {
    private let logicController: ProfileLogicController

    init(logicController: ProfileLogicController) {
        self.logicController = logicController
        super.init(nibName: nil, bundle: nil)
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)

        render(.loading)

        logicController.load { [weak self] state in
            self?.render(state)
        }
    }
}
```

Bây giờ chúng ta có thể đặt tất cả logic liên quan đến việc tải trạng thái của view bên logic controller của chúng ta, thay vì phải trộn nó với thiết lập view và layout code. Ví dụ, chúng ta có thể muốn kiểm tra xem chúng ta có một mô hình User được lưu trong bộ nhớ cache có thể được trả về một cách đơn giản hay bằng cách tải một mô hình qua mạng - như sau:

```
class ProfileLogicController {
    func load(then handler: @escaping Handler) {
        let cacheKey = "user"

        if let existingUser: User = cache.object(forKey: cacheKey) {
            handler(.presenting(existingUser))
            return
        }

        dataLoader.loadData(from: .currentUser) { [cache] result in
            switch result {
            case .success(let user):
                cache.insert(user, forKey: cacheKey)
                handler(.presenting(user))
            case .failure(let error):
                handler(.failed(error))
            }
        }
    }
}
```

Cái hay của cách tiếp cận này là view controller của chúng ta không cần biết trạng thái của nó được tải như thế nào, nó đơn giản chỉ cần lấy bất kỳ trạng thái nào mà bộ điều khiển logic đưa ra và render nó. Bằng cách tách logic của chúng tôi khỏi code giao diện người dùng của chúng tôi, nó cũng trở nên dễ dàng hơn nhiều để kiểm tra. Để kiểm tra phương thức tải trên, tất cả những gì chúng ta phải làm là giả lập trình tải dữ liệu và bộ đệm và xác nhận rằng trạng thái chính xác được trả về trong các tình huống lưu trữ, *success and error situations*.

### Simply a renderer

Mỗi khi một trạng thái mới được nạp, chúng ta gọi phương thức render () của view controller để render nó. Điều này cho phép chúng tôi xử lý bộ điều khiển chế độ xem của chúng tôi nhiều hơn hoặc ít hơn như trình kết xuất đồ họa đơn giản, bằng cách xử lý một cách phản ứng mỗi trạng thái khi nó xuất hiện, như sau:


```
private extension ProfileViewController {
    func render(_ state: ProfileState) {
        switch state {
        case .loading:
            // Show a loading spinner, for example using a child view controller
        case .presenting(let user):
            // Bind the user model to the view controller's views
        case .failed(let error):
            // Show an error view, for example using a child view controller
        }
    }
}
```


Cũng giống như cách chúng ta gọi là load () trên bộ điều khiển logic controller  sắp xuất hiện trên màn hình, chúng ta có thể sử dụng cùng một mẫu khi xử lý các sự kiện UI - như khi người dùng nhập tên hiển thị mới vào trường văn bản. Ở đây chúng ta sẽ thông báo cho bộ điều khiển logic (do đó có thể gọi máy chủ của chúng tôi để cập nhật tên hiển thị của người dùng) và hiển thị trạng thái mới, được cập nhật:

```
extension ProfileViewController: UITextFieldDelegate {
    func textFieldDidEndEditing(_ textField: UITextField) {
        guard let newDisplayName = textField.text else {
            return
        }

        logicController.changeDisplayName(to: newDisplayName) {
            [weak self] state in
            self?.render(state)
        }
    }
}
```


Bất kể loại sự kiện mà view controller đang xử lý, nó thực hiện hai hành động giống nhau: Thông báo cho bộ điều khiển logic và hiển thị trạng thái kết quả. Như vậy view controller kết thúc có mối quan hệ rất giống với bộ điều khiển logic của nó như khi chia nhỏ một trang web thành các *front end* (trình duyệt) và *back end* (máy chủ). Mỗi bên có thể tập trung vào những gì chúng làm tốt nhất.

### Kết luận

Việc trích xuất logic lõi của một view controller thành bộ điều khiển logic phù hợp có thể là một cách tuyệt vời để tránh vấn đề Bộ điều khiển  MVC.  Một số khái niệm được sử dụng cho kỹ thuật này tương tự như khi - ví dụ - áp dụng các mô hình khung nhìn sử dụng MVVM, và trong các bài sau, chúng ta sẽ xem xét sự khác biệt và tương đồng giữa các phương pháp này.

Bất kể cách chúng ta cắt các bộ điều khiển xem của chúng ta - bằng cách sử dụng các bộ điều khiển xem con, các lớp con UIView chuyên dụng, c view models, presenters or logic controllers - mục tiêu vẫn giữ nguyên, để cho UIViewControllers của chúng ta tập trung làm những gì họ làm tốt nhất - kiểm soát các views.

Cách tiếp cận nào phù hợp nhất với ứng dụng của bạn phụ thuộc rất nhiều vào yêu cầu của bạn và như tôi luôn khuyên bạn nên thử nghiệm với nhiều kỹ thuật để tìm ra cách nào phù hợp nhất với nhu cầu của bạn. Nó cũng quan trọng cần lưu ý rằng không phải tất cả các bộ điều khiển xem cần phải được chia nhỏ - một số màn hình có thể đơn giản đến mức sử dụng một bộ điều khiển xem duy nhất cho nó có thể thực hiện công việc tốt.

Bạn viết được tham khảo [tại](https://www.swiftbysundell.com/posts/logic-controllers-in-swift).