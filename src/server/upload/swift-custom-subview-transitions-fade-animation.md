## Môi trường phát triển:
- **Swift Language Version:** Swift 5.0
- **Xcode:** Version 11.1
- **Deployment Target:** 11.2

## Ý tưởng:
Bài viết hôm nay mình sẽ chia sẻ về cách sử dụng custom transition animation đối với các subviews (hay còn gọi là các view con). Ta sẽ sử dụng container view cho animations để tránh những lỗi có khả năng xảy ra khi ta animating các subviews và mainview đồng thời.
1. Tạo snapshots của subviews thuộc "from" view và sau đó ẩn subviews đó.
2. Tạo snapshots của subviews thuộc "to" view và sau đó ẩn subviews đó.
3. Convert tất cả các frame's values sang tọa độ của container view và add tất cả snapshots vào container view.
4. Start những "to" snapshots với giá trị alpha = 0 (fade in)
5. Animate những thay đổi của "to" snapshots từ alpha = 0 đến 1.
6. Đồng thời animate những "from" snapshot đến vị trị cuối cùng của "to" view và animate giá trị alpha của chúng từ 1 đến 0 (fade out). Kết hợp với bước 4 để tạo nên hiệu ứng cross dissolve.
7. Khi tất cả các bước trên đã thực hiện, remove tất cả snapshots và unhide các subviews mà snapshots của chúng đã animated.

