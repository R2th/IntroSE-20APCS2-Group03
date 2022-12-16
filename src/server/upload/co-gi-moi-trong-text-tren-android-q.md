Hiển thị text là một nhiệm vụ rất quan trọng trong hầu hết các apps, vì thế nên trên Android Q tiếp tục được giới thiệu nhiều tính năng mới để hỗ trợ và cải thiện performance cho việc này. Chúng tôi đã tắt tính năng gạch nối mặc định, cho phép tạo kiểu chữ bằng nhiều phông chữ hoặc họ phông chữ, hiển thị danh sách phông chữ được cài đặt trên thiết bị và cải thiện một số API kiểu văn bản được sử dụng nhiều nhất.

## Dấu gạch nối (hyphenation) bị tắt theo mặc định trong Android Q và AppCompat v1.1.0

Các thử nghiệm hiệu suất của chúng tôi cho thấy rằng khi gạch nối được bật, có tới 70% thời gian dành cho việc đo văn bản là trên gạch nối.

<div align="center">
    
![](https://images.viblo.asia/4f09707e-30c7-4b3a-b801-d66feb65814a.png)
    
*Dấu gạch nối chiếm đến 70% thời gian để đo văn bản*
</div>

Do việc gạch nối thường không cần thiết cho tất cả các **TextView** trong một ứng dụng và vì ảnh hưởng đến hiệu suất, chúng tôi đã quyết định tắt gạch nối theo mặc định trong Android Q và AppCompat v1.1.0. Nếu bạn muốn sử dụng dấu nối, bạn cần bật thủ công trong ứng dụng của mình bằng cách đặt tần suất gạch nối thành bình thường. Bạn có thể thiết lập điều này theo nhiều cách:

- Đặt thuộc tính **TextAppearance** trong **styles.xml**:

```kotlin
<style name="MyTextAppearance" parent="TextAppearance.AppCompat">
    <item name="android:hyphenationFrequency">normal</item>
</style>
```

- Đặt một thuộc tính trong **TextView**:

```kotlin
<TextView android:hyphenationFrequency="normal" />
```

- Đặt trực tiếp trong code:

```kotlin
textView.hyphenationFrequency = Layout.HYPHENATION_FREQUENCY_NORMAL
```

Tìm hiểu thêm về gạch nối tại[ Android Dev Summit 2018](https://www.youtube.com/watch?v=vXqwRhjd7b4).

## Sử dụng multiple custom fonts trong cùng một TextView

Hãy cùng xem xét một nút mix giữa custom font (Lato trong ví dụ này) với một icon font:

<div align="center">
    
![](https://images.viblo.asia/ae9dc7bb-a1b0-4852-8453-c5421df537d6.png)
    
   *Button với icon và Latin font*
    
</div>
    
**Button** class chỉ chấp nhận một single instance của typeface được đặt trên text. Trước Q, bạn có thể tạo **Typeface** bằng một single font family. Android Q cho phép tạo một typeface từ multiple font families với API mới, [Typeface.CustomFallbackBuilder](https://developer.android.com/reference/android/graphics/Typeface.CustomFallbackBuilder), cho phép thêm tối đa **64 font families**  cho mỗi typeface.

Ví dụ implement icon font:

```kotlin
button.typeface = Typeface.CustomFallbackBuilder(
    // add the Latin font
    FontFamily.Builder(
        Font.Builder(assets, "lato.ttf").build()
    ).build()
).addCustomFallback(
    // add the icon font
    FontFamily.Builder(
        Font.Builder(assets, "icon_font.ttf").build()
    ).build()
).build()
```

Khi tạo font family, cần chú ý rằng không đặt các fonts thuộc các families khác nhau trong cùng một font family object cũng như các fonts cùng kiểu vào cùng một font family. Ví dụ: đặt Lato, Kosugi và Material vào cùng một font family sẽ tạo ra một cấu hình không hợp lệ, cũng như đặt hai fonts đậm vào cùng một font family.

Để xác định font family chung (serif, sans-serif hoặc monospace) sẽ được sử dụng khi văn bản được hiển thị bằng fonts hệ thống, hãy sử dụng phương thức **setSystemFallback()** để đặt fonts dự phòng hệ thống:

```kotlin
Typeface.CustomFallbackBuilder(
    FontFamily.Builder(
       ...
    ).build()
).setSystemFallback("sans-serif")
.build()
```

## Text styling API updates

Android Q mang đến một số cập nhật cho các API kiểu văn bản khác nhau:

### Cải thiện hỗ trợ cho các phông chữ thay đổi

**TextAppparent** hiện hỗ trợ thuộc tính **fontVariationSettings**:

```kotlin
<style name="MyTextAppearance" parent="TextAppearance.AppCompat">
    <item name="android:fontVariationSettings">...</item>
</style>
```

Thuộc tính [fontVariationSettings](https://developer.android.com/reference/android/widget/TextView.html#attr_android:fontVariationSettings) có thể được đặt trực tiếp trên **TextView** trong Android Q và trong AppCompatTextView:

```kotlin
<TextView
    ...
    app:fontVariationSettings="..."
/>
```

### Cải thiện span APIs

**TextAppparentSpan** đã hỗ trợ typeface, shadow settings, **fontFeatureSettings** và **fontVariationSettings**.

[LineBackgroundSpan](https://developer.android.com/reference/android/text/style/LineBackgroundSpan.html) và [LineHeightSpan](https://developer.android.com/reference/android/text/style/LineHeightSpan.html) hiện có các implement tiêu chuẩn: [LineBackgroundSpan.Standard](https://developer.android.com/reference/android/text/style/LineBackgroundSpan.Standard) và [LineHeightSpan.Standard](https://developer.android.com/reference/android/text/style/LineHeightSpan.Standard).

### Access system fonts

Với hơn 100 ngôn ngữ được Android hỗ trợ và với các phông chữ khác nhau hỗ trợ các bộ ký tự khác nhau, việc biết phông chữ hệ thống nào có thể hiển thị một ký tự đã cho là không đáng kể. Các ứng dụng thực hiện kết xuất văn bản của riêng họ như trò chơi, trình xem tài liệu hoặc trình duyệt cần thông tin này. Trong Android Q, có thể truy xuất phông chữ hệ thống được hỗ trợ cho một chuỗi bằng API NDK của **FontMatcher**.

<div align="center">
    
![](https://images.viblo.asia/b013d151-687c-48a9-9979-2e2d759b9fc6.png)
   
   *System fonts dùng để render text*
    
</div>

Hãy xem xét các chuỗi tìm kiếm ở trên. API [FontMatcher](https://developer.android.com/ndk/reference/group/font.html) trả về cho chúng ta đối tượng phông chữ và độ dài. Một ví dụ code đơn giản hóa trông như thế này:

```kotlin
// font = NotoSansCJK-Regular.ttc
// length = 2
auto[font, length] = AFontMatcher_match("たすく a.k.a. のな");

// font = Roboto-Regular.ttf
// length = 8
auto[font, length] = AFontMatcher_match(" a.k.a. のな");

// font = NotoSansCJK-Regular.ttc
// length = 2
auto[font, length] = AFontMatcher_match("のな");
```

**FontMatcher** API không bao giờ trả về **nullptr**:

* Nếu không có phông chữ nào hỗ trợ chuỗi đã cho, một phông chữ cho Tofu (󟿽), ký hiệu glyph bị thiếu sẽ được trả về.
* Nếu không có kiểu chính xác nào được hỗ trợ, một phông chữ có kiểu gần nhất, giống nhất sẽ được trả về.

Nếu bạn muốn get tất cả các phông chữ hệ thống available, bạn có thể dùng API liệt kê phông chữ mới. Trong Java, bạn có thể sử dụng  [SystemFonts.getAvailableFonts](https://developer.android.com/reference/android/graphics/fonts/SystemFonts#getAvailableFonts()) hoặc trong NDK, bạn có thể sử dụng [ASystemFontIterator](https://developer.android.com/ndk/reference/group/font.html#asystemfontiterator_next). Kết quả liệt kê phông chữ chỉ được thay đổi bởi một bản cập nhật hệ thống, vì vậy bạn nên lưu trữ chúng.

## Font updates

### Font Myanmar mới

Android đã thêm một phông chữ Myanmar mới cho Android Q tương thích với Unicode và có khả năng hiển thị cả Unicode và Burmese không Unicode (thường được gọi là [Zawgyi](https://www.unicode.org/faq/myanmar.html)), ngay lập tức. Điều này có nghĩa là bắt đầu từ Android Q, Android giúp người dùng dễ dàng chuyển sang Unicode hơn: lần đầu tiên người dùng có thể sử dụng phông chữ Unicode để đọc văn bản Unicode và không Unicode. Android cũng đã bổ sung các yêu cầu mới cho CDD hệ sinh thái Android có yêu cầu mạnh mẽ hơn trong việc yêu cầu Unicode, bao gồm cả subtag "Qaag" mới mà các OEM nên sử dụng làm ngôn ngữ chỉ định Burmese. Tất cả những thay đổi này sẽ làm cho các nhà phát triển dễ dàng hơn trong thời gian dài, vì sự phân mảnh hệ sinh thái giảm làm cho việc phát triển dễ dàng hơn cho 50 triệu người dùng ở Myanmar.

### Emoji mới

<div align="center">
    
![](https://images.viblo.asia/b854d489-ffba-47a1-aee4-357adc9a853e.gif)
    
   *Emojis trên Android Q*
    
</div>

Đây là những thay đổi đáng kể nhất về text trên Android Q. Cảm ơn các bạn đã đọc bài của mình :D