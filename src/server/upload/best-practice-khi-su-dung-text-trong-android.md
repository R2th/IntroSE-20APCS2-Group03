Thành phần được sử dụng phổ biến nhất trong các ứng dụng Android chính là Text. Chúng ta sử dụng Text ở dưới dạng TextView hoặc dưới dạng EditText. Vì vậy để có một ứng dụng hiệu suất tốt hơn, chúng ta phải sử dụng Text theo cách tốt nhất có thể. Trong bài viết này, ta sẽ tìm hiểu một số thực tiễn tốt nhất để sử dụng Text trong Android. Outline của bài viết:

1. Improving Text performance
2. Text Styling
3. Custom Fonts
4. System Fonts
5. Editable Text
6. Kết luận

### Improving Text performance

Như chúng ta đã biết, trong một ứng dụng Android, gần 70% ứng dụng chứa các văn bản và do đó, hiệu suất của ứng dụng phụ thuộc rất nhiều vào Text. Có nhiều nghiên cứu đã được thực hiện trong các năm gần đây và trong Google I/O 2019, những thay đổi sau đã được công bố:

**Hyphenation** (dấu gạch nối): Hiện tại, theo mặc định thì dấu gạch nối bị vô hiệu hóa trong Android Q và AppCompact v1.1.0. Sở dĩ có việc này vì dấu gạch nối có ảnh hưởng rất lớn đến hiệu suất của Text. Nói chính xác hơn, 70% công việc xử lý về văn bản là dành cho dấu gạch nối. Để bật dấu nối, bạn phải thêm đoạn mã sau ở trong file ***style.xml***:

```java
<style name="MyTextAppearnace" parent="TextAppearance.AppCompat">
    <item name="android:hyphenationFrequency">normal</item>
</style>
```

Hoặc bạn có thể thêm vào TextView của mình bằng thuộc tính sau:

```java
<TextView android:hyphenationFrequency="normal"/>
```

**Precomputed Text** (văn bản được tính toán trước): Đây là một công cụ được sử dụng để thực hiện việc xử lý văn bản trong background thread. Nhờ đó, nó thực hiện được 90% công việc xử lý của TextView trước khi View được layout. Công cụ này được hỗ trợ từ API 21 trở đi. Trong I/O 2019, các API mới đã được thêm vào để tích hợp dễ dàng với cơ chế prefetch của RecyclerView. Cùng tìm hiểu thêm về prefetch của RecyclerView. Trong hình dưới đây, chúng ta có hai luồng là luồng UI và luồng Render. Biểu tượng con mắt hiển thị thời gian của VSYNC. Trong trường hợp bình thường, không có vấn đề gì với VSYNC. Nhưng nếu một số công việc mất thời gian và không thể kết thúc cho đến khi VSYNC tiếp theo thì nó sẽ chặn VSYNC tiếp theo này. Điều này có thể xảy ra khi bạn cuộn xuống trang và hình ảnh tiếp theo xuất hiện phía trên hình trước đó. Vì vậy, chúng ta có thể thực hiện một số công việc khi luồng ở trạng thái lý tưởng. Đây được gọi là prefetch khi chúng ta thực hiện công việc trước khi chúng ta gặp phải tình trạng chồng chéo VSYNC.

