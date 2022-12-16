Một trong những tính năng quan trọng được thêm vào trong Android 8.0 là Picture in Picture (PiP). Vậy nó là gì? PiP là một chế độ hoạt động đa cửa sổ chủ yếu được sử dụng để phát lại video. Chế độ PiP đã có sẵn trên Android TV, ở API 26 làm cho tính năng này khả dụng trên các thiết bị Android khác.  Nó cho phép người dùng xem video trong một cửa sổ nhỏ được ghim vào một góc của màn hình trong khi điều hướng giữa các ứng dụng hoặc duyệt nội dung trên màn hình chính.

### Bắt đầu nào
PIP tận dụng các API đa cửa sổ có sẵn trong Android 7.0 để cung cấp cửa sổ video được ghim. Để thêm PiP vào ứng dụng của bạn, bạn cần đăng ký các hoạt động hỗ trợ PIP trong Android manifest, chuyển hoạt động của bạn sang chế độ PiP khi cần và đảm bảo các thành phần UI được ẩn và phát lại video tiếp tục khi hoạt động ở chế độ PiP. 
![](https://images.viblo.asia/111bb303-b520-448f-ad86-345352bb3783.png)
Cửa sổ PIP xuất hiện ở lớp trên cùng của màn hình, ở một góc được chọn bởi hệ thống. Bạn có thể kéo cửa sổ PIP đến một vị trí khác. Khi bạn nhấn vào cửa sổ, hai điều khiển đặc biệt xuất hiện: chuyển đổi toàn màn hình (ở giữa cửa sổ) và nút đóng ("X" ở góc trên bên phải). Ứng dụng sẽ bị tạm dừng khi bước vào chế độ PiP. Nhưng nó sẽ vẫn tiếp tục hiển thị nội dung. Vì vậy bạn nên đảm bảo rằng ứng dụng của bạn không bị tạm dừng phát lại khi xử lý ở onPause mà thay vào đó sẽ dừng video ở hàm onStop. 
Ứng dụng của bạn sẽ kiểm soát khi hoạt động hiện tại vào chế độ PIP. Dưới đây là một số ví dụ:

* Một hoạt động có thể vào chế độ PIP khi người dùng chạm vào nút home hoặc lõm để chọn một ứng dụng khác. (Đây là cách Google Maps tiếp tục hiển thị chỉ đường trong khi người dùng chạy một hoạt động khác cùng một lúc.)
* Ứng dụng của bạn có thể chuyển video sang chế độ PIP khi người dùng điều hướng trở lại từ video để duyệt nội dung khác.
* Ứng dụng của bạn có thể chuyển video sang chế độ PIP trong khi người dùng xem phần cuối của tập nội dung. Màn hình chính hiển thị thông tin quảng cáo hoặc tóm tắt về tập tiếp theo trong sê-ri.
* Ứng dụng của bạn có thể cung cấp một cách để người dùng xếp hàng nội dung bổ sung trong khi họ xem video. Video tiếp tục phát ở chế độ PIP trong khi màn hình chính hiển thị hoạt động chọn nội dung.

### Khai báo hỗ trợ Picture in Picture
Theo mặc định, hệ thống sẽ không tự động hỗ trợ PiP cho ứng dụng. Nếu muốn hỗ trợ PiP trong ứng dụng của mình thì cần đăng ký activity chưa video trong Android Manifest với **android:supportsPictureInPicture** và **android:resizeableActivity** để true.
```
<activity android:name=".MainActivity"
    android:configChanges="screenSize|smallestScreenSize|screenLayout|orientation"
    android:supportsPictureInPicture="true">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />

        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```
### Chuyển activity của mình sang chế độ PiP (Picture in Picture)
Để chuyển activity sang chế độ PiP, thì activity của bạn phải gọi đến enterPictureInPictureMode() của hoạt động truyền đối tượng PictureInPictureParams.Builder. PictureInPictureParams.Builder cho phép bạn thiết lập các hành động cho hoạt động ở chế độ hình ảnh trong ảnh bằng phương thức setActions và để đặt tỷ lệ khung hình của hoạt động bằng phương thức setAspectRatio.
```
Rational aspectRatio = new Rational(vv.getWidth(), vv.getHeight());
pictureInPictureParamsBuilder.setAspectRatio(aspectRatio).build();
enterPictureInPictureMode(pictureInPictureParamsBuilder.build()); 
```
Bạn có thể hiển thị video của mình ở chế độ hình ảnh khi người dùng nhấn nút home hoặc đa nhiệm. Khi người dùng nhấn nút home hoặc đa nhiệm, activity hiện tại sẽ chuyển sang background. Trong vòng đời activity, phương thức gọi lại onUserLeaveHint sẽ được gọi khi một hoạt động sắp chuyển sang nền do hành động của người dùng.

Vì vậy, phương thức gọi lại onUserLeaveHint có thể được sử dụng để hiển thị hoạt động ở chế độ PIP khi người dùng nhấn nút home hoặc đa nhiệm như hình bên dưới. Bạn có thể kiểm tra xem hoạt động đã ở chế độ PIP chưa bằng cách sử dụng phương thức isInPictureInPictureMode.
![](https://images.viblo.asia/0d8db621-3080-44eb-9d1d-e6e6efc4fc8c.png)
```
@Override
public void onUserLeaveHint(){
    if(!isInPictureInPictureMode()){
        Rational aspectRatio = new Rational(vv.getWidth(), vv.getHeight());
        pictureInPictureParamsBuilder.setAspectRatio(aspectRatio).build();
        enterPictureInPictureMode(pictureInPictureParamsBuilder.build());
    }
}
```
### Xử lý UI trong chế độ PiP
Khi Activity vào hoặc thoát khỏi chế độ hình ảnh trong ảnh, hệ thống sẽ gọi Activity.onPictureInPictureModeChanged () hoặc Fragment.onPictureInPictureModeChanged ().
Bạn nên ghi đè (override) các callback này để vẽ lại (redraw) các thành phần UI của Activity. Hãy nhớ rằng trong chế độ PIP, Activity của bạn được hiển thị trong một cửa sổ nhỏ. Người dùng không thể tương tác với các thành phần UI khi ở chế độ PIP và các chi tiết của các thành phần UI nhỏ có thể khó nhìn thấy. Các hoạt động phát lại video với giao diện người dùng tối thiểu cung cấp trải nghiệm người dùng tốt nhất. Các Activity chỉ nên hiển thị các điều khiển phát lại video. Xóa các thành phần UI khác trước khi hoạt động của bạn vào PIP và khôi phục chúng khi hoạt động của bạn trở lại toàn màn hình:
```
@Override
public void onPictureInPictureModeChanged (boolean isInPictureInPictureMode, Configuration newConfig) {
    if (isInPictureInPictureMode) {
        // Ẩn giao diện khi vào chế độ PiP.
    } else {
        // Hiển thị lại giao diện người dùng.
        ...
    }
}
```
### Thêm điều khiển
Bạn cũng có thể chỉ định các hành động tùy chỉnh một cách rõ ràng bằng cách xây dựng **PictureInPictureParams** bằng **PictureInPictureParams.Builder.setActions ()** trước khi Activity vào chế độ PIP, và truyền các tham số khi bạn vào chế độ PIP bằng cách sử dụng phương thức **enterPictureInPictureMode(android.app.PictureInPictureParams)** hoặc **setPictureInPictureParams(android.app.PictureInPictureParams)** . Hãy cẩn thận, nếu bạn cố gắng thêm nhiều hơn getMaxNumPictureInPictureActions () bạn sẽ chỉ nhận được số lượng tối đa.

### Tiếp tục phát video trong khi trong hình ảnh
Khi hoạt động của bạn chuyển sang PiP, hệ thống sẽ đặt Activity ở trạng thái tạm dừng và gọi phương thức onPause () của Activity. Khi Activity vào trạng thái PiP, không nên dừng phát video mà nên tiếp tục phát tiếp video đó.
Trong Android 7.0 trở lên, bạn nên tạm dừng và tiếp tục phát lại video khi hệ thống gọi Activity của bạn là onStop () và onStart (). Bằng cách này, bạn có thể tránh phải kiểm tra xem ứng dụng của mình có ở chế độ PIP trong onPause () hay không và tiếp tục phát lại.

Nếu bạn phải tạm dừng phát lại khi triển khai onPause (), hãy kiểm tra chế độ PIP bằng cách gọi isInPictureInPictureMode () và xử lý phát lại một cách thích hợp
```
@Override
public void onPause() {
    // If called while in PIP mode, do not pause playback
    if (isInPictureInPictureMode()) {
        // Continue playback
        ...
    } else {
        // Use existing playback logic for paused Activity behavior.
        ...
    }
}
```
Khi hoạt động của bạn chuyển khỏi chế độ PIP trở lại chế độ toàn màn hình, hệ thống sẽ tiếp tục hoạt động của bạn và gọi phương thức onResume () của bạn.
### Sử dụng singleTask cho PiP
Trong ứng dụng của bạn, người dùng có thể chọn video mới khi duyệt nội dung trên màn hình chính, trong khi hoạt động phát lại video ở chế độ PIP. Phát video mới trong Activity phát lại hiện có ở chế độ toàn màn hình, thay vì khởi chạy một Activity có thể gây nhầm lẫn cho người dùng.

Để đảm bảo một activity được sử dụng cho các yêu cầu phát lại video và chuyển sang hoặc ra khỏi chế độ PIP khi cần, hãy đặt **android: launchMode** thành **singleTask** trong Android Manifest của bạn:
```
<activity android:name=".MainActivity"
    android:configChanges="screenSize|smallestScreenSize|screenLayout|orientation"
    android:launchMode="singleTask"
    android:supportsPictureInPicture="true">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />

        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```
Trong activity của bạn, ghi đè lên NewIntent () và xử lý video mới, dừng mọi phát lại video hiện có nếu cần.

### 
* PiP có thể bị tắt trên các thiết bị có RAM thấp. Trước khi ứng dụng của bạn sử dụng PiP, hãy kiểm tra để chắc chắn rằng nó có sẵn bằng cách gọi hasSystemFeature (PackageManager.FEATURE_PICTURE_IN_PICTURE).
* PiP dành cho các hoạt động phát video toàn màn hình. Khi chuyển hoạt động của bạn sang chế độ PIP, tránh hiển thị bất cứ điều gì ngoại trừ nội dung video. Theo dõi khi Activity của bạn vào chế độ PIP và ẩn các thành phần UI, như được mô tả trong phần xử lý UI trong PiP.
* Vì cửa sổ PiP được hiển thị dưới dạng cửa sổ nổi ở góc màn hình, bạn nên tránh hiển thị thông tin quan trọng trong màn hình chính ở bất kỳ khu vực nào có thể bị che khuất bởi cửa sổ PiP.
* Khi ứng dụng của bạn ở chế độ PIP, phát lại video trong cửa sổ PIP có thể gây nhiễu âm thanh với một ứng dụng khác, chẳng hạn như ứng dụng trình phát nhạc hoặc ứng dụng tìm kiếm bằng giọng nói. Để tránh điều này, hãy yêu cầu tập trung âm thanh khi bạn bắt đầu phát video và xử lý các thông báo thay đổi tập trung âm thanh (dừng và phát lại các ứng dụng phát âm thanh khác) . 

Demo ứng dụng sử dụng PiP, các bạn có thể tham khảo ở đây: 
https://github.com/HoangLongBFramgia/DemoPictureInPicture

## Tổng kết
Picture-in-Picture là tính năng khá hấp dẫn trên Android 8 giúp người dùng tiếp tục xem video dưới dạng cửa sổ thu nhỏ mà vẫn có thể tương tác với các ứng dụng khác. Qua đó tăng khả năng đa nhiệm của Android chúng ta vừa có thể làm việc và giải trí thông qua nó. Khác với chia đôi màn hình thì PiP có thể nằm bất cứ đâu trên màn hình, tăng khả năng linh hoạt. Nó như một bước tiến mới trong cách bố trí màn hình chia nhỏ của Android.
## Tài liệu tham khảo
https://developer.android.com/guide/topics/ui/picture-in-picture