# Giới thiệu
Có bao giờ các bạn tự hỏi làm thế nào để các ứng dụng chụp ảnh hiện nay, họ có thể nhận diện được đâu là mắt, mũi, môi, lông mày hay tóc của các bạn. Hôm nay tôi sẽ giới thiệu đến các bạn một API cục bộ và dựa trên điện toán đám mây để thêm khả năng học máy vào ứng dụng dành cho thiết bị di động, cụ thể là iOS, đó là [Firebase ML Kit](https://firebase.google.com/products/ml-kit/).
Trong bài viết này tôi cùng các bạn sẽ thực hiện việc demo sử dụng [Firebase ML Kit](https://firebase.google.com/products/ml-kit/) trong camera của hệ điều hành iOS.
### Chuẩn bị môi trường
- Phiên bản Xcode mới nhất: 10.1
- Một chiếc iPhone từ iOS 10.0 trở lên
Và output của demo sẽ là một ứng dụng mở camera với việc nhận diện khuôn mặt theo thời gian thực.

![](https://images.viblo.asia/636a4515-9320-4870-af44-b02b872c3d5a.PNG)

# Demo
## 1. Config
### Firebase
Đầu tiên các bạn vào [Firebase](https://console.firebase.google.com/u/0/) tạo project, các tut hướng dẫn về tạo một project Firebase các bạn có thể tìm kiếm thêm nhé. Ở đây tôi tạo một project với tên gọi **MLDemo**, cùng các thông số như sau (các bạn config theo ý của mình những cái này nhé).

![](https://images.viblo.asia/c5b85e95-f7c1-4cd2-b6d5-fd07f6100b65.png)

### Xcode Project
Create iOS project với bundleId như trên các bạn config với Firebase,  download file *GoogleService-Info.plist* rồi add vào project.

Config file cocoapods:
```
  pod 'Firebase/Core'
  pod 'Firebase/MLVision'
  
  pod 'Firebase/MLVisionFaceModel'
```

Trong file Appdelegate, các bạn thực hiện **config Firebase**

```
import Firebase

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        FirebaseApp.configure()

        return true
    }
```
## Setup Camera
- Add photo permission vào trong file Info.plist
```
	<key>NSCameraUsageDescription</key>
	<string>We use the data from the camera for the image recognition.</string>
	<key>NSPhotoLibraryUsageDescription</key>
	<string>We use the data from the photo library for the image recognition.</string>
```

Trong *ViewController*, khởi tạo các property cho việc setup camera
```
    private var isUsingFrontCamera = true
    private var previewLayer: AVCaptureVideoPreviewLayer!
    private lazy var captureSession = AVCaptureSession()
    private lazy var sessionQueue = DispatchQueue(label: Constant.sessionQueueLabel)
    
    private lazy var previewOverlayView: UIImageView = {
        precondition(isViewLoaded)
        let previewOverlayView = UIImageView(frame: .zero)
        previewOverlayView.translatesAutoresizingMaskIntoConstraints = false
        return previewOverlayView
    }()
    
    private lazy var annotationOverlayView: UIView = {
        precondition(isViewLoaded)
        let annotationOverlayView = UIView(frame: .zero)
        annotationOverlayView.translatesAutoresizingMaskIntoConstraints = false
        return annotationOverlayView
    }()
```

tạo một UIView với IBoutlet là cameraView, config các view:
```
    @IBOutlet private weak var cameraView: UIView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        previewLayer = AVCaptureVideoPreviewLayer(session: captureSession)
        setUpPreviewOverlayView()
        setUpAnnotationOverlayView()
        setUpCaptureSessionOutput()
        setUpCaptureSessionInput()
    }
    
    private func setUpPreviewOverlayView() {
        cameraView.addSubview(previewOverlayView)
        NSLayoutConstraint.activate([
            previewOverlayView.topAnchor.constraint(greaterThanOrEqualTo: cameraView.topAnchor),
            previewOverlayView.centerYAnchor.constraint(equalTo: cameraView.centerYAnchor),
            previewOverlayView.leadingAnchor.constraint(equalTo: cameraView.leadingAnchor),
            previewOverlayView.trailingAnchor.constraint(equalTo: cameraView.trailingAnchor),
            previewOverlayView.bottomAnchor.constraint(lessThanOrEqualTo: cameraView.bottomAnchor),
            ])
    }
    
    private func setUpAnnotationOverlayView() {
        cameraView.addSubview(annotationOverlayView)
        NSLayoutConstraint.activate([
            annotationOverlayView.topAnchor.constraint(equalTo: cameraView.topAnchor),
            annotationOverlayView.leadingAnchor.constraint(equalTo: cameraView.leadingAnchor),
            annotationOverlayView.trailingAnchor.constraint(equalTo: cameraView.trailingAnchor),
            annotationOverlayView.bottomAnchor.constraint(equalTo: cameraView.bottomAnchor),
            ])
    }
```
khởi tạo các function camera:
``` 
        override func viewDidLayoutSubviews() {
             super.viewDidLayoutSubviews()
             previewLayer.frame = cameraView.frame
    }
        
        private func setUpCaptureSessionOutput() {
        sessionQueue.async {
            self.captureSession.beginConfiguration()
            // When performing latency tests to determine ideal capture settings,
            // run the app in 'release' mode to get accurate performance metrics
            self.captureSession.sessionPreset = AVCaptureSession.Preset.medium
            
            let output = AVCaptureVideoDataOutput()
            output.videoSettings =
                [(kCVPixelBufferPixelFormatTypeKey as String): kCVPixelFormatType_32BGRA]
            let outputQueue = DispatchQueue(label: Constant.videoDataOutputQueueLabel)
            output.setSampleBufferDelegate(self, queue: outputQueue)
            guard self.captureSession.canAddOutput(output) else {
                print("Failed to add capture session output.")
                return
            }
            self.captureSession.addOutput(output)
            self.captureSession.commitConfiguration()
        }
    }
    
    private func setUpCaptureSessionInput() {
        sessionQueue.async {
            let cameraPosition: AVCaptureDevice.Position = self.isUsingFrontCamera ? .front : .back
            guard let device = self.captureDevice(forPosition: cameraPosition) else {
                print("Failed to get capture device for camera position: \(cameraPosition)")
                return
            }
            do {
                self.captureSession.beginConfiguration()
                let currentInputs = self.captureSession.inputs
                for input in currentInputs {
                    self.captureSession.removeInput(input)
                }
                
                let input = try AVCaptureDeviceInput(device: device)
                guard self.captureSession.canAddInput(input) else {
                    print("Failed to add capture session input.")
                    return
                }
                self.captureSession.addInput(input)
                self.captureSession.commitConfiguration()
            } catch {
                print("Failed to create capture device input: \(error.localizedDescription)")
            }
        }
    }
    
    private func captureDevice(forPosition position: AVCaptureDevice.Position) -> AVCaptureDevice? {
        if #available(iOS 10.0, *) {
            let discoverySession = AVCaptureDevice.DiscoverySession(
                deviceTypes: [.builtInWideAngleCamera],
                mediaType: .video,
                position: .unspecified
            )
            return discoverySession.devices.first { $0.position == position }
        }
        return nil
    }
```
Start và stop camera trong viewWillapp

```

override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        
        startSession()
    }
    
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        
        stopSession()
    }
    
    private func startSession() {
        sessionQueue.async {
            self.captureSession.startRunning()
        }
    }
    
    private func stopSession() {
        sessionQueue.async {
            self.captureSession.stopRunning()
        }
    }
```

Run project, lúc này chúng ta sẽ có một ứng dụng khởi tạo camera, ở đây tôi đang để mặc định là camera trước, các bạn có thể thay đổi sang camera sau tuỳ ý, bằng cách thay đổi property:

```
private var isUsingFrontCamera = false
```
## Thực hiện việc nhận diện khuôn mặt trong camera
Chúng ta sẽ sử dụng *AVCaptureVideoDataOutputSampleBufferDelegate* để lấy data từ camera:
```
extension ViewController: AVCaptureVideoDataOutputSampleBufferDelegate {
    func captureOutput(
        _ output: AVCaptureOutput,
        didOutput sampleBuffer: CMSampleBuffer,
        from connection: AVCaptureConnection
        ) {
        guard let imageBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else {
            print("Failed to get image buffer from sample buffer.")
            return
        }
    }
}
```

Sau khi lấy được data từ camera, bước tiếp theo là chúng ta sẽ sử dụng MLVision để thực hiện việc detect khuôn mặt,
```
        lastFrame = sampleBuffer
        let visionImage = VisionImage(buffer: sampleBuffer)
        let metadata = VisionImageMetadata()
        let orientation = UIUtilities.imageOrientation(
            fromDevicePosition: isUsingFrontCamera ? .front : .back
        )
        let visionOrientation = UIUtilities.visionImageOrientation(from: orientation)
        metadata.orientation = visionOrientation
        visionImage.metadata = metadata
        let imageWidth = CGFloat(CVPixelBufferGetWidth(imageBuffer))
        let imageHeight = CGFloat(CVPixelBufferGetHeight(imageBuffer))
        detectFacesOnDevice(in: visionImage, width: imageWidth, height: imageHeight)
```

```
private func detectFacesOnDevice(in image: VisionImage, width: CGFloat, height: CGFloat) {
        let options = VisionFaceDetectorOptions()
        // When performing latency tests to determine ideal detection settings,
        // run the app in 'release' mode to get accurate performance metrics
        options.landmarkMode = .none
        options.contourMode = .all
        options.classificationMode = .none
        
        options.performanceMode = .fast
        let faceDetector = vision.faceDetector(options: options)
        
        var detectedFaces: [VisionFace]? = nil
        do {
            detectedFaces = try faceDetector.results(in: image)
        } catch let error {
            print("Failed to detect faces with error: \(error.localizedDescription).")
        }
        guard let faces = detectedFaces, !faces.isEmpty else {
            print("On-Device face detector returned no results.")
            DispatchQueue.main.sync { self.removeDetectionAnnotations() }
            return
        }
        
                DispatchQueue.main.sync {
            self.updatePreviewOverlayView()
            self.removeDetectionAnnotations()
            for face in faces {
                let normalizedRect = CGRect(
                    x: face.frame.origin.x / width,
                    y: face.frame.origin.y / height,
                    width: face.frame.size.width / width,
                    height: face.frame.size.height / height
                )
                let standardizedRect =
                    self.previewLayer.layerRectConverted(fromMetadataOutputRect: normalizedRect).standardized
                UIUtilities.addRectangle(
                    standardizedRect,
                    to: self.annotationOverlayView,
                    color: UIColor.green
                )
            }
        }
    }
    
    private func removeDetectionAnnotations() {
        for annotationView in annotationOverlayView.subviews {
            annotationView.removeFromSuperview()
        }
    }
    
    private func updatePreviewOverlayView() {
        guard let lastFrame = lastFrame,
            let imageBuffer = CMSampleBufferGetImageBuffer(lastFrame)
            else {
                return
        }
        let ciImage = CIImage(cvPixelBuffer: imageBuffer)
        let context = CIContext(options: nil)
        guard let cgImage = context.createCGImage(ciImage, from: ciImage.extent) else {
            return
        }
        let rotatedImage =
            UIImage(cgImage: cgImage, scale: Constant.originalScale, orientation: .right)
        if isUsingFrontCamera {
            guard let rotatedCGImage = rotatedImage.cgImage else {
                return
            }
            let mirroredImage = UIImage(
                cgImage: rotatedCGImage, scale: Constant.originalScale, orientation: .leftMirrored)
            previewOverlayView.image = mirroredImage
        } else {
            previewOverlayView.image = rotatedImage
        }
    }
}
```
Hàm phía trên giúp chúng ta sẽ nhận diện được các khuôn mặt từ dữ liệu mà camera của máy cung cấp cho chúng ta. Sau khi tìm được các khuôn mặt trong bức ảnh, việc tiếp theo của chúng ta là làm gì tiếp theo với khuôn mặt đó :v: Ở đây tôi sẽ vẽ lên một View màu xanh nhạt.

https://media.giphy.com/media/9JtcTSNWLHB8cZAupP/giphy.gif

Tiếp theo chúng ta sẽ thực hiện việc nhận diện các bộ phận trên khuôn mặt, cụ thể:
- **Khuôn mặt:  vẽ đường xanh lục**
- **Lông mày:  vẽ đường xanh vàng đậm**
- **Môi:  vẽ đường vàng**
- **Mắt: vẽ đường xanh lơ**

```
    private func addContours(for face: VisionFace, width: CGFloat, height: CGFloat) {
        // Face
        if let faceContour = face.contour(ofType: .face) {
            for point in faceContour.points {
                let cgPoint = normalizedPoint(fromVisionPoint: point, width: width, height: height)
                UIUtilities.addCircle(
                    atPoint: cgPoint,
                    to: annotationOverlayView,
                    color: UIColor.blue,
                    radius: Constant.smallDotRadius
                )
            }
        }
        
        // Eyebrows
        if let topLeftEyebrowContour = face.contour(ofType: .leftEyebrowTop) {
            for point in topLeftEyebrowContour.points {
                let cgPoint = normalizedPoint(fromVisionPoint: point, width: width, height: height)
                UIUtilities.addCircle(
                    atPoint: cgPoint,
                    to: annotationOverlayView,
                    color: UIColor.orange,
                    radius: Constant.smallDotRadius
                )
            }
        }
        if let bottomLeftEyebrowContour = face.contour(ofType: .leftEyebrowBottom) {
            for point in bottomLeftEyebrowContour.points {
                let cgPoint = normalizedPoint(fromVisionPoint: point, width: width, height: height)
                UIUtilities.addCircle(
                    atPoint: cgPoint,
                    to: annotationOverlayView,
                    color: UIColor.orange,
                    radius: Constant.smallDotRadius
                )
            }
        }
        if let topRightEyebrowContour = face.contour(ofType: .rightEyebrowTop) {
            for point in topRightEyebrowContour.points {
                let cgPoint = normalizedPoint(fromVisionPoint: point, width: width, height: height)
                UIUtilities.addCircle(
                    atPoint: cgPoint,
                    to: annotationOverlayView,
                    color: UIColor.orange,
                    radius: Constant.smallDotRadius
                )
            }
        }
        if let bottomRightEyebrowContour = face.contour(ofType: .rightEyebrowBottom) {
            for point in bottomRightEyebrowContour.points {
                let cgPoint = normalizedPoint(fromVisionPoint: point, width: width, height: height)
                UIUtilities.addCircle(
                    atPoint: cgPoint,
                    to: annotationOverlayView,
                    color: UIColor.orange,
                    radius: Constant.smallDotRadius
                )
            }
        }
        
        // Eyes
        if let leftEyeContour = face.contour(ofType: .leftEye) {
            for point in leftEyeContour.points {
                let cgPoint = normalizedPoint(fromVisionPoint: point, width: width, height: height)
                UIUtilities.addCircle(
                    atPoint: cgPoint,
                    to: annotationOverlayView,
                    color: UIColor.cyan,
                    radius: Constant.smallDotRadius
                )
            }
        }
        if let rightEyeContour = face.contour(ofType: .rightEye) {
            for point in rightEyeContour.points {
                let cgPoint = normalizedPoint(fromVisionPoint: point, width: width, height: height)
                UIUtilities.addCircle(
                    atPoint: cgPoint,
                    to: annotationOverlayView,
                    color: UIColor.cyan,
                    radius: Constant.smallDotRadius
                )
            }
        }
        
        // Lips
        if let topUpperLipContour = face.contour(ofType: .upperLipTop) {
            for point in topUpperLipContour.points {
                let cgPoint = normalizedPoint(fromVisionPoint: point, width: width, height: height)
                UIUtilities.addCircle(
                    atPoint: cgPoint,
                    to: annotationOverlayView,
                    color: UIColor.red,
                    radius: Constant.smallDotRadius
                )
            }
        }
        if let bottomUpperLipContour = face.contour(ofType: .upperLipBottom) {
            for point in bottomUpperLipContour.points {
                let cgPoint = normalizedPoint(fromVisionPoint: point, width: width, height: height)
                UIUtilities.addCircle(
                    atPoint: cgPoint,
                    to: annotationOverlayView,
                    color: UIColor.red,
                    radius: Constant.smallDotRadius
                )
            }
        }
        if let topLowerLipContour = face.contour(ofType: .lowerLipTop) {
            for point in topLowerLipContour.points {
                let cgPoint = normalizedPoint(fromVisionPoint: point, width: width, height: height)
                UIUtilities.addCircle(
                    atPoint: cgPoint,
                    to: annotationOverlayView,
                    color: UIColor.red,
                    radius: Constant.smallDotRadius
                )
            }
        }
        if let bottomLowerLipContour = face.contour(ofType: .lowerLipBottom) {
            for point in bottomLowerLipContour.points {
                let cgPoint = normalizedPoint(fromVisionPoint: point, width: width, height: height)
                UIUtilities.addCircle(
                    atPoint: cgPoint,
                    to: annotationOverlayView,
                    color: UIColor.red,
                    radius: Constant.smallDotRadius
                )
            }
        }
        
        // Nose
        if let noseBridgeContour = face.contour(ofType: .noseBridge) {
            for point in noseBridgeContour.points {
                let cgPoint = normalizedPoint(fromVisionPoint: point, width: width, height: height)
                UIUtilities.addCircle(
                    atPoint: cgPoint,
                    to: annotationOverlayView,
                    color: UIColor.yellow,
                    radius: Constant.smallDotRadius
                )
            }
        }
        if let noseBottomContour = face.contour(ofType: .noseBottom) {
            for point in noseBottomContour.points {
                let cgPoint = normalizedPoint(fromVisionPoint: point, width: width, height: height)
                UIUtilities.addCircle(
                    atPoint: cgPoint,
                    to: annotationOverlayView,
                    color: UIColor.yellow,
                    radius: Constant.smallDotRadius
                )
            }
        }
    }
```

Và kết quả sẽ như sau:  https://media.giphy.com/media/236Uo70cGG5yQQ1Jt8/giphy.gif

# Kết luận
Trên đây, tôi cùng với các bạn cùng nhau thực hiện việc demo nhận diện khuôn mặt bằng camera theo thời gian thực, kết quả thật ngạc nhiên phải không nào. Với công nghệ ngày càng phát triển, phần cứng các thiết bị ngày càng mạnh mẽ, việc áp dụng Mechine learning và AI vào trong các thiết bị Mobile sẽ càng đơn giản hơn. Cám ơn các bạn đã đọc bài viết! 

[Nguồn](https://firebase.google.com/docs/ml-kit/)

[Demo](https://drive.google.com/file/d/1wfzNpx26wTKSfakxPSawfOwUkUdwIg9U/view?usp=sharing) (Hơi nặng nhá :v: )