Trong bài đầu tiên, chúng ta đã tìm hiểu các khái niệm cơ bản về RxSwift và RxCocoa. Nếu bạn chưa đọc thì có thể nhấn vào link này [Những khái niệm cơ bản trong RxSwift](https://viblo.asia/p/rxswift-qua-vi-du-1-nhung-dieu-co-ban-Az45bnrO5xY)  Hôm nay chúng ta sẽ nói về binding.
Đừng lo lắng, binding có nghĩa là kết nối và chúng ta sẽ kết nối các Observable với các Subject. Có một số thuật ngữ mà chúng ta chưa từng học trước đây, vì vậy đầu tiên là:

# Definitions
![](https://images.viblo.asia/fbdb1d14-9794-44a3-a8c9-727f4da85e36.jpg)

Trước khi bắt đầu, chúng ta cần điểm lại một số định nghĩa. Chúng ta đã tìm hiểu về Observable và Observe, hôm nay chúng ta sẽ tìm hiểu về một số định nghĩa khác.

Subject - Có thể đồng thời đóng vai trò Observable và Observe. Về cơ bản nó có thể Observable các đối tượng khác và các cũng có thể được đối tượng khác Observe.
BehaviorSubject - Khi bạn đăng ký nhận thông tin từ BehaviorSubject, bạn sẽ nhận được giá trị mới nhất được phát ra bởi Subject, và cả các giá trị được phát ra sau khi đăng ký.
PublishSubject - Khi bạn đăng ký nhận thông tin từ PublishSubject, bạn sẽ chỉ nhận được các giá trị được phát ra sau khi đăng ký (Khác với BehaviorSubject là bạn sẽ không nhận được giá trị mới nhất đã được phát ra khi mới đăng ký)
ReplaySubject - Khi bạn đăng ký nhận thông tin từ ReplaySubject, bạn sẽ nhận được các giá trị được phát ra sau khi đăng ký, nhưng cũng có thể nhận được các giá trị được phát ra trước khi đăng ký. Số lượng giá trị đã được phát ra bạn muốn nhận được tuỳ thuộc vào lúc bạn khai báo khi khời tạo.

Rồi. Nếu bạn thấy có quá nhiều đối tượng phải nhớ thì hãy đơn giản hóa nó một chút bằng một ví dụ. Bạn đang tổ chức một bữa tiệc sinh nhật? và bạn đang mở những món quà bạn có

![](https://images.viblo.asia/2e0eeaf3-1eef-4376-b2ec-0afd60a2f185.jpg)

Giả sử bạn đã mở món quà thứ nhất, thứ hai, thứ ba. Và rất tiếc! Mẹ của bạn đang nấu một số món ăn ngon nên đã đến muộn. Cô ấy muốn biết những món quà bạn đã có. Vì vậy, bạn nói với cô ấy. Trong thế giới Rx, bạn đã gửi chuỗi (quà) observable tới observer (mẹ của bạn). Điều thú vị là cô ấy bắt đầu observe (chứng kiến việc mở quà) sau khi bạn đã phát ra vài giá trị (đã mở vài hộp quà), nhưng cô ấy vẫn biết toàn bộ thông tin về những món quà đã được mở. Đối với người mẹ, chúng ta đóng vai trò là ReplaySubject với bộ đệm = 3 (chúng ta lưu 3 món quà mới nhất và cung cấp cho nó mỗi khi một subcriber mới xuất hiện).

Bạn vẫn đang mở quà và ở đó bạn thấy rằng hai người bạn của bạn (Jack và Andy) cũng đã đến dự tiệc. Jack là bạn thân của bạn nên anh ta hỏi bạn đã mở được cái gì cho đến giờ. Khi bạn rất tức giận vì anh ấy đã bỏ lỡ một phần buổi tiệc sinh nhật, bạn chỉ nói cho anh ta món quà mới nhất mà bạn đã mở ra. Anh ấy không biết rằng có nhiều thứ hơn, vì vậy anh ấy hài lòng với nó. Trong thế giới Rx, bạn chỉ gửi giá trị được phát ra mới nhất cho Observe (Jack). Anh ta cũng sẽ nhận được các giá trị tiếp theo khi bạn phát ra chúng (những món quà tiếp theo bạn sẽ mở). Đối với Jack chúng ta đóng vai trò là một BehaviorSubject.

Ngoài ra còn có Andy, là một người bạn và không thực sự quan tâm đến những món quà bạn đã mở nên anh ấy chỉ ngồi xuống và đợi phần còn lại của chương trình. Như bạn có thể tưởng tượng, đối với anh ta chúng ta đóng vai trò chỉ là một PublishSubject. Anh ta chỉ nhận được các giá trị được phát ra sau khi đăng ký.

Ngoài ra còn có Variable. Đây là đối tượng xây dựng dựa trên BehaviorSubject. Điểm khác biệt ở chỗ bạn chỉ có thể gửi sự kiện .onNext () (khi sử dụng BehaviorSubject bạn có thể gửi .onError () và .onCompleted ()). Ngoài ra, Variable tự động gửi sự kiện .onCompleted () khi biến bị giải phóng.

Được rồi, đủ với định nghĩa. Hãy thử nó!

## Example

![](https://images.viblo.asia/093785f4-33a0-4d83-a1bf-ad850bb345ca.gif)

Chúng ta sẽ tạo ra ứng dụng đơn giản, kết nối màu của quả bóng với vị trí của quả bóng, ngoài ra chúng ta cũng sẽ kết nối màu nền với màu quả bóng.

![](https://images.viblo.asia/2281ca90-4e87-4baa-94c2-b4881732d85f.jpg)

Trước tiên, Chúng ta tạo project như trong bài trước. Chúng ta cũng sẽ sử dụng CocoaPods, RxSwift và RxCocoa, Ở bài này mình sẽ sử dụng thư viện Chameleon để kết nối màu sắc một cách tốt nhất. Podfile của chúng ta sẽ trông như thế này:

```
platform :ios, '9.0'
use_frameworks!
 
target 'ColourfulBall' do
 
pod 'RxSwift'
pod 'RxCocoa'
pod 'ChameleonFramework/Swift', :git => 'https://github.com/ViccAlexander/Chameleon.git'
 
end
 
post_install do |installer|
    installer.pods_project.targets.each do |target|
        target.build_configurations.each do |config|
              config.build_settings['ENABLE_TESTABILITY'] = 'YES'
              config.build_settings['SWIFT_VERSION'] = '3.0'
        end
    end
end
```

Sau khi thiết lập xong, giờ là lúc bắt tay vào viết code! Đầu tiên chúng ta sẽ vẽ hình tròn trong khung nhìn chính của ViewController. Chúng tôi sẽ làm điều đó bằng code, nhưng bạn cũng có thể làm điều đó trong Interface Builder. Ví dụ về việc tạo view sẽ giống như dưới đây:

```
import ChameleonFramework
import UIKit
import RxSwift
import RxCocoa
 
class ViewController: UIViewController {
 
    var circleView: UIView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setup()
    }
 
    func setup() {
        // Add circle view
        circleView = UIView(frame: CGRect(origin: view.center, size: CGSize(width: 100.0, height: 100.0)))
        circleView.layer.cornerRadius = circleView.frame.width / 2.0
        circleView.center = view.center
        circleView.backgroundColor = .green
        view.addSubview(circleView)
    }
}
```

Đoạn code này cũng khá dễ hiểu nên mình sẽ chuyển qua bước tiếp theo. Chúng ta sẽ di chuyển quả bóng. Chúng ta thêm UIPanGestureRecognizer và thay đổi frame của quả bóng:

```
func setup() {
    // Add circle view
    circleView = UIView(frame: CGRect(origin: view.center, size: CGSize(width: 100.0, height: 100.0)))
    circleView.layer.cornerRadius = circleView.frame.width / 2.0
    circleView.center = view.center
    circleView.backgroundColor = .green
    view.addSubview(circleView)
        
    // Add gesture recognizer
    let gestureRecognizer = UIPanGestureRecognizer(target: self, action: #selector(circleMoved(_:)))
    circleView.addGestureRecognizer(gestureRecognizer)
}
 
func circleMoved(_ recognizer: UIPanGestureRecognizer) {
    let location = recognizer.location(in: view)
    UIView.animateWithDuration(0.1) {
        self.circleView.center = location
    }
}
```

Tuyệt vời! Giờ ứng dụng của chúng ta sẽ giống như hình dưới:

![](https://images.viblo.asia/76506a80-dc2e-48d9-b46c-39d720787977.gif)

Bước tiếp theo chúng ta sẽ kết nối vị trí của quả bóng với màu của quả bóng. Làm thế nào để làm điều đó? Đầu tiên, chúng ta sẽ observe vị trí trung tâm của quả bóng bằng cách sử dụng rx.observe () và sau đó bind nó với một Variable, sử dụng bindTo ().  Mỗi khi một vị trí mới được phát ra bởi quả bóng, Variable sẽ nhận được nó. Trong trường hợp này Variable của chúng ta là một Observer, bởi vì nó sẽ observe vị trí của quả bóng.

Chúng ta sẽ tạo Variable này trong ViewModel, nó sẽ được sử dụng để tính toán những thứ từ UI. Trong trường hợp này mỗi lần biến của chúng ta sẽ nhận được một tín hiệu vị trí mới, chúng ta sẽ tính toán lại màu nền của quả bóng mới.

Bây giờ chúng ta sẽ tạo class ViewModel. Nó khá đơn giản, bởi vì chúng ta sẽ chỉ có 2 thuộc tính: centerVariable sẽ đồng thời là observe và observable - chúng ta sẽ lưu dữ liệu vào biến đó và sau đó chúng ta sẽ lấy nó ra. Và thứ hai sẽ là backgroundColorObservable. Nó thực sự không phải là một Variable, mà chỉ là Observable.

Bây giờ bạn có thể đặt câu hỏi "Tại sao là centerVariable một Variable, nhưng backgroundColorObservable lại là một Observable?"  Đó là một câu hỏi hay! Observable trung tâm của quả bóng được kết nối với centerVariable. Nó có nghĩa là bất cứ khi nào giá trị trung tâm quả bóng thay đổi, centerVariable sẽ nhận được sự thay đổi đó. Đó là một Observe. Cũng trong ViewModel, chúng ta sử dụng centerVariable làm Observable , điều này làm cho cả Observer và Observable chỉ là Subject. Tại sao lại là Variable và mà không phải PublishSubject hay ReplaySubject? Bởi vì chúng ta muốn chắc chắn rằng chúng ta sẽ có được vị trí trung tâm mới nhất của quả bóng đó mỗi khi chúng ta đăng ký với nhận thông tin.

ViewModel của chúng ta về cơ bản  sẽ trông như thế này:

```
import ChameleonFramework
import Foundation
import RxSwift
import RxCocoa
 
class CircleViewModel {
    
    var centerVariable = Variable<CGPoint?>(.zero) // Create one variable that will be changed and observed
    var backgroundColorObservable: Observable<UIColor>! // Create observable that will change backgroundColor based on center
    
    init() {
        setup()
    }
 
    setup() {
    }
}
```

Tuyệt. Bây giờ chúng ta cần thiết lập backgroundColor Observable. Chúng ta muốn nó thay đổi dựa trên CGPoint mới được phát ra bởi centerVariable.

```
func setup() {
    // When we get new center, emit new UIColor
    backgroundColorObservable = centerVariable.asObservable()
        .map { center in
            guard let center = center else { return UIColor.flatten(.black)() }
            
            let red: CGFloat = ((center.x + center.y) % 255.0) / 255.0 // We just manipulate red, but you can do w/e
            let green: CGFloat = 0.0
            let blue: CGFloat = 0.0
            
            return UIColor.flatten(UIColor(red: red, green: green, blue: blue, alpha: 1.0))()
        }
}
```

Giờ mình sẽ giải thích từng bước một:

1- Biến Variable của chúng ta thành Observable - vì Variable có thể là Observer và Observable và vì chúng ta muốn observe nó nên chúng ta biến nó thành Observable.

2- Mapping mọi giá trị mới của CGPoint thành UIColor. Chúng ta có điểm giữa của quá bóng từ Observable, sau đó dựa trên tính toán toán học, chúng ta tạo ra UIColor mới.

3- Bạn có thể nhận thấy rằng Observe của chúng ta là một biến optional CGPoint. Tại sao vậy? Mình sẽ giải thích nó sau nhưng chúng ta cần phải tự bảo vệ để tránh crash và trong trường hợp chúng ta nhận được nil,  chúng ta sẽ trả về màu mặc định (màu đen trong ví dụ).

Okaỵ, gần xong rồi. Bây giờ chúng ta có Observable sẽ phát ra màu mới cho quả bóng. Chúng ta chỉ cần cập nhật lại màu bóng  dựa trên các giá trị mới. Khá dễ dàng và nó tương tự như phần 1 của loạt bài này. Chúng ta sẽ subcribe() Observable.

```
// Subscribe to backgroundObservable to get new colors from the ViewModel.
circleViewModel.backgroundColorObservable
    .subscribe(onNext: { [weak self] backgroundColor in
        UIView.animateWithDuration(0.1) {
            self?.circleView.backgroundColor = backgroundColor
            // Try to get complementary color for given background color
            let viewBackgroundColor = UIColor(complementaryFlatColorOf: backgroundColor)
            // If it is different that the color
            if viewBackgroundColor != backgroundColor {
                // Assign it as a background color of the view
                // We only want different color to be able to see that circle in a view
                self?.view.backgroundColor = viewBackgroundColor
            }
        }
    })
    .addDisposableTo(disposeBag)
```

Như bạn có thể thấy, chúng ta cũng đã thêm sự kiện thay đổi màu nền của View dựa trên màu của quả bóng.

```
func setup() {
    // Add circle view
    circleView = UIView(frame: CGRect(origin: view.center, size: CGSize(width: 100.0, height: 100.0)))
    circleView.layer.cornerRadius = circleView.frame.width / 2.0
    circleView.center = view.center
    circleView.backgroundColor = .green
    view.addSubview(circleView)
    
    circleViewModel = CircleViewModel()
    // Bind the center point of the CircleView to the centerObservable
    circleView
        .rx.observe(CGPoint.self, "center")            
        .bindTo(circleViewModel.centerVariable)
        .addDisposableTo(disposeBag)
 
    // Subscribe to backgroundObservable to get new colors from the ViewModel.
    circleViewModel.backgroundColorObservable
        .subscribe(onNext: { [weak self] backgroundColor in
            UIView.animateWithDuration(0.1) {
                self?.circleView.backgroundColor = backgroundColor
                // Try to get complementary color for given background color
                let viewBackgroundColor = UIColor(complementaryFlatColorOf: backgroundColor)
                // If it is different that the color
                if viewBackgroundColor != backgroundColor {
                    // Assign it as a background color of the view
                    // We only want different color to be able to see that circle in a view
                    self?.view.backgroundColor = viewBackgroundColor
                }
            }
        })
        .addDisposableTo(disposeBag)
    
    let gestureRecognizer = UIPanGestureRecognizer(target: self, action: #selector(circleMoved(_:)))
    circleView.addGestureRecognizer(gestureRecognizer)
}
```

Vậy là xong. Toàn bộ nhiệm vụ thay đổi màu sắc mà không sử dụng delegate, notifications và một đống code dài dòng, phức tạp nếu chúng ta sử dụng cách đó. 

![](https://images.viblo.asia/af8f2111-8a6c-4016-b676-2e02d1f28791.gif)

Bây giờ bạn có thể thử tùy chỉnh nó! Có thể bind giữa vị trí trung tâm với kích thước bóng? Sau đó cố gắng thay đổi góc của nó dựa trên chiều rộng và chiều cao của nó? Điều đó tùy thuộc vào bạn nhưng mình nghĩ rằng với Rx nhiệm vụ đó thực sự thú vị và dễ dàng.

Hẹn gặp lại các bạn trong loạt bài giới thiệu về Rx vào tuần sau. Cảm ơn các bạn đã đọc.

nguồn: https://www.thedroidsonroids.com/blog/ios/rxswift-by-examples-2-observable-and-the-bind/