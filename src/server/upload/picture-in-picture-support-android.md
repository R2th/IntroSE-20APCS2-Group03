# I. Overview
Picture-in-picture (PIP) mode là một dạng của multi-window mode, chủ yếu được dùng cho playback video. Nó cho phép user xem tiếp video trong 1 cửa sổ nhỏ ghim ở góc màn hình (mặc định là góc trên) trong khi duyệt các nội dung khác bên trong hoặc bên ngoài ứng dụng. Android 8.0 (API 26) trở lên có thể sử dụng chế độ này.
Một vài trường hợp app chuyển sang chế độ PIP:
- Khi user tap home hoặc recents button để chọn ứng dụng khác.
- Khi user back về trong lúc đang xem video để duyệt nội dung khác.
- Khi user đã xem tới cuối một video trong một playlist. Video chuyển sang chế độ PIP, màn hình chính hiển thị quảng cáo hoặc nội dung tóm tắt của video tiếp theo.
- Khi user lựa chọn các nội dung để tạo thành một playlist trong lúc đang xem video.

# II. Implementation
## 1. Declaring picture-in-picture support
Mặc định hệ thống sẽ không hỗ trợ chế độ PIP cho activity của bạn. Để có thể khởi chạy ở chế độ này, bạn cần register nó bên trong manifest android:supportsPictureInPicture="true". Thêm nữa, bạn cần chỉ định activity có thể xử lý configuration changes vì activity không được khởi chạy lại khi chuyển sang chế độ PIP.

```
<activity android:name="VideoActivity"
    android:supportsPictureInPicture="true"
    android:configChanges=
        "screenSize|smallestScreenSize|screenLayout|orientation"
    ...
```

## 2. Switching your activity to picture-in-picture
Để khởi chạy chế độ PIP, activity cần call method enterPictureInPictureMode(). Ví dụ, khi user click vào một button trên UI:

```
override fun onActionClicked(action: Action) {
    if (action.id.toInt() == R.id.lb_control_picture_in_picture) {
        activity?.enterPictureInPictureMode()
        return
    }
}
```

Trong một số trường hợp, bạn có thể muốn activity chuyển sang chế độ PIP thay vì bị đưa xuống background. Ví dụ, khi user tap home hoặc recents button. Bạn có thể catch case này bằng cách override callback: `onUserLeaveHint()`:

```
override fun onUserLeaveHint() {
    if (iWantToBeInPipModeNow()) {
        enterPictureInPictureMode()
    }
}
```

## 3. Handling UI during picture-in-picture
Khi activity enters hoặc exits PIP mode, system calls `Activity.onPictureInPictureModeChanged()` hoặc `Fragment.onPictureInPictureModeChanged()`. 
Bạn cần override lại những callback này để vẽ lại UI. Nhớ rằng khi chuyển sang PIP mode, video playback sẽ hiên thị dưới một cửa sổ nhỏ và chỉ cần hiện thị thêm video controls. Vì vậy, cần remove những thành phần khác để có thể hiển thị một cách tối giản nhất UI của video playback khi chuyển sang PIP mode và vẽ lại chúng khi thoát khỏi PIP mode hòng mang đến trải nghiệm tốt nhất cho user. 

```
override fun onPictureInPictureModeChanged(isInPictureInPictureMode: Boolean,
                                           newConfig: Configuration) {
    if (isInPictureInPictureMode) {
        // Hide the full-screen UI (controls, etc.) while in picture-in-picture mode.
    } else {
        // Restore the full-screen UI.
    }
}
```

