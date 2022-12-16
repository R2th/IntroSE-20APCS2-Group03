Hôm nay, chúng ta  sẽ tìm hiểu custom một view được thiết kế bởi [Oleg Frolov](https://dribbble.com/Volorf) trên [Dribble](https://dribbble.com/).

![](https://images.viblo.asia/3cc63ad4-4748-4038-b11a-a5e53042ce3d.gif)

### Mathematics things...
Đầu tiên chúng ta cần phải xác định được **trục** cho `Light animation`. Như các bạn thấy thì nó nằm ở giữa dấu chấm của từ **'' i ''**.  Ta sẽ thực hiện animation này với text "Loading" và bây giờ chúng ta sẽ tính toán để tìm được tọa độ đó:

1. Tính chiều rộng của text (**w1**) với từ " i " (**Loadi**)
2. Tính chiều rộng của text (**w2**) khi không có từ " i " (**Load**)
3. Tính chiều rộng của từ " i " (**w3**) với dấu cách 2 bên của từ, **w3 = w1 - w2**
4.  Tính tọa độ **pivotX**: **pivotX = w1 - w3 / 2**
5.  Tính chiều rộng của từ " i " (**w4**) khi không có dấu cách. Giả sử **w4 = đường kính của dấu chấm trên đầu từ i**
6.  Tính tọa độ **pivotY**: **pivotY = (-text.ascent - text.height + w4/2)**. Các bạn có thể tìm hiểu về [ascent, descent,...](https://stackoverflow.com/questions/27631736/meaning-of-top-ascent-baseline-descent-bottom-and-leading-in-androids-font/27631737#27631737)
> Mình đã thay chữ **Light** thành chữ **Loading** nhưng cách tính của chúng đều giống nhau.

### Some drawing
Để vẽ được được đường đèn sáng màu trắng, chúng ta cần phải tính được cấu trúc hình thang.
![](https://images.viblo.asia/14753469-2a06-41c7-aa80-7c1f44f6c426.png)
```
val topY = textPaint.ascent() * -1 - textBounds.height()
lightPath.moveTo(lightPivotX - letterWidth / 2f, topY)
lightPath.moveTo(lightPivotX + letterWidth / 2f, topY)
lightPath.lineTo(lightPivotX + width / 2f, width.toFloat())
lightPath.lineTo(lightPivotX - width / 2f, width.toFloat())
lightPath.lineTo(lightPivotX - letterWidth / 2f, topY)
lightPath.close()
```
### Let's light it up
Bây giờ chúng ta cần chạy animation:
- Tạo một animator object:
```
private var animator = ValueAnimator.ofFloat(0f, 1f).apply {
    addUpdateListener {
        val value = it.animatedValue as Float
        angle = lerp(0f, FULL_CIRCLE, value)
    }
    interpolator = CustomSpringInterpolator(INTERPOLATOR_FACTOR)
    repeatMode = ValueAnimator.RESTART
    repeatCount = ValueAnimator.INFINITE
    duration = ANIMATION_DURATION
}
```

-  Cập nhật góc độ và invalidate view
```
private var angle = 0f
    set(value) {
        field = value
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
            postInvalidateOnAnimation()
        } else {
            invalidate()
        }
    }
```
- Chạy animation:

![](https://images.viblo.asia/8a59f703-f131-4560-adb8-845346f1708a.gif)

=> Không phải thứ ta muốn?
### Android PorterDuff.Mode
Chúng ta sẽ sử dụng [PorterDuff.Mode](https://stackoverflow.com/a/25654603) để đạt được kết quả như sau:

![](https://images.viblo.asia/e6a8cc94-2613-4fd5-a8b4-cca5270f0ac5.gif)

### Code...
- **LightProgress.kt**
```
class LightProgress @JvmOverloads constructor(
        context: Context,
        attrs: AttributeSet? = null,
        defStyleAttr: Int = 0
) : View(context, attrs, defStyleAttr) {

    private lateinit var text: String
    private lateinit var textLayout: StaticLayout

    private val textPaint = TextPaint(Paint.ANTI_ALIAS_FLAG)
    private val lightPaint = Paint(Paint.ANTI_ALIAS_FLAG)

    private val lightPath = Path()

    private lateinit var textBitmap: Bitmap

    private var lightPivotX = 0f
    private var lightPivotY = 0f
    private var letterWidth = 0

    private var angle = 0f
        set(value) {
            field = value
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
                postInvalidateOnAnimation()
            } else {
                invalidate()
            }
        }

    private var animator = ValueAnimator.ofFloat(0f, 1f).apply {
        addUpdateListener {
            val value = it.animatedValue as Float
            angle = lerp(0f, FULL_CIRCLE, value)
        }
        interpolator = CustomSpringInterpolator(INTERPOLATOR_FACTOR)
        repeatMode = ValueAnimator.RESTART
        repeatCount = ValueAnimator.INFINITE
        duration = ANIMATION_DURATION
    }

    init {
        attrs?.let { retrieveAttributes(attrs, defStyleAttr) }
        setLayerType(LAYER_TYPE_SOFTWARE, null)
    }

    private fun retrieveAttributes(attrs: AttributeSet, defStyleAttr: Int) {
        val typedArray =
                context.obtainStyledAttributes(attrs, R.styleable.LightProgress, defStyleAttr,
                        R.style.LightProgress)

        text = typedArray.getStringOrThrow(R.styleable.LightProgress_android_text)

        textPaint.apply {
            color = typedArray.getColorOrThrow(R.styleable.LightProgress_android_textColor)
            textSize = typedArray.getDimensionOrThrow(R.styleable.LightProgress_android_textSize)
            typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
            xfermode = PorterDuffXfermode(PorterDuff.Mode.DST_ATOP)
        }

        textLayout = createLayout(text)

        lightPaint.color = typedArray.getColorOrThrow(R.styleable.LightProgress_light_color)

        typedArray.recycle()
    }

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        val w = textLayout.width
        val h = textLayout.height
        setMeasuredDimension(w, h)
    }
    
     override fun onDraw(canvas: Canvas?) {
        canvas?.withRotation(angle, lightPivotX, lightPivotY) {
            drawPath(lightPath, lightPaint)
        }
        canvas?.drawBitmap(textBitmap, 0f, 0f, textPaint)
    }

    override fun onSizeChanged(w: Int, h: Int, oldw: Int, oldh: Int) {
        super.onSizeChanged(w, h, oldw, oldh)
        initLight()
        textBitmap = textToBitmap(text)
    }

    private fun initLight() {
        val textBounds = Rect()
        val iPos = text.indexOf(LIGHT_LETTER)
        if (iPos == -1) {
            lightPivotX = width / 2f
            lightPivotY = 0f
            textPaint.getTextBounds(text, 0, text.length - 1, textBounds)
        } else {
            val textWithLetter = text.substring(0, iPos + 1)
            val textBeforeLetter = text.substring(0, iPos)

            var textLayout = createLayout(textWithLetter)
            val withWithLetter = textLayout.width

            textLayout = createLayout(textBeforeLetter)
            val widthWithoutLetter = textLayout.width

            textPaint.getTextBounds(LIGHT_LETTER, 0, 1, textBounds)

            letterWidth = textBounds.width()// one "i" letter width

            textPaint.getTextBounds(text, 0, text.length - 1, textBounds)

            val letterWidthWithIndent = withWithLetter - widthWithoutLetter

            lightPivotX = withWithLetter - letterWidthWithIndent / 2f
            lightPivotY = ((textPaint.ascent() * -1) - textBounds.height()) + letterWidth / 2f
        }

        val topY = textPaint.ascent() * -1 - textBounds.height()
        lightPath.moveTo(lightPivotX - letterWidth / 2f, topY)
        lightPath.moveTo(lightPivotX + letterWidth / 2f, topY)
        lightPath.lineTo(lightPivotX + width / 2f, width.toFloat())
        lightPath.lineTo(lightPivotX - width / 2f, width.toFloat())
        lightPath.lineTo(lightPivotX - letterWidth / 2f, topY)
        lightPath.close()
    }
    
    private fun textToBitmap(text: String): Bitmap {
        val baseline = -textPaint.ascent()
        val bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(bitmap)
        canvas.drawText(text, 0f, baseline, textPaint)
        return bitmap
    }

    private fun createLayout(text: String): StaticLayout {
        return text.let {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                StaticLayout.Builder.obtain(
                        it,
                        0,
                        it.length,
                        textPaint,
                        textPaint.measureText(it).toInt()
                )
                        .build()
            } else {
                StaticLayout(
                        text,
                        textPaint,
                        textPaint.measureText(it).toInt(),
                        Layout.Alignment.ALIGN_CENTER,
                        1f,
                        0f,
                        true
                )
            }
        }
    }

    private fun lerp(a: Float, b: Float, t: Float): Float {
        return a + (b - a) * t
    }

    /**
     * Start the light animation.
     */
    fun on() {
        animator?.start()
    }

    /**
     * Stop the light animation.
     */
    fun off() {
        animator?.cancel()
        angle = 0f
    }

    /**
     * @return Whether the light animation is currently running.
     */
    fun isOn() = animator?.isRunning == true
    
    companion object {
        private const val ANIMATION_DURATION = 1800L
        private const val INTERPOLATOR_FACTOR = 0.6f
        private const val FULL_CIRCLE = 360f
        private const val LIGHT_LETTER = "i"
    }
}
```

- **CustomSpringInterpolator.kt**
```
class CustomSpringInterpolator(private var factor: Float) : Interpolator {

    override fun getInterpolation(input: Float): Float {
        return (Math.pow(2.0, -6.5 * input) * Math.sin(2 * Math.PI * (input - factor / 4) / factor) + 1).toFloat()
    }
}
```