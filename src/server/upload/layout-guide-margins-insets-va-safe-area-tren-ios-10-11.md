![](https://cdn-images-1.medium.com/max/1600/1*f112yGqf0IYoEUIMnVrKHQ.png)



iOS11 mang đến nhiều cải tiến hơn về việc sắp xếp bố cục user interfaces. Nó có thể làm bạn hơi bối rối một chút, và chúng ta cần làm sáng tỏ hơn về **margins**, **insets**, **scroll views** và **Safe Area**.

# Margins

## layoutMargins property

Apple đã giới thiệu margin trên iOS8 và đã cho phép sử dụng [layoutMargins](https://developer.apple.com/documentation/uikit/uiview/1622566-layoutmargins) property trên UIView.
SỬ dụng [layoutMargins](https://developer.apple.com/documentation/uikit/uiview/1622566-layoutmargins) bạn có thể dàng buộc tất cả content của phần layout tuân thủ các việc căn lề (margin).

```
@available(iOS 8.0, *)
open var layoutMargins: UIEdgeInsets
```

Trước iOS11, có một tính năng liên quan đến rootview của viewcontrollers. Các giá trị margin được tuỳ chỉnh phù hợp cho các subviews, nhưng hệ thống(iOS) thực thi các margin của rootview viewcontroller dựa trên size class(16pt với compact và 20pt với regular).

Đoạn code sau sẽ k có tác dụng với iOS < 11. Nhưng với iOS > 11, lề trái và phải sẽ có tác dụng

```
self.view.layoutMargins = UIEdgeInsets(top: self.view.layoutMargins.top,
                                       left: 64,
                                       bottom: self.view.layoutMargins.bottom,
                                       right: 64)
```

![](https://cdn-images-1.medium.com/max/1600/1*DH-OFV70MHoGxTdNNbEMxQ.png)


## directionalLayoutMargins property
[layoutMargins](https://developer.apple.com/documentation/uikit/uiview/1622566-layoutmargins) không được dùng trên iOS11 nữa, mà được thay thế bằng [directionalLayoutMargins](https://developer.apple.com/documentation/uikit/uiview/2865930-directionallayoutmargins) trên UIView.

```
self.view.directionalLayoutMargins = NSDirectionalEdgeInsets(top: self.view.directionalLayoutMargins.top,
                                                             leading: 16,
                                                             bottom: self.view.directionalLayoutMargins.bottom,
                                                             trailing: 64)
```

Có thể bạn không thể sử dụng layoutMargins trên iOS11, nhưng directionalLayoutMargins mạnh hơn và có thể giúp bạn sử dụng margin trên layout nhiều hơn trước.

![](https://cdn-images-1.medium.com/max/1600/1*K5m70jlN-QJQ8IvdJEKHSQ.png)

## Margins did change

Nếu bạn muốn thay đổi margin cụ thể, có thể nhận được thông báo rằng: Margin của UIView đã được thay đổi

```
override func layoutMarginsDidChange() {
 super.layoutMarginsDidChange()
 
 if #available(iOS 11.0, *) {
   log.debug(“\(self.contentView.directionalLayoutMargins)”)
 } else {
   log.debug(“\(self.contentView.layoutMargins)”)
 }
}
```

```
@available(iOS 11.0, *)
override func viewLayoutMarginsDidChange() {
 super.viewLayoutMarginsDidChange()
 
 log.debug(“\(self.view.directionalLayoutMargins)”)
}
```

## System minimum layout margins

Trong trường hợp margin bé hơn quy định tối thiểu của hệ thống, điều quan trọng là cần quan tâm đến [viewRespectsSystemMinimumLayoutMargins](https://developer.apple.com/documentation/uikit/uiviewcontroller/2891115-viewrespectssystemminimumlayoutm) trên UIViewControllers phải ghi đè lên các giá trị mininum này.

```
self.viewRespectsSystemMinimumLayoutMargins = false
self.view.directionalLayoutMargins = NSDirectionalEdgeInsets(top: self.view.directionalLayoutMargins.top,
                                                             leading: 0,
                                                             bottom: self.view.directionalLayoutMargins.bottom,
                                                             trailing: 8)
```

Mininum margin của hệ thống được kỳ vọng áp dụng trên rootview của view controllers có thể quyết định bằng [systemMinimumLayoutMargins](https://developer.apple.com/documentation/uikit/uiviewcontroller/2865908-systemminimumlayoutmargins) trên UIViewControllers.

## Reminder

autolayout constraints tác động đến margin thông qua [layoutMarginsGuide](https://developer.apple.com/documentation/uikit/uiview/1622651-layoutmarginsguide) và [preservesSuperviewLayoutMargins](https://developer.apple.com/documentation/uikit/uiview/1622653-preservessuperviewlayoutmargins). Các property này có sãn trên Interface Builder

![](https://cdn-images-1.medium.com/max/1600/1*IxU4Xtg8ahAn0KJa_gHcPA.png)

**Note:** Việc tính tán margin trên iOS dựa trên các giá trị layout margins, nhưng cũng trên insetsLayoutMarginsFromSafeArea và bảo toànSuperviewLayoutMargins trên UIView (theo mặc định).

# Safe Area

## A deprecated layout guide

Apple giới thiệu trong các phiên bản trước đó topLayoutGuide và bottomLayoutGuide trên UIViewController. Có thể với các hướng dẫn layout này để xác định các ràng buộc về nội dung, tránh các navigation elements trên cùng hoặc dưới cùng ẩn đi (UIKit bars, status bar, nav or tab bar…).

Với layout và margin, có thể xác định layout content vào một khu vực:

![](https://cdn-images-1.medium.com/max/1600/1*9CZDycaU1Si56fUAPY64mA.png)

Các thuộc tính UILayoutGuide này có sẵn từ Interface Builder :

![](https://cdn-images-1.medium.com/max/1600/1*x8rRWVHdhT0aD9QUpICRyg.png)

## A new layout guide called safeAreaLayoutGuide

Các layout guides phía trên và dưới không được dùng trên iOS11 nữa, và được thay thể bằng một khu vực layout duy nhất được gọi là **Safe Area**, phân định việc hiện thị.
Giờ đây sẽ dễ dàng xác định được khu vực hiện thị thay vì nhiều thành phần như trước.

Với Safe Area, chúng ta có nhiều quyền kiểm soát nội dung hơn(topAnchor, bottomAnchor, leadingAnchor, trailingAnchor, width, height hoặc center anchors). Điều này rất hữu ích.

![](https://cdn-images-1.medium.com/max/1600/1*Ng6gb6RnGW9p0r0Vblr6FA.png)

Với từng UIView, chúng ta có Safe Area cho chính nó, và được thể hiện trên **Interface Builder**:
![](https://cdn-images-1.medium.com/max/1600/1*NTwxFMDUc2kQzJ8FrAJBUw.png)