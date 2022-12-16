# 1. Giới thiệu Animation

Bắt đầu được hỗ trợ từ android 2.3 đây là một mốc đánh dấu sự thay đổi lớn vì đã đem lại màu sắc sự sinh động hơn trong ứng dụng android

Các loại animation cơ bản trong android gồm các  thành phần con trong đó như :
* Scale animation: làm cho một view nhỏ hơn hoặc lớn hơn dọc theo trục x hoặc trục y. Ta có thể chỉ định animation diễn ra xung quanh một điểm.
* Rotate animation: quay một view quanh một điểm chốt theo một góc quay xác định.
* Translate animation: tịnh tiến một view dọc theo trục x hoặc trục y.
* Alpha animation: thay đổi độ trong suốt của một view.
Android Animation được sử dụng để cung cấp cho giao diện người dùng một giao diện phong phú. 

Ảnh động trong ứng dụng Android có thể được thực hiện thông qua mã XML hoặc Android. Trong hướng dẫn animation này, mình sẽ sử dụng mã XML để thêm hình ảnh động vào ứng dụng.

# 2. Các ví dụ cơ bản

Mình tạo ra một thư mục tài nguyên dưới tên thư mục res anim để giữ tất cả các file xml chứa logic animation. Sau đây là một tệp xml mẫu hiển thị logic mã animation Android.

**sample_animation.xml**
```
<?xml version="1.0" encoding="utf-8"?>
<scale xmlns:android="http://schemas.android.com/apk/res/android"
  android:interpolator="@android:anim/accelerate_decelerate_interpolator"
  android:duration="300"
  android:fillAfter="true"
  android:fromXScale="0.0"
  android:fromYScale="0.0"
  android:toXScale="1.0"
  android:toYScale="1.0" />
```
* android: interpolator : Đây là tốc độ thay đổi trong aniamtion. Chúng ta có thể định nghĩa các bộ nội suy của riêng mình bằng cách sử dụng thời gian làm ràng buộc. Trong mã xml ở trên, một bộ nội suy sẵn có được gán
* android: duration : Thời lượng của animation sẽ hoàn thành. Nó là 300ms ở đây. Đây thường là thời lượng lý tưởng để hiển thị quá trình chuyển đổi trên màn hình.
Bắt đầu và kết thúc của hình ảnh động được thiết lập bằng cách sử dụng:
```
android:fromTRANSFORMATION
android:toTRANSFORMATION
```
* TRANSFORMATION : là phép biến đổi mà chúng ta muốn chỉ định. Trong trường hợp này mình bắt đầu với thang đo x và y là 0 và kết thúc với thang đo x và y là 1
* android: fillAfter : property chỉ định xem chế độ xem sẽ hiển thị hay ẩn ở cuối animation. Mình đã thiết lập nó hiển thị trong mã trên. Nếu nó được đặt thành false, phần tử sẽ chuyển sang trạng thái trước đó sau hình động
* android: start Offerset : Đây là thời gian chờ đợi trước khi một hình ảnh động bắt đầu. Thuộc tính này chủ yếu được sử dụng để thực hiện nhiều hình ảnh động theo cách liên tiếp
* android: repeatMode : Điều này rất hữu ích khi bạn muốn hoạt hình được lặp lại
* android: repeatCount : Điều này xác định số lần lặp lại trên animation. Nếu chúng ta đặt giá trị này thành vô hạn thì hoạt ảnh sẽ lặp lại vô hạn lần

Nào chúng ta cùng bắt đầu vào các ví dụ cụ thể:

## 2.1 Hiệu ứng rõ dần

**fade_in.xml**
```
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:fillAfter="true" >

    <alpha
        android:duration="1000"
        android:fromAlpha="0.0"
        android:interpolator="@android:anim/accelerate_interpolator"
        android:toAlpha="1.0" />

</set>
```
Ở đây alpha tham chiếu độ mờ của một đối tượng. Một đối tượng có giá trị alpha thấp hơn trong suốt hơn, trong khi một đối tượng có giá trị alpha cao hơn thì rõ hơn. Làm mờ dần trong animation không có gì ngoài việc tăng giá trị alpha từ 0 lên 1.

