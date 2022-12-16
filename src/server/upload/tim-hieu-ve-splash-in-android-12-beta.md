# Splash là gì ?
- Chắc hẳng các bạn từng làm bất kì ứng dụng android nào thì cũng đã từng tạo splash cho app của mình rồi đúng k nhỉ! Splash là màn hình bắt đầu khi người dùng click vào app của chúng ta, thường đó sẽ là màn hình chạy slogan của app hoặc show logo, thông thường trong các app hiện nay
`SingleActivity`  thì Splash của chúng ta sẽ là 1 `fragment`.Ở Android 12 bổ sung SplashScreen API, cho phép tạo hoạt ảnh khởi chạy ứng dụng mới cho tất cả các ứng dụng. Điều này bao gồm chuyển động trong ứng dụng khi khởi chạy, `Splash Screen` hiển thị biểu tượng ứng dụng của bạn và chuyển đổi sang `MainActivity`.
## 1. Cách hoạt động của Splash
- Khi người dùng khởi chạy ứng dụng trong khi quy trình của ứng dụng không chạy(`a cold start`) hoặc các Activity chưa được tạo (`a warm start`), các sự kiện sau sẽ xảy ra.(The splash screen is never shown during a `hot start`).
1. Hệ thống hiển thị `Splash Screen`sử dụng các  `theme` và bất kỳ `action` nào mà bạn đã xác định.
2. Khi ứng dụng đã sẵn sàng,  `Splash Screen` sẽ bị loại bỏ và ứng dụng được hiển thị.
> Các bạn tìm hiểu thêm về `a cold start, a warm start, a hot start` tại : https://developer.android.com/topic/performance/vitals/launch-time#cold nhé
## 2. Các yếu tố và cơ chế của Splash
- Các phần tử của `Splash Screen` được xác định bởi các tệp tài nguyên XML trong `Android Manifest`. Có các phiên bản chế độ `light` và `night` cho mỗi loại.

