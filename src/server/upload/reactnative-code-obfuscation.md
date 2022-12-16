Chào mọi người.

Hôm nay chúng ta sẽ bàn về việc `Code Obfuscation` (làm rối code) nhé. 

# Làm rối code là gì
Vấn đề này sẽ được nhắc đến rất nhiều lần khi các bạn bước vào giai đoạn đưa sản phẩm của mình ra thị trường. Lúc đó các bạn sẽ phải đối mặt với việc Ứng dụng của mình có thể bị hack với nhiều mục đích xấu khác nhau. Và để ngăn chặn những việc đó thì có một phương pháp để thực hiện đó gọi là `Code Obfuscation` (làm rối code).
Vậy Làm rối code là gì. Nó là việc thông qua một loạt các biến đổi, chẳng hạn như đổi tên biến/hàm/đối số, loại bỏ chuỗi và các biến đổi khác, mã nguồn của bạn được chuyển thành một thứ gì đó không thể đọc được, trong khi vẫn hoạt động chính xác như trước. Có thể hiểu Obfuscated code là kỹ thuật làm rối code, người khác có thể có được code của bạn nhưng khó có thể hiểu hết toàn bộ ý nghĩa code mà bạn viết. Obfuscated code được dùng trong rất nhiều ngôn ngữ chứ không chỉ riêng Javascript. 

Vậy tại sao chúng ta phải làm rối code. Có nhiều lý do tại sao bạn nên bảo vệ code của mình, chẳng hạn như:

- Ngăn chặn bất kỳ ai muốn copy/paste tác phẩm của bạn. Điều này đặc biệt quan trọng đối với các dự án 100% phía máy khách, chẳng hạn như những game được viết bằng HTML5;
- Xóa các đoạn comment và khoảng trắng không cần thiết. Làm cho nó tải nhanh hơn và khó hiểu hơn;
- Bảo vệ dự án chưa được thanh toán, bạn có thể cho khách hàng của mình biết rằng họ sẽ không có mã nguồn cho đến khi hóa đơn đã được thanh toán.
- Obfuscated sẽ rất khó để đảo ngược lại định dạng ban đầu.
- Dung lượng code được giảm xuống, tăng tốc độ xử lý, tiết kiệm băng thông.

Với các ứng dụng được xây dựng bằng React Native thì chúng ta sẽ có những các làm rối code như thế nào:

## Android
Đầu tiên chúng ta sẽ làm rối các function được code ở nền tảng Android. Để thực hiện điều đó chúng ta cần config một số chỗ như sau:

###  app_name/android/app/build.gradle

```
android {
    // ... other config
    buildTypes {
        release {
            debuggable false
            shrinkResources true
            zipAlignEnabled true
            minifyEnabled true
            useProguard true
            setProguardFiles([getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'])
        }
    }
    // ... other config
}
```

Với các dòng `minifyEnabled` và `useProguard`, chúng ta sẽ kích hoạt tính năng thu nhỏ và làm xáo trộn mã, nhưng chúng tôi cần chỉ ra vị trí của tệp cấu hình proguard, đó là lý do tại sao chúng ta thêm chỉ thị `setProguardFiles`.

Sau đó, chúng ta sẽ cần thiết lập tệp cấu hình `proguard (proguard-rules.pro)`, trong tệp này, chúng ta sẽ thêm các ngoại lệ và quy tắc mà proguard sẽ sử dụng khi làm xáo trộn mã .

