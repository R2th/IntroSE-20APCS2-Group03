# 1. Spring Animations

Spring Animations mô tả chuyển động co dãn như chuyển động của con lắc lò xo. Vật  được chuyển động tới vị trí mới và lắc nhẹ trước khi đặt vào vị trí.

![](https://images.viblo.asia/32b6c911-3d69-4336-9ab1-d4ca632bfae4.gif)

Ví dụ : 
```
UIView.animate(withDuration: 0.5, delay: 0.5, usingSpringWithDamping: 0.5, initialSpringVelocity: 0, options: .curveEaseInOut, animations: {
            if self.labelPositionisLeft {
                self.Label.center.x = self.view.bounds.width - 100
            }
            else {
                self.Label.center.x = 100
            }
            self.labelPositionisLeft = !(self.labelPositionisLeft)
        }, completion: nil)
```

Method: animate(withDuration:delay:usingSpringWithDamping:initialSpringVelocity:options:animations:completion:)

với parameter:  
 - withDuration: Tổng thời gian của animation (tính bằng giây)
 - delay: Lượng thời gian delay để bắt đầu start animation.
 - usingSpringWithDamping:  Tỉ lệ  vật dạo động  có giá trị từ 0 đến 1. ( Nếu giá trị càng thấp thì vật sẽ dao động càng nhanh và ngược lại).
 - initialSpringVelocity: Vận tốc của vật chuyển động.
 
#  2. Keyframe Animations
- Keyframe Animation: giúp nhóm các giai đoạn animation khác nhau vào thành 1 nhóm và có thể dùng chung một số thuộc tính mà vẫn kiểm soát các giai đoạn này 1 cách riêng biệt.

Để sử dụng Keyframe animations thì chúng ta chỉ cần dùng 2 method sau:

```
UIView.animateKeyframes(withDuration:delay:options:animations:completion:)
UIView.addKeyframe(withRelativeStartTime:relativeDuration:animations:)
```
method  UIView.animateKeyframesWithDuration sẽ chứa list các frame  UIView.addKeyframeWithRelativeStartTime (list các giai đoạn animation khác nhau).

```
UIView.animateKeyframes(withDuration:delay:options:animations:completion:)
Có các parameter: 
- withDuration: thời lượng của ảnh động nếu bạn đặt là 0 hoặc là số âm thì không có animation.
- delay: Độ delay trước khi bắt đầu
- options: Các tuỳ chọn của chế độ animation , chi tiết thì bạn có thể vào UIView.KeyframeAnimationOptions để xem các chế độ animation của nó ví dụ như: autoreverse, repeart, calculationModeCubic ...
- animations: là một khối block chứa list các method UIView.addKeyframeWithRelativeStartTime(_:, relativeDuration:) giúp bạn thay đổi animation.

```

```
UIView.addKeyframe(withRelativeStartTime:relativeDuration:animations:)
Các parameter: 
- withRelativeStartTime: Thời gian để start animation, parameter này có giá trị từ 0 đến 1. Trong đó 0 đại diện cho sự băt đầu của list các giai đoạn animation, còn 1 đại diện cho sự kết thức của các list giai đoạn
animation.
Ví dụ nếu vật có thời gian hiệu ứng động là 3s mà value của withRelativeStartTime là 0.4 thì có nghĩa tại phút  thứ 1,2s thì animation của method UIView.addKeyframe sẽ bắt đầu.
- relativeDuration: Khoảng thời gian show animation của 1 giai đoạn  trong 1 list các giai đoạn animation. parameter nhận giá trị từ 0 đến 1.
Nếu duration của list giai đoạn aniamtion là 2 và relativeDuration là 0.5 thì khoảng thời gian show animation của giai đoạn này là 1s.
```

Ví dụ :

```
UIView.animateKeyframes(withDuration: 10.0,
                                delay: 0,
                                options: [],
                                animations: {
                                    
                                    UIView.addKeyframe(withRelativeStartTime: 0.0,
                                                       relativeDuration: 0.125,
                                                       animations: {
                                                        
                                                        self.blueView.frame.size.width -= 80
                                                        self.blueView.frame.size.height -= 80
                                                        self.blueView.center.x -= 60
                                    })
                                    
                                    UIView.addKeyframe(withRelativeStartTime: 0.125,
                                                       relativeDuration: 0.25,
                                                       animations: {
                                                        
                                                        self.blueView.center.y -= 120
                                    })
                                    
                                   
        },
                                completion: nil)
```
![](https://images.viblo.asia/e2ccb089-5f6f-4731-8122-2ef4181a0517.gif)

# 3. View Transitions
View Transitions: được dùng khi bạn muốn thêm một view vào view hierarchy (hệ thống phân cấp chế độ xem ) hoặc xoá một view ra khỏi view hierarchy.

UIView.transition(from:to:duration:options:completion:) 
```
UIView.transition(from:to:duration:options:completion:)
Các Prameter:
- from : View đầu tiên để bắt đầu hoán đổi.
- to: View khi kết thúc animation.
- duration: Khoảng thời gian thực hiện animation.
- options: Các chế độ animation.
- completion: Hành động sẽ thực hiện khi kết thúc animation.
```

Note:  Giả sửa cho animation chuyển từ view vàng sang view xanh và ngược lại . Khi bạn chạy đoạn code dưới đây : Chạy lần đầu tiên thì ko có gì xảy ra nhưng khi bạn chạy đến lần thứ 2 sẽ xảy ra crash app:
![](https://images.viblo.asia/282c6456-0b3c-4e7a-a026-fbb3416e1b2d.gif)
```
UIView.transition(from: goldenView!,
                         to: greenView!,
                         duration: 0.5,
                         options: [.transitionCurlUp],
                         completion: nil)
   
```

Nguyên nhân là do khi di chuyển thằng goldenView sang greenView thì Apple nó xoá goldenView để cho thằng greenView xuất hiện.

Cách fix: trong parameter options: bạn thêm thuộc tính "showHideTransitionViews" thay vì bạn xoá nó ra khỏi hệ thống phân cấp View thì bạn chỉ cần cho nó ẩn hiện .

```
isFlipped = !isFlipped

        let cardToFlip = isFlipped ? goldenView : greenView
        let bottomCard = isFlipped ? greenView : goldenView

        UIView.transition(from: goldenView!,
                          to: greenView!,
                          duration: 0.5,
                          options: [.transitionFlipFromLeft, .showHideTransitionViews],
                          completion: nil)
```
![](https://images.viblo.asia/f676417d-730c-4a29-88ce-5e9d161479ff.gif)


### Source Demo: https://github.com/lehuudungle/AnimationDemo

# 4. Tài liệu tham khảo: 
https://www.appcoda.com/view-animation-in-swift/

https://www.twilio.com/blog/ios-view-animations-transitions-swift
https://medium.com/@apmason/uiview-animation-options-9510832eedba