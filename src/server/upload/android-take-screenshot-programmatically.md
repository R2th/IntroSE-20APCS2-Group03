Xin chào mọi người, trong bài viết này mình sẽ chia sẻ cách làm thế nào để tạo ra một ứng dụng chụp ảnh màn hình, và lưu lại vào trong điện thoại.

App sẽ có giao diện như bên dưới !
![](https://images.viblo.asia/02cd096e-4263-4f6a-8b52-41be7bba9839.png)

## Xây dựng UI
```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/parentView"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center_horizontal"
    android:orientation="vertical"
    android:padding="16dp"
    tools:context=".MainActivity">
 
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal">
 
        <Button
            android:id="@+id/buttonScreenshotActivity"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="@string/take_screen_shot_activity"
            android:textAllCaps="false"
            android:textColor="@color/colorPrimaryDark" /><img src="http://www.androidtutorialshub.com/wp-content/uploads/2018/08/android-take-screenshot-programmatically-banner.png" alt="" width="1280" height="720" class="aligncenter size-full wp-image-892" />
 
        <Button
            android:id="@+id/buttonScreenshotView"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="@string/take_screen_shot_view"
            android:textAllCaps="false"
            android:textColor="@color/colorPrimaryDark" />
    </LinearLayout>
 
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal">
 
        <Button
            android:id="@+id/buttonSaveScreenshot"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="@string/take_save_screen_shot"
            android:textAllCaps="false"
            android:textColor="@color/colorAccent" />
 
        <Button
            android:id="@+id/buttonReset"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="@string/reset"
            android:textAllCaps="false"
            android:textColor="@color/colorAccent" />
    </LinearLayout>
 
    <ImageView
        android:id="@+id/imageViewShowScreenshot"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="10dp" />
 
</LinearLayout>
```
## Định nghĩa file String
```
<resources>
    <string name="app_name">Screenshot</string>
    <string name="take_screen_shot_activity">Activity Screenshot</string>
    <string name="take_screen_shot_view">Layout Screenshot</string>
    <string name="take_save_screen_shot">Save Screenshot</string>
    <string name="reset">Reset</string>
    <string name="toast_message_screenshot">First Take any Screenshot</string>
    <string name="toast_message_screenshot_success">Screenshot saved successfully.</string>
    <string name="settings_message">Go to Permissions to Grant Storage</string>
</resources>
```
## Tạo class ScreenshotUtil  làm nhiệm vụ chụp lại hình ảnh
Tạo một packet mới có tên helper và tạo class ScreensUtil và thêm đoạn bên dưới vào nó. Code sẽ tạo lớp singleton được sử dụng để chụp ảnh màn hình chứa các phương thức sau: -

Bitmap TakeSc MuffForView :  Đo và chụp ảnh màn hình của chế độ xem được cung cấp
Bitmap TakeSc MuffForScreen: Đo và chụp ảnh màn hình của hoạt động được cung cấp

```
package com.androidtutorialshub.helper;

import android.app.Activity;
import android.graphics.Bitmap;
import android.view.View;
import android.view.View.MeasureSpec;

public class ScreenshotUtil {
    private static ScreenshotUtil mInstance;

    private ScreenshotUtil() {
    }

    public static ScreenshotUtil getInstance() {
        if (mInstance == null) {
            synchronized (ScreenshotUtil.class) {
                if (mInstance == null) {
                    mInstance = new ScreenshotUtil();
                }
            }
        }
        return mInstance;
    }

    /**
     * Measures and takes a screenshot of the provided {@link View}.
     *
     * @param view The view of which the screenshot is taken
     * @return A {@link Bitmap} for the taken screenshot.
     */
    public Bitmap takeScreenshotForView(View view) {
        view.measure(MeasureSpec.makeMeasureSpec(view.getWidth(), MeasureSpec.EXACTLY), MeasureSpec.makeMeasureSpec(view.getHeight(), MeasureSpec.EXACTLY));
        view.layout((int) view.getX(), (int) view.getY(), (int) view.getX() + view.getMeasuredWidth(), (int) view.getY() + view.getMeasuredHeight());

        view.setDrawingCacheEnabled(true);
        view.buildDrawingCache(true);
        Bitmap bitmap = Bitmap.createBitmap(view.getDrawingCache());
        view.setDrawingCacheEnabled(false);

        return bitmap;
    }

    public Bitmap takeScreenshotForScreen(Activity activity) {
        return takeScreenshotForView(activity.getWindow().getDecorView().getRootView());
    }
}
```
## Tạo class FileUtil.
Tạo một packet mới có tên helper và tạo class FileUtil và thêm code bên dưới vào nó. Nó sẽ tạo lớp singleton được sử dụng để lưu ảnh chụp màn hình vào bộ lưu trữ. Class FileUtil này chứa phương thức sau: 

void storeBitmap (Bitmap bitmap, String filePath) : - Lưu trữ Bitmap đã cho vào một đường dẫn trên thiết bị.
```
package com.androidtutorialshub.helper;
 
import android.graphics.Bitmap;
 
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
 
public class FileUtil {
 
    private static FileUtil mInstance;
 
    private FileUtil() {
    }
 
    public static FileUtil getInstance() {
        if (mInstance == null) {
            synchronized (FileUtil.class) {
                if (mInstance == null) {
                    mInstance = new FileUtil();
                }
            }
        }
        return mInstance;
    }
 
    /**
     * Stores the given {@link Bitmap} to a path on the device.
     *
     * @param bitmap   The {@link Bitmap} that needs to be stored
     * @param filePath The path in which the bitmap is going to be stored.
     */
    public void storeBitmap(Bitmap bitmap, String filePath) {
        File imageFile = new File(filePath);
        imageFile.getParentFile().mkdirs();
        try {
            OutputStream fout = new FileOutputStream(imageFile);
            bitmap.compress(Bitmap.CompressFormat.JPEG, 90, fout);
            fout.flush();
            fout.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
Để lưu lại ảnh vào đường dẫn trong điện thoại, ta cần runtime permission, trong bài mình sẽ sử dụng thư viện DEXTER nhé !
Trong gradle app:
```
dependencies {
    ...
     implementation 'com.karumi:dexter:5.0.0'
}
```
## Class MainActivity
```
package com.androidtutorialshub.screenshot;
 
import android.Manifest;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.os.Environment;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Toast;
 
import com.androidtutorialshub.helper.FileUtil;
import com.androidtutorialshub.helper.ScreenshotUtil;
import com.karumi.dexter.Dexter;
import com.karumi.dexter.PermissionToken;
import com.karumi.dexter.listener.PermissionDeniedResponse;
import com.karumi.dexter.listener.PermissionGrantedResponse;
import com.karumi.dexter.listener.PermissionRequest;
import com.karumi.dexter.listener.single.PermissionListener;
 
public class MainActivity extends AppCompatActivity implements View.OnClickListener {
 
 
    private AppCompatActivity activity = MainActivity.this;
 
    private LinearLayout parentView;
    private Button buttonScreenshotActivity;
    private Button buttonScreenshotView;
    private Button buttonSaveScreenshot;
    private Button buttonReset;
 
    private ImageView imageViewShowScreenshot;
 
    private Bitmap bitmap;
 
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
 
        // initializing the views
        initViews();
 
        // initializing the listeners
        initListeners();
 
 
    }
 
    /**
     * method to initialize the views
     */
    private void initViews() {
 
        parentView = findViewById(R.id.parentView);
 
        buttonScreenshotActivity = findViewById(R.id.buttonScreenshotActivity);
        buttonScreenshotView = findViewById(R.id.buttonScreenshotView);
        buttonSaveScreenshot = findViewById(R.id.buttonSaveScreenshot);
        buttonReset = findViewById(R.id.buttonReset);
 
        imageViewShowScreenshot = findViewById(R.id.imageViewShowScreenshot);
 
    }
 
    /**
     * method to initialize the listeners
     */
    private void initListeners() {
 
        buttonScreenshotActivity.setOnClickListener(this);
        buttonScreenshotView.setOnClickListener(this);
        buttonSaveScreenshot.setOnClickListener(this);
        buttonReset.setOnClickListener(this);
 
    }
 
    /**
     * method for click listener
     *
     * @param view
     */
    @Override
    public void onClick(View view) {
 
        switch (view.getId()) {
 
            case R.id.buttonScreenshotActivity:
                bitmap = ScreenshotUtil.getInstance().takeScreenshotForScreen(activity); // Take ScreenshotUtil for activity
                imageViewShowScreenshot.setImageBitmap(bitmap);
                break;
 
            case R.id.buttonScreenshotView:
                bitmap = ScreenshotUtil.getInstance().takeScreenshotForView(parentView); // Take ScreenshotUtil for any view
                imageViewShowScreenshot.setImageBitmap(bitmap);
                break;
 
            case R.id.buttonSaveScreenshot:
                requestPermissionAndSave();
                break;
 
            case R.id.buttonReset:
                bitmap = null;
                imageViewShowScreenshot.setImageBitmap(bitmap);
                break;
 
        }
    }
 
 
    /**
     * Requesting storage permission
     * Once the permission granted, screen shot captured
     * On permanent denial show toast
     */
    private void requestPermissionAndSave() {
 
        Dexter.withActivity(this)
                .withPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE)
                .withListener(new PermissionListener() {
                    @Override
                    public void onPermissionGranted(PermissionGrantedResponse response) {
 
                        if (bitmap != null) {
                            String path = Environment.getExternalStorageDirectory().toString() + "/test.png";
                            FileUtil.getInstance().storeBitmap(bitmap, path);
                            Toast.makeText(activity, getString(R.string.toast_message_screenshot_success) + " " + path, Toast.LENGTH_LONG).show();
                        } else {
                            Toast.makeText(activity, getString(R.string.toast_message_screenshot), Toast.LENGTH_LONG).show();
                        }
 
                    }
 
                    @Override
                    public void onPermissionDenied(PermissionDeniedResponse response) {
                        // check for permanent denial of permission
                        if (response.isPermanentlyDenied()) {
                            Toast.makeText(activity, getString(R.string.settings_message), Toast.LENGTH_LONG).show();
                        }
                    }
 
                    @Override
                    public void onPermissionRationaleShouldBeShown(PermissionRequest permission, PermissionToken token) {
                        token.continuePermissionRequest();
                    }
                }).check();
    }
}
```

Như vậy, ta đã hoàn thành được 1 ứng dụng nho nhỏ rồi, giờ chỉ cần run lên và xem thành quả thôi !
![](https://images.viblo.asia/f9673cd3-f469-4aab-9cff-fc544fc4c183.png)

Các bạn có thể tham khảo code tại: https://github.com/Android-Tutorials-Hub/screenshot-programmatically-android-tutorial

Bài viết được tham khảo từ: 
http://www.androidtutorialshub.com/android-take-screenshot-programmatically/