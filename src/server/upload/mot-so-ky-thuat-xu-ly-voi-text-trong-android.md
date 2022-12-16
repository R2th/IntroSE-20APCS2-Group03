Xin chào mọi người, hôm trước mình phải làm việc khá nhiều với string trong android, vì vậy mình viết bài này để chi sẻ một số kiến thức mà mìnhn học được khi va phải thằng string này.
## 1. Tạo kiểu văn bản cơ bản với các thẻ HTML
Các bạn nào đã hoc qua HTML hay CSS thì sẽ thấy khá quen thuộc với các thuộc tính này. 
một số thẻ cơ bản như dưới đây (Để tim hiểu thêm, các bạn có thể truy cập vào https://developer.android.com/guide/topics/resources/string-resource):
* Bold: <b>,<em>
* Nghiêng: <i>, <cite>,<dfn>
* Tăng 25% <big>
* Giảm 20% <small>
* Thiết lập các thuộc phông chữ: <font face=”font_family“ color=”hex_color”>.sans_serif.
* Đường gạch ngang: <s>, <strike>,<del>
* Gạch dưới: <u>
* Ngắt dòng: <br>
* Phân chia: <div>
* Kiểu CSS: <span style=”color|background_color|text-decoration”>
* .......

Ví dụ, để có chữ " văn bản " đậm, văn bản trong strings.xml sẽ là:
các trường hợp khác, các bạn có thể làm tương tự
```
// values ​​/ strings.xml 
<string name = ”title”> Các phương pháp hay nhất cho <b> văn bản </ b> trên Android </ string>
```

## 2.Tạo kiểu văn bản phức tạp
Nếu như những trường hợp mà bnj muốn tạo ra các định dạng không được hỗ trợ sẵn như bên trên thì sao ? 
Rất may, google đã hỗ trợ chúng ta giải quyết việc đó, chính là lớp  android.text.Annotation và <annotation>thẻ tương ứng trong các tệp tài nguyên strings.xml 
    ![](https://images.viblo.asia/7569730f-c041-457a-81b5-5a5f3e74b91d.png)
Ví dụ với kiểu text được xử lý như bên trên , làm thế nào ? khá đơn giản:
    
### 1. Thêm <annotation>thẻ và xác định <key, value>cặp. 
Trong trường hợp của chúng ta, chính là font, và giá trị là loại phông chữ chúng ta muốn sử dụng: title_emphasis.

```
 <string name = ”title”> Best practices for  
 <annotation font = ”title_emphasis”> TEXT </ annotation> on Android </ string>
```

### 2. Xử lý trong code 
Tạo 1 custom font và set span 
```
// get the text as SpannedString so we can get the spans attached to the text
val titleText = getText(R.string.title) as SpannedString
// get all the annotation spans from the text
val annotations = titleText.getSpans(0, titleText.length, Annotation::class.java)
// create a copy of the title text as a SpannableString 
// so we can add and remove spans
val spannableString = SpannableString(titleText)
// iterate through all the annotation spans
for (annotation in annotations) {   
    // look for the span with the key "font"
    if (annotation.key == "font") {
        val fontName = annotation.value 
        // check the value associated with the annotation key
        if (fontName == "title_emphasis") { 
            // create the typeface
            val typeface = getFontCompat(R.font.permanent_marker) 
            // set the span to the same indices as the annotation
            spannableString.setSpan(CustomTypefaceSpan(typeface),
                    titleText.getSpanStart(annotation),
                    titleText.getSpanEnd(annotation),
                    Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)
        }
    }
}
// now the spannableString contains both the annotation spans and the CustomTypefaceSpan
styledText.text = spannableString
```
Nếu bạn đang sử dụng cùng một văn bản nhiều lần, ví dụ như trong một RecyclerView, và bạn tái tạo lại SpannableStringcho mỗi mục, có một số tác động về hiệu suất và bộ nhớ bạn cần lưu ý:

Chuỗi được lặp lại nhiều lần:  với mỗi lần bạn tạo 1  anotation 
Một statue  mới SpannableStringđược tạo cho mỗi mục.
Để giải quyết vấn đề này, chỉ xây dựng văn bản một lần, bộ nhớ cache và sau đó sử dụng lại SpannableString.
##  3.Gửi dữ liệu qua Intent
Nếu như bạn muốn giữ kiểu custom đó, và gửi qua intent , đầu tiên bạn cần add Anotation trước tiên
```
val spannableString = SpannableString(“My spantastic text”)
val annotation = Annotation(“font”, “title_emphasis”)
spannableString.setSpan(annotation, 3, 7, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)
// start Activity with text with spans
val intent = Intent(this, MainActivity::class.java)
intent.putExtra(TEXT_EXTRA, spannableString)
startActivity(intent)
```
Sau đó là nhận dữ liệu:

`val intentCharSequence = intent.getCharSequenceExtra(TEXT_EXTRA) as SpannableString`

Bạn có thể tham khảo cách xử lý hoàn chỉnh tại:
https://gist.github.com/florina-muntenescu/08d751d843d55b75061039fee4e97931

Bài viết được tham khảo từ: 
https://medium.com/google-developers/styling-internationalized-text-in-android-f99759fb7b8f