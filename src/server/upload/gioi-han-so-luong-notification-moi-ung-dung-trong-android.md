Bạn đã bao giờ tự hỏi liệu có bất kỳ giới hạn thông báo nào cho mỗi ứng dụng trong Android. Tôi chưa bao giờ nghĩ rằng có cái đó cho đến khi tôi thực sự thử nó. Và câu trả lời là CÓ, có giới hạn thông báo có thể được đăng trên mỗi ứng dụng. Điều thú vị là số lượng không cố định và có thể được kiểm soát bởi Nhà sản xuất thiết bị. Theo quan sát của tôi, một chiếc điện thoại Google Pixel 3A đã giới hạn ở 25 thông báo, trong khi một chiếc OnePlus 6T và một thiết bị Samsung đã giới hạn các thông báo ở mức 50.

Android thực sự đã chỉ định rằng có giới hạn thông báo cho mỗi ứng dụng. Nhưng thật đáng buồn sau khi xem qua tất cả các tài liệu chính thống, tôi không thể tìm thấy bất cứ chỗ nào nói đến giới hạn số lượng thông báo có thể được tạo ra cho mỗi ứng dụng.

Nhưng có một bài viết trên StackOverflow mà tôi đọc đã đề cập đến việc họ đã đưa ra một quan sát.

[android system notification limit per app](https://stackoverflow.com/questions/33364368/android-system-notification-limit-per-app?source=post_page-----94af69a6862c----------------------)

Nếu chúng ta quan sát cẩn thận mã nguồn `NotificationManagerService.java`, chúng ta có thể thấy một biến `MAX_PACKAGE_COUNT` được khai báo là 50.

![NotificationManagerService](https://miro.medium.com/max/2716/1*u0T59hHwP2Zd35Sliljo9w.png)

![MAX_PACKAGE_COUNT](https://miro.medium.com/max/3800/1*bmttPS0pK_MSiOG3BZz84Q.png)

Và bên trong mã, nó kiểm tra xem số lượng có lớn hơn `MAX_PACKAGE_NOTIFICATION` hay không, nó có một thông báo rằng 

> “Package has . already posted max toasts. Not showing more!”
> 
Và đây là lý do chúng ta bị giới hạn bởi số lượng thông báo được đăng trên mỗi ứng dụng.

Bạn có thể thử kiểm tra số lượng thông báo tối đa có thể được đăng bởi một ứng dụng bằng cách sử dụng một vòng lặp đơn giản cho việc này và tại một thời điểm, các thông báo sẽ không được hiển thị lên nữa.

Vậy giải pháp cho việc này là gì? Làm sao chúng ta có thể cho người dùng biết rằng số lượng thông báo đã đạt tới số lượng giới hạn. Làm thế nào chúng ta có thể tiếp tục đăng thông báo bằng cách áp dụng logic để người dùng không bỏ lỡ các thông báo gần đây?

Hãy tìm ra điều đó trong bài viết này.

Chúng tôi sẽ tạo ra một ứng demo. Tôi sẽ lên lịch thông báo cho mỗi giây và theo dõi các thông báo đang hoạt động trong thanh Notification Bar.

Vậy hãy bắt đầu thôi.

Bạn có thể tìm thấy project demo ở link dưới đây

[asdheeraj/NotificationLimit](https://github.com/asdheeraj/NotificationLimit?source=post_page-----94af69a6862c----------------------)

Hãy để cùng nhau tạo một New Project trong Android Studio với Blank Activity.

Bây giờ, trong phương thức `onCreate`, hãy cho phép tạo một Notification channel. Kể từ Android O về sau, chúng ta không thể hiển thị được một Notification mà không có channel.

```kotlin
val notificationManager =
    this.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
    
//If the Sdk version is greater than 'O', configure a Notification channel
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
    val notificationChannel = NotificationChannel(NOTIFICATION_CHANNEL_ID,
        NOTIFICATION_CHANNEL_NAME, NotificationManager.IMPORTANCE_DEFAULT)
        
    // Configure the notification channel
    with(notificationChannel) {
        description = NOTIFICATION_CHANNEL_DESCRIPTION
        enableLights(true)
        vibrationPattern = longArrayOf(0, 1000, 500, 1000)
        enableVibration(true)
        notificationManager.createNotificationChannel(this)
    }
}
```

Bây giờ, hãy tạo một phương thức để kiểm tra các Notification hoạt động và thông báo cho người dùng:

```kotlin
/**
 * Checks for the Maximum notifications and Notify the user
 * @param notificationManager The NotificationManager instance
 */
private fun checkAndScheduleNotifications(notificationManager: NotificationManager) 
```

Bạn có thể kiểm tra trong phương thức này để có thể biết được Notification nào đang hoạt động tự trình quản lý `NotificationManager` hoặc `NotificationListenerService`

### Active Notification là cái gì?
Active Notifications là một mảng các StatusBarNotifications của ứng dụng tương ứng trong thanh Status Bar. Và chúng ta có hai cách để lấy được chúng

[NotificationManager.getActiveNotifications() (for API≥23)](https://developer.android.com/reference/android/app/NotificationManager.html#getActiveNotifications())

[NotificationListenerService.getNotifications() (for API(≤22))](https://developer.android.com/reference/android/service/notification/NotificationListenerService.html#getActiveNotifications(java.lang.String[]))

### Chú ý
Hãy đảm bảo rằng quyền truy cập Notification trong Setting đã được cho ứng dụng tương ứng (nếu `NotificationListenerService` được sử dụng). Nếu không, việc truy cập dữ liệu StatusBarNotifications là không thể

![Setting](https://miro.medium.com/max/3476/1*TqQqkhJoX937tLAvUhdumA.png)

Như thế, cái mà chúng ta sẽ làm ở đây là:
Đầu tiên, chúng ta sẽ sắp xếp các `activeNotifications` dựa trên thời gian post

```kotlin
Collections.sort(currentNotifications, compareNotificationByPostTime)
```

`compareNotificationByPostTime` là một custom comparator để sắp xếp mảng các notification dựa trên thời gian post.

```kotlin
private val compareNotificationByPostTime = Comparator<StatusBarNotification> { o1, o2 ->
    return@Comparator (o1.postTime).compareTo(o2.postTime)
}
```

Dưới đây là logic mà chúng ta cần kiểm tra giới hạn số lượng Notification và cập nhật thông báo trên StatusBar

```kotlin
when (currentNotifications.size) {
    in NOTIFICATION_START_LIMIT..getMaxNotificationsCount() -> {
        notifyUser(notificationManager)
    }
    
    else -> {
        Collections.sort(currentNotifications, compareNotificationByPostTime)
                if (currentNotifications.isNotEmpty()) {
                    notificationManager.cancel(currentNotifications.first().tag,
                        currentNotifications.first().id)
                    notifyUser(notificationManager)
                }
    }
}
```

Chúng ta đang kiểm tra xem activeNotifications có nằm trong giới hạn yêu cầu không. Nếu không, chúng ta sẽ hủy Notification được đăng cũ nhất trên StatusBar và sau đó thông báo cho người dùng bằng Notification mới nhất.

Như vậy, theo cách này, ngay cả khi người dùng không xóa thông báo trong một khoảng thời gian nhất định, anh ta vẫn có thể được cập nhật các thông báo mới nhất ngay cả khi có giới hạn thông báo tối đa cho mỗi ứng dụng được đăng.

Tôi hi vọng bài đăng này có thể giúp được cho một vài người!

Nguồn [The Notification Limit per app in Android](https://medium.com/mindorks/the-notification-limit-per-app-in-android-94af69a6862c)