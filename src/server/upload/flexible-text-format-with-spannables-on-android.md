Chào mọi người, thông thường thì việc hiển thị text trong android khá đơn giản, và dễ dàng thực hiện, tuy nhiên trong một số dự án sẽ yêu cầu hiển thị theo nhiều kiểu định dạng  mà với cách thông thường thì không thể đáp ứng. Chính vì vậy, trong bài viết này chúng ta sẽ tìm hiểu Spannables để có thể hiển thị text một cách linh hoạt hơn và theo mình thì nó có thể đáp ứng được hầu hết các yêu cầu của bạn.
### I. Introduce
Trước tiên chúng ta sẽ trở lại các định dạng cơ bản để hiển thị text mà ai cũng phải biết :D

Android cung cấp một số tùy chọn cho các nhà phát triển khi nói đến định dạng văn bản.
Chúng ta có các tùy chọn định dạng bao gồm gạch chân, in đậm, in nghiêng, strikethrough và nhiều tùy chọn khác.
Một cách tiếp cận trực tiếp là sử dụng đánh dấu HTML để xác định các phần của văn bản sẽ được định dạng, các thẻ như <u> - gạch dưới, <b> - in đậm và <i> - in nghiêng sẽ giúp ta làm điều đó. 
    
**Using XML** 
```
<resources> 
   <string name=”formatted_text”>This text is <b>bold<b> and this is <u>underlined</u>
   </string> 
</resources>
```
**Or Code**
```
val text = "This text is <b>bold<b> and this is <u>underlined</u>" myTextView.text = Html.fromHtml(text, HTML.FROM_HTML_MODE_LEGACY)
```
Chúng ta có một tùy chọn tuyệt vời để định dạng phải không? Nhưng chừng đó chưa phải là tất cả. Định dạng không chỉ là tô đậm hoặc gạch chân văn bản, chúng ta có một loạt các khả năng thiết kế mà chúng ta có thể tái tạo. Ví dụ: chúng ta có thể muốn đặt màu sắc của một phần văn bản hoặc kích thước hoặc background của nó khác nhau, bất cứ điều gì. Những thiết kế này có thể đạt được bằng cách sử dụng spannables  mà không phải lo lắng quá nhiều.
       
### II.Our First Spannable
Để bắt đầu, hãy tạo một dự án studio android mới với tên dự án ưa thích của bạn.

Thêm code này vào activity_main.xml. Trong đoạn mã dưới đây, chúng ta có một LinearLayout chính và năm textview. Android xử lý các spannables như text cơ bản để chúng ta có thể dễ dàng đặt văn bản được định dạng cho các textview.
```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="16dp"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <TextView
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
	android:id="@+id/bold_text"
    tools:text="Hey there!"
	android:textColor="@android:color/black"
	android:textSize="28sp" />

    <TextView
	android:layout_width="match_parent"
	android:layout_height="wrap_content"
	android:id="@+id/foreground_text"
    tools:text="Hey there!"
	android:textColor="@android:color/black"
	android:textSize="28sp" />

    <TextView
	android:layout_width="match_parent"
	android:layout_height="wrap_content"
	android:id="@+id/foreground_and_background_text"
	android:textColor="@android:color/black"
    tools:text="Hey there!"
	android:textSize="28sp" />

    <TextView
	android:layout_width="match_parent"
	android:layout_height="wrap_content"
	android:id="@+id/sizing_text"
    tools:text="Hey there!"
	android:textColor="@android:color/black"
	android:textSize="28sp" />

    <TextView
	android:layout_width="match_parent"
	android:layout_height="wrap_content"
	android:id="@+id/sizing_bigger_text"
    tools:text="Hey there!"
	android:textColor="@android:color/black"
	android:textSize="28sp" />

    <TextView
	 android:layout_width="match_parent"
	 android:layout_height="wrap_content"
	 android:id="@+id/builder_text"
     tools:text="Hey there!"
     android:textColor="@android:color/black"
	 android:textSize="28sp" />

</LinearLayout>
```
Trong layout  ở trên, ta đã tạo năm TextView để chứa văn bản có định dạng khác nhau, và chúng ta sẽ lần lượt xem qua chúng, bắt đầu với định dạng in đậm. Nhưng trước đó, hãy dành một chút thời gian để hiểu cấu trúc chung về cách thiết lập spannables và cách định dạng diễn ra.       
       
