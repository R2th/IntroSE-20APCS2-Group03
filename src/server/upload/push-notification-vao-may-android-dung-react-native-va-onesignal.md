OneSignal là một service push notification đa  nền tảng hoàn toàn miễn phí. OneSignal có cung cấp UI và API để push notifycation tới  IOS, Android, Amazon Fire, Windows Phone, Chrome Apps, Amazon Alexa, Safari, Chrome Web, and Firefox. OneSignal là dịch vụ push notification được sử dụng rộng rãi cho cả  web và mobile developer, với hơn 325.000 developer đã đăng ký và 175.000 ứng dụng và  websites. Sau đây mình sẽ giới thiệu cách sử dụng OneSignal để push notification tới máy Android bằng react native.
### 1. Tạo OneSignal Account & Create App
Vào trang web của [OneSignal](https://onesignal.com/) để tạo tài khoản mới. Xong bấm vào nút **Add a new app**
![](https://images.viblo.asia/0ae55d52-bfb5-4748-bdc3-03ccc75c337e.png)
### 2. Generate Google Server API Key
Để config OneSignal với Google ta cần vào **OneSignal** => **Tên App** => **Settings** => chọn **Google Android**
![](https://images.viblo.asia/54d651bf-37db-4cfd-907a-137765d4f4fb.png)
**Google Server API Key (Server API Key)** và **Google Project Number(Sender ID)** lấy từ  [Google Services Wizard](https://developers.google.com/mobile/add?platform=android&cntapi=gcm) . Nhớ phải enable Cloud Messaging.
### 3.Cài đặt react-native-onesignal
```
npm install react-native-onesignal --save
```
*  Add permissions vào`  android/app/src/main/AndroidManifest.xml`
```
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.onesignalexample"
    android:versionCode="1"
    android:versionName="1.0">

    ...
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/> <!-- ADD THIS -->

    <uses-sdk
        android:minSdkVersion="16"
        android:targetSdkVersion="22" />

    <application
      ...
      android:launchMode="singleTop"
    >
      ...
    </application>

</manifest>
```
*  Thay đổi file `android/gradle/wrapper/gradle-wrapper.properties`
```
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
distributionUrl=https://services.gradle.org/distributions/gradle-2.10-all.zip
```
* Include OneSignal vào  `android/settings.gradle`
```
include ':react-native-onesignal'
project(':react-native-onesignal').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-onesignal/android')
```
* Update gradle version trong  `android/build.gradle `
```
buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:2.1.0' // HEY LOOK HERE!

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        mavenLocal()
        jcenter()
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url "$rootDir/../node_modules/react-native/android"
        }
    }
}
```
* `android/app/build.gradle` upgrade buildToolsVersion to 23.0.2
```
android {
    ...
    buildToolsVersion "23.0.2" // UPGRADE
    ...
    defaultConfig {
        ...
        manifestPlaceholders = [manifestApplicationId: "${applicationId}",
                                onesignal_app_id: "YOUR_ONESIGNAL_ID",
                                onesignal_google_project_number: "YOUR_GOOGLE_PROJECT_NUMBER"]
    }
}
dependencies {
    ...
    compile project(':react-native-onesignal')
}
```
**YOUR_ONESIGNAL_ID**  ở trong **OneSignal** => **App Name** => **Settings** => **Keys & IDs**
* Thêm OneSignal vào `android/app/src/main/java/com/YOUR_APP_NAME/MainApplication.java`
```
package com.onesignalexample;
import android.app.Application;
import android.util.Log;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;  // ADD THIS

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new ReactNativeOneSignalPackage() // Add this line, and don't forget the comma on the previous line
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
```
### 4. Android Usage
Add code vào trong file `App.js`
```
...
import OneSignal from 'react-native-onesignal';

class App extends Component {
  componentDidMount() {
    OneSignal.configure({});
  }
  ...
}
...
export default App;
```
Giờ có thể bắt đầu test push notification trên Android. OneSignal đã cung cấp giao diện sẵn. Bạn chỉ cần vào **App Name** => **Messages** => **New Push** 

**Chú ý** : Notification chỉ hiển thị trên device thật.