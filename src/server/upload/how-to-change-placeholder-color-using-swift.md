### Introduction

Chắc hẳn mỗi chúng ta đều đã thao tác với UITextField và đã quá quen với khái niệm Placeholder của UITextField. Mặc định iOS quy định màu của placeHolder text là màu xám dạng inactive tuy nhiên trong nhiều trường hợp chúng ta cần thay đổi màu này theo design. Trong bài biết này, chúng ta cùng nghiên cứu về cách custom color cho placeholder

**Chúng ta cùng tìm hiểu nhé!**

### What is a placeholder?

Placeholder là một chuỗi charactor, work hoặc string chúng sử dụng để gợi ý nội dung cho phần textbox khi giá trị của ô textbox đang trống.
Ví dụ: người sử dụng cần biết loại của giá trị ô cần nhập thế nào là hợp lệ và placeholder giúp user hiểu được điều này dễ hơn.

![](https://images.viblo.asia/8b797b90-31f6-49f4-b9de-3559b7e71660.png)

### Change placeholder color with Swift

Sau khi bạn đã kéo IBoutlet cho UITextField trong file Main.Storyboard. Chúng ta kết nối outblet trong file .storyboard với file swift và đặt tên là **textFieldWithPlaceholder**

```Swift
@IBOutlet weak var textFieldWithPlaceholder: UITextField!
```

Và trong ViewDidLoad() chúng ta set placeholder như sau:

```Swift
var placeHolder = NSMutableAttributedString()
let Name  = "Placeholder Text" 
       
// Set the Font 
placeHolder = NSMutableAttributedString(string:Name, attributes: [NSFontAttributeName:UIFont(name: "Helvetica", size: 15.0)!])

// Set the color
placeHolder.addAttribute(NSForegroundColorAttributeName, value: UIColor.redColor(), range:NSRange(location:0,length:Name.characters.count))   

// Add attribute        
textFieldWithPlaceholder.attributedPlaceholder = placeHolder
```

Sau đó build và run app bạn sẽ nhìn thấy placeholder đã thay đổi font và color theo như đã được setup trong code.


###  Use Swift Extension to change Placeholder Color

Với cách làm này, chúng ta sẽ tạo một extension cho tất cả các Textfield. Trước tiên chúng ta chọn Text Field trong Viewcontroller, đi tới **attributes inspector** và set placeholder.

![](https://images.viblo.asia/d2fa7931-2ec1-4843-8a7c-562e60e8945e.png)

Bạn có thể thấy là tôi đã đánh text "E-mail Address" và tất nhiên bạn có thể hoàn toàn thay thế bằng text khác. Sau đó quay trở lại file ViewController.Swift, chúng ta insert dòng code dưới đây:

```Swift
extension UITextField{
    @IBInspectable var placeHolderColor: UIColor? {
        get {
            return self.placeHolderColor
        }
        set {
            self.attributedPlaceholder = NSAttributedString(string:self.placeholder != nil ? self.placeholder! : "", attributes:[NSForegroundColorAttributeName: newValue!])
        }
    }
}
```

Tất nhiên phần extension chúng ta sẽ đặt ngoài phần khai báo cho class như dưới đây:

```Swift
import Foundation

class ViewController: UIViewController {

    @IBOutlet weak var textFieldWithPlaceholder: UITextField!
    override func viewDidLoad() {
        // stuff
    }
}

extension UITextField{
    @IBInspectable var placeHolderColor: UIColor? {
        get {
            return self.placeHolderColor
        }
        set {
            self.attributedPlaceholder = NSAttributedString(string:self.placeholder != nil ? self.placeholder! : "", attributes:[NSForegroundColorAttributeName: newValue!])
        }
    }
}
```

Bây giờ, chúng ta quay lại file Main.Storyboard và click vào một trong các UITextFields trong viewcontroller. Sau đó đi tới **Attributes Inspector** và chúng ta thấy thêm option set color cho UITextField.

![](https://images.viblo.asia/2951c216-c108-4bb3-b0f3-ae4cb1bd9f8d.png)

#### User Defined Runtime Attributes

Và cuối cùng đây là giải pháp đơn giản nhất mà bạn không cần phải thêm bất cứ dòng code nào. Chúng ta đi tới UITextField sau đó chọn **Identity Inspector** và cuộn xuống tới **User Defined Runtime Attributes**:

![](https://images.viblo.asia/f7ea7b7f-82bc-431c-ae7f-7ba1c54fc83f.png)

Click button "+" và thêm key và value như dưới đây:

| Key Path | Type | Value |
| -------- | -------- | -------- |
| _placeholderLabel.textColor     | Color     | Select a color     |

Và sau đó run app bạn sẽ thấy kết quả ngay lập tức.

### Conclusion

Trong bài viết này mình đã giới thiệu tới các bạn các cách làm khác nhau để có thể dễ dàng thay đổi color cho placeholder. Tuỳ vào từng bài toán thực tế chúng ta sẽ lựa chọn các cách khác nhau cho phù hợp.

Cám ơn bạn đã dành thời gian cho bài viết này!

##### _Nguồn:_
[https://www.ios-blog.com/tutorials/swift/how-to-change-the-placeholder-color-using-swift-extensions-or-user-defined-runtime-attributes/)