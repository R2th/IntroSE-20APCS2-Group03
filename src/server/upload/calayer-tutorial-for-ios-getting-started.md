Như bạn đã biết, mọi thứ bạn nhìn thấy trên một app iOS đều gọi là view như button, table view, slider view và các view cha chứa đựng nhiều view con khác nữa. Nhưng có thể bạn chưa biết, đặt sau mỗi view là một class khác được gọi là layer - cụ thể là CALayer.

Trong bài viết này, mình sẽ giới thiệu về CALayer là gì và nó hoạt động như nào. 

## CALayer có liên quan gì tới UIView?
`UIView` quan tâm đến mọi thứ bao gồm layout và những xử lý của touch event. Nó không quan tâm đến việc vẽ hay animation, `UIKit` giao nhiệm vụ đó cho `CoreAnimation`. Trên thực tế UIView chỉ là một lớp vỏ bao bọc CALayer. Khi bạn set bounds cho một UIView, view đơn giản chỉ set bound cho phía sau của nó là CALayer. Nếu bạn gọi layoutIfNeed của UIVew, nó sẽ gọi chuyển tiếp tới CALayer gốc. Mỗi UIView có một CALayer gốc, cái mà có thể chứa đựng nhiều layer con:

![](https://images.viblo.asia/fbd0093c-e194-4ee2-aec4-969dc04461fe.png)

## Getting Started

Cách đơn giản để hiểu layer là gì đó là xem xem nó hoạt động như thế nào. Chúng ta sẽ bắt đầu với một project đơn giản.

Link project: https://github.com/oHaThiHoan/IOSExample/tree/master/CALayerStarter-2-5

Sau khi download về thì bạn mở file ViewCOntroller.swift để xem như sau:

```
import UIKit

class ViewController: UIViewController {
  
  @IBOutlet weak var viewForLayer: UIView!
  
  var layer: CALayer {
    return viewForLayer.layer
  }
  
  override func viewDidLoad() {
    super.viewDidLoad()
    setUpLayer()
  }
  
  func setUpLayer() {
    layer.backgroundColor = UIColor.blue.cgColor
    layer.borderWidth = 100.0
    layer.borderColor = UIColor.red.cgColor
    layer.shadowOpacity = 0.7
    layer.shadowRadius = 10.0
  }

  @IBAction func tapGestureRecognized(_ sender: Any) {
    
  }
  
  @IBAction func pinchGestureRecognized(_ sender: Any) {
    
  }
  
}
```

Như đã nói từ trước, mỗi view trong iOS đều có một layer liên quan đến nó, và bạn có thể gọi đến bằng cách ` .layer`. Đầu tiên là tạo một thuộc tính gọi là layer để truy cập vào layer của viewForLayer.

Hàm `setUpLayer()` để set một vài thuộc tính của layer như: tạo bóng, màu nền, border. Bạn sẽ học được nhiều hơn về setUpLayer(), nhưng trước tiên thì hãy build lên và xem layer được customized như thế nào:

![](https://images.viblo.asia/d2d08184-adf6-4730-b2c7-07135af082de.png)

Bây giờ chúng ta sẽ tìm hiểu kĩ hơn về từng thuộc tính của CALayer.

## Thuộc tính CALayer đơn giản

CALayer có một vài thuộc tính để bạn có thể customize nó. Xem lại trước đó đoạn code của chúng ta đã làm gì:
* Thay đổi màu nên của layer từ không màu sang màu xanh.
* Set border bằng cách sửa chiều rộng của nó từ 0 thành 100.
* Thay đổi màu border từ màu đen sang màu đỏ.
* Cuối cùng là cung cấp cho layer một độ bóng bằng cách thay đổi độ mờ của bóng từ mặc định là 0 (trong suốt) sang 0.7. Điều này sẽ làm xuất hiện một cái bóng bằng cách tăng bán kính bóng của nó từ 3 đến 10.

Đây chỉ là một vài thuộc tính mà bạn  có thể set CALayer. Bạn thử thêm nữa, thêm đoạn sau vào hàm setUpLayer()

```
layer.contents = UIImage(named: "star")?.cgImage
layer.contentsGravity = kCAGravityCenter
```

Thuộc tính contents của CALayer cho phép bạn có thể set content layer là một image, do đó bạn có thể set image có tên là "star" vào đây.
Build và run sẽ thấy kết quả như sau:

![](https://images.viblo.asia/e26e1270-0b6d-45b1-96c0-6f9d2bf911e9.png)

Lưu ý rằng ảnh star được ở trung tâm là vì set contentGravity là kCAGravityCenter. Nếu muốn thay đổi gravity sang top, top-right, right, bottom-right, bottom-left và top-left thì đều sửa ở thuộc tính này. 

## Thay đổi Layer's Appearance

Trong project trên có chứa kết nối tap và pinch gesture recognizers. 

Thay đổi` tapGestureRecognized(_:) `như sau:

```
@IBAction func tapGestureRecognized(_ sender: UITapGestureRecognizer) {
  layer.shadowOpacity = layer.shadowOpacity == 0.7 ? 0.0 : 0.7
}
```
Gọi đến layer của viewForLayer có độ bóng thay đổi giữa 0.7 và 0 khi tap vào.

Giờ nếu bạn muốn sự kiện pinch gesture sẽ làm thay đổi chiều rộng của border, chúng ta viết hàm như sau:

```
@IBAction func pinchGestureRecognized(_ sender: UIPinchGestureRecognizer) {
  let offset: CGFloat = sender.scale < 1 ? 5.0 : -5.0
  let oldFrame = layer.frame
  let oldOrigin = oldFrame.origin
  let newOrigin = CGPoint(x: oldOrigin.x + offset, y: oldOrigin.y + offset)
  let newSize = CGSize(width: oldFrame.width + (offset * -2.0), height: oldFrame.height + (offset * -2.0))
  let newFrame = CGRect(origin: newOrigin, size: newSize)
  if newFrame.width >= 100.0 && newFrame.width <= 300.0 {
    layer.borderWidth -= offset
    layer.cornerRadius += (offset / 2.0)
    layer.frame = newFrame
  }
}
```

Ở đây bạn tạo phần bù dương hoặc âm dựa trên độ zoom của người dùng, sau đó điều chỉnh kích thước của frame, chiều rộng của đường viền và bán kính góc của đượng viền.

Corner radius của layer có gía trị mặc định bằng 0, có nghĩa là góc sẽ là 90 độ. Tăng radius của corner lên nếu bạn muốn từ góc vuông sang bo tròn. 

Chú ý răng việc điều chỉnh corner radius sẽ không cắt content của layer (star image) trừ khi set masksToBounds của layer bằng true.

Build và run để thấy kết quả, thử trương hợp tap vào view và pinch zoom in zoom out. 

Dưới đây là một số ví dụ để hiểu hơn về cách sử dụng các thuộc tính của CALayer

## Example #1: CALayer

Dưới đây là một số ưu điểm của CALayer:
* Layer có thể có sublayer: Giống như view có thể có subview thì layer cũng có các sublayer. Bạn có thể sử dụng điều này để tạo ra sự linh hoạt và hiệu quả.
* Thuộc tính layer là animate: Khi bạn thay đổi thuộc tính layer, nó đã animate bằng một thời gian mặc định. Do vậy nếu muốn tạo hiệu ứng hơn bạn có thể tự tạo timming cho mình.
* Layer thì nhẹ: Layer nhẹ hơn view, do đó nó có thể giúp bạn tiết kiệm performance.
* Layer có rất nhiều thuộc tính hữu ích

Quay lại với ví dụ một layer chứa content là image star như bên trên đã đề cập:

```
let layer = CALayer () 
layer.frame = someView.bound 

layer.contents = UIImage (tên: "star" )?. cgImage 
layer.contentsGravity = kCAGravityCenter
```

Chúng ta thêm một đoạn code sau:

```
layer.magnificationFilter = kCAFilterLinear 
layer.isGeometryFlipped = false
```

Bạn sử dụng magnificationFilter khi muốn phóng to hình ảnh qua contentGravity, có thể sử dụng để thay đổi cả kích thước (resize, resize aspect, and resize aspect fill) và vị trí (center, top, top-right, right, etc.)

Biến isGeometryFlipped được set bằng false thì shasow sẽ ở bên dưới. 

Tiếp tục thêm đoạn sau:

```
layer.backgroundColor = UIColor(red: 11/255.0, green: 86/255.0, blue: 14/255.0, alpha: 1.0).cgColor
layer.opacity = 1.0
layer.isHidden = false
layer.masksToBounds = false
```

Đổi màu nền thành màu xanh. Thuộc tính masksToBounds bằng false, có nghĩa là  nếu layer có size nhỏ hơn content của nó thì content của nó cũng sẽ không bị cắt. 

Nếu muốn border bên ngoài hình tròn, set cornerRadius bằng một nửa kích thước của frame. ở đây kích thước của frame là 200 thì mình set cornerRadius bằng 100.

```
layer.cornerRadius = 100.0
layer.borderWidth = 12.0
layer.borderColor = UIColor.white.cgColor
```

Chạy ứng dụng xong sẽ thấy kết quả như sau:

![](https://images.viblo.asia/2037f903-53b8-497d-a183-ba5e4f701633.png)

CALayer có thêm 2 thuộc tính để tăng thêm performance là **shouldRasterize** và **drawsAsynchronously**

shouldRasterize mặc định là false, và khi set bằng true thì nó có thể tăng performance vì content của layer chỉ cần phải render 1 lần. Nó hoàn hảo cho nhưng object mà vẫn animate trên màn hình mà không thay đổi hình dạng.

drawsAsynchronously là loại đối lập với shouldRasterize. Nó cũng để mặc định là false.  Khi set bằng true thì có thể tăng performance khi content layer phải được vẽ đi vẽ lại nhiều lần, ví dụ khi bạn làm việc với layer mà thay đổi hình dạng liên tục (ví dụ CAEmitterLayer)

## Example #2: CATextLayer

CATextLayer cung cấp đơn giản mà nhanh cách render text hoặc attributed string. Không giống UILabel, CATextLayer không thể gán UIFont, chỉ CTFontRef hoặc CGFontRef.

Với đoạn code như dưới đây, nó có thể thay đổi font, font size, color, alignment, wrapping và truncation cũng như các thay đổi animate:

```
// 1
let textLayer = CATextLayer()
textLayer.frame = someView.bounds

// 2
let string = String(
  repeating: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor arcu quis velit 
             congue dictum. ",
  count: 20
)

textLayer.string = string

// 3
textLayer.font = CTFontCreateWithName(fontName, fontSize, nil)

// 4
textLayer.foregroundColor = UIColor.darkGray.cgColor
textLayer.isWrapped = true
textLayer.alignmentMode = kCAAlignmentLeft
textLayer.contentsScale = UIScreen.main.scale
someView.layer.addSublayer(textLayer)
```

Giải thích đoạn code trên như sau:

1. Tạo CATextLayer và set frame cho nó.
2. Tạo string lặp đi lặp lại và gán nó cho text layer
3. Tạo font và gán nó cho text layer
4. set text layer wrap và left align. đặt thuộc tính contentScale để khớp với màn hình, sau đó add layer vào view. Với tất cả các class layer, không chỉ CATextLayer, đều render với scale bằng 1. Khi add vào view, layer sẽ tự động set contentScale phù hợp với màn hình hiện tại. 

Nếu bạn add text layer vào UIView hình vuông, text sẽ như sau:

![](https://images.viblo.asia/396a3400-21e3-404b-8708-a3de3c33d62b.png)

Truncation được set khi bạn muốn text được cắt bằng dấu chẩm lửng. Truncation mặc định là none và có thể set là start, end hoặc middle.

![](https://images.viblo.asia/cbc1c009-e863-455b-b251-b5a66df64040.png)

![](https://images.viblo.asia/1a845925-dff7-47be-a385-4ab6bcb21893.png)

![](https://images.viblo.asia/f4a533ea-f582-4fa0-a10d-ec3f968c70ec.png)

## Example #2: CAScrollLayer
CAScrollLayer hiển thị một layer có thể cuộn. Nó khá cơ bản và không thể phản hồi trực tiếp các lần chạm của user hoặc là kiểm tra giới hạn của layer có thể cuộn, nhưng nó thực hiện nhưng nó cũng có thể sử dụng khá hiệu quả trong những trường hợp như ngăn không cho cuộc vượt ra ngoài giới hạn quảng cáo...

UIScrollView không sử dụng CAScrollLayer để làm việc, thay vào đó nó trực tiếp thay đổi bound của layer.

Có thể sử dụng CAScrollLayer theo 2 mode dọc và ngang. Cụ thể code như sau:

```
// 1
var scrollingViewLayer: CAScrollLayer {
  return scrollingView.layer as! CAScrollLayer
}

override func viewDidLoad() {
  super.viewDidLoad()
  // 2
  scrollingViewLayer.scrollMode = kCAScrollBoth
}

@IBAction func panRecognized(_ sender: UIPanGestureRecognizer) {
  var newPoint = scrollingView.bounds.origin
  newPoint.x -= sender.translation(in: scrollingView).x
  newPoint.y -= sender.translation(in: scrollingView).y
  sender.setTranslation(CGPoint.zero, in: scrollingView)
  // 3
  scrollingViewLayer.scroll(to: newPoint)
  
  if sender.state == .ended {
    UIView.animate(withDuration: 0.3, delay: 0, options: [], animations: {
        self.scrollingViewLayer.scroll(to: CGPoint.zero)
    })
  }
}
```

Giải thích cụ thể đoạn code trên:

1. Thuộc tính CAScrollLayer được sử dụng để trả về layer của view.
2. Scrolling được khởi tạo set mode ngang và dọc.
3. Khi pan gesture được nhận dạng, một điểm mới được tạo và scrolling layer kéo tới điểm bên trong UIView. Chú ý rằng `scroll(to:)` không để tự động hiệu ứng. 

Chạy đoạn mã trên và xem kết quả như sau:

![](https://images.viblo.asia/94834125-cb0f-40d0-9ed6-1b6f175fde55.gif)

Layer trên bao gồm 2 điều khiển để khoá cuộn theo chiều ngang và chiều dọc.

Đây là 1 số cách sử dụng CAScrollLayer:

* Nếu bạn muốn một thứ nhẹ và chỉ cần scroll tự động thì hay cân nhắc đến CAScrollLayer.
* Nếu bạn muốn user có thể scroll thì bạn nên chọn UIScrollView
* Nếu bạn muốn scroll một ảnh rất lớn, thì nên cân nhắc việc chọn CATiledLayer (sẽ viết bên dưới)

## Example #4: TiledLayer

CATiledLayer thực hiện vẽ không đồng bộ content của layer. Layer này phù hợp với những ảnh rất lớn hoặc một tập hơp các content nơi mà bạn chỉ muốn nhìn một điểm nhỏ tại một thời điểm. bởi vì bạn có thể bắt đầu nhìn content của bạn mà không cần phải load tất cả vào bộ nhớ.

Đây là một vài cách để xử lý khi vẽ. Một là override UIView và sử dụng CATiledLayer để vẽ đi vẽ lại một ô để fill hết background của view. Như sau:

ViewController cần hiển thị 1 titleBackgroundView:

```
import UIKit

class ViewController: UIViewController {
  
  @IBOutlet weak var tiledBackgroundView: TiledBackgroundView!
  
}
```

overriden TiledBackgroundView được viết như sau:

```
import UIKit

class TiledBackgroundView: UIView {
  
  let sideLength: CGFloat = 50.0
  
  // 1
  override class var layerClass: AnyClass {
    return CATiledLayer.self
  }
  
  // 2
  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
    srand48(Int(Date().timeIntervalSince1970))
    let layer = self.layer as! CATiledLayer
    let scale = UIScreen.main.scale
    layer.contentsScale = scale
    layer.tileSize = CGSize(width: sideLength * scale, height: sideLength * scale)
  }
  
  // 3
  override func draw(_ rect: CGRect) {
    let context = UIGraphicsGetCurrentContext()
    let red = CGFloat(drand48())
    let green = CGFloat(drand48())
    let blue = CGFloat(drand48())
    context?.setFillColor(red: red, green: green, blue: blue, alpha: 1.0)
    context?.fill(rect)
  }
  
}
```

Giải thích đoạn code trên như sau:

1. layerClass được override nên layer của view này được khởi tạo như một CATiledLayer.
2. Sử dụng hàm `drand48()` để tạo ra màu random trong hàm `draw(_:)`. Sau đó scale contnet của layer sao cho vừa với scale củ màn hình và kích thước ô của nó được đặt.
3. Override hàm `draw(_:)` để điền vào view những ô có màu khác nhau.

Cuối cùng sẽ được kết quả là một grid các ô vuông như hình:

![](https://images.viblo.asia/559044bd-d7e2-4aa4-a5e0-62dc56a42c4c.png)

### Sử dụng CATiledLayer - Xem chi tiết

Chúng ta muốn phóng to và nhìn chi tiết như hình sau:

![](https://images.viblo.asia/80742db4-a40e-4f8c-a131-9616c761eedb.png)

Làm được như vậy là kết quả của việc sử dụng thuộc tính sau của CATiledLayer: **levelsOfDetail** và **levelsOfDetailBias**

levelsOfDetail là số mức độ chi tiết được duy trì  bởi layer. Mặc định của nó là 1, và mỗi khi tăng mức độ lên sẽ giảm 1 nửa độ phân giải trước đó. Max của levelsOfDetail này là mức độ chi tiết nhỏ nhất là 1 pixel.

levelsOfDetailBias là số lượng mức độ phóng to chi tiết được lưu lại bởi layer. Mặc định là 0, có nghĩa là không có mức phóng đại nào được lưu lại, và khi tăng level lên sẽ được lưu lại dưới mức phân giải gấp đôi của mức trước đó.

Ví dụ, tăng levelsOfDetailBias đển 5 thì cho một ô thì sẽ dẫn đến các mức bộ đệm được phóng to ở mức 2x, 4x, 8x, 16x hoặc 32x và layer được zoom in  sẽ như sau:

![](https://images.viblo.asia/5de9b312-0c72-4e72-8734-0c812dc0d474.png)

Trên đây là một số ví dụ có thể sử dụng CALayer. CALayer còn có thể sử dụng trong rất nhiều trường hợp linh hoạt bạn có thể tham khảo thêm ở đây https://www.raywenderlich.com/402-calayer-tutorial-for-ios-getting-started#toc-anchor-012