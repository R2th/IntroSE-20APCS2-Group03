Note:
- Link bài dịch: https://www.hackingwithswift.com/articles/175/advanced-coordinator-pattern-tutorial-ios
- 1 số từ mình sẽ giữ nguyên vì dịch không còn đúng nghĩa nữa: viewcontroller, coordinator.
![](https://images.viblo.asia/7626d850-abb3-403d-85f3-04b48a82d33d.jpg)

Ở bài viết này, chúng ta sẽ tìm kiếm giải pháp cho 6 vấn đề chung của mọi người khi phải sử dụng 1 mô hình điều hướng trong ứng dụng iOS:
1. Làm thế nào và khi nào chúng ta sử dụng điều hướng con?
2. Cách để xử lích bước quay lại từ bộ điều khiển navigation?
3. Cách chuyền dữ liệu giữa các bộ điều khiển?
4. Làm thế nào sử dụng bộ điều khiển tab bar với điều hướng?
5. Xử lý segue như thế nào?
6. Sử dụng protocol và closure bên trong như thế nào?

Tôi sẽ sử dụng rất diều code trong quá trình hướng dẫn, vì tôi muốn bạn thấy được cách chúng thực sự giải quyết vấn đề của chúng
Nếu bạn bỏ lỡ bài hướng dẫn trước của tôi, bạn có thể tìm đọc ở đây: [Cách sử dụng mẫu điều phối trong ứng dụng iOS.](https://www.hackingwithswift.com/articles/71/how-to-use-the-coordinator-pattern-in-ios-apps)

**Nếu bạn thích video hơn**? Thì video bên dưới cũng sẽ chứa tất cả mọi thứ trong hướng dẫn này và còn nhiều thứ hơn nữa - [đăng ký kênh Youtube của tôi](https://www.youtube.com/paulhudson) nhé 
{@embed: https://www.youtube.com/watch?v=ueByb0MBMQ4}

### Khi nào và cách xử dụng các coordinator con

Chúng ta sẽ bắt đầu tìm hiểu coordinator con. Như tôi đã giải thích ở bài hướng dẫn trước, nếu bạn có 1 ứng dụng lớn mà bạn có thể tách các chức năng thành những điều hướng con: 1 chịu trách nhiệm cho tạo tài khoản, 1 cái khác trả về cho việc mua sản phẩm, v...v.

Và chúng đều ba báo cáo lại cho coordinator cha, sau đó có thể tiếp tục dòng chảy công việc dù coordinator con kết thúc. Kết quả là chúng ta có thể tách chức năng ứng dụng thành các phần nhỏ hơn, riêng rẽ để có thể xử lý dễ dàng và tái sử dụng chúng.

Nhưng vấn đề là: khi nào chúng ta sử dụng những điều trên, và làm cách nào tốt nhất?
Hãy thử với 1 dự án thực tế - chúng ta sẽ sử dụng dự án Coordinators chúng ta có ở phần cuối video đầu tiên. Chúng ta thực sự đã có bộ điều khiển mua và tạo tài khoản.

Đầu tiên, tạo 1 file Swift tên BuyCoordinator.swift, và với code dưới
```
class BuyCoordinator: Coordinator {
    var childCoordinators = [Coordinator]()
    var navigationController: UINavigationController

    init(navigationController: UINavigationController) {
        self.navigationController = navigationController
    }

    func start() {
        // we'll add code here
    }
}
```

Để bắt đầu hàm này, chúng ta cần dịch chuyển 1 số code từ điều hướng chính, vì điều đó thực tế tạo và hiển thị 1 **BuyViewController**
Bởi vậy, mở file MainCoordinator.swift và chuyển nội dung của **buySubscription()** qua hàm **start()**, như thế này:

```
func start() {
    let vc = BuyViewController.instantiate()
    vc.coordinator = self
    navigationController.pushViewController(vc, animated: true)
}   
```

Tạm thời để hàm **buySubscription()** trong MainCoordinator.swift trống - chúng ta sẽ quay trở lại sau.

Đăng ký **self** tới thuộc tính **coordinator** của **BuyViewController** hiện không thành công vì nó kì vọng **MainCoordinator**. Để khắc phục điều này, hãy mở BuyViewController.swift và thay đổi thuộc tính thành **BuyCoordinator**:

```
weak var coordinator: BuyCoordinator?
```

Quay trở lại **MainCoordinator** chúng ta cần tạo 1 đối tượng của coordinator con và trao cho nó quyền kiểm soát. Điều đó hoàn thành nhờ thêm 3 dòng code vào hàm **buySubscription()**:

```
let child = BuyCoordinator(navigationController: navigationController)
childCoordinators.append(child)
child.start()
```

Đó là tất cả những gì cần thiết để tạo ra một coordinator con và cài đặt nó nắm quyền kiểm soát, nhưng một vấn đề thú vị hơn là làm thế nào chúng ta xử lý loại bỏ coordinator con khi chúng ta quay trở lại trước. Chúng ta sẽ xem xét các giải pháp tốt hơn hơn sau này, nhưng trước tiên hãy nhìn vào một giải pháp đơn giản hơn để bắt đầu.

Đối với các ứng dụng đơn giản hơn, bạn có thể coi mảng coordinator con của mình như một ngăn xếp, thêm vào và bỏ khi cần thiết. Mặc dù hoạt động đầy đủ, tôi thích cho phép các coordinator được thêm và xóa bất cứ lúc nào, đem lại cấu trúc giống như tree-like hơn là một ngăn xếp

Để thực hiện công việc này, trước tiên chúng ta cần thiết lập kết nối giữa **BuyCoordinator** và **MainCoordinator**, để đứa điều hướng con có thể thông báo với lớp cha khi công việc kết thúc
Bước đầu tiên là thêm thuộc tính **ParentCoordinator** vào **BuyCoordinator**:
```
weak var parentCoordinator: MainCoordinator?
```
**weak** là cần thiết để tránh chu kỳ vô hạn, bởi **MainCoordinator** đang chứa con của nó.
Chúng ta cài đặt chúng khi **BuyCoordinator** của chúng ta được khởi tạo, vì vậy xếp điều này vào bên trong hàm **buySubscription()** của MainCoordinator:
```
child.parentCoordinator = self
```

Tiếp theo, chúng ta cần một cách để **BuyViewControll** báo cáo lại khi công việc của nó kết thúc. Chúng ta không có bất kỳ nút chuyên biệt nào ở đó và thậm chí chúng ta không có bất kỳ bộ điều khiển con nào tạo thành nhiều chuỗi, vì vậy thay vào đó chúng tôi sẽ sử dụng bộ điều khiển xem này bị loại bỏ vì tín hiệu của chúng tôi rằng quy trình mua có đã kết thúc.

Cách dễ nhất để làm điều này là bằng cách triển khai **viewDidDisappear()** trong BuyViewControll, như thế này:

```
override func viewDidDisappear(_ animated: Bool) {
    super.viewDidDisappear(animated)
    coordinator?.didFinishBuying()
}
```

Chúng ta cần thêm phương thức **didFinishBuying () **vào **BuyCoordinator**. Cách bạn xử lý việc này tùy thuộc vào luồng ứng dụng của bạn: nếu điều phối viên chính của bạn cần phản hồi cụ thể về việc mua hoàn thiện - có lẽ để đồng bộ hóa dữ liệu người dùng hoặc khiến một số UI làm mới - thì bạn có thể thực hiện một phương pháp cụ thể để xử lý luồng đó.

Trong trường hợp này, chúng tôi sẽ viết một phương pháp chung để xử lý tất cả các điều phối viên trẻ em mà don cần bất kỳ hành vi đặc biệt nào.

Thêm phương thức này vào **BuyCoordinator** ngay bây giờ:
```
func didFinishBuying() {
    parentCoordinator?.childDidFinish(self)
}
```

Chúng ta có thể thêm **childDidFinish()** tới điều hướng chính: 
```
func childDidFinish(_ child: Coordinator?) {
    for (index, coordinator) in childCoordinators.enumerated() {
        if coordinator === child {
            childCoordinators.remove(at: index)
            break
        }
    }
}
```

Điều đó sử dụng toán tử ba cấp Swift Swift bằng với toán tử để tìm điều phối viên con trong mảng của chúng ta. Điều đó chỉ hoạt động với các lớp, và ngay bây giờ trong lý thuyết, các điều phối viên của chúng tôi có thể được sử dụng bởi các struct.

May mắn thay, các điều phối viên phải luôn là các lớp vì chúng cần được chia sẻ ở nhiều nơi, vì vậy chúng ta có thể đánh dấu giao thức điều phối viên của mình là chỉ dành cho lớp để làm cho tất cả mã này hoạt động. Sửa đổi Coordinator.swift thành
```
protocol Coordinator: AnyObject {
```

Như bạn có thể thấy mẹo với các điều phối viên trẻ em là đảm bảo bạn khắc một đoạn rời rạc của ứng dụng để họ xử lý. Điều này giúp bạn tránh các điều phối viên lớn, nhưng cũng chỉ làm cho mã của bạn dễ theo dõi hơn.

### Navigating backwards

Giải pháp hiện tại của chúng tôi để điều hướng ngược tới bộ điều khiển xem trước là tốt cho các dự án đơn giản, nhưng điều gì xảy ra khi bạn có nhiều bộ điều khiển xem được hiển thị trong bộ điều phối con? Chà, **viewDidDisappear()** sẽ được gọi sớm và ngăn xếp điều phối viên của bạn sẽ bị lẫn lộn.

May mắn thay, có một giải pháp tuyệt vời đã được viết cho **Soroush Khanlou**, người đã phát triển mô hình điều phối viên ngay từ đầu.

Trong **BuyViewControll**, vui lòng bình luận hoàn toàn phương thức **viewDidDisappear ()** - chúng tôi không còn cần nó nữa. Và trong Nhận xét của BuyCoordinator, didFinishBuying (), vì chúng tôi cũng không cần điều đó.

Thay vào đó, những gì chúng tôi sẽ làm là điều phối viên chính của chúng tôi phát hiện các tương tác trực tiếp với bộ điều khiển điều hướng. Đầu tiên, chúng ta cần làm cho nó phù hợp với giao thức **UINavestionControllDelegate**. Điều đó chỉ có thể nếu nó cũng biến nó thành một lớp con của **NSObject**.

Sửa đổi định nghĩa của **MainCoordinator** thành điều này:
```
class MainCoordinator: NSObject, Coordinator, UINavigationControllerDelegate {
```

Thứ hai, chúng ta cần yêu cầu bộ điều khiển điều hướng cho chúng ta biết bất cứ khi nào trình điều khiển xem được hiển thị, bằng cách làm cho điều phối viên chính của chúng ta ủy quyền.

Thêm phần này vào phương thức **start ()**:
```
navigationController.delegate = self
```

Bây giờ chúng ta có thể phát hiện khi một trình điều khiển xem được hiển thị. Điều này có nghĩa là thực hiện phương thức **didShow** của **UINavestionControllDelegate**, đọc bộ điều khiển xem mà chúng tôi đang di chuyển từ đó, đảm bảo rằng chúng tôi sẽ điều khiển popping thay vì đẩy chúng, sau đó loại bỏ bộ điều phối con.

Thêm phương thức này vào **MainCoordinator** ngay bây giờ:
```
func navigationController(_ navigationController: UINavigationController, didShow viewController: UIViewController, animated: Bool) {
    // Read the view controller we’re moving from.
    guard let fromViewController = navigationController.transitionCoordinator?.viewController(forKey: .from) else {
        return
    }

    // Check whether our view controller array already contains that view controller. If it does it means we’re pushing a different view controller on top rather than popping it, so exit.
    if navigationController.viewControllers.contains(fromViewController) {
        return
    }

    // We’re still here – it means we’re popping the view controller, so we can check whether it’s a buy view controller 
    if let buyViewController = fromViewController as? BuyViewController {
        // We're popping a buy view controller; end its coordinator
        childDidFinish(buyViewController.coordinator)
    }
}
```

Như bạn đã thấy, lý do nút Back khó hiểu là vì nó không được kích hoạt bởi điều phối viên của chúng tôi. May mắn thay, sử dụng giao thức **UINavestionControllDelegate** có thể giúp chúng ta theo dõi các sự kiện đó một cách sạch sẽ.

### Passing data between view controllers

Truyền dữ liệu giữa các bộ điều khiển xem có vẻ như nó khó hơn khi làm việc với các điều phối viên, nhưng trên thực tế, nó thực sự là một cách tuyệt vời để đảm bảo rằng chúng tôi tạo ra các liên kết cứng giữa các bộ điều khiển xem của chúng tôi.

**Lưu ý**: Để thực hiện theo, trước tiên hãy quay lại dự án Điều phối viên ban đầu để bạn có một bảng xếp hạng rõ ràng để làm việc.

Trong bảng phân cảnh chính, kéo ra một điều khiển được phân đoạn vào bộ điều khiển chế độ xem chính của chúng tôi. Điều này sẽ cho phép người dùng chọn sản phẩm họ muốn mua, vì vậy bạn có thể điền tên đó vào sản phẩm của mình.

Chúng ta cần tạo một lối thoát cho điều khiển được phân đoạn này, vì vậy vui lòng chuyển sang trình chỉnh sửa trợ lý và tạo một sản phẩm được gọi là.

Bây giờ, trong **BuyViewControll**, chúng tôi muốn biết sản phẩm đăng ký nào đã được chọn, vì vậy hãy thêm thuộc tính này vào đó:
```
var selectedProduct = 0
```

Giá trị đó phải được cung cấp khi trình điều khiển khung nhìn này được tạo, vì vậy hãy mở MainCoordinator.swift và sửa đổi **buySubcrip ()** để nó nhận được một tham số nguyên và gán thẳng vào thuộc tính **selectedProduct** mà chúng ta vừa tạo:
```
func buySubscription(to productType: Int) {
    let vc = BuyViewController.instantiate()
    vc.selectedProduct = productType
    vc.coordinator = self
    navigationController.pushViewController(vc, animated: true)
}
```

Bước cuối cùng là chuyển chỉ mục được phân đoạn đã chọn cho đến người điều phối khi gọi **buySubcrip()** trong ViewContoder.swift.

Sửa đổi **Taps(**) thành này:
```
@IBAction func buyTapped(_ sender: Any) {
    coordinator?.buySubscription(to: product.selectedSegmentIndex)
}
```

Như bạn đã thấy chìa khóa ở đây là hãy nhớ rằng một bộ điều khiển xem không biết những cái khác tồn tại. Đó là truyền dữ liệu cho điều phối viên sau đó có thể đi bất cứ đâu - có thể nó kích hoạt yêu cầu mạng, có thể nó hiển thị bộ điều khiển xem hoặc có thể nó làm gì đó khác. Điều phối viên chỉ ra đích đến; nó quyết định những gì các giá trị nhận được có nghĩa là gì.

### Coordinator tab bar controllers

Nó phổ biến để sử dụng các bộ điều khiển thanh tab trong ứng dụng của bạn như một cách phân chia rõ ràng chức năng ứng dụng của bạn. May mắn thay, các điều phối viên làm việc thực sự tốt với họ - đó là một cái cinch để đặt chúng lại với nhau.

Bạn thấy, một cách hiệu quả, mỗi tab trong ứng dụng của bạn có thể được quản lý bởi chính điều phối viên chính của nó. Ví dụ: trong **ứng dụng để học Unwrap Swift**, tôi có năm tab ở phía dưới và mỗi tab có một điều phối viên riêng: Điều phối viên Tìm hiểu, Điều phối viên Thực hành, Điều phối viên Thử thách, v.v.

Có một số cách bạn có thể mã hóa điều này, và tôi sẽ chỉ cho bạn cách tôi làm điều đó.

Đầu tiên, tôi tạo một lớp con mới của **UITabBarContoder** có tên **MainTabBarControll**. Điều này sau đó có các thuộc tính cho mỗi điều phối viên được sử dụng trong các tab của nó.

Chúng tôi chỉ có một điều phối viên, vì vậy chúng tôi chỉ cần một tài sản. Thêm phần này vào **MainTabBarControll** ngay bây giờ:
```
let mainCoordinator = MainCoordinator(navigationController: UINavigationController())
```

Sau đó, trong phương thức **viewDidLoad()** , ta gọi **start()** trên mỗi điều phối viên để họ thiết lập viewcontroller cơ bản của nó, sau đó đặt thuộc tính **viewControllers** của bộ điều khiển thanh tab thành một mảng của tất cả các tab, sử dụng bộ điều khiển điều hướng của mỗi điều phối viên mà ta đang làm việc với.

Tuy nhiên chúng ta chỉ có 1 điều p
```
override func viewDidLoad() {
    main.start()
    viewControllers = [main.navigationController]
}
```

Đừng quên cung cấp cho mỗi bộ điều khiển chế độ xem của bạn một mục trên thanh tab, nếu không, bạn đã giành được nhiều thứ trong thanh tab.

Ví dụ: một cách chúng ta có thể làm điều này là trong phương thức **start()** của **MainCoordinator** - chúng ta có thể làm cho trình điều khiển chế độ xem chính có biểu tượng yêu thích, như sau:
```
vc.tabBarItem = UITabBarItem(tabBarSystemItem: .favorites, tag: 0)
```

Bây giờ, chỉ cần quay lại **AppDelegate** của bạn, xóa mã điều phối viên hiện có và tạo một phiên bản mới của lớp **MainTabBarContoder** của bạn làm **rootViewController** của cửa sổ:
```
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Override point for customization after application launch.
    window = UIWindow(frame: UIScreen.main.bounds)
    window?.rootViewController = MainTabBarController()
    window?.makeKeyAndVisible()

    return true
}
```

Vì vậy, cách thông minh để xử lý bộ điều khiển thanh tab là với một điều phối viên trên mỗi tab. Nó giữ cho các phần khác nhau của ứng dụng của bạn được tách biệt gọn gàng và điều đó có nghĩa là chúng tôi áp dụng các kỹ thuật tương tự mà chúng tôi đã biết.

Kết thúc phần 1, phần 2 sẽ xử lý phản hồi kết hợp các giao thức.