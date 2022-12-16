# 1. Tổng quan
Spans là đối tượng đánh dấu (markup) mạnh mẽ mà bạn có thể sử dụng để định kiểu văn bản ở cấp độ ký tự (character) hoặc đoạn văn (paragraph). Bằng cách gắn các **spans** vào các đối tượng văn bản, bạn có thể thay đổi văn bản theo nhiều cách khác nhau, bao gồm thêm màu, làm cho văn bản có thể clickable, thu nhỏ kích thước văn bản và vẽ văn bản theo cách tùy chỉnh. Các **spans** cũng có thể thay đổi thuộc tính TextPaint, vẽ trên Canvas và thậm chí thay đổi bố cục văn bản.

Android cung cấp một số loại  **spans** bao gồm nhiều kiểu mẫu văn bản phổ biến. Bạn cũng có thể tạo các  **spans** của riêng mình để áp dụng style tùy chỉnh.

# 2. Create and apply a span
Để tạo một **spans**, bạn có thể sử dụng một trong các lớp được liệt kê trong bảng dưới đây. Mỗi lớp khác nhau dựa trên việc chính văn bản đó có thể thay đổi hay không (mutable), liệu đánh dấu văn bản (markup) có thể thay đổi được không và cấu trúc dữ liệu cơ bản có chứa **spans**:

| Class | Mutable text | Mutable markup | Data structure |
| -------- | -------- | -------- | -------- | 
| SpannedString     | No     | No     |Linear array     |
| SpannableString | No | Yes | Linear array | 
| SpannableStringBuilder     | Yes     | Yes     |Linear array     |

<br>Dưới đây, cách quyết định sử dụng cái nào:

- Nếu bạn không sửa đổi văn bản hoặc đánh dấu (markup) sau khi tạo, hãy sử dụng **SpannedString**.
- Nếu bạn cần attach một số lượng nhỏ các spans cho một đối tượng văn bản và văn bản đó chỉ đọc, hãy sử dụng **SpannableString**.
- Nếu bạn cần sửa đổi văn bản sau khi tạo và bạn cần attach các spans vào văn bản, hãy sử dụng **SpannableStringBuilder**.
- Nếu bạn cần attach một số lượng lớn các spans vào một đối tượng văn bản, bất kể chính văn bản đó có ở chế độ chỉ đọc hay không, hãy sử dụng **SpannableStringBuilder**.
Tất cả các lớp này mở rộng từ Spaned interface. SpannableString và SpannableStringBuilder cũng mở rộng từ Spannable interface.

