Chụp ảnh từ Máy ảnh hoặc chọn ảnh từ Thư viện là một tính năng thiết yếu cho nhiều ứng dụng Android. 
Lấy một hình ảnh thu nhỏ từ máy ảnh rất dễ dàng, nhưng đôi khi bạn muốn hình ảnh có độ phân giải đầy đủ mà không lưu trữ nó trong Gallery, crop nó và tránh các exception về bộ nhớ có thể xảy ra.

## 1. uCrop – thư viện để crop ảnh

Để crop ảnh, chúng ta sử dụng thư viện [uCrop](https://github.com/Yalantis/uCrop) . Thư viện này được sử dụng nhiều ứng dụng phổ biến và được thử nghiệm trên nhiều phiên bản thiết bị / HĐH khác nhau. 
Mặc dù thư viện cung cấp trải nghiệm crop tốt nhất, nhưng nó không cung cấp tùy chọn để chọn hình ảnh đầu vào từ máy ảnh hoặc thư viện. 
Tất cả những gì nó cần là một bitmap và trả lại bitmap đã được crop.

Trong bài viết này, chúng ta sẽ xây dựng một tính năng chọn ảnh từ Camera hoặc Gallery và crop nó.

## 2. Tạo Project

Chúng ta sẽ tạo một giao diện profile người dùng ( như app Instagram ) và sử dụng chức năng crop để hoàn thiện ảnh hồ sơ.
Bạn có thể chụp ảnh bằng máy ảnh hoặc chọn từ Gallery, crop nó và đặt làm hình ảnh đại diện.

Hãy tạo project mới trong Android Studio.

1. Chọn File ⇒ New Project và chọn Basic Activity 
2. Mở app/build.gradle và thêm các thư viện sau :

```
build.gradle
dependencies {
    // ...
 
    //Butterknife
    implementation 'com.jakewharton:butterknife:8.8.1'
    annotationProcessor 'com.jakewharton:butterknife-compiler:8.8.1'
 
    //dexter permissions
    implementation "com.karumi:dexter:5.0.0"
 
    // circular imageview
    implementation 'com.mikhaellopez:circularimageview:3.2.0'
 
    //Glide
    implementation 'com.github.bumptech.glide:glide:4.7.1'
    implementation 'com.github.bumptech.glide:annotations:4.7.1'
    implementation('com.github.bumptech.glide:okhttp3-integration:4.0.0') {
        exclude group: 'glide-parent'
    }
    annotationProcessor 'com.github.bumptech.glide:compiler:4.7.1'
 
    implementation 'com.github.yalantis:ucrop:2.2.2'
}
```

3. Thêm các resource sau vào strings.xml, dimen.xml và colors.xml
strings.xml
```
<resources>
    <string name="app_name">Image Pick &amp; Crop</string>
    <string name="action_settings">Settings</string>
    <string name="profile_desc">Rowan Sebastian Atkinson CBE is an English actor,  comedian and screenwriter</string>
    <string name="profile_title">Mr Bean</string>
    <string name="posts">posts</string>
    <string name="followers">followers</string>
    <string name="following">following</string>
    <string name="msg_error_unable_select_profile_pic">Unable to set profile image. Please try again!</string>
    <string name="lbl_set_profile_photo">Set profile image</string>
    <string name="lbl_take_camera_picture">Take a picture</string>
    <string name="lbl_choose_from_gallery">Choose from gallery</string>
    <string name="toast_image_intent_null">Image picker option is missing!</string>
 
    <!-- font families -->
    <string name="font_family_light">sans-serif-light</string>
    <string name="font_family_medium">sans-serif-medium</string>
    <string name="font_family_regular">sans-serif</string>
    <string name="font_family_condensed">sans-serif-condensed</string>
    <string name="font_family_black">sans-serif-black</string>
    <string name="font_family_thin">sans-serif-thin</string>
    <string name="dialog_permission_title">Grant Permissions</string>
    <string name="dialog_permission_message">This app needs permission to use this feature. You can grant them in app settings.</string>
    <string name="go_to_settings">GOTO SETTINGS</string>
</resources>
```
dimen.xml
```
<resources>
    <dimen name="fab_margin">16dp</dimen>
    <dimen name="toolbar_profile_width">90dp</dimen>
    <dimen name="dimen_20dp">20dp</dimen>
    <dimen name="activity_padding">16dp</dimen>
    <dimen name="profile_title">23dp</dimen>
    <dimen name="profile_desc">13dp</dimen>
    <dimen name="meta_count">20dp</dimen>
    <dimen name="meta_label">12dp</dimen>
    <dimen name="dimen_40dp">40dp</dimen>
    <dimen name="ic_plus_width">28dp</dimen>
</resources>
```
colors.xml
```
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#5770f3</color>
    <color name="colorPrimaryDark">#5770f3</color>
    <color name="colorAccent">#D81B60</color>
    <color name="gradient_start">#5770f3</color>
    <color name="gradient_end">#8e5aeb</color>
    <color name="profile_desc">#D1D1FF</color>
    <color name="bg_meta_container">#000000</color>
    <color name="profile_default_tint">#e0e0e0</color>
</resources>
```

4. Downloafd folder [res](https://api.androidhive.info/res/image-picker/res.zip) này về và thêm vào Project của bạn. Folder này chưa các icon để xây dựng màn profile screen.
5. Mở layout **activity_main.xml**
```
activity_main.xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">
 
    <android.support.design.widget.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:theme="@style/AppTheme.AppBarOverlay">
 
        <android.support.v7.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            android:background="?attr/colorPrimary"
            app:popupTheme="@style/AppTheme.PopupOverlay" />
 
        <include layout="@layout/layout_toolbar_profile" />
 
    </android.support.design.widget.AppBarLayout>
 
    <include layout="@layout/content_main" />
 
</android.support.design.widget.CoordinatorLayout>
```
Tạo layout mới layout_toolbar_profile.xml 
```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:gravity="center_horizontal"
    android:orientation="vertical">
 
    <RelativeLayout
        android:layout_width="@dimen/toolbar_profile_width"
        android:layout_height="wrap_content">
 
        <com.mikhaellopez.circularimageview.CircularImageView
            android:id="@+id/img_profile"
            android:layout_width="@dimen/toolbar_profile_width"
            android:layout_height="@dimen/toolbar_profile_width"
            android:layout_marginTop="@dimen/activity_padding"
            android:layout_marginBottom="@dimen/activity_padding"
            android:scaleType="centerInside"
            android:src="@drawable/baseline_account_circle_black_48"
            app:civ_border_color="@android:color/white"
            app:civ_border_width="2dp" />
 
        <com.mikhaellopez.circularimageview.CircularImageView
            android:id="@+id/img_plus"
            android:layout_width="@dimen/ic_plus_width"
            android:layout_height="@dimen/ic_plus_width"
            android:layout_alignBottom="@id/img_profile"
            android:layout_alignParentRight="true"
            android:src="@drawable/ic_plus"
            app:civ_shadow="true"
            app:civ_shadow_radius="1" />
    </RelativeLayout>
 
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:fontFamily="@string/font_family_medium"
        android:text="@string/profile_title"
        android:textColor="@android:color/white"
        android:textSize="@dimen/profile_title" />
 
    <TextView
        android:id="@+id/profile_desc"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="@dimen/dimen_40dp"
        android:gravity="center_horizontal"
        android:paddingLeft="@dimen/dimen_20dp"
        android:paddingRight="@dimen/dimen_20dp"
        android:text="@string/profile_desc"
        android:textColor="@color/profile_desc"
        android:textSize="@dimen/profile_desc" />
 
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="@color/bg_meta_container"
        android:orientation="horizontal"
        android:paddingTop="@dimen/activity_padding"
        android:paddingBottom="@dimen/activity_padding"
        android:weightSum="3">
 
        <LinearLayout
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:gravity="center"
            android:orientation="vertical">
 
            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="1320"
                android:textColor="@android:color/white"
                android:textSize="@dimen/meta_count"
                android:textStyle="bold" />
 
            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:fontFamily="@string/font_family_condensed"
                android:text="@string/posts"
                android:textColor="@android:color/white"
                android:textSize="@dimen/meta_label" />
        </LinearLayout>
 
        <LinearLayout
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:gravity="center"
            android:orientation="vertical">
 
            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="4.3m"
                android:textColor="@android:color/white"
                android:textSize="@dimen/meta_count"
                android:textStyle="bold" />
 
            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:fontFamily="@string/font_family_condensed"
                android:text="@string/followers"
                android:textColor="@android:color/white"
                android:textSize="@dimen/meta_label" />
        </LinearLayout>
 
        <LinearLayout
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:gravity="center"
            android:orientation="vertical">
 
            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="123"
                android:textColor="@android:color/white"
                android:textSize="@dimen/meta_count"
                android:textStyle="bold" />
 
            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:fontFamily="@string/font_family_condensed"
                android:text="@string/following"
                android:textColor="@android:color/white"
                android:textSize="@dimen/meta_label" />
        </LinearLayout>
    </LinearLayout>
 
</LinearLayout>
```

Chạy app chúng ta sẽ thấy như sau :

![](https://images.viblo.asia/306d6777-24be-437e-8bdc-90612593aa37.jpg)

## 3. Thêm function Image Pick và Crop

Tạo một xml file name** file_paths.xml** trong folder **res ⇒ xml**

**file_paths.xml**

```
<?xml version="1.0" encoding="utf-8"?>
<paths>
    <external-cache-path
        name="cache"
        path="camera" />
</paths>
```

Mở file AndroidManifest.xml và thêm các thuộc tính sau :

```
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="info.androidhive.imagepicker">
 
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
 
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme"
        tools:ignore="GoogleAppIndexingWarning">
        <activity android:name=".ImagePickerActivity" />
        <activity
            android:name=".MainActivity"
            android:label="@string/app_name"
            android:screenOrientation="portrait"
            android:theme="@style/AppTheme.NoActionBar">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
 
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
 
        <!-- uCrop cropping activity -->
        <activity
            android:name="com.yalantis.ucrop.UCropActivity"
            android:screenOrientation="portrait"
            android:theme="@style/AppTheme.NoActionBar" />
 
        <!-- cache directory file provider paths -->
        <provider
            android:name="android.support.v4.content.FileProvider"
            android:authorities="${applicationId}.provider"
            android:exported="false"
            android:grantUriPermissions="true">
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/file_paths" />
        </provider>
    </application>
 
</manifest>
```

Chúng ta sử dụng thư viện Glide để hiển thị hình ảnh, tạo một class tên là MyGlideModule và thêm code như sau :

**MyGlideModule.java**

```

package info.androidhive.imagepicker;
 
import com.bumptech.glide.annotation.GlideModule;
import com.bumptech.glide.module.AppGlideModule;
 
@GlideModule
public class MyGlideModule extends AppGlideModule {
}
```

Chúng ta sẽ viết 1 class để chọn và hiển thị ảnh như sau :

**ImagePickerActivity.java**

```
package info.androidhive.imagepicker;
 
import android.Manifest;
import android.app.Activity;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.provider.OpenableColumns;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.widget.Toast;
 
import com.karumi.dexter.Dexter;
import com.karumi.dexter.MultiplePermissionsReport;
import com.karumi.dexter.PermissionToken;
import com.karumi.dexter.listener.PermissionRequest;
import com.karumi.dexter.listener.multi.MultiplePermissionsListener;
import com.yalantis.ucrop.UCrop;
 
import java.io.File;
import java.util.List;
 
import static android.support.v4.content.FileProvider.getUriForFile;
 
public class ImagePickerActivity extends AppCompatActivity {
    private static final String TAG = ImagePickerActivity.class.getSimpleName();
    public static final String INTENT_IMAGE_PICKER_OPTION = "image_picker_option";
    public static final String INTENT_ASPECT_RATIO_X = "aspect_ratio_x";
    public static final String INTENT_ASPECT_RATIO_Y = "aspect_ratio_Y";
    public static final String INTENT_LOCK_ASPECT_RATIO = "lock_aspect_ratio";
    public static final String INTENT_IMAGE_COMPRESSION_QUALITY = "compression_quality";
    public static final String INTENT_SET_BITMAP_MAX_WIDTH_HEIGHT = "set_bitmap_max_width_height";
    public static final String INTENT_BITMAP_MAX_WIDTH = "max_width";
    public static final String INTENT_BITMAP_MAX_HEIGHT = "max_height";
 
 
    public static final int REQUEST_IMAGE_CAPTURE = 0;
    public static final int REQUEST_GALLERY_IMAGE = 1;
 
    private boolean lockAspectRatio = false, setBitmapMaxWidthHeight = false;
    private int ASPECT_RATIO_X = 16, ASPECT_RATIO_Y = 9, bitmapMaxWidth = 1000, bitmapMaxHeight = 1000;
    private int IMAGE_COMPRESSION = 80;
    public static String fileName;
 
    public interface PickerOptionListener {
        void onTakeCameraSelected();
 
        void onChooseGallerySelected();
    }
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_image_picker);
 
        Intent intent = getIntent();
        if (intent == null) {
            Toast.makeText(getApplicationContext(), getString(R.string.toast_image_intent_null), Toast.LENGTH_LONG).show();
            return;
        }
 
        ASPECT_RATIO_X = intent.getIntExtra(INTENT_ASPECT_RATIO_X, ASPECT_RATIO_X);
        ASPECT_RATIO_Y = intent.getIntExtra(INTENT_ASPECT_RATIO_Y, ASPECT_RATIO_Y);
        IMAGE_COMPRESSION = intent.getIntExtra(INTENT_IMAGE_COMPRESSION_QUALITY, IMAGE_COMPRESSION);
        lockAspectRatio = intent.getBooleanExtra(INTENT_LOCK_ASPECT_RATIO, false);
        setBitmapMaxWidthHeight = intent.getBooleanExtra(INTENT_SET_BITMAP_MAX_WIDTH_HEIGHT, false);
        bitmapMaxWidth = intent.getIntExtra(INTENT_BITMAP_MAX_WIDTH, bitmapMaxWidth);
        bitmapMaxHeight = intent.getIntExtra(INTENT_BITMAP_MAX_HEIGHT, bitmapMaxHeight);
 
        int requestCode = intent.getIntExtra(INTENT_IMAGE_PICKER_OPTION, -1);
        if (requestCode == REQUEST_IMAGE_CAPTURE) {
            takeCameraImage();
        } else {
            chooseImageFromGallery();
        }
    }
 
    public static void showImagePickerOptions(Context context, PickerOptionListener listener) {
        // setup the alert builder
        AlertDialog.Builder builder = new AlertDialog.Builder(context);
        builder.setTitle(context.getString(R.string.lbl_set_profile_photo));
 
        // add a list
        String[] animals = {context.getString(R.string.lbl_take_camera_picture), context.getString(R.string.lbl_choose_from_gallery)};
        builder.setItems(animals, (dialog, which) -> {
            switch (which) {
                case 0:
                    listener.onTakeCameraSelected();
                    break;
                case 1:
                    listener.onChooseGallerySelected();
                    break;
            }
        });
 
        // create and show the alert dialog
        AlertDialog dialog = builder.create();
        dialog.show();
    }
 
    private void takeCameraImage() {
        Dexter.withActivity(this)
                .withPermissions(Manifest.permission.CAMERA, Manifest.permission.WRITE_EXTERNAL_STORAGE)
                .withListener(new MultiplePermissionsListener() {
                    @Override
                    public void onPermissionsChecked(MultiplePermissionsReport report) {
                        if (report.areAllPermissionsGranted()) {
                            fileName = System.currentTimeMillis() + ".jpg";
                            Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                            takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, getCacheImagePath(fileName));
                            if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
                                startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
                            }
                        }
                    }
 
                    @Override
                    public void onPermissionRationaleShouldBeShown(List<PermissionRequest> permissions, PermissionToken token) {
                        token.continuePermissionRequest();
                    }
                }).check();
    }
 
    private void chooseImageFromGallery() {
        Dexter.withActivity(this)
                .withPermissions(Manifest.permission.CAMERA, Manifest.permission.WRITE_EXTERNAL_STORAGE)
                .withListener(new MultiplePermissionsListener() {
                    @Override
                    public void onPermissionsChecked(MultiplePermissionsReport report) {
                        if (report.areAllPermissionsGranted()) {
                            Intent pickPhoto = new Intent(Intent.ACTION_PICK,
                                    android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
                            startActivityForResult(pickPhoto, REQUEST_GALLERY_IMAGE);
                        }
                    }
 
                    @Override
                    public void onPermissionRationaleShouldBeShown(List<PermissionRequest> permissions, PermissionToken token) {
                        token.continuePermissionRequest();
                    }
                }).check();
 
    }
 
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        switch (requestCode) {
            case REQUEST_IMAGE_CAPTURE:
                if (resultCode == RESULT_OK) {
                    cropImage(getCacheImagePath(fileName));
                } else {
                    setResultCancelled();
                }
                break;
            case REQUEST_GALLERY_IMAGE:
                if (resultCode == RESULT_OK) {
                    Uri imageUri = data.getData();
                    cropImage(imageUri);
                } else {
                    setResultCancelled();
                }
                break;
            case UCrop.REQUEST_CROP:
                if (resultCode == RESULT_OK) {
                    handleUCropResult(data);
                } else {
                    setResultCancelled();
                }
                break;
            case UCrop.RESULT_ERROR:
                final Throwable cropError = UCrop.getError(data);
                Log.e(TAG, "Crop error: " + cropError);
                setResultCancelled();
                break;
            default:
                setResultCancelled();
        }
    }
 
    private void cropImage(Uri sourceUri) {
        Uri destinationUri = Uri.fromFile(new File(getCacheDir(), queryName(getContentResolver(), sourceUri)));
        UCrop.Options options = new UCrop.Options();
        options.setCompressionQuality(IMAGE_COMPRESSION);
        options.setToolbarColor(ContextCompat.getColor(this, R.color.colorPrimary));
        options.setStatusBarColor(ContextCompat.getColor(this, R.color.colorPrimary));
        options.setActiveWidgetColor(ContextCompat.getColor(this, R.color.colorPrimary));
 
        if (lockAspectRatio)
            options.withAspectRatio(ASPECT_RATIO_X, ASPECT_RATIO_Y);
 
        if (setBitmapMaxWidthHeight)
            options.withMaxResultSize(bitmapMaxWidth, bitmapMaxHeight);
 
        UCrop.of(sourceUri, destinationUri)
                .withOptions(options)
                .start(this);
    }
 
    private void handleUCropResult(Intent data) {
        if (data == null) {
            setResultCancelled();
            return;
        }
        final Uri resultUri = UCrop.getOutput(data);
        setResultOk(resultUri);
    }
 
    private void setResultOk(Uri imagePath) {
        Intent intent = new Intent();
        intent.putExtra("path", imagePath);
        setResult(Activity.RESULT_OK, intent);
        finish();
    }
 
    private void setResultCancelled() {
        Intent intent = new Intent();
        setResult(Activity.RESULT_CANCELED, intent);
        finish();
    }
 
    private Uri getCacheImagePath(String fileName) {
        File path = new File(getExternalCacheDir(), "camera");
        if (!path.exists()) path.mkdirs();
        File image = new File(path, fileName);
        return getUriForFile(ImagePickerActivity.this, getPackageName() + ".provider", image);
    }
 
    private static String queryName(ContentResolver resolver, Uri uri) {
        Cursor returnCursor =
                resolver.query(uri, null, null, null, null);
        assert returnCursor != null;
        int nameIndex = returnCursor.getColumnIndex(OpenableColumns.DISPLAY_NAME);
        returnCursor.moveToFirst();
        String name = returnCursor.getString(nameIndex);
        returnCursor.close();
        return name;
    }
 
    /**
     * Calling this will delete the images from cache directory
     * useful to clear some memory
     */
    public static void clearCache(Context context) {
        File path = new File(context.getExternalCacheDir(), "camera");
        if (path.exists() && path.isDirectory()) {
            for (File child : path.listFiles()) {
                child.delete();
            }
        }
    }
}
```

3.1. Khởi tạo crop activity

Để hiển thị ảnh đã chọn, gọi ** ImagePickerActivity.showImagePickerOptions()**
```
ImagePickerActivity.showImagePickerOptions(this, new ImagePickerActivity.PickerOptionListener() {
            @Override
            public void onTakeCameraSelected() {
                // launchCameraIntent();
            }
 
            @Override
            public void onChooseGallerySelected() {
                // launchGalleryIntent();
            }
        });
```
Khi một option được chọn, bạn có thể truyền Intent và gửi đi. 
Ví dụ chọn ảnh từ Gallery với tỉ lệ 1x1, Intent được gọi như sau :
```
Intent intent = new Intent(MainActivity.this, ImagePickerActivity.class);
intent.putExtra(ImagePickerActivity.INTENT_IMAGE_PICKER_OPTION, ImagePickerActivity.REQUEST_IMAGE_CAPTURE);
 
// setting aspect ratio
intent.putExtra(ImagePickerActivity.INTENT_LOCK_ASPECT_RATIO, true);
intent.putExtra(ImagePickerActivity.INTENT_ASPECT_RATIO_X, 1); // 16x9, 1x1, 3:4, 3:2
intent.putExtra(ImagePickerActivity.INTENT_ASPECT_RATIO_Y, 1);
 
startActivityForResult(intent, REQUEST_IMAGE);
```

Mở **MainActivity.java** và gọi image picker khi người dùng tap vào ảnh profile hoặc icon dấu + :

**MainActivity.java**
```
package info.androidhive.imagepicker;
 
import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.provider.Settings;
import android.support.annotation.Nullable;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.widget.ImageView;
 
import com.karumi.dexter.Dexter;
import com.karumi.dexter.MultiplePermissionsReport;
import com.karumi.dexter.PermissionToken;
import com.karumi.dexter.listener.PermissionRequest;
import com.karumi.dexter.listener.multi.MultiplePermissionsListener;
 
import java.io.IOException;
import java.util.List;
 
import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;
 
public class MainActivity extends AppCompatActivity {
    private static final String TAG = MainActivity.class.getSimpleName();
    public static final int REQUEST_IMAGE = 100;
 
    @BindView(R.id.img_profile)
    ImageView imgProfile;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ButterKnife.bind(this);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setTitle(null);
 
        loadProfileDefault();
 
        // Clearing older images from cache directory
        // don't call this line if you want to choose multiple images in the same activity
        // call this once the bitmap(s) usage is over
        ImagePickerActivity.clearCache(this);
    }
 
    private void loadProfile(String url) {
        Log.d(TAG, "Image cache path: " + url);
 
        GlideApp.with(this).load(url)
                .into(imgProfile);
        imgProfile.setColorFilter(ContextCompat.getColor(this, android.R.color.transparent));
    }
 
    private void loadProfileDefault() {
        GlideApp.with(this).load(R.drawable.baseline_account_circle_black_48)
                .into(imgProfile);
        imgProfile.setColorFilter(ContextCompat.getColor(this, R.color.profile_default_tint));
    }
 
    @OnClick({R.id.img_plus, R.id.img_profile})
    void onProfileImageClick() {
        Dexter.withActivity(this)
                .withPermissions(Manifest.permission.CAMERA, Manifest.permission.WRITE_EXTERNAL_STORAGE)
                .withListener(new MultiplePermissionsListener() {
                    @Override
                    public void onPermissionsChecked(MultiplePermissionsReport report) {
                        if (report.areAllPermissionsGranted()) {
                            showImagePickerOptions();
                        }
 
                        if (report.isAnyPermissionPermanentlyDenied()) {
                            showSettingsDialog();
                        }
                    }
 
                    @Override
                    public void onPermissionRationaleShouldBeShown(List<PermissionRequest> permissions, PermissionToken token) {
                        token.continuePermissionRequest();
                    }
                }).check();
    }
 
    private void showImagePickerOptions() {
        ImagePickerActivity.showImagePickerOptions(this, new ImagePickerActivity.PickerOptionListener() {
            @Override
            public void onTakeCameraSelected() {
                launchCameraIntent();
            }
 
            @Override
            public void onChooseGallerySelected() {
                launchGalleryIntent();
            }
        });
    }
 
    private void launchCameraIntent() {
        Intent intent = new Intent(MainActivity.this, ImagePickerActivity.class);
        intent.putExtra(ImagePickerActivity.INTENT_IMAGE_PICKER_OPTION, ImagePickerActivity.REQUEST_IMAGE_CAPTURE);
 
        // setting aspect ratio
        intent.putExtra(ImagePickerActivity.INTENT_LOCK_ASPECT_RATIO, true);
        intent.putExtra(ImagePickerActivity.INTENT_ASPECT_RATIO_X, 1); // 16x9, 1x1, 3:4, 3:2
        intent.putExtra(ImagePickerActivity.INTENT_ASPECT_RATIO_Y, 1);
 
        // setting maximum bitmap width and height
        intent.putExtra(ImagePickerActivity.INTENT_SET_BITMAP_MAX_WIDTH_HEIGHT, true);
        intent.putExtra(ImagePickerActivity.INTENT_BITMAP_MAX_WIDTH, 1000);
        intent.putExtra(ImagePickerActivity.INTENT_BITMAP_MAX_HEIGHT, 1000);
 
        startActivityForResult(intent, REQUEST_IMAGE);
    }
 
    private void launchGalleryIntent() {
        Intent intent = new Intent(MainActivity.this, ImagePickerActivity.class);
        intent.putExtra(ImagePickerActivity.INTENT_IMAGE_PICKER_OPTION, ImagePickerActivity.REQUEST_GALLERY_IMAGE);
 
        // setting aspect ratio
        intent.putExtra(ImagePickerActivity.INTENT_LOCK_ASPECT_RATIO, true);
        intent.putExtra(ImagePickerActivity.INTENT_ASPECT_RATIO_X, 1); // 16x9, 1x1, 3:4, 3:2
        intent.putExtra(ImagePickerActivity.INTENT_ASPECT_RATIO_Y, 1);
        startActivityForResult(intent, REQUEST_IMAGE);
    }
 
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        if (requestCode == REQUEST_IMAGE) {
            if (resultCode == Activity.RESULT_OK) {
                Uri uri = data.getParcelableExtra("path");
                try {
                    // You can update this bitmap to your server
                    Bitmap bitmap = MediaStore.Images.Media.getBitmap(this.getContentResolver(), uri);
 
                    // loading profile image from local cache
                    loadProfile(uri.toString());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
 
    /**
     * Showing Alert Dialog with Settings option
     * Navigates user to app settings
     * NOTE: Keep proper title and message depending on your app
     */
    private void showSettingsDialog() {
        AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
        builder.setTitle(getString(R.string.dialog_permission_title));
        builder.setMessage(getString(R.string.dialog_permission_message));
        builder.setPositiveButton(getString(R.string.go_to_settings), (dialog, which) -> {
            dialog.cancel();
            openSettings();
        });
        builder.setNegativeButton(getString(android.R.string.cancel), (dialog, which) -> dialog.cancel());
        builder.show();
 
    }
 
    // navigating user to app settings
    private void openSettings() {
        Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
        Uri uri = Uri.fromParts("package", getPackageName(), null);
        intent.setData(uri);
        startActivityForResult(intent, 101);
    }
}
```
![](https://images.viblo.asia/855e4ed7-3462-428c-b9bc-6a68cf33d39e.jpg)