![](https://images.viblo.asia/421bee9d-7c25-4ac5-97bc-d92ad3d603f0.gif)


## Bước 1: Khởi tạo màn hình
![](https://images.viblo.asia/7d8f2986-a90e-4adc-b029-f97e68872413.png)

## Bước 2: Khởi tạo protocols
```
protocol CustomTransitionOriginator {
    var fromAnimatedSubviews: [UIView] { get }
}

protocol CustomTransitionDestination {
    var toAnimatedSubviews: [UIView] { get }
}
```

- **fromAnimatedSubviews**: chứa các subviews thuộc "from" view được animated.
- **toAnimatedSubviews**: chứa các subviews thuộc "to" view được animated.
## Bước 3: Extension UIView
```
extension UIView {
    func zo_snapshot() -> UIImage? {
        UIGraphicsBeginImageContextWithOptions(bounds.size, isOpaque, UIScreen.main.scale)
        let context = UIGraphicsGetCurrentContext()
        if let context = context {
            layer.render(in: context)
        }
        let snapshot = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        return snapshot
    }
    
    func snapshotView() -> UIView? {
        if let snapshotImage = zo_snapshot() {
            return UIImageView(image: snapshotImage)
        } else {
            return nil
        }
    }
}
```

- Hàm **zo_snapshot()** trả về snapshot kiểu UIImage.
- Hàm **snapshotView()** trả về snapshotView kiểu UIView.

## Bước 4: Subviews animation transition

UIKit cho phép tuỳ chỉnh view controller's presentation thông qua **UIViewControllerAnimatedTransitioning** delegate với hai function chính:
- **transitionDuration(using: ):** Hàm lấy thông tin về thời gian diễn ra transition animations. Giá trị trả về phải giống với giá trị bạn sử dụng để config animations trong hàm **animateTransition(using: )**. 
- **animateTransition(using: ):** Hàm cho phép config transition animations và được gọi khi presenting hoặc dismissing view controller.

```
class SubviewAnimationController: NSObject, UIViewControllerAnimatedTransitioning {
    enum TransitionType {
        case present
        case dismiss
    }
    
    let type: TransitionType
    
    init(type: TransitionType) {
        self.type = type
        super.init()
    }
    
    func transitionDuration(using transitionContext: UIViewControllerContextTransitioning?) -> TimeInterval {
        return 1.0
    }
    
    func animateTransition(using transitionContext: UIViewControllerContextTransitioning) {
        let fromVC = transitionContext.viewController(forKey: .from) as! CustomTransitionOriginator & UIViewController
        let toVC = transitionContext.viewController(forKey: .to) as! CustomTransitionDestination & UIViewController
        
        let container = transitionContext.containerView
        
        // add the "to" view to the hierarchy
        if type == .present {
            container.addSubview(toVC.view)
        } else {
            container.insertSubview(toVC.view, belowSubview: fromVC.view)
        }
        toVC.view.layoutIfNeeded()
        
        // Create snapshots of label being animated
        let fromSnapshots = fromVC.fromAnimatedSubviews.map { subview -> UIView in
            // Create snapshot
            let snapshot = subview.snapshotView(afterScreenUpdates: false)!
            
            // We're putting it in container, so convert original frame into container's coordinate space
            snapshot.frame = container.convert(subview.frame, from: subview.superview)
            
            return snapshot
        }
        
        let toSnapshots = toVC.toAnimatedSubviews.map { subview -> UIView in
            // Create snapshot
            let snapshot = subview.snapshotView()!
            
            // we're putting it in container, so convert original frame into container's coordinate space
            snapshot.frame = container.convert(subview.frame, from: subview.superview)
            
            return snapshot
        }
        
        // save the "to" and "from" frames
        let frames = zip(fromSnapshots, toSnapshots).map { ($0.frame, $1.frame) }
        
        // move the "to" snapshots to where where the "from" views were, but hide them for now
        zip(toSnapshots, frames).forEach { snapshot, frame in
            snapshot.frame = frame.0
            snapshot.alpha = 0
            container.addSubview(snapshot)
        }
        
        // add "from" snapshots, too, but hide the subviews that we just snapshotted
        // associated textfield so we only see animated snapshots; we'll unhide these
        // original views when the animation is done.
        fromSnapshots.forEach { container.addSubview($0) }
        fromVC.fromAnimatedSubviews.forEach { $0.alpha = 0 }
        toVC.toAnimatedSubviews.forEach { $0.alpha = 0 }
        
        // I'm going to push the the main view from the right and dim the "from" view a bit,
        // but you'll obviously do whatever you want for the main view, if anything
        if type == .present {
            toVC.view.transform = .init(translationX: toVC.view.frame.width, y: 0)
        } else {
            toVC.view.alpha = 0.5
        }
        
        // do the animation
        UIView.animate(withDuration: transitionDuration(using: transitionContext), animations: {
            // animate the snapshots of the textfield
            zip(toSnapshots, frames).forEach { snapshot, frame in
                snapshot.frame = frame.1
                snapshot.alpha = 1
            }
            
            zip(fromSnapshots, frames).forEach { snapshot, frame in
                snapshot.frame = frame.1
                snapshot.alpha = 0
            }
            
            // I'm now animating the "to" view into place, but you'd do whatever you want here
            if self.type == .present {
                toVC.view.transform = .identity
                fromVC.view.alpha = 0.5
            } else {
                fromVC.view.transform = .init(translationX: fromVC.view.frame.width, y: 0)
                toVC.view.alpha = 1
            }
        }, completion: { _ in
            // get rid of snapshots and re-show the original labels
            fromSnapshots.forEach { $0.removeFromSuperview() }
            toSnapshots.forEach   { $0.removeFromSuperview() }
            fromVC.fromAnimatedSubviews.forEach { $0.alpha = 1 }
            toVC.toAnimatedSubviews.forEach { $0.alpha = 1 }
            
            // clean up "to" and "from" views as necessary, in my case, just restore "from" view's alpha
            fromVC.view.alpha = 1
            fromVC.view.transform = .identity

            // complete the transition
            transitionContext.completeTransition(!transitionContext.transitionWasCancelled)
        })
    }
}
```

Trong đó:
- **fromView**: là view xuất hiện ở phần mở đầu của transition, hoặc ở phần kết thúc của canceled transition. Ví dụ khi presenting thì fromView là view của viewController1, còn khi dismissing thì fromView là view của viewController2.
- **toView**: là view xuát hiện ở phần kết thúc của completed transition.
- **container**: hoạt động như một superview chứa các views tham gia vào transition.
- **TransitionType**: enum thể hiện các kiểu transitions.
- **completeTransition()**: Hàm thông báo cho system rằng transition animation đã hoàn thành.
## Bước 5: Custom navigation controller
```
class CustomNavigationController: UINavigationControllerDelegate {
    func navigationController(_ navigationController: UINavigationController, animationControllerFor operation: UINavigationControllerOperation, from fromVC: UIViewController, to toVC: UIViewController) -> UIViewControllerAnimatedTransitioning? {

        if operation == .push {
            return SubviewAnimationController(type: .present)
        } else {
            return SubviewAnimationController(type: .dismiss)
        }
    }
}
```
- Hàm **navigationController(_ navigationController: UINavigationController, animationControllerFor operation: UINavigationControllerOperation, from fromVC: UIViewController, to toVC: UIViewController)** sẽ trả về đúng view controller's presentation ở trường hợp push hoặc dismiss.
## Bước 6: MainViewController và DetailViewController
```
final class ViewController: UIViewController {
    @IBOutlet weak var textField1: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    @IBAction func handleTapButton(_ sender: Any) {
        let vc = storyboard?.instantiateViewController(withIdentifier: "DetailViewController") as! DetailViewController
        navigationController?.pushViewController(vc, animated: true)
    }
}

extension ViewController: CustomTransitionOriginator {
    var fromAnimatedSubviews: [UIView] { return [textField1] }
}

extension ViewController: CustomTransitionDestination {
    var toAnimatedSubviews: [UIView] { return [textField1] }
}
```

```
final class DetailViewController: UIViewController {

    @IBOutlet weak var textField2: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
}

extension DetailViewController: CustomTransitionDestination {
    var toAnimatedSubviews: [UIView] { return [textField2] }
}

extension DetailViewController: CustomTransitionOriginator {
    var fromAnimatedSubviews: [UIView] { return [textField2] }
}
```

Hai viewController áp dụng thực thi **CustomTransitionOriginator** và **CustomTransitionDestination** để chọn ra những subviews được animated khi custom transition được thực thi.
## Kết quả
![](https://images.viblo.asia/9bb5be25-a345-45ce-92f4-e7431ec0dcaf.gif)


## Tài liệu tham khảo
https://stackoverflow.com/questions/46596481/view-controller-transition-animate-subview-position

## Link github
https://github.com/oNguyenDucHuyB/CustomTransitionVC/tree/navigationTransition