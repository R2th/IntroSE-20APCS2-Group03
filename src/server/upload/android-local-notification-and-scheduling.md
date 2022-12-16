# Intro
This simple app will show you how to integrate Notifications into your app. The app also demostrate how one can use AlarmManager to shcedule a notification at a particular time. It mostly is focused on local notification but it will cover the essentials to get you started. Without further ado lets dive in.

First create a simple android demo app. I call this LocalNotificationApp and  import the necessary library in gradle.

```
dependencies {
......
    implementation "com.android.support:support-compat:28.0.0"
}
```

Next we open the activity_main.xml and edit to include our layout design.

**activity_main.xml**

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@android:color/white"
    android:orientation="vertical"
    android:paddingTop="50dp"
    tools:context=".MainActivity">

    <ScrollView
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical">

            <EditText
                android:id="@+id/edt_message"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:hint="Enter Notification Message"/>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:padding="10dp">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Enable Expandable Notification" />

        <androidx.appcompat.widget.SwitchCompat
            android:id="@+id/sw_enable_expand"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1" />
    </LinearLayout>

    <View
        android:layout_width="match_parent"
        android:layout_height="1dp"
        android:background="@color/colorAccent" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:padding="10dp">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Enable Notification Sound" />

        <androidx.appcompat.widget.SwitchCompat
            android:id="@+id/sw_enable_sound"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1" />
    </LinearLayout>

    <View
        android:layout_width="match_parent"
        android:layout_height="1dp"
        android:background="@color/colorAccent" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:padding="10dp">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Enable Multiple Notification" />

        <androidx.appcompat.widget.SwitchCompat
            android:id="@+id/sw_enable_multiple"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1" />
    </LinearLayout>

    <View
        android:layout_width="match_parent"
        android:layout_height="1dp"
        android:background="@color/colorAccent" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:padding="10dp">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Schedule Notification" />

        <androidx.appcompat.widget.SwitchCompat
            android:id="@+id/sw_schedule"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1" />
    </LinearLayout>

    <LinearLayout
        android:id="@+id/layout_scheduler"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:visibility="gone">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal"
            android:padding="10dp">

            <TextView
                android:id="@+id/tv_date"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="@android:color/holo_blue_light"
                android:text="Pick Date" />

            <TextView
                android:id="@+id/tv_clear_date"
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:textColor="@color/colorAccent"
                android:gravity="end"
                android:text="Clear"
                android:layout_weight="1" />
        </LinearLayout>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal"
            android:padding="10dp">

            <TextView
                android:id="@+id/tv_time"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="@android:color/holo_blue_light"
                android:text="Pick Time" />

            <TextView
                android:id="@+id/tv_clear_time"
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:textColor="@color/colorAccent"
                android:gravity="end"
                android:text="Clear"
                android:layout_weight="1" />
        </LinearLayout>

    </LinearLayout>

    <View
        android:layout_width="match_parent"
        android:layout_height="1dp"
        android:background="@color/colorAccent" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="10dp"
        android:orientation="horizontal"
        android:weightSum="2">

        <Button
            android:id="@+id/btn_show_notification"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center"
            android:layout_weight="1"
            android:background="@android:color/transparent"
            android:text="Show Notification"
            android:textColor="@android:color/holo_blue_light" />

        <Button
            android:id="@+id/btn_clear_notification"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center"
            android:layout_weight="1"
            android:background="@android:color/transparent"
            android:text="Clear Notification"
            android:textColor="@android:color/holo_red_dark" />
    </LinearLayout>
        </LinearLayout>
    </ScrollView>
</LinearLayout>
```

In this activity view we have added an EditText to input the notification message, some swicthbuttons to customize the notification and one for scheduling a notification.

**View MainActivity**

![](https://images.viblo.asia/e6bc746e-65c4-44d6-91aa-8d453646ff06.jpg)

Next open the MainActivity.java. In this class we will implement the features necessary to demostrate our notification. 

**MainActivity.java**

```
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.SwitchCompat;

import android.app.AlarmManager;
import android.app.DatePickerDialog;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.TimePickerDialog;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.SystemClock;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.TimePicker;
import android.widget.Toast;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.concurrent.TimeUnit;

public class MainActivity extends AppCompatActivity implements View.OnClickListener, CompoundButton.OnCheckedChangeListener, DatePickerDialog.OnDateSetListener {

