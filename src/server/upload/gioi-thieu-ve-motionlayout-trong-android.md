MotionLayout là một loại layout giúp bạn quản lý hiệu ứng chuyển động và hiệu ứng cho các widget trong ứng dụng của mình. MotionLayout là một phần của thư viện ConstraintLayout, có sẵn dưới dạng thư viện hỗ trợ và có thể tích hợp từ API 14.

![Hình 1: Ví dụ về MotionLayout](https://images.viblo.asia/07248539-bfbe-4fab-8138-0f30349233f7.gif)

MotionLayout thu hẹp khoảng cách giữa chuyển đổi bố cục (layout transitions) và xử lý chuyển động phức tạp, cung cấp sự kết hợp các tính năng giữa [property animation framework](https://developer.android.com/guide/topics/graphics/prop-animation), [TransitionManager](https://developer.android.com/training/transitions) và [CoordinatorLayout](https://developer.android.com/reference/androidx/coordinatorlayout/widget/CoordinatorLayout).

Ngoài việc mô tả chuyển tiếp giữa các layout, MotionLayout cũng cho phép bạn tạo hiệu ứng cho bất kỳ thuộc tính nào của layout. MotionLayout còn hỗ trợ keyframes, cho phép chuyển đổi tùy chỉnh để phù hợp với nhu cầu của bạn.

MotionLayout hoàn toàn mang tính khai báo, nghĩa là bạn có thể mô tả bất kỳ quá trình chuyển đổi nào trong XML, bất kể nó phức tạp đến mức nào.

**Lưu ý:** MotionLayout chỉ hoạt động với các phần tử con trực tiếp của nó. Nó không hỗ trợ layout lồng nhau hoặc chuyển đổi activity.

# I. Design considerations

MotionLayout được tạo ra nhằm mục đích di chuyển, thay đổi kích thước và tạo hoạt ảnh cho các phần tử giao diện mà người dùng tương tác, chẳng hạn như các nút bấm và thanh tiêu đề. Chuyển động trong ứng dụng của bạn không nên chỉ là một hiệu ứng đặc biệt không có ý nghĩa. Nó nên được sử dụng để giúp người dùng hiểu ứng dụng của bạn đang làm gì. Để tìm hiểu thêm thông tin về cách thiết kế ứng dụng của bạn với MotionLayout, hãy xem phần [Material Design](https://material.io/design/motion/).

# II. Getting started

Làm theo các bước sau để bắt đầu sử dụng MotionLayout trong ứng dụng của bạn.

1. **Thêm ConstraintLayout dependency**: Để sử dụng MotionLayout trong ứng dụng của bạn, nếu đang sử dụng AndroidX hãy thêm dòng dưới đây vào trong file build.gradle(app)

```xml
dependencies {
    implementation 'androidx.constraintlayout:constraintlayout:2.0.0-beta1'
}
```

Nếu bạn không sử dụng AndroidX, hãy thêm dòng dưới đây vào trong file build.gradle(app)
```xml
dependencies {
    implementation 'com.android.support.constraint:constraint-layout:2.0.0-beta1'
}
```

2. **Tạo file MotionLayout**: MotionLayout là một lớp con của ConstraintLayout, vì vậy bạn có thể chuyển đổi bất kỳ ConstraintLayout hiện có nào thành MotionLayout bằng cách thay thế tên lớp trong file layout resource của bạn, như được hiển thị trong các ví dụ dưới đây

```xml
<!-- before: ConstraintLayout -->
<androidx.constraintlayout.widget.ConstraintLayout .../>
<!-- after: MotionLayout -->
<androidx.constraintlayout.motion.widget.MotionLayout .../>
```

Đây là ví dụ một tệp MotionLayout đầy đủ có thể được sử dụng để tạo chuyển động trong hình 1:

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- activity_main.xml -->
<androidx.constraintlayout.motion.widget.MotionLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/motionLayout"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:layoutDescription="@xml/scene_01"
    tools:showPaths="true">

    <View
        android:id="@+id/button"
        android:layout_width="64dp"
        android:layout_height="64dp"
        android:background="@color/colorAccent"
        android:text="Button" />

</androidx.constraintlayout.motion.widget.MotionLayout>
```

3. **Tạo MotionScene**: Trong ví dụ MotionLayout trước, thuộc tính app: layoutDescription tham chiếu đến một MotionScene. MotionScene là một tệp tài nguyên XML chứa tất cả các mô tả chuyển động cho bố cục tương ứng. Để giữ thông tin bố cục tách biệt với mô tả chuyển động, mỗi MotionLayout tham chiếu đến một MotionScene riêng biệt. Lưu ý rằng các định nghĩa trong MotionScene được ưu tiên hơn bất kỳ định nghĩa nào tương tự trong MotionLayout.

Đây là một tệp MotionScene mẫu mô tả chuyển động ngang cơ bản trong hình 1:

```xml
<?xml version="1.0" encoding="utf-8"?>
<MotionScene xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:motion="http://schemas.android.com/apk/res-auto">

    <Transition
        motion:constraintSetStart="@+id/start"
        motion:constraintSetEnd="@+id/end"
        motion:duration="1000">
        <OnSwipe
            motion:touchAnchorId="@+id/button"
            motion:touchAnchorSide="right"
            motion:dragDirection="dragRight" />
    </Transition>

    <ConstraintSet android:id="@+id/start">
        <Constraint
            android:id="@+id/button"
            android:layout_width="64dp"
            android:layout_height="64dp"
            android:layout_marginStart="8dp"
            motion:layout_constraintBottom_toBottomOf="parent"
            motion:layout_constraintStart_toStartOf="parent"
            motion:layout_constraintTop_toTopOf="parent" />
    </ConstraintSet>

    <ConstraintSet android:id="@+id/end">
        <Constraint
            android:id="@+id/button"
            android:layout_width="64dp"
            android:layout_height="64dp"
            android:layout_marginEnd="8dp"
            motion:layout_constraintBottom_toBottomOf="parent"
            motion:layout_constraintEnd_toEndOf="parent"
            motion:layout_constraintTop_toTopOf="parent" />
    </ConstraintSet>

</MotionScene>
```

# III. Interpolated attributes

Trong file MotionScene, các phần tử ConstraintSet có thể chứa các thuộc tính bổ sung được nội suy trong quá trình chuyển đổi. Ngoài **position** và **bounds**, các thuộc tính sau được MotionLayout nội suy: 
* **alpha**
* **visibility**
* **elevation**
* **rotation, rotationX, rotationY**
* **translationX, translationY, translationZ**
* **scaleX, scaleY**

# IV. Custom attributes
Trong thẻ <Constraint>, bạn có thể sử dụng thuộc tính <CustomAttribute> để chỉ định chuyển đổi cho các thuộc tính không chỉ giới hạn là phải liên quan đến vị trí hay thuộc tính của View
```xml
<Constraint
    android:id="@+id/button" ...>
    <CustomAttribute
        motion:attributeName="backgroundColor"
        motion:customColorValue="#D81B60"/>
</Constraint>
```
    
<CustomAttribute> chứa hai thuộc tính của riêng nó:
* **motion:attributeName** là bắt buộc và phải khớp với các phương thức getter, setter của một đối tượng. Ví dụ: backgroundColor được hỗ trợ vì view của chúng ta có các phương thức getBackgroundColor() và setBackgroundColor().
* Thuộc tính còn lại bạn phải cung cấp dựa trên các giá trị cơ bản được hỗ trợ như:
    * **motion:customColorValue** cho màu sắc
    * **motion:customIntegerValue** cho số nguyên
    * **motion:customFloatValue** cho số thập phân
    * **motion:customStringValue** cho kiểu chuỗi
    * **motion:customDimension** cho dimensions
    * **motion:customBoolean** cho booleans
Lưu ý rằng khi chỉ định thuộc tính tùy chỉnh, bạn phải xác định giá trị điểm cuối trong cả phần tử <ConstraintSet> start và end.

![Hình 2: View thay đổi màu background khi chuyển động](https://images.viblo.asia/4ad9402e-1ad8-4089-84b4-1b0ef6ed8f5f.gif)

```xml
<ConstraintSet android:id="@+id/start">
    <Constraint
        android:id="@+id/button"
        android:layout_width="64dp"
        android:layout_height="64dp"
        android:layout_marginStart="8dp"
        motion:layout_constraintBottom_toBottomOf="parent"
        motion:layout_constraintStart_toStartOf="parent"
        motion:layout_constraintTop_toTopOf="parent">
        <CustomAttribute
            motion:attributeName="backgroundColor"
            motion:customColorValue="#D81B60" />
    </Constraint>
</ConstraintSet>

<ConstraintSet android:id="@+id/end">
    <Constraint
        android:id="@+id/button"
        android:layout_width="64dp"
        android:layout_height="64dp"
        android:layout_marginEnd="8dp"
        motion:layout_constraintBottom_toBottomOf="parent"
        motion:layout_constraintEnd_toEndOf="parent"
        motion:layout_constraintTop_toTopOf="parent">
        <CustomAttribute
            motion:attributeName="backgroundColor"
            motion:customColorValue="#9999FF" />
    </Constraint>
</ConstraintSet>
```
# V. Additional MotionLayout attributes
Ngoài các thuộc tính trong ví dụ trên, **MotionLayout** còn sở hữu những thuộc tính khác mà bạn có thể muốn sử dụng:
* **app: applyMotionScene = "boolean"** cho biết có nên áp dụng MotionScene hay không. Giá trị mặc định cho thuộc tính này là true.
* **app: showPaths = "boolean"** cho biết có hiển thị các đường chuyển động khi chuyển động đang chạy hay không. Giá trị mặc định cho thuộc tính này là false.
* ** app: process = "float"** cho phép bạn chỉ định chính xác tiến trình chuyển đổi. Bạn có thể sử dụng bất kỳ giá trị nào nằm trong khoảng từ 0 (bắt đầu chuyển đổi) đến 1 (kết thúc chuyển đổi).
* **app: currentState = "reference"** cho phép bạn chỉ định một ConstraintSet cụ thể.
* **app: motionDebug** cho phép bạn hiển thị thông tin gỡ lỗi bổ sung về chuyển động. Các giá trị có thể là "SHOW_PROGRESS", "SHOW_PATH" hoặc "SHOW_ALL".
    
#  VI. Additional resources
Nếu muốn tìm hiểu thêm về **MotionLayout** bạn có thể tham khảo ở link dưới đây:
* [Using MotionLayout to Animate Android Apps (codelab)](https://codelabs.developers.google.com/codelabs/motion-layout/)
* [MotionLayout examples](https://developer.android.com/training/constraint-layout/motionlayout/examples)
* [MotionLayout / ConstraintLayout Samples (GitHub)](https://github.com/android/views-widgets-samples/tree/master/ConstraintLayoutExamples)
* [Introduction to MotionLayout (part I)](https://medium.com/google-developers/introduction-to-motionlayout-part-i-29208674b10d)
* [Introduction to MotionLayout (part II)](https://medium.com/google-developers/introduction-to-motionlayout-part-ii-a31acc084f59)
* [Introduction to MotionLayout (part III)](https://medium.com/google-developers/introduction-to-motionlayout-part-iii-47cd64d51a5)
* [Introduction to MotionLayout (part IV)](https://medium.com/google-developers/defining-motion-paths-in-motionlayout-6095b874d37)

Bài viết này được tham khảo từ https://developer.android.com/training/constraint-layout/motionlayout#androidx