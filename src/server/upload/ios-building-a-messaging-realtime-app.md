Trong bài hôm nay, chúng ta sẽ xây dựng một cuộc trò chuyện nhóm thời gian thực cho iOS bằng cách sử dụng Scaledrone Swift API Client. 

## Setting Up The App

Đầu tiên, tạo 1 Single View App trên Xcode. Chúng ta sử dụng 2 thư viện:  Một là Scaledrone, đơn giản hóa việc nhắn tin theo thời gian thực. Cái thứ hai là MessageKit, một thư viện giao diện người dùng trò chuyện cung cấp danh sách tin nhắn có thể tùy chỉnh, với bong bóng trò chuyện, hình đại diện, nhãn tên người dùng và các tính năng giao diện người dùng gọn gàng khác.

Chúng ta cài đặt thư viện bằng CocoaPods:

```
pod 'MessageKit'
pod 'Scaledrone', '~> 0.3.0'
```

## Creating the UI

Ở file ViewController.swift import the MessageKit library:

`import MessageKit`

Cho `ViewController` kế thừa `MessagesViewController`

`class ViewController: MessagesViewController {`

MessagesViewController thuộc MessageKit chứa một collection view hiển thị các tin nhắn, cũng như một thanh nhập để gửi một tin nhắn mới.

Trước hết, chúng ta cần một cách để lưu trữ tất cả các tin nhắn mà chúng ta muốn hiển thị.
Tạo file `Message.swift` có 2 model `Member` và `Message`

```
import Foundation
import UIKit
import MessageKit

struct Member {
  let name: String
  let color: UIColor
}

struct Message {
  let member: Member
  let text: String
  let messageId: String
}
```

Mỗi Member sẽ có một màu được gán cho họ và hiển thị bên cạnh message của họ.

Vì MessageKit hoạt động với các messages theo giao thức MessageType, chúng ta sẽ mở rộng Message:

```
extension Message: MessageType {
  var sender: Sender {
    return Sender(id: member.name, displayName: member.name)
  }
  
  var sentDate: Date {
    return Date()
  }
  
  var kind: MessageKind {
    return .text(text)
  }
}
```

Quay lại `ViewController.swift`, thêm một mảng [messages] trên viewDidLoad:

```
var messages: [Message] = []
var member: Member!
```

Để cập nhật chế độ xem, cũng như xử lý tương tác của người dùng, chúng ta cần triển khai bốn giao thức:

1. `MessagesDataSource` cung cấp số lượng và nội dung messages.

2. `MessagesLayoutDelegate` cung cấp height, padding và alignment cho các chế độ xem khác nhau.

3. `MessagesDisplayDelegate`cung cấp colors, styles giao diện messages.

4. `MessageInputBarDelegate` handles sending và typing new messages.

Triển khai các giao thức trong  `ViewController.swift`

```
extension ViewController: MessagesDataSource {
  func numberOfSections(
    in messagesCollectionView: MessagesCollectionView) -> Int {
    return messages.count
  }
  
  func currentSender() -> Sender {
    return Sender(id: member.name, displayName: member.name)
  }
  
  func messageForItem(
    at indexPath: IndexPath,
    in messagesCollectionView: MessagesCollectionView) -> MessageType {
    
    return messages[indexPath.section]
  }
  
  func messageTopLabelHeight(
    for message: MessageType, 
    at indexPath: IndexPath, 
    in messagesCollectionView: MessagesCollectionView) -> CGFloat {
    
    return 12
  }
  
  func messageTopLabelAttributedText(
    for message: MessageType, 
    at indexPath: IndexPath) -> NSAttributedString? {
    
    return NSAttributedString(
      string: message.sender.displayName,
      attributes: [.font: UIFont.systemFont(ofSize: 12)])
  }
}
```

Đầu tiên, tạo một cá thể Người gửi Sender từ member. Sau đó, chúng tôi trả về số lượng tin nhắn. Mỗi phần chứa một thông báo mới. Cuối cùng, chúng tôi trả về một text chứa username của sender cho label nằm trên message.

Giao thức tiếp theo chúng ta cần thực hiện là `MessagesLayoutDelegate`:

```
extension ViewController: MessagesLayoutDelegate {
  func heightForLocation(message: MessageType, 
    at indexPath: IndexPath, 
    with maxWidth: CGFloat, 
    in messagesCollectionView: MessagesCollectionView) -> CGFloat {
    
    return 0
  }
}
```

Chúng ta chỉ trả về 0 cho chiều cao và MessageKit sẽ tính toán nó cho chúng ta.

Để triển khai `MessagesDisplayDelegate`, chúng ta đảm bảo rằng đặt màu của member làm background color của avartar view.

