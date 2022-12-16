“How do you resize an image in iOS App?”

Có thể câu hỏi này đã được hỏi khá nhiều trên Stack Overflow, và với bài viết này chúng ta hãy cùng xem xét 5 kỹ thuật riêng biệt để thay đổi kích thước hình ảnh trên iOS (và macOS, thực hiện chuyển đổi UIImage → NSImage phù hợp). Nhưng thay vì chỉ định một cách tiếp cận duy nhất cho mọi tình huống, chúng ta sẽ cân nhắc tính tối ưu đối với các tiêu chuẩn hiệu suất để hiểu rõ hơn khi sử dụng phương pháp này so với phương pháp khác.

### Khi nào và tại sao phải chia tỷ lệ hình ảnh

<br>

Với UIImageView tự động chia tỷ lệ và cắt hình ảnh theo hành vi được chỉ định bởi thuộc tính contentMode của nó. Và trong phần lớn các trường hợp,` .scaleAspectFit`, `.scaleAspectFill` hoặc `.scaleToFill` cung cấp chính xác hành vi bạn cần.

```
imageView.contentMode = .scaleAspectFit
imageView.image = image
```

Vì vậy, khi nó có ý nghĩa để thay đổi kích thước một hình ảnh?


**Khi nó có kích thước lớn hơn đáng kể so với chế độ xem hình ảnh mà hiển thị.**

Hãy xem xét hình ảnh tuyệt đẹp này của Trái đất, từ danh mục hình ảnh Trái đất có thể nhìn thấy của NASA:

