Dịch từ https://www.raywenderlich.com/3733151-photo-stacking-in-ios-with-vision-and-metal

Trong hướng dẫn này tôi sẽ hướng dẫn các bạn sử dụng Metal và Vision framework để xoá các đối tượng (objects) khỏi ảnh trên iOS. Bạn sẽ được học về stack, align, và xử lý nhiều ảnh để làm biến mất mọi đối tượng chuyển động.

Vậy thế nào là Photo Stacking (Xếp chồng ảnh)? Nào, tưởng tượng xem. Bạn đang trong một kỳ nghỉ, ở một nơi đầy phép màu. Bạn đang du lịch ở UK tại phim trường của Harray Potter.

Đây chính là lúc để chụp thật nhiều ảnh. Tưởng tượng khi bạn khoe với bạn bè là bạn đã đến đó xem. Nhưng vấn đề là: Có quá nhiều người ở đó.

Hmm! Mọi bức ảnh bạn chụp chật kín người. Nếu bạn có thể nói một từ đơn giản như là Harry. Evanesco! rồi mọi người biến mất. Điều đó thật tuyệt.

Có một vài cách bạn có thể làm. Photo Stacking là một xu hướng xử lý ảnh mới nổi, là trend hiện nay. Bạn muốn sử dụng nó không?

Trong tutorial này, bạn sẽ sử dụng Vision framework để học cách:

▪️ Căn chỉnh những ảnh đã chụp sử dụng VNTranslationalImageRegistrationRequest.

▪️ Tạo 1 custom CIFilter sử dụng Metal kernel.

▪️ Sử dụng filter này để kết hợp một vài bức ảnh để xoá bất kì đối tượng chuyển động nào.

Nghe thú vị chứ, bắt đầu nào.

# Bắt đầu

Sau khi download bộ project demo từ link nguồn, chạy app lên bạn sẽ thấy như hình.