**How are spannables set up?**
       
Khi sử dụng Spannables, chúng ta có thể tạo chúng theo ba cách. Bằng cách sử dụng bất kỳ lớp SpannedString, SpannableString và SpannableStringBuilder nào. Mỗi lớp này có các tính năng phân biệt chúng, sự khác biệt được nêu dưới đây.       
       
**1. SpannedString** - Lớp này không cho phép sửa đổi text được đặt thành Spannable. Không sửa đổi text và không sửa đổi design (the spans). Nói cách khác, nó là bất biến(immutable).
       
**2. SpannableString** - Lớp này cho phép sửa đổi design/styles được thêm vào text, nhưng không sửa đổi trực tiếp vào text được Spannable sử dụng.
       
**3. SpannableStringBuilder** - Lớp này cho phép sửa đổi chính text và thiết kế của nó.       

Điểm mấu chốt ở đây có thể được tóm tắt như sau:
       
*Sử dụng **SpannedString** khi bạn muốn đặt text và design một lần mà không cần sửa đổi gì thêm, **SpannableString** khi bạn sẽ không thực hiện bất kỳ thay đổi nào chỉ đối với text và **SpannableStringBuilder** khi bạn thực hiện thay đổi đối với cả text và design.*
  
**Format For Spannables**
Bây giờ chúng ta đã có cái nhìn rõ ràng về các loại spans mà chúng ta có thể sử dụng, hãy cùng tìm hiểu sâu hơn về cấu trúc chung của chúng. Những Spannables bạn sẽ sử dụng trong tương lai thường theo kiểu này:       
```
spannableObject.setSpan(Object what, int startIndex, int endIndex, int flags)
```
Đối tượng spannable cung cấp một phương thức setSpan mà chúng ta có thể sử dụng để áp dụng các style span khác nhau cho các phần của text. Cần có bốn arguments, hãy cùng đi sâu vào!      

1. **what** — Điều này đề cập đến style span thực tế mà chúng ta sẽ áp dụng, hãy nghĩ về nó như một đối tượng hướng dẫn spannable áp dụng một style nhất định cho text.
1. **startIndex** — Tham số startIndex biểu thị chỉ mục nơi bắt đầu của text được định dạng. Giả sử text được định dạng là **thyself** trong đoạn text** steady thyself**, chúng ta có thể suy ra rằng startIndex cho văn bản này là 7.
1. **endIndex** —  Ngược lại với startIndex, nó biểu thị chỉ mục nơi kết thúc của text được định dạng. Sử dụng tiếp ví dụ từ phần giải thích startIndex, endIndex của chúng ta là chỉ mục của chữ f trong chuỗi text, vì vậy nó sẽ là 13.
1. **flags** — Điều này cho biết cách xử lý text được cung cấp cho các spannables, chúng ta có nhiều giá trị khác nhau có thể được gán cho vị trí tham số này, ví dụ là SPAN_EXCLUSIVE_EXCLUSIVE, SPAN_EXCLUSIVE_INCLUSIVE, SPAN_INCLUSIVE_INCLUSIVE và nhiều giá trị khác. Dưới đây là giải thích chi tiết.     
       
**Spannable Flags**
       
Như đã giải thích ở trên, spannable flags cho biết
quá trình Spanning sẽ xử lý văn bản như thế nào. Một số flags chúng ta có thể sử dụng được giải thích dưới đây.
       
1. **SPAN_INCLUSIVE_INCLUSIVE**: Điều này cho phép thêm text mới vào cả điểm đầu và điểm cuối của text.
1. **SPAN_INCLUSIVE_EXCLUSIVE**: Điều này cho phép text mới được thêm vào điểm bắt đầu, nhưng không được thêm vào cuối.
1. **SPAN_EXCLUSIVE_INCLUSIVE**: Điều này không cho phép thêm text vào điểm bắt đầu mà là điểm cuối.
1. **SPAN_EXCLUSIVE_EXCLUSIVE**: Điều này không cho phép thêm text vào điểm đầu và điểm cuối của text.
### III. The Bold Span
Hãy bắt đầu bằng cách truy xuất tham chiếu đến TextView trong layout của chúng ta, sau đó thiết lập một hàm để áp dụng spanning. Chúng ta sẽ làm điều đó bằng cách viết:       
       
