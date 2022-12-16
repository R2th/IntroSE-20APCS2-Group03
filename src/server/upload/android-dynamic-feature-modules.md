Trong Google I/O 2018 1 định dạng cài đặt mới cho Android đã được Google giới thiệu là [**Android App Bundle(.aab)**](https://developer.android.com/platform/technology/app-bundle). Định dạng mới này cho phép lập trình viên có thế đóng gói ứng dụng của mình dưới dạng các Module độc lập và chỉ cần tải về khi nào người dùng cần sử dụng đến Module hay tính năng đó. Ngoài ra nó cung cấp các tùy chọn nhằm giảm thiểu và tối ưu hóa dung lượng file cài đặt của ứng dụng.

# 1. Dynamic Delivery là gì?
**Google Play** sử dụng **App Bundle** của bạn để để tạo các APK đã được tối ưu và phân phát tới thiết bị của người dùng cuối. Do đó người dùng chỉ cần tải xuống các phần, tài nguyên mà họ cần để chạy ứng dụng trên thiết bị của mình. Ví dụ, người dùng sẽ không cần thiết tải xuống thư viện x86 nếu thiết bị của người dùng chạy trên kiến trúc **armeabi**, hoặc người dùng sẽ không cần thiết phải tải xuống các tệp, string, hay drawbles mà không cần dùng cho tính năng trên app.  

Ngoài ra bạn cũng có thể chuyển đổi các tính năng/modules mà người dùng chưa cần thiết sử dụng tới thành các "dynamic feature modules" để người dùng có thể tải xuống sau nếu cần.  Bạn hình dung các Big app như hiện tại (zalo, vinID, Momo...) có rất nhiều các tính năng, trong đó có 1 số tính năng cơ bản của app và nhiều các tính năng thêm đi kèm. Khi người dùng tải app xuống thì họ chỉ cần tải các tính năng cơ bản để sử dụng thôi, còn các tính năng thêm kia họ có thể tải xuống trong quá trình sử dụng khi người dùng cần sử dụng đến tính năng đó. Do đó dung lượng app tải xuống ban đầu sẽ khá nhỏ, còn khi người dùng cần sử dụng thêm tính năng nào thì họ sẽ tải xuống tính năng đó sau dẫn đến việc Google có thể tối ưu được dung lượng ứng dụng phân phát đến người dùng.


![](https://images.viblo.asia/500cfaaf-e404-4a45-9c8b-7627a768bb2b.png)

**Phân phối động bằng cách chia nhỏ các APK. (Dynamic Delivery)**
**Split APKs** rất giống với các APK bình thường, chúng bao gồm các đoạn mã đã được biên dịch, các tài nguyên và tệp của Android. Tuy nhiên Android có thể coi nhiều APK nhỏ đã được cài đặt như 1 ứng dụng duy nhất. Lợi ích của việc có thể chia nhỏ các APK như vậy nhằm tối ưu hóa các tài nguyên trên thiết bị cửa người dùng, tránh trường hợp người dùng phải tải xuống các phần tài nguyên thừa không sử dụng đến.

- **Base APK** là APK chứa mã code và các tất cả các tài nguyên mà các APK khác có thể truy cập và cung cấp các chức năng cơ bản cho ứng dụng. Khi người dùng tải ứng dụng lần đầu tiên thì bản APK này sẽ được tải và cài đặt trước. Bản APK này đơn giản chỉ chứa các `services, content-providers, permissions, platform version requirements...` cần thiết cho ứng dụng.
- **Configuration APKs**  APK này cung cấp các thư viện và tài nguyên cho thiết bị. VD các tài nguyên về `drawbles (hdpi, xhdpi ...)` phù hợp với màn hình hiển thị của người dùng, các native libraries và CPU architecture tương ứng. Mỗi  **Configuration APKs** là phụ thuộc của **Base APK** hay **dynamic feature APK**, do đó chúng được tải xuống cùng với APK cung cấp phần Code tính năng.
- **Dynamic Feature APKs** các APK này chứa các Code và các tài nguyên cho 1 tính năng của ứng dụng, chúng không bắt buộc phải được tải xuống khi mà bạn cài đặt ứng dụng lần đầu tiên. Tức là các APK loại này có thể được cài đặt theo yêu cầu sau khi **Base APK** được cài đặt trên thiết bị nhằm cung cấp bổ sung thêm tính năng khi người dùng sử dụng đến tính năng đó.

Lưu ý: các tính năng trên chỉ hoạt động từ **Android 4.4 (API level 19)**  trở lên.

# 2. Dynamic Feature Modules là gì?
**Dynamic feature modules** cho phép bạn tách các tính năng và tài nguyên nhất định ra khỏi **Base APK** và đưa các `Feature Modules` này vào **Android App Bundle**. Tính năng này cho phép người dùng không cần tải xuống các` tính năng/Modules` mà họ chưa cần dùng tới. Người dùng có thể tải  `tính năng/Modules` này sau ngay tại thời điểm cần sử dụng đến tính năng đó.

## 2.1 Tạo dynamic feature module.
 Các **Dynamic feature modules** cũng được khởi tạo giống các Module thông thường, Android studio cũng cấp phần code cấu hình và các thư mục tài nguyên riêng của Module. 
 
 ![](https://images.viblo.asia/fa06012b-8063-46b5-8cdd-8437528a4779.png)
 
**Next** qua 2 bước tiếp theo

 ![](https://images.viblo.asia/59d1fddc-63e0-48af-bdbe-0e28c8fe9344.png)

- Chọn **Enable on-demand** để cho phép Module bạn khởi tạo được cho phép tải xuống sau, tùy vào nhu cầu của người dùng.

## 2.2. Dynamic feature module : build.gradle
- **Android Studio** sẽ tự động thêm `apply plugin: 'com.android.dynamic-feature'` vào **build.gradle** của Module mới được khởi tạo.
- **Signing configurations, minifyEnabled property, versionCode và versionName** sẽ được sử dụng lại của Module chính **(Base module)**.
- `android.dynamicFeatures` sẽ được tự động thêm vào phần **build.gradle** của :app. `android { android.dynamicFeatures = [":dynamic-feature-test"] }`
- `implementation project(':app')` sẽ được thêm vào **implementation** của **build.gradle** Module.

## 2.3. Dynamic feature module : AndroidManifest.xml
```Xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:dist="http://schemas.android.com/apk/distribution"
    package="com.test.dynamic"
    split="dynamic-feature-test">

    <dist:module
        dist:onDemand="true"
        dist:title="@string/title_test">
        <dist:fusing include="true" />
    </dist:module>

</manifest>
```

- `split="split_name"` định nghĩa tên của Module. Tên này sẽ được sử dụng để định danh Module khi có các yêu cầu tải **Tính năng/Module** từ phía người dùng thông qua **Play Core Library** 
- `<dist:module />` định nghĩa, xác định thuộc tính của Module
- `dist:onDemand="true|false"` định nghĩa là Module này có được đóng gói dưới dạng tải về sau hay không.
- ...


# 3. Download and Setting Dynamic Feature Modules
Sử dụng **Google Play Core Library** để cấu hình và tải về các **Dynamic Feature Modules** đã được định nghĩa sẵn trong **App Bundle** với các thiết bị chạy  **Android 5.0 (API level 21**) và cao hơn. Hoặc bạn có thể cấu hình để tài vể tất cả các **Dynamic Feature Modules** khi ứng dụng được cài đặt lần đầu.

Thêm vào `app build.gradle`
```Xml
dependencies {
    implementation 'com.google.android.play:core:1.3.4'
}
```
và nhớ đừng quên thêm [`Google’s Maven Repository`](https://developer.android.com/studio/build/dependencies.html#google-maven)` vào `project’s build.gradle.

## 3.1 Download dynamic feature module

Có 2 cách để tải về một **Dynamic feature module**.

- [`SplitInstallManager.startInstall()`](https://developer.android.com/reference/com/google/android/play/core/splitinstall/SplitInstallManager#startinstall), đầu tiên ứng dụng của bạn cần phải đang chạy trên màn hình :D. Khi ứng dụng yêu cầu cài đặt **Dynamic Feature Modules** thư viện **Play Core Library** sẽ thực hiện cài đặt dưới dạng không đồng bộ, nghĩa là nó chỉ gửi yêu cầu cài đặt và bạn cần quản lý các trạng thái, dám sát việc cài đặt dưới dạng `call back`. 

```Java
SplitInstallManager splitInstallManager =
    SplitInstallManagerFactory.create(context);

SplitInstallRequest request = SplitInstallRequest.newBuilder()
        .addModule("dynamic-module-1")
        .addModule("dynamic-module-2")
        .build();

splitInstallManager.startInstall(request)
    .addOnSuccessListener(sessionId -> { ... })
    .addOnFailureListener(exception -> { ... });
```

- [`SplitInstallManager.deferredInstall()`](https://developer.android.com/reference/com/google/android/play/core/splitinstall/SplitInstallManager#startinstall).  Nếu bạn muốn cài đặt **Dynamic Feature Modules** khi app ở dưới background thì bạn cần sử dụng đến cách thứ 2 này. Khi sử dụng **deferredInstall** bạn không thể theo dõi được tiến trình tài về hay cài đặt, vậy nên bạn cần kiểm tra trước xem Module đã được tải về hay chưa trước khi yêu cầu cả Module đó.

```Java
splitInstallManager.deferredInstall(Arrays.asList("dynamicModule"))
```

> Note: Bạn cũng có thể yêu cầu tài về và cài đặt 1 Module đã được cài đặt từ trước đó. API sẽ coi yêu cầu đó là hoàn thành.



Bạn nên tạo 1 biến Listener để lắng nghe khi mà công việc cài đặt **Dynamic feature module** hoàn thành
```Java
int mySessionId = 0;
// Creates a listener for request status updates.
SplitInstallStateUpdatedListener listener = state -> {
    if (state.status() == SplitInstallSessionStatus.FAILED
       && state.errorCode() == SplitInstallErrorCode.SERVICE_DIES) {
       // Retry the request.
       return;
    }
    if (state.sessionId() == mySessionId) {
        switch (state.status()) {
            case SplitInstallSessionStatus.DOWNLOADING:
              int totalBytes = state.totalBytesToDownload();
              int progress = state.bytesDownloaded();
              // Update progress bar.
              break;

            case SplitInstallSessionStatus.INSTALLED:
              //Module is downloaded successfully
              break;
        }
    }
};
// Registers the listener.
splitInstallManager.registerListener(listener);

splitInstallManager.startInstall(request)
    .addOnSuccessListener(sessionId -> { mySessionId = sessionId; })
    .addOnFailureListener(exception -> {
        switch(((SplitInstallException) exception).getErrorCode()) {
            case SplitInstallErrorCode.NETWORK_ERROR:
                //Network Error
                break;
            case SplitInstallErrorCode.MODULE_UNAVAILABLE:
                //Module Not Available
                break;
            ...
     });

// When your app no longer requires further updates, unregister the listener.
splitInstallManager.unregisterListener(listener);
```

Các State khi cài đặt
![](https://images.viblo.asia/bd4bbe3a-7e1c-4b43-a39c-25d71ea41eba.png)

## 3.2 Quản lý Dynamic feature module
- Ngưng tải về Module khi trước khi Module đó được cài đặt thành công.
```Java
splitInstallManager.cancelInstall(mySessionId)
```
- Kiểm tra các Module đã được cài đặt trong ứng dụng.
```Java
Set<String> installedModules = splitInstallManager.getInstalledModules();
```
- Gỡ các Module đã được cài đặt
```Java
splitInstallManager.deferredUninstall(Arrays.asList("moduleName"));
```

# 4. Kết luận
Theo mình thì hiện tại đa số các ứng dụng lớn đều đi theo hướng phát triển **Dynamic feature module**, nhằm tối ưu dung lượng của ứng dụng. Và cũng tiện cho việc cập nhật và sửa lỗi trên từng Module mà khônganhrh hưởng tới các Module khác. Thêm nữa khi ứng dụng phát triển theo hướng **Dynamic feature module** thì ứng dụng gốc có thể cũng cấp 1 môi trường để các bên thứ 3 có thể nhảy vào và phát triển các chức năng liên kết với ứng dụng của bên thứ 3.

Trên đây là bài giới thiệu về **Dynamic feature module**  hi vọng thông qua bài viết các bạn có thể hiểu thêm đôi chút về cơ chế **Dynamic feature module** và cách hoạt động cũng như cách cài đặt  **Dynamic feature module**.

Các bạn có thể xem thêm code example của Google về [**Dynamic feature module** tại đây](https://github.com/android/app-bundle-samples):

Link bài viết gốc: https://medium.com/mindorks/dynamic-feature-modules-the-future-4bee124c0f1