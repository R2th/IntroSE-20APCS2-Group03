Những UI cơ bản trong UIKit của Apple vốn đã rất tuyệt vời, nhưng đôi khi cái ta cần lại yêu cầu nhiều hơn.

Trong tình huống đo, ta có thể sử dụng một số thư viện trên github, tuy nhiên nó chỉ là một bài toán được dựng sẵn với khả năng custom giới hạn và cơ bản. 

Thông thường những yêu cầu mà tôi nhận được từ khách hàng là những tính năng cần nhiều hơn là những UI mặc định của iOS và thậm chí là nhiều hơn khả năng của những thư viện UI có sẵn trên github. 

Do đó, người anh em thiện lành buộc lòng phải tự tạo ra custom cho mình.

Hôm nay tôi sẽ hướng dẫn các bạn cách làm circular progress. Từ việc hiểu bản chất của cách làm này, bạn có thể tuỳ biến và tạo ra những phiên bản circular progress phù hợp cho dự án của mình.


-----
Đầu tiên vẫn là những khai báo cơ bản nhất, tôi sẽ tạo một class có tên CircularProgressView, kế thừa UIView và có những hàm init cơ bản
```
import UIKit

class CircularProgressView: UIView {

    override init(frame: CGRect) {
        super.init(frame: frame)
        setup()
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        setup()
    }

    private func setup() {
    }
}
```
Tiếp theo tôi sẽ thêm giá trị progress để view controller có thể thay đổi giá trị này:
```
private let kProgressKeyPath = "progress"

class CircularProgressView: UIView {

    var progress: CGFloat = 0
 
    // ...
}
```
Ý tưởng của bài toán này là sẽ có 2 sub layer:
- Một layer thể hiện đường tròn nằm dưới, đường tròn này sẽ full progress luôn và có background màu xám.
- Một layer thể hiện progress hiện tại của chúng ta và sẽ nằm ở trên, có màu xanh dương.

Đầu tiên, ta cần xác định CGPath cho layer, đây giống như kiểu cái hình vẽ ở trên layer vậy. Tròn, vuông, tam giác các thứ, và tất nhiên là ta vẽ hình tròn rồi:
```
// ...

private let kProgressLayerWidth: CGFloat = 38
private let kProgressLayerFrameDeltaInset = kProgressLayerWidth / 2

class CircularProgressView: UIView {

    private var progressLayerPath: CGPath {
        return UIBezierPath.ovalPath(in: bounds.insetBy(dx: kProgressLayerFrameDeltaInset,
                                                        dy: kProgressLayerFrameDeltaInset),
                                     startAngle: -90,
                                     endAngle: 270,
                                     clockwise: true).cgPath
    }
    
    // ...
}

extension UIBezierPath {

    // Hàm vẽ ovalPath, giá trị góc truyền vào đơn vị là độ chứ ko phải radian nhé!
    
    static func ovalPath(in rect: CGRect, startAngle: CGFloat, endAngle: CGFloat, clockwise: Bool) -> UIBezierPath {
        if rect.equalTo(.zero) { return UIBezierPath(rect: .zero) }

        let isCircle = rect.size.width == rect.size.height
        let ovalPath = UIBezierPath()
        ovalPath.addArc(withCenter: isCircle ? CGPoint(x: rect.midX, y: rect.midY) : .zero,
                        radius: rect.width / 2.0,
                        startAngle: startAngle * CGFloat.pi / 180.0,
                        endAngle: endAngle * CGFloat.pi / 180.0,
                        clockwise: clockwise)
        if (!isCircle) {
            let ovalTransform = CGAffineTransform(translationX: rect.midX, y: rect.midY)
            ovalTransform.scaledBy(x: 1, y: rect.height / rect.width)
            ovalPath.apply(ovalTransform)
        }
        return ovalPath
    }
}
```
Ở đây ta thiết lập góc bắt đầu là -90 độ và kết thúc là 270 độ chứ không phải từ 0 đến 360 vì để điểm bắt đầu của đường tròn progress sẽ là điểm nằm ở top và kết thúc ở top.

