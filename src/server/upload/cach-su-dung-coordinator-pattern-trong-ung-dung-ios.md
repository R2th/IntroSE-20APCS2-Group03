Link bài gốc: https://www.hackingwithswift.com/articles/71/how-to-use-the-coordinator-pattern-in-ios-apps

Sử dụng coordinator pattern giúp chúng ta giảm bớt công việc cho navgation từ viewcontroller của chúng ta, giúp chúng dễ quản lý và tái sử dụng tốt hơn, trong khi cho phép chúng ta điều chỉnh luồng ứng dụng bất kì lúc nào cần.

Đây là phần 1 trong loạt các bài hướng dẫn cho việc xử lý các viewcontroller lớn, hiện mình chưa dịch 2 bài kia nên sẽ để tạm link bài gốc ở đây:
2. [How to move data sources and delegates out of your view controllers](https://www.hackingwithswift.com/articles/86/how-to-move-data-sources-and-delegates-out-of-your-view-controllers)
3. [How to move view code out of your view controllers](https://www.hackingwithswift.com/articles/89/how-to-move-view-code-out-of-your-view-controllers)

Các viewcontroller hoạt động tốt nhất khi chúng được đặt đơn lẻ trong ứng dụng của bạn, không cần biết về vị trí chúng trong luồng xử lý ứng dụng hoặc thậm chí là 1 phần của luồng xử lý khởi tạo. Không chỉ giúp cho code của bạn dễ dàng kiểm tra và suy đoán hơn, chúng còn cho phép bạn tái sử dụng các viewcontroller khác ở trong ứng dụng của bạn dễ dàng hơn.

Cập nhật: Hiện nay tác giả đã có bài viết mới: **[advanced tutorial for the coordinator pattern in iOS apps](https://www.hackingwithswift.com/articles/175/advanced-coordinator-pattern-tutorial-ios)** để giải quyết 6 câu hỏi cơ bản mà đã hỏi về việc khi thay đổi trong coordinators

Ở phần này tác giả cung cấp 1 ví dụ thực hành với coordinator pattern, nó chuyển trách nhiệm xử lý ra khỏi navigation của các view controller cho các class chuyên biệt. Pattern này được học từ [Soroush Khanlou](http://khanlou.com/) - đây là người mà tác giả đánh giá rất caoveef công việc cũng như bài học này. Bạn cũng có thể vào blog của anh ta để xem [bài viết về coordinator ](https://skillsmatter.com/skillscasts/11333-nuke-it-from-orbit-how-to-deal-with-massive-view-controllers-once-and-for-all)

Bạn thích xem video? Screencast bên dưới chứa mọi thứ trong bài viết này và hơn thế nữa - đăng ký [kênh YouTube của tác giả](https://www.youtube.com/paulhudson) để biết thêm như thế này.
{@embed: https://www.youtube.com/watch?v=7HgbcTqxoN4}

### Tại sao chúng ta cần thay đổi?
Hãy cùng xem lại đoạn code mà phần lớn các lập trình viên iOS sử dụng hàng trăm lần hoặc nhiều hơn thế:
```
if let vc = storyboard?.instantiateViewController(withIdentifier: "SomeVC") {
    navigationController?.pushViewController(vc, animated: true)
}
```

Đoạn code trên: 1 viewcontroller cần được biết, khởi tạo, cấu hình và present tới cái khác. Điều này tạo nên sự kết hợp rõ ràng cho ứng dụng: bạn đã mã hoá liên kết viewcontroller với nhau, ngoài ra nếu muốn từ 1 viewcontroller hiển thị lên từ nhiều nơi khác nhau thì bạn phải sao chép toàn bộ đoạn mã cấu hình.
Điều gì sẽ xảy ra nếu bạn muốn tác động khác nhau giữa người dùng iPad, VoiceOver hoặc người dùng cho mỗi phần A/B test? Vậy là, bạn sẽ phải viết thêm mã cấu hình trong viewcontroller của bạn, vấn đề của bạn sẽ dần trở nên tồi tệ.

Hơn nữa, mọi thứ liên quan tới việc điều chỉnh công việc navigation controller - ở bên trong chính các controller. Cụ thể hơn, các viewcontroller đầu sẽ gọi tới cha của chúng và chỉ định chuyển hướng tới view controller thứ 2.

Để giải quyết vấn đề này một cách rõ ràng, các patten coordinator cho phép chúng ta tách biệt các view controller - không cần biết tới view controller nào xuất hiện trước hoặc sau hay thậm chí 1 chuỗi các view controller.

Thay vào đó, luồng ứng dụng của bạn được kiếm soát bởi coordinator, và các view của bạn chỉ giao tiếp với 1 coordinator Nếu bạn muốn người dùng xác thực, yêu cầu coordinator đưa ra hộp thoại xác thực - việc này giúp bạn hiểu được bạn đang làm gì và trình bày hợp lý hơn.

Kết quả đạt được chúng ta có thể sử dụng view controller của mình tại bất kì chỗ nào và tái sử dụng chúng khi cần thiết - không còn việc hard-coded ở mỗi phần riêng lẻ trong ứng dụng. Nếu có 5 phần khác nhau trong ứng dụng của bạn muốn xác thực người dùng, không vấn đề gì, vì chúng đều có thể gọi cùng 1 phương thức trên coordinator của chúng.

Đối với những ứng dụng lớn, bạn thậm chí có thể tạo những coordinator con - hoặc coordinator phụ - chúng cho phép bạn chuyên biệt hoá từng navigation của ứng dụng. Ví dụ bạn muốn quản lý luồng tạo tài khoản, sử dụng 1 subcoordinator, và quản lý việc đăng ký sản phẩm bằng 1 coordinator khác.

Nếu bạn muốn linh hoạt hơn nữa, việc liên kết giữa các view controller và coordinator qua 1 giao thức thay vì 1 cách cụ thể hoá là 1 lựa chọn tốt. Điều này cho phép bạn thay thế toàn bộ coordinator với những luồng chương trình khác nhau - ví dụ 1 cho iPad, 1 cho Apple TV.

Vì vậy, nếu bạn đang gặp khó khăn với những view controller lớn và phức tạp, việc sử dụng coordinator sẽ gíup ích nhiều. Nói về nó khá trừu tượng rồi, giờ là lúc tìm hiểu coordinator với 1 dự án thực sự...

### Thực hành Coordinator
Khởi tạo 1 ứng dụng iOS trong xCode, sử dụng template Single View App. Đặt tên "CoordinatorTest", hoặc sử dụng cái tên nào bạn thích.

Sẽ có 3 bước để bạn có 1 cái nhìn tổng quan về coordinator:
1. Thiết kế 2 giao thức: 1 dùng cho tất cả coordinator, 1 cho việc tạo các viewcontroller đơn giản hơn.
2. Tạo 1 main coordinator để kiếm soát luồng ứng dụng, và khởi tạo nó khi ứng dung bắt đầu chạy
3. Điều hướng tới các view controller khác

Như đã nói, sử dụng các giao thức để giao tiếp giữa các view controller, coordinator là 1 ý tương tối, nhưng trong ví dụ này chúng ta sẽ sử dụng các loại cụ thể.

Đầu tiên chúng ta tạo giao thức Coordinator mà tất các các coordinator sẽ phù hợp với nó. Mặc dù bạn có thể làm rất nhiều việc với giao thức này tuy nhiên cần 1 số việc tối thiểu sau phải cần:
1. 1 thuộc tính để lưu trữ bất cứ coordinator con nào. Chúng ta sẽ không cần coordinator con ở đây, nhưng tôi vẫn muốn có 1 thuộc tính dành cho chúng để bạn có thể tự tìm hiểu chúng với code của bạn.
2. 1 thuộc tính để lưu navigation controller để điều hướng tới các view controller. Ngay cả khi bạn không muốn hiển thị navigation bar ở trên cùng, sử dụng navigation controller là cách dễ nhất để điều hướng các view controller.
3. 1 phương thức start() để coordinator có thể kiếm soát. Giúp chúng ta tạo 1 coordinator đầy đủ và khởi chạy chúng khi chúng hoàn thiện.

Trong Xcode, nhấn Cmd + N để tạo 1 Swift Filed đặt tên Coordinator.swift. Tạo nội dung cho nó phù hợp với các yêu cầu trên:
```
import UIKit

protocol Coordinator {
    var childCoordinators: [Coordinator] { get set }
    var navigationController: UINavigationController { get set }

    func start()
}
```

Trong khi chúng ta tạo các giao thức, tôi thường thêm 1 giao thức **Storyboarded** giúp tạo các view controller từ 1 storyboard. Tôi ưa thích sử dụng các storyboard thay vì việc phân tán code storyboard ở khắp nơi trong dự án của mình - đưa tất cả vào giao thức riêng biệt giúp code rõ ràng hơn và linh hoạt hơn khi thay đổi suy nghĩ sau này.
1. Tạo 1 giao thức mới đặt tên Storyboarded
2. Cung cấp giao thức 1 phương thức, **instantiate()**, trả về 1 đối tượng của bất cứ lớp nào mà bạn gọi
3. Thêm 1 khởi tạo hoàn chỉnh mặc định cho **instantiate()**, tìm tên view controller mà bạn sử dụng, và sử dụng nó để tìm định danh storyboard bên trong Main.storyboard. 

Tuy nhiên, nó phụ thuộc vào 2 điều để thành công.
Thứ nhất, khi bạn sử dụng **NSStringFromClass(self)** để tìm tên lớp của bất kì view controller nào bạn yêu cầu, bạn sẽ nhận lại YourAppName.YourViewController. Chúng ta cần viết 1 ít code để phân tách chuỗi ở dấu chấm ở giữa, sau đó sử dụng phần thứ 2 (“YourViewController”) làm tên lớp thực tế sử dụng.

Tiếp đó, bất cứ khi nào bạn thêm 1 view controller vào storyboard của bạn, phải đảm bảo rằng định danh storyboard của chúng chúng là tên lớp mà bạn sử dụng cho nó.

Tạo 1 Swift file tên Storyboarded.swift, cung cấp giao thức sau cho nó:

```
import UIKit

protocol Storyboarded {
    static func instantiate() -> Self
}

extension Storyboarded where Self: UIViewController {
    static func instantiate() -> Self {
        // this pulls out "MyApp.MyViewController"
        let fullName = NSStringFromClass(self)

        // this splits by the dot and uses everything after, giving "MyViewController"
        let className = fullName.components(separatedBy: ".")[1]

        // load our storyboard
        let storyboard = UIStoryboard(name: "Main", bundle: Bundle.main)

        // instantiate a view controller with that identifier, and force cast as the type that was requested
        return storyboard.instantiateViewController(withIdentifier: className) as! Self
    }
}
```

Chúng ta đã có 1 view conntroller được cung cấp bởi Xcode cho project mặc định. Vì vậy hay mở ViewController.swift và thay đổi nó cho phù hợp với **Storyboarded**:

```
class ViewController: UIViewController, Storyboarded {
```

Giờ, chúng ta đã có 1 cách tạo view controlelr đơn giản, không còn muốn storyboard xử lý việc đấy nữa. Trong iOs, storyboard không chỉ chịu trách nhiệm cho việc chứa thiết kế view controller, mà còn cấu hình app window cơ bản.

Chúng tôi cho phép các storyboard lưu chữ thiết kế, nhưng ngăn không cho nó sử lý việc khởi chạy ứng dụng. Vì vậy, mở Main.storyboard và chọn view controller mà nó chứa:
1. Sử dụng thuộc attribute inspector để bỏ chọn tích Initial View Controller
2. Giờ thay đổi định danh inspector với tên "ViewController", nhớ rằng, cần khớp tên lớp để giao thức **Storyboarded** hoạt động.

Bước thiết lập cuối cùng là ngăn cho storyboard  cấu hình basic app window:
1. Chọn project của bạn ở đầu navigator project
2. Chọn "**CoordinatorTest**"bên dưới mục Targer
3. Tìm kiếm Main Interface, "Main".
4. Xoá "Main", khiến Main Interface trống.

Vậy là đã hoàn thành code cơ bản. Ứng dụng của bạn sẽ chưa hoạt động thực sự ngay, chúng ta cần sửa 1 số thứ tiếp theo...

### Tạo và chạy các Coordinator
Tại thời điểm này, chúng ta tạo 1 giao thức **Coordinator** định nghĩa những việc mà mỗi coordinator cần phải làm, 1 giao thức **Storyboarded** để giúp tạo các view controller từ 1 storyboard đơn giản hơn, sau đó dừng Main.storyboar khởi chạy giao diện ứng dụng.

Bước tiếp theo tạo coordinator đầu tiên của chúng ta, nó sẽ chịu trách nhiệm cho việc kiếm soát ứng dụng ngay khi khởi chạy.

Tạo 1 file Swift tên MainCoordinator.swift, cung cấp cho nó nội dung:
```
import UIKit

class MainCoordinator: Coordinator {
    var childCoordinators = [Coordinator]()
    var navigationController: UINavigationController

    init(navigationController: UINavigationController) {
        self.navigationController = navigationController
    }

    func start() {
        let vc = ViewController.instantiate()
        navigationController.pushViewController(vc, animated: false)
    }
}
```
Code trên đã làm những điều sau
1. Sử dụng lớp chứ không phải cấu trúc bởi vì coordinator sẽ được sử dụng bởi nhiều view controller
2. Nó có 1 mảng **childCoordinator** rỗng để đáp ứng yêu cầu trong giao thức **Coordinator**, nhưng chúng ta sẽ không sử dụng chúng bây giờ.
3. Nó cũng có 1 thuộc tính **navigationController** như yêu cầu bởi **Coordinator**, cùng với trình khởi tạo thuộc tính
4. Giao thức **start()** là phần quan trọng: nó cung cấp phương thức **instantiate()** để tạp đối tượng của lớp ViewController, sau đó đẩy chúng lên đầu navigation controller

Nhớ rằng MainCooordinator không phải là view controller? Nghĩa rằng chúng ta không bị trùng các phương thức của UIViewController, không có phương thức nào như viewDidLoad() hoặc viewWillApper(), được gọi tự động bởi UIKit.

Giờ chugns ta có 1 coordinator cho ứng dụng của chúng ta, chúng ta cần sử dụng khi ứng dụng chạy. Thông thường ứng dụng khởi chyaj sử được xử lý bởi storyboard, nhưng giờ chúng ta loại bỏ điều đó, vì vậy, chúng ta cần viết 1 code trong AppDelegate.swift để thực hiện công việc này bằng tay.

Mở AppDelegate.swift và cung cấp thuộc tính sau:
```
var coordinator: MainCoordinator?
```

Điều đó sẽ lưu trữ điều phối viên chính cho ứng dụng của chúng tôi, vì vậy nó không được phát hành ngay lập tức.

Tiếp theo, chúng tôi ta sửa đổi **didFinishLaunchingWithOptions** để nó cấu hình và khởi chạy main coordinator, đồng thời thiết lập một basic window cho ứng dụng của chúng ta. Một lần nữa, basic window đó thường được thực hiện bởi bảng phân cảnh, nhưng bây giờ nó là trách nhiệm của chúng ta.

Thay thế phương thức **didFinishLaunchingWithOptions** hiện có bằng:
```
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
    // create the main navigation controller to be used for our app
    let navController = UINavigationController()

    // send that into our coordinator so that it can display view controllers
    coordinator = MainCoordinator(navigationController: navController)

    // tell the coordinator to take over control
    coordinator?.start()

    // create a basic UIWindow and activate it
    window = UIWindow(frame: UIScreen.main.bounds)
    window?.rootViewController = navController
    window?.makeKeyAndVisible()

    return true
}
```

Mọi thức đã được sắp đặt, bạn có thể khởi chạy ứng dụng và xem xét nó.

Thời điểm này bạn đã dành 20 phút nhưng chưa thể hiện được những gì bạn đã làm. Dù vậy, hãy ở lại với tôi - sắp có 1 thứ thay đổi!

### Xử lý luồng ứng dụng
Các coordinator tồn tại để kiểm soát luồng chương trình xung quanh ứng dụng của bạn và giờ là lúc chúng ta hiển thị chính xác cách mà nó thực hiện.

Đầu tiên, chúng ta cần một số view controller giả mà chúng ta có thể hiển thị. Vì vậy, nhấn Cmd + N để tạo Cocoa Touch Class, đặt tên "BuyViewControll", là lớp con từ **UIViewController**. Bây giờ hãy tạo một lớp con **UIViewController** khác, lần này được gọi là "CreatAccountViewControll".

Thứ hai, quay trở lại Main.storyboard và kéo ra hai view controller mới. Cung cấp cho một lớp và định dạng storyboard "BuyViewController", và 1 cái khác "CreatAccountViewController". Lời khuyên là nên thêm 1 nhãn "Buy" cho cái đầu, và "Create Account" cho cái còn lại để biết rằng cái nào đang chạy.

Thứ ba, chúng ta cần thêm hai nút vào view controller đầu tiên để có thể kích hoạt điều hướng tới cái khác. Vì vậy, hãy thêm hai nút với các tiêu đề là "Buy" và "Create Account", sau đó sử dụng assistant editor để kết nối chúng với các phương thức IBActions có tên là **buyTapped()** và **createdAccount()**.

Thứ tư, tất cả view controller của chúng ta cần một cách để giao tiếp với coordinator của nó. Như đã nói trước đó, đối với các ứng dụng lớn, bạn sẽ muốn sử dụng các giao thức ở đây, nhưng đây là một ứng dụng khá nhỏ vì vậy chúng ta có thể sử dụng trực tiếp lớp **MainCoordinator** 

Vì vậy, hãy thêm thuộc tính này vào cả ba view controller của bạn:

```
weak var coordinator: MainCoordinator?
```

Trong khi bạn sử dụng trong **BuyViewController** và **CreateAccountViewController**, vui lòng cũng nhân làm cho cả hai phù hợp với **Storyboarded** để chúng ta có thể tạo chúng dễ dàng hơn.

Cuối cùng, mở MainCoordinator.swift và sửa đổi phương thức **start()** của nó thành:
```
func start() {
    let vc = ViewController.instantiate()
    vc.coordinator = self        
    navigationController.pushViewController(vc, animated: false)
}
```

Đặt thuộc tính **coordinator** của view controller khởi tạo của chúng ta, do đó, nó có thể gửi tin nhắn khi các nút của nó được nhấn.

Tại thời điểm này, chúng ta có một số view controller - tất cả được quản lý bởi một coordinator duy nhất, nhưng chúng ta vẫn chưa có cách nào để di chuyển giữa các view controller.

Để thực hiện điều đó, tôi muốn bạn thêm hai phương thức mới vào **MainCoordinator**:
```
func buySubscription() {
    let vc = BuyViewController.instantiate()
    vc.coordinator = self
    navigationController.pushViewController(vc, animated: true)
}

func createAccount() {
    let vc = CreateAccountViewController.instantiate()
    vc.coordinator = self
    navigationController.pushViewController(vc, animated: true)
}
```

Các phương thức này gần như giống hệt với **start ()**, ngoại trừ bây giờ chúng ta đang sử dụng **BuyViewController** và **CreateAccountViewController** thay vì **ViewController** gốc. Nếu bạn cần cấu hình các view controller bằng cách nào đó mà bạn muốn thì đây là nơi nó sẽ được thực hiện.

Bước cuối cùng - kết hợp tất cả lại với nhau - là đặt một số code bên trong các phương thức **buyTapped ()** và **createAccount ()** của lớp **ViewContoller**.

Tất cả công việc thực tế của những phương thức đó đã tồn tại bên trong coordinator của chúng ta, vì vậy các IBActions không còn phức tạp

```
@IBAction func buyTapped(_ sender: Any) {
    coordinator?.buySubscription()
}

@IBAction func createAccount(_ sender: Any) {
    coordinator?.createAccount()
}
```

Giờ thì bạn nên chạy ứng dụng của mình và điều hướng qua lại giữa các view controlelr - chức năng của coordinator.

Vậy là đã hết bài dịch, cảm ơn các bạn đã dành thời gian đọc tới đây. Nếu bạn muốn nâng cao hơn, hãy đón chờ phần 2: Sử dụng coordinator nâng cao nhé.