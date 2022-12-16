Một trong những phần quan trọng nhất trong ứng dụng Android là text, tất nhiên, và chúng ta thường xuyên phải đối phó với chúng. Một tính năng rất hữu dụng là Spannable object là cho phép chúng ta làm phong phú TextView, làm chúng (hoặc một phần của dúng) in đậm, gạch dưới, đổ màu cho chúng.

Trong bài viết này chúng ta hãy cùng nhau làm một ví dụ đơn giản để in đậm text trong TextView mà không sử dụng HTML. Tôi sẽ sử dụng Kotlin để tạo những hàm tiện ích cho task này.

Đầu tiên, chúng ta cần có một TextView đơn giản trong một layout.

```xml
<TextView
    android:id="@+id/myTextView"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_margin="4dp"
    android:text="@string/hello_text"
    android:textSize="24sp"
    android:textColor="@android:color/black"/>
```
*Chú ý: Nên sử dụng resource cho dimensions, đây chỉ là một ví dụ *
![](https://images.viblo.asia/dcb920de-dd76-4b3b-b74e-cc9977ec8ed7.png)

Hãy cùng nhau phân tích code

Ví dụ chúng ta muốn làm một nửa của text in đậm, dù thế nào, chúng ta có thể sử dụng phương thức setSpan nhận một start indext và một end index mà có thể bao gồm hoặc không trong text in dậm, cảm ơn flag.

```kotlin
fun setBoldSpannable(myText: String): SpannableString {
    val spannableContent = SpannableString(myText)
    spannableContent.setSpan(StyleSpan(Typeface.BOLD), 0,  myText.length/2, Spannable.SPAN_INCLUSIVE_INCLUSIVE)
    
    return spannableContent
}
```

Chúng ta tạo một Spannable từ một chuỗi đơi giản và gọi phương thức của nó và truyên vào.
* **type of span** mà chúng ta muốn áp dụng, trong trường hợp này, để làm text in đậm, chúng ta cần StyleSpan(TypeFace.BOLD)
*  **start index** vị trí đầu tiên áp dụng text in đậm
*  **end index** (trong trường hợp này chúng ta muốn in dậm một nửa đoạn)
* **flag** có tạc dụng chỉ rằng có áp dụng cho vị trí bắt đầu và vị trí kết thúc không, trong trường hợp này chúng ta muốn cả hai

```kotlin
val myText = getString(R.string.hello_text)
myTextView.text = setBoldSpannable(myText)
```

![](https://images.viblo.asia/380934d2-3f5a-4d73-891e-0a8c82b75abb.png)

Nếu chúng ta muốn bắt đầu từ chỉ số của một từ nhất định, chúng ta chỉ cần tìm chỉ số bằng cách sử dụng phương thức 
```kotlin
val startIndex = myText.indexOf(word)

val endIndex = startIndex + word.length
```

Nếu chúng ta muốn in đậm nhiều từ trong đoạn văn, kể cả không ở cạnh nhau, chúng ta có thể sử dụng phương thức tương trong một vòng lặp for, với một sự quan tâm cơ bản.

Chúng ta cần sử dụng một SpannableString và để tạo một đối tượng cho mỗi từ chúng ta muốn transform, nếu không, span sẽ được chỉ định cho từ cuối cùng
```kotlin
fun setBoldOnKeywords(text: String,
                           searchKeywords: Array<String>): SpannableStringBuilder {
    val span = SpannableStringBuilder(text)

    for (keyword in searchKeywords) {
        
        var offset = 0
        var start: Int
        val len = keyword.length 

        start = text.indexOf(keyword, offset, true)
        while (start >= 0) {
            val spanStyle = StyleSpan(Typeface.BOLD)
            span.setSpan(spanStyle, start, start + len, Spanned.SPAN_INCLUSIVE_INCLUSIVE)
            
            offset = start + len
            start = text.indexOf(keyword, offset, true)
        }
    }
    return span
}
```
![](https://images.viblo.asia/4e8ba0e5-5680-4bcc-b9e8-4e35db3b474a.png)
Trong bài viết này tối đã sử dụng StyleSpan để tạo một đoạn text in đậmm, nhưng chỉ thay đổi đói tượng span, chúng ta có thể gạch chân, thay đổi mày của text hoặc các thuộc tính khác, sử dụng các hàm tiện ích tương tự.
```
spannableContent.setSpan(UnderlineSpan(), 0,  myText.length/2, Spannable.SPAN_INCLUSIVE_INCLUSIVE)
spannableContent.setSpan(ForegroundColorSpan(colorId), 0,  myText.length/2, Spannable.SPAN_INCLUSIVE_INCLUSIVE)
```

Tôi hi vọng một vài dòng code này sẽ hữu ích cho các dự án của bạn

Cảm ơn đã đọc