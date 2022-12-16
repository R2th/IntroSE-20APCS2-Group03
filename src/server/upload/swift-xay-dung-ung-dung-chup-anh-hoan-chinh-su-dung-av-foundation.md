Hôm nay, chúng ta sẽ học cách sử dụng framwork AV Foundation, một framework hệ thống của Apple tồn tại trên macOS và iOS, cùng với watchOS và tvOS. Mục tiêu của hướng dẫn này sẽ giúp bạn xây dựng một ứng dụng iOS đầy đủ chức năng có khả năng chụp ảnh và quay video bằng camera của thiết bị. Chúng tôi cũng sẽ tuân theo các nguyên tắc lập trình hướng đối tượng tốt và thiết kế một lớp tiện ích có thể được sử dụng lại và mở rộng trong tất cả các dự án của bạn.

*Lưu ý: Hướng dẫn này yêu cầu thiết bị iOS thực, không phải trình mô phỏng. Bạn sẽ không thể chạy ứng dụng demo trên trình mô phỏng. Hướng dẫn này cũng giả định rằng bạn có kiến ​​thức tương đối mạnh về các khái niệm cơ bản của UIKit như các hành động, Trình xây dựng giao diện và Bảng phân cảnh, cùng với kiến ​​thức làm việc của Swift.*
## I. AV Foundation là gì?
**AV Foundation là framework đầy đủ tính năng để làm việc với phương tiện nghe nhìn trên iOS, macOS, watchOS và tvOS. Sử dụng AV Foundation, bạn có thể dễ dàng phát, tạo và chỉnh sửa phim QuickTime và các tệp MPEG-4, HLS streams và xây dựng chức năng truyền thông mạnh mẽ vào ứng dụng của bạn.**

 AV Foundation là một framework để chụp, xử lý và chỉnh sửa âm thanh và video trên các thiết bị của Apple. Trong hướng dẫn này, chúng tôi sẽ đặc biệt sử dụng nó để chụp ảnh và quay video, hoàn chỉnh với nhiều hỗ trợ máy ảnh, đèn flash phía trước và phía sau và âm thanh cho video.

## AV Foundation có thực sự cần không?
Trước khi bạn bắt tay vào cuộc hành trình này, hãy nhớ rằng AV Foundation là một framework rất phức tạp. Trong nhiều trường hợp, chúng ta chir cần sử dụng các API mặc định của Apple như là UIImagePickerController.... Hãy chắc chắn rằng bạn thực sự cần phải sử dụng AV Foundation trước khi bạn bắt đầu hướng dẫn này.
## Sessions, Devices, Inputs, and Outputs
Theo Apple, Sessions là “một đối tượng quản lý hoạt động chụp và điều phối luồng dữ liệu từ các thiết bị đầu vào để thu được kết quả đầu ra.” Trong AV Foundation, các Sessions được quản lý bởi đối tượng AVCaptureSession.

Ngoài ra, Devices được sử dụng để thực sự truy cập các thiết bị quay video và âm thanh vật lý có sẵn trên thiết bị iOS. Để sử dụng AVFoundation, bạn lấy ra các Devices, sử dụng chúng để tạo intputs, cung cấp sesions với các input này, và sau đó lưu kết quả vào các output. Đây là một sơ đồ mà tôi đã mô tả mối quan hệ này:

