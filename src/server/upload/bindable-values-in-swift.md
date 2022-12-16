Có thể cho rằng một trong những khía cạnh thách thức nhất của việc xây dựng ứng dụng cho hầu hết các nền tảng là đảm bảo rằng giao diện chúng ta trình bày cho người dùng luôn duy trì đồng bộ với các mô hình dữ liệu cơ bản và logic liên quan của chúng. Nó thường gặp phải các lỗi khiến dữ liệu cũ được hiển thị hoặc các lỗi xảy ra do xung đột giữa trạng thái UI và phần còn lại của logic ứng dụng.
Do đó, không có gì đáng ngạc nhiên khi có rất nhiều pattern và kỹ thuật khác nhau đã được phát minh để giúp đảm bảo rằng UI luôn cập nhật bất cứ khi nào mô hình cơ bản của nó thay đổi - mọi thứ từ thông báo, đến đại biểu, cho đến quan sát. Trong bài viết này, chúng ta hãy xem xét một kỹ thuật như vậy - liên quan đến việc binding các giá trị model của chúng ta với UI.
## Constant updates
Một cách phổ biến để đảm bảo rằng UI của chúng ta luôn hiển thị dữ liệu mới nhất là chỉ cần tải lại mô hình cơ bản bất cứ khi nào UI sắp được trình bày (hoặc trình bày lại) trên màn hình. Ví dụ: nếu chúng ta xây dựng màn hình profile cho một số dạng ứng dụng mạng xã hội, chúng ta có thể tải lại profile của người dùng dành cho mỗi lần viewWillAppear được gọi trên ProfileViewController của chúng ta:
```
class ProfileViewController: UIViewController {
    private let userLoader: UserLoader
    private lazy var nameLabel = UILabel()
    private lazy var headerView = HeaderView()
    private lazy var followersLabel = UILabel()

    init(userLoader: UserLoader) {
        self.userLoader = userLoader
        super.init(nibName: nil, bundle: nil)
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)

        // Here we always reload the logged in user every time
        // our view controller is about to appear on the screen.
        userLoader.load { [weak self] user in
            self?.nameLabel.text = user.name
            self?.headerView.backgroundColor = user.colors.primary
            self?.followersLabel.text = String(user.followersCount)
        }
    }
}
```
Không có gì thực sự sai với cách tiếp cận ở trên, nhưng có một vài điều có thể được cải thiện:
1. Chúng ta luôn phải giữ các references đến các views khác nhau dưới dạng các properties trên view controller của chúng ta, vì chúng ta không thể gán các thuộc tính UI cho đến khi chúng ta tải view controller model.
2. Khi sử dụng closure-based API để có quyền truy cập vào model đã tải, chúng ta phải weakly reference self để tránh retain cycles.
3. Mỗi lần view controller của chúng ta được hiển thị trên màn hình, chúng ta sẽ tải lại model, ngay cả khi chỉ vài giây trôi qua kể từ lần cuối chúng ta làm như vậy và ngay cả khi một view controller khác cũng tải lại cùng một model - có khả năng dẫn đến lãng phí, hoặc ít nhất là không cần thiết sử dụng các network calls.
Một cách để giải quyết một số điểm nêu trên là sử dụng một loại trừu tượng khác để cung cấp cho view controller của chúng ta quyền truy cập vào model của nó. Thay vì có view controller tự tải model của nó, chúng ta có thể sử dụng một cái gì đó giống như UserHolder để pass qua một observable wrapper trong core User model của chúng ta.
Bằng cách đó, chúng ta có thể đóng gói logic tải lại của mình và thực hiện tất cả các cập nhật bắt buộc ở một nơi, cách xa view controller của chúng ta - dẫn đến việc triển khai ProfileViewController được đơn giản hoá:
```
class ProfileViewController: UIViewController {
    private let userHolder: UserHolder
    private lazy var nameLabel = UILabel()
    private lazy var headerView = HeaderView()
    private lazy var followersLabel = UILabel()

    init(userHolder: UserHolder) {
        self.userHolder = userHolder
        super.init(nibName: nil, bundle: nil)
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        // Our view controller now only has to define how it'll
        // *react* to a model change, rather than initiating it.
        userHolder.addObserver(self) { vc, user in
            vc.nameLabel.text = user.name
            vc.headerView.backgroundColor = user.colors.primary
            vc.followersLabel.text = String(user.followersCount)
        }
    }
}
```
Mặc dù ở trên là một cải tiến tốt so với triển khai ban đầu của chúng ta, nhưng hãy để xem liệu chúng ta có thể đưa mọi thứ đi xa hơn không - đặc biệt là khi nói đến API mà chúng ta đưa ra cho các view controller của mình - thay vì trực tiếp binding các giá trị model của chúng ta vào UI.
## From observable to bindable
Thay vì yêu cầu mỗi viewcontroller observe model của nó và xác định các quy tắc rõ ràng về cách xử lý từng cập nhật, ý tưởng đằng sau value binding là cho phép chúng tôi viết mã UI cập nhật tự động bằng cách liên kết từng đoạn model data với một UI property. Để thực hiện điều đó, trước tiên chúng tôi sẽ thay thế UserHolder type của chúng ta bằng loại Bindable chung. Loại mới này sẽ cho phép mọi giá trị được bound với bất kỳ thuộc tính UI nào, mà không yêu cầu trừu tượng cụ thể được xây dựng cho từng model. Hãy bắt đầu bằng cách khai báo Bindable và xác định các thuộc tính để theo dõi tất cả các observations của nó và cho phép nó lưu trữ giá trị mới nhất truyền qua nó, như sau:
```
class Bindable<Value> {
    private var observations = [(Value) -> Bool]()
    private var lastValue: Value?

    init(_ value: Value? = nil) {
        lastValue = value
    }
}
```
Tiếp theo, hãy để cho phép Bindable được observed, giống như UserHolder trước nó - nhưng với sự khác biệt chính là chúng ta sẽ giữ observation method private:
```
private extension Bindable {
    func addObservation<O: AnyObject>(
        for object: O,
        handler: @escaping (O, Value) -> Void
    ) {
        // If we already have a value available, we'll give the
        // handler access to it directly.
        lastValue.map { handler(object, $0) }

        // Each observation closure returns a Bool that indicates
        // whether the observation should still be kept alive,
        // based on whether the observing object is still retained.
        observations.append { [weak object] value in
            guard let object = object else {
                return false
            }

            handler(object, value)
            return true
        }
    }
}
```
Cuối cùng, chúng ta cần một cách để cập nhật một Bindable instance bất cứ khi nào một model mới available. Vì vậy, chúng ta sẽ thêm một phương thức cập nhật để cập nhật các LastValue của bindable và gọi từng observation thông qua filter, để xóa tất cả các observations đã hết hạn:
```
extension Bindable {
    func update(with value: Value) {
        lastValue = value
        observations = observations.filter { $0(value) }
    }
}
```
Với những điều trên, giờ đây chúng ta có thể bắt đầu sử dụng loại Bindable mới của mình. Chúng ta sẽ bắt đầu bằng cách đưa một instance Bindable<User> vào ProfileViewController của chúng ta và thay vì thiết lập từng views bằng các thuộc tính trên view controller của chúng ta, thay vào đó chúng ta sẽ thực hiện tất cả các thiết lập riêng lẻ của chúng trong các phương thức chuyên dụng mà chúng ta gọi trong viewDidLoad :
```
class ProfileViewController: UIViewController {
    private let user: Bindable<User>

    init(user: Bindable<User>) {
        self.user = user
        super.init(nibName: nil, bundle: nil)
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        addNameLabel()
        addHeaderView()
        addFollowersLabel()
    }
}
```
View controller của chúng ta đã bắt đầu trông đơn giản hơn nhiều và giờ đây chúng ta có thể tự do cấu trúc mã thiết lập cho views của mình, tuy nhiên, thông qua value binding, các cập nhật UI của chúng ta không còn phải được xác định trong cùng một phương thức.
## Binding values
Cho đến nay, chúng ta đã xác định tất cả các cơ sở hạ tầng cơ bản mà chúng ta sẽ cần để thực sự bắt đầu các binding values với UI của chúng ta - nhưng để làm điều đó, chúng ta cần một API để gọi. Lý do chúng ta giữ *addObservation* riêng tư trước đó, là vì chúng ta sẽ thay vào đó hiển thị API dựa trên KeyPath mà chúng ta sẽ có thể sử dụng để liên kết trực tiếp từng thuộc tính của model với thuộc tính UI tương ứng.
Các key path chính có thể cho phép chúng ta xây dựng một số API thực sự tốt cho phép chúng ta truy cập động vào một thuộc tính đối tượng, mà không phải sử dụng các closure. Hãy bắt đầu bằng cách mở rộng Bindable bằng một API mà nó sẽ cho phép chúng ta bind một key path từ một model đến một key path của một view:
```
extension Bindable {
    func bind<O: AnyObject, T>(
        _ sourceKeyPath: KeyPath<Value, T>,
        to object: O,
        _ objectKeyPath: ReferenceWritableKeyPath<O, T>
    ) {
        addObservation(for: object) { object, observed in
            let value = observed[keyPath: sourceKeyPath]
            object[keyPath: objectKeyPath] = value
        }
    }
}
```
Vì đôi khi chúng ta muốn liên kết các giá trị với một thuộc tính optional (chẳng hạn như text trên UILabel), nên chúng ta thêm 1 bind overload chấp nhận *objectKeyPath* cho optional T:
```
extension Bindable {
    func bind<O: AnyObject, T>(
        _ sourceKeyPath: KeyPath<Value, T>,
        to object: O,
        // This line is the only change compared to the previous
        // code sample, since the key path we're binding *to*
        // might contain an optional.
        _ objectKeyPath: ReferenceWritableKeyPath<O, T?>
    ) {
        addObservation(for: object) { object, observed in
            let value = observed[keyPath: sourceKeyPath]
            object[keyPath: objectKeyPath] = value
        }
    }
}
```
Với code ở trên, giờ đây chúng ta có thể bắt đầu liên kết các giá trị của model với giao diện người dùng của mình, chẳng hạn như liên kết trực tiếp tên người dùng của chúng ta với thuộc tính text của UILabel:
```
private extension ProfileViewController {
    func addNameLabel() {
        let label = UILabel()
        user.bind(\.name, to: label, \.text)
        view.addSubview(label)
    }
}
```
Vì chúng ta dựa trên binding API của mình trên các key paths, chúng ta nhận được hỗ trợ cho các thuộc tính lồng nhau hoàn toàn miễn phí. Ví dụ: bây giờ chúng ta có thể dễ dàng liên kết thuộc tính colors.primary lồng nhau vào header view BackgroundColor:
```
private extension ProfileViewController {
    func addHeaderView() {
        let header = HeaderView()
        user.bind(\.colors.primary, to: header, \.backgroundColor)
        view.addSubview(header)
    }
}
```
Cái hay của cách tiếp cận trên là chúng ta sẽ có thể có được sự đảm bảo mạnh mẽ hơn nhiều rằng UI của chúng ta sẽ luôn hiển thị phiên bản cập nhật của model của chúng ta mà không yêu cầu view controller của chúng ta thực sự làm thêm bất kỳ công việc nào. Bằng cách thay thế các closure bằng các key paths, chúng ta cũng đã đạt được cả API rõ ràng hơn và cũng loại bỏ rủi ro retain cycles nếu chúng ta quên mất việc capture view controller làm weak reference khi thiết lập các model observations.
## Transforms
Cho đến nay, tất cả các model property của chúng ta đều cùng loại với các đối tác UI của chúng, nhưng điều đó không phải lúc nào cũng như vậy. Ví dụ, trong lần triển khai trước đó, chúng ta đã phải chuyển đổi user’s followersCount property thành String, để có thể render nó bằng cách sử dụng UILabel - vậy làm cách nào chúng ta có thể đạt được điều tương tự với phương pháp liên kết giá trị mới của mình?
Một cách để làm điều đó là giới thiệu một bind overload khác có thêm transform parameter, chứa hàm chuyển đổi giá trị T thành loại kết quả R yêu cầu - và sau đó sử dụng hàm đó trong observation của chúng ta để thực hiện chuyển đổi, như thế này:
```
extension Bindable {
    func bind<O: AnyObject, T, R>(
        _ sourceKeyPath: KeyPath<Value, T>,
        to object: O,
        _ objectKeyPath: ReferenceWritableKeyPath<O, R?>,
        transform: @escaping (T) -> R?
    ) {
        addObservation(for: object) { object, observed in
            let value = observed[keyPath: sourceKeyPath]
            let transformed = transform(value)
            object[keyPath: objectKeyPath] = transformed
        }
    }
}
```
Sử dụng API transform ở trên, giờ đây chúng ta có thể dễ dàng liên kết thuộc tính followersCount của mình với một UILabel, bằng cách chuyển String.init như transform:
```
private extension ProfileViewController {
    func addFollowersLabel() {
        let label = UILabel()
        user.bind(\.followersCount, to: label, \.text, transform: String.init)
        view.addSubview(label)
    }
}
```
Một cách tiếp cận khác là giới thiệu một phiên bản liên kết chuyên dụng hơn chuyển đổi trực tiếp giữa các thuộc tính Int và String hoặc dựa trên giao thức CustomStringConvertible (mà Int và nhiều loại khác tuân thủ) - nhưng với cách tiếp cận trên, chúng tôi có linh hoạt để chuyển đổi bất kỳ giá trị theo bất kỳ cách nào chúng ta thấy phù hợp.
## Automatic updates
Mặc dù loại Bindable mới của chúng ta cho phép mã UI khá tốt bằng cách sử dụng các key path, mục đích chính của việc giới thiệu nó là để đảm bảo rằng UI của chúng ta luôn cập nhật bất cứ khi nào một model cơ bản được thay đổi, vì vậy chúng ta cũng hãy xem xét khía cạnh khác - cách cập nhật model sẽ thực sự được kích hoạt.
Ở đây core User model của chúng ta được quản lý bởi model controller, đồng bộ hóa model với server của chúng ta mỗi khi ứng dụng hoạt động - và sau đó gọi cập nhật trên Bindable <User> của nó để truyền bất kỳ thay đổi model nào trong suốt quá trình render UI của ứng dụng.
```
class UserModelController {
    let user: Bindable<User>
    private let syncService: SyncService<User>

    init(user: User, syncService: SyncService<User>) {
        self.user = Bindable(user)
        self.syncService = syncService
    }

    func applicationDidBecomeActive() {
        syncService.sync(then: user.update)
    }
}
```
Điều thực sự thú vị ở trên là UserModelController của chúng ta có thể hoàn toàn không biết về người sử dụng dữ liệu của chúng ta và ngược lại - vì Bindable của ta tôi hoạt động như một lớp trừu tượng cho cả hai bên, cho phép cả mức độ kiểm tra cao hơn và làm cho một hệ thống độc lập hơn.
## Conclusion
Bằng cách liên kết trực tiếp các model values với UI, ta có thể kết thúc bằng mã cấu hình UI đơn giản hơn để loại bỏ các lỗi phổ biến (chẳng hạn như vô tình strongly capturing view objects trong các observation closures) và cũng đảm bảo rằng tất cả các giá trị UI sẽ được cập nhật khi model cơ bản thay đổi. Bằng cách giới thiệu một sự trừu tượng hóa như Bindable, chúng ta cũng có thể tách biệt rõ hơn mã UI của chúng ta khỏi logic core logic của chúng ta.
Các ý tưởng được trình bày trong bài viết này chịu ảnh hưởng mạnh mẽ của Functional Reactive Programming và trong khi các triển khai FRP hoàn chỉnh hơn (như RxSwift) đưa ý tưởng về ràng buộc giá trị hơn nữa (ví dụ bằng cách đưa ra ràng buộc hai chiều và cho phép xây dựng giá trị obserable cho các luồng) - nếu tất cả những gì chúng ta cần là ràng buộc đơn hướng đơn giản, thì một thứ như kiểu Bindable có thể làm mọi thứ chúng ta cần.
Mong bài viết sẽ có ích cho các bạn
Reference: https://www.swiftbysundell.com/posts/bindable-values-in-swift