![](https://images.viblo.asia/b082a144-3abe-4870-8648-3fefada46fdf.jpg)

Có 1 nút đỏ với một vòng tròn xung quanh, và nó sẽ hiển thị màn hình camera full màn hình.

Chắc chắn rằng bạn sẽ chú ý thấy camera hơi bị giật. Đó là bởi bị nó đang cài đặt để chụp 5 khung hình trên giây. Để xem nó được define ở đâu trong code, mở CameraViewController.swift và tìm đến 2 dòng sau trong configureCaptureSession():

```swift
camera.activeVideoMaxFrameDuration = CMTime(value: 1, timescale: 5)
camera.activeVideoMinFrameDuration = CMTime(value: 1, timescale: 5)
```

Dòng đầu tiên là để cài đặt tối đa 5 khung hình 1 giây. Dòng thứ 2 là để cài đặt tối thiểu 5 khung hình 1 giây. Khi kết hợp 2 dòng ta sẽ làm camera chạy với số khung hình mong muốn.

Nếu bạn chọn nút chụp, bạn sẽ thấy viền ngoài chạy Theo chiều kim đồng hồ. Tuy nhiên, khi kết thúc vẫn chưa có gì xảy ra.

Ngay bây giờ chúng ta sẽ xử lý phần này.

# Lưu ảnh vào App Files

Để giúp bạn có thể debug được app trong quá trình làm, tốt hơn chúng ta nên lưu những ảnh mà chúng ta sẽ sử dụng vào app Files. May mắn là điều này khá đơn giản.

Thêm những dòng sau vào file Info.plist:
Application supports iTunes file sharing.
Supports opening documents in place.

Đặt cả hai giá trị trên thành `YES`. Khi xong bạn sẽ thấy nó như thế này:

![](https://images.viblo.asia/a2bba47f-6070-4e9e-9060-46eff583e6bb.png)

Key đầu tiên là để enable việc chia sẻ file trong thư mục Documents. Key thứ hai là để app có thể mở bản gốc của file thay vì mở bản copy của file đó. Khi enable cả 2 cài đặt này, tất cả những file xuất hiện trong thư mục Documents của app đều sẽ xuất hiện trong app Files. Điều này cũng có nghĩa là các app khác cũng có thể truy cập được vào các file này.

Giờ chúng ta sẽ cấp quyền cho app Files để truy cập vào thư mục Documents, giờ chính là lúc để lưu ảnh vào đây.

Bộ project bạn download về ban đầu có một cấu trúc helper được gọi là ImageSaver. Khi khở tạo, nó sẽ tạo ra một chuỗi định danh Universally Unique Identifier (UUID) và dùng nó để tạo thư mục bên trong thư mục Documents. Điều này để chắc chắn rằng bạn ko ghi đè ảnh lên thư mục ảnh đã lưu trước đó. Bạn sẽ sử dụng *ImageSaver* trong app để lưu các file ảnh.

Trong *CameraViewController.swift*, define một variable mới ở trên cùng của class như bên dưới:

`var saver: ImageSaver?`
Sau đó, scroll xuống recordTapped(_:) và thêm đoạn sau vào cuối method:
`saver = ImageSaver()`
Vừa rồi bạn vừa tạo một object ImageSaver mới mỗi khi ấn vào nút chụp ảnh, điều này sẽ chắc chắn rằng ảnh sẽ được lưu vào thư mục mới.
Tiếp Theo, scroll đến captureOutput(_:didOutput:from:) và thêm dòng code sau sau câu lệnh if:

```swift
// 1
guard 
  let imageBuffer = CMSampleBufferGetImageBuffer(sampleBuffer),
  let cgImage = CIImage(cvImageBuffer: imageBuffer).cgImage() 
  else {
    return
}
// 2
let image = CIImage(cgImage: cgImage)
// 3 
saver?.write(image)
```

Với đoạn code trên, bạn sẽ:

・Trích xuất *CVImageBuffer* từ sample buffer và chuyển đổi sang *CGImage*.
・Chuyển đổi *CGImage* sang *CIImage*.
・Write ảnh vào thư mục Documents.

Xong, build và chạy app. Chọn nút chụp ảnh và sau khi xong, chuyển sang app Files. Bên trong thư mục Evanesco, bạn sẽ thấy folder với tên là dạng UUID với 20 ảnh trong đó.

![](https://images.viblo.asia/02387600-389c-4e50-8b3c-c2fd347c8c88.png)

Nếu bạn xem trong thư mục này, bạn sẽ thấy có 20 frames mà bạn đã chụp trong 4 giây vừa rồi.

![](https://images.viblo.asia/f0258a18-fa9f-48c3-97e1-bc86ed5ab6c1.jpg)

OK, tuyệt.Vậy chúng ta có thể làm gì với 20 bức ảnh gần như giống nhau này?

# Photo Stacking

Trong kỹ thuật xử lý ảnh, photo stacking là một công nghệ mà nhiều ảnh được chụp, rồi căn chỉnh để tạo nên một hiệu ứng mong muốn.

Ví dụ, ảnh HDR được tạo bằng cách chụp nhiều ảnh với nhiều mức độ phơi sáng khác nhau, và kết hợp những phần tốt nhất vào với nhau. Đó là lý do bạn có thể thấy những phần đổ bóng và phần sáng rõ ràng của bầu trời giả lập trong iOS.

Những ảnh chụp thiên văn cũng được sử dụng nhiều công nghệ photo stacking. Thời gian phơi sáng ảnh ngắn, thì cảm biến sẽ chụp được ảnh với độ nhiễu thấp. Vì thế ảnh thiên văn thường là sự kết hợp của nhiều bức ảnh với thời gian phơi sáng ngắn và xếp chồng lên nhau để tăng độ sáng.

Trong kỹ thuật chụp ảnh macro, rất khó để có thể lấy nét toàn bộ bức ảnh trong một lần. Sử dụng photo stacking, người chụp có thể chụp một vài bức ản với focus khác nhau rồi kết hợp chúng thành một để tạo nên một bức ảnh hoàn hảo.

Để kết hợp các ảnh với nhau, đầu tiên bạn sẽ cần căn chỉnh chúng. Bằng cách nào? iOS cung cấp một vài API thú vị có thể giúp bạn trong việc này.

# Sử dụng Vision để căn chỉnh ảnh

Vision framework có hai phần API khác nhau cho việc căn chỉnh ảnh: **VNTranslationalImageRegistrationRequest** và **VNHomographicImageRegistrationRequest**. Cách dùng cũng khá dễ, nếu bạn coi như người dùng app sẽ giữ điện thoại hoàn toàn cố đinh, vậy là đủ.

Để làm code dễ đọc hơn, bạn sẽ tạo một class mới để xử lý việc căn chỉnh và kết hợp các ảnh đã chụp.

Tạo một file Swift mới và rỗng, đặt tên là *ImageProcessor.swift*.

Xoá bỏ những đoạn code import, và thêm code như dưới đây:

```swift
import CoreImage
import Vision

class ImageProcessor {
  var frameBuffer: [CIImage] = []
  var alignedFrameBuffer: [CIImage] = []
  var completion: ((CIImage) -> Void)?
  var isProcessingFrames = false

  var frameCount: Int {
    return frameBuffer.count
  }
}
```

Ở đây, bạn sẽ dùng **Vision** framework và define class **ImageProcessor** cùng với một vài thuộc tính cần thiết:

▪️ *frameBuffer* sẽ lưu trữ ảnh đã chụp

▪️ *alignedFrameBuffer* sẽ so sánh các ảnh sau khi được căn chỉnh

▪️ completion là handler sẽ được gọi sau khi ảnh được căn chỉnh và kết hợp

▪️ *isProcessingFrames* sẽ xác định ảnh nào đang được căn chỉnh và kết hợp

▪️ *frameCount* là số ảnh đã được chụp

Tiếp theo, thêm những method sau vào trong class **ImageProcessor**:

```swift
func add(_ frame: CIImage) {
  if isProcessingFrames {
    return
  }
  frameBuffer.append(frame)
}
```

Method này sẽ thêm những frame ảnh đã chụp vào frame buffer, những chỉ khi bạn đang không xử lý những frame này trong frame buffer.

Vẫn trong class này, thêm những xử lý sau:

```swift
func processFrames(completion: ((CIImage) -> Void)?) {
  // 1
  isProcessingFrames = true  
  self.completion = completion
  // 2
  let firstFrame = frameBuffer.removeFirst()
  alignedFrameBuffer.append(firstFrame)
  // 3
  for frame in frameBuffer {
    // 4
    let request = VNTranslationalImageRegistrationRequest(targetedCIImage: frame)

    do {
      // 5      
      let sequenceHandler = VNSequenceRequestHandler()
      // 6
      try sequenceHandler.perform([request], on: firstFrame)
    } catch {
      print(error.localizedDescription)
    }
    // 7
    alignImages(request: request, frame: frame)
  }
  // 8
  cleanup()
}
```

Nhìn thì có vẻ nhiều bước, nhưng những method này cũng rất dễ hiểu. Bạn sẽ gọi method này sau khi đã thêm những frame ảnh đã chụp. Nó sẽ xử lý từng frame và căn chỉnh chúng sử dụng Vision framework. Đặc biệt, trong đoạn code này bạn sẽ:

▪️ Sử dụng biến Boolean isProcessingFrames để ngăn việc tạo thêm nhiều frame. Bạn cũng lưu lại completion handler để sử dụng sau.

▪️ Xoá frame đầu tiên khỏi frame buffer và thêm nó vào frame buffer dành cho căn chỉnh ảnh. Tất cả những frame khác sẽ được căn chỉnh theo frame này.

▪️ Lặp qua mỗi frame trong frame buffer.

▪️ Sử dụng frame để tạo một yêu cầu mới đến Vision để xác định một căn chỉnh dịch đơn giản.

▪️ Tạo một yêu cầu handler tuần tự, cái sẽ xử lý yêu cầu căn chỉnh của bạn.

▪️ Thực hiện yêu cầu đến Vision để căn chỉnh frame đầu tiên và bắt lỗi nếu có.

▪️ Gọi alignImages(request:frame:) với request và frame hiện tại. Method này vẫn đang rỗng, bạn sẽ xử lý mothed này trong phần tới.

▪️Clean up. Bạn cần sử dụng method này.

Bạn đã sẵn sàng để giải quyết *alignImages(request:frame:)*?

Thêm đoạn code dưới đâu ngay dưới *processFrames(completion:)*:
```swift
func alignImages(request: VNRequest, frame: CIImage) {
  // 1
  guard 
    let results = request.results as? [VNImageTranslationAlignmentObservation],
    let result = results.first 
    else {
      return
  }
  // 2
  let alignedFrame = frame.transformed(by: result.alignmentTransform)
  // 3
  alignedFrameBuffer.append(alignedFrame)
}
```

Xử lý trên gồm:

・Unwrap kết quả đầu tiên trả về từ yêu cầu căn chỉnh bạn đã tạo bên trong vòng lặp của processFrames(completion:).
・Chuyển đổi frame sử dụng ma trận affine được tính toán bởi Visionframework.
・Áp dụng chuyển đổi frame này để cho frame buffer đã căn chỉnh.
Hai dòng cuối là cần thiết khi sử dụng Vision. Bạn thực hiện yêu cầu và sau đó sử dụng kết quả để chỉnh sửa ảnh. Cuối cùng là clean up.

Thêm đoạn sau vào cuối của class **ImageProcessor**:
```go
func cleanup() {
  frameBuffer = []
  alignedFrameBuffer = []
  isProcessingFrames = false
  completion = nil
}
```

Trong *cleanup()*, bạn đơn giản là xoá bỏ hai frame buffer, reset lại cờ sang giá trị cái mà bạn ko còn sử dụng để xử lý ảnh và set completion handler thành nil.

Trước khi build và chạy app, bạn cần sử dụng **ImageProcessor** trong **CameraViewController**.

Mở **CameraViewController.swift**. Trên cùng của class, define những thuộc tính sau:

```swift
let imageProcessor = ImageProcessor()
```

Tiếp Theo, tìm *captureOutput(:didOutput:from:)*. Bạn sẽ thực hiện hai thay đổi nhỏ.

Thêm dòng sau vào ngay dưới let image = ... line:

`imageProcessor.add(image)`

Và bên dưới *stopRecording()*, vẫn nằm trong lệnh if, thêm:

`imageProcessor.processFrames(completion: displayCombinedImage)`

Build, chạy app lên và … chẳng có gì xảy ra cả😂. 
Đừng lo lắng, bạn vẫn cần gộp tất cả các ảnh vào một mảnh lớn. Để biết làm sao để làm được điều đó. Đón xem kỳ tiếp theo😉