```
extension ViewController: MessagesDisplayDelegate {
  func configureAvatarView(
    _ avatarView: AvatarView, 
    for message: MessageType, 
    at indexPath: IndexPath, 
    in messagesCollectionView: MessagesCollectionView) {
    
    let message = messages[indexPath.section]
    let color = message.member.color
    avatarView.backgroundColor = color
  }
}
```

Giao thức cuối cùng chúng ta cần thực hiện là `MessageInputBarDelegate`. Điều này cho phép chúng ta thực sự gửi một tin nhắn mới. Hiện tại, chúng ta sẽ chỉ thêm thông báo vào mảng. Sau đó, chúng ta sẽ thực sự gửi nó đến Scaledrone.

```
extension ViewController: MessageInputBarDelegate {
  func messageInputBar(
    _ inputBar: MessageInputBar, 
    didPressSendButtonWith text: String) {
    
    let newMessage = Message(
      member: member, 
      text: text, 
      messageId: UUID().uuidString)
      
    messages.append(newMessage)
    inputBar.inputTextView.text = ""
    messagesCollectionView.reloadData()
    messagesCollectionView.scrollToBottom(animated: true)
  }
}
```

Chúng ta tạo một tin nhắn mới với văn bản được cung cấp bởi phương thức này. Sử dụng UUID để lấy một chuỗi duy nhất làm ID của message. Sau đó, chúng ta sẽ nối message đó vào mảng và reload lại messagesCollectionView.
Thêm đoạn code vào `viewDidLoad`:

```
member = Member(name: "summerfire", color: .blue)
messagesCollectionView.messagesDataSource = self
messagesCollectionView.messagesLayoutDelegate = self
messageInputBar.delegate = self
messagesCollectionView.messagesDisplayDelegate = self
```

