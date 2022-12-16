# Vẽ line highlight người thắng
- Ở bài trước ta đã bắt được event click của người dùng và điền vào ô đó giá trị tương ứng (X hoạc O). Trong bài này ta sẽ xác định người chiến thắng và highlight 
```
private val path = Path()
..
    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        drawVerticalLines(canvas)
        drawHorizontalLines(canvas)
        drawSquareStates(canvas)
        if (shouldAnimate) { <--------Check Here
            canvas.drawPath(path, paint) // path is storing our line
        }
        if (touching) {
            drawHighlightRectangle(canvas)
        }
    }
    
   fun animateWin(x1: Int, y1: Int, x3: Int, y3: Int) { // will be called from activity or fragment
        winCoordinates = arrayOf(x1, y1, x3, y3) // first and last coordinate of winning line
        if (winCoordinates[0] < 0) return
        val centerX = squares[winCoordinates[0]][winCoordinates[1]].exactCenterX()
        val centerY = squares[winCoordinates[0]][winCoordinates[1]].exactCenterY()
        val centerX2 = squares[winCoordinates[2]][winCoordinates[3]].exactCenterX()
        val centerY2 = squares[winCoordinates[2]][winCoordinates[3]].exactCenterY()

        path.reset()
        path.moveTo(centerX, centerY) // moving to centre of first square
        path.lineTo(centerX2, centerY2) // creating a line till centre of last square 
        shouldAnimate = true
        invalidate();
    }
```

- Trong bài trước ta đã vẽ line sử dụng *canvas.drawLine()*, tuy nhiên trong bài này ta sẽ vẽ line sử dụng *Path* để dễ dàng trong việc chỉnh chiều dài của line
- Phương thức *animateWin()* sẽ được gọi bởi *Activity hay Fragment* với đối số là tọa độ của 2 điểm đầu và cuối, như ảnh dưới đây đối số là *0,0,2,2*

![](https://images.viblo.asia/3a55a605-6789-472d-9b69-9fb7f4a69355.png)

- Tuy nhiên phương thức trên mới chỉ vẽ line mà chưa có animation

# Animate path
- Để animate path ta sẽ sử dụng class [*ValueAnimator*](https://developer.android.com/reference/android/animation/ValueAnimator) và [*DashPathEffect*](https://developer.android.com/reference/android/graphics/DashPathEffect) và ta phải measure path như sau
```
val measure = PathMeasure(path, false)
val lineLength = measure.length
```
- *path* sẽ chứa tọa độ điểm đầu và cuối của line mình sẽ vẽ
- *DashPathEffect* thông thường được dùng để vẽ line như sau *----*
```
Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
paint.setStyle(Style.STROKE);
paint.setColor(Color.WHITE);
paint.setStrokeWidth(1);
PathEffect effects = new DashPathEffect(new float[]{1,2,4,8} ,1);
paint.setPathEffect(effects);
canvas.drawLine(0, 40, mWidth, 40, paint);
```
- mảng array truyền vào khi khởi tạo *DashPathEffect* sẽ là chiều dài của mỗi line được vẽ ra tương ứng. Như ví dụ trên sẽ vẽ ra line đầu tiên với length là 1, sau đó vẽ khoảng cách với length là 2, tiếp theo vẽ line với length là 4 và cuối cùng vẽ khoảng cách với length là 8. Đối số cuối trong khởi tạo *DashPathEffect* dùng để xác định vị trí bắt đầu vẽ line

# DashPathEffect
![](https://images.viblo.asia/278a8f57-0c44-4881-875e-6429fbd84997.png)

- Trong hình trên line sẽ đi từ 1st đến 2nd. 1st là tọa độ bắt đầu của path và 2nd là điểm cuối của path
- Nếu offset bằng length thì điểm bắt đầu vẽ là từ 2nd đến điểm cuối 2nd nên ta sẽ không thấy gì trên màn hình
- Nếu offset bằng 0 thì điểm bắt đầu vẽ là từ 1st đến điểm cuối 2nd nên ta sẽ thấy 1 line từ 1st đến 2nd
- Tiếp theo để animate ta sẽ giảm offset từ length về 0.

```
private fun animateWin() {
        val valueAnimator = ValueAnimator.ofFloat(1f, 0f)
        valueAnimator.duration = 600
        valueAnimator.addUpdateListener(this)
        valueAnimator.start()
    }
    
override fun onAnimationUpdate(animation: ValueAnimator) {
        val measure = PathMeasure(path, false)
        val offset = (measure.length * (animation.animatedValue as Float))
        paint.pathEffect = createPathEffect(measure.length, offset)
        invalidate()
    }

    private fun createPathEffect(pathLength: Float, offset: Float): PathEffect {
        return DashPathEffect(floatArrayOf(pathLength, pathLength),
                offset)
    }
```

- Trong đoạn code trên *onAnimationUpdate()* được gọi nhiều lần và mõi lần gọi ta sẽ giảm offset sau đó tạo lại *PathEffect* với offset mới và gọi hàm *invalidate* để view vẽ lại

![](https://images.viblo.asia/efdf0232-bc7c-4632-8fdf-ebd5d4e8a576.gif)

[nguồn](https://medium.com/mindorks/building-a-customview-tictactoe-b26f6d944218)