Mã QR được sử dụng rất nhiều để chia sẻ nội dung hoặc để thêm người dùng mới vào các ứng dụng như Twitter và Snapchat. Kể từ iOS 11, người dùng có thể quét mã QR bằng ứng dụng camera tích hợp. Điều này làm cho nó thậm chí còn đẹp hơn để tích hợp mã QR trong ứng dụng của riêng bạn.

### Tạo mã QR Code trong iOS

Tạo mã QR trong iOS trở nên dễ dàng hơn bao giờ hết kể từ khi bộ lọc hình ảnh lõi `CIQRCodeGenerator` được giới thiệu. Nó tạo ra một mã QR trắng đen đơn giản cho chuỗi đầu vào đã cho.

```
guard let qrFilter = CIFilter(name: "CIQRCodeGenerator") else { return nil }
let qrData = absoluteString.data(using: String.Encoding.ascii)
qrFilter.setValue(qrData, forKey: "inputMessage")

let qrTransform = CGAffineTransform(scaleX: 12, y: 12)
let qrImage = qrFilter.outputImage?.transformed(by: qrTransform)
```

Mã QR này đã hoạt động, nhưng nó không thực sự hấp dẫn và có lẽ nó không phù hợp với thiết kế tuyệt vời của ứng dụng của riêng bạn. Do đó, sẽ thật tuyệt nếu chúng ta có thể tùy chỉnh nó để phù hợp với thiết kế ứng dụng của mình.

### Thay đổi màu của QR Code

Bước đầu tiên trong việc tùy chỉnh mã QR code là thay đổi màu sắc. Chúng ta làm điều này trong ba bước:

* Đảo ngược màu đen và trắng
* Mask màu đen trong suốt
* Thay đổi màu sắc

<br>

Để làm cho mã này dễ sử dụng hơn, chúng tôi tạo một extension trên `CIImage`.

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

Mã QR code thường được liên kết đến một URL. Do đó, chúng ta nên tạo một extension trên URL.

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

Ta có thể sử dụng tuỳ biến màu sắc như sau:

```
let swiftLeeOrangeColor = UIColor(red:0.93, green:0.31, blue:0.23, alpha:1.00)
let qrURLImage = URL(string: "https://www.avanderlee.com")?.qrImage(using: swiftLeeOrangeColor)
```

![](https://images.viblo.asia/7dbabc32-1670-437b-b37c-0680537a40e5.png)

<br>

### Mã QR code với logo tùy chỉnh

Để làm cho nó trở thành một QR thực sự nổi bật, chúng ta có thể thêm logo tùy chỉnh của riêng mình. Vì mã QR có một [error correction](https://www.qrcode.com/en/about/error_correction.html) nhất định, nó cho phép chúng tôi thay thế một phần nhất định của nó bằng logo tùy chỉnh của chúng ta. Để thực hiện điều này, chúng ta tạo một extenssion khác trên `CIImage` lấy logo của chúng ta và trả về một `CIImage` mới là sự kết hợp giữa QR và logo của chúng ta.

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

<br>

Kết hợp với extension URL được cập nhật của chúng ta,  có thể tạo một mã QR mới đẹp bao gồm logo tùy chỉnh của riêng.

<br>

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


![](https://images.viblo.asia/dd6fee0d-7487-4fa6-af94-818e708fcd0e.png)

### Kết luận

Nếu bạn muốn đọc thêm về bộ lọc mã QR hoặc bất kỳ bộ lọc Core Image nào khác, hãy xem Tài liệu [Apple](https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIQRCodeGenerator)

Bài viết được dịch từ [bài chia sẻ](https://www.avanderlee.com/swift/qr-code-generation-swift/?utm_campaign=Swift%20Weekly&utm_medium=email&utm_source=Revue%20newsletter&fbclid=IwAR2X9yBnROIvecs6basm5wQhjqTh5qm5ji2rONZ9PYIHS7gUxxZCiDidiKw) của tác giả Antoine Van Der Lee.