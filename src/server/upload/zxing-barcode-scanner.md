## Introduction
ZXing library allows you to implement a barcode scanner in less than a few minutes.  Follow this tutorial to get you started.

Create a project and called it whatever. I am calling mine BarcodeScannerApplication

![](https://images.viblo.asia/9fdfd746-6121-48d2-992c-4a4c2ea8b3d2.png)

Click next selecting an empty Activity then finish.

![](https://images.viblo.asia/952f47bc-48a1-45d8-8bb7-926bf95b4bf3.png)

Add the following dependency to your build.gradle file.

`compile 'me.dm7.barcodescanner:zxing:1.9.8'`

Open the activity_main.xml and add a button:

```
<Button
    android:id="@+id/btnScan"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Click to Scan"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintLeft_toLeftOf="parent"
    app:layout_constraintRight_toRightOf="parent"
    app:layout_constraintTop_toTopOf="parent"/>
```

**MainActivity.java**

```
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button buttonScan = (Button) findViewById(R.id.btnScan);
        buttonScan.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(MainActivity.this,SimpleScannerActivity.class));
            }
        });
    }
}
```

Next we create a new Activity called SimpleScannerActivity

**activity_simple_scanner.xml**

```
<?xml version="1.0" encoding="utf-8"?>

<FrameLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <FrameLayout
        android:id="@+id/content_frame"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</FrameLayout>
```


**SimpleScannerActivity**

```
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.ViewGroup;
import android.widget.Toast;

import com.google.zxing.Result;

import me.dm7.barcodescanner.zxing.ZXingScannerView;

public class SimpleScannerActivity extends AppCompatActivity
    implements ZXingScannerView.ResultHandler {
    private ZXingScannerView mScannerView;
    private int mCameraId = -1;

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        setContentView(R.layout.activity_simple_scanner);
        ViewGroup contentFrame = findViewById(R.id.content_frame);
        mScannerView = new ZXingScannerView(this);
        contentFrame.addView(mScannerView);
    }

    @Override
    public void onResume() {
        super.onResume();
        mScannerView.setResultHandler(this);
        mScannerView.startCamera(mCameraId);
        //to set flash
//        mScannerView.setFlash(true);
        //to set autoFocus
//        mScannerView.setAutoFocus(true);
    }

    @Override
    public void onPause() {
        super.onPause();
        mScannerView.stopCamera();           // Stop camera on pause
    }

    @Override
    public void handleResult(Result rawResult) {
        try {
            Uri notification = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
            Ringtone r = RingtoneManager.getRingtone(getApplicationContext(), notification);
            r.play();
            Toast.makeText(this, "Scan Completed \n" + rawResult.getText() + "", Toast.LENGTH_SHORT)
                .show();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

Do not forget to add permission for camera in the Manifest

`<uses-permission android:name="android.permission.CAMERA"/>`

Thats it!!!

![](https://images.viblo.asia/d312d371-b8d0-4af9-9cd8-844cb5b3e36e.jpg)

Scanner>>>


![](https://images.viblo.asia/ec074f98-c2a3-4391-a439-0662dc0b3292.jpg)

For futher info click [here>>](https://github.com/dm77/barcodescanner)