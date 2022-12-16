![](https://images.viblo.asia/b824e54a-247d-4737-85d6-316b9369cfae.png)
Android 12 đã mang đến cho chúng ta một tính năng mới để cải thiện trải nghiệm người dùng, hỗ trợ màn hình Splash chính thức. Trước đây, nếu ứng dụng muốn có tính năng này, ứng dụng có thể cần thêm một triển khai tùy chỉnh, dẫn đến một số cách khác nhau để thực hiện. Phiên bản mới nhất của Android sẽ tự động thêm tính năng này cho tất cả các ứng dụng và cho phép tùy chỉnh bằng các thông số đơn giản, nhưng tiếc là chức năng này chỉ bị hạn chế ở Android 12.

Tuy nhiên, vào ngày 30 tháng 6 năm 2021, Google đã được giới thiệu bản alpha đầu tiên của Core Splashscreen API, cung cấp khả năng tương thích ngược cho các API màn hình Splash mới. Sử dụng thư viện này, bạn có thể triển khai tính năng mới này xuống API 23, mang lại giao diện giống nhau trên nhiều phiên bản Android.

Nhưng trước khi chúng ta đi sâu vào triển khai, chính xác thì Splash Screen là gì?

## Splash Screen là gì?
Splash Screen là một màn hình trực quan được hiển thị cho người dùng trong khi ứng dụng đang khởi chạy. Hoạt ảnh này cung cấp trải nghiệm người dùng tốt hơn vì người dùng không nhìn chằm chằm vào màn hình trống mà có thể nhìn thấy biểu tượng ứng dụng hoặc hoạt ảnh tùy chỉnh. 

Dưới đây là một ví dụ về màn hình splash:

<a href="https://ibb.co/VjJ0t2v"><img src="https://i.ibb.co/gjmb3zD/android-12-splash-2.gif" alt="android-12-splash-2" border="0"></a>

Màn hình này được hiển thị ở hai điều kiện:
* Cold Start: - khi ứng dụng đang không hoạt động và người dùng mở ứng dụng
* Warm Start: - khi các tiến trình ứng dụng đang chạy nhưng Activity chưa được tạo (hoặc đã bị hủy trước đó)

Splashscreen sẽ không được hiển thị khi Hot Start. Để dễ hiểu hơn thì mình sẽ đưa ra cụ thể một trường hợp: nếu người dùng nhấn nút trang chủ để đưa ứng dụng chạy nền và mở lại trước khi hệ thống hủy Activity, Màn hình Splash sẽ không được hiển thị.

## Triển khai API Splash screen

API Core Splashscreen mới sẽ chỉ hoạt động nếu ứng dụng được biên dịch trong Android 12 (API 31). Khi phiên bản này hiện đang ở chế độ beta, ta cần cập nhật compileSdkVersionlên phiên bản này trong file `build.gradle`. Trong tương lai, khi phiên bản ổn định của Android 12 được phát hành, phiên bản sẽ được sử dụng là API 31.

```
android { 
    android {
    compileSdkVersion "android-S" // while Android 12 is in preview
    // compileSdkVersion 31 - when the Android 12 is stable
}
}
```
Cũng trong file này, chúng ta cần implement thư viện mới này:

```
implementation "androidx.core:core-splashscreen:1.0.0-alpha01"
```

Sau khi sync các tệp Gradle, ta cần cập nhật `themes/values.xml` (và cả tệp `night/` nếu ứng dụng hỗ trợ dark mode) với các thông số mới.
Trước hết, ta tạo một theme  mới, trong ví dụ của mình, nó được gọi là `Theme.MySplash`. Bây giờ ta thêm các tham số sau:

* Style paren là `Theme.SplashScreen`
* `windowSplashScreenBackground` để đặt màu nền
* `windowSplashScreenAnimatedIcon` để đặt biểu tượng cho màn hình Splash
* `postSplashScreenTheme` để đặt chủ đề sẽ được sử dụng sau khi màn hình Splash không còn hiển thị

```
<style name="Theme.MySplash" parent="Theme.SplashScreen">
    <item name="windowSplashScreenBackground">@color/purple_500</item>
    <item name="windowSplashScreenAnimatedIcon">@mipmap/ic_launcher</item>
    <item name="postSplashScreenTheme">@style/Theme.MyApp</item>
</style>

<style name="Theme.MyApp" parent="Theme.MaterialComponents.DayNight.DarkActionBar">
      <!-- Your theme attributes goes here -->
</style> 
```

Bây giờ ta đặt theme này cho Activity chính:

```
<application
        ...     
        android:theme="@style/Theme.MySplash">
        ...
</application>
```

Sau khi thiết lập các theme, một bước rất quan trọng là set `installSplashScreen` trước `setContentView` trong Activity. Nó sẽ liên kết Activity với theme `postSplashScreenTheme` mà mình đã xác định trước đó, thay thế theme Splash Screen bằng theme thông thường.

```
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        installSplashScreen()
        setContentView(R.layout.activity_main)
    }
}
```

Nếu bạn không làm bước này thì khi build ứng dụng sẽ báo lỗi:
```
java.lang.IllegalStateException: You need to use a Theme.AppCompat theme (or descendant) with this activity.
```

Và BÙM ! Giờ đây, chúng ta đã chuyển màn hình Splash Screen của Android 12 xuống API 23. 🎉

<a href="https://ibb.co/NVxHq40"><img src="https://i.ibb.co/M2n3HXz/sp.gif" alt="sp" border="0"></a>

## Tổng kết
Khi phát triển ứng dụng, chúng ta cần cung cấp cho người dùng trải nghiệm tốt hơn, đặc biệt là trong lần chạy đầu tiên. Ấn tượng đầu tiên này thậm chí có thể quyết định xem người dùng có sử dụng App của bạn hay không. Thêm Splashscreen mang đến cho ứng dụng tính liền mạch, thay vì chỉ hiển thị màn hình trống trong vài mili giây.
Từ trước đến nay chúng ta đã làm việc với nhiều ứng dụng cần triển khai Splash Screen và khi không có thư viện chính thức để làm như vậy, chúng ta phải tự custom một màn hình Splash, việc này có thể sẽ mất khá nhiều thời gian. Và trong quá trình này, chúng ta cũng gặp phải một số vấn đề như nó hiển thị khi hot-start hoặc hoạt ảnh không chạy mượt mà trong một vài thiết bị và đây chính là giải pháp chính thức của Google. Hy vọng với bài viết này, các bạn sẽ có thêm những hiểu biết về Splashscreen API và áp dụng nó trong thực tiễn.

Để biết thêm thông tin về Splashscreen API, bạn có thể truy cập tài liệu chính thức của Google: [Tại đây](https://developer.android.com/about/versions/12/features/splash-screen)

Bài viết được tham khảo từ [Medium](https://proandroiddev.com/implementing-core-splashscreen-api-e62f0e690f74)