Bạn có thể đã được hưởng lợi từ các thư viện của bên thứ ba mà người khác đã tạo. Thư viện của bên thứ ba có thể giúp bạn tiết kiệm rất nhiều thời gian khi xây dựng ứng dụng vì chúng là plug and play. Thư viện của bên thứ ba cũng có tên khác với các phần phụ thuộc.
Trình quản lý Dependency phổ biến và được sử dụng rộng rãi nhất là CocoaPods. CocoaPods có hơn 82.000 thư viện và còn tiếp tục tăng, và đang được sử dụng trong hơn ba triệu ứng dụng.
Bạn có thể chọn tạo thư viện bên thứ ba công khai hoặc riêng tư. Thư viện công cộng có thể được sử dụng bởi những người khác, những người sau đó có thể đề xuất các cải tiến cho Code của bạn. Mặt khác, một Private library chỉ có sẵn cho dự án của bạn.

### Điều kiện tiên quyết

Để làm theo hướng dẫn này, bạn sẽ cần một số kiến ​​thức cơ bản về:
* Kiến thức cơ bản về Swift
* Kiến thức cơ bản về Git
* Xcode 12

#### Tạo CocoaPods
Cài đặt CocoaPods lên máy và chạy câu lệnh sau:

`pod lib create Ulti`

Bạn sẽ được hỏi năm câu hỏi - trả lời theo nhu cầu của bạn nhưng hiện tại, đây là những gì chúng ta sẽ làm:

![](https://images.viblo.asia/2a4682a5-2a79-4357-8af6-bd0d48ce184c.png)

Project của bạn sẽ tự mở ra. Hãy xem qua dự án của bạn. Cuối cùng, bạn chỉ nên quan tâm các phần sau:
1. Thư mục này chứa các tệp mà bạn cần để định cấu hình thông tin về Pod của mình như lập phiên bản, mô tả, readme, v.v.
2. Thư mục này là nơi bạn cung cấp ví dụ về cách sử dụng Code của mình. Điều này để những người khác biết cách sử dụng Pod của bạn.
3. Đây là nơi đặt Code của bạn- cụ thể là bên trong các Development Pods

![](https://images.viblo.asia/616fa2cb-b9c8-4e01-8524-c614f7227794.png)

Tiếp theo, hãy chèn code vào Development Pods để bất kỳ ai quyết định sử dụng Ulti đều có thể sử dụng Code mà ta đã thêm.
Bạn có thể tạo một tệp mới bên trong Development Pods > Ulti


![](https://images.viblo.asia/e554a6e8-e791-4767-9411-b1afc355ecb5.png)

Về cơ bản, Code này cho phép bạn thêm corner radios, border, v.v.

```
import UIKit

extension UIView {
    public func addCornerRadius(_ radius: CGFloat = 16) {
        layer.cornerRadius = radius
        layer.masksToBounds = true
    }

    public func addBorderLine(width: CGFloat = 1, color: UIColor = UIColor.black.withAlphaComponent(0.1)) {
        layer.borderWidth = width
        layer.borderColor = color.cgColor
    }

    public func makeRounded() {
        layer.masksToBounds = false
        layer.cornerRadius = self.frame.height / 2
        clipsToBounds = true
    }

    @objc public func addShadow(cornerRadius: CGFloat = 16,
                         shadowColor: UIColor = UIColor.black,
                         shadowOffset: CGSize = CGSize(width: 0, height: 4),
                         shadowOpacity: Float = 0.1,
                         shadowRadius: CGFloat = 6) {
        layer.cornerRadius = cornerRadius
        layer.shadowColor = shadowColor.cgColor
        layer.shadowOffset = shadowOffset
        layer.shadowOpacity = shadowOpacity
        layer.shadowRadius = shadowRadius
    }
}
```

### Host Your Code on GitHub

Bạn có thể chọn lưu trữ nó ở bất cứ đâu bạn muốn trên GitHub.

![](https://images.viblo.asia/9daf83b7-809b-4b4a-897c-ef4e384a5854.png)

#### Push to CocoaPods

Cuối cùng, bạn có thể đẩy Pod của mình sang CocoaPods để mọi người khác có thể sử dụng Code của bạn.

Vì chúng ta đã tag version là 0.0.1, chúng ta cần thay đổi version trên Ulti.podspec để version phù hợp với tag.

`s.version          = '0.0.1'`

Khi bạn đã thiết lập những điều đó, bạn có thể khởi chạy lệnh sau để làm cho nó public.

`pod trunk push --allow-warnings`

![](https://images.viblo.asia/7c0f0426-ab76-4702-897b-89aadf2bb509.png)

### Share Example Codes

Bạn cần phải ở bên trong thư mục Example và cài đặt Pod bằng cách nhập lệnh sau.

`pod install`

![](https://images.viblo.asia/fac2337c-ccbe-4954-aafb-85b2d8f0d47b.png)

Bây giờ bạn có thể sử dụng code từ Development Pods. Tiếp theo, bạn cần import pod

```
import Ulti

class ViewController: UIViewController {

   @IBOutlet private weak var mainView: UIView!
  
   override func viewDidLoad() {
       super.viewDidLoad()
      
       mainView.backgroundColor = .green
       mainView.addShadow()
       mainView.addCornerRadius()
   }
}
```

Khi chạy Project, bạn sẽ thấy shadow với corner radious:

![](https://images.viblo.asia/403cdd67-f4bb-4f96-b3f7-0e2d9fec921d.png)

Các Dev sẽ biết cách sử dụng Code của bạn bằng cách xem ví dụ. Điều này sẽ rất hữu ích cho họ!

### Push CocoaPods Update

Tiếp theo, bạn cần đẩy code sang chế độ công khai để người khác có thể truy cập vào các thay đổi mới nhất.

Bên trong GitHub, bạn phải tạo Release note với version number khớp với tag và version number bên trong podspec.

![](https://images.viblo.asia/06297130-437a-4845-b53b-eb965252ffba.png)

![](https://images.viblo.asia/fb4aaea4-38c0-451a-8bdf-f7cbaa0f2051.png)

Publish release.

Tiếp theo, bên trong Ulti.podspec, update version:

`s.version          = '0.0.2'`

Sau đó, bạn cần thực hiện lệnh Git:

```
git add .
git commit -m "Added Example"
git tag -a 0.0.2 -m "Version 0.0.2"
git push
```

Cuối cùng, đẩy nó sang CocoaPods:

`pod trunk push --allow-warnings`

![](https://images.viblo.asia/0257cb9f-7f17-4af8-b156-82b1cf0f0943.png)

Nguồn tham khảo: https://betterprogramming.pub/how-to-create-a-public-cocoapods-library-23e9c8f773f8