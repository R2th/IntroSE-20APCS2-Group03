- Trong bài viết này chúng ta sẽ tạo một customView cơ bản trong android bằng kotlin, nếu thành thạo nó, bạn có thể tạo được rất nhiều view đẹp cũng như những animation phức tạp. Chúng ta sẽ cùng bắt đầu với việc vẽ một chiếc quạt điện nhé :D 

## 1. Bắt đầu với file xml nơi đặt Custom View:

- Đầu tiên sẽ là file `dimens.xml` :

```kotlin
<resources>
   <dimen name="text_view_padding">16dp</dimen>
   <dimen name="default_margin">8dp</dimen>
   <dimen name="margin_top">24dp</dimen>
   <dimen name="fan_dimen">250dp</dimen>
</resources>
```

- Tiếp theo tại `string.xml` chúng ta viết những thông tin sau :

```kotlin
<resources>
   <string name="app_name">CustomFanController</string>
   <string name="fan_control">Fan Control</string>
   <string name="fan_off">off</string>
   <string name="fan_low">1</string>
   <string name="fan_medium">2</string>
   <string name="fan_high">3</string>
</resources>
```

- Ta mở file `activity_main.xml` , trong `TextView` ta bỏ code hiện có và thay vào đó đoạn code sau:

```kotlin
<TextView
       android:id="@+id/customViewLabel"
       android:textAppearance="@style/Base.TextAppearance.AppCompat.Display3"
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"
       android:padding="@dimen/text_view_padding"
       android:textColor="@android:color/black"
       android:layout_marginStart="@dimen/default_margin"
       android:layout_marginEnd="@dimen/default_margin"
       android:layout_marginTop="@dimen/margin_top"
       android:text="@string/fan_control"
       app:layout_constraintLeft_toLeftOf="parent"
       app:layout_constraintRight_toRightOf="parent"
       app:layout_constraintTop_toTopOf="parent"/>
  ```
   
   - Tiếp tục thêm `ImageView` vào layout main như sau. Vùng này sẽ là chỗ mà chúng ta sẽ custom view trong bài này.

```kotlin
<ImageView
       android:id="@+id/dialView"
       android:layout_width="200dp"
       android:layout_height="200dp"
       android:background="@android:color/darker_gray"
       app:layout_constraintTop_toBottomOf="@+id/customViewLabel"
       app:layout_constraintLeft_toLeftOf="parent"
       app:layout_constraintRight_toRightOf="parent"
       android:layout_marginLeft="@dimen/default_margin"
       android:layout_marginRight="@dimen/default_margin"
       android:layout_marginTop="@dimen/default_margin"/>
 ```
 
## 2.  Khởi tạo kotlin class Custom View:

- Tạo kotlin class với tên `DialView`, kế thừa từ class `View`, import `android.view.View`. Trong contructor ta truyền vào Context, AttributeSet và defineStyleAttr :

```kotlin
class DialView @JvmOverloads constructor(
   context: Context,
   attrs: AttributeSet? = null,
   defStyleAttr: Int = 0
) : View(context, attrs, defStyleAttr) {
}
```
- Trong `DialView` tạo `enum`  thể hiện tốc độ của quạt, vì mình đang custom view điều khiển quạt mà :D 

```kotlin
private enum class FanSpeed(val label: Int) {
   OFF(R.string.fan_off),
   LOW(R.string.fan_low),
   MEDIUM(R.string.fan_medium),
   HIGH(R.string.fan_high);
}
```
- Bên dưới `enum` , ta thêm các hằng số sau, ta sẽ dùng chúng để vẽ số của quạt và núm chỉ số hiện tại của quạt:
```kotlin
private const val RADIUS_OFFSET_LABEL = 30      
private const val RADIUS_OFFSET_INDICATOR = -35
```

- Tiếp theo là một số biến để có thể vẽ view, import `android.graphics.PointF`:
```kotlin
private var radius = 0.0f                   // Radius of the circle.
private var fanSpeed = FanSpeed.OFF         // The active selection.
// position variable which will be used to draw label and indicator circle position
private val pointPosition: PointF = PointF(0.0f, 0.0f)
```
- `radius` là bán kính của hình tròn, giá trị này sẽ đc gán khi vẽ view lên trên màn hình.
- `fanSpeed` là tốc độ hiện tại của quạt, sẽ là một trong 4 giá trị của `FanSpeed` enum. Giá trị mặc định sẽ là `OFF`.
- `pointPosition` là tọa độ (X, Y) dùng để xác định điểm vẽ.

- Vẫn trong `DialView` ta khởi tạo đối tượng `Paint` . Chúng ta khởi tạo các biến ở đây để khi vẽ sẽ đạt tốc độ cao hơn:
```kotlin
private val paint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
   style = Paint.Style.FILL
   textAlign = Paint.Align.CENTER
   textSize = 55.0f
   typeface = Typeface.create( "", Typeface.BOLD)
}
```

