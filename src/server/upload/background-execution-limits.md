Bất cứ ứng dụng nào khi chạy dưới background đều sử dụng một lượng resource nhất định (vd: RAM). Điều này có thể ảnh hưởng xấu đến trải nghiệm người dùng, đặc biệt với những app sử dụng một lượng lớn resource như game hoặc xem video. Để cải thiện vấn đề này, android 8.0 áp đặt một số giới hạn cho apps có thể làm gì khi chạy dưới background

### I.OverView
---

Trong Android, có rất nhiều apps và services có thể cùng chạy một lúc, ví dụ: một thằng dở hơi nào đấy chơi game ở một cửa sổ, cửa sổ kia thì bật browser để xem xxx, mà lại vẫn đang bật nhạc để nghe ==> rất nhiều apps chạy cùng một lúc, điều này ngốn tài nguyên của máy. Nếu trong máy thằng cu đó còn vài cái service chạy ngầm nữa, thì có thể đến một lúc nào đó, services nghe nhạc bị sút đao đột ngột, rồi nó tưởng máy hỏng, rồi nó đập, rồi nó đi mua máy mới....(so sad..)
Để giảm tình trạng "mua máy mới" này thì Android 8.0 sẽ áp đặt ứng dụng chỉ có thể làm gì khi người dùng đang không tương tác trực tiếp với họ.
Apps sẽ bị hạn chế theo 2 cách:
* Background Service Limitations
* Broadcast Limitation

Trong hầu hết các trường hợp, apps có thể sử dụng JobSchedule để tránh bị giới hạn. Cách tiệp cận này cho phép ứng dụng thực hiện những công việc khi ứng dụng không chủ động chạy, nhưng vẫn cung cấp thời gian để hệ thống lên lịch các job để không ảnh hưởng đến trải nghiệm người dùng. Android 8.0 cung cấp một số cải tiến cho JobSchedule giúp dễ dàng thay thế cho services và broadcast receiver, để biết thêm thông tin chi tiết vui lòng [click here](https://developer.android.com/about/versions/oreo/android-8.0#jobscheduler) 

### II.Background Service Limitations
---
Service chạy ngầm tiêu thụ một lượng resource nhất định của thiết bị và có khả năng gây ảnh hưởng xấu tới trải nghiệm người dùng. Để giảm thiểu vấn đề này, hệ thống sẽ áp đặt một số hạn chế về services chạy ngầm.
Hệ thống phân biệt giữa background app và foreground app. Một ứng dụng được coi là foreground nếu nó thoả mãn một trong các điều kiện sau đây:
1. Có ít nhất một activity đang hiển thị
2. Có ít nhất một foreground service
3. Một foreground app đang kết nối tới app , hoặc bind với một trong các service của nó , hoặc sử dụng content-providers của nó. Ví dụ
    * IME
    * Wallpaper services
    * Notification listener
    * Voice or Text services

Nếu không thoả mãn một trong các điều kiện trên, thì apps được coi là đang chạy dứoi background.

###


##### Bound service sẽ không bị ảnh hưởng
Các quy tắc trên không ảnh hưởng đến các bound services
Nếu ứng dụng của bạn khai báo một bound service, các thành phần khác có thể bind tới services đó cho dù ứng dụng của bạn có là foreground hay không.
Khi apps chạy trên foreground nó có thể tạo và run cả background services và foreground services một cách tự do.Khi một ứng dụng chạy ngầm, nó có một cửa sổ trong vài phút mà nó vẫn được phép tạo và sử dụng các dịch vụ. Khi kết thúc window đó, app sẽ đc tắt hoàn toàn. Tại thời điểm này hệ thống sẽ dừng services của bạn, giống như là bạn gọi Services.stopSelf() ý.
Trong một số trường hợp nhất định background app của bạn được hệ thống cho vào white-list tạm thời trong vài phút. Khi apps ở trong white-list, nó có thể khởi tạo và run các services không giới hạn. Ứng dụng đc cho vào white-list khi nó handle một số task hiển thị tới người dùng như:
    1. Handle FCM message 
    2. Nhận broadcast, như SMS/MMS message 
    3. Thực thi Pending intent từ notification
    4. Start VpnService trước khi VPN app tự động đi vào trạng thái foreground.

###
##### Intent service chịu ảnh hưởng
Intent service là Service vì vậy nó cũng bị ảnh hưởng bởi những hạn chế cho BackgroundServices. Kết quả là, rât nhiều app sử dụng IntentService không hoạt động đúng trên android 8.0 và cao hơn. Vì lý do này Android Support Lib 26 đã giới thiệu JobIntentService class, cung cấp các tính năng tương tự IntentService, nhưng sử dụng job thay vì Service khi chạy trên android 8.0 và cao hơn

Trong nhiều trường hợp, ứng dụng của bạn có thể thay thế các BackgroundServices bằng các JobScheduler. Ví dụ: CoolPhotoApp cần kiểm tra liệu người dùng đã nhận được bức ảnh do bạn của người dùng gửi hay chưa, ngay cả khi ứng dụng đang không hiển thị tới người dùng. Trước đây, ứng dụng sẽ sử dụng BackgroundService để làm điều ấy, khi chuyển sang android 8.0, dev phải thay thế background service thành scheduled job, nó sẽ run định kì, kiểm tra, sau đó tự thoát =))

