Khi làm việc với text trong android thông thường chúng ta thường set các thuộc tính về style của text trong xml

```
<TextView
    ......
    android:textColor="@color/white"
    android:textSize="32sp"
    android:textStyle="bold"/>
```

Khi đó tất cả các style này sẽ được apply cho toàn bộ text trong view. Vậy có cách nào để chúng ta có thể có một đoạn text trong một TextView mà có những style khác nhau như font size, text color,... 
Bạn có thể sử dụng mỗi một đoạn text với style khác nhau là một TextView nhưng cách đó thật không hay. Trong android đã support sẵn cho chúng ta một các có thể custom style cho các kí tự trong một đoạn text sử dụng Spans. Trong ta hay cùng tìm hiểu qua về cách sử dụng Spans trong bài viết này. 

Khi ap dụng Spans chúng ta sẽ làm việc với một số class sau:
* SpannedString: được sử dụng khi với text mà nội dung của nó không thể thay đổi.
* SpannableString: sử dụng khi số lượng spans nhỏ
* SpannableStringBuilder: sử dụng khi số lượng spans lớn

|  Class | Mutable Text | Mutable Markup |
| -------- | -------- | -------- |
| SpannedString     | no     | no     |
| SpannableString     | no     | yes     |
| SpannableStringBuilder     | yes     | yes     |

*  Sử dụng SpannableString 
```
<TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:textColor="@color/blue"/>
    
    
val spannable = SpannableString(“Text styling”)
spannable.setSpan(
     ForegroundColorSpan(Color.PINK), 
     0, 4, 
     Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)
myTextView.text = spannable
```
![](https://images.viblo.asia/0861dd88-e903-4fed-9808-b8cb625fc502.png)

*  Sử dụng SpannableStringBuilder

```
spannable.setSpan(
     ForegroundColorSpan(Color.RED), 
     /* start index */ 8, /* end index */ 12, 
     Spannable.SPAN_EXCLUSIVE_INCLUSIVE)
spannable.insert(12, “(& fon)”)
```
*  Sử lý sự kiện click spans 

Giả sử chúng ta có một text với nội dung `cửa hàng Món ngon ` và chúng ta muốn text `Món ngon` sẽ có font size lớn hơn và màu chữ là màu đỏ ,  người dùng có thể click vào text này để xem thêm thông tin . chúng ta có thể xử lý như sau 

```
 val spannableText = SpannableString("cửa hàng Món ngon")
 
 val startSpan = 9
 val endSpan = 17
 
 spannableText.setSpan(
                RelativeSizeSpan(1.286f), startSpan, endSpan, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)
                
 spannableText.setSpan(
                ForegroundColorSpan(ContextCompat.getColor(context, R.color.colorAccent)), startSpan, endSpan, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)
                
 spannableText.setSpan(object : ClickableSpan() {
            override fun onClick(widget: View?) {
                onSpanClickListener?.onClick(widget)
            }
        }, startSpan, endSpan, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)
        
movementMethod = LinkMovementMethod.getInstance()
```
Nếu không muốn text có underline thì chúng ta xử lý như sau 

```
spannableText.setSpan(object : ClickableSpan() {
            override fun onClick(widget: View?) {
                onSpanClickListener?.onClick(widget)
            }

            override fun updateDrawState(ds: TextPaint?) {

            }
        }, startSpan, endSpan, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)
```
Tham khảo: https://medium.com/google-developers/spantastic-text-styling-with-spans-17b0c16b4568