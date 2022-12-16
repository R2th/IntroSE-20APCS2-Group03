Android 9 (Apis 28) được Google giới thiệu tại Google IO 2018 hứa hẹn sẽ mang đến sự thay đổi đầy mong chờ cho các thiết bị android. Hiện tại, android 9 đang được chạ thử nghiệm cho các nhà phát triển, và cũng sẽ sớm được tung ra thị trường trong thời gian ngắn nhất. Vậy, với những Developper như chúng ta, thì android 9 có gì đặc biệt và mới mẻ ? Hôm nay mình sẽ giới thiệu 1 vài tính năng mà mình cảm thấy hay và mới mẻ
## 1.Định vị trong nhà với WIFI RTT
Android 9 bổ sung hỗ trợ nền tảng cho giao thức Wi-Fi IEEE 802.11mc — còn được gọi là Wi-Fi Round-Trip-Time (RTT) —cho phép bạn tận dụng lợi thế của định vị trong nhà trong ứng dụng của bạn.

Trên các thiết bị chạy Android 9 có hỗ trợ phần cứng, ứng dụng của bạn có thể sử dụng API RTT để đo khoảng cách đến các điểm truy cập Wi-Fi có khả năng RTT gần đó. Thiết bị phải bật dịch vụ vị trí và bật tính năng quét Wi-Fi (trong Cài đặt> Vị trí ) và ứng dụng của bạn phải có quyền ACCESS_FINE_LOCATION . Nói dễ hiểu hơn, đó là tăng khả năng xác định chính xác LOCATION đến từng tòa nhà, hay vị trí cụ thể. Điều này sẽ làm tăng trải nghiệm người dùng, giúp các DEV có thể xây dựng được những ứng dụng chính xác hơn. 
## 2. Notification
Với Notification thì có gì đặc biệt ?
Như chúng ta đã biết, từ android 7 (API 24) chúng ta có thể trả lời thông báo ngay trên notification. Từ android 9 trở lên có một số điểm mới sau:
1. Hỗ trợ đơn giản cho người tham gia cuộc trò chuyện:chúng ta có thể xác định được người tham gia trò truyện bằng ảnh đại diện hoặc URI của họ
2. Android 9 hiện hiển thị hình ảnh trong Thông báo nhắn tin trên điện thoại. Bạn có thể sử dụng setData() trên tin nhắn để hiển thị một hình ảnh. Đoạn code sau đây dùng để hiển thị 1 hình ảnh và URI của object
```
// Create new Person.
Person sender = new Person()
        .setName(name)
        .setUri(uri)
        .setIcon(null)
        .build();
// Create image message.
Message message = new Message("Picture", time, sender)
        .setData("image/", imageUri);
Notification.MessagingStyle style = new Notification.MessagingStyle(getUser())
        .addMessage("Check this out!", 0, sender)
        .addMessage(message);
```

3. Xác định xem là cuộc trò chuyện nhóm hay cá nhân
 Bạn có thể sử dụng để xác định chủ ý cuộc hội thoại dưới dạng cuộc trò chuyện nhóm hoặc cá nhân bằng method setGroupConversation()
 4. Đặt hành động ngữ nghĩa cho một mục đích
 Bạn có thể đánh dấu là đã đọc, hay xóa, trả lời ngay trên notification
 setSemanticAction() Phương pháp này cho phép bạn cung cấp ý nghĩa ngữ nghĩa cho một hành động, chẳng hạn như "đánh dấu là đã đọc", "xóa", "trả lời", v.v.
 5. SmartReply: Android 9 hỗ trợ cùng các câu trả lời được đề xuất có sẵn trong ứng dụng nhắn tin của bạn. Sử dụng RemoteInput.setChoices() để cung cấp một loạt các phản hồi tiêu chuẩn cho người dùng.
 
