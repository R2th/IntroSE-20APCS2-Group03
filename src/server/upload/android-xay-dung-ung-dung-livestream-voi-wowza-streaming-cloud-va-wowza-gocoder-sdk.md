Ở bài viết này mình tổng hợp hướng dẫn cách tạo một ứng dụng livestream đơn giản bằng cách sử dụng các công cụ hỗ trợ của Wowza. Đây là bài viết đầu tiên của mình nếu có gì không hài lòng mong các bạn comment góp ý. Mong bài viết sẽ giúp ích được cho bạn. 

Đầu tiên sử dụng GoCoder SDK sẽ giúp bạn quay video và mã hóa video. Sau đó đẩy video được mã hóa đó lên Wowza Streaming Cloud và bạn sẽ có một kênh để sử dụng xem livestream. Wowza cung cấp cả công cụ để bạn có thể build server tại local nhưng ở bài viết này mình sử dụng cloud cho tiện nhé.

Bạn vào 2 link này đăng kí để có thể sử dụng free trial: [GoCoderSDK](https://www.wowza.com/products/gocoder/sdk/trial)  và [StreamingCloud](https://www.wowza.com/pricing/cloud-free-trial)
# Streaming Cloud
* Đăng nhập vào WowzaStreamingCloud bằng tài khoản vừa đăng kí, chọn **Add Live Stream** để tạo mới và cài đặt kênh livestream của bạn. Sau đó bạn sẽ nhận được thông tin về kênh livestream của mình giống như này:
> Lưu ý: Ở phần **Video Source and Transcoder Settings** bạn chọn **WowzaGoCoder**
> Trước khi livestream bạn chọn **Start your live stream now** trước
![Information](https://images.viblo.asia/605a336b-30d7-4886-b6fd-f0e14c857f1b.png)

# GoCoder SDK
## Hướng dẫn download và cài đặt
* Trước tiên bạn tải bản mới nhất của SDK tại đây [Wowza GoCoder SDK for Android](http://www.wowza.com/resources/gocodersdk/docs/1.0/54f8721827aeb3bebffcca5e3b1a0d43/)

* Giải nén file .zip vừa tải về bạn sẽ có một forder có tên **com.wowza.gocoder.sdk.aar**. Copy forder này và paste vào forder **libs** của project. Mặc định forder **libs** sẽ ở **[project_root]/app/libs**
* Trong Android Studio, bạn thêm đoạn code sau vào **build.gradle(Module:app)**
```
repositories {
    flatDir {
        dirs 'libs'
    }
}

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])

    // Khai báo sự phụ thuộc GoCoder SDK

    compile 'com.wowza.gocoder.sdk.android:com.wowza.gocoder.sdk:1.0b7@aar'
}
```
##  Khai báo các quyền cần thiết trong  **AndroidManifest.xml**
```
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.FLASHLIGHT" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
```
## Tạo màn hình giao diện Camera
* Giao diện với CameraView và button để start live stream
```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
  xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:tools="http://schemas.android.com/tools"
  xmlns:wowza="http://schemas.android.com/apk/res-auto"
  android:id="@+id/activity_main"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  tools:context="com.mycompany.myapp.MainActivity">

  <!-- Hiển thị camera -->
  <com.wowza.gocoder.sdk.api.devices.WZCameraView
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:id="@+id/camera_preview"
    wowza:scaleMode="fill"
    wowza:defaultCamera="back"
    wowza:frameSizePreset="frameSize1280x720"/>

  <!-- The broadcast button -->
  <Button
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Broadcast"
    android:id="@+id/broadcast_button"
    android:layout_alignParentBottom="true"
    android:layout_centerHorizontal="true" />

</RelativeLayout>
```
* Bật chế độ [immersive full-screen](https://developer.android.com/training/system-ui/immersive.html#sticky)
```
@Override
public void onWindowFocusChanged(boolean hasFocus) {
  super.onWindowFocusChanged(hasFocus);

  View rootView = getWindow().getDecorView().findViewById(android.R.id.content);
  if (rootView != null)
    rootView.setSystemUiVisibility(
        View.SYSTEM_UI_FLAG_LAYOUT_STABLE
            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
            | View.SYSTEM_UI_FLAG_FULLSCREEN
            | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
}
```
## Định nghĩa các thuộc tính ứng dụng
* Thêm các biến vào **MainActivity.java**
```
public class MainActivity extends AppCompatActivity {

    // The GoCoder API interface
    private WowzaGoCoder goCoder;

    // The GoCoder SDK camera view
    private WZCameraView goCoderCameraView;

    // The GoCoder SDK audio device
    private WZAudioDevice goCoderAudioDevice;

    // Cấu hình cài đặt broadcast 
    private WZBroadcastConfig goCoderBroadcastConfig;

    // Thuộc tình xử lý quyền dành cho Android6+
    private static final int PERMISSIONS_REQUEST_CODE = 0x1;
    private boolean mPermissionsGranted = true;
    private String[] mRequiredPermissions = new String[] {
            Manifest.permission.CAMERA,
            Manifest.permission.RECORD_AUDIO
    };
```
## Đăng ký và khởi tạo SDK
* Thêm vào **onCreate()** của lớp **MainActivity** và thay **GOSK-XXXX-XXXX-XXXX-XXXX-XXXX** bằng mã bạn nhận được sau khi đăng ký SDK mình nói ở phần đầu
```
// Khởi tạo GoCoder SDK
goCoder = WowzaGoCoder.init(getApplicationContext(), "GOSK-XXXX-XXXX-XXXX-XXXX-XXXX");

if (goCoder == null) {
    // Nếu việc khởi tạo không thành công -> hiện thông báo cho người dùng
    WZError goCoderInitError = WowzaGoCoder.getLastError();
    Toast.makeText(this,
        "GoCoder SDK error: " + goCoderInitError.getErrorDescription(),
        Toast.LENGTH_LONG).show();
    return;
}
```
## Kiểm tra quyền cho các bản Android 6.0 trở lên
```
@Override
protected void onResume() {
    super.onResume();
    
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
        mPermissionsGranted = hasPermissions(this, mRequiredPermissions);
        if (!mPermissionsGranted)
            ActivityCompat.requestPermissions(this, mRequiredPermissions, PERMISSIONS_REQUEST_CODE);
    } else
        mPermissionsGranted = true;

}

@Override
public void onRequestPermissionsResult(int requestCode, String permissions[], int[] grantResults) {
    mPermissionsGranted = true;
    switch (requestCode) {
        case PERMISSIONS_REQUEST_CODE: 
            for(int grantResult : grantResults) {
                if (grantResult != PackageManager.PERMISSION_GRANTED) {
                    mPermissionsGranted = false;
                }
            }
        }
    }
}

private static boolean hasPermissions(Context context, String[] permissions) {
    for(String permission : permissions)
        if (context.checkCallingOrSelfPermission(permission) != PackageManager.PERMISSION_GRANTED)
            return false;

    return true;
}
```
##  Hiển thị giao diện camera
* Định nghĩa **WZCameraView** trong main activity
```
goCoderCameraView = (WZCameraView) findViewById(R.id.camera_preview);

// Khởi tạo một Audio device instance để thu và phát âm thanh
goCoderAudioDevice = new WZAudioDevice();
```
* Sau khi check permission, bật tiếp camera
```
if (mPermissionsGranted && goCoderCameraView != null) {
    if (goCoderCameraView.isPreviewPaused())
        goCoderCameraView.onResume();
    else
        goCoderCameraView.startPreview();    
}
```
## Cấu hình broadcast stream
* Thay **hostAddress, portNumber, applicationName, streamName** của tài khoản Cloud của bạn vào đoạn code dưới đây (như hình mình đã đánh dấu bên trên) 
```
// Khởi tạo broadcast
goCoderBroadcaster = new WZBroadcast();

// Khởi tạo đối tượng cấu hình cho broadcast
goCoderBroadcastConfig = new WZBroadcastConfig(WZMediaConfig.FRAME_SIZE_1920x1080);

// Set thông tin cho tài khoản bạn cần kết nối
goCoderBroadcastConfig.setHostAddress("live.someserver.net");
goCoderBroadcastConfig.setPortNumber(1935);
goCoderBroadcastConfig.setApplicationName("live");
goCoderBroadcastConfig.setStreamName("myStream");

// Chỉ định sử dụng hình ảnh từ máy ảnh làm video nguồn để gửi
goCoderBroadcastConfig.setVideoBroadcaster(goCoderCameraView);

// Tương tự với âm thanh
goCoderBroadcastConfig.setAudioBroadcaster(goCoderAudioDevice);
```
* Để theo dõi trạng thái việc phát video cũng như là lỗi chương trình bạn có thể implement thêm class **WZStatusCallback**
## Bắt đầu Streaming
* Implement **View.onClickListener** và xử lý **onClick()** cho **button** ở layout
```
Button broadcastButton = findViewById(R.id.broadcast_button);
broadcastButton.setOnClickListener(this);

@Override
public void onClick(View view) {
  // return nếu người dùng không cấp quyền cho app
  if (!mPermissionsGranted) return;

  WZStreamingError configValidationError = goCoderBroadcastConfig.validateForBroadcast();
  if (configValidationError != null) {
    Toast.makeText(this, configValidationError.getErrorDescription(), Toast.LENGTH_LONG).show();
  } else if (goCoderBroadcaster.getStatus().isRunning()) {
    // Dừng broadcast hiện tại
    goCoderBroadcaster.endBroadcast(this);
  } else {
    // Bắt đầu streaming
    goCoderBroadcaster.startBroadcast(goCoderBroadcastConfig, this);
  }
}
```
* Giờ bạn có thể livestream và sử dụng **Hosted Page URL** bên trên để xem thành quả được rồi đó.
# Xem livestream
* Sau khi đã livestream được thì việc xem từ một thiết bị khác rất dễ dàng với **VideoView** ví dụ như sau: 
```
        VideoView videoView = findViewById(R.id.rtspVideo);
        videoView.setVideoURI(Uri.parse("rtsp://64e97b.entrypoint.cloud.wowza.com/app-bf4d/02a889ca"));
        videoView.requestFocus();
        videoView.start();
```
-----
# Kết
Đây là link github app demo của mình: [LiveStreamDemo ](https://github.com/nvs266/LiveStreamDemo) 
> Cảm ơn các bạn đã đọc bài viết của mình. Chúc bạn thành công!