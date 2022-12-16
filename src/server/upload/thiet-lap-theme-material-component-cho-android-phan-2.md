## Các thuộc tính và kiểu của Widget
Mặc dù các thuộc tính global của theme đáp ứng phần lớn nhu cầu của chúng ta, nhưng đôi khi chúng ta có thể muốn tùy chỉnh các thuộc tính của các widget riêng lẻ. Chúng ta sẽ khám phá các kiểu (và các thuộc tính có liên quan) của các widget phổ biến và cách chúng có thể được tham chiếu trong Material Components theme của bạn.

### Buttons
Các Material Button bao gồm bốn biến thể chính mà tất cả đều kế thừa từ kiểu Widget.MaterialComponents.Button cơ bản, mỗi biến thể có một hậu tố kiểu tùy chọn: **raised** (default, no suffix), **unelevated** (`.UnelevatedButton`), **outlined** (`.OutlinedButton`) và **text** (`.TextButton`). Tất cả các biến thể button sử dụng thuộc tính chủ đề textAppparentButton cho kiểu chữ của chúng.

Các thuộc tính chính để tùy chỉnh các kiểu này bao gồm:
* `backgroundTint`: Màu tint được áp dụng cho background của button. Màu được dùng mặc định là trong suốt đối với các text button và màu `colorPrimary` cho tất cả các biến thể khác.
* `iconTint`: Màu tint được áp dụng cho button icon tùy chọn. Màu được dùng mặc định là `colorPrimary` cho các text button và `colorOnPrimary` cho tất cả các biến thể khác.
* `rippleColor`: Màu ripple của button khi có hành động chạm. Màu mặc định là `colorOnPrimary` cho các raised/unelevated button và `colorPrimary` cho các outlined/text button.
* `strokeColor`: Màu của stroke xung quanh button background. Màu mặc định là `colorOnSurface` cho các outlined button và trong suốt cho tất cả các biến thể khác.
* `strokeWidth`: Chiều rộng của stroke xung quanh button background. Giá trị mặc định là 1dp cho các outlined button và 0dp cho tất cả các biến thể khác.
* `shapeAppearance`: Hình dạng xuất hiện của button background. Giá trị mặc định là `shapeAppparentSmallComponent`.

Kiểu nút cơ sở (được sử dụng bởi lớp widget `MaterialButton`) có thể được tùy chỉnh và áp dụng trên toàn cầu như sau:
```
<style name="AppTheme" parent="Theme.MaterialComponents.Light">
    ...
    <
item name="materialButtonStyle">@style/AppButton</item>
</
style>
<style name="AppButton" parent="Widget.MaterialComponents.Button">
    <
item name="backgroundTint">?attr/colorSecondary</item>
</
style>
```

