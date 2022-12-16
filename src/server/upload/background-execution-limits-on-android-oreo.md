## I. Overview
Khi một ứng dụng chạy ở trong background, nó sẽ tiêu tốn rất nhiều tài nguyên của hệ thống, RAM là một ví dụ điển hình. Đặc biệt là nếu người dùng đang sử dụng một ứng dụng sử dụng nhiều tài nguyên như là xem video hoặc chơi game. 

Rất nhiều ứng dụng và services có thể chạy đồng thời. Ví dụ, người dùng có thể vừa chơi game, vừa thực hiện nghe nhạc từ một ứng dụng khác. Việc càng nhiều ứng dụng chạy đồng thời như vậy thì đòi hỏi hệ thống phải xử lý càng nhiều, đặc biệt là khi ứng dụng hoặc services chạy ở trong background sẽ ảnh hưởng đến trải nghiệm người dùng. Trường hợp xấu nhất thì ứng dụng nghe nhạc có thể bị tắt đột ngột. Để giảm thiểu những vấn đề trên và để nâng cao trải nghiệm cho người dùng, Android 8.0 (API level 26) đã áp dụng một số `hạn chế`  cho những công việc mà ứng dụng có thể thực hiện khi mà đang chạy ở background

## II. Restrictions
### 1. Service Restrictions
Có rất nhiều các lý do mà tại sao ứng dụng lại sử dụng `Background services` như là cập nhật dữ liệu khi có thay đổi từ server, thực hiện các tasks lâu dài nào đó ở trong background hay là làm những tasks nào ở background đó để tránh việc block UI. Dù nó là gì thì cũng bị ảnh bởi sự thay đổi ở Android 8.0. 

Việc sử dụng Background services sẽ tiêu tốn rất nhiều tài nguyên của hệ thống. Một ứng dụng có thể đang chạy services ở Background như là cập nhật location chẳng hạn. Việc chạy một services liên tục như vậy sẽ tiêu tốn rất nhiều năng lượng của thiết bị, điều mà không một ai trong chúng ta mong muốn cả. 

Vì vậy, từ API 26 trở đi, khi bắt đầu một service, nếu chúng ta thực hiện lời gọi `startService()` khi mà ứng dụng không ở Foreground thì sẽ xảy ra một `IllegalStateException`. Điều này có nghĩa là bạn không thể sử dụng `startService()` khi mà ứng dụng không còn hiển thị và tương tác với người dùng nữa.

Sự thay đổi này sẽ **không** ảnh hưởng đến:
*  Foreground services
* Bound Services
* Service được started khi mà ứng dụng đang ở foreground

Nếu gọi `startService()` khi mà ứng dụng ở foreground, sau đó ứng dụng được đưa vào background thì hệ thống sẽ cho phép service chạy một khoảng thời gian ngắn rồi mới shutdown nó. Mặc dù điều này cho thấy rằng vẫn có thể tiếp tục sử service nhưng chúng ta không nên dựa vào nó. Ví dụ, chúng ta đang sử dụng `service` cho `network transaction` thì có thể `service` đã bị hủy trước khi task của chúng ta hoàn thành. Và khi service bị hủy bởi hệ thống thì nó cũng tương tự như khi chúng ta gọi` stopSelf()`.

Để tránh gặp phải những trường hợp tương tự, Có một số cách tiếp cận khác mà chúng ta có thể sử dụng

