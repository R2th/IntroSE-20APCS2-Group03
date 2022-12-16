Công nghệ điều chỉnh gene đã ra đời từ khoảng những năm 2012, vậy tại sao chúng ta vẫn chưa có siêu năng lực? 
Và siêu năng lực tuyệt vời nhất là gì? Không, không phải là khả năng bay, như vậy thì nguy hiểm quá.
Câu trả lời là khả năng phóng tia laser bằng mắt.
Tưởng tượng với khả năng này, bạn có thể tiết kiệm được bao nhiêu là chi phí, thắp sáng, nấu ăn không cần dùng bếp ga, hay cho gã trưởng phòng mà bạn không ưa vài vết sẹo nho nhỏ.

Thực tế thì siêu năng lực vẫn chưa trở thành hiện thực, cho nên tạm thời thứ xa nhất mà bạn có thể làm được là phóng tia laser bằng mắt trên chiếc iphone của bạn.
Và đó chính là lý do mà bạn cần tìm hiểu về thư viện Vision của Apple.

Trong hướng dẫn này, bạn sẽ học cách sử dụng Vision framework để:
- Tạo yêu cầu phát hiện khuôn mặt và phát hiện các mốc khuôn mặt. 
- Xử lý các yêu cầu này. 
- Xếp chồng các kết quả trên nguồn cấp dữ liệu camera để có được phản hồi trực quan, thời gian thực. 

Hãy sẵn sàng để sử dụng  siêu năng lực bằng bộ não và đôi mắt của bạn!

# **Pattern của Vision Framework**

Tất cả các API Vision framework sử dụng ba cấu trúc:

***Request***:  Yêu cầu xác định loại điều bạn muốn phát hiện và trình xử lý hoàn thành sẽ xử lý kết quả. Đây là một lớp con của VNRequest.
***Request Handle***:  Trình xử lý request thực hiện yêu cầu trên bộ đệm pixel được cung cấp (think: image). Đây sẽ là một VNImageRequestHandler cho các lần phát hiện một lần duy nhất hoặc một VNSequenceRequestHandler để xử lý một loạt hình ảnh.
***Result***: Kết quả sẽ được đính kèm với request ban đầu và được chuyển đến completion handler  được xác định khi tạo yêu cầu. Chúng là  lớp con của VNObservation
Đơn giản phải không?

### Giờ thì bắt tay vào code thôi ****

Tạo request :

```
let faceDetectionRequest = VNDetectFaceRectanglesRequest(completionHandler: { (request, error) in
    
    if error != nil {
        print("FaceDetection error: \(String(describing: error)).")
    }
    
    guard let faceDetectionRequest = request as? VNDetectFaceRectanglesRequest,
        let results = faceDetectionRequest.results as? [VNFaceObservation] else {
            return
    }
    DispatchQueue.main.async {
        // Add the observations to the tracking list
        for observation in results {
            let faceTrackingRequest = VNTrackObjectRequest(detectedObjectObservation: observation)
            requests.append(faceTrackingRequest)
        }
        self.trackingRequests = requests
    }
})

```

Giờ thì tạo Request handler nào: 

```
let imageRequestHandler = VNImageRequestHandler(cvPixelBuffer: pixelBuffer,
                                                orientation: exifOrientation,
                                                options: requestHandlerOptions)

do {
    guard let detectRequests = self.detectionRequests else {
        return
    }
    try imageRequestHandler.perform(detectRequests)
} catch let error as NSError {
    NSLog("Failed to perform FaceRectangleRequest: %@", error)
}
```

VNImageRequestHandler xử lý phát hiện khuôn mặt và đối tượng trong ảnh tĩnh, nhưng nó không mang thông tin từ khung hình này sang khung hình tiếp theo. Để theo dõi một đối tượng, hãy tạo một VNSequenceRequestHandler, có thể xử lý VNTrackObjectRequest

### Theo dõi khuôn mặt đã được track ra ****

Nếu bạn đã có được hình ảnh khuôn mặt cần nhận diện. Đẩy nó vào cho chuỗi Request handle để tiến hành tracking 

```
    try self.sequenceRequestHandler.perform(requests,
                                         on: pixelBuffer,
                                         orientation: exifOrientation)
```

Nếu tracker đã tìm thấy một khuôn mặt, hãy tạo một trình xử lý yêu cầu hình ảnh để phát hiện khuôn mặt. Khi phát hiện đó thành công và bạn có một quan sát khuôn mặt, hãy theo dõi nó bằng cách tạo một VNTrackObjectRequest.

```
// Setup the next round of tracking.
var newTrackingRequests = [VNTrackObjectRequest]()
for trackingRequest in requests {
    
    guard let results = trackingRequest.results else {
        return
    }
    
    guard let observation = results[0] as? VNDetectedObjectObservation else {
        return
    }
    
    if !trackingRequest.isLastFrame {
        if observation.confidence > 0.3 {
            trackingRequest.inputObservation = observation
        } else {
            trackingRequest.isLastFrame = true
        }
        newTrackingRequests.append(trackingRequest)
    }
}
```

Sau đó gọi hàm perform (_ :) của sequence handler. Phương pháp này chạy đồng bộ, do đó, sử dụng  background queue để tránh dead block main queue khi thực thi và chỉ gọi lại main queue nếu bạn cần thực hiện cập nhật giao diện người dùng như vẽ các khung hình hay đường đi, vv...
Rất đơn giản phải không?
Chúc bạn áp dụng thành công!