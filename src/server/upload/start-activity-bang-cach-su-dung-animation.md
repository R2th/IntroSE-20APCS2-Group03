Transition của activity trong material design app cung cấp trực quan sự kết nối giữa các trạng thái khác nhau thông qua chuyển động và sự biến đổi giữa các thành thành phần. Bạn có thể chỉ định animation cho việc chuyển tiếp nhập và chuyển tiếp các thành phần được chia sẽ giữa các activity.

* Enter transition sẽ xác định xem View của một Activity xuất hiện như thế nào. Ví dụ view xuất hiện trên màn hình từ bên ngoài và bay vào chính giữa màn hình.
* Exit transition xác định xem View của một Activity sẽ ẩn đi như thế nào. Ví dụ, view ẩn khỏi màn hình từ chính giữa.
* Shared element transition xác định transition của các share element giữa các activity diễn ra như thế nào. Ví dụ nếu 2 activity có cùng 1 ảnh ở các vị trí khác nhau với size khác nhau, changeImageTransform shared element sẽ hiển thị một cách trơn tru sự thay đổi này.

<div align="center">
    
![](https://images.viblo.asia/3f6ae068-de83-4a1c-96f1-7e9c15d7f60a.gif)

*Transition với shared elements.*

</div>

Android support những transition sau:

* Explode - Di chuyển view vào và ra từ chính giữa màn hình.
* Slide- Di chuyển view vào vả ra từ một trong các cạnh của màn hình.
* Fade - Thêm hoặc xoá view từ từ bằng cách điều chỉnh opacity.

Bất cứ transition nào extend [Visibility](https://developer.android.com/reference/android/transition/Visibility.html) class sẽ support enter and exit transition. Chi tiết xem API của [Transition](https://developer.android.com/reference/android/transition/Transition.html) class.

Android cũng support những shared element transition sau:

* changeBounds - Animation thay đổi layout bound của view.
* changeClipBounds - Animation thay đổi clip bounds của view.
* changeTranform - Animation thay đổi scal và rotation của view.
* changeImageTransform - Animation thay đổi size và scale của ảnh.

Khi enable acitivty transition, mặc định cross-fading transition sẽ được activate để hiện và ẩn giữa các activity.

![](https://images.viblo.asia/199785fb-2e89-41c8-ae1c-c6b90654d790.png)
*Transition với một shared element.*

## Kiểm tra system version

Activity transition API hỗ trợ từ Android 5.0 (API 21) trở lên. Để duy trì khả năng tương thích với các phiên bản Android trước đó, hãy kiểm tra phiên bản hệ thống ở runtime trước khi gọi API cho bất kì feature nào sau đây:

```kotlin
// Check if we're running on Android 5.0 or higher
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
    // Apply activity transition
} else {
    // Swap without transition
}
```

## Chỉ định custom transition

Đầu tiên, enable window content transition với thuộc tính **android:windowActivityTransitions** khi define một style kế thừa từ material theme. Bạn cũng có thể chỉ định hiện, ẩn và share element transition trong định nghĩa style của bạn:

```kotlin
<style name="BaseAppTheme" parent="android:Theme.Material">
  <!-- enable window content transitions -->
  <item name="android:windowActivityTransitions">true</item>

  <!-- specify enter and exit transitions -->
  <item name="android:windowEnterTransition">@transition/explode</item>
  <item name="android:windowExitTransition">@transition/explode</item>

  <!-- specify shared element transitions -->
  <item name="android:windowSharedElementEnterTransition">
    @transition/change_image_transform</item>
  <item name="android:windowSharedElementExitTransition">
    @transition/change_image_transform</item>
</style>
```

**change_image_transform** transition trong ví dụ này được define như sau:

```kotlin
<!-- res/transition/change_image_transform.xml -->
<!-- (see also Shared Transitions below) -->
<transitionSet xmlns:android="http://schemas.android.com/apk/res/android">
  <changeImageTransform/>
</transitionSet>
```

**changeImageTransform** element tương ứng với **[ChangeImageTransform](https://developer.android.com/reference/android/transition/ChangeImageTransform.html)** class. Chi tiết vui lòng xem API cho **[Transition](https://developer.android.com/reference/android/transition/Transition.html)**.

Để enable window content transition, gọi hàm **[Window.requestFeature()](https://developer.android.com/reference/android/view/Window.html#requestFeature(int))**:

```kotlin
// inside your activity (if you did not enable transitions in your theme)
with(window) {
    requestFeature(Window.FEATURE_CONTENT_TRANSITIONS)

    // set an exit transition
    exitTransition = Explode()
}
```

Để chỉ định transition, gọi những hàm sau với **[Transition](https://developer.android.com/reference/android/transition/Transition.html)** object:

* **[Window.setEnterTransition()](https://developer.android.com/reference/android/view/Window.html#setEnterTransition(android.transition.Transition))**
* **[Window.setExitTransition()](https://developer.android.com/reference/android/view/Window.html#setExitTransition(android.transition.Transition))**
* **[Window.setSharedElementEnterTransition()](https://developer.android.com/reference/android/view/Window.html#setSharedElementEnterTransition(android.transition.Transition))**
* **[Window.setSharedElementExitTransition()](https://developer.android.com/reference/android/view/Window.html#setSharedElementExitTransition(android.transition.Transition))**

Hàm **[Window.setExitTransition()](https://developer.android.com/reference/android/view/Window.html#setExitTransition(android.transition.Transition))** và **[Window.setSharedElementExitTransition()](https://developer.android.com/reference/android/view/Window.html#setSharedElementExitTransition(android.transition.Transition))** define exit transition cho việc gọi activity. Hàm **[Window.setEnterTransition()](https://developer.android.com/reference/android/view/Window.html#setEnterTransition(android.transition.Transition))** và **[Window.setSharedElementEnterTransition()](https://developer.android.com/reference/android/view/Window.html#setSharedElementEnterTransition(android.transition.Transition))** define cho việc enter transition cho việc gọi activity.

Để get full effect của transition, bạn phải enable window content transition cho cả activity gọi và activity được gọi. Nếu không, acitivity gọi sẽ start exit transition nhưng sau đó bạn sẽ thấy window transition (như scale hay fade).

Để bắt đầu enter transition, sử dụng hàm **[Window.setAllowEnterTransitionOverlap()](https://developer.android.com/reference/android/view/Window.html#setAllowEnterTransitionOverlap(boolean))** trong activity được gọi, điều này cho phép hiển thị enter transition ấn tượng hơn.

## Start activity sử dụng transition

Nếu bạn enable transition và set exit transition cho một activity, transition sẽ active khi bạn khởi chạy một activity khác như dưới đây:

```kotlin
startActivity(intent, ActivityOptions.makeSceneTransitionAnimation(this).toBundle())
```

Nếu bạn set enter transition cho activity thứ 2, transition cũng được active khi activity start. Để disable transition khi start activity mới, truyền null vào bundle.

## Start activity với shared element

Để tạo transition animation giữa 2 activity có một shared element:

1. Enable window content transition trong theme.
2. Chỉ định shared element transition trong style.
3. Define transition như là một XML resource.
4. Gán một common name cho shared element ở trong cả 2 layout với thuộc tính **android:transitionName**.
5. Sử dụng hàm **[ActivityOptions.makeSceneTransitionAnimation()](https://developer.android.com/reference/android/app/ActivityOptions.html#makeSceneTransitionAnimation(android.app.Activity,%20android.util.Pair%3Candroid.view.View,%20java.lang.String%3E...))**

```kotlin
// get the element that receives the click event
val imgContainerView = findViewById<View>(R.id.img_container)

// get the common element for the transition in this activity
val androidRobotView = findViewById<View>(R.id.image_small)

// define a click listener
imgContainerView.setOnClickListener( {
    val intent = Intent(this, Activity2::class.java)
    // create the transition animation - the images in the layouts
    // of both activities are defined with android:transitionName="robot"
    val options = ActivityOptions
            .makeSceneTransitionAnimation(this, androidRobotView, "robot")
    // start the new activity
    startActivity(intent, options.toBundle())
})
```

Với shared dynamic view mà được generate trong code, sử dụng hàm **[View.setTransitionName()](https://developer.android.com/reference/android/view/View.html#setTransitionName(java.lang.String))** để chỉ định tên common element ở cả 2 activity.
Để đảo ngược hoạt ảnh của transition animation khi finish activity thứ 2, gọi hàm **[Activity.finishAfterTransition()](https://developer.android.com/reference/android/app/Activity.html#finishAfterTransition())** thay vì **[Activity.finish()](https://developer.android.com/reference/android/app/Activity.html#finish())**.

## Start activity với multiple shared element

Để tạo hoạt ảnh transition animation giữa 2 activity có nhiều hơn một shared element, define shared element ở cả 2 layout với thuộc tính **android:transitionName** (hoặc sử dụng hàm **[View.setTransitionName()](https://developer.android.com/reference/android/view/View.html#setTransitionName(java.lang.String))** trong cả 2 activity), sau đó tạo đối tượng **[ActivityOptions](https://developer.android.com/reference/android/app/ActivityOptions.html)** như sau:

```kotlin
// Rename the Pair class from the Android framework to avoid a name clash
import android.util.Pair as UtilPair
...
val options = ActivityOptions.makeSceneTransitionAnimation(this,
        UtilPair.create(view1, "agreedName1"),
        UtilPair.create(view2, "agreedName2"))
```

Cảm ơn mọi người đã đọc bài của mình :D