```
class MainActivity : AppCompatActivity {

	private lateinit var boldTextView: TextView

	override fun onCreate(savedInstanceState: Bundle) {
		boldTextView = findViewById(R.id.bold_text_view)
		setBoldSpan()
	}

	private fun setBoldSpan() {
	}

}
```
Đây là điểm khởi đầu tốt cho chúng ta và bây giờ ta có thể làm đúng với định dạng.
```
private fun setBoldSpan() {
  val text = "This is a bold text"
  val spannedText = "bold"
  val boldSpannableText = SpannableString(text)

  val startIndex = boldSpannableText.indexOf("bold") // get the startindex of the text to be spanned
  val amountOfCharacters = 4 // 4 letters of the bold text

  boldSpannableText.setSpan(
      StyleSpan(Typeface.BOLD), startIndex, startIndex + amountOfCharacters, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE
  )
  boldTextView.text = boldSpannableText
}
```
Chúng ta bắt đầu bằng cách tạo một biến string để giữ toàn bộ text sẽ được đặt trong `TextView`, vì chúng ta sẽ không định dạng tất cả text, chúng tôi cũng cần lấy text chính xác được định dạng, trong trường hợp này là một biến với chuỗi "bold".
Chúng ta đã kiểm tra được điều đó, bây giờ ta phải xây dựng đối tượng `SpannableString` thực tế,  thực hiện điều này bằng cách gọi hàm constructor `SpannableString` và truyền toàn bộ text làm đối số. Điều này cho đối tượng `SpannableString` biết rằng đây là text mà chúng ta sẽ áp dụng các tùy chọn định dạng.  
       
Nhìn lại phương thức `setSpan`, chúng ta cần chuyển chỉ mục đầu và cuối của đoạn text cần định dạng, chúng ta muốn định dạng văn bản “bold”, vì vậy ta phải lấy `startIndex` của đoạn text đó, và gán giá trị của nó cho biến `startIndex`, chúng ta làm điều tương tự cho `endIndex`,  sẽ là `startIndex` cộng thêm số lượng ký tự của đoạn text sẽ được định dạng.
Sau đó, chúng ta THIẾT LẬP SPAN!       
       
