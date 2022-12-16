Chào các bạn!

Bottom sheet là component cái mà trượt lên từ dưới cùng của màn hình giúp cho việc hiển thị thêm được nhiều nội dung hơn. Bạn có thể tìm hiểu nhiều thông tin hơn về  Bottom Sheet  trong [Google Material Design](https://material.io/design/)  guidelines.

![](https://images.viblo.asia/f5400930-087c-4113-8e50-75cb894a40bc.gif)
Sau đây mình sẽ hướng dẫn các bạn các bước để làm một Bottom Sheet.

**Thêm thư viện phụ thuộc**
```
dependencies {
    //Thay X.X.X với version mới nhất
    compile 'com.android.support:appcompat-v7:X.X.X'
    compile 'com.android.support:design:X.X.X'
}
```
Thừa kế **AppCompatActivity** trong activity của bạn.
```
public class ButtonActivity extends AppCompatActivity {
...
}
```
**Tạo layouts**

**Tạo file hiển thị nội dung của Bottom Sheet**

Để cho đơn giản chúng ta sẽ include file này thay vì thêm trực tiếp. Đây là layout sẽ chứa nội dung của Bottom Sheet. Mình đặt tên file này là **bottom_sheet.xml.**
```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/bottom_sheet"
    android:layout_width="match_parent"
    android:layout_height="340dp"
    android:background="@android:color/darker_gray"
    android:orientation="vertical"
    app:behavior_hideable="true"
    app:behavior_peekHeight="80dp"
    app:layout_behavior="android.support.design.widget.BottomSheetBehavior">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="80dp"
        android:background="@color/colorAccent"
        android:gravity="center"
        android:text="@string/bottom_sheet_peek"
        android:textColor="@android:color/white" />

    <TextView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:gravity="center"
        android:text="@string/bottom_sheet_content"
        android:textColor="@android:color/white" />

</LinearLayout>
```
**behavior_peekHeight**: Xác định chiều cao của phần có thể nhìn thấy.

**behavior_hideable**: Xác định xem Bottom Sheet có thể ẩn xuống bởi kéo xuống hay không.

**Container view - view chứa Bottom Sheet**

Thêm **CoordinatorLayout** như là root view. Tiếp theo chúng ta sẽ "include" view **bottom_sheet** vừa được tạo ở bước trên trực tiếp với view này. **app_bar** và **activity_bottom_sheet_content** layout là một số view không liên quan tới Bottom Sheet. Bạn hoàn toàn có thể thay thế hoặc bỏ đi cũng được.
```
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.androidsample.BottomSheetActivity">

    <!-- include app bar -->
    <include layout="@layout/app_bar" />

    <!-- include main content -->
    <include layout="@layout/activity_bottom_sheet_content" />

    <!-- include bottom sheet -->
    <include layout="@layout/bottom_sheet" />
</android.support.design.widget.CoordinatorLayout>
```
Bây giờ sau khi bạn build app, ứng dụng của bạn sẽ có layout như bên dưới.
![](https://images.viblo.asia/cde70358-18c2-42a1-980b-cfbe5dd04cb9.gif)

**Set behavior và attributes gián tiếp thông qua code.**

Behavior và các attributes (thuôc tính) có thể được kiểm soát "động" thông qua code trong quá trình runtime.
```
// get the bottom sheet view
LinearLayout llBottomSheet = (LinearLayout) findViewById(R.id.bottom_sheet);

// init the bottom sheet behavior
BottomSheetBehavior bottomSheetBehavior = BottomSheetBehavior.from(llBottomSheet);

// change the state of the bottom sheet
bottomSheetBehavior.setState(BottomSheetBehavior.STATE_COLLAPSED);
bottomSheetBehavior.setState(BottomSheetBehavior.STATE_EXPANDED);
bottomSheetBehavior.setState(BottomSheetBehavior.STATE_HIDDEN);

// set the peek height
bottomSheetBehavior.setPeekHeight(340);

// set hideable or not
bottomSheetBehavior.setHideable(false);

// set callback for changes
bottomSheetBehavior.setBottomSheetCallback(new BottomSheetBehavior.BottomSheetCallback() {
    @Override
    public void onStateChanged(@NonNull View bottomSheet, int newState) {
        
    }

    @Override
    public void onSlide(@NonNull View bottomSheet, float slideOffset) {

    }
});
```
Thật đơn giản phải không. Như vậy là các bạn có thể biết cách sử dụng một trong component rất hay trong Google Material Design. Mình hi vọng nó sẽ hữu ích trong quá trình phát triển ứng dụng của các bạn.

Bài viết có tham khảo tại: https://medium.com/android-bits/android-bottom-sheet-30284293f066

**Thanks for reading.** :wink: