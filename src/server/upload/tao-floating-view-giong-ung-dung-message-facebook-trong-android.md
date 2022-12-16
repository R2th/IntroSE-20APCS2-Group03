## 1. Giới thiệu

Nếu bạn là 1 tín đồ của Facebook hẳn đã quen với việc sử dụng ứng dụng Messages FB, nó xuất hiện như 1 bong bóng chat nổi trên màn hình điện thoại.
Bạn có thể kéo thả view chat lên trên các ứng dụng khác một cách dễ dàng.

Trong bài này, mình sẽ hướng dẫn các bạn tạo một ứng dụng có view giống như ứng dụng Message của FB.

## 2. Bắt đầu

### 2.1. Tạo mới Project

Các bạn mở Android Studio, tạo mới ứng dụng với một activity : MainActivity và layout là activity_main.xml như sau :

**activity_main.xml**

```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <Button
        android:id="@+id/btn_start"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerInParent="true"
        android:text="START" />

    <Button
        android:id="@+id/btn_stop"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/btn_start"
        android:layout_centerHorizontal="true"
        android:text="STOP" />

</RelativeLayout>
```

Trong MainActivity, chúng ta sẽ có 2 button **START, STOP** để mở và tắt view giống Message Facebook.

### 2.2 "Draw over other apps" permission

Để view có thể kéo thả lên trên các ứng dụng khác, bạn phải yêu cầu ứng dụng của mình được sử dụng permison ACTION_MANAGE_OVERLAY_PERMISSION.
Do đó, xử lý trong MainActivity như sau :

```
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if (!Settings.canDrawOverlays(this)) {
            Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:" + getPackageName()));
            startActivityForResult(intent, 0);
        }

    }
```

Ngoài ra, bạn cần phải thêm permission trong **AndroidManifest.xml** như sau :

```
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
```

Lúc này, khi chạy ứng dụng, app mở lên sẽ chuyển sang màn hình setting, để bạn có thể cho phép ứng dụng của mình được hiển thị đè lên các ứng dụng khác như sau :

![](https://images.viblo.asia/a256b9ac-a213-47d9-9695-42406d8dca9a.png)

**Bạn hãy enable permission này lên để chúng ta tiếp tục các phần sau.**

### 2.3. Service

Chúng ta sẽ tạo một Service để điểu khiển view mà chúng ta mong muốn.
Các bạn hãy tạo một class mới, đặt tên là **MyService**. 

```
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;

import androidx.annotation.Nullable;

public class MyService extends Service {

    @Override
    public void onCreate() {
        super.onCreate();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
```

Nhớ khai báo trong **AndroidManifest.xml** như sau :

```
      <service
            android:name=".MyService"
            android:exported="true" />
```

Trong **MyService**, chúng ta sẽ tạo ra một ImageView, hiển thị icon của app, và xử lý logic khi người dùng kéo thả như sau :

```
package com.demo.floating;

import android.app.Service;
import android.content.Intent;
import android.graphics.PixelFormat;
import android.os.IBinder;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.widget.ImageView;

import androidx.annotation.Nullable;

public class MyService extends Service {

    private WindowManager mWindowManager;
    private ImageView image;

    @Override
    public void onCreate() {
        super.onCreate();

        image = new ImageView(this);

        image.setImageResource(R.mipmap.ic_launcher);

        mWindowManager = (WindowManager)getSystemService(WINDOW_SERVICE);

        final WindowManager.LayoutParams paramsF = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.TYPE_PHONE,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
                PixelFormat.TRANSLUCENT);

        paramsF.gravity = Gravity.TOP | Gravity.LEFT;
        paramsF.x=0;
        paramsF.y=100;
        mWindowManager.addView(image, paramsF);

        try{

            image.setOnTouchListener(new View.OnTouchListener() {
                WindowManager.LayoutParams paramsT = paramsF;
                private int initialX;
                private int initialY;
                private float initialTouchX;
                private float initialTouchY;
                @Override
                public boolean onTouch(View v, MotionEvent event) {
                    switch(event.getAction()){
                        case MotionEvent.ACTION_DOWN:
                            initialX = paramsF.x;
                            initialY = paramsF.y;
                            initialTouchX = event.getRawX();
                            initialTouchY = event.getRawY();
                            break;
                        case MotionEvent.ACTION_UP:
                            break;
                        case MotionEvent.ACTION_MOVE:
                            paramsF.x = initialX + (int) (event.getRawX() - initialTouchX);
                            paramsF.y = initialY + (int) (event.getRawY() - initialTouchY);
                            mWindowManager.updateViewLayout(v, paramsF);
                            break;
                    }
                    return false;
                }
            });
        } catch (Exception e){
            e.printStackTrace();
        }

    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}

```

### 2.4. Xử lý trong MainActivity

Chúng ta sẽ xử lý khi click vào button **START , STOP** trong **MainActivity** như sau :

```
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.Settings;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if (!Settings.canDrawOverlays(this)) {
            Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:" + getPackageName()));
            startActivityForResult(intent, 0);
        }

        findViewById(R.id.btn_start).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //toast
                startService(new Intent(MainActivity.this, MyService.class));
            }
        });

        findViewById(R.id.btn_stop).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                stopService(new Intent(MainActivity.this, MyService.class));
            }
        });

    }
}
```

Chạy ứng dụng, khi bạn click vào START, sẽ xuất hiện 1 view chính là icon của app.
Bạn có thể kéo thả nó toàn màn hình, ngay cả khi thoát app như sau :

![](https://images.viblo.asia/c78c51cb-1c98-4235-aa24-cb6a02747e92.png)

![](https://images.viblo.asia/a0d2d32a-3345-447b-9ac6-fd66ad75ddd1.png)