<br>  Ví dụ: Attach a [ForegroundColorSpan](https://developer.android.com/reference/android/text/style/ForegroundColorSpan)

```java
SpannableStringBuilder spannable = new SpannableStringBuilder("Text is spantastic!");
spannable.setSpan(
    new ForegroundColorSpan(Color.RED),
    8, // start
    12, // end
    Spannable.SPAN_EXCLUSIVE_INCLUSIVE
);
```
![](https://images.viblo.asia/9f319837-8268-4319-a012-6f013cb00b25.png)

<br>
Vì spans được set Spannable.SPAN_EXCLUSIVE_INCLUSIVE, spans sẽ mở rộng để bao gồm văn bản được chèn tại các ranh giới (boundaries) của spans, như trong ví dụ dưới đây:

```java
SpannableStringBuilder spannable = new SpannableStringBuilder("Text is spantastic!");
spannable.setSpan(
    new ForegroundColorSpan(Color.RED),
    8, // start
    12, // end
    Spannable.SPAN_EXCLUSIVE_INCLUSIVE
);
spannable.insert(12, "(& fon)");
```
![](https://images.viblo.asia/4ee07717-41b8-42a6-b546-66ef61e77b60.png)

Các bạn có thể đính kèm nhiều spans vào cùng một văn bản. Ví dụ:
```java
SpannableString spannable = SpannableString(“Text is spantastic!”);
spannable.setSpan(
    new ForegroundColorSpan(Color.RED),
    8, 12,
    Spannable.SPAN_EXCLUSIVE_EXCLUSIVE
);
spannable.setSpan(
    new StyleSpan(BOLD),
    8, spannable.length,
    Spannable.SPAN_EXCLUSIVE_EXCLUSIVE
);
```

![](https://images.viblo.asia/e8ed7a20-17d3-4e1e-882f-5c4a69363a38.png)

# 3. Android span types
Android cung cấp hơn 20 loại span trong gói [*android.text.style*](https://developer.android.com/reference/android/text/style/package-summary). Android phân loại các spans theo hai cách chính:

- How the span affects text: một span có thể ảnh hưởng đến *text appearance* hoặc *text metrics*.
- Span scope (phạm vi): một số span có thể được áp dụng cho các ký tự riêng lẻ, trong khi các khoảng khác phải được áp dụng cho toàn bộ đoạn văn.

![](https://images.viblo.asia/fb69cc02-edfa-462e-83f8-0dcf8db88f5a.png)

Các phần dưới đây sẽ mô tả các type này chi tiết hơn :D

## 3.1 Spans that affect text appearance
Bạn có thể  thay đổi văn bản hoặc màu nền và thêm gạch chân hoặc gạch ngang. Tất cả các span này đều mở rộng lớp [CharacterStyle](https://developer.android.com/reference/android/text/style/CharacterStyle).

Ví dụ cách áp dụng UnderlineSpan để gạch chân văn bản:
```java
SpannableString string = new SpannableString("Text with underline span");
string.setSpan(new UnderlineSpan(), 10, 19, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
```

![](https://images.viblo.asia/1eb30d49-bbd8-4b4a-b71d-d5e3c7fcd0a0.png)

## 3.2 Spans that affect text metrics

Chẳng hạn như thay đổi chiều cao dòng và kích thước văn bản.

Ví dụ tạo 1 [RelativeSizeSpan](https://developer.android.com/reference/android/text/style/RelativeSizeSpan) mà kích thước văn bản tăng 50%. 
```java
SpannableString string = new SpannableString("Text with relative size span");
string.setSpan(new RelativeSizeSpan(1.5f), 10, 24, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
```

![](https://images.viblo.asia/24785fb3-7fcd-4403-903f-df76880e368b.png)

## 3.3 Spans that affect individual characters
Bạn có thể cập nhật các character elements như màu nền, style, hoặc kích thước. Ví dụ: 

```java
SpannableString string = new SpannableString("Text with a background color span");
string.setSpan(new BackgroundColorSpan(color), 12, 28, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
```

![](https://images.viblo.asia/afc483ff-8bdb-44da-90e9-efb8595dbe2a.png)

## 3.4 Create custom spans

Nếu bạn cần nhiều chức năng hơn những gì được cung cấp trong các span Android hiện có, bạn có thể triển khai một custom span. Khi thực hiện custom span của riêng bạn, bạn cần quyết định xem span của bạn có ảnh hưởng đến văn bản ở cấp độ character or paragraph hay không và liệu nó có ảnh hưởng đến **layout** hoặc **appearance** của văn bản hay không. Điều này giúp bạn xác định các lớp cơ sở nào bạn có thể **extend** và **interfaces** nào bạn có thể cần thực hiện. Sử dụng bảng dưới đây để tham khảo:


| Scenario | Class or interface |
| -------- | -------- |
| Your span affects text at the character level.     | CharacterStyle     |
| Your span affects text at the paragraph level.     | ParagraphStyle     |
| Your span affects text appearance.     | UpdateAppearance     |
| Your span affects text metrics.     | UpdateLayout     |

Ví dụ: nếu bạn cần triển khai một **custom span** cho phép sửa đổi kích thước và màu văn bản, bạn có thể mở rộng *RelativeSizeSpan*. Vì lớp này đã cung cấp các callbacks *updateDrawState* và *updateMeasureState*, bạn có thể override các callback này để thực hiện hành vi tùy chỉnh của mình.: 

```java
public class RelativeSizeColorSpan extends RelativeSizeSpan {
    private int color;
    public RelativeSizeColorSpan(float spanSize, int spanColor) {
        super(spanSize);
        color = spanColor;
    }
    @Override
    public void updateDrawState(TextPaint textPaint) {
        super.updateDrawState(textPaint);
        textPaint.setColor(color);
    }
}
```

Đó là tất tần tật về span text trong android, hy vọng bài viết sẽ ít nhiều giúp ích cho các bạn. Thanks for reading :D