Ngày nay QR code được sử dụng rất nhiều để chia sẻ nội dung hay thêm người dùng mới, trong các app như Twitter hay Snapchat. Từ iOS 11, bạn đã có thể scan QR code bằng camera của iPhone. Điều này khiến việc tích hợp QR Code vào app của bạn trở nên cần thiết hơn.

**Generate QR Code trong iOS**

Tạo mã QR trong iOS trở nên dễ dàng hơn bao giờ hết kể từ khi  bộ lọc hình ảnh lõi CIQRCodeGenerator được giới thiệu. Nó tạo ra một mã QR trắng đen đơn giản cho chuỗi đầu vào đã cho:

```
guard let qrFilter = CIFilter(name: "CIQRCodeGenerator") else { return nil }
let qrData = absoluteString.data(using: String.Encoding.ascii)
qrFilter.setValue(qrData, forKey: "inputMessage")

let qrTransform = CGAffineTransform(scaleX: 12, y: 12)
let qrImage = qrFilter.outputImage?.transformed(by: qrTransform)
```

Mã QR này hoạt động, nhưng nó không thực sự hấp dẫn và có lẽ nó không phù hợp với thiết kế  ứng dụng của riêng bạn. Do đó, sẽ thật tuyệt nếu chúng ta có thể tùy chỉnh nó để phù hợp với thiết kế ứng dụng của mình. 

**Thay đổi màu của mã QR**

Bước đầu tiên trong việc tùy chỉnh mã QR là thay đổi màu sắc. Chúng ta làm điều này trong ba bước:
- Đảo ngược màu đen và trắng
- Mặt nạ màu đen trong suốt
- Thay đổi màu sắc
Để làm cho mã này dễ sử dụng hơn, chúng ta tạo một phần mở rộng trên CIImage: 
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

Mã QR thường được liên kết đến một URL.

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
Chúng ta có thể sử dụng extension này như sau
```
let swiftLeeOrangeColor = UIColor(red:0.93, green:0.31, blue:0.23, alpha:1.00)
let qrURLImage = URL(string: "https://www.avanderlee.com")?.qrImage(using: swiftLeeOrangeColor)
```

![](https://images.viblo.asia/1f566b51-e41e-4448-8a67-ee9bbb9a0947.png)

**Mã QR có logo tùy chỉnh**
Để làm cho nó trở thành một QR thực sự nổi bật, chúng ta có thể thêm logo tùy chỉnh của riêng mình. 
Vì mã QR có một error corection nhất định, nó cho phép chúng ta thay thế một phần nhất định của nó bằng logo tùy chỉnh của chúng ta. 
Để làm điều này, chúng ta tạo một tiện ích mở rộng khác trên CIImage, lấy logo của chúng ta và trả về một CIImage mới, là sự kết hợp giữa QR và logo đó.

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
Kết hợp với tiện ích mở rộng URL được cập nhật , chúng ta có thể tạo một mã QR mới đẹp bao gồm logo tùy chỉnh.

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

![](https://images.viblo.asia/b3267dc9-75fa-4ea8-bc5d-0e9710e06c2a.png)