Chúng bao gồm background, logo ứng dụng động và backgroundLogo:
![](https://images.viblo.asia/c212f014-d99a-4902-8035-16bf5727abdd.png)
*Lưu ý các yếu tố sau đây:
1. Logo ứng dụng (1) phải là dạng vectơ có thể vẽ được và nó có thể ở dạng tĩnh hoặc động. Mặc dù hoạt ảnh có thể có thời lượng không giới hạn, nhưng mình khuyên bạn không nên vượt quá 1.000 mili giây. 
2. Logo (2) là tùy chọn và hữu ích nếu cần thêm độ tương phản giữa logo và màn hình. Nếu bạn sử dụng logo phù hợp, nền của nó sẽ được hiển thị nếu có đủ độ tương phản với màn hình.
3. Như với các biểu tượng phù hợp, nó sẽ là  ⅓ của màn hình cho trước bị che đi (3).
4. `Window background` (4) chỉ có một màu mờ đục. Nếu `Window background` được đặt và là màu sáng, thì nó sẽ được sử dụng theo mặc định nếu thuộc tính không setup.

*Cơ chế hoạt động của `Splash Screen` bao gồm action out và in:
1. Action in bao gồm chế độ xem hệ thống đến `Splash Screen`. Điều này được kiểm soát bởi hệ thống và không thể custom.
2. Action out bao gồm action hiden `Splash Screen`. Nếu bạn muốn tùy chỉnh nó , bạn sẽ có quyền truy cập `SplashScreenView` và logo của nó và có thể chạy bất kỳ action nào trên chúng, với các cài đặt về biến đổi, độ mờ và màu sắc. Trong trường hợp đó, `Splash Screen` cần phải được xóa theo cách thủ công khi action được thực hiện xong.
## 3. Tùy chỉnh Splash Screen
- Theo mặc định, `SplashScreen` sử dụng `windowBackground` theme của bạn nếu đó là một màu duy nhất và `launcher icon`. Việc tùy chỉnh `Splash Screen` được thực hiện bằng cách thêm các thuộc tính vào theme app.

* `Splash Screen` của ứng dụng bạn có thể được tùy chỉnh theo bất kỳ cách nào sau đây:
1. Đặt thuộc tính `theme` để thay đổi client.
2. Giữ nó trên màn hình trong một thời gian dài hơn(tối đa 1s như mình đề cập ban đầu)
3. Tùy chỉnh action để loại bỏ `Splash Screen`
### Đặt Theme cho Splash Screen để thay đổi giao diện của nó
- Bạn có thể chỉ định các thuộc tính sau trong `attributes in your Activity theme` của mình để tùy chỉnh  `Splash Screen` cho ứng dụng của mình. Nếu bạn đã làm bước trên rồi thì hãy thực hiện như sau tại `Splash Screen` sử dụng các thuộc tính như `android:windowBackground`, hãy xem xét và implement thư viện cần thiết cho `Android 12` nhé.
1. Sử dụng `windowSplashScreenBackground` để setBackground bằng một màu cụ thể: 

    ``` <item name="android:windowSplashScreenBackground">@color/...</item>```
    
2. Sử dụng `windowSplashScreenAnimatedIcon` để thay thế một logo ngay giữa màn hình. Nếu logo có thể  có animation và có thể vẽ qua `AnimationDrawable` và `AnimatedVectorDrawable`, nó cũng sẽ phát action trong khi hiển thị window start. 

    ``` <item name="android:windowSplashScreenAnimatedIcon">@drawable/...</item>```
    
3. Sử dụng `windowSplashScreenAnimationDuration` để đặt khoảng thời gian `Splash Screen` xuất hiện trước khi nó bị loại bỏ. Thời gian tối đa là `1.000 ms`. 
4. Sử dụng `windowSplashScreenIconBackground` để đặt background đằng sau logo của `Splash Screen`. Điều này rất hữu ích nếu không có đủ độ tương phản giữa `windows background` và logo. 

    ``` <item name=”android:windowSplashScreenIconBackground”>@color/...</item>```
    
5. Theo tùy chọn, bạn có thể sử dụng `windowSplashScreenBrandingImage` để đặt hình ảnh được hiển thị ở cuối `Splash Screen`. Các nguyên tắc thiết kế khuyên bạn không nên sử dụng hình ảnh thương hiệu. Để tránh bị đánh bản quyền nhé :v:  

    ``` <item name=”android:windowSplashScreenBrandingImage”>@drawable/...</item>```
### Giữ màn hình Splash trên màn hình trong thời gian dài hơn
-  `Splash Screen` sẽ bị loại bỏ ngay sau khi ứng dụng của bạn vẽ khung hình đầu tiên. Nếu bạn cần tải một lượng nhỏ dữ liệu, chẳng hạn như cài đặt `theme` trong ứng dụng từ một ổ đĩa cục bộ không đồng bộ, bạn có thể sử dụng `ViewTreeObserver.OnPreDrawListener` cách tạm ngưng ứng dụng để vẽ khung hình đầu tiên của nó.
```kotlin
// Create a new event for the activity.
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    // Set the layout for the content view.
    setContentView(R.layout.main_activity)

    // Set up an OnPreDrawListener to the root view.
    val content: View = findViewById(android.R.id.content)
    content.viewTreeObserver.addOnPreDrawListener(
        object : ViewTreeObserver.OnPreDrawListener {
            override fun onPreDraw(): Boolean {
                // Check if the initial data is ready.
                return if (viewModel.isReady) {
                    // The content is ready; start drawing.
                    content.viewTreeObserver.removeOnPreDrawListener(this)
                    true
                } else {
                    // The content is not ready; suspend.
                    false
                }
            }
        }
    )
}
```
### Tùy chỉnh hoạt ảnh để loại bỏ màn hình Splash
- Bạn có thể tùy chỉnh thêm hoạt ảnh của `Splash Screen` thông qua `Activity.getSplashScreen`.
```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    // ...

    // Add a callback that's called when the splash screen is animating to
    // the app content.
    splashScreen.setOnExitAnimationListener { splashScreenView ->
        // Create your custom animation.
        val slideUp = ObjectAnimator.ofFloat(
            splashScreenView,
            View.TRANSLATION_Y,
            0f,
            -splashScreenView.height.toFloat()
        )
        slideUp.interpolator = AnticipateInterpolator()
        slideUp.duration = 200L

        // Call SplashScreenView.remove at the end of your custom animation.
        slideUp.doOnEnd { splashScreenView.remove() }

        // Run your animation.
        slideUp.start()
    }
}
```
- Khi bắt đầu gọi lại này, vector động có thể vẽ trên `Splash Screen` đã bắt đầu. Tùy thuộc vào thời gian khởi chạy ứng dụng, tệp có thể vẽ có thể nằm ở giữa hoạt ảnh của nó. Sử dụng `SplashScreenView.getIconAnimationStartMillis` để biết khi action bắt đầu. Bạn có thể tính thời lượng còn lại của action logo như sau:
```kotlin
// Get the duration of the animated vector drawable.
val animationDuration = splashScreenView.iconAnimationDurationMillis
// Get the start time of the animation.
val animationStart = splashScreenView.iconAnimationDurationMillis
// Calculate the remaining duration of the animation.
val remainingDuration = (
        animationDuration - (SystemClock.uptimeMillis() - animationStart)
    ).coerceAtLeast(0L)
```
## 4. Kết luận
- Như vậy các bạn có thể áp dụng và demo thử  `Splash` này trên Android 12 Beta nhé, chúc các bạn thành công  xem thêm và hiểu hơn về Splash của `android 12` tại web develop nha các bạn :vulcan_salute: 
- Source:  https://developer.android.com/about/versions/12/features/splash-screen