Vậy là Android 9 đã ra bản chính thức! Android 9 (API 28) giới thiệu rất nhiều tính năng mới cho users và developer. Sau đây mình sẽ giới thiệu qua về một số tính năng mới để mọi người tham khảo.

## Định vị trong nhà với Wi-Fi RTT
Android 9 bổ sung hỗ trợ nền tảng cho giao thức Wi-Fi IEEE 902.11mc - được biết đến như là Wi-fi Round-Trip-Time (RTT)- hỗ trợ định vị trong nhà khi sử dụng app.

Trên các device chạy Android 9 support phần cứng, ứng dụng có thể sử dụng [**RTT APIs**](https://developer.android.com/reference/android/net/wifi/rtt/package-summary) để xác định khoảng cách với điểm truy cập Wi-Fi có khả năng RTT. Device phải có quyền access location service và Wi-Fi scanning đã được bật (dưới **Settings > Location**), và ứng dụng phải có quyền [**ACCESS_FINE_LOCATION**](https://developer.android.com/reference/android/Manifest.permission#ACCESS_FINE_LOCATION). Device không cần phải kết nối tới điểm truy cập để sử dụng RTT. Để duy trì quyền riêng tư, chỉ điện thoại mới có khả năng xác định khoảng cách đến điểm truy cập; điểm truy cập sẽ không biết gì về thông tin này.

Nếu device đo khoảng cách với nhiều hơn hoặc bằng 3 điểm truy cập, có thể sử dụng thuật toán đa cấp để ước lượng vị trí phù hợp với phép đo. Kết quả thu được độ chính xác trong khoảng 1-2m.

Với độ chính xác này, chúng ta có thể xây dựng các ứng dụng điều hướng trong các toà nhà hoặc các service dự trên vị trí chi tiết chẳng hạn như điều khiển bằng giọng nói (ví dụ "Bật đèn") và thông tin dựa trên vị trí (như "sản phẩm này có ưu đãi đặc biệt gì không?").

## Hiển thị hỗ trợ cutout (tai thỏ)
Android 9 cung cấp hỗ trợ cho màn hình tràn viền mới nhất, bao gồm cả hiển thị tai thỏ cho cả camera và loa. Class [**DisplayCutout**](https://developer.android.com/reference/android/view/DisplayCutout) cho phép tìm ra vị trí và hình dạng của các khu vực không hoạt động mà nội dung không được hiển thị. Để xác định sự tồn tại và vị trí của các khu vực tai thỏ này, ta sử dụng hàm **[getDisplayCutout()](https://developer.android.com/reference/android/view/WindowInsets#getDisplayCutout())**.

Thuộc tính **[layoutInDisplayCutoutMode](https://developer.android.com/reference/android/view/WindowManager.LayoutParams#layoutInDisplayCutoutMode)** mới cho phép ứng dụng bố trí các nội dung xung quanh tai thỏ dựa vào các giá trị sau:

* **[LAYOUT_IN_DISPLAY_CUTOUT_MODE_DEFAULT](https://developer.android.com/reference/android/view/WindowManager.LayoutParams#LAYOUT_IN_DISPLAY_CUTOUT_MODE_DEFAULT)**
* **[LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES](https://developer.android.com/reference/android/view/WindowManager.LayoutParams#LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES)**
* **[LAYOUT_IN_DISPLAY_CUTOUT_MODE_NEVER](https://developer.android.com/reference/android/view/WindowManager.LayoutParams#LAYOUT_IN_DISPLAY_CUTOUT_MODE_NEVER)**

Có thể giả lập tai thỏ của máy ảo chạy Android 9 bằng cách sau:
1. Enable **developer options**.
2. Trong **Developer options**, chọn Drawing, sau đó chọn **Simulate a display with a cutout**.
3. Chọn klichs thước tai thỏ.

![](https://images.viblo.asia/f98ed7dc-8ccb-4092-b02e-da7339c81a6e.png)

## Notification
Android 9 giới thiệu 1 vài cải tiến notification, tất cả đều đã có thể sử dụng với target API 28 trở lên.

### Cải tiến trải nghiệm nhắn tin
Bắt đầu từ Android 7.0 (API 24) đã có thể reply trực tiếp trong thông báo (các bạn đọc lại bài này của mình :D https://viblo.asia/p/tao-notification-direct-reply-trong-android-bWrZnNWQZxw). Trên Android 9 có 1 vài cải tiến sau:

* Đơn giản hoá hỗ trợ cho thành viên trong cuộc hội thoại: class **Person** được sử dụng để xác định người liên quan trong cuộc hội thoại, bao gồm avatar và URIs. Với nhiều API khác, như **addMessage**, giờ ta có thể tận dụng class **Person** thay cho **CharSequence**. Class **Person** cũng hỗ trợ cho Builder design pattern.
* Hỗ trợ hình ảnh: Android 9 giờ hiển thị ảnh trong Messagin Notification của điện thoại. Bạn có thể sử dụng **setData** trong tin nhắn để hiển thị ảnh. Đoạn code dưới đây minh họa cho việc tạo **Person** và tin nhắn chứa hình ảnh.

```
// Create new Person.
val sender = Person()
        .setName(name)
        .setUri(uri)
        .setIcon(null)
        .build()
// Create image message.
val message = Message("Picture", time, sender)
        .setData("image/", imageUri)
val style = Notification.MessagingStyle(getUser())
        .addMessage("Check this out!", 0, sender)
        .addMessage(message)
```

![](https://images.viblo.asia/fe778796-91bf-4a59-b9c8-d8f4fec39b38.jpg)
MessagingStyle chứa ảnh

![](https://images.viblo.asia/1721dc2f-9c4c-40c3-be03-90db72cd86c8.jpg)
MessagingStyle với chức năng reply và trông giống như cuộc hội thoại

* Lưu tin nhắn reply nháp: Ứng dụng của bạn có thể nhận **[EXTRA_REMOTE_INPUT_DRAFT](https://developer.android.com/reference/android/app/Notification.html#EXTRA_REMOTE_INPUT_DRAFT)** được gửi bởi hệ thống khi user vô tình đóng notification tin nhắn. Sử dụng data này để fill trước vào các phần text fields để cho người dùng tiếp tục soạn tin nhắn của họ.
* Xác định cuộc hội thoại là một cuộc hội thoại nhóm: Sử dụng **[setGroupConversation()](https://developer.android.com/reference/android/app/Notification.MessagingStyle.html#setGroupConversation(boolean))** để xác định cuộc hội thoại có phải là một cuộc hội thoại nhóm hay không.
* Đặt một semantic action cho intent: Method **[setSemanticAction()](https://developer.android.com/reference/android/app/Notification.Action.Builder.html#setSemanticAction(int))** cho phép bạn cung cấp ngữ cảnh cho một action. Ví dụ như "mark as read", "delete", "reply"...
* SmartReply: Androdi 9 hỗ trợ suggested reply có sẵn tương tự như suggested reply trong ứng dụng tin nhắn. Sử dụng **[RemoteInput.setChoices()](https://developer.android.com/reference/android/app/RemoteInput.Builder.html#setChoices(java.lang.CharSequence%5B%5D))** để cung cấp một chuỗi tin nhắn reply đã được soạn sẵn cho người dùng.

### Channel setting, broadcasts, Do Not Disturb
Android 8 đã giới thiệu **[Notification Channels](https://developer.android.com/guide/topics/ui/notifiers/notifications.html#ManageChannels)**, cho phép bạn tạo một custom channel cho mỗi loại notification mà bạn muốn hiển thị. Android 9 đơn giản hóa notification channel setting với những thay đổi sau:

* Blocking channel groups: User có thể block toàn bộ một nhóm channels trong notification setting của app. Sử dụng method **[isBlocked](https://developer.android.com/reference/android/app/NotificationChannelGroup.html#isBlocked())** để xác định một nhóm notification bị block và không gửi notification đến groupd đó nữa.
* Loại broadcast intent mới: Hệ thống Android giờ gửi broadcast intent khi trạng thái block notification của một channel bị thay đổi. Ứng dụng chứa channel bị block hoặc group bị block có thể lắng nghe những intent và phản hồi theo. Tham khảo thông tin về những intent action và hơn nữa, vui lòng tham khảo list constant đã được update ở **[NotificationManager](https://developer.android.com/reference/android/app/NotificationManager.html#constants)**. Thông tin về phản hồi broadcast intent, vui lòng tham khảo **[Broadcast](https://developer.android.com/guide/components/broadcasts.html)**.
* **[NotificationManager.Policy](https://developer.android.com/reference/android/app/NotificationManager.Policy.html#constants)** có 3 Do-Not-Disturb loại ưu tiên mới:
* **[PRIORITY_CATEGORY_ALARMS](https://developer.android.com/reference/android/app/NotificationManager.Policy.html#PRIORITY_CATEGORY_ALARMS)** ưu tiên báo thức.
* **[PRIORITY_CATEGORY_MEDIA](https://developer.android.com/reference/android/app/NotificationManager.Policy.html#PRIORITY_CATEGORY_MEDIA)** ưu tiên âm thanh từ các media sources, ví dụ như tiếng từ nhạc, video hoặc điều hướng bằng giọng nói.
* **[PRIORITY_CATEGORY_SYSTEM](https://developer.android.com/reference/android/app/NotificationManager.Policy.html#PRIORITY_CATEGORY_SYSTEM)** ưu tiên các âm thanh hệ thống.
* **NotificationManager.Policy** cũng có 7 constant Do-Not-Disturb mới:
* **[SUPPRESSED_EFFECT_FULL_SCREEN_INTENT](https://developer.android.com/reference/android/app/NotificationManager.Policy.html#SUPRESSED_EFFECT_FULL_SCREEN_INTENT)** ngăn chặn notification từ việc mở activity fullscreen.
* **[SUPPRESSED_EFFECT_LIGHTS](https://developer.android.com/reference/android/app/NotificationManager.Policy.html#SUPRESSED_EFFECT_LIGHTS)** chặn ánh sáng từ notification.
* **[SUPPRESSED_EFFECT_PEEK](https://developer.android.com/reference/android/app/NotificationManager.Policy.html#SUPRESSED_EFFECT_PEEK)** ngăn chặn trượt nhanh để vào chế độ xem notification.
* **[SUPPRESSED_EFFECT_STATUS_BAR](https://developer.android.com/reference/android/app/NotificationManager.Policy.html#SUPRESSED_EFFECT_STATUS_BAR)** ngăn chặn notification xuất hiện ở status bar trên các device hỗ trợ status bar.
* **[SUPPRESSED_EFFECT_BADGE](https://developer.android.com/reference/android/app/NotificationManager.Policy.html#SUPRESSED_EFFECT_BADGE)** chặn các huy hiệu trên device support huy hiệu. Tham khảo thêm tại [đây](https://developer.android.com/training/notify-user/badges.html).
* **[SUPPRESSED_EFFECT_AMBIENT](https://developer.android.com/reference/android/app/NotificationManager.Policy.html#SUPRESSED_EFFECT_AMBIENT)** chặn các notification trên device support màn hình ở cạnh.
* **[SUPPRESSED_EFFECT_NOTIFICATION_LIST](https://developer.android.com/reference/android/app/NotificationManager.Policy.html#SUPRESSED_EFFECT_NOTIFICATION_LIST)** chặn notification từ list view trên các device hỗ trợ list view, ví dụ như bong bóng thông báo hoặc màn hình khóa.

Ngoài ra còn nhiều cải tiến mà mình sẽ giới thiệu ở phần sau. Cảm ơn các bạn đã đọc bài của mình :D