Bài viết hôm nay mình sẽ giới thiệu cho các bạn cách tạo ra Popover Card View được sử dụng khá phổ biến trong các app hiện nay như Voice Memos, Map hay Stocks..., cho phép người dùng có thể mở rộng hoặc ẩn thông tin ở nền trước, đồng thời thông tin ở nền sau sẽ được làm mờ đi.

![](https://images.viblo.asia/d427de4e-3aed-4848-a184-f0e6f3beffb6.png)
![](https://images.viblo.asia/021c9f01-7741-42f5-bb0e-5034ae190960.jpg)
![](https://images.viblo.asia/46b567db-f738-4d51-a02c-12859bdcf84a.png)

Để có thể tạo animation cho Card View thì ta cần phải sử dụng **UIViewPropertyAnimator** - object hỗ trợ animation được Apple cho ra mắt tại WWDC 2016. Sau đây là định nghĩa về UIViewPropertyAnimator:
> A class that animates changes to views and allows the dynamic modification of those animations.

Có thể hiểu ngắn gọn là UIViewPropertyAnimator cho phép bạn tạo ra animation cho sự thay đổi của views, mà điển hình là sự thay đổi về vị trí của chúng. Bài viết này mình sẽ không đi sâu vào UIViewPropertyAnimator nên các bạn muốn tìm hiểu thêm thì có thể tham khảo links này: 

https://medium.com/@NilStack/swift-world-uiviewpropertyanimator-exploration-part-1-d3f4ab8901a8

![](https://images.viblo.asia/a78083fc-7228-4694-97da-20206045b3c8.gif)

## Bước 1: Setting up the view
Đầu tiên, mình sẽ tạo một UIViewController cùng file XIB view và đặt tên là CardViewController. Các bạn cũng có thể dùng storyboard hoặc code tùy theo từng project cụ thể.
![](https://images.viblo.asia/3811034e-d605-4116-9202-b5e0372a3cbb.png)

CardViewController view size cần phải set chế độ freeform để nó có thể resized như một view độc lập mà không kề thừa từ các iOS Device properties.
![](https://images.viblo.asia/0167ee66-2098-4329-84f2-4a83c945448f.jpeg)

![](https://images.viblo.asia/c15c2ba0-c842-4f56-938e-9cb700ce3d7a.png)

Trong CardViewController.xib, ta sẽ tạo ra giao diện giống như dưới đây, với view màu trắng là handleArea - được sử dụng để resize view.

![](https://images.viblo.asia/454ddf58-d67f-4ad0-907f-6f24f31d423e.png)
```
import UIKit

final class CardViewController: UIViewController {
    @IBOutlet weak var handleArea: UIView!
    
    override func viewDidLoad() {
        super.viewDidLoad()

    }
}
```

## Bước 2: Setting up Main View Controller

Trong MainViewController class, ta sẽ khai báo một số thuộc tính cần sử dụng:
- Enum CardState để biểu thị hai trạng thái chính của Card View là hiển thị (expanded) và ẩn (collapsed).
- Biến cardVisible biểu thị trạng thái hiện tại của Card View.
- Biến nextState biểu thị trạng thái tiếp theo của Card View.
- Biến startCardHeight và endCardHeight biểu thị chiều cao của Card tại thời điểm bắt đầu (collapsed) và thời điểm kết thúc (expanded).
- Biến animationProgressWhenInterrupted biểu thị phần trăm tiến trình của Animation khi bị gián đoạn.

```
// Enum for card states
enum CardState {
    case collapsed
    case expanded
}

final class MainViewController: UIViewController {
    // Variable determines the next state of the card expressing that the card starts and collapased
    private var nextState: CardState {
        return cardVisible ? .collapsed : .expanded
    }

    // Variable for card view controller
    private var cardViewController: CardViewController!

    // Variable for effects visual effect view
    private var visualEffectView: UIVisualEffectView!

    // Starting and end card heights will be determined later
    private var startCardHeight: CGFloat = 0
    private var endCardHeight: CGFloat = 0


    // Current visible state of the card
    var cardVisible = false

    // Empty property animator array
    var runningAnimations = [UIViewPropertyAnimator]()
    var animationProgressWhenInterrupted: CGFloat = 0

```

Tiếp theo, ta sẽ add cardview và visual effect view vào view của MainViewController và set frame cho chúng. Ở đây visual effect view sẽ tạo hiệu ứng làm mờ khi cardview được expand. Và để thực hiện được các thao tác expand hay collapse thì ta cần add tap gesture và pan gesture cho handleArea của CardViewController. Tap gesture sẽ nhận biết thao tác nhấn của người dùng để thực hiện animation cho cardview khi expand hoặc collapse. Còn Pan gesture sẽ nhận biết khi người dùng kéo lên xuống cardview để phù hợp với kích thước expand của cardview.
```
private func setupCard() {
    // Setup starting and ending card height
    endCardHeight = self.view.frame.height * 0.8
    startCardHeight = self.view.frame.height * 0.3

    // Add Visual Effects View
    visualEffectView = UIVisualEffectView()
    visualEffectView.frame = self.view.frame
    self.view.addSubview(visualEffectView)

    // Add CardViewController xib to the bottom of the screen, clipping bounds so that the corners can be rounded
    cardViewController = CardViewController(nibName:"CardViewController", bundle:nil)
    self.addChild(cardViewController)
    self.view.addSubview(cardViewController.view)
    cardViewController.view.frame = CGRect(x: 0, y: self.view.frame.height - startCardHeight, width: self.view.bounds.width, height: endCardHeight)
    cardViewController.view.clipsToBounds = true

    // Add tap and pan recognizers
    let tapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(handleCardTap(recognzier:)))
    let panGestureRecognizer = UIPanGestureRecognizer(target: self, action: #selector(handleCardPan(recognizer:)))

    cardViewController.handleArea.addGestureRecognizer(tapGestureRecognizer)
    cardViewController.handleArea.addGestureRecognizer(panGestureRecognizer)
}

// Handle tap gesture recognizer
@objc
private func handleCardTap(_ recognzier: UITapGestureRecognizer) {
    switch recognzier.state {
    // Animate card when tap finishes
    case .ended:
        animateTransitionIfNeeded(state: nextState, duration: 0.5)
    default:
        break
    }
}

// Handle pan gesture recognizer
@objc
private func handleCardPan(_ recognizer: UIPanGestureRecognizer) {
    switch recognizer.state {
    case .began:
        // Start animation if pan begins
        startInteractiveTransition(state: nextState, duration: 0.5)
    case .changed:
        // Update the translation according to the percentage completed
        let translation = recognizer.translation(in: self.cardViewController.handleArea)
        var fractionComplete = translation.y / endCardHeight
        fractionComplete = cardVisible ? fractionComplete : -fractionComplete
        updateInteractiveTransition(fractionCompleted: fractionComplete)
    case .ended:
        // End animation when pan ends
        continueInteractiveTransition()
    default:
        break
    }
}
```

## Bước 3: Setting up the animation
Popover Card View sử dụng UIViewPropertyAnimator để tạo animation, gắn liền với việc sử dụng Pan Gesture để xác định phần trăm Popover view được hiển thị để animation có thể cập nhật dựa trên số phần trăm đó. Và với Tap Gesture thì Popover view bật lên sẽ khớp với vị trí cần hiển thị đã set trước đó. Bên cạnh đó, UIViewPropertyAnimator còn sử dụng curved animation để bo tròn góc cho Card View khi expand.
```
// Animate transistion function
private func animateTransitionIfNeeded(state: CardState, duration: TimeInterval) {
    // Check if frame animator is empty
    if runningAnimations.isEmpty {
        // Create a UIViewPropertyAnimator depending on the state of the popover view
        // The damping ratio to apply to the initial acceleration and oscillation.
        let frameAnimator = UIViewPropertyAnimator(duration: duration, dampingRatio: 1) {
            switch state {
            case .expanded:
                // If expanding set popover y to the ending height and blur background
                self.cardViewController.view.frame.origin.y = self.view.frame.height - self.endCardHeight
                self.visualEffectView.effect = UIBlurEffect(style: .dark)

            case .collapsed:
                // If collapsed set popover y to the starting height and remove background blur
                self.cardViewController.view.frame.origin.y = self.view.frame.height - self.startCardHeight
                self.visualEffectView.effect = nil
            }
        }

        // Complete animation frame
        frameAnimator.addCompletion { _ in
            self.cardVisible = !self.cardVisible
            self.runningAnimations.removeAll()
        }

        // Start animation
        frameAnimator.startAnimation()

        // Append animation to running animations
        runningAnimations.append(frameAnimator)

        // Create UIViewPropertyAnimator to round the popover view corners depending on the state of the popover
        let cornerRadiusAnimator = UIViewPropertyAnimator(duration: duration, curve: .linear) {
            switch state {
            case .expanded:
                // If the view is expanded set the corner radius to 12
                self.cardViewController.view.layer.cornerRadius = 12

            case .collapsed:
                // If the view is collapsed set the corner radius to 0
                self.cardViewController.view.layer.cornerRadius = 0
            }
        }

        // Start the corner radius animation
        cornerRadiusAnimator.startAnimation()

        // Append animation to running animations
        runningAnimations.append(cornerRadiusAnimator)
    }
}

// Function to start interactive animations when view is dragged
private func startInteractiveTransition(state: CardState, duration: TimeInterval) {
    // If animation is empty start new animation
    if runningAnimations.isEmpty {
        animateTransitionIfNeeded(state: state, duration: duration)
    }

    // For each animation in runningAnimations
    for animator in runningAnimations {
        // Pause animation and update the progress to the fraction complete percentage
        animator.pauseAnimation()
        animationProgressWhenInterrupted = animator.fractionComplete
    }
}

// Funtion to update transition when view is dragged
private func updateInteractiveTransition(fractionCompleted: CGFloat) {
    // For each animation in runningAnimations
    for animator in runningAnimations {
        // Update the fraction complete value to the current progress
        animator.fractionComplete = fractionCompleted + animationProgressWhenInterrupted
    }
}

// Function to continue an interactive transisiton
private func continueInteractiveTransition() {
    // For each animation in runningAnimations
    for animator in runningAnimations {
        // Continue the animation forwards or backwards
        animator.continueAnimation(withTimingParameters: nil, durationFactor: 0)
    }
}
```

Và đây là kết quả:

![](https://images.viblo.asia/28ccccd9-46a4-4284-8e5f-2171658b272a.gif)

**Bài viết có tham khảo tư liệu nước ngoài:**

https://medium.com/better-programming/swift-create-a-dynamic-popover-card-view-d6f274be0c6b

https://www.youtube.com/watch?v=L-f1KSPKm4I

**Link github:**

https://github.com/ndhuy96/PopoverCardView