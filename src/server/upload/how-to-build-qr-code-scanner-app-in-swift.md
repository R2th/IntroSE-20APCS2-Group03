Ứng dụng QR Code hiện nay rất phổ biến và là xu hướng phát triển mới, chúng ta có thể thấy QR Code xuất hiện rất nhiều nơi như thanh toán, truyền tải thông tin ... Vậy với những tài nguyên có sẵn trong iOS, chúng ta cũng có thể tạo đươc một ứng dụng phụ vụ cho nhu cầu này.

# Creating a QR Code Reader App

Ứng dụng demo mà chúng ta xây dựng khác là đơn giản và dễ hiểu. Tuy nhiên trước khi bắt đầu xây dựng ứng dụng, các bạn nên hiểu một điều là bất kỳ việc scanning barcode trọng iOS, bao gồm cả QR Code hoàn toàn dựa trên việc capture video. Đó là lý do tại sao tính năng quét mã vạch (barcode scanning) được thêm vào trong AVFoundation framework. 

Ứng dụng dome hoạt động thế nào?

Hãy xem Screenshot phía dưới. Đây là giao diện người dùng, ứng dụng hoạt động khá giống việc quay video nhưng không có tính năng ghi( recording). Khi ứng dụng chạy, nó sẽ tận dụng camera sau của iPhone để phát hiện QR Code và tự động nhận diện nó. Thông tin được giải mã sẽ hiển thị ở cuối màn hình.

