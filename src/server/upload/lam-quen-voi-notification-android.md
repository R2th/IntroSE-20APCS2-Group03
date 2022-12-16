> Android cho phép đặt Notification trong thanh tiêu đề của ứng dụng. Người dùng có thể mở Notification và tương tác với Notification để mở Activity tương ứng.
Vì Notification có thể gây khó chịu, người dùng có thể tắt Notification cho mỗi ứng dụng. Để tắt Notification, vào mục Settings của thiết bị Android, chọn ứng dụng mà bạn muốn tắt Notification, rồi bỏ check Show notifications để tắt Notification của ứng dụng đó.
### Thiết lập Notifications
> Notification trong Android được thể hiện thông qua class Notification. Để tạo ra Notification bạn sử dụng class NotificationManager cùng với một Context, chẳng hạn như một activity hoặc một service, thông qua phương thức getSystemService()
```
NotificationManager notificationManager = (NotificationManager)
        getSystemService(NOTIFICATION_SERVICE);
```
> Notification.Builder cung cấp một interface builder để tạo ra một đối tượng Notification. Bạn sử dụng một PendingIntent để chỉ định một hành động được thực hiện khi người dùng bấm vào Notification.
Ví dụ, Notification.Builder sau sẽ thêm vào 3 nút bấm cùng với những hành động được định nghĩa tương ứng khi người dùng chọn Notification :
```
Intent intent = new Intent(this, NotificationReceiver.class);
// use System.currentTimeMillis() to have a unique ID for the pending intent
PendingIntent pIntent = PendingIntent.getActivity(this, (int) System.currentTimeMillis(), intent, 0);

// build notification
// the addAction re-use the same intent to keep the example short
Notification n  = new Notification.Builder(this)
                                .setContentTitle("New mail from " + "test@gmail.com")
                                .setContentText("Subject")
                                .setSmallIcon(R.drawable.icon)
                                .setContentIntent(pIntent)
                                .setAutoCancel(true)
                                .addAction(R.drawable.icon, "Call", pIntent)
                                .addAction(R.drawable.icon, "More", pIntent)
                                .addAction(R.drawable.icon, "And more", pIntent).build();

NotificationManager notificationManager =
        (NotificationManager) getSystemService(NOTIFICATION_SERVICE);

notificationManager.notify(0, n);
```
###  Hủy Notifications
> Người dùng có thể xóa mọi Notifications hoặc nếu bạn thiết lập chúng tự động xóa khi người dùng bấm vào chúng.
Bạn cũng có thể gọi cancel() đối với một Notification ID nhất định trong NotificationManager. Phương thức cancelAll() sẽ xóa mọi Notification bạn tạo ra trước đó.
### Pending Intent
> Một PendingIntent là một token mà bạn đưa đến một ứng dụng khác ( ví dụ notification manager, alarm manager hoặc các ứng dụng bên thứ 3 ) , cho phép ứng dụng khác này sử dụng permission trong ứng dụng của bạn để thực hiện một chức năng nào đó.
Để thực hiện một broadcast thông qua một PendingIntent ta sử dụng phương thức getBroadcast() của lớp PendingIntent.
Ví dụ 
Tạo một Project mới với activity là CreateNotificationActivity. Activity naỳ sẽ sử dụng layout main.xml :
```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical" >

    <Button
        android:id="@+id/button1"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:onClick="createNotification"
        android:text="Create Notification" >
    </Button>

</LinearLayout>
```
Tạo thêm một Activity mới tên là NotificationReceiverActivity, nhớ khai báo trong Manifest nhé :D
```
public class NotificationReceiverActivity extends Activity {
        @Override
        protected void onCreate(Bundle savedInstanceState) {
                super.onCreate(savedInstanceState);
                setContentView(R.layout.result);
        }
}
```
Quay lại với activity CreateNotificationActivity :
```
public class CreateNotificationActivity extends Activity {
        @Override
        public void onCreate(Bundle savedInstanceState) {
                super.onCreate(savedInstanceState);
                setContentView(R.layout.main);
        }

        public void createNotification(View view) {
                // Prepare intent which is triggered if the
                // notification is selected
                Intent intent = new Intent(this, NotificationReceiverActivity.class);
                PendingIntent pIntent = PendingIntent.getActivity(this, (int) System.currentTimeMillis(), intent, 0);

                // Build notification
                // Actions are just fake
                Notification noti = new Notification.Builder(this)
                                .setContentTitle("New mail from " + "test@gmail.com")
                                .setContentText("Subject").setSmallIcon(R.drawable.icon)
                                .setContentIntent(pIntent)
                                .addAction(R.drawable.icon, "Call", pIntent)
                                .addAction(R.drawable.icon, "More", pIntent)
                                .addAction(R.drawable.icon, "And more", pIntent).build();
                NotificationManager notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
                // hide the notification after its selected
                noti.flags |= Notification.FLAG_AUTO_CANCEL;

                notificationManager.notify(0, noti);

        }
}
```
*ok sau khi chạy  notification chúng ta click vào thì nó sẽ hiện ra Acti vi ty thứ 2*
### Một số điều lưu ý với Notification :
> 1 . SetDefaultAll() : Nó cho chúng ta những thứ mặc định khi xuất hiện Notification như là tiếng chuông , độ rung , hay Heads up Notification 
> 2 . Về việc Back to app : Khi app chưa kill hẵn nghĩa là vẫn còn đang chạy đa nhiệm : khi click vào notification thì Event sẽ chạy vào hàm OnNewIntent bắn về đó 1 Intent Gồm 1 gói Bundle 
> Còn khi kill app thì bắn về ở OnCreate 1 bundle gồm các thông tin khi các bạn build notification 

**Trên đây là 1 số thứ về Notification cơ bản cho những bạn mới bắt đầu , ok hẹn gặp lại các bạn **