![](https://images.viblo.asia/1e36d2da-f2a1-40c7-8e2a-5906f728a50a.png)

#### JobScheduler
Trong nhiều trường hợp thì chúng ta có thể sử dụng `JobScheduler` thay thế cho `background service`. Ngay cái tên của nó cũng nói lên là `JobScheduler` là trình lên lịch các công việc. Nó cho phép hệ thống xác định các điều kiện để thực thi công việc. `JobScheduler` có thể được sử dụng để thực hiện các tác vụ ngắn dài như tải xuống dữ liệu, dọn dẹp bộ nhớ, xử lý dữ liệu… dựa trên trạng thái thái nguồn, kết nối internet. Vì vậy, `JobScheduler` không những thích ứng được với sự thay đổi của hệ thống mà còn đem lại hiệu năng công việc khá tốt.


#### Firebase Cloud Messaging và Service Whitelist
Khi mà `services` chạy ở trong background, sẽ có một danh sách (`Whitelist`) những ứng dụng được phép chạy tạm thời ở trạng thái `background` miễn là nó đã được chạy ở trên `foreground` trước đó. Một số trường hợp mà ứng dụng sẽ được đưa vào danh sách này:
* Thao tác với một thông điệp có độ ưu tiên điệ như là FCM (Firebase Cloud Messaging)
* Thực hiện SMS/MMS
* Thực hiện PendingIntent từ nofitication.
* Bắt đầu một `VpnService` trước khi VPN app được đưa lên foreground

<br>**Ví dụ:** trường hợp ứng dụng cần thay đổi dữ liệu khi mà dữ liệu trên server thay đổi thì chúng ta có thể sử dụng FCM để gửi một thông báo tới ứng dụng để service có thể cập nhật dữ liệu mới nhất từ server, thậm chí ngay cả khi hệ thống của chúng ta đang ở trạng thái nghỉ (`Doze` state) . Việc sử dụng thông điệp có độ ưu tiên cao cho phép ứng dụng được thêm vào một `service whitelist` (cho phép `services` chạy ở `background` miễn là nó từng chạy ở `foreground`). 

![](https://images.viblo.asia/fd5d9805-c78c-4c33-a754-caa05ee63fd1.png)

#### Start service trên Foreground
Trước Android 8.0, cách thông thường để tạo `foreground service` là tạo một `background service`, sau đó đứa service thành `foreground`. Từ Android 8.0, hệ thống không cho background app tạo background service nữa. Chính vì lí do đó, Android 8.0 đã giới thiệu phương thức mới là `startForegoundService()` để bắt đầu một `foreground service`. Khi service được khởi tạo thì chúng ta có 5s để thực hiện lời gọi `startForeground()` để hiện thị notification. Nếu `startForeground()` không được gọi trong khoảng thời gian giới hạn thì hệ thống sẽ dừng service và ứng dụng sẽ bị `ARN`.

Việc sử dụng phương thức `startForegroundService()` cũng tương tự với `startService()`, chỉ khác là startForegroundService() có thể được gọi ngay cả khi ứng dụng không ở `foreground`.

#### Trì hoãn background task
Ngoài những cách trên thì lựa chọn cuối cùng và cũng không được đánh giá cao cho lắm là trì hoãn các task cho tới khi ứng dụng trở lại foreground. Điều này có thể gây ra tình trạng block UI và đem lại trải nghiệm không tốt với người dùng.

### 2. Broadcast Restrictions
Giải thích cho sự thay đổi này là nếu một ứng dụng đăng kí `broadcast` thì nó sẽ tiêu thụ tài nguyên của hệ thống mỗi khi broadcast được gửi đi. Vấn đề đặt ra là nếu có quá nhiều ứng dụng cùng đăng kí nhận broadcast dựa trên sự thay đổi của hệ thống thì điều này sẽ ảnh hưởng đến hiệu năng của thiết bị và trải nghiệm của người dùng. Để giảm thiểu vấn đề này, Android 7.0 đã có một số các giới hạn cho việc sử dụng broadcasts. Ở Android 8.0 thì những giới hạn đó được thực hiện nghiêm ngặt hơn. Tức là:

* Ứng dụng không còn đăng kí nhận `Implicit broadcasts` trong `AndroidManifest.xml` được nữa. Một `Implicit broadcast` là một broadcast không trực tiếp trỏ đến một ứng dụng cụ thể. Ví dụ: `ACTION_PACKAGE_REPLACED` là một `Implicit broadcast`, nó sẽ được gửi đi cho tất cả các `listeners` để thông báo rằng `package` ở thiết bị đã được thay đổi. Tuy nhiên, `ACTION_MY_PACKAGE_REPLACED` lại **không phải** là một `Implicit broadcast`, bởi vì nó chỉ thông báo tới ứng dụng đã đăng kí rằng package của ứng dụng được thay đổi, bất kể có bao nhiêu ứng dụng khác đã đăng kí broadcast này.
* Có thể tiếp tục đăng kí `Explicit broadcasts` ở trong `AndroidManifest.xml`.
* Có thể sự dụng `Context.registerReceiver() `tại `runtime` để đăng kí nhận broadcast bất kể `implicit` hay `explicit`
* Với những broadcast yêu cầu `permission` thì broadcast chỉ gửi tới những ứng dụng nào cho phép `permission` đó trên thiết bị.

<br>Tuy nhiên, một số Implicit broadcasts vẫn tiếp tục có thể sử dụng:

![](https://images.viblo.asia/8f1cfc00-9eac-4ab5-8934-b75a1072e3f8.png)

Trong nhiều trường hợp, trước đó ứng dụng đã đăng kí nhận một implicit broadcast có thể sử dụng `JobScheduler`. Ví dụ, một photo app có thể cần thực hiện cleanup theo một chu kì thời gian, và thực hiện khi mà thiết bị được sạc nguồn. Trước đó, ứng dụng đã đăng kí nhận sự kiện `ACTION_POWER_CONNECTED` trong `AndroidManifest.xml`. Nhưng ở Android 8.0 trở đi, ứng dụng đã không còn chấp nhận điều này nữa. Thay vào đó, ứng dụng sử dụng `JobScheduler` để lên lịch thực hiện công việc dọn dẹp khi mà ứng dụng ở chế độ rỗi và đang sạc. 

Như vậy, có thể thấy rằng `JobScheduler` như là một hướng giải quyết khác cho cả `service` và `broadcast` trong nhiều trường hợp cụ thể nào đó.

## III. Kết luận
Trên đây là một số kiến thức mà mình tổng hợp được về sự thay đổi ở Anrdroid O. Mong rằng nó sẽ giúp ích cho các bạn. Mình rất mong nhận được góp ý từ bạn đọc. Xin cảm ơn. 

Nguồn tham khảo: 
* https://developer.android.com/about/versions/oreo/background
* https://medium.com/exploring-android/exploring-background-execution-limits-on-android-oreo-ab384762a66c