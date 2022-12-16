Phần trước mình đã giới thiệu về Tensorflow thư viện hỗ trợ sử dụng ML cho IOS application nếu bạn muốn tìm hiểu có thể xem lại [tại đây](https://viblo.asia/p/xay-dung-mot-face-recognition-ios-apps-don-gian-part-1-tensorflow-QpmlegJ7Krd). Phần này mình sẽ hướng đẫn để cho ra một sản phẩm hoàn chỉnh.

# Setup tài nguyên cho Project

Ở đây nhà phát triển [Facenet](https://github.com/davidsandberg/facenet) đã xây dựng mô hình  Face Recognition kết hợp với Tensorflow chúng ta có thể download File Graph và File Load Model [ở đây](https://drive.google.com/drive/folders/1U0Lg16P4rHXH2Tyav_WFFW1Lnuig4-qh?usp=sharing) (Bản này là mình thửa được version 2017 với độ chính xác là 99.3%  mình cũng không biết tại sao tensorflow lại không update version cho ios trên cocoapod nữa chi tiết mọi người xem ở [đây](https://cocoapods.org/pods/TensorFlow-experimental)  )
<br>
- Sau khi tải về kéo thư file vào project navigation của bạn 
![](https://images.viblo.asia/750e05e2-07c7-4d76-ad33-d55e34bc9f4e.png)
- Tạo file Bridging-Header (Có thể tham khảo [Tại đây](https://www.hackingwithswift.com/example-code/language/how-to-create-an-objective-c-bridging-header-to-use-code-in-swift)) :
Thêm vào file Bridging của bạn <br>
![](https://images.viblo.asia/7674a1c5-05c9-429c-993a-2d869829de37.png)
<br>
Vậy  là xong bước setup rồi. Cùng bắt tay vào test thử thôi ! :+1:


# Bắt tay vào Coding
Tạo class FaceNet load và sử dụng graph
```
import UIKit

typealias FaceOutput = [CIImage]

// MARK: - FaceNet
final class FaceNet {
    
    private var tfFacenet: tfWrap?
    
    // MARK: - Methods
    func load() {
        clean()
        tfFacenet = tfWrap()
        tfFacenet?.loadModel("modelFacenet.pb",
                             labels: nil,
                             memMapped: false,
                             optEnv: true)
        tfFacenet?.setInputLayer("input",
                                 outputLayer: "embeddings")
    }
    
    func run(image: CIImage) -> [Double] {
        let inputEdge = 160
        guard let tfFacenet = tfFacenet,
            let resize = image.resizeImage(newWidth: CGFloat(inputEdge),
                                           newHeight: CGFloat(inputEdge))?.cgImage else { return [] }
        let input = CIImage(cgImage: resize)
        var buffer: CVPixelBuffer?
        CVPixelBufferCreate(kCFAllocatorDefault,
                            inputEdge,
                            inputEdge,
                            kCVPixelFormatType_32BGRA,
                            [String(kCVPixelBufferIOSurfacePropertiesKey): [:]] as CFDictionary,
                            &buffer)
        if let buffer = buffer { CIContext().render(input, to: buffer) }
        guard let network_output = tfFacenet.run(onFrame: buffer) else { return [] }
        let output = network_output.compactMap {
            ($0 as? NSNumber)?.doubleValue
        }
        return output
    }
    
    func clean() {
        tfFacenet?.clean()
        tfFacenet = nil
    }
    
    func loadedModel() -> Bool {
        return tfFacenet != nil
    }
    
}

// MARK: - FaceDetector
final class FaceDetector {
    
    private let faceDetector = CIDetector(ofType: CIDetectorTypeFace,
                                          context: nil,
                                          options: [ CIDetectorAccuracy: CIDetectorAccuracyLow ])
    
    func extractFaces(frame: CIImage) -> FaceOutput {
        guard let features = faceDetector?.features(in: frame,
                                                    options: [CIDetectorSmile: true]) as?
                                                        [CIFaceFeature] else {
                                                        return []
        }
        return features.map({ (f) -> CIImage in
            let rect = f.bounds
            let cropped = frame.cropped(to: rect)
            let face = cropped.transformed(by: CGAffineTransform(translationX: -rect.origin.x,
                                                                 y: -rect.origin.y))
            return face
        })
    }
}
```
<br>

Đã có Facnet để load và sử dụng mô hình bây giờ bắt tay vào sử dụng thôi !
- Đầu tiên chúng ta sẽ khởi tạo dữ liệu gốc là vectors chứa tất cả dữ liệu của mọi người .
- Đã có dữ liệu rồi bây giờ chúng ta thực hiện nhận diện ảnh của một người đã có trong dữ liệu gốc.
- Và bùm --> kết quả trả về "Trump" 

```
            let fnet = FaceNet()
            let fDetector = FaceDetector()
            fnet.load()
            
            var vectors = [Vector]()
            
            vectors.append(Vector(name: "Trump",
                                  vector: fnet.run(image: fDetector
                                    .extractFaces(frame: CIImage(image: UIImage(named: "trump2")!)!)
                                    .first!)))
            vectors.append(Vector(name: "Trump",
                                  vector: fnet.run(image: fDetector
                                    .extractFaces(frame: CIImage(image: UIImage(named: "trump3")!)!)
                                    .first!)))
            vectors.append(Vector(name: "TA",
                                  vector: fnet.run(image: fDetector
                                    .extractFaces(frame: CIImage(image: UIImage(named: "hotgirlTA")!)!)
                                    .first!)))
            vectors.append(Vector(name: "Nene",
                                  vector: fnet.run(image: fDetector
                                    .extractFaces(frame: CIImage(image: UIImage(named: "nene1")!)!)
                                    .first!)))
            vectors.append(Vector(name: "Nene",
                                  vector: fnet.run(image: fDetector
                                    .extractFaces(frame: CIImage(image: UIImage(named: "nene2")!)!)
                                    .first!)))
            vectors.append(Vector(name: "Ribi",
                                  vector: fnet.run(image: fDetector
                                    .extractFaces(frame: CIImage(image: UIImage(named: "ribi")!)!)
                                    .first!)))
            
            let targetVector = fnet.run(image: fDetector
                .extractFaces(frame: CIImage(image: UIImage(named: "trump1")!)!)
                .first!)
            
            var result = Vector(name: "",
                                vector: [],
                                distance: 10)
            
            for vector in vectors {
                let distance = self.l2distance(targetVector, vector.vector)
                if distance < result.distance {
                    result = vector
                    result.distance = distance
                }
            }
            
            print(result.name)
        }
```
<br>

Và kết quả đúng như mong đợi 
![](https://images.viblo.asia/e221b993-3204-4861-96d8-da162adc9d80.png)

# Kết luận
Đây mới chỉ là một ví dụ đơn giản về Face Recognition hỗ trợ nhận diện một người và chưa thật sự tối ưu. Việc phát triển thêm còn phải phụ thuộc vào bài toán và mục đích sử dụng của bạn .
<br>
Các bạn có thể tải source code ở [đây](https://github.com/cuonghx2709/SimpleFacenet)