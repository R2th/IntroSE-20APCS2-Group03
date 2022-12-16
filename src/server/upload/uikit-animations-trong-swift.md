Bài viết trước của tôi có tiêu đề [Animation cơ bản trong Swift ](https://viblo.asia/p/animations-co-ban-trong-swift-jvElaEDAlkw) có nói về những cách xử lý với animation cơ bản trong Swift , hôm nay chúng ta sẽ tiếp tục tìm hiểu thêm một số thuộc tính mới của animations.

Khi update bản cập nhật SwiftSwift4 / IOS 11 chúng ta có thêm hai thuộc tính mới cho animators (UIViewPropertyAnimator) : ***Scrubs LinearLinearly***  và ***Pauses On Completion*.**


-----


# Scrubs Linear

Hãy tưởng tượng rằng bạn đang xây dựng một animations tương tác, do đó người dùng có thể tương tác với view bằng công cụ nhận dạng cử chỉ.

Ví dụ như đoạn mã dưới đây:


```
var animator: UIViewPropertyAnimator!
 
func handlePan(recognizer: UIPanGestureRecognizer) {
   switch recognizer.state {
   case .began:
      animator = UIViewPropertyAnimator(duration: 1.0, curve: .easeInOut)         
         myView.frame = myView.frame.offsetBy(dx: 300, dy: 0)
      }) 
      animator.pauseAnimation()
   case .changed:
      let translation = recognizer.translation(in: myView)
      animator.fractionComplete = translation.x / 300
   case .ended:
      animator.continueAnimation(withTimingParameters: nil, durationFactor: 0)
   default:
      break
   }
}
```

Khi animation  bị gián đoạn, mặc định nó chuyển tiếp sang một đường cong tuyến tính. Để cải thiện phản ứng của animation khi được sửa đổi tương tác và để làm cho quá trình chuyển đổi mượt hơn khi animation tiếp tục (ví dụ: khi bộ nhận dạng cử chỉ kết thúc sự tương tác).

Sau đó, khi animation tiếp tục, the animator restores sẽ khôi phục đường cong ban đầu. Ngoài ra, cả hai còn lại thời gian và animation progres được tính lại.

Điều mới so với các phiên bản cũ , nếu bạn thiết lập  thuộc tính của **scrubLinearly** thành ***false*** , bạn sẽ vô hiệu quá trình chuyển tiếp đường cong này. Do đó, animation sẽ vẫn hoạt động với đường cong ban đầu hoặc hành động spring trong quá trình tương tác. Kết quả là, chúng ta có thể đạt được một số hiệu ứng thú vị.



![](https://images.viblo.asia/fc9de9ce-0f4e-45c5-a276-e2938c8308c6.png)

Ngoài ra, điều quan trọng cần chú ý là bạn luôn có thể chỉ định một đường cong mới khi animation trở lại sau khi tương tác kết thúc. Do đó, có nhiều lựa chọn và hiệu ứng mà bạn có thể khám phá khi xây dựng animation của bạn.

```
case .ended:
  let timingParameters = UISpringTimingParameters(dampingRatio: 0.8) 
  animator.continueAnimation(withTimingParameters: nil, durationFactor: 0) 
```



-----


# **Pauses On Completion**
Quan trọng không kém là thuộc tính mới **pausesOnCompletion**. Theo mặc định, khi animation hoàn tất, nó chuyển sang trạng thái không hoạt động. Do đó, bạn không còn có thể sửa đổi hoặc tương tác với các hình ảnh động.

Tuy nhiên, bây giờ nếu bạn đặt thuộc tính **pausesOnCompletion** thành ***true***, anianimation sẽ vẫn tạm dừng nhưng trên trạng thái hoạt động. Kết quả là, bạn sẽ có thể thực hiện các hoạt động về hình ảnh động như đảo chiều hoặc điều chỉnh nó và kích hoạt nó một lần nữa.

![](https://images.viblo.asia/9a6bf9b0-7148-4660-9f35-9e8f168fb558.png)

Tuy nhiên, có một caveat bạn phải được nhận thức. Theo kết quả của hoạt hình đang hoạt động, nếu bạn đặt **pausesOnCompletion** thành ***true***, trình xử lý hoàn thành animation sẽ không được gọi nữa. Thay vào đó, bạn vẫn có thể được thông báo về trạng thái của hình ảnh động bằng cách quan sát đường dẫn chạy của animator.

```
animator.addObserver(self, forKeyPath: "running", options: [.new], context: nil)
```



-----



# Animations In Swift 4 / IOS 11 Start As Paused

Trước đây, khi bạn khởi tạo một **UIViewPropertyAnimator**, bạn cần xác định các ***animation*** ban đầu của nó. Bây giờ, bạn có thể bắt đầu nó mà không có bất kỳ animation, và sau đó sử dụng một khối để thêm tất cả các animation cùng một lúc, do đó tất cả chúng chạy ngay lập tức. Ngoài ra, bạn có thể thêm animation bất cứ lúc nào. Do đó, thay vì phải escaping, chúng sẽ run ngay lập tức.



```
let animator = UIViewPropertyAnimator(duration: 2, curve: .easeInOut)
animator.startAnimation()
 
// do some stuff here
 
animator.addAnimations {
   // will run immediately
   myView.frame = myView.frame.offsetBy(dx: 200, dy: 0)
}
```


-----


# Animatable Corner Radius And Partial Corners

Chắc chắn một trong những thay đổi thú vị nhất cho animation, theo ý kiến của tôi, đã xảy ra corner radius thuộc tính của CALayer. Như bạn biết, thuộc tính này cho phép chúng ta xác định bán kính góc của một view (cụ thể là về layer của nó), và được sử dụng rộng rãi để tạo hình tròn.

Bây giờ, đối với các animations trong Swift 4, thuộc tính này hoàn toàn có thể fully animatable. Đây là một điểm cộng lớn để kích hoạt kích thước của chế độ xem vòng tròn trong khi vẫn giữ nguyên hình tròn.


```
circleView.clipsToBounds = true
UIViewPropertyAnimator(duration: 1, curve: .easeIn) {
   circleView.frame = newFrameValue
   circleView.layer.cornerRadius = newCornerRadiusValue
}.startAnimation()
```

Bạn có thể làm điều này nhờ các thuộc tính mới **maskedCorners** của ***CALayers***, loại ***CACornerMask***.


-----



# Cuối cùng

Bài viết được dịch theo [chia sẻ](https://digitalleaves.com/blog/2017/07/whats-new-animations-swift-4/) của tác giả Ignacio Nieto Carvajal.
Hy vọng bài viết sẽ giúp bạn tìm hiểu và sử dụng về animation dễ dàng hơn.

Bạn có thể tham khảo sample code[ tại đây](https://github.com/DigitalLeaves/AdvancedUIKitAnimationsInSwift).