## 3.  ImageDecoder cho các hình vẽ và bitmap
Android 9 giới thiệu ImageDecoder, cung cấp cách tiếp cận hiện đại hóa để giải mã hình ảnh. Sử dụng lớp này thay vì các API BitmapFactory và BitmapFactory.Options
Android 9 còn giới thiệu AnimatedImageDrawable lớp để vẽ và hiển thị hình ảnh động GIF và WebP. AnimatedImageDrawablehoạt động tương tự như AnimatedVectorDrawable trong đó render thread ổ đĩa hình ảnh động của AnimatedImageDrawable. Đoạn code sau mô tả rõ hơn:
```
private void decodeImage() throws IOException {
    Drawable decodedAnimation = ImageDecoder.decodeDrawable(
        ImageDecoder.createSource(getResources(), R.drawable.my_drawable));

    if (decodedAnimation instanceof AnimatedImageDrawable) {
        // Prior to start(), the first frame is displayed.
        ((AnimatedImageDrawable) decodedAnimation).start();
    }
}
```
## 4. Hỗ trợ đa camera và cập nhật camera
Trên các thiết bị chạy Android 9, bạn có thể truy cập các luồng đồng thời từ hai hoặc nhiều máy ảnh vật lý . Trên các thiết bị có máy ảnh hai mặt trước hoặc hai mặt sau, bạn có thể tạo các tính năng sáng tạo không thể chỉ với một máy ảnh đơn lẻ. 
 API đa camera hỗ trợ máy ảnh đơn sắc cho các thiết bị có FULLhoặc LIMITED khả năng. Đầu ra đơn sắc được thực hiện thông qua YUV_420_888 định dạng với Y là thang độ xám, U (Cb) là 128 và V (Cr) là 128.

Android 9 cũng cho phép hỗ trợ các camera USB / UVC bên ngoài trên các thiết bị được hỗ trợ.
 Có thể nói, đây là cải tiến rất mới so với các phiên bản trước đó. 
## 5. Xác nhận được bảo vệ của Android
Một cải tiến lớn về bảo mật trong android 9, Các thiết bị được hỗ trợ chạy Android 9 trở lên cung cấp cho bạn khả năng sử dụng Xác nhận được bảo vệ của Android. Khi sử dụng quy trình làm việc này, ứng dụng của bạn sẽ hiển thị lời nhắc cho người dùng, yêu cầu họ phê duyệt một tuyên bố ngắn. Tuyên bố này cho phép ứng dụng xác nhận lại rằng người dùng muốn hoàn tất một giao dịch nhạy cảm, chẳng hạn như thực hiện thanh toán.

Nếu người dùng chấp nhận tuyên bố, Android Keystore sẽ nhận và lưu trữ một chữ ký mã hóa được bảo vệ bằng mã xác thực thông điệp băm có khóa (HMAC). Sau khi Android Keystore xác nhận tính hợp lệ của tin nhắn, ứng dụng của bạn có thể sử dụng khóa được tạo từ trustedConfirmationRequiredtrong môi trường thực thi đáng tin cậy (TEE) để ký thông báo mà người dùng đã chấp nhận. Chữ ký cho thấy, với sự tự tin rất cao, rằng người dùng đã nhìn thấy tuyên bố và đã đồng ý với nó. Và giờ, bạn có thể yên tâm rằng, cơ chế bảo mật của android với những thông tin nhạy cảm đã tốt hơn trước rất nhiều

## 6. Hỗ trợ “tai thỏ”
Sau khi iPhone X ra mắt với chiếc “tai thỏ” độc đáo vào cuối năm 2017, kiểu thiết kế này đã nhanh chóng trở thành một xu hướng cực thịnh hành và được rất nhiều hãng smartphone sử dụng. Từ Huawei P20, Asus ZenFone 5, cho đến OnePlus 6 hay Oppo F7, “tai thỏ” đã xuất hiện khắp mọi nơi và là một phần không thể thiếu trên các thiết bị viền màn hình siêu mỏng.
![](https://images.viblo.asia/6325ec82-246e-4895-bcf0-9f1182489241.png)

Android 9 cung cấp hỗ trợ cho các màn hình cạnh mới nhất có chứa hiển thị cắt ra cho máy ảnh và loa. Các lớp DisplayCutout  cho phép bạn tìm ra vị trí và hình dạng của các khu vực không có chức năng mà nội dung không được hiển thị. Để xác định sự tồn tại và vị trí của các khu vực cắt bỏ này, hãy sử dụng getDisplayCutout().

Thuộc tính bố cục cửa sổ mới layoutInDisplayCutoutMode, cho phép ứng dụng của bạn bố trí nội dung của nó xung quanh các đoạn cắt của thiết bị. Bạn có thể đặt thuộc tính này thành một trong các giá trị sau:

> LAYOUT_IN_DISPLAY_CUTOUT_MODE_DEFAULT
LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES
LAYOUT_IN_DISPLAY_CUTOUT_MODE_NEVER


Bên trên là 1 vài tính năng mới trong rất nhiều tính năng mà mình cảm thấy hay và hữu ích. Nếu các bạn quan tâm, hãy truy cập https://developer.android.com/about/versions/pie/android-9.0#java  để có thể tìm hiểu thêm, đầy đủ và chi tiết hơn. 
Bài viết được tham khảo từ : https://developer.android.com/about/versions/pie/android-9.0#java