## 1. Giới thiệu
Tính năng Dynamic Types  cho phép người dùng có thể lựa chọn kích thước của các đoạn văn bản trên màn hình. Nó giúp cho những người cần chữ kích thước to sẽ dễ dàng đọc hơn, hay có thể điều chỉnh chữ nhỏ để hiển thị được nhiều thông tin trên màn hình.

Việc Dynamic Types thực hiện thực chất là việc thay đổi tỉ lệ font tương ứng. Chúng ta có thể áp dụng cho cả system font và custom font. Sau đây là hướng dẫn cụ thể.

## 2. Thay đổi scaling của hệ thống
Bạn hãy vào theo đường dẫn
`Settings` ->  `General` -> `Accessibility` -> `Langre Text`

Tại đây bạn có thể thay đổi kích thước text tuỳ ý
![](https://images.viblo.asia/b9f21901-61f6-4cd9-b89d-88132f7a6225.png)

## 3.  System font
Việc bật tính năng Dynamic Types đối với System Font vô cùng đơn giản. 
Giả sử chúng ta có một UILabel, trước hết hãy tick vào ô `Automatically Adjusts Font` và sau đó bạn sẽ tuỳ chỉnh kích thước tương ứng

![](https://images.viblo.asia/5e42f061-9d47-4e9f-b499-a3e24a4169bc.png)

Tới đây kích thước của UILabel sẽ thay đổi tuỳ theo scaling của cài đặt hệ thống.

Ngoài việc sử dụng UI chúng ta có thể sử dụng code để thực hiện việc này như sau:
```swift
label.font = UIFont.preferredFont(forTextStyle: .body)
label.adjustsFontForContentSizeCategory = true 
```

## 4. Custom font
Sau khi đã add thành công custom font vào trong app thì chúng ta bắt đầu tiến hành config Dynamic Types.
Đối với iOS 11 apple hỗ trợ chúng ta `UIFontMetrics` để lấy tỉ lệ font tương ứng với cài đặt của hệ thống, còn với iOS thấp hơn thì có solution khác. 
Chúng ta sẽ tính ra một scaleFont ở mức tương đối, sau đó sẽ thay đổi font tương ứng với cài đặt. 

Ví dự dưới đây lấy fontSize mặc định là 13 và style được đặt là `body`

```swift
enum FontMetrics {

    static var fontSize: CGFloat = 13.0
    
    static var scaler: CGFloat {
        return UIFont.preferredFont(forTextStyle: .body).pointSize / fontSize
    }

    static func scaledFont(for font: UIFont) -> UIFont {
        if #available(iOS 11.0, *) {
            return UIFontMetrics.default.scaledFont(for: font)
        } else {
            return font.withSize(scaler * font.pointSize)
        }
    }

    static func scaledFont(for font: UIFont, maximumPointSize: CGFloat) -> UIFont {
        if #available(iOS 11.0, *) {
            return UIFontMetrics.default.scaledFont(for: font,
                                                    maximumPointSize: maximumPointSize,
                                                    compatibleWith: nil)
        } else {
            return font.withSize(min(scaler * font.pointSize, maximumPointSize))
        }
    }
    
    static func scaledValue(for value: CGFloat) -> CGFloat {
        if #available(iOS 11.0, *) {
            return UIFontMetrics.default.scaledValue(for: value)
        } else {
            return scaler * value
        }
    }
}
```

Sau khi đã có enum trên thì chúng ta có thể sử dụng customFont theo Dynamic Types một cách đơn giản, ngoài có thể set một giá trị max cho fontSize để tránh trường hợp người dùng tăng scale quá to.

Qua bài viết mong các bạn sẽ có thể biết thêm 1 phần rất hữu ích về Font. Giúp cho giao diện của ứng dụng tương thích với cài đặt của người dùng :D