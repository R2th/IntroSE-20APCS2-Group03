Cảm thấy nhàm chán với MVC trong iOS. Bạn đã bao giờ  nghĩ rằng thử chuyển sang *Một design pattern* khác chưa? Như MVVM, VIPER chẳng hạn? 

Nhưng bạn thắc mắc liệu nó có đáng để bạn chuyển sang áp dụng cho dự án cá nhân hay dự án công ty mình đang làm việc đúng không nào!

> Hãy đọc và tìm ra câu trả lời cho chính bạn! 

Bạn sắp thiết kế một *architectural patterns* cho dự án của mình trong môi trường phát triển iOS app. 

Chúng ta xem xét ngắn gọn một số cái phổ biến và cùng so sánh chúng về mặt lý thuyết và thực hành thông qua một số ví dụ nhỏ. 

> Bạn có thể tham khảo các link chi tiết hơn về một kiến trúc mình sẽ gắn bên trong bài viết.

*Việc bạn lắm vững một pattern có thể khiến bạn khó có thể từ bỏ nó để chuyển sang 1 pattern khác (Apple's MVC là một ví dụ điển hình). Hãy cẩn thận!*

*Hãy tự hỏi mình trước khi đọc bài viết một số câu hỏi như* 

> Thành phần nào sẽ thực hiện các request network (Request internet, API) . *MODEL* hay *CONTROLLER*? (MVC pattern)
> 
> Làm cách nào để chuyển một *MODEL* vào trong một *VIEWMODEL* của một *VIEW* mới? (MVVM pattern)
> 
> Ai sẽ tạo một VIPER module: Router hay Presenter? (VIPER pattern)

# Tại sao lại quan tâm đến việc chọn architecture?
Bởi vì nếu một khi không làm việc đó.

Vào một ngày đẹp trời, bạn phải debugging một class với lượng lớn code với hàng tá thứ khác nhau. 

Bạn sẽ thấy mình không thể tìm và sửa bất kì lỗi nào trong class của bạn? 

> Bạn đã mắc phải trường hợp đó chưa? Hãy cứ code đi rồi bạn sẽ nhận ra ngay thôi ^^!

Một điều tất yếu *Bạn sẽ rất khó để có thể nhớ toàn bộ class nó đang làm những cái Bíp gì =))* Bạn sẽ luôn thiếu một số chi tiết quan trọng.

Nếu bạn ở trong tình huống này khi đang làm việc với ứng dụng của bạn thì rất có thể bạn nằm trong các khả năng sau:

- Class của bạn là một subclass của UIViewController.
- Dữ liệu của bạn được lưu trữ trực tiếp bên trong UIViewController.
- UIViews của bạn gần như không làm bất kì điều gì.
- Model của bạn là một cấu trúc dữ liệu tồi tệ và ngu ngốc.
- Unit Tests của bạn trống trơn.

*Điều này có thể xảy ra ngay cả khi bạn thực hiện tuân thủ theo Apple's MVC.
Điều đó thật tồi tệ. 
Có cái gì đó không đúng ở đây với Apple's MVC. 
Chúng ta hãy quay lại với nó sau!*

**Một kiến trúc tốt sẽ cần những gì?**
1. Phân phối trách nhiệm cân bằng giữa các thực thể (gọi là các entities ví dụ MVC thực thể sẽ là Model, View, Controller) với các roles chặt chẽ.
2. Luôn quan tâm đến khả năng kiểm thử đầu tiên. Nó sẽ dễ dàng với những kiến trúc phù hợp. (Sự tách biệt không phụ thuộc giữa các thành phần hoặc dễ dàng khởi tạo (mocking))
3. Dễ dàng sử dụng, tiết kiệm chi phí bảo trì.

## Why Distribution?
*Distribution* giúp cân bằng não của bạn trong kho bạn cố gắng tìm hiểu cách mọi thứ hoạt động.

Nếu bạn nghĩ rằng bạn càng phát triển thì não của bạn càng thích nghi tốt hơn với sự phức tạp! Bạn đúng nhưng khả năng này đạt giới hạn rất nhanh. 

