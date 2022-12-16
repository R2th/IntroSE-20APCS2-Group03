## Sử dụng UIBezierPath vẽ một số hoạt ảnh trong IOS

UIBezierPath từ lúc ra đời đã giúp đỡ lập trình viên rất nhiều và dần trở thành 1 phần không thể thiếu khi muốn custom các hình ảnh hay các animation phức tạp có độ khó cao. Nó giúp chúng ta tao ra các đường cong mịn hay những hình hoạ đẹp không tì vết. Trong bài này mình sẽ hướng dẫn sơ qua một số cơ bản về nó và cách tạo một số đường path đơn giản.

Theo Apple Developer định nghĩa thì UIBezierPath là: 
> A path that consists of straight and curved line segments that you can render in your custom views.

### 
Với UIBezierPath bạn có thể tạo ra:
![](https://images.viblo.asia/99456ead-cd02-4528-99bd-a33de0323728.gif)

Hay đây
![](https://images.viblo.asia/2385adaa-3c4e-4d67-b0a4-391fce91c4ea.gif)

Và cả đây nữa
![](https://images.viblo.asia/cc8cb41c-2eb2-451a-bd00-ffc8175ad8d7.gif)

Với hình đầu bạn tạo hiệu ứng kết thúc của path trên CAShapeLayer như sau:
``` Swift

weak var shapeLayer: CAShapeLayer?

@IBAction func didTapButton(_ sender: Any) {
    // remove old shape layer if any

    self.shapeLayer?.removeFromSuperlayer()

    // create whatever path you want

    let path = UIBezierPath()
    path.move(to: CGPoint(x: 10, y: 50))
    path.addLine(to: CGPoint(x: 200, y: 50))
    path.addLine(to: CGPoint(x: 200, y: 240))

    // create shape layer for that path

    let shapeLayer = CAShapeLayer()
    shapeLayer.fillColor = #colorLiteral(red: 0, green: 0, blue: 0, alpha: 0).cgColor
    shapeLayer.strokeColor = #colorLiteral(red: 1, green: 0, blue: 0, alpha: 1).cgColor
    shapeLayer.lineWidth = 4
    shapeLayer.path = path.cgPath

    // animate it

    view.layer.addSublayer(shapeLayer)
    let animation = CABasicAnimation(keyPath: "strokeEnd")
    animation.fromValue = 0
    animation.duration = 2
    shapeLayer.add(animation, forKey: "MyAnimation")

    // save shape layer

    self.shapeLayer = shapeLayer
}
```
về bản chất UIBezierPath chỉ tạo cho bạn path cần thiết còn việc tạo animation như thế nào tuỳ thuộc vào yêu cầu mà bạn mong muốn.

Trong hình 2 chúng ta sẽ khởi tạo đường curve và animation sẽ viết như sau:
```Swift
let path = UIBezierPath()
path.move(to: CGPoint(x: 10, y: 130))
path.addCurve(to: CGPoint(x: 210, y: 200), controlPoint1: CGPoint(x: 50, y: -100), controlPoint2: CGPoint(x: 100, y: 350))

// create shape layer for that path (this defines what the path looks like when the animation is done)

let shapeLayer = CAShapeLayer()
shapeLayer.fillColor = #colorLiteral(red: 0, green: 0, blue: 0, alpha: 0).cgColor
shapeLayer.strokeColor = #colorLiteral(red: 1, green: 0, blue: 0, alpha: 1).cgColor
shapeLayer.lineWidth = 5
shapeLayer.path = path.cgPath
shapeLayer.strokeStart = 0.8

let startAnimation = CABasicAnimation(keyPath: "strokeStart")
startAnimation.fromValue = 0
startAnimation.toValue = 0.8

let endAnimation = CABasicAnimation(keyPath: "strokeEnd")
endAnimation.fromValue = 0.2
endAnimation.toValue = 1.0

let animation = CAAnimationGroup()
animation.animations = [startAnimation, endAnimation]
animation.duration = 2
shapeLayer.add(animation, forKey: "MyAnimation")
```

và hình 3 chúng ta sẽ làm cho hình ảnh chuyển động trên đường path thay vì hướng tiếp cận sử dụng đồng bộ hóa hoạt ảnh trong CAShapeLayer với hoạt ảnh trong SKScene.
```Swift
let path = UIBezierPath()
path.move(to: CGPoint(x: 134, y: 209))//
    path.addLine(to: CGPoint(x: (131 + 93), y: 209))// for drawing line
    path.addQuadCurve(to: CGPoint(x: (131 + 97), y: 212) , controlPoint: CGPoint(x: (131 + 93), y: 209))// for drawing a curve
    path.addLine(to: CGPoint(x: (131 + 97) , y: (209 + 33 )))
    path.addQuadCurve(to: CGPoint(x: (131 + 93), y: (209 + 37)), controlPoint:  CGPoint(x: (131 + 97) , y: (209 + 33 )))
    path.addLine(to: CGPoint(x: 135, y: (209 + 37)))
    path.addQuadCurve(to: CGPoint(x: 131, y: 209 + 33), controlPoint: CGPoint(x: 135, y: 209 + 37))
    path.addLine(to: CGPoint(x: 131, y: 213))
    path.addQuadCurve(to: CGPoint(x: 134, y: 209), controlPoint:CGPoint(x: 131, y: 213) )
     let shapelayer = CAShapeLayer()//create shape layer object
    shapelayer.fillColor = #colorLiteral(red: 0, green: 0, blue: 0, alpha: 0).cgColor
    shapelayer.strokeColor = #colorLiteral(red: 0.06274510175, green: 0, blue: 0.1921568662, alpha: 1).cgColor
    shapelayer.lineWidth = 2
    shapelayer.path = path.cgPath
    view.layer.addSublayer(shapelayer)
    let animation = CABasicAnimation(keyPath: "strokeEnd")// create animation and add it to shape layer
    animation.fromValue = 0
    animation.duration = 3
    shapelayer.add(animation, forKey: "MyAnimation")
    self.shapelayer = shapelayer
```

 Cũng không khó lắm phải không ạ. 
 Hi vọng một số ví dụ đơn giản có thể giúp đỡ được anh em nào trong quá trình lam việc cần đến.