Sơ đồ
![](https://images.viblo.asia/9cbc9bd9-171e-4cd3-9d8c-6667ddb7509c.png)

## Ví dụ
Để giúp các bạn hiểu rõ về framework một cách trực quan nhất chúng ta sẽ làm việc trên một dự án ví dụ, nhưng để chúng ta tập trung vào thảo luận về khung công tác AVFoundation, hướng dẫn này đi kèm với một dự án khởi động. Trước khi bạn tiếp tục, hãy tải xuống dự án khởi động tại đây và xem nhanh.
https://github.com/appcoda/FullScreenCamera/raw/master/CameraDemoStarter.zip

Dự án ví dụ là khá cơ bản. Nó bao gồm:

    . Assets.xcassets chứa tất cả các image và icon cần thiết cho dự án của chúng tôi. Bạn có thể tìm thấy chúng, cùng với hàng trăm icon khác, miễn phí tại material.io/icons .
    .Storyboard với một view controller. View controller này sẽ được sử dụng để xử lý tất cả ảnh và quay video trong ứng dụng của chúng tôi. Nó bao gồm:
        + Nút chụp để bắt đầu chụp ảnh / quay video.
        + Chế độ xem trước khi chụp để bạn có thể xem máy ảnh nhìn thấy gì trong khi chụp.
        + Các button cần thiết để chuyển đổi máy ảnh và bật tắt đèn flash.
    .Một file ViewController.swift chịu trách nhiệm quản lý view controller đã đề cập ở trên. Nó bao gồm:
        + Tất cả các outlets cần thiết kết nối Ui controll người dùng được đề cập ở trên đến mã của chúng tôi.
Build và chạy thử ví dụ, và bạn sẽ thấy một màn hình như thế này:
![](https://images.viblo.asia/f412d8e6-1905-4758-9ed2-019d1ec30986.png)

Làm việc với AVFoundation
Trong hướng dẫn này, chúng ta sẽ thiết kế một lớp được gọi CameraController, sẽ chịu trách nhiệm thực hiện các vấn đề liên quan đến chụp ảnh và quay video. Chúng tôi sẽ sử dụng CameraController view controller và liên kết nó với giao diện người dùng của chúng tôi.

Để bắt đầu, hãy tạo một tệp Swift mới trong dự án của bạn và gọi nó CameraController.swift. Import AVFoundationvà khai báo một lớp trống, như sau:
```
import AVFoundation
class CameraController { }
```
Chụp ảnh
Để bắt đầu, chúng tôi sẽ triển khai tính năng chụp ảnh bằng camera phía sau. Đây sẽ là chức năng cơ bản của chúng tôi và chúng tôi sẽ thêm khả năng chuyển đổi máy ảnh, sử dụng đèn flash và quay video bằng cách thêm vào chức năng chụp ảnh của chúng tôi. Kể từ khi cấu hình và bắt đầu một session là một thủ tục tương đối chuyên sâu, chúng ta sẽ tách nó ra khỏi hàm init và tạo ra một function prepare():
```
func prepare(completionHandler: @escaping (Error?) -> Void) { }
```
Hàm này sẽ xử lý việc tạo và cấu hình một session mới. Hãy nhớ rằng, thiết lập session bao gồm 4 bước:

 **1. Tạo session.
 
 2. Thu thập và định cấu hình các devices cần thiết.
 
 3. Tạo input bằng cách sử dụng các devices.
 
 4. Định cấu hình đối tượng output để xử lý hình ảnh đã chụp.**

Chúng ta sẽ sử dụng các hàm lồng nhau của Swift để gói gọn mã của chúng ta theo cách có thể quản lý được. Bắt đầu bằng cách khai báo 4 hàm rỗng bên trong preparevà sau đó gọi chúng:

```
func prepare(completionHandler: @escaping (Error?) -> Void) {
    func createCaptureSession() { }
    func configureCaptureDevices() throws { }
    func configureDeviceInputs() throws { }
    func configurePhotoOutput() throws { }
    
    DispatchQueue(label: "prepare").async {
        do {
            createCaptureSession()
            try configureCaptureDevices()
            try configureDeviceInputs()
            try configurePhotoOutput()
        }
            
        catch {
            DispatchQueue.main.async {
                completionHandler(error)
            }
            
            return
        }
        
        DispatchQueue.main.async {
            completionHandler(nil)
        }
    }
}
```

Trong code trên, chúng ta đã tạo ra các hàm để thực hiện 4 bước chính trong việc chuẩn bị AVCaptureSession chụp ảnh. Chúng tôi cũng đã thiết lập một khối thực thi không đồng bộ gọi bốn chức năng, bắt bất kỳ lỗi nào nếu cần, và sau đó gọi trình xử lý hoàn thành. Tất cả những gì chúng ta phải làm là thực hiện bốn chức năng! Hãy bắt đầu với createCaptureSession.

### Create Capture Session
Trước khi cấu hình AVCaptureSession, chúng ta cần tạo nó! Thêm thuộc tính sau vào CameraController.swift của bạn :
```
var captureSession: AVCaptureSession?
```
Tiếp theo, thêm phần sau vào phần thân của createCaptureSession:
```
self.captureSession = AVCaptureSession()
```
Đây đơn giản nó chỉ là tạo ra một AVCaptureSession mới và lưu trữ nó trong biến captureSession.

### Configure Capture Devices
Bây giờ chúng tôi đã tạo ra một AVCaptureSession, chúng ta cần phải tạo ra các AVCaptureDevice để đại diện cho máy ảnh của thiết bị iOS thực tế. Tiếp tục và thêm các thuộc tính sau vào CameraControllerlớp của bạn . Chúng ta sẽ bổ sung thêm các thuộc tính frontCamera và rearCamera bây giờ bởi vì chúng ta sẽ thiết lập các khái niệm cơ bản về capture multicamera và triển khai khả năng thay đổi camera sau này.
```
var frontCamera: AVCaptureDevice?
var rearCamera: AVCaptureDevice?
```

Tiếp theo, khai báo một enum bên trong CameraController.swift. Chúng tôi sẽ sử dụng loại được enum này để quản lý các lỗi khác nhau mà chúng tôi có thể gặp phải trong khi tạo phiên chụp:
```
   enum CameraControllerError: Swift.Error {
        case captureSessionAlreadyRunning
        case captureSessionIsMissing
        case inputsAreInvalid
        case invalidOperation
        case noCamerasAvailable
        case unknown
    }
 ```
 
Bạn sẽ nhận thấy rằng có nhiều loại lỗi khác nhau trong enum này. Chỉ cần thêm chúng ngay bây giờ, chúng ta sẽ sử dụng chúng sau này.

Bây giờ nói đến phần thú vị! Hãy tìm các máy ảnh có sẵn trên thiết bị. Chúng ta có thể làm điều này với AVCaptureDeviceDiscoverySession. Thêm thông tin sau vào configureCaptureDevices:

```
//1
let session = AVCaptureDeviceDiscoverySession(deviceTypes: [.builtInWideAngleCamera], mediaType: AVMediaTypeVideo, position: .unspecified)
guard let cameras = (session?.devices.flatMap { $0 }), !cameras.isEmpty else { throw CameraControllerError.noCamerasAvailable }

//2
for camera in cameras {
    if camera.position == .front {
        self.frontCamera = camera
    }

    if camera.position == .back {
        self.rearCamera = camera

        try camera.lockForConfiguration()
        camera.focusMode = .continuousAutoFocus
        camera.unlockForConfiguration()
    }
}
```

Đây là những gì chúng tôi vừa làm:

Hai dòng mã này sử dụng AVCaptureDeviceDiscoverySession để tìm tất cả các máy ảnh góc rộng có sẵn trên thiết bị hiện tại và chuyển đổi chúng thành một mảng  AVCaptureDevice. Nếu không có máy ảnh, chúng tôi sẽ gặp lỗi.
Vòng lặp này xem qua các máy ảnh có sẵn được tìm thấy trong đoạn mã 1 và xác định đó là camera phía trước và camera phía sau là gì. Nó bổ sung cấu hình camera phía sau để tự động lấy nét, ném bất kỳ lỗi nào gặp phải.
Chúng tôi đã sử dụng AVCaptureDeviceDiscoverySession để tìm các camera hiện có trên thiết bị và định cấu hình chúng để đáp ứng các thông số kỹ thuật của chúng tôi. Hãy kết nối chúng với phiên chụp của chúng tôi.

### Configure Device Inputs
Bây giờ chúng ta có thể tạo input device, lấy device và kết nối chúng với session của chúng ta. Trước khi thực hiện điều này, hãy thêm các thuộc tính sau CameraController để đảm bảo rằng chúng ta có thể lưu trữ các input của mình:
```
var currentCameraPosition: CameraPosition?
var frontCameraInput: AVCaptureDeviceInput?
var rearCameraInput: AVCaptureDeviceInput?
```
Mã của chúng tôi sẽ không biên dịch trong trạng thái này, bởi vì CameraPosition không xác định. Hãy định nghĩa nó. Thêm 1 enum trong CameraController:
```
public enum CameraPosition {
    case front
    case rear
}
```
Tuyệt vời. Bây giờ chúng ta có tất cả các thuộc tính cần thiết để lưu trữ và quản lý các input của chúng ta. Hãy thực hiện configureDeviceInputs:

```
func configureDeviceInputs() throws {
    //3
    guard let captureSession = self.captureSession else { throw CameraControllerError.captureSessionIsMissing }

    //4
    if let rearCamera = self.rearCamera {
        self.rearCameraInput = try AVCaptureDeviceInput(device: rearCamera)

        if captureSession.canAddInput(self.rearCameraInput!) { captureSession.addInput(self.rearCameraInput!) }

        self.currentCameraPosition = .rear
    }

    else if let frontCamera = self.frontCamera {
        self.frontCameraInput = try AVCaptureDeviceInput(device: frontCamera)

        if captureSession.canAddInput(self.frontCameraInput!) { captureSession.addInput(self.frontCameraInput!) }
        else { throw CameraControllerError.inputsAreInvalid }

        self.currentCameraPosition = .front
    }

    else { throw CameraControllerError.noCamerasAvailable }
}
```

Dưới đây là những gì chúng tôi đã làm:

Dòng này chỉ đơn giản là đảm bảo rằng captureSession tồn tại. Nếu không, chúng tôi sẽ gặp lỗi.
Các câu lệnh if này có trách nhiệm tạo inputs cần thiết để hỗ trợ chụp ảnh. AVFoundationchỉ cho phép một input dựa trên máy ảnh cho mỗi session tại một thời điểm. Vì camera phía sau theo truyền thống là mặc định, chúng tôi cố gắng tạo input từ nó và thêm nó vào session. Nếu điều đó không thành công, chúng tôi sẽ quay trở lại camera phía trước. Nếu điều đó không thành công, chúng tôi sẽ gặp lỗi.
Configure Photo Output
Cho đến thời điểm này, chúng tôi đã thêm tất cả các yếu tố cần thiết vào captureSession. Bây giờ chúng ta chỉ cần một cách để có được output data. May mắn thay, chúng tôi có AVCapturePhotoOutput. Thêm một thuộc tính khác vào CameraController:
```
var photoOutput: AVCapturePhotoOutput?
```
Bây giờ, chúng ta hãy thực hiện configurePhotoOutput như thế này:
```
func configurePhotoOutput() throws {
    guard let captureSession = self.captureSession else { throw CameraControllerError.captureSessionIsMissing }

    self.photoOutput = AVCapturePhotoOutput()
    self.photoOutput!.setPreparedPhotoSettingsArray([AVCapturePhotoSettings(format: [AVVideoCodecKey : AVVideoCodecJPEG])], completionHandler: nil)

    if captureSession.canAddOutput(self.photoOutput) { captureSession.addOutput(self.photoOutput) }

    captureSession.startRunning()
}
```

Đây là một thực hiện đơn giản. Nó chỉ cấu hình photoOutput, yêu cầu nó sử dụng định dạng tệp JPEG cho codec video của nó. Sau đó, nó thêm photoOutput vào captureSession. Cuối cùng, nó starts captureSession.

Chúng ta gần xong rồi! Tệp của bạn CameraController.swift sẽ trông giống như sau:

```
import AVFoundation

class CameraController {
    var captureSession: AVCaptureSession?

    var currentCameraPosition: CameraPosition?

    var frontCamera: AVCaptureDevice?
    var frontCameraInput: AVCaptureDeviceInput?

    var photoOutput: AVCapturePhotoOutput?

    var rearCamera: AVCaptureDevice?
    var rearCameraInput: AVCaptureDeviceInput?
}

extension CameraController {
    func prepare(completionHandler: @escaping (Error?) -> Void) {
        func createCaptureSession() {
            self.captureSession = AVCaptureSession()
        }

        func configureCaptureDevices() throws {
            let session = AVCaptureDeviceDiscoverySession(deviceTypes: [.builtInWideAngleCamera], mediaType: AVMediaTypeVideo, position: .unspecified)
            guard let cameras = (session?.devices.flatMap { $0 }), !cameras.isEmpty else { throw CameraControllerError.noCamerasAvailable }

            for camera in cameras {
                if camera.position == .front {
                    self.frontCamera = camera
                }

                if camera.position == .back {
                    self.rearCamera = camera

                    try camera.lockForConfiguration()
                    camera.focusMode = .autoFocus
                    camera.unlockForConfiguration()
                }
            }
        }

        func configureDeviceInputs() throws {
            guard let captureSession = self.captureSession else { throw CameraControllerError.captureSessionIsMissing }

            if let rearCamera = self.rearCamera {
                self.rearCameraInput = try AVCaptureDeviceInput(device: rearCamera)

                if captureSession.canAddInput(self.rearCameraInput!) { captureSession.addInput(self.rearCameraInput!) }

                self.currentCameraPosition = .rear
            }

            else if let frontCamera = self.frontCamera {
                self.frontCameraInput = try AVCaptureDeviceInput(device: frontCamera)

                if captureSession.canAddInput(self.frontCameraInput!) { captureSession.addInput(self.frontCameraInput!) }
                else { throw CameraControllerError.inputsAreInvalid }

                self.currentCameraPosition = .front
            }

            else { throw CameraControllerError.noCamerasAvailable }
        }

        func configurePhotoOutput() throws {
            guard let captureSession = self.captureSession else { throw CameraControllerError.captureSessionIsMissing }

            self.photoOutput = AVCapturePhotoOutput()
            self.photoOutput!.setPreparedPhotoSettingsArray([AVCapturePhotoSettings(format: [AVVideoCodecKey : AVVideoCodecJPEG])], completionHandler: nil)

            if captureSession.canAddOutput(self.photoOutput) { captureSession.addOutput(self.photoOutput) }
            captureSession.startRunning()
        }

        DispatchQueue(label: "prepare").async {
            do {
                createCaptureSession()
                try configureCaptureDevices()
                try configureDeviceInputs()
                try configurePhotoOutput()
            }

            catch {
                DispatchQueue.main.async {
                    completionHandler(error)
                }

                return
            }

            DispatchQueue.main.async {
                completionHandler(nil)
            }
        }
    }
}

extension CameraController {
    enum CameraControllerError: Swift.Error {
        case captureSessionAlreadyRunning
        case captureSessionIsMissing
        case inputsAreInvalid
        case invalidOperation
        case noCamerasAvailable
        case unknown
    }

    public enum CameraPosition {
        case front
        case rear
    }
}
```

Bây giờ chúng ta đã sẵn sàng cho thiết bị camera, đây là lúc hiển thị những gì nó chụp trên màn hình. Thêm một hàm khác  CameraController (bên ngoài hàm prepare), gọi nó là displayPreview :
```
func displayPreview(on view: UIView) throws { }
```
Ngoài ra, import UIKit trong CameraController.swift. Chúng tôi sẽ cần nó để làm việc với UIView.

Như tên gọi của nó, hàm này sẽ chịu trách nhiệm tạo bản xem trước chụp và hiển thị nó trên khung nhìn được cung cấp. Hãy thêm thuộc tính vào CameraController để hỗ trợ chức năng này:
```
var previewLayer: AVCaptureVideoPreviewLayer?
```
Thuộc tính này sẽ giữ lớp xem trước hiển thị output của captureSession. Hãy thực hiện phương thức:
```
func displayPreview(on view: UIView) throws {
    guard let captureSession = self.captureSession, captureSession.isRunning else { throw CameraControllerError.captureSessionIsMissing }

    self.previewLayer = AVCaptureVideoPreviewLayer(session: captureSession)
    self.previewLayer?.videoGravity = AVLayerVideoGravityResizeAspectFill
    self.previewLayer?.connection?.videoOrientation = .portrait

    view.layer.insertSublayer(self.previewLayer!, at: 0)
    self.previewLayer?.frame = view.frame
}
```

Chức năng này tạo ra một AVCaptureVideoPreview sử dụng captureSession, đặt nó để có hướng dọc và thêm nó vào khung nhìn được cung cấp.
Bây giờ, hãy thử kết nối tất cả điều này với view controller của chúng tôi. Đi đến ViewController.swift. Đầu tiên, thêm thuộc tính vào ViewController.swift:
```
let cameraController = CameraController()
```
Sau đó, thêm một hàm viewDidLoad():
```
func configureCameraController() {
    cameraController.prepare {(error) in
        if let error = error {
            print(error)
        }

        try? self.cameraController.displayPreview(on: self.capturePreviewView)
    }
}
configureCameraController()
```
 Chúng tôi vẫn còn một bước nữa. Đây là yêu cầu bảo mật được thực thi bởi Apple. Bạn phải cung cấp lý do cho người dùng, giải thích lý do ứng dụng của bạn cần sử dụng máy ảnh. Mở Info.plist và chèn một hàng:
![](https://images.viblo.asia/c0930e47-30e6-4950-b0c4-330852f57bfb.png)

ViewController.swift Bây giờ, tệp của bạn sẽ trông giống như sau:
```
import UIKit

class ViewController: UIViewController {
    let cameraController = CameraController()

    @IBOutlet fileprivate var captureButton: UIButton!

    ///Displays a preview of the video output generated by the device's cameras.
    @IBOutlet fileprivate var capturePreviewView: UIView!

    ///Allows the user to put the camera in photo mode.
    @IBOutlet fileprivate var photoModeButton: UIButton!
    @IBOutlet fileprivate var toggleCameraButton: UIButton!
    @IBOutlet fileprivate var toggleFlashButton: UIButton!

    ///Allows the user to put the camera in video mode.
    @IBOutlet fileprivate var videoModeButton: UIButton!

    override var prefersStatusBarHidden: Bool { return true }
}

extension ViewController {
    override func viewDidLoad() {
        func configureCameraController() {
            cameraController.prepare {(error) in
                if let error = error {
                    print(error)
                }

                try? self.cameraController.displayPreview(on: self.capturePreviewView)
            }
        }

        func styleCaptureButton() {
            captureButton.layer.borderColor = UIColor.black.cgColor
            captureButton.layer.borderWidth = 2

            captureButton.layer.cornerRadius = min(captureButton.frame.width, captureButton.frame.height) / 2
        }

        styleCaptureButton()
        configureCameraController()
    }
}
```

Ok mọi thứ có vẻ khá tốt. Chạy thử project :
![](https://images.viblo.asia/0f48e87c-99dc-4578-b240-9eb5174dcfda.png)

Bây giờ chúng ta đã có bản xem trước đang hoạt động, hãy thêm một số chức năng vào nó. Hầu hết các ứng dụng máy ảnh cho phép người dùng của họ chuyển đổi máy ảnh và bật hoặc tắt flash. Hãy thêm các chức năng đó vào ứng dựng của chúng ta. Sau khi thực hiện việc này, chúng tôi sẽ thêm khả năng chụp ảnh và lưu chúng vào thư viện ảnh.

Để bắt đầu, chúng tôi sẽ cho phép khả năng chuyển đổi flash. Thêm thuộc tính này vào CameraController:
```
var flashMode = AVCaptureFlashMode.off
```
Bây giờ, đi đến ViewController. Thêm một @IBAction func để chuyển đổi flash:
```
@IBAction func toggleFlash(_ sender: UIButton) {
    if cameraController.flashMode == .on {
        cameraController.flashMode = .off
        toggleFlashButton.setImage(#imageLiteral(resourceName: "Flash Off Icon"), for: .normal)
    }

    else {
        cameraController.flashMode = .on
        toggleFlashButton.setImage(#imageLiteral(resourceName: "Flash On Icon"), for: .normal)
    }
}
```

Bây giờ, đây là tất cả những gì chúng ta phải làm. CameraController của chúng tôi sẽ xử lý flash khi chúng tôi chụp ảnh. Hãy chuyển sang chuyển đổi máy ảnh.

Chuyển đổi máy ảnh trong AV Foundation là một nhiệm vụ khá dễ dàng. Chúng tôi chỉ cần xóa input cho máy ảnh hiện có và thêm input mới cho máy ảnh mà chúng tôi muốn chuyển sang. Hãy thêm một hàm khác vào CameraController của chúng ta để chuyển đổi máy ảnh:
```
func switchCameras() throws { }
```
Khi chúng tôi chuyển máy ảnh, chúng tôi sẽ chuyển sang máy ảnh trước hoặc máy ảnh phía sau. Vì vậy, chúng ta hãy khai báo 2 hàm lồng nhau bên trong switchCameras:
```
func switchToFrontCamera() throws { }
func switchToRearCamera() throws { }
```
Bây giờ, thêm phần sau vào switchCameras():
```
//5
guard let currentCameraPosition = currentCameraPosition, let captureSession = self.captureSession, captureSession.isRunning else { throw CameraControllerError.captureSessionIsMissing }

//6
captureSession.beginConfiguration()

func switchToFrontCamera() throws { }
func switchToRearCamera() throws { }

//7
switch currentCameraPosition {
case .front:
    try switchToRearCamera()

case .rear:
    try switchToFrontCamera()
}

//8
captureSession.commitConfiguration()
```

Tất cả những gì chúng ta phải làm bây giờ là thực hiện switchToFrontCamera và switchToRearCamera:
```
func switchToFrontCamera() throws {
    guard let inputs = captureSession.inputs as? [AVCaptureInput], let rearCameraInput = self.rearCameraInput, inputs.contains(rearCameraInput),
        let frontCamera = self.frontCamera else { throw CameraControllerError.invalidOperation }

    self.frontCameraInput = try AVCaptureDeviceInput(device: frontCamera)

    captureSession.removeInput(rearCameraInput)

    if captureSession.canAddInput(self.frontCameraInput!) {
        captureSession.addInput(self.frontCameraInput!)

        self.currentCameraPosition = .front
    }

    else { throw CameraControllerError.invalidOperation }
}

func switchToRearCamera() throws {
    guard let inputs = captureSession.inputs as? [AVCaptureInput], let frontCameraInput = self.frontCameraInput, inputs.contains(frontCameraInput),
        let rearCamera = self.rearCamera else { throw CameraControllerError.invalidOperation }

    self.rearCameraInput = try AVCaptureDeviceInput(device: rearCamera)

    captureSession.removeInput(frontCameraInput)

    if captureSession.canAddInput(self.rearCameraInput!) {
        captureSession.addInput(self.rearCameraInput!)

        self.currentCameraPosition = .rear
    }

    else { throw CameraControllerError.invalidOperation }
}
```

Cả hai hàm đều có triển khai cực kỳ giống nhau. Chúng bắt đầu bằng cách nhận được một mảng của tất cả các input trong session và đảm bảo rằng nó có thể chuyển sang máy ảnh yêu cầu. Tiếp theo, họ tạo input cần thiết, xóa thiết bị cũ và thêm thiết bị mới. Cuối cùng, họ thiết lập currentCameraPosition để CameraController nhận thức được những thay đổi. Quay lại để ViewController.swift chúng tôi có thể thêm chức năng để chuyển đổi máy ảnh:

```
@IBAction func switchCameras(_ sender: UIButton) {
    do {
        try cameraController.switchCameras()
    }

    catch {
        print(error)
    }

    switch cameraController.currentCameraPosition {
    case .some(.front):
        toggleCameraButton.setImage(#imageLiteral(resourceName: "Front Camera Icon"), for: .normal)

    case .some(.rear):
        toggleCameraButton.setImage(#imageLiteral(resourceName: "Rear Camera Icon"), for: .normal)

    case .none:
        return
    }
}
```
Ok vậy là việc chuyển đổi máy ảnh đã thực hiện xong

### Triển khai chụp ảnh
Bây giờ chúng ta có thể thực hiện tính năng quan trọng nhất đó là chụp ảnh . 
Mở CameraController.swift và chúng ta hãy làm việc. Thêm một function captureImage:
```
func captureImage(completion: (UIImage?, Error?) -> Void) {

}
```
Chức năng này, như tên gọi của nó, sẽ chụp một hình ảnh cho chúng ta bằng cách sử dụng bộ điều khiển máy ảnh mà chúng ta đã xây dựng. Hãy thực hiện nó:
```
func captureImage(completion: @escaping (UIImage?, Error?) -> Void) {
    guard let captureSession = captureSession, captureSession.isRunning else { completion(nil, CameraControllerError.captureSessionIsMissing); return }

    let settings = AVCapturePhotoSettings()
    settings.flashMode = self.flashMode

    self.photoOutput?.capturePhoto(with: settings, delegate: self)
    self.photoCaptureCompletionBlock = completion
}
```

Tuyệt quá! Nó không phải là một triển khai phức tạp, nhưng mã của chúng tôi sẽ không chạy, bởi vì chúng tôi chưa xác định photoCaptureCompletionBlock và CameraController chưa extension AVCapturePhotoCaptureDelegate. Trước tiên, hãy thêm thuộc tính photoCaptureCompletionBlock vào CameraController:
```
var photoCaptureCompletionBlock: ((UIImage?, Error?) -> Void)?
```
Và bây giờ, chúng ta hãy mở rộng CameraController để phù hợp với AVCapturePhotoCaptureDelegate:
```
extension CameraController: AVCapturePhotoCaptureDelegate {
    public func capture(_ captureOutput: AVCapturePhotoOutput, didFinishProcessingPhotoSampleBuffer photoSampleBuffer: CMSampleBuffer?, previewPhotoSampleBuffer: CMSampleBuffer?,
                        resolvedSettings: AVCaptureResolvedPhotoSettings, bracketSettings: AVCaptureBracketedStillImageSettings?, error: Swift.Error?) {
        if let error = error { self.photoCaptureCompletionBlock?(nil, error) }
            
        else if let buffer = photoSampleBuffer, let data = AVCapturePhotoOutput.jpegPhotoDataRepresentation(forJPEGSampleBuffer: buffer, previewPhotoSampleBuffer: nil),
            let image = UIImage(data: data) {
            
            self.photoCaptureCompletionBlock?(image, nil)
        }
            
        else {
            self.photoCaptureCompletionBlock?(nil, CameraControllerError.unknown)
        }
    }
}
```
 Bây giờ trình biên dịch đang tăng thêm một vấn đề nữa:
```
Type 'CameraController' does not conform to protocol 'NSObjectProtocol'. 
```
Chúng ta chỉ cần CameraController kế thừa từ NSObject để sửa lỗi này. 

Bây giờ, quay trở lại ViewController một lần nữa. Trước tiên, hãy import Photos framework vì chúng tôi sẽ sử dụng các API tích hợp để lưu ảnh.
```
import Photos
```
Và sau đó chèn hàm sau:
```
@IBAction func captureImage(_ sender: UIButton) {
    cameraController.captureImage {(image, error) in
        guard let image = image else {
            print(error ?? "Image capture error")
            return
        }
        
        try? PHPhotoLibrary.shared().performChangesAndWait {
            PHAssetChangeRequest.creationRequestForAsset(from: image)
        }
    }
}
```

Chúng tôi chỉ đơn giản gọi function captureImagephương để chụp ảnh và sau đó sử dụng PHPhotoLibary để lưu hình ảnh vào thư viện ảnh tích hợp sẵn.
![](https://images.viblo.asia/c0b9b519-a021-4176-8144-06edb64e7567.png)

Đây là yêu cầu về quyền riêng tư được giới thiệu trong iOS 10. Bạn phải chỉ định lý do tại sao ứng dụng của bạn cần truy cập thư viện ảnh.

Bây giờ hãy build và run thử ứng dụng để chụp ảnh! Sau đó, mở thư viện ảnh của bạn. Bạn sẽ thấy ảnh bạn vừa chụp. Xin chúc mừng, bạn đã biết cách sử dụng AV Foundation trong ứng dụng của mình! 

## Tổng kết
Bài viết được tham khảo từ https://www.appcoda.com/avfoundation-swift-guide/. Hy vọng có những kiến thức bổ ích giúp các bạn hoàn thiện hơn ứng dụng ios của mình.Cảm ơn đã chú ý theo dõi và hẹn gặp lại!