## Overview
Activity transitions trong material design cung cấp cho chung ta các kết nối trạng thái khác nhau thông qua motion (chuyển động) và transformations (biến đổi) giữa các common element.  Các bạn có thể custom animations cho **enter,  exit transitions** và **transitions of shared**  giữa các activities. 

- **Enter transitons** là xác định xem view trong activity sẽ enter the scene (thâm nhập vào bối cảnh) activity như thế nào. Ví dụ enter transitons: các views sẽ di chuyển từ bên ngoài và bay về phía giữa màn hình.
- **Exit transition** ngược lại với **enter transition**, nó sẽ xác định xem view trong activity sẽ exit the scene (Thoát khỏi bối cảnh) activity như thế nào. Ví dụ exit transition: các views sẽ thoát khỏi xa khỏi bối cảnh từ vị trí trung tâm (center).
- **Shared elements transition** xác định cách các view được chia sẻ giữa 2 activity transitons. Ví dụ: nếu hai activity có cùng một hình ảnh ở các vị trí và kích thước khác nhau, quá trình chuyển đổi phần tử *changeImageTransform* được chia sẻ , nó sẽ *translates and scales*  hình ảnh một cách trơn tru giữa các hoạt động này.

Android hỗ trợ các transition cho enter và exits sau:
- *explode* di chuyển các view vào hoặc ra từ trung tâm của bối cảnh (of the scene).
- *slide*  di chuyển các view vào hoặc ra từ một trong các cạnh của bối cảnh.
- *fade* Thêm hoặc xóa view khỏi bối cảnh bằng cách thay đổi opacity (độ mờ) của nó.

Android cũng hỗ trợ shared elements transitions, cụ thể:
- *changeBounds* Tạo hiệu ứng thay đổi trong giới hạn layout của target views.
- *changeClipBounds* Tạo hiệu ứng thay đổi trong giới hạn Clip của target views.
- *changeTransform* Tạo hiệu ứng  thay đổi về tỷ lệ và xoay (scale and rotation) của target views.
- *changeImageTransform* Tạo hiệu ứng  thay đổi về kích thước và tỷ lệ của  target image.

Khi bạn enable activity transitions trong ứng dụng của mình, chuyển tiếp mờ dần mặc định được kích hoạt giữa các activites khi enter và exits.

![](https://images.viblo.asia/8ae1cfbf-4fe3-45ff-b4b6-8be7934043dd.png)
*Scene transition with one shared element.*

## 1. Check the system version
Activity transition APIs có sẵn từ phiên bản Android 5.0 trở lên. Để duy trì khả năng tương thích với các phiên bản Android trước đó, hãy kiểm tra phiên bản hệ thống hiện tại trước khi bạn gọi API cho bất kỳ tính năng nào:
```kotlin
// Check if we're running on Android 5.0 or higher
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
    // Apply activity transition
} else {
    // Swap without transition
}
```

## 2. Specify custom transitions
Trước tiên, enable window content transitions, khai báo, định nghĩa các transition bạn muốn thực hiện vào file style.xml với theme material. 

```xml
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

Ví dụ cho transition *change_image_transform* sẽ được định nghĩa như sau:
```xml
<!-- res/transition/change_image_transform.xml -->
<transitionSet xmlns:android="http://schemas.android.com/apk/res/android">
  <changeImageTransform/>
</transitionSet>
```

Ngoài việc khai báo, định nghĩa transitions trong theme, các bạn cũng có thể định nghĩa transition trong code như sau:
```kotlin
//Kotlin
// inside your activity (if you did not enable transitions in your theme)
with(window) {
    requestFeature(Window.FEATURE_CONTENT_TRANSITIONS)

    // set an exit transition
    exitTransition = Explode()
}
```

Để chỉ định Transition trong code của bạn, hãy gọi các phương thức này thông qua đối tượng ***Transitions: ***

* *Window.setEnterTransition()*
* *Window.setExitTransition()*
* *Window.setSharedElementEnterTransition()*
* *Window.setSharedElementExitTransition()*

Các hàm *setExitTransition()* và *setSharedEuityExitTransition()* xác định exit transition (thoát transition) cho activity gọi (calling activity).
Các hàm *setEnterTransition()* và *setSharedElementEnterTransition()* xác định enter transition (quá trình thâm nhập) cho activity được gọi (called activity).

Để có được hiệu ứng đầy đủ của quá trình chuyển đổi, bạn phải kích hoạt  *window content transitions* trên cả calling activity và called activity. Mặt khác, calling activity sẽ bắt đầu quá trình thoát, nhưng sau đó bạn sẽ thấy một chuyển tiếp cửa sổ (như tỷ lệ hoặc mờ dần).

Để bắt đầu enter transition càng sớm càng tốt, hãy sử dụng hàm Window.setAllowEntryTransitionOverlap() trên activity được gọi. Điều này cho phép bạn có sự chuyển tiếp ấn tượng hơn.

## 3. Start an activity using transitions
Nếu bạn đã enable transitions và đặt chuyển tiếp thoát (exit transitions) cho một activity, quá trình chuyển đổi được kích hoạt khi bạn khởi chạy một activity khác như sau:

```kotlin
//Kotlin
startActivity(intent,
              ActivityOptions.makeSceneTransitionAnimation(this).toBundle())
```

Nếu bạn đã đặt chuyển đổi nhập (enter transitions) cho activity thứ hai, quá trình chuyển đổi cũng được kích hoạt khi activity bắt đầu. Để vô hiệu hóa hiệu ứng chuyển tiếp khi bạn bắt đầu một activity khác, hãy cung tùy chọn bundle null.

## 4. Start an activity with a shared element
Để tạo hiệu ứng chuyển màn hình giữa 2 activity có thành phần được chia sẻ (shared element), các bước cần thực hiện như sau:
1. Enable window content transitions trong theme.
2. Chỉ định *shared elements transition* trong style.
3. Tạo transition dưới dạng XML resource.
4. Khai báo/Gán 1 cái tên chung cho shared elements trong cả 2 layouts với thuộc tính *android:transitionName*.
5. Sử dụng phương thức ActivityOptions.makeSceneTransitionAnimation().

Ví dụ demo:
- activity_main.xml
- activity_second.xml

Tạo 1 ImageView, chỉ định transitionName cho cả 2 layout **activity_main.xml** và **activity_second.xml**

```xml
            <ImageView
                    android:id="@+id/imv_demo"
                    android:transitionName="transition_name"
                    android:scaleType="centerCrop"
                    android:src="@drawable/bg"
                    android:layout_width="match_parent"/>
```

Sử dụng phương thức ActivityOptions.makeSceneTransitionAnimation()
```kotlin
//Kotlin
                val intent = Intent(this@MainActivity, SecondActivity::class.java)

                val imvDinner = findViewById(R.id.imv_demo) as ImageView
                val imagePair = Pair.create(imvDinner as View, "transition_name")

                val optionsCompat = ActivityOptionsCompat.makeSceneTransitionAnimation(
                    this@MainActivity, imagePair)
                ActivityCompat.startActivity(this@MainActivity, intent, optionsCompat.toBundle())
```

Demo:

![](https://images.viblo.asia/35d49149-e4ce-4a75-b58e-6308f6542bf0.gif)

Bài viết của mình đến đây là hết. Cám ơn các bạn đã đọc :D