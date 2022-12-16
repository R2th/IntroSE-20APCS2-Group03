QR Code được sử dụng rất nhiều để chia sẻ nội dung hoặc thêm người dùng mới trong các ứng dụng như Twitter và Snapchat. 

Kể từ iOS 11, người dùng có thể quét mã QR bằng máy ảnh. 

Điều này làm cho việc tích hợp mã QR trong ứng dụng của riêng bạn thậm chí còn cần đẹp hơn.

## Tạo mã QR trong iOS

Việc tạo mã QR trong iOS trở nên dễ dàng hơn bao giờ hết kể từ khi có bộ lọc Core Image `CIQRCodeGenerator` . 
Nó tạo ra một QR đen trắng cho một chuỗi input string.

```
guard let qrFilter = CIFilter(name: "CIQRCodeGenerator") else { return nil }
let qrData = absoluteString.data(using: String.Encoding.ascii)
qrFilter.setValue(qrData, forKey: "inputMessage")

let qrTransform = CGAffineTransform(scaleX: 12, y: 12)
let qrImage = qrFilter.outputImage?.transformed(by: qrTransform)
```

Mã QR này đã có thể hoạt động, nhưng nó chưa hấp dẫn và có lẽ nó bạn muốn nó đẹp hơn. 

Do đó, tôi sẽ giới thiệu cách custom nó để phù hợp với thiết kế ứng dụng của mình.

## Thay đổi màu của mã QR

Bước đầu tiên trong việc custom mã QR là thay đổi màu sắc. 
Chúng ta thực hiện việc này theo ba bước:

* Đảo ngược màu đen và trắng

* Che màu đen thành trong suốt

* Thay đổi màu sắc

Để làm cho mã này dễ sử dụng hơn, chúng ta tạo một extension của `CIImage`.

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

Mã QR thường liên kết đến một URL. Do đó, bạn cũng nên tạo một extension cho URL.

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

Và sử dụng nó như sau:

```
let swiftLeeOrangeColor = UIColor(red:0.93, green:0.31, blue:0.23, alpha:1.00)
let qrURLImage = URL(string: "https://www.avanderlee.com")?.qrImage(using: swiftLeeOrangeColor)
```

Mã QR đã đổi màu:
![](https://images.viblo.asia/86eea3d6-6c60-4060-9f0e-7b33dade54e0.png)

## Custom logo cho QR code

Để biến nó thành một QR code thực sự nổi bật, chúng ta có thể thêm custom logo của riêng mình. 
QR code cho phép chúng ta thay thế một phần nhất định của nó bằng logo tùy chỉnh. 
Để làm điều này, chúng ta tạo một extension khác của `CIImage`, sử dụng logo và trả về một CIImage mới.

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

Kết hợp với extension của URL được update mới, chúng ta có thể tạo một mã QR mới đẹp mắt hơn bao gồm cả logo tùy chỉnh.

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

Thành quả:
![](https://images.viblo.asia/22445b6f-e23d-408b-af4b-13af2a8335fb.png)

Mong nó có ích với các bạn, cảm ơn mọi người đã xem hết bài viết!

Nguồn: medium.com