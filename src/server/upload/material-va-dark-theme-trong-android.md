## Giới thiệu

Đối với 1 lập trình viên nói chung và lập trình viên Android nói riêng, giao diện ứng dụng Android là 1 phần rất quan trọng để gia tăng số lượng người dùng sử dụng app. Có rất nhiều cách khác nhau để cung cấp UI tốt hơn và thu hút người dùng. Có 1 cách sử dụng Android Theming System. Nó có thể được sử dụng để cung cấp trải nghiệm người dùng tốt hơn và còn có nhiều lợi ích khác của việc sử dụng themes theo quan điểm của các nhà phát triển:
* Tái sử dụng layouts: việc sử dụng hiệu quả themes cho phép layouts được sử dụng nhiều lần mà không cần viết code cho 1 giao diện tương tự.
* Tính maintain code: vì các layouts được tái sử dụng nhiều lần, nó dẫn đến khả năng maintain code, tức là càng ít dòng code, maintain càng tốt.
* Theming: bạn có thể phát triển ứng dụng Android sử dụng Material theme hoặc Dark theme trong ứng dụng của bạn để cho trải nghiệm người dùng tốt hơn. 

## Sự khác biệt giữa themes và styles

Bạn đã từng gặp phải tình huống khi bạn cố gắng implement style hoặc theme vào ứng dụng nhưng nó không hoạt động. Hầu hết các Android dev không biết sự khác biệt giữa themes và styles. Vì vậy trước khi tìm hiểu về Material và Dark theme, chúng ta nên tìm hiểu về sự khác nhau giữa themes và styles.

Lý do lớn nhất mà mọi người thắc mắc về styles và themes là với styles chúng ta có  **<style>**  nhưng không có **<theme>** trong Android. Dưới đây là sự khác nhau giữa 2 loại:

* Cách sử dụng: Style là tập hợp các attributes và chỉ được sử dụng cho view cụ thể. Trong khi theme là 1 loại style và có thể được sử dụng trong toàn bộ ứng dụng hoặc activity hoặc view. 
    
* Key-value: Styles như 1 map vì nó có key và value. Vì vậy, ta có view attribute và với các attribute đó, có các value được liên kết theo style. Trong theme, có attribute và value. 
    
