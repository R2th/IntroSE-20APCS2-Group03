Mã QR hiện nay được sử dụng rất phổ biến để chia sẻ nội dung hoặc để thêm người dùng, mới vào các ứng dụng như Twitter, Zalo và Snapchat. Kể từ iOS 11, người dùng có thể quét mã QR bằng ứng dụng camera đã tích hợp sẵn rất tiện dụng.

## Tạo QR code trong iOS
Đơn giản dùng CIQRCodeGenerator để tạo ra một QR code trắng đen đơn giản.

```
guard let qrFilter = CIFilter(name: "CIQRCodeGenerator") else { return nil }
let qrData = absoluteString.data(using: String.Encoding.ascii)
qrFilter.setValue(qrData, forKey: "inputMessage")

let qrTransform = CGAffineTransform(scaleX: 12, y: 12)
let qrImage = qrFilter.outputImage?.transformed(by: qrTransform)
```

QRcode có thể sử dụng được, những bạn muốn custom theo ý của bạn kiểu màu mè các kiểu và có thể tùy chỉnh nó để phù hợp với ứng dụng của mình.

## Thay đổi màu QR code
Làm theo các bước sau:

Đảo ngược màu đen thành trắng và ngược lại
Thay đổi màu sắc
Để QR code dễ sử dụng hơn,  tạo một extension CIImage.

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
 
 QR Code thường được liên kết đến một URL.  Nên tạo extension URL.

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

![](https://images.viblo.asia/e545cd4e-f35a-426e-83e4-75d32289866b.png)

Sử dụng như sau:

```
let swiftLeeOrangeColor = UIColor(red:0.93, green:0.31, blue:0.23, alpha:1.00)
let qrURLImage = URL(string: "https://www.avanderlee.com")?.qrImage(using: swiftLeeOrangeColor)
```

# QR Code thêm Logo
QR Code này nhìn sinh động hơn, chúng ta có thể thêm logo  của riêng mình vào 1 góc của QR code.

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
Kết hợp với extension URL:

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
```

```
let swiftLeeOrangeColor = UIColor(red:0.93, green:0.31, blue:0.23, alpha:1.00)
let swiftLeeLogo = UIImage(named: "swiftlee_qr_logo.png")! /// thêm vào 
let qrURLImage = URL(string: "https://www.avanderlee.com")?.qrImage(using: swiftLeeOrangeColor, logo: swiftLeeLogo)
```

![](https://images.viblo.asia/c04d0e4d-41e0-4569-8cc7-1ef77bda42c8.png)

Tham khảo bài viết từ Medium [](https://medium.com/swift-programming/qr-code-generation-with-a-custom-logo-and-color-using-swift-e1d0a44adbe3)