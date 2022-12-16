![](https://images.viblo.asia/051318c8-6c27-4e91-bc91-11600c27cf54.png)
### Tại sao bạn nên sử dụng ?
Khi bạn muốn sử dụng hình ảnh PNG hoặc JPEG trong ứng dụng của mình, bạn phải cung cấp nhiều bản sao của cùng một hình ảnh cho các mật độ màn hình khác nhau. Điều đó, tất nhiên, làm mờ ứng dụng của bạn với các bản sao của cùng một hình ảnh. Vâng, đôi khi đó là con đường chúng ta phải chọn vì chúng ta không thể sử dụng Drawables cho mọi trường hợp, nhưng chúng ta có thể giảm đáng kể kích thước ứng dụng của mình nếu chúng ta có thể sử dụng Drawables instead. ShapeDrawables là một chuỗi các lệnh cho biết cách vẽ một cái gì đó trên màn hình. Đó là lý do tại sao chúng có thể được thay đổi kích thước và kéo dài bao nhiêu tùy thích, mà không làm mất chất lượng. Chúng ta có thể đổi màu và thao tác chúng ngay cả khi ứng dụng đang chạy và sử dụng cùng ShapeDrawable nhiều lần trong ứng dụng của chúng ta. Vì ShapeDrawables là một lớp con của lớp trừu tượng Drawable , chúng ta có thể sử dụng chúng trong các phương thức mà Drawable có .Các bạn có thể xem thêm tài liệu về nó ở [đây](https://developer.android.com/reference/android/graphics/drawable/ShapeDrawable) 

![](https://images.viblo.asia/b1346e04-b3ed-44f1-909a-7c1e6532e48e.jpg)
### Nó có điểm yếu nào không? 
Tất nhiên, giống như mình đã đề cập trước khi chúng ta có thể sử dụng chúng trong mọi trường hợp. Mình đã nói trước đó rằng lớp ShapeDrawable là một lớp con của lớp trừu tượng Drawable. Cũng có các lớp con khác và mỗi một trong số chúng có trường hợp sử dụng riêng. Bạn có thể nhấp vào [đây](https://developer.android.com/guide/topics/resources/drawable-resource) để kiểm tra các loại Drawable khác và tìm ra loại nào phù hợp với trường hợp của bạn. Một vấn đề khác là nó mất nhiều thời gian hơn để vẽ so với Bitmap vì có rất nhiều nhiệm vụ (phân tích cú pháp và draw ) được diễn ra ở phía sau bối cảnh đó. Nhưng tôi nghĩ đó không phải là vấn đề lớn nếu Drawables của bạn là một hình ảnh đơn giản. Ý kiến của tôi là bạn nên sử dụng Drawables (ShapeDrawables) bất cứ nơi nào bạn có thể, bởi vì chúng dễ sửa đổi và chúng không mất nhiều không gian.

Trước tiên, ta có một ví dụ đơn giản và sau đó chúng ta sẽ tạo lại một gradient như thế này:
![](https://images.viblo.asia/fc2b4240-aca7-4796-ba7a-e42d971e0df6.png)
Đây là code cho ví dụ trên :
```
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">

    <corners
        android:bottomRightRadius="10dp"
        android:radius="40dp" />

    <gradient
        android:angle="45"
        android:centerX="float"
        android:centerY="float"
        android:endColor="#01f1fa"
        android:gradientRadius="integer"
        android:startColor="#0189ff"
        android:type="linear" />

    <!--If your shape requires only one solid color-->
    <!--<solid
        android:color="#FFFFFF" />-->

    <size
        android:width="82dp"
        android:height="82dp" />

    <!--Use android:dashWidth="2dp" and android:dashGap="2dp"
    to add dashes to your stroke-->
    <stroke
        android:width="2dp"
        android:color="#FFFFFF" />

    <!--If you want to add padding-->
    <!-- <padding
         android:left="10dp"
         android:top="20dp"
         android:right="40dp"
         android:bottom="8dp" />-->
    
</shape>
```
### Một số thuộc tính hữu ích mà bạn có thể sử dụng khi xác định hình dạng: 

1. **Kiểu hình (shape) **
Bạn có thể chỉ định loại hình dạng bằng thuộc tính *android: shape* XML trong thẻ hình dạng. Nếu bạn không chỉ định hình dạng, loại hình chữ nhật mặc định được chọn. Các hình dạng có sẵn khác là hình bầu dục, đường và vòng.
```
android:shape= “oval”
```

**2. Kiểu bo tròn góc  (radius)**
Vì hình dạng của chúng ta là một hình chữ nhật, chúng ta có thể làm tròn các góc hình chữ nhật. Bạn có thể làm điều đó bên trong thẻ góc (corners). Bạn có thể chỉ định bán kính cho tất cả các góc bằng *android: radius*. 
```
android:radius=”21dp” 
```
Tất nhiên, bạn có thể sử dụng giá trị từ dimens resource file. Nếu bạn muốn thử nhiều kiểu bo tròn hơn một chút, bạn có thể bo tròn theo mức độ khác nhau cho mỗi góc.Và chúng ta sẽ làm điều đó bằng cách sử dụng *android: topLeftRadius*, *android: topRightRadius*, *android: bottomLeftRadius* và *android: bottomRightRadius*. 
```
android:bottomLeftRadius=”10dp”
```

**3. Gradient hoặc solid color** 
Nếu bạn muốn sử dụng màu đơn sắc, bạn nên sử dụng thẻ solid và sau đó bên trong thẻ đó, bạn có thể chỉ định màu bằng *android: color*
```
android:color=@color/your_color_name
```
Tất cả các thuộc tính gradient phải nằm trong thẻ gradient. Bạn có thể chỉ định màu bắt đầu, trung tâm và màu kết thúc bằng *android: startColor*, *android: centerColor* và *android: endColor*. 
```
android:startColor=@color/your_color_name
android:centerColor=@color/your_color_name
android:endColor=@color/your_color_name
```
Nếu bạn không chỉ định loại gradient, thuộc tính mặc định được chọn. Các loại khác là *radial* và *sweep*. Dưới đây là cách chỉ định loại gradient:
```
android:type=”radial”
```
Bạn thậm chí có thể thay đổi góc của gradient. Ví dụ: nếu bạn muốn độ dốc của bạn đi từ dưới cùng bên trái sang trên cùng bên phải, bạn phải đặt góc của mình thành `android: angle = "45"`  (lưu ý rằng góc phải là bội số của 45).

**4. Chỉ định kích thước** 
Bạn có thể chỉ định kích thước của hình. Hãy nhớ rằng bạn có thể thay đổi kích thước sau này, ví dụ như khi bạn sử dụng ShapeDrawable trong ImageView. Bạn có thể thay đổi kích thước bên trong thẻ kích thước. *android: layoutheight* và *android: layoutwidth* được sử dụng để làm điều đó. Bạn có thể biết hai rõ 2 thuộc tính này rồi chứ :
```
android:layout_height=”40dp”
android:layout_width=”10dp”
```

**5. Stroke (viền xung quanh hình)** 
Đôi khi bạn muốn có một đường viền xung quanh hình của bạn và để làm điều đó bạn có thể sử dụng thẻ *stroke*. Bạn có thể chỉ định chiều rộng và màu của đường viền bằng *android: width* và *android: color*.
```
android:width=”2dp”
android:color=@color/your_beautiful_color
```
Bạn thậm chí có thể có dấu gạch ngang như một đường viền xung quanh hình của bạn. Để có được hiệu ứng đó, bạn phải sử dụng hai thuộc tính sau: *android: dashGap*, *android: dashWidth*. 
```
android:dashGap=”1dp”
android:dashWidth=”4dp”
```

Các bạn có thể tìm hiểu thêm và xem kỹ các thuộc tính tại [đây](https://developer.android.com/guide/topics/resources/drawable-resource.html#Shape)

### Sử dụng hình  của bạn trong Chế độ xem của Android Studio

Sau khi bạn hài lòng với hình của mình, bạn có thể sử dụng nó trong Chế độ xem (View). Đây là cách bạn có thể sử dụng hình dạng vòng tròn trong ImageView bằng XML.
```
<ImageView xmlns:android=”http://schemas.android.com/apk/res/android"
android:id=”@+id/my_image_view”
android:layout_width=”wrap_content”
android:layout_height=”wrap_content”
android:background=”@drawable/my_custom_circle”
android:text=”@string/hello_world” />
```

Thay vì sử dụng thuộc tính *android: background*, bạn có thể sử dụng:
```
android:src=”@drawable/my_custom_circle”
```
Đây là cách bạn có thể sử dụng  bằng Java
```
ImageView myImageView = (ImageView) findViewById(R.id.my_image_view);
imageView.setImageResource(R.drawable.my_custom_circle);
```
### Sửa đổi hình bằng Java 
Bây giờ bạn đã biết cách xác định hình dạng bằng XML và cách sử dụng chúng trong Chế độ xem. Nhưng cũng phải có một cách để định nghĩa và sửa đổi chúng bằng Java, phải không? Chắc chắn, nhưng tôi khuyên bạn nên xác định hình dạng bằng XML, nếu bạn có thể, bởi vì việc hình dung và kiểm tra tiến trình của bạn sẽ dễ dàng hơn nhiều. Nếu bạn đã sử dụng XML để xác định hình dạng của mình, bạn có thể sử dụng phương thức getDrawable trong Java để lấy tham chiếu đến hình dạng của bạn. Phương pháp này sẽ trả về một Drawable. Lưu ý rằng bạn có thể thao tác hình dạng của mình ngay cả khi ứng dụng của bạn đang chạy.
```
Drawable drawable = getDrawable(R.drawable.button_shape);
```
Sau đó, bạn có thể sử dụng Drawable của mình thành GradientDrawable chẳng hạn.
```
GradientDrawable gradientDrawable = (GradientDrawable) drawable;
```
Bây giờ, bạn có thể bắt đầu sửa đổi GradientDrawable của mình.
```
gradientDrawable.setColor(ContextCompat.getColor(this, R.color.colorPrimary));
gradientDrawable.setShape(GradientDrawable.OVAL);
gradientDrawable.setStroke(12, Color.CYAN);
```
Xem thêm về các sửa đổi tại [đây](https://developer.android.com/reference/android/graphics/drawable/GradientDrawable#pubmethods)

### Xác định hình bằng Java
Đây là cách bạn có thể tạo và sử dụng các hình chỉ bằng cách sử dụng Java. [Xem thêm](https://developer.android.com/reference/android/graphics/drawable/shapes/package-summary)
```
RoundRectShape roundRectShape = new RoundRectShape(new float[]{
10, 10, 10, 10,
10, 10, 10, 10}, null, null);
ShapeDrawable shapeDrawable = new ShapeDrawable(roundRectShape);
shapeDrawable.getPaint().setColor(Color.parseColor(“#FFFFFF”));
ImageView myImageView = findViewById(R.id.my_image_view);
myImageView.setBackground(shapeDrawable);
// or you can use myImageView.setImageDrawable(shapeDrawable);
```
Bây giờ thì bạn đã biết cách tạo và sử dụng Drawables bằng cách sử dụng Java và / hoặc XML và chúng được sử dụng để làm gì rồi chứ nhỉ

Và tôi có một mẫu code đầy đủ khi vẽ shape như thế này:

![](https://images.viblo.asia/7aa85a9e-b54b-4ca3-a909-a149b85a5904.png)

**Code cho phần gradient background:**
```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">

    <gradient
        android:angle="90"
        android:endColor="#ff009f"
        android:startColor="#1a2b5d"
        android:type="linear" />

</shape>
```

**Code cho hình chữ nhật button có border và radius:**
```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">

    <corners
        android:radius="20dp" />

    <solid
        android:color="@android:color/transparent" />

    <stroke
        android:color="#FFFFFF"
        android:width="2dp" />

    <size
        android:width="165dp"
        android:height="40dp" />

</shape>
```
**Và đoạn code add vào UI**
```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@drawable/background_gradient">

    <TextView
        android:id="@+id/lets_go_tv"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="8dp"
        android:text="Let's go."
        android:textColor="#FFFFFF"
        android:textSize="50sp"
        android:textStyle="bold"
        app:layout_constraintBottom_toTopOf="@+id/lets_go_description_tv"
        app:layout_constraintEnd_toStartOf="@+id/lets_go_description_tv"
        app:layout_constraintStart_toEndOf="@+id/lets_go_description_tv" />

    <TextView
        android:id="@+id/lets_go_description_tv"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="If you're an artist or part of their management team,\nwe'll show you how to get the most out of Spotify."
        android:textAlignment="center"
        android:textColor="#FFFFFF"
        android:textSize="20sp"
        android:textStyle="bold"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/get_access_btn"
        android:layout_width="164dp"
        android:layout_height="38dp"
        android:layout_marginTop="30dp"
        android:background="@drawable/rounded_button_drawable"
        android:text="Get Access"
        android:textAllCaps="true"
        android:textColor="#FFFFFF"
        android:textSize="12sp"
        android:textStyle="bold"
        app:layout_constraintEnd_toStartOf="@+id/lets_go_description_tv"
        app:layout_constraintStart_toEndOf="@id/lets_go_description_tv"
        app:layout_constraintTop_toBottomOf="@+id/lets_go_description_tv" />

</android.support.constraint.ConstraintLayout>
```

Và kết quả khi run code
![](https://images.viblo.asia/d2228348-ceb9-460b-b4b1-a71d8bf63323.png)

Cảm ơn các bạn đã quan tâm bài viết này.

Nguồn: https://android.jlelse.eu/android-shape-drawables-tutorial-17fbece6fef5