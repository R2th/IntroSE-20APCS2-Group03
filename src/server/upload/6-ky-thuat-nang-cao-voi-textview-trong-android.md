Khi bạn xây dựng ứng dụng Android thì có lẽ không thể nào không sử dụng đến TextView. Nhưng mình tin chắc rằng, bạn sẽ chủ yếu dùng TextView trong Android ở mức cơ bản thôi. Tức là chỉ hiển thị một text lên TextView mà quên mất rằng TextView có rất nhiều tính năng hay ho. Qua bài viết này, mình muốn chia sẻ 6 thủ thuật hay ho về TextView trong android mà ít người biết.

### Tự động hiển thị link style với AutoLink với textview trong Android

Bạn hãy tưởng tượng khi trong ứng dụng có quá nhiều urls hoặc email... Bạn muốn chúng tự động chuyển sang dạng có thể click và mở trang web tương ứng. Nếu bạn mà làm thủ công và xử lý bằng code Kotlin chắc “mỏi tay” lắm nhỉ!. 

Đặc biệt là bạn không thể cài đặt event click theo cách thông thường ngay cả khi bạn có đủ kiên nhẫn. Để giải quyết vấn đề trên, bạn chỉ cần sử dụng đến tính năng autoLink của TextView. Có 2 cách để sử dụng autoLink của TextView trong android.

**Cách 1: Cài đặt thuộc tính autoLink bằng Kotlin**

 textView.setMovementMethod(LinkMovementMethod.getInstance()) 
 textView.setText("github: https://github.com/ngotuannghia/Fast-Flashlight")

**Cách 2: Cài đặt ngay trong file xml **

Với cách này thì bạn chỉ đơn giản là bật flag sau: android:autoLink="web" 

<TextView 
          android:autoLink="all" 
          android:textColorLink="#FF0000" 
          android:linksClickable="true" 
         android:text="github: https://github.com/ngotuannghia/Fast-Flashlight" 
         android:layout_width="wrap_content" 
         android:layout_height="wrap_content" />
          
### Tham chiếu giá trị trong string.xml từ 1 giá trị string khác 

Đây là kỹ thuật cũng không phải là cao siêu gì cả. Chỉ đơn giản là bạn cần định nghĩa một string vào một file string.xml sau đó tái sử dụng ở bất kỳ đâu khi cần thiết. 

Với cách làm này, bạn sẽ giúp ứng dụng của bạn dễ dàng hỗ trợ đa ngôn ngữ. Ngoài ra, nó còn giúp giảm thiểu việc trùng lặp code, giảm kích thước ứng dụng. 

Nếu bạn có theo dõi VNTALKING, mình đã từng đề cập đến những sai lầm nghiêm trọng khi bạn lười không định nghĩa string trong strings.xml mà lại hardcode string bừa bãi. 

Thực ra có rất nhiều bạn đã biết cách làm này rồi, chỉ là bạn lười không muốn làm thôi. 

<resources> 
    <string name="description">The app was created by &author; </string> 
</resources> 

<TextView 
          android:layout_width="match_parent" 
          android:layout_height="wrap_content" 
          android:text="@string/description" /> 
          
String string = getString(R.string.hello);
 
### Kỹ thuật tạo dấu gạch ngang trong các ứng dụng thương mại điện tử
 
Nếu bạn để ý nhứng ứng dụng bán hàng như Lazada, Shopee, Tiki… rất hay có phần gạch giá gốc và thay bằng giá đã giảm. Giống như hình bên dưới:

Để làm được như vậy, thì có 2 cách: 

