Hiện nay rất nhiều ứng dụng điện thoại cần sử dụng chức năng nhận diện hình ảnh.
Vision Framework là thư viện do chính Apple xây dựng, được giới thiệu đến với các developer tại WWDC 2017, với kỳ vọng sẽ giúp các lập trình viên xử lý vấn đề nhận diện hình ảnh đối với các thiết bị của Apple. Thư viện này cung cấp các giái pháp nhận diện văn bản, nhận diện khuôn mặt, xử lý barcode cho đến tích hợp với CoreML. 
Hôm nay tôi sẽ giới thiệu cho bạn cách để nhận diện văn bản trong hình ảnh sử dụng thư viện Vision.

Đầu tiên bạn hãy tạo một project với Xcode, tạo một viewcontroller,  import thư viện Vision

```
import Vision
```

trong màn hình của của Viewcontroller đó bạn tạo 3 phần tử, một button, một Image View và 1 Text Field

Thêm outlet action cho button như sau 

```
@IBAction func takingPicture(_ sender: Any) {
        if UIImagePickerController.isSourceTypeAvailable(.camera) {
            self.textView.text = ""
            self.recognizedText = ""
            let vc = UIImagePickerController()
            vc.sourceType = .camera
            vc.allowsEditing = true
            vc.delegate = self
            present(vc, animated: true)
        }
    }
```

Bạn cần implement UIImagePickerControllerDelegate cho View Controller và thêm function sau  :

```
extension ViewController: UIImagePickerControllerDelegate {
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        picker.dismiss(animated: true)

        guard let image = info[.editedImage] as? UIImage else {
            print("No image found")
            return
        }
        self.imageView.image = image
        var textRecognitionRequest = VNRecognizeTextRequest(completionHandler: { (request, error) in
            if let results = request.results, !results.isEmpty {
                if let requestResults = request.results as? [VNRecognizedTextObservation] {
                    for observation in requestResults {
                        guard let candidate = observation.topCandidates(1).first else { return }
                        self.recognizedText += candidate.string
                        self.recognizedText += "\n"
                    }
                    self.textView.text = self.recognizedText
                }
            }
        })
        textRecognitionRequest.recognitionLanguages = ["vi-VN"]
        let handler = VNImageRequestHandler(cgImage: image.cgImage!, options: [:])
        do {
            try handler.perform([textRecognitionRequest])
        } catch {
            print(error)
        }
    }

}
```

Function trên sẽ bắt sự kiện user input hình ảnh đầu vào.
Trong đoạn code trên imageView sẽ dùng để hiện thị hình ảnh vừa được input và textView là Text Field chúng ta dùng để hiển thị đoạn text được detect trong hình ảnh đó. 

Như bạn có thể thấy để có thể detect được text trong hình ảnh, bạn cần khởi tạo một đối tượng VNRecognizeTextRequest, định nghĩa completion handle cho Request. Như có thể thấy ở đoạn code, kết quả của việc detect sẽ được truy cập trong trường request.resullts. 

Tiếp theo, bạn cần tạo một VNImageRequestHandle để thực hiện goị request đã được khởi tạo ở trên. 

Rất đơn giản đúng không nào? Chúc bạn áp dụng công cụ này vào công việc thành công nhé.