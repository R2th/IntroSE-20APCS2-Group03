# 1. Giới thiệu
https://developer.android.com/topic/google-play-instant/overview

***Google Play Instant*** cho phép native apps và game có thể chạy mà không cần phải cài đặt (tối thiểu là Android 5.0 trở lên).
Bây giờ, người dùng sẽ không cần nhất thiết phải cài đặt app mà cũng có thể trải nghiệm được sơ qua ứng dụng như thế nào.

Dưới đây là giao diện trên Google Play để dùng thử app:


![](https://i.imgur.com/QxR3eF0.png)

### Nguyên lý hoạt động

Có 2 cách để sử dụng Google Play Instant, bạn có thể ấn nút **Try Now** hoặc ấn ink website banner để sử dụng thử app hoặc game mà không cần cài đặt.

![](https://i.imgur.com/v9Dji3P.png)

Khi Google Play nhận yêu cầu dùng Instant app hoặc Instant game thì Google Play sẽ gửi file chạy thử app cho devices.

### Điều kiện để sử dụng Google Play Instant

Google Play Instant có 2 loại sau:
 * `Basic instant experience`: cho phép người dùng sử dụng bằng cách ấn nút **Try Now** hoặc qua website banner.
 * `Enhanced instant experience`:  cho phép người dùng trải nghiệm app theo các loại dưới đây

![](https://i.imgur.com/iL5O1VW.png)

### Giới hạn kích cỡ App và Game

Dưới đây là mô tả lợi ích của việc giảm kích cỡ App

![](https://i.imgur.com/ZuzhC2a.png)

Còn dưới đây là kích cỡ Game:

![](https://i.imgur.com/QeAK5LA.png)

# 2. Cách bật Google Play Instant
#### Danh sách sử các app android đã sử dụng Instant App 
https://developer.android.com/stories/instant-apps/

Đến đây sẽ có nhiều bạn thắc mắc tại sao Device mình lại không thấy nút **Try Now** trên Google Play, có thể lúc đó bạn chưa bật `Instant Apps` lên nên chưa thấy.

Cách bật Instant App như sau:

Đầu tiên bạn phải kiếm tra Google Play Service đã được update mới nhất hay chưa.
Tiếp đó làm các bước sau:

1. Mở Setting của Android lên



2. Vuốt xuống và ấn vào `Google`

![](https://i.imgur.com/yADi74H.jpg)


3. Tìm item nào có chứ `Instant Apps` thì click

![](https://i.imgur.com/vZWNeY4.jpg)


4. Bật chế độ  `Instant Apps` thành ON

![](https://i.imgur.com/noiZRjq.jpg)


5. Sau đó ấn nút `Yes, I'm in` để hoàn tất

![](https://i.imgur.com/KxyXp5a.jpg)

# 3. Các permission cho phép trong Instant App
https://developer.android.com/topic/google-play-instant/getting-started/instant-enabled-app-bundle?tenant=irina#request-supported-permissions

Các bạn cần chú ý là khi chạy chế độ Instane App hoặc Instant game thì cũng chỉ hỗ trợ 1 vài permission cần thiết chứ không thể cung cấp đầy đủ hết các permission được:

* `ACCESS_COARSE_LOCATION`
* `ACCESS_FINE_LOCATION`
* `ACCESS_NETWORK_STATE`
* `BILLING` – đã bị bỏ trong Play Billing Library 1.0.
* `CAMERA`
* `INSTANT_APP_FOREGROUND_SERVICE` – chỉ có Android 8.0 (API level 26) trở lên.
* `INTERNET`
* `READ_PHONE_NUMBERS` – chỉ có Android 8.0 (API level 26) trở lên.
* `RECORD_AUDIO`
* `VIBRATE`
* `WAKE_LOCK`

# 4. Demo 
### 4.1 Chuẩn bị môi trường
Bạn cần cài Android Studio 3.0 trở lên, sau đó kéo project sau về máy:
```
 $ git clone https://github.com/oTranThanhNghia/android-topeka.git
```

Chú ý:
> Các bạn có thể checkout về brach `oTranThanhNghia_fix_bugs` để chạy thử. Trong brach này mình đã fix 1 vài bug cấu hình so với https://github.com/googlecodelabs/android-topeka

**Cài đặt Instant App SDK trong SDK Manager**

![](https://i.imgur.com/cJqh4gA.png)

**Cài đặt Android API và Tools từ 27 trở lên**

![](https://i.imgur.com/9fI4rh9.png)

**Chạy app Topeka ở nhánh master**
![](https://i.imgur.com/QEWBcqM.png)

### 4.2 Chuyển đổi project sang Instant App

#### 4.2.1 Sơ lược cấu trúc project
Bây giờ project Tokeka đang ở trong 1 module app
Trong Android Studio đang được biểu diễn như sau:

![](https://i.imgur.com/ZOSYasi.png)

Và nhiệm vụ bây giờ phải chuyển thành:

![](https://codelabs.developers.google.com/codelabs/android-instant-apps/img/732de5f26beedbff.png)

để có thể sử dụng được chức năng **Google Play Instant**

Trong đó:

> * **com.android.feature** - là modules chứa code của app
> * **com.android.application** - là module để build ra app có thể cài đặt. Trong module này không cần chứa code vì toàn bộ phần code đã nằm trong **com.android.feature**
> * **com.android.instantapp** - là module để chạy Instant App. Trong module này không cần chứa code vì toàn bộ phần code đã nằm trong **com.android.feature**

#### 4.2.2 Chuyển đổi từ app module sang dạng Instant App
Sau mục này thì project sẽ có dạng như sau:

![](https://i.imgur.com/X8tEpyo.png)

**1. Đổi tên 'app' thành 'topeka-base'**

![](https://i.imgur.com/plWa1ZY.png)

**2. Chuyển 'topeka-base' thành Feature module**

Vào `topeka-base/build.gradle`

```java
// replace
// apply plugin: 'com.android.application'
// with
apply plugin: 'com.android.feature'
```

và sau đó thêm cờ sau

```java
android {
    ...
    baseFeature true
    ...
}
```


**3. Tạo 'topeka-installed' module**

![](https://i.imgur.com/mRNFvBY.png)

Sau đó chọn

![](https://i.imgur.com/lCA4mEH.png)

Chọn nội dung như dưới đây

![](https://i.imgur.com/7Akhcfr.png)

![](https://i.imgur.com/UCFNGBO.png)

**4. Chuyển 'applicationId' từ 'topeka-base' sang 'topeka-installed'**

Trong
`topeka-base/build.gradle`

```java
android {
   ...
   defaultConfig {
       // remove this line
       applicationId "com.google.samples.apps.topeka"
       ...

   }
   ...
}
```

Trong `topeka-installed`
```java
android {
   ...
   defaultConfig {
       // replace
       // applicationId "com.google.samples.apps.installed"
       // with
       applicationId "com.google.samples.apps.topeka"
       ...

   }
   ...
}
```


Trong `topeka-installed/build.gradle`

```java
dependencies {
    implementation project(':topeka-base')
}
```

**Đối với file manifest**

Trong `topeka-installed/src/main/AndroidManifest.xml`

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.google.samples.apps.topeka">
</manifest>
```

Trong `topeka-base/src/main/AndroidManifest.xml`

```xml
<manifest 
    xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.google.samples.apps.topeka.base">
    .....
</manifest>
```


**Tạo instant module**
Trong phần trên bạn đã tạo xong `installed module` và `base module`. Tiếp theo đây sẽ tạo `instant module` dưới dạng cấu trúc như sau:

![](https://i.imgur.com/7q52d36.png)

Các bạn làm theo các bước sau:

![](https://i.imgur.com/7iEajHL.png)

![](https://i.imgur.com/rgb1AwJ.png)

Chọn `Library name: topeka-instantapp` rồi ấn `Finish`

Khi xong bước này project sẽ thành như sau:

![](https://i.imgur.com/ljPSokC.png)

trong `topeka-instantapp/build.gradle`

```java
dependencies {
    implementation project(':topeka-base')
}
```

**Tạo App Link với App Link Assistant**

Google Play Instant sẽ sử dụng URL để mapping tương ứng với Activity để khởi động app (Cái này được gọi là `App Links`)

Sau đây là các bước tạo App Links để mapping https://topeka.samples.androidinstantapps.com/signin để chạy `SigninActivity`

![](https://i.imgur.com/CGyopAO.png)


![](https://i.imgur.com/Im8OLHw.png)

![](https://i.imgur.com/hdRNIXh.png)

Sau đó điền nội dụng như hình dưới đây:



> Đối với Http

![](https://i.imgur.com/eBYiKga.png)

> Đối với Https

![](https://i.imgur.com/HzvDyRe.png)

**Làm tương tự đối với `/category` ta sẽ được bảng sau**

![](https://i.imgur.com/biWpvD8.png)

tương ứng sẽ là trong `topeka-base/manifests/AndroidManifest.xml`

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.google.samples.apps.topeka.base">

    <application
        android:allowBackup="false"
        android:fullBackupContent="false"
        android:hardwareAccelerated="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="false"
        android:theme="@style/Topeka"
        tools:ignore="GoogleAppIndexingWarning,UnusedAttribute">
        <activity
            android:name="com.google.samples.apps.topeka.ui.activity.SignInActivity"
            android:theme="@style/Topeka.SignInActivity"
            android:windowSoftInputMode="adjustPan">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW" />

                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />

                <data
                    android:host="topeka.samples.androidinstantapps.com"
                    android:scheme="http"
                    android:pathPattern="/signin" />
            </intent-filter>
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW" />

                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />

                <data
                    android:host="topeka.samples.androidinstantapps.com"
                    android:pathPattern="/signin"
                    android:scheme="https" />
            </intent-filter>

            <meta-data
                android:name="default-url"
                android:value="https://topeka.samples.androidinstantapps.com/signin" />
        </activity>

        <activity
            android:name="com.google.samples.apps.topeka.ui.activity.CategorySelectionActivity"
            android:theme="@style/Topeka.CategorySelectionActivity">
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW" />

                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />

                <data
                    android:host="topeka.samples.androidinstantapps.com"
                    android:pathPattern="/category"
                    android:scheme="http" />
            </intent-filter>
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW" />

                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />

                <data
                    android:host="topeka.samples.androidinstantapps.com"
                    android:pathPattern="/category"
                    android:scheme="https" />
            </intent-filter>
        </activity>

        <activity
            android:name="com.google.samples.apps.topeka.ui.activity.QuizActivity"
            android:launchMode="singleTop"
            android:theme="@style/Topeka.QuizActivity"
            android:windowSoftInputMode="adjustPan" />
    </application>
</manifest>

```

Ngoài ra `default-url` sẽ chỉ định Activity nào sẽ được mở sau khi ấn nút `Try Now` trên Google Play Store.

```xml
<meta-data
    android:name="default-url"
    android:value="https://topeka.samples.androidinstantapps.com/signin" 
/>
```

**Cấu hình `Run Configuration` để chạy Instant App**

![](https://i.imgur.com/AuYDLHZ.png)

Trong mục `Lauch Options` điền vào `URL` để chọn Activity vào được mở khi chạy Instant App:

![](https://i.imgur.com/vTlzrsB.png)

### 4.3 Kết quả

Đến bước này sau khi bạn chạy `topeka-instantapp`

![](https://i.imgur.com/AuYDLHZ.png)

được kết quả như sau

![](https://i.imgur.com/tJDYOvN.png)

Ở đây nút `OPEN IN BROWSER` không có tác dụng do chưa dựng server để mở App. Nên các bạn hãy chọn `OPEN APP` để mở

![](https://i.imgur.com/x5OqPPO.png)

Các bạn có thể xem chi tiết hơn trong https://github.com/oTranThanhNghia/android-topeka/tree/oTranThanhNghia_fix_bugs 

Chúc các bạn thành công.
# Tài liệu tham khảo

https://codelabs.developers.google.com/codelabs/android-multi-feature-instant-app/index.html?index=..%2F..index#0

https://codelabs.developers.google.com/codelabs/android-instant-apps/index.html?index=..%2F..index#0

https://developer.android.com/topic/google-play-instant/overview

https://developer.android.com/topic/google-play-instant/getting-started/instant-enabled-app-bundle?tenant=irina#request-supported-permissions

https://developer.android.com/stories/instant-apps/