> Giảm thiểu sự phức tạp bằng cách phân bố trách nhiệm giữa nhiều entities theo [single responsibility principle.](https://en.wikipedia.org/wiki/Single_responsibility_principle)

## Why Testability?
Câu hỏi này không phù hợp với những người đang chạy unitest một cách "trơn tru" nhưng lại bị lỗi *đỏ ngòm* khi mà thêm chức năng mới hoặc refactor một class nào đó!

- Tìm ra vẫn đề của code trong quá trình runtime
- Đảm bảo code của bạn thực hiện đúng sau khi bạn thêm một tính năng mới hoặc refactor một class nào đó.

## Why Ease of use?
Điều này thực sự thì không nhất thiết có 1 câu trả lời nhưng điều đáng nói ở đây là:

> Code tốt nhất là code chưa bao giờ được viết.

Do đó bạn càng ít mã thì bạn càng ít bugs.

Điều này không phải là sự lười biếng của các developer về việc viết ít code đi mà là giải pháp để giảm thiểu các chi phí bảo trì cho nó.

# MV(X)
Ngày nay chúng ta có nhiều lựa chọn khi nói đến architecture design patterns:
- [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)
- [MVP](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter)
- [MVVM](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel)
- [VIPER](https://www.objc.io/issues/13-architecture/viper/)

3 pattern đầu tiên được chia ra 3 entities chủ yếu sau:
- **Models**  Chịu trách nhiệm về quản lý domain data (Data lấy từ internet giả dụ như response từ request API) hoặc một [data access layer](https://en.wikipedia.org/wiki/Data_access_layer) - Lớp có chức năng giao tiếp với Cơ sở dữ liệu.
- **Views** Chịu trách nhiện về giao diện GUI 
    Trong iOS hãy nghĩ đến mọi thứ bất đầu bằng tiền tố UI như UIView, UITextField, UIScrollView....
- **Controller/Presenter/ViewModel** Là class trung gian giữa *Model* và *View*. 
    Nói chung là chịu trách nhiệm thay đổi *Model* thông qua thực hiện các *action* của người dùng cái mà được thực hiện thông qua *View* và ngược lại cập nhật *View* thông qua những thay đổi từ *Model*.

*Các entities cho phép chúng ta*
- Hiểu cách mà chúng hoạt động
- Tái sử dụng chúng (chủ yếu là View và Model)
- Unit test chúng một cách độc lập.

> Hãy bắt đầu với MV(X) pattern ^^!.

## MVC.
### MVC truyền thống.
Trước khi thảo luận về tầm nhìn của Apple, hãy để MVC có một cái nhìn về [truyền thống](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)
![MVC truyền thống](https://images.viblo.asia/14c4c5e7-86d7-45ee-95d8-9759c97c6fef.png)

> View là *stateless*
> Tức là không lưu trữ dữ liệu ở View.
> Nó đơn giản được hiển thị bởi Controller và Model.

Đơn giản hãy nghĩ về việc lướt web. 

Website sẽ được refresh hoàn toàn sau khi bạn nhấn vào 1 liên kết để điều hướng đến một nơi khác. 

Mặc dù có thể triển khai MVC truyền thống vào trong iOS App tuy nhiên không thực sự có ý nghĩa nhiều do vấn đề kiến trúc vì cả 3 thực thể (M-V-C) được liên kết chặt chẽ với nhau *mỗi thực thể đều biết về hai thực thể kia*.

> MVC truyền thống dường như không thể áp dụng cho phát triển iOS hiện đại

### Apple's MVC.

**Mong đợi**

![Apple's MVC.](https://images.viblo.asia/7934a34c-5f0e-4985-9a21-0c2e56a8960b.png)

**Controller**
 - Là một class trung gian giữa *View* và *Model*
 > *View* và *Model* sẽ không biết về nhau.
 
- Được ít tái sử dụng nhất. 
> Điều này thường tốt cho chúng ta.
> 
>  Vì chúng ta cần một nơi để giải quyết tất cả các *business logic phức tạp* mà điều đó thì không phù hợp ở Model.

*Về lý thuyết, nó có vẻ rất đơn giản, nhưng bạn cảm thấy có gì đó không ổn, phải không?*
- Tất cả tập trung vào *controller*. View và Model được đảm nhiệm ít trách nhiệm.

Bạn thâm chí còn nghe thấy viết tắt của MVC là **Massive (Phình, to béo, lớn ...) View Controller**.

Hơn nữa, Giảm tải *ViewController* được xem là vấn đề quan trọng đối với các iOS Dev. 

> Đó là điều mà khiến Apple chỉ lấy MVC truyền thống và cải thiện nó một chút?

**Thực tế**

![MVC thuc te](https://images.viblo.asia/a7a782a7-47ca-4d53-be67-15add18604e4.png)

Phân tích chút:
- View ở đây là các file xib, storyboard, các UiView (UIButton, UITextField, UILabel ....)
- Controller ở đây *Nằm trong* UIViewController. Tại sao lại là nằm trong? Bởi vì UIViewController còn quản lý cả lifeCycle của View nữa.
- Model chắc bạn đã quen thuộc. Nó gần như là tách biệt với View và Controller.
- Điểm bạn sẽ thấy không hợp lý ở đây là: 

**View và Controller có sự liên kết chắc chẽ với nhau.**

**Cocoa MVC** khuyến khích bạn viết là *Massive View Controllers* vì chúng liên quan đến lifecycle của *View* đến nỗi khó có thể nói chúng tách rời nhau.

Mặc dù bạn vẫn có thể giảm tải một số *business logic* bằng chuyển đổi dữ liệu trong *Model* nhưng bạn không có nhiều sự lựa chọng khi thực hiện giảm tải cho Controller. 

Hầu hết mọi lúc trách nhiệm của *View* là gửi *Action* đến *ViewController*. 

> **ViewController** là nơi kết thúc "sự uỷ thác" và "nguồn dữ liệu" của mọi thứ. Thường chịu trách nhiệm quản lý request mạng ( ví dụ  API )

*Đã bao nhiêu lần bạn thấy đoạn code.*
```
var userCell = tableView.dequeueReusableCellWithIdentifier("identifier") as UserCell
userCell.configureWithUser(user)
```

Bạn có thấy *user* (Model) đã được *configureWithUser* (cấu hình liên kết) tới *View* (ở đây Cell là view).

**Nguyên tắc MVC đã bị vi phạm**

Nhưng điều này xảy ra mọi lúc và mọi người thường cảm thấy điều đó không sai. 

Nếu bạn *tuân thủ nghiêm ngặt MVC* thì bạn phải *cầu hình Cell từ Controller* và **KHÔNG** pass *Model* và *View*

Hệ quả:
> Sẽ tăng kích thước của ViewController hơn nữa.

> *Cocoa MVC *hợp lý khi được gọi là  *The Massive View Controller.*

Vấn đề có vẻ không rõ ràng cho đến khi bạn đề cập đến *UnitTest*.

Vì *ViewController* của bạn được kết hợp chặt chẽ với *View*.

**So bad cho việc kiểm thử**

Nó trở thành khó khăn hơn cho việc test vì bạn phải rất cực khổ trong việc khởi tạo và quản lý vòng đời của *View* (do chúng liên kết chặt chẽ với ViewController).

Vì vậy: 
> Trong khi viết code *ViewController* theo một cách nào đó để giải quyết các *business logic* thì việc **TÁCH BIỆT** khỏi các * ViewLayout Code* các nhiều càng tốt .

Bạn có thể tham khảo thêm code ở github của tác giả bài viết ở dưới.
> UPD: See updated [code examples](https://github.com/haxpor/ios-design-patterns) by [Wasin Thonkaew](https://github.com/haxpor)

Cũng xem ví dụ.
```swift
import UIKit

struct Person { // Model
    let firstName: String
    let lastName: String
}

class GreetingViewController : UIViewController { // View + Controller: Ngay cái tên đã thể hiện sự gắn kết của View và Controller.
    var person: Person!
    let showGreetingButton = UIButton()
    let greetingLabel = UILabel()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.showGreetingButton.addTarget(self, action: "didTapButton:", forControlEvents: .TouchUpInside)
    }
    
    func didTapButton(button: UIButton) {
        let greeting = "Hello" + " " + self.person.firstName + " " + self.person.lastName
        self.greetingLabel.text = greeting
        
    }
    // layout code goes here
}
// Assembling of MVC
let model = Person(firstName: "David", lastName: "Blaine")
let view = GreetingViewController()
view.person = model;
```

> Việc ghép nối mô hình MVC sẽ thực hiện bên trong *Presenting ViewController*

Điều này có vẻ khó cho việc test. 

Chúng ta có thể khởi tạo của model của Person class và test riêng biệt chúng. 

Nhưng bạn không thể test bất kì *presentation logic* bên trong *GreetingViewController* nếu không gọi đến *UIView* liên quan đến *directly methods (viewDidLoad, didTapButton)*  cái mà phải load tất cả *views*.

> Đó là một điều tồi tệ với *unit testing*.

Thực tế, Loading và testing UiViews ở máy ảo (ví dụ Iphone 4S)  sẽ không đảm bảo nó sẽ hoạt động tốt trên các thiết bị khác như iPad chẳng hạn. 

Vì vậy bạn nên xoá bỏ "Host Application" từ Unit Test target của bạn và chạy test mà không chạy ứng dụng trên máy ảo.

> Tương tác giữa *View và Controller* thực sự không thể thực hiện kiểm thử với *UnitTest*.

Với tất cả những gì đã nói có vẻ như.
> Cocoa MVC là một pattern khá tệ để lựa chọn

Xem xét:
- **Distribution** Thực tế thì *View* và *Model* là tách biệt nhưng *View* và *Controller* lại liên kết chặt chẽ.
- **Testability** Do sự tách biệt không thực sự tốt nên bạn chỉ có thể kiểm thử Model.
- **Ease of use** Lượng code sẽ ít hơn so với các pattern khác. 
> Ngoài ra mọi người thường quen thuộc với nó và do đó nó dễ dàng bảo trì ngay cả bởi các developer chưa có kinh nghiệm.

> Cocoa MVC là mô hình lựa chọn của bạn nếu bạn chưa sẵn sàng đầu tư nhiều thời gian hơn vào kiến trúc của mình và bạn cảm thấy rằng một cái gì đó với chi phí bảo trì cao hơn là quá mức cho dự án thú cưng nhỏ bé của bạn.
# MVP
## Có thể nói MVP là một pattern "Nâng cao" của Apple's MVC.
![MVP](https://images.viblo.asia/fce3b90e-6996-4ecd-8c07-dc31a82740ba.png)

*Phân tích nào ^^!*

- View (V) ở đây gọi là *Passive (Bị động) View*. Chúng là UIView hoặc UIViewController.
- Present (P): ở đây sẽ là các *UIKit independent mediator* - Là class trung gian độc lập - Không phụ thuộc vào cái nào hít à :p
- Model (M) quen thuộc rồi nhỉ.

> Views sẽ chịu trách nhiệm nhận sự kiện (events) từ UI, sau đó gọi *Presenter* khi cần thiết. Trên thực tế, Presenter chịu trách nhiệm cập nhật View khi có dữ liệu mới được trả về từ *Model*.

*Nó có giống với Apple's MVC? Vâng! Nó giống và tên của nó là MVP (Passive View variant). Nhưng đợi một chút...!*

*Apple's MVC có thực sự là MVP? Tôi trả lời rằng: "Không"*

> *MVP* giống *Apple's MVC* nhưng **KHÔNG** phải là *Apple's MVC*.

- *View* liên kết chắc chẽ với *Controller*, Trong khi đó *Presenter* lại là *class trung gian* **KHÔNG** làm bất cứ điều gì với *lifecycle của viewController*.
- *View* có thể khởi tại giả định dễ dàng do đó không có *layout code* trong *Presenter* nhưng nó có trách nhiệm cập nhật *View* khi có data mới hoặc trạng thái view mới.

> *Presenter* đã gần như được tách biệ với *View*.

**Điều gì xảy ra nếu nói UIViewController là View?**

Trong MVP, *UIViewController* là subClass của Views và không phải là *Presenters*. 

Sự khác biệt này cung cấp khả năng kiểm thử tuyệt vời. Đi kèm với chi phí về tốc độ phát triển vì bạn có thể tạo dữ liệu thủ công và ràng buộc event binding. Ví dụ:

```swift
import UIKit

struct Person { // Model
    let firstName: String
    let lastName: String
}

class GreetingPresenter { // Presenter
    unowned let view: GreetingView
    let person: Person
    required init(view: GreetingView, person: Person) {
        self.view = view
        self.person = person
    }
    
    func showGreeting() {
        let greeting = "Hello" + " " + self.person.firstName + " " + self.person.lastName
        self.view.setGreeting(greeting)
    }
}

class GreetingViewController: UIViewController { // View (View + Controller)
    var presenter: GreetingViewPresenter!
    let showGreetingButton = UIButton()
    let greetingLabel = UILabel()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.showGreetingButton.addTarget(self, action: "didTapButton:", forControlEvents: .TouchUpInside)
    }
    
    func didTapButton(button: UIButton) {
        self.presenter.showGreeting()
    }
    
    func setGreeting(greeting: String) {
        self.greetingLabel.text = greeting
    }
    // layout code goes here
}
// Assembling of MVP
let model = Person(firstName: "David", lastName: "Blaine")     // Mocking model
let view = GreetingViewController()                            // Mocking View
let presenter = GreetingPresenter(view: view, person: model)   // Khởi tạo Presenter. Present sở hữu view và model. Tức view và model nằm trong Presenter.
view.presenter = presenter                                     // Ghép nối View với Presenter.
```


**Lưu ý**
- Việc ghép nối mô hình MVP là mô hình đầu tiên cho thấy có một chút vấn đề khi ghép nối giữa các thực thể riêng biệt.
- Vì chúng ta **KHÔNG MUỐN** *View* biết về *Model*. Nó là không đúng việc lắp ghép bên trong Presenting View Controller đó là View. Do đó chúng ta phải thực hiện nó ở 1 nơi khác.
Ví dụ bạn có thể tạo một *Router service* chịu trách nhiệm kết nối và điều hướng View-to-View.

*Hãy cùng xem các tính năng của MVP.*
- **Distribution** Chúng ta thấy phần lớn trách nhiệm đã được phân tách giữa *Presenter* và *Model* với *View*
- **Testability** TUYỆT VỜI! Chúng ta có thể kiểm thử hầu hết các *business logic* bởi vì *View* xem như là tách biệt so với Presenter.
- **Ease for use** Trong ví dụ đơn giản phi thực tế ở trên. Lượng code tăng gấp 2 so với MVC nhưng đồng thời ý tưởng MVP rất rõ ràng.

> MVP trong iOS có khả năng kiểm thử tuyệt với phần lớn code.


## MVP with Bindings and Hooters.
![MVP with Bindings and Hooters](https://images.viblo.asia/074bda1b-1672-4db8-bb0f-eb3620489d3d.png)

Một pattern khác của MVP là *The Supervising Controller MVP*.

Nó là một biến thể của MVP với việc *Bindings* giữa *View và Model* trong kho đó *Presenter (The Supervising Controller)* vẫn xử lý các events từ View và có khả năng thay đổi *View*.

Như chúng ta thấy: Sự tách biệt mơ hồ giữa các entities là điều rất tệ. 
> Điều tốt hơn nên là liên kết chặt chẽ giữa *View* và *Model*
# MVVM
**Là một kiểu MV(X) mới nhất và tốt nhất.**

Về mặt lý thuyết, *Model-View-ViewModel* là rất tốt. *View* và *Model* đã quen thuộc với chúng ta nhưng *Mediator (Class trung gian)* là *Viewmodel* thì mới lạ hơn chút.

![MVVM](https://images.viblo.asia/e6534ddb-43e0-4fc3-88c1-f263e68a4248.png)

*Lại phải phân tích chút xíu ^^!*
- *View  (V)* giống với view ở *MVP*.
- *ViewModel (VM)* Cũng giống với *Presenter (P) ở MVP*. 
    + *ViewModel* sở hữu *View* (Mũi tên owns trên hình)
    + *Model* sở hữu và update *ViewModel*  (Mũi tên owns and updates trên hình)
    + Bạn có thấy mũi tên nét đứt (data and user action binding) không? Đây là điều khác biệt của MVVM. Cùng xem xét nào!
- *Mode (M)* đã bít nhá :p

Nó khả giống với *MVP*:
- *MVVM* sử dụng ViewController như là View.
- Không có sự liên kết chặt chẽ giữa View và Model.

Thêm vào đó nó *binding* giống như *Supervising version của MVP*. Tuy nhiên lần này KHÔNG phải giữa *View và Model* mà là *View và ViewModel*.

*Thực tế trong iOS, ViewModel là gì?*
- Về cơ bản, nó là một class trung gian độc lập (UIKit independent) đại diện cho View và trạng thái của nó.
- *ViewModel* lắng nghe những thay đổi từ *Model* và tự cập nhật chính nó với những thay đổi từ *Model*. Vì chúng ta có 1 binding giữa View và ViewModel.

## Bindings
Bindings khỗng có sẵn trong iOS toolbox. Tuy nhiên chúng ta có *[KVO](https://goo.gl/GkY13i) và notification* nhưng chúng không thuận tiện như *Bindings*.

Chúng ta có 2 lựa chọn để có thể thực hiện *Bindings*
- Một trong những thư viện bindings dựa vào [KVO](https://goo.gl/GkY13i) như [RZDataBinding](https://github.com/Raizlabs/RZDataBinding) hay [SwiftBond](https://github.com/DeclarativeHub/Bond)
- *Functional reactive programing* tốt nhất là [ReactiveCocoa](https://github.com/ReactiveCocoa/ReactiveCocoa), [RxSwift](https://github.com/ReactiveX/RxSwift/) hay [PromiseKit](https://github.com/mxcl/PromiseKit)

Thực tế khi nghe thấy *MVVM* bạn thường kĩ đến *ReactiveCocoa* và ngược lại. 

Mặc dù có thể xây dựng *MVVM* bằng *Bindings cơ bản* nhưng *ReactiveCocoa* sẽ cho phép bạn xây dựng một mô hình MVVM hoàn thiện hơn, dễ dàng hơn.

**Lưu ý**
> Tuy nhiên: Nếu bạn làm gì đó sai trong code thì bạn sẽ rất khó khăn để có thể debug ra lỗi. Đó sẽ là nhược điểm của reactive.

```swift
import UIKit

struct Person { // Model
    let firstName: String
    let lastName: String
}

class GreetingViewModel { // ViewModel
    let person: Person
    var greeting: String? {
        didSet {
            self.greetingDidChange?(self)
        }
    }
    var greetingDidChange: ((GreetingViewModel) -> ())?
    
    required init(person: Person) {
        self.person = person
    }
    
    func showGreeting() {
        self.greeting = "Hello" + " " + self.person.firstName + " " + self.person.lastName
    }
}

class GreetingViewController: UIViewController { // View (View + Controller)
    var viewModel: GreetingViewModel! {
        didSet {
            self.viewModel.greetingDidChange = { [unowned self] viewModel in
                self.greetingLabel.text = viewModel.greeting
            }
        }
    }
    let showGreetingButton = UIButton()
    let greetingLabel = UILabel()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.showGreetingButton.addTarget(self.viewModel, action: "showGreeting", forControlEvents: .TouchUpInside)
    }
    // layout code goes here
}
// Assembling of MVVM
let model = Person(firstName: "David", lastName: "Blaine")
let viewModel = GreetingViewModel(person: model)
let view = GreetingViewController()
view.viewModel = viewModel
```

**Lợi ích của MVVM**

- **Distribution** Thực tế *View trong MVVM* có trách nhiệm hơn là *View trong MVP* vì:
    - Việc cập nhật trạng thái của *View* từ *ViewModel* bằng cách thực hiện *Bindings* 
    - *View* chuyển tiếp tất cả event (sự kiện) đến *Presenter* và không cập nhật chính nó.
- **Testability** *ViewModel* không biết gì về *View*. Nó cho phép test dễ dàng.
- **Easy of use** Sẽ khó khăn hơn trong việc triển khai chúng trên thực tế.
    -  Khi mà phải chuyển tiếp tất cả sự kiện từ *View* sang *Presenter* và update *View* một cách thủ công. MVVM sẽ dễ dàng hơn nếu bạn sử dụng bindings.

> MVVM là tốt vì nó kết hợp các lợi ích các mô hình và tốt cho việc kiểm thử (unit test)

# Tài liệu tham khảo:
Slider bài viết được tham khảo ở  [NSLOndon](http://slides.com/borlov/arch/fullscreen#/7)

https://medium.com/ios-os-x-development/ios-architecture-patterns-ecba4c38de52