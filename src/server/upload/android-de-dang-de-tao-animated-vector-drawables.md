Trong quá trình phát triển ứng dụng của mình, ta thường có nhu cầu thay thế một icon bằng icon khác để phản ánh sự thay đổi trạng thái, một hành động mới( ví dụ : trạng thái play pause khi phát nhạc)... Trong bài viết này mình sẽ trình bày cách đơn giản nhất để làm điều đó.
# Cách giải quyết thường dùng
Một giải pháp điển hình mà chúng ta hay làm đó là thay đổi visibility của các view. Ngoài ra còn có thế sử dụng  [StateListDrawables](https://developer.android.com/reference/android/graphics/drawable/StateListDrawable.html), hoặc thử sự may mắn với [android:animateLayoutChanges ](https://developer.android.com/training/animation/layout.html), hoặc tự custom View, ...Khá là phức tạp phải không.

Sau này Android API 22 giớ thiệu  AnimatedVectorDrawable và Support Library 23.2.0 brought AnimatedVectorDrawableCompat cho API 11+ giúp chúng ta có thể sử dụng các công cụ đơn giản và hiệu quả do SDK cung cấp để thay thế các icon một cách đẹp mắt và hấp dẫn hơn.
![](https://images.viblo.asia/d78d844b-789a-4414-a141-34986c906a84.gif)

*Một trái tim được thay thế bằng một chiếc máy bay giấy: đột ngột (trái) và transformation (phải)*

Bài viết này sẽ tập trung vào các phép biến đổi kiểu này, trong đó một icon có thể trở thành một icon khác, một icon, biến hình thành một icon khác.

# Vấn đề
 AnimatedVectorDrawables cho phép start và stop animation sau khi xác định được animation biến đổi từ icon này sang icon khác. Tuy nhiên, vấn đề ở đây là : AnimatedVectorDrawables yêu cầu bạn cung cấp hai hình ảnh SVG tương thích
>  Hai hình ảnh SVG chỉ tương thích với các phép biến đổi hình thái nếu các đường dẫn của chúng có cùng các lệnh, theo cùng một thứ tự và có cùng số lượng tham số cho mỗi lệnh.
>  
Ví dụ, hai SVG này được xây dựng bằng các lệnh hoàn toàn khác nhau. Chúng không tương thích:
```xml
<vector>
    <path
        android:pathData="M19,6.41L17.59,5 12,10.59 6.41,5 5,6.41 10.59,12 5,17.59 6.41,19 12,13.41 17.59,19 19,17.59 13.41,12z"/>
</vector>
<vector>
    <path
        android:pathData="M12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,10c-1.1,0 -2,0.9 -2,2s0.9,2 2,2 2,-0.9 2,-2 -0.9,-2 -2,-2zM12,16c-1.1,0 -2,0.9 -2,2s0.9,2 2,2 2,-0.9 2,-2 -0.9,-2 -2,-2z"/>
</vector>
```

Mặt khác, hai SVG này được xây dựng bằng các lệnh giống nhau, theo cùng một thứ tự, với cùng số lượng tham số. Chúng tương thích:
```xml
<vector>
    <path
        android:pathData="M 2 21 L 23 12 L 2 3 L 2 10 L 17 12 L 2 14 Z"/>
</vector>
<vector>
    <path
        android:pathData="M 1 10 L 1 12 L 1 21 L 10 21 L 17 21 L 1 10 Z"/>
</vector>
```

Chúng ta rất khó kiếm được 2 vector tương thích AnimatedVectorDrawables.
Chúng ta buộc phải  thêm, xóa và sửa đổi đường dẫn của các SVG cho đến khi chúng thực sự tương thích với nhau. Sẽ mất rất nhiều thời gian để thực hiện việc đó một cách thủ công.
# Giải quyết vấn đề
Tất nhiên việc biến đổi  2 vector để chúng tương thích ta sẽ không làm thủ công, mà sẽ có tool để làm việc đó :laughing:
## Bước 1: Kiếm hai hình ảnh SVG
Như ví dụ bên trên, icon trái tim, và Material Design’s send icon. Biểu tượng trái tim sẽ chuyển thành biểu tượng gửi.
> Chỉ cần đảm bảo rằng chúng có cùng kích thước (ví dụ 24x24 pixel)
> 
![](https://images.viblo.asia/e4394fe5-7fce-4d75-826b-2a14ab6f00fc.png)
![](https://images.viblo.asia/1d3d7c5b-dc86-4897-9582-46a98f647231.png)

Chúng rất khác nhau, vì vậy đây là một ví dụ điển hình

## Bước 2: Import both SVGs into ShapeShifter

[ShapeShifter](https://github.com/alexjlockwood/ShapeShifter) là một ứng dụng web được tạo bởi Alex Lockwood.

Ứng dụng web này sẽ đảm nhiệm việc làm cho các SVG tương thích , chúng ta có thể điều chỉnh biến đổi hình thái,  xoay,  thay đổi màu sắc.. của icon.

Địa chỉ của tool https://shapeshifter.design/ (ưu tiên sử dụng Chrome hoặc Firefox).
```
Import --> SVG --> Choose file
```
Ta được :

![](https://images.viblo.asia/96d10eb1-79bf-4192-b9de-6acee2665448.png)

## Bước 3: Add morph transformation
Chọn icon trái tim và thêm pathData transformation
![](https://images.viblo.asia/84d499be-816b-4303-b8c2-554d18a01b6d.gif)
Sau đó, chọn icon send và copy pathData vào trường toValue của pathData transformation
![](https://images.viblo.asia/e3b02247-50bb-4b01-a0e8-60d53512cc9b.gif)
Bây giờ bạn sẽ có một thanh biến đổi màu đỏ và một cây đũa thần sẽ cung cấp cho bạn để tự động sửa lỗi chuyển đổi.

![](https://images.viblo.asia/38e9850c-7042-45a7-a119-8d01b451eb12.png)

## Bước 4: Make the SVGs compatible

Bạn có thể đoán rằng cây đũa thần màu đỏ là quan trọng. Thật vậy: chỉ cần nhấn nó và ShapeShifter sẽ chuyển đổi toValue thành một SVG tương thích với fromValue.

Chúng ta sẽ xóa send icon (bằng phím “delete” ) và mở của sổ Edit path morphing animation :
![](https://images.viblo.asia/4c930eed-7a54-4eef-aabd-32011395b54a.gif)

Tại đây, bạn sẽ có thể thấy một loạt các số khi bạn di chuột qua từng biểu tượng. Chúng sẽ cho bạn biết mỗi điểm của biểu tượng bên trái sẽ di chuyển đến đâu (cho đến khi biểu tượng bên phải được hiển thị)

* Số 1 ở bên trái sẽ di chuyển đến  Số 1 ở bên phải 
* Số 2 ở bên trái sẽ di chuyển đến Số 2 ở bên phải v.v.

![](https://images.viblo.asia/83816dab-87a2-4b1e-b726-f8464792baf7.png)

## Bước 5: Improve the transformation
Trong ví dụ ở đầu bài viết này biểu tượng trái tim có màu cam và biểu tượng gửi có màu đen. Do đó, ta sẽ thêm một animation để fillColor. Làm tương tự như animation pathData 

![](https://images.viblo.asia/ec3ee195-665c-4ee8-8de5-e77b198f28ff.gif)

## Bước 6: Bring the results into Android
1. Trong ShapeShifter: Export -> Animated Vector Drawable
1. Thêm file xml trên vào thư mục drawables
1. Dùng file đó như các file drawables khác
1. Để start animation cần lấy drawable ra và ép sang AnimatedVectorDrawable:

```kotlin
fun onClickIcon() {
    (someImageView.drawable as AnimatedVectorDrawable).start()
}
```

## Bước 7: Reverse the animation

AnimatedVectorDrawables chỉ đi một chiều nên ta phải tạo một AnimatedVectorDrawables khác đảo lại thôi :sob:.

# Tham khảo
Ngoài việc sử dụng  ShapeShifter bạn cũng có thể dùng thư viện : https://github.com/akaita/MorphView

**Nguồn:**

[Medium](https://sourcediving.com/android-recipes-the-easy-path-to-animated-icons-878bffcb0920)