    private Button btnShowNotification;
    private Button btnClearNotification;
    private SwitchCompat swEnableSound;
    private SwitchCompat swEnableExpandable;
    private SwitchCompat swEnableMultiple;
    private SwitchCompat swEnableSchedule;
    private TextView tvDate;
    private TextView tvClearDate;
    private TextView tvTime;
    private TextView tvClearTime;
    private EditText edtMessage;
    private boolean isEnableSound;
    private boolean isEnabledExpand;
    private boolean isEnabledMultiple;
    private LinearLayout layoutScheduler;
    public static String APP_NAME = "NotificationApp";
    private NotificationManager notificationManager;
    private int selectedMonth, selectedYear, selectedDay = 0;
    private boolean isSelectTime = false;
    private boolean isSelectDate = false;
    private Calendar todayCalender;
    private Calendar selectedDate;
    private int mYear, mMonth, mDay, mHour, mMinute;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        init();
    }

    private void init() {
        //Create Channel
        createNotificationChannel();
        btnShowNotification = findViewById(R.id.btn_show_notification);
        btnClearNotification = findViewById(R.id.btn_clear_notification);
        swEnableExpandable = findViewById(R.id.sw_enable_expand);
        swEnableMultiple = findViewById(R.id.sw_enable_multiple);
        swEnableSound = findViewById(R.id.sw_enable_sound);
        swEnableSchedule = findViewById(R.id.sw_schedule);
        layoutScheduler = findViewById(R.id.layout_scheduler);
        tvDate = findViewById(R.id.tv_date);
        tvClearDate = findViewById(R.id.tv_clear_date);
        tvTime = findViewById(R.id.tv_time);
        tvClearTime = findViewById(R.id.tv_clear_time);
        edtMessage = findViewById(R.id.edt_message);
        //Listeners
        btnShowNotification.setOnClickListener(this);
        btnClearNotification.setOnClickListener(this);
        tvClearDate.setOnClickListener(this);
        tvClearTime.setOnClickListener(this);
        tvDate.setOnClickListener(this);
        tvTime.setOnClickListener(this);
        swEnableSound.setOnCheckedChangeListener(this);
        swEnableExpandable.setOnCheckedChangeListener(this);
        swEnableMultiple.setOnCheckedChangeListener(this);
        swEnableSchedule.setOnCheckedChangeListener(this);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.btn_show_notification:
                showNotification();
                break;
            case R.id.btn_clear_notification:
                clearNotification();
                break;
            case R.id.tv_date:
                selectDate();
                break;
            case R.id.tv_time:
                selectTime();
                break;
            case R.id.tv_clear_date:
                tvDate.setText("Pick Date");
                isSelectDate = false;
                break;
            case R.id.tv_clear_time:
                tvTime.setText("Pick Time");
                isSelectTime = false;
                break;
            default:
                break;
        }
    }

    private void selectDate() {
        todayCalender = Calendar.getInstance();
        mYear = todayCalender.get(Calendar.YEAR);
        mMonth = todayCalender.get(Calendar.MONTH);
        mDay = todayCalender.get(Calendar.DAY_OF_MONTH);
        DatePickerDialog dialog = new DatePickerDialog(this, this, mYear, mMonth, mDay);
        dialog.show();
    }


    public boolean isValidDate(String d1, String d2)   {
        SimpleDateFormat dfDate  = new SimpleDateFormat("EE MMM dd HH:mm:ss z yyyy", Locale.ENGLISH);
        try {
            return dfDate.parse(d1).before(dfDate.parse(d2)) || dfDate.parse(d1).equals(dfDate.parse(d2));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return false;
    }

    private void selectTime() {
        // Get Current Time
        final Calendar c = Calendar.getInstance();
        mHour = c.get(Calendar.HOUR_OF_DAY);
        mMinute = c.get(Calendar.MINUTE);

        // Launch Time Picker Dialog
        TimePickerDialog timePickerDialog = new TimePickerDialog(this,
                new TimePickerDialog.OnTimeSetListener() {

                    @Override
                    public void onTimeSet(TimePicker view, int hourOfDay,
                                          int minute) {
                        selectedDate = Calendar.getInstance();
                        selectedDate.set(Calendar.YEAR, selectedYear);
                        selectedDate.set(Calendar.MONTH, selectedMonth);
                        selectedDate.set(Calendar.DAY_OF_MONTH, selectedDay);
                        selectedDate.set(Calendar.HOUR_OF_DAY, hourOfDay);
                        selectedDate.set(Calendar.MINUTE, minute);

                        Date date2 = new Date(selectedDate.getTimeInMillis());
                        Date current = new Date(c.getTimeInMillis());

                        if (current.after(date2)) {
                            Toast.makeText(MainActivity.this, "Wrong time selected. Please verify!", Toast.LENGTH_SHORT).show();
                            tvTime.setText("Pick Time");
                            isSelectTime = false;
                        } else {
                            tvTime.setText(String.format("%s:%s", hourOfDay, minute));
                            isSelectTime = true;
                        }
                    }
                }, mHour, mMinute, false);
        timePickerDialog.show();
    }

    private void clearNotification() {
        notificationManager.cancelAll();
        tvTime.setText("Pick Time");
        tvDate.setText("Pick Date");
        edtMessage.setText("");
        swEnableExpandable.setChecked(false);
        swEnableMultiple.setChecked(false);
        swEnableSound.setChecked(false);
        swEnableSchedule.setChecked(false);
        isSelectDate = false;
        isSelectTime = false;
    }

    private void showNotification() {
        if (TextUtils.isEmpty(edtMessage.getText())) {
            edtMessage.setError("Please enter Message!");
            return;
        }
        if(swEnableSchedule.isChecked()) {
            if (isSelectDate && isSelectTime) {
                long diffInMs = selectedDate.getTimeInMillis() - todayCalender.getTimeInMillis();
                long diffInSec = TimeUnit.MILLISECONDS.toMillis(diffInMs);
                scheduleNotification(this, diffInSec, "SCHEDULED NOTIFICATION.", edtMessage.getText().toString());
            } else {
                Toast.makeText(this, "Select a valid date and time!", Toast.LENGTH_SHORT).show();
            }
        } else {
            scheduleNotification(this, 0, "NORMAL NOTIFICATION", edtMessage.getText().toString());
        }
    }

    private void createNotificationChannel() {
        notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = "channel_name";
            String description = "channel_description";
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(APP_NAME, name, importance);
            channel.setDescription(description);
            notificationManager.createNotificationChannel(channel);
        }
    }

    @Override
    public void onCheckedChanged(CompoundButton compoundButton, boolean checked) {
        switch (compoundButton.getId()) {
            case R.id.sw_enable_sound:
                isEnableSound = checked;
                break;
            case R.id.sw_enable_expand:
                isEnabledExpand = checked;
                break;
            case R.id.sw_enable_multiple:
                isEnabledMultiple = checked;
                break;
            case R.id.sw_schedule:
                layoutScheduler.setVisibility(checked ? View.VISIBLE : View.GONE);
                btnShowNotification.setText(checked ? "Schedule" : "Show Notification");
                break;
            default:
                break;
        }
    }

    public void scheduleNotification(Context context, long delay, String title, String message) {//delay is after how much time(in millis) from current time you want to schedule the notification

        int randomNotificationId = isEnabledMultiple ? (int) ((new Date().getTime() / 1000L) % Integer.MAX_VALUE) : 0;

        Intent notificationIntent = new Intent(context, MyNotificationPublisher.class);
        notificationIntent.putExtra(MyNotificationPublisher.NOTIFICATION_ID, randomNotificationId);
        notificationIntent.putExtra(MyNotificationPublisher.KEY_EXPAND, isEnabledExpand);
        notificationIntent.putExtra(MyNotificationPublisher.KEY_MULTIPLE, isEnabledMultiple);
        notificationIntent.putExtra(MyNotificationPublisher.KEY_SOUND, isEnableSound);
        notificationIntent.putExtra(MyNotificationPublisher.KEY_MESSAGE, message);
        notificationIntent.putExtra(MyNotificationPublisher.KEY_TITLE, title);

        PendingIntent pendingIntent = PendingIntent.getBroadcast(context, randomNotificationId, notificationIntent, PendingIntent.FLAG_CANCEL_CURRENT);
        long futureInMillis = SystemClock.elapsedRealtime() + delay;
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        alarmManager.setExact(AlarmManager.ELAPSED_REALTIME_WAKEUP, futureInMillis, pendingIntent);
    }

    @Override
    public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {
        selectedMonth = month;
        selectedYear = year;
        selectedDay = dayOfMonth;
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, year);
        cal.set(Calendar.MONTH, month);
        cal.set(Calendar.DAY_OF_MONTH, dayOfMonth);

        if(isValidDate(todayCalender.getTime().toString(), cal.getTime().toString())) {
            tvDate.setText(String.format("%s - %s - %s", dayOfMonth, month+1, year));
            isSelectDate = true;
            selectTime();
        } else {
            isSelectDate = false;
            Toast.makeText(this, "Select Valid Date !", Toast.LENGTH_SHORT).show();
        }
    }
}
```

Notice the Intent "notificationIntent"? Here i am sending this notificationIntent in a pendingIntent to a broadcast receiver class MyNotificationPublisher. This class which we will define below will recieve our data passed in the intent and initiate the notification only after the alarm countdwon ends.The AlarmManager gets the current time on the device and adds the initial difference we get from the date and time selected by the user. This value is converted to milliseconds and then the countdown begind. Even when app is minimised or closed when this timer ends the pending event is fired and our notification is shown. Now lets create the MyNotificationPublisher class.

**MyNotificationPublisher**

```
import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.media.RingtoneManager;
import android.net.Uri;

