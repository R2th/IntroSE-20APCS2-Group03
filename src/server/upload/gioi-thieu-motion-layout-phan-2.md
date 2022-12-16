Trong phần 2 này  chúng ta sẽ tiếp tục MotionLayout qua một vài example, giới thiệu về custom attribute, image operations và keyframes.
## Example 3: Custom attribute
Trong [phần 1](https://viblo.asia/p/gioi-thieu-motionlayout-maGK7jEa5j2) chúng ta đã tạo MotionLayout với `MotionScene`. Chúng ta có thể lợi dụng điều này để chỉ định transition trên các thuộc tính không liên quan đến vị trí.
![](https://cdn-images-1.medium.com/max/800/1*J4wdLZ8zoaTsQ8f6oC3SMA.png)
Thật vây, ban đầu `ConstraintSet` chỉ đóng gói trong layout rules, nhưng để animation phong phú chúng ta cần transition những thứ khác (ví dụ như thay đổi background color). Trong CpnstraintLayout 2.0, `ConstranitSet` có thể lưu trữ custom attribute states. Giả sử chúng ta muốn chuyển động sau đó thay đổi background color của View:
![enter image description here](https://cdn-images-1.medium.com/max/800/1*fouJJzG4fuNo9Ek9F1LloA.gif)

Trước đây, bạn sẽ phải xử lý điều này trong code. Bây giờ bạn có thể thay thế bằng cách chỉ định các attribute trực tiếp trong XML: 
```
<Constraint
    android:id="@+id/button" ...>
    <CustomAttribute
        motion:attributeName="backgroundColor"
        motion:customColorValue="#D81B60"/>
</Constraint>
```
Dưới đây là code thay đổi MotionScene để thực hiện animation bên trên:
```
<?xml version="1.0" encoding="utf-8"?>
<MotionScene xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:motion="http://schemas.android.com/apk/res-auto">

    <Transition
        motion:constraintSetEnd="@+id/end"
        motion:constraintSetStart="@+id/start"
        motion:duration="1000"
        motion:interpolator="linear">
        <OnSwipe
            motion:dragDirection="dragRight"
            motion:touchAnchorId="@+id/button"
            motion:touchAnchorSide="right" />
    </Transition>

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

</MotionScene>
```
`CustomAttribute` là được chỉ định với attributeName, cần phải khớp với các phương thức getter/setter của 1 object sao cho: 
-   **getter**:  `getName`  (vd: getBackgroundColor)
-   **setter**:  `setName`  (vd:. setBackgroundColor)

Nhứng loại giá trị cũng cần được chỉ định:
-   `customColorValue`
-   `customIntegerValue`
-   `customFloatValue`
-   `customStringValue`
-   `customDimension`
-   `customBoolean`

Cuối cùng, khi định nghĩa 1 custom attribute, bạn cần xác định ngày cả khi bắt đầu và kết thúc ConstraintSet.

## Example 04 : ImageFilterView (1/2)
Khi thực hiện các transition phức tạp, thường cần phải thực hiện một số thao tác trên Image và animation với chúng. ConstraintLayout 2.0 có class tiện ích nhỏ là ImageFilterView ( một subclass của AppCompatImageView) để dễ dàng làm việc với Image.
Chúng ta sẽ là ví dụ đơn giản là di chuyển và chuyển đổi giữa 2 image:![](https://cdn-images-1.medium.com/max/800/1*13RY4qzBIl6PNYWYSKUXMw.gif)
Đầu tiên chúng ta sẽ tạo MotionLayout file voiws Image:
```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.motion.MotionLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/motionLayout"
    app:layoutDescription="@xml/scene_04"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <android.support.constraint.utils.ImageFilterView
        android:id="@+id/image"
        android:background="@color/colorAccent"
        android:src="@drawable/roard"
        app:altSrc="@drawable/hoford"
        android:layout_width="64dp"
        android:layout_height="64dp"/>

</android.support.constraint.motion.MotionLayout>
```
Sự khác nhau chính giữa ImageView và ImageFilterView là ở `altSrc` attribute:

```
<android.support.constraint.image.ImageFilterView
    android:id="@+id/image"
	...
    android:src="@drawable/roard"
    app:altSrc="@drawable/hoford"/>
```
 MotionScene file sẽ apply custom attribute lên thuộc tính `crossfade`:
```
<?xml version="1.0" encoding="utf-8"?>
<MotionScene xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:motion="http://schemas.android.com/apk/res-auto">

    <Transition
        motion:constraintSetEnd="@+id/end"
        motion:constraintSetStart="@+id/start"
        motion:duration="1000"
        motion:interpolator="linear">
        <OnSwipe
            motion:dragDirection="dragRight"
            motion:touchAnchorId="@+id/image"
            motion:touchAnchorSide="right" />
    </Transition>

    <ConstraintSet android:id="@+id/start">
        <Constraint
            android:id="@+id/image"
            android:layout_width="100dp"
            android:layout_height="100dp"
            android:layout_marginStart="8dp"
            motion:layout_constraintBottom_toBottomOf="parent"
            motion:layout_constraintStart_toStartOf="parent"
            motion:layout_constraintTop_toTopOf="parent">
            <CustomAttribute
                motion:attributeName="crossfade"
                motion:customFloatValue="0" />
        </Constraint>
    </ConstraintSet>

    <ConstraintSet android:id="@+id/end">
        <Constraint
            android:id="@+id/image"
            android:layout_width="100dp"
            android:layout_height="100dp"
            android:layout_marginEnd="8dp"
            motion:layout_constraintBottom_toBottomOf="parent"
            motion:layout_constraintEnd_toEndOf="parent"
            motion:layout_constraintTop_toTopOf="parent">
            <CustomAttribute
                motion:attributeName="crossfade"
                motion:customFloatValue="1" />
        </Constraint>
    </ConstraintSet>

</MotionScene>
```

## Example 05 : ImageFilterView (2/2)
ImageFilterView còn cung cấp nhiều tính năng hơn:
> **saturation** : 0 = grayscale, 1 = original, 2 = hyper saturated
> **contrast** : 1 = unchanged, 0 = gray, 2 = high contrast
> **warmth** : 1 = neutral, 2 = warm (red tint), 0.5 = cold (blue tint)
> **crossfade**  (with  `app:altSrc`)

Dưới đây là 1 ví dụ khác cho thấy animation thay đổi độ bão hoà của Image:
![enter image description here](https://cdn-images-1.medium.com/max/800/1*aWlv-iMrfhBTyRwS_hA3RA.gif)

Chỉ định độ bão hòa có thể thực hiện đơn giản bằng cách sử cụng custom attribute:
```
<CustomAttribute
    motion:attributeName="saturation"
    motion:customFloatValue="1" />
```
Ở đây là code MotionLayout sử dụng trong ví dụ này:
```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.motion.MotionLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/motionLayout"
    app:layoutDescription="@xml/scene_05"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <android.support.constraint.utils.ImageFilterView
        android:id="@+id/image"
        android:src="@drawable/sunset2"
        android:scaleType="centerCrop"
        android:layout_width="match_parent"
        android:layout_height="300dp" />

</android.support.constraint.motion.MotionLayout>
```
Và đây là scene file tương ứng: 
```
<?xml version="1.0" encoding="utf-8"?>
<MotionScene
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:motion="http://schemas.android.com/apk/res-auto">

    <Transition
        motion:constraintSetStart="@+id/start"
        motion:constraintSetEnd="@+id/end"
        motion:duration="1000">
        <OnSwipe
            motion:touchAnchorId="@+id/image"
            motion:touchAnchorSide="top"
            motion:dragDirection="dragUp" />
    </Transition>

    <ConstraintSet android:id="@+id/start">
        <Constraint
            android:id="@+id/image"
            android:layout_width="match_parent"
            android:layout_height="300dp"
            motion:layout_constraintStart_toStartOf="parent"
            motion:layout_constraintTop_toTopOf="parent">
            <CustomAttribute
                motion:attributeName="saturation"
                motion:customFloatValue="1" />
        </Constraint>
    </ConstraintSet>

    <ConstraintSet android:id="@+id/end">
        <Constraint
            android:id="@+id/image"
            android:layout_width="match_parent"
            android:layout_height="300dp"
            motion:layout_constraintBottom_toBottomOf="parent"
            motion:layout_constraintEnd_toEndOf="parent">
            <CustomAttribute
                motion:attributeName="saturation"
                motion:customFloatValue="0" />
        </Constraint>
    </ConstraintSet>

</MotionScene>
```
# Keyframes
Ý tưởng chung cho MotionLayout là "resting states" được triển khai dưới dạng ConstraintLayout. Bằng cách này chúng ta sẽ biết được layouts kết quả sẽ thích nghi chính thức với các screen size khác nhau: bản chất, MotionLayout sẽ hoạt động giống như 1 ConstraintLayout điển hình.
Trong một số trường hợp, bạn có thể muốn có trạng thái trung gian- trạng thái đi qua nhưng không phải trạng thái ở trong. Bạn có thể chỉ định nhiều hớn 2 ConstraintSets nhưng cách tiếp cận tốt hơn đó chính là sử dụng Keyframs
> Keyframes can be applied to position or to attribute values; they basically let you specify a change at a point in time during the transition.
Ví dụ như: ở 25% của transition bạn muốn widget là màu đỏ, nhưng 50% của transition bạn lại muốn widget đi lên.

## Example 06 : Keyframe (1/2), position
Có một số cách : `pathRelative`, `deltaRelative`, `parentRelative` bạn có thể thiết lập vị trí keyframes (KeyPosition) mà chúng ta có thể sẽ trình trong phần sau:
![](https://cdn-images-1.medium.com/max/800/1*CT5m53LvQNC_viFZwNRx-w.png)
Giới thiệu nhanh về vị trí keyframes, dưới đây đây cách bạn sẽ chỉ định vị trí trung gian xảy ra ở vị trí 50% của tổng transition và vị trí 25% của screen:
```
<Transition ...>
    <KeyFrameSet>
        <KeyPosition
            motion:keyPositionType="parentRelative"
            motion:percentY="0.25"
            motion:framePosition="50"
            motion:target="@+id/button"/>
    </KeyFrameSet>
</Transition>
```
Kết quả motion sẽ như:
![](https://cdn-images-1.medium.com/max/800/1*jOmDbVPaNMiqZqCb9W6I3w.gif)

Như thường lệ, MotionLayout file khá đơn giản:
```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.motion.MotionLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/motionLayout"
    app:layoutDescription="@xml/scene_06"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <View
        android:id="@+id/button"
        android:background="@color/colorAccent"
        android:layout_width="64dp"
        android:layout_height="64dp" />

</android.support.constraint.motion.MotionLayout>
```
MotionScene file rất giống với tệp trước đó bạn đã thấy, chỉ thêm `KeyPosition`:
```
<?xml version="1.0" encoding="utf-8"?>
<MotionScene
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:motion="http://schemas.android.com/apk/res-auto">

    <Transition
        motion:constraintSetStart="@+id/start"
        motion:constraintSetEnd="@+id/end"
        motion:duration="1000"
        motion:interpolator="linear">
        <OnSwipe
            motion:touchAnchorId="@+id/button"
            motion:touchAnchorSide="right"
            motion:dragDirection="dragRight" />

        <KeyFrameSet>
            <KeyPosition
                motion:keyPositionType="parentRelative"
                motion:percentY="0.25"
                motion:framePosition="50"
                motion:target="@+id/button"/>
        </KeyFrameSet>
    </Transition>

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
                motion:customColorValue="#D81B60"/>
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
                motion:customColorValue="#9999FF"/>
        </Constraint>
    </ConstraintSet>

</MotionScene>
```
## Example 07 : Keyframe (2/2), attribute
Theo cách tương tự vị trí keyframes, bạn có thể chỉ định 1 attribute value tại một điểm cụ thể trong quá trình transition bằng cách sử dụng `KeyAttribute`.![](https://cdn-images-1.medium.com/max/800/1*MHp3ZvHe7ZzHTntS5SurlQ.png)

Ví dụ, chúng ta muốn xác chỉ định scale và rotation của View mà chúng ta đang thao tác ở cùng 1 vị trí 50% của screen trong quá trình transition:
![enter image description here](https://cdn-images-1.medium.com/max/800/1*tBmw-3uA2IcXZCtRBmMarA.gif)
Điều này có thể đạt được bàng cách thêm `KeyAttribute` trong `KeyFrameSet`:
```
<KeyFrameSet>
    <KeyAttribute
        android:scaleX="2"
        android:scaleY="2"
        android:rotation="-45"
        motion:framePosition="50"
        motion:target="@id/button" />
</KeyFrameSet>
```
MotionLayout file tương như như ví dụ trước, chỉ có khác là file MotionScene có thêm thuộc tính `KeyAttribute`:
```
<?xml version="1.0" encoding="utf-8"?>
<MotionScene
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:motion="http://schemas.android.com/apk/res-auto">

    <Transition
        motion:constraintSetStart="@+id/start"
        motion:constraintSetEnd="@+id/end"
        motion:duration="1000"
        motion:interpolator="linear">
        <OnSwipe
            motion:touchAnchorId="@+id/button"
            motion:touchAnchorSide="right"
            motion:dragDirection="dragRight" />

        <KeyFrameSet>
            <KeyAttribute
                android:scaleX="2"
                android:scaleY="2"
                android:rotation="-45"
                motion:framePosition="50"
                motion:target="@id/button" />
            <KeyPosition
                motion:keyPositionType="screenRelative"
                motion:percentY="0.2"
                motion:framePosition="50"
                motion:target="@id/button"/>
        </KeyFrameSet>
    </Transition>

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
                motion:customColorValue="#D81B60"/>
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
                motion:customColorValue="#9999FF"/>
        </Constraint>
    </ConstraintSet>

</MotionScene>
```