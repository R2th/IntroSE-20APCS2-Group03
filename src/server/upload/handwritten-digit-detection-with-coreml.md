**Machine Learning** thực sự là một lĩnh vực rất hot trong CNTT hiện nay, hầu hết các công ty, doanh nghiệp lớn như Apple, Google.. đều đầu tư rất nhiều nguồn lực cũng như tiền bạc để tham gia vào lĩnh vực của tương lai này . Hàng loạt các ứng dụng , sản phẩm Machine Learning được giới thiệu, tiêu biểu là "bot" đánh cờ vây AlphaGo của Google. AlphaGo với khả năng tự học, ghi nhớ các bước đi của đối thủ và cho đến nay đã trải qua số trận đấu tương đương với hơn 80 năm kinh nghiệm của một kiện tướng bình thường đã dễ dàng đánh bại kiện tướng từng 18 lần vô địch cờ vây thế giới - Lee Sedol, và chắc chắn sẽ có rất nhiều bộ máy thông minh hơn nửa được ra đời nhờ ML.

![](https://images.viblo.asia/bc1469b9-4c2e-4948-8bf8-e371b8bbdbb1.jpg)

Đối với **Apple** thì tại hội nghị WWDC 2017 họ đã cho ra mắt CoreML - frameworks hỗ  trợ cho việc tích hợp Machine Learning vào trong các ứng dụng iOS. CoreML cung cấp các API để làm việc với các CoreML Data Model - đây là các model data đã được training trước, chúng ta có thể tạo ra các model bằng các tập dữ liệu hoặc sử dụng các model có sẵn, Apple cung cấp khá nhiều model cho các developer các bạn có thể xem thêm [tại đây](https://developer.apple.com/machine-learning/build-run-models/)

Sau đây mình sẽ làm một demo nhỏ, detect digit với CoreML như sau:
![](https://images.viblo.asia/52999137-184e-4b4b-94ec-7be0346bfd5f.gif)
##### DrawableView

Đầu tiên ta tạo một view để vẽ nên các chữ số.

```swift
import UIKit

class DrawableView: UIView {

//1
var lineColor = UIColor.white
var lineWidth: CGFloat = 10

//2
var path: UIBezierPath!
var touchPoint: CGPoint!
var startingPoint: CGPoint!

override func awakeFromNib() {
  super.awakeFromNib()
  
  //3
  self.isMultipleTouchEnabled = false
}

override func touchesBegan(_ touches: Set<UITouch>,
                           with event: UIEvent?) {
  //4                        
  let touch = touches.first
  startingPoint = touch?.location(in: self)
}

override func touchesMoved(_ touches: Set<UITouch>,
                           with event: UIEvent?) {
  //5                         
  let touch = touches.first
  touchPoint = touch?.location(in: self)

  path = UIBezierPath()
  path.move(to: startingPoint)
  path.addLine(to: touchPoint)
  startingPoint = touchPoint
  
  drawShapeLayer()
}

private func drawShapeLayer() {
  let shapeLayer = CAShapeLayer()
  shapeLayer.path = path.cgPath
  shapeLayer.strokeColor = lineColor.cgColor
  shapeLayer.fillColor = UIColor.clear.cgColor
  shapeLayer.lineWidth = lineWidth
  layer.addSublayer(shapeLayer)
  setNeedsDisplay()
}

func clear() {
  //6
  path.removeAllPoints()
  self.layer.sublayers = nil
  setNeedsDisplay()
 }
}
```
Mình sẽ giải thích đoạn code trên như sau:

1. Màu sắc và height của line khi vẽ.

2. Biến UIBezierPath sẽ được dùng để draw line tương ứng với startingPoint và touchPoint khi người dùng vẽ cho đến khi dừng lại.

3. Disable multiple touch.

4. Gán startingPoint tại vị trí người dùng bắt đầu vẽ (touchesBegan).

5. Khi draw thì tiến hành vẽ từ startingPoint cho đến  vị trí hiện tại và gán lại startingPoint bằng vị trí hiện tại để tiếp tục vẽ.

6. Xoá đi các line đã vẽ

##### CoreML Model

Để làm việc với CoreML ta cần một data model đã được trainning sẵn. Với demo này thì chúng dùng  model **MNIST** các bạn dowload **MNIST** [tại đây](http://coreml.store)
![](https://images.viblo.asia/de6e33c5-98dc-4cc8-8925-7bef119eb4bd.png)
Sau khi dowload bạn drag file **MNIST.mlmodel** vào project.

Click chọn vào **MNIST.mlmodel** ta sẽ thấy:
![](https://images.viblo.asia/2cde0bce-0bbc-4884-b5ce-29f25178c635.png)
- Input: là 1 image tỉ lệ **28x28** có chứa digit cần nhận diện
- Output:  là một mảng các digit được dự đoán với digit được nhận diện từ input.

Tiến hành vào code:

```swift
import UIKit
import Vision

extension UIImage {
  convenience init(view: UIView) {
    UIGraphicsBeginImageContext(view.frame.size)
    view.layer.render(in:UIGraphicsGetCurrentContext()!)
    let image = UIGraphicsGetImageFromCurrentImageContext()
    UIGraphicsEndImageContext()
    self.init(cgImage: image!.cgImage!)
 }
}

class ViewController: UIViewController {
   @IBOutlet weak var drawableView: DrawableView!
   @IBOutlet weak var resultLabel: UILabel!

   var requests = [VNRequest]()

  override func viewDidLoad() {
    super.viewDidLoad()
    drawableView.backgroundColor = .black
    setupVisionModel()
  }

   //1
  private func setupVisionModel() {
    guard let visionModel = try? VNCoreMLModel(for: MNIST().model) else {
    fatalError("Could'nt load ML Model")
   }
    let classificationRequest = VNCoreMLRequest(model: visionModel, completionHandler:   self.handleClassification)
    self.requests = [classificationRequest]
  }

  //2
  func handleClassification(request: VNRequest, error: Error?) {
    guard let observations = request.results else {
      print("No Result")
      return
    }
    let classifications = observations
       .compactMap({  $0 as? VNClassificationObservation })
       .filter({ $0.confidence > 0.9 })
       .map({ $0.identifier })

     DispatchQueue.main.async {
         self.resultLabel.text = classifications.first
     }
   }

   //3
   @IBAction func recognizeAction(_ sender: Any) {
      let image = UIImage(view: self.drawableView)
      let scaledImage = scaleImage(image: image, toSize: CGSize(width: 28, height: 28))

      let imageRequestHandler = VNImageRequestHandler(cgImage: scaledImage.cgImage!, options: [:])

      do {
          try imageRequestHandler.perform(self.requests)
      } catch let error {
          print(error)
      } 
   }

  func scaleImage(image: UIImage, toSize size: CGSize) -> UIImage {
      UIGraphicsBeginImageContextWithOptions(size, false, 1)
      image.draw(in: CGRect(x: 0, y: 0, width: size.width, height: size.height))
      let newImage = UIGraphicsGetImageFromCurrentImageContext()
      UIGraphicsEndImageContext()
      return newImage!
   }

  @IBAction func clearAction(_ sender: Any) {
     drawableView.clear()
     resultLabel.text = nil
   }
}
```
Có những lưu ý ở đoạn trên như sau: 
1. Tại viewDidload mình sẽ tạo ra 1 classificationRequest từ **MNIST model** request này sẽ trả về result khi nhận được yêu cầu perform từ một **requestHandler** nào đó.

2. Sau khi nhận được completionHandler từ request ta sẽ filter ra một mảng các digit với độ tin cậy **> 0.9** được model dự đoán, và set cho resultLabel với digit có độ tin cậy cao nhất.

3. Lưu ý khi đã draw xong ta sẽ tạo ra một UIImage từ view đã draw và scale với tỉ lệ **28x28** tương ứng với yêu cầu input của model thì mới đạt được kết quả chính xác.

Bài viết của mình đến đây là hết, các bạn có thể tạo ra các example CoreML tương tự với các CoreML Model khác. Hi vọng bài viết sẽ giúp ích các bạn. Cảm ơn các bạn đã theo dõi.

Source code: [github/pdn1905](https://github.com/pdn1905/Handwritten-digit-detection.)