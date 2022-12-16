### Giới thiệu
Version 3 của swiftUI đã ra mắt. Và chúng ta vẫn chưa có câu trả lời cho câu hỏi. Làm sao để remove navigation từ UI layer?
 Nếu bạn đã từng thử bất kì navigation nào phức tạp trong Swift UI, bạn có thể thấy là navigation vẫn bị trói khá chặt trong UI Layer, điều này có thể mang đến những vấn đề sau:
 -  Có một đường ranh không rõ ràng giữa logic và UI
 -  Các vấn đề liên quan đến dynamic navigation. Xây dựng navigation khi có 1 thứ tự trên màn hình phụ thuộc vào các yếu tố khác nhau như: 
Tôi đã thử nhiều cách khác nhau để handle navigation trong SwiftUI ( Có rất nhiều bài viết khá hay về Swift UI navigation, bạn thử đọc bài này nhé: https://quickbirdstudios.com/blog/coordinator-pattern-in-swiftui/ ). Tuy nhiên, thật không may là các cách tiếp cận đều phải đối mặt với nhưng nguyên tắc cơ bản của Swift UI, bạn cần phải thêm NavigationLink trực tiếp ở trong UI code. Cách tiếp cận này có thể tạo thêm những điều kiện lặp vô hạn cho điều kiện if-else, các biến kiểu boolean ( thâmj chí là cả 2)

Điều đó mang đến 1 sự thật khá buồn: đó là cần thiết phải sử dụng UIKit

Tuy nhiên, đến cuối cùng,  không phải quá buồn, Vấn đề này lại trao 1 cơ hội cho chúng ta về việc xây dựng lên 1 thứ gì đó thực sự thuận tiện, thoải mái. Navigation, sử dụng UIKit, tuy nhiên vẫn sử dụng UIKIt bên dưới

Nào, cùng bắt đầu nhé. Chúng ta sẽ sử dụng app trên mô hình MVVM+Coordinator pattern. Chúng hoạt động khá là mượt mà trong hệ sinh thái SwiftUI. 

### Cùng bắt đầu với   Coordinator protocol
```
import UIKit

    /// `Coordinator` protocol for `UIKit` navigation in `MVVM+C` architecture
    public protocol Coordinator: AnyObject {
    // 1
    var childCoordinators: [Coordinator] { get set }
    // 2
    var parentCoordinator: Coordinator? { get set }
    // 3
    var root: UIViewController { get }
    }
```


1. 1 mảng các coordinators của self. Mảng này sẽ không empty nếu Coordinator này có các children 
2. Cha coordinator của “self”. Property này sẽ không nil, nếu Coordinator có 1 cha
3. Root controller of the Coordinator, có thể là UINavigationController, UITabBarController

### Let’s got to the ViewModel
```
    /// `ViewModel` protocol for `UIKit` navigation in a `MVVM + C` architecture
    public protocol BaseViewModel {
    associatedtype C: Coordinator
    // 1
    var coordinator: C { get }
    // 2
    func setup()
    }
```

1. Coordinator của viewmodel. Mỗi viewmodel lại có 1 liên kết đến 1 Coordinator
2. Hàm setup, nơi mà chúng ta đặt nhưng thiết lập đầu tiên:  ví dụ API calls, data source setup, etc.

### Và View itself
```
    /// `View` protocol for `UIKit` navigation in `MVVM+C` architecture
    public protocol ViewControllerView {
    associatedtype VM: BaseViewModel
    // 1
    init(viewModel: VM)

// 2
var viewController: UIViewController { get }
}
```
1. Hàm khởi tạo cho 1 view. Hầu hết thì n chỉ lấy duy nhất ViewModel như 1 tham số
2. Các thuộc tính được tính toán, sau đó chuyển từ View sang UIViewController

### Và final component, a view controller wrapper
 Nó được phát triển như là abstract class, nên mỗi view có 1 thể hiện của chính nó
```
 class SwiftUIViewController<V: ViewControllerView>: UIViewController {

    // MARK: - Public Properties
    // 1
    var viewModel: V.VM

    var ignoredSafeAreaEdges: Set<Edge> {
        didSet {
            if oldValue == ignoredSafeAreaEdges {
                return
            }
            setupChildViewConstraints()
        }
    }

    // 2
    private(set) weak var childUIView: UIView!

    // MARK: - Private Properties
    private let childView: V

    // MARK: - LifeCycle
    /// init controller with `ViewControllerView` protocol and ignored safe are edges. By default `top` edge is ignored
    init(viewModel: V.VM, ignoredSafeAreaEdges: Set<Edge> = Set([Edge.bottom, Edge.leading, Edge.trailing])) {
        self.viewModel = viewModel
        self.ignoredSafeAreaEdges = ignoredSafeAreaEdges
        childView = V(viewModel: viewModel)

        super.init(nibName: nil, bundle: nil)
        
        // 3
        if String(describing: type(of: self)) == String(describing: SwiftUIViewController.self) {
            fatalError("`SwiftUIViewController` has to be inherited")
        }
    }

    @available(*, unavailable)
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    // MARK: - Public
    override func loadView() {
        super.loadView()

        setupRootView()
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        viewModel.setup()
    }

    // MARK: - Private
    // 4
    private func setupRootView() {
        let childController = childView.viewController

        view.addSubview(childController.view)
        childController.didMove(toParent: self)

        childController.view.translatesAutoresizingMaskIntoConstraints = false

        view.backgroundColor = childController.view.backgroundColor
        childUIView = childController.view
        setupChildViewConstraints()
    }

    private func setupChildViewConstraints() {
        childUIView.removeConstraints(childUIView.constraints)

        NSLayoutConstraint.activate([
            childUIView.topAnchor.constraint(equalTo: ignoredSafeAreaEdges.contains(.top)
                                                ? view.topAnchor
                                                : view.safeAreaLayoutGuide.topAnchor),
            childUIView.leadingAnchor.constraint(equalTo: ignoredSafeAreaEdges.contains(.leading)
                                                    ? view.leadingAnchor
                                                    : view.safeAreaLayoutGuide.leadingAnchor),
            childUIView.trailingAnchor.constraint(equalTo: ignoredSafeAreaEdges.contains(.trailing)
                                                    ? view.trailingAnchor
                                                    : view.safeAreaLayoutGuide.trailingAnchor),
            childUIView.bottomAnchor.constraint(equalTo: ignoredSafeAreaEdges.contains(.bottom)
                                                    ? view.bottomAnchor
                                                    : view.safeAreaLayoutGuide.bottomAnchor)
        ])
    }
}
```

1. Strong referencere đến 1 ViewModel. Chú ý là SwiftUI.View phải có @ObservedObject wrapper thay vì @StateObject.
2. Đại diện cho 1 view, được transformed đến UIVIew object
3. Không cho phép tạo 1 instance của SwiftUIViewController, nhưng thay vào đó thì cần  kế thừa nó
4. Thêm vào 1 view như là con của UIViewController và gim nó vào bên cạnh sử dụng NSLayoutConstraint
5. Cuối cùng là, mọi setup đều sẵn sàng. Bằng việc xác nhận những protocols này, chúng ta có thể phát triển UI sử dụng SwiftUI và gói nó vào bên trong 1 UIViewController. Mọi việc gần như đã được hoàn thành rồi 

###  Kết quả cuối cùng sẽ như thế này đây :
```
// Root coordinator
final class RootCoordinator: Coordinator {
    
    var childCoordinators: [Coordinator] = []
    weak var parentCoordinator: Coordinator?
    
    let navigationController: UINavigationController
    
    var root: UIViewController {
        return navigationController
    }
    
    init() {
        navigationController = UINavigationController()
        navigationController.navigationBar.prefersLargeTitles = true
    }
    
    func start() {
        guard let window = UIApplication.shared.windows.first(where: { $0.isKeyWindow }) else {
            return
        }

        let controller = RootViewController(viewModel: RootViewControllerViewModel(coordinator: self))
        window.rootViewController = navigationController

        navigationController.viewControllers = [controller]
    }
}

// ViewModel
final class RootViewControllerViewModel: BaseViewModel, ObservableObject {

    @Published var dataSource: [Item] = []

    unowned let coordinator: RootCoordinator

    init(coordinator: RootCoordinator) {
        self.coordinator = coordinator
    }

    func showDetails(model: Item) {
        coordinator.showDetails(from: model)
    }

    func setup() {
        print("Setting up `RootViewControllerViewModel`...")
        dataSource = Item.exampleDataSource
    }
}

// View
struct RootViewControllerView: View, ViewControllerView {

    @ObservedObject var viewModel: RootViewControllerViewModel

    var body: some View {
        List(viewModel.dataSource) { item in
            HStack {
                Button(action: {
                    print("todo")
                }, label: {
                    HStack {
                        Text(item.title)
                        Spacer()
                    }
                    .padding()
                })
            }
        }
    }
}

// Wrapped View
final class RootViewController: SwiftUIViewController<RootViewControllerView> {

    override func viewDidLoad() {
        super.viewDidLoad()

        title = "Root"
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)

        childUIView?.backgroundColor = .green
    }
}
```

Final controller nằm ở dòng 75. Như bạn có thể thấy chúng ta ko cần có bất kì cấu hình nào. Mọi thứ đều đã setup trước đó. UIViewController thường chỉ gồm vài dòng code

Bạn có thể hỏi tại sao không sử dụng UIHostingController trực tiếp. Có 1 vài lý do:
- 1 view có tất cả các method của vòng đời UIViewController, cái bổ sung thêm 1 flexible setup
- Cách tiếp cận này bắt buộc các developer sử dụng MVVM+C architecture
- Và lý do có ích nhất ở đây là, nêu bạn không thể phát triển cái gì trong SwiftUI, bạn có thể dễ dàng chuyển sang UIKit. ViewControllerView protocol không yêu cầu sử dụng SwiftUI. UIViewController có thể implement ViewControllerView. Tất cả các components khác giữ ở trạng thái untouched
Và đó là tất cả những gì tôi biết về các tiếp cận này. Có thể nó không phải viên đạn bạc để giải quyết được mọi vấn đề của SwiftUI, nhưng cách tiệp cận này bổ sung 1 vài phương pháp thuận tiện và an toàn cho bạn khi xây dựng lên ứng dụng của mình

Cảm ơn vì đã đọc bài dịch của tôi nhé

Tài liệu tham khảo : https://medium.com/@misha.gajdan/how-to-handle-navigation-in-swiftui-6b04538ab7e