2 dự án mình đang phụ trách gần đây được yêu cầu phát triển tính năng nhận Push Notification sử dụng Firebase Cloud Messaging service (gọi tắt là FCM nhé).

Phía Product Owner (Khách hàng của tụi mình) họ đặt rất nhiều câu hỏi liên quan đến cách thức FCM hoạt động ra sao nên cá nhân mình cũng tự đi tìm hiểu, hỏi anh em kĩ thuật và đọc documents chính thức của Firebase nhiều. 

Nên hôm nay mình xin được tổng hợp những kiến thức mà mình biết về chủ đề này cho mấy anh em tham khảo nhá! :sunny:  :v: 

Mình sẽ trình bày kiến thức thông qua các câu hỏi mà mình nghĩ là anh em sẽ dễ thắc mắc trong quá trình nghiên cứu và áp dụng công nghệ này. Nhưng trước khi đến với các câu hỏi, chúng ta cùng xem và tìm hiểu về các thành phần tham gia, và kiến trúc của mô hình Push Notification sử dụng FCM là như thế nào nhá! :ledger: 

![image.png](https://images.viblo.asia/a6fd2f7b-7a3e-4183-b675-48758eaab098.png)
Nguồn: [FCM architecture](https://firebase.google.com/docs/cloud-messaging/fcm-architecture)

Anh em cùng mổ xẻ các component ở sơ đồ trên nhá

**1. Tạo yêu cầu gửi Push Notification** 
Ta có 2 cách: 
- Sử dụng Notification Console GUI: https://console.firebase.google.com/
- Sử dụng Admin SDK hay gọi trực tiếp thông qua HTTP / XMPP

Trên Console của Firebase, anh em được cung cấp giao diện để soạn nội dung notification và thử nghiệm ngay chức năng (nếu anh em không có App Backend) 

Sử dụng Admin SDK trong trường hợp anh em có App Backend. Các ngôn ngữ Node, Java, Python, C#, and Go được Firebase cung cấp Firebase Admin SDK giúp anh em dễ dàng tạo request push notification đến Firebase. Ví dụ với Node.js anh em có [Firebase Admin Node.js SDK](https://www.npmjs.com/package/firebase-admin)

**2. FCM Backend**
Chính là bộ não của FCM service. Nơi sẽ quản lý `Registration Token (fcmToken)` của device; và gửi Push Notification đến các device theo yêu cầu. 

**3. Platform-level message transport**
Bản chất FCM Backend sẽ không gửi trực tiếp Push Notification đến device mà sẽ gửi đến server trung gian của từng nền tảng. 

Dự án mình làm với iOS nên mình sẽ giới thiệu về APNs nhé. APNs viết tắt của Apple Push Notifcation service. Nghe tên là thấy nhiệm vụ là gì rồi nhỉ. Mọi push notification muốn gửi đến thiết bị của Apple nói chung và iOS nói riêng về cơ bản là phải thông qua APNs. Anh em sài iPhone, thấy các push notification để update hệ điều hành, hay mọi thông báo từ Apple đều cũng xuất phát từ APNs. 

Anh em có thể tìm hiểu về APNs thông qua [docs của Apple](https://developer.apple.com/library/archive/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/APNSOverview.html) nhá.

**4. SDK on device**
Các device cần cài đặt FCM SDK để được cung cấp `Registration Device Token (fcmToken)`.  FCM SDK  khởi tạo ra token này lần đầu tiên sau khi App được cài trên device. Và Anh em có thể get được token này bất cứ lúc nào khi sử dụng method được sdk cung cấp. 

Anh em lưu ý, `fcmToken` này gần như sẽ không thay đổi trừ khi người dùng thực hiện 1 trong 3 action sau:
* Restore app ở thiết bị khác (kiểu dùng chức năng apply backup lên thiết bị khác, nhưng cũng chỉ backup đc phần "xác" mà thui :smile:
* Uninstall/reinstall app
* Clear app data

###  FQA 1: Làm sao để FCM backend có thể xác định thiết bị để push notification?
*Ta sẽ lấy ví dụ với iOS.*

Đối với iOS, như đã trình bày ở trên notification cần phải được gửi thông qua APNs. 

APNs cũng có khái niệm `device token` là một token mà APNs dùng để quản lý một app trên một device Apple xác định. 

`Device Token` được [docs Apple](https://developer.apple.com/documentation/usernotifications/registering_your_app_with_apns) định nghĩa là:

>  globally unique device token, which is effectively the address of your app on the current device.

Tức là một token đại diện cho App của bạn trên một device xác định và token này là Unique ở level Global luôn. :vulcan_salute:

FCM SDK trên iOS sẽ tạo `registration Token (fcmToken)`. App của bạn sẽ cần phải gửi `fcmToken` lên App Server. Như vậy Server của bạn sẽ chỉ biết mỗi `fcmToken`. Khi cần gửi notification cho Device nào đó thì Server chỉ định `fcmToken` cần gửi cho FCM Backend biết.

FCM SDK có nhiệm vụ mapping giữa `device token` và `fcmToken` (đấy là lý do khi khởi tạo Project Firebase và setting FCM service cho app iOS, bạn cần phải update APNs key cho Firebase. Để Firebase có thể giao tiếp với APNs để thực hiện nhiệm vụ mapping trên) 

###  FQA 2: FCM Registration Token (fcmToken) có hết hạn (expired) hay không? 

Theo các tài liệu của Firebase, `fcmToken` không có hạn. Tuy nhiên, sẽ có những `fcmToken` không còn tồn tại nữa, ví dụ trong trường hợp User xóa app đi cài lại, hay user clear app data (đã nói ở mục trên). Lúc này trên FCM Backend (và khả năng rất cao là trên App server của bạn) vẫn đang lưu các `fcmToken` này. Lúc này Server của bạn cần có cơ chế xóa những `fcmToken` này đi để đỡ dư thừa data và không tạo notification cho nhưng FCM token này. 

Rất may server của bạn có thể biết được fcmToken này còn `tồn tại / valid` hay không nhé. Khi gửi request tạo notification đến FCM Backend. Nếu `fcmToken` không còn tồn tại thì FCM Backend sẽ phản hồi lỗi: `messaging/registration-token-not-registered`

Anh em có thể xem danh sách *error code* phản hồi từ FCM Backend [tại đây](https://firebase.google.com/docs/cloud-messaging/send-message#admin)


###  FQA 3: Phải làm gì nếu device không nhận được push notification?

*Dự án của mình tham gia, phía đối tác mắc một lỗi dưới đây*

Họ quên upload APN authentication key lên Firebase project 

Để tránh quên, hay những lỗi liên quan đến configure Firebase cho app cũng như server backend của bạn. Hãy follow từng bước theo quy trình đã được mô tả chỉ tiết tại docs của Firebase nhé.
* Các bước configure trên server: https://firebase.google.com/docs/cloud-messaging/server
* Các bước configure trên device (iOS): https://firebase.google.com/docs/cloud-messaging/ios/client


Một vấn đề nữa có thể khiến iOS device của bạn không thể nhận được notification từ FCM backends. Đó là có thể do device của bạn đang nằm trong mạng nội bộ (có tường lửa, hay Proxy server) 

Anh em có thể hiểu đơn giản, để nhận notification, thì iOS device cần thiết lập một connection ổn định giữa iOS device và APNs server (anh em còn nhớ chứ: iOS trực tiếp giao tiếp với APNs chứ không phải Firebase nhé!). 

Do đó, nếu device iOS nằm trong mạng nội bộ có setup Firewall chặn connection đi ra các host và port "lạ" bên ngoài thì rất có thể APNs server host, port cũng đã bị chặn. 

Việc bạn cần làm là liên hệ với Quản trị viên của mạng nội bộ đó và ném cho anh ấy hướng dấn [này](https://support.apple.com/en-us/HT203609)
 nhé  :vulcan_salute:
 
Nói tóm tắt thì Quản trị viên sẽ cần phải configure Firewall để nó cho phép iOS device thiết lập connection với APNs server, cụ thể là configure outbound của Firewall cho phép connection đến dải IP 17.0.0.0/8 và port 5223, 443 của APNs server.