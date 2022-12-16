### Khởi tạo interactive:
Trong NavigationController, khai báo `interactionController` và `edgeSwipeGestureRecognizer`
```swift
private var interactionController: UIPercentDrivenInteractiveTransition?
private var edgeSwipeGestureRecognizer: UIScreenEdgePanGestureRecognizer?
```

### Config các Gesture trong `viewDidLoad()`
```swift
edgeSwipeGestureRecognizer = UIScreenEdgePanGestureRecognizer(target: self, action: #selector(handleSwipe(_:)))
edgeSwipeGestureRecognizer!.edges = .left
view.addGestureRecognizer(edgeSwipeGestureRecognizer!)
```

### Tạo hàm để hanle các gesture event
```swift
@objc func handleSwipe(_ gestureRecognizer: UIScreenEdgePanGestureRecognizer) {
    // 1
    let percent = gestureRecognizer.translation(in: gestureRecognizer.view!).x / gestureRecognizer.view!.bounds.size.width

    if gestureRecognizer.state == .began {
        // 2
        interactionController = UIPercentDrivenInteractiveTransition()
        popViewController(animated: true)
    } else if gestureRecognizer.state == .changed {
        // 3
        interactionController?.update(percent)
    } else if gestureRecognizer.state == .ended {
        // 4
        if percent > 0.2 && gestureRecognizer.state != .cancelled {
            interactionController?.finish()
        } else {
            interactionController?.cancel()
        }
        interactionController = nil
    }
}
```
// 1: Đầu tiên, tính toán khoảng cách mà người dùng đã vuốt.
// 2: Nếu cử chỉ mới bắt đầu, tạo `interactionController`, sau đó bắt đầu quá trình chuyển đổi bằng cách gọi `popViewController(animated:)`.
// 3: Bất cứ khi nào tiến trình thay đổi,  gọi `interactionController?.update(percent)`.
// 4: Khi  tác hoàn tất,  yêu cầu `interactionController` kết thúc quá trình chuyển đổi hoặc hủy nó, với các phương thức `finish()` và `cancel()` tương ứng. Cuối cùng, set `interactionController` trở lại nil. 

### Sử dụng `interactionController` trong delegate
```swift
func navigationController(_ navigationController: UINavigationController, interactionControllerFor animationController: UIViewControllerAnimatedTransitioning) -> UIViewControllerInteractiveTransitioning? {
    return interactionController
}
```