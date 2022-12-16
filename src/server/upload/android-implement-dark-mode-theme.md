### I. Introduction

Chế độ ban đêm `Dark Mode` là một tính năng mới trên Android Q được Google giới thiệu. Nó được áp dụng cho cả system UI và các ứng dụng.

Trước khi bắt đầu, hãy cùng tìm hiểu tại sao người dùng cần chế độ này :

* Giảm thiểu mức tiêu thụ điện năng một lượng đáng kể. Một số nhà sản xuất mặc định bật chế độ dark mode cho người dùng.
* Cải thiện về mắt cho những người nhạy cảm với ánh sáng.
* Cho phép người dùng sử dụng thiết bị trong môi trường ánh sáng yếu dễ dàng hơn.


> To enable Dark Mode in Android, Navigate to Settings -> Display -> Theme -> Dark Theme.



### II. Let's Get Started

Có 2 cách để hỗ trợ Dark Theme :

> To get the Dark Mode up and running your app should be targetting Android Q

Để bật chế độ darke mode, ứng dụng của bạn nên để target Android Q.

* Nếu sử dụng thư Support Library, thiết lập app theme như sau :
    ~~~java
        <style name="AppTheme" parent="Theme.AppCompat.DayNight">
    ~~~
* Nếu app đang sử dụng theme MaterialComponent, thiết lập như sau :
   ~~~java
        <style name="AppTheme" parent="Theme.MaterialComponents.DayNight">
    ~~~

Khi chạy ứng dụng, bạn sẽ thấy chế độ này được active : 

![](https://images.viblo.asia/748271d4-4d18-4f71-b595-8f61315606e6.png)

> Note : Nếu bạn muốn thay thế màu trong ứng dụng, bạn cần tạo một custom values directory là **values-night**, với các resource ảnh bạn cần tạo **drawables-night**.

Ta cũng có thể cho phép người dùng thay đổi chủ đề trong khi sử dụng ứng dụng. Một số options có sẵn như :

* Light Theme
* Dark Theme
* Set by Battery Saver
* System default

OK, giờ để cập nhật chủ đề động, ta cần làm như sau :
~~~java
AppCompatDelegate.setDefaultNightMode(/**Your Mode**/)
~~~

Ví dụ 
~~~kotlin
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
~~~

### III. Force The Dark

Nếu bạn không muốn cập nhật chủ đề trong Android Q, bạn cần thêm dòng sau vào chủ đề của ứng dụng :
~~~java
android:forceDarkAllowed="true"
~~~

=> Điều này sẽ convert toàn bộ ứng dụng của bạn sang chế độ darkmode. Để sử dụng cách này, ứng dụng của bạn cần target android Q.

Nếu bạn cần loại trừ một số layout hoặc widget khỏi chế độ dark mode, chỉ cần thêm thuộc tính sau vào layout :
~~~xml
android:forceDarkAllowed="false"
~~~
hoặc set thủ công bằng cách setForceDarkAllowed cho nó :
~~~java
view.setForceDarkAllowed(true/false)
~~~

Bạn cần chú ý rằng, nếu thay đổi chủ đề của ứng dụng, sẽ xảy ra `configuration changes` và do đó, Activity  sẽ `recreate` . Để xử lý configuration, ta phải thêm thuộc tính `configChanges` trong thẻ `AndroidManifest.xml` và nó sẽ xử lý cho ta.
~~~java
<activity
    android:name=".MainActivity"
    android:configChanges="uiMode" />
~~~

### IV. Conclusion

Bên trên là cách giúp bạn có thể update chủ đề từ light theme sang dark theme. 

Happy coding ^^

References : [Implementing Dark Mode Theme in Android](https://blog.mindorks.com/implementing-dark-mode-theme-in-android)