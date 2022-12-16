## Mở đầu
Ở bài trước mình đã chia sẽ [cách tạo Semi Circular Progress trên **iOS**](https://viblo.asia/p/tao-semi-circular-progress-cho-ios-Az45bRPO5xY), và bài lần này mình sẽ chia sẽ cách làm đối với **Android**

Ở **Android** ta có thể vẽ lại View ở hàm **onDraw(canvas:)**, và để vẽ đường tròn khuyết cho progress ta sẽ dùng 1 class rất hữu dụng là **Paint** cho phép định nghĩa các thuộc tính về màu sắc, kích thước, nét vẽ... được vẽ bằng **Canvas**.

## Demo
![](https://images.viblo.asia/ff4179d9-9eb1-431a-aef6-62e2cdc100b5.gif)
<div align="center">Demo trên Android</div>

## Thực hiện
### Tạo Custom View
Tạo 1 project mới để demo, từ file dự án tạo file **SemiCircleView** kế thừa **View**. Ta sẽ tiến hành vẽ Progress trên CustomView này ở hàm **onDraw(canvas:)**

Ta sẽ cần 2 paint, 1 cho background màu xám ở dưới và 1 cho phần màu xanh thay đổi được nên ta sẽ tạo ra 2 **Paint** lần lượt là **backgroundPaint** và **mainPaint**, ngoài ra ta sẽ lưu trữ lại giá trị **progress** để khi hàm onDraw được gọi lại sẽ vẽ lại đúng giá trị mong muốn.
```kotlin
class SemiCircleView constructor(
    context: Context, attrs: AttributeSet
) : View(context, attrs) {
    private var backgroundPaint: Paint = Paint()
    private var mainPaint: Paint = Paint()
    private var progress: Float = 0f
    private var margin: Float = resources.getDimension(R.dimen.circle_margin) // Lề cho progress, 6dp
}
```
### Hàm cài đặt cho CustomView
Tạo hàm setup với tham số colorRes để truyền vào màu progress mong muốn, sau khi setup paint gọi hàm invalidate để View tiến hành vẽ lại (gọi hàm **onDraw**)
```kotlin
fun setupUI(colorRes: Int) {
        setupPaint(backgroundPaint, R.color.circle_background)
        setupPaint(mainPaint, colorRes)
        invalidate()
    }
```
**setupPaint** sẽ thực hiện set các thuộc tính màu sắc, nét vẽ cho Paint
```kotlin
private fun setupPaint(paint: Paint, colorRes: Int) {
        paint.isAntiAlias = true // Giúp các viền của view mịn màng hơn
        paint.color = ContextCompat.getColor(context, colorRes) // Màu của đường tròn
        paint.style = Paint.Style.STROKE // Chọn dạng stroke
        paint.strokeCap = Paint.Cap.ROUND // Hình dạng 2 đầu paint (ROUND là bo tròn)
        paint.strokeWidth =
            resources.getDimension(R.dimen.circle_width) // 12dp, Độ rộng của đường tròn
    }
```
Tiếp theo ở hàm onDraw ta sẽ tiến hành vẽ canvas cho nền và progress dựa trên **backgroundPaint** và **mainPaint**
```kotlin
@SuppressLint("DrawAllocation")
override fun onDraw(canvas: Canvas?) {
        super.onDraw(canvas)
        val frame = RectF(margin, margin,
            width.toFloat() - margin,
            height.toFloat() - margin) // Set khoảng cách viền margin cho đường tròn không bị tràn lề
        canvas?.drawArc(
            frame, // Khung bao quanh đường tròn
            135f, // Góc bắt đầu vẽ, tính theo độ, full là 360
            255f, // Độ dài cung vẽ
            false, // Có sử dụng tâm để vẽ không
            backgroundPaint
        ) // Chọn paint vẽ
        canvas?.drawArc(frame, 135f, progress * 255f, false, mainPaint) // Vẽ progress
}
```
Cuối cùng ta sẽ viết hàm để thay đổi giá trị progress
```kotlin
fun setProgress(v: Float) {
        val currentProgress = this.progress
        val animator = ValueAnimator().apply { // Thực hiện hiệu ứng chuyển động khi thay đổi progress
            setValues(PropertyValuesHolder.ofFloat(
                "percent",
                currentProgress,v
            ))
            duration = 300
            interpolator = AccelerateDecelerateInterpolator()

            addUpdateListener {
               val newValue = it.getAnimatedValue("percent") as Float
                this@SemiCircleView.progress = newValue
                invalidate()
            }
        }
        animator.start()
    }
```
### Demo
Ở layout **activity_main** ta thêm **SemiCircleView** (id = circle_view) vừa tạo vào giữa view cha, đặt kích thước 200 x 200, sau đó thêm 1 Textview hiển thị giá trị progress và 1 button để thay đổi progress.

Ở **MainActivity** tại hàm **onCreate** ta lần lượt setup circleVuew và gọi hàm setProgress mỗi khi click button sẽ có được giao diện như demo phía trên.
```kotlin
@SuppressLint("SetTextI18n")
override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val circleView = findViewById<SemiCircleView>(R.id.semi_circle_view)
        val progressTv = findViewById<AppCompatTextView>(R.id.progress_tv)
        val changeProgressButton = findViewById<AppCompatButton>(R.id.change_progress_button)

        circleView.setupUI(R.color.circle_foreground)
        changeProgressButton.setOnClickListener {
            val progress = Random.nextInt(0,100)
            progressTv.text = "$progress %"
            circleView.setProgress(progress/100f)
        }
    }
```
## Kết thúc
Bài viết này mình đã chia sẻ về cách đơn giản để tạo 1 Progress Bar tròn khuyết dùng **Paint** và vẽ **Canvas**, mong rằng chia sẻ này sẽ giúp ích cho các bạn.

Xin cảm ơn các bạn đã dành thời gian đọc bài viết và nếu thấy bổ ích hãy cho mình +1 đánh giá động viên nhé!