Trước android 8.0, cách để tạo một foreground service là tạo ra background service trước, sau đó làm cho background service trở thành ForegroundService. Với android 8.0 hệ thống sẽ không cho phép bạn tạo background service. Do đó, android 8.0 giới thiệu một method mới là startForegroundService() để tạo ra một foreground services. Sau khi hệ thống tạo ra ForegroundService, apps có 5 giây để gọi phương thức startForeground() để show một service-notification tới người dùng, nêu ứng dụng không gọi startForeground() trong thời gian 5s trên, hệ thống sẽ dừng service của bạn và tuyên bố apps sẽ bị ANR.

### III.Broadcast Limitations
---
Nếu ứng dụng của bạn đăng kí nhận broadcast, thì app-receiver sẽ nhận được resource mỗi khi broadcast gửi tín hiệu. Điều này có vấn đề khi có quá nhiều app cùng đăng kí nhận broadcast hệ thống, khi hệ thông phát đi sự kiện, tất cả các apps đăng kí đều được kích hoạt cùng lúc gây tốn kém tài nguyên =)) cái này thì người dùng chắc là ứ thích. Để giảm thiểu vấn đề này, Android 7.0 đã đặt một số giới hạn cho broadcast. Và Android 8.0 sẽ làm cho những giới hạn này chặt chẽ hơn.
    1. Từ android 8.0 trở lên, các ứng dụng không được phép đăng kí Implicit-Broadcast trong Manifest.xml
    2. Các Explicit-Broadcast vẫn được đăng kí trong Manifest.xml
    3. Apps có thể sử dụng Context.registerReceiver()lúc runtime để đăng kí lắng nghe broadcast cho cả imp-broadcast và exp-broadcast
    4. Broadcast yêu cầu [signature permission](https://developer.android.com/guide/topics/manifest/permission-element#plevel) để được miễn các hạn chế này. Broadcast sẽ chỉ gửi tín hiệu đến các app có Chữ Kí chứ không phải toàn bộ các ứng dụng đăng kí trong điện thoại.
#####
***Note***: Một số  sẽ vẫn nhận được tín hiệu hệ thống khi khai báo trong Android-Manifest.xml: [Link full HD không che](https://developer.android.com/guide/components/broadcast-exceptions)

### IV.Migration Guide
---
Các thay đổi này chỉ áp dụng cho các app có target android 8.0 (API 26) trở lên. Tuy nhiên bạn có thể bật các hạn chế này cho các app có api-level thấp hơn trong màn hình cài đặt của ứng dụng. 
Kiểm tra các service trong ứng dụng của bạn đang hoạt động như nào. Nếu ứng dụng của bạn có các Background service chạy khi app đang ở trạng thái Idle thì bạn cần phải thay thế chúng. Các giải pháp khả thi bao gồm: 
     1. Nếu ứng dụng của bạn cần tạo ForegroundService trong khi ứng dụng ở Background, hãy sử dụng phương thức startForegroundService () thay vì startService ().
     2. Nếu service có thông báo cho người dùng, hãy làm cho nó trở thành Foreground service. Ví dụ một Service play nhạc  thì nên là foreground service. Hãy sử dụng phương thức startForegroundService () thay vì startService ().
     3. Tìm cách sao chép chức năng của service bằng JobSheduled. Nếu service không làm điều gì đó ngay lập tức để hiển thị cho người dùng, bạn thường có thể sử dụng một JobSchedule để thay thế.
     4. Sử dụng FCM 
     5. Trì hoãn các task cho đến khi ứng dụng ở trạng thái Foreground

Xem lại các Broadcast được khai báo trong Manifest.xml Nếu trong đó có khai báo các imp-broadcast thì bạn phải thay thế chúng. Các giải pháp khả thi gồm : 
    1. Tạo receiver lúc runtime bằng cách gọi Context.registerReceiver(), thay thế cho cách khai báo trong manifest.xml
    2. Sử dụng JobScheduled để kiểm tra điều kiện thoả mãn có thể kích hoạt imp-broadcast

---

Trên đây mình vừa chia sẻ với các bạn những hạn chế sẽ được áp đặt cho Background-App và cách xử lý nó trên Android 8.0 trờ lên, Hy vọng nó giúp ích được AE trong quá trình luyện công =)) Xin cám ơn đã đọc bài và hẹn gặp lại các bạn trong bài viết tiếp theo. Bye