Dưới đây là vd về style:
    ![](https://images.viblo.asia/5bf333f0-bfe6-46a8-811b-d05e1556c4a3.jpg)
    Dưới đây là vd về themes:
    ![](https://images.viblo.asia/407725c1-226e-43a0-b115-6596da5982e8.jpg)
Có thể đôi lúc dùng ?attr/ trong code như sau:
```java
<item name="android:background">?attr/colorAccent</item>
```

    
Cách sử dụng
    
Có sự khác nhau giữa theme và style khi sử dụng trong ứng dụng. Nếu sử dụng style trên 1 view thì nó chỉ được áp dụng trên view cụ thể đó mà không được áp dụng cho các view con bên trong nó. Nhưng nếu bạn sử dụng theme cho 1 view thì nó cũng sẽ được áp dụng cho các view con bên trong nó.
    ![](https://images.viblo.asia/374a986a-43ec-4b25-9f3e-a28b4e931388.jpg)
Lưu ý: 
    
Trong trường hợp view phân cấp, hãy thận trọng khi sử dụng theme. VD bạn có view cha là parent1 và nó có 2 view con là child1 và child2. Thuộc tính *android:background* cùng được sử dụng trong 3 view. Vậy thì thuộc tính nào sẽ được sử dụng. Trong trường hợp phân cấp, thuộc tính của view con gần nhất sẽ được sử dụng trong khi các giá trị của view cha sẽ bị bỏ qua. Vậy nên giá trị thuộc tính được sử dụng trong child1 và child2 và giá trị của parent1 bị bỏ qua.
    
## Material theme
    
Material theme được sử dụng để cung cấp giao diện look and feel cho ứng dụng của bạn bằng cách sử dụng Material Design. 
Material Components themes có các thuộc tính được sử dụng để làm nên style cho các phần tử. Các attributes có thể được phân ra làm 3 loại sau:
* Color
* Typography
* Shape

Bằng cách cung cấp các giá trị cho cả 3 loại trên, bạn có thể thiết kế được ứng dụng chất lượng.
    
1. Color:
    
Có nhiều thuộc tính liên quan đến màu Material theming. Các thuộc tính chủ yếu là: primary, secondary, surface, error, và những biến thể của các màu sắc này. 

colorPrimary: đây là màu chính được sử dụng trong ứng dụng.
 
colorOnPrimary: được sử dụng cho các phần tử được đặt trên màu chính của bạn. Vì vậy nó trái ngược với màu primary. Điều này là quan trọng vì nếu bạn đặt màu primary và màu nằm trên màu chính cùng màu thì nó sẽ mang lại trải nghiệm không tốt cho user khi họ k phân biệt được 2 loại màu này.

colorPrimaryVarient: biến thể nhẹ hơn hoặc tối hơn màu primary 

colorSecondary: màu sử dụng nhiều sau màu primary 

colorOnSecondary: sử dụng khi muốn đặt set màu phần tử phía trên màu secondary

colorSecondaryVarient: biến thể nhẹ hơn hoặc tối hơn màu secondary

colorSurface: sử dụng khi set màu cho surface. 

colorError: được sử dụng khi hiển thị thông báo lỗi. Thông thường nó có màu đỏ

colorOnError: sử dụng cho phần tử hiển thị trên top của colorError

colorBackground: sử dụng cho nội dung phía sau 
```java
<style name="AppTheme" parent="Theme.MaterialComponents.Light">
    <item name="colorPrimary">#0336ff</item>
    <item name="colorOnPrimary">#ffffff</item>
    <item name="colorPrimaryVariant">#0035c9</item>
    <item name="colorSecondary">#ffde03</item>
    <item name="colorOnSecondary">#000000</item>
    <item name="colorSecondaryVariant">#ffc000</item>
    <item name="colorSurface">#ffffff</item>
    <item name="colorOnSurface">#000000</item>
    <item name="colorError">#b00020</item>
    <item name="colorOnError">#FFFFFF</item>
    <item name="android:colorBackground">@color/background</item>
    <item name="colorOnBackground">#212121</item>
</style>
```
   
Tham khảo [Material Color Tool](https://material.io/resources/color/#!/)
    
2. Typography:
Typography thường được sử dụng với text trong ứng dụng. Bạn không cần phải viết code cho các loại text cho các màn hình độ phân giải khác nhau. Hãy tham khảo bảng sau:
* textAppearanceHeadline1: Light, 96sp
* textAppearanceHeadline2: Light, 60sp
* textAppearanceHeadline3: Regular, 48sp
* textAppearanceHeadline4: Regular, 34sp
* textAppearanceHeadline5: Regular, 24sp
* textAppearanceHeadline6: medium, 20sp
* textAppearanceSubtitle1: Regular, 16sp
* textAppearanceSubtitle2: Medium, 14sp
* textAppearanceBody1: Regular, 16sp
* textAppearanceBody2: Regular, 14sp
* textAppearanceCaption: Regular, 12sp
* textAppearanceButton: Regular, 14sp, all caps
* textAppearanceOverline: Regular, 12sp, all caps
    
Để sử dụng:
```java
<TextView ...
    android:textAppearance="?attr/textAppearanceBody1"/>
```
    
Nếu bạn muốn customize:
```java
<style name="AppTheme" parent="Theme.MaterialComponents.Light">
    ...
    <item name="textAppearanceHeadline1">@style/AppTextAppearance.Headline1</item>
</style>
```
3. Shape

Để sử dụng shape trong ứng dụng, có 1 số hướng dẫn. Shape có thể chia thành các loại: small, medium, large. Với các góc có thể sử dụng rounded hoặc cut. Bên cạnh đó, có thể set corner radius hoặc set góc nào sẽ được bo tròn. 
    
Dưới đây là 1 số shape được recommended trong Material Design:
* shapeAppearanceSmallComponent: thường sử dụng cho các component nhỏ như Button và chip
* shapeAppearanceMediumComponent: thường sử dụng cho các shape medium size như cards
* shapeAppearanceLargeComponent: thường sử dụng cho các shape large như bottom sheet
    
Bạn có thể customize theo cách tương tự khi sử dụng Typography
    
## Dark theme

Android 10 released, Dark theme là cái tên được nhiều người nhắc đến. Tính năng này có sẵn từ Android 10 hoặc API level 29. Sử dụng Dark theme sẽ khiến cho người dùng có thể sử dụng thiết bị trong môi trường ánh sáng thấp hơn mà không gây hại cho mắt
    
Để sử dụng Dark theme trong ứng dụng, bạn cần set theme ứng dụng kế thừa từ DayNight theme:
```java
<style name="AppTheme" parent="Theme.AppCompat.DayNight">
```

hoặc nếu bạn sử dụng Material 
```java
<style name="AppTheme" parent="Theme.MaterialComponents.DayNight">
```

Update theme:
```java
AppCompatDelegate.setDefaultNightMode(/**Your Mode**/)
```
    
VD:
```java
object ThemeHelper {
    private const val lightMode = "light"
    private const val darkMode = "dark"
    private const val batterySaverMode = "battery"
    const val default = "default"

    fun applyTheme(theme: String) {
        when (theme) {
            lightMode -> AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
            darkMode -> AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES)
            batterySaverMode -> AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_AUTO_BATTERY)
            default -> AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM)

        }
    }
}
```
    
Khi sử dụng Dark theme, nên sử dụng các thuộc tính như sau:
```java
<TextView ...
    textColor="?android:attr/textColorPrimary" />
```
    
thay vì 
```java
<TextView ...
    textColor="#000000" />
```
VD: trong app của bạn có text sử dụng màu tối, sau đó bạn chuyển theme sang Dark theme, khi đó sẽ là trải nghiệm cực xấu cho user với text màu tối trên theme tối. 
    
## Kết luận

Qua bài viết này, phần nào mình đã giới thiệu về Material theme cũng như Dark theme trong Android. Để tìm hiểu thêm về Material theme, bạn có thể xem tại [Material Design](https://material.io/resources/build-a-material-theme/#)
    
[Tham khảo](https://blog.mindorks.com/build-material-and-dark-themes-apps-using-style-in-android)