Ngoài ra ta extend UIBezierPath để thêm một hàm vẽ thuận tiện hơn nhờ việc xác định khung cho hình tròn, sẽ đỡ nhiều code hơn thay vì phải xác định tâm và bán kính, đồng thời cũng chuyển góc theo đơn vị radian thành độ để dễ tính toán hơn.

Sau khi define path rồi, ta tiếp tục với layer:
```
private let kProgressZPosition: CGFloat = -1
private let kBackgroundProgressZPosition: CGFloat = -2

class CircularProgressView: UIView {

    // ...
    
    private lazy var progressLayer: CAShapeLayer = {
        let layer = createProgressLayer()
        layer.strokeColor = UIColor.blue.cgColor
        layer.strokeEnd = progress
        layer.zPosition = kProgressZPosition
        self.layer.addSublayer(layer)
        return layer
    }()

    private lazy var backgroundProgressLayer: CAShapeLayer = {
        let layer = createProgressLayer()              // Sử dụng hàm dùng chung
        layer.strokeColor = UIColor.gray.cgColor       // Thiết lập màu progress
        layer.strokeEnd = 1                            // Điểm kết thúc của progress, nếu là 1 thì mình tô full luôn
        layer.zPosition = kBackgroundProgressZPosition // Đây là trục Z của layer, vì ta có 2 layer đè lên nhau nên phải phân định rõ ràng
        self.layer.addSublayer(layer)
        return layer
    }()
    
    private func createProgressLayer() -> CAShapeLayer {
        let layer = CAShapeLayer()
        layer.frame = bounds                  // Thiết lập frame cho layer
        layer.fillColor = nil                 // Phần bên trong của đường tròn sẽ không tô màu
        layer.lineWidth = kProgressLayerWidth // Đây chính là độ rộng của progress
        layer.path = progressLayerPath        // Đây là cái path chúng ta mới implement ở trên, hình tròn
        layer.strokeStart = 0                 // Biến này chỉ định điểm bắt đầu của progress
        return layer
    }
    
    // ...
}
```
Ở đây tôi sử dụng lazy var vì tôi muốn thiết lập nó sau khi init view để đỡ phải chia tách code init layer và setup layer cực khổ.

Về các thiết lập, bạn đọc comment trong code nhé.

Xong xuôi với layer, ta thiết lập các logic setup và liên quan đến view life cycle
```
class CircularProgressView: UIView {

    // ...

    private func setup() {
        backgroundColor = .clear
        layer.cornerRadius = bounds.height / 2
        layer.setValue(progress, forKey: kProgressKeyPath)
        _ = progressLayer
        _ = backgroundProgressLayer
    }

    override func layoutSublayers(of layer: CALayer) {
        super.layoutSublayers(of: layer)
        if layer.isEqual(self.layer) {
            updateOvalPaths()
        }
    }
    
    private func updateOvalPaths() {
        layer.cornerRadius = bounds.width / 2
        progressLayer.path = progressLayerPath
        backgroundProgressLayer.path = progressLayerPath
    }

    // ...
}
```
Tôi thiết lập `backgroundColor = .clear` để loại bỏ màu của view, vì mình chỉ cần đường tròn progress thôi nên loại bỏ màu này đi cho nó tự nhiên. Ngoài ra cũng vì lý do đó mà tôi thiết lập thêm `layer.cornerRadius = bounds.height / 2` để bo tròn view.
Hai dòng tiếp theo là khởi tạo 2 layer của chúng ta.

Ngoài ra khi `layoutSublayers` thì ta cũng thiết lập lại một số logic layout để đảm bảo hình vẽ chuẩn.

