Hôm nay mình sẽ hướng dẫn mọi người vẽ ra một customview hình mặt đồng hồ như hình bên dưới:
![](https://images.viblo.asia/be58b1e9-749e-41f3-8c4e-4d10163d6c71.png)
Trước tiên, chúng ta sẽ tìm hiểu sơ qua một chút về customview, sau đó sẽ bắt tay vào thực hiện.
### **Giới thiệu Customview**
Android cung cấp một loạt các thành phần giao diện như TextView, EditText, ImageView, ... để áp ứng nhu cầu xây dựng giao diện của ứng dụng. Các đối tượng trên Android như TextView, EditText, ImageView đều được vẽ trên canvas của hệ thống Android. Tuy nhiên, có những trường hợp bạn cần phải triển khai một giao diện tùy chỉnh không có sẵn trong hệ thống. Lúc này bạn cần Customview. 
### **Cách khởi tạo Customview**
Để tạo ra một customview, chúng ta phải tạo một class class kế thừa từ lớp View và implement ít nhất một contructor của lớp cha.  Override lại hai method là onDraw(), onMeasure()  và sử dụng Paint và Canvas để vẽ trên View.
### **Canvas**
Canvas được xem như là một bề mặt (hình dung như tờ giấy, bảng) mà chúng ta có thể vẽ bất cứ thứ gì lên đó. 
Ví dụ như vẽ một điểm, đường thẳng, hình chữ nhật, đường tròn, elip, văn bản, hay thậm chí là một hình ảnh và các hình ảnh phức tạp khác nữa.
Canvas trong Android có cung cấp cho chúng ta các method để vẽ tất cả các đối tượng như sau:
* Các đối tượng hình học cơ bản (point, line, oval, rect..)
* Vẽ hình ảnh (bitmap, drawable)
* Vẽ Path (Tập hợp các điểm)
* Vẽ Text
### **Paint**
Paint trong Android dùng để định nghĩa size, color, kiểu nét vẽ mà chúng ta sẽ sử dụng để vẽ bởi canvas (truyền vào method canvas.draw… trong phương thức onDraw của View).
Các phương thức được sử dụng phổ biến:
* setColor(int color); set màu cho nét vẽ.
* setAlpha(int a); set giá trị Alpha cho nét vẽ. Chỉ chấp nhận các giá trị từ 0 đến 255. Thường sử dụng để làm animation fade in và fade out.
* setStrokeWidth(float width); set giá trị độ rộng của nét vẽ.
* setStyle(Style style); set style cho nét vẽ. Có ba giá trị như sau:
    *     Paint.Style.FILL: Kiểu này dùng để tô đối tượng, ví dụ như tô hình tròn, elip, oval.
    *     Paint.Style.STROKE. Kiểu này dùng để vẽ đường. ví dụ như vẽ đường tròn mà không có tô.
    *     Paint.Style.FILL_AND_STROKE: Kiểu vừa vẽ vừa tô.
* setStrokeCap(Cap cap); set style vẽ ở những điểm kết thúc của hai đường thẳng và có những giá trị sau:
    + Cap.ROUND: Bo tròn nét vẽ ở hai đầu mút của đoạn thẳng.
    + Cap.SQUARE: Vẽ nét vẽ bình thường. Nét vẽ sẽ sắc cạch ở hai đầu mút của đoạn thẳng.
### **Draw ClockView**
* Tạo class ClockView, kế thừa từ lớp View. Ở đây, mình implement constructor có 2 tham số của view là Context và AttributeSet.
```
class ClockView(context: Context, attrs: AttributeSet) : View(context, attrs)
```
* Khai báo một số biến cần thiết trong quá trình vẽ.
```
 //Biến chiều rộng của view
    private var clockWidth = 0
    //Biến chiều cao của view
    private var clockHeight = 0
    //Paint dùng để vẽ viền ngoài của đồng hồ
    private var paintCircle: Paint
    //Paint dùng để vẽ kim giờ
    private var paintHour: Paint
    //Paint dùng để vẽ kim phút
    private var paintMinute: Paint
    //Paint dùng để vẽ kim giây
    private var paintSecond: Paint
    //Paint dùng để vẽ số
    private var paintText: Paint
```
* Sau đó khởi tạo các thuộc tính của các paint tương ứng.
```
     paintCircle = Paint().apply {
            color = Color.GREEN
            strokeWidth = 10f
            isAntiAlias = true
            style = Paint.Style.STROKE
        }
        paintText = Paint().apply {
            color = Color.BLUE
            strokeWidth = 10f
            textAlign = Paint.Align.CENTER
            textSize = 40f
        }
        paintHour = Paint().apply {
            strokeWidth = 20f
            color = Color.BLUE
        }
        paintMinute = Paint().apply {
            strokeWidth = 15f
            color = Color.BLUE
        }
        paintSecond = Paint().apply {
            strokeWidth = 10f
            color = Color.BLUE
        }
```
* Tại hàm onMeasure(), chúng ta thực hiện tính chiều rộng và chiều cao của view.
```
 override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec)
        clockWidth = getDefaultSize(suggestedMinimumWidth, widthMeasureSpec)
        clockHeight = getDefaultSize(suggestedMinimumHeight, heightMeasureSpec)
        setMeasuredDimension(clockWidth, clockHeight)
    }
```
* Tiếp theo, chúng ta sẽ thực hiện vẽ đồng hồ trong hàm onDraw(). 
Đầu tiên là phần viền của đồng hồ và phần chấm tròn tâm ở giữa. 
```
  override fun onDraw(canvas: Canvas?) {
        super.onDraw(canvas)
        val circleRadius = 400f
        //vẽ viền bên ngoài
        canvas?.drawCircle(clockWidth / 2f, clockHeight / 2f, circleRadius, paintCircle)
        //vẽ tâm ở giữa
        canvas?.drawCircle(clockWidth / 2f, clockHeight / 2f, 20f, paintCircle)
```
* Tiếp theo chúng ta sẽ vẽ các số trên mặt đồng hồ từ 1 đến 12. Ở đây mình có gọi hàm save() và restore() của canvas để lưu lại những gì đã vẽ và trở lại trạng thái ban đầu trong mỗi lần rotate.
```
 for (i in 1..12) {
            canvas?.save()
            canvas?.rotate(30f * i, clockWidth / 2f, clockHeight / 2f)
            canvas?.drawLine(
                clockWidth / 2f,
                clockHeight / 2 - circleRadius,
                clockWidth / 2f,
                clockHeight / 2 - circleRadius + 30,
                paintCircle
            )
            canvas?.drawText(
                "${i}",
                clockWidth / 2f,
                clockHeight / 2 - circleRadius + 70,
                paintText
            )
            canvas?.restore()
        }
```
* Để đồng hồ thêm sinh động và thực tế hơn, mình sẽ sử dụng Calendar và Handler để xử lý đồng hồ có thể chạy chính xác như thời gian thực.
```
class ClockView(context: Context, attrs: AttributeSet) : View(context, attrs), Handler.Callback {
```
```
    private var calendar: Calendar
    private val clockHandler: Handler = Handler(Looper.myLooper()!!, this)
```
```
override fun handleMessage(msg: Message): Boolean {
        when (msg.what) {
            NEED_INVALIDATE -> {
                calendar = Calendar.getInstance()
                invalidate()
                clockHandler.sendEmptyMessageDelayed(NEED_INVALIDATE, 1000)
            }
        }
        return true
    }
     companion object {
        private const val NEED_INVALIDATE = 888
    }
```
* Trở lại hàm onDraw(), mình sẽ lấy thông tin thời gian hiện tại từ Calendar.
```
        val minute = calendar.get(Calendar.MINUTE)
        val hour = calendar.get(Calendar.HOUR)
        val sec = calendar.get(Calendar.SECOND)
```
* Sau đó, mình sẽ vẽ kim phút đầu tiên:
```
 val minuteDegree = minute / 60f * 360
        canvas?.save()
        canvas?.rotate(minuteDegree, clockWidth / 2f, clockHeight / 2f)
        canvas?.drawLine(
            clockWidth / 2f,
            clockHeight / 2f - 250,
            clockWidth / 2f,
            clockHeight / 2f + 40,
            paintMinute
        )
        canvas?.restore()
```
* Tiếp đến là kim giờ:
```
 val hourDegree = (hour * 60 + minute) / 12f / 60 * 360
        canvas?.rotate(hourDegree, clockWidth / 2f, clockHeight / 2f)
        canvas?.save()
        canvas?.drawLine(
            clockWidth / 2f,
            clockHeight / 2f - 200,
            clockWidth / 2f,
            clockHeight / 2f + 30,
            paintHour
        )
        canvas?.restore()
```
* Và sau cùng là kim giây:
```
canvas?.restore()
        val secDegree = sec / 60f * 360
        canvas?.save()
        canvas?.rotate(secDegree, clockWidth / 2f, clockHeight / 2f)
        canvas?.drawLine(
            clockWidth / 2f,
            clockHeight / 2f - 300,
            clockWidth / 2f,
            clockHeight / 2f + 40,
            paintSecond
        )
        canvas?.restore()
```
* Cuối cùng là khai báo view trong xml và run và xem lại thành quả nhé.
```
<com.example.customcircularapplication.ClockView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"/>
```
Cảm ơn mọi nguời đã đọc đến đây, chúc mọi người thành công ^-^ !