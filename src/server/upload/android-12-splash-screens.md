Android 12 bổ sung API [SplashScreen](https://developer.android.com/reference/android/window/SplashScreen), cho phép tạo hoạt ảnh khởi chạy ứng dụng mới cho tất cả các ứng dụng. Điều này bao gồm chuyển động trong ứng dụng khi khởi chạy, splash screen hiển thị app icon và transition khi vào app

Trải nghiệm mới mang đến các yếu tố thiết kế tiêu chuẩn cho mọi lần khởi chạy ứng dụng, nhưng nó cũng có thể tùy chỉnh để ứng dụng của bạn có thể duy trì thương hiệu độc đáo của mình.

Ngoài việc sử dụng trực tiếp API **SplashScreen**, bạn cũng có thể sử dụng  [SplashScreen compat library](https://developer.android.com/reference/kotlin/androidx/core/splashscreen/SplashScreen), đã bao gồm cả API **SplashScreen**.

![](https://images.viblo.asia/d5e29011-baf0-4a1b-9deb-5177da732737.gif)

## Splash screen hoạt động như thế nào

Khi người dùng khởi chạy ứng dụng trong khi app process không chạy ([cold start](https://developer.android.com/topic/performance/vitals/launch-time#cold)) hoặc Activity chưa được tạo ([warm start](https://developer.android.com/topic/performance/vitals/launch-time#warm)), các sự kiện sau sẽ xảy ra. (Splash screen không bao giờ hiển thị khi [hot start](https://developer.android.com/topic/performance/vitals/launch-time#hot))

1. System hiển thị splash screen sử dụng theme và bất kì animation nào mà bạn define.
2. Khi app sẵn sàng, splash screen sẽ biến mất và app được hiển thị

## Các yếu tố và cơ chế của animation

Các thành phần của animation được define bằng XML resource file trong Android Manifest. Có các phiên bản dark và light mode cho mỗi loại.

Chúng bao gồm window background, animated app icon, và icon background:

![](https://images.viblo.asia/baa0c897-f349-4293-be02-23017323a172.png)

Lưu ý xem xét những yếu tố sau:

* App icon (1) nên là dạng vector drawable, có thể là ảnh tĩnh hoặc động. Mặc dù animation có thể có thời lượng không giới hạn, nhưng recommend không quá 1000 milisecond. Mặc định thì launcher icon được sử dụng.
* Icon background (2) là optional, và nó có ích nếu cần sự tương phản giữa icon và background. Nếu sử dụng [adaptive icon](https://developer.android.com/guide/practices/ui_guidelines/icon_design_adaptive), background của nó sẽ được hiển thị nếu có đủ sự tương phản với window background.
* Như với adaptive icon, ⅓ của của foreground bị che đi (3).
* Windows background (4) chri có một màu mờ đục. Nếu windows backround được set và là một màu trơn, nó sẽ được sử dụng theo mặc định nếu attribute khôgn được set.

Cơ chế animation của splash screen bao gồm *enter* và *exit* animation.

* Enter animation bao gồm system view với splash screen, được kiểm soát bởi system và không thể custom.
* Exit animation bao gồm animation ẩn splash screen. Nếu muốn custom, phải access vào [SplashScreenView](https://developer.android.com/reference/android/window/SplashScreenView)  và icon của nó để chạy bất kì animation nào, với các setting transform, opacity, và màu sắc. Trong trường hợp đó, splash screen cần được remove thủ công khi animation chạy xong.

## Custom splash screen trong app của bạn

Theo mặc định, **SplashScreen** sử dụng **windowBackground** trong theme của bạn nếu đó là một màu duy nhất và launcher icon. Việc custom splash screen được thực hiện bằng cách thêm các thuộc tính vào app theme.

Splash screen trong app của bạn có thể được custom bằng bất kì cách nào dưới đây:

* Setting theme attribute để thay đổi giao diện
* Giữ cho nó hiển thị trong thời gian lâu hơn
* Custom animation để ẩn splash screen

### Set theme cho splash screen để thay đổi giao diện của nó

Bạn có thể chỉ định các thuộc tính sau trong Activity theme của mình để tùy chỉnh splash screen cho ứng dụng của mình. Nếu bạn đã có splash screen kế thừa sử dụng các thuộc tính như **android:windowBackground**, hãy xem xét cung cấp tệp resource thay thế cho Android 12.

1. Sử dụng [windowSplashScreenBackground](https://developer.android.com/reference/android/R.attr#windowSplashScreenBackground) để fill background với một màu sắc nhất định:

```kotlin
<item name="android:windowSplashScreenBackground">@color/...</item>
```

2. Sử dụng [windowSplashScreenAnimatedIcon](https://developer.android.com/reference/android/R.attr#windowSplashScreenAnimatedIcon) để thay thế một icon ở giữa cửa sổ bắt đầu. Nếu đối tượng có animation và có thể vẽ được thông qua [AnimationDrawable](https://developer.android.com/reference/android/graphics/drawable/AnimationDrawable) và [AnimatedVectorDrawable](https://developer.android.com/reference/android/graphics/drawable/AnimatedVectorDrawable), nó cũng sẽ play animation trong khi hiển thị cửa sổ bắt đầu.

```kotlin
<item name="android:windowSplashScreenAnimatedIcon">@drawable/...</item>
```

3. Sử dụng [windowSplashScreenAnimationDuration](https://developer.android.com/reference/android/R.attr#windowSplashScreenAnimationDuration) để đặt khoảng thời gian splash screen xuất hiện trước khi nó bị loại bỏ. Thời gian tối đa là 1.000 ms.
4. Sử dụng **windowSplashScreenIconBackground** để đặt nền đằng sau biểu tượng splash screen. Điều này hữu ích nếu không có đủ độ tương phản giữa nền cửa sổ và biểu tượng.

```kotlin
<item name=”android:windowSplashScreenIconBackground”>@color/...</item>
```
5. Theo tùy chọn, bạn có thể sử dụng [windowSplashScreenBrandingImage](https://developer.android.com/reference/android/R.attr#windowSplashScreenBrandingImage) để đặt hình ảnh được hiển thị ở cuối splash screen. Các nguyên tắc thiết kế khuyên bạn không nên sử dụng hình ảnh thương hiệu.

```kotlin
<item name=”android:windowSplashScreenBrandingImage”>@drawable/...</item>
```

### Giữ splash screen trên màn hình trong thời gian dài hơn

Splash screen bị loại bỏ ngay sau khi ứng dụng của bạn vẽ khung hình đầu tiên. Nếu bạn cần tải một lượng nhỏ dữ liệu, chẳng hạn như cài đặt in-app theme từ local disk không đồng bộ, bạn có thể sử dụng [ViewTreeObserver.OnPreDrawListener](https://developer.android.com/reference/android/view/ViewTreeObserver.OnPreDrawListener) để tạm dừng ứng dụng để vẽ khung đầu tiên của nó.

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

### Tùy chỉnh animation để loại bỏ splash screen

Bạn có thể tùy chỉnh thêm animation của splash screen thông qua [Activity.getSplashScreen](https://developer.android.com/reference/android/app/Activity#getSplashScreen()).

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

Khi bắt đầu callback này, [animated vector drawable](https://developer.android.com/reference/android/graphics/drawable/AnimatedVectorDrawable) trên splash screen đã bắt đầu. Tùy thuộc vào thời gian khởi chạy ứng dụng, drawable có thể nằm ở giữa animation của nó. Sử dụng [SplashScreenView.getIconAnimationStartMillis](https://developer.android.com/reference/android/window/SplashScreenView#getIconAnimationStartMillis()) để biết khi nào animation bắt đầu. Bạn có thể tính thời lượng còn lại của icon animation như sau:

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
 
 ## Migrate splash screen hiện tại của bạn với Android 12
 
 Nếu bạn không migrate  ứng dụng của mình, trải nghiệm khởi chạy ứng dụng của bạn trên Android 12 sẽ bị giảm chất lượng hoặc có thể có kết quả không mong muốn:
 
 * Nếu màn hình splash screen hiện tại của bạn được implement bằng [custom theme overrides android:windowBackground](https://developer.android.com/topic/performance/vitals/launch-time#solutions-3), hệ thống sẽ thay thế custom splash screen của bạn bằng default Android system splash screen trên Android 12 (có thể không phải là trải nghiệm mong muốn trong ứng dụng của bạn).
 * Nếu splash screen hiện tại của bạn được triển khai bằng **Activity** chuyên dụng, việc khởi chạy ứng dụng của bạn trên các thiết bị chạy Android 12 sẽ dẫn đến các màn hình splash screens trùng lặp: màn hình splash screens hệ thống mới hiển thị, theo sau là hoạt động trên màn hình splash screens hiện có của bạn.
 
 ### SplashScreen compat library
 
 Bạn có thể sử dụng trực tiếp API **SplashScreen**, nhưng bạn nên sử dụng [Androidx SplashScreen compat library](https://developer.android.com/reference/kotlin/androidx/core/splashscreen/SplashScreen) để thay thế. Thư viện compat sử dụng API **SplashScreen**, cho phép tương thích ngược và tạo ra giao diện nhất quán cho hiển thị splash screen trên tất cả các phiên bản Android.
 
 Nếu bạn chọn migrate bằng cách sử dụng trực tiếp API SplashScreen, trên Android 11 và các bản Android cũ hơn, splash screen của bạn trông giống hệt như trước đây; bắt đầu trên Android 12, splash screen sẽ có giao diện Android 12 mới.
 
 ### Migrate splash screen implementation
 
 Nếu bạn migrate từ Activity chuyên dụng, bạn cũng nên làm theo các [best practice](https://developer.android.com/about/versions/12/splash-screen-migration#best-practices) này để điều chỉnh custom Activity splash screen của bạn. API **SplashScreen** mới cũng làm giảm độ trễ khởi động đã được giới thiệu với splash screen activity chuyên dụng.
 
 Để migrate splash screen:
 
 1. Trong **build.gradle** file, [thay đổi compileSdkVersion](https://developer.android.com/about/versions/12/setup-sdk) và include **SplashScreen** compat library in dependencies.

```kotlin
build.gradle

android {
   compileSdkVersion 31
   ...
}
dependencies {
   ...
   implementation 'androidx.core:core-splashscreen:1.0.0-alpha01'
}
```

2. Tạo theme với parent của **Theme.SplashScreen**, và set value của **postSplashScreenTheme** cho theme mà **Activity** sử dụng và **windowSplashScreenAnimatedIcon** để drawable hoặc animated drawable. Các thuộc tính khác là optinal.

```kotlin
<style name="Theme.App.Starting" parent="Theme.SplashScreen">
   // Set the splash screen background, animated icon, and animation duration.
   <item name="windowSplashScreenBackground">@color/...</item>

   // Use windowSplashScreenAnimatedIcon to add either a drawable or an
   // animated drawable. One of these is required.
   <item name="windowSplashScreenAnimatedIcon">@drawable/...</item>
   <item name="windowSplashScreenAnimationDuration">200</item>  # Required for
                                                                # animated icons

   // Set the theme of the Activity that directly follows your splash screen.
   <item name="postSplashScreenTheme">@style/Theme.App</item>  # Required.
</style>
```

3. Trong manifest, thay theme của starting activity thành theme vừa tạo ở trên:

```kotlin
<manifest>
   <application android:theme="@style/Theme.App.Starting">
    <!-- or -->
        <activity android:theme="@style/Theme.App.Starting">
...
```

4. Call **installSplashScreen** ở starting activity trước khi call **setContentView**

```kotlin
class SplashScreenSampleActivity : Activity() {

   override fun onCreate(savedInstanceState: Bundle?) {
       super.onCreate(savedInstanceState)

       // Handle the splash screen transition.
       val splashScreen = installSplashScreen()

       setContentView(R.layout.main_activity)
...
```

**installSplashScreen** trả về splash screen object, bạn có thể chọn sử dụng custom animation hoặc giữ cho splash screen ở màn hình lâu hơn.

### Điều chỉnh custom splash screen Activity với trải nghiệm splash screen mới

Sau khi migrate trải nghiệm splash screen mới trên Android 12, custom splash screen Activity của bọn vẫn còn, vậy nên bạn sẽ phải chọn làm gì đó với nó. Có các tùy chọn sau:

* Giữ lại custom activity, nhưng không cho nó hiển thị.
* Giữ lại custom activity vì lý do thương hiệu.
* Xóa custom activity, và tùy chỉnh lại.

#### Giữ lại custom activity, nhưng không cho nó hiển thị

Nếu splash screen **Activity** hiện có của bạn sử dụng chính cho việc điều hướng, hãy xem xét xóa nó đi; ví dụ, bạn muốn kết nối trực tiếp với activity thực hoặc di chuyển đến acitivity riêng lẻ với các thành phần con. Nếu nó không khả thi, có thể sử dụng [predraw listener](https://developer.android.com/about/versions/12/features/splash-screen#suspend-drawing) để giữ việc điều hướng activity nhưng sẽ dừng việc render lại. Làm thế này khi thay đổi splash screen sang activity khác sẽ mượt mà hơn.

#### Giữ lại custom activity vì lý do thương hiệu

Nếu bạn muốn sử dụng splash screen Activity để có giữ lại thương hiệu, bạn có thể chuyển tiếp từ system splash screen vào cusotm splash screen **Activity** của bạn bằng cách [custom animation ẩn splash screen](https://developer.android.com/about/versions/12/features/splash-screen#customize-animation). Tuy nhiên tốt nhất nên tránh trường hợp này nếu có thể và sử dụng **SplashScreen** API cho thương hiệu splash screen của bạn.

#### Xóa custom activity, và tùy chỉnh lại

Nói chung, bạn nên xóa hoàn toàn customized splash screen Activity của mình để tránh trùng lặp các splash screens không được migrate, tăng hiệu quả và giảm thời gian load splash screen. Có nhiều kỹ thuật khác nhau mà bạn có thể sử dụng để tránh hiển thị splash screen activity.

* **Lazy load components, modules, hoặc libraries**: Tránh load initial componenet hoặc library không cần thiết cho app khi khởi động. Load nó sau khi thực sự cần thiết.
Nếu app của bạn thật sự cần các component để có thể hoạt động được, load nó chỉ khi thật sự cần thiết và không phải ở launch time, hoặc sử dụng background thread để load sau khi app đã khởi động. Cố gắng giữ **Application onCreate()** nhẹ nhất có thể.

Bạn cũng có thể hưởng lợi từ việc sử dụng [App Startup library](https://developer.android.com/topic/libraries/app-startup) để khởi tạo các components khi khởi động ứng dụng. Khi làm như vậy, hãy đảm bảo vẫn load tất cả các modules cần thiết cho starting activity.

* **Tạo placeholder khi load một lượng dữ liệu từ data local**
* **Show placeholder**:

Đối với loads dựa trên mạng có thời lượng không xác định, hãy loại bỏ splash screen và hiển thị placeholders chỗ để load không đồng bộ.

* **Sử dụng caching**: 
* 
Khi người dùng mở ứng dụng của bạn lần đầu tiên, bạn có thể hiển thị các loading indicators cho một số phần tử UI (được hiển thị trong ví dụ sau). Lần tới khi người dùng quay lại ứng dụng của bạn, bạn có thể hiển thị nội dung được lưu trong bộ nhớ cache này trong khi tải nội dung mới hơn.

![](https://images.viblo.asia/dcc0cc96-d72d-4734-b637-88e2b9cbfa25.gif)
 
 Cảm ơn mọi người đã đọc bài của mình :D