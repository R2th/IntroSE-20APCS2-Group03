Trong API 21, Android đã phát hành ra nhiều tính năng hữu ích cho việc thiết kế app, hầu hết tập trung vào các tính năng cho việc design như colors, transition animation; một vài widgets như FAB, card view, recycler view,... Hôm nay, chúng ta sẽ tìm hiểu về một tính năng mà ít được thảo luận nhưng rất phổ biến và cần thiết cho một người lập trình android - **VectorDrawable** và **AnimatedVectorDrawable**.

## 1. VectorDrawable
Vector drawble cho phép bạn thay thế nhiều file hình ảnh png với chỉ một đồ họa vector được tạo bằng XML. Thông thường bạn phải tạo ra các hình ảnh có các kích thước khác nhau để tương thích với từng màn hình của thiết bị như mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi; nhưng với ảnh vector, bạn chỉ cần tạo ra một tập tin là có thể áp dụng cho mọi màn hình.
VectorDrawable là một đồ họa vector được định nghĩa trong file XML gồm một tập các điểm, đường thẳng, đường cong cùng với các thông tin khác như màu sắc. Điểm mạnh chính của ảnh vector đó là khả năng co giãn hình ảnh (scalability). Nó có thể co giãn theo nhiều kích thước khác nhau mà không ảnh hưởng đến chất lượng hình ảnh.

Một ví dụ VectorDrawable:

```
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    <!-- intrinsic size of the drawable -->
    android:height="24dp"
    android:width="24dp"
    <!-- size of the virtual canvas -->
    android:viewportWidth="24.0"
    android:viewportHeight="24.0">
   <group
         android:name="rotationGroup"
         android:pivotX="10.0"
         android:pivotY="10.0"
         android:rotation="15.0" >
      <path
        android:name="vect"
        android:fillColor="#FF000000"
        android:pathData="M15.67,4H14V2h-4v2H8.33C7.6,4 7,4.6 7,5.33V9h4.93L13,7v2h4V5.33C17,4.6 16.4,4 15.67,4z"
        android:fillAlpha=".3"/>
      <path
        android:name="draw"
        android:fillColor="#FF000000"
        android:pathData="M13,12.5h2L11,20v-5.5H9L11.93,9H7v11.67C7,21.4 7.6,22 8.33,22h7.33c0.74,0 1.34,-0.6 1.34,-1.33V9h-4v3.5z"/>
   </group>
</vector>
```

Và đây là kết quả:

![](https://images.viblo.asia/9d194042-49bf-43ab-8a56-af9f0139552a.png)

## 2. Animation
Nếu bạn muốn ứng dụng của mình trở nên sinh động , hấp dẫn người sử dụng thì Animation là một tính năng rất phù hợp. Các hiệu ứng như FadeIn, FadeOut, scale, transition,... trong Animation có thể giúp cho app của bạn trở nên lộng lấy và kích thích người dùng. Thông thường, bạn có 3 cách để tạo ra một animation trong Android:
* Với những animation đơn giản như scaling, fading, moving,... bạn có thể sử dụng **View property animation** được tích hợp sẵn trong Android Studio.
* Nếu bạn muốn một animation phức tạp hơn, đặc biệt hơn theo ý muốn của bạn thì bạn có thể custom cho bản thân một animation nhưng việc đó khiến bạn phải tốn thời gian để nghiên cứu cũng như viết code.
* Sử dụng **AnimationDrawable**. AnimationDrawable là việc hiển thị một chuỗi các hình ảnh liên tiếp cùng với các hiệu ứng để tạo ra một animation

    Trong trường hợp này, bạn phải chọn giữa việc bỏ thời gian nghiên cứu để custom một animation hoặc sử dụng nhiều hình ảnh (tăng kích thước của app) để tạo một animation độc đáo. Để giải quyết vấn đề này, **AnimatedVectorDrawable** là một lựa chọn tốt nhất, cho phép người lập trình sử dụng một số animation cơ bản trên các VectorDrawable cùng với vài dòng code là có thể tạo ra một animation cho riêng mình.
## 3. Ví dụ
Để hiểu rõ hơn về AnimatedVectorDrawable, chúng ta sẽ tìm hiểu một ví dụ về nó.

Giả sử chúng ta có một icon là Search và một icon là Cancle:

![](https://images.viblo.asia/7640bdfd-f22f-4cb5-8daf-23d1831d9af6.png)

Và bạn muốn tạo một animation để chuyển đổi giữa hai icon này:

![](https://images.viblo.asia/dfe13396-042f-4cd9-960c-0c2a4f1f36b3.gif)

Như bạn có thể thấy ở trong gif, chúng ta sẽ có 3 hình có thể di chuyển: 2 hình của nữa hình tròn di chuyển thành một đường thẳng (màu xanh cây và xanh dương) và một đường thẳng trở nên dài hơn.

Đầu tiên, chúng ta cần phải tạo ra 3 hình cho Search icon bằng vector drawable.
```
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">

    <path
        android:name="line"
        android:pathData="M5.705,5.705 L18.295,18.295"
        android:strokeWidth="2"
        android:strokeColor="#000000"
        android:trimPathStart="0.45"
        android:trimPathEnd="1" />

    <path
        android:name="circle1"
        android:pathData="M5.705,5.705 A 4 4 0 1 1 12,12 L5.705,18.295"
        android:strokeWidth="2"
        android:strokeColor="#000000"
        android:trimPathStart="0"
        android:trimPathEnd="0.6" />

    <path
        android:name="circle2"
        android:pathData="M18.295,5.705 L12,12 A 4 4 0 1 1 5.705,5.705"
        android:strokeWidth="2"
        android:strokeColor="#000000"
        android:trimPathStart="0.4"
        android:trimPathEnd="1" />
</vector>
```

Về cú pháp tạo ra SVG path, bạn có thể tìm hiểu nó ở [đây](https://www.w3.org/TR/SVG/paths.html) hoặc bạn có thể sử dụng tool có sẵn trong Android Studio. Mình sẽ giải thích sơ qua các thuộc tính ở trên:
* Hai thuộc tính width và height ở trong tag vector để xác định kích thước của icon
* Chúng ta sẽ tạo ra các shape bằng tag path với các thuộc tính:
    * name: chỉ định tên cho hình
    * pathData: đây là thuộc tính để vẽ hình dạng của icon. các ký hiểu chữ được dùng cho các chức năng (Moveto, Lineto,..) và các số ở sau là các tọa độ cũng như là giá trị cần thiết để vẽ hình.
    * strokeWidth: độ rộng của nét vẽ
    * strokeColor: màu sắc của nét vẽ
    * trimPathStart: giá trị này nằm trong khoảng từ 0 đến 1 dùng để chỉ định vị trí mà hình sẽ bắt đầu xuất hiện.
    * trimPathEnd: chỉ định vị trí hình sẽ bắt đầu ẩn đi.

Tiếp theo, chúng ta sẽ tạo ra các animation để icon chuyển đổi. Chúng ta sẽ làm phần chuyển đổi tử search icon sang cancle icon, phần chuyển đổi ngược lại thi chỉ cần thay đổi các giá trị ngược với animation ở dưới đây. Ở đây, chúng ta sẽ tạo ra 3 animation tương ứng cho 3 hình ở trên.

Animation chuyển từ line của search icon sang cancle:

```
<set
xmlns:android="http://schemas.android.com/apk/res/android"
android:ordering="sequentially">
    
    <!-- Reset lại trạng thái của line -->
    <objectAnimator
        android:duration="0"
        android:propertyName="trimPathStart"
        android:valueFrom="0.45"
        android:valueTo="0.45"/>

    <!-- Animation để line dài ra-->
    <objectAnimator
        android:propertyName="trimPathStart"
        android:duration="300"
        android:startOffset="250"
        android:interpolator="@android:interpolator/fast_out_slow_in"
        android:valueFrom="0.45"
        android:valueTo="0" />

</set>
```

Animation chuyển 2 nữa vòng tròn ở search icon sang cancle icon

```
<set
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:ordering="together">

    <objectAnimator
        android:propertyName="trimPathStart"
        android:valueFrom="0"
        android:valueTo="0.6"
        android:duration="450" />

    <objectAnimator
        android:propertyName="trimPathEnd"
        android:valueFrom="0.6"
        android:valueTo="1"
        android:duration="600" />
</set>
```

```
<set
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:ordering="together">

    <objectAnimator
        android:propertyName="trimPathStart"
        android:valueFrom="0.4"
        android:valueTo="0"
        android:duration="600" />

    <objectAnimator
        android:propertyName="trimPathEnd"
        android:valueFrom="1"
        android:valueTo="0.4"
        android:duration="450" />

</set>
```

Tiếp theo chúng ta sẽ cho các animation trên chạy cùng với nhau:

```
<animated-vector
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:drawable="@drawable/searchback_search">

    <target
        android:name="line"
        android:animation="@animator/line_to_cancel" />

    <target
        android:name="circle1"
        android:animation="@animator/circle1_to_cancel" />

    <target
        android:name="circle2"
        android:animation="@animator/circle2_to_cancel" />

</animated-vector>
```

Gắn animation vào ImageView

```
<ImageView
       android:id="@+id/img_search"
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"
       app:srcCompat="@drawable/ic_search_to_cancle"/>
```

Và start animation

```
ImageView mSearchIcon = findViewById(R.id.img_search);
Drawable drawable = mSearchIcon.getDrawable();
if (drawable instanceof Animatable) {
      ((Animatable) drawable).start();
}
```

Và đây là thành quả của chúng ta:

![](https://images.viblo.asia/04c8f530-bd4b-450a-bdde-6dec37971dbe.gif)

Link tham khảo:
* https://medium.com/@shemag8/animated-vector-drawable-e4d7743d372c
* https://developer.android.com/guide/topics/graphics/vector-drawable-resources
* https://developer.android.com/guide/topics/graphics/drawable-animation