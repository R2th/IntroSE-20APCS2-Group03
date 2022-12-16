> Don’t blind your users at 1am, Implement night-mode today!

## Giới thiệu

Mọi người thường có thói quen sử dụng điện thoại ban đêm trong khi ánh sáng phát ra từ màn hình điện thoại lại không tốt cho đôi mắt con người, vì vậy có một số ứng dụng cho phép người dùng cài đặt chế độ ban đêm để giảm thiểu ánh sáng trắng giúp bảo vệ đôi mắt bằng cách tích hợp night-mode. Bên cạnh đó, chế độ này còn giúp tiết kiệm pin đáng kể khi thiết bị sử dụng màn hình với tấm nền OLED. 

Hiện nay các ứng dụng trên kho ứng dụng có tích hợp sẵn cài đặt night-mode với chế độ thay đổi tự động, bật tắt trong mục cài đặt ứng dụng 

Tích hợp DayNight trong AppCompat cho phép người dùng dễ dàng chuyển đổi giữa Theme.AppCompat(dark) và Theme.AppCompat.Light(light) 

## Cách sử dụng
Khai báo thuộc tính theme trong file style

```java
<style name="MyTheme" parent="Theme.AppCompat.DayNight">
    <!-- Blah blah -->
</style>
``` 

 Bạn có thể bật tính năng này trong ứng dụng. Bạn thực hiện việc này bằng cách gọi phương thức AppCompatDelegate.setDefaultNightMode() với 1 trong 4 giá trị truyền vào sau:
*  MODE_NIGHT_NO: sử dụng theme sáng
*  MODE_NIGHT_YES: sử dụng theme tối
*  MODE_NIGHT_AUTO: thay đổi theme sáng/tối dựa vào thời gian trong ngày
*  MODE_NIGHT_FOLLOW_SYSTEM (default): cài đặt giá trị mặc định 

Phương thức này là static nên bạn có thể gọi bất cứ lúc nào. 
 
 ```java
 static {
    AppCompatDelegate.setDefaultNightMode(
            AppCompatDelegate.MODE_NIGHT_AUTO);
}
public class MyApplication extends Application {
```

## setLocalNightMode()
Bạn có thể ghi đè giá trị mặc định trong mỗi thành phần bằng lời gọi phương thức AppCompatDelegate setLocalNightMode() để sử dụng tính năng DayNight hoặc để phát triển ứng dụng mà không cần chờ đợi đến tận đêm để test ứng dụng.
Khi gọi phương thức này và theme thay đổi, nó sẽ tái tạo lại activity tự động bằng cách gọi hàm recreate(), khi đó theme mới được áp dụng.

Vậy làm sao để biết rằng ứng dụng đang trong chế độ nào?

Kiểm tra bằng cách sau:
```java
int currentNightMode = getResources().getConfiguration().uiMode
        & Configuration.UI_MODE_NIGHT_MAS
switch (currentNightMode) {
    case Configuration.UI_MODE_NIGHT_NO:
        // Night mode is not active, we're in day time
    case Configuration.UI_MODE_NIGHT_YES:
        // Night mode is active, we're at night!
    case Configuration.UI_MODE_NIGHT_UNDEFINED:
        // We don't know what mode we're in, assume notnight
}
```

**WebView**

Cần phải lưu ý khi tích hợp chế độ DayNight trong webview vì webview có thể không sử dụng thuộc tính theme và có khả năng webview sẽ không tương thích với theme động.

## Location
Và hãy cùng xem điều gì xảy ra khi muốn thay đổi chế độ ban đêm theo thời gian thực?
Khi sử dụng giá trị MODE_NIGHT_AUTO, ta cần sử dụng vị trí thiết bị để tính toán thời gian để chuyển đổi linh hoạt giữa ngày và đêm. 

```java
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
```

Thêm quyền truy cập vị trí vào trong file manifest. Permission này cho phép truy cập thời gian chính xác hơn khi thay đổi vị trí.
Nếu ứng dụng đã cấp quyền vị trí, AppCompat sẽ lấy vị trí cuối cùng từ LocationManager và sử dụng nó để tính toán thời gian mặt trời mọc và lặn.

Nếu ứng dụng của bạn không cấp quyền liên quan vị trí, hoặc đơn giản là nó không bắt kịp vị trí cuối cùng, thì giá trị mặc định sẽ được sử dụng. Nó tự động sử dụng khoảng thời gian 6 am cho thời gian mặt trời mọc và 10 pm cho thời gian mặt trời lặn.

## Android Pie night mode
Android Pie hiện nay có chế độ night mode riêng, người dùng có thể cài đặt kiểm soát để bật hoặc tắt nó. Nếu bạn đang chạy trên Android Pie, bạn nên sử dụng mặc định MODE_NIGHT_FOLLOW_SYSTEM.

**Cách thực hiện**

1, Sử dụng theme DayNight

```java
@style/Theme.AppCompat.DayNight
```

2, Custom class Application và đặt chế độ mặc định

```java
AppCompatDelegate.setDefaultNightMode(MODE_NIGHT_FOLLOW_SYSTEM)
```

Vậy nếu bạn muốn sử dụng night mode để kiểm soát lượng năng lượng pin sử dụng thì làm cách nào?

Class PowerManager có thể cho biết thiết bị có đang trong chế độ tiết kiệm pin không bằng cách gọi hàm PowerManager,isPowerSaveMode() trả về giá trị Boolean. Nếu giá trị này là *true* thì đang ở chế độ night mode, còn nếu là *false* thì nó đang bị disable.  

Nhưng sự thay đổi đó chỉ áp dụng thời điểm ứng dụng khởi tạo, vậy làm cách nào để tự động kích hoạt chế độ tiết kiệm pin?

Chúng ta cần lắng nghe 1 Intent từ broadcast, với Action android.os.action.POWER_SAVE_MODE_CHANGED. Vì vậy cần đăng ký 1 BroadcastReceiver trong Activity để lắng nghe sự thay đổi. Khi phát đi 1 Intent, phương thức được gọi trong Activity để thay đổi giá trị trong  AppCompatDelegate trong Activity thông qua việc ủy quyền.

![](https://images.viblo.asia/1b237248-d134-42fe-8921-cbeb658195cb.png)

**Kiểm soát việc thay đổi thông qua cài đặt**

Có nhiều cách để thay đổi chế độ night mode. Bạn có thể sử dụng class helper chịu trách nhiệm xác định giá trị được truyền vào trong AppCompatDelegate và Activity. Bạn có thể làm bằng cách sử dụng LocalBroadcastManager. Activity của bạn có thể lắng nghe local broadcast gửi tới từ màn hình cài đặt và áp dụng các thay đổi cần thiết.

Nếu tất cả các activity đều được extend từ các class base, bạn có thể có 1 phương pháp để áp dụng chế độ night mode khi cài đặt thay đổi. Phương thức được gọi cùng lúc khi chế độ tiết kiệm pin được thiết lập khi có thay đổi.

## Custom
Vậy có thể nào chuyển đổi giữa chế độ day/night theo cách riêng không?

Câu trả lời là có, AppCompat cho phép sử dụng chế độ night bất cứ lúc nào. Chúng đã có sẵn trong nền tảng API 8, nhưng chỉ được sử dụng trong kịch bản cụ thể: car mode và docked.

res/values/themes.xml
```java
<style name="Theme.AppCompat.DayNight" 
       parent="Theme.AppCompat.Light" />
```

res/values-night/themes.xml
```java
<style name="Theme.AppCompat.DayNight" 
       parent="Theme.AppCompat" />
```

:point_right:Bài viết đến đây là hết rồi, nếu cảm thấy bài viết hữu ích :ok_hand:, có thể đăng nhập và like cho mình nhé :+1:. Nhớ folow để xem các các bài viết sắp tới của mình nhé. Thanks! :handshake:
## Tham khảo
https://medium.com/androiddevelopers/appcompat-v23-2-daynight-d10f90c83e94
https://medium.com/@wdziemia/night-mode-79723ced5d14