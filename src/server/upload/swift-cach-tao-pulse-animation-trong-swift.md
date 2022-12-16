## Môi trường phát triển:
- **Swift Language Version:** Swift 4.2
- **Xcode:** Version 10.2.1 (10E1001)
- **Deployment Target:** 10.0 

Pulse Animation là sự kết hợp giữa Scale Animation và Opacity Animation, trong đó Scale Animation là hiệu ứng tăng giảm kích thước, còn Opacity Animation là hiệu ứng độ mờ.
## Bước 1: Khởi tạo các thuộc tính của Pulse Animation
Đầu tiên, ta khởi tạo các thuộc tính sau:
```
final class Pulsing: CALayer {
    var animationGroup = CAAnimationGroup()
    var initialPulseScale: Float = 0
    var nextPulseAfter: TimeInterval = 0
    var animationDuration: TimeInterval = 1.5
    var radius: CGFloat = 200
    var numberOfPulses: Float = Float.infinity
```

Trong đó:
- **animationGroup** là một object cho phép nhiều animations được gộp thành một nhóm và chạy đồng thời.
- **initialPulseScale** là giá trị scale ban đầu.
- **nextPulseAfter** là khoảng thời gian tiếp theo xảy ra Pulse Animation.
- **animationDuration** là khoảng thời gian animation chạy.
- **radius** là bán kính của Pulse Animation.
- **numberOfPulses** là số lượng Pulse Animation xảy ra.

## Bước 2: Setup Scale Animation và Opacity Animation
Ta thêm vào class Pulsing hàm createScaleAnimation() và createOpacityAnimation().
```
private func createScaleAnimation () -> CABasicAnimation {
    let scaleAnimation = CABasicAnimation(keyPath: "transform.scale.xy")
    scaleAnimation.fromValue = NSNumber(value: initialPulseScale)
    scaleAnimation.toValue = NSNumber(value: 1)
    scaleAnimation.duration = animationDuration

    return scaleAnimation
}
```

```
private func createOpacityAnimation() -> CAKeyframeAnimation {
    let opacityAnimation = CAKeyframeAnimation(keyPath: "opacity")
    opacityAnimation.duration = animationDuration
    opacityAnimation.values = [0.4, 0.8, 0]
    opacityAnimation.keyTimes = [0, 0.2, 1]

    return opacityAnimation
}
```

## Bước 3: Setup Animation Group
Hàm setupAnimationGroup() khởi tạo một animation group chứa scale animation và opacity animation.
```
    private func setupAnimationGroup() {
        animationGroup = CAAnimationGroup()
        animationGroup.duration = animationDuration + nextPulseAfter
        animationGroup.repeatCount = numberOfPulses
        
        // Timing of animations
        let defaultCurve = CAMediaTimingFunction(name: CAMediaTimingFunctionName.default)
        animationGroup.timingFunction = defaultCurve
    
        animationGroup.animations = [createScaleAnimation(), createOpacityAnimation()]
    }
```

## Bước 4: Setup hàm khởi tạo
Hàm khởi tạo của class Pulsing.
```
init(numberOfPulses: Float = Float.infinity, radius: CGFloat, position: CGPoint) {
    super.init()

    self.backgroundColor = UIColor.blue.cgColor
    self.contentsScale = UIScreen.main.scale
    self.opacity = 0
    self.radius = radius
    self.numberOfPulses = numberOfPulses
    self.position = position

    self.bounds = CGRect(x: 0, y: 0, width: radius * 2, height: radius * 2)
    self.cornerRadius = radius

    DispatchQueue.global(qos: .default).async {
        self.setupAnimationGroup()

        DispatchQueue.main.async {
             self.add(self.animationGroup, forKey: "pulse")
        }
    }
}
```

## Bước 5: Add Pulse Animation
Trong class ViewController, ta thêm Pulse Animation vào avatarImageView.
```
@IBOutlet private weak var avatarImageView: UIImageView!

override func viewDidLoad() {
    super.viewDidLoad()
    avatarImageView.isUserInteractionEnabled = true

    let tapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(addPulse))
    tapGestureRecognizer.numberOfTapsRequired = 1
    avatarImageView.addGestureRecognizer(tapGestureRecognizer)
}
    
private func addPulse(){
    let pulse = Pulsing(numberOfPulses: 1, radius: 110, position: avatarImageView.center)
    pulse.animationDuration = 0.8
    pulse.backgroundColor = UIColor.red.cgColor

    view.layer.insertSublayer(pulse, below: avatarImageView.layer)
}
```

Và đây là kết quả cuối cùng:
![](https://images.viblo.asia/43b1cb57-5acc-483a-82af-8850f7608668.gif)

## Tài liệu tham khảo:
https://www.brianadvent.com/cool-animations-core-animation-shaking-textfield-pulse-animation/

## Link github:
https://github.com/brianadvent/CoolCoreAnimations