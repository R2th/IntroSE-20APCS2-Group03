## Môi trường phát triển:
- **Swift Language Version:** Swift 5.0
- **Xcode:** Version 10.2.1
- **Deployment Target:** 12.0

UIKit cho phép tuỳ chỉnh view controller's presentation thông qua **UIViewControllerAnimatedTransitioning** delegate với hai function chính:
- **transitionDuration(using: ):** Hàm lấy thông tin về thời gian diễn ra transition animations. Giá trị trả về phải giống với giá trị bạn sử dụng để config animations trong hàm **animateTransition(using: )**. 
- **animateTransition(using: ):** Hàm cho phép config transition animations và được gọi khi presenting hoặc dismissing view controller.
## Bước 1: Khởi tạo màn hình
![](https://images.viblo.asia/d0159e50-f3a9-47ff-9d23-3e612af1c31a.png)
## Bước 2:  Fade Animation Transition
Ta tạo class **FadeAnimationController** và áp dụng thực thi **UIViewControllerAnimatedTransitioning**.
```
class FadeAnimationController: NSObject, UIViewControllerAnimatedTransitioning {

    private let presenting: Bool

    func transitionDuration(using transitionContext: UIViewControllerContextTransitioning?) -> TimeInterval {
        return 0.5
    }

    func animateTransition(using transitionContext: UIViewControllerContextTransitioning) {
        guard let fromView = transitionContext.view(forKey: .from) else { return }
        guard let toView = transitionContext.view(forKey: .to) else { return }

        let container = transitionContext.containerView
        if presenting {
            container.addSubview(toView)
            toView.alpha = 0.0
        } else {
            container.insertSubview(toView, belowSubview: fromView)
        }

        UIView.animate(withDuration: transitionDuration(using: transitionContext), animations: {
            if self.presenting {
                toView.alpha = 1.0
            } else {
                fromView.alpha = 0.0
            }
        }) { _ in
            let success = !transitionContext.transitionWasCancelled
            if !success {
                toView.removeFromSuperview()
            }
            transitionContext.completeTransition(success)
        }
    }

    init(presenting: Bool) {
        self.presenting = presenting
    }
}
```

Trong đó:
- **fromView:** là view xuất hiện ở phần mở đầu của transition, hoặc ở phần kết thúc của canceled transition. Ví dụ khi presenting thì fromView là view của viewController1, còn khi dismissing thì fromView là view của viewController2.
- **toView:** là view xuát hiện ở phần kết thúc của completed transition.
- **container:** hoạt động như một superview chứa các views tham gia vào transition.
- **presenting:** biến Bool thể hiện kiểu transition (true khi đang presenting và false khi đang dismissing).
- **completeTransition():** Hàm thông báo cho system rằng transition animation đã hoàn thành.

## Bước 3: Custom Transition Delegate
Ta tạo class **TransitionDelegate** và áp dụng thực thi **UIViewControllerTransitioningDelegate**.
```
final class TransitionDelegate: NSObject, UIViewControllerTransitioningDelegate {
    
    func animationController(forPresented presented: UIViewController, presenting: UIViewController, source: UIViewController) -> UIViewControllerAnimatedTransitioning? {
        return FadeAnimationController(presenting: true)
    }
    
    func animationController(forDismissed dismissed: UIViewController) -> UIViewControllerAnimatedTransitioning? {
        return FadeAnimationController(presenting: false)
    }
}
```
Trong đó:
- **animationController(forPresented presented: )**: hàm trả về object thực thi animation transition khi present.
- **animationController(forDismissed dismissed: )**:  hàm trả về object thực thi animation transition khi dismiss.

## Bước 4: ViewController và ViewController2
Ta khởi tạo đối tượng **transitionDelegate** và gán delegate cho  2 viewController.

```
final class ViewController: UIViewController {
    
    let transitionDelegate = TransitionDelegate()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.transitioningDelegate = transitionDelegate
    }
    
    @IBAction func handleTapButton(_ sender: Any) {
        let vc = storyboard?.instantiateViewController(withIdentifier: "ViewController2") as! ViewController2
        vc.transitioningDelegate = transitionDelegate
        vc.modalPresentationStyle = .fullScreen
        present(vc, animated: true)
    }
}
```

```
final class ViewController2: UIViewController {

    var transitionDelegate: UIViewControllerTransitioningDelegate!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.transitioningDelegate = transitioningDelegate
    }
    
    @IBAction func handleDismissButton(_ sender: Any) {
        dismiss(animated: true)
    }
}
```

## Kết quả:
![](https://images.viblo.asia/f80fa14e-6c3a-42e7-8d57-88697d9f8344.gif)
## Tài liệu tham khảo:
https://itnext.io/learn-ios-custom-view-controller-animation-transition-once-for-all-9db80ad447e

https://www.raywenderlich.com/2925473-ios-animation-tutorial-custom-view-controller-presentation-transitions
## Link github:
https://github.com/oNguyenDucHuyB/CustomTransitionVC/tree/modalTransition