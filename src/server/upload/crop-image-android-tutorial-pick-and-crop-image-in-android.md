Xin chào mọi người, trong bài này, mình sẽ chia sẻ cách để tạo 1 ứng dụng crop image nho nhỏ, giống như khi chúng ta chọn ảnh đại diện trên facebook vậy .
## Adding Library
Đầu tiên, ta cần add thư viện, trong bài này, mình sẽ sử dụng thư viện: ":android-image-cropper" để xử lý:
* Add project level lib:
```
maven { url "https://jitpack.io" }
```
* Tiếp theo, add vào app level :
```
compile 'com.theartofdev.edmodo:android-image-cropper:2.3.+'
```
## Creating Interface
```
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:background="@android:color/black">
 
<TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Tap on the image below to change your profile picture"
    android:textColor="@android:color/white"
    android:textSize="20dp"
    android:id="@+id/textView" />
 
 
    <FrameLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_below="@+id/quick_start_cropped_image"
    android:background="@android:color/white"
    >
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical">
 
        <TextView
            android:layout_width="wrap_content"
            android:textColor="@android:color/black"
            android:layout_height="wrap_content"
            android:text="Name: Manish Kumar"
            android:textSize="30dp"
            android:layout_gravity="center"
            />
        <TextView
            android:textColor="@android:color/black"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Email: manishh776@gmail.com"
            android:textSize="25dp"
            android:layout_gravity="center"
            />
        <TextView
            android:textColor="@android:color/black"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="MobileNo:1234567890"
            android:textSize="25dp"
            android:layout_gravity="center"
            />
 
    </LinearLayout>
 
 
</FrameLayout>
 
    <ImageButton
        android:id="@+id/quick_start_cropped_image"
        android:layout_width="200dp"
        android:layout_height="200dp"
        android:src="@drawable/profile"
        android:layout_marginTop="39dp"
        android:layout_below="@+id/textView"
        android:layout_centerHorizontal="true" />
 
</RelativeLayout>
```

## MainActivity
- Nơi đây xử lý logic của app. Mọi logic sẽ được sử lý trong  class này.
```
package chutka.bitman.com.bestimagecropperever;
 
 
import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.Toast;
 
import com.theartofdev.edmodo.cropper.CropImage;
import com.theartofdev.edmodo.cropper.CropImageView;
 
 
public class MainActivity extends AppCompatActivity {
 
    ImageButton imageButton;
 
    /**
     * Persist URI image to crop URI if specific permissions are required
     */
    private Uri mCropImageUri;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
 
        imageButton = (ImageButton) findViewById(R.id.quick_start_cropped_image);
        imageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onSelectImageClick(v);
            }
        });
 
    }
 
    /**
     * Start pick image activity with chooser.
     */
    public void onSelectImageClick(View view) {
        CropImage.startPickImageActivity(this);
    }
 
    @Override
    @SuppressLint("NewApi")
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
 
        // handle result of pick image chooser
        if (requestCode == CropImage.PICK_IMAGE_CHOOSER_REQUEST_CODE && resultCode == Activity.RESULT_OK) {
            Uri imageUri = CropImage.getPickImageResultUri(this, data);
 
            // For API >= 23 we need to check specifically that we have permissions to read external storage.
            if (CropImage.isReadExternalStoragePermissionsRequired(this, imageUri)) {
                // request permissions and handle the result in onRequestPermissionsResult()
                mCropImageUri = imageUri;
                requestPermissions(new String[]{Manifest.permission.READ_EXTERNAL_STORAGE}, 0);
            } else {
                // no permissions required or already grunted, can start crop image activity
                startCropImageActivity(imageUri);
            }
        }
 
        // handle result of CropImageActivity
        if (requestCode == CropImage.CROP_IMAGE_ACTIVITY_REQUEST_CODE) {
            CropImage.ActivityResult result = CropImage.getActivityResult(data);
            if (resultCode == RESULT_OK) {
                ((ImageButton) findViewById(R.id.quick_start_cropped_image)).setImageURI(result.getUri());
                Toast.makeText(this, "Cropping successful, Sample: " + result.getSampleSize(), Toast.LENGTH_LONG).show();
            } else if (resultCode == CropImage.CROP_IMAGE_ACTIVITY_RESULT_ERROR_CODE) {
                Toast.makeText(this, "Cropping failed: " + result.getError(), Toast.LENGTH_LONG).show();
            }
        }
    }
 
    @Override
    public void onRequestPermissionsResult(int requestCode, String permissions[], int[] grantResults) {
        if (mCropImageUri != null && grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            // required permissions granted, start crop image activity
            startCropImageActivity(mCropImageUri);
        } else {
            Toast.makeText(this, "Cancelling, required permissions are not granted", Toast.LENGTH_LONG).show();
        }
    }
 
    /**
     * Start crop image activity for the given image.
     */
    private void startCropImageActivity(Uri imageUri) {
        CropImage.activity(imageUri)
                .setGuidelines(CropImageView.Guidelines.ON)
                .setMultiTouchEnabled(true)
                .start(this);
    }
}
```
## Android Manifest
- Tiếp theo là file Manifest, nơi khai báo các permission, activity....
```
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="chutka.bitman.com.bestimagecropperever">
    
    
 
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
 
        android:theme="@style/Base.Theme.AppCompat">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
 
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
 
        <activity android:name="com.theartofdev.edmodo.cropper.CropImageActivity"/>
    </application>
 
</manifest>
```

Bây giờ chỉa cần bạn chạy app lên , sẽ thấy được thành quả !!

Và đây là thành quả của chúng ta:

![](https://images.viblo.asia/99078fa5-21f6-486c-82ce-ce9fddbc16c9.gif)

Bài viết được tham khảo từ: https://github.com/ArthurHub/Android-Image-Cropper