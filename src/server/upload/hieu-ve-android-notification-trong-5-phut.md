Notification là một trong những cách nhanh nhất và dễ nhất để thêm tương tác và để người dùng tương tác với ứng dụng của bạn. Thông báo cung cấp các đoạn thông tin nhanh chóng mà người dùng của bạn cần biết ngay ngay lập tức. Thông báo cũng cho phép người dùng nhanh chóng thực hiện các hành động đối với các sự kiện. Chúng tôi sẽ đưa các bạn tiếp cận với Notification trong các trường hợp phổ biến nhất và bạn có thể sẽ thực hiện được Notification mà không mất nhiều thời gian.

## Xây dựng một Notification

Bước đầu tiên để hiển thị notificaton cho người dùng là xây dựng object Notification. Notification được tạo dựng thông qua `NotificationCompat.Builder`. Thông tin tối thiểu cần thiết để hiển thị Notification là: một small icon. Nhưng chỉ như thế thôi thì nó không được hữu ích cho lắm. Notification nên hữu ích với user, thế nên thông thường, Thông báo sẽ có một title và một body. Dưới đây là mô hình của một notification phổ biến với những thành phần quan trọng

![common_notification](https://cdn-images-1.medium.com/max/800/1*k4PBdxfUp83le6_KEfWXYA.png)

- **Small icon** Sẽ hiện thị trên Status bar và điều quan trọng là icon đó sẽ được tô màu. Lý do điều này quan trọng đó là bạn sẽ cần phải có icon với alpha. Nếu không có alpha trong icon. Notification icon của bạn sẽ hiển thị một hình vuông màu trắng xấu tệ thay vì đó nên hiển thị logo hoặc nhãn hiệu riêng ứng dụng của bạn.
- **Content title** Nó là title cho nội dụng của bạn. Nó lên là một mô tả ngắn để chi ra tại sao Notificaton của bạn lại hiển thị lên.
- **Content body** Đây là một phần nhỏ để mô tả chi tiết về notification của ban. Bạn nên nhận thức về việc số lượng nội dung được đặt trong body của của Notification. với cấu hình thông thường. Giới hạn của nó sẽ là một dòng văn bản.
- **Large icon** là một Bitmap liên quan đến notification của bạn. nó có thể là cái gì đó tương tự như ảnh profile chẳng hạn.

Đoạn code đơn giản dưới đây để khởi tạo và cài đặt các yếu tố đó khi Notification được hiển thị lên 

```javascript
val notification = NotificationCompat.Builder(context, CHANNEL_ID)
    .setSmallIcon(R.drawable.ic_announcement)
    .setContentTitle(title)
    .setContentText(body)
    .build()
```

## Hiển thị một Notification

Bây giờ một Notification đã được build, chúng ta sẽ tìm cách để hiển thị nó. Android cung cấp một service hệ thống để hiển thị Notification cho người dùng.
`NotificationManagerCompat` sẽ cho phép ứng dụng thông báo đến người dùng. Để thông báo đến người dùng, chúng ta cần cung cấp một `notificationId` và một noitification đã được build.

```javascript
with(NotificationManagerCompat.from(context)) {
    if (getNotificationChannel(CHANNEL_ID) == null) {
        createNotificationChannel(context)
    }
    notify(notificationId, builder.build())
}
```

Có một phần mở rộng của code ở đây để kiểm tra nếu notificaton channel đã tồn tại.

## Channel và sự quan trọng

Channel được giới thiệu trong Android Oreo, và cho phép người dùng lựa chọn thông báo nào của ứng dụng được phép hiển thị. Là nhà phát triển ứng dụng, chúng tôi khuyên bạn nên chia thông báo ra thành nhiều các chủ đề dựa trên các loại thông báo mà ứng dụng cung cấp. Nếu một ứng dụng chỉ sử dụng một channel để hiển thị tất cả các Notification, người dùng sẽ không thể lựa chọn Notification mà họ muốn xem, và nếu người dùng chặn một channel Notification thì có thể họ sẽ không bao giờ nhận được Notification từ ứng dụng nữa.

```javascript
fun createNotificationChannel(context: Context) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        val name = context.getString(R.string.channel_name)
        val descriptionText = context.getString(R.string.channel_description)
        val importance = NotificationManager.IMPORTANCE_HIGH
        val channel = NotificationChannel(CHANNEL_ID, name, importance).apply {
            description = descriptionText
        }
        NotificationManagerCompat.from(context).createNotificationChannel(channel)
    }
}
```

- **ID** là một định danh cho channel của bạn, nó lên là một String cố định trong ứng dụng của bạn.
- **Name** cái này sẽ truyền đạt cho người dụng thông báo ngắn về một cái gì đó ngắn gọn và đơn giản như cách thức mà chương trình "Tin nhắn" làm việc.
- ** Importance** ở đây có thể là High, Default, Low, hoặc Min, tùy theo cách bạn đánh giá mức độ quan trọng của thông báo với người dùng.
- **Description** Cái này sẽ được hiển thị trong Android Setting menu để mô tả chi tiết hơn về Channel này.

## Phản hồi với hành động của người dùng

Có nhiều cách để một user có thể tương tác với notification. Và rất may mắn, API để xử lý cách tương tác với các thông báo đều khá giống nhau. `Intents` và `PendingIntents` được sử dụng để liên lạc trở lại ứng dụng và cho phép một số loại xử lý logic thực hiện.

Cách đơn giản nhất để xử lý một lượng lớn thông báo là sử dụng `BroadcastReceiver`. Khi người dùng thực hiện một hành động trên Notification, Intent sẽ được kích hoạt và phương thức `onReceive` của `BroadcastReceiver` sẽ được gọi.

```javascript
val builder = NotificationCompat.Builder(context, CHANNEL_ID)
    ...
    .setContentIntent(onContentTapped /** Pending intent */)
    .setDeleteIntent(onSwipedAway /** Pending intent */)
    .addAction(
        R.drawable.ic_announcement,
        actionTitle,
        onActionTapped /** Pending intent */
    )
```

- **ContentIntent** sẽ được khởi động khi người dùng tap vào Notification. Nó quan trọng để cho biết notification sẽ không bị dismiss trừ khi bạn gọi đến `setAutoCancel(true)` cho notification.
- **DeleteIntent** sẽ được khởi chạy khi người dùng swipe noitification.
- **Actions** là button ở dưới cùng của Notification. Nó có thể có icon, và title là yêu cầu bắt buộc.

Để tạo một `BroadcastReceiver` bạn cần phải extends class `BroadcastReceiver` và `overide` phương thức `onReceive`. và đừng quên định nghĩa Receiver trong `AndroidManifest.xml`

```javascript
class NotificationBroadcastReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        val action = intent.action

        when (action) {
            ACTION_ONE -> {
                Toast.makeText(context, "Action One hit!", Toast.LENGTH_SHORT).show()
            }
            ACTION_TWO -> {
                Toast.makeText(context, "Action Two hit!", Toast.LENGTH_SHORT).show()
            }
        }
    }

}
object NotificationController {
    fun pendingIntent(context: Context, name: String, extras: Bundle?): PendingIntent {
        val intent = Intent(context, NotificationBroadcastReceiver::class.java).apply {
            action = name
            putExtra(EXTRA_NOTIFICATION_ID, extras)
        }

        return PendingIntent.getBroadcast(context, 0, intent, 0)
    }
}
```

`NotificationController` là một tiện ích nhanh để tạo một `PendingIntents` cho Notification. Điều quan trọng nhất là tạo các hành động được đặt tên khác nhau để xử lý chính xác cách người dùng tương tác với thông báo. Ngoài ra, nếu bạn định khởi chạy một Activity từ BroadcastReceiver, bạn phải sử dụng IntentFlag NEW_TASK. Đây cũng là một ý tưởng để điều khiển tất cả các Notification ở một nơi. Intents có thể động thời được đăng ký với các BroadcastReceiver khác nhau, thế nên bạn có thể giới hạn được một BroadcastReceiver cho mỗi một kiểu notification.

Nguồn tham khảo: [Android Notifications in 5 Minutes](https://medium.com/@brandonwever/android-notifications-in-5-minutes-4d16d39894a1)