# I. Giới thiệu
Như tiêu đề, nay mình mình sẽ hướng dẫn cách đăng nhập bằng tài khoản social như Facebook, Google Api, Github, Twitter,... Chắc chắn những bạn làm với login social cũng đã có một thời gian đau đầu không biết phải làm gì khi login bằng tài khoản social, cá nhân mình cũng vậy cũng đã phải tìm rất nhiều bài viết trên stackoverflow, viblo, ... nhưng rồi phiên bản cũng khác, hoặc là không đầy đủ,... Quan trọng là khi các bạn chạy bản debug, release và khi upload nếu các bạn mà không lắm rõ nó sẽ làm tốn thời gian của các bạn rất nhiều. Cá nhân mình đã cũng đã mất một thời gian để hiểu và áp dụng được nên nay mình xin chia sẻ những kiến thức mà mình tìm hiểu được. Khi debug thì như nào, khi release ra sao và khi upload lên store khác nhau như nào, ...!!

# II. Login Google Api với Google +.

## 1. Android

Trước khi bắt đầu thì các bạn cần phải có 1 app react-native, các bạn có thể tham khảo bài viết này của mình để tạo ra 1 app bắt đầu
(https://viblo.asia/p/bai-1-hay-bat-dau-voi-react-native-maGK7jQD5j2)

![](https://images.viblo.asia/ac4bdc09-7b0f-44d2-81dd-0b257582353a.jpg)


Sau khi đã chạy được app như hình trên (ở đây mình chạy trên Android, mình sẽ làm login bên Android trước nhá) thì chúng ta bắt đầu thôi nào! Đầu tiên các bạn cần phải cài đặt firebase, ở đây mình sử dụng  `react-native-fcm`

(https://github.com/evollu/react-native-fcm)

 - `react-native install react-native-fcm`

Nếu bạn sử dụng react-native install thì các bạn sẽ không phải link nữa, nhưng để chắc chắn các bạn vào các file sau check lại giúp mình nhá!


file `android/build.gradle`
```js
buildscript {


    ext {
       buildToolsVersion = "27.0.3"
        minSdkVersion = 16
        compileSdkVersion = 28
        targetSdkVersion = 27
        supportLibVersion = "28.0.0"
    }
    repositories {
        // ...
        google() // Google's Maven repository
    }
    // ...
    dependencies {
        // ...
        classpath 'com.google.gms:google-services:4.0.2' // google-services plugin
    }
}

allprojects {
    // ...
    repositories {
        // ...
        google() // Google's Maven repository
    }
}
```

file `android/app/build.gradle`

```js

    compileSdkVersion 28
    buildToolsVersion '27.0.3'

    defaultConfig {
        applicationId "com.loginsocial"
        minSdkVersion 16
        targetSdkVersion 27
        versionCode 1
        versionName "1.0"
        ndk {
            abiFilters "armeabi-v7a", "x86"
        }
    }
    
    ...
    
dependencies {
    implementation project(':react-native-fcm')
    implementation 'com.google.firebase:firebase-core:+'
    implementation 'com.google.firebase:firebase-messaging:+'
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation "com.android.support:appcompat-v7:${rootProject.ext.supportLibVersion}"
    implementation "com.facebook.react:react-native:+"  // From node_modules
}

// Run this once to be able to run the application with BUCK
// puts all compile dependencies into folder libs for BUCK to use
task copyDownloadableDepsToLibs(type: Copy) {
    from configurations.compile
    into 'libs'
}

apply plugin: 'com.google.gms.google-services'
```

Ở đây mình sử dụng `+` là bởi vì tránh các lỗi version, nhưng khi các bạn áp dụng vào project thì nên chọn đúng version không về sau có thể gặp lỗi như version của các package khác chưa update phù hợp với nhau!

file `android/app/src/main/AndroidManifest.xml`

```js

<application
    ...
    android:theme="@style/AppTheme">

<meta-data android:name="com.google.firebase.messaging.default_notification_icon" android:resource="@mipmap/ic_launcher"/>
<meta-data android:name="com.google.firebase.messaging.default_notification_channel_id" android:value="my_default_channel"/>

<service android:name="com.evollu.react.fcm.MessagingService" android:enabled="true" android:exported="true">
  <intent-filter>
  <action android:name="com.google.firebase.MESSAGING_EVENT"/>
  </intent-filter>
</service>

<service android:name="com.evollu.react.fcm.InstanceIdService" android:exported="false">
  <intent-filter>
  <action android:name="com.google.firebase.INSTANCE_ID_EVENT"/>
  </intent-filter>
</service>

...
```


file `android/settings.gradle`

```js
include ':react-native-fcm'
project(':react-native-fcm').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-fcm/android')
```

file `MainActivity.java`

```js

import android.content.Intent;
public class MainActivity extends ReactActivity {
 @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }
}
```

file `MainApplication.java`
```js

import com.evollu.react.fcm.FIRMessagingPackage;


protected List<ReactPackage> getPackages() {
  return Arrays.<ReactPackage>asList(
      new MainReactPackage(),
        ...
       new FIRMessagingPackage()
  );
}

@Override
public void onCreate() { // <-- Check this block exists
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false); // <-- Check this line exists within the block
}
```

Sau khi kiểm tra và đã đầy đủ chúng ta cần phải vào firebase và tạo 1 app (https://console.firebase.google.com).

Click `Add project` và nhập tên project, ở đây mình đặt tên là LoginSocial

![](https://images.viblo.asia/84eb4b55-60ef-47c9-9c6c-8553d9249d7b.png)

Sau khi tạo xong chúng ta click vào tạo 1 app Android

![](https://images.viblo.asia/498bb0a3-ddf6-4cbe-b515-d592a159d199.png)

TIếp theo họ có hỏi package name của mình là gì thì bạn hãy hãy vào file `AndroidManifest.xml` và copy tên package name. Của mình ở đây là `com.loginsocial`

![](https://images.viblo.asia/405912db-2bc1-41a9-930e-cc0564bf0f11.png)

Tiếp theo các bạn cần phải down file google-serviecs.json về và để vào trong thư mục android/app/

![](https://images.viblo.asia/c64155e6-1305-4ecc-88a9-26a8fdecb092.png)

Tiếp theo như họ có hướng dẫn thì nếu app đã tồn tại thì hãy xoá đi và cài lại, các bạn uninstall đi và chạy lại lệnh `react-native run-android` nhá.

*****
Tiếp theo chúng ta cần cài đặt package `react-native-google-signin`

 - react-native install react-native-google-signin

Và cũng cần phải setting một chút nữa.

Các bạn có thể tham khảo docs của họ: (https://github.com/react-native-community/react-native-google-signin)

Các bạn nên kiểm tra xem còn thiếu chỗ nào, ở đây của mình là còn thiếu ở file này nhá :

`android/app/build.gradle`

```js
    implementation project(':react-native-google-signin')
    implementation project(':react-native-fcm')
    implementation 'com.google.firebase:firebase-core:+'
    implementation 'com.google.firebase:firebase-messaging:+'
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation "com.android.support:appcompat-v7:${rootProject.ext.supportLibVersion}"
    implementation "com.facebook.react:react-native:+"
```

Ok, vậy là chúng ta đã thiết lập xong rồi đó, tiếp theo chúng ta xây dựng giao diện nào!

Ở đây mình sẽ tạo ra 1 nút button và khi click vào sẽ show thông tin tài khoản đã đăng nhập.

Các bạn sửa lại file `App.js` thành như sau nhá

Đầu tiên ta cần import `react-native-google-signin`

```js
import { GoogleSignin } from 'react-native-google-signin'
```

Tiếp đó các bạn cần phải config môi trường Google+ Api

Các bạn tạo hàm `setupSocial()` như sau: 

```js
setupSocial() {
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
        await GoogleSignin.configure({
            //webClientId: Config.WEB_CLIENT_ID,
            //iosClientId: Config.IOS_CLIENT_ID,
            offlineAccess: true,
        })

        const user = await GoogleSignin.currentUserAsync()
        console.log('Saved google user', user)
        resetAuthSocial()
    } catch (err) {
        console.log('Something wrong with google play service!', { err })
    }
}
```

WEB_CLIENT_ID và IOS_CLIENT_ID các bạn vào trong (https://console.developers.google.com/ ) đăng nhập bằng tài khoản đã link với với firebase nhá.

Các bạn open login bằng google+ lên và check thông tin như mình nhá :

![](https://images.viblo.asia/1026fafd-edc0-4e80-bac7-245a245d597e.png)

Sau khi đã xong các bạn quay lại trang console bên google+ api và chọn App bên firebase mà chúng ta đã tạo

![](https://images.viblo.asia/5c8a9d85-2aaf-47bb-bc47-80d8180f0145.png)

Tiếp theo các bạn click vào `Library` ở thanh TabBar bên phải và search với từ khoá `google+ api` và sẽ ra kết quả sau đây:

![](https://images.viblo.asia/1c156619-ccee-42cc-9f90-57f11cb45cfc.png)

Các bạn click vào `Google+ API` và enable nó lên để chúng kết nối với nhau nhá.

Sau khi đã xong, bạn hãy click vào `Credentials` và sẽ thấy `Web client id` và `ios client id`. Ở đây chúng ta chưa thấy `ios client id` bởi vì ở bên firebase chúng ta mới chỉ tạo app andoird. Một lát nữa chúng ta cùng làm bên iOS nhá.

![](https://images.viblo.asia/26e2c8df-086e-428e-b22e-bde6f0928b65.png)


Sau khi đã có `web client id` các bạn sửa lại `setupSocial()` thành như sau, nhớ là `web client id` **của bạn nhá** : 

```js
     webClientId: '922650223041-5ngaleu67dg66prv8njel5e7atmdmtae.apps.googleusercontent.com',
```


**Note:**

Trước khi bắt đầu code giao diện mình cần các bạn làm việc này, khi đăng nhập google+ api họ sẽ yêu cầu sha-1 của file mình đang làm việc, mọi người chạy câu lệnh này để lấy sha-1 nhá:

`keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android`


Câu trên nghĩa là sẽ file debug.keystore với alias là androiddebugkey

Sau khi chạy xong các bạn sẽ thấy `MD5, SHA1, SHA256`, các bạn cần copy đoạn `SHA-1` đó và vào paste vào trong `fingerprint` trong firebase **app Android**

![](https://images.viblo.asia/dbb8bba7-ae90-4739-925a-ff1f17e503f4.png)

**Note**
`
Đây chỉ là sha-1 của bản các bạn chạy debug thôi nhá, khi release các bạn sẽ cần làm như này 1 lần nữa và lấy sha-1 của bản release.
`

Thông thường các bạn sẽ tạo file **keystore** để release là my-release-key.keystore với alias là **my-key-alias** theo docs của React native. Nên các bạn có thể sử dụng câu lệnh này để lấy sha-1 của file release: 

`keytool -list -v -keystore /path/android/app/my-release-key.keystore -alias my-key-alias`

Và đừng quên thêm fingerprint vào trong firebase nhá!

Okey bây giờ mình bắt đầu thôi: 

Trong `render()` mình sẽ tạo 1 button  có gọi tới hàm `doLogin()`,  ở đây mình có truyền tham số là `google` bởi vì mình sẽ dùng code của bài này cho bài tiếp theo là login Facebook:

```js
render() {
    return (
    <View style={styles.container}>
        <TouchableOpacity
            style={styles.btnGoogle}
            onPress={this.doLogin.bind(this, 'google')}
        >
            <Text style={styles.text}>Google+</Text>
        </TouchableOpacity>
    </View>
    );
}
```

```js
doLogin(provider) {
    let methodlogy;
    switch (provider) {
        case 'google':
            methodlogy = this.logInSocial('google')
            break
        default:
            methodlogy = null
    }
}
```

configure API

```js
async setupSocial() {
    GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    GoogleSignin.configure({
        webClientId: '922650223041-5ngaleu67dg66prv8njel5e7atmdmtae.apps.googleusercontent.com',
        // iosClientId: Config.IOS_CLIENT_ID,
        offlineAccess: true,
    })
}
```

Sau đó ta cần lấy thông tin user và lưu vào state `userInfo`

```js

constructor(props) {
    super(props)

    this.state = ({
        userInfo: {}
    })

    this.logInSocial = this.logInSocial.bind(this)
}

...

logInSocial = providerName => new Promise(async (resolve, reject) => {
switch (providerName) {
    case 'google':
        GoogleSignin.signIn().then(async (googleUser) => {
            this.setState({
                userInfo: googleUser.user
            })
        }).catch((err) => {
            console.log('WRONG SIGNIN', { err })
            reject(err)
        })
        break

    default:
        resolve()
}
```

Các bạn có thể `console.log`  `googleUser` ra và xem kết quả nhá.

Bây giờ ta sửa hàm `render()` một chút để lấy thông tin ra nhá.

```js
render() {
    return (
    <View style={styles.container}>
        <Image 
            source={{uri: this.state.userInfo.photo}}
            style={{width: 100, height: 100}}
        />
        <Text>{this.state.userInfo.name}</Text>
        <Text>{this.state.userInfo.email}</Text>
        <TouchableOpacity
            style={styles.btnGoogle}
             onPress={this.doLogin.bind(this, 'google')}
        >
            <Text style={styles.text}>Google+</Text>
        </TouchableOpacity>
    </View>
    );
}
```

Okey vậy là xong rồi đó và đây là kết quả, các bạn có thể run thiết bị lên và test. Tiếp theo chúng ta làm bên iOS nhá. Do bài viết dài quá vậy nên mình chia làm 2 bài nhá. Mong mọi người ủng hộ. Có thắc mắc gì mong mọi comment cho mình biết, thanks!!

![](https://images.viblo.asia/420a129d-e5c9-40f9-b002-b6a092d26cf8.jpg)