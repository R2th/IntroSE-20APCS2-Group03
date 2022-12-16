- Gõ tìm kiếm câu hỏi **"How do you resize an image?"** trên Stack Overflow chúng ta sẽ tìm được rất nhiều code sample cũng như các phương pháp giải quyết khác nhau. Để tổng hợp lại chúng ta sẽ cùng tìm hiểu 5 phương pháp kỹ thuật khác nhau để resize image trong iOS(macOS, cũng như việc chuyển đổi thích hợp giữa ***UIImage*** -> ***NSImage***). Quan trọng hơn nữa là tìm các solution thích hợp cho từng trường hợp.
# Khi nào và tại sao chúng ta scale images?
- Chúng ta cần resize image khi mà image mà chúng ta có được lớn hơn nhiều so với ảnh chúng ta có thể hiển thị được.
- **UIImageView** tự động scale và crop image theo trình tự đã được định sẵn bời **contentMode** property và trong các case  .**scaleAspectFit**, .**scaleAspectFill**, hoặc .**scaleToFill**.
```swift
imageView.contentMode = .scaleAspectFit
imageView.image = image
```
- Để minh hoạ cụ thể ta có thể xem [bức ảnh chụp trái đất từ không gian](https://visibleearth.nasa.gov/view.php?id=78314). Ở độ phân giải cao đây đủ, bức ảnh đạt **12000px** và chiếm tới **20MB**. Có thể bạn sẽ nghĩ nó không phải là vấn đề so với phần cứng hiện nay nhưng nên nhớ nó mới chỉ là dung lượng đã được nén. Để hiển thị nó, UIImageView cần **decode** JPEG file này thành **bitmap**. Nếu bạn đã set bức ảnh fullsize này, bộ nhớ app của bạn sẽ lên tới cả trăm megabytes và điều đó thì không có lợi gì cho người sử dụng.
- Bằng việc **resizing** cho bức ảnh này, chúng ta có thể tiết kiệm được khá nhiều **RAM**:
![](https://images.viblo.asia/1f6d7884-611f-4e05-8724-0be6f267b664.png)
- Kỹ thuật này được biết đến như là **downsampling** và nó thể cải thiện rất nhiều hiệu năng của app trong trường hợp sử dụng nó. Nếu bạn có hứng thú với thông tin của downsampling và các bài tập về images thì hãy tham khảo những bài giảng tuyệt vời từ [WWDC-2018](https://developer.apple.com/videos/play/wwdc2018/219/).
- Ngày nay một số app có thể load những tấm ảnh lớn mà không khác xa với ảnh gốc mà chúng ta nhận từ designer. Để thực hiện điều đó chúng ta cùng tham khảo 1 số phương pháp resizing nhé!
# Những kỹ thuật resizing images?
- Có nhiều cách khác nhau để có thể resizing image, mỗi cách khác nhau mang đến những hiệu năng khác nhau. Chúng ta có thể tìm kiếm những cách thức này ở low/high-level từ **Core Graphics**, **vImage**, **Image I/O**, **Core Graphics** và cả **UIKit**:
    - [Drawing to a UIGraphicsImageRenderer](https://nshipster.com/image-resizing/#technique-1-drawing-to-a-uigraphicsimagerenderer)
    - [Drawing to a Core Graphics Context](https://nshipster.com/image-resizing/#technique-2-drawing-to-a-core-graphics-context)
    - [Creating a Thumbnail with Image I/O](https://nshipster.com/image-resizing/#technique-3-creating-a-thumbnail-with-image-io)
    - [Lanczos Resampling with Core Image](https://nshipster.com/image-resizing/#technique-4-lanczos-resampling-with-core-image)
    - [Image Scaling with vImage](https://nshipster.com/image-resizing/#technique-5-image-scaling-with-vimage)
- Để nhất quán, mỗi một kỹ thuật sau sẽ dùng chung 1 mẫu:
```swift
func resizedImage(at url: URL, for size: CGSize) -> UIImage? { ... }
imageView.image = resizedImage(at: url, for: size)
```
- Ở đây, size là cách đo **point-size** thay vì dùng **pixel-size**. Để tính toán **pixel-size** cho việc scale, resizing size chúng ta dùng scale của **UIScreen**:
```swift
let scaleFactor = UIScreen.main.scale
let scale = CGAffineTransform(scaleX: scaleFactor, y: scaleFactor)
let size = imageView.bounds.size.applying(scale)
```
- Nếu bạn đang load asynchronously 1 tấm ảnh lớn hãy sử dụng transition để có tấm ảnh mờ trước trong imageview. VD:
```swift
class ViewController: UIViewController {
    @IBOutlet var imageView: UIImageView!

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)

        let url = Bundle.main.url(forResource: "Blue Marble West",
                                withExtension: "tiff")!

        DispatchQueue.global(qos: .userInitiated).async {
            let image = resizedImage(at: url, for: self.imageView.bounds.size)

            DispatchQueue.main.sync {
                UIView.transition(with: self.imageView,
                                duration: 1.0,
                                options: [.curveEaseOut, .transitionCrossDissolve],
                                animations: {
                                    self.imageView.image = image
                                })
            }
        }
    }
}
```
# 1/ Sử dụng UIGraphicsImageRenderer.
- Highest-level API hỗ trợ việc resizing ở trong UIKit framework. UIImage cho phép bạn có thể vẽ ở trong **UIGraphicsImageRenderer** context để render và thu nhỏ bức ảnh:
```swift
import UIKit

// Technique #1
func resizedImage(at url: URL, for size: CGSize) -> UIImage? {
    guard let image = UIImage(contentsOfFile: url.path) else {
        return nil
    }

    let renderer = UIGraphicsImageRenderer(size: size)
    return renderer.image { (context) in
        image.draw(in: CGRect(origin: .zero, size: size))
    }
}
```
- **UIGraphicsImageRenderer** là một API tương đối mới được giới thiệu trong iOS10 để thay thế cho những API **UIGraphicsBeginImageContextWithOptions** / **UIGraphicsEndImageContext**. Bạn xây dựng **UIGraphicsImageRenderer** bằng point-size. Method image sẽ tạo 1 closure và trả về kết quả những bitmap từ closure. Trong trường hợp này, kết quả trả về là bức ảnh gốc được thu nhỏ lại trong giới hạn chỉ định.
- **UIGraphicsImageRenderer** hữu ích trong việc thu nhỏ kích thước ban đầu bức ảnh để phù hợp với khung ảnh hiển thị mà không thay đổi tỉ lệ gốc. A**VMakeRect(aspectRatio:insideRect:)** là function trong **AVFoundation** đảm trách tính toán này cho bạn:
```swift
import func AVFoundation.AVMakeRect
let rect = AVMakeRect(aspectRatio: image.size, insideRect: imageView.bounds)
```

# 2/ Sử dụng Core Graphics.
- **Core Graphics** / **Quartz 2D** là một lower-level API cho phép chúng ta có nhiều tuỳ chỉnh cá nhân hơn.
- Chúng ta sẽ có CGImage, một context bitmap tạm thời được sử dụng để render các bức ảnh đã scale bằng method **draw(_ in: ...):**
```swiff  
import UIKit
import CoreGraphics

// Technique #2
func resizedImage(at url: URL, for size: CGSize) -> UIImage? {
    guard let imageSource = CGImageSourceCreateWithURL(url as NSURL, nil),
        let image = CGImageSourceCreateImageAtIndex(imageSource, 0, nil)
    else {
        return nil
    }

    let context = CGContext(data: nil,
                            width: Int(size.width),
                            height: Int(size.height),
                            bitsPerComponent: image.bitsPerComponent,
                            bytesPerRow: image.bytesPerRow,
                            space: image.colorSpace ?? CGColorSpace(name: CGColorSpace.sRGB)!,
                            bitmapInfo: image.bitmapInfo.rawValue)
    context?.interpolationQuality = .high
    context?.draw(image, in: CGRect(origin: .zero, size: size))

    guard let scaledImage = context?.makeImage() else { return nil }

    return UIImage(cgImage: scaledImage)
}
```
- **CGContext** khởi tạo yêu cầu một vài arguments để tạo context, bao gồm các tham số kích thước và dung lượng bộ nhớ cho mỗi channel với các color space .
Trong ví dụ này, các parameter được lấy ra từ **CGImage** object. Tiếp đó, việc setting **interpolationQuality** property thành .high để nội suy cho các pixel ảnh được hiển thị trung thực, Method** draw(_:in**) sẽ vẽ lại image được cung cấp size và position, cho phép bức ảnh được crop và cắt các góc cạnh cho vừa với đặc điểm yêu cầu hiển thị. Cuối cùng, method makeImage() sẽ truyền những thông tin từ context có được vừa render nó cho CGImage.

# 3/ Sử dụng Image I/O.
- **Image I/O** là 1 framework mạnh mẽ để làm việc với image. Nó hoạt động độc lập với **Core Graphics**, nó có thể **read** and **write** giữa các format khác nhau, các loại data photo khác nhau và tiến hành xử lý các phương thức xử lý ảnh thông thường. Framework này cho phép các hình thức **encoder** và **decoder** nhanh nhất với các cơ chế caching nâng cao, thậm chí là khả năng load từng bước image.
- Một chú ý quan trọng là **CGImageSourceCreateThumbnailAtIndex** cung cấp API ngắn gọn với những lựa chọn khác nhau tỏ ra hữu dụng hơn với những thứ được cung cấp trong CoreGraphics.
```swift 
import ImageIO

// Technique #3
func resizedImage(at url: URL, for size: CGSize) -> UIImage? {
    let options: [CFString: Any] = [
        kCGImageSourceCreateThumbnailFromImageIfAbsent: true,
        kCGImageSourceCreateThumbnailWithTransform: true,
        kCGImageSourceShouldCacheImmediately: true,
        kCGImageSourceThumbnailMaxPixelSize: max(size.width, size.height)
    ]

    guard let imageSource = CGImageSourceCreateWithURL(url as NSURL, nil),
        let image = CGImageSourceCreateThumbnailAtIndex(imageSource, 0, options as CFDictionary)
    else {
        return nil
    }

    return UIImage(cgImage: image)
}
```
- Chúng ta có **CGImageSource** để có thể set các tuỳ chọn, func **CGImageSourceCreateThumbnailAtIndex(_:_:_:)** tạo một thumbnail của bức ảnh để chúng ta có thể preview. Việc resizing hoàn thành bởi **kCGImageSourceThumbnailMaxPixelSize** với kích thước tối đa được sử dụng để chia tỷ lệ bức hình theo hình ảnh gốc. Với việc setting **kCGImageSourceCreateThumbnailFromImageIfAbsent** hoặc **kCGImageSourceCreateThumbnailFromImageAlways**, **Image I/O** tự động cache và scale kết quả cho lần sử dụng tiếp theo.

# 4/ Sử dụng Core Image.
- **Core Image** được xây dựng trên các [function](https://en.wikipedia.org/wiki/Lanczos_resampling) bằng cách lọc các **CILanczosScaleTransform** có tên giống nhau. Mặc dù được cho là API cao cấp hơn của UIKit, việc sử dụng các key-value coding trong **Core Image** làm nó khó sử dụng.
- Qúa trình tạo bộ lọc để transform, config và render cho ra các bức ảnh không khác với quy trình của các API khác:
```swift
import UIKit
import CoreImage

let sharedContext = CIContext(options: [.useSoftwareRenderer : false])

// Technique #4
func resizedImage(at url: URL, scale: CGFloat, aspectRatio: CGFloat) -> UIImage? {
    guard let image = CIImage(contentsOf: url) else {
        return nil
    }

    let filter = CIFilter(name: "CILanczosScaleTransform")
    filter?.setValue(image, forKey: kCIInputImageKey)
    filter?.setValue(scale, forKey: kCIInputScaleKey)
    filter?.setValue(aspectRatio, forKey: kCIInputAspectRatioKey)

    guard let outputCIImage = filter?.outputImage,
        let outputCGImage = sharedContext.createCGImage(outputCIImage,
                                                        from: outputCIImage.extent)
    else {
        return nil
    }

    return UIImage(cgImage: outputCGImage)
}
```
- **Core Image** lọc các bộ phận có tên  **CILanczosScaleTransform** trong parameter là **inputImage**, **inputScale** và **inputAspectRatio**. Thú vị hơn là một **CIContext** được sử dụng để tạo **UIImage** bằng đại diện trung gian là **CGImageRef**. Với **UIImage(CIImage:)** không thường làm việc như mong đợi, tạo ra **CIContext** là một cách thay thế. Việc cache được sử dụng nhiều lần trong việc resizing.

# 5/ Sử dụng vImage.
- Kỹ thuật cuối cùng là scale image với vImage với các function để scale các image. Những lower-level API này hứa hẹn cho hiệu năng cao so với ít công đoạn yêu cầu. Ngoại trừ việc bạn phải quản lý việc các phần nhớ đệm bằng tay:(lol)
```swift
import UIKit
import Accelerate.vImage

// Technique #5
func resizedImage(at url: URL, for size: CGSize) -> UIImage? {
    // Decode the source image
    guard let imageSource = CGImageSourceCreateWithURL(url as NSURL, nil),
        let image = CGImageSourceCreateImageAtIndex(imageSource, 0, nil),
        let properties = CGImageSourceCopyPropertiesAtIndex(imageSource, 0, nil) as? [CFString: Any],
        let imageWidth = properties[kCGImagePropertyPixelWidth] as? vImagePixelCount,
        let imageHeight = properties[kCGImagePropertyPixelHeight] as? vImagePixelCount
    else {
        return nil
    }

    // Define the image format
    var format = vImage_CGImageFormat(bitsPerComponent: 8,
                                      bitsPerPixel: 32,
                                      colorSpace: nil,
                                      bitmapInfo: CGBitmapInfo(rawValue: CGImageAlphaInfo.first.rawValue),
                                      version: 0,
                                      decode: nil,
                                      renderingIntent: .defaultIntent)

    var error: vImage_Error

    // Create and initialize the source buffer
    var sourceBuffer = vImage_Buffer()
    defer { sourceBuffer.data.deallocate() }
    error = vImageBuffer_InitWithCGImage(&sourceBuffer,
                                         &format,
                                         nil,
                                         image,
                                         vImage_Flags(kvImageNoFlags))
    guard error == kvImageNoError else { return nil }

    // Create and initialize the destination buffer
    var destinationBuffer = vImage_Buffer()
    error = vImageBuffer_Init(&destinationBuffer,
                              vImagePixelCount(size.height),
                              vImagePixelCount(size.width),
                              format.bitsPerPixel,
                              vImage_Flags(kvImageNoFlags))
    guard error == kvImageNoError else { return nil }

    // Scale the image
    error = vImageScale_ARGB8888(&sourceBuffer,
                                 &destinationBuffer,
                                 nil,
                                 vImage_Flags(kvImageHighQualityResampling))
    guard error == kvImageNoError else { return nil }

    // Create a CGImage from the destination buffer
    guard let resizedImage =
        vImageCreateCGImageFromBuffer(&destinationBuffer,
                                      &format,
                                      nil,
                                      nil,
                                      vImage_Flags(kvImageNoAllocate),
                                      &error)?.takeRetainedValue(),
        error == kvImageNoError
    else {
        return nil
    }

    return UIImage(cgImage: resizedImage)
}
```
- [Accelerate APIs](https://developer.apple.com/documentation/accelerate) được sử dụng ở đây rất khó sử dụng trong việc triển khai so với các phương thức rezising khác. Bỏ qua việc các tên hàng và variable khó đọc bạn sẽ thấy phương thức triển khai này thì cách tiếp cận này cũng đáng để tìm hiểu.
    - Đầu tiên: tạo bộ nhớ đệm cho bức ảnh.
    - Thứ 2: tạo đường dẫn cho các bộ nhớ đệm này.
    - Thứ 3: chia tỷ lệ data cho bức ảnh trong bộ đệm tới đường dẫn được chỉ định.
    - Cuối cùng: Gắn lại một bức ảnh với data là kết quả trong bộ đệm nguồn.

# Performance Benchmarks???
- Tôi sẽ chia sẻ kết quả [performance benchmark](https://nshipster.com/benchmarking/) trên Iphone7, IOS 12.2
![](https://images.viblo.asia/03eb80db-7037-4276-af30-b14b9af35bb2.png)
![](https://images.viblo.asia/31fc4867-b7ef-40c4-938b-92d9640082d4.png)
# Kết luận:
- **UIKit**, **Core Graphics**, **Image I/O** đều hoạt động tốt trên các phương thức scaling ở hầu hết các bức ảnh. Nếu bạn sử dụng IOS, **UIGraphicsImageRenderer** là sự lựa chọn hàng đầu bạn nên cân nhắc.
- **Core Image** là sự lựa chọn tốt cho hiệu năng. Trên thực tế, theo các [Apple’s Performance Best Practices section of the Core Image Programming Guide](https://developer.apple.com/library/mac/documentation/graphicsimaging/Conceptual/CoreImaging/ci_performance/ci_performance.html#//apple_ref/doc/uid/TP30001185-CH10-SW1), bạn nên sử dụng **CoreGraphics** hoặc **Image/IO** để crop hoặc downsampling thay vì sử dụng **Core Image**.
- Trừ khi bạn thực sữ sẵn sàng đương đầu với **vImage**, các công việc bổ sung để có thể sử dụng API là không cần thiết trong đa số trường hợp.