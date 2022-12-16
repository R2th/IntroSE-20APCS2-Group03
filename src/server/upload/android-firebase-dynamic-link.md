![](https://images.viblo.asia/b9b96cca-f6ce-4a0b-94d7-2b788d82a480.png)

Bạn đang có một hệ thống ứng dụng chạy cả trên web và mobile (Android & Ios). Người dùng biết đến ứng dụng của bạn và truy cập nó không chỉ trên trình duyệt web của pc, laptop mà còn ngay trên trình duyệt của điện thoại thông minh. Trong khi bạn đã phát triển native app để cung cấp trải nghiệm tốt hơn trên điện thoại. Bài toán đặt ra là làm sao để họ biết đến sự tồn tại của các native app này ? 

Một giải pháp nghe có vẻ ổn là sẽ chuyển hướng đến Google Play hay App Store mỗi khi người dùng sử dụng app web. Họ sẽ cài đặt và sử dụng app native tiếp sau đó. Tuy nhiên lại xuất hiện vấn đề khác, làm sao tìm lại được nội dung đang xem dở trên web ? Mới cài app làm sao đã biết cách sử dụng để tìm ra đúng phần muốn xem tiếp ngay ?  Và còn nhiều vấn đề nảy sinh khác nữa.

Firebase phát triển **Dynamic Links** nhằm giúp đơn giản hóa quá trình này cho những nhà phát triển.

# Giới thiệu
Với Firebase Dynamic Links, user sẽ có trải nghiệm tốt nhất khi mở link dựa trên nền tảng mà họ đang sử dụng. Nếu link được mở trên mobile ( Android, Ios), họ có thể được chuyển hướng đến native app. Nếu mở trên desktop browser, thì sẽ được đưa đến trang web có nội dung tương ứng.

![](https://images.viblo.asia/1cce0481-1753-44b6-991e-03c2ef813bf9.png)

Điểm đặc biệt khác, nó hoạt động ngay cả khi thiết bị của user chưa cài đặt app của bạn. Họ sẽ được gợi ý cài đặt bởi 1 hộp thoại nhanh, dẫn đến store tương ứng. Sau khi cài đặt xong, app sẽ tiếp tục mở nội dung tương ứng người dùng đã xem.
# Dynamic Links vs Deep Link
Khái niệm Dynamic Links của Firebase đang bao hàm cả deep link. Bởi thực chất, deep link vấn là link thực tế mà user muốn tương tác, muốn xem. Firebase sẽ dùng deep link đó, kết hợp với các thông tin khác để build thành 1 link cuối gọi là Dynamic Links. Do có nhiều thông tin hơn, Dynamic Link sẽ có thể support toàn diện hơn.

Một số thông tin mà Dynamic Link mang theo :
+ **Deep Links**: như đã nói, Deep Links sẽ được chứa trong Dynamic Links 
+ **Project Information**: thông tin của project như package name, version,... cũng được chứa trong link này
+ **Fallback url**: link dự phòng trong trường hợp app không thể cài đặt trên target device



|  | Dynamic Link|  Deep Link |
| -------- | -------- | -------- |
| App chưa cài đặt     | Đưa người dùng tới store cài đặt app. Sau khi cài thành công sẽ mở màn hình tương ứng với thông tin deep link mang     | Mở link trên browser     |
| App đã cài đặt|Mở native app với màn hình tương ứng|Tương tự|

# Các bước thực hiện
## 1. Cài đặt
Nếu app chưa liên kết với FireBase thì các bạn có thể tham khảo link hướng dẫn sau :
https://firebase.google.com/docs/android/setup

Sau đó, thêm dependences vào file **app/build.gradle**
```
implementation 'com.google.firebase:firebase-dynamic-links:17.0.0'
```

## 2. Tạo Dynamic Links
Mở Firebase console, chon app tương ứng trong project và chọn tab **Dynamic Links**

Tiếp theo đó, nếu các bạn chưa tạo 1 domain thì Firebase sẽ hiện lên form thông báo để bạn hoàn thành việc này. Domain này sẽ là tiền tố của Dynamic Links sau này. Nó sẽ có dạng như sau:

```
http://myapp.page.link
```
Sau khi tạo domain , click chọn **New Dynamic Links**, form có dang như sau xuất hiện: 
![](https://images.viblo.asia/9dd9bd2a-42ff-4793-aee3-9675d915a035.png)
Chúng ta điền các thông tin cần thiết. Trong đó sẽ có **Deep Link** là link mà muốn mở trong native app.
## 3. Xử lý Dynamic Link trong app Android
**B1** : Thêm intent-filter
```
<intent-filter>
    <action android:name="android.intent.action.VIEW"/>
    <category android:name="android.intent.category.DEFAULT"/>
    <category android:name="android.intent.category.BROWSABLE"/>
    <data
        android:host="example.com"
        android:scheme="https"/>
</intent-filter>
```

Intent-filter này sẽ lọc theo deep-link được gắn trong dynamic link. Vì có thể trong trường hợp , thiết bị đã cài app rồi, firebase sẽ dùng trực tiếp deep-link và mở app. Cũng như nếu thiết bị chưa cài app, mở store -> Sau khi cài xong và ấn Continue và mở app.

**B2**: Nhận và xử lý Deep Link
Sau khi nhận đc Dynamic Link, ta sẽ lấy ra Deep Link như sau :
```
FirebaseDynamicLinks.getInstance()
        .getDynamicLink(intent)
        .addOnSuccessListener(this) { pendingDynamicLinkData ->
            // Get deep link from result (may be null if no link is found)
            var deepLink: Uri? = null
            if (pendingDynamicLinkData != null) {
                deepLink = pendingDynamicLinkData.link
            }

            // Handle the deep link.
        }
        .addOnFailureListener(this) { e -> Log.w(TAG, "getDynamicLink:onFailure", e) }
```

Deep Link được lấy ra sẽ được phân tích để biết được người dùng đang muốn xem gì, từ đó điều hướng app tới mục tương ứng.

# Kết
Trên đây mình đã trình bày một số khái niệm cũng như cách xử lý Dynamich Link trong Android. Để tìm hiểu kỹ hơn, các bạn có thể tham khảo offical doc của firebase nhé : https://firebase.google.com/docs/dynamic-links :). Cảm ơn các bạn đã đón đọc !