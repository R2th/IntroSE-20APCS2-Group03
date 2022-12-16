## Initial setup
Điều này đơn giản bằng cách thêm một phụ thuộc Gradle duy nhất vào tệp build.gradle app/module của bạn:
```
implementation "com.google.android.material:material:$material_version"
```

Material Components cho Android đang được phát triển tích cực. Bản phát hành 1.0.0 ban đầu chủ yếu chỉ là một cổng của các lớp com.android.support.design hiện có trên không gian tên(namespace) mới com.google.android.material. Bản phát hành độc lập theo kế hoạch đầu tiên là 1.1.0, hiện tại phiên bản mới nhất đang là 1.1.0-alpha07. Bạn có thể theo dõi các bản phát hành mới trên [GitHub repository](https://github.com/material-components/material-components-android/releases).

## Chọn một theme Material Components
Cũng như các themes AppCompat, các themes Material Component bao gồm một vài biến thể(variants) cơ sở để bạn lựa chọn:

Material Components themes (từ trái sang phải): 

Theme.MaterialComponents, Theme.MaterialComponents.NoActionBar, Theme.MaterialComponents.Light
![](https://images.viblo.asia/fc2633f9-ee2e-42ce-bf99-9f60de93a5d5.png)

Theme.MaterialComponents.Light.DarkActionBar, Theme.MaterialComponents.Light.NoActionBar
![](https://images.viblo.asia/348267f4-689f-44dc-87a5-ef8563771618.png)

Sự khác biệt chính trong mỗi biến thể là bảng màu light/dark và bao gồm hay loại bỏ ActionBar trong mỗi màn hình Activity theo theme.

*Lưu ý 1*: Nếu bạn đang migrate một theme hiện có và không muốn nhận tất cả các thuộc tính mới cùng một lúc, hãy sử dụng một biến thể Theme.MaterialComponents.*.Bridge.

*Lưu ý 2*: Một số biến thể secondary không được hiển thị ở đây, chẳng hạn như Theme.MaterialComponents.Dialog.*.

Để bắt đầu sử dụng một trong những theme này trong ứng dụng của bạn, bạn hãy thêm phần sau vào tệp res/styles.xml của mình:
```
<style name="AppTheme" parent="Theme.MaterialComponents.*">
    <!-- Add attributes here -->
</style>
```

Cuối cùng, bạn cần reference nó trong Manifest của bạn:
```
<manifest
    ...>
    <application
        android:theme="@style/AppTheme">
        ...
    </application>
</manifest>
```

*Lưu ý*: Bạn cũng có thể áp dụng android:theme cho mỗi `<activity>` trong Manifest của bạn.

## Màn hình các thành phần đơn giản
Để minh họa các hiệu ứng của việc tùy chỉnh các thuộc tính Material Components, chúng tôi sẽ thực hiện một ví dụ trực quan. Chúng ta sẽ sử dụng màn hình bên dưới, sử dụng chủ đề cơ sở `Theme.MaterialComponents.Light` và được đóng gói với hầu hết các widget Material Components và các biến thể của chúng:
![](https://images.viblo.asia/8f436552-db8f-4a35-9d44-e558486cbb43.png)

## Các thuộc tính Global của theme
Các chủ đề Material Components giới thiệu các thuộc tính mới có thể được sử dụng để định kiểu các thành phần trên phạm vi global. Chúng có thể được nhóm thành ba hệ thống con chính: **color**, **typography** và **shape**.

### Color
Các thuộc tính Color bao gồm chủ yếu là **primary**, **secondary**, **error**, **surface** và **background**, cùng với các biến thể secondary tương ứng của chúng. Một số trong số này đã được sử dụng lại từ các chủ đề `AppCompat` (ví dụ: `colorPrimary`, `colorError` và `android:colorBackground`):
* `colorPrimary`: Màu primary brand của ứng dụng của bạn, được sử dụng chủ yếu trong chủ đề
* `colorPrimaryVariant`: Một biến thể lighter/darker của màu primary brand của bạn, được sử dụng một cách tiết kiệm trong chủ đề
* `colorOnPrimary`: Màu được sử dụng cho các thành phần được hiển thị bên trên các màu primary của bạn (ví dụ: Text and icons, thường là màu white hoặc semi-transparent black tùy thuộc vào khả năng truy cập)
* `colorSecondary`: Màu secondary brand của ứng dụng của bạn, được sử dụng chủ yếu làm điểm nhấn cho một số widgets nhất định cần nổi bật
* `colorSecondaryVariant`: Một biến thể lighter/darker của màu secondary brand của bạn, được sử dụng một cách tiết kiệm trong chủ đề
* `colorOnSecondary`: Màu được sử dụng cho các thành phần được hiển thị trên đầu màu secondary của bạn
* `colorError`: Màu được sử dụng cho các lỗi (thường là màu red)
* `colorOnError`: Màu được sử dụng cho các thành phần được hiển thị bên trên màu error của bạn
* `colorSurface`: Màu sắc được sử dụng cho các bề mặt (ví dụ: Material “sheets”)
* `colorOnSurface`: Màu được sử dụng cho các yếu tố được hiển thị trên đầu màu bề mặt của bạn
* `android:colorBackground`: Màu sắc đằng sau tất cả các nội dung màn hình khác
* `colorOnBackground`: Màu được sử dụng cho các thành phần được hiển thị trên đầu màu background của bạn

Những màu này có thể được thêm vào chủ đề ứng dụng của bạn như sau:
```
<style name="AppTheme" parent="Theme.MaterialComponents.Light">
    <item name="colorPrimary">#212121</item>
    <item name="colorPrimaryVariant">#000000</item>
    <item name="colorOnPrimary">#FFFFFF</item>
    <item name="colorSecondary">#2962FF</item>
    <item name="colorSecondaryVariant">#0039CB</item>
    <item name="colorOnSecondary">#FFFFFF</item>
    <item name="colorError">#F44336</item>
    <item name="colorOnError">#FFFFFF</item>
    <item name="colorSurface">#FFFFFF</item>
    <item name="colorOnSurface">#212121</item>
    <item name="android:colorBackground">@color/background</item>
    <item name="colorOnBackground">#212121</item>
</style>

<color name="background">#FAFAFA</color>
```

*Lưu ý 1*: Mã màu hex hiện không được hỗ trợ cho android:colorBackground, đó là lý do tại sao một color resource được sử dụng.

*Lưu ý 2*: Sử dụng các thuộc tính android:statusBarColor và android:navigationBarColor cho các system bar.

Kết quả có thể được quan sát trong màn hình sau:
![](https://images.viblo.asia/f47f4bc1-8151-4b13-98cc-b78512f6bc30.png)

Một cách tuyệt vời để nhanh chóng xem trước sự xuất hiện của màu primary/secondary là sử dụng  [Material Color Tool](https://material.io/tools/color/).

### Typography
Thuộc tính loại tuân thủ Material Type System về typeface, weight, size, case và letter spacing. Các thuộc tính tham chiếu TextAppearance.MaterialComponents.* implement (và được đặt tên theo) các loại thang đo khác nhau:

* `textAppearanceHeadline1`: Light, 96sp
* `textAppearanceHeadline2`: Light, 60sp
* `textAppearanceHeadline3`: Regular, 48sp
* `textAppearanceHeadline4`: Regular, 34sp
* `textAppearanceHeadline5`: Regular, 24sp
* `textAppearanceHeadline6`: Medium, 20sp
* `textAppearanceSubtitle1`: Regular, 16sp
* `textAppearanceSubtitle2`: Medium, 14sp
* `textAppearanceBody1`: Regular, 16sp
* `textAppearanceBody2`: Regular, 14sp
* `textAppearanceCaption`: Regular, 12sp
* `textAppearanceButton`: Regular, 14sp, all caps
* `textAppearanceOverline`: Regular, 12sp, all caps

Các widget Material Components sẽ sử dụng các style này theo hướng dẫn Material.

Thông thường bạn sẽ muốn giữ weight, size, case and letter spacing mặc định cho mỗi style. Tuy nhiên, một typeface tùy chỉnh thực sự có thể làm cho ứng dụng của bạn nổi bật. Người ta có thể cho rằng điều này đòi hỏi phải ghi đè lên từng thuộc tính này. Rất may, điều này có thể được thực hiện theo cách ngắn gọn hơn bằng cách thêm các thuộc tính sau vào theme ứng dụng của bạn:

```
<style name="AppTheme" parent="Theme.MaterialComponents.Light">
    ...
    <item name="fontFamily">@font/roboto_mono</item>
    <item name="android:fontFamily">@font/roboto_mono</item>
</style>
```

Các thuộc tính này tham chiếu XML Font hoặc Downloadable Font mà bạn đã thêm vào thư mục res/font và sẽ áp dụng một typeface tùy chỉnh cho mọi widget và text style trong ứng dụng của bạn.

Tuy nhiên, nếu bạn muốn tùy chỉnh một trong các kiểu xuất hiện văn bản của Thành phần Vật liệu, bạn sẽ làm như sau:

```
<style name="AppTheme" parent="Theme.MaterialComponents.Light">
    ...
    <item name="textAppearanceButton">@style/AppTextAppearance.Button</item>
</style>
<style name="AppTextAppearance.Button" parent="TextAppearance.MaterialComponents.Button">
    ...
    <item name="android:textAllCaps">false</item>
</style>
```

Các kết quả có thể được quan sát trong màn hình sau:
![](https://images.viblo.asia/ee05f41d-a76c-42c7-bb33-0c42aa0e82c8.png)

Cuối cùng, [Google Fonts](https://fonts.google.com/) là một nơi tuyệt vời để bắt đầu nếu bạn đang tìm kiếm các typefaces tùy chỉnh, dễ sử dụng (điều này cũng hoạt động rất tốt với Downloadable Fonts).

### Shape
Thuộc tính hình dạng đề cập đến hình thức chung của từng surface và widget trong ứng dụng của bạn. Khi bạn xem xét rằng các thành phần này có thể có width/height khác nhau và được raised/unelevated/outlined, điều này sẽ giảm xuống một khía cạnh của việc tùy biến Corners.

Các Material Components corner có thể là một phần của góc tròn (mặc định) hoặc `cornerFamily` và có một `cornerSize` để tùy chỉnh kích thước. Một điều trị có thể được áp dụng cho tất cả các corner hoặc một tập hợp con. Các thuộc tính chủ đề hình dạng tham chiếu `ShapeAppearance.MaterialComponents.*` style:

* `shapeAppparentSmallComponent`: Dành cho các thành phần nhỏ, chẳng hạn như các Button và Chip
* `shapeAppparentMediumComponent`: Dành cho các thành phần trung bình, chẳng hạn như Card
* `shapeAppparentLargeComponent`: Dành cho các thành phần lớn, chẳng hạn như Bottom Sheet

Các widget Material Component sẽ sử dụng các style này theo hướng dẫn Material.

Nếu bạn muốn tùy chỉnh các kiểu dáng hình dạng Material Component, bạn sẽ làm như sau:
```
<style name="AppTheme" parent="Theme.MaterialComponents.Light">
    ...
    <item name="shapeAppearanceSmallComponent">@style/AppShapeAppearance.SmallComponent</item>
    <item name="shapeAppearanceMediumComponent">@style/AppShapeAppearance.MediumComponent</item>
</style>

<style name="AppShapeAppearance.SmallComponent" parent="ShapeAppearance.MaterialComponents.SmallComponent">
    <item name="cornerFamily">cut</item>
    <item name="cornerSize">8dp</item>
</style>

<style name="AppShapeAppearance.MediumComponent" parent="ShapeAppearance.MaterialComponents.MediumComponent">
    <item name="cornerFamily">cut</item>
    <item name="cornerSize">8dp</item>
</style>
```

Kết quả có thể được quan sát trong màn hình sau:
![](https://images.viblo.asia/6e0f6790-3f66-4d2a-8db9-45d798bcd7c4.png)

Tham khảo: https://medium.com/over-engineering/setting-up-a-material-components-theme-for-android-fbf7774da739