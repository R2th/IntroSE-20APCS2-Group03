Ở bài viết này, mình sẽ giới thiệu và hướng dẫn cho các bạn một thư viện mới do Apple giới thiệu từ iOS 13, nó có thể giúp các bạn có thể nhận dạng được văn bản. Đó là VisionKit.<br>
Let's go!!!
# 1. Xin quyền người dùng
Để thực hiện việc này, trong tệp `Info.plist`, chúng  ta thêm `Privacy — Camera Usage Description` và `Privacy - Photo Library Usage Description`, cùng  một đoạn văn bản sẽ được hiển thị cho người dùng khi họ yêu cầu quyền chụp ảnh hoặc là quyền chọn ảnh từ thư viện. <br>
Ví dụ:
```
    <key>NSCameraUsageDescription</key>
    <string>This app wants to take a photos.</string>
    <key>NSPhotoLibraryUsageDescription</key>
    <string>This app wants to use your photos.</string>
```

# 2. Giao diện
Giao diện mình vẽ đơn giản chỉ có 1 UIImageView, 1 TextView và 1 Button, trong đó:
* UIImageView sẽ hiển thị hình ảnh được chọn.
* TextView để hiển thị văn bản sau khi được nhận dạng.
* Button để tải các hình ảnh lên thông qua việc chụp ảnh hoặc lấy ảnh từ thư viện.

![](https://images.viblo.asia/2b905bfc-d1d0-4167-9819-2814c23a85b0.png)
# 3. Xử lý các sự kiện
Tại ViewController, đầu tiên mình xử lý sự kiện cho button Upload. Ở đây mình sẽ hiển thị ActionSheet có lựa chọn lấy ảnh từ thư viện hoặc thực hiện việc chụp ảnh.
```
@IBAction func onUpload(_ sender: Any) {
        let optionMenu = UIAlertController(title: nil, message: "Option", preferredStyle: .actionSheet)
        let deleteAction = UIAlertAction(title: "Take a photo", style: .default) {
            _ in
            self.openCamera()
        }
        let saveAction = UIAlertAction(title: "Gallery", style: .default) {
            _ in
            self.openGallery()
        }
        let cancelAction = UIAlertAction(title: "Cancel", style: .cancel)
        optionMenu.addAction(deleteAction)
        optionMenu.addAction(saveAction)
        optionMenu.addAction(cancelAction)
        self.present(optionMenu, animated: true, completion: nil)
    }
```
Tiếp theo, mình xử lý cho việc present tới thư viện ảnh, ở đây mình sử dụng UIImagePickerController.<br> Các bạn cũng có thể present tới thao tác chụp ảnh bằng cách thay SourceType là `camera`.
```
func openGallery() {
        if UIImagePickerController.isSourceTypeAvailable(.photoLibrary) {
            self.imagePicker.allowsEditing = true
            self.imagePicker.modalPresentationStyle = .fullScreen
            self.imagePicker.sourceType = .photoLibrary
            self.present(self.imagePicker, animated: true, completion: nil)
        }
    }
```

Xử lý callback sau khi chọn ảnh từ thư viện hoặc chụp ảnh thông qua UIImagePickerControllerDelegate, tại đây mình sẽ gọi hàm xử lý nhận dạng văn bản.

```
func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        guard let image = info[.originalImage] as? UIImage else {
            return
        }
        self.imageView.image = image
        self.handleImage(image)
        self.imagePicker.dismiss(animated: true, completion: nil)
    }
```
# 4. Nhận dạng văn bản
Để nhận dạng và phân tích các hình ảnh, mình sử dụng VNRecognizeTextRequest, Vision sẽ trả về yêu cầu nhận dạng thông qua VNRecognizedTextObservation.<br>
Đầu tiên, mình sẽ thiết lập các config:
* recognitionLevel: Đặt giá trị để xác định xem yêu cầu ưu tiên về độ chính xác hay là tốc độ nhận dạng. Nếu thiết lập nó là:
1. .fast: Ưu tiên tốc độ hơn là độ chính xác
2. .accurate: Ưu tiên về độ chính xác, nhận dạng sẽ lâu hơn.
* recognitionLanguages: Xác định thứ tự các ngôn ngữ sử dụng trong quá trình xử lý và nhận dạng văn bản.
* usesLanguageCorrection: Vision sẽ áp dụng hiệu chỉnh ngôn ngữ trong quá trình nhận dạng, nếu đặt giá trị này là false thì hiệu suất cao hơn, nhưng kết quả sẽ kém chính xác hơn.

VNRecognizedTextObservation sẽ có nhiệm vụ lấy ra được các văn bản được trả về. <br>
Vì nó có thể trả về rất nhiều bản ghi, nên mình có thông số topCandidates tượng trưng cho việc trả về bao nhiêu bản ghi request thành công.
```
private func config() {
        ocrRequest.recognitionLevel = .accurate
        ocrRequest.recognitionLanguages = ["vi", "en"]
        ocrRequest.usesLanguageCorrection = true
        ocrRequest = VNRecognizeTextRequest { (request, error) in
            guard let observations = request.results as? [VNRecognizedTextObservation] else { return }
            
            var ocrText = ""
            for observation in observations {
                guard let topCandidate = observation.topCandidates(1).first else { return }
                
                ocrText += topCandidate.string + "\n"
            }
            
            
            DispatchQueue.main.async {
                self.textView.text = ocrText
            }
        }
    }
```
Sau khi nhận được các observations, bản thân nó là VNRecognizedText, mình tiến hành lấy string rồi đưa lên giao diện.<br>
Nếu bạn cần độ tin cậy, bạn có thể lấy thêm thông số `confidence`.
# 5. Tạo yêu cầu xử lý hình ảnh
Cuối cùng sau khi có thiết lập các config, khi chọn ảnh từ thư viện hay là chụp ảnh, mình sẽ tạo một yêu cầu để bắt đầu việc xử lý nhận dạng văn bản.
```
private func handleImage(_ image: UIImage) {
        guard let cgImage = image.cgImage else { return }
        
        textView.text = ""
        imageView.image = image
        
        let requestHandler = VNImageRequestHandler(cgImage: cgImage, options: [:])
        do {
            try requestHandler.perform([self.ocrRequest])
        } catch {
            print(error)
        }
    }
```
Bạn nên sử dụng thuộc tính cgImage của hình ảnh để có kết quả tốt nhất.<br>
Sau khi bạn tạo và thực hiện yêu cầu, Vision sẽ chạy mô hình học máy để nhận dạng văn bản trên hình ảnh, sau đó sẽ được trả về trình xử lý hoàn thành của yêu cầu.
# Kết quả
Sau khi thực hiện các bước trên, mình tiến hành chạy thử chương trình.
![](https://images.viblo.asia/05583933-11df-40d9-8b39-a9f23bfb5d04.png)
Chúc các bạn thành công!!!