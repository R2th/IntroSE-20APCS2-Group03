Notification cung cấp cho chúng ta những thông tin ngắn gọn, những sự kiện của ứng dụng của bạn khi ứng dụng đang không được sử dụng. Ở bài viết này, mình sẽ hướng dẫn các bạn tạo một Notification với nhiều tính năng khác nhau cho Android 4.0 (API 14) trởi lên. 
Để có cái nhìn tổng quan hơn về Notification bạn có thể tìm hiểu [phần 1](https://viblo.asia/p/android-all-about-notification-p1-overview-L4x5xPyq5BM) của series Notification của mình.

# Implement thư viện
 Mặc dù tất cả các dự án Android được build từ android studio đều đã được tích hợp sẵn [Notification compat](https://viblo.asia/p/android-all-about-notification-p1-overview-L4x5xPyq5BM) nhưng bạn vẫn phải nên chắc chắn rằng file build.gradle của bạn đã có dòng này.
```
 val core_version = "1.6.0"
dependencies {
    implementation("androidx.core:core-ktx:$core_version")
}
```

# Tạo một Notification cơ bản
Thông báo ở dạng cơ bản và nhỏ gọn nhất (còn được gọi là dạng thu gọn) hiển thị biểu tượng, tiêu đề và một lượng nhỏ văn bản nội dung. Trong phần này, bạn sẽ tìm hiểu cách tạo thông báo mà người dùng có thể nhấp vào để khởi chạy một Activity trong ứng dụng của bạn.
![](https://images.viblo.asia/ed276f81-34e0-402a-85b1-9d5d57cae049.png)

Nếu muốn biết thêm về từng thành phân của Notification thì bạn có thể xem [ở đây](https://viblo.asia/p/android-all-about-notification-p1-overview-L4x5xPyq5BM#_cac-thanh-phan-cua-mot-notification-6)
## Cài đặt nội dung cho Notification
Để bắt đầu, bạn cần cài đặt nội dung và chanel của thông báo bằng một `NotificationCompat.Builder` . Ví dụ sau đây cho thấy cách tạo thông báo :

* Biểu tượng: được đặt bởi setSmallIcon().
* Tiêu đề: được đặt bởi setContentTitle().
* Nội dung Văn bản: được đặt bởi setContentText().
* Mức độ ưu tiên : được đặt bởi setPriority(). 
```
var builder = NotificationCompat.Builder(this, CHANNEL_ID)
        .setSmallIcon(R.drawable.notification_icon)
        .setContentTitle(textTitle)
        .setContentText(textContent)
        .setPriority(NotificationCompat.PRIORITY_DEFAULT)
```
## Tạo chanel và mức độ ưu tiên
Kể từ Android 8.0 trở lên, để có thể gửi 1 thông báo, bạn phải đăng ký chanel thông báo của ứng dụng tới hệ thống android:
```
private fun createNotificationChannel() {
    // Create the NotificationChannel, but only on API 26+ because
    // the NotificationChannel class is new and not in the support library
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        val name = getString(R.string.channel_name)
        val descriptionText = getString(R.string.channel_description)
        val importance = NotificationManager.IMPORTANCE_DEFAULT
        val channel = NotificationChannel(CHANNEL_ID, name, importance).apply {
            description = descriptionText
        }
        // Register the channel with the system
        val notificationManager: NotificationManager =
            getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.createNotificationChannel(channel)
    }
}
```
## Cài đặt cho sự kiện click vào thông báo của User
Mọi thông báo đều sẽ phản hồi với một lần nhấn, thường thì sẽ mở một Activity trong ứng dụng của bạn. Để làm được điều này, bạn phải chỉ định mục đích nội dung được xác định với một `PendingIntent` đối tượng và chuyển nó đến `setContentIntent()`.

Đoạn code dưới đây cho biết cách tạo basic intent để mở một hoạt động khi người dùng nhấn vào thông báo:
```
// Create an explicit intent for an Activity in your app
val intent = Intent(this, AlertDetails::class.java).apply {
    flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
}
val pendingIntent: PendingIntent = PendingIntent.getActivity(this, 0, intent, 0)

val builder = NotificationCompat.Builder(this, CHANNEL_ID)
        .setSmallIcon(R.drawable.notification_icon)
        .setContentTitle("My notification")
        .setContentText("Hello World!")
        .setPriority(NotificationCompat.PRIORITY_DEFAULT)
        // Set the intent that will fire when the user taps the notification
        .setContentIntent(pendingIntent)
        .setAutoCancel(true)
```

## Hiển thị Notification
Để 1 thông báo xuất hiện, ta gọi `NotificationManagerCompat.notify()`, truyền cho nó một ID (duy nhất). Ví dụ:
```
with(NotificationManagerCompat.from(this)) {
    // notificationId is a unique int for each notification that you must define
    notify(notificationId, builder.build())
}
```

> Note: Hãy lưu ID thông báo lại vì bạn sẽ cần nó sau này nếu muốn cập nhật hoặc xóa thông báo .

## Thêm các "action button"
Một thông báo có thể cung cấp tối đa ba nút tác vụ cho phép người dùng phản hồi nhanh chóng, chẳng hạn như báo lại lời nhắc hoặc thậm chí trả lời tin nhắn văn bản. Nhưng các nút hành động này không được trùng lặp với hành động được thực hiện khi người dùng nhấn vào thông báo .
![](https://images.viblo.asia/ed276f81-34e0-402a-85b1-9d5d57cae049.png)
Để thêm một action button, hãy truyền một `PendingIntent` vào `addAction()` . Điều này cũng giống như thiết lập action nhấn mặc định của thông báo, ngoại trừ thay vì khởi chạy một Activity, bạn có thể thực hiện nhiều việc khác như bắt đầu `BroadcastReceiver` thực hiện một công việc trong nền để hành động đó không làm gián đoạn ứng dụng đang mở.
Ví dụ:
```
val snoozeIntent = Intent(this, MyBroadcastReceiver::class.java).apply {
    action = ACTION_SNOOZE
    putExtra(EXTRA_NOTIFICATION_ID, 0)
}
val snoozePendingIntent: PendingIntent = 
    PendingIntent.getBroadcast(this, 0, snoozeIntent, 0)
val builder = NotificationCompat.Builder(this, CHANNEL_ID)
        .setSmallIcon(R.drawable.notification_icon)
        .setContentTitle("My notification")
        .setContentText("Hello World!")
        .setPriority(NotificationCompat.PRIORITY_DEFAULT)
        .setContentIntent(pendingIntent)
        .addAction(R.drawable.ic_snooze, getString(R.string.snooze),
                snoozePendingIntent)
```
## Thêm Action trả lời tin nhắn
Hành động trả lời trực tiếp, được giới thiệu trong Android 7.0 (API cấp 24), cho phép người dùng nhập văn bản trực tiếp vào thông báo được gửi đến ứng dụng của bạn mà không cần mở ứng dụng lên. Ví dụ: bạn có thể sử dụng hành động trả lời trực tiếp để cho phép người dùng trả lời tin nhắn văn bản hoặc cập nhật danh sách công việc từ trong thông báo.
![](https://images.viblo.asia/22ff7246-2d47-4939-974e-309f17812a70.png)

Hành động trả lời trực tiếp xuất hiện dưới dạng một nút bổ sung trong thông báo. Khi người dùng nhập xong, hệ thống sẽ đính kèm phản hồi văn bản với Intent mà bạn đã chỉ định cho hành động thông báo và gửi Intent đến ứng dụng.
### Thêm nút trả lời
Để tạo hành động thông báo hỗ trợ trả lời trực tiếp:
   1. Tạo một `RemoteInput.Builder`để thêm vào hành động thông báo. Constructor của lớp này chấp nhận một chuỗi mà hệ thống sử dụng làm KEY. Sau đó, hệ thống sẽ lấy đoạn text bạn nhập từ bàn phím làm đầu vào.
```
// Key for the string that's delivered in the action's intent.
private val KEY_TEXT_REPLY = "key_text_reply"
var replyLabel: String = resources.getString(R.string.reply_label)
var remoteInput: RemoteInput = RemoteInput.Builder(KEY_TEXT_REPLY).run {
    setLabel(replyLabel)
    build()
}
```
 2. Tạo  PendingIntentcho hành động reply
```
// Build a PendingIntent for the reply action to trigger.
var replyPendingIntent: PendingIntent = 
    PendingIntent.getBroadcast(applicationContext,
        conversation.getConversationId(),
        getMessageReplyIntent(conversation.getConversationId()),
        PendingIntent.FLAG_UPDATE_CURRENT)
```
 3. Đính kèm `RemoteInput` vào mộ action bằng cách sử dụng `addRemoteInput()`
```
// Create the reply action and add the remote input.
var action: NotificationCompat.Action = 
    NotificationCompat.Action.Builder(R.drawable.ic_reply_icon,
        getString(R.string.label), replyPendingIntent)
        .addRemoteInput(remoteInput)
        .build()
```
 4. Áp dụng action cho thông báo và hiển thị thông báo.
```
// Build the notification and add the action.
val newMessageNotification = Notification.Builder(context, CHANNEL_ID)
        .setSmallIcon(R.drawable.ic_message)
        .setContentTitle(getString(R.string.title))
        .setContentText(getString(R.string.content))
        .addAction(action)
        .build()

// Issue the notification.
with(NotificationManagerCompat.from(this)) {
    notificationManager.notify(notificationId, newMessageNotification)
}
```
### Lấy thông tin đầu vào của người dùng từ text nhập từ bàn phím
Tiếp nhận đầu vào của người dùng từnotification's reply UI, ta gọi `RemoteInput.getResultsFromIntent()`, truyền vào 1 Intent nhận được từ `BroadcastReceiver` của bạn :
```
private fun getMessageText(intent: Intent): CharSequence? {
    return RemoteInput.getResultsFromIntent(intent)?.getCharSequence(KEY_TEXT_REPLY)
}
```
Sau khi xử lí đoạn văn bản này, bạn cần phải Update thông báo bằng `NotificationManagerCompat.notify()` với ID và tag. Việc này là cần thiết để ẩn giao diện người dùng trả lời trực tiếp và xác nhận với người dùng rằng câu trả lời của họ đã được tiếp nhận và xử lý chính xác.
```
// Build a new notification, which informs the user that the system
// handled their interaction with the previous notification.
val repliedNotification = Notification.Builder(context, CHANNEL_ID)
        .setSmallIcon(R.drawable.ic_message)
        .setContentText(getString(R.string.replied))
        .build()

// Issue the new notification.
NotificationManagerCompat.from(this).apply {
    notificationManager.notify(notificationId, repliedNotification)
}
```
# Tổng kết
Việc tạo một Notification có còn rất nhiều vấn đề cần đề cập đến, tuy nhiên bài viết đã khá dài rồi nên mình sẽ chia phần này ra làm 2.
Ở phần tiếp theo của bài viết này mình sẽ hướng dẫn các bạn tạo một [progress bar,](https://developer.android.com/training/notify-user/build-notification#progressbar) [Show an urgent message](https://developer.android.com/training/notify-user/build-notification#urgent-message), [hiển thị thông báo trên màn hình khóa ](https://developer.android.com/training/notify-user/build-notification#lockscreenNotification), [cập nhật](https://developer.android.com/training/notify-user/build-notification#Updating) và [xóa thông báo](https://developer.android.com/training/notify-user/build-notification#Removing) .

See you !!!