import androidx.core.app.NotificationCompat;

public class MyNotificationPublisher extends BroadcastReceiver {

    public static String NOTIFICATION_ID = "notification_id";
    public static String KEY_MESSAGE = "key_message";
    public static String KEY_TITLE = "key_title";
    public static String KEY_EXPAND = "key_expand";
    public static String KEY_SOUND = "key_sound";
    public static String KEY_MULTIPLE = "key_multiple";
    public static String CHANNEL_ID = "channel_id";
    public static String APP_NAME = "NotificationApp";

    @Override
    public void onReceive(final Context context, Intent intent) {

        NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

        int notificationId = intent.getIntExtra(NOTIFICATION_ID, 0);
        String message = intent.getStringExtra(KEY_MESSAGE);
        String title = intent.getStringExtra(KEY_TITLE);
        boolean isEnabledExpand = intent.getBooleanExtra(KEY_EXPAND, false);
        boolean isEnableSound = intent.getBooleanExtra(KEY_SOUND, false);
        boolean isEnabledMultiple = intent.getBooleanExtra(KEY_MULTIPLE, false);

        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, CHANNEL_ID)
                .setSmallIcon(R.drawable.ic_launcher_background)
                .setContentTitle(title)
                .setContentText(message)
                .setChannelId(APP_NAME)
                .setPriority(NotificationCompat.PRIORITY_DEFAULT);
        if (isEnabledExpand)
            builder.setStyle(new NotificationCompat.BigTextStyle()
                    .bigText(message));
        if (isEnableSound) {
            Uri alarmSound = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
            builder.setSound(alarmSound);
        }
        if (isEnabledMultiple) {
            builder.setGroup(APP_NAME);
            builder.setGroupSummary(true);
        }
        notificationManager.notify(notificationId, builder.build());
    }
}
```

Using the intent data gotten from the MainActivity intent, we can get the boolean values of the switchbuttons and text entered in the message field to create and customize our notification heads up according to user preference. Before we run the app lets declare the reciever in the Manifest file.

**AndroidManifest.xml**

```
<receiver android:name=".MyNotificationPublisher"/>
</application>
```

And we done. Run the app.

![](https://images.viblo.asia/e7540b49-3986-4d25-86da-af7594cff0ed.jpg)

![](https://images.viblo.asia/9da78f92-f597-4098-ac32-953e3c8337eb.jpg)

![](https://images.viblo.asia/f95e003e-9f98-43c5-a2fb-48abea8ea4d1.jpg)

![](https://images.viblo.asia/dd813341-d7a1-4290-998e-6cbd9da837fa.jpg)

![](https://images.viblo.asia/e739fe31-ba33-4563-98b2-ec40cc9d4a8b.jpg)


Note: The AlarmManager can be used not only for scheduling a notification but one can readily use it for other scheduled task in an app. Happy Coding!!!
For further customizations and explorations you can refer the official Google page [here>>](http://www.androiddocs.com/guide/topics/ui/notifiers/notifications.html)