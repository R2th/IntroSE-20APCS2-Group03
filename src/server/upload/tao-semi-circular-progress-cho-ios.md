## Mở đầu
Khi làm dự án cho công ty hoặc khách hàng, đôi lúc bạn sẽ nhận được yêu cầu tạo những giao diện liên quan tới hình vẽ, khối mà dùng hình ảnh thì khó mà dùng thư viện thì chẳng bõ, khi ấy chúng ta sẽ cần sử dụng tới những tính năng cho phép vẽ custom lên UIView.

Trong bài lần này mình sẽ chia sẻ cách tạo 1 Progress theo dạng đường tròn khuyết (Semi Circular Progress) bằng **CAShapeLayer**.
[Cách vẽ trên Android các bạn có thể tìm hiểu ở đây.](https://viblo.asia/p/tao-semi-circular-progress-cho-android-gAm5yErX5db)

## Demo
![](https://images.viblo.asia/0fb80c2e-e3b7-422f-b357-7d0e2a386486.gif)
<div align="center">Demo trên iOS</div>

## Thực hiện
### Tạo Custom View
Tạo 1 project mới để demo, từ file dự án tạo 1 file kế thừa **UIView** ở đây mình đặt là **SemiCircleView**. Ta sẽ tiến hành dùng CAShapeLayer vẽ progress ở trên CustomView này

Ta sẽ cần 2 layer, 1 cho background màu xám ở dưới và 1 cho phần màu xanh thay đổi được nên ta sẽ tạo ra 2 **ShapeLayer** lần lượt là **backgroundLayer** và **mainLayer**
```swift
class SemiCircleView: UIView {
    private var backgroundLayer: CAShapeLayer?
    private var mainLayer: CAShapeLayer?
}
```
### Hàm cài đặt cho CustomView
Ta tạo hàm setup với tham số truyền vào là UIColor tương ứng với màu progress bạn muốn vẽ, lần lượt viết các lệnh vẽ path cho **ShapeLayer**
```swift
func setupUI(color: UIColor) {
        // Remove layer trước khi thêm để tránh view chèn vào nhiều layer,
        // Phần này sẽ giúp bạn tránh vẽ đè khi gọi là hàm setup
        mainLayer?.removeFromSuperlayer()
        backgroundLayer?.removeFromSuperlayer()
        
        // Khởi tạo lại layer
        mainLayer = CAShapeLayer()
        backgroundLayer = CAShapeLayer()
        let center = CGPoint(x: frame.width/2, y: frame.height/2) // center nằm ở giữa view cha
        let circularPath = UIBezierPath(arcCenter: center, // tâm đường tròn
                                        radius: frame.height/2, // bán kính đường tròn
                                        startAngle: CGFloat.pi * 3/4, // điểm vẽ đầu
                                        endAngle: CGFloat.pi * 13/6, // điểm vẽ cuối
                                        clockwise: true) // Vẽ theo chiều kim đồng hồ
        mainLayer?.path = circularPath.cgPath
        backgroundLayer?.path = circularPath.cgPath
        setupSubLayer(backgroundLayer, color: UIColor.separator, progress: 1)
        setupSubLayer(mainLayer, color: color, progress: 0)
    }
```

Tiếp theo là hàm setup của **ShapeLayer**, sau setup ta sẽ add vào thành **subLayer** của **SemiCircleView**
```swift
private func setupSubLayer(_ shapeLayer: CAShapeLayer?, color: UIColor, progress: CGFloat) {
        shapeLayer?.fillColor = UIColor.clear.cgColor // Màu của layer
        shapeLayer?.strokeEnd = progress // Độ phủ của stroke, tính theo %, max là 1
        shapeLayer?.strokeColor = color.cgColor // Màu của stroke
        shapeLayer?.lineWidth = 12 // Độ rộng stroke
        shapeLayer?.lineCap = .round // Hình dạng 2 đầu stroke (round là bo tròn)
        if let sub = shapeLayer {
            layer.addSublayer(sub)
        }
    }
```

Cuối cùng ta sẽ viết hàm để thay đổi giá trị progress
```swift
func setProgress(_ progress: Float) {
        UIView.animate(withDuration: 0.3) { // Đặt hiệu ứng cho chuyển động bắt mắt hơn
            self.mainLayer?.strokeEnd = CGFloat(progress)
        }
    }
```
### Demo
Ở Story board **Main** ta thêm View có kích thước 200 x 200 căn giữa view cha và cho kế thừa **SemiCircleView** ta vừa tạo.

Tiếp theo ta kéo thêm 1 label hiển thị giá trị progress và 1 button thay đổi giá trị progress.

Ở class **ViewController** ta chỉ cần gọi setup cho **SemiCircleView** ở **viewDidLoad** và gọi hàm **setProgress** mỗi khi click button thay đổi progress là sẽ có được phần giao diện thay đổi progress bar tròn như hình phía đầu bài viết.
```swift
class ViewController: UIViewController {
    @IBOutlet weak var semiCircleView: SemiCircleView!
    @IBOutlet weak var progressLabel: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        semiCircleView.setupUI(color: .systemBlue)
        semiCircleView.setProgress(0)
    }
    
    @IBAction func recTap(_ sender: UIButton) {
        let progress = Int.random(in: 0...100)
        progressLabel.text = "\(progress) %"
        semiCircleView.setProgress(Float(progress)/100)
    }
    
}
```

## Kết thúc
Bài viết này mình đã chia sẻ về cách đơn giản để tạo 1 Progress Bar tròn khuyết dùng **CAShapeLayer**, mong rằng chia sẻ này sẽ giúp ích cho các bạn.

Xin cảm ơn các bạn đã dành thời gian đọc bài viết và nếu thấy bổ ích hãy cho mình +1 đánh giá động viên nhé!