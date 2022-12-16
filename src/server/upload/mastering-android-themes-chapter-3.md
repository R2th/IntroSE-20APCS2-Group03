Hin chào, lại là tôi đây, đây là bài thứ 3 trong series mastering android themes. Nếu bạn chưa đọc qua [Chapter 1](https://viblo.asia/p/mastering-android-themes-chapter-i-djeZ10dQKWz) và [Chapter 2](https://viblo.asia/p/mastering-android-themes-chapter-2-bWrZngorlxw) thì tôi khuyên bạn nên bỏ ra 20 phút quay lại đọc 2 phần đó trước khi đọc bài này nha.
####
*Trong chapter 2, chúng ta đã đồng ý với nhau là phải có một design language tốt, và các Expert Dev phải đảm bảo được rằng họ định nghĩa ra các thuật ngữ tốt để các designer có thể dễ dàng hiểu được và implement nó. Ok tiếp tục nèo*
###
**Cùng xem lại ví dụ ở trong chapter trước nhé**
####
Color.xml
#####
```xml
<resources>
<color name="window_background">#d2d2d2</color>
<color name="content_background">#FFFFFF</color>
<color name="content_text">#000000</color>
</resources>
```

Dimen.xml
```xml
<resources>
    <dimen name="text_size_h1">22dp</dimen>
    <dimen name="text_size_h2">20dp</dimen>
    <dimen name="text_size_h3">18dp</dimen>
    <dimen name="text_content_padding">8dp</dimen>
    <dimen name="text_content_margin">16dp</dimen>
</resources>
```

#### 
Áp dụng cho textView
```xml
<TextView
    android:id="@+id/heading"
    android:style="@style/heading_text_style"/>
```
###
Như bạn thấy các file resource ở trên, colors và dimens định nghĩa riêng cho từng ngữ cảnh và theme đó được sử dụng bởi các designer. Nếu bạn hardcode hoặc sử dụng tên ngữ nghĩa như kiểu padding_16, padding_24 thì xin mời đọc lại chapter 1 và chapter 2 nhé -_-

###

**Out of the box Theme in Android**
####
Giả sử rằng bạn đã biết về Material Design và ta sẽ có 3 màu primaryColor, secondaryColor, accentColor sẽ sử dụng cho toàn app. Đây là cái gì? Vâng đó chính là Theme Attribute

Đây là màu được hệ thống sử dụng để vẽ các thành phần tiêu chuẩn. Ví dụ toolbar sẽ lấy màu primary, systemBar sẽ lấy màu primaryDark, floatButtonAction sẽ lấy màu accent. Việc sử dụng những màu này hay không phụ thuộc vào View implement style đó. Tất cả các thành phần trong system đều tuân thủ material design attributes. Bạn hoàn toàn có thể tự custom actionBar riêng của mình và không tuân thủ theo attribute của hệ thống.

Nói theo cách đơn giản, đó là những attributes của theme. Attribute là các thuộc tính có name và value và đương nhiên bạn cũng có thể tự viết các attribute cho riêng mình.

Bạn có thể relate attribute tới constants. Để tôi chỉ cho bạn nha
```xml
<item name="colorPrimary">#303F9F</item>
```

Đó attribute colorPrimary đã được gán mã màu là: #303F9F. Theme là đối tượng bất biến có thuộc tính mà bạn không thể sửa đổi trong lúc runtime. Do đó mã màu đã được fix cứng là #303F9F.

Tương tự như 3 màu cơ bản ở trên, trong theme có rất nhiều các properties nữa như là: windowBackground, windowActionBarOverlay, textColorPrimary, textColorSecondary....
Hãy nhớ rằng các thuộc tính này được xác định bởi hệ thống Android và các thành phần gốc như TextView đọc các giá trị từ các thuộc tính này để bạn có được màu sắc mà bạn chọn.
Mỗi View bạn sử dụng trong Layout đều tuân thủ đến một số thuộc tính này. Để xem thêm về các thuộc tính của theme thì các bạn tham khảo ở [đây](https://chromium.googlesource.com/android_tools/+/25d57ead05d3dfef26e9c19b13ed10b0a69829cf/sdk/platforms/android-23/data/res/values/themes.xml) nhé.

Bây giờ chúng ta biết Custome theme tương đương với chỉ định một số giá trị cho các thuộc tính mà View sẽ sử dụng trong lúc runtime để tự vẽ. Ví dụ về một Custome theme.

```xml
<style name="IndigoTheme" parent="Theme.AppCompat.Light.DarkActionBar">
    <item name="colorPrimary">@color/indigo</item>
    <item name="colorPrimaryDark">@color/indigoDark</item>
    <item name="colorAccent">@color/indigoLight</item>
    <item name="textColorPrimary">@color/black</item>
    <item name="textColorSecondary">@color/gray</item>
</style>
```

IndigoTheme đang extends theme DarkActionBar từ hệ thống và ghi đè vài thuộc tính, phần còn lại sẽ được cung cấp các giá trị mặc định mà bạn có thể kiểm tra bên trong theme DarkActionBar. Chúng tôi có thể áp dụng chủ đề này cho application hoặc activity.
###

**Extending theme capability — custom properties**

####
Đôi khi, chúng tôi muốn xác định một số thuộc tính tương ứng với vấn domain mà chúng tôi đang giải quyết. Ví dụ: ứng dụng của bạn cần hiển thị trạng thái kết nối với người dùng mọi lúc và bạn muốn xác định 2 màu để **connected** và **not connected**.
Những new dev hoặc dev còn non thường hardcode hoặc đặt tên theo kiểu ngữ nghĩa, nào hãy cùng viết theo cách của expert nào =))