```
# Copyright (c) Facebook, Inc. and its affiliates.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Disabling obfuscation is useful if you collect stack traces from production crashes
# (unless you are using a system that supports de-obfuscate the stack traces).
# -dontobfuscate

# React Native

# Keep our interfaces so they can be used by other ProGuard rules.
# See http://sourceforge.net/p/proguard/bugs/466/
-keep,allowobfuscation @interface com.facebook.proguard.annotations.DoNotStrip
-keep,allowobfuscation @interface com.facebook.proguard.annotations.KeepGettersAndSetters
-keep,allowobfuscation @interface com.facebook.common.internal.DoNotStrip

# Do not strip any method/class that is annotated with @DoNotStrip
-keep @com.facebook.proguard.annotations.DoNotStrip class *
-keep @com.facebook.common.internal.DoNotStrip class *
-keepclassmembers class * {
    @com.facebook.proguard.annotations.DoNotStrip *;
    @com.facebook.common.internal.DoNotStrip *;
}

-keepclassmembers @com.facebook.proguard.annotations.KeepGettersAndSetters class * {
  void set*(***);
  *** get*();
}

-keep class * extends com.facebook.react.bridge.JavaScriptModule { *; }
-keep class * extends com.facebook.react.bridge.NativeModule { *; }
-keepclassmembers,includedescriptorclasses class * { native <methods>; }
-keepclassmembers class *  { @com.facebook.react.uimanager.annotations.ReactProp <methods>; }
-keepclassmembers class *  { @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>; }

-dontwarn com.facebook.react.**
-keep,includedescriptorclasses class com.facebook.react.bridge.** { *; }

# okhttp

-keepattributes Signature
-keepattributes *Annotation*
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }
-dontwarn okhttp3.**

# okio

-keep class sun.misc.Unsafe { *; }
-dontwarn java.nio.file.*
-dontwarn org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement
-dontwarn okio.**
```

Đây là các quy tắc được đề xuất bởi nhà phát triển react-native, hầu hết chúng đều là ngoại lệ đối với các gói cốt lõi mà trình biên dịch cần tìm trong thời gian biên dịch, vì vậy chúng không thể bị xáo trộn. Và chúng ta cần phải thiết lập một số ngoại lệ

1.- Nếu bạn sử dụng `react-native-config` để định cấu hình các môi trường khác nhau trong ứng dụng của bạn. Bạn sẽ cần thêm các dòng sau vào cuối tệp proguard-rules.pro của mình.

```
# react-native-config
-keep lớp com.mypackage.BuildConfig {*; }
```
 mypackage phải khớp với giá trị gói trong tệp AndroidManifest.xml của bạn.

2.- Nếu bạn sử dụng `react-native-firebas`e trong ứng dụng của mình. Bạn sẽ cần phải định cấu hình các ngoại lệ cho các gói firebase trong tệp proguard-rules.pro của mình. Điều này phụ thuộc vào gói firebase bạn đang sử dụng, vì vậy vui lòng kiểm tra tài liệu firebase.


###  Javascript

Đối với các ứng dụng được code trên nền tảng React Native thì gần như toàn bộ logic của ứng dụng sẽ được code bằng Javascript. Khi chúng ta build thì một phần nào đó code của chúng ta đã được `minify` nhưng chưa hẳn đã là được làm rối hết. Sẽ có 1 số đoạn mã sẽ không được  làm rối mà dựa vào đó hacker có thể tấn công vào ứng dụng.

Sau khi tìm hiểu các thư viện có thể làm rối code thì mình suggest các bạn sử dụng thư viện [obfuscator-io-metro-plugin](https://github.com/whoami-shubham/obfuscator-io-metro-plugin). Nó được phát triển dựa trên thư viện [JavaScript obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator). Khi sử dụng thư viện này thì nó sẽ hỗ trợ các bạn làm rối code trước khi release bản production.

Thao tác thì khá là đơn giản như sau:

```
yarn add obfuscator-io-metro-plugin --dev
```

Hoặc 

```
npm i obfuscator-io-metro-plugin
```

Các bạn chỉ cần chỉnh sửa file `metro.config.js` như sau

```Javascript
const jsoMetroPlugin = require("obfuscator-io-metro-plugin")(
  {
    // for these option look javascript-obfuscator library options from  above url
    compact: false,
    sourceMap: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: true,
    shuffleStringArray: true,
    splitStrings: true,
    stringArrayThreshold: 1,
  },
  {
    runInDev: false /* optional */,
    logObfuscatedFiles: true /* optional generated files will be located at ./.jso */,
    sourceMapLocation:
      "./index.android.bundle.map" /* optional  only works if sourceMap: true in obfuscation option */,
  }
);

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  ...jsoMetroPlugin,
};
```

Để có thể sử dụng thêm nhiều option các bạn có thể tìm hiểu thêm [tại đây ](https://github.com/javascript-obfuscator/javascript-obfuscator)