## 3. Bắt đầu vẽ chiêc quạt thôi:
- Trong `Dialview`, bên dưới phần khởi tạo, ta override `onSizeChange()` :
```kotlin
override fun onSizeChanged(width: Int, height: Int, oldWidth: Int, oldHeight: Int) {
   radius = (min(width, height) / 2.0 * 0.8).toFloat()
}
```
- Tiếp theo ta định nghĩa `computeXYForSpeed()` là chức năng mở rộng của lớp `PointF`. Nó dùng để tính tọa độ vẽ 4 nhãn tương ứng với các số của quạt 0,1,2,3. Ta sẽ dùng nó trong `onDraw`:
```kotlin
private fun PointF.computeXYForSpeed(pos: FanSpeed, radius: Float) {
   // Angles are in radians.
   val startAngle = Math.PI * (9 / 8.0)   
   val angle = startAngle + pos.ordinal * (Math.PI / 4)
   x = (radius * cos(angle)).toFloat() + width / 2
   y = (radius * sin(angle)).toFloat() + height / 2
}
```

- Override `onDraw()` đây sẽ là phần chính để tạo ra view mà chúng ta muốn:
```kotlin
override fun onDraw(canvas: Canvas) {
   super.onDraw(canvas)

}
```
- Bên trong `onDraw()` ta thêm dòng này để thay đổi màu giữa xám và xanh lá, màu tím là màu mặc định khi quạt đang tắt là màu xám:
```kotlin
// Set dial background color to green if selection not off.
paint.color = if (fanSpeed == FanSpeed.OFF) Color.GRAY else Color.GREEN
```
- Tiếp đến là phuong thức `drawCircle()` để vẽ hình tròn, phương thúc này sẽ sử dụng width và height để xác định tâm hình tròn, bán kính hình tròn và màu sơn :
```kotlin
// Draw the dial.
canvas.drawCircle((width / 2).toFloat(), (height / 2).toFloat(), radius, paint)
```
- Ta thêm đoạn code sau để vẽ một hình tròn nhỏ thể hiện tốc độ quạt hiện giờ của quạt, cũng sử dụng phương thức `drawCircle()`:
```kotlin
// Draw the indicator circle.
val markerRadius = radius + RADIUS_OFFSET_INDICATOR
pointPosition.computeXYForSpeed(fanSpeed, markerRadius)
paint.color = Color.BLACK
canvas.drawCircle(pointPosition.x, pointPosition.y, radius/12, paint)
```

- Tiếp đến là vẽ 4 nhãn tương ứng với chỉ số quạt, ta sử dụng phương thức `drawText()`, và cũng dùng computeXYForSpeed cũng giống như ở trên nhưng khác phần offset vì vậy bán kính lớn hơn sẽ được vẽ ở xa tâm hơn:
```kotlin
// Draw the text labels.
val labelRadius = radius + RADIUS_OFFSET_LABEL
for (i in FanSpeed.values()) {
   pointPosition.computeXYForSpeed(i, labelRadius)
   val label = resources.getString(i.label)
   canvas.drawText(label, pointPosition.x, pointPosition.y, paint)
}
```
- Mở `activity_main` và xóa nhãn `ImageView` thay vào đó bạn gõ `DialView`, trình biên dịch sẽ gợi ý nơi đặt class customview của bạn, tại đây ta xóa bỏ dòng `background`:
```kotlin
<com.example.android.customfancontroller.DialView
       android:id="@+id/dialView"
       android:layout_width="@dimen/fan_dimen"
       android:layout_height="@dimen/fan_dimen"
       app:layout_constraintTop_toBottomOf="@+id/customViewLabel"
       app:layout_constraintLeft_toLeftOf="parent"
       app:layout_constraintRight_toRightOf="parent"
       android:layout_marginLeft="@dimen/default_margin"
       android:layout_marginRight="@dimen/default_margin"
       android:layout_marginTop="@dimen/default_margin" />
 ```
 
 
## 4.  Cuối cùng ta sẽ tạo sự kiện click cho customView:

- Bên trong `enum` ta thêm phương thức `next()` sẽ tăng từ thấp đến cao rồi lặp lại:
```kotlin
private enum class FanSpeed(val label: Int) {
   OFF(R.string.fan_off),
   LOW(R.string.fan_low),
   MEDIUM(R.string.fan_medium),
   HIGH(R.string.fan_high);

   fun next() = when (this) {
       OFF -> LOW
       LOW -> MEDIUM
       MEDIUM -> HIGH
       HIGH -> OFF
   }
}
```
- Bên trong `DialView.kotlin` , ta thêm khối `init()` để set `isClickable` thành true cho phép view nhận input của người dùng:
```kotlin
init {
   isClickable = true
}
```
- Tiếp đến ta override `performClick()` :
```kotlin
override fun performClick(): Boolean {
   if (super.performClick()) return true

   fanSpeed = fanSpeed.next()
   contentDescription = resources.getString(fanSpeed.label)

   invalidate()
   return true
}
```
- Mỗi khi click vào view thì sẽ gọi `next()` để chuyển số tuần tự từ off đến 3 rồi lặp lại. Cuối cùng phương thức `validate()` làm mất hiệu lực cả khung hình, buộc phải gọi `onDraw()` để vẽ lại view. Nếu một cái gì đó trong CustomView của bạn thay đổi, bao gồm cả tương tác của người dùng và thay đổi này cần được hiển thị, hãy gọi `validate()`.
- Bây giờ các bạn chỉ cần run app và click vào customview của chúng ta. Nó đã hoạt động :D 
- Rất cảm ơn mọi người đã dành thời gian để đọc bài viết này !!!

Nguồn:  https://classroom.udacity.com/courses/ud940/lessons/7441b2a2-29cb-4404-8098-1df47813b615/concepts/0d410e58-04b1-41dc-9ac2-a7a960ceb3c5