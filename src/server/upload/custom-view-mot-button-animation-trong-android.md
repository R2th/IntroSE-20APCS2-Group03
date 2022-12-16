Custom view thể nào để có một button thực sự đẹp mắt trong ứng dụng của bạn. Ở bài viết này, tôi sẽ hướng dẫn các bạn thực hiện một button động đơn giản mà đẹp mắt. Kiểu button tôi muốn nói nó như thế này nè :)).

![](https://images.viblo.asia/71599f51-9158-4976-bbbf-a0d5c0b1e7dc.gif)

Thoạt nhìn, có vẻ như nó không đơn giản để thực hiện được như vậy, nhưng tôi nghĩ đó là vì animation thực sự rất đẹp. Và tôi sẽ bạn sẽ thấy nó không khó để tạo ra một kiểu animation tương tự như trên. Tôi sẽ thực hiện từng bước một nhé.
Đầu tiên, chúng ta cần một class kế thừa View để thực hiện việc custom với 3 phương thức được override:

```
class Switcher @JvmOverloads constructor(
        context: Context,
        attrs: AttributeSet ? = null,
        defStyleAttr: Int = 0
) : View(context, attrs, defStyleAttr) {
      
    init {
        attrs?.let { retrieveAttributes(attrs, defStyleAttr) }
    }
  
    private fun retrieveAttributes(attrs: AttributeSet, defStyleAttr: Int) {
        // retrieve cutom attributes
    }
  
    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        // setup switcher width and height
    }
  
    override fun onSizeChanged(w: Int, h: Int, oldw: Int, oldh: Int) {
        // setup helper sizes every time switcher size changed (radius, icon width...)
    }
      
    override fun onDraw(canvas: Canvas ?) {
        // just draw
    }
}
```

### Bắt đầu Vẽ
Chúng ta sẽ bắt đầu vẽ button bằng canvas nào.
Ở trạng thái mặc định (checked), tôi sẽ cho công tắc của chúng ta bao gồm 2 hình chữ nhật hơi tròn có màu xanh và trắng như ở hình dưới

![](https://images.viblo.asia/42284613-ac63-4947-864e-413614db9853.png)

Rất đơn giản để vẽ hình chữ nhật xanh đúng không nào, còn đối với hình chữ nhật trắng thì sao? chúng ta chỉ cần tính toán vị trí của hình chữ nhật màu trắng và chuyển `iconTranslateX` vào trong phần mở rộng của `Canvas.withTranslation` . Và đoạn code của nó sẽ như thế này:

```
override fun onDraw(canvas: Canvas ?) {
  // draw switcher (green rect)
  canvas?.drawRoundRect(switcherRect, switcherCornerRadius, switcherCornerRadius, switcherPaint)

  // draw icon (white rect)
  canvas?.withTranslation(x = iconTranslateX) {
      drawRoundRect(iconRect, switcherCornerRadius, switcherCornerRadius, iconPaint)
  }
}
```

### Làm Animation cho Button đã vẽ

Để tạo hiệu ứng động cho button thì chúng ta sẽ sử dụng `ValueAnimator` với phương thức `ofFloat (float ... value) ` của nó. Ở phần thực hiện animation cho button này thì tôi cần 3 animation để hỗ trợ là :

1. `switcherAnimator ` : Nó dùng để tạo hiệu ứng khi icon được chuyển đổi, ở trong button của chúng ta thì từ hình chữ nhật màu trắng thành hình tròn và ngược lại.
2. `translateAnimator` : Dùng để tạo hiệu ứng chuyển đổi icon khi nó chuyển đổi từ trái sang phải và ngược lại.
3. `colorAnimator` : Dùng để làm chuyển động màu từ màu xanh lá cây (checked) sang màu đỏ và ngược lại.

Giờ thì các bạn hãy xem tôi code thế nào. Hãy nhìn vào `switcherAnimator` . Tôi để giá trị khi icon bắt đầu là `0f` (Unchecked) và kết thúc ở `1f` (Checked)

```
var amplitude = BOUNCE_ANIM_AMPLITUDE_IN
var frequency = BOUNCE_ANIM_FREQUENCY_IN
var newProgress = 1f

if (!checked) {
    amplitude = BOUNCE_ANIM_AMPLITUDE_OUT
    frequency = BOUNCE_ANIM_FREQUENCY_OUT
    newProgress = 0f
}

val switcherAnimator = ValueAnimator.ofFloat(iconProgress, newProgress).apply {
    addUpdateListener {
        iconProgress = it.animatedValue as Float
    }
    interpolator = BounceInterpolator(amplitude, frequency)
    duration = SWITCHER_ANIMATION_DURATION
}
```

Tôi sẽ sử dụng thêm thuộc tính `BounceInterpolator` . Nó sẽ giúp button của bạn có hiệu ứng linh động hơn.  Các bạn có thể tìm hiểu thêm về cách thức hoạt động của nó tại [đây]

(https://evgenii.com/blog/spring-button-animation-on-android/)

Trong phần mở rộng của `addUpdateListener` thì  chúng tôi cập nhật giá trị tiến trình vẽ . Và khi thay đổi giá trị button thì view sẽ được vẽ lại với `invalidate` và nó sẽ giúp giữ nguyên kích thước của view

```
private var iconProgress = 0f
  set(value) {
      if (field != value) {
          field = value
        
          val iconOffset = lerp(0f, iconRadius - iconCollapsedWidth / 2, value)
          iconRect.left = width - switcherCornerRadius - iconCollapsedWidth / 2 - iconOffset
          iconRect.right = width - switcherCornerRadius + iconCollapsedWidth / 2 + iconOffset

          postInvalidateOnAnimation()
      }
  }
```

Tôi tạo 1 function `lerp` được sử dụng để tính toán cho `iconOffset`, Chức năng của nó là  tính toán icon của tôi khi nó chuyển từ hình chữ nhật (Unchecked) sang hình tròn (checked) và ngược lại.
Tôi sẽ sử dụng `postInvalidateOnAnimation()` thay vì `postIvalidate()` vì tôi cần animation của button được mượt mà. bạn có thể tìm hiểu thêm về 2 function này trong canvas nhé. 2 function này vẽ ở thread khác nhau đấy

`TranslAnimator` hoạt động theo cùng một cách nhưng nó cập nhật vị trí x của icon khi nó đang ở trạng thái chuyển đổi.

![](https://images.viblo.asia/6a45e9a0-94e2-47d7-b913-d965dfb31865.png)

Chỉ cần như thế là các bạn đã customView được một button có animation thật đẹp. Cách bạn có thể tương tự và vẽ các button khác. Chẳng hạn như button hình tròn ở dưới chẳng hạn

![](https://images.viblo.asia/d1c75b94-1c60-46bb-88d3-226e076a72b7.gif)

Chỉ đơn giản là như vậy. Các bạn có thể tham khảo thêm về code demo của tôi về ví dụ CustomView button animation trên [Github](https://github.com/Tuanlvt/switchButtom) nhé. Chúc các bạn thành công !