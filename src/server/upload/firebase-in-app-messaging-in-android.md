In-App-Messaging là một dịch vụ của Firebase cho phép nhà phát triển có thể gửi các message dưới dạng dialog đến người dùng. Việc cài đặt và gửi test message khá dễ dàng, tuy nhiên để tăng trải nghiệm cho người dùng còn cần nhiều thứ phải thực hiện. Bài viết này sẽ hướng dẫn các bạn một số cách để kích hoạt và tuỳ chỉnh cho các message.

### Getting Started
Như đã nói phía trên, việc gửi một test message từ Firebase In-App-Messaging (FIAM) đơn giản và có thể hoàn thành với 4 bước sau : 

1. Thêm FIAM và Firebase Analytics dependencies vào file build.gradle (app)
```
implementation "com.google.firebase:firebase-inappmessaging-ktx:$fiamVersion"
implementation "com.google.firebase:firebase-analytics-ktx:$analyticsVersion"
```
2. Chạy app và tìm Installation ID trong logcat theo mẫu sau :

```I/FIAM.Headless: Starting InAppMessaging runtime with Installation ID YOUR_INSTALLATION_ID```

3. Truy cập vào Firebase Console và chọn mục In-App Messaging, chọn vào "New Campaign", nhập title nào đó cho campaign này 
4. Click vào "Test on your Device", nhập Installation ID lấy được ở bước 2 và click "Test" để send message

Nếu làm như các bước ở trên, thì ở lần mở app tiếp theo, bạn sẽ thấy test message được hiển thị trên màn hình mà ko cần làm gì trong code cả :)

### Seasonal Campaigns 🐰🎄
Đây là tính năng rất thú vị, nó cho phép bạn có thể lên lịch cho những message  sẽ hiển thị trên ứng dụng trong một khoảng thời gian cài đặt trước. Bạn có thể dùng để thông báo cho user biết về các chiến dịch giảm giá, khuyến mãi ... Bạn cũng có thể cài đặt tần suất message được hiển thị đối với người dùng.

Phần hay nhất là bạn không cần phải viết code gì để thực hiện nó. Bạn có thể thực hiện mọi thứ chỉ từ Firebase Console. Khi bạn tạo một campaign, bạn có thể setup "Scheduling your message", ở đây bạn có thể cài đặt start date và end date choc campaign của bạn 

In-app messaging có thể được kích hoạt bằng Firebase Analytics events. Có 2 event sẽ được Firebase Analytics tự động log là on_foreground và app_launch, vì vậy bạn có thể chọn một trong số chúng khi tạo campaign. Bạn cũng có thể tự tạo riêng cho mình những event khác để trigger.

### Trigger messages sử dụng Analytics events 

Giả sử có một ứng dụng thương mại điện tử và bạn muốn gửi đến user một dialog khi họ chuẩn bị thực hiện thanh toán. Khi tạo campaign bạn chỉ cần cài đặt trigger event như sau : 
![image.png](https://images.viblo.asia/387bcad0-7a36-4ee2-82ed-95d13b26da60.png)
Sau đó bạn có thể log begin_checkout event qua Firebase Analytics khi user bấm vào checkout button như sau : 

We could log the begin_checkout event to Firebase Analytics when the user clicks on the checkout button:
```
Firebase.analytics.logEvent(FirebaseAnalytics.Event.BEGIN_CHECKOUT) {
    param(FirebaseAnalytics.Param.CURRENCY, "MZN")
    param(FirebaseAnalytics.Param.VALUE, 1000)
    param(FirebaseAnalytics.Param.ITEMS, arrayOf(cartItems))
}
```
Và sau đó user sẽ nhận được message từ firebase.
Một cách khác, bạn có thể trigger event mà không cần phải log data lên Firebase Analytics bằng cách gọi : 
`Firebase.inAppMessaging.triggerEvent("begin_checkout")`

### Customize message behavior
Giả sử trường hợp user click vào button "Get Code", khi đó bạn muốn gửi về cho người dùng một mã discount. Bạn có thể thực hiện bằng cách thêm trường promo_code trong phần custom metadata trong khi tạo campaign trên Console 
![image.png](https://images.viblo.asia/813d3dd1-4a42-4b32-bce6-c4072078d555.png)
Sau đó bạn có thể lấy được thông tin về mã promo_code bằng cách lắng nghe event khi click vào dialog từ FIAM 
```
Firebase.inAppMessaging.addClickListener { inAppMessage, _ ->
    inAppMessage.data?.let { metadata ->
        val promoCode = metadata["promo_code"]
        promoCode?.let { code ->
            // We can do whatever we need with the code
            applyPromo(code)
        }
    }
}
```

### Customize theo cách của riêng bạn 
Có thể những design có sẵn trên Firebase console không đủ hoặc không phù hợp bạn, vậy bạn có thể tự tạo custom dialog của mình.
Để thực hiện điều này, bạn cần gọi hàm setMessageDisplayComponent() trong onResume() của Activity, sau đó dùng những thông tin như type, các mục ở metadata (title, caption, actions ... ) để hiển thị trên dialog của bạn 

```
Firebase.inAppMessaging.setMessageDisplayComponent { inAppMessage, callbacks ->
    val messageType = inAppMessage.messageType
    messageType?.let { type ->
        when (type) {
            MessageType.CARD -> {
                val cardMessage = inAppMessage as CardMessage
                val title = cardMessage.title
                // display a card dialog
            }
            MessageType.BANNER -> {
                val bannerMessage = inAppMessage as BannerMessage
                val title = bannerMessage.title
                // display a banner dialog
            }
            MessageType.MODAL -> {
                val modalMessage = inAppMessage as ModalMessage
                val title = modalMessage.title
                // display a modal dialog
            }
            MessageType.IMAGE_ONLY -> {
                val imageOnlyMessage = inAppMessage as ImageOnlyMessage
                val imageUrl = imageOnlyMessage.imageData.imageUrl
                // display the image only dialog
            }
            else -> {
                // Received an unsupported message
            }
        }
    }
}
```

Đó là những thứ cơ bản nhất của Firebase In-App-Messaging, nếu bạn muốn tìm hiểu thêm có thể xem thêm ở đây : 
https://firebase.google.com/docs/in-app-messaging

*Thanks for reading!*

**Nguồn bài viết :** https://proandroiddev.com/using-firebase-in-app-messaging-on-an-android-app-f2802757f00b**