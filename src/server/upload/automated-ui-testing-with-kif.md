#### UI Testing:
UITest là phương thức test thông qua các user interface đem lại các lợi ích sau:
* Tránh những bug đã được fix rồi mà bị lại khi ta sửa một đoạn code nào đó.
* Giảm thời gian manual test.
* Test được ViewController.
* Giúp chúng ta có 1 cái nhìn tổng quát về follow của app.
#### KIF framework
Apple hỗ trợ cho chúng ta một framework khá tốt để viết UITest đó là **XCUITest**, tuy nhiên **XCUITest** với syntax không thân thiện cho lắm, nên việc mô tả các testcase chưa được rõ ràng gây ra khá nhiều khó khăn cho người mới tiếp cận UITest. **KIF (Keep It Functional)**  là một open source framework cung cấp rất rất nhiều phương thức hỗ trợ, giúp việc viết UITest nhanh gọn, dễ hiểu hơn. Với syntax gần gũi với ngôn ngữ tự nhiên, giúp việc mô tả các testcase rõ ràng và xúc tích hơn so với **XCUITest**.
#### Demo
Demo đơn giản với 2 textfield username và password. Nếu username và password rỗng thì disable SignIn button đi. Nếu username bằng "framgia" và password bằng "123456" thì khi nhấn signIn button sẽ show "Success" nếu không thì show "Error".

![](https://images.viblo.asia/2afae1be-752b-4ec0-bd7a-ff7453c4a865.png)

KIF không sử dụng **iOS UI Testing Bundle** mà sử dụng **iOS Unit Testing Bundle** nên ta cài đặt vào target Uni Test.Install KIF bằng cocoapd - thêm pod KIF vào target Tests sau đó run **pod install**:
```swift
target 'KIF-UITestDemoTests' do
    inherit! :search_paths
    pod 'KIF'
  end
```

Để làm việc với **KIF** thì ta cần add thêm các extension sau:
```swift
import XCTest
@testable import UITestDemo
import KIF

extension XCTestCase {
    func tester(file : String = #file, _ line : Int = #line) -> KIFUITestActor {
        return KIFUITestActor(inFile: file, atLine: line, delegate: self)
    }
    
    func system(file : String = #file, _ line : Int = #line) -> KIFSystemTestActor {
        return KIFSystemTestActor(inFile: file, atLine: line, delegate: self)
    }
}

extension KIFTestActor {
    func tester(file : String = #file, _ line : Int = #line) -> KIFUITestActor {
        return KIFUITestActor(inFile: file, atLine: line, delegate: self)
    }
    
    func system(file : String = #file, _ line : Int = #line) -> KIFSystemTestActor {
        return KIFSystemTestActor(inFile: file, atLine: line, delegate: self)
    }
}
```

Với ứng dụng Demo trên thì ta có thể nghĩ ra **testcase** sau:
* Username rỗng -> SignButton Disable
* Password rỗng -> SignButton Disable
* Username &  Password không rỗng -> SignButton Enable
* Username = "framgia" và password = "123456" -> Show status Success.
 * Username khác "framgia" hoặc password khác "123456" -> Show status Error.

Để viết UITest ta khai báo các **accessibilityLabel** cho các UIControl (với tableView và collectionView thì dùng **accessibilityIdentifier**):
```swift
usernameTextField.accessibilityLabel = "login.username.textfield"
passwordTextField.accessibilityLabel = "login.password.textfield"
signInButton.accessibilityLabel = "login.signIn.button"
loginStatusLabel.accessibilityLabel = "login.status.label"
```

Dựa trên 5 **testcase** trên thì ta có 5 func UITest sau:
```swift
class LoginTest: KIFTestCase {
    override func beforeEach() {
        super.beforeEach()
        tester().clearTextFromView(withAccessibilityLabel: "login.username.textfield")
        tester().clearTextFromView(withAccessibilityLabel: "login.password.textfield")
    }
    
    func test_userNameIsEmpty_SignInButtonDisable() {
        tester().clearTextFromView(withAccessibilityLabel: "login.username.textfield")
        tester().enterText("1234", intoViewWithAccessibilityLabel: "login.password.textfield")
        
        let signInButton = tester().waitForView(withAccessibilityLabel: "login.signIn.button") as! UIButton
        XCTAssertFalse(signInButton.isEnabled)
    }
    
    func test_passwordIsEmpty_SignInButtonDisable() {
        tester().enterText("framgia", intoViewWithAccessibilityLabel: "login.username.textfield")
        tester().clearTextFromView(withAccessibilityLabel: "login.password.textfield")
        
        let signInButton = tester().waitForView(withAccessibilityLabel: "login.signIn.button") as! UIButton
        XCTAssertFalse(signInButton.isEnabled)
    }
    
    func test_validUsernameAndPassword_SignInButtonEnable(){
        tester().enterText("framgia", intoViewWithAccessibilityLabel: "login.username.textfield")
        tester().enterText("framgia", intoViewWithAccessibilityLabel: "login.password.textfield")
        
        let signInButton = tester().waitForView(withAccessibilityLabel: "login.signIn.button") as! UIButton
        XCTAssertTrue(signInButton.isEnabled)
    }
    
    func test_SignInSuccess_showSuccessStatus(){
        tester().enterText("framgia", intoViewWithAccessibilityLabel: "login.username.textfield")
        tester().enterText("123456", intoViewWithAccessibilityLabel: "login.password.textfield")
        
        tester().tapView(withAccessibilityLabel: "login.signIn.button")
        
        let statusLabel = tester().waitForView(withAccessibilityLabel: "login.status.label") as! UILabel
        XCTAssert(statusLabel.text == "Success")
    }
    
    func test_SignInError_showErrorStatus(){
        tester().enterText("hanoi", intoViewWithAccessibilityLabel: "login.username.textfield")
        tester().enterText("123456", intoViewWithAccessibilityLabel: "login.password.textfield")
        
        tester().tapView(withAccessibilityLabel: "login.signIn.button")
        
        let statusLabel = tester().waitForView(withAccessibilityLabel: "login.status.label") as! UILabel
        XCTAssert(statusLabel.text == "Error")
    }
}
```

Run Test:
![](https://images.viblo.asia/3b566098-c9c4-413c-b82e-f347a1e62f1b.gif)

#### Kết luận:
UITest mang lại rất nhiều lợi ích cho ứng dụng, giúp cho ứng dụng ít bug hơn và người vào sau cũng có thể dễ dàng nắm được follow.
Hi vọng qua bài viết các bạn có thể nắm sơ qua được UITest và áp dụng chúng vào các project.