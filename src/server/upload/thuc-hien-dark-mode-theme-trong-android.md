![](https://images.viblo.asia/592cb921-1c1f-459e-84db-eb19b3467d26.png)

# Giới thiệu 

Với Android Q được Google ra mắt, Dark Theme đã được phát hành cùng với nó. Dark Mode áp dụng cho cả giao diện người dùng hệ thống và các ứng dụng đang chạy trong đó.

Trước khi bắt đầu, hãy hiểu lý do tại sao chúng ta cần Dark Mode.

* Có thể giảm mức sử dụng năng lượng một lượng đáng kể. Một số nhà sản xuất thiết bị bật chế độ tối theo mặc định cho người dùng.
* Cải thiện độ mịn của mắt cho người dùng nhạy cảm với ánh sáng.
* Giúp mọi người sử dụng thiết bị trong môi trường ánh sáng yếu dễ dàng hơn.

> *Để bật Dark Mode trong Android, hãy điều hướng đến Settings -> Display -> Theme -> Dark Theme.*
 
# Bắt đầu
Có hai cách để hỗ trợ Dark Theme,

> *Để bật Dark Mode và chạy ứng dụng của bạn, nên nhắm mục tiêu Android Q*

* Nếu bạn đang sử dụng Thư viện hỗ trợ, hãy đặt app theme thành
```kotlin
<style name="AppTheme" parent="Theme.AppCompat.DayNight">
```
* Nếu bạn đã nâng cấp App theme lên MaterialComponent, hãy sử dụng
```kotlin
<style name="AppTheme" parent="Theme.MaterialComponents.DayNight">
```

và khi bạn chạy ứng dụng, bạn sẽ thấy Dark Mode trong ứng dụng của mình.
![](https://images.viblo.asia/134961e1-f060-4e97-9c90-183eec47e964.png)
Trên đây là ảnh chụp màn hình khi bạn chuyển đổi style sang Dark Mode

> *Lưu ý: Nếu bạn muốn thay thế màu trong ứng dụng, bạn cần tạo thư mục giá trị tùy chỉnh, được gọi là values-night và đối với tài nguyên hình ảnh, chúng tôi sẽ tạo ra drawable-night.*

Chúng ta cũng có thể cho phép người dùng thay đổi theme trong khi sử dụng ứng dụng. Các tùy chọn có sẵn là.

* Light Theme
* Dark Theme
* Đặt theo Trình tiết kiệm pin (tùy chọn mặc định được đề xuất cho Android P trở lên)
* Mặc định hệ thống (tùy chọn mặc định được đề xuất cho Android Q).

Bây giờ, để cập nhật theme một cách linh hoạt, chúng ta phải sử dụng,

```kotlin
AppCompatDelegate.setDefaultNightMode(/**Your Mode**/)
```

Ví dụ
```kotlin
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
Trong đoạn code trên, chúng ta có thể chọn theme dựa trên các chế độ.

# Force the Dark

Nếu bạn không muốn nâng cấp Theme trong Android Q và giữ nguyên Theme đó, bạn cần thêm phần sau vào Theme của Ứng dụng:
```kotlin
android:forceDarkAllowed="true"
```
và điều này sẽ chuyển đổi toàn bộ ứng dụng sang Dark Mode.
> Lưu ý: Đối với Force Dark, ứng dụng của bạn nên nhắm mục tiêu **android-Q**

Nếu bạn cần loại trừ một số bố cục hoặc tiện ích khỏi Dark Mode, chỉ cần thêm thuộc tính trong bố cục,
```kotlin
android:forceDarkAllowed="false"
```
hoặc chúng ta có thể làm điều đó bằng code ở view,
```kotlin
veiw.setForceDarkAllowed(true/false)
```

Nếu chúng ta thay đổi theme của ứng dụng, cấu hình của chúng ta sẽ thay đổi và do đó, Hoạt động sẽ được tạo lại. Để xử lý cấu hình,
```kotlin
<activity
    android:name=".MainActivity"
    android:configChanges="uiMode" />
```
chúng ta phải thêm thuộc tính configChanges trong thẻ hoạt động trong Manifest và nó sẽ xử lý các thay đổi cấu hình.

# Kết luận
Như vậy trên đây là cách chúng ta có thể nâng cấp chủ đề từ chủ đề sáng sang chủ đề tối.

Nguồn tham khảo: https://blog.mindorks.com/implementing-dark-mode-theme-in-android