Để áp dụng style spans cho text, chúng ta sử dụng hàm `StyleSpan` constructor. Muốn áp dụng hiệu ứng đậm nên chúng ta sử dụng hiệu ứng `Typeface.BOLD`. Bằng cách này, chúng ta áp dụng hiệu ứng in đậm cho spanned text. Các tùy chọn định dạng khác có thể được thêm vào là `Typeface.ITALICS` và `Typeface.BOLD_ITALICS`. Chúng ta chuyển chỉ mục bắt đầu và kết thúc cùng với flag thích hợp và đặt text trong `TextView` tới spannable đã tạo. Sau đó chúng ta thu được kết quả!       
![](https://images.viblo.asia/7263658e-7dad-4d26-b0d6-5ce2a543bad9.png)

### IV. The Foreground Span
Chúng ta làm theo cách tiếp cận tương tự như trước đây trong việc lấy tham chiếu đến `TextView` và tạo một method để thiết lập hiệu ứng foreground span.       
```
class MainActivity : AppCompatActivity {

	private lateinit var foregroundTextView: TextView

	override fun onCreate(savedInstanceState: Bundle) {
		foregroundTextView = findViewById(R.id.foreground_text_view)
		setForegroundSpan()
	}

	private fun setForegroundSpan() {
	}

}
```
Hãy áp dụng span!
```
private fun setForegroundSpan() {

  val text = "A part of this text would be set to color red"
  val foregroundSpannableText = SpannableString(text)

  var startIndex = foregroundSpannableText.indexOf("part of this text")
  var amountOfCharacters = "part of this text".length

  foregroundSpannableText.setSpan(
	ForegroundColorSpan(Color.RED), startIndex, startIndex + amountOfCharacters, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE
  )

  startIndex = foregroundSpannableText.indexOf("red")
  amountOfCharacters = 3 // length of "red"

  foregroundSpannableText.setSpan(
      ForegroundColorSpan(Color.RED), startIndex, startIndex  + amountOfCharacters, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE
  )
  foregroundText.text = foregroundSpannableText

}
```
Trong ví dụ này, ta sẽ áp dụng hiệu ứng foreground cho hai phần trong đoạn text của chúng ta. Chúng ta bắt đầu lại bằng cách lấy toàn bộ đoạn text và lưu nó trong một biến, với biến này, chúng ta lần lượt tạo đối tượng `SpannableString` của mình. Phần đầu tiên của text được định dạng có nội dung là “part of this text”. Chúng ta nhận được `startIndex` và số lượng ký tự của văn bản này. Quay lại phương thức `setSpan`, chúng ta sử dụng đối tượng `ForegroundColorSpan` để áp dụng color, chúng ta truyền vào `Color.RED`, sau đó chúng ta config chỉ mục bắt đầu và kết thúc. và hiệu ứng màu đỏ đầu tiên được áp dụng. 
Hãy kiểm tra nó trước khi chúng ta sang phần tiếp theo.
![](https://images.viblo.asia/bd0067af-99fe-4a22-8b2b-8e4bd5e9514d.png)

**Looks good right?**
       
Đối với ví dụ tiếp theo này, chúng ta làm theo một pattern tương tự, tất cả những gì chúng ta cần làm là khởi tạo lại các giá trị của `startIndex` và `quantOfCharacters` để suy ra một chỉ mục bắt đầu và kết thúc mới cho đoạn text lần này. Với điều này, chúng ta áp dụng định dạng text cho hai phần khác nhau của text.              
```
startIndex = foregroundSpannableText.indexOf("red")  
amountOfCharacters = 3 // length of "red"   
foregroundSpannableText.setSpan(ForegroundColorSpan(Color.RED), startIndex, startIndex + amountOfCharacters, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)
foregroundText.text = foregroundSpannableText
```
![](https://images.viblo.asia/6ab8e062-a917-463c-a275-0d40ff6ddab7.png)

### V. Foreground and Background Spans
Chúng ta đã phủ foreground color spans, hãy xem xét việc áp dụng hiệu ứng background , nhưng với một chút thay đổi. Chúng tôi sẽ áp dụng cả foreground và background spans trên cùng một đoạn text, mô phỏng một điểm nổi bật. Hãy một lần đi! Chúng ta bắt đầu bằng cách tham chiếu đến textview và thiết lập function của nó.
```
class MainActivity : AppCompatActivity() {

	private lateinit foregroundBackgroundText: TextView
	
	override fun onCreated(savedInstanceState: Bundle) {
		foregroundBackgroundText = findViewById(R.id.foreground_and_background_text)
		setForegroundAndBackground()
	}

	private fun setForegroundAndBackground() {
	}
 	
}
```
Bây giờ, tất cả đã được thiết lập, hãy áp dụng các span thực tế!
```
private fun setForegroundAndBackground() {
  val text = "Simulating highlighted text"
  val fgBgSpannableText = SpannableString(text)

  val startIndex = fgBgSpannableText.indexOf("highlighted")
  val amountOfCharacters = "highlighted".length

  fgBgSpannableText.setSpan(
      BackgroundColorSpan(Color.YELLOW), startIndex, startIndex + amountOfCharacters, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE
  )
  fgBgSpannableText.setSpan(
      ForegroundColorSpan(Color.BLUE), startIndex, startIndex + amountOfCharacters, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE
  )
  foregroundBackgroundText.text = fgBgSpannableText
}
```
Quá trình áp dụng background color span cho đoạn text của chúng ta tương tự như foreground color trước và chúng ta thu được hiệu ứng này.
![](https://images.viblo.asia/9ebaeb8e-4c03-4e69-a5d7-3e3414a19de9.png)


### VII. Sizing Spans
**Absolute Sizing**
Chúng ta cũng có thể định dạng kích thước của đoạn text khác với phần còn lại bằng cách sử dụng các size spans. Những điều này cho phép chúng ta thay đổi kích thước của một phần đoạn text bằng cách áp dụng các giá trị nhất định. Nói chung, khi định dạng kích thước của text, có hai cách tiếp cận - `AbsoluteSizeSpan` và `RelativeSizeSpan`. 
 
1. **AbsoluteSizeSpan** - Khoảng kích thước này cung cấp kích thước tuyệt đối cho khu vực được định dạng, giá trị của nó là trực tiếp và không liên quan đến đoạn text khác. Ví dụ: nếu đoạn text chính của chúng ta có size 20dp và chúng ta áp dụng size 10dp cho đoạn text cần định dạng, thì đoan text được định dạng sẽ xuất hiện nhỏ hơn.
1. **RelativeSizeSpan** - Điều này khác với AbsoluteSizeSpan vì nó định kích thước text được định dạng dựa trên kích thước ban đầu của đoạn text chính. Nó giống như một phương pháp chia tỷ lệ hơn, nó cần một giá trị để chia tỷ lệ text được định dạng tùy thuộc vào đoạn text chính. Nếu được cung cấp giá trị tỷ lệ là 1.5f, kích thước của text sẽ được định dạng 1.5X đoạn text chính.       
       
Hãy cùng thử cả hai.       
 
**Absolute Sizing**
       
Như đã giải thích ở trên, việc sử dụng kích thước tuyệt đối cung cấp kích thước độc lập với kích thước gốc. Hãy thử xem! Chúng ta bắt đầu bằng cách truy xuất tham chiếu đến size textview như bình thường và cung cấp định nghĩa cho hàm dùng để thực hiện định dạng thực tế.
       
```
class MainActivity : AppCompatActivity() {

	private lateinit sizingText: TextView

	override fun onCreated(savedInstanceState: Bundle) {
		sizingText = findViewById(R.id.sizing_text)
		setSizingText()
	}

	private fun setSizingText() {
	}
 	
}
```
Và bây giờ, chúng ta Format!       
```
private fun setSizingText() {
    val text = "This text is smaller than the rest"
    val sizingSpannableText = SpannableString(text)

    val startIndex = text.indexOf("smaller")
    val amountOfCharacters = "smaller".length

    sizingSpannableText.setSpan(
        AbsoluteSizeSpan(20), startIndex, startIndex + amountOfCharacters, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE
    )
    sizingText.text = sizingSpannableText
}
```
Tại thời điểm này, chúng ta nên làm quen với cách tiếp cận chung để áp dụng các spans và đối với trường hợp sử dụng này, chúng ta chuyển 20 làm kích thước phông chữ tuyệt đối cho đoạn text "smaller" và hiệu ứng này được áp dụng.       
![](https://images.viblo.asia/f6e65703-371c-4919-9af8-9fa48615682a.png)

**Relative Sizing**

Relative sizing đòi hỏi phải tính toán kích thước phông chữ của text được định dạng liên quan đến 'parent' của nó. Có thể nói rằng kích thước phông chữ ban đầu của đoạn text gốc được chia tỷ lệ theo giá trị được cung cấp. Hãy cùng đi sâu vào!      

Chúng ta bắt đầu bằng cách nhận tham chiếu đến textview `sizingBiggerText`.       
       
```
class MainActivity : AppCompatActivity() {

	private lateinit sizingBiggerText: TextView
	
	override fun onCreated(savedInstanceState: Bundle) {
		sizingBiggerText = findViewById(R.id.sizing_bigger_text)
		setSizingBiggerText()
	}

	private fun setSizingBiggerText() {
	}
}
```
Tắt định dạng!       
```
private fun setSizingBiggerText() {
	  val text = "This text is double the size of the rest"
	  val sizingSpannableText = SpannableString(text)
	
	  val startIndex = text.indexOf("double the size")
	  val amountOfCharacters = "double the size".length
	
	  sizingSpannableText.setSpan(
	      RelativeSizeSpan(2f), startIndex, startIndex + amountOfCharacters, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE
	  )
	  sizingBiggerText.text = sizingSpannableText
}
```
Trong ví dụ này, chúng tôi sử dụng phương thức `RelativeSizeSpan` constructor, truyền vào một giá trị float (2f). Điều này hướng dẫn quá trình spanning để kích thước đoạn text được định dạng gấp đôi kích thước của đoạn text parent. Kết quả của quá trình này có thể được tìm thấy bên dưới….
![](https://images.viblo.asia/bc095844-56a4-426a-a287-8b0e7567f8f8.png)

### VII. Interlude       
Chúng ta đã áp dụng rất nhiều hiệu ứng span và thật thú vị khi có thể đưa ra những thiết kế tối giản như vậy mà không cần nỗ lực hoặc không tốn nhiều công sức. Như đã nói ở đầu bài viết này rằng chúng ta có một số phương pháp áp dụng hiệu ứng span. Chúng ta chỉ mới xem qua việc sử dụng `SpannableString`, tiếp theo chúng tôi sẽ kiểm tra `SpannableStringBuilder` và cách nó giúp chúng ta áp dụng các span cho text trong khi nối các đoạn text khi chúng ta tiếp tục.
       
**SpannableStringBuilder**
       
Với `SpannableStringBuilder`, chúng ta không phải đặt tất cả text cùng một lúc, chúng ta có thể đặt text khi chúng ta muốn và định dạng sau đó. Chúng ta cũng có thể nối các đoạn text sau này vào chương trình của mình và áp dụng các tùy chọn định dạng cho chúng. Trong ví dụ này, chúng ta sẽ sử dụng hiệu ứng in đậm, gạch chân và gạch ngang trên các phần khác nhau trong cùng một văn bản gốc. Chúng ta bắt đầu bằng cách lấy tham chiếu đến văn bản và thiết lập phương thức để định dạng.       
```
class MainActivity : AppCompatActivity() {

	private lateinit builderText: TextView
	
	override fun onCreated(savedInstanceState: Bundle) {
		builderText = findViewById(R.id.builder_text)
		setStrikethroughBoldUnderlineText()
	}

	private fun setStrikethroughBoldUnderlineText() {
	}
 	
}
```
Sau đó, chúng ta format       
```
private fun setStrikethroughBoldUnderlineText() {

  val boldText = "This text is bold"
  val boldStrUnderlineSpannable = SpannableStringBuilder(boldText)

  var startIndex = boldText.indexOf("bold")
  var amountOfCharacters = "bold".length

  boldStrUnderlineSpannable.setSpan(
      StyleSpan(Typeface.BOLD), startIndex, startIndex + amountOfCharacters, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE
  )

  val strikethroughText = " and this is a strikethrough"
  boldStrUnderlineSpannable.append(strikethroughText)

  startIndex = boldStrUnderlineSpannable.indexOf("strikethrough")
  amountOfCharacters = "strikethrough".length

  boldStrUnderlineSpannable.setSpan(
    StrikethroughSpan(), startIndex, startIndex + amountOfCharacters, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE
  )

  val underlineText = " and this is an underlined text"
  boldStrUnderlineSpannable.append(underlineText)

  startIndex = boldStrUnderlineSpannable.indexOf("underlined")
  amountOfCharacters = "underlined".length

  boldStrUnderlineSpannable.setSpan(
      UnderlineSpan(), startIndex, startIndex + amountOfCharacters, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE
  )

  builderText.text = boldStrUnderlineSpannable

}
```
Whoa !, điều này thoạt nghe có vẻ mơ hồ, nhưng bạn khá dễ dàng hiểu được. Như thường lệ, chúng ta suy ra chỉ số bắt đầu và số lượng ký tự cho chuỗi "bold", sau khi áp dụng hiệu ứng bold, chúng ta nối văn bản mới vào cuối đối tượng có thể mở rộng. Tính toán chỉ số bắt đầu và số lượng ký tự của đoạn sẽ được định dạng lại, chúng ta áp dụng span gạch ngang bằng cách sử dụng hàm  `StrikethroughSpan` constructor. Chúng ta thêm văn bản được gạch chân vào cuối đối tượng spannable . Chúng ta đặt span bằng cách áp dụng hàm tạo `UnderlineSpan` constructor và cuối cùng chúng ta đặt spannable text thành văn bản có trong texview. Kết quả cuối cùng là như vậy:
![](https://images.viblo.asia/0263cde2-7b28-4ab1-83f0-6fe002549d02.png)
### Conclusion
Như vậy chúng ta đã tìm hiểu được các loại định dạng với các loại spannables để có thể hiển thị     văn bản một cách linh hoạt, hy vọng các bạn có thể áp dụng vào dự án của mình.
       
Cảm ơn các bạn vì đã đọc bài viết, xin chào và hẹn gặp lại.
       
Bài viết có sử dụng nguồn tham khảo: [nguồn](https://medium.com/android-dev-hacks/getting-started-with-spannables-on-android-46a051d484ec)