Hin chào, lại là tôi đây, đây là bài cuối trong series mastering android themes. Vẫn câu nói cũ, nếu bạn chưa đọc qua Chapter 1, Chapter 2 và Chapter 3 thì tôi khuyên bạn nên bỏ ra 30 phút quay lại đọc 3 phần đó trước khi đọc bài này nha.
####
*Trong chương 3, chúng ta đã đồng ý sử dụng ngôn ngữ thiết kế và tạo các thuộc tính tùy chỉnh được căn chỉnh theo ngôn ngữ thiết kế. Chúng ta hiểu theme tương đương với một đối tượng chứa đầy các giá trị được sử dụng bởi các views trong lúc runtime. Đã đến lúc phải tạo ra theme.*

![](https://images.viblo.asia/c024e130-d059-4c90-aaaa-a41ed9bd3371.gif)

Đến bây giờ, bạn phải có khả năng tạo ra material design theme và các nhà thiết kế của bạn phải tự hào về các chi tiết triển khai của bạn. Làm thế nào về việc nhảy đến dynamic theme?

###
### Dynamic Theme

Hãy để tôi hỏi bạn một câu hỏi, cố gắng viết câu trả lời nhé. Giả sử bạn đang tạo một tập hợp các ViewGroups đóng vai trò là một ViewGroup dùng chung trong dự án và nó chứa thanh toolBar với màu là primaryColor, bạn sẽ làm như thế nào?
Rất nhiều Anh em sẽ viết dư này: 
```xml
<FrameLayout 
    width, height ... other properties
    android:background="@color/colorPrimary">
</FrameLayout>
```

Nếu bạn hardcode mã màu, hãy bắt đầu lại từ chương 1. Nếu bạn đã tạo custom style và áp dụng titleBarStyle với chiều cao tối thiểu và các thuộc tính phổ biến khác thì... chúc mừng!

Nhưng chúng ta đã học được chủ đề này trong chương trước. Nhưng chúng  ta ở đây để học các chủ đề năng động, phải không nhể? Đúng rồi, chúng ta ở đây để học tạo ra dynamic theme. Giải pháp trên là chính xác khi bạn chỉ có một theme, nó không áp dụng được cho những ứng dụng có nhiều theme. Điều gì có thể là giải pháp? Bạn có thể đoán -> **custom attribute**

####
attr.xml
```xml
<attr name="themeColorPrimary" format="reference"/>
```

Sử dụng
```xml
<FrameLayout
    width, height ... other properties
    android:background="?themeColorPrimary">
</FrameLayout>
```

Chúng tôi đã định nghĩa một thuộc tính themeColorPrimary và chúng ta đang sử dụng nó. Thẻ attr cho biết thuộc tính này là một reference có giá trị được xác định ở một nơi khác. Nếu bạn sử dụng attr này mà không xác định giá trị của nó, ứng dụng của bạn sẽ bị cờ-rát. Vậy chúng ta định nghĩa nó ở đâu? Tôi đoán Theme là một lựa chọn tốt.

####
Theme 1 : Indigo
```xml
<style name="IndigoTheme" parent="Theme.AppCompat.Light.DarkActionBar">
    <item name="colorPrimary">@color/indigo</item>
    <item name="colorPrimaryDark">@color/indigoDark</item>
    <item name="colorAccent">@color/indigoLight</item>
    <item name="textColorPrimary">@color/black</item>
    <item name="textColorConnected">@color/green</item>
    <item name="textColorDisConnected">@color/light_gray</item>    
    <item name="themeColorPrimary">@color/indigo</item>
</style>
```

Theme 2: Pink

```xml
<style name="PinkTheme" parent="Theme.AppCompat.Light.DarkActionBar">
    <item name="colorPrimary">@color/pink</item>
    <item name="colorPrimaryDark">@color/pinkDark</item>
    <item name="colorAccent">@color/pinkLight</item>
    <item name="textColorPrimary">@color/black</item>
    <item name="textColorConnected">@color/green</item>
    <item name="textColorDisConnected">@color/light_gray</item>    
    <item name="themeColorPrimary">@color/pink</item>
</style>
```

Bây giờ bạn có thể chỉ cần áp dụng các  themes này một cách linh hoạt:

```xml
setTheme(R.style.PinkTheme);
```
hoặc
```xml
setTheme(IndigoTheme);
```

###
> Mẹo: Bạn cần gọi phương thức **recreate()** trong **Activity** để đảm bảo **Activity** tự tạo lại và vòng đời được gọi lại, do đó bạn có thể **inflate xml** của mình với **theme** mới trong phương thức **onCreate ()**.
> 

###
Có phải đơn giản vậy không? Tuy nhiên tôi thấy một vấn đề nhỏ ở đây. Quy tắc số 1 của lập trình: trùng lặp là xấu! Nó dẫn đến các vấn đề **maintain** trong tương lai và chúng ta chỉ để lại sự trùng lặp trong các theme trên. **colorPrimary** và **themeColorPrimary** đều được gán cùng một giá trị. Là một master, chúng ta không thể chịu đựng được những sai sót như vậy. Còn cái này thì sao?
###
Theme 1 : Indigo

```xml
<style name="IndigoTheme" parent="Theme.AppCompat.Light.DarkActionBar">
    <item name="colorPrimary">?themeColorPrimary</item>
    ...
     ....
    <item name="themeColorPrimary">@color/indigo</item>
</style>
```

Theme 2: Pink

```xml
<style name="PinkTheme" parent="Theme.AppCompat.Light.DarkActionBar">
    <item name="colorPrimary">?themeColorPrimary</item>
    ...
     ....
    <item name="themeColorPrimary">@color/pink</item>
</style>
```

Woo! Bây giờ colorPrimary đang refer đến custom attr của chúng ta. Thật tuyệt vời!
Bạn vẫn thấy phạm vi cải thiện ở đây? Viết câu trả lời của bạn trước khi đọc thêm.

Yessssss!  Chúng ta đã làm xml  dễ đọc hơn một chút và loại bỏ trùng lặp nhưng tôi vẫn ngửi thấy sự trùng lặp có thể tránh được một cách dễ dàng.

```xml
<item name="colorPrimary">?themeColorPrimary</item>
```

tại hai nơi (trong cả hai theme). Tại sao không làm cho nó tốt hơn! 
Còn cái này thì sao?

```xml
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
    <item name="colorPrimary">?themeColorPrimary</item>
</style>
```

Theme 1 : Indigo

```xml
<style name="ThemeIndigo" parent="AppTheme>
    <item name="themeColorPrimary">@color/indigo</item>
</style>
```
Theme 2 : Pink
```xml
<style name="ThemePink" parent="AppTheme>
    <item name="themeColorPrimary">@color/pink</item>
</style>
```

Chúng ta chỉ tạo một theme chính và extends ra hai theme từ nó. Chúng tôi hiểu việc sử dụng thực sự của Kế thừa. Chúng ta thực sự là một bậc thầy =))


Không cần phải nói, bây giờ bạn có thể tạo các theme tuyệt vời. Cả tĩnh và động. Chúc mừng!
####

Chúng ta đã đi một chặng đường dài. Tôi cúi chào bạn, Master. (haha)

### Tài liệu tham khảo
- [Medium](https://medium.com/mindorks/mastering-android-themes-chapter-4-591e03320182)
- [Android](https://developer.android.com/guide/topics/ui/look-and-feel/themes)
- [Google](https://chromium.googlesource.com/android_tools/+/25d57ead05d3dfef26e9c19b13ed10b0a69829cf/sdk/platforms/android-23/data/res/values/themes.xml)