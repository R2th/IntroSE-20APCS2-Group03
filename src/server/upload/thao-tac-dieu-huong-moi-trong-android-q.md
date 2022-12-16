Với Android Q, một hệ thống điều hướng mới đã được thêm vào, cho phép người dùng điều hướng quay lại, điều hướng đến màn hình Home 
và kích hoạt trợ lý của thiết bị thông qua các cử chỉ của ngón tay.

![](https://images.viblo.asia/1999015c-16f2-4e77-94d6-2d9f54b93d67.gif)

Gesture trong Android Q.

Bằng cách chuyển sang một Gesture ( cử chỉ ) để điều hướng hệ thống, chúng ta có thể cung cấp thêm màn hình cho ứng dụng.
Điều này cho phép các ứng dụng tạo ra nhiều trải nghiệm tuyệt với hơn cho người dùng.

Người dùng sẽ có thể chọn chế độ điều hướng mà họ chọn trên hầu hết các thiết bị. 
Chế độ điều hướng 3 nút hiện có (back, home, recents) sẽ tiếp tục tồn tại. 
Nó được yêu cầu trên tất cả các thiết bị chạy Android Q trở đi.

## Edge-to-Edge

Tôi sử dụng thuật ngữ edge-to-edge để mô tả các ứng dụng mở rộng trên toàn bộ màn hình để đạt được cái nhìn chân thực hơn. 
Theo mặc định, các ứng dụng được đặt bên dưới thanh trạng thái ở trên cùng và phía trên thanh điều hướng ở dưới cùng (được gọi là các thanh hệ thống).

## Implementation

Có 3 bước chính để thực hiện vẽ ‘edge-to-edge’:

### 1. Yêu cầu đặt ra toàn màn hình

Bước đầu tiên là yêu cầu hệ thống đặt ứng dụng của chúng ta bên dưới thanh hệ thống ( theo trục y ).
API chúng ta sử dụng là setSystemUiVisibility(), với một số flag như sau :

```
view.systemUiVisibility = 
    // Tells the system that the window wishes the content to
    // be laid out at the most extreme scenario. See the docs for
    // more information on the specifics
    View.SYSTEM_UI_FLAG_LAYOUT_STABLE or
    // Tells the system that the window wishes the content to
    // be laid out as if the navigation bar was hidden
    View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
```

![](https://images.viblo.asia/7aec1654-3c92-4c54-a2fe-597640a2bafc.png)

### 2. Đổi màu của system bar

App của chúng ta hiện tại đã fullscreen.
Lúc này chúng ta cần đổi màu system bar để có thể nhìn thấy nội dung bên dưới.

**Android Q**

Khi chạy Android Q, việc duy nhất chúng ta cần làm là set màu của system bar thành transparent :

```
<!-- values-v29/themes.xml -->
<style name="Theme.MyApp">
    <item name="android:navigationBarColor">
        @android:color/transparent
    </item>

    <!-- Optional, if drawing behind the status bar too -->
    <item name="android:statusBarColor">
        @android:color/transparent
    </item>
</style>
```

**Màu sắc thay đổi linh hoạt**

System bar thay đổi màu sắc dựa trên nội dung đằng sau nó.
Do đó, nếu nội dung ở trên sáng, nó sẽ chuyển sang tối, và ngược lại, nó chuyển sang màu sáng khi nội dung trước nó màu tối.
Đây là những gì chúng ta gọi là thích ứng màu sắc linh hoạt.

![](https://images.viblo.asia/e1133db5-5cf2-4170-8d3c-7b1ee46f73c6.gif)

**Tắt system bar trong Android Q**

Nếu bạn không muốn sử dụng system bar, bạn có thể setting 
```
android:enforceNavigationBarContrast
```
và/hoặc :
```
android:enforceStatusBarContrast
```
thành false trong theme của app.

**Android P trở xuống**

Bạn có thể set màu của system bar với độ mờ ( opacity ) là 70% như sau :

```
<!-- values/themes.xml -->
<style name="Theme.MyApp">
    <item name="android:navigationBarColor">
        #B3FFFFFF
    </item>
</style>

<!-- values-night/themes.xml -->
<style name="Theme.MyApp">
    <item name="android:navigationBarColor">
        #B3000000
    </item>
</style>
```

Bạn có thể tăng hoặc giảm opacity tùy theo nội dung hiển thị bên dưới :

![](https://images.viblo.asia/3fbbeac7-9736-4cf7-ad02-02e384702b3c.png)

Tham khảo : https://android-developers.googleblog.com/2019/08/gesture-navigation-backstory.html