![](https://images.viblo.asia/6ccf2bbc-856e-41e7-8b17-546f1171cd15.jpg)


<br>


Ở độ phân giải đầy đủ, hình ảnh này có kích thước 12.000 px và nặng tới 20 MB. Bạn có thể không nghĩ nhiều về một vài megabyte được cung cấp phần cứng ngày hôm nay, nhưng đó chỉ là kích thước nén của nó. Để hiển thị nó, trước tiên, UIImageView cần giải mã JPEG đó thành bitmap. Nếu bạn đã đặt hình ảnh có kích thước đầy đủ này trên chế độ xem hình ảnh, thì việc sử dụng bộ nhớ của ứng dụng của bạn sẽ tăng lên hàng trăm Megabyte mà không có lợi ích đáng kể nào cho người dùng.

<br>

Bằng cách đơn giản thay đổi kích thước hình ảnh đó thành kích thước của chế độ xem hình ảnh trước khi đặt thuộc tính hình ảnh của nó, bạn có thể sử dụng RAM ít hơn theo thứ tự:

<br>

![](https://images.viblo.asia/ac66c017-931f-4239-91a8-b56fae76192d.png)

Kỹ thuật này được gọi là downsampling và có thể cải thiện đáng kể hiệu suất của ứng dụng của bạn trong các loại tình huống này. Nếu bạn quan tâm đến một số thông tin khác về downsampling và các thực tiễn tốt nhất về hình ảnh và đồ họa khác, vui lòng tham [điều này từ WWDC 2018](https://developer.apple.com/videos/play/wwdc2018/219/).

### Kỹ thuật thay đổi kích thước hình ảnh

<br>

Có một số cách tiếp cận khác nhau để thay đổi kích thước hình ảnh, mỗi cách có khả năng và đặc điểm hiệu suất khác nhau. Và các ví dụ mà chúng tôi đang xem xét trong bài viết này bao gồm các khung ở cả cấp độ thấp và cấp độ cao, từ Core Graphics, vImage và I/O hình ảnh đến Core Image và UIKit:

* [Drawing to a UIGraphicsImageRenderer](https://nshipster.com/image-resizing/#technique-1-drawing-to-a-uigraphicsimagerenderer)
* [Drawing to a Core Graphics Context](https://nshipster.com/image-resizing/#technique-2-drawing-to-a-core-graphics-context)
* [Creating a Thumbnail with Image I/O](https://nshipster.com/image-resizing/#technique-3-creating-a-thumbnail-with-image-io)
* [Lanczos Resampling with Core Image](https://nshipster.com/image-resizing/#technique-4-lanczos-resampling-with-core-image)
*[ Image Scaling with vImage](https://nshipster.com/image-resizing/#technique-5-image-scaling-with-vimage)

<br>

Để thống nhất, mỗi kỹ thuật sau đây có chung một giao diện:


```
func resizedImage(at url: URL, for size: CGSize) -> UIImage? { ... }

imageView.image = resizedImage(at: url, for: size)
```

<br>

Ở đây, kích thước là thước đo kích thước điểm, thay vì kích thước pixel. Để tính kích thước pixel tương đương cho hình ảnh đã thay đổi kích thước của bạn, hãy chia tỷ lệ kích thước của khung nhìn hình ảnh của bạn theo tỷ lệ của main UIScreen của bạn:

```
let scaleFactor = UIScreen.main.scale
let scale = CGAffineTransform(scaleX: scaleFactor, y: scaleFactor)
let size = imageView.bounds.size.applying(scale)
```

<br>

> Nếu bạn đang tải một hình ảnh lớn không đồng bộ, hãy sử dụng chuyển tiếp để làm mờ hình ảnh khi được đặt trên chế độ xem hình ảnh. Ví dụ:
> ```
> class ViewController: UIViewController {
>     @IBOutlet var imageView: UIImageView!
> 
>     override func viewWillAppear(_ animated: Bool) {
>         super.viewWillAppear(animated)
> 
>         let url = Bundle.main.url(forResource: "Blue Marble West",
>                                 withExtension: "tiff")!
> 
>         DispatchQueue.global(qos: .userInitiated).async {
>             let image = resizedImage(at: url, for: self.imageView.bounds.size)
> 
>             DispatchQueue.main.sync {
>                 UIView.transition(with: self.imageView,
>                                 duration: 1.0,
>                                 options: [.curveEaseOut, .transitionCrossDissolve],
>                                 animations: {
>                                     self.imageView.image = image
>                                 })
>             }
>         }
>     }
> }
> ```

<br>

#### Technique #1: Drawing to a UIGraphicsImageRenderer

<br>

Các API cấp cao nhất để thay đổi kích thước hình ảnh được tìm thấy trong khung UIKit. Đưa ra một UIImage, bạn có thể vẽ vào bối cảnh **UIGraphicsImageRenderer** để hiển thị phiên bản thu nhỏ của hình ảnh đó:

```
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

<br>

**UIGraphicsImageRenderer** là một API tương đối mới, được giới thiệu trong iOS 10 để thay thế các API **UIGraphicsBeginImageContextWithOptions** / **UIGraphicsEndImageContext**. Bạn xây dựng một **UIGraphicsImageRenderer** bằng cách chỉ định kích thước điểm. Phương thức hình ảnh lấy một đối số bao đóng và trả về một bitmap kết quả từ việc thực hiện bao đóng đã qua. Trong trường hợp này, kết quả là hình ảnh gốc được thu nhỏ lại để vẽ trong giới hạn đã chỉ định.

<br>

> Nó thường hữu ích để thu nhỏ kích thước ban đầu để vừa trong khung mà không thay đổi tỷ lệ khung hình gốc. **AVMakeRect (facRatio: InsideRect:)** là một chức năng tiện dụng được tìm thấy trong  **AVFoundation** đảm nhiệm việc tính toán đó cho bạn:
> 
> ```
> import func AVFoundation.AVMakeRect
> let rect = AVMakeRect(aspectRatio: image.size, insideRect: imageView.bounds)
> ```

<br>

#### Technique #2: Drawing to a Core Graphics Context

<br>

Core Graphics / Quartz 2D cung cấp một bộ API cấp thấp hơn cho phép cấu hình nâng cao hơn.

Đưa ra một CGImage, bối cảnh bitmap tạm thời được sử dụng để hiển thị hình ảnh được chia tỷ lệ, sử dụng phương thức draw (_: in:):

```
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

<br>

Trình khởi tạo **CGContext** này cần một số đối số để xây dựng bối cảnh, bao gồm các kích thước mong muốn và dung lượng bộ nhớ cho mỗi kênh trong một không gian màu nhất định. Trong ví dụ này, các tham số này được tìm nạp từ đối tượng **CGImage**. Tiếp theo, đặt thuộc tính **interpolationQuality** thành .high hướng dẫn bối cảnh để nội suy các pixel ở mức độ trung thực. Phương thức draw (_: in:) vẽ hình ảnh ở một kích thước và vị trí nhất định, cho phép hình ảnh được cắt trên một cạnh cụ thể hoặc để phù hợp với một tập hợp các tính năng hình ảnh, chẳng hạn như khuôn mặt. Cuối cùng, phương thức **makeImage()** nắm bắt thông tin từ ngữ cảnh và hiển thị nó thành giá trị **CGImage** (sau đó được sử dụng để xây dựng một đối tượng **UIImage**).


#### Technique #3: Creating a Thumbnail with Image I/O

<br>

Hình ảnh I/O là một framework mạnh mẽ (mặc dù ít được biết đến) để làm việc với hình ảnh. Không phụ thuộc vào **Core Graphics**, nó có thể đọc và ghi giữa nhiều định dạng khác nhau, truy cập siêu dữ liệu ảnh và thực hiện các hoạt động xử lý ảnh phổ biến. Khung này cung cấp các bộ mã hóa và giải mã hình ảnh nhanh nhất trên nền tảng, với các cơ chế bộ đệm ẩn tiên tiến - và thậm chí khả năng tải hình ảnh tăng dần.

**CGImageSourceCreateThumbnailAtIndex**  cung cấp API ngắn gọn với các tùy chọn khác nhau được tìm thấy trong các lệnh gọi Core Graphics tương đương:

```
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

<br>

Đưa ra một **CGImageSource** và tập hợp các tùy chọn, hàm **CGImageSourceCreateThumbnailAtIndex** (_: _: _) tạo ra hình thu nhỏ của hình ảnh. Thay đổi kích thước được thực hiện bằng tùy chọn **kCGImageSourceThumbnailMaxPixelSize**, chỉ định kích thước tối đa được sử dụng để chia tỷ lệ hình ảnh theo tỷ lệ khung hình gốc. Bằng cách đặt tùy chọn **kCGImageSourceCreateThumbnailFromImageIfAbsent** hoặc **kCGImageSourceCreateThumbnailFromImageAlways**, Image I/O sẽ tự động lưu trữ kết quả thu nhỏ cho các cuộc gọi tiếp theo.

<br>

#### Technique #4: Lanczos Resampling with Core Image

<br>

Core Image cung cấp chức năng [Lanczos resampling](https://en.wikipedia.org/wiki/Lanczos_resampling) tích hợp bằng bộ lọc **CILanczosScaleTransform** cùng tên. Mặc dù được cho là API cấp cao hơn UIKit, việc sử dụng mã hóa giá trị khóa trong Core Image khiến cho việc sử dụng nó trở nên khó khăn.

Quá trình tạo bộ lọc biến đổi, định cấu hình và hiển thị hình ảnh đầu ra không khác với bất kỳ quy trình làm việc Core Image nào khác:

```
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

Bộ lọc Core Image có tên **CILanczosScaleTransform** chấp nhận inputImage, inputScale và tham số inputAspectRatio.

Thú vị hơn, một **CIContext** được sử dụng ở đây để tạo UIImage (bằng cách đại diện trung gian **CGImageRef**), vì **UIImage (CIImage:)** không hoạt động như mong đợi. Tạo một **CIContext** là một hoạt động đắt tiền, do đó, một bối cảnh được lưu trữ được sử dụng để thay đổi kích thước lặp đi lặp lại.

<br>

> Một CIContext có thể được tạo bằng cách sử dụng GPU hoặc CPU (chậm hơn nhiều) để kết xuất. Chỉ định .useSoftwareRenderer tùy chọn trong trình khởi tạo để chọn sử dụng cái nào. (Gợi ý: Sử dụng cái nhanh hơn, có thể?)

<br>

#### Technique #5: Image Scaling with vImage

Cuối cùng, nó là **[Accelerate framework](https://developer.apple.com/documentation/accelerate)**  - hay cụ thể hơn là framework phụ xử lý ảnh vImage.


vImage đi kèm với một loạt các chức năng khác nhau để nhân rộng bộ đệm hình ảnh. Các API cấp thấp hơn này hứa hẹn hiệu năng cao với mức tiêu thụ điện năng thấp, nhưng với chi phí tự mình quản lý bộ đệm (chưa kể, có nhiều mã hơn để viết):

```
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

Các API tăng tốc được sử dụng ở đây rõ ràng hoạt động ở mức thấp hơn nhiều so với bất kỳ phương pháp thay đổi kích thước nào khác được thảo luận cho đến nay. Nhưng hãy vượt qua các loại hàm và tên hàm không thân thiện, và bạn sẽ thấy rằng cách tiếp cận này khá đơn giản.

* Đầu tiên, tạo bộ đệm nguồn từ hình ảnh đầu vào của bạn.
* Sau đó, tạo một bộ đệm đích để giữ hình ảnh được chia tỷ lệ
* Tiếp theo, chia tỷ lệ dữ liệu hình ảnh trong bộ đệm nguồn sang bộ đệm đích.
* Cuối cùng, tạo một hình ảnh từ dữ liệu hình ảnh kết quả trong bộ đệm đích.

### Hiệu suất

Các số sau đây cho thấy thời gian chạy trung bình trên nhiều lần lặp để tải, chia tỷ lệ và hiển thị hình ảnh *[jumbo-sized picture of the earth](https://visibleearth.nasa.gov/view.php?id=78314)* từ trước:

![](https://images.viblo.asia/5e905983-473c-4dee-a827-90cc07d2e17f.png)

1. Kết quả thống nhất giữa các giá trị khác nhau của **CGInterpolationQuality**, với sự khác biệt không đáng kể về điểm chuẩn hiệu suất.
2. Setting **kCIContextUseSoftwareRenderer** thành true trên các tùy chọn được truyền trong quá trình tạo CIContext mang lại kết quả chậm hơn so với kết quả cơ bản.

### Kết luận

Tất cả **UIKit**, **Core Graphic**s và **Image I/O** đều hoạt động tốt cho các thao tác mở rộng trên hầu hết các hình ảnh. Nếu bạn phải chọn một (ít nhất là trên iOS), **UIGraphicsImageRenderer** thường là lựa chọn tốt nhất của bạn.

<br>

**Core Image** vượt trội hơn so với các hoạt động chia tỷ lệ hình ảnh. Trên thực tế, theo phần Thực hành tốt nhất về Hiệu suất của Apple trong Hướng dẫn lập trình hình ảnh cốt lõi, bạn nên sử dụng các chức năng Core Graphics hoặc Image I / O để cắt và ghép hình ảnh thay vì Core Image.

<br>

Trừ khi bạn đã làm việc với `vImage`, công việc bổ sung cần thiết để sử dụng API tăng tốc cấp thấp có thể không phải là lý do trong hầu hết các trường hợp.

Bài viết được dịch từ [bài viết](https://nshipster.com/image-resizing/#technique-3-creating-a-thumbnail-with-image-io) cùng tên của tác giả [Mattt](https://nshipster.com/authors/mattt/).