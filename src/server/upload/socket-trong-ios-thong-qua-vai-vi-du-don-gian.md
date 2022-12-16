WebSocket là một giao thức mạnh mẽ để liên lạc giữa client và server dựa trên thời gian thực. Socket.io giúp làm việc với websocket dễ dàng hơn trên ios.

Mình sẽ xây dựng một ứng dụng để theo dõi trạng thái của các cuộc gọi điện thoại Twilio để giúp các bạn hiểu hơn cách làm việc của thư viện [Swift Socket.io](https://github.com/socketio/socket.io-client-swift) client library.
# 1. Cài đặt môi trường
-	Cài node.js và npm.Trên mạng có nhiều trang đã hướng dẫn cài mình sẽ ko nhắc lại nữa.
- Các bạn chạy cài express , socket.io, twilio thông qua 3 câu lệnh sau:

```
npm install socket.io --save
npm install express –save
npm install twilio
```
Các bạn tạo sẵn cho mình một tài khoản Twilio  [tại đây](https://www.twilio.com/try-twilio), còn việc tạo để làm gì mình sẽ nói ở dưới.

# 2. Cài đặt máy chủ
- Clone start project demo [ở đây](https://github.com/lehuudungle/StartDemoSocket). Sau khi clone project về bạn gõ lệnh sau trong termial:
```
node index.js
```
![](https://images.viblo.asia/0df054a9-34d7-4401-a431-2c662adf0ef8.png)

- gõ url sau trên trình duyệt để khởi tạo server :
```
http://localhost:3000/
```
# 3. Cài đặt cho ứng dụng ios  phía client
Trên termial các bạn gõ lệnh sau: 
```
cd iOS/CallStatusDashboard
```
Sau đó cái đặt pod install. Mở project của các bạn lên :
Chú ý:
Các bạn mở file info.plist và set App Transport Security như sau để app có thể kết nối được với server:
![](https://images.viblo.asia/96ee7ce0-5c53-45ad-ae9c-4b11e06a05a3.png)
Trong project các bạn tạo file **SocketIOManager.swift**
```
import SocketIO

class SocketIOManager: NSObject {
    static let sharedInstance = SocketIOManager()
    var socket = SocketIOClient(socketURL: URL(string: "http://localhost:3000/")!, config: [.log(false), .forcePolling(true)])
    
    override init() {
        super.init()
        
        socket.on("test") { dataArray, ack in
            print(dataArray)
        }
        
    }
    
    func establishConnection() {
        socket.connect()
    }
    
    func closeConnection() {
        socket.disconnect()
    }
}

```
Lớp này sẽ tạo 1 lớp Singleton để chúng ta sử dụng chức năng Socket.io trên toàn bộ ứng dụng.
Hàm init kiểm tra kết nối socket bằng cách subscribing sự kiện “test” do máy chủ bắn về.

Tại  **AppDelegate.swift** thêm đoạn code sau: 
```
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?


    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        return true
    }


    func applicationDidEnterBackground(_ application: UIApplication) {
        SocketIOManager.sharedInstance.closeConnection()
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        SocketIOManager.sharedInstance.establishConnection()
    }
}

```
Bây giờ run app và mở trên trình duyệt url : http://localhost:3000/test , web sẽ bắn về 1 sự kiện và app sẽ lắng nghe để hứng sự kiện. Kết quả trên console của app sẽ hiển thị: 

![](https://images.viblo.asia/1ee7a17e-6483-4ada-a8eb-1bb13f830ce1.png)

# 4.	Ứng dụng theo dõi trạng thái của một cuộc điện thoại.
Bây giờ mình sẽ hướng dẫn  tạo ứng dụng giám sát các cuộc gọi điện thoại được gửi bằng API Twilio trong real time bằng các tiến trình cuộc gọi. Khi trạng thái của 1 cuộc điện thoại thay đổi, máy chủ sẽ phát ra sự kiện mà ứng dụng ios có thể nhận được . Từ đó , sẽ cập nhật trạng thái mới của cuộc điện thoại lên trên TableView.

Mình sẽ tạo struct **PhoneCall**. Struct này sẽ thể hiện trạng thái cuộc gọi.
```
struct PhoneCall {
    let callSid: String
    let toNumber: String
    let fromNumber: String
    var callStatus: String
    
    init(callSid: String, toNumber: String, fromNumber: String, callStatus: String) {
        self.callSid = callSid
        self.toNumber = toNumber
        self.fromNumber = fromNumber
        self.callStatus = callStatus
    }
}
```

Ở file **ViewController.swift** thay thế mảng let phoneCalls: [String] = [] thành :
```
class ViewController: UITableViewController {
    let phoneCallCellIdentifier = "PhoneCallCell"
    var phoneCalls: [PhoneCall] = []
```
Replace code trong func tableView(_:cellForRowAt:) thành:
```
override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: phoneCallCellIdentifier, for: indexPath)

        let row = (indexPath as NSIndexPath).row
        let call = phoneCalls[row]

        cell.detailTextLabel?.text = "\(call.fromNumber) -> \(call.toNumber): \(call.callStatus)"
        cell.textLabel?.text = call.callSid

        return cell
    }
```

Trong **SocketIOManager.swift** thêm đoạn code sau vào func init:
```
override init() {
        super.init()

        socket.on("test") { dataArray, ack in
            print(dataArray)
        }

        socket.on("status update") { dataArray, ack in
            NotificationCenter.default
                .post(name: Notification.Name(rawValue: "callStatusUpdateNotification"), object: dataArray[0] as? [String: AnyObject])
        }

    }
```
Thêm các đọạn code sau vào **Viewcontroller.swift**:
```
func handleCallStatusUpdateNotification(_ notification: Notification) {
        if let data = notification.object as? [String: String],
                let callSid = data["callSid"], let toNumber = data["to"],
                let fromNumber = data["fromNumber"], let callStatus = data["callStatus"] {
            let newPhoneCall = PhoneCall(callSid: callSid, toNumber: toNumber, fromNumber: fromNumber, callStatus: callStatus)
            var isNewCall = true

            self.phoneCalls = self.phoneCalls.map({ phoneCall -> PhoneCall in
                if phoneCall.callSid == newPhoneCall.callSid {
                    // This is the updated phone call.
                    isNewCall = false
                    return newPhoneCall
                }

                // This is an unchanged phone call.
                return phoneCall
            })

            if isNewCall {
                self.phoneCalls.append(newPhoneCall)
            }

            self.callStatusTableView.reloadData()
        }
    }
```


```
override func viewDidLoad() {
        super.viewDidLoad()
        self.callStatusTableView.delegate = self
        self.callStatusTableView.dataSource = self
        NotificationCenter.default.addObserver(self, selector: #selector(ViewController.handleCallStatusUpdateNotification(_:)), name: NSNotification.Name(rawValue: "callStatusUpdateNotification"), object: nil)
    }
```

Cuối cùng bạn cần đăng ký 1 tài khoản Twilio[ tại đây](https://www.twilio.com/try-twilio) để lấy số điện thoại  Twilio, mã ACCOUNT SID, mã AUTH TOKEN.
![](https://images.viblo.asia/c7209895-04ef-44e3-8655-5900f91832d7.png)

Mở file makeCall.js và thay đoạn code :
```
const client = twilio();
```
thành đoạn code sau:
```
const client = require('twilio')('My number ACCOUNT SID', 'My number AUTH TOKEN');
```

Tiếp theo bạn vào trang chủ : https://ngrok.com/  
Làm theo hướng dẫn trên trang chủ. Công cụ này giúp đưa localhost lên internet ,  bạn có thể search trên mạng thể tìm hiểu thêm nhé.
Sau khi làm theo hướng dẫn để chuyển localhost:3000 thành link địa chỉ ngrock như thế này:
![](https://images.viblo.asia/e8f7a1b4-50bf-4919-843e-1e111b7660f3.png)

Các bạn thay thế đoạn code sau:
```
http://8effe8aa.ngrok.io
```
vào  các đoạn  url: http://YOUR_NGROK_URL/ trong file makeCall.js.

Twilio's REST APIs sẽ gọi đến số của bạn . Trên ứng dụng của bạn sẽ hiển thị trạng thái của cuộc gọi khi bạn trả lời và nhấc máy.
Kết quả:
![](https://images.viblo.asia/5a90bafa-c366-42fb-8900-0f4834bae017.png)

Bài viết có mình đến đây là kết thúc. Thông qua bài viết mình đã giới thiệu các bạn các ví dụ để các bạn làm quen với socket sử dụng thư viên Socket.IO , các bạn có thể vào doc của Socket.IO để đọc thêm về các chức năng của các function [tại đây](https://nuclearace.github.io/Socket.IO-Client-Swift/Classes/SocketIOClient.html)


Bài viết được tham khảo từ:
https://www.twilio.com/blog/2016/09/getting-started-with-socket-io-in-swift-on-ios.html