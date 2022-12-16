Android 12 giới thiệu các tính năng và API mới tuyệt vời cho các nhà phát triển. Các phần bên dưới giúp bạn tìm hiểu về các tính năng cho ứng dụng của mình và bắt đầu với các API liên quan.

## Trải nghiệm người dùng

### Hiệu ứng xúc giác kết hợp âm thanh
Các ứng dụng trên Android 12 có thể tạo phản hồi xúc giác từ âm thanh bằng bộ rung của device, tạo nên trải nghiệm âm thanh và trò chơi phong phú hơn. Ví dụ: nhạc chuông tăng cường xúc giác có thể giúp xác định người gọi hoặc trò chơi lái xe có thể mô phỏng cảm giác địa hình gồ ghề.

Chi tiết vui lòng tham khảo tài liệu [HapticGenerator](https://developer.android.com/reference/android/media/audiofx/HapticGenerator).

### API bo tròn góc cạnh

Android 12 giới thiệu [RoundedCorner](https://developer.android.com/reference/android/view/RoundedCorner) và [WindowInsets.getRoundsCorner(int position)](https://developer.android.com/reference/android/view/WindowInsets?hl=en#getRoundedCorner(int)), cung cấp bán kính và tâm cho các góc tròn. Với các API này, ứng dụng của bạn có thể tránh các phần  giao diện người dùng bị cắt ngắn trên màn hình có các góc tròn.

![](https://images.viblo.asia/bd02447e-c366-42d0-b366-df46a4c02b20.png)

Để triển khai tính năng này, hãy lấy thông tin **RoundedCorner** thông qua **WindowInsets.getRoundsCorner(int position)** liên quan đến viền của ứng dụng. Nếu ứng dụng không chiếm toàn bộ màn hình, API sẽ áp dụng góc tròn bằng cách căn cứ điểm chính giữa của góc tròn vào viền cửa sổ của ứng dụng.

Đoạn code sau là một ví dụng đơn giản để một ứng dụng tránh bị cắt bớt UI bằng cách đặt lề của view dựa trên thông tin từ **RoundedCorner**. Trong trường hợp này, nó là góc tròn trên cùng bên phải.

```kotlin
// Get the top-right rounded corner from WindowInsets.
final WindowInsets insets = getRootWindowInsets();
final RoundedCorner topRight = insets.getRoundedCorner(POSITION_TOP_RIGHT);
if (topRight == null) {
   return;
}

// Get the location of the close button in window coordinates.
int [] location = new int[2];
closeButton.getLocationInWindow(location);
final int buttonRightInWindow = location[0] + closeButton.getWidth();
final int buttonTopInWindow = location[1];

// Find the point on the quarter circle with a 45 degree angle.
final int offset = (int) (topRight.getRadius() * Math.sin(Math.toRadians(45)));
final int topBoundary = topRight.getCenter().y - offset;
final int rightBoundary = topRight.getCenter().x + offset;

// Check whether the close button exceeds the boundary.
if (buttonRightInWindow < rightBoundary && buttonTopInWindow > topBoundary) {
   return;
}

// Set the margin to avoid truncating.
int [] parentLocation = new int[2];
getLocationInWindow(parentLocation);
FrameLayout.LayoutParams lp = (FrameLayout.LayoutParams) closeButton.getLayoutParams();
lp.rightMargin = Math.max(buttonRightInWindow - rightBoundary, 0);
lp.topMargin = Math.max(topBoundary - buttonTopInWindow, 0);
closeButton.setLayoutParams(lp);
```

### Cải tiến chế độ Immersive cho điều hướng bằng cử chỉ

Android 12 đơn giản hóa chế độ immersive để giúp điều hướng bằng cử chỉ dễ dàng và nhất quán hơn với phần còn lại của trải nghiệm của các hành động như xem video và đọc sách. Các ứng dụng vẫn có thể tránh khỏi các cử chỉ ngẫu nhiên trong trải nghiệm chơi trò chơi toàn màn hình để người dùng không vô tình thoát khỏi trò chơi của họ khi đang chơi; tất cả các trải nghiệm toàn màn hình hoặc nhập vai khác hiện cho phép người dùng điều hướng điện thoại của họ bằng một lần vuốt.

Để làm được điều này, các behavior hiện có cho trải nghiệm non-sticky immersive ([BEHAVIOR_SHOW_BARS_BY_TOUCH](https://developer.android.com/reference/android/view/WindowInsetsController#BEHAVIOR_SHOW_BARS_BY_TOUCH), [BEHAVIOR_SHOW_BARS_BY_SWIPE](https://developer.android.com/reference/android/view/WindowInsetsController#BEHAVIOR_SHOW_BARS_BY_SWIPE)) bắt đầu không được dùng trong Android 12. Chúng đã được thay thế bằng behavior mặc định ([BEHAVIOR_DEFAULT](https://developer.android.com/reference/android/view/WindowInsetsController#BEHAVIOR_DEFAULT)) cho phép cử chỉ bằng một lần vuốt khi ẩn thanh hệ thống. Flag này thể hiện hành vi trực quan và chức năng khác nhau tùy thuộc vào chế độ:

* Ở chế độ 3 nút, visual and functional behavior giống như immersive mode ở các phiên bản trước Android 12.
* Trong chế độ điều hướng cử chỉ, hoạt động như sau:
    * Về visual, nó giống như chế độ immersive trong Android 11 trở xuống.
    * Về mặt chức năng, các cử chỉ được phép ngay cả khi thanh bị ẩn; hệ thống quay lại chỉ yêu cầu một lần vuốt để gọi thay vì hai lần vuốt bắt buộc đối với Android 11. Không cần thêm thao tác vuốt nào để kéo thanh thông báo xuống hoặc vuốt từ dưới lên.

Sticky immersive mode ([BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE](https://developer.android.com/reference/android/view/WindowInsetsController#BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE)) không thay đổi đối với Android 12. Lưu ý khả năng tương thích ngược sau cho tính năng này:

* Đối với các ứng dụng chạy trên Android 12 target Android 11 trở xuống:
    * **BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE** hoạt động giống nhau về mặt chức năng và hình ảnh.
    * Giá trị mặc định được ánh xạ tới [BEHAVIOR_SHOW_BARS_BY_SWIPE](https://developer.android.com/reference/android/view/WindowInsetsController#BEHAVIOR_SHOW_BARS_BY_SWIPE).

* Đối với các ứng dụng chạy trên Android 11 (API level 30) và thấp hơn Android 12:
    * Behavior tương tự, ngoại trừ [BEHAVIOR_SHOW_BARS_BY_TOUCH](https://developer.android.com/reference/android/view/WindowInsetsController#BEHAVIOR_SHOW_BARS_BY_TOUCH) được ánh xạ tới [BEHAVIOR_SHOW_BARS_BY_SWIPE](https://developer.android.com/reference/android/view/WindowInsetsController#BEHAVIOR_SHOW_BARS_BY_SWIPE).
    * Đảm bảo cập nhật level SDK của bạn để có bahavior mặc định mới ([BEHAVIOR_SHOW_BARS_BY_SWIPE](https://developer.android.com/reference/android/view/WindowInsetsController#BEHAVIOR_SHOW_BARS_BY_SWIPE)). Nếu không, [BEHAVIOR_SHOW_BARS_BY_TOUCH](https://developer.android.com/reference/android/view/WindowInsetsController#BEHAVIOR_SHOW_BARS_BY_TOUCH) vẫn là mặc định.

## Trải nghiệm mới

### Chèn rich content

Android 12 giới thiệu một API hợp nhất mới cho phép bạn nhận nội dung phong phú từ bất kỳ nguồn nào có sẵn: khay nhớ tạm, bàn phím hoặc kéo và thả. Chi tiết xem tại https://developer.android.com/about/versions/12/features/unified-content-api.

## Đồ họa và hình ảnh

### Hỗ trợ định dạng AVIF

Android 12 giới thiệu hỗ trợ cho hình ảnh sử dụng Định dạng tệp hình ảnh AV1 (AVIF). AVIF là định dạng vùng chứa cho hình ảnh và chuỗi hình ảnh được mã hóa bằng AV1. Nó tận dụng nội dung được mã hóa trong khung hình từ quá trình nén video. Điều này cải thiện đáng kể chất lượng hình ảnh cho cùng một kích thước tệp khi so sánh với các định dạng hình ảnh cũ hơn, chẳng hạn như JPEG. Để có cái nhìn sâu hơn về những ưu điểm của định dạng này, hãy xem bài đăng trên [blog](https://jakearchibald.com/2020/avif-has-landed/) của Jake Archibald.

### Làm mờ dễ dàng hơn, bộ lọc màu và các hiệu ứng khác

Android 12 bổ sung [RenderEffect](https://developer.android.com/reference/android/graphics/RenderEffect) mới áp dụng các hiệu ứng đồ họa phổ biến như làm mờ, bộ lọc màu, hiệu ứng đổ bóng Android, v.v. cho View và hiển thị phân cấp. Các hiệu ứng có thể được kết hợp dưới dạng hiệu ứng dây chuyền (tạo hiệu ứng bên trong và bên ngoài) hoặc hiệu ứng pha trộn. Các thiết bị Android khác nhau có thể hỗ trợ hoặc không hỗ trợ tính năng này do khả năng xử lý hạn chế.

Các hiệu ứng cũng có thể được áp dụng cho [RenderNode](https://developer.android.com/reference/android/graphics/RenderNode) bên dưới cho **Views** bằng cách gọi [View.setRenderEffect (RenderEffect)](https://developer.android.com/reference/android/view/View#setRenderEffect(android.graphics.RenderEffect)).

Để implement **RenderEffect**:

```kotlin
view.setRenderEffect(RenderEffect.createBlurEffect(radiusX, radiusY, SHADER_TILE_MODE))
```

### Native animated image decoding

Trong Android 12, API NDK [ImageDecoder](https://developer.android.com/ndk/reference/group/image-decoder) đã được mở rộng để decode tất cả các khung và dữ liệu thời gian từ các hình ảnh sử dụng định dạng tệp [GIF](https://en.wikipedia.org/wiki/GIF) động và WebP động. Khi nó được giới thiệu trong Android 11, API này chỉ giải mã hình ảnh đầu tiên từ các hình ảnh động ở các định dạng này.

Sử dụng **ImageDecoder** thay vì thư viện của bên thứ ba để giảm thêm kích thước APK và hưởng lợi từ các bản cập nhật trong tương lai liên quan đến bảo mật và hiệu suất.

## Media

### Compatible media transcoding

Android 12 có thể tự động transcode các video HEVC (H.265) và HDR (HDR10 và HDR10 +) được ghi trên thiết bị sang AVC (H.264), một định dạng tương thích rộng rãi với các trình phát tiêu chuẩn. Điều này tận dụng lợi thế của các codec hiện đại khi chúng có sẵn mà không phải hy sinh khả năng tương thích với các ứng dụng cũ hơn.

Xem phần [compatible media transcoding](https://developer.android.com/about/versions/12/features/compatible-media-transcoding) để biết thêm chi tiết.

### MediaDrm updates

Để xác định xem thành phần secure decoder có được yêu cầu với các API MediaDrm hiện tại hay không, bạn phải làm theo các bước sau:

1. Tạo **MediaDrm**.
2. Mở session để lấy session id.
3. Tạo **MediaCrypto** bằng session id.
4. Gọi **MediaCrypto.requiresSecureDecoderComponent(mimeType)**

## Security

### Hide application overlay windows

Để developer kiểm soát nhiều hơn những gì người dùng nhìn thấy khi họ tương tác với ứng dụng, Android 12 giới thiệu khả năng ẩn cửa sổ lớp phủ cho các ứng dụng đã được cấp quyền [SYSTEM_ALERT_WINDOW](https://developer.android.com/reference/android/Manifest.permission#SYSTEM_ALERT_WINDOW).

Sau khi khai báo quyền [HIDE_OVERLAY_WINDOWS](https://developer.android.com/reference/android/Manifest.permission#HIDE_OVERLAY_WINDOWS), một ứng dụng có thể gọi [setHideOverlayWindows](https://developer.android.com/reference/android/view/Window#setHideOverlayWindows(boolean))() để chỉ ra rằng tất cả các cửa sổ loại [TYPE_APPLICATION_OVERLAY](https://developer.android.com/reference/android/view/WindowManager.LayoutParams#TYPE_APPLICATION_OVERLAY) phải được ẩn khi cửa sổ riêng của ứng dụng hiển thị. Các ứng dụng có thể chọn làm điều này khi hiển thị các màn hình nhạy cảm, chẳng hạn như luồng xác nhận giao dịch.

Các ứng dụng hiển thị cửa sổ loại **TYPE_APPLICATION_OVERLAY** nên xem xét các lựa chọn thay thế có thể thích hợp hơn cho trường hợp sử dụng của chúng, chẳng hạn như picture-[in](https://developer.android.com/guide/topics/ui/picture-in-picture)-picture hoặc [bubbles](https://developer.android.com/guide/topics/ui/bubbles).

### Chứng thực thuộc tính thiết bị

Android 12 mở rộng tập hợp các ứng dụng có thể xác minh các thuộc tính thiết bị có trong [chứng chỉ chứng thực](https://source.android.com/security/keystore/attestation#attestation-certificate) khi các ứng dụng này tạo khóa mới.

Kể từ Android 9 (API level 28), [chủ sở hữu chính sách thiết bị (DPOs)](https://developer.android.com/guide/topics/admin/device-admin) sử dụng [Keymaster 4.0](https://source.android.com/security/keystore) trở lên có thể xác minh các thuộc tính của thiết bị trong các chứng chỉ chứng thực này. Bắt đầu từ Android 12, bất kỳ ứng dụng nào target Android 12 đều có thể thực hiện xác minh này bằng phương thức [setDevicePropertiesAttestationIncluded()](https://developer.android.com/reference/android/security/keystore/KeyGenParameterSpec.Builder#setDevicePropertiesAttestationIncluded(boolean)).

Các thuộc tính thiết bị được tạo bao gồm các trường build sau:

* **BRAND**
* **DEVICE**
* **MANUFACTURER**
* **MODEL**
* **PRODUCT**

### Các hành động thông báo trên màn hình khóa an toàn

Android 12 thêm cờ [setAuthenticationRequired](https://developer.android.com/reference/android/app/Notification.Action.Builder#setAuthenticationRequired(boolean)) mới vào **Notification.Action.Builder**. Cờ này cho phép bạn thêm một lớp bảo mật bổ sung cho các thông báo trên thiết bị bị khóa.

Khi cờ này được áp dụng với giá trị true cho một hành động thông báo nhất định, người dùng gọi hành động đó trên thiết bị bị khóa luôn dẫn đến một yêu cầu xác thực. Trước đây, hệ thống chỉ yêu cầu xác thực trên các thiết bị bị khóa khi người dùng gọi một hành động thông báo đã khởi chạy một hoạt động hoặc là một câu trả lời trực tiếp.

Để implement tính năng này, hãy thêm **setAuthenticationRequired** vào một hành động thông báo:

```kotlin
Notification n1 = new Notification.Builder(context, NotificationListenerVerifierActivity.TAG)
...
.addAction(new Notification.Action.Builder(R.drawable.ic_stat_charlie,
context.getString(R.string.action_test_title), makeBroadcastIntent(context))

// Make sure this notification action will always request authentication when
// invoked from a lock screen 
.setAuthenticationRequired(true).build())

.build();
```

## Connectivity

### Bandwidth estimation improvements

Trong Android 12, khả năng ước tính băng thông được cung cấp bởi getLinkDownstreamBandwidthKbps () và getLinkUpstreamBandwidthKbps() được cải thiện cho cả kết nối Wi-Fi và di động. Các giá trị được trả về thể hiện trọng số trung bình toàn thời gian qua nhà mạng hoặc WiFi SSID, loại mạng, mức tín hiệu trên tất cả các ứng dụng trên device. Điều này khiến cho việc estimate chính xác và thực tế hơn về bandwidth ứng dụng của bạn.

### Giữ cho các companion app awake

Để hỗ trợ nhu cầu của các ứng dụng đồng hành luôn hoạt động để quản lý thiết bị, Android 12 giới thiệu các API thực hiện những việc sau:

* Cho phép bạn đánh thức ứng dụng khi thiết bị đồng hành nằm trong phạm vi phủ sóng.
* Đảm bảo rằng quá trình sẽ tiếp tục chạy trong khi thiết bị vẫn nằm trong phạm vi phủ sóng.

Để sử dụng API, các thiết bị của bạn phải được kết nối bằng [Trình quản lý thiết bị đồng hành](https://developer.android.com/reference/android/companion/CompanionDeviceManager). Để biết thêm thông tin, hãy xem [CompanionDeviceManager.startObservingDevicePresence()](https://developer.android.com/reference/android/companion/CompanionDeviceManager#startObservingDevicePresence(java.lang.String)) và [CompanionDeviceService.onDeviceAppared()](https://developer.android.com/reference/android/companion/CompanionDeviceService#onDeviceAppeared(java.lang.String)).

Dưới đây là 1 số điểm mới trên Android 12 sắp ra mắt. Cảm ơn mọi người đã đọc bài của mình :D