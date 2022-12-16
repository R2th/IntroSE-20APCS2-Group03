*Một vài tuần trước, Facebook đã phát hành một bản cập nhật mới cho ứng dụng Messenger. Khi chúng ta soạn và gửi tin nhắn đi, các tin nhắn sẽ xuất hiện hiệu ứng background gradient. Đây là một tính năng mới của Messenger, cho phép chúng ta chọn một gradient thay vì màu đơn sắc cho background của các tin nhắn trò chuyện. Hiệu ứng này ban đầu đã làm mình rất ngạc nhiên. Sau đó, mình đã cố tìm hiểu xem các kỹ sư của Facebook đã làm điều đó như thế nào. Trong bài viết này, mình sẽ trình bày qua quá trình suy đoán của mình khi mình cố gắng tái tạo lại nó và giải thích API Android được sử dụng để làm cho nó hoạt động.*

![](https://images.viblo.asia/9dbdbde6-6467-47fe-80e4-91a936d1e3b0.png)

# Phân tích
Đầu tiên, chúng ta hãy nhìn vào ví dụ một lần nữa để xem chính xác thứ mà chúng ta đang cố gắng tái tạo lại ở đây.

![](https://images.viblo.asia/3a969aa3-2655-431c-8d1e-038598d9d214.png)

Về cơ bản, chúng ta có một bố cục nhắn tin khá cơ bản: tin nhắn được chia thành các bong bóng đi từ trên xuống dưới, của chúng ta ở bên phải và những người khác trong cuộc trò chuyện bên trái. Những message ở bên trái đều có màu nền xám, trong khi những cái bên phải trông có vẻ như như chúng đang chia sẻ cùng một gradient nền cố định. Hãy thử tưởng tượng, bạn có một tấm bìa có hiệu ứng màu gradient ở phía dưới và bạn có miếng bìa nhỏ hơn có khoét một lỗ trống, khi bạn di chuyển miếng bìa nhỏ phía trên miếng bìa lớn, trên lỗ đó sẽ xuất hiện hiệu ứng màu gradient như hình minh họa dưới đây

![](https://images.viblo.asia/7d07db2e-8c43-4af8-86e4-d6369b7decc5.gif)

Nghe có vẻ khá hợp lý nhỉ. Từ suy luận này, ta có thể đưa ra ý tưởng là màn chat gồm một loạt các ViewHolder với background là màu trắng, ngoại trừ phần message là có nền trong suốt để thấy được background gradient phía dưới. Ta sẽ tập chung chủ yếu vào phần này.
# Triển khai
Đầu tiên là background layout của màn hình chat
***chatbackground.xml***
```
<shape
  xmlns:android="http://schemas.android.com/apk/res/android">
  <gradient
    android:angle="270"
    android:centerColor="@color/center_color"
    android:endColor="@color/end_color"
    android:startColor="@color/start_color"
    android:type="linear"/>
</shape>
```

![](https://images.viblo.asia/928cf51a-6a75-445b-9cd6-42d3dc0a7f60.png)

Layout của activity chat
***activity_chat.xml***
```
<androidx.constraintlayout.widget.ConstraintLayout
...>
<ImageView
  android:id="@+id/ivBackground"
  android:layout_height="0dp"
  android:layout_width="match_parent"
  app:layout_constraintBottom_toTopOf="@+id/llInput"
  app:layout_constraintEnd_toEndOf="parent"
  app:layout_constraintStart_toStartOf="parent"
  app:layout_constraintTop_toBottomOf="@+id/toolbar"/>
<androidx.constraintlayout.widget.ConstraintLayout/>
```
Item của messege được gửi đi
****item_outgoing_image_message.xml****
```
<com.ctech.messenger.widget.BackgroundAwareLayout 
  android:layout_width="match_parent"
  android:layout_height="wrap_content"
  ..
  android:background="@color/white"
  app:child_id="@id/tvContent"
  >

<TextView
  android:id="@id/tvContent"
  android:layout_width="wrap_content"
  android:layout_height="wrap_content"
  ...
  app:layout_constraintEnd_toEndOf="parent"
  app:layout_constraintTop_toTopOf="parent"/>
  <TextView
    android:id="@id/tvTimeStamp"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    .../>

</com.ctech.messenger.widget.BackgroundAwareLayout>
```
BackgroundAwareLayout là một layout kế thừa từ ConstraintLayout. Để có thể khoét một lỗ trên layout, ta cần biết vị trí và kích thước của phần nội dung. Việc custom lại một layout này sẽ tăng tính tái sử dụng, khi ta cung cấp một tham chiếu tới vị trí cần cắt qua thuộc tính app:child_id.
***BackgroundAwareLayout.kt***
```
private fun setup(attrs: AttributeSet) {
    val ta = context.obtainStyledAttributes(attrs, R.styleable.BackgroundAwareLayout)
    this.childId = ta.getResourceId(R.styleable.BackgroundAwareLayout_child_id, 0)
 
    if (this.childId != 0) {
        ta.recycle()
        return
    }
    throw IllegalArgumentException("unable to find childId to create a hole")
}
override fun onViewAdded(view: View) {
    super.onViewAdded(view)
    if (view.id == this.childId) {
        this.childView = view
    }
}
```
Bước tiếp theo, ta sẽ tạo một eraser để xóa đi phần nền trắng tại vị trí của văn bản
```
private fun setupEraser() {
    eraser = Paint()
    eraser.color = ContextCompat.getColor(context, android.R.color.transparent)
    eraser.xfermode = PorterDuffXfermode(PorterDuff.Mode.CLEAR)
    eraser.isAntiAlias = true
    setLayerType(View.LAYER_TYPE_HARDWARE, null)
}
```
Tiếp tục, mặc dù thuộc tính hardwareAccelerate được mở theo mặc định ta vẫn phải gọi tới phương thức `setLayerType(View.LAYER_TYPE_HARDWARE, null)`. Sau đó, ta có thể vẽ một background trong suốt để thấy được phần background gradient phía dưới.
```
override fun onDraw(canvas: Canvas) {
    super.onDraw(canvas)
    childRect.set(childView.left.toFloat(), childView.top.toFloat(),
            childView.right.toFloat(), childView.bottom.toFloat())
    canvas.drawRoundRect(childRect, radius, radius, eraser)
}
```
`childReact` chỉ là một helper cho `(left,top,right,bottom)` khi mình cố gắng kiểm thử khi cài đặt. Đây là thành quả

![](https://images.viblo.asia/4272cbf5-9aa7-4c9a-b710-e5a5d36937a8.png)

Đây là hình ảnh từ messenger

![](https://images.viblo.asia/e86bf72a-3493-41c9-9493-83d2b0a23acd.gif)

Còn đây là ứng dụng của chúng ta

![](https://images.viblo.asia/26416631-62d1-40c1-b093-e7fcd072348f.gif)

Có 2 vấn đề nảy sinh:
1. List message cần tự động scroll xuống dưới, ta có thể xử lý đơn giản bằng cách gọi `rvMessages.layoutManager!!.scrollToPosition(adapter.itemCount — 1)`
2. Màu ở dưới đáy là màu tím, không phải là xanh nhạt. Khi keyboard hiển thị, windows được resize lại để chừa ra khoảng trống cho keyboard. Điều này làm cho content của `ivBackground` cũng phải scale lại cho phù hợp.

![](https://images.viblo.asia/7db4fcfb-677c-4bfe-ac6d-c9ae25e2956e.gif)

Để giải quyết vấn đề này, background gradient ban đầu phải được cắt theo chiều cao của keyboard.
```
ivBackground.doOnLayout {
    if (!::backgroundBitmap.isInitialized) {
        val background = ContextCompat.getDrawable(this, R.drawable.chat_background) as GradientDrawable
        background.setSize(it.width, it.height)
        backgroundBitmap = background.toBitmap()
        ivBackground.setImageBitmap(backgroundBitmap)
    }
}
```
Sau khi layout đầu tiên được giải quyết, ta cần tạo một cached bitmap của background. Ta thay đổi `ImageView` thành `KeyboardAwareImageView`
```
ivBackground.setKeyboardListener(object : OnKeyboardShowHideListener {
    override fun onToggle(visible: Boolean, height: Int) {
        if (::backgroundBitmap.isInitialized) {
            if (visible) {
                val cropped = cropBitmap(backgroundBitmap, Rect(0, 0, ivBackground.width, height))
                ivBackground.setImageBitmap(cropped)
            } else {
                ivBackground.setImageBitmap(backgroundBitmap)
            }
        }
    }

})
```
Khi keyboard hiển thị với một chiều cao nhất định, ta sẽ crop cached bitmap, và đây là kết quả

![](https://images.viblo.asia/6a78abfa-8588-4994-aa81-b851f5c4b384.gif)

Như vậy, ta đã có thể tạo ra một giao diện clone "khá giống" Facebook Meesenger.
Cảm ơn các bạn đã theo dõi bàn viết của mình. Source code của bài viết các bạn có thể tham khảo [tại đây](https://github.com/dbof10/messenger-theme/tree/master).

Tài liệu tham khảo:
https://blog.usejournal.com/recreating-the-facebook-messenger-gradient-effect-52a1b17c0c3f