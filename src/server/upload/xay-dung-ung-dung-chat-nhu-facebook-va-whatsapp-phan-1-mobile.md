**Trong bài viết này, tôi sẽ tập trung vào cách triển khai trạng thái gửi tin nhắn trong ứng dụng iOS. Bài viết này tôi sẽ không đi sâu vào quá nhiều chi tiết về cách sử dụng Xcode và cú pháp Swift.**

Những thứ ứng dụng sẽ cần làm.

Đây là một  ứng dụng nhắn tin message iOS và ứng dụng này sẽ cho phép bạn tin nhắn và xem trạng thái gửi tin nhắn sau khi nó được gửi. Tính năng này tương tự như message ở  WhatsApp hoặc Facebook Messenger và các ứng dụng khác.

1.Ban đầu bạn cần dùng cocoapod để down thư viện về

```swift
# Uncomment the next line to define a global platform for your project
platform :ios, '9.0'

target 'anonchat' do
  # Comment
  use_frameworks!

  # Pods for anonchat
  pod 'Alamofire'
  pod 'PusherSwift'
  pod 'JSQMessagesViewController'
end
```

2. Thiết kế giao diện giống như sau đây:
![](https://images.viblo.asia/2a1e1a81-af7e-41d6-abb2-141b8d94d299.png)

Tạo root viewcontroller cho màn hình đầu tiên là WelcomeViewController
```swift
import UIKit

class WelcomeViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
    }
}
```


ở màn hìh ChatViewController screen implement code sau:

```swift
import UIKit
import Alamofire
import PusherSwift
import JSQMessagesViewController

class ChatViewController: JSQMessagesViewController {
    override func viewDidLoad() {
    super.viewDidLoad()

    let n = Int(arc4random_uniform(1000))

    senderId = "anonymous" + String(n)
    senderDisplayName = senderId

    inputToolbar.contentView.leftBarButtonItem = nil

    incomingBubble = JSQMessagesBubbleImageFactory().incomingMessagesBubbleImage(with: UIColor.jsq_messageBubbleBlue())
    outgoingBubble = JSQMessagesBubbleImageFactory().outgoingMessagesBubbleImage(with: UIColor.jsq_messageBubbleGreen())

    collectionView!.collectionViewLayout.incomingAvatarViewSize = CGSize.zero
    collectionView!.collectionViewLayout.outgoingAvatarViewSize = CGSize.zero

    automaticallyScrollsToMostRecentMessage = true

    collectionView?.reloadData()
    collectionView?.layoutIfNeeded()
}
}
```

Trong đoạn code trên,  tôi đã bắt đầu tùy chỉnh giao diện messsage của mình, bằng cách sử dụng lớp cha để đặt các thuộc tính này. 
Ví dụ ,  tôi đang đặt Bubble đến thành màu xanh lam và tin nhắn của bạn đến sẽ là màu xanh lá cây.
Ở đây tôi cũng đã loại bỏ hiển thị hình đại diện vì giờ thì chưa cần đến nó.

Tiếp theo ta sẽ override lại một số methods của lớp cha để hiện message ra và customize .

```swift
override func collectionView(_ collectionView: JSQMessagesCollectionView!, messageDataForItemAt indexPath: IndexPath!) -> JSQMessageData! {
    return messages[indexPath.item]
}

override func collectionView(_ collectionView: JSQMessagesCollectionView!, attributedTextForCellBottomLabelAt indexPath: IndexPath!) -> NSAttributedString! {
    if !isAnOutgoingMessage(indexPath) {
        return nil
    }

    let message = messages[indexPath.row]

    switch (message.status) {
    case .sending:
        return NSAttributedString(string: "Sending...")
    case .delivered:
        return NSAttributedString(string: "Delivered")
    }
}

override func collectionView(_ collectionView: JSQMessagesCollectionView!, layout collectionViewLayout: JSQMessagesCollectionViewFlowLayout!, heightForCellBottomLabelAt indexPath: IndexPath!) -> CGFloat {
    return CGFloat(15.0)
}

override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
    return messages.count
}

override func collectionView(_ collectionView: JSQMessagesCollectionView!, messageBubbleImageDataForItemAt indexPath: IndexPath!) -> JSQMessageBubbleImageDataSource! {
    let message = messages[indexPath.item]
    if message.senderId == senderId {
        return outgoingBubble
    } else {
        return incomingBubble
    }
}

override func collectionView(_ collectionView: JSQMessagesCollectionView!, avatarImageDataForItemAt indexPath: IndexPath!) -> JSQMessageAvatarImageDataSource! {
    return nil
}

override func didPressSend(_ button: UIButton, withMessageText text: String, senderId: String, senderDisplayName: String, date: Date) {
    let message = addMessage(senderId: senderId, name: senderId, text: text) as! AnonMessage

    postMessage(message: message)
    finishSendingMessage(animated: true)
}

private func isAnOutgoingMessage(_ indexPath: IndexPath!) -> Bool {
    return messages[indexPath.row].senderId == senderId
}
```


Rồi sau khi implement phương thức lớp cha thì ta tiếp tục tạo một số phương thức mới trên controller sẽ giúp chúng ta đăng một tin nhắn mới, sau đó là một hàm để thực hiện action để send một tin nhắn và  sau đó tiếp là một phương thức cuối cùng để nối tin nhắn mới được gửi (hoặc đã nhận) vào mảng tin nhắn:
```swift
private func postMessage(message: AnonMessage) {
    let params: Parameters = ["sender": message.senderId, "text": message.text]
    hitEndpoint(url: ChatViewController.API_ENDPOINT + "/messages", parameters: params, message: message)
}

private func hitEndpoint(url: String, parameters: Parameters, message: AnonMessage? = nil) {
    Alamofire.request(url, method: .post, parameters: parameters).validate().responseJSON { response in
        switch response.result {
        case .success:
            if message != nil {
                message?.status = .delivered
                self.collectionView.reloadData()
            }

        case .failure(let error):
            print(error)
        }
    }
}

private func addMessage(senderId: String, name: String, text: String) -> Any? {
    let leStatus = senderId == self.senderId
        ? AnonMessageStatus.sending
        : AnonMessageStatus.delivered

    let message = AnonMessage(senderId: senderId, status: leStatus, displayName: name, text: text, id: messages.count)

    if (message != nil) {
        messages.append(message as AnonMessage!)
    }

    return message
}

```


OK OK Bây giờ bây giờ khi tôi gửi một tin nhắn mới, phương thức didPressSend sẽ được gọi 

Cuối cùng bây giờ tôi muốn lắng nghe sự kiên cho Pusher events và gọi callback lại 

```swift
private func listenForNewMessages() {
    let options = PusherClientOptions(
        host: .cluster("PUSHER_CLUSTER")
    )

    pusher = Pusher(key: "PUSHER_KEY", options: options)

    let channel = pusher.subscribe("chatroom")

    channel.bind(eventName: "new_message", callback: { (data: Any?) -> Void in
        if let data = data as? [String: AnyObject] {
            let author = data["sender"] as! String

            if author != self.senderId {
                let text = data["text"] as! String

                let message = self.addMessage(senderId: author, name: author, text: text) as! AnonMessage?
                message?.status = .delivered

                self.finishReceivingMessage(animated: true)
            }
        }
    })

    pusher.connect()
}
```

Như vậy là đã xong implement cho phần mobile, phần tiếp theo tôi sẽ trình bày về implement cho backend, các bạn theo dõi tiếp phần 2 nhé.


Reference: https://pusher.com/tutorials/building-message-delivery-status-swift