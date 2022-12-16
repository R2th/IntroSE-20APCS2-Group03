## 1. Tổng Quan
Notification là các thông báo hay message được hiển thị cho người dùng bên ngoài giao diện ứng dụng điện thoại. Notification được hiển thị trên cùng của màn hình nếu thiết bị được mở khóa hoặc tùy thuộc vào cài đặt bảo mật trên lock screen khi điện thoại bị khóa.

![](https://images.viblo.asia/e8f95a5a-7db5-4509-923a-b153fa8037a3.png)

Một Notification điển hình sẽ bao gồm một title, một description, một icon. Nó cũng có thể có các hành động có thể clickable, quick reply, mở rộng nội dung bên trong và có thể có cả hình ảnh.
![](https://images.viblo.asia/f9d2e033-10a4-4f07-8b26-d0c5c6fc5e85.png)
Notification có thẻ cung cấp thông tin kịp thời, và nó có thể có các button cho phép người dùng thực hiện các hành động nhanh chóng, chẳng hạn như trả lời một message hoặc đặt lại báo thức. Khi click vào Notification sẽ đưa ta đến một view liên quan đến nội dung thông báo.

Notification là một cách hữu ích để nhắc nhở người dùng về một nhiệm vụ quan trọng, chọ họ biết điều gì đang xảy ra, hoặc truyền đạt thông tin quan trọng ngay lập tức mà họ cần, trong khi ứng dụng của đang đang ở chế độ background (chạy ngầm)j. Sử dụng Notification một cách chừng mực, điều này không những tôn trọng người dùng mà còn có khả năng mang lại Notification ứng dụng của ta nhận được sự chú ý của người dùng một cách xứng đáng.
## 2. App Overview
Bạn đã nấu trứng bao giờ chưa, đơn giản đúng không nào. Thực ra cũng là một nhiệm vụ thách thức nếu bạn không theo dõi thời gian. Chúng ta sẽ làm một ứng dụng cho phép người dùng cài đặt thời gian nấu khác nhau cho các kiểu trứng khác nhau. Bộ đếm thời gian đếm ngược từ khoảng thời gian đã chọn và toast message khi trứng đã sẵn sàng.
![](https://images.viblo.asia/188cabb8-23c7-4a94-aa03-4bc2aec9484f.png)
Việc này có vẻ thiên về chức năng và không hoàn hảo và thân thiện với người dùng. Toast Message được hiển thị trong một khoảng thời gian ngắn và do đó rất dễ bỏ lỡ. Ngoài ra ứng dụng đang không ở foreground hoặc điện thoại đang bị khóa thì sẽ không có thông báo trực quan nào cho trạng thái của bộ đếm thời gian khi toast message biến mất. 

Tốt nhất Egg Timer nên sử dụng Notification để báo cho người dùng khi hết thời gian. Người dùng sẽ biết trứng đã chín và sẵn sàng ngay lập tức, nêu không trứng sẽ không chín quá. Notification rất trực quan, có thể bao gồm âm thanh, có thể làm cho điện thoại rung và thu hút người dùng.
Bằng cách này ta có thể đạt được món trứng hoàn hảo và người dùng sẽ hạnh phúc :))
## 3. Cấu trúc
Ứng dụng sẽ chỉ gồm một activity duy nhất là MainActivity, có 3 package là receiver, ui và util

![](https://images.viblo.asia/91260246-f463-472e-ae34-24afb9a4b0b6.png)

- package receiver gồm 2 broadcast receiver là AlarmReceiver và SnoozeReceiver. AlarmReceiver được kích hoạt bởi AlarmManager để gửi notification khi hết thời gian do người dùng xác định. SnoozeReceiver xử lý khi người dùng click vào notification.
- ui package chứa EggTimerFragment là một phần giao diện của ứng dụng. EggTimerViewModel chịu trách nhiệm start và huỷ các vòng đời của bộ hẹn giờ.
- util package gồm 2 file. BindingUtils.kt có các binding adapters cho phép liên kết dữ liệu giữa UI ứng dụng và ViewModel. NotificationUtils.kt có các extension methods 
## 4. Thêm Notification vào trong ứng dụng
Sử dụng notification là cách tuyệt vời để thu hút người dùng chú ý đến ứng dụng của bạn, cho dù ứng dụng của bạn có chạy ở foreground hay không, notification sẽ hiện lên trên màn hình có thể bao gồm cả hình ảnh lẫn âm thanh và rung.
### 4.1 Tạo một Basic Notification
Trong file NotificationUtils.kt tạo function senNotification
```Kotlin
//NotificationUtils.kt
// TODO: Step 1.1 extension function to send messages (GIVEN)
/**
 * Builds and delivers a notification.
 *
 * @param messageBody, notification text.
 * @param context, activity context.
 */
fun NotificationManager.sendNotification(messageBody: String, applicationContext: Context) {
```
Lấy một thể hiện của notification builder, cần tham số là app context và channel ID. Channel ID là một String. 

Notification Channel là một cách để nhóm các notification tương tự nhau. Khi một ID Channel được tạo, nó có thể được sử dụng để cung cấp bất kỳ số lượng notification nào.
```Kotlin
//NotificationUtils.kt
// TODO: Step 1.2 get an instance of NotificationCompat.Builder
val builder = NotificationCompat.Builder(
        applicationContext,
        applicationContext.getString(R.string.egg_notification_channel_id)
)
```
Chú ý rằng với Android API level 26 trở lên thì tất cả các notification phải có một channel

Thêm Icon, Title, Content cho Notification.
```Kotlin
//NotificationUtils.kt
   // TODO: Step 1.3 set title, text and icon to builder
   .setSmallIcon(R.drawable.cooked_egg)
   .setContentTitle(applicationContext.getString(R.string.notification_title))
   .setContentText(messageBody)
```
Tiếp theo ta cần gọi notify() với một ID duy nhất cho notification và với đối tượng Notification từ builder
```Kotlin
//NotificationUtils.kt
   // TODO: Step 1.4 call notify to send the notification
    // Deliver the notification
    notify(NOTIFICATION_ID, builder.build())
```
mở ui/EggTimerViewModel.kt và tạo phương thức startTimer(). Phương thức này sẽ tạo báo động với khoảng thời gian của egg timer

Ta sẽ kích hoạt notification khi người dùng bắt đầu hẹn giờ. Để gọi phương thức setNotification trước đó, ta cần một thể hiẹn của NotificationManager. NotificationManager là một dịch vụ hệ thống cung cấp tất cả các chứng năng được hiển thị cho API notification. Bất kể khi nào mà bạn muốn gửi, cancel, hoặc upate một notification bạn cần request một thể hiện của NotificationManager từ hệ thống. 
```Kotlin
// EggTimerViewModel.kt
// TODO: Step 1.5 get an instance of NotificationManager 
// and call sendNotification

val notificationManager = ContextCompat.getSystemService(
    app, 
    NotificationManager::class.java
) as NotificationManager
                notificationManager.sendNotification(app.getString(R.string.timer_running), app)
```
### 4.2 Notification Channels
Gọi createNotificationChannel() trong NotificationManager và truyền vào notificationChannel cái mà ta tạo trước đó.
```Kotlin
//EggTimerFragment.kt
private fun createChannel(channelId: String, channelName: String) {
    // TODO: Step 1.6 START create a channel
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        val notificationChannel = NotificationChannel(
            channelId,
            channelName,
            // TODO: Step 2.4 change importance
            NotificationManager.IMPORTANCE_LOW
        )
        // TODO: Step 2.6 disable badges for this channel

        notificationChannel.enableLights(true)
        notificationChannel.lightColor = Color.RED
        notificationChannel.enableVibration(true)
        notificationChannel.description = "Time for breakfast"

        val notificationManager = requireActivity().getSystemService(
            NotificationManager::class.java
        )
        notificationManager.createNotificationChannel(notificationChannel)
    }
    // TODO: Step 1.6 END create channel
}
```
Để tạo một channel ta cần gọi phương thức createChannel(). Phương thức này có 2 tham số đó là channel ID và channel name. 
```Kotlin
// EggTimerFragment.kt
    // TODO: Step 1.7 call createChannel
    createChannel(
          getString(R.string.egg_notification_channel_id),
          getString(R.string.egg_notification_channel_name)
    )
```
Ta cần chuyển channel ID cho notification builder. Trong NotificationUtils.kt xác minh lại channel ID
```Kotlin
// NotificationUtils.kt
val builder = NotificationCompat.Builder(
        applicationContext,
       // TODO: Step 1.8 verify the notification channel name
        applicationContext.getString(R.string.egg_notification_channel_id)
)
```
Chạy ứng dụng ta sẽ thấy ứng dụng có nofification mỗi khi ta hẹn giờ.
![](https://images.viblo.asia/c0670388-0a21-4429-bac4-ce9c5c481492.png)
### 4.3 Add notification vào ứng dụng
Trong AlarmReceiver.kt một thể hiện cho NotificationManager, và gọi sendNotification() với tham số là message và context
```Kotlin
// AlarmReceiver.kt
   // TODO: Step 1.9 add call to sendNotification
   val notificationManager = ContextCompat.getSystemService(
       context, 
       NotificationManager::class.java
   ) as NotificationManager
             
   notificationManager.sendNotification(
       context.getText(R.string.eggs_ready).toString(), 
       context
   )
```
### 4.4 Add một content intent
Trong NotificationUtils.kt 
```Kotlin
// NotificationUtils.kt

fun NotificationManager.sendNotification(messageBody: String, applicationContext: Context) {
    // Create the content intent for the notification, which launches
    // this activity
   // TODO: Step 1.11 create intent
    val contentIntent = Intent(applicationContext, MainActivity::class.java)
```
Tạo pending Intent
```Kotlin
// NotificationUtils.kt
   // TODO: Step 1.12 create PendingIntent
    val contentPendingIntent = PendingIntent.getActivity(
        applicationContext, 
        NOTIFICATION_ID,
        contentIntent,
        PendingIntent.FLAG_UPDATE_CURRENT
    )
```
### 4.5 Cancel Notification
Trong file NotificationsUtil.kt thêm một extension function  cancelAll()
```Kotlin
// NotificationUtils.kt

// TODO: Step 1.14 Cancel all notifications
/**
 * Cancels all notifications.
 *
 */
fun NotificationManager.cancelNotifications() {
    cancelAll()
}
```
Trong phương thức startTimer() của EggTimerViewMode.kt
```Kotlin
//  EggTimerViewModel.kt
   //TODO Step 1.15 call cancel notification
    val notificationManager =
       ContextCompat.getSystemService(
            app,
            NotificationManager::class.java
        ) as NotificationManager
    notificationManager.cancelNotifications()
```
## 5. Custom Notification
### 5.1 Style cho Notification
NotificationCompat cung cấp các style có sẵn:

- BigTextStyle, có thể hiển thị một khối lớn văn bản, chẳng hạn như hiển thị nội dung của email khi được mở rộng.
- BigPictureStyle, hiển thị các notification định dạng lớn bao gồm tệp đính kèm hình ảnh lớn.
- InboxStyle, hiển thị nội dung văn bản kiểu tin nhắn.
- MediaStyle, hiển thị các điều khiển media
```Kotlin
// NotificationUtils.kt

// TODO: Step 2.0 add style
val eggImage = BitmapFactory.decodeResource(
     applicationContext.resources, 
     R.drawable.cooked_egg
)
```
```Kotlin
// NotificationUtils.kt

// TODO: Step 2.0 add style
val eggImage = BitmapFactory.decodeResource(
     applicationContext.resources, 
     R.drawable.cooked_egg
)
val bigPicStyle = NotificationCompat.BigPictureStyle()
        .bigPicture(eggImage)
        .bigLargeIcon(null)
```
```Kotlin
// NotificationUtils.kt
// TODO: Step 2.1 add style to builder
.setStyle(bigPicStyle)
.setLargeIcon(eggImage)
```
Ban đầu xuất hiện thì notification xuất hiện 1 hình ảnh nhỏ, khi ta mở rộng thì nó mở to, giống như bên dưới. 
![](https://images.viblo.asia/6af395f5-1924-4ecc-9ed9-0dd60383044c.png)
![](https://images.viblo.asia/156cecb8-dd7d-4176-96e0-fd406222f5f8.png)
### 5.2 Notification actions
Bạn có thể thêm hành động cho Notification. Một hành động cơ bản đó là khi click vào notification thì sẻ mở ra ứng dụng.

Một Notification có thể cung cấp tối đa 3 button để cho người dùng phản hồi nhanh chóng. Nhưng đặt lại báo thức hay trả lời 1 tin nhắn. Các button này không bị duplicate hành động. 
```Kotlin
// SnoozeReceiver.kt
        val notificationManager = ContextCompat.getSystemService(
            context,
            NotificationManager::class.java
        ) as NotificationManager
        notificationManager.cancelAll()
```
```Kotlin
// NotificationUtils.kt

// TODO: Step 2.2 add snooze action
val snoozeIntent = Intent(applicationContext, SnoozeReceiver::class.java)
val snoozePendingIntent: PendingIntent = PendingIntent.getBroadcast(
    applicationContext, 
    REQUEST_CODE, 
    snoozeIntent, 
    FLAGS
)
```
```Kotlin
// NotificationUtils.kt
// TODO: Step 2.3 add snooze action
.addAction(
    R.drawable.egg_icon, 
    applicationContext.getString(R.string.snooze),
    snoozePendingIntent
)
```
![](https://images.viblo.asia/9f373fa5-0969-436d-b125-45e20784f3d7.png)

### 5.3 Notification importance
Tùy vào mức độ quan trọng mà Notification có thể làm gián đoạn người dùng một cách trực quan và rõ ràng. Có 5 mức, từ IMPORTANCE_NONE(0) đến IMPORTANCE_HIGHT(4)
![](https://images.viblo.asia/5b1ae6e6-586d-4ab8-af7a-1411a91a59fa.png)
## 6. Tổng kết và source code
Qua bài viết mình đã giới thiệu qua một ứng dụng vận dụng Notification với ngôn ngữ Kotlin. Để các bạn đọc và làm theo thì rất khó :)))) , nên các bạn có thể tham khảo soure code dưới đây để hiểu hơn nhé
[download source code từ google](https://github.com/googlecodelabs/android-kotlin-notifications)