![](https://images.viblo.asia/42f6885a-a85d-4602-b577-d50a928388ef.jpg)

Chúng ta đang bước vào năm thứ 10 phát triển Android (Android Q nên là 10.0). Theo Beta 4, Android Q chính thức là API cấp 29. Mặc dù chúng ta có Beta 5 và Beta 6 được mong đợi, API đã được đánh dấu là cuối cùng và bây giờ là thời điểm tốt để xem Android Q sẽ ảnh hưởng đến ứng dụng của chúng ta như thế nào và Những thay đổi nào cần được thực hiện để hỗ trợ đầy đủ cho Android Q nhé.

Những thay đổi quan trọng (chưa đầy đủ) được giới thiệu trong Android Q có thể được chia thành hai loại: 
* Quyền riêng tư & Bảo mật. 
*  Trải nghiệm người dùng

## Quyền riêng tư & Bảo mật. 
### Hoạt động nền của Activity (Background Activity Starts)
Nếu bạn cố gắng bắt đầu một Activity, trong khi ứng dụng của bạn ở chế độ background , nó sẽ không còn được cho phép như trước đâu nhé.
* Ảnh hưởng:  Tất cả các ứng dụng chạy trên Q (không phân biệt target SDK). Một exception được đưa ra nếu ứng dụng nhắm mục tiêu vào Android Q trong khi hoạt động chỉ không khởi chạy nếu ứng dụng không nhắm được target Android Q đang chạy trên thiết bị Android Q. 

* Ngoại lệ: Các  Bound services như khả năng truy cập, tự động điền, v.v ... Nếu ứng dụng nhận được PendingIntent từ hệ thống, chúng ta có thể sử dụng nó để khởi chạy một activity . Nếu ứng dụng có quyền SYSTEM_ALERT_WINDOW (đã bị xóa trong phiên bản Android GO) hoặc ứng dụng gọi `finish ()` trong một activity gần đây.

* Phương pháp đề xuất: Notification Triggered activity

```
val fullScreenIntent = Intent(this, CallActivity::class.java)
val fullScreenPendingIntent = PendingIntent.getActivity(this, 0,
    fullScreenIntent, PendingIntent.FLAG_UPDATE_CURRENT)

val notificationBuilder = NotificationCompat.Builder(this, CHANNEL_ID)
    ....
    .setPriority(NotificationCompat.PRIORITY_HIGH)
    .setCategory(NotificationCompat.CATEGORY_CALL)

    .setFullScreenIntent(fullScreenPendingIntent, true)
```

Vì vậy, nếu chúng ta muốn khởi chạy một activity từ background, trước tiên hãy tạo Notification để hiển thị cho người dùng. Trong Notification đó, thêm một pending intent Fullscreen. Ngoài ra, thêm quyền `USE_FULL_SCREEN_INTENT` vào permission manifest. Bây giờ, khi notification được kích hoạt, hệ thống sẽ khởi chạy intent full-screen cho bạn.

*  Gotcha's: Hệ thống quyết định giữa thời điểm hiển thị notification và khi nào hiển thị activity. Nếu người dùng đang tích cực sử dụng thiết bị, thì notification sẽ được hiển thị. Nếu khi người dùng tương tác với thông báo, activity full screen sẽ được khởi chạy. Như việc nhận một cuộc gọi điện thoại (bật thông báo trong khi sử dụng điện thoại, nếu không thì activity full screen).

### Định danh phần cứng (Hardware Identifiers)
Quyền truy cập vào device identifiers non-resettable đã bị thu hồi trong Android Q.
* **Ảnh hưởng (Affects)**: Tất cả các ứng dụng chạy trên Q (không phân biệt SDK target). Một exception được đưa ra nếu SDK target là Q và `null` được trả về nếu SDK target
* **Tránh (Avoid):** Địa chỉ Mac hiện được chọn ngẫu nhiên, trong khi IMEI (TelephonyManager.getDeviceId ()) và số sê-ri không còn truy cập được. Hiện tại chúng bị khóa dưới `quyền đặc quyền` của Wap và chỉ có sẵn cho các ứng dụng của nhà mạng.
* **Phương pháp tiếp cận được đề xuất:** Sử dụng các số nhận dạng có thể đặt lại như ID quảng cáo, ID trường hợp hoặc ID duy nhất toàn cầu (GUID). Xem Thực tiễn tốt nhất cho số nhận dạng duy nhất để biết thêm chi tiết về số nhận dạng sẽ sử dụng cho kịch bản nào.

### Background Location
Bắt đầu với Android Q, hệ thống sẽ phân biệt giữa các yêu cầu vị trí được thực hiện ở foreground và background.

![](https://images.viblo.asia/0632bf71-7b8d-4c62-bfc2-b26e26cd5670.jpg)

* **Ảnh hưởng**: Phụ thuộc. Nếu ứng dụng nhắm mục tiêu Q thì bạn cần yêu cầu cấp phép vị trí nền mới. Nếu ứng dụng không nhắm mục tiêu Q, thì nó sẽ tự động nhận được quyền này nếu ứng dụng đã có quyền truy cập vị trí.

![](https://images.viblo.asia/8f32d973-4763-47a0-800b-85d692c24ce7.png)

* **Cách tiếp cận được đề xuất (Recommended approach)**: Nếu ứng dụng cần truy cập một lần vào vị trí của người dùng để hoàn thành một số tác vụ, hãy sử dụng foreground service trước với foregroundServiceType được đặt làm `location` trong  manifest file.

```
<service android:name="NavigationService"
android:foregroundServiceType="location" ... />
```

Nếu ứng dụng cần truy cập vào vị trí thiết bị mọi lúc, chẳng hạn như để định vị địa lý, thì ứng dụng có thể thiết lập yêu cầu cho phép vị trí nền. Các khía cạnh khác của ứng dụng (chẳng hạn như cách tìm và sử dụng vị trí) không cần thay đổi. Để yêu cầu quyền truy cập cho vị trí nền, hãy thêm quyền `ACCESS_BACKGROUND_LOCATION` vào `manifest`:

```
manifest>
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
</manifest>

//Request for the permission like any other permission request:
ActivityCompat.requestPermissions(this, 
                                  arrayOf(Manifest.permission.ACCESS_COARSE_LOCATION, 
                                          Manifest.permission.ACCESS_BACKGROUND_LOCATION), 
                                  your-permission-request-code)
```

* **Gotcha’s** : 
**Một vài điều quan trọng cần lưu ý**: Người dùng có thể nhận được lời nhắc sau khi cho ứng dụng truy cập vị trí thiết bị ở chế độ nền và giống như bất kỳ quyền nào khác, người dùng có thể thu hồi quyền cho phép vị trí nền được cấp cho ứng dụng. Điều này đặc biệt quan trọng đối với các ứng dụng không nhắm mục tiêu Q nhưng chạy trên thiết bị Android Q vì mặc định nó sẽ có quyền nền nếu nó có quyền vị trí. Hãy chắc chắn rằng ứng dụng xử lý các tình huống như vậy. Vì lý do này, bất cứ khi nào ứng dụng khởi động service hoặc yêu cầu vị trí, hãy kiểm tra xem người dùng có còn cho phép ứng dụng truy cập thông tin vị trí hay không.

![](https://images.viblo.asia/a2cbb0c3-6421-4e77-9424-6d6a0d12eb0a.jpeg)

## Kinh nghiệm người dùng (User Experiences)
### Điều hướng cử chỉ (Gesture Navigation)

Trong Android Q, Google đã cố gắng hợp nhất tất cả các điều hướng cử chỉ bằng một hệ thống điều hướng cử chỉ mới để thay thế thanh điều hướng hệ thống nổi (back, home, and recents)

![](https://images.viblo.asia/c5cbd644-68d3-4551-8491-8ffb5862de29.png)

* **Ảnh hưởng (Affects)**: Vì vậy, nếu ứng dụng của bạn chứa các cử chỉ, thì chúng có thể xung đột với các cử chỉ hệ thống. Điều này sẽ ảnh hưởng đến tất cả các ứng dụng chạy trên Android Q (không phân biệt SDK target) vì các cử chỉ hệ thống sẽ nhận được những cử chỉ đầu tiên khi xử lý cử chỉ.

* **Cách tiếp cận được đề xuất (Recommended approach):** Do thanh điều hướng hệ thống nổi đã ẩn, vì vậy các ứng dụng nên tận dụng tối đa lợi thế mới có sẵn cho chúng và cung cấp trải nghiệm tuyệt vời cho người dùng.

Để xây dựng trải nghiệm phong phú hơn, các ứng dụng nên rút ra đằng sau trạng thái và thanh điều hướng. Đầu tiên, yêu cầu thanh điều hướng và trạng thái phải trong suốt. Thì chúng ta sẽ set Theme cho app: 

```
<style name="AppTheme">
......
<item name="android:navigationBarColor">@android:color/transparent</item>
<!-- Optional, but recommended for full edge-to-edge rendering -->
<item name="android:statusbarColor">@android:color/transparent</item>
</style>
```
Tiếp theo, yêu cầu activity / view của bạn được trình bày toàn màn hình:

```
view.systemUiVisibility =
//Layout as if the navigation bar was hidden
View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
or
//Layout as if the status bar was hidden
View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
or
//Layout at its most extreme
View.SYSTEM_UI_FLAG_LAYOUT_STABLE
```

![](https://images.viblo.asia/d8cc6a6a-9b3a-4368-9e78-bfae34db47bf.png)

Bây giờ ứng dụng đã được đặt ở chế độ toàn màn hình và đằng sau các thành phần hệ thống (trong suốt), có thể một số thành phần có thể clickable của ứng dụng trùng với giao diện người dùng hệ thống. Để giải quyết vấn đề này, hãy sử dụng `Insets`.

`Insets` llà một tập hợp các giá trị cho chúng ta biết mức độ di chuyển `move our views` bằng cách nào để chúng không xung đột với UI . Thông tin này được cung cấp bởi lớp `WindowInset`. Kể từ API cấp 20, Android đã cung cấp cho các nhà phát triển `System Window Insets`, cho chúng ta biết các thành phần hệ thống chiếm bao nhiêu dung lượng (như thanh điều hướng nổi và thanh trạng thái). Thông tin này có thể được sử dụng để di chuyển các chế độ xem có thể clickable để có thể nhấp vào thay vì giao diện người dùng hệ thống.

```
root.setOnApplyWindowInsetsListener { _, insets ->
            val fabLp = fab.layoutParams as CoordinatorLayout.LayoutParams
            fabLp.bottomMargin = fabOriginalBottomMargin + insets.systemWindowInsetBottom
            fab.layoutParams = fabLp

            insets.consumeSystemWindowInsets()
        }
```

Tương tự, bắt đầu với Android Q, hệ thống sẽ hiển thị các bộ điều hướng cử chỉ, để di chuyển các chế độ xem có thể vuốt để chúng không xung đột với các cử chỉ của hệ thống. Chúng được hiển thị thông qua `Insets.getSystemGestureInsets ()`

![](https://images.viblo.asia/eae4fe56-98a6-4a1f-89f9-5a9eb2ace2fc.png)

Nhưng điều gì sẽ xảy ra nếu chúng ta không muốn chuyển các lượt xem và có một số nội dung trong các khu vực cử chỉ có thể xung đột với ứng dụng? Trong các trường hợp đó, ứng dụng có thể xác định các khu vực mà ứng dụng sẽ nhận được sự kiện chạm trước tiên và không phải là cử chỉ hệ thống. Nó có thể thực hiện điều này bằng cách chuyển một Danh sách cho API `View.setSystemGestureExinatingRects ()` được giới thiệu trong Android Q. Phương thức này cũng có sẵn trong `ViewCompat` kể từ `androidx.core: core: 1.1.0`

* Gotcha's : Bạn chỉ có thể từ chối giới hạn  back gesture. Giới hạn Home gesture được bảo lưu và không thể bị ghi đè. Điều này là do chỉ có một cách để thoát khỏi ứng dụng. Nếu ứng dụng của bạn xung đột với home gesture, hãy sử dụng `WindowInsets.getMandatorySystemGestureInsets () `để có được giới hạn của khu vực bắt buộc và chuyển quan điểm của bạn ra khỏi khu vực tương ứng.

### Dark Theme
Trong khoảng một năm qua, chúng ta đã thấy rất nhiều ứng dụng cung cấp hỗ trợ cho  dark themetrong ứng dụng của họ. Android Q mang đến sự thay đổi này cho cài đặt hệ thống.

Có 3 cách người dùng có thể kích hoạt chế độ tối:

1.Cài đặt hệ thống mới (Cài đặt -> Hiển thị -> Chủ đề) (Settings -> Display -> Theme)
2.  Cài đặt nhanh mới (A new Quick Settings)
3. Tùy thuộc vào nhà sản xuất, thông qua Battery Saver Mode.

Để hỗ trợ cấu hình Dark Theme trên toàn hệ thống, chủ đề mặc định của ứng dụng của bạn phải kế thừa từ chủ đề `DayNight`. Điều này liên kết main theme của ứng dụng với system-controlled night mode flags. Điều này hoạt động bằng cách kéo các tài nguyên từ các thư mục `night` qualifier folders.

```
<!--App Compat Style-->
<style name="AppTheme" parent="Theme.AppCompat.DayNight">
<!--Material Components-->
<style name="AppTheme" parent="Theme.MaterialComponents.DayNight">
```

Nếu bạn nhìn vào bên trong các kiểu Compat App, bạn sẽ nhận thấy chủ đề DayNight trỏ đến AppCompat Light trong cấu hình mặc định và trỏ đến AppCompat trong cấu hình night configuration

```
<!--values/themes.xml-->
<style name="Theme.AppCompat.DayNight" parent="Theme.AppCompat.Light">
<!--values-night/themes.xml-->
<style name="Theme.AppCompat.DayNight" parent="Theme.AppCompat">
```

Nếu bạn muốn cung cấp chuyển đổi cho người dùng để kiểm soát chủ đề từ trong ứng dụng, bạn có thể gọi `AppCompatDelegate.setDefaultNightMode ()`, có 1 trong 4 chế độ:

1. MODE_NIGHT_YES - Hiển thị chủ đề tối
2.  MODE_NIGHT_NO - Hiển thị chủ đề ánh sáng 
3.  MODE_NIGHT_FOLLOW_SYSTEM - Thực hiện theo cài đặt hệ thống 
4.  MODE_NIGHT_AUTO_BATTERY - Chủ đề tối khi thiết bị chuyển sang chế độ tiết kiệm năng lượng.

Bài viết của mình đến đây là hết. Cảm ơn các bạn đã ghé qua bài viết của mình