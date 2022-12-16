# Xử lý touch event
- Trong bài trước ta đã vẽ được text trong từng ô, tiếp theo ta cần xác định được sẽ vẽ text nào ở mỗi ô vuông. Để làm được điều đó ta sẽ cần xác định được touch event ở mỗi ô vuông.
## Tìm hiểu Android Touch Event System
![](https://images.viblo.asia/1cd94568-bba2-42c4-8e2e-f3d9a4cefb90.png)

- Trong ảnh trên, khi người dùng touch vào view touch event sẽ được thể hiện dưới dạng MotionEvent object. Object này chứa các thông tin về touch event như action, location, time, số pointer

![](https://images.viblo.asia/3911a7e3-6942-4440-bea6-cd4a3d6d253e.png)

- Touch event sẽ diễn ra trong 2 phase. Ở phase đầu, tất cả các view bound chứa điểm touch event sẽ được thông báo về event xảy ra. Nó sẽ được thông báo theo thứ tự từ Activity rồi đến các view con của Activity như ViewGroup, View. Để gửi event xuống thì hệ thống sẽ gọi phương thức *dispatchTouchEvent()*. 
- Thứ tự thông báo event có thể bị bẻ gãy bởi bất kì view nào bằng cách dùng phương thức *onInterceptTouchEvent()*(chỉ cần trả về true)
- Khi view target nhận được thông báo về event thì chúng sẽ xử lý ở function *onTouchEvent*
- Nếu *onTouchEvent()* return *true* thì touch event sẽ kết thúc tại đây.
- Nếu target view không xử lý sự kiện touch event thì thứ tự thực hiện sẽ từ bottom to top, Nếu không view nào xử lý thì activity sẽ có cơ hội xử lý event
[xem ở link sau để biết thêm chi tiết](https://speakerdeck.com/newcircle/dave-smith-mastering-the-android-touch-system)
- Tiếp theo ta sẽ implement *onTouchEvent()* trong *TicTacToeView* để xử lý touch event
```
override fun onTouchEvent(event: MotionEvent): Boolean {
    val x = event.x 
    val y = event.y 
    when (event.action) { 
        MotionEvent.ACTION_DOWN -> {
   
        }
        MotionEvent.ACTION_MOVE -> {
 
        }
        MotionEvent.ACTION_UP -> {         

        }
        MotionEvent.ACTION_CANCEL -> {
         
        }

    }
    return true
}
```
- event.x và event.y là tọa độ điểm người dùng touch trên màn hình
- Sự kiện bắt đầu với event action down và kết thúc với event action up
- Khi người dùng chạm ngón tay lên màn hình thì ACTION_DOWN được gọi cùng với tọa độ x, y
- ACTION_MOVE được gọi khi người dùng di chuyển ngón tay của họ trên màn hình điện thoại
- ACTION_UP được gọi khi người dùng nhấc ngón tay ra khỏi màn hình điện thoại
**Lưu ý: Nếu ta return false ở action down thì sẽ không nhận được bất kì event nào khác**
## Bắt sự kiện touch event và hightlight ô vuông
- Ta sẽ lấy được thông tin x, y của touch event tại action down, sau đó ta sẽ check trong *squares* array xem ô vuông nào được click và ta sẽ hightlight ô vuông đó
- Ta sẽ sử dụng function *rect.contains(x, y)* để kiểm tra tọa độ điểm x, y có thuộc ô vuông hay không
```
fun getRectIndexesFor(x: Float, y: Float): Pair<Int, Int> {
        squares.forEachIndexed {
            i, rects ->
            for ((j, rect) in rects.withIndex()) {
                if (rect.contains(x.toInt(), y.toInt()))
                    return Pair(i, j)
            }
        }
        return Pair(-1, -1) // x, y do not lie in our view
    }
```
- Ta sẽ sử dụng phương thức trên trong action down. Ta cũng sẽ sử dụng biến *touching* để kiểm tra xem người dùng đã nhấc ngón tay khỏi màn hình điện thoại hay chưa
- Tiếp theo ta gọi phương thức *invalidate(rect: Rect)* tại action up để thông báo view vẽ lại phần ô vuông đó
```
var rectIndex = Pair(0, 0)
var touching: Boolean = false
..
..
MotionEvent.ACTION_DOWN -> {
    rectIndex = getRectIndexesFor(x, y)
    touching = true
    invalidate(squares[rectIndex.first][rectIndex.second])
}
MotionEvent.ACTION_UP -> {
    touching = false
    invalidate(squares[rectIndex.first][rectIndex.second])
}
```
- Tiếp theo trong *onDraw()* ta kiểm tra *touching* nếu là true ta sẽ hightlight ô vuông tại rectIndex
```
..
     highLightPaint.color = ContextCompat.getColor(context, R.color.highlight_color)
     highLightPaint.style = Paint.Style.FILL
     highLightPaint.isAntiAlias = true
 ..
 
 override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        drawVerticalLines(canvas)
        drawHorizontalLines(canvas)
        
        if (touching) {
            drawHighlightRectangle(canvas)
        }
    }
    
    private fun drawHighlightRectangle(canvas: Canvas) {
        canvas.drawRect(squares[rectIndex.first][rectIndex.second], highLightPaint)
    }
```
- Tiếp theo ta cần xác định là người dùng click hay di chuyển ngón tay
```
MotionEvent.ACTION_UP -> {
    touching = false
    invalidate(squares[rectIndex.first][rectIndex.second])
    val (finalX1, finalY1) = getRectIndexesFor(x, y)
    if ((finalX1 == rectIndex.first) && (finalY1 == rectIndex.second)) { // if initial touch and final touch is in same rectangle or not
        squarePressListener?.onSquarePressed(rectIndex.first, rectIndex.second)
    }
}
```
- Activity sẽ implement function *onSquarePressed()* và xác định *TicTacToeView* vẽ *X hay O*
```
val moveX = "X"
val moveY = "O"
..
fun drawXAtPosition(x: Int, y: Int) {
    squareData[x][y] = moveX
    invalidate(squares[x][y])
}

fun drawOAtPosition(x: Int, y: Int) {
    squareData[x][y] = moveY
    invalidate(squares[x][y])
}
```
```
override fun onDraw(canvas: Canvas) {
    super.onDraw(canvas)
    drawVerticalLines(canvas)
    drawHorizontalLines(canvas)
    drawSquareStates(canvas) // <------- here
    if (touching) {
        drawHighlightRectangle(canvas)
    }
}
private fun drawSquareStates(canvas: Canvas) {
        for ((i, textArray) in squareData.withIndex()) {
            for ((j, text) in textArray.withIndex()) {
                if (text.isNotEmpty()) {
                    drawTextInsideRectangle(canvas, squares[i][j], text)
                }
            }
        }
    }
     // created in the previous post
     private fun drawTextInsideRectangle(canvas: Canvas, rect: Rect, str: String) {
        val xOffset = textPaint.measureText(str) * 0.5f
        val yOffset = textPaint.fontMetrics.ascent * -0.4f
        val textX = (rect.exactCenterX()) - xOffset
        val textY = (rect.exactCenterY()) + yOffset
        canvas.drawText(str, textX, textY, textPaint)
    }
    
```
[src](https://medium.com/mindorks/building-a-customview-tictactoe-eb439f506505)