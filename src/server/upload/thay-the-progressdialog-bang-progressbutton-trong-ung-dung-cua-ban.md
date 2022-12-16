![](https://images.viblo.asia/00b06695-c42c-4713-8f31-e28235fdcb48.jpeg)

Progress Button là một trong những lựa chọn để show non-blocking progress trong ứng dụng của bạn. và đã được Google giới thiệu trong[ Material Guidelines](https://material.io/components/progress-indicators/#specs). Thật không may là Google không cung cấp thực thi ngoài box, nhưng chúng ta có thể thấy được cách thực thi bằng những thành phần hiện có  và hơn nữa là cách thêm nó vào ứng dụng hiện tại của bạn mà không cần thay đổi bố cục.

Đây là thành quả mà chúng ta thấy :

![](https://images.viblo.asia/2374d11c-2c97-4a3c-8657-e6e653de9544.gif)

Lựa chọn  1 : Thêm Progressbar vào layout của chúng ta.  Nhưng nó thật sự là không tiện vs dễ dàng.  Theo Button mặc định sẽ có sẵn một số padding và nó thực sự không dễ dàng để điều chỉnh ProgressBar và làm thế nào để chúng ta thêm chữ vào ? và làm thế nào điều chỉnh lại layout sao cho phù hợp với từng màn hình khác nhau ?

Lựa chọn 2 : Chúng ta sử dụng thư viện thứ 3 như [thư viện này chả hạn](https://github.com/leandroBorgesFerreira/LoadingButtonAndroid) Một thứ làm thất vọng nhất  là nó đã làm mất đi sự linh hoạt của bạn. Hay bạn có thể sử dụng lới thế của MaterialButton mới của Google. Với lại nó cũng khó để điều chỉnh lại đúng với từng màn hình khác nhau

Lựa chon 3: Chúng ta có 1 cách nữa là sử dụng drawable được cung cấp bởi google  [AnimationDrawable](https://developer.android.com/reference/android/graphics/drawable/AnimationDrawable). Nhưng may mắn chúng ta có thể sử dụng progress drawable trong  support-v4 package — [CircularProgressDrawable](https://developer.android.com/reference/android/graphics/drawable/AnimationDrawable) .Chúng ta có cách là show drawable với Text — SpannableString + DynamicDrawableSpan. Với một ít dòng như sau ... 

```
// create progress drawable
val progressDrawable = CircularProgressDrawable(this).apply {
    // let's use large style just to better see one issue
    setStyle(CircularProgressDrawable.LARGE)
    setColorSchemeColors(Color.WHITE)

    //bounds definition is required to show drawable correctly
    val size = (centerRadius + strokeWidth).toInt() * 2
    setBounds(0, 0, size, size)
}

// create a drawable span using our progress drawable
val drawableSpan = object : DynamicDrawableSpan() {
    override fun getDrawable() = progressDrawable
}

// create a SpannableString like "Loading [our_progress_bar]"
val spannableString = SpannableString("Loading ").apply {
    setSpan(drawableSpan, length - 1, length, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE)
}

//start progress drawable animation
progressDrawable.start()

button.text = spannableString
```
![](https://images.viblo.asia/6df84dfb-3398-418d-9cdc-1236664a027d.gif)

Nó lại không đúng như bạn mong đợi :
1) Animation thì không tạo cho bạn cảm giác hài lòng
2) Drawable thì căn chỉnh ko đều với text.
3) Không có padding giữa text và progress.

Cùng thử giải quyết vấn để đầu tiên . Animation là freezing bởi vì button của chúng ta không biết khi nào để vẽ lại trạng thái của nó. Có nghĩ là chúng ta phải thực hiện nó một cách hoàn toàn thủ công. Chúng ta có thể đăng kí với AnimationDrawable và gọi button.invalidate() để vẽ trong khi animation kích hoạt. Đây là code mà bạn thấy :

```
//start progress drawable animation
progressDrawable.start()

val callback = object : Drawable.Callback {
    override fun unscheduleDrawable(who: Drawable, what: Runnable) {
    }

    override fun invalidateDrawable(who: Drawable) {
        button.invalidate()
    }

    override fun scheduleDrawable(who: Drawable, what: Runnable, `when`: Long) {
    }
}
progressDrawable.callback = callback

button.text = spannableString
```

![](https://images.viblo.asia/fecd2c19-245b-4039-8aae-17f038c429b7.gif)

Bây giờ chúng ta căn chỉnh lại sao cho phù hợp. Để làm thế chúng ta thừa kế ImageSpan và override getSize và draw. 

```
override fun getSize(paint: Paint, text: CharSequence, start: Int, end: Int, fontMetricsInt: Paint.FontMetricsInt?): Int {
        // get drawable dimensions
        val rect = drawable.bounds 
        fontMetricsInt?.let {
            val fontMetrics = paint.fontMetricsInt

            // get a font height
            val lineHeight = fontMetrics.bottom - fontMetrics.top

            //make sure our drawable has height >= font height
            val drHeight = Math.max(lineHeight, rect.bottom - rect.top)

            val centerY = fontMetrics.top + lineHeight / 2

            //adjust font metrics to fit our drawable size
            fontMetricsInt.apply {
                ascent = centerY - drHeight / 2
                descent = centerY + drHeight / 2
                top = ascent
                bottom = descent
            }
        }

        //return drawable width which is in our case = drawable width + margin from text
        return rect.width() + marginStart
}
```

```
override fun draw(canvas: Canvas, text: CharSequence, start: Int, end: Int, x: Float, top: Int, y: Int, bottom: Int, paint: Paint) {

        canvas.save()
        val fontMetrics = paint.fontMetricsInt
        // get font height. in our case now it's drawable height
        val lineHeight = fontMetrics.bottom - fontMetrics.top

        // adjust canvas vertically to draw drawable on text vertical center
        val centerY = y + fontMetrics.bottom - lineHeight / 2
        val transY = centerY - drawable.bounds.height() / 2

        // adjust canvas horizontally to draw drawable with defined margin from text
        canvas.translate(x + marginStart, transY.toFloat())

        drawable.draw(canvas)

        canvas.restore()
}
```

và sử dụng new Spannable class.

`val drawableSpan = CustomDrawableSpan(progressDrawable, marginStart = 20)`

cùng kiểm tra lại kết quả nào :

![](https://images.viblo.asia/e338ecb0-2732-4913-8b9f-3e456866a125.gif)

Bạn có thể nhìn thấy chuyển đổi từ text sang progress không được mượt cho lắm đúng ko. Chúng ta có thể sửa nó bằng cách sử dụng ObjectAnimator. 

Để dễ dàng hơn tôi đã chuẩn bị cho bạn 1 thư viện tiện lợi dễ sử dụng và điểu chỉnh đó là [ProgressButton](https://github.com/razir/ProgressButton). Vì thế bạn không cần quan tâm đến vòng đời của View hay thêm code nhiều. Tạo cho bạn cảm giác chuyển text animation 1 cách mượt mà như bạn muốn.  Đây là ví dụ kiểm chứng cho bạn :

![](https://images.viblo.asia/b678fed6-3ff7-4246-820b-58047f80e030.gif)

MÌnh đã giới thiệu cho bạn về ProgressButton. mình hy vọng sẽ giúp ích cho cách bạn . Nếu có gì sai xót bạn có thể comment bên dưới để mình sửa nhé :wink::wink::wink:


Tài liệu tham khảo :

https://proandroiddev.com/replace-progressdialog-with-a-progress-button-in-your-app-14ed1d50b44