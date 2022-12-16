# Mở đầu
Hiện nay với sự bùng nổ của mạng xã hội. Nhu cầu giau tiếp online cũng ngày càng tăng. Việc tích hợp cuộc gọi vào ứng dụng được sử dụng ngày càng nhiều.

Vậy các ứng dụng đó nhận cuộc gọi tới như thế nào. Ở đây mình sẽ trình bày cho mọi người cách hiển thị popup khi có cuộc gọi đến. Mình sẽ sử dụng firebase data message để gửi và nhận sự kiện khi có cuộc gọi.
    

## Triển khai
- Khi có cuộc gọi đến thì sẽ có 2 trường hợp: Background và Forground. 
- Mình sẽ sử dụng firebase data message để đảm bảo người dùng có thể nhận cuộc gọi ở cả 2 trường hợp trên.

### 1. Notification layout.
- Notification này sẽ được hiển thị khi có cuộc gọi đến.
- Các icons này mình sử dụng các vectors assets có sẵn trong android studio.
- ![image.png](https://images.viblo.asia/55bbfa80-5059-4d86-b550-4a0a43a0121d.png)
```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="100dp"
    android:background="@drawable/bg_incomming_call_popup"
    android:gravity="center_vertical"
    android:orientation="horizontal">

    <ImageView
        android:layout_width="46dp"
        android:layout_height="46dp"
        android:layout_marginStart="16dp"
        android:background="@drawable/bg_default_avatar"
        android:src="@drawable/ic_default_avatar"
        android:scaleType="fitCenter" />

    <LinearLayout
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_marginStart="16dp"
        android:layout_weight="1"
        android:gravity="center_vertical"
        android:orientation="vertical">

        <TextView
            android:id="@+id/tvName"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textColor="@color/white"
            android:textSize="16sp"
            android:textStyle="bold"
            tools:text="Thinh Nguyen" />

        <TextView
            android:id="@+id/tvIncommingCall"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Incoming Call"
            android:textColor="@color/white" />

    </LinearLayout>

    <ImageView
        android:id="@+id/btnRejectCall"
        android:layout_width="40dp"
        android:layout_height="40dp"
        android:background="@drawable/bg_reject_call"
        android:scaleType="centerInside"
        android:src="@drawable/ic_reject_call" />

    <ImageView
        android:id="@+id/btnAcceptCall"
        android:layout_width="40dp"
        android:layout_height="40dp"
        android:layout_marginStart="8dp"
        android:layout_marginEnd="16dp"
        android:background="@drawable/bg_accept_call"
        android:scaleType="centerInside"
        android:src="@drawable/ic_accept_call" />

</LinearLayout>
```

### 2. Tạo 1 activity để hiển thị cuộc gọi đến:
- Màn hình này sẽ dùng để hiển thị full screen nếu thiết bị không bị giới hạn quyền. Nếu bị giới hạn quyền thì màn hình này sẽ được hiển thị chỉ khi người dùng click  vào notification.
- ![image.png](https://images.viblo.asia/d3f2bf08-228c-4f8a-91b3-370ba8fa653c.png)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#99512807">

    <androidx.appcompat.widget.AppCompatImageView
        android:id="@+id/imgUserAvatar"
        android:layout_width="80dp"
        android:layout_height="80dp"
        android:background="@drawable/bg_default_avatar"
        android:scaleType="fitCenter"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.2"
        tools:src="@drawable/ic_default_avatar" />

    <TextView
        android:id="@+id/tvName"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        android:textColor="@color/white"
        android:textSize="16sp"
        android:textStyle="bold"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/imgUserAvatar"
        tools:text="Thinh Nguyen" />

    <TextView
        android:id="@+id/tvIncomingCall"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Incoming Call ..."
        android:textColor="@color/white"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/tvName" />

    <androidx.appcompat.widget.AppCompatImageView
        android:id="@+id/btnRejectCall"
        android:layout_width="52dp"
        android:layout_height="52dp"
        android:layout_marginBottom="32dp"
        android:background="@drawable/bg_reject_call"
        android:scaleType="centerInside"
        android:src="@drawable/ic_reject_call"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toStartOf="@id/btnAcceptCall"
        app:layout_constraintStart_toStartOf="parent" />

    <androidx.appcompat.widget.AppCompatImageView
        android:id="@+id/btnAcceptCall"
        android:layout_width="52dp"
        android:layout_height="52dp"
        android:layout_marginStart="8dp"
        android:layout_marginEnd="16dp"
        android:layout_marginBottom="32dp"
        android:background="@drawable/bg_accept_call"
        android:scaleType="centerInside"
        android:src="@drawable/ic_accept_call"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toEndOf="@id/btnRejectCall" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

```kotlin
class IncomingCallActivity : AppCompatActivity(){

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_incoming_call)
        registerViewsEvent()
    }

    private fun registerViewsEvent() {
        findViewById<AppCompatButton>(R.id.btnRejectCallActivity).setOnClickListener {
            val callingService = Intent(this, CallingService::class.java)
            stopService(callingService)
        }

        findViewById<AppCompatButton>(R.id.btnAcceptCall).setOnClickListener {
            // TODO start calling screen
        }
    }
}
```

### 3. Tạo 1 class kế thừa BroadcastReceiver
- Class này có dùng để hủy cuộc gọi đến và close popup nếu người dùng click vào cancel.
```kotlin
class HangUpBroadcast : BroadcastReceiver() {
    override fun onReceive(p0: Context?, p1: Intent?) {
        p0?.let { context ->
            val intent = Intent(context, CallingService::class.java)
            context.stopService(intent)
        }
    }
}
```
### 4. Calling service.
- Service này dùng để khởi tạo và hiển thị notification cho user
```kotlin
class CallingService : Service() {
    companion object {
        const val CHANNEL_ID = "Calling channel id"
    }

    override fun onBind(p0: Intent?): IBinder? {
        return null
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        showIncomingCallPopup()
        return START_STICKY
    }

    @SuppressLint("RemoteViewLayout")
    private fun showIncomingCallPopup() {
        val hangupIntent = Intent(applicationContext, HangUpBroadcast::class.java)
        val hangupPendingIntent = PendingIntent.getBroadcast(applicationContext, 0, hangupIntent, PendingIntent.FLAG_UPDATE_CURRENT)
        val incomingCallIntent = Intent(applicationContext, IncomingCallActivity::class.java)
        val incomingCallPendingIntent = PendingIntent.getActivity(applicationContext, 0, incomingCallIntent, PendingIntent.FLAG_UPDATE_CURRENT)
        val answerIntent = Intent(applicationContext, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_CLEAR_TASK or Intent.FLAG_ACTIVITY_NEW_TASK
        }
        val answerPendingIntent = PendingIntent.getActivity(applicationContext, 0, answerIntent, PendingIntent.FLAG_UPDATE_CURRENT)

        val customView = RemoteViews(packageName, R.layout.incoming_call_popup).apply {
            setOnClickPendingIntent(R.id.btnAcceptCall, answerPendingIntent)
            setOnClickPendingIntent(R.id.btnRejectCall, hangupPendingIntent)
        }

        createNotificationChanel()
        val notification = NotificationCompat.Builder(applicationContext, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_launcher_foreground)
            .setContent(customView)
            .setFullScreenIntent(incomingCallPendingIntent, true)
            .setPriority(NotificationCompat.PRIORITY_MAX)
            .setVibrate(longArrayOf(0, 500, 1000))
            .setSound(Uri.parse("android.resource://" + packageName + "/" + R.raw.ring_stone))
            .setAutoCancel(true)
        startForeground(1024, notification.build())
    }

    private fun createNotificationChanel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
        {
*             val audioAttributes = AudioAttributes.Builder()
                .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                .setUsage(AudioAttributes.USAGE_NOTIFICATION)
                .build()
            val name = "Incoming call"
            val important = NotificationManager.IMPORTANCE_HIGH
            val channel = NotificationChannel(CHANNEL_ID, name, important)
            channel.setSound(Uri.parse("android.resource://" + packageName + "/" + R.raw.ring_stone), audioAttributes)
            val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.createNotificationChannel(channel)
        }
    }
}
```
### 5. Tạo class kế thừa FirebaseMessagingService.
- Class này dùng để nhận sự kiện cuộc gọi đến và khởi chạy calling service.
```kotlin
class AppFirebaseMessagingService : FirebaseMessagingService() {
    companion object {
        const val TYPE_INCOMING_CALL = "type_incoming_call"
    }

    override fun onNewToken(token: String) {
        super.onNewToken(token)
        Log.i("xxxxx", "Fcm token is: $token")
    }

    override fun onMessageReceived(message: RemoteMessage) {
        super.onMessageReceived(message)
        if (message.data["type"] == TYPE_INCOMING_CALL) {
            showIncomingCallPopup()
        }
    }

    private fun showIncomingCallPopup() {
        val intent = Intent(this, CallingService::class.java)
        startService(intent)
    }
}
```
# Gửi event
Mình sẽ sử dụng postman để gửi firebase data message, với cú pháp như bên dưới:
https://fcm.googleapis.com/fcm/send
Content-Type:application/json
Authorization:key=AIzaSyZ-1u...0GBYzPu7Udno5aA  - Sử dụng server key trong firebase console
```json
{
    "to": "euno-vuFRA6dF...-rcsIM",
    "data": {
        "type": "incoming_call",
        "user_name": "Jonson",
        "user_avatar": "avatar",
    }
}
```

# Permission
```xml
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
 <uses-permission android:name="android.permission.USE_FULL_SCREEN_INTENT" />
``` 
#  Kết quả

![image.png](https://images.viblo.asia/d76fda3b-1800-4b25-860d-e7618ac81d66.png)