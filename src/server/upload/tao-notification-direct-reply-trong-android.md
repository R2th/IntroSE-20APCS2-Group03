Android Notification Direct Reply cho phép chúng ta có thể reply nhanh tin nhắn trong notification của hệ thống. Notification Direct Reply rất phổ biến trong các ứng dụng chat cần reply tức thì như Whatsapp hay Facebook messenger. Kể từ phiên bản Android Nougat chúng ta được cung cấp thêm một vài tính năng mới như Inline Reply Actions và Bundle Notifications... Bắt đầu thôi nào!

### Giao diện
Chúng ta sẽ làm một sample đơn giản với một button, sau khi click vào button đó thì sẽ có notification và chúng ta sẽ reply ngay trên notification đó. Trong activity_main.xml sẽ có 2 control như sau:
```kotlin
<Button
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginBottom="8dp"
        android:layout_marginEnd="8dp"
        android:layout_marginStart="8dp"
        android:layout_marginTop="8dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        android:background="@color/colorAccent"
        android:text="Make notification"
        android:textColor="#FFF"
        android:id="@+id/btn_noti"
        android:onClick="makeNoti"/>

    <TextView
        android:id="@+id/txt_inline_reply"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Replied text will be displayed here"
        android:layout_marginTop="8dp"
        app:layout_constraintTop_toBottomOf="@+id/btn_noti"
        android:layout_marginLeft="8dp"
        app:layout_constraintLeft_toLeftOf="parent"
        android:layout_marginRight="8dp"
        app:layout_constraintRight_toRightOf="parent" />
```

### Chức năng
Với button có sự kiện onClick="makeNoti", chúng ta sẽ implement sự kiện này trong MainActivity. Hàm onCreate của MainActivity sẽ chỉ findViewById như bình thường
```kotlin
@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnBasicInlineReply = (Button) findViewById(R.id.btn_noti);
        txtReplied = (TextView) findViewById(R.id.txt_inline_reply);
    }
```
Sự kiện onClick của button sẽ tạo notification, mình viết trong một riêng cho đỡ dài :smiley: 

```kotlin
public void makeNoti(View view) {
        buildNotification();
    }
```
Trong hàm buildNotification, chúng ta sẽ tạo một notification có title, message và có reply button để có thể reply ngay trong notificaiton.
```kotlin
private void buildNotification() {

        //Create notification builder
        NotificationCompat.Builder mBuilder = new NotificationCompat.Builder(this)
                .setSmallIcon(R.drawable.messages_icon)
                .setLargeIcon(BitmapFactory.decodeResource(this.getResources(),
                        R.drawable.messages_icon))
                .setContentTitle("Message")
                .setContentText("Hello from Android")
                .setStyle(new NotificationCompat.BigTextStyle()
                        .bigText("Hello from Android \nMuch longer text that cannot fit one line..."))
                .setPriority(NotificationCompat.PRIORITY_DEFAULT);

        String replyLabel = "Type to reply...";
        //Initialise RemoteInput
        RemoteInput remoteInput = new RemoteInput.Builder(KEY_TEXT_REPLY).setLabel(replyLabel).build();
        Intent resultIntent = new Intent(this, MainActivity.class);
        resultIntent.putExtra("notificationId", NOTIFICATION_ID);

        resultIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        PendingIntent resultPendingIntent = PendingIntent.getActivity(this, 0, resultIntent, PendingIntent.FLAG_UPDATE_CURRENT);

        NotificationCompat.Action replyAction = new NotificationCompat.Action.Builder(R.drawable.messages_icon, "REPLY", resultPendingIntent)
                .addRemoteInput(remoteInput)
                .setAllowGeneratedReplies(true)
                .build();

        mBuilder.addAction(replyAction);

        NotificationManagerCompat mNotificationManager = NotificationManagerCompat.from(this);

        mNotificationManager.notify(NOTIFICATION_ID, mBuilder.build());
    }
```

Phần tạo notification để reply không có gì khác so với việc tạo notification bình thường, nhưng ở đây ta sẽ add thêm một RemoteInput. RemoteInput này sẽ tạo một text input với placeholder là replyLabel và một KEY_TEXT_REPLY để nhận text mà user nhập vào trong reply TextBox. Sau đó sẽ gửi 1 Intent về lại chính activity này để hiển thị text đã được nhập trong RemoteInput.

Xử lý thêm 1 chút để nhận được text rồi set lại cho textbox:
```kotlin
private void processInlineReply(Intent intent) {
        Bundle remoteInput = RemoteInput.getResultsFromIntent(intent);
        if (remoteInput != null) {
            String reply = remoteInput.getCharSequence(KEY_TEXT_REPLY).toString();

            txtReplied.setText(reply);

            NotificationManager manager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            manager.cancel(NOTIFICATION_ID);
        }
    }
```
Chúng ta sẽ được app như sau:
![](https://images.viblo.asia/70c265e0-81d1-41ed-a5c8-e5d2274a7261.gif)

Cảm ơn mọi người đã đọc bài của mình :smile: