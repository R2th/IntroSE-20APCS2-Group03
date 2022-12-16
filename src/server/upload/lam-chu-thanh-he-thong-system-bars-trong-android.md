![](https://images.viblo.asia/6fdd6cf2-cea9-4684-a185-68113a5efa49.png)

Khi xây dựng Giao diện người dùng (UI) trên thiết bị di động, thông thường chúng ta chỉ nghĩ đến các giao diện người dùng trong Ứng dụng mình đang xây dựng. Tuy nhiên giao diện ứng dụng không độc lập trên màn hình di động, chúng còn được tích hợp với giao diện hệ thống
Như bạn có thể thấy từ các ảnh chụp màn hình ở trên, bạn có thể cảm thấy giao diện người dùng trong ảnh chụp màn hình thứ hai và thứ tư được liên kết và kết hợp với nhau, trái ngược với sự ngắt quãng giữa notch và giao diện người dùng, điều này cũng nhấn mạnh vào nội dung của ứng dụng thay vì cấu trúc của nó .

Trong bài đăng này, tôi sẽ mô tả những gì tôi đã học được khi tạo kiểu thanh hệ thống với giao diện người dùng của chúng tôi và mô tả cách bạn có thể áp dụng nó với giao diện người dùng ứng dụng của mình. Nếu bạn muốn biết cách tạo kiểu cho thanh tác vụ trên Android, bạn có thể tìm thấy bài viết trước của tôi tại đây.

Trong bài viết này, tôi sẽ chia sẽ cách tôi đã kết hợp thanh hệ thống vào ứng ụng của bạn một cách tốt nhất.

## System Bars ## 
Thanh hệ thống là gì? Dựa theo [google](https://material.io/design/platform-guidance/android-bars.html#status-bar) Nó bao gồm status bar và the navigation bar, được hiển thị đồng thời với Giao diện người dùng ứng dụng của bạn. Thanh app bar hoặc the action bar không được bao gồm ở đây vì nó là một phần của giao diện người dùng của bạn và nó phải được đưa vào thiết kế giao diện người dùng của bạn.

Các thanh hệ thống sẽ được điều chỉnh dựa trên cài đặt style của bạn nếu bạn chưa đặt cụ thể. Giá trị mặc định sẽ là `colorPrimaryDark`, được giới thiệu trong **material design theme** từ Android 5.0 Lollipop (Android 21+).

![](https://images.viblo.asia/4224d38c-b5c6-4c90-ab11-b65a76f7f71f.png)

Ngoại trừ những thay đổi về theme, hầu hết thời gian, giao diện người dùng của bạn sẽ không có bất kỳ kết nối hoặc chồng chéo nào với các thanh hệ thống. Nếu bạn muốn thay đổi riêng màu thanh trạng thái và màu thanh điều hướng, có hai cách bạn có thể thay đổi chúng ngoài màu mặc định `colorPrimaryDark`. Một được đặt theo kiểu ứng dụng như bên dưới

```
<item name="android:statusBarColor">@color/statusBarColour</item>
<item name="android:navigationBarColor">@color/navigationBarColor</item>
```

Hoặc bạn có thể thay đổi nó trong code (hỗ trợ từ phiên bản Android 19+)

```
android.view.Window#setStatusBarColor(R.color.statusBarColour)
android.view.Window#setNavigationBarColor(R.color.navigationBarColor)
```

Sẽ tốt hơn nếu sử dụng tham chiếu màu ở đây, điều này có thể giúp chuyển đổi giữa chế độ tối và sáng dễ dàng hơn. Nhưng nếu bạn có màu nền quá nhạt, bạn sẽ thấy các biểu tượng trên thanh hệ thống không hiển thị rõ ràng vì màu biểu tượng mặc định cũng là màu nhạt.

![](https://images.viblo.asia/cb9b9a00-d26f-4bd8-beff-6e9352ec1328.png)
Window Light Bar Flags switch off and on

Không có cách nào bạn có thể tùy chỉnh màu sắc biểu tượng của thanh trạng thái hoặc thanh điều hướng . Nhưng từ Android API 23, bạn có thể làm cho thanh trạng thái và các biểu tượng điều hướng trở nên tối bằng cách đặt style .

```
<item name="android:windowLightStatusBar">true</item>
<item name="android:windowLightNavigationBar">true</item>
```

Vì API này chỉ hỗ trợ từ API 23+, chúng tôi chỉ có thể cho phép các cờ này có biểu tượng thanh trạng thái hiển thị rõ ràng thiết bị phiên bản  trước Lollipop và giữ màu thanh trạng thái và thanh điều hướng bằng màu nền chính của chúng tôi.

## Navigation Drawer ## 

Hầu hết thời gian, giao diện người dùng của bạn sẽ không được chồng lên thanh trạng thái hoặc thanh điều hướng. Nhưng một số thành phần giao diện người dùng có thể, chẳng hạn như [Navigation Drawer](https://developer.android.com/guide/navigation/navigation-ui#add_a_navigation_drawer), cung cấp một cách dễ dàng để hiển thị menu điều hướng chính của ứng dụng của bạn.

Khi bạn mở Drawer, nó có thể chồng lên thanh trạng thái theo yêu cầu của thiết kế. Bạn có thể tìm thấy cách triển khai hiện tại của chúng tôi bên dưới.
	![alt](https://miro.medium.com/max/320/1*AfBiubqXON2eOooLc1Re3g.gif)  

Để đạt được điều này, phần khó là chuyển đổi giữa `translucent` status bar and `light` status bar khi Drawer mở và đóng. Có hai cờ trong `host window` để kiểm soát trạng thái này.

Cờ [FLAG_TRANSLUCENT_STATUS](https://developer.android.com/reference/android/view/WindowManager.LayoutParams#FLAG_TRANSLUCENT_STATUS) sẽ yêu cầu  `translucent` status bar với nền tối thiểu do hệ thống cung cấp. Vì vậy, bạn có thể nhìn xuyên qua từ thanh trạng thái và sử dụng giao diện UI Drawer của mình làm nền.

Cờ [SYSTEM_UI_FLAG_LIGHT_STATUS_BAR](https://developer.android.com/reference/android/view/View#SYSTEM_UI_FLAG_LIGHT_STATUS_BAR) sẽ yêu cầu thanh trạng thái vẽ ở chế độ tương thích với nền của  `light` status bar. Để cờ này có hiệu lực, cửa sổ phải xóa translucent flag và yêu cầu [FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS](https://developer.android.com/reference/android/view/WindowManager.LayoutParams#FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS).

[SimpleDrawerListener](https://developer.android.com/reference/androidx/drawerlayout/widget/DrawerLayout.SimpleDrawerListener) được sử dụng để theo dõi các sự kiện về drawers. Khi drawers bắt đầu mở, trạng thái  `translucent` cần được đặt và cờ trên light status bar sáng cần được xóa nếu ứng dụng ở dạng `light` . Trạng thái cập nhật cần được áp dụng cho `drawer layout host window`.

Bạn có thể dùng phương thức của Window là  [setFlags](https://developer.android.com/reference/android/view/Window#setFlags(int,%20int)) và [clearFlags](https://developer.android.com/reference/android/view/Window#clearFlags(int)) 
    
```
window.setFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS,
WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS)
window.clearFlags(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR)
```

Nguồn: <br/>
https://material.io/design/platform-guidance/android-bars.html#status-bar<br/>
https://developer.android.com/guide/navigation/navigation-ui#add_a_navigation_drawer <br/>
    https://medium.com/@peng.jiang/style-system-bars-on-android-476ed0b64d02