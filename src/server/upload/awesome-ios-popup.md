### Giới thiệu

Chắc hẳn nói đến Popup thì đã quá quen thuộc với ae dev và hầu hết các dự án đều sử dụng. Tuy nhiên Popup theo dự án thực tế thường yêu cầu phải custom nên giữa một rừng các library về Popup nhiều lúc sẽ khiến chúng ta phân vân không biết lựa chọn Popup nào dễ sử dụng. Hôm nay mình sẽ giới thiệu với các bạn một Popup rất hay, dùng rất thích nhé! :D

**Nào chúng ta cùng tìm hiểu nhé!**

### Introduction

![](https://images.viblo.asia/9f79670b-f316-44f9-99f5-822d4dcfb52e.png)


Popup Dialog rất đơn giản, là popup được custom viết bằng Swift.

### Features

Dễ sàng sử dụng 
Hỗ trợ Format mặc định với ảnh, title và message
Hỗ trợ sử dụng và tùy chỉnh qua giao diện: phông chữ, màu sắc, bo góc, bóng mờ...
Dễ dàng tương thích với ObjectiveC
Chạy trên tất cả các màn hình và thiết bị chạy iOS9 trở lên

### Installation

Version hiện tại là [0.8.1](https://cocoapods.org/pods/PopupDialog) tương thích với Swift 4, với swift 3 bạn sử dụng version 0.5.4

#### CocoaPods

Bạn có thể dễ dàng cài đặt CoaPods thông qua việc thêm vào file Podfile như dưới đây:
```Swift
use_frameworks!

target '<Your Target Name>'
pod 'PopupDialog', '~> 0.8'
```


#### Example

Chúng ta cùng thử dùng thư viện với những dòng code dưới đây:

```Swift
import PopupDialog

// Prepare the popup assets
let title = "THIS IS THE DIALOG TITLE"
let message = "This is the message section of the popup dialog default view"
let image = UIImage(named: "pexels-photo-103290")

// Create the dialog
let popup = PopupDialog(title: title, message: message, image: image)

// Create buttons
let buttonOne = CancelButton(title: "CANCEL") {
    print("You canceled the car dialog.")
}

// This button will not the dismiss the dialog
let buttonTwo = DefaultButton(title: "ADMIRE CAR", dismissOnTap: false) {
    print("What a beauty!")
}

let buttonThree = DefaultButton(title: "BUY CAR", height: 60) {
    print("Ah, maybe next time :)")
}

// Add buttons to dialog
// Alternatively, you can use popup.addButton(buttonOne)
// to add a single button
popup.addButtons([buttonOne, buttonTwo, buttonThree])

// Present dialog
self.present(popup, animated: true, completion: nil)
```

#### Usage
PopupDialog là subclass của UIViewController vì thế bạn có thể thêm vào view controller của bạn bình thường. Bạn cũng có thể khởi tạo nó với view mặc định hoặc một custom view controller

#### Default Dialog

```Swift
public convenience init(
    title: String?,
    message: String?,
    image: UIImage? = nil,
    buttonAlignment: UILayoutConstraintAxis = .vertical,
    transitionStyle: PopupDialogTransitionStyle = .bounceUp,
    preferredWidth: CGFloat = 340,
    tapGestureDismissal: Bool = true,
    panGestureDismissal: Bool = true,
    hideStatusBar: Bool = false,
    completion: (() -> Void)? = nil) 
```

Đây là hộp thoại mặc định bạn tạo ra sẽ có title, messafe, image. Ngoài ra bạn có thể thêm các button bên dưới như hình dưới đây: 

![](https://images.viblo.asia/07774a0b-e143-4ca3-9074-485abc2b6bae.png)


#### Custom View Controller

```Swift
public init(
    viewController: UIViewController,
    buttonAlignment: UILayoutConstraintAxis = .vertical,
    transitionStyle: PopupDialogTransitionStyle = .bounceUp,
    preferredWidth: CGFloat = 340,
    tapGestureDismissal: Bool = true,
    panGestureDismissal: Bool = true,
    hideStatusBar: Bool = false,
    completion: (() -> Void)? = nil) 
```
Hoặc bạn cũng có thể dễ dàng sử dụng Custom View Controller mà bạn muốn. 
Bạn cũng có thể dễ dàng dismiss popup ngày từ trong Custom View Controller với câu lệnh sau:

```Swift
dismissViewControllerAnimated(flag: Bool, completion: (() -> Void)?)
```


#### Transition Style

Bạn có thể dễ dàng thay đổi style transition với các style dưới đây. Mặc định cài đặt là bounceUp

```Swift
public enum PopupDialogTransitionStyle: Int {
    case bounceUp
    case bounceDown
    case zoomIn
    case fadeIn
}
```

#### Gesture Dismissal

Chức năng Gesture dismissal cho phép dialog của bạn có thể dismiss bởi việc tap vào background hoặc swiping dialog xuống.
Mặc định được set là true nhưng nếu bạn không muốn tính năng này thì bạn set là false

### Styling PopupDialog

Appearance là một cách ưa thích để tùy chỉnh style của PopupDialog. Ý tưởng của việc này là định nghĩa một theme trong một single place mà không cung cấp cài đặt style vì thế sẽ chỉ yêu cầu một đoạn code tối thiểu để viết

#### Dialog Default View Appearance Settings

Nếu bạn đang sử dụng Dialog mặc định thì Apprearance được viết như sau:

```Swift
let dialogAppearance = PopupDialogDefaultView.appearance()

dialogAppearance.backgroundColor      = .white
dialogAppearance.titleFont            = .boldSystemFont(ofSize: 14)
dialogAppearance.titleColor           = UIColor(white: 0.4, alpha: 1)
dialogAppearance.titleTextAlignment   = .center
dialogAppearance.messageFont          = .systemFont(ofSize: 14)
dialogAppearance.messageColor         = UIColor(white: 0.6, alpha: 1)
dialogAppearance.messageTextAlignment = .center
```

#### Dialog Container Appearance Settings

Trong trường hợp container chứa PopupDialogDefaultView hoặc custom view controller của bạn thì appearence được viết như sau:

```Swift
let containerAppearance = PopupDialogContainerView.appearance()

containerAppearance.backgroundColor = UIColor(red:0.23, green:0.23, blue:0.27, alpha:1.00)
containerAppearance.cornerRadius    = 2
containerAppearance.shadowEnabled   = true
containerAppearance.shadowColor     = .black
containerAppearance.shadowOpacity   = 0.6
containerAppearance.shadowRadius    = 20
containerAppearance.shadowOffset    = CGSize(width: 0, height: 8)
containerAppearance.shadowPath      = CGPath(...)
```

#### Overlay View Appearance Settings

Trường hợp này sử dụng cho mục đích bạn muốn thêm một overlay dưới view controller nhưng lại trên popup dialog view:

```Swift
let overlayAppearance = PopupDialogOverlayView.appearance()

overlayAppearance.color           = .black
overlayAppearance.blurRadius      = 20
overlayAppearance.blurEnabled     = true
overlayAppearance.liveBlurEnabled = false
overlayAppearance.opacity         = 0.7
```


### Objective-C

PopupDialog có thể sử dụng trong tốt với Objective-C projects:

```Swift
PopupDialog *popup = [[PopupDialog alloc] initWithTitle: @"Title"
                                                message: @"This is a message"
                                                  image: nil
                                        buttonAlignment: UILayoutConstraintAxisVertical
                                        transitionStyle: PopupDialogTransitionStyleBounceUp
                                         preferredWidth: 380
                                    tapGestureDismissal: NO
                                    panGestureDismissal: NO
                                          hideStatusBar: NO
                                             completion: nil];

DestructiveButton *delete = [[DestructiveButton alloc] initWithTitle: @"Delete"
                                                              height: 45
                                                        dismissOnTap: YES
                                                              action: nil];

CancelButton *cancel = [[CancelButton alloc] initWithTitle: @"Cancel"
                                                    height: 45
                                              dismissOnTap: YES
                                                    action: nil];

DefaultButton *ok = [[DefaultButton alloc] initWithTitle: @"OK"
                                                  height: 45
                                            dismissOnTap: YES
                                                  action: nil];

[dialog addButtons:@[delete, cancel, ok]];

[self presentViewController:popup animated:YES completion:nil];
```

### Kết Luận

Có thể nói Popup Dialog là một thư viện khá hay và nhiều tính năng tuyệt vời cho ứng dụng iOS. Nếu bạn biết thêm các thư viện khác về Popup hãy comment để chúng ta cũng nắm được nhé!

**Cám ơn bạn đã dành thời gian cho bài viết!**

##### _Nguồn:_

[https://github.com/Orderella/PopupDialog](https://github.com/Orderella/PopupDialog)