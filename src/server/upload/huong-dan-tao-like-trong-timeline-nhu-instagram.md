Chào các bạn, lâu rùi mình ko có bài nào về android, hôm xin phép chia sẻ vs anh em về chủ đề mà có thể rất nhiều anh em làm app android gặp phải, có những anh em có thể đã biết những có thể vẫn còn những anh em chưa biết và việc xử lý quả thực gặp khá nhiều khó khăn. Đó là 'Like' với StateListAnimators.
Bản thân android cũng đã cung cấp cho các bạn cách để thay đổi các trạng thái với icon hay màu sắc khi 1 button được click.

**StateListDrawable**

- Đây là công cụ hữu ích được cung cấp bởi Android, nó được phát triển dựa trên sự kế thừa của Drawable. Nó được dùng theo kiểu cách là đổi chỗ những cái đã được định nghĩa trong drawable theo các trạng thái.
Các trạng thái phổ biến như: state_checked, state_pressed, state_enabled, state_focussed. Thường thì với mỗi trạng thái sẽ thay đổi các icon hay màu sắc, hay màu của border.
- Giờ chúng ta hãy cùng xem đoạn code sau nhé:

```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:paddingTop="8dp"
    android:paddingBottom="8dp"
    xmlns:tools="http://schemas.android.com/tools">
    ...
        <CheckBox
        android:id="@+id/likeIcon"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintLeft_toLeftOf="parent"
        android:layout_marginStart="16dp"
        android:layout_marginTop="8dp"
        android:clickable="true"
        android:button="@null"
        android:stateListAnimator="@animator/scale"
        android:checked="false"
        app:layout_constraintTop_toBottomOf="@+id/image"
        android:background="@drawable/like_icon"
        android:focusable="true" />
        ...
   </android.support.constraint.ConstraintLayout>****
```
các bạn để y 3 dòng sau trong đoạn code trên:
```
    android:button="@null"        
    android:checked="false"
    android:background="@drawable/like_icon"
```
ý nghĩa là nõ sẽ không sử dụng như 1 button mà sẽ là các trạng thái của checkbox, trạng thái của nó phụ thuộc vào giá trị của `android:checked="false"`
bạn để ý, background được set `android:background="@drawable/like_icon"`, ở đây, like_icon chính là file xml, nó chính là StateListDrawable, cái mà chứa các giá trị thay đổi tương ứng với các state.
```
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">

    <item android:state_checked="true" android:drawable="@drawable/ic_thumb_up_red_24dp"/>
    <item android:drawable="@drawable/ic_thumb_up_black_24dp"/>

</selector>
```
với mỗi trạng thái được check hay ko, sẽ có 1 icon tương ứng được lấy ra từ trong drawable.

Về các icon trong drawable, bạn cũng có thể tìm nó trong android studio bằng cách sau:
File-> New -> Vector Asset và ở đây bạn có thể chọn icon nào bạn muốn.

![](https://images.viblo.asia/5dc1650d-0af7-45fe-b41f-ce9ec2384a24.png)

Ở đây mình sẽ giải thích tiếp tại sao chúng ta sử dụng checkbox mà phông phải button, hay image thậm chí ImageButton.
Điều dễ hiểu với checkbox nó sử dụng `Checkable` interface được định nghĩa bởi android. Ngoài checkbox còn có CheckedTextView, CompoundButton, RadioButton, Switch, ToggleButton cũng dùng chung cơ chế này.

**StateListAnimator**

Thằng này về cơ chế của nó cũng giống StateListDrawable. Nhưng lúc này trong `<selector>` có thể tạo ra các animation khách nhau tương ứng với mỗi trạng thái.

```
<CheckBox        
    android:id="@+id/likeIcon"   
    .....
    .....
    android:button="@null"        
    android:checked="false"
    android:background="@drawable/like_icon"
    android:stateListAnimator="@animator/scale"/>
```

trong đoạn code trên các bạn có thể thấy: `android:stateListAnimator="@animator/scale"` đây chính là cách mà chúng ta làm animation sử dụng stateListAnimator của android. Trong res chúng ta bổ sung thêm animator/scales.xml. 

```
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:state_checked="true">
        <set xmlns:android="http://schemas.android.com/apk/res/android">
            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="scaleX"
                android:valueTo="1.525"
                android:valueType="floatType" />
            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="scaleY"
                android:valueTo="1.525"
                android:valueType="floatType" />
            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="translationZ"
                android:valueTo="4dp"
                android:valueType="floatType" />

            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="scaleX"
                android:valueTo="1.0"
                android:startOffset="@android:integer/config_shortAnimTime"
                android:valueType="floatType" />
            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="scaleY"
                android:startOffset="@android:integer/config_shortAnimTime"
                android:valueTo="1.0"
                android:valueType="floatType" />
            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="translationZ"
                android:startOffset="@android:integer/config_shortAnimTime"
                android:valueTo="0dp"
                android:valueType="floatType" />

        </set>

    </item>

    <item>
        <set>
            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="scaleX"
                android:valueTo="1.525"
                android:valueType="floatType" />
            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="scaleY"
                android:valueTo="1.525"
                android:valueType="floatType" />
            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="translationZ"
                android:valueTo="4dp"
                android:valueType="floatType" />

            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="scaleX"
                android:valueTo="1.0"
                android:startOffset="@android:integer/config_shortAnimTime"
                android:valueType="floatType" />
            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="scaleY"
                android:startOffset="@android:integer/config_shortAnimTime"
                android:valueTo="1.0"
                android:valueType="floatType" />
            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="translationZ"
                android:startOffset="@android:integer/config_shortAnimTime"
                android:valueTo="0dp"
                android:valueType="floatType" />
        </set>
    </item>
</selector>
```
với đoạn code trên thật là dài dòng, nhưng dễ hiểu thôi chỉ là nó chia 2 trạng thái checked và unchecked. Trong mỗi 1 objectAnimator có các giá trị `android:propertyName="scaleX"  android:valueTo="1.525"` thay đổi, đây chính là các giá trị scale theo X hay Y. Các bạn cũng có thể để giá trị này y hệt như bản gốc khi xét trong tất các objectAnimator là `android:valueTo="1.0"`.

Chúc các bạn sử dụng hiệu quả vào công việc nhé. thanks!

bài viêt được dịch từ [Creating an Instagram “Like” Animation With StateListAnimators](https://android.jlelse.eu/using-statelistanimators-to-create-instagram-like-animation-db2676c9391)