**Cách 1: Sử dụng tính năng có sẵn của [Android](https://phuckhangmobile.com/)**

Bạn có thể sử dụng flag sau: Paint.STRIKE_THRU_TEXT_FLAG để gạch chân toàn bộ văn bản sử dụng TextView 

tv.setPaintFlags(tv.getPaintFlags() | Paint.STRIKE_THRU_TEXT_FLAG); 

Nếu bạn chỉ muốn gạch chân một phần của văn bản trong TextView thì làm như sau: 

val sampleText = "This is a test strike" 
val spanBuilder = SpannableStringBuilder(sampleText) 
val strikethroughSpan = StrikethroughSpan() 
spanBuilder.setSpan( 
    strikethroughSpan, // Span to add 
    0, // Start 
    4, // End of the span (exclusive) 
    Spanned.SPAN_EXCLUSIVE_EXCLUSIVE // Text changes will not reflect in the strike changing 
    )
textView.setText(spanBuilder)

**Cách 2: Kế thừa lại class TextView** 

Nếu bạn muốn sự tùy biến cao hơn thì sử dụng tính năng có sẵn của Android là không đủ. Vẫn còn một cách khác đó là extend từ class TextView, bạn có thể làm tất cả mọi thứ mình muốn trong hàm onDraw(). 

val onDraw:Unit 
(Canvas) 
canvas 
run({ super.onDraw(canvas) 
    if (isStroke && paint != null) 
    canvas.drawLine(0, 
        getMeasuredHeight() / 2, 
        getMeasuredWidth(), 
        getMeasuredHeight() / 2, paint) }) 
val paint:Paint 
val isStroke:Boolean
if (isStroke) 
{ 
    paint = Paint() 
    paint.setColor(Color.RED) 
    paint.setStrokeWidth((getResources().getDisplayMetrics().density * 1))
}

### Kỹ thuật thêm gạch dưới 

Với kỹ thuật này thì có lẽ mình chỉ đưa ra ở đây cho đủ thôi. Chứ mình tin là các bạn chắc cũng biết hết rồi

tv.setPaintFlags(tv.getPaintFlags()| Paint.UNDERLINE_TEXT_FLAG);

### Tuỳ biến font chữ TextView trong Android 

Bạn muốn 1 ứng dụng thật tuyệt vời, một UI sinh động, hiện đại thì không thể bỏ qua việc thay đổi font chữ mặc định của android. 

Hãy theo dõi theo các bước sau để biến điều này thành hiện thực bạn nhé: 

**Bước 1: chọn fonts yêu thích và lưu vào assets folder**

![](https://images.viblo.asia/106dabb3-fc1b-4e2d-b154-806f1864e60a.png)https://images.viblo.asia/106dabb3-fc1b-4e2d-b154-806f1864e60a.png

**Bước 2: Sử dụng Typeface để thay đổi font chữ** 

val txt = findViewById(R.id.custom_font) as TextView 
val font = Typeface.createFromAsset(getAssets(), "fonts/SF-Pro-Text-Regular.otf") 
txt.setTypeface(font)

### TextView trong Android hiển thị nội dung HTML 

Bạn có thể trình bày một nội dung text dưới dạng HTML, sau đó gán vào TextView với phương thức setText(). 

Ví dụ: 
    
    val htmlcontent = ("<h1>Đây là HTML</h1><ul><li>Thẻ UL/LI</li><li>Thẻ UL/LI</li></ul>" + "<p>Dòng <font color=\"red\">chữ</font> trong <big><b>thẻ p</b></big><p>" + "<a href=\"...\">Bấm vào link</a>" + "<strike>Gạch ngang</strike>") 
    mytextview.setText(android.text.Html.fromHtml(htmlcontent))
    
![](https://images.viblo.asia/83314ca1-5bcb-4007-ae45-b8584720fda3.png)https://images.viblo.asia/83314ca1-5bcb-4007-ae45-b8584720fda3.png

Như vậy bạn viết nội dung HTML rồi gọi Html.fromHTML(), để chuyển nội dung HTML thành Spanned rồi gán vào TextView với phương thức setText(). 

Lưu ý các thẻ HTML sau được hỗ trợ để có thể gán vào TextView: 

<p> <div> <p> <br> <b> <i> <strong> <em> <u> <tt> <dfn> <sub> <sup> <blockquote> 
<cite> <big> <small> <font size="..." color="..." face="..."> 
<h1>, <h2>, <h3>, <h4>, <h5>, <h6> 
<a href="..."> <img src="..."> <ul> <ol> 
<li> <code> <center> <strike> 

Như vậy, mình đã chia sẻ với các bạn những kỹ thuật nâng cao mà ít người biết khi sử dụng TextView trong Android. Mặc dù cách thực hiện không khó nhưng nó lại có ích rất nhiều với ứng dụng của bạn.