####
attr.xml
```xml
<attr name="textColorConnected" format="reference"/>
<attr name="textColorDisConnected" format="reference"/>
```
####
And we will define these values in our theme
####
```xml
<style name="IndigoTheme" parent="Theme.AppCompat.Light.DarkActionBar">
    <item name="colorPrimary">@color/indigo</item>
    <item name="colorPrimaryDark">@color/indigoDark</item>
    <item name="colorAccent">@color/indigoLight</item>
    <item name="textColorPrimary">@color/black</item>
    <item name="textColorConnected">@color/green</item>
    <item name="textColorDisConnected">@color/light_gray</item>
</style>
```

####
Bây giờ, trong View hoặc trong selector của chúng tôi, chúng tôi có thể sử dụng các thuộc tính tùy chỉnh. Nó cho cảm giác gần gũi với vấn đề xử lý domain và ngôn ngữ thiết kế đóng vai trò của nó. Ví dụ về cách sử dụng

```xml
<TextView
    android:id="@+id/heading"
    android:style="@style/heading_text_style"
    android:textColor="?textColorConnected"
/>
```

Ở đây tôi sử dụng tên attr custom của mình nhưng tôi đảm bảo giá trị đến từ thuộc tính được hệ thống xác định mà nhà phát triển có thể custom khi extends từ theme.

###
==> **Yeah, từ đây trở đi bạn đã là một chuyên gia về theme trong Android**

#### Tổng kết
Bạn hiểu theme ở dạng rất đơn giản, một đối tượng mô hình mang các đặc tính được sử dụng bởi các View lúc runtime. Bạn đã thấy sức mạnh của các custom properties được liên kết với ngôn ngữ thiết kế và cách chúng tôi có thể tham chiếu thuộc tính hệ thống cho các custom properties của chúng tôi.

Phần còn lại chỉ là làm thế nào để thay đổi theme một cách chủ động. Làm thế nào tôi có thể cung cấp 5 theme trong ứng dụng và cho phép người dùng chọn màu nào mình muốn. Chúng tôi sẽ giải thích phần còn lại trong chương sau. Bạn đã sẵn sàng để trở thành bậc thầy của các chủ đề Android?

#### Tài liệu tham khảo 
- [Medium](https://medium.com/mindorks/mastering-android-themes-chapter-3-26a5b7773b6b)
- [Android](https://developer.android.com/guide/topics/ui/look-and-feel/themes)
- [Google](https://chromium.googlesource.com/android_tools/+/25d57ead05d3dfef26e9c19b13ed10b0a69829cf/sdk/platforms/android-23/data/res/values/themes.xml)