![](https://cdn-images-1.medium.com/max/800/1*1AgvFO3owmqyzgV_6rnrTQ.png)

Nó thật đơn giản.

Bạn tạo một simple application với hai màn hình như sau: main hình chính là QRCodeViewController, trong khi màn hình quét mã là QRScannerController.

![](https://cdn-images-1.medium.com/max/800/1*eHseeQNVgdxEeHskCjNwQw.png)

Khi ứng dụng được chạy, bạn tap vào button scan ở màn hình đầu tiên để chuyển sang chế độ quét mã vạch.

Bây giờ, bạn đã hiểu luồng của ứng dụng, chúng ta sẽ bắt đầu việc phát triển tính năng.

# Import AVFoundation Framework

Trong project demo đã tạo, UILabel được sử dụng để hiển thị thông tin được giải mã của QR Code, và nó được liên kết với MessageLabel property trong QRScannerController class. 
Như đã đề cập trước đó, chúng ta dựa vào AVFoundation framework để triển khai tính năng quét QR Code. Trước tiên, mở file QRScannerController.swift  và import framework:

```
import AVFoundation
```

Sau đó, bạn cần triển khai AVCaptureMetadataOutputObjectsDelegate protocol. Chúng ta sẽ nói về delegate này sau, bây giờ ta cần tuân thủ nó với một extension

```
extension QRScannerController: AVCaptureMetadataOutputObjectsDelegate {

}
```

Trước khi tiếp tục, hãy khai báo các biến sau trong class QRScannerController. Chúng ta sẽ lần lượt nói về chúng:

```
var captureSession = AVCaptureSession()
var videoPreviewLayer: AVCaptureVideoPreviewLayer?
var qrCodeFrameView: UIView?
```

# Implementing Video Capture

Như đã đề cập trong phần trước, việc đọc QR code hoàn toàn dựa trên việc quay video( video capture). Để thực hiện nó theo thời gian thực, việc cần làm là:

1. Tra cứu thiết bị camera sau
2. Set đầu vào AVCaptureSession object thích hợp với AVCaptureDevice để quay video

Thêm đoạn code sau vào viewDidLoad của QRScannerController class:

```
// Get the back-facing camera for capturing videos
let deviceDiscoverySession = AVCaptureDevice.DiscoverySession(deviceTypes: [.builtInDualCamera], mediaType: AVMediaType.video, position: .back)

guard let captureDevice = deviceDiscoverySession.devices.first else {
    print("Failed to get the camera device")
    return
}

do {
    // Get an instance of the AVCaptureDeviceInput class using the previous device object.
    let input = try AVCaptureDeviceInput(device: captureDevice)

    // Set the input device on the capture session.
    captureSession.addInput(input)

} catch {
    // If any error occurs, simply print it out and don't continue any more.
    print(error)
    return
}
```

Điều bạn cần biết là AVCaptureDevice.DiscoverySession class được thiết kế tìm kiếm tất cả thiết bị chụp khả dụng phù hợp với loại thiết bị chỉ định. Trong đoạn code trên, bạn chỉ định truy xuất thiết hỗ trợ loại media là AVMediaType.video.

Để thực hiện quay theo theo gian thực, chúng ta sử dụng đối tượng AVCaptureSession và thêm đầu vào thiết bị quay video. AVCaptureSession Object được sử dụng để điều phối luồng dữ liệu từ đầu vào video cho đến đầu ra

Trong trường hợp này, đầu ra được đặt thành một AVCaptureMetaDataOutput object. AVCaptureMetaDataOutput Class là phần cốt lõi để đọc QR Code. Class này kết hợp với AVCaptureMetadataOutputObjectsDelegate protocol, để chặn bất kỳ dự liệu nào từ đầu vào (QR Code được chụp bằng camera của thiết bị) và dịch sang dạng có thể đọc được.

Đừng lo lắng, mọi thứ sẽ được sáng tỏ hơn. Bây giờ chúng ta sẽ đến vơi nhưng dòng code sau trong viewDidLoad:

```
// Initialize a AVCaptureMetadataOutput object and set it as the output device to the capture session.
let captureMetadataOutput = AVCaptureMetadataOutput()
captureSession.addOutput(captureMetadataOutput)
```

Tiếp theo, chúng ta đặt self là delegate của captureMetadataOutput object. Đây là lý do vì sao QRReaderViewController tuân thủ được AVCaptureMetadataOutputObjectsDelegate protocol.

```
// Set delegate and use the default dispatch queue to execute the call back
captureMetadataOutput.setMetadataObjectsDelegate(self, queue: DispatchQueue.main)
captureMetadataOutput.metadataObjectTypes = [AVMetadataObject.ObjectType.qr]
```

Khi các metadata objects được tạo, chúng được chuyển đến delegate objects để xử lý tiếp. Đoạn code trên, chúng ta chỉ định một queue để thực hiện delegate methods. 
MetadataObjectTypes là một property khá quan trọng, đây là điểm để thông báo với ứng vụ về điều chúng ta quan tâm. AVMetadataObject.ObjectType.qr cho biết một cách rõ ràng chúng ta cần quét QR 

Sau khi thiết lập đối tượng AVCaptureMetadataOutput, bạn cần hiển thị video được quay bằng camera sau trên màn hình. Điều này có thể thực hiện bằng AVCaptureVideoPreviewLayer, là một CALayer. 

```
// Initialize the video preview layer and add it as a sublayer to the viewPreview view's layer.
videoPreviewLayer = AVCaptureVideoPreviewLayer(session: captureSession)
videoPreviewLayer?.videoGravity = AVLayerVideoGravity.resizeAspectFill
videoPreviewLayer?.frame = view.layer.bounds
view.layer.addSublayer(videoPreviewLayer!)
```

Cuối cùng, bắt đầu quay video bằng cách gọi phương thức startRunning

```
// Start video capture.
captureSession.startRunning()
```

Nếu bạn compile và run ứng dung, bạn sẽ bị crash khi bấm vào scan button.

```
This app has crashed because it attempted to access privacy-sensitive data without a usage description.  The app's Info.plist must contain an NSCameraUsageDescription key with a string value explaining to the user how the app uses this data.
```

iOS yêu cầu các developers phải được sự cho phép của người dùng khi truy cập camera, bạn cần thêm NSCameraUsageDescription vào info.plist file. 

![](https://cdn-images-1.medium.com/max/800/1*LiFa9Bqgag6S9wQbbZZrSw.png)

Bây giờ, bạn đã có thể deloy và run ứng dụng trên thiết bị thật. Nhấn vào scan button để tiến hành quay video. Tuy nhiên Label và top bar sẽ bị ẩn, ta cần thêm đoạn code sau để di chuyển chúng lên layer phía trên.

```
// Move the message label and top bar to the front
view.bringSubviewToFront(messageLabel)
view.bringSubviewToFront(topbar)
```

# Implementing QR Code Reading

Hiện tại ứng dụng khá giống ứng dụng quay video. Làm thế nào để quét được QR Code và dịch thành thông tin có nghĩa? Bản thân ứng dụng đã có khả năng phát hiện QR Code. Bây giờ chúng ta sẽ điều chỉnh như sau:

* Khi phát hiện QR Code, ứng dụng sẽ đánh dầu bằng một green box
* QR Code sau khi được giải mã sẽ hiển thị ở cuối màn hình


# Initializing the Green Box

```

// Initialize QR Code Frame to highlight the QR code
qrCodeFrameView = UIView()

if let qrCodeFrameView = qrCodeFrameView {
    qrCodeFrameView.layer.borderColor = UIColor.green.cgColor
    qrCodeFrameView.layer.borderWidth = 2
    view.addSubview(qrCodeFrameView)
    view.bringSubviewToFront(qrCodeFrameView)
}
```

Biến qrCodeFrameView sẽ bị ẩn trên màn hình, khi phát hiện QR code, chúng ta sẽ thay đổi kích thước của nó, và biến nó thành đối tượng màu xanh.

# Decoding the QR Code

Bạn cần bổ sung phương thức xử lý các đối tượng metadata, khi AVCaptureMetadataOutputObjectsDelegate được gọi

```
func metadataOutput(_ output: AVCaptureMetadataOutput, didOutput metadataObjects: [AVMetadataObject], from connection: AVCaptureConnection) {
    // Check if the metadataObjects array is not nil and it contains at least one object.
    if metadataObjects.count == 0 {
        qrCodeFrameView?.frame = CGRect.zero
        messageLabel.text = "No QR code is detected"
        return
    }

    // Get the metadata object.
    let metadataObj = metadataObjects[0] as! AVMetadataMachineReadableCodeObject

    if metadataObj.type == AVMetadataObject.ObjectType.qr {
        // If the found metadata is equal to the QR code metadata then update the status label's text and set the bounds
        let barCodeObject = videoPreviewLayer?.transformedMetadataObject(for: metadataObj)
        qrCodeFrameView?.frame = barCodeObject!.bounds

        if metadataObj.stringValue != nil {
            messageLabel.text = metadataObj.stringValue
        }
    }
}
```


Bây giờ hãy run ứng dụng, tap vào scan button để thực hiện việc quét mã.

![](https://cdn-images-1.medium.com/max/800/1*NIEgzyeHJftLao-4lFZPeg.jpeg)