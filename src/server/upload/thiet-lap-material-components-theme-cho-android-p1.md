Khi bạn chuyển ứng dụng của mình từ Android sang AndroidX cũng chính là bạn đã chuyển đổi từ việc sử dụng **Design Support Library** sang sử dụng **Material Components**. Cũng có thể bạn là người may mắn khi bắt đầu một ứng dụng AndroidX từ đầu và sử dụng các thư viện mới này ngay lập tức. Trong cả hai trường hợp trên, những tiện ích cốt lõi mà bạn kết hợp vào ứng dụng của bạn giờ đây hầu hết nằm trong gói **com.google.android.material** mang trong mình nhiều theme/style attributes. Bài viết này sẽ chỉ đề cập đến theme attributes mới và per-widget style attributes.

Let's begin

## I. Thiết lập ban đầu

Đầu tiên bạn cần thêm dòng này vào trong file build.gradle:

`implementation "com.google.android.material:material:$material_version"`

Material Components cho Android đang được phát triển một cách tích cực. Bản phát hành đầu tiên là 1.1.0 và tại thời điểm viết bài, phiên bản mới nhất là 1.1.0-alpha10. Bạn có thể theo dõi các bản phát hành mới trên [Github](https://github.com/material-components/material-components-android/releases).

## II.  Lựa chọn Material Components theme 

Cũng như các themes trong AppCompat, Material Components themes cung cấp một vài biến thể cho bạn thỏa sức lựa chọn:

![](https://images.viblo.asia/7cd201ff-fed4-4b53-884c-56bec5a2551e.png)

![](https://images.viblo.asia/ba321e20-5fc3-4bc4-9de7-fef9c2f8ace6.png)

Sự khác biệt chính trong mỗi biến thể là bảng màu sáng/tối và việc bao gồm hay loại trừ ActionBar trong mỗi Activity. Có các biến thể Day/Night trong số này để hỗ trợ chủ đề sáng/tối tự động.

Để bắt đầu sử dụng một trong những theme ở trên trong ứng dụng của bạn, bạn hãy thêm những dòng sau vào trong file `res/styles.xml`: 

```Java
<style name="AppTheme" parent="Theme.MaterialComponents.*">
    <!-- Add attributes here -->
</style>
```

Cuối cùng, bạn hãy khai báo trong file manifest như sau:

```Java
<manifest
    ...>
    <application
        android:theme="@style/AppTheme">
        ...
    </application>
</manifest>
```

Lưu ý: Bạn có thể áp dụng android: theme cho mỗi `<activity>` trong file `Manifest`.

## III. Màn hình playground đơn giản

Để minh họa các hiệu ứng của việc tùy chỉnh các thuộc tính có trong Material Components chúng ta cần một ví dụ trực quan. Chúng ta sẽ sử dụng màn hình playground dưới đây, trong màn hình này sẽ sử dụng `Theme.MaterialComponents.Light`:

![](https://images.viblo.asia/1241d6a0-e967-4499-958f-2b34843953c6.png)

## IV. Global theme attributes

Các themes trong Material Components giới thiệu các thuộc tính mới có thể được sử dụng để định kiểu thành phần trên phạm vi global. Chúng có thể được chia thành 3 nhóm: **color**, **typography** và **shape**.

### 1. Color

Các thuộc tính màu bao gồm **primary**,  **secondary**,  **error**, **surface** và **background** colors, cùng với các biến thể thứ cấp tương ứng của chúng . Một số trong số này được sử dụng lại từ các Theme của AppCompat (VD: **colorPrimary**,  **colorError** và **android:colorBackground**):

* **colorPrimary**: Màu chính trong ứng dụng của bạn.
* **colorPrimaryVariant**: Một biến thể sáng hơn hoặc tối hơn của màu chính.
* **colorOnPrimary**: Màu được sử dụng cho các thành phần được hiển thị bên trên colorPrimary.
* **colorSecondary**: Màu thứ cấp trong ứng dụng của bạn, được sử dụng chủ yếu làm điểm nhấn cho một số widget nhất định cần nổi bật.
* **colorOnSecondary**: Màu được sử dụng cho các thành phần được hiển thị trên đỉnh của colorSecondary.
* **colorError**: Màu được sử dụng cho các thông báo lỗi (Thường là màu đỏ).
* **colorOnError**: Màu được sử dụng cho các thành phần được hiển thị bên trên colorError.
* **colorSurface**: Màu sắc được sử dụng cho phần bề mặt.
* **colorOnSurface**: Màu được sử dụng cho các yếu tố hiển thị bên trên colorSurface của bạn.
* **android:colorBackground**: Màu sắc nền.
* **colorOnBackground**: Màu được sử dụng cho các thành phần được hiển thị phía trên màu nền của bạn.

Những màu này có thể được thêm vào app theme của bạn như dưới đây:

```Java
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

Kết quả có thể được quan sát trong màn hình playground bên dưới:

![](https://images.viblo.asia/e5c9fe3b-7c6a-41c3-927f-556ea5733b99.png)

Một cách tuyệt vời để nhanh chóng xem trước sự xuất hiện của primary/secondary colors là sử dụng [Material Color Tools](https://material.io/resources/color/#!/).

### 2. Typography

Tất cả thuộc tính thuộc về mặt văn bản đều tuân thủ theo [Material Type System](https://material.io/design/typography/the-type-system.html) như **typeface**, **weight**, **size**, **case** và **letter spacing**. Các thuộc tính tham chiếu đến `TextAppearance.MaterialComponents.*`và được đặt tên theo các độ thang đo khác nhau: 

* **textAppearanceHeadline1**: Light, 96sp
* **textAppearanceHeadline2**: Light, 60sp
* **textAppearanceHeadline3**: Regular, 48sp
* **textAppearanceHeadline4**: Regular, 34sp
* **textAppearanceHeadline5**: Regular, 24sp
* **textAppearanceHeadline6**: Medium, 20sp
* **textAppearanceSubtitle1**: Regular, 16sp
* **textAppearanceSubtitle2**: Medium, 14sp
* **textAppearanceBody1**: Regular, 16sp
* **textAppearanceBody2**: Regular, 14sp
* **textAppearanceCaption**: Regular, 12sp
* **textAppearanceButton**: Regular, 14sp, all caps
* **textAppearanceOverline**: Regular, 12sp, all caps

Thông thường bạn sẽ muốn giữ khoảng cách về weight, size, case và chữ cái mặc định cho mỗi kiểu. Tuy nhiên, một kiểu chữ tùy chỉnh thực sự có thể làm cho ứng dụng của bạn nổi bật hơn. Bạn đang nghĩ đến điều này đòi hỏi phải ghi đè lên từng thuộc tính mặc định. Rất may, điều này có thể được thực hiện theo cách ngắn gọn hơn bằng cách thêm các thuộc tính sau vào theme trong ứng dụng của bạn:

```Java
<style name="AppTheme" parent="Theme.MaterialComponents.Light">
    ...
    <item name="fontFamily">@font/roboto_mono</item>
    <item name="android:fontFamily">@font/roboto_mono</item>
</style>
```

Các thuộc tính này tham chiếu từ [XML Font](https://developer.android.com/guide/topics/ui/look-and-feel/fonts-in-xml) hoặc  [Downloadable Font](https://developer.android.com/guide/topics/ui/look-and-feel/downloadable-fonts) mà bạn thêm vào trong thư mục res / font và sẽ áp dụng một kiểu chữ tùy chỉnh cho mọi tiện ích và kiểu văn bản trong ứng dụng của bạn. 

Tuy nhiên, nếu bạn muốn tùy chỉnh một trong những kiểu xuất hiện văn bản của Material Components, bạn sẽ làm như vậy:

```Java
<style name="AppTheme" parent="Theme.MaterialComponents.Light">
    ...
    <item name="textAppearanceButton">@style/AppTextAppearance.Button</item>
</style>
<style name="AppTextAppearance.Button" parent="TextAppearance.MaterialComponents.Button">
    ...
    <item name="android:textAllCaps">false</item>
</style>
```

Các kết quả có thể quan sát được trong màn playground dưới đây:![](https://images.viblo.asia/4a5cbaf0-a098-4133-b0cc-3654fdde18b0.png)

[Google Fonts ](https://fonts.google.com/)là một nơi tuyệt vời để bắt đầu nếu bạn đang tìm kiếm các kiểu chữ tùy chỉnh, dễ sử dụng.

### 3. Shape

Thuộc tính **Shape** đề cập đến hình thức chung của từng bề mặt trong ứng dụng của bạn. Material Components corners có thể là một phần của góc tròn (mặc định), hoặc cắt góc `cornerFamily` và có `cornerSize` để tùy chỉnh kích thước. Các thuộc tính của Shape tham chiếu đến `ShapeAppearance.MaterialComponents.*` styles:

* **shapeAppparentSmallComponent**: Dành cho các thành phần nhỏ, chẳng hạn như Buttons và Chips.
* **shapeAppparentMediumComponent**: Dành cho các thành phần trung bình, chẳng hạn như Cards.
* **shapeAppparentLargeComponent**: Dành cho các thành phần lớn, chẳng hạn như Bottom Sheets.

Nếu bạn muốn tùy chỉnh các kiểu dáng hình dạng của Material Components shape sẵn có, bạn sẽ làm như sau:

```Java
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
Các kết quả có thể quan sát được trong màn playground dưới đây:

![](https://images.viblo.asia/76e855bb-1659-42e8-8d12-4c8edcd1e76d.png)

## V. Tổng kết:

Trong bài viết này mình đã giới thiệu tới các bạn cách thiết lập Material Components Theme cho Android. Mong là hữu ích với các bạn :D.

## VI. Tài liệu tham khảo

https://medium.com/over-engineering/setting-up-a-material-components-theme-for-android-fbf7774da739