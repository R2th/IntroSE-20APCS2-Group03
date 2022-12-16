## Môi trường phát triển
- **Swift Language Version:** Swift 5
- **Xcode:** Version 11.6
- **Deployment Target:** 12.0

## Bước 1: Khởi tạo extension của UITabBarController
Trước hết, ta sẽ tạo một extension của **UITabBarController** cho việc ẩn hiện tab bar.

```
let kAnimationDuration = 0.3

extension UITabBarController {
    func setTabBar(hidden: Bool, animated: Bool) {
        let animationDuration = animated ? kAnimationDuration : 0
        UIView.animate(withDuration: animationDuration, animations: {
            var frame = self.tabBar.frame
            frame.origin.y = self.view.frame.height
            if !hidden {
                frame.origin.y -= frame.height
            } else {
                let backgroundImageSize = self.tabBar.backgroundImage?.size ?? CGSize.zero
                let heightDiff: CGFloat = backgroundImageSize.height - frame.height
                // If background image size is large, tabBar top seem.
                if heightDiff > 0 {
                    frame.origin.y += heightDiff
                }
            }
            self.tabBar.frame = frame
        }, completion:nil)
    }
}
```

**Trong đó:**
- **kAnimationDuration**: Tổng thời lượng của các animation, được tính bằng giây.
- Hàm **setTabBar(hidden: Bool, animated: Bool)**: setting việc ẩn hiện tab bar với hai thuộc tính là hidden (ẩn hiện tab bar) và animated (sử dụng animation hay không).

**Ý tưởng:**

Đầu tiên ta sẽ setting giá trị toạ độ Y ban đầu của tab bar (frame.origin.y = self.view.frame.height), khi đó tab bar sẽ nằm ở dưới màn hình hiển thị. Trường hợp hidden = false, ta sẽ cho hiển thị tab bar bằng cách thay đổi giá trị toạ độ Y của tab bar (frame.origin.y -= self.tabBar.frame.height). Ngược lại trong trường hợp hidden = true, ta sẽ ẩn tab bar đi bằng cách:
- Trường hợp tab bar không có background image: Giữ nguyên giá trị toạ độ Y ban đầu của tab bar đã được set trước đó (frame.origin.y = self.view.frame.height).
- Trường hợp tab bar có background image: Tính giá trị chiều cao chênh lệch giữa background image và tab bar frame, nếu giá trị đó lớn hơn 0 => background image lớn hơn tab bar frame => tăng gíá trị toạ độ Y của tab bar.

## Bước 2: Thực thi ẩn hiện tab bar dựa vào cơ chế scrolling của table view
Ta tạo một **Tab Bar Controller** với hai tab con là hai view controller, trong đó tab đầu tiên là **HomeViewController**. Trong **HomeViewController**, ta sẽ tạo một table view để thực hiện việc ẩn hiện tab bar khi scroll table view đó.

```
private var startContentOffset: CGFloat!
private var lastContentOffset: CGFloat!
private var isHidingTabBar: Bool = false
```
Một số thuộc tính cần khai báo:
- **startContentOffset**: Giá trị [contentOffset](https://viblo.asia/p/swift-contentoffset-contentinset-and-contentsize-in-ui-scrollview-Qbq5Q0nElD8) của tableView tại thời điểm bắt đầu scrolling.
- **lastContentOffset**: Giá trị [contentOffset](https://viblo.asia/p/swift-contentoffset-contentinset-and-contentsize-in-ui-scrollview-Qbq5Q0nElD8) của tableView tại thời điểm cuối cùng khi kết thúc scrolling.
- **isHidingTabBar**: Thuộc tính kiểu Bool để xác định trạng thái hiện tại của tab bar (đang hiển thị hay đang ẩn đi).

Ta khởi tạo hai hàm **hideTabBarIfNeeded()** và **showTabBarIfNeeded()** để thực hiện việc ẩn hiện tab bar.
```
func hideTabBarIfNeeded() {
    guard !self.isHidingTabBar else { return }
    self.isHidingTabBar = true
    self.tabBarController?.setTabBar(hidden: true, animated: true)
}

func showTabBarIfNeeded() {
    guard self.isHidingTabBar else { return }
    self.isHidingTabBar = false
    self.tabBarController?.setTabBar(hidden: false, animated: true)
}
```

Tiếp theo, ta sẽ tạo mối liên hệ giữa quá trình ẩn hiện tab bar và quá trính scrolling của người dùng.
- **scrollViewWillBeginDragging()**: Thông báo khi nào table view bắt đầu scrolling content.
- **scrollViewDidScroll()**: Thông báo khi người dùng đang thực hiện scroll content.
- **scrollViewShouldScrollToTop()**: cho phép table view quay về đầu trang content (scroll-to-top) khi tap vào status bar.
- **isTracking:** Trả về true nếu người dùng đang chạm vào content view nhưng có thể chưa bắt đầu scrolling.
```
extension HomeViewController: UITableViewDelegate {
    func scrollViewWillBeginDragging(_ scrollView: UIScrollView) {
        let contentOffsetY = scrollView.contentOffset.y
        self.startContentOffset = contentOffsetY
        self.lastContentOffset = contentOffsetY
    }
    
    func scrollViewDidScroll(_ scrollView: UIScrollView) {
        let currentOffset = scrollView.contentOffset.y
        let differentFromStart = self.startContentOffset - currentOffset
        let differentFromLast = self.lastContentOffset - currentOffset
        self.lastContentOffset = currentOffset
        if (differentFromStart < 0) {
            if (scrollView.isTracking && abs(differentFromLast) > 1) {
                self.hideTabBarIfNeeded()
            }
        } else {
            if (scrollView.isTracking && (abs(differentFromLast) > 1)) {
                self.showTabBarIfNeeded()
            }
        }
    }
    
    func scrollViewShouldScrollToTop(_ scrollView: UIScrollView) -> Bool {
        self.showTabBarIfNeeded()
        return true
    }
}
```

- Trong hàm **scrollViewWillBeginDragging()**, ta setting giá trị cho **startContentOffset** và **lastContentOffset** = giá trị **contentOffset** của tableView ở thời điểm bắt đầu scrolling.
- Khi chạy đến hàm **scrollViewDidScroll()**,  ta tính khoảng cách chênh lệch (**differentFromStart**) giữa  vị trí của content ban đầu (startContentOffset) và vị trí của content hiện tại (currentOffset). Nếu **differentFromStart** < 0 thì có nghĩa là người dùng đang scroll xuống, ngược lại khi **differentFromStart** > 0 thì người dùng đang scroll lên.
- **differentFromLast** là khoảng cách chênh lệch giữa hai lần scroll gần nhất của người dùng, nếu giá trị tuyệt đối của **differentFromLast** > 1, nghĩa là khoảng cách scroll của người dùng đủ lớn đến một mức nào đó thì sẽ thực hiện việc ẩn hiện tab bar tương ứng.
## Kết quả:

![alt](https://media.giphy.com/media/ABYBfe16LO8MKzgIjl/giphy.gif)

## Link github:
https://github.com/ndhuy96/SwiftTips/tree/hiddenTabBar