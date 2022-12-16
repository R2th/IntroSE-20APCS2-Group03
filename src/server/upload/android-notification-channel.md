## Giới thiệu

Kể từ Android 8.0 (API 26), mọi notification đều phải được gắn với một channel. Với mỗi channel thì bạn có thể set các đặc điểm chung cho tất cả các notification thuộc channel đó. Và người dùng có thể thay đổi những thông số của các channel theo ý họ muốn.

```kotlin
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
    // Create the NotificationChannel
    val name = getString(R.string.channel_name)
    val descriptionText = getString(R.string.channel_description)
    val importance = NotificationManager.IMPORTANCE_DEFAULT
    val mChannel = NotificationChannel(CHANNEL_ID, name, importance)
    mChannel.description = descriptionText
    // Register the channel with the system; you can't change the importance
    // or other notification behaviors after this
    val notificationManager = getSystemService(NOTIFICATION_SERVICE) as NotificationManager
    notificationManager.createNotificationChannel(mChannel)
}
```

Ví dụ về cách tạo một notification channel, lưu ý rằng một khi bạn đã tạo channel thì bạn ko thể thay đổi các cài đặt và user mới là người có thể sửa đổi channel.

## Set the importance level

Việc chọn importance level phù hợp sẽ giúp cho notification mang thông tin có ích mà lại không gây khó chịu cho user. Các bạn có thể tham khảo bảng định nghĩa các mức importance level và đặc điểm ở bảng dưới.

![Screenshot-from-2021-06-20-15-42-48.png](https://images.viblo.asia/a33de0bf-983d-49c3-aa6a-8afdf042e757.png)

Ví dụ: Một cuộc gọi đến thì nên có IMPORTANCE_HIGH,
một thông báo về việc app có phiên bản mới nhưng ko phải là bản force update thì chỉ nên để IMPORTANCE_LOW

CÙng so sánh một chút nhé, IMPORTANCE_HIGH và IMPORTANCE_DEFAULT khác nhau ở điểm gì?

- IMPORTANCE_HIGH ngoài có âm thanh, xuất hiện trên status bar thì còn hiện cả nội dung của noti dù bạn đang ở ứng dụng khác

![43uVZ.png](https://images.viblo.asia/daf73fce-60a1-435d-ba8b-ada5c57f9c86.png)

src https://i.stack.imgur.com/43uVZ.png

- IMPORTANCE_DEFAULT chỉ có âm thanh, xuất hiện trên status bar mà ko hiện nội dung noti

- IMPORTANCE_LOW thì khác IMPORTANCE_DEFAULT là ko có sound luôn, chỉ xuất hiện trên status bar

- IMPORTANCE_MIN	ko xuất hiện trên status bar nhưng vẫn có trong list notification khi vuốt từ status bar

## Tương tác với channel

Như mình đã nói ở trên thì một khi tạo ra channel thì bạn ko thể sửa nó, user thì có thể sửa bất kỳ lúc nào từ setting noti của app? Vậy về phía dev thì có thể làm gì với channel ko? Ngoài việc sử dụng channel thì bạn có thể

- Đọc các setting của channel
- Tạo intent điều hướng tới setting của channel
- Xóa channel

Ngoài ra bạn có thể tạo channel group cho trường hợp ứng dụng hỗ trợ nhiều loại account như work và cá nhân. Tương tự như channel thì một khi đã tạo là bạn ko thể thay đổi cài đặt của channel group.

```kotlin
// The id of the group.
val groupId = "my_group_01"
// The user-visible name of the group.
val groupName = getString(R.string.group_name)
val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
notificationManager.createNotificationChannelGroup(NotificationChannelGroup(groupId, groupName))
```

## FCM hỗ trợ channel

Khi tạo noti từ firebase các bạn có thể điền channel id tương ứng mà đã tạo trên app để có các setting phù hợp nhất nhé.

![Screenshot-from-2021-06-20-16-15-12.png](https://images.viblo.asia/0605451c-123f-42b8-9585-60df8e77f4c9.png)

## Ví dụ về channel trong app

Dưới đây là một số ví dụ về cài đặt channel của các app phổ biến mà bạn có thể tham khảo

![youtube noti channel.png](https://images.viblo.asia/f65861cd-ba23-41b2-a844-273e7cf88b07.png)

![chrome noti channel.png](https://images.viblo.asia/dede60d1-1f1f-4a22-ac10-40174a792f33.png)

![gmail noti channel.png](https://images.viblo.asia/755d3ddc-241f-4005-b90a-73c7d1546469.png)


## Đọc thêm

https://developer.android.com/guide/topics/ui/notifiers/notifications