![Screen Shot 2021-09-20 at 10.15.29.png](https://images.viblo.asia/e81866a0-e7ec-4457-9dbe-6780d9968b32.png)

## Preparing Your Members

Chúng ta sẽ gửi và nhận tin nhắn và các members dưới dạng JSON.

Chúng ta cho color của Member lấy từ kiểu hexa, tạo file `Extensions.swift`:

```
extension UIColor {
  convenience init(hex: String) {
    var hex = hex
    if hex.hasPrefix("#") {
        hex.remove(at: hex.startIndex)
    }
    
    var rgb: UInt64 = 0
    Scanner(string: hex).scanHexInt64(&rgb)

    let r = (rgb & 0xff0000) >> 16
    let g = (rgb & 0xff00) >> 8
    let b = rgb & 0xff
    
    self.init(
      red: CGFloat(r) / 0xff,
      green: CGFloat(g) / 0xff,
      blue: CGFloat(b) / 0xff, 
      alpha: 1
    )
  }
  
  var hexString: String {
    var r: CGFloat = 0
    var g: CGFloat = 0
    var b: CGFloat = 0
    var a: CGFloat = 0
    
    self.getRed(&r, green: &g, blue: &b, alpha: &a)
    
    return String(
      format: "#%02X%02X%02X",
      Int(r * 0xff),
      Int(g * 0xff),
      Int(b * 0xff)
    )
  }
}
```

Chúng ta chuyển model Member sang Json. Trong file `Message.swift` thêm đoạn code sau:

```
extension Member {
  var toJSON: Any {
    return [
      "name": name,
      "color": color.hexString
    ]
  }
  
  init?(fromJSON json: Any) {
    guard
      let data = json as? [String: Any],
      let name = data["name"] as? String,
      let hexColor = data["color"] as? String
    else {
      print("Couldn't parse Member")
      return nil
    }
    
    self.name = name
    self.color = UIColor(hex: hexColor)
  }
}
```

## Connecting To Scaledrone

Vàp `Info.plist`, thêm new key  `App Transport Security Settings`, bên trong set `Allow Arbitrary Loads = YES`

![](https://images.viblo.asia/eb7247b3-d946-4f44-9cb6-b29f987bc961.png)

Nếu bạn chưa có tài khoản Scaledrone, hãy mở Scaledrone.com và tạo một tài khoản miễn phí mới. Để kết nối thành công với Scaledrone, bạn cần lấy ID kênh của riêng mình từ trang tổng quan của Scaledrone. Để làm điều đó, hãy truy cập trang tổng quan và nhấp vào nút + Tạo kênh màu xanh để bắt đầu. Bạn có thể chọn Không bao giờ yêu cầu xác thực ngay bây giờ. Ghi lại ID kênh từ kênh vừa tạo.

Tạo file `ChatService.swift`:

```
import Foundation
import Scaledrone

class ChatService {
  private let scaledrone: Scaledrone
  private let messageCallback: (Message)-> Void
  
  private var room: ScaledroneRoom?
  
  init(member: Member, onRecievedMessage: @escaping (Message)-> Void) {
    self.messageCallback = onRecievedMessage
    self.scaledrone = Scaledrone(
      channelID: "YOUR-CHANNEL-ID", //enter the channel ID on Scaledrone.com
      data: member.toJSON)
    scaledrone.delegate = self
  }
  
  func connect() {
    scaledrone.connect()
  }
}
```

Trong trình khởi tạo, chúng ta sẽ nhận được member hiện tại mà chúng ta sẽ gọi mỗi khi có tin nhắn mới. Chúng ta sẽ sử dụng callback để cập nhật chế độ xem khi có tin nhắn mới.

Chúng ta sẽ tạo một instance của Scaledrone, quản lý việc kết nối với dịch vụ. Bạn có nhớ ID kênh ở trên không? Đảm bảo chuyển nó ở đây để Scaledrone biết kênh nào cần kết nối.

Kết nối với Scaledrone bằng cách gọi instance của Scaledrone. Để biết điều gì đang xảy ra sau khi kết nối với Scaledrone, chúng ta sẽ triển khai giao thức `ScaledroneDelegate`.

Sau khi Scaledrone kết nối, chúng ta cần vào một room. `Room` là một nhóm người dùng mà chúng ta có thể gửi tin nhắn. Bạn lắng nghe những thông điệp đó bằng cách đăng ký một room có tên cụ thể.

```
extension ChatService: ScaledroneDelegate {
  func scaledroneDidConnect(scaledrone: Scaledrone, error: NSError?) {
    print("Connected to Scaledrone")
    room = scaledrone.subscribe(roomName: "observable-room")
    room?.delegate = self
  }
  
  func scaledroneDidReceiveError(scaledrone: Scaledrone, error: NSError?) {
    print("Scaledrone error", error ?? "")
  }
  
  func scaledroneDidDisconnect(scaledrone: Scaledrone, error: NSError?) {
    print("Scaledrone disconnected", error ?? "")
  }
}
```


Để nghe tin nhắn mới, chúng ta cần triển khai thêm một giao thức: `ScaledroneRoomDelegate`.

```
extension ChatService: ScaledroneRoomDelegate {
  func scaledroneRoomDidConnect(room: ScaledroneRoom, error: NSError?) {
    print("Connected to room!")
  }
  
  func scaledroneRoomDidReceiveMessage(
    room: ScaledroneRoom, 
    message: Any, 
    member: ScaledroneMember?) {
    
    guard
      let text = message as? String,
      let memberData = member?.clientData,
      let member = Member(fromJSON: memberData)
    else {
      print("Could not parse data.")
      return
    }
    
    let message = Message(
      member: member, 
      text: text, 
      messageId: UUID().uuidString)
    messageCallback(message)
  }
}
```

Khi nhận được một tin nhắn mới, chúng ta sẽ chuyển nó thành một String. Sau đó, tạo một Member từ data nhận được, sử dụng trình khởi tạo mà chúng tôi đã tạo trước đó. Với hai phần đó, chúng tôi xây dựng thông điệp, tạo cho nó một ID duy nhất. Cuối cùng, chúng ta gọi callback để view controller biết có tin nhắn mới đến.

Thêm function dưới `ChatService` class:

```
func sendMessage(_ message: String) {
  room?.publish(message: message)
}
```

Đó là tất cả những gì cần thiết để kết nối với Scaledrone!

## Final Touches

Chúng ta cần sửa đổi `ViewController.swift` để sử dụng `ChatService` mới mà chúng tôi đã tạo. Thêm instance ChatService:

`var chatService: ChatService!`

Thêm đoạn code sau dưới `viewDidLoad`:

```
chatService = ChatService(member: member, onRecievedMessage: {
  [weak self] message in
  self?.messages.append(message)
  self?.messagesCollectionView.reloadData()
  self?.messagesCollectionView.scrollToBottom(animated: true)
})

chatService.connect()
```

Khi nhận được thông báo mới, chúng ta sẽ refresh UI. Chúng ta sẽ kết nối với Scaledrone ngay khi màn hình reload.

Cuối cùng, trong `extension MessageInputBarDelegate`, đổi nội dung của phương thức `messageInputBar (_: didPressSendButtonWith :)` thành hai dòng sau:

```
chatService.sendMessage(text)
inputBar.inputTextView.text = ""
```


Chạy thử ứng dụng và gửi một vài tin nhắn.

Chúc các bạn thành công. Cảm ơn các bạn :D

*Nguồn: https://www.scaledrone.com/blog/ios-chat-tutorial/*