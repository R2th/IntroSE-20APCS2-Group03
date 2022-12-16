# Generator Barcode Image đơn giản với CIFilter
Chắc hẳn trong quá trình làm ứng dụng thì việc gặp CR của khách hàng là điều như cơm bữa với lập trình viên, đôi khi dựa vào dự án mà lập trình viên sẽ lựa chọn sử dụng các thư viện thay vì custom lại từ những cái đã có hay tự phát triển một cái.

Ví dụ như tạo ra các image Barcode hay QRCode như này:


-----
![](https://images.viblo.asia/995d4076-b05c-4336-aa7e-f066e3b85269.gif) ![](https://images.viblo.asia/6615077b-f44c-4895-ab99-7067e834b331.jpg)

Chúng ta có thể sử dụng nhiều thư viện hỗ trợ để làm ra nó cụ thể như Zxing, RSBarcodes_Swift... tuy nhiên trong bài này mình sẽ đi vào khởi tạo những ảnh như thế từ Core Image - một framework rất mạnh mẽ được đính kèm trong iOS và OS X cho phép các nhà phát triển xử lý, áp dụng bộ lọc ảnh trong ứng dụng của họ. Trên iOS, Core Image cung cấp hơn 90 bộ lọc (filter). Bên cạnh khả năng tạo hiệu ứng cho bức ảnh, Core Image còn bao gồm các API hỗ trợ cho việc nhận dạng khuôn mặt, tự động tối ưu ảnh và các hiệu ứng tuỳ chỉnh thông qua một chuỗi các bộ lọc.

Chúng ta sẽ đi vào khởi tạo một class có tên BarcodeGenerator để xử lí vấn đề này.

Trước tiên cần import CoreImage và khởi tạo lớp.

``` swift
import CoreImage

class BarcodeGenerator { 

}
```

tiến hành định nghĩa 1 enum Descriptor kiểu string định nghĩa các type xử lí trong các hàm gennerate.
```swift
 enum Descriptor: String {
        case code128 = "CICode128BarcodeGenerator"
        case pdf417 = "CIPDF417BarcodeGenerator"
        case aztec = "CIAztecCodeGenerator"
        case qr = "CIQRCodeGenerator"
    }
```

Cùng đi qua một chút để giải thích ý nghĩa của những khai báo trên. Một cách rất đơn giản nó cũng như tên gọi của nó tạo ra các loại mã QR, Code128, pdf417 hay Aztec ngoài ra còn rất nhiều định dạng khác có thể tham khảo trong [Tài liệu của Apple](https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIPDF417BarcodeGenerator) đều rất đầy đủ và chi tiết về từng loại tuỳ theo mục đích chúng ta cần.

Sau khi khai báo enum chúng ta sẽ đi vào viêt hàm chính của BarcodeGenerator với đầu vào là một chuỗi code, kiểu mã trong Descriptor và cuối cùng là size của code cần tạo ra và tất nhiên đầu ra phải là một CIImage:

```swift
 class func generate(from string: String, 
                         descriptor: Descriptor, 
                               size: CGSize) -> CIImage? {
        let filterName = descriptor.rawValue

        guard let data = string.data(using: .ascii),
            let filter = CIFilter(name: filterName) else {
                return nil
        }

        filter.setValue(data, forKey: "inputMessage")

        guard let image = filter.outputImage else {
            return nil
        }

        let imageSize = image.extent.size

        let transform = CGAffineTransform(scaleX: size.width / imageSize.width,
                                               y: size.height / imageSize.height)
        let scaledImage = image.transformed(by: transform)

        return scaledImage
    }
}
```

Và thế là chúng ta đã có 1 class thực thi nhiện vụ như chúng ta muốn mà k phải sử dụng 1 thư viện nào.

``` swift
import CoreImage

class BarcodeGenerator {
    enum Descriptor: String {
        case code128 = "CICode128BarcodeGenerator"
        case pdf417 = "CIPDF417BarcodeGenerator"
        case aztec = "CIAztecCodeGenerator"
        case qr = "CIQRCodeGenerator"
    }

    class func generate(from string: String, 
                         descriptor: Descriptor, 
                               size: CGSize) -> CIImage? {
        let filterName = descriptor.rawValue

        guard let data = string.data(using: .ascii),
            let filter = CIFilter(name: filterName) else {
                return nil
        }

        filter.setValue(data, forKey: "inputMessage")

        guard let image = filter.outputImage else {
            return nil
        }

        let imageSize = image.extent.size

        let transform = CGAffineTransform(scaleX: size.width / imageSize.width,
                                               y: size.height / imageSize.height)
        let scaledImage = image.transformed(by: transform)

        return scaledImage
    }
}
```

Và cách sử dụng rất đơn giản:
```swift
BarcodeGenerator.generate(from: "barcode-string", 
                     symbology: .code128, 
                          size: CGSize(width: 800, height: 300))
```
Ngoài hàm demo ở trên chúng ta có thể viết thêm các hàm custom khác tuỳ theo mục đích cá nhân hay có thể thêm bất cứ thông số hay loại định nghĩa nào để có thể tạo ra thứ mình muốn.

Làm lại mọi thứ mình thích hay tự tìm hiểu một vấn đề nào đó sẽ khiến tăng knowledge rất nhiều phải không mọi người. Hi vọng bài viết này sẽ đem lại hiệu quả cho những ai cần nó.