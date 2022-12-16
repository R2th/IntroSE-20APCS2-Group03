# I. Dẫn nhập
* Xin chào các bạn, trước đây mình đã từng có 1 bài viết giới thiệu về [Canvas](https://viblo.asia/p/tim-hieu-toan-dien-ve-android-canvas-3Q75w1ABZWb) và hôm nay mình sẽ tiếp tục đăng một bài mới với nội dung là làm sao để tối ưu hóa việc sử dụng canvas trong custom view.
* Nội dung của bài này được mình tham khảo các ý chính tại [đây](https://medium.com/rosberryapps/make-your-custom-view-60fps-in-android-4587bbffa557), mình sẽ dẫn ra các ví dụ cụ thể trong bài viết để các bạn có thể hiểu rõ hơn.
# II. Nội dung chính
### 1. Luôn tái sử dụng các object trong chu kỳ draw, đặc biệt là đối tượng như Canvas, Bitmap, Paint, Path
* Chúng ta luôn biết rằng, việc tạo mới các object sẽ gây lãng phí bộ nhớ và làm cho custom view trở nên nặng nề một cách không cần thiết. Bên cạnh đó, nếu chúng ta liên tục tạo ra nhưng không thể quản lý các object này thì sẽ dẫn đến các exception không đáng có. Việc tái sử dụng sẽ giúp cho chúng ta tận dụng tốt các thông tin cũng như cấu hình sẵn có của các object này. Như ví dụ dưới đây:
```kotlin
override fun onDraw(canvas: Canvas) {
    drawGanttChart(canvas)
    drawTimeLine(canvas)
    drawCurrentTimeLine(canvas)
}
```
> Với mỗi chu kỳ onDraw thì đối tượng canvas luôn được tái sử dụng cho các function 	 drawGanttChart(),  drawTimeLine(),  drawCurrentTimeLine().
### 2. Hạn chế thay đổi cài đặt cho các phương thức của Paint class
* Việc liên tục thay đổi cài đặt cho các phương thức của Paint class (ví dụ như setColor(), setStrokeWidth()….) sẽ dẫn đến tốn khá nhiều thời gian cho việc tính toán để vẽ view.
* Chúng ta hãy để ý đến UI như sau:

![](https://images.viblo.asia/bdcaee80-b8d1-42b1-926f-e36c90979f71.png)

* Như các bạn thấy, UI sẽ có các dòng trắng và xám xen kẽ nhau theo thứ tự chẵn - xám và lẻ – trắng. Thông thường khi hiện thực UI này với canvas, chúng ta sẽ tạo 1 đối tượng Paint và thay đổi cài đặt của phương thức setColor() tương ứng với dòng chẵn hoặc lẻ:
```kotlin
private val paint by lazy {
    Paint().apply {
        style = Paint.Style.FILL
        isAntiAlias = true
    }
}

// Do something

lists.forEachIndexed { index, item →
	paint.color = if (index % 2 == 0) {
        getColor(R.color.grey)
    } else {
        getColor(R.color.white)
    }
    canvas.drawRect(left, top, right, bottom, paint)
}
```
* Với khối lượng dữ liệu lớn, việc hiện thực như trên sẽ gây tốn nhiều thời gian để tính toán vẽ view hơn. Cách hiện thực tối ưu là chúng ta có thể tạo ra 2 đối tượng Paint để phục vụ cho việc vẽ:
```kotlin
private val paint1 by lazy {
    Paint().apply {
        color = getColor(R.color.grey)
        style = Paint.Style.FILL
        isAntiAlias = true
    }
}

private val paint2 by lazy {
    Paint().apply {
        color = getColor(R.color.white)
        style = Paint.Style.FILL
        isAntiAlias = true
    }
}

// Do something

lists.forEachIndexed { index, item →
	val paint = if (index % 2 == 0) {
        paint1
    } else {
        paint2
    }
    canvas.drawRect(left, top, right, bottom, paint)
}
```
### 3. Ưu tiên sử dụng dữ liệu kiểu nguyên thủy
* Với các hàm để vẽ cần có tham số đầu vào (ví dụ như drawRoundRect(), drawArc()...) thì việc ưu tiên sử dụng dữ liệu kiểu nguyên thủy sẽ nâng cao hiệu suất tính toán của hệ thống. Ví dụ thay vì chọn:
```kotlin
public void drawRoundRect(@NonNull RectF rect, float rx, float ry, @NonNull Paint paint) {
        super.drawRoundRect(rect, rx, ry, paint);
    }
```
thì chúng ta nên sử dụng:
```kotlin
public void drawRoundRect(float left, float top, float right, float bottom, float rx, float ry,
            @NonNull Paint paint) {
        super.drawRoundRect(left, top, right, bottom, rx, ry, paint);
    }
```
### 4. Tách biệt việc thao tác dữ liệu ra khỏi các hàm draw
* Việc chúng ta lồng ghép tính toán, thao tác dữ liệu trong các hàm draw sẽ gây ra các khoảng delay cho các hàm draw dẫn tới việc gây mất frame trong quá trình các hàm này được khởi chạy. Hãy nhớ các hàm draw chỉ nên làm duy nhất một việc là vẽ các thành phần lên UI và việc thao tác dữ liệu cần được thực hiện ở nơi khác.
* Để đo đạc thời gian hoàn thành của một chu kỳ draw, chúng ta có thể tạo một class như sau:
```kotlin
class DrawPerformanceTester(private val measureDrawTime: Boolean = true) {
    var drawSamplesCount = 0L
    var drawTotalTime = 0L

    private var startTime: Long = 0L

    fun startMeasure() {
        if (!measureDrawTime)
            return
        startTime = System.currentTimeMillis()
    }

    fun endMeasure() {
        if (!measureDrawTime)
            return
        val endTime = System.currentTimeMillis()
        val totalTime = endTime - startTime
        ++drawSamplesCount
        drawTotalTime += totalTime
        val drawAverageTime = drawTotalTime.toFloat() / drawSamplesCount.toFloat()
        Log.d("AppLog", "currentTime:$totalTime average:$drawAverageTime")
    }
}
```
* Sử dụng ở trong onDraw()
```kotlin
private val performanceTester = DrawPerformanceTester(true)

// Do something

override fun onDraw(canvas: Canvas) {
        performanceTester.startMeasure()
        drawGanttChart(canvas)
        drawTimeLine(canvas)
        drawCurrentTimeLine(canvas)
        performanceTester.endMeasure()
    }
```
# III.Kết
* Hy vọng thông qua nội dung bài viết này, các bạn sẽ có thêm những kiến thức bổ ích về canvas trong Android. Hẹn gặp lại các bạn trong bài viết sau!