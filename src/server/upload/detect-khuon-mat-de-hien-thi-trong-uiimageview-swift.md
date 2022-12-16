![](https://images.viblo.asia/2739b386-165e-4bbc-9524-e20f9766573f.png)
# 1. Vấn đề.
Sau quá trình làm việc, chúng ta thường hiển thị hình ảnh có tỉ lệ khác nhau với UIImageView với tỉ lệ khung hình cố định. 

Hình ảnh dưới đây minh hoạ vấn đề này: 
* Ở bên trái, bạn có thể thấy hình ảnh khi chưa bị cắt. 
* Ở giữa, bạn có thể thấy điều xảy ra nếu bạn cố gắng hiển thị nó trong UIimageView với tỉ lệ khung hình cố định.

![](https://images.viblo.asia/7a065429-e684-47f1-8adb-d150c7952f09.png)

ImageView hiện tại đang được đặt `aspectFill` ratio nên nó sẽ crop top và bottom theo chiều dọc của bức ảnh. Người dùng sẽ chỉ nhìn được nội dung bên trong viền đỏ. 
Do đó người dùng không thể nhìn thấy khuôn mặt của người trong bức ảnh làm ảnh hưởng lớn tới trải nghiệm của người dùng.

Thật may từ iOS 1, Apple có giới thiệu Vision Framework giúp detect khuôn mặt giúp ích khắc phục vấn đề này.

# 2. Giải pháp.
Chúng ta sẽ sử dụng Vision framework để detect và căn giữa khuôn mặt có trong bức ảnh. Trước hết hãy tìm hiểu qua về Vision API:
* [VNImageRequestHandler ](https://developer.apple.com/documentation/vision/vnimagerequesthandler) cho phép bạn phân tích hình ảnh bằng cách gọi hàm `perform(_:)` và truyền vào một mảng các request thoả mãn VNRequest protocol

* [VNDetectFaceRectanglesRequest ](https://developer.apple.com/documentation/vision/vndetectfacerectanglesrequest) là một trong các loại request đó.  Nó chỉ định một request cho phép chúng ta tìm khuôn mặt và toạ độ của nó trong ảnh. 

* [VNFaceObservation](https://developer.apple.com/documentation/vision/vnfaceobservation) là một type observation để hiện kết quả từ `VNDetectFaceRectanglesRequest`

### 2.1: Detect thông tin khuôn mặt.
Hãy bắt đầu với `VNFaceObservation` với mỗi khuôn mặt trong bức ảnh và đừng lo lắng về crop logic của nó.  
```swift
import Foundation
import Vision

public extension CGImage {
    @available(iOS 11.0, *)
    func faceCrop(_ completion: @escaping (FaceCropResult) -> Void) {
        
        // 1
        let req = VNDetectFaceRectanglesRequest { request, error in
                                                 
            // 2                                     
            if let error = error {
                completion(.failure(error))
                return
            }
                                                 
            // 3   
            guard let results = request.results else {
                completion(.notFound)
                return
            }
            
            // 4                                    
            var faces: [VNFaceObservation] = []
            for result in results {
                guard let face = result as? VNFaceObservation else { continue }
                faces.append(face)
            }
            
            // 5                                     
            print(faces.count)
            completion(.success(self))
        }
        
        // 6
        do {
            try VNImageRequestHandler(cgImage: self, options: [:]).perform([req])
        } catch let error {
            completion(.failure(error))
        }
    }
}

public enum FaceCropResult {
    case success(CGImage)
    case notFound
    case failure(Error)
}
```

Giải thích cho đoạn code trên:

1. Chúng ta sẽ khởi tạo một `VNDetectFaceRectanglesRequest`.
2. Nếu vì một vài lí do request chúng ta trả về lỗi nó sẽ kết thúc với `.failure`.
3. Nếu không có khuôn mặt nào được tìm thấy sẽ return `.notFound`.
4. Chúng ta kết quả và tạo 1 mảng các khuôn mặt được tìm thấy.
5. In ra số lượng khuôn mặt đã detect ra được và return `.success`
6. Cuối cùng, chúng ta gọi `VNDetectFaceRectanglesRequest` sử dụng hàm `perform(_:)` 


### 2.2: Crop ảnh.
Tiếp theo chúng ta sẽ crop ảnh theo các thông tin đã lấy được ở bước trên.

``` swift
import Foundation
import Vision

public extension CGImage {
    @available(iOS 11.0, *)
    func faceCrop(margin: CGFloat = 200, completion: @escaping (FaceCropResult) -> Void) {
        let req = VNDetectFaceRectanglesRequest { request, error in
            if let error = error {
                completion(.failure(error))
                return
            }
            
            guard let results = request.results else {
                completion(.notFound)
                return
            }
            
            var faces: [VNFaceObservation] = []
            for result in results {
                guard let face = result as? VNFaceObservation else { continue }
                faces.append(face)
            }
            
            // 1                                     
            let croppingRect = self.getCroppingRect(for: faces, margin: margin)
                                                 
            // 10                                         
            let faceImage = self.cropping(to: croppingRect)
            
            // 11                                      
            guard let result = faceImage else {
                completion(.notFound)
                return
            }
            
            // 12                                    
            completion(.success(result))
        }
        
        do {
            try VNImageRequestHandler(cgImage: self, options: [:]).perform([req])
        } catch let error {
            completion(.failure(error))
        }
    }
    
    @available(iOS 11.0, *)
    private func getCroppingRect(for faces: [VNFaceObservation], margin: CGFloat) -> CGRect {
        
        // 2
        var totalX = CGFloat(0)
        var totalY = CGFloat(0)
        var totalW = CGFloat(0)
        var totalH = CGFloat(0)
        
        // 3
        var minX = CGFloat.greatestFiniteMagnitude
        var minY = CGFloat.greatestFiniteMagnitude
        let numFaces = CGFloat(faces.count)
        
        // 4
        for face in faces {
            
            // 5
            let w = face.boundingBox.width * CGFloat(width)
            let h = face.boundingBox.height * CGFloat(height)
            let x = face.boundingBox.origin.x * CGFloat(width)
            
            // 6
            let y = (1 - face.boundingBox.origin.y) * CGFloat(height) - h
            
            totalX += x
            totalY += y
            totalW += w
            totalH += h
            minX = .minimum(minX, x)
            minY = .minimum(minY, y)
        }
        
        // 7
        let avgY = totalY / numFaces
        let avgW = totalW / numFaces
        let avgH = totalH / numFaces
        
        // 8
        let offset = margin + avgX - minX
        
        // 9
        return CGRect(x: avgX - offset, y: avgY - offset, width: avgW + (offset * 2), height: avgH + (offset * 2))
    }
}

public enum FaceCropResult {
    case success(CGImage)
    case notFound
    case failure(Error)
}
```

Hãy giải thích về đoạn code trên: 

1.  Nhiệm vụ của hàm này là trả về một `CGRect` cho chúng ta biết làm thế nào để crop ảnh.
2.  Khởi tạo các biến `total..` rất quan trọng trong TH tìm ra nhiều khuôn mặt.
3.  Biến `minX` và `minY` sử dụng để  theo dõi khuôn mặt xa nhất phía dưới bên trái trong bức ảnh.
4.  Giờ chúng ta hãy lặp tất cả các khuôn mặt chúng ta có thể nhận dạng.
5.  `face.boundingBox.width` trả về giá trị khoảng 0 -> 1 đại diện cho chiều rộng khuôn mặt tương ứng với toàn bộ chiều rộng của ảnh. Chúng ta nhân số đó với chiều rộng để có chiều rộng tuyệt đối của khuôn mặt. tương tự với các kích thước khác.
6.   Sự chuyển đổi không gian tọa độ này cũng có vẻ hơi khó hiểu. Đầu tiên, chúng ta thực hiện `1 - face.boundsBox.origin.y` để lấy vị trí y tương đối từ trên cùng thay vì dưới cùng của hình ảnh. Sau đó, chúng tôi nhân số đó với chiều cao và trừ `h` để biểu thị chính xác tọa độ `y` tuyệt đối trong không gian tọa độ lật cho quá trình khởi tạo CGRect của chúng tôi sau này.
7.  Tính tọa độ chiều rộng, chiều cao, x và y trung bình của các khuôn mặt bằng cách chia cho `total...`  của chúng ta cho số khuôn mặt trong hình ảnh.
8.  Chúng ta tính toán spacing chúng ta muốn thêm xung quanh khuôn mặt. 
9.  Chúng ta có thể sử dụng offset và trung bình để tạo khung cắt hình ảnh.
10.  Sử dụng CGRect để cắt hình ảnh
11.  Trả về `.notFount` nếu `cropping(to rect: CGRect)` trả về nil.
12.  Trả về `.success` với bức ảnh với khuôn mặt ở giữa.

![](https://images.viblo.asia/33fd4017-f03b-43fa-908e-653882f720b1.png)

### 2.3: Thực hiện.
Bây giờ bạn quay lại với ViewController và xem tác dụng của Extension nhé:

``` swift
func faceCenterImage(_ image: UIImage) {
    
    // 1
    guard let uncroppedCgImage = image.cgImage else {
        imageView.image = image
        return
    }

    // 2
    DispatchQueue.global(qos: .userInteractive).async {
        uncroppedCgImage.faceCrop { [weak self] result in
            switch result {
            case .success(let cgImage):
                // 3
                DispatchQueue.main.async { self?.imageView.image = UIImage(cgImage: cgImage) }
            case .notFound, .failure( _):
                // 4
                DispatchQueue.main.async { self?.imageView.image = image }
            }
        }
    }
}
```

1. Trước hết, chúng tôi lấy `CGImage` từ `UIImage` của chúng ta. Nếu điều đó không hiệu quả, chúng ta chỉ hiển thị hình ảnh ban đầu chưa được crop.
2. Sau đó, chúng ta chuyển sang global queue với mức ưu tiên `.userInteractive` cao nhất để gọi phương thức `ourfaceCrop ()`.
3. Nếu việc crop khuôn mặt thành công, sau đó chúng ta chuyển trở lại queue chính và hiển thị ảnh đã crop.
4. Nếu hàm `faceCrop ()` của chúng ta không tìm thấy bất kỳ khuôn mặt nào hoặc  crop image vì một số lý do khác, chúng ta chỉ hiển thị hình ảnh ban đầu chưa được cắt.


### Nguồn: 
https://medium.com/ancestry-engineering/image-face-centering-using-apples-vision-framework-3ff3954ab5cb