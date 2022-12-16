# Giới thiệu: 
* Mã QR được sử dụng rất nhiều để chia sẻ nội dung hoặc để thêm người dùng mới vào các ứng dụng như Twitter và Snapchat. Kể từ iOS 11, người dùng có thể quét mã QR bằng ứng dụng camera tích hợp. Điều này làm cho nó thậm chí còn đẹp hơn để tích hợp mã QR trong ứng dụng của riêng bạn.

# Tạo QR Code trong ứng dụng IOS:
* Tạo mã QR trong iOS trở nên dễ dàng hơn bao giờ hết kể từ khi giới thiệu bộ lọc hình ảnh lõi CIQRCodeGenerator. Nó tạo ra một mã QR trắng đen đơn giản cho chuỗi đầu vào đã cho.

```
guard let qrFilter = CIFilter(name: "CIQRCodeGenerator") else { return nil }
let qrData = absoluteString.data(using: String.Encoding.ascii)
qrFilter.setValue(qrData, forKey: "inputMessage")

let qrTransform = CGAffineTransform(scaleX: 12, y: 12)
let qrImage = qrFilter.outputImage?.transformed(by: qrTransform)
```

* Mã QR này đã hoạt động, nhưng với màu trắng đen mặc định như vậy thì mã qr code này không thực sự hấp dẫn và có lẽ nó cũng không phù hợp với thiết kế  ứng dụng của bạn. Do đó, sẽ thật tuyệt nếu chúng ta có thể tùy chỉnh nó để phù hợp với thiết kế ứng dụng của mình.

# Thay đổi màu của QRCode
* Để thay đổi màu cho qr code chúng ta làm 3 bước như sau:

1. Đảo ngược màu đen và màu trắng
2. Chuyển đổi phần màu đen thàng trong suốt
3. Đổi màu của qr code

* Để dễ dàng cho việc sử dụng sau này, ta tạo extension trong CIImage:

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
* A QR code dùng để mở một đường link từ URL. Do đó,  ta viết extension cho URL để sử dụng qr code.
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

* Bây giờ bạn đã có thể tạo qr code với tùy chọn màu sắc khác nhau:

```
let swiftLeeOrangeColor = UIColor(red:0.93, green:0.31, blue:0.23, alpha:1.00)
let qrURLImage = URL(string: "https://www.avanderlee.com")?.qrImage(using: swiftLeeOrangeColor)
```

![](https://images.viblo.asia/add5d9fc-daac-4e13-96d3-983c1a36fdf9.png)

# Thêm icon bên trong QR Code:
* Để làm cho nó trở thành một QR thực sự nổi bật, chúng ta có thể thêm logo tùy chỉnh của riêng mình. Ta có thể thay thế một phần nhất định của mã qr  của nó thành logo tùy chỉnh. Để làm điều này, ta tạo extension của CIImage.

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

* Kết hợp dùng với extension URL, ta có thể tạo qr code bao gồm logo tùy chỉnh của mình.

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
![](https://images.viblo.asia/85770950-21c5-4337-9b55-3405cbd16e36.png)

* References: https://medium.com/swift-programming/qr-code-generation-with-a-custom-logo-and-color-using-swift-e1d0a44adbe3