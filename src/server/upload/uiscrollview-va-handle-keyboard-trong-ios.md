Bài viết này mình sẽ viết demo về một vấn đề thường gặp trong iOS: scrollView và handle keyboard. 
Ví dụ trong bài viết là mình tạo một màn hình Sign up đơn giản gồm các trường: email, first, last name, password. Các trường này đều là UITextFeild, nằm trong một UIScrollView. Bình thường, nếu trường nào ở phía bottom của màn hình thì khi show bàn phím lên sẽ bị che mất trường đấy. Bài viết này mình sẽ hướng dẫn cách mà khi bàn phím hiển thị sẽ di chuyển textField lên dựa trên chiều cao bàn phím. 

Bạn mở XCode lên, tạo 1 project mới, mình đặt tên là TestScrollView.
Đầu tiên, bạn mở file **Main.storyboard** lên, kéo một UIScrollView vào UIViewController:

![](https://images.viblo.asia/ee6ec4e2-229f-485b-8c7a-589d3b089bca.png)

Sau đó set autolayout cho scrollView:

![](https://images.viblo.asia/c00fa152-7fe8-41ba-a79d-e69643695ed8.png)

Chúng ta sẽ kéo thêm một UIView (contentView) vào bên trong scrollView và set contraints cho nó:

![](https://images.viblo.asia/6b26459b-74d8-4565-81d5-e30078d702cc.png)

Size của contentView cũng là contentSize của scrollView, bây giờ height của contentView bằng height của scrollView nên bạn không thể scroll được. 
Sau đó, nếu bạn thêm một số view vào contentView và chúng vượt quá kích thước màn hình, bạn chỉ cần sửa đổi contraint height của contentView thì scrollView có thể scroll được.


Bây giờ chúng ta sẽ thêm một số TextField vào trong contentView:

![](https://images.viblo.asia/7bac826f-a2e0-4e4e-a2c5-4b380d9ce4c1.png)

Mình cố tình autolayout sao cho textField password nằm ở phía dưới keyboard. Bây giờ mình run app và chọn vào textField password xem thử nhé:

![](https://images.viblo.asia/dd3819bd-f26b-4cfe-b995-5a070696e506.png)

textFiel password đã bị che bởi bàn phím rồi, đây là vấn đề mà mình sẽ phải giải quyết. 

Mình sẽ kéo outlet cho các textField nhé:

```
@IBOutlet weak var emailTextField: UITextField!
@IBOutlet weak var firstNameTextFeild: UITextField!
@IBOutlet weak var lastNameTextFeild: UITextField!
@IBOutlet weak var passwordTextField: UITextField!
```

Tiếp theo là set delegate cho các textField:

```
emailTextField.delegate = self
firstNameTextFeild.delegate = self
lastNameTextFeild.delegate = self
 passwordTextField.delegate = self
```

Chúng ta cần 2 action từ UITextFieldDelegate: textFieldShouldBeginEditing và textFieldShouldReturn. Cần một biến để giữ TextField hiện tại, mình gọi là activeField.

```
var activeField: UITextField?
var lastOffset: CGPoint?

extension ViewController: UITextFieldDelegate {
    func textFieldShouldBeginEditing(_ textField: UITextField) -> Bool {
        activeField = textField
        lastOffset = self.scrollView.contentOffset
        return true
    }
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        activeField?.resignFirstResponder()
        activeField = nil
        return true
    }
}
```

Bây giờ chúng ta cần biết khi nào keyboard sẽ show. Thêm 2 observer cho keyboard: UIKeyboardWillShow và UIKeyboardWillHide:

```
 NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillShow),
                                               name: UIResponder.keyboardWillShowNotification, object: nil)
NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillHide),
                                               name: UIResponder.keyboardWillHideNotification, object: nil)
```

Các hàm handle như sau:

```
@objc func keyboardWillShow(notification: NSNotification) {
        if keyboardHeight != nil {
            return
        }
        
        if let keyboardSize = (notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue)?.cgRectValue {
            keyboardHeight = keyboardSize.height
            
            // so increase contentView's height by keyboard height
            UIView.animate(withDuration: 0.3, animations: {
                self.contraintContentHeight.constant += self.keyboardHeight!
            })
            
            // move if keyboard hide input field
            let distanceToBottom = self.scrollView.frame.size.height - (activeField?.frame.origin.y)! - (activeField?.frame.size.height)!
            let collapseSpace = keyboardHeight! - distanceToBottom
            
            if collapseSpace < 0 {
                // no collapse
                return
            }
            
            // set new offset for scroll view
            UIView.animate(withDuration: 0.3, animations: {
                // scroll to the position above keyboard 10 points
                self.scrollView.contentOffset = CGPoint(x: self.lastOffset!.x, y: collapseSpace + 10)
            })
        }
    }
    
    @objc func keyboardWillHide(notification: NSNotification) {
        UIView.animate(withDuration: 0.3) {
            guard let keyboardHeight = self.keyboardHeight, let lastOffset = self.lastOffset else { return }
            self.contraintContentHeight.constant -= keyboardHeight
            self.scrollView.contentOffset = lastOffset
        }
        
        keyboardHeight = nil
    }
```

Bạn run app lại sẽ thấy kết quả:

![](https://images.viblo.asia/e90ad11c-c980-4557-a1cf-4bbdccc8fbd2.gif)