Kết quả có thể được quan sát trong màn hình sau:
![](https://images.viblo.asia/8228bd75-0006-4a58-ac07-23ad2dc7ade7.png)

### Text Fields
Material Text Fields bao gồm hai biến thể chính. Kết quả của việc chuyển các lớp từ `AppCompat` là `TextInputLayout` và `TextInputEditText` đã có từ trước, trên thực tế có hai kiểu cơ sở: `Widget.MaterialComponents.TextInputLayout.*` và` Widget.MaterialComponents.TextInputEditText.*`. Các biến thể có kiểu hậu tố và bao gồm **filled box** (default, `.FilledBox`) và **outlined box** (`.OutlinedBox`). Tất cả các biến thể của trường văn bản đều sử dụng giao diện văn bản tiêu chuẩn cho đầu vào và thuộc tính chủ đề `textAppearanceCaption` cho “helper” text (labels, errors, counters,...).

Các thuộc tính chính để tùy chỉnh các kiểu `Widget.MaterialComponents.TextInputLayout` bao gồm:
* `boxBackgroundMode`: Chế độ của box background, có thể là `filled`, `outline` hoặc `none`.
* `boxBackgroundColor`: Màu của text field background. Màu được bật mặc định là `colorOnSurface` cho các trường văn bản filled box và trong suốt cho các trường văn bản outlined box.
* `boxStrokeColor`: Màu của stroke xung quanh text field background. Màu mặc định là `colorOnSurface` (ở trạng thái mặc định) cho các trường văn bản outlined box và bị bỏ qua cho các trường văn bản filled box.
* `hintTextColor`/`errorTextColor`/`counterTextColor`: Nhiều màu khác nhau cho các thành phần phụ khác nhau của “helper” text.
* `shapeAppearance`: Hình dạng xuất hiện của text field background. Giá trị mặc định là `shapeAppearanceSmallComponent`.

Kiểu text field cơ sở (được sử dụng bởi lớp widget `TextInputLayout`) có thể được tùy chỉnh và áp dụng trên toàn cầu như sau:
```
<style name="AppTheme" parent="Theme.MaterialComponents.Light">
    ...
    <
item name="textInputStyle">@style/AppTextField</item>
</
style>
<style name="AppTextField" parent="Widget.MaterialComponents.TextInputLayout.FilledBox">
    
<item name="boxBackgroundColor">@color/text_field_background</item>
<
/style>
```

Kết quả có thể được quan sát trong màn hình sau:
![](https://images.viblo.asia/ba2ef091-3638-4494-8244-74a8e109c324.png)

### Cards
Material Cards được coi là “surfaces” sử dụng kiểu `Widget.MaterialComponents.CardView`. Các thuộc tính chính để tùy chỉnh chúng như sau:
* `cardBackgroundColor`: Màu của card background. Màu mặc định là `colorSurface`.
* `cardElevation`: Độ cao của card. Giá trị mặc định là `1dp`.
* `shapeAppearance`: Hình dạng xuất hiện của card background. Giá trị mặc định là `shapeAppearanceMediumComponent`.

Kiểu card cơ sở (được sử dụng bởi lớp widget MaterialCardView) có thể được tùy chỉnh và áp dụng trên toàn cầu như sau:
```
<style name="AppTheme" parent="Theme.MaterialComponents.Light">
    ...
    <
item name="materialCardViewStyle">@style/AppCard</item>
</
style>
<style name="AppCard" parent="Widget.MaterialComponents.CardView">
    <
item name="cardElevation">8dp</item>
</
style>
```

Kết quả có thể được quan sát trong màn hình sau:
![](https://images.viblo.asia/5c1f1743-7f3f-443a-bb79-256114210f8d.png)

### Bottom Navigation
Material Bottom Navigation bao gồm hai biến thể chính kế thừa từ kiểu cơ sở `Widget.MaterialComponents.BottomNavigationView`, với hậu tố kiểu tùy chọn: **surface** (default, no suffix) và **colored** (`.Colored`). Các nhãn Bottom Navigation sử dụng thuộc tính chủ đề `textAppearanceCaption` cho các kiểu chữ.

Các thuộc tính chính để tùy chỉnh các kiểu này như sau:
* `backgroundTint`: Màu của bottom navigation background. Màu mặc định là `colorSurface` cho surface bottom navigation và `colorPrimary` cho colored bottom navigation.
* `itemTextColor`/`itemIconTint`: Màu sắc các icon và label của item thuộc bottom navigation. Các màu mặc định là `colorOnSurface`/`colorPrimary`(selected) cho surface bottom navigation và `colorOnPrimary` cho colored bottom navigation.
* `itemHorizontalTranslationEnabled`: Một cờ để đặt có hay không một translation animation sẽ xảy ra khi chọn các item của bottom navigation. Giá trị mặc định là false.

```
<style name="AppTheme" parent="Theme.MaterialComponents.Light">
    ...
    <
item name="bottomNavigationStyle">@style/AppBottomNavigation</item>
</
style>
<style name="AppBottomNavigation" parent="Widget.MaterialComponents.BottomNavigation.Colored" />
```

Kết quả có thể được quan sát trong màn hình sau:
![](https://images.viblo.asia/c1bf43df-d99f-4fdd-83bc-5f797d572e5c.png)

## Kết luận
Những thành phần trên chắc chắn không đầy đủ. Một danh sách toàn diện hơn về tất cả các thành phần và thuộc tính của chúng có thể được tìm thấy trong [tài liệu Material Components](https://github.com/material-components/material-components-android/tree/master/docs/components).

Tham khảo: https://medium.com/over-engineering/setting-up-a-material-components-theme-for-android-fbf7774da739