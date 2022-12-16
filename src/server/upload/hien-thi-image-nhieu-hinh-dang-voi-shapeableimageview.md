Trước đây, khi ta sử dụng ImageView để hiển thị hình ảnh thì nó đơn giản chỉ hiển thị với hình chữ nhật cùi mía thôi. Để hiển thị hình dạng khác mà không tốn thời gian custom view thì ta thường nhờ đến sự cứu cánh của các thư viện, điển hình như[ *CircleImageView*](https://github.com/hdodenhof/CircleImageView) của *hdodenhof*.

Và rồi cuối cùng thì Android cũng đã giới thiệu `ShapeableImageView` trong Material Design.

![](https://images.viblo.asia/0212de3a-1315-47fa-ad88-d92f1655058d.png)
# ShapeableImageView
`ShapeableImageView` kế thừa từ `AppCompatImageView` , nghĩa là nó có tất cả các function được cung cấp như trong `AppCompatImageView`
## XML Attributes mới
* **strokeColor**: màu đường viền của ImageView
* **strokeWidth**: độ rộng đường viền của ImageView
* **cornerFamily**: xác định corner của hình với giá trị là ***cut*** hoặc ***rounded*** tương ứng với loại cắt góc hay bo góc
* **cornerSize**: xác định kích thước của corner, có thể sử dụng bằng ***giá trị phần trăm*** hoặc ***dp***
## Sử dụng
Thêm marerial design vào Gradle
```
implementation ‘com.google.android.material:material:1.2.0’
```
### Circle ImageView
![](https://images.viblo.asia/e96d0883-9225-4d6b-955c-67c6fada7d3e.png)

Circle ImageView thường được sử dụng nhiều cho avatar của user.

Đầu tiên, ta tạo style.
```xml:style_circle.xml
<style name="circle">
    <item name="cornerSize">50%</item>
</style>
```
Như ở trên, ta không thêm attribute **cornerFamily** vì giá trị mặc định của nó chính là *rounded*.

Sau đó gán style vào attribute `app:shapeApperanceOverlay` ở trong file layout
```xml:layout_circle.xml
<com.google.android.material.imageview.ShapeableImageView
    android:id="@+id/circle"
    android:layout_width="100dp"
    android:layout_height="100dp"
    android:layout_margin="10dp"
    android:scaleType="centerCrop"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent"
    app:shapeAppearanceOverlay="@style/circle"
    app:srcCompat="@drawable/doge" />
```
### Circle ImageView Border
![](https://images.viblo.asia/4561e4aa-3eab-4908-92ae-93a208c229fd.png)
Ta dùng style như Circle Image trên và thêm thuộc tính strokeColor và strokeWidth để thêm border.
```xml:layout_circle_with_border.xml
<com.google.android.material.imageview.ShapeableImageView
    android:id="@+id/circle_border"
    android:layout_width="100dp"
    android:layout_height="100dp"
    android:layout_margin="10dp"
    android:padding="5dp"
    android:scaleType="centerCrop"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintTop_toTopOf="parent"
    app:shapeAppearanceOverlay="@style/circle"
    app:srcCompat="@drawable/doge"
    app:strokeColor="@color/black"
    app:strokeWidth="5dp" />
```
### Rounded Corner Image
![](https://images.viblo.asia/9c19dda6-506d-44f5-846b-0f3169c65136.png)
Với loại hình bo góc ta cũng có thể thực hiện bằng cách lồng ImageView vào CardView vì CardView có hỗ trợ bo góc, tuy nhiên nó có thể làm giảm hiệu suất khi render layout. Vì vậy dùng ShapeableImageView thay thế là cách tốt hơn

Thêm style
```xml:style_rounded_corner.xml 
<style name="rounded_corner">
    <item name="cornerSize">20dp</item>
</style>
```
Sử dụng style trong layout
```xml:rounded_Corner_layout.xml
<com.google.android.material.imageview.ShapeableImageView
    android:id="@+id/rounded_corner"
    android:layout_width="100dp"
    android:layout_height="100dp"
    android:layout_margin="10dp"
    android:scaleType="centerCrop"
    app:layout_constraintStart_toStartOf="parent"
    app:shapeAppearanceOverlay="@style/rounded_corner"
    app:srcCompat="@drawable/doge" />
```
### Rounded Corner Image Border
![](https://images.viblo.asia/667d45b4-d966-452a-a764-0a5954f8526e.png)

Tương tự, ta thêm thuộc tính strokeWidth và strokeColor
```xml:rounded_corner_layout_with_border.xml 
<com.google.android.material.imageview.ShapeableImageView
    android:id="@+id/rounded_corner_with_border"
    android:layout_width="100dp"
    android:layout_height="100dp"
    android:layout_margin="10dp"
    android:padding="5dp"
    android:scaleType="centerCrop"
    app:layout_constraintEnd_toEndOf="parent"
    app:shapeAppearanceOverlay="@style/rounded_corner"
    app:srcCompat="@drawable/doge"
    app:strokeColor="@color/black"
    app:strokeWidth="5dp" />
```
### Cut Corner Image
![](https://images.viblo.asia/8347111c-d812-4271-8a64-2e8f44213781.png)

Đến đây thì ta phải thêm attribute `cornerFamily` với giá trị là `cut`

Tạo style
```xml:style_cut_corner_family.xml
<style name="cut_corner">
    <item name="cornerSize">20dp</item>
    <item name="cornerFamily">cut</item>
</style>
```
Thêm vào layout
```xml:cut_corner_family_layout.xml 
<com.google.android.material.imageview.ShapeableImageView
    android:id="@+id/cut_corner"
    android:layout_width="100dp"
    android:layout_height="100dp"
    android:layout_margin="10dp"
    android:scaleType="centerCrop"
    app:layout_constraintStart_toStartOf="parent"
    app:shapeAppearanceOverlay="@style/cut_corner"
    app:srcCompat="@drawable/doge" />
```
### Cut Corner Image Border
![](https://images.viblo.asia/6e969053-31ad-4bf8-ab85-2b233c2e7182.png)
Tương tự
```xml:cut_corner_family_border.xml 
<com.google.android.material.imageview.ShapeableImageView
    android:id="@+id/cut_corner_border"
    android:layout_width="100dp"
    android:layout_height="100dp"
    android:layout_margin="10dp"
    android:padding="5dp"
    android:scaleType="centerCrop"
    app:layout_constraintEnd_toEndOf="parent"
    app:shapeAppearanceOverlay="@style/cut_corner"
    app:srcCompat="@drawable/doge"
    app:strokeColor="@color/black"
    app:strokeWidth="5dp" />
```
### Specific Rounded Corner
![](https://images.viblo.asia/5f2d98bb-9efe-4d0d-a88a-2bcce3b3cc3d.png)
Thêm style
```xml:style_specific_rounded_corner.xml 
<style name="specific_rounded_corner">
    <item name="cornerSizeTopLeft">50dp</item>
    <item name="cornerSizeBottomRight">50dp</item>
    <item name="cornerFamilyTopLeft">rounded</item>
    <item name="cornerFamilyBottomRight">rounded</item>
</style>
```
Thêm vào layout
```xml:layout_specific_rounded_corner.xml
<com.google.android.material.imageview.ShapeableImageView
    android:id="@+id/specific_rounded_corner"
    android:layout_width="100dp"
    android:layout_height="100dp"
    android:layout_margin="10dp"
    android:scaleType="centerCrop"
    app:layout_constraintStart_toStartOf="parent"
    app:shapeAppearanceOverlay="@style/specific_rounded_corner"
    app:srcCompat="@drawable/doge" />
```
### Specific Rounded Corner Border
![](https://images.viblo.asia/f7933d52-2ab2-4bb9-96c9-e5cb40b45345.png)

```xml:specific_rounded_corner_border.xml 
<com.google.android.material.imageview.ShapeableImageView
    android:id="@+id/specific_rounded_border_corner"
    android:layout_width="100dp"
    android:layout_height="100dp"
    android:layout_margin="10dp"
    android:padding="5dp"
    android:scaleType="centerCrop"
    app:layout_constraintEnd_toEndOf="parent"
    app:shapeAppearanceOverlay="@style/specific_rounded_corner"
    app:srcCompat="@drawable/doge"
    app:strokeColor="@color/black"
    app:strokeWidth="5dp" />
```
### Specific Cut Corner
![](https://images.viblo.asia/397c96e4-bd74-4499-859d-c3ca01ab7c80.png)
Thêm style
```style_specifi_cut_corner.xml
<style name="specific_cut_corner">
    <item name="cornerSizeTopLeft">50dp</item>
    <item name="cornerSizeBottomRight">50dp</item>
    <item name="cornerFamilyTopLeft">cut</item>
    <item name="cornerFamilyBottomRight">cut</item>
</style>
```
Thêm vào layout
```specific_cut_corner_border.xml 

<com.gogle.android.material.imageview.ShapeableImageView
    android:id="@+id/specific_cut_corner"
    android:layout_width="100dp"
    android:layout_height="100dp"
    android:layout_margin="10dp"
    android:scaleType="centerCrop"
    app:shapeAppearanceOverlay="@style/specific_cut_corner"
    app:srcCompat="@drawable/doge" />
```
### Specific Cut Corner Border
![](https://images.viblo.asia/2b3b3b92-8619-4c6d-98fe-6052758cf09a.png)
Tương tự
```specific_cut_corner_with_border.xml
<com.google.android.material.imageview.ShapeableImageView
    android:id="@+id/specific_cut_border_corner"
    android:layout_width="100dp"
    android:layout_height="100dp"
    android:layout_margin="10dp"
    android:padding="5dp"
    android:scaleType="centerCrop"
    app:layout_constraintEnd_toEndOf="parent"
    app:shapeAppearanceOverlay="@style/specific_cut_corner"
    app:srcCompat="@drawable/doge"
    app:strokeColor="@color/black"
    app:strokeWidth="5dp" />
```
### ImageView Rounded and Cut Corners
![](https://images.viblo.asia/b0a0735a-380f-47fa-ad12-3a0229546afa.png)
Một số design sẽ có cả sự kết hợp giữa bo góc và căn góc.

Thêm style
```style_specifi_mic_corner.xml 
<style name="specific_mix_corner">
    <item name="cornerSize">50dp</item>
    <item name="cornerFamilyTopLeft">cut</item>
    <item name="cornerFamilyBottomRight">cut</item>
    <item name="cornerFamilyBottomLeft">rounded</item>
    <item name="cornerFamilyTopRight">rounded</item>
</style>
```
Thêm vào layout
```specific_mix_corners_layout.xml 
<com.google.android.material.imageview.ShapeableImageView
    android:id="@+id/specific_mix_corner"
    android:layout_width="100dp"
    android:layout_height="100dp"
    android:layout_margin="10dp"
    android:scaleType="centerCrop"
    app:shapeAppearanceOverlay="@style/specific_mix_corner"
    app:srcCompat="@drawable/doge" />
```
### Programmatically với Kotlin
Nếu muốn set qua code thì `ShapeableImageView`  cung cấp một số hàm mà ta có thể sử dụng.

Ví dụ ta muốn set Top Right Corner bo góc với size là 14dp:

```kotlin.kt 
topCornerImage.setShapeAppearanceModel(topCornerImage.getShapeAppearanceModel()
        .toBuilder()
        .setTopRightCorner(CornerFamily.ROUNDED,14dp)
        .build());
```
## Nguồn tham khảo
[https://amahmoud91.medium.com/deep-dive-into-shapeableimageview-in-android-1ba7f9a5969e](https://amahmoud91.medium.com/deep-dive-into-shapeableimageview-in-android-1ba7f9a5969e)