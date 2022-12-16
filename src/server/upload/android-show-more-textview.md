# Giới thiệu

Trên hình là một trường hợp có thể bạn sẽ hay gặp phải trong lập trình UI android. Đó là một TextView có thể mở rộng và thu nhỏ nội dung, với button "Show more" và "Show less" sẽ follow ngay phía sau nội dung của TextView. Bài toán ở đây là việc tính toán số ký tự của chuỗi sẽ hiển thị trong TextView với max lenght cho phép, Sau đó tính toán độ dài cần thiết để add thêm dấu ba chấm và text "Show more"/"Show less" để add các thành phần này vào chuỗi đá tính toán trước đó

![](https://images.viblo.asia/60be5243-4acc-44af-a1a3-2df1e2b1a068.png)
![](https://images.viblo.asia/10fd8414-69dc-4235-9b1b-d244dd67ba9a.png)


# Triển khai
Để thực hiện chức năng này, mình sẽ tạo một custom của TextView
Đầu tiên hãy đọc đoạn code đầy đủ của nó, mình sẽ giải thích chi tiết ở phía dưới sau

```
class ShowMoreTextView @kotlin.jvm.JvmOverloads constructor(
    context: Context, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : AppCompatTextView(context, attrs, defStyleAttr) {

    private var showingLine = 1

    private var showMore = "Show more"
    private var showLess = "Show less"
    private val threeDot = "…"

    private var showMoreTextColor = Color.RED
    private var showLessTextColor = Color.RED

    private var mainText: String? = null

    private var isAlreadySet = false
    private var isCollapse = true

    init {
        viewTreeObserver.addOnGlobalLayoutListener(object :
            ViewTreeObserver.OnGlobalLayoutListener {
            override fun onGlobalLayout() {
                if (showingLine >= lineCount) return
                showMoreButton()
                viewTreeObserver.removeOnGlobalLayoutListener(this)
            }
        })
    }

    override fun onFinishInflate() {
        super.onFinishInflate()
        mainText = text.toString()
    }

    private fun showMoreButton() {
        val text = text.toString()
        if (!isAlreadySet) {
            mainText = text
            isAlreadySet = true
        }
        var showingText = ""
        var start = 0
        var end: Int
        for (i in 0 until showingLine) {
            end = layout.getLineEnd(i)
            showingText += text.substring(start, end)
            start = end
        }
        var specialSpace = 0
        var newText: String
        do {
            newText = showingText.substring(
                0, showingText.length - (specialSpace)
            )
            newText += "$threeDot $showMore"
            setText(newText)
            specialSpace++

        } while (lineCount > showingLine)
        isCollapse = true
        setShowMoreColoringAndClickable()
    }

    private fun setShowMoreColoringAndClickable() {
        val spannableString = SpannableString(text)
        spannableString.setSpan(
            object : ClickableSpan() {
                override fun updateDrawState(paint: TextPaint) {
                    paint.isUnderlineText = false
                }

                override fun onClick(view: View) {
                    maxLines = Int.MAX_VALUE
                    text = mainText
                    isCollapse = false
                    showLessButton()
                }
            }, text.length - showMore.length, text.length, 0
        )
        spannableString.setSpan(
            ForegroundColorSpan(showMoreTextColor),
            text.length - showMore.length,
            text.length,
            Spannable.SPAN_EXCLUSIVE_EXCLUSIVE
        )
        movementMethod = LinkMovementMethod.getInstance()
        setText(spannableString, BufferType.SPANNABLE)
    }

    private fun showLessButton() {
        val text = "$text $showLess"
        val spannableString = SpannableString(text)
        spannableString.setSpan(
            object : ClickableSpan() {
                override fun updateDrawState(pain: TextPaint) {
                    pain.isUnderlineText = false
                }

                override fun onClick(view: View) {
                    maxLines = showingLine
                    showMoreButton()
                }
            }, text.length - showLess.length, text.length, 0
        )
        spannableString.setSpan(
            ForegroundColorSpan(showLessTextColor),
            text.length - (threeDot.length + showLess.length),
            text.length,
            Spannable.SPAN_EXCLUSIVE_EXCLUSIVE
        )
        movementMethod = LinkMovementMethod.getInstance()
        setText(spannableString, BufferType.SPANNABLE)
    }

    fun setShowingLine(lineNumber: Int) {
        if (lineNumber == 0) return
        showingLine = lineNumber
        maxLines = showingLine
    }

    fun addShowMoreText(text: String) {
        showMore = text
    }

    fun addShowLessText(text: String) {
        showLess = text
    }

    fun setShowMoreTextColor(color: Int) {
        showMoreTextColor = color
    }

    fun setShowLessTextColor(color: Int) {
        showLessTextColor = color
    }
}
```

Đây là các funtion để init thông tin của ShowMoreTextView
```
    // set maxlengt cho textview, chính là số dòng hiển thị tối đa khi ở chế độ show more
    fun setShowingLine(lineNumber: Int) {
        if (lineNumber == 0) return
        showingLine = lineNumber
        maxLines = showingLine
    }
    
    // title của button show more
    fun addShowMoreText(text: String) {
        showMore = text
    }

    // title của button show less
    fun addShowLessText(text: String) {
        showLess = text
    }

    // color của button show more
    fun setShowMoreTextColor(color: Int) {
        showMoreTextColor = color
    }

    // color của button show less
    fun setShowLessTextColor(color: Int) {
        showLessTextColor = color
    }
}
```

Đầu tiên ở init mình sẽ add một addOnGlobalLayoutListener để lắng nghe sự thay đổi của layout khi TextView được setText để sử lý chuỗi mới
```
init {
        viewTreeObserver.addOnGlobalLayoutListener(object :
            ViewTreeObserver.OnGlobalLayoutListener {
            override fun onGlobalLayout() {
                if (showingLine >= lineCount) return
                showMoreButton()
                viewTreeObserver.removeOnGlobalLayoutListener(this)
            }
        })
    }
```

Khi có dự thay đổi về text thì function showMoreButton() sẽ được gọi nếu như showingLine < lineCount(Số line của chuỗi vừa được set)
function showMoreButton()  sẽ chịu trách nhiệm tính toán và cắt chuỗi có thể hiển thị với showingLine hiện tại sau đó sẽ add vào dấu ba chấm và một SpannableString "Show more"  và cuối cùng là setText ngược lại cho chính TextView này
```
private fun showMoreButton() {
        val text = text.toString()
        if (!isAlreadySet) {
            mainText = text
            isAlreadySet = true
        }
        var showingText = ""
        var start = 0
        var end: Int
        for (i in 0 until showingLine) {
            end = layout.getLineEnd(i)
            showingText += text.substring(start, end)
            start = end
        }
        var specialSpace = 0
        var newText: String
        do {
            newText = showingText.substring(
                0, showingText.length - (specialSpace)
            )
            newText += "$threeDot $showMore"
            setText(newText)
            specialSpace++

        } while (lineCount > showingLine)
        isCollapse = true
        setShowMoreColoringAndClickable()
    }
```

Khi button "Show more"  được clicked thì  sẽ gọi function showLessbutton(): function này thì đơn giản hơn, chỉ việc lấy string gốc được set và add thêm Spannable "Show less"
```
private fun showLessButton() {
        val text = "$text $showLess"
        val spannableString = SpannableString(text)
        spannableString.setSpan(
            object : ClickableSpan() {
                override fun updateDrawState(pain: TextPaint) {
                    pain.isUnderlineText = false
                }

                override fun onClick(view: View) {
                    maxLines = showingLine
                    showMoreButton()
                }
            }, text.length - showLess.length, text.length, 0
        )
        spannableString.setSpan(
            ForegroundColorSpan(showLessTextColor),
            text.length - (threeDot.length + showLess.length),
            text.length,
            Spannable.SPAN_EXCLUSIVE_EXCLUSIVE
        )
        movementMethod = LinkMovementMethod.getInstance()
        setText(spannableString, BufferType.SPANNABLE)
    }
```
#  Sử dụng
Sử dụng trong Activity
```
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <com.sun.sowmoretextview.ShowMoreTextView
        android:id="@+id/show_more"
        android:textSize="18sp"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:layout_constraintTop_toTopOf="parent"
        android:text="@string/content"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```

```
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val tv = findViewById<ShowMoreTextView>(R.id.show_more)
        tv.apply {
            setShowingLine(4)
            setShowLessTextColor(Color.BLUE)
            setShowMoreTextColor(Color.BLUE)
            addShowLessText("Show less")
            addShowMoreText("Show more")
        }
    }
}

```

Hy vọng bài chia sẽ này sẽ hữu ích với các bạn, cảm ơn đã theo dõi