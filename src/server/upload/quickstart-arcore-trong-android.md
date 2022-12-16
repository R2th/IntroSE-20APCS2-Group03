Ở bài viết trước mình đã giới thiệu sơ qua cơ bản về ARCore trên Android. Ở bài viết này chúng ta sẽ tìm hiểu làm thế nào để enable ARCore trong device Android nhé :D 

Bạn sẽ cần:
1. [ Add AR Require hoặc AR Optional entry vào trong manifest](https://developers.google.com/ar/develop/java/enable-arcore#manifest)
2.  [Add build dependencies](https://developers.google.com/ar/develop/java/enable-arcore#dependencies) vào project
3.  [Thực hiện check ở runtime](https://developers.google.com/ar/develop/java/enable-arcore#runtime) để đảm bảo ARCore được support và đã cài đặt, cùng với đó là quyền mở camera.
4.  App thoả mãn ARCore's [User Privacy Requirements](https://developers.google.com/ar/distribute/privacy-requirements)


## Add AR Required hoặc AR Optional entries vào manifest

Có 2 loại AR apps: **AR Required** và **AR Optional**.

### AR Optional app

App sử dụng AR optional feature sẽ chỉ được activate trên device support ARCore được gọi là *AR Optional* apps.

* AR Optional apps có thể được cài đặt và chạy trên device không support ARCore.
* Khi user cài đặt AR Optional app, Play Store sẽ *không* tự động cài đặt [ARCore](https://play.google.com/store/apps/details?id=com.google.ar.core).

Để định nghĩa app của bạn là *AR Optional*, thêm vào **AndroidManifest** đoạn định nghĩa sau:

```kotlin
<!-- "AR Optional" apps must declare minSdkVersion ≥ 14 -->
<uses-sdk android:minSdkVersion="14" />

<uses-permission android:name="android.permission.CAMERA" />

<application>
    …
    <!-- Indicates that app supports, but does not require ARCore ("AR Optional").
         Unlike "AR Required" apps, Google Play Store will not automatically
         download and install ARCore when the app is installed.
    -->
    <meta-data android:name="com.google.ar.core" android:value="optional" />
</application>
```

### AR Required apps

App mà không thể sử dụng nếu device không support AR được gọi là *AR Required* apps.

* AR Required app sẽ chỉ hiện trên Play Store đối với những device support ARCore.
* Khi user cài đặt AR Required app, Play Store sẽ tự động cài đặt [ARCore](https://play.google.com/store/apps/details?id=com.google.ar.core). Tuy nhiên, app vẫn sẽ phải thực hiện thêm [runtime check](https://developers.google.com/ar/develop/java/enable-arcore#runtime) trong trường hợp ARCore bị gỡ cài đặt sau đó hoặc có yêu cầu update ARCore.

Thông tin chi tiết, xem ở [Publishing AR Apps in the Play Store](https://developers.google.com/ar/distribute/).

Để định nghĩa app của bạn là *AR Required*, thêm vào file **AndroidManifest** như sau:

```kotlin
<!-- "AR Required" apps must declare minSdkVersion ≥ 24 -->
<uses-sdk android:minSdkVersion="24" />

<uses-permission android:name="android.permission.CAMERA" />

<!-- Indicates that app requires ARCore ("AR Required"). Ensures app is only
     visible in the Google Play Store on devices that support ARCore.
-->
<uses-feature android:name="android.hardware.camera.ar" />

<application>
    …
    <!-- Indicates that app requires ARCore ("AR Required"). Causes Google
         Play Store to download and install ARCore when the app is installed.
    -->
    <meta-data android:name="com.google.ar.core" android:value="required" />
</application>
```

### Add build dependencies

Để thêm ARCore vào Android Studio project, ta làm như sau:

* Đảm bảo rằng file **build.gradle** đã thêm Google's Maven repository:

```kotlin
allprojects {
    repositories {
        google()
        …
```

* Add library ARCore mới nhất như là một dependency trong **build.gradle** file:

```kotlin
dependencies {
    …
    implementation 'com.google.ar:core:1.7.0'
}
```

### Perform runtime checks

#### Check ARCore được hỗ trợ (*AR Optional* app only)

*AR Optional* apps có thể sử dụng **ArCoreApk.checkAvailability()** để xác định device có hỗ trợ ARCore hay không. Ở device không hỗ trợ ARCore, AR Optional app nên disable các function liên quan đến AR và ẩn các yếu tố liên quan:

```kotlin
@Override
protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(savedInstanceState);

  // Enable AR related functionality on ARCore supported devices only.
  maybeEnableArButton();
  …
}

void maybeEnableArButton() {
  ArCoreApk.Availability availability = ArCoreApk.getInstance().checkAvailability(this);
  if (availability.isTransient()) {
    // Re-query at 5Hz while compatibility is checked in the background.
    new Handler().postDelayed(new Runnable() {
      @Override
      public void run() {
        maybeEnableArButton();
      }
    }, 200);
  }
  if (availability.isSupported()) {
    mArButton.setVisibility(View.VISIBLE);
    mArButton.setEnabled(true);
    // indicator on the button.
  } else { // Unsupported or unknown.
    mArButton.setVisibility(View.INVISIBLE);
    mArButton.setEnabled(false);
  }
}
```

Hãy nhớ rằng **checkAvailability()** có thể sẽ phải sử dụng network resources để xác định device có hỗ trợ ARCore hay không. Trong thời gian này, nó sẽ trả về **UNKNOWN_CHECKING**. Để giảm độ trễ nhận biết và popup thông báo, app nên gọi **checkAvailability()** một lần ở đầu của life cycle để bắt đầu truy vấn thông tin, bỏ qua giá trị trả về. Bằng cách này, một kết quả được lưu trong cache sẽ có sẵn ngay lập tức khi **maybeEnableArButton()** được gọi.

Sơ đồ minh hoạ logic trong đoạn code trên:

![](https://images.viblo.asia/39472c8c-f942-4a08-ac07-cfd31feb4904.png)

Request camera permission (*AR Optional* and *AR Required* apps)

Cả *AR Optional* và *AR Required* app sẽ phải đảm bảo rằng camera permission đã được cấp trước khi khởi tạo AR Session. **hello_ar_java** sample cung cấp [CameraPermissionHelper](https://github.com/google-ar/arcore-android-sdk/search?q=CameraPermissionHelper.java) class để bạn có thể sử dụng và gọi trong AR activity  hàm **onResume()**:

```kotlin
@Override
protected void onResume() {
  super.onResume();

  // ARCore requires camera permission to operate.
  if (!CameraPermissionHelper.hasCameraPermission(this)) {
    CameraPermissionHelper.requestCameraPermission(this);
    return;
  }

  …
}
```

AR Activity phải implement **onRequestPermissionsResult(…)**:

```kotlin
@Override
public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] results) {
  if (!CameraPermissionHelper.hasCameraPermission(this)) {
    Toast.makeText(this, "Camera permission is needed to run this application", Toast.LENGTH_LONG)
        .show();
    if (!CameraPermissionHelper.shouldShowRequestPermissionRationale(this)) {
      // Permission denied with checking "Do not ask again".
      CameraPermissionHelper.launchPermissionSettings(this);
    }
    finish();
  }
}
```

#### Check ARCore đã installed (*AR Optional* và *AR Required* apps)

App cũng cần gọi **ArCoreApk.requestInstall()** trước khi khởi tạo ARCore sesion để check phiên bản phù hợp của ARCore đã được cài đặt. Phương thức này cũng nhắc user cài đặt hoặc update nếu cần:

```kotlin
// Set to true ensures requestInstall() triggers installation if necessary.
private boolean mUserRequestedInstall = true;

@Override
protected void onResume() {
  super.onResume();

  // Check camera permission.
  …

  // Make sure ARCore is installed and up to date.
  try {
    if (mSession == null) {
      switch (ArCoreApk.getInstance().requestInstall(this, mUserRequestedInstall)) {
        case INSTALLED:
          // Success, create the AR session.
          mSession = new Session(this);
          break;
        case INSTALL_REQUESTED:
          // Ensures next invocation of requestInstall() will either return
          // INSTALLED or throw an exception.
          mUserRequestedInstall = false;
          return;
      }
    }
  } catch (UnavailableUserDeclinedInstallationException e) {
    // Display an appropriate message to the user and return gracefully.
    Toast.makeText(this, "TODO: handle exception " + e, Toast.LENGTH_LONG)
        .show();
    return;
  } catch (…) {  // Current catch statements.
    …
    return;  // mSession is still null.
  }
  …
}
```

Sơ đồ minh hoạ logic trong đoạn code trên:

![](https://images.viblo.asia/09562544-f2dc-4b77-990e-dc4a5810876c.png)

Nếu **requestInstall()** trả về **INSTALL_REQUESTED**, activity hiện tại sẽ pause và user sẽ được nhắc nhở cài đặt hoặc update ARCore:

![](https://images.viblo.asia/9dde74ef-50eb-45bc-97b5-136de769ec49.png)

**onResume** sẽ được thực thi lại và đưa user trở lại activity.

### User Privacy Requirements

Hãy đảm bảo rằng app của bạn được compile với ARCore's [User Privacy Requirements](https://developers.google.com/ar/distribute/privacy-requirements).

Bài viết của mình đến đây là hết. Cảm ơn các bạn đã đọc bài của mình :D