## 2.2 Hiệu ứng mờ dần

**fade_out.xml**
```
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:fillAfter="true" >

    <alpha
        android:duration="1000"
        android:fromAlpha="1.0"
        android:interpolator="@android:anim/accelerate_interpolator"
        android:toAlpha="0.0" />

</set>
```
Làm mờ dần hoàn toàn ngược lại với rõ dần, trong đó chúng ta cần giảm giá trị alpha từ 1 xuống 0.

## 2.3 Hiệu ứng nhấp nháy

**blink.xml**
```
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <alpha android:fromAlpha="0.0"
        android:toAlpha="1.0"
        android:interpolator="@android:anim/accelerate_interpolator"
        android:duration="600"
        android:repeatMode="reverse"
        android:repeatCount="infinite"/>
</set>
```
Ở đây, fade in và fade out được thực hiện vô hạn ở chế độ đảo ngược mỗi lần.

## 2.4 Hiệu ứng phóng to

**zoom_in.xml**
```
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:fillAfter="true" >

    <scale
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:duration="1000"
        android:fromXScale="1"
        android:fromYScale="1"
        android:pivotX="50%"
        android:pivotY="50%"
        android:toXScale="3"
        android:toYScale="3" >
    </scale>

</set>
```
## 2.5 Hiệu ứng thu nhỏ

**zoom_out.xml**

```
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:fillAfter="true" >

    <scale
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:duration="1000"
        android:fromXScale="1.0"
        android:fromYScale="1.0"
        android:pivotX="50%"
        android:pivotY="50%"
        android:toXScale="0.5"
        android:toYScale="0.5" >
    </scale>

</set>
```
## 2.6 Hiệu ứng xoay

**rotate.xml**
```
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <rotate android:fromDegrees="0"
        android:toDegrees="360"
        android:pivotX="50%"
        android:pivotY="50%"
        android:duration="600"
        android:repeatMode="restart"
        android:repeatCount="infinite"
        android:interpolator="@android:anim/cycle_interpolator"/>

</set>
```
Thẻ from / toDegrees được sử dụng ở đây để chỉ định độ và sử dụng bộ nội suy theo chu kỳ.

## 2.7 Hiệu ứng di chuyển 

**move.xml**
```
<set
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:interpolator="@android:anim/linear_interpolator"
    android:fillAfter="true">

   <translate
        android:fromXDelta="0%p"
        android:toXDelta="75%p"
        android:duration="800" />
</set>
```
## 2.8 Hiệu ứng trượt lên

**slide_up.xml**
```
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:fillAfter="true" >

    <scale
        android:duration="500"
        android:fromXScale="1.0"
        android:fromYScale="1.0"
        android:interpolator="@android:anim/linear_interpolator"
        android:toXScale="1.0"
        android:toYScale="0.0" />

</set>
```
Điều đó đạt được bằng cách đặt android: fromYScale =1.0 và android: toYScale =0.0 ″ bên trong thẻ tỷ lệ .

## 2.9 Hiệu ứng trượt xuống

**slide_down.xm**
```
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:fillAfter="true">

    <scale
        android:duration="500"
        android:fromXScale="1.0"
        android:fromYScale="0.0"
        android:toXScale="1.0"
        android:toYScale="1.0" />

</set>
```
Điều này chỉ ngược lại với **slide_up.xml**

## 2.10 Hiệu ứng rung lên

**bounce.xml**
```
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:fillAfter="true"
    android:interpolator="@android:anim/bounce_interpolator">

    <scale
        android:duration="500"
        android:fromXScale="1.0"
        android:fromYScale="0.0"
        android:toXScale="1.0"
        android:toYScale="1.0" />

</set>
```
## 2.11 Hiệu ứng tuần tự