### 3.1. Adding controls
Chế độ PIP có thể hiển thị controls khi user mở window's menu (bằng cách tapping vào cửa sổ trên điện thoại hoặc chọn menu trên TV remote).
Nếu ứng dụng đang có một media session hoạt động. Các button play, pause, next và previous sẽ xuất hiện.
Bạn cũng có thể custom những action cụ thể bởi building **[PictureInPictureParams](https://developer.android.com/reference/android/app/PictureInPictureParams)** với `PictureInPictureParams.Builder.setActions()` trước khi mở PIP mode và truyền params khi mở PIP mode bằng `enterPictureInPictureMode(android.app.PictureInPictureParams)` hoặc `setPictureInPictureParams(android.app.PictureInPictureParams)`. Bạn chỉ có thể add số lượng actions tối đa bằng với số lượng của phương thức `getMaxNumPictureInPictureActions()`. 

## 4. Continuing video playback while picture-in-picture
Khi activity chuyển sang chế độ PIP, hệ thống đưa activity về trạng thái pause và gọi callback `onPause()`. Trong chế độ PIP, video playback không nên bị pause và nên được tiếp tục kể cả khi activity ở trạng thái pause.
Từ Android 7.0 trở lên, bạn có thể pause và resume video playback khi activity gọi tới `onStop()` và `onStart()`. Làm như vậy bạn sẽ không cần kiểm tra liệu app có ở PIP mode tại `onPause()` mà vẫn có thể tiếp tục playback video.
Nếu bạn muốn implement logic code tại `onPause()` khi app enter PIP mode, bạn có thể kiểm tra PIP mode bằng cách calling `isInPictureInPictureMode()`.

```
override fun onPause() {
    super.onPause()
    // If called while in PIP mode, do not pause playback
    if (isInPictureInPictureMode) {
        // Continue playback
    } else {
        // Use existing playback logic for paused Activity behavior.
    }
}
```

Khi app thoát khỏi chế độ PIP và quay trở lại chế độ full-screen, activity calls method `onResume()`.

## 5. Using a single playback activity for picture-in-picture
User có thể select một video khác trong khi đang có 1 video chạy ở chế độ PIP. Hãy play video mới bằng playback activity hiện tại ở chế độ full-screen, thay vì khởi chạy một activity mới, điều đó sẽ gây hoang mang cho user.
Để đảm bảo chỉ có 1 playback activity được chạy khi thoát khỏi chế độ PIP, bạn sử dụng android:launchMode là singleTask trong manifest.

```
<activity android:name="VideoActivity"
    ...
    android:supportsPictureInPicture="true"
    android:launchMode="singleTask"
    ...
```

Bên trong activity, bạn cần override lại method `onNewIntent()` để stop playback video hiện có nếu cần và xử lý video mới.

# III. Best Practices
- Device của bạn cần đảm bảo còn đủ RAM khả dụng để khởi chạy PIP mode. Để đảm bảo, hãy kiểm tra trước khi khởi chạy bằng cách gọi [`hasSystemFeature(PackageManager.FEATURE_PICTURE_IN_PICTURE)`](https://developer.android.com/guide/topics/media-apps/audio-focus).
- Khi có một video playback hiển thị ở chế độ PIP, bạn nên cân nhắc tránh hiện thị những thông tin quan trọng ở main screen tại những vùng bị video playback che khuất.
- Khi một activity ở chế độ PIP, mặc định nó sẽ không thể get input focus. Để nhận input events khi ở chế độ PIP, bạn sử dụng `MediaSession.setCallback()`. For more information:  **[Displaying a Now Playing Card](https://developer.android.com/training/tv/playback/now-playing)**.
- Nếu bạn playback video ở chế độ PIP trong khi sử dụng một ứng dụng khác, việc nhiễu âm thanh giữa 2 ứng dụng là hoàn toàn có thể xảy ra. Để tránh điều này, bạn cần request audio focus khi start playing video và xử lý audio focus change notifications, more information: **[Managing Audio Focus](https://developer.android.com/guide/topics/media-apps/audio-focus)**. Nếu bạn mất focus audio khi ở chế độ PIP, hãy pause hoặc stop video playback.

# IV. Demo
Giờ chúng ta hãy cùng bắt tay vào làm một demo nho nhỏ nhé.

**Kịch bản**:
- MainScreen hiển thị 2 item video thumbnail.
- User tapping vào item đầu tiên > video đầu tiên chạy trên màn hình ở chế độ fullscreen, góc trên bên phải hiển thị icon pip mode.
- User tapping vào icon pip mode > video enter pip mode thành công.

**Tiến hành**:
- Mình có chuẩn bị 2 video ngắn đưa vào thư mục `res/raw` và 2 hình ảnh thumbnail tương ứng đặt trong `res/drawable`.

![](https://images.viblo.asia/56587900-7561-4a82-9fb1-72062468abbe.png)
- Tiếp theo mình khai báo `PLaybackActivity` trong manifest với các option cần thiết.

![image.png](https://images.viblo.asia/91dfe047-2c6c-4eb5-8a5b-81d57e9a3e49.png)
- Sau đó mình set click event cho các item để start playback acitivity với param tương ứng.

![](https://images.viblo.asia/e2561d4a-ec2b-4715-85e4-76f907e90748.png)
- Trong `PlaybackActivity`, mình sử dụng `VideoView` để play video, func `prepareSource()` để khởi tạo và start video playback.

![](https://images.viblo.asia/522fd90f-5eba-4062-b904-dc55718f2064.png)
-  Khi user tapping vào icon pip mode, mình gọi func `enterPipMode()` để enter PIP mode.

![](https://images.viblo.asia/546c4f1d-212e-48d2-920a-586f61605508.png)
- Trong layout của mình, chỉ có 1 views thuộc dạng unnecessary khi app enter PIP mode là icon pip mode. Mình xử lý ẩn hiện view này bằng callback `onPictureInPictureModeChanged()`. Ngoài ra, button exit PIP mode và back to fullscreen mode thì hệ thống đã cung cấp sẵn cho mình UI kèm theo các chức năng tương ứng nên mình không cần tác động gì thêm. 

![](https://images.viblo.asia/0899b6f3-aa62-496f-b62f-95676bb85834.png)
- Để xử lý case có 1 video playback đang ở chế độ PIP, user tapping vào 1 item video khác trên main screen thì mình thực hiện override phương thức `onNewIntent()` và xử lý logic tương ứng.

![](https://images.viblo.asia/e9d15fb5-c743-41c9-827a-5a73bb1db282.png)

- Và cuối cùng là thành quả của mình:
![](https://images.viblo.asia/22021cc8-06cb-42e6-b120-c0579935b0ea.jpg)
Hình 1: List thumbnail video lại main screen.
 
![](https://images.viblo.asia/0dd61801-6003-42fa-b74e-4d65f1fcd2b6.jpg)
Hình 2: Video playback.

![](https://images.viblo.asia/b56e6608-27ef-4515-93bd-d9ab20f029ab.jpg)
Hình 3: Video on PIP mode.

![](https://images.viblo.asia/4af58c1f-2261-4a6b-83db-e6419fcc4d22.jpg)
Hình 4: Video on PIP mode when user tapping on window.

Rất đơn giản phải không nào. Các bạn có thể tham khảo toàn bộ source code [tại đây](https://github.com/baonq-2356/pip-example) nếu cần thiết. Ngoài ra, các bạn nên mày mò setup thêm các optional khác để hiểu rõ hơn về PIP mode nhé. Chúc các bạn học tốt.

Tham khảo: [PIP Android](https://developer.android.com/guide/topics/ui/picture-in-picture#best) 

***Cảm ơn các bạn đã đọc, hẹn gặp lại ở những bài viết sau!***