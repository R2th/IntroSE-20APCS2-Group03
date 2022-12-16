Thông thường ta hay xử lí việc thiết kế (styling) các text trong Android thông qua Span, nhưng nó chỉ khả thi đối với các đoạn text đã được "hard code" bởi ta biết được index để có thể apply span. Tuy nhiên đối với text đa ngôn ngữ, vị trí của các từ sẽ không cố định, việc mò tìm index sẽ vô cùng khó khắn khi app của chúng ta support nhiều ngôn ngữ.

Ví dụ, ta hãy xem string sau "Best practices for text on Android". Đoạn text này trong string resource của Android sẽ được viết ra tiếng Anh và tiếng Tây Ban Nha, và nhiệm vụ của ta là phải thiết kế tùy chỉnh từ "text"

values/strings.xml
```
<resources>
<string name=”title”>Best practices for text on Android</string>
</resources>
```
values-es/strings.xml
```
<resources>
<string name=”title”>Texto en Android: mejores prácticas</string>
</resources>
```

Vấn đề của chúng ta đó là vị trí của từ cần xử lí là "text" và "Texto" có vị trí khác nhau, việc tìm kiếm index sẽ tốn công sức và không khả thi. Phụ thuộc vào mức độ yêu cầu xử lí đoạn text này, ta có nhiều cách xử lí vấn đề này từ cơ bản cho đến nâng cao. Mình sẽ giới thiệu 2 cách đó là sử dụng thẻ HTML và sử dụng Annotation span cùng với thẻ <annotation>
    
## Xử lí text cơ bản với thẻ HTML
Nếu yêu cầu xử lí đơn giản, hãy thử tham khảo các thẻ HTML sau được hỗ trợ khi ta gọi Html.fromHtml từ string resources

- In đậm <b>, <em>
- Nghiên <i>, <cite>, <dfn>
- Tăng 25% kích thước text <big>
- Giảm 20% kích thước text <small>
- Cài đặt thuộc tính font
(Một số font có sẵn gồm có monospace, serif và sans_serif)
- Cài đặt font monospace : <tt>
- Gạch ngang text : <s>, <strike>, <del>
- Gạch chân text : <u>
- Chữ nhỏ ghi ở góc trên : <sup>
- Chữ nhỏ ghi ở góc dưới : <sub>
- Chấm tròn đầu text (bullet points) : <ul>, <li>
- Xuống dòng : <br>
- Tạo 1  chứa text : <div>vùng
- Thêm CSS : <span style="color|background_color|text_decoration">
- Tạo một đoạn paragraphs <p>

Sau đây là một vài ví dụ

// values/strings.xml

`<string name=”title”>Best practices for <b>text</b> on Android</string>`

// values-es/strings.xml

`<string name=”title”><b>Texto</b> en Android: mejores prácticas</string>`

Ở trên UI, ta chỉ đơn giản gọi
`textView.setText(R.string.title)`

## Xử lí nâng cao hơn với Annotation 
Nếu nhu cầu/ yêu cầu về xử lí vượt quá khả năng của thẻ HTML hay bạn muốn tự mình tùy chỉnh việc style text ( ví dụ như thay đổi icon hiển thị của bullet point bằng icon khác...). Giải pháp của chúng ta nằm trong class android.text.Annotation và thẻ <annotation> gọi trong strings.xml ở file resources

Thẻ annotation cho phép chúng ta định nghĩa các cặp <key,value> tùy chọn trong xml. Khi lấy string resources dưới dạng SpannedString, những cặp này tự động chuyển đổi bởi Android framework vào trong span Annotation các cặp key - value. Ta có thể bóc tách danh sách annotations đính kèm với text hoặc thêm span vào đoạn text

Hãy nhớ thêm thẻ <annotation> vào tất cả string translation ở tất cả các file strings.xml (nếu có các phiên bản đa ngôn ngữ)

Bây giờ chúng ta muốn set typeface custom lên text bằng cách sử dụng CustomTypefaceSpan vào từ "text". Ta cần làm như sau

1. Add thẻ <annotation> và định nghĩa cặp <key,value>. Ở trong trường hợp này key là font, value sẽ là kiểu font chúng ta sử dụng : title_emphasis. 

// values/strings.xml
```
<string name=”title”>Best practices for 
<annotation font=”title_emphasis”>text</annotation> on Android</string>
```
// values-es/strings.xml
```
 <string name=”title”>
<annotation font=”title_emphasis”>Texto</annotation> en Android: mejores prácticas</string>
```

2. Lấy ra string từ resources, chạy vòng lặp đối với danh sách annotations và lấy được cặp key font và giá trị tương ứng của nó. Sau đó tạo 1 custom span và đặt nó ở đoạn text đúng vào vị trí của annotation span.
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
Trên đây là ví dụ cơ bản nhất về cách sử dụng của Annotation, ngoài ra còn rất nhiều ứng dụng khác như thêm ảnh vào đoạn text, hoặc đặt hình nền trong đoạn text... Ở bài viết sau mình sẽ đi sâu hơn cách vấn đề thực tế này. Cảm ơn các bạn đã đọc.