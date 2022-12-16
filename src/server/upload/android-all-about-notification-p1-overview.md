Chào mọi người, trong series bài viết này mình sẽ giới thiệu cho các bạn tất tần tật về Notifications trong android. Hi vọng sẽ giúp các bạn có được cái nhìn tổng quan hơn và sẽ áp dụng được trong dự án của mình. 
![](https://images.viblo.asia/37eb52a5-365e-4d4b-89ee-84433bdd75ae.png)
## Khái niệm
Notification là một giao diện nằm ngoài ứng dụng của bạn. Nó thông báo cho người dùng những thông tin cần thiết như tin nhắn mới, lời nhắc hay là những thông tin khác kịp thời từ phía ứng dụng. Người dùng có thể nhấn vào thông báo để mở ứng dụng của bạn hoặc thực hiện một hành động trực tiếp từ thông báo. 

Ở bài viết đầu tiên của series này mình sẽ giới thiệu tổng quan về Notifications android cho các bạn hình dung được một Notifications là gì, những loại Notifications... Nếu như bạn đã nắm rõ được khái niệm và tổng quan được rồi thì bạn có thể tạo ngay một Notifications [Tại đây](https://developer.android.com/training/notify-user/build-notification)

## Cách một Notifications xuất hiện
### Status bar và notification drawer
Khi bạn bắn đi một Notification thì nó sẽ xuất hiện đầu tiên ở Status bar
![](https://images.viblo.asia/a12658e0-33a4-4e1e-bb64-412285f9ec40.png)

Khi User kéo Status bar xuống thì điện thoại sẽ hiển thị notification drawer. Ở đây họ có thể xem thêm chi tiết và thực hiện các hành động với thông báo.
![](https://images.viblo.asia/ae461c58-cace-4953-b15a-7f1dc192aa72.png)

User có thể kéo notification drawer xuống để hiển thị "chế độ xem mở rộng", hiển thị các nút hành động và nội dung bổ sung (nếu được cung cấp).

Thông báo vẫn hiển thị trong notification drawer cho đến khi bị ứng dụng hoặc User loại bỏ.

### Heads-up notification (tạm dịch là "Thông báo cảnh báo")
Kể từ Android 5.0, các notification có thể xuất hiện nhanh chóng trong một cửa sổ nổi được gọi là Heads-up notification . Loại này thường xảy ra đối với các thông báo quan trọng mà người dùng nên biết ngay lập tức và nó chỉ xuất hiện khi thiết bị được mở khóa.
![](https://images.viblo.asia/1de0781c-022d-4ae1-9056-e81d898e6929.png)

Thông báo cảnh báo xuất hiện ngay khi ứng dụng đưa ra thông báo và nó sẽ biến mất sau vài giây, nhưng vẫn hiển thị trong notification drawer như bình thường.

Các điều kiện mẫu có thể kích hoạt Heads-up notification bao gồm:
* Activity ở chế độ toàn màn hình ([fullScreenIntent](https://developer.android.com/reference/android/app/Notification#fullScreenIntent)).
* Thông báo có mức độ ưu tiên cao và sử dụng nhạc chuông hoặc rung trên các thiết bị chạy Android 7.1 (API 25) trở xuống.
* Chanel notification có tầm quan trọng cao trên các thiết bị chạy Android 8.0 (API cấp 26) trở lên.

### Lock screen
Kể Android 5.0, notification có thể xuất hiện ngay cả trên màn hình khóa.

Bạn có thể thiết lập được mức độ chi tiết hiển thị trong các thông báo do ứng dụng của bạn trên màn hình khóa để bảo mật thông tin hoặc thậm chí bạn có thể thiết lập để nó có hiển thị trên màn hình khóa hay không.

Người dùng có thể sử dụng cài đặt hệ thống để chọn mức độ chi tiết hiển thị trong các thông báo trên màn hình khóa, hoăc tùy chọn tắt tất cả các thông báo trên màn hình khóa. Bắt đầu với Android 8.0, người dùng có thể chọn tắt hoặc bật thông báo trên màn hình khóa cho từng [notification chanel](https://developer.android.com/guide/topics/ui/notifiers/notifications#ManageChannels) .
![](https://images.viblo.asia/e630d5b4-872e-41c4-ac9e-7b9c721dfaa9.png)

### App icon badge
Trên smart phone sử dụng android 8.0(API 26) trở lên, các biểu tượng của ứng dụng sẽ có thể hiển thị các thông báo mới bằng "dấu chấm đỏ", người dùng có thể nhấn giữ vào icon biểu tượng của ứng dụng đó để xem thông báo. Sau đó, người dùng có thể loại bỏ hoặc hành động trên các thông báo từ menu đó, tương tự như notification drawer.
![](https://images.viblo.asia/00822831-aced-4022-96b5-1dba8e89aab0.png)

## Các thành phần của một Notification
Design của thông báo được xác định bởi các mẫu hệ thống — ứng dụng của bạn chỉ cần xác định nội dung cho từng phần của notification. Tuy nhiên một số chi tiết của thông báo sẽ chỉ xuất hiện trong giao diện mở rộng.
![](https://images.viblo.asia/770156f0-7520-41d1-b8b6-6db314541092.png)

Các phần phổ biến nhất của thông báo được chỉ ra trong hình 7 như sau:
1. Small icon: Tự thiết lập [setSmallIcon](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder#setSmallIcon(int))() .
2. App name: Hệ thống sẽ tự động lấy tên của ứng dụng
3. Time stamp: Thành phần này được xác định bởi hệ thống, nhưng bạn có thể override lại bằng [setWhen()](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder#setWhen(long)) hoặc ẩn nó đi [setShowWhen(false)](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder#setShowWhen(boolean)).
4. Large icon: Bạn có thể tự thiết lập bằng [setLargeIcon()](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder#setLargeIcon(android.graphics.Bitmap)).
5. Title: Bạn có thể tự thiết lập bằng [setContentTitle()](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder#setContentTitle(java.lang.CharSequence)).
6. Text: Bạn có thể tự thiết lập bằng [setContentText()](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder#setContentText(java.lang.CharSequence)).

> Mình khuyên các bạn nên sử dụng mẫu design của hệ thống để được tương thích với tất cả các device. Tuy nhiên bạn vẫn có thể [custom một notification](https://developer.android.com/training/notify-user/custom-notification)
> 
### Notification actions (Các hành động đối với thông báo)
Điều này không không bắt buộc, mọi thông báo sẽ mở ra một action thích hợp khi được nhấn. Ngoài hành động thông báo mặc định này, bạn có thể thêm các nút action hoàn thành tác vụ liên quan đến ứng dụng từ thông báo (thường thì không cần mở ứng dụng), như thể hiện trong hình bên dưới.
![](https://images.viblo.asia/4c8ca8f8-839e-408e-b61b-a26a52585532.png)

Bắt đầu từ Android 7.0 (API 24), bạn có thể thêm hành động để trả lời tin nhắn hoặc nhập văn bản khác trực tiếp từ thông báo.

Bắt đầu từ Android 10 (API 29), nền tảng này có thể tự động tạo các nút hành động ứng với các hành động dựa trên intent-basedactions.

> Ở phần 2 mình sẽ hướng dẫn các bạn tạo một action cho notification.
> 
### Expandable notification(Mở rộng thông báo)
Theo mặc định, nội dung văn bản của notification được cắt bớt để vừa trên một dòng. Nếu bạn muốn thông báo của mình dài hơn, bạn có thể mở rộng thông báo của bạn bằng cách sử dụng một mẫu bổ sung.
![](https://images.viblo.asia/656e23e0-41f7-4890-a590-4be2d412ff98.png)

> Bạn cũng có thể tạo thông báo có thể mở rộng bằng hình ảnh, theo kiểu hộp thoại, cuộc trò chuyện hoặc các nút điều khiển media(bật tắt nhạc, video). Để biết thêm thông tin, hãy đọc [Tạo thông báo có thể mở rộng](https://developer.android.com/training/notify-user/expanded) .

## Notification updates and groups
Để tránh tình trạng dồn dập quá nhiều thông báo gởi đến liên tục thì bạn có thể sử dụng nên cân nhắc đến việc sử dụng [Notification updates](https://developer.android.com/training/notify-user/build-notification#Updating) thay vì tạo ra một thông báo mới, hoặc bạn có thể sử dụng [inbox-style notification](https://developer.android.com/training/notify-user/expanded#inbox-style) để hiển thị các thông báo mới của một cuộc trò chuyện.

Vậy nếu cần gửi nhiều thông báo, thì bạn sẽ làm gì? Mình khuyên bạn nên gộp các thông báo đó lại thành một nhóm (Android 7.0 trở lên). Một nhóm thông báo cho phép bạn thu gọn nhiều thông báo chỉ thành một bài đăng trong notification drawer, với một bản tóm tắt. Sau đó, người dùng có thể mở rộng thông báo để hiển thị chi tiết cho từng thông báo riêng lẻ.
![](https://images.viblo.asia/34d986d2-a9db-4647-9ca2-05684fa1ba74.png)

> Để tìm hiểu cách thêm thông báo vào một nhóm, hãy xem [Create a Group of Notifications](https://developer.android.com/training/notify-user/group).
> 
## Notification channels
Bắt đầu từ Android 8.0 (API 26), tất cả các Notification phải được gán cho một channel, nếu không nó sẽ không xuất hiện. Bằng cách phân loại thông báo thành các channel, người dùng có thể tắt các Notification channel cụ thể cho ứng dụng của bạn (thay vì tắt tất cả thông báo) và người dùng có thể kiểm soát các tùy chọn hình ảnh và âm thanh cho từng channel ở trong phần cài đặt của hệ thống Android . Người dùng cũng có thể nhấn và giữ một thông báo để thay đổi hành vi cho channel được liên kết.

![](https://images.viblo.asia/f7348eda-36dc-4a15-b54a-c7c588ea7457.png)
## Tổng kết
Bài viết này đã tổng quát được khái niệm và cấu trúc của một Notification trong android.

Ở phần sau mình sẽ đi vào thực hành luôn, hướng dẫn các bạn tạo mới một Notification.