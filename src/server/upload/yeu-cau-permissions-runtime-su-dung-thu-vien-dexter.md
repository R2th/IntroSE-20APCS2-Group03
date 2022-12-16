Tất cả chúng ta đều biết rằng Android Marshmallow đã giới thiệu về runtime permissions cho phép người dùng cho phép hoặc từ chối bất kỳ quyền nào trong thời gian chạy. Việc thực thi runtime permissions là một quá trình tẻ nhạt và nhà phát triển cần phải viết rất nhiều mã code chỉ để có được một quyền duy nhất.

Trong bài này, chúng ta sẽ đơn giản hóa quá trình thêm runtime permissions bằng cách sử dụng thư viện Dexter. Sử dụng thư viện này, các quyền có thể được thực hiện trong vài phút.

![](https://images.viblo.asia/311ebbc3-ec03-4a67-ae65-f62e8c010a0a.png)

Bài viết này sẽ giới thiệu về Dexter bao gồm các tính năng cơ bản được cung cấp bởi thư viện. Dexter cung cấp các tính năng khác như sử dụng nó với SnackBar, các loại listeners khác nhau, xử lý lỗi và 1 vài cái khác. Bạn có thể tìm thêm thông tin trên website của Dexter.

# 1. Thư viện Dexter Permissions

Để bắt đầu sử dụng Dexter, chúng ta add dependency vào build.gradle

```
dependencies {
    // Dexter runtime permissions
    implementation 'com.karumi:dexter:4.2.0'
}
```

## 1.1. Request quyền đơn

Để request quyền đơn, bạn có thể sử dụng phương thức withPermission () bằng cách vượt qua việc request quyền. Bạn cũng cần một cuộc callback PermissionListener để nhận trạng thái cho phép.

> onPermissionGranted () sẽ được gọi khi được cho phép.

> onPermissionDenied () sẽ được gọi khi quyền bị từ chối. Ở đây bạn có thể kiểm tra xem sự cho phép bị từ chối vĩnh viễn bằng cách sử dụng điều kiện response.isPermanentlyDenied ().

Mã dưới đây yêu cầu truy cập CAMERA.

```
Dexter.withActivity(this)
                .withPermission(Manifest.permission.CAMERA)
                .withListener(new PermissionListener() {
                    @Override
                    public void onPermissionGranted(PermissionGrantedResponse response) {
                        // permission is granted, open the camera
                    }
 
                    @Override
                    public void onPermissionDenied(PermissionDeniedResponse response) {
                        // check for permanent denial of permission
                        if (response.isPermanentlyDenied()) {
                            // navigate user to app settings
                        }
                    }
 
                    @Override
                    public void onPermissionRationaleShouldBeShown(PermissionRequest permission, PermissionToken token) {
                        token.continuePermissionRequest();
                    }
                }).check();
```

## 1.2. Request đa quyền

Để request đa quyền cùng 1 lúc, chúng ta sử dụng method withPermissions(). Dưới đây là các yêu cầu về quyền sử dụng STORAGE và LOCATION.

```
Dexter.withActivity(this)
                .withPermissions(
                        Manifest.permission.READ_EXTERNAL_STORAGE,
                        Manifest.permission.WRITE_EXTERNAL_STORAGE,
                        Manifest.permission.ACCESS_FINE_LOCATION)
                .withListener(new MultiplePermissionsListener() {
                    @Override
                    public void onPermissionsChecked(MultiplePermissionsReport report) {
                        // check if all permissions are granted
                        if (report.areAllPermissionsGranted()) {
                            // do you work now
                        }
 
                        // check for permanent denial of any permission
                        if (report.isAnyPermissionPermanentlyDenied()) {
                            // permission is denied permenantly, navigate user to app settings
                        }
                    }
 
                    @Override
                    public void onPermissionRationaleShouldBeShown(List<PermissionRequest> permissions, PermissionToken token) {
                        token.continuePermissionRequest();
                    }
                })
                .onSameThread()
                .check();
```

## 1.3. Xử lý lỗi

Chúng ta cũng có thể bắt bất kỳ lỗi nào xảy ra trong khi tích hợp thư viện bằng cách sử dụng PermissionRequestErrorListener.

```
Dexter.withActivity(this)
                .withPermissions(
                        Manifest.permission.READ_EXTERNAL_STORAGE,
                        Manifest.permission.ACCESS_FINE_LOCATION)
                .withListener(listener)
                .withErrorListener(new PermissionRequestErrorListener() {
                    @Override
                    public void onError(DexterError error) {
                        Toast.makeText(getApplicationContext(), "Error occurred! " + error.toString(), Toast.LENGTH_SHORT).show();
                    }
                })
                .check();
```
Now let’s see how to use Dexter in an example project.

# 2. Tạo New Project

## 2.1. Tạo một dự án mới trong Android Studio từ File  ⇒ New project và chọn activity cơ bản

## 2.2. Thêm dependeny Dexter vào file build.gradle

```
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'com.android.support:appcompat-v7:26.1.0'
    // ...
 
    // Dexter runtime permissions
    implementation 'com.karumi:dexter:4.2.0'
}
```

## 2.3. Mở file layout main activity (activity_main.xml and content_main.xml) và thêm 2 button để test 2 method khác nhau

```
content_main.xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:layout_behavior="@string/appbar_scrolling_view_behavior"
    tools:context="info.androidhive.dexterpermissions.MainActivity"
    tools:showIn="@layout/activity_main">
 
    <LinearLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="100dp"
        android:orientation="vertical"
        android:layout_centerHorizontal="true"
        android:paddingLeft="16dp"
        android:paddingRight="16dp">
 
        <Button
            android:id="@+id/btn_camera"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginBottom="16dp"
            android:text="CAMERA PERMISSION" />
 
        <Button
            android:id="@+id/btn_storage"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="MULTIPLE PERMISSIONS" />
 
    </LinearLayout>
</RelativeLayout>
```

## 2.4. Mở MainActivity.java và thực hiện các sửa đổi như dưới đây.

> requestStoragePermission () yêu cầu quyền của máy ảnh.

> requestStoragePermission () yêu cầu nhiều quyền cùng một lúc.

> response.isPermanentlyDenied () và report.isAnyPermissionPermanentlyDenied () kiểm tra nếu sự cho phép bị từ chối vĩnh viễn. Tại đây chúng ta phải điều hướng người dùng đến màn hình cài đặt ứng dụng bằng cách hiển thị một hộp thoại.

```
MainActivity.java
package info.androidhive.dexterpermissions;
 
import android.Manifest;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.provider.Settings;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.Toast;
 
import com.karumi.dexter.Dexter;
import com.karumi.dexter.MultiplePermissionsReport;
import com.karumi.dexter.PermissionToken;
import com.karumi.dexter.listener.DexterError;
import com.karumi.dexter.listener.PermissionDeniedResponse;
import com.karumi.dexter.listener.PermissionGrantedResponse;
import com.karumi.dexter.listener.PermissionRequest;
import com.karumi.dexter.listener.PermissionRequestErrorListener;
import com.karumi.dexter.listener.multi.MultiplePermissionsListener;
import com.karumi.dexter.listener.single.PermissionListener;
 
import java.util.List;
 
public class MainActivity extends AppCompatActivity {
 
    private Button btnCamera, btnStorage;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
 
        btnCamera = findViewById(R.id.btn_camera);
        btnStorage = findViewById(R.id.btn_storage);
 
        btnCamera.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                requestCameraPermission();
            }
        });
 
        btnStorage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                requestStoragePermission();
            }
        });
    }
 
    /**
     * Requesting multiple permissions (storage and location) at once
     * This uses multiple permission model from dexter
     * On permanent denial opens settings dialog
     */
    private void requestStoragePermission() {
        Dexter.withActivity(this)
                .withPermissions(
                        Manifest.permission.READ_EXTERNAL_STORAGE,
                        Manifest.permission.WRITE_EXTERNAL_STORAGE,
                        Manifest.permission.ACCESS_FINE_LOCATION)
                .withListener(new MultiplePermissionsListener() {
                    @Override
                    public void onPermissionsChecked(MultiplePermissionsReport report) {
                        // check if all permissions are granted
                        if (report.areAllPermissionsGranted()) {
                            Toast.makeText(getApplicationContext(), "All permissions are granted!", Toast.LENGTH_SHORT).show();
                        }
 
                        // check for permanent denial of any permission
                        if (report.isAnyPermissionPermanentlyDenied()) {
                            // show alert dialog navigating to Settings
                            showSettingsDialog();
                        }
                    }
 
                    @Override
                    public void onPermissionRationaleShouldBeShown(List<PermissionRequest> permissions, PermissionToken token) {
                        token.continuePermissionRequest();
                    }
                }).
                withErrorListener(new PermissionRequestErrorListener() {
                    @Override
                    public void onError(DexterError error) {
                        Toast.makeText(getApplicationContext(), "Error occurred! ", Toast.LENGTH_SHORT).show();
                    }
                })
                .onSameThread()
                .check();
    }
 
    /**
     * Requesting camera permission
     * This uses single permission model from dexter
     * Once the permission granted, opens the camera
     * On permanent denial opens settings dialog
     */
    private void requestCameraPermission() {
        Dexter.withActivity(this)
                .withPermission(Manifest.permission.CAMERA)
                .withListener(new PermissionListener() {
                    @Override
                    public void onPermissionGranted(PermissionGrantedResponse response) {
                        // permission is granted
                        openCamera();
                    }
 
                    @Override
                    public void onPermissionDenied(PermissionDeniedResponse response) {
                        // check for permanent denial of permission
                        if (response.isPermanentlyDenied()) {
                            showSettingsDialog();
                        }
                    }
 
                    @Override
                    public void onPermissionRationaleShouldBeShown(PermissionRequest permission, PermissionToken token) {
                        token.continuePermissionRequest();
                    }
                }).check();
    }
 
    /**
     * Showing Alert Dialog with Settings option
     * Navigates user to app settings
     * NOTE: Keep proper title and message depending on your app
     */
    private void showSettingsDialog() {
        AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
        builder.setTitle("Need Permissions");
        builder.setMessage("This app needs permission to use this feature. You can grant them in app settings.");
        builder.setPositiveButton("GOTO SETTINGS", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.cancel();
                openSettings();
            }
        });
        builder.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.cancel();
            }
        });
        builder.show();
 
    }
 
    // navigating user to app settings
    private void openSettings() {
        Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
        Uri uri = Uri.fromParts("package", getPackageName(), null);
        intent.setData(uri);
        startActivityForResult(intent, 101);
    }
 
    private void openCamera() {
        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        startActivityForResult(intent, 100);
    }
}
```

![](https://images.viblo.asia/4c2c85cc-2842-469b-a5e0-4d86f42464a0.png)

[Source](https://www.androidhive.info/2017/12/android-easy-runtime-permissions-with-dexter/)