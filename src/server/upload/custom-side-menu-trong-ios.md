## Tạo `enum` để xác định hướng mà Menu sẽ được hiển thị:
```swift
enum SideMenuPresentationDirection {
    case left
    case top
    case right
    case bottom
}
```

## Tạo class custom Animation khi Menu được show:
```swift
final class SideMenuAnimator: NSObject {
    // MARK: - Properties
    let direction: SideMenuPresentationDirection
    let isPresentation: Bool
    let duration: TimeInterval
    
    // MARK: - Initializers
    init(direction: SideMenuPresentationDirection, isPresentation: Bool, duration: TimeInterval = 0.3) {
        self.direction = direction
        self.isPresentation = isPresentation
        self.duration = duration
        super.init()
    }
}

// MARK: - UIViewControllerAnimatedTransitioning
extension SideMenuAnimator: UIViewControllerAnimatedTransitioning {
    
    func transitionDuration(using transitionContext: UIViewControllerContextTransitioning?) -> TimeInterval {
        return duration
    }
    
    func animateTransition(using transitionContext: UIViewControllerContextTransitioning) {
        let key: UITransitionContextViewControllerKey = isPresentation ? .to : .from
        guard let controller = transitionContext.viewController(forKey: key) else { return }
        
        if isPresentation {
            transitionContext.containerView.addSubview(controller.view)
        }
        
        let presentedFrame = transitionContext.finalFrame(for: controller)
        var dismissedFrame = presentedFrame
        switch direction {
        case .left:
            dismissedFrame.origin.x = -presentedFrame.width
        case .right:
            dismissedFrame.origin.x = transitionContext.containerView.frame.size.width
        case .top:
            dismissedFrame.origin.y = -presentedFrame.height
        case .bottom:
            dismissedFrame.origin.y = transitionContext.containerView.frame.size.height
        }
        
        let initialFrame = isPresentation ? dismissedFrame : presentedFrame
        let finalFrame = isPresentation ? presentedFrame : dismissedFrame
        
        let animationDuration = transitionDuration(using: transitionContext)
        controller.view.frame = initialFrame
        UIView.animate(
            withDuration: animationDuration,
            animations: {
                controller.view.frame = finalFrame
            }, completion: { finished in
                if !self.isPresentation {
                    controller.view.removeFromSuperview()
                }
                transitionContext.completeTransition(finished)
            }
        )
    }
    
}
```

## Tạo conteiner dùng để present màn hình:
```swift
final class SideMenuPresentationViewController: UIPresentationController {
    // MARK: - Properties
    private var dimmingView: UIView!
    private let direction: SideMenuPresentationDirection
    
    override var frameOfPresentedViewInContainerView: CGRect {
        var frame: CGRect = .zero
        frame.size = size(forChildContentContainer: presentedViewController,
                          withParentContainerSize: containerView!.bounds.size)
        
        switch direction {
        case .right:
            frame.origin.x = containerView!.frame.width*(1.0/3.0)
        case .bottom:
            frame.origin.y = containerView!.frame.height*(1.0/3.0)
        default:
            frame.origin = .zero
        }
        return frame
    }
    
    // MARK: - Initializers
    init(presentedViewController: UIViewController,
         presenting presentingViewController: UIViewController?,
         direction: SideMenuPresentationDirection) {
        self.direction = direction
        super.init(presentedViewController: presentedViewController, presenting: presentingViewController)
        setupDimmingView()
    }
    
    override func presentationTransitionWillBegin() {
        guard let dimmingView = dimmingView else { return }
        
        containerView?.insertSubview(dimmingView, at: 0)
        
        dimmingView.snp.makeConstraints { maker in
            maker.top.bottom.leading.trailing.equalToSuperview()
        }
        
        guard let coordinator = presentedViewController.transitionCoordinator else {
            dimmingView.alpha = 1.0
            return
        }
        
        coordinator.animate(alongsideTransition: { _ in
            self.dimmingView.alpha = 1.0
        })
    }
    
    override func dismissalTransitionWillBegin() {
        guard let coordinator = presentedViewController.transitionCoordinator else {
            dimmingView.alpha = 0.0
            return
        }
        
        coordinator.animate(alongsideTransition: { _ in
            self.dimmingView.alpha = 0.0
        })
    }
    
    override func containerViewWillLayoutSubviews() {
        presentedView?.frame = frameOfPresentedViewInContainerView
    }
    
    override func size(forChildContentContainer container: UIContentContainer,
                       withParentContainerSize parentSize: CGSize) -> CGSize {
        switch direction {
        case .left, .right:
            return CGSize(width: parentSize.width * (2.0 / 3.0), height: parentSize.height)
        case .bottom, .top:
            return CGSize(width: parentSize.width, height: parentSize.height * (2.0 / 3.0))
        }
    }
}

// MARK: - Private
private extension SideMenuPresentationViewController {
    
    func setupDimmingView() {
        let recognizer = UITapGestureRecognizer(target: self, action: #selector(handleTap(recognizer:)))
        dimmingView = UIView().then {
            $0.translatesAutoresizingMaskIntoConstraints = false
            $0.backgroundColor = UIColor(white: 0.0, alpha: 0.5)
            $0.alpha = 0.0
            $0.addGestureRecognizer(recognizer)
        }
    }
    
    @objc func handleTap(recognizer: UITapGestureRecognizer) {
        presentingViewController.dismiss(animated: true)
    }
}
```

## Tạo Side Menu manager để quản lý delegate presenting:
```swift
final class SideMenuPresentationManager: NSObject {
    // MARK: - Properties
    var direction: SideMenuPresentationDirection = .left
}

// MARK: - UIViewControllerTransitioningDelegate
extension SideMenuPresentationManager: UIViewControllerTransitioningDelegate {
    
    func presentationController(forPresented presented: UIViewController,
                                presenting: UIViewController?,
                                source: UIViewController) -> UIPresentationController? {
        let presentationController = SideMenuPresentationViewController(presentedViewController: presented,
                                                                        presenting: presenting,
                                                                        direction: direction)
        presentationController.delegate = self
        return presentationController
    }
    
    func animationController(forPresented presented: UIViewController,
                             presenting: UIViewController,
                             source: UIViewController) -> UIViewControllerAnimatedTransitioning? {
        return SideMenuAnimator(direction: direction, isPresentation: true)
    }
    
    func animationController(forDismissed dismissed: UIViewController) -> UIViewControllerAnimatedTransitioning? {
        return SideMenuAnimator(direction: direction, isPresentation: false)
    }
}
```

## Present màn hình Menu:
```swift
var sideMenuPresentationManager = SideMenuPresentationManager()
let viewController = UIViewController()
viewController.modalPresentationStyle = .custom 
viewController.transitioningDelegate = sideMenuPresentationManager
navigationController.present(viewController, animated: true, completion: nil)
```