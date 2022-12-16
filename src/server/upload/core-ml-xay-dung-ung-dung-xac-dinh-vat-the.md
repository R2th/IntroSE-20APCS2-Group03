## 1 - Core ML là gì?
 Core ML là một frame work về machine learning được ra mắt tại WWDC 2017. Core ML giúp sử dụng các “Trained models” trong các ứng dụng chỉ với vài dòng code với một hiệu năng tuyệt vời.
## 2. Xây dựng ứng dụng
### Core ML Model : 
 Đây là định dạng của trained model được sử dụng trong Core ML.
 Để có model sử dụng trong app, chúng ta có thể chuyển đổi rất nhiều các dạng trained model phổ biến có sắn sang Core ML model bằng Core ML Tools ( chi tiết xem tại [đây](https://developer.apple.com/documentation/coreml/converting_trained_models_to_core_ml) ).
 
 Trong project này mình sử dụng Inception V3 (một model cho phép xác định hơn 1000 các nhóm đối tượng khác nhau trên ảnh như cây cối, động vật, thức ăn …). Các bạn có thể tải Model này cũng như một số model khác ngay tại https://developer.apple.com/machine-learning/.
 
 Để đưa model vào project chúng ta chỉ việc kéo chúng vào, khi click vào model chúng ta có thể thấy được input và output của chúng.
 ### Cài đặt Vision với Core ML Model
Khi kéo model vào project, xcode đã tự động tạo ra các file code liên quan, việc còn lại của chúng ta chỉ là viết nốt vài dòng code :D, đầu tiên chúng ta cần tạo một biến *VNCoreMLRequest* : 
```Swift
lazy var classificationRequest: VNCoreMLRequest = {
        do {

            let model = try VNCoreMLModel(for: Inceptionv3().model)
            
            let request = VNCoreMLRequest(model: model, completionHandler: { [weak self] request, error in
                self?.processClassifications(for: request, error: error)
            })
            request.imageCropAndScaleOption = .centerCrop
            return request
        } catch {
            fatalError("Failed to load Vision ML model: \(error)")
        }
    }()
```
Trong đó *processClassifications* là hàm xử lý dữ liệu trả về :
```Swift
func processClassifications(for request: VNRequest, error: Error?) {
        DispatchQueue.main.async {
            guard let results = request.results else {
                return
            }
            // The `results` will always be `VNClassificationObservation`s, as specified by the Core ML model in this project.
            let classifications = results as! [VNClassificationObservation]
            
            if classifications.isEmpty {
                return
            } else {
                let topClassifications = classifications.prefix(2)
                let descriptions = topClassifications.map { classification in
                    return String(format: "  (%.2f) %@", classification.confidence, classification.identifier)
                }
                self.answerLabel.text = "Classification:\n" + descriptions.joined(separator: "\n")
            }
        }
    }
```
### Chạy Vision Request :
Cuối cùng là gọi request :
```Swift
DispatchQueue.global(qos: .userInitiated).async {
            let handler = VNImageRequestHandler(ciImage: ciImage, orientation: orientation)
            do {
                try handler.perform([self.classificationRequest])
            } catch {
                print("Failed to perform classification.\n\(error.localizedDescription)")
            }
        }
```
## Kết quả
 Và đây là kết quả thu được :
 
![](https://images.viblo.asia/7fb8832b-df72-46b7-86bc-4f2a1c8943ed.jpg)
![](https://images.viblo.asia/6cb7f770-1b58-449e-aaf6-c519ade0506e.jpg)
![](https://images.viblo.asia/171d9c31-eb34-4ad1-8ce5-da0c7041aa99.jpg)

ref : 

https://developer.apple.com/documentation/coreml                                             
https://developer.apple.com/documentation/vision/classifying_images_with_vision_and_core_ml                                  
https://www.raywenderlich.com/164213/coreml-and-vision-machine-learning-in-ios-11-tutorial