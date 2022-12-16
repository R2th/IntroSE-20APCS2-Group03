# I. Dẫn nhập
* [Bubble](https://developer.android.com/preview/features/bubbles) trên Android Q là một cách tiếp cận mới giúp người dùng thực hiện tác vụ đa nhiệm và tương tác với ứng dụng để thực hiện các tác vụ quan trọng giống như đánh dấu các mục trong todo-list, trả lời các tin nhắn trò chuyện hoặc thực hiện một tác vụ trong ứng dụng của chúng ta mà không cần rời khỏi ứng dụng hiện tại.
* Bubble được tích hợp vào hế thống Notification. Nó sẽ nổi lên trên các ứng dụng khác và theo dõi người dùng mọi lúc mọi nơi. Bubble có thể mở rộng để hiện thị nội dung và thu gọn khi không sử dụng.
# II. Nội dung chính
* Trong bài viết này, chúng ta sẽ tìm hiểu ví dụ sử dụng Bubble để tạo một ứng dụng nhắc nhở đơn giản. Khi đến một thời điểm do người dùng chỉ định thì sẽ có một bubble bật lên và cho phép người dùng thực hiện cuộc gọi hoặc gửi email. Các bạn có thể tham khảo các ứng dụng demo tại [đây](https://medium.com/google-developer-experts/exploring-android-q-bubbles-952d1c3be850) để tìm hiểu các phương pháp tiếp cận khác nhau của Bubble.
### 1. Yêu cầu
* Chúng ta cần đáp ứng các yêu cầu dưới đây để tiếp cận với Bubble:
1. Phiên bản mới nhất của [Androi Studio](https://developer.android.com/studio/preview) (v3.5 Preview trở lên).
2. [Android Q Preview SDK](https://developer.android.com/preview/setup-sdk#get-sdk)
3. Sử dụng máy ảo Android chạy [Android Q Beta](https://developer.android.com/preview/get) hoặc các thiết bị Pixel.
4. Cập nhật cấu hình build ứng dụng trong build.gradle hướng tới Android Q.
```
android {
    compileSdkVersion 'android-Q'
    defaultConfig {
        ...
        minSdkVersion 'Q'
        targetSdkVersion 'Q'
        ...
    }
    ...
}
```
### 2. Tạo ra Bubble
* Bubble không khác gì một activity với khả năng được cấu hình để có thể thay đổi kích thước và luôn khởi chạy trong chế độ document UI.
```
<activity
        android:name=".BubbleActivity"
        android:theme="@style/AppTheme.NoActionBar"
        android:label="Reminder"
        android:allowEmbedded="true"
        android:documentLaunchMode="always"
        android:resizeableActivity="true" />
```
*  *allowEmbedded=”true”*: Activity có thể khởi chạy từ một activity khác.
*  *resizeableActivity=”true”*: Chỉ định xem ứng dụng có hỗ trợ hiện thị nhiều cửa sổ hay không.
*  *documentLaunchMode=”always”*: Nếu ứng dụng của bạn hiện thị nhiều Bubble thì activity sẽ được khởi chạy dưới dạng nhiều instance.

![](https://images.viblo.asia/673157ab-b6d2-483b-b9ef-bb1e45b18fcf.png)

* Vì Bubble được tạo thông qua Notification API nên để gửi thông tin tới Bubble chúng ta cần các bước sau:
1. Tạo một PendingIntent để xác định Bubble activity (activity sẽ hiển thị trong Bubble)
```
// Create bubble intent
val target = Intent(context, BubbleActivity::class.java)
val bubbleIntent = PendingIntent.getActivity(context, 0, target, 0)
```
2. Tạo BubbleMetadata thông qua [Notification.BubbleMetadata.Builder](https://developer.android.com/reference/android/app/Notification.BubbleMetadata.Builder) và xác định Bubble intent đích được mở khi người dùng thao tác với Bubble bằng *setIntent()*.
```
// Create bubble metadata
val bubbleMetadata = Notification.BubbleMetadata.Builder()
    .setDesiredHeight(200)
    .setIcon(Icon.createWithResource(context,    R.mipmap.ic_launcher_round))
    .setIntent(bubbleIntent)
    .build()
```
3. Thêm *BubbleMetadata* vào notification thông qua *setBubbleMetadata()*
```
// Create notification
val notificationBuilder = Notification.Builder(context, NOTIFICATION_CHANNEL_ID)
    .setContentIntent(pendingIntent)
    .setContentTitle(notificationTitle)
    .setSmallIcon(R.mipmap.ic_launcher_round)
    .setBubbleMetadata(bubbleMetadata)
```
4. Cài đặt các kênh notification cho Androdi từ Oreo trở lên và hiện thị notification
```
val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
    val importance = NotificationManager.IMPORTANCE_HIGH
    val notificationChannel = NotificationChannel(NOTIFICATION_CHANNEL_ID, "Reminder Alarms", importance)
    notificationManager.createNotificationChannel(notificationChannel)
}
val random = Random()
val id = random.nextInt(9999 - 1000) + 1000
notificationManager.notify(id, notificationBuilder.build())
```
![](https://images.viblo.asia/4bf5e319-13f0-4600-a52a-6b43513b9b67.png)

![](https://images.viblo.asia/d5b10394-3b3a-4235-a265-eb74a777acd8.png)
# III. Kết luận
* Hy vọng với bài viết này, các bạn có thể tiếp cận dễ dàng một trong những tính năng mới của Android Q. Nội dung của bài viết được tham khảo tại [đây](https://medium.com/mindorks/android-q-implementing-bubbles-96aa14ccb9c3)