Xin chào các bạn, Hôm nay là 30 tết rồi, ngồi ngắm trời chờ đón giao thừa, trong lúc rảnh rỗi mình quyết định ngồi viết bài sau 1 thời gian vắng bóng.<br>
Tiện gần đây mình được hỏi về vấn đề  "**Làm thế nào để hiển thị 1 Activity trên màn hình khóa**" như các ứng dụng Zalo, Whatsapp làm để hiển thị Activity khi có cuộc gọi đến. Dưới đây là ảnh InComingCall Activity của Zalo<br><br><br>
![](https://images.viblo.asia/97b5b3c1-92f9-4ce2-a2b7-635561b2e0f3.png)
<br>

Trong các version android trước đây, để hiển thị 1 thứ gì đó trên màn hình khóa, các bạn có thể nghĩ đến cách hiển thị 1 view lên màn hình bằng WindowManager với các type và flags phù hợp. Nhưng với các phiên bản Android gần đây, ví dụ android 10(Android Q) hoặc android 11(Android R) thì hướng đi đó không còn hoạt động,
Hôm nay mình sẽ hướng dẫn các bạn 1 cách để hiển thị Activity trên màn hình khóa bằng cách dùng **Notification** với **High priority**, **Call category** cùng với "**Full-Screen intent**".<br>
Để hiển thị được 1 Activity trên màn hình khóa, mình sẽ làm các bước sau:<br>
### **1. Tạo 1 ForegroundService để hiển thị 1 notification, service này sẽ được khởi chạy khi có cuộc gọi đến**<br>
### **2. Tạo notification với High priority, Call Category và Full-Screen intent.**<br>
### **3. Gửi broadcast để kích hoạt full screen intent.**<br>
### **4. Tạo Full screen Activity, đây chính là màn hình sẽ được hiển thị trên màn hình khóa**<br>
### **5. Khai báo Activity, Service trong file AndroidManifest, đồng thời khai báo các quyền cần sử dụng.**<br>
### **6. Test ứng dụng.**<br><br>

Cùng đi vào chi tiết nào<br>
### **B1**: Tạo 1 ForegroundService để hiển thị 1 notification, service này sẽ được khởi chạy khi có cuộc gọi đến<br>
Để tạo Service ta sẽ tạo 1 class có tên là **IncomingCallService** và extends **Service**, sau đó trong phương thức **onStartCommand** chúng ta sẽ viết code như sau:<br>
```java
 public class IncomingCallService extends Service {
     public int onStartCommand(Intent intent, int flags, int startId) {
         Notification notification = buildNotification();
         startForeground(1, notification);
         return START_NOT_STICKY;
     }
 }
```
<br>
Trong phương thức onStartCommand, các bạn nhìn thấy mình tạo 1 notification và gọi phương thức startForeground để hiển thị notification đó với id =1, Service là 1 thành phần chính của android, nên nếu bạn nào chưa biết rõ về Service thì có thể tham khảo tại [Đây](https://developer.android.com/guide/components/services) <br>

### **B2**: Tạo notification với High priority, Call category và Full screen intent<br>
Mình sẽ implement phương thức buildNotification, phương thức này sẽ trả về 1 notification với High priority, Call category và Full-Screen intent.<br>

```java
    private Notification buildNotification() {
        Intent fullScreenIntent = new Intent(this, IncomingCallActivity.class);
        PendingIntent fullScreenPendingIntent = PendingIntent.getActivity(this, 0, fullScreenIntent, PendingIntent.FLAG_UPDATE_CURRENT);
        NotificationManager notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);

        NotificationCompat.Builder notificationBuilder =
            new NotificationCompat.Builder(this)
                    .setSmallIcon(R.drawable.ic_notification_icon)
                    .setContentTitle("Incoming call")
                    .setContentText("(919) 555-1234")
                    .setPriority(NotificationCompat.PRIORITY_HIGH)
                    .setCategory(NotificationCompat.CATEGORY_CALL)
                    // Use a full-screen intent only for the highest-priority alerts where you
                    // have an associated activity that you would like to launch after the user
                    // interacts with the notification. Also, if your app targets Android 10
                    // or higher, you need to request the USE_FULL_SCREEN_INTENT permission in
                    // order for the platform to invoke this notification.
                    .setFullScreenIntent(fullScreenPendingIntent, true);
        notificationBuilder.setAutoCancel(true);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            notificationManager.createNotificationChannel(new NotificationChannel("123", "123", NotificationManager.IMPORTANCE_HIGH));
            notificationBuilder.setChannelId("123");
        }
        return notificationBuilder.build();
    }
```
<br>
Mình cùng đi chi tiết về phương thức build notification nào.
Đầu tiên mình tạo 1 PendingIntent, PendingIntent này sẽ start InComingCallActivity khi người dùng click notification. bạn có thể đọc thêm về PendingIntent tại [đây](https://developer.android.com/reference/android/app/PendingIntent) .<br>
Tiếp theo đó mình tạo notification bằng NotifcationCompat.Buider, chúng ta cung cấp icon, title, text..vv. Quan trọng nhất ở đây là bạn phải có 3 dùng code dưới đây để set priority, category và full screen intent cho notification.<br>

```
setPriority(NotificationCompat.PRIORITY_HIGH)
setCategory(NotificationCompat.CATEGORY_CALL)
setFullScreenIntent(fullScreenPendingIntent, true);
```
<br>
Từ android O trở đi, bạn phải thêm channel để hiển thị notification, nếu không có notification channel thì notification của bạn sẽ không được hiển thị tới người dùng. Bạn có thể đọc thêm về notification channel tại [đây](https://developer.android.com/training/notify-user/channels). Xong, tiếp theo mình sẽ đi vào bước tiếp theo.


### **B3**: gửi broadcast để **kích hoạt FullScreen-Intent.**.<br>
Sau khi Service được chạy, nó sẽ hiển thị notification, nhưng mục đích của mình là hiển thị Full Screen Activity chứ không phải notification. Ở đây mình sẽ send ACTION_CLOSE_SYSTEM_DIALOGS broadcast,
Với broadcast này, nó sẽ close các system dialog, và notifiation của mình sẽ gọi start PendingIntent, Pending Intent của mình sẽ gọi start Activity như ở **B2**. Để làm việc này mình chỉ cần thêm 1 dòng code để sendBroadcast trong method onStartCommand như code dưới đây : <br>

```java
    public int onStartCommand(Intent intent, int flags, int startId) {
        Notification notification = buildNotification();
        startForeground(1, notification);
        sendBroadcast(new Intent(Intent.ACTION_CLOSE_SYSTEM_DIALOGS));
        return START_NOT_STICKY;
    }
```


### **B4**: Tạo 1 Activity để hiển thị trên màn hình khóa<br>
Ở bước này, mình sẽ tạo 1 class có tên là **InComingCallActivity** và cho nó extends **AppCompatActivity**.
Code Activity của mình như sau:<br>

```java
 public class IncomingCallActivity extends AppCompatActivity {
     protected void onCreate(@Nullable Bundle savedInstanceState) {
         super.onCreate(savedInstanceState);
         setContentView(R.layout.activity_explore);
         setShowWhenLocked(true);
         setTurnScreenOn(true);
         getWindow().addFlags(
             WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED
                     | WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD
                     | WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
                     | WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
                     | WindowManager.LayoutParams.FLAG_ALLOW_LOCK_WHILE_SCREEN_ON);
     }
 }
```
<br>
Trong bài này mình chỉ muốn hiển thị được activity trên màn hình khóa nên code Activity của mình rất ngắn gọn, sau này bạn sẽ phải thêm logic của ứng dụng của bạn vào đây. Trong Activity bạn sẽ phải thêm mấy phương thức như:<br>

**setShowWhenLocked** : Phương thức này cho phép Activity của bạn hiển thị ngay cả khi màn hình khóa.<br>
**setTurnScreenOn**  : Phương thức này sẽ turn on screen của bạn lên.<br>
Mình cũng sẽ thêm code giao diện của mình ở đây, bạn có thể thay đổi giao diện theo ý bạn muốn. <br>

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/teal_700">

    <androidx.cardview.widget.CardView
        android:id="@+id/cardView"
        android:layout_width="150dp"
        android:layout_height="150dp"
        app:cardCornerRadius="75dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.13999999">

        <ImageView
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:scaleType="centerCrop"
            android:src="@drawable/download" />
    </androidx.cardview.widget.CardView>

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="0999999999"
        android:textColor="@color/white"
        android:textSize="34sp"
        android:textStyle="bold"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/cardView"
        app:layout_constraintVertical_bias="0.1" />

    <TextView
        android:id="@+id/textView2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Đang gọi..."
        android:textColor="@color/white"
        android:textSize="20sp"
        android:textStyle="bold"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView"
        app:layout_constraintVertical_bias="0.1" />


    <ImageView
        android:id="@+id/imb_reject"
        android:layout_width="60dp"
        android:layout_height="60dp"
        android:src="@drawable/bg_reject"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toStartOf="@+id/imb_accept"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView"
        app:layout_constraintVertical_bias="0.75" />

    <ImageView
        android:id="@+id/imb_accept"
        android:layout_width="60dp"
        android:layout_height="60dp"
        android:src="@drawable/bg_accept"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/imb_reject"
        app:layout_constraintTop_toBottomOf="@+id/textView"
        app:layout_constraintVertical_bias="0.75" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

<br>

### **B5**: Khai báo Activity, Service và các quyền cần thiết.<br>
Như các bạn đã biết, tất cả các thành phần quan trọng và các quyền mà ứng dụng sử dụng đều cần khai báo trong file AndroidManifest. Do ở trên mình đã tạo 1 Activity và 1 Service nên mình sẽ khai báo chúng trong AndroidManifest và ứng dụng của mình cũng cần 2 quyền là USE_FULL_SCREEN_INTENT và FOREGROUND_SERVICE.<br>

```xml
 <uses-permission android:name="android.permission.USE_FULL_SCREEN_INTENT" />
 <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
 <application>
     <activity android:name=".IncomingCallActivity" />
     <service
         android:name=".IncomingCallService"
         android:enabled="true"
         android:exported="true" />
 </application>
```


### **B6: Test ứng dụng.**
Trong thực để, InComingCallService sẽ cần được start khi có cuộc gọi đến. để start service, bạn chỉ cần xác định chỗ sẽ gọi phương thức start vào thêm đoạn code dưới đây :<br>

```java
 public void startCallService() {
     Intent intent = new Intent(context, IncomingCallService.class);
     startForegroundService(intent);
 }
```
<br>
Nhưng trên ví dụ này, mình không tập trung vào logic của ứng dụng call, mà mình chỉ muốn hướng dẫn các bạn phần hiển thị phần hiển thị Activity trên màn hình khóa, Nên sau khi các bạn triển khai code xong, các bạn cài đặt ứng dụng vào máy, sau đó các bạn khóa màn hình điện thoại vào và sử dụng command line dưới đây trên terminal hoặc command line window để test ứng dụng:<br>

```
adb shell am start-foreground-service com.ddona.call/.IncomingCallService
```

Các bạn nhớ thay "**com.ddona.call**" thành package name của ứng dụng bạn đang viết nhá.<br>
**Lưu ý:** Với điện thoại Xaomi, bạn cần cấp thêm quyền cho ứng dụng bằng các bước dưới đây thì ứng dụng mới hoạt động được:<br>
1. Long click to you app icon
2. Open app info
3. Click to "Other permission" item
4. Allow show on Lock screen

Bài viết của mình đến đây là kết thúc. Hy vọng rằng các bạn sẽ áp dụng được kỹ thuật này vào ứng dụng của các bạn. 
Một năm mới cũng sắp tới. Tiện đây mình cũng xin chúc các bạn cùng gia đình 1 năm mới sức khỏe, thành công và hạnh phúc. **HAPPY NEW YEAR!!**

Các bạn có thể tham khảo source code demo tại [Đây](https://github.com/doanpt/PhoneActivity.git). Ngoài ra các bạn có thể đọc thêm về full screen intent tại [đây](https://developer.android.com/training/notify-user/time-sensitive)