Khi bạn cần download gì đó từ server, khi thực hiện 1 hàm tính toán đủ lâu thì việc hiển thị 1 progress bar để người dùng biết tiến trình đến đâu là rất cần thiết.Thế nhưng với những progress bar hay activity indicator mặc định khiến bạn cảm thấy nhàm chán. Vậy bài hôm nay mình sẽ hướng dẫn các bạn làm 1 circle loading animation đơn giản.

Và đây chính là thành quả của chúng ta sau khi hoàn thành

![](https://images.viblo.asia/a7071b0d-7738-455d-81a3-7673b89ef553.gif)

Tạo mới 1 project, vì bài này cũng đơn giản nên giao diện mình sẽ dùng code

Chúng ta sẽ dùng `CAShapeLayer` để vẽ ra vòng tròn
và như ở trên thì chúng ta sẽ phải có 2 vòng tròn, 1 là màu xám (trackLayer) và 1 là màu đỏ (shapeLayer) để hiển thị progress
đầu tiên là định nghĩa đường tròn chúng ta cần vẽ

```
        let circularPath = UIBezierPath(arcCenter: view.center, radius: 100, startAngle: -CGFloat.pi / 2, endAngle: 2 * CGFloat.pi, clockwise: true)
```

tiếp đến là vẽ đường tròn màu xám dựa theo circularPath ta vừa định nghĩa 
```
       let trackLayer = CAShapeLayer()
        trackLayer.path = circularPath.cgPath
        trackLayer.fillColor = UIColor.clear.cgColor
        trackLayer.strokeColor = UIColor.lightGray.cgColor
        trackLayer.lineWidth = 10
        trackLayer.lineCap = kCALineCapRound
```

sau đó là đường tròn màu đỏ (progress)
```
        let shapeLayer = CAShapeLayer()
        shapeLayer.path = circularPath.cgPath
        shapeLayer.fillColor = UIColor.clear.cgColor
        shapeLayer.strokeColor = UIColor.red.cgColor
        shapeLayer.lineWidth = 10
        shapeLayer.strokeEnd = 0
        shapeLayer.lineCap = kCALineCapRound
```

add cả 2 layer vào view
```
        view.layer.addSublayer(trackLayer)
        view.layer.addSublayer(shapeLayer)

```
sau đó ta add 1 addGestureRecognizer vào view để mỗi khi tap sẽ bắt đầu download file
```
        view.addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(handleTap)))
```

viết hàm handleTap
```
    @objc private func handleTap() {
        let urlString = "https://firebasestorage.googleapis.com/v0/b/firestorechat-e64ac.appspot.com/o/intermediate_training_rec.mp4?alt=media&token=e20261d0-7219-49d2-b32d-367e1606500c"
        print("Attempting to animate stroke")
        shapeLayer.strokeEnd = 0
        let configuration = URLSessionConfiguration.default
        let operationQueue = OperationQueue()
        let urlSecssion = URLSession(configuration: configuration, delegate: self, delegateQueue: operationQueue)
        guard let url = URL(string: urlString) else {
            return
        }
        let downLoadTask = urlSecssion.downloadTask(with: url)
        downLoadTask.resume()        
    }
```

và đường nhiên không thể thiếu implement `URLSessionDownloadDelegate`
```
extension ViewController: URLSessionDownloadDelegate {
    func urlSession(_ session: URLSession, downloadTask: URLSessionDownloadTask, didWriteData bytesWritten: Int64, totalBytesWritten: Int64, totalBytesExpectedToWrite: Int64) {
        let percentage = CGFloat(totalBytesWritten) / CGFloat(totalBytesExpectedToWrite)
        
        DispatchQueue.main.async {
            self.percentageLabel.text = "\(Int(percentage * 100))%"
            self.shapeLayer.strokeEnd = percentage
        }
        
        print(percentage)
    }
    func urlSession(_ session: URLSession, downloadTask: URLSessionDownloadTask, didFinishDownloadingTo location: URL) {
        print("Finished downloading file")
    }
}
```


thêm 1 label để hiển thị phần trăm dowload đc ở giữa vòng tròn
```
    let percentageLabel: UILabel = {
        let label = UILabel()
        label.text = "Start"
        label.textAlignment = .center
        label.font = UIFont.boldSystemFont(ofSize: 32)
        return label
    }()
```
và để ở viewDidLoad
```
        view.addSubview(percentageLabel)
        percentageLabel.frame = CGRect(x: 0, y: 0, width: 100, height: 100)
        percentageLabel.center = view.center
```

Vậy là đã xong, các bạn hãy chạy thử và xem kết quả có giống với mình không nhé.

các bạn có thể tham khảo code của mình ở [đây](https://github.com/phungvantung/CircleProgress) nhé