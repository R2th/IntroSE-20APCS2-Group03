![Đang tải lên 1_OwivBvVs93W0bhDZ_wKSqQ.gif…]()Android 12 mang đến cho chúng ta một tính năng mới để cải thiện trải nghiệm người dùng, đó là hỗ trợ ```Splash Screen``` chính thức. Trước đây, chúng ta có nhiều cách khác nhau để có thể triển khai một Splash screen. Phiên bản mới nhất của Android sẽ tự động thêm tính năng này cho tất cả các ứng dụng và cho phép tùy chỉnh bằng các thông số đơn giản, nhưng chức năng này chỉ có sẵn ở Android 12. 

Tuy nhiên, ngày 30/06/2021 google đã mang đến phiên bản alpha đầu tiên của ```Core Splashscreen API```, cung cấp khả năng tương thích ngược Splash Screen APIs cho các phiên bản thấp hơn. Với việc sử dụng thư viện này, bạn có thể triển khai tính năng mới này xuống API ```23```, mang lại giao diện giống nhau trên nhiều phiên bản Android.

Trước khi đi sâu vào việc triển khai thì Splash screen là cái gì nhỉ? :D

## What is a Splash screen?
Splash Screen là một phản hồi trực quan được hiển thị cho người dùng trong khi ứng dụng đang khởi chạy. Hoạt ảnh này làm cho trải nghiệm người dùng tốt hơn vì người dùng không phải nhìn chằm chằm vào một màn hình trống trơn, mà có thể nhìn thấy biểu tượng ứng dụng hoặc một animation tùy chỉnh. Dưới đây là một ví dụ về Splash screen:<br />

<p align="center"><img src="https://images.viblo.asia/d1eaad06-ed36-4652-a8bf-21ed2eb0f2c9.gif" alt="1-Owiv-Bv-Vs93-W0bh-DZ-w-KSq-Q" border="0"></p><br />

Màn hình này được hiển thị ở hai điều kiện:<br />
* Khi [**cold start**](https://developer.android.com/topic/performance/vitals/launch-time#cold) - khi app process không chạy và người dùng mở ứng dụng<br />
* Khi [**warm start**](https://developer.android.com/topic/performance/vitals/launch-time#warm) - khi app process đang chạy nhưng Activity chưa được khởi tạo (hoặc đã bị hủy trước đó)<br />

Splash Screen sẽ không được hiển thị khi [**hot start**](https://developer.android.com/topic/performance/vitals/launch-time#hot). Ví dụ: người dùng nhấn nút home để đưa ứng dụng chạy ở background và mở lại trước khi hệ thống destroy Activity, Splash screen sẽ không được hiển thị.

## Implementing the Splash Screen API
```Core Splashscreen API``` chỉ hoạt động nếu ứng dụng được biên dịch với API ```31``` (Android 12). Hiện tại Android 12 vẫn còn đang trong giai đoạn preview, ta cần cập nhật compileSdkVersion thành ```android-S``` trong ```build.gradle``` để có thể compile được. Trong tương lai, khi phiên bản ổn định của Android 12 được phát hành, phiên bản sẽ được sử dụng là API ```31```.

```groovy
android {
    compileSdkVersion "android-S" // while Android 12 is in preview
    // compileSdkVersion 31 - when the Android 12 is stable
}
```

Thêm dependency sau vào ```build.gradle```
```groovy
implementation "androidx.core:core-splashscreen:1.0.0-alpha01"
```

Sau khi sync Gradle Files, ta cần cập nhật ```themes/values.xml``` của app với các params mới.

Đầu tiên, tạo một theme mới ví dụ ```Theme.MySplash```, sau đó thêm các params dưới đây
- Style parent phải là ```Theme.SplashScreen``` từ API cung cấp
- ```windowSplashScreenBackground``` để set background color
- ```windowSplashScreenAnimatedIcon``` để set splash icon. Có thể là icon tĩnh hoặc động
- ```postSplashScreenTheme``` để set theme sẽ được sử dụng sau khi Splash screen không còn hiển thị

```xml
<style name="Theme.MySplash" parent="Theme.SplashScreen">
    <item name="windowSplashScreenBackground">@color/purple_500</item>
    <item name="windowSplashScreenAnimatedIcon">@mipmap/ic_launcher</item>
    <item name="postSplashScreenTheme">@style/Theme.MyApp</item>
</style>

<style name="Theme.MyApp" parent="Theme.MaterialComponents.DayNight.DarkActionBar">
      <!-- Your theme attributes goes here -->
</style>
```

Set theme SplashScreen vừa tạo cho application hoặc main Activity
```xml
<application
        ...     
        android:theme="@style/Theme.MySplash">
        ...
</application>
```
Sau khi setup theme xong, gọi ```installSplashScreen()``` trước ```setContentView``` trong Activity. Bước này sẽ liên kết Activity với ```postSplashScreenTheme``` mà chúng ta đã xác định trước đó, thay thế SplashScreen theme bằng AppTheme.

Nếu không thực hiện bước ở trên, ứng dụng sẽ throw ra một lỗi:

```
java.lang.IllegalStateException: You need to use a Theme.AppCompat theme (or descendant) with this activity.
```

Và thế là xong! Bây giờ chúng ta có Splash screen của Android 12 được chuyển xuống API ```23```<br />

<p align="center"><a href="https://ibb.co/Xb2xp3m"><img src="https://i.ibb.co/56Mhvnq/1-Owiv-Bv-Vs93-W0bh-DZ-w-KSq-Q.gif" alt="1-Owiv-Bv-Vs93-W0bh-DZ-w-KSq-Q" border="0"></a></p>

## Conclusion
Khi phát triển ứng dụng, chúng ta cần mang đến cho người dùng trải nghiệm tốt nhất có thể, đặc biệt là trong lần chạy đầu tiên. Ấn tượng đầu tiên có thể xác định xem người dùng có sử dụng ứng dụng của bạn hay không. Hy vọng qua bài viết này sẽ giúp các bạn triển khai một Splash screen từ solution chính chủ của google

## Reference
https://proandroiddev.com/implementing-core-splashscreen-api-e62f0e690f74
https://developer.android.com/about/versions/12/features/splash-screen