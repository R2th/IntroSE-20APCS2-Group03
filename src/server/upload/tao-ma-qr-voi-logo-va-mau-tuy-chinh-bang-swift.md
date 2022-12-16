## Tạo mã QR với logo và màu tùy chỉnh bằng Swift
## 
Mã QR được sử dụng rất nhiều để chia sẻ nội dung hoặc thêm người dùng mới rất nhiều ứng dụng, đặc biệt là các ứng dụng chat hay gần đây nhất là ứng dụng vào việc phòng chống dịch covid. Kể từ iOS 11, người dùng có thể quét mã QR bằng ứng dụng máy ảnh tích hợp sẵn. Điều này làm cho việc tích hợp mã QR trong ứng dụng của riêng bạn thậm chí còn đẹp hơn.

### Tạo mã QR trong iOS
Việc tạo mã QR trong iOS dễ dàng hơn bao giờ hết kể từ khi bộ lọc Hình ảnh lõi CIQRCodeGenerator ra đời. Nó tạo ra một QR đen trắng đơn giản cho chuỗi đầu vào nhất định.

```
guard let qrFilter = CIFilter(name: "CIQRCodeGenerator") else { return nil }
let qrData = absoluteString.data(using: String.Encoding.ascii)
qrFilter.setValue(qrData, forKey: "inputMessage")

let qrTransform = CGAffineTransform(scaleX: 12, y: 12)
let qrImage = qrFilter.outputImage?.transformed(by: qrTransform)
```

Mã QR này đã hoạt động, nhưng nó không thực sự hấp dẫn và có lẽ nó không phù hợp với thiết kế tuyệt vời của ứng dụng của riêng bạn. Do đó, sẽ thực sự tuyệt vời nếu chúng ta có thể tùy chỉnh nó để phù hợp với thiết kế ứng dụng của mình. Chúng ta hãy cùng làm cho nó màu mè hơn chút nhé. 

Thay đổi màu của mã QR
Bước đầu tiên trong việc tùy chỉnh mã QR là thay đổi màu sắc. Chúng ta thực hiện việc này theo ba bước:
* Đảo ngược màu đen và trắng
* Mặt nạ màu đen thành trong suốt
* Thay đổi màu sắc

Để làm cho mã này dễ sử dụng hơn, chúng ta tạo một tiện ích mở rộng trên CIImage.

```
extension CIImage {
    /// Inverts the colors and creates a transparent image by converting the mask to alpha.
    /// Input image should be black and white.
    var transparent: CIImage? {
        return inverted?.blackTransparent
    }

    /// Inverts the colors.
    var inverted: CIImage? {
        guard let invertedColorFilter = CIFilter(name: "CIColorInvert") else { return nil }

        invertedColorFilter.setValue(self, forKey: "inputImage")
        return invertedColorFilter.outputImage
    }

    /// Converts all black to transparent.
    var blackTransparent: CIImage? {
        guard let blackTransparentFilter = CIFilter(name: "CIMaskToAlpha") else { return nil }
        blackTransparentFilter.setValue(self, forKey: "inputImage")
        return blackTransparentFilter.outputImage
    }

    /// Applies the given color as a tint color.
    func tinted(using color: UIColor) -> CIImage?
    {
        guard
            let transparentQRImage = transparent,
            let filter = CIFilter(name: "CIMultiplyCompositing"),
            let colorFilter = CIFilter(name: "CIConstantColorGenerator") else { return nil }

        let ciColor = CIColor(color: color)
        colorFilter.setValue(ciColor, forKey: kCIInputColorKey)
        let colorImage = colorFilter.outputImage

        filter.setValue(colorImage, forKey: kCIInputImageKey)
        filter.setValue(transparentQRImage, forKey: kCIInputBackgroundImageKey)

        return filter.outputImage!
    }
}
```

Mã QR thường liên kết đến một URL. Do đó,  chúng ta sẽ tạo một tiện ích mở rộng trên URL.

```
extension URL {

    /// Creates a QR code for the current URL in the given color.
    func qrImage(using color: UIColor) -> CIImage? {
        return qrImage?.tinted(using: color)
    }

    /// Returns a black and white QR code for this URL.
    var qrImage: CIImage? {
        guard let qrFilter = CIFilter(name: "CIQRCodeGenerator") else { return nil }
        let qrData = absoluteString.data(using: String.Encoding.ascii)
        qrFilter.setValue(qrData, forKey: "inputMessage")

        let qrTransform = CGAffineTransform(scaleX: 12, y: 12)
        return qrFilter.outputImage?.transformed(by: qrTransform)
    }
}
```
Có thể được sử dụng như sau:

```
let swiftLeeOrangeColor = UIColor(red:0.93, green:0.31, blue:0.23, alpha:1.00)
let qrURLImage = URL(string: "https://www.avanderlee.com")?.qrImage(using: swiftLeeOrangeColor)
A QR code with a custom logo
```

![](https://images.viblo.asia/a67d7a70-bfaf-4702-820c-59a358cbbd5b.png)
 
### Mã QR có logo tùy chỉnh

Để làm cho nó trở thành một QR thực sự nổi bật, chúng ta có thể thêm logo tùy chỉnh của riêng mình. Vì mã QR có một số sửa lỗi nhất định, nó cho phép chúng ta thay thế một phần nhất định của nó bằng 1 logo tuỳ chỉnh. Để làm điều này, chúng ta sẽ tạo một tiện ích mở rộng khác trên CIImage, lấy logo và trả về một CIImage mới, là sự kết hợp giữa QR và logo mới.

```
extension CIImage {

    /// Combines the current image with the given image centered.
    func combined(with image: CIImage) -> CIImage? {
        guard let combinedFilter = CIFilter(name: "CISourceOverCompositing") else { return nil }
        let centerTransform = CGAffineTransform(translationX: extent.midX - (image.extent.size.width / 2), y: extent.midY - (image.extent.size.height / 2))
        combinedFilter.setValue(image.transformed(by: centerTransform), forKey: "inputImage")
        combinedFilter.setValue(self, forKey: "inputBackgroundImage")
        return combinedFilter.outputImage!
    }
}
```

Kết hợp với tiện ích mở rộng URL được cập nhật , chúng ta có thể tạo một mã QR mới đẹp mắt bao gồm cả biểu trưng tùy chỉnh riêng tuỳ thích.

```
extension URL {
        /// Creates a QR code for the current URL in the given color.
    func qrImage(using color: UIColor, logo: UIImage? = nil) -> CIImage? {
        let tintedQRImage = qrImage?.tinted(using: color)

        guard let logo = logo?.cgImage else {
            return tintedQRImage
        }

        return tintedQRImage?.combined(with: CIImage(cgImage: logo))
    }
}

let swiftLeeOrangeColor = UIColor(red:0.93, green:0.31, blue:0.23, alpha:1.00)
let swiftLeeLogo = UIImage(named: "swiftlee_qr_logo.png")!

let qrURLImage = URL(string: "https://www.avanderlee.com")?.qrImage(using: swiftLeeOrangeColor, logo: swiftLeeLogo)
```

![](https://images.viblo.asia/330e8027-bda5-4b4d-b6e6-d5041dda2f71.png)