# Giới thiệu
Trong bài viết này sẽ hướng dẫn vẽ trên Canvas.
- Tạo Custom View hay ViewGroup không bắt buộc. Tuy nhiên có 1 số lí do sau ta nên xem xét để tạo custom view:
+ Tạo UI và animation mà các widget hiện tại không có
+ Tạo component có thể sử dụng lại
+ Tránh tạo deeply nested hierarchies cải thiện performance.
# Các công cụ cần thiết để tạo custom view
1. Canvas: chứa các phương thức vẽ các hình cơ bản. Việc vẽ được thực hiện trên bitmap - sau đó bitmap được hiển thị trên màn hình.
2. Paint: để quy định canvas sẽ vẽ như thế nào(style, color, font text, text size...). Ta có thể tưởng tượng paint như một cây cọ vẽ
3. Path: để vẽ những hình học phức tạp
4. Bitmap: chứa tập hợp pixel
Việc vẽ sẽ được thực hiện thông qua canvas, vậy canvas được lấy từ đâu. Ta sẽ extend View và overide phương thức onDraw()
```
class CustomView : View {

    constructor(context: Context?) : super(context)
    constructor(context: Context?, attrs: AttributeSet?) : super(context, attrs)
    constructor(context: Context?, attrs: AttributeSet?, defStyleAttr: Int) : super(context, attrs, defStyleAttr)
    constructor(context: Context?, attrs: AttributeSet?, defStyleAttr: Int, defStyleRes: Int) : super(context, attrs, defStyleAttr, defStyleRes)

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
    }

}
```
# Canvas
Vậy canvas trông như thế nào?
![](https://images.viblo.asia/fc392fcd-3d6b-4abb-a179-bc9b16ccf0d0.png)

1. Vị trí của CustomView trong view cha không phải là vấn đề
2. Trên-Trái của view luôn luôn có tọa độ (0,0)
3. X tăng dần về bên phải
4. Y tăng dần xuống dưới

- Lưu ý: tránh tạo object trong phương thức onDraw() vì phương thức này được gọi nhiều lần nên sẽ ảnh hưởng đến hiệu năng
- Khi ta muốn custom view thực hiện vẽ lại thì ta sẽ gọi phương thức invalidate() hoặc invalidate(Rect rect).
# Vẽ TicTacToe Lines
- Ta sẽ tạo Paint object để vẽ bàn cờ TicTacToe
```
private val paint = Paint()
paint.color = ContextCompat.getColor(context, R.color.colorPrimary) paint.isAntiAlias = true 
paint.style = Paint.Style.STROKE 
paint.strokeWidth = resources.displayMetrics.density * 5//line width
```
- Để vẽ đường thẳng trong canvas thực hiện rất đơn giản. Ta chỉ cần chỉ ra điểm đầu, điểm cuối và sử dụng paint object để vẽ
```
drawLine(float startX, float startY, float stopX, float stopY, Paint paint)
```
- Ta sẽ vẽ các đường dọc của bàn cờ như sau
![](https://images.viblo.asia/aadb3d74-97b7-4e41-aedc-7acfa31e537f.jpeg)
```

val X_PARTITION_RATIO = 1 / 3f    
...
    private fun drawVerticalLines(canvas: Canvas) {
        canvas.drawLine(width * X_PARTITION_RATIO, 0f, width * X_PARTITION_RATIO, 
        height.toFloat(), paint);
        canvas.drawLine(width * (2 * X_PARTITION_RATIO), 0f, width * (2 * X_PARTITION_RATIO),
        height.toFloat(), paint);
    }
```
- Ta thực hiện tương tự để vẽ các đường ngang của bàn cờ
```
    val X_PARTITION_RATIO = 1 / 3f
    val Y_PARTITION_RATIO = 1 / 3f
    ...
    private fun drawVerticalLines(canvas: Canvas) {
        canvas.drawLine(width * X_PARTITION_RATIO, 0f, width * X_PARTITION_RATIO, height.toFloat(), paint)
        canvas.drawLine(width * (2 * X_PARTITION_RATIO), 0f, width * (2 * X_PARTITION_RATIO), height.toFloat(), paint)
    }

    private fun drawHorizontalLines(canvas: Canvas) {
        canvas.drawLine(0f, height * Y_PARTITION_RATIO, width.toFloat(), height * Y_PARTITION_RATIO, paint)
        canvas.drawLine(0f, height * (2 * Y_PARTITION_RATIO), width.toFloat(), height * (2 * Y_PARTITION_RATIO), paint)
    }
```
- Ta sẽ gọi các phương thức trên trong phương thức onDraw()
```
...
override fun onDraw(canvas: Canvas) {
    super.onDraw(canvas)
    drawVerticalLines(canvas)
    drawHorizontalLines(canvas)
}
```
# Xác định các ô vuông của bàn cờ
- Bàn cờ sẽ gồm 9 ô vuông:
![](https://images.viblo.asia/21632493-3e04-4baf-bf9a-6d65ec5a3152.png)
- Ta sẽ sử dụng Rect để lưu tọa độ của 9 ô vuông trên
- Rect chứa 4 điểm là tọa độ của ô vuông (left, top, right, bottom)
```
Rect(int left, int top, int right, int bottom)
```
- Với Rect ta sẽ dễ dàng kiểm tra 1 điểm có nằm trong ô vuông hay không
```
private lateinit var squares: Array<Array<Rect>>
  private lateinit var squareData: Array<Array<String>>
 ...
 private fun initializeTicTacToeSquares() {
        squares = Array(3, { Array(3, { Rect() }) })
        squareData = Array(3, { Array(3, { "" }) })

        val xUnit = (width * X_PARTITION_RATIO).toInt() // one unit on x-axis
        val yUnit = (height * Y_PARTITION_RATIO).toInt() // one unit on y-axis

        for (j in 0..COUNT - 1) {
            for (i in 0..COUNT - 1) {
                squares[i][j] = Rect(i * xUnit, j * yUnit, (i + 1) * xUnit, (j + 1) * yUnit)
            }

        }
```
# Vẽ Text trong ô vuông
- Ta sẽ vễ "X, O" trong ô vuông bằng phương thức sau:
```
drawText(String text, float x, float y, Paint paint)
```
```
private fun drawTextInsideRectangle(canvas: Canvas, rect: Rect, str: String) {
        val textX = (rect.exactCenterX())
        val textY = (rect.exactCenterY())
        canvas.drawText(str, textX, textY, textPaint)
    }
```
- Sau khi thực hiện vẽ text ta sẽ được kết quả như sau:
![](https://images.viblo.asia/ec1dfa50-58be-4c9a-a420-71ad1307da77.png)
Ta thấy text không được vẽ ở giữa hình vuông.
# Text được vẽ như thế nào
![](https://images.viblo.asia/b2add024-4c92-4f19-9236-a7d5da340102.png)
1. Canvas sẽ xác định tọa độ x, y truyền vào là điểm trái-dưới của text để vẽ, như điểm xanh hình trên
2. Ta sẽ tính toàn và đưa text vào điểm giữa của hình vuông
3. Paint.measureText() phương thức này sẽ trả về chiều rộng của text
4. Paint.fontMetrics.ascent sẽ trả về chiều cao của text trên base line dưới dạng số âm
![](https://images.viblo.asia/e9dab306-399e-41b1-af4e-549c624a42fb.png)
```
private fun drawTextInsideRectangle(canvas: Canvas, rect: Rect, str: String) {
        val xOffset = textPaint.measureText(str) * 0.5f
        val yOffset = textPaint.fontMetrics.ascent * -0.4f
        val textX = (rect.exactCenterX()) - xOffset
        val textY = (rect.exactCenterY()) + yOffset
        canvas.drawText(str, textX, textY, textPaint)
    }
```
- và ta được kết quả như dưới đây
![](https://images.viblo.asia/731438ef-cd7a-463d-b879-80bde646c033.png)

[src](https://medium.com/mindorks/building-a-customview-tictactoe-6afa054df928)