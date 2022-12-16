# Xây dựng ứng dụng nhận dạng hoa quả với tập dữ liệu của bạn

Để tạo ra mô hình chúng ta sử dụng một số công cụ là ứng dụng CreatML, Framework CoreML và Vision
![](https://images.viblo.asia/c2f6b926-8c18-4c62-a4a2-1704cc5cd2a1.jpg)
<div align="center">
    <b> Hình 1: Sơ đồ quy trình cơ bản để xây dựng ứng dụng </b>
</div>


Nếu bạn chưa biết CreateML, CoreML là gì có thể truy cập tại [đây](https://viblo.asia/p/tri-tue-nhan-tao-voi-swift-Qbq5Q3wRZD8) mình đã giới thiệu đôi chút chúng dùng để làm gì.
Đầu tiên chúng ta sẽ sử dụng CreateML công cụ dựa trên nền tảng xây dựng mô hình máy học của Apple để tạo, huấn luyện , xác thực mô hình cho riêng mình. 
Để dễ ràng trong ví dụ lần này chúng ta sẽ ví dụ tạo dựng mẫu mô hình phân biện chúi và táo. Sau đó sẽ sử dụng CoreML để làm việc với mô hình đã tạo được .

Và công cụ cuối cùng để phân biệt chúi hay táo ?! Là framework Vision. Vision cung cấp rất nhiều những hỗ trợ để giúp giải quyết các vấn đề về computer-vision. 

Trước khi chúng ta có thể tạo một ứng dụng có thể phân loại các loại trái cây khác nhau từ một hình ảnh, chúng ta cần một số hình ảnh về trái cây (tập mẫu).Bạn có thể tham khảo mẫu dữ liệu [Fruit-360](https://github.com/Horea94/Fruit-Images-Dataset).
Bộ dữ liệu này chứa 103 loại trái cây khác nhau, được phân tách rõ ràng thành dữ liệu tranning, dữ liệu test, cũng như dữ liệu ảnh có nhiều hơn một loại. 

![](https://images.viblo.asia/049dad67-8d60-4891-a203-12066ef19853.png)
<div align="center">
<b>Hình 2: minh họa một ví dụ về các loại hình ảnh trong bộ dữ liệu.</b>
</div>

Nhưng trong ví dụ lần này chúng ta chỉ quan tâm đến tập dữ liệu chuối và táo cho bài toán của chúng ta.
## Tạo mô hình
Bây giờ chúng ta cùng nhau xây dựng mô hình phân loại trái cây của chúng ta nào. 

Mở CreatML bằng cách khởi động Xcode(11) → menu Xcode → Công cụ dành cho nhà phát triển → CreateML

Sau khi đã khởi động được CreateML đến chúng ta sẽ: 
* Chọn Image Classifier, như trong Hình 3, rồi next.! 

![](https://images.viblo.asia/66f9bfe5-b1ed-4bbf-87af-fb2b446d33f2.png)
<div align="center">
<b>Hình 3: Giao diện CreateML</b>
</div>

* Chỉnh sửa thông tin cho dự án của bạn, rồi lại next thôi.!
 
![](https://images.viblo.asia/87b16286-8ff3-41ea-8ef8-493abd367fd7.png)
<div align="center">
<b>Hình 4:  CreateML chỉnh sửa thông tin cơ bản.</b>
</div>


* Chọn  Training Data và di chuyển đến folder có dữ liệu táo và chuối đã tải.

* Trong thanh top bar của ứng dụng chọn Play chúng sẽ mất khá nhiều thời gian hãy nhâm nhi 1 tách cà phê hẳn sẽ rất tuyệt vời đấy . CreatML sẽ bắt đầu đào tạo mô hình cho bạn! 

![](https://images.viblo.asia/a36e83a4-9df5-4e38-a14f-8863a0d1826a.png)
<div align="center">
<b>Hình 4:  CreateML đang xây dựng mô hình phân loại.</b>
</div>

Sau khi quá trình đào tạo mô hình hoàn thành, tiếp đến sẽ kiểm nghiệm độ chính xác của mô hình, tất cả sẽ được biểu thị trên biểu đồ một cách trực quan và chúng ta sẽ nói  sau về nó.

## Kết hợp mô hình vào trong ứng dụng
Đầu tiên chúng ta sẽ cần làm một vài thứ để ứng dụng có thể hoạt động với mô hình của chúng ta :
* Thêm một biến mới, phân loại cùng với mô hình phân loại:

```swift
private let classifier = VisionClassifier(mlmodel: BananaOrApple().model)
```
* Tại ViewDidLoad() đặt delegate cho classfier 
```swift
classifier?.delegate = self
```
* Kết hợp với function phục vụ mục đính ví dụ của chúng ta
```swift
private func classifyImage() {
        if let classifier = self.classifier, let image = inputImage {
            classifier.classify(image)
            classifyImageButton.disable()
        }
    }
```

* Tiếp đến hãy tạo lớp VisionClassifier theo code sau đây :

```swift
import UIKit
import CoreML
import Vision

extension VNImageRequestHandler {
    convenience init?(uiImage: UIImage) {
        guard let ciImage = CIImage(image: uiImage) else { return nil }
        let orientation = uiImage.cgImageOrientation
        
        self.init(ciImage: ciImage, orientation: orientation)
    }
}

class VisionClassifier {
    
    private let model: VNCoreMLModel
    private lazy var requests: [VNCoreMLRequest] = {
        let request = VNCoreMLRequest(
            model: model, 
            completionHandler: { 
                [weak self] request, error in 
                self?.handleResults(for: request, error: error)
        })
        
        request.imageCropAndScaleOption = .centerCrop
        return [request]
    }()
    
    var delegate: ViewController?
    
    init?(mlmodel: MLModel) {
        if let model = try? VNCoreMLModel(for: mlmodel) {
            self.model = model
        } else {
            return nil
        }
    }
    
    func classify(_ image: UIImage) {
        DispatchQueue.global(qos: .userInitiated).async {
            guard let handler = 
                VNImageRequestHandler(uiImage: image) else { 
                    return
            }
            
            do {
                try handler.perform(self.requests)
            } catch {
                self.delegate?.summonAlertView(
                    message: error.localizedDescription
                )
            }
        }
    }
    
    func handleResults(for request: VNRequest, error: Error?) {
        DispatchQueue.main.async {
            guard let results = 
                request.results as? [VNClassificationObservation] else {
                    self.delegate?.summonAlertView(
                        message: error?.localizedDescription
                    )
                    return
            }
            
            if results.isEmpty {
                self.delegate?.classification = "Don't see a thing!"
            } else {
                let result = results[0]
                
                if result.confidence < 0.6  {
                    self.delegate?.classification = "Not quite sure..."
                } else {
                    self.delegate?.classification = 
                        "\(result.identifier) " +
                        "(\(Int(result.confidence * 100))%)"
                }
            }
            
            self.delegate?.refresh()
        }
    }
}
```
* Và cuối cùng là Extension

```swift
extension UIImage {
    var cgImageOrientation: CGImagePropertyOrientation {
        switch self.imageOrientation {
            case .up: return .up
            case .down: return .down
            case .left: return .left
            case .right: return .right
            case .upMirrored: return .upMirrored
            case .downMirrored: return .downMirrored
            case .leftMirrored: return .leftMirrored
            case .rightMirrored: return .rightMirrored
        }
    }
}}
```
Code này xuất phát trực tiếp từ [tài liệu](https://developer.apple.com/documentation/imageio/cgimagepropertyorientation) Apple về việc chuyển đổi giữa các loại CGImage và UIImage.
*  Cuối cùng hãy kéo WhatsMyFruit.mlmodel file vào thư mục gốc của dự án.

Bây giờ bạn có thể khởi chạy ứng dụng bằng simulator. Bạn có thể chọn một hình ảnh (hoặc chụp ảnh nếu bạn đang chạy nó trên một thiết bị thực), thấy hình ảnh đã chọn trong chế độ xem hình ảnh, sau đó bấm vào nút Classify image để yêu cầu mô hình phân loại. Bạn sẽ thấy label sẽ cập nhật với dữ liệu mô hình trả về cho bạn.

![](https://images.viblo.asia/9d66ff1a-3449-4d2c-b10d-fec3f8afe24a.png)
<div align="center">
<b>Hình 5: minh họa một ví dụ về các loại hình ảnh trong bộ dữ liệu.</b>
</div>

## Cải thiện ứng dụng

Tất nhiên, bạn có thể làm cho ứng dụng có thể phân loại nhiều hơn chỉ là chuối và táo. Bạn còn nhớ tập dữ liệu mà chúng ta đã có với tất cả 103 lớp trái cây (nhãn) khác nhau và chắc hẳn bạn cũng đã hình dung ra tiếp theo chúng ta sẽ làm gì rồi đấy :joy: . 

Xây dựng mô hình phân loại hình ảnh mới bằng ứng dụng CreatML, nhưng thay vào đó chúng ta sẽ chọn toàn bộ dữ liệu phục vụ trainning đã chuẩn bị. Việc đơn giản tiếp theo là chúng ta chỉ cần kéo mô hình dữ liệu vào Xcode và thay vì sử dụng mô hình trước đây 
```
private let classifier = VisionClassifier(mlmodel: BananaOrApple().model)
```
sẽ được thay thế thành
```
private let classifier = VisionClassifier(mlmodel: Fruits360().model)
```

Sau đó, bạn đã có thể khởi chạy lại ứng dụng của mình với mô hình phân loại 103 loại trái cây khác nhau.

## Tổng kết
CreatML, Framework CoreML và Vision giúp chúng ta tiếp cận một cách dễ dàng với bài toán phân loại dựa trên tập dữ liệu của bạn.

Nếu bạn quan tâm có thể giam khảo source code tại [đây](https://github.com/cuonghx-0882/imageClassifierDemo)