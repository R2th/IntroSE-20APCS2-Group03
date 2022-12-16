# Giới thiệu
Notification channel và badges là 1 phần mới từ bản Android O (8.0). Từ Android 8.0 trở đi, thì notification của bạn sẽ được chia thành nhiều kênh khác nhau phụ thuộc vào loại notification nào mà bạn đã gửi đi.

#### Tại sao phải biết Notification Channels ?
Vì tất cả ứng dụng được chạy từ android O (8.0) trở lên đều phải có notification channel. Nếu ứng dụng của bạn không sử dụng hay định nghĩa đúng cách thì sẽ không thể hiển thị bất kỳ 1 notification nào.

Bạn có thể nhìn thấy notification channel được biểu diễn dưới dạng notification categories và notification badges. 

Về **notification categories** có dạng như sau:

![](https://i.imgur.com/hEOfIe6h.png)

![](https://i.imgur.com/7dNtCI4h.png)

Và **notification badges** có dạng như sau:

![](https://i.imgur.com/ar5h5jZ.png)

> Lưu ý:
> Thời điểm hiện tại thì các launcher chưa hỗ trợ badges. Nếu bạn muốn xem trải nghiệm đầy đủ của badges thì bạn phải kiểm tra xem devices có được hỗ trợ hay không
> 
> Hoặc có cách khác là bạn chạy mảy ảo Android O để thử nghiệm 
> 

# Chuẩn bị project demo
Để tiện theo dõi ví dụ bạn hãy clone project này về máy để chạy:

```
$ git clone https://github.com/googlecodelabs/notification-channels-java.git
$ cd notification-channels-java
$ git checkout origin/Solution-4_Badging
```

Khi bạn chạy project sẽ được như sau:

![](https://i.imgur.com/kQwD1RJh.png)

# Tạo notification channel
Trong demo này sẽ ví dụ cho trường hợp:

* Tăng lượt người follower
* Giảm lượng follower
* Nhận message trực tiếp từ bạn bè
* Nhận message trực tiếp từ đồng nghiệp

![](https://i.imgur.com/eceQDlah.png)

Trong file `NotificationHelper.java` chứa tất cả code phục vụ cho việc tạo và gửi notification. 

Ví dụ dưới đây để để setup cho notification
```java
        // Create the channel object with the unique ID FOLLOWERS_CHANNEL
        NotificationChannel followersChannel =
                new NotificationChannel(
                        FOLLOWERS_CHANNEL,
                        getString(R.string.notification_channel_followers),
                        NotificationManager.IMPORTANCE_DEFAULT);

        // Configure the channel's initial settings
        followersChannel.setLightColor(Color.GREEN);
        followersChannel.setLockscreenVisibility(Notification.VISIBILITY_PRIVATE);
        followersChannel.setShowBadge(true);

        // Submit the notification channel object to the notification manager
        getNotificationManager().createNotificationChannel(followersChannel);
        
        // Do the same for the Direct Message channel
        NotificationChannel dmChannel =
                new NotificationChannel(
                        DIRECT_MESSAGE_CHANNEL,
                        getString(R.string.notification_channel_direct_message),
                        NotificationManager.IMPORTANCE_HIGH);
        dmChannel.setLightColor(Color.BLUE);
        dmChannel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
        dmChannel.setShowBadge(true);
        getNotificationManager().createNotificationChannel(dmChannel);
```
Trong đó:
* `FOLLOWERS_CHANNEL` phục vụ cho việc thiết lập kênh cho notification với tên là `Follower Notification Channel`
* Tương tự `DIRECT_MESSAGE_CHANNEL` sẽ là 1 notification channel riêng với tên là `Direct Messages Channel`

**Với code dó ta sẽ có trong  Settings -> Notifications -> Your App -> NotificationChannels**

![](https://i.imgur.com/JOLFSrdh.png)

# Gửi notification
Dưới đây là code ví dụ cho gửi notification, nên nhớ rẳng từ Android 8.0 trở đi bạn phải truyền thêm Channel ID để gửi notification

```java 
public Notification.Builder getNotificationFollower(String title, String body) {
        return new Notification.Builder(getApplicationContext(), FOLLOWERS_CHANNEL)
                .setContentTitle(title)
                .setContentText(body)
                .setSmallIcon(getSmallIcon())
                .setAutoCancel(true)
                .setContentIntent(getPendingIntent());
}
```
Chú ý `FOLLOWERS_CHANNEL` sẽ đóng vai trò là channel id và nó phải khớp với cấu hình setting ở trên thì mới có thể hoạt động được.

# Notification settings
Với mỗi lần bạn tạo notification, bạn muốn mở setting xem mình đã tạo bao nhiêu channel rồi và cũng để xem trải nghiệm người dùng có bị ảnh hưởng không 

![](https://i.imgur.com/7dNtCI4h.png)

Ví dụ code dưới đây sẽ giúp mở notification setting của app lên 

```java
        Intent i = new Intent(Settings.ACTION_APP_NOTIFICATION_SETTINGS);
        i.putExtra(Settings.EXTRA_APP_PACKAGE, getPackageName());
        startActivity(i);
```

Còn mở notification setting của channel thì code sẽ như sau:
```java
private void goToNotificationChannelSettings(String channel) {
        Intent intent = new Intent(Settings.ACTION_CHANNEL_NOTIFICATION_SETTINGS);
        intent.putExtra(Settings.EXTRA_APP_PACKAGE, getPackageName());
        intent.putExtra(Settings.EXTRA_CHANNEL_ID, channel);
        startActivity(intent);
}
```

Trong đó `channel` bạn sẽ gán với 2 giá trị đã được cấu hình từ trước `FOLLOWERS_CHANNEL` và `DIRECT_MESSAGE_CHANNEL`

Ví dụ dưới đây đang mở notification setting của `FOLLOWERS_CHANNEL`

![](https://i.imgur.com/ghJVxTdh.png)

# Notification Badges 
Từ Android O sẽ hỗ trợ notification badges 

![](https://i.imgur.com/ar5h5jZ.png)
Nhưng hiện tại đa số các máy Android hiện tại mới chỉ hỗ trợ như ảnh dưới đây. Còn bạn muốn trải nghiệm nhiều hơn thì hãy chạy máy ảo Android O và chạy ví dụ này để hiểu rõ hơn.

![](https://i.imgur.com/jAtiQIA.png?1)

Đoạn code sau đây sẽ hướng dẫn sử dụng badges
```java
// Create the channel object with the unique ID FOLLOWERS_CHANNEL
        NotificationChannel followersChannel =
                new NotificationChannel(
                        FOLLOWERS_CHANNEL,
                        getString(R.string.notification_channel_followers),
                        NotificationManager.IMPORTANCE_DEFAULT);

        // Configure the channel's initial settings
        followersChannel.setLightColor(Color.GREEN);
        followersChannel.setLockscreenVisibility(Notification.VISIBILITY_PRIVATE);
        followersChannel.setShowBadge(true); //////// enable badges 
```

`setShowBadge` sẽ quyết định notification đó có hiển thị badges hay không. Nếu không gọi method này thì sẽ mặc định được gán giá trị `true`

# Tài liệu tham khảo
https://codelabs.developers.google.com/codelabs/notification-channels-java/index.html?index=..%2F..index#0