![](https://images.viblo.asia/d90c8009-89b1-4d66-b4a2-b59445c1dca5.png)

Vấn đề ở đây là nếu quá trình này vẫn mất một lượng thời gian rất lớn thì VSYNC sẽ bị chồng chéo và sẽ có lỗi về UI (UI junk). Một giải pháp cho vấn đề này là chúng ta có thể chuyển một số công việc sang luồng background bằng cách sử dụng PrecomputingText và loại bỏ các UI junk này.

![](https://images.viblo.asia/7c041e81-60e3-4872-b9fb-e18081e69e90.png)

Để di chuyển các công việc xử lý văn bản sang một luồng nền, bạn có thể sử dụng các phương thức sau:

```java
1. PrecomputedTextCompact.getTextFuture()
2. AppCompatTextView.setTextFuture()
```

Ví dụ về cách thức triển khai:

```java
override fun onBindViewHolder(viewHolder: ViewHolder, pos:Int) {
    viewHolder.textView.setTextFuture(
        PrecomputedTextCompat.getTextFuture(
            dataSet[pos],
            viewHolder.textView.getTextMetricsParamsCompat(),
            null)
    )
}
```

**Lưu ý: Bạn không nên thay đổi text style sau khi sử dụng *getTextFuture* mà nên làm trước đó.**

### Text Styling

Sau khi cải thiện được hiệu năng của Text, điều tiếp theo cần được quan tâm là Text Styling. Có rất nhiều cách tạo kiểu cho Text. Nhưng cách nào thì tốt hơn? Ngoài ra, bạn nên biết thứ tự ưu tiên của view.

Thông thường, chúng ta sẽ style cho văn bản bằng cách chỉ sử dụng những thuộc tính của TextView:

```java
<TextView
    ...
    android:textColor="@color/colorPrimaryDark"
    android:textSize="16sp"
    android:textStyle="bold"
    ...    
/>
```

Nhưng vấn đề ở đây là bằng cách sử dụng phương pháp trên, chúng ta chỉ có thể tạo kiểu cho một TextView. Nhưng nếu bạn muốn thêm cùng một màu chữ cho tất cả các TextView thì sao? Vì vậy, để tạo sự đồng nhất trong kiểu dáng của văn bản, chúng ta thực hiện phần tạo kiểu cho văn bản trong tệp `styles.xml`:

```java
<TextView
    ...
    android:textSize="16sp"
    style:"@style/MyApp.Widget.Text.Body"
/>

<style name="MyApp.Widget.Text.Body" parent="...">
    <item name="android:textSize">12sp</item>
    <item name="android:textColor">?android:attr/textColorPrimary</item>
</style>
```

Ở ví dụ trên, ta có thuộc tính textSize ở cả TextView và trong file styles.xml. Thuộc tính của view sẽ ghi đè lên thuộc tính của Style, vì vậy, ở đây ta sẽ có một văn bản với textSize là 16sp chứ không phải 12sp.

Mọi view đều có một số style mặc định nhưng chúng sẽ bị ghi đè bởi các thuộc tính chúng ta thêm vào theo cách thủ công. Vì vậy, thứ tự ưu tiên sẽ là:

**View > Style > Default Style > TextAppearance**

Từ Android Q, một thuộc tính mới được thêm vào trong TextAppparent là fontVariationSettings và ta có thể sử dụng nó trong TextView và AppCompatTextView.

TextAppearanceSpan được cập nhật để đọc và áp dụng kiểu chữ hoặc bóng. Ngoài ra, hai span mới được thêm vào Android Q, đó là LineHeightSpan và LineBackgroundSpan. Các thuộc tính được thiết lập bởi Span sẽ ghi đè bất kỳ thuộc tính nào khác View. Vì vậy thứ tự ưu tiên mới sẽ là:

**Span > View > Style > Default Style > TextAppearance**

Nếu bạn muốn thực hiện một số thay đổi ở cấp ứng dụng, tức là nếu bạn muốn thay đổi phông chữ của toàn bộ ứng dụng thì bạn có thể thực hiện việc này với sự trợ giúp của Themes:

```java
<style name="Theme.MyApp"
    parent="@style/Theme.MaterialComponents.Light">
    ...
    <item name="android:fontFamily">@font/space_mono</item>
</style>
```

Và thứ tự ưu tiên cuối cùng là:

**Span > View > Style > Default Style > Theme > TextAppearance**

### Custom Fonts

Có rất ít phông chữ có sẵn trong Android và do đó, khái niệm về downloadable font và phông chữ ở trong XML ra đời.

Hãy cùng xem các hình ảnh dưới đây:

![](https://images.viblo.asia/74af2eb9-161b-4b58-872f-a107022b502b.png)

Ở đây, ta đang có một button và một icon khóa và 2 văn bản ở hai bên của icon. Như bạn thấy ta đang có một vấn đề là trong cùng một button nhưng chúng ta cần 2 loại font khác nhau cho icon và văn bản trong khi ta chỉ thiết lập được 1 loại font cho 1 button. Ở đây ta có thể sử dụng typeface span để giải quyết vấn đề này.

Tuy nhiên phương án này cũng không khả thi nếu chúng ta hỗ trợ nhiều hơn một ngôn ngữ và với nhiều hơn một phông chữ. Khi đó span cũng không giải quyết được vấn đề.

![](https://images.viblo.asia/8708b6d2-c747-4315-8930-43950390740f.png)

Vì vậy, trong Android Q, CustomFallbackBuilder được thêm vào lớp Typeface. Nó cho phép bạn tạo một typeface với nhiều phông chữ. Sau đây là một ví dụ về đa ngôn ngữ và đa phông chữ:

```java
textView.typeface = Typeface.CustomFallbackBuilder(
    FontFamily.Builder(
        Font.Builder(assets, "lato.ttf").build()
    ).build()
).addCustomFallback(
    FontFamily.Builder(
        Font.Builder(assets, "kosugi.ttf").build()
    ).build()
).build()
```

Tiếp theo là một ví dụ về icon và font mà cả 2 có font khác nhau:
```java
button.typeface = Typeface.CustomFallbackBuilder(
    FontFamily.Builder(
        Font.Builder(assets, "lato.ttf").build()
    ).build()
).addCustomFallback(
    FontFamily.Builder(
        Font.Builder(assets, "icon_font.ttf").build()
    ).build()
).build()
```

Khi tạo một typeface bằng builder này, bạn có thể thêm tối đa 64 phông chữ.

Nói chung, hệ thống sẽ thực hiện một số tìm kiếm tuần tự cho các phông chữ. Ví dụ: nếu phông chữ là ***lato*** thì nó sẽ tìm kiếm ***lato***. Nếu ***lato*** được tìm thấy thì phông chữ đó sẽ được chỉ định nếu không hệ thống sẽ sử dụng system font fallback. Đoạn mã định nghĩa system font fallback:

```java
Typeface.CustomFallbackBuilder(
    FontFamily.Builder(
        Font.Builder(assets, "lato.ttf").build()
    ).build()
).setSystemFallback("sans-serif")
.build()
```

Vì vậy, trong ví dụ trên, nếu một ký tự không được lato hỗ trợ, thì hệ thống sẽ sử dụng phông chữ ***sans-serif*** cho kí tự đó.

**Font.Builder**: Trong khi tạo phông chữ, bạn có thể đặt trọng số và độ nghiêng của đối tượng phông chữ.

```java
Font.Builder(assets, "lato_bold_italic.ttf")
    .setWeight(700)
    .setSlant(FontStyle.FONT_SLANT_ITALIC)
    .build()
```

### System Fonts

Android hỗ trợ hơn 100 ngôn ngữ và tất cả các ngôn ngữ này có thể yêu cầu các tệp phông chữ khác nhau. Ví dụ: phông chữ Hindi yêu cầu phông chữ Devanagari. Vì vậy, để hỗ trợ một số lượng lớn ngôn ngữ, các thiết bị Android có nhiều tệp phông chữ. Ví dụ: với máy pixel 3, nó có hơn 270 tệp phông chữ được cài đặt. Vì vậy, chúng được gọi là System Fonts (Phông chữ hệ thống).

![](https://images.viblo.asia/5411e737-9246-4ba6-b9b5-56a5f6b9f2f1.png)

Để vẽ văn bản, các ứng dụng NDK như trình xem tài liệu cần biết phông chữ hệ thống nào có thể hiển thị văn bản đã cho. Có 2 API được cung cấp để hỗ trợ công việc này:

**Font Matcher API**: ***AFontMatcher_match*** được sử dụng để tìm phông chữ hệ thống nào có thể hiển thị một văn bản đã cho. Ví dụ:

![](https://images.viblo.asia/01343de8-66cd-4dc8-bfe3-1695773ac2b7.png)

Trong hình trên, dòng đầu tiên của mã sẽ trả về phông chữ ***NotoSansCJK*** và độ dài là 3. Dòng thứ hai sẽ trả về phông chữ ***Roboto*** và độ dài là 8 còn dòng mã thứ ba sẽ trả về phông chữ ***NotoSansCJK*** có độ dài là 2.

API này sẽ không bao giờ trả về một ***NullPointer***. Nếu không có phông chữ nào được hiển thị thì nó sẽ trả về một ***byte font object***. Và đối tượng phông chữ này sẽ được sử dụng để vẽ các biểu tượng bị thiếu gọi là ***Tofu***. Và nếu không có phông chữ nào phù hợp thì API sẽ trả về phông chữ giống nhất với phông chữ được yêu cầu.

**Font Enumeration API**: Nếu bạn muốn biết các tệp phông chữ nào có trong hệ thống Android của mình thì bạn có thể tìm thấy các tệp này với sự trợ giúp của Font Enumeration API. Nó sẽ cấp quyền truy cập vào các tệp phông chữ được cài đặt bởi hệ thống. Hãy xem cách sử dụng:

```java
for(font in SystemFonts.getAvailableFonts()) {
    //choose your font here
}
```

Tại đây, với sự trợ giúp của phương thức getAvailableFonts(), bạn có thể truy cập tất cả các phông chữ có trong Hệ thống.

Trong trường hợp của NDK, chúng ta phải tạo một vòng lặp và sau đó với sự trợ giúp của ASystemFontIterator, bạn có thể trỏ vào phông chữ tiếp theo và sau đó sử dụng nó.

```java
ASystemFontIterator* iterator = ASystemFontIterator_open();
AFont* font;
while((font = ASystemFontIterator_next(iterator)) != nullptr) {
    AFont_close(font);
}
ASystemFontIterator_close(iterator);
```

Hiệu năng của Font Enumeration API không quá tốt. Vì vậy, bạn nên lưu trữ lại kết quả trả về và tái sử dụng thay vì gọi tới phương thức này liên tục.

### Editable Text

Một trong những lớp con được sử dụng nhiều nhất của TextView là EditText. Nói chung, hầu hết mọi thứ được áp dụng trên TextView theo mặc định cũng được áp dụng cho EditText. Nhưng ngoài điều này, chúng ta nên quan tâm đến một số điều khác liên quan đến EditText. các quá trình diễn ra trong khi sử dụng EditText:

![](https://images.viblo.asia/c656f9bf-a447-4248-ac39-5091a09d360f.png)

Quá trình đầu tiên là ứng dụng của bạn, thứ hai là bàn phím mềm được sử dụng để lấy đầu vào từ thiết bị và thứ ba là quy trình hệ thống phối hợp hai quy trình này. Tất cả các công việc giao tiếp này được gọi là Inter-Process Communication. Vì vậy, việc trì hoãn trong một quy trình có thể dẫn đến sự chậm trễ của các quy trình khác. EditText có sáu thành phần chính sau:

![](https://images.viblo.asia/63260c51-4c28-4448-84bd-75b700cc2895.png)

1. **Background**: Đây là nền của EditText, ví dụ bạn có thể cập nhật màu nền bằng cách sử dụng thuộc tính này.
2. **Cursor**: Đó là con trỏ xuất hiện khi bạn gõ một cái gì đó trên EditText. Bạn cũng có thể thay đổi màu sắc của con trỏ này.
3. **Handle**: Đây là handle của con trỏ. Bạn có thể thay đổi màu của handle này.
4. **Edit Text Colour**: Đây là màu của văn bản có trong EditText.
5. **Text Colour Hint**: Đó là màu của văn bản gợi ý có trong EditText.
6. **Text Highlight Color**: Đó là màu của EditText được hiển thị khi bạn chọn một số văn bản trên EditText.

Có rất nhiều vấn đề có thể xảy ra trong khi sử dụng EditText. Ví dụ, trong khi sử dụng EditText để nhập tên người dùng, trường hợp sau có thể xảy ra:

![](https://images.viblo.asia/c291530d-f3a7-4a6a-808e-2fd0f1a78bb1.png)

Vì vậy, bạn phải sử dụng EditText theo cách nó sẽ hiển thị thông báo lỗi một cách chính xác và thông báo không nên bị bàn phím che mất.

Có một giải pháp rất đơn giản cho vấn đề trên. Tất cả những gì bạn cần làm là bảo hệ thống sử dụng phần màu vàng thay vì sử dụng phần màu xanh như dưới đây.

![](https://images.viblo.asia/063cff33-605d-4362-be4d-a43ec6ddc80a.png)

Để làm được như vậy, bạn phải kế thừa từ EditText và ghi đè 3 phương thức:

```java
class MyEditText : AppCompatEditText {

    //find next focusable widget
    override fun getFocusedRect(rect : Rect?) { }

    //return visible view area
    override fun getGlobalVisibleRect(r: Rect?, globalOffset: Point?): Boolean { }

    //request for an area to be visible if required by scroll
    override fun requestRectangleOnScreen(rectangle: Rect?): Boolean { }
}
```

getFocusedRect() sẽ tìm khu vực tiếp theo được focus, getGlobalVisibleRect() xác định vùng hiển thị của một view và requestRectangleOnScreen() được EditText sử dụng để yêu cầu Hệ thống hiển thị một khu vực nhất định trên màn hình.

### Kết luận

Trong bài viết này, chúng ta đã tìm hiểu một số best practices cho việc sử dụng text trong Android. Bởi trong một ứng dụng Android, text chiếm tới 70%, do đó nó trở nên cần thiết để sử dụng text một cách đảm bảo hiệu năng nhất.

Nguồn: https://blog.mindorks.com/best-practices-for-using-text-in-android