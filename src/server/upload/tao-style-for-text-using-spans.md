Để tạo style text trong  Android, chúng ta sẽ sử dụng `spans`! Thay đổi màu của một vài ký tự trong text, tạo text nhấp nháy, scale size text hoặc vẽ các điểm bullet với `spans`. Spans có thể thay đổi các thuộc tính của  `TextPaint`, vẽ trên  `Canvas`, hoặc thậm chí thay đổi cả bố cục văn bản hay là ảnh hưởng đến các yếu tốt như chiều cao của dòng. Spans là đối tượng được đánh dấu có thể thêm vào hoặc tách ra từ text; chúng có thể được apply toàn bộ hoặc 1 phần của văn bản.

Ngay bây giờ chúng ta sẽ bắt đầu tìm hiểu làm thế nào để sử dụng được spans.

## Styling text in Android

Android cung cấp một số  styling text:

-   **Single style** —  Áp dụng cho toàn bộ text được displayed bởi TextView
-   **Multi style** —  Có thể áp dụng cho 1 text, ký tự hoặc đoạn văn bản

**Single style**  tạo apply style cho toàn bộ nội dung text trong TextView, sử dụng thuộc tính của XML  or  [styles and themes](https://developer.android.com/guide/topics/ui/look-and-feel/themes.html). Cách này là 1 giải pháp dễ dàng và hoạt động từ XML nhưng không cho phép tạo style cho 1 phần của văn bản. Ví dụ, sử dụng  `textStyle=”bold”`, toàn bộ text sẽ được in đậm; bạn không thể chỉ định được ký tự cụ thể nào được in đậm.

```<TextView  
    android:layout_width="wrap_content"  
    android:layout_height="wrap_content"  
    android:textSize="32sp"  
    android:textStyle="bold"/>
```
**Multi style** thêm nhiều kiểu style cho text. Ví dụ, có 1 chữ italic và  1 chữ bold. Multi style có thể tạo bằng cách sử dụng HTML tags, spans hoặc custom text drawing trên Canvas.

![](https://cdn-images-1.medium.com/max/800/0*3hnVPTJP5Hv4Jduo.)

**HTML tags**  là cách dễ dàng giải quyết các vấn đề đơn giản, như tạo text bold, italic, hoặc  hiển thì bullet points (dấu đánh đầu dòng). Để style chứa HTML tags, call  [Html.fromHtml](https://developer.android.com/reference/android/text/Html.html#fromHtml%28java.lang.String,%20int%29) method. HTML format được convert thành spans. Chú ý, class  `Html`  không hỗ trợ tất cả các HTML tags và css styles như tạo  bullet points có các color khác nhau.
```
val text = "My text <ul><li>bullet one</li><li>bullet two</li></ul>"  
myTextView.text = Html.fromHtml(text)
```
Bạn có thể  **draw the text on Canvas**  khi bạn cần style mà không được support bởi platform như tạo text có layout là đường cong.

**Spans** cho phép bạn tạo multi-style text tùy chỉnh chi tiết . Ví dụ, bạn có thể tạo văn bản với bullet bằng cách sử dụng   [BulletSpan](https://developer.android.com/reference/android/text/style/BulletSpan.html). Bạn cũng có thể tùy chỉnh khoảng cách  giữa text và bullet, hay color của bullet.  Bắt đầu với Android P, bạn thậm chí có thể thay đổi   [radius của bullet point](https://developer.android.com/reference/android/text/style/BulletSpan.html#BulletSpan%28int,%20int,%20int%29). Bạn cũng có thể tùy chỉnh Spans. Ví dụ:
```
val spannable = SpannableString("My text \nbullet one\nbullet two")

spannable.setSpan(  
    BulletPointSpan(gapWidthPx, accentColor),  
    /* start index */ 9, /* end index */ 18,  
    Spannable._SPAN_EXCLUSIVE_EXCLUSIVE_)

spannable.setSpan(  
     BulletPointSpan(gapWidthPx, accentColor),  
     /* start index */ 20, /* end index */ spannable.length,  
     Spannable._SPAN_EXCLUSIVE_EXCLUSIVE_)

myTextView._text_ = spannable
```
![](https://cdn-images-1.medium.com/max/800/0*z7VsMx891rPMRhiY.)

Bạn có thể kết hợp giữa single style và multi style. Bạn có thể xem xét style để apply cho TextView như là “base” style. Spans text style được apply cho “on top” của  base style và sẽ được override in base style. Ví dụ, khi set thuộc tính `textColor=”@color.blue”` cho TextView và  applying cho  `ForegroundColorSpan(Color.PINK)`  cho 4 ký tự đầu của text, 4 characters đầu tiên sẽ sử dụng pink color được set bởi spans.
```
<TextView  
    android:layout_width="wrap_content"  
    android:layout_height="wrap_content"  
    android:textColor="@color/blue"/>

val spannable = SpannableString(“Text styling”)  
spannable.setSpan(ForegroundColorSpan(Color.PINK),0, 4,Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)
myTextView.text = spannable
```
![](https://cdn-images-1.medium.com/max/800/1*JIWZ3OBz2PHdo9Grt0lBnw.png)

## Applying Spans

Khi sử dụng spans bạn cũng có thể làm việc với class :  [SpannedString](https://developer.android.com/reference/android/text/SpannedString.html), [SpannableString](https://developer.android.com/reference/android/text/SpannableString.html)  hoặc  [SpannableStringBuilder](https://developer.android.com/reference/android/text/SpannableStringBuilder.html). Sự khác nhau giữa chúng nằm trong text, các object có thể thay đổi hoặc không thay đổi, và cấu trúc bên trong chúng sử dụng  `SpannedString`  và  `SpannableString`  sử dụng mảng arrays để giữ các records được add vào các spans trong khi  `SpannableStringBuilder`  sử dụng  interval tree

Dưới đây là cách bạn có thể quyết định khi sử dụng 1 trong các class trên:
-   Chỉ**reading and not setting**  text cũng như spans? ->  `SpannedString`
-   **Setting the text and the spans**? ->  `SpannableStringBuilder`
-   Setting a  **small number of spans**  (<~10)? ->  `SpannableString`
-   Setting a **larger number of spans**  (>~10) ->  `SpannableStringBuilder`

Ví dụ, nếu bạn đang làm việc với text không thay đổi, nhưng bạn muốn attach spans, bạn có thể sử dụng  `SpannableString`.

![](https://images.viblo.asia/d2010a7f-e95c-4692-bd2c-de86a930042a.PNG)

Apply  span call `[setSpan(Object what, int start, int end, int flags)](https://developer.android.com/reference/android/text/Spannable.html#setSpan%28java.lang.Object,%20int,%20int,%20int%29)`  của  `Spannable`  object.  `what`  Object là object sẽ được apply từ start đến end trong text. `flag` là đánh dấu khoảng có nên mở rộng để text có thể chèn vào điểm start hoặc end hoặc không. 
Ví dụ set color  `ForegroundColorSpan` :
```
val spannable = SpannableStringBuilder(“Text is spantastic!”)

spannable.setSpan(  
     ForegroundColorSpan(Color.RED),   
     8, 12,   
     Spannable.SPAN_EXCLUSIVE_INCLUSIVE)
```
Bởi vì spans sử dụng  [SPAN_EXCLUSIVE_INCLUSIVE](https://developer.android.com/reference/android/text/Spanned.html#SPAN_EXCLUSIVE_EXCLUSIVE)  flag, khi insert text vào end cùa span, nó sẽ mở rộng bao gồm cả text mới:
```
val spannable = SpannableStringBuilder(“Text is spantastic!”)

spannable.setSpan(  
     ForegroundColorSpan(Color.RED),   
     /* start index */ 8, **/* end index */ 12**,   
     Spannable.SPAN_EXCLUSIVE_INCLUSIVE)

     spannable.insert(12, “(& fon)”)
```
![](https://cdn-images-1.medium.com/max/800/0*Bq7PnfvDBcm1CjK7.)

Nếu span được set với  `Spannable.SPAN_EXCLUSIVE_EXCLUSIVE`  flag, khi insert text tại vị trí end sẽ không thay đổi span.

Multiple spans có thể được tạo và  attached như đoạn text. Ví dụ, text có thể vừa được set bold và red color:
```
val spannable = SpannableString(“Text is spantastic!”)

spannable.setSpan(  
     ForegroundColorSpan(Color.RED),   
     8, 12,   
     Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)

spannable.setSpan(  
     StyleSpan(BOLD),   
     8, spannable.length,   
     Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)
```
![](https://cdn-images-1.medium.com/max/800/1*8PXOuMO_daAGDsnIlADruw.png)

## Basic text styling with HTML tags

Một số HTML tags thường dùng
-   Bold:  `<b>`,  `<em>`
-   Italic:  `<i>`,  `<cite>`,  `<dfn>`
-   25% increase in text size  `<big>`
-   20% decrease in text size  `<small>`
-   Setting font properties:  `<font face=”font_family“ color=”hex_color”>`. Examples of the possible font families include  `monospace`,  `serif`  and  `sans_serif`.
-   Setting a monospace font family:  `<tt>`
-   Strikethrough:  `<s>`,  `<strike>`,  `<del>`
-   Underline:  `<u>`
-   Superscript:  `<sup>`
-   Subscript:  `<sub>`
-   Bullet points:  `<ul>`,  `<li>`
-   Line breaks:  `<br>`
-   Division:  `<div>`
-   CSS style:  `<span style=”color|background_color|text-decoration”>`
-   Paragraphs:  `<p dir=”rtl | ltr” style=”…”>`

Ví dụ, để set word “_text_” bold, text trong file  strings.xml :

// values/strings.xml
```
<string name=”title”>Best practices for <b>text</b> on Android</string>
```
// values-es/strings.xml
```
<string name=”title”><b>Texto</b> en Android: mejores prácticas</string>
```
Trong code:
```
textView.setText(R.string.title)
```
## Complex text styling with Annotation

Nếu style vượt quá platform  HTML tags support, hoặc bạn muốn custom styles, giống như custom  bullet point styling hoặc thậm chí tạo style mới, thì chúng ta cần 1 giải pháp khác. Đánh dấu các từ được tạo styled và làm việc với  class [android.text.Annotation](https://developer.android.com/reference/java/text/Annotation)  và tương thích với  `<annotation>`  tag trong resource files strings.xml.

Annotation tag cho phép chúng ta define custom  `<key, value>`  pairs trong xml. Khi get string resource   `SpannedString`,pairs tự động converted bởi Android framework đến`Annotation`  spans, tương ứng với annotation key và value. Chúng ta có thể phân tích list  annotations attached cho  text add đúng span cho text.

Để chắc chán bạn add  `<annotation>`  tag cho tất cả resource string.xml file.

![](https://cdn-images-1.medium.com/max/800/0*orHoyjEp_FHNxx7R.)

Apply  custom typeface to the word “text”, trong tất cả ngôn ngữ. Apply  `CustomTypefaceSpan` đến word “text”. Đây là những gì cần làm:

1.  Add  `<annotation>`  tag and define   `<key, value>`  pair. Trong trường hợp này, key là  `_font_`, and  value là type cùa font chúng ta sử dụng:  `_title_emphasis_`.

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
2. Lấy string từ resources, với annotations  key  `_font_`  và value tương ứng. Sau đó tạo custom span và set nó cho text ở vị trí trong các annotation.
```
// get the text as SpannedString so we can get the spans attached to the text  
val titleText = getText(R.string._title_) as SpannedString

// get all the annotation spans from the text  
val annotations = titleText.getSpans(0, titleText._length_, Annotation::class._java_)

// create a copy of the title text as a SpannableString   
// so we can add and remove spans  
val spannableString = SpannableString(titleText)

// iterate through all the annotation spans  
for (annotation in annotations) {   

    // look for the span with the key "font"  
    if (annotation._key_ == "font") {  
        val fontName = annotation._value_ 

  // check the value associated with the annotation key  
        if (fontName == "title_emphasis") { 

            // create the typeface  
            val typeface = getFontCompat(R.font.permanent_marker) 

            // set the span to the same indices as the annotation  
            spannableString.setSpan(CustomTypefaceSpan(typeface),  
                    titleText.getSpanStart(annotation),  
                    titleText.getSpanEnd(annotation),  
                    Spannable._SPAN_EXCLUSIVE_EXCLUSIVE_)  
        }  
    }  
}

// now the spannableString contains both the annotation spans and the CustomTypefaceSpan  
styledText._text_ = spannableString
```
Bạn có thể tham khảo code ở   [đây](https://gist.github.com/florina-muntenescu/08d751d843d55b75061039fee4e97931).