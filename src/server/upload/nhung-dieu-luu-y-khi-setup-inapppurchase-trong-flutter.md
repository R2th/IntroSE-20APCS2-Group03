Xin chào các bạn, mình là dev ios , hôm nay mình sẽ lưu ý giúp bạn một số điều khi làm InAppPurchase cho cả Android và IOS.
# 1. Thự viện sử dụng 
Có rất nhiều plugin  support các bạn việc dùng in app purchase flutter  như [purchases_flutter](https://pub.dev/packages/purchases_flutter),  [in_app_purchase](https://pub.dev/packages/in_app_purchase) ...

Mình có tìm hiểu sơ qua plugin purchases_flutter nó có ưu điểm sử dụng RevenueCat dùng để quản lý  các giao dịch thanh toán khá là hay bạn có thể implment nó thông qua bài viết sau: 
https://medium.com/flutter-community/in-app-purchases-with-flutter-a-comprehensive-step-by-step-tutorial-b96065d79a21.
Cá nhân mình thì mình dùng  in_app_purchase vì thấy sao cũng nhiều ^_^, code cũng dễ hiểu.

## 2.  Implement  In App Purchase.
Plugin in_app_purchase trong file [README](https://github.com/flutter/plugins/blob/master/packages/in_app_purchase/in_app_purchase/example/README.md).md nó đã hướng dẫn khá là chi tiết cách implemnt in app purchase  cho Android, IOS cái này mình sẽ không nhắc lại thêm nữa.

Mình sẽ nói chi tiết các vấn đề mình gặp phải khi mình  get  các item purchase  ở Google Store và AppStore. Để các bạn hiểu việc get các item purchase từ các Store thì đơn giản chỉ là lên google store, appstore tạo các loại item purchase có productionID (Ví dụ : com.RemoveBanner) và ở dưới app bạn gọi đúng các productionID là sẽ lấy được các item này.
Chú ý là bundleID ở AppStore và AppID ở Google Store phải trùng ở dưới app thì mới kết nối được .

### 2. 1 Cài đặt trên AppStore.
**Chú ý 1**: Để kết nối được các item trên AppStore thì các bạn đặc biệt lưu ý phải setup phần Agreements và mục Paid Apps phải đang ở status: Active.

![](https://images.viblo.asia/40e62d63-820e-4309-b625-5bdfbe5711c9.png)

Phần này rất là quan trọng , nhớ khai báo thẻ ngân hàng, mã số thuế thật thì mới được apple active. Chú ý , nên đọc kĩ các mục nếu setup sai phần này thì đi contact với Apple mất thời gian lắm 😀.

**Chú ý 2:**  Để test thử tính năng in app purchase cũng mình có đúng ko  thì bạn tạo môi trường Sanbox và add mail vào để test. 

![](https://images.viblo.asia/f533e32e-fafa-4c7a-a77e-972b77e71cb6.png)

**Chú ý 3:** Cái này do  tuỳ vào bạn chọn plugin nào, mình chọn plugin in_app_purchase, mình chạy thử demo của nó thấy có vấn đề như : 
- Ở IOS thì có thể get item purchase bằng cách tạo file có đuôi là .[storekit](https://developer.apple.com/documentation/xcode/setting-up-storekit-testing-in-xcode?preferredLanguage=occ)  ở   local để get các item purchase về. Nhưng mình chạy example  plugin   in_app_purchase thì nó  không hoạt động. Nếu có cao nhân nào biết thì có thể hướng dẫn mình bằng cách comment ở  dưới bài viết 😅.

### 2. 2 Cài đăt trên GoogleStore.
Mình là dev IOS cho nên setup trên google store cũng khá là mất thời gian. 

**Chú ý 1:**
![](https://images.viblo.asia/11b4be93-fefd-4904-8182-1cdccfc2f649.png)


Để kết nối được  bạn lại phải upfile apk lên trên google store thì mới tạo được in app purchase.
Chú ý là cần thêm đoạn permision sau vào trong file : android/app/AndroidManifest.xml thì mới up lên mục in-app products.
```
<uses-permission android:name="com.android.vending.BILLING" />
```

 Đây là hướng dẫn build file apk release: https://medium.com/@psyanite/how-to-sign-and-release-your-flutter-app-ed5e9531c2ac
 
 **Chú ý 2:** Để thử test được tính năng trên google store thì cũng giống IOS có môi trường Sanbox thì bên Android các bạn add file apk vào môi trường Internal Testing, nhớ chú ý add mail testing để test nhé.
 
 ![](https://images.viblo.asia/997753ba-8c05-4ffd-8519-84cc3756aaca.png)
 
 
 **Chú ý 3:** Sau khi hoàn thành chú ý 2 thì google store sẽ cũng cấp cho bạn 1 cái link để tải  file apk về device. Các bạn tải file apk này về rồi các bạn muốn test, fix bug, thì các bạn build trên device đã tải file apk về và ghi đè file này để test tính năng in app purchase. Chú ý là bản ghi đè phải có version code cao hơn version code của bản build apk tải về từ google store.
 
 OK! Giờ Implemt code thôi. Hy vọng các bạn sẽ thành công kết nối được store để get  được item purchase về.
 
 Trên đây là những kinh nghiệm mà mình học được khi làm tính năng in app purchase. Hy vọng bài viết của mình giúp các bạn tiết kiệm thời gian tìm hiểu và fix bug liên quan tới tính năng in app purchase.