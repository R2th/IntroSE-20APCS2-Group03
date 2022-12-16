# Giới thiệu
* Khi đối mặt với một tính năng cụ thể yêu cầu cần có giao diện được tùy biến(customized) mà không có sẵn trong thư viện của SDK  android thì chúng ta buộc phải hoặc tìm các thư viện hoặc là tự vẽ ra View mà chúng ta cần.
* Một trong số đó là TextView, hầu như trong tất cả các app android đều sử dụng component này, tuy nhiên SDK chỉ cung cấp cho chúng ta 1 TextView với các thuộc tính cơ bản, và trong rất nhiều trường hợp buộc chúng ta cần phải custom lại nó cho mục đích của mình.
* Trong bài viết này mình sẽ hướng dẫn các bạn tạo ra một custom TextView cho phép vẽ background bo tròn cho text. Đây là output ta sẽ có được : 
![](https://images.viblo.asia/1740d660-385f-48c0-9134-302be3a1e26c.png)

![](https://images.viblo.asia/55393fc8-0ca6-48b3-b135-e6279209ae87.png)

![](https://images.viblo.asia/a82d87a5-1a8e-495e-94dc-bbc5f78b7933.png)
# Tiến hành nhé
## Đặt vấn đề:
* Khi nhìn vào output phía trên một vài ý kiến cho rằng chúng ta có thể sử dụng **Span** để giải quyết vấn đề này một cách khá đơn giản (nếu các bạn chưa từng sử dụng span hãy tham khảo [bài viết này](https://medium.com/androiddevelopers/spantastic-text-styling-with-spans-17b0c16b4568)) .  Và đúng vậy, Span là một công cụ khá mạnh mẽ để giải quyết trong nhiều trường hợp. Tuy nhiên,  trong trường hợp này chúng ta không thể sử dụng Span. Vấn đề là span chỉ cho phép chúng ta tạo background cho nó bằng cách sử dụng `BackgroundColorSpan`   để access vào `TextPaint` và cho phép chúng ta thay đổi những thành phần như background, text color, nhưng chúng chỉ có thể vẽ cố định một màu và không thể kiểm soát những thành phần khác như corner radius.

![](https://images.viblo.asia/f35048e0-6842-4795-866e-e4868ab10b0e.png)

*Sử dụng BackgroundColorSpan*

* Và bài toán đặt ra là chúng ta phải làm cho tất cả các thành phần của view ở trên xuất hiện cùng nhau. Chúng ta có thể tạo một custom bằng cách implement class `ReplacementSpan` để kế thừa để vẽ lại background và text của nó. Tuy nhiên  `ReplacementSpans` thì không thể fill ở dòng tiếp theo mà chỉ có thể fill ở một dòng và như vậy thì không thể vẽ như vậy ở nhiều dòng. 
* Spans chỉ làm việc tại cấp độ `TextPaint`, không phải ở cấp độ *layout* . Do đó, chúng không thể biết về điểm bắt đầu và điểm kết thúc của đoạn text, hoặc về hướng của đoạn text (trái-phải hoặc trên-dưới).

## Giải pháp : custom TextView
Phụ thuộc vào vị trí của đoạn text, chúng ta cần vẽ 4 drawable khác nhau để có thể tạo ra đoạn văn như hình:

* Đoạn text ở trong 1 dòng: chỉ ta chỉ cần 1 drawable
* Đoạn text ở 2 dòng: chúng ta cần nhiều drawable cho nơi bắt đầu và kết thúc của đoạn text.
* Đoạn text trên nhiều dòng: chúng ta cần vẽ các drawable cho điểm bắt đầu, ở giữa và cuối của của đoạn text. Chúng ta nhìn hình dưới để hình dung rõ hơn nhé: 

![](https://images.viblo.asia/e2910b6a-726e-4228-a766-0f3e83ece123.png)

*4 drawable cần thiết cho mỗi trường hợp*

Để vẽ background cho text, chúng ta cần: 
* Xác định liệu rằng đoạn text có ở nhiều dòng hay một dòng.
* Tìm điểm bắt đầu và kết thúc của dòng.
* Tìm điểm bù đầu và cuối tùy theo hướng đoạn text.

Tất cả những điều này có thể được tính toán dựa trên text [Layout](https://developer.android.com/reference/android/text/Layout) . Để render background nằm dưới text chúng ta cần sử dùng `Canvas` . Một customTextView có quyền truy cập vào tất cả các thông tin cần thiết để định vị các drawable và hiển thị chúng.

Bây giờ chúng ta sẽ chia vấn đề ra làm 4 phần nhỏ và chúng ta sẽ giải quyết từng phần đơn lẽ cho dễ nhé : 

1.  Đánh dấu vị trí của background: được thực hiện trong file XML với `Annotation` span và sau đó code để tính toán vị trí với class `TextRoundedBgHelper` .
2.  Cung cấp background **drawables** như là những **attributes** của TextView - bằng cách implement class  `TextRoundedBgAttributeReader` .
3.  Render những drawable : phụ thuộc vào text được set trong 1 dòng hay nhiều dòng -  `TextRoundedBgRenderer` abstract class và các implement của nó là `SinglineRenderer` và `MultiLineRenderer` .
4.  Support các custom daraw trong TextView - `RoundedBgTextView` , là một class kế thừa AppCompatTextView, đọc các attributes với sự hỗ trợ của  `TextRoundedBgAttributeReader`, override lại method `onDraw`  là nơi nó sử dụng `TextRoundedBgHelper` để vẽ backgound.

## Tìm ra nơi nào cần vẽ:
Chúng có thể ta chỉ định các phần của đoạn text nơi cần được vẽ background bằng cách sử dụng `Annotation`  spans trong string resources.

Chúng ta đã tạo ra class `TextRoundedBgHelper` để: 
* Cho phép chúng ta định vị background dựa trên hướng của đoạn text là từ trái sang phải hay ngược lại.
* Render background, dựa trên những drawable padding theo horizontal và vertical.

Trong `TextRoundedBgHelper.draw ` method, cho mỗi `Annotation` span được tìm thấy trong đoạn text, chúng ta sẽ lấy vị trí bắt đầu và vị trí kết thúc (trong 1 dòng). Sau đó sử dụng `TextRoundedBgRenderer` để render background. Source : 

```
fun draw(canvas: Canvas, text: Spanned, layout: Layout) {
        // ideally the calculations here should be cached since they are not cheap. However, proper
        // invalidation of the cache is required whenever anything related to text has changed.
        val spans = text.getSpans(0, text.length, Annotation::class.java)
        spans.forEach { span ->
            if (span.value.equals("rounded")) {
                val spanStart = text.getSpanStart(span)
                val spanEnd = text.getSpanEnd(span)
                val startLine = layout.getLineForOffset(spanStart)
                val endLine = layout.getLineForOffset(spanEnd)

                // start can be on the left or on the right depending on the language direction.
                val startOffset = (layout.getPrimaryHorizontal(spanStart)
                    + -1 * layout.getParagraphDirection(startLine) * horizontalPadding).toInt()
                // end can be on the left or on the right depending on the language direction.
                val endOffset = (layout.getPrimaryHorizontal(spanEnd)
                    + layout.getParagraphDirection(endLine) * horizontalPadding).toInt()

                val renderer = if (startLine == endLine) singleLineRenderer else multiLineRenderer
                renderer.draw(canvas, layout, startLine, endLine, startOffset, endOffset)
            }
        }
    }
```

## Cung cấp drawables làm attributes.
* Để dễ dàng cung cấp các drawable cho những `TextView` khác nhau trong áp, chúng ta đã định nghĩa 4 custom attributes tương ứng cho padding theo horizontal hoặc vertical. Chúng ta đã tạo một  TextRoundedBgAttributionReader  để đọc các thuộc tính này từ xml layout.

## Render background:
Khi đã có được drawable cần vẽ, chúng ta cần biết thêm: 
* Điểm bắt đầu và kết thúc của background.
* Ký tự nơi background bắt đầu và kết thúc để vẽ.
*  Chúng ta đã tạo 1 abstract class Text `TextRoundedBgRenderer` để biết rằng làm sao để tính ra phần trên và dưới của dòng. Lúc này vẫn còn một phần nữa là `abstrac fun draw(...)` :

```
abstract fun draw(
    canvas: Canvas,
    layout: Layout,
    startLine: Int,
    endLine: Int,
    startOffset: Int,
    endOffset: Int
)
```

Method này sẽ có các implement khác nhau tùy thuộc vào việc văn bản của chúng ta trải dài trên một dòng hay nhiều dòng. Cả hai implement đều hoạt động theo cùng một nguyên tắc: dựa trên dòng trên cùng và dưới cùng, đặt giới hạn của drawable và hiển thị nó trên khung vẽ.

* Với implement trên 1 dòng cần vẽ sẽ như thế này :

![](https://images.viblo.asia/40894f35-fe8d-4be3-87f2-44ad6e9b3627.png)
*Singleline text*

Với implement trên nhiều dòng:
![](https://images.viblo.asia/32ca759b-23de-4998-938f-b49f991c3b03.png)

*Mutiline text*

# Kết luận.
* Trong bài viết này chúng ta đã biết được cách tạo ra background bo tròn cho text trong TextView.
* Hi vọng bài viết hữu ích với các bạn. Nếu bất kỳ chỗ nào không ổn, hãy để lại ý kiến của bạn dưới phần comment nhé.
* Ngoài ra bạn có thể tham khảo [source](https://github.com/googlearchive/android-text/tree/master/RoundedBackground-Kotlin) để hiểu hơn.
## Tham khảo :
* https://medium.com/google-developers/underspanding-spans-1b91008b97e4
* https://medium.com/androiddevelopers/drawing-a-rounded-corner-background-on-text-5a610a95af5