**sequential.xml**

```
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:fillAfter="true"
    android:interpolator="@android:anim/linear_interpolator" >

  
    <!-- Move -->
    <translate
        android:duration="800"
        android:fillAfter="true"
        android:fromXDelta="0%p"
        android:startOffset="300"
        android:toXDelta="75%p" />
    <translate
        android:duration="800"
        android:fillAfter="true"
        android:fromYDelta="0%p"
        android:startOffset="1100"
        android:toYDelta="70%p" />
    <translate
        android:duration="800"
        android:fillAfter="true"
        android:fromXDelta="0%p"
        android:startOffset="1900"
        android:toXDelta="-75%p" />
    <translate
        android:duration="800"
        android:fillAfter="true"
        android:fromYDelta="0%p"
        android:startOffset="2700"
        android:toYDelta="-70%p" />

    <!-- Rotate 360 degrees -->
    <rotate
        android:duration="1000"
        android:fromDegrees="0"
        android:interpolator="@android:anim/cycle_interpolator"
        android:pivotX="50%"
        android:pivotY="50%"
        android:startOffset="3800"
        android:repeatCount="infinite"
        android:repeatMode="restart"
        android:toDegrees="360" />

</set>
```
Ở đây, android : startPackset được sử dụng từ các hiệu ứng chuyển tiếp để giữ cho chúng tuần tự
## 2.12 Hiệu ứng cùng nhau

**together.xml**

```
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:fillAfter="true"
    android:interpolator="@android:anim/linear_interpolator" >

    
    <!-- Move -->
    <scale
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:duration="4000"
        android:fromXScale="1"
        android:fromYScale="1"
        android:pivotX="50%"
        android:pivotY="50%"
        android:toXScale="4"
        android:toYScale="4" >
    </scale>

    <!-- Rotate 180 degrees -->
    <rotate
        android:duration="500"
        android:fromDegrees="0"
        android:pivotX="50%"
        android:pivotY="50%"
        android:repeatCount="infinite"
        android:repeatMode="restart"
        android:toDegrees="360" />

</set>
```
Ở đây android : startOffsetđược gỡ bỏ để cho chúng xảy ra đồng thời.

Và đây là màn hình Main để ta chạy các hiệu ứng, ở đây mình ví dụ hiệu ứng FadeIn các hiệu ứng khác tương tự 

**activity_main.xml**

```
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent" >

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <Button
                android:id="@+id/btnFadeIn"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_margin="5dp"
                android:text="Fade In" />

        <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textAppearance="?android:attr/textAppearanceMedium"
                android:text="Fade In"
                android:id="@+id/txt_fade_in"
            android:layout_alignBottom="@+id/btnFadeIn"
            android:layout_alignLeft="@+id/txt_fade_out"
            android:layout_alignStart="@+id/txt_fade_out" />

    </RelativeLayout>

</ScrollView>
```

Sau đó chúng ta chỉ việc bắt sự kiện click vào các button và sử lý các animation mong muốn
```
Animation animation;
animation = AnimationUtils.loadAnimation(getApplicationContext(),
                R.anim.sample_animation);
sampleTextView.startAnimation(animation);
```
Kết quả

![](https://images.viblo.asia/83cd6802-30f9-41db-9d77-4e6aaa25e233.gif)
# 3. Tổng kết
Animation hiện nay vẫn còn khá ít ứng dụng thực sự đầu tư và chăm chút về hiệu ứng cho nó, nhất là những ứng dụng phục vụ mục đích chuyên biệt. Nhưng nếu chỉ cần thêm những hiệu ứng nhỏ cũng có thể khiến cho ứng dụng của chúng ta sinh động hơn. Và đó cũng là mục đích mà theo mình nghĩ là google đang hướng mọi lập trình viên thực hiện

Đây là [link tải demo](https://www.journaldev.com/wp-content/uploads/android/Animations.zip)

Tham khảo
https://www.journaldev.com/9481/android-animation-example