Và cuối cùng là animation:
```
class CircularProgressView: UIView {

    private var _progress: CGFloat = 0
    var progress: CGFloat {
        set {
            _progress = newValue
            layer.setValue(newValue, forKey: kProgressKeyPath)
        }
        get { return _progress }
    }

    // ...
    
    override func action(for layer: CALayer, forKey event: String) -> CAAction? {
        if event == kProgressKeyPath {
            CATransaction.begin()
            CATransaction.setValue(kCFBooleanTrue, forKey: kCATransactionDisableActions)
            progressLayer.strokeEnd = progress
            CATransaction.commit()
            if let action = action(for: layer, forKey: kBackgroundColorKeyPath) as? CAAnimation,
                let currentProgress = layer.value(forKey: event) as? CGFloat {
                let targetProgress = progress
                let animation = CABasicAnimation(keyPath: kStrokeEndKeyPath)
                animation.copyAnimation(from: action)
                animation.fromValue = currentProgress
                animation.toValue = targetProgress
                progressLayer.add(animation, forKey: kChangeProgressAnimationKey)
            }
        }
        return super.action(for: layer, forKey: event)
    }
    
    // ...
}

extension CABasicAnimation {

    func copyAnimation(from animation: CAAnimation) {
        beginTime = animation.beginTime
        duration = animation.duration
        speed = animation.speed
        timeOffset = animation.timeOffset
        repeatCount = animation.repeatCount
        repeatDuration = animation.repeatDuration
        autoreverses = animation.autoreverses
        fillMode = animation.fillMode
        timingFunction = animation.timingFunction
        delegate = animation.delegate
        isRemovedOnCompletion = animation.isRemovedOnCompletion
    }
}
```
Dòng `layer.setValue(newValue, forKey: kProgressKeyPath)` được gọi để trigger animation. Hàm này sẽ khiến layer gọi hàm delegate `action(for:forKey:)`, và ta thiết lập và trả animation ra từ đó.

Bạn có thể sẽ thấy kì lại khi thấy tôi viết dòng `if let action = action(for: layer, forKey: kBackgroundColorKeyPath) as? CAAnimation`. 

Vốn dĩ biến `progress` của ta không có sẵn khả năng animate, và để animate được chúng ta cần phải trả ra animation từ hàm `action(for:forKey:)`. Tuy nhiên khi ta gọi:
```
UIView.animate(withDuration: 1) { [unowned self] in
    self.progressView.progress = CGFloat.random(in: 0...1)
}
```
thì tất cả các thông số animation như duration, delay,... là ta không lấy được. Nhưng thay vào đó ta biết được rằng (nếu bạn chưa biết thì bây giờ sẽ biết), khi gọi animate như vậy, một CAAnimation sẽ được hệ thống tạo ra cho `backgroundColor` với toàn bộ các giá trị của animation mà ta truyền vào khi gọi `UIView.animate`. Và để lấy được animation này thì ta cần phải gọi `action(for: layer, forKey: kBackgroundColorKeyPath)`. 

Đó là lý do tôi có một hàm `copyAnimation(from:)` để copy các giá trị animation của `backgroundColor` sang cho animation thay đổi progress của chúng ta.

Phần còn lại là những thiết lập animation thông thường.

Ok vậy là đã xong, giờ đem ra dùng thôi, ta có thể vứt vào view controller như thế này chẳng hạn:
```
import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var progressView: CircularProgressView!

    override func viewDidLoad() {
        super.viewDidLoad()
    }

    @IBAction func onChangeValuePressed(_ sender: Any) {
        UIView.animate(withDuration: 1) { [unowned self] in
            self.progressView.progress = CGFloat.random(in: 0...1)
        }
    }
}
```
-----
# Kết
Trên đây tôi đã chia sẽ cách làm circular progress của mình, hy vọng nó sẽ là một nguồn tham khảo hữu ích cho những bạn lập trình viên iOS và những người quan tâm.

Chúc các bạn một ngày làm việc vui vẻ và hiệu quả!