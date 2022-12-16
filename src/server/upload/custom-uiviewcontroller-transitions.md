# custom-uiviewcontroller-transitions
iOS cung cấp một số view controller transitions tốt - push, pop, cover vertically - miễn phí. bên cạnh đó cũng ta cũng có thể tự custom cho riêng mình.
custom view controller transitions có thể nâng cao đáng kể trải nghiệm của người dùng và đặt ứng dụng của bạn ngoài phần còn lại của gói. Nếu trước kia bạn tránh custom view controller transitions vì quá trình này có vẻ quá khó khăn, thì bây giờ bạn sẽ thấy rằng nó không khó như bạn nghĩ.

Trong hướng dẫn này, bạn sẽ thêm một số chuyển tiếp UIViewController tùy chỉnh vào một ứng dụng trò chơi đoán nhỏ. Khi bạn hoàn thành, bạn sẽ học được:
- Cách API chuyển đổi được cấu trúc.
- Làm thế nào để present và dismiss view controller bằng cách sử dụng custom transitions
- Làm thế nào để xây dựng quá trình chuyển đổi tương tác.

đầu tiên hãy down [project](https://koenig-media.raywenderlich.com/uploads/2017/10/GuessThePet-starter-1.zip) sau về và chạy thử bạn sẽ thấy
### 
![](https://images.viblo.asia/a00e8c02-43ad-4bd4-96a8-550541e6c2f7.gif)
### 
Ứng dụng hiển thị một số thẻ trong bộ điều khiển chế độ xem trang. Mỗi thẻ cho thấy một mô tả của một con vật cưng và khai thác một thẻ cho thấy vật nuôi nó mô tả.
tuy logic điều hướng đã có sẵn nhưng ứng dụng hiện đang cảm thấy khá nhạt nhẽo. Chúng ta sẽ custom lại nó.

# Exploring the Transitioning API
Transitioning API là tập hợp các giao thức. Điều này cho phép bạn thực hiện lựa chọn triển khai tốt nhất cho ứng dụng của mình: sử dụng các đối tượng hiện có hoặc tạo các đối tượng được xây dựng nhằm mục đích quản lý quá trình chuyển đổi của bạn. Đến cuối phần này, bạn sẽ hiểu trách nhiệm của từng giao thức và các kết nối giữa chúng. Sơ đồ dưới đây cho bạn thấy các thành phần chính của API:
### 
![](https://images.viblo.asia/a41c5016-5f9b-4ba5-9a4b-fac948efaf33.jpg)
### 
## The Pieces of the Puzzle
Mặc dù biểu đồ trông phức tạp, những sẽ khá đơn giản khi bạn hiểu cách các phần khác nhau hoạt động cùng nhau.
### Transitioning Delegate
Mỗi view controller đều có thể có một transitioning Delegate, một đối tượng phù hợp với UIViewControllerTransitioningDelegate.
Bất cứ khi nào bạn present hoặc dismiss một view controller, UIKit sẽ yêu cầu  transitioning Delegate của nó cho animation controller để sử dụng. Để thay thế một hoạt ảnh mặc định bằng hoạt ảnh tùy chỉnh của riêng bạn, bạn phải triển khai một Transitioning Delegate và cho phép nó trả về animation controller thích hợp.
### Animation Controller
animation controller được trả về bởi transitioning delegate là một đối tượng thực hiện UIViewControllerAnimatedTransitioning. Nó thực hiện "“heavy lifting" của việc thực hiện chuyển tiếp hoạt cảnh.
### Transitioning Context
Các đối tượng transitioning delegate thực hiện UIViewControllerContextTransitioning và đóng một vai trò quan trọng trong quá trình chuyển đổi: nó đóng gói thông tin về các khung nhìn và các bộ điều khiển xem có liên quan đến quá trình chuyển đổi.
Như bạn thấy trong biểu đồ, bạn không tự triển khai giao thức này. UIKit tạo và cấu hình ngữ cảnh chuyển tiếp cho bạn và chuyển nó vào animation controller của bạn mỗi lần xảy ra quá trình chuyển đổi.
### The Transitioning Process
Dưới đây là các bước liên quan đến presentation transition::
* Bạn kích hoạt transition thông qua một segue hay lập trình
* UIKit yêu cầu view controller tới cho transitioning delegate của nó. Nếu nó không có, UIKIt sử dụng chuyển tiếp chuẩn, tích hợp sẵn.
* UIKit sau đó yêu cầu các transitioning delegate cho một animation controller thông qua **animationController(forPresented:presenting:source:)**.. Nếu trả về nil, quá trình chuyển đổi sẽ sử dụng hoạt ảnh mặc định.
* UIKit xây dựng bối cảnh chuyển đổi.
* UIKit hỏi bộ điều khiển hoạt ảnh trong suốt thời gian hoạt ảnh của nó bằng cách gọi** transitionDuration(using:)**
* UIKit gọi  **animateTransition(using:)** trên bộ điều khiển hoạt ảnh để thực hiện hoạt ảnh cho quá trình chuyển đổi.
* Cuối cùng, bộ điều khiển hoạt ảnh gọi hàm **completeTransition(_:)** trên ngữ cảnh chuyển đổi để cho biết rằng hoạt ảnh hoàn tất.
# Creating a Custom Presentation Transition
## Creating the Animator
khởi tạo file FlipPresentAnimationController, đặt nó làm lớp con của NSObject và đặt ngôn ngữ là Swift. Nhấp vào next và đặt group thành Animation Controllers.
Animation Controllers. phải tuân theo UIViewControllerAnimatedTransitioning. Mở FlipPresentAnimationController.swift và cập nhật khai báo lớp cho phù hợp.
```
class FlipPresentAnimationController: NSObject, UIViewControllerAnimatedTransitioning {

}
```
Xcode sẽ đưa một lỗi rằng FlipPresentAnimationController không phù hợp với UIViewControllerAnimatedTransitioning. Nhấp vào fix để thêm các yếu tố cần thiết.
### 
![](https://images.viblo.asia/0e41a978-6a28-4760-8fa3-79d9118c2aff.png)
###

tiến hành khởi tạo frame cho thẻ được tạo hoạt ảnh trong phần thân của class ta thêm code sau:
```
private let originFrame: CGRect

init(originFrame: CGRect) {
  self.originFrame = originFrame
}
```
sau đó sửa code sau 
```
func transitionDuration(using transitionContext: UIViewControllerContextTransitioning?) -> TimeInterval {
  return 2.0
}
```
method này chỉ định thời gian chuyển đổi . 2s là đủ thời gian để quan sát hoạt ảnh.
tiếp đó thêm phần sau vào animateTransition(using:)
```
// 1
guard let fromVC = transitionContext.viewController(forKey: .from),
  let toVC = transitionContext.viewController(forKey: .to),
  let snapshot = toVC.view.snapshotView(afterScreenUpdates: true)
  else {
    return
}

// 2
let containerView = transitionContext.containerView
let finalFrame = transitionContext.finalFrame(for: toVC)

// 3
snapshot.frame = originFrame
snapshot.layer.cornerRadius = CardViewController.cardCornerRadius
snapshot.layer.masksToBounds = true
```
đoạn code trên sẽ:
* Trích xuất tham chiếu đến cả bộ view controller đang được thay thế và controller đang được hiển thị. Tạo ảnh chụp nhanh về màn hình sẽ trông như thế nào sau khi chuyển đổi.
* UIKit đóng gói toàn bộ quá trình chuyển đổi bên trong một khung nhìn container để đơn giản hóa việc quản lý cả hệ thống phân cấp khung nhìn và các hình động. Nhận tham chiếu đến chế độ xem vùng chứa và xác định khung cuối cùng của chế độ xem mới sẽ là gì.
* Định cấu hình khung và bản vẽ của ảnh chụp sao cho nó khớp chính xác và bao phủ thẻ từ chế độ xem.
tiếp tục thêm vào hàm  animateTransition(using:). đoạn code sau
```
// 1
containerView.addSubview(toVC.view)
containerView.addSubview(snapshot)
toVC.view.isHidden = true

// 2
AnimationHelper.perspectiveTransform(for: containerView)
snapshot.layer.transform = AnimationHelper.yRotation(.pi / 2)
// 3
let duration = transitionDuration(using: transitionContext)
```
container view được khởi tạo từ uikit chỉ chứa từ View. Điều quan trọng cần nhớ là addSubview (_ :) đặt chế độ xem mới ở phía trước tất cả các chế độ xem khác trong cấu trúc phân cấp chế độ xem để thứ tự mà bạn thêm các lượt xem phụ quan trọng.
* Thêm khung nhìn mới vào phân cấp khung nhìn và ẩn nó. Đặt ảnh chụp ở phía trước nó.
* Thiết lập trạng thái bắt đầu của hoạt ảnh bằng cách xoay ảnh chụp nhanh 90˚ xung quanh trục y của nó. Điều này làm cho nó trở thành cạnh đối với người xem và, do đó, không hiển thị khi hoạt ảnh bắt đầu.
* Nhận thời lượng hoạt ảnh.

hoàn thành method theo code sau:
```
UIView.animateKeyframes(
  withDuration: duration,
  delay: 0,
  options: .calculationModeCubic,
  animations: {
    // 2
    UIView.addKeyframe(withRelativeStartTime: 0.0, relativeDuration: 1/3) {
      fromVC.view.layer.transform = AnimationHelper.yRotation(-.pi / 2)
    }
    
    // 3
    UIView.addKeyframe(withRelativeStartTime: 1/3, relativeDuration: 1/3) {
      snapshot.layer.transform = AnimationHelper.yRotation(0.0)
    }
    
    // 4
    UIView.addKeyframe(withRelativeStartTime: 2/3, relativeDuration: 1/3) {
      snapshot.frame = finalFrame
      snapshot.layer.cornerRadius = 0
    }
},
  // 5
  completion: { _ in
    toVC.view.isHidden = false
    snapshot.removeFromSuperview()
    fromVC.view.layer.transform = CATransform3DIdentity
    transitionContext.completeTransition(!transitionContext.transitionWasCancelled)
})
```
## Wiring Up the Animator
Mở CardViewController.swift và thêm phần mở rộng sau ở dưới cùng của tập tin..
```
extension CardViewController: UIViewControllerTransitioningDelegate {
  func animationController(forPresented presented: UIViewController,
                           presenting: UIViewController,
                           source: UIViewController)
    -> UIViewControllerAnimatedTransitioning? {
    return FlipPresentAnimationController(originFrame: cardView.frame)
  }
}
```
thêm  xuống cuối của hàm  prepare(for:sender:) đoạn code sau
```
destinationViewController.transitioningDelegate = self
```
sau đó build project ta sẽ được
### 
![](https://images.viblo.asia/06842e66-c762-43be-9827-78abe9b410b9.gif)
###

nguồn: [https://www.raywenderlich.com/170144/custom-uiviewcontroller-transitions-getting-started](https://www.raywenderlich.com/170144/custom-uiviewcontroller-transitions-getting-started)