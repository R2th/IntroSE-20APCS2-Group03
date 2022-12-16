> QR Code được sử dụng rất nhiều để chia sẻ nội dung hoặc thêm người dùng mới trong các ứng dụng như Twitter và Snapchat. Kể từ iOS 11, người dùng có thể quét mã QR bằng ứng dụng máy ảnh được tích hợp sẵn trong iOS. Và iOS cũng có thể tạo mã QR cho nội dung nhúng.

### 1. Tiến hành tạo mã QR trong iOS


Việc tạo mã QR trong iOS dễ dàng hơn bao giờ hết kể từ khi ra đời bộ lọc hình ảnh lõi `CIQRCodeGenerator`. Nó tạo ra một mã QR màu đen trắng đơn giản cho chuỗi đầu vào nhất định. Chúng ta làm như sau :

```
guard let qrFilter = CIFilter(name: "CIQRCodeGenerator") else { return nil }
let qrData = absoluteString.data(using: String.Encoding.ascii)
qrFilter.setValue(qrData, forKey: "inputMessage")

let qrTransform = CGAffineTransform(scaleX: 12, y: 12)
let qrImage = qrFilter.outputImage?.transformed(by: qrTransform)
```

Mã QR này đã hoạt động, nhưng nhìn nó không thực sự hấp dẫn cho lắm và có thể nó sẽ không phù hợp với design ứng dụng của bạn. Do đó, sẽ thực sự tuyệt vời nếu chúng ta có thể tự custom nó để phù hợp với design ứng dụng của mình.

### 2. Thực hiện thay đổi màu của mã QR

Bước đầu tiên trong việc custom mã QR là thay đổi màu sắc. Chúng ta sẽ thực hiện việc này theo ba bước:

* Invert màu đen và trắng
* Che màu đen thành trong suốt
* Thay đổi màu sắc

Để làm cho code này dễ sử dụng hơn, chúng ta sẽ tạo một extension cho **CIImage**.

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

Mã QR thường liên kết đến một URL. Do đó, bạn cũng nên tạo một extension cho URL

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

Hoặc mã QR có thể được tạo từ một chuỗi String bất kì, ta thêm method sau để sử dụng cho trường hợp này :

```
    func generateQrCode(_ content: String)  -> CIImage? {
        let data = content.data(using: String.Encoding.ascii, allowLossyConversion: false)

        let filter = CIFilter(name: "CIQRCodeGenerator")

        filter?.setValue(data, forKey: "inputMessage")
        filter?.setValue("Q", forKey: "inputCorrectionLevel")

        if let qrCodeImage = (filter?.outputImage){
            return qrCodeImage
        }

        return nil
    }
```


Chúng ta tiến hành tạo mã QR từ URL với màu xanh dương như sau:
```
        let color = UIColor(red:0.08380651384, green:0.4750699216, blue:0.9372549057, alpha:1.00)
        guard let qrURLImage = URL(string: "https://www.google.com")?.qrImage(using: color) else { return }
        imageQR.image = UIImage(ciImage: qrURLImage)
```

và đây là kết quả :

![](https://images.viblo.asia/fee71777-9627-4e3b-9323-020b00902e1d.png)

### 3. Mã QR có logo custom 

Để biến nó thành một QR code thực sự nổi bật, chúng ta có thể thêm logo nhỏ tùy chỉnh của riêng mình bên trong `QR CIImage` bằng cách sử dụng một extension của UIImage:

```
extension UIImage {
    
    /// place the imageView inside a container view
    /// - parameter superView: the containerView that you want to place the Image inside
    /// - parameter width: width of imageView, if you opt to not give the value, it will take default value of 100
    /// - parameter height: height of imageView, if you opt to not give the value, it will take default value of 30
    func addToCenter(of superView: UIView, width: CGFloat = 100, height: CGFloat = 30) {
        let overlayImageView = UIImageView(image: self)
        
        overlayImageView.translatesAutoresizingMaskIntoConstraints = false
        overlayImageView.contentMode = .scaleAspectFit
        superView.addSubview(overlayImageView)
        
        let centerXConst = NSLayoutConstraint(item: overlayImageView, attribute: .centerX, relatedBy: .equal, toItem: superView, attribute: .centerX, multiplier: 1, constant: 0)
        let width = NSLayoutConstraint(item: overlayImageView, attribute: .width, relatedBy: .equal, toItem: nil, attribute: .notAnAttribute, multiplier: 1, constant: 100)
        let height = NSLayoutConstraint(item: overlayImageView, attribute: .height, relatedBy: .equal, toItem: nil, attribute: .notAnAttribute, multiplier: 1, constant: 30)
        let centerYConst = NSLayoutConstraint(item: overlayImageView, attribute: .centerY, relatedBy: .equal, toItem: superView, attribute: .centerY, multiplier: 1, constant: 0)
        
        NSLayoutConstraint.activate([width, height, centerXConst, centerYConst])
    }
}
```

**Lưu ý:** Khi bạn cố gắng thiết lập chiều rộng / chiều cao của logo nhỏ, hãy đảm bảo rằng nó không quá lớn, nếu không sẽ làm cho mã QR không thể đọc được.

Ta tiến hành thực hiện đầy đủ  đoạn code như sau :

```
        let doremonLogo = UIImage(named: "doraemon.png")!
        let color = UIColor(red:0.08380651384, green:0.4750699216, blue:0.9372549057, alpha:1.00)

        guard let qrURLImage = URL(string: "https://www.google.com")?.qrImage(using: color) else { return }
        imageQR.image = UIImage(ciImage: qrURLImage)
        doremonLogo.addToCenter(of: imageQR)
```

Và đây là thành quả  :heart_eyes: :

![](https://images.viblo.asia/4a92344c-89a5-452e-b7fb-09690c84a84e.png)

### 4. Kết luận 

Việc tạo mã QR với màu và logo tuỳ chỉnh sẽ khiến ứng dụng của bạn trở nên hấp dẫn và đẹp đẽ hơn để phù hợp với design ứng dụng của mình :smile:. Hy vọng rằng, điều này sẽ 
giúp bạn trong việc code hiệu quả hơn :heart_eyes:.

Vậy là bài viết của mình đến đây là hết 😁. Cảm ơn các bạn đã theo dõi bài viết. 😃