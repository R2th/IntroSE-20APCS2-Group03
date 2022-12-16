- Là người dùng, sau khi cài đặt và mở một ứng dụng thì việc tiếp theo được quan tâm đến là các thành phần trong giao diện của ứng dụng có chức năng gì, ứng dụng đó sẽ được sử dụng như thế nào,  việc hướng dẫn sử dụng người dùng cho lần đầu tiên mở app là điều cần thiết.
- Trong bài viết này, chúng ta sẽ cùng tìm hiểu cách sử dụng một trong những thư viện giúp xử lý mục đích trên, đó là Spotlight. 
### 1. Gradle
- Đầu tiên chúng ta phải implement library trong file Gradle: 
```
dependencies {
    implementation 'com.github.takusemba:spotlight:x.x.x'
}
``` 
### 2. Create Target Object
- Tiếp theo, chúng ta sẽ tạo một đối tượng được cung cấp bởi Spotlight đó là Target object, mỗi đối tượng này tương ứng với các thành phần mà chúng ta muốn làm nổi bật để hướng dẫn trong ứng dụng 
- Đối tượng này sẽ được đặt các thuộc tính như bên dưới 
```
val target = Target.Builder()
		    .setAnchor(view)
		    .setShape(Circle(100f))
		    .setEffect(RippleEffect(100f, 200f, argb(30, 124, 255, 90)))
		    .setOverlay(layout)
		    .setOnTargetListener(object : OnTargetListener {
		      override fun onStarted() {
			makeText(this@MainActivity, "first target is started", LENGTH_SHORT).show()
		      }
		      override fun onEnded() {
			makeText(this@MainActivity, "first target is ended", LENGTH_SHORT).show()
		      }
		    }).build()
``` 
- Với setAnchor(view) thì view chính là thành phần chúng ta muốn hướng dẫn 
- setShape() tạo hình để spotlight cho các thành phần chúng ta muốn hướng dẫn 
- setEffect() tạo hiệu ứng kết hợp với shape đã được set 
- setOverlay(layout) thì layout sẽ là layout mà chúng ta muốn overlay để làm nổi bật các thành phần khác 
### 3. Create Spotlight Object
- Sau khi đã có các đối tượng Target, chúng ta sẽ dùng các đối tượng đó đặt vào trong đối tượng Spotlight,  sau đó ta sẽ có thể thực hiện quá trình tiếp theo 
```
val spotlight = Spotlight.Builder(activity)
		    .setTargets(firstTarget, secondTarget, thirdTarget ...)
		    .setBackgroundColor(R.color.spotlightBackground)
		    .setDuration(1000L)
		    .setAnimation(DecelerateInterpolator(2f))
		    .setOnSpotlightListener(object : OnSpotlightListener {
		      override fun onStarted() {
			Toast.makeText(this@MainActivity, "spotlight is started", Toast.LENGTH_SHORT).show()
		      }
		      override fun onEnded() {
			Toast.makeText(this@MainActivity, "spotlight is ended", Toast.LENGTH_SHORT).show()
		      }
		    }).build() 
```
###  4. Start/Finish Spotlight
- Khi đã có đối tượng Spotlight, chúng ta có thể start hoặc finish đối tượng này 
```
spotlight.start()
spotlight.finish()
```
### 5. 	Next/Previous/Show Target
- Đối với các đối tượng Spotlight có nhiều Target, chúng ta có thể next hoặc previous để chuyển đối tượng Target, hoặc có thể chỉ định Target nào được show  
```
	spotlight.next()
	spotlight.previous()
	spotlight.show(index of target)
```
### 6. Custom Shape
- Chúng ta cũng có thể custom một shape theo ý muốn để set shape cho các đối tượng Target 
```
class CustomShape(
		    override val duration: Long,
		    override val interpolator: TimeInterpolator
		) : Shape {
 		  override fun draw(canvas: Canvas, point: PointF, value: Float, paint: Paint) {
		    // draw your shape here.
		  }
		}
```
### 7. Custom Effect
- Ngoài ra các effect cũng có thể được chúng ta custom lại theo ý muốn để set effect cho các đối tượng Target 
```
class CustomEffect(
		    override val duration: Long,
		    override val interpolator: TimeInterpolator,
		    override val repeatMode: Int
		) : Effect {
 		  override fun draw(canvas: Canvas, point: PointF, value: Float, paint: Paint) {
		    // draw your effect here.
		  }
		}
```

![](https://images.viblo.asia/d3f72156-c9e3-4fc7-a2e8-4365ce8d61c2.gif)

### 8. Conclusion 
- Như vậy, chúng ta đã tìm hiểu xong cách để hướng dẫn người dùng sử dụng ứng dụng trong lần đầu tiên mở  ứng dụng, bằng thư viện rất dễ sử dụng và hiệu quả là Spotlight. 
- Cảm ơn các bạn đã theo dõi, xin hẹn gặp lại.
- Link Demo: https://github.com/TakuSemba/Spotlight/tree/master/app
- Nguồn tham khảo lấy trực tiếp từ thư viện Spotlight:  https://github.com/TakuSemba/Spotlight/blob/master/README.md