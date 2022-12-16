Năm 2019, với sự đổi chóng mặt của thiết bị di động , với các công nghệ mới như công nghệ 5G  , màn hình tai thỏ , màn hình edge  , màn hình folable (màn hình có thể gập lại) .

Vào ngày 13/3 vừa rồi Google đã cho ra mắt Android Q beta . Một phiên bản hứa hẹn sẽ có nhiều thay đổi  đặc biết  privacy protections của người dùng .
.  Android Q mang đến một số tính năng bảo mật và quyền riêng tư bổ sung cho người dùng , cũng như các cải tiến để tương thích với màn hình folable , APIs for connectivity ,  camera, NNAPI extensions, Vulkan 1.1  hơn thế nữa.

Sau đây là một số thay đổi ở Android Q này

## Bảo vệ quyền riêng tư trong Android 
Andriod có một loạt các tính năng để bảo vệ quyền riêng tư của người dùng như  file-based encryption , request permission trước khi ứng dụng truy cập đến những tài nguyên nhạy cảm , encrypted backups, Google Play Protect ( quét hơn 50 tỷ ứng dụng mỗi ngày để xác định các ứng dụng có khả năng gây hại và xóa chúng) . 
Trong Android Q đã có thêm nhiều cải tiến , một trong số đó là Project Strobe . Các bạn có thể xem thêm [tại đây](https://www.blog.google/technology/safety-security/project-strobe/) 
+  Với Downloads , ứng dụng cần phải dùng system file picker , cho phép người dùng quyết định Downloads file nào mà ứng dụng có thể truy cập .
+  Đối với các nhà phát triển, có những thay đổi về cách ứng dụng của bạn có thể sử dụng các phần được chia sẻ trên external storage . Xem thêm [ở đây ](https://developer.android.com/preview/privacy/scoped-storage)
+  Giới hạn quyền truy cập vào thông tin nhận dạng của thiết bị  bao gồm IMEI của thiết bị, số sê-ri . Để có thể identifiers bạn có thể đọc thêm [ở đây](https://developer.android.com/preview/privacy/data-identifiers)

### Cho phép người dùng kiểm soát nhiều hơn với location
Với Android Q, HĐH giúp người dùng có nhiều quyền kiểm soát hơn khi các ứng dụng muốn truy cập vị trí của device . Như trong các phiên bản trước của HĐH, ứng dụng chỉ có thể nhận được vị trí khi ứng dụng đã yêu cầu bạn cho phép và bạn đã cấp nó .
Vì thế việc truy cập vị trí của device vẫn được thực hiện kể cả ứng dụng đang chạy ở background .

Android Q cho phép người dùng cấp cho ứng dụng quyền xem vị trí `never`, `only when the app is in use` (running) hoặc `all the time `( kể cả ở background). 

![](https://images.viblo.asia/060122fe-2830-40d8-a016-dd8f1db371ac.png)

### Hỗ trợ các device có foldables screen 
Để giúp ứng dụng  tận dụng những thiết bị này và các thiết bị màn hình lớn khác, đã có một số cải tiến trong Android Q, bao gồm các thay đổi đối với `onResume` và `onPause` để hỗ trợ `multi-resume` và thông báo cho ứng dụng của bạn khi ứng dụng focus .
Đồng thời file `manifest` với thuộc tính `resizeableActivity` để giúp bạn quản lý cách ứng dụng của bạn được hiển thị trên màn hình lớn và foldables (có thể gập lại) .Thông tin chi tiết các bạn có thể xem [tại đây]
(https://developer.android.com/reference/android/app/Activity.html#onResume())
### Phím tắt Sharing 
Khi người dúng muốn share một thông tin gì đó : ảnh , video , tập tin ... điều này được thực hiện một cách nhanh chóng và dễ dàng bằng `Sharing shortcuts ` . Các bạn có thể xem thêm [tại đây ](https://proandroiddev.com/android-q-sharing-shortcuts-3be59ea2f4ec) hoặc [ShortcutInfo APIs ](https://developer.android.com/reference/android/content/pm/ShortcutInfo)
![](https://images.viblo.asia/dad187c9-236b-4d50-9414-b44b213d73b2.png)
### Settings Panels
Giờ đây, bạn cũng có thể hiển thị các cài đặt hệ thống chính trực tiếp trong context của ứng dụng của mình, thông qua  Settings Panel API , tận dụng tính năng Slices mà đã giới thiệu trong Android 9 Pie

Settings panel là bảng giao diện người dùng nổi mà bạn gọi từ ứng dụng của mình để hiển thị các cài đặt hệ thống  có thể cần, chẳng hạn như kết nối internet, NFC và âm lượng âm thanh. 
Các bạn có thể xem thêm[ tại đây ](https://developer.android.com/reference/android/provider/Settings.Panel)
![](https://images.viblo.asia/d708931d-7510-4f28-833c-8fe52cc00206.png)
### Camera, media, graphics
Chế độ `Dynamic depth format for photos` được giới thiệu trong Android Q lần này 
Nắm bắt được trend hiện này Android Q đã hỗ trợ thêm cho các ứng dụng có chức năng chụp ảnh có thể chỉnh sửa phần hậu kì của ảnh tốt hơn .Nói nôm na ra thì chức năng này cho phép bức ảnh của bạn có thể mô phỏng độ sâu trường ảnh bằng cách làm mờ nền trước hoặc hậu cảnh so với đối tượng. 
![](https://images.viblo.asia/b784b179-ae9f-4d35-92b6-9f9cd7096a10.jpg)
![](https://images.viblo.asia/51e0d64b-9e25-4841-b107-57209929af84.jpg)

### Native MIDI API
Đối với các ứng dụng thực hiện xử lý âm thanh bằng C ++, Android Q giới thiệu [API MIDI](https://developer.android.com/preview/features/midi)  để giao tiếp với các thiết bị MIDI thông qua NDK. API này cho phép dữ liệu MIDI được truy xuất bên trong một audio bằng cách đọc non-blocking, cho phép xử lý các tin nhắn MIDI có độ trễ thấp. 

### Vulkan 
Đối với đối hoạ 2D 3D Google tiếp tục phát triển dự trên nền tảng Vulkan . Mặc dù mới chỉ ở giải đoạn phát triển nhưng Vulkan trên Android hứa hẹn sẽ trở thành requirement cho các device 64-bit và recommendation cho các device 32-bit.

Để biết thêm về Vulkan bạn có thể xem thêm [ở đây](https://developer.android.com/ndk/guides/graphics) 

### Neural Networks API 1.2
Kể từ khi giới thiệu Neural Networks API (NNAPI) vào năm 2017, Android đã tiếp tục mở rộng số lượng hoạt động được hỗ trợ và cải thiện chức năng hiện có. Trong Android Q, c đã thêm 60 ops mới bao gồm ARGMAX, ARGMIN 

Trên đây là một số điểm mới trong Android Q , mặc dù mới chỉ là bản Beta . Google đang có dự định sẽ release vào thàng 5 tới tại sự kiện Google I/O hàng năm .

Nếu quan các bạn có thể xem thêm tại đây [Google I / O ](https://events.google.com/io/)

Nguồn tham khảo : https://android-developers.googleblog.com/2019/03/introducing-android-q-beta.html