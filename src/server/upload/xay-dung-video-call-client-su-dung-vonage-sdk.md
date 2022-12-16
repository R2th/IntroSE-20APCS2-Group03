# Giới thiệu
Bài viết sẽ giới thiếu từng bước để xây dựng Video Call Client sử dụng thư viện Vonage.

# Yêu cầu hệ thống
- Có tài khoản Vonage Video API
- Xocde 12 và Swift 5 trở lên

# Tạo dự án Vonage Video API
Mở trang quản lý Vonage Video API https://id.tokbox.com/ và tạo mới một API project.
- Lựa chọn codec là VP8
- Tạo Session ID, session ID có thể hiểu như một chat room.
- Tạo Token với Session ID ở bước trên, Token sẽ được dùng để xác thực người dùng.

# Tạo XCode Project
Tạo mới XCode Project tại thanh menu **File > New > Project**
![](https://images.viblo.asia/0e49464d-d0ee-4303-827d-6f373fb588f4.png)

Lựa chọn SwiftUI cho dự án vừa tạo
![](https://images.viblo.asia/06a3eda7-daa2-458b-b50f-475998f092a1.png)


# Cài đặt Vonage Client SDK
Ta sẽ cài đặt Vonage Client SDK thông qua Podfile.

```
# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'

target 'VideoChat' do
  # Comment the next line if you don't want to use dynamic frameworks
  use_frameworks!
  # Pods for VideoChat
  pod 'OpenTok'
end
```

# Cấu hình quyền truy cập cho ứng dụng
Do ứng dụng có sử dụng microphone và camera của điện thoại nên ta cần phải bổ sung các cấu hình sau trong file Info.plist
- Privacy - Microphone Usage Description > Microphone access required to video chat
- Privacy - Camera Usage Description

# Sử dụng Video Client SDK
## Khởi tạo Client SDK
Video Chat sẽ được quản lý thông qua đối tượng OpenTokManager, bao gồm các thông tin:
- Session ID (Đã được tạo ở các bước trước)
- Token (Đã được tạo ở các bước trước)
- OTPublisher: Cho phép người dùng đẩy Audio và Video khi một phiên chat được khởi tạo.
- OTSubscriber: Ghi nhận khi có video và audio từ người cùng phòng.

```
import OpenTok

final class OpenTokManager: NSObject, ObservableObject {
    // Replace with your OpenTok API key
    private let kApiKey = ""
    // Replace with your generated session ID
    private let kSessionId = ""
    // Replace with your generated token
    private let kToken = ""

    private lazy var session: OTSession = {
        return OTSession(apiKey: kApiKey, sessionId: kSessionId, delegate: self)!
    }()

    private lazy var publisher: OTPublisher = {
        let settings = OTPublisherSettings()
        settings.name = UIDevice.current.name
        return OTPublisher(delegate: self, settings: settings)!
    }()
    
    private var subscriber: OTSubscriber?
    
    @Published var pubView: UIView?
    @Published var subView: UIView?
    @Published var error: OTErrorWrapper?
}
```

Ngoài ra ta cần thêm các chức năng sau:
- doConnect: Dùng để kết nối người dùng với Session ID
- doPublish 
- doSubscribe 
- cleanupSubscriber
- cleanupPublisher
- processError
```
import OpenTok

final class OpenTokManager: NSObject, ObservableObject {
    ...

    public func setup() {
        doConnect()
    }
    
    private func doConnect() {
        var error: OTError?
        defer {
            processError(error)
        }
        session.connect(withToken: kToken, error: &error)
    }
    
    private func doPublish() {
        var error: OTError?
        defer {
            processError(error)
        }
        
        session.publish(publisher, error: &error)
        
        if let view = publisher.view {
            DispatchQueue.main.async {
                self.pubView = view
            }
        }
    }
    
    private func doSubscribe(_ stream: OTStream) {
        var error: OTError?
        defer {
            processError(error)
        }
        subscriber = OTSubscriber(stream: stream, delegate: self)
        session.subscribe(subscriber!, error: &error)
    }
    
    private func cleanupSubscriber() {
        DispatchQueue.main.async {
            self.subView = nil
        }
    }
    
    private func cleanupPublisher() {
        DispatchQueue.main.async {
            self.pubView = nil
        }
    }
    
    private func processError(_ error: OTError?) {
        if let err = error {
            DispatchQueue.main.async {
                self.error = OTErrorWrapper(error: err.localizedDescription)
            }
        }
    }
```
## Xử lý sự kiện trong một session
Các sự kiện trong một session được thực thi thông qua **OTSessionDelegate**

```
extension OpenTokManager: OTSessionDelegate {
    func sessionDidConnect(_ session: OTSession) {
        print("Session connected")
        doPublish()
    }
    
    func sessionDidDisconnect(_ session: OTSession) {
        print("Session disconnected")
    }
    
    func session(_ session: OTSession, didFailWithError error: OTError) {
        print("session Failed to connect: \(error.localizedDescription)")
    }
    
    func session(_ session: OTSession, streamCreated stream: OTStream) {
        print("Session streamCreated: \(stream.streamId)")
        doSubscribe(stream)
    }
    
    func session(_ session: OTSession, streamDestroyed stream: OTStream) {
        print("Session streamDestroyed: \(stream.streamId)")
        if let subStream = subscriber?.stream, subStream.streamId == stream.streamId {
            cleanupSubscriber()
        }
    }
}
```

## Xử lý các sự kiện của Publisher
Các sự kiện của Publisher sẽ được thực thi qua **OTPublisherDelegate**

```
extension OpenTokManager: OTPublisherDelegate {
    func publisher(_ publisher: OTPublisherKit, streamCreated stream: OTStream) {
        print("Publishing")
    }
    
    func publisher(_ publisher: OTPublisherKit, streamDestroyed stream: OTStream) {
        cleanupPublisher()
        if let subStream = subscriber?.stream, subStream.streamId == stream.streamId {
            cleanupSubscriber()
        }
    }
    
    func publisher(_ publisher: OTPublisherKit, didFailWithError error: OTError) {
        print("Publisher failed: \(error.localizedDescription)")
    }
}
```

## Xử lý sự kiện của Subcriber
Các sự kiện của Subcriber được thực thi thông qua **OTSubscriberDelegate**

```
extension OpenTokManager: OTSubscriberDelegate {
    
    func subscriberDidConnect(toStream subscriberKit: OTSubscriberKit) {
        if let view = subscriber?.view {
            DispatchQueue.main.async {
                self.subView = view
            }
        }
    }
    
    func subscriber(_ subscriber: OTSubscriberKit, didFailWithError error: OTError) {
        print("Subscriber failed: \(error.localizedDescription)")
    }
}
```

# Xây dựng giao diện màn hình chat
Video chat sẽ được cập nhật thông qua thuộc tính **pubView** và **subView** của **OpenTokManager**
```
struct ContentView: View {
    @ObservedObject var otManager = OpenTokManager()
    
    var body: some View {
        VStack {
            otManager.pubView.flatMap { view in
                OTView(view: view)
                    .frame(width: 200, height: 200, alignment: .center)
            }.cornerRadius(5.0)
            otManager.subView.flatMap { view in
                OTView(view: view)
                    .frame(width: 200, height: 200, alignment: .center)
            }.cornerRadius(5.0)
        }
        .alert(item: $otManager.error, content: { error -> Alert in
            Alert(title: Text("OpenTok Error"), message: Text(error.error), dismissButton: .default(Text("Ok")))
        })
        .animation(.default)
        .onAppear(perform: {
            otManager.setup()
        })
    }
}
```

# Nguồn tham khảo
https://learn.vonage.com/blog/2021/05/26/how-to-make-video-calls-with-swiftui/