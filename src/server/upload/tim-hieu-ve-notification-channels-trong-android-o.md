![](https://images.viblo.asia/eaf6fa29-c5ab-4cdd-a05a-1217c2d73c77.png)

Trong bài viết này chúng ta sẽ cùng nhau tìm hiểu một tính năng mới trong Android O đó là ** Notification Channels**  và làm sao chúng ta sử dụng nó trong project của chúng ta.
### Notification Channels là gì ?
Notification Channels cung cấp cho chúng ta khả năng nhóm các Notification mà ứng dụng của chúng ta đã gửi vào một nhóm có thể được quản lý. Khi các notification của chúng ta đã nằm trong các channel. Chúng ta không còn sử dụng các chứng năng đó nữa. Khi đó người dùng sẽ quản lý những channel này. Khi thay đổi cài đặt notification trong ứng dụng của bạn, người dùng sẽ nhìn thấy các lựa chọn như bên dưới:

![](https://images.viblo.asia/a7b90953-a4ab-44f9-ab84-2ff5861f4982.png)
Bắt đầu từ bên trái, bạn có thể thấy trong màn hình đầu tiên cài đặt notification cho ứng dụng của chúng ta hiển thị phần setting notification cho ứng dụng của chúng ta. Từ đây người dùng sẽ có những lựa chọn:
* khoá tất cả notification channels cho ứng dụng của chúng ta. Điều này có nghĩa rằng tất cả các notification từ ứng dụng của chúng ta sẽ không bao giờ được hiển thị trên device của người dùng.
* Nếu được hỗ trợ, người dùng có thể nêu rõ liệu notificaton từ  ứng dụng của chúng ta có được hiển thị dưới dạng "badges" trên màn hình Home
* Các loại  notification đã tồn tại trong ứng dụng của chúng ta. Từ đây người dùng có thể chọn enable hoặc disable.
Tại màn hình thứ 2 có thể được truy cập khi người dùng lựa chọn một loại notification từ màn hình đầu tiên. Từ đây người dùng có thể đưa ra các lựa chọn:
* Khoá tất cả các notification từ ứng dụng của chúng ta từ loại notification mà chúng ta đã chọn ở trên
* Hiển thị notification từ chanel này bên trong Home App nếu được hỗ trợ

Tại màn hình cuối cùng người dùng cũng có thể thiết lập nhưng notification quan trọng cho channel này. Những lựa chọn ở đây sẽ hiển thị cách người dùng được nhắc khi họ nhận được notification.
Ngoài khả năng nhóm  notification channel  vào trong các group riêng biệt . Chúng ta còn có thể có cùng  notification channel trên nhiều mode của ứng dụng. Cho ví dụ ứng dung của tôi có hỗ trợ mode Personal và  Business hoặc  Child and Parent mode điều này cho phép chúng tôi  đưa ra các lựa chọn quản lý việc setting notification trên nhiều group. Chúng được hiển thị trên cùng vị trí như notification channels của chúng ta ngoại trừ việc tách biệt chúng trong các group tương ứng . Trên các phiên bản android cũ , những tính năng mới hoàn toàn được bỏ qua vậy chúng ta không cần phải lo lắng.

![](https://images.viblo.asia/99924051-0c73-450a-afdd-39da1763d3e2.png)
### Tạo Một notification channel
Nó là khá đơn giản cho việc tạo một notification channel trong ứng dụng của chúng ta. Bây giờ chúng ta sẽ truy cập tới một phương thức được gọi là [ createNotificationChannel()](https://developer.android.com/reference/android/app/NotificationManager#createNotificationChannel%28String%20channelId%29) từ  Notification manager. Chúng tôi sử dụng điều này tạo channels cho ứng dụng notification của chúng ta như bên dưới:

```java 
NotificationManager notificationManager =
        (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

String channelId = "some_channel_id";
CharSequence channelName = "Some Channel";
int importance = NotificationManager.IMPORTANCE_LOW;
NotificationChannel notificationChannel = new NotificationChannel(channelId, channelName, importance);
notificationChannel.enableLights(true);
notificationChannel.setLightColor(Color.RED);
notificationChannel.enableVibration(true);
notificationChannel.setVibrationPattern(new long[]{100, 200, 300, 400, 500, 400, 300, 200, 400});
notificationManager.createNotificationChannel(notificationChannel);
```
Chúng ta có thể thao tác [NotificationChannel](https://developer.android.com/reference/android/app/NotificationChannel) bằng các sử dụng một vài method public mà nó đã cung cấp cho chúng ta:
* [getId ()](https://developer.android.com/reference/android/app/NotificationChannel#getId%28%29) lấy về ID của channel đã cho
* [enableLights() ](https://developer.android.com/reference/android/app/NotificationChannel#enableLights%28boolean%29) nếu thiết bị đang sử dụng hỗ light khi nhận được notification , điều này cho biết có hiển thị light khi nhận được notification hay không
* [setLightColor() ](https://developer.android.com/reference/android/app/NotificationChannel#setLightColor%28int%29) nếu ở trên chúng ta đã setting cho hiển thị light khi nhận được notification, với method này chúng ta sẽ truyền vào một giá trị Int để định nghĩa color của light khi nhận được notification
* [enableVibration() ](https://developer.android.com/reference/android/app/NotificationChannel#enableVibration%28boolean%29) thiêt lập chế độ rung khi nhận được notification
* [setVibrationPattern()](https://developer.android.com/reference/android/app/NotificationChannel#setVibrationPattern%28long[]%29) thiết lập kiểu chế độ rung được sử dụng 
* [setImportance() ](https://developer.android.com/reference/android/app/NotificationChannel#setImportance%28int%29) thiết lập level của interruption cho channel này. đây có thể là 1 giá trị quan trọng 
* [setSound()](https://developer.android.com/reference/android/app/NotificationChannel#setSound%28android.net.Uri,%20android.media.AudioAttributes%29) cung cấp một Uri cho sound khi một notification được gửi đến chanel này.
* [getSound() ](https://developer.android.com/reference/android/app/NotificationChannel#getSound%28%29) lấy về giá trị sound được gắn cho notification
Bạn có thể tìm hiểu nhiều hơn về [NotificationChannel class](https://developer.android.com/reference/android/app/NotificationChannel#enableLights%28boolean%29) [tại đây](https://developer.android.com/reference/android/app/NotificationChannel#enableLights%28boolean%29)
Bây giờ chúng ta đã tạo được notification channel  chúng ta có thể tham chiếu channels ID này khi chúng ta tạo một notification để hiển thị trên thiết bị người dùng
### Tạo một Notification Channels Group
Như đã đề cập trước, chúng ta có thể nhóm những notifications channel vào trong một group để quản lý.Điều này cho phép chúng tao có thể có các notification channel với tên giống nhau nhưng nằm trong các group khác nhau. Diều này là rất hữu ích nếu ứng dụng của chúng ta hỗ trợ nhiều tài khoản hoặc mode
Chúng ta có thể tạo một notification channel group bằng cách sử dụng [createNotificationChannelGroup()](https://developer.android.com/reference/android/app/NotificationManager#createNotificationChannelGroup%28android.app.NotificationChannelGroup%29) method được cung cấp bởi Notification Manager.
Chúng ta cần truyền vào cho [NotificationChannelGroup](https://developer.android.com/reference/android/app/NotificationChannelGroup.html) 2 tham số :
* Group Id : một định danh duy nhất cho group này
* Group Name : Tên cho gourp, tên này sẽ được hiển thị tới người dùng

```java
String groupId = "some_group_id";
CharSequence groupName = "Some Group";
NotificationManager notificationManager =
        (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
notificationManager.createNotificationChannelGroup(new NotificationChannelGroup(groupId, groupName));
```
Khi chúng ta đã tạo được một group , chúng ta có thể sử dụng method  setGroup()  đẻ set group cho một một Notification Channel bằng cách truyền thêm ID của group mà chúng ta muốn liên kết tới 
Ngoài ra chúng ta cũng có thể tạo một nhóm các notification group bằng cách sử dụng method [createNotificationChannelGroups()](https://developer.android.com/reference/android/app/NotificationManager#createNotificationChannelGroups%28java.util.List%3Candroid.app.NotificationChannelGroup%3E%29)

```
NotificationManager notificationManager =
        (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

List<NotificationChannelGroup> notificationChannelGroups = new ArrayList();
notificationChannelGroups.add(new NotificationChannelGroup("group_one", "Group One"));
notificationChannelGroups.add(new NotificationChannelGroup("group_two", "Group Two"));
notificationChannelGroups.add(new NotificationChannelGroup("group_three", "Group Three"));

notificationManager.createNotificationChannelGroup(notificationChannelGroups);
```

### Tạo Một Notification
Tạo một a Notification  yêu cầu một channel ID bằng cách sử dụng method [setChannel()](https://developer.android.com/reference/android/app/Notification.Builder#setChannel%28java.lang.String%29). Điều này đảm bảo rằng notification của chúng ta thuộc về một channel để có thể được quản lý bởi người dùng từ setting device của họ

```
NotificationManager notificationManager = 
        (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
int notifyId = 1;
String channelId = "some_channel_id";

Notification notification = new Notification.Builder(MainActivity.this)
        .setContentTitle("Some Message")
        .setContentText("You've received new messages!")
        .setSmallIcon(R.drawable.ic_notification)
        .setChannel(channelId)
        .build();
        
notificationManager.notify(id, notification);
```

###  Việc Đọc Channel Setting
Ứng dụng của chúng ta không có khả năng thay đổi việc setting notification channel nhưng chúng ta có thể đọc những setting trong trường hợp chúng ta muốn thay đổi những hành vi hoặc nhắc người dùng một cái gì đó
Chúng ta có thể sử dụng method [getNotificationChannel()](https://developer.android.com/reference/android/app/NotificationManager.html#getNotificationChannel%28java.lang.String%29) để lấy về một notification channel. Chúng ta chỉ cần gửi ID của channel mà chúng ta request . Khi chúng ta gọi phương thức này, nó sẽ trả cho chúng ta một thể hiện của  NotificationChannel  class.
```
NotificationManager notificationManager =
        (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
NotificationChannel notificationChannel = notificationManager.getNotificationChannel("some_id");
```

Ngoài ra chúng ta cũng có thể lấy toàn bộ notification channel đã được tạo trong ứng dựng của chúng ta bằng cách gọi method [getNotificationChannels()](https://developer.android.com/reference/android/app/NotificationManager.html#getNotificationChannels%28%29). Method này sẽ trả về cho chúng ta một list các NotificationChannel

```
NotificationManager notificationManager =
        (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
List<NotificationChannel> notificationChannels = notificationManager.getNotificationChannels();
```
### Update Việc Setting cho Channel
Sau khi một notification channel đã được tạo người dùng có thể modify băt kì setting của nó. Mặc dù chúng ta không thể modify những setting này ở trong app . Nhưng chúng ta có thể redirect người dùng tới trang setting bên trong màn hình setting của device thông qua action của Intent Settings.ACTION_CHANNEL_NOTIFICATION_SETTINGS. Để làm điều này chúng ta chỉ cần cung cấp 2 extras khi tạo Intent 
EXTRA_CHANNEL_ID : ID của channel setting mà bạn điều hướng người dùng đến
EXTRA_APP_PACKAGE : pakage name ứng dụng của bạn
```
Intent intent = new Intent(Settings.ACTION_CHANNEL_NOTIFICATION_SETTINGS);
intent.putExtra(Settings.EXTRA_CHANNEL_ID, notificationChannel.getId());
intent.putExtra(Settings.EXTRA_APP_PACKAGE, getPackageName());
startActivity(intent);
```

### Delete Một Notification Channel
Nếu chúng ta không muốn sử dụng một notification channel , chúng ta có thể sử dụng method [deleteNotificationChannel()](https://developer.android.com/reference/android/app/NotificationManager.html#deleteNotificationChannel%28java.lang.String%29) được cung cấp bởi API. Khi gọi phương thức này ,bạn đơn giản chỉ cần truyền vào ID của channel mà bạn muốn delete 

```
NotificationManager notificationManager =
        (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
String channelId = "some_channel_id";
NotificationChannel notificationChannel = 
        notificationManager.getNotificationChannel(channelId);
notificationManager.deleteNotificationChannel(notificationChannel);
```

Tài Liệu Tham Khảo
[https://developer.android.com/reference/android/app/NotificationChannel](https://developer.android.com/reference/android/app/NotificationChannel)
[https://medium.com/exploring-android/exploring-android-o-notification-channels-94cd274f604c](https://medium.com/exploring-android/exploring-android-o-notification-channels-94cd274f604c)