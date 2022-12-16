![](https://images.viblo.asia/46606284-7cb6-412c-a31e-1c9e0ced53d1.jpg)

### Introduce

Để ứng dụng có nhiều users sử dụng thì yêu cầu cơ bản là ứng dụng phải được hỗ trợ nhiều ngôn ngữ. Với ứng dụng iOS thì việc Localization khá dễ dàng bằng việc add thêm các ngôn ngữ muốn sử dụng trong ứng dụng và tạo ra các file **Localizable.strings** tương ứng với ngôn ngữ đó. File **Localizable.strings** có syntax như sau:
```
"<key>" = "<value>";
```
Thông thường thì chúng ta sẽ kéo thả các outlet sau đó set localize cho outlet đó như ví dụ dưới đây.
```swift
@IBOutlet weak var titleLabel: UILabel!

titleLabel.text  = NSLocalizedString("<key>", comment: "")
```
Sau đây mình xin giới thiệu với các bạn cách Localization các UI trực tiếp trên file **Xib** hoặc **Storyboard** bằng **@IBInspectable** mà không cần phải kéo thả các **outlet**.

### XIB and Storyboard Localization

![](https://images.viblo.asia/c158f205-051f-4c8b-b0ce-f39a7bedd2d2.png)

Tạo một ứng dụng với form Sign In như trên. Ta sẽ tiến hành Localization ứng dụng với ngôn ngữ Vietnamese và Japanese.Trước tiên enable **Localizations** bằng cách vào **Project** -> **Info** add các ngôn ngữ sử dụng trong ứng dụng.

![](https://images.viblo.asia/9c05f028-f609-429d-8c70-c58f6169210c.png)

Project sẽ được generate ra 2 folder **ja.lproj** và **vi.lproj**

![](https://images.viblo.asia/6dc6ec04-22ed-45bc-9da4-c4cad9949298.png)

Bước tiếp theo ta tạo mới một string file **Localizable.strings**

![](https://images.viblo.asia/0d42b510-e667-4e12-8459-45a19b2650b9.png)

Tại file **Localizable.strings** click button **Localize** ở thanh navigator bên phải để tạo 2 file **Localizable.strings(Vietnamese)** và **Localizable.strings(Japanese)** :

![](https://images.viblo.asia/80d62e38-bbe8-4d50-9943-a153d888f952.png)

Define các key và value tương ứng với các ngôn ngữ trong các file **Localizable.strings** :

![](https://images.viblo.asia/0fa20723-642c-4a78-82a6-c20e770732e0.png)


![](https://images.viblo.asia/81a953cd-7833-4510-9914-e3cf672d5bb7.png)

Tạo các @IBInspectable localize cho các UI
```swift
extension UILabel {
    @IBInspectable var localizeText: String {
        set(value) {
            self.text = NSLocalizedString(value, comment: "")
        }
        get {
            return ""
        }
    }
}

extension UIButton {
    @IBInspectable var localizeTitle: String {
        set(value) {
            self.setTitle(NSLocalizedString(value, comment: ""), for: .normal)
        }
        get {
            return ""
        }
    }
}

extension UITextField {
    @IBInspectable var localizePlaceholder: String {
        set(value) {
            self.placeholder = NSLocalizedString(value, comment: "")
        }
        get {
            return ""
        }
    }
}
```

Trong storyboard set các **key** @IBInspectable localize tương ứng cho các element

![](https://images.viblo.asia/c7da5e59-8f8b-4718-9e53-04f5c539c737.png)

Vào **Edit Scheme** chọn ngôn ngữ và Run ứng dụng.

![](https://images.viblo.asia/9d11601c-e714-4699-b751-e96eb34de2a1.png)

### Wrap Up
Trên đây là cách Localization các UI mà không cần phải kéo thả **outlet** trong các ứng dụng iOS. Hi vọng bài viết sẽ giúp ích cho các bạn. Cảm ơn các bạn đã theo dõi. Source code: https://github.com/pdn1905/XibLocalize